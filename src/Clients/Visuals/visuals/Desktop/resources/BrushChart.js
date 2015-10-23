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
// --/// <reference path="../_references.ts"/>
var powerbi;
(function (powerbi) {
    var visuals;
    (function (visuals) {
        var BrushChart1234567890123;
        (function (BrushChart1234567890123) {
            var SelectionManager = visuals.utility.SelectionManager;
            var BrushChart = (function () {
                function BrushChart(options) {
                    if (options) {
                        if (options.svg) {
                            this.svg = options.svg;
                        }
                        if (options.animator) {
                            this.animator = options.animator;
                        }
                        if (options.margin) {
                            this.margin = options.margin;
                        }
                    }
                }
                /*//Properties
                BrushChart.getFieldFill = function (dataView, field, property, defaultValue) {
                    if (dataView) {
                        var objects = dataView.metadata.objects;
                        if (objects) {
                            var f = objects[field];
                            if (f) {
                                var fill = f[property];
                                if (fill) {
                                    return fill;
                                }
                            }
                        }
                    }
                    return { solid: { color: defaultValue } };
                };
                */
                // Methods
                BrushChart.converter = function (dataView) {
                    //window.console.log('converter');
                    //window.console.log(dataView);
                    /*
                    var viewModel: BrushChartModel = {
                        label: "Hello",
                        x: new Date(),
                        y: 0,
                        colour: BrushChart.getFieldFill(dataView, 'general', 'fill', 'steelblue').solid.color
                    };
                    */
                    var category = dataView.categorical.categories[0];
                    var categoryValues = dataView.categorical.categories[0].values;
                    var values = dataView.categorical.values;
                    var metadataColumns = dataView.metadata.columns;
                    var dataPoints = [];
                    for (var i = 0, len = categoryValues.length; i < len; i++) {
                        dataPoints.push({
                            label: values[0].values[i],
                            x: categoryValues[i],
                            y: values[0].values[i],
                            colour: 'red'
                        });
                    }
                    return dataPoints;
                };
                BrushChart.prototype.init = function (options) {
                    var element = options.element; // added
                    this.selectionManager = new SelectionManager({ hostServices: options.host }); // added

                    this.svg = d3.select(element.get(0)).append('svg');
                    this.svg.classed("brushChart", true); // added, links to property in ts?
                    this.focus = this.svg.append('g');
                    this.context = this.svg.append('g');
                    this.focusArea = this.focus.append("path");
                    this.contextArea = this.context.append("path");
                    this.focusX = this.focus.append('g');
                    this.contextX = this.context.append('g');
                    this.focusY = this.focus.append('g');
                    this.contextY = this.context.append('g');
                    this.rect = this.svg.append("defs").append("clipPath").attr("id", "clip").append("rect");
                };
                BrushChart.prototype.update = function (options) {
                    if (!options.dataViews || !options.dataViews[0])
                        return;
                    var dataView = this.dataView = options.dataViews[0];
                    var viewport = options.viewport;
                    var data = BrushChart.converter(dataView);
                    var margin = { top: 10, right: 10, bottom: 100, left: 40 }, margin2 = { top: (viewport.height * 0.8), right: 10, bottom: 20, left: 40 }, width = viewport.width - margin.left - margin.right, height = viewport.height - margin.top - margin.bottom, height2 = viewport.height - margin2.top - margin2.bottom;
                    var x = d3.time.scale().range([0, width]), x2 = d3.time.scale().range([0, width]), y = d3.scale.linear().range([height, 0]), y2 = d3.scale.linear().range([height2, 0]);
                    var xAxis = d3.svg.axis().scale(x).orient("bottom"), xAxis2 = d3.svg.axis().scale(x2).orient("bottom"), yAxis = d3.svg.axis().scale(y).orient("left");
                    var area = d3.svg.area().interpolate("monotone").x(function (d) {
                        return x(d.x);
                    }).y0(height).y1(function (d) {
                        return y(+d.y);
                    });
                    var area2 = d3.svg.area().interpolate("monotone").x(function (d) {
                        return x2(d.x);
                    }).y0(height2).y1(function (d) {
                        return y2(+d.y);
                    });
                    var brush = d3.svg.brush().x(x2).on("brush", function brushed() {
                        x.domain(brush.empty() ? x2.domain() : brush.extent());
                        focus.select(".area").empty();
                        focus.select(".area").attr("d", area);
                        focus.select(".x.axis").call(xAxis);
                    }, false);
                    this.svg.attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).style("position", "absolute").style("font", "10px sans-serif");
                    this.rect.attr("width", width).attr("height", height);
                    var focus = this.focus;
                    focus.attr("class", "focus").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
                    var context = this.context;
                    context.attr("class", "context").attr("transform", "translate(" + margin2.left + "," + margin2.top + ")");
                    x.domain(d3.extent(data.map(function (d) {
                        return d.x;
                    })));
                    y.domain([0, d3.max(data.map(function (d) {
                        return +d.y;
                    }))]);
                    x2.domain(x.domain());
                    y2.domain(y.domain());
                    this.focusArea.datum(data).attr("class", "area").attr("d", area).attr('fill', this.getDetailsFill(this.dataView).solid.color).attr('clip-path', 'url(#clip)');
                    this.focusX.attr("class", "x axis").attr("transform", "translate(0," + height + ")").call(xAxis);
                    this.focusY.attr("class", "y axis").call(yAxis);
                    this.focusX.select('path').attr('fill', 'none').attr('stroke', '#000').attr('shape-rendering', 'crispEdges');
                    this.focusX.select('line').attr('fill', 'none').attr('stroke', '#000').attr('shape-rendering', 'crispEdges');
                    this.focusY.select('path').attr('fill', 'none').attr('stroke', '#000').attr('shape-rendering', 'crispEdges');
                    this.focusY.select('line').attr('fill', 'none').attr('stroke', '#000').attr('shape-rendering', 'crispEdges');
                    this.focusY.attr('background-color', 'white');
                    this.contextArea.datum(data).attr("class", "area brush").attr("d", area2).attr('fill', this.getSlicerFill(this.dataView).solid.color).attr('clip-path', 'url(#clip)');
                    this.contextX.attr("class", "x axis").attr("transform", "translate(0," + height2 + ")").call(xAxis2);
                    this.contextY.attr("class", "x brush").call(brush).selectAll("rect").attr("y", -6).attr("height", height2 + 7);
                    this.contextX.select('path').attr('fill', 'none').attr('stroke', '#000').attr('shape-rendering', 'crispEdges');
                    this.contextX.select('line').attr('fill', 'none').attr('stroke', '#000').attr('shape-rendering', 'crispEdges');
                    this.contextY.select('.extent').attr('stroke', '#fff').attr('fill-opacity', '.125').attr('shape-rendering', 'crispEdges');
                };
                BrushChart.prototype.enumerateObjectInstances = function (options) {
                    var instances = [];
                    switch (options.objectName) {
                        case 'label':
                            var label = {
                                objectName: 'label',
                                displayName: 'BrushChart Colors',
                                selector: null,
                                properties: {
                                    fill: this.getDetailsFill(this.dataView),
                                    fill1: this.getSlicerFill(this.dataView)
                                }
                            };
                            instances.push(label);
                            break;
                    }
                    return instances;
                };
                BrushChart.prototype.getDetailsFill = function (dataView) {
                    if (dataView && dataView.metadata.objects) {
                        var label = dataView.metadata.objects['label'];
                        if (label) {
                            return label['fill'];
                        }
                    }
                    return { solid: { color: '#333' } };
                };
                BrushChart.prototype.getSlicerFill = function (dataView) {
                    if (dataView && dataView.metadata.objects) {
                        var label = dataView.metadata.objects['label'];
                        if (label) {
                            return label['fill1'];
                        }
                    }
                    return { solid: { color: '#333' } };
                };
                BrushChart.capabilities = {
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
                    objects: {
                        general: {
                            displayName: powerbi.data.createDisplayNameGetter('Visual_General'),
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
                    },
                    dataViewMappings: [{
                        categorical: {
                            categories: { for: { in: 'Category' } },
                            values: {
                                select: [{ bind: { to: 'Y' } }]
                            }
                        }
                    }]
                };
                return BrushChart;
            })();
            BrushChart1234567890123.BrushChart = BrushChart;
        })(BrushChart1234567890123 = visuals.BrushChart1234567890123 || (visuals.BrushChart1234567890123 = {}));
    })(visuals = powerbi.visuals || (powerbi.visuals = {}));
})(powerbi || (powerbi = {}));
var powerbi;
(function (powerbi) {
    var visuals;
    (function (visuals) {
        var plugins;
        (function (plugins) {
            plugins.BrushChart1234567890123 = {
                name: 'BrushChart1234567890123',
                class: 'BrushChart1234567890123',
                capabilities: powerbi.visuals.BrushChart1234567890123.BrushChart.capabilities,
                custom: true, // added
                create: function () { return new powerbi.visuals.BrushChart1234567890123.BrushChart(); }
            };
        })(plugins = visuals.plugins || (visuals.plugins = {}));
    })(visuals = powerbi.visuals || (powerbi.visuals = {}));
})(powerbi || (powerbi = {}));
