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

module powerbitests {
    import DataViewObjectDescriptors = powerbi.data.DataViewObjectDescriptors;
    import DataViewTransform = powerbi.data.DataViewTransform;
    import ValueType = powerbi.ValueType;
    import PrimitiveType = powerbi.PrimitiveType;
    import IVisual = powerbi.IVisual;

    powerbitests.mocks.setLocale();

    describe("VisualFactory", () => {

        var dataViewMetadataTwoColumn: powerbi.DataViewMetadata = {
            columns: [
                {
                    displayName: "col1",
                    queryName: "col1",
                    type: ValueType.fromPrimitiveTypeAndCategory(PrimitiveType.Text)
                },
                {
                    displayName: "col2",
                    queryName: "col2",
                    isMeasure: true,
                    type: ValueType.fromPrimitiveTypeAndCategory(PrimitiveType.Double)
                }
            ],
        };

        var categoryColumnRef = powerbi.data.SQExprBuilder.fieldDef({ schema: "s", entity: "e", column: "col1" });

        function initVisual(v: powerbi.IVisual): void {
            var hostServices = powerbitests.mocks.createVisualHostServices();
            var element = powerbitests.helpers.testDom("500", "500");

            v.init({
                element: element,
                host: hostServices,
                style: powerbi.visuals.visualStyles.create(),
                viewport: {
                    height: element.height(),
                    width: element.width()
                },
                settings: undefined,
                interactivity: undefined,
                animation: undefined
            });
        }

        function setData(v: powerbi.IVisual, objectDescs: DataViewObjectDescriptors): void {
            // full
            changeData(v, objectDescs, [{
                metadata: dataViewMetadataTwoColumn,
                categorical: {
                    categories: [{
                        source: dataViewMetadataTwoColumn.columns[0],
                        values: ["abc", "def"],
                        identity: [mocks.dataViewScopeIdentity("abc"), mocks.dataViewScopeIdentity("def")],
                        identityFields: [categoryColumnRef]
                    }],
                    values: DataViewTransform.createValueColumns([
                        {
                            source: dataViewMetadataTwoColumn.columns[1],
                            min: 123,
                            max: 234,
                            subtotal: 357,
                            values: [123, 234]
                        }
                    ])
                }
            }]);

            // empty
            changeData(v, objectDescs, []);

            // no categorical
            changeData(v, objectDescs, [{
                metadata: dataViewMetadataTwoColumn,
                categorical: undefined
            }]);

            // no metadata
            changeData(v, objectDescs, [{
                metadata: undefined,
                categorical: {
                    categories: [],
                    values: undefined
                }
            }]);

            // no categorical.values
            changeData(v, objectDescs, [{
                metadata: dataViewMetadataTwoColumn,
                categorical: {
                    categories: [{
                        source: dataViewMetadataTwoColumn.columns[0],
                        values: ["abc", "def"],
                        identity: [mocks.dataViewScopeIdentity("abc"), mocks.dataViewScopeIdentity("def")],
                        identityFields: [categoryColumnRef]
                    }],
                    values: undefined
                }
            }]);

            // no categories
            changeData(v, objectDescs, [{
                metadata: dataViewMetadataTwoColumn,
                categorical: {
                    categories: undefined,
                    values: DataViewTransform.createValueColumns([
                        {
                            source: dataViewMetadataTwoColumn.columns[1],
                            min: 123,
                            max: 123,
                            subtotal: 123,
                            values: [123]
                        }
                    ])
                }
            }]);

            // no values.values
            changeData(v, objectDescs, [{
                metadata: dataViewMetadataTwoColumn,
                categorical: {
                    categories: [{
                        source: dataViewMetadataTwoColumn.columns[0],
                        values: ["abc", "def"],
                        identity: [mocks.dataViewScopeIdentity("abc"), mocks.dataViewScopeIdentity("def")],
                        identityFields: [categoryColumnRef]
                    }],
                    values: DataViewTransform.createValueColumns([
                        {
                            source: dataViewMetadataTwoColumn.columns[1],
                            values: []
                        }
                    ])
                }
            }]);

            // no categories.values
            changeData(v, objectDescs, [{
                metadata: dataViewMetadataTwoColumn,
                categorical: {
                    categories: [{
                        source: dataViewMetadataTwoColumn.columns[0],
                        values: [],
                        identityFields: [categoryColumnRef],
                    }],
                    values: DataViewTransform.createValueColumns([
                        {
                            source: dataViewMetadataTwoColumn.columns[1],
                            values: []
                        }
                    ])
                }
            }]);
        }

        function changeData(visual: IVisual, objectDescs: DataViewObjectDescriptors, dataViews: powerbi.DataView[]): void {
            if (visual.onDataChanged) {
                visual.onDataChanged({ dataViews: dataViews });
            } else if (visual.update) {
                visual.update({ dataViews: dataViews, viewport: { height: 100, width: 100 } });
            }

            if (visual.enumerateObjectInstances && objectDescs) {
                for (var objectName in objectDescs)
                    visual.enumerateObjectInstances({ objectName: objectName });
            }
        }

        it("VisualFactory.getVisuals - categorical - various dataViews", () => {
            var allVisuals = powerbi.visuals.visualPluginFactory.create().getVisuals();

            for (var i = 0; i < allVisuals.length; i++) {
                var exception = null,
                    visualPlugin: powerbi.IVisualPlugin = allVisuals[i];

                if (visualPlugin.name !== "categoricalFilter" &&
                    visualPlugin.name !== "consoleWriter" && 
                    visualPlugin.name !== "streamGraph" &&
                    visualPlugin.capabilities &&
                    visualPlugin.capabilities.dataViewMappings &&
                    visualPlugin.capabilities.dataViewMappings.length > 0 &&
                    visualPlugin.capabilities.dataViewMappings[0].categorical) {
                    var visual: powerbi.IVisual = visualPlugin.create();

                    try {
                        initVisual(visual);
                        setData(visual, visualPlugin.capabilities.objects);
                    } catch (e) {
                        exception = e;
                        debug.assertFail(visualPlugin.name + " : " + e.message);
                    } finally {
                        expect(exception).toBeNull();
                    }
                }
            }
        });
    });
}