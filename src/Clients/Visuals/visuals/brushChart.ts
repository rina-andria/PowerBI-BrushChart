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

    // Brush chart data model
    export interface BrushChartData {
        x: Date;
        y: number;
    }

    // view model
    export interface BrushChartViewModel {
        points: BrushChartData[];
        xLabel: string;
        yLabel: string;
        yFormat: string;
    }
    
    // chart colors
    export interface BrushFillColors {
        detailsFillColour: string;
        slicerFillColour: string;
    }

    // Visual definition
    export class BrushChart implements IVisual {
        
        // Brush chart capabilities
        public static capabilities: VisualCapabilities = {
            // roles
            dataRoles: [
                {
                    name: 'Category',
                    kind: powerbi.VisualDataRoleKind.Grouping,
                },
                {
                    name: 'Y',
                    kind: powerbi.VisualDataRoleKind.Measure,
                },
            ],
            // mapping
            dataViewMappings: [{
                conditions: [
                    { 'Category': { max: 1 }, 'Y': { max: 0 } },
                    { 'Category': { max: 1 }, 'Y': { min: 1, max: 1 } }
                ],
                categorical: {
                    categories: { for: { in: 'Category' } },
                    values: {
                        select: [{ bind: { to: 'Y' } }]
                    }
                }
            }],
            // Visual properties
            objects: {
                general: {
                    displayName: data.createDisplayNameGetter('Visual_General'),
                    properties: {
                        formatString: {
                            type: { formatting: { formatString: true } },
                        },
                    },
                },
                label: {
                    displayName: 'BrushChart Colors',
                    properties: {
                        fill: {
                            displayName: 'Details View',
                            type: { fill: { solid: { color: true } } }
                        },
                        fill1: {
                            displayName: 'Time Slicer',
                            type: { fill: { solid: { color: true } } }
                        }
                    }
                }
            }
        };
        
        // Convert dataview object to model
        public static converter(dataView: DataView): BrushChartViewModel {

            var catDv: DataViewCategorical = dataView.categorical;

            var cat = catDv.categories[0];
            var catValues = cat.values;
            var values = catDv.values;
            var dataPoints: BrushChartData[] = [];

            for (var i = 0, len = catValues.length; i < len; i++) {
                if ((catValues[i] instanceof Date) && !isNaN(values[0].values[i])) {
                    dataPoints.push({
                        x: catValues[i],
                        y: values[0].values[i]
                    });
                }
            }

            var viewModel: BrushChartViewModel = {
                points: dataPoints,
                xLabel: cat.source.displayName,
                yLabel: values[0].source.displayName,
                yFormat: values[0].source.format
            };

            return viewModel;
        }

        private svg: D3.Selection;
        private focus: D3.Selection;
        private context: D3.Selection;
        private focusArea: D3.Selection;
        private contextArea: D3.Selection;
        private focusX: D3.Selection;
        private contextX: D3.Selection;
        private focusY: D3.Selection;
        private contextY: D3.Selection;
        private rect: D3.Selection;
        private axisYRect: D3.Selection;
        private axisYRectRight: D3.Selection;
        private dataView: DataView;

        // default colors
        private brushFillColors: BrushFillColors = { detailsFillColour: '#005496', slicerFillColour: '#BBBDC0' };        
        
        // Initialize visual components
        public init(options: VisualInitOptions): void {
            var element = options.element;

            this.svg = d3.select(element.get(0)).append('svg');

            this.rect = this.svg.append("defs").append("clipPath")
                .attr("id", "clip")
                .append("rect");

            this.focus = this.svg.append('g');
            this.context = this.svg.append('g');

            this.focusArea = this.focus.append("path");
            this.contextArea = this.context.append("path");

            this.focusX = this.focus.append('g');
            this.contextX = this.context.append('g');

            this.focusY = this.focus.append('g');
            this.axisYRect = this.focusY.append('rect');
            this.axisYRectRight = this.focusY.append('rect');
            this.contextY = this.context.append('g');
        }

        // add error message
        private generateError(type: number, viewport: IViewport): void {
            var erroMessage: string;
            switch (type) {
                case 1:
                    erroMessage = "The category data should be a date.";
                    break;
                case 2:
                    erroMessage = "The Y axis should be numeric.";
                    break;
                default:
                    erroMessage = "An error occured. Please contact the support.";
                    break;
            }

            this.svg.append('rect').attr('class', 'errorRectangle').attr('width', viewport.width).attr('height', viewport.height).attr('fill', 'white');

            var text = this.svg.append('text')
                .attr('class', 'errorMessage')
                .attr('text-anchor', 'middle')
                .style("font", "20px sans-serif")
                .attr('transform', 'translate(' + viewport.width / 2 + ',' + viewport.height / 2 + ')')
                .attr('fill', 'red');
            text.text(erroMessage);
        }
        
        // Update visual components
        public update(options: VisualUpdateOptions) {
            if (!options.dataViews || !options.dataViews[0]) return;
            var viewport = options.viewport;
            var viewModel: BrushChartViewModel;

            // category field is not datetime
            if (!options.dataViews[0].categorical.categories[0].source.type.dateTime) {
                this.generateError(1, viewport);
            }
            // Y is not numeric
            else if (!options.dataViews[0].categorical.values[0].source.type.numeric) {
                this.generateError(2, viewport);
            }
            else {
                viewModel = BrushChart.converter(options.dataViews[0]);
                this.svg.selectAll(".errorMessage").remove();
                this.svg.selectAll(".errorRectangle").remove();
            }

            var data = viewModel.points;

            // apply visual style and set functionalities
            this.dataView = options.dataViews[0];
            var viewport = options.viewport;

            var margin = { top: 10, right: 10, bottom: 110, left: 40 },
                margin2 = { top: viewport.height - 85, right: 10, bottom: 20, left: 40 },
                width = viewport.width - margin.left - margin.right,
                height = viewport.height - margin.top - margin.bottom,
                height2 = viewport.height - margin2.top - margin2.bottom;

            var x = d3.time.scale().range([0, width]),
                x2 = d3.time.scale().range([0, width]),
                y = d3.scale.linear().range([height, 0]),
                y2 = d3.scale.linear().range([height2, 0]);

            var xAxis = d3.svg.axis().scale(x).orient("bottom"),
                xAxis2 = d3.svg.axis().scale(x2).orient("bottom"),
                yAxis = d3.svg.axis().scale(y).orient("left");

            var area = d3.svg.area()
                .interpolate("monotone")
                .x(function (d) { return x(d.x); })
                .y0(height)
                .y1(function (d) { return y(+d.y); });

            var area2 = d3.svg.area()
                .interpolate("monotone")
                .x(function (d) { return x2(d.x); })
                .y0(height2)
                .y1(function (d) { return y2(+d.y); });

            var generateTooltipInfo = function (extentX: any, viewModel: BrushChartViewModel): TooltipDataItem[] {
                var ySum = 0;
                var data = viewModel.points;
                for (var i = 0; i < data.length; i++) {
                    if (extentX[0] <= data[i].x && data[i].x <= extentX[1]) {
                        ySum = ySum + data[i].y;
                    }
                }

                return [
                    {
                        displayName: 'Time Range (' + viewModel.xLabel + ')',
                        value: extentX[0].toDateString() + ' - ' + extentX[1].toDateString()
                    },
                    {
                        displayName: 'Total (' + viewModel.yLabel + ')',
                        value: valueFormatter.format(ySum, viewModel.yFormat)
                    }];
            };

            var brush = d3.svg.brush()
                .x(x2)
                .on("brush", function brushed() {
                    x.domain(brush.empty() ? x2.domain() : brush.extent());
                    focus.select(".area").empty();
                    focus.select(".area").attr("d", area);
                    focus.select(".x.axis").call(xAxis);
                    // generate back the tooltip
                    var tooltip = generateTooltipInfo(brush.extent(), viewModel);
                    TooltipManager.addTooltip(focus, (tooltipEvent: TooltipEvent) => tooltip);
                }, false);

            this.svg.attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .style("position", "absolute")
                .style("font", "10px sans-serif");

            this.rect
                .attr("width", width)
                .attr("height", height);

            this.axisYRect
                .attr("width", margin.left)
                .attr("height", height)
                .attr("x", -1 * margin.left)
                .attr("fill", "#fff");

            this.axisYRectRight
                .attr("width", margin.left)
                .attr("height", height)
                .attr("x", width)
                .attr("fill", "#fff");

            var focus = this.focus;
            focus.attr("class", "focus")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            var context = this.context;
            context.attr("class", "context")
                .attr("transform", "translate(" + margin2.left + "," + margin2.top + ")");

            x.domain(d3.extent(data.map(function (d) { return d.x; })));
            y.domain([0, d3.max(data.map(function (d) { return +d.y; }))]);
            x2.domain(x.domain());
            y2.domain(y.domain());

            this.focusArea
                .datum(data)
                .attr("class", "area")
                .attr("d", area)
                .attr('fill', this.getFill(this.dataView, 'fill').solid.color)
                .attr('fill-opacity', .5)
                .attr('clip-path', 'url(#clip)')
                .attr('fill-opacity', .4)
                .attr('stroke', this.getFill(this.dataView, 'fill').solid.color)
                .attr('stroke-width', 1.8);

            this.focusX.attr("class", "x axis")
                .attr("transform", "translate(0," + height + ")")
                .call(xAxis);

            this.focusY.attr("class", "y axis")
                .call(yAxis);

            this.focusX.select('path')
                .attr('fill', 'none')
                .attr('stroke', '#000')
                .attr('shape-rendering', 'crispEdges');

            this.focusX.select('line')
                .attr('fill', 'none')
                .attr('stroke', '#000')
                .attr('shape-rendering', 'crispEdges');

            this.focusY.select('path')
                .attr('fill', 'none')
                .attr('stroke', '#000')
                .attr('shape-rendering', 'crispEdges');

            this.focusY.select('line')
                .attr('fill', 'none')
                .attr('stroke', '#000')
                .attr('shape-rendering', 'crispEdges');

            this.focusY.attr('background-color', '#fff');
            this.focusY.append("rect");

            this.contextArea.datum(data)
                .attr("class", "area brush")
                .attr("d", area2)
                .attr('fill', this.getFill(this.dataView, 'fill1').solid.color)
                .attr('clip-path', 'url(#clip)')
                .attr('fill-opacity', .4)
                .attr('stroke', this.getFill(this.dataView, 'fill1').solid.color)
                .attr('stroke-width', 1.8);

            this.contextX.attr("class", "x axis")
                .attr("transform", "translate(0," + height2 + ")")
                .call(xAxis2);

            this.contextY.attr("class", "x brush")
                .call(brush)
                .selectAll('rect')
                .attr('y', -6)
                .attr('height', height2 + 7)
                .attr('drag-resize-disabled', true);

            this.contextX.select('path')
                .attr('fill', 'none')
                .attr('stroke', '#000')
                .attr('shape-rendering', 'crispEdges');

            this.contextX.select('line')
                .attr('fill', 'none')
                .attr('stroke', '#000')
                .attr('shape-rendering', 'crispEdges');

            this.contextY.select('.extent')
                .attr('stroke', '#fff')
                .attr('fill-opacity', '.125')
                .attr('shape-rendering', 'crispEdges');

            TooltipManager.addTooltip(this.focusArea, (tooltipEvent: TooltipEvent) => generateTooltipInfo(x2.domain(), viewModel));
        }

        // Define visual properties
        public enumerateObjectInstances(options: EnumerateVisualObjectInstancesOptions): VisualObjectInstance[] {
            var instances: VisualObjectInstance[] = [];
            switch (options.objectName) {
                case 'label':
                    var label: VisualObjectInstance = {
                        objectName: 'label',
                        displayName: 'BrushChart Colors',
                        selector: null,
                        properties: {
                            fill: this.getFill(this.dataView, 'fill'),
                            fill1: this.getFill(this.dataView, 'fill1')
                        }
                    };
                    instances.push(label);
                    break;
            }

            return instances;
        }

        // Get properties values
        private getFill(dataView: DataView, fieldName: string): Fill {
            if (dataView && dataView.metadata.objects) {
                var label = dataView.metadata.objects['label'];
                if (label) {
                    if (label[fieldName])
                        return <Fill>label[fieldName];
                }
            }

            return { solid: { color: fieldName === 'fill' ? this.brushFillColors.detailsFillColour : this.brushFillColors.slicerFillColour } };
        }

    }
}
