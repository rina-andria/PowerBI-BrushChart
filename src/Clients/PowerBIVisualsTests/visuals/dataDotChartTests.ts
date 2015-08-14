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
    import DataDotChart = powerbi.visuals.DataDotChart;
    import DataViewTransform = powerbi.data.DataViewTransform;
    import EventType = powerbitests.helpers.ClickEventType;
    import ColumnUtil = powerbi.visuals.ColumnUtil;
    import ValueType = powerbi.ValueType;
    import PrimitiveType = powerbi.PrimitiveType;

    powerbitests.mocks.setLocale();

    describe("Check DataDotChart capabilities", () => {

        it("DataDotChart registered capabilities", () => {
            expect(powerbi.visuals.visualPluginFactory.create().getPlugin("dataDotChart").capabilities).toBe(DataDotChart.capabilities);
        });

        it("DataDotChart capabilities should include dataRoles", () => {
            expect(DataDotChart.capabilities.dataRoles).toBeDefined();
        });

        it("DataDotChart capabilities should include dataViewMappings", () => {
            expect(DataDotChart.capabilities.dataViewMappings).toBeDefined();
        });

        it("Capabilities should not suppressDefaultTitle", () => {
            expect(DataDotChart.capabilities.suppressDefaultTitle).toBeUndefined();
        });

        it("FormatString property should match calculated", () => {
            expect(powerbi.data.DataViewObjectDescriptors.findFormatString(DataDotChart.capabilities.objects)).toEqual(DataDotChart.formatStringProp);
        });
    });

    describe("DataDotChart converter", () => {
        var dataViewBuilder: DataViewBuilder;

        var blankCategoryValue = "(Blank)";

        var dataViewMetadata: powerbi.DataViewMetadata = {
            columns: [
                {
                    displayName: "stringColumn",
                    queryName: "stringColumn",
                    type: ValueType.fromPrimitiveTypeAndCategory(PrimitiveType.Text)
                },
                {
                    displayName: "numberColumn",
                    queryName: "numberColumn",
                    isMeasure: true,
                    type: ValueType.fromPrimitiveTypeAndCategory(PrimitiveType.Double)
                },
                {
                    displayName: "dateTimeColumn",
                    queryName: "dateTimeColumn",
                    isMeasure: true,
                    type: ValueType.fromPrimitiveTypeAndCategory(PrimitiveType.DateTime)
                }
            ]
        };

        beforeEach(() => {
            dataViewBuilder = new DataViewBuilder();

            dataViewBuilder.dataViewMetadata = dataViewMetadata;
        });

        it("Check converter with string categories undefined series", () => {
            dataViewBuilder.columns = [dataViewMetadata.columns[0]];

            dataViewBuilder.update();

            dataViewBuilder.categoricalValues = undefined;

            var dataView: powerbi.DataView = dataViewBuilder.dataView;

            var actualData = DataDotChart.converter(dataView, blankCategoryValue);
            expect(actualData).toBeDefined();
            expect(actualData.series).toBeDefined();
            expect(actualData.series.data).toBeDefined();
            expect(actualData.series.data.length).toEqual(0);
        });

        it("Check converter with string categories and an empty numeric series", () => {
            dataViewBuilder.categoryValues = ["Cat 1", "Cat 2", "Cat 3"];
            dataViewBuilder.columns = [dataViewMetadata.columns[0], dataViewMetadata.columns[1]];
            dataViewBuilder.values = [[]];

            dataViewBuilder.update();

            var dataView: powerbi.DataView = dataViewBuilder.dataView;

            var actualData = DataDotChart.converter(dataView, blankCategoryValue);
            expect(actualData).toEqual({
                series: {
                    xCol: dataView.metadata.columns[0],
                    yCol: dataView.metadata.columns[1],
                    data: []                    
                },
                hasHighlights: false,
                hasDynamicSeries: true
            });
        });

        it("Check converter with string categories and a numeric series", () => {
            dataViewBuilder.categoryValues = ["Cat 1", "Cat 2", "Cat 3"];
            dataViewBuilder.columns = [dataViewMetadata.columns[0], dataViewMetadata.columns[1]];
            dataViewBuilder.values = [[100, 200, 300]];

            dataViewBuilder.update();

            var dataView: powerbi.DataView = dataViewBuilder.dataView;

            var actualData = DataDotChart.converter(dataView, blankCategoryValue);

            expect(actualData.series).toBeDefined();
            expect(actualData.series.xCol).toEqual(dataView.metadata.columns[0]);
            expect(actualData.series.yCol).toEqual(dataView.metadata.columns[1]);
            expect(actualData.series.data).toBeDefined();
            expect(actualData.series.data.length).toEqual(3);

            for (var i = 0; i < actualData.series.data.length; i++) {
                var seriesData = actualData.series.data[i];
                expect(seriesData.categoryValue).toBe(dataView.categorical.categories[0].values[i]);
                expect(seriesData.value).toBe(dataView.categorical.values[0].values[i]);
                expect(seriesData.categoryIndex).toBe(i);
                expect(seriesData.seriesIndex).toBe(0);
                expect(seriesData.selected).toBe(false);
            }
        });

        it("Check converter with empty categories and single numeric value", () => {
            dataViewBuilder.columns = [dataViewMetadata.columns[1]];
            dataViewBuilder.values = [[100]];

            dataViewBuilder.update();

            dataViewBuilder.categoricalCategories = [];

            var dataView: powerbi.DataView = dataViewBuilder.dataView;

            var actualData = DataDotChart.converter(dataView, blankCategoryValue);

            expect(actualData.series).toBeDefined();
            expect(actualData.series.xCol).toBeUndefined();
            expect(actualData.series.yCol).toEqual(dataView.metadata.columns[1]);
            expect(actualData.series.data).toBeDefined();
            expect(actualData.series.data.length).toEqual(1);

            for (var i = 0; i < actualData.series.data.length; i++) {
                var seriesData = actualData.series.data[i];
                expect(seriesData.categoryValue).toBe(blankCategoryValue);
                expect(seriesData.value).toBe(dataView.categorical.values[0].values[i]);
                expect(seriesData.categoryIndex).toBe(i);
                expect(seriesData.seriesIndex).toBe(0);
                expect(seriesData.selected).toBe(false);
            }
        });

        it("Check converter with undefined categories and single numeric value", () => {
            dataViewBuilder.columns = [dataViewMetadata.columns[1]];
            dataViewBuilder.values = [[100]];

            dataViewBuilder.update();

            dataViewBuilder.categoricalCategories = [];

            var dataView: powerbi.DataView = dataViewBuilder.dataView;

            var actualData = DataDotChart.converter(dataView, blankCategoryValue);

            expect(actualData.series).toBeDefined();
            expect(actualData.series.xCol).toBeUndefined();
            expect(actualData.series.yCol).toEqual(dataView.metadata.columns[1]);
            expect(actualData.series.data).toBeDefined();
            expect(actualData.series.data.length).toEqual(1);

            for (var i = 0; i < actualData.series.data.length; i++) {
                var seriesData = actualData.series.data[i];
                expect(seriesData.categoryValue).toBe(blankCategoryValue);
                expect(seriesData.value).toBe(dataView.categorical.values[0].values[i]);
                expect(seriesData.categoryIndex).toBe(i);
                expect(seriesData.seriesIndex).toBe(0);
                expect(seriesData.selected).toBe(false);
            }
        });

        it("Check converter with string categories and multiple numeric series", () => {
            dataViewBuilder.categoryValues = ["Cat 1", "Cat 2", "Cat 3"];
            dataViewBuilder.columns = [dataViewMetadata.columns[0], dataViewMetadata.columns[1]];
            dataViewBuilder.values = [
                [100, 200, 300],
                [101, 201, 301],
                [102, 202, 302]
            ];

            dataViewBuilder.update();

            var dataView: powerbi.DataView = dataViewBuilder.dataView;
            
            var actualData = DataDotChart.converter(dataView, blankCategoryValue);

            expect(actualData.series).toBeDefined();
            expect(actualData.series.xCol).toEqual(dataView.metadata.columns[0]);
            expect(actualData.series.yCol).toEqual(dataView.metadata.columns[1]);
            expect(actualData.series.data).toBeDefined();
            expect(actualData.series.data.length).toEqual(3);

            for (var i = 0; i < actualData.series.data.length; i++) {
                var seriesData = actualData.series.data[i];
                expect(seriesData.categoryValue).toBe(dataView.categorical.categories[0].values[i]);
                expect(seriesData.value).toBe(dataView.categorical.values[0].values[i]);
                expect(seriesData.categoryIndex).toBe(i);
                expect(seriesData.seriesIndex).toBe(0);
                expect(seriesData.selected).toBe(false);
            }
        });

        it("Check converter with date-time categories and a numeric series", () => {
            var dates = [new Date("2014/9/25"), new Date("2014/12/12"), new Date("2015/9/25")];

            dataViewBuilder.categoryValues = dates;
            dataViewBuilder.columns = [dataViewMetadata.columns[2], dataViewMetadata.columns[1]];
            dataViewBuilder.values = [[100, 200, 300]];

            dataViewBuilder.update();

            var dataView: powerbi.DataView = dataViewBuilder.dataView;

            var actualData = DataDotChart.converter(dataView, blankCategoryValue);

            expect(actualData.series).toBeDefined();
            expect(actualData.series.xCol).toEqual(dataView.metadata.columns[2]);
            expect(actualData.series.yCol).toEqual(dataView.metadata.columns[1]);
            expect(actualData.series.data).toBeDefined();
            expect(actualData.series.data.length).toEqual(3);

            for (var i = 0; i < actualData.series.data.length; i++) {
                var seriesData = actualData.series.data[i];
                expect(seriesData.categoryValue).toBe(dates[i].getTime());
                expect(seriesData.value).toBe(dataView.categorical.values[0].values[i]);
                expect(seriesData.categoryIndex).toBe(i);
                expect(seriesData.seriesIndex).toBe(0);
                expect(seriesData.selected).toBe(false);
            }
        });

        it("Check converter with date-time categories and a numeric series where category value is null", () => {
            var dates = [new Date("2014/9/25"), null, new Date("2015/9/25")];

            dataViewBuilder.categoryValues = dates;
            dataViewBuilder.columns = [dataViewMetadata.columns[2], dataViewMetadata.columns[1]];
            dataViewBuilder.values = [[100, 200, 300]];

            dataViewBuilder.update();

            var dataView: powerbi.DataView = dataViewBuilder.dataView;

            var actualData = DataDotChart.converter(dataView, blankCategoryValue);

            expect(actualData.series).toBeDefined();
            expect(actualData.series.xCol).toEqual(dataView.metadata.columns[2]);
            expect(actualData.series.yCol).toEqual(dataView.metadata.columns[1]);
            expect(actualData.series.data).toBeDefined();
            expect(actualData.series.data.length).toEqual(3);

            for (var i = 0; i < actualData.series.data.length; i++) {
                var seriesData = actualData.series.data[i];

                expect(seriesData.categoryValue).toBe(dates[i] ? dates[i].getTime() : null);
                expect(seriesData.value).toBe(dataView.categorical.values[0].values[i]);
                expect(seriesData.categoryIndex).toBe(i);
                expect(seriesData.seriesIndex).toBe(0);
                expect(seriesData.selected).toBe(false);
            }
        });

        it("Check converter pass string categories and a numeric series produces identities", () => {
            var identityNames = ["John Domo", "Delta Force", "Jean Tablau"];
            var categoryIdentities = identityNames.map((item) => mocks.dataViewScopeIdentity(item));
            
            dataViewBuilder.categoryIdentities = categoryIdentities;
            dataViewBuilder.categoryValues = ["Cat 1", "Cat 2", "Cat 3"];
            dataViewBuilder.columns = [dataViewMetadata.columns[0], dataViewMetadata.columns[1]];
            dataViewBuilder.values = [[100, 200, 300]];

            dataViewBuilder.update();

            var dataView: powerbi.DataView = dataViewBuilder.dataView;

            var actualData = DataDotChart.converter(dataView, blankCategoryValue);

            expect(actualData.series).toBeDefined();
            expect(actualData.series.data).toBeDefined();
            expect(actualData.series.data.length).toEqual(3);

            for (var i = 0; i < actualData.series.data.length; i++) {
                var seriesData = actualData.series.data[i];
                expect(seriesData.identity).toBeDefined();
                expect(seriesData.identity.getKey()).toContain(identityNames[i]);
            }
        });

        it("Check converter passed undefined categories produces measure name identities ", () => {
            dataViewBuilder.columns = [dataViewMetadata.columns[1]];
            dataViewBuilder.values = [[100]];

            dataViewBuilder.update();

            dataViewBuilder.categoricalCategories = [];

            var dataView: powerbi.DataView = dataViewBuilder.dataView;

            var actualData = DataDotChart.converter(dataView, blankCategoryValue);

            expect(actualData.series).toBeDefined();
            expect(actualData.series.data).toBeDefined();
            expect(actualData.series.data.length).toEqual(1);

            for (var i = 0; i < actualData.series.data.length; i++) {
                var seriesData = actualData.series.data[i];
                expect(seriesData.identity).toBeDefined();
                expect(seriesData.identity.getKey()).toContain(dataViewMetadata.columns[1].displayName);
            }
        });
    });

    var dataViewMetadataDefault: powerbi.DataViewMetadata = {
        columns: [
            {
                displayName: "stringColumn",
                type: ValueType.fromPrimitiveTypeAndCategory(PrimitiveType.Text)
            },
            {
                displayName: "numberColumn",
                isMeasure: true,
                type: ValueType.fromPrimitiveTypeAndCategory(PrimitiveType.Double),
                format: "0.000"
            },
            {
                displayName: "dateTimeColumn",
                isMeasure: true,
                type: ValueType.fromPrimitiveTypeAndCategory(PrimitiveType.DateTime)
            }
        ]
    };

    describe("DataDotChart render to DOM", () => {
        var dataViewBuilder: DataViewBuilder;

        var categoryValues = ["a", "b", "c", "d", "e"];
        var categoryIdentities = categoryValues.map(n => mocks.dataViewScopeIdentity(n));

        beforeEach(() => {
            dataViewBuilder = new DataViewBuilder();

            dataViewBuilder.dataViewMetadata = dataViewMetadataDefault;
            dataViewBuilder.columns = dataViewMetadataDefault.columns;
            dataViewBuilder.categoryValues = categoryValues;
            dataViewBuilder.categoryIdentities = categoryIdentities;
        });

        it("NaN in values shows a warning", (done) => {
            dataViewBuilder.values = [[NaN]];

            dataViewBuilder.update();

            dataViewBuilder.onDataChanged();

            setTimeout(() => {
                expect(dataViewBuilder.warningSpy).toHaveBeenCalled();
                expect(dataViewBuilder.warningSpy.calls.count()).toBe(1);
                expect(dataViewBuilder.warningSpy.calls.argsFor(0)[0][0].code).toBe("NaNNotSupported");
                done();
            }, DefaultWaitForRender);
        });

        it("Negative Infinity in values shows a warning", (done) => {
            dataViewBuilder.values = [[Number.NEGATIVE_INFINITY]];

            dataViewBuilder.update();

            dataViewBuilder.onDataChanged();

            setTimeout(() => {
                expect(dataViewBuilder.warningSpy).toHaveBeenCalled();
                expect(dataViewBuilder.warningSpy.calls.count()).toBe(1);
                expect(dataViewBuilder.warningSpy.calls.argsFor(0)[0][0].code).toBe("InfinityValuesNotSupported");
                done();
            }, DefaultWaitForRender);
        });

        it("Positive Infinity in values shows a warning", (done) => {
            dataViewBuilder.values = [[Number.POSITIVE_INFINITY]];

            dataViewBuilder.update();

            dataViewBuilder.onDataChanged();

            setTimeout(() => {
                expect(dataViewBuilder.warningSpy).toHaveBeenCalled();
                expect(dataViewBuilder.warningSpy.calls.count()).toBe(1);
                expect(dataViewBuilder.warningSpy.calls.argsFor(0)[0][0].code).toBe("InfinityValuesNotSupported");
                done();
            }, DefaultWaitForRender);
        });

        it("Out of range value in values shows a warning", (done) => {
            dataViewBuilder.values = [[-1e301]];

            dataViewBuilder.update();

            dataViewBuilder.onDataChanged();

            setTimeout(() => {
                expect(dataViewBuilder.warningSpy).toHaveBeenCalled();
                expect(dataViewBuilder.warningSpy.calls.count()).toBe(1);
                expect(dataViewBuilder.warningSpy.calls.argsFor(0)[0][0].code).toBe("ValuesOutOfRange");
                done();
            }, DefaultWaitForRender);
        });

        it("Values all okay does not show a warning", (done) => {
            dataViewBuilder.values = [[300]];

            dataViewBuilder.update();

            dataViewBuilder.onDataChanged();

            setTimeout(() => {
                expect(dataViewBuilder.warningSpy).not.toHaveBeenCalled();
                done();
            }, DefaultWaitForRender);
        });

        it("Check axis in DOM", (done) => {
            dataViewBuilder.values = [[500000, 495000, 490000, 480000, 500000]];

            dataViewBuilder.update();

            dataViewBuilder.onDataChanged();

            setTimeout(() => {
                expect($(".dataDotChart .axisGraphicsContext .x.axis .tick").length).toBeGreaterThan(0);
                expect($(".dataDotChart .axisGraphicsContext .y.axis .tick").length).toBeGreaterThan(0);
                expect($(".dataDotChart .axisGraphicsContext .y.axis .tick").find("text").first().text()).toBe("0M");
                expect($(".dataDotChart .axisGraphicsContext .y.axis .tick").find("text").last().text()).toBe("0.5M");
                done();
            }, DefaultWaitForRender);
        });

        it("Check dots in DOM", (done) => {
            dataViewBuilder.values = [[500000, 495000, 490000, 480000, 500000]];

            dataViewBuilder.update();

            dataViewBuilder.onDataChanged();

            setTimeout(() => {
                var $dots = $(".dataDotChart .dot");
                expect($dots.length).toBe(5);

                var dotRadius = 0;
                $dots.each((index, elem) => {

                    var $elem = $(elem);

                    // I verify all dots have the same non-zero radius
                    var radius = +$elem.attr("r");
                    if (index === 0) {
                        expect(radius).toBeGreaterThan(0);
                        dotRadius = radius;
                    }
                    else {
                        expect(radius).toEqual(dotRadius);
                    }

                    expect(+$elem.attr("cx")).toBeGreaterThan(0);

                    // The first and last dots are at the top
                    if (index === 0 || index === 4) {
                        expect(+$elem.attr("cy")).toBe(0);
                    }
                    else {
                        expect(+$elem.attr("cy")).toBeGreaterThan(0);
                    }
                });

                done();
            }, DefaultWaitForRender);
        });

        it("Check dot labels in DOM", (done) => {
            dataViewBuilder.values = [[500000, 495000, 490000, 480000, 500000]];

            dataViewBuilder.update();

            dataViewBuilder.onDataChanged();

            setTimeout(() => {
                var $labels = $(".dataDotChart .label");
                expect($labels.length).toBe(5);

                $labels.each((index, elem) => {

                    var $elem = $(elem);

                    expect(+$elem.attr("x")).toBeGreaterThan(0);

                    // The first and last dots are at the top
                    if (index === 0 || index === 4) {
                        expect(+$elem.attr("y")).toBe(0);
                    }
                    else {
                        expect(+$elem.attr("y")).toBeGreaterThan(0);
                    }
                });

                var $label1 = $($labels.get(0));
                expect($label1.text()).toBe("0.5M");

                var $label3 = $($labels.get(2));
                expect($label3.text()).toBe("0.49M");

                done();
            }, DefaultWaitForRender);
        });

        var overflowCategoryValues = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
        var overflowCategoryIdentities = overflowCategoryValues.map(n => mocks.dataViewScopeIdentity(n));

        it("Check dots text overflow handled in DOM", (done) => {
            dataViewBuilder.categoryValues = overflowCategoryValues;
            dataViewBuilder.categoryIdentities = overflowCategoryIdentities;
            dataViewBuilder.values = [[
                999, 888, 777, 666,
                555, 444, 333, 222,
                111, 999, 888, 777,
                666, 555, 444, 333,
                222, 111, 999, 888,
                777, 666, 555, 444,
                333, 222]];

            dataViewBuilder.update();

            dataViewBuilder.onDataChanged();

            setTimeout(() => {
                var $labels = $(".dataDotChart .label");
                expect($labels.length).toBeGreaterThan(0);

                $labels.each((index, elem) => {

                    var $elem = $(elem);

                    expect($elem.attr("class")).toContain("overflowed");
                });

                done();
            }, DefaultWaitForRender);
        });

        it("Check partial highlighting dots in DOM", (done) => {
            dataViewBuilder.values = [[500000, 495000, 490000, 480000, 500000]];
            dataViewBuilder.highlights = [[100000, 195000, null, 180000, 9000]];

            dataViewBuilder.update();

            dataViewBuilder.onDataChanged();

            setTimeout(() => {
                var $dots = $(".dataDotChart .dot");
                expect($dots.length).toBe(10);
                
                // I check partial highlighting
                var defaultOpacity = ColumnUtil.DefaultOpacity.toString();
                var dimmedOpacity = ColumnUtil.DimmedOpacity.toString();

                expect($dots[0].style.fillOpacity).toBe(dimmedOpacity);
                expect($dots[1].style.fillOpacity).toBe(defaultOpacity);
                expect($dots[2].style.fillOpacity).toBe(dimmedOpacity);
                expect($dots[3].style.fillOpacity).toBe(defaultOpacity);
                expect($dots[4].style.fillOpacity).toBe(dimmedOpacity);
                expect($dots[5].style.fillOpacity).toBe(defaultOpacity);
                expect($dots[6].style.fillOpacity).toBe(dimmedOpacity);
                expect($dots[7].style.fillOpacity).toBe(defaultOpacity);
                expect($dots[8].style.fillOpacity).toBe(dimmedOpacity);
                expect($dots[9].style.fillOpacity).toBe(defaultOpacity);                

                // I check that null value causes .null-value css
                expect($($dots[5]).attr("class")).toContain("null-value");

                done();
            }, DefaultWaitForRender);
        });

        it("Ensure zero line axis is darkened", (done) => {
            dataViewBuilder.values = [[500000, -495000, 490000, 480000, -500000]];

            dataViewBuilder.update();

            dataViewBuilder.onDataChanged();

            setTimeout(() => {
                var zeroTicks = $("g.tick:has(line.zero-line)");

                expect(zeroTicks.length).toBe(2);
                zeroTicks.each((i, item) => {
                    expect(d3.select(item).datum() === 0).toBe(true);
                });

                done();
            }, DefaultWaitForRender);
        });
    });

    describe("DataDotChart interactivity in DOM", () => {
        var dataViewBuilder: DataViewBuilder;

        var defaultOpacity = ColumnUtil.DefaultOpacity.toString();
        var dimmedOpacity = ColumnUtil.DimmedOpacity.toString();

        var categoryValues = ["a", "b", "c", "d", "e"];
        var categoryIdentities = categoryValues.map(n => mocks.dataViewScopeIdentity(n));

        beforeEach(() => {
            dataViewBuilder = new DataViewBuilder();

            dataViewBuilder.dataViewMetadata = dataViewMetadataDefault;
            dataViewBuilder.columns = dataViewMetadataDefault.columns;
            dataViewBuilder.values = [[500000, 495000, 490000, 480000, 500000]];
            dataViewBuilder.categoryValues = categoryValues;
            dataViewBuilder.categoryIdentities = categoryIdentities;
        });

        it("Check select dot", (done) => {
            dataViewBuilder.update();

            dataViewBuilder.onDataChanged();

            setTimeout(() => {

                var dots = $(".dataDotChart .dot");

                spyOn(dataViewBuilder.hostServices, "onSelect").and.callThrough();

                (<any>dots.first()).d3Click(0, 0);

                expect(dots[0].style.fillOpacity).toBe(defaultOpacity);
                expect(dots[1].style.fillOpacity).toBe(dimmedOpacity);
                expect(dots[2].style.fillOpacity).toBe(dimmedOpacity);
                expect(dots[3].style.fillOpacity).toBe(dimmedOpacity);
                expect(dots[4].style.fillOpacity).toBe(dimmedOpacity);

                expect(dataViewBuilder.hostServices.onSelect).toHaveBeenCalledWith(
                    {
                        data: [
                            {
                                data: [categoryIdentities[0]]
                            }
                        ]
                    });

                done();
            }, DefaultWaitForRender);
        });

        it("Check multi-select dot", (done) => {
            dataViewBuilder.update();

            dataViewBuilder.onDataChanged();

            setTimeout(() => {

                var dots = $(".dataDotChart .dot");

                spyOn(dataViewBuilder.hostServices, "onSelect").and.callThrough();

                (<any>dots.first()).d3Click(0, 0);
                
                expect(dots[0].style.fillOpacity).toBe(defaultOpacity);
                expect(dots[1].style.fillOpacity).toBe(dimmedOpacity);
                expect(dots[2].style.fillOpacity).toBe(dimmedOpacity);
                expect(dots[3].style.fillOpacity).toBe(dimmedOpacity);

                expect(dataViewBuilder.hostServices.onSelect).toHaveBeenCalledWith(
                    {
                        data: [
                            {
                                data: [categoryIdentities[0]]
                            }
                        ]
                    });

                done();
            }, DefaultWaitForRender);
        });

        it("Check external clear selection", (done) => {
            dataViewBuilder.update();

            dataViewBuilder.onDataChanged();

            setTimeout(() => {

                var dots = $(".dataDotChart .dot");

                spyOn(dataViewBuilder.hostServices, "onSelect").and.callThrough();

                (<any>dots.first()).d3Click(0, 0);
                (<any>dots.last()).d3Click(0, 0, EventType.CtrlKey);

                dataViewBuilder.visual.onClearSelection();

                expect(dots[0].style.fillOpacity).toBe(defaultOpacity);
                expect(dots[1].style.fillOpacity).toBe(defaultOpacity);
                expect(dots[2].style.fillOpacity).toBe(defaultOpacity);
                expect(dots[3].style.fillOpacity).toBe(defaultOpacity);
                expect(dots[4].style.fillOpacity).toBe(defaultOpacity);               

                done();
            }, DefaultWaitForRender);
        });

        it("Check clearCatcher clear selection", (done) => {
            dataViewBuilder.update();

            dataViewBuilder.onDataChanged();

            setTimeout(() => {

                var dots = $(".dataDotChart .dot");                

                (<any>dots.first()).d3Click(0, 0);
                (<any>dots.last()).d3Click(0, 0, EventType.CtrlKey);

                spyOn(dataViewBuilder.hostServices, "onSelect").and.callThrough();

                (<any>($(".clearCatcher").last())).d3Click(0, 0);

                expect(dots[0].style.fillOpacity).toBe(defaultOpacity);
                expect(dots[1].style.fillOpacity).toBe(defaultOpacity);
                expect(dots[2].style.fillOpacity).toBe(defaultOpacity);
                expect(dots[3].style.fillOpacity).toBe(defaultOpacity);
                expect(dots[4].style.fillOpacity).toBe(defaultOpacity);

                expect(dataViewBuilder.hostServices.onSelect).toHaveBeenCalledWith(
                    {
                        data: []
                    });

                done();
            }, DefaultWaitForRender);
        });
    });

    class DataViewBuilder {
        private element: JQuery;

        private _visual: powerbi.IVisual;

        public get visual(): powerbi.IVisual {
            return this._visual;
        }

        private _hostServices: powerbi.IVisualHostServices;

        public get hostServices(): powerbi.IVisualHostServices {
            return this._hostServices;
        }

        public highlights: any[] = null;

        public values: any[] = [];

        private _warningSpy: jasmine.Spy;

        public get warningSpy(): jasmine.Spy {
            return this._warningSpy;
        }

        private _dataView: powerbi.DataView;

        public get dataView(): powerbi.DataView {
            if (!this._dataView) {
                this.buildDataView();
            }

            return this._dataView;
        }

        public categoryValues: any[];
        
        public categoryIdentities: any[];

        public dataViewMetadata: powerbi.DataViewMetadata;

        public categoricalCategories: any[] = [];

        public categoricalValues: powerbi.DataViewValueColumns;

        public columns: any[] = [];

        constructor(width: string = "500", height: string = "500") {
            this.element = powerbitests.helpers.testDom(height, width);
            this._visual = powerbi.visuals.visualPluginFactory.create().getPlugin("dataDotChart").create();
            this._hostServices = mocks.createVisualHostServices();
            this._warningSpy = jasmine.createSpy("warning");
            this._hostServices.setWarnings = this.warningSpy;

            this.initVisual();
        }

        public initVisual() {
            this.visual.init({
                element: this.element,
                host: this.hostServices,
                style: powerbi.visuals.visualStyles.create(),
                viewport: {
                    height: this.element.height(),
                    width: this.element.width()
                },
                animation: { transitionImmediate: true },
                interactivity: { selection: true, isInteractiveLegend: false }
            });
        }

        public update() {
            this.buildCategoricalCategories();
            this.buildCategoricalValues();
        }

        private buildCategoricalCategories() {
            this.categoricalCategories = [
                {
                    source: this.getValuesSource(0),
                    values: this.categoryValues,
                    identity: this.categoryIdentities
                }
            ];
        }

        private buildCategoricalValues() {
            var categoricalValues = [];

            for (var i = 0; i < this.values.length; i++) {
                categoricalValues.push({
                    source: this.getValuesSource(i + 1),
                    values: this.values[i],
                    highlights: this.getHighlights(i)
                });
            }

            this.categoricalValues =
                DataViewTransform.createValueColumns(categoricalValues);
        }

        private getHighlights(index): any {
            if (this.highlights) {
                return this.highlights[index];
            }

            return undefined;
        }

        private getValuesSource(index): any {
            if (this.columns[index]) {
                return this.columns[index];
            }

            return this.columns[this.columns.length - 1];
        }

        private buildDataView() {
            this._dataView = {
                metadata: this.dataViewMetadata,
                categorical: {
                    categories: this.categoricalCategories,
                    values: this.categoricalValues
                }
            };
        }

        public onDataChanged() {
            this.visual.onDataChanged({
                dataViews: [this.dataView]
            });
        }
    }
}