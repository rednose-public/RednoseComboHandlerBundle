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
_yuitest_coverage["build/libbit-treeview/libbit-treeview.js"].code=["YUI.add('libbit-treeview', function (Y, NAME) {","","var TreeView;","","// TODO: Bind model events","// TODO: Table support, style odd/even","// TODO: Fix overflow CSS for Firefox","// TODO: Implement sorting","// TODO: Document data input","// TODO: Add scrollable","// TODO: Disable text selection within treenodes","TreeView = Y.Base.create('treeView', Y.Widget, [ Y.Libbit.TreeView.Anim, Y.Libbit.TreeView.Selectable, Y.Libbit.TreeView.DD ], {","","    initializer: function () {","        var model = this.get('data');","","        model.after('load', this._refresh, this);","    },","","    renderUI: function () {","        var contentBox = this.get('contentBox'),","            src        = this.get('srcNode'),","            width      = this.get('width'),","            height     = this.get('height'),","            container  = Y.Node.create('<div class=\"libbit-treeview-content\"></div>'),","            sID        = Y.stamp(container);","","        contentBox.setStyle('width', width);","        contentBox.setStyle('height', height);","","        container.set('id', sID);","        src.append(container);","","        this.set('treeContainer', container);","","        this._renderTree();","    },","","    _renderTree: function () {","        var model         = this.get('data'),","            treeContainer = this.get('treeContainer'),","            tree;","","        if (this.get('tree')) {","            this.get('tree').destroy();","        }","","        tree = new YAHOO.widget.TreeView(treeContainer.get('id'), model.get('data'));","","        tree.render();","","        this.set('tree', tree);","","        // XXX: Hide the tree while postprocessing?","        this._attachData();","        this._enhanceCells();","    },","","    bindUI: function () {","        var self        = this,","            tree        = this.get('tree'),","            nodes;","","        // Forward tree events so extensions and plugins can subscribe to them.","        tree.subscribe('collapseComplete', function (node) {","            var el = self._getTableElement(node).one('.ygtvtp, .ygtvtph, .ygtvlp, .ygtvtlh');","","            // Update the icon.","            self._setCollapsedIcon(el);","","            self.fire('collapseComplete', { node: node });","        });","","        tree.subscribe('expandComplete', function (node) {","            var el = self._getTableElement(node).one('.ygtvtm, .ygtvtmh, .ygtvlm, .ygtvlmh');","","            // Update the icon.","            self._setExpandedIcon(el);","","            self.fire('expandComplete', { node: node });","        });","","        // Disable the default expand/collapse behaviour, only allow","        // expanding and collapsing when clicking the icon.","        tree.subscribe('expand',   function () { return self.get('iconClicked'); });","        tree.subscribe('collapse', function () { return self.get('iconClicked'); });","","        tree.expandAll();","","        nodes = tree.getNodesBy(function () { return true; });","","        Y.each(nodes, function (node) {","            var table = self._getTableElement(node);","","            // Rebind the click event.","            table.on('click', function (e) {","                var el = e.target.get('parentNode').get('parentNode');","","                // Check if an expand/collapse icon was clicked.","                if (el.hasClass('ygtvtp') ||","                        el.hasClass('ygtvtph') ||","                        el.hasClass('ygtvlp') ||","                        el.hasClass('ygtvlph')) {","","                    self.set('iconClicked', true);","                    node.expand();","                    self.set('iconClicked', false);","","                } else if (el.hasClass('ygtvtm') ||","                        el.hasClass('ygtvtmh') ||","                        el.hasClass('ygtvlm') ||","                        el.hasClass('ygtvlmh')) {","","                    self.set('iconClicked', true);","                    node.collapse();","                    self.set('iconClicked', false);","                }","            });","","            /*var tableWidth = 200;","","            // TODO: Modify nodes before entering the DOM","            mainTable.setStyle('width', tableWidth + 'px');","            node = Y.one('#' + value.labelElId).ancestor('tr');","","            var wrapper = Y.Node.create('<td><table><tbody><tr></tr></tbody></table></td>');","","            var width = 150;","            wrapper.setStyle('width', width + 'px');","","            width = width + 22;","            node.get('children').each(function (c) {","                width = width - 22;","                wrapper.one('tr').append(c);","            });","","            var contentEl = wrapper.one('.ygtvcontent');","            contentEl.setStyle('max-width', width + 'px');","            contentEl.setStyle('overflow', 'hidden');","            contentEl.setStyle('text-overflow', 'ellipsis');","","","            node.append(wrapper);","            node.append(Y.Node.create('<td style=\"width: 50px;\">Test!</td>'));*/","","            /*var fieldGroup = null,","                target,","                node;","","            // Bind the DD to the parent table, for a wider drop range.","            node = Y.one('#' + value.labelElId).ancestor('table');","","            // TODO: Query modellist to get fieldGroup model objects","            if (Y.Lang.isString(value.data)) {","                var obj = Y.JSON.parse(value.data);","","                if (obj.type === 'FieldGroup') {","                    // This is a category object (category type is FieldGroup)","                    self._createDD(node, obj);","                    // Categories allow dropping","                    node.setData({ model: obj});","                    new Y.DD.Drop({","                        node         : node,","                        groups       : ['one'],","                        bubbleTargets: self","                    });","                } else {","                    // This is a fieldGroup.","                    fieldGroup = new Y.TB.FieldGroup(obj);","                    self._createDD(node, fieldGroup);","                }","            }*/","        });","","        tree.collapseAll();","    },","","    _refresh: function () {","        this._renderTree();","        this.bindUI();","    },","","    /**","     * Store a reference to the model for each tree node.","     */","    _attachData: function () {","        var self = this,","            tree = this.get('tree');","","        tree.expandAll();","","        nodes = tree.getNodesBy(function () { return true; });","","        Y.each(nodes, function (node) {","            var table = self._getTableElement(node);","                model = node.data;","","            if (Y.instanceOf(model, Y.Model)) {","                table.setAttribute('data-yui3-record', model.get('clientId'));","                table.setData({ model: model });","            }","        });","","        tree.collapseAll();","    },","","    /**","     * Add the tooltips and render the icons in the treeview.","     */","    _enhanceCells: function () {","        var self        = this,","            boundingBox = this.get('boundingBox');","","        boundingBox.all('.ygtvlabel').each(function (node) {","            var model         = self._getModelFromLabelNode(node),","                content       = node.getContent(),","                collapsedNode = node.ancestor('tr').one('.ygtvtp, .ygtvtph, .ygtvlp, .ygtvtlh'),","                expandedNode  = node.ancestor('tr').one('.ygtvtm, .ygtvtmh, .ygtvlm, .ygtvlmh'),","                contentNode,","                icon;","","            // TODO: Retrieve icon from model mapping, allowHTML and formatter config like Y.DataTable.","            if (Y.instanceOf(model, Y.TB.Category)) {","                icon = 'icon-folder-close';","            } else if (Y.instanceOf(model, Y.TB.FieldGroup)) {","                icon = 'icon-align-left';","            }","","            if (icon) {","                contentNode = Y.Node.create('<span class=\"label-container\"><i class=\"' + icon + '\"></i><span> ' + content + '</span></div>');","                node.setContent(contentNode);","            }","","            node.ancestor('.ygtvtable').set('title', content);","","            // Set the expand/colllapse items if necessary.","            if (collapsedNode) {","                self._setCollapsedIcon(collapsedNode);","            }","","            if (expandedNode) {","                self._setExpandedIcon(expandedNode);","            }","        });","    },","","    /**","     * Retrieves the model corresponding to a label DOM node.","     */","    _getModelFromLabelNode: function (node) {","        return node.ancestor('table').getData().model;","    },","","    /**","     * Retrieve the DOM element containing the main table of a given TreeView node.","     */","    _getTableElement: function (node) {","        var boundingBox = this.get('boundingBox'),","            id          = node.labelElId;","","        return boundingBox.one('#' + id).ancestor('table');","    },","","    /**","     * Add an icon node or update an existing one.","     */","    _setCollapsedIcon: function (el) {","        var a = el.one('a');","","        if (a.one('i')) {","            a.one('i').removeClass('icon-chevron-down');","            a.one('i').addClass('icon-chevron-right');","        } else {","            a.setContent(Y.Node.create('<i class=\"icon-toggle icon-chevron-right\"></i>'));","        }","    },","","    /**","     * Add an icon node or update an existing one.","     */","    _setExpandedIcon: function (el) {","        var a = el.one('a');","","        if (a.one('i')) {","            a.one('i').removeClass('icon-chevron-right');","            a.one('i').addClass('icon-chevron-down');","        } else {","            a.setContent(Y.Node.create('<i class=\"icon-toggle icon-chevron-down\"></i>'));","        }","    }","","}, {","    ATTRS: {","        // The data object containing the models.","        data : {","            value: null","        },","        // The original tree object.","        tree : {","            value: null","        },","        width : {","            value: null","        },","        height : {","            value: null","        },","        // State attribute.","        iconClicked : {","            value: false","        }","    }","});","","// -- Namespace ----------------------------------------------------------------","Y.namespace('Libbit').TreeView = TreeView;","","","}, '1.0.0', {","    \"requires\": [","        \"anim\",","        \"libbit-treeview-anim\",","        \"libbit-treeview-select\",","        \"libbit-treeview-dd\",","        \"model\",","        \"widget\",","        \"yui2-treeview\"","    ],","    \"skinnable\": true","});"];
_yuitest_coverage["build/libbit-treeview/libbit-treeview.js"].lines = {"1":0,"3":0,"12":0,"15":0,"17":0,"21":0,"28":0,"29":0,"31":0,"32":0,"34":0,"36":0,"40":0,"44":0,"45":0,"48":0,"50":0,"52":0,"55":0,"56":0,"60":0,"65":0,"66":0,"69":0,"71":0,"74":0,"75":0,"78":0,"80":0,"85":0,"86":0,"88":0,"90":0,"92":0,"93":0,"96":0,"97":0,"100":0,"105":0,"106":0,"107":0,"109":0,"114":0,"115":0,"116":0,"175":0,"179":0,"180":0,"187":0,"190":0,"192":0,"194":0,"195":0,"196":0,"198":0,"199":0,"200":0,"204":0,"211":0,"214":0,"215":0,"223":0,"224":0,"225":0,"226":0,"229":0,"230":0,"231":0,"234":0,"237":0,"238":0,"241":0,"242":0,"251":0,"258":0,"261":0,"268":0,"270":0,"271":0,"272":0,"274":0,"282":0,"284":0,"285":0,"286":0,"288":0,"316":0};
_yuitest_coverage["build/libbit-treeview/libbit-treeview.js"].functions = {"initializer:14":0,"renderUI:20":0,"_renderTree:39":0,"(anonymous 2):65":0,"(anonymous 3):74":0,"(anonymous 4):85":0,"(anonymous 5):86":0,"(anonymous 6):90":0,"(anonymous 8):96":0,"(anonymous 7):92":0,"bindUI:59":0,"_refresh:178":0,"(anonymous 9):192":0,"(anonymous 10):194":0,"_attachData:186":0,"(anonymous 11):214":0,"_enhanceCells:210":0,"_getModelFromLabelNode:250":0,"_getTableElement:257":0,"_setCollapsedIcon:267":0,"_setExpandedIcon:281":0,"(anonymous 1):1":0};
_yuitest_coverage["build/libbit-treeview/libbit-treeview.js"].coveredLines = 87;
_yuitest_coverage["build/libbit-treeview/libbit-treeview.js"].coveredFunctions = 22;
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

    initializer: function () {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "initializer", 14);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 15);
var model = this.get('data');

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 17);
model.after('load', this._refresh, this);
    },

    renderUI: function () {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "renderUI", 20);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 21);
var contentBox = this.get('contentBox'),
            src        = this.get('srcNode'),
            width      = this.get('width'),
            height     = this.get('height'),
            container  = Y.Node.create('<div class="libbit-treeview-content"></div>'),
            sID        = Y.stamp(container);

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 28);
contentBox.setStyle('width', width);
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 29);
contentBox.setStyle('height', height);

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 31);
container.set('id', sID);
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 32);
src.append(container);

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 34);
this.set('treeContainer', container);

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 36);
this._renderTree();
    },

    _renderTree: function () {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_renderTree", 39);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 40);
var model         = this.get('data'),
            treeContainer = this.get('treeContainer'),
            tree;

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 44);
if (this.get('tree')) {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 45);
this.get('tree').destroy();
        }

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 48);
tree = new YAHOO.widget.TreeView(treeContainer.get('id'), model.get('data'));

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 50);
tree.render();

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 52);
this.set('tree', tree);

        // XXX: Hide the tree while postprocessing?
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 55);
this._attachData();
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 56);
this._enhanceCells();
    },

    bindUI: function () {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "bindUI", 59);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 60);
var self        = this,
            tree        = this.get('tree'),
            nodes;

        // Forward tree events so extensions and plugins can subscribe to them.
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 65);
tree.subscribe('collapseComplete', function (node) {
            _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "(anonymous 2)", 65);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 66);
var el = self._getTableElement(node).one('.ygtvtp, .ygtvtph, .ygtvlp, .ygtvtlh');

            // Update the icon.
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 69);
self._setCollapsedIcon(el);

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 71);
self.fire('collapseComplete', { node: node });
        });

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 74);
tree.subscribe('expandComplete', function (node) {
            _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "(anonymous 3)", 74);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 75);
var el = self._getTableElement(node).one('.ygtvtm, .ygtvtmh, .ygtvlm, .ygtvlmh');

            // Update the icon.
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 78);
self._setExpandedIcon(el);

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 80);
self.fire('expandComplete', { node: node });
        });

        // Disable the default expand/collapse behaviour, only allow
        // expanding and collapsing when clicking the icon.
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 85);
tree.subscribe('expand',   function () { _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "(anonymous 4)", 85);
return self.get('iconClicked'); });
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 86);
tree.subscribe('collapse', function () { _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "(anonymous 5)", 86);
return self.get('iconClicked'); });

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 88);
tree.expandAll();

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 90);
nodes = tree.getNodesBy(function () { _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "(anonymous 6)", 90);
return true; });

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 92);
Y.each(nodes, function (node) {
            _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "(anonymous 7)", 92);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 93);
var table = self._getTableElement(node);

            // Rebind the click event.
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 96);
table.on('click', function (e) {
                _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "(anonymous 8)", 96);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 97);
var el = e.target.get('parentNode').get('parentNode');

                // Check if an expand/collapse icon was clicked.
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 100);
if (el.hasClass('ygtvtp') ||
                        el.hasClass('ygtvtph') ||
                        el.hasClass('ygtvlp') ||
                        el.hasClass('ygtvlph')) {

                    _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 105);
self.set('iconClicked', true);
                    _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 106);
node.expand();
                    _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 107);
self.set('iconClicked', false);

                } else {_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 109);
if (el.hasClass('ygtvtm') ||
                        el.hasClass('ygtvtmh') ||
                        el.hasClass('ygtvlm') ||
                        el.hasClass('ygtvlmh')) {

                    _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 114);
self.set('iconClicked', true);
                    _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 115);
node.collapse();
                    _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 116);
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

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 175);
tree.collapseAll();
    },

    _refresh: function () {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_refresh", 178);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 179);
this._renderTree();
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 180);
this.bindUI();
    },

    /**
     * Store a reference to the model for each tree node.
     */
    _attachData: function () {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_attachData", 186);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 187);
var self = this,
            tree = this.get('tree');

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 190);
tree.expandAll();

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 192);
nodes = tree.getNodesBy(function () { _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "(anonymous 9)", 192);
return true; });

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 194);
Y.each(nodes, function (node) {
            _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "(anonymous 10)", 194);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 195);
var table = self._getTableElement(node);
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 196);
model = node.data;

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 198);
if (Y.instanceOf(model, Y.Model)) {
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 199);
table.setAttribute('data-yui3-record', model.get('clientId'));
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 200);
table.setData({ model: model });
            }
        });

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 204);
tree.collapseAll();
    },

    /**
     * Add the tooltips and render the icons in the treeview.
     */
    _enhanceCells: function () {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_enhanceCells", 210);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 211);
var self        = this,
            boundingBox = this.get('boundingBox');

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 214);
boundingBox.all('.ygtvlabel').each(function (node) {
            _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "(anonymous 11)", 214);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 215);
var model         = self._getModelFromLabelNode(node),
                content       = node.getContent(),
                collapsedNode = node.ancestor('tr').one('.ygtvtp, .ygtvtph, .ygtvlp, .ygtvtlh'),
                expandedNode  = node.ancestor('tr').one('.ygtvtm, .ygtvtmh, .ygtvlm, .ygtvlmh'),
                contentNode,
                icon;

            // TODO: Retrieve icon from model mapping, allowHTML and formatter config like Y.DataTable.
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 223);
if (Y.instanceOf(model, Y.TB.Category)) {
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 224);
icon = 'icon-folder-close';
            } else {_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 225);
if (Y.instanceOf(model, Y.TB.FieldGroup)) {
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 226);
icon = 'icon-align-left';
            }}

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 229);
if (icon) {
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 230);
contentNode = Y.Node.create('<span class="label-container"><i class="' + icon + '"></i><span> ' + content + '</span></div>');
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 231);
node.setContent(contentNode);
            }

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 234);
node.ancestor('.ygtvtable').set('title', content);

            // Set the expand/colllapse items if necessary.
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 237);
if (collapsedNode) {
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 238);
self._setCollapsedIcon(collapsedNode);
            }

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 241);
if (expandedNode) {
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 242);
self._setExpandedIcon(expandedNode);
            }
        });
    },

    /**
     * Retrieves the model corresponding to a label DOM node.
     */
    _getModelFromLabelNode: function (node) {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_getModelFromLabelNode", 250);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 251);
return node.ancestor('table').getData().model;
    },

    /**
     * Retrieve the DOM element containing the main table of a given TreeView node.
     */
    _getTableElement: function (node) {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_getTableElement", 257);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 258);
var boundingBox = this.get('boundingBox'),
            id          = node.labelElId;

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 261);
return boundingBox.one('#' + id).ancestor('table');
    },

    /**
     * Add an icon node or update an existing one.
     */
    _setCollapsedIcon: function (el) {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_setCollapsedIcon", 267);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 268);
var a = el.one('a');

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 270);
if (a.one('i')) {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 271);
a.one('i').removeClass('icon-chevron-down');
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 272);
a.one('i').addClass('icon-chevron-right');
        } else {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 274);
a.setContent(Y.Node.create('<i class="icon-toggle icon-chevron-right"></i>'));
        }
    },

    /**
     * Add an icon node or update an existing one.
     */
    _setExpandedIcon: function (el) {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_setExpandedIcon", 281);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 282);
var a = el.one('a');

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 284);
if (a.one('i')) {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 285);
a.one('i').removeClass('icon-chevron-right');
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 286);
a.one('i').addClass('icon-chevron-down');
        } else {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 288);
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
        // State attribute.
        iconClicked : {
            value: false
        }
    }
});

// -- Namespace ----------------------------------------------------------------
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 316);
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
