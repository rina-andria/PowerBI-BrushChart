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
    export module AnimatorCommon {
        export const MinervaAnimationDuration = 250;

        export function GetAnimationDuration(animator: IGenericAnimator, suppressAnimations: boolean) {
            return (suppressAnimations || !animator) ? 0 : animator.getDuration();
        }
    }

    export interface IAnimatorOptions {
        duration?: number;
    }

    export interface IAnimationOptions {
        interactivityService: IInteractivityService;
    }

    export interface IAnimationResult {
        failed: boolean;
    }

    export interface IAnimator<T extends IAnimatorOptions, U extends IAnimationOptions, V extends IAnimationResult> {
        getDuration(): number;
        animate(options: U): V;
    }

    export type IGenericAnimator = IAnimator<IAnimatorOptions, IAnimationOptions, IAnimationResult>;

    /** 
     * We just need to have a non-null animator to allow axis animations in cartesianChart.
     * Note: Use this temporarily for Line/Scatter until we add more animations (MinervaPlugins only).
     */
    export class BaseAnimator<T extends IAnimatorOptions, U extends IAnimationOptions, V extends IAnimationResult> implements IAnimator<T, U, V> {
        protected animationDuration: number;

        constructor(options?: T) {
            if (options && options.duration) {
                this.animationDuration = options.duration;
            }

            this.animationDuration = this.animationDuration >= 0 ? this.animationDuration : AnimatorCommon.MinervaAnimationDuration;
        }

        public getDuration(): number {
            return this.animationDuration;
        }

        public animate(options: U): V {
            return null;
        }
    }
}