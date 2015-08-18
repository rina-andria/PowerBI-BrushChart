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
    import VisualPlugin = powerbi.IVisualPlugin;
    import VisualPluginFactory = powerbi.visuals.visualPluginFactory;
    import Helpers = performanceTestsHelpers;
    import VisualStyles = powerbi.visuals.visualStyles;
    import Timer = Helpers.Timer;
    mocks.setLocale();

    const DEFAULT_MAX_TIME_FOR_RENDER = 1000;
    const DEFAULT_ITERATIONS_COUNT = 10;
    const MEASURE_PLUGIN_NAME = "columnChart";
    const ESTIMATE_FOR_MEASURE_PLUGIN_NAME = "scatterChart";
    const DEFAULT_HEIGHT = "770";
    const DEFAULT_WIDTH = "770";
    const EXCLUDED_VISUALS: string[] = [MEASURE_PLUGIN_NAME, "sunburstChart", "bingNews", "partitionMap", "categoricalFilter"];

    describe("Performance measuring", () => {
        var visual: powerbi.IVisual, element: JQuery;

        var pluginService = VisualPluginFactory.create();
        var hostServices = mocks.createVisualHostServices();

        var measurePlugin = pluginService.getPlugin(MEASURE_PLUGIN_NAME);
        var estimationPlugin = pluginService.getPlugin(ESTIMATE_FOR_MEASURE_PLUGIN_NAME);
        var plugins = pluginService.getVisuals().filter((plugin) => !EXCLUDED_VISUALS.some((item) => plugin.name === item));

        var baseline: number = 0;
        var estimationPluginTime: number = 0;

        beforeEach(() => {
            element = helpers.testDom(DEFAULT_HEIGHT, DEFAULT_WIDTH);
            element.visible = () => { return true; };
        });

        it("performance test - " + estimationPlugin.name, () => {
            estimationPluginTime = runPerformanceTest(estimationPlugin);
        });

        it("performance test - " + measurePlugin.name, () => {
            baseline = runPerformanceTest(measurePlugin, DEFAULT_ITERATIONS_COUNT, estimationPluginTime);
        });

        plugins.forEach((plugin: VisualPlugin) => {
            it("performance test - " + plugin.name, () => {
                runPerformanceTest(plugin, DEFAULT_ITERATIONS_COUNT, baseline);
            });
        });

        function runPerformanceTest(plugin: VisualPlugin, iterations: number = DEFAULT_ITERATIONS_COUNT, expectedTime: number = DEFAULT_MAX_TIME_FOR_RENDER): number {
            var timer = new Timer();

            visual = VisualPluginFactory.create().getPlugin(plugin.name).create();
            visual.init({
                element: element,
                host: hostServices,
                style: VisualStyles.create(),
                viewport: {
                    height: element.height(),
                    width: element.width()
                },
                interactivity: { isInteractiveLegend: true },
                animation: { transitionImmediate: true }
            });

            timer.start();
            for (var i = 0; i < iterations; i++) {
                if (visual.onDataChanged) {
                    visual.onDataChanged({ dataViews: [Helpers.getDataViewByVisual(plugin.name)] });
                }
                else if (visual.update) {
                    visual.update({ dataViews: [Helpers.getDataViewByVisual(plugin.name)], viewport: { width: 100, height: 100 } });
                }
            }

            var average = timer.stop() / iterations;
            expect(average).toBeLessThan(Helpers.getExpectedTime(plugin.name, expectedTime));

            return average;
        }
    });
}