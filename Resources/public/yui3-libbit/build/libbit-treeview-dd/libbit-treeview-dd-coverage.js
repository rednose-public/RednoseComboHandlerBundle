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
_yuitest_coverage["build/libbit-treeview-dd/libbit-treeview-dd.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/libbit-treeview-dd/libbit-treeview-dd.js",
    code: []
};
_yuitest_coverage["build/libbit-treeview-dd/libbit-treeview-dd.js"].code=["YUI.add('libbit-treeview-dd', function (Y, NAME) {","","var DD;","","/**"," * Drag and drop extension for the TreeView."," */","DD = Y.Base.create('dd', Y.Base, [], {","","    /**","     * Subscribe to the render event and set up DD listeners.","     */","    initializer: function () {","        Y.Do.after(this._bindDD, this, 'bindUI', this);","        //Y.Do.after(this._bindDD, this, 'refresh', this);","","        this.on('drag:start', this._handleStart, this);","        this.on('drop:hit', this._handleDrop, this);","        this.on('drop:over', this._handleOver, this);","","        this.on('drop:enter', this._dropEnterGlobal, this);","    },","","    /**","     * Bind all DD instance after the parent view has been rendered.","     */","    _bindDD: function () {","        var self      = this,","            tree      = this.get('tree'),","            nodes;","","        tree.expandAll();","","        // Setup DD.","        nodes = tree.getNodesBy(function () { return true; });","","        Y.each(nodes, function (value) {","            var node,","                model;","","            // Bind the DD to the parent table, for a wider drop range.","            node = Y.one('#' + value.labelElId).ancestor('table');","","            // TODO: Query modellist to get fieldGroup model objects","            model = value.data;","","            if (Y.instanceOf(model, Y.TB.Category)) {","                // This is a category model.","                self._createDD(node, model);","                // Categories allow dropping","                node.setData({ model: model});","                new Y.DD.Drop({","                    node         : node,","                    groups       : ['one'],","                    bubbleTargets: self","                });","            } else {","                // This is a fieldGroup.","                self._createDD(node, model);","            }","","        });","","        tree.collapseAll();","    },","","    /**","     * Scroll the view up or down when a drag reaches the boundaries on the Y axis","     */","    _handleOver: function (e) {","        var dropNode = e.drop.get('node'),","            dragY = Y.DD.DDM.activeDrag.get('dragNode').getY(),","            nodeOffsetY = dropNode.get('offsetTop'),","            nodeHeight = dropNode.get('offsetHeight'),","            relativeY,","            node,","            anim;","","        if (dropNode.hasClass('yui3-widget-bd')) {","            relativeY = dragY - nodeOffsetY - 20; /* Margin top */","","            if (relativeY > nodeHeight) {","                // Scroll down","                node = Y.one('.libbit-tabview .yui3-widget-bd');","                anim = new Y.Anim({","                    node: node,","                    to: {","                        scroll: function(node) {","                            return [0, node.get('scrollTop') + node.get('offsetHeight')];","                        }","                    },","                    easing: Y.Easing.easeOut","                });","","                anim.run();","            } else if (relativeY < 15) {","                // Scroll up","                node = Y.one('.libbit-tabview .yui3-widget-bd');","                anim = new Y.Anim({","                    node: node,","                    to: {","                        scroll: function(node) {","                            return [node.get('scrollTop') + node.get('offsetHeight'), 0];","                        }","                    },","                    easing: Y.Easing.easeOut","                });","","                anim.run();","            }","        }","    },","","    _createDD: function (node, data) {","        var self = this,","            dd;","","        dd = new Y.DD.Drag({","            node   : node,","            data   : data,","            groups : ['one'],","            bubbleTargets: self","        }).plug(Y.Plugin.DDProxy, {","            moveOnEnd  : false,","            borderStyle: 'none'","        });","","        return dd;","    },","","    _handleStart: function (e) {","        var drag = e.target,","            fieldGroup,","            container,","            origin,","            dd;","","        fieldGroup = drag.get('data');","        drag.get('dragNode').setContent(drag.get('node').one('.ygtvlabel').get('outerHTML'));","","        origin = drag.get('node');","","        drag.set('groups', ['one']);","        drag._prep();","","        drag.detachAll('drag:start');","","        container = Y.Node.create('<div></div>');","        drag.set('node', container);","","        drag.set('target', true);","        drag._prep();","","        dd = this._createDD(origin, fieldGroup);","    },","","    _handleDrop: function (e) {","        // TODO: Allow dropping outside of a category.","        var model  = this.get('data'),","            obj    = e.drag.get('data'),","            newCat = e.drop.get('node').getData().model;","","        if (newCat) {","            if (Y.instanceOf(obj, Y.TB.FieldGroup)) {","                obj.set('category', newCat);","            } else {","                obj.set('parent', newCat);","            }","","            obj.save(function () {","                model.load();","            });","        }","    },","","    // TODO","    _dropEnterGlobal: function () {","        if (Y.DD.DDM.activeDrag) {","            var drag = Y.DD.DDM.activeDrag,","                node = drag.get('dragNode'),","                fieldGroup,","                templateItem,","                n,","                anim;","","            if (drag.get('data').name === 'templateItem') {","                templateItem = drag.get('data');","","                fieldGroup = templateItem.get('fieldGroup');","                drag.set('data', fieldGroup);","","                // Clone the node, position it on top of the original for secondary animation.","                n = node.cloneNode(true).set('id', null).setStyle('position', 'absolute');","                Y.one('body').appendChild(n);","                n.setXY(node.getXY());","","                node.setStyle('opacity', 0);","                node.set('innerHTML',","                    '<div class=\"libbit-fieldgroup-drag\"><i class=\"icon-align-left\"></i><span> </span>' + fieldGroup.get('name') + '</div>'","                );","","                anim = new Y.Anim({","                    node: n.one('.libbit-template-item-container'),","                    to: {","                        width: 0,","                        height: 0","                    },","                    duration: '.25',","                    easing: Y.Easing.easeOut","                });","","                anim.on('end', function () {","                    n.remove();","                });","","                anim.run();","","                anim = new Y.Anim({","                    node: node,","                    to: { opacity: 1 },","                    duration: '.25',","                    easing: Y.Easing.easeOut","                });","","                anim.run();","           }","        }","    }","});","","// -- Namespace ----------------------------------------------------------------","Y.namespace('Libbit.TreeView').DD = DD;","","","}, '1.0.0', {\"requires\": [\"dd\", \"event-custom\"]});"];
_yuitest_coverage["build/libbit-treeview-dd/libbit-treeview-dd.js"].lines = {"1":0,"3":0,"8":0,"14":0,"17":0,"18":0,"19":0,"21":0,"28":0,"32":0,"35":0,"37":0,"38":0,"42":0,"45":0,"47":0,"49":0,"51":0,"52":0,"59":0,"64":0,"71":0,"79":0,"80":0,"82":0,"84":0,"85":0,"89":0,"95":0,"96":0,"98":0,"99":0,"103":0,"109":0,"115":0,"118":0,"128":0,"132":0,"138":0,"139":0,"141":0,"143":0,"144":0,"146":0,"148":0,"149":0,"151":0,"152":0,"154":0,"159":0,"163":0,"164":0,"165":0,"167":0,"170":0,"171":0,"178":0,"179":0,"186":0,"187":0,"189":0,"190":0,"193":0,"194":0,"195":0,"197":0,"198":0,"202":0,"212":0,"213":0,"216":0,"218":0,"225":0,"232":0};
_yuitest_coverage["build/libbit-treeview-dd/libbit-treeview-dd.js"].functions = {"initializer:13":0,"(anonymous 2):35":0,"(anonymous 3):37":0,"_bindDD:27":0,"scroll:88":0,"scroll:102":0,"_handleOver:70":0,"_createDD:114":0,"_handleStart:131":0,"(anonymous 4):170":0,"_handleDrop:157":0,"(anonymous 5):212":0,"_dropEnterGlobal:177":0,"(anonymous 1):1":0};
_yuitest_coverage["build/libbit-treeview-dd/libbit-treeview-dd.js"].coveredLines = 74;
_yuitest_coverage["build/libbit-treeview-dd/libbit-treeview-dd.js"].coveredFunctions = 14;
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 1);
YUI.add('libbit-treeview-dd', function (Y, NAME) {

_yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "(anonymous 1)", 1);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 3);
var DD;

/**
 * Drag and drop extension for the TreeView.
 */
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 8);
DD = Y.Base.create('dd', Y.Base, [], {

    /**
     * Subscribe to the render event and set up DD listeners.
     */
    initializer: function () {
        _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "initializer", 13);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 14);
Y.Do.after(this._bindDD, this, 'bindUI', this);
        //Y.Do.after(this._bindDD, this, 'refresh', this);

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 17);
this.on('drag:start', this._handleStart, this);
        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 18);
this.on('drop:hit', this._handleDrop, this);
        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 19);
this.on('drop:over', this._handleOver, this);

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 21);
this.on('drop:enter', this._dropEnterGlobal, this);
    },

    /**
     * Bind all DD instance after the parent view has been rendered.
     */
    _bindDD: function () {
        _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "_bindDD", 27);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 28);
var self      = this,
            tree      = this.get('tree'),
            nodes;

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 32);
tree.expandAll();

        // Setup DD.
        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 35);
nodes = tree.getNodesBy(function () { _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "(anonymous 2)", 35);
return true; });

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 37);
Y.each(nodes, function (value) {
            _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "(anonymous 3)", 37);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 38);
var node,
                model;

            // Bind the DD to the parent table, for a wider drop range.
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 42);
node = Y.one('#' + value.labelElId).ancestor('table');

            // TODO: Query modellist to get fieldGroup model objects
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 45);
model = value.data;

            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 47);
if (Y.instanceOf(model, Y.TB.Category)) {
                // This is a category model.
                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 49);
self._createDD(node, model);
                // Categories allow dropping
                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 51);
node.setData({ model: model});
                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 52);
new Y.DD.Drop({
                    node         : node,
                    groups       : ['one'],
                    bubbleTargets: self
                });
            } else {
                // This is a fieldGroup.
                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 59);
self._createDD(node, model);
            }

        });

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 64);
tree.collapseAll();
    },

    /**
     * Scroll the view up or down when a drag reaches the boundaries on the Y axis
     */
    _handleOver: function (e) {
        _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "_handleOver", 70);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 71);
var dropNode = e.drop.get('node'),
            dragY = Y.DD.DDM.activeDrag.get('dragNode').getY(),
            nodeOffsetY = dropNode.get('offsetTop'),
            nodeHeight = dropNode.get('offsetHeight'),
            relativeY,
            node,
            anim;

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 79);
if (dropNode.hasClass('yui3-widget-bd')) {
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 80);
relativeY = dragY - nodeOffsetY - 20; /* Margin top */

            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 82);
if (relativeY > nodeHeight) {
                // Scroll down
                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 84);
node = Y.one('.libbit-tabview .yui3-widget-bd');
                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 85);
anim = new Y.Anim({
                    node: node,
                    to: {
                        scroll: function(node) {
                            _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "scroll", 88);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 89);
return [0, node.get('scrollTop') + node.get('offsetHeight')];
                        }
                    },
                    easing: Y.Easing.easeOut
                });

                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 95);
anim.run();
            } else {_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 96);
if (relativeY < 15) {
                // Scroll up
                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 98);
node = Y.one('.libbit-tabview .yui3-widget-bd');
                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 99);
anim = new Y.Anim({
                    node: node,
                    to: {
                        scroll: function(node) {
                            _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "scroll", 102);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 103);
return [node.get('scrollTop') + node.get('offsetHeight'), 0];
                        }
                    },
                    easing: Y.Easing.easeOut
                });

                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 109);
anim.run();
            }}
        }
    },

    _createDD: function (node, data) {
        _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "_createDD", 114);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 115);
var self = this,
            dd;

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 118);
dd = new Y.DD.Drag({
            node   : node,
            data   : data,
            groups : ['one'],
            bubbleTargets: self
        }).plug(Y.Plugin.DDProxy, {
            moveOnEnd  : false,
            borderStyle: 'none'
        });

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 128);
return dd;
    },

    _handleStart: function (e) {
        _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "_handleStart", 131);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 132);
var drag = e.target,
            fieldGroup,
            container,
            origin,
            dd;

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 138);
fieldGroup = drag.get('data');
        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 139);
drag.get('dragNode').setContent(drag.get('node').one('.ygtvlabel').get('outerHTML'));

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 141);
origin = drag.get('node');

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 143);
drag.set('groups', ['one']);
        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 144);
drag._prep();

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 146);
drag.detachAll('drag:start');

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 148);
container = Y.Node.create('<div></div>');
        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 149);
drag.set('node', container);

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 151);
drag.set('target', true);
        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 152);
drag._prep();

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 154);
dd = this._createDD(origin, fieldGroup);
    },

    _handleDrop: function (e) {
        // TODO: Allow dropping outside of a category.
        _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "_handleDrop", 157);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 159);
var model  = this.get('data'),
            obj    = e.drag.get('data'),
            newCat = e.drop.get('node').getData().model;

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 163);
if (newCat) {
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 164);
if (Y.instanceOf(obj, Y.TB.FieldGroup)) {
                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 165);
obj.set('category', newCat);
            } else {
                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 167);
obj.set('parent', newCat);
            }

            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 170);
obj.save(function () {
                _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "(anonymous 4)", 170);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 171);
model.load();
            });
        }
    },

    // TODO
    _dropEnterGlobal: function () {
        _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "_dropEnterGlobal", 177);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 178);
if (Y.DD.DDM.activeDrag) {
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 179);
var drag = Y.DD.DDM.activeDrag,
                node = drag.get('dragNode'),
                fieldGroup,
                templateItem,
                n,
                anim;

            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 186);
if (drag.get('data').name === 'templateItem') {
                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 187);
templateItem = drag.get('data');

                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 189);
fieldGroup = templateItem.get('fieldGroup');
                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 190);
drag.set('data', fieldGroup);

                // Clone the node, position it on top of the original for secondary animation.
                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 193);
n = node.cloneNode(true).set('id', null).setStyle('position', 'absolute');
                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 194);
Y.one('body').appendChild(n);
                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 195);
n.setXY(node.getXY());

                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 197);
node.setStyle('opacity', 0);
                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 198);
node.set('innerHTML',
                    '<div class="libbit-fieldgroup-drag"><i class="icon-align-left"></i><span> </span>' + fieldGroup.get('name') + '</div>'
                );

                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 202);
anim = new Y.Anim({
                    node: n.one('.libbit-template-item-container'),
                    to: {
                        width: 0,
                        height: 0
                    },
                    duration: '.25',
                    easing: Y.Easing.easeOut
                });

                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 212);
anim.on('end', function () {
                    _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "(anonymous 5)", 212);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 213);
n.remove();
                });

                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 216);
anim.run();

                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 218);
anim = new Y.Anim({
                    node: node,
                    to: { opacity: 1 },
                    duration: '.25',
                    easing: Y.Easing.easeOut
                });

                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 225);
anim.run();
           }
        }
    }
});

// -- Namespace ----------------------------------------------------------------
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 232);
Y.namespace('Libbit.TreeView').DD = DD;


}, '1.0.0', {"requires": ["dd", "event-custom"]});
