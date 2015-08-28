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
    import WordBreaker = jsCommon.WordBreaker;
    
    describe('WordBreaker', () => {

        describe('finds word when', () => {
            let result: WordBreaker.WordBreakerResult;

            // Sample strings
            let one = "nobreakstoseehere";
            let content = "abcd efgh\nijkl mnop";

            function getWordBreakerResultsBetweenIndeces(content: string, start: number, end: number): WordBreaker.WordBreakerResult[] {
                return _
                    .chain(_.range(start, end))
                    .map((index) => {
                        return WordBreaker.find(index, content);
                    })
                    .value();
            }

            function areAllSame(results: WordBreaker.WordBreakerResult[]): boolean {
                let result = results[0];
                return _.every(results, {
                    start: result.start,
                    end: result.end
                });
            }

            function testWordBreakerBetweenIndeces(content: string, start: number, end: number): WordBreaker.WordBreakerResult {
                let results = getWordBreakerResultsBetweenIndeces(content, start, end);
                expect(areAllSame(results)).toBeTruthy();
                return results[0];
            }

            it('no breaking characters', () => {
                result = testWordBreakerBetweenIndeces(one, 0, one.length);
                
                expect(result).toEqual({ start: 0, end: one.length });
                expect(one.slice(result.start, result.end)).toBe(one);
            });

            it('at start of content', () => {
                result = WordBreaker.find(0, content);
                expect(content.slice(result.start, result.end)).toBe('abcd');
            });

            it('at start of line (immediately after line break)', () => {
                result = WordBreaker.find(10, content);
                expect(content.slice(result.start, result.end)).toBe('ijkl');
            });

            it('at start of word', () => {
                result = WordBreaker.find(5, content);
                expect(content.slice(result.start, result.end)).toBe('efgh');
            });

            it('inside word', () => {
                result = testWordBreakerBetweenIndeces(content, 5, 9);

                expect(result).toEqual({ start: 5, end: 9 });
                expect(content.slice(result.start, result.end)).toBe('efgh');
            });

            it('at end of word', () => {
                result = WordBreaker.find(14, content);
                expect(content.slice(result.start, result.end)).toBe('ijkl');
            });

            it('at end of line (before line break)', () => {
                result = WordBreaker.find(9, content);
                expect(content.slice(result.start, result.end)).toBe('efgh');
            });

            it('at end of content', () => {
                result = WordBreaker.find(content.length, content);
                expect(content.slice(result.start, result.end)).toBe('mnop');
            });

            it('non-alphanumeric characters', () => {
                let weird = "weird... !@#$%^&*()_+{}~`\|/;:'-=<>";
                result = testWordBreakerBetweenIndeces(weird, 9, weird.length);

                expect(result).toEqual({ start: 9, end: weird.length });
            });
        });

        describe('can detect breaker characters', () => {
            it('when content has space', () => {
                testHasBreakers(' ', true);
                testHasBreakers('a ', true);
                testHasBreakers(' a', true);
                testHasBreakers('a b', true);
            });

            it('when content has tab', () => {
                testHasBreakers('\t', true);
                testHasBreakers('a\t', true);
                testHasBreakers('\ta', true);
                testHasBreakers('a\tb', true);
            });

            it('when content has new line', () => {
                testHasBreakers('\n', true);
                testHasBreakers('a\n', true);
                testHasBreakers('\na', true);
                testHasBreakers('a\nb', true);
            });

            it('when content does not have breakers', () => {
                testHasBreakers('abc', false);
            });

            function testHasBreakers(content: string, expected: boolean): void {
                expect(WordBreaker.hasBreakers(content)).toBe(expected);
            }
        });

        describe('can count words', () => {
            let count;

            it('when no breakers', () => {
                count = WordBreaker.wordCount('abcdefg');
                expect(count).toBe(1);
            });

            describe('has two words (one breaker)', () => {
                it('with space', () => {
                    count = WordBreaker.wordCount('abcd efg');
                    expect(count).toBe(2);
                });

                it('with tab', () => {
                    count = WordBreaker.wordCount('abcd\tefg');
                    expect(count).toBe(2);
                });

                it('with new line', () => {
                    count = WordBreaker.wordCount('abcd\nefg');
                    expect(count).toBe(2);
                });
            });
        });

        describe('can split into words by width and breakers', () => {
            let words;
            let textWidthMeasurer = powerbi.TextMeasurementService.measureSvgTextWidth;
            var textProperties: powerbi.TextProperties = {
                fontFamily: "Arial",
                fontSize: "10px"
            };

            it('when no breakers', () => {
                let content = 'abcdefg';
                words = WordBreaker.splitByWidth(content, textProperties, textWidthMeasurer, 25, 1);

                expect(words.length).toBe(1);
                expect(words[0]).toBe(content);
            });

            describe('has two words (one breaker)', () => {
                it('with space', () => {
                    words = WordBreaker.splitByWidth('abcd efg', textProperties, textWidthMeasurer, 25, 2);

                    expect(words.length).toBe(2);
                    expect(words[0]).toBe('abcd');
                    expect(words[1]).toBe('efg');
                });

                it('with tab', () => {
                    words = WordBreaker.splitByWidth('abcd\tefg', textProperties, textWidthMeasurer, 25, 2);

                    expect(words.length).toBe(2);
                    expect(words[0]).toBe('abcd');
                    expect(words[1]).toBe('efg');
                });

                it('with new line', () => {
                    words = WordBreaker.splitByWidth('abcd\nefg', textProperties, textWidthMeasurer, 25, 2);

                    expect(words.length).toBe(2);
                    expect(words[0]).toBe('abcd');
                    expect(words[1]).toBe('efg');
                });
            });

            describe('has multiple words per line (by width)', () => {
                it('with space', () => {
                    words = WordBreaker.splitByWidth('abcd efg hijk lmn opqr stu vwx yz', textProperties, textWidthMeasurer, 75, 3);

                    expect(words.length).toBe(3);
                    expect(words[0]).toBe('abcd efg hijk');
                    expect(words[1]).toBe('lmn opqr stu');
                    expect(words[2]).toBe('vwx yz');
                });

                it('with tab', () => {
                    words = WordBreaker.splitByWidth('abcd\tefg\thijk\tlmn\topqr\tstu\tvwx\tyz', textProperties, textWidthMeasurer, 75, 3);

                    expect(words.length).toBe(3);
                    expect(words[0]).toBe('abcd efg hijk');
                    expect(words[1]).toBe('lmn opqr stu');
                    expect(words[2]).toBe('vwx yz');
                });

                it('with new line', () => {
                    words = WordBreaker.splitByWidth('abcd\nefg\nhijk\nlmn\nopqr\nstu\nvwx\nyz', textProperties, textWidthMeasurer, 75, 3);

                    expect(words.length).toBe(3);
                    expect(words[0]).toBe('abcd efg hijk');
                    expect(words[1]).toBe('lmn opqr stu');
                    expect(words[2]).toBe('vwx yz');
                });
            });

            it('has multiple words per line (by width) but truncated by max lines', () => {
                words = WordBreaker.splitByWidth('abcd efg hijk lmn opqr stu vwx yz', textProperties, textWidthMeasurer, 75, 2);

                expect(words.length).toBe(2);
                expect(words[0]).toBe('abcd efg hijk');
                expect(words[1]).toBe('lmn opqr stu vwx yz');
            });

            it('has multiple words per line (by width) but does not truncate by max lines', () => {
                words = WordBreaker.splitByWidth('abcd efg hijk lmn opqr stu vwx yz', textProperties, textWidthMeasurer, 75, 0);

                expect(words.length).toBe(3);
                expect(words[0]).toBe('abcd efg hijk');
                expect(words[1]).toBe('lmn opqr stu');
                expect(words[2]).toBe('vwx yz');
            });
        });
    });
}