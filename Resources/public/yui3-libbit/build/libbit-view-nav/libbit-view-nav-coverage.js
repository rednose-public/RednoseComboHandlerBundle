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
_yuitest_coverage["build/libbit-view-nav/libbit-view-nav.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/libbit-view-nav/libbit-view-nav.js",
    code: []
};
_yuitest_coverage["build/libbit-view-nav/libbit-view-nav.js"].code=["YUI.add('libbit-view-nav', function (Y, NAME) {","","var Nav;","","/**"," * Y.View extension to wrap the container into a panel with a header and footer navigation bar"," */","Nav = function () {};","","/**"," * New attributes that will be accessible within the Y.View instance."," */","Nav.ATTRS = {","    /**","     * Header attribute, sets the panel's header content.","     */","    header : {","        value: Y.Node.create('<div></div>')","    },","","    /**","     * Header attribute, sets the panel's footer content (usually a set of buttons.","     */","    footer : {","        value: Y.Node.create('<div></div>')","    }","};","","/**"," * Decorate the original Y.View instance with new methods."," */","Nav.prototype = {","    /**","     * Initializer, gets called upon instance initiation.","     */","    initializer: function () {","        Y.Do.after(this._afterRender, this, 'render', this);","    },","","    /**","     * Wrap the view into a panel after it's rendered.","     */","    _afterRender: function () {","        var container = this.get('container'),","            header    = this.get('header'),","            body      = Y.Node.create('<div></div>'),","            footer    = this.get('footer'),","            panel;","","        // Transfer the child nodes from the view container to the new body container.","        container.get('children').each(function (c) {","            body.append(c);","        });","","        container.addClass('lol');","        panel = new Y.Libbit.NavContainer({","            headerContent: header,","            bodyContent  : body,","            footerContent: footer","        });","","        // Render the panel within the view container.","        panel.render(container);","    }","};","","// -- Namespace ----------------------------------------------------------------","Y.namespace('Libbit.View').Nav = Nav;","","","}, '@VERSION@', {\"requires\": [\"event-custom\", \"libbit-nav-container\", \"view\"]});"];
_yuitest_coverage["build/libbit-view-nav/libbit-view-nav.js"].lines = {"1":0,"3":0,"8":0,"13":0,"32":0,"37":0,"44":0,"51":0,"52":0,"55":0,"56":0,"63":0,"68":0};
_yuitest_coverage["build/libbit-view-nav/libbit-view-nav.js"].functions = {"initializer:36":0,"(anonymous 2):51":0,"_afterRender:43":0,"(anonymous 1):1":0};
_yuitest_coverage["build/libbit-view-nav/libbit-view-nav.js"].coveredLines = 13;
_yuitest_coverage["build/libbit-view-nav/libbit-view-nav.js"].coveredFunctions = 4;
_yuitest_coverline("build/libbit-view-nav/libbit-view-nav.js", 1);
YUI.add('libbit-view-nav', function (Y, NAME) {

_yuitest_coverfunc("build/libbit-view-nav/libbit-view-nav.js", "(anonymous 1)", 1);
_yuitest_coverline("build/libbit-view-nav/libbit-view-nav.js", 3);
var Nav;

/**
 * Y.View extension to wrap the container into a panel with a header and footer navigation bar
 */
_yuitest_coverline("build/libbit-view-nav/libbit-view-nav.js", 8);
Nav = function () {};

/**
 * New attributes that will be accessible within the Y.View instance.
 */
_yuitest_coverline("build/libbit-view-nav/libbit-view-nav.js", 13);
Nav.ATTRS = {
    /**
     * Header attribute, sets the panel's header content.
     */
    header : {
        value: Y.Node.create('<div></div>')
    },

    /**
     * Header attribute, sets the panel's footer content (usually a set of buttons.
     */
    footer : {
        value: Y.Node.create('<div></div>')
    }
};

/**
 * Decorate the original Y.View instance with new methods.
 */
_yuitest_coverline("build/libbit-view-nav/libbit-view-nav.js", 32);
Nav.prototype = {
    /**
     * Initializer, gets called upon instance initiation.
     */
    initializer: function () {
        _yuitest_coverfunc("build/libbit-view-nav/libbit-view-nav.js", "initializer", 36);
_yuitest_coverline("build/libbit-view-nav/libbit-view-nav.js", 37);
Y.Do.after(this._afterRender, this, 'render', this);
    },

    /**
     * Wrap the view into a panel after it's rendered.
     */
    _afterRender: function () {
        _yuitest_coverfunc("build/libbit-view-nav/libbit-view-nav.js", "_afterRender", 43);
_yuitest_coverline("build/libbit-view-nav/libbit-view-nav.js", 44);
var container = this.get('container'),
            header    = this.get('header'),
            body      = Y.Node.create('<div></div>'),
            footer    = this.get('footer'),
            panel;

        // Transfer the child nodes from the view container to the new body container.
        _yuitest_coverline("build/libbit-view-nav/libbit-view-nav.js", 51);
container.get('children').each(function (c) {
            _yuitest_coverfunc("build/libbit-view-nav/libbit-view-nav.js", "(anonymous 2)", 51);
_yuitest_coverline("build/libbit-view-nav/libbit-view-nav.js", 52);
body.append(c);
        });

        _yuitest_coverline("build/libbit-view-nav/libbit-view-nav.js", 55);
container.addClass('lol');
        _yuitest_coverline("build/libbit-view-nav/libbit-view-nav.js", 56);
panel = new Y.Libbit.NavContainer({
            headerContent: header,
            bodyContent  : body,
            footerContent: footer
        });

        // Render the panel within the view container.
        _yuitest_coverline("build/libbit-view-nav/libbit-view-nav.js", 63);
panel.render(container);
    }
};

// -- Namespace ----------------------------------------------------------------
_yuitest_coverline("build/libbit-view-nav/libbit-view-nav.js", 68);
Y.namespace('Libbit.View').Nav = Nav;


}, '@VERSION@', {"requires": ["event-custom", "libbit-nav-container", "view"]});
