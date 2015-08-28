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

module powerbi.visuals.sampleDataViews {

    export interface ISampleDataViews {
        name: string;
        displayName: string; 
        visuals: string[];
    }

    export class SampleDataViews implements ISampleDataViews {
        public name: string;
        public displayName: string;
        public visuals: string[];

        public getName(): string {
            return this.name;
        }

        public getDisplayName(): string {
            return this.displayName;
        }

        public hasPlugin(pluginName: string): boolean {
            return this.visuals.indexOf(pluginName) >= 0;
        }

        public getRandomValue(min: number, max: number): number {
            let value = Math.random() * (max - min) + min;
            return Math.ceil(value * 100) / 100;
        }

        public randomElement(arr: any[]) {
            return arr[Math.floor(Math.random() * arr.length)];
        }
    }

    export interface ISampleDataViewsMethods extends ISampleDataViews {
        getDataViews(): DataView[];
        randomize(): void;
        getRandomValue(min: number, max: number): number;
        randomElement(arr: any[]): any;
    }
}
