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
    import ImageVisual = powerbi.visuals.ImageVisual;

    describe("ImageVisual", () => {
        var imageVisualDataBuilder: ImageVisualDataBuilder;

        beforeEach(() => {
            imageVisualDataBuilder = new ImageVisualDataBuilder();
        });

        it("ImageVisual registered capabilities", () => {
            expect(powerbi.visuals.visualPluginFactory.create().getPlugin("image").capabilities).toBe(ImageVisual.capabilities);
        });

        it("ImageVisual registered capabilities: objects", () => {
            expect(powerbi.visuals.visualPluginFactory.create().getPlugin("image").capabilities.objects).toBeDefined();
        });

        it("Image no visual configuration", () => {
            expect(imageVisualDataBuilder.element.children().length).toBe(0);
        });

        it("Image to about:blank", () => {
            imageVisualDataBuilder.imageUrl = "about:blank";
            imageVisualDataBuilder.onDataChanged();

            //invalid image data url
            expect(imageVisualDataBuilder.element.find(".imageBackground").css("backgroundImage")).toBe("none");
        });

        it("Image from base64 string", () => {
            var imageBase64value =
                "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAAkFBMVEX" +
                "////+/v78+/vz8e/29PLr5+Tw7etwWEdbPyzTy8Tj3trn4t78+/mTgHOsnZLCt69PMRzX0cvJwLml" +
                "lYm1qJ53YE8zEQBsUj9QMR68sKZHKRREJA+aiHx+aViGcF7q5t6NeWpkSDafjoAvCwA4FgC4rKSnm" +
                "JE+HAaKdWhVOCeHeG1TPi5jT0BxX1J5aFtlSznQd83pAAACIklEQVQYGZXBiVraQBiG0ff7s8BMQs" +
                "JkEaNsalspXbj/u2us1Scg7TM9B64R/0X8H6FMxBPu53ePiCS6bz/qkljCfatK4hnHIxjRjPURiWj" +
                "Cf69AIpYIP44eRCxRdj/bBBFLkHZHh4glQbYOiGgykgoRT2QDIprIhxwRr3AJ8VTuChDvJPFPZQri" +
                "jQyQuE6vTC94IUiLHMRHMnFGQmSHu+f7vkBckIDcN0PXfR7qJmR5Caj4+mnR1LN5InFGENrDYVHVL" +
                "viiKIJzIWQp65uG0anCmBKu7ytvTCjNdmVwmJWqDogJEU4NIzPTG0YlCEzdAjFhDPOMP/QbryTAWF" +
                "cYE4L262lfucx4l7jq0CFAtvGICeGTpN6v5svl/DTrN5t+9rB8/vR0WyMw6kfElHiYMUp8XS22/Wx" +
                "1WvWbRRXESOT7RGJKrOYmE5cEIm094oxY32cISTaSkMxMYpQOHnHOcDcO443Eu9TliAtSulxjXFHu" +
                "SsQHxn4ucYVAfCT8vZOIV3KYYUSznfLlgBFHZBk0S09JFOEzjM8PASQuyMQFEQpkNLPOQBITxjVJj" +
                "WTkj4s6Y0oi/eIQ54QbwAzyuhtclpa8kAT17VODuCCaKgczIE2LXSnJDAj9022D+ECExy5jJEbiRV" +
                "r3N3ePCeIKoXq/HnzKq9R3m+XzvMpBXCWQa7f9ZrvdbvrV/O521gbAxN+IURKGqm3brvElIxP/ImN" +
                "CJi78AkZVGOZlPDldAAAAAElFTkSuQmCC";

            imageVisualDataBuilder.imageUrl = imageBase64value;
            imageVisualDataBuilder.onDataChanged();

            expect(imageVisualDataBuilder.element.find(".imageBackground").css("backgroundImage")).toBe("url(" + imageBase64value + ")");
        });
    });

    class ImageVisualDataBuilder {
        private _element: JQuery;

        public get element(): JQuery {
            return this._element;
        }

        private _hostService: powerbi.IVisualHostServices;

        private _style: powerbi.IVisualStyle;

        private _image: ImageVisual;

        public get image(): ImageVisual {
            return this._image;
        }

        private _imageUrl: string;

        public get imageUrl(): string {
            return this._imageUrl;
        }

        public set imageUrl(value: string) {
            this._imageUrl = value;
        }

        constructor() {
            this._element = powerbitests.helpers.testDom("200", "300");
            this._hostService = mocks.createVisualHostServices();
            this._style = powerbi.visuals.visualStyles.create();
            this._image = new ImageVisual();

            this.init();
        }

        private init() {
            this.image.init({
                element: this._element,
                host: this._hostService,
                style: this._style,
                viewport: {
                    height: this._element.height(),
                    width: this._element.width()
                },
                animation: {
                    transitionImmediate: true
                }
            });
        }

        public onDataChanged() {
            this.image.onDataChanged({
                dataViews: [{
                    metadata: {
                        columns: [],
                        objects: {
                            general: {
                                imageUrl: this.imageUrl
                            }
                        }
                    }
                }]
            });
        }
    }
}