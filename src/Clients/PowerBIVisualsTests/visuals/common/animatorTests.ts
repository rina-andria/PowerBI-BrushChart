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

module powerbitests {
    import Animator = powerbi.visuals.Animator;
    import IAnimatorOptions = powerbi.visuals.IAnimatorOptions;
    import AnimatorCommon = powerbi.visuals.AnimatorCommon;

    describe("Animator tests", () => {
        it('default animation duration', () => {
            var animator = new Animator();
            expect(animator.getDuration()).toBe(AnimatorCommon.MinervaAnimationDuration);
        });

        it('override default animation duration', () => {
            var duration = 500;
            var animator = new Animator(<IAnimatorOptions>{
                duration: duration,
            });
            expect(animator.getDuration()).toBe(duration);
        });
    });

    describe("AnimatorCommon tests", () => {

        describe("GetAnimationDuration", () => {

            describe("without animator", () => {
                it('undefined: IAnimator, undefined: suppressAnimations', () => {
                    var undefined;
                    var duration = AnimatorCommon.GetAnimationDuration(undefined, undefined);
                    expect(duration).toBe(0);
                });

                it('null: IAnimator, null: suppressAnimations', () => {
                    var duration = AnimatorCommon.GetAnimationDuration(null, null);
                    expect(duration).toBe(0);
                });

                it('null: IAnimator, false: suppressAnimations', () => {
                    var duration = AnimatorCommon.GetAnimationDuration(null, false);
                    expect(duration).toBe(0);
                });

                it('null: IAnimator, true: suppressAnimations', () => {
                    var duration = AnimatorCommon.GetAnimationDuration(null, true);
                    expect(duration).toBe(0);
                });
            });

            describe("with animator", () => {
                var animator;

                beforeEach(() => {
                    animator = new Animator(<IAnimatorOptions>{
                        duration: 333,
                    });
                });

                it('animator: IAnimator, undefined: suppressAnimations', () => {
                    var duration = AnimatorCommon.GetAnimationDuration(animator, undefined);
                    expect(duration).toBe(333);
                });

                it('animator: IAnimator, null: suppressAnimations', () => {
                    var duration = AnimatorCommon.GetAnimationDuration(animator, null);
                    expect(duration).toBe(333);
                });

                it('animator: IAnimator, false: suppressAnimations', () => {
                    var duration = AnimatorCommon.GetAnimationDuration(animator, false);
                    expect(duration).toBe(333);
                });

                it('animator: IAnimator, true: suppressAnimations', () => {
                    var duration = AnimatorCommon.GetAnimationDuration(animator, true);
                    expect(duration).toBe(0);
                });
            });
        });
    });
}
