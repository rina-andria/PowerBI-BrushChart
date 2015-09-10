// Type definitions for jQuery 1.10.x / 2.0.x
// Project: http://jquery.com/
// Definitions by: Boris Yankov <https://github.com/borisyankov/>, Christian Hoffmeister <https://github.com/choffmeister>, Steve Fenton <https://github.com/Steve-Fenton>, Diullei Gomes <https://github.com/Diullei>, Tass Iliopoulos <https://github.com/tasoili>, Jason Swearingen <https://github.com/jasons-novaleaf>, Sean Hill <https://github.com/seanski>, Guus Goossens <https://github.com/Guuz>, Kelly Summerlin <https://github.com/ksummerlin>, Basarat Ali Syed <https://github.com/basarat>, Nicholas Wolverson <https://github.com/nwolverson>, Derek Cicerone <https://github.com/derekcicerone>, Andrew Gaspar <https://github.com/AndrewGaspar>, James Harrison Fisher <https://github.com/jameshfisher>, Seikichi Kondo <https://github.com/seikichi>, Benjamin Jackman <https://github.com/benjaminjackman>, Poul Sorensen <https://github.com/s093294>, Josh Strobl <https://github.com/JoshStrobl>, John Reilly <https://github.com/johnnyreilly/>, Dick van den Brink <https://github.com/DickvdBrink>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

/* *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */


/**
 * Interface for the AJAX setting that will configure the AJAX request
 */
interface JQueryAjaxSettings {
    /**
     * The content type sent in the request header that tells the server what kind of response it will accept in return. If the accepts setting needs modification, it is recommended to do so once in the $.ajaxSetup() method.
     */
    accepts?: any;
    /**
     * By default, all requests are sent asynchronously (i.e. this is set to true by default). If you need synchronous requests, set this option to false. Cross-domain requests and dataType: "jsonp" requests do not support synchronous operation. Note that synchronous requests may temporarily lock the browser, disabling any actions while the request is active. As of jQuery 1.8, the use of async: false with jqXHR ($.Deferred) is deprecated; you must use the success/error/complete callback options instead of the corresponding methods of the jqXHR object such as jqXHR.done() or the deprecated jqXHR.success().
     */
    async?: boolean;
    /**
     * A pre-request callback function that can be used to modify the jqXHR (in jQuery 1.4.x, XMLHTTPRequest) object before it is sent. Use this to set custom headers, etc. The jqXHR and settings objects are passed as arguments. This is an Ajax Event. Returning false in the beforeSend function will cancel the request. As of jQuery 1.5, the beforeSend option will be called regardless of the type of request.
     */
    beforeSend? (jqXHR: JQueryXHR, settings: JQueryAjaxSettings): any;
    /**
     * If set to false, it will force requested pages not to be cached by the browser. Note: Setting cache to false will only work correctly with HEAD and GET requests. It works by appending "_={timestamp}" to the GET parameters. The parameter is not needed for other types of requests, except in IE8 when a POST is made to a URL that has already been requested by a GET.
     */
    cache?: boolean;
    /**
     * A function to be called when the request finishes (after success and error callbacks are executed). The function gets passed two arguments: The jqXHR (in jQuery 1.4.x, XMLHTTPRequest) object and a string categorizing the status of the request ("success", "notmodified", "error", "timeout", "abort", or "parsererror"). As of jQuery 1.5, the complete setting can accept an array of functions. Each function will be called in turn. This is an Ajax Event.
     */
    complete? (jqXHR: JQueryXHR, textStatus: string): any;
    /**
     * An object of string/regular-expression pairs that determine how jQuery will parse the response, given its content type. (version added: 1.5)
     */
    contents?: { [key: string]: any; };
    //According to jQuery.ajax source code, ajax's option actually allows contentType to set to "false"
    // https://github.com/borisyankov/DefinitelyTyped/issues/742
    /**
     * When sending data to the server, use this content type. Default is "application/x-www-form-urlencoded; charset=UTF-8", which is fine for most cases. If you explicitly pass in a content-type to $.ajax(), then it is always sent to the server (even if no data is sent). The W3C XMLHttpRequest specification dictates that the charset is always UTF-8; specifying another charset will not force the browser to change the encoding.
     */
    contentType?: any;
    /**
     * This object will be made the context of all Ajax-related callbacks. By default, the context is an object that represents the ajax settings used in the call ($.ajaxSettings merged with the settings passed to $.ajax).
     */
    context?: any;
    /**
     * An object containing dataType-to-dataType converters. Each converter's value is a function that returns the transformed value of the response. (version added: 1.5)
     */
    converters?: { [key: string]: any; };
    /**
     * If you wish to force a crossDomain request (such as JSONP) on the same domain, set the value of crossDomain to true. This allows, for example, server-side redirection to another domain. (version added: 1.5)
     */
    crossDomain?: boolean;
    /**
     * Data to be sent to the server. It is converted to a query string, if not already a string. It's appended to the url for GET-requests. See processData option to prevent this automatic processing. Object must be Key/Value pairs. If value is an Array, jQuery serializes multiple values with same key based on the value of the traditional setting (described below).
     */
    data?: any;
    /**
     * A function to be used to handle the raw response data of XMLHttpRequest.This is a pre-filtering function to sanitize the response. You should return the sanitized data. The function accepts two arguments: The raw data returned from the server and the 'dataType' parameter.
     */
    dataFilter? (data: any, ty: any): any;
    /**
     * The type of data that you're expecting back from the server. If none is specified, jQuery will try to infer it based on the MIME type of the response (an XML MIME type will yield XML, in 1.4 JSON will yield a JavaScript object, in 1.4 script will execute the script, and anything else will be returned as a string). 
     */
    dataType?: string;
    /**
     * A function to be called if the request fails. The function receives three arguments: The jqXHR (in jQuery 1.4.x, XMLHttpRequest) object, a string describing the type of error that occurred and an optional exception object, if one occurred. Possible values for the second argument (besides null) are "timeout", "error", "abort", and "parsererror". When an HTTP error occurs, errorThrown receives the textual portion of the HTTP status, such as "Not Found" or "Internal Server Error." As of jQuery 1.5, the error setting can accept an array of functions. Each function will be called in turn. Note: This handler is not called for cross-domain script and cross-domain JSONP requests. This is an Ajax Event.
     */
    error? (jqXHR: JQueryXHR, textStatus: string, errorThrown: string): any;
    /**
     * Whether to trigger global Ajax event handlers for this request. The default is true. Set to false to prevent the global handlers like ajaxStart or ajaxStop from being triggered. This can be used to control various Ajax Events.
     */
    global?: boolean;
    /**
     * An object of additional header key/value pairs to send along with requests using the XMLHttpRequest transport. The header X-Requested-With: XMLHttpRequest is always added, but its default XMLHttpRequest value can be changed here. Values in the headers setting can also be overwritten from within the beforeSend function. (version added: 1.5)
     */
    headers?: { [key: string]: any; };
    /**
     * Allow the request to be successful only if the response has changed since the last request. This is done by checking the Last-Modified header. Default value is false, ignoring the header. In jQuery 1.4 this technique also checks the 'etag' specified by the server to catch unmodified data.
     */
    ifModified?: boolean;
    /**
     * Allow the current environment to be recognized as "local," (e.g. the filesystem), even if jQuery does not recognize it as such by default. The following protocols are currently recognized as local: file, *-extension, and widget. If the isLocal setting needs modification, it is recommended to do so once in the $.ajaxSetup() method. (version added: 1.5.1)
     */
    isLocal?: boolean;
    /**
     * Override the callback function name in a jsonp request. This value will be used instead of 'callback' in the 'callback=?' part of the query string in the url. So {jsonp:'onJSONPLoad'} would result in 'onJSONPLoad=?' passed to the server. As of jQuery 1.5, setting the jsonp option to false prevents jQuery from adding the "?callback" string to the URL or attempting to use "=?" for transformation. In this case, you should also explicitly set the jsonpCallback setting. For example, { jsonp: false, jsonpCallback: "callbackName" }
     */
    jsonp?: any;
    /**
     * Specify the callback function name for a JSONP request. This value will be used instead of the random name automatically generated by jQuery. It is preferable to let jQuery generate a unique name as it'll make it easier to manage the requests and provide callbacks and error handling. You may want to specify the callback when you want to enable better browser caching of GET requests. As of jQuery 1.5, you can also use a function for this setting, in which case the value of jsonpCallback is set to the return value of that function.
     */
    jsonpCallback?: any;
    /**
     * A mime type to override the XHR mime type. (version added: 1.5.1)
     */
    mimeType?: string;
    /**
     * A password to be used with XMLHttpRequest in response to an HTTP access authentication request.
     */
    password?: string;
    /**
     * By default, data passed in to the data option as an object (technically, anything other than a string) will be processed and transformed into a query string, fitting to the default content-type "application/x-www-form-urlencoded". If you want to send a DOMDocument, or other non-processed data, set this option to false.
     */
    processData?: boolean;
    /**
     * Only applies when the "script" transport is used (e.g., cross-domain requests with "jsonp" or "script" dataType and "GET" type). Sets the charset attribute on the script tag used in the request. Used when the character set on the local page is not the same as the one on the remote script.
     */
    scriptCharset?: string;
    /**
     * An object of numeric HTTP codes and functions to be called when the response has the corresponding code. f the request is successful, the status code functions take the same parameters as the success callback; if it results in an error (including 3xx redirect), they take the same parameters as the error callback. (version added: 1.5)
     */
    statusCode?: { [key: string]: any; };
    /**
     * A function to be called if the request succeeds. The function gets passed three arguments: The data returned from the server, formatted according to the dataType parameter; a string describing the status; and the jqXHR (in jQuery 1.4.x, XMLHttpRequest) object. As of jQuery 1.5, the success setting can accept an array of functions. Each function will be called in turn. This is an Ajax Event.
     */
    success? (data: any, textStatus: string, jqXHR: JQueryXHR): any;
    /**
     * Set a timeout (in milliseconds) for the request. This will override any global timeout set with $.ajaxSetup(). The timeout period starts at the point the $.ajax call is made; if several other requests are in progress and the browser has no connections available, it is possible for a request to time out before it can be sent. In jQuery 1.4.x and below, the XMLHttpRequest object will be in an invalid state if the request times out; accessing any object members may throw an exception. In Firefox 3.0+ only, script and JSONP requests cannot be cancelled by a timeout; the script will run even if it arrives after the timeout period.
     */
    timeout?: number;
    /**
     * Set this to true if you wish to use the traditional style of param serialization.
     */
    traditional?: boolean;
    /**
     * The type of request to make ("POST" or "GET"), default is "GET". Note: Other HTTP request methods, such as PUT and DELETE, can also be used here, but they are not supported by all browsers.
     */
    type?: string;
    /**
     * A string containing the URL to which the request is sent.
     */
    url?: string;
    /**
     * A username to be used with XMLHttpRequest in response to an HTTP access authentication request.
     */
    username?: string;
    /**
     * Callback for creating the XMLHttpRequest object. Defaults to the ActiveXObject when available (IE), the XMLHttpRequest otherwise. Override to provide your own implementation for XMLHttpRequest or enhancements to the factory.
     */
    xhr?: any;
    /**
     * An object of fieldName-fieldValue pairs to set on the native XHR object. For example, you can use it to set withCredentials to true for cross-domain requests if needed. In jQuery 1.5, the withCredentials property was not propagated to the native XHR and thus CORS requests requiring it would ignore this flag. For this reason, we recommend using jQuery 1.5.1+ should you require the use of it. (version added: 1.5.1)
     */
    xhrFields?: { [key: string]: any; };
}

/**
 * Interface for the jqXHR object
 */
interface JQueryXHR extends XMLHttpRequest, JQueryPromise<any> {
    /**
     * The .overrideMimeType() method may be used in the beforeSend() callback function, for example, to modify the response content-type header. As of jQuery 1.5.1, the jqXHR object also contains the overrideMimeType() method (it was available in jQuery 1.4.x, as well, but was temporarily removed in jQuery 1.5). 
     */
    overrideMimeType(mimeType: string): any;
    /**
     * Cancel the request. 
     *
     * @param statusText A string passed as the textStatus parameter for the done callback. Default value: "canceled"
     */
    abort(statusText?: string): void;
    /**
     * Incorporates the functionality of the .done() and .fail() methods, allowing (as of jQuery 1.8) the underlying Promise to be manipulated. Refer to deferred.then() for implementation details.
     */
    then(doneCallback: (data: any, textStatus: string, jqXHR: JQueryXHR) => void, failCallback?: (jqXHR: JQueryXHR, textStatus: string, errorThrown: any) => void): JQueryPromise<any>;
    /**
     * Property containing the parsed response if the response Content-Type is json
     */
    responseJSON?: any;
}

/**
 * Interface for the JQuery callback
 */
interface JQueryCallback {
    /**
     * Add a callback or a collection of callbacks to a callback list.
     * 
     * @param callbacks A function, or array of functions, that are to be added to the callback list.
     */
    add(callbacks: Function): JQueryCallback;
    /**
     * Add a callback or a collection of callbacks to a callback list.
     * 
     * @param callbacks A function, or array of functions, that are to be added to the callback list.
     */
    add(callbacks: Function[]): JQueryCallback;

    /**
     * Disable a callback list from doing anything more.
     */
    disable(): JQueryCallback;

    /**
     * Determine if the callbacks list has been disabled.
     */
    disabled(): boolean;

    /**
     * Remove all of the callbacks from a list.
     */
    empty(): JQueryCallback;

    /**
     * Call all of the callbacks with the given arguments
     * 
     * @param arguments The argument or list of arguments to pass back to the callback list.
     */
    fire(...arguments: any[]): JQueryCallback;

    /**
     * Determine if the callbacks have already been called at least once.
     */
    fired(): boolean;

    /**
     * Call all callbacks in a list with the given context and arguments.
     * 
     * @param context A reference to the context in which the callbacks in the list should be fired.
     * @param arguments An argument, or array of arguments, to pass to the callbacks in the list.
     */
    fireWith(context?: any, ...args: any[]): JQueryCallback;

    /**
     * Determine whether a supplied callback is in a list
     * 
     * @param callback The callback to search for.
     */
    has(callback: Function): boolean;

    /**
     * Lock a callback list in its current state.
     */
    lock(): JQueryCallback;

    /**
     * Determine if the callbacks list has been locked.
     */
    locked(): boolean;

    /**
     * Remove a callback or a collection of callbacks from a callback list.
     * 
     * @param callbacks A function, or array of functions, that are to be removed from the callback list.
     */
    remove(callbacks: Function): JQueryCallback;
    /**
     * Remove a callback or a collection of callbacks from a callback list.
     * 
     * @param callbacks A function, or array of functions, that are to be removed from the callback list.
     */
    remove(callbacks: Function[]): JQueryCallback;
}

/**
 * Allows jQuery Promises to interop with non-jQuery promises
 */
interface JQueryGenericPromise<T> {
    /**
     * Add handlers to be called when the Deferred object is resolved, rejected, or still in progress.
     * 
     * @param doneFilter A function that is called when the Deferred is resolved.
     * @param failFilter An optional function that is called when the Deferred is rejected.
     */
    then<U>(doneFilter: (value: T) => U, failFilter?: (reason: any) => U): JQueryGenericPromise<U>;
    /**
     * Add handlers to be called when the Deferred object is resolved, rejected, or still in progress.
     * 
     * @param doneFilter A function that is called when the Deferred is resolved.
     * @param failFilter An optional function that is called when the Deferred is rejected.
     */
    then<U>(doneFilter: (value: T) => JQueryGenericPromise<U>, failFilter?: (reason: any) => U): JQueryGenericPromise<U>;
    /**
     * Add handlers to be called when the Deferred object is resolved, rejected, or still in progress.
     * 
     * @param doneFilter A function that is called when the Deferred is resolved.
     * @param failFilter An optional function that is called when the Deferred is rejected.
     */
    then<U>(doneFilter: (value: T) => U, failFilter?: (reason: any) => JQueryGenericPromise<U>): JQueryGenericPromise<U>;
    /**
     * Add handlers to be called when the Deferred object is resolved, rejected, or still in progress.
     * 
     * @param doneFilter A function that is called when the Deferred is resolved.
     * @param failFilter An optional function that is called when the Deferred is rejected.
     */
    then<U>(doneFilter: (value: T) => JQueryGenericPromise<U>, failFilter?: (reason: any) => JQueryGenericPromise<U>): JQueryGenericPromise<U>;
}

/**
 * Interface for the JQuery promise/deferred callbacks
 */
interface JQueryPromiseCallback<T> {
    (value?: T, ...args: any[]): void;
}

interface JQueryPromiseOperator<T, R> {
    (callback: JQueryPromiseCallback<T>, ...callbacks: JQueryPromiseCallback<T>[]): JQueryPromise<R>;
    (callback: JQueryPromiseCallback<T>[], ...callbacks: JQueryPromiseCallback<T>[]): JQueryPromise<R>;
}

/**
 * Interface for the JQuery promise, part of callbacks
 */
interface JQueryPromise<T> {
    /**
     * Add handlers to be called when the Deferred object is either resolved or rejected.
     * 
     * @param alwaysCallbacks1 A function, or array of functions, that is called when the Deferred is resolved or rejected.
     * @param alwaysCallbacks2 Optional additional functions, or arrays of functions, that are called when the Deferred is resolved or rejected.
     */
    always: JQueryPromiseOperator<any, T>;
    /**
     * Add handlers to be called when the Deferred object is resolved.
     * 
     * @param doneCallbacks1 A function, or array of functions, that are called when the Deferred is resolved.
     * @param doneCallbacks2 Optional additional functions, or arrays of functions, that are called when the Deferred is resolved.
     */
    done: JQueryPromiseOperator<T, T>;
    /**
     * Add handlers to be called when the Deferred object is rejected.
     * 
     * @param failCallbacks1 A function, or array of functions, that are called when the Deferred is rejected.
     * @param failCallbacks2 Optional additional functions, or arrays of functions, that are called when the Deferred is rejected.
     */
    fail: JQueryPromiseOperator<any, T>;
    /**
     * Add handlers to be called when the Deferred object generates progress notifications.
     * 
     * @param progressCallbacks A function, or array of functions, to be called when the Deferred generates progress notifications.
     */
    progress(progressCallback: JQueryPromiseCallback<T>): JQueryPromise<T>;
    progress(progressCallbacks: JQueryPromiseCallback<T>[]): JQueryPromise<T>;

    /**
     * Determine the current state of a Deferred object.
     */
    state(): string;

    // Deprecated - given no typings
    pipe(doneFilter?: (x: any) => any, failFilter?: (x: any) => any, progressFilter?: (x: any) => any): JQueryPromise<any>;

    /**
     * Add handlers to be called when the Deferred object is resolved, rejected, or still in progress.
     * 
     * @param doneFilter A function that is called when the Deferred is resolved.
     * @param failFilter An optional function that is called when the Deferred is rejected.
     * @param progressFilter An optional function that is called when progress notifications are sent to the Deferred.
     */
    then<U>(doneFilter: (value: T) => U, failFilter?: (...reasons: any[]) => U, progressFilter?: (...progression: any[]) => any): JQueryPromise<U>;
    /**
     * Add handlers to be called when the Deferred object is resolved, rejected, or still in progress.
     * 
     * @param doneFilter A function that is called when the Deferred is resolved.
     * @param failFilter An optional function that is called when the Deferred is rejected.
     * @param progressFilter An optional function that is called when progress notifications are sent to the Deferred.
     */
    then<U>(doneFilter: (value: T) => JQueryGenericPromise<U>, failFilter?: (...reasons: any[]) => U, progressFilter?: (...progression: any[]) => any): JQueryPromise<U>;
    /**
     * Add handlers to be called when the Deferred object is resolved, rejected, or still in progress.
     * 
     * @param doneFilter A function that is called when the Deferred is resolved.
     * @param failFilter An optional function that is called when the Deferred is rejected.
     * @param progressFilter An optional function that is called when progress notifications are sent to the Deferred.
     */
    then<U>(doneFilter: (value: T) => U, failFilter?: (...reasons: any[]) => JQueryGenericPromise<U>, progressFilter?: (...progression: any[]) => any): JQueryPromise<U>;
    /**
     * Add handlers to be called when the Deferred object is resolved, rejected, or still in progress.
     * 
     * @param doneFilter A function that is called when the Deferred is resolved.
     * @param failFilter An optional function that is called when the Deferred is rejected.
     * @param progressFilter An optional function that is called when progress notifications are sent to the Deferred.
     */
    then<U>(doneFilter: (value: T) => JQueryGenericPromise<U>, failFilter?: (...reasons: any[]) => JQueryGenericPromise<U>, progressFilter?: (...progression: any[]) => any): JQueryPromise<U>;

    // Because JQuery Promises Suck
    /**
     * Add handlers to be called when the Deferred object is resolved, rejected, or still in progress.
     * 
     * @param doneFilter A function that is called when the Deferred is resolved.
     * @param failFilter An optional function that is called when the Deferred is rejected.
     * @param progressFilter An optional function that is called when progress notifications are sent to the Deferred.
     */
    then<U>(doneFilter: (...values: any[]) => U, failFilter?: (...reasons: any[]) => U, progressFilter?: (...progression: any[]) => any): JQueryPromise<U>;
    /**
     * Add handlers to be called when the Deferred object is resolved, rejected, or still in progress.
     * 
     * @param doneFilter A function that is called when the Deferred is resolved.
     * @param failFilter An optional function that is called when the Deferred is rejected.
     * @param progressFilter An optional function that is called when progress notifications are sent to the Deferred.
     */
    then<U>(doneFilter: (...values: any[]) => JQueryGenericPromise<U>, failFilter?: (...reasons: any[]) => U, progressFilter?: (...progression: any[]) => any): JQueryPromise<U>;
    /**
     * Add handlers to be called when the Deferred object is resolved, rejected, or still in progress.
     * 
     * @param doneFilter A function that is called when the Deferred is resolved.
     * @param failFilter An optional function that is called when the Deferred is rejected.
     * @param progressFilter An optional function that is called when progress notifications are sent to the Deferred.
     */
    then<U>(doneFilter: (...values: any[]) => U, failFilter?: (...reasons: any[]) => JQueryGenericPromise<U>, progressFilter?: (...progression: any[]) => any): JQueryPromise<U>;
    /**
     * Add handlers to be called when the Deferred object is resolved, rejected, or still in progress.
     * 
     * @param doneFilter A function that is called when the Deferred is resolved.
     * @param failFilter An optional function that is called when the Deferred is rejected.
     * @param progressFilter An optional function that is called when progress notifications are sent to the Deferred.
     */
    then<U>(doneFilter: (...values: any[]) => JQueryGenericPromise<U>, failFilter?: (...reasons: any[]) => JQueryGenericPromise<U>, progressFilter?: (...progression: any[]) => any): JQueryPromise<U>;
}

/**
 * Interface for the JQuery deferred, part of callbacks
 */
interface JQueryDeferred<T> extends JQueryPromise<T> {
    /**
     * Add handlers to be called when the Deferred object is either resolved or rejected.
     * 
     * @param alwaysCallbacks1 A function, or array of functions, that is called when the Deferred is resolved or rejected.
     * @param alwaysCallbacks2 Optional additional functions, or arrays of functions, that are called when the Deferred is resolved or rejected.
     */
    always(alwaysCallbacks1?: JQueryPromiseCallback<T>, ...alwaysCallbacks2: JQueryPromiseCallback<T>[]): JQueryDeferred<T>;
    always(alwaysCallbacks1?: JQueryPromiseCallback<T>[], ...alwaysCallbacks2: JQueryPromiseCallback<T>[]): JQueryDeferred<T>;
    always(alwaysCallbacks1?: JQueryPromiseCallback<T>, ...alwaysCallbacks2: any[]): JQueryDeferred<T>;
    always(alwaysCallbacks1?: JQueryPromiseCallback<T>[], ...alwaysCallbacks2: any[]): JQueryDeferred<T>;
    /**
     * Add handlers to be called when the Deferred object is resolved.
     * 
     * @param doneCallbacks1 A function, or array of functions, that are called when the Deferred is resolved.
     * @param doneCallbacks2 Optional additional functions, or arrays of functions, that are called when the Deferred is resolved.
     */
    done(doneCallbacks1?: JQueryPromiseCallback<T>, ...doneCallbacks2: JQueryPromiseCallback<T>[]): JQueryDeferred<T>;
    done(doneCallbacks1?: JQueryPromiseCallback<T>[], ...doneCallbacks2: JQueryPromiseCallback<T>[]): JQueryDeferred<T>;
    done(doneCallbacks1?: JQueryPromiseCallback<T>, ...doneCallbacks2: any[]): JQueryDeferred<T>;
    done(doneCallbacks1?: JQueryPromiseCallback<T>[], ...doneCallbacks2: any[]): JQueryDeferred<T>;
    /**
     * Add handlers to be called when the Deferred object is rejected.
     * 
     * @param failCallbacks1 A function, or array of functions, that are called when the Deferred is rejected.
     * @param failCallbacks2 Optional additional functions, or arrays of functions, that are called when the Deferred is rejected.
     */
    fail(failCallbacks1?: JQueryPromiseCallback<T>, ...failCallbacks2: JQueryPromiseCallback<T>[]): JQueryDeferred<T>;
    fail(failCallbacks1?: JQueryPromiseCallback<T>[], ...failCallbacks2: JQueryPromiseCallback<T>[]): JQueryDeferred<T>;
    fail(failCallbacks1?: JQueryPromiseCallback<T>, ...failCallbacks2: any[]): JQueryDeferred<T>;
    fail(failCallbacks1?: JQueryPromiseCallback<T>[], ...failCallbacks2: any[]): JQueryDeferred<T>;
    /**
     * Add handlers to be called when the Deferred object generates progress notifications.
     * 
     * @param progressCallbacks A function, or array of functions, to be called when the Deferred generates progress notifications.
     */
    progress(progressCallback: JQueryPromiseCallback<T>): JQueryDeferred<T>;
    progress(progressCallbacks: JQueryPromiseCallback<T>[]): JQueryDeferred<T>;

    /**
     * Call the progressCallbacks on a Deferred object with the given args.
     * 
     * @param args Optional arguments that are passed to the progressCallbacks.
     */
    notify(...args: any[]): JQueryDeferred<T>;

    /**
     * Call the progressCallbacks on a Deferred object with the given context and args.
     * 
     * @param context Context passed to the progressCallbacks as the this object.
     * @param args Optional arguments that are passed to the progressCallbacks.
     */
    notifyWith(context: any, ...args: any[]): JQueryDeferred<T>;

    /**
     * Reject a Deferred object and call any failCallbacks with the given args.
     * 
     * @param args Optional arguments that are passed to the failCallbacks.
     */
    reject(...args: any[]): JQueryDeferred<T>;
    /**
     * Reject a Deferred object and call any failCallbacks with the given context and args.
     * 
     * @param context Context passed to the failCallbacks as the this object.
     * @param args An optional array of arguments that are passed to the failCallbacks.
     */
    rejectWith(context: any, ...args: any[]): JQueryDeferred<T>;

    /**
     * Resolve a Deferred object and call any doneCallbacks with the given args.
     * 
     * @param value First argument passed to doneCallbacks.
     * @param args Optional subsequent arguments that are passed to the doneCallbacks.
     */
    resolve(value?: T, ...args: any[]): JQueryDeferred<T>;

    /**
     * Resolve a Deferred object and call any doneCallbacks with the given context and args.
     * 
     * @param context Context passed to the doneCallbacks as the this object.
     * @param args An optional array of arguments that are passed to the doneCallbacks.
     */
    resolveWith(context: any, ...args: any[]): JQueryDeferred<T>;

    /**
     * Return a Deferred's Promise object.
     * 
     * @param target Object onto which the promise methods have to be attached
     */
    promise(target?: any): JQueryPromise<T>;
}

/**
 * Interface of the JQuery extension of the W3C event object
 */
interface BaseJQueryEventObject extends Event {
    data: any;
    delegateTarget: Element;
    isDefaultPrevented(): boolean;
    isImmediatePropagationStopped(): boolean;
    isPropagationStopped(): boolean;
    namespace: string;
    originalEvent: Event;
    preventDefault(): any;
    relatedTarget: Element;
    result: any;
    stopImmediatePropagation(): void;
    stopPropagation(): void;
    pageX: number;
    pageY: number;
    which: number;
    metaKey: boolean;
}

interface JQueryInputEventObject extends BaseJQueryEventObject {
    altKey: boolean;
    ctrlKey: boolean;
    metaKey: boolean;
    shiftKey: boolean;
}

interface JQueryMouseEventObject extends JQueryInputEventObject {
    button: number;
    clientX: number;
    clientY: number;
    offsetX: number;
    offsetY: number;
    pageX: number;
    pageY: number;
    screenX: number;
    screenY: number;
}

interface JQueryKeyEventObject extends JQueryInputEventObject {
    char: any;
    charCode: number;
    key: any;
    keyCode: number;
}

interface JQueryEventObject extends BaseJQueryEventObject, JQueryInputEventObject, JQueryMouseEventObject, JQueryKeyEventObject {
}

/*
    Collection of properties of the current browser
*/

interface JQuerySupport {
    ajax?: boolean;
    boxModel?: boolean;
    changeBubbles?: boolean;
    checkClone?: boolean;
    checkOn?: boolean;
    cors?: boolean;
    cssFloat?: boolean;
    hrefNormalized?: boolean;
    htmlSerialize?: boolean;
    leadingWhitespace?: boolean;
    noCloneChecked?: boolean;
    noCloneEvent?: boolean;
    opacity?: boolean;
    optDisabled?: boolean;
    optSelected?: boolean;
    scriptEval? (): boolean;
    style?: boolean;
    submitBubbles?: boolean;
    tbody?: boolean;
}

interface JQueryParam {
    /**
     * Create a serialized representation of an array or object, suitable for use in a URL query string or Ajax request.
     * 
     * @param obj An array or object to serialize.
     */
    (obj: any): string;

    /**
     * Create a serialized representation of an array or object, suitable for use in a URL query string or Ajax request.
     * 
     * @param obj An array or object to serialize.
     * @param traditional A Boolean indicating whether to perform a traditional "shallow" serialization.
     */
    (obj: any, traditional: boolean): string;
}

/**
 * The interface used to construct jQuery events (with $.Event). It is
 * defined separately instead of inline in JQueryStatic to allow
 * overriding the construction function with specific strings
 * returning specific event objects.
 */
interface JQueryEventConstructor {
    (name: string, eventProperties?: any): JQueryEventObject;
    new (name: string, eventProperties?: any): JQueryEventObject;
}

/**
 * The interface used to specify coordinates.
 */
interface JQueryCoordinates {
    left: number;
    top: number;
}

interface JQueryAnimationOptions {
    /**
     * A string or number determining how long the animation will run.
     */
    duration?: any;
    /**
     * A string indicating which easing function to use for the transition.
     */
    easing?: string;
    /**
     * A function to call once the animation is complete.
     */
    complete?: Function;
    /**
     * A function to be called for each animated property of each animated element. This function provides an opportunity to modify the Tween object to change the value of the property before it is set.
     */
    step?: (now: number, tween: any) => any;
    /**
     * A function to be called after each step of the animation, only once per animated element regardless of the number of animated properties. (version added: 1.8)
     */
    progress?: (animation: JQueryPromise<any>, progress: number, remainingMs: number) => any;
    /**
     * A function to call when the animation begins. (version added: 1.8)
     */
    start?: (animation: JQueryPromise<any>) => any;
    /**
     * A function to be called when the animation completes (its Promise object is resolved). (version added: 1.8)
     */
    done?: (animation: JQueryPromise<any>, jumpedToEnd: boolean) => any;
    /**
     * A function to be called when the animation fails to complete (its Promise object is rejected). (version added: 1.8)
     */
    fail?: (animation: JQueryPromise<any>, jumpedToEnd: boolean) => any;
    /**
     * A function to be called when the animation completes or stops without completing (its Promise object is either resolved or rejected). (version added: 1.8)
     */
    always?: (animation: JQueryPromise<any>, jumpedToEnd: boolean) => any;
    /**
     * A Boolean indicating whether to place the animation in the effects queue. If false, the animation will begin immediately. As of jQuery 1.7, the queue option can also accept a string, in which case the animation is added to the queue represented by that string. When a custom queue name is used the animation does not automatically start; you must call .dequeue("queuename") to start it.
     */
    queue?: any;
    /**
     * A map of one or more of the CSS properties defined by the properties argument and their corresponding easing functions. (version added: 1.4)
     */
    specialEasing?: Object;
}

/**
 * Static members of jQuery (those on $ and jQuery themselves)
 */
interface JQueryStatic {

    /**
     * Perform an asynchronous HTTP (Ajax) request.
     *
     * @param settings A set of key/value pairs that configure the Ajax request. All settings are optional. A default can be set for any option with $.ajaxSetup().
     */
    ajax(settings: JQueryAjaxSettings): JQueryXHR;
    /**
     * Perform an asynchronous HTTP (Ajax) request.
     *
     * @param url A string containing the URL to which the request is sent.
     * @param settings A set of key/value pairs that configure the Ajax request. All settings are optional. A default can be set for any option with $.ajaxSetup().
     */
    ajax(url: string, settings?: JQueryAjaxSettings): JQueryXHR;

    /**
     * Handle custom Ajax options or modify existing options before each request is sent and before they are processed by $.ajax().
     *
     * @param dataTypes An optional string containing one or more space-separated dataTypes
     * @param handler A handler to set default values for future Ajax requests.
     */
    ajaxPrefilter(dataTypes: string, handler: (opts: any, originalOpts: JQueryAjaxSettings, jqXHR: JQueryXHR) => any): void;
    /**
     * Handle custom Ajax options or modify existing options before each request is sent and before they are processed by $.ajax().
     *
     * @param handler A handler to set default values for future Ajax requests.
     */
    ajaxPrefilter(handler: (opts: any, originalOpts: JQueryAjaxSettings, jqXHR: JQueryXHR) => any): void;

    ajaxSettings: JQueryAjaxSettings;

    /**
     * Set default values for future Ajax requests. Its use is not recommended.
     *
     * @param options A set of key/value pairs that configure the default Ajax request. All options are optional.
     */
    ajaxSetup(options: JQueryAjaxSettings): void;

    /**
     * Load data from the server using a HTTP GET request.
     *
     * @param url A string containing the URL to which the request is sent.
     * @param success A callback function that is executed if the request succeeds.
     * @param dataType The type of data expected from the server. Default: Intelligent Guess (xml, json, script, or html).
     */
    get(url: string, success?: (data: any, textStatus: string, jqXHR: JQueryXHR) => any, dataType?: string): JQueryXHR;
    /**
     * Load data from the server using a HTTP GET request.
     *
     * @param url A string containing the URL to which the request is sent.
     * @param data A plain object or string that is sent to the server with the request.
     * @param success A callback function that is executed if the request succeeds.
     * @param dataType The type of data expected from the server. Default: Intelligent Guess (xml, json, script, or html).
     */
    get(url: string, data?: Object, success?: (data: any, textStatus: string, jqXHR: JQueryXHR) => any, dataType?: string): JQueryXHR;
    /**
     * Load data from the server using a HTTP GET request.
     *
     * @param url A string containing the URL to which the request is sent.
     * @param data A plain object or string that is sent to the server with the request.
     * @param success A callback function that is executed if the request succeeds.
     * @param dataType The type of data expected from the server. Default: Intelligent Guess (xml, json, script, or html).
     */
    get(url: string, data?: string, success?: (data: any, textStatus: string, jqXHR: JQueryXHR) => any, dataType?: string): JQueryXHR;
    /**
     * Load JSON-encoded data from the server using a GET HTTP request.
     *
     * @param url A string containing the URL to which the request is sent.
     * @param success A callback function that is executed if the request succeeds.
     */
    getJSON(url: string, success?: (data: any, textStatus: string, jqXHR: JQueryXHR) => any): JQueryXHR;
    /**
     * Load JSON-encoded data from the server using a GET HTTP request.
     *
     * @param url A string containing the URL to which the request is sent.
     * @param data A plain object or string that is sent to the server with the request.
     * @param success A callback function that is executed if the request succeeds.
     */
    getJSON(url: string, data?: Object, success?: (data: any, textStatus: string, jqXHR: JQueryXHR) => any): JQueryXHR;
    /**
     * Load JSON-encoded data from the server using a GET HTTP request.
     *
     * @param url A string containing the URL to which the request is sent.
     * @param data A plain object or string that is sent to the server with the request.
     * @param success A callback function that is executed if the request succeeds.
     */
    getJSON(url: string, data?: string, success?: (data: any, textStatus: string, jqXHR: JQueryXHR) => any): JQueryXHR;
    /**
     * Load a JavaScript file from the server using a GET HTTP request, then execute it.
     *
     * @param url A string containing the URL to which the request is sent.
     * @param success A callback function that is executed if the request succeeds.
     */
    getScript(url: string, success?: (script: string, textStatus: string, jqXHR: JQueryXHR) => any): JQueryXHR;

    /**
     * Create a serialized representation of an array or object, suitable for use in a URL query string or Ajax request.
     */
    param: JQueryParam;

    /**
     * Load data from the server using a HTTP POST request.
     *
     * @param url A string containing the URL to which the request is sent.
     * @param success A callback function that is executed if the request succeeds. Required if dataType is provided, but can be null in that case.
     * @param dataType The type of data expected from the server. Default: Intelligent Guess (xml, json, script, text, html).
     */
    post(url: string, success?: (data: any, textStatus: string, jqXHR: JQueryXHR) => any, dataType?: string): JQueryXHR;
    /**
     * Load data from the server using a HTTP POST request.
     *
     * @param url A string containing the URL to which the request is sent.
     * @param data A plain object or string that is sent to the server with the request.
     * @param success A callback function that is executed if the request succeeds. Required if dataType is provided, but can be null in that case.
     * @param dataType The type of data expected from the server. Default: Intelligent Guess (xml, json, script, text, html).
     */
    post(url: string, data?: Object, success?: (data: any, textStatus: string, jqXHR: JQueryXHR) => any, dataType?: string): JQueryXHR;
    /**
     * Load data from the server using a HTTP POST request.
     *
     * @param url A string containing the URL to which the request is sent.
     * @param data A plain object or string that is sent to the server with the request.
     * @param success A callback function that is executed if the request succeeds. Required if dataType is provided, but can be null in that case.
     * @param dataType The type of data expected from the server. Default: Intelligent Guess (xml, json, script, text, html).
     */
    post(url: string, data?: string, success?: (data: any, textStatus: string, jqXHR: JQueryXHR) => any, dataType?: string): JQueryXHR;

    /**
     * A multi-purpose callbacks list object that provides a powerful way to manage callback lists.
     *
     * @param flags An optional list of space-separated flags that change how the callback list behaves.
     */
    Callbacks(flags?: string): JQueryCallback;

    /**
     * Holds or releases the execution of jQuery's ready event.
     *
     * @param hold Indicates whether the ready hold is being requested or released
     */
    holdReady(hold: boolean): void;

    /**
     * Accepts a string containing a CSS selector which is then used to match a set of elements.
     *
     * @param selector A string containing a selector expression
     * @param context A DOM Element, Document, or jQuery to use as context
     */
    (selector: string, context?: Element): JQuery;
    /**
     * Accepts a string containing a CSS selector which is then used to match a set of elements.
     *
     * @param selector A string containing a selector expression
     * @param context A DOM Element, Document, or jQuery to use as context
     */
    (selector: string, context?: JQuery): JQuery;
    /**
     * Accepts a string containing a CSS selector which is then used to match a set of elements.
     *
     * @param element A DOM element to wrap in a jQuery object.
     */
    (element: Element): JQuery;
    /**
     * Accepts a string containing a CSS selector which is then used to match a set of elements.
     *
     * @param elementArray An array containing a set of DOM elements to wrap in a jQuery object.
     */
    (elementArray: Element[]): JQuery;
    /**
     * Accepts a string containing a CSS selector which is then used to match a set of elements.
     *
     * @param object A plain object to wrap in a jQuery object.
     */
    (object: {}): JQuery;
    /**
     * Accepts a string containing a CSS selector which is then used to match a set of elements.
     *
     * @param object An existing jQuery object to clone.
     */
    (object: JQuery): JQuery;
    /**
     * Specify a function to execute when the DOM is fully loaded.
     */
    (): JQuery;

    /**
     * Creates DOM elements on the fly from the provided string of raw HTML.
     *
     * @param html A string of HTML to create on the fly. Note that this parses HTML, not XML.
     * @param ownerDocument A document in which the new elements will be created.
     */
    (html: string, ownerDocument?: Document): JQuery;
    /**
     * Creates DOM elements on the fly from the provided string of raw HTML.
     *
     * @param html A string defining a single, standalone, HTML element (e.g. <div/> or <div></div>).
     * @param attributes An object of attributes, events, and methods to call on the newly-created element.
     */
    (html: string, attributes: Object): JQuery;

    /**
     * Binds a function to be executed when the DOM has finished loading.
     *
     * @param callback A function to execute after the DOM is ready.
     */
    (callback: Function): JQuery;

    /**
     * Relinquish jQuery's control of the $ variable.
     *
     * @param removeAll A Boolean indicating whether to remove all jQuery variables from the global scope (including jQuery itself).
     */
    noConflict(removeAll?: boolean): Object;

    /**
     * Provides a way to execute callback functions based on one or more objects, usually Deferred objects that represent asynchronous events.
     *
     * @param deferreds One or more Deferred objects, or plain JavaScript objects.
     */
    when<T>(...deferreds: JQueryGenericPromise<T>[]): JQueryPromise<T>;
    /**
     * Provides a way to execute callback functions based on one or more objects, usually Deferred objects that represent asynchronous events.
     *
     * @param deferreds One or more Deferred objects, or plain JavaScript objects.
     */
    when<T>(...deferreds: T[]): JQueryPromise<T>;
    /**
     * Provides a way to execute callback functions based on one or more objects, usually Deferred objects that represent asynchronous events.
     *
     * @param deferreds One or more Deferred objects, or plain JavaScript objects.
     */
    when<T>(...deferreds: any[]): JQueryPromise<T>;

    /**
     * Hook directly into jQuery to override how particular CSS properties are retrieved or set, normalize CSS property naming, or create custom properties.
     */
    cssHooks: { [key: string]: any; };
    cssNumber: any;

    /**
     * Store arbitrary data associated with the specified element. Returns the value that was set.
     *
     * @param element The DOM element to associate with the data.
     * @param key A string naming the piece of data to set.
     * @param value The new data value.
     */
    data<T>(element: Element, key: string, value: T): T;
    /**
     * Returns value at named data store for the element, as set by jQuery.data(element, name, value), or the full data store for the element.
     *
     * @param element The DOM element to associate with the data.
     * @param key A string naming the piece of data to set.
     */
    data(element: Element, key: string): any;
    /**
     * Returns value at named data store for the element, as set by jQuery.data(element, name, value), or the full data store for the element.
     *
     * @param element The DOM element to associate with the data.
     */
    data(element: Element): any;

    /**
     * Execute the next function on the queue for the matched element.
     *
     * @param element A DOM element from which to remove and execute a queued function.
     * @param queueName A string containing the name of the queue. Defaults to fx, the standard effects queue.
     */
    dequeue(element: Element, queueName?: string): void;

    /**
     * Determine whether an element has any jQuery data associated with it.
     *
     * @param element A DOM element to be checked for data.
     */
    hasData(element: Element): boolean;

    /**
     * Show the queue of functions to be executed on the matched element.
     *
     * @param element A DOM element to inspect for an attached queue.
     * @param queueName A string containing the name of the queue. Defaults to fx, the standard effects queue.
     */
    queue(element: Element, queueName?: string): any[];
    /**
     * Manipulate the queue of functions to be executed on the matched element.
     *
     * @param element A DOM element where the array of queued functions is attached.
     * @param queueName A string containing the name of the queue. Defaults to fx, the standard effects queue.
     * @param newQueue An array of functions to replace the current queue contents.
     */
    queue(element: Element, queueName: string, newQueue: Function[]): JQuery;
    /**
     * Manipulate the queue of functions to be executed on the matched element.
     *
     * @param element A DOM element on which to add a queued function.
     * @param queueName A string containing the name of the queue. Defaults to fx, the standard effects queue.
     * @param callback The new function to add to the queue.
     */
    queue(element: Element, queueName: string, callback: Function): JQuery;

    /**
     * Remove a previously-stored piece of data.
     *
     * @param element A DOM element from which to remove data.
     * @param name A string naming the piece of data to remove.
     */
    removeData(element: Element, name?: string): JQuery;

    /**
     * A constructor function that returns a chainable utility object with methods to register multiple callbacks into callback queues, invoke callback queues, and relay the success or failure state of any synchronous or asynchronous function.
     *
     * @param beforeStart A function that is called just before the constructor returns.
     */
    Deferred<T>(beforeStart?: (deferred: JQueryDeferred<T>) => any): JQueryDeferred<T>;

    /**
     * Effects
     */
    fx: {
        tick: () => void;
        /**
         * The rate (in milliseconds) at which animations fire.
         */
        interval: number;
        stop: () => void;
        speeds: { slow: number; fast: number; };
        /**
         * Globally disable all animations.
         */
        off: boolean;
        step: any;
    };

    /**
     * Takes a function and returns a new one that will always have a particular context.
     *
     * @param fnction The function whose context will be changed.
     * @param context The object to which the context (this) of the function should be set.
     * @param additionalArguments Any number of arguments to be passed to the function referenced in the function argument.
     */
    proxy(fnction: (...args: any[]) => any, context: Object, ...additionalArguments: any[]): any;
    /**
     * Takes a function and returns a new one that will always have a particular context.
     *
     * @param context The object to which the context (this) of the function should be set.
     * @param name The name of the function whose context will be changed (should be a property of the context object).
     * @param additionalArguments Any number of arguments to be passed to the function named in the name argument.
     */
    proxy(context: Object, name: string, ...additionalArguments: any[]): any;

    Event: JQueryEventConstructor;

    /**
     * Takes a string and throws an exception containing it.
     *
     * @param message The message to send out.
     */
    error(message: any): JQuery;

    expr: any;
    fn: any;  //TODO: Decide how we want to type this

    isReady: boolean;

    // Properties
    support: JQuerySupport;

    /**
     * Check to see if a DOM element is a descendant of another DOM element.
     * 
     * @param container The DOM element that may contain the other element.
     * @param contained The DOM element that may be contained by (a descendant of) the other element.
     */
    contains(container: Element, contained: Element): boolean;

    /**
     * A generic iterator function, which can be used to seamlessly iterate over both objects and arrays. Arrays and array-like objects with a length property (such as a function's arguments object) are iterated by numeric index, from 0 to length-1. Other objects are iterated via their named properties.
     * 
     * @param collection The object or array to iterate over.
     * @param callback The function that will be executed on every object.
     */
    each<T>(
        collection: T[],
        callback: (indexInArray: number, valueOfElement: T) => any
        ): any;

    /**
     * A generic iterator function, which can be used to seamlessly iterate over both objects and arrays. Arrays and array-like objects with a length property (such as a function's arguments object) are iterated by numeric index, from 0 to length-1. Other objects are iterated via their named properties.
     * 
     * @param collection The object or array to iterate over.
     * @param callback The function that will be executed on every object.
     */
    each(
        collection: any,
        callback: (indexInArray: any, valueOfElement: any) => any
        ): any;

    /**
     * Merge the contents of two or more objects together into the first object.
     *
     * @param target An object that will receive the new properties if additional objects are passed in or that will extend the jQuery namespace if it is the sole argument.
     * @param object1 An object containing additional properties to merge in.
     * @param objectN Additional objects containing properties to merge in.
     */
    extend(target: any, object1?: any, ...objectN: any[]): any;
    /**
     * Merge the contents of two or more objects together into the first object.
     *
     * @param deep If true, the merge becomes recursive (aka. deep copy).
     * @param target The object to extend. It will receive the new properties.
     * @param object1 An object containing additional properties to merge in.
     * @param objectN Additional objects containing properties to merge in.
     */
    extend(deep: boolean, target: any, object1?: any, ...objectN: any[]): any;

    /**
     * Execute some JavaScript code globally.
     *
     * @param code The JavaScript code to execute.
     */
    globalEval(code: string): any;

    /**
     * Finds the elements of an array which satisfy a filter function. The original array is not affected.
     *
     * @param array The array to search through.
     * @param func The function to process each item against. The first argument to the function is the item, and the second argument is the index. The function should return a Boolean value.  this will be the global window object.
     * @param invert If "invert" is false, or not provided, then the function returns an array consisting of all elements for which "callback" returns true. If "invert" is true, then the function returns an array consisting of all elements for which "callback" returns false.
     */
    grep<T>(array: T[], func: (elementOfArray: T, indexInArray: number) => boolean, invert?: boolean): T[];

    /**
     * Search for a specified value within an array and return its index (or -1 if not found).
     *
     * @param value The value to search for.
     * @param array An array through which to search.
     * @param fromIndex he index of the array at which to begin the search. The default is 0, which will search the whole array.
     */
    inArray<T>(value: T, array: T[], fromIndex?: number): number;

    /**
     * Determine whether the argument is an array.
     *
     * @param obj Object to test whether or not it is an array.
     */
    isArray(obj: any): boolean;
    /**
     * Check to see if an object is empty (contains no enumerable properties).
     *
     * @param obj The object that will be checked to see if it's empty.
     */
    isEmptyObject(obj: any): boolean;
    /**
     * Determine if the argument passed is a Javascript function object.
     *
     * @param obj Object to test whether or not it is a function.
     */
    isFunction(obj: any): boolean;
    /**
     * Determines whether its argument is a number.
     *
     * @param obj The value to be tested.
     */
    isNumeric(value: any): boolean;
    /**
     * Check to see if an object is a plain object (created using "{}" or "new Object").
     *
     * @param obj The object that will be checked to see if it's a plain object.
     */
    isPlainObject(obj: any): boolean;
    /**
     * Determine whether the argument is a window.
     *
     * @param obj Object to test whether or not it is a window.
     */
    isWindow(obj: any): boolean;
    /**
     * Check to see if a DOM node is within an XML document (or is an XML document).
     *
     * @param node he DOM node that will be checked to see if it's in an XML document.
     */
    isXMLDoc(node: Node): boolean;

    /**
     * Convert an array-like object into a true JavaScript array.
     * 
     * @param obj Any object to turn into a native Array.
     */
    makeArray(obj: any): any[];

    /**
     * Translate all items in an array or object to new array of items.
     * 
     * @param array The Array to translate.
     * @param callback The function to process each item against. The first argument to the function is the array item, the second argument is the index in array The function can return any value. Within the function, this refers to the global (window) object.
     */
    map<T, U>(array: T[], callback: (elementOfArray: T, indexInArray: number) => U): U[];
    /**
     * Translate all items in an array or object to new array of items.
     * 
     * @param arrayOrObject The Array or Object to translate.
     * @param callback The function to process each item against. The first argument to the function is the value; the second argument is the index or key of the array or object property. The function can return any value to add to the array. A returned array will be flattened into the resulting array. Within the function, this refers to the global (window) object.
     */
    map(arrayOrObject: any, callback: (value: any, indexOrKey: any) => any): any;

    /**
     * Merge the contents of two arrays together into the first array.
     * 
     * @param first The first array to merge, the elements of second added.
     * @param second The second array to merge into the first, unaltered.
     */
    merge<T>(first: T[], second: T[]): T[];

    /**
     * An empty function.
     */
    noop(): any;

    /**
     * Return a number representing the current time.
     */
    now(): number;

    /**
     * Takes a well-formed JSON string and returns the resulting JavaScript object.
     * 
     * @param json The JSON string to parse.
     */
    parseJSON(json: string): any;

    /**
     * Parses a string into an XML document.
     *
     * @param data a well-formed XML string to be parsed
     */
    parseXML(data: string): XMLDocument;

    /**
     * Remove the whitespace from the beginning and end of a string.
     * 
     * @param str Remove the whitespace from the beginning and end of a string.
     */
    trim(str: string): string;

    /**
     * Determine the internal JavaScript [[Class]] of an object.
     * 
     * @param obj Object to get the internal JavaScript [[Class]] of.
     */
    type(obj: any): string;

    /**
     * Sorts an array of DOM elements, in place, with the duplicates removed. Note that this only works on arrays of DOM elements, not strings or numbers.
     * 
     * @param array The Array of DOM elements.
     */
    unique(array: Element[]): Element[];

    /**
     * Parses a string into an array of DOM nodes.
     *
     * @param data HTML string to be parsed
     * @param context DOM element to serve as the context in which the HTML fragment will be created
     * @param keepScripts A Boolean indicating whether to include scripts passed in the HTML string
     */
    parseHTML(data: string, context?: HTMLElement, keepScripts?: boolean): any[];

    /**
     * Parses a string into an array of DOM nodes.
     *
     * @param data HTML string to be parsed
     * @param context DOM element to serve as the context in which the HTML fragment will be created
     * @param keepScripts A Boolean indicating whether to include scripts passed in the HTML string
     */
    parseHTML(data: string, context?: Document, keepScripts?: boolean): any[];
}

/**
 * The jQuery instance members
 */
interface JQuery {
    /**
     * Register a handler to be called when Ajax requests complete. This is an AjaxEvent.
     *
     * @param handler The function to be invoked.
     */
    ajaxComplete(handler: (event: JQueryEventObject, XMLHttpRequest: XMLHttpRequest, ajaxOptions: any) => any): JQuery;
    /**
     * Register a handler to be called when Ajax requests complete with an error. This is an Ajax Event.
     *
     * @param handler The function to be invoked.
     */
    ajaxError(handler: (event: JQueryEventObject, jqXHR: JQueryXHR, ajaxSettings: JQueryAjaxSettings, thrownError: any) => any): JQuery;
    /**
     * Attach a function to be executed before an Ajax request is sent. This is an Ajax Event.
     *
     * @param handler The function to be invoked.
     */
    ajaxSend(handler: (event: JQueryEventObject, jqXHR: JQueryXHR, ajaxOptions: JQueryAjaxSettings) => any): JQuery;
    /**
     * Register a handler to be called when the first Ajax request begins. This is an Ajax Event.
     *
     * @param handler The function to be invoked.
     */
    ajaxStart(handler: () => any): JQuery;
    /**
     * Register a handler to be called when all Ajax requests have completed. This is an Ajax Event.
     *
     * @param handler The function to be invoked.
     */
    ajaxStop(handler: () => any): JQuery;
    /**
     * Attach a function to be executed whenever an Ajax request completes successfully. This is an Ajax Event.
     *
     * @param handler The function to be invoked.
     */
    ajaxSuccess(handler: (event: JQueryEventObject, XMLHttpRequest: XMLHttpRequest, ajaxOptions: JQueryAjaxSettings) => any): JQuery;

    /**
     * Load data from the server and place the returned HTML into the matched element.
     *
     * @param url A string containing the URL to which the request is sent.
     * @param data A plain object or string that is sent to the server with the request.
     * @param complete A callback function that is executed when the request completes.
     */
    load(url: string, data?: string, complete?: (responseText: string, textStatus: string, XMLHttpRequest: XMLHttpRequest) => any): JQuery;
    /**
     * Load data from the server and place the returned HTML into the matched element.
     *
     * @param url A string containing the URL to which the request is sent.
     * @param data A plain object or string that is sent to the server with the request.
     * @param complete A callback function that is executed when the request completes.
     */
    load(url: string, data?: Object, complete?: (responseText: string, textStatus: string, XMLHttpRequest: XMLHttpRequest) => any): JQuery;

    /**
     * Encode a set of form elements as a string for submission.
     */
    serialize(): string;
    /**
     * Encode a set of form elements as an array of names and values.
     */
    serializeArray(): Object[];

    /**
     * Adds the specified class(es) to each of the set of matched elements.
     *
     * @param className One or more space-separated classes to be added to the class attribute of each matched element.
     */
    addClass(className: string): JQuery;
    /**
     * Adds the specified class(es) to each of the set of matched elements.
     *
     * @param function A function returning one or more space-separated class names to be added to the existing class name(s). Receives the index position of the element in the set and the existing class name(s) as arguments. Within the function, this refers to the current element in the set.
     */
    addClass(func: (index: number, className: string) => string): JQuery;

    /**
     * Add the previous set of elements on the stack to the current set, optionally filtered by a selector.
     */
    addBack(selector?: string): JQuery;

    /**
     * Get the value of an attribute for the first element in the set of matched elements.
     *
     * @param attributeName The name of the attribute to get.
     */
    attr(attributeName: string): string;
    /**
     * Set one or more attributes for the set of matched elements.
     *
     * @param attributeName The name of the attribute to set.
     * @param value A value to set for the attribute.
     */
    attr(attributeName: string, value: string): JQuery;
    /**
     * Set one or more attributes for the set of matched elements.
     *
     * @param attributeName The name of the attribute to set.
     * @param value A value to set for the attribute.
     */
    attr(attributeName: string, value: number): JQuery;
    /**
     * Set one or more attributes for the set of matched elements.
     *
     * @param attributeName The name of the attribute to set.
     * @param func A function returning the value to set. this is the current element. Receives the index position of the element in the set and the old attribute value as arguments.
     */
    attr(attributeName: string, func: (index: number, attr: any) => any): JQuery;
    /**
     * Set one or more attributes for the set of matched elements.
     *
     * @param attributes An object of attribute-value pairs to set.
     */
    attr(attributes: Object): JQuery;

    /**
     * Determine whether any of the matched elements are assigned the given class.
     *
     * @param className The class name to search for.
     */
    hasClass(className: string): boolean;

    /**
     * Get the HTML contents of the first element in the set of matched elements.
     */
    html(): string;
    /**
     * Set the HTML contents of each element in the set of matched elements.
     *
     * @param htmlString A string of HTML to set as the content of each matched element.
     */
    html(htmlString: string): JQuery;
    /**
     * Set the HTML contents of each element in the set of matched elements.
     *
     * @param func A function returning the HTML content to set. Receives the index position of the element in the set and the old HTML value as arguments. jQuery empties the element before calling the function; use the oldhtml argument to reference the previous content. Within the function, this refers to the current element in the set.
     */
    html(func: (index: number, oldhtml: string) => string): JQuery;
    /**
     * Set the HTML contents of each element in the set of matched elements.
     *
     * @param func A function returning the HTML content to set. Receives the index position of the element in the set and the old HTML value as arguments. jQuery empties the element before calling the function; use the oldhtml argument to reference the previous content. Within the function, this refers to the current element in the set.
     */

    /**
     * Get the value of a property for the first element in the set of matched elements.
     *
     * @param propertyName The name of the property to get.
     */
    prop(propertyName: string): any;
    /**
     * Set one or more properties for the set of matched elements.
     *
     * @param propertyName The name of the property to set.
     * @param value A value to set for the property.
     */
    prop(propertyName: string, value: string): JQuery;
    /**
     * Set one or more properties for the set of matched elements.
     *
     * @param propertyName The name of the property to set.
     * @param value A value to set for the property.
     */
    prop(propertyName: string, value: number): JQuery;
    /**
     * Set one or more properties for the set of matched elements.
     *
     * @param propertyName The name of the property to set.
     * @param value A value to set for the property.
     */
    prop(propertyName: string, value: boolean): JQuery;
    /**
     * Set one or more properties for the set of matched elements.
     *
     * @param properties An object of property-value pairs to set.
     */
    prop(properties: Object): JQuery;
    /**
     * Set one or more properties for the set of matched elements.
     *
     * @param propertyName The name of the property to set.
     * @param func A function returning the value to set. Receives the index position of the element in the set and the old property value as arguments. Within the function, the keyword this refers to the current element.
     */
    prop(propertyName: string, func: (index: number, oldPropertyValue: any) => any): JQuery;

    /**
     * Remove an attribute from each element in the set of matched elements.
     *
     * @param attributeName An attribute to remove; as of version 1.7, it can be a space-separated list of attributes.
     */
    removeAttr(attributeName: string): JQuery;

    /**
     * Remove a single class, multiple classes, or all classes from each element in the set of matched elements.
     *
     * @param className One or more space-separated classes to be removed from the class attribute of each matched element.
     */
    removeClass(className?: string): JQuery;
    /**
     * Remove a single class, multiple classes, or all classes from each element in the set of matched elements.
     *
     * @param function A function returning one or more space-separated class names to be removed. Receives the index position of the element in the set and the old class value as arguments.
     */
    removeClass(func: (index: number, className: string) => string): JQuery;

    /**
     * Remove a property for the set of matched elements.
     *
     * @param propertyName The name of the property to remove.
     */
    removeProp(propertyName: string): JQuery;

    /**
     * Add or remove one or more classes from each element in the set of matched elements, depending on either the class's presence or the value of the switch argument.
     *
     * @param className One or more class names (separated by spaces) to be toggled for each element in the matched set.
     * @param swtch A Boolean (not just truthy/falsy) value to determine whether the class should be added or removed.
     */
    toggleClass(className: string, swtch?: boolean): JQuery;
    /**
     * Add or remove one or more classes from each element in the set of matched elements, depending on either the class's presence or the value of the switch argument.
     *
     * @param swtch A boolean value to determine whether the class should be added or removed.
     */
    toggleClass(swtch?: boolean): JQuery;
    /**
     * Add or remove one or more classes from each element in the set of matched elements, depending on either the class's presence or the value of the switch argument.
     *
     * @param func A function that returns class names to be toggled in the class attribute of each element in the matched set. Receives the index position of the element in the set, the old class value, and the switch as arguments.
     * @param swtch A boolean value to determine whether the class should be added or removed.
     */
    toggleClass(func: (index: number, className: string, swtch: boolean) => string, swtch?: boolean): JQuery;

    /**
     * Get the current value of the first element in the set of matched elements.
     */
    val(): any;
    /**
     * Set the value of each element in the set of matched elements.
     *
     * @param value A string of text or an array of strings corresponding to the value of each matched element to set as selected/checked.
     */
    val(value: string): JQuery;
    /**
     * Set the value of each element in the set of matched elements.
     *
     * @param value A string of text or an array of strings corresponding to the value of each matched element to set as selected/checked.
     */
    val(value: string[]): JQuery;
    /**
     * Set the value of each element in the set of matched elements.
     *
     * @param func A function returning the value to set. this is the current element. Receives the index position of the element in the set and the old value as arguments.
     */
    val(func: (index: number, value: string) => string): JQuery;
    /**
     * Set the value of each element in the set of matched elements.
     *
     * @param func A function returning the value to set. this is the current element. Receives the index position of the element in the set and the old value as arguments.
     */
    val(func: (index: number, value: string[]) => string): JQuery;
    /**
     * Set the value of each element in the set of matched elements.
     *
     * @param func A function returning the value to set. this is the current element. Receives the index position of the element in the set and the old value as arguments.
     */
    val(func: (index: number, value: number) => string): JQuery;
    /**
     * Set the value of each element in the set of matched elements.
     *
     * @param func A function returning the value to set. this is the current element. Receives the index position of the element in the set and the old value as arguments.
     */
    val(func: (index: number, value: string) => string[]): JQuery;
    /**
     * Set the value of each element in the set of matched elements.
     *
     * @param func A function returning the value to set. this is the current element. Receives the index position of the element in the set and the old value as arguments.
     */
    val(func: (index: number, value: string[]) => string[]): JQuery;
    /**
     * Set the value of each element in the set of matched elements.
     *
     * @param func A function returning the value to set. this is the current element. Receives the index position of the element in the set and the old value as arguments.
     */
    val(func: (index: number, value: number) => string[]): JQuery;

    /**
     * Get the value of style properties for the first element in the set of matched elements.
     *
     * @param propertyName A CSS property.
     */
    css(propertyName: string): string;
    /**
     * Set one or more CSS properties for the set of matched elements.
     *
     * @param propertyName A CSS property name.
     * @param value A value to set for the property.
     */
    css(propertyName: string, value: string): JQuery;
    /**
     * Set one or more CSS properties for the set of matched elements.
     *
     * @param propertyName A CSS property name.
     * @param value A value to set for the property.
     */
    css(propertyName: string, value: number): JQuery;
    /**
     * Set one or more CSS properties for the set of matched elements.
     *
     * @param propertyName A CSS property name.
     * @param value A value to set for the property.
     */
    css(propertyName: string, value: string[]): JQuery;
    /**
     * Set one or more CSS properties for the set of matched elements.
     *
     * @param propertyName A CSS property name.
     * @param value A value to set for the property.
     */
    css(propertyName: string, value: number[]): JQuery;
    /**
     * Set one or more CSS properties for the set of matched elements.
     *
     * @param propertyName A CSS property name.
     * @param value A function returning the value to set. this is the current element. Receives the index position of the element in the set and the old value as arguments.
     */
    css(propertyName: string, value: (index: number, value: string) => string): JQuery;
    /**
     * Set one or more CSS properties for the set of matched elements.
     *
     * @param propertyName A CSS property name.
     * @param value A function returning the value to set. this is the current element. Receives the index position of the element in the set and the old value as arguments.
     */
    css(propertyName: string, value: (index: number, value: number) => number): JQuery;
    /**
     * Set one or more CSS properties for the set of matched elements.
     *
     * @param properties An object of property-value pairs to set.
     */
    css(properties: Object): JQuery;

    /**
     * Get the current computed height for the first element in the set of matched elements.
     */
    height(): number;
    /**
     * Set the CSS height of every matched element.
     *
     * @param value An integer representing the number of pixels, or an integer with an optional unit of measure appended (as a string).
     */
    height(value: number): JQuery;
    /**
     * Set the CSS height of every matched element.
     *
     * @param value An integer representing the number of pixels, or an integer with an optional unit of measure appended (as a string).
     */
    height(value: string): JQuery;
    /**
     * Set the CSS height of every matched element.
     *
     * @param func A function returning the height to set. Receives the index position of the element in the set and the old height as arguments. Within the function, this refers to the current element in the set.
     */
    height(func: (index: number, height: number) => number): JQuery;
    /**
     * Set the CSS height of every matched element.
     *
     * @param func A function returning the height to set. Receives the index position of the element in the set and the old height as arguments. Within the function, this refers to the current element in the set.
     */
    height(func: (index: number, height: string) => string): JQuery;
    /**
     * Set the CSS height of every matched element.
     *
     * @param func A function returning the height to set. Receives the index position of the element in the set and the old height as arguments. Within the function, this refers to the current element in the set.
     */
    height(func: (index: number, height: string) => number): JQuery;
    /**
     * Set the CSS height of every matched element.
     *
     * @param func A function returning the height to set. Receives the index position of the element in the set and the old height as arguments. Within the function, this refers to the current element in the set.
     */
    height(func: (index: number, height: number) => string): JQuery;

    /**
     * Get the current computed height for the first element in the set of matched elements, including padding but not border.
     */
    innerHeight(): number;

    /**
     * Sets the inner height on elements in the set of matched elements, including padding but not border.
     *
     * @param value An integer representing the number of pixels, or an integer along with an optional unit of measure appended (as a string).
     */
    innerHeight(height: number): JQuery;

    /**
     * Sets the inner height on elements in the set of matched elements, including padding but not border.
     *
     * @param value An integer representing the number of pixels, or an integer along with an optional unit of measure appended (as a string).
     */
    innerHeight(height: string): JQuery;

    /**
     * Get the current computed width for the first element in the set of matched elements, including padding but not border.
     */
    innerWidth(): number;

    /**
     * Sets the inner width on elements in the set of matched elements, including padding but not border.
     *
     * @param value An integer representing the number of pixels, or an integer along with an optional unit of measure appended (as a string).
     */
    innerWidth(width: number): JQuery;

    /**
     * Sets the inner width on elements in the set of matched elements, including padding but not border.
     *
     * @param value An integer representing the number of pixels, or an integer along with an optional unit of measure appended (as a string).
     */
    innerWidth(width: string): JQuery;

    /**
     * Get the current coordinates of the first element in the set of matched elements, relative to the document.
     */
    offset(): JQueryCoordinates;
    /**
     * An object containing the properties top and left, which are integers indicating the new top and left coordinates for the elements.
     *
     * @param coordinates An object containing the properties top and left, which are integers indicating the new top and left coordinates for the elements.
     */
    offset(coordinates: JQueryCoordinates): JQuery;
    /**
     * An object containing the properties top and left, which are integers indicating the new top and left coordinates for the elements.
     *
     * @param func A function to return the coordinates to set. Receives the index of the element in the collection as the first argument and the current coordinates as the second argument. The function should return an object with the new top and left properties.
     */
    offset(func: (index: number, coords: JQueryCoordinates) => JQueryCoordinates): JQuery;

    /**
     * Get the current computed height for the first element in the set of matched elements, including padding, border, and optionally margin. Returns an integer (without "px") representation of the value or null if called on an empty set of elements.
     *
     * @param includeMargin A Boolean indicating whether to include the element's margin in the calculation.
     */
    outerHeight(includeMargin?: boolean): number;

    /**
     * Sets the outer height on elements in the set of matched elements, including padding and border.
     *
     * @param value An integer representing the number of pixels, or an integer along with an optional unit of measure appended (as a string).
     */
    outerHeight(height: number): JQuery;

    /**
     * Sets the outer height on elements in the set of matched elements, including padding and border.
     *
     * @param value An integer representing the number of pixels, or an integer along with an optional unit of measure appended (as a string).
     */
    outerHeight(height: string): JQuery;

    /**
     * Get the current computed width for the first element in the set of matched elements, including padding and border.
     *
     * @param includeMargin A Boolean indicating whether to include the element's margin in the calculation.
     */
    outerWidth(includeMargin?: boolean): number;

    /**
     * Sets the outer width on elements in the set of matched elements, including padding and border.
     *
     * @param value An integer representing the number of pixels, or an integer along with an optional unit of measure appended (as a string).
     */
    outerWidth(width: number): JQuery;

    /**
     * Sets the outer width on elements in the set of matched elements, including padding and border.
     *
     * @param value An integer representing the number of pixels, or an integer along with an optional unit of measure appended (as a string).
     */
    outerWidth(width: string): JQuery;

    /**
     * Get the current coordinates of the first element in the set of matched elements, relative to the offset parent.
     */
    position(): JQueryCoordinates;

    /**
     * Get the current horizontal position of the scroll bar for the first element in the set of matched elements or set the horizontal position of the scroll bar for every matched element.
     */
    scrollLeft(): number;
    /**
     * Set the current horizontal position of the scroll bar for each of the set of matched elements.
     *
     * @param value An integer indicating the new position to set the scroll bar to.
     */
    scrollLeft(value: number): JQuery;

    /**
     * Get the current vertical position of the scroll bar for the first element in the set of matched elements or set the vertical position of the scroll bar for every matched element.
     */
    scrollTop(): number;
    /**
     * Set the current vertical position of the scroll bar for each of the set of matched elements.
     *
     * @param value An integer indicating the new position to set the scroll bar to.
     */
    scrollTop(value: number): JQuery;

    /**
     * Get the current computed width for the first element in the set of matched elements.
     */
    width(): number;
    /**
     * Set the CSS width of each element in the set of matched elements.
     *
     * @param value An integer representing the number of pixels, or an integer along with an optional unit of measure appended (as a string).
     */
    width(value: number): JQuery;
    /**
     * Set the CSS width of each element in the set of matched elements.
     *
     * @param value An integer representing the number of pixels, or an integer along with an optional unit of measure appended (as a string).
     */
    width(value: string): JQuery;
    /**
     * Set the CSS width of each element in the set of matched elements.
     *
     * @param func A function returning the width to set. Receives the index position of the element in the set and the old width as arguments. Within the function, this refers to the current element in the set.
     */
    width(func: (index: number, width: number) => number): JQuery;
    /**
     * Set the CSS width of each element in the set of matched elements.
     *
     * @param func A function returning the width to set. Receives the index position of the element in the set and the old width as arguments. Within the function, this refers to the current element in the set.
     */
    width(func: (index: number, width: string) => string): JQuery;
    /**
     * Set the CSS width of each element in the set of matched elements.
     *
     * @param func A function returning the width to set. Receives the index position of the element in the set and the old width as arguments. Within the function, this refers to the current element in the set.
     */
    width(func: (index: number, width: string) => number): JQuery;
    /**
     * Set the CSS width of each element in the set of matched elements.
     *
     * @param func A function returning the width to set. Receives the index position of the element in the set and the old width as arguments. Within the function, this refers to the current element in the set.
     */
    width(func: (index: number, width: number) => string): JQuery;

    /**
     * Remove from the queue all items that have not yet been run.
     *
     * @param queueName A string containing the name of the queue. Defaults to fx, the standard effects queue.
     */
    clearQueue(queueName?: string): JQuery;

    /**
     * Store arbitrary data associated with the matched elements.
     *
     * @param key A string naming the piece of data to set.
     * @param value The new data value; it can be any Javascript type including Array or Object.
     */
    data(key: string, value: any): JQuery;
    /**
     * Store arbitrary data associated with the matched elements.
     *
     * @param obj An object of key-value pairs of data to update.
     */
    data(obj: { [key: string]: any; }): JQuery;
    /**
     * Return the value at the named data store for the first element in the jQuery collection, as set by data(name, value) or by an HTML5 data-* attribute.
     *
     * @param key Name of the data stored.
     */
    data(key: string): any;
    /**
     * Return the value at the named data store for the first element in the jQuery collection, as set by data(name, value) or by an HTML5 data-* attribute.
     */
    data(): any;

    /**
     * Execute the next function on the queue for the matched elements.
     *
     * @param queueName A string containing the name of the queue. Defaults to fx, the standard effects queue.
     */
    dequeue(queueName?: string): JQuery;

    /**
     * Remove a previously-stored piece of data.
     *
     * @param name A string naming the piece of data to delete or space-separated string naming the pieces of data to delete.
     */
    removeData(name: string): JQuery;
    /**
     * Remove a previously-stored piece of data.
     *
     * @param list An array of strings naming the pieces of data to delete.
     */
    removeData(list: string[]): JQuery;

    /**
     * Return a Promise object to observe when all actions of a certain type bound to the collection, queued or not, have finished.
     *
     * @param type The type of queue that needs to be observed. (default: fx)
     * @param target Object onto which the promise methods have to be attached
     */
    promise(type?: string, target?: Object): JQueryPromise<any>;

    /**
     * Perform a custom animation of a set of CSS properties.
     *
     * @param properties An object of CSS properties and values that the animation will move toward.
     * @param duration A string or number determining how long the animation will run.
     * @param complete A function to call once the animation is complete.
     */
    animate(properties: Object, duration?: string, complete?: Function): JQuery;
    /**
     * Perform a custom animation of a set of CSS properties.
     *
     * @param properties An object of CSS properties and values that the animation will move toward.
     * @param duration A string or number determining how long the animation will run.
     * @param complete A function to call once the animation is complete.
     */
    animate(properties: Object, duration?: number, complete?: Function): JQuery;
    /**
     * Perform a custom animation of a set of CSS properties.
     *
     * @param properties An object of CSS properties and values that the animation will move toward.
     * @param duration A string or number determining how long the animation will run.
     * @param easing A string indicating which easing function to use for the transition. (default: swing)
     * @param complete A function to call once the animation is complete.
     */
    animate(properties: Object, duration?: string, easing?: string, complete?: Function): JQuery;
    /**
     * Perform a custom animation of a set of CSS properties.
     *
     * @param properties An object of CSS properties and values that the animation will move toward.
     * @param duration A string or number determining how long the animation will run.
     * @param easing A string indicating which easing function to use for the transition. (default: swing)
     * @param complete A function to call once the animation is complete.
     */
    animate(properties: Object, duration?: number, easing?: string, complete?: Function): JQuery;
    /**
     * Perform a custom animation of a set of CSS properties.
     *
     * @param properties An object of CSS properties and values that the animation will move toward.
     * @param options A map of additional options to pass to the method.
     */
    animate(properties: Object, options: JQueryAnimationOptions): JQuery;

    /**
     * Set a timer to delay execution of subsequent items in the queue.
     *
     * @param duration An integer indicating the number of milliseconds to delay execution of the next item in the queue.
     * @param queueName A string containing the name of the queue. Defaults to fx, the standard effects queue.
     */
    delay(duration: number, queueName?: string): JQuery;

    /**
     * Display the matched elements by fading them to opaque.
     *
     * @param duration A string or number determining how long the animation will run.
     * @param complete A function to call once the animation is complete.
     */
    fadeIn(duration?: number, complete?: Function): JQuery;
    /**
     * Display the matched elements by fading them to opaque.
     *
     * @param duration A string or number determining how long the animation will run.
     * @param complete A function to call once the animation is complete.
     */
    fadeIn(duration?: string, complete?: Function): JQuery;
    /**
     * Display the matched elements by fading them to opaque.
     *
     * @param duration A string or number determining how long the animation will run.
     * @param easing A string indicating which easing function to use for the transition.
     * @param complete A function to call once the animation is complete.
     */
    fadeIn(duration?: number, easing?: string, complete?: Function): JQuery;
    /**
     * Display the matched elements by fading them to opaque.
     *
     * @param duration A string or number determining how long the animation will run.
     * @param easing A string indicating which easing function to use for the transition.
     * @param complete A function to call once the animation is complete.
     */
    fadeIn(duration?: string, easing?: string, complete?: Function): JQuery;
    /**
     * Display the matched elements by fading them to opaque.
     *
     * @param options A map of additional options to pass to the method.
     */
    fadeIn(options: JQueryAnimationOptions): JQuery;

    /**
     * Hide the matched elements by fading them to transparent.
     *
     * @param duration A string or number determining how long the animation will run.
     * @param complete A function to call once the animation is complete.
     */
    fadeOut(duration?: number, complete?: Function): JQuery;
    /**
     * Hide the matched elements by fading them to transparent.
     *
     * @param duration A string or number determining how long the animation will run.
     * @param complete A function to call once the animation is complete.
     */
    fadeOut(duration?: string, complete?: Function): JQuery;
    /**
     * Hide the matched elements by fading them to transparent.
     *
     * @param duration A string or number determining how long the animation will run.
     * @param easing A string indicating which easing function to use for the transition.
     * @param complete A function to call once the animation is complete.
     */
    fadeOut(duration?: number, easing?: string, complete?: Function): JQuery;
    /**
     * Hide the matched elements by fading them to transparent.
     *
     * @param duration A string or number determining how long the animation will run.
     * @param easing A string indicating which easing function to use for the transition.
     * @param complete A function to call once the animation is complete.
     */
    fadeOut(duration?: string, easing?: string, complete?: Function): JQuery;
    /**
     * Hide the matched elements by fading them to transparent.
     *
     * @param options A map of additional options to pass to the method.
     */
    fadeOut(options: JQueryAnimationOptions): JQuery;

    /**
     * Adjust the opacity of the matched elements.
     *
     * @param duration A string or number determining how long the animation will run.
     * @param opacity A number between 0 and 1 denoting the target opacity.
     * @param complete A function to call once the animation is complete.
     */
    fadeTo(duration: string, opacity: number, complete?: Function): JQuery;
    /**
     * Adjust the opacity of the matched elements.
     *
     * @param duration A string or number determining how long the animation will run.
     * @param opacity A number between 0 and 1 denoting the target opacity.
     * @param complete A function to call once the animation is complete.
     */
    fadeTo(duration: number, opacity: number, complete?: Function): JQuery;
    /**
     * Adjust the opacity of the matched elements.
     *
     * @param duration A string or number determining how long the animation will run.
     * @param opacity A number between 0 and 1 denoting the target opacity.
     * @param easing A string indicating which easing function to use for the transition.
     * @param complete A function to call once the animation is complete.
     */
    fadeTo(duration: string, opacity: number, easing?: string, complete?: Function): JQuery;
    /**
     * Adjust the opacity of the matched elements.
     *
     * @param duration A string or number determining how long the animation will run.
     * @param opacity A number between 0 and 1 denoting the target opacity.
     * @param easing A string indicating which easing function to use for the transition.
     * @param complete A function to call once the animation is complete.
     */
    fadeTo(duration: number, opacity: number, easing?: string, complete?: Function): JQuery;

    /**
     * Display or hide the matched elements by animating their opacity.
     *
     * @param duration A string or number determining how long the animation will run.
     * @param complete A function to call once the animation is complete.
     */
    fadeToggle(duration?: number, complete?: Function): JQuery;
    /**
     * Display or hide the matched elements by animating their opacity.
     *
     * @param duration A string or number determining how long the animation will run.
     * @param complete A function to call once the animation is complete.
     */
    fadeToggle(duration?: string, complete?: Function): JQuery;
    /**
     * Display or hide the matched elements by animating their opacity.
     *
     * @param duration A string or number determining how long the animation will run.
     * @param easing A string indicating which easing function to use for the transition.
     * @param complete A function to call once the animation is complete.
     */
    fadeToggle(duration?: number, easing?: string, complete?: Function): JQuery;
    /**
     * Display or hide the matched elements by animating their opacity.
     *
     * @param duration A string or number determining how long the animation will run.
     * @param easing A string indicating which easing function to use for the transition.
     * @param complete A function to call once the animation is complete.
     */
    fadeToggle(duration?: string, easing?: string, complete?: Function): JQuery;
    /**
     * Display or hide the matched elements by animating their opacity.
     *
     * @param options A map of additional options to pass to the method.
     */
    fadeToggle(options: JQueryAnimationOptions): JQuery;

    /**
     * Stop the currently-running animation, remove all queued animations, and complete all animations for the matched elements.
     *
     * @param queue The name of the queue in which to stop animations.
     */
    finish(queue?: string): JQuery;

    /**
     * Hide the matched elements.
     *
     * @param duration A string or number determining how long the animation will run.
     * @param complete A function to call once the animation is complete.
     */
    hide(duration?: number, complete?: Function): JQuery;
    /**
     * Hide the matched elements.
     *
     * @param duration A string or number determining how long the animation will run.
     * @param complete A function to call once the animation is complete.
     */
    hide(duration?: string, complete?: Function): JQuery;
    /**
     * Hide the matched elements.
     *
     * @param duration A string or number determining how long the animation will run.
     * @param easing A string indicating which easing function to use for the transition.
     * @param complete A function to call once the animation is complete.
     */
    hide(duration?: number, easing?: string, complete?: Function): JQuery;
    /**
     * Hide the matched elements.
     *
     * @param duration A string or number determining how long the animation will run.
     * @param easing A string indicating which easing function to use for the transition.
     * @param complete A function to call once the animation is complete.
     */
    hide(duration?: string, easing?: string, complete?: Function): JQuery;
    /**
     * Hide the matched elements.
     *
     * @param options A map of additional options to pass to the method.
     */
    hide(options: JQueryAnimationOptions): JQuery;

    /**
     * Display the matched elements.
     *
     * @param duration A string or number determining how long the animation will run.
     * @param complete A function to call once the animation is complete.
     */
    show(duration?: number, complete?: Function): JQuery;
    /**
     * Display the matched elements.
     *
     * @param duration A string or number determining how long the animation will run.
     * @param complete A function to call once the animation is complete.
     */
    show(duration?: string, complete?: Function): JQuery;
    /**
     * Display the matched elements.
     *
     * @param duration A string or number determining how long the animation will run.
     * @param easing A string indicating which easing function to use for the transition.
     * @param complete A function to call once the animation is complete.
     */
    show(duration?: number, easing?: string, complete?: Function): JQuery;
    /**
     * Display the matched elements.
     *
     * @param duration A string or number determining how long the animation will run.
     * @param easing A string indicating which easing function to use for the transition.
     * @param complete A function to call once the animation is complete.
     */
    show(duration?: string, easing?: string, complete?: Function): JQuery;
    /**
     * Display the matched elements.
     *
     * @param options A map of additional options to pass to the method.
     */
    show(options: JQueryAnimationOptions): JQuery;

    /**
     * Display the matched elements with a sliding motion.
     *
     * @param duration A string or number determining how long the animation will run.
     * @param complete A function to call once the animation is complete.
     */
    slideDown(duration?: number, complete?: Function): JQuery;
    /**
     * Display the matched elements with a sliding motion.
     *
     * @param duration A string or number determining how long the animation will run.
     * @param complete A function to call once the animation is complete.
     */
    slideDown(duration?: string, complete?: Function): JQuery;
    /**
     * Display the matched elements with a sliding motion.
     *
     * @param duration A string or number determining how long the animation will run.
     * @param easing A string indicating which easing function to use for the transition.
     * @param complete A function to call once the animation is complete.
     */
    slideDown(duration?: number, easing?: string, complete?: Function): JQuery;
    /**
     * Display the matched elements with a sliding motion.
     *
     * @param duration A string or number determining how long the animation will run.
     * @param easing A string indicating which easing function to use for the transition.
     * @param complete A function to call once the animation is complete.
     */
    slideDown(duration?: string, easing?: string, complete?: Function): JQuery;
    /**
     * Display the matched elements with a sliding motion.
     *
     * @param options A map of additional options to pass to the method.
     */
    slideDown(options: JQueryAnimationOptions): JQuery;

    /**
     * Display or hide the matched elements with a sliding motion.
     *
     * @param duration A string or number determining how long the animation will run.
     * @param complete A function to call once the animation is complete.
     */
    slideToggle(duration?: number, complete?: Function): JQuery;
    /**
     * Display or hide the matched elements with a sliding motion.
     *
     * @param duration A string or number determining how long the animation will run.
     * @param complete A function to call once the animation is complete.
     */
    slideToggle(duration?: string, complete?: Function): JQuery;
    /**
     * Display or hide the matched elements with a sliding motion.
     *
     * @param duration A string or number determining how long the animation will run.
     * @param easing A string indicating which easing function to use for the transition.
     * @param complete A function to call once the animation is complete.
     */
    slideToggle(duration?: number, easing?: string, complete?: Function): JQuery;
    /**
     * Display or hide the matched elements with a sliding motion.
     *
     * @param duration A string or number determining how long the animation will run.
     * @param easing A string indicating which easing function to use for the transition.
     * @param complete A function to call once the animation is complete.
     */
    slideToggle(duration?: string, easing?: string, complete?: Function): JQuery;
    /**
     * Display or hide the matched elements with a sliding motion.
     *
     * @param options A map of additional options to pass to the method.
     */
    slideToggle(options: JQueryAnimationOptions): JQuery;

    /**
     * Hide the matched elements with a sliding motion.
     *
     * @param duration A string or number determining how long the animation will run.
     * @param complete A function to call once the animation is complete.
     */
    slideUp(duration?: number, complete?: Function): JQuery;
    /**
     * Hide the matched elements with a sliding motion.
     *
     * @param duration A string or number determining how long the animation will run.
     * @param complete A function to call once the animation is complete.
     */
    slideUp(duration?: string, complete?: Function): JQuery;
    /**
     * Hide the matched elements with a sliding motion.
     *
     * @param duration A string or number determining how long the animation will run.
     * @param easing A string indicating which easing function to use for the transition.
     * @param complete A function to call once the animation is complete.
     */
    slideUp(duration?: number, easing?: string, complete?: Function): JQuery;
    /**
     * Hide the matched elements with a sliding motion.
     *
     * @param duration A string or number determining how long the animation will run.
     * @param easing A string indicating which easing function to use for the transition.
     * @param complete A function to call once the animation is complete.
     */
    slideUp(duration?: string, easing?: string, complete?: Function): JQuery;
    /**
     * Hide the matched elements with a sliding motion.
     *
     * @param options A map of additional options to pass to the method.
     */
    slideUp(options: JQueryAnimationOptions): JQuery;

    /**
     * Stop the currently-running animation on the matched elements.
     *
     * @param clearQueue A Boolean indicating whether to remove queued animation as well. Defaults to false.
     * @param jumpToEnd A Boolean indicating whether to complete the current animation immediately. Defaults to false.
     */
    stop(clearQueue?: boolean, jumpToEnd?: boolean): JQuery;
    /**
     * Stop the currently-running animation on the matched elements.
     *
     * @param queue The name of the queue in which to stop animations.
     * @param clearQueue A Boolean indicating whether to remove queued animation as well. Defaults to false.
     * @param jumpToEnd A Boolean indicating whether to complete the current animation immediately. Defaults to false.
     */
    stop(queue?: string, clearQueue?: boolean, jumpToEnd?: boolean): JQuery;

    /**
     * Display or hide the matched elements.
     *
     * @param duration A string or number determining how long the animation will run.
     * @param complete A function to call once the animation is complete.
     */
    toggle(duration?: number, complete?: Function): JQuery;
    /**
     * Display or hide the matched elements.
     *
     * @param duration A string or number determining how long the animation will run.
     * @param complete A function to call once the animation is complete.
     */
    toggle(duration?: string, complete?: Function): JQuery;
    /**
     * Display or hide the matched elements.
     *
     * @param duration A string or number determining how long the animation will run.
     * @param easing A string indicating which easing function to use for the transition.
     * @param complete A function to call once the animation is complete.
     */
    toggle(duration?: number, easing?: string, complete?: Function): JQuery;
    /**
     * Display or hide the matched elements.
     *
     * @param duration A string or number determining how long the animation will run.
     * @param easing A string indicating which easing function to use for the transition.
     * @param complete A function to call once the animation is complete.
     */
    toggle(duration?: string, easing?: string, complete?: Function): JQuery;
    /**
     * Display or hide the matched elements.
     *
     * @param options A map of additional options to pass to the method.
     */
    toggle(options: JQueryAnimationOptions): JQuery;
    /**
     * Display or hide the matched elements.
     *
     * @param showOrHide A Boolean indicating whether to show or hide the elements.
     */
    toggle(showOrHide: boolean): JQuery;

    /**
     * Attach a handler to an event for the elements.
     * 
     * @param eventType A string containing one or more DOM event types, such as "click" or "submit," or custom event names.
     * @param eventData An object containing data that will be passed to the event handler.
     * @param handler A function to execute each time the event is triggered.
     */
    bind(eventType: string, eventData: any, handler: (eventObject: JQueryEventObject) => any): JQuery;
    /**
     * Attach a handler to an event for the elements.
     * 
     * @param eventType A string containing one or more DOM event types, such as "click" or "submit," or custom event names.
     * @param handler A function to execute each time the event is triggered.
     */
    bind(eventType: string, handler: (eventObject: JQueryEventObject) => any): JQuery;
    /**
     * Attach a handler to an event for the elements.
     * 
     * @param eventType A string containing one or more DOM event types, such as "click" or "submit," or custom event names.
     * @param eventData An object containing data that will be passed to the event handler.
     * @param preventBubble Setting the third argument to false will attach a function that prevents the default action from occurring and stops the event from bubbling. The default is true.
     */
    bind(eventType: string, eventData: any, preventBubble: boolean): JQuery;
    /**
     * Attach a handler to an event for the elements.
     * 
     * @param eventType A string containing one or more DOM event types, such as "click" or "submit," or custom event names.
     * @param preventBubble Setting the third argument to false will attach a function that prevents the default action from occurring and stops the event from bubbling. The default is true.
     */
    bind(eventType: string, preventBubble: boolean): JQuery;
    /**
     * Attach a handler to an event for the elements.
     * 
     * @param events An object containing one or more DOM event types and functions to execute for them.
     */
    bind(events: any): JQuery;

    /**
     * Trigger the "blur" event on an element
     */
    blur(): JQuery;
    /**
     * Bind an event handler to the "blur" JavaScript event
     *
     * @param handler A function to execute each time the event is triggered.
     */
    blur(handler: (eventObject: JQueryEventObject) => any): JQuery;
    /**
     * Bind an event handler to the "blur" JavaScript event
     *
     * @param eventData An object containing data that will be passed to the event handler.
     * @param handler A function to execute each time the event is triggered.
     */
    blur(eventData?: any, handler?: (eventObject: JQueryEventObject) => any): JQuery;

    /**
     * Trigger the "change" event on an element.
     */
    change(): JQuery;
    /**
     * Bind an event handler to the "change" JavaScript event
     *
     * @param handler A function to execute each time the event is triggered.
     */
    change(handler: (eventObject: JQueryEventObject) => any): JQuery;
    /**
     * Bind an event handler to the "change" JavaScript event
     *
     * @param eventData An object containing data that will be passed to the event handler.
     * @param handler A function to execute each time the event is triggered.
     */
    change(eventData?: any, handler?: (eventObject: JQueryEventObject) => any): JQuery;

    /**
     * Trigger the "click" event on an element.
     */
    click(): JQuery;
    /**
     * Bind an event handler to the "click" JavaScript event
     *
     * @param eventData An object containing data that will be passed to the event handler.
     */
    click(handler: (eventObject: JQueryEventObject) => any): JQuery;
    /**
     * Bind an event handler to the "click" JavaScript event
     *
     * @param eventData An object containing data that will be passed to the event handler.
     * @param handler A function to execute each time the event is triggered.
     */
    click(eventData?: any, handler?: (eventObject: JQueryEventObject) => any): JQuery;

    /**
     * Trigger the "dblclick" event on an element.
     */
    dblclick(): JQuery;
    /**
     * Bind an event handler to the "dblclick" JavaScript event
     *
     * @param handler A function to execute each time the event is triggered.
     */
    dblclick(handler: (eventObject: JQueryEventObject) => any): JQuery;
    /**
     * Bind an event handler to the "dblclick" JavaScript event
     *
     * @param eventData An object containing data that will be passed to the event handler.
     * @param handler A function to execute each time the event is triggered.
     */
    dblclick(eventData?: any, handler?: (eventObject: JQueryEventObject) => any): JQuery;

    delegate(selector: any, eventType: string, handler: (eventObject: JQueryEventObject) => any): JQuery;
    delegate(selector: any, eventType: string, eventData: any, handler: (eventObject: JQueryEventObject) => any): JQuery;

    /**
     * Trigger the "focus" event on an element.
     */
    focus(): JQuery;
    /**
     * Bind an event handler to the "focus" JavaScript event
     *
     * @param handler A function to execute each time the event is triggered.
     */
    focus(handler: (eventObject: JQueryEventObject) => any): JQuery;
    /**
     * Bind an event handler to the "focus" JavaScript event
     *
     * @param eventData An object containing data that will be passed to the event handler.
     * @param handler A function to execute each time the event is triggered.
     */
    focus(eventData?: any, handler?: (eventObject: JQueryEventObject) => any): JQuery;

    /**
     * Bind an event handler to the "focusin" JavaScript event
     *
     * @param handler A function to execute each time the event is triggered.
     */
    focusin(handler: (eventObject: JQueryEventObject) => any): JQuery;
    /**
     * Bind an event handler to the "focusin" JavaScript event
     *
     * @param eventData An object containing data that will be passed to the event handler.
     * @param handler A function to execute each time the event is triggered.
     */
    focusin(eventData: Object, handler: (eventObject: JQueryEventObject) => any): JQuery;

    /**
     * Bind an event handler to the "focusout" JavaScript event
     *
     * @param handler A function to execute each time the event is triggered.
     */
    focusout(handler: (eventObject: JQueryEventObject) => any): JQuery;
    /**
     * Bind an event handler to the "focusout" JavaScript event
     *
     * @param eventData An object containing data that will be passed to the event handler.
     * @param handler A function to execute each time the event is triggered.
     */
    focusout(eventData: Object, handler: (eventObject: JQueryEventObject) => any): JQuery;

    /**
     * Bind two handlers to the matched elements, to be executed when the mouse pointer enters and leaves the elements.
     *
     * @param handlerIn A function to execute when the mouse pointer enters the element.
     * @param handlerOut A function to execute when the mouse pointer leaves the element.
     */
    hover(handlerIn: (eventObject: JQueryEventObject) => any, handlerOut: (eventObject: JQueryEventObject) => any): JQuery;
    /**
     * Bind a single handler to the matched elements, to be executed when the mouse pointer enters or leaves the elements.
     *
     * @param handlerInOut A function to execute when the mouse pointer enters or leaves the element.
     */
    hover(handlerInOut: (eventObject: JQueryEventObject) => any): JQuery;

    /**
     * Trigger the "keydown" event on an element.
     */
    keydown(): JQuery;
    /**
     * Bind an event handler to the "keydown" JavaScript event
     *
     * @param handler A function to execute each time the event is triggered.
     */
    keydown(handler: (eventObject: JQueryKeyEventObject) => any): JQuery;
    /**
     * Bind an event handler to the "keydown" JavaScript event
     *
     * @param eventData An object containing data that will be passed to the event handler.
     * @param handler A function to execute each time the event is triggered.
     */
    keydown(eventData?: any, handler?: (eventObject: JQueryKeyEventObject) => any): JQuery;

    /**
     * Trigger the "keypress" event on an element.
     */
    keypress(): JQuery;
    /**
     * Bind an event handler to the "keypress" JavaScript event
     *
     * @param handler A function to execute each time the event is triggered.
     */
    keypress(handler: (eventObject: JQueryKeyEventObject) => any): JQuery;
    /**
     * Bind an event handler to the "keypress" JavaScript event
     *
     * @param eventData An object containing data that will be passed to the event handler.
     * @param handler A function to execute each time the event is triggered.
     */
    keypress(eventData?: any, handler?: (eventObject: JQueryKeyEventObject) => any): JQuery;

    /**
     * Trigger the "keyup" event on an element.
     */
    keyup(): JQuery;
    /**
     * Bind an event handler to the "keyup" JavaScript event
     *
     * @param handler A function to execute each time the event is triggered.
     */
    keyup(handler: (eventObject: JQueryKeyEventObject) => any): JQuery;
    /**
     * Bind an event handler to the "keyup" JavaScript event
     *
     * @param eventData An object containing data that will be passed to the event handler.
     * @param handler A function to execute each time the event is triggered.
     */
    keyup(eventData?: any, handler?: (eventObject: JQueryKeyEventObject) => any): JQuery;

    /**
     * Bind an event handler to the "load" JavaScript event.
     *
     * @param handler A function to execute when the event is triggered.
     */
    load(handler: (eventObject: JQueryEventObject) => any): JQuery;
    /**
     * Bind an event handler to the "load" JavaScript event.
     *
     * @param eventData An object containing data that will be passed to the event handler.
     * @param handler A function to execute when the event is triggered.
     */
    load(eventData?: any, handler?: (eventObject: JQueryEventObject) => any): JQuery;

    /**
     * Trigger the "mousedown" event on an element.
     */
    mousedown(): JQuery;
    /**
     * Bind an event handler to the "mousedown" JavaScript event.
     *
     * @param handler A function to execute when the event is triggered.
     */
    mousedown(handler: (eventObject: JQueryMouseEventObject) => any): JQuery;
    /**
     * Bind an event handler to the "mousedown" JavaScript event.
     *
     * @param eventData An object containing data that will be passed to the event handler.
     * @param handler A function to execute when the event is triggered.
     */
    mousedown(eventData: Object, handler: (eventObject: JQueryMouseEventObject) => any): JQuery;

    /**
     * Trigger the "mouseenter" event on an element.
     */
    mouseenter(): JQuery;
    /**
     * Bind an event handler to be fired when the mouse enters an element.
     *
     * @param handler A function to execute when the event is triggered.
     */
    mouseenter(handler: (eventObject: JQueryMouseEventObject) => any): JQuery;
    /**
     * Bind an event handler to be fired when the mouse enters an element.
     *
     * @param eventData An object containing data that will be passed to the event handler.
     * @param handler A function to execute when the event is triggered.
     */
    mouseenter(eventData: Object, handler: (eventObject: JQueryMouseEventObject) => any): JQuery;

    /**
     * Trigger the "mouseleave" event on an element.
     */
    mouseleave(): JQuery;
    /**
     * Bind an event handler to be fired when the mouse leaves an element.
     *
     * @param handler A function to execute when the event is triggered.
     */
    mouseleave(handler: (eventObject: JQueryMouseEventObject) => any): JQuery;
    /**
     * Bind an event handler to be fired when the mouse leaves an element.
     *
     * @param eventData An object containing data that will be passed to the event handler.
     * @param handler A function to execute when the event is triggered.
     */
    mouseleave(eventData: Object, handler: (eventObject: JQueryMouseEventObject) => any): JQuery;

    /**
     * Trigger the "mousemove" event on an element.
     */
    mousemove(): JQuery;
    /**
     * Bind an event handler to the "mousemove" JavaScript event.
     *
     * @param handler A function to execute when the event is triggered.
     */
    mousemove(handler: (eventObject: JQueryMouseEventObject) => any): JQuery;
    /**
     * Bind an event handler to the "mousemove" JavaScript event.
     *
     * @param eventData An object containing data that will be passed to the event handler.
     * @param handler A function to execute when the event is triggered.
     */
    mousemove(eventData: Object, handler: (eventObject: JQueryMouseEventObject) => any): JQuery;

    /**
     * Trigger the "mouseout" event on an element.
     */
    mouseout(): JQuery;
    /**
     * Bind an event handler to the "mouseout" JavaScript event.
     *
     * @param handler A function to execute when the event is triggered.
     */
    mouseout(handler: (eventObject: JQueryMouseEventObject) => any): JQuery;
    /**
     * Bind an event handler to the "mouseout" JavaScript event.
     *
     * @param eventData An object containing data that will be passed to the event handler.
     * @param handler A function to execute when the event is triggered.
     */
    mouseout(eventData: Object, handler: (eventObject: JQueryMouseEventObject) => any): JQuery;

    /**
     * Trigger the "mouseover" event on an element.
     */
    mouseover(): JQuery;
    /**
     * Bind an event handler to the "mouseover" JavaScript event.
     *
     * @param handler A function to execute when the event is triggered.
     */
    mouseover(handler: (eventObject: JQueryMouseEventObject) => any): JQuery;
    /**
     * Bind an event handler to the "mouseover" JavaScript event.
     *
     * @param eventData An object containing data that will be passed to the event handler.
     * @param handler A function to execute when the event is triggered.
     */
    mouseover(eventData: Object, handler: (eventObject: JQueryMouseEventObject) => any): JQuery;

    /**
     * Trigger the "mouseup" event on an element.
     */
    mouseup(): JQuery;
    /**
     * Bind an event handler to the "mouseup" JavaScript event.
     *
     * @param handler A function to execute when the event is triggered.
     */
    mouseup(handler: (eventObject: JQueryMouseEventObject) => any): JQuery;
    /**
     * Bind an event handler to the "mouseup" JavaScript event.
     *
     * @param eventData An object containing data that will be passed to the event handler.
     * @param handler A function to execute when the event is triggered.
     */
    mouseup(eventData: Object, handler: (eventObject: JQueryMouseEventObject) => any): JQuery;

    /**
     * Remove an event handler.
     */
    off(): JQuery;
    /**
     * Remove an event handler.
     *
     * @param events One or more space-separated event types and optional namespaces, or just namespaces, such as "click", "keydown.myPlugin", or ".myPlugin".
     * @param selector A selector which should match the one originally passed to .on() when attaching event handlers.
     * @param handler A handler function previously attached for the event(s), or the special value false.
     */
    off(events: string, selector?: string, handler?: (eventObject: JQueryEventObject) => any): JQuery;
    /**
     * Remove an event handler.
     *
     * @param events One or more space-separated event types and optional namespaces, or just namespaces, such as "click", "keydown.myPlugin", or ".myPlugin".
     * @param handler A handler function previously attached for the event(s), or the special value false.
     */
    off(events: string, handler: (eventObject: JQueryEventObject) => any): JQuery;
    /**
     * Remove an event handler.
     *
     * @param events An object where the string keys represent one or more space-separated event types and optional namespaces, and the values represent handler functions previously attached for the event(s).
     * @param selector A selector which should match the one originally passed to .on() when attaching event handlers.
     */
    off(events: { [key: string]: any; }, selector?: string): JQuery;

    /**
     * Attach an event handler function for one or more events to the selected elements.
     *
     * @param events One or more space-separated event types and optional namespaces, such as "click" or "keydown.myPlugin".
     * @param handler A function to execute when the event is triggered. The value false is also allowed as a shorthand for a function that simply does return false. Rest parameter args is for optional parameters passed to jQuery.trigger(). Note that the actual parameters on the event handler function must be marked as optional (? syntax).
     */
    on(events: string, handler: (eventObject: JQueryEventObject, ...args: any[]) => any): JQuery;
    /**
     * Attach an event handler function for one or more events to the selected elements.
     *
     * @param events One or more space-separated event types and optional namespaces, such as "click" or "keydown.myPlugin".
     * @param data Data to be passed to the handler in event.data when an event is triggered.
     * @param handler A function to execute when the event is triggered. The value false is also allowed as a shorthand for a function that simply does return false.
    */
    on(events: string, data: any, handler: (eventObject: JQueryEventObject, ...args: any[]) => any): JQuery;
    /**
     * Attach an event handler function for one or more events to the selected elements.
     *
     * @param events One or more space-separated event types and optional namespaces, such as "click" or "keydown.myPlugin".
     * @param selector A selector string to filter the descendants of the selected elements that trigger the event. If the selector is null or omitted, the event is always triggered when it reaches the selected element.
     * @param handler A function to execute when the event is triggered. The value false is also allowed as a shorthand for a function that simply does return false.
     */
    on(events: string, selector: string, handler: (eventObject: JQueryEventObject, ...eventData: any[]) => any): JQuery;
    /**
     * Attach an event handler function for one or more events to the selected elements.
     *
     * @param events One or more space-separated event types and optional namespaces, such as "click" or "keydown.myPlugin".
     * @param selector A selector string to filter the descendants of the selected elements that trigger the event. If the selector is null or omitted, the event is always triggered when it reaches the selected element.
     * @param data Data to be passed to the handler in event.data when an event is triggered.
     * @param handler A function to execute when the event is triggered. The value false is also allowed as a shorthand for a function that simply does return false.
     */
    on(events: string, selector: string, data: any, handler: (eventObject: JQueryEventObject, ...eventData: any[]) => any): JQuery;
    /**
     * Attach an event handler function for one or more events to the selected elements.
     *
     * @param events An object in which the string keys represent one or more space-separated event types and optional namespaces, and the values represent a handler function to be called for the event(s).
     * @param selector A selector string to filter the descendants of the selected elements that will call the handler. If the selector is null or omitted, the handler is always called when it reaches the selected element.
     * @param data Data to be passed to the handler in event.data when an event occurs.
     */
    on(events: { [key: string]: any; }, selector?: string, data?: any): JQuery;
    /**
     * Attach an event handler function for one or more events to the selected elements.
     *
     * @param events An object in which the string keys represent one or more space-separated event types and optional namespaces, and the values represent a handler function to be called for the event(s).
     * @param data Data to be passed to the handler in event.data when an event occurs.
     */
    on(events: { [key: string]: any; }, data?: any): JQuery;

    /**
     * Attach a handler to an event for the elements. The handler is executed at most once per element per event type.
     *
     * @param events A string containing one or more JavaScript event types, such as "click" or "submit," or custom event names.
     * @param handler A function to execute at the time the event is triggered.
     */
    one(events: string, handler: (eventObject: JQueryEventObject) => any): JQuery;
    /**
     * Attach a handler to an event for the elements. The handler is executed at most once per element per event type.
     *
     * @param events A string containing one or more JavaScript event types, such as "click" or "submit," or custom event names.
     * @param data An object containing data that will be passed to the event handler.
     * @param handler A function to execute at the time the event is triggered.
     */
    one(events: string, data: Object, handler: (eventObject: JQueryEventObject) => any): JQuery;

    /**
     * Attach a handler to an event for the elements. The handler is executed at most once per element per event type.
     *
     * @param events One or more space-separated event types and optional namespaces, such as "click" or "keydown.myPlugin".
     * @param selector A selector string to filter the descendants of the selected elements that trigger the event. If the selector is null or omitted, the event is always triggered when it reaches the selected element.
     * @param handler A function to execute when the event is triggered. The value false is also allowed as a shorthand for a function that simply does return false.
     */
    one(events: string, selector: string, handler: (eventObject: JQueryEventObject) => any): JQuery;
    /**
     * Attach a handler to an event for the elements. The handler is executed at most once per element per event type.
     *
     * @param events One or more space-separated event types and optional namespaces, such as "click" or "keydown.myPlugin".
     * @param selector A selector string to filter the descendants of the selected elements that trigger the event. If the selector is null or omitted, the event is always triggered when it reaches the selected element.
     * @param data Data to be passed to the handler in event.data when an event is triggered.
     * @param handler A function to execute when the event is triggered. The value false is also allowed as a shorthand for a function that simply does return false.
     */
    one(events: string, selector: string, data: any, handler: (eventObject: JQueryEventObject) => any): JQuery;

    /**
     * Attach a handler to an event for the elements. The handler is executed at most once per element per event type.
     *
     * @param events An object in which the string keys represent one or more space-separated event types and optional namespaces, and the values represent a handler function to be called for the event(s).
     * @param selector A selector string to filter the descendants of the selected elements that will call the handler. If the selector is null or omitted, the handler is always called when it reaches the selected element.
     * @param data Data to be passed to the handler in event.data when an event occurs.
     */
    one(events: { [key: string]: any; }, selector?: string, data?: any): JQuery;

    /**
     * Attach a handler to an event for the elements. The handler is executed at most once per element per event type.
     *
     * @param events An object in which the string keys represent one or more space-separated event types and optional namespaces, and the values represent a handler function to be called for the event(s).
     * @param data Data to be passed to the handler in event.data when an event occurs.
     */
    one(events: { [key: string]: any; }, data?: any): JQuery;


    /**
     * Specify a function to execute when the DOM is fully loaded.
     *
     * @param handler A function to execute after the DOM is ready.
     */
    ready(handler: Function): JQuery;

    /**
     * Trigger the "resize" event on an element.
     */
    resize(): JQuery;
    /**
     * Bind an event handler to the "resize" JavaScript event.
     *
     * @param handler A function to execute each time the event is triggered.
     */
    resize(handler: (eventObject: JQueryEventObject) => any): JQuery;
    /**
     * Bind an event handler to the "resize" JavaScript event.
     *
     * @param eventData An object containing data that will be passed to the event handler.
     * @param handler A function to execute each time the event is triggered.
     */
    resize(eventData: Object, handler: (eventObject: JQueryEventObject) => any): JQuery;

    /**
     * Trigger the "scroll" event on an element.
     */
    scroll(): JQuery;
    /**
     * Bind an event handler to the "scroll" JavaScript event.
     *
     * @param handler A function to execute each time the event is triggered.
     */
    scroll(handler: (eventObject: JQueryEventObject) => any): JQuery;
    /**
     * Bind an event handler to the "scroll" JavaScript event.
     *
     * @param eventData An object containing data that will be passed to the event handler.
     * @param handler A function to execute each time the event is triggered.
     */
    scroll(eventData: Object, handler: (eventObject: JQueryEventObject) => any): JQuery;

    /**
     * Trigger the "select" event on an element.
     */
    select(): JQuery;
    /**
     * Bind an event handler to the "select" JavaScript event.
     *
     * @param handler A function to execute each time the event is triggered.
     */
    select(handler: (eventObject: JQueryEventObject) => any): JQuery;
    /**
     * Bind an event handler to the "select" JavaScript event.
     *
     * @param eventData An object containing data that will be passed to the event handler.
     * @param handler A function to execute each time the event is triggered.
     */
    select(eventData: Object, handler: (eventObject: JQueryEventObject) => any): JQuery;

    /**
     * Trigger the "submit" event on an element.
     */
    submit(): JQuery;
    /**
     * Bind an event handler to the "submit" JavaScript event
     *
     * @param handler A function to execute each time the event is triggered.
     */
    submit(handler: (eventObject: JQueryEventObject) => any): JQuery;
    /**
     * Bind an event handler to the "submit" JavaScript event
     *
     * @param eventData An object containing data that will be passed to the event handler.
     * @param handler A function to execute each time the event is triggered.
     */
    submit(eventData?: any, handler?: (eventObject: JQueryEventObject) => any): JQuery;

    /**
     * Execute all handlers and behaviors attached to the matched elements for the given event type.
     * 
     * @param eventType A string containing a JavaScript event type, such as click or submit.
     * @param extraParameters Additional parameters to pass along to the event handler.
     */
    trigger(eventType: string, extraParameters?: any[]): JQuery;
    /**
     * Execute all handlers and behaviors attached to the matched elements for the given event type.
     * 
     * @param eventType A string containing a JavaScript event type, such as click or submit.
     * @param extraParameters Additional parameters to pass along to the event handler.
     */
    trigger(eventType: string, extraParameters?: Object): JQuery;
    /**
     * Execute all handlers and behaviors attached to the matched elements for the given event type.
     * 
     * @param event A jQuery.Event object.
     * @param extraParameters Additional parameters to pass along to the event handler.
     */
    trigger(event: JQueryEventObject, extraParameters?: any[]): JQuery;
    /**
     * Execute all handlers and behaviors attached to the matched elements for the given event type.
     * 
     * @param event A jQuery.Event object.
     * @param extraParameters Additional parameters to pass along to the event handler.
     */
    trigger(event: JQueryEventObject, extraParameters?: Object): JQuery;

    /**
     * Execute all handlers attached to an element for an event.
     * 
     * @param eventType A string containing a JavaScript event type, such as click or submit.
     * @param extraParameters An array of additional parameters to pass along to the event handler.
     */
    triggerHandler(eventType: string, ...extraParameters: any[]): Object;

    /**
     * Remove a previously-attached event handler from the elements.
     * 
     * @param eventType A string containing a JavaScript event type, such as click or submit.
     * @param handler The function that is to be no longer executed.
     */
    unbind(eventType?: string, handler?: (eventObject: JQueryEventObject) => any): JQuery;
    /**
     * Remove a previously-attached event handler from the elements.
     * 
     * @param eventType A string containing a JavaScript event type, such as click or submit.
     * @param fls Unbinds the corresponding 'return false' function that was bound using .bind( eventType, false ).
     */
    unbind(eventType: string, fls: boolean): JQuery;
    /**
     * Remove a previously-attached event handler from the elements.
     * 
     * @param evt A JavaScript event object as passed to an event handler.
     */
    unbind(evt: any): JQuery;

    /**
     * Remove a handler from the event for all elements which match the current selector, based upon a specific set of root elements.
     */
    undelegate(): JQuery;
    /**
     * Remove a handler from the event for all elements which match the current selector, based upon a specific set of root elements.
     * 
     * @param selector A selector which will be used to filter the event results.
     * @param eventType A string containing a JavaScript event type, such as "click" or "keydown"
     * @param handler A function to execute at the time the event is triggered.
     */
    undelegate(selector: string, eventType: string, handler?: (eventObject: JQueryEventObject) => any): JQuery;
    /**
     * Remove a handler from the event for all elements which match the current selector, based upon a specific set of root elements.
     * 
     * @param selector A selector which will be used to filter the event results.
     * @param events An object of one or more event types and previously bound functions to unbind from them.
     */
    undelegate(selector: string, events: Object): JQuery;
    /**
     * Remove a handler from the event for all elements which match the current selector, based upon a specific set of root elements.
     * 
     * @param namespace A string containing a namespace to unbind all events from.
     */
    undelegate(namespace: string): JQuery;

    /**
     * Bind an event handler to the "unload" JavaScript event. (DEPRECATED from v1.8)
     * 
     * @param handler A function to execute when the event is triggered.
     */
    unload(handler: (eventObject: JQueryEventObject) => any): JQuery;
    /**
     * Bind an event handler to the "unload" JavaScript event. (DEPRECATED from v1.8)
     * 
     * @param eventData A plain object of data that will be passed to the event handler.
     * @param handler A function to execute when the event is triggered.
     */
    unload(eventData?: any, handler?: (eventObject: JQueryEventObject) => any): JQuery;

    /**
     * The DOM node context originally passed to jQuery(); if none was passed then context will likely be the document. (DEPRECATED from v1.10)
     */
    context: Element;

    jquery: string;

    /**
     * Bind an event handler to the "error" JavaScript event. (DEPRECATED from v1.8)
     * 
     * @param handler A function to execute when the event is triggered.
     */
    error(handler: (eventObject: JQueryEventObject) => any): JQuery;
    /**
     * Bind an event handler to the "error" JavaScript event. (DEPRECATED from v1.8)
     * 
     * @param eventData A plain object of data that will be passed to the event handler.
     * @param handler A function to execute when the event is triggered.
     */
    error(eventData: any, handler: (eventObject: JQueryEventObject) => any): JQuery;

    /**
     * Add a collection of DOM elements onto the jQuery stack.
     * 
     * @param elements An array of elements to push onto the stack and make into a new jQuery object.
     */
    pushStack(elements: any[]): JQuery;
    /**
     * Add a collection of DOM elements onto the jQuery stack.
     * 
     * @param elements An array of elements to push onto the stack and make into a new jQuery object.
     * @param name The name of a jQuery method that generated the array of elements.
     * @param arguments The arguments that were passed in to the jQuery method (for serialization).
     */
    pushStack(elements: any[], name: string, arguments: any[]): JQuery;

    /**
     * Insert content, specified by the parameter, after each element in the set of matched elements.
     * 
     * param content1 HTML string, DOM element, array of elements, or jQuery object to insert after each element in the set of matched elements.
     * param content2 One or more additional DOM elements, arrays of elements, HTML strings, or jQuery objects to insert after each element in the set of matched elements.
     */
    after(content1: JQuery, ...content2: any[]): JQuery;
    /**
     * Insert content, specified by the parameter, after each element in the set of matched elements.
     * 
     * param content1 HTML string, DOM element, array of elements, or jQuery object to insert after each element in the set of matched elements.
     * param content2 One or more additional DOM elements, arrays of elements, HTML strings, or jQuery objects to insert after each element in the set of matched elements.
     */
    after(content1: any[], ...content2: any[]): JQuery;
    /**
     * Insert content, specified by the parameter, after each element in the set of matched elements.
     * 
     * param content1 HTML string, DOM element, array of elements, or jQuery object to insert after each element in the set of matched elements.
     * param content2 One or more additional DOM elements, arrays of elements, HTML strings, or jQuery objects to insert after each element in the set of matched elements.
     */
    after(content1: Element, ...content2: any[]): JQuery;
    /**
     * Insert content, specified by the parameter, after each element in the set of matched elements.
     * 
     * param content1 HTML string, DOM element, array of elements, or jQuery object to insert after each element in the set of matched elements.
     * param content2 One or more additional DOM elements, arrays of elements, HTML strings, or jQuery objects to insert after each element in the set of matched elements.
     */
    after(content1: Text, ...content2: any[]): JQuery;
    /**
     * Insert content, specified by the parameter, after each element in the set of matched elements.
     * 
     * param content1 HTML string, DOM element, array of elements, or jQuery object to insert after each element in the set of matched elements.
     * param content2 One or more additional DOM elements, arrays of elements, HTML strings, or jQuery objects to insert after each element in the set of matched elements.
     */
    after(content1: string, ...content2: any[]): JQuery;
    /**
     * Insert content, specified by the parameter, after each element in the set of matched elements.
     * 
     * param func A function that returns an HTML string, DOM element(s), or jQuery object to insert after each element in the set of matched elements. Receives the index position of the element in the set as an argument. Within the function, this refers to the current element in the set.
     */
    after(func: (index: number) => any): JQuery;

    /**
     * Insert content, specified by the parameter, to the end of each element in the set of matched elements.
     * 
     * param content1 DOM element, array of elements, HTML string, or jQuery object to insert at the end of each element in the set of matched elements.
     * param content2 One or more additional DOM elements, arrays of elements, HTML strings, or jQuery objects to insert at the end of each element in the set of matched elements.
     */
    append(content1: JQuery, ...content2: any[]): JQuery;
    /**
     * Insert content, specified by the parameter, to the end of each element in the set of matched elements.
     * 
     * param content1 DOM element, array of elements, HTML string, or jQuery object to insert at the end of each element in the set of matched elements.
     * param content2 One or more additional DOM elements, arrays of elements, HTML strings, or jQuery objects to insert at the end of each element in the set of matched elements.
     */
    append(content1: any[], ...content2: any[]): JQuery;
    /**
     * Insert content, specified by the parameter, to the end of each element in the set of matched elements.
     * 
     * param content1 DOM element, array of elements, HTML string, or jQuery object to insert at the end of each element in the set of matched elements.
     * param content2 One or more additional DOM elements, arrays of elements, HTML strings, or jQuery objects to insert at the end of each element in the set of matched elements.
     */
    append(content1: Element, ...content2: any[]): JQuery;
    /**
     * Insert content, specified by the parameter, to the end of each element in the set of matched elements.
     * 
     * param content1 DOM element, array of elements, HTML string, or jQuery object to insert at the end of each element in the set of matched elements.
     * param content2 One or more additional DOM elements, arrays of elements, HTML strings, or jQuery objects to insert at the end of each element in the set of matched elements.
     */
    append(content1: Text, ...content2: any[]): JQuery;
    /**
     * Insert content, specified by the parameter, to the end of each element in the set of matched elements.
     * 
     * param content1 DOM element, array of elements, HTML string, or jQuery object to insert at the end of each element in the set of matched elements.
     * param content2 One or more additional DOM elements, arrays of elements, HTML strings, or jQuery objects to insert at the end of each element in the set of matched elements.
     */
    append(content1: string, ...content2: any[]): JQuery;
    /**
     * Insert content, specified by the parameter, to the end of each element in the set of matched elements.
     * 
     * param func A function that returns an HTML string, DOM element(s), or jQuery object to insert at the end of each element in the set of matched elements. Receives the index position of the element in the set and the old HTML value of the element as arguments. Within the function, this refers to the current element in the set.
     */
    append(func: (index: number, html: string) => any): JQuery;

    /**
     * Insert every element in the set of matched elements to the end of the target.
     * 
     * @param target A selector, element, HTML string, array of elements, or jQuery object; the matched set of elements will be inserted at the end of the element(s) specified by this parameter.
     */
    appendTo(target: JQuery): JQuery;
    /**
     * Insert every element in the set of matched elements to the end of the target.
     * 
     * @param target A selector, element, HTML string, array of elements, or jQuery object; the matched set of elements will be inserted at the end of the element(s) specified by this parameter.
     */
    appendTo(target: any[]): JQuery;
    /**
     * Insert every element in the set of matched elements to the end of the target.
     * 
     * @param target A selector, element, HTML string, array of elements, or jQuery object; the matched set of elements will be inserted at the end of the element(s) specified by this parameter.
     */
    appendTo(target: Element): JQuery;
    /**
     * Insert every element in the set of matched elements to the end of the target.
     * 
     * @param target A selector, element, HTML string, array of elements, or jQuery object; the matched set of elements will be inserted at the end of the element(s) specified by this parameter.
     */
    appendTo(target: string): JQuery;

    /**
     * Insert content, specified by the parameter, before each element in the set of matched elements.
     * 
     * param content1 HTML string, DOM element, array of elements, or jQuery object to insert before each element in the set of matched elements.
     * param content2 One or more additional DOM elements, arrays of elements, HTML strings, or jQuery objects to insert before each element in the set of matched elements.
     */
    before(content1: JQuery, ...content2: any[]): JQuery;
    /**
     * Insert content, specified by the parameter, before each element in the set of matched elements.
     * 
     * param content1 HTML string, DOM element, array of elements, or jQuery object to insert before each element in the set of matched elements.
     * param content2 One or more additional DOM elements, arrays of elements, HTML strings, or jQuery objects to insert before each element in the set of matched elements.
     */
    before(content1: any[], ...content2: any[]): JQuery;
    /**
     * Insert content, specified by the parameter, before each element in the set of matched elements.
     * 
     * param content1 HTML string, DOM element, array of elements, or jQuery object to insert before each element in the set of matched elements.
     * param content2 One or more additional DOM elements, arrays of elements, HTML strings, or jQuery objects to insert before each element in the set of matched elements.
     */
    before(content1: Element, ...content2: any[]): JQuery;
    /**
     * Insert content, specified by the parameter, before each element in the set of matched elements.
     * 
     * param content1 HTML string, DOM element, array of elements, or jQuery object to insert before each element in the set of matched elements.
     * param content2 One or more additional DOM elements, arrays of elements, HTML strings, or jQuery objects to insert before each element in the set of matched elements.
     */
    before(content1: Text, ...content2: any[]): JQuery;
    /**
     * Insert content, specified by the parameter, before each element in the set of matched elements.
     * 
     * param content1 HTML string, DOM element, array of elements, or jQuery object to insert before each element in the set of matched elements.
     * param content2 One or more additional DOM elements, arrays of elements, HTML strings, or jQuery objects to insert before each element in the set of matched elements.
     */
    before(content1: string, ...content2: any[]): JQuery;
    /**
     * Insert content, specified by the parameter, before each element in the set of matched elements.
     * 
     * param func A function that returns an HTML string, DOM element(s), or jQuery object to insert before each element in the set of matched elements. Receives the index position of the element in the set as an argument. Within the function, this refers to the current element in the set.
     */
    before(func: (index: number) => any): JQuery;

    /**
     * Create a deep copy of the set of matched elements.
     * 
     * param withDataAndEvents A Boolean indicating whether event handlers and data should be copied along with the elements. The default value is false.
     * param deepWithDataAndEvents A Boolean indicating whether event handlers and data for all children of the cloned element should be copied. By default its value matches the first argument's value (which defaults to false).
     */
    clone(withDataAndEvents?: boolean, deepWithDataAndEvents?: boolean): JQuery;

    /**
     * Remove the set of matched elements from the DOM.
     * 
     * param selector A selector expression that filters the set of matched elements to be removed.
     */
    detach(selector?: string): JQuery;

    /**
     * Remove all child nodes of the set of matched elements from the DOM.
     */
    empty(): JQuery;

    /**
     * Insert every element in the set of matched elements after the target.
     * 
     * param target A selector, element, array of elements, HTML string, or jQuery object; the matched set of elements will be inserted after the element(s) specified by this parameter.
     */
    insertAfter(target: JQuery): JQuery;
    /**
     * Insert every element in the set of matched elements after the target.
     * 
     * param target A selector, element, array of elements, HTML string, or jQuery object; the matched set of elements will be inserted after the element(s) specified by this parameter.
     */
    insertAfter(target: any[]): JQuery;
    /**
     * Insert every element in the set of matched elements after the target.
     * 
     * param target A selector, element, array of elements, HTML string, or jQuery object; the matched set of elements will be inserted after the element(s) specified by this parameter.
     */
    insertAfter(target: Element): JQuery;
    /**
     * Insert every element in the set of matched elements after the target.
     * 
     * param target A selector, element, array of elements, HTML string, or jQuery object; the matched set of elements will be inserted after the element(s) specified by this parameter.
     */
    insertAfter(target: Text): JQuery;
    /**
     * Insert every element in the set of matched elements after the target.
     * 
     * param target A selector, element, array of elements, HTML string, or jQuery object; the matched set of elements will be inserted after the element(s) specified by this parameter.
     */
    insertAfter(target: string): JQuery;

    /**
     * Insert every element in the set of matched elements before the target.
     * 
     * param target A selector, element, array of elements, HTML string, or jQuery object; the matched set of elements will be inserted before the element(s) specified by this parameter.
     */
    insertBefore(target: JQuery): JQuery;
    /**
     * Insert every element in the set of matched elements before the target.
     * 
     * param target A selector, element, array of elements, HTML string, or jQuery object; the matched set of elements will be inserted before the element(s) specified by this parameter.
     */
    insertBefore(target: any[]): JQuery;
    /**
     * Insert every element in the set of matched elements before the target.
     * 
     * param target A selector, element, array of elements, HTML string, or jQuery object; the matched set of elements will be inserted before the element(s) specified by this parameter.
     */
    insertBefore(target: Element): JQuery;
    /**
     * Insert every element in the set of matched elements before the target.
     * 
     * param target A selector, element, array of elements, HTML string, or jQuery object; the matched set of elements will be inserted before the element(s) specified by this parameter.
     */
    insertBefore(target: Text): JQuery;
    /**
     * Insert every element in the set of matched elements before the target.
     * 
     * param target A selector, element, array of elements, HTML string, or jQuery object; the matched set of elements will be inserted before the element(s) specified by this parameter.
     */
    insertBefore(target: string): JQuery;

    /**
     * Insert content, specified by the parameter, to the beginning of each element in the set of matched elements.
     * 
     * param content1 DOM element, array of elements, HTML string, or jQuery object to insert at the beginning of each element in the set of matched elements.
     * param content2 One or more additional DOM elements, arrays of elements, HTML strings, or jQuery objects to insert at the beginning of each element in the set of matched elements.
     */
    prepend(content1: JQuery, ...content2: any[]): JQuery;
    /**
     * Insert content, specified by the parameter, to the beginning of each element in the set of matched elements.
     * 
     * param content1 DOM element, array of elements, HTML string, or jQuery object to insert at the beginning of each element in the set of matched elements.
     * param content2 One or more additional DOM elements, arrays of elements, HTML strings, or jQuery objects to insert at the beginning of each element in the set of matched elements.
     */
    prepend(content1: any[], ...content2: any[]): JQuery;
    /**
     * Insert content, specified by the parameter, to the beginning of each element in the set of matched elements.
     * 
     * param content1 DOM element, array of elements, HTML string, or jQuery object to insert at the beginning of each element in the set of matched elements.
     * param content2 One or more additional DOM elements, arrays of elements, HTML strings, or jQuery objects to insert at the beginning of each element in the set of matched elements.
     */
    prepend(content1: Element, ...content2: any[]): JQuery;
    /**
     * Insert content, specified by the parameter, to the beginning of each element in the set of matched elements.
     * 
     * param content1 DOM element, array of elements, HTML string, or jQuery object to insert at the beginning of each element in the set of matched elements.
     * param content2 One or more additional DOM elements, arrays of elements, HTML strings, or jQuery objects to insert at the beginning of each element in the set of matched elements.
     */
    prepend(content1: Text, ...content2: any[]): JQuery;
    /**
     * Insert content, specified by the parameter, to the beginning of each element in the set of matched elements.
     * 
     * param content1 DOM element, array of elements, HTML string, or jQuery object to insert at the beginning of each element in the set of matched elements.
     * param content2 One or more additional DOM elements, arrays of elements, HTML strings, or jQuery objects to insert at the beginning of each element in the set of matched elements.
     */
    prepend(content1: string, ...content2: any[]): JQuery;
    /**
     * Insert content, specified by the parameter, to the beginning of each element in the set of matched elements.
     * 
     * param func A function that returns an HTML string, DOM element(s), or jQuery object to insert at the beginning of each element in the set of matched elements. Receives the index position of the element in the set and the old HTML value of the element as arguments. Within the function, this refers to the current element in the set.
     */
    prepend(func: (index: number, html: string) => any): JQuery;

    /**
     * Insert every element in the set of matched elements to the beginning of the target.
     * 
     * @param target A selector, element, HTML string, array of elements, or jQuery object; the matched set of elements will be inserted at the beginning of the element(s) specified by this parameter.
     */
    prependTo(target: JQuery): JQuery;
    /**
     * Insert every element in the set of matched elements to the beginning of the target.
     * 
     * @param target A selector, element, HTML string, array of elements, or jQuery object; the matched set of elements will be inserted at the beginning of the element(s) specified by this parameter.
     */
    prependTo(target: any[]): JQuery;
    /**
     * Insert every element in the set of matched elements to the beginning of the target.
     * 
     * @param target A selector, element, HTML string, array of elements, or jQuery object; the matched set of elements will be inserted at the beginning of the element(s) specified by this parameter.
     */
    prependTo(target: Element): JQuery;
    /**
     * Insert every element in the set of matched elements to the beginning of the target.
     * 
     * @param target A selector, element, HTML string, array of elements, or jQuery object; the matched set of elements will be inserted at the beginning of the element(s) specified by this parameter.
     */
    prependTo(target: string): JQuery;

    /**
     * Remove the set of matched elements from the DOM.
     * 
     * @param selector A selector expression that filters the set of matched elements to be removed.
     */
    remove(selector?: string): JQuery;

    /**
     * Replace each target element with the set of matched elements.
     * 
     * @param target A selector string, jQuery object, DOM element, or array of elements indicating which element(s) to replace.
     */
    replaceAll(target: JQuery): JQuery;
    /**
     * Replace each target element with the set of matched elements.
     * 
     * @param target A selector string, jQuery object, DOM element, or array of elements indicating which element(s) to replace.
     */
    replaceAll(target: any[]): JQuery;
    /**
     * Replace each target element with the set of matched elements.
     * 
     * @param target A selector string, jQuery object, DOM element, or array of elements indicating which element(s) to replace.
     */
    replaceAll(target: Element): JQuery;
    /**
     * Replace each target element with the set of matched elements.
     * 
     * @param target A selector string, jQuery object, DOM element, or array of elements indicating which element(s) to replace.
     */
    replaceAll(target: string): JQuery;

    /**
     * Replace each element in the set of matched elements with the provided new content and return the set of elements that was removed.
     * 
     * param newContent The content to insert. May be an HTML string, DOM element, array of DOM elements, or jQuery object.
     */
    replaceWith(newContent: JQuery): JQuery;
    /**
     * Replace each element in the set of matched elements with the provided new content and return the set of elements that was removed.
     * 
     * param newContent The content to insert. May be an HTML string, DOM element, array of DOM elements, or jQuery object.
     */
    replaceWith(newContent: any[]): JQuery;
    /**
     * Replace each element in the set of matched elements with the provided new content and return the set of elements that was removed.
     * 
     * param newContent The content to insert. May be an HTML string, DOM element, array of DOM elements, or jQuery object.
     */
    replaceWith(newContent: Element): JQuery;
    /**
     * Replace each element in the set of matched elements with the provided new content and return the set of elements that was removed.
     * 
     * param newContent The content to insert. May be an HTML string, DOM element, array of DOM elements, or jQuery object.
     */
    replaceWith(newContent: Text): JQuery;
    /**
     * Replace each element in the set of matched elements with the provided new content and return the set of elements that was removed.
     * 
     * param newContent The content to insert. May be an HTML string, DOM element, array of DOM elements, or jQuery object.
     */
    replaceWith(newContent: string): JQuery;
    /**
     * Replace each element in the set of matched elements with the provided new content and return the set of elements that was removed.
     * 
     * param func A function that returns content with which to replace the set of matched elements.
     */
    replaceWith(func: () => any): JQuery;

    /**
     * Get the combined text contents of each element in the set of matched elements, including their descendants.
     */
    text(): string;
    /**
     * Set the content of each element in the set of matched elements to the specified text.
     * 
     * @param text The text to set as the content of each matched element.
     */
    text(text: string): JQuery;
    /**
     * Set the content of each element in the set of matched elements to the specified text.
     * 
     * @param text The text to set as the content of each matched element.
     */
    text(text: number): JQuery;
    /**
     * Set the content of each element in the set of matched elements to the specified text.
     * 
     * @param text The text to set as the content of each matched element.
     */
    text(text: boolean): JQuery;
    /**
     * Set the content of each element in the set of matched elements to the specified text.
     * 
     * @param func A function returning the text content to set. Receives the index position of the element in the set and the old text value as arguments.
     */
    text(func: (index: number, text: string) => string): JQuery;

    /**
     * Retrieve all the elements contained in the jQuery set, as an array.
     */
    toArray(): any[];

    /**
     * Remove the parents of the set of matched elements from the DOM, leaving the matched elements in their place.
     */
    unwrap(): JQuery;

    /**
     * Wrap an HTML structure around each element in the set of matched elements.
     * 
     * @param wrappingElement A selector, element, HTML string, or jQuery object specifying the structure to wrap around the matched elements.
     */
    wrap(wrappingElement: JQuery): JQuery;
    /**
     * Wrap an HTML structure around each element in the set of matched elements.
     * 
     * @param wrappingElement A selector, element, HTML string, or jQuery object specifying the structure to wrap around the matched elements.
     */
    wrap(wrappingElement: Element): JQuery;
    /**
     * Wrap an HTML structure around each element in the set of matched elements.
     * 
     * @param wrappingElement A selector, element, HTML string, or jQuery object specifying the structure to wrap around the matched elements.
     */
    wrap(wrappingElement: string): JQuery;
    /**
     * Wrap an HTML structure around each element in the set of matched elements.
     * 
     * @param func A callback function returning the HTML content or jQuery object to wrap around the matched elements. Receives the index position of the element in the set as an argument. Within the function, this refers to the current element in the set.
     */
    wrap(func: (index: number) => any): JQuery;

    /**
     * Wrap an HTML structure around all elements in the set of matched elements.
     * 
     * @param wrappingElement A selector, element, HTML string, or jQuery object specifying the structure to wrap around the matched elements.
     */
    wrapAll(wrappingElement: JQuery): JQuery;
    /**
     * Wrap an HTML structure around all elements in the set of matched elements.
     * 
     * @param wrappingElement A selector, element, HTML string, or jQuery object specifying the structure to wrap around the matched elements.
     */
    wrapAll(wrappingElement: Element): JQuery;
    /**
     * Wrap an HTML structure around all elements in the set of matched elements.
     * 
     * @param wrappingElement A selector, element, HTML string, or jQuery object specifying the structure to wrap around the matched elements.
     */
    wrapAll(wrappingElement: string): JQuery;

    /**
     * Wrap an HTML structure around the content of each element in the set of matched elements.
     * 
     * @param wrappingElement An HTML snippet, selector expression, jQuery object, or DOM element specifying the structure to wrap around the content of the matched elements.
     */
    wrapInner(wrappingElement: JQuery): JQuery;
    /**
     * Wrap an HTML structure around the content of each element in the set of matched elements.
     * 
     * @param wrappingElement An HTML snippet, selector expression, jQuery object, or DOM element specifying the structure to wrap around the content of the matched elements.
     */
    wrapInner(wrappingElement: Element): JQuery;
    /**
     * Wrap an HTML structure around the content of each element in the set of matched elements.
     * 
     * @param wrappingElement An HTML snippet, selector expression, jQuery object, or DOM element specifying the structure to wrap around the content of the matched elements.
     */
    wrapInner(wrappingElement: string): JQuery;
    /**
     * Wrap an HTML structure around the content of each element in the set of matched elements.
     * 
     * @param func A callback function which generates a structure to wrap around the content of the matched elements. Receives the index position of the element in the set as an argument. Within the function, this refers to the current element in the set.
     */
    wrapInner(func: (index: number) => any): JQuery;

    /**
     * Iterate over a jQuery object, executing a function for each matched element.
     * 
     * @param func A function to execute for each matched element.
     */
    each(func: (index: number, elem: Element) => any): JQuery;

    /**
     * Retrieve one of the elements matched by the jQuery object.
     * 
     * @param index A zero-based integer indicating which element to retrieve.
     */
    get(index: number): HTMLElement;
    /**
     * Retrieve the elements matched by the jQuery object.
     */
    get(): any[];

    /**
     * Search for a given element from among the matched elements.
     */
    index(): number;
    /**
     * Search for a given element from among the matched elements.
     * 
     * @param selector A selector representing a jQuery collection in which to look for an element.
     */
    index(selector: string): number;
    /**
     * Search for a given element from among the matched elements.
     * 
     * @param element The DOM element or first element within the jQuery object to look for.
     */
    index(element: JQuery): number;
    /**
     * Search for a given element from among the matched elements.
     * 
     * @param element The DOM element or first element within the jQuery object to look for.
     */
    index(element: Element): number;
    index(element: any): number;

    /**
     * The number of elements in the jQuery object.
     */
    length: number;
    /**
     * A selector representing selector passed to jQuery(), if any, when creating the original set.
     * version deprecated: 1.7, removed: 1.9
     */
    selector: string;
    [index: string]: any;
    [index: number]: HTMLElement;

    /**
     * Add elements to the set of matched elements.
     * 
     * @param selector A string representing a selector expression to find additional elements to add to the set of matched elements.
     * @param context The point in the document at which the selector should begin matching; similar to the context argument of the $(selector, context) method.
     */
    add(selector: string, context?: Element): JQuery;
    /**
     * Add elements to the set of matched elements.
     * 
     * @param elements One or more elements to add to the set of matched elements.
     */
    add(...elements: Element[]): JQuery;
    /**
     * Add elements to the set of matched elements.
     * 
     * @param html An HTML fragment to add to the set of matched elements.
     */
    add(html: string): JQuery;
    /**
     * Add elements to the set of matched elements.
     * 
     * @param obj An existing jQuery object to add to the set of matched elements.
     */
    add(obj: JQuery): JQuery;

    /**
     * Get the children of each element in the set of matched elements, optionally filtered by a selector.
     * 
     * @param selector A string containing a selector expression to match elements against.
     */
    children(selector?: string): JQuery;
    children(selector?: any): JQuery;

    /**
     * For each element in the set, get the first element that matches the selector by testing the element itself and traversing up through its ancestors in the DOM tree.
     * 
     * @param selector A string containing a selector expression to match elements against.
     */
    closest(selector: string): JQuery;
    /**
     * For each element in the set, get the first element that matches the selector by testing the element itself and traversing up through its ancestors in the DOM tree.
     * 
     * @param selector A string containing a selector expression to match elements against.
     * @param context A DOM element within which a matching element may be found. If no context is passed in then the context of the jQuery set will be used instead.
     */
    closest(selector: string, context?: Element): JQuery;
    /**
     * For each element in the set, get the first element that matches the selector by testing the element itself and traversing up through its ancestors in the DOM tree.
     * 
     * @param obj A jQuery object to match elements against.
     */
    closest(obj: JQuery): JQuery;
    /**
     * For each element in the set, get the first element that matches the selector by testing the element itself and traversing up through its ancestors in the DOM tree.
     * 
     * @param element An element to match elements against.
     */
    closest(element: Element): JQuery;

    /**
     * Get an array of all the elements and selectors matched against the current element up through the DOM tree.
     * 
     * @param selectors An array or string containing a selector expression to match elements against (can also be a jQuery object).
     * @param context A DOM element within which a matching element may be found. If no context is passed in then the context of the jQuery set will be used instead.
     */
    closest(selectors: any, context?: Element): any[];

    /**
     * Get the children of each element in the set of matched elements, including text and comment nodes.
     */
    contents(): JQuery;

    /**
     * End the most recent filtering operation in the current chain and return the set of matched elements to its previous state.
     */
    end(): JQuery;

    /**
     * Reduce the set of matched elements to the one at the specified index.
     * 
     * @param index An integer indicating the 0-based position of the element. OR An integer indicating the position of the element, counting backwards from the last element in the set.
     *  
     */
    eq(index: number): JQuery;

    /**
     * Reduce the set of matched elements to those that match the selector or pass the function's test.
     * 
     * @param selector A string containing a selector expression to match the current set of elements against.
     */
    filter(selector: string): JQuery;
    /**
     * Reduce the set of matched elements to those that match the selector or pass the function's test.
     * 
     * @param func A function used as a test for each element in the set. this is the current DOM element.
     */
    filter(func: (index: number, element: Element) => any): JQuery;
    /**
     * Reduce the set of matched elements to those that match the selector or pass the function's test.
     * 
     * @param element An element to match the current set of elements against.
     */
    filter(element: Element): JQuery;
    /**
     * Reduce the set of matched elements to those that match the selector or pass the function's test.
     * 
     * @param obj An existing jQuery object to match the current set of elements against.
     */
    filter(obj: JQuery): JQuery;

    /**
     * Get the descendants of each element in the current set of matched elements, filtered by a selector, jQuery object, or element.
     * 
     * @param selector A string containing a selector expression to match elements against.
     */
    find(selector: string): JQuery;
    /**
     * Get the descendants of each element in the current set of matched elements, filtered by a selector, jQuery object, or element.
     * 
     * @param element An element to match elements against.
     */
    find(element: Element): JQuery;
    /**
     * Get the descendants of each element in the current set of matched elements, filtered by a selector, jQuery object, or element.
     * 
     * @param obj A jQuery object to match elements against.
     */
    find(obj: JQuery): JQuery;

    /**
     * Reduce the set of matched elements to the first in the set.
     */
    first(): JQuery;

    /**
     * Reduce the set of matched elements to those that have a descendant that matches the selector or DOM element.
     * 
     * @param selector A string containing a selector expression to match elements against.
     */
    has(selector: string): JQuery;
    /**
     * Reduce the set of matched elements to those that have a descendant that matches the selector or DOM element.
     * 
     * @param contained A DOM element to match elements against.
     */
    has(contained: Element): JQuery;

    /**
     * Check the current matched set of elements against a selector, element, or jQuery object and return true if at least one of these elements matches the given arguments.
     * 
     * @param selector A string containing a selector expression to match elements against.
     */
    is(selector: string): boolean;
    /**
     * Check the current matched set of elements against a selector, element, or jQuery object and return true if at least one of these elements matches the given arguments.
     * 
     * @param func A function used as a test for the set of elements. It accepts one argument, index, which is the element's index in the jQuery collection.Within the function, this refers to the current DOM element.
     */
    is(func: (index: number) => any): boolean;
    /**
     * Check the current matched set of elements against a selector, element, or jQuery object and return true if at least one of these elements matches the given arguments.
     * 
     * @param obj An existing jQuery object to match the current set of elements against.
     */
    is(obj: JQuery): boolean;
    /**
     * Check the current matched set of elements against a selector, element, or jQuery object and return true if at least one of these elements matches the given arguments.
     * 
     * @param elements One or more elements to match the current set of elements against.
     */
    is(elements: any): boolean;

    /**
     * Reduce the set of matched elements to the final one in the set.
     */
    last(): JQuery;

    /**
     * Pass each element in the current matched set through a function, producing a new jQuery object containing the return values.
     * 
     * @param callback A function object that will be invoked for each element in the current set.
     */
    map(callback: (index: number, domElement: Element) => any): JQuery;

    /**
     * Get the immediately following sibling of each element in the set of matched elements. If a selector is provided, it retrieves the next sibling only if it matches that selector.
     * 
     * @param selector A string containing a selector expression to match elements against.
     */
    next(selector?: string): JQuery;

    /**
     * Get all following siblings of each element in the set of matched elements, optionally filtered by a selector.
     * 
     * @param selector A string containing a selector expression to match elements against.
     */
    nextAll(selector?: string): JQuery;

    /**
     * Get all following siblings of each element up to but not including the element matched by the selector, DOM node, or jQuery object passed.
     * 
     * @param selector A string containing a selector expression to indicate where to stop matching following sibling elements.
     * @param filter A string containing a selector expression to match elements against.
     */
    nextUntil(selector?: string, filter?: string): JQuery;
    /**
     * Get all following siblings of each element up to but not including the element matched by the selector, DOM node, or jQuery object passed.
     * 
     * @param element A DOM node or jQuery object indicating where to stop matching following sibling elements.
     * @param filter A string containing a selector expression to match elements against.
     */
    nextUntil(element?: Element, filter?: string): JQuery;
    /**
     * Get all following siblings of each element up to but not including the element matched by the selector, DOM node, or jQuery object passed.
     * 
     * @param obj A DOM node or jQuery object indicating where to stop matching following sibling elements.
     * @param filter A string containing a selector expression to match elements against.
     */
    nextUntil(obj?: JQuery, filter?: string): JQuery;

    /**
     * Remove elements from the set of matched elements.
     * 
     * @param selector A string containing a selector expression to match elements against.
     */
    not(selector: string): JQuery;
    /**
     * Remove elements from the set of matched elements.
     * 
     * @param func A function used as a test for each element in the set. this is the current DOM element.
     */
    not(func: (index: number) => any): JQuery;
    /**
     * Remove elements from the set of matched elements.
     * 
     * @param elements One or more DOM elements to remove from the matched set.
     */
    not(...elements: Element[]): JQuery;
    /**
     * Remove elements from the set of matched elements.
     * 
     * @param obj An existing jQuery object to match the current set of elements against.
     */
    not(obj: JQuery): JQuery;

    /**
     * Get the closest ancestor element that is positioned.
     */
    offsetParent(): JQuery;

    /**
     * Get the parent of each element in the current set of matched elements, optionally filtered by a selector.
     * 
     * @param selector A string containing a selector expression to match elements against.
     */
    parent(selector?: string): JQuery;

    /**
     * Get the ancestors of each element in the current set of matched elements, optionally filtered by a selector.
     * 
     * @param selector A string containing a selector expression to match elements against.
     */
    parents(selector?: string): JQuery;

    /**
     * Get the ancestors of each element in the current set of matched elements, up to but not including the element matched by the selector, DOM node, or jQuery object.
     * 
     * @param selector A string containing a selector expression to indicate where to stop matching ancestor elements.
     * @param filter A string containing a selector expression to match elements against.
     */
    parentsUntil(selector?: string, filter?: string): JQuery;
    /**
     * Get the ancestors of each element in the current set of matched elements, up to but not including the element matched by the selector, DOM node, or jQuery object.
     * 
     * @param element A DOM node or jQuery object indicating where to stop matching ancestor elements.
     * @param filter A string containing a selector expression to match elements against.
     */
    parentsUntil(element?: Element, filter?: string): JQuery;
    /**
     * Get the ancestors of each element in the current set of matched elements, up to but not including the element matched by the selector, DOM node, or jQuery object.
     * 
     * @param obj A DOM node or jQuery object indicating where to stop matching ancestor elements.
     * @param filter A string containing a selector expression to match elements against.
     */
    parentsUntil(obj?: JQuery, filter?: string): JQuery;

    /**
     * Get the immediately preceding sibling of each element in the set of matched elements, optionally filtered by a selector.
     * 
     * @param selector A string containing a selector expression to match elements against.
     */
    prev(selector?: string): JQuery;

    /**
     * Get all preceding siblings of each element in the set of matched elements, optionally filtered by a selector.
     * 
     * @param selector A string containing a selector expression to match elements against.
     */
    prevAll(selector?: string): JQuery;

    /**
     * Get all preceding siblings of each element up to but not including the element matched by the selector, DOM node, or jQuery object.
     * 
     * @param selector A string containing a selector expression to indicate where to stop matching preceding sibling elements.
     * @param filter A string containing a selector expression to match elements against.
     */
    prevUntil(selector?: string, filter?: string): JQuery;
    /**
     * Get all preceding siblings of each element up to but not including the element matched by the selector, DOM node, or jQuery object.
     * 
     * @param element A DOM node or jQuery object indicating where to stop matching preceding sibling elements.
     * @param filter A string containing a selector expression to match elements against.
     */
    prevUntil(element?: Element, filter?: string): JQuery;
    /**
     * Get all preceding siblings of each element up to but not including the element matched by the selector, DOM node, or jQuery object.
     * 
     * @param obj A DOM node or jQuery object indicating where to stop matching preceding sibling elements.
     * @param filter A string containing a selector expression to match elements against.
     */
    prevUntil(obj?: JQuery, filter?: string): JQuery;

    /**
     * Get the siblings of each element in the set of matched elements, optionally filtered by a selector.
     * 
     * @param selector A string containing a selector expression to match elements against.
     */
    siblings(selector?: string): JQuery;

    /**
     * Reduce the set of matched elements to a subset specified by a range of indices.
     * 
     * @param start An integer indicating the 0-based position at which the elements begin to be selected. If negative, it indicates an offset from the end of the set.
     * @param end An integer indicating the 0-based position at which the elements stop being selected. If negative, it indicates an offset from the end of the set. If omitted, the range continues until the end of the set.
     */
    slice(start: number, end?: number): JQuery;

    /**
     * Show the queue of functions to be executed on the matched elements.
     * 
     * @param queueName A string containing the name of the queue. Defaults to fx, the standard effects queue.
     */
    queue(queueName?: string): any[];
    /**
     * Manipulate the queue of functions to be executed, once for each matched element.
     * 
     * @param newQueue An array of functions to replace the current queue contents.
     */
    queue(newQueue: Function[]): JQuery;
    /**
     * Manipulate the queue of functions to be executed, once for each matched element.
     * 
     * @param callback The new function to add to the queue, with a function to call that will dequeue the next item.
     */
    queue(callback: Function): JQuery;
    /**
     * Manipulate the queue of functions to be executed, once for each matched element.
     * 
     * @param queueName A string containing the name of the queue. Defaults to fx, the standard effects queue.
     * @param newQueue An array of functions to replace the current queue contents.
     */
    queue(queueName: string, newQueue: Function[]): JQuery;
    /**
     * Manipulate the queue of functions to be executed, once for each matched element.
     * 
     * @param queueName A string containing the name of the queue. Defaults to fx, the standard effects queue.
     * @param callback The new function to add to the queue, with a function to call that will dequeue the next item.
     */
    queue(queueName: string, callback: Function): JQuery;

    // InfoNav plugins/extensions
    multiline(text: string): JQuery;
    togglePanelControl(): JQuery;
}

interface JQueryEventHandler {
    (eventObject: JQueryEventObject, data?: any): void;
    (eventObject: JQueryEventObject): void;
}

declare module "jquery" {
    export = $;
}
declare var jQuery: JQueryStatic;
declare var $: JQueryStatic;

// Type definitions for d3JS
// Project: http://d3js.org/
// Definitions by: Boris Yankov <https://github.com/borisyankov>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

declare module D3 {
    export interface Selectors {
        /**
        * Select an element from the current document
        */
        select: {
            /**
            * Selects the first element that matches the specified selector string
            *
            * @param selector Selection String to match
            */
            (selector: string): Selection;
            /**
            * Selects the specified node
            *
            * @param element Node element to select
            */
            (element: EventTarget): Selection;
        };

        /**
        * Select multiple elements from the current document
        */
        selectAll: {
            /**
            * Selects all elements that match the specified selector
            *
            * @param selector Selection String to match
            */
            (selector: string): Selection;
            /**
            * Selects the specified array of elements
            *
            * @param elements Array of node elements to select
            */
            (elements: EventTarget[]): Selection;
        };
    }

    export interface D3Event extends Event{
        dx: number;
        dy: number;
        clientX: number;
        clientY: number;
        translate: number[];
        scale: number;
        sourceEvent: D3Event;
        x: number;
        y: number;
        keyCode: number;
        altKey: any;
        ctrlKey: any;
        type: string;
    }

    export interface Base extends Selectors {
        /**
        * Create a behavior
        */
        behavior: Behavior.Behavior;
        /**
        * Access the current user event for interaction
        */
        event: D3Event;

        /**
        * Compare two values for sorting.
        * Returns -1 if a is less than b, or 1 if a is greater than b, or 0
        *
        * @param a First value
        * @param b Second value
        */
        ascending<T>(a: T, b: T): number;
        /**
        * Compare two values for sorting.
        * Returns -1 if a is greater than b, or 1 if a is less than b, or 0
        *
        * @param a First value
        * @param b Second value
        */
        descending<T>(a: T, b: T): number;
        /**
        * Find the minimum value in an array
        *
        * @param arr Array to search
        * @param map Accsessor function
        */
        min<T, U>(arr: T[], map: (v?: T, i?: number) => U): U;
        /**
        * Find the minimum value in an array
        *
        * @param arr Array to search
        */
        min<T>(arr: T[]): T;
        /**
        * Find the maximum value in an array
        *
        * @param arr Array to search
        * @param map Accsessor function
        */
        max<T, U>(arr: T[], map: (v?: T, i?: number) => U): U;
        /**
        * Find the maximum value in an array
        *
        * @param arr Array to search
        */
        max<T>(arr: T[]): T;
        /**
        * Find the minimum and maximum value in an array
        *
        * @param arr Array to search
        * @param map Accsessor function
        */
        extent<T, U>(arr: T[], map: (v: T) => U): U[];
        /**
        * Find the minimum and maximum value in an array
        *
        * @param arr Array to search
        */
        extent<T>(arr: T[]): T[];
        /**
        * Compute the sum of an array of numbers
        *
        * @param arr Array to search
        * @param map Accsessor function
        */
        sum<T>(arr: T[], map: (v: T) => number): number;
        /**
        * Compute the sum of an array of numbers
        *
        * @param arr Array to search
        */
        sum(arr: number[]): number;
        /**
        * Compute the arithmetic mean of an array of numbers
        *
        * @param arr Array to search
        * @param map Accsessor function
        */
        mean<T>(arr: T[], map: (v: T) => number): number;
        /**
        * Compute the arithmetic mean of an array of numbers
        *
        * @param arr Array to search
        */
        mean(arr: number[]): number;
        /**
        * Compute the median of an array of numbers (the 0.5-quantile).
        *
        * @param arr Array to search
        * @param map Accsessor function
        */
        median<T>(arr: T[], map: (v: T) => number): number;
        /**
        * Compute the median of an array of numbers (the 0.5-quantile).
        *
        * @param arr Array to search
        */
        median(arr: number[]): number;
        /**
        * Compute a quantile for a sorted array of numbers.
        *
        * @param arr Array to search
        * @param p The quantile to return
        */
        quantile: (arr: number[], p: number) => number;
        /**
        * Locate the insertion point for x in array to maintain sorted order
        *
        * @param arr Array to search
        * @param x Value to search for insertion point
        * @param low Minimum value of array subset
        * @param hihg Maximum value of array subset
        */
        bisect<T>(arr: T[], x: T, low?: number, high?: number): number;
        /**
        * Locate the insertion point for x in array to maintain sorted order
        *
        * @param arr Array to search
        * @param x Value to serch for insertion point
        * @param low Minimum value of array subset
        * @param high Maximum value of array subset
        */
        bisectLeft<T>(arr: T[], x: T, low?: number, high?: number): number;
        /**
        * Locate the insertion point for x in array to maintain sorted order
        *
        * @param arr Array to search
        * @param x Value to serch for insertion point
        * @param low Minimum value of array subset
        * @param high Maximum value of array subset
        */
        bisectRight<T>(arr: T[], x: T, low?: number, high?: number): number;
        /**
        * Bisect using an accessor.
        *
        * @param accessor Accessor function
        */
        bisector(accessor: (data: any, index: number) => any): any;
        /**
        * Randomize the order of an array.
        *
        * @param arr Array to randomize
        */
        shuffle<T>(arr: T[]): T[];
        /**
        * Reorder an array of elements according to an array of indexes
        *
        * @param arr Array to reorder
        * @param indexes Array containing the order the elements should be returned in
        */
        permute(arr: any[], indexes: any[]): any[];
        /**
        * Transpose a variable number of arrays.
        *
        * @param arrs Arrays to transpose
        */
        zip(...arrs: any[]): any[];
        /**
        * Parse the given 2D affine transform string, as defined by SVG's transform attribute.
        *
        * @param definition 2D affine transform string
        */
        transform(definition: string): any;
        /**
        * Transpose an array of arrays.
        *
        * @param matrix Two dimensional array to transpose
        */
        transpose(matrix: any[]): any[];
        /**
        * Creates an array containing tuples of adjacent pairs
        *
        * @param arr An array containing entries to pair
        * @returns any[][] An array of 2-element tuples for each pair
        */
        pairs(arr: any[]): any[][];
        /**
        * List the keys of an associative array.
        *
        * @param map Array of objects to get the key values from
        */
        keys(map: any): string[];
        /**
        * List the values of an associative array.
        *
        * @param map Array of objects to get the values from
        */
        values(map: any): any[];
        /**
        * List the key-value entries of an associative array.
        *
        * @param map Array of objects to get the key-value pairs from
        */
        entries(map: any): any[];
        /**
        * merge multiple arrays into one array
        *
        * @param map Arrays to merge
        */
        merge(...map: any[]): any[];
        /**
        * Generate a range of numeric values.
        */
        range: {
            /**
            * Generate a range of numeric values from 0.
            *
            * @param stop Value to generate the range to
            * @param step Step between each value
            */
            (stop: number, step?: number): number[];
            /**
            * Generate a range of numeric values.
            *
            * @param start Value to start
            * @param stop Value to generate the range to
            * @param step Step between each value
            */
            (start: number, stop?: number, step?: number): number[];
        };
        /**
        * Create new nest operator
        */
        nest(): Nest;
        /**
        * Request a resource using XMLHttpRequest.
        */
        xhr: {
            /**
            * Creates an asynchronous request for specified url
            *
            * @param url Url to request
            * @param callback Function to invoke when resource is loaded or the request fails
            */
            (url: string, callback?: (xhr: XMLHttpRequest) => void ): Xhr;
            /**
            * Creates an asynchronous request for specified url
            *
            * @param url Url to request
            * @param mime MIME type to request
            * @param callback Function to invoke when resource is loaded or the request fails
            */
            (url: string, mime: string, callback?: (xhr: XMLHttpRequest) => void ): Xhr;
        };
        /**
        * Request a text file
        */
        text: {
            /**
            * Request a text file
            *
            * @param url Url to request
            * @param callback Function to invoke when resource is loaded or the request fails
            */
            (url: string, callback?: (response: string) => void ): Xhr;
            /**
            * Request a text file
            *
            * @param url Url to request
            * @param mime MIME type to request
            * @param callback Function to invoke when resource is loaded or the request fails
            */
            (url: string, mime: string, callback?: (response: string) => void ): Xhr;
        };
        /**
        * Request a JSON blob
        *
        * @param url Url to request
        * @param callback Function to invoke when resource is loaded or the request fails
        */
        json: (url: string, callback?: (error: any, data: any) => void ) => Xhr;
        /**
        * Request an HTML document fragment.
        */
        xml: {
            /**
            * Request an HTML document fragment.
            *
            * @param url Url to request
            * @param callback Function to invoke when resource is loaded or the request fails
            */
            (url: string, callback?: (response: Document) => void ): Xhr;
            /**
            * Request an HTML document fragment.
            *
            * @param url Url to request
            * @param mime MIME type to request
            * @param callback Function to invoke when resource is loaded or the request fails
            */
            (url: string, mime: string, callback?: (response: Document) => void ): Xhr;
        };
        /**
        * Request an XML document fragment.
        *
        * @param url Url to request
        * @param callback Function to invoke when resource is loaded or the request fails
        */
        html: (url: string, callback?: (response: DocumentFragment) => void ) => Xhr;
        /**
        * Request a comma-separated values (CSV) file.
        */
        csv: Dsv;
        /**
        * Request a tab-separated values (TSV) file
        */
        tsv: Dsv;
        /**
        * Time Functions
        */
        time: Time.Time;
        /**
        * Scales
        */
        scale: Scale.ScaleBase;
        /*
        * Interpolate two values
        */
        interpolate: Transition.BaseInterpolate;
        /*
        * Interpolate two numbers
        */
        interpolateNumber: Transition.BaseInterpolate;
        /*
        * Interpolate two integers
        */
        interpolateRound: Transition.BaseInterpolate;
        /*
        * Interpolate two strings
        */
        interpolateString: Transition.BaseInterpolate;
        /*
        * Interpolate two RGB colors
        */
        interpolateRgb: Transition.BaseInterpolate;
        /*
        * Interpolate two HSL colors
        */
        interpolateHsl: Transition.BaseInterpolate;
        /*
        * Interpolate two HCL colors
        */
        interpolateHcl: Transition.BaseInterpolate;
        /*
        * Interpolate two L*a*b* colors
        */
        interpolateLab: Transition.BaseInterpolate;
        /*
        * Interpolate two arrays of values
        */
        interpolateArray: Transition.BaseInterpolate;
        /*
        * Interpolate two arbitary objects
        */
        interpolateObject: Transition.BaseInterpolate;
        /*
        * Interpolate two 2D matrix transforms
        */
        interpolateTransform: Transition.BaseInterpolate;
        /*
        * The array of built-in interpolator factories
        */
        interpolators: Transition.InterpolateFactory[];
        /**
        * Layouts
        */
        layout: Layout.Layout;
        /**
        * Svg's
        */
        svg: Svg.Svg;
        /**
        * Random number generators
        */
        random: Random;
        /**
        * Create a function to format a number as a string
        *
        * @param specifier The format specifier to use
        */
        format(specifier: string): (value: number) => string;
        /**
        * Returns the SI prefix for the specified value at the specified precision
        */
        formatPrefix(value: number, precision?: number): MetricPrefix;
        /**
        * The version of the d3 library
        */
        version: string;
        /**
        * Returns the root selection
        */
        selection(): Selection;
        ns: {
            /**
            * The map of registered namespace prefixes
            */
            prefix: {
                svg: string;
                xhtml: string;
                xlink: string;
                xml: string;
                xmlns: string;
            };
            /**
            * Qualifies the specified name
            */
            qualify(name: string): { space: string; local: string; };
        };
        /**
        * Returns a built-in easing function of the specified type
        */
        ease: (type: string, ...arrs: any[]) => D3.Transition.Transition;
        /**
        * Constructs a new RGB color.
        */
        rgb: {
            /**
            * Constructs a new RGB color with the specified r, g and b channel values
            */
            (r: number, g: number, b: number): D3.Color.RGBColor;
            /**
            * Constructs a new RGB color by parsing the specified color string
            */
            (color: string): D3.Color.RGBColor;
        };
        /**
        * Constructs a new HCL color.
        */
        hcl: {
            /**
            * Constructs a new HCL color.
            */
            (h: number, c: number, l: number): Color.HCLColor;
            /**
            * Constructs a new HCL color by parsing the specified color string
            */
            (color: string): Color.HCLColor;
        };
        /**
        * Constructs a new HSL color.
        */
        hsl: {
            /**
            * Constructs a new HSL color with the specified hue h, saturation s and lightness l
            */
            (h: number, s: number, l: number): Color.HSLColor;
            /**
            * Constructs a new HSL color by parsing the specified color string
            */
            (color: string): Color.HSLColor;
        };
        /**
        * Constructs a new RGB color.
        */
        lab: {
            /**
            * Constructs a new LAB color.
            */
            (l: number, a: number, b: number): Color.LABColor;
            /**
            * Constructs a new LAB color by parsing the specified color string
            */
            (color: string): Color.LABColor;
        };
        geo: Geo.Geo;
        geom: Geom.Geom;
        /**
        * gets the mouse position relative to a specified container.
        */
        mouse(container: any): number[];
        /**
        * gets the touch positions relative to a specified container.
        */
        touches(container: any): number[][];

        /**
        * If the specified value is a function, returns the specified value.
        * Otherwise, returns a function that returns the specified value.
        */
        functor<R,T>(value: (p : R) => T): (p : R) => T;
        functor<T>(value: T): (p : any) => T;

        map(): Map<any>;
        set(): Set<any>;
        map<T>(object: {[key: string]: T; }): Map<T>;
        set<T>(array: T[]): Set<T>;
        dispatch(...types: string[]): Dispatch;
        rebind(target: any, source: any, ...names: any[]): any;
        requote(str: string): string;
        timer: {
            (funct: () => boolean, delay?: number, mark?: number): void;
            flush(): void;
        }
        transition(): Transition.Transition;

        round(x: number, n: number): number;
    }

    export interface Dispatch {
        [event: string]: any;
        on: {
            (type: string): any;
            (type: string, listener: any): any;
        }
    }

    export interface MetricPrefix {
        /**
        * the scale function, for converting numbers to the appropriate prefixed scale.
        */
        scale: (d: number) => number;
        /**
        * the prefix symbol
        */
        symbol: string;
    }

    export interface Xhr {
        /**
        * Get or set request header
        */
        header: {
            /**
            * Get the value of specified request header
            *
            * @param name Name of header to get the value for
            */
            (name: string): string;
            /**
            * Set the value of specified request header
            *
            * @param name Name of header to set the value for
            * @param value Value to set the header to
            */
            (name: string, value: string): Xhr;
        };
        /**
        * Get or set MIME Type
        */
        mimeType: {
            /**
            * Get the current MIME Type
            */
            (): string;
            /**
            * Set the MIME Type for the request
            *
            * @param type The MIME type for the request
            */
            (type: string): Xhr;
        };
        /*
        * Get or Set the function used to map the response to the associated data value
        */
        response: {
            /**
            * Get function used to map the response to the associated data value
            */
            (): (xhr: XMLHttpRequest) => any;
            /**
            * Set function used to map the response to the associated data value
            *
            * @param value The function used to map the response to a data value
            */
            (value: (xhr: XMLHttpRequest) => any): Xhr;
        };
        /**
        * Issue the request using the GET method
        *
        * @param callback Function to invoke on completion of request
        */
        get(callback?: (xhr: XMLHttpRequest) => void ): Xhr;
        /**
        * Issue the request using the POST method
        */
        post: {
            /**
            * Issue the request using the POST method
            *
            * @param callback Function to invoke on completion of request
            */
            (callback?: (xhr: XMLHttpRequest) => void ): Xhr;
            /**
            * Issue the request using the POST method
            *
            * @param data Data to post back in the request
            * @param callback Function to invoke on completion of request
            */
            (data: any, callback?: (xhr: XMLHttpRequest) => void ): Xhr;
        };
        /**
        * Issues this request using the specified method
        */
        send: {
            /**
            * Issues this request using the specified method
            *
            * @param method Method to use to make the request
            * @param callback Function to invoke on completion of request
            */
            (method: string, callback?: (xhr: XMLHttpRequest) => void ): Xhr;
            /**
            * Issues this request using the specified method
            *
            * @param method Method to use to make the request
            * @param data Data to post back in the request
            * @param callback Function to invoke on completion of request
            */
            (method: string, data: any, callback?: (xhr: XMLHttpRequest) => void ): Xhr;
        };
        /**
        * Aborts this request, if it is currently in-flight
        */
        abort(): Xhr;
        /**
        * Registers a listener to receive events
        *
        * @param type Enent name to attach the listener to
        * @param listener Function to attach to event
        */
        on: (type: string, listener: (data: any, index?: number) => any) => Xhr;
    }

    export interface Dsv {
        /**
        * Request a delimited values file
        *
        * @param url Url to request
        * @param callback Function to invoke when resource is loaded or the request fails
        */
        (url: string, callback?: (error: any, response: any[]) => void ): Xhr;
        /**
        * Parse a delimited string into objects using the header row.
        *
        * @param string delimited formatted string to parse
        */
        parse(string: string): any[];
        /**
        * Parse a delimited string into tuples, ignoring the header row.
        *
        * @param string delimited formatted string to parse
        */
        parseRows(string: string, accessor: (row: any[], index: number) => any): any;
        /**
        * Format an array of tuples into a delimited string.
        *
        * @param rows Array to convert to a delimited string
        */
        format(rows: any[]): string;
    }

    export interface Selection extends Selectors, Array<any> {
        attr: {
            (name: string): string;
            (name: string, value: any): Selection;
            (name: string, valueFunction: (data: any, index: number) => any): Selection;
            (attrValueMap : Object): Selection;
        };

        classed: {
            (name: string): string;
            (name: string, value: any): Selection;
            (name: string, valueFunction: (data: any, index: number) => any): Selection;
            (classValueMap: Object): Selection;
        };

        style: {
            (name: string): string;
            (name: string, value: any, priority?: string): Selection;
            (name: string, valueFunction: (data: any, index: number) => any, priority?: string): Selection;
            (styleValueMap : Object): Selection;
        };

        property: {
            (name: string): void;
            (name: string, value: any): Selection;
            (name: string, valueFunction: (data: any, index: number) => any): Selection;
            (propertyValueMap : Object): Selection;
        };

        text: {
            (): string;
            (value: any): Selection;
            (valueFunction: (data: any, index: number) => any): Selection;
        };

        html: {
            (): string;
            (value: any): Selection;
            (valueFunction: (data: any, index: number) => any): Selection;
        };

        append: (name: string) => Selection;
        insert: (name: string, before: string) => Selection;
        remove: () => Selection;
        empty: () => boolean;

        data: {
            (values: (data: any, index?: number) => any[], key?: (data: any, index?: number) => any): UpdateSelection;
            (values: any[], key?: (data: any, index?: number) => any): UpdateSelection;
            (): any[];
        };

        datum: {
            (values: (data: any, index: number) => any): UpdateSelection;
            (values: any): UpdateSelection;
            () : any;
        };

        filter: {
            (filter: (data: any, index: number) => boolean, thisArg?: any): UpdateSelection;
            //(filter: string): UpdateSelection;
        };

        call(callback: (selection: Selection, ...args: any[]) => void, ...args: any[]): Selection;
        each(eachFunction: (data: any, index: number) => any): Selection;
        on: {
            (type: string): (data: any, index: number) => any;
            (type: string, listener: (data: any, index: number) => any, capture?: boolean): Selection;
        };

        /**
        * Returns the total number of elements in the current selection.
        */
        size(): number;

        /**
        * Starts a transition for the current selection. Transitions behave much like selections,
        * except operators animate smoothly over time rather than applying instantaneously.
        */
        transition(): Transition.Transition;

        /**
        * Sorts the elements in the current selection according to the specified comparator
        * function.
        *
        * @param comparator a comparison function, which will be passed two data elements a and b
        * to compare, and should return either a negative, positive, or zero value to indicate
        * their relative order.
        */
        sort<T>(comparator?: (a: T, b: T) => number): Selection;

        /**
        * Re-inserts elements into the document such that the document order matches the selection
        * order. This is equivalent to calling sort() if the data is already sorted, but much
        * faster.
        */
        order: () => Selection;

        /**
        * Returns the first non-null element in the current selection. If the selection is empty,
        * returns null.
        */
        node: <T extends Element>() => T;
    }

    export interface EnterSelection {
        append: (name: string) => Selection;
        insert: (name: string, before?: string) => Selection;
        select: (selector: string) => Selection;
        empty: () => boolean;
        node: () => Element;
        call: (callback: (selection: EnterSelection) => void) => EnterSelection;
        size: () => number;
    }

    export interface UpdateSelection extends Selection {
        enter: () => EnterSelection;
        update: () => Selection;
        exit: () => Selection;
    }

    export interface NestKeyValue {
        key: string;
        values: any;
    }

    export interface Nest {
        key(keyFunction: (data: any, index: number) => string): Nest;
        sortKeys(comparator: (d1: any, d2: any) => number): Nest;
        sortValues(comparator: (d1: any, d2: any) => number): Nest;
        rollup(rollupFunction: (data: any, index: number) => any): Nest;
        map(values: any[]): any;
        entries(values: any[]): NestKeyValue[];
    }

    export interface MapKeyValue<T> {
        key: string;
        value: T;
    }

    export interface Map<T> {
        has(key: string): boolean;
        get(key: string): T;
        set(key: string, value: T): T;
        remove(key: string): boolean;
        keys(): string[];
        values(): T[];
        entries(): MapKeyValue<T>[];
        forEach(func: (key: string, value: T) => void ): void;
        empty(): boolean;
        size(): number;
    }

    export interface Set<T> {
        has(value: T): boolean;
        add(value: T): T;
        remove(value: T): boolean;
        values(): string[];
        forEach(func: (value: string) => void ): void;
        empty(): boolean;
        size(): number;
    }

    export interface Random {
        /**
        * Returns a function for generating random numbers with a normal distribution
        *
        * @param mean The expected value of the generated pseudorandom numbers
        * @param deviation The given standard deviation
        */
        normal(mean?: number, deviation?: number): () => number;
        /**
        * Returns a function for generating random numbers with a log-normal distribution
        *
        * @param mean The expected value of the generated pseudorandom numbers
        * @param deviation The given standard deviation
        */
        logNormal(mean?: number, deviation?: number): () => number;
        /**
        * Returns a function for generating random numbers with an Irwin-Hall distribution
        *
        * @param count The number of independent variables
        */
        irwinHall(count: number): () => number;
    }

    // Transitions
    export module Transition {
        export interface Transition {
            duration: {
                (duration: number): Transition;
                (duration: (data: any, index: number) => any): Transition;
            };
            delay: {
                (delay: number): Transition;
                (delay: (data: any, index: number) => any): Transition;
            };
            attr: {
                (name: string): string;
                (name: string, value: any): Transition;
                (name: string, valueFunction: (data: any, index: number) => any): Transition;
                (attrValueMap : any): Transition;
            };
            style: {
                (name: string): string;
                (name: string, value: any, priority?: string): Transition;
                (name: string, valueFunction: (data: any, index: number) => any, priority?: string): Transition;
                (styleValueMap : Object): Transition;
            };
            call(callback: (selection: Selection) => void): Transition;
            call(callback: (selection: any, anything: any) => void, ...arguments: any[]): Transition;
            /**
            * Select an element from the current document
            */
            select: {
                /**
                * Selects the first element that matches the specified selector string
                *
                * @param selector Selection String to match
                */
                (selector: string): Transition;
                /**
                * Selects the specified node
                *
                * @param element Node element to select
                */
                (element: EventTarget): Transition;
            };

            /**
            * Select multiple elements from the current document
            */
            selectAll: {
                /**
                * Selects all elements that match the specified selector
                *
                * @param selector Selection String to match
                */
                (selector: string): Transition;
                /**
                * Selects the specified array of elements
                *
                * @param elements Array of node elements to select
                */
                (elements: EventTarget[]): Transition;
            }
            each: (type?: string, eachFunction?: (data: any, index: number) => any) => Transition;
            transition: () => Transition;
            ease: (value: string, ...arrs: any[]) => Transition;
            attrTween(name: string, tween: (d: any, i: number, a: any) => BaseInterpolate): Transition;
            styleTween(name: string, tween: (d: any, i: number, a: any) => BaseInterpolate, priority?: string): Transition;
            text: {
                (text: string): Transition;
                (text: (d: any, i: number) => string): Transition;
            }
            tween(name: string, factory: InterpolateFactory): Transition;
            filter: {
                (selector: string): Transition;
                (selector: (data: any, index: number) => boolean): Transition;
            };
            remove(): Transition;
        }

        export interface InterpolateFactory {
            (a?: any, b?: any): BaseInterpolate;
        }

        export interface BaseInterpolate {
            (a: any, b?: any): any;
        }

        export interface Interpolate {
            (t: any): any;
        }
    }

    //Time
    export module Time {
        export interface Time {
            second: Interval;
            minute: Interval;
            hour: Interval;
            day: Interval;
            week: Interval;
            sunday: Interval;
            monday: Interval;
            tuesday: Interval;
            wednesday: Interval;
            thursday: Interval;
            friday: Interval;
            saturday: Interval;
            month: Interval;
            year: Interval;

            seconds: Range;
            minutes: Range;
            hours: Range;
            days: Range;
            weeks: Range;
            months: Range;
            years: Range;

            sundays: Range;
            mondays: Range;
            tuesdays: Range;
            wednesdays: Range;
            thursdays: Range;
            fridays: Range;
            saturdays: Range;
            format: {
                /**
                 * Constructs a new local time formatter using the given specifier.
                 */
                (specifier: string): TimeFormat;
                /**
                 * Returns a new multi-resolution time format given the specified array of predicated formats.
                 */
                multi: (formats: any[][]) => TimeFormat;

                utc: {
                    /**
                     * Constructs a new local time formatter using the given specifier.
                     */
                    (specifier: string): TimeFormat;
                    /**
                     * Returns a new multi-resolution UTC time format given the specified array of predicated formats.
                     */
                    multi: (formats: any[][]) => TimeFormat;
                };

                /**
                 * The full ISO 8601 UTC time format: "%Y-%m-%dT%H:%M:%S.%LZ".
                 */
                iso: TimeFormat;
            };

            scale: {
                /**
                * Constructs a new time scale with the default domain and range;
                * the ticks and tick format are configured for local time.
                */
                (): Scale.TimeScale;
                /**
                * Constructs a new time scale with the default domain and range;
                * the ticks and tick format are configured for UTC time.
                */
                utc(): Scale.TimeScale;
            };
        }

        export interface Range {
            (start: Date, end: Date, step?: number): Date[];
        }

        export interface Interval {
            (date: Date): Date;
            floor: (date: Date) => Date;
            round: (date: Date) => Date;
            ceil: (date: Date) => Date;
            range: Range;
            offset: (date: Date, step: number) => Date;
            utc?: Interval;
        }

        export interface TimeFormat {
            (date: Date): string;
            parse: (string: string) => Date;
        }
    }

    // Layout
    export module Layout {
        export interface Layout {
            /**
            * Creates a new Stack layout
            */
            stack(): StackLayout;
            /**
            * Creates a new pie layout
            */
            pie(): PieLayout;
            /**
            * Creates a new force layout
            */
            force(): ForceLayout;
            /**
            * Creates a new tree layout
            */
            tree(): TreeLayout;
            bundle(): BundleLayout;
            chord(): ChordLayout;
            cluster(): ClusterLayout;
            hierarchy(): HierarchyLayout;
            histogram(): HistogramLayout;
            pack(): PackLayout;
            partition(): PartitionLayout;
            treemap(): TreeMapLayout;
        }

        export interface StackLayout {
            <T>(layers: T[], index?: number): T[];
            values(accessor?: (d: any) => any): StackLayout;
            offset(offset: string): StackLayout;
            x(accessor: (d: any, i: number) => any): StackLayout;
            y(accessor: (d: any, i: number) => any): StackLayout;
            out(setter: (d: any, y0: number, y: number) => void): StackLayout;
        }

        export interface TreeLayout {
            /**
            * Gets or sets the sort order of sibling nodes for the layout using the specified comparator function
            */
            sort: {
                /**
                * Gets the sort order function of sibling nodes for the layout
                */
                (): (d1: any, d2: any) => number;
                /**
                * Sets the sort order of sibling nodes for the layout using the specified comparator function
                */
                (comparator: (d1: any, d2: any) => number): TreeLayout;
            };
            /**
            * Gets or sets the specified children accessor function
            */
            children: {
                /**
                * Gets the children accessor function
                */
                (): (d: any) => any;
                /**
                * Sets the specified children accessor function
                */
                (children: (d: any) => any): TreeLayout;
            };
            /**
            * Runs the tree layout
            */
            nodes(root: GraphNode): GraphNode[];
            /**
            * Given the specified array of nodes, such as those returned by nodes, returns an array of objects representing the links from parent to child for each node
            */
            links(nodes: GraphNode[]): GraphLink[];
            /**
            * If separation is specified, uses the specified function to compute separation between neighboring nodes. If separation is not specified, returns the current separation function
            */
            seperation: {
                /**
                * Gets the current separation function
                */
                (): (a: GraphNode, b: GraphNode) => number;
                /**
                * Sets the specified function to compute separation between neighboring nodes
                */
                (seperation: (a: GraphNode, b: GraphNode) => number): TreeLayout;
            };
            /**
            * Gets or sets the available layout size
            */
            size: {
                /**
                * Gets the available layout size
                */
                (): number[];
                /**
                * Sets the available layout size
                */
                (size: number[]): TreeLayout;
            };
            /**
            * Gets or sets the available node size
            */
            nodeSize: {
                /**
                * Gets the available node size
                */
                (): number[];
                /**
                * Sets the available node size
                */
                (size: number[]): TreeLayout;
            };
        }

        export interface PieLayout {
            (values: any[], index?: number): ArcDescriptor[];
            value: {
                (): (d: any, index: number) => number;
                (accessor: (d: any, index: number) => number): PieLayout;
            };
            sort: {
                (): (d1: any, d2: any) => number;
                (comparator: (d1: any, d2: any) => number): PieLayout;
            };
            startAngle: {
                (): number;
                (angle: number): PieLayout;
                (angle: () => number): PieLayout;
                (angle: (d : any) => number): PieLayout;
                (angle: (d : any, i: number) => number): PieLayout;
            };
            endAngle: {
                (): number;
                (angle: number): PieLayout;
                (angle: () => number): PieLayout;
                (angle: (d : any) => number): PieLayout
                (angle: (d : any, i: number) => number): PieLayout;
            };
        }

        export interface ArcDescriptor {
            value: any;
            data: any;
            startAngle: number;
            endAngle: number;
            index: number;
        }

        export interface GraphNode {
            id?: number;
            index?: number;
            name: string;
            dx?: number;
            dy?: number;
            px?: number;
            py?: number;
            size?: number;
            weight?: number;
            x?: number;
            y?: number;
            subindex?: number;
            startAngle?: number;
            endAngle?: number;
            value?: number;
            fixed?: boolean;
            children?: GraphNode[];
            _children?: GraphNode[];
            parent?: GraphNode;
            depth?: number;
        }

        export interface GraphLink {
            source: GraphNode;
            target: GraphNode;
        }

        export interface GraphNodeForce {
            index?: number;
            x?: number;
            y?: number;
            px?: number;
            py?: number;
            fixed?: boolean;
            weight?: number;
        }

        export interface GraphLinkForce {
            source: GraphNodeForce;
            target: GraphNodeForce;
        }

        export interface ForceLayout {
            (): ForceLayout;
            size: {
                (): number;
                (mysize: number[]): ForceLayout;
                (accessor: (d: any, index: number) => {}): ForceLayout;

            };
            linkDistance: {
                (): number;
                (number:number): ForceLayout;
                (accessor: (d: any, index: number) => number): ForceLayout;
            };
            linkStrength:
            {
                (): number;
                (number:number): ForceLayout;
                (accessor: (d: any, index: number) => number): ForceLayout;
            };
            friction:
            {
                (): number;
                (number:number): ForceLayout;
                (accessor: (d: any, index: number) => number): ForceLayout;
            };
            alpha: {
                (): number;
                (number:number): ForceLayout;
                (accessor: (d: any, index: number) => number): ForceLayout;
            };
            charge: {
                (): number;
                (number:number): ForceLayout;
                (accessor: (d: any, index: number) => number): ForceLayout;
            };

            theta: {
                (): number;
                (number:number): ForceLayout;
                (accessor: (d: any, index: number) => number): ForceLayout;
            };

            gravity: {
                (): number;
                (number:number): ForceLayout;
                (accessor: (d: any, index: number) => number): ForceLayout;
            };

            links: {
                (): GraphLinkForce[];
                (arLinks: GraphLinkForce[]): ForceLayout;

            };
            nodes:
            {
                (): GraphNodeForce[];
                (arNodes: GraphNodeForce[]): ForceLayout;

            };
            start(): ForceLayout;
            resume(): ForceLayout;
            stop(): ForceLayout;
            tick(): ForceLayout;
            on(type: string, listener: () => void ): ForceLayout;
            drag(): ForceLayout;
        }

        export interface BundleLayout{
            (links: GraphLink[]): GraphNode[][];
        }

        export interface ChordLayout {
            matrix: {
                (): number[][];
                (matrix: number[][]): ChordLayout;
            }
            padding: {
                (): number;
                (padding: number): ChordLayout;
            }
            sortGroups: {
                (): (a: number, b: number) => number;
                (comparator: (a: number, b: number) => number): ChordLayout;
            }
            sortSubgroups: {
                (): (a: number, b: number) => number;
                (comparator: (a: number, b: number) => number): ChordLayout;
            }
            sortChords: {
                (): (a: number, b: number) => number;
                (comparator: (a: number, b: number) => number): ChordLayout;
            }
            chords(): GraphLink[];
            groups(): ArcDescriptor[];
        }

        export interface ClusterLayout{
            sort: {
                (): (a: GraphNode, b: GraphNode) => number;
                (comparator: (a: GraphNode, b: GraphNode) => number): ClusterLayout;
            }
            children: {
                (): (d: any, i?: number) => GraphNode[];
                (children: (d: any, i?: number) => GraphNode[]): ClusterLayout;
            }
            nodes(root: GraphNode): GraphNode[];
            links(nodes: GraphNode[]): GraphLink[];
            seperation: {
                (): (a: GraphNode, b: GraphNode) => number;
                (seperation: (a: GraphNode, b: GraphNode) => number): ClusterLayout;
            }
            size: {
                (): number[];
                (size: number[]): ClusterLayout;
            }
            value: {
                (): (node: GraphNode) => number;
                (value: (node: GraphNode) => number): ClusterLayout;
            }
        }

        export interface HierarchyLayout {
            sort: {
                (): (a: GraphNode, b: GraphNode) => number;
                (comparator: (a: GraphNode, b: GraphNode) => number): HierarchyLayout;
            }
            children: {
                (): (d: any, i?: number) => GraphNode[];
                (children: (d: any, i?: number) => GraphNode[]): HierarchyLayout;
            }
            nodes(root: GraphNode): GraphNode[];
            links(nodes: GraphNode[]): GraphLink[];
            value: {
                (): (node: GraphNode) => number;
                (value: (node: GraphNode) => number): HierarchyLayout;
            }
            reValue(root: GraphNode): HierarchyLayout;
        }

        export interface Bin extends Array<any> {
            x: number;
            dx: number;
            y: number;
        }

        export interface HistogramLayout {
            (values: any[], index?: number): Bin[];
            value: {
                (): (value: any) => any;
                (accessor: (value: any) => any): HistogramLayout
            }
            range: {
                (): (value: any, index: number) => number[];
                (range: (value: any, index: number) => number[]): HistogramLayout;
                (range: number[]): HistogramLayout;
            }
            bins: {
                (): (range: any[], index: number) => number[];
                (bins: (range: any[], index: number) => number[]): HistogramLayout;
                (bins: number): HistogramLayout;
                (bins: number[]): HistogramLayout;
            }
            frequency: {
                (): boolean;
                (frequency: boolean): HistogramLayout;
            }
        }

        export interface PackLayout {
            sort: {
                (): (a: GraphNode, b: GraphNode) => number;
                (comparator: (a: GraphNode, b: GraphNode) => number): PackLayout;
            }
            children: {
                (): (d: any, i?: number) => GraphNode[];
                (children: (d: any, i?: number) => GraphNode[]): PackLayout;
            }
            nodes(root: GraphNode): GraphNode[];
            links(nodes: GraphNode[]): GraphLink[];
            value: {
                (): (node: GraphNode) => number;
                (value: (node: GraphNode) => number): PackLayout;
            }
            size: {
                (): number[];
                (size: number[]): PackLayout;
            }
            padding: {
                (): number;
                (padding: number): PackLayout;
            }
        }

        export interface PartitionLayout {
            sort: {
                (): (a: GraphNode, b: GraphNode) => number;
                (comparator: (a: GraphNode, b: GraphNode) => number): PackLayout;
            }
            children: {
                (): (d: any, i?: number) => GraphNode[];
                (children: (d: any, i?: number) => GraphNode[]): PackLayout;
            }
            nodes(root: GraphNode): GraphNode[];
            links(nodes: GraphNode[]): GraphLink[];
            value: {
                (): (node: GraphNode) => number;
                (value: (node: GraphNode) => number): PackLayout;
            }
            size: {
                (): number[];
                (size: number[]): PackLayout;
            }
        }

        export interface TreeMapLayout {
            sort: {
                (): (a: GraphNode, b: GraphNode) => number;
                (comparator: (a: GraphNode, b: GraphNode) => number): TreeMapLayout;
            }
            children: {
                (): (d: any, i?: number) => GraphNode[];
                (children: (d: any, i?: number) => GraphNode[]): TreeMapLayout;
            }
            nodes(root: GraphNode): GraphNode[];
            links(nodes: GraphNode[]): GraphLink[];
            value: {
                (): (node: GraphNode) => number;
                (value: (node: GraphNode) => number): TreeMapLayout;
            }
            size: {
                (): number[];
                (size: number[]): TreeMapLayout;
            }
            padding: {
                (): number;
                (padding: number): TreeMapLayout;
            }
            round: {
                (): boolean;
                (round: boolean): TreeMapLayout;
            }
            sticky: {
                (): boolean;
                (sticky: boolean): TreeMapLayout;
            }
            mode: {
                (): string;
                (mode: string): TreeMapLayout;
            }
        }
    }

    // Color
    export module Color {
        export interface Color {
            /**
            * increase lightness by some exponential factor (gamma)
            */
            brighter(k?: number): Color;
            /**
            * decrease lightness by some exponential factor (gamma)
            */
            darker(k?: number): Color;
            /**
            * convert the color to a string.
            */
            toString(): string;
        }

        export interface RGBColor extends Color{
            /**
            * the red color channel.
            */
            r: number;
            /**
            * the green color channel.
            */
            g: number;
            /**
            * the blue color channel.
            */
            b: number;
            /**
            * convert from RGB to HSL.
            */
            hsl(): HSLColor;
        }

        export interface HSLColor extends Color{
            /**
            * hue
            */
            h: number;
            /**
            * saturation
            */
            s: number;
            /**
            * lightness
            */
            l: number;
            /**
            * convert from HSL to RGB.
            */
            rgb(): RGBColor;
        }

        export interface LABColor extends Color{
            /**
            * lightness
            */
            l: number;
            /**
            * a-dimension
            */
            a: number;
            /**
            * b-dimension
            */
            b: number;
            /**
            * convert from LAB to RGB.
            */
            rgb(): RGBColor;
        }

        export interface HCLColor extends Color{
            /**
            * hue
            */
            h: number;
            /**
            * chroma
            */
            c: number;
            /**
            * luminance
            */
            l: number;
            /**
            * convert from HCL to RGB.
            */
            rgb(): RGBColor;
        }
    }

    // SVG
    export module Svg {
        export interface Svg {
            /**
            * Create a new symbol generator
            */
            symbol(): Symbol;
            /**
            * Create a new axis generator
            */
            axis(): Axis;
            /**
            * Create a new arc generator
            */
            arc(): Arc;
            /**
            * Create a new line generator
            */
            line: {
                (): Line;
                radial(): LineRadial;
            }
            /**
            * Create a new area generator
            */
            area: {
                (): Area;
                radial(): AreaRadial;
            }
            /**
            * Create a new brush generator
            */
            brush(): Brush;
            /**
            * Create a new chord generator
            */
            chord(): Chord;
            /**
            * Create a new diagonal generator
            */
            diagonal: {
                (): Diagonal;
                radial(): Diagonal;
            }
            /**
            * The array of supported symbol types.
            */
            symbolTypes: string[];
        }

        export interface Symbol {
            type: (string:string) => Symbol;
            size: (number:number) => Symbol;
            (datum:any, index:number): string;
        }

        export interface Brush {
            /**
            * Draws or redraws this brush into the specified selection of elements
            */
            (selection: Selection): void;
            /**
            * Gets or sets the x-scale associated with the brush
            */
            x: {
                /**
                * Gets  the x-scale associated with the brush
                */
                (): D3.Scale.Scale;
                /**
                * Sets the x-scale associated with the brush
                *
                * @param accessor The new Scale
                */
                (scale: D3.Scale.Scale): Brush;
            };
            /**
            * Gets or sets the x-scale associated with the brush
            */
            y: {
                /**
                * Gets  the x-scale associated with the brush
                */
                (): D3.Scale.Scale;
                /**
                * Sets the x-scale associated with the brush
                *
                * @param accessor The new Scale
                */
                (scale: D3.Scale.Scale): Brush;
            };
            /**
            * Gets or sets the current brush extent
            */
            extent: {
                /**
                * Gets the current brush extent
                */
                (): any[];
                /**
                * Sets the current brush extent
                */
                (values: any[]): Brush;
            };
            /**
            * Clears the extent, making the brush extent empty.
            */
            clear(): Brush;
            /**
            * Returns true if and only if the brush extent is empty
            */
            empty(): boolean;
            /**
            * Gets or sets the listener for the specified event type
            */
            on: {
                /**
                * Gets the listener for the specified event type
                */
                (type: string): (data: any, index: number) => any;
                /**
                * Sets the listener for the specified event type
                */
                (type: string, listener: (data: any, index: number) => any, capture?: boolean): Brush;
            };
        }

        export interface Axis {
            (selection: Selection): void;
            scale: {
                (): any;
                (scale: any): Axis;
            };

            orient: {
                (): string;
                (orientation: string): Axis;
            };

            ticks: {
                (): any[];
                (...arguments: any[]): Axis;
            };

            tickPadding: {
                (): number;
                (padding: number): Axis;
            };

            tickValues: {
                (): any[];
                (values: any[]): Axis;
            };
            tickSubdivide(count: number): Axis;
            tickSize: {
                (): number;
                (inner: number, outer?: number): Axis;
            }
            innerTickSize: {
                (): number;
                (value: number): Axis;
            }
            outerTickSize: {
                (): number;
                (value: number): Axis;
            }
            tickFormat(): (any) => string;
            tickFormat(formatter: (value: any) => string): Axis;
            nice(count?: number): Axis;
        }

        export interface Arc {
           /**
           * Returns the path data string
           *
           * @param data Array of data elements
           * @param index Optional index
           */
           (data: any, index?: number): string;
           innerRadius: {
                (): (data: any, index?: number) => number;
                (radius: number): Arc;
                (radius: () => number): Arc;
                (radius: (data: any) => number): Arc;
                (radius: (data: any, index: number) => number): Arc;
            };
            outerRadius: {
                (): (data: any, index?: number) => number;
                (radius: number): Arc;
                (radius: () => number): Arc;
                (radius: (data: any) => number): Arc;
                (radius: (data: any, index: number) => number): Arc;
            };
            startAngle: {
                (): (data: any, index?: number) => number;
                (angle: number): Arc;
                (angle: () => number): Arc;
                (angle: (data: any) => number): Arc;
                (angle: (data: any, index: number) => number): Arc;
            };
            endAngle: {
                (): (data: any, index?: number) => number;
                (angle: number): Arc;
                (angle: () => number): Arc;
                (angle: (data: any) => number): Arc;
                (angle: (data: any, index: number) => number): Arc;
            };
            centroid(data: any, index?: number): number[];
        }

        export interface Line {
            /**
            * Returns the path data string
            *
            * @param data Array of data elements
            * @param index Optional index
            */
            (data: any[], index?: number): string;
            /**
            * Get or set the x-coordinate accessor.
            */
            x: {
                /**
                * Get the x-coordinate accessor.
                */
                (): (data: any, index ?: number) => number;
                /**
                * Set the x-coordinate accessor.
                *
                * @param accessor The new accessor function
                */
                (accessor: (data: any) => number): Line;
                (accessor: (data: any, index: number) => number): Line;
                /**
                * Set the  x-coordinate to a constant.
                *
                * @param cnst The new constant value.
                */
                (cnst: number): Line;
            };
            /**
            * Get or set the y-coordinate accessor.
            */
            y: {
                /**
                * Get the y-coordinate accessor.
                */
                (): (data: any, index ?: number) => number;
                /**
                * Set the y-coordinate accessor.
                *
                * @param accessor The new accessor function
                */
                (accessor: (data: any) => number): Line;
                (accessor: (data: any, index: number) => number): Line;
                /**
                * Set the  y-coordinate to a constant.
                *
                * @param cnst The new constant value.
                */
                (cnst: number): Line;
            };
            /**
            * Get or set the interpolation mode.
            */
            interpolate: {
                /**
                * Get the interpolation accessor.
                */
                (): string;
                /**
                * Set the interpolation accessor.
                *
                * @param interpolate The interpolation mode
                */
                (interpolate: string): Line;
            };
            /**
            * Get or set the cardinal spline tension.
            */
            tension: {
                /**
                * Get the cardinal spline accessor.
                */
                (): number;
                /**
                * Set the cardinal spline accessor.
                *
                * @param tension The Cardinal spline interpolation tension
                */
                (tension: number): Line;
            };
            /**
            * Control whether the line is defined at a given point.
            */
            defined: {
                /**
                * Get the accessor function that controls where the line is defined.
                */
                (): (data: any, index?: number) => boolean;
                /**
                * Set the accessor function that controls where the area is defined.
                *
                * @param defined The new accessor function
                */
                (defined: (data: any, index?: number) => boolean): Line;
            };
        }

        export interface LineRadial {
            /**
            * Returns the path data string
            *
            * @param data Array of data elements
            * @param index Optional index
            */
            (data: any[], index?: number): string;
            /**
            * Get or set the x-coordinate accessor.
            */
            x: {
                /**
                * Get the x-coordinate accessor.
                */
                (): (data: any, index ?: number) => number;
                /**
                * Set the x-coordinate accessor.
                *
                * @param accessor The new accessor function
                */
                (accessor: (data: any) => number): LineRadial;
                (accessor: (data: any, index: number) => number): LineRadial;

                /**
                * Set the  x-coordinate to a constant.
                *
                * @param cnst The new constant value.
                */
                (cnst: number): LineRadial;
            };
            /**
            * Get or set the y-coordinate accessor.
            */
            y: {
                /**
                * Get the y-coordinate accessor.
                */
                (): (data: any, index ?: number) => number;
                /**
                * Set the y-coordinate accessor.
                *
                * @param accessor The new accessor function
                */
                (accessor: (data: any) => number): LineRadial;
                (accessor: (data: any, index: number) => number): LineRadial;
                /**
                * Set the  y-coordinate to a constant.
                *
                * @param cnst The new constant value.
                */
                (cnst: number): LineRadial;
            };
            /**
            * Get or set the interpolation mode.
            */
            interpolate: {
                /**
                * Get the interpolation accessor.
                */
                (): string;
                /**
                * Set the interpolation accessor.
                *
                * @param interpolate The interpolation mode
                */
                (interpolate: string): LineRadial;
            };
            /**
            * Get or set the cardinal spline tension.
            */
            tension: {
                /**
                * Get the cardinal spline accessor.
                */
                (): number;
                /**
                * Set the cardinal spline accessor.
                *
                * @param tension The Cardinal spline interpolation tension
                */
                (tension: number): LineRadial;
            };
            /**
            * Control whether the line is defined at a given point.
            */
            defined: {
                /**
                * Get the accessor function that controls where the line is defined.
                */
                (): (data: any) => any;
                /**
                * Set the accessor function that controls where the area is defined.
                *
                * @param defined The new accessor function
                */
                (defined: (data: any) => any): LineRadial;
            };
            radius: {
                (): (d: any, i?: number) => number;
                (radius: number): LineRadial;
                (radius: (d: any) => number): LineRadial;
                (radius: (d: any, i: number) => number): LineRadial;
            }
            angle: {
                (): (d: any, i?: any) => number;
                (angle: number): LineRadial;
                (angle: (d: any) => number): LineRadial;
                (angle: (d: any, i: any) => number): LineRadial;
            }
        }

        export interface Area {
            /**
            * Generate a piecewise linear area, as in an area chart.
            */
            (data: any[], index?: number): string;
            /**
            * Get or set the x-coordinate accessor.
            */
            x: {
                /**
                * Get the x-coordinate accessor.
                */
                (): (data: any, index ?: number) => number;
                /**
                * Set the x-coordinate accessor.
                *
                * @param accessor The new accessor function
                */
                (accessor: (data: any) => number): Area;
                (accessor: (data: any, index: number) => number): Area;
                /**
                * Set the  x-coordinate to a constant.
                *
                * @param cnst The new constant value.
                */
                (cnst: number): Area;
            };
            /**
            * Get or set the x0-coordinate (baseline) accessor.
            */
            x0: {
                /**
                * Get the  x0-coordinate (baseline) accessor.
                */
                (): (data: any, index ?: number) => number;
                /**
                * Set the  x0-coordinate (baseline) accessor.
                *
                * @param accessor The new accessor function
                */
                (accessor: (data: any) => number): Area;
                (accessor: (data: any, index: number) => number): Area;
                /**
                * Set the  x0-coordinate (baseline) to a constant.
                *
                * @param cnst The new constant value.
                */
                (cnst: number): Area;
            };
            /**
            * Get or set the x1-coordinate (topline) accessor.
            */
            x1: {
                /**
                * Get the  x1-coordinate (topline) accessor.
                */
                (): (data: any, index ?: number) => number;
                /**
                * Set the  x1-coordinate (topline) accessor.
                *
                * @param accessor The new accessor function
                */
                (accessor: (data: any) => number): Area;
                (accessor: (data: any, index: number) => number): Area;
                /**
                * Set the  x1-coordinate (topline) to a constant.
                *
                * @param cnst The new constant value.
                */
                (cnst: number): Area;
            };
            /**
            * Get or set the y-coordinate accessor.
            */
            y: {
                /**
                * Get the y-coordinate accessor.
                */
                (): (data: any, index ?: number) => number;
                /**
                * Set the y-coordinate accessor.
                *
                * @param accessor The new accessor function
                */
                (accessor: (data: any) => number): Area;
                (accessor: (data: any, index: number) => number): Area;
                /**
                * Set the y-coordinate to a constant.
                *
                * @param cnst The constant value
                */
                (cnst: number): Area;
            };
            /**
            * Get or set the y0-coordinate (baseline) accessor.
            */
            y0: {
                /**
                * Get the y0-coordinate (baseline) accessor.
                */
                (): (data: any, index ?: number) => number;
                /**
                * Set the y0-coordinate (baseline) accessor.
                *
                * @param accessor The new accessor function
                */
                (accessor: (data: any) => number): Area;
                (accessor: (data: any, index: number) => number): Area;
                /**
                * Set the y0-coordinate (baseline) to a constant.
                *
                * @param cnst The constant value
                */
                (cnst: number): Area;
            };
            /**
            * Get or set the y1-coordinate (topline) accessor.
            */
            y1: {
                /**
                * Get the y1-coordinate (topline) accessor.
                */
                (): (data: any, index ?: number) => number;
                /**
                * Set the y1-coordinate (topline) accessor.
                *
                * @param accessor The new accessor function
                */
                (accessor: (data: any) => number): Area;
                (accessor: (data: any, index: number) => number): Area;
                /**
                * Set the y1-coordinate (baseline) to a constant.
                *
                * @param cnst The constant value
                */
                (cnst: number): Area;
            };
            /**
            * Get or set the interpolation mode.
            */
            interpolate: {
                /**
                * Get the interpolation accessor.
                */
                (): string;
                /**
                * Set the interpolation accessor.
                *
                * @param interpolate The interpolation mode
                */
                (interpolate: string): Area;
            };
            /**
            * Get or set the cardinal spline tension.
            */
            tension: {
                /**
                * Get the cardinal spline accessor.
                */
                (): number;
                /**
                * Set the cardinal spline accessor.
                *
                * @param tension The Cardinal spline interpolation tension
                */
                (tension: number): Area;
            };
            /**
            * Control whether the area is defined at a given point.
            */
            defined: {
                /**
                * Get the accessor function that controls where the area is defined.
                */
                (): (data: any, index?: number) => any;
                /**
                * Set the accessor function that controls where the area is defined.
                *
                * @param defined The new accessor function
                */
                (defined: (data: any, index?: number) => any): Area;
            };
        }

        export interface AreaRadial {
            /**
            * Generate a piecewise linear area, as in an area chart.
            */
            (data: any[], index?: number): string;
            /**
            * Get or set the x-coordinate accessor.
            */
            x: {
                /**
                * Get the x-coordinate accessor.
                */
                (): (data: any, index ?: number) => number;
                /**
                * Set the x-coordinate accessor.
                *
                * @param accessor The new accessor function
                */
                (accessor: (data: any) => number): AreaRadial;
                (accessor: (data: any, index: number) => number): AreaRadial;
                /**
                * Set the  x-coordinate to a constant.
                *
                * @param cnst The new constant value.
                */
                (cnst: number): AreaRadial;
            };
            /**
            * Get or set the x0-coordinate (baseline) accessor.
            */
            x0: {
                /**
                * Get the  x0-coordinate (baseline) accessor.
                */
                (): (data: any, index ?: number) => number;
                /**
                * Set the  x0-coordinate (baseline) accessor.
                *
                * @param accessor The new accessor function
                */
                (accessor: (data: any) => number): AreaRadial;
                (accessor: (data: any, index: number) => number): AreaRadial;
                /**
                * Set the  x0-coordinate to a constant.
                *
                * @param cnst The new constant value.
                */
                (cnst: number): AreaRadial;
            };
            /**
            * Get or set the x1-coordinate (topline) accessor.
            */
            x1: {
                /**
                * Get the  x1-coordinate (topline) accessor.
                */
                (): (data: any, index ?: number) => number;
                /**
                * Set the  x1-coordinate (topline) accessor.
                *
                * @param accessor The new accessor function
                */
                (accessor: (data: any) => number): AreaRadial;
                (accessor: (data: any, index: number) => number): AreaRadial;
                /**
                * Set the  x1-coordinate to a constant.
                *
                * @param cnst The new constant value.
                */
                (cnst: number): AreaRadial;
            };
            /**
            * Get or set the y-coordinate accessor.
            */
            y: {
                /**
                * Get the y-coordinate accessor.
                */
                (): (data: any, index ?: number) => number;
                /**
                * Set the y-coordinate accessor.
                *
                * @param accessor The new accessor function
                */
                (accessor: (data: any) => number): AreaRadial;
                (accessor: (data: any, index: number) => number): AreaRadial;
                /**
                * Set the y-coordinate to a constant.
                *
                * @param cnst The new constant value.
                */
                (cnst: number): AreaRadial;
            };
            /**
            * Get or set the y0-coordinate (baseline) accessor.
            */
            y0: {
                /**
                * Get the y0-coordinate (baseline) accessor.
                */
                (): (data: any, index ?: number) => number;
                /**
                * Set the y0-coordinate (baseline) accessor.
                *
                * @param accessor The new accessor function
                */
                (accessor: (data: any) => number): AreaRadial;
                (accessor: (data: any, index: number) => number): AreaRadial;
                /**
                * Set the  y0-coordinate to a constant.
                *
                * @param cnst The new constant value.
                */
                (cnst: number): AreaRadial;
            };
            /**
            * Get or set the y1-coordinate (topline) accessor.
            */
            y1: {
                /**
                * Get the y1-coordinate (topline) accessor.
                */
                (): (data: any, index ?: number) => number;
                /**
                * Set the y1-coordinate (topline) accessor.
                *
                * @param accessor The new accessor function
                */
                (accessor: (data: any) => number): AreaRadial;
                (accessor: (data: any, index: number) => number): AreaRadial;
                /**
                * Set the  y1-coordinate to a constant.
                *
                * @param cnst The new constant value.
                */
                (cnst: number): AreaRadial;
            };
            /**
            * Get or set the interpolation mode.
            */
            interpolate: {
                /**
                * Get the interpolation accessor.
                */
                (): string;
                /**
                * Set the interpolation accessor.
                *
                * @param interpolate The interpolation mode
                */
                (interpolate: string): AreaRadial;
            };
            /**
            * Get or set the cardinal spline tension.
            */
            tension: {
                /**
                * Get the cardinal spline accessor.
                */
                (): number;
                /**
                * Set the cardinal spline accessor.
                *
                * @param tension The Cardinal spline interpolation tension
                */
                (tension: number): AreaRadial;
            };
            /**
            * Control whether the area is defined at a given point.
            */
            defined: {
                /**
                * Get the accessor function that controls where the area is defined.
                */
                (): (data: any) => any;
                /**
                * Set the accessor function that controls where the area is defined.
                *
                * @param defined The new accessor function
                */
                (defined: (data: any) => any): AreaRadial;
            };
            radius: {
                (): number;
                (radius: number): AreaRadial;
                (radius: () => number): AreaRadial;
                (radius: (data: any) => number): AreaRadial;
                (radius: (data: any, index: number) => number): AreaRadial;
            };
            innerRadius: {
                (): number;
                (radius: number): AreaRadial;
                (radius: () => number): AreaRadial;
                (radius: (data: any) => number): AreaRadial;
                (radius: (data: any, index: number) => number): AreaRadial;
            };
            outerRadius: {
                (): number;
                (radius: number): AreaRadial;
                (radius: () => number): AreaRadial;
                (radius: (data: any) => number): AreaRadial;
                (radius: (data: any, index: number) => number): AreaRadial;
            };
            angle: {
                (): number;
                (angle: number): AreaRadial;
                (angle: () => number): AreaRadial;
                (angle: (data: any) => number): AreaRadial;
                (angle: (data: any, index: number) => number): AreaRadial;
            };
            startAngle: {
                (): number;
                (angle: number): AreaRadial;
                (angle: () => number): AreaRadial;
                (angle: (data: any) => number): AreaRadial;
                (angle: (data: any, index: number) => number): AreaRadial;
            };
            endAngle: {
                (): number;
                (angle: number): AreaRadial;
                (angle: () => number): AreaRadial;
                (angle: (data: any) => number): AreaRadial;
                (angle: (data: any, index: number) => number): AreaRadial;
            };
        }

        export interface Chord {
            (datum: any, index?: number): string;
            radius: {
                (): number;
                (radius: number): Chord;
                (radius: () => number): Chord;
            };
            startAngle: {
                (): number;
                (angle: number): Chord;
                (angle: () => number): Chord;
            };
            endAngle: {
                (): number;
                (angle: number): Chord;
                (angle: () => number): Chord;
            };
            source: {
                (): any;
                (angle: any): Chord;
                (angle: (d: any, i?: number) => any): Chord;
            };
            target: {
                (): any;
                (angle: any): Chord;
                (angle: (d: any, i?: number) => any): Chord;
            };
        }

        export interface Diagonal {
            (datum: any, index?: number): string;
            projection: {
                (): (datum: any, index?: number) => number[];
                (proj: (datum: any) => number[]): Diagonal;
                (proj: (datum: any, index: number) => number[]): Diagonal;
            };
            source: {
                (): (datum: any, index?: number) => any;
                (src: (datum: any) => any): Diagonal;
                (src: (datum: any, index: number) => any): Diagonal;
                (src: any): Diagonal;
            };
            target: {
                (): (datum: any, index?: number) => any;
                (target: (d: any) => any): Diagonal;
                (target: (d: any, i: number) => any): Diagonal;
                (target: any): Diagonal;
            };
        }
    }

    // Scales
    export module Scale {
        export interface ScaleBase {
            /**
            * Construct a linear quantitative scale.
            */
            linear(): LinearScale;
            /*
            * Construct an ordinal scale.
            */
            ordinal(): OrdinalScale;
            /**
            * Construct a linear quantitative scale with a discrete output range.
            */
            quantize(): QuantizeScale;
            /*
            * Construct an ordinal scale with ten categorical colors.
            */
            category10(): OrdinalScale;
            /*
            * Construct an ordinal scale with twenty categorical colors
            */
            category20(): OrdinalScale;
            /*
            * Construct an ordinal scale with twenty categorical colors
            */
            category20b(): OrdinalScale;
            /*
            * Construct an ordinal scale with twenty categorical colors
            */
            category20c(): OrdinalScale;
            /*
            * Construct a linear identity scale.
            */
            identity(): IdentityScale;
            /*
            * Construct a quantitative scale with an logarithmic transform.
            */
            log(): LogScale;
            /*
            * Construct a quantitative scale with an exponential transform.
            */
            pow(): PowScale;
            /*
            * Construct a quantitative scale mapping to quantiles.
            */
            quantile(): QuantileScale;
            /*
            * Construct a quantitative scale with a square root transform.
            */
            sqrt(): SqrtScale;
            /*
            * Construct a threshold scale with a discrete output range.
            */
            threshold(): ThresholdScale;
        }

        export interface GenericScale<S> {
            (value: any): any;
            domain: {
                (values: any[]): S;
                (): any[];
            };
            range: {
                (values: any[]): S;
                (): any[];
            };
            invertExtent?(y: any): any[];
            copy(): S;
        }

        export interface Scale extends GenericScale<Scale> { }

        export interface GenericQuantitativeScale<S> extends GenericScale<S> {
            /**
            * Get the range value corresponding to a given domain value.
            *
            * @param value Domain Value
            */
            (value: number): number;
            /**
            * Get the domain value corresponding to a given range value.
            *
            * @param value Range Value
            */
            invert(value: number): number;
            /**
            * Set the scale's output range, and enable rounding.
            *
            * @param value The output range.
            */
            rangeRound: (values: any[]) => S;
            /**
            * get or set the scale's output interpolator.
            */
            interpolate: {
                (): D3.Transition.Interpolate;
                (factory: D3.Transition.Interpolate): S;
            };
            /**
            * enable or disable clamping of the output range.
            *
            * @param clamp Enable or disable
            */
            clamp: {
                (): boolean;
                (clamp: boolean): S;
            }
            /**
            * extend the scale domain to nice round numbers.
            *
            * @param count Optional number of ticks to exactly fit the domain
            */
            nice(count?: number): S;
            /**
            * get representative values from the input domain.
            *
            * @param count Aproximate representative values to return.
            */
            ticks(count: number): any[];
            /**
            * get a formatter for displaying tick values
            *
            * @param count Aproximate representative values to return
            */
            tickFormat(count: number, format?: string): (n: number) => string;
        }

        export interface QuantitativeScale extends GenericQuantitativeScale<QuantitativeScale> { }

        export interface LinearScale extends GenericQuantitativeScale<LinearScale> { }

        export interface IdentityScale extends GenericScale<IdentityScale> {
            /**
            * Get the range value corresponding to a given domain value.
            *
            * @param value Domain Value
            */
            (value: number): number;
            /**
            * Get the domain value corresponding to a given range value.
            *
            * @param value Range Value
            */
            invert(value: number): number;
            /**
            * get representative values from the input domain.
            *
            * @param count Aproximate representative values to return.
            */
            ticks(count: number): any[];
            /**
            * get a formatter for displaying tick values
            *
            * @param count Aproximate representative values to return
            */
            tickFormat(count: number): (n: number) => string;
        }

        export interface SqrtScale extends GenericQuantitativeScale<SqrtScale> { }

        export interface PowScale extends GenericQuantitativeScale<PowScale> { }

        export interface LogScale extends GenericQuantitativeScale<LogScale> { }

        export interface OrdinalScale extends GenericScale<OrdinalScale> {
            rangePoints(interval: any[], padding?: number): OrdinalScale;
            rangeBands(interval: any[], padding?: number, outerPadding?: number): OrdinalScale;
            rangeRoundBands(interval: any[], padding?: number, outerPadding?: number): OrdinalScale;
            rangeBand(): number;
            rangeExtent(): any[];
        }

        export interface QuantizeScale extends GenericScale<QuantizeScale> { }

        export interface ThresholdScale extends GenericScale<ThresholdScale> { }

        export interface QuantileScale extends GenericScale<QuantileScale> {
            quantiles(): any[];
        }

        export interface TimeScale extends GenericScale<TimeScale> {
            (value: Date): number;
            invert(value: number): Date;
            rangeRound: (values: any[]) => TimeScale;
            interpolate: {
                (): D3.Transition.Interpolate;
                (factory: D3.Transition.InterpolateFactory): TimeScale;
            };
            clamp(clamp: boolean): TimeScale;
            ticks: {
                (count: number): any[];
                (range: D3.Time.Range, count: number): any[];
            };
            tickFormat(count: number): (n: number) => string;
            nice(count?: number): TimeScale;
        }
    }

    // Behaviour
    export module Behavior {
        export interface Behavior{
            /**
            * Constructs a new drag behaviour
            */
            drag(): Drag;
            /**
            * Constructs a new zoom behaviour
            */
            zoom(): Zoom;
        }

        export interface Zoom {
            /**
            * Applies the zoom behavior to the specified selection,
            * registering the necessary event listeners to support
            * panning and zooming.
            */
            (selection: Selection): void;

            /**
            * Registers a listener to receive events
            *
            * @param type Enent name to attach the listener to
            * @param listener Function to attach to event
            */
            on: (type: string, listener: (data: any, index?: number) => any) => Zoom;

            /**
            * Gets or set the current zoom scale
            */
            scale: {
                /**
                * Get the current current zoom scale
                */
                (): number;
                /**
                * Set the current current zoom scale
                *
                * @param origin Zoom scale
                */
                (scale: number): Zoom;
            };

            /**
            * Gets or set the current zoom translation vector
            */
            translate: {
                /**
                * Get the current zoom translation vector
                */
                (): number[];
                /**
                * Set the current zoom translation vector
                *
                * @param translate Tranlation vector
                */
                (translate: number[]): Zoom;
            };

            /**
            * Gets or set the allowed scale range
            */
            scaleExtent: {
                /**
                * Get the current allowed zoom range
                */
                (): number[];
                /**
                * Set the allowable zoom range
                *
                * @param extent Allowed zoom range
                */
                (extent: number[]): Zoom;
            };

            /**
            * Gets or set the X-Scale that should be adjusted when zooming
            */
            x: {
                /**
                * Get the X-Scale
                */
                (): D3.Scale.Scale;
                /**
                * Set the X-Scale to be adjusted
                *
                * @param x The X Scale
                */
                (x: D3.Scale.Scale): Zoom;

            };

            /**
            * Gets or set the Y-Scale that should be adjusted when zooming
            */
            y: {
                /**
                * Get the Y-Scale
                */
                (): D3.Scale.Scale;
                /**
                * Set the Y-Scale to be adjusted
                *
                * @param y The Y Scale
                */
                (y: D3.Scale.Scale): Zoom;
            };
        }

        export interface Drag {
            /**
            * Execute drag method
            */
            (): any;

            /**
            * Registers a listener to receive events
            *
            * @param type Enent name to attach the listener to
            * @param listener Function to attach to event
            */
            on: (type: string, listener: (data: any, index?: number) => any) => Drag;

            /**
            * Gets or set the current origin accessor function
            */
            origin: {
                /**
                * Get the current origin accessor function
                */
                (): any;
                /**
                * Set the origin accessor function
                *
                * @param origin Accessor function
                */
                (origin?: any): Drag;
            };
        }
    }

    // Geography
    export module Geo {
        export interface Geo {
            /**
            * create a new geographic path generator
            */
            path(): Path;
            /**
            * create a circle generator.
            */
            circle(): Circle;
            /**
            * compute the spherical area of a given feature.
            */
            area(feature: any): number;
            /**
            * compute the latitude-longitude bounding box for a given feature.
            */
            bounds(feature: any): number[][];
            /**
            * compute the spherical centroid of a given feature.
            */
            centroid(feature: any): number[];
            /**
            * compute the great-arc distance between two points.
            */
            distance(a: number[], b: number[]): number;
            /**
            * interpolate between two points along a great arc.
            */
            interpolate(a: number[], b: number[]): (t: number) => number[];
            /**
            * compute the length of a line string or the circumference of a polygon.
            */
            length(feature: any): number;
            /**
            * create a standard projection from a raw projection.
            */
            projection(raw: RawProjection): Projection;
            /**
            * create a standard projection from a mutable raw projection.
            */
            projectionMutator(rawFactory: RawProjection): ProjectionMutator;
            /**
            * the Albers equal-area conic projection.
            */
            albers(): Projection;
            /**
            * a composite Albers projection for the United States.
            */
            albersUsa(): Projection;
            /**
            * the azimuthal equal-area projection.
            */
            azimuthalEqualArea: {
                (): Projection;
                raw: RawProjection;
            }
            /**
            * the azimuthal equidistant projection.
            */
            azimuthalEquidistant: {
                (): Projection;
                raw: RawProjection;
            }
            /**
            * the conic conformal projection.
            */
            conicConformal: {
                (): Projection;
                raw(phi1:number, phi2:number): RawProjection;
            }
            /**
            * the conic equidistant projection.
            */
            conicEquidistant: {
                (): Projection;
                raw(phi1:number, phi2:number): RawProjection;
            }
            /**
            * the conic equal-area (a.k.a. Albers) projection.
            */
            conicEqualArea: {
                (): Projection;
                raw(phi1:number, phi2:number): RawProjection;
            }
            /**
            * the equirectangular (plate carreé) projection.
            */
            equirectangular: {
                (): Projection;
                raw: RawProjection;
            }
            /**
            * the gnomonic projection.
            */
            gnomonic: {
                (): Projection;
                raw: RawProjection;
            }
            /**
            * the spherical Mercator projection.
            */
            mercator: {
                (): Projection;
                raw: RawProjection;
            }
            /**
            * the azimuthal orthographic projection.
            */
            orthographic: {
                (): Projection;
                raw: RawProjection;
            }
            /**
            * the azimuthal stereographic projection.
            */
            stereographic: {
                (): Projection;
                raw: RawProjection;
            }
            /**
            * the transverse Mercator projection.
            */
            transverseMercator: {
                (): Projection;
                raw: RawProjection;
            }
            /**
            * convert a GeoJSON object to a geometry stream.
            */
            stream(object: GeoJSON, listener: Stream): void;
            /**
            *
            */
            graticule(): Graticule;
            /**
            *
            */
            greatArc(): GreatArc;
            /**
            *
            */
            rotation(rotation: number[]): Rotation;
        }

        export interface Path {
            /**
            * Returns the path data string for the given feature
            */
            (feature: any, index?: any): string;
            /**
            * get or set the geographic projection.
            */
            projection: {
                /**
                * get the geographic projection.
                */
                (): Projection;
                /**
                * set the geographic projection.
                */
                (projection: Projection): Path;
            }
            /**
            * get or set the render context.
            */
            context: {
                /**
                * return an SVG path string invoked on the given feature.
                */
                (): string;
                /**
                * sets the render context and returns the path generator
                */
                (context: Context): Path;
            }
            /**
            * Computes the projected area
            */
            area(feature: any): any;
            /**
            * Computes the projected centroid
            */
            centroid(feature: any): any;
            /**
            * Computes the projected bounding box
            */
            bounds(feature: any): any;
            /**
            * get or set the radius to display point features.
            */
            pointRadius: {
                /**
                * returns the current radius
                */
                (): number;
                /**
                * sets the radius used to display Point and MultiPoint features to the specified number
                */
                (radius: number): Path;
                /**
                * sets the radius used to display Point and MultiPoint features to the specified number
                */
                (radius: (feature: any, index: number) => number): Path;
            }
        }

        export interface Context {
            beginPath(): any;
            moveTo(x: number, y: number): any;
            lineTo(x: number, y: number): any;
            arc(x: number, y: number, radius: number, startAngle: number, endAngle: number): any;
            closePath(): any;
        }

        export interface Circle {
            (...args: any[]): GeoJSON;
            origin: {
                (): number[];
                (origin: number[]): Circle;
                (origin: (...args: any[]) => number[]): Circle;
            }
            angle: {
                (): number;
                (angle: number): Circle;
            }
            precision: {
                (): number;
                (precision: number): Circle;
            }
        }

        export interface Graticule{
            (): GeoJSON;
            lines(): GeoJSON[];
            outline(): GeoJSON;
            extent: {
                (): number[][];
                (extent: number[][]): Graticule;
            }
            minorExtent: {
                (): number[][];
                (extent: number[][]): Graticule;
            }
            majorExtent: {
                (): number[][];
                (extent: number[][]): Graticule;
            }
            step: {
                (): number[][];
                (extent: number[][]): Graticule;
            }
            minorStep: {
                (): number[][];
                (extent: number[][]): Graticule;
            }
            majorStep: {
                (): number[][];
                (extent: number[][]): Graticule;
            }
            precision: {
                (): number;
                (precision: number): Graticule;
            }
        }

        export interface GreatArc {
            (): GeoJSON;
            distance(): number;
            source: {
                (): any;
                (source: any): GreatArc;
            }
            target: {
                (): any;
                (target: any): GreatArc;
            }
            precision: {
                (): number;
                (precision: number): GreatArc;
            }
        }

        export interface GeoJSON {
            coordinates: number[][];
            type: string;
        }

        export interface RawProjection {
            (lambda: number, phi: number): number[];
            invert?(x: number, y: number): number[];
        }

        export interface Projection {
            (coordinates: number[]): number[];
            invert?(point: number[]): number[];
            rotate: {
                (): number[];
                (rotation: number[]): Projection;
            };
            center: {
                (): number[];
                (location: number[]): Projection;
            };
            parallels: {
                (): number[];
                (location: number[]): Projection;
            };
            translate: {
                (): number[];
                (point: number[]): Projection;
            };
            scale: {
                (): number;
                (scale: number): Projection;
            };
            clipAngle: {
                (): number;
                (angle: number): Projection;
            };
            clipExtent: {
                (): number[][];
                (extent: number[][]): Projection;
            };
            precision: {
                (): number;
                (precision: number): Projection;
            };
            stream(listener?: Stream): Stream;
        }

        export interface Stream {
            point(x: number, y: number, z?: number): void;
            lineStart(): void;
            lineEnd(): void;
            polygonStart(): void;
            polygonEnd(): void;
            sphere(): void;
        }

        export interface Rotation extends Array<any> {
            (location: number[]): Rotation;
            invert(location: number[]): Rotation;
        }

        export interface ProjectionMutator {
            (lambda: number, phi: number): Projection;
        }
    }

    // Geometry
    export module Geom {
        export interface Geom {
            voronoi<T>(): Voronoi<T>;
            /**
            * compute the Voronoi diagram for the specified points.
            */
            voronoi(vertices: Vertice[]): Polygon[];
            /**
            * compute the Delaunay triangulation for the specified points.
            */
            delaunay(vertices?: Vertice[]): Polygon[];
            /**
            * constructs a quadtree for an array of points.
            */
            quadtree(): QuadtreeFactory;
            /**
            * Constructs a new quadtree for the specified array of points.
            */
            quadtree(points: Point[], x1: number, y1: number, x2: number, y2: number): Quadtree;
            /**
            * Constructs a new quadtree for the specified array of points.
            */
            quadtree(points: Point[], width: number, height: number): Quadtree;
            /**
            * Returns the input array of vertices with additional methods attached
            */
            polygon(vertices:Vertice[]): Polygon;
            /**
            * creates a new hull layout with the default settings.
            */
            hull(): Hull;

            hull(vertices:Vertice[]): Vertice[];
        }

        export interface Vertice extends Array<number> {
            /**
            * Returns the angle of the vertice
            */
            angle?: number;
        }

        export interface Polygon extends Array<Vertice> {
            /**
            * Returns the signed area of this polygon
            */
            area(): number;
            /**
            * Returns a two-element array representing the centroid of this polygon.
            */
            centroid(): number[];
            /**
            * Clips the subject polygon against this polygon
            */
            clip(subject: Polygon): Polygon;
        }

        export interface QuadtreeFactory {
            /**
            * Constructs a new quadtree for the specified array of points.
            */
            (): Quadtree;
            /**
            * Constructs a new quadtree for the specified array of points.
            */
            (points: Point[], x1: number, y1: number, x2: number, y2: number): Quadtree;
            /**
            * Constructs a new quadtree for the specified array of points.
            */
            (points: Point[], width: number, height: number): Quadtree;

            x: {
                (): (d: any) => any;
                (accesor: (d: any) => any): QuadtreeFactory;

            }
            y: {
                (): (d: any) => any;
                (accesor: (d: any) => any): QuadtreeFactory;

            }
            size(): number[];
            size(size: number[]): QuadtreeFactory;
            extent(): number[][];
            extent(points: number[][]): QuadtreeFactory;
        }

        export interface Quadtree {
            /**
            * Adds a new point to the quadtree.
            */
            add(point: Point): void;
            visit(callback: any): void;
        }

        export interface Point {
            x: number;
            y: number;
        }

        export interface Voronoi<T> {
            /**
            * Compute the Voronoi diagram for the specified data.
            */
            (data: T[]): Polygon[];
            /**
            * Compute the graph links for the Voronoi diagram for the specified data.
            */
            links(data: T[]): Layout.GraphLink[];
            /**
            * Compute the triangles for the Voronoi diagram for the specified data.
            */
            triangles(data: T[]): number[][];
            x: {
                /**
                * Get the x-coordinate accessor.
                */
                (): (data: T, index ?: number) => number;

                /**
                * Set the x-coordinate accessor.
                *
                * @param accessor The new accessor function
                */
                (accessor: (data: T, index: number) => number): Voronoi<T>;

                /**
                * Set the x-coordinate to a constant.
                *
                * @param constant The new constant value.
                */
                (constant: number): Voronoi<T>;
            }
            y: {
                /**
                * Get the y-coordinate accessor.
                */
                (): (data: T, index ?: number) => number;

                /**
                * Set the y-coordinate accessor.
                *
                * @param accessor The new accessor function
                */
                (accessor: (data: T, index: number) => number): Voronoi<T>;

                /**
                * Set the y-coordinate to a constant.
                *
                * @param constant The new constant value.
                */
                (constant: number): Voronoi<T>;
            }
            clipExtent: {
                /**
                * Get the clip extent.
                */
                (): number[][];
                /**
                * Set the clip extent.
                *
                * @param extent The new clip extent.
                */
                (extent: number[][]): Voronoi<T>;
            }
            size: {
                /**
                * Get the size.
                */
                (): number[];
                /**
                * Set the size, equivalent to a clip extent starting from (0,0).
                *
                * @param size The new size.
                */
                (size: number[]): Voronoi<T>;
            }
        }

        export interface Hull {
            (vertices: Vertice[]): Vertice[];
            x: {
                (): (d: any) => any;
                (accesor: (d: any) => any): any;
            }
            y: {
                (): (d: any) => any;
                (accesor: (d: any) => any): any;
            }
        }
    }

    export interface D3Element extends Element {
        getComputedTextLength: () => number;
        getTotalLength: () => number;
        getPointAtLength: (l: number) => SVGPoint;
    }
}

declare var d3: D3.Base;

declare module "d3" {
    export = d3;
}

/// <reference path="../../Typedefs/jquery/jquery.d.ts" />
/// <reference path="../../Typedefs/d3/d3.d.ts" />
declare module jsCommon {
    /**
     * DOM constants.
     */
    module DOMConstants {
        /**
         * Integer codes corresponding to individual keys on the keyboard.
         */
        const escKeyCode: number;
        const enterKeyCode: number;
        const tabKeyCode: number;
        const upArrowKeyCode: number;
        const downArrowKeyCode: number;
        const leftArrowKeyCode: number;
        const rightArrowKeyCode: number;
        const homeKeyCode: number;
        const endKeyCode: number;
        const backSpaceKeyCode: number;
        const deleteKeyCode: number;
        const spaceKeyCode: number;
        const shiftKeyCode: number;
        const ctrlKeyCode: number;
        const altKeyCode: number;
        const aKeyCode: number;
        const cKeyCode: number;
        const sKeyCode: number;
        const vKeyCode: number;
        const xKeyCode: number;
        const yKeyCode: number;
        const zKeyCode: number;
        /**
         * DOM Elements.
         */
        const DocumentBody: string;
        const Anchor: string;
        const EditableTextElements: string;
        /**
         * DOM Attributes and values.
         */
        const disabledAttributeOrValue: string;
        const readonlyAttributeOrValue: string;
        const styleAttribute: string;
        const hrefAttribute: string;
        const targetAttribute: string;
        const blankValue: string;
        const classAttribute: string;
        const titleAttribute: string;
        const srcAttribute: string;
        /**
         * DOM event names.
         */
        const contextmenuEventName: string;
        const blurEventName: string;
        const keyUpEventName: string;
        const inputEventName: string;
        const changeEventName: string;
        const cutEventName: string;
        const keyDownEventName: string;
        const mouseMoveEventName: string;
        const mouseDownEventName: string;
        const mouseEnterEventName: string;
        const mouseLeaveEventName: string;
        const mouseOverEventName: string;
        const mouseOutEventName: string;
        const mouseClickEventName: string;
        const pasteEventName: string;
        const scrollEventName: string;
        const dropEventName: string;
        const focusInEventName: string;
        const focusOutEventName: string;
        const selectEventName: string;
        const messageEventName: string;
        const loadEventName: string;
        const beforeUnload: string;
        /**
         * Common DOM event combination names.
         */
        const inputAndSelectEventNames: string;
    }
}
declare module powerbi {
    import IStringResourceProvider = jsCommon.IStringResourceProvider;
    interface ServiceError {
        statusCode: number;
        /**
         * This error code corresponds with a PowerBIServiceException that happened on the server.
         */
        errorCode?: string;
        /**
         * Message and stack trace should only be sent in non-production environments.
         */
        message?: string;
        stackTrace?: string;
        errorDetails?: PowerBIErrorDetail[];
        parameters?: ErrorParameter[];
    }
    interface PowerBIErrorDetail {
        code: string;
        detail: PowerBIErrorDetailValue;
    }
    interface ErrorParameter {
        Key: string;
        Value: string;
    }
    interface PowerBIErrorDetailValue {
        type: PowerBIErrorResourceType;
        value: string;
    }
    enum PowerBIErrorResourceType {
        ResourceCodeReference = 0,
        EmbeddedString = 1,
    }
    enum ServiceErrorStatusCode {
        GeneralError = 0,
        CsdlFetching = 1,
        CsdlConvertXmlToConceptualSchema = 2,
        CsdlCreateClientSchema = 3,
        ExecuteSemanticQueryError = 4,
        ExecuteSemanticQueryInvalidStreamFormat = 5,
    }
    class ServiceErrorToClientError implements IClientError {
        private m_serviceError;
        private httpRequestId;
        private static codeName;
        code: string;
        ignorable: boolean;
        requestId: string;
        constructor(serviceError: ServiceError);
        getDetails(resourceProvider: IStringResourceProvider): ErrorDetails;
    }
    class PowerBIErrorDetailHelper {
        private static serverErrorPrefix;
        static addAdditionalInfo(errorDetails: ErrorDetails, pbiErrorDetails: PowerBIErrorDetail[], localize: IStringResourceProvider): ErrorDetails;
        static addMessageAndStackTrace(errorDetails: ErrorDetails, message: string, stackTrace: string, localize: IStringResourceProvider): ErrorDetails;
        static GetDetailsFromServerErrorStatusCode(localize: IStringResourceProvider, statusCode: number): ErrorDetails;
    }
}
declare module powerbi {
    var build: any;
}
declare module powerbi {
    var CategoryTypes: {
        Address: string;
        City: string;
        Continent: string;
        CountryRegion: string;
        County: string;
        Longitude: string;
        Latitude: string;
        Place: string;
        PostalCode: string;
        StateOrProvince: string;
    };
    interface IGeoTaggingAnalyzerService {
        isLongitudeOrLatitude(fieldRefName: string): boolean;
        isGeographic(fieldRefName: string): boolean;
        isGeocodable(fieldRefName: string): boolean;
        getFieldType(fieldName: string): string;
        isGeoshapable(fieldRefName: string): boolean;
    }
    function createGeoTaggingAnalyzerService(getLocalized: (string) => string): IGeoTaggingAnalyzerService;
    class GeoTaggingAnalyzerService implements IGeoTaggingAnalyzerService {
        private GeotaggingString_Continent;
        private GeotaggingString_Continents;
        private GeotaggingString_Country;
        private GeotaggingString_Countries;
        private GeotaggingString_State;
        private GeotaggingString_States;
        private GeotaggingString_City;
        private GeotaggingString_Cities;
        private GeotaggingString_Town;
        private GeotaggingString_Towns;
        private GeotaggingString_Province;
        private GeotaggingString_Provinces;
        private GeotaggingString_County;
        private GeotaggingString_Counties;
        private GeotaggingString_Village;
        private GeotaggingString_Villages;
        private GeotaggingString_Post;
        private GeotaggingString_Zip;
        private GeotaggingString_Code;
        private GeotaggingString_Place;
        private GeotaggingString_Places;
        private GeotaggingString_Address;
        private GeotaggingString_Addresses;
        private GeotaggingString_Street;
        private GeotaggingString_Streets;
        private GeotaggingString_Longitude;
        private GeotaggingString_Longitude_Short;
        private GeotaggingString_Latitude;
        private GeotaggingString_Latitude_Short;
        private GeotaggingString_PostalCode;
        private GeotaggingString_PostalCodes;
        private GeotaggingString_ZipCode;
        private GeotaggingString_ZipCodes;
        private GeotaggingString_Territory;
        private GeotaggingString_Territories;
        private GeotaggingString_VRMBackCompat_CountryRegion;
        private GeotaggingString_VRMBackCompat_StateOrProvince;
        constructor(getLocalized: (string) => string);
        isLongitudeOrLatitude(fieldRefName: string): boolean;
        isGeographic(fieldRefName: string): boolean;
        isGeocodable(fieldRefName: string): boolean;
        isGeoshapable(fieldRefName: string): boolean;
        private isAddress(fieldRefName);
        private isPlace(fieldRefName);
        private isCity(fieldRefName);
        private isStateOrProvince(fieldRefName);
        private isCountry(fieldRefName);
        private isCounty(fieldRefName);
        private isContinent(fieldRefName);
        private isPostalCode(fieldRefName);
        private isLongitude(fieldRefName);
        private isLatitude(fieldRefName);
        private isTerritory(fieldRefName);
        private static hasMatches(fieldName, possibleMatches);
        getFieldType(fieldName: string): string;
        private isEnglishAddress(fieldRefName);
        private isEnglishPlace(fieldRefName);
        private isEnglishCity(fieldRefName);
        private isEnglishStateOrProvince(fieldRefName);
        private isEnglishCountry(fieldRefName);
        private isEnglishCounty(fieldRefName);
        private isEnglishContinent(fieldRefName);
        private isEnglishPostalCode(fieldRefName);
        private isEnglishLongitude(fieldRefName);
        private isEnglishLatitude(fieldRefName);
        protected isEnglishTerritory(fieldRefName: string): boolean;
        private getEnglishFieldType(fieldName);
    }
}
declare var DEBUG: boolean;
declare module powerbi {
    import IStringResourceProvider = jsCommon.IStringResourceProvider;
    interface ILocalizableError {
        getDetails(resourceProvider: IStringResourceProvider): ErrorDetails;
    }
    interface IClientError extends ILocalizableError {
        code: string;
        debugInfo?: string;
        ignorable?: boolean;
        requestId?: string;
    }
    interface IClientWarning extends ILocalizableError {
        columnNameFromIndex: (index: number) => string;
    }
    class UnknownClientError implements IClientError {
        code: string;
        ignorable: boolean;
        getDetails(resourceProvider: IStringResourceProvider): ErrorDetails;
    }
    class HttpClientError implements IClientError {
        private httpRequestId;
        private httpStatusCode;
        constructor(httpStatusCode: number, requestId: string);
        code: string;
        ignorable: boolean;
        requestId: string;
        getDetails(resourceProvider: IStringResourceProvider): ErrorDetails;
    }
    class IgnorableClientError implements IClientError {
        code: string;
        ignorable: boolean;
        getDetails(resourceProvider: IStringResourceProvider): ErrorDetails;
    }
}
declare module InJs {
    module DomFactory {
        function div(): JQuery;
        function span(): JQuery;
        function checkbox(): JQuery;
        function ul(): JQuery;
        function li(): JQuery;
        function button(): JQuery;
        function select(): JQuery;
        function textBox(): JQuery;
        function img(): JQuery;
        function iframe(): JQuery;
    }
}
declare module jsCommon {
    module color {
        function rotate(rgbString: string, rotateFactor: number): string;
        function parseRgb(rgbString: string): RgbColor;
        function rgbToHexString(rgbColor: RgbColor): string;
        function darken(color: RgbColor, diff: number): RgbColor;
        function rgbWithAlphaString(color: RgbColor, a: number): string;
        function rgbString(color: RgbColor): string;
        function rgbaString(r: number, g: number, b: number, a: number): string;
        function rgbStringToHexString(rgb: string): string;
        function rgbaStringToHexString(rgba: string): string;
        interface RgbColor {
            R: number;
            G: number;
            B: number;
        }
    }
}
declare module jsCommon {
    /**
     * CSS constants.
     */
    module CssConstants {
        const styleAttribute: string;
        const pixelUnits: string;
        const heightProperty: string;
        const widthProperty: string;
        const topProperty: string;
        const bottomProperty: string;
        const leftProperty: string;
        const rightProperty: string;
        const marginTopProperty: string;
        const marginLeftProperty: string;
        const displayProperty: string;
        const backgroundProperty: string;
        const backgroundColorProperty: string;
        const backgroundRepeatProperty: string;
        const backgroundSizeProperty: string;
        const backgroundImageProperty: string;
        const textShadowProperty: string;
        const borderTopWidthProperty: string;
        const borderBottomWidthProperty: string;
        const borderLeftWidthProperty: string;
        const borderRightWidthProperty: string;
        const fontWeightProperty: string;
        const colorProperty: string;
        const opacityProperty: string;
        const paddingLeftProperty: string;
        const paddingRightProperty: string;
        const positionProperty: string;
        const maxWidthProperty: string;
        const minWidthProperty: string;
        const overflowProperty: string;
        const overflowXProperty: string;
        const overflowYProperty: string;
        const transformProperty: string;
        const webkitTransformProperty: string;
        const cursorProperty: string;
        const visibilityProperty: string;
        const absoluteValue: string;
        const zeroPixelValue: string;
        const autoValue: string;
        const hiddenValue: string;
        const noneValue: string;
        const blockValue: string;
        const inlineBlockValue: string;
        const transparentValue: string;
        const boldValue: string;
        const visibleValue: string;
        const tableRowValue: string;
        const coverValue: string;
        const pointerValue: string;
    }
    interface ExtendedCSSProperties extends CSSStyleDeclaration {
        scrollbarShadowColor: string;
        scrollbarHighlightColor: string;
        layoutGridChar: string;
        layoutGridType: string;
        textAutospace: string;
        textKashidaSpace: string;
        writingMode: string;
        scrollbarFaceColor: string;
        backgroundPositionY: string;
        lineBreak: string;
        imeMode: string;
        msBlockProgression: string;
        layoutGridLine: string;
        scrollbarBaseColor: string;
        layoutGrid: string;
        layoutFlow: string;
        textKashida: string;
        filter: string;
        zoom: string;
        scrollbarArrowColor: string;
        behavior: string;
        backgroundPositionX: string;
        accelerator: string;
        layoutGridMode: string;
        textJustifyTrim: string;
        scrollbar3dLightColor: string;
        msInterpolationMode: string;
        scrollbarTrackColor: string;
        scrollbarDarkShadowColor: string;
        styleFloat: string;
        getAttribute(attributeName: string, flags?: number): any;
        setAttribute(attributeName: string, AttributeValue: any, flags?: number): void;
        removeAttribute(attributeName: string, flags?: number): boolean;
        pixelWidth: number;
        posHeight: number;
        posLeft: number;
        pixelTop: number;
        pixelBottom: number;
        textDecorationNone: boolean;
        pixelLeft: number;
        posTop: number;
        posBottom: number;
        textDecorationOverline: boolean;
        posWidth: number;
        textDecorationLineThrough: boolean;
        pixelHeight: number;
        textDecorationBlink: boolean;
        posRight: number;
        pixelRight: number;
        textDecorationUnderline: boolean;
        webkitTransform: string;
    }
}
/**
 * Defines a Debug object. Calls to any functions in this object removed by the minifier.
 * The functions within this class are not minified away, so we use the preprocessor-style
 * comments to have the minifier remove those as well.
 */
declare module debug {
    var assertFailFunction: {
        (message: string): void;
    };
    /**
     * Asserts that the condition is true, fails otherwise.
     */
    function assert(condition: boolean, message: string): void;
    /**
     * Asserts that the value is neither null nor undefined, fails otherwise.
     */
    function assertValue<T>(value: T, message: string): void;
    /**
     * Makes no assertion on the given value.
     * This is documentation/placeholder that a value is possibly null or undefined (unlike assertValue).
     */
    function assertAnyValue<T>(value: T, message: string): void;
    function assertFail(message: string): void;
}
declare module powerbi {
    /**
     * Module Double contains a set of constants and precision based utility methods
     * for dealing with doubles and their decimal garbage in the javascript.
     */
    module Double {
        var MIN_VALUE: number;
        var MAX_VALUE: number;
        var MIN_EXP: number;
        var MAX_EXP: number;
        var EPSILON: number;
        var DEFAULT_PRECISION: number;
        var DEFAULT_PRECISION_IN_DECIMAL_DIGITS: number;
        var LOG_E_10: number;
        var POSITIVE_POWERS: number[];
        var NEGATIVE_POWERS: number[];
        /**
         * Returns powers of 10.
         * Unlike the Math.pow this function produces no decimal garbage.
         * @param exp Exponent.
         */
        function pow10(exp: number): number;
        /**
         * Returns the 10 base logarithm of the number.
         * Unlike Math.log function this produces integer results with no decimal garbage.
         * @param val Positive value or zero.
         */
        function log10(val: number): number;
        /**
         * Returns a power of 10 representing precision of the number based on the number of meaningfull decimal digits.
         * For example the precision of 56,263.3767 with the 6 meaningfull decimal digit is 0.1.
         * @param x Value.
         * @param decimalDigits How many decimal digits are meaningfull.
         */
        function getPrecision(x: number, decimalDigits?: number): number;
        /**
         * Checks if a delta between 2 numbers is less than provided precision.
         * @param x One value.
         * @param y Another value.
         * @param precision Precision value.
         */
        function equalWithPrecision(x: number, y: number, precision?: number): boolean;
        /**
         * Checks if a first value is less than another taking
         * into account the loose precision based equality.
         * @param x One value.
         * @param y Another value.
         * @param precision Precision value.
         */
        function lessWithPrecision(x: number, y: number, precision?: number): boolean;
        /**
         * Checks if a first value is less or equal than another taking
         * into account the loose precision based equality.
         * @param x One value.
         * @param y Another value.
         * @param precision Precision value.
         */
        function lessOrEqualWithPrecision(x: number, y: number, precision?: number): boolean;
        /**
         * Checks if a first value is greater than another taking
         * into account the loose precision based equality.
         * @param x One value.
         * @param y Another value.
         * @param precision Precision value.
         */
        function greaterWithPrecision(x: number, y: number, precision?: number): boolean;
        /**
         * Checks if a first value is greater or equal to another taking
         * into account the loose precision based equality.
         * @param x One value.
         * @param y Another value.
         * @param precision Precision value.
         */
        function greaterOrEqualWithPrecision(x: number, y: number, precision?: number): boolean;
        /**
         * Floors the number unless it's withing the precision distance from the higher int.
         * @param x One value.
         * @param precision Precision value.
         */
        function floorWithPrecision(x: number, precision?: number): number;
        /**
         * Ceils the number unless it's withing the precision distance from the lower int.
         * @param x One value.
         * @param precision Precision value.
         */
        function ceilWithPrecision(x: number, precision?: number): number;
        /**
         * Floors the number to the provided precision.
         * For example 234,578 floored to 1,000 precision is 234,000.
         * @param x One value.
         * @param precision Precision value.
         */
        function floorToPrecision(x: number, precision?: number): number;
        /**
         * Ceils the number to the provided precision.
         * For example 234,578 floored to 1,000 precision is 235,000.
         * @param x One value.
         * @param precision Precision value.
         */
        function ceilToPrecision(x: number, precision?: number): number;
        /**
         * Rounds the number to the provided precision.
         * For example 234,578 floored to 1,000 precision is 235,000.
         * @param x One value.
         * @param precision Precision value.
         */
        function roundToPrecision(x: number, precision?: number): number;
        /**
         * Returns the value making sure that it's restricted to the provided range.
         * @param x One value.
         * @param min Range min boundary.
         * @param max Range max boundary.
         */
        function ensureInRange(x: number, min: number, max: number): number;
        /**
         * Rounds the value - this method is actually faster than Math.round - used in the graphics utils.
         * @param x Value to round.
         */
        function round(x: number): number;
        /**
         * Projects the value from the source range into the target range.
         * @param value Value to project.
         * @param fromMin Minimum of the source range.
         * @param toMin Minimum of the target range.
         * @param toMax Maximum of the target range.
         */
        function project(value: number, fromMin: number, fromSize: number, toMin: number, toSize: number): number;
        /**
         * Removes decimal noise.
         * @param value Value to be processed.
         */
        function removeDecimalNoise(value: number): number;
        /**
         * Checks whether the number is integer.
         * @param value Value to be checked.
         */
        function isInteger(value: number): boolean;
    }
}
declare module powerbi {
    interface DragPayload {
    }
}
declare module jsCommon {
    interface IError extends Error {
        stack?: string;
        argument?: string;
    }
    module Errors {
        function infoNavAppAlreadyPresent(): IError;
        function invalidOperation(message: string): IError;
        function argument(argumentName: string, message: string): IError;
        function argumentNull(argumentName: string): IError;
        function argumentUndefined(argumentName: string): IError;
        function argumentOutOfRange(argumentName: string): IError;
        function pureVirtualMethodException(className: string, methodName: string): IError;
        function notImplementedException(message: string): IError;
    }
    /**
     * Captures the stack trace, if available.
     * It optionally takes the number of frames to remove from the stack trace.
     * By default, it removes the last frame to consider the calling type's
     * constructor and the temporary error used to capture the stack trace (below).
     * More levels can be requested as needed e..g. when an error is created
     * from a helper method. <Min requirement: IE10, Chrome, Firefox, Opera>.
     */
    function getStackTrace(leadingFramesToRemove?: number): string;
}
declare module jsCommon {
    interface IStringResourceProvider {
        get(id: string): string;
    }
}
declare module jsCommon {
    /**
     * Represents a promise that may be rejected by its consumer.
     */
    interface IRejectablePromise extends JQueryPromise<void> {
        reject(...args: any[]): void;
    }
    module JQueryConstants {
        const VisibleSelector: string;
    }
}
declare module jsCommon {
    /**
     * Represents a lazily instantiated value.
     */
    class Lazy<T> {
        private _value;
        private _factoryMethod;
        constructor(factoryMethod: () => T);
        getValue(): T;
    }
}
declare module powerbi {
    /**
     * An interface to promise/deferred,
     * which abstracts away the underlying mechanism (e.g., Angular, jQuery, etc.).
     */
    interface IPromiseFactory {
        /**
         * Creates a Deferred object which represents a task which will finish in the future.
         */
        defer<T>(): IDeferred<T>;
        /**
         * Creates a Deferred object which represents a task which will finish in the future.
         */
        defer<TSuccess, TError>(): IDeferred2<TSuccess, TError>;
        /**
         * Creates a promise that is resolved as rejected with the specified reason.
         * This api should be used to forward rejection in a chain of promises.
         * If you are dealing with the last promise in a promise chain, you don't need to worry about it.
         * When comparing deferreds/promises to the familiar behavior of try/catch/throw,
         * think of reject as the throw keyword in JavaScript.
         * This also means that if you "catch" an error via a promise error callback and you want
         * to forward the error to the promise derived from the current promise,
         * you have to "rethrow" the error by returning a rejection constructed via reject.
         *
         * @param reason Constant, message, exception or an object representing the rejection reason.
         */
        reject<TError>(reason?: TError): IPromise2<any, TError>;
        /**
         * Creates a promise that is resolved with the specified value.
         * This api should be used to forward rejection in a chain of promises.
         * If you are dealing with the last promise in a promise chain, you don't need to worry about it.
         *
         * @param value Object representing the promise result.
         */
        resolve<TSuccess>(value?: TSuccess): IPromise2<TSuccess, any>;
    }
    /**
     * Represents an operation, to be completed (resolve/rejected) in the future.
     */
    interface IPromise<T> extends IPromise2<T, T> {
    }
    /**
     * Represents an operation, to be completed (resolve/rejected) in the future.
     * Success and failure types can be set independently.
     */
    interface IPromise2<TSuccess, TError> {
        /**
         * Regardless of when the promise was or will be resolved or rejected,
         * then calls one of the success or error callbacks asynchronously as soon as the result is available.
         * The callbacks are called with a single argument: the result or rejection reason.
         * Additionally, the notify callback may be called zero or more times to provide a progress indication,
         * before the promise is resolved or rejected.
         * This method returns a new promise which is resolved or rejected via
         * the return value of the successCallback, errorCallback.
         */
        then<TSuccessResult, TErrorResult>(successCallback: (promiseValue: TSuccess) => IPromise2<TSuccessResult, TErrorResult>, errorCallback?: (reason: TError) => TErrorResult): IPromise2<TSuccessResult, TErrorResult>;
        /**
         * Regardless of when the promise was or will be resolved or rejected,
         * then calls one of the success or error callbacks asynchronously as soon as the result is available.
         * The callbacks are called with a single argument: the result or rejection reason.
         * Additionally, the notify callback may be called zero or more times to provide a progress indication,
         * before the promise is resolved or rejected.
         * This method returns a new promise which is resolved or rejected via
         * the return value of the successCallback, errorCallback.
         */
        then<TSuccessResult, TErrorResult>(successCallback: (promiseValue: TSuccess) => TSuccessResult, errorCallback?: (reason: TError) => TErrorResult): IPromise2<TSuccessResult, TErrorResult>;
        /**
         * Shorthand for promise.then(null, errorCallback).
         */
        catch<TErrorResult>(onRejected: (reason: any) => IPromise2<TSuccess, TErrorResult>): IPromise2<TSuccess, TErrorResult>;
        /**
         * Shorthand for promise.then(null, errorCallback).
         */
        catch<TErrorResult>(onRejected: (reason: any) => TErrorResult): IPromise2<TSuccess, TErrorResult>;
        /**
         * Allows you to observe either the fulfillment or rejection of a promise,
         * but to do so without modifying the final value.
         * This is useful to release resources or do some clean-up that needs to be done
         * whether the promise was rejected or resolved.
         * See the full specification for more information.
         * Because finally is a reserved word in JavaScript and reserved keywords
         * are not supported as property names by ES3, you'll need to invoke
         * the method like promise['finally'](callback) to make your code IE8 and Android 2.x compatible.
         */
        finally<T, U>(finallyCallback: () => any): IPromise2<T, U>;
    }
    interface IDeferred<T> extends IDeferred2<T, T> {
    }
    interface IDeferred2<TSuccess, TError> {
        resolve(value: TSuccess): void;
        reject(reason?: TError): void;
        promise: IPromise2<TSuccess, TError>;
    }
    interface RejectablePromise2<T, E> extends IPromise2<T, E> {
        reject(reason?: E): void;
        resolved(): boolean;
        rejected(): boolean;
        pending(): boolean;
    }
    interface RejectablePromise<T> extends RejectablePromise2<T, T> {
    }
    interface IResultCallback<T> {
        (result: T, done: boolean): void;
    }
}
declare module powerbi {
    module Prototype {
        /**
         * Returns a new object with the provided obj as its prototype.
         */
        function inherit<T>(obj: T, extension?: (inherited: T) => void): T;
        /**
         * Uses the provided callback function to selectively replace contents in the provided array.
         * @return A new array with those values overriden
         * or undefined if no overrides are necessary.
         */
        function overrideArray<T, TArray>(prototype: TArray, override: (T) => T): TArray;
    }
}
interface ScriptErrorInfo {
    message: string;
    sourceUrl: string;
    lineNumber: number;
    columnNumber: number;
    stack: string;
}
interface ErrorInfoKeyValuePair {
    errorInfoKey: string;
    errorInfoValue: string;
}
interface ErrorDetails {
    message: string;
    additionalErrorInfo: ErrorInfoKeyValuePair[];
}
declare module jsCommon {
    module Formatting {
        /**
         * Translate .NET format into something supported by jQuery.Globalize.
         */
        function findDateFormat(value: Date, format: string, cultureName: string): {
            value: Date;
            format: string;
        };
        /**
         * Translates unsupported .NET custom format expressions to the custom expressions supported by JQuery.Globalize.
         */
        function fixDateTimeFormat(format: string): string;
    }
}
declare module jsCommon {
    /**
     * Public API.
     */
    interface IJavaScriptDependency {
        javascriptFile: string;
        onLoadCallback?: () => JQueryPromise<void>;
    }
    interface IDependency {
        javaScriptFiles?: string[];
        cssFiles?: string[];
        javaScriptFilesWithCallback?: IJavaScriptDependency[];
    }
    function requires(dependency: IDependency, to?: () => void): void;
}
declare module powerbi {
    function createJQueryPromiseFactory(): IPromiseFactory;
}
declare module powerbi {
    interface IStorageService {
        getData(key: string): any;
        setData(key: string, data: any): void;
    }
    class EphemeralStorageService implements IStorageService {
        private cache;
        private clearCacheTimerId;
        private clearCacheInterval;
        static defaultClearCacheInterval: number;
        constructor(clearCacheInterval?: number);
        getData(key: string): any;
        setData(key: string, data: any): void;
        private clearCache();
    }
    var localStorageService: IStorageService;
    var ephemeralStorageService: IStorageService;
}
declare module powerbi {
    interface ITextMeasurer {
        (textElement: SVGTextElement): number;
    }
    interface ITextAsSVGMeasurer {
        (textProperties: TextProperties): number;
    }
    interface TextProperties {
        text?: string;
        fontFamily: string;
        fontSize: string;
        fontWeight?: string;
        fontStyle?: string;
        whiteSpace?: string;
    }
    module TextMeasurementService {
        /**
         * This method measures the width of the text with the given SVG text properties.
         * @param textProperties The text properties to use for text measurement.
         */
        function measureSvgTextWidth(textProperties: TextProperties): number;
        /**
         * This method measures the height of the text with the given SVG text properties.
         * @param textProperties The text properties to use for text measurement.
         */
        function measureSvgTextHeight(textProperties: TextProperties): number;
        /**
         * This method estimates the height of the text with the given SVG text properties.
         * @param {TextProperties} textProperties - The text properties to use for text measurement
         */
        function estimateSvgTextHeight(textProperties: TextProperties): number;
        /**
         * This method measures the width of the svgElement.
         * @param svgElement The SVGTextElement to be measured.
         */
        function measureSvgTextElementWidth(svgElement: SVGTextElement): number;
        /**
         * This method fetches the text measurement properties of the given DOM element.
         * @param element The selector for the DOM Element.
         */
        function getMeasurementProperties(element: JQuery): TextProperties;
        /**
         * This method fetches the text measurement properties of the given SVG text element.
         * @param svgElement The SVGTextElement to be measured.
         */
        function getSvgMeasurementProperties(svgElement: SVGTextElement): TextProperties;
        /**
         * This method returns the width of a div element.
         * @param element The div element.
         */
        function getDivElementWidth(element: JQuery): string;
        /**
         * Compares labels text size to the available size and renders ellipses when the available size is smaller.
         * @param textProperties The text properties (including text content) to use for text measurement.
         * @param maxWidth The maximum width available for rendering the text.
        */
        function getTailoredTextOrDefault(properties: TextProperties, maxWidth: number): string;
        /**
         * Compares labels text size to the available size and renders ellipses when the available size is smaller.
         * @param textElement The SVGTextElement containing the text to render.
         * @param maxWidth The maximum width available for rendering the text.
        */
        function svgEllipsis(textElement: SVGTextElement, maxWidth: number): void;
        /**
         * Word break textContent of <text> SVG element into <tspan>s
         * Each tspan will be the height of a single line of text
         * @param textElement - the SVGTextElement containing the text to wrap
         * @param maxWidth - the maximum width available
         * @param maxHeight - the maximum height available (defaults to single line)
         * @param linePadding - (optional) padding to add to line height
        */
        function wordBreak(textElement: SVGTextElement, maxWidth: number, maxHeight: number, linePadding?: number): void;
    }
}
declare module jsCommon {
    /**
     * Responsible for throttling input function.
     */
    class ThrottleUtility {
        private fn;
        private timerFactory;
        private delay;
        constructor(delay?: number);
        run(fn: () => void): void;
        /**
         * Note: Public for testing purpose.
         */
        timerComplete(fn: () => void): void;
    }
}
declare module jsCommon {
    interface ITimerPromiseFactory {
        /**
         * Creates a promise that will be resolved after the specified delayInMs.
         * @return Promise.
         */
        create(delayInMs: number): IRejectablePromise;
    }
    /**
     * Responsible for creating timer promises.
     */
    class TimerPromiseFactory implements ITimerPromiseFactory {
        static instance: TimerPromiseFactory;
        /**
         * {@inheritDoc}
         */
        create(delayInMs: number): IRejectablePromise;
    }
}
/**
 * Defined in host.
 */
declare var clusterUri: string;
declare module jsCommon {
    /**
     * Http Status code we are interested.
     */
    enum HttpStatusCode {
        OK = 200,
        BadRequest = 400,
        Unauthorized = 401,
        Forbidden = 403,
        RequestEntityTooLarge = 413,
    }
    /**
     * Other HTTP Constants.
     */
    module HttpConstants {
        const ApplicationOctetStream: string;
        const MultiPartFormData: string;
    }
    /**
     * Extensions to String class.
     */
    module StringExtensions {
        function format(...args: string[]): string;
        /**
         * Compares two strings for equality, ignoring case.
         */
        function equalIgnoreCase(a: string, b: string): boolean;
        function startsWithIgnoreCase(a: string, b: string): boolean;
        /** Determines whether a string contains a specified substring (while ignoring case). */
        function containsIgnoreCase(source: string, substring: string): boolean;
        /**
         * Normalizes case for a string.
         * Used by equalIgnoreCase method.
         */
        function normalizeCase(value: string): string;
        /**
         * Is string null or empty or undefined?
         * @return True if the value is null or undefined or empty string,
         * otherwise false.
         */
        function isNullOrEmpty(value: string): boolean;
        /**
         * Returns true if the string is null, undefined, empty, or only includes white spaces.
         * @return True if the str is null, undefined, empty, or only includes white spaces,
         * otherwise false.
         */
        function isNullOrUndefinedOrWhiteSpaceString(str: string): boolean;
        /**
         * Returns a value indicating whether the str contains any whitespace.
         */
        function containsWhitespace(str: string): boolean;
        /**
         * Returns a value indicating whether the str is a whitespace string.
         */
        function isWhitespace(str: string): boolean;
        /**
         * Returns the string with any trailing whitespace from str removed.
         */
        function trimTrailingWhitespace(str: string): string;
        /**
         * Returns the string with any leading and trailing whitespace from str removed.
         */
        function trimWhitespace(str: string): string;
        /**
         * Returns length difference between the two provided strings.
         */
        function getLengthDifference(left: string, right: string): number;
        /**
         * Repeat char or string several times.
         * @param char The string to repeat.
         * @param count How many times to repeat the string.
         */
        function repeat(char: string, count: number): string;
        /**
         * Replace all the occurrences of the textToFind in the text with the textToReplace.
         * @param text The original string.
         * @param textToFind Text to find in the original string.
         * @param textToReplace New text replacing the textToFind.
         */
        function replaceAll(text: string, textToFind: string, textToReplace: string): string;
        /**
         * Returns a name that is not specified in the values.
         */
        function findUniqueName(usedNames: {
            [name: string]: boolean;
        }, baseName: string): string;
        function constructCommaSeparatedList(list: string[], resourceProvider: IStringResourceProvider, maxValue?: number): string;
    }
    /**
     * Interface used for interacting with WCF typed objects.
     */
    interface TypedObject {
        __type: string;
    }
    /**
     * The general utility class.
     */
    class Utility {
        private static TypeNamespace;
        static JsonContentType: string;
        static JpegContentType: string;
        static XJavascriptContentType: string;
        static JsonDataType: string;
        static BlobDataType: string;
        static HttpGetMethod: string;
        static HttpPostMethod: string;
        static HttpPutMethod: string;
        static HttpDeleteMethod: string;
        static HttpContentTypeHeader: string;
        static HttpAcceptHeader: string;
        static Undefined: string;
        private static staticContentLocation;
        /**
         * Ensures the specified value is not null or undefined. Throws a relevent exception if it is.
         * @param value The value to check.
         * @param context The context from which the check originated.
         * @param methodName The name of the method that initiated the check.
         * @param parameterName The parameter name of the value to check.
         */
        static throwIfNullOrUndefined(value: any, context: any, methodName: any, parameterName: any): void;
        /**
         * Ensures the specified value is not null, undefined or empty. Throws a relevent exception if it is.
         * @param value The value to check.
         * @param context The context from which the check originated.
         * @param methodName The name of the method that initiated the check.
         * @param parameterName The parameter name of the value to check.
         */
        static throwIfNullOrEmpty(value: any, context: any, methodName: string, parameterName: string): void;
        /**
         * Ensures the specified string is not null, undefined or empty. Throws a relevent exception if it is.
         * @param value The value to check.
         * @param context The context from which the check originated.
         * @param methodName The name of the method that initiated the check.
         * @param parameterName The parameter name of the value to check.
         */
        static throwIfNullOrEmptyString(value: string, context: any, methodName: string, parameterName: string): void;
        /**
         * Ensures the specified value is not null, undefined, whitespace or empty. Throws a relevent exception if it is.
         * @param value The value to check.
         * @param context The context from which the check originated.
         * @param methodName The name of the method that initiated the check.
         * @param parameterName The parameter name of the value to check.
         */
        static throwIfNullEmptyOrWhitespaceString(value: string, context: any, methodName: string, parameterName: string): void;
        /**
         * Ensures the specified condition is true. Throws relevant exception if it isn't.
         * @param condition The condition to check.
         * @param context The context from which the check originated.
         * @param methodName The name of the method that initiated the check.
         * @param parameterName The parameter name against which the condition is checked.
         */
        static throwIfNotTrue(condition: boolean, context: any, methodName: string, parameterName: string): void;
        /**
         * Checks whether the provided value is a 'string'.
         * @param value The value to test.
         */
        static isString(value: any): boolean;
        /**
         * Checks whether the provided value is a 'boolean'.
         * @param value The value to test.
         */
        static isBoolean(value: any): boolean;
        /**
         * Checks whether the provided value is a 'number'.
         * @param value The value to test.
         */
        static isNumber(value: any): boolean;
        /**
         * Checks whether the provided value is a Date instance.
         * @param value The value to test.
         */
        static isDate(value: any): boolean;
        /**
         * Checks whether the provided value is an 'object'.
         * @param value The value to test.
         */
        static isObject(value: any): boolean;
        /**
         * Checks whether the provided value is null or undefined.
         * @param value The value to test.
         */
        static isNullOrUndefined(value: any): boolean;
        /**
         * Combine a base url and a path.
         * @param baseUrl The base url.
         * @param path The path to add on to the base url.
         * @returns The combined url.
         */
        static urlCombine(baseUrl: string, path: string): string;
        static getAbsoluteUri(path: string): string;
        static getStaticResourceUri(path: string): string;
        static getComponentName(context: any): string;
        static throwException(e: any): void;
        static createClassSelector(className: string): string;
        static createIdSelector(id: string): string;
        /**
         * Creates a client-side Guid string.
         * @returns A string representation of a Guid.
         */
        static generateGuid(): string;
        /**
         * Generates a random 7 character string that is used as a connection group name.
         * @returns A random connection group name.
         */
        static generateConnectionGroupName(): string;
        /**
         * Try extract a cookie from {@link document.cookie} identified by key.
         */
        static getCookieValue(key: string): string;
        /**
         * Extracts the protocol://hostname section of a url.
         * @param url The URL from which to extract the section.
         * @returns The protocol://hostname portion of the given URL.
         */
        static getDomainForUrl(url: string): string;
        /**
         * Extracts the hostname and absolute path sections of a url.
         * @param url The URL from which to extract the section.
         * @returns The hostname and absolute path portion of the given URL.
         */
        static getHostNameForUrl(url: string): string;
        /**
         * Return the original url with query string stripped.
         * @param url The URL from which to extract the section.
         * @returns the original url with query string stripped.
         */
        static getUrlWithoutQueryString(url: string): string;
        /**
         * Extracts the protocol section of a url.
         * @param url The URL from which to extract the section.
         * @returns The protocol for the current URL.
         */
        static getProtocolFromUrl(url: string): string;
        /**
         * Returns a formatted href object from a URL.
         * @param url The URL used to generate the object.
         * @returns A jQuery object with the url.
         */
        static getHrefObjectFromUrl(url: string): JQuery;
        /**
         * Converts a WCF representation of a dictionary to a JavaScript dictionary.
         * @param wcfDictionary The WCF dictionary to convert.
         * @returns The native JavaScript representation of this dictionary.
         */
        static convertWcfToJsDictionary(wcfDictionary: any[]): {
            [index: string]: any;
        };
        static getDateFromWcfJsonString(jsonDate: string, fromUtcMilliseconds: boolean): Date;
        /**
         * Get the outer html of the given jquery object.
         * @param content The jquery object.
         * @returns The entire html representation of the object.
         */
        static getOuterHtml(content: JQuery): string;
        /**
         * Comparison Method: Compares two integer numbers.
         * @param a An integer value.
         * @param b An integer value.
         * @returns The comparison result.
         */
        static compareInt(a: number, b: number): number;
        /**
         * Return the index of the smallest value in a numerical array.
         * @param a A numeric array.
         * @returns The index of the smallest value in the array.
         */
        static getIndexOfMinValue(a: number[]): number;
        /**
         * Tests whether a URL is valid.
         * @param url The url to be tested.
         * @returns Whether the provided url is valid.
         */
        static isValidUrl(url: string): boolean;
        /**
         * Extracts a url from a background image attribute in the format of: url('www.foobar.com/image.png').
         * @param input The value of the background-image attribute.
         * @returns The extracted url.
         */
        static extractUrlFromCssBackgroundImage(input: string): string;
        /**
         * Verifies image data url of images.
         */
        static isValidImageDataUrl(url: string): boolean;
        /**
         * Downloads a content string as a file.
         * @param content Content stream.
         * @param fileName File name to use.
         */
        static saveAsFile(content: any, fileName: string): void;
        /**
         * Helper method to get the simple type name from a typed object.
         * @param obj The typed object.
         * @returns The simple type name for the object.
         */
        static getType(obj: TypedObject): string;
        /**
         * Check if an element supports a specific event type.
         * @param eventName The name of the event.
         * @param element The element to test for event support.
         * @returns Whether the even is supported on the provided element.
         */
        static isEventSupported(eventName: string, element: Element): boolean;
        static toPixel(pixelAmount: number): string;
        static getPropertyCount(object: any): number;
        /**
         * Check if an element supports a specific event type.
         * @param filePath File path.
         * @returns File extension.
         */
        static getFileExtension(filePath: string): string;
        /**
         * Extract the filename out of a full path delimited by '\' or '/'.
         * @param filePath File path.
         * @returns filename File name.
         */
        static extractFileNameFromPath(filePath: string): string;
        /**
         * This method indicates whether window.clipboardData is supported.
         * For example, clipboard support for Windows Store apps is currently disabled
         * since window.clipboardData is unsupported (it raises access denied error)
         * since clipboard in Windows Store is being
         * achieved through Windows.ApplicationModel.DataTransfer.Clipboard class.
         */
        static canUseClipboard(): boolean;
        static is64BitOperatingSystem(): boolean;
        static parseNumber(value: any, defaultValue?: number): number;
        static getURLParamValue(name: string): string | number;
        /**
         * Return local timezone.
         * This function uses summer and winter offset to determine local time zone.
         * The result localTimeZoneString must be a subset of the strings used by server,
         * as documented here: https://msdn.microsoft.com/en-us/library/gg154758.aspx (Dynamic Daylight Savings Time (Compact 2013)).
         * @return Local timezone string or UTC if timezone cannot be found.
         */
        static getLocalTimeZoneString(): string;
    }
    class VersionUtility {
        /**
         * Compares 2 version strings.
         * @param versionA The first version string.
         * @param versionB The second version string.
         * @returns A result for the comparison.
         */
        static compareVersions(versionA: string, versionB: string): number;
    }
    module PerformanceUtil {
        class PerfMarker {
            private _name;
            private _start;
            constructor(name: string);
            private static begin(name);
            end(): void;
        }
        function create(name: string): PerfMarker;
    }
    module DeferUtility {
        /**
         * Wraps a callback and returns a new function.
         * The function can be called many times but the callback
         * will only be executed once on the next frame.
         * Use this to throttle big UI updates and access to DOM.
         */
        function deferUntilNextFrame(callback: Function): Function;
    }
}
declare module jsCommon {
    class TraceItem {
        type: TraceType;
        sessionId: string;
        requestId: string;
        text: string;
        timeStamp: Date;
        /**
         * Note: DO NOT USE for backward compability only.
         */
        _activityId: string;
        private static traceTypeStrings;
        constructor(text: string, type: TraceType, sessionId: string, requestId?: string);
        toString(): string;
    }
}
declare module jsCommon {
    /**
     * Interface to help define objects indexed by number to a particular type.
     */
    interface INumberDictionary<T> {
        [key: number]: T;
    }
    /**
     * Interface to help define objects indexed by name to a particular type.
     */
    interface IStringDictionary<T> {
        [key: string]: T;
    }
    /**
     * Extensions for Enumerations.
     */
    module EnumExtensions {
        /**
         * Gets a value indicating whether the value has the bit flags set.
         */
        function hasFlag(value: number, flag: number): boolean;
        /**
         * According to the TypeScript Handbook, this is safe to do.
         */
        function toString(enumType: any, value: number): string;
    }
    /**
     * Extensions to String class.
     */
    module StringExtensions {
        /**
         * Checks if a string ends with a sub-string.
         */
        function endsWith(str: string, suffix: string): boolean;
    }
    module LogicExtensions {
        function XOR(a: boolean, b: boolean): boolean;
    }
    module JsonComparer {
        /**
         * Performs JSON-style comparison of two objects.
         */
        function equals<T>(x: T, y: T): boolean;
    }
}
declare module jsCommon {
    interface ITraceListener {
        logTrace(trace: TraceItem): void;
    }
    class ConsoleTracer implements ITraceListener {
        logTrace(trace: TraceItem): void;
    }
    module Trace {
        /**
         * Trace a warning. Please ensure that no PII is being logged.
         */
        function warning(text: string, requestId?: string): void;
        /**
         * Trace an error. Please ensure that no PII is being logged.
         */
        function error(text: string, includeStackTrace?: boolean, requestId?: string): void;
        /**
         * Trace an information. Please ensure that no PII is being logged.
         */
        function verbose(text: string, requestId?: string): void;
        function addListener(listener: ITraceListener): void;
        function removeListener(listener: ITraceListener): void;
        function resetListeners(): void;
        function reset(): void;
        function getTraces(): Array<TraceItem>;
        /**
         * Note: Used for unit-test only.
         */
        function disableDefaultListener(): void;
        function enableDefaultListener(): void;
    }
}
declare module jsCommon {
    /**
     * The types of possible traces within the system, this aligns to the traces available in Cloud Platform.
     */
    enum TraceType {
        Information = 0,
        Verbose = 1,
        Warning = 2,
        Error = 3,
        ExpectedError = 4,
        UnexpectedError = 5,
        Fatal = 6,
    }
}
declare module jsCommon {
    function ensurePowerView(action?: () => void): void;
    function ensureMap(action: () => void): void;
    function mapControlLoaded(): void;
    function waitForMapControlLoaded(): JQueryPromise<void>;
}
declare var globalMapControlLoaded: () => void;
declare module jsCommon {
    interface ArrayIdItems<T> extends Array<T> {
        withId(id: number): T;
    }
    interface ArrayNamedItems<T> extends Array<T> {
        withName(name: string): T;
    }
    module ArrayExtensions {
        /**
         * Returns items that exist in target and other.
         */
        function intersect<T>(target: T[], other: T[]): T[];
        /**
         * Return elements exists in target but not exists in other.
         */
        function diff<T>(target: T[], other: T[]): T[];
        /**
         * Return an array with only the distinct items in the source.
         */
        function distinct<T>(source: T[]): T[];
        /**
         * Pushes content of source onto target,
         * for parts of course that do not already exist in target.
         */
        function union<T>(target: T[], source: T[]): void;
        /**
         * Pushes value onto target, if value does not already exist in target.
         */
        function unionSingle<T>(target: T[], value: T): void;
        /**
         * Returns an array with a range of items from source,
         * including the startIndex & endIndex.
         */
        function range<T>(source: T[], startIndex: number, endIndex: number): T[];
        /**
         * Returns an array that includes items from source, up to the specified count.
         */
        function take<T>(source: T[], count: number): T[];
        function copy<T>(source: T[]): T[];
        /**
         * Returns a value indicating whether the arrays have the same values in the same sequence.
         */
        function sequenceEqual<T>(left: T[], right: T[], comparison: (x: T, y: T) => boolean): boolean;
        /**
         * Returns null if the specified array is empty.
         * Otherwise returns the specified array.
         */
        function emptyToNull<T>(array: T[]): T[];
        function indexOf<T>(array: T[], predicate: (T) => boolean): number;
        /**
         * Returns a copy of the array rotated by the specified offset.
         */
        function rotate<T>(array: T[], offset: number): T[];
        function createWithId<T>(): ArrayIdItems<T>;
        function extendWithId<T>(array: {
            id: number;
        }[]): ArrayIdItems<T>;
        /**
         * Finds and returns the first item with a matching ID.
         */
        function findWithId<T>(array: T[], id: number): T;
        function createWithName<T>(): ArrayNamedItems<T>;
        function extendWithName<T>(array: {
            name: string;
        }[]): ArrayNamedItems<T>;
        function findItemWithName<T>(array: T[], name: string): T;
        function indexWithName<T>(array: T[], name: string): number;
        /**
         * Deletes all items from the array.
         */
        function clear(array: any[]): void;
        function isUndefinedOrEmpty(array: any[]): boolean;
        function isArray(object: any): boolean;
    }
}
declare module InJs {
    /**
     * The types of possible traces within the system, this aligns to the traces available in Cloud Platform.
     */
    enum TraceType {
        information = 0,
        verbose = 1,
        warning = 2,
        error = 3,
        expectedError = 4,
        unexpectedError = 5,
        fatal = 6,
    }
}
declare module jsCommon {
    module WordBreaker {
        import TextProperties = powerbi.TextProperties;
        import ITextAsSVGMeasurer = powerbi.ITextAsSVGMeasurer;
        interface WordBreakerResult {
            start: number;
            end: number;
        }
        /**
         * Find the word nearest the cursor specified within content
         * @param index - point within content to search forward/backward from
         * @param content - string to search
        */
        function find(index: number, content: string): WordBreakerResult;
        /**
         * Test for presence of breakers within content
         * @param content - string to test
        */
        function hasBreakers(content: string): boolean;
        /**
         * Count the number of pieces when broken by BREAKERS_REGEX
         * ~2.7x faster than WordBreaker.split(content).length
         * @param content - string to break and count
        */
        function wordCount(content: string): number;
        /**
         * Split content by breakers (words) and greedy fit as many words
         * into each index in the result based on max width and number of lines
         * e.g. Each index in result corresponds to a line of content
         *      when used by AxisHelper.LabelLayoutStrategy.wordBreak
         * @param content - string to split
         * @param properties - text properties to be used by @param:textWidthMeasurer
         * @param textWidthMeasurer - function to calculate width of given text content
         * @param maxWidth - maximum allowed width of text content in each result
         * @param maxNumLines - maximum number of results we will allow, valid values must be greater than 0
        */
        function splitByWidth(content: string, properties: TextProperties, textWidthMeasurer: ITextAsSVGMeasurer, maxWidth: number, maxNumLines: number): string[];
    }
}

/// <reference path="../../Typedefs/jquery/jquery.d.ts" />
/// <reference path="../../Typedefs/globalize/globalize.d.ts" />
/// <reference path="../../Typedefs/lodash/lodash.d.ts" />
/// <reference path="../../VisualsCommon/obj/VisualsCommon.d.ts" />
declare module powerbi.data {
    /** Allows generic traversal and type discovery for a SQExpr tree. */
    interface ISQExprVisitorWithArg<T, TArg> {
        visitEntity(expr: SQEntityExpr, arg: TArg): T;
        visitColumnRef(expr: SQColumnRefExpr, arg: TArg): T;
        visitMeasureRef(expr: SQMeasureRefExpr, arg: TArg): T;
        visitAggr(expr: SQAggregationExpr, arg: TArg): T;
        visitAnd(expr: SQAndExpr, arg: TArg): T;
        visitBetween(expr: SQBetweenExpr, arg: TArg): T;
        visitIn(expr: SQInExpr, arg: TArg): T;
        visitOr(expr: SQOrExpr, arg: TArg): T;
        visitCompare(expr: SQCompareExpr, arg: TArg): T;
        visitContains(expr: SQContainsExpr, arg: TArg): T;
        visitExists(expr: SQExistsExpr, arg: TArg): T;
        visitNot(expr: SQNotExpr, arg: TArg): T;
        visitStartsWith(expr: SQStartsWithExpr, arg: TArg): T;
        visitConstant(expr: SQConstantExpr, arg: TArg): T;
        visitDateSpan(expr: SQDateSpanExpr, arg: TArg): T;
        visitDateAdd(expr: SQDateAddExpr, arg: TArg): T;
        visitNow(expr: SQNowExpr, arg: TArg): T;
    }
    interface ISQExprVisitor<T> extends ISQExprVisitorWithArg<T, void> {
    }
    /** Default IQueryExprVisitorWithArg implementation that others may derive from. */
    class DefaultSQExprVisitorWithArg<T, TArg> implements ISQExprVisitorWithArg<T, TArg> {
        visitEntity(expr: SQEntityExpr, arg: TArg): T;
        visitColumnRef(expr: SQColumnRefExpr, arg: TArg): T;
        visitMeasureRef(expr: SQMeasureRefExpr, arg: TArg): T;
        visitAggr(expr: SQAggregationExpr, arg: TArg): T;
        visitBetween(expr: SQBetweenExpr, arg: TArg): T;
        visitIn(expr: SQInExpr, arg: TArg): T;
        visitAnd(expr: SQAndExpr, arg: TArg): T;
        visitOr(expr: SQOrExpr, arg: TArg): T;
        visitCompare(expr: SQCompareExpr, arg: TArg): T;
        visitContains(expr: SQContainsExpr, arg: TArg): T;
        visitExists(expr: SQExistsExpr, arg: TArg): T;
        visitNot(expr: SQNotExpr, arg: TArg): T;
        visitStartsWith(expr: SQStartsWithExpr, arg: TArg): T;
        visitConstant(expr: SQConstantExpr, arg: TArg): T;
        visitDateSpan(expr: SQDateSpanExpr, arg: TArg): T;
        visitDateAdd(expr: SQDateAddExpr, arg: TArg): T;
        visitNow(expr: SQNowExpr, arg: TArg): T;
        visitDefault(expr: SQExpr, arg: TArg): T;
    }
    /** Default ISQExprVisitor implementation that others may derive from. */
    class DefaultSQExprVisitor<T> extends DefaultSQExprVisitorWithArg<T, void> implements ISQExprVisitor<T> {
    }
    /** Default ISQExprVisitor implementation that implements default traversal and that others may derive from. */
    class DefaultSQExprVisitorWithTraversal implements ISQExprVisitor<void> {
        visitEntity(expr: SQEntityExpr): void;
        visitColumnRef(expr: SQColumnRefExpr): void;
        visitMeasureRef(expr: SQMeasureRefExpr): void;
        visitAggr(expr: SQAggregationExpr): void;
        visitBetween(expr: SQBetweenExpr): void;
        visitIn(expr: SQInExpr): void;
        visitAnd(expr: SQAndExpr): void;
        visitOr(expr: SQOrExpr): void;
        visitCompare(expr: SQCompareExpr): void;
        visitContains(expr: SQContainsExpr): void;
        visitExists(expr: SQExistsExpr): void;
        visitNot(expr: SQNotExpr): void;
        visitStartsWith(expr: SQStartsWithExpr): void;
        visitConstant(expr: SQConstantExpr): void;
        visitDateSpan(expr: SQDateSpanExpr): void;
        visitDateAdd(expr: SQDateAddExpr): void;
        visitNow(expr: SQNowExpr): void;
        visitDefault(expr: SQExpr): void;
    }
}
declare module powerbi {
    import DisplayNameGetter = powerbi.data.DisplayNameGetter;
    type EnumMemberValue = string | number;
    interface IEnumMember {
        value: EnumMemberValue;
        displayName: DisplayNameGetter;
    }
    /** Defines a custom enumeration data type, and its values. */
    interface IEnumType {
        /** Gets the members of the enumeration, limited to the validMembers, if appropriate. */
        members(validMembers?: EnumMemberValue[]): IEnumMember[];
    }
    function createEnumType(members: IEnumMember[]): IEnumType;
}
declare module powerbi {
    module axisScale {
        const linear: string;
        const log: string;
        const type: IEnumType;
    }
}
declare module powerbi {
    module axisStyle {
        const showBoth: string;
        const showTitleOnly: string;
        const showUnitOnly: string;
        const type: IEnumType;
    }
}
declare module powerbi {
    module axisType {
        const scalar: string;
        const categorical: string;
        const both: string;
        const type: IEnumType;
    }
}
declare module powerbi {
    module basicShapeType {
        const rectangle: string;
        const oval: string;
        const line: string;
        const arrow: string;
        const triangle: string;
        const type: IEnumType;
    }
}
declare module powerbi {
    import SQExpr = powerbi.data.SQExpr;
    interface FillTypeDescriptor extends FillGeneric<boolean> {
    }
    interface FillDefinition extends FillGeneric<SQExpr> {
    }
    interface Fill extends FillGeneric<string> {
    }
    /** The "master" interface of a fill object.  Non-generic extensions define the type. */
    interface FillGeneric<T> {
        solid?: {
            color?: T;
        };
        gradient?: {
            startColor?: T;
            endColor?: T;
        };
        pattern?: {
            patternKind?: T;
            color?: T;
        };
    }
}
declare module powerbi {
    import SQExpr = powerbi.data.SQExpr;
    interface FillRuleTypeDescriptor {
    }
    interface FillRuleDefinition extends FillRuleGeneric<SQExpr, SQExpr> {
    }
    interface FillRule extends FillRuleGeneric<string, number> {
    }
    interface FillRuleGeneric<TColor, TValue> {
        linearGradient2?: LinearGradient2Generic<TColor, TValue>;
        linearGradient3?: LinearGradient3Generic<TColor, TValue>;
    }
    type LinearGradient2 = LinearGradient2Generic<string, number>;
    type LinearGradient3 = LinearGradient3Generic<string, number>;
    interface LinearGradient2Generic<TColor, TValue> {
        max: RuleColorStopGeneric<TColor, TValue>;
        min: RuleColorStopGeneric<TColor, TValue>;
    }
    interface LinearGradient3Generic<TColor, TValue> {
        max: RuleColorStopGeneric<TColor, TValue>;
        mid: RuleColorStopGeneric<TColor, TValue>;
        min: RuleColorStopGeneric<TColor, TValue>;
    }
    type RuleColorStopDefinition = RuleColorStopGeneric<SQExpr, SQExpr>;
    type RuleColorStop = RuleColorStopGeneric<string, number>;
    interface RuleColorStopGeneric<TColor, TValue> {
        color: TColor;
        value?: TValue;
    }
}
declare module powerbi {
    interface FilterTypeDescriptor {
    }
}
declare module powerbi {
    module labelPosition {
        const insideEnd: string;
        const insideCenter: string;
        const outsideEnd: string;
        const insideBase: string;
        const type: IEnumType;
    }
}
declare module powerbi {
    module legendPosition {
        const top: string;
        const bottom: string;
        const left: string;
        const right: string;
        const topCenter: string;
        const bottomCenter: string;
        const leftCenter: string;
        const rightCenter: string;
        const type: IEnumType;
    }
}
declare module powerbi {
    import SemanticFilter = powerbi.data.SemanticFilter;
    /** Describes a structural type in the client type system. Leaf properties should use ValueType. */
    interface StructuralTypeDescriptor {
        fill?: FillTypeDescriptor;
        fillRule?: FillRuleTypeDescriptor;
        filter?: FilterTypeDescriptor;
    }
    type StructuralObjectDefinition = FillDefinition | FillRuleDefinition | SemanticFilter;
    /** Defines instances of structural types. */
    type StructuralObjectValue = Fill | FillRule | SemanticFilter;
    module StructuralTypeDescriptor {
        function isValid(type: StructuralTypeDescriptor): boolean;
    }
}
declare module powerbi {
    /** Describes instances of value type objects. */
    type PrimitiveValue = string | number | boolean | Date;
    /** Describes a data value type in the client type system. Can be used to get a concrete ValueType instance. */
    interface ValueTypeDescriptor {
        text?: boolean;
        numeric?: boolean;
        integer?: boolean;
        bool?: boolean;
        dateTime?: boolean;
        duration?: boolean;
        binary?: boolean;
        none?: boolean;
        temporal?: TemporalTypeDescriptor;
        geography?: GeographyTypeDescriptor;
        misc?: MiscellaneousTypeDescriptor;
        formatting?: FormattingTypeDescriptor;
        extendedType?: ExtendedType;
    }
    interface TemporalTypeDescriptor {
        year?: boolean;
        month?: boolean;
    }
    interface GeographyTypeDescriptor {
        address?: boolean;
        city?: boolean;
        continent?: boolean;
        country?: boolean;
        county?: boolean;
        region?: boolean;
        postalCode?: boolean;
        stateOrProvince?: boolean;
        place?: boolean;
        latitude?: boolean;
        longitude?: boolean;
    }
    interface MiscellaneousTypeDescriptor {
        image?: boolean;
        imageUrl?: boolean;
        webUrl?: boolean;
    }
    interface FormattingTypeDescriptor {
        color?: boolean;
        formatString?: boolean;
        legendPosition?: boolean;
        axisScale?: boolean;
        axisType?: boolean;
        yAxisPosition?: boolean;
        axisStyle?: boolean;
        alignment?: boolean;
        labelDisplayUnits?: boolean;
        labelPosition?: boolean;
        outline?: boolean;
        shapeType?: boolean;
        imageScalingType?: boolean;
    }
    /** Describes a data value type, including a primitive type and extended type if any (derived from data category). */
    class ValueType implements ValueTypeDescriptor {
        private static typeCache;
        private underlyingType;
        private category;
        private temporalType;
        private geographyType;
        private miscType;
        private formattingType;
        /** Do not call the ValueType constructor directly. Use the ValueType.fromXXX methods. */
        constructor(type: ExtendedType, category?: string);
        /** Creates or retrieves a ValueType object based on the specified ValueTypeDescriptor. */
        static fromDescriptor(descriptor: ValueTypeDescriptor): ValueType;
        /** Advanced: Generally use fromDescriptor instead. Creates or retrieves a ValueType object for the specified ExtendedType. */
        static fromExtendedType(extendedType: ExtendedType): ValueType;
        /** Creates or retrieves a ValueType object for the specified PrimitiveType and data category. */
        static fromPrimitiveTypeAndCategory(primitiveType: PrimitiveType, category?: string): ValueType;
        /** Gets the exact primitive type of this ValueType. */
        primitiveType: PrimitiveType;
        /** Gets the exact extended type of this ValueType. */
        extendedType: ExtendedType;
        /** Gets the data category string (if any) for this ValueType. */
        categoryString: string;
        /** Indicates whether the type represents text values. */
        text: boolean;
        /** Indicates whether the type represents any numeric value. */
        numeric: boolean;
        /** Indicates whether the type represents integer numeric values. */
        integer: boolean;
        /** Indicates whether the type represents Boolean values. */
        bool: boolean;
        /** Indicates whether the type represents any date/time values. */
        dateTime: boolean;
        /** Indicates whether the type represents duration values. */
        duration: boolean;
        /** Indicates whether the type represents binary values. */
        binary: boolean;
        /** Indicates whether the type represents none values. */
        none: boolean;
        /** Returns an object describing temporal values represented by the type, if it represents a temporal type. */
        temporal: TemporalType;
        /** Returns an object describing geographic values represented by the type, if it represents a geographic type. */
        geography: GeographyType;
        /** Returns an object describing the specific values represented by the type, if it represents a miscellaneous extended type. */
        misc: MiscellaneousType;
        /** Returns an object describing the formatting values represented by the type, if it represents a formatting type. */
        formatting: FormattingType;
    }
    class TemporalType implements TemporalTypeDescriptor {
        private underlyingType;
        constructor(type: ExtendedType);
        year: boolean;
        month: boolean;
    }
    class GeographyType implements GeographyTypeDescriptor {
        private underlyingType;
        constructor(type: ExtendedType);
        address: boolean;
        city: boolean;
        continent: boolean;
        country: boolean;
        county: boolean;
        region: boolean;
        postalCode: boolean;
        stateOrProvince: boolean;
        place: boolean;
        latitude: boolean;
        longitude: boolean;
    }
    class MiscellaneousType implements MiscellaneousTypeDescriptor {
        private underlyingType;
        constructor(type: ExtendedType);
        image: boolean;
        imageUrl: boolean;
        webUrl: boolean;
    }
    class FormattingType implements FormattingTypeDescriptor {
        private underlyingType;
        constructor(type: ExtendedType);
        color: boolean;
        formatString: boolean;
        legendPosition: boolean;
        axisScale: boolean;
        axisType: boolean;
        yAxisPosition: boolean;
        axisStyle: boolean;
        alignment: boolean;
        labelDisplayUnits: boolean;
        labelPosition: boolean;
        outline: boolean;
        shapeType: boolean;
        imageScalingType: boolean;
    }
    /** Defines primitive value types. Must be consistent with types defined by server conceptual schema. */
    enum PrimitiveType {
        Null = 0,
        Text = 1,
        Decimal = 2,
        Double = 3,
        Integer = 4,
        Boolean = 5,
        Date = 6,
        DateTime = 7,
        DateTimeZone = 8,
        Time = 9,
        Duration = 10,
        Binary = 11,
        None = 12,
    }
    /** Defines extended value types, which include primitive types and known data categories constrained to expected primitive types. */
    enum ExtendedType {
        Numeric = 256,
        Temporal = 512,
        Geography = 1024,
        Miscellaneous = 2048,
        Formatting = 4096,
        Null = 0,
        Text = 1,
        Decimal = 258,
        Double = 259,
        Integer = 260,
        Boolean = 5,
        Date = 518,
        DateTime = 519,
        DateTimeZone = 520,
        Time = 521,
        Duration = 10,
        Binary = 11,
        None = 12,
        Year = 66048,
        Year_Text = 66049,
        Year_Integer = 66308,
        Year_Date = 66054,
        Year_DateTime = 66055,
        Month = 131584,
        Month_Text = 131585,
        Month_Integer = 131844,
        Month_Date = 131590,
        Month_DateTime = 131591,
        Address = 6554625,
        City = 6620161,
        Continent = 6685697,
        Country = 6751233,
        County = 6816769,
        Region = 6882305,
        PostalCode = 6947840,
        PostalCode_Text = 6947841,
        PostalCode_Integer = 6948100,
        StateOrProvince = 7013377,
        Place = 7078913,
        Latitude = 7144448,
        Latitude_Decimal = 7144706,
        Latitude_Double = 7144707,
        Longitude = 7209984,
        Longitude_Decimal = 7210242,
        Longitude_Double = 7210243,
        Image = 13109259,
        ImageUrl = 13174785,
        WebUrl = 13240321,
        Color = 19664897,
        FormatString = 19730433,
        LegendPosition = 19795969,
        AxisType = 19861505,
        YAxisPosition = 19927041,
        AxisStyle = 19992577,
        Alignment = 20058113,
        LabelDisplayUnits = 20123649,
        LabelPosition = 20189185,
        Outline = 20254721,
        ShapeType = 20320257,
        ImageScalingType = 20385793,
        AxisScale = 20451329,
    }
}
declare module powerbi.data {
    class ConceptualSchema {
        entities: jsCommon.ArrayNamedItems<ConceptualEntity>;
        capabilities: ConceptualCapabilities;
        /** Indicates whether the user can edit this ConceptualSchema.  This is used to enable/disable model authoring UX. */
        canEdit: boolean;
        findProperty(entityName: string, propertyName: string): ConceptualProperty;
    }
    interface ConceptualCapabilities {
        discourageQueryAggregateUsage: boolean;
        supportsMedian: boolean;
        supportsPercentile: boolean;
    }
    interface ConceptualEntity {
        name: string;
        hidden?: boolean;
        calculated?: boolean;
        queryable?: ConceptualQueryableState;
        properties: jsCommon.ArrayNamedItems<ConceptualProperty>;
        hierarchies: jsCommon.ArrayNamedItems<ConceptualHierarchy>;
    }
    interface ConceptualProperty {
        name: string;
        type: ValueType;
        kind: ConceptualPropertyKind;
        hidden?: boolean;
        format?: string;
        column?: ConceptualColumn;
        queryable?: ConceptualQueryableState;
    }
    interface ConceptualHierarchy {
        name: string;
        levels: jsCommon.ArrayNamedItems<ConceptualHierarchyLevel>;
    }
    interface ConceptualHierarchyLevel {
        name: string;
        column: ConceptualProperty;
    }
    interface ConceptualColumn {
        defaultAggregate?: ConceptualDefaultAggregate;
        keys?: jsCommon.ArrayNamedItems<ConceptualProperty>;
        idOnEntityKey?: boolean;
        calculated?: boolean;
    }
    enum ConceptualQueryableState {
        Queryable = 0,
        Error = 1,
    }
    enum ConceptualPropertyKind {
        Column = 0,
        Measure = 1,
        Kpi = 2,
    }
    enum ConceptualDefaultAggregate {
        Default = 0,
        None = 1,
        Sum = 2,
        Count = 3,
        Min = 4,
        Max = 5,
        Average = 6,
        DistinctCount = 7,
    }
    enum ConceptualDataCategory {
        None = 0,
        Address = 1,
        City = 2,
        Company = 3,
        Continent = 4,
        Country = 5,
        County = 6,
        Date = 7,
        Image = 8,
        ImageUrl = 9,
        Latitude = 10,
        Longitude = 11,
        Organization = 12,
        Place = 13,
        PostalCode = 14,
        Product = 15,
        StateOrProvince = 16,
        WebUrl = 17,
    }
}
declare module powerbi.data {
    /**
     * Represents the versions of the data shape binding structure.
     * NOTE Keep this file in sync with the Sql\InfoNav\src\Data\Contracts\DsqGeneration\DataShapeBindingVersions.cs
     * file in the TFS Dev branch.
     */
    enum DataShapeBindingVersions {
        /** The initial version of data shape binding */
        Version0 = 0,
        /** Explicit subtotal support for axis groupings. */
        Version1 = 1,
    }
    interface DataShapeBindingLimitTarget {
        Primary?: number;
    }
    enum DataShapeBindingLimitType {
        Top = 0,
        First = 1,
        Last = 2,
        Sample = 3,
        Bottom = 4,
    }
    interface DataShapeBindingLimit {
        Count?: number;
        Target: DataShapeBindingLimitTarget;
        Type: DataShapeBindingLimitType;
    }
    interface DataShapeBinding {
        Version?: number;
        Primary: DataShapeBindingAxis;
        Secondary?: DataShapeBindingAxis;
        Limits?: DataShapeBindingLimit[];
        Highlights?: FilterDefinition[];
        DataReduction?: DataShapeBindingDataReduction;
        IncludeEmptyGroups?: boolean;
    }
    interface DataShapeBindingDataReduction {
        Primary?: DataShapeBindingDataReductionAlgorithm;
        Secondary?: DataShapeBindingDataReductionAlgorithm;
        DataVolume?: number;
    }
    interface DataShapeBindingDataReductionAlgorithm {
        Top?: DataShapeBindingDataReductionTopLimit;
        Sample?: DataShapeBindingDataReductionSampleLimit;
        Bottom?: DataShapeBindingDataReductionBottomLimit;
        Window?: DataShapeBindingDataReductionDataWindow;
    }
    interface DataShapeBindingDataReductionTopLimit {
        Count?: number;
    }
    interface DataShapeBindingDataReductionSampleLimit {
        Count?: number;
    }
    interface DataShapeBindingDataReductionBottomLimit {
        Count?: number;
    }
    interface DataShapeBindingDataReductionDataWindow {
        Count?: number;
        RestartTokens?: RestartToken;
    }
    interface DataShapeBindingAxis {
        Groupings: DataShapeBindingAxisGrouping[];
    }
    enum SubtotalType {
        None = 0,
        Before = 1,
        After = 2,
    }
    interface DataShapeBindingAxisGrouping {
        Projections: number[];
        SuppressedProjections?: number[];
        Subtotal?: SubtotalType;
    }
}
declare module powerbi.data {
    interface FederatedConceptualSchemaInitOptions {
        schemas: {
            [name: string]: ConceptualSchema;
        };
        links?: ConceptualSchemaLink[];
    }
    /** Represents a federated conceptual schema. */
    class FederatedConceptualSchema {
        private schemas;
        private links;
        constructor(options: FederatedConceptualSchemaInitOptions);
        schema(name: string): ConceptualSchema;
    }
    /** Describes a semantic relationship between ConceptualSchemas. */
    interface ConceptualSchemaLink {
    }
}
declare module powerbi.data {
    /** Defines a selector for content, including data-, metadata, and user-defined repetition. */
    interface Selector {
        /** Data-bound repetition selection. */
        data?: DataRepetitionSelector[];
        /** Metadata-bound repetition selection.  Refers to a DataViewMetadataColumn queryName. */
        metadata?: string;
        /** User-defined repetition selection. */
        id?: string;
    }
    type DataRepetitionSelector = DataViewScopeIdentity | DataViewScopeWildcard;
    module Selector {
        function filterFromSelector(selectors: Selector[], isNot?: boolean): SemanticFilter;
        function matchesData(selector: Selector, identities: DataViewScopeIdentity[]): boolean;
        function matchesKeys(selector: Selector, keysList: SQExpr[][]): boolean;
        /** Determines whether two selectors are equal. */
        function equals(x: Selector, y: Selector): boolean;
        function getKey(selector: Selector): string;
        function containsWildcard(selector: Selector): boolean;
    }
}
declare module powerbi.data {
    interface QueryDefinition {
        Version?: number;
        From: EntitySource[];
        Where?: QueryFilter[];
        OrderBy?: QuerySortClause[];
        Select: QueryExpressionContainer[];
    }
    interface FilterDefinition {
        Version?: number;
        From: EntitySource[];
        Where: QueryFilter[];
    }
    enum EntitySourceType {
        Table = 0,
        Pod = 1,
    }
    interface EntitySource {
        Name: string;
        EntitySet?: string;
        Entity?: string;
        Schema?: string;
        Type?: EntitySourceType;
    }
    interface QueryFilter {
        Target?: QueryExpressionContainer[];
        Condition: QueryExpressionContainer;
    }
    interface QuerySortClause {
        Expression: QueryExpressionContainer;
        Direction: QuerySortDirection;
    }
    interface QueryExpressionContainer {
        Name?: string;
        SourceRef?: QuerySourceRefExpression;
        Column?: QueryColumnExpression;
        Measure?: QueryMeasureExpression;
        Aggregation?: QueryAggregationExpression;
        And?: QueryBinaryExpression;
        Between?: QueryBetweenExpression;
        In?: QueryInExpression;
        Or?: QueryBinaryExpression;
        Comparison?: QueryComparisonExpression;
        Not?: QueryNotExpression;
        Contains?: QueryContainsExpression;
        StartsWith?: QueryStartsWithExpression;
        Exists?: QueryExistsExpression;
        Boolean?: QueryBooleanExpression;
        DateTime?: QueryDateTimeExpression;
        DateTimeSecond?: QueryDateTimeSecondExpression;
        Date?: QueryDateTimeExpression;
        Decimal?: QueryDecimalExpression;
        Integer?: QueryIntegerExpression;
        Null?: QueryNullExpression;
        Number?: QueryNumberExpression;
        String?: QueryStringExpression;
        Literal?: QueryLiteralExpression;
        DateSpan?: QueryDateSpanExpression;
        DateAdd?: QueryDateAddExpression;
        Now?: QueryNowExpression;
    }
    interface QueryPropertyExpression {
        Expression: QueryExpressionContainer;
        Property: string;
    }
    interface QueryColumnExpression extends QueryPropertyExpression {
    }
    interface QueryMeasureExpression extends QueryPropertyExpression {
    }
    interface QuerySourceRefExpression {
        Source: string;
    }
    interface QueryAggregationExpression {
        Function: QueryAggregateFunction;
        Expression: QueryExpressionContainer;
    }
    interface QueryBinaryExpression {
        Left: QueryExpressionContainer;
        Right: QueryExpressionContainer;
    }
    interface QueryBetweenExpression {
        Expression: QueryExpressionContainer;
        LowerBound: QueryExpressionContainer;
        UpperBound: QueryExpressionContainer;
    }
    interface QueryInExpression {
        Expressions: QueryExpressionContainer[];
        Values: QueryExpressionContainer[][];
    }
    interface QueryComparisonExpression extends QueryBinaryExpression {
        ComparisonKind: QueryComparisonKind;
    }
    interface QueryContainsExpression extends QueryBinaryExpression {
    }
    interface QueryNotExpression {
        Expression: QueryExpressionContainer;
    }
    interface QueryStartsWithExpression extends QueryBinaryExpression {
    }
    interface QueryExistsExpression {
        Expression: QueryExpressionContainer;
    }
    interface QueryConstantExpression<T> {
        Value: T;
    }
    interface QueryLiteralExpression {
        Value: string;
    }
    interface QueryBooleanExpression extends QueryConstantExpression<boolean> {
    }
    interface QueryDateTimeExpression extends QueryConstantExpression<string> {
    }
    interface QueryDateTimeSecondExpression extends QueryConstantExpression<string> {
    }
    interface QueryDecimalExpression extends QueryConstantExpression<number> {
    }
    interface QueryIntegerExpression extends QueryConstantExpression<number> {
    }
    interface QueryNumberExpression extends QueryConstantExpression<string> {
    }
    interface QueryNullExpression {
    }
    interface QueryStringExpression extends QueryConstantExpression<string> {
    }
    interface QueryDateSpanExpression {
        TimeUnit: TimeUnit;
        Expression: QueryExpressionContainer;
    }
    interface QueryDateAddExpression {
        Amount: number;
        TimeUnit: TimeUnit;
        Expression: QueryExpressionContainer;
    }
    interface QueryNowExpression {
    }
    enum TimeUnit {
        Day = 0,
        Week = 1,
        Month = 2,
        Year = 3,
        Decade = 4,
        Second = 5,
        Minute = 6,
        Hour = 7,
    }
    enum QueryAggregateFunction {
        Sum = 0,
        Avg = 1,
        Count = 2,
        Min = 3,
        Max = 4,
        CountNonNull = 5,
        Median = 6,
        StandardDeviation = 7,
        Variance = 8,
    }
    enum QuerySortDirection {
        Ascending = 1,
        Descending = 2,
    }
    enum QueryComparisonKind {
        Equal = 0,
        GreaterThan = 1,
        GreaterThanOrEqual = 2,
        LessThan = 3,
        LessThanOrEqual = 4,
    }
    interface SemanticQueryDataShapeCommand {
        Query: QueryDefinition;
        Binding: DataShapeBinding;
    }
    /** Defines semantic data types. */
    enum SemanticType {
        None = 0,
        Number = 1,
        Integer = 3,
        DateTime = 4,
        Time = 8,
        Date = 20,
        Month = 35,
        Year = 67,
        YearAndMonth = 128,
        MonthAndDay = 256,
        Decade = 515,
        YearAndWeek = 1024,
        String = 2048,
        Boolean = 4096,
        Table = 8192,
        Range = 16384,
    }
    enum SelectKind {
        None = 0,
        Group = 1,
        Measure = 2,
    }
    interface AuxiliarySelectBinding {
        Value?: string;
    }
    interface QueryMetadata {
        Select?: SelectMetadata[];
        Filters?: FilterMetadata[];
    }
    interface SelectMetadata {
        Restatement: string;
        Type?: number;
        Format?: string;
        DataCategory?: ConceptualDataCategory;
        /** The select projection name. */
        Name?: string;
    }
    interface FilterMetadata {
        Restatement: string;
        Kind?: FilterKind;
    }
    enum FilterKind {
        Default = 0,
        Period = 1,
    }
}
declare module powerbi.data {
    /** Represents a projection from a query result. */
    interface QueryProjection {
        /** Name of item in the semantic query Select clause. */
        queryRef: string;
        /** Optional format string. */
        format?: string;
    }
    /** A set of QueryProjections, grouped by visualization property, and ordered within that property. */
    interface QueryProjectionsByRole {
        [roleName: string]: QueryProjectionCollection;
    }
    class QueryProjectionCollection {
        private items;
        private _activeProjectionRef;
        constructor(items: QueryProjection[], activeProjectionRef?: string);
        /** Returns all projections in a mutable array. */
        all(): QueryProjection[];
        activeProjectionQueryRef: string;
        clone(): QueryProjectionCollection;
    }
    module QueryProjectionsByRole {
        /** Clones the QueryProjectionsByRole. */
        function clone(roles: QueryProjectionsByRole): QueryProjectionsByRole;
        /** Returns the QueryProjectionCollection for that role.  Even returns empty collections so that 'drillable' and 'activeProjection' fields are preserved. */
        function getRole(roles: QueryProjectionsByRole, name: string): QueryProjectionCollection;
    }
}
declare module powerbi {
    interface VisualElement {
        DataRoles?: DataRole[];
        Settings?: VisualElementSettings;
    }
    /** Defines common settings for a visual element. */
    interface VisualElementSettings {
        DisplayUnitSystemType?: DisplayUnitSystemType;
    }
    interface DataRole {
        Name: string;
        Projection: number;
    }
    /** The system used to determine display units used during formatting */
    enum DisplayUnitSystemType {
        /** Default display unit system, which saves space by using units such as K, M, bn with PowerView rules for when to pick a unit. Suitable for chart axes. */
        Default = 0,
        /** A verbose display unit system that will only respect the formatting defined in the model. Suitable for explore mode single-value cards. */
        Verbose = 1,
        /**
         * A display unit system that uses units such as K, M, bn if we have at least one of those units (e.g. 0.9M is not valid as it's less than 1 million).
         * Suitable for dashboard tile cards
         */
        WholeUnits = 2,
        /**A display unit system that also contains Auto and None units for data labels*/
        DataLabels = 3,
    }
}
declare module powerbi.data.contracts {
    interface DataViewSource {
        data: any;
        type?: string;
    }
}
declare module powerbi {
    interface IColorAllocator {
        /** Computes the color corresponding to the provided value. */
        color(value: number): string;
    }
    interface IColorAllocatorFactory {
        /** Creates a gradient that that transitions between two colors. */
        linearGradient2(options: LinearGradient2): IColorAllocator;
        /** Creates a gradient that that transitions between three colors. */
        linearGradient3(options: LinearGradient3, splitScales: boolean): IColorAllocator;
    }
}
declare module powerbi.data {
    interface CompiledDataViewMapping {
        metadata: CompiledDataViewMappingMetadata;
        categorical?: CompiledDataViewCategoricalMapping;
        table?: CompiledDataViewTableMapping;
        single?: CompiledDataViewSingleMapping;
        tree?: CompiledDataViewTreeMapping;
        matrix?: CompiledDataViewMatrixMapping;
    }
    interface CompiledDataViewMappingMetadata {
        /** The metadata repetition objects. */
        objects?: DataViewObjects;
    }
    interface CompiledDataViewCategoricalMapping extends HasDataVolume {
        categories?: CompiledDataViewRoleMappingWithReduction;
        values?: CompiledDataViewRoleMapping | CompiledDataViewGroupedRoleMapping | CompiledDataViewListRoleMapping;
        includeEmptyGroups?: boolean;
    }
    interface CompiledDataViewGroupingRoleMapping {
        role: CompiledDataViewRole;
    }
    interface CompiledDataViewSingleMapping {
        role: CompiledDataViewRole;
    }
    interface CompiledDataViewValuesRoleMapping {
        roles: CompiledDataViewRole[];
    }
    interface CompiledDataViewTableMapping extends HasDataVolume {
        rows: CompiledDataViewRoleMappingWithReduction | CompiledDataViewListRoleMappingWithReduction;
    }
    interface CompiledDataViewTreeMapping {
        nodes?: CompiledDataViewGroupingRoleMapping;
        values?: CompiledDataViewValuesRoleMapping;
    }
    interface CompiledDataViewMatrixMapping extends HasDataVolume {
        rows?: CompiledDataViewRoleForMappingWithReduction;
        columns?: CompiledDataViewRoleForMappingWithReduction;
        values?: CompiledDataViewRoleForMapping;
    }
    type CompiledDataViewRoleMapping = CompiledDataViewRoleBindMapping | CompiledDataViewRoleForMapping;
    interface CompiledDataViewRoleBindMapping {
        bind: {
            to: CompiledDataViewRole;
        };
    }
    interface CompiledDataViewRoleForMapping {
        for: {
            in: CompiledDataViewRole;
        };
    }
    type CompiledDataViewRoleMappingWithReduction = CompiledDataViewRoleBindMappingWithReduction | CompiledDataViewRoleForMappingWithReduction;
    interface CompiledDataViewRoleBindMappingWithReduction extends CompiledDataViewRoleBindMapping, HasReductionAlgorithm {
    }
    interface CompiledDataViewRoleForMappingWithReduction extends CompiledDataViewRoleForMapping, HasReductionAlgorithm {
    }
    interface CompiledDataViewGroupedRoleMapping {
        group: {
            by: CompiledDataViewRole;
            select: CompiledDataViewRoleMapping[];
            dataReductionAlgorithm?: ReductionAlgorithm;
        };
    }
    interface CompiledDataViewListRoleMapping {
        select: CompiledDataViewRoleMapping[];
    }
    interface CompiledDataViewListRoleMappingWithReduction extends CompiledDataViewListRoleMapping, HasReductionAlgorithm {
    }
    enum CompiledSubtotalType {
        None = 0,
        Before = 1,
        After = 2,
    }
    interface CompiledDataViewRole {
        role: string;
        items: CompiledDataViewRoleItem[];
        subtotalType?: CompiledSubtotalType;
    }
    interface CompiledDataViewRoleItem {
        type?: ValueType;
    }
}
declare module powerbi.data {
    /** Defines the values for particular objects. */
    interface DataViewObjectDefinitions {
        [objectName: string]: DataViewObjectDefinition[];
    }
    interface DataViewObjectDefinition {
        selector?: Selector;
        properties: DataViewObjectPropertyDefinitions;
    }
    interface DataViewObjectPropertyDefinitions {
        [name: string]: DataViewObjectPropertyDefinition;
    }
    type DataViewObjectPropertyDefinition = SQExpr | StructuralObjectDefinition;
    module DataViewObjectDefinitions {
        /** Creates or reuses a DataViewObjectDefinition for matching the given objectName and selector within the defns. */
        function ensure(defns: DataViewObjectDefinitions, objectName: string, selector: Selector): DataViewObjectDefinition;
        function deleteProperty(defns: DataViewObjectDefinitions, objectName: string, selector: Selector, propertyName: string): void;
        function getValue(defns: DataViewObjectDefinitions, propertyId: DataViewObjectPropertyIdentifier, selector: Selector): DataViewObjectPropertyDefinition;
        function getPropertyContainer(defns: DataViewObjectDefinitions, propertyId: DataViewObjectPropertyIdentifier, selector: Selector): DataViewObjectPropertyDefinitions;
        function propertiesAreEqual(currentObject: DataViewObjectPropertyDefinitions, modifiedObject: DataViewObjectPropertyDefinitions): boolean;
    }
}
declare module powerbi.data {
    interface DataViewObjectDescriptors {
        /** Defines general properties for a visualization. */
        general?: DataViewObjectDescriptor;
        [objectName: string]: DataViewObjectDescriptor;
    }
    /** Defines a logical object in a visualization. */
    interface DataViewObjectDescriptor {
        displayName?: DisplayNameGetter;
        properties: DataViewObjectPropertyDescriptors;
    }
    interface DataViewObjectPropertyDescriptors {
        [propertyName: string]: DataViewObjectPropertyDescriptor;
    }
    /** Defines a property of a DataViewObjectDefinition. */
    interface DataViewObjectPropertyDescriptor {
        displayName?: DisplayNameGetter;
        description?: DisplayNameGetter;
        type: DataViewObjectPropertyTypeDescriptor;
        rule?: DataViewObjectPropertyRuleDescriptor;
    }
    type DataViewObjectPropertyTypeDescriptor = ValueTypeDescriptor | StructuralTypeDescriptor;
    interface DataViewObjectPropertyRuleDescriptor {
        /** For rule typed properties, defines the input visual role name. */
        inputRole?: string;
        /** Defines the output for rule-typed properties. */
        output?: DataViewObjectPropertyRuleOutputDescriptor;
    }
    interface DataViewObjectPropertyRuleOutputDescriptor {
        /** Name of the target property for rule output. */
        property: string;
        /** Names roles that define the selector for the output properties. */
        selector: string[];
    }
    module DataViewObjectDescriptors {
        /** Attempts to find the format string property.  This can be useful for upgrade and conversion. */
        function findFormatString(descriptors: DataViewObjectDescriptors): DataViewObjectPropertyIdentifier;
        /** Attempts to find the filter property.  This can be useful for propagating filters from one visual to others. */
        function findFilterOutput(descriptors: DataViewObjectDescriptors): DataViewObjectPropertyIdentifier;
    }
}
declare module powerbi.data {
    interface DataViewObjectDefinitionsByRepetition {
        metadataOnce?: DataViewObjectDefinitionsForSelector;
        userDefined?: DataViewObjectDefinitionsForSelector[];
        metadata?: DataViewObjectDefinitionsForSelector[];
        data: DataViewObjectDefinitionsForSelectorWithRule[];
    }
    interface DataViewObjectDefinitionsForSelector {
        selector?: Selector;
        objects: DataViewNamedObjectDefinition[];
    }
    interface DataViewObjectDefinitionsForSelectorWithRule extends DataViewObjectDefinitionsForSelector {
        rules?: RuleEvaluation[];
    }
    interface DataViewNamedObjectDefinition {
        name: string;
        properties: DataViewObjectPropertyDefinitions;
    }
    module DataViewObjectEvaluationUtils {
        function evaluateDataViewObjects(objectDescriptors: DataViewObjectDescriptors, objectDefns: DataViewNamedObjectDefinition[]): DataViewObjects;
        function groupObjectsBySelector(objectDefinitions: DataViewObjectDefinitions): DataViewObjectDefinitionsByRepetition;
        /** Registers properties for default format strings, if the properties are not explicitly provided. */
        function addDefaultFormatString(objectsForAllSelectors: DataViewObjectDefinitionsByRepetition, objectDescriptors: DataViewObjectDescriptors, columns: DataViewMetadataColumn[], selectTransforms: DataViewSelectTransform[]): void;
    }
}
declare module powerbi.data {
    /** Responsible for evaluating object property expressions to be applied at various scopes in a DataView. */
    module DataViewObjectEvaluator {
        function run(objectDescriptor: DataViewObjectDescriptor, propertyDefinitions: DataViewObjectPropertyDefinitions): DataViewObject;
        /** Note: Exported for testability */
        function evaluateProperty(propertyDescriptor: DataViewObjectPropertyDescriptor, propertyDefinition: DataViewObjectPropertyDefinition): any;
    }
}
declare module powerbi {
    /** Represents evaluated, named, custom objects in a DataView. */
    interface DataViewObjects {
        [name: string]: DataViewObject | DataViewObjectMap;
    }
    /** Represents an object (name-value pairs) in a DataView. */
    interface DataViewObject {
        [propertyName: string]: DataViewPropertyValue;
    }
    type DataViewPropertyValue = PrimitiveValue | StructuralObjectValue;
    interface DataViewObjectMap {
        [id: string]: DataViewObject;
    }
    interface DataViewObjectPropertyIdentifier {
        objectName: string;
        propertyName: string;
    }
    module DataViewObjects {
        /** Gets the value of the given object/property pair. */
        function getValue<T>(objects: DataViewObjects, propertyId: DataViewObjectPropertyIdentifier, defaultValue?: T): T;
        /** Gets an object from objects. */
        function getObject(objects: DataViewObjects, objectName: string, defaultValue?: DataViewObject): DataViewObject;
        /** Gets the solid color from a fill property. */
        function getFillColor(objects: DataViewObjects, propertyId: DataViewObjectPropertyIdentifier, defaultColor?: string): string;
    }
    module DataViewObject {
        function getValue<T>(object: DataViewObject, propertyName: string, defaultValue?: T): T;
    }
}
declare module powerbi.data {
    module DataViewPivotCategorical {
        /**
         * Pivots categories in a categorical DataView into valueGroupings.
         * This is akin to a mathematical matrix transpose.
         */
        function apply(dataView: DataView): DataView;
    }
}
declare module powerbi.data {
    module DataViewPivotMatrix {
        /** Pivots row hierarchy members in a matrix DataView into column hierarchy. */
        function apply(dataViewMatrix: DataViewMatrix, context: MatrixTransformationContext): void;
        function cloneTree(node: DataViewMatrixNode): DataViewMatrixNode;
        function cloneTreeExecuteOnLeaf(node: DataViewMatrixNode, callback?: (node: DataViewMatrixNode) => void): DataViewMatrixNode;
    }
}
declare module powerbi.data {
    module DataViewSelfCrossJoin {
        /**
         * Returns a new DataView based on the original, with a single DataViewCategorical category that is "cross joined"
         * to itself as a value grouping.
         * This is the mathematical equivalent of taking an array and turning it into an identity matrix.
         */
        function apply(dataView: DataView): DataView;
    }
}
declare module powerbi.data {
    /** Represents a data reader. */
    interface IDataReader {
        /** Executes a query, with a promise of completion.  The response object should be compatible with the transform implementation. */
        execute?(options: DataReaderExecutionOptions): RejectablePromise2<DataReaderData, IClientError>;
        /** Transforms the given data into a DataView.  When this function is not specified, the data is put on a property on the DataView. */
        transform?(obj: DataReaderData): DataReaderTransformResult;
        /** Stops all future communication and reject and pending communication  */
        stopCommunication?(): void;
        /** Resumes communication which enables future requests */
        resumeCommunication?(): void;
        /** Clear cache */
        clearCache?(): void;
        /** rewriteCacheEntries */
        rewriteCacheEntries?(rewriter: DataReaderCacheRewriter): void;
    }
    interface DataReaderTransformResult {
        dataView?: DataView;
        restartToken?: RestartToken;
        error?: IClientError;
        warning?: IClientWarning;
    }
    interface RestartToken {
    }
    /** Represents a custom data reader plugin, to be registered in the powerbi.data.plugins object. */
    interface IDataReaderPlugin {
        /** The name of this plugin. */
        name: string;
        /** Factory method for the IDataReader. */
        create(hostServices: IDataReaderHostServices): IDataReader;
    }
    /** Represents a query command defined by an IDataReader. */
    interface DataReaderCommand {
    }
    /** Represents a data source defined by an IDataReader. */
    interface DataReaderDataSource {
    }
    /** Represents arbitrary data defined by an IDataReader. */
    interface DataReaderData {
    }
    /** Represents cacheRewriter that will rewrite the cache of reader as defined by an IDataReader. */
    interface DataReaderCacheRewriter {
    }
    interface DataReaderExecutionOptions {
        dataSource?: DataReaderDataSource;
        command: DataReaderCommand;
        allowCache?: boolean;
        cacheResponseOnServer?: boolean;
    }
    interface IDataReaderHostServices {
        promiseFactory(): IPromiseFactory;
    }
}
declare module powerbi {
    /** Enumeration of DateTimeUnits */
    enum DateTimeUnit {
        Year = 0,
        Month = 1,
        Week = 2,
        Day = 3,
        Hour = 4,
        Minute = 5,
        Second = 6,
        Millisecond = 7,
    }
    interface IFormattingService {
        /**
         * Formats the value using provided format expression and culture
         * @param value - value to be formatted and converted to string.
         * @param format - format to be applied. If undefined or empty then generic format is used.
         */
        formatValue(value: any, format?: string): string;
        /**
         * Replaces the indexed format tokens (for example {0:c2}) in the format string with the localized formatted arguments.
         * @param formatWithIndexedTokens - format string with a set of indexed format tokens.
         * @param args - array of values which should replace the tokens in the format string.
         * @param culture - localization culture. If undefined then the current culture is used.
         */
        format(formatWithIndexedTokens: string, args: any[], culture?: string): string;
        /** Gets a value indicating whether the specified format a standard numeric format specifier. */
        isStandardNumberFormat(format: string): boolean;
        /** Performs a custom format with a value override.  Typically used for custom formats showing scaled values. */
        formatNumberWithCustomOverride(value: number, format: string, nonScientificOverrideFormat: string): string;
        /** Gets the format string to use for dates in particular units. */
        dateFormatString(unit: DateTimeUnit): string;
    }
}
declare module powerbi {
    /** Represents views of a data set. */
    interface DataView {
        metadata: DataViewMetadata;
        categorical?: DataViewCategorical;
        single?: DataViewSingle;
        tree?: DataViewTree;
        table?: DataViewTable;
        matrix?: DataViewMatrix;
    }
    interface DataViewMetadata {
        columns: DataViewMetadataColumn[];
        /** The metadata repetition objects. */
        objects?: DataViewObjects;
        /** When defined, describes whether the DataView contains just a segment of the complete data set. */
        segment?: DataViewSegmentMetadata;
    }
    interface DataViewMetadataColumn {
        /** The user-facing display name of the column. */
        displayName: string;
        /** The query name the source column in the query. */
        queryName?: string;
        /** The format string of the column. */
        format?: string;
        /** Data type information for the column. */
        type?: ValueType;
        /** Indicates that this column is a measure (aggregate) value. */
        isMeasure?: boolean;
        /** The position of the column in the select statement. */
        index?: number;
        /** The properties that this column provides to the visualization. */
        roles?: {
            [name: string]: boolean;
        };
        /** The metadata repetition objects. */
        objects?: DataViewObjects;
        /** The name of the containing group. */
        groupName?: string;
    }
    interface DataViewSegmentMetadata {
    }
    interface DataViewCategorical {
        categories?: DataViewCategoryColumn[];
        values?: DataViewValueColumns;
    }
    interface DataViewCategoricalColumn {
        source: DataViewMetadataColumn;
        values: any[];
        /** The data repetition objects. */
        objects?: DataViewObjects[];
    }
    interface DataViewValueColumns extends Array<DataViewValueColumn> {
        /** Returns an array that groups the columns in this group together. */
        grouped(): DataViewValueColumnGroup[];
        /** The set of expressions that define the identity for instances of the value group.  This must match items in the DataViewScopeIdentity in the grouped items result. */
        identityFields?: data.SQExpr[];
        source?: DataViewMetadataColumn;
    }
    interface DataViewValueColumnGroup {
        values: DataViewValueColumn[];
        identity?: DataViewScopeIdentity;
        /** The data repetition objects. */
        objects?: DataViewObjects;
        name?: string;
    }
    interface DataViewValueColumn extends DataViewCategoricalColumn {
        subtotal?: any;
        max?: any;
        min?: any;
        highlights?: any[];
        identity?: DataViewScopeIdentity;
        /** Client-computed maximum value for a column. */
        maxLocal?: any;
        /** Client-computed maximum value for a column. */
        minLocal?: any;
    }
    interface DataViewCategoryColumn extends DataViewCategoricalColumn {
        identity?: DataViewScopeIdentity[];
        /** The set of expressions that define the identity for instances of the category.  This must match items in the DataViewScopeIdentity in the identity. */
        identityFields?: data.SQExpr[];
    }
    interface DataViewSingle {
        value: any;
    }
    interface DataViewTree {
        root: DataViewTreeNode;
    }
    interface DataViewTreeNode {
        name?: string;
        value?: any;
        values?: {
            [id: number]: DataViewTreeNodeValue;
        };
        children?: DataViewTreeNode[];
        identity?: DataViewScopeIdentity;
        /** The set of expressions that define the identity for the child nodes.  This must match items in the DataViewScopeIdentity of those nodes. */
        childIdentityFields?: data.SQExpr[];
    }
    interface DataViewTreeNodeValue {
        value?: any;
    }
    interface DataViewTreeNodeMeasureValue extends DataViewTreeNodeValue {
        subtotal?: any;
        max?: any;
        min?: any;
        highlight?: any;
        /** Client-computed maximum value for a column. */
        maxLocal?: any;
        /** Client-computed maximum value for a column. */
        minLocal?: any;
    }
    interface DataViewTreeNodeGroupValue extends DataViewTreeNodeValue {
        count?: any;
    }
    interface DataViewTable {
        columns: DataViewMetadataColumn[];
        identity?: DataViewScopeIdentity[];
        rows?: any[][];
        totals?: any[];
    }
    interface DataViewTableRow {
        values: any[];
        /** The metadata repetition objects. */
        objects?: DataViewObjects[];
    }
    interface DataViewMatrix {
        rows: DataViewHierarchy;
        columns: DataViewHierarchy;
        valueSources: DataViewMetadataColumn[];
    }
    interface DataViewMatrixNode extends DataViewTreeNode {
        /** Indicates the level this node is on. Zero indicates the outermost children (root node level is undefined). */
        level?: number;
        /** Indicates the source metadata index on the node's level. Its value is 0 if omitted. */
        levelSourceIndex?: number;
        /** Indicates whether or not the node is a subtotal node. Its value is false if omitted. */
        isSubtotal?: boolean;
    }
    interface DataViewMatrixNodeValue extends DataViewTreeNodeValue {
        /** Indicates the index of the corresponding measure (held by DataViewMatrix.valueSources). Its value is 0 if omitted. */
        valueSourceIndex?: number;
    }
    interface DataViewHierarchy {
        root: DataViewMatrixNode;
        levels: DataViewHierarchyLevel[];
    }
    interface DataViewHierarchyLevel {
        sources: DataViewMetadataColumn[];
    }
}
declare module powerbi {
    module DataViewAnalysis {
        import QueryProjectionByProperty = powerbi.data.QueryProjectionsByRole;
        interface ValidateAndReshapeResult {
            dataView?: DataView;
            isValid: boolean;
        }
        /** Reshapes the data view to match the provided schema if possible. If not, returns null */
        function validateAndReshape(dataView: DataView, dataViewMappings: DataViewMapping[]): ValidateAndReshapeResult;
        function countGroups(columns: DataViewMetadataColumn[]): number;
        function countMeasures(columns: DataViewMetadataColumn[]): number;
        /** Indicates whether the dataView conforms to the specified schema. */
        function supports(dataView: DataView, roleMapping: DataViewMapping, usePreferredDataViewSchema?: boolean): boolean;
        function conforms(value: number, range: NumberRange, ignoreMin?: boolean): boolean;
        /** Determines the appropriate DataViewMappings for the projections. */
        function chooseDataViewMappings(projections: QueryProjectionByProperty, mappings: DataViewMapping[]): DataViewMapping[];
        function getPropertyCount(roleName: string, projections: QueryProjectionByProperty, useActiveIfAvailable?: boolean): number;
        function hasSameCategoryIdentity(dataView1: DataView, dataView2: DataView): boolean;
        function areMetadataColumnsEquivalent(column1: DataViewMetadataColumn, column2: DataViewMetadataColumn): boolean;
        function isMetadataEquivalent(metadata1: DataViewMetadata, metadata2: DataViewMetadata): boolean;
    }
}
declare module powerbi {
    interface DataViewMapping {
        /**
         * Defines set of conditions, at least one of which must be satisfied for this mapping to be used.
         * Any roles not specified in the condition accept any number of items.
         */
        conditions?: DataViewMappingCondition[];
        categorical?: DataViewCategoricalMapping;
        table?: DataViewTableMapping;
        single?: DataViewSingleMapping;
        tree?: DataViewTreeMapping;
        matrix?: DataViewMatrixMapping;
    }
    /** Describes whether a particular mapping is fits the set of projections. */
    interface DataViewMappingCondition {
        [dataRole: string]: NumberRange;
    }
    /** Describes a mapping which supports a data volume level. */
    interface HasDataVolume {
        dataVolume?: number;
    }
    interface DataViewCategoricalMapping extends HasDataVolume {
        categories?: DataViewRoleMappingWithReduction;
        values?: DataViewRoleMapping | DataViewGroupedRoleMapping | DataViewListRoleMapping;
        /** Specifies a constraint on the number of data rows supported by the visual. */
        rowCount?: AcceptabilityNumberRange;
        /** Indicates whether the data rows include empty groups  */
        includeEmptyGroups?: boolean;
    }
    interface DataViewGroupingRoleMapping {
        /** Indicates the role which is bound to this structure. */
        role: string;
    }
    interface DataViewSingleMapping {
        /** Indicates the role which is bound to this structure. */
        role: string;
    }
    interface DataViewValuesRoleMapping {
        /** Indicates the sequence of roles which are bound to this structure. */
        roles: string[];
    }
    interface DataViewTableMapping extends HasDataVolume {
        rows: DataViewRoleMappingWithReduction | DataViewListRoleMappingWithReduction;
        /** Specifies a constraint on the number of data rows supported by the visual. */
        rowCount?: AcceptabilityNumberRange;
    }
    interface DataViewTreeMapping {
        nodes?: DataViewGroupingRoleMapping;
        values?: DataViewValuesRoleMapping;
        /** Specifies a constraint on the depth of the tree supported by the visual. */
        depth?: AcceptabilityNumberRange;
    }
    interface DataViewMatrixMapping extends HasDataVolume {
        rows?: DataViewRoleForMappingWithReduction;
        columns?: DataViewRoleForMappingWithReduction;
        values?: DataViewRoleForMapping;
    }
    type DataViewRoleMapping = DataViewRoleBindMapping | DataViewRoleForMapping;
    interface DataViewRoleBindMapping {
        /**
         * Indicates evaluation of a single-valued data role.
         * Equivalent to for, without support for multiple items.
         */
        bind: {
            to: string;
        };
    }
    interface DataViewRoleForMapping {
        /** Indicates iteration of the in data role, as an array. */
        for: {
            in: string;
        };
    }
    type DataViewRoleMappingWithReduction = DataViewRoleBindMappingWithReduction | DataViewRoleForMappingWithReduction;
    interface DataViewRoleBindMappingWithReduction extends DataViewRoleBindMapping, HasReductionAlgorithm {
    }
    interface DataViewRoleForMappingWithReduction extends DataViewRoleForMapping, HasReductionAlgorithm {
    }
    interface DataViewGroupedRoleMapping {
        group: {
            by: string;
            select: DataViewRoleMapping[];
            dataReductionAlgorithm?: ReductionAlgorithm;
        };
    }
    interface DataViewListRoleMapping {
        select: DataViewRoleMapping[];
    }
    interface DataViewListRoleMappingWithReduction extends DataViewListRoleMapping, HasReductionAlgorithm {
    }
    interface HasReductionAlgorithm {
        dataReductionAlgorithm?: ReductionAlgorithm;
    }
    /** Describes how to reduce the amount of data exposed to the visual. */
    interface ReductionAlgorithm {
        top?: DataReductionTop;
        bottom?: DataReductionBottom;
        sample?: DataReductionSample;
        window?: DataReductionWindow;
    }
    /** Reduce the data to the Top(count) items. */
    interface DataReductionTop {
        count?: number;
    }
    /** Reduce the data to the Bottom count items. */
    interface DataReductionBottom {
        count?: number;
    }
    /** Reduce the data using a simple Sample of count items. */
    interface DataReductionSample {
        count?: number;
    }
    /** Allow the data to be loaded one window, containing count items, at a time. */
    interface DataReductionWindow {
        count?: number;
    }
    interface AcceptabilityNumberRange {
        /** Specifies a preferred range of values for the constraint. */
        preferred?: NumberRange;
        /** Specifies a supported range of values for the constraint. Defaults to preferred if not specified. */
        supported?: NumberRange;
    }
    /** Defines the acceptable values of a number. */
    interface NumberRange {
        min?: number;
        max?: number;
    }
}
declare module powerbi {
    /** Encapsulates the identity of a data scope in a DataView. */
    interface DataViewScopeIdentity {
        /** Predicate expression that identifies the scope. */
        expr: data.SQExpr;
        /** Key string that identifies the DataViewScopeIdentity to a string, which can be used for equality comparison. */
        key: string;
    }
    module DataViewScopeIdentity {
        /** Compares the two DataViewScopeIdentity values for equality. */
        function equals(x: DataViewScopeIdentity, y: DataViewScopeIdentity, ignoreCase?: boolean): boolean;
        function filterFromIdentity(identities: DataViewScopeIdentity[], isNot?: boolean): data.SemanticFilter;
    }
    module data {
        function createDataViewScopeIdentity(expr: SQExpr): DataViewScopeIdentity;
    }
}
declare module powerbi.data {
    /** Defines a match against all instances of a given DataView scope. */
    interface DataViewScopeWildcard {
        exprs: SQExpr[];
        key: string;
    }
    module DataViewScopeWildcard {
        function matches(wildcard: DataViewScopeWildcard, instance: DataViewScopeIdentity): boolean;
        function fromExprs(exprs: SQExpr[]): DataViewScopeWildcard;
    }
}
declare module powerbi.data {
    import INumberDictionary = jsCommon.INumberDictionary;
    interface DataViewTransformApplyOptions {
        prototype: DataView;
        objectDescriptors: DataViewObjectDescriptors;
        dataViewMappings?: DataViewMapping[];
        transforms: DataViewTransformActions;
        colorAllocatorFactory: IColorAllocatorFactory;
    }
    /** Describes the Transform actions to be done to a prototype DataView. */
    interface DataViewTransformActions {
        /** Describes transform metadata for each semantic query select item, as the arrays align, by index. */
        selects?: DataViewSelectTransform[];
        /** Describes the DataViewObject definitions. */
        objects?: DataViewObjectDefinitions;
        /** Describes the splitting of a single input DataView into multiple DataViews. */
        splits?: DataViewSplitTransform[];
        /** Describes the order of selects (referenced by query index) in each role. */
        projectionOrdering?: DataViewProjectionOrdering;
    }
    interface DataViewSelectTransform {
        displayName?: string;
        queryName?: string;
        format?: string;
        type?: ValueType;
        roles?: {
            [roleName: string]: boolean;
        };
    }
    interface DataViewSplitTransform {
        selects: INumberDictionary<boolean>;
    }
    interface DataViewProjectionOrdering {
        [roleName: string]: number[];
    }
    interface MatrixTransformationContext {
        rowHierarchyRewritten: boolean;
        columnHierarchyRewritten: boolean;
        hierarchyTreesRewritten: boolean;
    }
    module DataViewTransform {
        function apply(options: DataViewTransformApplyOptions): DataView[];
        /**
         *
         *
         * Note: Exported for testability
         */
        function upgradeSettingsToObjects(settings: VisualElementSettings, objectDefns?: DataViewObjectDefinitions): DataViewObjectDefinitions;
        function createTransformActions(queryMetadata: QueryMetadata, visualElements: VisualElement[], objectDescs: DataViewObjectDescriptors, objectDefns: DataViewObjectDefinitions): DataViewTransformActions;
        function createValueColumns(values?: DataViewValueColumn[], valueIdentityFields?: SQExpr[], source?: DataViewMetadataColumn): DataViewValueColumns;
    }
}
declare module powerbi.data {
    class RuleEvaluation {
        scopeId: DataViewScopeIdentity;
        inputRole: string;
        protected value: any;
        constructor(inputRole?: string);
        setContext(scopeId: DataViewScopeIdentity, value: any): void;
        evaluate(): any;
    }
}
declare module powerbi.data {
    class ColorRuleEvaluation extends RuleEvaluation {
        private allocator;
        constructor(inputRole: string, allocator: IColorAllocator);
        evaluate(): any;
    }
}
declare module powerbi.data {
    class FilterRuleEvaluation extends RuleEvaluation {
        private selection;
        constructor(scopeIds: FilterValueScopeIdsContainer);
        evaluate(): any;
    }
}
declare module powerbi.data.segmentation {
    interface DataViewTableSegment extends DataViewTable {
        /**
         * Index of the last item that had a merge flag in the underlying data.
         * We assume merge flags are not random but adjacent to each other.
         */
        lastMergeIndex?: number;
    }
    interface DataViewTreeSegmentNode extends DataViewTreeNode {
        /** Indicates whether the node is a duplicate of a node from a previous segment. */
        isMerge?: boolean;
    }
    interface DataViewCategoricalSegment extends DataViewCategorical {
        /**
         * Index of the last item that had a merge flag in the underlying data.
         * We assume merge flags are not random but adjacent to each other.
         */
        lastMergeIndex?: number;
    }
    interface DataViewMatrixSegmentNode extends DataViewMatrixNode {
        /**
         * Index of the last item that had a merge flag in the underlying data.
         * We assume merge flags are not random but adjacent to each other.
         */
        isMerge?: boolean;
    }
    module DataViewMerger {
        function mergeDataViews(source: DataView, segment: DataView): void;
        /** Note: Public for testability */
        function mergeTables(source: DataViewTable, segment: DataViewTableSegment): void;
        /**
         * Merge categories values and identities
         *
         * Note: Public for testability
         */
        function mergeCategorical(source: DataViewCategorical, segment: DataViewCategoricalSegment): void;
        /** Note: Public for testability */
        function mergeTreeNodes(sourceRoot: DataViewTreeNode, segmentRoot: DataViewTreeNode, allowDifferentStructure: boolean): void;
    }
}
declare module powerbi.data {
    interface FilterValueScopeIdsContainer {
        isNot: boolean;
        scopeIds: DataViewScopeIdentity[];
    }
    module SQExprConverter {
        function asScopeIdsContainer(filter: SemanticFilter, fieldSQExprs: SQExpr[]): FilterValueScopeIdsContainer;
        /** Gets a comparand value from the given DataViewScopeIdentity. */
        function getFirstComparandValue(identity: DataViewScopeIdentity): any;
    }
}
declare module powerbi.data {
    /** Recognizes DataViewScopeIdentity expression trees to extract comparison keys. */
    module ScopeIdentityKeyExtractor {
        function run(expr: SQExpr): SQExpr[];
    }
}
declare module powerbi.data {
    /** Represents a simplified table aggregate/column/column aggregate reference within a SQ. */
    interface SQFieldDef {
        schema: string;
        entity: string;
        column?: string;
        measure?: string;
        aggregate?: data.QueryAggregateFunction;
        entityVar?: string;
    }
    module SQExprConverter {
        function asSQFieldDef(sqExpr: SQExpr): SQFieldDef;
    }
    module SQExprBuilder {
        function fieldDef(fieldDef: SQFieldDef): SQExpr;
    }
}
declare module powerbi.data {
    module PrimitiveValueEncoding {
        function decimal(value: number): string;
        function double(value: number): string;
        function integer(value: number): string;
        function dateTime(value: Date): string;
        function text(value: string): string;
        function nullEncoding(): string;
        function boolean(value: boolean): string;
    }
}
declare module powerbi.data {
    /** Rewrites an expression tree, including all descendant nodes. */
    class SQExprRewriter implements ISQExprVisitor<SQExpr> {
        visitColumnRef(expr: SQColumnRefExpr): SQExpr;
        visitMeasureRef(expr: SQMeasureRefExpr): SQExpr;
        visitAggr(expr: SQAggregationExpr): SQExpr;
        visitEntity(expr: SQEntityExpr): SQExpr;
        visitAnd(orig: SQAndExpr): SQExpr;
        visitBetween(orig: SQBetweenExpr): SQExpr;
        visitIn(orig: SQInExpr): SQExpr;
        private rewriteAll(origExprs);
        visitOr(orig: SQOrExpr): SQExpr;
        visitCompare(orig: SQCompareExpr): SQExpr;
        visitContains(orig: SQContainsExpr): SQExpr;
        visitExists(orig: SQExistsExpr): SQExpr;
        visitNot(orig: SQNotExpr): SQExpr;
        visitStartsWith(orig: SQStartsWithExpr): SQExpr;
        visitConstant(expr: SQConstantExpr): SQExpr;
        visitDateSpan(orig: SQDateSpanExpr): SQExpr;
        visitDateAdd(orig: SQDateAddExpr): SQExpr;
        visitNow(orig: SQNowExpr): SQExpr;
    }
}
declare module powerbi.data {
    /** Represents an immutable expression within a SemanticQuery. */
    class SQExpr {
        constructor();
        static equals(x: SQExpr, y: SQExpr, ignoreCase?: boolean): boolean;
        validate(schema: FederatedConceptualSchema, errors?: SQExprValidationError[]): SQExprValidationError[];
        accept<T, TArg>(visitor: ISQExprVisitorWithArg<T, TArg>, arg?: TArg): T;
        getMetadata(federatedSchema: FederatedConceptualSchema): SQExprMetadata;
        getDefaultAggregate(federatedSchema: FederatedConceptualSchema, forceAggregation?: boolean): QueryAggregateFunction;
        /** Return the SQExpr[] of group on columns if it has group on keys otherwise return the SQExpr of the column.*/
        getKeyColumns(schema: FederatedConceptualSchema): SQExpr[];
        /** Returns a value indicating whether the expression would group on keys other than itself.*/
        hasGroupOnKeys(schema: FederatedConceptualSchema): boolean;
        private getPropertyKeys(schema);
        private getConceptualProperty(federatedSchema);
        private getMetadataForProperty(field, federatedSchema);
        private static getMetadataForEntity(field, federatedSchema);
    }
    interface SQExprMetadata {
        kind: FieldKind;
        type: ValueType;
        format?: string;
        idOnEntityKey?: boolean;
        aggregate?: QueryAggregateFunction;
        defaultAggregate?: ConceptualDefaultAggregate;
    }
    const enum FieldKind {
        /** Indicates the field references a column, which evaluates to a distinct set of values (e.g., Year, Name, SalesQuantity, etc.). */
        Column = 0,
        /** Indicates the field references a measure, which evaluates to a single value (e.g., SalesYTD, Sum(Sales), etc.). */
        Measure = 1,
    }
    /** Note: Exported for testability */
    function defaultAggregateForDataType(type: ValueType): QueryAggregateFunction;
    /** Note: Exported for testability */
    function defaultAggregateToQueryAggregateFunction(aggregate: ConceptualDefaultAggregate): QueryAggregateFunction;
    class SQEntityExpr extends SQExpr {
        schema: string;
        entity: string;
        variable: string;
        constructor(schema: string, entity: string, variable?: string);
        accept<T, TArg>(visitor: ISQExprVisitorWithArg<T, TArg>, arg?: TArg): T;
    }
    class SQPropRefExpr extends SQExpr {
        ref: string;
        source: SQExpr;
        constructor(source: SQExpr, ref: string);
    }
    class SQColumnRefExpr extends SQPropRefExpr {
        constructor(source: SQExpr, ref: string);
        accept<T, TArg>(visitor: ISQExprVisitorWithArg<T, TArg>, arg?: TArg): T;
    }
    class SQMeasureRefExpr extends SQPropRefExpr {
        constructor(source: SQExpr, ref: string);
        accept<T, TArg>(visitor: ISQExprVisitorWithArg<T, TArg>, arg?: TArg): T;
    }
    class SQAggregationExpr extends SQExpr {
        arg: SQExpr;
        func: QueryAggregateFunction;
        constructor(arg: SQExpr, func: QueryAggregateFunction);
        accept<T, TArg>(visitor: ISQExprVisitorWithArg<T, TArg>, arg?: TArg): T;
    }
    class SQAndExpr extends SQExpr {
        left: SQExpr;
        right: SQExpr;
        constructor(left: SQExpr, right: SQExpr);
        accept<T, TArg>(visitor: ISQExprVisitorWithArg<T, TArg>, arg?: TArg): T;
    }
    class SQBetweenExpr extends SQExpr {
        arg: SQExpr;
        lower: SQExpr;
        upper: SQExpr;
        constructor(arg: SQExpr, lower: SQExpr, upper: SQExpr);
        accept<T, TArg>(visitor: ISQExprVisitorWithArg<T, TArg>, arg?: TArg): T;
    }
    class SQInExpr extends SQExpr {
        args: SQExpr[];
        values: SQExpr[][];
        constructor(args: SQExpr[], values: SQExpr[][]);
        accept<T, TArg>(visitor: ISQExprVisitorWithArg<T, TArg>, arg?: TArg): T;
    }
    class SQOrExpr extends SQExpr {
        left: SQExpr;
        right: SQExpr;
        constructor(left: SQExpr, right: SQExpr);
        accept<T, TArg>(visitor: ISQExprVisitorWithArg<T, TArg>, arg?: TArg): T;
    }
    class SQCompareExpr extends SQExpr {
        kind: QueryComparisonKind;
        left: SQExpr;
        right: SQExpr;
        constructor(kind: QueryComparisonKind, left: SQExpr, right: SQExpr);
        accept<T, TArg>(visitor: ISQExprVisitorWithArg<T, TArg>, arg?: TArg): T;
    }
    class SQContainsExpr extends SQExpr {
        left: SQExpr;
        right: SQExpr;
        constructor(left: SQExpr, right: SQExpr);
        accept<T, TArg>(visitor: ISQExprVisitorWithArg<T, TArg>, arg?: TArg): T;
    }
    class SQStartsWithExpr extends SQExpr {
        left: SQExpr;
        right: SQExpr;
        constructor(left: SQExpr, right: SQExpr);
        accept<T, TArg>(visitor: ISQExprVisitorWithArg<T, TArg>, arg?: TArg): T;
    }
    class SQExistsExpr extends SQExpr {
        arg: SQExpr;
        constructor(arg: SQExpr);
        accept<T, TArg>(visitor: ISQExprVisitorWithArg<T, TArg>, arg?: TArg): T;
    }
    class SQNotExpr extends SQExpr {
        arg: SQExpr;
        constructor(arg: SQExpr);
        accept<T, TArg>(visitor: ISQExprVisitorWithArg<T, TArg>, arg?: TArg): T;
    }
    class SQConstantExpr extends SQExpr {
        type: ValueType;
        /** The native JavaScript representation of the value. */
        value: any;
        /** The string encoded, lossless representation of the value. */
        valueEncoded: string;
        constructor(type: ValueType, value: any, valueEncoded: string);
        accept<T, TArg>(visitor: ISQExprVisitorWithArg<T, TArg>, arg?: TArg): T;
    }
    class SQDateSpanExpr extends SQExpr {
        unit: TimeUnit;
        arg: SQExpr;
        constructor(unit: TimeUnit, arg: SQExpr);
        accept<T, TArg>(visitor: ISQExprVisitorWithArg<T, TArg>, arg?: TArg): T;
    }
    class SQDateAddExpr extends SQExpr {
        unit: TimeUnit;
        amount: number;
        arg: SQExpr;
        constructor(unit: TimeUnit, amount: number, arg: SQExpr);
        accept<T, TArg>(visitor: ISQExprVisitorWithArg<T, TArg>, arg?: TArg): T;
    }
    class SQNowExpr extends SQExpr {
        constructor();
        accept<T, TArg>(visitor: ISQExprVisitorWithArg<T, TArg>, arg?: TArg): T;
    }
    /** Provides utilities for creating & manipulating expressions. */
    module SQExprBuilder {
        function entity(schema: string, entity: string, variable?: string): SQEntityExpr;
        function columnRef(source: SQExpr, prop: string): SQColumnRefExpr;
        function measureRef(source: SQExpr, prop: string): SQMeasureRefExpr;
        function aggregate(source: SQExpr, aggregate: QueryAggregateFunction): SQAggregationExpr;
        function and(left: SQExpr, right: SQExpr): SQExpr;
        function between(arg: SQExpr, lower: SQExpr, upper: SQExpr): SQBetweenExpr;
        function inExpr(args: SQExpr[], values: SQExpr[][]): SQInExpr;
        function or(left: SQExpr, right: SQExpr): SQExpr;
        function compare(kind: QueryComparisonKind, left: SQExpr, right: SQExpr): SQCompareExpr;
        function contains(left: SQExpr, right: SQExpr): SQContainsExpr;
        function exists(arg: SQExpr): SQExistsExpr;
        function equal(left: SQExpr, right: SQExpr): SQCompareExpr;
        function not(arg: SQExpr): SQNotExpr;
        function startsWith(left: SQExpr, right: SQExpr): SQStartsWithExpr;
        function nullConstant(): SQConstantExpr;
        function now(): SQNowExpr;
        function boolean(value: boolean): SQConstantExpr;
        function dateAdd(unit: TimeUnit, amount: number, arg: SQExpr): SQDateAddExpr;
        function dateTime(value: Date, valueEncoded?: string): SQConstantExpr;
        function dateSpan(unit: TimeUnit, arg: SQExpr): SQDateSpanExpr;
        function decimal(value: number, valueEncoded?: string): SQConstantExpr;
        function double(value: number, valueEncoded?: string): SQConstantExpr;
        function integer(value: number, valueEncoded?: string): SQConstantExpr;
        function text(value: string, valueEncoded?: string): SQConstantExpr;
        function setAggregate(expr: SQExpr, aggregate: QueryAggregateFunction): SQExpr;
        function removeAggregate(expr: SQExpr): SQExpr;
        function removeEntityVariables(expr: SQExpr): SQExpr;
        function createExprWithAggregate(expr: SQExpr, schema: FederatedConceptualSchema, aggregateNonNumericFields: boolean): SQExpr;
    }
    /** Provides utilities for obtaining information about expressions. */
    module SQExprInfo {
        function getAggregate(expr: SQExpr): QueryAggregateFunction;
    }
    const enum SQExprValidationError {
        invalidAggregateFunction = 0,
        invalidSchemaReference = 1,
        invalidEntityReference = 2,
        invalidColumnReference = 3,
        invalidMeasureReference = 4,
        invalidLeftOperandType = 5,
        invalidRightOperandType = 6,
    }
    class SQExprValidationVisitor extends SQExprRewriter {
        errors: SQExprValidationError[];
        private schema;
        constructor(schema: FederatedConceptualSchema, errors?: SQExprValidationError[]);
        visitColumnRef(expr: SQColumnRefExpr): SQExpr;
        visitMeasureRef(expr: SQMeasureRefExpr): SQExpr;
        visitAggr(expr: SQAggregationExpr): SQExpr;
        visitEntity(expr: SQEntityExpr): SQExpr;
        visitContains(expr: SQContainsExpr): SQExpr;
        visitStartsWith(expr: SQContainsExpr): SQExpr;
        private validateEntity(schemaName, entityName);
        private register(error);
        private isQueryable(fieldDef);
    }
}
declare module powerbi.data {
    module SQExprUtils {
        /** Returns an array of supported aggregates for a given expr and role. */
        function getSupportedAggregates(expr: SQExpr, isGroupingOnly: boolean, schema: FederatedConceptualSchema): QueryAggregateFunction[];
        function indexOfExpr(items: SQExpr[], searchElement: SQExpr): number;
        function sequenceEqual(x: SQExpr[], y: SQExpr[]): boolean;
        function uniqueName(namedItems: NamedSQExpr[], expr: SQExpr): string;
        /** Generates a default expression name  */
        function defaultName(expr: SQExpr, fallback?: string): string;
        /** Gets a value indicating whether the expr is a model measure or an aggregate. */
        function isMeasure(expr: SQExpr): boolean;
        function discourageAggregation(expr: SQExpr, schema: FederatedConceptualSchema): boolean;
    }
}
declare module powerbi.data {
    class SemanticQueryRewriter {
        private exprRewriter;
        constructor(exprRewriter: ISQExprVisitor<SQExpr>);
        rewriteFrom(fromValue: SQFrom): SQFrom;
        rewriteSelect(selectItems: NamedSQExpr[], from: SQFrom): NamedSQExpr[];
        rewriteOrderBy(orderByItems: SQSortDefinition[], from: SQFrom): SQSortDefinition[];
        rewriteWhere(whereItems: SQFilter[], from: SQFrom): SQFilter[];
    }
}
declare module powerbi.data {
    import ArrayNamedItems = jsCommon.ArrayNamedItems;
    interface NamedSQExpr {
        name: string;
        expr: SQExpr;
    }
    interface SQFilter {
        target?: SQExpr[];
        condition: SQExpr;
    }
    /** Represents an entity reference in SemanticQuery from. */
    interface SQFromEntitySource {
        entity: string;
        schema: string;
    }
    /** Represents a sort over an expression. */
    interface SQSortDefinition {
        expr: SQExpr;
        direction: QuerySortDirection;
    }
    interface QueryFromEnsureEntityResult {
        name: string;
        new?: boolean;
    }
    interface SQSourceRenames {
        [from: string]: string;
    }
    /**
     * Represents a semantic query that is:
     * 1) Round-trippable with a JSON QueryDefinition.
     * 2) Immutable
     * 3) Long-lived and does not have strong references to a conceptual model (only names).
     */
    class SemanticQuery {
        private static empty;
        private fromValue;
        private whereItems;
        private orderByItems;
        private selectItems;
        constructor(from: any, where: any, orderBy: any, select: NamedSQExpr[]);
        static create(): SemanticQuery;
        private static createWithTrimmedFrom(from, where, orderBy, select);
        from(): SQFrom;
        /** Returns a query equivalent to this, with the specified selected items. */
        select(values: NamedSQExpr[]): SemanticQuery;
        /** Gets the items being selected in this query. */
        select(): ArrayNamedItems<NamedSQExpr>;
        private getSelect();
        private setSelect(values);
        /** Removes the given expression from the select. */
        removeSelect(expr: SQExpr): SemanticQuery;
        /** Removes the given expression from order by. */
        removeOrderBy(expr: SQExpr): SemanticQuery;
        selectNameOf(expr: SQExpr): string;
        setSelectAt(index: number, expr: SQExpr): SemanticQuery;
        /** Adds a the expression to the select clause. */
        addSelect(expr: SQExpr): SemanticQuery;
        /** Gets or sets the sorting for this query. */
        orderBy(values: SQSortDefinition[]): SemanticQuery;
        orderBy(): SQSortDefinition[];
        private getOrderBy();
        private setOrderBy(values);
        /** Gets or sets the filters for this query. */
        where(values: SQFilter[]): SemanticQuery;
        where(): SQFilter[];
        private getWhere();
        private setWhere(values);
        addWhere(filter: SemanticFilter): SemanticQuery;
        rewrite(exprRewriter: ISQExprVisitor<SQExpr>): SemanticQuery;
    }
    /** Represents a semantic filter condition.  Round-trippable with a JSON FilterDefinition.  Instances of this class are immutable. */
    class SemanticFilter {
        private fromValue;
        private whereItems;
        constructor(from: SQFrom, where: SQFilter[]);
        static fromSQExpr(contract: SQExpr): SemanticFilter;
        from(): SQFrom;
        conditions(): SQExpr[];
        where(): SQFilter[];
        rewrite(exprRewriter: ISQExprVisitor<SQExpr>): SemanticFilter;
        validate(schema: FederatedConceptualSchema, errors?: SQExprValidationError[]): SQExprValidationError[];
        /** Merges a list of SemanticFilters into one. */
        static merge(filters: SemanticFilter[]): SemanticFilter;
        private static applyFilter(filter, from, where);
    }
    /** Represents a SemanticQuery/SemanticFilter from clause. */
    class SQFrom {
        private items;
        constructor(items?: {
            [name: string]: SQFromEntitySource;
        });
        keys(): string[];
        entity(key: string): SQFromEntitySource;
        ensureEntity(entity: SQFromEntitySource, desiredVariableName?: string): QueryFromEnsureEntityResult;
        remove(key: string): void;
        /** Converts the entity name into a short reference name.  Follows the Semantic Query convention of a short name. */
        private candidateName(ref);
        clone(): SQFrom;
    }
    class SQExprRewriterWithSourceRenames extends SQExprRewriter {
        private renames;
        constructor(renames: SQSourceRenames);
        visitEntity(expr: SQEntityExpr): SQExpr;
        rewriteFilter(filter: SQFilter): SQFilter;
        rewriteArray(exprs: SQExpr[]): SQExpr[];
        static rewrite(expr: SQExpr, from: SQFrom): SQExpr;
    }
}
declare module powerbi {
    /** Culture interfaces. These match the Globalize library interfaces intentionally. */
    interface Culture {
        name: string;
        calendar: Calendar;
        calendars: CalendarDictionary;
        numberFormat: NumberFormatInfo;
    }
    interface Calendar {
        patterns: any;
        firstDay: number;
    }
    interface CalendarDictionary {
        [key: string]: Calendar;
    }
    interface NumberFormatInfo {
        decimals: number;
        groupSizes: number[];
        negativeInfinity: string;
        positiveInfinity: string;
    }
    /**
     * NumberFormat module contains the static methods for formatting the numbers.
     * It extends the JQuery.Globalize functionality to support complete set of .NET
     * formatting expressions for numeric types including custom formats.
     */
    module NumberFormat {
        interface NumericFormatMetadata {
            format: string;
            hasEscapes: boolean;
            hasQuotes: boolean;
            hasE: boolean;
            hasCommas: boolean;
            hasDots: boolean;
            hasPercent: boolean;
            hasPermile: boolean;
            precision: number;
            scale: number;
        }
        /** Evaluates if the value can be formatted using the NumberFormat */
        function canFormat(value: any): boolean;
        function isStandardFormat(format: string): boolean;
        /** Formats the number using specified format expression and culture */
        function format(value: number, format: string, culture: Culture): string;
        /** Performs a custom format with a value override.  Typically used for custom formats showing scaled values. */
        function formatWithCustomOverride(value: number, format: string, nonScientificOverrideFormat: string, culture: Culture): string;
        /** Returns the formatMetadata of the format */
        function getCustomFormatMetadata(format: string, calculatePrecision?: boolean, calculateScale?: boolean): NumericFormatMetadata;
    }
    var formattingService: IFormattingService;
}
declare module powerbi.data {
    /** Serializes SQExpr in a form optimized in-memory comparison, but not intended for storage on disk. */
    module SQExprShortSerializer {
        function serialize(expr: SQExpr): string;
        function serializeArray(exprs: SQExpr[]): string;
    }
}
declare module powerbi {
    module yAxisPosition {
        const left: string;
        const right: string;
        const type: IEnumType;
    }
}
declare module powerbi.data {
    import IStringResourceProvider = jsCommon.IStringResourceProvider;
    type DisplayNameGetter = ((resourceProvider: IStringResourceProvider) => string) | string;
    function createDisplayNameGetter(displayNameKey: string): (IStringResourceProvider) => string;
    function getDisplayName(displayNameGetter: data.DisplayNameGetter, resourceProvider: jsCommon.IStringResourceProvider): string;
}
declare module powerbi {
    module imageScalingType {
        const normal: string;
        const fit: string;
        const fill: string;
        const type: IEnumType;
    }
}
declare module powerbi {
    module outline {
        const none: string;
        const bottomOnly: string;
        const topOnly: string;
        const topBottom: string;
        const leftRight: string;
        const frame: string;
        const type: IEnumType;
    }
}
declare module powerbi.data {
    /** Represents common expression patterns for 'field' expressions such as columns, column aggregates, measures, etc. */
    interface FieldExprPattern {
        column?: FieldExprColumnPattern;
        columnAggr?: FieldExprColumnAggrPattern;
        entityAggr?: FieldExprEntityAggrPattern;
        measure?: FieldExprMeasurePattern;
    }
    interface FieldExprEntityItemPattern {
        schema: string;
        entity: string;
        entityVar?: string;
    }
    interface FieldExprPropertyPattern extends FieldExprEntityItemPattern {
        name: string;
    }
    type FieldExprColumnPattern = FieldExprPropertyPattern;
    interface FieldExprColumnAggrPattern extends FieldExprColumnPattern {
        aggregate: QueryAggregateFunction;
    }
    interface FieldExprEntityAggrPattern extends FieldExprEntityItemPattern {
        aggregate: QueryAggregateFunction;
    }
    type FieldExprMeasurePattern = FieldExprPropertyPattern;
    module SQExprConverter {
        function asFieldPattern(sqExpr: SQExpr): FieldExprPattern;
    }
}

/// <reference path="../../Typedefs/d3/d3.d.ts" />
/// <reference path="../../Typedefs/jquery-visible/jquery-visible.d.ts" />
/// <reference path="../../Typedefs/jquery/jquery.d.ts" />
/// <reference path="../../Typedefs/microsoftMaps/Microsoft.Maps.d.ts" />
/// <reference path="../../Typedefs/moment/moment.d.ts" />
/// <reference path="../../Typedefs/velocity/velocity-animate.d.ts" />
/// <reference path="../../Typedefs/lodash/lodash.d.ts" />
/// <reference path="../../Typedefs/quill/quill.d.ts" />
/// <reference path="../../Typedefs/ie/ie.d.ts" />
/// <reference path="../../VisualsCommon/obj/VisualsCommon.d.ts" />
/// <reference path="../../VisualsData/obj/VisualsData.d.ts" />
declare module powerbi {
    import DataViewObjectDescriptors = powerbi.data.DataViewObjectDescriptors;
    import DataViewObjectDescriptor = powerbi.data.DataViewObjectDescriptor;
    import DisplayNameGetter = powerbi.data.DisplayNameGetter;
    import Selector = powerbi.data.Selector;
    import IStringResourceProvider = jsCommon.IStringResourceProvider;
    /**
     * Represents a visualization displayed within an application (PowerBI dashboards, ad-hoc reporting, etc.).
     * This interface does not make assumptions about the underlying JS/HTML constructs the visual uses to render itself.
     */
    interface IVisual {
        /**
         * Initializes an instance of the IVisual.
         *
         * @param options Initialization options for the visual.
         */
        init(options: VisualInitOptions): void;
        /** Notifies the visual that it is being destroyed, and to do any cleanup necessary (such as unsubscribing event handlers). */
        destroy?(): void;
        /**
         * Notifies the IVisual of an update (data, viewmode, size change).
         */
        update?(options: VisualUpdateOptions): void;
        /**
         * Notifies the IVisual to resize.
         *
         * @param finalViewport This is the viewport that the visual will eventually be resized to.
         */
        onResizing?(finalViewport: IViewport): void;
        /**
         * Notifies the IVisual of new data being provided.
         * This is an optional method that can be omitted if the visual is in charge of providing its own data.
         */
        onDataChanged?(options: VisualDataChangedOptions): void;
        /** Notifies the IVisual of changes to the color, font, theme, and style related values that the visual should use. */
        onStyleChanged?(newStyle: IVisualStyle): void;
        /** Notifies the IVisual to change view mode if applicable. */
        onViewModeChanged?(viewMode: ViewMode): void;
        /** Notifies the IVisual to clear any selection. */
        onClearSelection?(): void;
        /** Notifies the IVisual to select the specified object. */
        onSelectObject?(object: VisualObjectInstance): void;
        /** Gets a value indicating whether the IVisual can be resized to the given viewport. */
        canResizeTo?(viewport: IViewport): boolean;
        /** Gets the set of objects that the visual is currently displaying. */
        enumerateObjectInstances?(options: EnumerateVisualObjectInstancesOptions): VisualObjectInstance[];
    }
    interface IVisualPlugin {
        /** The name of the plugin.  Must match the property name in powerbi.visuals. */
        name: string;
        /** The key for the watermark style of this visual. Must match the id name in ExploreUI/views/svg/visualsWatermarks.svg */
        watermarkKey?: string;
        /** Declares the capabilities for this IVisualPlugin type. */
        capabilities?: VisualCapabilities;
        /** Function to call to create the visual. */
        create: IVisualFactoryMethod;
        /**
          * Function to allow the visual to influence query generation. Called each time a query is generated
          * so the visual can translate its state into options understood by the query generator.
          */
        customizeQuery?: CustomizeQueryMethod;
        /** The class of the plugin.  At the moment it is only used to have a way to indicate the class name that a custom visual has. */
        class?: string;
        getSortableRoles?: (visualSortableOptions?: VisualSortableOptions) => string[];
    }
    /** Factory method for an IVisual.  This factory method should be registered on the powerbi.visuals object. */
    interface IVisualFactoryMethod {
        (): IVisual;
    }
    /** Parameters available to a CustomizeQueryMethod */
    interface CustomizeQueryOptions {
        /**
         * The data view mapping for this visual with some additional information. CustomizeQueryMethod implementations
         * are expected to edit this in-place.
         */
        dataViewMappings: data.CompiledDataViewMapping[];
        /**
         * Visual should prefer to request a higher volume of data.
         */
        preferHigherDataVolume?: boolean;
    }
    /** Parameters available to a sortable visual candidate */
    interface VisualSortableOptions {
        dataViewMappings: data.CompiledDataViewMapping[];
    }
    /** An imperative way for a visual to influence query generation beyond just its declared capabilities. */
    interface CustomizeQueryMethod {
        (options: CustomizeQueryOptions): void;
    }
    /** Defines the visual filtering capability for a particular filter kind. */
    interface VisualFilterMapping {
        /** Specifies what data roles are used to control the filter semantics for this filter kind. */
        targetRoles: string[];
    }
    /**
     * Defines the visual filtering capabilities for various filter kinds.
       By default all visuals support attribute filters and measure filters in their innermost scope.
    */
    interface VisualFilterMappings {
        measureFilter?: VisualFilterMapping;
    }
    /** Defines the capabilities of an IVisual. */
    interface VisualCapabilities {
        /** Defines what roles the visual expects, and how those roles should be populated.  This is useful for visual generation/editing. */
        dataRoles?: VisualDataRole[];
        /** Defines the set of objects supported by this IVisual. */
        objects?: DataViewObjectDescriptors;
        /** Defines how roles that the visual understands map to the DataView.  This is useful for query generation. */
        dataViewMappings?: DataViewMapping[];
        /** Defines how filters are understood by the visual. This is used by query generation */
        filterMappings?: VisualFilterMappings;
        /** Indicates whether cross-highlight is supported by the visual. This is useful for query generation. */
        supportsHighlight?: boolean;
        /** Indicates whether sorting is supported by the visual. This is useful for query generation */
        sorting?: VisualSortingCapabilities;
        /** Indicates whether a default title should be displayed.  Visuals with self-describing layout can omit this. */
        suppressDefaultTitle?: boolean;
        /** Indicates whether drilling is supported by the visual. */
        drilldown?: VisualDrillCapabilities;
        /** Indicates whether rotating is supported by the visual. */
        canRotate?: boolean;
    }
    /** Defines the data roles understood by the IVisual. */
    interface VisualDataRole {
        /** Unique name for the VisualDataRole. */
        name: string;
        /** Indicates the kind of role.  This value is used to build user interfaces, such as a field well. */
        kind: VisualDataRoleKind;
        displayName?: DisplayNameGetter;
        /** Indicates the preferred ValueTypes to be used in this data role.  This is used by authoring tools when adding fields into the visual. */
        preferredTypes?: ValueTypeDescriptor[];
    }
    /** Defines the visual sorting capability. */
    interface VisualSortingCapabilities {
        /** When specified, indicates that the IVisual wants default sorting behavior. */
        default?: {};
        /** When specified, indicates that the IVisual wants to control sort interactivity. */
        custom?: {};
        /** When specified, indicates sorting that is inherently implied by the IVisual.  This is useful to automatically sort. */
        implicit?: VisualImplicitSorting;
    }
    /** Defines the visual's drill capability. */
    interface VisualDrillCapabilities {
        /** Returns the drillable role names for this visual **/
        roles?: string[];
    }
    /** Defines implied sorting behaviour for an IVisual. */
    interface VisualImplicitSorting {
        clauses: VisualImplicitSortingClause[];
    }
    interface VisualImplicitSortingClause {
        role: string;
        direction: data.QuerySortDirection;
    }
    enum VisualDataRoleKind {
        /** Indicates that the role should be bound to something that evaluates to a grouping of values. */
        Grouping = 0,
        /** Indicates that the role should be bound to something that evaluates to a single value in a scope. */
        Measure = 1,
        /** Indicates that the role can be bound to either Grouping or Measure. */
        GroupingOrMeasure = 2,
    }
    /** Defines the capabilities of an IVisual. */
    interface VisualInitOptions {
        /** The DOM element the visual owns. */
        element: JQuery;
        /** The set of services provided by the visual hosting layer. */
        host: IVisualHostServices;
        /** Style information. */
        style: IVisualStyle;
        /** The initial viewport size. */
        viewport: IViewport;
        /** Animation options. */
        animation?: AnimationOptions;
        /** Interactivity options. */
        interactivity?: InteractivityOptions;
    }
    interface VisualUpdateOptions {
        viewport: IViewport;
        dataViews: DataView[];
        suppressAnimations?: boolean;
        viewMode?: ViewMode;
    }
    interface VisualDataChangedOptions {
        dataViews: DataView[];
        /** Optionally prevent animation transitions */
        suppressAnimations?: boolean;
        /** Indicates what type of update has been performed on the data.
        The default operation kind is Create.*/
        operationKind?: VisualDataChangeOperationKind;
    }
    enum VisualDataChangeOperationKind {
        Create = 0,
        Append = 1,
    }
    interface EnumerateVisualObjectInstancesOptions {
        objectName: string;
    }
    interface CustomSortEventArgs {
        sortDescriptors: SortableFieldDescriptor[];
    }
    interface SortableFieldDescriptor {
        queryName: string;
        sortDirection?: data.QuerySortDirection;
    }
    enum ViewMode {
        View = 0,
        Edit = 1,
    }
    interface IVisualErrorMessage {
        message: string;
        title: string;
        detail: string;
    }
    interface IVisualWarning {
        code: string;
        getMessages(resourceProvider: IStringResourceProvider): IVisualErrorMessage;
    }
    /** Defines behavior for IVisual interaction with the host environment. */
    interface IVisualHostServices {
        /** Returns the localized form of a string. */
        getLocalizedString(stringId: string): string;
        /** Notifies of a DragStart event. */
        onDragStart(args: DragEventArgs): void;
        /** Gets a value indicating whether the given selection is valid. */
        canSelect(args: SelectEventArgs): boolean;
        /** Notifies of a data point being selected. */
        onSelect(args: SelectEventArgs): void;
        /** Notifies of a visual object being selected. */
        onSelectObject?(args: SelectObjectEventArgs): void;
        /** Notifies that properties of the IVisual have changed. */
        persistProperties(changes: VisualObjectInstance[]): void;
        /** Requests more data to be loaded. */
        loadMoreData(): void;
        /** Notification to sort on the specified column */
        onCustomSort(args: CustomSortEventArgs): void;
        /** Indicates which view mode the host is in. */
        getViewMode(): ViewMode;
        /** Notify any warning that happened during update of the visual. */
        setWarnings(clientWarnings: IVisualWarning[]): void;
        /** Sets a toolbar on the host. */
        setToolbar($selector: JQuery): void;
    }
    interface IViewport {
        height: number;
        width: number;
    }
    /** Animation options for visuals. */
    interface AnimationOptions {
        /** Indicates whether all transition frames should be flushed immediately, effectively "disabling" any visual transitions. */
        transitionImmediate: boolean;
    }
    /** Interactivity options for visuals. */
    interface InteractivityOptions {
        /** Indicates that dragging of data points should be permitted. */
        dragDataPoint?: boolean;
        /** Indicates that data points should be selectable. */
        selection?: boolean;
        /** Indicates that the chart and the legend are interactive */
        isInteractiveLegend?: boolean;
        /** Indicates overflow behavior. Values are CSS oveflow strings */
        overflow?: string;
    }
    interface VisualDragPayload extends DragPayload {
        data?: Selector;
        field?: {};
    }
    interface DragEventArgs {
        event: DragEvent;
        data: VisualDragPayload;
    }
    interface SelectorForColumn {
        [queryName: string]: data.DataRepetitionSelector;
    }
    interface SelectorsByColumn {
        /** Data-bound repetition selection. */
        dataMap?: SelectorForColumn;
        /** Metadata-bound repetition selection.  Refers to a DataViewMetadataColumn queryName. */
        metadata?: string;
        /** User-defined repetition selection. */
        id?: string;
    }
    interface SelectEventArgs {
        data: Selector[];
        data2?: SelectorsByColumn[];
    }
    interface SelectObjectEventArgs {
        object: DataViewObjectDescriptor;
    }
    interface VisualObjectInstance {
        /** The name of the object (as defined in VisualCapabilities). */
        objectName: string;
        /** A display name for the object instance. */
        displayName?: string;
        /** The set of property values for this object.  Some of these properties may be defaults provided by the IVisual. */
        properties?: {
            [propertyName: string]: DataViewPropertyValue;
        };
        /** The selector that identifies this object. */
        selector: Selector;
        /** Defines the constrained set of valid values for a property. */
        validValues?: {
            [propertyName: string]: string[];
        };
    }
}
declare module powerbi.visuals {
    module AnimatorCommon {
        const MinervaAnimationDuration: number;
        function GetAnimationDuration(animator: IGenericAnimator, suppressAnimations: boolean): number;
    }
    interface IAnimatorOptions {
        duration?: number;
    }
    interface IAnimationOptions {
        interactivityService: IInteractivityService;
    }
    interface IAnimationResult {
        failed: boolean;
    }
    interface IAnimator<T extends IAnimatorOptions, U extends IAnimationOptions, V extends IAnimationResult> {
        getDuration(): number;
        animate(options: U): V;
    }
    type IGenericAnimator = IAnimator<IAnimatorOptions, IAnimationOptions, IAnimationResult>;
    /**
     * We just need to have a non-null animator to allow axis animations in cartesianChart.
     * Note: Use this temporarily for Line/Scatter until we add more animations (MinervaPlugins only).
     */
    class BaseAnimator<T extends IAnimatorOptions, U extends IAnimationOptions, V extends IAnimationResult> implements IAnimator<T, U, V> {
        protected animationDuration: number;
        constructor(options?: T);
        getDuration(): number;
        animate(options: U): V;
    }
}
declare module powerbi.visuals {
    interface ColumnChartAnimationOptions extends IAnimationOptions {
        viewModel: ColumnChartData;
        series: D3.UpdateSelection;
        layout: IColumnLayout;
        itemCS: ClassAndSelector;
        mainGraphicsContext: D3.Selection;
        labelLayout: ILabelLayout;
        viewPort: IViewport;
    }
    interface ColumnChartAnimationResult extends IAnimationResult {
        shapes: D3.UpdateSelection;
        dataLabels: D3.UpdateSelection;
    }
    type IColumnChartAnimator = IAnimator<IAnimatorOptions, ColumnChartAnimationOptions, ColumnChartAnimationResult>;
    class WebColumnChartAnimator extends BaseAnimator<IAnimatorOptions, ColumnChartAnimationOptions, ColumnChartAnimationResult> implements IColumnChartAnimator {
        private previousViewModel;
        constructor(options?: IAnimatorOptions);
        animate(options: ColumnChartAnimationOptions): ColumnChartAnimationResult;
        private animateNormalToHighlighted(options);
        private animateHighlightedToHighlighted(options);
        private animateHighlightedToNormal(options);
        private animateDefaultShapes(data, series, layout, itemCS);
        private animateDefaultDataLabels(options);
    }
}
declare module powerbi.visuals {
    interface DonutChartAnimationOptions extends IAnimationOptions {
        viewModel: DonutData;
        graphicsContext: D3.Selection;
        colors: IDataColorPalette;
        layout: DonutLayout;
        sliceWidthRatio: number;
        radius: number;
        viewport: IViewport;
    }
    interface DonutChartAnimationResult extends IAnimationResult {
        shapes: D3.UpdateSelection;
        highlightShapes: D3.UpdateSelection;
    }
    type IDonutChartAnimator = IAnimator<IAnimatorOptions, DonutChartAnimationOptions, DonutChartAnimationResult>;
    class WebDonutChartAnimator extends BaseAnimator<IAnimatorOptions, DonutChartAnimationOptions, DonutChartAnimationResult> implements IDonutChartAnimator {
        private previousViewModel;
        constructor(options?: IAnimatorOptions);
        animate(options: DonutChartAnimationOptions): DonutChartAnimationResult;
        private animateNormalToHighlighted(options);
        private animateHighlightedToHighlighted(options);
        private animateHighlightedToNormal(options);
        private animateDefaultShapes(options);
        private animateDefaultHighlightShapes(options);
    }
}
declare module powerbi.visuals {
    interface FunnelAnimationOptions extends IAnimationOptions {
        viewModel: FunnelData;
        layout: IFunnelLayout;
        axisGraphicsContext: D3.Selection;
        shapeGraphicsContext: D3.Selection;
        percentGraphicsContext: D3.Selection;
        labelGraphicsContext: D3.Selection;
        axisOptions: FunnelAxisOptions;
        slicesWithoutHighlights: FunnelSlice[];
        labelLayout: ILabelLayout;
        isHidingPercentBars: boolean;
        visualInitOptions: VisualInitOptions;
    }
    interface FunnelAnimationResult extends IAnimationResult {
        shapes: D3.UpdateSelection;
        dataLabels: D3.UpdateSelection;
    }
    type IFunnelAnimator = IAnimator<IAnimatorOptions, FunnelAnimationOptions, FunnelAnimationResult>;
    class WebFunnelAnimator extends BaseAnimator<IAnimatorOptions, FunnelAnimationOptions, FunnelAnimationResult> implements IFunnelAnimator {
        private previousViewModel;
        constructor(options?: IAnimatorOptions);
        animate(options: FunnelAnimationOptions): FunnelAnimationResult;
        private animateNormalToHighlighted(options);
        private animateHighlightedToHighlighted(options);
        private animateHighlightedToNormal(options);
        private animateDefaultAxis(graphicsContext, axisOptions, isHidingPercentBars);
        private animateDefaultShapes(data, slices, graphicsContext, layout);
        private animateDefaultDataLabels(options);
        private animatePercentBars(options);
        private animateToFunnelPercent(context, targetData, layout);
        private animatePercentBarComponents(data, options);
    }
}
declare module powerbi.visuals {
    interface TreemapAnimationOptions extends IAnimationOptions {
        viewModel: TreemapData;
        nodes: D3.Layout.GraphNode[];
        highlightNodes: D3.Layout.GraphNode[];
        labeledNodes: D3.Layout.GraphNode[];
        shapeGraphicsContext: D3.Selection;
        mainGraphicsContext: D3.Selection;
        layout: ITreemapLayout;
    }
    interface TreemapAnimationResult extends IAnimationResult {
        shapes: D3.UpdateSelection;
        highlightShapes: D3.UpdateSelection;
        labels: D3.UpdateSelection;
    }
    type ITreemapAnimator = IAnimator<IAnimatorOptions, TreemapAnimationOptions, TreemapAnimationResult>;
    class WebTreemapAnimator extends BaseAnimator<IAnimatorOptions, TreemapAnimationOptions, TreemapAnimationResult> implements ITreemapAnimator {
        previousViewModel: TreemapData;
        constructor(options?: IAnimatorOptions);
        animate(options: TreemapAnimationOptions): TreemapAnimationResult;
        private animateNormalToHighlighted(options);
        private animateHighlightedToHighlighted(options);
        private animateHighlightedToNormal(options);
        private animateDefaultShapes(context, nodes, hasSelection, hasHighlights, layout);
        private animateDefaultHighlightShapes(context, nodes, hasSelection, hasHighlights, layout);
        private animateDefaultLabels(context, nodes, layout);
    }
}
declare module powerbi.visuals {
    interface ColumnBehaviorOptions {
        datapoints: SelectableDataPoint[];
        bars: D3.Selection;
        clearCatcher: D3.Selection;
        mainGraphicsContext: D3.Selection;
        hasHighlights: boolean;
        labelLayout: ILabelLayout;
        viewport: IViewport;
        axisOptions: ColumnAxisOptions;
        showLabel: boolean;
    }
    class ColumnChartWebBehavior {
        select(hasSelection: boolean, options: ColumnBehaviorOptions): void;
    }
}
declare module powerbi.visuals {
    interface DataDotChartBehaviorOptions {
        datapoints: SelectableDataPoint[];
        dots: D3.Selection;
        clearCatcher: D3.Selection;
    }
    class DataDotChartWebBehavior {
        select(hasSelection: boolean, selection: D3.Selection): void;
    }
}
declare module powerbi.visuals {
    interface DonutBehaviorOptions {
        datapoints: SelectableDataPoint[];
        slices: D3.Selection;
        highlightSlices: D3.Selection;
        clearCatcher: D3.Selection;
        allowDrilldown: boolean;
        visual: DonutChart;
        hasHighlights: boolean;
        svg: D3.Selection;
    }
    class DonutChartWebBehavior {
        private allowDrilldown;
        private isDrilled;
        private visual;
        private svg;
        constructor(options: DonutBehaviorOptions);
        select(hasSelection: boolean, selection: D3.Selection, highlighted: boolean, hasHighlights: boolean, data?: DonutDataPoint): void;
    }
}
declare module powerbi.visuals {
    interface FunnelBehaviorOptions {
        datapoints: SelectableDataPoint[];
        bars: D3.Selection;
        labels: D3.Selection;
        clearCatcher: D3.Selection;
        hasHighlights: boolean;
    }
    class FunnelWebBehavior {
        select(hasSelection: boolean, selection: D3.Selection, hasHighlights: boolean): void;
    }
}
declare module powerbi.visuals {
    interface LineChartBehaviorOptions {
        dataPoints: SelectableDataPoint[];
        lines: D3.Selection;
        interactivityLines: D3.Selection;
        dots: D3.Selection;
        areas: D3.Selection;
        clearCatcher: D3.Selection;
    }
    class LineChartWebBehavior {
        select(hasSelection: boolean, lines: D3.Selection, dots: D3.Selection, areas: D3.Selection): void;
    }
}
declare module powerbi.visuals {
    interface MapBehaviorOptions {
        bubbles?: D3.Selection;
        slices?: D3.Selection;
        shapes?: D3.Selection;
        clearCatcher: D3.Selection;
        dataPoints: SelectableDataPoint[];
    }
    class MapBehavior {
        select(hasSelection: boolean, bubbles: D3.Selection, slices: D3.Selection, shapes: D3.Selection): void;
    }
}
declare module powerbi.visuals {
    const enum DragType {
        Drag = 0,
        DragEnd = 1,
    }
    interface ScatterBehaviorOptions {
        host: ICartesianVisualHost;
        root: D3.Selection;
        mainContext: D3.Selection;
        background: D3.Selection;
        clearCatcher: D3.Selection;
        dataPointsSelection: D3.Selection;
        data: ScatterChartData;
        visualInitOptions: VisualInitOptions;
        xAxisProperties: IAxisProperties;
        yAxisProperties: IAxisProperties;
    }
    class ScatterChartWebBehavior {
        select(hasSelection: boolean, options: ScatterBehaviorOptions): void;
    }
    class ScatterChartMobileBehavior {
        private static CrosshairClassName;
        private static ScatterChartCircleTagName;
        private static DotClassName;
        private static DotClassSelector;
        private static Horizontal;
        private static Vertical;
        private host;
        private mainGraphicsContext;
        private data;
        private crosshair;
        private crosshairHorizontal;
        private crosshairVertical;
        private lastDotIndex;
        private xAxisProperties;
        private yAxisProperties;
        setOptions(options: ScatterBehaviorOptions): void;
        select(hasSelection: boolean, datapoints: D3.Selection, dataPoint: SelectableDataPoint, index: number): void;
        selectRoot(): void;
        drag(t: DragType): void;
        private onDrag();
        private onClick();
        private getMouseCoordinates();
        private selectDotByIndex(index);
        private selectDot(dotIndex);
        private moveCrosshairToIndexDot(index);
        private moveCrosshairToXY(x, y);
        private drawCrosshair(addTo, x, y, width, height);
        private findClosestDotIndex(x, y);
        private updateLegend(dotIndex);
        private createLegendDataPoints(dotIndex);
    }
}
declare module powerbi.visuals {
    interface SlicerBehaviorOptions {
        datapoints: SlicerDataPoint[];
        slicerItemContainers: D3.Selection;
        slicerItemLabels: D3.Selection;
        slicerItemInputs: D3.Selection;
        slicerClear: D3.Selection;
        isInvertedSelectionMode: boolean;
    }
    class SlicerWebBehavior {
        updateLabels(selectionLabels: D3.Selection, slicerSettings: SlicerSettings): void;
        updateItemsInputOnSelectAll(slicerItemInputs: D3.Selection, dataPoint: SlicerDataPoint): void;
        updateSelectAll(slicerItemInputs: D3.Selection, isInvertedSelectionMode: boolean): void;
        mouseInteractions(selectionLabels: D3.Selection, slicerSettings: SlicerSettings): void;
        clearSlicers(selectionLabels: D3.Selection, slicerItemInputs: D3.Selection): void;
    }
}
declare module powerbi.visuals {
    interface LegendBehaviorOptions {
        datapoints: LegendDataPoint[];
        legendItems: D3.Selection;
        legendIcons: D3.Selection;
        clearCatcher: D3.Selection;
    }
    class LegendWebBehavior {
        private static selectedLegendColor;
        select(hasSelection: boolean, legendIcons: D3.Selection): void;
    }
}
declare module powerbi.visuals {
    interface TreemapBehaviorOptions {
        shapes: D3.Selection;
        highlightShapes: D3.Selection;
        labels: D3.Selection;
        nodes: TreemapNode[];
        hasHighlights: boolean;
    }
    class TreemapWebBehavior {
        select(hasSelection: boolean, datapoints: D3.Selection, hasHighlights: boolean): void;
    }
}
declare module powerbi.visuals {
    interface WaterfallChartBehaviorOptions {
        datapoints: SelectableDataPoint[];
        bars: D3.Selection;
        clearCatcher: D3.Selection;
    }
    class WaterfallChartWebBehavior {
        select(hasSelection: boolean, selection: D3.Selection): void;
    }
}
declare module powerbi.visuals {
    interface VisualConfig {
        visualType: string;
        projections: data.QueryProjectionsByRole[];
        /**
         * This is the one that has info like Total, Combochart viz types, legend settings, etc...
         * Each IVisual implementation, should simply cast this to whatever object they expect.
         */
        config?: any;
    }
}
declare module powerbi.visuals {
    import ITextAsSVGMeasurer = powerbi.ITextAsSVGMeasurer;
    /**
     * Default ranges are for when we have a field chosen for the axis,
     * but no values are returned by the query.
     */
    var fallBackDomain: number[];
    var fallbackDateDomain: number[];
    interface IAxisProperties {
        /**
         * The D3 Scale object.
         */
        scale: D3.Scale.GenericScale<any>;
        /**
         * The D3 Axis object.
         */
        axis: D3.Svg.Axis;
        /**
         * An array of the tick values to display for this axis.
         */
        values: any[];
        /**
         * The D3.Selection that the axis should render to.
         */
        graphicsContext?: D3.Selection;
        /**
         * The ValueType of the column used for this axis.
         */
        axisType: ValueType;
        /**
         * A formatter with appropriate properties configured for this field.
         */
        formatter: IValueFormatter;
        /**
         * The axis title label.
         */
        axisLabel: string;
        /**
         * Cartesian axes are either a category or value axis.
         */
        isCategoryAxis: boolean;
        /**
         * (optional) The max width for category tick label values. used for ellipsis truncation / label rotation.
         */
        xLabelMaxWidth?: number;
        /**
         * (optional) The thickness of each category on the axis.
         */
        categoryThickness?: number;
        /**
         * (optional) The outer padding in pixels applied to the D3 scale.
         */
        outerPadding?: number;
        /**
         * (optional) Whether we are using a default domain.
         */
        usingDefaultDomain?: boolean;
        /** (optional) do default d3 axis labels fit? */
        willLabelsFit?: boolean;
        /** (optional) word break axis labels */
        willLabelsWordBreak?: boolean;
        /**
         * (optional) Whether log scale is possible on the current domain.
         */
        isLogScaleAllowed?: boolean;
    }
    interface IMargin {
        top: number;
        bottom: number;
        left: number;
        right: number;
    }
    interface CreateAxisOptions {
        /**
         * The dimension length for the axis, in pixels.
         */
        pixelSpan: number;
        /**
         * The data domain. [min, max] for a scalar axis, or [1...n] index array for ordinal.
         */
        dataDomain: number[];
        /**
         * The DataViewMetadataColumn will be used for dataType and tick value formatting.
         */
        metaDataColumn: DataViewMetadataColumn;
        /**
         * Identifies the property for the format string.
         */
        formatStringProp: DataViewObjectPropertyIdentifier;
        /**
         * outerPadding to be applied to the axis.
         */
        outerPadding: number;
        /**
         * Indicates if this is the category axis.
         */
        isCategoryAxis?: boolean;
        /**
         * If true and the dataType is numeric or dateTime,
         * create a linear axis, else create an ordinal axis.
         */
        isScalar?: boolean;
        /**
         * (optional) The scale is inverted for a vertical axis,
         * and different optimizations are made for tick labels.
         */
        isVertical?: boolean;
        /**
         * (optional) For visuals that do not need zero (e.g. column/bar) use tickInterval.
         */
        useTickIntervalForDisplayUnits?: boolean;
        /**
         * (optional) Combo charts can override the tick count to
         * align y1 and y2 grid lines.
         */
        forcedTickCount?: number;
        /**
         * (optional) Callback for looking up actual values from indices,
         * used when formatting tick labels.
         */
        getValueFn?: (index: number, type: ValueType) => any;
        /**
         * (optional) The width/height of each category on the axis.
         */
        categoryThickness?: number;
        /** (optional) the scale type of the axis. e.g. log, linear */
        scaleType?: string;
    }
    interface CreateScaleResult {
        scale: D3.Scale.GenericScale<any>;
        bestTickCount: number;
        usingDefaultDomain?: boolean;
    }
    module AxisHelper {
        function getRecommendedNumberOfTicksForXAxis(availableWidth: number): number;
        function getRecommendedNumberOfTicksForYAxis(availableWidth: number): number;
        /**
         * Get the best number of ticks based on minimum value, maximum value,
         * measure metadata and max tick count.
         *
         * @param min The minimum of the data domain.
         * @param max The maximum of the data domain.
         * @param valuesMetadata The measure metadata array.
         * @param maxTickCount The max count of intervals.
         * @param isDateTime - flag to show single tick when min is equal to max.
         */
        function getBestNumberOfTicks(min: number, max: number, valuesMetadata: DataViewMetadataColumn[], maxTickCount: number, isDateTime?: boolean): number;
        function hasNonIntegerData(valuesMetadata: DataViewMetadataColumn[]): boolean;
        function getRecommendedTickValues(maxTicks: number, scale: D3.Scale.GenericScale<any>, axisType: ValueType, isScalar: boolean, minTickInterval?: number): any[];
        function getRecommendedTickValuesForAnOrdinalRange(maxTicks: number, labels: string[]): string[];
        function getRecommendedTickValuesForAQuantitativeRange(maxTicks: number, scale: D3.Scale.GenericScale<any>, minInterval?: number): number[];
        function normalizeLinearDomain(domain: NumberRange): NumberRange;
        function getMargin(availableWidth: number, availableHeight: number, xMargin: number, yMargin: number): IMargin;
        function getTickLabelMargins(viewport: IViewport, yMarginLimit: number, textWidthMeasurer: ITextAsSVGMeasurer, textHeightMeasurer: ITextAsSVGMeasurer, axes: CartesianAxisProperties, bottomMarginLimit: number, properties: TextProperties, scrollbarVisible?: boolean, showOnRight?: boolean, renderXAxis?: boolean, renderY1Axis?: boolean, renderY2Axis?: boolean): {
            xMax: number;
            yLeft: number;
            yRight: number;
        };
        function columnDataTypeHasValue(dataType: ValueType): boolean;
        function createOrdinalType(): ValueType;
        function isOrdinal(type: ValueType): boolean;
        function isOrdinalScale(scale: any): boolean;
        function isDateTime(type: ValueType): boolean;
        function invertScale(scale: any, x: any): any;
        function extent(scale: any): number[];
        function invertOrdinalScale(scale: D3.Scale.OrdinalScale, x: number): any;
        function getOrdinalScaleClosestDataPointIndex(scale: D3.Scale.OrdinalScale, x: number): number;
        function diffScaled(scale: D3.Scale.GenericScale<any>, value1: any, value2: any): number;
        function createDomain(data: CartesianSeries[], axisType: ValueType, isScalar: boolean, forcedScalarDomain: any[]): number[];
        function ensureValuesInRange(values: number[], min: number, max: number): number[];
        /**
         * Gets the ValueType of a category column, defaults to Text if the type is not present.
         */
        function getCategoryValueType(metadataColumn: DataViewMetadataColumn, isScalar?: boolean): ValueType;
        /**
         * Create a D3 axis including scale. Can be vertical or horizontal, and either datetime, numeric, or text.
         * @param options The properties used to create the axis.
         */
        function createAxis(options: CreateAxisOptions): IAxisProperties;
        function createScale(options: CreateAxisOptions): CreateScaleResult;
        /**
         * Format the linear tick labels or the category labels.
         */
        function formatAxisTickValues(axis: D3.Svg.Axis, tickValues: any[], formatter: IValueFormatter, dataType: ValueType, isScalar: boolean, getValueFn?: (index: number, type: ValueType) => any): any[];
        function getMinTickValueInterval(formatString: string, columnType: ValueType): number;
        /**
         * Creates a [min,max] from your Cartiesian data values.
         *
         * @param data The series array of CartesianDataPoints.
         * @param includeZero Columns and bars includeZero, line and scatter do not.
         */
        function createValueDomain(data: CartesianSeries[], includeZero: boolean): number[];
        module LabelLayoutStrategy {
            function willLabelsFit(axisProperties: IAxisProperties, availableWidth: number, textMeasurer: ITextAsSVGMeasurer, properties: TextProperties): boolean;
            function willLabelsWordBreak(axisProperties: IAxisProperties, availableWidth: number, textWidthMeasurer: ITextAsSVGMeasurer, properties: TextProperties): boolean;
            var DefaultRotation: {
                sine: number;
                cosine: number;
                tangent: number;
                transform: string;
                dy: string;
            };
            var DefaultRotationWithScrollbar: {
                sine: number;
                cosine: number;
                tangent: number;
                transform: string;
                dy: string;
            };
            function rotate(text: D3.Selection, maxBottomMargin: number, svgEllipsis: (textElement: SVGTextElement, maxWidth: number) => void, needRotate: boolean, needEllipsis: boolean, axisProperties: IAxisProperties, margin: IMargin, scrollbarVisible: boolean): void;
            function wordBreak(text: D3.Selection, axisProperties: IAxisProperties, maxHeight: number): void;
            function clip(text: D3.Selection, availableWidth: number, svgEllipsis: (textElement: SVGTextElement, maxWidth: number) => void): void;
        }
        module ToolTip {
            function createCallout(): JQuery;
            function clearCallout(callout: JQuery): void;
            function renderCallout(callout: JQuery, x: number, rangeEnd: number, leftMargin: number): void;
        }
        function createOrdinalScale(pixelSpan: number, dataDomain: any[], outerPaddingRatio?: number): D3.Scale.OrdinalScale;
        function isLogScalePossible(domain: any[], axisType?: ValueType): boolean;
        function createNumericalScale(axisScaleType: string, pixelSpan: number, dataDomain: any[], dataType: ValueType, outerPadding?: number, niceCount?: number): D3.Scale.GenericScale<any>;
        function createLinearScale(pixelSpan: number, dataDomain: any[], outerPadding?: number, niceCount?: number): D3.Scale.LinearScale;
        function getRangeForColumn(sizeColumn: DataViewValueColumn): NumberRange;
        /**
         * Set customized domain, but don't change when nothing is set
         */
        function applyCustomizedDomain(customizedDomain: any, forcedDomain: any[]): any[];
        /**
         * Combine the forced domain with the actual domain if one of the values was set.
         */
        function combineDomain(forcedDomain: any[], domain: any[]): any[];
        function createAxisLabel(properties: DataViewObject, label: string, unitType: string): string;
        function scaleShouldClamp(combinedDomain: any[], domain: any[]): boolean;
        function normalizeNonFiniteNumber(value: number): number;
        function powerOfTen(d: any): boolean;
    }
}
declare module powerbi.visuals {
    module shapeFactory {
        class ShapeFactoryConsts {
            static PaddingConstValue: number;
            static SmallPaddingConstValue: number;
            static OvalRadiusConst: number;
            static OvalRadiusConstPadding: number;
            static VisualVCHeader: number;
        }
        function createRectangle(data: BasicShapeData, viewportHeight: number, viewportWidth: number, selectedElement: D3.Selection): void;
        /** this function creates a oval svg   */
        function createOval(data: BasicShapeData, viewportHeight: number, viewportWidth: number, selectedElement: D3.Selection): void;
        /** this function creates a line svg   */
        function createLine(data: BasicShapeData, viewportHeight: number, viewportWidth: number, selectedElement: D3.Selection): void;
        /** this function creates a arrow svg   */
        function createUpArrow(data: BasicShapeData, viewportHeight: number, viewportWidth: number, selectedElement: D3.Selection): void;
        /** this function creates a triangle svg   */
        function createTriangle(data: BasicShapeData, viewportHeight: number, viewportWidth: number, selectedElement: D3.Selection): void;
    }
}
declare module powerbi.visuals {
    module CartesianHelper {
        function getCategoryAxisProperties(dataViewMetadata: DataViewMetadata, axisTitleOnByDefault?: boolean): DataViewObject;
        function getValueAxisProperties(dataViewMetadata: DataViewMetadata, axisTitleOnByDefault?: boolean): DataViewObject;
        function isScalar(isScalar: boolean, xAxisCardProperties: DataViewObject): boolean;
    }
}
declare module powerbi.visuals {
    class ColorHelper {
        private fillProp;
        private defaultDataPointColor;
        private colors;
        private defaultColorScale;
        constructor(colors: IDataColorPalette, fillProp: DataViewObjectPropertyIdentifier, defaultDataPointColor?: string);
        /**
         * Gets the color for the given series value.
         * If no explicit color or default color has been set then the color is
         * allocated from the color scale for this series.
         */
        getColorForSeriesValue(objects: DataViewObjects, fieldIds: powerbi.data.SQExpr[], value: string): string;
        /**
         * Gets the color for the given measure.
         */
        getColorForMeasure(objects: DataViewObjects, measureKey: any): string;
        static normalizeSelector(selector: data.Selector, isSingleSeries?: boolean): data.Selector;
    }
}
declare module powerbi.visuals {
    module ColumnUtil {
        var DimmedOpacity: number;
        var DefaultOpacity: number;
        function getTickCount(min: number, max: number, valuesMetadata: DataViewMetadataColumn[], maxTickCount: number, is100Pct: boolean, forcedTickCount?: number): number;
        function applyUserMinMax(isScalar: boolean, dataView: DataViewCategorical, xAxisCardProperties: DataViewObject): DataViewCategorical;
        function transformDomain(dataView: DataViewCategorical, min: DataViewPropertyValue, max: DataViewPropertyValue): DataViewCategorical;
        function getCategoryAxis(data: ColumnChartData, size: number, layout: CategoryLayout, isVertical: boolean, forcedXMin?: DataViewPropertyValue, forcedXMax?: DataViewPropertyValue, axisScaleType?: string): IAxisProperties;
        function applyInteractivity(columns: D3.Selection, onDragStart: any): void;
        function getFillOpacity(selected: boolean, highlight: boolean, hasSelection: boolean, hasPartialHighlights: boolean): number;
        function getClosestColumnIndex(coordinate: number, columnsCenters: number[]): number;
        function setChosenColumnOpacity(mainGraphicsContext: D3.Selection, columnGroupSelector: string, selectedColumnIndex: number, lastColumnIndex: number): void;
        function drawSeries(data: ColumnChartData, graphicsContext: D3.Selection, axisOptions: ColumnAxisOptions): D3.UpdateSelection;
        function drawDefaultShapes(data: ColumnChartData, series: D3.UpdateSelection, layout: IColumnLayout, itemCS: ClassAndSelector, filterZeros: boolean): D3.UpdateSelection;
        function drawDefaultLabels(series: D3.UpdateSelection, context: D3.Selection, layout: ILabelLayout, viewPort: IViewport, isAnimator?: boolean, animationDuration?: number): D3.UpdateSelection;
        function normalizeInfinityInScale(scale: D3.Scale.GenericScale<any>): void;
        function calculatePosition(d: ColumnChartDataPoint, axisOptions: ColumnAxisOptions): number;
    }
    module ClusteredUtil {
        function createValueFormatter(valuesMetadata: DataViewMetadataColumn[], interval: number): IValueFormatter;
        function clearColumns(mainGraphicsContext: D3.Selection, itemCS: ClassAndSelector): void;
    }
    interface ValueMultiplers {
        pos: number;
        neg: number;
    }
    module StackedUtil {
        function getSize(scale: D3.Scale.GenericScale<any>, size: number): number;
        function calcValueDomain(data: ColumnChartSeries[], is100pct: boolean): NumberRange;
        function getValueAxis(data: ColumnChartData, is100Pct: boolean, size: number, scaleRange: number[], forcedTickCount?: number, forcedYDomain?: any[], axisScaleType?: string): IAxisProperties;
        function createValueFormatter(valuesMetadata: DataViewMetadataColumn[], is100Pct: boolean, interval: number): IValueFormatter;
        function getStackedMultiplier(dataView: DataViewCategorical, rowIdx: number, seriesCount: number, categoryCount: number, converterStrategy: IColumnChartConverterStrategy): ValueMultiplers;
        function clearColumns(mainGraphicsContext: D3.Selection, itemCS: ClassAndSelector): void;
    }
    class DataWrapper {
        private data;
        private isScalar;
        constructor(columnChartData: CartesianData, isScalar: boolean);
        lookupXValue(index: number, type: ValueType): any;
    }
}
declare module powerbi.visuals {
    interface PivotedCategoryInfo {
        categories?: any[];
        categoryFormatter?: IValueFormatter;
        categoryIdentities?: DataViewScopeIdentity[];
        categoryObjects?: DataViewObjects[];
    }
    module converterHelper {
        function categoryIsAlsoSeriesRole(dataView: DataViewCategorical, seriesRoleName: string, categoryRoleName: string): boolean;
        function getPivotedCategories(dataView: DataViewCategorical, formatStringProp: DataViewObjectPropertyIdentifier): PivotedCategoryInfo;
        function getSeriesName(source: DataViewMetadataColumn): string;
        function getFormattedLegendLabel(source: DataViewMetadataColumn, values: DataViewValueColumns, formatStringProp: DataViewObjectPropertyIdentifier): string;
        function createAxesLabels(categoryAxisProperties: DataViewObject, valueAxisProperties: DataViewObject, category: DataViewMetadataColumn, values: DataViewMetadataColumn[]): {
            xAxisLabel: any;
            yAxisLabel: any;
        };
    }
}
declare module powerbi.visuals {
    const enum PointLabelPosition {
        Above = 0,
        Below = 1,
    }
    interface PointDataLabelsSettings extends VisualDataLabelsSettings {
        position: PointLabelPosition;
    }
    interface VisualDataLabelsSettings {
        show: boolean;
        displayUnits?: number;
        showCategory?: boolean;
        position?: any;
        precision?: number;
        labelColor: string;
    }
    interface LabelEnabledDataPoint {
        labelX?: number;
        labelY?: number;
        labelFill?: string;
        labeltext?: string;
        labelFormatString?: string;
        isLabelInside?: boolean;
    }
    interface IColumnFormatterCache {
        [column: string]: IValueFormatter;
        defaultFormatter?: IValueFormatter;
    }
    interface IColumnFormatterCacheManager {
        cache: IColumnFormatterCache;
        getOrCreate: (formatString: string, labelSetting: VisualDataLabelsSettings, value2?: number) => IValueFormatter;
    }
    interface LabelPosition {
        y: (d: any, i: number) => number;
        x: (d: any, i: number) => number;
    }
    interface ILabelLayout {
        labelText: (d: any) => string;
        labelLayout: LabelPosition;
        filter: (d: any) => boolean;
        style: {};
    }
    interface DataLabelObject extends DataViewObject {
        show: boolean;
        color: Fill;
        labelDisplayUnits: number;
        labelPrecision?: number;
        labelPosition: any;
    }
    module dataLabelUtils {
        var labelMargin: number;
        var maxLabelWidth: number;
        var defaultColumnLabelMargin: number;
        var defaultColumnHalfLabelHeight: number;
        var LabelTextProperties: TextProperties;
        var defaultLabelColor: string;
        var defaultInsideLabelColor: string;
        var hundredPercentFormat: string;
        function getDefaultLabelSettings(show?: boolean, labelColor?: string, labelPrecision?: number): VisualDataLabelsSettings;
        function getDefaultTreemapLabelSettings(): VisualDataLabelsSettings;
        function getDefaultColumnLabelSettings(isLabelPositionInside: boolean): VisualDataLabelsSettings;
        function getDefaultPointLabelSettings(): PointDataLabelsSettings;
        function getDefaultDonutLabelSettings(): VisualDataLabelsSettings;
        function drawDefaultLabelsForDataPointChart(data: any[], context: D3.Selection, layout: ILabelLayout, viewport: IViewport, isAnimator?: boolean, animationDuration?: number): D3.UpdateSelection;
        /**
         * Note: Funnel chart uses animation and does not use collision detection.
         */
        function drawDefaultLabelsForFunnelChart(data: any[], context: D3.Selection, layout: ILabelLayout, isAnimator?: boolean, animationDuration?: number): D3.UpdateSelection;
        function drawDefaultLabelsForDonutChart(data: any[], context: D3.Selection, layout: ILabelLayout, viewport: IViewport, radius: number, arc: D3.Svg.Arc, outerArc: D3.Svg.Arc): void;
        function cleanDataLabels(context: D3.Selection, removeLines?: boolean): void;
        function setHighlightedLabelsOpacity(context: D3.Selection, hasSelection: boolean, hasHighlights: boolean): void;
        function getLabelFormattedText(label: string | number, maxWidth?: number, format?: string, formatter?: IValueFormatter): string;
        function getLabelLayoutXYForWaterfall(xAxisProperties: IAxisProperties, categoryWidth: number, yAxisProperties: IAxisProperties, dataDomain: number[]): LabelPosition;
        function doesDataLabelFitInShape(d: WaterfallChartDataPoint, yAxisProperties: IAxisProperties, layout: WaterfallLayout): boolean;
        function getMapLabelLayout(labelSettings: PointDataLabelsSettings): ILabelLayout;
        function getColumnChartLabelLayout(data: ColumnChartData, labelLayoutXY: any, isColumn: boolean, isHundredPercent: boolean, axisFormatter: IValueFormatter, axisOptions: ColumnAxisOptions, interactivityService: IInteractivityService, visualWidth?: number): ILabelLayout;
        function getColumnChartLabelFilter(d: ColumnChartDataPoint, hasSelection: boolean, hasHighlights: boolean, axisOptions: ColumnAxisOptions, visualWidth?: number): any;
        function getScatterChartLabelLayout(xScale: D3.Scale.GenericScale<any>, yScale: D3.Scale.GenericScale<any>, labelSettings: PointDataLabelsSettings, viewport: IViewport, sizeRange: NumberRange): ILabelLayout;
        function getLineChartLabelLayout(xScale: D3.Scale.GenericScale<any>, yScale: D3.Scale.GenericScale<any>, labelSettings: PointDataLabelsSettings, isScalar: boolean, axisFormatter: IValueFormatter): ILabelLayout;
        function getDonutChartLabelLayout(labelSettings: VisualDataLabelsSettings, radius: number, outerArc: D3.Svg.Arc, viewport: IViewport, value2: number): ILabelLayout;
        function getFunnelChartLabelLayout(data: FunnelData, axisOptions: FunnelAxisOptions, innerTextHeightDelta: number, textMinimumPadding: number, labelSettings: VisualDataLabelsSettings, currentViewport: IViewport): ILabelLayout;
        function enumerateDataLabels(dataLabelsSettings: VisualDataLabelsSettings, withPosition: boolean, withPrecision?: boolean, withDisplayUnit?: boolean, labelPositionObjects?: string[]): VisualObjectInstance[];
        function enumerateCategoryLabels(dataLabelsSettings: VisualDataLabelsSettings, withFill: boolean, isDonutChart?: boolean, isTreeMap?: boolean): VisualObjectInstance[];
        function getDefaultFunnelLabelSettings(): VisualDataLabelsSettings;
        function createColumnFormatterCacheManager(): IColumnFormatterCacheManager;
    }
}
declare module powerbi.visuals {
    module DataRoleHelper {
        function getMeasureIndexOfRole(grouped: DataViewValueColumnGroup[], roleName: string): number;
        function hasRole(column: DataViewMetadataColumn, name: string): boolean;
        function hasRoleInDataView(dataView: DataView, name: string): boolean;
    }
}
declare module powerbi.visuals {
    interface InteractivityVisitor {
        visitColumnChart(options: ColumnBehaviorOptions): any;
        visitDataDotChart(options: DataDotChartBehaviorOptions): any;
        visitDonutChart(options: DonutBehaviorOptions): any;
        visitFunnel(options: FunnelBehaviorOptions): any;
        visitLegend(options: LegendBehaviorOptions): any;
        visitMap(options: MapBehaviorOptions): any;
        visitScatterChart(options: ScatterBehaviorOptions): any;
        visitSlicer(options: SlicerBehaviorOptions, slicerSettings: SlicerSettings): any;
        visitTreemap(options: TreemapBehaviorOptions): any;
        visitWaterfallChart(options: WaterfallChartBehaviorOptions): any;
        visitLegend(options: LegendBehaviorOptions): any;
        visitLineChart(options: LineChartBehaviorOptions): any;
    }
    interface SelectableDataPoint {
        selected: boolean;
        identity: SelectionId;
    }
    module VisualInteractivityFactory {
        function buildInteractivityService(options: VisualInitOptions): IInteractivityService;
    }
}
declare module powerbi.visuals {
    import DataView = powerbi.DataView;
    function getInvalidValueWarnings(dataViews: DataView[], supportsNaN: boolean, supportsNegativeInfinity: boolean, supportsPositiveInfinity: boolean): IVisualWarning[];
}
declare module powerbi.visuals {
    interface IListView {
        data(data: any[], dataIdFunction: (d) => {}): IListView;
        rowHeight(rowHeight: number): IListView;
        viewport(viewport: IViewport): IListView;
        render(sizeChanged: boolean, resetScrollbarPosition?: boolean): void;
        empty(): void;
    }
    module ListViewFactory {
        function createHTMLListView(options: any): IListView;
        function createSVGListView(options: any): IListView;
    }
    interface ListViewOptions {
        enter: (selection: D3.Selection) => void;
        exit: (selection: D3.Selection) => void;
        update: (selection: D3.Selection) => void;
        loadMoreData: () => void;
        baseContainer: D3.Selection;
        rowHeight: number;
        viewport: IViewport;
    }
}
declare module powerbi.visuals {
    import Selector = powerbi.data.Selector;
    import SelectorsByColumn = powerbi.SelectorsByColumn;
    import SelectorForColumn = powerbi.SelectorForColumn;
    /**
     * A combination of identifiers used to uniquely identify
     * data points and their bound geometry.
     */
    class SelectionId {
        private selector;
        private selectorsByColumn;
        private key;
        highlight: boolean;
        constructor(selector: Selector, highlight: boolean);
        equals(other: SelectionId): boolean;
        /**
         * Checks equality against other for all identifiers existing in this.
         */
        includes(other: SelectionId, ignoreHighlight?: boolean): boolean;
        getKey(): string;
        /**
         * Temporary workaround since a few things currently rely on this, but won't need to.
         */
        hasIdentity(): boolean;
        getSelector(): Selector;
        getSelectorsByColumn(): SelectorsByColumn;
        static createNull(highlight?: boolean): SelectionId;
        static createWithId(id: DataViewScopeIdentity, highlight?: boolean): SelectionId;
        static createWithMeasure(measureId: string, highlight?: boolean): SelectionId;
        static createWithIdAndMeasure(id: DataViewScopeIdentity, measureId: string, highlight?: boolean): SelectionId;
        static createWithIdAndMeasureAndCategory(id: DataViewScopeIdentity, measureId: string, queryName: string, highlight?: boolean): SelectionId;
        static createWithIds(id1: DataViewScopeIdentity, id2: DataViewScopeIdentity, highlight?: boolean): SelectionId;
        static createWithIdsAndMeasure(id1: DataViewScopeIdentity, id2: DataViewScopeIdentity, measureId: string, highlight?: boolean): SelectionId;
        static createWithSelectorForColumnAndMeasure(dataMap: SelectorForColumn, measureId: string, highlight?: boolean): SelectionId;
        static createWithHighlight(original: SelectionId): SelectionId;
        private static idArray(id1, id2);
    }
    /**
     * This class is designed to simplify the creation of SelectionId objects
     * It allows chaining to build up an object before calling 'create' to build a SelectionId
     */
    class SelectionIdBuilder {
        private dataMap;
        private measure;
        static builder(): SelectionIdBuilder;
        withCategory(categoryColumn: DataViewCategoryColumn, index: number): SelectionIdBuilder;
        withSeries(seriesColumn: DataViewValueColumns, valueColumn: DataViewValueColumn | DataViewValueColumnGroup): SelectionIdBuilder;
        withMeasure(measureId: string): SelectionIdBuilder;
        createSelectionId(): SelectionId;
        private ensureDataMap();
    }
}
declare module powerbi.visuals {
    interface SelectionManagerOptions {
        hostServices: IVisualHostServices;
    }
    class SelectionManager {
        private selectors;
        private hostServices;
        constructor(options: SelectionManagerOptions);
        select(selector: powerbi.data.Selector, multiSelect?: boolean): JQueryDeferred<data.Selector[]>;
        hasSelection(): boolean;
        clear(): JQueryDeferred<{}>;
        private selectInternal(selector, multiSelect);
        static containsSelection(list: data.Selector[], selector: data.Selector): boolean;
    }
}
declare module powerbi.visuals {
    module shapes {
        interface IPoint {
            x: number;
            y: number;
        }
        module Point {
            function offset(point: IPoint, offsetX: number, offsetY: number): IPoint;
            function equals(point: IPoint, other: IPoint): boolean;
            function clone(point: IPoint): IPoint;
            function toString(point: IPoint): string;
            function serialize(point: IPoint): string;
            function getDistance(point: IPoint, other: IPoint): number;
            function equalWithPrecision(point1: IPoint, point2: IPoint): boolean;
            function parsePoint(value: any, defaultValue?: IPoint): IPoint;
        }
        interface ISize {
            width: number;
            height: number;
        }
        module Size {
            function isEmpty(size: ISize): boolean;
            function equals(size: ISize, other: ISize): boolean;
            function clone(size: ISize): ISize;
            function inflate(size: ISize, padding: IThickness): ISize;
            function deflate(size: ISize, padding: IThickness): ISize;
            function combine(size: ISize, other: ISize): ISize;
            function toRect(size: ISize): IRect;
            function toString(size: ISize): string;
            function equal(size1: ISize, size2: ISize): boolean;
            function equalWithPrecision(size1: ISize, size2: ISize): boolean;
            function parseSize(value: any, defaultValue?: ISize): ISize;
        }
        interface IRect {
            left: number;
            top: number;
            width: number;
            height: number;
        }
        module Rect {
            function getOffset(rect: IRect): IPoint;
            function getSize(rect: IRect): ISize;
            function setSize(rect: IRect, value: ISize): void;
            function right(rect: IRect): number;
            function bottom(rect: IRect): number;
            function topLeft(rect: IRect): IPoint;
            function topRight(rect: IRect): IPoint;
            function bottomLeft(rect: IRect): IPoint;
            function bottomRight(rect: IRect): IPoint;
            function equals(rect: IRect, other: IRect): boolean;
            function clone(rect: IRect): IRect;
            function toString(rect: IRect): string;
            function offset(rect: IRect, offsetX: number, offsetY: number): IRect;
            function inflate(rect: IRect, padding: IThickness): IRect;
            function deflate(rect: IRect, padding: IThickness): IRect;
            function inflateBy(rect: IRect, padding: number): IRect;
            function deflateBy(rect: IRect, padding: number): IRect;
            /**
             * Get closest point.
             *
             * @return the closest point on the rect to the (x,y) point given.
             * In case the (x,y) given is inside the rect, (x,y) will be returned.
             * Otherwise, a point on a border will be returned.
             */
            function getClosestPoint(rect: IRect, x: number, y: number): IPoint;
            function equal(rect1: IRect, rect2: IRect): boolean;
            function equalWithPrecision(rect1: IRect, rect2: IRect): boolean;
            function isEmpty(rect: IRect): boolean;
            function containsPoint(rect: IRect, point: IPoint): boolean;
            function isIntersecting(rect1: IRect, rect2: IRect): boolean;
            function intersect(rect1: IRect, rect2: IRect): IRect;
            function combine(rect1: IRect, rect2: IRect): IRect;
            function parseRect(value: any, defaultValue?: IRect): IRect;
        }
        interface IThickness {
            top: number;
            left: number;
            right: number;
            bottom: number;
        }
        module Thickness {
            function inflate(thickness: IThickness, other: IThickness): IThickness;
            function getWidth(thickness: IThickness): number;
            function getHeight(thickness: IThickness): number;
            function clone(thickness: IThickness): IThickness;
            function equals(thickness: IThickness, other: IThickness): boolean;
            function flipHorizontal(thickness: IThickness): void;
            function flipVertical(thickness: IThickness): void;
            function toString(thickness: IThickness): string;
            function toCssString(thickness: IThickness): string;
            function isEmpty(thickness: IThickness): boolean;
            function equal(thickness1: IThickness, thickness2: IThickness): boolean;
            function equalWithPrecision(thickness1: IThickness, thickness2: IThickness): boolean;
            function parseThickness(value: any, defaultValue?: IThickness, resetValue?: any): IThickness;
        }
        interface IVector {
            x: number;
            y: number;
        }
        module Vector {
            function isEmpty(vector: IVector): boolean;
            function equals(vector: IVector, other: IPoint): boolean;
            function clone(vector: IVector): IVector;
            function toString(vector: IVector): string;
            function getLength(vector: IVector): number;
            function getLengthSqr(vector: IVector): number;
            function scale(vector: IVector, scalar: number): IVector;
            function normalize(vector: IVector): IVector;
            function rotate90DegCW(vector: IVector): IVector;
            function rotate90DegCCW(vector: IVector): IVector;
            function rotate(vector: IVector, angle: number): IVector;
            function equal(vector1: IVector, vector2: IVector): boolean;
            function equalWithPrecision(vector1: IVector, vector2: IVector): boolean;
            function add(vect1: IVector, vect2: IVector): IVector;
            function subtract(vect1: IVector, vect2: IVector): IVector;
            function dotProduct(vect1: IVector, vect2: IVector): number;
            function getDeltaVector(p0: IPoint, p1: IPoint): IVector;
        }
    }
}
declare module powerbi.visuals {
    /**
     * Contains functions/constants to aid in SVG manupilation.
     */
    module SVGUtil {
        /**
         * Very small values, when stringified, may be converted to scientific notation and cause a temporarily
         * invalid attribute or style property value.
         * For example, the number 0.0000001 is converted to the string "1e-7".
         * This is particularly noticeable when interpolating opacity values.
         * To avoid scientific notation, start or end the transition at 1e-6,
         * which is the smallest value that is not stringified in exponential notation.
         */
        var AlmostZero: number;
        /**
         * Creates a translate string for use with the SVG transform call.
         */
        function translate(x: number, y: number): string;
        /**
         * Creates a translateX string for use with the SVG transform call.
         */
        function translateXWithPixels(x: number): string;
        function translateWithPixels(x: number, y: number): string;
        /**
         * Creates a translate + rotate string for use with the SVG transform call.
         */
        function translateAndRotate(x: number, y: number, px: number, py: number, angle: number): string;
        /**
         * Forces all D3 transitions to complete.
         * Normally, zero-delay transitions are executed after an instantaneous delay (<10ms).
         * This can cause a brief flicker if the browser renders the page twice: once at the end of the first event loop,
         * then again immediately on the first timer callback. By flushing the timer queue at the end of the first event loop,
         * you can run any zero-delay transitions immediately and avoid the flicker.
         *
         * These flickers are noticable on IE, and with a large number of webviews(not recommend you ever do this) on iOS.
         */
        function flushAllD3Transitions(): void;
        /**
         * Wrapper for flushAllD3Transitions.
         */
        function flushAllD3TransitionsIfNeeded(options: VisualInitOptions | AnimationOptions): void;
        /**
         * There is a known bug in IE10 that causes cryptic crashes for SVG elements with a null 'd' attribute:
         * https://github.com/mbostock/d3/issues/1737
         */
        function ensureDAttribute(pathElement: D3.D3Element): void;
        /**
         * In IE10, it is possible to return SVGPoints with NaN members.
         */
        function ensureValidSVGPoint(point: SVGPoint): void;
        /**
         * Parse the Transform string with value 'translate(x,y)'.
         * In Chrome for the translate(position) string the delimiter
         * is a comma and in IE it is a spaceso checking for both.
         */
        function parseTranslateTransform(input: string): {
            x: string;
            y: string;
        };
        /**
         * Appends 'px' to the end of number value for use as pixel string in styles.
         */
        function convertToPixelString(value: number): string;
        /**
         * Create an arrow.
         */
        function createArrow(width: number, height: number, rotate: number): {
            path: string;
            transform: string;
        };
    }
}
declare module powerbi.visuals {
    /**
     * Contains functions/constants to aid in text manupilation.
     */
    module TextUtil {
        /**
         * Remove breaking spaces from given string and replace by none breaking space (&nbsp).
         */
        function removeBreakingSpaces(str: string): string;
    }
}
declare module powerbi.visuals {
    module UrlHelper {
        function isValidUrl(columnItem: DataViewMetadataColumn, value: string): boolean;
    }
}
declare module powerbi.visuals {
    interface GradientSettings {
        diverging: boolean;
        minColor: any;
        midColor?: any;
        maxColor: any;
        minValue?: number;
        midValue?: number;
        maxValue?: number;
    }
    module GradientUtils {
        import DataViewObjectPropertyDefinition = powerbi.data.DataViewObjectPropertyDefinition;
        function getFillRuleRole(objectDescs: powerbi.data.DataViewObjectDescriptors): string;
        function shouldShowGradient(visualConfig: any): boolean;
        function getUpdatedGradientSettings(gradientObject: data.DataViewObjectDefinitions): GradientSettings;
        function getGradientMeasureIndex(dataViewCategorical: DataViewCategorical): number;
        function hasGradientRole(dataViewCategorical: DataViewCategorical): boolean;
        function getDefaultGradientSettings(): GradientSettings;
        function getDefaultFillRuleDefinition(): DataViewObjectPropertyDefinition;
        function updateFillRule(propertyName: string, propertyValue: any, definitions: powerbi.data.DataViewObjectDefinitions): void;
        function getGradientSettings(baseFillRule: FillRuleDefinition): GradientSettings;
        function getFillRule(objectDefinitions: data.DataViewObjectDefinitions): FillRuleDefinition;
        function getGradientSettingsFromRule(fillRule: FillRuleDefinition): GradientSettings;
    }
}
declare module powerbi.visuals {
    module visualBackgroundHelper {
        function getDefaultColor(): string;
        function getDefaultTransparency(): number;
        function getDefaultShow(): boolean;
        function getDefaultValues(): {
            color: string;
            transparency: number;
            show: boolean;
        };
    }
}
declare module powerbi {
    import shapes = powerbi.visuals.shapes;
    /** Defines possible content positions.  */
    enum ContentPositions {
        /** Content position is not defined. */
        None = 0,
        /** Content aligned top left. */
        TopLeft = 1,
        /** Content aligned top center. */
        TopCenter = 2,
        /** Content aligned top right. */
        TopRight = 4,
        /** Content aligned middle left. */
        MiddleLeft = 8,
        /** Content aligned middle center. */
        MiddleCenter = 16,
        /** Content aligned middle right. */
        MiddleRight = 32,
        /** Content aligned bottom left. */
        BottomLeft = 64,
        /** Content aligned bottom center. */
        BottomCenter = 128,
        /** Content aligned bottom right. */
        BottomRight = 256,
        /** Content is placed inside the bounding rectangle in the center. */
        InsideCenter = 512,
        /** Content is placed inside the bounding rectangle at the base. */
        InsideBase = 1024,
        /** Content is placed inside the bounding rectangle at the end. */
        InsideEnd = 2048,
        /** Content is placed outside the bounding rectangle at the base. */
        OutsideBase = 4096,
        /** Content is placed outside the bounding rectangle at the end. */
        OutsideEnd = 8192,
        /** Content supports all possible positions. */
        All = 16383,
    }
    /**
    * Rectangle orientation. Rectangle orientation is used to define vertical or horizontal orientation
    * and starting/ending side of the rectangle.
    */
    enum RectOrientation {
        /** Rectangle with no specific orientation. */
        None = 0,
        /** Vertical rectangle with base at the bottom. */
        VerticalBottomTop = 1,
        /** Vertical rectangle with base at the top. */
        VerticalTopBottom = 2,
        /** Horizontal rectangle with base at the left. */
        HorizontalLeftRight = 3,
        /** Horizontal rectangle with base at the right. */
        HorizontalRightLeft = 4,
    }
    /**
    * Defines if panel elements are allowed to be positioned
    * outside of the panel boundaries.
    */
    enum OutsidePlacement {
        /** Elements can be positioned outside of the panel. */
        Allowed = 0,
        /** Elements can not be positioned outside of the panel. */
        Disallowed = 1,
        /** Elements can be partially outside of the panel. */
        Partial = 2,
    }
    /**
    * Defines an interface for information needed for default label positioning. Used in DataLabelsPanel.
    * Note the question marks: none of the elements are mandatory.
    */
    interface IDataLabelSettings {
        /** Distance from the anchor point. */
        anchorMargin?: number;
        /** Orientation of the anchor rectangle. */
        anchorRectOrientation?: RectOrientation;
        /** Preferable position for the label.  */
        contentPosition?: ContentPositions;
        /** Defines the rules if the elements can be positioned outside panel bounds. */
        outsidePlacement?: OutsidePlacement;
        /** Defines the valid positions if repositionOverlapped is true. */
        validContentPositions?: ContentPositions;
        /** Defines maximum moving distance to reposition an element. */
        minimumMovingDistance?: number;
        /** Defines minimum moving distance to reposition an element. */
        maximumMovingDistance?: number;
        /** Opacity effect of the label. Use it for dimming.  */
        opacity?: number;
    }
    /**
    * Defines an interface for information needed for label positioning.
    * None of the elements are mandatory, but at least anchorPoint OR anchorRect is needed.
    */
    interface IDataLabelInfo extends IDataLabelSettings {
        /** The point to which label is anchored.  */
        anchorPoint?: shapes.IPoint;
        /** The rectangle to which label is anchored. */
        anchorRect?: shapes.IRect;
        /** Disable label rendering and processing. */
        hideLabel?: boolean;
        /**
        * Defines the visibility rank. This will not be processed by arrange phase,
        * but can be used for preprocessing the hideLabel value.
        */
        visibilityRank?: number;
        /** Defines the starting offset from AnchorRect. */
        offset?: number;
        /** Defines the callout line data. It is calculated and used during processing. */
        callout?: {
            start: shapes.IPoint;
            end: shapes.IPoint;
        };
        /** Source of the label. */
        source?: any;
        size?: shapes.ISize;
    }
    /**  Interface for label rendering. */
    interface IDataLabelRenderer {
        renderLabelArray(labels: IArrangeGridElementInfo[]): void;
    }
    /** Interface used in internal arrange structures. */
    interface IArrangeGridElementInfo {
        element: IDataLabelInfo;
        rect: shapes.IRect;
    }
    /**
    * Arranges label elements using the anchor point or rectangle. Collisions
    * between elements can be automatically detected and as a result elements
    * can be repositioned or get hidden.
    */
    class DataLabelManager {
        movingStep: number;
        hideOverlapped: boolean;
        static DefaultAnchorMargin: number;
        static DefaultMaximumMovingDistance: number;
        static DefaultMinimumMovingDistance: number;
        static InflateAmount: number;
        private _defaultSettings;
        /**
        * Initializes a new instance of the DataLabelsPanel class.
        * @constructor
        */
        constructor();
        defaultSettings: IDataLabelSettings;
        /** Arranges the lables position and visibility*/
        hideCollidedLabels(viewport: IViewport, data: any[], layout: any, addTransform?: boolean): powerbi.visuals.LabelEnabledDataPoint[];
        /**
         * Merges the label element info with the panel element info and returns correct label info.
         * @param source The label info.
         */
        getLabelInfo(source: IDataLabelInfo): IDataLabelInfo;
        /**
        * (Private) Calculates element position using anchor point..
        */
        private calculateContentPositionFromPoint(anchorPoint, contentPosition, contentSize, offset);
        /** (Private) Calculates element position using anchor rect. */
        private calculateContentPositionFromRect(anchorRect, anchorRectOrientation, contentPosition, contentSize, offset);
        /** (Private) Calculates element inside center position using anchor rect. */
        private handleInsideCenterPosition(anchorRectOrientation, contentSize, anchorRect, offset);
        /** (Private) Calculates element inside end position using anchor rect. */
        private handleInsideEndPosition(anchorRectOrientation, contentSize, anchorRect, offset);
        /** (Private) Calculates element inside base position using anchor rect. */
        private handleInsideBasePosition(anchorRectOrientation, contentSize, anchorRect, offset);
        /** (Private) Calculates element outside end position using anchor rect. */
        private handleOutsideEndPosition(anchorRectOrientation, contentSize, anchorRect, offset);
        /** (Private) Calculates element outside base position using anchor rect. */
        private handleOutsideBasePosition(anchorRectOrientation, contentSize, anchorRect, offset);
        /**  (Private) Calculates element position. */
        private calculateContentPosition(anchoredElementInfo, contentPosition, contentSize, offset);
        /** (Private) Check for collisions. */
        private hasCollisions(arrangeGrid, info, position, size);
        static isValid(rect: shapes.IRect): boolean;
    }
    /**
    * Utility class to speed up the conflict detection by collecting the arranged items in the DataLabelsPanel.
    */
    class DataLabelArrangeGrid {
        private _grid;
        private _cellSize;
        private _rowCount;
        private _colCount;
        private static ARRANGEGRID_MIN_COUNT;
        private static ARRANGEGRID_MAX_COUNT;
        /**
         * Creates new ArrangeGrid.
         * @param size The available size
         */
        constructor(size: shapes.ISize, elements: any[], layout: powerbi.visuals.ILabelLayout);
        /**
         * Register a new label element.
         * @param element The label element to register.
         * @param rect The label element position rectangle.
         */
        add(element: IDataLabelInfo, rect: shapes.IRect): void;
        /**
         * Checks for conflict of given rectangle in registered elements.
         * @param rect The rectengle to check.
         * @return True if conflict is detected.
         */
        hasConflict(rect: shapes.IRect): boolean;
        /**
         * Calculates the number of rows or columns in a grid
         * @param step is the largest label size (width or height)
         * @param length is the grid size (width or height)
         * @param minCount is the minimum allowed size
         * @param maxCount is the maximum allowed size
         * @return the number of grid rows or columns
         */
        private getGridRowColCount(step, length, minCount, maxCount);
        /**
         * Returns the grid index of a given recangle
         * @param rect The rectengle to check.
         * @return grid index as a thickness object.
         */
        private getGridIndexRect(rect);
    }
}
declare module powerbi {
    /** Repreasents the sequence of the dates/times */
    class DateTimeSequence {
        private static MIN_COUNT;
        private static MAX_COUNT;
        min: Date;
        max: Date;
        unit: DateTimeUnit;
        sequence: Date[];
        interval: number;
        intervalOffset: number;
        /** Creates new instance of the DateTimeSequence */
        constructor(unit: DateTimeUnit);
        /**
         * Add a new Date to a sequence.
         * @param date - date to add
         */
        add(date: Date): void;
        /**
         * Extends the sequence to cover new date range
         * @param min - new min to be covered by sequence
         * @param max - new max to be covered by sequence
         */
        extendToCover(min: Date, max: Date): void;
        /**
         * Move the sequence to cover new date range
         * @param min - new min to be covered by sequence
         * @param max - new max to be covered by sequence
         */
        moveToCover(min: Date, max: Date): void;
        /**
         * Calculate a new DateTimeSequence
         * @param dataMin - Date representing min of the data range
         * @param dataMax - Date representing max of the data range
         * @param expectedCount - expected number of intervals in the sequence
         * @param unit - of the intervals in the sequence
         */
        static calculate(dataMin: Date, dataMax: Date, expectedCount: number, unit?: DateTimeUnit): DateTimeSequence;
        static calculateYears(dataMin: Date, dataMax: Date, expectedCount: number): DateTimeSequence;
        static calculateMonths(dataMin: Date, dataMax: Date, expectedCount: number): DateTimeSequence;
        static calculateWeeks(dataMin: Date, dataMax: Date, expectedCount: number): DateTimeSequence;
        static calculateDays(dataMin: Date, dataMax: Date, expectedCount: number): DateTimeSequence;
        static calculateHours(dataMin: Date, dataMax: Date, expectedCount: number): DateTimeSequence;
        static calculateMinutes(dataMin: Date, dataMax: Date, expectedCount: number): DateTimeSequence;
        static calculateSeconds(dataMin: Date, dataMax: Date, expectedCount: number): DateTimeSequence;
        static calculateMilliseconds(dataMin: Date, dataMax: Date, expectedCount: number): DateTimeSequence;
        private static fromNumericSequence(date, sequence, unit);
        private static addInterval(value, interval, unit);
        private static getDelta(min, max, unit);
        static getIntervalUnit(min: Date, max: Date, maxCount: number): DateTimeUnit;
    }
    /** DateUtils module provides DateTimeSequence with set of additional date manipulation routines */
    module DateUtils {
        /**
         * Adds a specified number of years to the provided date.
         * @param date - date value
         * @param yearDelta - number of years to add
         */
        function addYears(date: Date, yearDelta: number): Date;
        /**
         * Adds a specified number of months to the provided date.
         * @param date - date value
         * @param monthDelta - number of months to add
         */
        function addMonths(date: Date, monthDelta: number): Date;
        /**
         * Adds a specified number of weeks to the provided date.
         * @param date - date value
         * @param weeks - number of weeks to add
         */
        function addWeeks(date: Date, weeks: number): Date;
        /**
         * Adds a specified number of days to the provided date.
         * @param date - date value
         * @param days - number of days to add
         */
        function addDays(date: Date, days: number): Date;
        /**
         * Adds a specified number of hours to the provided date.
         * @param date - date value
         * @param hours - number of hours to add
         */
        function addHours(date: Date, hours: number): Date;
        /**
         * Adds a specified number of minutes to the provided date.
         * @param date - date value
         * @param minutes - number of minutes to add
         */
        function addMinutes(date: Date, minutes: number): Date;
        /**
         * Adds a specified number of seconds to the provided date.
         * @param date - date value
         * @param seconds - number of seconds to add
         */
        function addSeconds(date: Date, seconds: number): Date;
        /**
         * Adds a specified number of milliseconds to the provided date.
         * @param date - date value
         * @param milliseconds - number of milliseconds to add
         */
        function addMilliseconds(date: Date, milliseconds: number): Date;
    }
}
declare module powerbi {
    class DisplayUnit {
        value: number;
        title: string;
        labelFormat: string;
        applicableRangeMin: number;
        applicableRangeMax: number;
        project(value: number): number;
        reverseProject(value: number): number;
        isApplicableTo(value: number): boolean;
        isScaling(): boolean;
    }
    class DisplayUnitSystem {
        static UNSUPPORTED_FORMATS: RegExp;
        static NUMBER_FORMAT: RegExp;
        units: DisplayUnit[];
        displayUnit: DisplayUnit;
        private _unitBaseValue;
        constructor(units?: DisplayUnit[]);
        title: string;
        update(value: number): void;
        private findApplicableDisplayUnit(value);
        format(value: number, format: string, decimals?: number, trailingZeros?: boolean): string;
        isScalingUnit(): boolean;
        private formatHelper(value, projectedValue, nonScientificFormat, format, decimals?, trailingZeros?);
        private static getNonScientificFormatWithPrecision(baseFormat?, decimals?);
        private static getFormatWithPrecision(decimals?);
        /** Formats a single value by choosing an appropriate base for the DisplayUnitSystem before formatting. */
        formatSingleValue(value: number, format: string, decimals?: number): string;
        private shouldUseValuePrecision(value);
        private removeFractionIfNecessary(formatString);
    }
    /** Provides a unit system that is defined by formatting in the model, and is suitable for visualizations shown in single number visuals in explore mode. */
    class NoDisplayUnitSystem extends DisplayUnitSystem {
        constructor();
    }
    /** Provides a unit system that creates a more concise format for displaying values. This is suitable for most of the cases where
        we are showing values (chart axes) and as such it is the default unit system. */
    class DefaultDisplayUnitSystem extends DisplayUnitSystem {
        private static _units;
        private static _scientificBigNumbersBoundary;
        constructor(unitLookup: (exponent: number) => DisplayUnitSystemNames);
        format(data: number, format: string, decimals?: number, trailingZeros?: boolean): string;
        private isScientific(value);
        static reset(): void;
        private static getUnits(unitLookup);
    }
    /** Provides a unit system that creates a more concise format for displaying values, but only allows showing a unit if we have at least
        one of those units (e.g. 0.9M is not allowed since it's less than 1 million). This is suitable for cases such as dashboard tiles
        where we have restricted space but do not want to show partial units. */
    class WholeUnitsDisplayUnitSystem extends DisplayUnitSystem {
        private static _units;
        constructor(unitLookup: (exponent: number) => DisplayUnitSystemNames);
        static reset(): void;
        private static getUnits(unitLookup);
    }
    class DataLabelsDisplayUnitSystem extends DisplayUnitSystem {
        private static _units;
        constructor(unitLookup: (exponent: number) => DisplayUnitSystemNames);
        private static getUnits(unitLookup);
    }
    interface DisplayUnitSystemNames {
        title: string;
        format: string;
    }
}
declare module powerbi {
    class NumericSequence {
        private static MIN_COUNT;
        private static MAX_COUNT;
        private _maxAllowedMargin;
        private _canExtendMin;
        private _canExtendMax;
        interval: number;
        intervalOffset: number;
        min: number;
        max: number;
        precision: number;
        sequence: number[];
        static calculate(range: NumericSequenceRange, expectedCount: number, maxAllowedMargin?: number, minPower?: number, useZeroRefPoint?: boolean, steps?: number[]): NumericSequence;
        /**
         * Calculates the sequence of int numbers which are mapped to the multiples of the units grid.
         * @min - The minimum of the range.
         * @max - The maximum of the range.
         * @maxCount - The max count of intervals.
         * @steps - array of intervals.
         */
        static calculateUnits(min: number, max: number, maxCount: number, steps: number[]): NumericSequence;
        trimMinMax(min: number, max: number): void;
    }
}
declare module powerbi {
    class NumericSequenceRange {
        private static DEFAULT_MAX;
        private static MIN_SUPPORTED_DOUBLE;
        private static MAX_SUPPORTED_DOUBLE;
        min: number;
        max: number;
        includeZero: boolean;
        forcedSingleStop: number;
        hasDataRange: boolean;
        hasFixedMin: boolean;
        hasFixedMax: boolean;
        private _ensureIncludeZero();
        private _ensureNotEmpty();
        private _ensureDirection();
        getSize(): number;
        shrinkByStep(range: NumericSequenceRange, step: number): void;
        static calculate(dataMin: number, dataMax: number, fixedMin?: number, fixedMax?: number, includeZero?: boolean): NumericSequenceRange;
        static calculateDataRange(dataMin: number, dataMax: number, includeZero?: boolean): NumericSequenceRange;
        static calculateFixedRange(fixedMin: number, fixedMax: number, includeZero?: boolean): NumericSequenceRange;
    }
    /** Note: Exported for testability */
    module ValueUtil {
        function hasValue(value: any): boolean;
    }
}
declare module powerbi.visuals {
    /**
     * Formats the value using provided format expression and culture
     * @param value - value to be formatted and converted to string.
     * @param format - format to be applied if the number shouldn't be abbreviated.
     * If the number should be abbreviated this string is checked for special characters like $ or % if any
     */
    interface ICustomValueFormatter {
        (value: any, format?: string): string;
    }
    interface ValueFormatterOptions {
        /** The format string to use. */
        format?: string;
        /** The data value. */
        value?: any;
        /** The data value. */
        value2?: any;
        /** The number of ticks. */
        tickCount?: any;
        /** The display unit system to use */
        displayUnitSystemType?: DisplayUnitSystemType;
        /** True if we are formatting single values in isolation (e.g. card), as opposed to multiple values with a common base (e.g. chart axes) */
        formatSingleValues?: boolean;
        /** True if we want to trim off unnecessary zeroes after the decimal and remove a space before the % symbol */
        allowFormatBeautification?: boolean;
        /** Specifies the maximum number of decimal places to show*/
        precision?: number;
        /** Specifies the column type of the data value */
        columnType?: ValueType;
    }
    interface IValueFormatter {
        format(value: any): string;
        displayUnit?: DisplayUnit;
    }
    /** Captures all locale-specific options used by the valueFormatter. */
    interface ValueFormatterLocalizationOptions {
        null: string;
        true: string;
        false: string;
        NaN: string;
        infinity: string;
        negativeInfinity: string;
        /** Returns a beautified form the given format string. */
        beautify(format: string): string;
        /** Returns an object describing the given exponent in the current language. */
        describe(exponent: number): DisplayUnitSystemNames;
        restatementComma: string;
        restatementCompoundAnd: string;
        restatementCompoundOr: string;
    }
    module valueFormatter {
        function getLocalizedString(stringId: string): string;
        function getFormatMetadata(format: string): powerbi.NumberFormat.NumericFormatMetadata;
        function setLocaleOptions(options: ValueFormatterLocalizationOptions): void;
        function createDefaultFormatter(formatString: string, allowFormatBeautification?: boolean): IValueFormatter;
        /** Creates an IValueFormatter to be used for a range of values. */
        function create(options: ValueFormatterOptions): IValueFormatter;
        function format(value: any, format?: string, allowFormatBeautification?: boolean): string;
        function formatRaw(value: any, format?: string): string;
        function getFormatString(column: DataViewMetadataColumn, formatStringProperty: DataViewObjectPropertyIdentifier, suppressTypeFallback?: boolean): string;
        /** The returned string will look like 'A, B, ..., and C'  */
        function formatListAnd(strings: string[]): string;
        /** The returned string will look like 'A, B, ..., or C' */
        function formatListOr(strings: string[]): string;
        function getDisplayUnits(displayUnitSystemType: DisplayUnitSystemType): DisplayUnit[];
    }
}
declare module powerbi.visuals {
    function createColorAllocatorFactory(): IColorAllocatorFactory;
}
declare module powerbi.visuals {
    class DefaultVisualHostServices implements IVisualHostServices {
        static initialize(): void;
        /**
         * Create locale options.
         *
         * Note: Public for testability.
         */
        static createLocaleOptions(): visuals.ValueFormatterLocalizationOptions;
        static createTooltipLocaleOptions(): powerbi.visuals.TooltipLocalizationOptions;
        getLocalizedString(stringId: string): string;
        onDragStart(): void;
        canSelect(): boolean;
        onSelect(): void;
        loadMoreData(): void;
        persistProperties(changes: VisualObjectInstance[]): void;
        onCustomSort(args: CustomSortEventArgs): void;
        getViewMode(): powerbi.ViewMode;
        setWarnings(warnings: IVisualWarning[]): void;
        setToolbar($toolbar: JQuery): void;
        private static beautify(format);
        private static describeUnit(exponent);
    }
    var defaultVisualHostServices: IVisualHostServices;
}
declare module powerbi.visuals {
    /**
     * Factory method to create an IInteractivityService instance.
     */
    function createInteractivityService(hostServices: IVisualHostServices): IInteractivityService;
    /**
     * Creates a clear an svg rect to catch clear clicks.
     */
    function appendClearCatcher(selection: D3.Selection): D3.Selection;
    function dataHasSelection(data: SelectableDataPoint[]): boolean;
    interface IInteractiveVisual {
        accept(visitor: InteractivityVisitor, options: any): void;
    }
    /**
     * Responsible for managing interactivity between the hosting visual and its peers.
     */
    interface IInteractivityService extends InteractivityVisitor {
        /** Clears the selection */
        clearSelection(): void;
        apply(visual: IInteractiveVisual, options: any): any;
        /** Sets the selected state on the given data points. */
        applySelectionStateToData(dataPoints: SelectableDataPoint[]): boolean;
        /** Checks whether there is at least one item selected */
        hasSelection(): boolean;
        /** Checks whether the selection mode is inverted or normal */
        isSelectionModeInverted?(): boolean;
    }
    class WebInteractivityService implements IInteractivityService {
        private hostService;
        private sendSelectionToVisual;
        private sendSelectionToLegend;
        private sendSelectionToSecondVisual;
        private selectedIds;
        private isInvertedSelectionMode;
        private behavior;
        private secondBehavior;
        selectableDataPoints: SelectableDataPoint[];
        selectableLegendDataPoints: SelectableDataPoint[];
        secondSelectableDataPoints: SelectableDataPoint[];
        private hasColumnChart;
        private mapPointerEventsDisabled;
        private mapPointerTimeoutSet;
        constructor(hostServices: IVisualHostServices);
        /**
         * Sets the selected state of all selectable data points to false and invokes the behavior's select command.
         */
        clearSelection(): void;
        /**
         * Checks whether there is at least one item selected.
         */
        hasSelection(): boolean;
        private legendHasSelection();
        isSelectionModeInverted(): boolean;
        /**
         * Marks a data point as selected and syncs selection with the host.
         */
        select(d: SelectableDataPoint, multiselect?: boolean): void;
        private removeId(toRemove);
        static isSelected(propertyId: DataViewObjectPropertyIdentifier, categories: DataViewCategoricalColumn, idx: number): boolean;
        /** Note: Public for UnitTesting */
        createPropertiesToHost(filterPropertyIdentifier: DataViewObjectPropertyIdentifier): VisualObjectInstance[];
        private sendPersistPropertiesToHost(filterPropertyIdentifier);
        private sendSelectToHost();
        private sendSelectionToHost(filterPropertyIdentifier?);
        private clearSelectionInternal();
        applySelectionStateToData(dataPoints: SelectableDataPoint[]): boolean;
        /**
         * Initialize the selection state based on the selection from the source.
         */
        private initAndSyncSelectionState(filterPropertyId?);
        /**
         * Syncs the selection state for all data points that have the same category. Returns
         * true if the selection state was out of sync and corrections were made; false if
         * the data is already in sync with the service.
         *
         * If the data is not compatible with the current service's current selection state,
         * the state is cleared and the cleared selection is sent to the host.
         *
         * Ignores series for now, since we don't support series selection at the moment.
         */
        private syncSelectionState(filterPropertyId?);
        private toggleSelectAll();
        private selectSlicerItem(d);
        private syncSelectedIds();
        private syncSlicerSelectionState();
        apply(visual: IInteractiveVisual, options: any): void;
        visitColumnChart(options: ColumnBehaviorOptions): void;
        visitLineChart(options: LineChartBehaviorOptions): void;
        private visitLineChartNoCombo(options);
        private visitLineChartCombo(options);
        visitDataDotChart(options: DataDotChartBehaviorOptions): void;
        visitDonutChart(options: DonutBehaviorOptions): void;
        visitFunnel(options: FunnelBehaviorOptions): void;
        visitScatterChart(options: ScatterBehaviorOptions): void;
        visitTreemap(options: TreemapBehaviorOptions): void;
        visitSlicer(options: SlicerBehaviorOptions, slicerSettings: SlicerSettings): void;
        visitWaterfallChart(options: WaterfallChartBehaviorOptions): void;
        visitMap(options: MapBehaviorOptions): void;
        visitLegend(options: LegendBehaviorOptions): void;
    }
    /**
     * A service for the mobile client to enable & route interactions.
     */
    class MobileInteractivityService implements IInteractivityService {
        private behavior;
        apply(visual: IInteractiveVisual, options: any): void;
        private makeDataPointsSelectable(...selection);
        private makeRootSelectable(selection);
        private makeDragable(...selection);
        clearSelection(): void;
        applySelectionStateToData(dataPoints: SelectableDataPoint[]): boolean;
        visitColumnChart(options: ColumnBehaviorOptions): void;
        visitLineChart(options: LineChartBehaviorOptions): void;
        visitDataDotChart(options: DataDotChartBehaviorOptions): void;
        visitDonutChart(options: DonutBehaviorOptions): void;
        visitFunnel(options: FunnelBehaviorOptions): void;
        visitScatterChart(options: ScatterBehaviorOptions): void;
        visitTreemap(options: TreemapBehaviorOptions): void;
        visitSlicer(options: SlicerBehaviorOptions, slicerSettings: SlicerSettings): void;
        visitWaterfallChart(options: WaterfallChartBehaviorOptions): void;
        visitMap(options: MapBehaviorOptions): void;
        visitLegend(options: LegendBehaviorOptions): void;
        /**
         * Checks whether there is at least one item selected.
         */
        hasSelection(): boolean;
        isSelectionModeInverted(): boolean;
    }
}
declare module powerbi.visuals.BI.Services {
    import GeocodeQuery = GeocodingManager.GeocodeQuery;
    import IGeocodeCoordinate = GeocodingManager.IGeocodeCoordinate;
    interface IGeocodingCache {
        getCoordinates(query: GeocodeQuery): IGeocodeCoordinate;
        registerCoordinates(query: GeocodeQuery, coordinate: IGeocodeCoordinate): void;
    }
    function createGeocodingCache(maxCacheSize: number, maxCacheSizeOverflow: number): IGeocodingCache;
}
declare module powerbi.visuals {
    interface IVisualPluginService {
        getPlugin(type: string): IVisualPlugin;
        getVisuals(): IVisualPlugin[];
        capabilities(type: string): VisualCapabilities;
    }
    interface MinervaVisualFeatureSwitches {
        heatMap?: boolean;
        /**
         * This feature switch enables the data-dot & column combo charts.
         */
        dataDotChartEnabled?: boolean;
        /**
         * To show or not the custom visualizations created.
         */
        devToolsEnabled?: boolean;
        /**
         * Visual should prefer to request a higher volume of data.
         */
        preferHigherDataVolume?: boolean;
    }
    interface SmallViewPortProperties {
        cartesianSmallViewPortProperties: CartesianSmallViewPortProperties;
        gaugeSmallViewPortProperties: GaugeSmallViewPortProperties;
        funnelSmallViewPortProperties: FunnelSmallViewPortProperties;
    }
    module visualPluginFactory {
        class VisualPluginService implements IVisualPluginService {
            private _plugins;
            constructor();
            /**
             * Gets metadata for all registered.
             */
            getVisuals(): IVisualPlugin[];
            getPlugin(type: string): IVisualPlugin;
            capabilities(type: string): VisualCapabilities;
        }
        function createPlugin(visualPlugins: jsCommon.IStringDictionary<IVisualPlugin>, base: IVisualPlugin, create: IVisualFactoryMethod): void;
        class MinervaVisualPluginService extends VisualPluginService {
            private featureSwitches;
            private visualPlugins;
            constructor(featureSwitches: MinervaVisualFeatureSwitches);
            getVisuals(): IVisualPlugin[];
            private addCustomVisualizations(convertibleVisualTypes);
            getPlugin(type: string): IVisualPlugin;
        }
        class PlaygroundVisualPluginService extends VisualPluginService {
            private visualPlugins;
            constructor();
            getVisuals(): IVisualPlugin[];
            getPlugin(type: string): IVisualPlugin;
            capabilities(type: string): VisualCapabilities;
        }
        /**
         * This plug-in service is used when displaying visuals on the dashboard.
         */
        class DashboardPluginService extends VisualPluginService {
            private featureSwitches;
            private visualPlugins;
            constructor(featureSwitches: MinervaVisualFeatureSwitches);
            getPlugin(type: string): IVisualPlugin;
        }
        class MobileVisualPluginService extends VisualPluginService {
            private visualPlugins;
            private smallViewPortProperties;
            static MinHeightLegendVisible: number;
            static MinHeightAxesVisible: number;
            static MinHeightGaugeSideNumbersVisible: number;
            static GaugeMarginsOnSmallViewPort: number;
            static MinHeightFunnelCategoryLabelsVisible: number;
            constructor(smallViewPortProperties?: SmallViewPortProperties);
            getPlugin(type: string): IVisualPlugin;
        }
        function create(): IVisualPluginService;
        function createMinerva(featureSwitches: MinervaVisualFeatureSwitches): IVisualPluginService;
        function createDashboard(featureSwitches: MinervaVisualFeatureSwitches): IVisualPluginService;
        function createMobile(smallViewPortProperties?: SmallViewPortProperties): IVisualPluginService;
    }
}
declare module powerbi.visuals.controls {
    function fire(eventHandlers: any, eventArgs: any): void;
    class ScrollbarButton {
        static MIN_WIDTH: number;
        static ARROW_COLOR: string;
        private _element;
        private _polygon;
        private _svg;
        private _owner;
        private _direction;
        private _timerHandle;
        private _mouseUpWrapper;
        constructor(owner: Scrollbar, direction: number);
        element: HTMLDivElement;
        private createView();
        private onMouseDown(event);
        private onMouseUp(event);
        arrange(width: number, height: number, angle: number): void;
    }
    /** Scrollbar base class */
    class Scrollbar {
        static DefaultScrollbarWidth: string;
        private static ScrollbarBackgroundFirstTimeMousedownHoldDelay;
        private static ScrollbarBackgroundMousedownHoldDelay;
        private static MouseWheelRange;
        static className: string;
        static barClassName: string;
        static arrowClassName: string;
        MIN_BAR_SIZE: number;
        min: number;
        max: number;
        viewMin: number;
        viewSize: number;
        smallIncrement: number;
        _onscroll: any[];
        private _actualWidth;
        private _actualHeight;
        private _actualButtonWidth;
        private _actualButtonHeight;
        private _width;
        private _height;
        private _visible;
        private _element;
        private _minButton;
        private _maxButton;
        private _middleBar;
        private _timerHandle;
        private _screenToOffsetScale;
        private _screenPrevMousePos;
        private _screenMinMousePos;
        private _screenMaxMousePos;
        private _backgroundMouseUpWrapper;
        private _middleBarMouseMoveWrapper;
        private _middleBarMouseUpWrapper;
        private _touchPanel;
        private _offsetTouchStartPos;
        private _offsetTouchPrevPos;
        private _touchStarted;
        private _allowMouseDrag;
        constructor(parentElement: HTMLElement);
        scrollBy(delta: number): void;
        scrollUp(): void;
        scrollDown(): void;
        scrollPageUp(): void;
        scrollPageDown(): void;
        width: string;
        height: string;
        refresh(): void;
        element: HTMLDivElement;
        maxButton: ScrollbarButton;
        middleBar: HTMLDivElement;
        _scrollSmallIncrement(direction: any): void;
        visible: boolean;
        isInMouseCapture: boolean;
        show(value: boolean): void;
        _getMouseOffset(event: MouseEvent): {
            x: number;
            y: number;
        };
        _getOffsetXDelta(event: MouseEvent): number;
        _getOffsetYDelta(event: MouseEvent): number;
        _getOffsetXTouchDelta(event: MouseEvent): number;
        _getOffsetYTouchDelta(event: MouseEvent): number;
        initTouch(panel: HTMLElement, allowMouseDrag?: boolean): void;
        onTouchStart(e: any): void;
        onTouchMove(e: any): void;
        onTouchEnd(e: any): void;
        onTouchMouseDown(e: MouseEvent): void;
        _getOffsetTouchDelta(e: MouseEvent): number;
        onTouchMouseMove(e: MouseEvent): void;
        onTouchMouseUp(e: MouseEvent, bubble?: boolean): void;
        registerElementForMouseWheelScrolling(element: HTMLElement): void;
        private createView(parentElement);
        private scrollTo(pos);
        _scrollByPage(event: MouseEvent): void;
        _getRunningSize(net: boolean): number;
        _getOffsetDelta(event: MouseEvent): number;
        private scroll(event);
        actualWidth: number;
        actualHeight: number;
        actualButtonWidth: number;
        actualButtonHeight: number;
        arrange(): void;
        _calculateButtonWidth(): number;
        _calculateButtonHeight(): number;
        _getMinButtonAngle(): number;
        _getMaxButtonAngle(): number;
        _setMaxButtonPosition(): void;
        invalidateArrange(): void;
        private onHoldBackgroundMouseDown(event);
        private onBackgroundMouseDown(event);
        private onBackgroundMouseUp(event);
        private getPinchZoomY();
        private onMiddleBarMouseDown(event);
        private onMiddleBarMouseMove(event);
        private onMiddleBarMouseUp(event);
        _getScreenContextualLeft(element: HTMLElement): number;
        _getScreenContextualRight(element: HTMLElement): number;
        onMouseWheel(e: MouseWheelEvent): void;
        onFireFoxMouseWheel(e: MouseWheelEvent): void;
        private mouseWheel(delta);
        _getScreenMousePos(event: MouseEvent): any;
        static addDocumentMouseUpEvent(func: any): void;
        static removeDocumentMouseUpEvent(func: any): void;
        static addDocumentMouseMoveEvent(func: any): void;
        static removeDocumentMouseMoveEvent(func: any): void;
    }
    /** Horizontal Scrollbar */
    class HorizontalScrollbar extends Scrollbar {
        constructor(parentElement: HTMLElement);
        _calculateButtonWidth(): number;
        _calculateButtonHeight(): number;
        _getMinButtonAngle(): number;
        _getMaxButtonAngle(): number;
        _setMaxButtonPosition(): void;
        refresh(): void;
        show(visible: boolean): void;
        _scrollByPage(event: MouseEvent): void;
        _getRunningSize(net: boolean): number;
        _getOffsetDelta(event: MouseEvent): number;
        _getOffsetTouchDelta(e: MouseEvent): number;
        _getScreenContextualLeft(element: HTMLElement): number;
        _getScreenContextualRight(element: HTMLElement): number;
        _getScreenMousePos(event: MouseEvent): number;
    }
    /** Vertical Scrollbar */
    class VerticalScrollbar extends Scrollbar {
        constructor(parentElement: HTMLElement);
        _calculateButtonWidth(): number;
        _calculateButtonHeight(): number;
        _getMinButtonAngle(): number;
        _getMaxButtonAngle(): number;
        _setMaxButtonPosition(): void;
        refresh(): void;
        show(visible: boolean): void;
        _scrollByPage(event: MouseEvent): void;
        _getRunningSize(net: boolean): number;
        _getOffsetDelta(event: MouseEvent): number;
        _getOffsetTouchDelta(e: MouseEvent): number;
        _getScreenContextualLeft(element: HTMLElement): number;
        _getScreenContextualRight(element: HTMLElement): number;
        _getScreenMousePos(event: MouseEvent): number;
    }
}
declare module powerbi.visuals.controls.internal {
    /** This class is responsible for tablix header resizing */
    class TablixResizer {
        private _element;
        private _handler;
        private _elementMouseDownWrapper;
        private _elementMouseMoveWrapper;
        private _elementMouseOutWrapper;
        private _elementMouseDoubleClickOutWrapper;
        private _documentMouseMoveWrapper;
        private _documentMouseUpWrapper;
        private _startMousePosition;
        private _originalCursor;
        static resizeHandleSize: number;
        static resizeCursor: string;
        constructor(element: HTMLElement, handler: ITablixResizeHandler);
        static addDocumentMouseUpEvent(listener: EventListener): void;
        static removeDocumentMouseUpEvent(listener: EventListener): void;
        static addDocumentMouseMoveEvent(listener: EventListener): void;
        static removeDocumentMouseMoveEvent(listener: EventListener): void;
        static getMouseCoordinates(event: MouseEvent): {
            x: number;
            y: number;
        };
        static getMouseCoordinateDelta(previous: {
            x: number;
            y: number;
        }, current: {
            x: number;
            y: number;
        }): {
            x: number;
            y: number;
        };
        initialize(): void;
        uninitialize(): void;
        cell: TablixCell;
        element: HTMLElement;
        _hotSpot(position: {
            x: number;
            y: number;
        }): boolean;
        private onElementMouseDown(event);
        private onElementMouseMove(event);
        private onElementMouseOut(event);
        private onElementMouseDoubleClick(event);
        private onDocumentMouseMove(event);
        private onDocumentMouseUp(event);
    }
    class TablixDomResizer extends TablixResizer {
        private _cell;
        constructor(cell: TablixCell, element: HTMLElement, handler: ITablixResizeHandler);
        cell: TablixCell;
        _hotSpot(position: {
            x: number;
            y: number;
        }): boolean;
    }
    class TablixCellPresenter {
        static _noMarginsStyle: HTMLStyleElement;
        static _noMarginsStyleName: string;
        static _dragResizeDisabledAttributeName: string;
        private _owner;
        private _tableCell;
        private _contentElement;
        private _contentHost;
        private _contentHostStyle;
        private _containerStyle;
        private _resizer;
        constructor(fitProportionally: boolean, layoutKind: TablixLayoutKind);
        initialize(owner: TablixCell): void;
        owner: TablixCell;
        registerTableCell(tableCell: HTMLTableCellElement): void;
        tableCell: HTMLTableCellElement;
        contentElement: HTMLElement;
        contentHost: HTMLElement;
        registerClickHandler(handler: (e: MouseEvent) => any): void;
        unregisterClickHandler(): void;
        onContentWidthChanged(value: number): void;
        onContentHeightChanged(height: number): void;
        onColumnSpanChanged(value: number): void;
        onRowSpanChanged(value: number): void;
        onTextAlignChanged(value: string): void;
        onClear(): void;
        onHorizontalScroll(width: number, offset: number): void;
        onVerticalScroll(height: number, offset: number): void;
        onInitializeScrolling(): void;
        setContentHostStyle(style: string): void;
        setContainerStyle(style: string): void;
        clearContainerStyle(): void;
        enableHorizontalResize(enable: boolean, handler: ITablixResizeHandler): void;
        static addNoMarginStyle(): void;
        /**
         * In order to allow dragging of the tableCell we need to
         * disable dragging of the container of the cell in IE.
         */
        disableDragResize(): void;
    }
    class TablixRowPresenter {
        private _row;
        private _tableRow;
        private _fitProportionally;
        constructor(fitProportionally: boolean);
        initialize(row: TablixRow): void;
        createCellPresenter(layoutKind: controls.TablixLayoutKind): TablixCellPresenter;
        registerRow(tableRow: HTMLTableRowElement): void;
        onAppendCell(cell: TablixCell): void;
        onInsertCellBefore(cell: TablixCell, refCell: TablixCell): void;
        onRemoveCell(cell: TablixCell): void;
        getHeight(): number;
        getCellHeight(cell: ITablixCell): number;
        getCellContentHeight(cell: ITablixCell): number;
        tableRow: HTMLTableRowElement;
    }
    class DashboardRowPresenter extends TablixRowPresenter {
        private _gridPresenter;
        constructor(gridPresenter: DashboardTablixGridPresenter, fitProportionally: boolean);
        getCellHeight(cell: ITablixCell): number;
        getCellContentHeight(cell: ITablixCell): number;
    }
    class CanvasRowPresenter extends TablixRowPresenter {
        getCellHeight(cell: ITablixCell): number;
        getCellContentHeight(cell: ITablixCell): number;
    }
    class TablixColumnPresenter {
        protected _column: TablixColumn;
        initialize(column: TablixColumn): void;
        getWidth(): number;
        getCellWidth(cell: ITablixCell): number;
        getCellContentWidth(cell: ITablixCell): number;
    }
    class DashboardColumnPresenter extends TablixColumnPresenter {
        private _gridPresenter;
        constructor(gridPresenter: DashboardTablixGridPresenter);
        getCellWidth(cell: ITablixCell): number;
        getCellContentWidth(cell: ITablixCell): number;
    }
    class CanvasColumnPresenter extends TablixColumnPresenter {
        getCellWidth(cell: ITablixCell): number;
        getCellContentWidth(cell: ITablixCell): number;
    }
    class TablixGridPresenter {
        protected _table: HTMLTableElement;
        protected _owner: TablixGrid;
        private _footerTable;
        constructor();
        initialize(owner: TablixGrid, gridHost: HTMLElement, footerHost: HTMLElement, control: TablixControl): void;
        getWidth(): number;
        getHeight(): number;
        getScreenToCssRatioX(): number;
        getScreenToCssRatioY(): number;
        createRowPresenter(): TablixRowPresenter;
        createColumnPresenter(): TablixColumnPresenter;
        onAppendRow(row: TablixRow): void;
        onInsertRowBefore(row: TablixRow, refRow: TablixRow): void;
        onRemoveRow(row: TablixRow): void;
        onAddFooterRow(row: TablixRow): void;
        onClear(): void;
        onFillColumnsProportionallyChanged(value: boolean): void;
    }
    class DashboardTablixGridPresenter extends TablixGridPresenter {
        private _sizeComputationManager;
        constructor(sizeComputationManager: SizeComputationManager);
        createRowPresenter(): TablixRowPresenter;
        createColumnPresenter(): TablixColumnPresenter;
        sizeComputationManager: SizeComputationManager;
        getWidth(): number;
        getHeight(): number;
    }
    class CanvasTablixGridPresenter extends TablixGridPresenter {
        createRowPresenter(): TablixRowPresenter;
        createColumnPresenter(): TablixColumnPresenter;
        getWidth(): number;
        getHeight(): number;
    }
}
declare module powerbi.visuals.controls.internal {
    /**
     * Base class for Tablix realization manager.
     */
    class TablixDimensionRealizationManager {
        private _realizedLeavesCount;
        private _adjustmentFactor;
        private _itemsToRealizeCount;
        private _itemsEstimatedContextualWidth;
        private _binder;
        constructor(binder: ITablixBinder);
        _getOwner(): DimensionLayoutManager;
        binder: ITablixBinder;
        adjustmentFactor: number;
        itemsToRealizeCount: number;
        itemsEstimatedContextualWidth: number;
        onStartRenderingIteration(): void;
        onEndRenderingIteration(gridContextualWidth: number, filled: boolean): void;
        onEndRenderingSession(): void;
        onCornerCellRealized(item: any, cell: ITablixCell): void;
        onHeaderRealized(item: any, cell: ITablixCell, leaf: boolean): void;
        needsToRealize: boolean;
        _getEstimatedItemsToRealizeCount(): void;
        _getSizeAdjustment(gridContextualWidth: number): number;
    }
    /**
     * DOM implementation for Row Tablix realization manager.
     */
    class RowRealizationManager extends TablixDimensionRealizationManager {
        private _owner;
        owner: RowLayoutManager;
        _getOwner(): DimensionLayoutManager;
        _getEstimatedItemsToRealizeCount(): void;
        private estimateRowsToRealizeCount();
        getEstimatedRowHierarchyWidth(): number;
        private updateRowHiearchyEstimatedWidth(items, firstVisibleIndex, levels);
        _getSizeAdjustment(gridContextualWidth: number): number;
    }
    /**
     * DOM implementation for Column Tablix realization manager.
     */
    class ColumnRealizationManager extends TablixDimensionRealizationManager {
        private _owner;
        owner: ColumnLayoutManager;
        _getOwner(): DimensionLayoutManager;
        _getEstimatedItemsToRealizeCount(): void;
        private rowRealizationManager;
        private getEstimatedRowHierarchyWidth();
        private estimateColumnsToRealizeCount(rowHierarchyWidth);
        _getSizeAdjustment(gridContextualWidth: number): number;
    }
    class RowWidths {
        items: RowWidth[];
        leafCount: any;
        constructor();
    }
    class RowWidth {
        maxLeafWidth: number;
        maxNonLeafWidth: number;
    }
}
declare module powerbi.visuals.controls.internal {
    interface ITablixResizeHandler {
        onStartResize(cell: TablixCell, currentX: number, currentY: number): void;
        onResize(cell: TablixCell, deltaX: number, deltaY: number): void;
        onEndResize(cell: TablixCell): any;
        onReset(cell: TablixCell): any;
    }
    /**
     * Internal interface to abstract the tablix row/column.
     */
    interface ITablixGridItem {
        calculateSize(): void;
        resize(size: number): void;
        fixSize(): void;
        /**
         * In case the parent column/row header size is bigger than the sum of the children,
         * the size of the last item is adjusted to compensate the difference.
         */
        setAligningContextualWidth(size: number): void;
        getAligningContextualWidth(): number;
        getContextualWidth(): number;
        getContentContextualWidth(): number;
        getIndex(grid: TablixGrid): number;
        getHeaders(): TablixCell[];
        getOtherDimensionHeaders(): TablixCell[];
        getOtherDimensionOwner(cell: TablixCell): ITablixGridItem;
        getCellIContentContextualWidth(cell: TablixCell): number;
        getCellContextualSpan(cell: TablixCell): number;
    }
    class TablixCell implements ITablixCell {
        private _horizontalOffset;
        private _verticalOffset;
        private _colSpan;
        private _rowSpan;
        private _textAlign;
        private _contentWidth;
        private _contentHeight;
        private _scrollable;
        _column: TablixColumn;
        _row: TablixRow;
        type: TablixCellType;
        item: any;
        _presenter: TablixCellPresenter;
        extension: any;
        constructor(presenter: TablixCellPresenter, extension: any, row: TablixRow);
        colSpan: number;
        rowSpan: number;
        textAlign: string;
        horizontalOffset: number;
        verticalOffset: number;
        private isScrollable();
        clear(): void;
        private initializeScrolling();
        prepare(scrollable: boolean): void;
        scrollVertically(height: number, offset: number): void;
        scrollHorizontally(width: number, offset: number): void;
        setContentWidth(value: number): void;
        setContentHeight(value: number): void;
        enableHorizontalResize(enable: boolean, handler: ITablixResizeHandler): void;
    }
    class TablixColumn implements ITablixGridItem {
        _realizedColumnHeaders: TablixCell[];
        _realizedCornerCells: TablixCell[];
        _realizedRowHeaders: TablixCell[];
        _realizedBodyCells: TablixCell[];
        private _items;
        private _itemType;
        private _footerCell;
        private _contentWidth;
        private _width;
        private _sizeFixed;
        private _aligningWidth;
        private _fixedToAligningWidth;
        private _presenter;
        private _owner;
        constructor(presenter: TablixColumnPresenter);
        initialize(owner: TablixGrid): void;
        owner: TablixGrid;
        private getType();
        private getColumnHeadersOrCorners();
        private columnHeadersOrCornersEqual(newType, headers, hierarchyNavigator);
        itemType: TablixCellType;
        getLeafItem(): any;
        columnHeaderOrCornerEquals(type1: TablixCellType, item1: any, type2: TablixCellType, item2: any, hierarchyNavigator: ITablixHierarchyNavigator): boolean;
        OnLeafRealized(hierarchyNavigator: ITablixHierarchyNavigator): void;
        private clearSpanningCellsWidth(cells);
        addCornerCell(cell: TablixCell): void;
        addRowHeader(cell: TablixCell): void;
        addColumnHeader(cell: TablixCell, isLeaf: boolean): void;
        addBodyCell(cell: TablixCell): void;
        footer: TablixCell;
        resize(width: number): void;
        fixSize(): void;
        clearSize(): void;
        getContentContextualWidth(): number;
        getCellIContentContextualWidth(cell: TablixCell): number;
        getCellSpanningWidthWithScrolling(cell: ITablixCell, tablixGrid: TablixGrid): number;
        getScrollingOffset(): number;
        getContextualWidth(): number;
        calculateSize(): void;
        setAligningContextualWidth(size: number): void;
        getAligningContextualWidth(): number;
        private setContentWidth(value);
        getTablixCell(): TablixCell;
        getIndex(grid: TablixGrid): number;
        getHeaders(): TablixCell[];
        getOtherDimensionHeaders(): TablixCell[];
        getCellContextualSpan(cell: TablixCell): number;
        getOtherDimensionOwner(cell: TablixCell): ITablixGridItem;
    }
    class TablixRow implements ITablixGridItem {
        private _allocatedCells;
        _realizedRowHeaders: TablixCell[];
        _realizedColumnHeaders: TablixCell[];
        _realizedBodyCells: TablixCell[];
        _realizedCornerCells: TablixCell[];
        private _realizedCellsCount;
        private _heightFixed;
        private _contentHeight;
        private _height;
        private _presenter;
        private _owner;
        constructor(presenter: TablixRowPresenter);
        initialize(owner: TablixGrid): void;
        presenter: TablixRowPresenter;
        owner: TablixGrid;
        releaseUnusedCells(owner: TablixControl): void;
        releaseAllCells(owner: TablixControl): void;
        private releaseCells(owner, startIndex);
        moveScrollableCellsToEnd(count: number): void;
        moveScrollableCellsToStart(count: number): void;
        getOrCreateCornerCell(column: TablixColumn): TablixCell;
        getOrCreateRowHeader(column: TablixColumn, scrollable: boolean, leaf: boolean): TablixCell;
        getOrCreateColumnHeader(column: TablixColumn, scrollable: boolean, leaf: boolean): TablixCell;
        getOrCreateBodyCell(column: TablixColumn, scrollable: boolean): TablixCell;
        getOrCreateFooterRowHeader(column: TablixColumn): TablixCell;
        getOrCreateFooterBodyCell(column: TablixColumn, scrollable: boolean): TablixCell;
        getRowHeaderLeafIndex(): number;
        getAllocatedCellAt(index: number): TablixCell;
        moveCellsBy(delta: number): void;
        getRealizedCellCount(): number;
        getRealizedHeadersCount(): number;
        getRealizedHeaderAt(index: number): TablixCell;
        getTablixCell(): TablixCell;
        getOrCreateEmptySpaceCell(): TablixCell;
        private createCell(row);
        private getOrCreateCell();
        resize(height: number): void;
        fixSize(): void;
        getContentContextualWidth(): number;
        getCellIContentContextualWidth(cell: TablixCell): number;
        getCellSpanningHeight(cell: ITablixCell, tablixGrid: TablixGrid): number;
        getContextualWidth(): number;
        sizeFixed(): boolean;
        calculateSize(): void;
        setAligningContextualWidth(size: number): void;
        getAligningContextualWidth(): number;
        private setContentHeight();
        getIndex(grid: TablixGrid): number;
        getHeaders(): TablixCell[];
        getOtherDimensionHeaders(): TablixCell[];
        getCellContextualSpan(cell: TablixCell): number;
        getOtherDimensionOwner(cell: TablixCell): ITablixGridItem;
    }
    class TablixGrid {
        private _owner;
        private _rows;
        private _realizedRows;
        private _columns;
        private _realizedColumns;
        private _footerRow;
        private _emptySpaceHeaderCell;
        private _emptyFooterSpaceCell;
        _presenter: TablixGridPresenter;
        private _fillColumnsProportionally;
        constructor(presenter: TablixGridPresenter);
        initialize(owner: TablixControl, gridHost: HTMLElement, footerHost: HTMLElement): void;
        owner: TablixControl;
        fillColumnsProportionally: boolean;
        realizedColumns: TablixColumn[];
        realizedRows: TablixRow[];
        footerRow: TablixRow;
        emptySpaceHeaderCell: TablixCell;
        emptySpaceFooterCell: TablixCell;
        ShowEmptySpaceCells(rowSpan: number, width: number): void;
        HideEmptySpaceCells(): void;
        onStartRenderingSession(clear: boolean): void;
        onStartRenderingIteration(): void;
        onEndRenderingIteration(): void;
        getOrCreateRow(rowIndex: number): TablixRow;
        getOrCreateFootersRow(): TablixRow;
        moveRowsToEnd(moveFromIndex: number, count: number): void;
        moveRowsToStart(moveToIndex: number, count: number): void;
        moveColumnsToEnd(moveFromIndex: number, count: number): void;
        moveColumnsToStart(moveToIndex: number, count: number): void;
        getOrCreateColumn(columnIndex: number): TablixColumn;
        private initializeColumns();
        private clearColumns();
        private initializeRows();
        private clearRows();
        getWidth(): number;
        getHeight(): number;
    }
}
declare module powerbi.visuals.controls.internal {
    /**
     * This class is used for layouts that don't or cannot
     * rely on DOM measurements.  Instead they compute all required
     * widths and heights and store it in this structure.
     */
    class SizeComputationManager {
        private static DashboardCellPaddingLeft;
        private static DashboardCellPaddingRight;
        private static DashboardRowHeight;
        private _viewport;
        private _columnCount;
        private _cellWidth;
        private _cellHeight;
        visibleWidth: number;
        visibleHeight: number;
        gridWidth: number;
        gridHeight: number;
        rowHeight: number;
        cellWidth: number;
        cellHeight: number;
        contentWidth: number;
        contentHeight: number;
        updateColumnCount(columnCount: number): void;
        updateViewport(viewport: IViewport): void;
        private computeColumnWidth(totalColumnCount);
        private fitToColumnCount(desiredColumnCount, totalColumnCount);
    }
    class DimensionLayoutManager implements IDimensionLayoutManager {
        static _pixelPrecision: number;
        static _scrollOffsetPrecision: number;
        _grid: TablixGrid;
        _gridOffset: number;
        protected _contextualWidthToFill: number;
        private _owner;
        private _realizationManager;
        private _alignToEnd;
        private _lastScrollOffset;
        private _isScrolling;
        private _fixedSizeEnabled;
        private _done;
        private _measureEnabled;
        constructor(owner: TablixLayoutManager, grid: TablixGrid, realizationManager: TablixDimensionRealizationManager);
        owner: TablixLayoutManager;
        realizationManager: TablixDimensionRealizationManager;
        fixedSizeEnabled: boolean;
        onCornerCellRealized(item: any, cell: ITablixCell, leaf: boolean): void;
        onHeaderRealized(item: any, cell: ITablixCell, leaf: any): void;
        needsToRealize: boolean;
        getVisibleSizeRatio(): number;
        alignToEnd: boolean;
        done: boolean;
        _requiresMeasure(): boolean;
        startScrollingSession(): void;
        endScrollingSession(): void;
        isScrolling(): boolean;
        isResizing(): boolean;
        getOtherHierarchyContextualHeight(): number;
        _isAutoSized(): boolean;
        onStartRenderingSession(): void;
        onEndRenderingSession(): void;
        /**
         * Implementing classes must override this to send dimentions to TablixControl.
         */
        _sendDimensionsToControl(): void;
        measureEnabled: boolean;
        getFooterContextualWidth(): number;
        onStartRenderingIteration(clear: boolean, contextualWidth: number): void;
        allItemsRealized: boolean;
        onEndRenderingIteration(): void;
        private getScrollDeltaWithinPage();
        private swapElements();
        _getRealizedItems(): ITablixGridItem[];
        getRealizedItemsCount(): number;
        _moveElementsToBottom(moveFromIndex: number, count: any): void;
        _moveElementsToTop(moveToIndex: number, count: any): void;
        isScrollingWithinPage(): boolean;
        getGridContextualWidth(): number;
        private updateScrollbar(gridContextualWidth);
        getViewSize(gridContextualWidth: number): number;
        isScrollableHeader(item: any, items: any, index: number): boolean;
        reachedEnd(): boolean;
        scrollBackwardToFill(gridContextualWidth: number): number;
        private getItemContextualWidth(index);
        private getItemContextualWidthWithScrolling(index);
        getSizeWithScrolling(size: number, index: number): number;
        getGridContextualWidthFromItems(): number;
        private getMeaurementError(gridContextualWidth);
        private scrollForwardToAlignEnd(gridContextualWidth);
        dimension: TablixDimension;
        otherLayoutManager: DimensionLayoutManager;
        contextualWidthToFill: number;
        getGridScale(): number;
        otherScrollbarContextualWidth: number;
        getActualContextualWidth(gridContextualWidth: number): number;
        protected canScroll(gridContextualWidth: number): boolean;
        calculateSizes(): void;
        protected _calculateSize(item: ITablixGridItem): void;
        calculateContextualWidths(): void;
        calculateSpans(): void;
        updateNonScrollableItemsSpans(): void;
        updateScrollableItemsSpans(): void;
        fixSizes(): void;
        private updateSpans(otherRealizedItem, cells);
        private updateLastChildSize(spanningCell, item, totalSpanSize);
    }
    class ResizeState {
        item: any;
        itemType: TablixCellType;
        column: TablixColumn;
        startColumnWidth: number;
        resizingDelta: number;
        animationFrame: number;
        scale: number;
        constructor(column: TablixColumn, width: number, scale: number);
    }
    class ColumnLayoutManager extends DimensionLayoutManager implements ITablixResizeHandler {
        static minColumnWidth: number;
        private _resizeState;
        constructor(owner: TablixLayoutManager, grid: TablixGrid, realizationManager: ColumnRealizationManager);
        dimension: TablixDimension;
        isResizing(): boolean;
        fillProportionally: boolean;
        getGridScale(): number;
        otherScrollbarContextualWidth: number;
        _getRealizedItems(): ITablixGridItem[];
        _moveElementsToBottom(moveFromIndex: number, count: any): void;
        _moveElementsToTop(moveToIndex: number, count: any): void;
        _requiresMeasure(): boolean;
        getGridContextualWidth(): number;
        private getFirstVisibleColumn();
        _isAutoSized(): boolean;
        applyScrolling(): void;
        private scroll(firstVisibleColumn, width, offset);
        private scrollCells(cells, width, offset);
        private scrollBodyCells(rows, width, offset);
        onStartResize(cell: TablixCell, currentX: number, currentY: number): void;
        onResize(cell: TablixCell, deltaX: number, deltaY: number): void;
        onEndResize(cell: TablixCell): void;
        onReset(cell: TablixCell): void;
        updateItemToResizeState(realizedColumns: TablixColumn[]): void;
        private performResizing();
        /**
         * Sends column related data (pixel size, column count, etc) to TablixControl.
         */
        _sendDimensionsToControl(): void;
        getEstimatedHeaderWidth(label: string, headerIndex: number): number;
        getEstimatedBodyCellWidth(content: string): number;
    }
    class DashboardColumnLayoutManager extends ColumnLayoutManager {
        getEstimatedHeaderWidth(label: string, headerIndex: number): number;
        getEstimatedBodyCellWidth(content: string): number;
        protected canScroll(gridContextualWidth: number): boolean;
        protected _calculateSize(item: ITablixGridItem): void;
        private ignoreColumn(headerIndex);
    }
    class CanvasColumnLayoutManager extends ColumnLayoutManager {
        getEstimatedHeaderWidth(label: string, headerIndex: number): number;
        getEstimatedBodyCellWidth(content: string): number;
        protected canScroll(gridContextualWidth: number): boolean;
        protected _calculateSize(item: ITablixGridItem): void;
    }
    class RowLayoutManager extends DimensionLayoutManager {
        constructor(owner: TablixLayoutManager, grid: TablixGrid, realizationManager: RowRealizationManager);
        dimension: TablixDimension;
        getGridScale(): number;
        otherScrollbarContextualWidth: number;
        startScrollingSession(): void;
        _getRealizedItems(): ITablixGridItem[];
        _moveElementsToBottom(moveFromIndex: number, count: any): void;
        _moveElementsToTop(moveToIndex: number, count: any): void;
        _requiresMeasure(): boolean;
        getGridContextualWidth(): number;
        private getFirstVisibleRow();
        _isAutoSized(): boolean;
        applyScrolling(): void;
        private scroll(firstVisibleRow, height, offset);
        private scrollCells(cells, height, offset);
        getFooterContextualWidth(): number;
        calculateContextualWidths(): void;
        fixSizes(): void;
        /**
         * Sends row related data (pixel size, column count, etc) to TablixControl.
         */
        _sendDimensionsToControl(): void;
        getEstimatedHeaderWidth(label: string, headerIndex: number): number;
    }
    class DashboardRowLayoutManager extends RowLayoutManager {
        getEstimatedHeaderWidth(label: string, headerIndex: number): number;
        protected canScroll(gridContextualWidth: number): boolean;
        protected _calculateSize(item: ITablixGridItem): void;
        private getHeaderWidth(headerIndex);
    }
    class CanvasRowLayoutManager extends RowLayoutManager {
        getEstimatedHeaderWidth(label: string, headerIndex: number): number;
        protected canScroll(gridContextualWidth: number): boolean;
        protected _calculateSize(item: ITablixGridItem): void;
    }
    class TablixLayoutManager {
        protected _owner: TablixControl;
        protected _container: HTMLElement;
        protected _columnLayoutManager: ColumnLayoutManager;
        protected _rowLayoutManager: RowLayoutManager;
        private _binder;
        private _scrollingDimension;
        private _gridHost;
        private _footersHost;
        private _grid;
        private _allowHeaderResize;
        constructor(binder: ITablixBinder, grid: TablixGrid, columnLayoutManager: ColumnLayoutManager, rowLayoutManager: RowLayoutManager);
        initialize(owner: TablixControl): void;
        owner: TablixControl;
        binder: ITablixBinder;
        getTablixClassName(): string;
        getLayoutKind(): TablixLayoutKind;
        getOrCreateColumnHeader(item: any, items: any, rowIndex: number, columnIndex: number): ITablixCell;
        getOrCreateRowHeader(item: any, items: any, rowIndex: number, columnIndex: number): ITablixCell;
        getOrCreateCornerCell(item: any, rowLevel: number, columnLevel: number): ITablixCell;
        getOrCreateBodyCell(cellItem: any, rowItem: any, rowItems: any, rowIndex: number, columnIndex: number): ITablixCell;
        getOrCreateFooterBodyCell(cellItem: any, columnIndex: number): ITablixCell;
        getOrCreateFooterRowHeader(item: any, items: any): ITablixCell;
        getVisibleWidth(): number;
        getVisibleHeight(): number;
        updateColumnCount(rowDimension: TablixRowDimension, columnDimension: TablixColumnDimension): void;
        updateViewport(viewport: IViewport): void;
        getEstimatedRowHeight(): number;
        getCellWidth(cell: ITablixCell): number;
        getContentWidth(cell: ITablixCell): number;
        /**
         * This call makes room for parent header cells where neccessary.
         * Since HTML cells that span vertically displace other rows,
         * room has to be made for spanning headers that leave an exiting
         * row to enter the new row that it starts from and removed when
         * returning to an entering row.
         */
        private alignRowHeaderCells(item, currentRow);
        grid: TablixGrid;
        rowLayoutManager: DimensionLayoutManager;
        columnLayoutManager: DimensionLayoutManager;
        protected showEmptySpaceHeader(): boolean;
        onStartRenderingSession(scrollingDimension: TablixDimension, parentElement: HTMLElement, clear: boolean): void;
        onEndRenderingSession(): void;
        onStartRenderingIteration(clear: boolean): void;
        onEndRenderingIteration(): boolean;
        onCornerCellRealized(item: any, cell: ITablixCell): void;
        onRowHeaderRealized(item: any, cell: ITablixCell): void;
        onRowHeaderFooterRealized(item: any, cell: ITablixCell): void;
        onColumnHeaderRealized(item: any, cell: ITablixCell): void;
        onBodyCellRealized(item: any, cell: ITablixCell): void;
        onBodyCellFooterRealized(item: any, cell: ITablixCell): void;
        setAllowHeaderResize(value: boolean): void;
        enableCellHorizontalResize(isLeaf: boolean, cell: TablixCell): void;
        getEstimatedTextWidth(label: string): number;
        measureSampleText(parentElement: HTMLElement): void;
    }
    class DashboardTablixLayoutManager extends TablixLayoutManager {
        private _sizeComputationManager;
        constructor(binder: ITablixBinder, sizeComputationManager: SizeComputationManager, grid: TablixGrid, rowRealizationManager: RowRealizationManager, columnRealizationManager: ColumnRealizationManager);
        static createLayoutManager(binder: ITablixBinder): DashboardTablixLayoutManager;
        getTablixClassName(): string;
        getLayoutKind(): TablixLayoutKind;
        protected showEmptySpaceHeader(): boolean;
        measureSampleText(parentElement: HTMLElement): void;
        getVisibleWidth(): number;
        getVisibleHeight(): number;
        getCellWidth(cell: ITablixCell): number;
        getContentWidth(cell: ITablixCell): number;
        getEstimatedTextWidth(label: string): number;
        updateColumnCount(rowDimension: TablixRowDimension, columnDimension: TablixColumnDimension): void;
        updateViewport(viewport: IViewport): void;
        getEstimatedRowHeight(): number;
    }
    class CanvasTablixLayoutManager extends TablixLayoutManager {
        private characterWidth;
        private characterHeight;
        constructor(binder: ITablixBinder, grid: TablixGrid, rowRealizationManager: RowRealizationManager, columnRealizationManager: ColumnRealizationManager);
        static createLayoutManager(binder: ITablixBinder): CanvasTablixLayoutManager;
        getTablixClassName(): string;
        getLayoutKind(): TablixLayoutKind;
        measureSampleText(parentElement: HTMLElement): void;
        protected showEmptySpaceHeader(): boolean;
        getVisibleWidth(): number;
        getVisibleHeight(): number;
        getCellWidth(cell: ITablixCell): number;
        getContentWidth(cell: ITablixCell): number;
        getEstimatedTextWidth(text: string): number;
        updateColumnCount(rowDimension: TablixRowDimension, columnDimension: TablixColumnDimension): void;
        updateViewport(viewport: IViewport): void;
        getEstimatedRowHeight(): number;
    }
}
declare module powerbi.visuals.controls {
    module HTMLElementUtils {
        function clearChildren(element: HTMLElement): void;
        function setElementTop(element: HTMLElement, top: number): void;
        function setElementLeft(element: HTMLElement, left: number): void;
        function setElementHeight(element: HTMLElement, height: number): void;
        function setElementWidth(element: HTMLElement, width: number): void;
        function getElementWidth(element: HTMLElement): number;
        function getElementHeight(element: HTMLElement): number;
        function isAutoSize(size: number): boolean;
        function getAccumulatedScale(element: HTMLElement): number;
        /**
         * Get scale of element, return 1 when not scaled.
         */
        function getScale(element: any): number;
    }
}
declare module powerbi.visuals.controls.internal {
    module TablixUtils {
        function createTable(): HTMLTableElement;
        function createDiv(): HTMLDivElement;
        function appendATagToBodyCell(value: string, cell: controls.ITablixCell): void;
    }
}
declare module powerbi.visuals.controls {
    interface ITablixHierarchyNavigator {
        /**
         * Returns the depth of a hierarchy.
         *
         * @param hierarchy Object representing the hierarchy.
         */
        getDepth(hierarchy: any): number;
        /**
         * Returns the leaf count of a hierarchy.
         *
         * @param hierarchy Object representing the hierarchy.
         */
        getLeafCount(hierarchy: any): number;
        /**
         * Returns the leaf member of a hierarchy at the specified index.
         *
         * @param hierarchy Object representing the hierarchy.
         * @param index Index of leaf member.
         */
        getLeafAt(hierarchy: any, index: number): any;
        /**
         * Returns the specified hierarchy member parent.
         *
         * @param item Hierarchy member.
         */
        getParent(item: any): any;
        /**
         * Returns the index of the hierarchy member relative to its parent.
         *
         * @param item Hierarchy member.
         */
        getIndex(item: any): number;
        /**
         * Checks whether a hierarchy member is a leaf.
         *
         * @param item Hierarchy member.
         */
        isLeaf(item: any): boolean;
        isRowHierarchyLeaf(cornerItem: any): boolean;
        isColumnHierarchyLeaf(cornerItem: any): boolean;
        /**
         * Checks whether a hierarchy member is the last item within its parent.
         *
         * @param item Hierarchy member.
         * @param items A collection of hierarchy members.
         */
        isLastItem(item: any, items: any): boolean;
        /**
         * Gets the children members of a hierarchy member.
         *
         * @param item Hierarchy member.
         */
        getChildren(item: any): any;
        /**
         * Gets the members count in a specified collection.
         *
         * @param items Hierarchy member.
         */
        getCount(items: any): number;
        /**
         * Gets the member at the specified index.
         *
         * @param items A collection of hierarchy members.
         * @param index Index of member to return.
         */
        getAt(items: any, index: number): any;
        /**
         * Gets the hierarchy member level.
         *
         * @param item Hierarchy member.
         */
        getLevel(item: any): number;
        /**
         * Returns the intersection between a row and a column item.
         *
         * @param rowItem A row member.
         * @param columnItem A column member.
         */
        getIntersection(rowItem: any, columnItem: any): any;
        /**
         * Returns the corner cell between a row and a column level.
         *
         * @param rowLevel A level in the row hierarchy.
         * @param columnLevel A level in the column hierarchy.
         */
        getCorner(rowLevel: number, columnLevel: number): any;
        headerItemEquals(item1: any, item2: any): boolean;
        bodyCellItemEquals(item1: any, item2: any): boolean;
        cornerCellItemEquals(item1: any, item2: any): boolean;
    }
}
declare module powerbi.visuals.controls {
    interface ITablixBinder {
        onStartRenderingSession(): void;
        onEndRenderingSession(): void;
        /**  Binds the row hierarchy member to the DOM element. */
        bindRowHeader(item: any, cell: ITablixCell): void;
        unbindRowHeader(item: any, cell: ITablixCell): void;
        /**  Binds the column hierarchy member to the DOM element. */
        bindColumnHeader(item: any, cell: ITablixCell): void;
        unbindColumnHeader(item: any, cell: ITablixCell): void;
        /**  Binds the intersection between a row and a column hierarchy member to the DOM element. */
        bindBodyCell(item: any, cell: ITablixCell): void;
        unbindBodyCell(item: any, cell: ITablixCell): void;
        /**  Binds the corner cell to the DOM element. */
        bindCornerCell(item: any, cell: ITablixCell): void;
        unbindCornerCell(item: any, cell: ITablixCell): void;
        bindEmptySpaceHeaderCell(cell: ITablixCell): void;
        unbindEmptySpaceHeaderCell(cell: ITablixCell): void;
        bindEmptySpaceFooterCell(cell: ITablixCell): void;
        unbindEmptySpaceFooterCell(cell: ITablixCell): void;
        /**  Measurement Helper */
        getHeaderLabel(item: any): string;
        getCellContent(item: any): string;
        hasRowGroups(): boolean;
    }
}
declare module powerbi.visuals.controls {
    enum TablixCellType {
        CornerCell = 0,
        RowHeader = 1,
        ColumnHeader = 2,
        BodyCell = 3,
    }
    interface ITablixCell {
        type: TablixCellType;
        item: any;
        colSpan: number;
        rowSpan: number;
        textAlign: string;
        extension: any;
    }
    interface IDimensionLayoutManager {
        measureEnabled: boolean;
        getRealizedItemsCount(): number;
        needsToRealize: boolean;
    }
}
declare module powerbi.visuals.controls {
    interface TablixRenderArgs {
        rowScrollOffset?: number;
        columnScrollOffset?: number;
        scrollingDimension?: TablixDimension;
    }
    interface GridDimensions {
        rowCount?: number;
        columnCount?: number;
        rowHierarchyWidth?: number;
        rowHierarchyHeight?: number;
        rowHierarchyContentHeight?: number;
        columnHierarchyWidth?: number;
        columnHierarchyHeight?: number;
        footerHeight?: number;
    }
    enum TablixLayoutKind {
        /**
         * The default layout is based on DOM measurements and used on the canvas.
         */
        Canvas = 0,
        /**
         * The DashboardTile layout must not rely on any kind of DOM measurements
         * since the tiles are created when the dashboard is not visible and the
         * visual is not rendered; thus no measurements are available.
         */
        DashboardTile = 1,
    }
    interface TablixOptions {
        interactive?: boolean;
        enableTouchSupport?: boolean;
    }
    class TablixControl {
        private static UnitOfMeasurement;
        private _hierarchyNavigator;
        private _binder;
        private _columnDimension;
        private _rowDimension;
        private _layoutManager;
        private _container;
        private _mainDiv;
        private _footerDiv;
        private _scrollbarWidth;
        private _fixSizedClassName;
        private _touchManager;
        private _columnTouchDelegate;
        private _rowTouchDelegate;
        private _bodyTouchDelegate;
        private _footerTouchDelegate;
        private _touchInterpreter;
        private _footerTouchInterpreter;
        private _gridDimensions;
        private _lastRenderingArgs;
        private _autoSizeWidth;
        private _autoSizeHeight;
        private _viewport;
        private _maxWidth;
        private _maxHeight;
        private _minWidth;
        private _minHeight;
        private _options;
        private _isTouchEnabled;
        private _renderIterationCount;
        constructor(hierarchyNavigator: ITablixHierarchyNavigator, layoutManager: internal.TablixLayoutManager, binder: ITablixBinder, parentDomElement: HTMLElement, options: TablixOptions);
        private InitializeTouchSupport();
        private InitializeScrollbars();
        container: HTMLElement;
        contentHost: HTMLElement;
        footerHost: HTMLElement;
        className: string;
        hierarchyNavigator: ITablixHierarchyNavigator;
        binder: ITablixBinder;
        autoSizeWidth: boolean;
        autoSizeHeight: boolean;
        maxWidth: number;
        viewport: IViewport;
        maxHeight: number;
        minWidth: number;
        minHeight: number;
        scrollbarWidth: number;
        updateModels(resetScrollOffsets: boolean, rowModel?: any, columnModel?: any): void;
        updateColumnDimensions(rowHierarchyWidth: number, columnHierarchyWidth: number, count: number): void;
        updateRowDimensions(columnHierarchyHeight: number, rowHierarchyHeight: number, rowHierarchyContentHeight: number, count: number, footerHeight: any): void;
        private updateTouchDimensions();
        private onMouseWheel(e);
        private onFireFoxMouseWheel(e);
        private determineDimensionToScroll();
        layoutManager: internal.TablixLayoutManager;
        columnDimension: TablixColumnDimension;
        rowDimension: TablixRowDimension;
        refresh(clear: boolean): void;
        _onScrollAsync(dimension: TablixDimension): void;
        private performPendingScroll(dimension);
        private updateHorizontalPosition();
        updateFooterVisibility(): void;
        private updateVerticalPosition();
        private alreadyRendered(scrollingDimension);
        private render(clear, scrollingDimension);
        private updateContainerDimensions();
        private cornerCellMatch(item, cell);
        private renderCorner();
        _unbindCell(cell: ITablixCell): void;
        private onTouchEvent(args);
        private addFixedSizeClassNameIfNeeded();
        private removeFixSizedClassName();
    }
}
declare module powerbi.visuals.controls {
    class TablixDimension {
        _hierarchyNavigator: ITablixHierarchyNavigator;
        _otherDimension: any;
        _owner: TablixControl;
        _binder: ITablixBinder;
        _tablixLayoutManager: internal.TablixLayoutManager;
        _layoutManager: IDimensionLayoutManager;
        model: any;
        scrollOffset: number;
        private _scrollStep;
        private _firstVisibleScrollIndex;
        private _scrollbar;
        _scrollItems: any[];
        constructor(tablixControl: TablixControl);
        _onStartRenderingIteration(): void;
        _onEndRenderingIteration(): void;
        getValidScrollOffset(scrollOffset: number): number;
        makeScrollOffsetValid(): void;
        getIntegerScrollOffset(): number;
        getFractionScrollOffset(): number;
        scrollbar: Scrollbar;
        getFirstVisibleItem(level: number): any;
        getFirstVisibleChild(item: any): any;
        getFirstVisibleChildIndex(item: any): number;
        _initializeScrollbar(parentElement: HTMLElement, touchDiv: HTMLDivElement): void;
        getItemsCount(): number;
        getDepth(): number;
        private onScroll();
        otherDimension: TablixDimension;
        layoutManager: IDimensionLayoutManager;
        _createScrollbar(parentElement: HTMLElement): Scrollbar;
        private updateScrollPosition();
    }
    class TablixRowDimension extends TablixDimension {
        private _footer;
        constructor(tablixControl: TablixControl);
        setFooter(footerHeader: any): void;
        hasFooter(): boolean;
        /**
         * This method first populates the footer followed by each row and their correlating body cells from top to bottom.
         */
        _render(): void;
        _createScrollbar(parentElement: HTMLElement): Scrollbar;
        /**
         * This function is a recursive call (with its recursive behavior in addNode()) that will navigate
         * through the row hierarchy in DFS (Depth First Search) order and continue into a single row
         * upto its estimated edge.
         */
        private addNodes(items, rowIndex, depth, firstVisibleIndex);
        getFirstVisibleChildLeaf(item: any): any;
        private bindRowHeader(item, cell);
        /**
         * This method can be thought of as the continuation of addNodes() as it continues the DFS (Depth First Search)
         * started from addNodes(). This function also handles ending the recursion with "_needsToRealize" being set to
         * false.
         *
         * Once the body cells are reached, populating is done linearly with addBodyCells().
         */
        private addNode(item, items, rowIndex, depth);
        private rowHeaderMatch(item, cell);
        private addBodyCells(item, items, rowIndex);
        private bindBodyCell(item, cell);
        private addFooterRowHeader(item);
        private addFooterBodyCells(rowItem);
        private bodyCelMatch(item, cell);
    }
    class TablixColumnDimension extends TablixDimension {
        constructor(tablixControl: TablixControl);
        _render(): void;
        _createScrollbar(parentElement: HTMLElement): Scrollbar;
        private addNodes(items, columnIndex, depth, firstVisibleIndex);
        private addNode(item, items, columnIndex, depth);
        columnHeaderMatch(item: any, cell: ITablixCell): boolean;
    }
}
declare module powerbi.visuals.controls {
    /**
     * This class represents the touch region of the column headers (this can also apply to footer/total).
     * This class is reponsible for interpreting gestures in terms of pixels to changes in column position.
     *
     * Unlike the table body, this can only scroll in one direction.
     */
    class ColumnTouchDelegate implements TouchUtils.ITouchHandler, TouchUtils.IPixelToItem {
        /**
         * Used to termine if the touch event is within bounds.
         */
        private _dimension;
        /**
         * Average pixel width of columns in table.
         */
        private _averageSize;
        /**
         * Used for 'firing' a scroll event following a received gesture.
         */
        private _tablixControl;
        /**
         * Stores the event handler of TablixControl for scroll events.
         */
        private _handlers;
        /**
         * @constructor
         * @param region Location and area of the touch region in respect to its HTML element.
         */
        constructor(region: TouchUtils.Rectangle);
        dimension: TouchUtils.Rectangle;
        /**
         * Sets the amount of columns to be shifted per delta in pixels.
         *
         * @param xRatio Column to pixel ratio (# columns / # pixels).
         */
        setScrollDensity(xRatio: number): void;
        /**
         * Resize element.
         *
         * @param x X location from upper left of listened HTML element.
         * @param y Y location from upper left of listened HTML element.
         * @param width Width of area to listen for events.
         * @param height Height of area to listen for events.
         */
        resize(x: number, y: number, width: number, height: number): void;
        /**
         * @see IPixelToItem.
         */
        getPixelToItem(x: number, y: number, dx: number, dy: number, down: boolean): TouchUtils.TouchEvent;
        /**
         * Fires event to Tablix Control to scroll with the event passed from the TouchManager.
         *
         * @param e Event recieved from touch manager.
         */
        touchEvent(e: TouchUtils.TouchEvent): void;
        /**
         * Asigns handler for scrolling when scroll event is fired.
         *
         * @param tablixObj TablixControl that's handling the fired event.
         * @param handlerCall The call to be made (EXAMPLE: handlerCall = object.method;).
         */
        setHandler(tablixObj: TablixControl, handlerCall: (args: any[]) => void): void;
    }
    /**
     * This class represents the touch region of the row headers (left or right side aligned).
     * This class is reponsible for interpreting gestures in terms of pixels to changes in row position.
     *
     * Unlike the table body, this can only scroll in one direction.
     */
    class RowTouchDelegate implements TouchUtils.ITouchHandler, TouchUtils.IPixelToItem {
        /**
         * Used to termine if the touch event is within bounds.
         */
        private _dimension;
        /**
         * Average pixel height of rows in table.
         */
        private _averageSize;
        /**
         * Used for 'firing' a scroll event following a recieved gesture.
         */
        private _tablixControl;
        /**
         * Stores the event handler of TablixControl for scroll events.
         */
        private _handlers;
        /**
         * @constructor
         * @param region Location and area of the touch region in respect to its HTML element.
         */
        constructor(region: TouchUtils.Rectangle);
        dimension: TouchUtils.Rectangle;
        /**
         * Sets the amount of rows to be shifted per delta in pixels.
         *
         * @param yRatio Row to pixel ratio (# rows / # pixels).
         */
        setScrollDensity(yRatio: number): void;
        /**
         * Resize element.
         * @param x X location from upper left of listened HTML element.
         * @param y Y location from upper left of listened HTML element.
         * @param width Width of area to listen for events.
         * @param height Height of area to listen for events.
         */
        resize(x: number, y: number, width: number, height: number): void;
        /**
         * @see: IPixelToItem
         */
        getPixelToItem(x: number, y: number, dx: number, dy: number, down: boolean): TouchUtils.TouchEvent;
        /**
         * Fires event to Tablix Control to scroll with the event passed from the TouchManager.
         *
         * @param e Event recieved from touch manager.
         */
        touchEvent(e: TouchUtils.TouchEvent): void;
        /**
         * Asigns handler for scrolling when scroll event is fired.
         *
         * @param tablixObj TablixControl that's handling the fired event.
         * @param handlerCall The call to be made (EXAMPLE: handlerCall = object.method;).
         */
        setHandler(tablixObj: TablixControl, handlerCall: (args: any[]) => void): void;
    }
    /**
     * This class represents the touch region covering the body of the table.
     * This class is reponsible for interpreting gestures in terms of pixels to
     * changes in row and column position.
     */
    class BodyTouchDelegate implements TouchUtils.ITouchHandler, TouchUtils.IPixelToItem {
        private static DefaultAverageSizeX;
        private static DefaultAverageSizeY;
        /**
         * Used to termine if the touch event is within bounds.
         */
        private _dimension;
        /**
         * Average pixel width of columns in table.
         */
        private _averageSizeX;
        /**
         * Average pixel height of rows in table.
         */
        private _averageSizeY;
        /**
         * Used for 'firing' a scroll event following a recieved gesture.
         */
        private _tablixControl;
        /**
         * Stores the event handler of TablixControl for scroll events.
         */
        private _handlers;
        /**
         * @constructor
         * @param region Location and area of the touch region in respect to its HTML element.
         */
        constructor(region: TouchUtils.Rectangle);
        /**
         * Returns dimension.
         *
         * @return The dimentions of the region this delegate listens to.
         */
        dimension: TouchUtils.Rectangle;
        /**
         * Sets the amount of rows and columns to be shifted per delta in pixels.
         *
         * @param xRatio Column to pixel ratio (# columns / # pixels)
         * @param yRatio Row to pixel ratio (# rows / # pixels)
         */
        setScrollDensity(xRatio: number, yRatio: number): void;
        /**
         * Resize element.
         *
         * @param x X location from upper left of listened HTML element.
         * @param y Y location from upper left of listened HTML element.
         * @param width Width of area to listen for events.
         * @param height Height of area to listen for events.
         */
        resize(x: number, y: number, width: number, height: number): void;
        /**
         * @see: IPixelToItem.
         */
        getPixelToItem(x: number, y: number, dx: number, dy: number, down: boolean): TouchUtils.TouchEvent;
        /**
         * Fires event to Tablix Control to scroll with the event passed from the TouchManager.
         *
         * @param e Event recieved from touch manager.
         */
        touchEvent(e: TouchUtils.TouchEvent): void;
        /**
         * Asigns handler for scrolling when scroll event is fired.
         *
         * @param tablixObj TablixControl that's handling the fired event.
         * @param handlerCall The call to be made (EXAMPLE: handlerCall = object.method;).
         */
        setHandler(tablixObj: TablixControl, handlerCall: (args: any[]) => void): void;
    }
}
declare module powerbi.visuals.controls.TouchUtils {
    class Point {
        x: number;
        y: number;
        constructor(x?: number, y?: number);
        offset(offsetX: number, offsetY: number): void;
    }
    class Rectangle extends Point {
        width: number;
        height: number;
        constructor(x?: number, y?: number, width?: number, height?: number);
        point: Point;
        contains(p: Point): boolean;
        static contains(rect: Rectangle, p: Point): boolean;
        static isEmpty(rect: Rectangle): boolean;
    }
    enum SwipeDirection {
        /**
         * Swipe gesture moves along the y-axis at an angle within an established threshold.
         */
        Vertical = 0,
        /**
         * Swipe gesture moves along the x-axis at an angle within an established threshold.
         */
        Horizontal = 1,
        /**
         * Swipe gesture does not stay within the thresholds of either x or y-axis.
         */
        FreeForm = 2,
    }
    enum MouseButton {
        NoClick = 0,
        LeftClick = 1,
        RightClick = 2,
        CenterClick = 3,
    }
    /**
     * Interface serves as a way to convert pixel point to any needed unit of
     * positioning over two axises such as row/column positioning.
     */
    interface IPixelToItem {
        getPixelToItem(x: number, y: number, dx: number, dy: number, down: boolean): TouchEvent;
    }
    /**
     * Interface for listening to a simple touch event that's abstracted away
     * from any platform specific traits.
     */
    interface ITouchHandler {
        touchEvent(e: TouchEvent): void;
    }
    /**
     * A simple touch event class that's abstracted away from any platform specific traits.
     */
    class TouchEvent {
        /**
         * X-axis (not neccessarily in pixels (see IPixelToItem)).
         */
        private _x;
        /**
         * Y-axis (not neccessarily in pixels (see IPixelToItem)).
         */
        private _y;
        /**
         * Delta of x-axis (not neccessarily in pixels (see IPixelToItem)).
         */
        private _dx;
        /**
         * Delta of y-axis (not neccessarily in pixels (see IPixelToItem)).
         */
        private _dy;
        /**
         * Determines if the mouse button is pressed.
         */
        private _isMouseDown;
        /**
         * @constructor
         * @param x X Location of mouse.
         * @param y Y Location of mouse.
         * @param isMouseDown Indicates if the mouse button is held down or a finger press on screen.
         * @param dx (optional) The change in x of the gesture.
         * @param dy (optional) The change in y of the gesture.
         */
        constructor(x: number, y: number, isMouseDown: boolean, dx?: number, dy?: number);
        x: number;
        y: number;
        dx: number;
        dy: number;
        /**
         * Returns a boolean indicating if the mouse button is held down.
         *
         * @return: True if the the mouse button is held down,
         * otherwise false.
         */
        isMouseDown: boolean;
    }
    /**
     * This interface defines the datamembers stored for each touch region.
     */
    interface ITouchHandlerSet {
        handler: ITouchHandler;
        region: Rectangle;
        lastPoint: TouchEvent;
        converter: IPixelToItem;
    }
    /**
     * This class "listens" to the TouchEventInterpreter  to recieve touch events and sends it to all
     * "Touch Delegates" with  TouchRegions that contain the mouse event. Prior to sending off the
     * event, its position is put in respect to the delegate's TouchRegion and converted to the appropriate
     * unit (see IPixelToItem).
     */
    class TouchManager {
        /**
         * List of touch regions and their correlating data memebers.
         */
        private _touchList;
        /**
         * Boolean to enable thresholds for fixing to an axis when scrolling.
         */
        private _scrollThreshold;
        /**
         * Boolean to enable locking to an axis when gesture is fixed to an axis.
         */
        private _lockThreshold;
        /**
         * The current direction of the swipe.
         */
        private _swipeDirection;
        /**
         * The count of consecutive events match the current swipe direction.
         */
        private _matchingDirectionCount;
        /**
         * The last recieved mouse event.
         */
        private _lastEvent;
        /**
         * Default constructor.
         *
         * The default behavior is to enable thresholds and lock to axis.
         */
        constructor();
        lastEvent: TouchEvent;
        /**
         * @param region Rectangle indicating the locations of the touch region.
         * @param handler Handler for recieved touch events.
         * @param converter Converts from pixels to the wanted item of measure (rows, columns, etc).
         *
         * EXAMPLE: dx -> from # of pixels to the right to # of columns moved to the right.
         */
        addTouchRegion(region: Rectangle, handler: ITouchHandler, converter: IPixelToItem): void;
        /**
         * Sends a mouse up event to all regions with their last event as a mouse down event.
         */
        upAllTouches(): void;
        touchEvent(e: TouchEvent): void;
        /**
         * @param e Position of event used to find touched regions
         * @return Array of regions that contain the event point.
         */
        private _findRegions(e);
        /**
         * @return Array of regions that contain a mouse down event. (see ITouchHandlerSet.lastPoint).
         */
        private _getActive();
    }
    /**
     * This class is responsible for establishing connections to handle touch events
     * and to interpret those events so they're compatible with the touch abstractions.
     *
     * Touch events with platform specific handles should be done here.
     */
    class TouchEventInterpreter {
        /**
         * HTML element that touch events are drawn from.
         */
        private _touchPanel;
        /**
         * Boolean enabling mouse drag.
         */
        private _allowMouseDrag;
        /**
         * Touch events are interpreted and passed on this manager.
         */
        private _manager;
        /**
         * @see TablixLayoutManager.
         */
        private _scale;
        /**
         * Used for mouse location when a secondary div is used along side the primary with this one being the primary.
         */
        private _touchReferencePoint;
        /**
         * Rectangle containing the targeted Div.
         */
        private _rect;
        private _documentMouseMoveWrapper;
        private _documentMouseUpWrapper;
        constructor(manager: TouchManager);
        initTouch(panel: HTMLElement, touchReferencePoint?: HTMLElement, allowMouseDrag?: boolean): void;
        private getXYByClient(event);
        onTouchStart(e: any): void;
        onTouchMove(e: any): void;
        onTouchEnd(e: any): void;
        onTouchMouseDown(e: MouseEvent): void;
        onTouchMouseMove(e: MouseEvent): void;
        onTouchMouseUp(e: MouseEvent, bubble?: boolean): void;
    }
}
declare module powerbi.visuals {
    interface AnimatedTextConfigurationSettings {
        align?: string;
        maxFontSize?: number;
    }
    /**
     * Base class for values that are animated when resized.
     */
    class AnimatedText {
        /** Note: Public for testability */
        static formatStringProp: DataViewObjectPropertyIdentifier;
        protected animator: IGenericAnimator;
        private name;
        /** Note: Public for testability */
        svg: D3.Selection;
        currentViewport: IViewport;
        value: any;
        hostServices: IVisualHostServices;
        style: IVisualStyle;
        visualConfiguration: AnimatedTextConfigurationSettings;
        metaDataColumn: DataViewMetadataColumn;
        private mainText;
        constructor(name: string);
        getMetaDataColumn(dataView: DataView): void;
        getAdjustedFontHeight(availableWidth: number, textToMeasure: string, seedFontHeight: number): number;
        private getAdjustedFontHeightCore(nodeToMeasure, availableWidth, seedFontHeight, iteration);
        clear(): void;
        doValueTransition(startValue: any, endValue: any, displayUnitSystemType: DisplayUnitSystemType, animationOptions: AnimationOptions, duration: number, forceUpdate: boolean, formatter?: IValueFormatter): void;
        getSeedFontHeight(boundingWidth: number, boundingHeight: number): number;
        getTranslateX(width: number): number;
        getTranslateY(height: number): number;
        getTextAnchor(): string;
        protected getFormatString(column: DataViewMetadataColumn): string;
    }
}
declare module powerbi.visuals {
    /**
     * Renders a number that can be animate change in value.
     */
    class AnimatedNumber extends AnimatedText implements IVisual {
        private options;
        private dataViews;
        constructor(svg?: D3.Selection, animator?: IGenericAnimator);
        init(options: VisualInitOptions): void;
        updateViewportDependantProperties(): void;
        update(options: VisualUpdateOptions): void;
        onDataChanged(options: VisualDataChangedOptions): void;
        onResizing(viewport: IViewport): void;
        canResizeTo(viewport: IViewport): boolean;
        private updateInternal(target, suppressAnimations, forceUpdate?);
    }
}
declare module powerbi.visuals {
    var animatedTextObjectDescs: data.DataViewObjectDescriptors;
    var animatedNumberCapabilities: VisualCapabilities;
}
declare module powerbi.visuals {
    interface BasicShapeDataViewObjects extends DataViewObjects {
        general: BasicShapeDataViewObject;
        line: LineObject;
        fill: FillObject;
        lockAspect: LockAspectObject;
    }
    interface LineObject extends DataViewObject {
        lineColor: Fill;
        roundEdge: number;
        weight: number;
        transparency: number;
    }
    interface FillObject extends DataViewObject {
        transparency: number;
        fillColor: Fill;
        show: boolean;
    }
    interface LockAspectObject extends DataViewObject {
        show: boolean;
    }
    interface BasicShapeDataViewObject extends DataViewObject {
        shapeType: string;
        shapeSvg: string;
    }
    interface BasicShapeData {
        shapeType: string;
        lineColor: string;
        lineTransparency: number;
        lineWeight: number;
        showFill: boolean;
        fillColor: string;
        shapeTransparency: number;
        lockAspectRatio: boolean;
        roundEdge: number;
    }
    class BasicShapeVisual implements IVisual {
        private currentViewport;
        private element;
        private data;
        private selection;
        static DefaultStrokeColor: string;
        private static DefaultFillColor;
        private static DefaultShape;
        private static DefaultWeightValue;
        private static DefaultLineTransValue;
        private static DefaultFillTransValue;
        private static DefaultRoundEdgeValue;
        /**property for the shape line color */
        shapeType: string;
        /**property for the shape line color */
        lineColor: string;
        /**property for the shape line transparency */
        lineTransparency: number;
        /**property for the shape line weight */
        lineWeight: number;
        /**property for the shape round edge */
        roundEdge: number;
        /**property for showing the fill properties */
        showFill: boolean;
        /**property for the shape line color */
        fillColor: string;
        /**property for the shape fill transparency */
        shapeTransparency: number;
        /**property for showing the lock aspect ratio */
        lockAspectRatio: boolean;
        init(options: VisualInitOptions): void;
        constructor(options?: VisualInitOptions);
        onDataChanged(options: VisualDataChangedOptions): void;
        private setData(dataViewObject);
        enumerateObjectInstances(options: EnumerateVisualObjectInstancesOptions): VisualObjectInstance[];
        onResizing(viewport: IViewport): void;
        render(): void;
    }
}
declare module powerbi.visuals {
    var basicShapeCapabilities: VisualCapabilities;
}
declare module powerbi.visuals {
    const enum CartesianChartType {
        Line = 0,
        Area = 1,
        ClusteredColumn = 2,
        StackedColumn = 3,
        ClusteredBar = 4,
        StackedBar = 5,
        HundredPercentStackedBar = 6,
        HundredPercentStackedColumn = 7,
        Scatter = 8,
        ComboChart = 9,
        DataDot = 10,
        Waterfall = 11,
        LineClusteredColumnCombo = 12,
        LineStackedColumnCombo = 13,
        DataDotClusteredColumnCombo = 14,
        DataDotStackedColumnCombo = 15,
    }
    interface CalculateScaleAndDomainOptions {
        viewport: IViewport;
        margin: IMargin;
        forcedTickCount?: number;
        forcedYDomain?: any[];
        forcedXDomain?: any[];
        showCategoryAxisLabel: boolean;
        showValueAxisLabel: boolean;
        forceMerge: boolean;
        categoryAxisScaleType: string;
        valueAxisScaleType: string;
    }
    interface MergedValueAxisResult {
        domain: number[];
        merged: boolean;
        tickCount: number;
        forceStartToZero: boolean;
    }
    interface CartesianSmallViewPortProperties {
        hideLegendOnSmallViewPort: boolean;
        hideAxesOnSmallViewPort: boolean;
        MinHeightLegendVisible: number;
        MinHeightAxesVisible: number;
    }
    interface CartesianConstructorOptions {
        chartType: CartesianChartType;
        isScrollable?: boolean;
        animator?: IGenericAnimator;
        cartesianSmallViewPortProperties?: CartesianSmallViewPortProperties;
    }
    interface ICartesianVisual {
        init(options: CartesianVisualInitOptions): void;
        setData(dataViews: DataView[]): void;
        calculateAxesProperties(options: CalculateScaleAndDomainOptions): IAxisProperties[];
        overrideXScale(xProperties: IAxisProperties): void;
        render(suppressAnimations: boolean): void;
        calculateLegend(): LegendData;
        hasLegend(): boolean;
        onClearSelection(): void;
        enumerateObjectInstances?(options: EnumerateVisualObjectInstancesOptions): VisualObjectInstance[];
        getVisualCategoryAxisIsScalar?(): boolean;
        getSupportedCategoryAxisType?(): string;
        getPreferredPlotArea?(isScalar: boolean, categoryCount: number, categoryThickness: number): IViewport;
        setFilteredData?(startIndex: number, endIndex: number): CartesianData;
    }
    interface CartesianVisualConstructorOptions {
        isScrollable: boolean;
        interactivityService?: IInteractivityService;
        animator?: IGenericAnimator;
    }
    interface CartesianDataPoint {
        categoryValue: any;
        value: number;
        categoryIndex: number;
        seriesIndex: number;
        highlight?: boolean;
    }
    interface CartesianSeries {
        data: CartesianDataPoint[];
    }
    interface CartesianData {
        series: CartesianSeries[];
        categoryMetadata: DataViewMetadataColumn;
        categories: any[];
        hasHighlights?: boolean;
    }
    interface CartesianVisualInitOptions extends VisualInitOptions {
        svg: D3.Selection;
        cartesianHost: ICartesianVisualHost;
    }
    interface ICartesianVisualHost {
        updateLegend(data: LegendData): void;
        getSharedColors(): IDataColorPalette;
    }
    interface ChartAxesLabels {
        x: string;
        y: string;
        y2?: string;
    }
    const enum AxisLinesVisibility {
        ShowLinesOnXAxis = 1,
        ShowLinesOnYAxis = 2,
        ShowLinesOnBothAxis = 3,
    }
    interface CategoryLayout {
        categoryCount: number;
        categoryThickness: number;
        outerPaddingRatio: number;
        isScalar?: boolean;
    }
    interface CategoryLayoutOptions {
        availableWidth: number;
        categoryCount: number;
        domain: any;
        isScalar?: boolean;
        isScrollable?: boolean;
    }
    interface CartesianAxisProperties {
        x: IAxisProperties;
        y1: IAxisProperties;
        y2?: IAxisProperties;
    }
    /**
     * Renders a data series as a cartestian visual.
     */
    class CartesianChart implements IVisual {
        static MinOrdinalRectThickness: number;
        static MinScalarRectThickness: number;
        static OuterPaddingRatio: number;
        static InnerPaddingRatio: number;
        static TickLabelPadding: number;
        private static ClassName;
        private static AxisGraphicsContextClassName;
        private static MaxMarginFactor;
        private static MinBottomMargin;
        private static TopMargin;
        private static LeftPadding;
        private static RightPadding;
        private static BottomPadding;
        private static YAxisLabelPadding;
        private static XAxisLabelPadding;
        private static TickPaddingY;
        private static TickPaddingRotatedX;
        private static FontSize;
        private static FontSizeString;
        private static TextProperties;
        private axisGraphicsContext;
        private xAxisGraphicsContext;
        private y1AxisGraphicsContext;
        private y2AxisGraphicsContext;
        private element;
        private svg;
        private clearCatcher;
        private margin;
        private type;
        private hostServices;
        private layers;
        private legend;
        private legendMargins;
        private layerLegendData;
        private hasSetData;
        private visualInitOptions;
        private legendObjectProperties;
        private categoryAxisProperties;
        private valueAxisProperties;
        private cartesianSmallViewPortProperties;
        private interactivityService;
        private y2AxisExists;
        private categoryAxisHasUnitType;
        private valueAxisHasUnitType;
        private hasCategoryAxis;
        private yAxisIsCategorical;
        private secValueAxisHasUnitType;
        private axes;
        private yAxisOrientation;
        private bottomMarginLimit;
        private leftRightMarginLimit;
        private sharedColorPalette;
        animator: IGenericAnimator;
        private isScrollable;
        private scrollY;
        private scrollX;
        private isXScrollBarVisible;
        private isYScrollBarVisible;
        private svgScrollable;
        private axisGraphicsContextScrollable;
        private brushGraphicsContext;
        private brushContext;
        private brush;
        private static ScrollBarWidth;
        private static fillOpacity;
        private brushMinExtent;
        private scrollScale;
        private dataViews;
        private currentViewport;
        private static getAxisVisibility(type);
        constructor(options: CartesianConstructorOptions);
        init(options: VisualInitOptions): void;
        private renderAxesLabels(axisLabels, legendMargin, viewport, hideXAxisTitle, hideYAxisTitle, hideY2AxisTitle);
        private adjustMargins(viewport);
        private updateAxis(viewport);
        static getIsScalar(objects: DataViewObjects, propertyId: DataViewObjectPropertyIdentifier, type: ValueType): boolean;
        private populateObjectProperties(dataViews);
        update(options: VisualUpdateOptions): void;
        onDataChanged(options: VisualDataChangedOptions): void;
        onResizing(viewport: IViewport): void;
        enumerateObjectInstances(options: EnumerateVisualObjectInstancesOptions): VisualObjectInstance[];
        private shouldShowLegendCard();
        scrollTo(position: number): void;
        private getCategoryAxisValues();
        private getValueAxisValues();
        private findObjectWithProperty(objectInstances, propertyName);
        onClearSelection(): void;
        private createAndInitLayers(dataViews);
        private renderLegend();
        private hideLegends();
        private addUnitTypeToAxisLabel(axes);
        private shouldRenderSecondaryAxis(axisProperties);
        private shouldRenderAxis(axisProperties, propertyName?);
        private render(suppressAnimations);
        private hideAxisLabels(legendMargins);
        private renderChartWithScrollBar(inputMainAxisScale, brushX, brushY, svgLength, viewport, axes, width, tickLabelMargins, chartHasAxisLabels, axisLabels, suppressAnimations);
        private getMinExtent(svgLength, scrollSpaceLength);
        private onBrushEnd(minExtent);
        private onBrushed(scrollScale, mainAxisScale, axes, width, tickLabelMargins, chartHasAxisLabels, axisLabels, viewport, scrollSpaceLength);
        /**
         * To show brush every time when mouse is clicked on the empty background.
         */
        private setMinBrush(scrollSpaceLength, minExtent);
        private static getUnitType(axis, axisPropertiesLookup);
        private static clampBrushExtent(brush, viewportWidth, minExtent);
        private getMaxMarginFactor();
        private renderChart(mainAxisScale, axes, width, tickLabelMargins, chartHasAxisLabels, axisLabels, viewport, suppressAnimations, scrollScale?, extent?);
        /**
         * Within the context of the given selection (g), find the offset of
         * the zero tick using the d3 attached datum of g.tick elements.
         * 'Classed' is undefined for transition selections
         */
        private static darkenZeroLine(g);
        /**
         * Returns the actual viewportWidth if visual is not scrollable.
         * @return If visual is scrollable, returns the plot area needed to draw all the datapoints.
         */
        static getPreferredPlotArea(categoryCount: number, categoryThickness: number, viewport: IViewport, isScrollable: boolean, isScalar: boolean): IViewport;
        /**
         * Returns preferred Category span if the visual is scrollable.
         */
        static getPreferredCategorySpan(categoryCount: number, categoryThickness: number): number;
        /**
         * Note: Public for testing access.
         */
        static getLayout(data: ColumnChartData, options: CategoryLayoutOptions): CategoryLayout;
        /**
         * Returns the thickness for each category.
         * For clustered charts, you still need to divide by
         * the number of series to get column width after calling this method.
         * For linear or time scales, category thickness accomodates for
         * the minimum interval between consequtive points.
         * For all types, return value has accounted for outer padding,
         * but not inner padding.
         */
        static getCategoryThickness(seriesList: CartesianSeries[], numCategories: number, plotLength: number, domain: number[], isScalar: boolean): number;
        private static getMinInterval(seriesList);
    }
    class SharedColorPalette implements IDataColorPalette {
        private palette;
        private preferredScale;
        private rotated;
        constructor(palette: IDataColorPalette);
        getColorScaleByKey(scaleKey: string): IColorScale;
        getNewColorScale(): IColorScale;
        getColorByIndex(index: number): IColorInfo;
        getSentimentColors(): IColorInfo[];
        getBasePickerColors(): IColorInfo[];
        clearPreferredScale(): void;
        rotateScale(): void;
        private setPreferredScale(scaleKey);
    }
}
declare module powerbi.visuals {
    function getColumnChartCapabilities(transposeAxes?: boolean): VisualCapabilities;
    var columnChartProps: {
        dataPoint: {
            defaultColor: DataViewObjectPropertyIdentifier;
            fill: DataViewObjectPropertyIdentifier;
            showAllDataPoints: DataViewObjectPropertyIdentifier;
        };
        general: {
            formatString: DataViewObjectPropertyIdentifier;
        };
        categoryAxis: {
            axisType: DataViewObjectPropertyIdentifier;
        };
    };
}
declare module powerbi.visuals {
    interface ColumnChartConstructorOptions extends CartesianVisualConstructorOptions {
        chartType: ColumnChartType;
        animator: IColumnChartAnimator;
    }
    interface ColumnChartData extends CartesianData {
        categories: any[];
        categoryFormatter: IValueFormatter;
        series: ColumnChartSeries[];
        valuesMetadata: DataViewMetadataColumn[];
        legendData: LegendData;
        hasHighlights: boolean;
        categoryMetadata: DataViewMetadataColumn;
        scalarCategoryAxis: boolean;
        labelSettings: VisualDataLabelsSettings;
        axesLabels: ChartAxesLabels;
        hasDynamicSeries: boolean;
        defaultDataPointColor?: string;
        showAllDataPoints?: boolean;
        hasSelection: boolean;
    }
    interface ColumnChartSeries extends CartesianSeries {
        displayName: string;
        key: string;
        index: number;
        data: ColumnChartDataPoint[];
        identity: SelectionId;
        color: string;
    }
    interface ColumnChartDataPoint extends CartesianDataPoint, SelectableDataPoint, TooltipEnabledDataPoint, LabelEnabledDataPoint {
        categoryValue: number;
        /** Adjusted for 100% stacked if applicable */
        value: number;
        /** The top (column) or right (bar) of the rectangle, used for positioning stacked rectangles */
        position: number;
        valueAbsolute: number;
        /** Not adjusted for 100% stacked */
        valueOriginal: number;
        seriesIndex: number;
        categoryIndex: number;
        color: string;
        /** The original values from the highlighted rect, used in animations */
        originalValue: number;
        originalPosition: number;
        originalValueAbsolute: number;
        /**
         * True if this data point is a highlighted portion and overflows (whether due to the highlight
         * being greater than original or of a different sign), so it needs to be thinner to accomodate.
         */
        drawThinner?: boolean;
        key: string;
        lastSeries?: boolean;
        chartType: ColumnChartType;
    }
    enum ColumnChartType {
        clusteredBar,
        clusteredColumn,
        hundredPercentStackedBar,
        hundredPercentStackedColumn,
        stackedBar,
        stackedColumn,
    }
    interface ColumnAxisOptions {
        xScale: D3.Scale.Scale;
        yScale: D3.Scale.Scale;
        seriesOffsetScale?: D3.Scale.Scale;
        columnWidth: number;
        /** Used by clustered only since categoryWidth !== columnWidth */
        categoryWidth?: number;
        isScalar: boolean;
        margin: IMargin;
    }
    interface IColumnLayout {
        shapeLayout: {
            width: (d: ColumnChartDataPoint, i) => number;
            x: (d: ColumnChartDataPoint, i) => number;
            y: (d: ColumnChartDataPoint, i) => number;
            height: (d: ColumnChartDataPoint, i) => number;
        };
        shapeLayoutWithoutHighlights: {
            width: (d: ColumnChartDataPoint, i) => number;
            x: (d: ColumnChartDataPoint, i) => number;
            y: (d: ColumnChartDataPoint, i) => number;
            height: (d: ColumnChartDataPoint, i) => number;
        };
        zeroShapeLayout: {
            width: (d: ColumnChartDataPoint, i) => number;
            x: (d: ColumnChartDataPoint, i) => number;
            y: (d: ColumnChartDataPoint, i) => number;
            height: (d: ColumnChartDataPoint, i) => number;
        };
    }
    interface ColumnChartContext {
        height: number;
        width: number;
        duration: number;
        margin: IMargin;
        mainGraphicsContext: D3.Selection;
        layout: CategoryLayout;
        animator: IColumnChartAnimator;
        onDragStart?: (datum: ColumnChartDataPoint) => void;
        interactivityService: IInteractivityService;
        viewportHeight: number;
        is100Pct: boolean;
    }
    interface IColumnChartStrategy {
        setData(data: ColumnChartData): void;
        setupVisualProps(columnChartProps: ColumnChartContext): void;
        setXScale(is100Pct: boolean, forcedTickCount?: number, forcedXDomain?: any[], axisScaleType?: string): IAxisProperties;
        setYScale(is100Pct: boolean, forcedTickCount?: number, forcedYDomain?: any[], axisScaleType?: string): IAxisProperties;
        drawColumns(useAnimation: boolean): ColumnChartDrawInfo;
        selectColumn(selectedColumnIndex: number, lastSelectedColumnIndex: number): void;
        getClosestColumnIndex(x: number, y: number): number;
    }
    interface IColumnChartConverterStrategy {
        getLegend(colors: IDataColorPalette, defaultColor?: string): LegendSeriesInfo;
        getValueBySeriesAndCategory(series: number, category: number): number;
        getMeasureNameByIndex(series: number, category: number): string;
        hasHighlightValues(series: number): boolean;
        getHighlightBySeriesAndCategory(series: number, category: number): number;
    }
    interface LegendSeriesInfo {
        legend: LegendData;
        seriesSources: DataViewMetadataColumn[];
        seriesObjects: DataViewObjects[][];
    }
    interface ClassAndSelector {
        class: string;
        selector: string;
    }
    interface ColumnChartDrawInfo {
        shapesSelection: D3.Selection;
        labelLayout: ILabelLayout;
        viewport: IViewport;
        axisOptions: ColumnAxisOptions;
    }
    /**
     * Renders a stacked and clustered column chart.
     */
    class ColumnChart implements ICartesianVisual, IInteractiveVisual {
        private static ColumnChartClassName;
        static SeriesClasses: ClassAndSelector;
        private svg;
        private clearCatcher;
        private mainGraphicsContext;
        private xAxisProperties;
        private yAxisProperties;
        private currentViewport;
        private data;
        private style;
        private colors;
        private chartType;
        private columnChart;
        private hostService;
        private cartesianVisualHost;
        private interactivity;
        private margin;
        private options;
        private lastInteractiveSelectedColumnIndex;
        private supportsOverflow;
        private interactivityService;
        private dataViewCat;
        private categoryAxisType;
        private animator;
        private isScrollable;
        private element;
        constructor(options: ColumnChartConstructorOptions);
        static customizeQuery(options: CustomizeQueryOptions): void;
        static getSortableRoles(options: VisualSortableOptions): string[];
        updateVisualMetadata(x: IAxisProperties, y: IAxisProperties, margin: any): void;
        init(options: CartesianVisualInitOptions): void;
        private getCategoryLayout(numCategoryValues, options);
        static converter(dataView: DataViewCategorical, colors: IDataColorPalette, is100PercentStacked?: boolean, isScalar?: boolean, supportsOverflow?: boolean, dataViewMetadata?: DataViewMetadata, chartType?: ColumnChartType): ColumnChartData;
        private static createDataPoints(dataViewCat, categories, categoryIdentities, legend, seriesObjectsList, converterStrategy, labelSettings, is100PercentStacked?, isScalar?, supportsOverflow?, isCategoryAlsoSeries?, categoryObjectsList?, defaultDataPointColor?, chartType?, categoryMetadata?);
        private static getDataPointColor(legendItem, categoryIndex, dataPointObjects?);
        private static getStackedLabelColor(isNegative, seriesIndex, seriesCount, categoryIndex, rawValues);
        static sliceSeries(series: ColumnChartSeries[], endIndex: number, startIndex?: number): ColumnChartSeries[];
        static getForcedTickValues(min: number, max: number, forcedTickCount: number): number[];
        static getTickInterval(tickValues: number[]): number;
        static getInteractiveColumnChartDomElement(element: JQuery): HTMLElement;
        setData(dataViews: DataView[]): void;
        calculateLegend(): LegendData;
        hasLegend(): boolean;
        enumerateObjectInstances(options: EnumerateVisualObjectInstancesOptions): VisualObjectInstance[];
        private enumerateDataPoints();
        calculateAxesProperties(options: CalculateScaleAndDomainOptions): IAxisProperties[];
        getPreferredPlotArea(isScalar: boolean, categoryCount: number, categoryThickness: number): IViewport;
        private ApplyInteractivity(chartContext);
        private selectColumn(indexOfColumnSelected, force?);
        private createInteractiveLegendDataPoints(columnIndex);
        overrideXScale(xProperties: IAxisProperties): void;
        render(suppressAnimations: boolean): void;
        onClearSelection(): void;
        accept(visitor: InteractivityVisitor, options: any): void;
        getVisualCategoryAxisIsScalar(): boolean;
        getSupportedCategoryAxisType(): string;
        setFilteredData(startIndex: number, endIndex: number): CartesianData;
    }
}
declare module powerbi.visuals {
    class ClusteredColumnChartStrategy implements IColumnChartStrategy {
        private static classes;
        private data;
        private graphicsContext;
        private seriesOffsetScale;
        private width;
        private height;
        private margin;
        private xProps;
        private yProps;
        private categoryLayout;
        private viewportHeight;
        private columnsCenters;
        private columnSelectionLineHandle;
        private animator;
        private interactivityService;
        setupVisualProps(columnChartProps: ColumnChartContext): void;
        setData(data: ColumnChartData): void;
        setXScale(is100Pct: boolean, forcedTickCount?: number, forcedXDomain?: any[], axisScaleType?: string): IAxisProperties;
        setYScale(is100Pct: boolean, forcedTickCount?: number, forcedYDomain?: any[], axisScaleType?: string): IAxisProperties;
        drawColumns(useAnimation: boolean): ColumnChartDrawInfo;
        selectColumn(selectedColumnIndex: number, lastSelectedColumnIndex: number): void;
        getClosestColumnIndex(x: number, y: number): number;
        /**
         * Get the chart's columns centers (x value).
         */
        private getColumnsCenters();
        private moveHandle(selectedColumnIndex);
        static getLayout(data: ColumnChartData, axisOptions: ColumnAxisOptions): IColumnLayout;
        private getLabelLayoutXY(axisOptions, labelSettings);
    }
    class ClusteredBarChartStrategy implements IColumnChartStrategy {
        private static classes;
        private data;
        private graphicsContext;
        private seriesOffsetScale;
        private width;
        private height;
        private margin;
        private xProps;
        private yProps;
        private categoryLayout;
        private viewportHeight;
        private barsCenters;
        private columnSelectionLineHandle;
        private animator;
        private interactivityService;
        setupVisualProps(barChartProps: ColumnChartContext): void;
        setData(data: ColumnChartData): void;
        setYScale(is100Pct: boolean, forcedTickCount?: number, forcedYDomain?: any[]): IAxisProperties;
        setXScale(is100Pct: boolean, forcedTickCount?: number, forcedXDomain?: any[], axisScaleType?: string): IAxisProperties;
        drawColumns(useAnimation: boolean): ColumnChartDrawInfo;
        selectColumn(selectedColumnIndex: number, lastSelectedColumnIndex: number): void;
        getClosestColumnIndex(x: number, y: number): number;
        /**
         * Get the chart's columns centers (y value).
         */
        private getBarsCenters();
        private moveHandle(selectedColumnIndex);
        static getLayout(data: ColumnChartData, axisOptions: ColumnAxisOptions): IColumnLayout;
        private getLabelLayoutXY(axisOptions, visualWidth, labelSettings);
    }
}
declare module powerbi.visuals {
    class StackedColumnChartStrategy implements IColumnChartStrategy {
        private static classes;
        private data;
        private graphicsContext;
        private width;
        height: number;
        private margin;
        private xProps;
        private yProps;
        private categoryLayout;
        private columnsCenters;
        private columnSelectionLineHandle;
        private animator;
        private interactivityService;
        private viewportHeight;
        setupVisualProps(columnChartProps: ColumnChartContext): void;
        setData(data: ColumnChartData): void;
        setXScale(is100Pct: boolean, forcedTickCount?: number, forcedXDomain?: any[], axisScaleType?: string): IAxisProperties;
        setYScale(is100Pct: boolean, forcedTickCount?: number, forcedYDomain?: any[], axisScaleType?: string): IAxisProperties;
        drawColumns(useAnimation: boolean): ColumnChartDrawInfo;
        selectColumn(selectedColumnIndex: number, lastSelectedColumnIndex: number): void;
        getClosestColumnIndex(x: number, y: number): number;
        /**
         * Get the chart's columns centers (x value).
         */
        private getColumnsCenters();
        private moveHandle(selectedColumnIndex);
        static getLayout(data: ColumnChartData, axisOptions: ColumnAxisOptions): IColumnLayout;
        private getLabelLayoutXY(axisOptions, labelSettings);
        private getLabelLayoutY(d, is100Pct, axisOptions, labelSettings);
    }
    class StackedBarChartStrategy implements IColumnChartStrategy {
        private static classes;
        private data;
        private graphicsContext;
        private width;
        height: number;
        private margin;
        private xProps;
        private yProps;
        private categoryLayout;
        private barsCenters;
        private columnSelectionLineHandle;
        private animator;
        private interactivityService;
        private viewportHeight;
        setupVisualProps(barChartProps: ColumnChartContext): void;
        setData(data: ColumnChartData): void;
        setYScale(is100Pct: boolean, forcedTickCount?: number, forcedYDomain?: any[], axisScaleType?: string): IAxisProperties;
        setXScale(is100Pct: boolean, forcedTickCount?: number, forcedXDomain?: any[], axisScaleType?: string): IAxisProperties;
        drawColumns(useAnimation: boolean): ColumnChartDrawInfo;
        selectColumn(selectedColumnIndex: number, lastInteractiveSelectedColumnIndex: number): void;
        getClosestColumnIndex(x: number, y: number): number;
        /**
         * Get the chart's columns centers (y value).
         */
        private getBarsCenters();
        private moveHandle(selectedColumnIndex);
        static getLayout(data: ColumnChartData, axisOptions: ColumnAxisOptions): IColumnLayout;
        private getLabelLayoutXY(axisOptions, visualWidth, labelSettings);
    }
}
declare module powerbi.visuals.samples {
    interface HelloViewModel {
        text: string;
        color: string;
        size: number;
        selector: data.Selector;
        toolTipInfo: TooltipDataItem[];
    }
    class HelloIVisual implements IVisual {
        static capabilities: VisualCapabilities;
        private static DefaultText;
        private root;
        private svgText;
        private dataView;
        private selectiionManager;
        static converter(dataView: DataView): HelloViewModel;
        init(options: VisualInitOptions): void;
        update(options: VisualUpdateOptions): void;
        private static getFill(dataView);
        private static getSize(dataView);
        enumerateObjectInstances(options: EnumerateVisualObjectInstancesOptions): VisualObjectInstance[];
        destroy(): void;
    }
}
declare module powerbi.visuals.samples {
    interface AsterDatapoint {
        color: string;
        sliceHeight: number;
        sliceWidth: number;
        label: string;
        selector: data.Selector;
        tooltipInfo: TooltipDataItem[];
    }
    class AsterPlot implements IVisual {
        static capabilities: VisualCapabilities;
        private static VisualClassName;
        private static AsterSlice;
        private static OuterLine;
        private svg;
        private mainGroupElement;
        private centerText;
        private colors;
        private selectionManager;
        private dataView;
        static converter(dataView: DataView, colors: IDataColorPalette): AsterDatapoint[];
        init(options: VisualInitOptions): void;
        update(options: VisualUpdateOptions): void;
        private drawOuterLine(innerRadius, radius, data);
        private getCenterText(dataView);
        private drawCenterText(innerRadius);
        private getShowOuterline(dataView);
        private getOuterThickness(dataView);
        private getLabelFill(dataView);
        enumerateObjectInstances(options: EnumerateVisualObjectInstancesOptions): VisualObjectInstance[];
    }
}
declare module powerbi.visuals {
    var comboChartCapabilities: VisualCapabilities;
    var comboChartProps: {
        general: {
            formatString: DataViewObjectPropertyIdentifier;
        };
    };
}
declare module powerbi.visuals {
    interface ComboChartDataViewObjects extends DataViewObjects {
        general: ComboChartDataViewObject;
    }
    interface ComboChartDataViewObject extends DataViewObject {
        visualType1: string;
        visualType2: string;
    }
    /**
     * This module only supplies the capabilities for comboCharts.
     * Implementation is in cartesianChart and the various ICartesianVisual implementations.
     */
    module ComboChart {
        var capabilities: VisualCapabilities;
    }
}
declare module powerbi.visuals {
    var donutChartCapabilities: VisualCapabilities;
    var donutChartProps: {
        general: {
            formatString: DataViewObjectPropertyIdentifier;
        };
        dataPoint: {
            defaultColor: DataViewObjectPropertyIdentifier;
            fill: DataViewObjectPropertyIdentifier;
            showAllDataPoints: DataViewObjectPropertyIdentifier;
        };
        legend: {
            show: DataViewObjectPropertyIdentifier;
            position: DataViewObjectPropertyIdentifier;
            showTitle: DataViewObjectPropertyIdentifier;
            titleText: DataViewObjectPropertyIdentifier;
        };
    };
}
/**
 * IMPORTANT: This chart is not currently enabled in the PBI system and is under development.
 */
declare module powerbi.visuals {
    interface IDataDotChartConfiguration {
        xAxisProperties: IAxisProperties;
        yAxisProperties: IAxisProperties;
        margin: any;
    }
    interface DataDotChartData {
        series: DataDotChartSeries;
        hasHighlights: boolean;
        hasDynamicSeries: boolean;
    }
    interface DataDotChartSeries extends CartesianSeries {
        xCol: DataViewMetadataColumn;
        yCol: DataViewMetadataColumn;
        data: DataDotChartDataPoint[];
    }
    interface DataDotChartDataPoint extends CartesianDataPoint, SelectableDataPoint {
        highlight: boolean;
    }
    interface DataDotChartConstructorOptions extends CartesianVisualConstructorOptions {
    }
    /**
     * The data dot chart shows a set of circles with the data value inside them.
     * The circles are regularly spaced similar to column charts.
     * The radius of all dots is the same across the chart.
     * This is most often combined with a column chart to create the 'chicken pox' chart.
     * If any of the data values do not fit within the circles, then the data values are hidden
     * and the y axis for the dots is displayed instead.
     * This chart only supports a single series of data.
     * This chart does not display a legend.
     */
    class DataDotChart implements ICartesianVisual, IInteractiveVisual {
        static formatStringProp: DataViewObjectPropertyIdentifier;
        private static ClassName;
        private static DotClassName;
        private static DotClassSelector;
        private static DotColorKey;
        private static DotLabelClassName;
        private static DotLabelClassSelector;
        private static DotLabelVerticalOffset;
        private static DotLabelTextAnchor;
        private options;
        private svg;
        private element;
        private mainGraphicsG;
        private mainGraphicsContext;
        private clearCatcher;
        private currentViewport;
        private hostService;
        private cartesianVisualHost;
        private style;
        private colors;
        private isScrollable;
        private xAxisProperties;
        private yAxisProperties;
        private margin;
        private data;
        private dataViewCategorical;
        private clippedData;
        private interactivityService;
        private interactivity;
        constructor(options: DataDotChartConstructorOptions);
        init(options: CartesianVisualInitOptions): void;
        setData(dataViews: DataView[]): void;
        setFilteredData(startIndex: number, endIndex: number): any;
        calculateAxesProperties(options: CalculateScaleAndDomainOptions): IAxisProperties[];
        private static createClippedDataIfOverflowed(data, categoryCount);
        private static hasDataPoint(series);
        private lookupXValue(index, type);
        overrideXScale(xProperties: IAxisProperties): void;
        render(suppressAnimations: boolean): void;
        calculateLegend(): LegendData;
        hasLegend(): boolean;
        private createLegendDataPoints(columnIndex);
        onClearSelection(): void;
        static converter(dataView: DataView, blankCategoryValue: string): DataDotChartData;
        accept(visitor: InteractivityVisitor, options: any): void;
    }
}
declare module powerbi.visuals {
    var dataDotChartCapabilities: VisualCapabilities;
}
declare module powerbi.visuals {
    var filledMapCapabilities: VisualCapabilities;
}
declare module powerbi.visuals {
    var funnelChartCapabilities: VisualCapabilities;
    var funnelChartProps: {
        general: {
            formatString: DataViewObjectPropertyIdentifier;
        };
        dataPoint: {
            defaultColor: DataViewObjectPropertyIdentifier;
            fill: DataViewObjectPropertyIdentifier;
        };
    };
}
declare module powerbi.visuals {
    interface FunnelChartConstructorOptions {
        animator: IFunnelAnimator;
        funnelSmallViewPortProperties?: FunnelSmallViewPortProperties;
    }
    interface FunnelPercent {
        value: number;
        percent: number;
        isTop: boolean;
    }
    interface FunnelSlice extends SelectableDataPoint, TooltipEnabledDataPoint, LabelEnabledDataPoint {
        value: number;
        label: string;
        key: string;
        categoryOrMeasureIndex: number;
        highlight?: boolean;
        highlightValue?: number;
        color: string;
    }
    interface FunnelData {
        slices: FunnelSlice[];
        categoryLabels: string[];
        valuesMetadata: DataViewMetadataColumn[];
        hasHighlights: boolean;
        highlightsOverflow: boolean;
        dataLabelsSettings: VisualDataLabelsSettings;
        canShowDataLabels: boolean;
    }
    interface FunnelAxisOptions {
        maxScore: number;
        xScale: D3.Scale.OrdinalScale;
        yScale: D3.Scale.LinearScale;
        verticalRange: number;
        margin: IMargin;
        rangeStart: number;
        rangeEnd: number;
        barToSpaceRatio: number;
        categoryLabels: string[];
    }
    interface IFunnelLayout {
        percentBarLayout: {
            mainLine: {
                x2: (d: FunnelPercent) => number;
                transform: (d: FunnelPercent) => string;
            };
            leftTick: {
                y2: (d: FunnelPercent) => number;
                transform: (d: FunnelPercent) => string;
            };
            rightTick: {
                y2: (d: FunnelPercent) => number;
                transform: (d: FunnelPercent) => string;
            };
            text: {
                x: (d: FunnelPercent) => number;
                y: (d: FunnelPercent) => number;
                style: () => string;
                transform: (d: FunnelPercent) => string;
            };
        };
        shapeLayout: {
            width: (d: FunnelSlice) => number;
            height: (d: FunnelSlice) => number;
            x: (d: FunnelSlice) => number;
            y: (d: FunnelSlice) => number;
        };
        shapeLayoutWithoutHighlights: {
            width: (d: FunnelSlice) => number;
            height: (d: FunnelSlice) => number;
            x: (d: FunnelSlice) => number;
            y: (d: FunnelSlice) => number;
        };
        zeroShapeLayout: {
            width: (d: FunnelSlice) => number;
            height: (d: FunnelSlice) => number;
            x: (d: FunnelSlice) => number;
            y: (d: FunnelSlice) => number;
        };
    }
    interface IFunnelChartSelectors {
        percentBar: {
            root: ClassAndSelector;
            mainLine: ClassAndSelector;
            leftTick: ClassAndSelector;
            rightTick: ClassAndSelector;
            text: ClassAndSelector;
        };
    }
    interface FunnelSmallViewPortProperties {
        hideFunnelCategoryLabelsOnSmallViewPort: boolean;
        minHeightFunnelCategoryLabelsVisible: number;
    }
    /**
     * Renders a funnel chart.
     */
    class FunnelChart implements IVisual, IInteractiveVisual {
        static DefaultBarOpacity: number;
        static DimmedBarOpacity: number;
        static PercentBarToBarRatio: number;
        static TickPadding: number;
        static InnerTickSize: number;
        static InnerTextClassName: string;
        static CreateSelector: (className: any) => {
            class: any;
            selector: string;
        };
        static Selectors: IFunnelChartSelectors;
        private static VisualClassName;
        private static BarToSpaceRatio;
        private static MaxBarWidth;
        private static MinBarThickness;
        private static LabelFunnelPadding;
        private static InnerTextMinimumPadding;
        private static InnerTextHeightDelta;
        private static StandardTextProperties;
        private static OverflowingHighlightWidthRatio;
        private svg;
        private funnelGraphicsContext;
        private percentGraphicsContext;
        private clearCatcher;
        private axisGraphicsContext;
        private currentViewport;
        private colors;
        private data;
        private hostServices;
        private margin;
        private options;
        private interactivityService;
        private defaultDataPointColor;
        private labelPositionObjects;
        private dataViews;
        private funnelSmallViewPortProperties;
        /**
         * Note: Public for testing.
         */
        animator: IFunnelAnimator;
        constructor(options?: FunnelChartConstructorOptions);
        static converter(dataView: DataView, colors: IDataColorPalette, defaultDataPointColor?: string): FunnelData;
        enumerateObjectInstances(options: EnumerateVisualObjectInstancesOptions): VisualObjectInstance[];
        private enumerateDataPoints();
        init(options: VisualInitOptions): void;
        private updateViewportProperties();
        update(options: VisualUpdateOptions): void;
        onDataChanged(options: VisualDataChangedOptions): void;
        onResizing(viewport: IViewport): void;
        private getMaxLeftMargin(labels, properties);
        private updateInternal(suppressAnimations);
        private getUsableVerticalSpace();
        private isHidingPercentBars();
        private isSparklines();
        private setUpAxis();
        accept(visitor: InteractivityVisitor, options: any): void;
        onClearSelection(): void;
        static getLayout(data: FunnelData, axisOptions: FunnelAxisOptions): IFunnelLayout;
        static drawDefaultAxis(graphicsContext: D3.Selection, axisOptions: FunnelAxisOptions, isHidingPercentBars: boolean): void;
        static drawDefaultShapes(data: FunnelData, slices: FunnelSlice[], graphicsContext: D3.Selection, layout: IFunnelLayout): D3.UpdateSelection;
        static getFunnelSliceValue(slice: FunnelSlice): number;
        private static drawPercentBarComponents(graphicsContext, data, layout);
        static drawPercentBars(data: FunnelData, graphicsContext: D3.Selection, layout: IFunnelLayout, isHidingPercentBars: boolean): void;
        private showCategoryLabels();
    }
}
declare module powerbi.visuals {
    interface GaugeData extends TooltipEnabledDataPoint {
        percent: number;
        adjustedTotal: number;
        total: number;
        metadataColumn: DataViewMetadataColumn;
        targetSettings: GaugeTargetSettings;
    }
    interface GaugeTargetSettings {
        min: number;
        max: number;
        target: number;
    }
    interface GaugeTargetData extends GaugeTargetSettings {
        total: number;
        tooltipItems: TooltipSeriesDataItem[];
    }
    interface GaugeSmallViewPortProperties {
        hideGaugeSideNumbersOnSmallViewPort: boolean;
        smallGaugeMarginsOnSmallViewPort: boolean;
        MinHeightGaugeSideNumbersVisible: number;
        GaugeMarginsOnSmallViewPort: number;
    }
    interface GaugeVisualProperties {
        radius: number;
        innerRadiusOfArc: number;
        innerRadiusFactor: number;
        left: number;
        top: number;
        height: number;
        width: number;
        margin: IMargin;
        transformString: string;
    }
    interface AnimatedNumberProperties {
        transformString: string;
        viewport: IViewport;
    }
    interface GaugeConstructorOptions {
        gaugeSmallViewPortProperties?: GaugeSmallViewPortProperties;
        animator?: IGenericAnimator;
    }
    interface GaugeDataViewObjects extends DataViewObjects {
        axis: GaugeDataViewObject;
    }
    interface GaugeDataViewObject extends DataViewObject {
        min?: number;
        max?: number;
        target?: number;
    }
    /**
     * Renders a number that can be animate change in value.
     */
    class Gauge implements IVisual {
        private static MIN_VALUE;
        private static MAX_VALUE;
        private static MinDistanceFromBottom;
        private static MinWidthForTargetLabel;
        private static DefaultTopBottomMargin;
        private static DefaultLeftRightMargin;
        private static ReducedLeftRightMargin;
        private static DEFAULT_MAX;
        private static DEFAULT_MIN;
        private static VisualClassName;
        private static DefaultStyleProperties;
        private static DefaultTargetSettings;
        private static InnerRadiusFactor;
        private static KpiBandDistanceFromMainArc;
        private static MainGaugeGroupElementName;
        private static LabelText;
        private static TargetConnector;
        private static TargetText;
        /** Note: Public for testability */
        static formatStringProp: DataViewObjectPropertyIdentifier;
        private svg;
        private mainGraphicsContext;
        private currentViewport;
        private element;
        private style;
        private data;
        private color;
        private backgroundArc;
        private foregroundArc;
        private kpiArcs;
        private kpiArcPaths;
        private foregroundArcPath;
        private backgroundArcPath;
        private targetLine;
        private targetConnector;
        private targetText;
        private options;
        private lastAngle;
        private margin;
        private animatedNumberGrapicsContext;
        private animatedNumber;
        private settings;
        private targetSettings;
        private gaugeVisualProperties;
        private gaugeSmallViewPortProperties;
        private showTargetLabel;
        private hostService;
        private dataViews;
        animator: IGenericAnimator;
        constructor(options?: GaugeConstructorOptions);
        enumerateObjectInstances(options: EnumerateVisualObjectInstancesOptions): VisualObjectInstance[];
        private enumerateAxis();
        private static getGaugeObjectsProperties(dataView);
        init(options: VisualInitOptions): void;
        update(options: VisualUpdateOptions): void;
        onDataChanged(options: VisualDataChangedOptions): void;
        onResizing(viewport: IViewport): void;
        onStyleChanged(newStyle: IVisualStyle): void;
        private static getValidSettings(targetData);
        private static getGaugeData(dataView);
        private static overrideGaugeSettings(settings, gaugeObjectsSettings);
        /** Note: Made public for testability */
        static converter(dataView: DataView): GaugeData;
        static getMetaDataColumn(dataView: DataView): DataViewMetadataColumn;
        private initKpiBands();
        private updateKpiBands(radius, innerRadiusFactor, tString, kpiAngleAttr);
        private removeTargetElements();
        private updateTargetLine(radius, innerRadius, left, top);
        /** Note: public for testability */
        getAnimatedNumberProperties(radius: number, innerRadiusFactor: number, top: number, left: number): AnimatedNumberProperties;
        /** Note: public for testability */
        getGaugeVisualProperties(): GaugeVisualProperties;
        /** Note: public for testability */
        drawViewPort(drawOptions: GaugeVisualProperties): void;
        private createTicks(total);
        private updateInternal(suppressAnimations);
        private updateVisualStyles();
        private updateVisualConfigurations();
        private appendTextAlongArc(ticks, radius, height, width, margin);
        private truncateTextIfNeeded(text, positionX, onRight);
        private appendTargetTextAlongArc(radius, height, width, margin);
        private arcTween(transition, arr);
        private showMinMaxLabelsOnBottom();
        private setMargins();
        private showSideNumbersLabelText();
    }
}
declare module powerbi.visuals {
    var gaugeRoleNames: {
        y: string;
        minValue: string;
        maxValue: string;
        targetValue: string;
    };
    var gaugeCapabilities: VisualCapabilities;
}
declare module powerbi.visuals {
    var imageScalingType: {
        normal: string;
        fit: string;
        fill: string;
    };
    interface ImageDataViewObjects extends DataViewObjects {
        general: ImageDataViewObject;
        imageScaling: ImageScalingDataViewObject;
    }
    interface ImageDataViewObject extends DataViewObject {
        imageUrl: string;
    }
    interface ImageScalingDataViewObject extends DataViewObject {
        imageScalingType: string;
    }
    class ImageVisual implements IVisual {
        private element;
        private imageBackgroundElement;
        private scalingType;
        init(options: VisualInitOptions): void;
        enumerateObjectInstances(options: EnumerateVisualObjectInstancesOptions): VisualObjectInstance[];
        private enumerateImageScaling();
        onDataChanged(options: VisualDataChangedOptions): void;
        onResizing(viewport: IViewport): void;
    }
}
declare module powerbi.visuals {
    var imageVisualCapabilities: VisualCapabilities;
}
declare module powerbi.visuals.samples {
    var consoleWriterCapabilities: VisualCapabilities;
}
declare module powerbi.visuals.samples {
    class ConsoleWriter implements IVisual {
        static converter(dataView: DataView): any;
        init(options: VisualInitOptions): void;
        onResizing(viewport: IViewport): void;
        update(options: VisualUpdateOptions): void;
    }
}
declare module powerbi {
    interface IVisualStyle {
        colorPalette: IColorPalette;
        isHighContrast: boolean;
        titleText: ITextStyle;
        subTitleText: ITextStyle;
        labelText: ITextStyle;
        maxMarginFactor?: number;
    }
    interface ITextStyle extends IStyleInfo {
        fontFace?: string;
        fontSize?: string;
        fontWeight?: string;
        color: IColorInfo;
    }
    interface IColorPalette {
        background?: IColorInfo;
        foreground?: IColorInfo;
        positive?: IColorInfo;
        negative?: IColorInfo;
        separator?: IColorInfo;
        selection?: IColorInfo;
        dataColors: IDataColorPalette;
    }
    interface IDataColorPalette {
        /** Gets the color scale associated with the given key. */
        getColorScaleByKey(scaleKey: string): IColorScale;
        /** Gets a fresh color scale with no colors allocated. */
        getNewColorScale(): IColorScale;
        /** Gets the nth color in the palette. */
        getColorByIndex(index: number): IColorInfo;
        /**
         * Gets the set of sentiment colors used for visuals such as KPIs
         * Note: This is only a temporary API so that we can have reasonable color schemes for KPIs
         * and gauges until the conditional formatting feature is implemented.
         */
        getSentimentColors(): IColorInfo[];
        getBasePickerColors(): IColorInfo[];
    }
    interface IColorScale {
        /** Gets the color associated with the given key. */
        getColor(key: any): IColorInfo;
        /**
         * Clears the current scale, but rotates the colors such that the first color allocated will
         * the be first color that would have been allocated before clearing the scale.
         */
        clearAndRotateScale(): void;
        /** Returns a copy of the current scale. */
        clone(): IColorScale;
    }
    interface IColorInfo extends IStyleInfo {
        value: string;
    }
    interface IStyleInfo {
        className?: string;
    }
}
declare module powerbi.visuals {
    var lineChartCapabilities: VisualCapabilities;
    var lineChartProps: {
        general: {
            formatString: DataViewObjectPropertyIdentifier;
        };
        dataPoint: {
            fill: DataViewObjectPropertyIdentifier;
        };
        categoryAxis: {
            axisType: DataViewObjectPropertyIdentifier;
        };
    };
}
declare module powerbi.visuals {
    interface LineChartConstructorOptions extends CartesianVisualConstructorOptions {
        chartType?: LineChartType;
    }
    interface ILineChartConfiguration {
        xAxisProperties: IAxisProperties;
        yAxisProperties: IAxisProperties;
        margin: any;
    }
    interface LineChartData extends CartesianData {
        series: LineChartSeries[];
        isScalar?: boolean;
        dataLabelsSettings: PointDataLabelsSettings;
        axesLabels: ChartAxesLabels;
        hasDynamicSeries?: boolean;
        hasSelection: boolean;
    }
    interface LineChartSeries extends CartesianSeries, SelectableDataPoint {
        key: string;
        lineIndex: number;
        color: string;
        xCol: DataViewMetadataColumn;
        yCol: DataViewMetadataColumn;
        data: LineChartDataPoint[];
    }
    interface LineChartDataPoint extends CartesianDataPoint, TooltipEnabledDataPoint, SelectableDataPoint, LabelEnabledDataPoint {
        categoryValue: any;
        value: number;
        categoryIndex: number;
        seriesIndex: number;
        key: string;
    }
    const enum LineChartType {
        default = 1,
        area = 2,
        smooth = 4,
        lineShadow = 8,
    }
    /**
     * Renders a data series as a line visual.
     */
    class LineChart implements ICartesianVisual, IInteractiveVisual {
        private static ClassName;
        private static MainGraphicsContextClassName;
        private static CategoryClassName;
        private static CategoryClassSelector;
        private static CategoryValuePoint;
        private static CategoryAreaClassName;
        private static CategoryAreaClassSelector;
        private static HorizontalShift;
        private static CircleRadius;
        private static PathElementName;
        private static CircleElementName;
        private static CircleClassName;
        private static LineElementName;
        static AreaFillOpacity: number;
        static DimmedAreaFillOpacity: number;
        private isInteractiveChart;
        private isScrollable;
        private element;
        private mainGraphicsContext;
        private clearCatcher;
        private mainGraphicsSVG;
        private toolTipContext;
        private options;
        private dataViewCat;
        private colors;
        private host;
        private data;
        private clippedData;
        private lineType;
        private cartesianVisualHost;
        private xAxisProperties;
        private yAxisProperties;
        private margin;
        private currentViewport;
        private selectionCircles;
        private dragHandle;
        private hoverLine;
        private lastInteractiveSelectedColumnIndex;
        private interactivityService;
        private animator;
        static customizeQuery(options: CustomizeQueryOptions): void;
        static getSortableRoles(options: VisualSortableOptions): string[];
        static converter(dataView: DataView, blankCategoryValue: string, colors: IDataColorPalette, isScalar: boolean, interactivityService?: IInteractivityService): LineChartData;
        static getInteractiveLineChartDomElement(element: JQuery): HTMLElement;
        private static getColor(colorHelper, hasDynamicSeries, values, grouped, seriesIndex, groupedIdentity);
        constructor(options: LineChartConstructorOptions);
        init(options: CartesianVisualInitOptions): void;
        setData(dataViews: DataView[]): void;
        calculateLegend(): LegendData;
        hasLegend(): boolean;
        setFilteredData(startIndex: number, endIndex: number): CartesianData;
        calculateAxesProperties(options: CalculateScaleAndDomainOptions): IAxisProperties[];
        enumerateObjectInstances(options: EnumerateVisualObjectInstancesOptions): VisualObjectInstance[];
        private enumerateDataPoints();
        overrideXScale(xProperties: IAxisProperties): void;
        onClearSelection(): void;
        render(suppressAnimations: boolean): void;
        private renderNew(duration);
        private renderOld(duration);
        /**
         * Note: Static for tests.
         */
        static getTooltipInfoByPointX(lineChart: LineChart, pointData: any, pointX: number): TooltipDataItem[];
        getVisualCategoryAxisIsScalar(): boolean;
        getSupportedCategoryAxisType(): string;
        getPreferredPlotArea(isScalar: boolean, categoryCount: number, categoryThickness: number): IViewport;
        private getCategoryCount(origCatgSize);
        private getAvailableWidth();
        private getAvailableHeight();
        private static sliceSeries(series, newLength, startIndex?);
        private extraLineShift();
        private hasDataPoint(series);
        private lookupXValue(index, type);
        private getXValue(d);
        /**
         * This checks to see if a data point is isolated, which means
         * the previous and next data point are both null.
         */
        private shouldDrawCircle(d, i);
        /**
         * Updates the hover line and the legend with the selected colums (given by columnIndex).
         */
        selectColumn(columnIndex: number, force?: boolean): void;
        private setHoverLine(chartX);
        private getChartX(columnIndex);
        /**
         * Finds the index of the category of the given x coordinate given.
         */
        private findIndex(x);
        private findClosestXAxisIndex(currentX, xAxisValues);
        private getPosition(x, pathElement);
        private createLegendDataPoints(columnIndex);
        accept(visitor: InteractivityVisitor, options: any): void;
    }
}
declare module powerbi.visuals {
    interface IPoint {
        x: number;
        y: number;
    }
    class Point implements IPoint {
        x: number;
        y: number;
        constructor(x?: number, y?: number);
    }
    interface IRect {
        left: number;
        top: number;
        width: number;
        height: number;
    }
    class Rect implements IRect {
        left: number;
        top: number;
        width: number;
        height: number;
        constructor(left?: number, top?: number, width?: number, height?: number);
    }
    interface I2DTransformMatrix {
        m00: number;
        m01: number;
        m02: number;
        m10: number;
        m11: number;
        m12: number;
    }
    /** Transformation matrix math wrapper */
    class Transform {
        private _inverse;
        matrix: I2DTransformMatrix;
        constructor(m?: I2DTransformMatrix);
        applyToPoint(point: IPoint): IPoint;
        applyToRect(rect: Rect): IRect;
        translate(xOffset: number, yOffset: number): void;
        scale(xScale: number, yScale: number): void;
        rotate(angleInRadians: number): void;
        add(other: Transform): void;
        getInverse(): Transform;
    }
    function createTranslateMatrix(xOffset: number, yOffset: number): I2DTransformMatrix;
    function createScaleMatrix(xScale: number, yScale: number): I2DTransformMatrix;
    function createRotationMatrix(angleInRads: number): I2DTransformMatrix;
    function createInverseMatrix(m: I2DTransformMatrix): I2DTransformMatrix;
    class MapPolygonInfo {
        private _locationRect;
        private _baseRect;
        private _currentRect;
        constructor();
        reCalc(mapControl: Microsoft.Maps.Map, width: number, height: number): void;
        scale: number;
        transform: Transform;
        outherTransform: Transform;
        setViewBox(svg: SVGSVGElement): void;
        innerTransform: Transform;
        transformToString(transform: Transform): string;
    }
}
declare module powerbi.visuals.BI.Services.GeocodingManager {
    var Settings: {
        MaxBingRequest: number;
        MaxCacheSize: number;
        MaxCacheSizeOverflow: number;
        BingKey: string;
        BingUrl: string;
        BingUrlGeodata: string;
        UseDoubleArrayGeodataResult: boolean;
        UseDoubleArrayDequeueTimeout: number;
    };
    interface BingAjaxService {
        (url: string, settings: JQueryAjaxSettings): any;
    }
    var safeCharacters: string;
    /** Note: Used for test mockup */
    var BingAjaxCall: BingAjaxService;
    var CategoryTypes: {
        Address: string;
        City: string;
        Continent: string;
        CountryRegion: string;
        County: string;
        Longitude: string;
        Latitude: string;
        Place: string;
        PostalCode: string;
        StateOrProvince: string;
    };
    var CategoryTypeArray: string[];
    function isCategoryType(value: string): boolean;
    var BingEntities: {
        Continent: string;
        Sovereign: string;
        CountryRegion: string;
        AdminDivision1: string;
        AdminDivision2: string;
        PopulatedPlace: string;
        Postcode: string;
        Postcode1: string;
        Neighborhood: string;
        Address: string;
    };
    interface ILocation {
        latitude: number;
        longitude: number;
    }
    interface ILocationRect {
        northWest: ILocation;
        southEast: ILocation;
    }
    interface GeocodeCallback {
        (error: Error, coordinate: IGeocodeCoordinate): void;
    }
    interface IGeocodeQuery {
        query: string;
        category: string;
        levelOfDetail?: number;
        longitude?: number;
        latitude?: number;
    }
    interface IGeocodeBoundaryPolygon {
        nativeBing: string;
        /** array of lat/long pairs as [lat1, long1, lat2, long2,...] */
        geographic?: Float64Array;
        geographicBounds?: Microsoft.Maps.LocationRect;
        /** array of absolute pixel position pairs [x1,y1,x2,y2,...]. It can be used by the client for cache the data. */
        absolute?: Float64Array;
        absoluteBounds?: Rect;
        /** string of absolute pixel position pairs "x1 y1 x2 y2...". It can be used by the client for cache the data. */
        absoluteString?: string;
    }
    interface IGeocodeCoordinate {
        latitude?: number;
        longitude?: number;
        locations?: IGeocodeBoundaryPolygon[];
    }
    class GeocodeQuery implements IGeocodeQuery {
        query: string;
        category: string;
        key: string;
        private _cacheHits;
        constructor(query?: string, category?: string);
        incrementCacheHit(): void;
        getCacheHits(): number;
        getBingEntity(): string;
        getUrl(): string;
    }
    class GeocodeBoundaryQuery extends GeocodeQuery {
        latitude: number;
        longitude: number;
        levelOfDetail: number;
        maxGeoData: number;
        constructor(latitude: number, longitude: number, category: any, levelOfDetail: any, maxGeoData?: number);
        getBingEntity(): string;
        getUrl(): string;
    }
    function geocodeCore(geocodeQuery: GeocodeQuery): any;
    function geocode(query: string, category?: string): any;
    function geocodeBoundary(latitude: number, longitude: number, category?: string, levelOfDetail?: number, maxGeoData?: number): any;
    function reset(): void;
}
declare module powerbi.visuals.BI.Services.MapServices {
    var MinAllowedLatitude: number;
    var MaxAllowedLatitude: number;
    var MinAllowedLongitude: number;
    var MaxAllowedLongitude: number;
    var TileSize: number;
    var MaxLevelOfDetail: number;
    var MinLevelOfDetail: number;
    var MaxAutoZoomLevel: number;
    var DefaultLevelOfDetail: number;
    var WorkerErrorName: string;
    function clip(n: number, minValue: number, maxValue: number): number;
    function getMapSize(levelOfDetail: number): number;
    /**
     * @param latLongArray - is a Float64Array as [lt0, lon0, lat1, long1, lat2, long2,....]
     * @returns Float64Array as [x0, y0, x1, y1, x2, y2,....]
     */
    function latLongToPixelXYArray(latLongArray: Float64Array, levelOfDetail: number): Float64Array;
    function pointArrayToString(array: Float64Array): any;
    function pointArrayToArray(array: Float64Array): number[];
    function getLocationBoundaries(latLongArray: Float64Array): Microsoft.Maps.LocationRect;
    /**
     * Note: this code is taken from Bing.
     *  see Point Compression Algorithm http://msdn.microsoft.com/en-us/library/jj158958.aspx
     *  see Decompression Algorithm in http://msdn.microsoft.com/en-us/library/dn306801.aspx
     */
    function parseEncodedSpatialValueArray(value: any): Float64Array;
    function calcGeoData(data: powerbi.visuals.BI.Services.GeocodingManager.IGeocodeCoordinate): void;
    function latLongToPixelXY(latitude: number, longitude: number, levelOfDetail: number): powerbi.visuals.Point;
    function locationToPixelXY(location: Microsoft.Maps.Location, levelOfDetail: number): powerbi.visuals.Point;
    function locationRectToRectXY(locationRect: Microsoft.Maps.LocationRect, levelOfDetail: number): powerbi.visuals.Rect;
    function pixelXYToLocation(pixelX: number, pixelY: number, levelOfDetail: number): Microsoft.Maps.Location;
}
declare module powerbi.visuals {
    enum LegendIcon {
        Box = 0,
        Circle = 1,
        Line = 2,
    }
    enum LegendPosition {
        Top = 0,
        Bottom = 1,
        Right = 2,
        Left = 3,
        None = 4,
        TopCenter = 5,
        BottomCenter = 6,
        RightCenter = 7,
        LeftCenter = 8,
    }
    interface LegendPosition2D {
        textPosition?: Point;
        glyphPosition?: Point;
    }
    interface LegendDataPoint extends SelectableDataPoint, LegendPosition2D {
        label: string;
        color: string;
        icon: LegendIcon;
        category?: string;
        measure?: any;
        iconOnlyOnLabel?: boolean;
        tooltip?: string;
    }
    interface LegendData {
        title?: string;
        dataPoints: LegendDataPoint[];
        grouped?: boolean;
    }
    var legendProps: {
        show: string;
        position: string;
        titleText: string;
        showTitle: string;
    };
    function createLegend(legendParentElement: JQuery, interactive: boolean, interactivityService: IInteractivityService, isScrollable?: boolean, legendPosition?: LegendPosition): ILegend;
    interface ILegend {
        getMargins(): IViewport;
        isVisible(): boolean;
        changeOrientation(orientation: LegendPosition): void;
        getOrientation(): LegendPosition;
        drawLegend(data: LegendData, viewport: IViewport): any;
        /**
         * Reset the legend by clearing it
         */
        reset(): void;
    }
    function getIconClass(iconType: LegendIcon): string;
    function getLabelMaxSize(currentViewport: IViewport, numItems: number, hasTitle: boolean): string;
    module LegendData {
        function update(legendData: LegendData, legendObject: DataViewObject): void;
    }
}
declare module powerbi.visuals {
    var mapCapabilities: VisualCapabilities;
    var mapProps: {
        general: {
            formatString: DataViewObjectPropertyIdentifier;
        };
        dataPoint: {
            defaultColor: DataViewObjectPropertyIdentifier;
            fill: DataViewObjectPropertyIdentifier;
            showAllDataPoints: DataViewObjectPropertyIdentifier;
        };
        legend: {
            show: DataViewObjectPropertyIdentifier;
            position: DataViewObjectPropertyIdentifier;
            showTitle: DataViewObjectPropertyIdentifier;
            titleText: DataViewObjectPropertyIdentifier;
        };
    };
}
declare module powerbi.visuals {
    interface MapConstructionOptions {
        filledMap?: boolean;
        geocoder?: IGeocoder;
        mapControlFactory?: IMapControlFactory;
    }
    interface IGeocoder {
        geocode: (query: string, category?: string) => any;
        geocodeBoundary: (latitude: number, longitude: number, category: string, levelOfDetail?: number, maxGeoData?: number) => any;
    }
    interface IMapControlFactory {
        createMapControl(element: HTMLElement, options?: Microsoft.Maps.MapOptions): Microsoft.Maps.Map;
        ensureMap(action: () => void): void;
    }
    /** Note: public for UnitTest */
    interface MapDataPoint {
        geocodingQuery: string;
        location?: Microsoft.Maps.Location;
        cachedLocation?: Microsoft.Maps.Location;
        paths?: powerbi.visuals.BI.Services.GeocodingManager.IGeocodeBoundaryPolygon[];
        value: number;
        radius?: number;
        seriesInfo: MapSeriesInfo;
        categoryIdentity: DataViewScopeIdentity;
        categoryValue: string;
    }
    /** Note: public for UnitTest */
    interface MapPieSlice {
        value: number;
        index: number;
        fill: string;
        stroke: string;
        seriesId: DataViewScopeIdentity;
    }
    /** Note: public for UnitTest */
    interface MapSeriesInfo {
        sizeValuesForGroup: MapPieSlice[];
        latitude?: number;
        longitude?: number;
    }
    interface MapData {
        bubbleData?: MapBubble[];
        sliceData?: MapSlice[][];
        shapeData?: MapShape[];
    }
    interface MapVisualDataPoint extends TooltipEnabledDataPoint, SelectableDataPoint, LabelEnabledDataPoint {
        x: number;
        y: number;
        radius: number;
        fill: string;
        stroke: string;
        strokeWidth: number;
    }
    interface MapBubble extends MapVisualDataPoint {
    }
    interface MapSlice extends MapVisualDataPoint {
        value: number;
        startAngle?: number;
        endAngle?: number;
    }
    interface MapShape extends TooltipEnabledDataPoint, SelectableDataPoint {
        path: string;
        fill: string;
        stroke: string;
        strokeWidth: number;
        key: string;
    }
    /** Note: public for UnitTest */
    interface IMapDataPointRenderer {
        init(mapControl: Microsoft.Maps.Map, mapDiv: JQuery): void;
        beginDataPointUpdate(geocodingCategory: string, dataPointCount: number): void;
        addDataPoint(dataPoint: MapDataPoint): void;
        getDataPointCount(): number;
        converter(viewPort: IViewport, dataView: DataView, interactivityService: IInteractivityService, labelSettings: PointDataLabelsSettings): MapData;
        updateInternal(data: MapData, viewport: IViewport, dataChanged: boolean): MapBehaviorOptions;
        getDataPointPadding(): number;
        clearDataPoints(): void;
    }
    interface DataViewMetadataAutoGeneratedColumn extends DataViewMetadataColumn {
        /**
         * Indicates that the column was added manually.
         */
        isAutoGeneratedColumn?: boolean;
    }
    class MapBubbleDataPointRenderer implements IMapDataPointRenderer {
        private mapControl;
        private values;
        private maxDataPointRadius;
        private svg;
        private clearSvg;
        private clearCatcher;
        private bubbleGraphicsContext;
        private sliceGraphicsContext;
        private sliceLayout;
        private arc;
        private dataLabelsSettings;
        constructor();
        init(mapControl: Microsoft.Maps.Map, mapDiv: JQuery): void;
        addDataPoint(dataPoint: MapDataPoint): void;
        clearDataPoints(): void;
        getDataPointCount(): number;
        getDataPointPadding(): number;
        private clearMaxDataPointRadius();
        private setMaxDataPointRadius(dataPointRadius);
        beginDataPointUpdate(geocodingCategory: string, dataPointCount: number): void;
        getDefaultMap(geocodingCategory: string, dataPointCount: number): void;
        converter(viewport: IViewport, dataView: DataView, interactivityService: IInteractivityService, labelSettings: PointDataLabelsSettings): MapData;
        updateInternal(data: MapData, viewport: IViewport, dataChanged: boolean): MapBehaviorOptions;
    }
    interface FilledMapParams {
        level: number;
        maxPolygons: number;
        strokeWidth: number;
    }
    class MapShapeDataPointRenderer implements IMapDataPointRenderer {
        private mapControl;
        private svg;
        private clearSvg;
        private clearCatcher;
        private geocodingCategory;
        private polygonInfo;
        private values;
        private shapeGraphicsContext;
        private maxShapeDimension;
        static getFilledMapParams(category: string, dataCount: number): FilledMapParams;
        static buildPaths(locations: visuals.BI.Services.GeocodingManager.IGeocodeBoundaryPolygon[]): visuals.BI.Services.GeocodingManager.IGeocodeBoundaryPolygon[];
        constructor();
        init(mapControl: Microsoft.Maps.Map, mapDiv: JQuery): void;
        beginDataPointUpdate(geocodingCategory: string, dataPointCount: number): void;
        addDataPoint(dataPoint: MapDataPoint): void;
        clearDataPoints(): void;
        getDataPointCount(): number;
        converter(viewport: IViewport, dataView: DataView, interactivityService?: IInteractivityService): MapData;
        updateInternal(data: MapData, viewport: IViewport, dataChanged: boolean): MapBehaviorOptions;
        private clearMaxShapeDimension();
        private setMaxShapeDimension(width, height);
        getDataPointPadding(): number;
    }
    /** Note: public for UnitTest */
    interface SimpleRange {
        min: number;
        max: number;
    }
    class Map implements IVisual, IInteractiveVisual {
        currentViewport: IViewport;
        private pendingGeocodingRender;
        private mapControl;
        private minLongitude;
        private maxLongitude;
        private minLatitude;
        private maxLatitude;
        private valueScale;
        private style;
        private colors;
        private dataPointRenderer;
        private geocodingCategory;
        private legend;
        private legendHeight;
        private legendData;
        private element;
        private dataView;
        private dataLabelsSettings;
        private static MapContainer;
        static StrokeDarkenColorValue: number;
        private interactivityService;
        private defaultDataPointColor;
        private showAllDataPoints;
        private dataPointsToEnumerate;
        private hasDynamicSeries;
        private geoTaggingAnalyzerService;
        private enableGeoShaping;
        private host;
        private receivedExternalViewChange;
        private executingInternalViewChange;
        private geocoder;
        private mapControlFactory;
        constructor(options: MapConstructionOptions);
        init(options: VisualInitOptions): void;
        private addDataPoint(dataPoint);
        private scheduleRedraw();
        private enqueueGeoCode(dataPoint);
        private enqueueGeoCodeAndGeoShape(dataPoint, params);
        private enqueueGeoShape(dataPoint, params);
        private getOptimumLevelOfDetail(width, height);
        private getViewCenter(levelOfDetail);
        private resetBounds();
        private updateBounds(latitude, longitude);
        static legendObject(dataView: DataView): DataViewObject;
        static isLegendHidden(dataView: DataView): boolean;
        static legendPosition(dataView: DataView): LegendPosition;
        static isShowLegendTitle(dataView: DataView): boolean;
        private legendTitle();
        private renderLegend(legendData);
        /** Note: public for UnitTest */
        static calculateGroupSizes(categorical: DataViewCategorical, grouped: DataViewValueColumnGroup[], groupSizeTotals: number[], sizeMeasureIndex: number, currentValueScale: SimpleRange): SimpleRange;
        /** Note: public for UnitTest */
        static createMapDataPoint(group: string, value: number, seriesInfo: MapSeriesInfo, radius: number, colors: IDataColorPalette, categoryIdentity: DataViewScopeIdentity): MapDataPoint;
        static calculateSeriesLegend(grouped: DataViewValueColumnGroup[], groupIndex: number, sizeMeasureIndex: number, colors: IDataColorPalette, defaultDataPointColor?: string, seriesSource?: data.SQExpr[]): LegendDataPoint[];
        /** Note: public for UnitTest */
        static calculateSeriesInfo(grouped: DataViewValueColumnGroup[], groupIndex: number, sizeMeasureIndex: number, longitudeMeasureIndex: number, latitudeMeasureIndex: number, colors: IDataColorPalette, defaultDataPointColor?: string, objectsDefinitions?: DataViewObjects[], seriesSource?: data.SQExpr[]): MapSeriesInfo;
        private static getOptionalMeasure(seriesValues, measureIndex, groupIndex, defaultValue);
        /** Note: public for UnitTest */
        static calculateRadius(range: SimpleRange, rangeDiff: number, value?: number): number;
        /** Note: public for UnitTest */
        static getGeocodingCategory(categorical: DataViewCategorical, geoTaggingAnalyzerService: IGeoTaggingAnalyzerService): string;
        /** Note: public for UnitTest */
        static hasSizeField(values: DataViewValueColumns, defaultIndexIfNoRole?: number): boolean;
        static shouldEnumerateDataPoints(dataView: DataView, usesSizeForGradient: boolean): boolean;
        enumerateObjectInstances(options: EnumerateVisualObjectInstancesOptions): VisualObjectInstance[];
        static enumerateDataPoints(dataPoints: LegendDataPoint[], colors: IDataColorPalette, hasDynamicSeries: boolean, defaultDataPointColor: string, showAllDataPoints: boolean, bubbleData: MapBubble[]): VisualObjectInstance[];
        static enumerateLegend(dataView: DataView, legend: ILegend, legendTitle: string): VisualObjectInstance[];
        onDataChanged(options: VisualDataChangedOptions): void;
        /** Note: Public for UnitTests */
        static showLocationMissingWarningIfNecessary(dataView: powerbi.DataView): IVisualWarning[];
        onResizing(viewport: IViewport): void;
        private initialize(container);
        private onViewChanged();
        private getMapViewPort();
        private updateInternal(dataChanged);
        private updateOffsets(dataChanged);
        accept(visitor: InteractivityVisitor, options: any): void;
        onClearSelection(): void;
        private clearDataPoints();
        private static createDefaultGeocoder();
        private getDefaultMapControlFactory();
    }
}
declare module powerbi.visuals {
    interface CardItemData {
        caption: string;
        details: string;
        showURL: boolean;
    }
    interface CardData {
        title?: string;
        showTitleAsURL?: boolean;
        cardItemsData: CardItemData[];
    }
    class MultiRowCard implements IVisual {
        private currentViewport;
        private options;
        private dataView;
        private style;
        private element;
        private listView;
        private cardHeight;
        private cardWidth;
        private columnWidth;
        private maxCardsDisplayed;
        private cardItemContainerHeight;
        private isCardWrapped;
        /**
         * This includes card height with margin that will be passed to list view.
         */
        private cardHeightTotal;
        private settings;
        private dataModel;
        private interactivity;
        private isInteractivityOverflowHidden;
        private waitingForData;
        private cardHasTitle;
        private isSingleRowCard;
        private isSingleValueCard;
        /**
         * Note: Public for testability.
         */
        static formatStringProp: DataViewObjectPropertyIdentifier;
        private static multiRowCardClass;
        private static Card;
        private static Title;
        private static CardItemContainer;
        private static Caption;
        private static Details;
        private static TitleUrlSelector;
        private static CaptionUrlSelector;
        private static SmallTileWidth;
        private static MediumTileWidth;
        private static LargeTileWidth;
        /**
         * Cards have specific styling so defined inline styles and also to support theming and improve performance.
         */
        private static DefaultStyle;
        init(options: VisualInitOptions): void;
        onDataChanged(options: VisualDataChangedOptions): void;
        onResizing(viewport: IViewport): void;
        static converter(dataView: DataView, columnCount: number, maxCards: number, isDashboardVisual?: boolean): CardData[];
        private updateInternal(resetScrollbarPosition?);
        private initializeCardRowSelection();
        /**
         * This contains the card column wrapping logic.
         * Determines how many columns can be shown per each row inside a Card.
         * To place the fields evenly along the card,
         * the width of each card item is calculated based on the available viewport width.
         */
        private setCardDimensions();
        private calculateCardDimensions(viewport, cardRowColumnCount, maxCardColumns, maxCards);
        private getPixelString(value);
        private onLoadMoreData();
        private getTotalCardHeight(cardHeight);
    }
}
declare module powerbi.visuals {
    var multiRowCardCapabilities: VisualCapabilities;
}
declare module powerbi.visuals {
    interface TextRunStyle {
        fontFamily?: string;
        fontSize?: string;
        fontStyle?: string;
        fontWeight?: string;
        textDecoration?: string;
    }
    interface TextRunContext {
        textStyle?: TextRunStyle;
        url?: string;
        value: string;
    }
    interface ParagraphContext {
        horizontalTextAlignment?: string;
        textRuns: TextRunContext[];
    }
    interface TextboxDataViewObjects extends DataViewObjects {
        general: TextboxDataViewObject;
    }
    interface TextboxDataViewObject extends DataViewObject {
        paragraphs: ParagraphContext[];
    }
    /**
     * Represents a rich text box that supports view & edit mode.
     */
    class RichTextbox implements IVisual {
        private editor;
        private element;
        private host;
        private viewport;
        private readOnly;
        private paragraphs;
        init(options: VisualInitOptions): void;
        onResizing(viewport: IViewport): void;
        onDataChanged(options: VisualDataChangedOptions): void;
        destroy(): void;
        onViewModeChanged(viewMode: ViewMode): void;
        setSelection(start: number, end: number): void;
        private refreshView();
        private saveContents();
        private updateSize();
        private static convertDeltaToParagraphs(contents);
        private static convertParagraphsToHtml(paragraphs);
        private static convertParagraphsToOps(paragraphs);
        private static convertFormatAttributesToTextStyle(attributes);
    }
    module RichText {
        var defaultFont: string;
        var defaultFontSize: string;
        function getFontFamily(font: string): string;
        class QuillWrapper {
            private editor;
            private $editorDiv;
            private $toolbarDiv;
            private $container;
            private dependenciesLoaded;
            private localizationProvider;
            private host;
            private static textChangeThrottle;
            private static formatUrlThrottle;
            static preventDefaultKeys: number[];
            static loadQuillResources: boolean;
            private static quillJsFiles;
            private static quillCssFiles;
            private QuillPackage;
            initialized: boolean;
            readOnly: boolean;
            textChanged: (delta, source) => void;
            /**
             * JavaScript and CSS resources are typically resolved asynchronously.
             * This means we potentially defer certain events which typically occur
             * synchronously until resources are loaded.
             * Setting the global loadQuillResources flag to true will override
             * this behavior and cause the wrapper to assume these resources are already loaded
             * and not try to load them asynchronously (e.g. for use in unit tests).
             */
            constructor(readOnly: boolean, host: IVisualHostServices);
            getElement(): JQuery;
            getContents(): quill.Delta;
            setContents(contents: quill.Delta | quill.Op[]): void;
            resize(viewport: IViewport): void;
            setReadOnly(readOnly: boolean): void;
            formatUrls(): void;
            setSelection(start: number, end: number): void;
            getSelection(): quill.Range;
            focusWhenLoaded(): void;
            destroy(): void;
            private rebuildQuillEditor();
            private onTextChanged(delta, source);
        }
    }
}
declare module powerbi.visuals {
    var richTextboxCapabilities: VisualCapabilities;
}
declare module powerbi.visuals {
    var cheerMeterProps: {
        dataPoint: {
            defaultColor: DataViewObjectPropertyIdentifier;
            fill: DataViewObjectPropertyIdentifier;
        };
    };
    interface TeamData {
        name: string;
        value: number;
        color: string;
        identity: data.Selector;
    }
    interface CheerData {
        teamA: TeamData;
        teamB: TeamData;
        background: string;
    }
    class CheerMeter implements IVisual {
        static capabilities: VisualCapabilities;
        private static DefaultFontFamily;
        private static DefaultFontColor;
        private static DefaultBackgroundColor;
        private static PaddingBetweenText;
        private textOne;
        private textTwo;
        private svg;
        private isFirstTime;
        private data;
        private selectionManager;
        static converter(dataView: DataView): CheerData;
        init(options: VisualInitOptions): void;
        update(options: VisualUpdateOptions): void;
        private getRecomendedFontProperties(text1, text2, parentViewport);
        private calculateLayout(data, viewport);
        private ensureStartState(layout, viewport);
        private clearSelection();
        private clearSelectionUI();
        private updateSelectionUI(ids);
        private draw(data, duration, viewport);
        destroy(): void;
        enumerateObjectInstances(options: EnumerateVisualObjectInstancesOptions): VisualObjectInstance[];
    }
}
declare module powerbi.visuals {
    var cheerMeterCapabilities: VisualCapabilities;
}
declare module powerbi.visuals {
    var scatterChartCapabilities: VisualCapabilities;
    var scatterChartProps: {
        general: {
            formatString: DataViewObjectPropertyIdentifier;
        };
        dataPoint: {
            defaultColor: DataViewObjectPropertyIdentifier;
            fill: DataViewObjectPropertyIdentifier;
        };
        fillPoint: {
            show: DataViewObjectPropertyIdentifier;
        };
    };
}
declare module powerbi.visuals {
    interface ScatterChartConstructorOptions extends CartesianVisualConstructorOptions {
    }
    interface ScatterChartDataPoint extends SelectableDataPoint, TooltipEnabledDataPoint, LabelEnabledDataPoint {
        x: any;
        y: any;
        size: any;
        radius: RadiusData;
        fill: string;
        category: string;
    }
    interface RadiusData {
        sizeMeasure: DataViewValueColumn;
        index: number;
    }
    interface DataRange {
        minRange: number;
        maxRange: number;
        delta: number;
    }
    interface ScatterChartData {
        xCol: DataViewMetadataColumn;
        yCol: DataViewMetadataColumn;
        dataPoints: ScatterChartDataPoint[];
        legendData: LegendData;
        axesLabels: ChartAxesLabels;
        size?: DataViewMetadataColumn;
        sizeRange: NumberRange;
        dataLabelsSettings: PointDataLabelsSettings;
        defaultDataPointColor?: string;
        showAllDataPoints?: boolean;
        hasDynamicSeries?: boolean;
        fillPoint?: boolean;
    }
    class ScatterChart implements ICartesianVisual, IInteractiveVisual {
        private static ScatterChartCircleTagName;
        private static BubbleRadius;
        static DefaultBubbleOpacity: number;
        static DimmedBubbleOpacity: number;
        private static AreaOf300By300Chart;
        private static MinSizeRange;
        private static MaxSizeRange;
        private static ClassName;
        private static MainGraphicsContextClassName;
        private static DotClasses;
        private svg;
        private element;
        private mainGraphicsContext;
        private clearCatcher;
        private mainGraphicsG;
        private currentViewport;
        private style;
        private data;
        private dataView;
        private host;
        private margin;
        private xAxisProperties;
        private yAxisProperties;
        private colors;
        private options;
        private interactivity;
        private cartesianVisualHost;
        private isInteractiveChart;
        private interactivityService;
        private categoryAxisProperties;
        private valueAxisProperties;
        private animator;
        constructor(options: ScatterChartConstructorOptions);
        init(options: CartesianVisualInitOptions): void;
        static converter(dataView: DataView, currentViewport: IViewport, colorPalette: IDataColorPalette, interactivityService?: IInteractivityService, categoryAxisProperties?: DataViewObject, valueAxisProperties?: DataViewObject): ScatterChartData;
        private static getSizeRangeForGroups(dataViewValueGroups, sizeColumnIndex);
        private static createDataPoints(dataValues, metadata, categories, categoryValues, categoryFormatter, categoryIdentities, categoryObjects, colorPalette, viewport, hasDynamicSeries, labelSettings, defaultDataPointColor?, categoryQueryName?);
        private static createSeriesLegend(dataValues, colorPalette, categorical, formatString, defaultDataPointColor);
        static getBubbleRadius(radiusData: RadiusData, sizeRange: NumberRange, viewPort: IViewport): number;
        static getMeasureValue(measureIndex: number, seriesValues: DataViewValueColumn[]): DataViewValueColumn;
        private static getMetadata(grouped, source);
        private static getDefaultMeasureIndex(count, usedIndex, usedIndex2);
        setData(dataViews: DataView[]): void;
        calculateLegend(): LegendData;
        hasLegend(): boolean;
        enumerateObjectInstances(options: EnumerateVisualObjectInstancesOptions): VisualObjectInstance[];
        private enumerateDataPoints();
        calculateAxesProperties(options: CalculateScaleAndDomainOptions): IAxisProperties[];
        overrideXScale(xProperties: IAxisProperties): void;
        render(suppressAnimations: boolean): void;
        private drawScatterMarkers(scatterData, hasSelection, sizeRange, duration);
        static getBubblePixelAreaSizeRange(viewPort: IViewport, minSizeRange: number, maxSizeRange: number): DataRange;
        static project(value: number, actualSizeDataRange: DataRange, bubblePixelAreaSizeRange: DataRange): number;
        static projectSizeToPixels(size: number, actualSizeDataRange: DataRange, bubblePixelAreaSizeRange: DataRange): number;
        static rangeContains(range: DataRange, value: number): boolean;
        static getBubbleOpacity(d: ScatterChartDataPoint, hasSelection: boolean): number;
        accept(visitor: InteractivityVisitor, options: any): void;
        onClearSelection(): void;
        getSupportedCategoryAxisType(): string;
    }
}
declare module powerbi.visuals {
    var slicerCapabilities: VisualCapabilities;
    var slicerProps: {
        general: {
            outlineColor: DataViewObjectPropertyIdentifier;
            outlineWeight: DataViewObjectPropertyIdentifier;
        };
        header: {
            show: DataViewObjectPropertyIdentifier;
            fontColor: DataViewObjectPropertyIdentifier;
            background: DataViewObjectPropertyIdentifier;
            outline: DataViewObjectPropertyIdentifier;
        };
        Rows: {
            fontColor: DataViewObjectPropertyIdentifier;
            background: DataViewObjectPropertyIdentifier;
            outline: DataViewObjectPropertyIdentifier;
        };
        selectedPropertyIdentifier: DataViewObjectPropertyIdentifier;
        filterPropertyIdentifier: DataViewObjectPropertyIdentifier;
        formatString: DataViewObjectPropertyIdentifier;
    };
}
declare module powerbi.visuals {
    interface SlicerData {
        categorySourceName: string;
        formatString: string;
        slicerDataPoints: SlicerDataPoint[];
        slicerSettings: SlicerSettings;
    }
    interface SlicerDataPoint extends SelectableDataPoint {
        value: string;
        mouseOver: boolean;
        mouseOut: boolean;
        isSelectAllDataPoint?: boolean;
    }
    interface SlicerSettings {
        general: {
            outlineColor: string;
            outlineWeight: number;
        };
        header: {
            height: number;
            borderBottomWidth: number;
            show: boolean;
            outline: string;
            fontColor: string;
            background: string;
        };
        headerText: {
            marginLeft: number;
            marginTop: number;
        };
        slicerText: {
            color: string;
            hoverColor: string;
            selectionColor: string;
            marginLeft: number;
            outline: string;
            background: string;
        };
        slicerItemContainer: {
            height: number;
            marginTop: number;
            marginLeft: number;
        };
    }
    class Slicer implements IVisual, IInteractiveVisual {
        private element;
        private currentViewport;
        private dataView;
        private slicerContainer;
        private slicerHeader;
        private slicerBody;
        private listView;
        private slicerData;
        private settings;
        private interactivityService;
        private hostServices;
        private static clearTextKey;
        private static selectAllTextKey;
        private waitingForData;
        private static Container;
        private static Header;
        private static HeaderText;
        private static Body;
        private static ItemContainer;
        private static LabelText;
        private static Input;
        private static Clear;
        static DefaultStyleProperties(): SlicerSettings;
        static converter(dataView: DataView, localizedSelectAllText: string, interactivityService: IInteractivityService): SlicerData;
        init(options: VisualInitOptions): void;
        onDataChanged(options: VisualDataChangedOptions): void;
        onResizing(finalViewport: IViewport): void;
        accept(visitor: InteractivityVisitor, options: any): void;
        enumerateObjectInstances(options: EnumerateVisualObjectInstancesOptions): VisualObjectInstance[];
        private enumerateHeader(data);
        private enumerateRows(data);
        private enumerateGeneral(data);
        private updateInternal(resetScrollbarPosition?);
        private initContainer();
        private onLoadMoreData();
        private getSlicerBodyViewport(currentViewport);
        private getRowHeight();
        private getBorderStyle(outlineElement);
        private getBorderWidth(outlineElement, outlineWeight);
    }
}
declare module powerbi.visuals {
    interface DataViewVisualTable extends DataViewTable {
        visualRows?: DataViewVisualTableRow[];
    }
    interface DataViewVisualTableRow {
        index: number;
        values: any[];
    }
    interface TableDataAdapter {
        update(table: DataViewTable): void;
    }
    interface TableCell {
        value: string;
        isMeasure: boolean;
        isTotal: boolean;
        isBottomMost: boolean;
        showUrl: boolean;
    }
    interface TableTotal {
        totalCells: any[];
    }
    class TableHierarchyNavigator implements controls.ITablixHierarchyNavigator, TableDataAdapter {
        private tableDataView;
        private formatter;
        constructor(tableDataView: DataViewVisualTable, formatter: ICustomValueFormatter);
        /**
         * Returns the depth of a hierarchy.
         */
        getDepth(hierarchy: any): number;
        /**
         * Returns the leaf count of a hierarchy.
         */
        getLeafCount(hierarchy: any): number;
        /**
         * Returns the leaf member of a hierarchy at a specified index.
         */
        getLeafAt(hierarchy: any, index: number): any;
        /**
         * Returns the specified hierarchy member parent.
         */
        getParent(item: any): any;
        /**
         * Returns the index of the hierarchy member relative to its parent.
         */
        getIndex(item: any): number;
        private isRow(item);
        private getColumnIndex(item);
        /**
         * Checks whether a hierarchy member is a leaf.
         */
        isLeaf(item: any): boolean;
        isRowHierarchyLeaf(cornerItem: any): boolean;
        isColumnHierarchyLeaf(cornerItem: any): boolean;
        /**
         * Checks whether a hierarchy member is the last item within its parent.
         */
        isLastItem(item: any, items: any): boolean;
        /**
         * Gets the children members of a hierarchy member.
         */
        getChildren(item: any): any;
        /**
         * Gets the members count in a specified collection.
         */
        getCount(items: any): number;
        /**
         * Gets the member at the specified index.
         */
        getAt(items: any, index: number): any;
        /**
         * Gets the hierarchy member level.
         */
        getLevel(item: any): number;
        /**
         * Returns the intersection between a row and a column item.
         */
        getIntersection(rowItem: any, columnItem: DataViewMetadataColumn): TableCell;
        /**
         * Returns the corner cell between a row and a column level.
         */
        getCorner(rowLevel: number, columnLevel: number): any;
        headerItemEquals(item1: any, item2: any): boolean;
        bodyCellItemEquals(item1: any, item2: any): boolean;
        cornerCellItemEquals(item1: any, item2: any): boolean;
        update(table: DataViewVisualTable): void;
        private static getIndex(items, item);
    }
    interface TableBinderOptions {
        onBindRowHeader?(item: any): void;
        onColumnHeaderClick?(queryName: string): void;
    }
    /**
     * Note: Public for testability.
     */
    class TableBinder implements controls.ITablixBinder {
        private static columnHeaderClassName;
        private static rowClassName;
        private static lastRowClassName;
        private static footerClassName;
        private static numericCellClassName;
        private static nonBreakingSpace;
        private options;
        constructor(options: TableBinderOptions);
        onStartRenderingSession(): void;
        onEndRenderingSession(): void;
        /**
         * Row Header.
         */
        bindRowHeader(item: any, cell: controls.ITablixCell): void;
        unbindRowHeader(item: any, cell: controls.ITablixCell): void;
        /**
         * Column Header.
         */
        bindColumnHeader(item: DataViewMetadataColumn, cell: controls.ITablixCell): void;
        unbindColumnHeader(item: any, cell: controls.ITablixCell): void;
        /**
         * Body Cell.
         */
        bindBodyCell(item: TableCell, cell: controls.ITablixCell): void;
        unbindBodyCell(item: TableCell, cell: controls.ITablixCell): void;
        /**
         * Corner Cell.
         */
        bindCornerCell(item: any, cell: controls.ITablixCell): void;
        unbindCornerCell(item: any, cell: controls.ITablixCell): void;
        bindEmptySpaceHeaderCell(cell: controls.ITablixCell): void;
        unbindEmptySpaceHeaderCell(cell: controls.ITablixCell): void;
        bindEmptySpaceFooterCell(cell: controls.ITablixCell): void;
        unbindEmptySpaceFooterCell(cell: controls.ITablixCell): void;
        /**
         * Measurement Helper.
         */
        getHeaderLabel(item: DataViewMetadataColumn): string;
        getCellContent(item: any): string;
        hasRowGroups(): boolean;
        private ensureHeight(item, cell);
    }
    interface TableDataViewObjects extends DataViewObjects {
        general: TableDataViewObject;
    }
    interface TableDataViewObject extends DataViewObject {
        totals: boolean;
    }
    class Table implements IVisual {
        static formatStringProp: DataViewObjectPropertyIdentifier;
        private static preferredLoadMoreThreshold;
        private element;
        private currentViewport;
        private style;
        private formatter;
        private isInteractive;
        private getLocalizedString;
        private dataView;
        private hostServices;
        private tablixControl;
        private hierarchyNavigator;
        private waitingForData;
        private lastAllowHeaderResize;
        private waitingForSort;
        static customizeQuery(options: CustomizeQueryOptions): void;
        static getSortableRoles(): string[];
        init(options: VisualInitOptions): void;
        /**
         * Note: Public for testability.
         */
        static converter(table: DataViewTable): DataViewVisualTable;
        onResizing(finalViewport: IViewport): void;
        onDataChanged(options: VisualDataChangedOptions): void;
        private updateViewport(newViewport);
        private refreshControl(clear);
        private getLayoutKind();
        private createControl(dataNavigator);
        private updateInternal(dataView, previousDataView);
        private shouldClearControl(previousDataView, newDataView);
        private createTotalsRow(dataView);
        private shouldShowTotals(dataView);
        private static shouldShowTotals(objects);
        private onBindRowHeader(item);
        private onColumnHeaderClick(queryName);
        /**
         * Note: Public for testability.
         */
        needsMoreData(item: any): boolean;
        enumerateObjectInstances(options: EnumerateVisualObjectInstancesOptions): VisualObjectInstance[];
        private shouldAllowHeaderResize();
        private verifyHeaderResize();
    }
}
declare module powerbi.visuals {
    var tableCapabilities: VisualCapabilities;
}
declare module powerbi.visuals {
    /**
     * Extension of the Matrix node for Matrix visual.
     */
    interface MatrixVisualNode extends DataViewMatrixNode {
        /**
         * Index of the node in its parent's children collection.
         *
         * Note: For size optimization, we could also look this item up in the parent's
         * children collection, but we may need to pay the perf penalty.
         */
        index?: number;
        /**
         * Global index of the node as a leaf node.
         * If the node is not a leaf, the value is undefined.
         */
        leafIndex?: number;
        /**
         * Parent of the node.
         * Undefined for outermost nodes (children of the one root node).
         */
        parent?: MatrixVisualNode;
    }
    interface MatrixCornerItem {
        metadata: DataViewMetadataColumn;
        isColumnHeaderLeaf: boolean;
        isRowHeaderLeaf: boolean;
    }
    interface MatrixVisualBodyItem {
        content: any;
        isSubtotal: boolean;
    }
    /**
     * Interface for refreshing Matrix Data View.
     */
    interface MatrixDataAdapter {
        update(dataViewMatrix?: DataViewMatrix): void;
        updateRows(): void;
    }
    interface MatrixDataViewObjects extends DataViewObjects {
        general: MatrixDataViewObject;
    }
    interface MatrixDataViewObject extends DataViewObject {
        rowSubtotals: boolean;
        columnSubtotals: boolean;
    }
    interface IMatrixHierarchyNavigator extends controls.ITablixHierarchyNavigator, MatrixDataAdapter {
        getDataViewMatrix(): DataViewMatrix;
        getDepth(hierarchy: MatrixVisualNode[]): number;
        getLeafCount(hierarchy: MatrixVisualNode[]): number;
        getLeafAt(hierarchy: MatrixVisualNode[], index: number): any;
        getLeafIndex(item: MatrixVisualNode): number;
        getParent(item: MatrixVisualNode): MatrixVisualNode;
        getIndex(item: MatrixVisualNode): number;
        isLeaf(item: MatrixVisualNode): boolean;
        isRowHierarchyLeaf(item: any): boolean;
        isColumnHierarchyLeaf(item: any): boolean;
        isLastItem(item: MatrixVisualNode, items: MatrixVisualNode[]): boolean;
        getChildren(item: MatrixVisualNode): MatrixVisualNode[];
        getCount(items: MatrixVisualNode[]): number;
        getAt(items: MatrixVisualNode[], index: number): MatrixVisualNode;
        getLevel(item: MatrixVisualNode): number;
        getIntersection(rowItem: MatrixVisualNode, columnItem: MatrixVisualNode): MatrixVisualBodyItem;
        getCorner(rowLevel: number, columnLevel: number): MatrixCornerItem;
        headerItemEquals(item1: MatrixVisualNode, item2: MatrixVisualNode): boolean;
    }
    /**
     * Factory method used by unit tests.
     */
    function createMatrixHierarchyNavigator(matrix: DataViewMatrix, formatter: ICustomValueFormatter): IMatrixHierarchyNavigator;
    interface MatrixBinderOptions {
        onBindRowHeader?(item: MatrixVisualNode): void;
        totalLabel?: string;
        onColumnHeaderClick?(queryName: string): void;
    }
    class MatrixBinder implements controls.ITablixBinder {
        private static headerClassName;
        private static numericCellClassName;
        private static columnHeaderLeafClassName;
        private static rowHeaderLeafClassName;
        private static rowHeaderStaticLeafClassName;
        private static rowHeaderTopLevelStaticLeafClassName;
        private static bodyCellClassName;
        private static totalClassName;
        private static nonBreakingSpace;
        private hierarchyNavigator;
        private options;
        constructor(hierarchyNavigator: IMatrixHierarchyNavigator, options: MatrixBinderOptions);
        onStartRenderingSession(): void;
        onEndRenderingSession(): void;
        /**
         * Row Header.
         */
        bindRowHeader(item: MatrixVisualNode, cell: controls.ITablixCell): void;
        unbindRowHeader(item: any, cell: controls.ITablixCell): void;
        /**
         * Column Header.
         */
        bindColumnHeader(item: MatrixVisualNode, cell: controls.ITablixCell): void;
        unbindColumnHeader(item: MatrixVisualNode, cell: controls.ITablixCell): void;
        /**
         * Body Cell.
         */
        bindBodyCell(item: MatrixVisualBodyItem, cell: controls.ITablixCell): void;
        unbindBodyCell(item: MatrixVisualBodyItem, cell: controls.ITablixCell): void;
        private registerColumnHeaderClickHandler(columnMetadata, cell);
        private unregisterColumnHeaderClickHandler(cell);
        /**
         * Corner Cell.
         */
        bindCornerCell(item: MatrixCornerItem, cell: controls.ITablixCell): void;
        unbindCornerCell(item: MatrixCornerItem, cell: controls.ITablixCell): void;
        bindEmptySpaceHeaderCell(cell: controls.ITablixCell): void;
        unbindEmptySpaceHeaderCell(cell: controls.ITablixCell): void;
        bindEmptySpaceFooterCell(cell: controls.ITablixCell): void;
        unbindEmptySpaceFooterCell(cell: controls.ITablixCell): void;
        /**
         * Measurement Helper.
         */
        getHeaderLabel(item: MatrixVisualNode): string;
        getCellContent(item: MatrixVisualBodyItem): string;
        hasRowGroups(): boolean;
        private static getNodeLabel(node);
        private bindHeader(item, cell, metadata, overwriteSubtotalLabel?);
        /**
         * Returns the column metadata of the column that needs to be sorted for the specified matrix corner node.
         *
         * @return Column metadata or null if the specified corner node does not represent a sortable header.
         */
        private getSortableCornerColumnMetadata(item);
        private getRowHeaderMetadata(item);
        private getColumnHeaderMetadata(item);
        private getHierarchyMetadata(hierarchy, level);
        /**
         * Returns the column metadata of the column that needs to be sorted for the specified header node.
         *
         * @return Column metadata or null if the specified header node does not represent a sortable header.
         */
        private getSortableHeaderColumnMetadata(item);
    }
    class Matrix implements IVisual {
        static formatStringProp: DataViewObjectPropertyIdentifier;
        private static preferredLoadMoreThreshold;
        /**
         * Note: Public only for testing.
         */
        static TotalLabel: string;
        private element;
        private currentViewport;
        private style;
        private dataView;
        private formatter;
        private isInteractive;
        private hostServices;
        private hierarchyNavigator;
        private waitingForData;
        private tablixControl;
        private lastAllowHeaderResize;
        private waitingForSort;
        static customizeQuery(options: CustomizeQueryOptions): void;
        static getSortableRoles(): string[];
        init(options: VisualInitOptions): void;
        onResizing(finalViewport: IViewport): void;
        onDataChanged(options: VisualDataChangedOptions): void;
        private updateViewport(newViewport);
        private refreshControl(clear);
        private getLayoutKind();
        private createControl(matrixNavigator);
        private updateInternal(dataView, previousDataView);
        private shouldClearControl(previousDataView, newDataView);
        private onBindRowHeader(item);
        private onColumnHeaderClick(queryName);
        /**
         * Note: Public for testability.
         */
        needsMoreData(item: MatrixVisualNode): boolean;
        private static shouldShowRowSubtotals(objects);
        private static shouldShowColumnSubtotals(objects);
        private getMatrixDataViewObjects();
        enumerateObjectInstances(options: EnumerateVisualObjectInstancesOptions): VisualObjectInstance[];
        private shouldAllowHeaderResize();
        private verifyHeaderResize();
    }
}
declare module powerbi.visuals {
    var matrixRoleNames: {
        rows: string;
        columns: string;
        values: string;
    };
    var matrixCapabilities: VisualCapabilities;
}
declare module powerbi.visuals {
    var treemapCapabilities: VisualCapabilities;
    var treemapProps: {
        general: {
            formatString: DataViewObjectPropertyIdentifier;
        };
        dataPoint: {
            fill: DataViewObjectPropertyIdentifier;
        };
        legend: {
            show: DataViewObjectPropertyIdentifier;
            position: DataViewObjectPropertyIdentifier;
            showTitle: DataViewObjectPropertyIdentifier;
            titleText: DataViewObjectPropertyIdentifier;
        };
        labels: {
            show: DataViewObjectPropertyIdentifier;
            color: DataViewObjectPropertyIdentifier;
            labelDisplayUnits: DataViewObjectPropertyIdentifier;
            labelPrecision: DataViewObjectPropertyIdentifier;
        };
        categoryLabels: {
            show: DataViewObjectPropertyIdentifier;
        };
    };
}
declare module powerbi.visuals {
    interface TreemapConstructorOptions {
        animator: ITreemapAnimator;
        isScrollable: boolean;
    }
    interface TreemapData {
        root: TreemapNode;
        hasHighlights: boolean;
        legendData: LegendData;
        dataLabelsSettings: VisualDataLabelsSettings;
        legendObjectProperties?: DataViewObject;
        dataWasCulled: boolean;
    }
    /**
     * Treemap node (we extend D3 node (GraphNode) because treemap layout methods rely on the type).
     */
    interface TreemapNode extends D3.Layout.GraphNode, SelectableDataPoint, TooltipEnabledDataPoint, LabelEnabledDataPoint {
        key: any;
        highlightMultiplier?: number;
        color: string;
        highlightedTooltipInfo?: TooltipDataItem[];
    }
    interface ITreemapLayout {
        shapeClass: (d: TreemapNode) => string;
        shapeLayout: {
            x: (d: TreemapNode) => number;
            y: (d: TreemapNode) => number;
            width: (d: TreemapNode) => number;
            height: (d: TreemapNode) => number;
        };
        highlightShapeClass: (d: TreemapNode) => string;
        highlightShapeLayout: {
            x: (d: TreemapNode) => number;
            y: (d: TreemapNode) => number;
            width: (d: TreemapNode) => number;
            height: (d: TreemapNode) => number;
        };
        zeroShapeLayout: {
            x: (d: TreemapNode) => number;
            y: (d: TreemapNode) => number;
            width: (d: TreemapNode) => number;
            height: (d: TreemapNode) => number;
        };
        labelClass: (d: TreemapNode) => string;
        labelLayout: {
            x: (d: TreemapNode) => number;
            y: (d: TreemapNode) => number;
        };
        labelText: (d: TreemapNode) => string;
        areDataLabelsEnabled: () => boolean;
    }
    /**
     * Renders an interactive treemap visual from categorical data.
     */
    class Treemap implements IVisual, IInteractiveVisual {
        static DimmedShapeOpacity: number;
        private static ClassName;
        static LabelsGroupClassName: string;
        static MajorLabelClassName: string;
        static MinorLabelClassName: string;
        static ShapesClassName: string;
        static TreemapNodeClassName: string;
        static RootNodeClassName: string;
        static ParentGroupClassName: string;
        static NodeGroupClassName: string;
        static HighlightNodeClassName: string;
        private static TextMargin;
        private static MinorLabelTextSize;
        private static MinTextWidthForMinorLabel;
        private static MajorLabelTextSize;
        private static MinTextWidthForMajorLabel;
        private static MajorLabelTextProperties;
        /**
         * A rect with an area of 9 is a treemap rectangle of only
         * a single pixel in the middle with a 1 pixel stroke on each edge.
         */
        private static CullableArea;
        private svg;
        private treemap;
        private shapeGraphicsContext;
        private currentViewport;
        private legend;
        private data;
        private style;
        private colors;
        private element;
        private options;
        private isScrollable;
        private hostService;
        /**
         * Note: Public for testing.
         */
        animator: ITreemapAnimator;
        private interactivityService;
        private dataViews;
        static getLayout(labelsSettings: VisualDataLabelsSettings, alternativeScale: number): ITreemapLayout;
        constructor(options?: TreemapConstructorOptions);
        init(options: VisualInitOptions): void;
        /**
         * Note: Public for testing purposes.
         */
        static converter(dataView: DataView, colors: IDataColorPalette, labelSettings: VisualDataLabelsSettings, interactivityService: IInteractivityService, viewport: IViewport, legendObjectProperties?: DataViewObject): TreemapData;
        private static getValuesFromCategoricalDataView(data, hasHighlights);
        private static getCullableValue(totalValue, viewport);
        update(options: VisualUpdateOptions): void;
        onDataChanged(options: VisualDataChangedOptions): void;
        onResizing(viewport: IViewport): void;
        onClearSelection(): void;
        enumerateObjectInstances(options: EnumerateVisualObjectInstancesOptions): VisualObjectInstance[];
        private enumerateDataPoints(data);
        private enumerateLegend(data);
        private static checkValueForShape(value);
        private calculateTreemapSize();
        private initViewportDependantProperties(duration?);
        private static isMajorLabel(node);
        private static hasChildrenWithIdentity(node);
        private static canDisplayLabel(node);
        private static createLabelForShape(node, labelsSettings, alternativeScale, formattersCache);
        static getFill(d: TreemapNode, isHighlightRect: boolean): string;
        static getFillOpacity(d: TreemapNode, hasSelection: boolean, hasHighlights: boolean, isHighlightRect: boolean): string;
        private updateInternal(suppressAnimations);
        private renderLegend();
        accept(visitor: InteractivityVisitor, options: any): void;
        private static getNodeClass(d, highlight?);
        private static createTreemapShapeLayout(isHighlightRect?);
        private static createTreemapZeroShapeLayout();
        static drawDefaultShapes(context: D3.Selection, nodes: D3.Layout.GraphNode[], hasSelection: boolean, hasHighlights: boolean, layout: ITreemapLayout): D3.UpdateSelection;
        static drawDefaultHighlightShapes(context: D3.Selection, nodes: D3.Layout.GraphNode[], hasSelection: boolean, hasHighlights: boolean, layout: ITreemapLayout): D3.UpdateSelection;
        static drawDefaultLabels(context: D3.Selection, nodes: D3.Layout.GraphNode[], labelSettings: VisualDataLabelsSettings, layout: ITreemapLayout): D3.UpdateSelection;
        static cleanDataLabels(context: D3.Selection): void;
    }
}
declare module powerbi.visuals {
    interface CardStyle {
        card: {
            maxFontSize: number;
        };
        label: {
            fontSize: number;
            color: string;
            height: number;
        };
        value: {
            fontSize: number;
            color: string;
            fontFamily: string;
        };
    }
    interface CardConstructorOptions {
        isScrollable?: boolean;
        displayUnitSystemType?: DisplayUnitSystemType;
        animator?: IGenericAnimator;
    }
    interface CardFormatSetting {
        showTitle: boolean;
        labelSettings: VisualDataLabelsSettings;
    }
    class Card extends AnimatedText implements IVisual {
        private static cardClassName;
        private static Label;
        private static Value;
        static DefaultStyle: CardStyle;
        private toolTip;
        private animationOptions;
        private displayUnitSystemType;
        private isScrollable;
        private graphicsContext;
        private labelContext;
        private cardFormatSetting;
        constructor(options?: CardConstructorOptions);
        init(options: VisualInitOptions): void;
        onDataChanged(options: VisualDataChangedOptions): void;
        onResizing(viewport: IViewport): void;
        private updateViewportProperties();
        getAdjustedFontHeight(availableWidth: number, textToMeasure: string, seedFontHeight: number): number;
        clear(valueOnly?: boolean): void;
        private updateInternal(target, suppressAnimations, forceUpdate?);
        private updateTooltip(target);
        private getDefaultFormatSettings();
        enumerateObjectInstances(options: EnumerateVisualObjectInstancesOptions): VisualObjectInstance[];
    }
}
declare module powerbi.visuals {
    var cardCapabilities: VisualCapabilities;
    var cardProps: {
        cardTitle: {
            show: DataViewObjectPropertyIdentifier;
        };
        labels: {
            color: DataViewObjectPropertyIdentifier;
            labelPrecision: DataViewObjectPropertyIdentifier;
            labelDisplayUnits: DataViewObjectPropertyIdentifier;
        };
    };
}
declare module powerbi.visuals {
    import IStringResourceProvider = jsCommon.IStringResourceProvider;
    class NoMapLocationWarning implements IVisualWarning {
        code: string;
        getMessages(resourceProvider: IStringResourceProvider): IVisualErrorMessage;
    }
    class FilledMapWithoutValidGeotagCategoryWarning implements IVisualWarning {
        code: string;
        getMessages(resourceProvider: IStringResourceProvider): IVisualErrorMessage;
    }
    class GeometryCulledWarning implements IVisualWarning {
        code: string;
        getMessages(resourceProvider: IStringResourceProvider): IVisualErrorMessage;
    }
    class NaNNotSupportedWarning implements IVisualWarning {
        code: string;
        getMessages(resourceProvider: IStringResourceProvider): IVisualErrorMessage;
    }
    class InfinityValuesNotSupportedWarning implements IVisualWarning {
        code: string;
        getMessages(resourceProvider: IStringResourceProvider): IVisualErrorMessage;
    }
    class ValuesOutOfRangeWarning implements IVisualWarning {
        code: string;
        getMessages(resourceProvider: IStringResourceProvider): IVisualErrorMessage;
    }
}
declare module powerbi.visuals {
    var waterfallChartCapabilities: VisualCapabilities;
    var waterfallChartProps: {
        sentimentColors: {
            increaseFill: DataViewObjectPropertyIdentifier;
            decreaseFill: DataViewObjectPropertyIdentifier;
            totalFill: DataViewObjectPropertyIdentifier;
        };
    };
}
declare module powerbi.visuals {
    interface WaterfallChartData extends CartesianData {
        series: WaterfallChartSeries[];
        categories: any[];
        valuesMetadata: DataViewMetadataColumn;
        legend: LegendData;
        hasHighlights: boolean;
        categoryMetadata: DataViewMetadataColumn;
        positionMax: number;
        positionMin: number;
        sentimentColors: WaterfallChartSentimentColors;
        dataLabelsSettings: VisualDataLabelsSettings;
        axesLabels: ChartAxesLabels;
        hasSelection: boolean;
    }
    interface WaterfallChartSeries extends CartesianSeries {
        data: WaterfallChartDataPoint[];
    }
    interface WaterfallChartDataPoint extends CartesianDataPoint, SelectableDataPoint, TooltipEnabledDataPoint, LabelEnabledDataPoint {
        position: number;
        color: string;
        highlight: boolean;
        key: string;
    }
    interface WaterfallChartConstructorOptions extends CartesianVisualConstructorOptions {
    }
    interface WaterfallChartSentimentColors {
        increaseFill: Fill;
        decreaseFill: Fill;
        totalFill: Fill;
    }
    interface WaterfallLayout extends CategoryLayout, ILabelLayout {
        categoryWidth: number;
    }
    class WaterfallChart implements ICartesianVisual, IInteractiveVisual {
        static formatStringProp: DataViewObjectPropertyIdentifier;
        private static WaterfallClassName;
        private static MainGraphicsContextClassName;
        private static IncreaseLabel;
        private static DecreaseLabel;
        private static TotalLabel;
        private static CategoryValueClasses;
        private static WaterfallConnectorClasses;
        private static defaultTotalColor;
        private svg;
        private mainGraphicsContext;
        private mainGraphicsSVG;
        private clearCatcher;
        private xAxisProperties;
        private yAxisProperties;
        private currentViewport;
        private data;
        private element;
        private isScrollable;
        /**
         * Note: If we overflowed horizontally then this holds the subset of data we should render.
         */
        private clippedData;
        private style;
        private colors;
        private hostServices;
        private cartesianVisualHost;
        private interactivity;
        private margin;
        private options;
        private interactivityService;
        private layout;
        constructor(options: WaterfallChartConstructorOptions);
        init(options: CartesianVisualInitOptions): void;
        static converter(dataView: DataView, palette: IDataColorPalette, hostServices: IVisualHostServices, dataLabelSettings: VisualDataLabelsSettings, sentimentColors: WaterfallChartSentimentColors, interactivityService: IInteractivityService): WaterfallChartData;
        setData(dataViews: DataView[]): void;
        enumerateObjectInstances(options: EnumerateVisualObjectInstancesOptions): VisualObjectInstance[];
        private enumerateSentimentColors();
        calculateLegend(): LegendData;
        hasLegend(): boolean;
        private static createClippedDataIfOverflowed(data, renderableDataCount);
        calculateAxesProperties(options: CalculateScaleAndDomainOptions): IAxisProperties[];
        private static getDisplayUnitValueFromAxisFormatter(yAxisProperties, labelSettings);
        private static lookupXValue(data, index, type);
        static getXAxisCreationOptions(data: WaterfallChartData, width: number, layout: CategoryLayout, options: CalculateScaleAndDomainOptions): CreateAxisOptions;
        static getYAxisCreationOptions(data: WaterfallChartData, height: number, options: CalculateScaleAndDomainOptions): CreateAxisOptions;
        getPreferredPlotArea(isScalar: boolean, categoryCount: number, categoryThickness: number): IViewport;
        getVisualCategoryAxisIsScalar(): boolean;
        overrideXScale(xProperties: IAxisProperties): void;
        setFilteredData(startIndex: number, endIndex: number): any;
        private createRects(data);
        private createConnectors(data);
        render(suppressAnimations: boolean): void;
        onClearSelection(): void;
        accept(visitor: InteractivityVisitor, options: any): void;
        getSupportedCategoryAxisType(): string;
        static getRectTop(scale: D3.Scale.GenericScale<any>, pos: number, value: number): number;
        private getAvailableWidth();
        private getAvailableHeight();
        private getSentimentColorsFromObjects(objects);
    }
}
declare module powerbi.visuals {
    import TouchUtils = powerbi.visuals.controls.TouchUtils;
    interface TooltipDataItem {
        displayName: string;
        value: string;
    }
    interface TooltipOptions {
        opacity: number;
        animationDuration: number;
        offsetX: number;
        offsetY: number;
    }
    interface TooltipEnabledDataPoint {
        tooltipInfo?: TooltipDataItem[];
    }
    interface TooltipCategoryDataItem {
        value?: any;
        metadata: DataViewMetadataColumn;
    }
    interface TooltipSeriesDataItem {
        value?: any;
        highlightedValue?: any;
        metadata: DataViewValueColumn;
    }
    interface TooltipLocalizationOptions {
        highlightedValueDisplayName: string;
    }
    interface TooltipEvent {
        data: any;
        index: number;
        coordinates: number[];
        elementCoordinates: number[];
        context: any;
        isTouchEvent: boolean;
    }
    class ToolTipComponent {
        tooltipOptions: TooltipOptions;
        private static DefaultTooltipOptions;
        private tooltipContainer;
        private isTooltipVisible;
        private customScreenWidth;
        private customScreenHeight;
        private static containerClassName;
        private static contentContainerClassName;
        private static arrowClassName;
        private static tooltipRowClassName;
        private static tooltipTitleCellClassName;
        private static tooltipValueCellClassName;
        static parentContainerSelector: string;
        static highlightedValueDisplayNameResorceKey: string;
        static localizationOptions: TooltipLocalizationOptions;
        constructor(tooltipOptions?: TooltipOptions);
        /** Note: For tests only */
        isTooltipComponentVisible(): boolean;
        /** Note: For tests only */
        setTestScreenSize(width: number, height: number): void;
        show(tooltipData: TooltipDataItem[], clickedArea: TouchUtils.Rectangle): void;
        move(tooltipData: TooltipDataItem[], clickedArea: TouchUtils.Rectangle): void;
        hide(): void;
        private createTooltipContainer();
        private setTooltipContent(tooltipData);
        private getTooltipPosition(clickedArea, clickedScreenArea);
        private setPosition(clickedArea);
        private setArrowPosition(clickedArea, clickedScreenArea);
        private getArrowElement();
        private getClickedScreenArea(clickedArea);
    }
    module TooltipManager {
        var ShowTooltips: boolean;
        var ToolTipInstance: ToolTipComponent;
        function addTooltip(d3Selection: D3.Selection, getTooltipInfoDelegate: (tooltipEvent: TooltipEvent) => TooltipDataItem[], reloadTooltipDataOnMouseMove?: boolean): void;
        function showDelayedTooltip(tooltipEvent: TooltipEvent, getTooltipInfoDelegate: (tooltipEvent: TooltipEvent) => TooltipDataItem[], delayInMs: number): number;
        function setLocalizedStrings(localizationOptions: TooltipLocalizationOptions): void;
    }
    module TooltipBuilder {
        function createTooltipInfo(formatStringProp: DataViewObjectPropertyIdentifier, dataViewCat: DataViewCategorical, categoryValue: any, value?: any, categories?: DataViewCategoryColumn[], seriesData?: TooltipSeriesDataItem[], seriesIndex?: number, categoryIndex?: number, highlightedValue?: any): TooltipDataItem[];
    }
}
declare module powerbi.visuals {
    module visualStyles {
        function create(dataColors?: IDataColorPalette): IVisualStyle;
    }
}
declare module powerbi.visuals {
    interface DonutConstructorOptions {
        sliceWidthRatio?: number;
        animator?: IDonutChartAnimator;
        isScrollable?: boolean;
        disableGeometricCulling?: boolean;
    }
    /**
     * Used because data points used in D3 pie layouts are placed within a container with pie information.
     */
    interface DonutArcDescriptor extends D3.Layout.ArcDescriptor {
        data: DonutDataPoint;
    }
    interface DonutDataPoint extends SelectableDataPoint, TooltipEnabledDataPoint, LabelEnabledDataPoint {
        measure: number;
        measureFormat?: string;
        percentage: number;
        highlightRatio: number;
        label: string;
        index: number;
        /** Data points that may be drilled into */
        internalDataPoints?: DonutDataPoint[];
        color: string;
        labelColor: string;
    }
    interface DonutData {
        dataPointsToDeprecate: DonutDataPoint[];
        dataPoints: DonutArcDescriptor[];
        unCulledDataPoints: DonutDataPoint[];
        dataPointsToEnumerate?: LegendDataPoint[];
        legendData: LegendData;
        hasHighlights: boolean;
        dataLabelsSettings: VisualDataLabelsSettings;
        legendObjectProperties?: DataViewObject;
        maxValue?: number;
        visibleGeometryCulled?: boolean;
        defaultDataPointColor?: string;
        showAllDataPoints?: boolean;
    }
    interface DonutLayout {
        fontSize: string;
        shapeLayout: {
            d: (d: DonutArcDescriptor) => string;
        };
        highlightShapeLayout: {
            d: (d: DonutArcDescriptor) => string;
        };
        zeroShapeLayout: {
            d: (d: DonutArcDescriptor) => string;
        };
    }
    /**
     * Renders a donut chart.
     */
    class DonutChart implements IVisual, IInteractiveVisual {
        private static ClassName;
        private static InteractiveLegendClassName;
        private static InteractiveLegendArrowClassName;
        private static DrillDownAnimationDuration;
        private static OuterArcRadiusRatio;
        private static InnerArcRadiusRatio;
        private static FontsizeThreshold;
        private static SmallFontSize;
        private static NormalFontSize;
        private static InteractiveLegendContainerHeight;
        private static OpaqueOpacity;
        private static SemiTransparentOpacity;
        private static defaultSliceWidthRatio;
        private static invisibleArcLengthInPixels;
        private static sliceClass;
        private static sliceHighlightClass;
        private static twoPi;
        static EffectiveZeroValue: number;
        static PolylineOpacity: number;
        private sliceWidthRatio;
        private svg;
        private mainGraphicsContext;
        private clearCatcher;
        private legendContainer;
        private interactiveLegendArrow;
        private parentViewport;
        private currentViewport;
        private formatter;
        private data;
        private pie;
        private arc;
        private outerArc;
        private radius;
        private previousRadius;
        private key;
        private colors;
        private style;
        private drilled;
        private allowDrilldown;
        private options;
        private isInteractive;
        private interactivityState;
        private chartRotationAnimationDuration;
        private interactivityService;
        private legend;
        private hasSetData;
        private isScrollable;
        private disableGeometricCulling;
        private hostService;
        private settings;
        /**
         * Note: Public for testing.
         */
        animator: IDonutChartAnimator;
        constructor(options?: DonutConstructorOptions);
        static converter(dataView: DataView, colors: IDataColorPalette, defaultDataPointColor?: string, viewport?: IViewport, disableGeometricCulling?: boolean): DonutData;
        init(options: VisualInitOptions): void;
        onDataChanged(options: VisualDataChangedOptions): void;
        onResizing(viewport: IViewport): void;
        enumerateObjectInstances(options: EnumerateVisualObjectInstancesOptions): VisualObjectInstance[];
        private enumerateDataPoints();
        private enumerateLegend();
        setInteractiveChosenSlice(sliceIndex: number): void;
        private calculateRadius();
        private initViewportDependantProperties(duration?);
        private mergeDatasets(first, second);
        private updateInternal(data, suppressAnimations, duration?);
        private renderLegend();
        private addInteractiveLegendArrow();
        private calculateSliceAngles();
        private assignInteractions(slices, highlightSlices, data);
        setDrilldown(selection?: DonutDataPoint): void;
        private assignInteractiveChartInteractions(slice);
        /**
         * Get the angle (in degrees) of the drag event coordinates.
         * The angle is calculated against the plane of the center of the donut
         * (meaning, when the center of the donut is at (0,0) coordinates).
         */
        private getAngleFromDragEvent();
        private interactiveDragStart();
        private interactiveDragMove();
        private interactiveDragEnd();
        accept(visitor: InteractivityVisitor, options: any): void;
        private updateInternalToMove(data, duration?);
        static drawDefaultShapes(graphicsContext: D3.Selection, donutData: DonutData, layout: DonutLayout, colors: IDataColorPalette, radius: number, defaultColor?: string): D3.UpdateSelection;
        static drawDefaultHighlightShapes(graphicsContext: D3.Selection, donutData: DonutData, layout: DonutLayout, colors: IDataColorPalette, radius: number): D3.UpdateSelection;
        static drawDefaultCategoryLabels(graphicsContext: D3.Selection, donutData: DonutData, layout: DonutLayout, sliceWidthRatio: number, radius: number, viewport: IViewport): void;
        onClearSelection(): void;
        static getLayout(radius: number, sliceWidthRatio: number, viewport: IViewport): DonutLayout;
        private static getHighlightRadius(radius, sliceWidthRatio, highlightRatio);
        static cullDataByViewport(dataPoints: DonutDataPoint[], maxValue: number, viewport: IViewport): DonutDataPoint[];
    }
}
declare module powerbi.visuals.capabilities {
    var animatedNumber: VisualCapabilities;
    var areaChart: VisualCapabilities;
    var barChart: VisualCapabilities;
    var card: VisualCapabilities;
    var multiRowCard: VisualCapabilities;
    var clusteredBarChart: VisualCapabilities;
    var clusteredColumnChart: VisualCapabilities;
    var columnChart: VisualCapabilities;
    var comboChart: VisualCapabilities;
    var dataDotChart: VisualCapabilities;
    var dataDotClusteredColumnComboChart: VisualCapabilities;
    var dataDotStackedColumnComboChart: VisualCapabilities;
    var donutChart: VisualCapabilities;
    var funnel: VisualCapabilities;
    var gauge: VisualCapabilities;
    var hundredPercentStackedBarChart: VisualCapabilities;
    var hundredPercentStackedColumnChart: VisualCapabilities;
    var image: VisualCapabilities;
    var lineChart: VisualCapabilities;
    var lineStackedColumnComboChart: VisualCapabilities;
    var lineClusteredColumnComboChart: VisualCapabilities;
    var map: VisualCapabilities;
    var filledMap: VisualCapabilities;
    var treemap: VisualCapabilities;
    var pieChart: VisualCapabilities;
    var scatterChart: VisualCapabilities;
    var table: VisualCapabilities;
    var matrix: VisualCapabilities;
    var slicer: VisualCapabilities;
    var textbox: VisualCapabilities;
    var waterfallChart: VisualCapabilities;
    var cheerMeter: VisualCapabilities;
    var heatMap: VisualCapabilities;
}
declare module powerbi.visuals.plugins {
    var animatedNumber: IVisualPlugin;
    var areaChart: IVisualPlugin;
    var barChart: IVisualPlugin;
    var basicShape: IVisualPlugin;
    var card: IVisualPlugin;
    var multiRowCard: IVisualPlugin;
    var clusteredBarChart: IVisualPlugin;
    var clusteredColumnChart: IVisualPlugin;
    var columnChart: IVisualPlugin;
    var comboChart: IVisualPlugin;
    var dataDotChart: IVisualPlugin;
    var dataDotClusteredColumnComboChart: IVisualPlugin;
    var dataDotStackedColumnComboChart: IVisualPlugin;
    var donutChart: IVisualPlugin;
    var funnel: IVisualPlugin;
    var gauge: IVisualPlugin;
    var hundredPercentStackedBarChart: IVisualPlugin;
    var hundredPercentStackedColumnChart: IVisualPlugin;
    var image: IVisualPlugin;
    var lineChart: IVisualPlugin;
    var lineStackedColumnComboChart: IVisualPlugin;
    var lineClusteredColumnComboChart: IVisualPlugin;
    var map: IVisualPlugin;
    var filledMap: IVisualPlugin;
    var treemap: IVisualPlugin;
    var pieChart: IVisualPlugin;
    var scatterChart: IVisualPlugin;
    var table: IVisualPlugin;
    var matrix: IVisualPlugin;
    var slicer: IVisualPlugin;
    var textbox: IVisualPlugin;
    var waterfallChart: IVisualPlugin;
    var cheerMeter: IVisualPlugin;
    var consoleWriter: IVisualPlugin;
    var helloIVisual: IVisualPlugin;
    var asterPlot: IVisualPlugin;
}
declare module powerbi.visuals {
    class DataColorPalette implements IDataColorPalette {
        private scales;
        private colors;
        /**
         * Colors used for sentiment visuals, e.g. KPI, Gauge. Since this is only a temporary implementation which will
         * eventually be superseded by conditional formatting, we don't declare them as part of the theme and instead
         * use a hardcoded color scheme here until conditional formatting is ready.
         */
        private sentimentColors;
        private basePickerColors;
        /**
         * Creates a DataColorPalette using the given theme, or the default theme.
         */
        constructor(colors?: IColorInfo[]);
        getColorScaleByKey(key: string): IColorScale;
        getNewColorScale(): IColorScale;
        getColorByIndex(index: number): IColorInfo;
        getSentimentColors(): IColorInfo[];
        getBasePickerColors(): IColorInfo[];
        private createScale();
    }
    class D3ColorScale implements IColorScale {
        private scale;
        constructor(scale: D3.Scale.OrdinalScale);
        getColor(key: any): IColorInfo;
        clearAndRotateScale(): void;
        clone(): IColorScale;
        static createFromColors(colors: IColorInfo[]): D3ColorScale;
    }
}
declare module powerbi.visuals {
    module CanvasBackgroundHelper {
        function getDefaultColor(): string;
        function getDefaultValues(): {
            color: string;
        };
    }
}
