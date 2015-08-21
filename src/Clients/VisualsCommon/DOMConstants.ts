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

module jsCommon {
    /**
     * DOM constants.
     */
    export module DOMConstants {

        /** 
         * Integer codes corresponding to individual keys on the keyboard.
         */
        export const escKeyCode = 27;
        export const enterKeyCode = 13;
        export const tabKeyCode = 9;
        export const upArrowKeyCode = 38;
        export const downArrowKeyCode = 40;
        export const leftArrowKeyCode = 37;
        export const rightArrowKeyCode = 39;
        export const homeKeyCode = 36;
        export const endKeyCode = 35;
        export const backSpaceKeyCode = 8;
        export const deleteKeyCode = 46;
        export const spaceKeyCode = 32;
        export const shiftKeyCode = 16;
        export const ctrlKeyCode = 17;
        export const altKeyCode = 18;

        export const aKeyCode = 65;
        export const cKeyCode = 67;
        export const sKeyCode = 83;
        export const vKeyCode = 86;
        export const xKeyCode = 88;
        export const yKeyCode = 89;
        export const zKeyCode = 90;

        /** 
         * DOM Elements.
         */
        export const DocumentBody = 'body';
        export const Anchor = 'a';
        export const EditableTextElements = ':text, textarea';

        /** 
         * DOM Attributes and values.
         */
        export const disabledAttributeOrValue = 'disabled';
        export const readonlyAttributeOrValue = 'readonly';
        export const styleAttribute = 'style';
        export const hrefAttribute = 'href';
        export const targetAttribute = 'target';
        export const blankValue = '_blank';
        export const classAttribute = 'class';
        export const titleAttribute = 'title';
        export const srcAttribute = 'src';

        /**
         * DOM event names.
         */
        export const contextmenuEventName = 'contextmenu';
        export const blurEventName = 'blur';
        export const keyUpEventName = 'keyup';
        export const inputEventName = 'input';
        export const changeEventName = 'change';
        export const cutEventName = 'cut';
        export const keyDownEventName = 'keydown';
        export const mouseMoveEventName = 'mousemove';
        export const mouseDownEventName = 'mousedown';
        export const mouseEnterEventName = 'mouseenter';
        export const mouseLeaveEventName = 'mouseleave';
        export const mouseOverEventName = 'mouseover';
        export const mouseOutEventName = 'mouseout';
        export const mouseClickEventName = 'click';
        export const pasteEventName = 'paste';
        export const scrollEventName = 'scroll';
        export const dropEventName = 'drop';
        export const focusInEventName = 'focusin';
        export const focusOutEventName = 'focusout';
        export const selectEventName = 'select';
        export const messageEventName = 'message';
        export const loadEventName = 'load';
        export const beforeUnload = 'beforeunload';
        
        /**
         * Common DOM event combination names.
         */
        export const inputAndSelectEventNames = 'input, select';
    }
}