/// <reference path="../../_references.ts"/>

module powerbi.visuals.samples {

    export class ConsoleWriter implements IVisual {

        public static converter(dataView: DataView): any {
            if (window) {
                window.console.log('converter');
                window.console.log(dataView);
            }

            return {};
        }

        public canResizeTo(viewport: IViewport): boolean {
            if (window) {
                window.console.log('canResizeTo');
                window.console.log(viewport);
            }
            return false;
        }

        public destroy(): void {
            if (window) {
                window.console.log('destroy');
            }
        }

        public init(options: VisualInitOptions): void {
            var div = d3.select(options.element.get(0)).append("div");

            div.append("h1").text("ConsoleWriter");
            div.append("p").text("This IVisual writes messages passed to it to the javscript console output. Check your console for the actual messages passed. For more information, click below");
            var anchor = div.append('a');
            anchor.attr('href', "http://microsoft.github.io/PowerBI-visuals/modules/powerbi.html")
                .text("Online help");

            if (window) {
                window.console.log('init');
                window.console.log(options);
            }
        }

        public onClearSelection() {
            if (window) {
                window.console.log('onClearSelection');
            }
        }

        public onDataChanged(options: VisualDataChangedOptions) {
            if (window) {
                window.console.log('onDataChanged');
                window.console.log(options);
            }
        }

        public onResizing(viewport: IViewport) { /* This API will be depricated */ }

        public onSelectObject(object: VisualObjectInstance) {
            if (window) {
                window.console.log('onSelectObject');
                window.console.log(object);
            }
        }

        public onStyleChanged(newStyle: IVisualStyle) {
            if (window) {
                window.console.log('onStyleChanged');
                window.console.log(newStyle);
            }
        }

        public onViewModeChanged(viewMode: ViewMode): void {
            if (window) {
                window.console.log('onViewModeChanged');
                window.console.log(viewMode);
            }
        }

        public update(options: VisualUpdateOptions) {
            if (window) {
                window.console.log('update');
                window.console.log(options);
            }
        }
    }
}