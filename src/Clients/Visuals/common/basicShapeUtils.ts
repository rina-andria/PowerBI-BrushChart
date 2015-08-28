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
module powerbi.visuals {
    export module shapeFactory {
        export class ShapeFactoryConsts {
            public static PaddingConstValue: number = 0.01;
            public static SmallPaddingConstValue: number = 10;
            public static OvalRadiusConst: number = 2;
            public static OvalRadiusConstPadding: number = 0.2;
            public static VisualVCHeader: number = 20;
        }
        export function createRectangle(data: BasicShapeData, viewportHeight: number, viewportWidth: number, selectedElement: D3.Selection): void {
            // create the inner path with the wanted shape
            selectedElement
                .append("svg")
                .attr({
                    width: viewportWidth,
                    height: viewportHeight
                })
                .append("rect")
                .attr({
                    x: (viewportWidth * ShapeFactoryConsts.PaddingConstValue),
                    y: (viewportWidth * ShapeFactoryConsts.PaddingConstValue),
                    width: (viewportWidth * 0.98),
                    height: (viewportHeight - ShapeFactoryConsts.VisualVCHeader),
                    rx: data.roundEdge,
                    ry: data.roundEdge
                })
                .style({
                    "vector-effect": "non-scaling-stroke",
                    "stroke-width": data.lineWeight + "px",
                    "stroke": data.lineColor,
                    "stroke-opacity": data.lineTransparency / 100,
                    "fill": data.fillColor,
                    "fill-opacity": data.showFill === true ? data.shapeTransparency / 100 : 0
                });
        }

        /** this function creates a oval svg   */
        export function createOval(data: BasicShapeData, viewportHeight: number, viewportWidth: number, selectedElement: D3.Selection): void {
            var widthForCircle = (viewportWidth / ShapeFactoryConsts.OvalRadiusConst).toString();
            var heightForCircle = (viewportHeight / ShapeFactoryConsts.OvalRadiusConst).toString();
            var radiusXForCircle = (viewportWidth / (ShapeFactoryConsts.OvalRadiusConst + ShapeFactoryConsts.OvalRadiusConstPadding));
            var radiusYForCircle = (viewportHeight / (ShapeFactoryConsts.OvalRadiusConst + ShapeFactoryConsts.OvalRadiusConstPadding));

            selectedElement
                .append("svg")
                .attr({
                    width: viewportWidth,
                    height: viewportHeight
                })
                .append("ellipse")
                .attr({
                    cx: widthForCircle,
                    cy: heightForCircle,
                    rx: radiusXForCircle,
                    ry: radiusYForCircle,
                })
                .style({
                    "vector-effect": "non-scaling-stroke",
                    "stroke-width": data.lineWeight + "px",
                    "stroke": data.lineColor,
                    "fill": data.fillColor,
                    "fill-opacity": data.showFill === true ? data.shapeTransparency / 100 : 0
                });
        }

        /** this function creates a line svg   */
        export function createLine(data: BasicShapeData, viewportHeight: number, viewportWidth: number, selectedElement: D3.Selection): void {
            // create the inner path with the wanted shape
            selectedElement
                .append("svg")
                .attr({
                    width: viewportWidth,
                    height: viewportHeight
                })
                .append("line")
                .attr({
                    x1: ShapeFactoryConsts.SmallPaddingConstValue,
                    y1: ShapeFactoryConsts.SmallPaddingConstValue,
                    x2: (viewportWidth - ShapeFactoryConsts.SmallPaddingConstValue),
                    y2: (viewportHeight - ShapeFactoryConsts.SmallPaddingConstValue),
                })
                .style({
                    "vector-effect": "non-scaling-stroke",
                    "stroke-width": data.lineWeight + "px",
                    "stroke-opacity": data.lineTransparency / 100,
                    "stroke": data.lineColor
                });
        }

        /** this function creates a arrow svg   */
        export function createUpArrow(data: BasicShapeData, viewportHeight: number, viewportWidth: number, selectedElement: D3.Selection): void {
            var lineData = [
                { "x": (viewportWidth * 0.215).toString(), "y": (viewportHeight * 0.420).toString() },
                { "x": (viewportWidth * 0.473).toString(), "y": (viewportHeight * 0.016).toString() },
                { "x": (viewportWidth * 0.720).toString(), "y": (viewportHeight * 0.420).toString() },
                { "x": (viewportWidth * 0.599).toString(), "y": (viewportHeight * 0.420).toString() },
                { "x": (viewportWidth * 0.599).toString(), "y": (viewportHeight * 0.993).toString() },
                { "x": (viewportWidth * 0.346).toString(), "y": (viewportHeight * 0.993).toString() },
                { "x": (viewportWidth * 0.346).toString(), "y": (viewportHeight * 0.420).toString() }];

            // create the inner path with the wanted shape
            createPathFromArray(data, lineData, selectedElement, viewportHeight, viewportWidth);
        }

        /** this function creates a triangle svg   */
        export function createTriangle(data: BasicShapeData, viewportHeight: number, viewportWidth: number, selectedElement: D3.Selection): void {
            var lineData = [
                { "x": "10", "y": (viewportHeight - ShapeFactoryConsts.SmallPaddingConstValue).toString() },
                { "x": (viewportWidth / 2).toString(), "y": "10" },
                {
                    "x": (viewportWidth - ShapeFactoryConsts.SmallPaddingConstValue).toString(),
                    "y": (viewportHeight - ShapeFactoryConsts.SmallPaddingConstValue).toString()
                }];

            createPathFromArray(data, lineData, selectedElement, viewportHeight, viewportWidth);
        }

        /** this funcion adds a path to an svg element from an array of points (x,y) */
        function createPathFromArray(data: BasicShapeData, points: Object[], selectedElement: D3.Selection, viewportHeight: number, viewportWidth: number): void {

            var lineFunction = d3.svg.line()
                .x(function (d) { return d.x; })
                .y(function (d) { return d.y; })
                .interpolate("linear");

            selectedElement
                .append("svg")
                .attr({
                    width: viewportWidth,
                    height: viewportHeight
                })
                .append("path").attr({
                    d: lineFunction(points) + " Z",
                })
                .style({
                    "vector-effect": "non-scaling-stroke",
                    "stroke-width": data.lineWeight + "px",
                    "stroke": data.lineColor,
                    "fill": data.fillColor,
                    "fill-opacity": data.showFill === true ? data.shapeTransparency / 100 : 0,
                    "stroke-opacity": data.lineTransparency / 100
                });
        }
    }
}