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

module powerbitests {
    import TextProperties = powerbi.TextProperties;
    import TextMeasurementService = powerbi.TextMeasurementService;

    describe("Text measurement service", () => {
        it("measureSvgTextWidth", () => {
            var getTextWidth = (fontSize: number) => {
                var textProperties: TextProperties = {
                    fontFamily: "Arial",
                    fontSize: fontSize + "px",
                    text: "PowerBI rocks!",
                };

                return TextMeasurementService.measureSvgTextWidth(textProperties);
            };

            expect(getTextWidth(10)).toBeLessThan(getTextWidth(12));
        });

        it("estimateSvgTextHeight", () => {
            var getTextHeight = (fontSize: number) => {
                var textProperties: TextProperties = {
                    fontFamily: "Arial",
                    fontSize: fontSize + "px",
                    text: "PowerBI rocks!",
                };

                return TextMeasurementService.estimateSvgTextHeight(textProperties);
            };

            expect(getTextHeight(10)).toBeLessThan(getTextHeight(12));
        });

        it("measureSvgTextHeight", () => {
            var getTextHeight = (fontSize: number) => {
                var textProperties: TextProperties = {
                    fontFamily: "Arial",
                    fontSize: fontSize + "px",
                    text: "PowerBI rocks!",
                };
                return TextMeasurementService.measureSvgTextHeight(textProperties);
            };

            expect(getTextHeight(10)).toBeLessThan(getTextHeight(12));
        });

        it("getMeasurementProperties", () => {
            var element = $("<text>")
                .text("PowerBI rocks!")
                .css({
                    "font-family": "Arial",
                    "font-size": "11px",
                    "font-weight": "bold",
                    "font-style": "italic",
                    "white-space": "nowrap",
                });
            attachToDom(element);

            var properties = TextMeasurementService.getMeasurementProperties(element);
            var expectedProperties: TextProperties = {
                fontFamily: "Arial",
                fontSize: "11px",
                fontWeight: "bold",
                fontStyle: "italic",
                whiteSpace: "nowrap",
                text: "PowerBI rocks!",
            };

            expect(properties).toEqual(expectedProperties);
        });

        it("getSvgMeasurementProperties", () => {
            var svg = $("<svg>");
            var element = $("<text>")
                .text("PowerBI rocks!")
                .css({
                    "font-family": "Arial",
                    "font-size": "11px",
                    "font-weight": "bold",
                    "font-style": "italic",
                    "white-space": "nowrap",
                });
            svg.append(element);
            attachToDom(svg);

            var properties = TextMeasurementService.getSvgMeasurementProperties(<any>element[0]);
            var expectedProperties: TextProperties = {
                fontFamily: "Arial",
                fontSize: "11px",
                fontWeight: "bold",
                fontStyle: "italic",
                whiteSpace: "nowrap",
                text: "PowerBI rocks!",
            };

            expect(properties).toEqual(expectedProperties);
        });

        it("getTailoredTextOrDefault without ellipses", () => {
            var properties: TextProperties = {
                fontFamily: "Arial",
                fontSize: "11px",
                fontWeight: "bold",
                fontStyle: "italic",
                whiteSpace: "nowrap",
                text: "PowerBI rocks!",
            };

            var text = TextMeasurementService.getTailoredTextOrDefault(properties, 100);

            expect(text).toEqual("PowerBI rocks!");
        });

        it("getTailoredTextOrDefault with ellipses", () => {
            var properties: TextProperties = {
                fontFamily: "Arial",
                fontSize: "11px",
                fontWeight: "bold",
                fontStyle: "italic",
                whiteSpace: "nowrap",
                text: "PowerBI rocks!",
            };

            var text = TextMeasurementService.getTailoredTextOrDefault(properties, 20);

            expect(jsCommon.StringExtensions.endsWith(text, "...")).toBeTruthy();
        });

        it("svgEllipsis with ellipses", () => {           

            var element = createSvgTextElement("PowerBI rocks!");
            attachToDom(element);

            TextMeasurementService.svgEllipsis(<any>element[0], 20);

            var text = $(element).text();
            expect(jsCommon.StringExtensions.endsWith(text, "...")).toBeTruthy();
        });

        it("svgEllipsis without ellipses", () => {           

            var element = createSvgTextElement("PowerBI rocks!");
            attachToDom(element);

            TextMeasurementService.svgEllipsis(<any>element[0], 100);

            var text = $(element).text();
            expect(text).toEqual("PowerBI rocks!");
        });

        function attachToDom(element: JQuery|Element): JQuery {
            var dom = powerbitests.helpers.testDom('100px', '100px');
            dom.append([element]);
            return dom;
        }

        function createSvgTextElement(text: string): SVGTextElement {
            var svg = $("<svg>");
            var element = d3.select($("<text>").get(0)).text(text);
            svg.append(element);

            return element[0];
        }
    });
}