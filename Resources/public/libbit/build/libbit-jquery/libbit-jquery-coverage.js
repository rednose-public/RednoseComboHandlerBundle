if (typeof _yuitest_coverage == "undefined"){
    _yuitest_coverage = {};
    _yuitest_coverline = function(src, line){
        var coverage = _yuitest_coverage[src];
        if (!coverage.lines[line]){
            coverage.calledLines++;
        }
        coverage.lines[line]++;
    };
    _yuitest_coverfunc = function(src, name, line){
        var coverage = _yuitest_coverage[src],
            funcId = name + ":" + line;
        if (!coverage.functions[funcId]){
            coverage.calledFunctions++;
        }
        coverage.functions[funcId]++;
    };
}
_yuitest_coverage["build/libbit-jquery/libbit-jquery.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/libbit-jquery/libbit-jquery.js",
    code: []
};
_yuitest_coverage["build/libbit-jquery/libbit-jquery.js"].code=["YUI.add('libbit-jquery', function (Y, NAME) {","","/*!"," * jQuery JavaScript Library v1.8.2"," * http://jquery.com/"," *"," * Includes Sizzle.js"," * http://sizzlejs.com/"," *"," * Copyright 2012 jQuery Foundation and other contributors"," * Released under the MIT license"," * http://jquery.org/license"," *"," * Date: Thu Sep 20 2012 21:13:05 GMT-0400 (Eastern Daylight Time)"," */","(function( window, undefined ) {","var","    // A central reference to the root jQuery(document)","    rootjQuery,","","    // The deferred used on DOM ready","    readyList,","","    // Use the correct document accordingly with window argument (sandbox)","    document = window.document,","    location = window.location,","    navigator = window.navigator,","","    // Map over jQuery in case of overwrite","    _jQuery = window.jQuery,","","    // Map over the $ in case of overwrite","    _$ = window.$,","","    // Save a reference to some core methods","    core_push = Array.prototype.push,","    core_slice = Array.prototype.slice,","    core_indexOf = Array.prototype.indexOf,","    core_toString = Object.prototype.toString,","    core_hasOwn = Object.prototype.hasOwnProperty,","    core_trim = String.prototype.trim,","","    // Define a local copy of jQuery","    jQuery = function( selector, context ) {","        // The jQuery object is actually just the init constructor 'enhanced'","        return new jQuery.fn.init( selector, context, rootjQuery );","    },","","    // Used for matching numbers","    core_pnum = /[\\-+]?(?:\\d*\\.|)\\d+(?:[eE][\\-+]?\\d+|)/.source,","","    // Used for detecting and trimming whitespace","    core_rnotwhite = /\\S/,","    core_rspace = /\\s+/,","","    // Make sure we trim BOM and NBSP (here's looking at you, Safari 5.0 and IE)","    rtrim = /^[\\s\\uFEFF\\xA0]+|[\\s\\uFEFF\\xA0]+$/g,","","    // A simple way to check for HTML strings","    // Prioritize #id over <tag> to avoid XSS via location.hash (#9521)","    rquickExpr = /^(?:[^#<]*(<[\\w\\W]+>)[^>]*$|#([\\w\\-]*)$)/,","","    // Match a standalone tag","    rsingleTag = /^<(\\w+)\\s*\\/?>(?:<\\/\\1>|)$/,","","    // JSON RegExp","    rvalidchars = /^[\\],:{}\\s]*$/,","    rvalidbraces = /(?:^|:|,)(?:\\s*\\[)+/g,","    rvalidescape = /\\\\(?:[\"\\\\\\/bfnrt]|u[\\da-fA-F]{4})/g,","    rvalidtokens = /\"[^\"\\\\\\r\\n]*\"|true|false|null|-?(?:\\d\\d*\\.|)\\d+(?:[eE][\\-+]?\\d+|)/g,","","    // Matches dashed string for camelizing","    rmsPrefix = /^-ms-/,","    rdashAlpha = /-([\\da-z])/gi,","","    // Used by jQuery.camelCase as callback to replace()","    fcamelCase = function( all, letter ) {","        return ( letter + \"\" ).toUpperCase();","    },","","    // The ready event handler and self cleanup method","    DOMContentLoaded = function() {","        if ( document.addEventListener ) {","            document.removeEventListener( \"DOMContentLoaded\", DOMContentLoaded, false );","            jQuery.ready();","        } else if ( document.readyState === \"complete\" ) {","            // we're here because readyState === \"complete\" in oldIE","            // which is good enough for us to call the dom ready!","            document.detachEvent( \"onreadystatechange\", DOMContentLoaded );","            jQuery.ready();","        }","    },","","    // [[Class]] -> type pairs","    class2type = {};","","jQuery.fn = jQuery.prototype = {","    constructor: jQuery,","    init: function( selector, context, rootjQuery ) {","        var match, elem, ret, doc;","","        // Handle $(\"\"), $(null), $(undefined), $(false)","        if ( !selector ) {","            return this;","        }","","        // Handle $(DOMElement)","        if ( selector.nodeType ) {","            this.context = this[0] = selector;","            this.length = 1;","            return this;","        }","","        // Handle HTML strings","        if ( typeof selector === \"string\" ) {","            if ( selector.charAt(0) === \"<\" && selector.charAt( selector.length - 1 ) === \">\" && selector.length >= 3 ) {","                // Assume that strings that start and end with <> are HTML and skip the regex check","                match = [ null, selector, null ];","","            } else {","                match = rquickExpr.exec( selector );","            }","","            // Match html or make sure no context is specified for #id","            if ( match && (match[1] || !context) ) {","","                // HANDLE: $(html) -> $(array)","                if ( match[1] ) {","                    context = context instanceof jQuery ? context[0] : context;","                    doc = ( context && context.nodeType ? context.ownerDocument || context : document );","","                    // scripts is true for back-compat","                    selector = jQuery.parseHTML( match[1], doc, true );","                    if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {","                        this.attr.call( selector, context, true );","                    }","","                    return jQuery.merge( this, selector );","","                // HANDLE: $(#id)","                } else {","                    elem = document.getElementById( match[2] );","","                    // Check parentNode to catch when Blackberry 4.6 returns","                    // nodes that are no longer in the document #6963","                    if ( elem && elem.parentNode ) {","                        // Handle the case where IE and Opera return items","                        // by name instead of ID","                        if ( elem.id !== match[2] ) {","                            return rootjQuery.find( selector );","                        }","","                        // Otherwise, we inject the element directly into the jQuery object","                        this.length = 1;","                        this[0] = elem;","                    }","","                    this.context = document;","                    this.selector = selector;","                    return this;","                }","","            // HANDLE: $(expr, $(...))","            } else if ( !context || context.jquery ) {","                return ( context || rootjQuery ).find( selector );","","            // HANDLE: $(expr, context)","            // (which is just equivalent to: $(context).find(expr)","            } else {","                return this.constructor( context ).find( selector );","            }","","        // HANDLE: $(function)","        // Shortcut for document ready","        } else if ( jQuery.isFunction( selector ) ) {","            return rootjQuery.ready( selector );","        }","","        if ( selector.selector !== undefined ) {","            this.selector = selector.selector;","            this.context = selector.context;","        }","","        return jQuery.makeArray( selector, this );","    },","","    // Start with an empty selector","    selector: \"\",","","    // The current version of jQuery being used","    jquery: \"1.8.2\",","","    // The default length of a jQuery object is 0","    length: 0,","","    // The number of elements contained in the matched element set","    size: function() {","        return this.length;","    },","","    toArray: function() {","        return core_slice.call( this );","    },","","    // Get the Nth element in the matched element set OR","    // Get the whole matched element set as a clean array","    get: function( num ) {","        return num == null ?","","            // Return a 'clean' array","            this.toArray() :","","            // Return just the object","            ( num < 0 ? this[ this.length + num ] : this[ num ] );","    },","","    // Take an array of elements and push it onto the stack","    // (returning the new matched element set)","    pushStack: function( elems, name, selector ) {","","        // Build a new jQuery matched element set","        var ret = jQuery.merge( this.constructor(), elems );","","        // Add the old object onto the stack (as a reference)","        ret.prevObject = this;","","        ret.context = this.context;","","        if ( name === \"find\" ) {","            ret.selector = this.selector + ( this.selector ? \" \" : \"\" ) + selector;","        } else if ( name ) {","            ret.selector = this.selector + \".\" + name + \"(\" + selector + \")\";","        }","","        // Return the newly-formed element set","        return ret;","    },","","    // Execute a callback for every element in the matched set.","    // (You can seed the arguments with an array of args, but this is","    // only used internally.)","    each: function( callback, args ) {","        return jQuery.each( this, callback, args );","    },","","    ready: function( fn ) {","        // Add the callback","        jQuery.ready.promise().done( fn );","","        return this;","    },","","    eq: function( i ) {","        i = +i;","        return i === -1 ?","            this.slice( i ) :","            this.slice( i, i + 1 );","    },","","    first: function() {","        return this.eq( 0 );","    },","","    last: function() {","        return this.eq( -1 );","    },","","    slice: function() {","        return this.pushStack( core_slice.apply( this, arguments ),","            \"slice\", core_slice.call(arguments).join(\",\") );","    },","","    map: function( callback ) {","        return this.pushStack( jQuery.map(this, function( elem, i ) {","            return callback.call( elem, i, elem );","        }));","    },","","    end: function() {","        return this.prevObject || this.constructor(null);","    },","","    // For internal use only.","    // Behaves like an Array's method, not like a jQuery method.","    push: core_push,","    sort: [].sort,","    splice: [].splice","};","","// Give the init function the jQuery prototype for later instantiation","jQuery.fn.init.prototype = jQuery.fn;","","jQuery.extend = jQuery.fn.extend = function() {","    var options, name, src, copy, copyIsArray, clone,","        target = arguments[0] || {},","        i = 1,","        length = arguments.length,","        deep = false;","","    // Handle a deep copy situation","    if ( typeof target === \"boolean\" ) {","        deep = target;","        target = arguments[1] || {};","        // skip the boolean and the target","        i = 2;","    }","","    // Handle case when target is a string or something (possible in deep copy)","    if ( typeof target !== \"object\" && !jQuery.isFunction(target) ) {","        target = {};","    }","","    // extend jQuery itself if only one argument is passed","    if ( length === i ) {","        target = this;","        --i;","    }","","    for ( ; i < length; i++ ) {","        // Only deal with non-null/undefined values","        if ( (options = arguments[ i ]) != null ) {","            // Extend the base object","            for ( name in options ) {","                src = target[ name ];","                copy = options[ name ];","","                // Prevent never-ending loop","                if ( target === copy ) {","                    continue;","                }","","                // Recurse if we're merging plain objects or arrays","                if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {","                    if ( copyIsArray ) {","                        copyIsArray = false;","                        clone = src && jQuery.isArray(src) ? src : [];","","                    } else {","                        clone = src && jQuery.isPlainObject(src) ? src : {};","                    }","","                    // Never move original objects, clone them","                    target[ name ] = jQuery.extend( deep, clone, copy );","","                // Don't bring in undefined values","                } else if ( copy !== undefined ) {","                    target[ name ] = copy;","                }","            }","        }","    }","","    // Return the modified object","    return target;","};","","jQuery.extend({","    noConflict: function( deep ) {","        if ( window.$ === jQuery ) {","            window.$ = _$;","        }","","        if ( deep && window.jQuery === jQuery ) {","            window.jQuery = _jQuery;","        }","","        return jQuery;","    },","","    // Is the DOM ready to be used? Set to true once it occurs.","    isReady: false,","","    // A counter to track how many items to wait for before","    // the ready event fires. See #6781","    readyWait: 1,","","    // Hold (or release) the ready event","    holdReady: function( hold ) {","        if ( hold ) {","            jQuery.readyWait++;","        } else {","            jQuery.ready( true );","        }","    },","","    // Handle when the DOM is ready","    ready: function( wait ) {","","        // Abort if there are pending holds or we're already ready","        if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {","            return;","        }","","        // Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).","        if ( !document.body ) {","            return setTimeout( jQuery.ready, 1 );","        }","","        // Remember that the DOM is ready","        jQuery.isReady = true;","","        // If a normal DOM Ready event fired, decrement, and wait if need be","        if ( wait !== true && --jQuery.readyWait > 0 ) {","            return;","        }","","        // If there are functions bound, to execute","        readyList.resolveWith( document, [ jQuery ] );","","        // Trigger any bound ready events","        if ( jQuery.fn.trigger ) {","            jQuery( document ).trigger(\"ready\").off(\"ready\");","        }","    },","","    // See test/unit/core.js for details concerning isFunction.","    // Since version 1.3, DOM methods and functions like alert","    // aren't supported. They return false on IE (#2968).","    isFunction: function( obj ) {","        return jQuery.type(obj) === \"function\";","    },","","    isArray: Array.isArray || function( obj ) {","        return jQuery.type(obj) === \"array\";","    },","","    isWindow: function( obj ) {","        return obj != null && obj == obj.window;","    },","","    isNumeric: function( obj ) {","        return !isNaN( parseFloat(obj) ) && isFinite( obj );","    },","","    type: function( obj ) {","        return obj == null ?","            String( obj ) :","            class2type[ core_toString.call(obj) ] || \"object\";","    },","","    isPlainObject: function( obj ) {","        // Must be an Object.","        // Because of IE, we also have to check the presence of the constructor property.","        // Make sure that DOM nodes and window objects don't pass through, as well","        if ( !obj || jQuery.type(obj) !== \"object\" || obj.nodeType || jQuery.isWindow( obj ) ) {","            return false;","        }","","        try {","            // Not own constructor property must be Object","            if ( obj.constructor &&","                !core_hasOwn.call(obj, \"constructor\") &&","                !core_hasOwn.call(obj.constructor.prototype, \"isPrototypeOf\") ) {","                return false;","            }","        } catch ( e ) {","            // IE8,9 Will throw exceptions on certain host objects #9897","            return false;","        }","","        // Own properties are enumerated firstly, so to speed up,","        // if last one is own, then all properties are own.","","        var key;","        for ( key in obj ) {}","","        return key === undefined || core_hasOwn.call( obj, key );","    },","","    isEmptyObject: function( obj ) {","        var name;","        for ( name in obj ) {","            return false;","        }","        return true;","    },","","    error: function( msg ) {","        throw new Error( msg );","    },","","    // data: string of html","    // context (optional): If specified, the fragment will be created in this context, defaults to document","    // scripts (optional): If true, will include scripts passed in the html string","    parseHTML: function( data, context, scripts ) {","        var parsed;","        if ( !data || typeof data !== \"string\" ) {","            return null;","        }","        if ( typeof context === \"boolean\" ) {","            scripts = context;","            context = 0;","        }","        context = context || document;","","        // Single tag","        if ( (parsed = rsingleTag.exec( data )) ) {","            return [ context.createElement( parsed[1] ) ];","        }","","        parsed = jQuery.buildFragment( [ data ], context, scripts ? null : [] );","        return jQuery.merge( [],","            (parsed.cacheable ? jQuery.clone( parsed.fragment ) : parsed.fragment).childNodes );","    },","","    parseJSON: function( data ) {","        if ( !data || typeof data !== \"string\") {","            return null;","        }","","        // Make sure leading/trailing whitespace is removed (IE can't handle it)","        data = jQuery.trim( data );","","        // Attempt to parse using the native JSON parser first","        if ( window.JSON && window.JSON.parse ) {","            return window.JSON.parse( data );","        }","","        // Make sure the incoming data is actual JSON","        // Logic borrowed from http://json.org/json2.js","        if ( rvalidchars.test( data.replace( rvalidescape, \"@\" )","            .replace( rvalidtokens, \"]\" )","            .replace( rvalidbraces, \"\")) ) {","","            return ( new Function( \"return \" + data ) )();","","        }","        jQuery.error( \"Invalid JSON: \" + data );","    },","","    // Cross-browser xml parsing","    parseXML: function( data ) {","        var xml, tmp;","        if ( !data || typeof data !== \"string\" ) {","            return null;","        }","        try {","            if ( window.DOMParser ) { // Standard","                tmp = new DOMParser();","                xml = tmp.parseFromString( data , \"text/xml\" );","            } else { // IE","                xml = new ActiveXObject( \"Microsoft.XMLDOM\" );","                xml.async = \"false\";","                xml.loadXML( data );","            }","        } catch( e ) {","            xml = undefined;","        }","        if ( !xml || !xml.documentElement || xml.getElementsByTagName( \"parsererror\" ).length ) {","            jQuery.error( \"Invalid XML: \" + data );","        }","        return xml;","    },","","    noop: function() {},","","    // Evaluates a script in a global context","    // Workarounds based on findings by Jim Driscoll","    // http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context","    globalEval: function( data ) {","        if ( data && core_rnotwhite.test( data ) ) {","            // We use execScript on Internet Explorer","            // We use an anonymous function so that context is window","            // rather than jQuery in Firefox","            ( window.execScript || function( data ) {","                window[ \"eval\" ].call( window, data );","            } )( data );","        }","    },","","    // Convert dashed to camelCase; used by the css and data modules","    // Microsoft forgot to hump their vendor prefix (#9572)","    camelCase: function( string ) {","        return string.replace( rmsPrefix, \"ms-\" ).replace( rdashAlpha, fcamelCase );","    },","","    nodeName: function( elem, name ) {","        return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();","    },","","    // args is for internal usage only","    each: function( obj, callback, args ) {","        var name,","            i = 0,","            length = obj.length,","            isObj = length === undefined || jQuery.isFunction( obj );","","        if ( args ) {","            if ( isObj ) {","                for ( name in obj ) {","                    if ( callback.apply( obj[ name ], args ) === false ) {","                        break;","                    }","                }","            } else {","                for ( ; i < length; ) {","                    if ( callback.apply( obj[ i++ ], args ) === false ) {","                        break;","                    }","                }","            }","","        // A special, fast, case for the most common use of each","        } else {","            if ( isObj ) {","                for ( name in obj ) {","                    if ( callback.call( obj[ name ], name, obj[ name ] ) === false ) {","                        break;","                    }","                }","            } else {","                for ( ; i < length; ) {","                    if ( callback.call( obj[ i ], i, obj[ i++ ] ) === false ) {","                        break;","                    }","                }","            }","        }","","        return obj;","    },","","    // Use native String.trim function wherever possible","    trim: core_trim && !core_trim.call(\"\\uFEFF\\xA0\") ?","        function( text ) {","            return text == null ?","                \"\" :","                core_trim.call( text );","        } :","","        // Otherwise use our own trimming functionality","        function( text ) {","            return text == null ?","                \"\" :","                ( text + \"\" ).replace( rtrim, \"\" );","        },","","    // results is for internal usage only","    makeArray: function( arr, results ) {","        var type,","            ret = results || [];","","        if ( arr != null ) {","            // The window, strings (and functions) also have 'length'","            // Tweaked logic slightly to handle Blackberry 4.7 RegExp issues #6930","            type = jQuery.type( arr );","","            if ( arr.length == null || type === \"string\" || type === \"function\" || type === \"regexp\" || jQuery.isWindow( arr ) ) {","                core_push.call( ret, arr );","            } else {","                jQuery.merge( ret, arr );","            }","        }","","        return ret;","    },","","    inArray: function( elem, arr, i ) {","        var len;","","        if ( arr ) {","            if ( core_indexOf ) {","                return core_indexOf.call( arr, elem, i );","            }","","            len = arr.length;","            i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;","","            for ( ; i < len; i++ ) {","                // Skip accessing in sparse arrays","                if ( i in arr && arr[ i ] === elem ) {","                    return i;","                }","            }","        }","","        return -1;","    },","","    merge: function( first, second ) {","        var l = second.length,","            i = first.length,","            j = 0;","","        if ( typeof l === \"number\" ) {","            for ( ; j < l; j++ ) {","                first[ i++ ] = second[ j ];","            }","","        } else {","            while ( second[j] !== undefined ) {","                first[ i++ ] = second[ j++ ];","            }","        }","","        first.length = i;","","        return first;","    },","","    grep: function( elems, callback, inv ) {","        var retVal,","            ret = [],","            i = 0,","            length = elems.length;","        inv = !!inv;","","        // Go through the array, only saving the items","        // that pass the validator function","        for ( ; i < length; i++ ) {","            retVal = !!callback( elems[ i ], i );","            if ( inv !== retVal ) {","                ret.push( elems[ i ] );","            }","        }","","        return ret;","    },","","    // arg is for internal usage only","    map: function( elems, callback, arg ) {","        var value, key,","            ret = [],","            i = 0,","            length = elems.length,","            // jquery objects are treated as arrays","            isArray = elems instanceof jQuery || length !== undefined && typeof length === \"number\" && ( ( length > 0 && elems[ 0 ] && elems[ length -1 ] ) || length === 0 || jQuery.isArray( elems ) ) ;","","        // Go through the array, translating each of the items to their","        if ( isArray ) {","            for ( ; i < length; i++ ) {","                value = callback( elems[ i ], i, arg );","","                if ( value != null ) {","                    ret[ ret.length ] = value;","                }","            }","","        // Go through every key on the object,","        } else {","            for ( key in elems ) {","                value = callback( elems[ key ], key, arg );","","                if ( value != null ) {","                    ret[ ret.length ] = value;","                }","            }","        }","","        // Flatten any nested arrays","        return ret.concat.apply( [], ret );","    },","","    // A global GUID counter for objects","    guid: 1,","","    // Bind a function to a context, optionally partially applying any","    // arguments.","    proxy: function( fn, context ) {","        var tmp, args, proxy;","","        if ( typeof context === \"string\" ) {","            tmp = fn[ context ];","            context = fn;","            fn = tmp;","        }","","        // Quick check to determine if target is callable, in the spec","        // this throws a TypeError, but we will just return undefined.","        if ( !jQuery.isFunction( fn ) ) {","            return undefined;","        }","","        // Simulated bind","        args = core_slice.call( arguments, 2 );","        proxy = function() {","            return fn.apply( context, args.concat( core_slice.call( arguments ) ) );","        };","","        // Set the guid of unique handler to the same of original handler, so it can be removed","        proxy.guid = fn.guid = fn.guid || jQuery.guid++;","","        return proxy;","    },","","    // Multifunctional method to get and set values of a collection","    // The value/s can optionally be executed if it's a function","    access: function( elems, fn, key, value, chainable, emptyGet, pass ) {","        var exec,","            bulk = key == null,","            i = 0,","            length = elems.length;","","        // Sets many values","        if ( key && typeof key === \"object\" ) {","            for ( i in key ) {","                jQuery.access( elems, fn, i, key[i], 1, emptyGet, value );","            }","            chainable = 1;","","        // Sets one value","        } else if ( value !== undefined ) {","            // Optionally, function values get executed if exec is true","            exec = pass === undefined && jQuery.isFunction( value );","","            if ( bulk ) {","                // Bulk operations only iterate when executing function values","                if ( exec ) {","                    exec = fn;","                    fn = function( elem, key, value ) {","                        return exec.call( jQuery( elem ), value );","                    };","","                // Otherwise they run against the entire set","                } else {","                    fn.call( elems, value );","                    fn = null;","                }","            }","","            if ( fn ) {","                for (; i < length; i++ ) {","                    fn( elems[i], key, exec ? value.call( elems[i], i, fn( elems[i], key ) ) : value, pass );","                }","            }","","            chainable = 1;","        }","","        return chainable ?","            elems :","","            // Gets","            bulk ?","                fn.call( elems ) :","                length ? fn( elems[0], key ) : emptyGet;","    },","","    now: function() {","        return ( new Date() ).getTime();","    }","});","","jQuery.ready.promise = function( obj ) {","    if ( !readyList ) {","","        readyList = jQuery.Deferred();","","        // Catch cases where $(document).ready() is called after the browser event has already occurred.","        // we once tried to use readyState \"interactive\" here, but it caused issues like the one","        // discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15","        if ( document.readyState === \"complete\" ) {","            // Handle it asynchronously to allow scripts the opportunity to delay ready","            setTimeout( jQuery.ready, 1 );","","        // Standards-based browsers support DOMContentLoaded","        } else if ( document.addEventListener ) {","            // Use the handy event callback","            document.addEventListener( \"DOMContentLoaded\", DOMContentLoaded, false );","","            // A fallback to window.onload, that will always work","            window.addEventListener( \"load\", jQuery.ready, false );","","        // If IE event model is used","        } else {","            // Ensure firing before onload, maybe late but safe also for iframes","            document.attachEvent( \"onreadystatechange\", DOMContentLoaded );","","            // A fallback to window.onload, that will always work","            window.attachEvent( \"onload\", jQuery.ready );","","            // If IE and not a frame","            // continually check to see if the document is ready","            var top = false;","","            try {","                top = window.frameElement == null && document.documentElement;","            } catch(e) {}","","            if ( top && top.doScroll ) {","                (function doScrollCheck() {","                    if ( !jQuery.isReady ) {","","                        try {","                            // Use the trick by Diego Perini","                            // http://javascript.nwbox.com/IEContentLoaded/","                            top.doScroll(\"left\");","                        } catch(e) {","                            return setTimeout( doScrollCheck, 50 );","                        }","","                        // and execute any waiting functions","                        jQuery.ready();","                    }","                })();","            }","        }","    }","    return readyList.promise( obj );","};","","// Populate the class2type map","jQuery.each(\"Boolean Number String Function Array Date RegExp Object\".split(\" \"), function(i, name) {","    class2type[ \"[object \" + name + \"]\" ] = name.toLowerCase();","});","","// All jQuery objects should point back to these","rootjQuery = jQuery(document);","// String to Object options format cache","var optionsCache = {};","","// Convert String-formatted options into Object-formatted ones and store in cache","function createOptions( options ) {","    var object = optionsCache[ options ] = {};","    jQuery.each( options.split( core_rspace ), function( _, flag ) {","        object[ flag ] = true;","    });","    return object;","}","","/*"," * Create a callback list using the following parameters:"," *"," *  options: an optional list of space-separated options that will change how"," *          the callback list behaves or a more traditional option object"," *"," * By default a callback list will act like an event callback list and can be"," * \"fired\" multiple times."," *"," * Possible options:"," *"," *  once:           will ensure the callback list can only be fired once (like a Deferred)"," *"," *  memory:         will keep track of previous values and will call any callback added"," *                  after the list has been fired right away with the latest \"memorized\""," *                  values (like a Deferred)"," *"," *  unique:         will ensure a callback can only be added once (no duplicate in the list)"," *"," *  stopOnFalse:    interrupt callings when a callback returns false"," *"," */","jQuery.Callbacks = function( options ) {","","    // Convert options from String-formatted to Object-formatted if needed","    // (we check in cache first)","    options = typeof options === \"string\" ?","        ( optionsCache[ options ] || createOptions( options ) ) :","        jQuery.extend( {}, options );","","    var // Last fire value (for non-forgettable lists)","        memory,","        // Flag to know if list was already fired","        fired,","        // Flag to know if list is currently firing","        firing,","        // First callback to fire (used internally by add and fireWith)","        firingStart,","        // End of the loop when firing","        firingLength,","        // Index of currently firing callback (modified by remove if needed)","        firingIndex,","        // Actual callback list","        list = [],","        // Stack of fire calls for repeatable lists","        stack = !options.once && [],","        // Fire callbacks","        fire = function( data ) {","            memory = options.memory && data;","            fired = true;","            firingIndex = firingStart || 0;","            firingStart = 0;","            firingLength = list.length;","            firing = true;","            for ( ; list && firingIndex < firingLength; firingIndex++ ) {","                if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {","                    memory = false; // To prevent further calls using add","                    break;","                }","            }","            firing = false;","            if ( list ) {","                if ( stack ) {","                    if ( stack.length ) {","                        fire( stack.shift() );","                    }","                } else if ( memory ) {","                    list = [];","                } else {","                    self.disable();","                }","            }","        },","        // Actual Callbacks object","        self = {","            // Add a callback or a collection of callbacks to the list","            add: function() {","                if ( list ) {","                    // First, we save the current length","                    var start = list.length;","                    (function add( args ) {","                        jQuery.each( args, function( _, arg ) {","                            var type = jQuery.type( arg );","                            if ( type === \"function\" && ( !options.unique || !self.has( arg ) ) ) {","                                list.push( arg );","                            } else if ( arg && arg.length && type !== \"string\" ) {","                                // Inspect recursively","                                add( arg );","                            }","                        });","                    })( arguments );","                    // Do we need to add the callbacks to the","                    // current firing batch?","                    if ( firing ) {","                        firingLength = list.length;","                    // With memory, if we're not firing then","                    // we should call right away","                    } else if ( memory ) {","                        firingStart = start;","                        fire( memory );","                    }","                }","                return this;","            },","            // Remove a callback from the list","            remove: function() {","                if ( list ) {","                    jQuery.each( arguments, function( _, arg ) {","                        var index;","                        while( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {","                            list.splice( index, 1 );","                            // Handle firing indexes","                            if ( firing ) {","                                if ( index <= firingLength ) {","                                    firingLength--;","                                }","                                if ( index <= firingIndex ) {","                                    firingIndex--;","                                }","                            }","                        }","                    });","                }","                return this;","            },","            // Control if a given callback is in the list","            has: function( fn ) {","                return jQuery.inArray( fn, list ) > -1;","            },","            // Remove all callbacks from the list","            empty: function() {","                list = [];","                return this;","            },","            // Have the list do nothing anymore","            disable: function() {","                list = stack = memory = undefined;","                return this;","            },","            // Is it disabled?","            disabled: function() {","                return !list;","            },","            // Lock the list in its current state","            lock: function() {","                stack = undefined;","                if ( !memory ) {","                    self.disable();","                }","                return this;","            },","            // Is it locked?","            locked: function() {","                return !stack;","            },","            // Call all callbacks with the given context and arguments","            fireWith: function( context, args ) {","                args = args || [];","                args = [ context, args.slice ? args.slice() : args ];","                if ( list && ( !fired || stack ) ) {","                    if ( firing ) {","                        stack.push( args );","                    } else {","                        fire( args );","                    }","                }","                return this;","            },","            // Call all the callbacks with the given arguments","            fire: function() {","                self.fireWith( this, arguments );","                return this;","            },","            // To know if the callbacks have already been called at least once","            fired: function() {","                return !!fired;","            }","        };","","    return self;","};","jQuery.extend({","","    Deferred: function( func ) {","        var tuples = [","                // action, add listener, listener list, final state","                [ \"resolve\", \"done\", jQuery.Callbacks(\"once memory\"), \"resolved\" ],","                [ \"reject\", \"fail\", jQuery.Callbacks(\"once memory\"), \"rejected\" ],","                [ \"notify\", \"progress\", jQuery.Callbacks(\"memory\") ]","            ],","            state = \"pending\",","            promise = {","                state: function() {","                    return state;","                },","                always: function() {","                    deferred.done( arguments ).fail( arguments );","                    return this;","                },","                then: function( /* fnDone, fnFail, fnProgress */ ) {","                    var fns = arguments;","                    return jQuery.Deferred(function( newDefer ) {","                        jQuery.each( tuples, function( i, tuple ) {","                            var action = tuple[ 0 ],","                                fn = fns[ i ];","                            // deferred[ done | fail | progress ] for forwarding actions to newDefer","                            deferred[ tuple[1] ]( jQuery.isFunction( fn ) ?","                                function() {","                                    var returned = fn.apply( this, arguments );","                                    if ( returned && jQuery.isFunction( returned.promise ) ) {","                                        returned.promise()","                                            .done( newDefer.resolve )","                                            .fail( newDefer.reject )","                                            .progress( newDefer.notify );","                                    } else {","                                        newDefer[ action + \"With\" ]( this === deferred ? newDefer : this, [ returned ] );","                                    }","                                } :","                                newDefer[ action ]","                            );","                        });","                        fns = null;","                    }).promise();","                },","                // Get a promise for this deferred","                // If obj is provided, the promise aspect is added to the object","                promise: function( obj ) {","                    return obj != null ? jQuery.extend( obj, promise ) : promise;","                }","            },","            deferred = {};","","        // Keep pipe for back-compat","        promise.pipe = promise.then;","","        // Add list-specific methods","        jQuery.each( tuples, function( i, tuple ) {","            var list = tuple[ 2 ],","                stateString = tuple[ 3 ];","","            // promise[ done | fail | progress ] = list.add","            promise[ tuple[1] ] = list.add;","","            // Handle state","            if ( stateString ) {","                list.add(function() {","                    // state = [ resolved | rejected ]","                    state = stateString;","","                // [ reject_list | resolve_list ].disable; progress_list.lock","                }, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );","            }","","            // deferred[ resolve | reject | notify ] = list.fire","            deferred[ tuple[0] ] = list.fire;","            deferred[ tuple[0] + \"With\" ] = list.fireWith;","        });","","        // Make the deferred a promise","        promise.promise( deferred );","","        // Call given func if any","        if ( func ) {","            func.call( deferred, deferred );","        }","","        // All done!","        return deferred;","    },","","    // Deferred helper","    when: function( subordinate /* , ..., subordinateN */ ) {","        var i = 0,","            resolveValues = core_slice.call( arguments ),","            length = resolveValues.length,","","            // the count of uncompleted subordinates","            remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,","","            // the master Deferred. If resolveValues consist of only a single Deferred, just use that.","            deferred = remaining === 1 ? subordinate : jQuery.Deferred(),","","            // Update function for both resolve and progress values","            updateFunc = function( i, contexts, values ) {","                return function( value ) {","                    contexts[ i ] = this;","                    values[ i ] = arguments.length > 1 ? core_slice.call( arguments ) : value;","                    if( values === progressValues ) {","                        deferred.notifyWith( contexts, values );","                    } else if ( !( --remaining ) ) {","                        deferred.resolveWith( contexts, values );","                    }","                };","            },","","            progressValues, progressContexts, resolveContexts;","","        // add listeners to Deferred subordinates; treat others as resolved","        if ( length > 1 ) {","            progressValues = new Array( length );","            progressContexts = new Array( length );","            resolveContexts = new Array( length );","            for ( ; i < length; i++ ) {","                if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {","                    resolveValues[ i ].promise()","                        .done( updateFunc( i, resolveContexts, resolveValues ) )","                        .fail( deferred.reject )","                        .progress( updateFunc( i, progressContexts, progressValues ) );","                } else {","                    --remaining;","                }","            }","        }","","        // if we're not waiting on anything, resolve the master","        if ( !remaining ) {","            deferred.resolveWith( resolveContexts, resolveValues );","        }","","        return deferred.promise();","    }","});","jQuery.support = (function() {","","    var support,","        all,","        a,","        select,","        opt,","        input,","        fragment,","        eventName,","        i,","        isSupported,","        clickFn,","        div = document.createElement(\"div\");","","    // Preliminary tests","    div.setAttribute( \"className\", \"t\" );","    div.innerHTML = \"  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>\";","","    all = div.getElementsByTagName(\"*\");","    a = div.getElementsByTagName(\"a\")[ 0 ];","    a.style.cssText = \"top:1px;float:left;opacity:.5\";","","    // Can't get basic test support","    if ( !all || !all.length ) {","        return {};","    }","","    // First batch of supports tests","    select = document.createElement(\"select\");","    opt = select.appendChild( document.createElement(\"option\") );","    input = div.getElementsByTagName(\"input\")[ 0 ];","","    support = {","        // IE strips leading whitespace when .innerHTML is used","        leadingWhitespace: ( div.firstChild.nodeType === 3 ),","","        // Make sure that tbody elements aren't automatically inserted","        // IE will insert them into empty tables","        tbody: !div.getElementsByTagName(\"tbody\").length,","","        // Make sure that link elements get serialized correctly by innerHTML","        // This requires a wrapper element in IE","        htmlSerialize: !!div.getElementsByTagName(\"link\").length,","","        // Get the style information from getAttribute","        // (IE uses .cssText instead)","        style: /top/.test( a.getAttribute(\"style\") ),","","        // Make sure that URLs aren't manipulated","        // (IE normalizes it by default)","        hrefNormalized: ( a.getAttribute(\"href\") === \"/a\" ),","","        // Make sure that element opacity exists","        // (IE uses filter instead)","        // Use a regex to work around a WebKit issue. See #5145","        opacity: /^0.5/.test( a.style.opacity ),","","        // Verify style float existence","        // (IE uses styleFloat instead of cssFloat)","        cssFloat: !!a.style.cssFloat,","","        // Make sure that if no value is specified for a checkbox","        // that it defaults to \"on\".","        // (WebKit defaults to \"\" instead)","        checkOn: ( input.value === \"on\" ),","","        // Make sure that a selected-by-default option has a working selected property.","        // (WebKit defaults to false instead of true, IE too, if it's in an optgroup)","        optSelected: opt.selected,","","        // Test setAttribute on camelCase class. If it works, we need attrFixes when doing get/setAttribute (ie6/7)","        getSetAttribute: div.className !== \"t\",","","        // Tests for enctype support on a form(#6743)","        enctype: !!document.createElement(\"form\").enctype,","","        // Makes sure cloning an html5 element does not cause problems","        // Where outerHTML is undefined, this still works","        html5Clone: document.createElement(\"nav\").cloneNode( true ).outerHTML !== \"<:nav></:nav>\",","","        // jQuery.support.boxModel DEPRECATED in 1.8 since we don't support Quirks Mode","        boxModel: ( document.compatMode === \"CSS1Compat\" ),","","        // Will be defined later","        submitBubbles: true,","        changeBubbles: true,","        focusinBubbles: false,","        deleteExpando: true,","        noCloneEvent: true,","        inlineBlockNeedsLayout: false,","        shrinkWrapBlocks: false,","        reliableMarginRight: true,","        boxSizingReliable: true,","        pixelPosition: false","    };","","    // Make sure checked status is properly cloned","    input.checked = true;","    support.noCloneChecked = input.cloneNode( true ).checked;","","    // Make sure that the options inside disabled selects aren't marked as disabled","    // (WebKit marks them as disabled)","    select.disabled = true;","    support.optDisabled = !opt.disabled;","","    // Test to see if it's possible to delete an expando from an element","    // Fails in Internet Explorer","    try {","        delete div.test;","    } catch( e ) {","        support.deleteExpando = false;","    }","","    if ( !div.addEventListener && div.attachEvent && div.fireEvent ) {","        div.attachEvent( \"onclick\", clickFn = function() {","            // Cloning a node shouldn't copy over any","            // bound event handlers (IE does this)","            support.noCloneEvent = false;","        });","        div.cloneNode( true ).fireEvent(\"onclick\");","        div.detachEvent( \"onclick\", clickFn );","    }","","    // Check if a radio maintains its value","    // after being appended to the DOM","    input = document.createElement(\"input\");","    input.value = \"t\";","    input.setAttribute( \"type\", \"radio\" );","    support.radioValue = input.value === \"t\";","","    input.setAttribute( \"checked\", \"checked\" );","","    // #11217 - WebKit loses check when the name is after the checked attribute","    input.setAttribute( \"name\", \"t\" );","","    div.appendChild( input );","    fragment = document.createDocumentFragment();","    fragment.appendChild( div.lastChild );","","    // WebKit doesn't clone checked state correctly in fragments","    support.checkClone = fragment.cloneNode( true ).cloneNode( true ).lastChild.checked;","","    // Check if a disconnected checkbox will retain its checked","    // value of true after appended to the DOM (IE6/7)","    support.appendChecked = input.checked;","","    fragment.removeChild( input );","    fragment.appendChild( div );","","    // Technique from Juriy Zaytsev","    // http://perfectionkills.com/detecting-event-support-without-browser-sniffing/","    // We only care about the case where non-standard event systems","    // are used, namely in IE. Short-circuiting here helps us to","    // avoid an eval call (in setAttribute) which can cause CSP","    // to go haywire. See: https://developer.mozilla.org/en/Security/CSP","    if ( div.attachEvent ) {","        for ( i in {","            submit: true,","            change: true,","            focusin: true","        }) {","            eventName = \"on\" + i;","            isSupported = ( eventName in div );","            if ( !isSupported ) {","                div.setAttribute( eventName, \"return;\" );","                isSupported = ( typeof div[ eventName ] === \"function\" );","            }","            support[ i + \"Bubbles\" ] = isSupported;","        }","    }","","    // Run tests that need a body at doc ready","    jQuery(function() {","        var container, div, tds, marginDiv,","            divReset = \"padding:0;margin:0;border:0;display:block;overflow:hidden;\",","            body = document.getElementsByTagName(\"body\")[0];","","        if ( !body ) {","            // Return for frameset docs that don't have a body","            return;","        }","","        container = document.createElement(\"div\");","        container.style.cssText = \"visibility:hidden;border:0;width:0;height:0;position:static;top:0;margin-top:1px\";","        body.insertBefore( container, body.firstChild );","","        // Construct the test element","        div = document.createElement(\"div\");","        container.appendChild( div );","","        // Check if table cells still have offsetWidth/Height when they are set","        // to display:none and there are still other visible table cells in a","        // table row; if so, offsetWidth/Height are not reliable for use when","        // determining if an element has been hidden directly using","        // display:none (it is still safe to use offsets if a parent element is","        // hidden; don safety goggles and see bug #4512 for more information).","        // (only IE 8 fails this test)","        div.innerHTML = \"<table><tr><td></td><td>t</td></tr></table>\";","        tds = div.getElementsByTagName(\"td\");","        tds[ 0 ].style.cssText = \"padding:0;margin:0;border:0;display:none\";","        isSupported = ( tds[ 0 ].offsetHeight === 0 );","","        tds[ 0 ].style.display = \"\";","        tds[ 1 ].style.display = \"none\";","","        // Check if empty table cells still have offsetWidth/Height","        // (IE <= 8 fail this test)","        support.reliableHiddenOffsets = isSupported && ( tds[ 0 ].offsetHeight === 0 );","","        // Check box-sizing and margin behavior","        div.innerHTML = \"\";","        div.style.cssText = \"box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;\";","        support.boxSizing = ( div.offsetWidth === 4 );","        support.doesNotIncludeMarginInBodyOffset = ( body.offsetTop !== 1 );","","        // NOTE: To any future maintainer, we've window.getComputedStyle","        // because jsdom on node.js will break without it.","        if ( window.getComputedStyle ) {","            support.pixelPosition = ( window.getComputedStyle( div, null ) || {} ).top !== \"1%\";","            support.boxSizingReliable = ( window.getComputedStyle( div, null ) || { width: \"4px\" } ).width === \"4px\";","","            // Check if div with explicit width and no margin-right incorrectly","            // gets computed margin-right based on width of container. For more","            // info see bug #3333","            // Fails in WebKit before Feb 2011 nightlies","            // WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right","            marginDiv = document.createElement(\"div\");","            marginDiv.style.cssText = div.style.cssText = divReset;","            marginDiv.style.marginRight = marginDiv.style.width = \"0\";","            div.style.width = \"1px\";","            div.appendChild( marginDiv );","            support.reliableMarginRight =","                !parseFloat( ( window.getComputedStyle( marginDiv, null ) || {} ).marginRight );","        }","","        if ( typeof div.style.zoom !== \"undefined\" ) {","            // Check if natively block-level elements act like inline-block","            // elements when setting their display to 'inline' and giving","            // them layout","            // (IE < 8 does this)","            div.innerHTML = \"\";","            div.style.cssText = divReset + \"width:1px;padding:1px;display:inline;zoom:1\";","            support.inlineBlockNeedsLayout = ( div.offsetWidth === 3 );","","            // Check if elements with layout shrink-wrap their children","            // (IE 6 does this)","            div.style.display = \"block\";","            div.style.overflow = \"visible\";","            div.innerHTML = \"<div></div>\";","            div.firstChild.style.width = \"5px\";","            support.shrinkWrapBlocks = ( div.offsetWidth !== 3 );","","            container.style.zoom = 1;","        }","","        // Null elements to avoid leaks in IE","        body.removeChild( container );","        container = div = tds = marginDiv = null;","    });","","    // Null elements to avoid leaks in IE","    fragment.removeChild( div );","    all = a = select = opt = input = fragment = div = null;","","    return support;","})();","var rbrace = /(?:\\{[\\s\\S]*\\}|\\[[\\s\\S]*\\])$/,","    rmultiDash = /([A-Z])/g;","","jQuery.extend({","    cache: {},","","    deletedIds: [],","","    // Remove at next major release (1.9/2.0)","    uuid: 0,","","    // Unique for each copy of jQuery on the page","    // Non-digits removed to match rinlinejQuery","    expando: \"jQuery\" + ( jQuery.fn.jquery + Math.random() ).replace( /\\D/g, \"\" ),","","    // The following elements throw uncatchable exceptions if you","    // attempt to add expando properties to them.","    noData: {","        \"embed\": true,","        // Ban all objects except for Flash (which handle expandos)","        \"object\": \"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000\",","        \"applet\": true","    },","","    hasData: function( elem ) {","        elem = elem.nodeType ? jQuery.cache[ elem[jQuery.expando] ] : elem[ jQuery.expando ];","        return !!elem && !isEmptyDataObject( elem );","    },","","    data: function( elem, name, data, pvt /* Internal Use Only */ ) {","        if ( !jQuery.acceptData( elem ) ) {","            return;","        }","","        var thisCache, ret,","            internalKey = jQuery.expando,","            getByName = typeof name === \"string\",","","            // We have to handle DOM nodes and JS objects differently because IE6-7","            // can't GC object references properly across the DOM-JS boundary","            isNode = elem.nodeType,","","            // Only DOM nodes need the global jQuery cache; JS object data is","            // attached directly to the object so GC can occur automatically","            cache = isNode ? jQuery.cache : elem,","","            // Only defining an ID for JS objects if its cache already exists allows","            // the code to shortcut on the same path as a DOM node with no cache","            id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;","","        // Avoid doing any more work than we need to when trying to get data on an","        // object that has no data at all","        if ( (!id || !cache[id] || (!pvt && !cache[id].data)) && getByName && data === undefined ) {","            return;","        }","","        if ( !id ) {","            // Only DOM nodes need a new unique ID for each element since their data","            // ends up in the global cache","            if ( isNode ) {","                elem[ internalKey ] = id = jQuery.deletedIds.pop() || jQuery.guid++;","            } else {","                id = internalKey;","            }","        }","","        if ( !cache[ id ] ) {","            cache[ id ] = {};","","            // Avoids exposing jQuery metadata on plain JS objects when the object","            // is serialized using JSON.stringify","            if ( !isNode ) {","                cache[ id ].toJSON = jQuery.noop;","            }","        }","","        // An object can be passed to jQuery.data instead of a key/value pair; this gets","        // shallow copied over onto the existing cache","        if ( typeof name === \"object\" || typeof name === \"function\" ) {","            if ( pvt ) {","                cache[ id ] = jQuery.extend( cache[ id ], name );","            } else {","                cache[ id ].data = jQuery.extend( cache[ id ].data, name );","            }","        }","","        thisCache = cache[ id ];","","        // jQuery data() is stored in a separate object inside the object's internal data","        // cache in order to avoid key collisions between internal data and user-defined","        // data.","        if ( !pvt ) {","            if ( !thisCache.data ) {","                thisCache.data = {};","            }","","            thisCache = thisCache.data;","        }","","        if ( data !== undefined ) {","            thisCache[ jQuery.camelCase( name ) ] = data;","        }","","        // Check for both converted-to-camel and non-converted data property names","        // If a data property was specified","        if ( getByName ) {","","            // First Try to find as-is property data","            ret = thisCache[ name ];","","            // Test for null|undefined property data","            if ( ret == null ) {","","                // Try to find the camelCased property","                ret = thisCache[ jQuery.camelCase( name ) ];","            }","        } else {","            ret = thisCache;","        }","","        return ret;","    },","","    removeData: function( elem, name, pvt /* Internal Use Only */ ) {","        if ( !jQuery.acceptData( elem ) ) {","            return;","        }","","        var thisCache, i, l,","","            isNode = elem.nodeType,","","            // See jQuery.data for more information","            cache = isNode ? jQuery.cache : elem,","            id = isNode ? elem[ jQuery.expando ] : jQuery.expando;","","        // If there is already no cache entry for this object, there is no","        // purpose in continuing","        if ( !cache[ id ] ) {","            return;","        }","","        if ( name ) {","","            thisCache = pvt ? cache[ id ] : cache[ id ].data;","","            if ( thisCache ) {","","                // Support array or space separated string names for data keys","                if ( !jQuery.isArray( name ) ) {","","                    // try the string as a key before any manipulation","                    if ( name in thisCache ) {","                        name = [ name ];","                    } else {","","                        // split the camel cased version by spaces unless a key with the spaces exists","                        name = jQuery.camelCase( name );","                        if ( name in thisCache ) {","                            name = [ name ];","                        } else {","                            name = name.split(\" \");","                        }","                    }","                }","","                for ( i = 0, l = name.length; i < l; i++ ) {","                    delete thisCache[ name[i] ];","                }","","                // If there is no data left in the cache, we want to continue","                // and let the cache object itself get destroyed","                if ( !( pvt ? isEmptyDataObject : jQuery.isEmptyObject )( thisCache ) ) {","                    return;","                }","            }","        }","","        // See jQuery.data for more information","        if ( !pvt ) {","            delete cache[ id ].data;","","            // Don't destroy the parent cache unless the internal data object","            // had been the only thing left in it","            if ( !isEmptyDataObject( cache[ id ] ) ) {","                return;","            }","        }","","        // Destroy the cache","        if ( isNode ) {","            jQuery.cleanData( [ elem ], true );","","        // Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)","        } else if ( jQuery.support.deleteExpando || cache != cache.window ) {","            delete cache[ id ];","","        // When all else fails, null","        } else {","            cache[ id ] = null;","        }","    },","","    // For internal use only.","    _data: function( elem, name, data ) {","        return jQuery.data( elem, name, data, true );","    },","","    // A method for determining if a DOM node can handle the data expando","    acceptData: function( elem ) {","        var noData = elem.nodeName && jQuery.noData[ elem.nodeName.toLowerCase() ];","","        // nodes accept data unless otherwise specified; rejection can be conditional","        return !noData || noData !== true && elem.getAttribute(\"classid\") === noData;","    }","});","","jQuery.fn.extend({","    data: function( key, value ) {","        var parts, part, attr, name, l,","            elem = this[0],","            i = 0,","            data = null;","","        // Gets all values","        if ( key === undefined ) {","            if ( this.length ) {","                data = jQuery.data( elem );","","                if ( elem.nodeType === 1 && !jQuery._data( elem, \"parsedAttrs\" ) ) {","                    attr = elem.attributes;","                    for ( l = attr.length; i < l; i++ ) {","                        name = attr[i].name;","","                        if ( !name.indexOf( \"data-\" ) ) {","                            name = jQuery.camelCase( name.substring(5) );","","                            dataAttr( elem, name, data[ name ] );","                        }","                    }","                    jQuery._data( elem, \"parsedAttrs\", true );","                }","            }","","            return data;","        }","","        // Sets multiple values","        if ( typeof key === \"object\" ) {","            return this.each(function() {","                jQuery.data( this, key );","            });","        }","","        parts = key.split( \".\", 2 );","        parts[1] = parts[1] ? \".\" + parts[1] : \"\";","        part = parts[1] + \"!\";","","        return jQuery.access( this, function( value ) {","","            if ( value === undefined ) {","                data = this.triggerHandler( \"getData\" + part, [ parts[0] ] );","","                // Try to fetch any internally stored data first","                if ( data === undefined && elem ) {","                    data = jQuery.data( elem, key );","                    data = dataAttr( elem, key, data );","                }","","                return data === undefined && parts[1] ?","                    this.data( parts[0] ) :","                    data;","            }","","            parts[1] = value;","            this.each(function() {","                var self = jQuery( this );","","                self.triggerHandler( \"setData\" + part, parts );","                jQuery.data( this, key, value );","                self.triggerHandler( \"changeData\" + part, parts );","            });","        }, null, value, arguments.length > 1, null, false );","    },","","    removeData: function( key ) {","        return this.each(function() {","            jQuery.removeData( this, key );","        });","    }","});","","function dataAttr( elem, key, data ) {","    // If nothing was found internally, try to fetch any","    // data from the HTML5 data-* attribute","    if ( data === undefined && elem.nodeType === 1 ) {","","        var name = \"data-\" + key.replace( rmultiDash, \"-$1\" ).toLowerCase();","","        data = elem.getAttribute( name );","","        if ( typeof data === \"string\" ) {","            try {","                data = data === \"true\" ? true :","                data === \"false\" ? false :","                data === \"null\" ? null :","                // Only convert to a number if it doesn't change the string","                +data + \"\" === data ? +data :","                rbrace.test( data ) ? jQuery.parseJSON( data ) :","                    data;","            } catch( e ) {}","","            // Make sure we set the data so it isn't changed later","            jQuery.data( elem, key, data );","","        } else {","            data = undefined;","        }","    }","","    return data;","}","","// checks a cache object for emptiness","function isEmptyDataObject( obj ) {","    var name;","    for ( name in obj ) {","","        // if the public data object is empty, the private is still empty","        if ( name === \"data\" && jQuery.isEmptyObject( obj[name] ) ) {","            continue;","        }","        if ( name !== \"toJSON\" ) {","            return false;","        }","    }","","    return true;","}","jQuery.extend({","    queue: function( elem, type, data ) {","        var queue;","","        if ( elem ) {","            type = ( type || \"fx\" ) + \"queue\";","            queue = jQuery._data( elem, type );","","            // Speed up dequeue by getting out quickly if this is just a lookup","            if ( data ) {","                if ( !queue || jQuery.isArray(data) ) {","                    queue = jQuery._data( elem, type, jQuery.makeArray(data) );","                } else {","                    queue.push( data );","                }","            }","            return queue || [];","        }","    },","","    dequeue: function( elem, type ) {","        type = type || \"fx\";","","        var queue = jQuery.queue( elem, type ),","            startLength = queue.length,","            fn = queue.shift(),","            hooks = jQuery._queueHooks( elem, type ),","            next = function() {","                jQuery.dequeue( elem, type );","            };","","        // If the fx queue is dequeued, always remove the progress sentinel","        if ( fn === \"inprogress\" ) {","            fn = queue.shift();","            startLength--;","        }","","        if ( fn ) {","","            // Add a progress sentinel to prevent the fx queue from being","            // automatically dequeued","            if ( type === \"fx\" ) {","                queue.unshift( \"inprogress\" );","            }","","            // clear up the last queue stop function","            delete hooks.stop;","            fn.call( elem, next, hooks );","        }","","        if ( !startLength && hooks ) {","            hooks.empty.fire();","        }","    },","","    // not intended for public consumption - generates a queueHooks object, or returns the current one","    _queueHooks: function( elem, type ) {","        var key = type + \"queueHooks\";","        return jQuery._data( elem, key ) || jQuery._data( elem, key, {","            empty: jQuery.Callbacks(\"once memory\").add(function() {","                jQuery.removeData( elem, type + \"queue\", true );","                jQuery.removeData( elem, key, true );","            })","        });","    }","});","","jQuery.fn.extend({","    queue: function( type, data ) {","        var setter = 2;","","        if ( typeof type !== \"string\" ) {","            data = type;","            type = \"fx\";","            setter--;","        }","","        if ( arguments.length < setter ) {","            return jQuery.queue( this[0], type );","        }","","        return data === undefined ?","            this :","            this.each(function() {","                var queue = jQuery.queue( this, type, data );","","                // ensure a hooks for this queue","                jQuery._queueHooks( this, type );","","                if ( type === \"fx\" && queue[0] !== \"inprogress\" ) {","                    jQuery.dequeue( this, type );","                }","            });","    },","    dequeue: function( type ) {","        return this.each(function() {","            jQuery.dequeue( this, type );","        });","    },","    // Based off of the plugin by Clint Helfers, with permission.","    // http://blindsignals.com/index.php/2009/07/jquery-delay/","    delay: function( time, type ) {","        time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;","        type = type || \"fx\";","","        return this.queue( type, function( next, hooks ) {","            var timeout = setTimeout( next, time );","            hooks.stop = function() {","                clearTimeout( timeout );","            };","        });","    },","    clearQueue: function( type ) {","        return this.queue( type || \"fx\", [] );","    },","    // Get a promise resolved when queues of a certain type","    // are emptied (fx is the type by default)","    promise: function( type, obj ) {","        var tmp,","            count = 1,","            defer = jQuery.Deferred(),","            elements = this,","            i = this.length,","            resolve = function() {","                if ( !( --count ) ) {","                    defer.resolveWith( elements, [ elements ] );","                }","            };","","        if ( typeof type !== \"string\" ) {","            obj = type;","            type = undefined;","        }","        type = type || \"fx\";","","        while( i-- ) {","            tmp = jQuery._data( elements[ i ], type + \"queueHooks\" );","            if ( tmp && tmp.empty ) {","                count++;","                tmp.empty.add( resolve );","            }","        }","        resolve();","        return defer.promise( obj );","    }","});","var nodeHook, boolHook, fixSpecified,","    rclass = /[\\t\\r\\n]/g,","    rreturn = /\\r/g,","    rtype = /^(?:button|input)$/i,","    rfocusable = /^(?:button|input|object|select|textarea)$/i,","    rclickable = /^a(?:rea|)$/i,","    rboolean = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,","    getSetAttribute = jQuery.support.getSetAttribute;","","jQuery.fn.extend({","    attr: function( name, value ) {","        return jQuery.access( this, jQuery.attr, name, value, arguments.length > 1 );","    },","","    removeAttr: function( name ) {","        return this.each(function() {","            jQuery.removeAttr( this, name );","        });","    },","","    prop: function( name, value ) {","        return jQuery.access( this, jQuery.prop, name, value, arguments.length > 1 );","    },","","    removeProp: function( name ) {","        name = jQuery.propFix[ name ] || name;","        return this.each(function() {","            // try/catch handles cases where IE balks (such as removing a property on window)","            try {","                this[ name ] = undefined;","                delete this[ name ];","            } catch( e ) {}","        });","    },","","    addClass: function( value ) {","        var classNames, i, l, elem,","            setClass, c, cl;","","        if ( jQuery.isFunction( value ) ) {","            return this.each(function( j ) {","                jQuery( this ).addClass( value.call(this, j, this.className) );","            });","        }","","        if ( value && typeof value === \"string\" ) {","            classNames = value.split( core_rspace );","","            for ( i = 0, l = this.length; i < l; i++ ) {","                elem = this[ i ];","","                if ( elem.nodeType === 1 ) {","                    if ( !elem.className && classNames.length === 1 ) {","                        elem.className = value;","","                    } else {","                        setClass = \" \" + elem.className + \" \";","","                        for ( c = 0, cl = classNames.length; c < cl; c++ ) {","                            if ( setClass.indexOf( \" \" + classNames[ c ] + \" \" ) < 0 ) {","                                setClass += classNames[ c ] + \" \";","                            }","                        }","                        elem.className = jQuery.trim( setClass );","                    }","                }","            }","        }","","        return this;","    },","","    removeClass: function( value ) {","        var removes, className, elem, c, cl, i, l;","","        if ( jQuery.isFunction( value ) ) {","            return this.each(function( j ) {","                jQuery( this ).removeClass( value.call(this, j, this.className) );","            });","        }","        if ( (value && typeof value === \"string\") || value === undefined ) {","            removes = ( value || \"\" ).split( core_rspace );","","            for ( i = 0, l = this.length; i < l; i++ ) {","                elem = this[ i ];","                if ( elem.nodeType === 1 && elem.className ) {","","                    className = (\" \" + elem.className + \" \").replace( rclass, \" \" );","","                    // loop over each item in the removal list","                    for ( c = 0, cl = removes.length; c < cl; c++ ) {","                        // Remove until there is nothing to remove,","                        while ( className.indexOf(\" \" + removes[ c ] + \" \") >= 0 ) {","                            className = className.replace( \" \" + removes[ c ] + \" \" , \" \" );","                        }","                    }","                    elem.className = value ? jQuery.trim( className ) : \"\";","                }","            }","        }","","        return this;","    },","","    toggleClass: function( value, stateVal ) {","        var type = typeof value,","            isBool = typeof stateVal === \"boolean\";","","        if ( jQuery.isFunction( value ) ) {","            return this.each(function( i ) {","                jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );","            });","        }","","        return this.each(function() {","            if ( type === \"string\" ) {","                // toggle individual class names","                var className,","                    i = 0,","                    self = jQuery( this ),","                    state = stateVal,","                    classNames = value.split( core_rspace );","","                while ( (className = classNames[ i++ ]) ) {","                    // check each className given, space separated list","                    state = isBool ? state : !self.hasClass( className );","                    self[ state ? \"addClass\" : \"removeClass\" ]( className );","                }","","            } else if ( type === \"undefined\" || type === \"boolean\" ) {","                if ( this.className ) {","                    // store className if set","                    jQuery._data( this, \"__className__\", this.className );","                }","","                // toggle whole className","                this.className = this.className || value === false ? \"\" : jQuery._data( this, \"__className__\" ) || \"\";","            }","        });","    },","","    hasClass: function( selector ) {","        var className = \" \" + selector + \" \",","            i = 0,","            l = this.length;","        for ( ; i < l; i++ ) {","            if ( this[i].nodeType === 1 && (\" \" + this[i].className + \" \").replace(rclass, \" \").indexOf( className ) >= 0 ) {","                return true;","            }","        }","","        return false;","    },","","    val: function( value ) {","        var hooks, ret, isFunction,","            elem = this[0];","","        if ( !arguments.length ) {","            if ( elem ) {","                hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];","","                if ( hooks && \"get\" in hooks && (ret = hooks.get( elem, \"value\" )) !== undefined ) {","                    return ret;","                }","","                ret = elem.value;","","                return typeof ret === \"string\" ?","                    // handle most common string cases","                    ret.replace(rreturn, \"\") :","                    // handle cases where value is null/undef or number","                    ret == null ? \"\" : ret;","            }","","            return;","        }","","        isFunction = jQuery.isFunction( value );","","        return this.each(function( i ) {","            var val,","                self = jQuery(this);","","            if ( this.nodeType !== 1 ) {","                return;","            }","","            if ( isFunction ) {","                val = value.call( this, i, self.val() );","            } else {","                val = value;","            }","","            // Treat null/undefined as \"\"; convert numbers to string","            if ( val == null ) {","                val = \"\";","            } else if ( typeof val === \"number\" ) {","                val += \"\";","            } else if ( jQuery.isArray( val ) ) {","                val = jQuery.map(val, function ( value ) {","                    return value == null ? \"\" : value + \"\";","                });","            }","","            hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];","","            // If set returns undefined, fall back to normal setting","            if ( !hooks || !(\"set\" in hooks) || hooks.set( this, val, \"value\" ) === undefined ) {","                this.value = val;","            }","        });","    }","});","","jQuery.extend({","    valHooks: {","        option: {","            get: function( elem ) {","                // attributes.value is undefined in Blackberry 4.7 but","                // uses .value. See #6932","                var val = elem.attributes.value;","                return !val || val.specified ? elem.value : elem.text;","            }","        },","        select: {","            get: function( elem ) {","                var value, i, max, option,","                    index = elem.selectedIndex,","                    values = [],","                    options = elem.options,","                    one = elem.type === \"select-one\";","","                // Nothing was selected","                if ( index < 0 ) {","                    return null;","                }","","                // Loop through all the selected options","                i = one ? index : 0;","                max = one ? index + 1 : options.length;","                for ( ; i < max; i++ ) {","                    option = options[ i ];","","                    // Don't return options that are disabled or in a disabled optgroup","                    if ( option.selected && (jQuery.support.optDisabled ? !option.disabled : option.getAttribute(\"disabled\") === null) &&","                            (!option.parentNode.disabled || !jQuery.nodeName( option.parentNode, \"optgroup\" )) ) {","","                        // Get the specific value for the option","                        value = jQuery( option ).val();","","                        // We don't need an array for one selects","                        if ( one ) {","                            return value;","                        }","","                        // Multi-Selects return an array","                        values.push( value );","                    }","                }","","                // Fixes Bug #2551 -- select.val() broken in IE after form.reset()","                if ( one && !values.length && options.length ) {","                    return jQuery( options[ index ] ).val();","                }","","                return values;","            },","","            set: function( elem, value ) {","                var values = jQuery.makeArray( value );","","                jQuery(elem).find(\"option\").each(function() {","                    this.selected = jQuery.inArray( jQuery(this).val(), values ) >= 0;","                });","","                if ( !values.length ) {","                    elem.selectedIndex = -1;","                }","                return values;","            }","        }","    },","","    // Unused in 1.8, left in so attrFn-stabbers won't die; remove in 1.9","    attrFn: {},","","    attr: function( elem, name, value, pass ) {","        var ret, hooks, notxml,","            nType = elem.nodeType;","","        // don't get/set attributes on text, comment and attribute nodes","        if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {","            return;","        }","","        if ( pass && jQuery.isFunction( jQuery.fn[ name ] ) ) {","            return jQuery( elem )[ name ]( value );","        }","","        // Fallback to prop when attributes are not supported","        if ( typeof elem.getAttribute === \"undefined\" ) {","            return jQuery.prop( elem, name, value );","        }","","        notxml = nType !== 1 || !jQuery.isXMLDoc( elem );","","        // All attributes are lowercase","        // Grab necessary hook if one is defined","        if ( notxml ) {","            name = name.toLowerCase();","            hooks = jQuery.attrHooks[ name ] || ( rboolean.test( name ) ? boolHook : nodeHook );","        }","","        if ( value !== undefined ) {","","            if ( value === null ) {","                jQuery.removeAttr( elem, name );","                return;","","            } else if ( hooks && \"set\" in hooks && notxml && (ret = hooks.set( elem, value, name )) !== undefined ) {","                return ret;","","            } else {","                elem.setAttribute( name, value + \"\" );","                return value;","            }","","        } else if ( hooks && \"get\" in hooks && notxml && (ret = hooks.get( elem, name )) !== null ) {","            return ret;","","        } else {","","            ret = elem.getAttribute( name );","","            // Non-existent attributes return null, we normalize to undefined","            return ret === null ?","                undefined :","                ret;","        }","    },","","    removeAttr: function( elem, value ) {","        var propName, attrNames, name, isBool,","            i = 0;","","        if ( value && elem.nodeType === 1 ) {","","            attrNames = value.split( core_rspace );","","            for ( ; i < attrNames.length; i++ ) {","                name = attrNames[ i ];","","                if ( name ) {","                    propName = jQuery.propFix[ name ] || name;","                    isBool = rboolean.test( name );","","                    // See #9699 for explanation of this approach (setting first, then removal)","                    // Do not do this for boolean attributes (see #10870)","                    if ( !isBool ) {","                        jQuery.attr( elem, name, \"\" );","                    }","                    elem.removeAttribute( getSetAttribute ? name : propName );","","                    // Set corresponding property to false for boolean attributes","                    if ( isBool && propName in elem ) {","                        elem[ propName ] = false;","                    }","                }","            }","        }","    },","","    attrHooks: {","        type: {","            set: function( elem, value ) {","                // We can't allow the type property to be changed (since it causes problems in IE)","                if ( rtype.test( elem.nodeName ) && elem.parentNode ) {","                    jQuery.error( \"type property can't be changed\" );","                } else if ( !jQuery.support.radioValue && value === \"radio\" && jQuery.nodeName(elem, \"input\") ) {","                    // Setting the type on a radio button after the value resets the value in IE6-9","                    // Reset value to it's default in case type is set after value","                    // This is for element creation","                    var val = elem.value;","                    elem.setAttribute( \"type\", value );","                    if ( val ) {","                        elem.value = val;","                    }","                    return value;","                }","            }","        },","        // Use the value property for back compat","        // Use the nodeHook for button elements in IE6/7 (#1954)","        value: {","            get: function( elem, name ) {","                if ( nodeHook && jQuery.nodeName( elem, \"button\" ) ) {","                    return nodeHook.get( elem, name );","                }","                return name in elem ?","                    elem.value :","                    null;","            },","            set: function( elem, value, name ) {","                if ( nodeHook && jQuery.nodeName( elem, \"button\" ) ) {","                    return nodeHook.set( elem, value, name );","                }","                // Does not return so that setAttribute is also used","                elem.value = value;","            }","        }","    },","","    propFix: {","        tabindex: \"tabIndex\",","        readonly: \"readOnly\",","        \"for\": \"htmlFor\",","        \"class\": \"className\",","        maxlength: \"maxLength\",","        cellspacing: \"cellSpacing\",","        cellpadding: \"cellPadding\",","        rowspan: \"rowSpan\",","        colspan: \"colSpan\",","        usemap: \"useMap\",","        frameborder: \"frameBorder\",","        contenteditable: \"contentEditable\"","    },","","    prop: function( elem, name, value ) {","        var ret, hooks, notxml,","            nType = elem.nodeType;","","        // don't get/set properties on text, comment and attribute nodes","        if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {","            return;","        }","","        notxml = nType !== 1 || !jQuery.isXMLDoc( elem );","","        if ( notxml ) {","            // Fix name and attach hooks","            name = jQuery.propFix[ name ] || name;","            hooks = jQuery.propHooks[ name ];","        }","","        if ( value !== undefined ) {","            if ( hooks && \"set\" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {","                return ret;","","            } else {","                return ( elem[ name ] = value );","            }","","        } else {","            if ( hooks && \"get\" in hooks && (ret = hooks.get( elem, name )) !== null ) {","                return ret;","","            } else {","                return elem[ name ];","            }","        }","    },","","    propHooks: {","        tabIndex: {","            get: function( elem ) {","                // elem.tabIndex doesn't always return the correct value when it hasn't been explicitly set","                // http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/","                var attributeNode = elem.getAttributeNode(\"tabindex\");","","                return attributeNode && attributeNode.specified ?","                    parseInt( attributeNode.value, 10 ) :","                    rfocusable.test( elem.nodeName ) || rclickable.test( elem.nodeName ) && elem.href ?","                        0 :","                        undefined;","            }","        }","    }","});","","// Hook for boolean attributes","boolHook = {","    get: function( elem, name ) {","        // Align boolean attributes with corresponding properties","        // Fall back to attribute presence where some booleans are not supported","        var attrNode,","            property = jQuery.prop( elem, name );","        return property === true || typeof property !== \"boolean\" && ( attrNode = elem.getAttributeNode(name) ) && attrNode.nodeValue !== false ?","            name.toLowerCase() :","            undefined;","    },","    set: function( elem, value, name ) {","        var propName;","        if ( value === false ) {","            // Remove boolean attributes when set to false","            jQuery.removeAttr( elem, name );","        } else {","            // value is true since we know at this point it's type boolean and not false","            // Set boolean attributes to the same name and set the DOM property","            propName = jQuery.propFix[ name ] || name;","            if ( propName in elem ) {","                // Only set the IDL specifically if it already exists on the element","                elem[ propName ] = true;","            }","","            elem.setAttribute( name, name.toLowerCase() );","        }","        return name;","    }","};","","// IE6/7 do not support getting/setting some attributes with get/setAttribute","if ( !getSetAttribute ) {","","    fixSpecified = {","        name: true,","        id: true,","        coords: true","    };","","    // Use this for any attribute in IE6/7","    // This fixes almost every IE6/7 issue","    nodeHook = jQuery.valHooks.button = {","        get: function( elem, name ) {","            var ret;","            ret = elem.getAttributeNode( name );","            return ret && ( fixSpecified[ name ] ? ret.value !== \"\" : ret.specified ) ?","                ret.value :","                undefined;","        },","        set: function( elem, value, name ) {","            // Set the existing or create a new attribute node","            var ret = elem.getAttributeNode( name );","            if ( !ret ) {","                ret = document.createAttribute( name );","                elem.setAttributeNode( ret );","            }","            return ( ret.value = value + \"\" );","        }","    };","","    // Set width and height to auto instead of 0 on empty string( Bug #8150 )","    // This is for removals","    jQuery.each([ \"width\", \"height\" ], function( i, name ) {","        jQuery.attrHooks[ name ] = jQuery.extend( jQuery.attrHooks[ name ], {","            set: function( elem, value ) {","                if ( value === \"\" ) {","                    elem.setAttribute( name, \"auto\" );","                    return value;","                }","            }","        });","    });","","    // Set contenteditable to false on removals(#10429)","    // Setting to empty string throws an error as an invalid value","    jQuery.attrHooks.contenteditable = {","        get: nodeHook.get,","        set: function( elem, value, name ) {","            if ( value === \"\" ) {","                value = \"false\";","            }","            nodeHook.set( elem, value, name );","        }","    };","}","","","// Some attributes require a special call on IE","if ( !jQuery.support.hrefNormalized ) {","    jQuery.each([ \"href\", \"src\", \"width\", \"height\" ], function( i, name ) {","        jQuery.attrHooks[ name ] = jQuery.extend( jQuery.attrHooks[ name ], {","            get: function( elem ) {","                var ret = elem.getAttribute( name, 2 );","                return ret === null ? undefined : ret;","            }","        });","    });","}","","if ( !jQuery.support.style ) {","    jQuery.attrHooks.style = {","        get: function( elem ) {","            // Return undefined in the case of empty string","            // Normalize to lowercase since IE uppercases css property names","            return elem.style.cssText.toLowerCase() || undefined;","        },","        set: function( elem, value ) {","            return ( elem.style.cssText = value + \"\" );","        }","    };","}","","// Safari mis-reports the default selected property of an option","// Accessing the parent's selectedIndex property fixes it","if ( !jQuery.support.optSelected ) {","    jQuery.propHooks.selected = jQuery.extend( jQuery.propHooks.selected, {","        get: function( elem ) {","            var parent = elem.parentNode;","","            if ( parent ) {","                parent.selectedIndex;","","                // Make sure that it also works with optgroups, see #5701","                if ( parent.parentNode ) {","                    parent.parentNode.selectedIndex;","                }","            }","            return null;","        }","    });","}","","// IE6/7 call enctype encoding","if ( !jQuery.support.enctype ) {","    jQuery.propFix.enctype = \"encoding\";","}","","// Radios and checkboxes getter/setter","if ( !jQuery.support.checkOn ) {","    jQuery.each([ \"radio\", \"checkbox\" ], function() {","        jQuery.valHooks[ this ] = {","            get: function( elem ) {","                // Handle the case where in Webkit \"\" is returned instead of \"on\" if a value isn't specified","                return elem.getAttribute(\"value\") === null ? \"on\" : elem.value;","            }","        };","    });","}","jQuery.each([ \"radio\", \"checkbox\" ], function() {","    jQuery.valHooks[ this ] = jQuery.extend( jQuery.valHooks[ this ], {","        set: function( elem, value ) {","            if ( jQuery.isArray( value ) ) {","                return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );","            }","        }","    });","});","var rformElems = /^(?:textarea|input|select)$/i,","    rtypenamespace = /^([^\\.]*|)(?:\\.(.+)|)$/,","    rhoverHack = /(?:^|\\s)hover(\\.\\S+|)\\b/,","    rkeyEvent = /^key/,","    rmouseEvent = /^(?:mouse|contextmenu)|click/,","    rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,","    hoverHack = function( events ) {","        return jQuery.event.special.hover ? events : events.replace( rhoverHack, \"mouseenter$1 mouseleave$1\" );","    };","","/*"," * Helper functions for managing events -- not part of the public interface."," * Props to Dean Edwards' addEvent library for many of the ideas."," */","jQuery.event = {","","    add: function( elem, types, handler, data, selector ) {","","        var elemData, eventHandle, events,","            t, tns, type, namespaces, handleObj,","            handleObjIn, handlers, special;","","        // Don't attach events to noData or text/comment nodes (allow plain objects tho)","        if ( elem.nodeType === 3 || elem.nodeType === 8 || !types || !handler || !(elemData = jQuery._data( elem )) ) {","            return;","        }","","        // Caller can pass in an object of custom data in lieu of the handler","        if ( handler.handler ) {","            handleObjIn = handler;","            handler = handleObjIn.handler;","            selector = handleObjIn.selector;","        }","","        // Make sure that the handler has a unique ID, used to find/remove it later","        if ( !handler.guid ) {","            handler.guid = jQuery.guid++;","        }","","        // Init the element's event structure and main handler, if this is the first","        events = elemData.events;","        if ( !events ) {","            elemData.events = events = {};","        }","        eventHandle = elemData.handle;","        if ( !eventHandle ) {","            elemData.handle = eventHandle = function( e ) {","                // Discard the second event of a jQuery.event.trigger() and","                // when an event is called after a page has unloaded","                return typeof jQuery !== \"undefined\" && (!e || jQuery.event.triggered !== e.type) ?","                    jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :","                    undefined;","            };","            // Add elem as a property of the handle fn to prevent a memory leak with IE non-native events","            eventHandle.elem = elem;","        }","","        // Handle multiple events separated by a space","        // jQuery(...).bind(\"mouseover mouseout\", fn);","        types = jQuery.trim( hoverHack(types) ).split( \" \" );","        for ( t = 0; t < types.length; t++ ) {","","            tns = rtypenamespace.exec( types[t] ) || [];","            type = tns[1];","            namespaces = ( tns[2] || \"\" ).split( \".\" ).sort();","","            // If event changes its type, use the special event handlers for the changed type","            special = jQuery.event.special[ type ] || {};","","            // If selector defined, determine special event api type, otherwise given type","            type = ( selector ? special.delegateType : special.bindType ) || type;","","            // Update special based on newly reset type","            special = jQuery.event.special[ type ] || {};","","            // handleObj is passed to all event handlers","            handleObj = jQuery.extend({","                type: type,","                origType: tns[1],","                data: data,","                handler: handler,","                guid: handler.guid,","                selector: selector,","                needsContext: selector && jQuery.expr.match.needsContext.test( selector ),","                namespace: namespaces.join(\".\")","            }, handleObjIn );","","            // Init the event handler queue if we're the first","            handlers = events[ type ];","            if ( !handlers ) {","                handlers = events[ type ] = [];","                handlers.delegateCount = 0;","","                // Only use addEventListener/attachEvent if the special events handler returns false","                if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {","                    // Bind the global event handler to the element","                    if ( elem.addEventListener ) {","                        elem.addEventListener( type, eventHandle, false );","","                    } else if ( elem.attachEvent ) {","                        elem.attachEvent( \"on\" + type, eventHandle );","                    }","                }","            }","","            if ( special.add ) {","                special.add.call( elem, handleObj );","","                if ( !handleObj.handler.guid ) {","                    handleObj.handler.guid = handler.guid;","                }","            }","","            // Add to the element's handler list, delegates in front","            if ( selector ) {","                handlers.splice( handlers.delegateCount++, 0, handleObj );","            } else {","                handlers.push( handleObj );","            }","","            // Keep track of which events have ever been used, for event optimization","            jQuery.event.global[ type ] = true;","        }","","        // Nullify elem to prevent memory leaks in IE","        elem = null;","    },","","    global: {},","","    // Detach an event or set of events from an element","    remove: function( elem, types, handler, selector, mappedTypes ) {","","        var t, tns, type, origType, namespaces, origCount,","            j, events, special, eventType, handleObj,","            elemData = jQuery.hasData( elem ) && jQuery._data( elem );","","        if ( !elemData || !(events = elemData.events) ) {","            return;","        }","","        // Once for each type.namespace in types; type may be omitted","        types = jQuery.trim( hoverHack( types || \"\" ) ).split(\" \");","        for ( t = 0; t < types.length; t++ ) {","            tns = rtypenamespace.exec( types[t] ) || [];","            type = origType = tns[1];","            namespaces = tns[2];","","            // Unbind all events (on this namespace, if provided) for the element","            if ( !type ) {","                for ( type in events ) {","                    jQuery.event.remove( elem, type + types[ t ], handler, selector, true );","                }","                continue;","            }","","            special = jQuery.event.special[ type ] || {};","            type = ( selector? special.delegateType : special.bindType ) || type;","            eventType = events[ type ] || [];","            origCount = eventType.length;","            namespaces = namespaces ? new RegExp(\"(^|\\\\.)\" + namespaces.split(\".\").sort().join(\"\\\\.(?:.*\\\\.|)\") + \"(\\\\.|$)\") : null;","","            // Remove matching events","            for ( j = 0; j < eventType.length; j++ ) {","                handleObj = eventType[ j ];","","                if ( ( mappedTypes || origType === handleObj.origType ) &&","                     ( !handler || handler.guid === handleObj.guid ) &&","                     ( !namespaces || namespaces.test( handleObj.namespace ) ) &&","                     ( !selector || selector === handleObj.selector || selector === \"**\" && handleObj.selector ) ) {","                    eventType.splice( j--, 1 );","","                    if ( handleObj.selector ) {","                        eventType.delegateCount--;","                    }","                    if ( special.remove ) {","                        special.remove.call( elem, handleObj );","                    }","                }","            }","","            // Remove generic event handler if we removed something and no more handlers exist","            // (avoids potential for endless recursion during removal of special event handlers)","            if ( eventType.length === 0 && origCount !== eventType.length ) {","                if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {","                    jQuery.removeEvent( elem, type, elemData.handle );","                }","","                delete events[ type ];","            }","        }","","        // Remove the expando if it's no longer used","        if ( jQuery.isEmptyObject( events ) ) {","            delete elemData.handle;","","            // removeData also checks for emptiness and clears the expando if empty","            // so use it instead of delete","            jQuery.removeData( elem, \"events\", true );","        }","    },","","    // Events that are safe to short-circuit if no handlers are attached.","    // Native DOM events should not be added, they may have inline handlers.","    customEvent: {","        \"getData\": true,","        \"setData\": true,","        \"changeData\": true","    },","","    trigger: function( event, data, elem, onlyHandlers ) {","        // Don't do events on text and comment nodes","        if ( elem && (elem.nodeType === 3 || elem.nodeType === 8) ) {","            return;","        }","","        // Event object or event type","        var cache, exclusive, i, cur, old, ontype, special, handle, eventPath, bubbleType,","            type = event.type || event,","            namespaces = [];","","        // focus/blur morphs to focusin/out; ensure we're not firing them right now","        if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {","            return;","        }","","        if ( type.indexOf( \"!\" ) >= 0 ) {","            // Exclusive events trigger only for the exact event (no namespaces)","            type = type.slice(0, -1);","            exclusive = true;","        }","","        if ( type.indexOf( \".\" ) >= 0 ) {","            // Namespaced trigger; create a regexp to match event type in handle()","            namespaces = type.split(\".\");","            type = namespaces.shift();","            namespaces.sort();","        }","","        if ( (!elem || jQuery.event.customEvent[ type ]) && !jQuery.event.global[ type ] ) {","            // No jQuery handlers for this event type, and it can't have inline handlers","            return;","        }","","        // Caller can pass in an Event, Object, or just an event type string","        event = typeof event === \"object\" ?","            // jQuery.Event object","            event[ jQuery.expando ] ? event :","            // Object literal","            new jQuery.Event( type, event ) :","            // Just the event type (string)","            new jQuery.Event( type );","","        event.type = type;","        event.isTrigger = true;","        event.exclusive = exclusive;","        event.namespace = namespaces.join( \".\" );","        event.namespace_re = event.namespace? new RegExp(\"(^|\\\\.)\" + namespaces.join(\"\\\\.(?:.*\\\\.|)\") + \"(\\\\.|$)\") : null;","        ontype = type.indexOf( \":\" ) < 0 ? \"on\" + type : \"\";","","        // Handle a global trigger","        if ( !elem ) {","","            // TODO: Stop taunting the data cache; remove global events and always attach to document","            cache = jQuery.cache;","            for ( i in cache ) {","                if ( cache[ i ].events && cache[ i ].events[ type ] ) {","                    jQuery.event.trigger( event, data, cache[ i ].handle.elem, true );","                }","            }","            return;","        }","","        // Clean up the event in case it is being reused","        event.result = undefined;","        if ( !event.target ) {","            event.target = elem;","        }","","        // Clone any incoming data and prepend the event, creating the handler arg list","        data = data != null ? jQuery.makeArray( data ) : [];","        data.unshift( event );","","        // Allow special events to draw outside the lines","        special = jQuery.event.special[ type ] || {};","        if ( special.trigger && special.trigger.apply( elem, data ) === false ) {","            return;","        }","","        // Determine event propagation path in advance, per W3C events spec (#9951)","        // Bubble up to document, then to window; watch for a global ownerDocument var (#9724)","        eventPath = [[ elem, special.bindType || type ]];","        if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {","","            bubbleType = special.delegateType || type;","            cur = rfocusMorph.test( bubbleType + type ) ? elem : elem.parentNode;","            for ( old = elem; cur; cur = cur.parentNode ) {","                eventPath.push([ cur, bubbleType ]);","                old = cur;","            }","","            // Only add window if we got to document (e.g., not plain obj or detached DOM)","            if ( old === (elem.ownerDocument || document) ) {","                eventPath.push([ old.defaultView || old.parentWindow || window, bubbleType ]);","            }","        }","","        // Fire handlers on the event path","        for ( i = 0; i < eventPath.length && !event.isPropagationStopped(); i++ ) {","","            cur = eventPath[i][0];","            event.type = eventPath[i][1];","","            handle = ( jQuery._data( cur, \"events\" ) || {} )[ event.type ] && jQuery._data( cur, \"handle\" );","            if ( handle ) {","                handle.apply( cur, data );","            }","            // Note that this is a bare JS function and not a jQuery handler","            handle = ontype && cur[ ontype ];","            if ( handle && jQuery.acceptData( cur ) && handle.apply && handle.apply( cur, data ) === false ) {","                event.preventDefault();","            }","        }","        event.type = type;","","        // If nobody prevented the default action, do it now","        if ( !onlyHandlers && !event.isDefaultPrevented() ) {","","            if ( (!special._default || special._default.apply( elem.ownerDocument, data ) === false) &&","                !(type === \"click\" && jQuery.nodeName( elem, \"a\" )) && jQuery.acceptData( elem ) ) {","","                // Call a native DOM method on the target with the same name name as the event.","                // Can't use an .isFunction() check here because IE6/7 fails that test.","                // Don't do default actions on window, that's where global variables be (#6170)","                // IE<9 dies on focus/blur to hidden element (#1486)","                if ( ontype && elem[ type ] && ((type !== \"focus\" && type !== \"blur\") || event.target.offsetWidth !== 0) && !jQuery.isWindow( elem ) ) {","","                    // Don't re-trigger an onFOO event when we call its FOO() method","                    old = elem[ ontype ];","","                    if ( old ) {","                        elem[ ontype ] = null;","                    }","","                    // Prevent re-triggering of the same event, since we already bubbled it above","                    jQuery.event.triggered = type;","                    elem[ type ]();","                    jQuery.event.triggered = undefined;","","                    if ( old ) {","                        elem[ ontype ] = old;","                    }","                }","            }","        }","","        return event.result;","    },","","    dispatch: function( event ) {","","        // Make a writable jQuery.Event from the native event object","        event = jQuery.event.fix( event || window.event );","","        var i, j, cur, ret, selMatch, matched, matches, handleObj, sel, related,","            handlers = ( (jQuery._data( this, \"events\" ) || {} )[ event.type ] || []),","            delegateCount = handlers.delegateCount,","            args = core_slice.call( arguments ),","            run_all = !event.exclusive && !event.namespace,","            special = jQuery.event.special[ event.type ] || {},","            handlerQueue = [];","","        // Use the fix-ed jQuery.Event rather than the (read-only) native event","        args[0] = event;","        event.delegateTarget = this;","","        // Call the preDispatch hook for the mapped type, and let it bail if desired","        if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {","            return;","        }","","        // Determine handlers that should run if there are delegated events","        // Avoid non-left-click bubbling in Firefox (#3861)","        if ( delegateCount && !(event.button && event.type === \"click\") ) {","","            for ( cur = event.target; cur != this; cur = cur.parentNode || this ) {","","                // Don't process clicks (ONLY) on disabled elements (#6911, #8165, #11382, #11764)","                if ( cur.disabled !== true || event.type !== \"click\" ) {","                    selMatch = {};","                    matches = [];","                    for ( i = 0; i < delegateCount; i++ ) {","                        handleObj = handlers[ i ];","                        sel = handleObj.selector;","","                        if ( selMatch[ sel ] === undefined ) {","                            selMatch[ sel ] = handleObj.needsContext ?","                                jQuery( sel, this ).index( cur ) >= 0 :","                                jQuery.find( sel, this, null, [ cur ] ).length;","                        }","                        if ( selMatch[ sel ] ) {","                            matches.push( handleObj );","                        }","                    }","                    if ( matches.length ) {","                        handlerQueue.push({ elem: cur, matches: matches });","                    }","                }","            }","        }","","        // Add the remaining (directly-bound) handlers","        if ( handlers.length > delegateCount ) {","            handlerQueue.push({ elem: this, matches: handlers.slice( delegateCount ) });","        }","","        // Run delegates first; they may want to stop propagation beneath us","        for ( i = 0; i < handlerQueue.length && !event.isPropagationStopped(); i++ ) {","            matched = handlerQueue[ i ];","            event.currentTarget = matched.elem;","","            for ( j = 0; j < matched.matches.length && !event.isImmediatePropagationStopped(); j++ ) {","                handleObj = matched.matches[ j ];","","                // Triggered event must either 1) be non-exclusive and have no namespace, or","                // 2) have namespace(s) a subset or equal to those in the bound event (both can have no namespace).","                if ( run_all || (!event.namespace && !handleObj.namespace) || event.namespace_re && event.namespace_re.test( handleObj.namespace ) ) {","","                    event.data = handleObj.data;","                    event.handleObj = handleObj;","","                    ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )","                            .apply( matched.elem, args );","","                    if ( ret !== undefined ) {","                        event.result = ret;","                        if ( ret === false ) {","                            event.preventDefault();","                            event.stopPropagation();","                        }","                    }","                }","            }","        }","","        // Call the postDispatch hook for the mapped type","        if ( special.postDispatch ) {","            special.postDispatch.call( this, event );","        }","","        return event.result;","    },","","    // Includes some event props shared by KeyEvent and MouseEvent","    // *** attrChange attrName relatedNode srcElement  are not normalized, non-W3C, deprecated, will be removed in 1.8 ***","    props: \"attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which\".split(\" \"),","","    fixHooks: {},","","    keyHooks: {","        props: \"char charCode key keyCode\".split(\" \"),","        filter: function( event, original ) {","","            // Add which for key events","            if ( event.which == null ) {","                event.which = original.charCode != null ? original.charCode : original.keyCode;","            }","","            return event;","        }","    },","","    mouseHooks: {","        props: \"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement\".split(\" \"),","        filter: function( event, original ) {","            var eventDoc, doc, body,","                button = original.button,","                fromElement = original.fromElement;","","            // Calculate pageX/Y if missing and clientX/Y available","            if ( event.pageX == null && original.clientX != null ) {","                eventDoc = event.target.ownerDocument || document;","                doc = eventDoc.documentElement;","                body = eventDoc.body;","","                event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );","                event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );","            }","","            // Add relatedTarget, if necessary","            if ( !event.relatedTarget && fromElement ) {","                event.relatedTarget = fromElement === event.target ? original.toElement : fromElement;","            }","","            // Add which for click: 1 === left; 2 === middle; 3 === right","            // Note: button is not normalized, so don't use it","            if ( !event.which && button !== undefined ) {","                event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );","            }","","            return event;","        }","    },","","    fix: function( event ) {","        if ( event[ jQuery.expando ] ) {","            return event;","        }","","        // Create a writable copy of the event object and normalize some properties","        var i, prop,","            originalEvent = event,","            fixHook = jQuery.event.fixHooks[ event.type ] || {},","            copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;","","        event = jQuery.Event( originalEvent );","","        for ( i = copy.length; i; ) {","            prop = copy[ --i ];","            event[ prop ] = originalEvent[ prop ];","        }","","        // Fix target property, if necessary (#1925, IE 6/7/8 & Safari2)","        if ( !event.target ) {","            event.target = originalEvent.srcElement || document;","        }","","        // Target should not be a text node (#504, Safari)","        if ( event.target.nodeType === 3 ) {","            event.target = event.target.parentNode;","        }","","        // For mouse/key events, metaKey==false if it's undefined (#3368, #11328; IE6/7/8)","        event.metaKey = !!event.metaKey;","","        return fixHook.filter? fixHook.filter( event, originalEvent ) : event;","    },","","    special: {","        load: {","            // Prevent triggered image.load events from bubbling to window.load","            noBubble: true","        },","","        focus: {","            delegateType: \"focusin\"","        },","        blur: {","            delegateType: \"focusout\"","        },","","        beforeunload: {","            setup: function( data, namespaces, eventHandle ) {","                // We only want to do this special case on windows","                if ( jQuery.isWindow( this ) ) {","                    this.onbeforeunload = eventHandle;","                }","            },","","            teardown: function( namespaces, eventHandle ) {","                if ( this.onbeforeunload === eventHandle ) {","                    this.onbeforeunload = null;","                }","            }","        }","    },","","    simulate: function( type, elem, event, bubble ) {","        // Piggyback on a donor event to simulate a different one.","        // Fake originalEvent to avoid donor's stopPropagation, but if the","        // simulated event prevents default then we do the same on the donor.","        var e = jQuery.extend(","            new jQuery.Event(),","            event,","            { type: type,","                isSimulated: true,","                originalEvent: {}","            }","        );","        if ( bubble ) {","            jQuery.event.trigger( e, null, elem );","        } else {","            jQuery.event.dispatch.call( elem, e );","        }","        if ( e.isDefaultPrevented() ) {","            event.preventDefault();","        }","    }","};","","// Some plugins are using, but it's undocumented/deprecated and will be removed.","// The 1.7 special event interface should provide all the hooks needed now.","jQuery.event.handle = jQuery.event.dispatch;","","jQuery.removeEvent = document.removeEventListener ?","    function( elem, type, handle ) {","        if ( elem.removeEventListener ) {","            elem.removeEventListener( type, handle, false );","        }","    } :","    function( elem, type, handle ) {","        var name = \"on\" + type;","","        if ( elem.detachEvent ) {","","            // #8545, #7054, preventing memory leaks for custom events in IE6-8 –","            // detachEvent needed property on element, by name of that event, to properly expose it to GC","            if ( typeof elem[ name ] === \"undefined\" ) {","                elem[ name ] = null;","            }","","            elem.detachEvent( name, handle );","        }","    };","","jQuery.Event = function( src, props ) {","    // Allow instantiation without the 'new' keyword","    if ( !(this instanceof jQuery.Event) ) {","        return new jQuery.Event( src, props );","    }","","    // Event object","    if ( src && src.type ) {","        this.originalEvent = src;","        this.type = src.type;","","        // Events bubbling up the document may have been marked as prevented","        // by a handler lower down the tree; reflect the correct value.","        this.isDefaultPrevented = ( src.defaultPrevented || src.returnValue === false ||","            src.getPreventDefault && src.getPreventDefault() ) ? returnTrue : returnFalse;","","    // Event type","    } else {","        this.type = src;","    }","","    // Put explicitly provided properties onto the event object","    if ( props ) {","        jQuery.extend( this, props );","    }","","    // Create a timestamp if incoming event doesn't have one","    this.timeStamp = src && src.timeStamp || jQuery.now();","","    // Mark it as fixed","    this[ jQuery.expando ] = true;","};","","function returnFalse() {","    return false;","}","function returnTrue() {","    return true;","}","","// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding","// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html","jQuery.Event.prototype = {","    preventDefault: function() {","        this.isDefaultPrevented = returnTrue;","","        var e = this.originalEvent;","        if ( !e ) {","            return;","        }","","        // if preventDefault exists run it on the original event","        if ( e.preventDefault ) {","            e.preventDefault();","","        // otherwise set the returnValue property of the original event to false (IE)","        } else {","            e.returnValue = false;","        }","    },","    stopPropagation: function() {","        this.isPropagationStopped = returnTrue;","","        var e = this.originalEvent;","        if ( !e ) {","            return;","        }","        // if stopPropagation exists run it on the original event","        if ( e.stopPropagation ) {","            e.stopPropagation();","        }","        // otherwise set the cancelBubble property of the original event to true (IE)","        e.cancelBubble = true;","    },","    stopImmediatePropagation: function() {","        this.isImmediatePropagationStopped = returnTrue;","        this.stopPropagation();","    },","    isDefaultPrevented: returnFalse,","    isPropagationStopped: returnFalse,","    isImmediatePropagationStopped: returnFalse","};","","// Create mouseenter/leave events using mouseover/out and event-time checks","jQuery.each({","    mouseenter: \"mouseover\",","    mouseleave: \"mouseout\"","}, function( orig, fix ) {","    jQuery.event.special[ orig ] = {","        delegateType: fix,","        bindType: fix,","","        handle: function( event ) {","            var ret,","                target = this,","                related = event.relatedTarget,","                handleObj = event.handleObj,","                selector = handleObj.selector;","","            // For mousenter/leave call the handler if related is outside the target.","            // NB: No relatedTarget if the mouse left/entered the browser window","            if ( !related || (related !== target && !jQuery.contains( target, related )) ) {","                event.type = handleObj.origType;","                ret = handleObj.handler.apply( this, arguments );","                event.type = fix;","            }","            return ret;","        }","    };","});","","// IE submit delegation","if ( !jQuery.support.submitBubbles ) {","","    jQuery.event.special.submit = {","        setup: function() {","            // Only need this for delegated form submit events","            if ( jQuery.nodeName( this, \"form\" ) ) {","                return false;","            }","","            // Lazy-add a submit handler when a descendant form may potentially be submitted","            jQuery.event.add( this, \"click._submit keypress._submit\", function( e ) {","                // Node name check avoids a VML-related crash in IE (#9807)","                var elem = e.target,","                    form = jQuery.nodeName( elem, \"input\" ) || jQuery.nodeName( elem, \"button\" ) ? elem.form : undefined;","                if ( form && !jQuery._data( form, \"_submit_attached\" ) ) {","                    jQuery.event.add( form, \"submit._submit\", function( event ) {","                        event._submit_bubble = true;","                    });","                    jQuery._data( form, \"_submit_attached\", true );","                }","            });","            // return undefined since we don't need an event listener","        },","","        postDispatch: function( event ) {","            // If form was submitted by the user, bubble the event up the tree","            if ( event._submit_bubble ) {","                delete event._submit_bubble;","                if ( this.parentNode && !event.isTrigger ) {","                    jQuery.event.simulate( \"submit\", this.parentNode, event, true );","                }","            }","        },","","        teardown: function() {","            // Only need this for delegated form submit events","            if ( jQuery.nodeName( this, \"form\" ) ) {","                return false;","            }","","            // Remove delegated handlers; cleanData eventually reaps submit handlers attached above","            jQuery.event.remove( this, \"._submit\" );","        }","    };","}","","// IE change delegation and checkbox/radio fix","if ( !jQuery.support.changeBubbles ) {","","    jQuery.event.special.change = {","","        setup: function() {","","            if ( rformElems.test( this.nodeName ) ) {","                // IE doesn't fire change on a check/radio until blur; trigger it on click","                // after a propertychange. Eat the blur-change in special.change.handle.","                // This still fires onchange a second time for check/radio after blur.","                if ( this.type === \"checkbox\" || this.type === \"radio\" ) {","                    jQuery.event.add( this, \"propertychange._change\", function( event ) {","                        if ( event.originalEvent.propertyName === \"checked\" ) {","                            this._just_changed = true;","                        }","                    });","                    jQuery.event.add( this, \"click._change\", function( event ) {","                        if ( this._just_changed && !event.isTrigger ) {","                            this._just_changed = false;","                        }","                        // Allow triggered, simulated change events (#11500)","                        jQuery.event.simulate( \"change\", this, event, true );","                    });","                }","                return false;","            }","            // Delegated event; lazy-add a change handler on descendant inputs","            jQuery.event.add( this, \"beforeactivate._change\", function( e ) {","                var elem = e.target;","","                if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, \"_change_attached\" ) ) {","                    jQuery.event.add( elem, \"change._change\", function( event ) {","                        if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {","                            jQuery.event.simulate( \"change\", this.parentNode, event, true );","                        }","                    });","                    jQuery._data( elem, \"_change_attached\", true );","                }","            });","        },","","        handle: function( event ) {","            var elem = event.target;","","            // Swallow native change events from checkbox/radio, we already triggered them above","            if ( this !== elem || event.isSimulated || event.isTrigger || (elem.type !== \"radio\" && elem.type !== \"checkbox\") ) {","                return event.handleObj.handler.apply( this, arguments );","            }","        },","","        teardown: function() {","            jQuery.event.remove( this, \"._change\" );","","            return !rformElems.test( this.nodeName );","        }","    };","}","","// Create \"bubbling\" focus and blur events","if ( !jQuery.support.focusinBubbles ) {","    jQuery.each({ focus: \"focusin\", blur: \"focusout\" }, function( orig, fix ) {","","        // Attach a single capturing handler while someone wants focusin/focusout","        var attaches = 0,","            handler = function( event ) {","                jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );","            };","","        jQuery.event.special[ fix ] = {","            setup: function() {","                if ( attaches++ === 0 ) {","                    document.addEventListener( orig, handler, true );","                }","            },","            teardown: function() {","                if ( --attaches === 0 ) {","                    document.removeEventListener( orig, handler, true );","                }","            }","        };","    });","}","","jQuery.fn.extend({","","    on: function( types, selector, data, fn, /*INTERNAL*/ one ) {","        var origFn, type;","","        // Types can be a map of types/handlers","        if ( typeof types === \"object\" ) {","            // ( types-Object, selector, data )","            if ( typeof selector !== \"string\" ) { // && selector != null","                // ( types-Object, data )","                data = data || selector;","                selector = undefined;","            }","            for ( type in types ) {","                this.on( type, selector, data, types[ type ], one );","            }","            return this;","        }","","        if ( data == null && fn == null ) {","            // ( types, fn )","            fn = selector;","            data = selector = undefined;","        } else if ( fn == null ) {","            if ( typeof selector === \"string\" ) {","                // ( types, selector, fn )","                fn = data;","                data = undefined;","            } else {","                // ( types, data, fn )","                fn = data;","                data = selector;","                selector = undefined;","            }","        }","        if ( fn === false ) {","            fn = returnFalse;","        } else if ( !fn ) {","            return this;","        }","","        if ( one === 1 ) {","            origFn = fn;","            fn = function( event ) {","                // Can use an empty set, since event contains the info","                jQuery().off( event );","                return origFn.apply( this, arguments );","            };","            // Use same guid so caller can remove using origFn","            fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );","        }","        return this.each( function() {","            jQuery.event.add( this, types, fn, data, selector );","        });","    },","    one: function( types, selector, data, fn ) {","        return this.on( types, selector, data, fn, 1 );","    },","    off: function( types, selector, fn ) {","        var handleObj, type;","        if ( types && types.preventDefault && types.handleObj ) {","            // ( event )  dispatched jQuery.Event","            handleObj = types.handleObj;","            jQuery( types.delegateTarget ).off(","                handleObj.namespace ? handleObj.origType + \".\" + handleObj.namespace : handleObj.origType,","                handleObj.selector,","                handleObj.handler","            );","            return this;","        }","        if ( typeof types === \"object\" ) {","            // ( types-object [, selector] )","            for ( type in types ) {","                this.off( type, selector, types[ type ] );","            }","            return this;","        }","        if ( selector === false || typeof selector === \"function\" ) {","            // ( types [, fn] )","            fn = selector;","            selector = undefined;","        }","        if ( fn === false ) {","            fn = returnFalse;","        }","        return this.each(function() {","            jQuery.event.remove( this, types, fn, selector );","        });","    },","","    bind: function( types, data, fn ) {","        return this.on( types, null, data, fn );","    },","    unbind: function( types, fn ) {","        return this.off( types, null, fn );","    },","","    live: function( types, data, fn ) {","        jQuery( this.context ).on( types, this.selector, data, fn );","        return this;","    },","    die: function( types, fn ) {","        jQuery( this.context ).off( types, this.selector || \"**\", fn );","        return this;","    },","","    delegate: function( selector, types, data, fn ) {","        return this.on( types, selector, data, fn );","    },","    undelegate: function( selector, types, fn ) {","        // ( namespace ) or ( selector, types [, fn] )","        return arguments.length === 1 ? this.off( selector, \"**\" ) : this.off( types, selector || \"**\", fn );","    },","","    trigger: function( type, data ) {","        return this.each(function() {","            jQuery.event.trigger( type, data, this );","        });","    },","    triggerHandler: function( type, data ) {","        if ( this[0] ) {","            return jQuery.event.trigger( type, data, this[0], true );","        }","    },","","    toggle: function( fn ) {","        // Save reference to arguments for access in closure","        var args = arguments,","            guid = fn.guid || jQuery.guid++,","            i = 0,","            toggler = function( event ) {","                // Figure out which function to execute","                var lastToggle = ( jQuery._data( this, \"lastToggle\" + fn.guid ) || 0 ) % i;","                jQuery._data( this, \"lastToggle\" + fn.guid, lastToggle + 1 );","","                // Make sure that clicks stop","                event.preventDefault();","","                // and execute the function","                return args[ lastToggle ].apply( this, arguments ) || false;","            };","","        // link all the functions, so any of them can unbind this click handler","        toggler.guid = guid;","        while ( i < args.length ) {","            args[ i++ ].guid = guid;","        }","","        return this.click( toggler );","    },","","    hover: function( fnOver, fnOut ) {","        return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );","    }","});","","jQuery.each( (\"blur focus focusin focusout load resize scroll unload click dblclick \" +","    \"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave \" +","    \"change select submit keydown keypress keyup error contextmenu\").split(\" \"), function( i, name ) {","","    // Handle event binding","    jQuery.fn[ name ] = function( data, fn ) {","        if ( fn == null ) {","            fn = data;","            data = null;","        }","","        return arguments.length > 0 ?","            this.on( name, null, data, fn ) :","            this.trigger( name );","    };","","    if ( rkeyEvent.test( name ) ) {","        jQuery.event.fixHooks[ name ] = jQuery.event.keyHooks;","    }","","    if ( rmouseEvent.test( name ) ) {","        jQuery.event.fixHooks[ name ] = jQuery.event.mouseHooks;","    }","});","/*!"," * Sizzle CSS Selector Engine"," * Copyright 2012 jQuery Foundation and other contributors"," * Released under the MIT license"," * http://sizzlejs.com/"," */","(function( window, undefined ) {","","var cachedruns,","    assertGetIdNotName,","    Expr,","    getText,","    isXML,","    contains,","    compile,","    sortOrder,","    hasDuplicate,","    outermostContext,","","    baseHasDuplicate = true,","    strundefined = \"undefined\",","","    expando = ( \"sizcache\" + Math.random() ).replace( \".\", \"\" ),","","    Token = String,","    document = window.document,","    docElem = document.documentElement,","    dirruns = 0,","    done = 0,","    pop = [].pop,","    push = [].push,","    slice = [].slice,","    // Use a stripped-down indexOf if a native one is unavailable","    indexOf = [].indexOf || function( elem ) {","        var i = 0,","            len = this.length;","        for ( ; i < len; i++ ) {","            if ( this[i] === elem ) {","                return i;","            }","        }","        return -1;","    },","","    // Augment a function for special use by Sizzle","    markFunction = function( fn, value ) {","        fn[ expando ] = value == null || value;","        return fn;","    },","","    createCache = function() {","        var cache = {},","            keys = [];","","        return markFunction(function( key, value ) {","            // Only keep the most recent entries","            if ( keys.push( key ) > Expr.cacheLength ) {","                delete cache[ keys.shift() ];","            }","","            return (cache[ key ] = value);","        }, cache );","    },","","    classCache = createCache(),","    tokenCache = createCache(),","    compilerCache = createCache(),","","    // Regex","","    // Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace","    whitespace = \"[\\\\x20\\\\t\\\\r\\\\n\\\\f]\",","    // http://www.w3.org/TR/css3-syntax/#characters","    characterEncoding = \"(?:\\\\\\\\.|[-\\\\w]|[^\\\\x00-\\\\xa0])+\",","","    // Loosely modeled on CSS identifier characters","    // An unquoted value should be a CSS identifier (http://www.w3.org/TR/css3-selectors/#attribute-selectors)","    // Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier","    identifier = characterEncoding.replace( \"w\", \"w#\" ),","","    // Acceptable operators http://www.w3.org/TR/selectors/#attribute-selectors","    operators = \"([*^$|!~]?=)\",","    attributes = \"\\\\[\" + whitespace + \"*(\" + characterEncoding + \")\" + whitespace +","        \"*(?:\" + operators + whitespace + \"*(?:(['\\\"])((?:\\\\\\\\.|[^\\\\\\\\])*?)\\\\3|(\" + identifier + \")|)|)\" + whitespace + \"*\\\\]\",","","    // Prefer arguments not in parens/brackets,","    //   then attribute selectors and non-pseudos (denoted by :),","    //   then anything else","    // These preferences are here to reduce the number of selectors","    //   needing tokenize in the PSEUDO preFilter","    pseudos = \":(\" + characterEncoding + \")(?:\\\\((?:(['\\\"])((?:\\\\\\\\.|[^\\\\\\\\])*?)\\\\2|([^()[\\\\]]*|(?:(?:\" + attributes + \")|[^:]|\\\\\\\\.)*|.*))\\\\)|)\",","","    // For matchExpr.POS and matchExpr.needsContext","    pos = \":(even|odd|eq|gt|lt|nth|first|last)(?:\\\\(\" + whitespace +","        \"*((?:-\\\\d)?\\\\d*)\" + whitespace + \"*\\\\)|)(?=[^-]|$)\",","","    // Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter","    rtrim = new RegExp( \"^\" + whitespace + \"+|((?:^|[^\\\\\\\\])(?:\\\\\\\\.)*)\" + whitespace + \"+$\", \"g\" ),","","    rcomma = new RegExp( \"^\" + whitespace + \"*,\" + whitespace + \"*\" ),","    rcombinators = new RegExp( \"^\" + whitespace + \"*([\\\\x20\\\\t\\\\r\\\\n\\\\f>+~])\" + whitespace + \"*\" ),","    rpseudo = new RegExp( pseudos ),","","    // Easily-parseable/retrievable ID or TAG or CLASS selectors","    rquickExpr = /^(?:#([\\w\\-]+)|(\\w+)|\\.([\\w\\-]+))$/,","","    rnot = /^:not/,","    rsibling = /[\\x20\\t\\r\\n\\f]*[+~]/,","    rendsWithNot = /:not\\($/,","","    rheader = /h\\d/i,","    rinputs = /input|select|textarea|button/i,","","    rbackslash = /\\\\(?!\\\\)/g,","","    matchExpr = {","        \"ID\": new RegExp( \"^#(\" + characterEncoding + \")\" ),","        \"CLASS\": new RegExp( \"^\\\\.(\" + characterEncoding + \")\" ),","        \"NAME\": new RegExp( \"^\\\\[name=['\\\"]?(\" + characterEncoding + \")['\\\"]?\\\\]\" ),","        \"TAG\": new RegExp( \"^(\" + characterEncoding.replace( \"w\", \"w*\" ) + \")\" ),","        \"ATTR\": new RegExp( \"^\" + attributes ),","        \"PSEUDO\": new RegExp( \"^\" + pseudos ),","        \"POS\": new RegExp( pos, \"i\" ),","        \"CHILD\": new RegExp( \"^:(only|nth|first|last)-child(?:\\\\(\" + whitespace +","            \"*(even|odd|(([+-]|)(\\\\d*)n|)\" + whitespace + \"*(?:([+-]|)\" + whitespace +","            \"*(\\\\d+)|))\" + whitespace + \"*\\\\)|)\", \"i\" ),","        // For use in libraries implementing .is()","        \"needsContext\": new RegExp( \"^\" + whitespace + \"*[>+~]|\" + pos, \"i\" )","    },","","    // Support","","    // Used for testing something on an element","    assert = function( fn ) {","        var div = document.createElement(\"div\");","","        try {","            return fn( div );","        } catch (e) {","            return false;","        } finally {","            // release memory in IE","            div = null;","        }","    },","","    // Check if getElementsByTagName(\"*\") returns only elements","    assertTagNameNoComments = assert(function( div ) {","        div.appendChild( document.createComment(\"\") );","        return !div.getElementsByTagName(\"*\").length;","    }),","","    // Check if getAttribute returns normalized href attributes","    assertHrefNotNormalized = assert(function( div ) {","        div.innerHTML = \"<a href='#'></a>\";","        return div.firstChild && typeof div.firstChild.getAttribute !== strundefined &&","            div.firstChild.getAttribute(\"href\") === \"#\";","    }),","","    // Check if attributes should be retrieved by attribute nodes","    assertAttributes = assert(function( div ) {","        div.innerHTML = \"<select></select>\";","        var type = typeof div.lastChild.getAttribute(\"multiple\");","        // IE8 returns a string for some attributes even when not present","        return type !== \"boolean\" && type !== \"string\";","    }),","","    // Check if getElementsByClassName can be trusted","    assertUsableClassName = assert(function( div ) {","        // Opera can't find a second classname (in 9.6)","        div.innerHTML = \"<div class='hidden e'></div><div class='hidden'></div>\";","        if ( !div.getElementsByClassName || !div.getElementsByClassName(\"e\").length ) {","            return false;","        }","","        // Safari 3.2 caches class attributes and doesn't catch changes","        div.lastChild.className = \"e\";","        return div.getElementsByClassName(\"e\").length === 2;","    }),","","    // Check if getElementById returns elements by name","    // Check if getElementsByName privileges form controls or returns elements by ID","    assertUsableName = assert(function( div ) {","        // Inject content","        div.id = expando + 0;","        div.innerHTML = \"<a name='\" + expando + \"'></a><div name='\" + expando + \"'></div>\";","        docElem.insertBefore( div, docElem.firstChild );","","        // Test","        var pass = document.getElementsByName &&","            // buggy browsers will return fewer than the correct 2","            document.getElementsByName( expando ).length === 2 +","            // buggy browsers will return more than the correct 0","            document.getElementsByName( expando + 0 ).length;","        assertGetIdNotName = !document.getElementById( expando );","","        // Cleanup","        docElem.removeChild( div );","","        return pass;","    });","","// If slice is not available, provide a backup","try {","    slice.call( docElem.childNodes, 0 )[0].nodeType;","} catch ( e ) {","    slice = function( i ) {","        var elem,","            results = [];","        for ( ; (elem = this[i]); i++ ) {","            results.push( elem );","        }","        return results;","    };","}","","function Sizzle( selector, context, results, seed ) {","    results = results || [];","    context = context || document;","    var match, elem, xml, m,","        nodeType = context.nodeType;","","    if ( !selector || typeof selector !== \"string\" ) {","        return results;","    }","","    if ( nodeType !== 1 && nodeType !== 9 ) {","        return [];","    }","","    xml = isXML( context );","","    if ( !xml && !seed ) {","        if ( (match = rquickExpr.exec( selector )) ) {","            // Speed-up: Sizzle(\"#ID\")","            if ( (m = match[1]) ) {","                if ( nodeType === 9 ) {","                    elem = context.getElementById( m );","                    // Check parentNode to catch when Blackberry 4.6 returns","                    // nodes that are no longer in the document #6963","                    if ( elem && elem.parentNode ) {","                        // Handle the case where IE, Opera, and Webkit return items","                        // by name instead of ID","                        if ( elem.id === m ) {","                            results.push( elem );","                            return results;","                        }","                    } else {","                        return results;","                    }","                } else {","                    // Context is not a document","                    if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&","                        contains( context, elem ) && elem.id === m ) {","                        results.push( elem );","                        return results;","                    }","                }","","            // Speed-up: Sizzle(\"TAG\")","            } else if ( match[2] ) {","                push.apply( results, slice.call(context.getElementsByTagName( selector ), 0) );","                return results;","","            // Speed-up: Sizzle(\".CLASS\")","            } else if ( (m = match[3]) && assertUsableClassName && context.getElementsByClassName ) {","                push.apply( results, slice.call(context.getElementsByClassName( m ), 0) );","                return results;","            }","        }","    }","","    // All others","    return select( selector.replace( rtrim, \"$1\" ), context, results, seed, xml );","}","","Sizzle.matches = function( expr, elements ) {","    return Sizzle( expr, null, null, elements );","};","","Sizzle.matchesSelector = function( elem, expr ) {","    return Sizzle( expr, null, null, [ elem ] ).length > 0;","};","","// Returns a function to use in pseudos for input types","function createInputPseudo( type ) {","    return function( elem ) {","        var name = elem.nodeName.toLowerCase();","        return name === \"input\" && elem.type === type;","    };","}","","// Returns a function to use in pseudos for buttons","function createButtonPseudo( type ) {","    return function( elem ) {","        var name = elem.nodeName.toLowerCase();","        return (name === \"input\" || name === \"button\") && elem.type === type;","    };","}","","// Returns a function to use in pseudos for positionals","function createPositionalPseudo( fn ) {","    return markFunction(function( argument ) {","        argument = +argument;","        return markFunction(function( seed, matches ) {","            var j,","                matchIndexes = fn( [], seed.length, argument ),","                i = matchIndexes.length;","","            // Match elements found at the specified indexes","            while ( i-- ) {","                if ( seed[ (j = matchIndexes[i]) ] ) {","                    seed[j] = !(matches[j] = seed[j]);","                }","            }","        });","    });","}","","/**"," * Utility function for retrieving the text value of an array of DOM nodes"," * @param {Array|Element} elem"," */","getText = Sizzle.getText = function( elem ) {","    var node,","        ret = \"\",","        i = 0,","        nodeType = elem.nodeType;","","    if ( nodeType ) {","        if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {","            // Use textContent for elements","            // innerText usage removed for consistency of new lines (see #11153)","            if ( typeof elem.textContent === \"string\" ) {","                return elem.textContent;","            } else {","                // Traverse its children","                for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {","                    ret += getText( elem );","                }","            }","        } else if ( nodeType === 3 || nodeType === 4 ) {","            return elem.nodeValue;","        }","        // Do not include comment or processing instruction nodes","    } else {","","        // If no nodeType, this is expected to be an array","        for ( ; (node = elem[i]); i++ ) {","            // Do not traverse comment nodes","            ret += getText( node );","        }","    }","    return ret;","};","","isXML = Sizzle.isXML = function( elem ) {","    // documentElement is verified for cases where it doesn't yet exist","    // (such as loading iframes in IE - #4833)","    var documentElement = elem && (elem.ownerDocument || elem).documentElement;","    return documentElement ? documentElement.nodeName !== \"HTML\" : false;","};","","// Element contains another","contains = Sizzle.contains = docElem.contains ?","    function( a, b ) {","        var adown = a.nodeType === 9 ? a.documentElement : a,","            bup = b && b.parentNode;","        return a === bup || !!( bup && bup.nodeType === 1 && adown.contains && adown.contains(bup) );","    } :","    docElem.compareDocumentPosition ?","    function( a, b ) {","        return b && !!( a.compareDocumentPosition( b ) & 16 );","    } :","    function( a, b ) {","        while ( (b = b.parentNode) ) {","            if ( b === a ) {","                return true;","            }","        }","        return false;","    };","","Sizzle.attr = function( elem, name ) {","    var val,","        xml = isXML( elem );","","    if ( !xml ) {","        name = name.toLowerCase();","    }","    if ( (val = Expr.attrHandle[ name ]) ) {","        return val( elem );","    }","    if ( xml || assertAttributes ) {","        return elem.getAttribute( name );","    }","    val = elem.getAttributeNode( name );","    return val ?","        typeof elem[ name ] === \"boolean\" ?","            elem[ name ] ? name : null :","            val.specified ? val.value : null :","        null;","};","","Expr = Sizzle.selectors = {","","    // Can be adjusted by the user","    cacheLength: 50,","","    createPseudo: markFunction,","","    match: matchExpr,","","    // IE6/7 return a modified href","    attrHandle: assertHrefNotNormalized ?","        {} :","        {","            \"href\": function( elem ) {","                return elem.getAttribute( \"href\", 2 );","            },","            \"type\": function( elem ) {","                return elem.getAttribute(\"type\");","            }","        },","","    find: {","        \"ID\": assertGetIdNotName ?","            function( id, context, xml ) {","                if ( typeof context.getElementById !== strundefined && !xml ) {","                    var m = context.getElementById( id );","                    // Check parentNode to catch when Blackberry 4.6 returns","                    // nodes that are no longer in the document #6963","                    return m && m.parentNode ? [m] : [];","                }","            } :","            function( id, context, xml ) {","                if ( typeof context.getElementById !== strundefined && !xml ) {","                    var m = context.getElementById( id );","","                    return m ?","                        m.id === id || typeof m.getAttributeNode !== strundefined && m.getAttributeNode(\"id\").value === id ?","                            [m] :","                            undefined :","                        [];","                }","            },","","        \"TAG\": assertTagNameNoComments ?","            function( tag, context ) {","                if ( typeof context.getElementsByTagName !== strundefined ) {","                    return context.getElementsByTagName( tag );","                }","            } :","            function( tag, context ) {","                var results = context.getElementsByTagName( tag );","","                // Filter out possible comments","                if ( tag === \"*\" ) {","                    var elem,","                        tmp = [],","                        i = 0;","","                    for ( ; (elem = results[i]); i++ ) {","                        if ( elem.nodeType === 1 ) {","                            tmp.push( elem );","                        }","                    }","","                    return tmp;","                }","                return results;","            },","","        \"NAME\": assertUsableName && function( tag, context ) {","            if ( typeof context.getElementsByName !== strundefined ) {","                return context.getElementsByName( name );","            }","        },","","        \"CLASS\": assertUsableClassName && function( className, context, xml ) {","            if ( typeof context.getElementsByClassName !== strundefined && !xml ) {","                return context.getElementsByClassName( className );","            }","        }","    },","","    relative: {","        \">\": { dir: \"parentNode\", first: true },","        \" \": { dir: \"parentNode\" },","        \"+\": { dir: \"previousSibling\", first: true },","        \"~\": { dir: \"previousSibling\" }","    },","","    preFilter: {","        \"ATTR\": function( match ) {","            match[1] = match[1].replace( rbackslash, \"\" );","","            // Move the given value to match[3] whether quoted or unquoted","            match[3] = ( match[4] || match[5] || \"\" ).replace( rbackslash, \"\" );","","            if ( match[2] === \"~=\" ) {","                match[3] = \" \" + match[3] + \" \";","            }","","            return match.slice( 0, 4 );","        },","","        \"CHILD\": function( match ) {","            /* matches from matchExpr[\"CHILD\"]","                1 type (only|nth|...)","                2 argument (even|odd|\\d*|\\d*n([+-]\\d+)?|...)","                3 xn-component of xn+y argument ([+-]?\\d*n|)","                4 sign of xn-component","                5 x of xn-component","                6 sign of y-component","                7 y of y-component","            */","            match[1] = match[1].toLowerCase();","","            if ( match[1] === \"nth\" ) {","                // nth-child requires argument","                if ( !match[2] ) {","                    Sizzle.error( match[0] );","                }","","                // numeric x and y parameters for Expr.filter.CHILD","                // remember that false/true cast respectively to 0/1","                match[3] = +( match[3] ? match[4] + (match[5] || 1) : 2 * ( match[2] === \"even\" || match[2] === \"odd\" ) );","                match[4] = +( ( match[6] + match[7] ) || match[2] === \"odd\" );","","            // other types prohibit arguments","            } else if ( match[2] ) {","                Sizzle.error( match[0] );","            }","","            return match;","        },","","        \"PSEUDO\": function( match ) {","            var unquoted, excess;","            if ( matchExpr[\"CHILD\"].test( match[0] ) ) {","                return null;","            }","","            if ( match[3] ) {","                match[2] = match[3];","            } else if ( (unquoted = match[4]) ) {","                // Only check arguments that contain a pseudo","                if ( rpseudo.test(unquoted) &&","                    // Get excess from tokenize (recursively)","                    (excess = tokenize( unquoted, true )) &&","                    // advance to the next closing parenthesis","                    (excess = unquoted.indexOf( \")\", unquoted.length - excess ) - unquoted.length) ) {","","                    // excess is a negative index","                    unquoted = unquoted.slice( 0, excess );","                    match[0] = match[0].slice( 0, excess );","                }","                match[2] = unquoted;","            }","","            // Return only captures needed by the pseudo filter method (type and argument)","            return match.slice( 0, 3 );","        }","    },","","    filter: {","        \"ID\": assertGetIdNotName ?","            function( id ) {","                id = id.replace( rbackslash, \"\" );","                return function( elem ) {","                    return elem.getAttribute(\"id\") === id;","                };","            } :","            function( id ) {","                id = id.replace( rbackslash, \"\" );","                return function( elem ) {","                    var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode(\"id\");","                    return node && node.value === id;","                };","            },","","        \"TAG\": function( nodeName ) {","            if ( nodeName === \"*\" ) {","                return function() { return true; };","            }","            nodeName = nodeName.replace( rbackslash, \"\" ).toLowerCase();","","            return function( elem ) {","                return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;","            };","        },","","        \"CLASS\": function( className ) {","            var pattern = classCache[ expando ][ className ];","            if ( !pattern ) {","                pattern = classCache( className, new RegExp(\"(^|\" + whitespace + \")\" + className + \"(\" + whitespace + \"|$)\") );","            }","            return function( elem ) {","                return pattern.test( elem.className || (typeof elem.getAttribute !== strundefined && elem.getAttribute(\"class\")) || \"\" );","            };","        },","","        \"ATTR\": function( name, operator, check ) {","            return function( elem, context ) {","                var result = Sizzle.attr( elem, name );","","                if ( result == null ) {","                    return operator === \"!=\";","                }","                if ( !operator ) {","                    return true;","                }","","                result += \"\";","","                return operator === \"=\" ? result === check :","                    operator === \"!=\" ? result !== check :","                    operator === \"^=\" ? check && result.indexOf( check ) === 0 :","                    operator === \"*=\" ? check && result.indexOf( check ) > -1 :","                    operator === \"$=\" ? check && result.substr( result.length - check.length ) === check :","                    operator === \"~=\" ? ( \" \" + result + \" \" ).indexOf( check ) > -1 :","                    operator === \"|=\" ? result === check || result.substr( 0, check.length + 1 ) === check + \"-\" :","                    false;","            };","        },","","        \"CHILD\": function( type, argument, first, last ) {","","            if ( type === \"nth\" ) {","                return function( elem ) {","                    var node, diff,","                        parent = elem.parentNode;","","                    if ( first === 1 && last === 0 ) {","                        return true;","                    }","","                    if ( parent ) {","                        diff = 0;","                        for ( node = parent.firstChild; node; node = node.nextSibling ) {","                            if ( node.nodeType === 1 ) {","                                diff++;","                                if ( elem === node ) {","                                    break;","                                }","                            }","                        }","                    }","","                    // Incorporate the offset (or cast to NaN), then check against cycle size","                    diff -= last;","                    return diff === first || ( diff % first === 0 && diff / first >= 0 );","                };","            }","","            return function( elem ) {","                var node = elem;","","                switch ( type ) {","                    case \"only\":","                    case \"first\":","                        while ( (node = node.previousSibling) ) {","                            if ( node.nodeType === 1 ) {","                                return false;","                            }","                        }","","                        if ( type === \"first\" ) {","                            return true;","                        }","","                        node = elem;","","                        /* falls through */","                    case \"last\":","                        while ( (node = node.nextSibling) ) {","                            if ( node.nodeType === 1 ) {","                                return false;","                            }","                        }","","                        return true;","                }","            };","        },","","        \"PSEUDO\": function( pseudo, argument ) {","            // pseudo-class names are case-insensitive","            // http://www.w3.org/TR/selectors/#pseudo-classes","            // Prioritize by case sensitivity in case custom pseudos are added with uppercase letters","            // Remember that setFilters inherits from pseudos","            var args,","                fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||","                    Sizzle.error( \"unsupported pseudo: \" + pseudo );","","            // The user may use createPseudo to indicate that","            // arguments are needed to create the filter function","            // just as Sizzle does","            if ( fn[ expando ] ) {","                return fn( argument );","            }","","            // But maintain support for old signatures","            if ( fn.length > 1 ) {","                args = [ pseudo, pseudo, \"\", argument ];","                return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?","                    markFunction(function( seed, matches ) {","                        var idx,","                            matched = fn( seed, argument ),","                            i = matched.length;","                        while ( i-- ) {","                            idx = indexOf.call( seed, matched[i] );","                            seed[ idx ] = !( matches[ idx ] = matched[i] );","                        }","                    }) :","                    function( elem ) {","                        return fn( elem, 0, args );","                    };","            }","","            return fn;","        }","    },","","    pseudos: {","        \"not\": markFunction(function( selector ) {","            // Trim the selector passed to compile","            // to avoid treating leading and trailing","            // spaces as combinators","            var input = [],","                results = [],","                matcher = compile( selector.replace( rtrim, \"$1\" ) );","","            return matcher[ expando ] ?","                markFunction(function( seed, matches, context, xml ) {","                    var elem,","                        unmatched = matcher( seed, null, xml, [] ),","                        i = seed.length;","","                    // Match elements unmatched by `matcher`","                    while ( i-- ) {","                        if ( (elem = unmatched[i]) ) {","                            seed[i] = !(matches[i] = elem);","                        }","                    }","                }) :","                function( elem, context, xml ) {","                    input[0] = elem;","                    matcher( input, null, xml, results );","                    return !results.pop();","                };","        }),","","        \"has\": markFunction(function( selector ) {","            return function( elem ) {","                return Sizzle( selector, elem ).length > 0;","            };","        }),","","        \"contains\": markFunction(function( text ) {","            return function( elem ) {","                return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;","            };","        }),","","        \"enabled\": function( elem ) {","            return elem.disabled === false;","        },","","        \"disabled\": function( elem ) {","            return elem.disabled === true;","        },","","        \"checked\": function( elem ) {","            // In CSS3, :checked should return both checked and selected elements","            // http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked","            var nodeName = elem.nodeName.toLowerCase();","            return (nodeName === \"input\" && !!elem.checked) || (nodeName === \"option\" && !!elem.selected);","        },","","        \"selected\": function( elem ) {","            // Accessing this property makes selected-by-default","            // options in Safari work properly","            if ( elem.parentNode ) {","                elem.parentNode.selectedIndex;","            }","","            return elem.selected === true;","        },","","        \"parent\": function( elem ) {","            return !Expr.pseudos[\"empty\"]( elem );","        },","","        \"empty\": function( elem ) {","            // http://www.w3.org/TR/selectors/#empty-pseudo","            // :empty is only affected by element nodes and content nodes(including text(3), cdata(4)),","            //   not comment, processing instructions, or others","            // Thanks to Diego Perini for the nodeName shortcut","            //   Greater than \"@\" means alpha characters (specifically not starting with \"#\" or \"?\")","            var nodeType;","            elem = elem.firstChild;","            while ( elem ) {","                if ( elem.nodeName > \"@\" || (nodeType = elem.nodeType) === 3 || nodeType === 4 ) {","                    return false;","                }","                elem = elem.nextSibling;","            }","            return true;","        },","","        \"header\": function( elem ) {","            return rheader.test( elem.nodeName );","        },","","        \"text\": function( elem ) {","            var type, attr;","            // IE6 and 7 will map elem.type to 'text' for new HTML5 types (search, etc)","            // use getAttribute instead to test this case","            return elem.nodeName.toLowerCase() === \"input\" &&","                (type = elem.type) === \"text\" &&","                ( (attr = elem.getAttribute(\"type\")) == null || attr.toLowerCase() === type );","        },","","        // Input types","        \"radio\": createInputPseudo(\"radio\"),","        \"checkbox\": createInputPseudo(\"checkbox\"),","        \"file\": createInputPseudo(\"file\"),","        \"password\": createInputPseudo(\"password\"),","        \"image\": createInputPseudo(\"image\"),","","        \"submit\": createButtonPseudo(\"submit\"),","        \"reset\": createButtonPseudo(\"reset\"),","","        \"button\": function( elem ) {","            var name = elem.nodeName.toLowerCase();","            return name === \"input\" && elem.type === \"button\" || name === \"button\";","        },","","        \"input\": function( elem ) {","            return rinputs.test( elem.nodeName );","        },","","        \"focus\": function( elem ) {","            var doc = elem.ownerDocument;","            return elem === doc.activeElement && (!doc.hasFocus || doc.hasFocus()) && !!(elem.type || elem.href);","        },","","        \"active\": function( elem ) {","            return elem === elem.ownerDocument.activeElement;","        },","","        // Positional types","        \"first\": createPositionalPseudo(function( matchIndexes, length, argument ) {","            return [ 0 ];","        }),","","        \"last\": createPositionalPseudo(function( matchIndexes, length, argument ) {","            return [ length - 1 ];","        }),","","        \"eq\": createPositionalPseudo(function( matchIndexes, length, argument ) {","            return [ argument < 0 ? argument + length : argument ];","        }),","","        \"even\": createPositionalPseudo(function( matchIndexes, length, argument ) {","            for ( var i = 0; i < length; i += 2 ) {","                matchIndexes.push( i );","            }","            return matchIndexes;","        }),","","        \"odd\": createPositionalPseudo(function( matchIndexes, length, argument ) {","            for ( var i = 1; i < length; i += 2 ) {","                matchIndexes.push( i );","            }","            return matchIndexes;","        }),","","        \"lt\": createPositionalPseudo(function( matchIndexes, length, argument ) {","            for ( var i = argument < 0 ? argument + length : argument; --i >= 0; ) {","                matchIndexes.push( i );","            }","            return matchIndexes;","        }),","","        \"gt\": createPositionalPseudo(function( matchIndexes, length, argument ) {","            for ( var i = argument < 0 ? argument + length : argument; ++i < length; ) {","                matchIndexes.push( i );","            }","            return matchIndexes;","        })","    }","};","","function siblingCheck( a, b, ret ) {","    if ( a === b ) {","        return ret;","    }","","    var cur = a.nextSibling;","","    while ( cur ) {","        if ( cur === b ) {","            return -1;","        }","","        cur = cur.nextSibling;","    }","","    return 1;","}","","sortOrder = docElem.compareDocumentPosition ?","    function( a, b ) {","        if ( a === b ) {","            hasDuplicate = true;","            return 0;","        }","","        return ( !a.compareDocumentPosition || !b.compareDocumentPosition ?","            a.compareDocumentPosition :","            a.compareDocumentPosition(b) & 4","        ) ? -1 : 1;","    } :","    function( a, b ) {","        // The nodes are identical, we can exit early","        if ( a === b ) {","            hasDuplicate = true;","            return 0;","","        // Fallback to using sourceIndex (in IE) if it's available on both nodes","        } else if ( a.sourceIndex && b.sourceIndex ) {","            return a.sourceIndex - b.sourceIndex;","        }","","        var al, bl,","            ap = [],","            bp = [],","            aup = a.parentNode,","            bup = b.parentNode,","            cur = aup;","","        // If the nodes are siblings (or identical) we can do a quick check","        if ( aup === bup ) {","            return siblingCheck( a, b );","","        // If no parents were found then the nodes are disconnected","        } else if ( !aup ) {","            return -1;","","        } else if ( !bup ) {","            return 1;","        }","","        // Otherwise they're somewhere else in the tree so we need","        // to build up a full list of the parentNodes for comparison","        while ( cur ) {","            ap.unshift( cur );","            cur = cur.parentNode;","        }","","        cur = bup;","","        while ( cur ) {","            bp.unshift( cur );","            cur = cur.parentNode;","        }","","        al = ap.length;","        bl = bp.length;","","        // Start walking down the tree looking for a discrepancy","        for ( var i = 0; i < al && i < bl; i++ ) {","            if ( ap[i] !== bp[i] ) {","                return siblingCheck( ap[i], bp[i] );","            }","        }","","        // We ended someplace up the tree so do a sibling check","        return i === al ?","            siblingCheck( a, bp[i], -1 ) :","            siblingCheck( ap[i], b, 1 );","    };","","// Always assume the presence of duplicates if sort doesn't","// pass them to our comparison function (as in Google Chrome).","[0, 0].sort( sortOrder );","baseHasDuplicate = !hasDuplicate;","","// Document sorting and removing duplicates","Sizzle.uniqueSort = function( results ) {","    var elem,","        i = 1;","","    hasDuplicate = baseHasDuplicate;","    results.sort( sortOrder );","","    if ( hasDuplicate ) {","        for ( ; (elem = results[i]); i++ ) {","            if ( elem === results[ i - 1 ] ) {","                results.splice( i--, 1 );","            }","        }","    }","","    return results;","};","","Sizzle.error = function( msg ) {","    throw new Error( \"Syntax error, unrecognized expression: \" + msg );","};","","function tokenize( selector, parseOnly ) {","    var matched, match, tokens, type, soFar, groups, preFilters,","        cached = tokenCache[ expando ][ selector ];","","    if ( cached ) {","        return parseOnly ? 0 : cached.slice( 0 );","    }","","    soFar = selector;","    groups = [];","    preFilters = Expr.preFilter;","","    while ( soFar ) {","","        // Comma and first run","        if ( !matched || (match = rcomma.exec( soFar )) ) {","            if ( match ) {","                soFar = soFar.slice( match[0].length );","            }","            groups.push( tokens = [] );","        }","","        matched = false;","","        // Combinators","        if ( (match = rcombinators.exec( soFar )) ) {","            tokens.push( matched = new Token( match.shift() ) );","            soFar = soFar.slice( matched.length );","","            // Cast descendant combinators to space","            matched.type = match[0].replace( rtrim, \" \" );","        }","","        // Filters","        for ( type in Expr.filter ) {","            if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||","                // The last two arguments here are (context, xml) for backCompat","                (match = preFilters[ type ]( match, document, true ))) ) {","","                tokens.push( matched = new Token( match.shift() ) );","                soFar = soFar.slice( matched.length );","                matched.type = type;","                matched.matches = match;","            }","        }","","        if ( !matched ) {","            break;","        }","    }","","    // Return the length of the invalid excess","    // if we're just parsing","    // Otherwise, throw an error or return tokens","    return parseOnly ?","        soFar.length :","        soFar ?","            Sizzle.error( selector ) :","            // Cache the tokens","            tokenCache( selector, groups ).slice( 0 );","}","","function addCombinator( matcher, combinator, base ) {","    var dir = combinator.dir,","        checkNonElements = base && combinator.dir === \"parentNode\",","        doneName = done++;","","    return combinator.first ?","        // Check against closest ancestor/preceding element","        function( elem, context, xml ) {","            while ( (elem = elem[ dir ]) ) {","                if ( checkNonElements || elem.nodeType === 1  ) {","                    return matcher( elem, context, xml );","                }","            }","        } :","","        // Check against all ancestor/preceding elements","        function( elem, context, xml ) {","            // We can't set arbitrary data on XML nodes, so they don't benefit from dir caching","            if ( !xml ) {","                var cache,","                    dirkey = dirruns + \" \" + doneName + \" \",","                    cachedkey = dirkey + cachedruns;","                while ( (elem = elem[ dir ]) ) {","                    if ( checkNonElements || elem.nodeType === 1 ) {","                        if ( (cache = elem[ expando ]) === cachedkey ) {","                            return elem.sizset;","                        } else if ( typeof cache === \"string\" && cache.indexOf(dirkey) === 0 ) {","                            if ( elem.sizset ) {","                                return elem;","                            }","                        } else {","                            elem[ expando ] = cachedkey;","                            if ( matcher( elem, context, xml ) ) {","                                elem.sizset = true;","                                return elem;","                            }","                            elem.sizset = false;","                        }","                    }","                }","            } else {","                while ( (elem = elem[ dir ]) ) {","                    if ( checkNonElements || elem.nodeType === 1 ) {","                        if ( matcher( elem, context, xml ) ) {","                            return elem;","                        }","                    }","                }","            }","        };","}","","function elementMatcher( matchers ) {","    return matchers.length > 1 ?","        function( elem, context, xml ) {","            var i = matchers.length;","            while ( i-- ) {","                if ( !matchers[i]( elem, context, xml ) ) {","                    return false;","                }","            }","            return true;","        } :","        matchers[0];","}","","function condense( unmatched, map, filter, context, xml ) {","    var elem,","        newUnmatched = [],","        i = 0,","        len = unmatched.length,","        mapped = map != null;","","    for ( ; i < len; i++ ) {","        if ( (elem = unmatched[i]) ) {","            if ( !filter || filter( elem, context, xml ) ) {","                newUnmatched.push( elem );","                if ( mapped ) {","                    map.push( i );","                }","            }","        }","    }","","    return newUnmatched;","}","","function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {","    if ( postFilter && !postFilter[ expando ] ) {","        postFilter = setMatcher( postFilter );","    }","    if ( postFinder && !postFinder[ expando ] ) {","        postFinder = setMatcher( postFinder, postSelector );","    }","    return markFunction(function( seed, results, context, xml ) {","        // Positional selectors apply to seed elements, so it is invalid to follow them with relative ones","        if ( seed && postFinder ) {","            return;","        }","","        var i, elem, postFilterIn,","            preMap = [],","            postMap = [],","            preexisting = results.length,","","            // Get initial elements from seed or context","            elems = seed || multipleContexts( selector || \"*\", context.nodeType ? [ context ] : context, [], seed ),","","            // Prefilter to get matcher input, preserving a map for seed-results synchronization","            matcherIn = preFilter && ( seed || !selector ) ?","                condense( elems, preMap, preFilter, context, xml ) :","                elems,","","            matcherOut = matcher ?","                // If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,","                postFinder || ( seed ? preFilter : preexisting || postFilter ) ?","","                    // ...intermediate processing is necessary","                    [] :","","                    // ...otherwise use results directly","                    results :","                matcherIn;","","        // Find primary matches","        if ( matcher ) {","            matcher( matcherIn, matcherOut, context, xml );","        }","","        // Apply postFilter","        if ( postFilter ) {","            postFilterIn = condense( matcherOut, postMap );","            postFilter( postFilterIn, [], context, xml );","","            // Un-match failing elements by moving them back to matcherIn","            i = postFilterIn.length;","            while ( i-- ) {","                if ( (elem = postFilterIn[i]) ) {","                    matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);","                }","            }","        }","","        // Keep seed and results synchronized","        if ( seed ) {","            // Ignore postFinder because it can't coexist with seed","            i = preFilter && matcherOut.length;","            while ( i-- ) {","                if ( (elem = matcherOut[i]) ) {","                    seed[ preMap[i] ] = !(results[ preMap[i] ] = elem);","                }","            }","        } else {","            matcherOut = condense(","                matcherOut === results ?","                    matcherOut.splice( preexisting, matcherOut.length ) :","                    matcherOut","            );","            if ( postFinder ) {","                postFinder( null, results, matcherOut, xml );","            } else {","                push.apply( results, matcherOut );","            }","        }","    });","}","","function matcherFromTokens( tokens ) {","    var checkContext, matcher, j,","        len = tokens.length,","        leadingRelative = Expr.relative[ tokens[0].type ],","        implicitRelative = leadingRelative || Expr.relative[\" \"],","        i = leadingRelative ? 1 : 0,","","        // The foundational matcher ensures that elements are reachable from top-level context(s)","        matchContext = addCombinator( function( elem ) {","            return elem === checkContext;","        }, implicitRelative, true ),","        matchAnyContext = addCombinator( function( elem ) {","            return indexOf.call( checkContext, elem ) > -1;","        }, implicitRelative, true ),","        matchers = [ function( elem, context, xml ) {","            return ( !leadingRelative && ( xml || context !== outermostContext ) ) || (","                (checkContext = context).nodeType ?","                    matchContext( elem, context, xml ) :","                    matchAnyContext( elem, context, xml ) );","        } ];","","    for ( ; i < len; i++ ) {","        if ( (matcher = Expr.relative[ tokens[i].type ]) ) {","            matchers = [ addCombinator( elementMatcher( matchers ), matcher ) ];","        } else {","            // The concatenated values are (context, xml) for backCompat","            matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );","","            // Return special upon seeing a positional matcher","            if ( matcher[ expando ] ) {","                // Find the next relative operator (if any) for proper handling","                j = ++i;","                for ( ; j < len; j++ ) {","                    if ( Expr.relative[ tokens[j].type ] ) {","                        break;","                    }","                }","                return setMatcher(","                    i > 1 && elementMatcher( matchers ),","                    i > 1 && tokens.slice( 0, i - 1 ).join(\"\").replace( rtrim, \"$1\" ),","                    matcher,","                    i < j && matcherFromTokens( tokens.slice( i, j ) ),","                    j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),","                    j < len && tokens.join(\"\")","                );","            }","            matchers.push( matcher );","        }","    }","","    return elementMatcher( matchers );","}","","function matcherFromGroupMatchers( elementMatchers, setMatchers ) {","    var bySet = setMatchers.length > 0,","        byElement = elementMatchers.length > 0,","        superMatcher = function( seed, context, xml, results, expandContext ) {","            var elem, j, matcher,","                setMatched = [],","                matchedCount = 0,","                i = \"0\",","                unmatched = seed && [],","                outermost = expandContext != null,","                contextBackup = outermostContext,","                // We must always have either seed elements or context","                elems = seed || byElement && Expr.find[\"TAG\"]( \"*\", expandContext && context.parentNode || context ),","                // Nested matchers should use non-integer dirruns","                dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.E);","","            if ( outermost ) {","                outermostContext = context !== document && context;","                cachedruns = superMatcher.el;","            }","","            // Add elements passing elementMatchers directly to results","            for ( ; (elem = elems[i]) != null; i++ ) {","                if ( byElement && elem ) {","                    for ( j = 0; (matcher = elementMatchers[j]); j++ ) {","                        if ( matcher( elem, context, xml ) ) {","                            results.push( elem );","                            break;","                        }","                    }","                    if ( outermost ) {","                        dirruns = dirrunsUnique;","                        cachedruns = ++superMatcher.el;","                    }","                }","","                // Track unmatched elements for set filters","                if ( bySet ) {","                    // They will have gone through all possible matchers","                    if ( (elem = !matcher && elem) ) {","                        matchedCount--;","                    }","","                    // Lengthen the array for every element, matched or not","                    if ( seed ) {","                        unmatched.push( elem );","                    }","                }","            }","","            // Apply set filters to unmatched elements","            matchedCount += i;","            if ( bySet && i !== matchedCount ) {","                for ( j = 0; (matcher = setMatchers[j]); j++ ) {","                    matcher( unmatched, setMatched, context, xml );","                }","","                if ( seed ) {","                    // Reintegrate element matches to eliminate the need for sorting","                    if ( matchedCount > 0 ) {","                        while ( i-- ) {","                            if ( !(unmatched[i] || setMatched[i]) ) {","                                setMatched[i] = pop.call( results );","                            }","                        }","                    }","","                    // Discard index placeholder values to get only actual matches","                    setMatched = condense( setMatched );","                }","","                // Add matches to results","                push.apply( results, setMatched );","","                // Seedless set matches succeeding multiple successful matchers stipulate sorting","                if ( outermost && !seed && setMatched.length > 0 &&","                    ( matchedCount + setMatchers.length ) > 1 ) {","","                    Sizzle.uniqueSort( results );","                }","            }","","            // Override manipulation of globals by nested matchers","            if ( outermost ) {","                dirruns = dirrunsUnique;","                outermostContext = contextBackup;","            }","","            return unmatched;","        };","","    superMatcher.el = 0;","    return bySet ?","        markFunction( superMatcher ) :","        superMatcher;","}","","compile = Sizzle.compile = function( selector, group /* Internal Use Only */ ) {","    var i,","        setMatchers = [],","        elementMatchers = [],","        cached = compilerCache[ expando ][ selector ];","","    if ( !cached ) {","        // Generate a function of recursive functions that can be used to check each element","        if ( !group ) {","            group = tokenize( selector );","        }","        i = group.length;","        while ( i-- ) {","            cached = matcherFromTokens( group[i] );","            if ( cached[ expando ] ) {","                setMatchers.push( cached );","            } else {","                elementMatchers.push( cached );","            }","        }","","        // Cache the compiled function","        cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );","    }","    return cached;","};","","function multipleContexts( selector, contexts, results, seed ) {","    var i = 0,","        len = contexts.length;","    for ( ; i < len; i++ ) {","        Sizzle( selector, contexts[i], results, seed );","    }","    return results;","}","","function select( selector, context, results, seed, xml ) {","    var i, tokens, token, type, find,","        match = tokenize( selector ),","        j = match.length;","","    if ( !seed ) {","        // Try to minimize operations if there is only one group","        if ( match.length === 1 ) {","","            // Take a shortcut and set the context if the root selector is an ID","            tokens = match[0] = match[0].slice( 0 );","            if ( tokens.length > 2 && (token = tokens[0]).type === \"ID\" &&","                    context.nodeType === 9 && !xml &&","                    Expr.relative[ tokens[1].type ] ) {","","                context = Expr.find[\"ID\"]( token.matches[0].replace( rbackslash, \"\" ), context, xml )[0];","                if ( !context ) {","                    return results;","                }","","                selector = selector.slice( tokens.shift().length );","            }","","            // Fetch a seed set for right-to-left matching","            for ( i = matchExpr[\"POS\"].test( selector ) ? -1 : tokens.length - 1; i >= 0; i-- ) {","                token = tokens[i];","","                // Abort if we hit a combinator","                if ( Expr.relative[ (type = token.type) ] ) {","                    break;","                }","                if ( (find = Expr.find[ type ]) ) {","                    // Search, expanding context for leading sibling combinators","                    if ( (seed = find(","                        token.matches[0].replace( rbackslash, \"\" ),","                        rsibling.test( tokens[0].type ) && context.parentNode || context,","                        xml","                    )) ) {","","                        // If seed is empty or no tokens remain, we can return early","                        tokens.splice( i, 1 );","                        selector = seed.length && tokens.join(\"\");","                        if ( !selector ) {","                            push.apply( results, slice.call( seed, 0 ) );","                            return results;","                        }","","                        break;","                    }","                }","            }","        }","    }","","    // Compile and execute a filtering function","    // Provide `match` to avoid retokenization if we modified the selector above","    compile( selector, match )(","        seed,","        context,","        xml,","        results,","        rsibling.test( selector )","    );","    return results;","}","","if ( document.querySelectorAll ) {","    (function() {","        var disconnectedMatch,","            oldSelect = select,","            rescape = /'|\\\\/g,","            rattributeQuotes = /\\=[\\x20\\t\\r\\n\\f]*([^'\"\\]]*)[\\x20\\t\\r\\n\\f]*\\]/g,","","            // qSa(:focus) reports false when true (Chrome 21),","            // A support test would require too much code (would include document ready)","            rbuggyQSA = [\":focus\"],","","            // matchesSelector(:focus) reports false when true (Chrome 21),","            // matchesSelector(:active) reports false when true (IE9/Opera 11.5)","            // A support test would require too much code (would include document ready)","            // just skip matchesSelector for :active","            rbuggyMatches = [ \":active\", \":focus\" ],","            matches = docElem.matchesSelector ||","                docElem.mozMatchesSelector ||","                docElem.webkitMatchesSelector ||","                docElem.oMatchesSelector ||","                docElem.msMatchesSelector;","","        // Build QSA regex","        // Regex strategy adopted from Diego Perini","        assert(function( div ) {","            // Select is set to empty string on purpose","            // This is to test IE's treatment of not explictly","            // setting a boolean content attribute,","            // since its presence should be enough","            // http://bugs.jquery.com/ticket/12359","            div.innerHTML = \"<select><option selected=''></option></select>\";","","            // IE8 - Some boolean attributes are not treated correctly","            if ( !div.querySelectorAll(\"[selected]\").length ) {","                rbuggyQSA.push( \"\\\\[\" + whitespace + \"*(?:checked|disabled|ismap|multiple|readonly|selected|value)\" );","            }","","            // Webkit/Opera - :checked should return selected option elements","            // http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked","            // IE8 throws error here (do not put tests after this one)","            if ( !div.querySelectorAll(\":checked\").length ) {","                rbuggyQSA.push(\":checked\");","            }","        });","","        assert(function( div ) {","","            // Opera 10-12/IE9 - ^= $= *= and empty values","            // Should not select anything","            div.innerHTML = \"<p test=''></p>\";","            if ( div.querySelectorAll(\"[test^='']\").length ) {","                rbuggyQSA.push( \"[*^$]=\" + whitespace + \"*(?:\\\"\\\"|'')\" );","            }","","            // FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)","            // IE8 throws error here (do not put tests after this one)","            div.innerHTML = \"<input type='hidden'/>\";","            if ( !div.querySelectorAll(\":enabled\").length ) {","                rbuggyQSA.push(\":enabled\", \":disabled\");","            }","        });","","        // rbuggyQSA always contains :focus, so no need for a length check","        rbuggyQSA = /* rbuggyQSA.length && */ new RegExp( rbuggyQSA.join(\"|\") );","","        select = function( selector, context, results, seed, xml ) {","            // Only use querySelectorAll when not filtering,","            // when this is not xml,","            // and when no QSA bugs apply","            if ( !seed && !xml && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {","                var groups, i,","                    old = true,","                    nid = expando,","                    newContext = context,","                    newSelector = context.nodeType === 9 && selector;","","                // qSA works strangely on Element-rooted queries","                // We can work around this by specifying an extra ID on the root","                // and working up from there (Thanks to Andrew Dupont for the technique)","                // IE 8 doesn't work on object elements","                if ( context.nodeType === 1 && context.nodeName.toLowerCase() !== \"object\" ) {","                    groups = tokenize( selector );","","                    if ( (old = context.getAttribute(\"id\")) ) {","                        nid = old.replace( rescape, \"\\\\$&\" );","                    } else {","                        context.setAttribute( \"id\", nid );","                    }","                    nid = \"[id='\" + nid + \"'] \";","","                    i = groups.length;","                    while ( i-- ) {","                        groups[i] = nid + groups[i].join(\"\");","                    }","                    newContext = rsibling.test( selector ) && context.parentNode || context;","                    newSelector = groups.join(\",\");","                }","","                if ( newSelector ) {","                    try {","                        push.apply( results, slice.call( newContext.querySelectorAll(","                            newSelector","                        ), 0 ) );","                        return results;","                    } catch(qsaError) {","                    } finally {","                        if ( !old ) {","                            context.removeAttribute(\"id\");","                        }","                    }","                }","            }","","            return oldSelect( selector, context, results, seed, xml );","        };","","        if ( matches ) {","            assert(function( div ) {","                // Check to see if it's possible to do matchesSelector","                // on a disconnected node (IE 9)","                disconnectedMatch = matches.call( div, \"div\" );","","                // This should fail with an exception","                // Gecko does not error, returns false instead","                try {","                    matches.call( div, \"[test!='']:sizzle\" );","                    rbuggyMatches.push( \"!=\", pseudos );","                } catch ( e ) {}","            });","","            // rbuggyMatches always contains :active and :focus, so no need for a length check","            rbuggyMatches = /* rbuggyMatches.length && */ new RegExp( rbuggyMatches.join(\"|\") );","","            Sizzle.matchesSelector = function( elem, expr ) {","                // Make sure that attribute selectors are quoted","                expr = expr.replace( rattributeQuotes, \"='$1']\" );","","                // rbuggyMatches always contains :active, so no need for an existence check","                if ( !isXML( elem ) && !rbuggyMatches.test( expr ) && (!rbuggyQSA || !rbuggyQSA.test( expr )) ) {","                    try {","                        var ret = matches.call( elem, expr );","","                        // IE 9's matchesSelector returns false on disconnected nodes","                        if ( ret || disconnectedMatch ||","                                // As well, disconnected nodes are said to be in a document","                                // fragment in IE 9","                                elem.document && elem.document.nodeType !== 11 ) {","                            return ret;","                        }","                    } catch(e) {}","                }","","                return Sizzle( expr, null, null, [ elem ] ).length > 0;","            };","        }","    })();","}","","// Deprecated","Expr.pseudos[\"nth\"] = Expr.pseudos[\"eq\"];","","// Back-compat","function setFilters() {}","Expr.filters = setFilters.prototype = Expr.pseudos;","Expr.setFilters = new setFilters();","","// Override sizzle attribute retrieval","Sizzle.attr = jQuery.attr;","jQuery.find = Sizzle;","jQuery.expr = Sizzle.selectors;","jQuery.expr[\":\"] = jQuery.expr.pseudos;","jQuery.unique = Sizzle.uniqueSort;","jQuery.text = Sizzle.getText;","jQuery.isXMLDoc = Sizzle.isXML;","jQuery.contains = Sizzle.contains;","","","})( window );","var runtil = /Until$/,","    rparentsprev = /^(?:parents|prev(?:Until|All))/,","    isSimple = /^.[^:#\\[\\.,]*$/,","    rneedsContext = jQuery.expr.match.needsContext,","    // methods guaranteed to produce a unique set when starting from a unique set","    guaranteedUnique = {","        children: true,","        contents: true,","        next: true,","        prev: true","    };","","jQuery.fn.extend({","    find: function( selector ) {","        var i, l, length, n, r, ret,","            self = this;","","        if ( typeof selector !== \"string\" ) {","            return jQuery( selector ).filter(function() {","                for ( i = 0, l = self.length; i < l; i++ ) {","                    if ( jQuery.contains( self[ i ], this ) ) {","                        return true;","                    }","                }","            });","        }","","        ret = this.pushStack( \"\", \"find\", selector );","","        for ( i = 0, l = this.length; i < l; i++ ) {","            length = ret.length;","            jQuery.find( selector, this[i], ret );","","            if ( i > 0 ) {","                // Make sure that the results are unique","                for ( n = length; n < ret.length; n++ ) {","                    for ( r = 0; r < length; r++ ) {","                        if ( ret[r] === ret[n] ) {","                            ret.splice(n--, 1);","                            break;","                        }","                    }","                }","            }","        }","","        return ret;","    },","","    has: function( target ) {","        var i,","            targets = jQuery( target, this ),","            len = targets.length;","","        return this.filter(function() {","            for ( i = 0; i < len; i++ ) {","                if ( jQuery.contains( this, targets[i] ) ) {","                    return true;","                }","            }","        });","    },","","    not: function( selector ) {","        return this.pushStack( winnow(this, selector, false), \"not\", selector);","    },","","    filter: function( selector ) {","        return this.pushStack( winnow(this, selector, true), \"filter\", selector );","    },","","    is: function( selector ) {","        return !!selector && (","            typeof selector === \"string\" ?","                // If this is a positional/relative selector, check membership in the returned set","                // so $(\"p:first\").is(\"p:last\") won't return true for a doc with two \"p\".","                rneedsContext.test( selector ) ?","                    jQuery( selector, this.context ).index( this[0] ) >= 0 :","                    jQuery.filter( selector, this ).length > 0 :","                this.filter( selector ).length > 0 );","    },","","    closest: function( selectors, context ) {","        var cur,","            i = 0,","            l = this.length,","            ret = [],","            pos = rneedsContext.test( selectors ) || typeof selectors !== \"string\" ?","                jQuery( selectors, context || this.context ) :","                0;","","        for ( ; i < l; i++ ) {","            cur = this[i];","","            while ( cur && cur.ownerDocument && cur !== context && cur.nodeType !== 11 ) {","                if ( pos ? pos.index(cur) > -1 : jQuery.find.matchesSelector(cur, selectors) ) {","                    ret.push( cur );","                    break;","                }","                cur = cur.parentNode;","            }","        }","","        ret = ret.length > 1 ? jQuery.unique( ret ) : ret;","","        return this.pushStack( ret, \"closest\", selectors );","    },","","    // Determine the position of an element within","    // the matched set of elements","    index: function( elem ) {","","        // No argument, return index in parent","        if ( !elem ) {","            return ( this[0] && this[0].parentNode ) ? this.prevAll().length : -1;","        }","","        // index in selector","        if ( typeof elem === \"string\" ) {","            return jQuery.inArray( this[0], jQuery( elem ) );","        }","","        // Locate the position of the desired element","        return jQuery.inArray(","            // If it receives a jQuery object, the first element is used","            elem.jquery ? elem[0] : elem, this );","    },","","    add: function( selector, context ) {","        var set = typeof selector === \"string\" ?","                jQuery( selector, context ) :","                jQuery.makeArray( selector && selector.nodeType ? [ selector ] : selector ),","            all = jQuery.merge( this.get(), set );","","        return this.pushStack( isDisconnected( set[0] ) || isDisconnected( all[0] ) ?","            all :","            jQuery.unique( all ) );","    },","","    addBack: function( selector ) {","        return this.add( selector == null ?","            this.prevObject : this.prevObject.filter(selector)","        );","    }","});","","jQuery.fn.andSelf = jQuery.fn.addBack;","","// A painfully simple check to see if an element is disconnected","// from a document (should be improved, where feasible).","function isDisconnected( node ) {","    return !node || !node.parentNode || node.parentNode.nodeType === 11;","}","","function sibling( cur, dir ) {","    do {","        cur = cur[ dir ];","    } while ( cur && cur.nodeType !== 1 );","","    return cur;","}","","jQuery.each({","    parent: function( elem ) {","        var parent = elem.parentNode;","        return parent && parent.nodeType !== 11 ? parent : null;","    },","    parents: function( elem ) {","        return jQuery.dir( elem, \"parentNode\" );","    },","    parentsUntil: function( elem, i, until ) {","        return jQuery.dir( elem, \"parentNode\", until );","    },","    next: function( elem ) {","        return sibling( elem, \"nextSibling\" );","    },","    prev: function( elem ) {","        return sibling( elem, \"previousSibling\" );","    },","    nextAll: function( elem ) {","        return jQuery.dir( elem, \"nextSibling\" );","    },","    prevAll: function( elem ) {","        return jQuery.dir( elem, \"previousSibling\" );","    },","    nextUntil: function( elem, i, until ) {","        return jQuery.dir( elem, \"nextSibling\", until );","    },","    prevUntil: function( elem, i, until ) {","        return jQuery.dir( elem, \"previousSibling\", until );","    },","    siblings: function( elem ) {","        return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );","    },","    children: function( elem ) {","        return jQuery.sibling( elem.firstChild );","    },","    contents: function( elem ) {","        return jQuery.nodeName( elem, \"iframe\" ) ?","            elem.contentDocument || elem.contentWindow.document :","            jQuery.merge( [], elem.childNodes );","    }","}, function( name, fn ) {","    jQuery.fn[ name ] = function( until, selector ) {","        var ret = jQuery.map( this, fn, until );","","        if ( !runtil.test( name ) ) {","            selector = until;","        }","","        if ( selector && typeof selector === \"string\" ) {","            ret = jQuery.filter( selector, ret );","        }","","        ret = this.length > 1 && !guaranteedUnique[ name ] ? jQuery.unique( ret ) : ret;","","        if ( this.length > 1 && rparentsprev.test( name ) ) {","            ret = ret.reverse();","        }","","        return this.pushStack( ret, name, core_slice.call( arguments ).join(\",\") );","    };","});","","jQuery.extend({","    filter: function( expr, elems, not ) {","        if ( not ) {","            expr = \":not(\" + expr + \")\";","        }","","        return elems.length === 1 ?","            jQuery.find.matchesSelector(elems[0], expr) ? [ elems[0] ] : [] :","            jQuery.find.matches(expr, elems);","    },","","    dir: function( elem, dir, until ) {","        var matched = [],","            cur = elem[ dir ];","","        while ( cur && cur.nodeType !== 9 && (until === undefined || cur.nodeType !== 1 || !jQuery( cur ).is( until )) ) {","            if ( cur.nodeType === 1 ) {","                matched.push( cur );","            }","            cur = cur[dir];","        }","        return matched;","    },","","    sibling: function( n, elem ) {","        var r = [];","","        for ( ; n; n = n.nextSibling ) {","            if ( n.nodeType === 1 && n !== elem ) {","                r.push( n );","            }","        }","","        return r;","    }","});","","// Implement the identical functionality for filter and not","function winnow( elements, qualifier, keep ) {","","    // Can't pass null or undefined to indexOf in Firefox 4","    // Set to 0 to skip string check","    qualifier = qualifier || 0;","","    if ( jQuery.isFunction( qualifier ) ) {","        return jQuery.grep(elements, function( elem, i ) {","            var retVal = !!qualifier.call( elem, i, elem );","            return retVal === keep;","        });","","    } else if ( qualifier.nodeType ) {","        return jQuery.grep(elements, function( elem, i ) {","            return ( elem === qualifier ) === keep;","        });","","    } else if ( typeof qualifier === \"string\" ) {","        var filtered = jQuery.grep(elements, function( elem ) {","            return elem.nodeType === 1;","        });","","        if ( isSimple.test( qualifier ) ) {","            return jQuery.filter(qualifier, filtered, !keep);","        } else {","            qualifier = jQuery.filter( qualifier, filtered );","        }","    }","","    return jQuery.grep(elements, function( elem, i ) {","        return ( jQuery.inArray( elem, qualifier ) >= 0 ) === keep;","    });","}","function createSafeFragment( document ) {","    var list = nodeNames.split( \"|\" ),","    safeFrag = document.createDocumentFragment();","","    if ( safeFrag.createElement ) {","        while ( list.length ) {","            safeFrag.createElement(","                list.pop()","            );","        }","    }","    return safeFrag;","}","","var nodeNames = \"abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|\" +","        \"header|hgroup|mark|meter|nav|output|progress|section|summary|time|video\",","    rinlinejQuery = / jQuery\\d+=\"(?:null|\\d+)\"/g,","    rleadingWhitespace = /^\\s+/,","    rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\\w:]+)[^>]*)\\/>/gi,","    rtagName = /<([\\w:]+)/,","    rtbody = /<tbody/i,","    rhtml = /<|&#?\\w+;/,","    rnoInnerhtml = /<(?:script|style|link)/i,","    rnocache = /<(?:script|object|embed|option|style)/i,","    rnoshimcache = new RegExp(\"<(?:\" + nodeNames + \")[\\\\s/>]\", \"i\"),","    rcheckableType = /^(?:checkbox|radio)$/,","    // checked=\"checked\" or checked","    rchecked = /checked\\s*(?:[^=]|=\\s*.checked.)/i,","    rscriptType = /\\/(java|ecma)script/i,","    rcleanScript = /^\\s*<!(?:\\[CDATA\\[|\\-\\-)|[\\]\\-]{2}>\\s*$/g,","    wrapMap = {","        option: [ 1, \"<select multiple='multiple'>\", \"</select>\" ],","        legend: [ 1, \"<fieldset>\", \"</fieldset>\" ],","        thead: [ 1, \"<table>\", \"</table>\" ],","        tr: [ 2, \"<table><tbody>\", \"</tbody></table>\" ],","        td: [ 3, \"<table><tbody><tr>\", \"</tr></tbody></table>\" ],","        col: [ 2, \"<table><tbody></tbody><colgroup>\", \"</colgroup></table>\" ],","        area: [ 1, \"<map>\", \"</map>\" ],","        _default: [ 0, \"\", \"\" ]","    },","    safeFragment = createSafeFragment( document ),","    fragmentDiv = safeFragment.appendChild( document.createElement(\"div\") );","","wrapMap.optgroup = wrapMap.option;","wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;","wrapMap.th = wrapMap.td;","","// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,","// unless wrapped in a div with non-breaking characters in front of it.","if ( !jQuery.support.htmlSerialize ) {","    wrapMap._default = [ 1, \"X<div>\", \"</div>\" ];","}","","jQuery.fn.extend({","    text: function( value ) {","        return jQuery.access( this, function( value ) {","            return value === undefined ?","                jQuery.text( this ) :","                this.empty().append( ( this[0] && this[0].ownerDocument || document ).createTextNode( value ) );","        }, null, value, arguments.length );","    },","","    wrapAll: function( html ) {","        if ( jQuery.isFunction( html ) ) {","            return this.each(function(i) {","                jQuery(this).wrapAll( html.call(this, i) );","            });","        }","","        if ( this[0] ) {","            // The elements to wrap the target around","            var wrap = jQuery( html, this[0].ownerDocument ).eq(0).clone(true);","","            if ( this[0].parentNode ) {","                wrap.insertBefore( this[0] );","            }","","            wrap.map(function() {","                var elem = this;","","                while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {","                    elem = elem.firstChild;","                }","","                return elem;","            }).append( this );","        }","","        return this;","    },","","    wrapInner: function( html ) {","        if ( jQuery.isFunction( html ) ) {","            return this.each(function(i) {","                jQuery(this).wrapInner( html.call(this, i) );","            });","        }","","        return this.each(function() {","            var self = jQuery( this ),","                contents = self.contents();","","            if ( contents.length ) {","                contents.wrapAll( html );","","            } else {","                self.append( html );","            }","        });","    },","","    wrap: function( html ) {","        var isFunction = jQuery.isFunction( html );","","        return this.each(function(i) {","            jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );","        });","    },","","    unwrap: function() {","        return this.parent().each(function() {","            if ( !jQuery.nodeName( this, \"body\" ) ) {","                jQuery( this ).replaceWith( this.childNodes );","            }","        }).end();","    },","","    append: function() {","        return this.domManip(arguments, true, function( elem ) {","            if ( this.nodeType === 1 || this.nodeType === 11 ) {","                this.appendChild( elem );","            }","        });","    },","","    prepend: function() {","        return this.domManip(arguments, true, function( elem ) {","            if ( this.nodeType === 1 || this.nodeType === 11 ) {","                this.insertBefore( elem, this.firstChild );","            }","        });","    },","","    before: function() {","        if ( !isDisconnected( this[0] ) ) {","            return this.domManip(arguments, false, function( elem ) {","                this.parentNode.insertBefore( elem, this );","            });","        }","","        if ( arguments.length ) {","            var set = jQuery.clean( arguments );","            return this.pushStack( jQuery.merge( set, this ), \"before\", this.selector );","        }","    },","","    after: function() {","        if ( !isDisconnected( this[0] ) ) {","            return this.domManip(arguments, false, function( elem ) {","                this.parentNode.insertBefore( elem, this.nextSibling );","            });","        }","","        if ( arguments.length ) {","            var set = jQuery.clean( arguments );","            return this.pushStack( jQuery.merge( this, set ), \"after\", this.selector );","        }","    },","","    // keepData is for internal use only--do not document","    remove: function( selector, keepData ) {","        var elem,","            i = 0;","","        for ( ; (elem = this[i]) != null; i++ ) {","            if ( !selector || jQuery.filter( selector, [ elem ] ).length ) {","                if ( !keepData && elem.nodeType === 1 ) {","                    jQuery.cleanData( elem.getElementsByTagName(\"*\") );","                    jQuery.cleanData( [ elem ] );","                }","","                if ( elem.parentNode ) {","                    elem.parentNode.removeChild( elem );","                }","            }","        }","","        return this;","    },","","    empty: function() {","        var elem,","            i = 0;","","        for ( ; (elem = this[i]) != null; i++ ) {","            // Remove element nodes and prevent memory leaks","            if ( elem.nodeType === 1 ) {","                jQuery.cleanData( elem.getElementsByTagName(\"*\") );","            }","","            // Remove any remaining nodes","            while ( elem.firstChild ) {","                elem.removeChild( elem.firstChild );","            }","        }","","        return this;","    },","","    clone: function( dataAndEvents, deepDataAndEvents ) {","        dataAndEvents = dataAndEvents == null ? false : dataAndEvents;","        deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;","","        return this.map( function () {","            return jQuery.clone( this, dataAndEvents, deepDataAndEvents );","        });","    },","","    html: function( value ) {","        return jQuery.access( this, function( value ) {","            var elem = this[0] || {},","                i = 0,","                l = this.length;","","            if ( value === undefined ) {","                return elem.nodeType === 1 ?","                    elem.innerHTML.replace( rinlinejQuery, \"\" ) :","                    undefined;","            }","","            // See if we can take a shortcut and just use innerHTML","            if ( typeof value === \"string\" && !rnoInnerhtml.test( value ) &&","                ( jQuery.support.htmlSerialize || !rnoshimcache.test( value )  ) &&","                ( jQuery.support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&","                !wrapMap[ ( rtagName.exec( value ) || [\"\", \"\"] )[1].toLowerCase() ] ) {","","                value = value.replace( rxhtmlTag, \"<$1></$2>\" );","","                try {","                    for (; i < l; i++ ) {","                        // Remove element nodes and prevent memory leaks","                        elem = this[i] || {};","                        if ( elem.nodeType === 1 ) {","                            jQuery.cleanData( elem.getElementsByTagName( \"*\" ) );","                            elem.innerHTML = value;","                        }","                    }","","                    elem = 0;","","                // If using innerHTML throws an exception, use the fallback method","                } catch(e) {}","            }","","            if ( elem ) {","                this.empty().append( value );","            }","        }, null, value, arguments.length );","    },","","    replaceWith: function( value ) {","        if ( !isDisconnected( this[0] ) ) {","            // Make sure that the elements are removed from the DOM before they are inserted","            // this can help fix replacing a parent with child elements","            if ( jQuery.isFunction( value ) ) {","                return this.each(function(i) {","                    var self = jQuery(this), old = self.html();","                    self.replaceWith( value.call( this, i, old ) );","                });","            }","","            if ( typeof value !== \"string\" ) {","                value = jQuery( value ).detach();","            }","","            return this.each(function() {","                var next = this.nextSibling,","                    parent = this.parentNode;","","                jQuery( this ).remove();","","                if ( next ) {","                    jQuery(next).before( value );","                } else {","                    jQuery(parent).append( value );","                }","            });","        }","","        return this.length ?","            this.pushStack( jQuery(jQuery.isFunction(value) ? value() : value), \"replaceWith\", value ) :","            this;","    },","","    detach: function( selector ) {","        return this.remove( selector, true );","    },","","    domManip: function( args, table, callback ) {","","        // Flatten any nested arrays","        args = [].concat.apply( [], args );","","        var results, first, fragment, iNoClone,","            i = 0,","            value = args[0],","            scripts = [],","            l = this.length;","","        // We can't cloneNode fragments that contain checked, in WebKit","        if ( !jQuery.support.checkClone && l > 1 && typeof value === \"string\" && rchecked.test( value ) ) {","            return this.each(function() {","                jQuery(this).domManip( args, table, callback );","            });","        }","","        if ( jQuery.isFunction(value) ) {","            return this.each(function(i) {","                var self = jQuery(this);","                args[0] = value.call( this, i, table ? self.html() : undefined );","                self.domManip( args, table, callback );","            });","        }","","        if ( this[0] ) {","            results = jQuery.buildFragment( args, this, scripts );","            fragment = results.fragment;","            first = fragment.firstChild;","","            if ( fragment.childNodes.length === 1 ) {","                fragment = first;","            }","","            if ( first ) {","                table = table && jQuery.nodeName( first, \"tr\" );","","                // Use the original fragment for the last item instead of the first because it can end up","                // being emptied incorrectly in certain situations (#8070).","                // Fragments from the fragment cache must always be cloned and never used in place.","                for ( iNoClone = results.cacheable || l - 1; i < l; i++ ) {","                    callback.call(","                        table && jQuery.nodeName( this[i], \"table\" ) ?","                            findOrAppend( this[i], \"tbody\" ) :","                            this[i],","                        i === iNoClone ?","                            fragment :","                            jQuery.clone( fragment, true, true )","                    );","                }","            }","","            // Fix #11809: Avoid leaking memory","            fragment = first = null;","","            if ( scripts.length ) {","                jQuery.each( scripts, function( i, elem ) {","                    if ( elem.src ) {","                        if ( jQuery.ajax ) {","                            jQuery.ajax({","                                url: elem.src,","                                type: \"GET\",","                                dataType: \"script\",","                                async: false,","                                global: false,","                                \"throws\": true","                            });","                        } else {","                            jQuery.error(\"no ajax\");","                        }","                    } else {","                        jQuery.globalEval( ( elem.text || elem.textContent || elem.innerHTML || \"\" ).replace( rcleanScript, \"\" ) );","                    }","","                    if ( elem.parentNode ) {","                        elem.parentNode.removeChild( elem );","                    }","                });","            }","        }","","        return this;","    }","});","","function findOrAppend( elem, tag ) {","    return elem.getElementsByTagName( tag )[0] || elem.appendChild( elem.ownerDocument.createElement( tag ) );","}","","function cloneCopyEvent( src, dest ) {","","    if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {","        return;","    }","","    var type, i, l,","        oldData = jQuery._data( src ),","        curData = jQuery._data( dest, oldData ),","        events = oldData.events;","","    if ( events ) {","        delete curData.handle;","        curData.events = {};","","        for ( type in events ) {","            for ( i = 0, l = events[ type ].length; i < l; i++ ) {","                jQuery.event.add( dest, type, events[ type ][ i ] );","            }","        }","    }","","    // make the cloned public data object a copy from the original","    if ( curData.data ) {","        curData.data = jQuery.extend( {}, curData.data );","    }","}","","function cloneFixAttributes( src, dest ) {","    var nodeName;","","    // We do not need to do anything for non-Elements","    if ( dest.nodeType !== 1 ) {","        return;","    }","","    // clearAttributes removes the attributes, which we don't want,","    // but also removes the attachEvent events, which we *do* want","    if ( dest.clearAttributes ) {","        dest.clearAttributes();","    }","","    // mergeAttributes, in contrast, only merges back on the","    // original attributes, not the events","    if ( dest.mergeAttributes ) {","        dest.mergeAttributes( src );","    }","","    nodeName = dest.nodeName.toLowerCase();","","    if ( nodeName === \"object\" ) {","        // IE6-10 improperly clones children of object elements using classid.","        // IE10 throws NoModificationAllowedError if parent is null, #12132.","        if ( dest.parentNode ) {","            dest.outerHTML = src.outerHTML;","        }","","        // This path appears unavoidable for IE9. When cloning an object","        // element in IE9, the outerHTML strategy above is not sufficient.","        // If the src has innerHTML and the destination does not,","        // copy the src.innerHTML into the dest.innerHTML. #10324","        if ( jQuery.support.html5Clone && (src.innerHTML && !jQuery.trim(dest.innerHTML)) ) {","            dest.innerHTML = src.innerHTML;","        }","","    } else if ( nodeName === \"input\" && rcheckableType.test( src.type ) ) {","        // IE6-8 fails to persist the checked state of a cloned checkbox","        // or radio button. Worse, IE6-7 fail to give the cloned element","        // a checked appearance if the defaultChecked value isn't also set","","        dest.defaultChecked = dest.checked = src.checked;","","        // IE6-7 get confused and end up setting the value of a cloned","        // checkbox/radio button to an empty string instead of \"on\"","        if ( dest.value !== src.value ) {","            dest.value = src.value;","        }","","    // IE6-8 fails to return the selected option to the default selected","    // state when cloning options","    } else if ( nodeName === \"option\" ) {","        dest.selected = src.defaultSelected;","","    // IE6-8 fails to set the defaultValue to the correct value when","    // cloning other types of input fields","    } else if ( nodeName === \"input\" || nodeName === \"textarea\" ) {","        dest.defaultValue = src.defaultValue;","","    // IE blanks contents when cloning scripts","    } else if ( nodeName === \"script\" && dest.text !== src.text ) {","        dest.text = src.text;","    }","","    // Event data gets referenced instead of copied if the expando","    // gets copied too","    dest.removeAttribute( jQuery.expando );","}","","jQuery.buildFragment = function( args, context, scripts ) {","    var fragment, cacheable, cachehit,","        first = args[ 0 ];","","    // Set context from what may come in as undefined or a jQuery collection or a node","    // Updated to fix #12266 where accessing context[0] could throw an exception in IE9/10 &","    // also doubles as fix for #8950 where plain objects caused createDocumentFragment exception","    context = context || document;","    context = !context.nodeType && context[0] || context;","    context = context.ownerDocument || context;","","    // Only cache \"small\" (1/2 KB) HTML strings that are associated with the main document","    // Cloning options loses the selected state, so don't cache them","    // IE 6 doesn't like it when you put <object> or <embed> elements in a fragment","    // Also, WebKit does not clone 'checked' attributes on cloneNode, so don't cache","    // Lastly, IE6,7,8 will not correctly reuse cached fragments that were created from unknown elems #10501","    if ( args.length === 1 && typeof first === \"string\" && first.length < 512 && context === document &&","        first.charAt(0) === \"<\" && !rnocache.test( first ) &&","        (jQuery.support.checkClone || !rchecked.test( first )) &&","        (jQuery.support.html5Clone || !rnoshimcache.test( first )) ) {","","        // Mark cacheable and look for a hit","        cacheable = true;","        fragment = jQuery.fragments[ first ];","        cachehit = fragment !== undefined;","    }","","    if ( !fragment ) {","        fragment = context.createDocumentFragment();","        jQuery.clean( args, context, fragment, scripts );","","        // Update the cache, but only store false","        // unless this is a second parsing of the same content","        if ( cacheable ) {","            jQuery.fragments[ first ] = cachehit && fragment;","        }","    }","","    return { fragment: fragment, cacheable: cacheable };","};","","jQuery.fragments = {};","","jQuery.each({","    appendTo: \"append\",","    prependTo: \"prepend\",","    insertBefore: \"before\",","    insertAfter: \"after\",","    replaceAll: \"replaceWith\"","}, function( name, original ) {","    jQuery.fn[ name ] = function( selector ) {","        var elems,","            i = 0,","            ret = [],","            insert = jQuery( selector ),","            l = insert.length,","            parent = this.length === 1 && this[0].parentNode;","","        if ( (parent == null || parent && parent.nodeType === 11 && parent.childNodes.length === 1) && l === 1 ) {","            insert[ original ]( this[0] );","            return this;","        } else {","            for ( ; i < l; i++ ) {","                elems = ( i > 0 ? this.clone(true) : this ).get();","                jQuery( insert[i] )[ original ]( elems );","                ret = ret.concat( elems );","            }","","            return this.pushStack( ret, name, insert.selector );","        }","    };","});","","function getAll( elem ) {","    if ( typeof elem.getElementsByTagName !== \"undefined\" ) {","        return elem.getElementsByTagName( \"*\" );","","    } else if ( typeof elem.querySelectorAll !== \"undefined\" ) {","        return elem.querySelectorAll( \"*\" );","","    } else {","        return [];","    }","}","","// Used in clean, fixes the defaultChecked property","function fixDefaultChecked( elem ) {","    if ( rcheckableType.test( elem.type ) ) {","        elem.defaultChecked = elem.checked;","    }","}","","jQuery.extend({","    clone: function( elem, dataAndEvents, deepDataAndEvents ) {","        var srcElements,","            destElements,","            i,","            clone;","","        if ( jQuery.support.html5Clone || jQuery.isXMLDoc(elem) || !rnoshimcache.test( \"<\" + elem.nodeName + \">\" ) ) {","            clone = elem.cloneNode( true );","","        // IE<=8 does not properly clone detached, unknown element nodes","        } else {","            fragmentDiv.innerHTML = elem.outerHTML;","            fragmentDiv.removeChild( clone = fragmentDiv.firstChild );","        }","","        if ( (!jQuery.support.noCloneEvent || !jQuery.support.noCloneChecked) &&","                (elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem) ) {","            // IE copies events bound via attachEvent when using cloneNode.","            // Calling detachEvent on the clone will also remove the events","            // from the original. In order to get around this, we use some","            // proprietary methods to clear the events. Thanks to MooTools","            // guys for this hotness.","","            cloneFixAttributes( elem, clone );","","            // Using Sizzle here is crazy slow, so we use getElementsByTagName instead","            srcElements = getAll( elem );","            destElements = getAll( clone );","","            // Weird iteration because IE will replace the length property","            // with an element if you are cloning the body and one of the","            // elements on the page has a name or id of \"length\"","            for ( i = 0; srcElements[i]; ++i ) {","                // Ensure that the destination node is not null; Fixes #9587","                if ( destElements[i] ) {","                    cloneFixAttributes( srcElements[i], destElements[i] );","                }","            }","        }","","        // Copy the events from the original to the clone","        if ( dataAndEvents ) {","            cloneCopyEvent( elem, clone );","","            if ( deepDataAndEvents ) {","                srcElements = getAll( elem );","                destElements = getAll( clone );","","                for ( i = 0; srcElements[i]; ++i ) {","                    cloneCopyEvent( srcElements[i], destElements[i] );","                }","            }","        }","","        srcElements = destElements = null;","","        // Return the cloned set","        return clone;","    },","","    clean: function( elems, context, fragment, scripts ) {","        var i, j, elem, tag, wrap, depth, div, hasBody, tbody, len, handleScript, jsTags,","            safe = context === document && safeFragment,","            ret = [];","","        // Ensure that context is a document","        if ( !context || typeof context.createDocumentFragment === \"undefined\" ) {","            context = document;","        }","","        // Use the already-created safe fragment if context permits","        for ( i = 0; (elem = elems[i]) != null; i++ ) {","            if ( typeof elem === \"number\" ) {","                elem += \"\";","            }","","            if ( !elem ) {","                continue;","            }","","            // Convert html string into DOM nodes","            if ( typeof elem === \"string\" ) {","                if ( !rhtml.test( elem ) ) {","                    elem = context.createTextNode( elem );","                } else {","                    // Ensure a safe container in which to render the html","                    safe = safe || createSafeFragment( context );","                    div = context.createElement(\"div\");","                    safe.appendChild( div );","","                    // Fix \"XHTML\"-style tags in all browsers","                    elem = elem.replace(rxhtmlTag, \"<$1></$2>\");","","                    // Go to html and back, then peel off extra wrappers","                    tag = ( rtagName.exec( elem ) || [\"\", \"\"] )[1].toLowerCase();","                    wrap = wrapMap[ tag ] || wrapMap._default;","                    depth = wrap[0];","                    div.innerHTML = wrap[1] + elem + wrap[2];","","                    // Move to the right depth","                    while ( depth-- ) {","                        div = div.lastChild;","                    }","","                    // Remove IE's autoinserted <tbody> from table fragments","                    if ( !jQuery.support.tbody ) {","","                        // String was a <table>, *may* have spurious <tbody>","                        hasBody = rtbody.test(elem);","                            tbody = tag === \"table\" && !hasBody ?","                                div.firstChild && div.firstChild.childNodes :","","                                // String was a bare <thead> or <tfoot>","                                wrap[1] === \"<table>\" && !hasBody ?","                                    div.childNodes :","                                    [];","","                        for ( j = tbody.length - 1; j >= 0 ; --j ) {","                            if ( jQuery.nodeName( tbody[ j ], \"tbody\" ) && !tbody[ j ].childNodes.length ) {","                                tbody[ j ].parentNode.removeChild( tbody[ j ] );","                            }","                        }","                    }","","                    // IE completely kills leading whitespace when innerHTML is used","                    if ( !jQuery.support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {","                        div.insertBefore( context.createTextNode( rleadingWhitespace.exec(elem)[0] ), div.firstChild );","                    }","","                    elem = div.childNodes;","","                    // Take out of fragment container (we need a fresh div each time)","                    div.parentNode.removeChild( div );","                }","            }","","            if ( elem.nodeType ) {","                ret.push( elem );","            } else {","                jQuery.merge( ret, elem );","            }","        }","","        // Fix #11356: Clear elements from safeFragment","        if ( div ) {","            elem = div = safe = null;","        }","","        // Reset defaultChecked for any radios and checkboxes","        // about to be appended to the DOM in IE 6/7 (#8060)","        if ( !jQuery.support.appendChecked ) {","            for ( i = 0; (elem = ret[i]) != null; i++ ) {","                if ( jQuery.nodeName( elem, \"input\" ) ) {","                    fixDefaultChecked( elem );","                } else if ( typeof elem.getElementsByTagName !== \"undefined\" ) {","                    jQuery.grep( elem.getElementsByTagName(\"input\"), fixDefaultChecked );","                }","            }","        }","","        // Append elements to a provided document fragment","        if ( fragment ) {","            // Special handling of each script element","            handleScript = function( elem ) {","                // Check if we consider it executable","                if ( !elem.type || rscriptType.test( elem.type ) ) {","                    // Detach the script and store it in the scripts array (if provided) or the fragment","                    // Return truthy to indicate that it has been handled","                    return scripts ?","                        scripts.push( elem.parentNode ? elem.parentNode.removeChild( elem ) : elem ) :","                        fragment.appendChild( elem );","                }","            };","","            for ( i = 0; (elem = ret[i]) != null; i++ ) {","                // Check if we're done after handling an executable script","                if ( !( jQuery.nodeName( elem, \"script\" ) && handleScript( elem ) ) ) {","                    // Append to fragment and handle embedded scripts","                    fragment.appendChild( elem );","                    if ( typeof elem.getElementsByTagName !== \"undefined\" ) {","                        // handleScript alters the DOM, so use jQuery.merge to ensure snapshot iteration","                        jsTags = jQuery.grep( jQuery.merge( [], elem.getElementsByTagName(\"script\") ), handleScript );","","                        // Splice the scripts into ret after their former ancestor and advance our index beyond them","                        ret.splice.apply( ret, [i + 1, 0].concat( jsTags ) );","                        i += jsTags.length;","                    }","                }","            }","        }","","        return ret;","    },","","    cleanData: function( elems, /* internal */ acceptData ) {","        var data, id, elem, type,","            i = 0,","            internalKey = jQuery.expando,","            cache = jQuery.cache,","            deleteExpando = jQuery.support.deleteExpando,","            special = jQuery.event.special;","","        for ( ; (elem = elems[i]) != null; i++ ) {","","            if ( acceptData || jQuery.acceptData( elem ) ) {","","                id = elem[ internalKey ];","                data = id && cache[ id ];","","                if ( data ) {","                    if ( data.events ) {","                        for ( type in data.events ) {","                            if ( special[ type ] ) {","                                jQuery.event.remove( elem, type );","","                            // This is a shortcut to avoid jQuery.event.remove's overhead","                            } else {","                                jQuery.removeEvent( elem, type, data.handle );","                            }","                        }","                    }","","                    // Remove cache only if it was not already removed by jQuery.event.remove","                    if ( cache[ id ] ) {","","                        delete cache[ id ];","","                        // IE does not allow us to delete expando properties from nodes,","                        // nor does it have a removeAttribute function on Document nodes;","                        // we must handle all of these cases","                        if ( deleteExpando ) {","                            delete elem[ internalKey ];","","                        } else if ( elem.removeAttribute ) {","                            elem.removeAttribute( internalKey );","","                        } else {","                            elem[ internalKey ] = null;","                        }","","                        jQuery.deletedIds.push( id );","                    }","                }","            }","        }","    }","});","// Limit scope pollution from any deprecated API","(function() {","","var matched, browser;","","// Use of jQuery.browser is frowned upon.","// More details: http://api.jquery.com/jQuery.browser","// jQuery.uaMatch maintained for back-compat","jQuery.uaMatch = function( ua ) {","    ua = ua.toLowerCase();","","    var match = /(chrome)[ \\/]([\\w.]+)/.exec( ua ) ||","        /(webkit)[ \\/]([\\w.]+)/.exec( ua ) ||","        /(opera)(?:.*version|)[ \\/]([\\w.]+)/.exec( ua ) ||","        /(msie) ([\\w.]+)/.exec( ua ) ||","        ua.indexOf(\"compatible\") < 0 && /(mozilla)(?:.*? rv:([\\w.]+)|)/.exec( ua ) ||","        [];","","    return {","        browser: match[ 1 ] || \"\",","        version: match[ 2 ] || \"0\"","    };","};","","matched = jQuery.uaMatch( navigator.userAgent );","browser = {};","","if ( matched.browser ) {","    browser[ matched.browser ] = true;","    browser.version = matched.version;","}","","// Chrome is Webkit, but Webkit is also Safari.","if ( browser.chrome ) {","    browser.webkit = true;","} else if ( browser.webkit ) {","    browser.safari = true;","}","","jQuery.browser = browser;","","jQuery.sub = function() {","    function jQuerySub( selector, context ) {","        return new jQuerySub.fn.init( selector, context );","    }","    jQuery.extend( true, jQuerySub, this );","    jQuerySub.superclass = this;","    jQuerySub.fn = jQuerySub.prototype = this();","    jQuerySub.fn.constructor = jQuerySub;","    jQuerySub.sub = this.sub;","    jQuerySub.fn.init = function init( selector, context ) {","        if ( context && context instanceof jQuery && !(context instanceof jQuerySub) ) {","            context = jQuerySub( context );","        }","","        return jQuery.fn.init.call( this, selector, context, rootjQuerySub );","    };","    jQuerySub.fn.init.prototype = jQuerySub.fn;","    var rootjQuerySub = jQuerySub(document);","    return jQuerySub;","};","","})();","var curCSS, iframe, iframeDoc,","    ralpha = /alpha\\([^)]*\\)/i,","    ropacity = /opacity=([^)]*)/,","    rposition = /^(top|right|bottom|left)$/,","    // swappable if display is none or starts with table except \"table\", \"table-cell\", or \"table-caption\"","    // see here for display values: https://developer.mozilla.org/en-US/docs/CSS/display","    rdisplayswap = /^(none|table(?!-c[ea]).+)/,","    rmargin = /^margin/,","    rnumsplit = new RegExp( \"^(\" + core_pnum + \")(.*)$\", \"i\" ),","    rnumnonpx = new RegExp( \"^(\" + core_pnum + \")(?!px)[a-z%]+$\", \"i\" ),","    rrelNum = new RegExp( \"^([-+])=(\" + core_pnum + \")\", \"i\" ),","    elemdisplay = {},","","    cssShow = { position: \"absolute\", visibility: \"hidden\", display: \"block\" },","    cssNormalTransform = {","        letterSpacing: 0,","        fontWeight: 400","    },","","    cssExpand = [ \"Top\", \"Right\", \"Bottom\", \"Left\" ],","    cssPrefixes = [ \"Webkit\", \"O\", \"Moz\", \"ms\" ],","","    eventsToggle = jQuery.fn.toggle;","","// return a css property mapped to a potentially vendor prefixed property","function vendorPropName( style, name ) {","","    // shortcut for names that are not vendor prefixed","    if ( name in style ) {","        return name;","    }","","    // check for vendor prefixed names","    var capName = name.charAt(0).toUpperCase() + name.slice(1),","        origName = name,","        i = cssPrefixes.length;","","    while ( i-- ) {","        name = cssPrefixes[ i ] + capName;","        if ( name in style ) {","            return name;","        }","    }","","    return origName;","}","","function isHidden( elem, el ) {","    elem = el || elem;","    return jQuery.css( elem, \"display\" ) === \"none\" || !jQuery.contains( elem.ownerDocument, elem );","}","","function showHide( elements, show ) {","    var elem, display,","        values = [],","        index = 0,","        length = elements.length;","","    for ( ; index < length; index++ ) {","        elem = elements[ index ];","        if ( !elem.style ) {","            continue;","        }","        values[ index ] = jQuery._data( elem, \"olddisplay\" );","        if ( show ) {","            // Reset the inline display of this element to learn if it is","            // being hidden by cascaded rules or not","            if ( !values[ index ] && elem.style.display === \"none\" ) {","                elem.style.display = \"\";","            }","","            // Set elements which have been overridden with display: none","            // in a stylesheet to whatever the default browser style is","            // for such an element","            if ( elem.style.display === \"\" && isHidden( elem ) ) {","                values[ index ] = jQuery._data( elem, \"olddisplay\", css_defaultDisplay(elem.nodeName) );","            }","        } else {","            display = curCSS( elem, \"display\" );","","            if ( !values[ index ] && display !== \"none\" ) {","                jQuery._data( elem, \"olddisplay\", display );","            }","        }","    }","","    // Set the display of most of the elements in a second loop","    // to avoid the constant reflow","    for ( index = 0; index < length; index++ ) {","        elem = elements[ index ];","        if ( !elem.style ) {","            continue;","        }","        if ( !show || elem.style.display === \"none\" || elem.style.display === \"\" ) {","            elem.style.display = show ? values[ index ] || \"\" : \"none\";","        }","    }","","    return elements;","}","","jQuery.fn.extend({","    css: function( name, value ) {","        return jQuery.access( this, function( elem, name, value ) {","            return value !== undefined ?","                jQuery.style( elem, name, value ) :","                jQuery.css( elem, name );","        }, name, value, arguments.length > 1 );","    },","    show: function() {","        return showHide( this, true );","    },","    hide: function() {","        return showHide( this );","    },","    toggle: function( state, fn2 ) {","        var bool = typeof state === \"boolean\";","","        if ( jQuery.isFunction( state ) && jQuery.isFunction( fn2 ) ) {","            return eventsToggle.apply( this, arguments );","        }","","        return this.each(function() {","            if ( bool ? state : isHidden( this ) ) {","                jQuery( this ).show();","            } else {","                jQuery( this ).hide();","            }","        });","    }","});","","jQuery.extend({","    // Add in style property hooks for overriding the default","    // behavior of getting and setting a style property","    cssHooks: {","        opacity: {","            get: function( elem, computed ) {","                if ( computed ) {","                    // We should always get a number back from opacity","                    var ret = curCSS( elem, \"opacity\" );","                    return ret === \"\" ? \"1\" : ret;","","                }","            }","        }","    },","","    // Exclude the following css properties to add px","    cssNumber: {","        \"fillOpacity\": true,","        \"fontWeight\": true,","        \"lineHeight\": true,","        \"opacity\": true,","        \"orphans\": true,","        \"widows\": true,","        \"zIndex\": true,","        \"zoom\": true","    },","","    // Add in properties whose names you wish to fix before","    // setting or getting the value","    cssProps: {","        // normalize float css property","        \"float\": jQuery.support.cssFloat ? \"cssFloat\" : \"styleFloat\"","    },","","    // Get and set the style property on a DOM Node","    style: function( elem, name, value, extra ) {","        // Don't set styles on text and comment nodes","        if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {","            return;","        }","","        // Make sure that we're working with the right name","        var ret, type, hooks,","            origName = jQuery.camelCase( name ),","            style = elem.style;","","        name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );","","        // gets hook for the prefixed version","        // followed by the unprefixed version","        hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];","","        // Check if we're setting a value","        if ( value !== undefined ) {","            type = typeof value;","","            // convert relative number strings (+= or -=) to relative numbers. #7345","            if ( type === \"string\" && (ret = rrelNum.exec( value )) ) {","                value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );","                // Fixes bug #9237","                type = \"number\";","            }","","            // Make sure that NaN and null values aren't set. See: #7116","            if ( value == null || type === \"number\" && isNaN( value ) ) {","                return;","            }","","            // If a number was passed in, add 'px' to the (except for certain CSS properties)","            if ( type === \"number\" && !jQuery.cssNumber[ origName ] ) {","                value += \"px\";","            }","","            // If a hook was provided, use that value, otherwise just set the specified value","            if ( !hooks || !(\"set\" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {","                // Wrapped to prevent IE from throwing errors when 'invalid' values are provided","                // Fixes bug #5509","                try {","                    style[ name ] = value;","                } catch(e) {}","            }","","        } else {","            // If a hook was provided get the non-computed value from there","            if ( hooks && \"get\" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {","                return ret;","            }","","            // Otherwise just get the value from the style object","            return style[ name ];","        }","    },","","    css: function( elem, name, numeric, extra ) {","        var val, num, hooks,","            origName = jQuery.camelCase( name );","","        // Make sure that we're working with the right name","        name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );","","        // gets hook for the prefixed version","        // followed by the unprefixed version","        hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];","","        // If a hook was provided get the computed value from there","        if ( hooks && \"get\" in hooks ) {","            val = hooks.get( elem, true, extra );","        }","","        // Otherwise, if a way to get the computed value exists, use that","        if ( val === undefined ) {","            val = curCSS( elem, name );","        }","","        //convert \"normal\" to computed value","        if ( val === \"normal\" && name in cssNormalTransform ) {","            val = cssNormalTransform[ name ];","        }","","        // Return, converting to number if forced or a qualifier was provided and val looks numeric","        if ( numeric || extra !== undefined ) {","            num = parseFloat( val );","            return numeric || jQuery.isNumeric( num ) ? num || 0 : val;","        }","        return val;","    },","","    // A method for quickly swapping in/out CSS properties to get correct calculations","    swap: function( elem, options, callback ) {","        var ret, name,","            old = {};","","        // Remember the old values, and insert the new ones","        for ( name in options ) {","            old[ name ] = elem.style[ name ];","            elem.style[ name ] = options[ name ];","        }","","        ret = callback.call( elem );","","        // Revert the old values","        for ( name in options ) {","            elem.style[ name ] = old[ name ];","        }","","        return ret;","    }","});","","// NOTE: To any future maintainer, we've window.getComputedStyle","// because jsdom on node.js will break without it.","if ( window.getComputedStyle ) {","    curCSS = function( elem, name ) {","        var ret, width, minWidth, maxWidth,","            computed = window.getComputedStyle( elem, null ),","            style = elem.style;","","        if ( computed ) {","","            ret = computed[ name ];","            if ( ret === \"\" && !jQuery.contains( elem.ownerDocument, elem ) ) {","                ret = jQuery.style( elem, name );","            }","","            // A tribute to the \"awesome hack by Dean Edwards\"","            // Chrome < 17 and Safari 5.0 uses \"computed value\" instead of \"used value\" for margin-right","            // Safari 5.1.7 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels","            // this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values","            if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {","                width = style.width;","                minWidth = style.minWidth;","                maxWidth = style.maxWidth;","","                style.minWidth = style.maxWidth = style.width = ret;","                ret = computed.width;","","                style.width = width;","                style.minWidth = minWidth;","                style.maxWidth = maxWidth;","            }","        }","","        return ret;","    };","} else if ( document.documentElement.currentStyle ) {","    curCSS = function( elem, name ) {","        var left, rsLeft,","            ret = elem.currentStyle && elem.currentStyle[ name ],","            style = elem.style;","","        // Avoid setting ret to empty string here","        // so we don't default to auto","        if ( ret == null && style && style[ name ] ) {","            ret = style[ name ];","        }","","        // From the awesome hack by Dean Edwards","        // http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291","","        // If we're not dealing with a regular pixel number","        // but a number that has a weird ending, we need to convert it to pixels","        // but not position css attributes, as those are proportional to the parent element instead","        // and we can't measure the parent instead because it might trigger a \"stacking dolls\" problem","        if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {","","            // Remember the original values","            left = style.left;","            rsLeft = elem.runtimeStyle && elem.runtimeStyle.left;","","            // Put in the new values to get a computed value out","            if ( rsLeft ) {","                elem.runtimeStyle.left = elem.currentStyle.left;","            }","            style.left = name === \"fontSize\" ? \"1em\" : ret;","            ret = style.pixelLeft + \"px\";","","            // Revert the changed values","            style.left = left;","            if ( rsLeft ) {","                elem.runtimeStyle.left = rsLeft;","            }","        }","","        return ret === \"\" ? \"auto\" : ret;","    };","}","","function setPositiveNumber( elem, value, subtract ) {","    var matches = rnumsplit.exec( value );","    return matches ?","            Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || \"px\" ) :","            value;","}","","function augmentWidthOrHeight( elem, name, extra, isBorderBox ) {","    var i = extra === ( isBorderBox ? \"border\" : \"content\" ) ?","        // If we already have the right measurement, avoid augmentation","        4 :","        // Otherwise initialize for horizontal or vertical properties","        name === \"width\" ? 1 : 0,","","        val = 0;","","    for ( ; i < 4; i += 2 ) {","        // both box models exclude margin, so add it if we want it","        if ( extra === \"margin\" ) {","            // we use jQuery.css instead of curCSS here","            // because of the reliableMarginRight CSS hook!","            val += jQuery.css( elem, extra + cssExpand[ i ], true );","        }","","        // From this point on we use curCSS for maximum performance (relevant in animations)","        if ( isBorderBox ) {","            // border-box includes padding, so remove it if we want content","            if ( extra === \"content\" ) {","                val -= parseFloat( curCSS( elem, \"padding\" + cssExpand[ i ] ) ) || 0;","            }","","            // at this point, extra isn't border nor margin, so remove border","            if ( extra !== \"margin\" ) {","                val -= parseFloat( curCSS( elem, \"border\" + cssExpand[ i ] + \"Width\" ) ) || 0;","            }","        } else {","            // at this point, extra isn't content, so add padding","            val += parseFloat( curCSS( elem, \"padding\" + cssExpand[ i ] ) ) || 0;","","            // at this point, extra isn't content nor padding, so add border","            if ( extra !== \"padding\" ) {","                val += parseFloat( curCSS( elem, \"border\" + cssExpand[ i ] + \"Width\" ) ) || 0;","            }","        }","    }","","    return val;","}","","function getWidthOrHeight( elem, name, extra ) {","","    // Start with offset property, which is equivalent to the border-box value","    var val = name === \"width\" ? elem.offsetWidth : elem.offsetHeight,","        valueIsBorderBox = true,","        isBorderBox = jQuery.support.boxSizing && jQuery.css( elem, \"boxSizing\" ) === \"border-box\";","","    // some non-html elements return undefined for offsetWidth, so check for null/undefined","    // svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285","    // MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668","    if ( val <= 0 || val == null ) {","        // Fall back to computed then uncomputed css if necessary","        val = curCSS( elem, name );","        if ( val < 0 || val == null ) {","            val = elem.style[ name ];","        }","","        // Computed unit is not pixels. Stop here and return.","        if ( rnumnonpx.test(val) ) {","            return val;","        }","","        // we need the check for style in case a browser which returns unreliable values","        // for getComputedStyle silently falls back to the reliable elem.style","        valueIsBorderBox = isBorderBox && ( jQuery.support.boxSizingReliable || val === elem.style[ name ] );","","        // Normalize \"\", auto, and prepare for extra","        val = parseFloat( val ) || 0;","    }","","    // use the active box-sizing model to add/subtract irrelevant styles","    return ( val +","        augmentWidthOrHeight(","            elem,","            name,","            extra || ( isBorderBox ? \"border\" : \"content\" ),","            valueIsBorderBox","        )","    ) + \"px\";","}","","","// Try to determine the default display value of an element","function css_defaultDisplay( nodeName ) {","    if ( elemdisplay[ nodeName ] ) {","        return elemdisplay[ nodeName ];","    }","","    var elem = jQuery( \"<\" + nodeName + \">\" ).appendTo( document.body ),","        display = elem.css(\"display\");","    elem.remove();","","    // If the simple way fails,","    // get element's real default display by attaching it to a temp iframe","    if ( display === \"none\" || display === \"\" ) {","        // Use the already-created iframe if possible","        iframe = document.body.appendChild(","            iframe || jQuery.extend( document.createElement(\"iframe\"), {","                frameBorder: 0,","                width: 0,","                height: 0","            })","        );","","        // Create a cacheable copy of the iframe document on first call.","        // IE and Opera will allow us to reuse the iframeDoc without re-writing the fake HTML","        // document to it; WebKit & Firefox won't allow reusing the iframe document.","        if ( !iframeDoc || !iframe.createElement ) {","            iframeDoc = ( iframe.contentWindow || iframe.contentDocument ).document;","            iframeDoc.write(\"<!doctype html><html><body>\");","            iframeDoc.close();","        }","","        elem = iframeDoc.body.appendChild( iframeDoc.createElement(nodeName) );","","        display = curCSS( elem, \"display\" );","        document.body.removeChild( iframe );","    }","","    // Store the correct default display","    elemdisplay[ nodeName ] = display;","","    return display;","}","","jQuery.each([ \"height\", \"width\" ], function( i, name ) {","    jQuery.cssHooks[ name ] = {","        get: function( elem, computed, extra ) {","            if ( computed ) {","                // certain elements can have dimension info if we invisibly show them","                // however, it must have a current display style that would benefit from this","                if ( elem.offsetWidth === 0 && rdisplayswap.test( curCSS( elem, \"display\" ) ) ) {","                    return jQuery.swap( elem, cssShow, function() {","                        return getWidthOrHeight( elem, name, extra );","                    });","                } else {","                    return getWidthOrHeight( elem, name, extra );","                }","            }","        },","","        set: function( elem, value, extra ) {","            return setPositiveNumber( elem, value, extra ?","                augmentWidthOrHeight(","                    elem,","                    name,","                    extra,","                    jQuery.support.boxSizing && jQuery.css( elem, \"boxSizing\" ) === \"border-box\"","                ) : 0","            );","        }","    };","});","","if ( !jQuery.support.opacity ) {","    jQuery.cssHooks.opacity = {","        get: function( elem, computed ) {","            // IE uses filters for opacity","            return ropacity.test( (computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || \"\" ) ?","                ( 0.01 * parseFloat( RegExp.$1 ) ) + \"\" :","                computed ? \"1\" : \"\";","        },","","        set: function( elem, value ) {","            var style = elem.style,","                currentStyle = elem.currentStyle,","                opacity = jQuery.isNumeric( value ) ? \"alpha(opacity=\" + value * 100 + \")\" : \"\",","                filter = currentStyle && currentStyle.filter || style.filter || \"\";","","            // IE has trouble with opacity if it does not have layout","            // Force it by setting the zoom level","            style.zoom = 1;","","            // if setting opacity to 1, and no other filters exist - attempt to remove filter attribute #6652","            if ( value >= 1 && jQuery.trim( filter.replace( ralpha, \"\" ) ) === \"\" &&","                style.removeAttribute ) {","","                // Setting style.filter to null, \"\" & \" \" still leave \"filter:\" in the cssText","                // if \"filter:\" is present at all, clearType is disabled, we want to avoid this","                // style.removeAttribute is IE Only, but so apparently is this code path...","                style.removeAttribute( \"filter\" );","","                // if there there is no filter style applied in a css rule, we are done","                if ( currentStyle && !currentStyle.filter ) {","                    return;","                }","            }","","            // otherwise, set new filter values","            style.filter = ralpha.test( filter ) ?","                filter.replace( ralpha, opacity ) :","                filter + \" \" + opacity;","        }","    };","}","","// These hooks cannot be added until DOM ready because the support test","// for it is not run until after DOM ready","jQuery(function() {","    if ( !jQuery.support.reliableMarginRight ) {","        jQuery.cssHooks.marginRight = {","            get: function( elem, computed ) {","                // WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right","                // Work around by temporarily setting element display to inline-block","                return jQuery.swap( elem, { \"display\": \"inline-block\" }, function() {","                    if ( computed ) {","                        return curCSS( elem, \"marginRight\" );","                    }","                });","            }","        };","    }","","    // Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084","    // getComputedStyle returns percent when specified for top/left/bottom/right","    // rather than make the css module depend on the offset module, we just check for it here","    if ( !jQuery.support.pixelPosition && jQuery.fn.position ) {","        jQuery.each( [ \"top\", \"left\" ], function( i, prop ) {","            jQuery.cssHooks[ prop ] = {","                get: function( elem, computed ) {","                    if ( computed ) {","                        var ret = curCSS( elem, prop );","                        // if curCSS returns percentage, fallback to offset","                        return rnumnonpx.test( ret ) ? jQuery( elem ).position()[ prop ] + \"px\" : ret;","                    }","                }","            };","        });","    }","","});","","if ( jQuery.expr && jQuery.expr.filters ) {","    jQuery.expr.filters.hidden = function( elem ) {","        return ( elem.offsetWidth === 0 && elem.offsetHeight === 0 ) || (!jQuery.support.reliableHiddenOffsets && ((elem.style && elem.style.display) || curCSS( elem, \"display\" )) === \"none\");","    };","","    jQuery.expr.filters.visible = function( elem ) {","        return !jQuery.expr.filters.hidden( elem );","    };","}","","// These hooks are used by animate to expand properties","jQuery.each({","    margin: \"\",","    padding: \"\",","    border: \"Width\"","}, function( prefix, suffix ) {","    jQuery.cssHooks[ prefix + suffix ] = {","        expand: function( value ) {","            var i,","","                // assumes a single number if not a string","                parts = typeof value === \"string\" ? value.split(\" \") : [ value ],","                expanded = {};","","            for ( i = 0; i < 4; i++ ) {","                expanded[ prefix + cssExpand[ i ] + suffix ] =","                    parts[ i ] || parts[ i - 2 ] || parts[ 0 ];","            }","","            return expanded;","        }","    };","","    if ( !rmargin.test( prefix ) ) {","        jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;","    }","});","var r20 = /%20/g,","    rbracket = /\\[\\]$/,","    rCRLF = /\\r?\\n/g,","    rinput = /^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,","    rselectTextarea = /^(?:select|textarea)/i;","","jQuery.fn.extend({","    serialize: function() {","        return jQuery.param( this.serializeArray() );","    },","    serializeArray: function() {","        return this.map(function(){","            return this.elements ? jQuery.makeArray( this.elements ) : this;","        })","        .filter(function(){","            return this.name && !this.disabled &&","                ( this.checked || rselectTextarea.test( this.nodeName ) ||","                    rinput.test( this.type ) );","        })","        .map(function( i, elem ){","            var val = jQuery( this ).val();","","            return val == null ?","                null :","                jQuery.isArray( val ) ?","                    jQuery.map( val, function( val, i ){","                        return { name: elem.name, value: val.replace( rCRLF, \"\\r\\n\" ) };","                    }) :","                    { name: elem.name, value: val.replace( rCRLF, \"\\r\\n\" ) };","        }).get();","    }","});","","//Serialize an array of form elements or a set of","//key/values into a query string","jQuery.param = function( a, traditional ) {","    var prefix,","        s = [],","        add = function( key, value ) {","            // If value is a function, invoke it and return its value","            value = jQuery.isFunction( value ) ? value() : ( value == null ? \"\" : value );","            s[ s.length ] = encodeURIComponent( key ) + \"=\" + encodeURIComponent( value );","        };","","    // Set traditional to true for jQuery <= 1.3.2 behavior.","    if ( traditional === undefined ) {","        traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;","    }","","    // If an array was passed in, assume that it is an array of form elements.","    if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {","        // Serialize the form elements","        jQuery.each( a, function() {","            add( this.name, this.value );","        });","","    } else {","        // If traditional, encode the \"old\" way (the way 1.3.2 or older","        // did it), otherwise encode params recursively.","        for ( prefix in a ) {","            buildParams( prefix, a[ prefix ], traditional, add );","        }","    }","","    // Return the resulting serialization","    return s.join( \"&\" ).replace( r20, \"+\" );","};","","function buildParams( prefix, obj, traditional, add ) {","    var name;","","    if ( jQuery.isArray( obj ) ) {","        // Serialize array item.","        jQuery.each( obj, function( i, v ) {","            if ( traditional || rbracket.test( prefix ) ) {","                // Treat each array item as a scalar.","                add( prefix, v );","","            } else {","                // If array item is non-scalar (array or object), encode its","                // numeric index to resolve deserialization ambiguity issues.","                // Note that rack (as of 1.0.0) can't currently deserialize","                // nested arrays properly, and attempting to do so may cause","                // a server error. Possible fixes are to modify rack's","                // deserialization algorithm or to provide an option or flag","                // to force array serialization to be shallow.","                buildParams( prefix + \"[\" + ( typeof v === \"object\" ? i : \"\" ) + \"]\", v, traditional, add );","            }","        });","","    } else if ( !traditional && jQuery.type( obj ) === \"object\" ) {","        // Serialize object item.","        for ( name in obj ) {","            buildParams( prefix + \"[\" + name + \"]\", obj[ name ], traditional, add );","        }","","    } else {","        // Serialize scalar item.","        add( prefix, obj );","    }","}","var","    // Document location","    ajaxLocParts,","    ajaxLocation,","","    rhash = /#.*$/,","    rheaders = /^(.*?):[ \\t]*([^\\r\\n]*)\\r?$/mg, // IE leaves an \\r character at EOL","    // #7653, #8125, #8152: local protocol detection","    rlocalProtocol = /^(?:about|app|app\\-storage|.+\\-extension|file|res|widget):$/,","    rnoContent = /^(?:GET|HEAD)$/,","    rprotocol = /^\\/\\//,","    rquery = /\\?/,","    rscript = /<script\\b[^<]*(?:(?!<\\/script>)<[^<]*)*<\\/script>/gi,","    rts = /([?&])_=[^&]*/,","    rurl = /^([\\w\\+\\.\\-]+:)(?:\\/\\/([^\\/?#:]*)(?::(\\d+)|)|)/,","","    // Keep a copy of the old load method","    _load = jQuery.fn.load,","","    /* Prefilters","     * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)","     * 2) These are called:","     *    - BEFORE asking for a transport","     *    - AFTER param serialization (s.data is a string if s.processData is true)","     * 3) key is the dataType","     * 4) the catchall symbol \"*\" can be used","     * 5) execution will start with transport dataType and THEN continue down to \"*\" if needed","     */","    prefilters = {},","","    /* Transports bindings","     * 1) key is the dataType","     * 2) the catchall symbol \"*\" can be used","     * 3) selection will start with transport dataType and THEN go to \"*\" if needed","     */","    transports = {},","","    // Avoid comment-prolog char sequence (#10098); must appease lint and evade compression","    allTypes = [\"*/\"] + [\"*\"];","","// #8138, IE may throw an exception when accessing","// a field from window.location if document.domain has been set","try {","    ajaxLocation = location.href;","} catch( e ) {","    // Use the href attribute of an A element","    // since IE will modify it given document.location","    ajaxLocation = document.createElement( \"a\" );","    ajaxLocation.href = \"\";","    ajaxLocation = ajaxLocation.href;","}","","// Segment location into parts","ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];","","// Base \"constructor\" for jQuery.ajaxPrefilter and jQuery.ajaxTransport","function addToPrefiltersOrTransports( structure ) {","","    // dataTypeExpression is optional and defaults to \"*\"","    return function( dataTypeExpression, func ) {","","        if ( typeof dataTypeExpression !== \"string\" ) {","            func = dataTypeExpression;","            dataTypeExpression = \"*\";","        }","","        var dataType, list, placeBefore,","            dataTypes = dataTypeExpression.toLowerCase().split( core_rspace ),","            i = 0,","            length = dataTypes.length;","","        if ( jQuery.isFunction( func ) ) {","            // For each dataType in the dataTypeExpression","            for ( ; i < length; i++ ) {","                dataType = dataTypes[ i ];","                // We control if we're asked to add before","                // any existing element","                placeBefore = /^\\+/.test( dataType );","                if ( placeBefore ) {","                    dataType = dataType.substr( 1 ) || \"*\";","                }","                list = structure[ dataType ] = structure[ dataType ] || [];","                // then we add to the structure accordingly","                list[ placeBefore ? \"unshift\" : \"push\" ]( func );","            }","        }","    };","}","","// Base inspection function for prefilters and transports","function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR,","        dataType /* internal */, inspected /* internal */ ) {","","    dataType = dataType || options.dataTypes[ 0 ];","    inspected = inspected || {};","","    inspected[ dataType ] = true;","","    var selection,","        list = structure[ dataType ],","        i = 0,","        length = list ? list.length : 0,","        executeOnly = ( structure === prefilters );","","    for ( ; i < length && ( executeOnly || !selection ); i++ ) {","        selection = list[ i ]( options, originalOptions, jqXHR );","        // If we got redirected to another dataType","        // we try there if executing only and not done already","        if ( typeof selection === \"string\" ) {","            if ( !executeOnly || inspected[ selection ] ) {","                selection = undefined;","            } else {","                options.dataTypes.unshift( selection );","                selection = inspectPrefiltersOrTransports(","                        structure, options, originalOptions, jqXHR, selection, inspected );","            }","        }","    }","    // If we're only executing or nothing was selected","    // we try the catchall dataType if not done already","    if ( ( executeOnly || !selection ) && !inspected[ \"*\" ] ) {","        selection = inspectPrefiltersOrTransports(","                structure, options, originalOptions, jqXHR, \"*\", inspected );","    }","    // unnecessary when only executing (prefilters)","    // but it'll be ignored by the caller in that case","    return selection;","}","","// A special extend for ajax options","// that takes \"flat\" options (not to be deep extended)","// Fixes #9887","function ajaxExtend( target, src ) {","    var key, deep,","        flatOptions = jQuery.ajaxSettings.flatOptions || {};","    for ( key in src ) {","        if ( src[ key ] !== undefined ) {","            ( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];","        }","    }","    if ( deep ) {","        jQuery.extend( true, target, deep );","    }","}","","jQuery.fn.load = function( url, params, callback ) {","    if ( typeof url !== \"string\" && _load ) {","        return _load.apply( this, arguments );","    }","","    // Don't do a request if no elements are being requested","    if ( !this.length ) {","        return this;","    }","","    var selector, type, response,","        self = this,","        off = url.indexOf(\" \");","","    if ( off >= 0 ) {","        selector = url.slice( off, url.length );","        url = url.slice( 0, off );","    }","","    // If it's a function","    if ( jQuery.isFunction( params ) ) {","","        // We assume that it's the callback","        callback = params;","        params = undefined;","","    // Otherwise, build a param string","    } else if ( params && typeof params === \"object\" ) {","        type = \"POST\";","    }","","    // Request the remote document","    jQuery.ajax({","        url: url,","","        // if \"type\" variable is undefined, then \"GET\" method will be used","        type: type,","        dataType: \"html\",","        data: params,","        complete: function( jqXHR, status ) {","            if ( callback ) {","                self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );","            }","        }","    }).done(function( responseText ) {","","        // Save response for use in complete callback","        response = arguments;","","        // See if a selector was specified","        self.html( selector ?","","            // Create a dummy div to hold the results","            jQuery(\"<div>\")","","                // inject the contents of the document in, removing the scripts","                // to avoid any 'Permission Denied' errors in IE","                .append( responseText.replace( rscript, \"\" ) )","","                // Locate the specified elements","                .find( selector ) :","","            // If not, just inject the full result","            responseText );","","    });","","    return this;","};","","// Attach a bunch of functions for handling common AJAX events","jQuery.each( \"ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend\".split( \" \" ), function( i, o ){","    jQuery.fn[ o ] = function( f ){","        return this.on( o, f );","    };","});","","jQuery.each( [ \"get\", \"post\" ], function( i, method ) {","    jQuery[ method ] = function( url, data, callback, type ) {","        // shift arguments if data argument was omitted","        if ( jQuery.isFunction( data ) ) {","            type = type || callback;","            callback = data;","            data = undefined;","        }","","        return jQuery.ajax({","            type: method,","            url: url,","            data: data,","            success: callback,","            dataType: type","        });","    };","});","","jQuery.extend({","","    getScript: function( url, callback ) {","        return jQuery.get( url, undefined, callback, \"script\" );","    },","","    getJSON: function( url, data, callback ) {","        return jQuery.get( url, data, callback, \"json\" );","    },","","    // Creates a full fledged settings object into target","    // with both ajaxSettings and settings fields.","    // If target is omitted, writes into ajaxSettings.","    ajaxSetup: function( target, settings ) {","        if ( settings ) {","            // Building a settings object","            ajaxExtend( target, jQuery.ajaxSettings );","        } else {","            // Extending ajaxSettings","            settings = target;","            target = jQuery.ajaxSettings;","        }","        ajaxExtend( target, settings );","        return target;","    },","","    ajaxSettings: {","        url: ajaxLocation,","        isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),","        global: true,","        type: \"GET\",","        contentType: \"application/x-www-form-urlencoded; charset=UTF-8\",","        processData: true,","        async: true,","        /*","        timeout: 0,","        data: null,","        dataType: null,","        username: null,","        password: null,","        cache: null,","        throws: false,","        traditional: false,","        headers: {},","        */","","        accepts: {","            xml: \"application/xml, text/xml\",","            html: \"text/html\",","            text: \"text/plain\",","            json: \"application/json, text/javascript\",","            \"*\": allTypes","        },","","        contents: {","            xml: /xml/,","            html: /html/,","            json: /json/","        },","","        responseFields: {","            xml: \"responseXML\",","            text: \"responseText\"","        },","","        // List of data converters","        // 1) key format is \"source_type destination_type\" (a single space in-between)","        // 2) the catchall symbol \"*\" can be used for source_type","        converters: {","","            // Convert anything to text","            \"* text\": window.String,","","            // Text to html (true = no transformation)","            \"text html\": true,","","            // Evaluate text as a json expression","            \"text json\": jQuery.parseJSON,","","            // Parse text as xml","            \"text xml\": jQuery.parseXML","        },","","        // For options that shouldn't be deep extended:","        // you can add your own custom options here if","        // and when you create one that shouldn't be","        // deep extended (see ajaxExtend)","        flatOptions: {","            context: true,","            url: true","        }","    },","","    ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),","    ajaxTransport: addToPrefiltersOrTransports( transports ),","","    // Main method","    ajax: function( url, options ) {","","        // If url is an object, simulate pre-1.5 signature","        if ( typeof url === \"object\" ) {","            options = url;","            url = undefined;","        }","","        // Force options to be an object","        options = options || {};","","        var // ifModified key","            ifModifiedKey,","            // Response headers","            responseHeadersString,","            responseHeaders,","            // transport","            transport,","            // timeout handle","            timeoutTimer,","            // Cross-domain detection vars","            parts,","            // To know if global events are to be dispatched","            fireGlobals,","            // Loop variable","            i,","            // Create the final options object","            s = jQuery.ajaxSetup( {}, options ),","            // Callbacks context","            callbackContext = s.context || s,","            // Context for global events","            // It's the callbackContext if one was provided in the options","            // and if it's a DOM node or a jQuery collection","            globalEventContext = callbackContext !== s &&","                ( callbackContext.nodeType || callbackContext instanceof jQuery ) ?","                        jQuery( callbackContext ) : jQuery.event,","            // Deferreds","            deferred = jQuery.Deferred(),","            completeDeferred = jQuery.Callbacks( \"once memory\" ),","            // Status-dependent callbacks","            statusCode = s.statusCode || {},","            // Headers (they are sent all at once)","            requestHeaders = {},","            requestHeadersNames = {},","            // The jqXHR state","            state = 0,","            // Default abort message","            strAbort = \"canceled\",","            // Fake xhr","            jqXHR = {","","                readyState: 0,","","                // Caches the header","                setRequestHeader: function( name, value ) {","                    if ( !state ) {","                        var lname = name.toLowerCase();","                        name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;","                        requestHeaders[ name ] = value;","                    }","                    return this;","                },","","                // Raw string","                getAllResponseHeaders: function() {","                    return state === 2 ? responseHeadersString : null;","                },","","                // Builds headers hashtable if needed","                getResponseHeader: function( key ) {","                    var match;","                    if ( state === 2 ) {","                        if ( !responseHeaders ) {","                            responseHeaders = {};","                            while( ( match = rheaders.exec( responseHeadersString ) ) ) {","                                responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];","                            }","                        }","                        match = responseHeaders[ key.toLowerCase() ];","                    }","                    return match === undefined ? null : match;","                },","","                // Overrides response content-type header","                overrideMimeType: function( type ) {","                    if ( !state ) {","                        s.mimeType = type;","                    }","                    return this;","                },","","                // Cancel the request","                abort: function( statusText ) {","                    statusText = statusText || strAbort;","                    if ( transport ) {","                        transport.abort( statusText );","                    }","                    done( 0, statusText );","                    return this;","                }","            };","","        // Callback for when everything is done","        // It is defined here because jslint complains if it is declared","        // at the end of the function (which would be more logical and readable)","        function done( status, nativeStatusText, responses, headers ) {","            var isSuccess, success, error, response, modified,","                statusText = nativeStatusText;","","            // Called once","            if ( state === 2 ) {","                return;","            }","","            // State is \"done\" now","            state = 2;","","            // Clear timeout if it exists","            if ( timeoutTimer ) {","                clearTimeout( timeoutTimer );","            }","","            // Dereference transport for early garbage collection","            // (no matter how long the jqXHR object will be used)","            transport = undefined;","","            // Cache response headers","            responseHeadersString = headers || \"\";","","            // Set readyState","            jqXHR.readyState = status > 0 ? 4 : 0;","","            // Get response data","            if ( responses ) {","                response = ajaxHandleResponses( s, jqXHR, responses );","            }","","            // If successful, handle type chaining","            if ( status >= 200 && status < 300 || status === 304 ) {","","                // Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.","                if ( s.ifModified ) {","","                    modified = jqXHR.getResponseHeader(\"Last-Modified\");","                    if ( modified ) {","                        jQuery.lastModified[ ifModifiedKey ] = modified;","                    }","                    modified = jqXHR.getResponseHeader(\"Etag\");","                    if ( modified ) {","                        jQuery.etag[ ifModifiedKey ] = modified;","                    }","                }","","                // If not modified","                if ( status === 304 ) {","","                    statusText = \"notmodified\";","                    isSuccess = true;","","                // If we have data","                } else {","","                    isSuccess = ajaxConvert( s, response );","                    statusText = isSuccess.state;","                    success = isSuccess.data;","                    error = isSuccess.error;","                    isSuccess = !error;","                }","            } else {","                // We extract error from statusText","                // then normalize statusText and status for non-aborts","                error = statusText;","                if ( !statusText || status ) {","                    statusText = \"error\";","                    if ( status < 0 ) {","                        status = 0;","                    }","                }","            }","","            // Set data for the fake xhr object","            jqXHR.status = status;","            jqXHR.statusText = ( nativeStatusText || statusText ) + \"\";","","            // Success/Error","            if ( isSuccess ) {","                deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );","            } else {","                deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );","            }","","            // Status-dependent callbacks","            jqXHR.statusCode( statusCode );","            statusCode = undefined;","","            if ( fireGlobals ) {","                globalEventContext.trigger( \"ajax\" + ( isSuccess ? \"Success\" : \"Error\" ),","                        [ jqXHR, s, isSuccess ? success : error ] );","            }","","            // Complete","            completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );","","            if ( fireGlobals ) {","                globalEventContext.trigger( \"ajaxComplete\", [ jqXHR, s ] );","                // Handle the global AJAX counter","                if ( !( --jQuery.active ) ) {","                    jQuery.event.trigger( \"ajaxStop\" );","                }","            }","        }","","        // Attach deferreds","        deferred.promise( jqXHR );","        jqXHR.success = jqXHR.done;","        jqXHR.error = jqXHR.fail;","        jqXHR.complete = completeDeferred.add;","","        // Status-dependent callbacks","        jqXHR.statusCode = function( map ) {","            if ( map ) {","                var tmp;","                if ( state < 2 ) {","                    for ( tmp in map ) {","                        statusCode[ tmp ] = [ statusCode[tmp], map[tmp] ];","                    }","                } else {","                    tmp = map[ jqXHR.status ];","                    jqXHR.always( tmp );","                }","            }","            return this;","        };","","        // Remove hash character (#7531: and string promotion)","        // Add protocol if not provided (#5866: IE7 issue with protocol-less urls)","        // We also use the url parameter if available","        s.url = ( ( url || s.url ) + \"\" ).replace( rhash, \"\" ).replace( rprotocol, ajaxLocParts[ 1 ] + \"//\" );","","        // Extract dataTypes list","        s.dataTypes = jQuery.trim( s.dataType || \"*\" ).toLowerCase().split( core_rspace );","","        // A cross-domain request is in order when we have a protocol:host:port mismatch","        if ( s.crossDomain == null ) {","            parts = rurl.exec( s.url.toLowerCase() ) || false;","            s.crossDomain = parts && ( parts.join(\":\") + ( parts[ 3 ] ? \"\" : parts[ 1 ] === \"http:\" ? 80 : 443 ) ) !==","                ( ajaxLocParts.join(\":\") + ( ajaxLocParts[ 3 ] ? \"\" : ajaxLocParts[ 1 ] === \"http:\" ? 80 : 443 ) );","        }","","        // Convert data if not already a string","        if ( s.data && s.processData && typeof s.data !== \"string\" ) {","            s.data = jQuery.param( s.data, s.traditional );","        }","","        // Apply prefilters","        inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );","","        // If request was aborted inside a prefilter, stop there","        if ( state === 2 ) {","            return jqXHR;","        }","","        // We can fire global events as of now if asked to","        fireGlobals = s.global;","","        // Uppercase the type","        s.type = s.type.toUpperCase();","","        // Determine if request has content","        s.hasContent = !rnoContent.test( s.type );","","        // Watch for a new set of requests","        if ( fireGlobals && jQuery.active++ === 0 ) {","            jQuery.event.trigger( \"ajaxStart\" );","        }","","        // More options handling for requests with no content","        if ( !s.hasContent ) {","","            // If data is available, append data to url","            if ( s.data ) {","                s.url += ( rquery.test( s.url ) ? \"&\" : \"?\" ) + s.data;","                // #9682: remove data so that it's not used in an eventual retry","                delete s.data;","            }","","            // Get ifModifiedKey before adding the anti-cache parameter","            ifModifiedKey = s.url;","","            // Add anti-cache in url if needed","            if ( s.cache === false ) {","","                var ts = jQuery.now(),","                    // try replacing _= if it is there","                    ret = s.url.replace( rts, \"$1_=\" + ts );","","                // if nothing was replaced, add timestamp to the end","                s.url = ret + ( ( ret === s.url ) ? ( rquery.test( s.url ) ? \"&\" : \"?\" ) + \"_=\" + ts : \"\" );","            }","        }","","        // Set the correct header, if data is being sent","        if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {","            jqXHR.setRequestHeader( \"Content-Type\", s.contentType );","        }","","        // Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.","        if ( s.ifModified ) {","            ifModifiedKey = ifModifiedKey || s.url;","            if ( jQuery.lastModified[ ifModifiedKey ] ) {","                jqXHR.setRequestHeader( \"If-Modified-Since\", jQuery.lastModified[ ifModifiedKey ] );","            }","            if ( jQuery.etag[ ifModifiedKey ] ) {","                jqXHR.setRequestHeader( \"If-None-Match\", jQuery.etag[ ifModifiedKey ] );","            }","        }","","        // Set the Accepts header for the server, depending on the dataType","        jqXHR.setRequestHeader(","            \"Accept\",","            s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?","                s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== \"*\" ? \", \" + allTypes + \"; q=0.01\" : \"\" ) :","                s.accepts[ \"*\" ]","        );","","        // Check for headers option","        for ( i in s.headers ) {","            jqXHR.setRequestHeader( i, s.headers[ i ] );","        }","","        // Allow custom headers/mimetypes and early abort","        if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {","                // Abort if not done already and return","                return jqXHR.abort();","","        }","","        // aborting is no longer a cancellation","        strAbort = \"abort\";","","        // Install callbacks on deferreds","        for ( i in { success: 1, error: 1, complete: 1 } ) {","            jqXHR[ i ]( s[ i ] );","        }","","        // Get transport","        transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );","","        // If no transport, we auto-abort","        if ( !transport ) {","            done( -1, \"No Transport\" );","        } else {","            jqXHR.readyState = 1;","            // Send global event","            if ( fireGlobals ) {","                globalEventContext.trigger( \"ajaxSend\", [ jqXHR, s ] );","            }","            // Timeout","            if ( s.async && s.timeout > 0 ) {","                timeoutTimer = setTimeout( function(){","                    jqXHR.abort( \"timeout\" );","                }, s.timeout );","            }","","            try {","                state = 1;","                transport.send( requestHeaders, done );","            } catch (e) {","                // Propagate exception as error if not done","                if ( state < 2 ) {","                    done( -1, e );","                // Simply rethrow otherwise","                } else {","                    throw e;","                }","            }","        }","","        return jqXHR;","    },","","    // Counter for holding the number of active queries","    active: 0,","","    // Last-Modified header cache for next request","    lastModified: {},","    etag: {}","","});","","/* Handles responses to an ajax request:"," * - sets all responseXXX fields accordingly"," * - finds the right dataType (mediates between content-type and expected dataType)"," * - returns the corresponding response"," */","function ajaxHandleResponses( s, jqXHR, responses ) {","","    var ct, type, finalDataType, firstDataType,","        contents = s.contents,","        dataTypes = s.dataTypes,","        responseFields = s.responseFields;","","    // Fill responseXXX fields","    for ( type in responseFields ) {","        if ( type in responses ) {","            jqXHR[ responseFields[type] ] = responses[ type ];","        }","    }","","    // Remove auto dataType and get content-type in the process","    while( dataTypes[ 0 ] === \"*\" ) {","        dataTypes.shift();","        if ( ct === undefined ) {","            ct = s.mimeType || jqXHR.getResponseHeader( \"content-type\" );","        }","    }","","    // Check if we're dealing with a known content-type","    if ( ct ) {","        for ( type in contents ) {","            if ( contents[ type ] && contents[ type ].test( ct ) ) {","                dataTypes.unshift( type );","                break;","            }","        }","    }","","    // Check to see if we have a response for the expected dataType","    if ( dataTypes[ 0 ] in responses ) {","        finalDataType = dataTypes[ 0 ];","    } else {","        // Try convertible dataTypes","        for ( type in responses ) {","            if ( !dataTypes[ 0 ] || s.converters[ type + \" \" + dataTypes[0] ] ) {","                finalDataType = type;","                break;","            }","            if ( !firstDataType ) {","                firstDataType = type;","            }","        }","        // Or just use first one","        finalDataType = finalDataType || firstDataType;","    }","","    // If we found a dataType","    // We add the dataType to the list if needed","    // and return the corresponding response","    if ( finalDataType ) {","        if ( finalDataType !== dataTypes[ 0 ] ) {","            dataTypes.unshift( finalDataType );","        }","        return responses[ finalDataType ];","    }","}","","// Chain conversions given the request and the original response","function ajaxConvert( s, response ) {","","    var conv, conv2, current, tmp,","        // Work with a copy of dataTypes in case we need to modify it for conversion","        dataTypes = s.dataTypes.slice(),","        prev = dataTypes[ 0 ],","        converters = {},","        i = 0;","","    // Apply the dataFilter if provided","    if ( s.dataFilter ) {","        response = s.dataFilter( response, s.dataType );","    }","","    // Create converters map with lowercased keys","    if ( dataTypes[ 1 ] ) {","        for ( conv in s.converters ) {","            converters[ conv.toLowerCase() ] = s.converters[ conv ];","        }","    }","","    // Convert to each sequential dataType, tolerating list modification","    for ( ; (current = dataTypes[++i]); ) {","","        // There's only work to do if current dataType is non-auto","        if ( current !== \"*\" ) {","","            // Convert response if prev dataType is non-auto and differs from current","            if ( prev !== \"*\" && prev !== current ) {","","                // Seek a direct converter","                conv = converters[ prev + \" \" + current ] || converters[ \"* \" + current ];","","                // If none found, seek a pair","                if ( !conv ) {","                    for ( conv2 in converters ) {","","                        // If conv2 outputs current","                        tmp = conv2.split(\" \");","                        if ( tmp[ 1 ] === current ) {","","                            // If prev can be converted to accepted input","                            conv = converters[ prev + \" \" + tmp[ 0 ] ] ||","                                converters[ \"* \" + tmp[ 0 ] ];","                            if ( conv ) {","                                // Condense equivalence converters","                                if ( conv === true ) {","                                    conv = converters[ conv2 ];","","                                // Otherwise, insert the intermediate dataType","                                } else if ( converters[ conv2 ] !== true ) {","                                    current = tmp[ 0 ];","                                    dataTypes.splice( i--, 0, current );","                                }","","                                break;","                            }","                        }","                    }","                }","","                // Apply converter (if not an equivalence)","                if ( conv !== true ) {","","                    // Unless errors are allowed to bubble, catch and return them","                    if ( conv && s[\"throws\"] ) {","                        response = conv( response );","                    } else {","                        try {","                            response = conv( response );","                        } catch ( e ) {","                            return { state: \"parsererror\", error: conv ? e : \"No conversion from \" + prev + \" to \" + current };","                        }","                    }","                }","            }","","            // Update prev for next iteration","            prev = current;","        }","    }","","    return { state: \"success\", data: response };","}","var oldCallbacks = [],","    rquestion = /\\?/,","    rjsonp = /(=)\\?(?=&|$)|\\?\\?/,","    nonce = jQuery.now();","","// Default jsonp settings","jQuery.ajaxSetup({","    jsonp: \"callback\",","    jsonpCallback: function() {","        var callback = oldCallbacks.pop() || ( jQuery.expando + \"_\" + ( nonce++ ) );","        this[ callback ] = true;","        return callback;","    }","});","","// Detect, normalize options and install callbacks for jsonp requests","jQuery.ajaxPrefilter( \"json jsonp\", function( s, originalSettings, jqXHR ) {","","    var callbackName, overwritten, responseContainer,","        data = s.data,","        url = s.url,","        hasCallback = s.jsonp !== false,","        replaceInUrl = hasCallback && rjsonp.test( url ),","        replaceInData = hasCallback && !replaceInUrl && typeof data === \"string\" &&","            !( s.contentType || \"\" ).indexOf(\"application/x-www-form-urlencoded\") &&","            rjsonp.test( data );","","    // Handle iff the expected data type is \"jsonp\" or we have a parameter to set","    if ( s.dataTypes[ 0 ] === \"jsonp\" || replaceInUrl || replaceInData ) {","","        // Get callback name, remembering preexisting value associated with it","        callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?","            s.jsonpCallback() :","            s.jsonpCallback;","        overwritten = window[ callbackName ];","","        // Insert callback into url or form data","        if ( replaceInUrl ) {","            s.url = url.replace( rjsonp, \"$1\" + callbackName );","        } else if ( replaceInData ) {","            s.data = data.replace( rjsonp, \"$1\" + callbackName );","        } else if ( hasCallback ) {","            s.url += ( rquestion.test( url ) ? \"&\" : \"?\" ) + s.jsonp + \"=\" + callbackName;","        }","","        // Use data converter to retrieve json after script execution","        s.converters[\"script json\"] = function() {","            if ( !responseContainer ) {","                jQuery.error( callbackName + \" was not called\" );","            }","            return responseContainer[ 0 ];","        };","","        // force json dataType","        s.dataTypes[ 0 ] = \"json\";","","        // Install callback","        window[ callbackName ] = function() {","            responseContainer = arguments;","        };","","        // Clean-up function (fires after converters)","        jqXHR.always(function() {","            // Restore preexisting value","            window[ callbackName ] = overwritten;","","            // Save back as free","            if ( s[ callbackName ] ) {","                // make sure that re-using the options doesn't screw things around","                s.jsonpCallback = originalSettings.jsonpCallback;","","                // save the callback name for future use","                oldCallbacks.push( callbackName );","            }","","            // Call if it was a function and we have a response","            if ( responseContainer && jQuery.isFunction( overwritten ) ) {","                overwritten( responseContainer[ 0 ] );","            }","","            responseContainer = overwritten = undefined;","        });","","        // Delegate to script","        return \"script\";","    }","});","// Install script dataType","jQuery.ajaxSetup({","    accepts: {","        script: \"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript\"","    },","    contents: {","        script: /javascript|ecmascript/","    },","    converters: {","        \"text script\": function( text ) {","            jQuery.globalEval( text );","            return text;","        }","    }","});","","// Handle cache's special case and global","jQuery.ajaxPrefilter( \"script\", function( s ) {","    if ( s.cache === undefined ) {","        s.cache = false;","    }","    if ( s.crossDomain ) {","        s.type = \"GET\";","        s.global = false;","    }","});","","// Bind script tag hack transport","jQuery.ajaxTransport( \"script\", function(s) {","","    // This transport only deals with cross domain requests","    if ( s.crossDomain ) {","","        var script,","            head = document.head || document.getElementsByTagName( \"head\" )[0] || document.documentElement;","","        return {","","            send: function( _, callback ) {","","                script = document.createElement( \"script\" );","","                script.async = \"async\";","","                if ( s.scriptCharset ) {","                    script.charset = s.scriptCharset;","                }","","                script.src = s.url;","","                // Attach handlers for all browsers","                script.onload = script.onreadystatechange = function( _, isAbort ) {","","                    if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {","","                        // Handle memory leak in IE","                        script.onload = script.onreadystatechange = null;","","                        // Remove the script","                        if ( head && script.parentNode ) {","                            head.removeChild( script );","                        }","","                        // Dereference the script","                        script = undefined;","","                        // Callback if not abort","                        if ( !isAbort ) {","                            callback( 200, \"success\" );","                        }","                    }","                };","                // Use insertBefore instead of appendChild  to circumvent an IE6 bug.","                // This arises when a base node is used (#2709 and #4378).","                head.insertBefore( script, head.firstChild );","            },","","            abort: function() {","                if ( script ) {","                    script.onload( 0, 1 );","                }","            }","        };","    }","});","var xhrCallbacks,","    // #5280: Internet Explorer will keep connections alive if we don't abort on unload","    xhrOnUnloadAbort = window.ActiveXObject ? function() {","        // Abort all pending requests","        for ( var key in xhrCallbacks ) {","            xhrCallbacks[ key ]( 0, 1 );","        }","    } : false,","    xhrId = 0;","","// Functions to create xhrs","function createStandardXHR() {","    try {","        return new window.XMLHttpRequest();","    } catch( e ) {}","}","","function createActiveXHR() {","    try {","        return new window.ActiveXObject( \"Microsoft.XMLHTTP\" );","    } catch( e ) {}","}","","// Create the request object","// (This is still attached to ajaxSettings for backward compatibility)","jQuery.ajaxSettings.xhr = window.ActiveXObject ?","    /* Microsoft failed to properly","     * implement the XMLHttpRequest in IE7 (can't request local files),","     * so we use the ActiveXObject when it is available","     * Additionally XMLHttpRequest can be disabled in IE7/IE8 so","     * we need a fallback.","     */","    function() {","        return !this.isLocal && createStandardXHR() || createActiveXHR();","    } :","    // For all other browsers, use the standard XMLHttpRequest object","    createStandardXHR;","","// Determine support properties","(function( xhr ) {","    jQuery.extend( jQuery.support, {","        ajax: !!xhr,","        cors: !!xhr && ( \"withCredentials\" in xhr )","    });","})( jQuery.ajaxSettings.xhr() );","","// Create transport if the browser can provide an xhr","if ( jQuery.support.ajax ) {","","    jQuery.ajaxTransport(function( s ) {","        // Cross domain only allowed if supported through XMLHttpRequest","        if ( !s.crossDomain || jQuery.support.cors ) {","","            var callback;","","            return {","                send: function( headers, complete ) {","","                    // Get a new xhr","                    var handle, i,","                        xhr = s.xhr();","","                    // Open the socket","                    // Passing null username, generates a login popup on Opera (#2865)","                    if ( s.username ) {","                        xhr.open( s.type, s.url, s.async, s.username, s.password );","                    } else {","                        xhr.open( s.type, s.url, s.async );","                    }","","                    // Apply custom fields if provided","                    if ( s.xhrFields ) {","                        for ( i in s.xhrFields ) {","                            xhr[ i ] = s.xhrFields[ i ];","                        }","                    }","","                    // Override mime type if needed","                    if ( s.mimeType && xhr.overrideMimeType ) {","                        xhr.overrideMimeType( s.mimeType );","                    }","","                    // X-Requested-With header","                    // For cross-domain requests, seeing as conditions for a preflight are","                    // akin to a jigsaw puzzle, we simply never set it to be sure.","                    // (it can always be set on a per-request basis or even using ajaxSetup)","                    // For same-domain requests, won't change header if already provided.","                    if ( !s.crossDomain && !headers[\"X-Requested-With\"] ) {","                        headers[ \"X-Requested-With\" ] = \"XMLHttpRequest\";","                    }","","                    // Need an extra try/catch for cross domain requests in Firefox 3","                    try {","                        for ( i in headers ) {","                            xhr.setRequestHeader( i, headers[ i ] );","                        }","                    } catch( _ ) {}","","                    // Do send the request","                    // This may raise an exception which is actually","                    // handled in jQuery.ajax (so no try/catch here)","                    xhr.send( ( s.hasContent && s.data ) || null );","","                    // Listener","                    callback = function( _, isAbort ) {","","                        var status,","                            statusText,","                            responseHeaders,","                            responses,","                            xml;","","                        // Firefox throws exceptions when accessing properties","                        // of an xhr when a network error occurred","                        // http://helpful.knobs-dials.com/index.php/Component_returned_failure_code:_0x80040111_(NS_ERROR_NOT_AVAILABLE)","                        try {","","                            // Was never called and is aborted or complete","                            if ( callback && ( isAbort || xhr.readyState === 4 ) ) {","","                                // Only called once","                                callback = undefined;","","                                // Do not keep as active anymore","                                if ( handle ) {","                                    xhr.onreadystatechange = jQuery.noop;","                                    if ( xhrOnUnloadAbort ) {","                                        delete xhrCallbacks[ handle ];","                                    }","                                }","","                                // If it's an abort","                                if ( isAbort ) {","                                    // Abort it manually if needed","                                    if ( xhr.readyState !== 4 ) {","                                        xhr.abort();","                                    }","                                } else {","                                    status = xhr.status;","                                    responseHeaders = xhr.getAllResponseHeaders();","                                    responses = {};","                                    xml = xhr.responseXML;","","                                    // Construct response list","                                    if ( xml && xml.documentElement /* #4958 */ ) {","                                        responses.xml = xml;","                                    }","","                                    // When requesting binary data, IE6-9 will throw an exception","                                    // on any attempt to access responseText (#11426)","                                    try {","                                        responses.text = xhr.responseText;","                                    } catch( _ ) {","                                    }","","                                    // Firefox throws an exception when accessing","                                    // statusText for faulty cross-domain requests","                                    try {","                                        statusText = xhr.statusText;","                                    } catch( e ) {","                                        // We normalize with Webkit giving an empty statusText","                                        statusText = \"\";","                                    }","","                                    // Filter status for non standard behaviors","","                                    // If the request is local and we have data: assume a success","                                    // (success with no data won't get notified, that's the best we","                                    // can do given current implementations)","                                    if ( !status && s.isLocal && !s.crossDomain ) {","                                        status = responses.text ? 200 : 404;","                                    // IE - #1450: sometimes returns 1223 when it should be 204","                                    } else if ( status === 1223 ) {","                                        status = 204;","                                    }","                                }","                            }","                        } catch( firefoxAccessException ) {","                            if ( !isAbort ) {","                                complete( -1, firefoxAccessException );","                            }","                        }","","                        // Call complete if needed","                        if ( responses ) {","                            complete( status, statusText, responses, responseHeaders );","                        }","                    };","","                    if ( !s.async ) {","                        // if we're in sync mode we fire the callback","                        callback();","                    } else if ( xhr.readyState === 4 ) {","                        // (IE6 & IE7) if it's in cache and has been","                        // retrieved directly we need to fire the callback","                        setTimeout( callback, 0 );","                    } else {","                        handle = ++xhrId;","                        if ( xhrOnUnloadAbort ) {","                            // Create the active xhrs callbacks list if needed","                            // and attach the unload handler","                            if ( !xhrCallbacks ) {","                                xhrCallbacks = {};","                                jQuery( window ).unload( xhrOnUnloadAbort );","                            }","                            // Add to list of active xhrs callbacks","                            xhrCallbacks[ handle ] = callback;","                        }","                        xhr.onreadystatechange = callback;","                    }","                },","","                abort: function() {","                    if ( callback ) {","                        callback(0,1);","                    }","                }","            };","        }","    });","}","var fxNow, timerId,","    rfxtypes = /^(?:toggle|show|hide)$/,","    rfxnum = new RegExp( \"^(?:([-+])=|)(\" + core_pnum + \")([a-z%]*)$\", \"i\" ),","    rrun = /queueHooks$/,","    animationPrefilters = [ defaultPrefilter ],","    tweeners = {","        \"*\": [function( prop, value ) {","            var end, unit,","                tween = this.createTween( prop, value ),","                parts = rfxnum.exec( value ),","                target = tween.cur(),","                start = +target || 0,","                scale = 1,","                maxIterations = 20;","","            if ( parts ) {","                end = +parts[2];","                unit = parts[3] || ( jQuery.cssNumber[ prop ] ? \"\" : \"px\" );","","                // We need to compute starting value","                if ( unit !== \"px\" && start ) {","                    // Iteratively approximate from a nonzero starting point","                    // Prefer the current property, because this process will be trivial if it uses the same units","                    // Fallback to end or a simple constant","                    start = jQuery.css( tween.elem, prop, true ) || end || 1;","","                    do {","                        // If previous iteration zeroed out, double until we get *something*","                        // Use a string for doubling factor so we don't accidentally see scale as unchanged below","                        scale = scale || \".5\";","","                        // Adjust and apply","                        start = start / scale;","                        jQuery.style( tween.elem, prop, start + unit );","","                    // Update scale, tolerating zero or NaN from tween.cur()","                    // And breaking the loop if scale is unchanged or perfect, or if we've just had enough","                    } while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );","                }","","                tween.unit = unit;","                tween.start = start;","                // If a +=/-= token was provided, we're doing a relative animation","                tween.end = parts[1] ? start + ( parts[1] + 1 ) * end : end;","            }","            return tween;","        }]","    };","","// Animations created synchronously will run synchronously","function createFxNow() {","    setTimeout(function() {","        fxNow = undefined;","    }, 0 );","    return ( fxNow = jQuery.now() );","}","","function createTweens( animation, props ) {","    jQuery.each( props, function( prop, value ) {","        var collection = ( tweeners[ prop ] || [] ).concat( tweeners[ \"*\" ] ),","            index = 0,","            length = collection.length;","        for ( ; index < length; index++ ) {","            if ( collection[ index ].call( animation, prop, value ) ) {","","                // we're done with this property","                return;","            }","        }","    });","}","","function Animation( elem, properties, options ) {","    var result,","        index = 0,","        tweenerIndex = 0,","        length = animationPrefilters.length,","        deferred = jQuery.Deferred().always( function() {","            // don't match elem in the :animated selector","            delete tick.elem;","        }),","        tick = function() {","            var currentTime = fxNow || createFxNow(),","                remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),","                percent = 1 - ( remaining / animation.duration || 0 ),","                index = 0,","                length = animation.tweens.length;","","            for ( ; index < length ; index++ ) {","                animation.tweens[ index ].run( percent );","            }","","            deferred.notifyWith( elem, [ animation, percent, remaining ]);","","            if ( percent < 1 && length ) {","                return remaining;","            } else {","                deferred.resolveWith( elem, [ animation ] );","                return false;","            }","        },","        animation = deferred.promise({","            elem: elem,","            props: jQuery.extend( {}, properties ),","            opts: jQuery.extend( true, { specialEasing: {} }, options ),","            originalProperties: properties,","            originalOptions: options,","            startTime: fxNow || createFxNow(),","            duration: options.duration,","            tweens: [],","            createTween: function( prop, end, easing ) {","                var tween = jQuery.Tween( elem, animation.opts, prop, end,","                        animation.opts.specialEasing[ prop ] || animation.opts.easing );","                animation.tweens.push( tween );","                return tween;","            },","            stop: function( gotoEnd ) {","                var index = 0,","                    // if we are going to the end, we want to run all the tweens","                    // otherwise we skip this part","                    length = gotoEnd ? animation.tweens.length : 0;","","                for ( ; index < length ; index++ ) {","                    animation.tweens[ index ].run( 1 );","                }","","                // resolve when we played the last frame","                // otherwise, reject","                if ( gotoEnd ) {","                    deferred.resolveWith( elem, [ animation, gotoEnd ] );","                } else {","                    deferred.rejectWith( elem, [ animation, gotoEnd ] );","                }","                return this;","            }","        }),","        props = animation.props;","","    propFilter( props, animation.opts.specialEasing );","","    for ( ; index < length ; index++ ) {","        result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );","        if ( result ) {","            return result;","        }","    }","","    createTweens( animation, props );","","    if ( jQuery.isFunction( animation.opts.start ) ) {","        animation.opts.start.call( elem, animation );","    }","","    jQuery.fx.timer(","        jQuery.extend( tick, {","            anim: animation,","            queue: animation.opts.queue,","            elem: elem","        })","    );","","    // attach callbacks from options","    return animation.progress( animation.opts.progress )","        .done( animation.opts.done, animation.opts.complete )","        .fail( animation.opts.fail )","        .always( animation.opts.always );","}","","function propFilter( props, specialEasing ) {","    var index, name, easing, value, hooks;","","    // camelCase, specialEasing and expand cssHook pass","    for ( index in props ) {","        name = jQuery.camelCase( index );","        easing = specialEasing[ name ];","        value = props[ index ];","        if ( jQuery.isArray( value ) ) {","            easing = value[ 1 ];","            value = props[ index ] = value[ 0 ];","        }","","        if ( index !== name ) {","            props[ name ] = value;","            delete props[ index ];","        }","","        hooks = jQuery.cssHooks[ name ];","        if ( hooks && \"expand\" in hooks ) {","            value = hooks.expand( value );","            delete props[ name ];","","            // not quite $.extend, this wont overwrite keys already present.","            // also - reusing 'index' from above because we have the correct \"name\"","            for ( index in value ) {","                if ( !( index in props ) ) {","                    props[ index ] = value[ index ];","                    specialEasing[ index ] = easing;","                }","            }","        } else {","            specialEasing[ name ] = easing;","        }","    }","}","","jQuery.Animation = jQuery.extend( Animation, {","","    tweener: function( props, callback ) {","        if ( jQuery.isFunction( props ) ) {","            callback = props;","            props = [ \"*\" ];","        } else {","            props = props.split(\" \");","        }","","        var prop,","            index = 0,","            length = props.length;","","        for ( ; index < length ; index++ ) {","            prop = props[ index ];","            tweeners[ prop ] = tweeners[ prop ] || [];","            tweeners[ prop ].unshift( callback );","        }","    },","","    prefilter: function( callback, prepend ) {","        if ( prepend ) {","            animationPrefilters.unshift( callback );","        } else {","            animationPrefilters.push( callback );","        }","    }","});","","function defaultPrefilter( elem, props, opts ) {","    var index, prop, value, length, dataShow, tween, hooks, oldfire,","        anim = this,","        style = elem.style,","        orig = {},","        handled = [],","        hidden = elem.nodeType && isHidden( elem );","","    // handle queue: false promises","    if ( !opts.queue ) {","        hooks = jQuery._queueHooks( elem, \"fx\" );","        if ( hooks.unqueued == null ) {","            hooks.unqueued = 0;","            oldfire = hooks.empty.fire;","            hooks.empty.fire = function() {","                if ( !hooks.unqueued ) {","                    oldfire();","                }","            };","        }","        hooks.unqueued++;","","        anim.always(function() {","            // doing this makes sure that the complete handler will be called","            // before this completes","            anim.always(function() {","                hooks.unqueued--;","                if ( !jQuery.queue( elem, \"fx\" ).length ) {","                    hooks.empty.fire();","                }","            });","        });","    }","","    // height/width overflow pass","    if ( elem.nodeType === 1 && ( \"height\" in props || \"width\" in props ) ) {","        // Make sure that nothing sneaks out","        // Record all 3 overflow attributes because IE does not","        // change the overflow attribute when overflowX and","        // overflowY are set to the same value","        opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];","","        // Set display property to inline-block for height/width","        // animations on inline elements that are having width/height animated","        if ( jQuery.css( elem, \"display\" ) === \"inline\" &&","                jQuery.css( elem, \"float\" ) === \"none\" ) {","","            // inline-level elements accept inline-block;","            // block-level elements need to be inline with layout","            if ( !jQuery.support.inlineBlockNeedsLayout || css_defaultDisplay( elem.nodeName ) === \"inline\" ) {","                style.display = \"inline-block\";","","            } else {","                style.zoom = 1;","            }","        }","    }","","    if ( opts.overflow ) {","        style.overflow = \"hidden\";","        if ( !jQuery.support.shrinkWrapBlocks ) {","            anim.done(function() {","                style.overflow = opts.overflow[ 0 ];","                style.overflowX = opts.overflow[ 1 ];","                style.overflowY = opts.overflow[ 2 ];","            });","        }","    }","","","    // show/hide pass","    for ( index in props ) {","        value = props[ index ];","        if ( rfxtypes.exec( value ) ) {","            delete props[ index ];","            if ( value === ( hidden ? \"hide\" : \"show\" ) ) {","                continue;","            }","            handled.push( index );","        }","    }","","    length = handled.length;","    if ( length ) {","        dataShow = jQuery._data( elem, \"fxshow\" ) || jQuery._data( elem, \"fxshow\", {} );","        if ( hidden ) {","            jQuery( elem ).show();","        } else {","            anim.done(function() {","                jQuery( elem ).hide();","            });","        }","        anim.done(function() {","            var prop;","            jQuery.removeData( elem, \"fxshow\", true );","            for ( prop in orig ) {","                jQuery.style( elem, prop, orig[ prop ] );","            }","        });","        for ( index = 0 ; index < length ; index++ ) {","            prop = handled[ index ];","            tween = anim.createTween( prop, hidden ? dataShow[ prop ] : 0 );","            orig[ prop ] = dataShow[ prop ] || jQuery.style( elem, prop );","","            if ( !( prop in dataShow ) ) {","                dataShow[ prop ] = tween.start;","                if ( hidden ) {","                    tween.end = tween.start;","                    tween.start = prop === \"width\" || prop === \"height\" ? 1 : 0;","                }","            }","        }","    }","}","","function Tween( elem, options, prop, end, easing ) {","    return new Tween.prototype.init( elem, options, prop, end, easing );","}","jQuery.Tween = Tween;","","Tween.prototype = {","    constructor: Tween,","    init: function( elem, options, prop, end, easing, unit ) {","        this.elem = elem;","        this.prop = prop;","        this.easing = easing || \"swing\";","        this.options = options;","        this.start = this.now = this.cur();","        this.end = end;","        this.unit = unit || ( jQuery.cssNumber[ prop ] ? \"\" : \"px\" );","    },","    cur: function() {","        var hooks = Tween.propHooks[ this.prop ];","","        return hooks && hooks.get ?","            hooks.get( this ) :","            Tween.propHooks._default.get( this );","    },","    run: function( percent ) {","        var eased,","            hooks = Tween.propHooks[ this.prop ];","","        if ( this.options.duration ) {","            this.pos = eased = jQuery.easing[ this.easing ](","                percent, this.options.duration * percent, 0, 1, this.options.duration","            );","        } else {","            this.pos = eased = percent;","        }","        this.now = ( this.end - this.start ) * eased + this.start;","","        if ( this.options.step ) {","            this.options.step.call( this.elem, this.now, this );","        }","","        if ( hooks && hooks.set ) {","            hooks.set( this );","        } else {","            Tween.propHooks._default.set( this );","        }","        return this;","    }","};","","Tween.prototype.init.prototype = Tween.prototype;","","Tween.propHooks = {","    _default: {","        get: function( tween ) {","            var result;","","            if ( tween.elem[ tween.prop ] != null &&","                (!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {","                return tween.elem[ tween.prop ];","            }","","            // passing any value as a 4th parameter to .css will automatically","            // attempt a parseFloat and fallback to a string if the parse fails","            // so, simple values such as \"10px\" are parsed to Float.","            // complex values such as \"rotate(1rad)\" are returned as is.","            result = jQuery.css( tween.elem, tween.prop, false, \"\" );","            // Empty strings, null, undefined and \"auto\" are converted to 0.","            return !result || result === \"auto\" ? 0 : result;","        },","        set: function( tween ) {","            // use step hook for back compat - use cssHook if its there - use .style if its","            // available and use plain properties where available","            if ( jQuery.fx.step[ tween.prop ] ) {","                jQuery.fx.step[ tween.prop ]( tween );","            } else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {","                jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );","            } else {","                tween.elem[ tween.prop ] = tween.now;","            }","        }","    }","};","","// Remove in 2.0 - this supports IE8's panic based approach","// to setting things on disconnected nodes","","Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {","    set: function( tween ) {","        if ( tween.elem.nodeType && tween.elem.parentNode ) {","            tween.elem[ tween.prop ] = tween.now;","        }","    }","};","","jQuery.each([ \"toggle\", \"show\", \"hide\" ], function( i, name ) {","    var cssFn = jQuery.fn[ name ];","    jQuery.fn[ name ] = function( speed, easing, callback ) {","        return speed == null || typeof speed === \"boolean\" ||","            // special check for .toggle( handler, handler, ... )","            ( !i && jQuery.isFunction( speed ) && jQuery.isFunction( easing ) ) ?","            cssFn.apply( this, arguments ) :","            this.animate( genFx( name, true ), speed, easing, callback );","    };","});","","jQuery.fn.extend({","    fadeTo: function( speed, to, easing, callback ) {","","        // show any hidden elements after setting opacity to 0","        return this.filter( isHidden ).css( \"opacity\", 0 ).show()","","            // animate to the value specified","            .end().animate({ opacity: to }, speed, easing, callback );","    },","    animate: function( prop, speed, easing, callback ) {","        var empty = jQuery.isEmptyObject( prop ),","            optall = jQuery.speed( speed, easing, callback ),","            doAnimation = function() {","                // Operate on a copy of prop so per-property easing won't be lost","                var anim = Animation( this, jQuery.extend( {}, prop ), optall );","","                // Empty animations resolve immediately","                if ( empty ) {","                    anim.stop( true );","                }","            };","","        return empty || optall.queue === false ?","            this.each( doAnimation ) :","            this.queue( optall.queue, doAnimation );","    },","    stop: function( type, clearQueue, gotoEnd ) {","        var stopQueue = function( hooks ) {","            var stop = hooks.stop;","            delete hooks.stop;","            stop( gotoEnd );","        };","","        if ( typeof type !== \"string\" ) {","            gotoEnd = clearQueue;","            clearQueue = type;","            type = undefined;","        }","        if ( clearQueue && type !== false ) {","            this.queue( type || \"fx\", [] );","        }","","        return this.each(function() {","            var dequeue = true,","                index = type != null && type + \"queueHooks\",","                timers = jQuery.timers,","                data = jQuery._data( this );","","            if ( index ) {","                if ( data[ index ] && data[ index ].stop ) {","                    stopQueue( data[ index ] );","                }","            } else {","                for ( index in data ) {","                    if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {","                        stopQueue( data[ index ] );","                    }","                }","            }","","            for ( index = timers.length; index--; ) {","                if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {","                    timers[ index ].anim.stop( gotoEnd );","                    dequeue = false;","                    timers.splice( index, 1 );","                }","            }","","            // start the next in the queue if the last step wasn't forced","            // timers currently will call their complete callbacks, which will dequeue","            // but only if they were gotoEnd","            if ( dequeue || !gotoEnd ) {","                jQuery.dequeue( this, type );","            }","        });","    }","});","","// Generate parameters to create a standard animation","function genFx( type, includeWidth ) {","    var which,","        attrs = { height: type },","        i = 0;","","    // if we include width, step value is 1 to do all cssExpand values,","    // if we don't include width, step value is 2 to skip over Left and Right","    includeWidth = includeWidth? 1 : 0;","    for( ; i < 4 ; i += 2 - includeWidth ) {","        which = cssExpand[ i ];","        attrs[ \"margin\" + which ] = attrs[ \"padding\" + which ] = type;","    }","","    if ( includeWidth ) {","        attrs.opacity = attrs.width = type;","    }","","    return attrs;","}","","// Generate shortcuts for custom animations","jQuery.each({","    slideDown: genFx(\"show\"),","    slideUp: genFx(\"hide\"),","    slideToggle: genFx(\"toggle\"),","    fadeIn: { opacity: \"show\" },","    fadeOut: { opacity: \"hide\" },","    fadeToggle: { opacity: \"toggle\" }","}, function( name, props ) {","    jQuery.fn[ name ] = function( speed, easing, callback ) {","        return this.animate( props, speed, easing, callback );","    };","});","","jQuery.speed = function( speed, easing, fn ) {","    var opt = speed && typeof speed === \"object\" ? jQuery.extend( {}, speed ) : {","        complete: fn || !fn && easing ||","            jQuery.isFunction( speed ) && speed,","        duration: speed,","        easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing","    };","","    opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === \"number\" ? opt.duration :","        opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;","","    // normalize opt.queue - true/undefined/null -> \"fx\"","    if ( opt.queue == null || opt.queue === true ) {","        opt.queue = \"fx\";","    }","","    // Queueing","    opt.old = opt.complete;","","    opt.complete = function() {","        if ( jQuery.isFunction( opt.old ) ) {","            opt.old.call( this );","        }","","        if ( opt.queue ) {","            jQuery.dequeue( this, opt.queue );","        }","    };","","    return opt;","};","","jQuery.easing = {","    linear: function( p ) {","        return p;","    },","    swing: function( p ) {","        return 0.5 - Math.cos( p*Math.PI ) / 2;","    }","};","","jQuery.timers = [];","jQuery.fx = Tween.prototype.init;","jQuery.fx.tick = function() {","    var timer,","        timers = jQuery.timers,","        i = 0;","","    for ( ; i < timers.length; i++ ) {","        timer = timers[ i ];","        // Checks the timer has not already been removed","        if ( !timer() && timers[ i ] === timer ) {","            timers.splice( i--, 1 );","        }","    }","","    if ( !timers.length ) {","        jQuery.fx.stop();","    }","};","","jQuery.fx.timer = function( timer ) {","    if ( timer() && jQuery.timers.push( timer ) && !timerId ) {","        timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );","    }","};","","jQuery.fx.interval = 13;","","jQuery.fx.stop = function() {","    clearInterval( timerId );","    timerId = null;","};","","jQuery.fx.speeds = {","    slow: 600,","    fast: 200,","    // Default speed","    _default: 400","};","","// Back Compat <1.8 extension point","jQuery.fx.step = {};","","if ( jQuery.expr && jQuery.expr.filters ) {","    jQuery.expr.filters.animated = function( elem ) {","        return jQuery.grep(jQuery.timers, function( fn ) {","            return elem === fn.elem;","        }).length;","    };","}","var rroot = /^(?:body|html)$/i;","","jQuery.fn.offset = function( options ) {","    if ( arguments.length ) {","        return options === undefined ?","            this :","            this.each(function( i ) {","                jQuery.offset.setOffset( this, options, i );","            });","    }","","    var docElem, body, win, clientTop, clientLeft, scrollTop, scrollLeft,","        box = { top: 0, left: 0 },","        elem = this[ 0 ],","        doc = elem && elem.ownerDocument;","","    if ( !doc ) {","        return;","    }","","    if ( (body = doc.body) === elem ) {","        return jQuery.offset.bodyOffset( elem );","    }","","    docElem = doc.documentElement;","","    // Make sure it's not a disconnected DOM node","    if ( !jQuery.contains( docElem, elem ) ) {","        return box;","    }","","    // If we don't have gBCR, just use 0,0 rather than error","    // BlackBerry 5, iOS 3 (original iPhone)","    if ( typeof elem.getBoundingClientRect !== \"undefined\" ) {","        box = elem.getBoundingClientRect();","    }","    win = getWindow( doc );","    clientTop  = docElem.clientTop  || body.clientTop  || 0;","    clientLeft = docElem.clientLeft || body.clientLeft || 0;","    scrollTop  = win.pageYOffset || docElem.scrollTop;","    scrollLeft = win.pageXOffset || docElem.scrollLeft;","    return {","        top: box.top  + scrollTop  - clientTop,","        left: box.left + scrollLeft - clientLeft","    };","};","","jQuery.offset = {","","    bodyOffset: function( body ) {","        var top = body.offsetTop,","            left = body.offsetLeft;","","        if ( jQuery.support.doesNotIncludeMarginInBodyOffset ) {","            top  += parseFloat( jQuery.css(body, \"marginTop\") ) || 0;","            left += parseFloat( jQuery.css(body, \"marginLeft\") ) || 0;","        }","","        return { top: top, left: left };","    },","","    setOffset: function( elem, options, i ) {","        var position = jQuery.css( elem, \"position\" );","","        // set position first, in-case top/left are set even on static elem","        if ( position === \"static\" ) {","            elem.style.position = \"relative\";","        }","","        var curElem = jQuery( elem ),","            curOffset = curElem.offset(),","            curCSSTop = jQuery.css( elem, \"top\" ),","            curCSSLeft = jQuery.css( elem, \"left\" ),","            calculatePosition = ( position === \"absolute\" || position === \"fixed\" ) && jQuery.inArray(\"auto\", [curCSSTop, curCSSLeft]) > -1,","            props = {}, curPosition = {}, curTop, curLeft;","","        // need to be able to calculate position if either top or left is auto and position is either absolute or fixed","        if ( calculatePosition ) {","            curPosition = curElem.position();","            curTop = curPosition.top;","            curLeft = curPosition.left;","        } else {","            curTop = parseFloat( curCSSTop ) || 0;","            curLeft = parseFloat( curCSSLeft ) || 0;","        }","","        if ( jQuery.isFunction( options ) ) {","            options = options.call( elem, i, curOffset );","        }","","        if ( options.top != null ) {","            props.top = ( options.top - curOffset.top ) + curTop;","        }","        if ( options.left != null ) {","            props.left = ( options.left - curOffset.left ) + curLeft;","        }","","        if ( \"using\" in options ) {","            options.using.call( elem, props );","        } else {","            curElem.css( props );","        }","    }","};","","","jQuery.fn.extend({","","    position: function() {","        if ( !this[0] ) {","            return;","        }","","        var elem = this[0],","","        // Get *real* offsetParent","        offsetParent = this.offsetParent(),","","        // Get correct offsets","        offset       = this.offset(),","        parentOffset = rroot.test(offsetParent[0].nodeName) ? { top: 0, left: 0 } : offsetParent.offset();","","        // Subtract element margins","        // note: when an element has margin: auto the offsetLeft and marginLeft","        // are the same in Safari causing offset.left to incorrectly be 0","        offset.top  -= parseFloat( jQuery.css(elem, \"marginTop\") ) || 0;","        offset.left -= parseFloat( jQuery.css(elem, \"marginLeft\") ) || 0;","","        // Add offsetParent borders","        parentOffset.top  += parseFloat( jQuery.css(offsetParent[0], \"borderTopWidth\") ) || 0;","        parentOffset.left += parseFloat( jQuery.css(offsetParent[0], \"borderLeftWidth\") ) || 0;","","        // Subtract the two offsets","        return {","            top:  offset.top  - parentOffset.top,","            left: offset.left - parentOffset.left","        };","    },","","    offsetParent: function() {","        return this.map(function() {","            var offsetParent = this.offsetParent || document.body;","            while ( offsetParent && (!rroot.test(offsetParent.nodeName) && jQuery.css(offsetParent, \"position\") === \"static\") ) {","                offsetParent = offsetParent.offsetParent;","            }","            return offsetParent || document.body;","        });","    }","});","","","// Create scrollLeft and scrollTop methods","jQuery.each( {scrollLeft: \"pageXOffset\", scrollTop: \"pageYOffset\"}, function( method, prop ) {","    var top = /Y/.test( prop );","","    jQuery.fn[ method ] = function( val ) {","        return jQuery.access( this, function( elem, method, val ) {","            var win = getWindow( elem );","","            if ( val === undefined ) {","                return win ? (prop in win) ? win[ prop ] :","                    win.document.documentElement[ method ] :","                    elem[ method ];","            }","","            if ( win ) {","                win.scrollTo(","                    !top ? val : jQuery( win ).scrollLeft(),","                     top ? val : jQuery( win ).scrollTop()","                );","","            } else {","                elem[ method ] = val;","            }","        }, method, val, arguments.length, null );","    };","});","","function getWindow( elem ) {","    return jQuery.isWindow( elem ) ?","        elem :","        elem.nodeType === 9 ?","            elem.defaultView || elem.parentWindow :","            false;","}","// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods","jQuery.each( { Height: \"height\", Width: \"width\" }, function( name, type ) {","    jQuery.each( { padding: \"inner\" + name, content: type, \"\": \"outer\" + name }, function( defaultExtra, funcName ) {","        // margin is only for outerHeight, outerWidth","        jQuery.fn[ funcName ] = function( margin, value ) {","            var chainable = arguments.length && ( defaultExtra || typeof margin !== \"boolean\" ),","                extra = defaultExtra || ( margin === true || value === true ? \"margin\" : \"border\" );","","            return jQuery.access( this, function( elem, type, value ) {","                var doc;","","                if ( jQuery.isWindow( elem ) ) {","                    // As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there","                    // isn't a whole lot we can do. See pull request at this URL for discussion:","                    // https://github.com/jquery/jquery/pull/764","                    return elem.document.documentElement[ \"client\" + name ];","                }","","                // Get document width or height","                if ( elem.nodeType === 9 ) {","                    doc = elem.documentElement;","","                    // Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height], whichever is greatest","                    // unfortunately, this causes bug #3838 in IE6/8 only, but there is currently no good, small way to fix it.","                    return Math.max(","                        elem.body[ \"scroll\" + name ], doc[ \"scroll\" + name ],","                        elem.body[ \"offset\" + name ], doc[ \"offset\" + name ],","                        doc[ \"client\" + name ]","                    );","                }","","                return value === undefined ?","                    // Get width or height on the element, requesting but not forcing parseFloat","                    jQuery.css( elem, type, value, extra ) :","","                    // Set width or height on the element","                    jQuery.style( elem, type, value, extra );","            }, type, chainable ? margin : undefined, chainable, null );","        };","    });","});","// Expose jQuery to the global object","window.jQuery = window.$ = jQuery;","","// Expose jQuery as an AMD module, but only for AMD loaders that","// understand the issues with loading multiple versions of jQuery","// in a page that all might call define(). The loader will indicate","// they have special allowances for multiple jQuery versions by","// specifying define.amd.jQuery = true. Register as a named module,","// since jQuery can be concatenated with other files that may use define,","// but not use a proper concatenation script that understands anonymous","// AMD modules. A named AMD is safest and most robust way to register.","// Lowercase jquery is used because AMD module names are derived from","// file names, and jQuery is normally delivered in a lowercase file name.","// Do this after creating the global so that if an AMD module wants to call","// noConflict to hide this version of jQuery, it will work.","if ( typeof define === \"function\" && define.amd && define.amd.jQuery ) {","    define( \"jquery\", [], function () { return jQuery; } );","}","","})( window );","","","}, '@VERSION@', {\"requires\": []});"];
_yuitest_coverage["build/libbit-jquery/libbit-jquery.js"].lines = {"1":0,"16":0,"17":0,"46":0,"78":0,"83":0,"84":0,"85":0,"86":0,"89":0,"90":0,"97":0,"100":0,"103":0,"104":0,"108":0,"109":0,"110":0,"111":0,"115":0,"116":0,"118":0,"121":0,"125":0,"128":0,"129":0,"130":0,"133":0,"134":0,"135":0,"138":0,"142":0,"146":0,"149":0,"150":0,"154":0,"155":0,"158":0,"159":0,"160":0,"164":0,"165":0,"170":0,"175":0,"176":0,"179":0,"180":0,"181":0,"184":0,"198":0,"202":0,"208":0,"222":0,"225":0,"227":0,"229":0,"230":0,"231":0,"232":0,"236":0,"243":0,"248":0,"250":0,"254":0,"255":0,"261":0,"265":0,"269":0,"274":0,"275":0,"280":0,"291":0,"293":0,"294":0,"301":0,"302":0,"303":0,"305":0,"309":0,"310":0,"314":0,"315":0,"316":0,"319":0,"321":0,"323":0,"324":0,"325":0,"328":0,"329":0,"333":0,"334":0,"335":0,"336":0,"339":0,"343":0,"346":0,"347":0,"354":0,"357":0,"359":0,"360":0,"363":0,"364":0,"367":0,"379":0,"380":0,"382":0,"390":0,"391":0,"395":0,"396":0,"400":0,"403":0,"404":0,"408":0,"411":0,"412":0,"420":0,"424":0,"428":0,"432":0,"436":0,"445":0,"446":0,"449":0,"451":0,"454":0,"458":0,"464":0,"465":0,"467":0,"471":0,"472":0,"473":0,"475":0,"479":0,"486":0,"487":0,"488":0,"490":0,"491":0,"492":0,"494":0,"497":0,"498":0,"501":0,"502":0,"507":0,"508":0,"512":0,"515":0,"516":0,"521":0,"525":0,"528":0,"533":0,"534":0,"535":0,"537":0,"538":0,"539":0,"540":0,"542":0,"543":0,"544":0,"547":0,"549":0,"550":0,"552":0,"561":0,"565":0,"566":0,"574":0,"578":0,"583":0,"588":0,"589":0,"590":0,"591":0,"592":0,"596":0,"597":0,"598":0,"605":0,"606":0,"607":0,"608":0,"612":0,"613":0,"614":0,"620":0,"626":0,"633":0,"640":0,"643":0,"646":0,"648":0,"649":0,"651":0,"655":0,"659":0,"661":0,"662":0,"663":0,"666":0,"667":0,"669":0,"671":0,"672":0,"677":0,"681":0,"685":0,"686":0,"687":0,"691":0,"692":0,"696":0,"698":0,"702":0,"706":0,"710":0,"711":0,"712":0,"713":0,"717":0,"722":0,"730":0,"731":0,"732":0,"734":0,"735":0,"741":0,"742":0,"744":0,"745":0,"751":0,"760":0,"762":0,"763":0,"764":0,"765":0,"770":0,"771":0,"775":0,"776":0,"777":0,"781":0,"783":0,"789":0,"795":0,"796":0,"797":0,"799":0,"802":0,"804":0,"806":0,"808":0,"809":0,"810":0,"811":0,"816":0,"817":0,"821":0,"822":0,"823":0,"827":0,"830":0,"840":0,"844":0,"845":0,"847":0,"852":0,"854":0,"857":0,"859":0,"862":0,"867":0,"870":0,"874":0,"876":0,"877":0,"880":0,"881":0,"882":0,"884":0,"887":0,"889":0,"893":0,"899":0,"903":0,"904":0,"908":0,"910":0,"913":0,"914":0,"915":0,"916":0,"918":0,"943":0,"947":0,"951":0,"969":0,"970":0,"971":0,"972":0,"973":0,"974":0,"975":0,"976":0,"977":0,"978":0,"981":0,"982":0,"983":0,"984":0,"985":0,"987":0,"988":0,"990":0,"998":0,"1000":0,"1001":0,"1002":0,"1003":0,"1004":0,"1005":0,"1006":0,"1008":0,"1014":0,"1015":0,"1018":0,"1019":0,"1020":0,"1023":0,"1027":0,"1028":0,"1029":0,"1030":0,"1031":0,"1033":0,"1034":0,"1035":0,"1037":0,"1038":0,"1044":0,"1048":0,"1052":0,"1053":0,"1057":0,"1058":0,"1062":0,"1066":0,"1067":0,"1068":0,"1070":0,"1074":0,"1078":0,"1079":0,"1080":0,"1081":0,"1082":0,"1084":0,"1087":0,"1091":0,"1092":0,"1096":0,"1100":0,"1102":0,"1105":0,"1114":0,"1117":0,"1118":0,"1121":0,"1122":0,"1123":0,"1124":0,"1127":0,"1129":0,"1130":0,"1131":0,"1136":0,"1142":0,"1148":0,"1154":0,"1157":0,"1158":0,"1162":0,"1165":0,"1166":0,"1168":0,"1175":0,"1176":0,"1180":0,"1183":0,"1184":0,"1188":0,"1193":0,"1205":0,"1206":0,"1207":0,"1208":0,"1209":0,"1210":0,"1211":0,"1219":0,"1220":0,"1221":0,"1222":0,"1223":0,"1224":0,"1225":0,"1230":0,"1236":0,"1237":0,"1240":0,"1243":0,"1245":0,"1259":0,"1260":0,"1262":0,"1263":0,"1264":0,"1267":0,"1268":0,"1272":0,"1273":0,"1274":0,"1276":0,"1341":0,"1342":0,"1346":0,"1347":0,"1351":0,"1352":0,"1354":0,"1357":0,"1358":0,"1361":0,"1363":0,"1364":0,"1369":0,"1370":0,"1371":0,"1372":0,"1374":0,"1377":0,"1379":0,"1380":0,"1381":0,"1384":0,"1388":0,"1390":0,"1391":0,"1399":0,"1400":0,"1405":0,"1406":0,"1407":0,"1408":0,"1409":0,"1411":0,"1416":0,"1417":0,"1421":0,"1423":0,"1426":0,"1427":0,"1428":0,"1431":0,"1432":0,"1441":0,"1442":0,"1443":0,"1444":0,"1446":0,"1447":0,"1451":0,"1454":0,"1455":0,"1456":0,"1457":0,"1461":0,"1462":0,"1463":0,"1470":0,"1471":0,"1472":0,"1473":0,"1474":0,"1475":0,"1479":0,"1484":0,"1485":0,"1486":0,"1490":0,"1491":0,"1492":0,"1493":0,"1494":0,"1496":0,"1500":0,"1501":0,"1505":0,"1506":0,"1508":0,"1510":0,"1513":0,"1535":0,"1536":0,"1540":0,"1541":0,"1544":0,"1562":0,"1563":0,"1566":0,"1569":0,"1570":0,"1572":0,"1576":0,"1577":0,"1581":0,"1582":0,"1588":0,"1589":0,"1590":0,"1592":0,"1596":0,"1601":0,"1602":0,"1603":0,"1606":0,"1609":0,"1610":0,"1615":0,"1618":0,"1621":0,"1624":0,"1627":0,"1630":0,"1634":0,"1635":0,"1638":0,"1648":0,"1649":0,"1652":0,"1654":0,"1656":0,"1659":0,"1662":0,"1663":0,"1667":0,"1668":0,"1669":0,"1671":0,"1676":0,"1677":0,"1682":0,"1683":0,"1689":0,"1690":0,"1694":0,"1695":0,"1700":0,"1701":0,"1704":0,"1705":0,"1709":0,"1715":0,"1720":0,"1723":0,"1727":0,"1729":0,"1735":0,"1736":0,"1737":0,"1739":0,"1740":0,"1741":0,"1742":0,"1744":0,"1745":0,"1747":0,"1750":0,"1754":0,"1758":0,"1759":0,"1760":0,"1764":0,"1765":0,"1766":0,"1768":0,"1770":0,"1771":0,"1774":0,"1775":0,"1776":0,"1779":0,"1784":0,"1785":0,"1786":0,"1788":0,"1789":0,"1790":0,"1796":0,"1797":0,"1802":0,"1805":0,"1807":0,"1809":0,"1811":0,"1812":0,"1813":0,"1823":0,"1826":0,"1830":0,"1834":0,"1835":0,"1836":0,"1839":0,"1840":0,"1842":0,"1843":0,"1847":0,"1849":0,"1851":0,"1853":0,"1854":0,"1855":0,"1858":0,"1859":0,"1860":0,"1862":0,"1865":0,"1870":0,"1872":0,"1877":0,"1881":0,"1882":0,"1883":0,"1886":0,"1890":0,"1891":0,"1895":0,"1896":0,"1899":0,"1900":0,"1906":0,"1907":0,"1909":0,"1910":0,"1916":0,"1918":0,"1920":0,"1921":0,"1922":0,"1923":0,"1926":0,"1927":0,"1930":0,"1933":0,"1936":0,"1938":0,"1939":0,"1944":0,"1945":0,"1951":0,"1952":0,"1954":0,"1955":0,"1956":0,"1957":0,"1962":0,"1967":0,"1973":0,"1974":0,"1978":0,"1979":0,"1980":0,"1982":0,"1984":0,"1985":0,"1986":0,"1987":0,"1988":0,"1991":0,"1992":0,"1995":0,"2004":0,"2006":0,"2010":0,"2011":0,"2016":0,"2020":0,"2021":0,"2023":0,"2024":0,"2025":0,"2031":0,"2034":0,"2035":0,"2036":0,"2040":0,"2041":0,"2043":0,"2044":0,"2046":0,"2047":0,"2048":0,"2051":0,"2053":0,"2054":0,"2055":0,"2058":0,"2064":0,"2068":0,"2070":0,"2071":0,"2072":0,"2075":0,"2076":0,"2078":0,"2079":0,"2080":0,"2082":0,"2085":0,"2087":0,"2088":0,"2091":0,"2096":0,"2100":0,"2103":0,"2104":0,"2105":0,"2109":0,"2110":0,"2112":0,"2118":0,"2120":0,"2121":0,"2124":0,"2125":0,"2127":0,"2131":0,"2137":0,"2140":0,"2141":0,"2142":0,"2146":0,"2150":0,"2153":0,"2154":0,"2155":0,"2157":0,"2158":0,"2161":0,"2163":0,"2170":0,"2173":0,"2175":0,"2176":0,"2179":0,"2180":0,"2183":0,"2184":0,"2186":0,"2190":0,"2191":0,"2192":0,"2193":0,"2194":0,"2195":0,"2196":0,"2200":0,"2203":0,"2204":0,"2210":0,"2216":0,"2217":0,"2222":0,"2229":0,"2230":0,"2234":0,"2235":0,"2236":0,"2237":0,"2240":0,"2244":0,"2247":0,"2248":0,"2252":0,"2257":0,"2258":0,"2261":0,"2265":0,"2267":0,"2268":0,"2271":0,"2272":0,"2274":0,"2283":0,"2287":0,"2288":0,"2291":0,"2292":0,"2296":0,"2297":0,"2300":0,"2304":0,"2305":0,"2306":0,"2309":0,"2311":0,"2312":0,"2313":0,"2315":0,"2316":0,"2319":0,"2320":0,"2323":0,"2324":0,"2328":0,"2331":0,"2338":0,"2341":0,"2343":0,"2345":0,"2346":0,"2348":0,"2349":0,"2350":0,"2354":0,"2355":0,"2357":0,"2360":0,"2361":0,"2372":0,"2373":0,"2374":0,"2378":0,"2379":0,"2380":0,"2381":0,"2383":0,"2391":0,"2392":0,"2394":0,"2399":0,"2400":0,"2403":0,"2424":0,"2428":0,"2429":0,"2432":0,"2434":0,"2436":0,"2437":0,"2440":0,"2441":0,"2442":0,"2445":0,"2449":0,"2450":0,"2453":0,"2463":0,"2465":0,"2476":0,"2480":0,"2482":0,"2487":0,"2488":0,"2490":0,"2494":0,"2495":0,"2497":0,"2500":0,"2502":0,"2507":0,"2509":0,"2517":0,"2519":0,"2520":0,"2521":0,"2527":0,"2528":0,"2529":0,"2530":0,"2532":0,"2538":0,"2539":0,"2541":0,"2542":0,"2543":0,"2551":0,"2554":0,"2555":0,"2557":0,"2564":0,"2565":0,"2566":0,"2568":0,"2569":0,"2575":0,"2576":0,"2580":0,"2583":0,"2590":0,"2591":0,"2593":0,"2595":0,"2596":0,"2599":0,"2600":0,"2603":0,"2609":0,"2610":0,"2614":0,"2615":0,"2616":0,"2619":0,"2624":0,"2625":0,"2627":0,"2628":0,"2633":0,"2640":0,"2647":0,"2651":0,"2656":0,"2657":0,"2661":0,"2662":0,"2663":0,"2664":0,"2668":0,"2669":0,"2673":0,"2674":0,"2675":0,"2677":0,"2678":0,"2679":0,"2682":0,"2687":0,"2692":0,"2693":0,"2695":0,"2696":0,"2697":0,"2700":0,"2703":0,"2706":0,"2709":0,"2721":0,"2722":0,"2723":0,"2724":0,"2727":0,"2729":0,"2730":0,"2732":0,"2733":0,"2738":0,"2739":0,"2741":0,"2742":0,"2747":0,"2748":0,"2750":0,"2754":0,"2758":0,"2766":0,"2770":0,"2771":0,"2775":0,"2776":0,"2777":0,"2778":0,"2779":0,"2782":0,"2783":0,"2784":0,"2786":0,"2789":0,"2790":0,"2791":0,"2792":0,"2793":0,"2796":0,"2797":0,"2799":0,"2803":0,"2805":0,"2806":0,"2808":0,"2809":0,"2816":0,"2817":0,"2818":0,"2821":0,"2826":0,"2827":0,"2831":0,"2845":0,"2846":0,"2850":0,"2855":0,"2856":0,"2859":0,"2861":0,"2862":0,"2865":0,"2867":0,"2868":0,"2869":0,"2872":0,"2874":0,"2878":0,"2886":0,"2887":0,"2888":0,"2889":0,"2890":0,"2891":0,"2894":0,"2897":0,"2898":0,"2899":0,"2900":0,"2903":0,"2907":0,"2908":0,"2909":0,"2913":0,"2914":0,"2917":0,"2918":0,"2919":0,"2924":0,"2925":0,"2927":0,"2928":0,"2929":0,"2930":0,"2931":0,"2935":0,"2936":0,"2941":0,"2943":0,"2944":0,"2946":0,"2947":0,"2948":0,"2951":0,"2952":0,"2953":0,"2956":0,"2959":0,"2961":0,"2968":0,"2971":0,"2973":0,"2974":0,"2978":0,"2979":0,"2980":0,"2982":0,"2983":0,"2989":0,"2995":0,"2997":0,"3006":0,"3007":0,"3010":0,"3011":0,"3016":0,"3018":0,"3021":0,"3022":0,"3023":0,"3024":0,"3025":0,"3026":0,"3028":0,"3029":0,"3033":0,"3034":0,"3037":0,"3038":0,"3045":0,"3046":0,"3050":0,"3051":0,"3052":0,"3054":0,"3055":0,"3059":0,"3061":0,"3062":0,"3064":0,"3067":0,"3068":0,"3069":0,"3070":0,"3071":0,"3079":0,"3080":0,"3083":0,"3097":0,"3098":0,"3101":0,"3108":0,"3113":0,"3114":0,"3115":0,"3116":0,"3118":0,"3119":0,"3123":0,"3124":0,"3129":0,"3130":0,"3133":0,"3138":0,"3139":0,"3143":0,"3148":0,"3150":0,"3151":0,"3152":0,"3156":0,"3157":0,"3161":0,"3162":0,"3166":0,"3168":0,"3187":0,"3188":0,"3193":0,"3194":0,"3204":0,"3212":0,"3213":0,"3215":0,"3217":0,"3218":0,"3225":0,"3227":0,"3229":0,"3230":0,"3234":0,"3236":0,"3240":0,"3241":0,"3244":0,"3248":0,"3250":0,"3251":0,"3255":0,"3256":0,"3257":0,"3261":0,"3266":0,"3270":0,"3271":0,"3275":0,"3278":0,"3281":0,"3282":0,"3284":0,"3285":0,"3290":0,"3292":0,"3294":0,"3295":0,"3296":0,"3300":0,"3301":0,"3305":0,"3309":0,"3311":0,"3312":0,"3313":0,"3316":0,"3317":0,"3320":0,"3323":0,"3324":0,"3332":0,"3336":0,"3341":0,"3349":0,"3350":0,"3351":0,"3352":0,"3354":0,"3360":0,"3362":0,"3365":0,"3366":0,"3370":0,"3372":0,"3374":0,"3375":0,"3376":0,"3378":0,"3386":0,"3387":0,"3388":0,"3389":0,"3396":0,"3397":0,"3401":0,"3407":0,"3409":0,"3413":0,"3417":0,"3418":0,"3419":0,"3420":0,"3423":0,"3424":0,"3425":0,"3428":0,"3431":0,"3434":0,"3435":0,"3437":0,"3438":0,"3439":0,"3440":0,"3443":0,"3449":0,"3452":0,"3453":0,"3458":0,"3460":0,"3466":0,"3467":0,"3470":0,"3472":0,"3475":0,"3477":0,"3478":0,"3482":0,"3483":0,"3490":0,"3493":0,"3496":0,"3498":0,"3500":0,"3501":0,"3503":0,"3504":0,"3506":0,"3509":0,"3511":0,"3512":0,"3513":0,"3514":0,"3516":0,"3517":0,"3520":0,"3521":0,"3522":0,"3525":0,"3526":0,"3527":0,"3528":0,"3531":0,"3532":0,"3533":0,"3535":0,"3536":0,"3539":0,"3541":0,"3542":0,"3546":0,"3549":0,"3550":0,"3552":0,"3553":0,"3558":0,"3560":0,"3562":0,"3563":0,"3565":0,"3567":0,"3569":0,"3570":0,"3572":0,"3573":0,"3575":0,"3576":0,"3581":0,"3584":0,"3588":0,"3589":0,"3592":0,"3593":0,"3597":0,"3601":0,"3605":0,"3606":0,"3610":0,"3611":0,"3617":0,"3622":0,"3623":0,"3626":0,"3629":0,"3633":0,"3634":0,"3635":0,"3638":0,"3642":0,"3646":0,"3651":0,"3652":0,"3653":0,"3654":0,"3657":0,"3662":0,"3663":0,"3666":0,"3667":0,"3676":0,"3678":0,"3704":0,"3706":0,"3707":0,"3708":0,"3711":0,"3716":0,"3717":0,"3721":0,"3724":0,"3726":0,"3727":0,"3730":0,"3804":0,"3806":0,"3807":0,"3809":0,"3812":0,"3818":0,"3819":0,"3824":0,"3825":0,"3831":0,"3832":0,"3834":0,"3840":0,"3841":0,"3842":0,"3846":0,"3847":0,"3854":0,"3855":0,"3856":0,"3859":0,"3864":0,"3867":0,"3869":0,"3873":0,"3874":0,"3876":0,"3877":0,"3879":0,"3880":0,"3882":0,"3886":0,"3887":0,"3888":0,"3889":0,"3892":0,"3893":0,"3896":0,"3897":0,"3900":0,"3902":0,"3903":0,"3905":0,"3906":0,"3907":0,"3910":0,"3913":0,"3914":0,"3915":0,"3918":0,"3922":0,"3924":0,"3925":0,"3930":0,"3931":0,"3932":0,"3935":0,"3936":0,"3937":0,"3943":0,"3946":0,"3947":0,"3950":0,"3951":0,"3955":0,"3956":0,"3957":0,"3958":0,"3963":0,"3964":0,"3965":0,"3966":0,"3971":0,"3972":0,"3973":0,"3974":0,"3975":0,"3980":0,"3981":0,"3982":0,"3993":0,"3994":0,"3999":0,"4000":0,"4003":0,"4004":0,"4007":0,"4008":0,"4011":0,"4012":0,"4018":0,"4020":0,"4023":0,"4026":0,"4029":0,"4030":0,"4034":0,"4036":0,"4038":0,"4042":0,"4045":0,"4046":0,"4047":0,"4050":0,"4053":0,"4054":0,"4057":0,"4058":0,"4060":0,"4061":0,"4063":0,"4064":0,"4066":0,"4067":0,"4074":0,"4088":0,"4091":0,"4098":0,"4099":0,"4102":0,"4106":0,"4107":0,"4109":0,"4119":0,"4120":0,"4124":0,"4127":0,"4128":0,"4132":0,"4133":0,"4134":0,"4138":0,"4140":0,"4144":0,"4145":0,"4150":0,"4151":0,"4165":0,"4168":0,"4170":0,"4171":0,"4174":0,"4187":0,"4189":0,"4191":0,"4192":0,"4197":0,"4198":0,"4201":0,"4202":0,"4205":0,"4209":0,"4210":0,"4211":0,"4214":0,"4215":0,"4216":0,"4218":0,"4225":0,"4226":0,"4228":0,"4232":0,"4239":0,"4240":0,"4241":0,"4245":0,"4246":0,"4247":0,"4248":0,"4253":0,"4254":0,"4256":0,"4258":0,"4259":0,"4264":0,"4265":0,"4266":0,"4268":0,"4269":0,"4274":0,"4275":0,"4277":0,"4278":0,"4280":0,"4281":0,"4284":0,"4286":0,"4299":0,"4300":0,"4301":0,"4304":0,"4305":0,"4308":0,"4309":0,"4310":0,"4311":0,"4312":0,"4313":0,"4314":0,"4321":0,"4322":0,"4326":0,"4327":0,"4329":0,"4332":0,"4333":0,"4334":0,"4338":0,"4339":0,"4342":0,"4346":0,"4347":0,"4348":0,"4352":0,"4362":0,"4369":0,"4370":0,"4374":0,"4375":0,"4376":0,"4378":0,"4381":0,"4382":0,"4383":0,"4387":0,"4391":0,"4400":0,"4404":0,"4406":0,"4411":0,"4412":0,"4413":0,"4418":0,"4419":0,"4420":0,"4425":0,"4426":0,"4431":0,"4432":0,"4437":0,"4441":0,"4447":0,"4448":0,"4454":0,"4455":0,"4458":0,"4462":0,"4471":0,"4472":0,"4473":0,"4474":0,"4475":0,"4477":0,"4479":0,"4483":0,"4487":0,"4490":0,"4506":0,"4507":0,"4511":0,"4515":0,"4516":0,"4520":0,"4525":0,"4529":0,"4533":0,"4537":0,"4538":0,"4540":0,"4544":0,"4545":0,"4547":0,"4551":0,"4552":0,"4554":0,"4558":0,"4559":0,"4561":0,"4566":0,"4567":0,"4568":0,"4571":0,"4573":0,"4574":0,"4575":0,"4578":0,"4581":0,"4584":0,"4586":0,"4587":0,"4588":0,"4591":0,"4598":0,"4599":0,"4600":0,"4603":0,"4604":0,"4607":0,"4615":0,"4616":0,"4619":0,"4620":0,"4622":0,"4623":0,"4628":0,"4629":0,"4630":0,"4633":0,"4635":0,"4636":0,"4637":0,"4640":0,"4641":0,"4644":0,"4645":0,"4646":0,"4651":0,"4658":0,"4659":0,"4662":0,"4663":0,"4666":0,"4667":0,"4669":0,"4670":0,"4671":0,"4672":0,"4677":0,"4680":0,"4681":0,"4684":0,"4685":0,"4688":0,"4689":0,"4692":0,"4693":0,"4694":0,"4696":0,"4699":0,"4700":0,"4701":0,"4703":0,"4706":0,"4709":0,"4710":0,"4711":0,"4714":0,"4718":0,"4719":0,"4723":0,"4724":0,"4725":0,"4726":0,"4730":0,"4731":0,"4738":0,"4746":0,"4747":0,"4751":0,"4754":0,"4755":0,"4756":0,"4764":0,"4765":0,"4768":0,"4769":0,"4770":0,"4771":0,"4772":0,"4773":0,"4774":0,"4777":0,"4778":0,"4779":0,"4780":0,"4782":0,"4787":0,"4788":0,"4789":0,"4790":0,"4798":0,"4799":0,"4801":0,"4802":0,"4803":0,"4804":0,"4807":0,"4812":0,"4813":0,"4819":0,"4820":0,"4821":0,"4822":0,"4823":0,"4824":0,"4830":0,"4833":0,"4834":0,"4835":0,"4837":0,"4838":0,"4840":0,"4842":0,"4843":0,"4846":0,"4871":0,"4872":0,"4876":0,"4877":0,"4878":0,"4881":0,"4882":0,"4883":0,"4884":0,"4890":0,"4892":0,"4893":0,"4894":0,"4895":0,"4899":0,"4904":0,"4905":0,"4907":0,"4913":0,"4914":0,"4922":0,"4925":0,"4928":0,"4934":0,"4935":0,"4936":0,"4939":0,"4942":0,"4944":0,"4945":0,"4946":0,"4947":0,"4950":0,"4959":0,"4963":0,"4966":0,"4967":0,"4970":0,"4982":0,"4983":0,"4984":0,"4988":0,"4989":0,"4990":0,"4991":0,"4992":0,"4993":0,"4996":0,"4997":0,"4998":0,"5003":0,"5005":0,"5006":0,"5010":0,"5011":0,"5017":0,"5018":0,"5019":0,"5020":0,"5023":0,"5025":0,"5026":0,"5027":0,"5028":0,"5034":0,"5038":0,"5041":0,"5044":0,"5049":0,"5050":0,"5051":0,"5054":0,"5057":0,"5058":0,"5063":0,"5064":0,"5069":0,"5071":0,"5072":0,"5074":0,"5075":0,"5076":0,"5077":0,"5078":0,"5080":0,"5085":0,"5087":0,"5090":0,"5091":0,"5093":0,"5094":0,"5096":0,"5099":0,"5100":0,"5104":0,"5106":0,"5109":0,"5110":0,"5114":0,"5115":0,"5116":0,"5119":0,"5123":0,"5124":0,"5127":0,"5128":0,"5130":0,"5132":0,"5139":0,"5140":0,"5141":0,"5142":0,"5143":0,"5146":0,"5155":0,"5162":0,"5165":0,"5166":0,"5167":0,"5189":0,"5195":0,"5198":0,"5199":0,"5205":0,"5206":0,"5210":0,"5214":0,"5215":0,"5216":0,"5221":0,"5222":0,"5223":0,"5228":0,"5230":0,"5234":0,"5235":0,"5245":0,"5246":0,"5248":0,"5249":0,"5251":0,"5253":0,"5255":0,"5256":0,"5257":0,"5259":0,"5260":0,"5263":0,"5264":0,"5265":0,"5268":0,"5271":0,"5272":0,"5278":0,"5281":0,"5282":0,"5285":0,"5289":0,"5290":0,"5291":0,"5296":0,"5298":0,"5300":0,"5303":0,"5304":0,"5305":0,"5308":0,"5312":0,"5317":0,"5324":0,"5327":0,"5328":0,"5329":0,"5332":0,"5333":0,"5334":0,"5335":0,"5336":0,"5337":0,"5338":0,"5339":0,"5343":0,"5355":0,"5357":0,"5360":0,"5361":0,"5362":0,"5363":0,"5364":0,"5370":0,"5372":0,"5373":0,"5374":0,"5376":0,"5378":0,"5379":0,"5380":0,"5381":0,"5382":0,"5389":0,"5393":0,"5397":0,"5398":0,"5399":0,"5400":0,"5407":0,"5411":0,"5415":0,"5426":0,"5434":0,"5435":0,"5437":0,"5438":0,"5439":0,"5440":0,"5442":0,"5446":0,"5448":0,"5456":0,"5457":0,"5461":0,"5462":0,"5466":0,"5472":0,"5477":0,"5483":0,"5489":0,"5493":0,"5494":0,"5497":0,"5498":0,"5499":0,"5502":0,"5505":0,"5507":0,"5508":0,"5511":0,"5514":0,"5517":0,"5520":0,"5523":0,"5526":0,"5529":0,"5532":0,"5535":0,"5538":0,"5541":0,"5546":0,"5547":0,"5549":0,"5550":0,"5553":0,"5554":0,"5557":0,"5559":0,"5560":0,"5563":0,"5567":0,"5569":0,"5570":0,"5573":0,"5579":0,"5582":0,"5583":0,"5584":0,"5586":0,"5588":0,"5592":0,"5594":0,"5595":0,"5596":0,"5600":0,"5605":0,"5609":0,"5611":0,"5612":0,"5613":0,"5614":0,"5617":0,"5618":0,"5619":0,"5622":0,"5623":0,"5624":0,"5627":0,"5628":0,"5630":0,"5634":0,"5635":0,"5638":0,"5639":0,"5642":0,"5643":0,"5644":0,"5649":0,"5652":0,"5681":0,"5682":0,"5683":0,"5687":0,"5688":0,"5691":0,"5693":0,"5694":0,"5701":0,"5702":0,"5703":0,"5707":0,"5709":0,"5711":0,"5712":0,"5715":0,"5716":0,"5718":0,"5719":0,"5722":0,"5726":0,"5730":0,"5731":0,"5732":0,"5736":0,"5737":0,"5740":0,"5741":0,"5744":0,"5750":0,"5752":0,"5753":0,"5758":0,"5759":0,"5760":0,"5766":0,"5767":0,"5768":0,"5774":0,"5775":0,"5776":0,"5782":0,"5783":0,"5784":0,"5788":0,"5789":0,"5790":0,"5795":0,"5796":0,"5797":0,"5801":0,"5802":0,"5803":0,"5809":0,"5812":0,"5813":0,"5814":0,"5815":0,"5816":0,"5819":0,"5820":0,"5825":0,"5829":0,"5832":0,"5834":0,"5835":0,"5839":0,"5840":0,"5844":0,"5848":0,"5849":0,"5851":0,"5852":0,"5857":0,"5858":0,"5862":0,"5863":0,"5869":0,"5874":0,"5876":0,"5877":0,"5879":0,"5880":0,"5881":0,"5882":0,"5886":0,"5892":0,"5893":0,"5899":0,"5902":0,"5903":0,"5904":0,"5905":0,"5909":0,"5910":0,"5913":0,"5914":0,"5917":0,"5919":0,"5920":0,"5922":0,"5927":0,"5933":0,"5939":0,"5941":0,"5948":0,"5949":0,"5950":0,"5954":0,"5955":0,"5956":0,"5957":0,"5958":0,"5962":0,"5963":0,"5964":0,"5965":0,"5967":0,"5968":0,"5971":0,"5972":0,"5977":0,"5978":0,"5990":0,"5992":0,"5993":0,"5994":0,"5995":0,"5996":0,"6005":0,"6008":0,"6011":0,"6012":0,"6018":0,"6022":0,"6023":0,"6026":0,"6028":0,"6029":0,"6032":0,"6037":0,"6038":0,"6039":0,"6041":0,"6042":0,"6043":0,"6049":0,"6050":0,"6054":0,"6055":0,"6058":0,"6059":0,"6064":0,"6065":0,"6070":0,"6071":0,"6074":0,"6076":0,"6079":0,"6080":0,"6087":0,"6088":0,"6091":0,"6096":0,"6100":0,"6101":0,"6106":0,"6107":0,"6111":0,"6112":0,"6115":0,"6116":0,"6121":0,"6124":0,"6125":0,"6131":0,"6132":0,"6133":0,"6140":0,"6146":0,"6147":0,"6148":0,"6151":0,"6152":0,"6153":0,"6157":0,"6158":0,"6162":0,"6165":0,"6167":0,"6174":0,"6175":0,"6182":0,"6183":0,"6184":0,"6186":0,"6187":0,"6188":0,"6189":0,"6192":0,"6197":0,"6198":0,"6199":0,"6201":0,"6202":0,"6205":0,"6210":0,"6211":0,"6212":0,"6216":0,"6218":0,"6223":0,"6224":0,"6228":0,"6229":0,"6232":0,"6240":0,"6243":0,"6244":0,"6249":0,"6251":0,"6252":0,"6258":0,"6259":0,"6261":0,"6262":0,"6263":0,"6265":0,"6266":0,"6271":0,"6274":0,"6278":0,"6283":0,"6284":0,"6288":0,"6289":0,"6290":0,"6293":0,"6294":0,"6298":0,"6299":0,"6300":0,"6303":0,"6304":0,"6305":0,"6308":0,"6311":0,"6312":0,"6313":0,"6314":0,"6317":0,"6318":0,"6322":0,"6325":0,"6326":0,"6334":0,"6335":0,"6336":0,"6342":0,"6343":0,"6346":0,"6349":0,"6353":0,"6354":0,"6356":0,"6361":0,"6362":0,"6367":0,"6368":0,"6369":0,"6370":0,"6371":0,"6372":0,"6378":0,"6380":0,"6382":0,"6385":0,"6391":0,"6393":0,"6395":0,"6396":0,"6398":0,"6401":0,"6402":0,"6408":0,"6412":0,"6419":0,"6421":0,"6423":0,"6424":0,"6426":0,"6427":0,"6428":0,"6429":0,"6430":0,"6434":0,"6440":0,"6442":0,"6447":0,"6448":0,"6450":0,"6451":0,"6454":0,"6457":0,"6465":0,"6467":0,"6472":0,"6473":0,"6475":0,"6482":0,"6488":0,"6489":0,"6491":0,"6492":0,"6493":0,"6497":0,"6498":0,"6499":0,"6500":0,"6503":0,"6505":0,"6506":0,"6507":0,"6509":0,"6510":0,"6511":0,"6512":0,"6513":0,"6514":0,"6515":0,"6516":0,"6519":0,"6521":0,"6522":0,"6523":0,"6527":0,"6552":0,"6555":0,"6556":0,"6560":0,"6564":0,"6565":0,"6566":0,"6567":0,"6571":0,"6574":0,"6575":0,"6576":0,"6579":0,"6580":0,"6585":0,"6586":0,"6587":0,"6588":0,"6590":0,"6591":0,"6594":0,"6595":0,"6601":0,"6602":0,"6605":0,"6607":0,"6608":0,"6615":0,"6616":0,"6617":0,"6618":0,"6620":0,"6621":0,"6625":0,"6628":0,"6630":0,"6631":0,"6637":0,"6640":0,"6643":0,"6645":0,"6646":0,"6649":0,"6650":0,"6651":0,"6653":0,"6659":0,"6665":0,"6667":0,"6668":0,"6697":0,"6698":0,"6702":0,"6706":0,"6710":0,"6713":0,"6714":0,"6717":0,"6718":0,"6720":0,"6724":0,"6725":0,"6729":0,"6730":0,"6734":0,"6737":0,"6738":0,"6744":0,"6745":0,"6749":0,"6754":0,"6758":0,"6762":0,"6765":0,"6766":0,"6770":0,"6771":0,"6775":0,"6776":0,"6780":0,"6781":0,"6782":0,"6784":0,"6789":0,"6793":0,"6794":0,"6795":0,"6798":0,"6801":0,"6802":0,"6805":0,"6811":0,"6812":0,"6813":0,"6817":0,"6819":0,"6820":0,"6821":0,"6828":0,"6829":0,"6830":0,"6831":0,"6833":0,"6834":0,"6836":0,"6837":0,"6838":0,"6842":0,"6844":0,"6845":0,"6846":0,"6852":0,"6853":0,"6863":0,"6866":0,"6867":0,"6870":0,"6871":0,"6873":0,"6874":0,"6877":0,"6878":0,"6879":0,"6883":0,"6887":0,"6888":0,"6889":0,"6894":0,"6895":0,"6903":0,"6905":0,"6908":0,"6912":0,"6914":0,"6915":0,"6919":0,"6920":0,"6924":0,"6927":0,"6928":0,"6933":0,"6936":0,"6939":0,"6946":0,"6948":0,"6949":0,"6950":0,"6954":0,"6955":0,"6960":0,"6963":0,"6967":0,"6979":0,"6980":0,"6981":0,"6984":0,"6986":0,"6990":0,"6992":0,"7003":0,"7004":0,"7005":0,"7006":0,"7009":0,"7011":0,"7012":0,"7016":0,"7018":0,"7021":0,"7022":0,"7024":0,"7027":0,"7028":0,"7029":0,"7032":0,"7038":0,"7050":0,"7051":0,"7054":0,"7060":0,"7067":0,"7070":0,"7076":0,"7079":0,"7080":0,"7085":0,"7094":0,"7095":0,"7096":0,"7100":0,"7101":0,"7102":0,"7112":0,"7113":0,"7114":0,"7116":0,"7117":0,"7119":0,"7128":0,"7129":0,"7130":0,"7133":0,"7134":0,"7139":0,"7144":0,"7146":0,"7152":0,"7153":0,"7157":0,"7161":0,"7162":0,"7165":0,"7171":0,"7173":0,"7176":0,"7177":0,"7180":0,"7185":0,"7187":0,"7191":0,"7200":0,"7201":0,"7205":0,"7206":0,"7210":0,"7211":0,"7215":0,"7217":0,"7218":0,"7224":0,"7225":0,"7230":0,"7233":0,"7234":0,"7236":0,"7238":0,"7239":0,"7241":0,"7251":0,"7255":0,"7257":0,"7258":0,"7263":0,"7266":0,"7308":0,"7309":0,"7313":0,"7314":0,"7315":0,"7319":0,"7322":0,"7325":0,"7327":0,"7328":0,"7329":0,"7332":0,"7337":0,"7339":0,"7340":0,"7343":0,"7344":0,"7345":0,"7347":0,"7349":0,"7356":0,"7359":0,"7360":0,"7362":0,"7364":0,"7370":0,"7371":0,"7374":0,"7375":0,"7376":0,"7378":0,"7379":0,"7386":0,"7387":0,"7392":0,"7398":0,"7399":0,"7401":0,"7402":0,"7403":0,"7406":0,"7407":0,"7411":0,"7412":0,"7413":0,"7417":0,"7418":0,"7421":0,"7425":0,"7426":0,"7427":0,"7431":0,"7434":0,"7435":0,"7438":0,"7439":0,"7443":0,"7451":0,"7452":0,"7458":0,"7461":0,"7478":0,"7482":0,"7483":0,"7484":0,"7488":0,"7489":0,"7491":0,"7492":0,"7493":0,"7494":0,"7497":0,"7507":0,"7510":0,"7514":0,"7521":0,"7523":0,"7526":0,"7527":0,"7529":0,"7530":0,"7607":0,"7608":0,"7609":0,"7613":0,"7615":0,"7659":0,"7660":0,"7661":0,"7662":0,"7664":0,"7669":0,"7674":0,"7675":0,"7676":0,"7677":0,"7678":0,"7679":0,"7682":0,"7684":0,"7689":0,"7690":0,"7692":0,"7697":0,"7698":0,"7699":0,"7701":0,"7702":0,"7709":0,"7710":0,"7714":0,"7715":0,"7719":0,"7722":0,"7723":0,"7728":0,"7731":0,"7734":0,"7737":0,"7738":0,"7742":0,"7745":0,"7747":0,"7748":0,"7749":0,"7751":0,"7752":0,"7753":0,"7758":0,"7760":0,"7761":0,"7766":0,"7767":0,"7768":0,"7769":0,"7770":0,"7775":0,"7776":0,"7777":0,"7778":0,"7779":0,"7785":0,"7786":0,"7789":0,"7790":0,"7792":0,"7796":0,"7797":0,"7799":0,"7800":0,"7805":0,"7807":0,"7808":0,"7810":0,"7811":0,"7817":0,"7818":0,"7819":0,"7820":0,"7823":0,"7824":0,"7825":0,"7826":0,"7827":0,"7828":0,"7831":0,"7832":0,"7835":0,"7841":0,"7844":0,"7847":0,"7848":0,"7849":0,"7854":0,"7855":0,"7859":0,"7862":0,"7863":0,"7867":0,"7870":0,"7873":0,"7876":0,"7877":0,"7881":0,"7884":0,"7885":0,"7887":0,"7891":0,"7894":0,"7896":0,"7901":0,"7906":0,"7907":0,"7911":0,"7912":0,"7913":0,"7914":0,"7916":0,"7917":0,"7922":0,"7930":0,"7931":0,"7935":0,"7937":0,"7942":0,"7945":0,"7946":0,"7950":0,"7953":0,"7954":0,"7956":0,"7958":0,"7959":0,"7962":0,"7963":0,"7964":0,"7968":0,"7969":0,"7970":0,"7973":0,"7974":0,"7977":0,"7982":0,"7999":0,"8001":0,"8007":0,"8008":0,"8009":0,"8014":0,"8015":0,"8016":0,"8017":0,"8022":0,"8023":0,"8024":0,"8025":0,"8026":0,"8032":0,"8033":0,"8036":0,"8037":0,"8038":0,"8039":0,"8041":0,"8042":0,"8046":0,"8052":0,"8053":0,"8054":0,"8056":0,"8061":0,"8063":0,"8071":0,"8072":0,"8076":0,"8077":0,"8078":0,"8083":0,"8086":0,"8089":0,"8092":0,"8095":0,"8096":0,"8099":0,"8100":0,"8103":0,"8105":0,"8107":0,"8108":0,"8111":0,"8112":0,"8113":0,"8116":0,"8123":0,"8126":0,"8127":0,"8129":0,"8130":0,"8132":0,"8139":0,"8143":0,"8145":0,"8151":0,"8154":0,"8155":0,"8156":0,"8161":0,"8163":0,"8173":0,"8176":0,"8179":0,"8182":0,"8183":0,"8184":0,"8185":0,"8186":0,"8187":0,"8191":0,"8192":0,"8193":0,"8195":0,"8199":0,"8202":0,"8203":0,"8207":0,"8209":0,"8212":0,"8214":0,"8217":0,"8221":0,"8222":0,"8225":0,"8229":0,"8233":0,"8242":0,"8243":0,"8249":0,"8250":0,"8251":0,"8253":0,"8254":0,"8255":0,"8260":0,"8263":0,"8265":0,"8268":0,"8272":0,"8274":0,"8276":0,"8277":0,"8280":0,"8283":0,"8285":0,"8288":0,"8291":0,"8292":0,"8296":0,"8299":0,"8300":0,"8306":0,"8310":0,"8311":0,"8317":0,"8321":0,"8322":0,"8328":0,"8329":0,"8330":0,"8334":0,"8335":0,"8336":0,"8342":0,"8350":0,"8356":0,"8357":0,"8364":0,"8366":0,"8368":0,"8370":0,"8372":0,"8376":0,"8381":0,"8382":0,"8384":0,"8388":0,"8389":0,"8390":0,"8395":0,"8396":0,"8404":0,"8405":0,"8409":0,"8410":0,"8411":0,"8418":0,"8421":0,"8423":0,"8432":0,"8435":0,"8438":0,"8441":0,"8442":0,"8443":0,"8444":0,"8449":0,"8451":0,"8452":0,"8455":0,"8456":0,"8457":0,"8458":0,"8461":0,"8462":0,"8467":0,"8468":0,"8474":0,"8475":0,"8478":0,"8486":0,"8487":0,"8489":0,"8490":0,"8495":0,"8496":0,"8501":0,"8502":0,"8506":0,"8508":0,"8509":0,"8512":0,"8514":0,"8515":0,"8518":0,"8519":0,"8520":0,"8523":0,"8525":0,"8530":0,"8531":0,"8538":0,"8545":0,"8553":0,"8554":0,"8555":0,"8558":0,"8562":0,"8564":0,"8567":0,"8570":0,"8571":0,"8578":0,"8579":0,"8581":0,"8583":0,"8588":0,"8589":0,"8590":0,"8592":0,"8595":0,"8596":0,"8597":0,"8600":0,"8601":0,"8604":0,"8610":0,"8611":0,"8617":0,"8620":0,"8626":0,"8627":0,"8630":0,"8632":0,"8633":0,"8635":0,"8636":0,"8649":0,"8651":0,"8652":0,"8655":0,"8660":0,"8661":0,"8666":0,"8667":0,"8669":0,"8671":0,"8676":0,"8678":0,"8679":0,"8680":0,"8681":0,"8685":0,"8687":0,"8688":0,"8691":0,"8700":0,"8706":0,"8707":0,"8710":0,"8711":0,"8712":0,"8713":0,"8714":0,"8715":0,"8716":0,"8719":0,"8720":0,"8721":0,"8724":0,"8725":0,"8726":0,"8727":0,"8731":0,"8732":0,"8733":0,"8734":0,"8738":0,"8743":0,"8746":0,"8747":0,"8748":0,"8750":0,"8753":0,"8757":0,"8758":0,"8759":0,"8760":0,"8765":0,"8766":0,"8768":0,"8773":0,"8774":0,"8782":0,"8783":0,"8784":0,"8785":0,"8786":0,"8787":0,"8788":0,"8789":0,"8793":0,"8795":0,"8798":0,"8799":0,"8800":0,"8801":0,"8808":0,"8813":0,"8817":0,"8822":0,"8823":0,"8826":0,"8831":0,"8832":0,"8833":0,"8834":0,"8835":0,"8836":0,"8837":0,"8844":0,"8845":0,"8846":0,"8847":0,"8848":0,"8849":0,"8851":0,"8855":0,"8856":0,"8857":0,"8858":0,"8859":0,"8861":0,"8862":0,"8865":0,"8866":0,"8867":0,"8868":0,"8869":0,"8872":0,"8873":0,"8874":0,"8875":0,"8877":0,"8878":0,"8879":0,"8880":0,"8881":0,"8888":0,"8889":0,"8891":0,"8893":0,"8896":0,"8897":0,"8898":0,"8899":0,"8900":0,"8901":0,"8902":0,"8905":0,"8907":0,"8912":0,"8915":0,"8916":0,"8920":0,"8922":0,"8924":0,"8925":0,"8928":0,"8929":0,"8931":0,"8933":0,"8937":0,"8939":0,"8942":0,"8944":0,"8946":0,"8953":0,"8955":0,"8960":0,"8961":0,"8962":0,"8963":0,"8965":0,"8974":0,"8976":0,"8977":0,"8982":0,"8983":0,"8984":0,"8985":0,"8993":0,"8997":0,"9003":0,"9007":0,"9010":0,"9011":0,"9015":0,"9020":0,"9021":0,"9022":0,"9023":0,"9026":0,"9027":0,"9028":0,"9029":0,"9031":0,"9032":0,"9035":0,"9036":0,"9041":0,"9042":0,"9043":0,"9046":0,"9047":0,"9048":0,"9053":0,"9054":0,"9055":0,"9056":0,"9057":0,"9064":0,"9065":0,"9072":0,"9073":0,"9079":0,"9080":0,"9081":0,"9082":0,"9085":0,"9086":0,"9089":0,"9093":0,"9101":0,"9102":0,"9106":0,"9107":0,"9114":0,"9118":0,"9119":0,"9123":0,"9125":0,"9126":0,"9127":0,"9130":0,"9131":0,"9135":0,"9138":0,"9140":0,"9143":0,"9147":0,"9148":0,"9149":0,"9150":0,"9154":0,"9155":0,"9157":0,"9158":0,"9162":0,"9163":0,"9167":0,"9168":0,"9169":0,"9173":0,"9175":0,"9176":0,"9177":0,"9180":0,"9188":0,"9190":0,"9191":0,"9192":0,"9193":0,"9197":0,"9199":0,"9200":0,"9201":0,"9204":0,"9208":0,"9213":0,"9214":0,"9217":0,"9218":0,"9221":0,"9224":0,"9225":0,"9230":0,"9231":0,"9233":0,"9234":0,"9235":0,"9236":0,"9237":0,"9238":0,"9244":0,"9247":0,"9250":0,"9251":0,"9252":0,"9255":0,"9259":0,"9262":0,"9263":0,"9266":0,"9274":0,"9275":0,"9276":0,"9277":0,"9279":0,"9280":0,"9283":0,"9284":0,"9287":0,"9288":0,"9290":0,"9291":0,"9294":0,"9295":0,"9297":0,"9303":0,"9306":0,"9307":0,"9310":0,"9322":0,"9323":0,"9326":0,"9327":0,"9330":0,"9337":0,"9338":0,"9339":0,"9340":0,"9342":0,"9349":0,"9350":0,"9352":0,"9353":0,"9354":0,"9356":0,"9357":0,"9362":0,"9363":0,"9369":0,"9375":0,"9376":0,"9383":0,"9384":0,"9386":0,"9387":0,"9390":0,"9391":0,"9393":0,"9397":0,"9401":0,"9402":0,"9406":0,"9413":0,"9424":0,"9438":0,"9439":0};
_yuitest_coverage["build/libbit-jquery/libbit-jquery.js"].functions = {"jQuery:44":0,"fcamelCase:77":0,"DOMContentLoaded:82":0,"init:99":0,"size:197":0,"toArray:201":0,"get:207":0,"pushStack:219":0,"each:242":0,"ready:246":0,"eq:253":0,"first:260":0,"last:264":0,"slice:268":0,"(anonymous 3):274":0,"map:273":0,"end:279":0,"extend:293":0,"noConflict:358":0,"holdReady:378":0,"ready:387":0,"isFunction:419":0,"(anonymous 4):423":0,"isWindow:427":0,"isNumeric:431":0,"type:435":0,"isPlainObject:441":0,"isEmptyObject:470":0,"error:478":0,"parseHTML:485":0,"parseJSON:506":0,"parseXML:532":0,"(anonymous 5):565":0,"globalEval:560":0,"camelCase:573":0,"nodeName:577":0,"each:582":0,"(anonymous 6):625":0,"}:632":0,"makeArray:639":0,"inArray:658":0,"merge:680":0,"grep:701":0,"map:721":0,"proxy:776":0,"proxy:759":0,"fn:810":0,"access:788":0,"now:839":0,"doScrollCheck:881":0,"promise:844":0,"(anonymous 7):903":0,"(anonymous 8):915":0,"createOptions:913":0,"fire:968":0,"(anonymous 9):1002":0,"add:1001":0,"add:997":0,"(anonymous 10):1028":0,"remove:1026":0,"has:1047":0,"empty:1051":0,"disable:1056":0,"disabled:1061":0,"lock:1065":0,"locked:1073":0,"fireWith:1077":0,"fire:1090":0,"fired:1095":0,"Callbacks:943":0,"state:1113":0,"always:1116":0,"(anonymous 13):1128":0,"(anonymous 12):1123":0,"(anonymous 11):1122":0,"then:1120":0,"promise:1147":0,"(anonymous 15):1166":0,"(anonymous 14):1157":0,"Deferred:1104":0,"(anonymous 16):1205":0,"updateFunc:1204":0,"when:1192":0,"clickFn:1358":0,"(anonymous 18):1416":0,"(anonymous 17):1243":0,"hasData:1534":0,"data:1539":0,"removeData:1633":0,"_data:1714":0,"acceptData:1719":0,"(anonymous 19):1759":0,"(anonymous 21):1785":0,"(anonymous 20):1768":0,"data:1728":0,"(anonymous 22):1796":0,"removeData:1795":0,"dataAttr:1802":0,"isEmptyDataObject:1834":0,"queue:1850":0,"next:1876":0,"dequeue:1869":0,"(anonymous 23):1908":0,"_queueHooks:1905":0,"(anonymous 24):1932":0,"queue:1917":0,"(anonymous 25):1944":0,"dequeue:1943":0,"stop:1956":0,"(anonymous 26):1954":0,"delay:1950":0,"clearQueue:1961":0,"resolve:1972":0,"promise:1966":0,"attr:2005":0,"(anonymous 27):2010":0,"removeAttr:2009":0,"prop:2015":0,"(anonymous 28):2021":0,"removeProp:2019":0,"(anonymous 29):2035":0,"addClass:2030":0,"(anonymous 30):2071":0,"removeClass:2067":0,"(anonymous 31):2104":0,"(anonymous 32):2109":0,"toggleClass:2099":0,"hasClass:2136":0,"(anonymous 34):2195":0,"(anonymous 33):2175":0,"val:2149":0,"get:2213":0,"get:2221":0,"(anonymous 35):2267":0,"set:2264":0,"attr:2282":0,"removeAttr:2337":0,"set:2370":0,"get:2390":0,"set:2398":0,"prop:2423":0,"get:2460":0,"get:2477":0,"set:2486":0,"get:2518":0,"set:2525":0,"set:2540":0,"(anonymous 36):2538":0,"set:2553":0,"get:2567":0,"(anonymous 37):2565":0,"get:2577":0,"set:2582":0,"get:2592":0,"get:2617":0,"(anonymous 38):2615":0,"set:2626":0,"(anonymous 39):2624":0,"hoverHack:2639":0,"eventHandle:2679":0,"add:2649":0,"remove:2764":0,"trigger:2843":0,"dispatch:2992":0,"filter:3094":0,"filter:3107":0,"fix:3137":0,"setup:3185":0,"teardown:3192":0,"simulate:3200":0,"(anonymous 40):3228":0,"}:3233":0,"Event:3248":0,"returnFalse:3281":0,"returnTrue:3284":0,"preventDefault:3291":0,"stopPropagation:3308":0,"stopImmediatePropagation:3322":0,"handle:3340":0,"(anonymous 41):3335":0,"(anonymous 43):3375":0,"(anonymous 42):3370":0,"setup:3363":0,"postDispatch:3384":0,"teardown:3394":0,"(anonymous 44):3418":0,"(anonymous 45):3423":0,"(anonymous 47):3438":0,"(anonymous 46):3434":0,"setup:3411":0,"handle:3448":0,"teardown:3457":0,"handler:3471":0,"setup:3476":0,"teardown:3481":0,"(anonymous 48):3467":0,"fn:3533":0,"(anonymous 49):3541":0,"on:3492":0,"one:3545":0,"(anonymous 50):3575":0,"off:3548":0,"bind:3580":0,"unbind:3583":0,"live:3587":0,"die:3591":0,"delegate:3596":0,"undelegate:3599":0,"(anonymous 51):3605":0,"trigger:3604":0,"triggerHandler:3609":0,"toggler:3620":0,"toggle:3615":0,"hover:3641":0,"]:3651":0,"(anonymous 52):3648":0,"(anonymous 54):3703":0,"markFunction:3715":0,"(anonymous 55):3724":0,"createCache:3720":0,"assert:3803":0,"(anonymous 56):3817":0,"(anonymous 57):3823":0,"(anonymous 58):3830":0,"(anonymous 59):3838":0,"(anonymous 60):3852":0,"slice:3876":0,"Sizzle:3886":0,"matches:3946":0,"matchesSelector:3950":0,"(anonymous 61):3956":0,"createInputPseudo:3955":0,"(anonymous 62):3964":0,"createButtonPseudo:3963":0,"(anonymous 64):3974":0,"(anonymous 63):3972":0,"createPositionalPseudo:3971":0,"getText:3993":0,"isXML:4026":0,"(anonymous 65):4035":0,"(anonymous 66):4041":0,"}:4044":0,"attr:4053":0,"\"href\":4087":0,"\"type\":4090":0,"(anonymous 67):4097":0,"}:4105":0,"(anonymous 68):4118":0,"}:4123":0,"(anonymous 69):4143":0,"(anonymous 70):4149":0,"\"ATTR\":4164":0,"\"CHILD\":4177":0,"\"PSEUDO\":4208":0,"(anonymous 72):4240":0,"(anonymous 71):4238":0,"(anonymous 73):4246":0,"}:4244":0,"(anonymous 74):4254":0,"(anonymous 75):4258":0,"\"TAG\":4252":0,"(anonymous 76):4268":0,"\"CLASS\":4263":0,"(anonymous 77):4274":0,"\"ATTR\":4273":0,"(anonymous 78):4300":0,"(anonymous 79):4326":0,"\"CHILD\":4297":0,"(anonymous 80):4377":0,"):4386":0,"\"PSEUDO\":4357":0,"(anonymous 82):4405":0,"):4417":0,"(anonymous 81):4396":0,"(anonymous 84):4425":0,"(anonymous 83):4424":0,"(anonymous 86):4431":0,"(anonymous 85):4430":0,"\"enabled\":4436":0,"\"disabled\":4440":0,"\"checked\":4444":0,"\"selected\":4451":0,"\"parent\":4461":0,"\"empty\":4465":0,"\"header\":4482":0,"\"text\":4486":0,"\"button\":4505":0,"\"input\":4510":0,"\"focus\":4514":0,"\"active\":4519":0,"(anonymous 87):4524":0,"(anonymous 88):4528":0,"(anonymous 89):4532":0,"(anonymous 90):4536":0,"(anonymous 91):4543":0,"(anonymous 92):4550":0,"(anonymous 93):4557":0,"siblingCheck:4566":0,"(anonymous 94):4585":0,"}:4596":0,"uniqueSort:4662":0,"error:4680":0,"tokenize:4684":0,"(anonymous 95):4753":0,"}:4762":0,"addCombinator:4746":0,"(anonymous 96):4800":0,"elementMatcher:4798":0,"condense:4812":0,"(anonymous 97):4840":0,"setMatcher:4833":0,"(anonymous 98):4921":0,"(anonymous 99):4924":0,"(anonymous 100):4927":0,"matcherFromTokens:4913":0,"superMatcher:4969":0,"matcherFromGroupMatchers:4966":0,"compile:5063":0,"multipleContexts:5090":0,"select:5099":0,"(anonymous 102):5189":0,"(anonymous 103):5210":0,"select:5230":0,"(anonymous 104):5282":0,"matchesSelector:5298":0,"(anonymous 101):5166":0,"setFilters:5327":0,"(anonymous 53):3676":0,"(anonymous 105):5361":0,"find:5356":0,"(anonymous 106):5397":0,"has:5392":0,"not:5406":0,"filter:5410":0,"is:5414":0,"closest:5425":0,"index:5453":0,"add:5471":0,"addBack:5482":0,"isDisconnected:5493":0,"sibling:5497":0,"parent:5506":0,"parents:5510":0,"parentsUntil:5513":0,"next:5516":0,"prev:5519":0,"nextAll:5522":0,"prevAll:5525":0,"nextUntil:5528":0,"prevUntil:5531":0,"siblings:5534":0,"children:5537":0,"contents:5540":0,"]:5546":0,"(anonymous 107):5545":0,"filter:5568":0,"dir:5578":0,"sibling:5591":0,"(anonymous 108):5612":0,"(anonymous 109):5618":0,"(anonymous 110):5623":0,"(anonymous 111):5634":0,"winnow:5605":0,"createSafeFragment:5638":0,"(anonymous 112):5693":0,"text:5692":0,"(anonymous 113):5702":0,"(anonymous 114):5715":0,"wrapAll:5700":0,"(anonymous 115):5731":0,"(anonymous 116):5736":0,"wrapInner:5729":0,"(anonymous 117):5752":0,"wrap:5749":0,"(anonymous 118):5758":0,"unwrap:5757":0,"(anonymous 119):5766":0,"append:5765":0,"(anonymous 120):5774":0,"prepend:5773":0,"(anonymous 121):5783":0,"before:5781":0,"(anonymous 122):5796":0,"after:5794":0,"remove:5808":0,"empty:5828":0,"(anonymous 123):5851":0,"clone:5847":0,"(anonymous 124):5857":0,"html:5856":0,"(anonymous 125):5903":0,"(anonymous 126):5913":0,"replaceWith:5898":0,"detach:5932":0,"(anonymous 127):5949":0,"(anonymous 128):5955":0,"(anonymous 129):5993":0,"domManip:5936":0,"findOrAppend:6022":0,"cloneCopyEvent:6026":0,"cloneFixAttributes:6054":0,"buildFragment:6124":0,"]:6174":0,"(anonymous 130):6173":0,"getAll:6197":0,"fixDefaultChecked:6210":0,"clone:6217":0,"handleScript:6380":0,"clean:6277":0,"cleanData:6411":0,"uaMatch:6472":0,"jQuerySub:6506":0,"init:6514":0,"sub:6505":0,"(anonymous 131):6465":0,"vendorPropName:6552":0,"isHidden:6574":0,"showHide:6579":0,"(anonymous 132):6630":0,"css:6629":0,"show:6636":0,"hide:6639":0,"(anonymous 133):6649":0,"toggle:6642":0,"get:6664":0,"style:6695":0,"css:6753":0,"swap:6788":0,"curCSS:6812":0,"curCSS:6845":0,"setPositiveNumber:6887":0,"augmentWidthOrHeight:6894":0,"getWidthOrHeight:6936":0,"css_defaultDisplay:6979":0,"(anonymous 135):7028":0,"get:7023":0,"set:7037":0,"(anonymous 134):7021":0,"get:7052":0,"set:7059":0,"(anonymous 137):7100":0,"get:7097":0,"get:7115":0,"(anonymous 138):7113":0,"(anonymous 136):7094":0,"hidden:7129":0,"visible:7133":0,"expand:7145":0,"(anonymous 139):7143":0,"serialize:7172":0,"(anonymous 140):7176":0,"(anonymous 141):7179":0,"(anonymous 143):7190":0,"(anonymous 142):7184":0,"serializeArray:7175":0,"add:7203":0,"(anonymous 144):7217":0,"param:7200":0,"(anonymous 145):7238":0,"buildParams:7233":0,"(anonymous 146):7325":0,"addToPrefiltersOrTransports:7322":0,"inspectPrefiltersOrTransports:7356":0,"ajaxExtend:7398":0,"complete:7450":0,"(anonymous 147):7455":0,"load:7411":0,"]:7483":0,"(anonymous 148):7482":0,"]:7489":0,"(anonymous 149):7488":0,"getScript:7509":0,"getJSON:7513":0,"ajaxSetup:7520":0,"setRequestHeader:7658":0,"getAllResponseHeaders:7668":0,"getResponseHeader:7673":0,"overrideMimeType:7688":0,"abort:7696":0,"done:7709":0,"statusCode:7823":0,"(anonymous 150):7963":0,"ajax:7604":0,"ajaxHandleResponses:7999":0,"ajaxConvert:8061":0,"jsonpCallback:8153":0,"]:8191":0,"]:8202":0,"(anonymous 152):8207":0,"(anonymous 151):8161":0,"\"text script\":8241":0,"(anonymous 153):8249":0,"onreadystatechange:8283":0,"send:8270":0,"abort:8309":0,"(anonymous 154):8260":0,"(anonymous 155):8319":0,"createStandardXHR:8328":0,"createActiveXHR:8334":0,"(anonymous 156):8349":0,"(anonymous 157):8356":0,"callback:8421":0,"send:8373":0,"abort:8529":0,"(anonymous 158):8366":0,"(anonymous 159):8544":0,"(anonymous 160):8589":0,"createFxNow:8588":0,"(anonymous 161):8596":0,"createTweens:8595":0,"(anonymous 162):8615":0,"tick:8619":0,"createTween:8648":0,"stop:8654":0,"Animation:8610":0,"propFilter:8706":0,"tweener:8745":0,"prefilter:8764":0,"fire:8787":0,"(anonymous 164):8798":0,"(anonymous 163):8795":0,"(anonymous 165):8834":0,"(anonymous 166):8861":0,"(anonymous 167):8865":0,"defaultPrefilter:8773":0,"Tween:8888":0,"init:8895":0,"cur:8904":0,"run:8911":0,"get:8941":0,"set:8957":0,"set:8975":0,"]:8984":0,"(anonymous 168):8982":0,"fadeTo:8994":0,"doAnimation:9005":0,"animate:9002":0,"stopQueue:9020":0,"(anonymous 169):9035":0,"stop:9019":0,"genFx:9072":0,"]:9101":0,"(anonymous 170):9100":0,"complete:9125":0,"speed:9106":0,"linear:9139":0,"swing:9142":0,"tick:9149":0,"timer:9167":0,"stop:9175":0,"(anonymous 171):9192":0,"animated:9191":0,"(anonymous 172):9203":0,"offset:9199":0,"bodyOffset:9246":0,"setOffset:9258":0,"position:9305":0,"(anonymous 173):9337":0,"offsetParent:9336":0,"(anonymous 175):9353":0,"]:9352":0,"(anonymous 174):9349":0,"getWindow:9375":0,"(anonymous 178):9390":0,"]:9386":0,"(anonymous 177):9384":0,"(anonymous 176):9383":0,"(anonymous 179):9439":0,"(anonymous 2):16":0,"(anonymous 1):1":0};
_yuitest_coverage["build/libbit-jquery/libbit-jquery.js"].coveredLines = 3399;
_yuitest_coverage["build/libbit-jquery/libbit-jquery.js"].coveredFunctions = 570;
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1);
YUI.add('libbit-jquery', function (Y, NAME) {

/*!
 * jQuery JavaScript Library v1.8.2
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2012 jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: Thu Sep 20 2012 21:13:05 GMT-0400 (Eastern Daylight Time)
 */
_yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 1)", 1);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 16);
(function( window, undefined ) {
_yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 2)", 16);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 17);
var
    // A central reference to the root jQuery(document)
    rootjQuery,

    // The deferred used on DOM ready
    readyList,

    // Use the correct document accordingly with window argument (sandbox)
    document = window.document,
    location = window.location,
    navigator = window.navigator,

    // Map over jQuery in case of overwrite
    _jQuery = window.jQuery,

    // Map over the $ in case of overwrite
    _$ = window.$,

    // Save a reference to some core methods
    core_push = Array.prototype.push,
    core_slice = Array.prototype.slice,
    core_indexOf = Array.prototype.indexOf,
    core_toString = Object.prototype.toString,
    core_hasOwn = Object.prototype.hasOwnProperty,
    core_trim = String.prototype.trim,

    // Define a local copy of jQuery
    jQuery = function( selector, context ) {
        // The jQuery object is actually just the init constructor 'enhanced'
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "jQuery", 44);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 46);
return new jQuery.fn.init( selector, context, rootjQuery );
    },

    // Used for matching numbers
    core_pnum = /[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source,

    // Used for detecting and trimming whitespace
    core_rnotwhite = /\S/,
    core_rspace = /\s+/,

    // Make sure we trim BOM and NBSP (here's looking at you, Safari 5.0 and IE)
    rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

    // A simple way to check for HTML strings
    // Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
    rquickExpr = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,

    // Match a standalone tag
    rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,

    // JSON RegExp
    rvalidchars = /^[\],:{}\s]*$/,
    rvalidbraces = /(?:^|:|,)(?:\s*\[)+/g,
    rvalidescape = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,
    rvalidtokens = /"[^"\\\r\n]*"|true|false|null|-?(?:\d\d*\.|)\d+(?:[eE][\-+]?\d+|)/g,

    // Matches dashed string for camelizing
    rmsPrefix = /^-ms-/,
    rdashAlpha = /-([\da-z])/gi,

    // Used by jQuery.camelCase as callback to replace()
    fcamelCase = function( all, letter ) {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "fcamelCase", 77);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 78);
return ( letter + "" ).toUpperCase();
    },

    // The ready event handler and self cleanup method
    DOMContentLoaded = function() {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "DOMContentLoaded", 82);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 83);
if ( document.addEventListener ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 84);
document.removeEventListener( "DOMContentLoaded", DOMContentLoaded, false );
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 85);
jQuery.ready();
        } else {_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 86);
if ( document.readyState === "complete" ) {
            // we're here because readyState === "complete" in oldIE
            // which is good enough for us to call the dom ready!
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 89);
document.detachEvent( "onreadystatechange", DOMContentLoaded );
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 90);
jQuery.ready();
        }}
    },

    // [[Class]] -> type pairs
    class2type = {};

_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 97);
jQuery.fn = jQuery.prototype = {
    constructor: jQuery,
    init: function( selector, context, rootjQuery ) {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "init", 99);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 100);
var match, elem, ret, doc;

        // Handle $(""), $(null), $(undefined), $(false)
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 103);
if ( !selector ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 104);
return this;
        }

        // Handle $(DOMElement)
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 108);
if ( selector.nodeType ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 109);
this.context = this[0] = selector;
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 110);
this.length = 1;
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 111);
return this;
        }

        // Handle HTML strings
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 115);
if ( typeof selector === "string" ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 116);
if ( selector.charAt(0) === "<" && selector.charAt( selector.length - 1 ) === ">" && selector.length >= 3 ) {
                // Assume that strings that start and end with <> are HTML and skip the regex check
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 118);
match = [ null, selector, null ];

            } else {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 121);
match = rquickExpr.exec( selector );
            }

            // Match html or make sure no context is specified for #id
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 125);
if ( match && (match[1] || !context) ) {

                // HANDLE: $(html) -> $(array)
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 128);
if ( match[1] ) {
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 129);
context = context instanceof jQuery ? context[0] : context;
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 130);
doc = ( context && context.nodeType ? context.ownerDocument || context : document );

                    // scripts is true for back-compat
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 133);
selector = jQuery.parseHTML( match[1], doc, true );
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 134);
if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
                        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 135);
this.attr.call( selector, context, true );
                    }

                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 138);
return jQuery.merge( this, selector );

                // HANDLE: $(#id)
                } else {
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 142);
elem = document.getElementById( match[2] );

                    // Check parentNode to catch when Blackberry 4.6 returns
                    // nodes that are no longer in the document #6963
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 146);
if ( elem && elem.parentNode ) {
                        // Handle the case where IE and Opera return items
                        // by name instead of ID
                        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 149);
if ( elem.id !== match[2] ) {
                            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 150);
return rootjQuery.find( selector );
                        }

                        // Otherwise, we inject the element directly into the jQuery object
                        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 154);
this.length = 1;
                        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 155);
this[0] = elem;
                    }

                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 158);
this.context = document;
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 159);
this.selector = selector;
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 160);
return this;
                }

            // HANDLE: $(expr, $(...))
            } else {_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 164);
if ( !context || context.jquery ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 165);
return ( context || rootjQuery ).find( selector );

            // HANDLE: $(expr, context)
            // (which is just equivalent to: $(context).find(expr)
            } else {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 170);
return this.constructor( context ).find( selector );
            }}

        // HANDLE: $(function)
        // Shortcut for document ready
        } else {_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 175);
if ( jQuery.isFunction( selector ) ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 176);
return rootjQuery.ready( selector );
        }}

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 179);
if ( selector.selector !== undefined ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 180);
this.selector = selector.selector;
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 181);
this.context = selector.context;
        }

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 184);
return jQuery.makeArray( selector, this );
    },

    // Start with an empty selector
    selector: "",

    // The current version of jQuery being used
    jquery: "1.8.2",

    // The default length of a jQuery object is 0
    length: 0,

    // The number of elements contained in the matched element set
    size: function() {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "size", 197);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 198);
return this.length;
    },

    toArray: function() {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "toArray", 201);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 202);
return core_slice.call( this );
    },

    // Get the Nth element in the matched element set OR
    // Get the whole matched element set as a clean array
    get: function( num ) {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "get", 207);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 208);
return num == null ?

            // Return a 'clean' array
            this.toArray() :

            // Return just the object
            ( num < 0 ? this[ this.length + num ] : this[ num ] );
    },

    // Take an array of elements and push it onto the stack
    // (returning the new matched element set)
    pushStack: function( elems, name, selector ) {

        // Build a new jQuery matched element set
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "pushStack", 219);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 222);
var ret = jQuery.merge( this.constructor(), elems );

        // Add the old object onto the stack (as a reference)
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 225);
ret.prevObject = this;

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 227);
ret.context = this.context;

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 229);
if ( name === "find" ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 230);
ret.selector = this.selector + ( this.selector ? " " : "" ) + selector;
        } else {_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 231);
if ( name ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 232);
ret.selector = this.selector + "." + name + "(" + selector + ")";
        }}

        // Return the newly-formed element set
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 236);
return ret;
    },

    // Execute a callback for every element in the matched set.
    // (You can seed the arguments with an array of args, but this is
    // only used internally.)
    each: function( callback, args ) {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "each", 242);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 243);
return jQuery.each( this, callback, args );
    },

    ready: function( fn ) {
        // Add the callback
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "ready", 246);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 248);
jQuery.ready.promise().done( fn );

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 250);
return this;
    },

    eq: function( i ) {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "eq", 253);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 254);
i = +i;
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 255);
return i === -1 ?
            this.slice( i ) :
            this.slice( i, i + 1 );
    },

    first: function() {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "first", 260);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 261);
return this.eq( 0 );
    },

    last: function() {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "last", 264);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 265);
return this.eq( -1 );
    },

    slice: function() {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "slice", 268);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 269);
return this.pushStack( core_slice.apply( this, arguments ),
            "slice", core_slice.call(arguments).join(",") );
    },

    map: function( callback ) {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "map", 273);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 274);
return this.pushStack( jQuery.map(this, function( elem, i ) {
            _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 3)", 274);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 275);
return callback.call( elem, i, elem );
        }));
    },

    end: function() {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "end", 279);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 280);
return this.prevObject || this.constructor(null);
    },

    // For internal use only.
    // Behaves like an Array's method, not like a jQuery method.
    push: core_push,
    sort: [].sort,
    splice: [].splice
};

// Give the init function the jQuery prototype for later instantiation
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 291);
jQuery.fn.init.prototype = jQuery.fn;

_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 293);
jQuery.extend = jQuery.fn.extend = function() {
    _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "extend", 293);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 294);
var options, name, src, copy, copyIsArray, clone,
        target = arguments[0] || {},
        i = 1,
        length = arguments.length,
        deep = false;

    // Handle a deep copy situation
    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 301);
if ( typeof target === "boolean" ) {
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 302);
deep = target;
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 303);
target = arguments[1] || {};
        // skip the boolean and the target
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 305);
i = 2;
    }

    // Handle case when target is a string or something (possible in deep copy)
    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 309);
if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 310);
target = {};
    }

    // extend jQuery itself if only one argument is passed
    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 314);
if ( length === i ) {
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 315);
target = this;
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 316);
--i;
    }

    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 319);
for ( ; i < length; i++ ) {
        // Only deal with non-null/undefined values
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 321);
if ( (options = arguments[ i ]) != null ) {
            // Extend the base object
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 323);
for ( name in options ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 324);
src = target[ name ];
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 325);
copy = options[ name ];

                // Prevent never-ending loop
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 328);
if ( target === copy ) {
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 329);
continue;
                }

                // Recurse if we're merging plain objects or arrays
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 333);
if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 334);
if ( copyIsArray ) {
                        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 335);
copyIsArray = false;
                        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 336);
clone = src && jQuery.isArray(src) ? src : [];

                    } else {
                        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 339);
clone = src && jQuery.isPlainObject(src) ? src : {};
                    }

                    // Never move original objects, clone them
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 343);
target[ name ] = jQuery.extend( deep, clone, copy );

                // Don't bring in undefined values
                } else {_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 346);
if ( copy !== undefined ) {
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 347);
target[ name ] = copy;
                }}
            }
        }
    }

    // Return the modified object
    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 354);
return target;
};

_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 357);
jQuery.extend({
    noConflict: function( deep ) {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "noConflict", 358);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 359);
if ( window.$ === jQuery ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 360);
window.$ = _$;
        }

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 363);
if ( deep && window.jQuery === jQuery ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 364);
window.jQuery = _jQuery;
        }

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 367);
return jQuery;
    },

    // Is the DOM ready to be used? Set to true once it occurs.
    isReady: false,

    // A counter to track how many items to wait for before
    // the ready event fires. See #6781
    readyWait: 1,

    // Hold (or release) the ready event
    holdReady: function( hold ) {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "holdReady", 378);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 379);
if ( hold ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 380);
jQuery.readyWait++;
        } else {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 382);
jQuery.ready( true );
        }
    },

    // Handle when the DOM is ready
    ready: function( wait ) {

        // Abort if there are pending holds or we're already ready
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "ready", 387);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 390);
if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 391);
return;
        }

        // Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 395);
if ( !document.body ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 396);
return setTimeout( jQuery.ready, 1 );
        }

        // Remember that the DOM is ready
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 400);
jQuery.isReady = true;

        // If a normal DOM Ready event fired, decrement, and wait if need be
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 403);
if ( wait !== true && --jQuery.readyWait > 0 ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 404);
return;
        }

        // If there are functions bound, to execute
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 408);
readyList.resolveWith( document, [ jQuery ] );

        // Trigger any bound ready events
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 411);
if ( jQuery.fn.trigger ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 412);
jQuery( document ).trigger("ready").off("ready");
        }
    },

    // See test/unit/core.js for details concerning isFunction.
    // Since version 1.3, DOM methods and functions like alert
    // aren't supported. They return false on IE (#2968).
    isFunction: function( obj ) {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "isFunction", 419);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 420);
return jQuery.type(obj) === "function";
    },

    isArray: Array.isArray || function( obj ) {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 4)", 423);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 424);
return jQuery.type(obj) === "array";
    },

    isWindow: function( obj ) {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "isWindow", 427);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 428);
return obj != null && obj == obj.window;
    },

    isNumeric: function( obj ) {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "isNumeric", 431);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 432);
return !isNaN( parseFloat(obj) ) && isFinite( obj );
    },

    type: function( obj ) {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "type", 435);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 436);
return obj == null ?
            String( obj ) :
            class2type[ core_toString.call(obj) ] || "object";
    },

    isPlainObject: function( obj ) {
        // Must be an Object.
        // Because of IE, we also have to check the presence of the constructor property.
        // Make sure that DOM nodes and window objects don't pass through, as well
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "isPlainObject", 441);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 445);
if ( !obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 446);
return false;
        }

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 449);
try {
            // Not own constructor property must be Object
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 451);
if ( obj.constructor &&
                !core_hasOwn.call(obj, "constructor") &&
                !core_hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 454);
return false;
            }
        } catch ( e ) {
            // IE8,9 Will throw exceptions on certain host objects #9897
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 458);
return false;
        }

        // Own properties are enumerated firstly, so to speed up,
        // if last one is own, then all properties are own.

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 464);
var key;
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 465);
for ( key in obj ) {}

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 467);
return key === undefined || core_hasOwn.call( obj, key );
    },

    isEmptyObject: function( obj ) {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "isEmptyObject", 470);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 471);
var name;
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 472);
for ( name in obj ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 473);
return false;
        }
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 475);
return true;
    },

    error: function( msg ) {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "error", 478);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 479);
throw new Error( msg );
    },

    // data: string of html
    // context (optional): If specified, the fragment will be created in this context, defaults to document
    // scripts (optional): If true, will include scripts passed in the html string
    parseHTML: function( data, context, scripts ) {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "parseHTML", 485);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 486);
var parsed;
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 487);
if ( !data || typeof data !== "string" ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 488);
return null;
        }
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 490);
if ( typeof context === "boolean" ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 491);
scripts = context;
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 492);
context = 0;
        }
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 494);
context = context || document;

        // Single tag
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 497);
if ( (parsed = rsingleTag.exec( data )) ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 498);
return [ context.createElement( parsed[1] ) ];
        }

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 501);
parsed = jQuery.buildFragment( [ data ], context, scripts ? null : [] );
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 502);
return jQuery.merge( [],
            (parsed.cacheable ? jQuery.clone( parsed.fragment ) : parsed.fragment).childNodes );
    },

    parseJSON: function( data ) {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "parseJSON", 506);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 507);
if ( !data || typeof data !== "string") {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 508);
return null;
        }

        // Make sure leading/trailing whitespace is removed (IE can't handle it)
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 512);
data = jQuery.trim( data );

        // Attempt to parse using the native JSON parser first
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 515);
if ( window.JSON && window.JSON.parse ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 516);
return window.JSON.parse( data );
        }

        // Make sure the incoming data is actual JSON
        // Logic borrowed from http://json.org/json2.js
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 521);
if ( rvalidchars.test( data.replace( rvalidescape, "@" )
            .replace( rvalidtokens, "]" )
            .replace( rvalidbraces, "")) ) {

            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 525);
return ( new Function( "return " + data ) )();

        }
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 528);
jQuery.error( "Invalid JSON: " + data );
    },

    // Cross-browser xml parsing
    parseXML: function( data ) {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "parseXML", 532);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 533);
var xml, tmp;
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 534);
if ( !data || typeof data !== "string" ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 535);
return null;
        }
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 537);
try {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 538);
if ( window.DOMParser ) { // Standard
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 539);
tmp = new DOMParser();
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 540);
xml = tmp.parseFromString( data , "text/xml" );
            } else { // IE
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 542);
xml = new ActiveXObject( "Microsoft.XMLDOM" );
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 543);
xml.async = "false";
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 544);
xml.loadXML( data );
            }
        } catch( e ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 547);
xml = undefined;
        }
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 549);
if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 550);
jQuery.error( "Invalid XML: " + data );
        }
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 552);
return xml;
    },

    noop: function() {},

    // Evaluates a script in a global context
    // Workarounds based on findings by Jim Driscoll
    // http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
    globalEval: function( data ) {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "globalEval", 560);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 561);
if ( data && core_rnotwhite.test( data ) ) {
            // We use execScript on Internet Explorer
            // We use an anonymous function so that context is window
            // rather than jQuery in Firefox
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 565);
( window.execScript || function( data ) {
                _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 5)", 565);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 566);
window[ "eval" ].call( window, data );
            } )( data );
        }
    },

    // Convert dashed to camelCase; used by the css and data modules
    // Microsoft forgot to hump their vendor prefix (#9572)
    camelCase: function( string ) {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "camelCase", 573);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 574);
return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
    },

    nodeName: function( elem, name ) {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "nodeName", 577);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 578);
return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
    },

    // args is for internal usage only
    each: function( obj, callback, args ) {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "each", 582);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 583);
var name,
            i = 0,
            length = obj.length,
            isObj = length === undefined || jQuery.isFunction( obj );

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 588);
if ( args ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 589);
if ( isObj ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 590);
for ( name in obj ) {
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 591);
if ( callback.apply( obj[ name ], args ) === false ) {
                        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 592);
break;
                    }
                }
            } else {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 596);
for ( ; i < length; ) {
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 597);
if ( callback.apply( obj[ i++ ], args ) === false ) {
                        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 598);
break;
                    }
                }
            }

        // A special, fast, case for the most common use of each
        } else {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 605);
if ( isObj ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 606);
for ( name in obj ) {
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 607);
if ( callback.call( obj[ name ], name, obj[ name ] ) === false ) {
                        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 608);
break;
                    }
                }
            } else {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 612);
for ( ; i < length; ) {
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 613);
if ( callback.call( obj[ i ], i, obj[ i++ ] ) === false ) {
                        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 614);
break;
                    }
                }
            }
        }

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 620);
return obj;
    },

    // Use native String.trim function wherever possible
    trim: core_trim && !core_trim.call("\uFEFF\xA0") ?
        function( text ) {
            _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 6)", 625);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 626);
return text == null ?
                "" :
                core_trim.call( text );
        } :

        // Otherwise use our own trimming functionality
        function( text ) {
            _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "}", 632);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 633);
return text == null ?
                "" :
                ( text + "" ).replace( rtrim, "" );
        },

    // results is for internal usage only
    makeArray: function( arr, results ) {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "makeArray", 639);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 640);
var type,
            ret = results || [];

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 643);
if ( arr != null ) {
            // The window, strings (and functions) also have 'length'
            // Tweaked logic slightly to handle Blackberry 4.7 RegExp issues #6930
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 646);
type = jQuery.type( arr );

            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 648);
if ( arr.length == null || type === "string" || type === "function" || type === "regexp" || jQuery.isWindow( arr ) ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 649);
core_push.call( ret, arr );
            } else {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 651);
jQuery.merge( ret, arr );
            }
        }

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 655);
return ret;
    },

    inArray: function( elem, arr, i ) {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "inArray", 658);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 659);
var len;

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 661);
if ( arr ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 662);
if ( core_indexOf ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 663);
return core_indexOf.call( arr, elem, i );
            }

            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 666);
len = arr.length;
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 667);
i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 669);
for ( ; i < len; i++ ) {
                // Skip accessing in sparse arrays
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 671);
if ( i in arr && arr[ i ] === elem ) {
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 672);
return i;
                }
            }
        }

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 677);
return -1;
    },

    merge: function( first, second ) {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "merge", 680);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 681);
var l = second.length,
            i = first.length,
            j = 0;

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 685);
if ( typeof l === "number" ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 686);
for ( ; j < l; j++ ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 687);
first[ i++ ] = second[ j ];
            }

        } else {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 691);
while ( second[j] !== undefined ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 692);
first[ i++ ] = second[ j++ ];
            }
        }

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 696);
first.length = i;

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 698);
return first;
    },

    grep: function( elems, callback, inv ) {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "grep", 701);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 702);
var retVal,
            ret = [],
            i = 0,
            length = elems.length;
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 706);
inv = !!inv;

        // Go through the array, only saving the items
        // that pass the validator function
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 710);
for ( ; i < length; i++ ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 711);
retVal = !!callback( elems[ i ], i );
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 712);
if ( inv !== retVal ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 713);
ret.push( elems[ i ] );
            }
        }

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 717);
return ret;
    },

    // arg is for internal usage only
    map: function( elems, callback, arg ) {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "map", 721);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 722);
var value, key,
            ret = [],
            i = 0,
            length = elems.length,
            // jquery objects are treated as arrays
            isArray = elems instanceof jQuery || length !== undefined && typeof length === "number" && ( ( length > 0 && elems[ 0 ] && elems[ length -1 ] ) || length === 0 || jQuery.isArray( elems ) ) ;

        // Go through the array, translating each of the items to their
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 730);
if ( isArray ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 731);
for ( ; i < length; i++ ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 732);
value = callback( elems[ i ], i, arg );

                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 734);
if ( value != null ) {
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 735);
ret[ ret.length ] = value;
                }
            }

        // Go through every key on the object,
        } else {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 741);
for ( key in elems ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 742);
value = callback( elems[ key ], key, arg );

                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 744);
if ( value != null ) {
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 745);
ret[ ret.length ] = value;
                }
            }
        }

        // Flatten any nested arrays
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 751);
return ret.concat.apply( [], ret );
    },

    // A global GUID counter for objects
    guid: 1,

    // Bind a function to a context, optionally partially applying any
    // arguments.
    proxy: function( fn, context ) {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "proxy", 759);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 760);
var tmp, args, proxy;

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 762);
if ( typeof context === "string" ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 763);
tmp = fn[ context ];
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 764);
context = fn;
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 765);
fn = tmp;
        }

        // Quick check to determine if target is callable, in the spec
        // this throws a TypeError, but we will just return undefined.
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 770);
if ( !jQuery.isFunction( fn ) ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 771);
return undefined;
        }

        // Simulated bind
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 775);
args = core_slice.call( arguments, 2 );
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 776);
proxy = function() {
            _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "proxy", 776);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 777);
return fn.apply( context, args.concat( core_slice.call( arguments ) ) );
        };

        // Set the guid of unique handler to the same of original handler, so it can be removed
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 781);
proxy.guid = fn.guid = fn.guid || jQuery.guid++;

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 783);
return proxy;
    },

    // Multifunctional method to get and set values of a collection
    // The value/s can optionally be executed if it's a function
    access: function( elems, fn, key, value, chainable, emptyGet, pass ) {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "access", 788);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 789);
var exec,
            bulk = key == null,
            i = 0,
            length = elems.length;

        // Sets many values
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 795);
if ( key && typeof key === "object" ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 796);
for ( i in key ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 797);
jQuery.access( elems, fn, i, key[i], 1, emptyGet, value );
            }
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 799);
chainable = 1;

        // Sets one value
        } else {_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 802);
if ( value !== undefined ) {
            // Optionally, function values get executed if exec is true
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 804);
exec = pass === undefined && jQuery.isFunction( value );

            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 806);
if ( bulk ) {
                // Bulk operations only iterate when executing function values
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 808);
if ( exec ) {
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 809);
exec = fn;
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 810);
fn = function( elem, key, value ) {
                        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "fn", 810);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 811);
return exec.call( jQuery( elem ), value );
                    };

                // Otherwise they run against the entire set
                } else {
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 816);
fn.call( elems, value );
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 817);
fn = null;
                }
            }

            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 821);
if ( fn ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 822);
for (; i < length; i++ ) {
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 823);
fn( elems[i], key, exec ? value.call( elems[i], i, fn( elems[i], key ) ) : value, pass );
                }
            }

            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 827);
chainable = 1;
        }}

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 830);
return chainable ?
            elems :

            // Gets
            bulk ?
                fn.call( elems ) :
                length ? fn( elems[0], key ) : emptyGet;
    },

    now: function() {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "now", 839);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 840);
return ( new Date() ).getTime();
    }
});

_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 844);
jQuery.ready.promise = function( obj ) {
    _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "promise", 844);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 845);
if ( !readyList ) {

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 847);
readyList = jQuery.Deferred();

        // Catch cases where $(document).ready() is called after the browser event has already occurred.
        // we once tried to use readyState "interactive" here, but it caused issues like the one
        // discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 852);
if ( document.readyState === "complete" ) {
            // Handle it asynchronously to allow scripts the opportunity to delay ready
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 854);
setTimeout( jQuery.ready, 1 );

        // Standards-based browsers support DOMContentLoaded
        } else {_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 857);
if ( document.addEventListener ) {
            // Use the handy event callback
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 859);
document.addEventListener( "DOMContentLoaded", DOMContentLoaded, false );

            // A fallback to window.onload, that will always work
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 862);
window.addEventListener( "load", jQuery.ready, false );

        // If IE event model is used
        } else {
            // Ensure firing before onload, maybe late but safe also for iframes
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 867);
document.attachEvent( "onreadystatechange", DOMContentLoaded );

            // A fallback to window.onload, that will always work
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 870);
window.attachEvent( "onload", jQuery.ready );

            // If IE and not a frame
            // continually check to see if the document is ready
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 874);
var top = false;

            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 876);
try {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 877);
top = window.frameElement == null && document.documentElement;
            } catch(e) {}

            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 880);
if ( top && top.doScroll ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 881);
(function doScrollCheck() {
                    _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "doScrollCheck", 881);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 882);
if ( !jQuery.isReady ) {

                        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 884);
try {
                            // Use the trick by Diego Perini
                            // http://javascript.nwbox.com/IEContentLoaded/
                            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 887);
top.doScroll("left");
                        } catch(e) {
                            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 889);
return setTimeout( doScrollCheck, 50 );
                        }

                        // and execute any waiting functions
                        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 893);
jQuery.ready();
                    }
                })();
            }
        }}
    }
    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 899);
return readyList.promise( obj );
};

// Populate the class2type map
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 903);
jQuery.each("Boolean Number String Function Array Date RegExp Object".split(" "), function(i, name) {
    _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 7)", 903);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 904);
class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

// All jQuery objects should point back to these
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 908);
rootjQuery = jQuery(document);
// String to Object options format cache
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 910);
var optionsCache = {};

// Convert String-formatted options into Object-formatted ones and store in cache
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 913);
function createOptions( options ) {
    _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "createOptions", 913);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 914);
var object = optionsCache[ options ] = {};
    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 915);
jQuery.each( options.split( core_rspace ), function( _, flag ) {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 8)", 915);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 916);
object[ flag ] = true;
    });
    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 918);
return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *  options: an optional list of space-separated options that will change how
 *          the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *  once:           will ensure the callback list can only be fired once (like a Deferred)
 *
 *  memory:         will keep track of previous values and will call any callback added
 *                  after the list has been fired right away with the latest "memorized"
 *                  values (like a Deferred)
 *
 *  unique:         will ensure a callback can only be added once (no duplicate in the list)
 *
 *  stopOnFalse:    interrupt callings when a callback returns false
 *
 */
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 943);
jQuery.Callbacks = function( options ) {

    // Convert options from String-formatted to Object-formatted if needed
    // (we check in cache first)
    _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "Callbacks", 943);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 947);
options = typeof options === "string" ?
        ( optionsCache[ options ] || createOptions( options ) ) :
        jQuery.extend( {}, options );

    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 951);
var // Last fire value (for non-forgettable lists)
        memory,
        // Flag to know if list was already fired
        fired,
        // Flag to know if list is currently firing
        firing,
        // First callback to fire (used internally by add and fireWith)
        firingStart,
        // End of the loop when firing
        firingLength,
        // Index of currently firing callback (modified by remove if needed)
        firingIndex,
        // Actual callback list
        list = [],
        // Stack of fire calls for repeatable lists
        stack = !options.once && [],
        // Fire callbacks
        fire = function( data ) {
            _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "fire", 968);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 969);
memory = options.memory && data;
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 970);
fired = true;
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 971);
firingIndex = firingStart || 0;
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 972);
firingStart = 0;
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 973);
firingLength = list.length;
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 974);
firing = true;
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 975);
for ( ; list && firingIndex < firingLength; firingIndex++ ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 976);
if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 977);
memory = false; // To prevent further calls using add
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 978);
break;
                }
            }
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 981);
firing = false;
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 982);
if ( list ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 983);
if ( stack ) {
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 984);
if ( stack.length ) {
                        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 985);
fire( stack.shift() );
                    }
                } else {_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 987);
if ( memory ) {
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 988);
list = [];
                } else {
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 990);
self.disable();
                }}
            }
        },
        // Actual Callbacks object
        self = {
            // Add a callback or a collection of callbacks to the list
            add: function() {
                _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "add", 997);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 998);
if ( list ) {
                    // First, we save the current length
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1000);
var start = list.length;
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1001);
(function add( args ) {
                        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "add", 1001);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1002);
jQuery.each( args, function( _, arg ) {
                            _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 9)", 1002);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1003);
var type = jQuery.type( arg );
                            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1004);
if ( type === "function" && ( !options.unique || !self.has( arg ) ) ) {
                                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1005);
list.push( arg );
                            } else {_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1006);
if ( arg && arg.length && type !== "string" ) {
                                // Inspect recursively
                                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1008);
add( arg );
                            }}
                        });
                    })( arguments );
                    // Do we need to add the callbacks to the
                    // current firing batch?
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1014);
if ( firing ) {
                        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1015);
firingLength = list.length;
                    // With memory, if we're not firing then
                    // we should call right away
                    } else {_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1018);
if ( memory ) {
                        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1019);
firingStart = start;
                        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1020);
fire( memory );
                    }}
                }
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1023);
return this;
            },
            // Remove a callback from the list
            remove: function() {
                _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "remove", 1026);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1027);
if ( list ) {
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1028);
jQuery.each( arguments, function( _, arg ) {
                        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 10)", 1028);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1029);
var index;
                        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1030);
while( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
                            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1031);
list.splice( index, 1 );
                            // Handle firing indexes
                            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1033);
if ( firing ) {
                                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1034);
if ( index <= firingLength ) {
                                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1035);
firingLength--;
                                }
                                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1037);
if ( index <= firingIndex ) {
                                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1038);
firingIndex--;
                                }
                            }
                        }
                    });
                }
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1044);
return this;
            },
            // Control if a given callback is in the list
            has: function( fn ) {
                _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "has", 1047);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1048);
return jQuery.inArray( fn, list ) > -1;
            },
            // Remove all callbacks from the list
            empty: function() {
                _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "empty", 1051);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1052);
list = [];
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1053);
return this;
            },
            // Have the list do nothing anymore
            disable: function() {
                _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "disable", 1056);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1057);
list = stack = memory = undefined;
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1058);
return this;
            },
            // Is it disabled?
            disabled: function() {
                _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "disabled", 1061);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1062);
return !list;
            },
            // Lock the list in its current state
            lock: function() {
                _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "lock", 1065);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1066);
stack = undefined;
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1067);
if ( !memory ) {
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1068);
self.disable();
                }
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1070);
return this;
            },
            // Is it locked?
            locked: function() {
                _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "locked", 1073);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1074);
return !stack;
            },
            // Call all callbacks with the given context and arguments
            fireWith: function( context, args ) {
                _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "fireWith", 1077);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1078);
args = args || [];
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1079);
args = [ context, args.slice ? args.slice() : args ];
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1080);
if ( list && ( !fired || stack ) ) {
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1081);
if ( firing ) {
                        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1082);
stack.push( args );
                    } else {
                        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1084);
fire( args );
                    }
                }
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1087);
return this;
            },
            // Call all the callbacks with the given arguments
            fire: function() {
                _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "fire", 1090);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1091);
self.fireWith( this, arguments );
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1092);
return this;
            },
            // To know if the callbacks have already been called at least once
            fired: function() {
                _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "fired", 1095);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1096);
return !!fired;
            }
        };

    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1100);
return self;
};
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1102);
jQuery.extend({

    Deferred: function( func ) {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "Deferred", 1104);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1105);
var tuples = [
                // action, add listener, listener list, final state
                [ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
                [ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
                [ "notify", "progress", jQuery.Callbacks("memory") ]
            ],
            state = "pending",
            promise = {
                state: function() {
                    _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "state", 1113);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1114);
return state;
                },
                always: function() {
                    _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "always", 1116);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1117);
deferred.done( arguments ).fail( arguments );
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1118);
return this;
                },
                then: function( /* fnDone, fnFail, fnProgress */ ) {
                    _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "then", 1120);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1121);
var fns = arguments;
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1122);
return jQuery.Deferred(function( newDefer ) {
                        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 11)", 1122);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1123);
jQuery.each( tuples, function( i, tuple ) {
                            _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 12)", 1123);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1124);
var action = tuple[ 0 ],
                                fn = fns[ i ];
                            // deferred[ done | fail | progress ] for forwarding actions to newDefer
                            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1127);
deferred[ tuple[1] ]( jQuery.isFunction( fn ) ?
                                function() {
                                    _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 13)", 1128);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1129);
var returned = fn.apply( this, arguments );
                                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1130);
if ( returned && jQuery.isFunction( returned.promise ) ) {
                                        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1131);
returned.promise()
                                            .done( newDefer.resolve )
                                            .fail( newDefer.reject )
                                            .progress( newDefer.notify );
                                    } else {
                                        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1136);
newDefer[ action + "With" ]( this === deferred ? newDefer : this, [ returned ] );
                                    }
                                } :
                                newDefer[ action ]
                            );
                        });
                        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1142);
fns = null;
                    }).promise();
                },
                // Get a promise for this deferred
                // If obj is provided, the promise aspect is added to the object
                promise: function( obj ) {
                    _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "promise", 1147);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1148);
return obj != null ? jQuery.extend( obj, promise ) : promise;
                }
            },
            deferred = {};

        // Keep pipe for back-compat
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1154);
promise.pipe = promise.then;

        // Add list-specific methods
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1157);
jQuery.each( tuples, function( i, tuple ) {
            _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 14)", 1157);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1158);
var list = tuple[ 2 ],
                stateString = tuple[ 3 ];

            // promise[ done | fail | progress ] = list.add
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1162);
promise[ tuple[1] ] = list.add;

            // Handle state
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1165);
if ( stateString ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1166);
list.add(function() {
                    // state = [ resolved | rejected ]
                    _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 15)", 1166);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1168);
state = stateString;

                // [ reject_list | resolve_list ].disable; progress_list.lock
                }, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
            }

            // deferred[ resolve | reject | notify ] = list.fire
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1175);
deferred[ tuple[0] ] = list.fire;
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1176);
deferred[ tuple[0] + "With" ] = list.fireWith;
        });

        // Make the deferred a promise
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1180);
promise.promise( deferred );

        // Call given func if any
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1183);
if ( func ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1184);
func.call( deferred, deferred );
        }

        // All done!
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1188);
return deferred;
    },

    // Deferred helper
    when: function( subordinate /* , ..., subordinateN */ ) {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "when", 1192);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1193);
var i = 0,
            resolveValues = core_slice.call( arguments ),
            length = resolveValues.length,

            // the count of uncompleted subordinates
            remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

            // the master Deferred. If resolveValues consist of only a single Deferred, just use that.
            deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

            // Update function for both resolve and progress values
            updateFunc = function( i, contexts, values ) {
                _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "updateFunc", 1204);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1205);
return function( value ) {
                    _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 16)", 1205);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1206);
contexts[ i ] = this;
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1207);
values[ i ] = arguments.length > 1 ? core_slice.call( arguments ) : value;
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1208);
if( values === progressValues ) {
                        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1209);
deferred.notifyWith( contexts, values );
                    } else {_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1210);
if ( !( --remaining ) ) {
                        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1211);
deferred.resolveWith( contexts, values );
                    }}
                };
            },

            progressValues, progressContexts, resolveContexts;

        // add listeners to Deferred subordinates; treat others as resolved
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1219);
if ( length > 1 ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1220);
progressValues = new Array( length );
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1221);
progressContexts = new Array( length );
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1222);
resolveContexts = new Array( length );
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1223);
for ( ; i < length; i++ ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1224);
if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1225);
resolveValues[ i ].promise()
                        .done( updateFunc( i, resolveContexts, resolveValues ) )
                        .fail( deferred.reject )
                        .progress( updateFunc( i, progressContexts, progressValues ) );
                } else {
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1230);
--remaining;
                }
            }
        }

        // if we're not waiting on anything, resolve the master
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1236);
if ( !remaining ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1237);
deferred.resolveWith( resolveContexts, resolveValues );
        }

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1240);
return deferred.promise();
    }
});
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1243);
jQuery.support = (function() {

    _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 17)", 1243);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1245);
var support,
        all,
        a,
        select,
        opt,
        input,
        fragment,
        eventName,
        i,
        isSupported,
        clickFn,
        div = document.createElement("div");

    // Preliminary tests
    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1259);
div.setAttribute( "className", "t" );
    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1260);
div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1262);
all = div.getElementsByTagName("*");
    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1263);
a = div.getElementsByTagName("a")[ 0 ];
    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1264);
a.style.cssText = "top:1px;float:left;opacity:.5";

    // Can't get basic test support
    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1267);
if ( !all || !all.length ) {
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1268);
return {};
    }

    // First batch of supports tests
    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1272);
select = document.createElement("select");
    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1273);
opt = select.appendChild( document.createElement("option") );
    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1274);
input = div.getElementsByTagName("input")[ 0 ];

    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1276);
support = {
        // IE strips leading whitespace when .innerHTML is used
        leadingWhitespace: ( div.firstChild.nodeType === 3 ),

        // Make sure that tbody elements aren't automatically inserted
        // IE will insert them into empty tables
        tbody: !div.getElementsByTagName("tbody").length,

        // Make sure that link elements get serialized correctly by innerHTML
        // This requires a wrapper element in IE
        htmlSerialize: !!div.getElementsByTagName("link").length,

        // Get the style information from getAttribute
        // (IE uses .cssText instead)
        style: /top/.test( a.getAttribute("style") ),

        // Make sure that URLs aren't manipulated
        // (IE normalizes it by default)
        hrefNormalized: ( a.getAttribute("href") === "/a" ),

        // Make sure that element opacity exists
        // (IE uses filter instead)
        // Use a regex to work around a WebKit issue. See #5145
        opacity: /^0.5/.test( a.style.opacity ),

        // Verify style float existence
        // (IE uses styleFloat instead of cssFloat)
        cssFloat: !!a.style.cssFloat,

        // Make sure that if no value is specified for a checkbox
        // that it defaults to "on".
        // (WebKit defaults to "" instead)
        checkOn: ( input.value === "on" ),

        // Make sure that a selected-by-default option has a working selected property.
        // (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
        optSelected: opt.selected,

        // Test setAttribute on camelCase class. If it works, we need attrFixes when doing get/setAttribute (ie6/7)
        getSetAttribute: div.className !== "t",

        // Tests for enctype support on a form(#6743)
        enctype: !!document.createElement("form").enctype,

        // Makes sure cloning an html5 element does not cause problems
        // Where outerHTML is undefined, this still works
        html5Clone: document.createElement("nav").cloneNode( true ).outerHTML !== "<:nav></:nav>",

        // jQuery.support.boxModel DEPRECATED in 1.8 since we don't support Quirks Mode
        boxModel: ( document.compatMode === "CSS1Compat" ),

        // Will be defined later
        submitBubbles: true,
        changeBubbles: true,
        focusinBubbles: false,
        deleteExpando: true,
        noCloneEvent: true,
        inlineBlockNeedsLayout: false,
        shrinkWrapBlocks: false,
        reliableMarginRight: true,
        boxSizingReliable: true,
        pixelPosition: false
    };

    // Make sure checked status is properly cloned
    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1341);
input.checked = true;
    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1342);
support.noCloneChecked = input.cloneNode( true ).checked;

    // Make sure that the options inside disabled selects aren't marked as disabled
    // (WebKit marks them as disabled)
    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1346);
select.disabled = true;
    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1347);
support.optDisabled = !opt.disabled;

    // Test to see if it's possible to delete an expando from an element
    // Fails in Internet Explorer
    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1351);
try {
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1352);
delete div.test;
    } catch( e ) {
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1354);
support.deleteExpando = false;
    }

    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1357);
if ( !div.addEventListener && div.attachEvent && div.fireEvent ) {
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1358);
div.attachEvent( "onclick", clickFn = function() {
            // Cloning a node shouldn't copy over any
            // bound event handlers (IE does this)
            _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "clickFn", 1358);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1361);
support.noCloneEvent = false;
        });
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1363);
div.cloneNode( true ).fireEvent("onclick");
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1364);
div.detachEvent( "onclick", clickFn );
    }

    // Check if a radio maintains its value
    // after being appended to the DOM
    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1369);
input = document.createElement("input");
    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1370);
input.value = "t";
    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1371);
input.setAttribute( "type", "radio" );
    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1372);
support.radioValue = input.value === "t";

    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1374);
input.setAttribute( "checked", "checked" );

    // #11217 - WebKit loses check when the name is after the checked attribute
    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1377);
input.setAttribute( "name", "t" );

    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1379);
div.appendChild( input );
    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1380);
fragment = document.createDocumentFragment();
    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1381);
fragment.appendChild( div.lastChild );

    // WebKit doesn't clone checked state correctly in fragments
    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1384);
support.checkClone = fragment.cloneNode( true ).cloneNode( true ).lastChild.checked;

    // Check if a disconnected checkbox will retain its checked
    // value of true after appended to the DOM (IE6/7)
    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1388);
support.appendChecked = input.checked;

    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1390);
fragment.removeChild( input );
    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1391);
fragment.appendChild( div );

    // Technique from Juriy Zaytsev
    // http://perfectionkills.com/detecting-event-support-without-browser-sniffing/
    // We only care about the case where non-standard event systems
    // are used, namely in IE. Short-circuiting here helps us to
    // avoid an eval call (in setAttribute) which can cause CSP
    // to go haywire. See: https://developer.mozilla.org/en/Security/CSP
    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1399);
if ( div.attachEvent ) {
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1400);
for ( i in {
            submit: true,
            change: true,
            focusin: true
        }) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1405);
eventName = "on" + i;
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1406);
isSupported = ( eventName in div );
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1407);
if ( !isSupported ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1408);
div.setAttribute( eventName, "return;" );
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1409);
isSupported = ( typeof div[ eventName ] === "function" );
            }
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1411);
support[ i + "Bubbles" ] = isSupported;
        }
    }

    // Run tests that need a body at doc ready
    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1416);
jQuery(function() {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 18)", 1416);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1417);
var container, div, tds, marginDiv,
            divReset = "padding:0;margin:0;border:0;display:block;overflow:hidden;",
            body = document.getElementsByTagName("body")[0];

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1421);
if ( !body ) {
            // Return for frameset docs that don't have a body
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1423);
return;
        }

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1426);
container = document.createElement("div");
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1427);
container.style.cssText = "visibility:hidden;border:0;width:0;height:0;position:static;top:0;margin-top:1px";
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1428);
body.insertBefore( container, body.firstChild );

        // Construct the test element
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1431);
div = document.createElement("div");
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1432);
container.appendChild( div );

        // Check if table cells still have offsetWidth/Height when they are set
        // to display:none and there are still other visible table cells in a
        // table row; if so, offsetWidth/Height are not reliable for use when
        // determining if an element has been hidden directly using
        // display:none (it is still safe to use offsets if a parent element is
        // hidden; don safety goggles and see bug #4512 for more information).
        // (only IE 8 fails this test)
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1441);
div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1442);
tds = div.getElementsByTagName("td");
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1443);
tds[ 0 ].style.cssText = "padding:0;margin:0;border:0;display:none";
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1444);
isSupported = ( tds[ 0 ].offsetHeight === 0 );

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1446);
tds[ 0 ].style.display = "";
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1447);
tds[ 1 ].style.display = "none";

        // Check if empty table cells still have offsetWidth/Height
        // (IE <= 8 fail this test)
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1451);
support.reliableHiddenOffsets = isSupported && ( tds[ 0 ].offsetHeight === 0 );

        // Check box-sizing and margin behavior
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1454);
div.innerHTML = "";
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1455);
div.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;";
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1456);
support.boxSizing = ( div.offsetWidth === 4 );
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1457);
support.doesNotIncludeMarginInBodyOffset = ( body.offsetTop !== 1 );

        // NOTE: To any future maintainer, we've window.getComputedStyle
        // because jsdom on node.js will break without it.
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1461);
if ( window.getComputedStyle ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1462);
support.pixelPosition = ( window.getComputedStyle( div, null ) || {} ).top !== "1%";
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1463);
support.boxSizingReliable = ( window.getComputedStyle( div, null ) || { width: "4px" } ).width === "4px";

            // Check if div with explicit width and no margin-right incorrectly
            // gets computed margin-right based on width of container. For more
            // info see bug #3333
            // Fails in WebKit before Feb 2011 nightlies
            // WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1470);
marginDiv = document.createElement("div");
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1471);
marginDiv.style.cssText = div.style.cssText = divReset;
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1472);
marginDiv.style.marginRight = marginDiv.style.width = "0";
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1473);
div.style.width = "1px";
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1474);
div.appendChild( marginDiv );
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1475);
support.reliableMarginRight =
                !parseFloat( ( window.getComputedStyle( marginDiv, null ) || {} ).marginRight );
        }

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1479);
if ( typeof div.style.zoom !== "undefined" ) {
            // Check if natively block-level elements act like inline-block
            // elements when setting their display to 'inline' and giving
            // them layout
            // (IE < 8 does this)
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1484);
div.innerHTML = "";
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1485);
div.style.cssText = divReset + "width:1px;padding:1px;display:inline;zoom:1";
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1486);
support.inlineBlockNeedsLayout = ( div.offsetWidth === 3 );

            // Check if elements with layout shrink-wrap their children
            // (IE 6 does this)
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1490);
div.style.display = "block";
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1491);
div.style.overflow = "visible";
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1492);
div.innerHTML = "<div></div>";
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1493);
div.firstChild.style.width = "5px";
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1494);
support.shrinkWrapBlocks = ( div.offsetWidth !== 3 );

            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1496);
container.style.zoom = 1;
        }

        // Null elements to avoid leaks in IE
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1500);
body.removeChild( container );
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1501);
container = div = tds = marginDiv = null;
    });

    // Null elements to avoid leaks in IE
    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1505);
fragment.removeChild( div );
    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1506);
all = a = select = opt = input = fragment = div = null;

    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1508);
return support;
})();
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1510);
var rbrace = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/,
    rmultiDash = /([A-Z])/g;

_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1513);
jQuery.extend({
    cache: {},

    deletedIds: [],

    // Remove at next major release (1.9/2.0)
    uuid: 0,

    // Unique for each copy of jQuery on the page
    // Non-digits removed to match rinlinejQuery
    expando: "jQuery" + ( jQuery.fn.jquery + Math.random() ).replace( /\D/g, "" ),

    // The following elements throw uncatchable exceptions if you
    // attempt to add expando properties to them.
    noData: {
        "embed": true,
        // Ban all objects except for Flash (which handle expandos)
        "object": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
        "applet": true
    },

    hasData: function( elem ) {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "hasData", 1534);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1535);
elem = elem.nodeType ? jQuery.cache[ elem[jQuery.expando] ] : elem[ jQuery.expando ];
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1536);
return !!elem && !isEmptyDataObject( elem );
    },

    data: function( elem, name, data, pvt /* Internal Use Only */ ) {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "data", 1539);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1540);
if ( !jQuery.acceptData( elem ) ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1541);
return;
        }

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1544);
var thisCache, ret,
            internalKey = jQuery.expando,
            getByName = typeof name === "string",

            // We have to handle DOM nodes and JS objects differently because IE6-7
            // can't GC object references properly across the DOM-JS boundary
            isNode = elem.nodeType,

            // Only DOM nodes need the global jQuery cache; JS object data is
            // attached directly to the object so GC can occur automatically
            cache = isNode ? jQuery.cache : elem,

            // Only defining an ID for JS objects if its cache already exists allows
            // the code to shortcut on the same path as a DOM node with no cache
            id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

        // Avoid doing any more work than we need to when trying to get data on an
        // object that has no data at all
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1562);
if ( (!id || !cache[id] || (!pvt && !cache[id].data)) && getByName && data === undefined ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1563);
return;
        }

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1566);
if ( !id ) {
            // Only DOM nodes need a new unique ID for each element since their data
            // ends up in the global cache
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1569);
if ( isNode ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1570);
elem[ internalKey ] = id = jQuery.deletedIds.pop() || jQuery.guid++;
            } else {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1572);
id = internalKey;
            }
        }

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1576);
if ( !cache[ id ] ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1577);
cache[ id ] = {};

            // Avoids exposing jQuery metadata on plain JS objects when the object
            // is serialized using JSON.stringify
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1581);
if ( !isNode ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1582);
cache[ id ].toJSON = jQuery.noop;
            }
        }

        // An object can be passed to jQuery.data instead of a key/value pair; this gets
        // shallow copied over onto the existing cache
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1588);
if ( typeof name === "object" || typeof name === "function" ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1589);
if ( pvt ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1590);
cache[ id ] = jQuery.extend( cache[ id ], name );
            } else {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1592);
cache[ id ].data = jQuery.extend( cache[ id ].data, name );
            }
        }

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1596);
thisCache = cache[ id ];

        // jQuery data() is stored in a separate object inside the object's internal data
        // cache in order to avoid key collisions between internal data and user-defined
        // data.
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1601);
if ( !pvt ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1602);
if ( !thisCache.data ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1603);
thisCache.data = {};
            }

            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1606);
thisCache = thisCache.data;
        }

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1609);
if ( data !== undefined ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1610);
thisCache[ jQuery.camelCase( name ) ] = data;
        }

        // Check for both converted-to-camel and non-converted data property names
        // If a data property was specified
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1615);
if ( getByName ) {

            // First Try to find as-is property data
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1618);
ret = thisCache[ name ];

            // Test for null|undefined property data
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1621);
if ( ret == null ) {

                // Try to find the camelCased property
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1624);
ret = thisCache[ jQuery.camelCase( name ) ];
            }
        } else {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1627);
ret = thisCache;
        }

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1630);
return ret;
    },

    removeData: function( elem, name, pvt /* Internal Use Only */ ) {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "removeData", 1633);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1634);
if ( !jQuery.acceptData( elem ) ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1635);
return;
        }

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1638);
var thisCache, i, l,

            isNode = elem.nodeType,

            // See jQuery.data for more information
            cache = isNode ? jQuery.cache : elem,
            id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

        // If there is already no cache entry for this object, there is no
        // purpose in continuing
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1648);
if ( !cache[ id ] ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1649);
return;
        }

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1652);
if ( name ) {

            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1654);
thisCache = pvt ? cache[ id ] : cache[ id ].data;

            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1656);
if ( thisCache ) {

                // Support array or space separated string names for data keys
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1659);
if ( !jQuery.isArray( name ) ) {

                    // try the string as a key before any manipulation
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1662);
if ( name in thisCache ) {
                        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1663);
name = [ name ];
                    } else {

                        // split the camel cased version by spaces unless a key with the spaces exists
                        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1667);
name = jQuery.camelCase( name );
                        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1668);
if ( name in thisCache ) {
                            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1669);
name = [ name ];
                        } else {
                            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1671);
name = name.split(" ");
                        }
                    }
                }

                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1676);
for ( i = 0, l = name.length; i < l; i++ ) {
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1677);
delete thisCache[ name[i] ];
                }

                // If there is no data left in the cache, we want to continue
                // and let the cache object itself get destroyed
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1682);
if ( !( pvt ? isEmptyDataObject : jQuery.isEmptyObject )( thisCache ) ) {
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1683);
return;
                }
            }
        }

        // See jQuery.data for more information
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1689);
if ( !pvt ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1690);
delete cache[ id ].data;

            // Don't destroy the parent cache unless the internal data object
            // had been the only thing left in it
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1694);
if ( !isEmptyDataObject( cache[ id ] ) ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1695);
return;
            }
        }

        // Destroy the cache
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1700);
if ( isNode ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1701);
jQuery.cleanData( [ elem ], true );

        // Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
        } else {_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1704);
if ( jQuery.support.deleteExpando || cache != cache.window ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1705);
delete cache[ id ];

        // When all else fails, null
        } else {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1709);
cache[ id ] = null;
        }}
    },

    // For internal use only.
    _data: function( elem, name, data ) {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "_data", 1714);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1715);
return jQuery.data( elem, name, data, true );
    },

    // A method for determining if a DOM node can handle the data expando
    acceptData: function( elem ) {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "acceptData", 1719);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1720);
var noData = elem.nodeName && jQuery.noData[ elem.nodeName.toLowerCase() ];

        // nodes accept data unless otherwise specified; rejection can be conditional
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1723);
return !noData || noData !== true && elem.getAttribute("classid") === noData;
    }
});

_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1727);
jQuery.fn.extend({
    data: function( key, value ) {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "data", 1728);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1729);
var parts, part, attr, name, l,
            elem = this[0],
            i = 0,
            data = null;

        // Gets all values
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1735);
if ( key === undefined ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1736);
if ( this.length ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1737);
data = jQuery.data( elem );

                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1739);
if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1740);
attr = elem.attributes;
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1741);
for ( l = attr.length; i < l; i++ ) {
                        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1742);
name = attr[i].name;

                        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1744);
if ( !name.indexOf( "data-" ) ) {
                            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1745);
name = jQuery.camelCase( name.substring(5) );

                            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1747);
dataAttr( elem, name, data[ name ] );
                        }
                    }
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1750);
jQuery._data( elem, "parsedAttrs", true );
                }
            }

            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1754);
return data;
        }

        // Sets multiple values
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1758);
if ( typeof key === "object" ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1759);
return this.each(function() {
                _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 19)", 1759);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1760);
jQuery.data( this, key );
            });
        }

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1764);
parts = key.split( ".", 2 );
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1765);
parts[1] = parts[1] ? "." + parts[1] : "";
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1766);
part = parts[1] + "!";

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1768);
return jQuery.access( this, function( value ) {

            _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 20)", 1768);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1770);
if ( value === undefined ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1771);
data = this.triggerHandler( "getData" + part, [ parts[0] ] );

                // Try to fetch any internally stored data first
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1774);
if ( data === undefined && elem ) {
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1775);
data = jQuery.data( elem, key );
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1776);
data = dataAttr( elem, key, data );
                }

                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1779);
return data === undefined && parts[1] ?
                    this.data( parts[0] ) :
                    data;
            }

            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1784);
parts[1] = value;
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1785);
this.each(function() {
                _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 21)", 1785);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1786);
var self = jQuery( this );

                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1788);
self.triggerHandler( "setData" + part, parts );
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1789);
jQuery.data( this, key, value );
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1790);
self.triggerHandler( "changeData" + part, parts );
            });
        }, null, value, arguments.length > 1, null, false );
    },

    removeData: function( key ) {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "removeData", 1795);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1796);
return this.each(function() {
            _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 22)", 1796);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1797);
jQuery.removeData( this, key );
        });
    }
});

_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1802);
function dataAttr( elem, key, data ) {
    // If nothing was found internally, try to fetch any
    // data from the HTML5 data-* attribute
    _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "dataAttr", 1802);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1805);
if ( data === undefined && elem.nodeType === 1 ) {

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1807);
var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1809);
data = elem.getAttribute( name );

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1811);
if ( typeof data === "string" ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1812);
try {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1813);
data = data === "true" ? true :
                data === "false" ? false :
                data === "null" ? null :
                // Only convert to a number if it doesn't change the string
                +data + "" === data ? +data :
                rbrace.test( data ) ? jQuery.parseJSON( data ) :
                    data;
            } catch( e ) {}

            // Make sure we set the data so it isn't changed later
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1823);
jQuery.data( elem, key, data );

        } else {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1826);
data = undefined;
        }
    }

    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1830);
return data;
}

// checks a cache object for emptiness
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1834);
function isEmptyDataObject( obj ) {
    _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "isEmptyDataObject", 1834);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1835);
var name;
    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1836);
for ( name in obj ) {

        // if the public data object is empty, the private is still empty
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1839);
if ( name === "data" && jQuery.isEmptyObject( obj[name] ) ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1840);
continue;
        }
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1842);
if ( name !== "toJSON" ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1843);
return false;
        }
    }

    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1847);
return true;
}
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1849);
jQuery.extend({
    queue: function( elem, type, data ) {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "queue", 1850);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1851);
var queue;

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1853);
if ( elem ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1854);
type = ( type || "fx" ) + "queue";
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1855);
queue = jQuery._data( elem, type );

            // Speed up dequeue by getting out quickly if this is just a lookup
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1858);
if ( data ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1859);
if ( !queue || jQuery.isArray(data) ) {
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1860);
queue = jQuery._data( elem, type, jQuery.makeArray(data) );
                } else {
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1862);
queue.push( data );
                }
            }
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1865);
return queue || [];
        }
    },

    dequeue: function( elem, type ) {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "dequeue", 1869);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1870);
type = type || "fx";

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1872);
var queue = jQuery.queue( elem, type ),
            startLength = queue.length,
            fn = queue.shift(),
            hooks = jQuery._queueHooks( elem, type ),
            next = function() {
                _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "next", 1876);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1877);
jQuery.dequeue( elem, type );
            };

        // If the fx queue is dequeued, always remove the progress sentinel
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1881);
if ( fn === "inprogress" ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1882);
fn = queue.shift();
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1883);
startLength--;
        }

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1886);
if ( fn ) {

            // Add a progress sentinel to prevent the fx queue from being
            // automatically dequeued
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1890);
if ( type === "fx" ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1891);
queue.unshift( "inprogress" );
            }

            // clear up the last queue stop function
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1895);
delete hooks.stop;
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1896);
fn.call( elem, next, hooks );
        }

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1899);
if ( !startLength && hooks ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1900);
hooks.empty.fire();
        }
    },

    // not intended for public consumption - generates a queueHooks object, or returns the current one
    _queueHooks: function( elem, type ) {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "_queueHooks", 1905);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1906);
var key = type + "queueHooks";
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1907);
return jQuery._data( elem, key ) || jQuery._data( elem, key, {
            empty: jQuery.Callbacks("once memory").add(function() {
                _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 23)", 1908);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1909);
jQuery.removeData( elem, type + "queue", true );
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1910);
jQuery.removeData( elem, key, true );
            })
        });
    }
});

_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1916);
jQuery.fn.extend({
    queue: function( type, data ) {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "queue", 1917);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1918);
var setter = 2;

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1920);
if ( typeof type !== "string" ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1921);
data = type;
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1922);
type = "fx";
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1923);
setter--;
        }

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1926);
if ( arguments.length < setter ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1927);
return jQuery.queue( this[0], type );
        }

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1930);
return data === undefined ?
            this :
            this.each(function() {
                _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 24)", 1932);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1933);
var queue = jQuery.queue( this, type, data );

                // ensure a hooks for this queue
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1936);
jQuery._queueHooks( this, type );

                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1938);
if ( type === "fx" && queue[0] !== "inprogress" ) {
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1939);
jQuery.dequeue( this, type );
                }
            });
    },
    dequeue: function( type ) {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "dequeue", 1943);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1944);
return this.each(function() {
            _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 25)", 1944);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1945);
jQuery.dequeue( this, type );
        });
    },
    // Based off of the plugin by Clint Helfers, with permission.
    // http://blindsignals.com/index.php/2009/07/jquery-delay/
    delay: function( time, type ) {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "delay", 1950);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1951);
time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1952);
type = type || "fx";

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1954);
return this.queue( type, function( next, hooks ) {
            _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 26)", 1954);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1955);
var timeout = setTimeout( next, time );
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1956);
hooks.stop = function() {
                _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "stop", 1956);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1957);
clearTimeout( timeout );
            };
        });
    },
    clearQueue: function( type ) {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "clearQueue", 1961);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1962);
return this.queue( type || "fx", [] );
    },
    // Get a promise resolved when queues of a certain type
    // are emptied (fx is the type by default)
    promise: function( type, obj ) {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "promise", 1966);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1967);
var tmp,
            count = 1,
            defer = jQuery.Deferred(),
            elements = this,
            i = this.length,
            resolve = function() {
                _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "resolve", 1972);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1973);
if ( !( --count ) ) {
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1974);
defer.resolveWith( elements, [ elements ] );
                }
            };

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1978);
if ( typeof type !== "string" ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1979);
obj = type;
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1980);
type = undefined;
        }
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1982);
type = type || "fx";

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1984);
while( i-- ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1985);
tmp = jQuery._data( elements[ i ], type + "queueHooks" );
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1986);
if ( tmp && tmp.empty ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1987);
count++;
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1988);
tmp.empty.add( resolve );
            }
        }
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1991);
resolve();
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1992);
return defer.promise( obj );
    }
});
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 1995);
var nodeHook, boolHook, fixSpecified,
    rclass = /[\t\r\n]/g,
    rreturn = /\r/g,
    rtype = /^(?:button|input)$/i,
    rfocusable = /^(?:button|input|object|select|textarea)$/i,
    rclickable = /^a(?:rea|)$/i,
    rboolean = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,
    getSetAttribute = jQuery.support.getSetAttribute;

_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2004);
jQuery.fn.extend({
    attr: function( name, value ) {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "attr", 2005);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2006);
return jQuery.access( this, jQuery.attr, name, value, arguments.length > 1 );
    },

    removeAttr: function( name ) {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "removeAttr", 2009);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2010);
return this.each(function() {
            _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 27)", 2010);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2011);
jQuery.removeAttr( this, name );
        });
    },

    prop: function( name, value ) {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "prop", 2015);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2016);
return jQuery.access( this, jQuery.prop, name, value, arguments.length > 1 );
    },

    removeProp: function( name ) {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "removeProp", 2019);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2020);
name = jQuery.propFix[ name ] || name;
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2021);
return this.each(function() {
            // try/catch handles cases where IE balks (such as removing a property on window)
            _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 28)", 2021);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2023);
try {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2024);
this[ name ] = undefined;
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2025);
delete this[ name ];
            } catch( e ) {}
        });
    },

    addClass: function( value ) {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "addClass", 2030);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2031);
var classNames, i, l, elem,
            setClass, c, cl;

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2034);
if ( jQuery.isFunction( value ) ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2035);
return this.each(function( j ) {
                _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 29)", 2035);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2036);
jQuery( this ).addClass( value.call(this, j, this.className) );
            });
        }

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2040);
if ( value && typeof value === "string" ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2041);
classNames = value.split( core_rspace );

            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2043);
for ( i = 0, l = this.length; i < l; i++ ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2044);
elem = this[ i ];

                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2046);
if ( elem.nodeType === 1 ) {
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2047);
if ( !elem.className && classNames.length === 1 ) {
                        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2048);
elem.className = value;

                    } else {
                        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2051);
setClass = " " + elem.className + " ";

                        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2053);
for ( c = 0, cl = classNames.length; c < cl; c++ ) {
                            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2054);
if ( setClass.indexOf( " " + classNames[ c ] + " " ) < 0 ) {
                                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2055);
setClass += classNames[ c ] + " ";
                            }
                        }
                        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2058);
elem.className = jQuery.trim( setClass );
                    }
                }
            }
        }

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2064);
return this;
    },

    removeClass: function( value ) {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "removeClass", 2067);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2068);
var removes, className, elem, c, cl, i, l;

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2070);
if ( jQuery.isFunction( value ) ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2071);
return this.each(function( j ) {
                _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 30)", 2071);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2072);
jQuery( this ).removeClass( value.call(this, j, this.className) );
            });
        }
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2075);
if ( (value && typeof value === "string") || value === undefined ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2076);
removes = ( value || "" ).split( core_rspace );

            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2078);
for ( i = 0, l = this.length; i < l; i++ ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2079);
elem = this[ i ];
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2080);
if ( elem.nodeType === 1 && elem.className ) {

                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2082);
className = (" " + elem.className + " ").replace( rclass, " " );

                    // loop over each item in the removal list
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2085);
for ( c = 0, cl = removes.length; c < cl; c++ ) {
                        // Remove until there is nothing to remove,
                        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2087);
while ( className.indexOf(" " + removes[ c ] + " ") >= 0 ) {
                            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2088);
className = className.replace( " " + removes[ c ] + " " , " " );
                        }
                    }
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2091);
elem.className = value ? jQuery.trim( className ) : "";
                }
            }
        }

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2096);
return this;
    },

    toggleClass: function( value, stateVal ) {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "toggleClass", 2099);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2100);
var type = typeof value,
            isBool = typeof stateVal === "boolean";

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2103);
if ( jQuery.isFunction( value ) ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2104);
return this.each(function( i ) {
                _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 31)", 2104);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2105);
jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
            });
        }

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2109);
return this.each(function() {
            _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 32)", 2109);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2110);
if ( type === "string" ) {
                // toggle individual class names
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2112);
var className,
                    i = 0,
                    self = jQuery( this ),
                    state = stateVal,
                    classNames = value.split( core_rspace );

                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2118);
while ( (className = classNames[ i++ ]) ) {
                    // check each className given, space separated list
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2120);
state = isBool ? state : !self.hasClass( className );
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2121);
self[ state ? "addClass" : "removeClass" ]( className );
                }

            } else {_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2124);
if ( type === "undefined" || type === "boolean" ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2125);
if ( this.className ) {
                    // store className if set
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2127);
jQuery._data( this, "__className__", this.className );
                }

                // toggle whole className
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2131);
this.className = this.className || value === false ? "" : jQuery._data( this, "__className__" ) || "";
            }}
        });
    },

    hasClass: function( selector ) {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "hasClass", 2136);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2137);
var className = " " + selector + " ",
            i = 0,
            l = this.length;
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2140);
for ( ; i < l; i++ ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2141);
if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2142);
return true;
            }
        }

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2146);
return false;
    },

    val: function( value ) {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "val", 2149);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2150);
var hooks, ret, isFunction,
            elem = this[0];

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2153);
if ( !arguments.length ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2154);
if ( elem ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2155);
hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2157);
if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2158);
return ret;
                }

                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2161);
ret = elem.value;

                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2163);
return typeof ret === "string" ?
                    // handle most common string cases
                    ret.replace(rreturn, "") :
                    // handle cases where value is null/undef or number
                    ret == null ? "" : ret;
            }

            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2170);
return;
        }

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2173);
isFunction = jQuery.isFunction( value );

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2175);
return this.each(function( i ) {
            _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 33)", 2175);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2176);
var val,
                self = jQuery(this);

            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2179);
if ( this.nodeType !== 1 ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2180);
return;
            }

            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2183);
if ( isFunction ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2184);
val = value.call( this, i, self.val() );
            } else {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2186);
val = value;
            }

            // Treat null/undefined as ""; convert numbers to string
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2190);
if ( val == null ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2191);
val = "";
            } else {_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2192);
if ( typeof val === "number" ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2193);
val += "";
            } else {_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2194);
if ( jQuery.isArray( val ) ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2195);
val = jQuery.map(val, function ( value ) {
                    _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 34)", 2195);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2196);
return value == null ? "" : value + "";
                });
            }}}

            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2200);
hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

            // If set returns undefined, fall back to normal setting
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2203);
if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2204);
this.value = val;
            }
        });
    }
});

_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2210);
jQuery.extend({
    valHooks: {
        option: {
            get: function( elem ) {
                // attributes.value is undefined in Blackberry 4.7 but
                // uses .value. See #6932
                _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "get", 2213);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2216);
var val = elem.attributes.value;
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2217);
return !val || val.specified ? elem.value : elem.text;
            }
        },
        select: {
            get: function( elem ) {
                _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "get", 2221);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2222);
var value, i, max, option,
                    index = elem.selectedIndex,
                    values = [],
                    options = elem.options,
                    one = elem.type === "select-one";

                // Nothing was selected
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2229);
if ( index < 0 ) {
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2230);
return null;
                }

                // Loop through all the selected options
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2234);
i = one ? index : 0;
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2235);
max = one ? index + 1 : options.length;
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2236);
for ( ; i < max; i++ ) {
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2237);
option = options[ i ];

                    // Don't return options that are disabled or in a disabled optgroup
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2240);
if ( option.selected && (jQuery.support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null) &&
                            (!option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" )) ) {

                        // Get the specific value for the option
                        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2244);
value = jQuery( option ).val();

                        // We don't need an array for one selects
                        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2247);
if ( one ) {
                            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2248);
return value;
                        }

                        // Multi-Selects return an array
                        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2252);
values.push( value );
                    }
                }

                // Fixes Bug #2551 -- select.val() broken in IE after form.reset()
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2257);
if ( one && !values.length && options.length ) {
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2258);
return jQuery( options[ index ] ).val();
                }

                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2261);
return values;
            },

            set: function( elem, value ) {
                _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "set", 2264);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2265);
var values = jQuery.makeArray( value );

                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2267);
jQuery(elem).find("option").each(function() {
                    _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 35)", 2267);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2268);
this.selected = jQuery.inArray( jQuery(this).val(), values ) >= 0;
                });

                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2271);
if ( !values.length ) {
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2272);
elem.selectedIndex = -1;
                }
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2274);
return values;
            }
        }
    },

    // Unused in 1.8, left in so attrFn-stabbers won't die; remove in 1.9
    attrFn: {},

    attr: function( elem, name, value, pass ) {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "attr", 2282);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2283);
var ret, hooks, notxml,
            nType = elem.nodeType;

        // don't get/set attributes on text, comment and attribute nodes
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2287);
if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2288);
return;
        }

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2291);
if ( pass && jQuery.isFunction( jQuery.fn[ name ] ) ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2292);
return jQuery( elem )[ name ]( value );
        }

        // Fallback to prop when attributes are not supported
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2296);
if ( typeof elem.getAttribute === "undefined" ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2297);
return jQuery.prop( elem, name, value );
        }

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2300);
notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

        // All attributes are lowercase
        // Grab necessary hook if one is defined
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2304);
if ( notxml ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2305);
name = name.toLowerCase();
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2306);
hooks = jQuery.attrHooks[ name ] || ( rboolean.test( name ) ? boolHook : nodeHook );
        }

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2309);
if ( value !== undefined ) {

            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2311);
if ( value === null ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2312);
jQuery.removeAttr( elem, name );
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2313);
return;

            } else {_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2315);
if ( hooks && "set" in hooks && notxml && (ret = hooks.set( elem, value, name )) !== undefined ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2316);
return ret;

            } else {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2319);
elem.setAttribute( name, value + "" );
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2320);
return value;
            }}

        } else {_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2323);
if ( hooks && "get" in hooks && notxml && (ret = hooks.get( elem, name )) !== null ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2324);
return ret;

        } else {

            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2328);
ret = elem.getAttribute( name );

            // Non-existent attributes return null, we normalize to undefined
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2331);
return ret === null ?
                undefined :
                ret;
        }}
    },

    removeAttr: function( elem, value ) {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "removeAttr", 2337);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2338);
var propName, attrNames, name, isBool,
            i = 0;

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2341);
if ( value && elem.nodeType === 1 ) {

            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2343);
attrNames = value.split( core_rspace );

            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2345);
for ( ; i < attrNames.length; i++ ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2346);
name = attrNames[ i ];

                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2348);
if ( name ) {
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2349);
propName = jQuery.propFix[ name ] || name;
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2350);
isBool = rboolean.test( name );

                    // See #9699 for explanation of this approach (setting first, then removal)
                    // Do not do this for boolean attributes (see #10870)
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2354);
if ( !isBool ) {
                        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2355);
jQuery.attr( elem, name, "" );
                    }
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2357);
elem.removeAttribute( getSetAttribute ? name : propName );

                    // Set corresponding property to false for boolean attributes
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2360);
if ( isBool && propName in elem ) {
                        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2361);
elem[ propName ] = false;
                    }
                }
            }
        }
    },

    attrHooks: {
        type: {
            set: function( elem, value ) {
                // We can't allow the type property to be changed (since it causes problems in IE)
                _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "set", 2370);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2372);
if ( rtype.test( elem.nodeName ) && elem.parentNode ) {
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2373);
jQuery.error( "type property can't be changed" );
                } else {_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2374);
if ( !jQuery.support.radioValue && value === "radio" && jQuery.nodeName(elem, "input") ) {
                    // Setting the type on a radio button after the value resets the value in IE6-9
                    // Reset value to it's default in case type is set after value
                    // This is for element creation
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2378);
var val = elem.value;
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2379);
elem.setAttribute( "type", value );
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2380);
if ( val ) {
                        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2381);
elem.value = val;
                    }
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2383);
return value;
                }}
            }
        },
        // Use the value property for back compat
        // Use the nodeHook for button elements in IE6/7 (#1954)
        value: {
            get: function( elem, name ) {
                _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "get", 2390);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2391);
if ( nodeHook && jQuery.nodeName( elem, "button" ) ) {
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2392);
return nodeHook.get( elem, name );
                }
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2394);
return name in elem ?
                    elem.value :
                    null;
            },
            set: function( elem, value, name ) {
                _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "set", 2398);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2399);
if ( nodeHook && jQuery.nodeName( elem, "button" ) ) {
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2400);
return nodeHook.set( elem, value, name );
                }
                // Does not return so that setAttribute is also used
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2403);
elem.value = value;
            }
        }
    },

    propFix: {
        tabindex: "tabIndex",
        readonly: "readOnly",
        "for": "htmlFor",
        "class": "className",
        maxlength: "maxLength",
        cellspacing: "cellSpacing",
        cellpadding: "cellPadding",
        rowspan: "rowSpan",
        colspan: "colSpan",
        usemap: "useMap",
        frameborder: "frameBorder",
        contenteditable: "contentEditable"
    },

    prop: function( elem, name, value ) {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "prop", 2423);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2424);
var ret, hooks, notxml,
            nType = elem.nodeType;

        // don't get/set properties on text, comment and attribute nodes
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2428);
if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2429);
return;
        }

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2432);
notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2434);
if ( notxml ) {
            // Fix name and attach hooks
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2436);
name = jQuery.propFix[ name ] || name;
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2437);
hooks = jQuery.propHooks[ name ];
        }

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2440);
if ( value !== undefined ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2441);
if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2442);
return ret;

            } else {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2445);
return ( elem[ name ] = value );
            }

        } else {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2449);
if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2450);
return ret;

            } else {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2453);
return elem[ name ];
            }
        }
    },

    propHooks: {
        tabIndex: {
            get: function( elem ) {
                // elem.tabIndex doesn't always return the correct value when it hasn't been explicitly set
                // http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
                _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "get", 2460);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2463);
var attributeNode = elem.getAttributeNode("tabindex");

                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2465);
return attributeNode && attributeNode.specified ?
                    parseInt( attributeNode.value, 10 ) :
                    rfocusable.test( elem.nodeName ) || rclickable.test( elem.nodeName ) && elem.href ?
                        0 :
                        undefined;
            }
        }
    }
});

// Hook for boolean attributes
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2476);
boolHook = {
    get: function( elem, name ) {
        // Align boolean attributes with corresponding properties
        // Fall back to attribute presence where some booleans are not supported
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "get", 2477);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2480);
var attrNode,
            property = jQuery.prop( elem, name );
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2482);
return property === true || typeof property !== "boolean" && ( attrNode = elem.getAttributeNode(name) ) && attrNode.nodeValue !== false ?
            name.toLowerCase() :
            undefined;
    },
    set: function( elem, value, name ) {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "set", 2486);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2487);
var propName;
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2488);
if ( value === false ) {
            // Remove boolean attributes when set to false
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2490);
jQuery.removeAttr( elem, name );
        } else {
            // value is true since we know at this point it's type boolean and not false
            // Set boolean attributes to the same name and set the DOM property
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2494);
propName = jQuery.propFix[ name ] || name;
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2495);
if ( propName in elem ) {
                // Only set the IDL specifically if it already exists on the element
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2497);
elem[ propName ] = true;
            }

            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2500);
elem.setAttribute( name, name.toLowerCase() );
        }
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2502);
return name;
    }
};

// IE6/7 do not support getting/setting some attributes with get/setAttribute
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2507);
if ( !getSetAttribute ) {

    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2509);
fixSpecified = {
        name: true,
        id: true,
        coords: true
    };

    // Use this for any attribute in IE6/7
    // This fixes almost every IE6/7 issue
    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2517);
nodeHook = jQuery.valHooks.button = {
        get: function( elem, name ) {
            _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "get", 2518);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2519);
var ret;
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2520);
ret = elem.getAttributeNode( name );
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2521);
return ret && ( fixSpecified[ name ] ? ret.value !== "" : ret.specified ) ?
                ret.value :
                undefined;
        },
        set: function( elem, value, name ) {
            // Set the existing or create a new attribute node
            _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "set", 2525);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2527);
var ret = elem.getAttributeNode( name );
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2528);
if ( !ret ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2529);
ret = document.createAttribute( name );
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2530);
elem.setAttributeNode( ret );
            }
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2532);
return ( ret.value = value + "" );
        }
    };

    // Set width and height to auto instead of 0 on empty string( Bug #8150 )
    // This is for removals
    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2538);
jQuery.each([ "width", "height" ], function( i, name ) {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 36)", 2538);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2539);
jQuery.attrHooks[ name ] = jQuery.extend( jQuery.attrHooks[ name ], {
            set: function( elem, value ) {
                _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "set", 2540);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2541);
if ( value === "" ) {
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2542);
elem.setAttribute( name, "auto" );
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2543);
return value;
                }
            }
        });
    });

    // Set contenteditable to false on removals(#10429)
    // Setting to empty string throws an error as an invalid value
    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2551);
jQuery.attrHooks.contenteditable = {
        get: nodeHook.get,
        set: function( elem, value, name ) {
            _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "set", 2553);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2554);
if ( value === "" ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2555);
value = "false";
            }
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2557);
nodeHook.set( elem, value, name );
        }
    };
}


// Some attributes require a special call on IE
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2564);
if ( !jQuery.support.hrefNormalized ) {
    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2565);
jQuery.each([ "href", "src", "width", "height" ], function( i, name ) {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 37)", 2565);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2566);
jQuery.attrHooks[ name ] = jQuery.extend( jQuery.attrHooks[ name ], {
            get: function( elem ) {
                _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "get", 2567);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2568);
var ret = elem.getAttribute( name, 2 );
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2569);
return ret === null ? undefined : ret;
            }
        });
    });
}

_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2575);
if ( !jQuery.support.style ) {
    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2576);
jQuery.attrHooks.style = {
        get: function( elem ) {
            // Return undefined in the case of empty string
            // Normalize to lowercase since IE uppercases css property names
            _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "get", 2577);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2580);
return elem.style.cssText.toLowerCase() || undefined;
        },
        set: function( elem, value ) {
            _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "set", 2582);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2583);
return ( elem.style.cssText = value + "" );
        }
    };
}

// Safari mis-reports the default selected property of an option
// Accessing the parent's selectedIndex property fixes it
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2590);
if ( !jQuery.support.optSelected ) {
    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2591);
jQuery.propHooks.selected = jQuery.extend( jQuery.propHooks.selected, {
        get: function( elem ) {
            _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "get", 2592);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2593);
var parent = elem.parentNode;

            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2595);
if ( parent ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2596);
parent.selectedIndex;

                // Make sure that it also works with optgroups, see #5701
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2599);
if ( parent.parentNode ) {
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2600);
parent.parentNode.selectedIndex;
                }
            }
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2603);
return null;
        }
    });
}

// IE6/7 call enctype encoding
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2609);
if ( !jQuery.support.enctype ) {
    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2610);
jQuery.propFix.enctype = "encoding";
}

// Radios and checkboxes getter/setter
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2614);
if ( !jQuery.support.checkOn ) {
    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2615);
jQuery.each([ "radio", "checkbox" ], function() {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 38)", 2615);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2616);
jQuery.valHooks[ this ] = {
            get: function( elem ) {
                // Handle the case where in Webkit "" is returned instead of "on" if a value isn't specified
                _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "get", 2617);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2619);
return elem.getAttribute("value") === null ? "on" : elem.value;
            }
        };
    });
}
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2624);
jQuery.each([ "radio", "checkbox" ], function() {
    _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 39)", 2624);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2625);
jQuery.valHooks[ this ] = jQuery.extend( jQuery.valHooks[ this ], {
        set: function( elem, value ) {
            _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "set", 2626);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2627);
if ( jQuery.isArray( value ) ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2628);
return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
            }
        }
    });
});
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2633);
var rformElems = /^(?:textarea|input|select)$/i,
    rtypenamespace = /^([^\.]*|)(?:\.(.+)|)$/,
    rhoverHack = /(?:^|\s)hover(\.\S+|)\b/,
    rkeyEvent = /^key/,
    rmouseEvent = /^(?:mouse|contextmenu)|click/,
    rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
    hoverHack = function( events ) {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "hoverHack", 2639);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2640);
return jQuery.event.special.hover ? events : events.replace( rhoverHack, "mouseenter$1 mouseleave$1" );
    };

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2647);
jQuery.event = {

    add: function( elem, types, handler, data, selector ) {

        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "add", 2649);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2651);
var elemData, eventHandle, events,
            t, tns, type, namespaces, handleObj,
            handleObjIn, handlers, special;

        // Don't attach events to noData or text/comment nodes (allow plain objects tho)
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2656);
if ( elem.nodeType === 3 || elem.nodeType === 8 || !types || !handler || !(elemData = jQuery._data( elem )) ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2657);
return;
        }

        // Caller can pass in an object of custom data in lieu of the handler
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2661);
if ( handler.handler ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2662);
handleObjIn = handler;
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2663);
handler = handleObjIn.handler;
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2664);
selector = handleObjIn.selector;
        }

        // Make sure that the handler has a unique ID, used to find/remove it later
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2668);
if ( !handler.guid ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2669);
handler.guid = jQuery.guid++;
        }

        // Init the element's event structure and main handler, if this is the first
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2673);
events = elemData.events;
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2674);
if ( !events ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2675);
elemData.events = events = {};
        }
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2677);
eventHandle = elemData.handle;
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2678);
if ( !eventHandle ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2679);
elemData.handle = eventHandle = function( e ) {
                // Discard the second event of a jQuery.event.trigger() and
                // when an event is called after a page has unloaded
                _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "eventHandle", 2679);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2682);
return typeof jQuery !== "undefined" && (!e || jQuery.event.triggered !== e.type) ?
                    jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
                    undefined;
            };
            // Add elem as a property of the handle fn to prevent a memory leak with IE non-native events
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2687);
eventHandle.elem = elem;
        }

        // Handle multiple events separated by a space
        // jQuery(...).bind("mouseover mouseout", fn);
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2692);
types = jQuery.trim( hoverHack(types) ).split( " " );
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2693);
for ( t = 0; t < types.length; t++ ) {

            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2695);
tns = rtypenamespace.exec( types[t] ) || [];
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2696);
type = tns[1];
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2697);
namespaces = ( tns[2] || "" ).split( "." ).sort();

            // If event changes its type, use the special event handlers for the changed type
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2700);
special = jQuery.event.special[ type ] || {};

            // If selector defined, determine special event api type, otherwise given type
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2703);
type = ( selector ? special.delegateType : special.bindType ) || type;

            // Update special based on newly reset type
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2706);
special = jQuery.event.special[ type ] || {};

            // handleObj is passed to all event handlers
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2709);
handleObj = jQuery.extend({
                type: type,
                origType: tns[1],
                data: data,
                handler: handler,
                guid: handler.guid,
                selector: selector,
                needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
                namespace: namespaces.join(".")
            }, handleObjIn );

            // Init the event handler queue if we're the first
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2721);
handlers = events[ type ];
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2722);
if ( !handlers ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2723);
handlers = events[ type ] = [];
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2724);
handlers.delegateCount = 0;

                // Only use addEventListener/attachEvent if the special events handler returns false
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2727);
if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
                    // Bind the global event handler to the element
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2729);
if ( elem.addEventListener ) {
                        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2730);
elem.addEventListener( type, eventHandle, false );

                    } else {_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2732);
if ( elem.attachEvent ) {
                        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2733);
elem.attachEvent( "on" + type, eventHandle );
                    }}
                }
            }

            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2738);
if ( special.add ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2739);
special.add.call( elem, handleObj );

                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2741);
if ( !handleObj.handler.guid ) {
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2742);
handleObj.handler.guid = handler.guid;
                }
            }

            // Add to the element's handler list, delegates in front
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2747);
if ( selector ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2748);
handlers.splice( handlers.delegateCount++, 0, handleObj );
            } else {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2750);
handlers.push( handleObj );
            }

            // Keep track of which events have ever been used, for event optimization
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2754);
jQuery.event.global[ type ] = true;
        }

        // Nullify elem to prevent memory leaks in IE
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2758);
elem = null;
    },

    global: {},

    // Detach an event or set of events from an element
    remove: function( elem, types, handler, selector, mappedTypes ) {

        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "remove", 2764);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2766);
var t, tns, type, origType, namespaces, origCount,
            j, events, special, eventType, handleObj,
            elemData = jQuery.hasData( elem ) && jQuery._data( elem );

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2770);
if ( !elemData || !(events = elemData.events) ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2771);
return;
        }

        // Once for each type.namespace in types; type may be omitted
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2775);
types = jQuery.trim( hoverHack( types || "" ) ).split(" ");
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2776);
for ( t = 0; t < types.length; t++ ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2777);
tns = rtypenamespace.exec( types[t] ) || [];
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2778);
type = origType = tns[1];
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2779);
namespaces = tns[2];

            // Unbind all events (on this namespace, if provided) for the element
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2782);
if ( !type ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2783);
for ( type in events ) {
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2784);
jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
                }
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2786);
continue;
            }

            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2789);
special = jQuery.event.special[ type ] || {};
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2790);
type = ( selector? special.delegateType : special.bindType ) || type;
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2791);
eventType = events[ type ] || [];
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2792);
origCount = eventType.length;
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2793);
namespaces = namespaces ? new RegExp("(^|\\.)" + namespaces.split(".").sort().join("\\.(?:.*\\.|)") + "(\\.|$)") : null;

            // Remove matching events
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2796);
for ( j = 0; j < eventType.length; j++ ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2797);
handleObj = eventType[ j ];

                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2799);
if ( ( mappedTypes || origType === handleObj.origType ) &&
                     ( !handler || handler.guid === handleObj.guid ) &&
                     ( !namespaces || namespaces.test( handleObj.namespace ) ) &&
                     ( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2803);
eventType.splice( j--, 1 );

                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2805);
if ( handleObj.selector ) {
                        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2806);
eventType.delegateCount--;
                    }
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2808);
if ( special.remove ) {
                        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2809);
special.remove.call( elem, handleObj );
                    }
                }
            }

            // Remove generic event handler if we removed something and no more handlers exist
            // (avoids potential for endless recursion during removal of special event handlers)
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2816);
if ( eventType.length === 0 && origCount !== eventType.length ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2817);
if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2818);
jQuery.removeEvent( elem, type, elemData.handle );
                }

                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2821);
delete events[ type ];
            }
        }

        // Remove the expando if it's no longer used
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2826);
if ( jQuery.isEmptyObject( events ) ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2827);
delete elemData.handle;

            // removeData also checks for emptiness and clears the expando if empty
            // so use it instead of delete
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2831);
jQuery.removeData( elem, "events", true );
        }
    },

    // Events that are safe to short-circuit if no handlers are attached.
    // Native DOM events should not be added, they may have inline handlers.
    customEvent: {
        "getData": true,
        "setData": true,
        "changeData": true
    },

    trigger: function( event, data, elem, onlyHandlers ) {
        // Don't do events on text and comment nodes
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "trigger", 2843);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2845);
if ( elem && (elem.nodeType === 3 || elem.nodeType === 8) ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2846);
return;
        }

        // Event object or event type
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2850);
var cache, exclusive, i, cur, old, ontype, special, handle, eventPath, bubbleType,
            type = event.type || event,
            namespaces = [];

        // focus/blur morphs to focusin/out; ensure we're not firing them right now
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2855);
if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2856);
return;
        }

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2859);
if ( type.indexOf( "!" ) >= 0 ) {
            // Exclusive events trigger only for the exact event (no namespaces)
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2861);
type = type.slice(0, -1);
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2862);
exclusive = true;
        }

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2865);
if ( type.indexOf( "." ) >= 0 ) {
            // Namespaced trigger; create a regexp to match event type in handle()
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2867);
namespaces = type.split(".");
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2868);
type = namespaces.shift();
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2869);
namespaces.sort();
        }

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2872);
if ( (!elem || jQuery.event.customEvent[ type ]) && !jQuery.event.global[ type ] ) {
            // No jQuery handlers for this event type, and it can't have inline handlers
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2874);
return;
        }

        // Caller can pass in an Event, Object, or just an event type string
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2878);
event = typeof event === "object" ?
            // jQuery.Event object
            event[ jQuery.expando ] ? event :
            // Object literal
            new jQuery.Event( type, event ) :
            // Just the event type (string)
            new jQuery.Event( type );

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2886);
event.type = type;
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2887);
event.isTrigger = true;
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2888);
event.exclusive = exclusive;
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2889);
event.namespace = namespaces.join( "." );
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2890);
event.namespace_re = event.namespace? new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)") : null;
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2891);
ontype = type.indexOf( ":" ) < 0 ? "on" + type : "";

        // Handle a global trigger
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2894);
if ( !elem ) {

            // TODO: Stop taunting the data cache; remove global events and always attach to document
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2897);
cache = jQuery.cache;
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2898);
for ( i in cache ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2899);
if ( cache[ i ].events && cache[ i ].events[ type ] ) {
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2900);
jQuery.event.trigger( event, data, cache[ i ].handle.elem, true );
                }
            }
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2903);
return;
        }

        // Clean up the event in case it is being reused
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2907);
event.result = undefined;
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2908);
if ( !event.target ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2909);
event.target = elem;
        }

        // Clone any incoming data and prepend the event, creating the handler arg list
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2913);
data = data != null ? jQuery.makeArray( data ) : [];
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2914);
data.unshift( event );

        // Allow special events to draw outside the lines
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2917);
special = jQuery.event.special[ type ] || {};
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2918);
if ( special.trigger && special.trigger.apply( elem, data ) === false ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2919);
return;
        }

        // Determine event propagation path in advance, per W3C events spec (#9951)
        // Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2924);
eventPath = [[ elem, special.bindType || type ]];
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2925);
if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2927);
bubbleType = special.delegateType || type;
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2928);
cur = rfocusMorph.test( bubbleType + type ) ? elem : elem.parentNode;
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2929);
for ( old = elem; cur; cur = cur.parentNode ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2930);
eventPath.push([ cur, bubbleType ]);
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2931);
old = cur;
            }

            // Only add window if we got to document (e.g., not plain obj or detached DOM)
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2935);
if ( old === (elem.ownerDocument || document) ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2936);
eventPath.push([ old.defaultView || old.parentWindow || window, bubbleType ]);
            }
        }

        // Fire handlers on the event path
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2941);
for ( i = 0; i < eventPath.length && !event.isPropagationStopped(); i++ ) {

            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2943);
cur = eventPath[i][0];
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2944);
event.type = eventPath[i][1];

            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2946);
handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] && jQuery._data( cur, "handle" );
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2947);
if ( handle ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2948);
handle.apply( cur, data );
            }
            // Note that this is a bare JS function and not a jQuery handler
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2951);
handle = ontype && cur[ ontype ];
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2952);
if ( handle && jQuery.acceptData( cur ) && handle.apply && handle.apply( cur, data ) === false ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2953);
event.preventDefault();
            }
        }
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2956);
event.type = type;

        // If nobody prevented the default action, do it now
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2959);
if ( !onlyHandlers && !event.isDefaultPrevented() ) {

            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2961);
if ( (!special._default || special._default.apply( elem.ownerDocument, data ) === false) &&
                !(type === "click" && jQuery.nodeName( elem, "a" )) && jQuery.acceptData( elem ) ) {

                // Call a native DOM method on the target with the same name name as the event.
                // Can't use an .isFunction() check here because IE6/7 fails that test.
                // Don't do default actions on window, that's where global variables be (#6170)
                // IE<9 dies on focus/blur to hidden element (#1486)
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2968);
if ( ontype && elem[ type ] && ((type !== "focus" && type !== "blur") || event.target.offsetWidth !== 0) && !jQuery.isWindow( elem ) ) {

                    // Don't re-trigger an onFOO event when we call its FOO() method
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2971);
old = elem[ ontype ];

                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2973);
if ( old ) {
                        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2974);
elem[ ontype ] = null;
                    }

                    // Prevent re-triggering of the same event, since we already bubbled it above
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2978);
jQuery.event.triggered = type;
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2979);
elem[ type ]();
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2980);
jQuery.event.triggered = undefined;

                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2982);
if ( old ) {
                        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2983);
elem[ ontype ] = old;
                    }
                }
            }
        }

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2989);
return event.result;
    },

    dispatch: function( event ) {

        // Make a writable jQuery.Event from the native event object
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "dispatch", 2992);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2995);
event = jQuery.event.fix( event || window.event );

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 2997);
var i, j, cur, ret, selMatch, matched, matches, handleObj, sel, related,
            handlers = ( (jQuery._data( this, "events" ) || {} )[ event.type ] || []),
            delegateCount = handlers.delegateCount,
            args = core_slice.call( arguments ),
            run_all = !event.exclusive && !event.namespace,
            special = jQuery.event.special[ event.type ] || {},
            handlerQueue = [];

        // Use the fix-ed jQuery.Event rather than the (read-only) native event
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3006);
args[0] = event;
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3007);
event.delegateTarget = this;

        // Call the preDispatch hook for the mapped type, and let it bail if desired
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3010);
if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3011);
return;
        }

        // Determine handlers that should run if there are delegated events
        // Avoid non-left-click bubbling in Firefox (#3861)
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3016);
if ( delegateCount && !(event.button && event.type === "click") ) {

            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3018);
for ( cur = event.target; cur != this; cur = cur.parentNode || this ) {

                // Don't process clicks (ONLY) on disabled elements (#6911, #8165, #11382, #11764)
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3021);
if ( cur.disabled !== true || event.type !== "click" ) {
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3022);
selMatch = {};
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3023);
matches = [];
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3024);
for ( i = 0; i < delegateCount; i++ ) {
                        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3025);
handleObj = handlers[ i ];
                        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3026);
sel = handleObj.selector;

                        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3028);
if ( selMatch[ sel ] === undefined ) {
                            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3029);
selMatch[ sel ] = handleObj.needsContext ?
                                jQuery( sel, this ).index( cur ) >= 0 :
                                jQuery.find( sel, this, null, [ cur ] ).length;
                        }
                        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3033);
if ( selMatch[ sel ] ) {
                            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3034);
matches.push( handleObj );
                        }
                    }
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3037);
if ( matches.length ) {
                        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3038);
handlerQueue.push({ elem: cur, matches: matches });
                    }
                }
            }
        }

        // Add the remaining (directly-bound) handlers
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3045);
if ( handlers.length > delegateCount ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3046);
handlerQueue.push({ elem: this, matches: handlers.slice( delegateCount ) });
        }

        // Run delegates first; they may want to stop propagation beneath us
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3050);
for ( i = 0; i < handlerQueue.length && !event.isPropagationStopped(); i++ ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3051);
matched = handlerQueue[ i ];
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3052);
event.currentTarget = matched.elem;

            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3054);
for ( j = 0; j < matched.matches.length && !event.isImmediatePropagationStopped(); j++ ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3055);
handleObj = matched.matches[ j ];

                // Triggered event must either 1) be non-exclusive and have no namespace, or
                // 2) have namespace(s) a subset or equal to those in the bound event (both can have no namespace).
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3059);
if ( run_all || (!event.namespace && !handleObj.namespace) || event.namespace_re && event.namespace_re.test( handleObj.namespace ) ) {

                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3061);
event.data = handleObj.data;
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3062);
event.handleObj = handleObj;

                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3064);
ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
                            .apply( matched.elem, args );

                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3067);
if ( ret !== undefined ) {
                        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3068);
event.result = ret;
                        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3069);
if ( ret === false ) {
                            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3070);
event.preventDefault();
                            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3071);
event.stopPropagation();
                        }
                    }
                }
            }
        }

        // Call the postDispatch hook for the mapped type
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3079);
if ( special.postDispatch ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3080);
special.postDispatch.call( this, event );
        }

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3083);
return event.result;
    },

    // Includes some event props shared by KeyEvent and MouseEvent
    // *** attrChange attrName relatedNode srcElement  are not normalized, non-W3C, deprecated, will be removed in 1.8 ***
    props: "attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

    fixHooks: {},

    keyHooks: {
        props: "char charCode key keyCode".split(" "),
        filter: function( event, original ) {

            // Add which for key events
            _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "filter", 3094);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3097);
if ( event.which == null ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3098);
event.which = original.charCode != null ? original.charCode : original.keyCode;
            }

            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3101);
return event;
        }
    },

    mouseHooks: {
        props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
        filter: function( event, original ) {
            _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "filter", 3107);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3108);
var eventDoc, doc, body,
                button = original.button,
                fromElement = original.fromElement;

            // Calculate pageX/Y if missing and clientX/Y available
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3113);
if ( event.pageX == null && original.clientX != null ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3114);
eventDoc = event.target.ownerDocument || document;
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3115);
doc = eventDoc.documentElement;
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3116);
body = eventDoc.body;

                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3118);
event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3119);
event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
            }

            // Add relatedTarget, if necessary
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3123);
if ( !event.relatedTarget && fromElement ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3124);
event.relatedTarget = fromElement === event.target ? original.toElement : fromElement;
            }

            // Add which for click: 1 === left; 2 === middle; 3 === right
            // Note: button is not normalized, so don't use it
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3129);
if ( !event.which && button !== undefined ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3130);
event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
            }

            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3133);
return event;
        }
    },

    fix: function( event ) {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "fix", 3137);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3138);
if ( event[ jQuery.expando ] ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3139);
return event;
        }

        // Create a writable copy of the event object and normalize some properties
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3143);
var i, prop,
            originalEvent = event,
            fixHook = jQuery.event.fixHooks[ event.type ] || {},
            copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3148);
event = jQuery.Event( originalEvent );

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3150);
for ( i = copy.length; i; ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3151);
prop = copy[ --i ];
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3152);
event[ prop ] = originalEvent[ prop ];
        }

        // Fix target property, if necessary (#1925, IE 6/7/8 & Safari2)
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3156);
if ( !event.target ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3157);
event.target = originalEvent.srcElement || document;
        }

        // Target should not be a text node (#504, Safari)
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3161);
if ( event.target.nodeType === 3 ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3162);
event.target = event.target.parentNode;
        }

        // For mouse/key events, metaKey==false if it's undefined (#3368, #11328; IE6/7/8)
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3166);
event.metaKey = !!event.metaKey;

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3168);
return fixHook.filter? fixHook.filter( event, originalEvent ) : event;
    },

    special: {
        load: {
            // Prevent triggered image.load events from bubbling to window.load
            noBubble: true
        },

        focus: {
            delegateType: "focusin"
        },
        blur: {
            delegateType: "focusout"
        },

        beforeunload: {
            setup: function( data, namespaces, eventHandle ) {
                // We only want to do this special case on windows
                _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "setup", 3185);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3187);
if ( jQuery.isWindow( this ) ) {
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3188);
this.onbeforeunload = eventHandle;
                }
            },

            teardown: function( namespaces, eventHandle ) {
                _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "teardown", 3192);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3193);
if ( this.onbeforeunload === eventHandle ) {
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3194);
this.onbeforeunload = null;
                }
            }
        }
    },

    simulate: function( type, elem, event, bubble ) {
        // Piggyback on a donor event to simulate a different one.
        // Fake originalEvent to avoid donor's stopPropagation, but if the
        // simulated event prevents default then we do the same on the donor.
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "simulate", 3200);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3204);
var e = jQuery.extend(
            new jQuery.Event(),
            event,
            { type: type,
                isSimulated: true,
                originalEvent: {}
            }
        );
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3212);
if ( bubble ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3213);
jQuery.event.trigger( e, null, elem );
        } else {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3215);
jQuery.event.dispatch.call( elem, e );
        }
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3217);
if ( e.isDefaultPrevented() ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3218);
event.preventDefault();
        }
    }
};

// Some plugins are using, but it's undocumented/deprecated and will be removed.
// The 1.7 special event interface should provide all the hooks needed now.
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3225);
jQuery.event.handle = jQuery.event.dispatch;

_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3227);
jQuery.removeEvent = document.removeEventListener ?
    function( elem, type, handle ) {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 40)", 3228);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3229);
if ( elem.removeEventListener ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3230);
elem.removeEventListener( type, handle, false );
        }
    } :
    function( elem, type, handle ) {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "}", 3233);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3234);
var name = "on" + type;

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3236);
if ( elem.detachEvent ) {

            // #8545, #7054, preventing memory leaks for custom events in IE6-8 –
            // detachEvent needed property on element, by name of that event, to properly expose it to GC
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3240);
if ( typeof elem[ name ] === "undefined" ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3241);
elem[ name ] = null;
            }

            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3244);
elem.detachEvent( name, handle );
        }
    };

_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3248);
jQuery.Event = function( src, props ) {
    // Allow instantiation without the 'new' keyword
    _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "Event", 3248);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3250);
if ( !(this instanceof jQuery.Event) ) {
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3251);
return new jQuery.Event( src, props );
    }

    // Event object
    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3255);
if ( src && src.type ) {
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3256);
this.originalEvent = src;
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3257);
this.type = src.type;

        // Events bubbling up the document may have been marked as prevented
        // by a handler lower down the tree; reflect the correct value.
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3261);
this.isDefaultPrevented = ( src.defaultPrevented || src.returnValue === false ||
            src.getPreventDefault && src.getPreventDefault() ) ? returnTrue : returnFalse;

    // Event type
    } else {
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3266);
this.type = src;
    }

    // Put explicitly provided properties onto the event object
    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3270);
if ( props ) {
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3271);
jQuery.extend( this, props );
    }

    // Create a timestamp if incoming event doesn't have one
    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3275);
this.timeStamp = src && src.timeStamp || jQuery.now();

    // Mark it as fixed
    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3278);
this[ jQuery.expando ] = true;
};

_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3281);
function returnFalse() {
    _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "returnFalse", 3281);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3282);
return false;
}
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3284);
function returnTrue() {
    _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "returnTrue", 3284);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3285);
return true;
}

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3290);
jQuery.Event.prototype = {
    preventDefault: function() {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "preventDefault", 3291);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3292);
this.isDefaultPrevented = returnTrue;

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3294);
var e = this.originalEvent;
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3295);
if ( !e ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3296);
return;
        }

        // if preventDefault exists run it on the original event
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3300);
if ( e.preventDefault ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3301);
e.preventDefault();

        // otherwise set the returnValue property of the original event to false (IE)
        } else {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3305);
e.returnValue = false;
        }
    },
    stopPropagation: function() {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "stopPropagation", 3308);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3309);
this.isPropagationStopped = returnTrue;

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3311);
var e = this.originalEvent;
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3312);
if ( !e ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3313);
return;
        }
        // if stopPropagation exists run it on the original event
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3316);
if ( e.stopPropagation ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3317);
e.stopPropagation();
        }
        // otherwise set the cancelBubble property of the original event to true (IE)
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3320);
e.cancelBubble = true;
    },
    stopImmediatePropagation: function() {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "stopImmediatePropagation", 3322);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3323);
this.isImmediatePropagationStopped = returnTrue;
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3324);
this.stopPropagation();
    },
    isDefaultPrevented: returnFalse,
    isPropagationStopped: returnFalse,
    isImmediatePropagationStopped: returnFalse
};

// Create mouseenter/leave events using mouseover/out and event-time checks
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3332);
jQuery.each({
    mouseenter: "mouseover",
    mouseleave: "mouseout"
}, function( orig, fix ) {
    _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 41)", 3335);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3336);
jQuery.event.special[ orig ] = {
        delegateType: fix,
        bindType: fix,

        handle: function( event ) {
            _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "handle", 3340);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3341);
var ret,
                target = this,
                related = event.relatedTarget,
                handleObj = event.handleObj,
                selector = handleObj.selector;

            // For mousenter/leave call the handler if related is outside the target.
            // NB: No relatedTarget if the mouse left/entered the browser window
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3349);
if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3350);
event.type = handleObj.origType;
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3351);
ret = handleObj.handler.apply( this, arguments );
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3352);
event.type = fix;
            }
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3354);
return ret;
        }
    };
});

// IE submit delegation
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3360);
if ( !jQuery.support.submitBubbles ) {

    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3362);
jQuery.event.special.submit = {
        setup: function() {
            // Only need this for delegated form submit events
            _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "setup", 3363);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3365);
if ( jQuery.nodeName( this, "form" ) ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3366);
return false;
            }

            // Lazy-add a submit handler when a descendant form may potentially be submitted
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3370);
jQuery.event.add( this, "click._submit keypress._submit", function( e ) {
                // Node name check avoids a VML-related crash in IE (#9807)
                _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 42)", 3370);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3372);
var elem = e.target,
                    form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ? elem.form : undefined;
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3374);
if ( form && !jQuery._data( form, "_submit_attached" ) ) {
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3375);
jQuery.event.add( form, "submit._submit", function( event ) {
                        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 43)", 3375);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3376);
event._submit_bubble = true;
                    });
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3378);
jQuery._data( form, "_submit_attached", true );
                }
            });
            // return undefined since we don't need an event listener
        },

        postDispatch: function( event ) {
            // If form was submitted by the user, bubble the event up the tree
            _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "postDispatch", 3384);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3386);
if ( event._submit_bubble ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3387);
delete event._submit_bubble;
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3388);
if ( this.parentNode && !event.isTrigger ) {
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3389);
jQuery.event.simulate( "submit", this.parentNode, event, true );
                }
            }
        },

        teardown: function() {
            // Only need this for delegated form submit events
            _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "teardown", 3394);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3396);
if ( jQuery.nodeName( this, "form" ) ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3397);
return false;
            }

            // Remove delegated handlers; cleanData eventually reaps submit handlers attached above
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3401);
jQuery.event.remove( this, "._submit" );
        }
    };
}

// IE change delegation and checkbox/radio fix
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3407);
if ( !jQuery.support.changeBubbles ) {

    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3409);
jQuery.event.special.change = {

        setup: function() {

            _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "setup", 3411);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3413);
if ( rformElems.test( this.nodeName ) ) {
                // IE doesn't fire change on a check/radio until blur; trigger it on click
                // after a propertychange. Eat the blur-change in special.change.handle.
                // This still fires onchange a second time for check/radio after blur.
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3417);
if ( this.type === "checkbox" || this.type === "radio" ) {
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3418);
jQuery.event.add( this, "propertychange._change", function( event ) {
                        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 44)", 3418);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3419);
if ( event.originalEvent.propertyName === "checked" ) {
                            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3420);
this._just_changed = true;
                        }
                    });
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3423);
jQuery.event.add( this, "click._change", function( event ) {
                        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 45)", 3423);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3424);
if ( this._just_changed && !event.isTrigger ) {
                            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3425);
this._just_changed = false;
                        }
                        // Allow triggered, simulated change events (#11500)
                        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3428);
jQuery.event.simulate( "change", this, event, true );
                    });
                }
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3431);
return false;
            }
            // Delegated event; lazy-add a change handler on descendant inputs
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3434);
jQuery.event.add( this, "beforeactivate._change", function( e ) {
                _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 46)", 3434);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3435);
var elem = e.target;

                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3437);
if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "_change_attached" ) ) {
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3438);
jQuery.event.add( elem, "change._change", function( event ) {
                        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 47)", 3438);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3439);
if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
                            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3440);
jQuery.event.simulate( "change", this.parentNode, event, true );
                        }
                    });
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3443);
jQuery._data( elem, "_change_attached", true );
                }
            });
        },

        handle: function( event ) {
            _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "handle", 3448);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3449);
var elem = event.target;

            // Swallow native change events from checkbox/radio, we already triggered them above
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3452);
if ( this !== elem || event.isSimulated || event.isTrigger || (elem.type !== "radio" && elem.type !== "checkbox") ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3453);
return event.handleObj.handler.apply( this, arguments );
            }
        },

        teardown: function() {
            _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "teardown", 3457);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3458);
jQuery.event.remove( this, "._change" );

            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3460);
return !rformElems.test( this.nodeName );
        }
    };
}

// Create "bubbling" focus and blur events
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3466);
if ( !jQuery.support.focusinBubbles ) {
    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3467);
jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

        // Attach a single capturing handler while someone wants focusin/focusout
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 48)", 3467);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3470);
var attaches = 0,
            handler = function( event ) {
                _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "handler", 3471);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3472);
jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
            };

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3475);
jQuery.event.special[ fix ] = {
            setup: function() {
                _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "setup", 3476);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3477);
if ( attaches++ === 0 ) {
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3478);
document.addEventListener( orig, handler, true );
                }
            },
            teardown: function() {
                _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "teardown", 3481);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3482);
if ( --attaches === 0 ) {
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3483);
document.removeEventListener( orig, handler, true );
                }
            }
        };
    });
}

_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3490);
jQuery.fn.extend({

    on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "on", 3492);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3493);
var origFn, type;

        // Types can be a map of types/handlers
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3496);
if ( typeof types === "object" ) {
            // ( types-Object, selector, data )
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3498);
if ( typeof selector !== "string" ) { // && selector != null
                // ( types-Object, data )
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3500);
data = data || selector;
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3501);
selector = undefined;
            }
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3503);
for ( type in types ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3504);
this.on( type, selector, data, types[ type ], one );
            }
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3506);
return this;
        }

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3509);
if ( data == null && fn == null ) {
            // ( types, fn )
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3511);
fn = selector;
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3512);
data = selector = undefined;
        } else {_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3513);
if ( fn == null ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3514);
if ( typeof selector === "string" ) {
                // ( types, selector, fn )
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3516);
fn = data;
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3517);
data = undefined;
            } else {
                // ( types, data, fn )
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3520);
fn = data;
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3521);
data = selector;
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3522);
selector = undefined;
            }
        }}
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3525);
if ( fn === false ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3526);
fn = returnFalse;
        } else {_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3527);
if ( !fn ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3528);
return this;
        }}

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3531);
if ( one === 1 ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3532);
origFn = fn;
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3533);
fn = function( event ) {
                // Can use an empty set, since event contains the info
                _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "fn", 3533);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3535);
jQuery().off( event );
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3536);
return origFn.apply( this, arguments );
            };
            // Use same guid so caller can remove using origFn
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3539);
fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
        }
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3541);
return this.each( function() {
            _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 49)", 3541);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3542);
jQuery.event.add( this, types, fn, data, selector );
        });
    },
    one: function( types, selector, data, fn ) {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "one", 3545);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3546);
return this.on( types, selector, data, fn, 1 );
    },
    off: function( types, selector, fn ) {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "off", 3548);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3549);
var handleObj, type;
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3550);
if ( types && types.preventDefault && types.handleObj ) {
            // ( event )  dispatched jQuery.Event
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3552);
handleObj = types.handleObj;
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3553);
jQuery( types.delegateTarget ).off(
                handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
                handleObj.selector,
                handleObj.handler
            );
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3558);
return this;
        }
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3560);
if ( typeof types === "object" ) {
            // ( types-object [, selector] )
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3562);
for ( type in types ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3563);
this.off( type, selector, types[ type ] );
            }
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3565);
return this;
        }
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3567);
if ( selector === false || typeof selector === "function" ) {
            // ( types [, fn] )
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3569);
fn = selector;
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3570);
selector = undefined;
        }
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3572);
if ( fn === false ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3573);
fn = returnFalse;
        }
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3575);
return this.each(function() {
            _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 50)", 3575);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3576);
jQuery.event.remove( this, types, fn, selector );
        });
    },

    bind: function( types, data, fn ) {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "bind", 3580);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3581);
return this.on( types, null, data, fn );
    },
    unbind: function( types, fn ) {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "unbind", 3583);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3584);
return this.off( types, null, fn );
    },

    live: function( types, data, fn ) {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "live", 3587);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3588);
jQuery( this.context ).on( types, this.selector, data, fn );
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3589);
return this;
    },
    die: function( types, fn ) {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "die", 3591);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3592);
jQuery( this.context ).off( types, this.selector || "**", fn );
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3593);
return this;
    },

    delegate: function( selector, types, data, fn ) {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "delegate", 3596);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3597);
return this.on( types, selector, data, fn );
    },
    undelegate: function( selector, types, fn ) {
        // ( namespace ) or ( selector, types [, fn] )
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "undelegate", 3599);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3601);
return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
    },

    trigger: function( type, data ) {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "trigger", 3604);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3605);
return this.each(function() {
            _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 51)", 3605);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3606);
jQuery.event.trigger( type, data, this );
        });
    },
    triggerHandler: function( type, data ) {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "triggerHandler", 3609);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3610);
if ( this[0] ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3611);
return jQuery.event.trigger( type, data, this[0], true );
        }
    },

    toggle: function( fn ) {
        // Save reference to arguments for access in closure
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "toggle", 3615);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3617);
var args = arguments,
            guid = fn.guid || jQuery.guid++,
            i = 0,
            toggler = function( event ) {
                // Figure out which function to execute
                _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "toggler", 3620);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3622);
var lastToggle = ( jQuery._data( this, "lastToggle" + fn.guid ) || 0 ) % i;
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3623);
jQuery._data( this, "lastToggle" + fn.guid, lastToggle + 1 );

                // Make sure that clicks stop
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3626);
event.preventDefault();

                // and execute the function
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3629);
return args[ lastToggle ].apply( this, arguments ) || false;
            };

        // link all the functions, so any of them can unbind this click handler
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3633);
toggler.guid = guid;
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3634);
while ( i < args.length ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3635);
args[ i++ ].guid = guid;
        }

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3638);
return this.click( toggler );
    },

    hover: function( fnOver, fnOut ) {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "hover", 3641);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3642);
return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
    }
});

_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3646);
jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
    "mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
    "change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

    // Handle event binding
    _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 52)", 3648);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3651);
jQuery.fn[ name ] = function( data, fn ) {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "]", 3651);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3652);
if ( fn == null ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3653);
fn = data;
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3654);
data = null;
        }

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3657);
return arguments.length > 0 ?
            this.on( name, null, data, fn ) :
            this.trigger( name );
    };

    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3662);
if ( rkeyEvent.test( name ) ) {
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3663);
jQuery.event.fixHooks[ name ] = jQuery.event.keyHooks;
    }

    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3666);
if ( rmouseEvent.test( name ) ) {
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3667);
jQuery.event.fixHooks[ name ] = jQuery.event.mouseHooks;
    }
});
/*!
 * Sizzle CSS Selector Engine
 * Copyright 2012 jQuery Foundation and other contributors
 * Released under the MIT license
 * http://sizzlejs.com/
 */
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3676);
(function( window, undefined ) {

_yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 53)", 3676);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3678);
var cachedruns,
    assertGetIdNotName,
    Expr,
    getText,
    isXML,
    contains,
    compile,
    sortOrder,
    hasDuplicate,
    outermostContext,

    baseHasDuplicate = true,
    strundefined = "undefined",

    expando = ( "sizcache" + Math.random() ).replace( ".", "" ),

    Token = String,
    document = window.document,
    docElem = document.documentElement,
    dirruns = 0,
    done = 0,
    pop = [].pop,
    push = [].push,
    slice = [].slice,
    // Use a stripped-down indexOf if a native one is unavailable
    indexOf = [].indexOf || function( elem ) {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 54)", 3703);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3704);
var i = 0,
            len = this.length;
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3706);
for ( ; i < len; i++ ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3707);
if ( this[i] === elem ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3708);
return i;
            }
        }
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3711);
return -1;
    },

    // Augment a function for special use by Sizzle
    markFunction = function( fn, value ) {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "markFunction", 3715);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3716);
fn[ expando ] = value == null || value;
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3717);
return fn;
    },

    createCache = function() {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "createCache", 3720);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3721);
var cache = {},
            keys = [];

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3724);
return markFunction(function( key, value ) {
            // Only keep the most recent entries
            _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 55)", 3724);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3726);
if ( keys.push( key ) > Expr.cacheLength ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3727);
delete cache[ keys.shift() ];
            }

            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3730);
return (cache[ key ] = value);
        }, cache );
    },

    classCache = createCache(),
    tokenCache = createCache(),
    compilerCache = createCache(),

    // Regex

    // Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
    whitespace = "[\\x20\\t\\r\\n\\f]",
    // http://www.w3.org/TR/css3-syntax/#characters
    characterEncoding = "(?:\\\\.|[-\\w]|[^\\x00-\\xa0])+",

    // Loosely modeled on CSS identifier characters
    // An unquoted value should be a CSS identifier (http://www.w3.org/TR/css3-selectors/#attribute-selectors)
    // Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
    identifier = characterEncoding.replace( "w", "w#" ),

    // Acceptable operators http://www.w3.org/TR/selectors/#attribute-selectors
    operators = "([*^$|!~]?=)",
    attributes = "\\[" + whitespace + "*(" + characterEncoding + ")" + whitespace +
        "*(?:" + operators + whitespace + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + identifier + ")|)|)" + whitespace + "*\\]",

    // Prefer arguments not in parens/brackets,
    //   then attribute selectors and non-pseudos (denoted by :),
    //   then anything else
    // These preferences are here to reduce the number of selectors
    //   needing tokenize in the PSEUDO preFilter
    pseudos = ":(" + characterEncoding + ")(?:\\((?:(['\"])((?:\\\\.|[^\\\\])*?)\\2|([^()[\\]]*|(?:(?:" + attributes + ")|[^:]|\\\\.)*|.*))\\)|)",

    // For matchExpr.POS and matchExpr.needsContext
    pos = ":(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + whitespace +
        "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)",

    // Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
    rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

    rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
    rcombinators = new RegExp( "^" + whitespace + "*([\\x20\\t\\r\\n\\f>+~])" + whitespace + "*" ),
    rpseudo = new RegExp( pseudos ),

    // Easily-parseable/retrievable ID or TAG or CLASS selectors
    rquickExpr = /^(?:#([\w\-]+)|(\w+)|\.([\w\-]+))$/,

    rnot = /^:not/,
    rsibling = /[\x20\t\r\n\f]*[+~]/,
    rendsWithNot = /:not\($/,

    rheader = /h\d/i,
    rinputs = /input|select|textarea|button/i,

    rbackslash = /\\(?!\\)/g,

    matchExpr = {
        "ID": new RegExp( "^#(" + characterEncoding + ")" ),
        "CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
        "NAME": new RegExp( "^\\[name=['\"]?(" + characterEncoding + ")['\"]?\\]" ),
        "TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
        "ATTR": new RegExp( "^" + attributes ),
        "PSEUDO": new RegExp( "^" + pseudos ),
        "POS": new RegExp( pos, "i" ),
        "CHILD": new RegExp( "^:(only|nth|first|last)-child(?:\\(" + whitespace +
            "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
            "*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
        // For use in libraries implementing .is()
        "needsContext": new RegExp( "^" + whitespace + "*[>+~]|" + pos, "i" )
    },

    // Support

    // Used for testing something on an element
    assert = function( fn ) {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "assert", 3803);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3804);
var div = document.createElement("div");

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3806);
try {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3807);
return fn( div );
        } catch (e) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3809);
return false;
        } finally {
            // release memory in IE
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3812);
div = null;
        }
    },

    // Check if getElementsByTagName("*") returns only elements
    assertTagNameNoComments = assert(function( div ) {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 56)", 3817);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3818);
div.appendChild( document.createComment("") );
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3819);
return !div.getElementsByTagName("*").length;
    }),

    // Check if getAttribute returns normalized href attributes
    assertHrefNotNormalized = assert(function( div ) {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 57)", 3823);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3824);
div.innerHTML = "<a href='#'></a>";
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3825);
return div.firstChild && typeof div.firstChild.getAttribute !== strundefined &&
            div.firstChild.getAttribute("href") === "#";
    }),

    // Check if attributes should be retrieved by attribute nodes
    assertAttributes = assert(function( div ) {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 58)", 3830);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3831);
div.innerHTML = "<select></select>";
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3832);
var type = typeof div.lastChild.getAttribute("multiple");
        // IE8 returns a string for some attributes even when not present
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3834);
return type !== "boolean" && type !== "string";
    }),

    // Check if getElementsByClassName can be trusted
    assertUsableClassName = assert(function( div ) {
        // Opera can't find a second classname (in 9.6)
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 59)", 3838);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3840);
div.innerHTML = "<div class='hidden e'></div><div class='hidden'></div>";
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3841);
if ( !div.getElementsByClassName || !div.getElementsByClassName("e").length ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3842);
return false;
        }

        // Safari 3.2 caches class attributes and doesn't catch changes
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3846);
div.lastChild.className = "e";
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3847);
return div.getElementsByClassName("e").length === 2;
    }),

    // Check if getElementById returns elements by name
    // Check if getElementsByName privileges form controls or returns elements by ID
    assertUsableName = assert(function( div ) {
        // Inject content
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 60)", 3852);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3854);
div.id = expando + 0;
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3855);
div.innerHTML = "<a name='" + expando + "'></a><div name='" + expando + "'></div>";
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3856);
docElem.insertBefore( div, docElem.firstChild );

        // Test
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3859);
var pass = document.getElementsByName &&
            // buggy browsers will return fewer than the correct 2
            document.getElementsByName( expando ).length === 2 +
            // buggy browsers will return more than the correct 0
            document.getElementsByName( expando + 0 ).length;
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3864);
assertGetIdNotName = !document.getElementById( expando );

        // Cleanup
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3867);
docElem.removeChild( div );

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3869);
return pass;
    });

// If slice is not available, provide a backup
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3873);
try {
    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3874);
slice.call( docElem.childNodes, 0 )[0].nodeType;
} catch ( e ) {
    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3876);
slice = function( i ) {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "slice", 3876);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3877);
var elem,
            results = [];
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3879);
for ( ; (elem = this[i]); i++ ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3880);
results.push( elem );
        }
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3882);
return results;
    };
}

_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3886);
function Sizzle( selector, context, results, seed ) {
    _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "Sizzle", 3886);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3887);
results = results || [];
    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3888);
context = context || document;
    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3889);
var match, elem, xml, m,
        nodeType = context.nodeType;

    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3892);
if ( !selector || typeof selector !== "string" ) {
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3893);
return results;
    }

    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3896);
if ( nodeType !== 1 && nodeType !== 9 ) {
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3897);
return [];
    }

    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3900);
xml = isXML( context );

    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3902);
if ( !xml && !seed ) {
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3903);
if ( (match = rquickExpr.exec( selector )) ) {
            // Speed-up: Sizzle("#ID")
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3905);
if ( (m = match[1]) ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3906);
if ( nodeType === 9 ) {
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3907);
elem = context.getElementById( m );
                    // Check parentNode to catch when Blackberry 4.6 returns
                    // nodes that are no longer in the document #6963
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3910);
if ( elem && elem.parentNode ) {
                        // Handle the case where IE, Opera, and Webkit return items
                        // by name instead of ID
                        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3913);
if ( elem.id === m ) {
                            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3914);
results.push( elem );
                            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3915);
return results;
                        }
                    } else {
                        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3918);
return results;
                    }
                } else {
                    // Context is not a document
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3922);
if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
                        contains( context, elem ) && elem.id === m ) {
                        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3924);
results.push( elem );
                        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3925);
return results;
                    }
                }

            // Speed-up: Sizzle("TAG")
            } else {_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3930);
if ( match[2] ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3931);
push.apply( results, slice.call(context.getElementsByTagName( selector ), 0) );
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3932);
return results;

            // Speed-up: Sizzle(".CLASS")
            } else {_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3935);
if ( (m = match[3]) && assertUsableClassName && context.getElementsByClassName ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3936);
push.apply( results, slice.call(context.getElementsByClassName( m ), 0) );
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3937);
return results;
            }}}
        }
    }

    // All others
    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3943);
return select( selector.replace( rtrim, "$1" ), context, results, seed, xml );
}

_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3946);
Sizzle.matches = function( expr, elements ) {
    _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "matches", 3946);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3947);
return Sizzle( expr, null, null, elements );
};

_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3950);
Sizzle.matchesSelector = function( elem, expr ) {
    _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "matchesSelector", 3950);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3951);
return Sizzle( expr, null, null, [ elem ] ).length > 0;
};

// Returns a function to use in pseudos for input types
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3955);
function createInputPseudo( type ) {
    _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "createInputPseudo", 3955);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3956);
return function( elem ) {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 61)", 3956);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3957);
var name = elem.nodeName.toLowerCase();
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3958);
return name === "input" && elem.type === type;
    };
}

// Returns a function to use in pseudos for buttons
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3963);
function createButtonPseudo( type ) {
    _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "createButtonPseudo", 3963);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3964);
return function( elem ) {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 62)", 3964);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3965);
var name = elem.nodeName.toLowerCase();
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3966);
return (name === "input" || name === "button") && elem.type === type;
    };
}

// Returns a function to use in pseudos for positionals
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3971);
function createPositionalPseudo( fn ) {
    _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "createPositionalPseudo", 3971);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3972);
return markFunction(function( argument ) {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 63)", 3972);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3973);
argument = +argument;
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3974);
return markFunction(function( seed, matches ) {
            _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 64)", 3974);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3975);
var j,
                matchIndexes = fn( [], seed.length, argument ),
                i = matchIndexes.length;

            // Match elements found at the specified indexes
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3980);
while ( i-- ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3981);
if ( seed[ (j = matchIndexes[i]) ] ) {
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3982);
seed[j] = !(matches[j] = seed[j]);
                }
            }
        });
    });
}

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3993);
getText = Sizzle.getText = function( elem ) {
    _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "getText", 3993);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3994);
var node,
        ret = "",
        i = 0,
        nodeType = elem.nodeType;

    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 3999);
if ( nodeType ) {
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4000);
if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
            // Use textContent for elements
            // innerText usage removed for consistency of new lines (see #11153)
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4003);
if ( typeof elem.textContent === "string" ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4004);
return elem.textContent;
            } else {
                // Traverse its children
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4007);
for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4008);
ret += getText( elem );
                }
            }
        } else {_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4011);
if ( nodeType === 3 || nodeType === 4 ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4012);
return elem.nodeValue;
        }}
        // Do not include comment or processing instruction nodes
    } else {

        // If no nodeType, this is expected to be an array
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4018);
for ( ; (node = elem[i]); i++ ) {
            // Do not traverse comment nodes
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4020);
ret += getText( node );
        }
    }
    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4023);
return ret;
};

_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4026);
isXML = Sizzle.isXML = function( elem ) {
    // documentElement is verified for cases where it doesn't yet exist
    // (such as loading iframes in IE - #4833)
    _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "isXML", 4026);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4029);
var documentElement = elem && (elem.ownerDocument || elem).documentElement;
    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4030);
return documentElement ? documentElement.nodeName !== "HTML" : false;
};

// Element contains another
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4034);
contains = Sizzle.contains = docElem.contains ?
    function( a, b ) {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 65)", 4035);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4036);
var adown = a.nodeType === 9 ? a.documentElement : a,
            bup = b && b.parentNode;
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4038);
return a === bup || !!( bup && bup.nodeType === 1 && adown.contains && adown.contains(bup) );
    } :
    docElem.compareDocumentPosition ?
    function( a, b ) {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 66)", 4041);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4042);
return b && !!( a.compareDocumentPosition( b ) & 16 );
    } :
    function( a, b ) {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "}", 4044);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4045);
while ( (b = b.parentNode) ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4046);
if ( b === a ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4047);
return true;
            }
        }
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4050);
return false;
    };

_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4053);
Sizzle.attr = function( elem, name ) {
    _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "attr", 4053);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4054);
var val,
        xml = isXML( elem );

    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4057);
if ( !xml ) {
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4058);
name = name.toLowerCase();
    }
    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4060);
if ( (val = Expr.attrHandle[ name ]) ) {
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4061);
return val( elem );
    }
    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4063);
if ( xml || assertAttributes ) {
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4064);
return elem.getAttribute( name );
    }
    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4066);
val = elem.getAttributeNode( name );
    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4067);
return val ?
        typeof elem[ name ] === "boolean" ?
            elem[ name ] ? name : null :
            val.specified ? val.value : null :
        null;
};

_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4074);
Expr = Sizzle.selectors = {

    // Can be adjusted by the user
    cacheLength: 50,

    createPseudo: markFunction,

    match: matchExpr,

    // IE6/7 return a modified href
    attrHandle: assertHrefNotNormalized ?
        {} :
        {
            "href": function( elem ) {
                _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "\"href\"", 4087);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4088);
return elem.getAttribute( "href", 2 );
            },
            "type": function( elem ) {
                _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "\"type\"", 4090);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4091);
return elem.getAttribute("type");
            }
        },

    find: {
        "ID": assertGetIdNotName ?
            function( id, context, xml ) {
                _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 67)", 4097);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4098);
if ( typeof context.getElementById !== strundefined && !xml ) {
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4099);
var m = context.getElementById( id );
                    // Check parentNode to catch when Blackberry 4.6 returns
                    // nodes that are no longer in the document #6963
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4102);
return m && m.parentNode ? [m] : [];
                }
            } :
            function( id, context, xml ) {
                _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "}", 4105);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4106);
if ( typeof context.getElementById !== strundefined && !xml ) {
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4107);
var m = context.getElementById( id );

                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4109);
return m ?
                        m.id === id || typeof m.getAttributeNode !== strundefined && m.getAttributeNode("id").value === id ?
                            [m] :
                            undefined :
                        [];
                }
            },

        "TAG": assertTagNameNoComments ?
            function( tag, context ) {
                _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 68)", 4118);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4119);
if ( typeof context.getElementsByTagName !== strundefined ) {
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4120);
return context.getElementsByTagName( tag );
                }
            } :
            function( tag, context ) {
                _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "}", 4123);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4124);
var results = context.getElementsByTagName( tag );

                // Filter out possible comments
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4127);
if ( tag === "*" ) {
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4128);
var elem,
                        tmp = [],
                        i = 0;

                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4132);
for ( ; (elem = results[i]); i++ ) {
                        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4133);
if ( elem.nodeType === 1 ) {
                            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4134);
tmp.push( elem );
                        }
                    }

                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4138);
return tmp;
                }
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4140);
return results;
            },

        "NAME": assertUsableName && function( tag, context ) {
            _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 69)", 4143);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4144);
if ( typeof context.getElementsByName !== strundefined ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4145);
return context.getElementsByName( name );
            }
        },

        "CLASS": assertUsableClassName && function( className, context, xml ) {
            _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 70)", 4149);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4150);
if ( typeof context.getElementsByClassName !== strundefined && !xml ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4151);
return context.getElementsByClassName( className );
            }
        }
    },

    relative: {
        ">": { dir: "parentNode", first: true },
        " ": { dir: "parentNode" },
        "+": { dir: "previousSibling", first: true },
        "~": { dir: "previousSibling" }
    },

    preFilter: {
        "ATTR": function( match ) {
            _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "\"ATTR\"", 4164);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4165);
match[1] = match[1].replace( rbackslash, "" );

            // Move the given value to match[3] whether quoted or unquoted
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4168);
match[3] = ( match[4] || match[5] || "" ).replace( rbackslash, "" );

            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4170);
if ( match[2] === "~=" ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4171);
match[3] = " " + match[3] + " ";
            }

            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4174);
return match.slice( 0, 4 );
        },

        "CHILD": function( match ) {
            /* matches from matchExpr["CHILD"]
                1 type (only|nth|...)
                2 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
                3 xn-component of xn+y argument ([+-]?\d*n|)
                4 sign of xn-component
                5 x of xn-component
                6 sign of y-component
                7 y of y-component
            */
            _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "\"CHILD\"", 4177);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4187);
match[1] = match[1].toLowerCase();

            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4189);
if ( match[1] === "nth" ) {
                // nth-child requires argument
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4191);
if ( !match[2] ) {
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4192);
Sizzle.error( match[0] );
                }

                // numeric x and y parameters for Expr.filter.CHILD
                // remember that false/true cast respectively to 0/1
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4197);
match[3] = +( match[3] ? match[4] + (match[5] || 1) : 2 * ( match[2] === "even" || match[2] === "odd" ) );
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4198);
match[4] = +( ( match[6] + match[7] ) || match[2] === "odd" );

            // other types prohibit arguments
            } else {_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4201);
if ( match[2] ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4202);
Sizzle.error( match[0] );
            }}

            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4205);
return match;
        },

        "PSEUDO": function( match ) {
            _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "\"PSEUDO\"", 4208);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4209);
var unquoted, excess;
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4210);
if ( matchExpr["CHILD"].test( match[0] ) ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4211);
return null;
            }

            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4214);
if ( match[3] ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4215);
match[2] = match[3];
            } else {_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4216);
if ( (unquoted = match[4]) ) {
                // Only check arguments that contain a pseudo
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4218);
if ( rpseudo.test(unquoted) &&
                    // Get excess from tokenize (recursively)
                    (excess = tokenize( unquoted, true )) &&
                    // advance to the next closing parenthesis
                    (excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

                    // excess is a negative index
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4225);
unquoted = unquoted.slice( 0, excess );
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4226);
match[0] = match[0].slice( 0, excess );
                }
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4228);
match[2] = unquoted;
            }}

            // Return only captures needed by the pseudo filter method (type and argument)
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4232);
return match.slice( 0, 3 );
        }
    },

    filter: {
        "ID": assertGetIdNotName ?
            function( id ) {
                _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 71)", 4238);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4239);
id = id.replace( rbackslash, "" );
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4240);
return function( elem ) {
                    _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 72)", 4240);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4241);
return elem.getAttribute("id") === id;
                };
            } :
            function( id ) {
                _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "}", 4244);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4245);
id = id.replace( rbackslash, "" );
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4246);
return function( elem ) {
                    _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 73)", 4246);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4247);
var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode("id");
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4248);
return node && node.value === id;
                };
            },

        "TAG": function( nodeName ) {
            _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "\"TAG\"", 4252);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4253);
if ( nodeName === "*" ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4254);
return function() { _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 74)", 4254);
return true; };
            }
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4256);
nodeName = nodeName.replace( rbackslash, "" ).toLowerCase();

            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4258);
return function( elem ) {
                _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 75)", 4258);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4259);
return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
            };
        },

        "CLASS": function( className ) {
            _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "\"CLASS\"", 4263);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4264);
var pattern = classCache[ expando ][ className ];
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4265);
if ( !pattern ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4266);
pattern = classCache( className, new RegExp("(^|" + whitespace + ")" + className + "(" + whitespace + "|$)") );
            }
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4268);
return function( elem ) {
                _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 76)", 4268);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4269);
return pattern.test( elem.className || (typeof elem.getAttribute !== strundefined && elem.getAttribute("class")) || "" );
            };
        },

        "ATTR": function( name, operator, check ) {
            _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "\"ATTR\"", 4273);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4274);
return function( elem, context ) {
                _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 77)", 4274);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4275);
var result = Sizzle.attr( elem, name );

                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4277);
if ( result == null ) {
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4278);
return operator === "!=";
                }
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4280);
if ( !operator ) {
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4281);
return true;
                }

                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4284);
result += "";

                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4286);
return operator === "=" ? result === check :
                    operator === "!=" ? result !== check :
                    operator === "^=" ? check && result.indexOf( check ) === 0 :
                    operator === "*=" ? check && result.indexOf( check ) > -1 :
                    operator === "$=" ? check && result.substr( result.length - check.length ) === check :
                    operator === "~=" ? ( " " + result + " " ).indexOf( check ) > -1 :
                    operator === "|=" ? result === check || result.substr( 0, check.length + 1 ) === check + "-" :
                    false;
            };
        },

        "CHILD": function( type, argument, first, last ) {

            _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "\"CHILD\"", 4297);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4299);
if ( type === "nth" ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4300);
return function( elem ) {
                    _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 78)", 4300);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4301);
var node, diff,
                        parent = elem.parentNode;

                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4304);
if ( first === 1 && last === 0 ) {
                        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4305);
return true;
                    }

                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4308);
if ( parent ) {
                        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4309);
diff = 0;
                        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4310);
for ( node = parent.firstChild; node; node = node.nextSibling ) {
                            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4311);
if ( node.nodeType === 1 ) {
                                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4312);
diff++;
                                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4313);
if ( elem === node ) {
                                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4314);
break;
                                }
                            }
                        }
                    }

                    // Incorporate the offset (or cast to NaN), then check against cycle size
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4321);
diff -= last;
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4322);
return diff === first || ( diff % first === 0 && diff / first >= 0 );
                };
            }

            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4326);
return function( elem ) {
                _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 79)", 4326);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4327);
var node = elem;

                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4329);
switch ( type ) {
                    case "only":
                    case "first":
                        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4332);
while ( (node = node.previousSibling) ) {
                            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4333);
if ( node.nodeType === 1 ) {
                                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4334);
return false;
                            }
                        }

                        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4338);
if ( type === "first" ) {
                            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4339);
return true;
                        }

                        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4342);
node = elem;

                        /* falls through */
                    case "last":
                        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4346);
while ( (node = node.nextSibling) ) {
                            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4347);
if ( node.nodeType === 1 ) {
                                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4348);
return false;
                            }
                        }

                        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4352);
return true;
                }
            };
        },

        "PSEUDO": function( pseudo, argument ) {
            // pseudo-class names are case-insensitive
            // http://www.w3.org/TR/selectors/#pseudo-classes
            // Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
            // Remember that setFilters inherits from pseudos
            _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "\"PSEUDO\"", 4357);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4362);
var args,
                fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
                    Sizzle.error( "unsupported pseudo: " + pseudo );

            // The user may use createPseudo to indicate that
            // arguments are needed to create the filter function
            // just as Sizzle does
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4369);
if ( fn[ expando ] ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4370);
return fn( argument );
            }

            // But maintain support for old signatures
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4374);
if ( fn.length > 1 ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4375);
args = [ pseudo, pseudo, "", argument ];
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4376);
return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
                    markFunction(function( seed, matches ) {
                        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 80)", 4377);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4378);
var idx,
                            matched = fn( seed, argument ),
                            i = matched.length;
                        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4381);
while ( i-- ) {
                            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4382);
idx = indexOf.call( seed, matched[i] );
                            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4383);
seed[ idx ] = !( matches[ idx ] = matched[i] );
                        }
                    }) :
                    function( elem ) {
                        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", ")", 4386);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4387);
return fn( elem, 0, args );
                    };
            }

            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4391);
return fn;
        }
    },

    pseudos: {
        "not": markFunction(function( selector ) {
            // Trim the selector passed to compile
            // to avoid treating leading and trailing
            // spaces as combinators
            _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 81)", 4396);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4400);
var input = [],
                results = [],
                matcher = compile( selector.replace( rtrim, "$1" ) );

            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4404);
return matcher[ expando ] ?
                markFunction(function( seed, matches, context, xml ) {
                    _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 82)", 4405);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4406);
var elem,
                        unmatched = matcher( seed, null, xml, [] ),
                        i = seed.length;

                    // Match elements unmatched by `matcher`
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4411);
while ( i-- ) {
                        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4412);
if ( (elem = unmatched[i]) ) {
                            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4413);
seed[i] = !(matches[i] = elem);
                        }
                    }
                }) :
                function( elem, context, xml ) {
                    _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", ")", 4417);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4418);
input[0] = elem;
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4419);
matcher( input, null, xml, results );
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4420);
return !results.pop();
                };
        }),

        "has": markFunction(function( selector ) {
            _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 83)", 4424);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4425);
return function( elem ) {
                _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 84)", 4425);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4426);
return Sizzle( selector, elem ).length > 0;
            };
        }),

        "contains": markFunction(function( text ) {
            _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 85)", 4430);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4431);
return function( elem ) {
                _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 86)", 4431);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4432);
return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
            };
        }),

        "enabled": function( elem ) {
            _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "\"enabled\"", 4436);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4437);
return elem.disabled === false;
        },

        "disabled": function( elem ) {
            _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "\"disabled\"", 4440);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4441);
return elem.disabled === true;
        },

        "checked": function( elem ) {
            // In CSS3, :checked should return both checked and selected elements
            // http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
            _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "\"checked\"", 4444);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4447);
var nodeName = elem.nodeName.toLowerCase();
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4448);
return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
        },

        "selected": function( elem ) {
            // Accessing this property makes selected-by-default
            // options in Safari work properly
            _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "\"selected\"", 4451);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4454);
if ( elem.parentNode ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4455);
elem.parentNode.selectedIndex;
            }

            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4458);
return elem.selected === true;
        },

        "parent": function( elem ) {
            _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "\"parent\"", 4461);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4462);
return !Expr.pseudos["empty"]( elem );
        },

        "empty": function( elem ) {
            // http://www.w3.org/TR/selectors/#empty-pseudo
            // :empty is only affected by element nodes and content nodes(including text(3), cdata(4)),
            //   not comment, processing instructions, or others
            // Thanks to Diego Perini for the nodeName shortcut
            //   Greater than "@" means alpha characters (specifically not starting with "#" or "?")
            _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "\"empty\"", 4465);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4471);
var nodeType;
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4472);
elem = elem.firstChild;
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4473);
while ( elem ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4474);
if ( elem.nodeName > "@" || (nodeType = elem.nodeType) === 3 || nodeType === 4 ) {
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4475);
return false;
                }
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4477);
elem = elem.nextSibling;
            }
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4479);
return true;
        },

        "header": function( elem ) {
            _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "\"header\"", 4482);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4483);
return rheader.test( elem.nodeName );
        },

        "text": function( elem ) {
            _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "\"text\"", 4486);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4487);
var type, attr;
            // IE6 and 7 will map elem.type to 'text' for new HTML5 types (search, etc)
            // use getAttribute instead to test this case
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4490);
return elem.nodeName.toLowerCase() === "input" &&
                (type = elem.type) === "text" &&
                ( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === type );
        },

        // Input types
        "radio": createInputPseudo("radio"),
        "checkbox": createInputPseudo("checkbox"),
        "file": createInputPseudo("file"),
        "password": createInputPseudo("password"),
        "image": createInputPseudo("image"),

        "submit": createButtonPseudo("submit"),
        "reset": createButtonPseudo("reset"),

        "button": function( elem ) {
            _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "\"button\"", 4505);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4506);
var name = elem.nodeName.toLowerCase();
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4507);
return name === "input" && elem.type === "button" || name === "button";
        },

        "input": function( elem ) {
            _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "\"input\"", 4510);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4511);
return rinputs.test( elem.nodeName );
        },

        "focus": function( elem ) {
            _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "\"focus\"", 4514);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4515);
var doc = elem.ownerDocument;
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4516);
return elem === doc.activeElement && (!doc.hasFocus || doc.hasFocus()) && !!(elem.type || elem.href);
        },

        "active": function( elem ) {
            _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "\"active\"", 4519);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4520);
return elem === elem.ownerDocument.activeElement;
        },

        // Positional types
        "first": createPositionalPseudo(function( matchIndexes, length, argument ) {
            _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 87)", 4524);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4525);
return [ 0 ];
        }),

        "last": createPositionalPseudo(function( matchIndexes, length, argument ) {
            _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 88)", 4528);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4529);
return [ length - 1 ];
        }),

        "eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
            _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 89)", 4532);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4533);
return [ argument < 0 ? argument + length : argument ];
        }),

        "even": createPositionalPseudo(function( matchIndexes, length, argument ) {
            _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 90)", 4536);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4537);
for ( var i = 0; i < length; i += 2 ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4538);
matchIndexes.push( i );
            }
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4540);
return matchIndexes;
        }),

        "odd": createPositionalPseudo(function( matchIndexes, length, argument ) {
            _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 91)", 4543);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4544);
for ( var i = 1; i < length; i += 2 ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4545);
matchIndexes.push( i );
            }
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4547);
return matchIndexes;
        }),

        "lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
            _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 92)", 4550);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4551);
for ( var i = argument < 0 ? argument + length : argument; --i >= 0; ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4552);
matchIndexes.push( i );
            }
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4554);
return matchIndexes;
        }),

        "gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
            _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 93)", 4557);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4558);
for ( var i = argument < 0 ? argument + length : argument; ++i < length; ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4559);
matchIndexes.push( i );
            }
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4561);
return matchIndexes;
        })
    }
};

_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4566);
function siblingCheck( a, b, ret ) {
    _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "siblingCheck", 4566);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4567);
if ( a === b ) {
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4568);
return ret;
    }

    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4571);
var cur = a.nextSibling;

    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4573);
while ( cur ) {
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4574);
if ( cur === b ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4575);
return -1;
        }

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4578);
cur = cur.nextSibling;
    }

    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4581);
return 1;
}

_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4584);
sortOrder = docElem.compareDocumentPosition ?
    function( a, b ) {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 94)", 4585);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4586);
if ( a === b ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4587);
hasDuplicate = true;
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4588);
return 0;
        }

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4591);
return ( !a.compareDocumentPosition || !b.compareDocumentPosition ?
            a.compareDocumentPosition :
            a.compareDocumentPosition(b) & 4
        ) ? -1 : 1;
    } :
    function( a, b ) {
        // The nodes are identical, we can exit early
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "}", 4596);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4598);
if ( a === b ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4599);
hasDuplicate = true;
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4600);
return 0;

        // Fallback to using sourceIndex (in IE) if it's available on both nodes
        } else {_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4603);
if ( a.sourceIndex && b.sourceIndex ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4604);
return a.sourceIndex - b.sourceIndex;
        }}

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4607);
var al, bl,
            ap = [],
            bp = [],
            aup = a.parentNode,
            bup = b.parentNode,
            cur = aup;

        // If the nodes are siblings (or identical) we can do a quick check
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4615);
if ( aup === bup ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4616);
return siblingCheck( a, b );

        // If no parents were found then the nodes are disconnected
        } else {_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4619);
if ( !aup ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4620);
return -1;

        } else {_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4622);
if ( !bup ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4623);
return 1;
        }}}

        // Otherwise they're somewhere else in the tree so we need
        // to build up a full list of the parentNodes for comparison
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4628);
while ( cur ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4629);
ap.unshift( cur );
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4630);
cur = cur.parentNode;
        }

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4633);
cur = bup;

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4635);
while ( cur ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4636);
bp.unshift( cur );
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4637);
cur = cur.parentNode;
        }

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4640);
al = ap.length;
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4641);
bl = bp.length;

        // Start walking down the tree looking for a discrepancy
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4644);
for ( var i = 0; i < al && i < bl; i++ ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4645);
if ( ap[i] !== bp[i] ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4646);
return siblingCheck( ap[i], bp[i] );
            }
        }

        // We ended someplace up the tree so do a sibling check
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4651);
return i === al ?
            siblingCheck( a, bp[i], -1 ) :
            siblingCheck( ap[i], b, 1 );
    };

// Always assume the presence of duplicates if sort doesn't
// pass them to our comparison function (as in Google Chrome).
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4658);
[0, 0].sort( sortOrder );
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4659);
baseHasDuplicate = !hasDuplicate;

// Document sorting and removing duplicates
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4662);
Sizzle.uniqueSort = function( results ) {
    _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "uniqueSort", 4662);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4663);
var elem,
        i = 1;

    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4666);
hasDuplicate = baseHasDuplicate;
    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4667);
results.sort( sortOrder );

    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4669);
if ( hasDuplicate ) {
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4670);
for ( ; (elem = results[i]); i++ ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4671);
if ( elem === results[ i - 1 ] ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4672);
results.splice( i--, 1 );
            }
        }
    }

    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4677);
return results;
};

_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4680);
Sizzle.error = function( msg ) {
    _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "error", 4680);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4681);
throw new Error( "Syntax error, unrecognized expression: " + msg );
};

_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4684);
function tokenize( selector, parseOnly ) {
    _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "tokenize", 4684);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4685);
var matched, match, tokens, type, soFar, groups, preFilters,
        cached = tokenCache[ expando ][ selector ];

    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4688);
if ( cached ) {
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4689);
return parseOnly ? 0 : cached.slice( 0 );
    }

    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4692);
soFar = selector;
    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4693);
groups = [];
    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4694);
preFilters = Expr.preFilter;

    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4696);
while ( soFar ) {

        // Comma and first run
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4699);
if ( !matched || (match = rcomma.exec( soFar )) ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4700);
if ( match ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4701);
soFar = soFar.slice( match[0].length );
            }
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4703);
groups.push( tokens = [] );
        }

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4706);
matched = false;

        // Combinators
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4709);
if ( (match = rcombinators.exec( soFar )) ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4710);
tokens.push( matched = new Token( match.shift() ) );
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4711);
soFar = soFar.slice( matched.length );

            // Cast descendant combinators to space
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4714);
matched.type = match[0].replace( rtrim, " " );
        }

        // Filters
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4718);
for ( type in Expr.filter ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4719);
if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
                // The last two arguments here are (context, xml) for backCompat
                (match = preFilters[ type ]( match, document, true ))) ) {

                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4723);
tokens.push( matched = new Token( match.shift() ) );
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4724);
soFar = soFar.slice( matched.length );
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4725);
matched.type = type;
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4726);
matched.matches = match;
            }
        }

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4730);
if ( !matched ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4731);
break;
        }
    }

    // Return the length of the invalid excess
    // if we're just parsing
    // Otherwise, throw an error or return tokens
    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4738);
return parseOnly ?
        soFar.length :
        soFar ?
            Sizzle.error( selector ) :
            // Cache the tokens
            tokenCache( selector, groups ).slice( 0 );
}

_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4746);
function addCombinator( matcher, combinator, base ) {
    _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "addCombinator", 4746);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4747);
var dir = combinator.dir,
        checkNonElements = base && combinator.dir === "parentNode",
        doneName = done++;

    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4751);
return combinator.first ?
        // Check against closest ancestor/preceding element
        function( elem, context, xml ) {
            _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 95)", 4753);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4754);
while ( (elem = elem[ dir ]) ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4755);
if ( checkNonElements || elem.nodeType === 1  ) {
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4756);
return matcher( elem, context, xml );
                }
            }
        } :

        // Check against all ancestor/preceding elements
        function( elem, context, xml ) {
            // We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
            _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "}", 4762);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4764);
if ( !xml ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4765);
var cache,
                    dirkey = dirruns + " " + doneName + " ",
                    cachedkey = dirkey + cachedruns;
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4768);
while ( (elem = elem[ dir ]) ) {
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4769);
if ( checkNonElements || elem.nodeType === 1 ) {
                        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4770);
if ( (cache = elem[ expando ]) === cachedkey ) {
                            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4771);
return elem.sizset;
                        } else {_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4772);
if ( typeof cache === "string" && cache.indexOf(dirkey) === 0 ) {
                            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4773);
if ( elem.sizset ) {
                                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4774);
return elem;
                            }
                        } else {
                            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4777);
elem[ expando ] = cachedkey;
                            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4778);
if ( matcher( elem, context, xml ) ) {
                                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4779);
elem.sizset = true;
                                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4780);
return elem;
                            }
                            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4782);
elem.sizset = false;
                        }}
                    }
                }
            } else {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4787);
while ( (elem = elem[ dir ]) ) {
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4788);
if ( checkNonElements || elem.nodeType === 1 ) {
                        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4789);
if ( matcher( elem, context, xml ) ) {
                            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4790);
return elem;
                        }
                    }
                }
            }
        };
}

_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4798);
function elementMatcher( matchers ) {
    _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "elementMatcher", 4798);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4799);
return matchers.length > 1 ?
        function( elem, context, xml ) {
            _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 96)", 4800);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4801);
var i = matchers.length;
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4802);
while ( i-- ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4803);
if ( !matchers[i]( elem, context, xml ) ) {
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4804);
return false;
                }
            }
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4807);
return true;
        } :
        matchers[0];
}

_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4812);
function condense( unmatched, map, filter, context, xml ) {
    _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "condense", 4812);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4813);
var elem,
        newUnmatched = [],
        i = 0,
        len = unmatched.length,
        mapped = map != null;

    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4819);
for ( ; i < len; i++ ) {
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4820);
if ( (elem = unmatched[i]) ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4821);
if ( !filter || filter( elem, context, xml ) ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4822);
newUnmatched.push( elem );
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4823);
if ( mapped ) {
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4824);
map.push( i );
                }
            }
        }
    }

    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4830);
return newUnmatched;
}

_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4833);
function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
    _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "setMatcher", 4833);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4834);
if ( postFilter && !postFilter[ expando ] ) {
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4835);
postFilter = setMatcher( postFilter );
    }
    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4837);
if ( postFinder && !postFinder[ expando ] ) {
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4838);
postFinder = setMatcher( postFinder, postSelector );
    }
    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4840);
return markFunction(function( seed, results, context, xml ) {
        // Positional selectors apply to seed elements, so it is invalid to follow them with relative ones
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 97)", 4840);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4842);
if ( seed && postFinder ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4843);
return;
        }

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4846);
var i, elem, postFilterIn,
            preMap = [],
            postMap = [],
            preexisting = results.length,

            // Get initial elements from seed or context
            elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [], seed ),

            // Prefilter to get matcher input, preserving a map for seed-results synchronization
            matcherIn = preFilter && ( seed || !selector ) ?
                condense( elems, preMap, preFilter, context, xml ) :
                elems,

            matcherOut = matcher ?
                // If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
                postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

                    // ...intermediate processing is necessary
                    [] :

                    // ...otherwise use results directly
                    results :
                matcherIn;

        // Find primary matches
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4871);
if ( matcher ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4872);
matcher( matcherIn, matcherOut, context, xml );
        }

        // Apply postFilter
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4876);
if ( postFilter ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4877);
postFilterIn = condense( matcherOut, postMap );
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4878);
postFilter( postFilterIn, [], context, xml );

            // Un-match failing elements by moving them back to matcherIn
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4881);
i = postFilterIn.length;
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4882);
while ( i-- ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4883);
if ( (elem = postFilterIn[i]) ) {
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4884);
matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
                }
            }
        }

        // Keep seed and results synchronized
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4890);
if ( seed ) {
            // Ignore postFinder because it can't coexist with seed
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4892);
i = preFilter && matcherOut.length;
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4893);
while ( i-- ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4894);
if ( (elem = matcherOut[i]) ) {
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4895);
seed[ preMap[i] ] = !(results[ preMap[i] ] = elem);
                }
            }
        } else {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4899);
matcherOut = condense(
                matcherOut === results ?
                    matcherOut.splice( preexisting, matcherOut.length ) :
                    matcherOut
            );
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4904);
if ( postFinder ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4905);
postFinder( null, results, matcherOut, xml );
            } else {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4907);
push.apply( results, matcherOut );
            }
        }
    });
}

_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4913);
function matcherFromTokens( tokens ) {
    _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "matcherFromTokens", 4913);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4914);
var checkContext, matcher, j,
        len = tokens.length,
        leadingRelative = Expr.relative[ tokens[0].type ],
        implicitRelative = leadingRelative || Expr.relative[" "],
        i = leadingRelative ? 1 : 0,

        // The foundational matcher ensures that elements are reachable from top-level context(s)
        matchContext = addCombinator( function( elem ) {
            _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 98)", 4921);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4922);
return elem === checkContext;
        }, implicitRelative, true ),
        matchAnyContext = addCombinator( function( elem ) {
            _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 99)", 4924);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4925);
return indexOf.call( checkContext, elem ) > -1;
        }, implicitRelative, true ),
        matchers = [ function( elem, context, xml ) {
            _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 100)", 4927);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4928);
return ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
                (checkContext = context).nodeType ?
                    matchContext( elem, context, xml ) :
                    matchAnyContext( elem, context, xml ) );
        } ];

    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4934);
for ( ; i < len; i++ ) {
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4935);
if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4936);
matchers = [ addCombinator( elementMatcher( matchers ), matcher ) ];
        } else {
            // The concatenated values are (context, xml) for backCompat
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4939);
matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

            // Return special upon seeing a positional matcher
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4942);
if ( matcher[ expando ] ) {
                // Find the next relative operator (if any) for proper handling
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4944);
j = ++i;
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4945);
for ( ; j < len; j++ ) {
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4946);
if ( Expr.relative[ tokens[j].type ] ) {
                        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4947);
break;
                    }
                }
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4950);
return setMatcher(
                    i > 1 && elementMatcher( matchers ),
                    i > 1 && tokens.slice( 0, i - 1 ).join("").replace( rtrim, "$1" ),
                    matcher,
                    i < j && matcherFromTokens( tokens.slice( i, j ) ),
                    j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
                    j < len && tokens.join("")
                );
            }
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4959);
matchers.push( matcher );
        }
    }

    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4963);
return elementMatcher( matchers );
}

_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4966);
function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
    _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "matcherFromGroupMatchers", 4966);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4967);
var bySet = setMatchers.length > 0,
        byElement = elementMatchers.length > 0,
        superMatcher = function( seed, context, xml, results, expandContext ) {
            _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "superMatcher", 4969);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4970);
var elem, j, matcher,
                setMatched = [],
                matchedCount = 0,
                i = "0",
                unmatched = seed && [],
                outermost = expandContext != null,
                contextBackup = outermostContext,
                // We must always have either seed elements or context
                elems = seed || byElement && Expr.find["TAG"]( "*", expandContext && context.parentNode || context ),
                // Nested matchers should use non-integer dirruns
                dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.E);

            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4982);
if ( outermost ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4983);
outermostContext = context !== document && context;
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4984);
cachedruns = superMatcher.el;
            }

            // Add elements passing elementMatchers directly to results
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4988);
for ( ; (elem = elems[i]) != null; i++ ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4989);
if ( byElement && elem ) {
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4990);
for ( j = 0; (matcher = elementMatchers[j]); j++ ) {
                        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4991);
if ( matcher( elem, context, xml ) ) {
                            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4992);
results.push( elem );
                            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4993);
break;
                        }
                    }
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4996);
if ( outermost ) {
                        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4997);
dirruns = dirrunsUnique;
                        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 4998);
cachedruns = ++superMatcher.el;
                    }
                }

                // Track unmatched elements for set filters
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5003);
if ( bySet ) {
                    // They will have gone through all possible matchers
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5005);
if ( (elem = !matcher && elem) ) {
                        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5006);
matchedCount--;
                    }

                    // Lengthen the array for every element, matched or not
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5010);
if ( seed ) {
                        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5011);
unmatched.push( elem );
                    }
                }
            }

            // Apply set filters to unmatched elements
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5017);
matchedCount += i;
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5018);
if ( bySet && i !== matchedCount ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5019);
for ( j = 0; (matcher = setMatchers[j]); j++ ) {
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5020);
matcher( unmatched, setMatched, context, xml );
                }

                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5023);
if ( seed ) {
                    // Reintegrate element matches to eliminate the need for sorting
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5025);
if ( matchedCount > 0 ) {
                        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5026);
while ( i-- ) {
                            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5027);
if ( !(unmatched[i] || setMatched[i]) ) {
                                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5028);
setMatched[i] = pop.call( results );
                            }
                        }
                    }

                    // Discard index placeholder values to get only actual matches
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5034);
setMatched = condense( setMatched );
                }

                // Add matches to results
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5038);
push.apply( results, setMatched );

                // Seedless set matches succeeding multiple successful matchers stipulate sorting
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5041);
if ( outermost && !seed && setMatched.length > 0 &&
                    ( matchedCount + setMatchers.length ) > 1 ) {

                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5044);
Sizzle.uniqueSort( results );
                }
            }

            // Override manipulation of globals by nested matchers
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5049);
if ( outermost ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5050);
dirruns = dirrunsUnique;
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5051);
outermostContext = contextBackup;
            }

            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5054);
return unmatched;
        };

    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5057);
superMatcher.el = 0;
    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5058);
return bySet ?
        markFunction( superMatcher ) :
        superMatcher;
}

_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5063);
compile = Sizzle.compile = function( selector, group /* Internal Use Only */ ) {
    _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "compile", 5063);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5064);
var i,
        setMatchers = [],
        elementMatchers = [],
        cached = compilerCache[ expando ][ selector ];

    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5069);
if ( !cached ) {
        // Generate a function of recursive functions that can be used to check each element
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5071);
if ( !group ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5072);
group = tokenize( selector );
        }
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5074);
i = group.length;
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5075);
while ( i-- ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5076);
cached = matcherFromTokens( group[i] );
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5077);
if ( cached[ expando ] ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5078);
setMatchers.push( cached );
            } else {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5080);
elementMatchers.push( cached );
            }
        }

        // Cache the compiled function
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5085);
cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );
    }
    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5087);
return cached;
};

_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5090);
function multipleContexts( selector, contexts, results, seed ) {
    _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "multipleContexts", 5090);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5091);
var i = 0,
        len = contexts.length;
    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5093);
for ( ; i < len; i++ ) {
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5094);
Sizzle( selector, contexts[i], results, seed );
    }
    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5096);
return results;
}

_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5099);
function select( selector, context, results, seed, xml ) {
    _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "select", 5099);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5100);
var i, tokens, token, type, find,
        match = tokenize( selector ),
        j = match.length;

    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5104);
if ( !seed ) {
        // Try to minimize operations if there is only one group
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5106);
if ( match.length === 1 ) {

            // Take a shortcut and set the context if the root selector is an ID
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5109);
tokens = match[0] = match[0].slice( 0 );
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5110);
if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
                    context.nodeType === 9 && !xml &&
                    Expr.relative[ tokens[1].type ] ) {

                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5114);
context = Expr.find["ID"]( token.matches[0].replace( rbackslash, "" ), context, xml )[0];
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5115);
if ( !context ) {
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5116);
return results;
                }

                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5119);
selector = selector.slice( tokens.shift().length );
            }

            // Fetch a seed set for right-to-left matching
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5123);
for ( i = matchExpr["POS"].test( selector ) ? -1 : tokens.length - 1; i >= 0; i-- ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5124);
token = tokens[i];

                // Abort if we hit a combinator
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5127);
if ( Expr.relative[ (type = token.type) ] ) {
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5128);
break;
                }
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5130);
if ( (find = Expr.find[ type ]) ) {
                    // Search, expanding context for leading sibling combinators
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5132);
if ( (seed = find(
                        token.matches[0].replace( rbackslash, "" ),
                        rsibling.test( tokens[0].type ) && context.parentNode || context,
                        xml
                    )) ) {

                        // If seed is empty or no tokens remain, we can return early
                        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5139);
tokens.splice( i, 1 );
                        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5140);
selector = seed.length && tokens.join("");
                        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5141);
if ( !selector ) {
                            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5142);
push.apply( results, slice.call( seed, 0 ) );
                            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5143);
return results;
                        }

                        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5146);
break;
                    }
                }
            }
        }
    }

    // Compile and execute a filtering function
    // Provide `match` to avoid retokenization if we modified the selector above
    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5155);
compile( selector, match )(
        seed,
        context,
        xml,
        results,
        rsibling.test( selector )
    );
    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5162);
return results;
}

_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5165);
if ( document.querySelectorAll ) {
    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5166);
(function() {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 101)", 5166);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5167);
var disconnectedMatch,
            oldSelect = select,
            rescape = /'|\\/g,
            rattributeQuotes = /\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g,

            // qSa(:focus) reports false when true (Chrome 21),
            // A support test would require too much code (would include document ready)
            rbuggyQSA = [":focus"],

            // matchesSelector(:focus) reports false when true (Chrome 21),
            // matchesSelector(:active) reports false when true (IE9/Opera 11.5)
            // A support test would require too much code (would include document ready)
            // just skip matchesSelector for :active
            rbuggyMatches = [ ":active", ":focus" ],
            matches = docElem.matchesSelector ||
                docElem.mozMatchesSelector ||
                docElem.webkitMatchesSelector ||
                docElem.oMatchesSelector ||
                docElem.msMatchesSelector;

        // Build QSA regex
        // Regex strategy adopted from Diego Perini
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5189);
assert(function( div ) {
            // Select is set to empty string on purpose
            // This is to test IE's treatment of not explictly
            // setting a boolean content attribute,
            // since its presence should be enough
            // http://bugs.jquery.com/ticket/12359
            _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 102)", 5189);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5195);
div.innerHTML = "<select><option selected=''></option></select>";

            // IE8 - Some boolean attributes are not treated correctly
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5198);
if ( !div.querySelectorAll("[selected]").length ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5199);
rbuggyQSA.push( "\\[" + whitespace + "*(?:checked|disabled|ismap|multiple|readonly|selected|value)" );
            }

            // Webkit/Opera - :checked should return selected option elements
            // http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
            // IE8 throws error here (do not put tests after this one)
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5205);
if ( !div.querySelectorAll(":checked").length ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5206);
rbuggyQSA.push(":checked");
            }
        });

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5210);
assert(function( div ) {

            // Opera 10-12/IE9 - ^= $= *= and empty values
            // Should not select anything
            _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 103)", 5210);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5214);
div.innerHTML = "<p test=''></p>";
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5215);
if ( div.querySelectorAll("[test^='']").length ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5216);
rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:\"\"|'')" );
            }

            // FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
            // IE8 throws error here (do not put tests after this one)
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5221);
div.innerHTML = "<input type='hidden'/>";
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5222);
if ( !div.querySelectorAll(":enabled").length ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5223);
rbuggyQSA.push(":enabled", ":disabled");
            }
        });

        // rbuggyQSA always contains :focus, so no need for a length check
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5228);
rbuggyQSA = /* rbuggyQSA.length && */ new RegExp( rbuggyQSA.join("|") );

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5230);
select = function( selector, context, results, seed, xml ) {
            // Only use querySelectorAll when not filtering,
            // when this is not xml,
            // and when no QSA bugs apply
            _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "select", 5230);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5234);
if ( !seed && !xml && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5235);
var groups, i,
                    old = true,
                    nid = expando,
                    newContext = context,
                    newSelector = context.nodeType === 9 && selector;

                // qSA works strangely on Element-rooted queries
                // We can work around this by specifying an extra ID on the root
                // and working up from there (Thanks to Andrew Dupont for the technique)
                // IE 8 doesn't work on object elements
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5245);
if ( context.nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5246);
groups = tokenize( selector );

                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5248);
if ( (old = context.getAttribute("id")) ) {
                        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5249);
nid = old.replace( rescape, "\\$&" );
                    } else {
                        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5251);
context.setAttribute( "id", nid );
                    }
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5253);
nid = "[id='" + nid + "'] ";

                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5255);
i = groups.length;
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5256);
while ( i-- ) {
                        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5257);
groups[i] = nid + groups[i].join("");
                    }
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5259);
newContext = rsibling.test( selector ) && context.parentNode || context;
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5260);
newSelector = groups.join(",");
                }

                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5263);
if ( newSelector ) {
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5264);
try {
                        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5265);
push.apply( results, slice.call( newContext.querySelectorAll(
                            newSelector
                        ), 0 ) );
                        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5268);
return results;
                    } catch(qsaError) {
                    } finally {
                        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5271);
if ( !old ) {
                            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5272);
context.removeAttribute("id");
                        }
                    }
                }
            }

            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5278);
return oldSelect( selector, context, results, seed, xml );
        };

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5281);
if ( matches ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5282);
assert(function( div ) {
                // Check to see if it's possible to do matchesSelector
                // on a disconnected node (IE 9)
                _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 104)", 5282);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5285);
disconnectedMatch = matches.call( div, "div" );

                // This should fail with an exception
                // Gecko does not error, returns false instead
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5289);
try {
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5290);
matches.call( div, "[test!='']:sizzle" );
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5291);
rbuggyMatches.push( "!=", pseudos );
                } catch ( e ) {}
            });

            // rbuggyMatches always contains :active and :focus, so no need for a length check
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5296);
rbuggyMatches = /* rbuggyMatches.length && */ new RegExp( rbuggyMatches.join("|") );

            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5298);
Sizzle.matchesSelector = function( elem, expr ) {
                // Make sure that attribute selectors are quoted
                _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "matchesSelector", 5298);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5300);
expr = expr.replace( rattributeQuotes, "='$1']" );

                // rbuggyMatches always contains :active, so no need for an existence check
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5303);
if ( !isXML( elem ) && !rbuggyMatches.test( expr ) && (!rbuggyQSA || !rbuggyQSA.test( expr )) ) {
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5304);
try {
                        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5305);
var ret = matches.call( elem, expr );

                        // IE 9's matchesSelector returns false on disconnected nodes
                        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5308);
if ( ret || disconnectedMatch ||
                                // As well, disconnected nodes are said to be in a document
                                // fragment in IE 9
                                elem.document && elem.document.nodeType !== 11 ) {
                            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5312);
return ret;
                        }
                    } catch(e) {}
                }

                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5317);
return Sizzle( expr, null, null, [ elem ] ).length > 0;
            };
        }
    })();
}

// Deprecated
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5324);
Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Back-compat
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5327);
function setFilters() {}
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5328);
Expr.filters = setFilters.prototype = Expr.pseudos;
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5329);
Expr.setFilters = new setFilters();

// Override sizzle attribute retrieval
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5332);
Sizzle.attr = jQuery.attr;
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5333);
jQuery.find = Sizzle;
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5334);
jQuery.expr = Sizzle.selectors;
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5335);
jQuery.expr[":"] = jQuery.expr.pseudos;
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5336);
jQuery.unique = Sizzle.uniqueSort;
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5337);
jQuery.text = Sizzle.getText;
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5338);
jQuery.isXMLDoc = Sizzle.isXML;
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5339);
jQuery.contains = Sizzle.contains;


})( window );
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5343);
var runtil = /Until$/,
    rparentsprev = /^(?:parents|prev(?:Until|All))/,
    isSimple = /^.[^:#\[\.,]*$/,
    rneedsContext = jQuery.expr.match.needsContext,
    // methods guaranteed to produce a unique set when starting from a unique set
    guaranteedUnique = {
        children: true,
        contents: true,
        next: true,
        prev: true
    };

_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5355);
jQuery.fn.extend({
    find: function( selector ) {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "find", 5356);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5357);
var i, l, length, n, r, ret,
            self = this;

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5360);
if ( typeof selector !== "string" ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5361);
return jQuery( selector ).filter(function() {
                _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 105)", 5361);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5362);
for ( i = 0, l = self.length; i < l; i++ ) {
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5363);
if ( jQuery.contains( self[ i ], this ) ) {
                        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5364);
return true;
                    }
                }
            });
        }

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5370);
ret = this.pushStack( "", "find", selector );

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5372);
for ( i = 0, l = this.length; i < l; i++ ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5373);
length = ret.length;
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5374);
jQuery.find( selector, this[i], ret );

            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5376);
if ( i > 0 ) {
                // Make sure that the results are unique
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5378);
for ( n = length; n < ret.length; n++ ) {
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5379);
for ( r = 0; r < length; r++ ) {
                        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5380);
if ( ret[r] === ret[n] ) {
                            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5381);
ret.splice(n--, 1);
                            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5382);
break;
                        }
                    }
                }
            }
        }

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5389);
return ret;
    },

    has: function( target ) {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "has", 5392);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5393);
var i,
            targets = jQuery( target, this ),
            len = targets.length;

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5397);
return this.filter(function() {
            _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 106)", 5397);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5398);
for ( i = 0; i < len; i++ ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5399);
if ( jQuery.contains( this, targets[i] ) ) {
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5400);
return true;
                }
            }
        });
    },

    not: function( selector ) {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "not", 5406);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5407);
return this.pushStack( winnow(this, selector, false), "not", selector);
    },

    filter: function( selector ) {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "filter", 5410);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5411);
return this.pushStack( winnow(this, selector, true), "filter", selector );
    },

    is: function( selector ) {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "is", 5414);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5415);
return !!selector && (
            typeof selector === "string" ?
                // If this is a positional/relative selector, check membership in the returned set
                // so $("p:first").is("p:last") won't return true for a doc with two "p".
                rneedsContext.test( selector ) ?
                    jQuery( selector, this.context ).index( this[0] ) >= 0 :
                    jQuery.filter( selector, this ).length > 0 :
                this.filter( selector ).length > 0 );
    },

    closest: function( selectors, context ) {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "closest", 5425);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5426);
var cur,
            i = 0,
            l = this.length,
            ret = [],
            pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
                jQuery( selectors, context || this.context ) :
                0;

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5434);
for ( ; i < l; i++ ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5435);
cur = this[i];

            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5437);
while ( cur && cur.ownerDocument && cur !== context && cur.nodeType !== 11 ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5438);
if ( pos ? pos.index(cur) > -1 : jQuery.find.matchesSelector(cur, selectors) ) {
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5439);
ret.push( cur );
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5440);
break;
                }
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5442);
cur = cur.parentNode;
            }
        }

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5446);
ret = ret.length > 1 ? jQuery.unique( ret ) : ret;

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5448);
return this.pushStack( ret, "closest", selectors );
    },

    // Determine the position of an element within
    // the matched set of elements
    index: function( elem ) {

        // No argument, return index in parent
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "index", 5453);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5456);
if ( !elem ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5457);
return ( this[0] && this[0].parentNode ) ? this.prevAll().length : -1;
        }

        // index in selector
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5461);
if ( typeof elem === "string" ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5462);
return jQuery.inArray( this[0], jQuery( elem ) );
        }

        // Locate the position of the desired element
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5466);
return jQuery.inArray(
            // If it receives a jQuery object, the first element is used
            elem.jquery ? elem[0] : elem, this );
    },

    add: function( selector, context ) {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "add", 5471);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5472);
var set = typeof selector === "string" ?
                jQuery( selector, context ) :
                jQuery.makeArray( selector && selector.nodeType ? [ selector ] : selector ),
            all = jQuery.merge( this.get(), set );

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5477);
return this.pushStack( isDisconnected( set[0] ) || isDisconnected( all[0] ) ?
            all :
            jQuery.unique( all ) );
    },

    addBack: function( selector ) {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "addBack", 5482);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5483);
return this.add( selector == null ?
            this.prevObject : this.prevObject.filter(selector)
        );
    }
});

_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5489);
jQuery.fn.andSelf = jQuery.fn.addBack;

// A painfully simple check to see if an element is disconnected
// from a document (should be improved, where feasible).
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5493);
function isDisconnected( node ) {
    _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "isDisconnected", 5493);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5494);
return !node || !node.parentNode || node.parentNode.nodeType === 11;
}

_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5497);
function sibling( cur, dir ) {
    _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "sibling", 5497);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5498);
do {
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5499);
cur = cur[ dir ];
    }while ( cur && cur.nodeType !== 1 );

    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5502);
return cur;
}

_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5505);
jQuery.each({
    parent: function( elem ) {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "parent", 5506);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5507);
var parent = elem.parentNode;
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5508);
return parent && parent.nodeType !== 11 ? parent : null;
    },
    parents: function( elem ) {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "parents", 5510);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5511);
return jQuery.dir( elem, "parentNode" );
    },
    parentsUntil: function( elem, i, until ) {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "parentsUntil", 5513);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5514);
return jQuery.dir( elem, "parentNode", until );
    },
    next: function( elem ) {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "next", 5516);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5517);
return sibling( elem, "nextSibling" );
    },
    prev: function( elem ) {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "prev", 5519);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5520);
return sibling( elem, "previousSibling" );
    },
    nextAll: function( elem ) {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "nextAll", 5522);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5523);
return jQuery.dir( elem, "nextSibling" );
    },
    prevAll: function( elem ) {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "prevAll", 5525);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5526);
return jQuery.dir( elem, "previousSibling" );
    },
    nextUntil: function( elem, i, until ) {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "nextUntil", 5528);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5529);
return jQuery.dir( elem, "nextSibling", until );
    },
    prevUntil: function( elem, i, until ) {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "prevUntil", 5531);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5532);
return jQuery.dir( elem, "previousSibling", until );
    },
    siblings: function( elem ) {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "siblings", 5534);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5535);
return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
    },
    children: function( elem ) {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "children", 5537);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5538);
return jQuery.sibling( elem.firstChild );
    },
    contents: function( elem ) {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "contents", 5540);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5541);
return jQuery.nodeName( elem, "iframe" ) ?
            elem.contentDocument || elem.contentWindow.document :
            jQuery.merge( [], elem.childNodes );
    }
}, function( name, fn ) {
    _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 107)", 5545);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5546);
jQuery.fn[ name ] = function( until, selector ) {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "]", 5546);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5547);
var ret = jQuery.map( this, fn, until );

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5549);
if ( !runtil.test( name ) ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5550);
selector = until;
        }

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5553);
if ( selector && typeof selector === "string" ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5554);
ret = jQuery.filter( selector, ret );
        }

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5557);
ret = this.length > 1 && !guaranteedUnique[ name ] ? jQuery.unique( ret ) : ret;

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5559);
if ( this.length > 1 && rparentsprev.test( name ) ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5560);
ret = ret.reverse();
        }

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5563);
return this.pushStack( ret, name, core_slice.call( arguments ).join(",") );
    };
});

_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5567);
jQuery.extend({
    filter: function( expr, elems, not ) {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "filter", 5568);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5569);
if ( not ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5570);
expr = ":not(" + expr + ")";
        }

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5573);
return elems.length === 1 ?
            jQuery.find.matchesSelector(elems[0], expr) ? [ elems[0] ] : [] :
            jQuery.find.matches(expr, elems);
    },

    dir: function( elem, dir, until ) {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "dir", 5578);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5579);
var matched = [],
            cur = elem[ dir ];

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5582);
while ( cur && cur.nodeType !== 9 && (until === undefined || cur.nodeType !== 1 || !jQuery( cur ).is( until )) ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5583);
if ( cur.nodeType === 1 ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5584);
matched.push( cur );
            }
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5586);
cur = cur[dir];
        }
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5588);
return matched;
    },

    sibling: function( n, elem ) {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "sibling", 5591);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5592);
var r = [];

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5594);
for ( ; n; n = n.nextSibling ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5595);
if ( n.nodeType === 1 && n !== elem ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5596);
r.push( n );
            }
        }

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5600);
return r;
    }
});

// Implement the identical functionality for filter and not
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5605);
function winnow( elements, qualifier, keep ) {

    // Can't pass null or undefined to indexOf in Firefox 4
    // Set to 0 to skip string check
    _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "winnow", 5605);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5609);
qualifier = qualifier || 0;

    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5611);
if ( jQuery.isFunction( qualifier ) ) {
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5612);
return jQuery.grep(elements, function( elem, i ) {
            _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 108)", 5612);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5613);
var retVal = !!qualifier.call( elem, i, elem );
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5614);
return retVal === keep;
        });

    } else {_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5617);
if ( qualifier.nodeType ) {
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5618);
return jQuery.grep(elements, function( elem, i ) {
            _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 109)", 5618);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5619);
return ( elem === qualifier ) === keep;
        });

    } else {_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5622);
if ( typeof qualifier === "string" ) {
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5623);
var filtered = jQuery.grep(elements, function( elem ) {
            _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 110)", 5623);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5624);
return elem.nodeType === 1;
        });

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5627);
if ( isSimple.test( qualifier ) ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5628);
return jQuery.filter(qualifier, filtered, !keep);
        } else {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5630);
qualifier = jQuery.filter( qualifier, filtered );
        }
    }}}

    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5634);
return jQuery.grep(elements, function( elem, i ) {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 111)", 5634);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5635);
return ( jQuery.inArray( elem, qualifier ) >= 0 ) === keep;
    });
}
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5638);
function createSafeFragment( document ) {
    _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "createSafeFragment", 5638);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5639);
var list = nodeNames.split( "|" ),
    safeFrag = document.createDocumentFragment();

    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5642);
if ( safeFrag.createElement ) {
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5643);
while ( list.length ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5644);
safeFrag.createElement(
                list.pop()
            );
        }
    }
    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5649);
return safeFrag;
}

_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5652);
var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|" +
        "header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
    rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
    rleadingWhitespace = /^\s+/,
    rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
    rtagName = /<([\w:]+)/,
    rtbody = /<tbody/i,
    rhtml = /<|&#?\w+;/,
    rnoInnerhtml = /<(?:script|style|link)/i,
    rnocache = /<(?:script|object|embed|option|style)/i,
    rnoshimcache = new RegExp("<(?:" + nodeNames + ")[\\s/>]", "i"),
    rcheckableType = /^(?:checkbox|radio)$/,
    // checked="checked" or checked
    rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
    rscriptType = /\/(java|ecma)script/i,
    rcleanScript = /^\s*<!(?:\[CDATA\[|\-\-)|[\]\-]{2}>\s*$/g,
    wrapMap = {
        option: [ 1, "<select multiple='multiple'>", "</select>" ],
        legend: [ 1, "<fieldset>", "</fieldset>" ],
        thead: [ 1, "<table>", "</table>" ],
        tr: [ 2, "<table><tbody>", "</tbody></table>" ],
        td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],
        col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
        area: [ 1, "<map>", "</map>" ],
        _default: [ 0, "", "" ]
    },
    safeFragment = createSafeFragment( document ),
    fragmentDiv = safeFragment.appendChild( document.createElement("div") );

_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5681);
wrapMap.optgroup = wrapMap.option;
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5682);
wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5683);
wrapMap.th = wrapMap.td;

// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
// unless wrapped in a div with non-breaking characters in front of it.
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5687);
if ( !jQuery.support.htmlSerialize ) {
    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5688);
wrapMap._default = [ 1, "X<div>", "</div>" ];
}

_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5691);
jQuery.fn.extend({
    text: function( value ) {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "text", 5692);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5693);
return jQuery.access( this, function( value ) {
            _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 112)", 5693);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5694);
return value === undefined ?
                jQuery.text( this ) :
                this.empty().append( ( this[0] && this[0].ownerDocument || document ).createTextNode( value ) );
        }, null, value, arguments.length );
    },

    wrapAll: function( html ) {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "wrapAll", 5700);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5701);
if ( jQuery.isFunction( html ) ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5702);
return this.each(function(i) {
                _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 113)", 5702);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5703);
jQuery(this).wrapAll( html.call(this, i) );
            });
        }

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5707);
if ( this[0] ) {
            // The elements to wrap the target around
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5709);
var wrap = jQuery( html, this[0].ownerDocument ).eq(0).clone(true);

            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5711);
if ( this[0].parentNode ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5712);
wrap.insertBefore( this[0] );
            }

            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5715);
wrap.map(function() {
                _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 114)", 5715);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5716);
var elem = this;

                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5718);
while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5719);
elem = elem.firstChild;
                }

                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5722);
return elem;
            }).append( this );
        }

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5726);
return this;
    },

    wrapInner: function( html ) {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "wrapInner", 5729);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5730);
if ( jQuery.isFunction( html ) ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5731);
return this.each(function(i) {
                _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 115)", 5731);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5732);
jQuery(this).wrapInner( html.call(this, i) );
            });
        }

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5736);
return this.each(function() {
            _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 116)", 5736);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5737);
var self = jQuery( this ),
                contents = self.contents();

            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5740);
if ( contents.length ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5741);
contents.wrapAll( html );

            } else {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5744);
self.append( html );
            }
        });
    },

    wrap: function( html ) {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "wrap", 5749);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5750);
var isFunction = jQuery.isFunction( html );

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5752);
return this.each(function(i) {
            _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 117)", 5752);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5753);
jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
        });
    },

    unwrap: function() {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "unwrap", 5757);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5758);
return this.parent().each(function() {
            _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 118)", 5758);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5759);
if ( !jQuery.nodeName( this, "body" ) ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5760);
jQuery( this ).replaceWith( this.childNodes );
            }
        }).end();
    },

    append: function() {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "append", 5765);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5766);
return this.domManip(arguments, true, function( elem ) {
            _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 119)", 5766);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5767);
if ( this.nodeType === 1 || this.nodeType === 11 ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5768);
this.appendChild( elem );
            }
        });
    },

    prepend: function() {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "prepend", 5773);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5774);
return this.domManip(arguments, true, function( elem ) {
            _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 120)", 5774);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5775);
if ( this.nodeType === 1 || this.nodeType === 11 ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5776);
this.insertBefore( elem, this.firstChild );
            }
        });
    },

    before: function() {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "before", 5781);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5782);
if ( !isDisconnected( this[0] ) ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5783);
return this.domManip(arguments, false, function( elem ) {
                _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 121)", 5783);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5784);
this.parentNode.insertBefore( elem, this );
            });
        }

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5788);
if ( arguments.length ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5789);
var set = jQuery.clean( arguments );
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5790);
return this.pushStack( jQuery.merge( set, this ), "before", this.selector );
        }
    },

    after: function() {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "after", 5794);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5795);
if ( !isDisconnected( this[0] ) ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5796);
return this.domManip(arguments, false, function( elem ) {
                _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 122)", 5796);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5797);
this.parentNode.insertBefore( elem, this.nextSibling );
            });
        }

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5801);
if ( arguments.length ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5802);
var set = jQuery.clean( arguments );
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5803);
return this.pushStack( jQuery.merge( this, set ), "after", this.selector );
        }
    },

    // keepData is for internal use only--do not document
    remove: function( selector, keepData ) {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "remove", 5808);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5809);
var elem,
            i = 0;

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5812);
for ( ; (elem = this[i]) != null; i++ ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5813);
if ( !selector || jQuery.filter( selector, [ elem ] ).length ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5814);
if ( !keepData && elem.nodeType === 1 ) {
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5815);
jQuery.cleanData( elem.getElementsByTagName("*") );
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5816);
jQuery.cleanData( [ elem ] );
                }

                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5819);
if ( elem.parentNode ) {
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5820);
elem.parentNode.removeChild( elem );
                }
            }
        }

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5825);
return this;
    },

    empty: function() {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "empty", 5828);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5829);
var elem,
            i = 0;

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5832);
for ( ; (elem = this[i]) != null; i++ ) {
            // Remove element nodes and prevent memory leaks
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5834);
if ( elem.nodeType === 1 ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5835);
jQuery.cleanData( elem.getElementsByTagName("*") );
            }

            // Remove any remaining nodes
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5839);
while ( elem.firstChild ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5840);
elem.removeChild( elem.firstChild );
            }
        }

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5844);
return this;
    },

    clone: function( dataAndEvents, deepDataAndEvents ) {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "clone", 5847);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5848);
dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5849);
deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5851);
return this.map( function () {
            _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 123)", 5851);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5852);
return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
        });
    },

    html: function( value ) {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "html", 5856);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5857);
return jQuery.access( this, function( value ) {
            _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 124)", 5857);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5858);
var elem = this[0] || {},
                i = 0,
                l = this.length;

            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5862);
if ( value === undefined ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5863);
return elem.nodeType === 1 ?
                    elem.innerHTML.replace( rinlinejQuery, "" ) :
                    undefined;
            }

            // See if we can take a shortcut and just use innerHTML
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5869);
if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
                ( jQuery.support.htmlSerialize || !rnoshimcache.test( value )  ) &&
                ( jQuery.support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
                !wrapMap[ ( rtagName.exec( value ) || ["", ""] )[1].toLowerCase() ] ) {

                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5874);
value = value.replace( rxhtmlTag, "<$1></$2>" );

                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5876);
try {
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5877);
for (; i < l; i++ ) {
                        // Remove element nodes and prevent memory leaks
                        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5879);
elem = this[i] || {};
                        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5880);
if ( elem.nodeType === 1 ) {
                            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5881);
jQuery.cleanData( elem.getElementsByTagName( "*" ) );
                            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5882);
elem.innerHTML = value;
                        }
                    }

                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5886);
elem = 0;

                // If using innerHTML throws an exception, use the fallback method
                } catch(e) {}
            }

            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5892);
if ( elem ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5893);
this.empty().append( value );
            }
        }, null, value, arguments.length );
    },

    replaceWith: function( value ) {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "replaceWith", 5898);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5899);
if ( !isDisconnected( this[0] ) ) {
            // Make sure that the elements are removed from the DOM before they are inserted
            // this can help fix replacing a parent with child elements
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5902);
if ( jQuery.isFunction( value ) ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5903);
return this.each(function(i) {
                    _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 125)", 5903);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5904);
var self = jQuery(this), old = self.html();
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5905);
self.replaceWith( value.call( this, i, old ) );
                });
            }

            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5909);
if ( typeof value !== "string" ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5910);
value = jQuery( value ).detach();
            }

            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5913);
return this.each(function() {
                _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 126)", 5913);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5914);
var next = this.nextSibling,
                    parent = this.parentNode;

                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5917);
jQuery( this ).remove();

                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5919);
if ( next ) {
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5920);
jQuery(next).before( value );
                } else {
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5922);
jQuery(parent).append( value );
                }
            });
        }

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5927);
return this.length ?
            this.pushStack( jQuery(jQuery.isFunction(value) ? value() : value), "replaceWith", value ) :
            this;
    },

    detach: function( selector ) {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "detach", 5932);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5933);
return this.remove( selector, true );
    },

    domManip: function( args, table, callback ) {

        // Flatten any nested arrays
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "domManip", 5936);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5939);
args = [].concat.apply( [], args );

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5941);
var results, first, fragment, iNoClone,
            i = 0,
            value = args[0],
            scripts = [],
            l = this.length;

        // We can't cloneNode fragments that contain checked, in WebKit
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5948);
if ( !jQuery.support.checkClone && l > 1 && typeof value === "string" && rchecked.test( value ) ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5949);
return this.each(function() {
                _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 127)", 5949);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5950);
jQuery(this).domManip( args, table, callback );
            });
        }

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5954);
if ( jQuery.isFunction(value) ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5955);
return this.each(function(i) {
                _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 128)", 5955);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5956);
var self = jQuery(this);
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5957);
args[0] = value.call( this, i, table ? self.html() : undefined );
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5958);
self.domManip( args, table, callback );
            });
        }

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5962);
if ( this[0] ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5963);
results = jQuery.buildFragment( args, this, scripts );
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5964);
fragment = results.fragment;
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5965);
first = fragment.firstChild;

            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5967);
if ( fragment.childNodes.length === 1 ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5968);
fragment = first;
            }

            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5971);
if ( first ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5972);
table = table && jQuery.nodeName( first, "tr" );

                // Use the original fragment for the last item instead of the first because it can end up
                // being emptied incorrectly in certain situations (#8070).
                // Fragments from the fragment cache must always be cloned and never used in place.
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5977);
for ( iNoClone = results.cacheable || l - 1; i < l; i++ ) {
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5978);
callback.call(
                        table && jQuery.nodeName( this[i], "table" ) ?
                            findOrAppend( this[i], "tbody" ) :
                            this[i],
                        i === iNoClone ?
                            fragment :
                            jQuery.clone( fragment, true, true )
                    );
                }
            }

            // Fix #11809: Avoid leaking memory
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5990);
fragment = first = null;

            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5992);
if ( scripts.length ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5993);
jQuery.each( scripts, function( i, elem ) {
                    _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 129)", 5993);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5994);
if ( elem.src ) {
                        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5995);
if ( jQuery.ajax ) {
                            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 5996);
jQuery.ajax({
                                url: elem.src,
                                type: "GET",
                                dataType: "script",
                                async: false,
                                global: false,
                                "throws": true
                            });
                        } else {
                            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6005);
jQuery.error("no ajax");
                        }
                    } else {
                        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6008);
jQuery.globalEval( ( elem.text || elem.textContent || elem.innerHTML || "" ).replace( rcleanScript, "" ) );
                    }

                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6011);
if ( elem.parentNode ) {
                        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6012);
elem.parentNode.removeChild( elem );
                    }
                });
            }
        }

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6018);
return this;
    }
});

_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6022);
function findOrAppend( elem, tag ) {
    _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "findOrAppend", 6022);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6023);
return elem.getElementsByTagName( tag )[0] || elem.appendChild( elem.ownerDocument.createElement( tag ) );
}

_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6026);
function cloneCopyEvent( src, dest ) {

    _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "cloneCopyEvent", 6026);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6028);
if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6029);
return;
    }

    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6032);
var type, i, l,
        oldData = jQuery._data( src ),
        curData = jQuery._data( dest, oldData ),
        events = oldData.events;

    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6037);
if ( events ) {
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6038);
delete curData.handle;
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6039);
curData.events = {};

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6041);
for ( type in events ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6042);
for ( i = 0, l = events[ type ].length; i < l; i++ ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6043);
jQuery.event.add( dest, type, events[ type ][ i ] );
            }
        }
    }

    // make the cloned public data object a copy from the original
    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6049);
if ( curData.data ) {
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6050);
curData.data = jQuery.extend( {}, curData.data );
    }
}

_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6054);
function cloneFixAttributes( src, dest ) {
    _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "cloneFixAttributes", 6054);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6055);
var nodeName;

    // We do not need to do anything for non-Elements
    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6058);
if ( dest.nodeType !== 1 ) {
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6059);
return;
    }

    // clearAttributes removes the attributes, which we don't want,
    // but also removes the attachEvent events, which we *do* want
    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6064);
if ( dest.clearAttributes ) {
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6065);
dest.clearAttributes();
    }

    // mergeAttributes, in contrast, only merges back on the
    // original attributes, not the events
    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6070);
if ( dest.mergeAttributes ) {
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6071);
dest.mergeAttributes( src );
    }

    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6074);
nodeName = dest.nodeName.toLowerCase();

    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6076);
if ( nodeName === "object" ) {
        // IE6-10 improperly clones children of object elements using classid.
        // IE10 throws NoModificationAllowedError if parent is null, #12132.
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6079);
if ( dest.parentNode ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6080);
dest.outerHTML = src.outerHTML;
        }

        // This path appears unavoidable for IE9. When cloning an object
        // element in IE9, the outerHTML strategy above is not sufficient.
        // If the src has innerHTML and the destination does not,
        // copy the src.innerHTML into the dest.innerHTML. #10324
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6087);
if ( jQuery.support.html5Clone && (src.innerHTML && !jQuery.trim(dest.innerHTML)) ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6088);
dest.innerHTML = src.innerHTML;
        }

    } else {_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6091);
if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
        // IE6-8 fails to persist the checked state of a cloned checkbox
        // or radio button. Worse, IE6-7 fail to give the cloned element
        // a checked appearance if the defaultChecked value isn't also set

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6096);
dest.defaultChecked = dest.checked = src.checked;

        // IE6-7 get confused and end up setting the value of a cloned
        // checkbox/radio button to an empty string instead of "on"
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6100);
if ( dest.value !== src.value ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6101);
dest.value = src.value;
        }

    // IE6-8 fails to return the selected option to the default selected
    // state when cloning options
    } else {_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6106);
if ( nodeName === "option" ) {
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6107);
dest.selected = src.defaultSelected;

    // IE6-8 fails to set the defaultValue to the correct value when
    // cloning other types of input fields
    } else {_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6111);
if ( nodeName === "input" || nodeName === "textarea" ) {
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6112);
dest.defaultValue = src.defaultValue;

    // IE blanks contents when cloning scripts
    } else {_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6115);
if ( nodeName === "script" && dest.text !== src.text ) {
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6116);
dest.text = src.text;
    }}}}}

    // Event data gets referenced instead of copied if the expando
    // gets copied too
    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6121);
dest.removeAttribute( jQuery.expando );
}

_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6124);
jQuery.buildFragment = function( args, context, scripts ) {
    _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "buildFragment", 6124);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6125);
var fragment, cacheable, cachehit,
        first = args[ 0 ];

    // Set context from what may come in as undefined or a jQuery collection or a node
    // Updated to fix #12266 where accessing context[0] could throw an exception in IE9/10 &
    // also doubles as fix for #8950 where plain objects caused createDocumentFragment exception
    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6131);
context = context || document;
    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6132);
context = !context.nodeType && context[0] || context;
    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6133);
context = context.ownerDocument || context;

    // Only cache "small" (1/2 KB) HTML strings that are associated with the main document
    // Cloning options loses the selected state, so don't cache them
    // IE 6 doesn't like it when you put <object> or <embed> elements in a fragment
    // Also, WebKit does not clone 'checked' attributes on cloneNode, so don't cache
    // Lastly, IE6,7,8 will not correctly reuse cached fragments that were created from unknown elems #10501
    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6140);
if ( args.length === 1 && typeof first === "string" && first.length < 512 && context === document &&
        first.charAt(0) === "<" && !rnocache.test( first ) &&
        (jQuery.support.checkClone || !rchecked.test( first )) &&
        (jQuery.support.html5Clone || !rnoshimcache.test( first )) ) {

        // Mark cacheable and look for a hit
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6146);
cacheable = true;
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6147);
fragment = jQuery.fragments[ first ];
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6148);
cachehit = fragment !== undefined;
    }

    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6151);
if ( !fragment ) {
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6152);
fragment = context.createDocumentFragment();
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6153);
jQuery.clean( args, context, fragment, scripts );

        // Update the cache, but only store false
        // unless this is a second parsing of the same content
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6157);
if ( cacheable ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6158);
jQuery.fragments[ first ] = cachehit && fragment;
        }
    }

    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6162);
return { fragment: fragment, cacheable: cacheable };
};

_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6165);
jQuery.fragments = {};

_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6167);
jQuery.each({
    appendTo: "append",
    prependTo: "prepend",
    insertBefore: "before",
    insertAfter: "after",
    replaceAll: "replaceWith"
}, function( name, original ) {
    _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 130)", 6173);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6174);
jQuery.fn[ name ] = function( selector ) {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "]", 6174);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6175);
var elems,
            i = 0,
            ret = [],
            insert = jQuery( selector ),
            l = insert.length,
            parent = this.length === 1 && this[0].parentNode;

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6182);
if ( (parent == null || parent && parent.nodeType === 11 && parent.childNodes.length === 1) && l === 1 ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6183);
insert[ original ]( this[0] );
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6184);
return this;
        } else {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6186);
for ( ; i < l; i++ ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6187);
elems = ( i > 0 ? this.clone(true) : this ).get();
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6188);
jQuery( insert[i] )[ original ]( elems );
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6189);
ret = ret.concat( elems );
            }

            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6192);
return this.pushStack( ret, name, insert.selector );
        }
    };
});

_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6197);
function getAll( elem ) {
    _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "getAll", 6197);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6198);
if ( typeof elem.getElementsByTagName !== "undefined" ) {
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6199);
return elem.getElementsByTagName( "*" );

    } else {_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6201);
if ( typeof elem.querySelectorAll !== "undefined" ) {
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6202);
return elem.querySelectorAll( "*" );

    } else {
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6205);
return [];
    }}
}

// Used in clean, fixes the defaultChecked property
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6210);
function fixDefaultChecked( elem ) {
    _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "fixDefaultChecked", 6210);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6211);
if ( rcheckableType.test( elem.type ) ) {
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6212);
elem.defaultChecked = elem.checked;
    }
}

_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6216);
jQuery.extend({
    clone: function( elem, dataAndEvents, deepDataAndEvents ) {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "clone", 6217);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6218);
var srcElements,
            destElements,
            i,
            clone;

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6223);
if ( jQuery.support.html5Clone || jQuery.isXMLDoc(elem) || !rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6224);
clone = elem.cloneNode( true );

        // IE<=8 does not properly clone detached, unknown element nodes
        } else {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6228);
fragmentDiv.innerHTML = elem.outerHTML;
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6229);
fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
        }

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6232);
if ( (!jQuery.support.noCloneEvent || !jQuery.support.noCloneChecked) &&
                (elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem) ) {
            // IE copies events bound via attachEvent when using cloneNode.
            // Calling detachEvent on the clone will also remove the events
            // from the original. In order to get around this, we use some
            // proprietary methods to clear the events. Thanks to MooTools
            // guys for this hotness.

            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6240);
cloneFixAttributes( elem, clone );

            // Using Sizzle here is crazy slow, so we use getElementsByTagName instead
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6243);
srcElements = getAll( elem );
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6244);
destElements = getAll( clone );

            // Weird iteration because IE will replace the length property
            // with an element if you are cloning the body and one of the
            // elements on the page has a name or id of "length"
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6249);
for ( i = 0; srcElements[i]; ++i ) {
                // Ensure that the destination node is not null; Fixes #9587
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6251);
if ( destElements[i] ) {
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6252);
cloneFixAttributes( srcElements[i], destElements[i] );
                }
            }
        }

        // Copy the events from the original to the clone
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6258);
if ( dataAndEvents ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6259);
cloneCopyEvent( elem, clone );

            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6261);
if ( deepDataAndEvents ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6262);
srcElements = getAll( elem );
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6263);
destElements = getAll( clone );

                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6265);
for ( i = 0; srcElements[i]; ++i ) {
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6266);
cloneCopyEvent( srcElements[i], destElements[i] );
                }
            }
        }

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6271);
srcElements = destElements = null;

        // Return the cloned set
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6274);
return clone;
    },

    clean: function( elems, context, fragment, scripts ) {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "clean", 6277);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6278);
var i, j, elem, tag, wrap, depth, div, hasBody, tbody, len, handleScript, jsTags,
            safe = context === document && safeFragment,
            ret = [];

        // Ensure that context is a document
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6283);
if ( !context || typeof context.createDocumentFragment === "undefined" ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6284);
context = document;
        }

        // Use the already-created safe fragment if context permits
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6288);
for ( i = 0; (elem = elems[i]) != null; i++ ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6289);
if ( typeof elem === "number" ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6290);
elem += "";
            }

            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6293);
if ( !elem ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6294);
continue;
            }

            // Convert html string into DOM nodes
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6298);
if ( typeof elem === "string" ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6299);
if ( !rhtml.test( elem ) ) {
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6300);
elem = context.createTextNode( elem );
                } else {
                    // Ensure a safe container in which to render the html
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6303);
safe = safe || createSafeFragment( context );
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6304);
div = context.createElement("div");
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6305);
safe.appendChild( div );

                    // Fix "XHTML"-style tags in all browsers
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6308);
elem = elem.replace(rxhtmlTag, "<$1></$2>");

                    // Go to html and back, then peel off extra wrappers
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6311);
tag = ( rtagName.exec( elem ) || ["", ""] )[1].toLowerCase();
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6312);
wrap = wrapMap[ tag ] || wrapMap._default;
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6313);
depth = wrap[0];
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6314);
div.innerHTML = wrap[1] + elem + wrap[2];

                    // Move to the right depth
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6317);
while ( depth-- ) {
                        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6318);
div = div.lastChild;
                    }

                    // Remove IE's autoinserted <tbody> from table fragments
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6322);
if ( !jQuery.support.tbody ) {

                        // String was a <table>, *may* have spurious <tbody>
                        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6325);
hasBody = rtbody.test(elem);
                            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6326);
tbody = tag === "table" && !hasBody ?
                                div.firstChild && div.firstChild.childNodes :

                                // String was a bare <thead> or <tfoot>
                                wrap[1] === "<table>" && !hasBody ?
                                    div.childNodes :
                                    [];

                        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6334);
for ( j = tbody.length - 1; j >= 0 ; --j ) {
                            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6335);
if ( jQuery.nodeName( tbody[ j ], "tbody" ) && !tbody[ j ].childNodes.length ) {
                                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6336);
tbody[ j ].parentNode.removeChild( tbody[ j ] );
                            }
                        }
                    }

                    // IE completely kills leading whitespace when innerHTML is used
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6342);
if ( !jQuery.support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
                        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6343);
div.insertBefore( context.createTextNode( rleadingWhitespace.exec(elem)[0] ), div.firstChild );
                    }

                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6346);
elem = div.childNodes;

                    // Take out of fragment container (we need a fresh div each time)
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6349);
div.parentNode.removeChild( div );
                }
            }

            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6353);
if ( elem.nodeType ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6354);
ret.push( elem );
            } else {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6356);
jQuery.merge( ret, elem );
            }
        }

        // Fix #11356: Clear elements from safeFragment
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6361);
if ( div ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6362);
elem = div = safe = null;
        }

        // Reset defaultChecked for any radios and checkboxes
        // about to be appended to the DOM in IE 6/7 (#8060)
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6367);
if ( !jQuery.support.appendChecked ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6368);
for ( i = 0; (elem = ret[i]) != null; i++ ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6369);
if ( jQuery.nodeName( elem, "input" ) ) {
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6370);
fixDefaultChecked( elem );
                } else {_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6371);
if ( typeof elem.getElementsByTagName !== "undefined" ) {
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6372);
jQuery.grep( elem.getElementsByTagName("input"), fixDefaultChecked );
                }}
            }
        }

        // Append elements to a provided document fragment
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6378);
if ( fragment ) {
            // Special handling of each script element
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6380);
handleScript = function( elem ) {
                // Check if we consider it executable
                _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "handleScript", 6380);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6382);
if ( !elem.type || rscriptType.test( elem.type ) ) {
                    // Detach the script and store it in the scripts array (if provided) or the fragment
                    // Return truthy to indicate that it has been handled
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6385);
return scripts ?
                        scripts.push( elem.parentNode ? elem.parentNode.removeChild( elem ) : elem ) :
                        fragment.appendChild( elem );
                }
            };

            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6391);
for ( i = 0; (elem = ret[i]) != null; i++ ) {
                // Check if we're done after handling an executable script
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6393);
if ( !( jQuery.nodeName( elem, "script" ) && handleScript( elem ) ) ) {
                    // Append to fragment and handle embedded scripts
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6395);
fragment.appendChild( elem );
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6396);
if ( typeof elem.getElementsByTagName !== "undefined" ) {
                        // handleScript alters the DOM, so use jQuery.merge to ensure snapshot iteration
                        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6398);
jsTags = jQuery.grep( jQuery.merge( [], elem.getElementsByTagName("script") ), handleScript );

                        // Splice the scripts into ret after their former ancestor and advance our index beyond them
                        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6401);
ret.splice.apply( ret, [i + 1, 0].concat( jsTags ) );
                        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6402);
i += jsTags.length;
                    }
                }
            }
        }

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6408);
return ret;
    },

    cleanData: function( elems, /* internal */ acceptData ) {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "cleanData", 6411);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6412);
var data, id, elem, type,
            i = 0,
            internalKey = jQuery.expando,
            cache = jQuery.cache,
            deleteExpando = jQuery.support.deleteExpando,
            special = jQuery.event.special;

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6419);
for ( ; (elem = elems[i]) != null; i++ ) {

            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6421);
if ( acceptData || jQuery.acceptData( elem ) ) {

                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6423);
id = elem[ internalKey ];
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6424);
data = id && cache[ id ];

                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6426);
if ( data ) {
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6427);
if ( data.events ) {
                        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6428);
for ( type in data.events ) {
                            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6429);
if ( special[ type ] ) {
                                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6430);
jQuery.event.remove( elem, type );

                            // This is a shortcut to avoid jQuery.event.remove's overhead
                            } else {
                                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6434);
jQuery.removeEvent( elem, type, data.handle );
                            }
                        }
                    }

                    // Remove cache only if it was not already removed by jQuery.event.remove
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6440);
if ( cache[ id ] ) {

                        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6442);
delete cache[ id ];

                        // IE does not allow us to delete expando properties from nodes,
                        // nor does it have a removeAttribute function on Document nodes;
                        // we must handle all of these cases
                        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6447);
if ( deleteExpando ) {
                            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6448);
delete elem[ internalKey ];

                        } else {_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6450);
if ( elem.removeAttribute ) {
                            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6451);
elem.removeAttribute( internalKey );

                        } else {
                            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6454);
elem[ internalKey ] = null;
                        }}

                        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6457);
jQuery.deletedIds.push( id );
                    }
                }
            }
        }
    }
});
// Limit scope pollution from any deprecated API
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6465);
(function() {

_yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 131)", 6465);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6467);
var matched, browser;

// Use of jQuery.browser is frowned upon.
// More details: http://api.jquery.com/jQuery.browser
// jQuery.uaMatch maintained for back-compat
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6472);
jQuery.uaMatch = function( ua ) {
    _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "uaMatch", 6472);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6473);
ua = ua.toLowerCase();

    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6475);
var match = /(chrome)[ \/]([\w.]+)/.exec( ua ) ||
        /(webkit)[ \/]([\w.]+)/.exec( ua ) ||
        /(opera)(?:.*version|)[ \/]([\w.]+)/.exec( ua ) ||
        /(msie) ([\w.]+)/.exec( ua ) ||
        ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec( ua ) ||
        [];

    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6482);
return {
        browser: match[ 1 ] || "",
        version: match[ 2 ] || "0"
    };
};

_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6488);
matched = jQuery.uaMatch( navigator.userAgent );
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6489);
browser = {};

_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6491);
if ( matched.browser ) {
    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6492);
browser[ matched.browser ] = true;
    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6493);
browser.version = matched.version;
}

// Chrome is Webkit, but Webkit is also Safari.
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6497);
if ( browser.chrome ) {
    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6498);
browser.webkit = true;
} else {_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6499);
if ( browser.webkit ) {
    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6500);
browser.safari = true;
}}

_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6503);
jQuery.browser = browser;

_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6505);
jQuery.sub = function() {
    _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "sub", 6505);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6506);
function jQuerySub( selector, context ) {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "jQuerySub", 6506);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6507);
return new jQuerySub.fn.init( selector, context );
    }
    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6509);
jQuery.extend( true, jQuerySub, this );
    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6510);
jQuerySub.superclass = this;
    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6511);
jQuerySub.fn = jQuerySub.prototype = this();
    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6512);
jQuerySub.fn.constructor = jQuerySub;
    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6513);
jQuerySub.sub = this.sub;
    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6514);
jQuerySub.fn.init = function init( selector, context ) {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "init", 6514);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6515);
if ( context && context instanceof jQuery && !(context instanceof jQuerySub) ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6516);
context = jQuerySub( context );
        }

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6519);
return jQuery.fn.init.call( this, selector, context, rootjQuerySub );
    };
    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6521);
jQuerySub.fn.init.prototype = jQuerySub.fn;
    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6522);
var rootjQuerySub = jQuerySub(document);
    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6523);
return jQuerySub;
};

})();
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6527);
var curCSS, iframe, iframeDoc,
    ralpha = /alpha\([^)]*\)/i,
    ropacity = /opacity=([^)]*)/,
    rposition = /^(top|right|bottom|left)$/,
    // swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
    // see here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
    rdisplayswap = /^(none|table(?!-c[ea]).+)/,
    rmargin = /^margin/,
    rnumsplit = new RegExp( "^(" + core_pnum + ")(.*)$", "i" ),
    rnumnonpx = new RegExp( "^(" + core_pnum + ")(?!px)[a-z%]+$", "i" ),
    rrelNum = new RegExp( "^([-+])=(" + core_pnum + ")", "i" ),
    elemdisplay = {},

    cssShow = { position: "absolute", visibility: "hidden", display: "block" },
    cssNormalTransform = {
        letterSpacing: 0,
        fontWeight: 400
    },

    cssExpand = [ "Top", "Right", "Bottom", "Left" ],
    cssPrefixes = [ "Webkit", "O", "Moz", "ms" ],

    eventsToggle = jQuery.fn.toggle;

// return a css property mapped to a potentially vendor prefixed property
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6552);
function vendorPropName( style, name ) {

    // shortcut for names that are not vendor prefixed
    _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "vendorPropName", 6552);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6555);
if ( name in style ) {
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6556);
return name;
    }

    // check for vendor prefixed names
    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6560);
var capName = name.charAt(0).toUpperCase() + name.slice(1),
        origName = name,
        i = cssPrefixes.length;

    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6564);
while ( i-- ) {
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6565);
name = cssPrefixes[ i ] + capName;
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6566);
if ( name in style ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6567);
return name;
        }
    }

    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6571);
return origName;
}

_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6574);
function isHidden( elem, el ) {
    _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "isHidden", 6574);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6575);
elem = el || elem;
    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6576);
return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
}

_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6579);
function showHide( elements, show ) {
    _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "showHide", 6579);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6580);
var elem, display,
        values = [],
        index = 0,
        length = elements.length;

    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6585);
for ( ; index < length; index++ ) {
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6586);
elem = elements[ index ];
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6587);
if ( !elem.style ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6588);
continue;
        }
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6590);
values[ index ] = jQuery._data( elem, "olddisplay" );
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6591);
if ( show ) {
            // Reset the inline display of this element to learn if it is
            // being hidden by cascaded rules or not
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6594);
if ( !values[ index ] && elem.style.display === "none" ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6595);
elem.style.display = "";
            }

            // Set elements which have been overridden with display: none
            // in a stylesheet to whatever the default browser style is
            // for such an element
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6601);
if ( elem.style.display === "" && isHidden( elem ) ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6602);
values[ index ] = jQuery._data( elem, "olddisplay", css_defaultDisplay(elem.nodeName) );
            }
        } else {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6605);
display = curCSS( elem, "display" );

            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6607);
if ( !values[ index ] && display !== "none" ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6608);
jQuery._data( elem, "olddisplay", display );
            }
        }
    }

    // Set the display of most of the elements in a second loop
    // to avoid the constant reflow
    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6615);
for ( index = 0; index < length; index++ ) {
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6616);
elem = elements[ index ];
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6617);
if ( !elem.style ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6618);
continue;
        }
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6620);
if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6621);
elem.style.display = show ? values[ index ] || "" : "none";
        }
    }

    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6625);
return elements;
}

_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6628);
jQuery.fn.extend({
    css: function( name, value ) {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "css", 6629);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6630);
return jQuery.access( this, function( elem, name, value ) {
            _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 132)", 6630);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6631);
return value !== undefined ?
                jQuery.style( elem, name, value ) :
                jQuery.css( elem, name );
        }, name, value, arguments.length > 1 );
    },
    show: function() {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "show", 6636);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6637);
return showHide( this, true );
    },
    hide: function() {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "hide", 6639);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6640);
return showHide( this );
    },
    toggle: function( state, fn2 ) {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "toggle", 6642);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6643);
var bool = typeof state === "boolean";

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6645);
if ( jQuery.isFunction( state ) && jQuery.isFunction( fn2 ) ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6646);
return eventsToggle.apply( this, arguments );
        }

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6649);
return this.each(function() {
            _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 133)", 6649);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6650);
if ( bool ? state : isHidden( this ) ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6651);
jQuery( this ).show();
            } else {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6653);
jQuery( this ).hide();
            }
        });
    }
});

_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6659);
jQuery.extend({
    // Add in style property hooks for overriding the default
    // behavior of getting and setting a style property
    cssHooks: {
        opacity: {
            get: function( elem, computed ) {
                _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "get", 6664);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6665);
if ( computed ) {
                    // We should always get a number back from opacity
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6667);
var ret = curCSS( elem, "opacity" );
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6668);
return ret === "" ? "1" : ret;

                }
            }
        }
    },

    // Exclude the following css properties to add px
    cssNumber: {
        "fillOpacity": true,
        "fontWeight": true,
        "lineHeight": true,
        "opacity": true,
        "orphans": true,
        "widows": true,
        "zIndex": true,
        "zoom": true
    },

    // Add in properties whose names you wish to fix before
    // setting or getting the value
    cssProps: {
        // normalize float css property
        "float": jQuery.support.cssFloat ? "cssFloat" : "styleFloat"
    },

    // Get and set the style property on a DOM Node
    style: function( elem, name, value, extra ) {
        // Don't set styles on text and comment nodes
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "style", 6695);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6697);
if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6698);
return;
        }

        // Make sure that we're working with the right name
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6702);
var ret, type, hooks,
            origName = jQuery.camelCase( name ),
            style = elem.style;

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6706);
name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );

        // gets hook for the prefixed version
        // followed by the unprefixed version
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6710);
hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

        // Check if we're setting a value
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6713);
if ( value !== undefined ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6714);
type = typeof value;

            // convert relative number strings (+= or -=) to relative numbers. #7345
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6717);
if ( type === "string" && (ret = rrelNum.exec( value )) ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6718);
value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
                // Fixes bug #9237
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6720);
type = "number";
            }

            // Make sure that NaN and null values aren't set. See: #7116
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6724);
if ( value == null || type === "number" && isNaN( value ) ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6725);
return;
            }

            // If a number was passed in, add 'px' to the (except for certain CSS properties)
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6729);
if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6730);
value += "px";
            }

            // If a hook was provided, use that value, otherwise just set the specified value
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6734);
if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {
                // Wrapped to prevent IE from throwing errors when 'invalid' values are provided
                // Fixes bug #5509
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6737);
try {
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6738);
style[ name ] = value;
                } catch(e) {}
            }

        } else {
            // If a hook was provided get the non-computed value from there
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6744);
if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6745);
return ret;
            }

            // Otherwise just get the value from the style object
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6749);
return style[ name ];
        }
    },

    css: function( elem, name, numeric, extra ) {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "css", 6753);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6754);
var val, num, hooks,
            origName = jQuery.camelCase( name );

        // Make sure that we're working with the right name
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6758);
name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

        // gets hook for the prefixed version
        // followed by the unprefixed version
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6762);
hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

        // If a hook was provided get the computed value from there
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6765);
if ( hooks && "get" in hooks ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6766);
val = hooks.get( elem, true, extra );
        }

        // Otherwise, if a way to get the computed value exists, use that
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6770);
if ( val === undefined ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6771);
val = curCSS( elem, name );
        }

        //convert "normal" to computed value
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6775);
if ( val === "normal" && name in cssNormalTransform ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6776);
val = cssNormalTransform[ name ];
        }

        // Return, converting to number if forced or a qualifier was provided and val looks numeric
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6780);
if ( numeric || extra !== undefined ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6781);
num = parseFloat( val );
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6782);
return numeric || jQuery.isNumeric( num ) ? num || 0 : val;
        }
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6784);
return val;
    },

    // A method for quickly swapping in/out CSS properties to get correct calculations
    swap: function( elem, options, callback ) {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "swap", 6788);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6789);
var ret, name,
            old = {};

        // Remember the old values, and insert the new ones
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6793);
for ( name in options ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6794);
old[ name ] = elem.style[ name ];
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6795);
elem.style[ name ] = options[ name ];
        }

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6798);
ret = callback.call( elem );

        // Revert the old values
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6801);
for ( name in options ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6802);
elem.style[ name ] = old[ name ];
        }

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6805);
return ret;
    }
});

// NOTE: To any future maintainer, we've window.getComputedStyle
// because jsdom on node.js will break without it.
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6811);
if ( window.getComputedStyle ) {
    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6812);
curCSS = function( elem, name ) {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "curCSS", 6812);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6813);
var ret, width, minWidth, maxWidth,
            computed = window.getComputedStyle( elem, null ),
            style = elem.style;

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6817);
if ( computed ) {

            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6819);
ret = computed[ name ];
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6820);
if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6821);
ret = jQuery.style( elem, name );
            }

            // A tribute to the "awesome hack by Dean Edwards"
            // Chrome < 17 and Safari 5.0 uses "computed value" instead of "used value" for margin-right
            // Safari 5.1.7 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
            // this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6828);
if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6829);
width = style.width;
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6830);
minWidth = style.minWidth;
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6831);
maxWidth = style.maxWidth;

                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6833);
style.minWidth = style.maxWidth = style.width = ret;
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6834);
ret = computed.width;

                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6836);
style.width = width;
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6837);
style.minWidth = minWidth;
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6838);
style.maxWidth = maxWidth;
            }
        }

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6842);
return ret;
    };
} else {_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6844);
if ( document.documentElement.currentStyle ) {
    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6845);
curCSS = function( elem, name ) {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "curCSS", 6845);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6846);
var left, rsLeft,
            ret = elem.currentStyle && elem.currentStyle[ name ],
            style = elem.style;

        // Avoid setting ret to empty string here
        // so we don't default to auto
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6852);
if ( ret == null && style && style[ name ] ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6853);
ret = style[ name ];
        }

        // From the awesome hack by Dean Edwards
        // http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

        // If we're not dealing with a regular pixel number
        // but a number that has a weird ending, we need to convert it to pixels
        // but not position css attributes, as those are proportional to the parent element instead
        // and we can't measure the parent instead because it might trigger a "stacking dolls" problem
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6863);
if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

            // Remember the original values
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6866);
left = style.left;
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6867);
rsLeft = elem.runtimeStyle && elem.runtimeStyle.left;

            // Put in the new values to get a computed value out
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6870);
if ( rsLeft ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6871);
elem.runtimeStyle.left = elem.currentStyle.left;
            }
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6873);
style.left = name === "fontSize" ? "1em" : ret;
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6874);
ret = style.pixelLeft + "px";

            // Revert the changed values
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6877);
style.left = left;
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6878);
if ( rsLeft ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6879);
elem.runtimeStyle.left = rsLeft;
            }
        }

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6883);
return ret === "" ? "auto" : ret;
    };
}}

_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6887);
function setPositiveNumber( elem, value, subtract ) {
    _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "setPositiveNumber", 6887);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6888);
var matches = rnumsplit.exec( value );
    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6889);
return matches ?
            Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
            value;
}

_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6894);
function augmentWidthOrHeight( elem, name, extra, isBorderBox ) {
    _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "augmentWidthOrHeight", 6894);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6895);
var i = extra === ( isBorderBox ? "border" : "content" ) ?
        // If we already have the right measurement, avoid augmentation
        4 :
        // Otherwise initialize for horizontal or vertical properties
        name === "width" ? 1 : 0,

        val = 0;

    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6903);
for ( ; i < 4; i += 2 ) {
        // both box models exclude margin, so add it if we want it
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6905);
if ( extra === "margin" ) {
            // we use jQuery.css instead of curCSS here
            // because of the reliableMarginRight CSS hook!
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6908);
val += jQuery.css( elem, extra + cssExpand[ i ], true );
        }

        // From this point on we use curCSS for maximum performance (relevant in animations)
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6912);
if ( isBorderBox ) {
            // border-box includes padding, so remove it if we want content
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6914);
if ( extra === "content" ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6915);
val -= parseFloat( curCSS( elem, "padding" + cssExpand[ i ] ) ) || 0;
            }

            // at this point, extra isn't border nor margin, so remove border
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6919);
if ( extra !== "margin" ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6920);
val -= parseFloat( curCSS( elem, "border" + cssExpand[ i ] + "Width" ) ) || 0;
            }
        } else {
            // at this point, extra isn't content, so add padding
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6924);
val += parseFloat( curCSS( elem, "padding" + cssExpand[ i ] ) ) || 0;

            // at this point, extra isn't content nor padding, so add border
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6927);
if ( extra !== "padding" ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6928);
val += parseFloat( curCSS( elem, "border" + cssExpand[ i ] + "Width" ) ) || 0;
            }
        }
    }

    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6933);
return val;
}

_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6936);
function getWidthOrHeight( elem, name, extra ) {

    // Start with offset property, which is equivalent to the border-box value
    _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "getWidthOrHeight", 6936);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6939);
var val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
        valueIsBorderBox = true,
        isBorderBox = jQuery.support.boxSizing && jQuery.css( elem, "boxSizing" ) === "border-box";

    // some non-html elements return undefined for offsetWidth, so check for null/undefined
    // svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
    // MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6946);
if ( val <= 0 || val == null ) {
        // Fall back to computed then uncomputed css if necessary
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6948);
val = curCSS( elem, name );
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6949);
if ( val < 0 || val == null ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6950);
val = elem.style[ name ];
        }

        // Computed unit is not pixels. Stop here and return.
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6954);
if ( rnumnonpx.test(val) ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6955);
return val;
        }

        // we need the check for style in case a browser which returns unreliable values
        // for getComputedStyle silently falls back to the reliable elem.style
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6960);
valueIsBorderBox = isBorderBox && ( jQuery.support.boxSizingReliable || val === elem.style[ name ] );

        // Normalize "", auto, and prepare for extra
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6963);
val = parseFloat( val ) || 0;
    }

    // use the active box-sizing model to add/subtract irrelevant styles
    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6967);
return ( val +
        augmentWidthOrHeight(
            elem,
            name,
            extra || ( isBorderBox ? "border" : "content" ),
            valueIsBorderBox
        )
    ) + "px";
}


// Try to determine the default display value of an element
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6979);
function css_defaultDisplay( nodeName ) {
    _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "css_defaultDisplay", 6979);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6980);
if ( elemdisplay[ nodeName ] ) {
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6981);
return elemdisplay[ nodeName ];
    }

    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6984);
var elem = jQuery( "<" + nodeName + ">" ).appendTo( document.body ),
        display = elem.css("display");
    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6986);
elem.remove();

    // If the simple way fails,
    // get element's real default display by attaching it to a temp iframe
    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6990);
if ( display === "none" || display === "" ) {
        // Use the already-created iframe if possible
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 6992);
iframe = document.body.appendChild(
            iframe || jQuery.extend( document.createElement("iframe"), {
                frameBorder: 0,
                width: 0,
                height: 0
            })
        );

        // Create a cacheable copy of the iframe document on first call.
        // IE and Opera will allow us to reuse the iframeDoc without re-writing the fake HTML
        // document to it; WebKit & Firefox won't allow reusing the iframe document.
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7003);
if ( !iframeDoc || !iframe.createElement ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7004);
iframeDoc = ( iframe.contentWindow || iframe.contentDocument ).document;
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7005);
iframeDoc.write("<!doctype html><html><body>");
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7006);
iframeDoc.close();
        }

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7009);
elem = iframeDoc.body.appendChild( iframeDoc.createElement(nodeName) );

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7011);
display = curCSS( elem, "display" );
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7012);
document.body.removeChild( iframe );
    }

    // Store the correct default display
    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7016);
elemdisplay[ nodeName ] = display;

    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7018);
return display;
}

_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7021);
jQuery.each([ "height", "width" ], function( i, name ) {
    _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 134)", 7021);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7022);
jQuery.cssHooks[ name ] = {
        get: function( elem, computed, extra ) {
            _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "get", 7023);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7024);
if ( computed ) {
                // certain elements can have dimension info if we invisibly show them
                // however, it must have a current display style that would benefit from this
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7027);
if ( elem.offsetWidth === 0 && rdisplayswap.test( curCSS( elem, "display" ) ) ) {
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7028);
return jQuery.swap( elem, cssShow, function() {
                        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 135)", 7028);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7029);
return getWidthOrHeight( elem, name, extra );
                    });
                } else {
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7032);
return getWidthOrHeight( elem, name, extra );
                }
            }
        },

        set: function( elem, value, extra ) {
            _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "set", 7037);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7038);
return setPositiveNumber( elem, value, extra ?
                augmentWidthOrHeight(
                    elem,
                    name,
                    extra,
                    jQuery.support.boxSizing && jQuery.css( elem, "boxSizing" ) === "border-box"
                ) : 0
            );
        }
    };
});

_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7050);
if ( !jQuery.support.opacity ) {
    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7051);
jQuery.cssHooks.opacity = {
        get: function( elem, computed ) {
            // IE uses filters for opacity
            _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "get", 7052);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7054);
return ropacity.test( (computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "" ) ?
                ( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
                computed ? "1" : "";
        },

        set: function( elem, value ) {
            _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "set", 7059);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7060);
var style = elem.style,
                currentStyle = elem.currentStyle,
                opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
                filter = currentStyle && currentStyle.filter || style.filter || "";

            // IE has trouble with opacity if it does not have layout
            // Force it by setting the zoom level
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7067);
style.zoom = 1;

            // if setting opacity to 1, and no other filters exist - attempt to remove filter attribute #6652
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7070);
if ( value >= 1 && jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
                style.removeAttribute ) {

                // Setting style.filter to null, "" & " " still leave "filter:" in the cssText
                // if "filter:" is present at all, clearType is disabled, we want to avoid this
                // style.removeAttribute is IE Only, but so apparently is this code path...
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7076);
style.removeAttribute( "filter" );

                // if there there is no filter style applied in a css rule, we are done
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7079);
if ( currentStyle && !currentStyle.filter ) {
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7080);
return;
                }
            }

            // otherwise, set new filter values
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7085);
style.filter = ralpha.test( filter ) ?
                filter.replace( ralpha, opacity ) :
                filter + " " + opacity;
        }
    };
}

// These hooks cannot be added until DOM ready because the support test
// for it is not run until after DOM ready
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7094);
jQuery(function() {
    _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 136)", 7094);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7095);
if ( !jQuery.support.reliableMarginRight ) {
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7096);
jQuery.cssHooks.marginRight = {
            get: function( elem, computed ) {
                // WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
                // Work around by temporarily setting element display to inline-block
                _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "get", 7097);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7100);
return jQuery.swap( elem, { "display": "inline-block" }, function() {
                    _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 137)", 7100);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7101);
if ( computed ) {
                        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7102);
return curCSS( elem, "marginRight" );
                    }
                });
            }
        };
    }

    // Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
    // getComputedStyle returns percent when specified for top/left/bottom/right
    // rather than make the css module depend on the offset module, we just check for it here
    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7112);
if ( !jQuery.support.pixelPosition && jQuery.fn.position ) {
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7113);
jQuery.each( [ "top", "left" ], function( i, prop ) {
            _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 138)", 7113);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7114);
jQuery.cssHooks[ prop ] = {
                get: function( elem, computed ) {
                    _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "get", 7115);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7116);
if ( computed ) {
                        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7117);
var ret = curCSS( elem, prop );
                        // if curCSS returns percentage, fallback to offset
                        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7119);
return rnumnonpx.test( ret ) ? jQuery( elem ).position()[ prop ] + "px" : ret;
                    }
                }
            };
        });
    }

});

_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7128);
if ( jQuery.expr && jQuery.expr.filters ) {
    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7129);
jQuery.expr.filters.hidden = function( elem ) {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "hidden", 7129);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7130);
return ( elem.offsetWidth === 0 && elem.offsetHeight === 0 ) || (!jQuery.support.reliableHiddenOffsets && ((elem.style && elem.style.display) || curCSS( elem, "display" )) === "none");
    };

    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7133);
jQuery.expr.filters.visible = function( elem ) {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "visible", 7133);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7134);
return !jQuery.expr.filters.hidden( elem );
    };
}

// These hooks are used by animate to expand properties
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7139);
jQuery.each({
    margin: "",
    padding: "",
    border: "Width"
}, function( prefix, suffix ) {
    _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 139)", 7143);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7144);
jQuery.cssHooks[ prefix + suffix ] = {
        expand: function( value ) {
            _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "expand", 7145);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7146);
var i,

                // assumes a single number if not a string
                parts = typeof value === "string" ? value.split(" ") : [ value ],
                expanded = {};

            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7152);
for ( i = 0; i < 4; i++ ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7153);
expanded[ prefix + cssExpand[ i ] + suffix ] =
                    parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
            }

            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7157);
return expanded;
        }
    };

    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7161);
if ( !rmargin.test( prefix ) ) {
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7162);
jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
    }
});
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7165);
var r20 = /%20/g,
    rbracket = /\[\]$/,
    rCRLF = /\r?\n/g,
    rinput = /^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,
    rselectTextarea = /^(?:select|textarea)/i;

_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7171);
jQuery.fn.extend({
    serialize: function() {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "serialize", 7172);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7173);
return jQuery.param( this.serializeArray() );
    },
    serializeArray: function() {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "serializeArray", 7175);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7176);
return this.map(function(){
            _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 140)", 7176);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7177);
return this.elements ? jQuery.makeArray( this.elements ) : this;
        })
        .filter(function(){
            _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 141)", 7179);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7180);
return this.name && !this.disabled &&
                ( this.checked || rselectTextarea.test( this.nodeName ) ||
                    rinput.test( this.type ) );
        })
        .map(function( i, elem ){
            _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 142)", 7184);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7185);
var val = jQuery( this ).val();

            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7187);
return val == null ?
                null :
                jQuery.isArray( val ) ?
                    jQuery.map( val, function( val, i ){
                        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 143)", 7190);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7191);
return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
                    }) :
                    { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
        }).get();
    }
});

//Serialize an array of form elements or a set of
//key/values into a query string
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7200);
jQuery.param = function( a, traditional ) {
    _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "param", 7200);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7201);
var prefix,
        s = [],
        add = function( key, value ) {
            // If value is a function, invoke it and return its value
            _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "add", 7203);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7205);
value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7206);
s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
        };

    // Set traditional to true for jQuery <= 1.3.2 behavior.
    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7210);
if ( traditional === undefined ) {
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7211);
traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
    }

    // If an array was passed in, assume that it is an array of form elements.
    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7215);
if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
        // Serialize the form elements
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7217);
jQuery.each( a, function() {
            _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 144)", 7217);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7218);
add( this.name, this.value );
        });

    } else {
        // If traditional, encode the "old" way (the way 1.3.2 or older
        // did it), otherwise encode params recursively.
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7224);
for ( prefix in a ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7225);
buildParams( prefix, a[ prefix ], traditional, add );
        }
    }

    // Return the resulting serialization
    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7230);
return s.join( "&" ).replace( r20, "+" );
};

_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7233);
function buildParams( prefix, obj, traditional, add ) {
    _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "buildParams", 7233);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7234);
var name;

    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7236);
if ( jQuery.isArray( obj ) ) {
        // Serialize array item.
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7238);
jQuery.each( obj, function( i, v ) {
            _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 145)", 7238);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7239);
if ( traditional || rbracket.test( prefix ) ) {
                // Treat each array item as a scalar.
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7241);
add( prefix, v );

            } else {
                // If array item is non-scalar (array or object), encode its
                // numeric index to resolve deserialization ambiguity issues.
                // Note that rack (as of 1.0.0) can't currently deserialize
                // nested arrays properly, and attempting to do so may cause
                // a server error. Possible fixes are to modify rack's
                // deserialization algorithm or to provide an option or flag
                // to force array serialization to be shallow.
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7251);
buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
            }
        });

    } else {_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7255);
if ( !traditional && jQuery.type( obj ) === "object" ) {
        // Serialize object item.
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7257);
for ( name in obj ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7258);
buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
        }

    } else {
        // Serialize scalar item.
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7263);
add( prefix, obj );
    }}
}
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7266);
var
    // Document location
    ajaxLocParts,
    ajaxLocation,

    rhash = /#.*$/,
    rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, // IE leaves an \r character at EOL
    // #7653, #8125, #8152: local protocol detection
    rlocalProtocol = /^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,
    rnoContent = /^(?:GET|HEAD)$/,
    rprotocol = /^\/\//,
    rquery = /\?/,
    rscript = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    rts = /([?&])_=[^&]*/,
    rurl = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,

    // Keep a copy of the old load method
    _load = jQuery.fn.load,

    /* Prefilters
     * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
     * 2) These are called:
     *    - BEFORE asking for a transport
     *    - AFTER param serialization (s.data is a string if s.processData is true)
     * 3) key is the dataType
     * 4) the catchall symbol "*" can be used
     * 5) execution will start with transport dataType and THEN continue down to "*" if needed
     */
    prefilters = {},

    /* Transports bindings
     * 1) key is the dataType
     * 2) the catchall symbol "*" can be used
     * 3) selection will start with transport dataType and THEN go to "*" if needed
     */
    transports = {},

    // Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
    allTypes = ["*/"] + ["*"];

// #8138, IE may throw an exception when accessing
// a field from window.location if document.domain has been set
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7308);
try {
    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7309);
ajaxLocation = location.href;
} catch( e ) {
    // Use the href attribute of an A element
    // since IE will modify it given document.location
    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7313);
ajaxLocation = document.createElement( "a" );
    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7314);
ajaxLocation.href = "";
    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7315);
ajaxLocation = ajaxLocation.href;
}

// Segment location into parts
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7319);
ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7322);
function addToPrefiltersOrTransports( structure ) {

    // dataTypeExpression is optional and defaults to "*"
    _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "addToPrefiltersOrTransports", 7322);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7325);
return function( dataTypeExpression, func ) {

        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 146)", 7325);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7327);
if ( typeof dataTypeExpression !== "string" ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7328);
func = dataTypeExpression;
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7329);
dataTypeExpression = "*";
        }

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7332);
var dataType, list, placeBefore,
            dataTypes = dataTypeExpression.toLowerCase().split( core_rspace ),
            i = 0,
            length = dataTypes.length;

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7337);
if ( jQuery.isFunction( func ) ) {
            // For each dataType in the dataTypeExpression
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7339);
for ( ; i < length; i++ ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7340);
dataType = dataTypes[ i ];
                // We control if we're asked to add before
                // any existing element
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7343);
placeBefore = /^\+/.test( dataType );
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7344);
if ( placeBefore ) {
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7345);
dataType = dataType.substr( 1 ) || "*";
                }
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7347);
list = structure[ dataType ] = structure[ dataType ] || [];
                // then we add to the structure accordingly
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7349);
list[ placeBefore ? "unshift" : "push" ]( func );
            }
        }
    };
}

// Base inspection function for prefilters and transports
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7356);
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR,
        dataType /* internal */, inspected /* internal */ ) {

    _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "inspectPrefiltersOrTransports", 7356);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7359);
dataType = dataType || options.dataTypes[ 0 ];
    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7360);
inspected = inspected || {};

    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7362);
inspected[ dataType ] = true;

    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7364);
var selection,
        list = structure[ dataType ],
        i = 0,
        length = list ? list.length : 0,
        executeOnly = ( structure === prefilters );

    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7370);
for ( ; i < length && ( executeOnly || !selection ); i++ ) {
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7371);
selection = list[ i ]( options, originalOptions, jqXHR );
        // If we got redirected to another dataType
        // we try there if executing only and not done already
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7374);
if ( typeof selection === "string" ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7375);
if ( !executeOnly || inspected[ selection ] ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7376);
selection = undefined;
            } else {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7378);
options.dataTypes.unshift( selection );
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7379);
selection = inspectPrefiltersOrTransports(
                        structure, options, originalOptions, jqXHR, selection, inspected );
            }
        }
    }
    // If we're only executing or nothing was selected
    // we try the catchall dataType if not done already
    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7386);
if ( ( executeOnly || !selection ) && !inspected[ "*" ] ) {
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7387);
selection = inspectPrefiltersOrTransports(
                structure, options, originalOptions, jqXHR, "*", inspected );
    }
    // unnecessary when only executing (prefilters)
    // but it'll be ignored by the caller in that case
    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7392);
return selection;
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7398);
function ajaxExtend( target, src ) {
    _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "ajaxExtend", 7398);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7399);
var key, deep,
        flatOptions = jQuery.ajaxSettings.flatOptions || {};
    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7401);
for ( key in src ) {
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7402);
if ( src[ key ] !== undefined ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7403);
( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
        }
    }
    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7406);
if ( deep ) {
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7407);
jQuery.extend( true, target, deep );
    }
}

_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7411);
jQuery.fn.load = function( url, params, callback ) {
    _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "load", 7411);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7412);
if ( typeof url !== "string" && _load ) {
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7413);
return _load.apply( this, arguments );
    }

    // Don't do a request if no elements are being requested
    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7417);
if ( !this.length ) {
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7418);
return this;
    }

    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7421);
var selector, type, response,
        self = this,
        off = url.indexOf(" ");

    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7425);
if ( off >= 0 ) {
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7426);
selector = url.slice( off, url.length );
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7427);
url = url.slice( 0, off );
    }

    // If it's a function
    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7431);
if ( jQuery.isFunction( params ) ) {

        // We assume that it's the callback
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7434);
callback = params;
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7435);
params = undefined;

    // Otherwise, build a param string
    } else {_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7438);
if ( params && typeof params === "object" ) {
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7439);
type = "POST";
    }}

    // Request the remote document
    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7443);
jQuery.ajax({
        url: url,

        // if "type" variable is undefined, then "GET" method will be used
        type: type,
        dataType: "html",
        data: params,
        complete: function( jqXHR, status ) {
            _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "complete", 7450);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7451);
if ( callback ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7452);
self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
            }
        }
    }).done(function( responseText ) {

        // Save response for use in complete callback
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 147)", 7455);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7458);
response = arguments;

        // See if a selector was specified
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7461);
self.html( selector ?

            // Create a dummy div to hold the results
            jQuery("<div>")

                // inject the contents of the document in, removing the scripts
                // to avoid any 'Permission Denied' errors in IE
                .append( responseText.replace( rscript, "" ) )

                // Locate the specified elements
                .find( selector ) :

            // If not, just inject the full result
            responseText );

    });

    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7478);
return this;
};

// Attach a bunch of functions for handling common AJAX events
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7482);
jQuery.each( "ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split( " " ), function( i, o ){
    _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 148)", 7482);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7483);
jQuery.fn[ o ] = function( f ){
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "]", 7483);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7484);
return this.on( o, f );
    };
});

_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7488);
jQuery.each( [ "get", "post" ], function( i, method ) {
    _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 149)", 7488);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7489);
jQuery[ method ] = function( url, data, callback, type ) {
        // shift arguments if data argument was omitted
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "]", 7489);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7491);
if ( jQuery.isFunction( data ) ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7492);
type = type || callback;
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7493);
callback = data;
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7494);
data = undefined;
        }

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7497);
return jQuery.ajax({
            type: method,
            url: url,
            data: data,
            success: callback,
            dataType: type
        });
    };
});

_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7507);
jQuery.extend({

    getScript: function( url, callback ) {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "getScript", 7509);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7510);
return jQuery.get( url, undefined, callback, "script" );
    },

    getJSON: function( url, data, callback ) {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "getJSON", 7513);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7514);
return jQuery.get( url, data, callback, "json" );
    },

    // Creates a full fledged settings object into target
    // with both ajaxSettings and settings fields.
    // If target is omitted, writes into ajaxSettings.
    ajaxSetup: function( target, settings ) {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "ajaxSetup", 7520);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7521);
if ( settings ) {
            // Building a settings object
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7523);
ajaxExtend( target, jQuery.ajaxSettings );
        } else {
            // Extending ajaxSettings
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7526);
settings = target;
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7527);
target = jQuery.ajaxSettings;
        }
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7529);
ajaxExtend( target, settings );
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7530);
return target;
    },

    ajaxSettings: {
        url: ajaxLocation,
        isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
        global: true,
        type: "GET",
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        processData: true,
        async: true,
        /*
        timeout: 0,
        data: null,
        dataType: null,
        username: null,
        password: null,
        cache: null,
        throws: false,
        traditional: false,
        headers: {},
        */

        accepts: {
            xml: "application/xml, text/xml",
            html: "text/html",
            text: "text/plain",
            json: "application/json, text/javascript",
            "*": allTypes
        },

        contents: {
            xml: /xml/,
            html: /html/,
            json: /json/
        },

        responseFields: {
            xml: "responseXML",
            text: "responseText"
        },

        // List of data converters
        // 1) key format is "source_type destination_type" (a single space in-between)
        // 2) the catchall symbol "*" can be used for source_type
        converters: {

            // Convert anything to text
            "* text": window.String,

            // Text to html (true = no transformation)
            "text html": true,

            // Evaluate text as a json expression
            "text json": jQuery.parseJSON,

            // Parse text as xml
            "text xml": jQuery.parseXML
        },

        // For options that shouldn't be deep extended:
        // you can add your own custom options here if
        // and when you create one that shouldn't be
        // deep extended (see ajaxExtend)
        flatOptions: {
            context: true,
            url: true
        }
    },

    ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
    ajaxTransport: addToPrefiltersOrTransports( transports ),

    // Main method
    ajax: function( url, options ) {

        // If url is an object, simulate pre-1.5 signature
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "ajax", 7604);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7607);
if ( typeof url === "object" ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7608);
options = url;
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7609);
url = undefined;
        }

        // Force options to be an object
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7613);
options = options || {};

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7615);
var // ifModified key
            ifModifiedKey,
            // Response headers
            responseHeadersString,
            responseHeaders,
            // transport
            transport,
            // timeout handle
            timeoutTimer,
            // Cross-domain detection vars
            parts,
            // To know if global events are to be dispatched
            fireGlobals,
            // Loop variable
            i,
            // Create the final options object
            s = jQuery.ajaxSetup( {}, options ),
            // Callbacks context
            callbackContext = s.context || s,
            // Context for global events
            // It's the callbackContext if one was provided in the options
            // and if it's a DOM node or a jQuery collection
            globalEventContext = callbackContext !== s &&
                ( callbackContext.nodeType || callbackContext instanceof jQuery ) ?
                        jQuery( callbackContext ) : jQuery.event,
            // Deferreds
            deferred = jQuery.Deferred(),
            completeDeferred = jQuery.Callbacks( "once memory" ),
            // Status-dependent callbacks
            statusCode = s.statusCode || {},
            // Headers (they are sent all at once)
            requestHeaders = {},
            requestHeadersNames = {},
            // The jqXHR state
            state = 0,
            // Default abort message
            strAbort = "canceled",
            // Fake xhr
            jqXHR = {

                readyState: 0,

                // Caches the header
                setRequestHeader: function( name, value ) {
                    _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "setRequestHeader", 7658);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7659);
if ( !state ) {
                        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7660);
var lname = name.toLowerCase();
                        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7661);
name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
                        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7662);
requestHeaders[ name ] = value;
                    }
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7664);
return this;
                },

                // Raw string
                getAllResponseHeaders: function() {
                    _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "getAllResponseHeaders", 7668);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7669);
return state === 2 ? responseHeadersString : null;
                },

                // Builds headers hashtable if needed
                getResponseHeader: function( key ) {
                    _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "getResponseHeader", 7673);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7674);
var match;
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7675);
if ( state === 2 ) {
                        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7676);
if ( !responseHeaders ) {
                            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7677);
responseHeaders = {};
                            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7678);
while( ( match = rheaders.exec( responseHeadersString ) ) ) {
                                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7679);
responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
                            }
                        }
                        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7682);
match = responseHeaders[ key.toLowerCase() ];
                    }
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7684);
return match === undefined ? null : match;
                },

                // Overrides response content-type header
                overrideMimeType: function( type ) {
                    _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "overrideMimeType", 7688);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7689);
if ( !state ) {
                        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7690);
s.mimeType = type;
                    }
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7692);
return this;
                },

                // Cancel the request
                abort: function( statusText ) {
                    _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "abort", 7696);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7697);
statusText = statusText || strAbort;
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7698);
if ( transport ) {
                        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7699);
transport.abort( statusText );
                    }
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7701);
done( 0, statusText );
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7702);
return this;
                }
            };

        // Callback for when everything is done
        // It is defined here because jslint complains if it is declared
        // at the end of the function (which would be more logical and readable)
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7709);
function done( status, nativeStatusText, responses, headers ) {
            _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "done", 7709);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7710);
var isSuccess, success, error, response, modified,
                statusText = nativeStatusText;

            // Called once
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7714);
if ( state === 2 ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7715);
return;
            }

            // State is "done" now
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7719);
state = 2;

            // Clear timeout if it exists
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7722);
if ( timeoutTimer ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7723);
clearTimeout( timeoutTimer );
            }

            // Dereference transport for early garbage collection
            // (no matter how long the jqXHR object will be used)
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7728);
transport = undefined;

            // Cache response headers
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7731);
responseHeadersString = headers || "";

            // Set readyState
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7734);
jqXHR.readyState = status > 0 ? 4 : 0;

            // Get response data
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7737);
if ( responses ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7738);
response = ajaxHandleResponses( s, jqXHR, responses );
            }

            // If successful, handle type chaining
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7742);
if ( status >= 200 && status < 300 || status === 304 ) {

                // Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7745);
if ( s.ifModified ) {

                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7747);
modified = jqXHR.getResponseHeader("Last-Modified");
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7748);
if ( modified ) {
                        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7749);
jQuery.lastModified[ ifModifiedKey ] = modified;
                    }
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7751);
modified = jqXHR.getResponseHeader("Etag");
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7752);
if ( modified ) {
                        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7753);
jQuery.etag[ ifModifiedKey ] = modified;
                    }
                }

                // If not modified
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7758);
if ( status === 304 ) {

                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7760);
statusText = "notmodified";
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7761);
isSuccess = true;

                // If we have data
                } else {

                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7766);
isSuccess = ajaxConvert( s, response );
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7767);
statusText = isSuccess.state;
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7768);
success = isSuccess.data;
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7769);
error = isSuccess.error;
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7770);
isSuccess = !error;
                }
            } else {
                // We extract error from statusText
                // then normalize statusText and status for non-aborts
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7775);
error = statusText;
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7776);
if ( !statusText || status ) {
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7777);
statusText = "error";
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7778);
if ( status < 0 ) {
                        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7779);
status = 0;
                    }
                }
            }

            // Set data for the fake xhr object
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7785);
jqXHR.status = status;
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7786);
jqXHR.statusText = ( nativeStatusText || statusText ) + "";

            // Success/Error
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7789);
if ( isSuccess ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7790);
deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
            } else {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7792);
deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
            }

            // Status-dependent callbacks
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7796);
jqXHR.statusCode( statusCode );
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7797);
statusCode = undefined;

            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7799);
if ( fireGlobals ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7800);
globalEventContext.trigger( "ajax" + ( isSuccess ? "Success" : "Error" ),
                        [ jqXHR, s, isSuccess ? success : error ] );
            }

            // Complete
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7805);
completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7807);
if ( fireGlobals ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7808);
globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
                // Handle the global AJAX counter
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7810);
if ( !( --jQuery.active ) ) {
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7811);
jQuery.event.trigger( "ajaxStop" );
                }
            }
        }

        // Attach deferreds
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7817);
deferred.promise( jqXHR );
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7818);
jqXHR.success = jqXHR.done;
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7819);
jqXHR.error = jqXHR.fail;
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7820);
jqXHR.complete = completeDeferred.add;

        // Status-dependent callbacks
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7823);
jqXHR.statusCode = function( map ) {
            _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "statusCode", 7823);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7824);
if ( map ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7825);
var tmp;
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7826);
if ( state < 2 ) {
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7827);
for ( tmp in map ) {
                        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7828);
statusCode[ tmp ] = [ statusCode[tmp], map[tmp] ];
                    }
                } else {
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7831);
tmp = map[ jqXHR.status ];
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7832);
jqXHR.always( tmp );
                }
            }
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7835);
return this;
        };

        // Remove hash character (#7531: and string promotion)
        // Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
        // We also use the url parameter if available
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7841);
s.url = ( ( url || s.url ) + "" ).replace( rhash, "" ).replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

        // Extract dataTypes list
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7844);
s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().split( core_rspace );

        // A cross-domain request is in order when we have a protocol:host:port mismatch
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7847);
if ( s.crossDomain == null ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7848);
parts = rurl.exec( s.url.toLowerCase() ) || false;
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7849);
s.crossDomain = parts && ( parts.join(":") + ( parts[ 3 ] ? "" : parts[ 1 ] === "http:" ? 80 : 443 ) ) !==
                ( ajaxLocParts.join(":") + ( ajaxLocParts[ 3 ] ? "" : ajaxLocParts[ 1 ] === "http:" ? 80 : 443 ) );
        }

        // Convert data if not already a string
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7854);
if ( s.data && s.processData && typeof s.data !== "string" ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7855);
s.data = jQuery.param( s.data, s.traditional );
        }

        // Apply prefilters
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7859);
inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

        // If request was aborted inside a prefilter, stop there
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7862);
if ( state === 2 ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7863);
return jqXHR;
        }

        // We can fire global events as of now if asked to
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7867);
fireGlobals = s.global;

        // Uppercase the type
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7870);
s.type = s.type.toUpperCase();

        // Determine if request has content
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7873);
s.hasContent = !rnoContent.test( s.type );

        // Watch for a new set of requests
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7876);
if ( fireGlobals && jQuery.active++ === 0 ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7877);
jQuery.event.trigger( "ajaxStart" );
        }

        // More options handling for requests with no content
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7881);
if ( !s.hasContent ) {

            // If data is available, append data to url
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7884);
if ( s.data ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7885);
s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.data;
                // #9682: remove data so that it's not used in an eventual retry
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7887);
delete s.data;
            }

            // Get ifModifiedKey before adding the anti-cache parameter
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7891);
ifModifiedKey = s.url;

            // Add anti-cache in url if needed
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7894);
if ( s.cache === false ) {

                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7896);
var ts = jQuery.now(),
                    // try replacing _= if it is there
                    ret = s.url.replace( rts, "$1_=" + ts );

                // if nothing was replaced, add timestamp to the end
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7901);
s.url = ret + ( ( ret === s.url ) ? ( rquery.test( s.url ) ? "&" : "?" ) + "_=" + ts : "" );
            }
        }

        // Set the correct header, if data is being sent
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7906);
if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7907);
jqXHR.setRequestHeader( "Content-Type", s.contentType );
        }

        // Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7911);
if ( s.ifModified ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7912);
ifModifiedKey = ifModifiedKey || s.url;
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7913);
if ( jQuery.lastModified[ ifModifiedKey ] ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7914);
jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ ifModifiedKey ] );
            }
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7916);
if ( jQuery.etag[ ifModifiedKey ] ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7917);
jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ ifModifiedKey ] );
            }
        }

        // Set the Accepts header for the server, depending on the dataType
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7922);
jqXHR.setRequestHeader(
            "Accept",
            s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
                s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
                s.accepts[ "*" ]
        );

        // Check for headers option
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7930);
for ( i in s.headers ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7931);
jqXHR.setRequestHeader( i, s.headers[ i ] );
        }

        // Allow custom headers/mimetypes and early abort
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7935);
if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
                // Abort if not done already and return
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7937);
return jqXHR.abort();

        }

        // aborting is no longer a cancellation
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7942);
strAbort = "abort";

        // Install callbacks on deferreds
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7945);
for ( i in { success: 1, error: 1, complete: 1 } ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7946);
jqXHR[ i ]( s[ i ] );
        }

        // Get transport
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7950);
transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

        // If no transport, we auto-abort
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7953);
if ( !transport ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7954);
done( -1, "No Transport" );
        } else {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7956);
jqXHR.readyState = 1;
            // Send global event
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7958);
if ( fireGlobals ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7959);
globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
            }
            // Timeout
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7962);
if ( s.async && s.timeout > 0 ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7963);
timeoutTimer = setTimeout( function(){
                    _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 150)", 7963);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7964);
jqXHR.abort( "timeout" );
                }, s.timeout );
            }

            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7968);
try {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7969);
state = 1;
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7970);
transport.send( requestHeaders, done );
            } catch (e) {
                // Propagate exception as error if not done
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7973);
if ( state < 2 ) {
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7974);
done( -1, e );
                // Simply rethrow otherwise
                } else {
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7977);
throw e;
                }
            }
        }

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7982);
return jqXHR;
    },

    // Counter for holding the number of active queries
    active: 0,

    // Last-Modified header cache for next request
    lastModified: {},
    etag: {}

});

/* Handles responses to an ajax request:
 * - sets all responseXXX fields accordingly
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 7999);
function ajaxHandleResponses( s, jqXHR, responses ) {

    _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "ajaxHandleResponses", 7999);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8001);
var ct, type, finalDataType, firstDataType,
        contents = s.contents,
        dataTypes = s.dataTypes,
        responseFields = s.responseFields;

    // Fill responseXXX fields
    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8007);
for ( type in responseFields ) {
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8008);
if ( type in responses ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8009);
jqXHR[ responseFields[type] ] = responses[ type ];
        }
    }

    // Remove auto dataType and get content-type in the process
    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8014);
while( dataTypes[ 0 ] === "*" ) {
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8015);
dataTypes.shift();
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8016);
if ( ct === undefined ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8017);
ct = s.mimeType || jqXHR.getResponseHeader( "content-type" );
        }
    }

    // Check if we're dealing with a known content-type
    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8022);
if ( ct ) {
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8023);
for ( type in contents ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8024);
if ( contents[ type ] && contents[ type ].test( ct ) ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8025);
dataTypes.unshift( type );
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8026);
break;
            }
        }
    }

    // Check to see if we have a response for the expected dataType
    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8032);
if ( dataTypes[ 0 ] in responses ) {
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8033);
finalDataType = dataTypes[ 0 ];
    } else {
        // Try convertible dataTypes
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8036);
for ( type in responses ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8037);
if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8038);
finalDataType = type;
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8039);
break;
            }
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8041);
if ( !firstDataType ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8042);
firstDataType = type;
            }
        }
        // Or just use first one
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8046);
finalDataType = finalDataType || firstDataType;
    }

    // If we found a dataType
    // We add the dataType to the list if needed
    // and return the corresponding response
    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8052);
if ( finalDataType ) {
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8053);
if ( finalDataType !== dataTypes[ 0 ] ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8054);
dataTypes.unshift( finalDataType );
        }
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8056);
return responses[ finalDataType ];
    }
}

// Chain conversions given the request and the original response
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8061);
function ajaxConvert( s, response ) {

    _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "ajaxConvert", 8061);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8063);
var conv, conv2, current, tmp,
        // Work with a copy of dataTypes in case we need to modify it for conversion
        dataTypes = s.dataTypes.slice(),
        prev = dataTypes[ 0 ],
        converters = {},
        i = 0;

    // Apply the dataFilter if provided
    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8071);
if ( s.dataFilter ) {
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8072);
response = s.dataFilter( response, s.dataType );
    }

    // Create converters map with lowercased keys
    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8076);
if ( dataTypes[ 1 ] ) {
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8077);
for ( conv in s.converters ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8078);
converters[ conv.toLowerCase() ] = s.converters[ conv ];
        }
    }

    // Convert to each sequential dataType, tolerating list modification
    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8083);
for ( ; (current = dataTypes[++i]); ) {

        // There's only work to do if current dataType is non-auto
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8086);
if ( current !== "*" ) {

            // Convert response if prev dataType is non-auto and differs from current
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8089);
if ( prev !== "*" && prev !== current ) {

                // Seek a direct converter
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8092);
conv = converters[ prev + " " + current ] || converters[ "* " + current ];

                // If none found, seek a pair
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8095);
if ( !conv ) {
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8096);
for ( conv2 in converters ) {

                        // If conv2 outputs current
                        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8099);
tmp = conv2.split(" ");
                        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8100);
if ( tmp[ 1 ] === current ) {

                            // If prev can be converted to accepted input
                            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8103);
conv = converters[ prev + " " + tmp[ 0 ] ] ||
                                converters[ "* " + tmp[ 0 ] ];
                            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8105);
if ( conv ) {
                                // Condense equivalence converters
                                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8107);
if ( conv === true ) {
                                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8108);
conv = converters[ conv2 ];

                                // Otherwise, insert the intermediate dataType
                                } else {_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8111);
if ( converters[ conv2 ] !== true ) {
                                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8112);
current = tmp[ 0 ];
                                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8113);
dataTypes.splice( i--, 0, current );
                                }}

                                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8116);
break;
                            }
                        }
                    }
                }

                // Apply converter (if not an equivalence)
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8123);
if ( conv !== true ) {

                    // Unless errors are allowed to bubble, catch and return them
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8126);
if ( conv && s["throws"] ) {
                        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8127);
response = conv( response );
                    } else {
                        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8129);
try {
                            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8130);
response = conv( response );
                        } catch ( e ) {
                            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8132);
return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
                        }
                    }
                }
            }

            // Update prev for next iteration
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8139);
prev = current;
        }
    }

    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8143);
return { state: "success", data: response };
}
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8145);
var oldCallbacks = [],
    rquestion = /\?/,
    rjsonp = /(=)\?(?=&|$)|\?\?/,
    nonce = jQuery.now();

// Default jsonp settings
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8151);
jQuery.ajaxSetup({
    jsonp: "callback",
    jsonpCallback: function() {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "jsonpCallback", 8153);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8154);
var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8155);
this[ callback ] = true;
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8156);
return callback;
    }
});

// Detect, normalize options and install callbacks for jsonp requests
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8161);
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

    _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 151)", 8161);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8163);
var callbackName, overwritten, responseContainer,
        data = s.data,
        url = s.url,
        hasCallback = s.jsonp !== false,
        replaceInUrl = hasCallback && rjsonp.test( url ),
        replaceInData = hasCallback && !replaceInUrl && typeof data === "string" &&
            !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") &&
            rjsonp.test( data );

    // Handle iff the expected data type is "jsonp" or we have a parameter to set
    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8173);
if ( s.dataTypes[ 0 ] === "jsonp" || replaceInUrl || replaceInData ) {

        // Get callback name, remembering preexisting value associated with it
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8176);
callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
            s.jsonpCallback() :
            s.jsonpCallback;
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8179);
overwritten = window[ callbackName ];

        // Insert callback into url or form data
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8182);
if ( replaceInUrl ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8183);
s.url = url.replace( rjsonp, "$1" + callbackName );
        } else {_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8184);
if ( replaceInData ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8185);
s.data = data.replace( rjsonp, "$1" + callbackName );
        } else {_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8186);
if ( hasCallback ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8187);
s.url += ( rquestion.test( url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
        }}}

        // Use data converter to retrieve json after script execution
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8191);
s.converters["script json"] = function() {
            _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "]", 8191);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8192);
if ( !responseContainer ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8193);
jQuery.error( callbackName + " was not called" );
            }
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8195);
return responseContainer[ 0 ];
        };

        // force json dataType
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8199);
s.dataTypes[ 0 ] = "json";

        // Install callback
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8202);
window[ callbackName ] = function() {
            _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "]", 8202);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8203);
responseContainer = arguments;
        };

        // Clean-up function (fires after converters)
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8207);
jqXHR.always(function() {
            // Restore preexisting value
            _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 152)", 8207);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8209);
window[ callbackName ] = overwritten;

            // Save back as free
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8212);
if ( s[ callbackName ] ) {
                // make sure that re-using the options doesn't screw things around
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8214);
s.jsonpCallback = originalSettings.jsonpCallback;

                // save the callback name for future use
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8217);
oldCallbacks.push( callbackName );
            }

            // Call if it was a function and we have a response
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8221);
if ( responseContainer && jQuery.isFunction( overwritten ) ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8222);
overwritten( responseContainer[ 0 ] );
            }

            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8225);
responseContainer = overwritten = undefined;
        });

        // Delegate to script
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8229);
return "script";
    }
});
// Install script dataType
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8233);
jQuery.ajaxSetup({
    accepts: {
        script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
    },
    contents: {
        script: /javascript|ecmascript/
    },
    converters: {
        "text script": function( text ) {
            _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "\"text script\"", 8241);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8242);
jQuery.globalEval( text );
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8243);
return text;
        }
    }
});

// Handle cache's special case and global
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8249);
jQuery.ajaxPrefilter( "script", function( s ) {
    _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 153)", 8249);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8250);
if ( s.cache === undefined ) {
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8251);
s.cache = false;
    }
    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8253);
if ( s.crossDomain ) {
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8254);
s.type = "GET";
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8255);
s.global = false;
    }
});

// Bind script tag hack transport
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8260);
jQuery.ajaxTransport( "script", function(s) {

    // This transport only deals with cross domain requests
    _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 154)", 8260);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8263);
if ( s.crossDomain ) {

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8265);
var script,
            head = document.head || document.getElementsByTagName( "head" )[0] || document.documentElement;

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8268);
return {

            send: function( _, callback ) {

                _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "send", 8270);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8272);
script = document.createElement( "script" );

                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8274);
script.async = "async";

                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8276);
if ( s.scriptCharset ) {
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8277);
script.charset = s.scriptCharset;
                }

                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8280);
script.src = s.url;

                // Attach handlers for all browsers
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8283);
script.onload = script.onreadystatechange = function( _, isAbort ) {

                    _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "onreadystatechange", 8283);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8285);
if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

                        // Handle memory leak in IE
                        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8288);
script.onload = script.onreadystatechange = null;

                        // Remove the script
                        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8291);
if ( head && script.parentNode ) {
                            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8292);
head.removeChild( script );
                        }

                        // Dereference the script
                        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8296);
script = undefined;

                        // Callback if not abort
                        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8299);
if ( !isAbort ) {
                            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8300);
callback( 200, "success" );
                        }
                    }
                };
                // Use insertBefore instead of appendChild  to circumvent an IE6 bug.
                // This arises when a base node is used (#2709 and #4378).
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8306);
head.insertBefore( script, head.firstChild );
            },

            abort: function() {
                _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "abort", 8309);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8310);
if ( script ) {
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8311);
script.onload( 0, 1 );
                }
            }
        };
    }
});
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8317);
var xhrCallbacks,
    // #5280: Internet Explorer will keep connections alive if we don't abort on unload
    xhrOnUnloadAbort = window.ActiveXObject ? function() {
        // Abort all pending requests
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 155)", 8319);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8321);
for ( var key in xhrCallbacks ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8322);
xhrCallbacks[ key ]( 0, 1 );
        }
    } : false,
    xhrId = 0;

// Functions to create xhrs
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8328);
function createStandardXHR() {
    _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "createStandardXHR", 8328);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8329);
try {
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8330);
return new window.XMLHttpRequest();
    } catch( e ) {}
}

_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8334);
function createActiveXHR() {
    _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "createActiveXHR", 8334);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8335);
try {
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8336);
return new window.ActiveXObject( "Microsoft.XMLHTTP" );
    } catch( e ) {}
}

// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8342);
jQuery.ajaxSettings.xhr = window.ActiveXObject ?
    /* Microsoft failed to properly
     * implement the XMLHttpRequest in IE7 (can't request local files),
     * so we use the ActiveXObject when it is available
     * Additionally XMLHttpRequest can be disabled in IE7/IE8 so
     * we need a fallback.
     */
    function() {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 156)", 8349);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8350);
return !this.isLocal && createStandardXHR() || createActiveXHR();
    } :
    // For all other browsers, use the standard XMLHttpRequest object
    createStandardXHR;

// Determine support properties
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8356);
(function( xhr ) {
    _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 157)", 8356);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8357);
jQuery.extend( jQuery.support, {
        ajax: !!xhr,
        cors: !!xhr && ( "withCredentials" in xhr )
    });
})( jQuery.ajaxSettings.xhr() );

// Create transport if the browser can provide an xhr
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8364);
if ( jQuery.support.ajax ) {

    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8366);
jQuery.ajaxTransport(function( s ) {
        // Cross domain only allowed if supported through XMLHttpRequest
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 158)", 8366);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8368);
if ( !s.crossDomain || jQuery.support.cors ) {

            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8370);
var callback;

            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8372);
return {
                send: function( headers, complete ) {

                    // Get a new xhr
                    _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "send", 8373);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8376);
var handle, i,
                        xhr = s.xhr();

                    // Open the socket
                    // Passing null username, generates a login popup on Opera (#2865)
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8381);
if ( s.username ) {
                        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8382);
xhr.open( s.type, s.url, s.async, s.username, s.password );
                    } else {
                        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8384);
xhr.open( s.type, s.url, s.async );
                    }

                    // Apply custom fields if provided
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8388);
if ( s.xhrFields ) {
                        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8389);
for ( i in s.xhrFields ) {
                            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8390);
xhr[ i ] = s.xhrFields[ i ];
                        }
                    }

                    // Override mime type if needed
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8395);
if ( s.mimeType && xhr.overrideMimeType ) {
                        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8396);
xhr.overrideMimeType( s.mimeType );
                    }

                    // X-Requested-With header
                    // For cross-domain requests, seeing as conditions for a preflight are
                    // akin to a jigsaw puzzle, we simply never set it to be sure.
                    // (it can always be set on a per-request basis or even using ajaxSetup)
                    // For same-domain requests, won't change header if already provided.
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8404);
if ( !s.crossDomain && !headers["X-Requested-With"] ) {
                        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8405);
headers[ "X-Requested-With" ] = "XMLHttpRequest";
                    }

                    // Need an extra try/catch for cross domain requests in Firefox 3
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8409);
try {
                        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8410);
for ( i in headers ) {
                            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8411);
xhr.setRequestHeader( i, headers[ i ] );
                        }
                    } catch( _ ) {}

                    // Do send the request
                    // This may raise an exception which is actually
                    // handled in jQuery.ajax (so no try/catch here)
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8418);
xhr.send( ( s.hasContent && s.data ) || null );

                    // Listener
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8421);
callback = function( _, isAbort ) {

                        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "callback", 8421);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8423);
var status,
                            statusText,
                            responseHeaders,
                            responses,
                            xml;

                        // Firefox throws exceptions when accessing properties
                        // of an xhr when a network error occurred
                        // http://helpful.knobs-dials.com/index.php/Component_returned_failure_code:_0x80040111_(NS_ERROR_NOT_AVAILABLE)
                        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8432);
try {

                            // Was never called and is aborted or complete
                            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8435);
if ( callback && ( isAbort || xhr.readyState === 4 ) ) {

                                // Only called once
                                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8438);
callback = undefined;

                                // Do not keep as active anymore
                                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8441);
if ( handle ) {
                                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8442);
xhr.onreadystatechange = jQuery.noop;
                                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8443);
if ( xhrOnUnloadAbort ) {
                                        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8444);
delete xhrCallbacks[ handle ];
                                    }
                                }

                                // If it's an abort
                                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8449);
if ( isAbort ) {
                                    // Abort it manually if needed
                                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8451);
if ( xhr.readyState !== 4 ) {
                                        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8452);
xhr.abort();
                                    }
                                } else {
                                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8455);
status = xhr.status;
                                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8456);
responseHeaders = xhr.getAllResponseHeaders();
                                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8457);
responses = {};
                                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8458);
xml = xhr.responseXML;

                                    // Construct response list
                                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8461);
if ( xml && xml.documentElement /* #4958 */ ) {
                                        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8462);
responses.xml = xml;
                                    }

                                    // When requesting binary data, IE6-9 will throw an exception
                                    // on any attempt to access responseText (#11426)
                                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8467);
try {
                                        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8468);
responses.text = xhr.responseText;
                                    } catch( _ ) {
                                    }

                                    // Firefox throws an exception when accessing
                                    // statusText for faulty cross-domain requests
                                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8474);
try {
                                        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8475);
statusText = xhr.statusText;
                                    } catch( e ) {
                                        // We normalize with Webkit giving an empty statusText
                                        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8478);
statusText = "";
                                    }

                                    // Filter status for non standard behaviors

                                    // If the request is local and we have data: assume a success
                                    // (success with no data won't get notified, that's the best we
                                    // can do given current implementations)
                                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8486);
if ( !status && s.isLocal && !s.crossDomain ) {
                                        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8487);
status = responses.text ? 200 : 404;
                                    // IE - #1450: sometimes returns 1223 when it should be 204
                                    } else {_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8489);
if ( status === 1223 ) {
                                        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8490);
status = 204;
                                    }}
                                }
                            }
                        } catch( firefoxAccessException ) {
                            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8495);
if ( !isAbort ) {
                                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8496);
complete( -1, firefoxAccessException );
                            }
                        }

                        // Call complete if needed
                        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8501);
if ( responses ) {
                            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8502);
complete( status, statusText, responses, responseHeaders );
                        }
                    };

                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8506);
if ( !s.async ) {
                        // if we're in sync mode we fire the callback
                        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8508);
callback();
                    } else {_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8509);
if ( xhr.readyState === 4 ) {
                        // (IE6 & IE7) if it's in cache and has been
                        // retrieved directly we need to fire the callback
                        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8512);
setTimeout( callback, 0 );
                    } else {
                        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8514);
handle = ++xhrId;
                        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8515);
if ( xhrOnUnloadAbort ) {
                            // Create the active xhrs callbacks list if needed
                            // and attach the unload handler
                            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8518);
if ( !xhrCallbacks ) {
                                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8519);
xhrCallbacks = {};
                                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8520);
jQuery( window ).unload( xhrOnUnloadAbort );
                            }
                            // Add to list of active xhrs callbacks
                            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8523);
xhrCallbacks[ handle ] = callback;
                        }
                        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8525);
xhr.onreadystatechange = callback;
                    }}
                },

                abort: function() {
                    _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "abort", 8529);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8530);
if ( callback ) {
                        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8531);
callback(0,1);
                    }
                }
            };
        }
    });
}
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8538);
var fxNow, timerId,
    rfxtypes = /^(?:toggle|show|hide)$/,
    rfxnum = new RegExp( "^(?:([-+])=|)(" + core_pnum + ")([a-z%]*)$", "i" ),
    rrun = /queueHooks$/,
    animationPrefilters = [ defaultPrefilter ],
    tweeners = {
        "*": [function( prop, value ) {
            _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 159)", 8544);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8545);
var end, unit,
                tween = this.createTween( prop, value ),
                parts = rfxnum.exec( value ),
                target = tween.cur(),
                start = +target || 0,
                scale = 1,
                maxIterations = 20;

            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8553);
if ( parts ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8554);
end = +parts[2];
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8555);
unit = parts[3] || ( jQuery.cssNumber[ prop ] ? "" : "px" );

                // We need to compute starting value
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8558);
if ( unit !== "px" && start ) {
                    // Iteratively approximate from a nonzero starting point
                    // Prefer the current property, because this process will be trivial if it uses the same units
                    // Fallback to end or a simple constant
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8562);
start = jQuery.css( tween.elem, prop, true ) || end || 1;

                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8564);
do {
                        // If previous iteration zeroed out, double until we get *something*
                        // Use a string for doubling factor so we don't accidentally see scale as unchanged below
                        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8567);
scale = scale || ".5";

                        // Adjust and apply
                        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8570);
start = start / scale;
                        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8571);
jQuery.style( tween.elem, prop, start + unit );

                    // Update scale, tolerating zero or NaN from tween.cur()
                    // And breaking the loop if scale is unchanged or perfect, or if we've just had enough
                    }while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
                }

                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8578);
tween.unit = unit;
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8579);
tween.start = start;
                // If a +=/-= token was provided, we're doing a relative animation
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8581);
tween.end = parts[1] ? start + ( parts[1] + 1 ) * end : end;
            }
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8583);
return tween;
        }]
    };

// Animations created synchronously will run synchronously
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8588);
function createFxNow() {
    _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "createFxNow", 8588);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8589);
setTimeout(function() {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 160)", 8589);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8590);
fxNow = undefined;
    }, 0 );
    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8592);
return ( fxNow = jQuery.now() );
}

_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8595);
function createTweens( animation, props ) {
    _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "createTweens", 8595);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8596);
jQuery.each( props, function( prop, value ) {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 161)", 8596);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8597);
var collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
            index = 0,
            length = collection.length;
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8600);
for ( ; index < length; index++ ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8601);
if ( collection[ index ].call( animation, prop, value ) ) {

                // we're done with this property
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8604);
return;
            }
        }
    });
}

_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8610);
function Animation( elem, properties, options ) {
    _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "Animation", 8610);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8611);
var result,
        index = 0,
        tweenerIndex = 0,
        length = animationPrefilters.length,
        deferred = jQuery.Deferred().always( function() {
            // don't match elem in the :animated selector
            _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 162)", 8615);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8617);
delete tick.elem;
        }),
        tick = function() {
            _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "tick", 8619);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8620);
var currentTime = fxNow || createFxNow(),
                remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
                percent = 1 - ( remaining / animation.duration || 0 ),
                index = 0,
                length = animation.tweens.length;

            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8626);
for ( ; index < length ; index++ ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8627);
animation.tweens[ index ].run( percent );
            }

            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8630);
deferred.notifyWith( elem, [ animation, percent, remaining ]);

            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8632);
if ( percent < 1 && length ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8633);
return remaining;
            } else {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8635);
deferred.resolveWith( elem, [ animation ] );
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8636);
return false;
            }
        },
        animation = deferred.promise({
            elem: elem,
            props: jQuery.extend( {}, properties ),
            opts: jQuery.extend( true, { specialEasing: {} }, options ),
            originalProperties: properties,
            originalOptions: options,
            startTime: fxNow || createFxNow(),
            duration: options.duration,
            tweens: [],
            createTween: function( prop, end, easing ) {
                _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "createTween", 8648);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8649);
var tween = jQuery.Tween( elem, animation.opts, prop, end,
                        animation.opts.specialEasing[ prop ] || animation.opts.easing );
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8651);
animation.tweens.push( tween );
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8652);
return tween;
            },
            stop: function( gotoEnd ) {
                _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "stop", 8654);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8655);
var index = 0,
                    // if we are going to the end, we want to run all the tweens
                    // otherwise we skip this part
                    length = gotoEnd ? animation.tweens.length : 0;

                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8660);
for ( ; index < length ; index++ ) {
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8661);
animation.tweens[ index ].run( 1 );
                }

                // resolve when we played the last frame
                // otherwise, reject
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8666);
if ( gotoEnd ) {
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8667);
deferred.resolveWith( elem, [ animation, gotoEnd ] );
                } else {
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8669);
deferred.rejectWith( elem, [ animation, gotoEnd ] );
                }
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8671);
return this;
            }
        }),
        props = animation.props;

    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8676);
propFilter( props, animation.opts.specialEasing );

    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8678);
for ( ; index < length ; index++ ) {
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8679);
result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8680);
if ( result ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8681);
return result;
        }
    }

    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8685);
createTweens( animation, props );

    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8687);
if ( jQuery.isFunction( animation.opts.start ) ) {
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8688);
animation.opts.start.call( elem, animation );
    }

    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8691);
jQuery.fx.timer(
        jQuery.extend( tick, {
            anim: animation,
            queue: animation.opts.queue,
            elem: elem
        })
    );

    // attach callbacks from options
    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8700);
return animation.progress( animation.opts.progress )
        .done( animation.opts.done, animation.opts.complete )
        .fail( animation.opts.fail )
        .always( animation.opts.always );
}

_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8706);
function propFilter( props, specialEasing ) {
    _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "propFilter", 8706);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8707);
var index, name, easing, value, hooks;

    // camelCase, specialEasing and expand cssHook pass
    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8710);
for ( index in props ) {
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8711);
name = jQuery.camelCase( index );
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8712);
easing = specialEasing[ name ];
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8713);
value = props[ index ];
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8714);
if ( jQuery.isArray( value ) ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8715);
easing = value[ 1 ];
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8716);
value = props[ index ] = value[ 0 ];
        }

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8719);
if ( index !== name ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8720);
props[ name ] = value;
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8721);
delete props[ index ];
        }

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8724);
hooks = jQuery.cssHooks[ name ];
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8725);
if ( hooks && "expand" in hooks ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8726);
value = hooks.expand( value );
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8727);
delete props[ name ];

            // not quite $.extend, this wont overwrite keys already present.
            // also - reusing 'index' from above because we have the correct "name"
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8731);
for ( index in value ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8732);
if ( !( index in props ) ) {
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8733);
props[ index ] = value[ index ];
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8734);
specialEasing[ index ] = easing;
                }
            }
        } else {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8738);
specialEasing[ name ] = easing;
        }
    }
}

_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8743);
jQuery.Animation = jQuery.extend( Animation, {

    tweener: function( props, callback ) {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "tweener", 8745);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8746);
if ( jQuery.isFunction( props ) ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8747);
callback = props;
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8748);
props = [ "*" ];
        } else {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8750);
props = props.split(" ");
        }

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8753);
var prop,
            index = 0,
            length = props.length;

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8757);
for ( ; index < length ; index++ ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8758);
prop = props[ index ];
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8759);
tweeners[ prop ] = tweeners[ prop ] || [];
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8760);
tweeners[ prop ].unshift( callback );
        }
    },

    prefilter: function( callback, prepend ) {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "prefilter", 8764);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8765);
if ( prepend ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8766);
animationPrefilters.unshift( callback );
        } else {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8768);
animationPrefilters.push( callback );
        }
    }
});

_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8773);
function defaultPrefilter( elem, props, opts ) {
    _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "defaultPrefilter", 8773);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8774);
var index, prop, value, length, dataShow, tween, hooks, oldfire,
        anim = this,
        style = elem.style,
        orig = {},
        handled = [],
        hidden = elem.nodeType && isHidden( elem );

    // handle queue: false promises
    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8782);
if ( !opts.queue ) {
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8783);
hooks = jQuery._queueHooks( elem, "fx" );
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8784);
if ( hooks.unqueued == null ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8785);
hooks.unqueued = 0;
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8786);
oldfire = hooks.empty.fire;
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8787);
hooks.empty.fire = function() {
                _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "fire", 8787);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8788);
if ( !hooks.unqueued ) {
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8789);
oldfire();
                }
            };
        }
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8793);
hooks.unqueued++;

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8795);
anim.always(function() {
            // doing this makes sure that the complete handler will be called
            // before this completes
            _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 163)", 8795);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8798);
anim.always(function() {
                _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 164)", 8798);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8799);
hooks.unqueued--;
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8800);
if ( !jQuery.queue( elem, "fx" ).length ) {
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8801);
hooks.empty.fire();
                }
            });
        });
    }

    // height/width overflow pass
    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8808);
if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
        // Make sure that nothing sneaks out
        // Record all 3 overflow attributes because IE does not
        // change the overflow attribute when overflowX and
        // overflowY are set to the same value
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8813);
opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

        // Set display property to inline-block for height/width
        // animations on inline elements that are having width/height animated
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8817);
if ( jQuery.css( elem, "display" ) === "inline" &&
                jQuery.css( elem, "float" ) === "none" ) {

            // inline-level elements accept inline-block;
            // block-level elements need to be inline with layout
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8822);
if ( !jQuery.support.inlineBlockNeedsLayout || css_defaultDisplay( elem.nodeName ) === "inline" ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8823);
style.display = "inline-block";

            } else {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8826);
style.zoom = 1;
            }
        }
    }

    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8831);
if ( opts.overflow ) {
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8832);
style.overflow = "hidden";
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8833);
if ( !jQuery.support.shrinkWrapBlocks ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8834);
anim.done(function() {
                _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 165)", 8834);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8835);
style.overflow = opts.overflow[ 0 ];
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8836);
style.overflowX = opts.overflow[ 1 ];
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8837);
style.overflowY = opts.overflow[ 2 ];
            });
        }
    }


    // show/hide pass
    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8844);
for ( index in props ) {
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8845);
value = props[ index ];
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8846);
if ( rfxtypes.exec( value ) ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8847);
delete props[ index ];
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8848);
if ( value === ( hidden ? "hide" : "show" ) ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8849);
continue;
            }
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8851);
handled.push( index );
        }
    }

    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8855);
length = handled.length;
    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8856);
if ( length ) {
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8857);
dataShow = jQuery._data( elem, "fxshow" ) || jQuery._data( elem, "fxshow", {} );
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8858);
if ( hidden ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8859);
jQuery( elem ).show();
        } else {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8861);
anim.done(function() {
                _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 166)", 8861);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8862);
jQuery( elem ).hide();
            });
        }
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8865);
anim.done(function() {
            _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 167)", 8865);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8866);
var prop;
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8867);
jQuery.removeData( elem, "fxshow", true );
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8868);
for ( prop in orig ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8869);
jQuery.style( elem, prop, orig[ prop ] );
            }
        });
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8872);
for ( index = 0 ; index < length ; index++ ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8873);
prop = handled[ index ];
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8874);
tween = anim.createTween( prop, hidden ? dataShow[ prop ] : 0 );
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8875);
orig[ prop ] = dataShow[ prop ] || jQuery.style( elem, prop );

            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8877);
if ( !( prop in dataShow ) ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8878);
dataShow[ prop ] = tween.start;
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8879);
if ( hidden ) {
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8880);
tween.end = tween.start;
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8881);
tween.start = prop === "width" || prop === "height" ? 1 : 0;
                }
            }
        }
    }
}

_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8888);
function Tween( elem, options, prop, end, easing ) {
    _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "Tween", 8888);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8889);
return new Tween.prototype.init( elem, options, prop, end, easing );
}
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8891);
jQuery.Tween = Tween;

_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8893);
Tween.prototype = {
    constructor: Tween,
    init: function( elem, options, prop, end, easing, unit ) {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "init", 8895);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8896);
this.elem = elem;
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8897);
this.prop = prop;
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8898);
this.easing = easing || "swing";
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8899);
this.options = options;
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8900);
this.start = this.now = this.cur();
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8901);
this.end = end;
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8902);
this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
    },
    cur: function() {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "cur", 8904);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8905);
var hooks = Tween.propHooks[ this.prop ];

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8907);
return hooks && hooks.get ?
            hooks.get( this ) :
            Tween.propHooks._default.get( this );
    },
    run: function( percent ) {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "run", 8911);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8912);
var eased,
            hooks = Tween.propHooks[ this.prop ];

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8915);
if ( this.options.duration ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8916);
this.pos = eased = jQuery.easing[ this.easing ](
                percent, this.options.duration * percent, 0, 1, this.options.duration
            );
        } else {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8920);
this.pos = eased = percent;
        }
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8922);
this.now = ( this.end - this.start ) * eased + this.start;

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8924);
if ( this.options.step ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8925);
this.options.step.call( this.elem, this.now, this );
        }

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8928);
if ( hooks && hooks.set ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8929);
hooks.set( this );
        } else {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8931);
Tween.propHooks._default.set( this );
        }
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8933);
return this;
    }
};

_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8937);
Tween.prototype.init.prototype = Tween.prototype;

_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8939);
Tween.propHooks = {
    _default: {
        get: function( tween ) {
            _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "get", 8941);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8942);
var result;

            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8944);
if ( tween.elem[ tween.prop ] != null &&
                (!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8946);
return tween.elem[ tween.prop ];
            }

            // passing any value as a 4th parameter to .css will automatically
            // attempt a parseFloat and fallback to a string if the parse fails
            // so, simple values such as "10px" are parsed to Float.
            // complex values such as "rotate(1rad)" are returned as is.
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8953);
result = jQuery.css( tween.elem, tween.prop, false, "" );
            // Empty strings, null, undefined and "auto" are converted to 0.
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8955);
return !result || result === "auto" ? 0 : result;
        },
        set: function( tween ) {
            // use step hook for back compat - use cssHook if its there - use .style if its
            // available and use plain properties where available
            _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "set", 8957);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8960);
if ( jQuery.fx.step[ tween.prop ] ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8961);
jQuery.fx.step[ tween.prop ]( tween );
            } else {_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8962);
if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8963);
jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
            } else {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8965);
tween.elem[ tween.prop ] = tween.now;
            }}
        }
    }
};

// Remove in 2.0 - this supports IE8's panic based approach
// to setting things on disconnected nodes

_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8974);
Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
    set: function( tween ) {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "set", 8975);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8976);
if ( tween.elem.nodeType && tween.elem.parentNode ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8977);
tween.elem[ tween.prop ] = tween.now;
        }
    }
};

_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8982);
jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
    _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 168)", 8982);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8983);
var cssFn = jQuery.fn[ name ];
    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8984);
jQuery.fn[ name ] = function( speed, easing, callback ) {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "]", 8984);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8985);
return speed == null || typeof speed === "boolean" ||
            // special check for .toggle( handler, handler, ... )
            ( !i && jQuery.isFunction( speed ) && jQuery.isFunction( easing ) ) ?
            cssFn.apply( this, arguments ) :
            this.animate( genFx( name, true ), speed, easing, callback );
    };
});

_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8993);
jQuery.fn.extend({
    fadeTo: function( speed, to, easing, callback ) {

        // show any hidden elements after setting opacity to 0
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "fadeTo", 8994);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 8997);
return this.filter( isHidden ).css( "opacity", 0 ).show()

            // animate to the value specified
            .end().animate({ opacity: to }, speed, easing, callback );
    },
    animate: function( prop, speed, easing, callback ) {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "animate", 9002);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 9003);
var empty = jQuery.isEmptyObject( prop ),
            optall = jQuery.speed( speed, easing, callback ),
            doAnimation = function() {
                // Operate on a copy of prop so per-property easing won't be lost
                _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "doAnimation", 9005);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 9007);
var anim = Animation( this, jQuery.extend( {}, prop ), optall );

                // Empty animations resolve immediately
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 9010);
if ( empty ) {
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 9011);
anim.stop( true );
                }
            };

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 9015);
return empty || optall.queue === false ?
            this.each( doAnimation ) :
            this.queue( optall.queue, doAnimation );
    },
    stop: function( type, clearQueue, gotoEnd ) {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "stop", 9019);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 9020);
var stopQueue = function( hooks ) {
            _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "stopQueue", 9020);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 9021);
var stop = hooks.stop;
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 9022);
delete hooks.stop;
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 9023);
stop( gotoEnd );
        };

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 9026);
if ( typeof type !== "string" ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 9027);
gotoEnd = clearQueue;
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 9028);
clearQueue = type;
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 9029);
type = undefined;
        }
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 9031);
if ( clearQueue && type !== false ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 9032);
this.queue( type || "fx", [] );
        }

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 9035);
return this.each(function() {
            _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 169)", 9035);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 9036);
var dequeue = true,
                index = type != null && type + "queueHooks",
                timers = jQuery.timers,
                data = jQuery._data( this );

            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 9041);
if ( index ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 9042);
if ( data[ index ] && data[ index ].stop ) {
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 9043);
stopQueue( data[ index ] );
                }
            } else {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 9046);
for ( index in data ) {
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 9047);
if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
                        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 9048);
stopQueue( data[ index ] );
                    }
                }
            }

            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 9053);
for ( index = timers.length; index--; ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 9054);
if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 9055);
timers[ index ].anim.stop( gotoEnd );
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 9056);
dequeue = false;
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 9057);
timers.splice( index, 1 );
                }
            }

            // start the next in the queue if the last step wasn't forced
            // timers currently will call their complete callbacks, which will dequeue
            // but only if they were gotoEnd
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 9064);
if ( dequeue || !gotoEnd ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 9065);
jQuery.dequeue( this, type );
            }
        });
    }
});

// Generate parameters to create a standard animation
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 9072);
function genFx( type, includeWidth ) {
    _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "genFx", 9072);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 9073);
var which,
        attrs = { height: type },
        i = 0;

    // if we include width, step value is 1 to do all cssExpand values,
    // if we don't include width, step value is 2 to skip over Left and Right
    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 9079);
includeWidth = includeWidth? 1 : 0;
    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 9080);
for( ; i < 4 ; i += 2 - includeWidth ) {
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 9081);
which = cssExpand[ i ];
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 9082);
attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
    }

    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 9085);
if ( includeWidth ) {
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 9086);
attrs.opacity = attrs.width = type;
    }

    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 9089);
return attrs;
}

// Generate shortcuts for custom animations
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 9093);
jQuery.each({
    slideDown: genFx("show"),
    slideUp: genFx("hide"),
    slideToggle: genFx("toggle"),
    fadeIn: { opacity: "show" },
    fadeOut: { opacity: "hide" },
    fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
    _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 170)", 9100);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 9101);
jQuery.fn[ name ] = function( speed, easing, callback ) {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "]", 9101);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 9102);
return this.animate( props, speed, easing, callback );
    };
});

_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 9106);
jQuery.speed = function( speed, easing, fn ) {
    _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "speed", 9106);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 9107);
var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
        complete: fn || !fn && easing ||
            jQuery.isFunction( speed ) && speed,
        duration: speed,
        easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
    };

    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 9114);
opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
        opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

    // normalize opt.queue - true/undefined/null -> "fx"
    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 9118);
if ( opt.queue == null || opt.queue === true ) {
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 9119);
opt.queue = "fx";
    }

    // Queueing
    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 9123);
opt.old = opt.complete;

    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 9125);
opt.complete = function() {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "complete", 9125);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 9126);
if ( jQuery.isFunction( opt.old ) ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 9127);
opt.old.call( this );
        }

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 9130);
if ( opt.queue ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 9131);
jQuery.dequeue( this, opt.queue );
        }
    };

    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 9135);
return opt;
};

_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 9138);
jQuery.easing = {
    linear: function( p ) {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "linear", 9139);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 9140);
return p;
    },
    swing: function( p ) {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "swing", 9142);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 9143);
return 0.5 - Math.cos( p*Math.PI ) / 2;
    }
};

_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 9147);
jQuery.timers = [];
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 9148);
jQuery.fx = Tween.prototype.init;
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 9149);
jQuery.fx.tick = function() {
    _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "tick", 9149);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 9150);
var timer,
        timers = jQuery.timers,
        i = 0;

    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 9154);
for ( ; i < timers.length; i++ ) {
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 9155);
timer = timers[ i ];
        // Checks the timer has not already been removed
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 9157);
if ( !timer() && timers[ i ] === timer ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 9158);
timers.splice( i--, 1 );
        }
    }

    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 9162);
if ( !timers.length ) {
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 9163);
jQuery.fx.stop();
    }
};

_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 9167);
jQuery.fx.timer = function( timer ) {
    _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "timer", 9167);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 9168);
if ( timer() && jQuery.timers.push( timer ) && !timerId ) {
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 9169);
timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
    }
};

_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 9173);
jQuery.fx.interval = 13;

_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 9175);
jQuery.fx.stop = function() {
    _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "stop", 9175);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 9176);
clearInterval( timerId );
    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 9177);
timerId = null;
};

_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 9180);
jQuery.fx.speeds = {
    slow: 600,
    fast: 200,
    // Default speed
    _default: 400
};

// Back Compat <1.8 extension point
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 9188);
jQuery.fx.step = {};

_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 9190);
if ( jQuery.expr && jQuery.expr.filters ) {
    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 9191);
jQuery.expr.filters.animated = function( elem ) {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "animated", 9191);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 9192);
return jQuery.grep(jQuery.timers, function( fn ) {
            _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 171)", 9192);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 9193);
return elem === fn.elem;
        }).length;
    };
}
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 9197);
var rroot = /^(?:body|html)$/i;

_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 9199);
jQuery.fn.offset = function( options ) {
    _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "offset", 9199);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 9200);
if ( arguments.length ) {
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 9201);
return options === undefined ?
            this :
            this.each(function( i ) {
                _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 172)", 9203);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 9204);
jQuery.offset.setOffset( this, options, i );
            });
    }

    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 9208);
var docElem, body, win, clientTop, clientLeft, scrollTop, scrollLeft,
        box = { top: 0, left: 0 },
        elem = this[ 0 ],
        doc = elem && elem.ownerDocument;

    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 9213);
if ( !doc ) {
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 9214);
return;
    }

    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 9217);
if ( (body = doc.body) === elem ) {
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 9218);
return jQuery.offset.bodyOffset( elem );
    }

    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 9221);
docElem = doc.documentElement;

    // Make sure it's not a disconnected DOM node
    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 9224);
if ( !jQuery.contains( docElem, elem ) ) {
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 9225);
return box;
    }

    // If we don't have gBCR, just use 0,0 rather than error
    // BlackBerry 5, iOS 3 (original iPhone)
    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 9230);
if ( typeof elem.getBoundingClientRect !== "undefined" ) {
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 9231);
box = elem.getBoundingClientRect();
    }
    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 9233);
win = getWindow( doc );
    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 9234);
clientTop  = docElem.clientTop  || body.clientTop  || 0;
    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 9235);
clientLeft = docElem.clientLeft || body.clientLeft || 0;
    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 9236);
scrollTop  = win.pageYOffset || docElem.scrollTop;
    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 9237);
scrollLeft = win.pageXOffset || docElem.scrollLeft;
    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 9238);
return {
        top: box.top  + scrollTop  - clientTop,
        left: box.left + scrollLeft - clientLeft
    };
};

_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 9244);
jQuery.offset = {

    bodyOffset: function( body ) {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "bodyOffset", 9246);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 9247);
var top = body.offsetTop,
            left = body.offsetLeft;

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 9250);
if ( jQuery.support.doesNotIncludeMarginInBodyOffset ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 9251);
top  += parseFloat( jQuery.css(body, "marginTop") ) || 0;
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 9252);
left += parseFloat( jQuery.css(body, "marginLeft") ) || 0;
        }

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 9255);
return { top: top, left: left };
    },

    setOffset: function( elem, options, i ) {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "setOffset", 9258);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 9259);
var position = jQuery.css( elem, "position" );

        // set position first, in-case top/left are set even on static elem
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 9262);
if ( position === "static" ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 9263);
elem.style.position = "relative";
        }

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 9266);
var curElem = jQuery( elem ),
            curOffset = curElem.offset(),
            curCSSTop = jQuery.css( elem, "top" ),
            curCSSLeft = jQuery.css( elem, "left" ),
            calculatePosition = ( position === "absolute" || position === "fixed" ) && jQuery.inArray("auto", [curCSSTop, curCSSLeft]) > -1,
            props = {}, curPosition = {}, curTop, curLeft;

        // need to be able to calculate position if either top or left is auto and position is either absolute or fixed
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 9274);
if ( calculatePosition ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 9275);
curPosition = curElem.position();
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 9276);
curTop = curPosition.top;
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 9277);
curLeft = curPosition.left;
        } else {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 9279);
curTop = parseFloat( curCSSTop ) || 0;
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 9280);
curLeft = parseFloat( curCSSLeft ) || 0;
        }

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 9283);
if ( jQuery.isFunction( options ) ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 9284);
options = options.call( elem, i, curOffset );
        }

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 9287);
if ( options.top != null ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 9288);
props.top = ( options.top - curOffset.top ) + curTop;
        }
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 9290);
if ( options.left != null ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 9291);
props.left = ( options.left - curOffset.left ) + curLeft;
        }

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 9294);
if ( "using" in options ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 9295);
options.using.call( elem, props );
        } else {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 9297);
curElem.css( props );
        }
    }
};


_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 9303);
jQuery.fn.extend({

    position: function() {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "position", 9305);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 9306);
if ( !this[0] ) {
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 9307);
return;
        }

        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 9310);
var elem = this[0],

        // Get *real* offsetParent
        offsetParent = this.offsetParent(),

        // Get correct offsets
        offset       = this.offset(),
        parentOffset = rroot.test(offsetParent[0].nodeName) ? { top: 0, left: 0 } : offsetParent.offset();

        // Subtract element margins
        // note: when an element has margin: auto the offsetLeft and marginLeft
        // are the same in Safari causing offset.left to incorrectly be 0
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 9322);
offset.top  -= parseFloat( jQuery.css(elem, "marginTop") ) || 0;
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 9323);
offset.left -= parseFloat( jQuery.css(elem, "marginLeft") ) || 0;

        // Add offsetParent borders
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 9326);
parentOffset.top  += parseFloat( jQuery.css(offsetParent[0], "borderTopWidth") ) || 0;
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 9327);
parentOffset.left += parseFloat( jQuery.css(offsetParent[0], "borderLeftWidth") ) || 0;

        // Subtract the two offsets
        _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 9330);
return {
            top:  offset.top  - parentOffset.top,
            left: offset.left - parentOffset.left
        };
    },

    offsetParent: function() {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "offsetParent", 9336);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 9337);
return this.map(function() {
            _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 173)", 9337);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 9338);
var offsetParent = this.offsetParent || document.body;
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 9339);
while ( offsetParent && (!rroot.test(offsetParent.nodeName) && jQuery.css(offsetParent, "position") === "static") ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 9340);
offsetParent = offsetParent.offsetParent;
            }
            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 9342);
return offsetParent || document.body;
        });
    }
});


// Create scrollLeft and scrollTop methods
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 9349);
jQuery.each( {scrollLeft: "pageXOffset", scrollTop: "pageYOffset"}, function( method, prop ) {
    _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 174)", 9349);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 9350);
var top = /Y/.test( prop );

    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 9352);
jQuery.fn[ method ] = function( val ) {
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "]", 9352);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 9353);
return jQuery.access( this, function( elem, method, val ) {
            _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 175)", 9353);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 9354);
var win = getWindow( elem );

            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 9356);
if ( val === undefined ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 9357);
return win ? (prop in win) ? win[ prop ] :
                    win.document.documentElement[ method ] :
                    elem[ method ];
            }

            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 9362);
if ( win ) {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 9363);
win.scrollTo(
                    !top ? val : jQuery( win ).scrollLeft(),
                     top ? val : jQuery( win ).scrollTop()
                );

            } else {
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 9369);
elem[ method ] = val;
            }
        }, method, val, arguments.length, null );
    };
});

_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 9375);
function getWindow( elem ) {
    _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "getWindow", 9375);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 9376);
return jQuery.isWindow( elem ) ?
        elem :
        elem.nodeType === 9 ?
            elem.defaultView || elem.parentWindow :
            false;
}
// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 9383);
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
    _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 176)", 9383);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 9384);
jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
        // margin is only for outerHeight, outerWidth
        _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 177)", 9384);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 9386);
jQuery.fn[ funcName ] = function( margin, value ) {
            _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "]", 9386);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 9387);
var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
                extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

            _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 9390);
return jQuery.access( this, function( elem, type, value ) {
                _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 178)", 9390);
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 9391);
var doc;

                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 9393);
if ( jQuery.isWindow( elem ) ) {
                    // As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
                    // isn't a whole lot we can do. See pull request at this URL for discussion:
                    // https://github.com/jquery/jquery/pull/764
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 9397);
return elem.document.documentElement[ "client" + name ];
                }

                // Get document width or height
                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 9401);
if ( elem.nodeType === 9 ) {
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 9402);
doc = elem.documentElement;

                    // Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height], whichever is greatest
                    // unfortunately, this causes bug #3838 in IE6/8 only, but there is currently no good, small way to fix it.
                    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 9406);
return Math.max(
                        elem.body[ "scroll" + name ], doc[ "scroll" + name ],
                        elem.body[ "offset" + name ], doc[ "offset" + name ],
                        doc[ "client" + name ]
                    );
                }

                _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 9413);
return value === undefined ?
                    // Get width or height on the element, requesting but not forcing parseFloat
                    jQuery.css( elem, type, value, extra ) :

                    // Set width or height on the element
                    jQuery.style( elem, type, value, extra );
            }, type, chainable ? margin : undefined, chainable, null );
        };
    });
});
// Expose jQuery to the global object
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 9424);
window.jQuery = window.$ = jQuery;

// Expose jQuery as an AMD module, but only for AMD loaders that
// understand the issues with loading multiple versions of jQuery
// in a page that all might call define(). The loader will indicate
// they have special allowances for multiple jQuery versions by
// specifying define.amd.jQuery = true. Register as a named module,
// since jQuery can be concatenated with other files that may use define,
// but not use a proper concatenation script that understands anonymous
// AMD modules. A named AMD is safest and most robust way to register.
// Lowercase jquery is used because AMD module names are derived from
// file names, and jQuery is normally delivered in a lowercase file name.
// Do this after creating the global so that if an AMD module wants to call
// noConflict to hide this version of jQuery, it will work.
_yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 9438);
if ( typeof define === "function" && define.amd && define.amd.jQuery ) {
    _yuitest_coverline("build/libbit-jquery/libbit-jquery.js", 9439);
define( "jquery", [], function () { _yuitest_coverfunc("build/libbit-jquery/libbit-jquery.js", "(anonymous 179)", 9439);
return jQuery; } );
}

})( window );


}, '@VERSION@', {"requires": []});
