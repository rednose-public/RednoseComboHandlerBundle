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
_yuitest_coverage["build/libbit-view-nav/libbit-view-nav.js"].code=["YUI.add('libbit-view-nav', function (Y, NAME) {","","var Nav;","","/**"," * Y.View extension to wrap the container into a panel with a header and footer navigation bar."," */","Nav = Y.Base.create('nav', Y.View, [], {","    /**","     * Title property, sets the panel's header content.","     */","    title : null,","","    /**","     * Buttons property, sets the panel's footer buttons.","     */","    buttons : null,","","    /**","     * Initializer, gets called upon instance initiation.","     */","    initializer: function () {","        Y.Do.after(this._afterRender, this, 'render', this);","    },","","    /**","     * Wrap the view into a panel after it's rendered.","     */","    _afterRender: function () {","        var container = this.get('container'),","            header    = this.title,","            body      = Y.Node.create('<div></div>'),","            footer    = this._buildFooter(),","            panel;","","        // Transfer the child nodes from the view container to the new body container.","        container.get('children').each(function (c) {","            body.append(c);","        });","","        panel = new Y.Libbit.NavContainer({","            headerContent: header,","            bodyContent  : body,","            footerContent: footer","        });","","        // Render the panel within the view container.","        panel.render(container);","    },","","    /**","     * Build the footer buttons and bind them to fire events","     */","    _buildFooter: function () {","        var self    = this,","            buttons = this.buttons;","            footer  = Y.Node.create('<div></div>');","","        Y.Object.each(buttons, function (button, key) {","            var value     = button.value,","                primary   = button.primary,","                position  = button.position ? button.position : 'left',","                title     = button.title ? button.title : value,","                disabled  = button.disabled,","                className = button.className,","                // Format the action event by prepending 'button', for example the event","                // fired for 'cancel' will be 'buttonCancel'","                action    = 'button' + self._capitalizeFirstLetter(key),","                node      = Y.Node.create('<button class=\"btn\"></button>');","","            if (value) {","                node.set('text', value);","                node.set('title', title);","            }","","            if (primary) {","                node.addClass('btn-primary');","            }","","            if (disabled) {","                node.addClass('disabled');","            }","","            if (className) {","                node.addClass(className);","            }","","            node.addClass('float-' + position);","","            node.on('click', function (e) {","                var btn = e.target;","","                if (btn.hasClass('disabled') === false) {","                    self.fire(action);","                }","            });","","            footer.append(node);","        });","","        return footer;","    },","","    /**","     * Capitalize the first letter of a given string","     */","    _capitalizeFirstLetter: function (value) {","        return value.charAt(0).toUpperCase() + value.slice(1);","    },","","    /**","     * Magic function to update the buttons properties","     */","    _setButtons: function (value) {","        var self    = this,","            footer  = this.get('container').one('.yui3-widget-ft'),","            buttons = this.buttons;","","        Y.Object.each(value, function (properties, key) {","            self.buttons[key] = Y.merge(buttons[key], properties);","        });","","        // TODO: Update instead of rerendering.","        footer.one('div').replace(self._buildFooter());","    },","","    /**","     * Magic function to get the current button properties","     */","     _getButtons: function () {","        return this.buttons;","    }","","}, {","    ATTRS: {","        buttons: {","            setter: '_setButtons',","            getter: '_getButtons'","        }","    }","});","","// -- Namespace ----------------------------------------------------------------","Y.namespace('Libbit.View').Nav = Nav;","","","}, '1.0.0', {\"requires\": [\"event-custom\", \"libbit-nav-container\", \"view\"]});"];
_yuitest_coverage["build/libbit-view-nav/libbit-view-nav.js"].lines = {"1":0,"3":0,"8":0,"23":0,"30":0,"37":0,"38":0,"41":0,"48":0,"55":0,"57":0,"59":0,"60":0,"71":0,"72":0,"73":0,"76":0,"77":0,"80":0,"81":0,"84":0,"85":0,"88":0,"90":0,"91":0,"93":0,"94":0,"98":0,"101":0,"108":0,"115":0,"119":0,"120":0,"124":0,"131":0,"144":0};
_yuitest_coverage["build/libbit-view-nav/libbit-view-nav.js"].functions = {"initializer:22":0,"(anonymous 2):37":0,"_afterRender:29":0,"(anonymous 4):90":0,"(anonymous 3):59":0,"_buildFooter:54":0,"_capitalizeFirstLetter:107":0,"(anonymous 5):119":0,"_setButtons:114":0,"_getButtons:130":0,"(anonymous 1):1":0};
_yuitest_coverage["build/libbit-view-nav/libbit-view-nav.js"].coveredLines = 36;
_yuitest_coverage["build/libbit-view-nav/libbit-view-nav.js"].coveredFunctions = 11;
_yuitest_coverline("build/libbit-view-nav/libbit-view-nav.js", 1);
YUI.add('libbit-view-nav', function (Y, NAME) {

_yuitest_coverfunc("build/libbit-view-nav/libbit-view-nav.js", "(anonymous 1)", 1);
_yuitest_coverline("build/libbit-view-nav/libbit-view-nav.js", 3);
var Nav;

/**
 * Y.View extension to wrap the container into a panel with a header and footer navigation bar.
 */
_yuitest_coverline("build/libbit-view-nav/libbit-view-nav.js", 8);
Nav = Y.Base.create('nav', Y.View, [], {
    /**
     * Title property, sets the panel's header content.
     */
    title : null,

    /**
     * Buttons property, sets the panel's footer buttons.
     */
    buttons : null,

    /**
     * Initializer, gets called upon instance initiation.
     */
    initializer: function () {
        _yuitest_coverfunc("build/libbit-view-nav/libbit-view-nav.js", "initializer", 22);
_yuitest_coverline("build/libbit-view-nav/libbit-view-nav.js", 23);
Y.Do.after(this._afterRender, this, 'render', this);
    },

    /**
     * Wrap the view into a panel after it's rendered.
     */
    _afterRender: function () {
        _yuitest_coverfunc("build/libbit-view-nav/libbit-view-nav.js", "_afterRender", 29);
_yuitest_coverline("build/libbit-view-nav/libbit-view-nav.js", 30);
var container = this.get('container'),
            header    = this.title,
            body      = Y.Node.create('<div></div>'),
            footer    = this._buildFooter(),
            panel;

        // Transfer the child nodes from the view container to the new body container.
        _yuitest_coverline("build/libbit-view-nav/libbit-view-nav.js", 37);
container.get('children').each(function (c) {
            _yuitest_coverfunc("build/libbit-view-nav/libbit-view-nav.js", "(anonymous 2)", 37);
_yuitest_coverline("build/libbit-view-nav/libbit-view-nav.js", 38);
body.append(c);
        });

        _yuitest_coverline("build/libbit-view-nav/libbit-view-nav.js", 41);
panel = new Y.Libbit.NavContainer({
            headerContent: header,
            bodyContent  : body,
            footerContent: footer
        });

        // Render the panel within the view container.
        _yuitest_coverline("build/libbit-view-nav/libbit-view-nav.js", 48);
panel.render(container);
    },

    /**
     * Build the footer buttons and bind them to fire events
     */
    _buildFooter: function () {
        _yuitest_coverfunc("build/libbit-view-nav/libbit-view-nav.js", "_buildFooter", 54);
_yuitest_coverline("build/libbit-view-nav/libbit-view-nav.js", 55);
var self    = this,
            buttons = this.buttons;
            _yuitest_coverline("build/libbit-view-nav/libbit-view-nav.js", 57);
footer  = Y.Node.create('<div></div>');

        _yuitest_coverline("build/libbit-view-nav/libbit-view-nav.js", 59);
Y.Object.each(buttons, function (button, key) {
            _yuitest_coverfunc("build/libbit-view-nav/libbit-view-nav.js", "(anonymous 3)", 59);
_yuitest_coverline("build/libbit-view-nav/libbit-view-nav.js", 60);
var value     = button.value,
                primary   = button.primary,
                position  = button.position ? button.position : 'left',
                title     = button.title ? button.title : value,
                disabled  = button.disabled,
                className = button.className,
                // Format the action event by prepending 'button', for example the event
                // fired for 'cancel' will be 'buttonCancel'
                action    = 'button' + self._capitalizeFirstLetter(key),
                node      = Y.Node.create('<button class="btn"></button>');

            _yuitest_coverline("build/libbit-view-nav/libbit-view-nav.js", 71);
if (value) {
                _yuitest_coverline("build/libbit-view-nav/libbit-view-nav.js", 72);
node.set('text', value);
                _yuitest_coverline("build/libbit-view-nav/libbit-view-nav.js", 73);
node.set('title', title);
            }

            _yuitest_coverline("build/libbit-view-nav/libbit-view-nav.js", 76);
if (primary) {
                _yuitest_coverline("build/libbit-view-nav/libbit-view-nav.js", 77);
node.addClass('btn-primary');
            }

            _yuitest_coverline("build/libbit-view-nav/libbit-view-nav.js", 80);
if (disabled) {
                _yuitest_coverline("build/libbit-view-nav/libbit-view-nav.js", 81);
node.addClass('disabled');
            }

            _yuitest_coverline("build/libbit-view-nav/libbit-view-nav.js", 84);
if (className) {
                _yuitest_coverline("build/libbit-view-nav/libbit-view-nav.js", 85);
node.addClass(className);
            }

            _yuitest_coverline("build/libbit-view-nav/libbit-view-nav.js", 88);
node.addClass('float-' + position);

            _yuitest_coverline("build/libbit-view-nav/libbit-view-nav.js", 90);
node.on('click', function (e) {
                _yuitest_coverfunc("build/libbit-view-nav/libbit-view-nav.js", "(anonymous 4)", 90);
_yuitest_coverline("build/libbit-view-nav/libbit-view-nav.js", 91);
var btn = e.target;

                _yuitest_coverline("build/libbit-view-nav/libbit-view-nav.js", 93);
if (btn.hasClass('disabled') === false) {
                    _yuitest_coverline("build/libbit-view-nav/libbit-view-nav.js", 94);
self.fire(action);
                }
            });

            _yuitest_coverline("build/libbit-view-nav/libbit-view-nav.js", 98);
footer.append(node);
        });

        _yuitest_coverline("build/libbit-view-nav/libbit-view-nav.js", 101);
return footer;
    },

    /**
     * Capitalize the first letter of a given string
     */
    _capitalizeFirstLetter: function (value) {
        _yuitest_coverfunc("build/libbit-view-nav/libbit-view-nav.js", "_capitalizeFirstLetter", 107);
_yuitest_coverline("build/libbit-view-nav/libbit-view-nav.js", 108);
return value.charAt(0).toUpperCase() + value.slice(1);
    },

    /**
     * Magic function to update the buttons properties
     */
    _setButtons: function (value) {
        _yuitest_coverfunc("build/libbit-view-nav/libbit-view-nav.js", "_setButtons", 114);
_yuitest_coverline("build/libbit-view-nav/libbit-view-nav.js", 115);
var self    = this,
            footer  = this.get('container').one('.yui3-widget-ft'),
            buttons = this.buttons;

        _yuitest_coverline("build/libbit-view-nav/libbit-view-nav.js", 119);
Y.Object.each(value, function (properties, key) {
            _yuitest_coverfunc("build/libbit-view-nav/libbit-view-nav.js", "(anonymous 5)", 119);
_yuitest_coverline("build/libbit-view-nav/libbit-view-nav.js", 120);
self.buttons[key] = Y.merge(buttons[key], properties);
        });

        // TODO: Update instead of rerendering.
        _yuitest_coverline("build/libbit-view-nav/libbit-view-nav.js", 124);
footer.one('div').replace(self._buildFooter());
    },

    /**
     * Magic function to get the current button properties
     */
     _getButtons: function () {
        _yuitest_coverfunc("build/libbit-view-nav/libbit-view-nav.js", "_getButtons", 130);
_yuitest_coverline("build/libbit-view-nav/libbit-view-nav.js", 131);
return this.buttons;
    }

}, {
    ATTRS: {
        buttons: {
            setter: '_setButtons',
            getter: '_getButtons'
        }
    }
});

// -- Namespace ----------------------------------------------------------------
_yuitest_coverline("build/libbit-view-nav/libbit-view-nav.js", 144);
Y.namespace('Libbit.View').Nav = Nav;


}, '1.0.0', {"requires": ["event-custom", "libbit-nav-container", "view"]});
