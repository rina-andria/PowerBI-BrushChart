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
    import AnimatedText = powerbi.visuals.AnimatedText;

    describe("AnimatedText", () => {
        var animatedText: AnimatedText;
        
        beforeEach(() => {
            animatedText = new AnimatedText("animatedText");
        });

        it("AnimatedText_getSeedFontHeight does not exceed style maximum", () => {
            animatedText.style = powerbi.visuals.visualStyles.create();

            expect(animatedText.getSeedFontHeight(100, 90)).toBeLessThan(100);
        });

        it("AnimatedText_getSeedFontHeight returns a smaller number than the height", () => {
            animatedText.style = powerbi.visuals.visualStyles.create();

            expect(animatedText.getSeedFontHeight(100, 90)).toBeLessThan(100);
        });

        it("AnimatedText_getTextAnchor when the aligment is 'left'", () => {
            animatedText.visualConfiguration = {
                align: "left"
            };
            expect(animatedText.getTextAnchor()).toBe("start");
        });

        it("AnimatedText_getTextAnchor when the aligment is 'right'", () => {
            animatedText.visualConfiguration = {
                align: "right"
            };
            expect(animatedText.getTextAnchor()).toBe("end");
        });

        it("AnimatedText_getTextAnchor when the aligment is undefined", () => {
            animatedText.visualConfiguration = undefined;
            expect(animatedText.getTextAnchor()).toBe("middle");

            animatedText.visualConfiguration = {
                align: "center"
            };
            expect(animatedText.getTextAnchor()).toBe("middle");
        });

        it("AnimatedText_getTranslateX alignment is 'left'", () => {
            animatedText.visualConfiguration = {
                align: "left"
            };
            expect(animatedText.getTranslateX(0)).toBe(0);
            expect(animatedText.getTranslateX(100)).toBe(0);
        });

        it("AnimatedText_getTranslateX alignment is 'right'", () => {
            animatedText.visualConfiguration = {
                align: "right"
            };
            expect(animatedText.getTranslateX(0)).toBe(0);
            expect(animatedText.getTranslateX(100)).toBe(100);
        });

        it("AnimatedText_getTranslateX when alignment is undefined, returns the center", () => {
            animatedText.visualConfiguration = undefined;
            expect(animatedText.getTranslateX(0)).toBe(0);
            expect(animatedText.getTranslateX(100)).toBe(50);
        });
    });

    describe("AnimatedText DOM tests", () => {
        var animatedTextBuilder: AnimatedTextBuilder;

        var animationOptions: powerbi.AnimationOptions = {
            transitionImmediate: true
        };

        beforeEach((done) => {
            animatedTextBuilder = 
                new AnimatedTextBuilder("200", "300", "animatedText", animationOptions);
            
            done();
        });

        it("AnimatedText_getAdjustedFontHeight when seed font width is bigger than the width", () => {
            // parameters are availableWidth, textToMeasure, seedFontHeight
            // When the measured text with the seed height is bigger than availableWidth, decrease the font height
            expect(animatedTextBuilder.animatedText.getAdjustedFontHeight(4, "text", 10)).toBeLessThan(10);
        });

        it("AnimatedText_getAdjustedFontHeight when seed font width is smaller or equal to the width", () => {
            // parameters are availableWidth, textToMeasure, seedFontHeight
            // When the measured text with the seed height is equal/smaller than availableWidth, return the font height
            expect(animatedTextBuilder.animatedText.getAdjustedFontHeight(30, "text", 3)).toBe(3);
        });

        it("AnimatedText doValueTransition sets text", (done) => {
            animatedTextBuilder.doValueTransition(3, 4);
            expect($(".animatedText")).toBeInDOM();
            expect($(".mainText")).toBeInDOM();
            setTimeout(() => {
                expect($(".mainText").text()).toEqual("4");
                done();
            }, DefaultWaitForRender);
        });

        it("AnimatedText doValueTransition formats number > 10000", (done) => {
            animatedTextBuilder.doValueTransition(3, 4534353);
            expect($(".animatedText")).toBeInDOM();
            expect($(".mainText")).toBeInDOM();
            setTimeout(() => {
                expect($(".mainText").text()).toEqual("4.53M");
                done();
            }, DefaultWaitForRender);
        });

        it("AnimatedText doValueTransition sets translateY correctly", (done) => {
            animatedTextBuilder.doValueTransition(3, 4);
            expect($(".animatedText")).toBeInDOM();
            expect($(".mainText")).toBeInDOM();
            setTimeout(() => {
                // IE and Chrome represent the transform differently
                expect($(".mainText").attr("transform")).toMatch(/translate\(\d+(,| )130\)/);
                done();
            }, DefaultWaitForRender);
        });

        it("AnimatedText doValueTransition to 0", (done) => {
            animatedTextBuilder.doValueTransition(null, 0);
            expect($(".animatedText")).toBeInDOM();
            expect($(".mainText")).toBeInDOM();
            setTimeout(() => {
                expect($(".mainText").text()).toEqual("0");
                done();
            }, DefaultWaitForRender);
        });

        it("AnimatedText doValueTransition to null", (done) => {
            animatedTextBuilder.doValueTransition(null, null);
            expect($(".animatedText")).toBeInDOM();
            expect($(".mainText")).toBeInDOM();
            setTimeout(() => {
                expect($(".mainText").text()).toEqual("(Blank)");
                done();
            }, DefaultWaitForRender);
        });
    });
    
    class AnimatedTextBuilder {
        private element: JQuery;
        
        private animationOptions: powerbi.AnimationOptions;
        
        private animatedTextVisual: AnimatedText;
        
        public get animatedText(): AnimatedText {
            return this.animatedTextVisual;
        }
        
        constructor(
            height: string, 
            width: string, 
            animatedTextName: string, 
            animationOptions: powerbi.AnimationOptions) {
                
            this.animationOptions = animationOptions;
            
            this.element = powerbitests.helpers.testDom(height, width);
            this.animatedTextVisual = new AnimatedText(animatedTextName);
            
            this.init();
        }
        
        private init(): void {
            this.animatedText.currentViewport = {
                height: this.element.height(),
                width: this.element.width()
            };
            
            this.animatedText.hostServices = powerbitests.mocks.createVisualHostServices();
            this.animatedText.svg = d3.select(this.element.get(0)).append("svg");
            this.animatedText.style = powerbi.visuals.visualStyles.create();
        }
        
        public doValueTransition(startValue: any, endValue: any): void {
            this.animatedText.doValueTransition(startValue, endValue, null, this.animationOptions, 0, false);
        }
    }
}