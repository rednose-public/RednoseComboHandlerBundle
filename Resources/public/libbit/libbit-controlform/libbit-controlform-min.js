YUI.add('libbit-controlform', function(Y) {

var ControlForm;

ControlForm = Y.Base.create('controlForm', Y.Base, [], {
    render: function(formsModel)
    {
        var self = this;

        formsModel.each(function(formItem) {
            self.renderForm(formItem);
        });
    },

    renderForm: function(formItem)
    {
        var container = this.get('formContainer');
        var form = formItem.get('controlForm')
        var controls = form.get('controlCollection');

        var formElement = Y.Node.create('<fieldset>');
        var legend = Y.Node.create('<legend>');
        var list = Y.Node.create('<ol>');

        legend.set('innerHTML', form.get('caption'));

        formElement.append(legend);
        formElement.append(list);

        Y.Array.each(controls, function(control) {
            var label = Y.Node.create('<label>');
            var controlContainer = Y.Node.create('<li>');
            var controlElement = null;

            switch (control.type) {
                case 'text':
                    controlElement = Y.Node.create('<input />');
            }

            label.set('innerHTML', control.caption);

            controlContainer.append(label);
            controlContainer.append(controlElement);

            list.append(controlContainer);
        });

        var directionClassName = container.getAttribute('class') + '_' + formItem.get('direction');

        if (container.one('.' + directionClassName) != null) {
            container.one('.' + directionClassName).append(formElement);
        } else {
            container.append(formElement);
        }
    },
}, {
    ATTRS: {
        formContainer: { value: '' },
    }
});


Y.namespace('Libbit').ControlForm = ControlForm;

}, '1.0' ,{
    requires:[
        'node',
        'model-list',
        'model',
        'base'
    ]
});
