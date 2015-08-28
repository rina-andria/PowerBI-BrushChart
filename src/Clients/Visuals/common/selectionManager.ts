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

module powerbi.visuals{
    export interface SelectionManagerOptions{
        hostServices: IVisualHostServices;
    };

    export class SelectionManager {
        private selectors: powerbi.data.Selector[];
        private hostServices: IVisualHostServices;

        public constructor(options: SelectionManagerOptions) {
            this.hostServices = options.hostServices;
            this.selectors = [];
        }

        public select(selector: powerbi.data.Selector, multiSelect: boolean = false): JQueryDeferred<data.Selector[]> {
            var defered: JQueryDeferred<data.Selector[]> = $.Deferred();

            this.selectInternal(selector, multiSelect);

            this.hostServices.onSelect({
                data: this.selectors
            });

            defered.resolve(this.selectors);

            return defered;
        }

        public hasSelection(): boolean {
            return this.selectors.length > 0;
        }

        public clear(): JQueryDeferred<{}> {
            var defered = $.Deferred();
            this.selectors = [];
            this.hostServices.onSelect({ data: []});
            defered.resolve();
            return defered;
        }

        private selectInternal(selector: data.Selector, multiSelect: boolean) {
            if (SelectionManager.containsSelection(this.selectors, selector)) {
                this.selectors = multiSelect
                    ? this.selectors.filter(d => !data.Selector.equals(d, selector))
                    : this.selectors.length > 1
                        ? [selector] : [];
            } else {
                if (multiSelect)
                    this.selectors.push(selector);
                else
                    this.selectors = [selector];
            }
        }

        public static containsSelection(list: data.Selector[], selector: data.Selector) {
            return list.some(d => data.Selector.equals(d, selector));
        }
    }
} 