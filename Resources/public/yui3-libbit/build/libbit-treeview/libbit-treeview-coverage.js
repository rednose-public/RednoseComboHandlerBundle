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
_yuitest_coverage["build/libbit-treeview/libbit-treeview.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/libbit-treeview/libbit-treeview.js",
    code: []
};
_yuitest_coverage["build/libbit-treeview/libbit-treeview.js"].code=["YUI.add('libbit-treeview', function (Y, NAME) {","","var TreeView;","","// TODO: Bind model events","// TODO: Table support, style odd/even","// TODO: Fix overflow CSS for Firefox","// TODO: Implement sorting","// TODO: Document data input","// TODO: Add scrollable","// TODO: Disable text selection within treenodes","TreeView = Y.Base.create('treeView', Y.Widget, [ Y.Libbit.TreeView.Anim, Y.Libbit.TreeView.Selectable, Y.Libbit.TreeView.DD ], {","","    /**","     * Stores the state of expanded nodes.","     */","    _stateMap: [],","","    initializer: function () {","        var model = this.get('data');","","        model.after('load', this._refresh, this);","    },","","    renderUI: function () {","        var contentBox = this.get('contentBox'),","            src        = this.get('srcNode'),","            width      = this.get('width'),","            height     = this.get('height'),","            container  = Y.Node.create('<div class=\"libbit-treeview-content\"></div>'),","            sID        = Y.stamp(container);","","        contentBox.setStyle('width', width);","        contentBox.setStyle('height', height);","","        container.set('id', sID);","        src.append(container);","","        this.set('treeContainer', container);","","        this._renderTree();","    },","","    _renderTree: function () {","        var model         = this.get('data'),","            treeContainer = this.get('treeContainer'),","            tree;","","        if (this.get('tree')) {","            this.get('tree').destroy();","        }","","        // Clone the data object as the TreeView messes with it's internal structure.","        items = this.get('renderLeaves') ? Y.clone(model.get('items')) : Y.clone(model.getBranches());","","        tree = new YAHOO.widget.TreeView(treeContainer.get('id'), items);","        tree.render();","","        this.set('tree', tree);","","        // XXX: Hide the tree while postprocessing?","        this._attachData();","        this._enhanceCells();","","        // TODO: Persist selection","        this._restoreState();","    },","","    bindUI: function () {","        var self = this,","            tree = this.get('tree'),","            nodes;","","        // Forward tree events so extensions and plugins can subscribe to them.","        tree.subscribe('collapseComplete', function (node) {","            var el = self._getTableElement(node).one('.ygtvtp, .ygtvtph, .ygtvlp, .ygtvtlh');","","            // Update the icon.","            self._setCollapsedIcon(el);","","            self.fire('collapseComplete', { node: node });","        });","","        tree.subscribe('expandComplete', function (node) {","            var el = self._getTableElement(node).one('.ygtvtm, .ygtvtmh, .ygtvlm, .ygtvlmh');","","            // Update the icon.","            self._setExpandedIcon(el);","","            self.fire('expandComplete', { node: node });","        });","","        // Disable the default expand/collapse behaviour, only allow","        // expanding and collapsing when clicking the icon.","        tree.subscribe('expand',   function () { return self.get('iconClicked'); });","        tree.subscribe('collapse', function () { return self.get('iconClicked'); });","","        nodes = tree.getNodesBy(function () { return true; });","","        Y.each(nodes, function (node) {","            var table = self._getTableElement(node);","","            // Rebind the click event.","            table.on('click', function (e) {","                var el = e.target.get('parentNode').get('parentNode');","","                // Check if an expand/collapse icon was clicked.","                if (el.hasClass('ygtvtp') ||","                        el.hasClass('ygtvtph') ||","                        el.hasClass('ygtvlp') ||","                        el.hasClass('ygtvlph')) {","","                    self.set('iconClicked', true);","                    node.expand();","                    self.set('iconClicked', false);","","                } else if (el.hasClass('ygtvtm') ||","                        el.hasClass('ygtvtmh') ||","                        el.hasClass('ygtvlm') ||","                        el.hasClass('ygtvlmh')) {","","                    self.set('iconClicked', true);","                    node.collapse();","                    self.set('iconClicked', false);","                }","            });","","            /*var tableWidth = 200;","","            // TODO: Modify nodes before entering the DOM","            mainTable.setStyle('width', tableWidth + 'px');","            node = Y.one('#' + value.labelElId).ancestor('tr');","","            var wrapper = Y.Node.create('<td><table><tbody><tr></tr></tbody></table></td>');","","            var width = 150;","            wrapper.setStyle('width', width + 'px');","","            width = width + 22;","            node.get('children').each(function (c) {","                width = width - 22;","                wrapper.one('tr').append(c);","            });","","            var contentEl = wrapper.one('.ygtvcontent');","            contentEl.setStyle('max-width', width + 'px');","            contentEl.setStyle('overflow', 'hidden');","            contentEl.setStyle('text-overflow', 'ellipsis');","","","            node.append(wrapper);","            node.append(Y.Node.create('<td style=\"width: 50px;\">Test!</td>'));*/","","            /*var fieldGroup = null,","                target,","                node;","","            // Bind the DD to the parent table, for a wider drop range.","            node = Y.one('#' + value.labelElId).ancestor('table');","","            // TODO: Query modellist to get fieldGroup model objects","            if (Y.Lang.isString(value.data)) {","                var obj = Y.JSON.parse(value.data);","","                if (obj.type === 'FieldGroup') {","                    // This is a category object (category type is FieldGroup)","                    self._createDD(node, obj);","                    // Categories allow dropping","                    node.setData({ model: obj});","                    new Y.DD.Drop({","                        node         : node,","                        groups       : ['one'],","                        bubbleTargets: self","                    });","                } else {","                    // This is a fieldGroup.","                    fieldGroup = new Y.TB.FieldGroup(obj);","                    self._createDD(node, fieldGroup);","                }","            }*/","        });","    },","","    _refresh: function () {","        var self  = this,","            tree  = this.get('tree'),","            nodes = tree.getNodesBy(function (node) { return node.expanded; });","","        // Store the state. Store by label for now, clientID seems bugged.","        Y.Array.each(nodes, function (node) {","            self._stateMap.push(node.label);","        });","","        this._renderTree();","        this.bindUI();","    },","","    /**","     * Store a reference to the model for each tree node.","     */","    _attachData: function () {","        var self = this,","            tree = this.get('tree');","","        tree.expandAll();","","        nodes = tree.getNodesBy(function () { return true; });","","        Y.each(nodes, function (node) {","            var table = self._getTableElement(node);","                model = node.data;","","            if (Y.instanceOf(model, Y.Model)) {","                table.setAttribute('data-yui3-record', model.get('clientId'));","                table.setData({ model: model });","            }","        });","","        tree.collapseAll();","    },","","    /**","     * Add the tooltips and render the icons in the treeview.","     */","    _enhanceCells: function () {","        var self        = this,","            boundingBox = this.get('boundingBox');","","        boundingBox.all('.ygtvlabel').each(function (node) {","            var model         = self._getModelFromLabelNode(node),","                content       = node.getContent(),","                collapsedNode = node.ancestor('tr').one('.ygtvtp, .ygtvtph, .ygtvlp, .ygtvtlh'),","                expandedNode  = node.ancestor('tr').one('.ygtvtm, .ygtvtmh, .ygtvlm, .ygtvlmh'),","                contentNode,","                icon;","","            // TODO: Retrieve icon from model mapping, allowHTML and formatter config like Y.DataTable.","            if (Y.instanceOf(model, Y.TB.Category)) {","                icon = 'icon-folder-close';","            } else if (Y.instanceOf(model, Y.TB.FieldGroup)) {","                icon = 'icon-align-left';","            }","","            if (icon) {","                contentNode = Y.Node.create('<span class=\"label-container\"><i class=\"' + icon + '\"></i><span> ' + content + '</span></div>');","                node.setContent(contentNode);","            }","","            node.ancestor('.ygtvtable').set('title', content);","","            // Set the expand/colllapse items if necessary.","            if (collapsedNode) {","                self._setCollapsedIcon(collapsedNode);","            }","","            if (expandedNode) {","                self._setExpandedIcon(expandedNode);","            }","        });","    },","","    /**","     * Restores the current tree state if it's set.","     */","     _restoreState: function () {","        var self = this,","            tree = this.get('tree'),","            nodes;","","        if (this._stateMap.length > 0) {","            nodes = tree.getNodesBy(function (node) {","                return self._stateMap.indexOf(node.label) > -1;","            });","","            Y.Array.each(nodes, function (node) {","                node.expand();","            });","","            this._stateMap = [];","        }","    },","","    /**","     * Retrieves the model corresponding to a label DOM node.","     */","    _getModelFromLabelNode: function (node) {","        return node.ancestor('table').getData().model;","    },","","    /**","     * Retrieve the DOM element containing the main table of a given TreeView node.","     */","    _getTableElement: function (node) {","        var boundingBox = this.get('boundingBox'),","            id          = node.labelElId;","","        return boundingBox.one('#' + id).ancestor('table');","    },","","    /**","     * Add an icon node or update an existing one.","     */","    _setCollapsedIcon: function (el) {","        var a = el.one('a');","","        if (a.one('i')) {","            a.one('i').removeClass('icon-chevron-down');","            a.one('i').addClass('icon-chevron-right');","        } else {","            a.setContent(Y.Node.create('<i class=\"icon-toggle icon-chevron-right\"></i>'));","        }","    },","","    /**","     * Add an icon node or update an existing one.","     */","    _setExpandedIcon: function (el) {","        var a = el.one('a');","","        if (a.one('i')) {","            a.one('i').removeClass('icon-chevron-right');","            a.one('i').addClass('icon-chevron-down');","        } else {","            a.setContent(Y.Node.create('<i class=\"icon-toggle icon-chevron-down\"></i>'));","        }","    }","","}, {","    ATTRS: {","        // The data object containing the models.","        data : {","            value: null","        },","        // The original tree object.","        tree : {","            value: null","        },","        width : {","            value: null","        },","        height : {","            value: null","        },","        // Wether to render all nodes or just branches.","        renderLeaves: {","            value: true","        },","        // State attribute.","        iconClicked : {","            value: false","        }","    }","});","","// -- Namespace ----------------------------------------------------------------","Y.namespace('Libbit').TreeView = TreeView;","","","}, '1.0.0', {","    \"requires\": [","        \"anim\",","        \"libbit-treeview-anim\",","        \"libbit-treeview-select\",","        \"libbit-treeview-dd\",","        \"model\",","        \"widget\",","        \"yui2-treeview\"","    ],","    \"skinnable\": true","});"];
_yuitest_coverage["build/libbit-treeview/libbit-treeview.js"].lines = {"1":0,"3":0,"12":0,"20":0,"22":0,"26":0,"33":0,"34":0,"36":0,"37":0,"39":0,"41":0,"45":0,"49":0,"50":0,"54":0,"56":0,"57":0,"59":0,"62":0,"63":0,"66":0,"70":0,"75":0,"76":0,"79":0,"81":0,"84":0,"85":0,"88":0,"90":0,"95":0,"96":0,"98":0,"100":0,"101":0,"104":0,"105":0,"108":0,"113":0,"114":0,"115":0,"117":0,"122":0,"123":0,"124":0,"185":0,"187":0,"190":0,"191":0,"194":0,"195":0,"202":0,"205":0,"207":0,"209":0,"210":0,"211":0,"213":0,"214":0,"215":0,"219":0,"226":0,"229":0,"230":0,"238":0,"239":0,"240":0,"241":0,"244":0,"245":0,"246":0,"249":0,"252":0,"253":0,"256":0,"257":0,"266":0,"270":0,"271":0,"272":0,"275":0,"276":0,"279":0,"287":0,"294":0,"297":0,"304":0,"306":0,"307":0,"308":0,"310":0,"318":0,"320":0,"321":0,"322":0,"324":0,"356":0};
_yuitest_coverage["build/libbit-treeview/libbit-treeview.js"].functions = {"initializer:19":0,"renderUI:25":0,"_renderTree:44":0,"(anonymous 2):75":0,"(anonymous 3):84":0,"(anonymous 4):95":0,"(anonymous 5):96":0,"(anonymous 6):98":0,"(anonymous 8):104":0,"(anonymous 7):100":0,"bindUI:69":0,"(anonymous 9):187":0,"(anonymous 10):190":0,"_refresh:184":0,"(anonymous 11):207":0,"(anonymous 12):209":0,"_attachData:201":0,"(anonymous 13):229":0,"_enhanceCells:225":0,"(anonymous 14):271":0,"(anonymous 15):275":0,"_restoreState:265":0,"_getModelFromLabelNode:286":0,"_getTableElement:293":0,"_setCollapsedIcon:303":0,"_setExpandedIcon:317":0,"(anonymous 1):1":0};
_yuitest_coverage["build/libbit-treeview/libbit-treeview.js"].coveredLines = 98;
_yuitest_coverage["build/libbit-treeview/libbit-treeview.js"].coveredFunctions = 27;
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 1);
YUI.add('libbit-treeview', function (Y, NAME) {

_yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "(anonymous 1)", 1);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 3);
var TreeView;

// TODO: Bind model events
// TODO: Table support, style odd/even
// TODO: Fix overflow CSS for Firefox
// TODO: Implement sorting
// TODO: Document data input
// TODO: Add scrollable
// TODO: Disable text selection within treenodes
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 12);
TreeView = Y.Base.create('treeView', Y.Widget, [ Y.Libbit.TreeView.Anim, Y.Libbit.TreeView.Selectable, Y.Libbit.TreeView.DD ], {

    /**
     * Stores the state of expanded nodes.
     */
    _stateMap: [],

    initializer: function () {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "initializer", 19);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 20);
var model = this.get('data');

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 22);
model.after('load', this._refresh, this);
    },

    renderUI: function () {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "renderUI", 25);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 26);
var contentBox = this.get('contentBox'),
            src        = this.get('srcNode'),
            width      = this.get('width'),
            height     = this.get('height'),
            container  = Y.Node.create('<div class="libbit-treeview-content"></div>'),
            sID        = Y.stamp(container);

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 33);
contentBox.setStyle('width', width);
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 34);
contentBox.setStyle('height', height);

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 36);
container.set('id', sID);
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 37);
src.append(container);

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 39);
this.set('treeContainer', container);

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 41);
this._renderTree();
    },

    _renderTree: function () {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_renderTree", 44);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 45);
var model         = this.get('data'),
            treeContainer = this.get('treeContainer'),
            tree;

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 49);
if (this.get('tree')) {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 50);
this.get('tree').destroy();
        }

        // Clone the data object as the TreeView messes with it's internal structure.
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 54);
items = this.get('renderLeaves') ? Y.clone(model.get('items')) : Y.clone(model.getBranches());

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 56);
tree = new YAHOO.widget.TreeView(treeContainer.get('id'), items);
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 57);
tree.render();

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 59);
this.set('tree', tree);

        // XXX: Hide the tree while postprocessing?
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 62);
this._attachData();
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 63);
this._enhanceCells();

        // TODO: Persist selection
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 66);
this._restoreState();
    },

    bindUI: function () {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "bindUI", 69);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 70);
var self = this,
            tree = this.get('tree'),
            nodes;

        // Forward tree events so extensions and plugins can subscribe to them.
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 75);
tree.subscribe('collapseComplete', function (node) {
            _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "(anonymous 2)", 75);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 76);
var el = self._getTableElement(node).one('.ygtvtp, .ygtvtph, .ygtvlp, .ygtvtlh');

            // Update the icon.
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 79);
self._setCollapsedIcon(el);

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 81);
self.fire('collapseComplete', { node: node });
        });

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 84);
tree.subscribe('expandComplete', function (node) {
            _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "(anonymous 3)", 84);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 85);
var el = self._getTableElement(node).one('.ygtvtm, .ygtvtmh, .ygtvlm, .ygtvlmh');

            // Update the icon.
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 88);
self._setExpandedIcon(el);

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 90);
self.fire('expandComplete', { node: node });
        });

        // Disable the default expand/collapse behaviour, only allow
        // expanding and collapsing when clicking the icon.
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 95);
tree.subscribe('expand',   function () { _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "(anonymous 4)", 95);
return self.get('iconClicked'); });
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 96);
tree.subscribe('collapse', function () { _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "(anonymous 5)", 96);
return self.get('iconClicked'); });

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 98);
nodes = tree.getNodesBy(function () { _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "(anonymous 6)", 98);
return true; });

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 100);
Y.each(nodes, function (node) {
            _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "(anonymous 7)", 100);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 101);
var table = self._getTableElement(node);

            // Rebind the click event.
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 104);
table.on('click', function (e) {
                _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "(anonymous 8)", 104);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 105);
var el = e.target.get('parentNode').get('parentNode');

                // Check if an expand/collapse icon was clicked.
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 108);
if (el.hasClass('ygtvtp') ||
                        el.hasClass('ygtvtph') ||
                        el.hasClass('ygtvlp') ||
                        el.hasClass('ygtvlph')) {

                    _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 113);
self.set('iconClicked', true);
                    _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 114);
node.expand();
                    _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 115);
self.set('iconClicked', false);

                } else {_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 117);
if (el.hasClass('ygtvtm') ||
                        el.hasClass('ygtvtmh') ||
                        el.hasClass('ygtvlm') ||
                        el.hasClass('ygtvlmh')) {

                    _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 122);
self.set('iconClicked', true);
                    _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 123);
node.collapse();
                    _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 124);
self.set('iconClicked', false);
                }}
            });

            /*var tableWidth = 200;

            // TODO: Modify nodes before entering the DOM
            mainTable.setStyle('width', tableWidth + 'px');
            node = Y.one('#' + value.labelElId).ancestor('tr');

            var wrapper = Y.Node.create('<td><table><tbody><tr></tr></tbody></table></td>');

            var width = 150;
            wrapper.setStyle('width', width + 'px');

            width = width + 22;
            node.get('children').each(function (c) {
                width = width - 22;
                wrapper.one('tr').append(c);
            });

            var contentEl = wrapper.one('.ygtvcontent');
            contentEl.setStyle('max-width', width + 'px');
            contentEl.setStyle('overflow', 'hidden');
            contentEl.setStyle('text-overflow', 'ellipsis');


            node.append(wrapper);
            node.append(Y.Node.create('<td style="width: 50px;">Test!</td>'));*/

            /*var fieldGroup = null,
                target,
                node;

            // Bind the DD to the parent table, for a wider drop range.
            node = Y.one('#' + value.labelElId).ancestor('table');

            // TODO: Query modellist to get fieldGroup model objects
            if (Y.Lang.isString(value.data)) {
                var obj = Y.JSON.parse(value.data);

                if (obj.type === 'FieldGroup') {
                    // This is a category object (category type is FieldGroup)
                    self._createDD(node, obj);
                    // Categories allow dropping
                    node.setData({ model: obj});
                    new Y.DD.Drop({
                        node         : node,
                        groups       : ['one'],
                        bubbleTargets: self
                    });
                } else {
                    // This is a fieldGroup.
                    fieldGroup = new Y.TB.FieldGroup(obj);
                    self._createDD(node, fieldGroup);
                }
            }*/
        });
    },

    _refresh: function () {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_refresh", 184);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 185);
var self  = this,
            tree  = this.get('tree'),
            nodes = tree.getNodesBy(function (node) { _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "(anonymous 9)", 187);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 187);
return node.expanded; });

        // Store the state. Store by label for now, clientID seems bugged.
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 190);
Y.Array.each(nodes, function (node) {
            _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "(anonymous 10)", 190);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 191);
self._stateMap.push(node.label);
        });

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 194);
this._renderTree();
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 195);
this.bindUI();
    },

    /**
     * Store a reference to the model for each tree node.
     */
    _attachData: function () {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_attachData", 201);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 202);
var self = this,
            tree = this.get('tree');

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 205);
tree.expandAll();

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 207);
nodes = tree.getNodesBy(function () { _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "(anonymous 11)", 207);
return true; });

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 209);
Y.each(nodes, function (node) {
            _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "(anonymous 12)", 209);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 210);
var table = self._getTableElement(node);
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 211);
model = node.data;

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 213);
if (Y.instanceOf(model, Y.Model)) {
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 214);
table.setAttribute('data-yui3-record', model.get('clientId'));
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 215);
table.setData({ model: model });
            }
        });

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 219);
tree.collapseAll();
    },

    /**
     * Add the tooltips and render the icons in the treeview.
     */
    _enhanceCells: function () {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_enhanceCells", 225);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 226);
var self        = this,
            boundingBox = this.get('boundingBox');

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 229);
boundingBox.all('.ygtvlabel').each(function (node) {
            _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "(anonymous 13)", 229);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 230);
var model         = self._getModelFromLabelNode(node),
                content       = node.getContent(),
                collapsedNode = node.ancestor('tr').one('.ygtvtp, .ygtvtph, .ygtvlp, .ygtvtlh'),
                expandedNode  = node.ancestor('tr').one('.ygtvtm, .ygtvtmh, .ygtvlm, .ygtvlmh'),
                contentNode,
                icon;

            // TODO: Retrieve icon from model mapping, allowHTML and formatter config like Y.DataTable.
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 238);
if (Y.instanceOf(model, Y.TB.Category)) {
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 239);
icon = 'icon-folder-close';
            } else {_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 240);
if (Y.instanceOf(model, Y.TB.FieldGroup)) {
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 241);
icon = 'icon-align-left';
            }}

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 244);
if (icon) {
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 245);
contentNode = Y.Node.create('<span class="label-container"><i class="' + icon + '"></i><span> ' + content + '</span></div>');
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 246);
node.setContent(contentNode);
            }

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 249);
node.ancestor('.ygtvtable').set('title', content);

            // Set the expand/colllapse items if necessary.
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 252);
if (collapsedNode) {
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 253);
self._setCollapsedIcon(collapsedNode);
            }

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 256);
if (expandedNode) {
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 257);
self._setExpandedIcon(expandedNode);
            }
        });
    },

    /**
     * Restores the current tree state if it's set.
     */
     _restoreState: function () {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_restoreState", 265);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 266);
var self = this,
            tree = this.get('tree'),
            nodes;

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 270);
if (this._stateMap.length > 0) {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 271);
nodes = tree.getNodesBy(function (node) {
                _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "(anonymous 14)", 271);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 272);
return self._stateMap.indexOf(node.label) > -1;
            });

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 275);
Y.Array.each(nodes, function (node) {
                _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "(anonymous 15)", 275);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 276);
node.expand();
            });

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 279);
this._stateMap = [];
        }
    },

    /**
     * Retrieves the model corresponding to a label DOM node.
     */
    _getModelFromLabelNode: function (node) {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_getModelFromLabelNode", 286);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 287);
return node.ancestor('table').getData().model;
    },

    /**
     * Retrieve the DOM element containing the main table of a given TreeView node.
     */
    _getTableElement: function (node) {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_getTableElement", 293);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 294);
var boundingBox = this.get('boundingBox'),
            id          = node.labelElId;

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 297);
return boundingBox.one('#' + id).ancestor('table');
    },

    /**
     * Add an icon node or update an existing one.
     */
    _setCollapsedIcon: function (el) {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_setCollapsedIcon", 303);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 304);
var a = el.one('a');

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 306);
if (a.one('i')) {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 307);
a.one('i').removeClass('icon-chevron-down');
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 308);
a.one('i').addClass('icon-chevron-right');
        } else {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 310);
a.setContent(Y.Node.create('<i class="icon-toggle icon-chevron-right"></i>'));
        }
    },

    /**
     * Add an icon node or update an existing one.
     */
    _setExpandedIcon: function (el) {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_setExpandedIcon", 317);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 318);
var a = el.one('a');

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 320);
if (a.one('i')) {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 321);
a.one('i').removeClass('icon-chevron-right');
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 322);
a.one('i').addClass('icon-chevron-down');
        } else {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 324);
a.setContent(Y.Node.create('<i class="icon-toggle icon-chevron-down"></i>'));
        }
    }

}, {
    ATTRS: {
        // The data object containing the models.
        data : {
            value: null
        },
        // The original tree object.
        tree : {
            value: null
        },
        width : {
            value: null
        },
        height : {
            value: null
        },
        // Wether to render all nodes or just branches.
        renderLeaves: {
            value: true
        },
        // State attribute.
        iconClicked : {
            value: false
        }
    }
});

// -- Namespace ----------------------------------------------------------------
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 356);
Y.namespace('Libbit').TreeView = TreeView;


}, '1.0.0', {
    "requires": [
        "anim",
        "libbit-treeview-anim",
        "libbit-treeview-select",
        "libbit-treeview-dd",
        "model",
        "widget",
        "yui2-treeview"
    ],
    "skinnable": true
});
