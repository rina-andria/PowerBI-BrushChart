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

/// <reference path="_references.ts"/>

module powerbitests.mocks {
    import SQExprBuilder = powerbi.data.SQExprBuilder;
    import defaultVisualHostServices = powerbi.visuals.defaultVisualHostServices;

    export class TelemetryCallbackMock {
        public static callbackCalls: number = 0;

        public target() {
            TelemetryCallbackMock.callbackCalls++;
        }
    };

    export class AppInsightsV2Mock {
        public trackPageViewTimes: number = 0;
        public trackEventTimes: number = 0;
        public trackEventLastActivityName: string = null;
        public trackEventLastAdditionalData: any = {
            id: null,
            start: null,
            end: null,
            isInternalUser: null,
            userId: null,
            category: null,
            sessionId: null,
            client: null,
            build: null,
            cluster: null,
        };

        public trackPageView(): void {
            this.trackPageViewTimes++;
        }

        public trackEvent(activityName: string, additionalData: any): void {
            this.trackEventTimes++;
            this.trackEventLastActivityName = activityName;
            this.trackEventLastAdditionalData = additionalData;
        }
    }

    export var DefaultLoggerMockType: number = 1;

    export class MockTimerPromiseFactory implements jsCommon.ITimerPromiseFactory {
        public deferred: JQueryDeferred<void>;

        public create(delayInMs: number): jsCommon.IRejectablePromise {
            if (!this.deferred) {
                this.deferred = $.Deferred<void>();
            }

            return this.deferred;
        }

        public resolveCurrent(): void {
            expect(this.deferred).toBeDefined();

            // Note: we need to read the current deferred field into a local var and null out the member before
            // we call resolve, just in case one of timer callbacks recursively creates another timer.
            var deferred = this.deferred;
            this.deferred = undefined;
            deferred.resolve();
        }

        public reject(): void {
            expect(this.deferred).toBeDefined();

            // Note: we need to read the current deferred field into a local var and null out the member before
            // we call reject, just in case one of timer callbacks recursively creates another timer.
            var deferred = this.deferred;
            this.deferred = undefined;
            deferred.reject();
        }

        public expectNoTimers(): void {
            expect(this.deferred).not.toBeDefined();
        }

        public hasPendingTimers(): boolean {
            return !!this.deferred;
        }
    }

    export function createVisualHostServices(): powerbi.IVisualHostServices {
        return defaultVisualHostServices;
    }
    
    export class MockTraceListener implements jsCommon.ITraceListener {
        public trace: jsCommon.TraceItem;

        public logTrace(trace: jsCommon.TraceItem): void {
            this.trace = trace;
        }
    }

    export function dataViewScopeIdentity(fakeValue: string | number | boolean): powerbi.DataViewScopeIdentity {
        var expr = constExpr(fakeValue);
        return powerbi.data.createDataViewScopeIdentity(expr);
    }

    export function dataViewScopeIdentityWithEquality(keyExpr: powerbi.data.SQExpr, fakeValue: string | number | boolean): powerbi.DataViewScopeIdentity {
        return powerbi.data.createDataViewScopeIdentity(
            powerbi.data.SQExprBuilder.equal(
                keyExpr,
                constExpr(fakeValue)));
    }

    function constExpr(fakeValue: string | number | boolean): powerbi.data.SQExpr {
        if (fakeValue === null)
            return SQExprBuilder.nullConstant();

        if (fakeValue === true || fakeValue === false)
            return SQExprBuilder.boolean(<boolean>fakeValue);

        return (typeof (fakeValue) === 'number')
            ? powerbi.data.SQExprBuilder.double(<number>fakeValue)
            : powerbi.data.SQExprBuilder.text(<string>fakeValue);
    }

    export class MockVisualWarning implements powerbi.IVisualWarning {
        public static Message: string = 'Warning';

        // Allow 'code' to be modified for testing.
        public code: string = 'MockVisualWarning';

        public getMessages(resourceProvider: jsCommon.IStringResourceProvider): powerbi.IVisualErrorMessage {
            var details: powerbi.IVisualErrorMessage = {
                message: MockVisualWarning.Message,
                title: 'key',
                detail: 'val',
            };
            return details;
        }
    }
        
    export function setLocale(): void {
        powerbi.visuals.DefaultVisualHostServices.initialize();
    }    

    export function getLocalizedString(stringId: string): string {
        return defaultVisualHostServices.getLocalizedString(stringId);
    }    

    export class MockGeocoder implements powerbi.visuals.IGeocoder {
        private callNumber = 0;
        private resultList = [
            { x: 45, y: -90 },
            { x: 45, y: 90 },
            { x: -45, y: -90 },
            { x: -45, y: 90 },
            { x: 0, y: 0 },
            { x: 45, y: -45 },
            { x: 45, y: 45 },
            { x: -45, y: -45 },
            { x: -45, y: 45 },
        ];

        /** With the way our tests run, these values won't be consistent, so you shouldn't validate actual lat/long or pixel lcoations */
        public geocode(query: string, category?: string): any {
            var resultIndex = this.callNumber++ % this.resultList.length;
            var deferred = $.Deferred();
            deferred.resolve(this.resultList[resultIndex]);
            return deferred;
        }

        public geocodeBoundary(latitude: number, longitude: number, category: string, levelOfDetail?: number, maxGeoData?: number): any {
            // Only the absoluteString is actually used for drawing, but a few other aspects of the geoshape result are checked for simple things like existence and length
            var result = {
                locations: [{
                    absoluteString: "84387.1,182914 84397.3,182914 84401.3,182914 84400.9,182898 84417.4,182898 84421.3,182885 84417.4,182877 84418.2,182865 84387.2,182865 84387.1,182914", // A valid map string taken from a piece of Redmond's path
                    geographic: [undefined, undefined, undefined], // This needs to be an array with length > 2 for checks in map; contents aren't used.
                    absoluteBounds: {
                        width: 34.2,
                        height: 49,
                    },
                }]
            };
            var deferred = $.Deferred();
            deferred.resolve(result);
            return deferred;
        }
    }

    export class MockMapControl {
        private element;
        private width;
        private height;
        private centerX;
        private centerY;

        constructor(element: HTMLElement, width: number, height: number) {
            this.element = element;
            this.width = width;
            this.height = height;
            this.centerX = width / 2;
            this.centerY = height / 2;
        }

        public getRootElement(): Node {
            return this.element;
        }

        public getWidth(): number {
            return this.width;
        }

        public getHeight(): number {
            return this.height;
        }

        public tryLocationToPixel(location) {
            var result;
            if (location.length) {
                // It's an array of locations; iterate through the array
                result = [];
                for (var i = 0, ilen = location.length; i < ilen; i++) {
                    result.push(this.tryLocationToPixelSingle(location[i]));
                }
            }
            else {
                // It's just a single location
                result = this.tryLocationToPixelSingle(location);
            }
            return result;
        }

        private tryLocationToPixelSingle(location) {
            var centerX = this.centerX;
            var centerY = this.centerY;
            // Use a really dumb projection with no sort of zooming/panning
            return { x: centerX + centerX * (location.x / 180), y: centerY + centerY * (location.y / 90) };
        }

        public setView(viewOptions): void {
            // No op placeholder; we don't need to bother with zoom/pan for mocking.  Spies can confirm anything about params we care about
        }
    }

    // Mocks for Microsoft's Bing Maps API; implements select methods in the interface for test purposes
    // Declared separately from Microsoft.Maps to avoid collision with the declaration in Microsoft.Maps.d.ts
    export module MockMaps {
        export function loadModule(moduleKey: string, options?: { callback: () => void; }): void {
            if (options && options.callback)
                options.callback();
        }

        export class LocationRect {
            constructor(center: Location, width: number, height: number) {
                this.center = center;
                this.width = width;
                this.height = height;
            }

            public center: Location;
            public height: number;
            public width: number;

            public static fromCorners(northwest: Location, southeast: Location): LocationRect {
                var centerLat = (northwest.latitude + southeast.latitude) / 2;
                var centerLong = (northwest.longitude + southeast.longitude) / 2;
                return new LocationRect(
                    new Location(centerLat, centerLong),
                    southeast.longitude - northwest.longitude,
                    northwest.latitude - southeast.latitude);
            }

            public static fromEdges(north: number, west: number, south: number, east: number, altitude: number, altitudeReference: AltitudeReference): LocationRect {
                var centerLat = (north + south) / 2;
                var centerLong = (east + west) / 2;
                return new LocationRect(
                    new Location(centerLat, centerLong),
                    east - west,
                    north - south);
            }

            public getNorthwest(): Location {
                return new Location(this.center.latitude - this.height / 2, this.center.longitude - this.width / 2);
            }

            public getSoutheast(): Location {
                return new Location(this.center.latitude + this.height / 2, this.center.longitude + this.width / 2);
            }
        }

        export class Location {
            constructor(latitude: number, longitude: number, altitude?: number, altitudeReference?: AltitudeReference) {
                this.latitude = latitude;
                this.longitude = longitude;
                this.x = longitude;
                this.y = latitude;
            }

            public latitude: number;
            public longitude: number;
            public x: number;
            public y: number;
        }

        export class AltitudeReference {
        }

        export class MapTypeId {
            public static road: string = 'r';
        }

        export module Events {
            export function addHandler(target: any, eventName: string, handler: any) { }
        }
    }
}