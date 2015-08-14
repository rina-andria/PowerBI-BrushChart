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
    import FunnelChart = powerbi.visuals.FunnelChart;
    import ValueType = powerbi.ValueType;
    import PrimitiveType = powerbi.PrimitiveType;
    import EventType = powerbitests.helpers.ClickEventType;
    import SelectionId = powerbi.visuals.SelectionId;
    import ColorConvertor = powerbitests.utils.ColorUtility.convertFromRGBorHexToHex;

    var minHeightFunnelCategoryLabelsVisible: number = powerbi.visuals.visualPluginFactory.MobileVisualPluginService.MinHeightFunnelCategoryLabelsVisible;
    var categoryLabelsVisibleGreaterThanMinHeight: number = minHeightFunnelCategoryLabelsVisible + 1;
    var categoryLabelsSmallerThanMinHeight: number = minHeightFunnelCategoryLabelsVisible - 1;
    var categoryLabelsVisibleGreaterThanMinHeightString: string = categoryLabelsVisibleGreaterThanMinHeight.toString();
    var categoryLabelsVisibleSmallerThanMinHeightString: string = categoryLabelsSmallerThanMinHeight.toString();

    var labelColor = powerbi.visuals.dataLabelUtils.defaultLabelColor;
    var defaultInsideLabelColor = '#ffffff';

    powerbitests.mocks.setLocale();

    describe("FunnelChart",() => {

        it('FunnelChart registered capabilities',() => {
            expect(powerbi.visuals.visualPluginFactory.create().getPlugin('funnel').capabilities).toBe(powerbi.visuals.funnelChartCapabilities);
        });

        it('Capabilities should include dataViewMappings',() => {
            expect(powerbi.visuals.funnelChartCapabilities.dataViewMappings).toBeDefined();
        });

        it('Capabilities should include dataRoles',() => {
            expect(powerbi.visuals.funnelChartCapabilities.dataRoles).toBeDefined();
        });

        it('Capabilities should not suppressDefaultTitle',() => {
            expect(powerbi.visuals.funnelChartCapabilities.suppressDefaultTitle).toBeUndefined();
        });

        it('FormatString property should match calculated',() => {
            expect(powerbi.data.DataViewObjectDescriptors.findFormatString(powerbi.visuals.funnelChartCapabilities.objects)).toEqual(powerbi.visuals.funnelChartProps.general.formatString);
        });
    });

    describe("FunnelChart Dataview Validation",() => {
        var colors: powerbi.IDataColorPalette;

        beforeEach(() => {
            colors = powerbi.visuals.visualStyles.create().colorPalette.dataColors;
        });

        var dataViewMetadata: powerbi.DataViewMetadata = {
            columns: [
                { displayName: 'col1', queryName: 'col1' },
                { displayName: 'col2', queryName: 'col2', isMeasure: true },
            ]
        };
        var categoryColumnRef = powerbi.data.SQExprBuilder.fieldDef({ schema: 's', entity: 'e', column: 'p' });

        it('Check explicit color is applied', () => {
            var categoryIdentities = [
                mocks.dataViewScopeIdentity("John Domo"),
                mocks.dataViewScopeIdentity("Delta Force"),
                mocks.dataViewScopeIdentity("Jean Tablau"),
            ];
            var dataView: powerbi.DataView = {
                metadata: dataViewMetadata,
                categorical: {
                    categories: [{
                        source: dataViewMetadata.columns[0],
                        values: ['John Domo', 'Delta Force', 'Jean Tablau'],
                        identity: categoryIdentities,
                        identityFields: [categoryColumnRef],
                        objects: [
                            { dataPoint: { fill: { solid: { color: "#FF0000" } } } },
                            { dataPoint: { fill: { solid: { color: "#00FF00" } } } },
                            { dataPoint: { fill: { solid: { color: "#0000FF" } } } }
                        ]
                    }],
                    values: DataViewTransform.createValueColumns([{
                        source: dataViewMetadata.columns[1],
                        values: [100, 200, 700],
                    }])
                }
            };

            var actualData = FunnelChart.converter(dataView, colors);

            expect(actualData.slices[0].color).toBe("#FF0000");
            expect(actualData.slices[0].labelFill).toBe(labelColor);
            expect(actualData.slices[1].color).toBe("#00FF00");
            expect(actualData.slices[1].labelFill).toBe(labelColor);
            expect(actualData.slices[2].color).toBe("#0000FF");
            expect(actualData.slices[2].labelFill).toBe(labelColor);
        });

        it('Check default color is applied',() => {
            var categoryIdentities = [
                mocks.dataViewScopeIdentity("John Domo"),
                mocks.dataViewScopeIdentity("Delta Force"),
                mocks.dataViewScopeIdentity("Jean Tablau"),
            ];
            var dataView: powerbi.DataView = {
                metadata: dataViewMetadata,
                categorical: {
                    categories: [{
                        source: dataViewMetadata.columns[0],
                        values: ['John Domo', 'Delta Force', 'Jean Tablau'],
                        identity: categoryIdentities,
                        identityFields: [categoryColumnRef],
                    }],
                    values: DataViewTransform.createValueColumns([{
                        source: dataViewMetadata.columns[1],
                        values: [100, 200, 700],
                    }])
                }
            };

            var defaultDataPointColor = "#00FF00";

            var actualData = FunnelChart.converter(dataView, colors, defaultDataPointColor);

            actualData.slices.forEach(slice => {
                expect(slice.color).toEqual(defaultDataPointColor);
                expect(slice.labelFill).toEqual(labelColor);
            });
        });

        it('Check multi-measures and custom colors',() => {
            var dataViewMetadata: powerbi.DataViewMetadata = {
                columns: [
                    { displayName: 'col2', queryName: 'col2', isMeasure: true, objects: { dataPoint: { fill: { solid: { color: "#FF0000" } } } } },
                    { displayName: 'col3', queryName: 'col3', isMeasure: true, objects: { dataPoint: { fill: { solid: { color: "#00FF00" } } } } }
                ]
            };
            var dataView: powerbi.DataView = {
                metadata: dataViewMetadata,
                categorical: {
                    categories: [],
                    values: DataViewTransform.createValueColumns([{
                        source: dataViewMetadata.columns[0],
                        values: [100],
                    }, {
                            source: dataViewMetadata.columns[1],
                            values: [300],
                        },
                    ])
                }
            };

            var actualData = FunnelChart.converter(dataView, colors);
            var selectionIds: SelectionId[] = [
                SelectionId.createWithMeasure("col2"),
                SelectionId.createWithMeasure("col3")];

            var expectedData: powerbi.visuals.FunnelData = {
                slices: [
                    {
                        value: 100,
                        label: 'col2',
                        identity: selectionIds[0],
                        key: selectionIds[0].getKey(),
                        selected: false,
                        categoryOrMeasureIndex: 0,
                        tooltipInfo: [{ displayName: "col2", value: "100" }],
                        color: "#FF0000",
                        labelFill: labelColor,
                    }, {
                        value: 300,
                        label: 'col3',
                        identity: selectionIds[1],
                        key: selectionIds[1].getKey(),
                        selected: false,
                        categoryOrMeasureIndex: 1,
                        tooltipInfo: [{ displayName: "col2", value: "300" }],
                        color: "#00FF00",
                        labelFill: labelColor,
                    }],
                categoryLabels: ['col2', 'col3'],
                valuesMetadata: [dataViewMetadata.columns[0], dataViewMetadata.columns[1]],
                hasHighlights: false,
                highlightsOverflow: false,
                canShowDataLabels: true,
                dataLabelsSettings: powerbi.visuals.dataLabelUtils.getDefaultFunnelLabelSettings(),
            };
            expect(actualData).toEqual(expectedData);
        });

        it('Check converter with category and single measure',() => {
            var categoryIdentities = [
                mocks.dataViewScopeIdentity("a"),
                mocks.dataViewScopeIdentity("b"),
                mocks.dataViewScopeIdentity("c"),
            ];
            var dataView: powerbi.DataView = {
                metadata: dataViewMetadata,
                categorical: {
                    categories: [{
                        source: dataViewMetadata.columns[0],
                        values: ['a', 'b', 'c'],
                        identity: categoryIdentities,
                        identityFields: [categoryColumnRef],
                    }],
                    values: DataViewTransform.createValueColumns([{
                        source: dataViewMetadata.columns[1],
                        values: [100, 200, 700],
                    }])
                }
            };

            var actualData = FunnelChart.converter(dataView, colors);
            var selectionIds: SelectionId[] = [
                SelectionId.createWithIdAndMeasure(categoryIdentities[0], 'col2'),
                SelectionId.createWithIdAndMeasure(categoryIdentities[1], 'col2'),
                SelectionId.createWithIdAndMeasure(categoryIdentities[2], 'col2')];
            var sliceColor = colors.getColorByIndex(0).value;

            var expectedData: powerbi.visuals.FunnelData = {
                slices: [
                    {
                        value: 100,
                        label: 'a',
                        identity: selectionIds[0],
                        key: selectionIds[0].getKey(),
                        selected: false,
                        categoryOrMeasureIndex: 0,
                        tooltipInfo: [{ displayName: "col1", value: "a" }, { displayName: "col2", value: "100" }],
                        color: sliceColor,
                        labelFill: labelColor,
                    }, {
                        value: 200,
                        label: 'b',
                        identity: selectionIds[1],
                        key: selectionIds[1].getKey(),
                        selected: false,
                        categoryOrMeasureIndex: 1,
                        tooltipInfo: [{ displayName: "col1", value: "b" }, { displayName: "col2", value: "200" }],
                        color: sliceColor,
                        labelFill: labelColor,
                    }, {
                        value: 700,
                        label: 'c',
                        identity: selectionIds[2],
                        key: selectionIds[2].getKey(),
                        selected: false,
                        categoryOrMeasureIndex: 2,
                        tooltipInfo: [{ displayName: "col1", value: "c" }, { displayName: "col2", value: "700" }],
                        color: sliceColor,
                        labelFill: labelColor,
                    }],
                categoryLabels: ['a', 'b', 'c'],
                valuesMetadata: [dataViewMetadata.columns[1]],
                hasHighlights: false,
                highlightsOverflow: false,
                canShowDataLabels: true,
                dataLabelsSettings: powerbi.visuals.dataLabelUtils.getDefaultFunnelLabelSettings(),
            };
            expect(actualData).toEqual(expectedData);
        });

        it('Validate highlighted tooltip',() => {
            var categoryIdentities = [
                mocks.dataViewScopeIdentity("John Domo"),
                mocks.dataViewScopeIdentity("Delta Force"),
                mocks.dataViewScopeIdentity("Jean Tablau"),
            ];
            var dataView: powerbi.DataView = {
                metadata: dataViewMetadata,
                categorical: {
                    categories: [{
                        source: dataViewMetadata.columns[0],
                        values: ['John Domo', 'Delta Force', 'Jean Tablau'],
                        identity: categoryIdentities,
                        objects: [
                            { dataPoint: { fill: { solid: { color: "#FF0000" } } } },
                            { dataPoint: { fill: { solid: { color: "#00FF00" } } } },
                            { dataPoint: { fill: { solid: { color: "#0000FF" } } } }
                        ]
                    }],
                    values: DataViewTransform.createValueColumns([{
                        source: dataViewMetadata.columns[1],
                        values: [100, 200, 700],
                        highlights: [0, 140, 420],
                    }])
                }
            };

            var defaultDataPointColor = "#00FF00";

            var actualData = FunnelChart.converter(dataView, colors, defaultDataPointColor);
           
            //first tooltip is regular because highlighted value is 0
            expect(actualData.slices[0].tooltipInfo).toEqual([{ displayName: "col1", value: "John Domo" }, { displayName: "col2", value: "100" }]);
            expect(actualData.slices[1].tooltipInfo).toEqual([{ displayName: "col1", value: "John Domo" }, { displayName: "col2", value: "100" }]);
            //tooltips with highlighted value
            expect(actualData.slices[2].tooltipInfo).toEqual([{ displayName: "col1", value: "Delta Force" }, { displayName: "col2", value: "200" }, { displayName: powerbi.visuals.ToolTipComponent.localizationOptions.highlightedValueDisplayName, value: "140" }]);
            expect(actualData.slices[3].tooltipInfo).toEqual([{ displayName: "col1", value: "Delta Force" }, { displayName: "col2", value: "200" }, { displayName: powerbi.visuals.ToolTipComponent.localizationOptions.highlightedValueDisplayName, value: "140" }]);
            expect(actualData.slices[4].tooltipInfo).toEqual([{ displayName: "col1", value: "Jean Tablau" }, { displayName: "col2", value: "700" }, { displayName: powerbi.visuals.ToolTipComponent.localizationOptions.highlightedValueDisplayName, value: "420" }]);
            expect(actualData.slices[5].tooltipInfo).toEqual([{ displayName: "col1", value: "Jean Tablau" }, { displayName: "col2", value: "700" }, { displayName: powerbi.visuals.ToolTipComponent.localizationOptions.highlightedValueDisplayName, value: "420" }]);
        });

        it('Check converter with multi-category and multi-measures',() => {
            var categoryIdentities = [
                mocks.dataViewScopeIdentity("a"),
                mocks.dataViewScopeIdentity("b"),
            ];
            var dataViewMetadata: powerbi.DataViewMetadata = {
                columns: [
                    { displayName: 'col1', queryName: 'col1' },
                    { displayName: 'col2', queryName: 'col2', isMeasure: true },
                    { displayName: 'col3', queryName: 'col3', isMeasure: true }
                ]
            };
            var dataView: powerbi.DataView = {
                metadata: dataViewMetadata,
                categorical: {
                    categories: [{
                        source: dataViewMetadata.columns[0],
                        values: ['a', 'b'],
                        identity: categoryIdentities,
                        identityFields: [categoryColumnRef],
                    }],
                    values: DataViewTransform.createValueColumns([{
                        source: dataViewMetadata.columns[1],
                        values: [100, 200],
                        subtotal: 300,
                    }, {
                            source: dataViewMetadata.columns[2],
                            values: [300, 500],
                            subtotal: 800,
                        },
                    ])
                }
            };

            var actualData = FunnelChart.converter(dataView, colors);
            var selectionIds = [
                SelectionId.createWithIdAndMeasure(categoryIdentities[0], 'col2'),
                SelectionId.createWithIdAndMeasure(categoryIdentities[1], 'col2'),
            ];
            var sliceColor = colors.getColorByIndex(0).value;

            var expectedData: powerbi.visuals.FunnelData = {
                slices: [
                    {
                        value: 400,
                        label: 'a',
                        identity: selectionIds[0],
                        selected: false,
                        categoryOrMeasureIndex: 0,
                        key: selectionIds[0].getKey(),
                        tooltipInfo: [{ displayName: "col1", value: "a" }, { displayName: "col2", value: "400" }],
                        color: sliceColor,
                        labelFill: labelColor,
                    }, {
                        value: 700,
                        label: 'b',
                        identity: selectionIds[1],
                        selected: false,
                        categoryOrMeasureIndex: 1,
                        key: selectionIds[1].getKey(),
                        tooltipInfo: [{ displayName: "col1", value: "b" }, { displayName: "col2", value: "700" }],
                        color: sliceColor,
                        labelFill: labelColor,
                    }],
                categoryLabels: ['a', 'b'],
                valuesMetadata: [dataViewMetadata.columns[1], dataViewMetadata.columns[2]],
                hasHighlights: false,
                highlightsOverflow: false,
                canShowDataLabels: true,
                dataLabelsSettings: powerbi.visuals.dataLabelUtils.getDefaultFunnelLabelSettings(),

            };
            expect(actualData).toEqual(expectedData);
        });

        it('Check converter with no category and multi-measures',() => {
            var dataViewMetadata: powerbi.DataViewMetadata = {
                columns: [
                    { displayName: 'col1', queryName: 'col1' },
                    { displayName: 'col2', queryName: 'col2', isMeasure: true },
                    { displayName: 'col3', queryName: 'col3', isMeasure: true }
                ]
            };
            var dataView: powerbi.DataView = {
                metadata: dataViewMetadata,
                categorical: {
                    categories: [],
                    values: DataViewTransform.createValueColumns([{
                        source: dataViewMetadata.columns[1],
                        values: [100, 200, 300],
                        subtotal: 600,
                    }, {
                            source: dataViewMetadata.columns[2],
                            values: [300, 200, 100],
                            subtotal: 600,
                        },
                    ])
                }
            };

            var actualData = FunnelChart.converter(dataView, colors);
            var selectionIds: SelectionId[] = [
                SelectionId.createWithMeasure("col2"),
                SelectionId.createWithMeasure("col3")];
            var sliceColor = colors.getColorByIndex(0).value;

            var expectedData: powerbi.visuals.FunnelData = {
                slices: [
                    {
                        value: 600,
                        label: 'col2',
                        identity: selectionIds[0],
                        key: selectionIds[0].getKey(),
                        selected: false,
                        categoryOrMeasureIndex: 0,
                        tooltipInfo: [{ displayName: "col2", value: "600" }],
                        color: sliceColor,
                        labelFill: labelColor,
                    }, {
                        value: 600,
                        label: 'col3',
                        identity: selectionIds[1],
                        key: selectionIds[1].getKey(),
                        selected: false,
                        categoryOrMeasureIndex: 1,
                        tooltipInfo: [{ displayName: "col2", value: "600" }],
                        color: sliceColor,
                        labelFill: labelColor,
                    }],
                categoryLabels: ['col2', 'col3'],
                valuesMetadata: [dataViewMetadata.columns[1], dataViewMetadata.columns[2]],
                hasHighlights: false,
                highlightsOverflow: false,
                canShowDataLabels: true,
                dataLabelsSettings: powerbi.visuals.dataLabelUtils.getDefaultFunnelLabelSettings(),
            };
            expect(actualData).toEqual(expectedData);
        });

        it('non-categorical multi-measure tooltip values test',() => {
            var dataViewMetadata: powerbi.DataViewMetadata = {
                columns: [
                    { displayName: 'a', queryName: 'a', isMeasure: true },
                    { displayName: 'b', queryName: 'b', isMeasure: true },
                    { displayName: 'c', queryName: 'c', isMeasure: true }
                ]
            };

            var dataView: powerbi.DataView = {
                metadata: dataViewMetadata,
                categorical: {
                    values: DataViewTransform.createValueColumns([
                        {
                            source: dataViewMetadata.columns[0],
                            values: [1]
                        },
                        {
                            source: dataViewMetadata.columns[1],
                            values: [2]
                        },
                        {
                            source: dataViewMetadata.columns[2],
                            values: [3]
                        }
                    ])
                }
            };

            var actualData = FunnelChart.converter(dataView, colors);

            expect(actualData.slices[0].tooltipInfo).toEqual([{ displayName: 'a', value: '1' }]);
            expect(actualData.slices[1].tooltipInfo).toEqual([{ displayName: 'b', value: '2' }]);
            expect(actualData.slices[2].tooltipInfo).toEqual([{ displayName: 'c', value: '3' }]);
        });
    });

    describe("FunnelChart Interactivity", () => {
        var v: powerbi.IVisual, element: JQuery;
        var hostServices: powerbi.IVisualHostServices;
        var dataViewMetadataCategorySeriesColumns: powerbi.DataViewMetadata = {
            columns: [
                { displayName: 'Squad', properties: { "Category": true }, type: ValueType.fromPrimitiveTypeAndCategory(PrimitiveType.Text) },
                { displayName: 'Period', properties: { "Series": true }, type: ValueType.fromPrimitiveTypeAndCategory(PrimitiveType.Double) },
                { displayName: null, groupName: '201501', isMeasure: true, properties: { "Values": true }, type: ValueType.fromPrimitiveTypeAndCategory(PrimitiveType.Double) },
                { displayName: null, groupName: '201502', isMeasure: true, properties: { "Values": true }, type: ValueType.fromPrimitiveTypeAndCategory(PrimitiveType.Double) },
                { displayName: null, groupName: '201503', isMeasure: true, properties: { "Values": true }, type: ValueType.fromPrimitiveTypeAndCategory(PrimitiveType.Double) }
            ]
        };
        var categoryColumnRef = powerbi.data.SQExprBuilder.fieldDef({ schema: 's', entity: 'e', column: 'Squad' });
        var DefaultOpacity = "" + FunnelChart.DefaultBarOpacity;
        var DimmedOpacity = "" + FunnelChart.DimmedBarOpacity;

        var interactiveDataViewOptions: powerbi.VisualDataChangedOptions = {
            dataViews: [{
                metadata: dataViewMetadataCategorySeriesColumns,
                categorical: {
                    categories: [{
                        source: dataViewMetadataCategorySeriesColumns.columns[0],
                        values: ['A', 'B'],
                        identity: [
                            mocks.dataViewScopeIdentity('a'),
                            mocks.dataViewScopeIdentity('b'),
                        ],
                        identityFields: [categoryColumnRef],
                    }],
                    values: DataViewTransform.createValueColumns([
                        {
                            source: dataViewMetadataCategorySeriesColumns.columns[2],
                            values: [110, 120],
                            identity: mocks.dataViewScopeIdentity('201501'),
                        }, {
                            source: dataViewMetadataCategorySeriesColumns.columns[3],
                            values: [210, 220],
                            identity: mocks.dataViewScopeIdentity('201502'),
                        }, {
                            source: dataViewMetadataCategorySeriesColumns.columns[4],
                            values: [310, 320],
                            identity: mocks.dataViewScopeIdentity('201503'),
                        }])
                }
            }]
        };

        beforeEach(() => {
            element = powerbitests.helpers.testDom('500', '500');
            v = powerbi.visuals.visualPluginFactory.create().getPlugin('funnel').create();
            hostServices = mocks.createVisualHostServices();
            v.init({
                element: element,
                host: hostServices,
                style: powerbi.visuals.visualStyles.create(),
                viewport: {
                    height: element.height(),
                    width: element.width()
                },
                animation: { transitionImmediate: true },
                interactivity: { selection: true }
            });
        });

        function getOptionsForValueWarning(values: number[]) {
            var interactiveDataViewOptions: powerbi.VisualDataChangedOptions = {
                dataViews: [{
                    metadata: dataViewMetadataCategorySeriesColumns,
                    categorical: {
                        categories: [{
                            source: dataViewMetadataCategorySeriesColumns.columns[0],
                            values: ['A', 'B'],
                            identity: [
                                mocks.dataViewScopeIdentity('a'),
                                mocks.dataViewScopeIdentity('b'),
                            ],
                            identityFields: [categoryColumnRef],
                        }],
                        values: DataViewTransform.createValueColumns([
                            {
                                source: dataViewMetadataCategorySeriesColumns.columns[2],
                                values: values,
                                identity: mocks.dataViewScopeIdentity('201501'),
                            }])
                    }
                }]
            };

            return interactiveDataViewOptions;
        }

        it('NaN in values shows warning', (done) => {
            var warningSpy = jasmine.createSpy('warning');
            hostServices.setWarnings = warningSpy;

            var options = getOptionsForValueWarning([110, 120, NaN]);
            v.onDataChanged(options);

            setTimeout(() => {
                expect(warningSpy).toHaveBeenCalled();
                expect(warningSpy.calls.count()).toBe(1);
                expect(warningSpy.calls.argsFor(0)[0][0].code).toBe('NaNNotSupported');
                done();
            });
        });

        it('Negative Infinity in values shows warning', (done) => {
            var warningSpy = jasmine.createSpy('warning');
            hostServices.setWarnings = warningSpy;

            var options = getOptionsForValueWarning([110, 120, Number.NEGATIVE_INFINITY]);
            v.onDataChanged(options);

            setTimeout(() => {
                expect(warningSpy).toHaveBeenCalled();
                expect(warningSpy.calls.count()).toBe(1);
                expect(warningSpy.calls.argsFor(0)[0][0].code).toBe('InfinityValuesNotSupported');
                done();
            });
        });

        it('Positive Infinity in values shows warning', (done) => {
            var warningSpy = jasmine.createSpy('warning');
            hostServices.setWarnings = warningSpy;

            var options = getOptionsForValueWarning([110, 120, Number.POSITIVE_INFINITY]);
            v.onDataChanged(options);

            setTimeout(() => {
                expect(warningSpy).toHaveBeenCalled();
                expect(warningSpy.calls.count()).toBe(1);
                expect(warningSpy.calls.argsFor(0)[0][0].code).toBe('InfinityValuesNotSupported');
                done();
            });
        });

        it('Out of range value in values shows warning', (done) => {
            var warningSpy = jasmine.createSpy('warning');
            hostServices.setWarnings = warningSpy;

            var options = getOptionsForValueWarning([110, 120, 1e301]);
            v.onDataChanged(options);

            setTimeout(() => {
                expect(warningSpy).toHaveBeenCalled();
                expect(warningSpy.calls.count()).toBe(1);
                expect(warningSpy.calls.argsFor(0)[0][0].code).toBe('ValuesOutOfRange');
                done();
            });
        });

        it('All good in values shows warning', (done) => {
            var warningSpy = jasmine.createSpy('warning');
            hostServices.setWarnings = warningSpy;

            var options = getOptionsForValueWarning([110, 120, 300]);
            v.onDataChanged(options);

            setTimeout(() => {
                expect(warningSpy).not.toHaveBeenCalled();
                done();
            });
        });

        it('funnel chart category select',(done) => {
            v.onDataChanged(interactiveDataViewOptions);

            setTimeout(() => {
                var bars = $('.funnelChart .funnelBar');

                spyOn(hostServices, 'onSelect').and.callThrough();

                (<any>bars.first()).d3Click(0, 0);

                expect(bars[0].style.fillOpacity).toBe(DefaultOpacity);
                expect(bars[1].style.fillOpacity).toBe(DimmedOpacity);

                expect(hostServices.onSelect).toHaveBeenCalledWith(
                    {
                        data: [
                            {
                                data: [interactiveDataViewOptions.dataViews[0].categorical.categories[0].identity[0]]
                            }
                        ]
                    });
                done();
            });
        });

        it('funnel chart category multi-select',(done) => {
            //powerbitests.mocks.setLocale();
            v.onDataChanged(interactiveDataViewOptions);

            setTimeout(() => {
                var bars = $('.funnelChart .funnelBar');

                spyOn(hostServices, 'onSelect').and.callThrough();

                (<any>bars.first()).d3Click(0, 0);

                expect(bars[0].style.fillOpacity).toBe(DefaultOpacity);
                expect(bars[1].style.fillOpacity).toBe(DimmedOpacity);
                expect(hostServices.onSelect).toHaveBeenCalledWith(
                    {
                        data: [
                            {
                                data: [interactiveDataViewOptions.dataViews[0].categorical.categories[0].identity[0]],
                            }
                        ]
                    });

                (<any>bars.last()).d3Click(0, 0, EventType.CtrlKey);

                //expect(bars[0].style.fillOpacity).toBe(DefaultOpacity);
                expect(bars[1].style.fillOpacity).toBe(DefaultOpacity);
                expect(hostServices.onSelect).toHaveBeenCalledWith(
                    {
                        data: [
                            {
                                data: [interactiveDataViewOptions.dataViews[0].categorical.categories[0].identity[0]],
                            },
                        ]
                    });

                done();
            });
        });

        it('funnel chart external clear',(done) => {
            v.onDataChanged(interactiveDataViewOptions);

            setTimeout(() => {
                var bars = $('.funnelChart .funnelBar');

                spyOn(hostServices, 'onSelect').and.callThrough();

                (<any>bars.first()).d3Click(0, 0);

                expect(bars[0].style.fillOpacity).toBe(DefaultOpacity);
                expect(bars[1].style.fillOpacity).toBe(DimmedOpacity);

                expect(hostServices.onSelect).toHaveBeenCalledWith(
                    {
                        data: [
                            {
                                data: [interactiveDataViewOptions.dataViews[0].categorical.categories[0].identity[0]]
                            }
                        ]
                    });

                v.onClearSelection();

                expect(bars[0].style.fillOpacity).toBe(DefaultOpacity);
                expect(bars[1].style.fillOpacity).toBe(DefaultOpacity);

                done();
            });
        });

        it('funnel chart clear on clearCatcher click',(done) => {
            v.onDataChanged(interactiveDataViewOptions);

            setTimeout(() => {
                var bars = $('.funnelChart .funnelBar');

                spyOn(hostServices, 'onSelect').and.callThrough();

                (<any>bars.first()).d3Click(0, 0);

                expect(bars[0].style.fillOpacity).toBe(DefaultOpacity);
                expect(bars[1].style.fillOpacity).toBe(DimmedOpacity);
                expect(hostServices.onSelect).toHaveBeenCalledWith(
                    {
                        data: [
                            {
                                data: [interactiveDataViewOptions.dataViews[0].categorical.categories[0].identity[0]]
                            }
                        ]
                    });

                var clearCatcher = $('.clearCatcher');
                (<any>clearCatcher.first()).d3Click(0, 0);

                expect(bars[0].style.fillOpacity).toBe(DefaultOpacity);
                expect(bars[1].style.fillOpacity).toBe(DefaultOpacity);
                expect(hostServices.onSelect).toHaveBeenCalledWith(
                    {
                        data: []
                    });

                done();
            });
        });
    });

    describe("FunnelChart DOM Validation", () => {
        var v: powerbi.IVisual, element: JQuery;
        var translate = 62;
        var dataViewMetadata: powerbi.DataViewMetadata = {
            columns: [
                { displayName: 'col1' },
                { displayName: 'col2', isMeasure: true, objects: { general: { formatString: '$0' } } },
            ],
            objects: {
                labels: { show: true, labelPrecision: 0 }
            }
        };
        var categoryColumnRef = powerbi.data.SQExprBuilder.fieldDef({ schema: 's', entity: 'e', column: 'col1' });

        beforeEach(() => {
            element = powerbitests.helpers.testDom('500', '500');
            v = powerbi.visuals.visualPluginFactory.create().getPlugin('funnel').create();
            v.init({
                element: element,
                host: mocks.createVisualHostServices(),
                style: powerbi.visuals.visualStyles.create(),
                viewport: {
                    height: element.height(),
                    width: element.width()
                },
                animation: { transitionImmediate: true }
            });
        });

        it('Ensure DOM built', (done) => {
            var categoryIdentities = [
                mocks.dataViewScopeIdentity("John Domo"),
                mocks.dataViewScopeIdentity("Delta Force"),
                mocks.dataViewScopeIdentity("Jean Tablau"),
            ];
            var dataView: powerbi.DataView = {
                metadata: dataViewMetadata,
                categorical: {
                    categories: [{
                        source: dataViewMetadata.columns[0],
                        values: ['John Domo', 'Delta Force', 'Jean Tablau'],
                        identity: categoryIdentities,
                        identityFields: [categoryColumnRef],
                    }],
                    values: DataViewTransform.createValueColumns([{
                        source: dataViewMetadata.columns[1],
                        values: [100, 200, 700],
                    }])
                }
            };

            v.onDataChanged({ dataViews: [dataView] });

            setTimeout(() => {
                FunnelChartHelpers.validatePercentBars(true, dataView);
                expect($('.funnelChart g').length).toBe(7);
                expect($('.funnelChart .axis').find('text').length).toBe(3);
                expect($('.funnelChart .labels').find('text').length).toBe(3);
                expect($('.funnelChart .labels').find('text').first().text()).toBe('$100');
                done();
            }, DefaultWaitForRender);
        });

        it('Funnel partial highlight', (done) => {
            var categoryIdentities = [
                mocks.dataViewScopeIdentity("John Domo"),
                mocks.dataViewScopeIdentity("Delta Force"),
                mocks.dataViewScopeIdentity("Jean Tablau"),
            ];
            var dataView: powerbi.DataView = {
                metadata: dataViewMetadata,
                categorical: {
                    categories: [{
                        source: dataViewMetadata.columns[0],
                        values: ['John Domo', 'Delta Force', 'Jean Tablau'],
                        identity: categoryIdentities,
                        identityFields: [categoryColumnRef],
                    }],
                    values: DataViewTransform.createValueColumns([{
                        source: dataViewMetadata.columns[1],
                        values: [100, 200, 700],
                        highlights: [50, 140, 420],
                        subtotal: 1000
                    }])
                }
            };
            

            v.onDataChanged({ dataViews: [dataView] });

            setTimeout(() => {
                FunnelChartHelpers.validatePercentBars(true, dataView);
                expect($('.funnelChart g').length).toBe(7);
                expect($('.funnelBar').length).toBe(6);
                expect($('.highlight').length).toBe(3);
                expect(+$('.highlight')[0].attributes.getNamedItem('height').value)
                    .toBeLessThan(+$('.funnelBar')[0].attributes.getNamedItem('height').value);
                expect(+$('.highlight')[0].attributes.getNamedItem('y').value)
                    .toBeGreaterThan(+$('.funnelBar')[0].attributes.getNamedItem('y').value);
                expect($('.funnelChart .axis').find('text').length).toBe(3);
                done();
            }, DefaultWaitForRender);
        });

        it('Funnel partial highlight with overflow', (done) => {
            var categoryIdentities = [
                mocks.dataViewScopeIdentity("John Domo"),
                mocks.dataViewScopeIdentity("Delta Force"),
                mocks.dataViewScopeIdentity("Jean Tablau"),
            ];
            var dataView: powerbi.DataView = {
                metadata: dataViewMetadata,
                categorical: {
                    categories: [{
                        source: dataViewMetadata.columns[0],
                        values: ['John Domo', 'Delta Force', 'Jean Tablau'],
                        identity: categoryIdentities,
                        identityFields: [categoryColumnRef],
                    }],
                    values: DataViewTransform.createValueColumns([{
                        source: dataViewMetadata.columns[1],
                        values: [100, 200, 700],
                        highlights: [150, 340, 720],
                        subtotal: 1000
                    }])
                }
            };

            v.onDataChanged({ dataViews: [dataView] });

            setTimeout(() => {
                FunnelChartHelpers.validatePercentBars(true, dataView);
                expect($('.funnelChart g').length).toBe(7);
                expect($('.funnelBar').length).toBe(6);
                expect($('.highlight').length).toBe(3);
                expect(+$('.highlight')[0].attributes.getNamedItem('height').value)
                    .toBeGreaterThan(+$('.funnelBar')[0].attributes.getNamedItem('height').value);
                expect(+$('.highlight')[0].attributes.getNamedItem('y').value)
                    .toBeLessThan(+$('.funnelBar')[0].attributes.getNamedItem('y').value);
                expect($('.funnelChart .axis').find('text').length).toBe(3);
                done();
            }, DefaultWaitForRender);
        });

        it('Ensure Max Width is respected', (done) => {
            var categoryIdentities = [
                mocks.dataViewScopeIdentity("John Domo"),
                mocks.dataViewScopeIdentity("Delta Force"),
                mocks.dataViewScopeIdentity("Jean Tablau"),
            ];
            var dataView: powerbi.DataView = {
                metadata: dataViewMetadata,
                categorical: {
                    categories: [{
                        source: dataViewMetadata.columns[0],
                        values: ['John Domo', 'Delta Force'],
                        identity: categoryIdentities,
                        identityFields: [categoryColumnRef],
                    }],
                    values: DataViewTransform.createValueColumns([{
                        source: dataViewMetadata.columns[1],
                        values: [100, 200],
                        subtotal: 300
                    }])
                }
            };
            v.onDataChanged({ dataViews: [dataView] });
            setTimeout(() => {
                var rect = $('.funnelChart').find('.funnelBar').first();
                expect(rect.attr('width')).toBeLessThan(40);
                done();
            }, DefaultWaitForRender);
        });

        it('Ensure Labels that do not fit in the bar are shown outside and are the bar fill color', (done) => {
            var categoryIdentities = [
                mocks.dataViewScopeIdentity("John Domo"),
                mocks.dataViewScopeIdentity("Delta Force"),
                mocks.dataViewScopeIdentity("Mr Bing"),
            ];
            var dataViewMetadataWithLabelsObject = powerbi.Prototype.inherit(dataViewMetadata);
            dataViewMetadataWithLabelsObject.objects = { labels: { labelPosition: powerbi.labelPosition.insideCenter } };
            var dataView: powerbi.DataView = {
                metadata: dataViewMetadataWithLabelsObject,
                categorical: {
                    categories: [{
                        source: dataViewMetadataWithLabelsObject.columns[0],
                        values: ['John Domo', 'Delta Force', 'Mr Bing'],
                        identity: categoryIdentities,
                        identityFields: [categoryColumnRef],
                    }],
                    values: DataViewTransform.createValueColumns([{
                        source: dataViewMetadataWithLabelsObject.columns[1],
                        values: [1000, 2000, 20],
                        subtotal: 3020
                    }])
                }
            };
            v.onDataChanged({ dataViews: [dataView] });
            setTimeout(() => {
                // The funnel bars are rotated 90 degrees, so for the bars, "y" and "height" correspond
                // to what we would think of as the position and size along the x-axis.
                // The funnel data labels are not rotated, so for the labels we need to use "x" and "width".

                var labels = $('.funnelChart .labels text');
                var firstBarHeight = +$('.funnelChart').find('.funnelBar').first().attr('height');
                var firstBarY = +$('.funnelChart').find('.funnelBar').first().attr('y');
                var lastBarHeight = +$('.funnelChart').find('.funnelBar').last().attr('height');
                var lastBarY = +$('.funnelChart').find('.funnelBar').last().attr('y');

                expect(labels.length).toBe(3);
                expect($(labels[0]).attr('x')).toEqual($(labels[1]).attr('x'));
                expect($(labels[1]).attr('x')).not.toEqual($(labels[2]).attr('x'));

                // Check that the first label is inside and white
                expect(ColorConvertor($(labels[0]).css('fill'))).toEqual(defaultInsideLabelColor);
                expect($(labels[0]).attr('x')).toBeGreaterThan(firstBarY + translate);
                expect($(labels[0]).attr('x')).toBeLessThan(firstBarY + firstBarHeight + translate);

                // Check that the last label is outside and equal to fill color
                expect(ColorConvertor($(labels[2]).css('fill'))).toEqual(ColorConvertor(labelColor));
                expect($(labels[2]).attr('x')).toBeGreaterThan(lastBarY + lastBarHeight + translate);

                done();
            }, DefaultWaitForRender);
        });

        it('Ensure Labels hide when viewport forces bars to be smaller than min height', (done) => {
            var dataView: powerbi.DataView = {
                metadata: dataViewMetadata,
                categorical: {
                    categories: [{
                        source: dataViewMetadata.columns[0],
                        values: ['John Domo', 'Delta Force', 'Bugs Bunny', 'Mickey Mouse', 'Donald Duck', 'VRM Jones'],
                        identity: [
                            mocks.dataViewScopeIdentity('John Domo'),
                            mocks.dataViewScopeIdentity('Delta Force'),
                            mocks.dataViewScopeIdentity('Bugs Bunny'),
                            mocks.dataViewScopeIdentity('Mickey Mouse'),
                            mocks.dataViewScopeIdentity('Donald Duck'),
                            mocks.dataViewScopeIdentity('VRM Jones'),
                        ],
                        identityFields: [categoryColumnRef],
                    }],
                    values: DataViewTransform.createValueColumns([{
                        source: dataViewMetadata.columns[1],
                        values: [100, 200, 300, 400, 500, 600],
                        subtotal: 2100
                    }])
                }
            };
            v.onDataChanged({ dataViews: [dataView] });
            setTimeout(() => {
                expect($('.funnelChart g').length).toBe(10);
                expect($('.funnelChart .axis').find('text').length).toBe(6);
                expect($('.funnelChart .labels text').length).toBe(6);
                v.onResizing({ height: 50, width: 100 });
                setTimeout(() => {
                    expect($('.funnelChart g').length).toBe(3); // No 'g' for data labels
                    expect($('.funnelChart .axis').find('text').length).toBe(0);
                    expect($('.funnelChart .labels text').length).toBe(0);
                    done();
                }, DefaultWaitForRender);
            }, DefaultWaitForRender);
        });

        it('Ensure Labels show but percent bar hides when adding percent bars would cause labels to hide', (done) => {
            var dataView: powerbi.DataView = {
                metadata: dataViewMetadata,
                categorical: {
                    categories: [{
                        source: dataViewMetadata.columns[0],
                        values: ['John Domo', 'Delta Force', 'Bugs Bunny', 'Mickey Mouse', 'Donald Duck', 'VRM Jones'],
                        identity: [
                            mocks.dataViewScopeIdentity('John Domo'),
                            mocks.dataViewScopeIdentity('Delta Force'),
                            mocks.dataViewScopeIdentity('Bugs Bunny'),
                            mocks.dataViewScopeIdentity('Mickey Mouse'),
                            mocks.dataViewScopeIdentity('Donald Duck'),
                            mocks.dataViewScopeIdentity('VRM Jones'),
                        ],
                        identityFields: [categoryColumnRef],
                    }],
                    values: DataViewTransform.createValueColumns([{
                        source: dataViewMetadata.columns[1],
                        values: [100, 200, 300, 400, 500, 600],
                        subtotal: 2100
                    }])
                }
            };
            v.onDataChanged({ dataViews: [dataView] });
            setTimeout(() => {
                FunnelChartHelpers.validatePercentBars(true, dataView);
                expect($('.funnelChart g').length).toBe(10);
                expect($('.funnelChart .axis').find('text').length).toBe(6);
                expect($('.funnelChart .labels text').length).toBe(6);
                v.onResizing({ height: 100, width: 100 });
                setTimeout(() => {
                    FunnelChartHelpers.validatePercentBars(false, dataView);
                    expect($('.funnelChart g').length).toBe(10);
                    expect($('.funnelChart .axis').find('text').length).toBe(6);
                    expect($('.funnelChart .labels text').length).toBe(6);
                    done();
                }, DefaultWaitForRender);
            }, DefaultWaitForRender);
        });

        it('Ensure percent bars hide when viewport forces bars to be smaller than min height', (done) => {
            var dataView: powerbi.DataView = {
                metadata: dataViewMetadata,
                categorical: {
                    categories: [{
                        source: dataViewMetadata.columns[0],
                        values: ['John Domo', 'Delta Force', 'Bugs Bunny', 'Mickey Mouse', 'Donald Duck', 'VRM Jones'],
                        identity: [
                            mocks.dataViewScopeIdentity('John Domo'),
                            mocks.dataViewScopeIdentity('Delta Force'),
                            mocks.dataViewScopeIdentity('Bugs Bunny'),
                            mocks.dataViewScopeIdentity('Mickey Mouse'),
                            mocks.dataViewScopeIdentity('Donald Duck'),
                            mocks.dataViewScopeIdentity('VRM Jones'),
                        ],
                        identityFields: [categoryColumnRef],
                    }],
                    values: DataViewTransform.createValueColumns([{
                        source: dataViewMetadata.columns[1],
                        values: [100, 200, 300, 400, 500, 600],
                        subtotal: 2100
                    }])
                }
            };
            v.onDataChanged({ dataViews: [dataView] });
            setTimeout(() => {
                FunnelChartHelpers.validatePercentBars(true, dataView);
                expect($('.funnelChart g').length).toBe(10);
                expect($('.funnelChart .axis').find('text').length).toBe(6);
                expect($('.funnelChart .labels text').length).toBe(6);
                v.onResizing({ height: 50, width: 100 });
                setTimeout(() => {
                    FunnelChartHelpers.validatePercentBars(false, dataView);
                    expect($('.funnelChart g').length).toBe(3); // No 'g' for data labels
                    expect($('.funnelChart .axis').find('text').length).toBe(0);
                    expect($('.funnelChart .labels text').length).toBe(0);
                    done();
                }, DefaultWaitForRender);
            }, DefaultWaitForRender);
        });

        it('Ensure percent bars hide when single value data set', (done) => {
            var dataView: powerbi.DataView = {
                metadata: dataViewMetadata,
                categorical: {
                    categories: [{
                        source: dataViewMetadata.columns[0],
                        values: ['John Domo'],
                        identity: [
                            mocks.dataViewScopeIdentity('John Domo'),
                        ],
                        identityFields: [categoryColumnRef],
                    }],
                    values: DataViewTransform.createValueColumns([{
                        source: dataViewMetadata.columns[1],
                        values: [100],
                        subtotal: 100
                    }])
                }
            };
            v.onDataChanged({ dataViews: [dataView] });
            setTimeout(() => {
                FunnelChartHelpers.validatePercentBars(false, dataView);
                expect($('.funnelChart g').length).toBe(5);
                expect($('.funnelChart .axis').find('text').length).toBe(1);
                expect($('.funnelChart .labels text').length).toBe(1);
                
                done();
            }, DefaultWaitForRender);
        });

        it('Ensure percent bars hide when baseline value is zero', (done) => {
            var dataView: powerbi.DataView = {
                metadata: dataViewMetadata,
                categorical: {
                    categories: [{
                        source: dataViewMetadata.columns[0],
                        values: ['John Domo', 'Delta Force', 'Bugs Bunny', 'Mickey Mouse', 'Donald Duck', 'VRM Jones'],
                        identity: [
                            mocks.dataViewScopeIdentity('John Domo'),
                            mocks.dataViewScopeIdentity('Delta Force'),
                            mocks.dataViewScopeIdentity('Bugs Bunny'),
                            mocks.dataViewScopeIdentity('Mickey Mouse'),
                            mocks.dataViewScopeIdentity('Donald Duck'),
                            mocks.dataViewScopeIdentity('VRM Jones'),
                        ],
                        identityFields: [categoryColumnRef],
                    }],
                    values: DataViewTransform.createValueColumns([{
                        source: dataViewMetadata.columns[1],
                        values: [0, 200, 300, 400, 500, 600],
                        subtotal: 2000
                    }])
                }
            };
            v.onDataChanged({ dataViews: [dataView] });
            setTimeout(() => {
                FunnelChartHelpers.validatePercentBars(false, dataView);
                expect($('.funnelChart g').length).toBe(10);
                expect($('.funnelChart .axis').find('text').length).toBe(6);
                expect($('.funnelChart .labels text').length).toBe(6);

                done();
            }, DefaultWaitForRender);
        });

        it('Default labels validation', (done) => {
            var metadataWithDisplayUnits = $.extend(true, {}, dataViewMetadata);
            metadataWithDisplayUnits.objects = { labels: { labelDisplayUnits: 1000 } };

            var fontSize = '12px';
            var categoryIdentities = [
                mocks.dataViewScopeIdentity("John Domo"),
                mocks.dataViewScopeIdentity("Delta Force"),
                mocks.dataViewScopeIdentity("Mr Bing"),
            ];
            var dataView: powerbi.DataView = {
                metadata: metadataWithDisplayUnits,
                categorical: {
                    categories: [{
                        source: dataViewMetadata.columns[0],
                        values: ['John Domo', 'Delta Force', 'Mr Bing'],
                        identity: categoryIdentities,
                        identityFields: [categoryColumnRef],
                    }],
                    values: DataViewTransform.createValueColumns([{
                        source: dataViewMetadata.columns[1],
                        values: [555, 2000, 20],
                        subtotal: 2575
                    }])
                }
            };
            v.onDataChanged({ dataViews: [dataView] });
            setTimeout(() => {
                // The funnel bars are rotated 90 degrees, so for the bars, "y" and "height" correspond
                // to what we would think of as the position and size along the x-axis.
                // The funnel data labels are not rotated, so for the labels we need to use "x" and "width".

                var labels = $('.funnelChart .labels text');
                var firstBarY = +$('.funnelChart').find('.funnelBar').first().attr('y');
                var firstBarHeight = +$('.funnelChart').find('.funnelBar').first().attr('height');
                var lastBarY = +$('.funnelChart').find('.funnelBar').last().attr('y');
                var lastBarHeight = +$('.funnelChart').find('.funnelBar').last().attr('height');

                expect(labels.length).toBe(3);
                expect(ColorConvertor($(labels[0]).css('fill'))).toEqual(defaultInsideLabelColor);
                expect(ColorConvertor($(labels[2]).css('fill'))).toEqual(labelColor);
                expect($(labels[0]).css('fill-opacity')).toEqual('1');
                expect($(labels[1]).css('fill-opacity')).toEqual('1');
                expect($(labels[2]).css('fill-opacity')).toEqual('1');
                expect($(labels.first().css('font-size')).selector).toBe(fontSize);
                expect($(labels[0]).text()).toEqual('$0.56K');

                // Check that the first label is inside
                expect($(labels[0]).attr('x')).toBeGreaterThan(firstBarY + translate);
                expect($(labels[0]).attr('x')).toBeLessThan(firstBarY + firstBarHeight + translate);

                // Check that the last label is outside
                expect($(labels[2]).attr('x')).toBeGreaterThan(lastBarY + lastBarHeight);

                done();
            }, DefaultWaitForRender);
        });

        it('Validate label colors and positioning',(done) => {

            var categoryIdentities = [
                mocks.dataViewScopeIdentity("John Domo"),
                mocks.dataViewScopeIdentity("Delta Force"),
                mocks.dataViewScopeIdentity("Mr Bing"),
            ];
            var dataView: powerbi.DataView = {
                metadata: dataViewMetadata,
                categorical: {
                    categories: [{
                        source: dataViewMetadata.columns[0],
                        values: ['John Domo', 'Delta Force', 'Mr Bing'],
                        identity: categoryIdentities,
                        identityFields: [categoryColumnRef],
                    }],
                    values: DataViewTransform.createValueColumns([{
                        source: dataViewMetadata.columns[1],
                        values: [2000, 1555, 20],
                        subtotal: 3575
                    }])
                }
            };
            v.onDataChanged({ dataViews: [dataView] });
            setTimeout(() => {
                // The funnel bars are rotated 90 degrees, so for the bars, "y" and "height" correspond
                // to what we would think of as the position and size along the x-axis.
                // The funnel data labels are not rotated, so for the labels we need to use "x" and "width".

                var labels = $('.funnelChart .labels text');
                var firstBarY = +$('.funnelChart').find('.funnelBar').first().attr('y');
                var firstBarHeight = +$('.funnelChart').find('.funnelBar').first().attr('height');

                // The first label should be white and should be inside the bar.
                expect($(labels[0]).text()).toEqual('$2K');
                expect(ColorConvertor($(labels[0]).css('fill'))).toEqual(defaultInsideLabelColor);
                expect($(labels[0]).attr('x')).toBeGreaterThan(firstBarY + translate);
                expect($(labels[0]).attr('x')).toBeLessThan(firstBarY + firstBarHeight + translate);

                // The third label should be the same as the fill color and should be outside the bar.
                var thirdBarY = +$('.funnelChart').find('.funnelBar').eq(2).attr('y');
                var thirdBarHeight = +$('.funnelChart').find('.funnelBar').eq(2).attr('height');
                //Data labels precision = 0
                expect($(labels[2]).text()).toEqual('$0K');
                expect(ColorConvertor($(labels[2]).css('fill'))).toEqual(ColorConvertor(labelColor));
                expect($(labels[2]).attr('x')).toBeGreaterThan(thirdBarY + thirdBarHeight + translate);

                done();
            }, DefaultWaitForRender);
        });

        it('Change labels position validation', (done) => {
            var dataViewMetadataWithLabelsObject = powerbi.Prototype.inherit(dataViewMetadata);
            dataViewMetadataWithLabelsObject.objects = { labels: { labelPosition: powerbi.labelPosition.insideBase } };

            var categoryIdentities = [
                mocks.dataViewScopeIdentity("John Domo"),
                mocks.dataViewScopeIdentity("Delta Force"),
                mocks.dataViewScopeIdentity("Mr Bing"),
            ];
            var dataView: powerbi.DataView = {
                metadata: dataViewMetadataWithLabelsObject,
                categorical: {
                    categories: [{
                        source: dataViewMetadataWithLabelsObject.columns[0],
                        values: ['John Domo', 'Delta Force', 'Mr Bing'],
                        identity: categoryIdentities,
                        identityFields: [categoryColumnRef],
                    }],
                    values: DataViewTransform.createValueColumns([{
                        source: dataViewMetadataWithLabelsObject.columns[1],
                        values: [1000, 2000, 2000],
                        subtotal: 5000
                    }])
                }
            };
            v.onDataChanged({ dataViews: [dataView] });
            setTimeout(() => {
                var labels = $('.funnelChart .labels .data-labels');
                var firstBarX = +$('.funnelChart').find('.funnelBar').first().attr('x');
                var firstBarWidth = +$('.funnelChart').find('.funnelBar').first().attr('height');
                var firstBarTranslated = firstBarX - translate;
                var firstBar = firstBarTranslated + firstBarWidth;

                expect(labels.length).toBe(3);
                expect(ColorConvertor($(labels[0]).css('fill'))).toEqual(ColorConvertor(defaultInsideLabelColor));
                expect(ColorConvertor($(labels[1]).css('fill'))).toEqual(ColorConvertor(defaultInsideLabelColor));
                expect(ColorConvertor($(labels[2]).css('fill'))).toEqual(ColorConvertor(defaultInsideLabelColor));
                //Check that the labels position is inside
                expect($(labels[0]).attr('x')).toBeGreaterThan(firstBarTranslated);
                expect($(labels[0]).attr('x')).toBeLessThan(firstBar);
                done();
            }, DefaultWaitForRender);
        });

        it('Change labels color validation', (done) => {
            var color = '#CC0099';
            var categoryIdentities = [
                mocks.dataViewScopeIdentity("John Domo"),
                mocks.dataViewScopeIdentity("Delta Force"),
                mocks.dataViewScopeIdentity("Mr Bing"),
            ];
            var dataViewMetadataWithLabelsObject = powerbi.Prototype.inherit(dataViewMetadata);
            dataViewMetadataWithLabelsObject.objects = {
                labels: {
                    color: { solid: { color: '#CC0099' } },
                }
            };
            var dataView: powerbi.DataView = {
                metadata: dataViewMetadataWithLabelsObject,
                categorical: {
                    categories: [{
                        source: dataViewMetadataWithLabelsObject.columns[0],
                        values: ['John Domo', 'Delta Force', 'Mr Bing'],
                        identity: categoryIdentities,
                        identityFields: [categoryColumnRef],
                    }],
                    values: DataViewTransform.createValueColumns([{
                        source: dataViewMetadataWithLabelsObject.columns[1],
                        values: [1555, 2000, 20],
                        subtotal: 3575
                    }])
                }
            };
            v.onDataChanged({ dataViews: [dataView] });
            setTimeout(() => {
                var labels = $('.funnelChart .labels text');
                expect(labels.length).toBe(3);
                //inside labels are white
                expect(ColorConvertor($(labels[0]).css('fill'))).toEqual(ColorConvertor(defaultInsideLabelColor));
                expect(ColorConvertor($(labels[1]).css('fill'))).toEqual(ColorConvertor(defaultInsideLabelColor));
                //outside labels are changed
                expect(ColorConvertor($(labels[2]).css('fill'))).toEqual(ColorConvertor(color.toLowerCase()));
                done();
            }, DefaultWaitForRender);
        });

        it('Hide labels validation', (done) => {
            var categoryIdentities = [
                mocks.dataViewScopeIdentity("John Domo"),
                mocks.dataViewScopeIdentity("Delta Force"),
                mocks.dataViewScopeIdentity("Mr Bing"),
            ];
            var dataViewMetadataWithLabelsObject = powerbi.Prototype.inherit(dataViewMetadata);
            dataViewMetadataWithLabelsObject.objects = { labels: { show: false } };

            var dataView: powerbi.DataView = {
                metadata: dataViewMetadataWithLabelsObject,
                categorical: {
                    categories: [{
                        source: dataViewMetadataWithLabelsObject.columns[0],
                        values: ['John Domo', 'Delta Force', 'Mr Bing'],
                        identity: categoryIdentities,
                        identityFields: [categoryColumnRef],
                    }],
                    values: DataViewTransform.createValueColumns([{
                        source: dataViewMetadataWithLabelsObject.columns[1],
                        values: [1555, 2000, 20],
                        subtotal: 3575
                    }])
                }
            };
            v.onDataChanged({ dataViews: [dataView] });
            setTimeout(() => {
                var labels = $('.funnelChart .labels text');
                expect(labels.length).toBe(0);
                done();
            }, DefaultWaitForRender);
        });

        it('Funnel highlighted values - validate labels',(done) => {
            var categoryIdentities = [
                mocks.dataViewScopeIdentity("John Domo"),
                mocks.dataViewScopeIdentity("Delta Force"),
                mocks.dataViewScopeIdentity("Jean Tablau"),
            ];
            var dataViewNoHighlights: powerbi.DataView = {
                metadata: dataViewMetadata,
                categorical: {
                    categories: [{
                        source: dataViewMetadata.columns[0],
                        values: ['John Domo', 'Delta Force', 'Jean Tablau'],
                        identity: categoryIdentities,
                        identityFields: [categoryColumnRef],
                    }],
                    values: DataViewTransform.createValueColumns([{
                        source: dataViewMetadata.columns[1],
                        values: [100, 200, 700],
                        subtotal: 1000
                    }])
                }
            };
            var dataViewHighlightsA: powerbi.DataView = {
                metadata: dataViewMetadata,
                categorical: {
                    categories: [{
                        source: dataViewMetadata.columns[0],
                        values: ['John Domo', 'Delta Force', 'Jean Tablau'],
                        identity: categoryIdentities,
                        identityFields: [categoryColumnRef],
                    }],
                    values: DataViewTransform.createValueColumns([{
                        source: dataViewMetadata.columns[1],
                        values: [100, 200, 700],
                        highlights: [50, 140, 420],
                        subtotal: 1000
                    }])
                }
            };
            var dataViewHighlightsB: powerbi.DataView = {
                metadata: dataViewMetadata,
                categorical: {
                    categories: [{
                        source: dataViewMetadata.columns[0],
                        values: ['John Domo', 'Delta Force', 'Jean Tablau'],
                        identity: categoryIdentities,
                        identityFields: [categoryColumnRef],
                    }],
                    values: DataViewTransform.createValueColumns([{
                        source: dataViewMetadata.columns[1],
                        values: [100, 200, 700],
                        highlights: [75, 40, 220],
                        subtotal: 1000
                    }])
                }
            };

            v.onDataChanged({ dataViews: [dataViewNoHighlights] });
            v.onDataChanged({ dataViews: [dataViewHighlightsA] });
            v.onDataChanged({ dataViews: [dataViewHighlightsB] });
            v.onDataChanged({ dataViews: [dataViewNoHighlights] });

            setTimeout(() => {
                var labels = $('.funnelChart .labels text');
                expect(labels.length).toBe(3);
                expect(ColorConvertor($(labels[0]).css('fill'))).toEqual(defaultInsideLabelColor);
                expect($(labels[0]).text()).toEqual('$100');
                expect($(labels[1]).text()).toEqual('$200');
                expect($(labels[2]).text()).toEqual('$700');

                done();
            }, DefaultWaitForRender);
        });

        it('Funnel highlighted values - validate percent bars', (done) => {
            var categoryIdentities = [
                mocks.dataViewScopeIdentity("John Domo"),
                mocks.dataViewScopeIdentity("Delta Force"),
                mocks.dataViewScopeIdentity("Jean Tablau"),
            ];
            var dataViewNoHighlights: powerbi.DataView = {
                metadata: dataViewMetadata,
                categorical: {
                    categories: [{
                        source: dataViewMetadata.columns[0],
                        values: ['John Domo', 'Delta Force', 'Jean Tablau'],
                        identity: categoryIdentities,
                        identityFields: [categoryColumnRef],
                    }],
                    values: DataViewTransform.createValueColumns([{
                        source: dataViewMetadata.columns[1],
                        values: [100, 200, 700],
                        subtotal: 1000
                    }])
                }
            };
            var dataViewHighlightsA: powerbi.DataView = {
                metadata: dataViewMetadata,
                categorical: {
                    categories: [{
                        source: dataViewMetadata.columns[0],
                        values: ['John Domo', 'Delta Force', 'Jean Tablau'],
                        identity: categoryIdentities,
                        identityFields: [categoryColumnRef],
                    }],
                    values: DataViewTransform.createValueColumns([{
                        source: dataViewMetadata.columns[1],
                        values: [100, 200, 700],
                        highlights: [50, 140, 420],
                        subtotal: 1000
                    }])
                }
            };
            var dataViewHighlightsB: powerbi.DataView = {
                metadata: dataViewMetadata,
                categorical: {
                    categories: [{
                        source: dataViewMetadata.columns[0],
                        values: ['John Domo', 'Delta Force', 'Jean Tablau'],
                        identity: categoryIdentities,
                        identityFields: [categoryColumnRef],
                    }],
                    values: DataViewTransform.createValueColumns([{
                        source: dataViewMetadata.columns[1],
                        values: [100, 200, 700],
                        highlights: [75, 40, 220],
                        subtotal: 1000
                    }])
                }
            };

            v.onDataChanged({ dataViews: [dataViewNoHighlights] });

            setTimeout(() => {
                FunnelChartHelpers.validatePercentBars(true, dataViewNoHighlights);
                v.onDataChanged({ dataViews: [dataViewHighlightsA] });
                setTimeout(() => {
                    FunnelChartHelpers.validatePercentBars(true, dataViewHighlightsA);
                    v.onDataChanged({ dataViews: [dataViewHighlightsB] });
                    setTimeout(() => {
                        FunnelChartHelpers.validatePercentBars(true, dataViewHighlightsB);
                        v.onDataChanged({ dataViews: [dataViewNoHighlights] });
                        setTimeout(() => {
                            FunnelChartHelpers.validatePercentBars(true, dataViewNoHighlights);
                            done();
                        }, DefaultWaitForRender);
                    }, DefaultWaitForRender);
                }, DefaultWaitForRender);
            }, DefaultWaitForRender);
        });

        it('labels should support display units with no precision', (done) => {
            var categoryIdentities = [
                mocks.dataViewScopeIdentity("John Domo"),
                mocks.dataViewScopeIdentity("Delta Force"),
                mocks.dataViewScopeIdentity("Mr Bing"),
            ];
            var dataViewMetadataWithLabelsObject = powerbi.Prototype.inherit(dataViewMetadata);
            dataViewMetadataWithLabelsObject.objects = {
                labels: { show: true, labelDisplayUnits: 1000, labelPrecision: 0 }
            };

            var dataView: powerbi.DataView = {
                metadata: dataViewMetadataWithLabelsObject,
                categorical: {
                    categories: [{
                        source: dataViewMetadataWithLabelsObject.columns[0],
                        values: ['John Domo', 'Delta Force', 'Mr Bing'],
                        identity: categoryIdentities,
                        identityFields: [categoryColumnRef],
                    }],
                    values: DataViewTransform.createValueColumns([{
                        source: dataViewMetadataWithLabelsObject.columns[1],
                        values: [1555, 2000, 20],
                        subtotal: 3575
                    }])
                }
            };
            v.onDataChanged({ dataViews: [dataView] });
            setTimeout(() => {
                // Commented because TSLINT throws exception on this var: unused variable: 'labels'
                //var labels = $('.funnelChart .labels text');
                expect($('.funnelChart .labels text').first().text()).toBe('$2K');
                done();
            }, DefaultWaitForRender);
        });

        it('labels should support display units with precision', (done) => {
            var categoryIdentities = [
                mocks.dataViewScopeIdentity("John Domo"),
                mocks.dataViewScopeIdentity("Delta Force"),
                mocks.dataViewScopeIdentity("Mr Bing"),
            ];
            var dataViewMetadataWithLabelsObject = powerbi.Prototype.inherit(dataViewMetadata);
            dataViewMetadataWithLabelsObject.objects = {
                labels: { show: true, labelDisplayUnits: 1000, labelPrecision: 2 }
            };

            var dataView: powerbi.DataView = {
                metadata: dataViewMetadataWithLabelsObject,
                categorical: {
                    categories: [{
                        source: dataViewMetadataWithLabelsObject.columns[0],
                        values: ['John Domo', 'Delta Force', 'Mr Bing'],
                        identity: categoryIdentities,
                        identityFields: [categoryColumnRef],
                    }],
                    values: DataViewTransform.createValueColumns([{
                        source: dataViewMetadataWithLabelsObject.columns[1],
                        values: [1555, 2000, 20],
                        subtotal: 3575
                    }])
                }
            };
            v.onDataChanged({ dataViews: [dataView] });
            setTimeout(() => {
                // Commented because TSLINT throws exception on this var: unused variable: 'labels'
                //var labels = $('.funnelChart .labels text');
                expect($('.funnelChart .labels text').first().text()).toBe('$1.56K');
                done();
            }, DefaultWaitForRender);
        });
    });

    describe("funnel chart web animation", () => {
        var v: powerbi.IVisual, element: JQuery;
        var dataViewMetadata: powerbi.DataViewMetadata = {
            columns: [
                { displayName: 'col1' },
                { displayName: 'col2' },
                { displayName: 'col3' }
            ]
        };
        var categoryColumnRef = powerbi.data.SQExprBuilder.fieldDef({ schema: 's', entity: 'e', column: 'col1' });

        beforeEach(() => {
            element = powerbitests.helpers.testDom('500', '500');
            v = powerbi.visuals.visualPluginFactory.createMinerva({}).getPlugin('funnel').create();
            v.init({
                element: element,
                host: powerbitests.mocks.createVisualHostServices(),
                style: powerbi.visuals.visualStyles.create(),
                viewport: {
                    height: element.height(),
                    width: element.width()
                },
                animation: { transitionImmediate: true }
            });
        });

        it('funnel highlight animation', (done) => {
            var categoryIdentities = [
                mocks.dataViewScopeIdentity("John Domo"),
                mocks.dataViewScopeIdentity("Delta Force"),
                mocks.dataViewScopeIdentity("Jean Tablau"),
            ];
            var dataViewNoHighlights: powerbi.DataView = {
                metadata: dataViewMetadata,
                categorical: {
                    categories: [{
                        source: dataViewMetadata.columns[0],
                        values: ['John Domo', 'Delta Force', 'Jean Tablau'],
                        identity: categoryIdentities,
                        identityFields: [categoryColumnRef],
                    }],
                    values: DataViewTransform.createValueColumns([{
                        source: dataViewMetadata.columns[1],
                        values: [100, 200, 700],
                        subtotal: 1000
                    }])
                }
            };
            var dataViewHighlightsA: powerbi.DataView = {
                metadata: dataViewMetadata,
                categorical: {
                    categories: [{
                        source: dataViewMetadata.columns[0],
                        values: ['John Domo', 'Delta Force', 'Jean Tablau'],
                        identity: categoryIdentities,
                        identityFields: [categoryColumnRef],
                    }],
                    values: DataViewTransform.createValueColumns([{
                        source: dataViewMetadata.columns[1],
                        values: [100, 200, 700],
                        highlights: [50, 140, 420],
                        subtotal: 1000
                    }])
                }
            };
            var dataViewHighlightsB: powerbi.DataView = {
                metadata: dataViewMetadata,
                categorical: {
                    categories: [{
                        source: dataViewMetadata.columns[0],
                        values: ['John Domo', 'Delta Force', 'Jean Tablau'],
                        identity: categoryIdentities,
                        identityFields: [categoryColumnRef],
                    }],
                    values: DataViewTransform.createValueColumns([{
                        source: dataViewMetadata.columns[1],
                        values: [100, 200, 700],
                        highlights: [75, 40, 220],
                        subtotal: 1000
                    }])
                }
            };

            var animator = <powerbi.visuals.WebFunnelAnimator>(<FunnelChart>v).animator;
            spyOn(animator, 'animate').and.callThrough();

            v.onDataChanged({ dataViews: [dataViewNoHighlights] });
            v.onDataChanged({ dataViews: [dataViewHighlightsA] });
            v.onDataChanged({ dataViews: [dataViewHighlightsB] });
            v.onDataChanged({ dataViews: [dataViewNoHighlights] });

            expect(animator).toBeTruthy();
            expect(animator.animate).toHaveBeenCalled();

            done();
        });

        it('funnel highlight animation - percent bars', (done) => {
            var categoryIdentities = [
                mocks.dataViewScopeIdentity("John Domo"),
                mocks.dataViewScopeIdentity("Delta Force"),
                mocks.dataViewScopeIdentity("Jean Tablau"),
            ];
            var dataViewNoHighlights: powerbi.DataView = {
                metadata: dataViewMetadata,
                categorical: {
                    categories: [{
                        source: dataViewMetadata.columns[0],
                        values: ['John Domo', 'Delta Force', 'Jean Tablau'],
                        identity: categoryIdentities,
                        identityFields: [categoryColumnRef],
                    }],
                    values: DataViewTransform.createValueColumns([{
                        source: dataViewMetadata.columns[1],
                        values: [100, 200, 700],
                        subtotal: 1000
                    }])
                }
            };
            var dataViewHighlightsA: powerbi.DataView = {
                metadata: dataViewMetadata,
                categorical: {
                    categories: [{
                        source: dataViewMetadata.columns[0],
                        values: ['John Domo', 'Delta Force', 'Jean Tablau'],
                        identity: categoryIdentities,
                        identityFields: [categoryColumnRef],
                    }],
                    values: DataViewTransform.createValueColumns([{
                        source: dataViewMetadata.columns[1],
                        values: [100, 200, 700],
                        highlights: [50, 140, 420],
                        subtotal: 1000
                    }])
                }
            };
            var dataViewHighlightsB: powerbi.DataView = {
                metadata: dataViewMetadata,
                categorical: {
                    categories: [{
                        source: dataViewMetadata.columns[0],
                        values: ['John Domo', 'Delta Force', 'Jean Tablau'],
                        identity: categoryIdentities,
                        identityFields: [categoryColumnRef],
                    }],
                    values: DataViewTransform.createValueColumns([{
                        source: dataViewMetadata.columns[1],
                        values: [100, 200, 700],
                        highlights: [75, 40, 220],
                        subtotal: 1000
                    }])
                }
            };

            var animator = <powerbi.visuals.WebFunnelAnimator>(<FunnelChart>v).animator;
            expect(animator).toBeTruthy();

            var animatorSpy: jasmine.Spy = spyOn(animator, 'animate');
            animatorSpy.and.callThrough();

            v.onDataChanged({ dataViews: [dataViewNoHighlights] });
            expect(animator.animate).toHaveBeenCalled();

            setTimeout(() => {
                FunnelChartHelpers.validatePercentBars(true, dataViewNoHighlights);
                v.onDataChanged({ dataViews: [dataViewHighlightsA] });
                setTimeout(() => {
                    FunnelChartHelpers.validatePercentBars(true, dataViewHighlightsA);
                    v.onDataChanged({ dataViews: [dataViewHighlightsB] });
                    setTimeout(() => {
                        FunnelChartHelpers.validatePercentBars(true, dataViewHighlightsB);
                        v.onDataChanged({ dataViews: [dataViewNoHighlights] });
                        setTimeout(() => {
                            FunnelChartHelpers.validatePercentBars(true, dataViewNoHighlights);
                            expect(animator.animate).toHaveBeenCalled();
                            expect(animatorSpy.calls.count()).toBe(4);

                            done();
                        }, DefaultWaitForRender);
                    }, DefaultWaitForRender);
                }, DefaultWaitForRender);
            }, DefaultWaitForRender);
        });

        it('funnel highlight animation - suppressAnimations', (done) => {
            var categoryIdentities = [
                mocks.dataViewScopeIdentity("John Domo"),
                mocks.dataViewScopeIdentity("Delta Force"),
                mocks.dataViewScopeIdentity("Jean Tablau"),
            ];
            var dataViewNoHighlights: powerbi.DataView = {
                metadata: dataViewMetadata,
                categorical: {
                    categories: [{
                        source: dataViewMetadata.columns[0],
                        values: ['John Domo', 'Delta Force', 'Jean Tablau'],
                        identity: categoryIdentities,
                        identityFields: [categoryColumnRef],
                    }],
                    values: DataViewTransform.createValueColumns([{
                        source: dataViewMetadata.columns[1],
                        values: [100, 200, 700],
                        subtotal: 1000
                    }])
                }
            };
            var dataViewHighlightsA: powerbi.DataView = {
                metadata: dataViewMetadata,
                categorical: {
                    categories: [{
                        source: dataViewMetadata.columns[0],
                        values: ['John Domo', 'Delta Force', 'Jean Tablau'],
                        identity: categoryIdentities,
                        identityFields: [categoryColumnRef],
                    }],
                    values: DataViewTransform.createValueColumns([{
                        source: dataViewMetadata.columns[1],
                        values: [100, 200, 700],
                        highlights: [50, 140, 420],
                        subtotal: 1000
                    }])
                }
            };
            var dataViewHighlightsB: powerbi.DataView = {
                metadata: dataViewMetadata,
                categorical: {
                    categories: [{
                        source: dataViewMetadata.columns[0],
                        values: ['John Domo', 'Delta Force', 'Jean Tablau'],
                        identity: categoryIdentities,
                        identityFields: [categoryColumnRef],
                    }],
                    values: DataViewTransform.createValueColumns([{
                        source: dataViewMetadata.columns[1],
                        values: [100, 200, 700],
                        highlights: [75, 40, 220],
                        subtotal: 1000
                    }])
                }
            };

            var animator = <powerbi.visuals.WebFunnelAnimator>(<FunnelChart>v).animator;
            spyOn(animator, 'animate').and.callThrough();

            v.onDataChanged({ suppressAnimations: true, dataViews: [dataViewNoHighlights] });
            v.onDataChanged({ suppressAnimations: true, dataViews: [dataViewHighlightsA] });
            v.onDataChanged({ suppressAnimations: true, dataViews: [dataViewHighlightsB] });
            v.onDataChanged({ suppressAnimations: true, dataViews: [dataViewNoHighlights] });

            expect(animator).toBeTruthy();
            expect(animator.animate).not.toHaveBeenCalled();

            done();
        });

        it('funnel highlight animation - small viewport forcing small bars also hides category and data labels',(done) => {
            var categoryIdentities = [
                mocks.dataViewScopeIdentity("John Domo"),
                mocks.dataViewScopeIdentity("Delta Force"),
                mocks.dataViewScopeIdentity("Jean Tablau"),
                mocks.dataViewScopeIdentity('Bugs Bunny'),
                mocks.dataViewScopeIdentity('Mickey Mouse'),
                mocks.dataViewScopeIdentity('Donald Duck'),
                mocks.dataViewScopeIdentity('VRM Jones'),
            ];

            var dataViewHighlights: powerbi.DataView = {
                metadata: dataViewMetadata,
                categorical: {
                    categories: [{
                        source: dataViewMetadata.columns[0],
                        values: ['John Domo', 'Delta Force', 'Jean Tablau', 'Bugs Bunny', 'Mickey Mouse', 'Donald Duck', 'VRM Jones'],
                        identity: categoryIdentities,
                        identityFields: [categoryColumnRef],
                    }],
                    values: DataViewTransform.createValueColumns([{
                        source: dataViewMetadata.columns[1],
                        values: [100, 200, 300, 400, 500, 600, 700],
                        highlights: [50, 140, 220, 386, 418, 563, 610],
                        subtotal: 2800
                    }])
                }
            };

            var animator = <powerbi.visuals.WebFunnelAnimator>(<FunnelChart>v).animator;
            spyOn(animator, 'animate').and.callThrough();

            v.onDataChanged({ dataViews: [dataViewHighlights] });

            expect(animator).toBeTruthy();
            expect(animator.animate).toHaveBeenCalled();

            setTimeout(() => {
                FunnelChartHelpers.validatePercentBars(true, dataViewHighlights);
                expect($('.funnelChart g').length).toBe(11);
                expect($('.funnelChart .axis').find('text').length).toBe(7);
                expect($('.funnelChart .labels text').length).toBe(7);
                v.onResizing({ height: 50, width: 100 });
                setTimeout(() => {
                    FunnelChartHelpers.validatePercentBars(false, dataViewHighlights);
                    expect($('.funnelChart g').length).toBe(3); // No 'g' for data labels
                    expect($('.funnelChart .axis').find('text').length).toBe(0);
                    expect($('.funnelChart .labels text').length).toBe(0);
                    done();
                }, DefaultWaitForRender);
            }, DefaultWaitForRender);
        });
    });

    describe("Enumerate Objects", () => {
        var visual: powerbi.IVisual, element: JQuery;
        var dataViewMetadata: powerbi.DataViewMetadata = {
            columns: [
                {
                    displayName: 'col1',
                    queryName: 'col1',
                    type: ValueType.fromPrimitiveTypeAndCategory(PrimitiveType.Text)
                },
                {
                    displayName: 'col2',
                    queryName: 'col2',
                    type: ValueType.fromPrimitiveTypeAndCategory(PrimitiveType.Double),
                    isMeasure: true
                },
                {
                    displayName: 'col3',
                    queryName: 'col3',
                    type: ValueType.fromPrimitiveTypeAndCategory(PrimitiveType.Double),
                    isMeasure: true
                }
            ]
        };
        var categoryColumnRef = powerbi.data.SQExprBuilder.fieldDef({ schema: 's', entity: 'e', column: 'col1' });

        beforeEach(() => {
            element = powerbitests.helpers.testDom('500', '500');
            visual = powerbi.visuals.visualPluginFactory.create().getPlugin('funnel').create();

            visual.init({
                element: element,
                host: powerbitests.mocks.createVisualHostServices(),
                style: powerbi.visuals.visualStyles.create(),
                viewport: {
                    height: element.height(),
                    width: element.width()
                },
                animation: { transitionImmediate: true }
            });
        });

        it('Check enumeration: category measure', () => {
            var categoryIdentities = [
                mocks.dataViewScopeIdentity("a"),
                mocks.dataViewScopeIdentity("b"),
                mocks.dataViewScopeIdentity("c"),
            ];
            var dataChangedOptions = {
                dataViews: [{
                    metadata: dataViewMetadata,
                    categorical: {
                        categories: [{
                            source: dataViewMetadata.columns[0],
                            values: ['a', 'b', 'c'],
                            identity: categoryIdentities,
                            identityFields: [categoryColumnRef],
                        }],
                        values: DataViewTransform.createValueColumns([
                            {
                                source: dataViewMetadata.columns[1],
                                values: [100, 200, 300, 400, 500]
                            }, {
                                source: dataViewMetadata.columns[2],
                                values: [200, 400, 600, 800, 1000]
                            }])
                    }
                }]
            };

            visual.onDataChanged(dataChangedOptions);
            var points = visual.enumerateObjectInstances({ objectName: 'dataPoint' });
            expect(points.length).toBe(4);
            expect(points[1].displayName).toBe('a');
            expect(points[1].properties['fill']).toBeDefined();
            expect(points[2].displayName).toBe('b');
            expect(points[2].properties['fill']).toBeDefined();
        });

        it('Check enumeration: multi-measure',() => {
            var dataChangedOptions = {
                dataViews: [{
                    metadata: dataViewMetadata,
                    categorical: {
                        values: DataViewTransform.createValueColumns([
                            {
                                source: dataViewMetadata.columns[1],
                                values: [100]
                            }, {
                                source: dataViewMetadata.columns[2],
                                values: [200]
                            }])
                    }
                }]
            };

            visual.onDataChanged(dataChangedOptions);
            var points = visual.enumerateObjectInstances({ objectName: 'dataPoint' });
            expect(points.length).toBe(3);
            expect(points[1].displayName).toBe('col2');
            expect(points[1].properties['fill']).toBeDefined();
            expect(points[2].displayName).toBe('col3');
            expect(points[2].properties['fill']).toBeDefined();
        });

        it('enumerateObjectInstances - Gradient color',() => {
            var dataColors = powerbi.visuals.visualStyles.create().colorPalette.dataColors;

            var dataViewGradientMetadata: powerbi.DataViewMetadata = {
                columns: [
                    { displayName: 'col1', queryName: 'col1' },
                    { displayName: 'col2', queryName: 'col2', isMeasure: true },
                    { displayName: 'col3', queryName: 'col3', isMeasure: true, roles: { 'Gradient': true } }
                ]
            };

            var colors = ["#d9f2fb", "#ff557f", "#b1eab7"];
            var objectDefinitions: powerbi.DataViewObjects[] = [
                { dataPoint: { fill: { solid: { color: colors[0] } } } },
                { dataPoint: { fill: { solid: { color: colors[1] } } } },
                { dataPoint: { fill: { solid: { color: colors[2] } } } }
            ];

            var dataView = {
                metadata: dataViewGradientMetadata,
                categorical: {
                    categories: [{
                        source: dataViewGradientMetadata.columns[0],
                        values: ['a', 'b', 'c'],
                        objects: objectDefinitions
                    }],
                    values: DataViewTransform.createValueColumns([
                        {
                            source: dataViewGradientMetadata.columns[1],
                            values: [100, 200, 300, 400, 500]
                        }, {
                            source: dataViewGradientMetadata.columns[2],
                            values: [200, 400, 600, 800, 1000]
                        }])
                }
            };

            var defaultDataPointColor = "#00FF00";
            
            var actualData = FunnelChart.converter(dataView, dataColors, defaultDataPointColor);

            expect(actualData.slices[0].color).toBe(colors[0]);
            expect(actualData.slices[1].color).toBe(colors[1]);
            expect(actualData.slices[2].color).toBe(colors[2]);
        });
    });

    describe('funnel categoryLabels tests',() => {

        it('funnel categoryLabels test with view port categoryLabelsVisibleSmallerThanMinHeight mobile',(done) => {
            FunnelChartHelpers.testCategoryLabels(categoryLabelsVisibleSmallerThanMinHeightString, true);

            setTimeout(() => {
                expect($('.funnelChart .axis').find('text').length).toBe(0);
                done();

            });
        });

        it('funnel categoryLabels test with view port categoryLabelsVisibleGreaterThanDefaultMinHeight mobile',(done) => {
            FunnelChartHelpers.testCategoryLabels(categoryLabelsVisibleGreaterThanMinHeightString, true);

            setTimeout(() => {
                expect($('.funnelChart .axis').find('text').length).toBe(3);
                done();

            });
        });

        it('funnel categoryLabels test with view port categoryLabelsVisibleSmallerThanDefaultMinHeight',(done) => {
            FunnelChartHelpers.testCategoryLabels(categoryLabelsVisibleSmallerThanMinHeightString, false);

            setTimeout(() => {
                expect($('.funnelChart .axis').find('text').length).toBe(3);
                done();

            });
        });

        it('funnel categoryLabels test with view port categoryLabelsVisibleGreaterThanDefaultMinHeight',(done) => {
            FunnelChartHelpers.testCategoryLabels(categoryLabelsVisibleGreaterThanMinHeightString, false);

            setTimeout(() => {
                expect($('.funnelChart .axis').find('text').length).toBe(3);
                done();

            });
        });
    });

    export module FunnelChartHelpers {

        function validatePercentValues(dataView: powerbi.DataView): void {
            var values = dataView.categorical.values[0].values;
            var highlights = dataView.categorical.values[0].highlights;
            var hasHighlights = !!highlights;
            
            var topPercent = $(FunnelChart.Selectors.percentBar.text.selector)[0].textContent;
            var bottomPercent = $(FunnelChart.Selectors.percentBar.text.selector)[1].textContent;

            [topPercent, bottomPercent].map((percent: string) => {
                var validFormat = !!percent.match(this.PercentBarValueFormatRegex);
                expect(validFormat).toBeTruthy();

                var bottomPercentValue = hasHighlights
                    ? highlights[highlights.length - 1] / highlights[0]
                    : values[values.length - 1] / values[0];
                var bottomPercentText = powerbi.formattingService.formatValue(bottomPercentValue, powerbi.visuals.valueFormatter.getLocalizedString("Percentage1"));

                expect(topPercent).toBe("100%");
                expect(bottomPercent).toBe(bottomPercentText);
            });
        }

        function validatePercentBarComponents(shown: boolean): void {
            var count = shown ? 2 : 0;
            
            expect($(FunnelChart.Selectors.percentBar.mainLine.selector).length).toBe(count);
            expect($(FunnelChart.Selectors.percentBar.leftTick.selector).length).toBe(count);
            expect($(FunnelChart.Selectors.percentBar.rightTick.selector).length).toBe(count);
            expect($(FunnelChart.Selectors.percentBar.text.selector).length).toBe(count);
        }

        export function validatePercentBars(shown: boolean, dataView: powerbi.DataView): void {
            validatePercentBarComponents(shown);

            if (shown) {
                validatePercentValues(dataView);
            }
        }

        export function testCategoryLabels(domSizeString: string, isMobile: boolean) {
            var v: powerbi.IVisual, element: JQuery;
            element = powerbitests.helpers.testDom(domSizeString, domSizeString);
            if (isMobile) {
                v = powerbi.visuals.visualPluginFactory.createMobile().getPlugin('funnel').create();
            } else {
                v = powerbi.visuals.visualPluginFactory.create().getPlugin('funnel').create();
            }
            v.init({
                element: element,
                host: mocks.createVisualHostServices(),
                style: powerbi.visuals.visualStyles.create(),
                viewport: {
                    height: element.height(),
                    width: element.width()
                },
                animation: { transitionImmediate: true }
            });
            var categoryIdentities = [
                mocks.dataViewScopeIdentity("John Domo"),
                mocks.dataViewScopeIdentity("Delta Force"),
                mocks.dataViewScopeIdentity("Jean Tablau"),
            ];
            var dataViewMetadata: powerbi.DataViewMetadata = {
                columns: [
                    { displayName: 'col1', queryName: 'col1' },
                    { displayName: 'col2', queryName: 'col2', isMeasure: true },
                ]
            };
            var dataView: powerbi.DataView = {
                metadata: dataViewMetadata,
                categorical: {
                    categories: [{
                        source: dataViewMetadata.columns[0],
                        values: ['John Domo', 'Delta Force', 'Jean Tablau'],
                        identity: categoryIdentities,
                    }],
                    values: DataViewTransform.createValueColumns([{
                        source: dataViewMetadata.columns[1],
                        values: [100, 200, 700],
                    }])
                }
            };

            v.onDataChanged({ dataViews: [dataView] });
        }
    }
}