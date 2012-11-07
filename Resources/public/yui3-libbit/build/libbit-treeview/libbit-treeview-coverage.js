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
_yuitest_coverage["build/libbit-treeview/libbit-treeview.js"].code=["YUI.add('libbit-treeview', function (Y, NAME) {","","var TreeView;","","// TODO: Bind model events","// TODO: Table support, style odd/even","// TODO: Fix overflow CSS for Firefox","// TODO: Implement sorting","// TODO: Document data input","// TODO: Add scrollable","// TODO: Disable text selection within treenodes","TreeView = Y.Base.create('treeView', Y.Widget, [ Y.Libbit.TreeView.Anim, Y.Libbit.TreeView.Selectable, Y.Libbit.TreeView.DD ], {","","    initializer: function () {","        var model = this.get('data');","","        model.after('load', this._refresh, this);","    },","","    renderUI: function () {","        var contentBox = this.get('contentBox'),","            src        = this.get('srcNode'),","            width      = this.get('width'),","            height     = this.get('height'),","            container  = Y.Node.create('<div class=\"libbit-treeview-content\"></div>'),","            sID        = Y.stamp(container);","","        contentBox.setStyle('width', width);","        contentBox.setStyle('height', height);","","        container.set('id', sID);","        src.empty();","        src.append(container);","","        this.set('treeContainer', container);","","        this._renderTree();","    },","","    _renderTree: function () {","        var model         = this.get('data'),","            treeContainer = this.get('treeContainer'),","            tree;","","        if (this.get('tree')) {","            this.get('tree').destroy();","        }","","        tree = new YAHOO.widget.TreeView(treeContainer.get('id'), model.get('data'));","","        tree.render();","","        this.set('tree', tree);","","        // XXX: Hide the tree while postprocessing?","        this._attachData();","        this._enhanceCells();","    },","","    bindUI: function () {","        var self        = this,","            tree        = this.get('tree'),","            nodes;","","        // Forward tree events so extensions and plugins can subscribe to them.","        tree.subscribe('collapseComplete', function (node) {","            var el = self._getTableElement(node).one('.ygtvtp, .ygtvtph, .ygtvlp, .ygtvtlh');","","            // Update the icon.","            self._setCollapsedIcon(el);","","            self.fire('collapseComplete', { node: node });","        });","","        tree.subscribe('expandComplete', function (node) {","            var el = self._getTableElement(node).one('.ygtvtm, .ygtvtmh, .ygtvlm, .ygtvlmh');","","            // Update the icon.","            self._setExpandedIcon(el);","","            self.fire('expandComplete', { node: node });","        });","","        // Disable the default expand/collapse behaviour, only allow","        // expanding and collapsing when clicking the icon.","        tree.subscribe('expand',   function () { return self.get('iconClicked'); });","        tree.subscribe('collapse', function () { return self.get('iconClicked'); });","","        tree.expandAll();","","        nodes = tree.getNodesBy(function () { return true; });","","        Y.each(nodes, function (node) {","            var table = self._getTableElement(node);","","            // Rebind the click event.","            table.on('click', function (e) {","                var el = e.target.get('parentNode').get('parentNode');","","                // Check if an expand/collapse icon was clicked.","                if (el.hasClass('ygtvtp') ||","                        el.hasClass('ygtvtph') ||","                        el.hasClass('ygtvlp') ||","                        el.hasClass('ygtvlph')) {","","                    self.set('iconClicked', true);","                    node.expand();","                    self.set('iconClicked', false);","","                } else if (el.hasClass('ygtvtm') ||","                        el.hasClass('ygtvtmh') ||","                        el.hasClass('ygtvlm') ||","                        el.hasClass('ygtvlmh')) {","","                    self.set('iconClicked', true);","                    node.collapse();","                    self.set('iconClicked', false);","                }","            });","","            /*var tableWidth = 200;","","            // TODO: Modify nodes before entering the DOM","            mainTable.setStyle('width', tableWidth + 'px');","            node = Y.one('#' + value.labelElId).ancestor('tr');","","            var wrapper = Y.Node.create('<td><table><tbody><tr></tr></tbody></table></td>');","","            var width = 150;","            wrapper.setStyle('width', width + 'px');","","            width = width + 22;","            node.get('children').each(function (c) {","                width = width - 22;","                wrapper.one('tr').append(c);","            });","","            var contentEl = wrapper.one('.ygtvcontent');","            contentEl.setStyle('max-width', width + 'px');","            contentEl.setStyle('overflow', 'hidden');","            contentEl.setStyle('text-overflow', 'ellipsis');","","","            node.append(wrapper);","            node.append(Y.Node.create('<td style=\"width: 50px;\">Test!</td>'));*/","","            /*var fieldGroup = null,","                target,","                node;","","            // Bind the DD to the parent table, for a wider drop range.","            node = Y.one('#' + value.labelElId).ancestor('table');","","            // TODO: Query modellist to get fieldGroup model objects","            if (Y.Lang.isString(value.data)) {","                var obj = Y.JSON.parse(value.data);","","                if (obj.type === 'FieldGroup') {","                    // This is a category object (category type is FieldGroup)","                    self._createDD(node, obj);","                    // Categories allow dropping","                    node.setData({ model: obj});","                    new Y.DD.Drop({","                        node         : node,","                        groups       : ['one'],","                        bubbleTargets: self","                    });","                } else {","                    // This is a fieldGroup.","                    fieldGroup = new Y.TB.FieldGroup(obj);","                    self._createDD(node, fieldGroup);","                }","            }*/","        });","","        tree.collapseAll();","    },","","    _refresh: function () {","        this._renderTree();","        this.bindUI();","    },","","    /**","     * Store a reference to the model for each tree node.","     */","    _attachData: function () {","        var self = this,","            tree = this.get('tree');","","        tree.expandAll();","","        nodes = tree.getNodesBy(function () { return true; });","","        Y.each(nodes, function (node) {","            var table = self._getTableElement(node);","                model = node.data;","","            if (Y.instanceOf(model, Y.Model)) {","                table.setAttribute('data-yui3-record', model.get('clientId'));","                table.setData({ model: model });","            }","        });","","        tree.collapseAll();","    },","","    /**","     * Add the tooltips and render the icons in the treeview.","     */","    _enhanceCells: function () {","        var self        = this,","            boundingBox = this.get('boundingBox');","","        boundingBox.all('.ygtvlabel').each(function (node) {","            var model         = self._getModelFromLabelNode(node),","                content       = node.getContent(),","                collapsedNode = node.ancestor('tr').one('.ygtvtp, .ygtvtph, .ygtvlp, .ygtvtlh'),","                expandedNode  = node.ancestor('tr').one('.ygtvtm, .ygtvtmh, .ygtvlm, .ygtvlmh'),","                contentNode,","                icon;","","            // TODO: Retrieve icon from model mapping, allowHTML and formatter config like Y.DataTable.","            if (Y.instanceOf(model, Y.TB.Category)) {","                icon = 'icon-folder-close';","            } else if (Y.instanceOf(model, Y.TB.FieldGroup)) {","                icon = 'icon-align-left';","            }","","            if (icon) {","                contentNode = Y.Node.create('<span class=\"label-container\"><i class=\"' + icon + '\"></i><span> ' + content + '</span></div>');","                node.setContent(contentNode);","            }","","            node.ancestor('.ygtvtable').set('title', content);","","            // Set the expand/colllapse items if necessary.","            if (collapsedNode) {","                self._setCollapsedIcon(collapsedNode);","            }","","            if (expandedNode) {","                self._setExpandedIcon(expandedNode);","            }","        });","    },","","    /**","     * Retrieves the model corresponding to a label DOM node.","     */","    _getModelFromLabelNode: function (node) {","        return node.ancestor('table').getData().model;","    },","","    /**","     * Retrieve the DOM element containing the main table of a given TreeView node.","     */","    _getTableElement: function (node) {","        var boundingBox = this.get('boundingBox'),","            id          = node.labelElId;","","        return boundingBox.one('#' + id).ancestor('table');","    },","","    /**","     * Add an icon node or update an existing one.","     */","    _setCollapsedIcon: function (el) {","        var a = el.one('a');","","        if (a.one('i')) {","            a.one('i').removeClass('icon-chevron-down');","            a.one('i').addClass('icon-chevron-right');","        } else {","            a.setContent(Y.Node.create('<i class=\"icon-toggle icon-chevron-right\"></i>'));","        }","    },","","    /**","     * Add an icon node or update an existing one.","     */","    _setExpandedIcon: function (el) {","        var a = el.one('a');","","        if (a.one('i')) {","            a.one('i').removeClass('icon-chevron-right');","            a.one('i').addClass('icon-chevron-down');","        } else {","            a.setContent(Y.Node.create('<i class=\"icon-toggle icon-chevron-down\"></i>'));","        }","    }","","}, {","    ATTRS: {","        // The data object containing the models.","        data : {","            value: null","        },","        // The original tree object.","        tree : {","            value: null","        },","        width : {","            value: null","        },","        height : {","            value: null","        },","        // State attribute.","        iconClicked : {","            value: false","        }","    }","});","","// -- Namespace ----------------------------------------------------------------","Y.namespace('Libbit').TreeView = TreeView;","","","}, '1.0.0', {","    \"requires\": [","        \"anim\",","        \"libbit-treeview-anim\",","        \"libbit-treeview-select\",","        \"libbit-treeview-dd\",","        \"model\",","        \"widget\",","        \"yui2-treeview\"","    ],","    \"skinnable\": true","});"];
_yuitest_coverage["build/libbit-treeview/libbit-treeview.js"].lines = {"1":0,"3":0,"12":0,"15":0,"17":0,"21":0,"28":0,"29":0,"31":0,"32":0,"33":0,"35":0,"37":0,"41":0,"45":0,"46":0,"49":0,"51":0,"53":0,"56":0,"57":0,"61":0,"66":0,"67":0,"70":0,"72":0,"75":0,"76":0,"79":0,"81":0,"86":0,"87":0,"89":0,"91":0,"93":0,"94":0,"97":0,"98":0,"101":0,"106":0,"107":0,"108":0,"110":0,"115":0,"116":0,"117":0,"176":0,"180":0,"181":0,"188":0,"191":0,"193":0,"195":0,"196":0,"197":0,"199":0,"200":0,"201":0,"205":0,"212":0,"215":0,"216":0,"224":0,"225":0,"226":0,"227":0,"230":0,"231":0,"232":0,"235":0,"238":0,"239":0,"242":0,"243":0,"252":0,"259":0,"262":0,"269":0,"271":0,"272":0,"273":0,"275":0,"283":0,"285":0,"286":0,"287":0,"289":0,"317":0};
_yuitest_coverage["build/libbit-treeview/libbit-treeview.js"].functions = {"initializer:14":0,"renderUI:20":0,"_renderTree:40":0,"(anonymous 2):66":0,"(anonymous 3):75":0,"(anonymous 4):86":0,"(anonymous 5):87":0,"(anonymous 6):91":0,"(anonymous 8):97":0,"(anonymous 7):93":0,"bindUI:60":0,"_refresh:179":0,"(anonymous 9):193":0,"(anonymous 10):195":0,"_attachData:187":0,"(anonymous 11):215":0,"_enhanceCells:211":0,"_getModelFromLabelNode:251":0,"_getTableElement:258":0,"_setCollapsedIcon:268":0,"_setExpandedIcon:282":0,"(anonymous 1):1":0};
_yuitest_coverage["build/libbit-treeview/libbit-treeview.js"].coveredLines = 88;
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
src.empty();
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 33);
src.append(container);

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 35);
this.set('treeContainer', container);

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 37);
this._renderTree();
    },

    _renderTree: function () {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_renderTree", 40);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 41);
var model         = this.get('data'),
            treeContainer = this.get('treeContainer'),
            tree;

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 45);
if (this.get('tree')) {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 46);
this.get('tree').destroy();
        }

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 49);
tree = new YAHOO.widget.TreeView(treeContainer.get('id'), model.get('data'));

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 51);
tree.render();

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 53);
this.set('tree', tree);

        // XXX: Hide the tree while postprocessing?
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 56);
this._attachData();
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 57);
this._enhanceCells();
    },

    bindUI: function () {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "bindUI", 60);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 61);
var self        = this,
            tree        = this.get('tree'),
            nodes;

        // Forward tree events so extensions and plugins can subscribe to them.
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 66);
tree.subscribe('collapseComplete', function (node) {
            _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "(anonymous 2)", 66);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 67);
var el = self._getTableElement(node).one('.ygtvtp, .ygtvtph, .ygtvlp, .ygtvtlh');

            // Update the icon.
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 70);
self._setCollapsedIcon(el);

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 72);
self.fire('collapseComplete', { node: node });
        });

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 75);
tree.subscribe('expandComplete', function (node) {
            _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "(anonymous 3)", 75);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 76);
var el = self._getTableElement(node).one('.ygtvtm, .ygtvtmh, .ygtvlm, .ygtvlmh');

            // Update the icon.
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 79);
self._setExpandedIcon(el);

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 81);
self.fire('expandComplete', { node: node });
        });

        // Disable the default expand/collapse behaviour, only allow
        // expanding and collapsing when clicking the icon.
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 86);
tree.subscribe('expand',   function () { _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "(anonymous 4)", 86);
return self.get('iconClicked'); });
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 87);
tree.subscribe('collapse', function () { _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "(anonymous 5)", 87);
return self.get('iconClicked'); });

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 89);
tree.expandAll();

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 91);
nodes = tree.getNodesBy(function () { _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "(anonymous 6)", 91);
return true; });

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 93);
Y.each(nodes, function (node) {
            _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "(anonymous 7)", 93);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 94);
var table = self._getTableElement(node);

            // Rebind the click event.
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 97);
table.on('click', function (e) {
                _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "(anonymous 8)", 97);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 98);
var el = e.target.get('parentNode').get('parentNode');

                // Check if an expand/collapse icon was clicked.
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 101);
if (el.hasClass('ygtvtp') ||
                        el.hasClass('ygtvtph') ||
                        el.hasClass('ygtvlp') ||
                        el.hasClass('ygtvlph')) {

                    _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 106);
self.set('iconClicked', true);
                    _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 107);
node.expand();
                    _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 108);
self.set('iconClicked', false);

                } else {_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 110);
if (el.hasClass('ygtvtm') ||
                        el.hasClass('ygtvtmh') ||
                        el.hasClass('ygtvlm') ||
                        el.hasClass('ygtvlmh')) {

                    _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 115);
self.set('iconClicked', true);
                    _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 116);
node.collapse();
                    _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 117);
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

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 176);
tree.collapseAll();
    },

    _refresh: function () {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_refresh", 179);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 180);
this._renderTree();
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 181);
this.bindUI();
    },

    /**
     * Store a reference to the model for each tree node.
     */
    _attachData: function () {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_attachData", 187);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 188);
var self = this,
            tree = this.get('tree');

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 191);
tree.expandAll();

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 193);
nodes = tree.getNodesBy(function () { _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "(anonymous 9)", 193);
return true; });

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 195);
Y.each(nodes, function (node) {
            _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "(anonymous 10)", 195);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 196);
var table = self._getTableElement(node);
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 197);
model = node.data;

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 199);
if (Y.instanceOf(model, Y.Model)) {
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 200);
table.setAttribute('data-yui3-record', model.get('clientId'));
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 201);
table.setData({ model: model });
            }
        });

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 205);
tree.collapseAll();
    },

    /**
     * Add the tooltips and render the icons in the treeview.
     */
    _enhanceCells: function () {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_enhanceCells", 211);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 212);
var self        = this,
            boundingBox = this.get('boundingBox');

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 215);
boundingBox.all('.ygtvlabel').each(function (node) {
            _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "(anonymous 11)", 215);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 216);
var model         = self._getModelFromLabelNode(node),
                content       = node.getContent(),
                collapsedNode = node.ancestor('tr').one('.ygtvtp, .ygtvtph, .ygtvlp, .ygtvtlh'),
                expandedNode  = node.ancestor('tr').one('.ygtvtm, .ygtvtmh, .ygtvlm, .ygtvlmh'),
                contentNode,
                icon;

            // TODO: Retrieve icon from model mapping, allowHTML and formatter config like Y.DataTable.
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 224);
if (Y.instanceOf(model, Y.TB.Category)) {
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 225);
icon = 'icon-folder-close';
            } else {_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 226);
if (Y.instanceOf(model, Y.TB.FieldGroup)) {
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 227);
icon = 'icon-align-left';
            }}

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 230);
if (icon) {
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 231);
contentNode = Y.Node.create('<span class="label-container"><i class="' + icon + '"></i><span> ' + content + '</span></div>');
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 232);
node.setContent(contentNode);
            }

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 235);
node.ancestor('.ygtvtable').set('title', content);

            // Set the expand/colllapse items if necessary.
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 238);
if (collapsedNode) {
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 239);
self._setCollapsedIcon(collapsedNode);
            }

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 242);
if (expandedNode) {
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 243);
self._setExpandedIcon(expandedNode);
            }
        });
    },

    /**
     * Retrieves the model corresponding to a label DOM node.
     */
    _getModelFromLabelNode: function (node) {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_getModelFromLabelNode", 251);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 252);
return node.ancestor('table').getData().model;
    },

    /**
     * Retrieve the DOM element containing the main table of a given TreeView node.
     */
    _getTableElement: function (node) {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_getTableElement", 258);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 259);
var boundingBox = this.get('boundingBox'),
            id          = node.labelElId;

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 262);
return boundingBox.one('#' + id).ancestor('table');
    },

    /**
     * Add an icon node or update an existing one.
     */
    _setCollapsedIcon: function (el) {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_setCollapsedIcon", 268);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 269);
var a = el.one('a');

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 271);
if (a.one('i')) {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 272);
a.one('i').removeClass('icon-chevron-down');
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 273);
a.one('i').addClass('icon-chevron-right');
        } else {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 275);
a.setContent(Y.Node.create('<i class="icon-toggle icon-chevron-right"></i>'));
        }
    },

    /**
     * Add an icon node or update an existing one.
     */
    _setExpandedIcon: function (el) {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_setExpandedIcon", 282);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 283);
var a = el.one('a');

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 285);
if (a.one('i')) {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 286);
a.one('i').removeClass('icon-chevron-right');
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 287);
a.one('i').addClass('icon-chevron-down');
        } else {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 289);
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
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 317);
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
