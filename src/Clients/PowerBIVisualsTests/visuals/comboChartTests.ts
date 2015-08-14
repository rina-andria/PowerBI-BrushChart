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

module powerbitests {
    import DataViewTransform = powerbi.data.DataViewTransform;
    import ValueType = powerbi.ValueType;
    import PrimitiveType = powerbi.PrimitiveType;
    import ComboChart = powerbi.visuals.ComboChart;
    import ComboChartDataViewObjects = powerbi.visuals.ComboChartDataViewObjects;
    import ColorConverter = powerbitests.utils.ColorUtility.convertFromRGBorHexToHex;
    import AxisType = powerbi.axisType;

    powerbitests.mocks.setLocale();

    describe("ComboChart", () => {
        it("registered capabilities", () => {
            expect(powerbi.visuals.visualPluginFactory.create().getPlugin("comboChart").capabilities)
                .toBe(ComboChart.capabilities);

            expect(powerbi.visuals.visualPluginFactory.create().getPlugin("lineClusteredColumnComboChart").capabilities)
                .toBe(ComboChart.capabilities);

            expect(powerbi.visuals.visualPluginFactory.create().getPlugin("lineStackedColumnComboChart").capabilities)
                .toBe(ComboChart.capabilities);
        });

        it("capabilities should include dataViewMappings", () => {
            expect(ComboChart.capabilities.dataViewMappings).toBeDefined();
        });

        it("capabilities should include dataRoles", () => {
            expect(ComboChart.capabilities.dataRoles).toBeDefined();
        });

        it("Capabilities should not suppressDefaultTitle", () => {
            expect(ComboChart.capabilities.suppressDefaultTitle).toBeUndefined();
        });

        it("FormatString property should match calculated", () => {
            expect(powerbi.data.DataViewObjectDescriptors.findFormatString(powerbi.visuals.ComboChart.capabilities.objects))
                .toEqual(powerbi.visuals.comboChartProps.general.formatString);
        });

        it("Capabilities should include implicitSort", () => {
            expect(ComboChart.capabilities.sorting.default).toBeDefined();
        });
    });

    describe("ComboChart DOM validation", () => {
        var visualBuilder: VisualBuilder;

        beforeEach((done) => {
            visualBuilder = new VisualBuilder("comboChart");

            done();
        });

        it("Ensure both charts and axis created with two data views - default", (done) => {
            visualBuilder.onDataChanged({
                dataViews: [
                    dataViewFactory.buildDataViewDefault(),
                    dataViewFactory.buildDataViewInAnotherDomainOneValue()
                ]
            });

            setTimeout(() => {
                var lineCharts = $(".lineChart").length;
                var columnCharts = $(".columnChart").length;
                var yAxis = $(".y.axis").length;
                var legend = $(".legend").length;

                expect(lineCharts).toBe(1);
                expect(columnCharts).toBe(1);
                expect(yAxis).toBe(2);
                expect(legend).toBe(1);
                expect($(".legend").children.length).toBe(2);

                done();
            }, DefaultWaitForRender);
        });

        it("Ensure empty 1st dataview and populated 2nd has correct axes and lines", (done) => {
            visualBuilder.onDataChanged({
                dataViews: [
                    dataViewFactory.buildDataViewEmpty(),
                    dataViewFactory.buildDataViewDefault()
                ]
            });

            setTimeout(() => {
                var lineCharts = $(".lineChart").length;
                var columnCharts = $(".columnChart").length;
                var yAxisCount = $(".y.axis").length;
                var legend = $(".legend").length;

                expect(lineCharts).toBe(1);
                expect(columnCharts).toBe(1);
                expect(yAxisCount).toBe(2); //one is empty
                expect(legend).toBe(1);

                var yAxisPos = $(".y.axis").position();
                var rectCount = $(".columnChart .column").length;
                var lineCount = $(".lineChart .line").length;
                expect(yAxisPos.left).toBeLessThan(50);
                expect(rectCount).toBe(0);
                expect(lineCount).toBe(3);

                var y1 = $($(".y.axis")[0]).find(".tick").length;
                var y2 = $($(".y.axis")[1]).find(".tick").length;
                expect(y1).toEqual(8);
                expect(y2).toEqual(0);

                done();
            }, DefaultWaitForRender);
        });

        it("Ensure comboCharts clear - with metadata", (done) => {
            visualBuilder.onDataChanged({
                dataViews: [
                    dataViewFactory.buildDataViewInAnotherDomain(),
                    dataViewFactory.buildDataViewDefault()
                ]
            });

            setTimeout(() => {
                var lineCharts = $(".lineChart").length;
                var columnCharts = $(".columnChart").length;
                var yAxisCount = $(".y.axis").length;
                var legend = $(".legend").length;
                var rectCount = $(".columnChart .column").length;
                var y2tickCount = $($(".y.axis")[1]).find(".tick").length;
                
                expect(lineCharts).toBe(1);
                expect(columnCharts).toBe(1);
                expect(yAxisCount).toBe(2);
                expect(legend).toBe(1);
                expect(rectCount).toBe(3);
                expect($(".legend").children.length).toBe(2);
                expect(y2tickCount).toBeGreaterThan(0);

                // clear line
                visualBuilder.onDataChanged({
                    dataViews: [
                        dataViewFactory.buildDataViewInAnotherDomain(),
                        dataViewFactory.buildDataViewEmpty()
                    ]
                });

                setTimeout(() => {
                    var rectCountNew = $(".columnChart .column").length;
                    expect(rectCountNew).toBe(3);
                    var catCountNew = $(".lineChart").find(".cat").length;
                    expect(catCountNew).toBe(0);
                    var y2tickCountNew = $($(".y.axis")[1]).find(".tick").length;
                    expect(y2tickCountNew).toEqual(0);

                    // clear columns, add back line
                    visualBuilder.onDataChanged({
                        dataViews: [
                            dataViewFactory.buildDataViewEmpty(),
                            dataViewFactory.buildDataViewDefault()
                        ]
                    });

                    setTimeout(() => {
                        var rectCountFinal = $(".columnChart .column").length;
                        expect(rectCountFinal).toBe(0);
                        var catCountFinal = $(".lineChart").find(".cat").length;
                        expect(catCountFinal).toBe(3);
                        var y2tickCountFinal = $($(".y.axis")[1]).find(".tick").length;
                        // y2 axis (line value axis) should be shifted to y1 in this case
                        expect(y2tickCountFinal).toEqual(0);

                        done();
                    }, DefaultWaitForRender);
                }, DefaultWaitForRender);
            }, DefaultWaitForRender);
        });

        it("Ensure comboCharts clear - no line measure metadata", (done) => {
            visualBuilder.onDataChanged({
                dataViews: [
                    dataViewFactory.buildDataViewInAnotherDomain(),
                    dataViewFactory.buildDataViewDefault()
                ]
            });

            setTimeout(() => {
                var lineCharts = $(".lineChart").length;
                var columnCharts = $(".columnChart").length;
                var yAxisCount = $(".y.axis").length;
                var legend = $(".legend").length;
                var rectCount = $(".columnChart .column").length;
                var y2tickCount = $($(".y.axis")[1]).find(".tick").length;

                expect(lineCharts).toBe(1);
                expect(columnCharts).toBe(1);
                expect(yAxisCount).toBe(2);
                expect(legend).toBe(1);
                expect(rectCount).toBe(3);
                expect($(".legend").children.length).toBe(2);
                expect(y2tickCount).toBeGreaterThan(0);

                // clear line - only one dataView sent in
                visualBuilder.onDataChanged({
                    dataViews: [dataViewFactory.buildDataViewInAnotherDomain()]
                });

                setTimeout(() => {
                    var rectCountNew = $(".columnChart .column").length;
                    expect(rectCountNew).toBe(3);
                    var catCountNew = $(".lineChart").find(".cat").length;
                    expect(catCountNew).toBe(0);
                    var y2tickCountNew = $($(".y.axis")[1]).find(".tick").length;
                    expect(y2tickCountNew).toEqual(0);

                    done();
                }, DefaultWaitForRender);
            }, DefaultWaitForRender);
        });

        it("Ensure both charts and only one axis created with two data views - default", (done) => {
            visualBuilder.onDataChanged({
                dataViews: [
                    dataViewFactory.buildDataViewDefault(),
                    dataViewFactory.buildDataViewDefault()
                ]
            });

            setTimeout(() => {
                var lineCharts = $(".lineChart").length;
                var columnCharts = $(".columnChart").length;
                var yAxis = $(".y.axis").length;
                var legend = $(".legend").length;

                expect(lineCharts).toBe(1);
                expect(columnCharts).toBe(1);
                expect(yAxis).toBe(2);
                expect(legend).toBe(1);
                expect($(".legend").children.length).toBe(2);

                var y1 = $($(".y.axis")[0]).find(".tick").length;
                var y2 = $($(".y.axis")[1]).find(".tick").length;
                expect(y2).toEqual(0);
                expect(y1).not.toEqual(y2);

                done();
            }, DefaultWaitForRender);
        });

        it("Ensure both charts and axis created with two data views - stacked", (done) => {
            visualBuilder.onDataChanged({
                dataViews: [
                    dataViewFactory.buildDataViewDefault(true),
                    dataViewFactory.buildDataViewInAnotherDomain(true)
                ]
            });

            setTimeout(() => {
                var lineCharts = $(".lineChart").length;
                var columnCharts = $(".columnChart").length;
                var yAxis = $(".y.axis").length;
                var legend = $(".legend").length;

                expect(lineCharts).toBe(1);
                expect(columnCharts).toBe(1);
                expect(yAxis).toBe(2);
                expect(legend).toBe(1);

                done();
            }, DefaultWaitForRender);
        });

        it("Ensure both charts and One axis created with two data views - stacked", (done) => {
            visualBuilder.onDataChanged({
                dataViews: [
                    dataViewFactory.buildDataViewDefault(true),
                    dataViewFactory.buildDataViewDefault(true)
                ]
            });

            setTimeout(() => {
                var lineCharts = $(".lineChart").length;
                var columnCharts = $(".columnChart").length;
                var yAxis = $(".y.axis").length;
                var legend = $(".legend").length;

                expect(lineCharts).toBe(1);
                expect(columnCharts).toBe(1);
                expect(yAxis).toBe(2);
                expect(legend).toBe(1);

                var y1 = $($(".y.axis")[0]).find(".tick").length;
                var y2 = $($(".y.axis")[1]).find(".tick").length;
                expect(y2).toEqual(0);
                expect(y1).not.toEqual(y2);

                done();
            }, DefaultWaitForRender);
        });

        it("Ensure both charts and axis created with two data views - clustered", (done) => {
            visualBuilder.onDataChanged({
                dataViews: [
                    dataViewFactory.buildDataViewDefault(true),
                    dataViewFactory.buildDataViewInAnotherDomain(true)
                ]
            });

            setTimeout(() => {
                var lineCharts = $(".lineChart").length;
                var columnCharts = $(".columnChart").length;
                var yAxis = $(".y.axis").length;
                var legend = $(".legend").length;

                expect(lineCharts).toBe(1);
                expect(columnCharts).toBe(1);
                expect(yAxis).toBe(2);
                expect(legend).toBe(1);

                done();
            }, DefaultWaitForRender);
        });

        it("Ensure both charts and only one axis created with two data views - clustered", (done) => {
            visualBuilder.onDataChanged({
                dataViews: [
                    dataViewFactory.buildDataViewDefault(true),
                    dataViewFactory.buildDataViewDefault(true)
                ]
            });

            setTimeout(() => {
                var lineCharts = $(".lineChart").length;
                var columnCharts = $(".columnChart").length;
                var yAxis = $(".y.axis").length;
                var legend = $(".legend").length;

                expect(lineCharts).toBe(1);
                expect(columnCharts).toBe(1);
                expect(yAxis).toBe(2);
                expect(legend).toBe(1);

                var y1 = $($(".y.axis")[0]).find(".tick").length;
                var y2 = $($(".y.axis")[1]).find(".tick").length;
                expect(y2).toEqual(0);
                expect(y1).not.toEqual(y2);

                done();
            }, DefaultWaitForRender);
        });

        it("combo chart validate auto margin", (done) => {
            visualBuilder.onDataChanged({
                dataViews: [
                    dataViewFactory.buildDataViewDefault(true),
                    dataViewFactory.buildDataViewDefault(true)
                ]
            });

            setTimeout(() => {
                var yTranslate = parseFloat($(".axisGraphicsContext .x.axis").attr("transform").split(",")[1].replace("(", ""));
                var xTranslate = parseFloat($(".axisGraphicsContext .y.axis").attr("transform").split(",")[0].split("(")[1]);

                visualBuilder.onDataChanged({
                    dataViews: [
                        dataViewFactory.buildDataViewSuperLongLabels(true),
                        dataViewFactory.buildDataViewSuperLongLabels(true)
                    ]
                });

                setTimeout(() => {
                    var newYTranslate = parseFloat($(".axisGraphicsContext .x.axis").attr("transform").split(",")[1].replace("(", ""));
                    var newXTranslate = parseFloat($(".axisGraphicsContext .y.axis").attr("transform").split(",")[0].split("(")[1]);
                    expect(yTranslate).toBeGreaterThan(newYTranslate);
                    expect(newXTranslate).toBeGreaterThan(xTranslate);
                    done();
                }, DefaultWaitForRender);
            }, DefaultWaitForRender);
        });

        it("Ensure scrollbar is shown at smaller viewport dimensions", (done) => {
            visualBuilder.setSize("100", "100");

            visualBuilder.buildVisualMinerva("lineClusteredColumnComboChart");

            visualBuilder.onDataChanged({
                dataViews: [
                    dataViewFactory.buildDataViewManyCategories(true),
                    dataViewFactory.buildDataViewManyCategories(true)
                ]
            });

            setTimeout(() => {
                var yAxis = $(".y.axis").length;               
                expect(yAxis).toBe(2);

                var y1 = $(".svgScrollable").attr("width");
                expect(y1).toBeLessThan(visualBuilder.element.width());

                expect($("rect.extent").length).toBe(1);
                expect(parseInt($(".brush .extent")[0].attributes.getNamedItem("width").value, 0)).toBeGreaterThan(8);

                done();
            }, DefaultWaitForRender);
        });

        it("Ensure all data points has the default color", (done) => {
            var dataView1 = dataViewFactory.buildDataViewDefault(true);
            var dataView2 = dataViewFactory.buildDataViewInAnotherDomain(true);

            dataView1.metadata.objects = {
                dataPoint: {
                    defaultColor: { solid: { color: "#FF0000" } }                    
                }
            };  

            dataView2.metadata.objects = {
                dataPoint: {
                    defaultColor: { solid: { color: "#FF0000" } }
                }
            };  

            visualBuilder.onDataChanged({ dataViews: [dataView1, dataView2] });

            setTimeout(() => {
                var lineCharts = $(".lineChart").length;
                var columnCharts = $(".columnChart").length;
                var yAxis = $(".y.axis").length;
                var legend = $(".legend").length;

                expect(lineCharts).toBe(1);
                expect(columnCharts).toBe(1);
                expect(yAxis).toBe(2);
                expect(legend).toBe(1);
                
                expect(ColorConverter($($(".legendIcon")[0]).css("fill"))).toBe("#ff0000");
                expect(ColorConverter($($(".legendIcon")[2]).css("fill"))).toBe("#ff0000");

                done();
            }, DefaultWaitForRender);
        });

        it("Ensure zero axis line is darkened", (done) => {
            visualBuilder.onDataChanged({
                dataViews: [
                    dataViewFactory.buildDataViewNegative(true),
                    dataViewFactory.buildDataViewNegative(true)
                ]
            });

            setTimeout(() => {
                var zeroTicks = $("g.tick:has(line.zero-line)");

                expect(zeroTicks.length).toBe(2);
                zeroTicks.each((i, item) => {
                    expect(d3.select(item).datum() === 0).toBe(true);
                });

                done();
            }, DefaultWaitForRender);
        });

        //Data Labels
        it("Ensure data labels are on both charts with default color", (done) => {
            var dataView1 = dataViewFactory.buildDataForLabelsFirstType();
            var dataView2 = dataViewFactory.buildDataForLabelsSecondType();
            
            visualBuilder.onDataChanged({ dataViews: [dataView1, dataView2] });

            setTimeout(() => {
                var columnLabels = $('.columnChartMainGraphicsContext .labels .data-labels');
                var lineLabels = $('.lineChartSVG .labels .data-labels');

                expect(columnLabels.length).toBeGreaterThan(0);
                expect(lineLabels.length).toBeGreaterThan(0);

                var fillColumnLabel = columnLabels.first().css("fill");
                var fillLineLabel = lineLabels.first().css("fill");

                var labelColor = powerbi.visuals.dataLabelUtils.defaultLabelColor;

                expect(ColorConverter(fillColumnLabel)).toBe(labelColor);
                expect(ColorConverter(fillLineLabel)).toBe(labelColor);

                done();
            }, DefaultWaitForRender);
        });

        it("Ensure data labels removed when remove column chart values", (done) => {
            var dataView1 = dataViewFactory.buildDataForLabelsFirstType();
            var dataView2 = dataViewFactory.buildDataForLabelsSecondType();

            visualBuilder.onDataChanged({
                dataViews: [dataView1, dataView2]
            });

            setTimeout(() => {
                var columnLabels = $('.columnChartMainGraphicsContext .labels .data-labels');
                var lineLabels = $('.lineChartSVG .labels .data-labels');

                expect(columnLabels.length).toBeGreaterThan(0);
                expect(lineLabels.length).toBeGreaterThan(0);

                visualBuilder.onDataChanged({
                    dataViews: [
                        dataViewFactory.buildDataViewEmpty(),
                        dataView2]
                });

                setTimeout(() => {
                    var columnLabels2 = $('.columnChartMainGraphicsContext .labels .data-labels');
                    var lineLabels2 = $('.lineChartSVG .labels .data-labels');

                    expect(columnLabels2.length).toBe(0);
                    expect(lineLabels2.length).toBeGreaterThan(0);

                    done();
                }, DefaultWaitForRender);

            }, DefaultWaitForRender);
        });

        it("Labels should support display units with no precision", (done) => {
            var dataView1 = dataViewFactory.buildDataForLabelsFirstType(undefined, 1000, 0);
            var dataView2 = dataViewFactory.buildDataForLabelsSecondType(undefined, 1000, 0);

            visualBuilder.onDataChanged({ dataViews: [dataView1, dataView2] });

            setTimeout(() => {
                var columnLabels = $('.columnChartMainGraphicsContext .labels .data-labels');
                var lineLabels = $('.lineChartSVG .labels .data-labels');

                expect(columnLabels.first().text()).toBe("0K");
                expect(lineLabels.first().text()).toBe("0K");

                done();
            }, DefaultWaitForRender);
        });
       
        it("Labels should support display units with precision", (done) => {
            var dataView1 = dataViewFactory.buildDataForLabelsFirstType(undefined, 1000, 1);
            var dataView2 = dataViewFactory.buildDataForLabelsSecondType(undefined, 1000, 1);

            visualBuilder.onDataChanged({ dataViews: [dataView1, dataView2] });

            setTimeout(() => {
                var columnLabels = $('.columnChartMainGraphicsContext .labels .data-labels');
                var lineLabels = $('.lineChartSVG .labels .data-labels');

                expect(columnLabels.first().text()).toBe("0.1K");
                expect(lineLabels.first().text()).toBe("0.2K");

                done();
            }, DefaultWaitForRender);
        });

        it("Values that have NaN show a warning.", (done) => {
            visualBuilder.onDataChanged({
                dataViews: [
                    dataViewFactory.buildDataViewInvalid(NaN)
                ]
            });

            setTimeout(() => {
                expect(visualBuilder.warningSpy).toHaveBeenCalled();
                expect(visualBuilder.warningSpy.calls.count()).toBe(1);
                expect(visualBuilder.warningSpy.calls.argsFor(0)[0][0].code).toBe("NaNNotSupported");
                done();
            }, DefaultWaitForRender);
        });

        it("Values that have Negative Infinity show a warning.", (done) => {
            visualBuilder.onDataChanged({
                dataViews: [
                    dataViewFactory.buildDataViewInvalid(Number.NEGATIVE_INFINITY)
                ]
            });

            setTimeout(() => {
                expect(visualBuilder.warningSpy).toHaveBeenCalled();
                expect(visualBuilder.warningSpy.calls.count()).toBe(1);
                expect(visualBuilder.warningSpy.calls.argsFor(0)[0][0].code).toBe("InfinityValuesNotSupported");
                done();
            }, DefaultWaitForRender);
        });

        it("Values that have Positive Infinity show a warning.", (done) => {
            visualBuilder.onDataChanged({
                dataViews: [
                    dataViewFactory.buildDataViewInvalid(Number.POSITIVE_INFINITY)
                ]
            });

            setTimeout(() => {
                expect(visualBuilder.warningSpy).toHaveBeenCalled();
                expect(visualBuilder.warningSpy.calls.count()).toBe(1);
                expect(visualBuilder.warningSpy.calls.argsFor(0)[0][0].code).toBe("InfinityValuesNotSupported");
                done();
            }, DefaultWaitForRender);
        });

        it("Values that are out of range show a warning.", (done) => {
            visualBuilder.onDataChanged({
                dataViews: [
                    dataViewFactory.buildDataViewInvalid(1e301)
                ]
            });

            setTimeout(() => {
                expect(visualBuilder.warningSpy).toHaveBeenCalled();
                expect(visualBuilder.warningSpy.calls.count()).toBe(1);
                expect(visualBuilder.warningSpy.calls.argsFor(0)[0][0].code).toBe("ValuesOutOfRange");
                done();
            }, DefaultWaitForRender);
        });

        it("All values good do not show a warning.", (done) => {
            visualBuilder.onDataChanged({
                dataViews: [
                    dataViewFactory.buildDataViewInvalid(3)
                ]
            });

            setTimeout(() => {
                expect(visualBuilder.warningSpy).not.toHaveBeenCalled();
                done();
            }, DefaultWaitForRender);
        });

        it("Ensure data lables are on both charts with custom color", (done) => {
            var color = { solid: { color: "rgb(255, 0, 0)" } }; // Red

            var dataView1 = dataViewFactory.buildDataForLabelsFirstType(color);
            var dataView2 = dataViewFactory.buildDataForLabelsSecondType(color);

            visualBuilder.onDataChanged({ dataViews: [dataView1, dataView2] });

            setTimeout(() => {
                var columnLabels = $('.columnChartMainGraphicsContext .labels .data-labels');
                var lineLabels = $('.lineChartSVG .labels .data-labels');
                
                expect(columnLabels.length).toBeGreaterThan(0);
                expect(lineLabels.length).toBeGreaterThan(0);

                var fillColumnLabel = columnLabels.first().css("fill");
                var fillLineLabel = lineLabels.first().css("fill");

                expect(ColorConverter(fillColumnLabel)).toBe(ColorConverter(color.solid.color));
                expect(ColorConverter(fillLineLabel)).toBe(ColorConverter(color.solid.color));

                done();
            }, DefaultWaitForRender);
        });

        it("Ensure data lables are on both charts and removed", (done) => {
            var dataView1 = dataViewFactory.buildDataForLabelsFirstType();
            var dataView2 = dataViewFactory.buildDataForLabelsSecondType();

            dataView1.metadata.objects = { labels: { show: true } };
            dataView2.metadata.objects = { labels: { show: true } };

            visualBuilder.onDataChanged({ dataViews: [dataView1, dataView2] });

            setTimeout(() => {
                var columnLabels = $('.columnChartMainGraphicsContext .labels .data-labels');
                var lineLabels = $('.lineChartSVG .labels .data-labels');

                expect(columnLabels.length).toBeGreaterThan(0);
                expect(lineLabels.length).toBeGreaterThan(0);

                dataView1.metadata.objects = { labels: { show: false } };
                dataView2.metadata.objects = { labels: { show: false } };

                visualBuilder.onDataChanged({ dataViews: [dataView1, dataView2] });

                setTimeout(() => {
                    var columnLabels2 = $('.columnChartMainGraphicsContext .labels .data-labels');
                    var lineLabels2 = $('.lineChartSVG .labels .data-labels');

                expect(columnLabels2.length).toBe(0);
                expect(lineLabels2.length).toBe(0);
                    done();
                }, DefaultWaitForRender);
                done();
            }, DefaultWaitForRender);
        });
        
        it("Validate enumerate labels", (done) => {
            var dataView1 = dataViewFactory.buildDataForLabelsFirstType();

            dataView1.metadata.objects = null;

            visualBuilder.onDataChanged({ dataViews: [dataView1, null] });
            var points = visualBuilder.visual.enumerateObjectInstances({ objectName: "labels" });

            setTimeout(() => {
                expect(points.length).toBeGreaterThan(0);
                done();
            }, DefaultWaitForRender);
        });        

        it('validate shoulShowLegendCard with single value on column and no line values', (done) => {
            var dataView1 = dataViewFactory.buildDataViewSingleMeasure();

            var lineDataView = null;
           
            visualBuilder.onDataChanged({ dataViews: [dataView1, lineDataView] });

            var points = visualBuilder.visual.enumerateObjectInstances({ objectName: 'legend' });

            setTimeout(() => {
                expect(points).not.toBeDefined();
                done();
            }, DefaultWaitForRender);
        });

        it('validate shoulShowLegendCard with dynamic series on column and no line values', (done) => {
            var dynamicSeriesDataView = dataViewFactory.buildDataViewDynamicSeries();

            var lineDataView = null;
            
            visualBuilder.onDataChanged({ dataViews: [dynamicSeriesDataView, lineDataView] });

            var points = visualBuilder.visual.enumerateObjectInstances({ objectName: 'legend' });

            setTimeout(() => {
                expect(points.length).toBeGreaterThan(0);
                done();
            }, DefaultWaitForRender);
            });

        it('validate shoulShowLegendCard with static series for column and line', (done) => {
            var dynamicSeriesDataView = dataViewFactory.buildDataViewDefault();
            var staticSeriesDataView = dataViewFactory.buildDataViewDefault();
            
            visualBuilder.onDataChanged({ dataViews: [dynamicSeriesDataView, staticSeriesDataView] });

            var points = visualBuilder.visual.enumerateObjectInstances({ objectName: 'legend' });

            setTimeout(() => {
                expect(points.length).toBeGreaterThan(0);
                done();
            }, DefaultWaitForRender);
        });

        it('xAxis customization- begin and end check', (done) => {
            var objects: ComboChartDataViewObjects = {
                general: dataViewFactory.general,
                categoryAxis: {
                    displayName: "scalar",
                    show: true,
                    start: 0,
                    end: 1000,
                    axisType: AxisType.scalar,
                    showAxisTitle: true,
                    axisStyle: true
                }
            };
            visualBuilder.onDataChanged({
                dataViews: [
                    dataViewFactory.buildDataViewNumber(objects),
                    dataViewFactory.buildDataViewNumber(objects)]
            });

            setTimeout(() => {
                var labels = $(".x.axis").children(".tick");

                //Verify begin&end labels
                expect(labels[0].textContent).toBe("0");
                expect(labels[labels.length - 1].textContent).toBe("1,000");

                done();
            }, DefaultWaitForRender);
        });

        it("Merge axes when user turns off the secondary axis.", (done) => {
            var objects: ComboChartDataViewObjects = {
                general: dataViewFactory.general,
                valueAxis: {
                    secShow: false
                }
            };

            var dataView = dataViewFactory.buildDataViewCustomSingleColumn(objects, [[4000, 6000, 10000]]);
            
            var dataViewAnotherDomain = dataViewFactory.buildDataViewCustom(objects, [[1], [10], [20]]);
            
            visualBuilder.onDataChanged({ dataViews: [dataViewAnotherDomain, dataView] });
            setTimeout(() => {
                var axisLabels = $(".axisGraphicsContext .y.axis").first().find(".tick");
                
                expect(axisLabels[0].textContent).toBe("0K");
                expect(axisLabels[axisLabels.length - 1].textContent).toBe("10K");

                done();
            }, DefaultWaitForRender);
        });

        it("Unmerge axis when user turns on the secondary axis.", (done) => {
            var objects: ComboChartDataViewObjects = {
                general: dataViewFactory.general,
                valueAxis: {
                    secShow: true
                }
            };

            var dataView = dataViewFactory.buildDataViewCustomSingleColumn(objects, [[5, 15, 25]]);

            var dataViewAnotherDomain = dataViewFactory.buildDataViewCustom(objects, [[1], [10], [30]]);

            visualBuilder.onDataChanged({ dataViews: [dataViewAnotherDomain, dataView] });
            setTimeout(() => {
                var axisLabels = $(".axisGraphicsContext .y.axis").first().find(".tick");
                
                expect(axisLabels[0].textContent).toBe("0");
                expect(axisLabels[axisLabels.length - 1].textContent).toBe("30");

                axisLabels = $(".axisGraphicsContext .y.axis").last().find(".tick");
                
                expect(axisLabels[0].textContent).toBe("5");
                expect(axisLabels[axisLabels.length - 1].textContent).toBe("25");

                done();
            }, DefaultWaitForRender);
        });

        it("Verify force to zero works for a positive domain range", (done) => {
            visualBuilder.onDataChanged({
                dataViews: [
                    dataViewFactory.buildDataViewInAnotherDomain(),
                    dataViewFactory.buildDataViewCustom(undefined, [[4000, 6000, 7000]])]
            });

            setTimeout(() => {
                var axisLabels = $(".axisGraphicsContext .y.axis").last().find(".tick");
                //Verify begin&end labels
                expect(axisLabels[0].textContent).toBe("0K");
                expect(axisLabels[axisLabels.length - 1].textContent).toBe("7K");

                done();
            }, DefaultWaitForRender);
        });

        it("Verify force to zero is not set for a negative domain range", (done) => {
            visualBuilder.onDataChanged({
                dataViews: [
                    dataViewFactory.buildDataViewInAnotherDomain(),
                    dataViewFactory.buildDataViewCustom(undefined, [[-2000, -6000, -7000]])]
            });

            setTimeout(() => {
                var axisLabels = $(".axisGraphicsContext .y.axis").last().find(".tick");
                //Verify begin&end axis labels
                expect(axisLabels[0].textContent).toBe("-7K");
                expect(axisLabels[axisLabels.length - 1].textContent).toBe("-2K");

                done();
            }, DefaultWaitForRender);
        });

        it("Ensure both titles created in Line and Stacked column chart", (done) => {
            var objects: ComboChartDataViewObjects = {
                general: dataViewFactory.general,
                valueAxis: {
                    show: true,
                    showAxisTitle: true,
                    secShowAxisTitle: true
                }
            };

            visualBuilder.onDataChanged({
                dataViews: [
                    dataViewFactory.buildDataViewNumber(objects),
                    dataViewFactory.buildDataViewInAnotherDomainOneValue(objects)]
            });

            setTimeout(() => {
                var lineAxisLabel = $(".yAxisLabel").length;
                expect(lineAxisLabel).toBe(2);
                expect($(".yAxisLabel").first().text()).toBe("col2, col3 and col4");
                expect($(".yAxisLabel").last().text()).toBe("col2");

                done();
            }, DefaultWaitForRender);
        });

        it("Ensure only secondary title created in Line and Stacked column chart", (done) => {
            var objects: ComboChartDataViewObjects = {
                general: dataViewFactory.general,
                valueAxis: {
                    show: true,
                    showAxisTitle: false,
                    secShowAxisTitle: true
                }
            };

            visualBuilder.onDataChanged({
                dataViews: [
                    dataViewFactory.buildDataViewNumber(objects),
                    dataViewFactory.buildDataViewInAnotherDomainOneValue(objects)]
            });

            setTimeout(() => {
                var lineAxisLabel = $(".yAxisLabel").length;
                expect(lineAxisLabel).toBe(1);
                expect($(".yAxisLabel").first().text()).toBe("col2");

                done();
            }, DefaultWaitForRender);
        });

        it("Combo chart with dynamic series and static series has correct colors", (done) => {
            var colors = [
                { value: "#000000" },
                { value: "#000001" },
                { value: "#000002" },
                { value: "#000003" },
                { value: "#000004" }
            ];

            visualBuilder.style.colorPalette.dataColors = new powerbi.visuals.DataColorPalette(colors);

            visualBuilder.initVisual();

            var dynamicSeriesDataView = dataViewFactory.buildDataViewDynamicSeries();
            var staticSeriesDataView = dataViewFactory.buildDataViewDefault();

            // Column chart has a dynamic series, line chart has a static series.
            visualBuilder.onDataChanged({ dataViews: [dynamicSeriesDataView, staticSeriesDataView] });

            setTimeout(() => {
                var lines = $(".lineChart .line");

                var columnSeries = $(".columnChart .series");
                expect(columnSeries.length).toBe(2);

                var series1Columns = columnSeries.eq(0).children(".column");
                var series2Columns = columnSeries.eq(1).children(".column");

                // Dynamic series columns
                expect(ColorConverter(series1Columns.eq(0).css("fill"))).toEqual(colors[0].value);
                expect(ColorConverter(series1Columns.eq(1).css("fill"))).toEqual(colors[0].value);
                expect(ColorConverter(series1Columns.eq(2).css("fill"))).toEqual(colors[0].value);

                expect(ColorConverter(series2Columns.eq(0).css("fill"))).toEqual(colors[1].value);
                expect(ColorConverter(series2Columns.eq(1).css("fill"))).toEqual(colors[1].value);
                expect(ColorConverter(series2Columns.eq(2).css("fill"))).toEqual(colors[1].value);

                // Static series lines
                expect(ColorConverter(lines.eq(0).css("stroke"))).toBe(colors[2].value);
                expect(ColorConverter(lines.eq(1).css("stroke"))).toBe(colors[3].value);
                expect(ColorConverter(lines.eq(2).css("stroke"))).toBe(colors[4].value);

                done();
            }, DefaultWaitForRender);
        });

        it("Combo chart with two static series has correct colors", (done) => {
            var colors = [
                { value: "#000000" },
                { value: "#000001" },
                { value: "#000002" },
                { value: "#000003" },
                { value: "#000004" }
            ];

            visualBuilder.style.colorPalette.dataColors = new powerbi.visuals.DataColorPalette(colors);

            visualBuilder.initVisual();

            var dataView1 = dataViewFactory.buildDataViewCustom(undefined, [[100, 200, 700], [1000, 2000, 7000]], ["a", "b"]);

            var dataView2 = dataViewFactory.buildDataViewCustomWithIdentities([[100, 200, 700], [10000, 20000, 70000]]);

            // Both layers have static series
            visualBuilder.onDataChanged({ dataViews: [dataView1, dataView2] });

            setTimeout(() => {
                var lines = $(".lineChart .line");

                var columnSeries = $(".columnChart .series");
                expect(columnSeries.length).toBe(2);

                var series1Columns = columnSeries.eq(0).children(".column");
                var series2Columns = columnSeries.eq(1).children(".column");

                // Static series columns
                expect(ColorConverter(series1Columns.eq(0).css("fill"))).toEqual(colors[0].value);
                expect(ColorConverter(series1Columns.eq(1).css("fill"))).toEqual(colors[0].value);

                expect(ColorConverter(series2Columns.eq(0).css("fill"))).toEqual(colors[1].value);
                expect(ColorConverter(series2Columns.eq(1).css("fill"))).toEqual(colors[1].value);

                // Static series lines
                expect(ColorConverter(lines.eq(0).css("stroke"))).toBe(colors[2].value);
                expect(ColorConverter(lines.eq(1).css("stroke"))).toBe(colors[3].value);

                done();
            }, DefaultWaitForRender);
        });
    });

    describe("SharedColorPalette", () => {
        var dataColors: powerbi.visuals.DataColorPalette;
        var sharedPalette: powerbi.visuals.SharedColorPalette;
        var colors = [
            { value: "#000000" },
            { value: "#000001" },
            { value: "#000002" },
            { value: "#000003" }
        ];

        beforeEach(() => {
            dataColors = new powerbi.visuals.DataColorPalette(colors);
            sharedPalette = new powerbi.visuals.SharedColorPalette(dataColors);
        });

        it("should get colors for series values from shared series scale", () => {
            var scale1 = dataColors.getColorScaleByKey("series");
            var colorA = scale1.getColor("a");
            var colorB = scale1.getColor("b");

            var scale2 = sharedPalette.getColorScaleByKey("series");

            expect(scale2.getColor("b").value).toEqual(colorB.value);
            expect(scale2.getColor("a").value).toEqual(colorA.value);
        });

        it("should get colors for measures from default scale", () => {
            var scale = sharedPalette.getNewColorScale();

            expect(scale.getColor(0).value).toEqual(colors[0].value);
            expect(scale.getColor(1).value).toEqual(colors[1].value);
        });

        it("measure colors should come after series colors", () => {
            var seriesScale = sharedPalette.getColorScaleByKey("series");
            var seriesColor1 = seriesScale.getColor("key1");
            var seriesColor2 = seriesScale.getColor("key2");

            sharedPalette.rotateScale();

            var measureScale = sharedPalette.getNewColorScale();
            var measureColor1 = measureScale.getColor(0);
            var measureColor2 = measureScale.getColor(1);

            expect(seriesColor1.value).toEqual(colors[0].value);
            expect(seriesColor2.value).toEqual(colors[1].value);
            expect(measureColor1.value).toEqual(colors[2].value);
            expect(measureColor2.value).toEqual(colors[3].value);
        });

        it("measure colors should come after measure colors", () => {
            var measureScale1 = sharedPalette.getNewColorScale();
            var measureColor1 = measureScale1.getColor(0);
            var measureColor2 = measureScale1.getColor(1);

            sharedPalette.rotateScale();

            var measureScale2 = sharedPalette.getNewColorScale();
            var measureColor3 = measureScale2.getColor(1);
            var measureColor4 = measureScale2.getColor(2);

            expect(measureColor1.value).toEqual(colors[0].value);
            expect(measureColor2.value).toEqual(colors[1].value);
            expect(measureColor3.value).toEqual(colors[2].value);
            expect(measureColor4.value).toEqual(colors[3].value);
        });

        it("getSentimentColors should call parent", () => {
            var spy = spyOn(dataColors, "getSentimentColors").and.callThrough();

            sharedPalette.getSentimentColors();

            expect(spy).toHaveBeenCalled();
        });

        it("getBasePickerColors should call parent", () => {
            var spy = spyOn(dataColors, "getBasePickerColors").and.callThrough();

            sharedPalette.getBasePickerColors();

            expect(spy).toHaveBeenCalled();
        });
    });

    class VisualBuilder {
        public element: JQuery;
        
        private _warningSpy: jasmine.Spy;

        public get warningSpy(): jasmine.Spy {
            return this._warningSpy;
        }

        private _visual: powerbi.IVisual;

        public get visual(): powerbi.IVisual {
            return this._visual;
        }

        public set visual(value: powerbi.IVisual) {
            this._visual = value;
        }

        private _hostService: powerbi.IVisualHostServices;

        public get hostService(): powerbi.IVisualHostServices {
            return this._hostService;
        }

        private _style: powerbi.IVisualStyle;

        public get style(): powerbi.IVisualStyle {
            return this._style;
        }

        private _height: string;

        public get height(): string {
            return this._height;
        }
        
        private _width: string;

        public get width(): string {
            return this._width;
        }

        public setSize(width: string, height: string) {
            this._width = width;
            this._height = height;

            this.init();
        }

        constructor(pluginName: string, width: string = "400", height: string = "400") {
            this._visual = powerbi.visuals.visualPluginFactory.create().getPlugin(pluginName).create();

            this.setSize(width, height);
        }

        private init() {
            this.element = helpers.testDom(this.height, this.width);
            this._hostService = mocks.createVisualHostServices();
            this._style = powerbi.visuals.visualStyles.create();
            this._warningSpy = jasmine.createSpy("warning");
            this._hostService.setWarnings = this.warningSpy;

            this.initVisual();
        }

        public buildVisualMinerva(pluginName: string) {
            this._visual =
                powerbi.visuals.visualPluginFactory.createMinerva({}).getPlugin(pluginName).create();

            this.init();
        }

        public initVisual() {
            this.visual.init({
                element: this.element,
                host: this.hostService,
                style: this.style,
                viewport: {
                    height: this.element.height(),
                    width: this.element.width()
                }
            });
        }

        public onDataChanged(options: powerbi.VisualDataChangedOptions) {
            this.visual.onDataChanged(options);
        }
    }

    class DataViewBuilder {
        public general: any = null;

        private _categoriesValues: any[] = [];

        public get categoriesValues(): any[] {
            return this._categoriesValues;
        }

        public set categoriesValues(value: any[]) {
            this._categoriesValues = value;
        }

        public columns: any[];

        public values: any[] = [];

        public categoricalValues: any[] = [];

        private buildCategoricalValues() {
            this.categoricalValues = [];

            for (var i = 0; i < this.values.length; i++) {
                var categoricalValue: any = {
                    source: this.getSource(i + 1),
                    subtotal: this.getSubtotal(this.values[i]),
                    values: this.values[i],
                    identity: this.valuesIdentities[i]
                };

                this.categoricalValues.push(categoricalValue);
            }
        }

        private getSource(index) {
            if (!this.categoriesColumns) {
                return undefined;
            }

            if (this.categoriesColumns[index]) {
                return this.categoriesColumns[index];
            }

            return this.categoriesColumns[this.categoriesColumns.length - 1];
        }

        private getSubtotal(values: any[]) {
            return values.reduce((x, y) => x + y);
        }

        public objects: any = null;

        public metadata;

        public properties;

        private buildMetadata() {
            this.metadata = {
                columns: this.columns,
                properties: this.properties,
                objects: this.objects
            };
        }

        public categories: any[];

        public categoriesColumns: any[] = undefined;

        private buildCategories() {
            this.categories = [{
                source: this.getSource(0),
                values: this.categoriesValues,
                identity: this.categoryIdentities
            }];
        }

        private buildCategoriesColumns() {
            if (!this.categoriesColumns) {
                this.categoriesColumns = this.columns;
            }
        }

        public update() {
            this.buildCategoriesColumns();

            this.buildCategoryIdentities();
            this.buildValuesIdentities();

            this.buildCategoricalValues();
            this.buildMetadata();
            this.buildCategories();
        }

        public isBuildCategoryIdentities: boolean = false;

        private categoryIdentities: any[] = null;

        private buildCategoryIdentities() {
            if (this.isBuildCategoryIdentities) {
                this.categoryIdentities =
                    this.categoriesValues.map((value) => mocks.dataViewScopeIdentity(value));
            }
        }

        public identities: any[] = [];

        private valuesIdentities: any[] = null;

        private buildValuesIdentities() {
            this.valuesIdentities = this.identities.map(
                (value) => mocks.dataViewScopeIdentity(value));
        }

        public columnIdentityRef: any = undefined;

        public sourceValueColumn: any = undefined;

        private buildValueColumns() {
            if (this.columnIdentityRef !== undefined &&
                this.sourceValueColumn !== undefined) {
                return DataViewTransform.createValueColumns(
                    this.categoricalValues,
                    [this.columnIdentityRef],
                    this.sourceValueColumn);
            }

            return DataViewTransform.createValueColumns(this.categoricalValues);
        }

        public build() {
            return {
                metadata: this.metadata,
                categorical: {
                    categories: this.categories,
                    values: this.buildValueColumns()
                }
            };
        }
    }

    module dataViewFactory {
        export var general: powerbi.visuals.ComboChartDataViewObject = {
            visualType1: "Column",
            visualType2: "Line"
        };

        var columns = [
            {displayName: "col1", queryName: "col1", index: 0, type: ValueType.fromPrimitiveTypeAndCategory(PrimitiveType.Text)},
            {displayName: "col2", queryName: "col2", isMeasure: true, index: 1, groupName: "a", type: ValueType.fromPrimitiveTypeAndCategory(PrimitiveType.Double)},
            {displayName: "col3", queryName: "col3", isMeasure: true, index: 2, groupName: "b", type: ValueType.fromPrimitiveTypeAndCategory(PrimitiveType.Double)},
            {displayName: "col4", queryName: "col4", isMeasure: true, index: 3, groupName: "c", type: ValueType.fromPrimitiveTypeAndCategory(PrimitiveType.Double)}
        ];

        var columnsNumber = [
            {displayName: "col1", queryName: "col1", type: ValueType.fromPrimitiveTypeAndCategory(PrimitiveType.Double)},
            {displayName: "col2", queryName: "col2", isMeasure: true, type: ValueType.fromPrimitiveTypeAndCategory(PrimitiveType.Double)},
            {displayName: "col3", queryName: "col3", isMeasure: true, type: ValueType.fromPrimitiveTypeAndCategory(PrimitiveType.Double)},
            {displayName: "col4", queryName: "col4", isMeasure: true, type: ValueType.fromPrimitiveTypeAndCategory(PrimitiveType.Double)}
        ];
       
        var categoriesValues = ["John Domo", "Delta Force", "Jean Tablau"];

        function setGeneral(dataViewBuilder: DataViewBuilder, isGeneral: boolean = false) {
            if (isGeneral) {
                dataViewBuilder.general = general;
            }
        }

        function build(dataViewBuilder: DataViewBuilder) {
            dataViewBuilder.update();

            return dataViewBuilder.build();
        }

        export function buildDataViewDefault(isGeneral = false) {
            var dataViewBuilder: DataViewBuilder = new DataViewBuilder();

            setGeneral(dataViewBuilder, isGeneral);

            dataViewBuilder.columns = columns;

            dataViewBuilder.values = [
                [100, 200, 700],
                [1000, 2000, 7000],
                [10000, 20000, 70000]
            ];

            dataViewBuilder.categoriesValues = categoriesValues;

            dataViewBuilder.isBuildCategoryIdentities = true;
            dataViewBuilder.identities = ["a", "b", "c"];

            return build(dataViewBuilder);
        }
        
        export function buildDataViewCustom(objects, values: any[], identities: any[] = undefined) {
            var dataViewBuilder: DataViewBuilder = new DataViewBuilder();

            dataViewBuilder.objects = objects;

            dataViewBuilder.columns = columns;

            if (identities !== undefined) {
                dataViewBuilder.isBuildCategoryIdentities = true;
                dataViewBuilder.identities = identities;
            }

            dataViewBuilder.values = values;

            dataViewBuilder.categoriesValues = categoriesValues;

            return build(dataViewBuilder);
        }

        export function buildDataViewCustomSingleColumn(objects, values: any[]) {
            var dataViewBuilder: DataViewBuilder = new DataViewBuilder();

            dataViewBuilder.objects = objects;
            dataViewBuilder.columns = columns;
            dataViewBuilder.categoriesColumns = [columns[1]];

            dataViewBuilder.values = values;

            dataViewBuilder.categoriesValues = categoriesValues;

            return build(dataViewBuilder);
        }

        export function buildDataViewCustomWithIdentities(values: any[]) {
            var dataViewBuilder: DataViewBuilder = new DataViewBuilder();

            dataViewBuilder.columns = columns;
            dataViewBuilder.categoriesColumns = [columns[0], columns[1], columns[3]];

            dataViewBuilder.values = values;

            dataViewBuilder.categoriesValues = categoriesValues;

            dataViewBuilder.isBuildCategoryIdentities = true;
            dataViewBuilder.identities = ["a", "b"];

            return build(dataViewBuilder);
        }

        export function buildDataViewInAnotherDomainOneValue(objects: any = undefined) {
            var dataViewBuilder: DataViewBuilder = new DataViewBuilder();

            dataViewBuilder.objects = objects;

            dataViewBuilder.columns = columns;

            dataViewBuilder.values = [
                [1]
            ];

            dataViewBuilder.categoriesValues = categoriesValues;

            return build(dataViewBuilder);
        }

        export function buildDataViewEmpty() {
            var dataViewBuilder: DataViewBuilder = new DataViewBuilder();

            dataViewBuilder.columns = columns;
            dataViewBuilder.values = [];
            dataViewBuilder.categoriesValues = [];

            return build(dataViewBuilder);
        }

        export function buildDataViewInAnotherDomain(isGeneral = false, objects: any = undefined) {
            var dataViewBuilder: DataViewBuilder = new DataViewBuilder();

            dataViewBuilder.objects = objects;

            setGeneral(dataViewBuilder, isGeneral);

            dataViewBuilder.columns = columns;
            dataViewBuilder.values = [[1], [10], [20]];
            dataViewBuilder.categoriesValues = categoriesValues;

            return build(dataViewBuilder);
        }

        export function buildDataViewSuperLongLabels(isGeneral = false) {
            var dataViewBuilder: DataViewBuilder = new DataViewBuilder();

            setGeneral(dataViewBuilder, isGeneral);

            dataViewBuilder.columns = columns;
            dataViewBuilder.values = [[100, 200, 700], [1000, 2000, 7000], [1000000, 2000000, 7000000]];
            dataViewBuilder.categoriesValues = [
                "This is a pretty long label I think",
                "This is a pretty long label I thought",
                "This is a pretty long label I should think"
            ];

            return build(dataViewBuilder);
        }

        export function buildDataViewManyCategories(isGeneral = false) {
            var dataViewBuilder: DataViewBuilder = new DataViewBuilder();

            setGeneral(dataViewBuilder, isGeneral);

            dataViewBuilder.columns = columns;
            dataViewBuilder.categoriesValues = ["John Domo", "Delta Force", "Jean Tablau", "Cat1", "Cat2", "Cat3"];
            dataViewBuilder.values = [
                [100, 200, 700],
                [1000, 2000, 7000],
                [10000, 200, 700],
                [10000, 20000, 70000],
                [10000, 200, 700],
                [10000, 20000, 70000]
            ];

            return build(dataViewBuilder);
        }
        
        export function buildDataViewNegative(isGeneral = false) {
            var dataViewBuilder: DataViewBuilder = new DataViewBuilder();

            setGeneral(dataViewBuilder, isGeneral);

            dataViewBuilder.columns = columns;
            dataViewBuilder.categoriesValues = categoriesValues;
            dataViewBuilder.values = [
                [-100, -200, 700],
                [1000, -2000, 7000],
                [10000, 20000, -70000]
            ];

            return build(dataViewBuilder);
        }

        function setLabels(dataViewBuilder: DataViewBuilder, color:any, labelDisplayUnits?: number, labelPrecision?: number) {
            var ojects: any = {};

            ojects.labels = {
                show: true
            };

            if (color !== undefined) {
                ojects.labels.color = color;
            }

            if (labelDisplayUnits !== undefined) {
                ojects.labels.labelDisplayUnits = labelDisplayUnits;
            }

            if (labelPrecision !== undefined) {
                ojects.labels.labelPrecision = labelPrecision;
            }

            dataViewBuilder.objects = ojects;
        }

        export function buildDataForLabelsFirstType(color?:any, labelDisplayUnits?: number, labelPrecision?: number) {
            var dataViewBuilder: DataViewBuilder = new DataViewBuilder();

            setLabels(dataViewBuilder, color, labelDisplayUnits, labelPrecision);

            dataViewBuilder.columns = columns;
            dataViewBuilder.categoriesValues = ["a", "b", "c", "d", "e"];
            dataViewBuilder.values = [[50, 40, 150, 200, 500]];
            
            return build(dataViewBuilder);
        }

        export function buildDataForLabelsSecondType(color?:any, labelDisplayUnits?: number, labelPrecision?: number) {
            var dataViewBuilder: DataViewBuilder = new DataViewBuilder();

            setLabels(dataViewBuilder, color, labelDisplayUnits, labelPrecision);

            dataViewBuilder.columns = columns;
            dataViewBuilder.categoriesValues = ["a", "b", "c", "d", "e"];
            dataViewBuilder.values = [[200, 100, 300, 250, 400]];

            return build(dataViewBuilder);
        }

        export function buildDataViewInvalid(invalidValue) {
            var dataViewBuilder: DataViewBuilder = new DataViewBuilder();
           
            dataViewBuilder.columns = columns;
            dataViewBuilder.categoriesValues = [["John Domo"]];
            dataViewBuilder.values = [[invalidValue]];

            return build(dataViewBuilder);
        }

        export function buildDataViewNumber(objects: any = null) {
            var dataViewBuilder: DataViewBuilder = new DataViewBuilder();

            dataViewBuilder.objects = objects;

            dataViewBuilder.columns = columnsNumber;
            dataViewBuilder.categoriesValues = [0, 500, 1000];
            dataViewBuilder.values = [
                [100, 200, 700],
                [1000, 2000, 7000],
                [10000, 20000, 70000]];

            dataViewBuilder.update();

            return dataViewBuilder.build();
        }

        export function buildDataViewDynamicSeries() {
            var dataViewBuilder: DataViewBuilder = new DataViewBuilder();

            dataViewBuilder.columnIdentityRef = powerbi.data.SQExprBuilder.fieldDef({
                schema: "s",
                entity: "e",
                column: "series"
    });

            dataViewBuilder.columns = columns;
            dataViewBuilder.categoriesColumns = [columns[0], columns[2], columns[3]];

            dataViewBuilder.categoriesValues = categoriesValues;

            dataViewBuilder.isBuildCategoryIdentities = true;
            dataViewBuilder.identities = ["a", "b"];

            dataViewBuilder.values = [
                [1000, 2000, 7000],
                [10000, 20000, 70000]
            ];

            return build(dataViewBuilder);
        }

        export function buildDataViewSingleMeasure() {
            var dataViewBuilder: DataViewBuilder = new DataViewBuilder();

            var measureColumn: powerbi.DataViewMetadataColumn = {
                displayName: 'sales',
                queryName: 'selectSales',
                isMeasure: true,
                type: ValueType.fromPrimitiveTypeAndCategory(PrimitiveType.Integer),
                objects: { general: { formatString: '$0' } }
            };

            dataViewBuilder.update();

            dataViewBuilder.categories = undefined;
            dataViewBuilder.categoricalValues = DataViewTransform.createValueColumns([
                {
                    source: measureColumn,
                    values: [100]
                }
            ]);

            return dataViewBuilder.build();
        }
    }
}