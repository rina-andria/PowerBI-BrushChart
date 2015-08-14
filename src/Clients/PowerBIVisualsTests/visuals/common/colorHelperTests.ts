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
    import ColorHelper = powerbi.visuals.ColorHelper;
    import SQExprShortSerializer = powerbi.data.SQExprShortSerializer;

    describe("Color Helper", () => {
        var palette: powerbi.IDataColorPalette;

        var columnIdentity = powerbi.data.SQExprBuilder.fieldDef({ schema: "s", entity: "e", column: "sales" });
        var fillProp = <powerbi.DataViewObjectPropertyIdentifier>{ objectName: "dataPoint", propertyName: "fill" };

        var colors = [
            { value: "#000000" },
            { value: "#000001" },
            { value: "#000002" },
            { value: "#000003" }
        ];

        beforeEach(() => {
            palette = new powerbi.visuals.DataColorPalette(colors);
        });

        describe("getColorForSeriesValue", () => {

            it("should return fill property value if it exists", () => {
                var colorHelper = new ColorHelper(palette, fillProp, "defaultColor");

                var objects: powerbi.DataViewObjects = {
                    dataPoint: {
                        fill: { solid: { color: "red" } }
                    }
                };

                var color = colorHelper.getColorForSeriesValue(objects, [columnIdentity], "value");

                expect(color).toEqual("red");
            });

            it("should return default color if no fill property is defined", () => {
                var colorHelper = new ColorHelper(palette, fillProp, "defaultColor");

                var color = colorHelper.getColorForSeriesValue(/* no objects */ undefined, [columnIdentity], "value");

                expect(color).toEqual("defaultColor");
            });

            it("should return scale color if neither fill property nor default color is defined", () => {
                var colorHelper = new ColorHelper(palette, fillProp, /* no default color */ undefined);

                var color = colorHelper.getColorForSeriesValue(/* no objects */ undefined, [columnIdentity], "value");

                var expectedColor = palette.getColorScaleByKey(SQExprShortSerializer.serializeArray([columnIdentity])).getColor("value").value;
                expect(color).toEqual(expectedColor);
            });

            it("should handle undefined identity array", () => {
                var colorHelper = new ColorHelper(palette, fillProp);

                var color = colorHelper.getColorForSeriesValue(undefined, undefined, "value");

                var expectedColor = palette.getColorScaleByKey(SQExprShortSerializer.serializeArray([])).getColor("value").value;
                expect(color).toEqual(expectedColor);
            });

            it("should return the same color for the same series and value", () => {
                var colorHelper = new ColorHelper(palette, fillProp);

                var color1 = colorHelper.getColorForSeriesValue(null, [columnIdentity], "value");
                var color2 = colorHelper.getColorForSeriesValue(null, [columnIdentity], "value");

                expect(color1).toEqual(color2);
            });
        });

        describe("getColorForMeasure", () => {
            it("should return fill property value if it exists", () => {
                var colorHelper = new ColorHelper(palette, fillProp, "defaultColor");

                var objects: powerbi.DataViewObjects = {
                    dataPoint: {
                        fill: { solid: { color: "red" } }
                    }
                };

                var color = colorHelper.getColorForMeasure(objects, 0);

                expect(color).toEqual("red");
            });

            it("should return default color if no fill property is defined", () => {
                var colorHelper = new ColorHelper(palette, fillProp, "defaultColor");

                var color = colorHelper.getColorForMeasure(/* no objects */ undefined, 0);

                expect(color).toEqual("defaultColor");
            });

            it("should return scale color if neither fill property nor default color is defined", () => {
                var colorHelper = new ColorHelper(palette, fillProp, /* no default color */ undefined);

                var color = colorHelper.getColorForMeasure(undefined, 0);

                expect(color).toEqual(colors[0].value);
            });

            it("should return the nth color for the nth measure even if colors are explicitly set", () => {
                var colorHelper = new ColorHelper(palette, fillProp);

                var objects: powerbi.DataViewObjects = {
                    dataPoint: { fill: { solid: { color: "red" } } }
                };

                var color1 = colorHelper.getColorForMeasure(null, 0);
                var color2 = colorHelper.getColorForMeasure(objects, 1);
                var color3 = colorHelper.getColorForMeasure(null, 2);

                expect(color1).toEqual(colors[0].value);
                expect(color2).toEqual("red");
                expect(color3).toEqual(colors[2].value);
            });
        });
    });
} 