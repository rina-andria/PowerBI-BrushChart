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

module powerbi.visuals {
    import Utility = jsCommon.Utility;

    export var imageScalingType = {
        normal: "Normal",
        fit: "Fit",
        fill: "Fill"
    };

    export interface ImageDataViewObjects extends DataViewObjects {
        general: ImageDataViewObject;
        imageScaling: ImageScalingDataViewObject;
    }

    export interface ImageDataViewObject extends DataViewObject {
        imageUrl: string;
    }

    export interface ImageScalingDataViewObject extends DataViewObject {
        imageScalingType: string;
    }

    export class ImageVisual implements IVisual {

        private element: JQuery;
        private imageBackgroundElement: JQuery;
        private scalingType: string = imageScalingType.normal;

        public init(options: VisualInitOptions) {
            this.element = options.element;
        }

        public enumerateObjectInstances(options: EnumerateVisualObjectInstancesOptions): VisualObjectInstance[] {
            switch (options.objectName) {
                case 'imageScaling':
                    return this.enumerateImageScaling();
            }
            return null;
        }

        private enumerateImageScaling(): VisualObjectInstance[] {
            return [{
                selector: null,
                objectName: 'imageScaling',
                properties: {
                    imageScalingType: this.scalingType,
                }
            }];
        }

        public onDataChanged(options: VisualDataChangedOptions): void {
            var dataViews = options.dataViews;
            if (!dataViews || dataViews.length === 0)
                return;

            var objects = <ImageDataViewObjects>dataViews[0].metadata.objects;
            if (!objects || !objects.general)
                return;

            var div: JQuery = this.imageBackgroundElement;
            if (!div) {
                div = $("<div class='imageBackground' />");
                this.imageBackgroundElement = div;
                this.imageBackgroundElement.appendTo(this.element);
            }

            var imageUrl = objects.general.imageUrl;

            if (objects.imageScaling)
                this.scalingType = objects.imageScaling.imageScalingType.toString();
            else
                this.scalingType = imageScalingType.normal;

            if (Utility.isValidImageDataUrl(imageUrl))
                div.css("backgroundImage", "url(" + imageUrl + ")");

            if (this.scalingType === imageScalingType.fit)
                div.css("background-size", "100% 100%"); 
            else if (this.scalingType === imageScalingType.fill)
                div.css("background-size", "cover"); 
            else 
                div.css("background-size", "contain");
        }

        public onResizing(viewport: IViewport): void {
        }
    }
} 