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
_yuitest_coverage["build/libbit-grid/libbit-grid.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/libbit-grid/libbit-grid.js",
    code: []
};
_yuitest_coverage["build/libbit-grid/libbit-grid.js"].code=["YUI.add('libbit-grid', function (Y, NAME) {","","var Grid,","    TemplateView;","","TemplateView = Y.Base.create('templateView', Y.View, [], {","","    // Compile our template using Handlebars.","    template: Y.Handlebars.compile(","        '<div class=\"template-grid-container\" data-yui3-record=\"{{ clientId }}\">' +","        '    <div class=\"template-grid-icon-container\">' +","        '        <div class=\"template-grid-icon-wrapper\">' +","        '            <img class=\"template-grid-icon\" height=\"100%\" width=\"100%\"></img>' +","        '       </div>' +","        '    </div>' +","        '    <div class=\"template-grid-footer\">' +","        '        <div class=\"template-grid-name\">{{ name }}</div>' +","        '        <input class=\"edit\" type=\"text\" value=\"{{ name }}\" />' +","        '        <div class=\"template-grid-date\">{{ dateCreated }}</div>' +","        '    </div>' +","        '</div>'","    ),","","    events: {","        '.template-grid-name': {","            click: 'edit'","        },","        '.edit': {","            blur: 'close',","            keypress: 'enterUpdate'","        },","        '.template-grid-container': {","            contextmenu: 'contextMenu'","        }","    },","","    // Initialize this view by setting event handlers when the Model","    // is updated or destroyed.","    initializer: function () {","    },","","    // Render this view in our <li> container, and fill it with the","    // data in our Model.","    render: function () {","        var container = this.get('container'),","            model     = this.get('model'),","            content;","","        content = this.template(model.getAttrs());","","        container.setContent(content);","","        this.set('inputNode', container.one('.edit'));","        this.set('footerNode', container.one('.template-grid-footer'));","","        return this;","    },","","    // Turn on editing mode for the Template name by exposing the input field.","    edit: function (e) {","        this.get('footerNode').addClass('editing');","        this.get('inputNode').focus();","    },","","    // Get the value from our input field while hiding it, and","    // save it to our Template when focus is lost from the field.","    close: function (e) {","        var value       = this.get('inputNode').get('value'),","            editedValue = Y.Escape.html(Y.Lang.trim(value)),","            template    = this.get('model');","","        this.get('footerNode').removeClass('editing');","","        if (editedValue) {","            template.set('name', editedValue);","            // FIXME: Find out why the model gets saved twice.","            template.save();","        }","    },","","    // Also allow updating the Template's name through the enter key.","    enterUpdate: function (e) {","        var ENTER_KEY = 13;","","        if (e.keyCode === ENTER_KEY) {","            this.close();","        }","    },","","    contextMenu: function (e) {","        var container = this.get('container'),","            template  = this.get('model'),","            contextMenu;","","        // TODO: Filter click so it doesn't get triggered when clicked in the margins","        e.preventDefault();","","        // Remove a previous context menu if it exists","        if (Y.Lang.isNull(Y.one('#template-context')) === false) {","            // FIXME: Also destroy the panel node","            Y.one('#template-context').remove();","        }","","        // TODO: Create contextmenu widget","        contextMenu = new Y.Overlay({","            bodyContent: '<div id=\"template-context\" class=\"dropdown open\"><ul class=\"dropdown-menu\">' +","                         '<li><a data-event=\"templateDelete\" href=\"#\">Delete template</a></li>' +","                         '<li><a data-event=\"templateDuplicate\" href=\"#\">Duplicate template</a></li>' +","                         '</ul></div>',","            visible    : false,","            constrain  : true","        });","","        contextMenu.render(container);","","        contextMenu.set('xy', [e.pageX, e.pageY]);","        contextMenu.show();","","        // Bind the menu events","        Y.one('#template-context').all('a').each(function (node) {","            node.on(['click', 'contextmenu'], function (e) {","                e.preventDefault();","","                Y.fire('templateContextMenu:' + node.getAttribute('data-event'), {","                    node : container,","                    model: template","                });","","                // FIXME: Also destroy the panel node","                Y.one('#template-context').remove();","            });","        });","    }","});","","Grid = Y.Base.create('grid', Y.Widget,  [ Y.Libbit.Grid.Selectable ], {","    initializer: function (config) {","        var data = config.data;","    },","","    renderUI : function () {","        this._renderGridItems();","    },","","    bindUI: function () {","    },","","    _renderGridItems : function() {","        var contentBox = this.get(\"contentBox\"),","            list       = this.get('data');","","        list.each(function (model) {","            var view = new TemplateView({model: model}),","                node = view.render().get('container');","","            contentBox.append(node);","        });","    }","}, {","    ATTRS: {","        /**","         * The Modellist containing the models to be rendered","         */","        data: {","            value: new Y.ModelList()","        }","    }","});","","// -- Namespace ----------------------------------------------------------------","Y.namespace('Libbit').Grid = Grid;","","","}, '@VERSION@', {\"requires\": [\"handlebars\", \"libbit-grid-select\", \"model-list\", \"view\"], \"skinnable\": true});"];
_yuitest_coverage["build/libbit-grid/libbit-grid.js"].lines = {"1":0,"3":0,"6":0,"45":0,"49":0,"51":0,"53":0,"54":0,"56":0,"61":0,"62":0,"68":0,"72":0,"74":0,"75":0,"77":0,"83":0,"85":0,"86":0,"91":0,"96":0,"99":0,"101":0,"105":0,"114":0,"116":0,"117":0,"120":0,"121":0,"122":0,"124":0,"130":0,"136":0,"138":0,"142":0,"149":0,"152":0,"153":0,"156":0,"171":0};
_yuitest_coverage["build/libbit-grid/libbit-grid.js"].functions = {"render:44":0,"edit:60":0,"close:67":0,"enterUpdate:82":0,"(anonymous 3):121":0,"(anonymous 2):120":0,"contextMenu:90":0,"initializer:137":0,"renderUI:141":0,"(anonymous 4):152":0,"_renderGridItems:148":0,"(anonymous 1):1":0};
_yuitest_coverage["build/libbit-grid/libbit-grid.js"].coveredLines = 40;
_yuitest_coverage["build/libbit-grid/libbit-grid.js"].coveredFunctions = 12;
_yuitest_coverline("build/libbit-grid/libbit-grid.js", 1);
YUI.add('libbit-grid', function (Y, NAME) {

_yuitest_coverfunc("build/libbit-grid/libbit-grid.js", "(anonymous 1)", 1);
_yuitest_coverline("build/libbit-grid/libbit-grid.js", 3);
var Grid,
    TemplateView;

_yuitest_coverline("build/libbit-grid/libbit-grid.js", 6);
TemplateView = Y.Base.create('templateView', Y.View, [], {

    // Compile our template using Handlebars.
    template: Y.Handlebars.compile(
        '<div class="template-grid-container" data-yui3-record="{{ clientId }}">' +
        '    <div class="template-grid-icon-container">' +
        '        <div class="template-grid-icon-wrapper">' +
        '            <img class="template-grid-icon" height="100%" width="100%"></img>' +
        '       </div>' +
        '    </div>' +
        '    <div class="template-grid-footer">' +
        '        <div class="template-grid-name">{{ name }}</div>' +
        '        <input class="edit" type="text" value="{{ name }}" />' +
        '        <div class="template-grid-date">{{ dateCreated }}</div>' +
        '    </div>' +
        '</div>'
    ),

    events: {
        '.template-grid-name': {
            click: 'edit'
        },
        '.edit': {
            blur: 'close',
            keypress: 'enterUpdate'
        },
        '.template-grid-container': {
            contextmenu: 'contextMenu'
        }
    },

    // Initialize this view by setting event handlers when the Model
    // is updated or destroyed.
    initializer: function () {
    },

    // Render this view in our <li> container, and fill it with the
    // data in our Model.
    render: function () {
        _yuitest_coverfunc("build/libbit-grid/libbit-grid.js", "render", 44);
_yuitest_coverline("build/libbit-grid/libbit-grid.js", 45);
var container = this.get('container'),
            model     = this.get('model'),
            content;

        _yuitest_coverline("build/libbit-grid/libbit-grid.js", 49);
content = this.template(model.getAttrs());

        _yuitest_coverline("build/libbit-grid/libbit-grid.js", 51);
container.setContent(content);

        _yuitest_coverline("build/libbit-grid/libbit-grid.js", 53);
this.set('inputNode', container.one('.edit'));
        _yuitest_coverline("build/libbit-grid/libbit-grid.js", 54);
this.set('footerNode', container.one('.template-grid-footer'));

        _yuitest_coverline("build/libbit-grid/libbit-grid.js", 56);
return this;
    },

    // Turn on editing mode for the Template name by exposing the input field.
    edit: function (e) {
        _yuitest_coverfunc("build/libbit-grid/libbit-grid.js", "edit", 60);
_yuitest_coverline("build/libbit-grid/libbit-grid.js", 61);
this.get('footerNode').addClass('editing');
        _yuitest_coverline("build/libbit-grid/libbit-grid.js", 62);
this.get('inputNode').focus();
    },

    // Get the value from our input field while hiding it, and
    // save it to our Template when focus is lost from the field.
    close: function (e) {
        _yuitest_coverfunc("build/libbit-grid/libbit-grid.js", "close", 67);
_yuitest_coverline("build/libbit-grid/libbit-grid.js", 68);
var value       = this.get('inputNode').get('value'),
            editedValue = Y.Escape.html(Y.Lang.trim(value)),
            template    = this.get('model');

        _yuitest_coverline("build/libbit-grid/libbit-grid.js", 72);
this.get('footerNode').removeClass('editing');

        _yuitest_coverline("build/libbit-grid/libbit-grid.js", 74);
if (editedValue) {
            _yuitest_coverline("build/libbit-grid/libbit-grid.js", 75);
template.set('name', editedValue);
            // FIXME: Find out why the model gets saved twice.
            _yuitest_coverline("build/libbit-grid/libbit-grid.js", 77);
template.save();
        }
    },

    // Also allow updating the Template's name through the enter key.
    enterUpdate: function (e) {
        _yuitest_coverfunc("build/libbit-grid/libbit-grid.js", "enterUpdate", 82);
_yuitest_coverline("build/libbit-grid/libbit-grid.js", 83);
var ENTER_KEY = 13;

        _yuitest_coverline("build/libbit-grid/libbit-grid.js", 85);
if (e.keyCode === ENTER_KEY) {
            _yuitest_coverline("build/libbit-grid/libbit-grid.js", 86);
this.close();
        }
    },

    contextMenu: function (e) {
        _yuitest_coverfunc("build/libbit-grid/libbit-grid.js", "contextMenu", 90);
_yuitest_coverline("build/libbit-grid/libbit-grid.js", 91);
var container = this.get('container'),
            template  = this.get('model'),
            contextMenu;

        // TODO: Filter click so it doesn't get triggered when clicked in the margins
        _yuitest_coverline("build/libbit-grid/libbit-grid.js", 96);
e.preventDefault();

        // Remove a previous context menu if it exists
        _yuitest_coverline("build/libbit-grid/libbit-grid.js", 99);
if (Y.Lang.isNull(Y.one('#template-context')) === false) {
            // FIXME: Also destroy the panel node
            _yuitest_coverline("build/libbit-grid/libbit-grid.js", 101);
Y.one('#template-context').remove();
        }

        // TODO: Create contextmenu widget
        _yuitest_coverline("build/libbit-grid/libbit-grid.js", 105);
contextMenu = new Y.Overlay({
            bodyContent: '<div id="template-context" class="dropdown open"><ul class="dropdown-menu">' +
                         '<li><a data-event="templateDelete" href="#">Delete template</a></li>' +
                         '<li><a data-event="templateDuplicate" href="#">Duplicate template</a></li>' +
                         '</ul></div>',
            visible    : false,
            constrain  : true
        });

        _yuitest_coverline("build/libbit-grid/libbit-grid.js", 114);
contextMenu.render(container);

        _yuitest_coverline("build/libbit-grid/libbit-grid.js", 116);
contextMenu.set('xy', [e.pageX, e.pageY]);
        _yuitest_coverline("build/libbit-grid/libbit-grid.js", 117);
contextMenu.show();

        // Bind the menu events
        _yuitest_coverline("build/libbit-grid/libbit-grid.js", 120);
Y.one('#template-context').all('a').each(function (node) {
            _yuitest_coverfunc("build/libbit-grid/libbit-grid.js", "(anonymous 2)", 120);
_yuitest_coverline("build/libbit-grid/libbit-grid.js", 121);
node.on(['click', 'contextmenu'], function (e) {
                _yuitest_coverfunc("build/libbit-grid/libbit-grid.js", "(anonymous 3)", 121);
_yuitest_coverline("build/libbit-grid/libbit-grid.js", 122);
e.preventDefault();

                _yuitest_coverline("build/libbit-grid/libbit-grid.js", 124);
Y.fire('templateContextMenu:' + node.getAttribute('data-event'), {
                    node : container,
                    model: template
                });

                // FIXME: Also destroy the panel node
                _yuitest_coverline("build/libbit-grid/libbit-grid.js", 130);
Y.one('#template-context').remove();
            });
        });
    }
});

_yuitest_coverline("build/libbit-grid/libbit-grid.js", 136);
Grid = Y.Base.create('grid', Y.Widget,  [ Y.Libbit.Grid.Selectable ], {
    initializer: function (config) {
        _yuitest_coverfunc("build/libbit-grid/libbit-grid.js", "initializer", 137);
_yuitest_coverline("build/libbit-grid/libbit-grid.js", 138);
var data = config.data;
    },

    renderUI : function () {
        _yuitest_coverfunc("build/libbit-grid/libbit-grid.js", "renderUI", 141);
_yuitest_coverline("build/libbit-grid/libbit-grid.js", 142);
this._renderGridItems();
    },

    bindUI: function () {
    },

    _renderGridItems : function() {
        _yuitest_coverfunc("build/libbit-grid/libbit-grid.js", "_renderGridItems", 148);
_yuitest_coverline("build/libbit-grid/libbit-grid.js", 149);
var contentBox = this.get("contentBox"),
            list       = this.get('data');

        _yuitest_coverline("build/libbit-grid/libbit-grid.js", 152);
list.each(function (model) {
            _yuitest_coverfunc("build/libbit-grid/libbit-grid.js", "(anonymous 4)", 152);
_yuitest_coverline("build/libbit-grid/libbit-grid.js", 153);
var view = new TemplateView({model: model}),
                node = view.render().get('container');

            _yuitest_coverline("build/libbit-grid/libbit-grid.js", 156);
contentBox.append(node);
        });
    }
}, {
    ATTRS: {
        /**
         * The Modellist containing the models to be rendered
         */
        data: {
            value: new Y.ModelList()
        }
    }
});

// -- Namespace ----------------------------------------------------------------
_yuitest_coverline("build/libbit-grid/libbit-grid.js", 171);
Y.namespace('Libbit').Grid = Grid;


}, '@VERSION@', {"requires": ["handlebars", "libbit-grid-select", "model-list", "view"], "skinnable": true});
