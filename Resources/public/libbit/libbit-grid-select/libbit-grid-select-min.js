/*
Copyright 2012 RedNose IT B.V.

Licensed under the EUPL, Version 1.1 or - as soon they will be approved by
the European Commission - subsequent versions of the EUPL (the "Licence");
You may not use this work except in compliance with the Licence. You may
obtain a copy of the Licence at:

http://www.osor.eu/eupl

Unless required by applicable law or agreed to in writing, software
distributed under the Licence is distributed on an "AS IS" basis, WITHOUT
WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
Licence for the specific language governing permissions and limitations
under the Licence.
*/
YUI.add('libbit-grid-select', function(Y) {

var Selectable;

/**
 * Y.Libbit.Grid widget extension to support selection of grid items
 */
Selectable = function () {};

Selectable.ATTRS = {
    /**
     * Config property, enable selection for this Grid instance
     */
    selectable: {
        value: false
    },

    /**
     * The item currently selected.
     */
    selectedItem : {
        value: null
    }
};

Selectable.prototype = {

    /**
     * Initializer, gets called upon instance initiation.
     */
    initializer: function () {
        this._setSelectable();
    },

    /**
     * Setter.
     */
    _setSelectable: function () {
        var selectable = this.get('selectable');

        if (selectable) {
            this._bind();
        }
    },

    /**
     * Bind the click events and set up a listener for the selectedItem attribute.
     */
    _bind: function () {
        var contentBox = this.get('contentBox');

        contentBox.delegate('click', this._handleClick, '.template-grid-icon-container', this);
        this.after('selectedItemChange', this._afterSelectedItemChange, this);
    },

    /**
     * Handles the item click event, and updates the selectedItem attribute,
     * which fires an event on change.
     */
    _handleClick: function (e) {
        this.set('selectedItem', e.currentTarget);
    },

    /**
     * The selection changed, update the DOM and fire an event containing
     * the model that was selected.
     */
    _afterSelectedItemChange: function (e) {
        var contentBox = this.get('contentBox'),
            node       = e.newVal,
            oldNode    = e.prevVal,
            model;

        // Cancel if the selection did not change.
        if (node === oldNode) {
            return false;
        }

        // Remove earlier selections.
        contentBox.all('.template_list_item_selected').removeClass('template_list_item_selected');

        // Apply the CSS to the new selection and fire an event.
        if (Y.Lang.isNull(node) === false) {
            node.addClass('template_list_item_selected');

            model = this._getModelFromGridItem(node);

            // Fires the select event and passes along the needed information.
            this.fire('select', { model: model });
        }
    },

    /**
     * Parse an HTML node and retrieve the corresponding model from the model list.
     */
    _getModelFromGridItem: function (node) {
        // The model's ClientID is stored within an HTML5 data attribute ('data-yui3-record'),
        // for example 'image_1'.
        var id        = node.ancestor('.template-grid-container').getAttribute('data-yui3-record'),
            modelList = this.get('data');

        return modelList.getByClientId(id);
    }
};

// -- Namespace ----------------------------------------------------------------
Y.namespace('Libbit.Grid').Selectable = Selectable;

}, '3.6.0' , {requires:['libbit-grid']});
