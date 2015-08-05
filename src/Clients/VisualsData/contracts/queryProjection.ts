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

module powerbi.data {

    /** Represents a projection from a query result. */
    export interface QueryProjection {
        /** Name of item in the semantic query Select clause. */
        queryRef: string;

        /** Optional format string. */
        format?: string; // TODO: Deprecate this, and populate format string through objects instead.
    }

    /** A set of QueryProjections, grouped by visualization property, and ordered within that property. */
    export interface QueryProjectionsByRole {
        [roleName: string]: QueryProjectionCollection;
    }

    export class QueryProjectionCollection {
        private items: QueryProjection[];

        public constructor(items: QueryProjection[]) {
            debug.assertValue(items, 'items');

            this.items = items;
        }

        /** Returns all projections in a mutable array. */
        public all(): QueryProjection[] {
            return this.items;
        }

        public clone(): QueryProjectionCollection {
            return new QueryProjectionCollection(_.clone(this.items));
        }
    }

    export module QueryProjectionsByRole {
        /** Clones the QueryProjectionsByRole. */
        export function clone(roles: QueryProjectionsByRole): QueryProjectionsByRole {
            debug.assertValue(roles, 'roles');

            var clonedRoles: QueryProjectionsByRole = {};

            for (let roleName in roles)
                clonedRoles[roleName] = roles[roleName].clone();

            return clonedRoles;
        }

        /** Returns the non-empty QueryProjectionCollection for that role.  Empty collections return undefined. */
        export function getRole(roles: QueryProjectionsByRole, name: string): QueryProjectionCollection {
            debug.assertAnyValue(roles, 'roles');
            debug.assertValue(name, 'name');

            if (!roles)
                return;

            let projections = roles[name];
            if (projections && projections.all().length > 0)
                return projections;
        }
    }
}