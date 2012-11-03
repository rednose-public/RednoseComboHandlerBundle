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
_yuitest_coverage["build/gallery-treeble/gallery-treeble.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/gallery-treeble/gallery-treeble.js",
    code: []
};
_yuitest_coverage["build/gallery-treeble/gallery-treeble.js"].code=["YUI.add('gallery-treeble', function (Y, NAME) {","","\"use strict\";","","/**"," * @module gallery-treeble"," */","","/**********************************************************************"," * <p>Hierarchical data source.</p>"," *"," * <p>TreebleDataSource converts a tree of DataSources into a flat list of"," * visible items.  The merged list must be paginated if the number of child"," * nodes might be very large.  To turn on this feature, set"," * paginateChildren:true.</p>"," * "," * <p>The tree must be immutable.  The total number of items available from"," * each DataSource must remain constant.  (The one exception to this rule"," * is that filtering and sorting are allowed.  This is done by detecting"," * that the request parameters have changed.)</p>"," * "," * @namespace DataSource"," * @class Treeble"," * @extends DataSource.Local"," * @constructor"," * @param config {Object}"," */","","function TreebleDataSource()","{","	TreebleDataSource.superclass.constructor.apply(this, arguments);","}","","TreebleDataSource.NAME = \"treebleDataSource\";","","TreebleDataSource.ATTRS =","{","	/**","	 * <p>The root datasource.</p>","	 * ","	 * <p>You <em>must</em> directly set a <code>treeble_config</code>","	 * object on this datasource.  (You cannot use","	 * <code>set('treeble_config',...)</code>.) <code>treeble_config</code> can","	 * contain the following configuration:</p>","	 * ","	 * <dl>","	 * <dt>generateRequest</dt>","	 * <dd>(required) The function to convert the initial request into","	 *		a request usable by the actual DataSource.  This function takes","	 *		two arguments: state (sort,dir,startIndex,resultCount) and path","	 *		(an array of node indices telling how to reach the node).","	 *		</dd>","	 * <dt>requestCfg</dt>","	 * <dd>(optional) Configuration object passed as <code>cfg</code> to","	 *		<code>sendRequest</code>.</dd>","	 * <dt>schemaPluginConfig</dt>","	 * <dd>(required) Object to pass to <code>plug</code> to install a schema.</dd>","	 * <dt>cachePluginConfig</dt>","	 * <dd>(optional) Object to pass to <code>plug</code> to install a cache.</dd>","	 * <dt>childNodesKey</dt>","	 * <dd>(semi-optional) The name of the key inside a node which contains","	 *		the data used to construct the DataSource for retrieving the children.","	 *		This config is only required if you provide a custom parser.</dd>","	 * <dt>nodeOpenKey</dt>","	 * <dd>(optional) The name of the key inside a node which contains","	 *		the initial open state of the node.  If it is true, the node will","	 *		automatically be opened the first time it is shown.  (After that,","	 *		it will remember the state set by the user.)</dd>","	 * <dt>startIndexExpr</dt>","	 * <dd>(optional) OGNL expression telling how to extract the startIndex","	 *		from the received data, e.g., <code>.meta.startIndex</code>.","	 *		If it is not provided, startIndex is always assumed to be zero.</dd>","	 * <dt>totalRecordsExpr</dt>","	 * <dd>(semi-optional) OGNL expression telling how to extract the total number","	 *		of records from the received data, e.g., <code>.meta.totalRecords</code>.","	 *		If this is not provided, <code>totalRecordsReturnExpr</code> must be","	 *		specified.</dd>","	 * <dt>totalRecordsReturnExpr</dt>","	 * <dd>(semi-optional) OGNL expression telling where in the response to store","	 *		the total number of records, e.g., <code>.meta.totalRecords</code>.","	 *		This is only appropriate for DataSources that always return the","	 *		entire data set.  If this is not provided,","	 *		<code>totalRecordsExpr</code> must be specified.  If both are provided,","	 *		<code>totalRecordsExpr</code> takes priority.</dd>","	 * </dl>","	 * ","	 * @attribute root","	 * @type {DataSource}","	 * @writeonce","	 */","	root:","	{","		writeOnce: true","	},","","	/**","	 * Pass <code>true</code> to paginate the result after merging child","	 * nodes into the list.  The default (<code>false</code>) is to","	 * paginate only root nodes, so all children are visible.","	 * ","	 * @attribute paginateChildren","	 * @type {boolean}","	 * @default false","	 * @writeonce","	 */","	paginateChildren:","	{","		value:     false,","		validator: Y.Lang.isBoolean,","		writeOnce: true","	},","","	/**","	 * The key in each record that stores an identifier which is unique","	 * across the entire tree.  If this is not specified, then all nodes","	 * will close when the data is sorted.","	 * ","	 * @attribute uniqueIdKey","	 * @type {String}","	 */","	uniqueIdKey:","	{","		validator: Y.Lang.isString","	}","};","","/*","","	Each element in this._open contains information about an openable,","	top-level node and is the root of a tree of open (or previously opened)","	items.  Each node in a tree contains the following data:","","		index:      {Number} sorting key; the index of the node","		open:       null if never opened, true if open, false otherwise","		ds:         {DataSource} source for child nodes","		childTotal: {Number} total number of child nodes","		children:   {Array} (recursive) child nodes which are or have been opened","		parent:     {Object} parent item","","	Each level is sorted by index to allow simple traversal in display","	order.",""," */","","function populateOpen(","	/* object */	parent,","	/* array */		open,","	/* object */	req)","{","	var data          = req.data;","	var startIndex    = req.start;","	var childNodesKey = req.ds.treeble_config.childNodesKey;","	var nodeOpenKey   = req.ds.treeble_config.nodeOpenKey;","","	for (var j=0; j<open.length; j++)","	{","		if (open[j].index >= startIndex)","		{","			break;","		}","	}","","	var uniqueIdKey = this.get('uniqueIdKey');","","	var result = true;","	for (var k=0; k<data.length; k++)","	{","		var i = startIndex + k;","		var ds = data[k][ childNodesKey ];","		if (!ds)","		{","			continue;","		}","","		while (j < open.length && open[j].index < i)","		{","			open.splice(j, 1);","			result = false;","","			if (uniqueIdKey)","			{","				delete this._open_cache[ data[k][ uniqueIdKey ] ];","			}","		}","","		if (j >= open.length || open[j].index > i)","		{","			var item =","			{","				index:      i,","				open:       null,","				ds:         ds,","				children:   [],","				childTotal: 0,","				parent:     parent","			};","","			var cached_item = null;","			if (uniqueIdKey)","			{","				cached_item = this._open_cache[ data[k][ uniqueIdKey ] ];","				if (cached_item)","				{","					item.open       = cached_item.open;","					item.childTotal = cached_item.childTotal;","					this._redo      = this._redo || item.open;","				}","","				this._open_cache[ data[k][ uniqueIdKey ] ] = item;","			}","","			if (!cached_item && nodeOpenKey && data[k][ nodeOpenKey ])","			{","				this._toggle.push(req.path.concat(i));","			}","","			open.splice(j, 0, item);","		}","","		j++;","	}","","	return result;","}","","// TODO: worth switching to binary search?","function searchOpen(","	/* array */	list,","	/* int */	nodeIndex)","{","	for (var i=0; i<list.length; i++)","	{","		if (list[i].index == nodeIndex)","		{","			return list[i];","		}","	}","","	return false;","}","","function getNode(","	/* array */	path)","{","	var open = this._open;","	var last = path.length-1;","	for (var i=0; i<last; i++)","	{","		var node = searchOpen(open, path[i]);","		open     = node.children;","	}","","	return searchOpen(open, path[last]);","}","","function countVisibleNodes(","","	// not sent by initiator","","	/* array */ open)","{","	var total = 0;","	if (!open)","	{","		open  = this._open;","		total = this._topNodeTotal;","	}","","	if (this.get('paginateChildren'))","	{","		for (var i=0; i<open.length; i++)","		{","			var node = open[i];","			if (node.open)","			{","				total += node.childTotal;","				total += countVisibleNodes.call(this, node.children);","			}","		}","	}","","	return total;","}","","function requestTree()","{","	this._cancelAllRequests();","","	this._redo                = false;","	this._generating_requests = true;","","	var req = this._callback.request;","	if (this.get('paginateChildren'))","	{","		this._slices = getVisibleSlicesPgAll(req.startIndex, req.resultCount,","											 this.get('root'), this._open);","	}","	else","	{","		this._slices = getVisibleSlicesPgTop(req.startIndex, req.resultCount,","											 this.get('root'), this._open);","	}","","	requestSlices.call(this, req);","","	this._generating_requests = false;","	checkFinished.call(this);","}","","function getVisibleSlicesPgTop(","	/* int */			skip,","	/* int */			show,","	/* DataSource */	ds,","	/* array */			open,","","	// not sent by initiator","","	/* array */			path)","{","	open = open.concat(","	{","		index:      -1,","		open:       true,","		childTotal: 0,","		children:   null","	});","","	if (!path)","	{","		path = [];","	}","","	var slices = [],","		send   = false;","","	var m = 0, prev = -1, presend = false;","	for (var i=0; i<open.length; i++)","	{","		var node = open[i];","		if (!node.open)","		{","			continue;","		}","","		var delta = node.index - prev;","","		if (m + delta >= skip + show ||","			node.index == -1)","		{","			slices.push(","			{","				ds:    ds,","				path:  path.slice(0),","				start: send ? m : skip,","				end:   skip + show - 1","			});","","			if (m + delta == skip + show)","			{","				slices = slices.concat(","					getVisibleSlicesPgTop(0, node.childTotal, node.ds,","										  node.children, path.concat(node.index)));","			}","","			return slices;","		}","		else if (!send && m + delta == skip)","		{","			presend = true;","		}","		else if (m + delta > skip)","		{","			slices.push(","			{","				ds:    ds,","				path:  path.slice(0),","				start: send ? prev + 1 : skip,","				end:   m + delta - 1","			});","			send = true;","		}","","		m += delta;","","		if (send && node.childTotal > 0)","		{","			slices = slices.concat(","				getVisibleSlicesPgTop(0, node.childTotal, node.ds,","									  node.children, path.concat(node.index)));","		}","","		prev = node.index;","		send = send || presend;","	}","}","","function getVisibleSlicesPgAll(","	/* int */			skip,","	/* int */			show,","	/* DataSource */	rootDS,","	/* array */			open,","","	// not sent by initiator","","	/* array */			path,","	/* node */			parent,","	/* int */			pre,","	/* bool */			send,","	/* array */			slices)","{","	if (!parent)","	{","		path   = [];","		parent = null;","		pre    = 0;","		send   = false;","		slices = [];","	}","","	var ds = parent ? parent.ds : rootDS;","","	open = open.concat(","	{","		index:      parent ? parent.childTotal : -1,","		open:       true,","		childTotal: 0,","		children:   null","	});","","	var n = 0, m = 0, prev = -1;","	for (var i=0; i<open.length; i++)","	{","		var node = open[i];","		if (!node.open)","		{","			continue;","		}","","		var delta = node.index - prev;","		if (node.children === null)","		{","			delta--;	// last item is off the end","		}","","		if (pre + n + delta >= skip + show ||","			node.index == -1)","		{","			slices.push(","			{","				ds:    ds,","				path:  path.slice(0),","				start: m + (send ? 0 : skip - pre - n),","				end:   m + (skip + show - 1 - pre - n)","			});","","			return slices;","		}","		else if (!send && pre + n + delta == skip)","		{","			send = true;","		}","		else if (pre + n + delta > skip)","		{","			slices.push(","			{","				ds:    ds,","				path:  path.slice(0),","				start: m + (send ? 0 : skip - pre - n),","				end:   m + delta - 1","			});","			send = true;","		}","","		n += delta;","		m += delta;","","		if (node.childTotal > 0)","		{","			var info = getVisibleSlicesPgAll(skip, show, rootDS, node.children,","											 path.concat(node.index),","											 node, pre+n, send, slices);","			if (Y.Lang.isArray(info))","			{","				return info;","			}","			else","			{","				n   += info.count;","				send = info.send;","			}","		}","","		prev = node.index;","	}","","	// only reached when parent != null","","	var info =","	{","		count: n,","		send:  send","	};","	return info;","}","","function requestSlices(","	/* object */	request)","{","	for (var i=0; i<this._slices.length; i++)","	{","		var slice = this._slices[i];","		var ds    = slice.ds;","		var req   = findRequest.call(this, ds);","		if (req)","		{","			if (Y.Console)","			{","				if (req.end+1 < slice.start)","				{","					Y.error('TreebleDataSource found discontinuous range');","				}","","				if (req.path.length != slice.path.length)","				{","					Y.error('TreebleDataSource found path length mismatch');","				}","				else","				{","					for (var j=0; j<slice.path.length; j++)","					{","						if (req.path[j] != slice.path[j])","						{","							Y.error('TreebleDataSource found path mismatch');","							break;","						}","					}","				}","			}","","			req.end = slice.end;","		}","		else","		{","			this._req.push(","			{","				ds:    ds,","				path:  slice.path,","				start: slice.start,","				end:   slice.end","			});","		}","	}","","	request = Y.clone(request, true);","	for (var i=0; i<this._req.length; i++)","	{","		var req             = this._req[i];","		request.startIndex  = req.start;","		request.resultCount = req.end - req.start + 1;","","		req.txId = req.ds.sendRequest(","		{","			request: req.ds.treeble_config.generateRequest(request, req.path),","			cfg:     req.ds.treeble_config.requestCfg,","			callback:","			{","				success: Y.rbind(treeSuccess, this, i),","				failure: Y.rbind(treeFailure, this, i)","			}","		});","	}","}","","function findRequest(","	/* DataSource */	ds)","{","	for (var i=0; i<this._req.length; i++)","	{","		var req = this._req[i];","		if (ds == req.ds)","		{","			return req;","		}","	}","","	return null;","}","","function treeSuccess(e, reqIndex)","{","	if (!e.response || e.error ||","		!Y.Lang.isArray(e.response.results))","	{","		treeFailure.apply(this, arguments);","		return;","	}","","	var req = searchTxId(this._req, e.tId, reqIndex);","	if (!req)","	{","		return;		// cancelled request","	}","","	if (!this._topResponse && req.ds == this.get('root'))","	{","		this._topResponse = e.response;","	}","","	req.txId  = null;","	req.resp  = e.response;","	req.error = false;","","	var dataStartIndex = 0;","	if (req.ds.treeble_config.startIndexExpr)","	{","		eval('dataStartIndex=req.resp'+req.ds.treeble_config.startIndexExpr);","	}","","	var sliceStartIndex = req.start - dataStartIndex;","	req.data            = e.response.results.slice(sliceStartIndex, req.end - dataStartIndex + 1);","	setNodeInfo(req.data, req.start, req.path, req.ds);","","	var parent = (req.path.length > 0 ? getNode.call(this, req.path) : null);","	var open   = (parent !== null ? parent.children : this._open);","	if (!populateOpen.call(this, parent, open, req))","	{","		treeFailure.apply(this, arguments);","		return;","	}","","	if (!parent && req.ds.treeble_config.totalRecordsExpr)","	{","		eval('this._topNodeTotal=e.response'+req.ds.treeble_config.totalRecordsExpr);","	}","	else if (!parent && req.ds.treeble_config.totalRecordsReturnExpr)","	{","		this._topNodeTotal = e.response.results.length;","	}","","	checkFinished.call(this);","}","","function treeFailure(e, reqIndex)","{","	var req = searchTxId(this._req, e.tId, reqIndex);","	if (!req)","	{","		return;		// cancelled request","	}","","	this._cancelAllRequests();","","	this._callback.error    = e.error;","	this._callback.response = e.response;","	this.fire('response', this._callback);","}","","function setNodeInfo(","	/* array */			list,","	/* int */			offset,","	/* array */			path,","	/* datasource */	ds)","{","	var depth = path.length;","	for (var i=0; i<list.length; i++)","	{","		list[i]._yui_node_depth = depth;","		list[i]._yui_node_path  = path.concat(offset+i);","		list[i]._yui_node_ds    = ds;","	}","}","","function searchTxId(","	/* array */	req,","	/* int */	id,","	/* int */	fallbackIndex)","{","	for (var i=0; i<req.length; i++)","	{","		if (req[i].txId === id)","		{","			return req[i];","		}","	}","","	// synch response arrives before setting txId","","	if (fallbackIndex < req.length &&","		Y.Lang.isUndefined(req[ fallbackIndex ].txId))","	{","		return req[ fallbackIndex ];","	}","","	return null;","}","","function checkFinished()","{","	if (this._generating_requests)","	{","		return;","	}","","	var count = this._req.length;","	for (var i=0; i<count; i++)","	{","		if (!this._req[i].resp)","		{","			return;","		}","	}","","	if (this._redo)","	{","		Y.Lang.later(0, this, requestTree);","		return;","	}","	else if (this._toggle.length > 0)","	{","		this.toggle(this._toggle[0], Y.clone(this._callback.request, true),","		{","			fn: function()","			{","				Y.Lang.later(0, this, requestTree);","			},","			scope: this","		});","		return;","	}","","	var response = { meta:{} };","	Y.mix(response, this._topResponse, true);","	response.results = [];","	response         = Y.clone(response, true);","","	count = this._slices.length;","	for (i=0; i<count; i++)","	{","		var slice = this._slices[i];","		var req   = findRequest.call(this, slice.ds);","		if (!req)","		{","			Y.error('Failed to find request for a slice');","			continue;","		}","","		var j    = slice.start - req.start;","		var data = req.data.slice(j, j + slice.end - slice.start + 1);","","		response.results = response.results.concat(data);","	}","","	var rootDS = this.get('root');","	if (rootDS.treeble_config.totalRecordsExpr)","	{","		eval('response'+rootDS.treeble_config.totalRecordsExpr+'='+countVisibleNodes.call(this));","	}","	else if (rootDS.treeble_config.totalRecordsReturnExpr)","	{","		eval('response'+rootDS.treeble_config.totalRecordsReturnExpr+'='+countVisibleNodes.call(this));","	}","","	this._callback.response = response;","	this.fire('response', this._callback);","}","","function toggleSuccess(e, node, completion)","{","	if (node.ds.treeble_config.totalRecordsExpr)","	{","		eval('node.childTotal=e.response'+node.ds.treeble_config.totalRecordsExpr);","	}","	else if (node.ds.treeble_config.totalRecordsReturnExpr)","	{","		node.childTotal = e.response.results.length;","	}","","	node.open     = true;","	node.children = [];","	complete(completion);","}","","function toggleFailure(e, node, completion)","{","	node.childTotal = 0;","","	node.open     = true;","	node.children = [];","	complete(completion);","}","","function complete(f)","{","	if (Y.Lang.isFunction(f))","	{","		f();","	}","	else if (f && f.fn)","	{","		f.fn.apply(f.scope || window, Y.Lang.isUndefined(f.args) ? [] : f.args);","	}","}","","function compareRequests(r1, r2)","{","	var k1 = Y.Object.keys(r1),","		k2 = Y.Object.keys(r2);","","	if (k1.length != k2.length)","	{","		return false;","	}","","	for (var i=0; i<k1.length; i++)","	{","		var k = k1[i];","		if (k != 'startIndex' && k != 'resultCount' && r1[k] !== r2[k])","		{","			return false;","		}","	}","","	return true;","}","","Y.extend(TreebleDataSource, Y.DataSource.Local,","{","	initializer: function(config)","	{","		if (!config.root)","		{","			Y.error('TreebleDataSource requires DataSource');","		}","","		if (!config.root.treeble_config.childNodesKey)","		{","			var fields = config.root.schema.get('schema').resultFields;","			if (!fields || !Y.Lang.isArray(fields))","			{","				Y.error('TreebleDataSource root DataSource requires schema.resultFields because treeble_config.childNodesKey was not specified.');","			}","","			for (var i=0; i<fields.length; i++)","			{","				if (Y.Lang.isObject(fields[i]) && fields[i].parser == 'treebledatasource')","				{","					config.root.treeble_config.childNodesKey = fields[i].key;","					break;","				}","			}","","			if (!config.root.treeble_config.childNodesKey)","			{","				Y.error('TreebleDataSource requires treeble_config.childNodesKey configuration to be set on root DataSource');","			}","		}","","		if (!config.root.treeble_config.generateRequest)","		{","			Y.error('TreebleDataSource requires treeble_config.generateRequest configuration to be set on root DataSource');","		}","","		if (!config.root.treeble_config.totalRecordsExpr && !config.root.treeble_config.totalRecordsReturnExpr)","		{","			Y.error('TreebleDataSource requires either treeble_config.totalRecordsExpr or treeble_config.totalRecordsReturnExpr configuration to be set on root DataSource');","		}","","		this._open       = [];","		this._open_cache = {};","		this._toggle     = [];","		this._req        = [];","	},","","	/**","	 * @method isOpen","	 * @param path {Array} Path to node","	 * @return {boolean} true if the node is open","	 */","	isOpen: function(path)","	{","		var list = this._open;","		for (var i=0; i<path.length; i++)","		{","			var node = searchOpen.call(this, list, path[i]);","			if (!node || !node.open)","			{","				return false;","			}","			list = node.children;","		}","","		return true;","	},","","	/**","	 * Toggle the specified node between open and closed.  When a node is","	 * opened for the first time, this requires a request to the","	 * DataSource.  Any code that assumes the node has been opened must be","	 * passed in as a completion function.","	 * ","	 * @method toggle","	 * @param path {Array} Path to the node","	 * @param request {Object} {sort,dir,startIndex,resultCount}","	 * @param completion {Function|Object} Function to call when the operation completes.  Can be object: {fn,scope,args}","	 * @return {boolean} false if the path to the node has not yet been fully explored or is not openable, true otherwise","	 */","	toggle: function(path, request, completion)","	{","		var list = this._open;","		for (var i=0; i<path.length; i++)","		{","			var node = searchOpen.call(this, list, path[i]);","			if (!node)","			{","				return false;","			}","			list = node.children;","		}","","		if (node.open === null)","		{","			request.startIndex  = 0;","			request.resultCount = 0;","			node.ds.sendRequest(","			{","				request: node.ds.treeble_config.generateRequest(request, path),","				cfg:     node.ds.treeble_config.requestCfg,","				callback:","				{","					success: Y.rbind(toggleSuccess, this, node, completion),","					failure: Y.rbind(toggleFailure, this, node, completion)","				}","			});","		}","		else","		{","			//node.open = !node.open;","			//complete(completion);","			node.open = !node.open;","			console.log(node);","			console.log(path);","			complete(completion);","			// Method _getNodeFromPath","/*			var contentBox = Y.one('.yui3-datatable-content');","","			Y.each(path, function[index] {","","			});*/","","			// Animate close and execute completion ballback.","/*            var anim = new Y.Anim({","                node: children,","                to: { height: 0 },","                duration: '.25',","                easing: Y.Easing.easeOut","            });","","            anim.on('end', function () {","				complete(completion);","            });","","            anim.run();*/","		}","	},","","	_defRequestFn: function(e)","	{","		// wipe out all state if the request parameters change","","		if (this._callback && !compareRequests(this._callback.request, e.request))","		{","			this._open = [];","		}","","		this._callback = e;","		requestTree.call(this);","	},","","	_cancelAllRequests: function()","	{","		this._req    = [];","		this._toggle = [];","		delete this._topResponse;","	}","});","","Y.TreebleDataSource = TreebleDataSource;","Y.namespace('DataSource').Treeble = TreebleDataSource;","/**"," * @module gallery-treeble"," */","","/**"," * <p>Converts data to a DataSource.  Data can be an object containing both"," * <code>dataType</code> and <code>liveData</code>, or it can be <q>free"," * form</q>, e.g., an array of records or an XHR URL.</p>"," *"," * @class Parsers"," */","","/**"," * @method treebledatasource"," * @static"," * @param oData {mixed} Data to convert."," * @return {DataSource} The new data source."," */","Y.namespace(\"Parsers\").treebledatasource = function(oData)","{","	if (!oData)","	{","		return null;","	}","","	var type = oData.dataType;","	if (type)","	{","		// use it","	}","	else if (Y.Lang.isString(oData))","	{","		type = 'IO';","	}","	else if (Y.Lang.isFunction(oData))","	{","		type = 'Function';","	}","	else","	{","		type = 'Local';","	}","","	var src            = oData.dataType ? oData.liveData : oData;","	var treeble_config = this.get('host').treeble_config;","	if (type == 'Local')","	{","		treeble_config = Y.clone(treeble_config, true);","		delete treeble_config.startIndexExpr;","		delete treeble_config.totalRecordsExpr;","	}","	else if (type == 'Function')","	{","		src = Y.Lang.isString(src) ? window[ src ] : src;","	}","","	var ds            = new Y.DataSource[ type ]({ source: src });","	ds.treeble_config = treeble_config;","","	if (ds.treeble_config.schemaPluginConfig)","	{","		ds.plug(Y.clone(ds.treeble_config.schemaPluginConfig, true));","	}","","	if (ds.treeble_config.cachePluginConfig)","	{","		ds.plug(Y.clone(ds.treeble_config.cachePluginConfig, true));","	}","","	return ds;","};","/**********************************************************************"," * Treeble displays a tree of data in a table."," *"," * @module gallery-treeble"," * @main gallery-treeble"," */","","/**"," * Extension to DataTable for displaying tree data."," *"," * @class Treeble"," * @extends DataTable"," * @constructor"," * @param config {Object}"," */","function Treeble()","{","	Treeble.superclass.constructor.apply(this, arguments);","}","","Treeble.NAME = \"datatable\";		// same styling","","/**"," * <p>Formatter for open/close twistdown.</p>"," *"," * @method twistdownFormatter"," * @static"," * @param sendRequest {Function} Function that reloads DataTable"," */","Treeble.buildTwistdownFormatter = function(sendRequest)","{","	return function(o)","	{","		o.td.addClass('treeble-nub');","","		var ds  = this.datasource.get('datasource');","		var key = ds.get('root').treeble_config.childNodesKey;","","		if (o.data[key])","		{","			var path = o.data._yui_node_path;","","			o.td.addClass('row-toggle');","			o.td.replaceClass('row-(open|closed)',","				ds.isOpen(path) ? 'row-open' : 'row-closed');","","			YUI.Env.add(Y.Node.getDOMNode(o.td), 'click', function()","			{","				ds.toggle(path, {}, sendRequest);","			});","","			o.cell.set('innerHTML', '<a class=\"treeble-expand-nub\" href=\"javascript:void(0);\"></a>');","		}","","		return false;	// discard Y.Node instances","	};","};","","/**"," * <p>Default formatter for indented column.</p>"," *"," * @method treeValueFormatter"," * @static"," */","Treeble.treeValueFormatter = function(o)","{","	var depth_class = 'treeble-depth-'+o.data._yui_node_depth;","	o.rowClass     += ' ' + depth_class;","	o.className    += ' treeble-value';","	return '<span class=\"'+depth_class+'\">'+o.value+'</span>';","};","","Y.extend(Treeble, Y.DataTable,","{","	plug: function(plugin, config)","	{","		if (plugin === Y.Plugin.DataTableDataSource)","		{","			var recordType = this.get('recordType');","			recordType.ATTRS[ config.datasource.get('root').treeble_config.childNodesKey ] = {};","			recordType.ATTRS._yui_node_path  = {};","			recordType.ATTRS._yui_node_depth = {};","		}","","		Treeble.superclass.plug.apply(this, arguments);","	}","});","","Y.Treeble = Treeble;","","","}, '@VERSION@', {\"requires\": [\"datasource\"], \"skinnable\": true});"];
_yuitest_coverage["build/gallery-treeble/gallery-treeble.js"].lines = {"1":0,"3":0,"29":0,"31":0,"34":0,"36":0,"145":0,"150":0,"151":0,"152":0,"153":0,"155":0,"157":0,"159":0,"163":0,"165":0,"166":0,"168":0,"169":0,"170":0,"172":0,"175":0,"177":0,"178":0,"180":0,"182":0,"186":0,"188":0,"198":0,"199":0,"201":0,"202":0,"204":0,"205":0,"206":0,"209":0,"212":0,"214":0,"217":0,"220":0,"223":0,"227":0,"231":0,"233":0,"235":0,"239":0,"242":0,"245":0,"246":0,"247":0,"249":0,"250":0,"253":0,"256":0,"262":0,"263":0,"265":0,"266":0,"269":0,"271":0,"273":0,"274":0,"276":0,"277":0,"282":0,"285":0,"287":0,"289":0,"290":0,"292":0,"293":0,"295":0,"300":0,"304":0,"306":0,"307":0,"310":0,"320":0,"328":0,"330":0,"333":0,"336":0,"337":0,"339":0,"340":0,"342":0,"345":0,"347":0,"350":0,"358":0,"360":0,"365":0,"367":0,"369":0,"371":0,"373":0,"380":0,"383":0,"385":0,"387":0,"392":0,"393":0,"397":0,"411":0,"413":0,"414":0,"415":0,"416":0,"417":0,"420":0,"422":0,"430":0,"431":0,"433":0,"434":0,"436":0,"439":0,"440":0,"442":0,"445":0,"448":0,"456":0,"458":0,"460":0,"462":0,"464":0,"471":0,"474":0,"475":0,"477":0,"479":0,"482":0,"484":0,"488":0,"489":0,"493":0,"498":0,"503":0,"506":0,"509":0,"511":0,"512":0,"513":0,"514":0,"516":0,"518":0,"520":0,"523":0,"525":0,"529":0,"531":0,"533":0,"534":0,"540":0,"544":0,"554":0,"555":0,"557":0,"558":0,"559":0,"561":0,"574":0,"577":0,"579":0,"580":0,"582":0,"586":0,"589":0,"591":0,"594":0,"595":0,"598":0,"599":0,"601":0,"604":0,"606":0,"609":0,"610":0,"611":0,"613":0,"614":0,"616":0,"619":0,"620":0,"621":0,"623":0,"624":0,"625":0,"627":0,"628":0,"631":0,"633":0,"635":0,"637":0,"640":0,"643":0,"645":0,"646":0,"648":0,"651":0,"653":0,"654":0,"655":0,"658":0,"664":0,"665":0,"667":0,"668":0,"669":0,"673":0,"678":0,"680":0,"682":0,"688":0,"691":0,"694":0,"697":0,"699":0,"701":0,"704":0,"705":0,"707":0,"709":0,"713":0,"715":0,"716":0,"718":0,"720":0,"724":0,"728":0,"731":0,"732":0,"733":0,"734":0,"736":0,"737":0,"739":0,"740":0,"741":0,"743":0,"744":0,"747":0,"748":0,"750":0,"753":0,"754":0,"756":0,"758":0,"760":0,"763":0,"764":0,"767":0,"769":0,"771":0,"773":0,"775":0,"778":0,"779":0,"780":0,"783":0,"785":0,"787":0,"788":0,"789":0,"792":0,"794":0,"796":0,"798":0,"800":0,"804":0,"806":0,"809":0,"811":0,"814":0,"816":0,"817":0,"819":0,"823":0,"826":0,"830":0,"832":0,"835":0,"837":0,"838":0,"840":0,"843":0,"845":0,"847":0,"848":0,"852":0,"854":0,"858":0,"860":0,"863":0,"865":0,"868":0,"869":0,"870":0,"871":0,"881":0,"882":0,"884":0,"885":0,"887":0,"889":0,"892":0,"909":0,"910":0,"912":0,"913":0,"915":0,"917":0,"920":0,"922":0,"923":0,"924":0,"939":0,"940":0,"941":0,"942":0,"970":0,"972":0,"975":0,"976":0,"981":0,"982":0,"983":0,"987":0,"988":0,"1007":0,"1009":0,"1011":0,"1014":0,"1015":0,"1019":0,"1021":0,"1023":0,"1025":0,"1029":0,"1032":0,"1033":0,"1034":0,"1036":0,"1037":0,"1038":0,"1040":0,"1042":0,"1045":0,"1046":0,"1048":0,"1050":0,"1053":0,"1055":0,"1058":0,"1075":0,"1077":0,"1080":0,"1089":0,"1091":0,"1093":0,"1095":0,"1096":0,"1098":0,"1100":0,"1102":0,"1103":0,"1106":0,"1108":0,"1111":0,"1114":0,"1124":0,"1126":0,"1127":0,"1128":0,"1129":0,"1132":0,"1136":0,"1138":0,"1139":0,"1140":0,"1141":0,"1144":0,"1148":0};
_yuitest_coverage["build/gallery-treeble/gallery-treeble.js"].functions = {"TreebleDataSource:29":0,"populateOpen:145":0,"searchOpen:227":0,"getNode:242":0,"countVisibleNodes:256":0,"requestTree:285":0,"getVisibleSlicesPgTop:310":0,"getVisibleSlicesPgAll:397":0,"requestSlices:506":0,"findRequest:574":0,"treeSuccess:589":0,"treeFailure:643":0,"setNodeInfo:658":0,"searchTxId:673":0,"fn:722":0,"checkFinished:697":0,"toggleSuccess:767":0,"toggleFailure:783":0,"complete:792":0,"compareRequests:804":0,"initializer:828":0,"isOpen:879":0,"toggle:907":0,"_defRequestFn:966":0,"_cancelAllRequests:979":0,"treebledatasource:1007":0,"Treeble:1075":0,"(anonymous 3):1106":0,"(anonymous 2):1091":0,"buildTwistdownFormatter:1089":0,"treeValueFormatter:1124":0,"plug:1134":0,"(anonymous 1):1":0};
_yuitest_coverage["build/gallery-treeble/gallery-treeble.js"].coveredLines = 383;
_yuitest_coverage["build/gallery-treeble/gallery-treeble.js"].coveredFunctions = 33;
_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 1);
YUI.add('gallery-treeble', function (Y, NAME) {

_yuitest_coverfunc("build/gallery-treeble/gallery-treeble.js", "(anonymous 1)", 1);
_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 3);
"use strict";

/**
 * @module gallery-treeble
 */

/**********************************************************************
 * <p>Hierarchical data source.</p>
 *
 * <p>TreebleDataSource converts a tree of DataSources into a flat list of
 * visible items.  The merged list must be paginated if the number of child
 * nodes might be very large.  To turn on this feature, set
 * paginateChildren:true.</p>
 * 
 * <p>The tree must be immutable.  The total number of items available from
 * each DataSource must remain constant.  (The one exception to this rule
 * is that filtering and sorting are allowed.  This is done by detecting
 * that the request parameters have changed.)</p>
 * 
 * @namespace DataSource
 * @class Treeble
 * @extends DataSource.Local
 * @constructor
 * @param config {Object}
 */

_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 29);
function TreebleDataSource()
{
	_yuitest_coverfunc("build/gallery-treeble/gallery-treeble.js", "TreebleDataSource", 29);
_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 31);
TreebleDataSource.superclass.constructor.apply(this, arguments);
}

_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 34);
TreebleDataSource.NAME = "treebleDataSource";

_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 36);
TreebleDataSource.ATTRS =
{
	/**
	 * <p>The root datasource.</p>
	 * 
	 * <p>You <em>must</em> directly set a <code>treeble_config</code>
	 * object on this datasource.  (You cannot use
	 * <code>set('treeble_config',...)</code>.) <code>treeble_config</code> can
	 * contain the following configuration:</p>
	 * 
	 * <dl>
	 * <dt>generateRequest</dt>
	 * <dd>(required) The function to convert the initial request into
	 *		a request usable by the actual DataSource.  This function takes
	 *		two arguments: state (sort,dir,startIndex,resultCount) and path
	 *		(an array of node indices telling how to reach the node).
	 *		</dd>
	 * <dt>requestCfg</dt>
	 * <dd>(optional) Configuration object passed as <code>cfg</code> to
	 *		<code>sendRequest</code>.</dd>
	 * <dt>schemaPluginConfig</dt>
	 * <dd>(required) Object to pass to <code>plug</code> to install a schema.</dd>
	 * <dt>cachePluginConfig</dt>
	 * <dd>(optional) Object to pass to <code>plug</code> to install a cache.</dd>
	 * <dt>childNodesKey</dt>
	 * <dd>(semi-optional) The name of the key inside a node which contains
	 *		the data used to construct the DataSource for retrieving the children.
	 *		This config is only required if you provide a custom parser.</dd>
	 * <dt>nodeOpenKey</dt>
	 * <dd>(optional) The name of the key inside a node which contains
	 *		the initial open state of the node.  If it is true, the node will
	 *		automatically be opened the first time it is shown.  (After that,
	 *		it will remember the state set by the user.)</dd>
	 * <dt>startIndexExpr</dt>
	 * <dd>(optional) OGNL expression telling how to extract the startIndex
	 *		from the received data, e.g., <code>.meta.startIndex</code>.
	 *		If it is not provided, startIndex is always assumed to be zero.</dd>
	 * <dt>totalRecordsExpr</dt>
	 * <dd>(semi-optional) OGNL expression telling how to extract the total number
	 *		of records from the received data, e.g., <code>.meta.totalRecords</code>.
	 *		If this is not provided, <code>totalRecordsReturnExpr</code> must be
	 *		specified.</dd>
	 * <dt>totalRecordsReturnExpr</dt>
	 * <dd>(semi-optional) OGNL expression telling where in the response to store
	 *		the total number of records, e.g., <code>.meta.totalRecords</code>.
	 *		This is only appropriate for DataSources that always return the
	 *		entire data set.  If this is not provided,
	 *		<code>totalRecordsExpr</code> must be specified.  If both are provided,
	 *		<code>totalRecordsExpr</code> takes priority.</dd>
	 * </dl>
	 * 
	 * @attribute root
	 * @type {DataSource}
	 * @writeonce
	 */
	root:
	{
		writeOnce: true
	},

	/**
	 * Pass <code>true</code> to paginate the result after merging child
	 * nodes into the list.  The default (<code>false</code>) is to
	 * paginate only root nodes, so all children are visible.
	 * 
	 * @attribute paginateChildren
	 * @type {boolean}
	 * @default false
	 * @writeonce
	 */
	paginateChildren:
	{
		value:     false,
		validator: Y.Lang.isBoolean,
		writeOnce: true
	},

	/**
	 * The key in each record that stores an identifier which is unique
	 * across the entire tree.  If this is not specified, then all nodes
	 * will close when the data is sorted.
	 * 
	 * @attribute uniqueIdKey
	 * @type {String}
	 */
	uniqueIdKey:
	{
		validator: Y.Lang.isString
	}
};

/*

	Each element in this._open contains information about an openable,
	top-level node and is the root of a tree of open (or previously opened)
	items.  Each node in a tree contains the following data:

		index:      {Number} sorting key; the index of the node
		open:       null if never opened, true if open, false otherwise
		ds:         {DataSource} source for child nodes
		childTotal: {Number} total number of child nodes
		children:   {Array} (recursive) child nodes which are or have been opened
		parent:     {Object} parent item

	Each level is sorted by index to allow simple traversal in display
	order.

 */

_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 145);
function populateOpen(
	/* object */	parent,
	/* array */		open,
	/* object */	req)
{
	_yuitest_coverfunc("build/gallery-treeble/gallery-treeble.js", "populateOpen", 145);
_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 150);
var data          = req.data;
	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 151);
var startIndex    = req.start;
	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 152);
var childNodesKey = req.ds.treeble_config.childNodesKey;
	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 153);
var nodeOpenKey   = req.ds.treeble_config.nodeOpenKey;

	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 155);
for (var j=0; j<open.length; j++)
	{
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 157);
if (open[j].index >= startIndex)
		{
			_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 159);
break;
		}
	}

	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 163);
var uniqueIdKey = this.get('uniqueIdKey');

	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 165);
var result = true;
	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 166);
for (var k=0; k<data.length; k++)
	{
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 168);
var i = startIndex + k;
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 169);
var ds = data[k][ childNodesKey ];
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 170);
if (!ds)
		{
			_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 172);
continue;
		}

		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 175);
while (j < open.length && open[j].index < i)
		{
			_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 177);
open.splice(j, 1);
			_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 178);
result = false;

			_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 180);
if (uniqueIdKey)
			{
				_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 182);
delete this._open_cache[ data[k][ uniqueIdKey ] ];
			}
		}

		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 186);
if (j >= open.length || open[j].index > i)
		{
			_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 188);
var item =
			{
				index:      i,
				open:       null,
				ds:         ds,
				children:   [],
				childTotal: 0,
				parent:     parent
			};

			_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 198);
var cached_item = null;
			_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 199);
if (uniqueIdKey)
			{
				_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 201);
cached_item = this._open_cache[ data[k][ uniqueIdKey ] ];
				_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 202);
if (cached_item)
				{
					_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 204);
item.open       = cached_item.open;
					_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 205);
item.childTotal = cached_item.childTotal;
					_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 206);
this._redo      = this._redo || item.open;
				}

				_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 209);
this._open_cache[ data[k][ uniqueIdKey ] ] = item;
			}

			_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 212);
if (!cached_item && nodeOpenKey && data[k][ nodeOpenKey ])
			{
				_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 214);
this._toggle.push(req.path.concat(i));
			}

			_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 217);
open.splice(j, 0, item);
		}

		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 220);
j++;
	}

	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 223);
return result;
}

// TODO: worth switching to binary search?
_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 227);
function searchOpen(
	/* array */	list,
	/* int */	nodeIndex)
{
	_yuitest_coverfunc("build/gallery-treeble/gallery-treeble.js", "searchOpen", 227);
_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 231);
for (var i=0; i<list.length; i++)
	{
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 233);
if (list[i].index == nodeIndex)
		{
			_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 235);
return list[i];
		}
	}

	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 239);
return false;
}

_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 242);
function getNode(
	/* array */	path)
{
	_yuitest_coverfunc("build/gallery-treeble/gallery-treeble.js", "getNode", 242);
_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 245);
var open = this._open;
	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 246);
var last = path.length-1;
	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 247);
for (var i=0; i<last; i++)
	{
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 249);
var node = searchOpen(open, path[i]);
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 250);
open     = node.children;
	}

	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 253);
return searchOpen(open, path[last]);
}

_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 256);
function countVisibleNodes(

	// not sent by initiator

	/* array */ open)
{
	_yuitest_coverfunc("build/gallery-treeble/gallery-treeble.js", "countVisibleNodes", 256);
_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 262);
var total = 0;
	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 263);
if (!open)
	{
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 265);
open  = this._open;
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 266);
total = this._topNodeTotal;
	}

	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 269);
if (this.get('paginateChildren'))
	{
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 271);
for (var i=0; i<open.length; i++)
		{
			_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 273);
var node = open[i];
			_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 274);
if (node.open)
			{
				_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 276);
total += node.childTotal;
				_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 277);
total += countVisibleNodes.call(this, node.children);
			}
		}
	}

	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 282);
return total;
}

_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 285);
function requestTree()
{
	_yuitest_coverfunc("build/gallery-treeble/gallery-treeble.js", "requestTree", 285);
_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 287);
this._cancelAllRequests();

	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 289);
this._redo                = false;
	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 290);
this._generating_requests = true;

	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 292);
var req = this._callback.request;
	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 293);
if (this.get('paginateChildren'))
	{
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 295);
this._slices = getVisibleSlicesPgAll(req.startIndex, req.resultCount,
											 this.get('root'), this._open);
	}
	else
	{
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 300);
this._slices = getVisibleSlicesPgTop(req.startIndex, req.resultCount,
											 this.get('root'), this._open);
	}

	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 304);
requestSlices.call(this, req);

	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 306);
this._generating_requests = false;
	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 307);
checkFinished.call(this);
}

_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 310);
function getVisibleSlicesPgTop(
	/* int */			skip,
	/* int */			show,
	/* DataSource */	ds,
	/* array */			open,

	// not sent by initiator

	/* array */			path)
{
	_yuitest_coverfunc("build/gallery-treeble/gallery-treeble.js", "getVisibleSlicesPgTop", 310);
_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 320);
open = open.concat(
	{
		index:      -1,
		open:       true,
		childTotal: 0,
		children:   null
	});

	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 328);
if (!path)
	{
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 330);
path = [];
	}

	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 333);
var slices = [],
		send   = false;

	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 336);
var m = 0, prev = -1, presend = false;
	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 337);
for (var i=0; i<open.length; i++)
	{
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 339);
var node = open[i];
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 340);
if (!node.open)
		{
			_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 342);
continue;
		}

		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 345);
var delta = node.index - prev;

		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 347);
if (m + delta >= skip + show ||
			node.index == -1)
		{
			_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 350);
slices.push(
			{
				ds:    ds,
				path:  path.slice(0),
				start: send ? m : skip,
				end:   skip + show - 1
			});

			_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 358);
if (m + delta == skip + show)
			{
				_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 360);
slices = slices.concat(
					getVisibleSlicesPgTop(0, node.childTotal, node.ds,
										  node.children, path.concat(node.index)));
			}

			_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 365);
return slices;
		}
		else {_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 367);
if (!send && m + delta == skip)
		{
			_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 369);
presend = true;
		}
		else {_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 371);
if (m + delta > skip)
		{
			_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 373);
slices.push(
			{
				ds:    ds,
				path:  path.slice(0),
				start: send ? prev + 1 : skip,
				end:   m + delta - 1
			});
			_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 380);
send = true;
		}}}

		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 383);
m += delta;

		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 385);
if (send && node.childTotal > 0)
		{
			_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 387);
slices = slices.concat(
				getVisibleSlicesPgTop(0, node.childTotal, node.ds,
									  node.children, path.concat(node.index)));
		}

		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 392);
prev = node.index;
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 393);
send = send || presend;
	}
}

_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 397);
function getVisibleSlicesPgAll(
	/* int */			skip,
	/* int */			show,
	/* DataSource */	rootDS,
	/* array */			open,

	// not sent by initiator

	/* array */			path,
	/* node */			parent,
	/* int */			pre,
	/* bool */			send,
	/* array */			slices)
{
	_yuitest_coverfunc("build/gallery-treeble/gallery-treeble.js", "getVisibleSlicesPgAll", 397);
_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 411);
if (!parent)
	{
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 413);
path   = [];
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 414);
parent = null;
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 415);
pre    = 0;
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 416);
send   = false;
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 417);
slices = [];
	}

	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 420);
var ds = parent ? parent.ds : rootDS;

	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 422);
open = open.concat(
	{
		index:      parent ? parent.childTotal : -1,
		open:       true,
		childTotal: 0,
		children:   null
	});

	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 430);
var n = 0, m = 0, prev = -1;
	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 431);
for (var i=0; i<open.length; i++)
	{
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 433);
var node = open[i];
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 434);
if (!node.open)
		{
			_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 436);
continue;
		}

		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 439);
var delta = node.index - prev;
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 440);
if (node.children === null)
		{
			_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 442);
delta--;	// last item is off the end
		}

		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 445);
if (pre + n + delta >= skip + show ||
			node.index == -1)
		{
			_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 448);
slices.push(
			{
				ds:    ds,
				path:  path.slice(0),
				start: m + (send ? 0 : skip - pre - n),
				end:   m + (skip + show - 1 - pre - n)
			});

			_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 456);
return slices;
		}
		else {_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 458);
if (!send && pre + n + delta == skip)
		{
			_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 460);
send = true;
		}
		else {_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 462);
if (pre + n + delta > skip)
		{
			_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 464);
slices.push(
			{
				ds:    ds,
				path:  path.slice(0),
				start: m + (send ? 0 : skip - pre - n),
				end:   m + delta - 1
			});
			_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 471);
send = true;
		}}}

		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 474);
n += delta;
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 475);
m += delta;

		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 477);
if (node.childTotal > 0)
		{
			_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 479);
var info = getVisibleSlicesPgAll(skip, show, rootDS, node.children,
											 path.concat(node.index),
											 node, pre+n, send, slices);
			_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 482);
if (Y.Lang.isArray(info))
			{
				_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 484);
return info;
			}
			else
			{
				_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 488);
n   += info.count;
				_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 489);
send = info.send;
			}
		}

		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 493);
prev = node.index;
	}

	// only reached when parent != null

	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 498);
var info =
	{
		count: n,
		send:  send
	};
	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 503);
return info;
}

_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 506);
function requestSlices(
	/* object */	request)
{
	_yuitest_coverfunc("build/gallery-treeble/gallery-treeble.js", "requestSlices", 506);
_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 509);
for (var i=0; i<this._slices.length; i++)
	{
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 511);
var slice = this._slices[i];
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 512);
var ds    = slice.ds;
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 513);
var req   = findRequest.call(this, ds);
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 514);
if (req)
		{
			_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 516);
if (Y.Console)
			{
				_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 518);
if (req.end+1 < slice.start)
				{
					_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 520);
Y.error('TreebleDataSource found discontinuous range');
				}

				_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 523);
if (req.path.length != slice.path.length)
				{
					_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 525);
Y.error('TreebleDataSource found path length mismatch');
				}
				else
				{
					_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 529);
for (var j=0; j<slice.path.length; j++)
					{
						_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 531);
if (req.path[j] != slice.path[j])
						{
							_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 533);
Y.error('TreebleDataSource found path mismatch');
							_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 534);
break;
						}
					}
				}
			}

			_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 540);
req.end = slice.end;
		}
		else
		{
			_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 544);
this._req.push(
			{
				ds:    ds,
				path:  slice.path,
				start: slice.start,
				end:   slice.end
			});
		}
	}

	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 554);
request = Y.clone(request, true);
	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 555);
for (var i=0; i<this._req.length; i++)
	{
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 557);
var req             = this._req[i];
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 558);
request.startIndex  = req.start;
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 559);
request.resultCount = req.end - req.start + 1;

		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 561);
req.txId = req.ds.sendRequest(
		{
			request: req.ds.treeble_config.generateRequest(request, req.path),
			cfg:     req.ds.treeble_config.requestCfg,
			callback:
			{
				success: Y.rbind(treeSuccess, this, i),
				failure: Y.rbind(treeFailure, this, i)
			}
		});
	}
}

_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 574);
function findRequest(
	/* DataSource */	ds)
{
	_yuitest_coverfunc("build/gallery-treeble/gallery-treeble.js", "findRequest", 574);
_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 577);
for (var i=0; i<this._req.length; i++)
	{
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 579);
var req = this._req[i];
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 580);
if (ds == req.ds)
		{
			_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 582);
return req;
		}
	}

	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 586);
return null;
}

_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 589);
function treeSuccess(e, reqIndex)
{
	_yuitest_coverfunc("build/gallery-treeble/gallery-treeble.js", "treeSuccess", 589);
_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 591);
if (!e.response || e.error ||
		!Y.Lang.isArray(e.response.results))
	{
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 594);
treeFailure.apply(this, arguments);
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 595);
return;
	}

	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 598);
var req = searchTxId(this._req, e.tId, reqIndex);
	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 599);
if (!req)
	{
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 601);
return;		// cancelled request
	}

	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 604);
if (!this._topResponse && req.ds == this.get('root'))
	{
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 606);
this._topResponse = e.response;
	}

	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 609);
req.txId  = null;
	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 610);
req.resp  = e.response;
	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 611);
req.error = false;

	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 613);
var dataStartIndex = 0;
	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 614);
if (req.ds.treeble_config.startIndexExpr)
	{
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 616);
eval('dataStartIndex=req.resp'+req.ds.treeble_config.startIndexExpr);
	}

	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 619);
var sliceStartIndex = req.start - dataStartIndex;
	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 620);
req.data            = e.response.results.slice(sliceStartIndex, req.end - dataStartIndex + 1);
	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 621);
setNodeInfo(req.data, req.start, req.path, req.ds);

	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 623);
var parent = (req.path.length > 0 ? getNode.call(this, req.path) : null);
	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 624);
var open   = (parent !== null ? parent.children : this._open);
	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 625);
if (!populateOpen.call(this, parent, open, req))
	{
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 627);
treeFailure.apply(this, arguments);
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 628);
return;
	}

	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 631);
if (!parent && req.ds.treeble_config.totalRecordsExpr)
	{
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 633);
eval('this._topNodeTotal=e.response'+req.ds.treeble_config.totalRecordsExpr);
	}
	else {_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 635);
if (!parent && req.ds.treeble_config.totalRecordsReturnExpr)
	{
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 637);
this._topNodeTotal = e.response.results.length;
	}}

	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 640);
checkFinished.call(this);
}

_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 643);
function treeFailure(e, reqIndex)
{
	_yuitest_coverfunc("build/gallery-treeble/gallery-treeble.js", "treeFailure", 643);
_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 645);
var req = searchTxId(this._req, e.tId, reqIndex);
	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 646);
if (!req)
	{
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 648);
return;		// cancelled request
	}

	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 651);
this._cancelAllRequests();

	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 653);
this._callback.error    = e.error;
	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 654);
this._callback.response = e.response;
	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 655);
this.fire('response', this._callback);
}

_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 658);
function setNodeInfo(
	/* array */			list,
	/* int */			offset,
	/* array */			path,
	/* datasource */	ds)
{
	_yuitest_coverfunc("build/gallery-treeble/gallery-treeble.js", "setNodeInfo", 658);
_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 664);
var depth = path.length;
	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 665);
for (var i=0; i<list.length; i++)
	{
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 667);
list[i]._yui_node_depth = depth;
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 668);
list[i]._yui_node_path  = path.concat(offset+i);
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 669);
list[i]._yui_node_ds    = ds;
	}
}

_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 673);
function searchTxId(
	/* array */	req,
	/* int */	id,
	/* int */	fallbackIndex)
{
	_yuitest_coverfunc("build/gallery-treeble/gallery-treeble.js", "searchTxId", 673);
_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 678);
for (var i=0; i<req.length; i++)
	{
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 680);
if (req[i].txId === id)
		{
			_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 682);
return req[i];
		}
	}

	// synch response arrives before setting txId

	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 688);
if (fallbackIndex < req.length &&
		Y.Lang.isUndefined(req[ fallbackIndex ].txId))
	{
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 691);
return req[ fallbackIndex ];
	}

	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 694);
return null;
}

_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 697);
function checkFinished()
{
	_yuitest_coverfunc("build/gallery-treeble/gallery-treeble.js", "checkFinished", 697);
_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 699);
if (this._generating_requests)
	{
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 701);
return;
	}

	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 704);
var count = this._req.length;
	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 705);
for (var i=0; i<count; i++)
	{
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 707);
if (!this._req[i].resp)
		{
			_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 709);
return;
		}
	}

	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 713);
if (this._redo)
	{
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 715);
Y.Lang.later(0, this, requestTree);
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 716);
return;
	}
	else {_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 718);
if (this._toggle.length > 0)
	{
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 720);
this.toggle(this._toggle[0], Y.clone(this._callback.request, true),
		{
			fn: function()
			{
				_yuitest_coverfunc("build/gallery-treeble/gallery-treeble.js", "fn", 722);
_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 724);
Y.Lang.later(0, this, requestTree);
			},
			scope: this
		});
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 728);
return;
	}}

	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 731);
var response = { meta:{} };
	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 732);
Y.mix(response, this._topResponse, true);
	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 733);
response.results = [];
	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 734);
response         = Y.clone(response, true);

	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 736);
count = this._slices.length;
	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 737);
for (i=0; i<count; i++)
	{
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 739);
var slice = this._slices[i];
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 740);
var req   = findRequest.call(this, slice.ds);
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 741);
if (!req)
		{
			_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 743);
Y.error('Failed to find request for a slice');
			_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 744);
continue;
		}

		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 747);
var j    = slice.start - req.start;
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 748);
var data = req.data.slice(j, j + slice.end - slice.start + 1);

		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 750);
response.results = response.results.concat(data);
	}

	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 753);
var rootDS = this.get('root');
	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 754);
if (rootDS.treeble_config.totalRecordsExpr)
	{
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 756);
eval('response'+rootDS.treeble_config.totalRecordsExpr+'='+countVisibleNodes.call(this));
	}
	else {_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 758);
if (rootDS.treeble_config.totalRecordsReturnExpr)
	{
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 760);
eval('response'+rootDS.treeble_config.totalRecordsReturnExpr+'='+countVisibleNodes.call(this));
	}}

	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 763);
this._callback.response = response;
	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 764);
this.fire('response', this._callback);
}

_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 767);
function toggleSuccess(e, node, completion)
{
	_yuitest_coverfunc("build/gallery-treeble/gallery-treeble.js", "toggleSuccess", 767);
_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 769);
if (node.ds.treeble_config.totalRecordsExpr)
	{
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 771);
eval('node.childTotal=e.response'+node.ds.treeble_config.totalRecordsExpr);
	}
	else {_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 773);
if (node.ds.treeble_config.totalRecordsReturnExpr)
	{
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 775);
node.childTotal = e.response.results.length;
	}}

	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 778);
node.open     = true;
	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 779);
node.children = [];
	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 780);
complete(completion);
}

_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 783);
function toggleFailure(e, node, completion)
{
	_yuitest_coverfunc("build/gallery-treeble/gallery-treeble.js", "toggleFailure", 783);
_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 785);
node.childTotal = 0;

	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 787);
node.open     = true;
	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 788);
node.children = [];
	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 789);
complete(completion);
}

_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 792);
function complete(f)
{
	_yuitest_coverfunc("build/gallery-treeble/gallery-treeble.js", "complete", 792);
_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 794);
if (Y.Lang.isFunction(f))
	{
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 796);
f();
	}
	else {_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 798);
if (f && f.fn)
	{
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 800);
f.fn.apply(f.scope || window, Y.Lang.isUndefined(f.args) ? [] : f.args);
	}}
}

_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 804);
function compareRequests(r1, r2)
{
	_yuitest_coverfunc("build/gallery-treeble/gallery-treeble.js", "compareRequests", 804);
_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 806);
var k1 = Y.Object.keys(r1),
		k2 = Y.Object.keys(r2);

	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 809);
if (k1.length != k2.length)
	{
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 811);
return false;
	}

	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 814);
for (var i=0; i<k1.length; i++)
	{
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 816);
var k = k1[i];
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 817);
if (k != 'startIndex' && k != 'resultCount' && r1[k] !== r2[k])
		{
			_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 819);
return false;
		}
	}

	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 823);
return true;
}

_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 826);
Y.extend(TreebleDataSource, Y.DataSource.Local,
{
	initializer: function(config)
	{
		_yuitest_coverfunc("build/gallery-treeble/gallery-treeble.js", "initializer", 828);
_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 830);
if (!config.root)
		{
			_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 832);
Y.error('TreebleDataSource requires DataSource');
		}

		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 835);
if (!config.root.treeble_config.childNodesKey)
		{
			_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 837);
var fields = config.root.schema.get('schema').resultFields;
			_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 838);
if (!fields || !Y.Lang.isArray(fields))
			{
				_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 840);
Y.error('TreebleDataSource root DataSource requires schema.resultFields because treeble_config.childNodesKey was not specified.');
			}

			_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 843);
for (var i=0; i<fields.length; i++)
			{
				_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 845);
if (Y.Lang.isObject(fields[i]) && fields[i].parser == 'treebledatasource')
				{
					_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 847);
config.root.treeble_config.childNodesKey = fields[i].key;
					_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 848);
break;
				}
			}

			_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 852);
if (!config.root.treeble_config.childNodesKey)
			{
				_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 854);
Y.error('TreebleDataSource requires treeble_config.childNodesKey configuration to be set on root DataSource');
			}
		}

		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 858);
if (!config.root.treeble_config.generateRequest)
		{
			_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 860);
Y.error('TreebleDataSource requires treeble_config.generateRequest configuration to be set on root DataSource');
		}

		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 863);
if (!config.root.treeble_config.totalRecordsExpr && !config.root.treeble_config.totalRecordsReturnExpr)
		{
			_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 865);
Y.error('TreebleDataSource requires either treeble_config.totalRecordsExpr or treeble_config.totalRecordsReturnExpr configuration to be set on root DataSource');
		}

		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 868);
this._open       = [];
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 869);
this._open_cache = {};
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 870);
this._toggle     = [];
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 871);
this._req        = [];
	},

	/**
	 * @method isOpen
	 * @param path {Array} Path to node
	 * @return {boolean} true if the node is open
	 */
	isOpen: function(path)
	{
		_yuitest_coverfunc("build/gallery-treeble/gallery-treeble.js", "isOpen", 879);
_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 881);
var list = this._open;
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 882);
for (var i=0; i<path.length; i++)
		{
			_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 884);
var node = searchOpen.call(this, list, path[i]);
			_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 885);
if (!node || !node.open)
			{
				_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 887);
return false;
			}
			_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 889);
list = node.children;
		}

		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 892);
return true;
	},

	/**
	 * Toggle the specified node between open and closed.  When a node is
	 * opened for the first time, this requires a request to the
	 * DataSource.  Any code that assumes the node has been opened must be
	 * passed in as a completion function.
	 * 
	 * @method toggle
	 * @param path {Array} Path to the node
	 * @param request {Object} {sort,dir,startIndex,resultCount}
	 * @param completion {Function|Object} Function to call when the operation completes.  Can be object: {fn,scope,args}
	 * @return {boolean} false if the path to the node has not yet been fully explored or is not openable, true otherwise
	 */
	toggle: function(path, request, completion)
	{
		_yuitest_coverfunc("build/gallery-treeble/gallery-treeble.js", "toggle", 907);
_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 909);
var list = this._open;
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 910);
for (var i=0; i<path.length; i++)
		{
			_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 912);
var node = searchOpen.call(this, list, path[i]);
			_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 913);
if (!node)
			{
				_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 915);
return false;
			}
			_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 917);
list = node.children;
		}

		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 920);
if (node.open === null)
		{
			_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 922);
request.startIndex  = 0;
			_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 923);
request.resultCount = 0;
			_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 924);
node.ds.sendRequest(
			{
				request: node.ds.treeble_config.generateRequest(request, path),
				cfg:     node.ds.treeble_config.requestCfg,
				callback:
				{
					success: Y.rbind(toggleSuccess, this, node, completion),
					failure: Y.rbind(toggleFailure, this, node, completion)
				}
			});
		}
		else
		{
			//node.open = !node.open;
			//complete(completion);
			_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 939);
node.open = !node.open;
			_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 940);
console.log(node);
			_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 941);
console.log(path);
			_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 942);
complete(completion);
			// Method _getNodeFromPath
/*			var contentBox = Y.one('.yui3-datatable-content');

			Y.each(path, function[index] {

			});*/

			// Animate close and execute completion ballback.
/*            var anim = new Y.Anim({
                node: children,
                to: { height: 0 },
                duration: '.25',
                easing: Y.Easing.easeOut
            });

            anim.on('end', function () {
				complete(completion);
            });

            anim.run();*/
		}
	},

	_defRequestFn: function(e)
	{
		// wipe out all state if the request parameters change

		_yuitest_coverfunc("build/gallery-treeble/gallery-treeble.js", "_defRequestFn", 966);
_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 970);
if (this._callback && !compareRequests(this._callback.request, e.request))
		{
			_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 972);
this._open = [];
		}

		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 975);
this._callback = e;
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 976);
requestTree.call(this);
	},

	_cancelAllRequests: function()
	{
		_yuitest_coverfunc("build/gallery-treeble/gallery-treeble.js", "_cancelAllRequests", 979);
_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 981);
this._req    = [];
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 982);
this._toggle = [];
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 983);
delete this._topResponse;
	}
});

_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 987);
Y.TreebleDataSource = TreebleDataSource;
_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 988);
Y.namespace('DataSource').Treeble = TreebleDataSource;
/**
 * @module gallery-treeble
 */

/**
 * <p>Converts data to a DataSource.  Data can be an object containing both
 * <code>dataType</code> and <code>liveData</code>, or it can be <q>free
 * form</q>, e.g., an array of records or an XHR URL.</p>
 *
 * @class Parsers
 */

/**
 * @method treebledatasource
 * @static
 * @param oData {mixed} Data to convert.
 * @return {DataSource} The new data source.
 */
_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 1007);
Y.namespace("Parsers").treebledatasource = function(oData)
{
	_yuitest_coverfunc("build/gallery-treeble/gallery-treeble.js", "treebledatasource", 1007);
_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 1009);
if (!oData)
	{
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 1011);
return null;
	}

	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 1014);
var type = oData.dataType;
	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 1015);
if (type)
	{
		// use it
	}
	else {_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 1019);
if (Y.Lang.isString(oData))
	{
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 1021);
type = 'IO';
	}
	else {_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 1023);
if (Y.Lang.isFunction(oData))
	{
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 1025);
type = 'Function';
	}
	else
	{
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 1029);
type = 'Local';
	}}}

	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 1032);
var src            = oData.dataType ? oData.liveData : oData;
	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 1033);
var treeble_config = this.get('host').treeble_config;
	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 1034);
if (type == 'Local')
	{
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 1036);
treeble_config = Y.clone(treeble_config, true);
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 1037);
delete treeble_config.startIndexExpr;
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 1038);
delete treeble_config.totalRecordsExpr;
	}
	else {_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 1040);
if (type == 'Function')
	{
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 1042);
src = Y.Lang.isString(src) ? window[ src ] : src;
	}}

	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 1045);
var ds            = new Y.DataSource[ type ]({ source: src });
	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 1046);
ds.treeble_config = treeble_config;

	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 1048);
if (ds.treeble_config.schemaPluginConfig)
	{
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 1050);
ds.plug(Y.clone(ds.treeble_config.schemaPluginConfig, true));
	}

	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 1053);
if (ds.treeble_config.cachePluginConfig)
	{
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 1055);
ds.plug(Y.clone(ds.treeble_config.cachePluginConfig, true));
	}

	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 1058);
return ds;
};
/**********************************************************************
 * Treeble displays a tree of data in a table.
 *
 * @module gallery-treeble
 * @main gallery-treeble
 */

/**
 * Extension to DataTable for displaying tree data.
 *
 * @class Treeble
 * @extends DataTable
 * @constructor
 * @param config {Object}
 */
_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 1075);
function Treeble()
{
	_yuitest_coverfunc("build/gallery-treeble/gallery-treeble.js", "Treeble", 1075);
_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 1077);
Treeble.superclass.constructor.apply(this, arguments);
}

_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 1080);
Treeble.NAME = "datatable";		// same styling

/**
 * <p>Formatter for open/close twistdown.</p>
 *
 * @method twistdownFormatter
 * @static
 * @param sendRequest {Function} Function that reloads DataTable
 */
_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 1089);
Treeble.buildTwistdownFormatter = function(sendRequest)
{
	_yuitest_coverfunc("build/gallery-treeble/gallery-treeble.js", "buildTwistdownFormatter", 1089);
_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 1091);
return function(o)
	{
		_yuitest_coverfunc("build/gallery-treeble/gallery-treeble.js", "(anonymous 2)", 1091);
_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 1093);
o.td.addClass('treeble-nub');

		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 1095);
var ds  = this.datasource.get('datasource');
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 1096);
var key = ds.get('root').treeble_config.childNodesKey;

		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 1098);
if (o.data[key])
		{
			_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 1100);
var path = o.data._yui_node_path;

			_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 1102);
o.td.addClass('row-toggle');
			_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 1103);
o.td.replaceClass('row-(open|closed)',
				ds.isOpen(path) ? 'row-open' : 'row-closed');

			_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 1106);
YUI.Env.add(Y.Node.getDOMNode(o.td), 'click', function()
			{
				_yuitest_coverfunc("build/gallery-treeble/gallery-treeble.js", "(anonymous 3)", 1106);
_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 1108);
ds.toggle(path, {}, sendRequest);
			});

			_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 1111);
o.cell.set('innerHTML', '<a class="treeble-expand-nub" href="javascript:void(0);"></a>');
		}

		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 1114);
return false;	// discard Y.Node instances
	};
};

/**
 * <p>Default formatter for indented column.</p>
 *
 * @method treeValueFormatter
 * @static
 */
_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 1124);
Treeble.treeValueFormatter = function(o)
{
	_yuitest_coverfunc("build/gallery-treeble/gallery-treeble.js", "treeValueFormatter", 1124);
_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 1126);
var depth_class = 'treeble-depth-'+o.data._yui_node_depth;
	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 1127);
o.rowClass     += ' ' + depth_class;
	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 1128);
o.className    += ' treeble-value';
	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 1129);
return '<span class="'+depth_class+'">'+o.value+'</span>';
};

_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 1132);
Y.extend(Treeble, Y.DataTable,
{
	plug: function(plugin, config)
	{
		_yuitest_coverfunc("build/gallery-treeble/gallery-treeble.js", "plug", 1134);
_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 1136);
if (plugin === Y.Plugin.DataTableDataSource)
		{
			_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 1138);
var recordType = this.get('recordType');
			_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 1139);
recordType.ATTRS[ config.datasource.get('root').treeble_config.childNodesKey ] = {};
			_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 1140);
recordType.ATTRS._yui_node_path  = {};
			_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 1141);
recordType.ATTRS._yui_node_depth = {};
		}

		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 1144);
Treeble.superclass.plug.apply(this, arguments);
	}
});

_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 1148);
Y.Treeble = Treeble;


}, '@VERSION@', {"requires": ["datasource"], "skinnable": true});
