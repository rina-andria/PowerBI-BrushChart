 /*
 *  Power BI Visualizations
 *
 *  Copyright (c) Microsoft Corporation
 *  All rights reserved. 
 *  MIT License
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the ""Software""), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *   
 *  The above copyright notice and this permission notice shall be included in 
 *  all copies or substantial portions of the Software.
 *   
 *  THE SOFTWARE IS PROVIDED *AS IS*, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR 
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE 
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 *  THE SOFTWARE.
 */

/// <reference path="../_references.ts"/>

module powerbi.visuals {
    export interface FunnelAnimationOptions extends IAnimationOptions{
        viewModel: FunnelData;
        layout: IFunnelLayout;
        axisGraphicsContext: D3.Selection;
        shapeGraphicsContext: D3.Selection;
        percentGraphicsContext: D3.Selection;
        labelGraphicsContext: D3.Selection;
        axisOptions: FunnelAxisOptions;
        slicesWithoutHighlights: FunnelSlice[];
        labelLayout: ILabelLayout; 
        isHidingPercentBars: boolean;
        visualInitOptions: VisualInitOptions;
    }

    export interface FunnelAnimationResult extends IAnimationResult {
        shapes: D3.UpdateSelection;
        dataLabels: D3.UpdateSelection;
    }

    export type IFunnelAnimator = Animator<IAnimatorOptions, FunnelAnimationOptions, FunnelAnimationResult>;

    export class WebFunnelAnimator extends Animator<IAnimatorOptions, FunnelAnimationOptions, FunnelAnimationResult> implements IFunnelAnimator {
        private previousViewModel: FunnelData;

        constructor(options?: IAnimatorOptions) {
            super(options);
        }

        public animate(options: FunnelAnimationOptions): FunnelAnimationResult {
            var result: FunnelAnimationResult = {
                failed: true,
                shapes: null,
                dataLabels: null,
            };

            var viewModel = options.viewModel;
            var previousViewModel = this.previousViewModel;

            if (!previousViewModel) {
                // This is the initial drawing of the chart, which has no special animation for now.
            }
            else if (viewModel.hasHighlights && !previousViewModel.hasHighlights) {
                result = this.animateNormalToHighlighted(options);
            }
            else if (viewModel.hasHighlights && previousViewModel.hasHighlights) {
                result = this.animateHighlightedToHighlighted(options);
            }
            else if (!viewModel.hasHighlights && previousViewModel.hasHighlights) {
                result = this.animateHighlightedToNormal(options);
            }

            this.previousViewModel = viewModel;
            return result;
        }

        private animateNormalToHighlighted(options: FunnelAnimationOptions): FunnelAnimationResult {
            var data = options.viewModel;
            var layout = options.layout;
            var hasHighlights = true;
            var hasSelection = false;

            this.animateDefaultAxis(options.axisGraphicsContext, options.axisOptions, options.isHidingPercentBars);

            var shapes = options.shapeGraphicsContext.selectAll('rect').data(data.slices, (d: FunnelSlice) => d.key);

            shapes.enter()
                .append('rect')
                .attr("class", (d: FunnelSlice) => d.highlight ? "funnelBar highlight" : "funnelBar")
                .attr(layout.shapeLayoutWithoutHighlights); // Start by laying out all rectangles ignoring highlights

            shapes
                .style("fill", (d: FunnelSlice) => d.color)
                .style("fill-opacity", (d: FunnelSlice) => ColumnUtil.getFillOpacity(d.selected, d.highlight, hasSelection, hasHighlights))
                .transition()
                .duration(this.animationDuration)
                .attr(layout.shapeLayout); // Then transition to the layout that uses highlights

            shapes.exit().remove();

            this.animatePercentBars(options);

            var dataLabels: D3.UpdateSelection = this.animateDefaultDataLabels(options);

            return {
                failed: false,
                shapes: shapes,
                dataLabels: dataLabels,
            };
        }

        private animateHighlightedToHighlighted(options: FunnelAnimationOptions): FunnelAnimationResult {
            var data = options.viewModel;
            var layout = options.layout;

            this.animateDefaultAxis(options.axisGraphicsContext, options.axisOptions, options.isHidingPercentBars);

            // Simply animate to the new shapes.
            var shapes = this.animateDefaultShapes(data, data.slices, options.shapeGraphicsContext, layout);
            this.animatePercentBars(options);
            var dataLabels: D3.UpdateSelection = this.animateDefaultDataLabels(options);

            return {
                failed: false,
                shapes: shapes,
                dataLabels: dataLabels,
            };
        }

        private animateHighlightedToNormal(options: FunnelAnimationOptions): FunnelAnimationResult {
            var data = options.viewModel;
            var layout = options.layout;
            var hasSelection = options.interactivityService ? (<WebInteractivityService>options.interactivityService).hasSelection() : false;

            this.animateDefaultAxis(options.axisGraphicsContext, options.axisOptions, options.isHidingPercentBars);

            var shapes = options.shapeGraphicsContext.selectAll('rect').data(data.slices, (d: FunnelSlice) => d.key);

            shapes.enter()
                .append('rect')
                .attr("class", (d: FunnelSlice) => d.highlight ? "funnelBar highlight" : "funnelBar");

            shapes
                .style("fill",(d: FunnelSlice) => d.color)
                .style("fill-opacity", (d: FunnelSlice) => ColumnUtil.getFillOpacity(d.selected, d.highlight, hasSelection, !d.selected))
                .transition()
                .duration(this.animationDuration)
                .attr(layout.shapeLayoutWithoutHighlights) // Transition to layout without highlights
                .transition()
                .duration(0)
                .delay(this.animationDuration)
                .style("fill-opacity", (d: FunnelSlice) => ColumnUtil.getFillOpacity(d.selected, d.highlight, hasSelection, false));

            var exitShapes = shapes.exit();

            exitShapes
                .transition()
                .duration(this.animationDuration)
                .attr(hasSelection ? layout.zeroShapeLayout : layout.shapeLayoutWithoutHighlights) // Transition to layout without highlights
                .remove();

            this.animatePercentBars(options);

            var dataLabels: D3.UpdateSelection = this.animateDefaultDataLabels(options);

            return {
                failed: false,
                shapes: shapes,
                dataLabels: dataLabels,
            };
        }

        private animateDefaultAxis(graphicsContext: D3.Selection, axisOptions: FunnelAxisOptions, isHidingPercentBars: boolean): void {
            var xScaleForAxis = d3.scale.ordinal()
                .domain(axisOptions.categoryLabels)
                .rangeBands([axisOptions.rangeStart, axisOptions.rangeEnd], axisOptions.barToSpaceRatio, isHidingPercentBars ? axisOptions.barToSpaceRatio : FunnelChart.PercentBarToBarRatio);
            var xAxis = d3.svg.axis()
                .scale(xScaleForAxis)
                .orient("right")
                .tickPadding(FunnelChart.TickPadding)
                .innerTickSize(FunnelChart.InnerTickSize);
            graphicsContext.classed('axis', true)
                .transition()
                .duration(this.animationDuration)
                .attr('transform', SVGUtil.translate(0, axisOptions.margin.top))
                .call(xAxis);
        }

        private animateDefaultShapes(data: FunnelData, slices: FunnelSlice[], graphicsContext: D3.Selection, layout: IFunnelLayout): D3.UpdateSelection {
            var hasHighlights = data.hasHighlights;
            var shapes = graphicsContext.selectAll('rect').data(slices, (d: FunnelSlice) => d.key);

            shapes.enter()
                .append('rect')
                .attr("class", (d: FunnelSlice) => d.highlight ? "funnelBar highlight" : "funnelBar");

            shapes
                .style("fill", (d: FunnelSlice) => d.color)
                .style("fill-opacity", d => (d: FunnelSlice) => ColumnUtil.getFillOpacity(d.selected, d.highlight, false, hasHighlights))
                .transition()
                .duration(this.animationDuration)
                .attr(layout.shapeLayout);

            shapes.exit().remove();

            return shapes;
        }

        private animateDefaultDataLabels(options: FunnelAnimationOptions): D3.UpdateSelection {
            var dataLabels: D3.UpdateSelection;

            if (options.viewModel.dataLabelsSettings.show && options.viewModel.canShowDataLabels) {
                dataLabels = dataLabelUtils.drawDefaultLabelsForFunnelChart(options.slicesWithoutHighlights, options.labelGraphicsContext, options.labelLayout, true, this.animationDuration);
            }
            else {
                dataLabelUtils.cleanDataLabels(options.labelGraphicsContext);
            }

            return dataLabels;
        }

        private animatePercentBars(options: FunnelAnimationOptions): void {
            var data: FunnelData = options.viewModel;
            var isHidingPercentBars: boolean = options.isHidingPercentBars;

            if (isHidingPercentBars || !data.slices || (data.hasHighlights ? data.slices.length / 2 : data.slices.length) < 2) {
                // TODO: call percentBarComponents with flag with empty data to clear drawing smoothly
                this.animatePercentBarComponents([], options);
                return;
            }

            var slices = [data.slices[data.hasHighlights ? 1 : 0], data.slices[data.slices.length - 1]];
            var baseline = FunnelChart.getFunnelSliceValue(slices[0]);

            if (baseline <= 0) {
                // TODO: call percentBarComponents with flag with empty data to clear drawing smoothly
                this.animatePercentBarComponents([], options);
                return;
            }

            var percentData = slices.map((slice, i) => <FunnelPercent>{
                value: FunnelChart.getFunnelSliceValue(slice),
                percent: i === 0 ? 1 : FunnelChart.getFunnelSliceValue(slice) / baseline,
                isTop: i === 0,
            });

            this.animatePercentBarComponents(percentData, options);
        }

        private animateToFunnelPercent(context: D3.Selection, targetData: FunnelPercent[], layout: any): D3.Transition.Transition {
            return context
                .data(targetData)
                .transition()
                .duration(this.animationDuration)
                .attr(layout);
        }

        private animatePercentBarComponents(data: FunnelPercent[], options: FunnelAnimationOptions) {
            var graphicsContext: D3.Selection = options.percentGraphicsContext;
            var layout: IFunnelLayout = options.layout;
            var zeroData: FunnelPercent[] = [
                { percent: 0, value: 0, isTop: true },
                { percent: 0, value: 0, isTop: false },
            ];

            // Main line
            var mainLine: D3.UpdateSelection = graphicsContext.selectAll(FunnelChart.Selectors.percentBar.mainLine.selector).data(data);

            this.animateToFunnelPercent(mainLine.exit(), zeroData, layout.percentBarLayout.mainLine)
                .remove();

            mainLine.enter()
                .append('line')
                .classed(FunnelChart.Selectors.percentBar.mainLine.class, true)
                .data(zeroData)
                .attr(layout.percentBarLayout.mainLine);

            this.animateToFunnelPercent(mainLine, data, layout.percentBarLayout.mainLine);

            // Left tick
            var leftTick: D3.UpdateSelection = graphicsContext.selectAll(FunnelChart.Selectors.percentBar.leftTick.selector).data(data);

            this.animateToFunnelPercent(leftTick.exit(), zeroData, layout.percentBarLayout.leftTick)
                .remove();
            
            leftTick.enter()
                .append('line')
                .classed(FunnelChart.Selectors.percentBar.leftTick.class, true)
                .data(zeroData)
                .attr(layout.percentBarLayout.leftTick);

            this.animateToFunnelPercent(leftTick, data, layout.percentBarLayout.leftTick);

            // Right tick
            var rightTick: D3.UpdateSelection = graphicsContext.selectAll(FunnelChart.Selectors.percentBar.rightTick.selector).data(data);
            
            this.animateToFunnelPercent(rightTick.exit(), zeroData, layout.percentBarLayout.rightTick)
                .remove();

            rightTick.enter()
                .append('line')
                .classed(FunnelChart.Selectors.percentBar.rightTick.class, true)
                .data(zeroData)
                .attr(layout.percentBarLayout.rightTick);

            this.animateToFunnelPercent(rightTick, data, layout.percentBarLayout.rightTick);

            // Text
            var text: D3.UpdateSelection = graphicsContext.selectAll(FunnelChart.Selectors.percentBar.text.selector).data(data);
            
            this.animateToFunnelPercent(text.exit(), zeroData, layout.percentBarLayout.text)
                .remove();

            text.enter()
                .append('text')
                .classed(FunnelChart.Selectors.percentBar.text.class, true)
                .data(zeroData)
                .attr(layout.percentBarLayout.text);

            this.animateToFunnelPercent(text, data, layout.percentBarLayout.text)
                .text((fp: FunnelPercent) => {
                    return formattingService.formatValue(fp.percent, valueFormatter.getLocalizedString("Percentage1"));
                });

            SVGUtil.flushAllD3TransitionsIfNeeded(options.visualInitOptions);
        }
    }
}