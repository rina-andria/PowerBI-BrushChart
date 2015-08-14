/// <reference path="../_references.ts"/>

module powerbi.visuals {
    export class ConsoleWriter implements IVisual {

        public static converter(dataView: DataView): any {
            window.console.log('converter');
            window.console.log(dataView);

            return {};
        }

        public init(options: VisualInitOptions): void {
            var svg = d3.select(options.element.get(0)).append('a');
            svg.attr('href', "http://microsoft.github.io/PowerBI-visuals/modules/powerbi.html")
            .text("online help");

            window.console.log('init');
            window.console.log(options);
        }

        public onResizing(viewport: IViewport) { /* This API will be depricated */ }

        public onDataChanged(options: VisualDataChangedOptions) {/* This API will be depricated */ }

        public update(options: VisualUpdateOptions) {
            window.console.log('options');
            window.console.log(options);
        }
    }
}