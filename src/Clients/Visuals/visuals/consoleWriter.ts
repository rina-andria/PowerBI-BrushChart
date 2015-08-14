/// <reference path="../_references.ts"/>

module powerbi.visuals {

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

        public onDataChanged(options: VisualDataChangedOptions) {/* This API will be depricated */ }

        public update(options: VisualUpdateOptions) {
            window.console.log('update');
            window.console.log(options);
        }
    }
}