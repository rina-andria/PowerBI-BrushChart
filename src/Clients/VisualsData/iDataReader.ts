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

module powerbi.data {
    /** Represents a data reader. */
    export interface IDataReader {
        /** Executes a query, with a promise of completion.  The response object should be compatible with the transform implementation. */
        execute? (options: DataReaderExecutionOptions): RejectablePromise2<DataReaderData, IClientError>;

        /** Transforms the given data into a DataView.  When this function is not specified, the data is put on a property on the DataView. */
        transform? (obj: DataReaderData): DataReaderTransformResult;

        /** Stops all future communication and reject and pending communication  */
        stopCommunication? (): void;

        /** Resumes communication which enables future requests */
        resumeCommunication? (): void;

        /** Clear cache */
        clearCache? (): void;

        /** rewriteCacheEntries */
        rewriteCacheEntries? (rewriter: DataReaderCacheRewriter): void;
    }

    export interface DataReaderTransformResult {
        dataView?: DataView;
        restartToken?: RestartToken;
        error?: IClientError;
        warning?: IClientWarning;
    }

    export interface RestartToken {
    }

    /** Represents a custom data reader plugin, to be registered in the powerbi.data.plugins object. */
    export interface IDataReaderPlugin {
        /** The name of this plugin. */
        name: string;
        
        /** Factory method for the IDataReader. */
        create(hostServices: IDataReaderHostServices): IDataReader;
    }

    /** Represents a query command defined by an IDataReader. */
    export interface DataReaderCommand {
        // This interface is intentionally empty, as plugins define their own data structure.
    }

    /** Represents a data source defined by an IDataReader. */
    export interface DataReaderDataSource {
        // This interface is intentionally empty, as plugins define their own data structure.
    }

    /** Represents arbitrary data defined by an IDataReader. */
    export interface DataReaderData {
        // This interface is intentionally empty, as plugins define their own data structure.
    }

    /** Represents cacheRewriter that will rewrite the cache of reader as defined by an IDataReader. */
    export interface DataReaderCacheRewriter {
        // This interface is intentionally empty, as plugins define their own data structure.
    }

    export interface DataReaderExecutionOptions {
        dataSource?: DataReaderDataSource;
        command: DataReaderCommand;
        allowCache?: boolean;
        cacheResponseOnServer?: boolean;
    }

    export interface IDataReaderHostServices {
        promiseFactory(): IPromiseFactory;
    }
}
