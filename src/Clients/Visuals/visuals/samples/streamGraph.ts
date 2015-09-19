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

/// <reference path="../../_references.ts"/>

module powerbi.visuals.samples {
    export interface StreamData {
        dataPoints: StreamDataPoint[][];
        legendData: LegendData;
    }

    export interface StreamDataPoint {
        x: number;
        y: number;
        y0?: number;
        identity: SelectionId;
    }

    export class StreamGraph implements IVisual {
        public static capabilities: VisualCapabilities = {
            dataRoles: [
                {
                    name: 'Category',
                    kind: VisualDataRoleKind.Grouping,
                    displayName: 'Category',
                }, {
                    name: 'Series',
                    kind: VisualDataRoleKind.Grouping,
                    displayName: 'Series',
                }, {
                    name: 'Y',
                    kind: VisualDataRoleKind.Measure,
                    displayName: data.createDisplayNameGetter('Role_DisplayName_Values'),
                },
            ],
            dataViewMappings: [{
                conditions: [
                    { 'Category': { max: 1 }, 'Series': { max: 0 } },
                    { 'Category': { max: 1 }, 'Series': { min: 1, max: 1 }, 'Y': { max: 1 } }
                ],
                categorical: {
                    categories: {
                        for: { in: 'Category' },
                        dataReductionAlgorithm: { bottom: {} }
                    },
                    values: {
                        group: {
                            by: 'Series',
                            select: [{ for: { in: 'Y' } }],
                            dataReductionAlgorithm: { bottom: {} }
                        }
                    },
                }
            }],
            objects: {
                general: {
                    displayName: 'General',
                    properties: {
                        wiggle: {
                            type: { bool: true },
                            displayName: 'Wiggle'
                        }
                    }
                }
            },
            //drilldown:{roles:['Series']}
        };

        private static VisualClassName = 'streamGraph';
        private static Layer: ClassAndSelector = {
            class: 'layer',
            selector: '.layer'
        };

        private svg: D3.Selection;
        private axis: D3.Selection;
        private colors: IDataColorPalette;
        private selectionManager: utility.SelectionManager;
        private dataView: DataView;
        private legend: ILegend;

        public static converter(dataView: DataView, colors: IDataColorPalette): StreamData {
            var catDv: DataViewCategorical = dataView.categorical;
            var values = catDv.values;
            var dataPoints: StreamDataPoint[][] = [];
            var legendData: LegendData = {
                dataPoints: [],
                title: values[0].source.displayName
            };
            for (var i = 0, iLen = values.length; i < iLen; i++) {
                dataPoints.push([]);
                legendData.dataPoints.push({
                    label: values[i].source.groupName,
                    color: colors.getColorByIndex(i).value,
                    icon: LegendIcon.Box,
                    selected: false,
                    identity: null
                });
                for (var k = 0, kLen = values[i].values.length; k < kLen; k++) {
                    var id = SelectionIdBuilder
                        .builder()
                        .withSeries(dataView.categorical.values, dataView.categorical.values[i])
                        .createSelectionId();
                    dataPoints[i].push({
                        x: k,
                        y: values[i].values[k],
                        identity: id
                    });
                }
            }

            return {
                dataPoints: dataPoints,
                legendData: legendData
            };
        }

        public init(options: VisualInitOptions): void {
            var element = options.element;
            this.selectionManager = new utility.SelectionManager({ hostServices: options.host });
            this.svg = d3.select(element.get(0))
                .append('svg')
                .classed(StreamGraph.VisualClassName, true);

            this.axis = this.svg.append("g");

            this.colors = options.style.colorPalette.dataColors;

            this.legend = createLegend(element,false, null);
        }

        public update(options: VisualUpdateOptions) {
            if (!options.dataViews || !options.dataViews[0]) return;
            var duration = options.suppressAnimations ? 0 : 250;

            var dataView = this.dataView = options.dataViews[0];
            var data = StreamGraph.converter(dataView, this.colors);
            var dataPoints = data.dataPoints;
            var viewport = options.viewport;
            var margins: IMargin = { left: 20, right: 20, bottom: 25, top: 25 };

            this.legend.drawLegend(data.legendData, viewport);

            var height = options.viewport.height - margins.top;

            this.svg.attr({
                'width': viewport.width,
                'height': height
            });

            var stack = d3.layout.stack();

            if (this.getWiggle(dataView)) 
                stack.offset('wiggle'); 
            var layers = stack(dataPoints);

            var x = d3.scale.linear()
                .domain([0, dataPoints[0].length - 1])
                .range([margins.left, viewport.width - margins.right]);

            var y = d3.scale.linear()
                .domain([0, d3.max(layers,(layer) => {
                return d3.max(layer,(d) => {
                    return d.y0 + d.y;
                });
            })]).range([height - margins.bottom, margins.top]);

            var area = d3.svg.area()
                .interpolate('basis')
                .x(d => x(d.x))
                .y0(d => y(d.y0))
                .y1(d => y(d.y0 + d.y));

            var sm = this.selectionManager;
            var selection = this.svg.selectAll(StreamGraph.Layer.selector)
                .data(layers);

            selection.enter()
                .append('path')
                .classed(StreamGraph.Layer.class, true);

            selection
                .style("fill",(d, i) => this.colors.getColorByIndex(i).value)
                .on('click', function (d) {
                sm.select(d[0].identity).then(ids=> {
                    if (ids.length > 0) {
                        selection.style('opacity', 0.5);
                        d3.select(this).style('opacity', 1);
                    } else {
                        selection.style('opacity', 1);
                    }
                });
            })
                .transition()
                .duration(duration)
                .attr("d", area);

            selection.exit().remove();

            this.drawAxis(viewport, margins);
        }

        private drawAxis(viewport: IViewport, margins: IMargin) {
            var dataView = this.dataView;
            var xS = d3.time.scale();
            var values = dataView.categorical.categories[0].values;
            xS.domain([values[0], values[values.length - 1]])
                .range([margins.left, viewport.width - margins.right]);

            var xAxis = d3.svg.axis().scale(xS).ticks(5);

            this.axis.attr("class", "x axis")
                .attr("transform", "translate(0," + (viewport.height - margins.bottom - margins.top) + ")")
                .call(xAxis);
        }

        private getWiggle(dataView: DataView) {
            if (dataView) {
                var objects = dataView.metadata.objects;
                if (objects) {
                    var general = objects['general'];
                    if (general) {
                        return <boolean>general['wiggle'];
                    }
                }
            }

            return true;
        }

        public enumerateObjectInstances(options: EnumerateVisualObjectInstancesOptions): VisualObjectInstance[] {
            var instances: VisualObjectInstance[] = [];
            var dataView = this.dataView;
            switch (options.objectName) {
                case 'general':
                    var general: VisualObjectInstance = {
                        objectName: 'general',
                        displayName: 'General',
                        selector: null,
                        properties: {
                            wiggle: this.getWiggle(dataView)
                        }
                    };
                    instances.push(general);
                    break;
            }

            return instances;
        }

    }
}