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
    import visuals = powerbi.visuals;

    describe("ColorAllocatorFactory - linear gradient two colors", () => {
        var colorer: powerbi.IColorAllocator;

        beforeEach(() => {
            colorer = visuals.createColorAllocatorFactory().linearGradient2({
                min: { value: 100, color: "#ff0000" },
                max: { value: 200, color: "#0000ff" }
            });
        });

        it("LinearGradient2: min value", () => {
            expect(colorer.color(100)).toBe("#ff0000");
        });

        it("LinearGradient2: max value", () => {
            expect(colorer.color(200)).toBe("#0000ff");
        });

        it("LinearGradient2: mid value", () => {
            expect(colorer.color(150)).toBe("#800080");
        });

        it("LinearGradient2: intermediate value", () => {
            expect(colorer.color(120)).toBe("#cc0033");
        });

        it("LinearGradient2 clamping - test values outside the range", () => {
            expect(colorer.color(90)).toBe("#ff0000");
            expect(colorer.color(220)).toBe("#0000ff");
        });

    });

    describe("ColorAllocatorFactory - linear gradient three colors", () => {
        var defaultColorer: powerbi.IColorAllocator;
        var options: powerbi.LinearGradient3;

        beforeEach(() => {
            options = {
                min: { value: 100, color: "#ff0000" },
                mid: { value: 150, color: "#ffffff" },
                max: { value: 200, color: "#0000ff" }
            };

            defaultColorer = visuals.createColorAllocatorFactory().linearGradient3(options, false);
        });

        it("LinearGradient3: min value", () => {
            expect(defaultColorer.color(100)).toBe("#ff0000");
        });

        it("LinearGradient3: max value", () => {
            expect(defaultColorer.color(200)).toBe("#0000ff");
        });

        it("LinearGradient3: mid value", () => {
            options.mid.value = 170;
            var colorer = visuals.createColorAllocatorFactory().linearGradient3(options, false);

            expect(colorer.color(170)).toBe("#ffffff");
        });

        it("LinearGradient3: intermediate value", () => {
            options.mid.value = 176;
            var colorer = visuals.createColorAllocatorFactory().linearGradient3(options, false);

            expect(colorer.color(178)).toBe("#eaeaff");
        });

        it("LinearGradient3: between min & mid", () => {
            options.mid.value = 176;
            var colorer = visuals.createColorAllocatorFactory().linearGradient3(options, false);

            expect(colorer.color(170)).toBe("#ffebeb");
        });

        it("LinearGradient3 clamping - test values outside the range", () => {
            expect(defaultColorer.color(0)).toBe("#ff0000");
            expect(defaultColorer.color(300)).toBe("#0000ff");
        });

        it("LinearGradient3: splitted scales", () => {
            var colorer = visuals.createColorAllocatorFactory().linearGradient3({
                min: { value: -50, color: "#ffff00" },
                mid: { value: 0, color: "#ffffff" },
                max: { value: 2000, color: "#0000ff" }
            }, true);

            expect(colorer.color(-50)).toBe("#ffff00");
            expect(colorer.color(-25)).toBe("#ffff80");
            expect(colorer.color(0)).toBe("#ffffff");
            expect(colorer.color(1000)).toBe("#8080ff");
            expect(colorer.color(2000)).toBe("#0000ff");
        });
    });
}