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

/// <reference path="../../../_references.ts"/>

module powerbi.visuals.controls.internal {

    var UNSELECTABLE_CLASS_NAME = "unselectable";

    /** This class is responsible for tablix header resizing */
    export class TablixResizer {
        private _element: HTMLElement;
        private _handler: ITablixResizeHandler;
        private _elementMouseDownWrapper: any;
        private _elementMouseMoveWrapper: any;
        private _elementMouseOutWrapper: any;
        private _elementMouseDoubleClickOutWrapper: any;
        private _documentMouseMoveWrapper: any;
        private _documentMouseUpWrapper: any;
        private _startMousePosition: { x: number; y: number; };
        private _originalCursor: string;

        static resizeHandleSize = 4;
        static resizeCursor = "e-resize";

        constructor(element: HTMLElement, handler: ITablixResizeHandler) {
            this._element = element;
            this._handler = handler;
            this._elementMouseDownWrapper = null;
            this._elementMouseMoveWrapper = null;
            this._elementMouseOutWrapper = null;
            this._documentMouseMoveWrapper = null;
            this._documentMouseUpWrapper = null;
            this._startMousePosition = null;
            this._originalCursor = null;
        }

        static addDocumentMouseUpEvent(listener: EventListener): void {
            document.addEventListener("mouseup", listener);
        }

        static removeDocumentMouseUpEvent(listener: EventListener): void {
            document.removeEventListener("mouseup", listener);
        }

        static addDocumentMouseMoveEvent(listener: EventListener): void {
            document.addEventListener("mousemove", listener);
        }

        static removeDocumentMouseMoveEvent(listener: EventListener): void {
            document.removeEventListener("mousemove", listener);
        }

        static getMouseCoordinates(event: MouseEvent): { x: number; y: number; } {
            return { x: event.pageX, y: event.pageY };
        }

        static getMouseCoordinateDelta(previous: { x: number; y: number; }, current: { x: number; y: number; }): { x: number; y: number; } {
            return { x: current.x - previous.x, y: current.y - previous.y };
        }

        public initialize(): void {
            this._elementMouseDownWrapper = e => this.onElementMouseDown(<MouseEvent>e);
            this._element.addEventListener("mousedown", this._elementMouseDownWrapper);
            this._elementMouseMoveWrapper = e => this.onElementMouseMove(<MouseEvent>e);
            this._element.addEventListener("mousemove", this._elementMouseMoveWrapper);
            this._elementMouseOutWrapper = e => this.onElementMouseOut(<MouseEvent>e);
            this._element.addEventListener("mouseout", this._elementMouseOutWrapper);
            this._elementMouseDoubleClickOutWrapper = e => this.onElementMouseDoubleClick(<MouseEvent>e);
            this._element.addEventListener("dblclick", this._elementMouseDoubleClickOutWrapper);
        }

        public uninitialize(): void {
            this._element.removeEventListener("mousedown", this._elementMouseDownWrapper);
            this._elementMouseDownWrapper = null;
            this._element.removeEventListener("mousemove", this._elementMouseMoveWrapper);
            this._elementMouseMoveWrapper = null;
            this._element.removeEventListener("mouseout", this._elementMouseOutWrapper);
            this._elementMouseOutWrapper = null;
            this._element.removeEventListener("dblclick", this._elementMouseDoubleClickOutWrapper);
            this._elementMouseDoubleClickOutWrapper = null;
        }

        public get cell(): TablixCell {
            // abstract
            debug.assertFail("PureVirtualMethod: TablixResizer.cell");
            return null;
        }

        public get element(): HTMLElement {
            return this._element;
        }

        // Protected
        public _hotSpot(position: { x: number; y: number; }) {
            // abstract
            debug.assertFail("PureVirtualMethod: TablixResizer._hotSpot");
            return false;
        }

        private onElementMouseDown(event: MouseEvent): void {
            var position = TablixResizer.getMouseCoordinates(event);
            if (!this._hotSpot(position))
                return;

            if ("setCapture" in this._element) {
                this._element.setCapture();
            }

            event.cancelBubble = true;
            this._startMousePosition = position;
            this._documentMouseMoveWrapper = e => this.onDocumentMouseMove(e);
            TablixResizer.addDocumentMouseMoveEvent(this._documentMouseMoveWrapper);
            this._documentMouseUpWrapper = e => this.onDocumentMouseUp(e);
            TablixResizer.addDocumentMouseUpEvent(this._documentMouseUpWrapper);

            if (document.documentElement) {
                this._originalCursor = document.documentElement.style.cursor;
                document.documentElement.style.cursor = TablixResizer.resizeCursor;
            }

            this._handler.onStartResize(this.cell, this._startMousePosition.x, this._startMousePosition.y);
        }

        private onElementMouseMove(event: MouseEvent) {
            if (!this._startMousePosition) {
                if (this._hotSpot(TablixResizer.getMouseCoordinates(event))) {
                    if (this._originalCursor === null) {
                        this._originalCursor = this._element.style.cursor;
                        this._element.style.cursor = TablixResizer.resizeCursor;
                    }
                } else {
                    if (this._originalCursor !== null) {
                        this._element.style.cursor = this._originalCursor;
                        this._originalCursor = null;
                    }
                }
            }
        }

        private onElementMouseOut(event: MouseEvent) {
            if (!this._startMousePosition) {
                if (this._originalCursor !== null) {
                    this._element.style.cursor = this._originalCursor;
                    this._originalCursor = null;
                }
            }
        }

        private onElementMouseDoubleClick(event: MouseEvent) {
            if (!this._hotSpot(TablixResizer.getMouseCoordinates(event)))
                return;

            this._handler.onReset(this.cell);
        }

        private onDocumentMouseMove(event: MouseEvent): void {
            if (!this._startMousePosition)
                return;

            var delta = TablixResizer.getMouseCoordinateDelta(this._startMousePosition, TablixResizer.getMouseCoordinates(event));
            this._handler.onResize(this.cell, delta.x, delta.y);
        }

        private onDocumentMouseUp(event: MouseEvent): void {
            this._startMousePosition = null;

            if ("releaseCapture" in this._element) {
                this._element.releaseCapture();
            }

            TablixResizer.removeDocumentMouseMoveEvent(this._documentMouseMoveWrapper);
            this._documentMouseMoveWrapper = null;

            TablixResizer.removeDocumentMouseUpEvent(this._documentMouseUpWrapper);
            this._documentMouseUpWrapper = null;

            if (document.documentElement)
                document.documentElement.style.cursor = this._originalCursor;

            if (event.preventDefault)
                event.preventDefault(); // prevent other events

            this._handler.onEndResize(this.cell);
        }
    }

    export class TablixDomResizer extends TablixResizer {
        private _cell: TablixCell;
        constructor(cell: TablixCell, element: HTMLElement, handler: ITablixResizeHandler) {
            this._cell = cell;
            super(element, handler);
        }

        public get cell(): TablixCell {
            return this._cell;
        }

        // Protected
        public _hotSpot(position: { x: number; y: number; }) {
            return position.x >= this.element.getBoundingClientRect().right - TablixResizer.resizeHandleSize;
        }
    }

    export class TablixCellPresenter {
        static _noMarginsStyle: HTMLStyleElement;
        static _noMarginsStyleName = "bi-tablix-cellNoMarginStyle";
        // Attribute used to disable dragging in order to have cell resizing work.
        static _dragResizeDisabledAttributeName = "drag-resize-disabled";

        private _owner: TablixCell;

        private _tableCell: HTMLTableCellElement;
        private _contentElement: HTMLDivElement;
        private _contentHost: HTMLDivElement;

        private _contentHostStyle: string;
        private _containerStyle: string;
        private _resizer: TablixResizer;

        constructor(fitProportionally: boolean, layoutKind: TablixLayoutKind) {
            // Table cell will be created once needed
            this._tableCell = null; 

            // Content element
            this._contentElement = TablixUtils.createDiv();
            this._contentElement.style.position = "relative";
            if (!fitProportionally)
                this._contentElement.style.setProperty("float", "left");

            // Content Host
            this._contentHost = TablixUtils.createDiv();
            this._contentHost.style.position = "relative";

            // TODO: this styling should not happen in the cell presenter; refactor to binder or layout manager
            if (layoutKind === TablixLayoutKind.DashboardTile) {
                this._contentHost.style.textOverflow = "ellipsis";
                // With the current styling bold numbers are cut off at the right; adding a small padding
                this._contentHost.style.paddingRight = "2px";
            }

            this._contentElement.appendChild(this._contentHost);

            this._resizer = null;
            TablixCellPresenter.addNoMarginStyle();
        }

        public initialize(owner: TablixCell) {
            this._owner = owner;
        }
        
        public get owner(): TablixCell {
            return this._owner;
        }

        public registerTableCell(tableCell: HTMLTableCellElement) {
            this._tableCell = tableCell;

            tableCell.appendChild(this._contentElement);
            tableCell.className = TablixCellPresenter._noMarginsStyleName;

            // TODO: Push to CSS
            tableCell.style.verticalAlign = "top";
            tableCell.style.lineHeight = "normal";
        }
                
        public get tableCell(): HTMLTableCellElement {
            return this._tableCell;
        }

        public get contentElement(): HTMLElement {
            return this._contentElement;
        }

        public get contentHost(): HTMLElement {
            return this._contentHost;
        }

        public registerClickHandler(handler: (e: MouseEvent) => any): void {
            this._contentElement.onclick = handler;
        }

        public unregisterClickHandler(): void {
            this._contentElement.onclick = null;
        }

        public onContentWidthChanged(value: number): void {
            HTMLElementUtils.setElementWidth(this._contentElement, value);
        }

        public onContentHeightChanged(height: number): void {
            HTMLElementUtils.setElementHeight(this._contentElement, height);
        }

        public onColumnSpanChanged(value: number): void {
            this._tableCell.colSpan = value;
        }

        public onRowSpanChanged(value: number): void {
            this._tableCell.rowSpan = value;
        }

        public onTextAlignChanged(value: string): void {
            this._tableCell.style.textAlign = value;
        }

        public onClear(): void {
            this._contentHost.className = "";
            this._contentHostStyle = "";
            this._tableCell.className = TablixCellPresenter._noMarginsStyleName;
            this._containerStyle = "";
        }

        public onHorizontalScroll(width: number, offset: number): void {
            HTMLElementUtils.setElementLeft(this._contentHost, offset);
            HTMLElementUtils.setElementWidth(this._contentHost, width);
        }

        public onVerticalScroll(height: number, offset: number): void {
            HTMLElementUtils.setElementTop(this._contentHost, offset);
            HTMLElementUtils.setElementHeight(this._contentHost, height);
        }

        public onInitializeScrolling(): void {
            HTMLElementUtils.setElementLeft(this._contentHost, 0);
            HTMLElementUtils.setElementTop(this._contentHost, 0);
            HTMLElementUtils.setElementWidth(this._contentHost, -1);
            HTMLElementUtils.setElementHeight(this._contentHost, -1);
        }

        public setContentHostStyle(style: string) {
            if (this._contentHostStyle !== style) {
                this._contentHostStyle = style;
                this._contentHost.className = this._contentHostStyle;
            }
        }

        public setContainerStyle(style: string) {
            if (this._containerStyle !== style) {
                this._containerStyle = style;
                this._tableCell.className = this._containerStyle + " " + TablixCellPresenter._noMarginsStyleName;
            }
        }
                
        public clearContainerStyle() {
            this._containerStyle = undefined;
            if (this._tableCell.className !== TablixCellPresenter._noMarginsStyleName)
                this._tableCell.className = TablixCellPresenter._noMarginsStyleName;
        }

        public enableHorizontalResize(enable: boolean, handler: ITablixResizeHandler): void {
            if (enable === (this._resizer !== null))
                return;

            if (enable) {
                this._resizer = new TablixDomResizer(this._owner, this._tableCell, handler);
                this._resizer.initialize();
            } else {
                this._resizer.uninitialize();
                this._resizer = null;
            }
        }

        static addNoMarginStyle() {
            if (!TablixCellPresenter._noMarginsStyle) {
                var style: HTMLStyleElement = <HTMLStyleElement>document.createElement('style');
                style.appendChild(document.createTextNode("." + TablixCellPresenter._noMarginsStyleName + "{ padding: 0px; margin: 0px}"));
                document.head.appendChild(style);
                TablixCellPresenter._noMarginsStyle = style;
            }
        }
        
        /**
         * In order to allow dragging of the tableCell we need to
         * disable dragging of the container of the cell in IE.
         */
        public disableDragResize() {
            this._tableCell.setAttribute(TablixCellPresenter._dragResizeDisabledAttributeName, "true");
        }
    }

    export class TablixRowPresenter {
        private _row: TablixRow;
        private _tableRow: HTMLTableRowElement;
        private _fitProportionally: boolean;

        constructor(fitProportionally: boolean) {
            // Table row will be created once needed
            this._tableRow = null;
            this._fitProportionally = fitProportionally;
        }

        public initialize(row: TablixRow) {
            this._row = row;
        }

        public createCellPresenter(layoutKind: controls.TablixLayoutKind): TablixCellPresenter {
            return new TablixCellPresenter(this._fitProportionally, layoutKind);
        }

        public registerRow(tableRow: HTMLTableRowElement) {
            this._tableRow = tableRow;
        }

        public onAppendCell(cell: TablixCell): void {
            var presenter = cell._presenter;

            if (presenter.tableCell === null) {
                // For performance reason we use InsertCell() to create new table cells instead of AppendChild()
                // We use -1 to insert at the end (that's the cross-browser way of doing it)
                var tableCell = this._tableRow.insertCell(-1);
                presenter.registerTableCell(<HTMLTableCellElement>tableCell);
            }
            else {
                this._tableRow.appendChild(presenter.tableCell);
            }
        }

        public onInsertCellBefore(cell: TablixCell, refCell: TablixCell): void {
            debug.assertValue(refCell._presenter.tableCell, 'refTableCell');

            var presenter = cell._presenter;

            if (presenter.tableCell === null) {
                // For performance reasons we use InsertCell() to create new table cells instead of AppendChild()
                var tableCell = this._tableRow.insertCell(Math.max(0, refCell._presenter.tableCell.cellIndex - 1));
                presenter.registerTableCell(<HTMLTableCellElement>tableCell);
            }
            else {
                this._tableRow.insertBefore(cell._presenter.tableCell, refCell._presenter.tableCell);
            }
        }

        public onRemoveCell(cell: TablixCell): void {
            this._tableRow.removeChild(cell._presenter.tableCell);
        }
        
        public getHeight(): number {
            return this.getCellHeight(this._row.getTablixCell());
        }
    
        public getCellHeight(cell: ITablixCell): number {
            debug.assertFail("PureVirtualMethod: TablixRowPresenter.getCellHeight");
            return -1;
        }

        public getCellContentHeight(cell: ITablixCell): number {
            debug.assertFail("PureVirtualMethod: TablixRowPresenter.getCellHeight");
            return -1;
        }

        public get tableRow(): HTMLTableRowElement {
            return this._tableRow;
        }
    }

    export class DashboardRowPresenter extends TablixRowPresenter {
        private _gridPresenter: DashboardTablixGridPresenter;

        constructor(gridPresenter: DashboardTablixGridPresenter, fitProportionally: boolean) {
            super(fitProportionally);

            this._gridPresenter = gridPresenter;
        }

        public getCellHeight(cell: ITablixCell): number {
            return this._gridPresenter.sizeComputationManager.cellHeight;
        }

        public getCellContentHeight(cell: ITablixCell): number {
            return this._gridPresenter.sizeComputationManager.contentHeight;
        }

    }

    export class CanvasRowPresenter extends TablixRowPresenter {
        public getCellHeight(cell: ITablixCell): number {
            return HTMLElementUtils.getElementHeight((<TablixCell>cell)._presenter.tableCell);
        }

        public getCellContentHeight(cell: ITablixCell): number {
            return HTMLElementUtils.getElementHeight((<TablixCell>cell)._presenter.contentElement);
        }

    }

    export class TablixColumnPresenter {
        protected _column: TablixColumn;

        public initialize(column: TablixColumn) {
            this._column = column;
        }

        public getWidth(): number {
            return this.getCellWidth(this._column.getTablixCell());
        }

        public getCellWidth(cell: ITablixCell): number {
            debug.assertFail("PureVirtualMethod: TablixColumnPresenter.getCellWidth");
            return -1;
        }

        public getCellContentWidth(cell: ITablixCell): number {
            debug.assertFail("PureVirtualMethod: TablixColumnPresenter.getCellContentWidth");
            return -1;
        }
    }

    export class DashboardColumnPresenter extends TablixColumnPresenter {
        private _gridPresenter: DashboardTablixGridPresenter;

        constructor(gridPresenter: DashboardTablixGridPresenter) {
            super();

            this._gridPresenter = gridPresenter;
        }

        public getCellWidth(cell: ITablixCell): number {
            return this._gridPresenter.sizeComputationManager.cellWidth;
        }

        public getCellContentWidth(cell: ITablixCell): number {
            return this._gridPresenter.sizeComputationManager.contentWidth;
        }
    }

    export class CanvasColumnPresenter extends TablixColumnPresenter {
        public getCellWidth(cell: ITablixCell): number {
            return HTMLElementUtils.getElementWidth((<TablixCell>cell)._presenter.tableCell);
        }

        public getCellContentWidth(cell: ITablixCell): number {
            return HTMLElementUtils.getElementWidth((<TablixCell>cell)._presenter.contentElement);
        }
    }

    export class TablixGridPresenter {
        protected _table: HTMLTableElement;
        protected _owner: TablixGrid;

        private _footerTable: HTMLTableElement;

        constructor() {
            // Main Table
            this._table = TablixUtils.createTable();
            this._table.className = UNSELECTABLE_CLASS_NAME;

            // Footer Table
            this._footerTable = TablixUtils.createTable();
            this._footerTable.className = UNSELECTABLE_CLASS_NAME;
        }

        public initialize(owner: TablixGrid, gridHost: HTMLElement, footerHost: HTMLElement, control: TablixControl) {
            this._owner = owner;
            gridHost.appendChild(this._table);
            footerHost.appendChild(this._footerTable);
        }

        public getWidth(): number {
            debug.assertFail("PureVirtualMethod: TablixGridPresenter.getWidth");
            return -1;
        }

        public getHeight(): number {
            debug.assertFail("PureVirtualMethod: TablixGridPresenter.getHeight");
            return -1;
        }

        public getScreenToCssRatioX(): number {
            return 1;
        }

        public getScreenToCssRatioY(): number {
            return 1;
        }

        public createRowPresenter(): TablixRowPresenter {
            debug.assertFail("PureVirtualMethod: TablixGridPresenter.createRowPresenter");
            return null;
        }

        public createColumnPresenter(): TablixColumnPresenter {
            debug.assertFail("PureVirtualMethod: TablixGridPresenter.createColumnPresenter");
            return null;
        }

        public onAppendRow(row: TablixRow): void {
            var presenter = row.presenter;

            if (presenter.tableRow === null) {
                // For performance reason we use InsertRow() to create new table cells instead of AppendChild()
                // We use -1 to insert at the end (that's the cross-browser way of doing it)
                var tableRow = this._table.insertRow(-1);
                presenter.registerRow(<HTMLTableRowElement>tableRow);
            }
            else {
                this._table.tBodies[0].appendChild(row.presenter.tableRow);
            }
        }

        public onInsertRowBefore(row: TablixRow, refRow: TablixRow): void {
            debug.assertValue(refRow.presenter.tableRow, 'refTableRow');

            var presenter = row.presenter;

            if (presenter.tableRow === null) {
                // For performance reason we use InsertRow() to create new table cells instead of AppendChild()
                var tableRow = this._table.insertRow(Math.max(0, refRow.presenter.tableRow.rowIndex - 1));
                presenter.registerRow(<HTMLTableRowElement>tableRow);
            }
            else {
                this._table.tBodies[0].insertBefore(row.presenter.tableRow, refRow.presenter.tableRow);
            }
        }

        public onRemoveRow(row: TablixRow): void {
            this._table.tBodies[0].removeChild(row.presenter.tableRow);
        }

        public onAddFooterRow(row: TablixRow): void {
            var presenter = row.presenter;

            if (presenter.tableRow === null) {
                // For performance reason we use InsertRow() to create new table cells instead of AppendChild()
                // We use -1 to insert at the end (that's the cross-browser way of doing it)
                var tableRow = this._footerTable.insertRow(-1);
                presenter.registerRow(<HTMLTableRowElement>tableRow);
            }
            else {
                this._footerTable.tBodies[0].appendChild(row.presenter.tableRow);
            }
        }

        public onClear(): void {
            HTMLElementUtils.clearChildren(this._table);
            HTMLElementUtils.clearChildren(this._footerTable);
        }

        public onFillColumnsProportionallyChanged(value: boolean): void {
            if (value) {
                this._table.style.width = "100%";
                this._footerTable.style.width = "100%";
            }
            else {
                this._table.style.width = "auto";
                this._footerTable.style.width = "auto";
            }
        }
    }

    export class DashboardTablixGridPresenter extends TablixGridPresenter {
        private _sizeComputationManager: SizeComputationManager;

        constructor(sizeComputationManager: SizeComputationManager) {
            super();

            this._sizeComputationManager = sizeComputationManager;
        }

        public createRowPresenter(): TablixRowPresenter {
            return new DashboardRowPresenter(this, this._owner.fillColumnsProportionally);
        }

        public createColumnPresenter(): TablixColumnPresenter {
            return new DashboardColumnPresenter(this);
        }

        public get sizeComputationManager(): SizeComputationManager {
            return this._sizeComputationManager;
        }

        public getWidth(): number {
            return this._sizeComputationManager.gridWidth;
        }

        public getHeight(): number {
            return this._sizeComputationManager.gridHeight;
        }
    }

    export class CanvasTablixGridPresenter extends TablixGridPresenter {
        public createRowPresenter(): TablixRowPresenter {
            return new CanvasRowPresenter(this._owner.fillColumnsProportionally);
        }

        public createColumnPresenter(): TablixColumnPresenter {
            return new CanvasColumnPresenter();
        }

        public getWidth(): number {
            return HTMLElementUtils.getElementWidth(this._table);
        }

        public getHeight(): number {
            return HTMLElementUtils.getElementHeight(this._table);
        }
    }
}
