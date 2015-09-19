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

module powerbi.visuals.utility {
    export interface SelectionManagerOptions{
        hostServices: IVisualHostServices;
    };

    export class SelectionManager {
        private selectedIds: SelectionId[];
        private hostServices: IVisualHostServices;

        public constructor(options: SelectionManagerOptions) {
            this.hostServices = options.hostServices;
            this.selectedIds = [];
        }

        public select(selectionId: SelectionId, multiSelect: boolean = false): JQueryDeferred<SelectionId[]> {
            var defered: JQueryDeferred<data.Selector[]> = $.Deferred();

            // Enable when host service feature is ported to master
            //if (this.hostServices.shouldRetainSelection()) {
                //this.sendSelectionToHost([selectionId]);
            //}
            //else {
                this.selectInternal(selectionId, multiSelect);
                this.sendSelectionToHost(this.selectedIds);
            //}

            defered.resolve(this.selectedIds);
            return defered;
        }

        public hasSelection(): boolean {
            return this.selectedIds.length > 0;
        }

        public clear(): JQueryDeferred<{}> {
            var defered = $.Deferred();
            this.selectedIds = [];
            this.sendSelectionToHost([]);
            defered.resolve();
            return defered;
        }

        public getSelectionIds(): SelectionId[] {
            return this.selectedIds;
        }

        private sendSelectionToHost(ids: SelectionId[]) {
            var selectArgs: SelectEventArgs = {
                data: ids
                    .filter((value: SelectionId) => value.hasIdentity())
                    .map((value: SelectionId) => value.getSelector())
            };

            var data2: SelectorsByColumn[] = ids
                .filter((value: SelectionId) => value.getSelectorsByColumn() && value.hasIdentity())
                .map((value: SelectionId) => value.getSelectorsByColumn());

            if (data2 && data2.length > 0)
                selectArgs.data2 = data2;

            this.hostServices.onSelect(selectArgs);
        }

        private selectInternal(selectionId: SelectionId, multiSelect: boolean) {
            if (SelectionManager.containsSelection(this.selectedIds, selectionId)) {
                this.selectedIds = multiSelect
                    ? this.selectedIds.filter(d => !data.Selector.equals(d, selectionId))
                    : this.selectedIds.length > 1
                        ? [selectionId] : [];
            } else {
                if (multiSelect)
                    this.selectedIds.push(selectionId);
                else
                    this.selectedIds = [selectionId];
            }
        }

        public static containsSelection(list: SelectionId[], id: SelectionId) {
            return list.some(d => data.Selector.equals(d.getSelector(), id.getSelector()));
        }
    }
} 