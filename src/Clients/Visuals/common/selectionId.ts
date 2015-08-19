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
    import Selector = powerbi.data.Selector;
    import SelectorsByColumn = powerbi.SelectorsByColumn;
    import SelectorForColumn = powerbi.SelectorForColumn;

    /**
     * A combination of identifiers used to uniquely identify
     * data points and their bound geometry.
     */
    export class SelectionId {
        private selector: Selector;
        // This is a new data structure to support drilling -- in the long term it should replace the 'selector' field
        private selectorsByColumn: SelectorsByColumn;
        private key: string;

        public highlight: boolean;

        constructor(selector: Selector, highlight: boolean) {
            this.selector = selector;
            this.highlight = highlight;
            this.key = JSON.stringify({ selector: selector ? Selector.getKey(selector) : null, highlight: highlight });
        }

        public equals(other: SelectionId): boolean {
            if (!this.selector || !other.selector) {
                return (!this.selector === !other.selector) && this.highlight === other.highlight;
            }
            return this.highlight === other.highlight &&  Selector.equals(this.selector, other.selector);
        }
        
        /**
         * Checks equality against other for all identifiers existing in this.
         */
        public includes(other: SelectionId, ignoreHighlight: boolean = false): boolean {
            var thisSelector = this.selector;
            var otherSelector = other.selector;
            if (!thisSelector || !otherSelector) {
                return false;
            }
            var thisData = thisSelector.data;
            var otherData = otherSelector.data;
            if (!thisData && (thisSelector.metadata && thisSelector.metadata !== otherSelector.metadata))
                return false;
            if (!ignoreHighlight && this.highlight !== other.highlight)
                return false;
            if (thisData) {
                if (!otherData)
                    return false;
                if (thisData.length > 0) {
                    for (var i = 0, ilen = thisData.length; i < ilen; i++) {
                        var thisValue = <DataViewScopeIdentity>thisData[i];
                        if (!otherData.some((otherValue: DataViewScopeIdentity) => DataViewScopeIdentity.equals(thisValue, otherValue)))
                            return false;
                    }
                }
            }
            return true;
        }

        public getKey(): string {
            return this.key;
        }
        
        /**
         * Temporary workaround since a few things currently rely on this, but won't need to.
         */
        public hasIdentity(): boolean {
            return (this.selector && !!this.selector.data);
        }

        public getSelector() {
            return this.selector;
        }

        public getSelectorsByColumn() {
            return this.selectorsByColumn;
        }

        public static createNull(highlight: boolean = false): SelectionId {
            return new SelectionId(null, highlight);
        }

        public static createWithId(id: DataViewScopeIdentity, highlight: boolean = false): SelectionId {
            var selector: Selector = null;
            if (id) {
                selector = {
                    data: [id]
                };
            }
            return new SelectionId(selector, highlight);
        }

        public static createWithMeasure(measureId: string, highlight: boolean = false): SelectionId {
            debug.assertValue(measureId, 'measureId');

            var selector: Selector = {
                metadata: measureId
            };

            var selectionId = new SelectionId(selector, highlight);
            selectionId.selectorsByColumn = { metadata: measureId };
            return selectionId;
        }

        public static createWithIdAndMeasure(id: DataViewScopeIdentity, measureId: string, highlight: boolean = false): SelectionId {
            var selector: powerbi.data.Selector = {};
            if (id) {
                selector.data = [id];
            }
            if (measureId)
                selector.metadata = measureId;
            if (!id && !measureId)
                selector = null;

            var selectionId = new SelectionId(selector, highlight);

            return selectionId;
        }

        public static createWithIdAndMeasureAndCategory(id: DataViewScopeIdentity, measureId: string, queryName: string, highlight: boolean = false): SelectionId {
            var selectionId = this.createWithIdAndMeasure(id, measureId, highlight);

            if (selectionId.selector) {
                selectionId.selectorsByColumn = {};
                if (id && queryName) {
                    selectionId.selectorsByColumn.dataMap = {};
                    selectionId.selectorsByColumn.dataMap[queryName] = id;
                }
                if (measureId)
                    selectionId.selectorsByColumn.metadata = measureId;
            }

            return selectionId;
        }

        public static createWithIds(id1: DataViewScopeIdentity, id2: DataViewScopeIdentity, highlight: boolean = false): SelectionId {
            var selector: Selector = null;
            var selectorData = SelectionId.idArray(id1, id2);
            if (selectorData)
                selector = { data: selectorData };
            
            return new SelectionId(selector, highlight);
        }

        public static createWithIdsAndMeasure(id1: DataViewScopeIdentity, id2: DataViewScopeIdentity, measureId: string, highlight: boolean = false): SelectionId {
            var selector: Selector = {};
            var selectorData = SelectionId.idArray(id1, id2);
            if (selectorData)
                selector.data = selectorData;

            if (measureId)
                selector.metadata = measureId;
            if (!id1 && !id2 && !measureId)
                selector = null;
            return new SelectionId(selector, highlight);
        }

        public static createWithSelectorForColumnAndMeasure(dataMap: SelectorForColumn, measureId: string, highlight: boolean = false): SelectionId {

            var selectionId: visuals.SelectionId;
            var keys = Object.keys(dataMap);
            if (keys.length === 2) {
                selectionId = this.createWithIdsAndMeasure(<DataViewScopeIdentity>dataMap[keys[0]], <DataViewScopeIdentity>dataMap[keys[1]], measureId, highlight);
            } else if (keys.length === 1) {
                selectionId = this.createWithIdsAndMeasure(<DataViewScopeIdentity>dataMap[keys[0]], null, measureId, highlight);
            } else {
                selectionId = this.createWithIdsAndMeasure(null, null, measureId, highlight);
            }

            var selectorsByColumn: SelectorsByColumn = {};
            if (!_.isEmpty(dataMap))
                selectorsByColumn.dataMap = dataMap;
            if (measureId)
                selectorsByColumn.metadata = measureId;
            if (!dataMap && !measureId)
                selectorsByColumn = null;

            selectionId.selectorsByColumn = selectorsByColumn;

            return selectionId;
        }

        public static createWithHighlight(original: SelectionId): SelectionId {
            debug.assertValue(original, 'original');
            debug.assert(!original.highlight, '!original.highlight');

            return new SelectionId(original.getSelector(), /*highlight*/ true);
        }

        private static idArray(id1: DataViewScopeIdentity, id2: DataViewScopeIdentity): DataViewScopeIdentity[] {
            if (id1 || id2) {
                var data = [];
                if (id1)
                    data.push(id1);
                if (id2 && id2 !== id1)
                    data.push(id2);
                return data;
            }
        }
    }
}
