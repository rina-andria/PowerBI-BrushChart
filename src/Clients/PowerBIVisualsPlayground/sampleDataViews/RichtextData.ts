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

    export class RichtextData extends SampleDataViews implements ISampleDataViewsMethods {

        public name: string = "RichtextData";
        public displayName: string = "Richtext data";

        public visuals: string[] = ['textbox',
        ];

        private sampleData: string[] = ["Example Text",
            "company's data",
            "Power BI",
            "visualization",
            "spot trends",
            "charts",
            "simple drag-and-drop gestures",
            "personalized dashboards"
        ];

        private sampleSingleData = this.sampleData[0];

        private sampleTextStyle = {
            fontFamily: "Heading",
            fontSize: "24px",
            textDecoration: "underline",
            fontWeight: "300",
            fontStyle: "italic",
            float: "left"
        };

        public getDataViews(): DataView[] {
            // 1 paragraphs, with formatting
            var paragraphs: ParagraphContext[] = [
                {
                    horizontalTextAlignment: "center",
                    textRuns: [{
                        value: this.sampleSingleData,
                        textStyle: this.sampleTextStyle
                    }]
                }];

            return this.buildParagraphsDataView(paragraphs);
        }
        
        private buildParagraphsDataView(paragraphs: powerbi.visuals.ParagraphContext[]): powerbi.DataView[] {
            return [{ metadata: { columns: [], objects: { general: { paragraphs: paragraphs } } } }];
        }

        public randomize(): void {

            this.sampleSingleData = this.randomElement(this.sampleData);
            this.sampleTextStyle.fontSize = this.getRandomValue(12, 40) + "px";
            this.sampleTextStyle.fontWeight = this.getRandomValue(300, 700).toString();
        }
        
    }
}