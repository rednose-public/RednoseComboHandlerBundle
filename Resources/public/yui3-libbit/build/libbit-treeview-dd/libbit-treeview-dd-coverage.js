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
_yuitest_coverage["build/libbit-treeview-dd/libbit-treeview-dd.js"].code=["YUI.add('libbit-treeview-dd', function (Y, NAME) {","","var DD;","","/**"," * Drag and drop extension for the TreeView."," */","DD = Y.Base.create('dd', Y.Base, [], {","","    /**","     * Subscribe to the render event and set up DD listeners.","     */","    initializer: function () {","        if (this.get('dragdrop')) {","            Y.Do.after(this._bindDD, this, 'bindUI', this);","","            this.on('drag:start', this._handleStart, this);","            this.on('drop:hit', this._handleDrop, this);","            this.on('drop:over', this._handleOver, this);","","            this.on('drop:enter', this._dropEnterGlobal, this);","        }","    },","","    /**","     * Bind all DD instance after the parent view has been rendered.","     */","    _bindDD: function () {","        var self      = this,","            tree      = this.get('tree'),","            nodes;","","        tree.expandAll();","","        // Setup DD.","        nodes = tree.getNodesBy(function () { return true; });","","        Y.each(nodes, function (value) {","            var node,","                model;","","            // Bind the DD to the parent table, for a wider drop range.","            node = Y.one('#' + value.labelElId).ancestor('table');","","            // TODO: Query modellist to get fieldGroup model objects","            model = value.data;","","            if (Y.instanceOf(model, Y.TB.Category)) {","                // This is a category model.","                self._createDD(node, model.get('clientId'));","                // Categories allow dropping","                new Y.DD.Drop({","                    node         : node,","                    groups       : ['one'],","                    bubbleTargets: self","                });","            } else {","                // This is a fieldGroup.","                self._createDD(node, model.get('clientId'));","            }","","        });","","        tree.collapseAll();","    },","","    /**","     * Scroll the view up or down when a drag reaches the boundaries on the Y axis","     */","    _handleOver: function (e) {","        var dropNode = e.drop.get('node'),","            dragY = Y.DD.DDM.activeDrag.get('dragNode').getY(),","            nodeOffsetY = dropNode.get('offsetTop'),","            nodeHeight = dropNode.get('offsetHeight'),","            relativeY,","            node,","            anim;","","        if (dropNode.hasClass('yui3-widget-bd')) {","            relativeY = dragY - nodeOffsetY - 20; /* Margin top */","","            if (relativeY > nodeHeight) {","                // Scroll down","                node = Y.one('.libbit-tabview .yui3-widget-bd');","                anim = new Y.Anim({","                    node: node,","                    to: {","                        scroll: function(node) {","                            return [0, node.get('scrollTop') + node.get('offsetHeight')];","                        }","                    },","                    easing: Y.Easing.easeOut","                });","","                anim.run();","            } else if (relativeY < 15) {","                // Scroll up","                node = Y.one('.libbit-tabview .yui3-widget-bd');","                anim = new Y.Anim({","                    node: node,","                    to: {","                        scroll: function(node) {","                            return [node.get('scrollTop') + node.get('offsetHeight'), 0];","                        }","                    },","                    easing: Y.Easing.easeOut","                });","","                anim.run();","            }","        }","    },","","    _createDD: function (node, data) {","        var self = this,","            dd;","","        dd = new Y.DD.Drag({","            node   : node,","            data   : data,","            groups : ['one'],","            bubbleTargets: self","        }).plug(Y.Plugin.DDProxy, {","            moveOnEnd  : false,","            borderStyle: 'none'","        });","","        return dd;","    },","","    _handleStart: function (e) {","        var drag = e.target,","            fieldGroup,","            container,","            origin,","            dd;","","        fieldGroup = drag.get('data');","        drag.get('dragNode').setContent(drag.get('node').one('.ygtvlabel').get('outerHTML'));","","        origin = drag.get('node');","","        drag.set('groups', ['one']);","        drag._prep();","","        drag.detachAll('drag:start');","","        container = Y.Node.create('<div></div>');","        drag.set('node', container);","","        drag.set('target', true);","        drag._prep();","","        dd = this._createDD(origin, fieldGroup);","    },","","    _handleDrop: function (e) {","        // TODO: Allow dropping outside of a category.","        var model    = this.get('data'),","            objID    = e.drag.get('data'),","            newCatID = e.drop.get('node').getAttribute('data-yui3-record'),","            obj      =  model.getByClientId(objID);","            newCat   = model.getByClientId(newCatID);","","        if (newCat) {","            if (Y.instanceOf(obj, Y.TB.Category)) {","                obj.set('parent', newCat);","            } else {","                obj.set('category', newCat);","            }","","            obj.save(function () {","                model.load();","            });","        }","    },","","    // TODO","    _dropEnterGlobal: function () {","        if (Y.DD.DDM.activeDrag) {","            var drag = Y.DD.DDM.activeDrag,","                node = drag.get('dragNode'),","                fieldGroup,","                templateItem,","                n,","                anim;","","            if (drag.get('data').name === 'templateItem') {","                templateItem = drag.get('data');","","                fieldGroup = templateItem.get('fieldGroup');","                drag.set('data', fieldGroup);","","                // Clone the node, position it on top of the original for secondary animation.","                n = node.cloneNode(true).set('id', null).setStyle('position', 'absolute');","                Y.one('body').appendChild(n);","                n.setXY(node.getXY());","","                node.setStyle('opacity', 0);","                node.set('innerHTML',","                    '<div class=\"libbit-fieldgroup-drag\"><i class=\"icon-align-left\"></i><span> </span>' + fieldGroup.get('name') + '</div>'","                );","","                anim = new Y.Anim({","                    node: n.one('.libbit-template-item-container'),","                    to: {","                        width: 0,","                        height: 0","                    },","                    duration: '.25',","                    easing: Y.Easing.easeOut","                });","","                anim.on('end', function () {","                    n.remove();","                });","","                anim.run();","","                anim = new Y.Anim({","                    node: node,","                    to: { opacity: 1 },","                    duration: '.25',","                    easing: Y.Easing.easeOut","                });","","                anim.run();","           }","        }","    }","}, {","    ATTRS: {","        dragdrop: {","            value : false","        }","    }","});","","// -- Namespace ----------------------------------------------------------------","Y.namespace('Libbit.TreeView').DD = DD;","","","}, '1.0.0', {\"requires\": [\"dd\", \"event-custom\"]});"];
_yuitest_coverage["build/libbit-treeview-dd/libbit-treeview-dd.js"].lines = {"1":0,"3":0,"8":0,"14":0,"15":0,"17":0,"18":0,"19":0,"21":0,"29":0,"33":0,"36":0,"38":0,"39":0,"43":0,"46":0,"48":0,"50":0,"52":0,"59":0,"64":0,"71":0,"79":0,"80":0,"82":0,"84":0,"85":0,"89":0,"95":0,"96":0,"98":0,"99":0,"103":0,"109":0,"115":0,"118":0,"128":0,"132":0,"138":0,"139":0,"141":0,"143":0,"144":0,"146":0,"148":0,"149":0,"151":0,"152":0,"154":0,"159":0,"163":0,"165":0,"166":0,"167":0,"169":0,"172":0,"173":0,"180":0,"181":0,"188":0,"189":0,"191":0,"192":0,"195":0,"196":0,"197":0,"199":0,"200":0,"204":0,"214":0,"215":0,"218":0,"220":0,"227":0,"240":0};
_yuitest_coverage["build/libbit-treeview-dd/libbit-treeview-dd.js"].functions = {"initializer:13":0,"(anonymous 2):36":0,"(anonymous 3):38":0,"_bindDD:28":0,"scroll:88":0,"scroll:102":0,"_handleOver:70":0,"_createDD:114":0,"_handleStart:131":0,"(anonymous 4):172":0,"_handleDrop:157":0,"(anonymous 5):214":0,"_dropEnterGlobal:179":0,"(anonymous 1):1":0};
_yuitest_coverage["build/libbit-treeview-dd/libbit-treeview-dd.js"].coveredLines = 75;
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
if (this.get('dragdrop')) {
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 15);
Y.Do.after(this._bindDD, this, 'bindUI', this);

            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 17);
this.on('drag:start', this._handleStart, this);
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 18);
this.on('drop:hit', this._handleDrop, this);
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 19);
this.on('drop:over', this._handleOver, this);

            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 21);
this.on('drop:enter', this._dropEnterGlobal, this);
        }
    },

    /**
     * Bind all DD instance after the parent view has been rendered.
     */
    _bindDD: function () {
        _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "_bindDD", 28);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 29);
var self      = this,
            tree      = this.get('tree'),
            nodes;

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 33);
tree.expandAll();

        // Setup DD.
        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 36);
nodes = tree.getNodesBy(function () { _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "(anonymous 2)", 36);
return true; });

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 38);
Y.each(nodes, function (value) {
            _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "(anonymous 3)", 38);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 39);
var node,
                model;

            // Bind the DD to the parent table, for a wider drop range.
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 43);
node = Y.one('#' + value.labelElId).ancestor('table');

            // TODO: Query modellist to get fieldGroup model objects
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 46);
model = value.data;

            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 48);
if (Y.instanceOf(model, Y.TB.Category)) {
                // This is a category model.
                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 50);
self._createDD(node, model.get('clientId'));
                // Categories allow dropping
                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 52);
new Y.DD.Drop({
                    node         : node,
                    groups       : ['one'],
                    bubbleTargets: self
                });
            } else {
                // This is a fieldGroup.
                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 59);
self._createDD(node, model.get('clientId'));
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
var model    = this.get('data'),
            objID    = e.drag.get('data'),
            newCatID = e.drop.get('node').getAttribute('data-yui3-record'),
            obj      =  model.getByClientId(objID);
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 163);
newCat   = model.getByClientId(newCatID);

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 165);
if (newCat) {
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 166);
if (Y.instanceOf(obj, Y.TB.Category)) {
                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 167);
obj.set('parent', newCat);
            } else {
                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 169);
obj.set('category', newCat);
            }

            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 172);
obj.save(function () {
                _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "(anonymous 4)", 172);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 173);
model.load();
            });
        }
    },

    // TODO
    _dropEnterGlobal: function () {
        _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "_dropEnterGlobal", 179);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 180);
if (Y.DD.DDM.activeDrag) {
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 181);
var drag = Y.DD.DDM.activeDrag,
                node = drag.get('dragNode'),
                fieldGroup,
                templateItem,
                n,
                anim;

            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 188);
if (drag.get('data').name === 'templateItem') {
                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 189);
templateItem = drag.get('data');

                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 191);
fieldGroup = templateItem.get('fieldGroup');
                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 192);
drag.set('data', fieldGroup);

                // Clone the node, position it on top of the original for secondary animation.
                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 195);
n = node.cloneNode(true).set('id', null).setStyle('position', 'absolute');
                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 196);
Y.one('body').appendChild(n);
                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 197);
n.setXY(node.getXY());

                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 199);
node.setStyle('opacity', 0);
                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 200);
node.set('innerHTML',
                    '<div class="libbit-fieldgroup-drag"><i class="icon-align-left"></i><span> </span>' + fieldGroup.get('name') + '</div>'
                );

                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 204);
anim = new Y.Anim({
                    node: n.one('.libbit-template-item-container'),
                    to: {
                        width: 0,
                        height: 0
                    },
                    duration: '.25',
                    easing: Y.Easing.easeOut
                });

                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 214);
anim.on('end', function () {
                    _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "(anonymous 5)", 214);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 215);
n.remove();
                });

                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 218);
anim.run();

                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 220);
anim = new Y.Anim({
                    node: node,
                    to: { opacity: 1 },
                    duration: '.25',
                    easing: Y.Easing.easeOut
                });

                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 227);
anim.run();
           }
        }
    }
}, {
    ATTRS: {
        dragdrop: {
            value : false
        }
    }
});

// -- Namespace ----------------------------------------------------------------
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 240);
Y.namespace('Libbit.TreeView').DD = DD;


}, '1.0.0', {"requires": ["dd", "event-custom"]});
