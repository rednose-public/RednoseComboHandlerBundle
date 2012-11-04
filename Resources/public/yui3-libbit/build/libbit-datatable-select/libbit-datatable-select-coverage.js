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
_yuitest_coverage["build/libbit-datatable-select/libbit-datatable-select.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/libbit-datatable-select/libbit-datatable-select.js",
    code: []
};
_yuitest_coverage["build/libbit-datatable-select/libbit-datatable-select.js"].code=["YUI.add('libbit-datatable-select', function (Y, NAME) {","","/**"," * Create a selection plugin for the LiBBiT DataTable widget."," */","function DataTableSelectPlugin(config) {","    DataTableSelectPlugin.superclass.constructor.apply(this, arguments);","}","","/**"," * The identity of the plugin."," */","DataTableSelectPlugin.NAME = 'dataTableSelectPlugin';","","/**"," * The namespace for the plugin."," */","DataTableSelectPlugin.NS = 'selectable';","","/**"," * Static property used to define the default attribute configuration of the"," * plugin."," */","DataTableSelectPlugin.ATTRS = {","","    /**","     * The row currently selected.","     */","    selectedRow : {","        value: null","    }","};","","// TODO: Persist selection after sorting.","Y.extend(DataTableSelectPlugin, Y.Plugin.Base, {","","    /**","     * Bind the click events and set up a listener for the selectedRow attribute.","     */","    initializer: function () {","        var table      = this.get('host'),","            contentBox = table.get('contentBox');","","        this.after('selectedRowChange', this._afterSelectedRowChange, this);","        contentBox.on('click', this._handleClick, this);","    },","","    /**","     * Handles the row click event, and updates the selectedRow attribute,","     * which fires an event on change.","     */","    _handleClick: function (e) {","        var target = e.target;","","        if (e.target.ancestor('.yui3-datatable-data tr')) {","            // This is a table row, update the selection.","            this.set('selectedRow', target.ancestor('.yui3-datatable-data tr'));","        } else if (e.target.ancestor('.yui3-datatable-columns')) {","            // This is a table column, ignore.","            return false;","        } else {","            // Clicked outside the rows, reset the selection.","            this.set('selectedRow', null);","        }","","        return true;","    },","","    /**","     * The selection changed, update the DOM and fire an event containing","     * the model that was selected.","     */","    _afterSelectedRowChange: function (e) {","        // TODO: Keep selection after sorting","        var table   = this.get('host'),","            node    = e.newVal,","            oldNode = e.prevVal,","            model   = null;","","        // Cancel if the selection did not change.","        if (node === oldNode) {","            return false;","        }","","        // Remove all selection CSS on the previous selection","        if (oldNode) {","            oldNode.all('td').removeClass('datatable-selected');","","            // Inverse the icon color if there is one.","            if (oldNode.one('i') && oldNode.one('i').hasClass('icon-white')) {","                oldNode.one('i').removeClass('icon-white');","            }","        }","","        // Apply the CSS to the new selection and fire an event.","        if (Y.Lang.isNull(node) === false) {","            // After unhighlighting, now highlight the current row.","            node.all('td').addClass('datatable-selected');","","            // Inverse the icon color if there is one.","            if (node.one('i')) {","                node.one('i').addClass('icon-white');","            }","","            model = this._getModelFromTableRow(node);","        }","","        // Fires the select event from the host passes along the needed information.","        table.fire('select', { model: model });","","        return true;","    },","","    /**","     * Parse an HTML <tr/> node and retrieve the corresponding model from the model list.","     */","    _getModelFromTableRow: function (node) {","        // The model's ClientID is stored within an HTML5 data attribute ('data-yui3-record'),","        // for example 'image_1'.","        var id        = node.getAttribute('data-yui3-record'),","            modelList = this.get('host').data;","","        return modelList.getByClientId(id);","    }","});","","// -- Namespace ----------------------------------------------------------------","Y.namespace('Libbit').DataTableSelectPlugin = DataTableSelectPlugin;","","","}, '@VERSION@', {\"requires\": [\"libbit-datatable\", \"plugin\"]});"];
_yuitest_coverage["build/libbit-datatable-select/libbit-datatable-select.js"].lines = {"1":0,"6":0,"7":0,"13":0,"18":0,"24":0,"35":0,"41":0,"44":0,"45":0,"53":0,"55":0,"57":0,"58":0,"60":0,"63":0,"66":0,"75":0,"81":0,"82":0,"86":0,"87":0,"90":0,"91":0,"96":0,"98":0,"101":0,"102":0,"105":0,"109":0,"111":0,"120":0,"123":0,"128":0};
_yuitest_coverage["build/libbit-datatable-select/libbit-datatable-select.js"].functions = {"DataTableSelectPlugin:6":0,"initializer:40":0,"_handleClick:52":0,"_afterSelectedRowChange:73":0,"_getModelFromTableRow:117":0,"(anonymous 1):1":0};
_yuitest_coverage["build/libbit-datatable-select/libbit-datatable-select.js"].coveredLines = 34;
_yuitest_coverage["build/libbit-datatable-select/libbit-datatable-select.js"].coveredFunctions = 6;
_yuitest_coverline("build/libbit-datatable-select/libbit-datatable-select.js", 1);
YUI.add('libbit-datatable-select', function (Y, NAME) {

/**
 * Create a selection plugin for the LiBBiT DataTable widget.
 */
_yuitest_coverfunc("build/libbit-datatable-select/libbit-datatable-select.js", "(anonymous 1)", 1);
_yuitest_coverline("build/libbit-datatable-select/libbit-datatable-select.js", 6);
function DataTableSelectPlugin(config) {
    _yuitest_coverfunc("build/libbit-datatable-select/libbit-datatable-select.js", "DataTableSelectPlugin", 6);
_yuitest_coverline("build/libbit-datatable-select/libbit-datatable-select.js", 7);
DataTableSelectPlugin.superclass.constructor.apply(this, arguments);
}

/**
 * The identity of the plugin.
 */
_yuitest_coverline("build/libbit-datatable-select/libbit-datatable-select.js", 13);
DataTableSelectPlugin.NAME = 'dataTableSelectPlugin';

/**
 * The namespace for the plugin.
 */
_yuitest_coverline("build/libbit-datatable-select/libbit-datatable-select.js", 18);
DataTableSelectPlugin.NS = 'selectable';

/**
 * Static property used to define the default attribute configuration of the
 * plugin.
 */
_yuitest_coverline("build/libbit-datatable-select/libbit-datatable-select.js", 24);
DataTableSelectPlugin.ATTRS = {

    /**
     * The row currently selected.
     */
    selectedRow : {
        value: null
    }
};

// TODO: Persist selection after sorting.
_yuitest_coverline("build/libbit-datatable-select/libbit-datatable-select.js", 35);
Y.extend(DataTableSelectPlugin, Y.Plugin.Base, {

    /**
     * Bind the click events and set up a listener for the selectedRow attribute.
     */
    initializer: function () {
        _yuitest_coverfunc("build/libbit-datatable-select/libbit-datatable-select.js", "initializer", 40);
_yuitest_coverline("build/libbit-datatable-select/libbit-datatable-select.js", 41);
var table      = this.get('host'),
            contentBox = table.get('contentBox');

        _yuitest_coverline("build/libbit-datatable-select/libbit-datatable-select.js", 44);
this.after('selectedRowChange', this._afterSelectedRowChange, this);
        _yuitest_coverline("build/libbit-datatable-select/libbit-datatable-select.js", 45);
contentBox.on('click', this._handleClick, this);
    },

    /**
     * Handles the row click event, and updates the selectedRow attribute,
     * which fires an event on change.
     */
    _handleClick: function (e) {
        _yuitest_coverfunc("build/libbit-datatable-select/libbit-datatable-select.js", "_handleClick", 52);
_yuitest_coverline("build/libbit-datatable-select/libbit-datatable-select.js", 53);
var target = e.target;

        _yuitest_coverline("build/libbit-datatable-select/libbit-datatable-select.js", 55);
if (e.target.ancestor('.yui3-datatable-data tr')) {
            // This is a table row, update the selection.
            _yuitest_coverline("build/libbit-datatable-select/libbit-datatable-select.js", 57);
this.set('selectedRow', target.ancestor('.yui3-datatable-data tr'));
        } else {_yuitest_coverline("build/libbit-datatable-select/libbit-datatable-select.js", 58);
if (e.target.ancestor('.yui3-datatable-columns')) {
            // This is a table column, ignore.
            _yuitest_coverline("build/libbit-datatable-select/libbit-datatable-select.js", 60);
return false;
        } else {
            // Clicked outside the rows, reset the selection.
            _yuitest_coverline("build/libbit-datatable-select/libbit-datatable-select.js", 63);
this.set('selectedRow', null);
        }}

        _yuitest_coverline("build/libbit-datatable-select/libbit-datatable-select.js", 66);
return true;
    },

    /**
     * The selection changed, update the DOM and fire an event containing
     * the model that was selected.
     */
    _afterSelectedRowChange: function (e) {
        // TODO: Keep selection after sorting
        _yuitest_coverfunc("build/libbit-datatable-select/libbit-datatable-select.js", "_afterSelectedRowChange", 73);
_yuitest_coverline("build/libbit-datatable-select/libbit-datatable-select.js", 75);
var table   = this.get('host'),
            node    = e.newVal,
            oldNode = e.prevVal,
            model   = null;

        // Cancel if the selection did not change.
        _yuitest_coverline("build/libbit-datatable-select/libbit-datatable-select.js", 81);
if (node === oldNode) {
            _yuitest_coverline("build/libbit-datatable-select/libbit-datatable-select.js", 82);
return false;
        }

        // Remove all selection CSS on the previous selection
        _yuitest_coverline("build/libbit-datatable-select/libbit-datatable-select.js", 86);
if (oldNode) {
            _yuitest_coverline("build/libbit-datatable-select/libbit-datatable-select.js", 87);
oldNode.all('td').removeClass('datatable-selected');

            // Inverse the icon color if there is one.
            _yuitest_coverline("build/libbit-datatable-select/libbit-datatable-select.js", 90);
if (oldNode.one('i') && oldNode.one('i').hasClass('icon-white')) {
                _yuitest_coverline("build/libbit-datatable-select/libbit-datatable-select.js", 91);
oldNode.one('i').removeClass('icon-white');
            }
        }

        // Apply the CSS to the new selection and fire an event.
        _yuitest_coverline("build/libbit-datatable-select/libbit-datatable-select.js", 96);
if (Y.Lang.isNull(node) === false) {
            // After unhighlighting, now highlight the current row.
            _yuitest_coverline("build/libbit-datatable-select/libbit-datatable-select.js", 98);
node.all('td').addClass('datatable-selected');

            // Inverse the icon color if there is one.
            _yuitest_coverline("build/libbit-datatable-select/libbit-datatable-select.js", 101);
if (node.one('i')) {
                _yuitest_coverline("build/libbit-datatable-select/libbit-datatable-select.js", 102);
node.one('i').addClass('icon-white');
            }

            _yuitest_coverline("build/libbit-datatable-select/libbit-datatable-select.js", 105);
model = this._getModelFromTableRow(node);
        }

        // Fires the select event from the host passes along the needed information.
        _yuitest_coverline("build/libbit-datatable-select/libbit-datatable-select.js", 109);
table.fire('select', { model: model });

        _yuitest_coverline("build/libbit-datatable-select/libbit-datatable-select.js", 111);
return true;
    },

    /**
     * Parse an HTML <tr/> node and retrieve the corresponding model from the model list.
     */
    _getModelFromTableRow: function (node) {
        // The model's ClientID is stored within an HTML5 data attribute ('data-yui3-record'),
        // for example 'image_1'.
        _yuitest_coverfunc("build/libbit-datatable-select/libbit-datatable-select.js", "_getModelFromTableRow", 117);
_yuitest_coverline("build/libbit-datatable-select/libbit-datatable-select.js", 120);
var id        = node.getAttribute('data-yui3-record'),
            modelList = this.get('host').data;

        _yuitest_coverline("build/libbit-datatable-select/libbit-datatable-select.js", 123);
return modelList.getByClientId(id);
    }
});

// -- Namespace ----------------------------------------------------------------
_yuitest_coverline("build/libbit-datatable-select/libbit-datatable-select.js", 128);
Y.namespace('Libbit').DataTableSelectPlugin = DataTableSelectPlugin;


}, '@VERSION@', {"requires": ["libbit-datatable", "plugin"]});
