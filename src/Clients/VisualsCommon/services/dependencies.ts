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

module jsCommon {
    // JavaScript files
    var MSMapcontrol = 'https://ecn.dev.virtualearth.net/mapcontrol/mapcontrol.ashx?v=7.0&s=1&onscriptload=globalMapControlLoaded';

    // Map loading logic
    var MSMapcontrolLoaded = false;
	var WaitForMSMapLoad: JQueryDeferred<void> = null;

    var PowerViewPackage: IDependency = {
        javaScriptFiles: [
            powerbi.build + '/externals/pv/webclient.js'
        ],
        cssFiles: [
            powerbi.build +'/externals/pv/Styles/_all.css'
        ],
		javaScriptFilesWithCallback: [
            { javascriptFile: MSMapcontrol, onLoadCallback: waitForMapControlLoaded }
        ]
    };

    export function ensurePowerView(action: () => void = () => { }): void {
        requires(PowerViewPackage, action);
    }

    var MapPackage: IDependency = {
		javaScriptFilesWithCallback: [
            { javascriptFile: MSMapcontrol, onLoadCallback: waitForMapControlLoaded }
        ]
    };

    export function ensureMap(action: () => void): void {
        requires(MapPackage, action);
    }

	export function mapControlLoaded(): void {
		MSMapcontrolLoaded = true;
		if (WaitForMSMapLoad) {
			WaitForMSMapLoad.resolve();
            WaitForMSMapLoad = undefined;
		}
	}

	export function waitForMapControlLoaded(): JQueryPromise<void> {
		var task: JQueryDeferred<void>;
		if (!MSMapcontrolLoaded) {
			task = WaitForMSMapLoad = $.Deferred<void>();
		} else {
			task = $.Deferred<void>();
			task.resolve();
		}

		return task.promise();
	}
}

/* tslint:disable:no-unused-variable */
var globalMapControlLoaded = function() {
	// Map requires a function in the global namespace to callback once loaded
	jsCommon.mapControlLoaded();
};

