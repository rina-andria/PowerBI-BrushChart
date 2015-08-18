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

module powerbi.visuals.samples {

    export class ConsoleWriter implements IVisual {

        public static converter(dataView: DataView): any {
            window.console.log('converter');
            window.console.log(dataView);

            return {};
        }

        public init(options: VisualInitOptions): void {
            var div = d3.select(options.element.get(0)).append("div");
            
            div.append("h1").text("ConsoleWriter");
            div.append("p").text("This IVisual writes messages passed to it to the javscript console output. Check your console for the actual messages passed. For more information, click below");
            var anchor = div.append('a');
            anchor.attr('href', "http://microsoft.github.io/PowerBI-visuals/modules/powerbi.html")
            .text("Online help");

            window.console.log('init');
            window.console.log(options);
        }

        public onResizing(viewport: IViewport) { /* This API will be depricated */ }

        public update(options: VisualUpdateOptions) {
            window.console.log('update');
            window.console.log(options);
        }
    }
}