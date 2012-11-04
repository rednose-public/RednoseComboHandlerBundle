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
_yuitest_coverage["build/libbit-controlform/libbit-controlform.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/libbit-controlform/libbit-controlform.js",
    code: []
};
_yuitest_coverage["build/libbit-controlform/libbit-controlform.js"].code=["YUI.add('libbit-controlform', function (Y, NAME) {","","var ControlForm;","","ControlForm = Y.Base.create('controlForm', Y.Base, [], {","    render: function(formsModel)","    {","        var self = this;","","        formsModel.each(function(formItem) {","            self.renderForm(formItem);","        });","    },","","    renderForm: function(formItem)","    {","        var container = this.get('formContainer');","        var form = formItem.get('controlForm');","        var controls = form.get('controlCollection');","","        var formElement = Y.Node.create('<fieldset>');","        var legend = Y.Node.create('<legend>');","        var list = Y.Node.create('<ol>');","","        legend.set('innerHTML', form.get('caption'));","","        formElement.append(legend);","        formElement.append(list);","","        Y.Array.each(controls, function(control) {","            var label = Y.Node.create('<label>');","            var controlContainer = Y.Node.create('<li>');","            var controlElement = null;","","            switch (control.type) {","                case 'text':","                    controlElement = Y.Node.create('<input />');","            }","","            label.set('innerHTML', control.caption);","","            controlContainer.append(label);","            controlContainer.append(controlElement);","","            list.append(controlContainer);","        });","","        var directionClassName = container.getAttribute('class') + '_' + formItem.get('direction');","","        if (container.one('.' + directionClassName) != null) {","            container.one('.' + directionClassName).append(formElement);","        } else {","            container.append(formElement);","        }","    }","}, {","    ATTRS: {","        formContainer: { value: '' }","    }","});","","","Y.namespace('Libbit').ControlForm = ControlForm;","","","}, '1.0.0', {\"requires\": [\"node\", \"model-list\", \"model\", \"base\"]});"];
_yuitest_coverage["build/libbit-controlform/libbit-controlform.js"].lines = {"1":0,"3":0,"5":0,"8":0,"10":0,"11":0,"17":0,"18":0,"19":0,"21":0,"22":0,"23":0,"25":0,"27":0,"28":0,"30":0,"31":0,"32":0,"33":0,"35":0,"37":0,"40":0,"42":0,"43":0,"45":0,"48":0,"50":0,"51":0,"53":0,"63":0};
_yuitest_coverage["build/libbit-controlform/libbit-controlform.js"].functions = {"(anonymous 2):10":0,"render:6":0,"(anonymous 3):30":0,"renderForm:15":0,"(anonymous 1):1":0};
_yuitest_coverage["build/libbit-controlform/libbit-controlform.js"].coveredLines = 30;
_yuitest_coverage["build/libbit-controlform/libbit-controlform.js"].coveredFunctions = 5;
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 1);
YUI.add('libbit-controlform', function (Y, NAME) {

_yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "(anonymous 1)", 1);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 3);
var ControlForm;

_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 5);
ControlForm = Y.Base.create('controlForm', Y.Base, [], {
    render: function(formsModel)
    {
        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "render", 6);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 8);
var self = this;

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 10);
formsModel.each(function(formItem) {
            _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "(anonymous 2)", 10);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 11);
self.renderForm(formItem);
        });
    },

    renderForm: function(formItem)
    {
        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "renderForm", 15);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 17);
var container = this.get('formContainer');
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 18);
var form = formItem.get('controlForm');
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 19);
var controls = form.get('controlCollection');

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 21);
var formElement = Y.Node.create('<fieldset>');
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 22);
var legend = Y.Node.create('<legend>');
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 23);
var list = Y.Node.create('<ol>');

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 25);
legend.set('innerHTML', form.get('caption'));

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 27);
formElement.append(legend);
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 28);
formElement.append(list);

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 30);
Y.Array.each(controls, function(control) {
            _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "(anonymous 3)", 30);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 31);
var label = Y.Node.create('<label>');
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 32);
var controlContainer = Y.Node.create('<li>');
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 33);
var controlElement = null;

            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 35);
switch (control.type) {
                case 'text':
                    _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 37);
controlElement = Y.Node.create('<input />');
            }

            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 40);
label.set('innerHTML', control.caption);

            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 42);
controlContainer.append(label);
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 43);
controlContainer.append(controlElement);

            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 45);
list.append(controlContainer);
        });

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 48);
var directionClassName = container.getAttribute('class') + '_' + formItem.get('direction');

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 50);
if (container.one('.' + directionClassName) != null) {
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 51);
container.one('.' + directionClassName).append(formElement);
        } else {
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 53);
container.append(formElement);
        }
    }
}, {
    ATTRS: {
        formContainer: { value: '' }
    }
});


_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 63);
Y.namespace('Libbit').ControlForm = ControlForm;


}, '1.0.0', {"requires": ["node", "model-list", "model", "base"]});
