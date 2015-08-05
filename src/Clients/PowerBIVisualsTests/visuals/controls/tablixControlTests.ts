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
    import Controls = powerbi.visuals.controls;
    import InternalControls = powerbi.visuals.controls.internal;

    describe('TablixGrid',() => {

        it('onStartRenderingSession clear',() => {
            var control = createTablixControl();
            var grid = control.layoutManager.grid;
            var gridPresenter = grid._presenter;
            gridPresenter['_owner'] = grid;
            grid['_owner'] = control;

            grid.onStartRenderingIteration();

            grid.getOrCreateColumn(0);
            grid.getOrCreateColumn(1);
            grid.getOrCreateRow(0);
            grid.getOrCreateRow(1);
            grid.getOrCreateFootersRow();

            grid.onStartRenderingSession(true);

            expect(grid['_rows']).toBe(null);
            expect(grid['_columns']).toBe(null);
            expect(grid['_footerRow']).toBe(null);
        });
    });

    describe('TablixLayoutManager',() => {

        it('onStartRenderingSession clear',() => {

            var tableBinder = createMockBinder();
            var layoutManager = InternalControls.CanvasTablixLayoutManager.createLayoutManager(tableBinder);
            var grid = layoutManager.grid;
            var gridSpy = spyOn(grid, "onStartRenderingSession");
            layoutManager.rowLayoutManager['onStartRenderingSession'] = () => { };
            layoutManager.columnLayoutManager['onStartRenderingSession'] = () => { };
            layoutManager.onStartRenderingSession(null, null, true);
            expect(gridSpy).toHaveBeenCalledWith(true);
        });
    });

    describe('TablixControl',() => {

        it('Render clear calls clearRows once',() => {
            var control = createTablixControl();
            var layoutManager = control.layoutManager;

            // Force a few rendering iterations.
            var counter: number = 3;
            layoutManager['onEndRenderingIteration'] = () => { return 0 === counter--; };

            var spy = spyOn(layoutManager.grid, "clearRows");
            control.refresh(true);

            expect(spy.calls.all().length).toBe(1);
        });

        it('Render clear false no clearRows call',() => {
            var control = createTablixControl();
            var layoutManager = control.layoutManager;

            var counter: number = 1;
            layoutManager['onEndRenderingIteration'] = () => { return 0 === counter--; };

            var spy = spyOn(layoutManager.grid, "clearRows");
            control.refresh(false);
            expect(spy).not.toHaveBeenCalled();
        });

        it('DOMMouseScroll dispatches to row scrollbar',() => {
            var tablixControl = createTablixControl();
            var spy = spyOn(tablixControl.rowDimension.scrollbar, "onFireFoxMouseWheel");
            spy.and.stub();
            tablixControl.rowDimension.scrollbar['_visible'] = true;
            var evt = createMouseWheelEvent('DOMMouseScroll', -100);
            tablixControl.container.dispatchEvent(evt);

            expect(spy).toHaveBeenCalled();
        });

        it('mousewheel dispatches to row scrollbar',() => {
            var tablixControl = createTablixControl();
            var spy = spyOn(tablixControl.rowDimension.scrollbar, "onMouseWheel");
            spy.and.stub();
            tablixControl.rowDimension.scrollbar['_visible'] = true;
            var evt = createMouseWheelEvent('mousewheel', -100);
            tablixControl.container.dispatchEvent(evt);

            expect(spy).toHaveBeenCalled();
        });

        it('mousewheel dispatches to dimension scrollbar',() => {
            var tablixControl = createTablixControl();
            var spy = spyOn(tablixControl.columnDimension.scrollbar, "onMouseWheel");
            spy.and.stub();
            tablixControl.rowDimension.scrollbar['_visible'] = false;
            tablixControl.columnDimension.scrollbar['_visible'] = true;
            var evt = createMouseWheelEvent('mousewheel', -100);
            tablixControl.container.dispatchEvent(evt);

            expect(spy).toHaveBeenCalled();
        });
    });

    describe('Scrollbar',() => {
        it('Uses mouse wheel range',() => {
            var parent = document.createElement('div');
            var scrollbar = new Controls.Scrollbar(parent);

            var evt = createMouseWheelEvent('mousewheel', -10);
            var scrollSpy = spyOn(scrollbar, "scrollBy");
            scrollSpy.and.stub();
            scrollbar.onMouseWheel(evt);

            expect(scrollSpy).toHaveBeenCalledWith(1);
        });

        it('Detects end of scroll',() => {
            var parent = document.createElement('div');
            var callbackCalled = false;
            var callback = () => { callbackCalled = true; };
            var scrollbar = new Controls.Scrollbar(parent);
            scrollbar._onscroll.push((e) => callback());
            scrollbar.viewMin = 2;
            scrollbar.viewSize = 8;
            var evt = createMouseWheelEvent('mousewheel', -240);
            scrollbar.onMouseWheel(evt);

            expect(callbackCalled).toBeFalsy();
        });
    });

    function createTablixControl(): Controls.TablixControl {
        var tableBinder = createMockBinder();
        var layoutManager = InternalControls.CanvasTablixLayoutManager.createLayoutManager(tableBinder);

        var tablixOptions: Controls.TablixOptions = {
            interactive: true,
            enableTouchSupport: false,
            layoutKind: Controls.TablixLayoutKind.Canvas,
        };

        var tablixContainer = document.createElement('div');

        var navigator = createMockNavigator();

        return new Controls.TablixControl(navigator, layoutManager, tableBinder, tablixContainer, tablixOptions);
    }

    function createMockBinder(): Controls.ITablixBinder {
        return {
            onStartRenderingSession: () => { },
            onEndRenderingSession: () => { },
            bindRowHeader: (item: any, cell: Controls.ITablixCell) => { },
            unbindRowHeader: (item: any, cell: Controls.ITablixCell) => { },
            bindColumnHeader: (item: any, cell: Controls.ITablixCell) => { },
            unbindColumnHeader: (item: any, cell: Controls.ITablixCell) => { },
            bindBodyCell: (item: any, cell: Controls.ITablixCell) => { },
            unbindBodyCell: (item: any, cell: Controls.ITablixCell) => { },
            bindCornerCell: (item: any, cell: Controls.ITablixCell) => { },
            unbindCornerCell: (item: any, cell: Controls.ITablixCell) => { },
            bindEmptySpaceHeaderCell: (cell: Controls.ITablixCell) => { },
            unbindEmptySpaceHeaderCell: (cell: Controls.ITablixCell) => { },
            bindEmptySpaceFooterCell: (cell: Controls.ITablixCell) => { },
            unbindEmptySpaceFooterCell: (cell: Controls.ITablixCell) => { },
            getHeaderLabel: (item: any): string => { return "label"; },
            getCellContent: (item: any): string => { return "label"; },
            hasRowGroups: () => true
        };
    }

    function createMockNavigator(): Controls.ITablixHierarchyNavigator {
        return {
            getDepth: (hierarchy: any): number=> 1,
            getLeafCount: (hierarchy: any): number=> 1,
            getLeafAt: (hierarchy: any, index: number): any=> 1,
            getParent: (item: any): any=> { },
            getIndex: (item: any): number=> 1,
            isLeaf: (item: any): boolean=> true,
            isRowHierarchyLeaf: (cornerItem: any): boolean=> true,
            isColumnHierarchyLeaf: (cornerItem: any): boolean=> true,
            isLastItem: (item: any, items: any): boolean=> true,
            getChildren: (item: any): any=> { },
            getCount: (items: any): number=> 1,
            getAt: (items: any, index: number): any=> 1,
            getLevel: (item: any): number=> 1,
            getIntersection: (rowItem: any, columnItem: any): any=> { },
            getCorner: (rowLevel: number, columnLevel: number): any=> { },
            headerItemEquals: (item1: any, item2: any): boolean=> true,
            bodyCellItemEquals: (item1: any, item2: any): boolean=> true,
            cornerCellItemEquals: (item1: any, item2: any): boolean=> true
        };
    }

    function createMouseWheelEvent(eventName: string, delta: number): MouseWheelEvent {
        var evt = document.createEvent("MouseEvents");
        evt.initMouseEvent(
            eventName,
            true,  // boolean canBubbleArg,
            true,  // boolean cancelableArg,
            null,  // views::AbstractView viewArg,
            120,   // long detailArg,
            0,     // long screenXArg,
            0,     // long screenYArg,
            0,     // long clientXArg,
            0,     // long clientYArg,
            false, // boolean ctrlKeyArg,
            false, // boolean altKeyArg,
            false, // boolean shiftKeyArg,
            false, // boolean metaKeyArg,
            0,     // unsigned short buttonArg,
            null   // EventTarget relatedTargetArg
            );
        var mouseEvt = <MouseWheelEvent>evt;
        mouseEvt.wheelDelta = delta;

        return mouseEvt;
    }
} 