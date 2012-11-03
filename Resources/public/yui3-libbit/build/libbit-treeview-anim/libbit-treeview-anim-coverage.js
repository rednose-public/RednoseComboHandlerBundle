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
_yuitest_coverage["build/libbit-treeview-anim/libbit-treeview-anim.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/libbit-treeview-anim/libbit-treeview-anim.js",
    code: []
};
_yuitest_coverage["build/libbit-treeview-anim/libbit-treeview-anim.js"].code=["YUI.add('libbit-treeview-anim', function (Y, NAME) {","","var Anim;","","/**"," * Y.Libbit.TreeView widget extension to provide animations."," */","Anim = function () {};","","Anim.prototype = {","","    /**","     * Initializer, gets called upon instance initiation.","     */","    initializer: function () {","        this.on('collapseComplete', this._afterCollapse, this);","        this.on('expandComplete', this._afterExpand, this);","    },","","    /**","     * Handles the collapse event.","     */","    _afterCollapse: function (e) {","        var treeNode = e.node,","            children = this._getChildrenElement(treeNode);","","        this._animateSlideIn(children);","    },","","    /**","     * Handles the expand event.","     */","    _afterExpand: function (e) {","        var treeNode = e.node,","            children = this._getChildrenElement(treeNode);","","        this._animateSlideOut(children);","    },","","    /**","     * Animates a slide in of an collapsed element as a post process.","     */","    _animateSlideIn: function (el) {","        var anim;","","        // The element has been hidden by the tree, show it by removing the 'display' style attribute.","        el.setStyle('display', null);","","        // Animate the object to a height of 0.","        anim = new Y.Anim({","            node    : el,","            to      : { height: 0 },","            duration: '.25',","            easing  : Y.Easing.easeOut","        });","","        // Restore the 'display' style attribute and reset the height to 100%.","        anim.on('end', function () {","            el.setStyle('display', 'none');","            el.setStyle('height', '100%');","        });","","        anim.run();","    },","","    /**","     * Animates a slide in of an expanded element as a post process.","     */","    _animateSlideOut: function (el) {","        var height = el.getComputedStyle('height'),","            anim;","","        // The element is visible, set the height to 0.","        el.setStyle('height', '0px');","","        // Animate the object back to it's original height.","        anim = new Y.Anim({","            node     : el,","            to       : { height: height },","            duration: '.25'","        });","","        anim.run();","    },","","    /**","     * Retrieve the DOM element containing the children of a given TreeView node.","     */","    _getChildrenElement: function (node) {","        var boundingBox = this.get('boundingBox'),","            id          = node.contentElId.substring(13);","","        return boundingBox.one('#ygtvc' + id);","    }","};","","// -- Namespace ----------------------------------------------------------------","Y.namespace('Libbit.TreeView').Anim = Anim;","","","}, '@VERSION@', {\"requires\": [\"libbit-treeview\"]});"];
_yuitest_coverage["build/libbit-treeview-anim/libbit-treeview-anim.js"].lines = {"1":0,"3":0,"8":0,"10":0,"16":0,"17":0,"24":0,"27":0,"34":0,"37":0,"44":0,"47":0,"50":0,"58":0,"59":0,"60":0,"63":0,"70":0,"74":0,"77":0,"83":0,"90":0,"93":0,"98":0};
_yuitest_coverage["build/libbit-treeview-anim/libbit-treeview-anim.js"].functions = {"initializer:15":0,"_afterCollapse:23":0,"_afterExpand:33":0,"(anonymous 2):58":0,"_animateSlideIn:43":0,"_animateSlideOut:69":0,"_getChildrenElement:89":0,"(anonymous 1):1":0};
_yuitest_coverage["build/libbit-treeview-anim/libbit-treeview-anim.js"].coveredLines = 24;
_yuitest_coverage["build/libbit-treeview-anim/libbit-treeview-anim.js"].coveredFunctions = 8;
_yuitest_coverline("build/libbit-treeview-anim/libbit-treeview-anim.js", 1);
YUI.add('libbit-treeview-anim', function (Y, NAME) {

_yuitest_coverfunc("build/libbit-treeview-anim/libbit-treeview-anim.js", "(anonymous 1)", 1);
_yuitest_coverline("build/libbit-treeview-anim/libbit-treeview-anim.js", 3);
var Anim;

/**
 * Y.Libbit.TreeView widget extension to provide animations.
 */
_yuitest_coverline("build/libbit-treeview-anim/libbit-treeview-anim.js", 8);
Anim = function () {};

_yuitest_coverline("build/libbit-treeview-anim/libbit-treeview-anim.js", 10);
Anim.prototype = {

    /**
     * Initializer, gets called upon instance initiation.
     */
    initializer: function () {
        _yuitest_coverfunc("build/libbit-treeview-anim/libbit-treeview-anim.js", "initializer", 15);
_yuitest_coverline("build/libbit-treeview-anim/libbit-treeview-anim.js", 16);
this.on('collapseComplete', this._afterCollapse, this);
        _yuitest_coverline("build/libbit-treeview-anim/libbit-treeview-anim.js", 17);
this.on('expandComplete', this._afterExpand, this);
    },

    /**
     * Handles the collapse event.
     */
    _afterCollapse: function (e) {
        _yuitest_coverfunc("build/libbit-treeview-anim/libbit-treeview-anim.js", "_afterCollapse", 23);
_yuitest_coverline("build/libbit-treeview-anim/libbit-treeview-anim.js", 24);
var treeNode = e.node,
            children = this._getChildrenElement(treeNode);

        _yuitest_coverline("build/libbit-treeview-anim/libbit-treeview-anim.js", 27);
this._animateSlideIn(children);
    },

    /**
     * Handles the expand event.
     */
    _afterExpand: function (e) {
        _yuitest_coverfunc("build/libbit-treeview-anim/libbit-treeview-anim.js", "_afterExpand", 33);
_yuitest_coverline("build/libbit-treeview-anim/libbit-treeview-anim.js", 34);
var treeNode = e.node,
            children = this._getChildrenElement(treeNode);

        _yuitest_coverline("build/libbit-treeview-anim/libbit-treeview-anim.js", 37);
this._animateSlideOut(children);
    },

    /**
     * Animates a slide in of an collapsed element as a post process.
     */
    _animateSlideIn: function (el) {
        _yuitest_coverfunc("build/libbit-treeview-anim/libbit-treeview-anim.js", "_animateSlideIn", 43);
_yuitest_coverline("build/libbit-treeview-anim/libbit-treeview-anim.js", 44);
var anim;

        // The element has been hidden by the tree, show it by removing the 'display' style attribute.
        _yuitest_coverline("build/libbit-treeview-anim/libbit-treeview-anim.js", 47);
el.setStyle('display', null);

        // Animate the object to a height of 0.
        _yuitest_coverline("build/libbit-treeview-anim/libbit-treeview-anim.js", 50);
anim = new Y.Anim({
            node    : el,
            to      : { height: 0 },
            duration: '.25',
            easing  : Y.Easing.easeOut
        });

        // Restore the 'display' style attribute and reset the height to 100%.
        _yuitest_coverline("build/libbit-treeview-anim/libbit-treeview-anim.js", 58);
anim.on('end', function () {
            _yuitest_coverfunc("build/libbit-treeview-anim/libbit-treeview-anim.js", "(anonymous 2)", 58);
_yuitest_coverline("build/libbit-treeview-anim/libbit-treeview-anim.js", 59);
el.setStyle('display', 'none');
            _yuitest_coverline("build/libbit-treeview-anim/libbit-treeview-anim.js", 60);
el.setStyle('height', '100%');
        });

        _yuitest_coverline("build/libbit-treeview-anim/libbit-treeview-anim.js", 63);
anim.run();
    },

    /**
     * Animates a slide in of an expanded element as a post process.
     */
    _animateSlideOut: function (el) {
        _yuitest_coverfunc("build/libbit-treeview-anim/libbit-treeview-anim.js", "_animateSlideOut", 69);
_yuitest_coverline("build/libbit-treeview-anim/libbit-treeview-anim.js", 70);
var height = el.getComputedStyle('height'),
            anim;

        // The element is visible, set the height to 0.
        _yuitest_coverline("build/libbit-treeview-anim/libbit-treeview-anim.js", 74);
el.setStyle('height', '0px');

        // Animate the object back to it's original height.
        _yuitest_coverline("build/libbit-treeview-anim/libbit-treeview-anim.js", 77);
anim = new Y.Anim({
            node     : el,
            to       : { height: height },
            duration: '.25'
        });

        _yuitest_coverline("build/libbit-treeview-anim/libbit-treeview-anim.js", 83);
anim.run();
    },

    /**
     * Retrieve the DOM element containing the children of a given TreeView node.
     */
    _getChildrenElement: function (node) {
        _yuitest_coverfunc("build/libbit-treeview-anim/libbit-treeview-anim.js", "_getChildrenElement", 89);
_yuitest_coverline("build/libbit-treeview-anim/libbit-treeview-anim.js", 90);
var boundingBox = this.get('boundingBox'),
            id          = node.contentElId.substring(13);

        _yuitest_coverline("build/libbit-treeview-anim/libbit-treeview-anim.js", 93);
return boundingBox.one('#ygtvc' + id);
    }
};

// -- Namespace ----------------------------------------------------------------
_yuitest_coverline("build/libbit-treeview-anim/libbit-treeview-anim.js", 98);
Y.namespace('Libbit.TreeView').Anim = Anim;


}, '@VERSION@', {"requires": ["libbit-treeview"]});
