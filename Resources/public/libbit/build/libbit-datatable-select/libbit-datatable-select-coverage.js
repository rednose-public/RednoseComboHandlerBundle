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
_yuitest_coverage["build/libbit-datatable-select/libbit-datatable-select.js"].code=["YUI.add('libbit-datatable-select', function (Y, NAME) {","","/**"," * Create a selection plugin for the LiBBiT DataTable widget."," */","function DataTableSelectPlugin(config) {","    DataTableSelectPlugin.superclass.constructor.apply(this, arguments);","}","","/**"," * The identity of the plugin."," */","DataTableSelectPlugin.NAME = 'dataTableSelectPlugin';","","/**"," * The namespace for the plugin."," */","DataTableSelectPlugin.NS = 'selectable';","","/**"," * Static property used to define the default attribute configuration of the"," * plugin."," */","DataTableSelectPlugin.ATTRS = {","","    /**","     * The row currently selected.","     */","    selectedRow : {","        value: null","    }","};","","Y.extend(DataTableSelectPlugin, Y.Plugin.Base, {","","    /**","     * Bind the click events and set up a listener for the selectedRow attribute.","     */","    initializer: function (config) {","        var table = this.get('host');","","        // Handle the click event","        table.get('contentBox').delegate('click', this._handleClick, '.yui3-datatable-data tr', this);","        this.after('selectedRowChange', this._afterSelectedRowChange, this);","    },","","    /**","     * Handles the row click event, and updates the selectedRow attribute,","     * which fires an event on change.","     */","    _handleClick: function (e) {","        this.set('selectedRow', e.currentTarget);","    },","","    /**","     * The selection changed, update the DOM and fire an event containing","     * the model that was selected.","     */","    _afterSelectedRowChange: function (e) {","        // TODO: Keep selection after sorting","        var table = this.get('host'),","            node    = e.newVal,","            oldNode = e.prevVal,","            model;","","        // Cancel if the selection did not change.","        if (node === oldNode) {","            return false;","        }","","        // Remove all selection CSS on the previous selection","        if (oldNode) {","            oldNode.all('td').removeClass('datatable-selected');","            if (oldNode.one('i') && oldNode.one('i').hasClass('icon-white')) {","                // Inverse the icon color if there is one.","                oldNode.one('i').removeClass('icon-white');","            }","        }","","        // Apply the CSS to the new selection and fire an event.","        if (Y.Lang.isNull(node) === false) {","            // After unhighlighting, now highlight the current row.","            node.all('td').addClass('datatable-selected');","","            // Inverse the icon color if there is one.","            node.one('i').addClass('icon-white');","","            model = this._getModelFromTableRow(node);","","            // Fires the select event from the host passes along the needed information.","            table.fire('select', { model: model });","        }","","        return true;","    },","","    /**","     * Parse an HTML <tr/> node and retrieve the corresponding model from the model list.","     */","    _getModelFromTableRow: function (node) {","        // The model's ClientID is stored within an HTML5 data attribute ('data-yui3-record'),","        // for example 'image_1'.","        var id        = node.getAttribute('data-yui3-record'),","            modelList = this.get('host').data;","","        return modelList.getByClientId(id);","    }","});","","// -- Namespace ----------------------------------------------------------------","Y.namespace('Libbit').DataTableSelectPlugin = DataTableSelectPlugin;","","","}, '@VERSION@', {\"requires\": [\"libbit-datatable\", \"plugin\"]});"];
_yuitest_coverage["build/libbit-datatable-select/libbit-datatable-select.js"].lines = {"1":0,"6":0,"7":0,"13":0,"18":0,"24":0,"34":0,"40":0,"43":0,"44":0,"52":0,"61":0,"67":0,"68":0,"72":0,"73":0,"74":0,"76":0,"81":0,"83":0,"86":0,"88":0,"91":0,"94":0,"103":0,"106":0,"111":0};
_yuitest_coverage["build/libbit-datatable-select/libbit-datatable-select.js"].functions = {"DataTableSelectPlugin:6":0,"initializer:39":0,"_handleClick:51":0,"_afterSelectedRowChange:59":0,"_getModelFromTableRow:100":0,"(anonymous 1):1":0};
_yuitest_coverage["build/libbit-datatable-select/libbit-datatable-select.js"].coveredLines = 27;
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

_yuitest_coverline("build/libbit-datatable-select/libbit-datatable-select.js", 34);
Y.extend(DataTableSelectPlugin, Y.Plugin.Base, {

    /**
     * Bind the click events and set up a listener for the selectedRow attribute.
     */
    initializer: function (config) {
        _yuitest_coverfunc("build/libbit-datatable-select/libbit-datatable-select.js", "initializer", 39);
_yuitest_coverline("build/libbit-datatable-select/libbit-datatable-select.js", 40);
var table = this.get('host');

        // Handle the click event
        _yuitest_coverline("build/libbit-datatable-select/libbit-datatable-select.js", 43);
table.get('contentBox').delegate('click', this._handleClick, '.yui3-datatable-data tr', this);
        _yuitest_coverline("build/libbit-datatable-select/libbit-datatable-select.js", 44);
this.after('selectedRowChange', this._afterSelectedRowChange, this);
    },

    /**
     * Handles the row click event, and updates the selectedRow attribute,
     * which fires an event on change.
     */
    _handleClick: function (e) {
        _yuitest_coverfunc("build/libbit-datatable-select/libbit-datatable-select.js", "_handleClick", 51);
_yuitest_coverline("build/libbit-datatable-select/libbit-datatable-select.js", 52);
this.set('selectedRow', e.currentTarget);
    },

    /**
     * The selection changed, update the DOM and fire an event containing
     * the model that was selected.
     */
    _afterSelectedRowChange: function (e) {
        // TODO: Keep selection after sorting
        _yuitest_coverfunc("build/libbit-datatable-select/libbit-datatable-select.js", "_afterSelectedRowChange", 59);
_yuitest_coverline("build/libbit-datatable-select/libbit-datatable-select.js", 61);
var table = this.get('host'),
            node    = e.newVal,
            oldNode = e.prevVal,
            model;

        // Cancel if the selection did not change.
        _yuitest_coverline("build/libbit-datatable-select/libbit-datatable-select.js", 67);
if (node === oldNode) {
            _yuitest_coverline("build/libbit-datatable-select/libbit-datatable-select.js", 68);
return false;
        }

        // Remove all selection CSS on the previous selection
        _yuitest_coverline("build/libbit-datatable-select/libbit-datatable-select.js", 72);
if (oldNode) {
            _yuitest_coverline("build/libbit-datatable-select/libbit-datatable-select.js", 73);
oldNode.all('td').removeClass('datatable-selected');
            _yuitest_coverline("build/libbit-datatable-select/libbit-datatable-select.js", 74);
if (oldNode.one('i') && oldNode.one('i').hasClass('icon-white')) {
                // Inverse the icon color if there is one.
                _yuitest_coverline("build/libbit-datatable-select/libbit-datatable-select.js", 76);
oldNode.one('i').removeClass('icon-white');
            }
        }

        // Apply the CSS to the new selection and fire an event.
        _yuitest_coverline("build/libbit-datatable-select/libbit-datatable-select.js", 81);
if (Y.Lang.isNull(node) === false) {
            // After unhighlighting, now highlight the current row.
            _yuitest_coverline("build/libbit-datatable-select/libbit-datatable-select.js", 83);
node.all('td').addClass('datatable-selected');

            // Inverse the icon color if there is one.
            _yuitest_coverline("build/libbit-datatable-select/libbit-datatable-select.js", 86);
node.one('i').addClass('icon-white');

            _yuitest_coverline("build/libbit-datatable-select/libbit-datatable-select.js", 88);
model = this._getModelFromTableRow(node);

            // Fires the select event from the host passes along the needed information.
            _yuitest_coverline("build/libbit-datatable-select/libbit-datatable-select.js", 91);
table.fire('select', { model: model });
        }

        _yuitest_coverline("build/libbit-datatable-select/libbit-datatable-select.js", 94);
return true;
    },

    /**
     * Parse an HTML <tr/> node and retrieve the corresponding model from the model list.
     */
    _getModelFromTableRow: function (node) {
        // The model's ClientID is stored within an HTML5 data attribute ('data-yui3-record'),
        // for example 'image_1'.
        _yuitest_coverfunc("build/libbit-datatable-select/libbit-datatable-select.js", "_getModelFromTableRow", 100);
_yuitest_coverline("build/libbit-datatable-select/libbit-datatable-select.js", 103);
var id        = node.getAttribute('data-yui3-record'),
            modelList = this.get('host').data;

        _yuitest_coverline("build/libbit-datatable-select/libbit-datatable-select.js", 106);
return modelList.getByClientId(id);
    }
});

// -- Namespace ----------------------------------------------------------------
_yuitest_coverline("build/libbit-datatable-select/libbit-datatable-select.js", 111);
Y.namespace('Libbit').DataTableSelectPlugin = DataTableSelectPlugin;


}, '@VERSION@', {"requires": ["libbit-datatable", "plugin"]});
