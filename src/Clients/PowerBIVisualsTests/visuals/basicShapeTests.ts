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
    import ColorConvertor = powerbitests.utils.ColorUtility.convertFromRGBorHexToHex;
    import BasicShapeVisual = powerbi.visuals.BasicShapeVisual;
    describe("basicShape Tests", () => {

        it('basicShape registered capabilities', () => {
            var json1 = powerbi.visuals.visualPluginFactory.create().getPlugin('basicShape').capabilities;
            var json2 = powerbi.visuals.basicShapeCapabilities;
            expect(json1.toString()).toBe(json2.toString());
        });

        it('basicShape registered capabilities: objects', () => {
            expect(powerbi.visuals.visualPluginFactory.create().getPlugin('basicShape').capabilities.objects).toBeDefined();
        });

        it('basicShape no visual configuration', () => {
            var element = powerbitests.helpers.testDom('200', '300');
            var options: powerbi.VisualInitOptions = {
                element: element,
                host: mocks.createVisualHostServices(),
                style: powerbi.visuals.visualStyles.create(),
                viewport: {
                    height: element.height(),
                    width: element.width()
                },
                animation: {
                    transitionImmediate: true
                }
            };

            var basicShape = new BasicShapeVisual();
            basicShape.init(options);

            expect(element.children().length).toBe(0);
        });

        it('Basic Shape DOM verification', () => {
            var element = powerbitests.helpers.testDom('200', '300');
            var options: powerbi.VisualInitOptions = {
                element: $(element[0]),
                host: mocks.createVisualHostServices(),
                style: powerbi.visuals.visualStyles.create(),
                viewport: {
                    height: element.height(),
                    width: element.width()
                },
                animation: {
                    transitionImmediate: true
                },
            };

            var basicShape = new BasicShapeVisual();
            basicShape.init(options);
            var visualDataChangedOption: powerbi.VisualDataChangedOptions = {
                dataViews: [{
                    metadata: {
                        columns: [],
                        objects: {
                            general: { shapeType: 'rectangle' },
                            line: { lineColor: { solid: { color: '#00b8ad' } }, transparency: 75, weight: 15 },
                            fill: { transparency: 65, fillColor: { solid: { color: '#e6e6e4' } } },
                        }
                    }
                }]
            };
            basicShape.onDataChanged(visualDataChangedOption);
            var rect = element.find('rect');

            //Verifying the DOM
            var stroke = rect.css('stroke');
            expect(ColorConvertor(stroke)).toBe(ColorConvertor("#00b8ad"));//lineColor
            expect(rect.css('stroke-opacity')).toBe("0.75"); //lineTransparency
            expect(rect.css('stroke-width')).toBe("15px"); //weight
            var fill = rect.css('fill');
            expect(ColorConvertor(fill)).toBe(ColorConvertor("#e6e6e4"));  //fillColor
            expect(rect.css('fill-opacity')).toBeCloseTo("0.65", 1); // fill transparency
        });
    });
}
