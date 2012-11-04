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
_yuitest_coverage["build/libbit-treeview/libbit-treeview.js"].code=["YUI.add('libbit-treeview', function (Y, NAME) {","","var TreeView;","","// TODO: Cursor default","// TODO: Triangle icon","// TODO: Bind model events","// TODO: Style odd/even","// TODO: Full model name in tooltip","// TODO: Fix overflow CSS for Firefox","// TODO: Implement sorting","TreeView = Y.Base.create('treeview', Y.Widget, [ Y.Libbit.TreeView.Anim ], {","","    renderUI: function () {","        var self      = this,","            data      = this.get('data'),","            src       = this.get('srcNode'),","            container = Y.Node.create('<div></div>'),","            uniqueID  = new Date().getTime(),","            nodes;","","        container.set('id', uniqueID);","        container.addClass('libbit-treeview-content');","","        src.append(container);","","        tree = new YAHOO.widget.TreeView(container.get('id'), data);","        tree.render();","","        this.set('tree', tree);","","        this._attachData();","        this._renderIcons();","    },","","    bindUI: function () {","        var self        = this,","            tree        = this.get('tree'),","            boundingBox = this.get('boundingBox'),","            dd,","            nodes;","","        // Forward tree events so extensions and plugins can subscribe to them.","        tree.subscribe('collapseComplete', function (node) {","            self.fire('collapseComplete', { node: node });","        });","","        tree.subscribe('expandComplete', function (node) {","            self.fire('expandComplete', { node: node });","        });","","        // Disable the default expand/collapse behaviour, only allow","        // expanding and collapsing when clicking the icon.","        tree.subscribe('expand',   function (node) { return self.get('iconClicked'); });","        tree.subscribe('collapse', function (node) { return self.get('iconClicked'); });","","        tree.expandAll();","","        nodes = tree.getNodesBy(function () { return true; });","","        Y.each(nodes, function (node, index) {","            var table = self._getTableElement(node);","","            // Rebind the click event.","            table.on('click', function (e) {","                var el = e.target.get('parentNode');","","                // Check if an expand/collapse icon was clicked.","                if (el.hasClass('ygtvtp') ||","                        el.hasClass('ygtvtph') ||","                        el.hasClass('ygtvlp') ||","                        el.hasClass('ygtvlph')) {","","                    self.set('iconClicked', true);","                    node.expand();","                    self.set('iconClicked', false);","","                } else if (el.hasClass('ygtvtm') ||","                        el.hasClass('ygtvtmh') ||","                        el.hasClass('ygtvlm') ||","                        el.hasClass('ygtvlmh')) {","","                    self.set('iconClicked', true);","                    node.collapse();","                    self.set('iconClicked', false);","                }","            });","","            /*var tableWidth = 200;","","            // TODO: Modify nodes before entering the DOM","            mainTable.setStyle('width', tableWidth + 'px');","            node = Y.one('#' + value.labelElId).ancestor('tr');","","            var wrapper = Y.Node.create('<td><table><tbody><tr></tr></tbody></table></td>');","","            var width = 150;","            wrapper.setStyle('width', width + 'px');","","            width = width + 22;","            node.get('children').each(function (c) {","                width = width - 22;","                wrapper.one('tr').append(c);","            });","","            var contentEl = wrapper.one('.ygtvcontent');","            contentEl.setStyle('max-width', width + 'px');","            contentEl.setStyle('overflow', 'hidden');","            contentEl.setStyle('text-overflow', 'ellipsis');","","","            node.append(wrapper);","            node.append(Y.Node.create('<td style=\"width: 50px;\">Test!</td>'));*/","","            /*var fieldGroup = null,","                target,","                node;","","            // Bind the DD to the parent table, for a wider drop range.","            node = Y.one('#' + value.labelElId).ancestor('table');","","            // TODO: Query modellist to get fieldGroup model objects","            if (Y.Lang.isString(value.data)) {","                var obj = Y.JSON.parse(value.data);","","                if (obj.type === 'FieldGroup') {","                    // This is a category object (category type is FieldGroup)","                    self._createDD(node, obj);","                    // Categories allow dropping","                    node.setData({ model: obj});","                    new Y.DD.Drop({","                        node         : node,","                        groups       : ['one'],","                        bubbleTargets: self","                    });","                } else {","                    // This is a fieldGroup.","                    fieldGroup = new Y.TB.FieldGroup(obj);","                    self._createDD(node, fieldGroup);","                }","            }*/","        });","","        tree.collapseAll();","    },","","    /**","     * Store a reference to the model for each tree node.","     */","    _attachData: function () {","        var self = this,","            tree = this.get('tree');","","        tree.expandAll();","","        nodes = tree.getNodesBy(function () {","            return true;","        });","","        Y.each(nodes, function (node) {","            var table = self._getTableElement(node);","                model = node.data;","","            if (Y.instanceOf(model, Y.Model)) {","                table.setAttribute('data-yui3-record', model.get('clientId'));","                table.setData({ model: model });","            }","        });","","        tree.collapseAll();","    },","","    /**","     * Render the icons in the treeview.","     */","    _renderIcons: function () {","        var self        = this,","            boundingBox = this.get('boundingBox');","","        boundingBox.all('.ygtvlabel').each(function (node) {","            var model   = self._getModelFromLabelNode(node),","                content = node.getContent(),","                contentNode,","                icon;","","            // TODO: Retrieve icon from model mapping, allowHTML and formatter config like Y.DataTable.","            if (Y.instanceOf(model, Y.TB.Category)) {","                icon = 'icon-folder-close';","            } else if (Y.instanceOf(model, Y.TB.FieldGroup)) {","                icon = 'icon-align-left';","            }","","            if (icon) {","                contentNode = Y.Node.create('<span style=\"white-space: nowrap;\"><i class=\"' + icon + '\"></i><span> ' + content + '</span></div>');","                node.setContent(contentNode);","            }","        });","    },","","    /**","     * Retrieves the model corresponding to a label DOM node.","     */","    _getModelFromLabelNode: function (node) {","        return node.ancestor('table').getData().model;","    },","","    /**","     * Retrieve the DOM element containing the main table of a given TreeView node.","     */","    _getTableElement: function (node) {","        var boundingBox = this.get('boundingBox'),","            id          = node.labelElId;","","        return boundingBox.one('#' + id).ancestor('table');","    }","}, {","    ATTRS: {","        // The data object containing the models.","        data : {","            value: null","        },","        // The original tree object.","        tree : {","            value: null","        },","        // State attribute.","        iconClicked : {","            value: false","        }","    }","});","","// -- Namespace ----------------------------------------------------------------","Y.namespace('Libbit').TreeView = TreeView;","","","}, '@VERSION@', {\"requires\": [\"anim\", \"libbit-treeview-anim\", \"model\", \"widget\", \"yui2-treeview\"], \"skinnable\": true});"];
_yuitest_coverage["build/libbit-treeview/libbit-treeview.js"].lines = {"1":0,"3":0,"12":0,"15":0,"22":0,"23":0,"25":0,"27":0,"28":0,"30":0,"32":0,"33":0,"37":0,"44":0,"45":0,"48":0,"49":0,"54":0,"55":0,"57":0,"59":0,"61":0,"62":0,"65":0,"66":0,"69":0,"74":0,"75":0,"76":0,"78":0,"83":0,"84":0,"85":0,"144":0,"151":0,"154":0,"156":0,"157":0,"160":0,"161":0,"162":0,"164":0,"165":0,"166":0,"170":0,"177":0,"180":0,"181":0,"187":0,"188":0,"189":0,"190":0,"193":0,"194":0,"195":0,"204":0,"211":0,"214":0,"234":0};
_yuitest_coverage["build/libbit-treeview/libbit-treeview.js"].functions = {"renderUI:14":0,"(anonymous 2):44":0,"(anonymous 3):48":0,"(anonymous 4):54":0,"(anonymous 5):55":0,"(anonymous 6):59":0,"(anonymous 8):65":0,"(anonymous 7):61":0,"bindUI:36":0,"(anonymous 9):156":0,"(anonymous 10):160":0,"_attachData:150":0,"(anonymous 11):180":0,"_renderIcons:176":0,"_getModelFromLabelNode:203":0,"_getTableElement:210":0,"(anonymous 1):1":0};
_yuitest_coverage["build/libbit-treeview/libbit-treeview.js"].coveredLines = 59;
_yuitest_coverage["build/libbit-treeview/libbit-treeview.js"].coveredFunctions = 17;
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 1);
YUI.add('libbit-treeview', function (Y, NAME) {

_yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "(anonymous 1)", 1);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 3);
var TreeView;

// TODO: Cursor default
// TODO: Triangle icon
// TODO: Bind model events
// TODO: Style odd/even
// TODO: Full model name in tooltip
// TODO: Fix overflow CSS for Firefox
// TODO: Implement sorting
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 12);
TreeView = Y.Base.create('treeview', Y.Widget, [ Y.Libbit.TreeView.Anim ], {

    renderUI: function () {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "renderUI", 14);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 15);
var self      = this,
            data      = this.get('data'),
            src       = this.get('srcNode'),
            container = Y.Node.create('<div></div>'),
            uniqueID  = new Date().getTime(),
            nodes;

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 22);
container.set('id', uniqueID);
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 23);
container.addClass('libbit-treeview-content');

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 25);
src.append(container);

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 27);
tree = new YAHOO.widget.TreeView(container.get('id'), data);
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 28);
tree.render();

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 30);
this.set('tree', tree);

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 32);
this._attachData();
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 33);
this._renderIcons();
    },

    bindUI: function () {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "bindUI", 36);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 37);
var self        = this,
            tree        = this.get('tree'),
            boundingBox = this.get('boundingBox'),
            dd,
            nodes;

        // Forward tree events so extensions and plugins can subscribe to them.
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 44);
tree.subscribe('collapseComplete', function (node) {
            _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "(anonymous 2)", 44);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 45);
self.fire('collapseComplete', { node: node });
        });

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 48);
tree.subscribe('expandComplete', function (node) {
            _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "(anonymous 3)", 48);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 49);
self.fire('expandComplete', { node: node });
        });

        // Disable the default expand/collapse behaviour, only allow
        // expanding and collapsing when clicking the icon.
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 54);
tree.subscribe('expand',   function (node) { _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "(anonymous 4)", 54);
return self.get('iconClicked'); });
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 55);
tree.subscribe('collapse', function (node) { _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "(anonymous 5)", 55);
return self.get('iconClicked'); });

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 57);
tree.expandAll();

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 59);
nodes = tree.getNodesBy(function () { _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "(anonymous 6)", 59);
return true; });

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 61);
Y.each(nodes, function (node, index) {
            _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "(anonymous 7)", 61);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 62);
var table = self._getTableElement(node);

            // Rebind the click event.
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 65);
table.on('click', function (e) {
                _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "(anonymous 8)", 65);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 66);
var el = e.target.get('parentNode');

                // Check if an expand/collapse icon was clicked.
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 69);
if (el.hasClass('ygtvtp') ||
                        el.hasClass('ygtvtph') ||
                        el.hasClass('ygtvlp') ||
                        el.hasClass('ygtvlph')) {

                    _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 74);
self.set('iconClicked', true);
                    _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 75);
node.expand();
                    _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 76);
self.set('iconClicked', false);

                } else {_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 78);
if (el.hasClass('ygtvtm') ||
                        el.hasClass('ygtvtmh') ||
                        el.hasClass('ygtvlm') ||
                        el.hasClass('ygtvlmh')) {

                    _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 83);
self.set('iconClicked', true);
                    _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 84);
node.collapse();
                    _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 85);
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

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 144);
tree.collapseAll();
    },

    /**
     * Store a reference to the model for each tree node.
     */
    _attachData: function () {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_attachData", 150);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 151);
var self = this,
            tree = this.get('tree');

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 154);
tree.expandAll();

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 156);
nodes = tree.getNodesBy(function () {
            _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "(anonymous 9)", 156);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 157);
return true;
        });

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 160);
Y.each(nodes, function (node) {
            _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "(anonymous 10)", 160);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 161);
var table = self._getTableElement(node);
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 162);
model = node.data;

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 164);
if (Y.instanceOf(model, Y.Model)) {
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 165);
table.setAttribute('data-yui3-record', model.get('clientId'));
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 166);
table.setData({ model: model });
            }
        });

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 170);
tree.collapseAll();
    },

    /**
     * Render the icons in the treeview.
     */
    _renderIcons: function () {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_renderIcons", 176);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 177);
var self        = this,
            boundingBox = this.get('boundingBox');

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 180);
boundingBox.all('.ygtvlabel').each(function (node) {
            _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "(anonymous 11)", 180);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 181);
var model   = self._getModelFromLabelNode(node),
                content = node.getContent(),
                contentNode,
                icon;

            // TODO: Retrieve icon from model mapping, allowHTML and formatter config like Y.DataTable.
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 187);
if (Y.instanceOf(model, Y.TB.Category)) {
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 188);
icon = 'icon-folder-close';
            } else {_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 189);
if (Y.instanceOf(model, Y.TB.FieldGroup)) {
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 190);
icon = 'icon-align-left';
            }}

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 193);
if (icon) {
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 194);
contentNode = Y.Node.create('<span style="white-space: nowrap;"><i class="' + icon + '"></i><span> ' + content + '</span></div>');
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 195);
node.setContent(contentNode);
            }
        });
    },

    /**
     * Retrieves the model corresponding to a label DOM node.
     */
    _getModelFromLabelNode: function (node) {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_getModelFromLabelNode", 203);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 204);
return node.ancestor('table').getData().model;
    },

    /**
     * Retrieve the DOM element containing the main table of a given TreeView node.
     */
    _getTableElement: function (node) {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_getTableElement", 210);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 211);
var boundingBox = this.get('boundingBox'),
            id          = node.labelElId;

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 214);
return boundingBox.one('#' + id).ancestor('table');
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
        // State attribute.
        iconClicked : {
            value: false
        }
    }
});

// -- Namespace ----------------------------------------------------------------
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 234);
Y.namespace('Libbit').TreeView = TreeView;


}, '@VERSION@', {"requires": ["anim", "libbit-treeview-anim", "model", "widget", "yui2-treeview"], "skinnable": true});
