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

/// <reference path="_references.ts"/>

interface JQuery {
    resizable(options: any): JQuery;
}

module powerbi.visuals {
    
    import SampleData = powerbi.visuals.sampleData.SampleData;

    export class HostControls {

        private visualElement: IVisual;
        private dataViewsSelect: JQuery;

        /** Represents sample data views used by visualization elements.*/
        private sampleDataViews;
        private animation_duration: number = 250;
        private suppressAnimations: boolean = true;

        private suppressAnimationsElement: JQuery;
        private animationDurationElement: JQuery;
        
        private viewport: IViewport;
        private container: JQuery;

        private minWidth: number = 200;
        private maxWidth: number = 1000;
        private minHeight: number = 100;
        private maxHeight: number = 600;

        constructor(parent: JQuery) {
            parent.find('#randomize').on('click', () => this.randomize());

            this.dataViewsSelect = parent.find('#dataViewsSelect').first();

            this.suppressAnimationsElement = parent.find('input[name=suppressAnimations]').first();
            this.suppressAnimationsElement.on('change', () => this.onChangeSuppressAnimations());
            
            this.animationDurationElement = parent.find('input[name=animation_duration]').first();
            this.animationDurationElement.on('change', () => this.onChangeDuration());
        }

        public setElement(container: JQuery): void {
            this.container = container;

            this.container.resizable({
                minWidth: this.minWidth,
                maxWidth: this.maxWidth,
                minHeight: this.minHeight,
                maxHeight: this.maxHeight,

                resize: (event, ui) => this.onResize(ui.size)
            });

            this.onResize({
                height: this.container.height(),
                width: this.container.width()
            });
        }
        
        public setVisual(visualElement: IVisual): void {
            this.visualElement = visualElement;
        }

        private onResize(size: IViewport): void {
            this.viewport = {
                height: size.height - 20,
                width: size.width - 20,
            };

            if (this.visualElement) {
                if (this.visualElement.update) {
                    this.visualElement.update({
                        dataViews: this.sampleDataViews.getDataViews(),
                        suppressAnimations: true,
                        viewport: this.viewport
                    });
                } else if (this.visualElement.onResizing){
                    this.visualElement.onResizing(this.viewport);
                }
            }
        }

        public getViewport(): IViewport {
            return this.viewport;
        }

        private randomize(): void {
            this.sampleDataViews.randomize();
            this.update();
        }

        private onChangeDuration(): void {
            this.animation_duration = parseInt(this.animationDurationElement.val(), 10);
            this.update();
        }

        private onChangeSuppressAnimations(): void {
            this.suppressAnimations = !this.suppressAnimationsElement.is(':checked');
            this.update();
        }
                
        public update(): void {
            if (this.visualElement.update) {
                this.visualElement.update({
                    dataViews: this.sampleDataViews.getDataViews(),
                    suppressAnimations: this.suppressAnimations,
                    viewport: this.viewport
                });
            } else {
                this.visualElement.onDataChanged({
                    dataViews: this.sampleDataViews.getDataViews(),
                    suppressAnimations: this.suppressAnimations
                });

                this.visualElement.onResizing(this.viewport);
            }
        }

        public onPluginChange(pluginName: string): void {
            this.dataViewsSelect.empty();

            let dataViews = SampleData.getSamplesByPluginName(pluginName);
            let defaultDataView;

            dataViews.forEach((item, i) => {
                let option: JQuery = $('<option>');

                option.val(item.getName());
                option.text(item.getDisplayName());

                if (i === 0) {
                    option.attr('selected', 'selected');
                    defaultDataView = item.getName();
                }
                this.dataViewsSelect.append(option);
            });

            this.dataViewsSelect.change(() => this.onChangeDataViewSelection(this.dataViewsSelect.val()));

            if (defaultDataView) {
                this.onChangeDataViewSelection(defaultDataView);
            }
        }
        
        private onChangeDataViewSelection(sampleName: string): void {
            this.sampleDataViews = SampleData.getDataViewsBySampleName(sampleName);
            this.update();
        }

    }
}
