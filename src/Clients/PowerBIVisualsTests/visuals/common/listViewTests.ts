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

/// <reference path="../../_references.ts"/>

module powerbitests {
    import ListViewFactory = powerbi.visuals.ListViewFactory;
    import ListViewOptions = powerbi.visuals.ListViewOptions;
    
    describe("List view tests", () => {
        var listViewBuilder: ListViewBuilder;

        var data = [
            { first: "Mickey", second: "Mouse" },
            { first: "Mini", second: "Mouse" },
            { first: "Daffy", second: "Duck" },
            { first: "Captain", second: "Planet" },
            { first: "Russell", second: "Wilson" },
            { first: "Jack", second: "Sparrow" },
            { first: "James", second: "Bond" },
            { first: "Sea", second: "Hawks" },
            { first: "Sachin", second: "Patney" }
        ];

        beforeEach(() => {
            listViewBuilder = new ListViewBuilder();

            listViewBuilder.data = data;
        });

        it("Create HTML List View Correctly", (done) => {
            listViewBuilder.buildHtmlListView();

            setTimeout(() => {
                var itemCount = listViewBuilder.element.find(".item").length;
                expect(itemCount).toBeGreaterThan(0);
                expect(itemCount).toBeLessThan(9); // Some should be virtualized, so shouldn"t show all 9 items
                done();
            }, DefaultWaitForRender);
        });

        it("Create SVG List View Correctly", (done) => {
            listViewBuilder.buildSvgListView();

            setTimeout(() => {
                var itemCount = listViewBuilder.element.find(".item").length;
                expect(itemCount).toBeGreaterThan(0);
                expect(itemCount).toBeLessThan(9); // Some should be virtualized, so shouldn"t show all 9 items
                done();
            }, DefaultWaitForRender);
        });

        it("Scroll to last to check if items come in view HTML", (done) => {
            listViewBuilder.isSpy = true;
            listViewBuilder.buildHtmlListView();

            var lastElem = listViewBuilder.element.find(".item").last().text();

            expect(lastElem).not.toEqual("-->Sachin-->Patney");
            listViewBuilder.element.scrollTop(1000);
            setTimeout(() => {
                var lastElem2 = listViewBuilder.element.find(".item").last().text();
                expect(lastElem2).toEqual("-->Sachin-->Patney");
                expect(listViewBuilder.spy).toHaveBeenCalled();
                done();
            }, DefaultWaitForRender);
        });

        it("Scroll to last to check if items come in view SVG", (done) => {
            listViewBuilder.isSpy = true;
            listViewBuilder.buildSvgListView();

            var lastElem = listViewBuilder.element.find(".item").last().text();

            expect(lastElem).not.toEqual("-->Sachin-->Patney");
            listViewBuilder.element.scrollTop(1000);
            setTimeout(() => {
                var lastElem2 = listViewBuilder.element.find(".item").last().text();
                expect(lastElem2).toEqual("-->Sachin-->Patney");
                expect(listViewBuilder.spy).toHaveBeenCalled();
                done();
            }, DefaultWaitForRender);
        });

        it("Reset scrollbar position when ResetScrollbar flag is set", (done) => {
            listViewBuilder.data = [
                { first: "Mickey", second: "Mouse" },
                { first: "Mini", second: "Mouse" },
                { first: "Daffy", second: "Duck" },
                { first: "Captain", second: "Planet" },
                { first: "Russell", second: "Wilson" },
                { first: "Jack", second: "Sparrow" },
                { first: "James", second: "Bond" },
                { first: "Sea", second: "Hawks" }
            ];

            listViewBuilder.buildHtmlListView();

            listViewBuilder.element.scrollTop(1000);
           
            setTimeout(() => {
                expect(listViewBuilder.element.find(".scrollRegion").first().parent().scrollTop()).toBe(40);

                listViewBuilder.render(true, false);

                expect(listViewBuilder.element.find(".scrollRegion").first().parent().scrollTop()).toBe(40);
                
                listViewBuilder.render(true, true);

                expect(listViewBuilder.element.find(".scrollRegion").first().parent().scrollTop()).toBe(0);

                done();
            }, DefaultWaitForRender);
        });
    });

    class ListViewBuilder {
        private nestedData: any[];

        private width: number;

        private height: number;

        public isSpy: boolean = false;

        public element: JQuery;

        private options: ListViewOptions;

        private rowExit(rowSelection: D3.Selection) {
            rowSelection.remove();
        }

        private _spy: jasmine.Spy;

        public get spy(): jasmine.Spy {
            return this._spy;
        }

        private _listView: powerbi.visuals.IListView;

        public get listView(): powerbi.visuals.IListView {
            return this._listView;
        }

        public data: any[];

        constructor(width: number = 200, height: number = 200) {
            this.setSize(width, height);
        }

        public setSize(width: number, height: number) {
            this.width = width;
            this.height = height;

            this.init();
        }

        private init() {
            this.element = powerbitests.helpers.testDom(this.height.toString(), this.width.toString());
        }

        private buildHtmlListViewOptions() {
            var rowEnter = (rowSelection: D3.Selection) => {
                rowSelection
                    .append("div")
                    .style("height", "30px")
                    .classed("item", true)
                    .selectAll("span")
                    .data(d => {
                    return d.children;
                })
                    .enter()
                    .append("span");
            };

            var rowUpdate = (rowSelection: D3.Selection) => {
                rowSelection
                    .selectAll(".item")
                    .selectAll("span")
                    .text(d => {
                    return "-->" + d.name;
                });
            };

            this.createOptions(rowEnter, rowUpdate);
        }
        
        private buildSvgListViewOptions() {
            var rowEnterSVG = (rowSelection: D3.Selection) => {
                rowSelection
                    .append("g")
                    .style("height", "30px")
                    .classed("item", true)
                    .selectAll("g")
                    .data(d => {
                    return d.children;
                })
                    .enter()
                    .append("span")
                    .classed("column", true);
            };

            var rowUpdateSVG = (rowSelection: D3.Selection) => {
                rowSelection
                    .selectAll(".item")
                    .selectAll(".column")
                    .text(d => {
                    return "-->" + d.name;
                });
            };

            this.createOptions(rowEnterSVG, rowUpdateSVG);
        }

        private createOptions(rowEnter, rowUpdate) {
            this.options = {
                enter: rowEnter,
                exit: this.rowExit,
                update: rowUpdate,
                loadMoreData: () => { },
                baseContainer: d3.select(this.element.get(0)),
                rowHeight: 30,
                viewport: { height: this.height, width: this.width }
            };
        }

        private generateNestedData(tuples: any[]) {
            var testData = [];

            for (var i = 0; i < this.data.length; i++) {
                testData.push({
                    id: i,
                    children: [
                        { name: this.data[i].first },
                        { name: this.data[i].second }
                    ]
                });
            }

            return testData;
        }

        private buildCreateNestedData() {
            this.nestedData = this.generateNestedData(this.data);
        }

        private createListView() {
            this._listView = ListViewFactory.createHTMLListView(this.options);
        }

        private setSpy() {
            if (this.isSpy) {
                this._spy = spyOn(this.options, "loadMoreData");
            }
        }

        public build() {
            this.buildCreateNestedData();
            this.setSpy();
            this.createListView();
            this.render();
        }

        public render(sizeChanged: boolean = true, resetScrollPosition?: boolean) {
            this._listView.data(this.nestedData, d => d.id).render(sizeChanged, resetScrollPosition);
        }

        public buildHtmlListView() {
            this.buildHtmlListViewOptions();
            this.build();
        }

        public buildSvgListView() {
            this.buildSvgListViewOptions();
            this.build();
        }
    }
}