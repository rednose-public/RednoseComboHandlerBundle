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
YUI.add('libbit-datatable-select', function(Y) {

/**
 * Create a selection plugin for the LiBBiT DataTable widget.
 */
function DataTableSelectPlugin(config) {
    DataTableSelectPlugin.superclass.constructor.apply(this, arguments);
}

/**
 * The identity of the plugin.
 */
DataTableSelectPlugin.NAME = 'dataTableSelectPlugin';

/**
 * The namespace for the plugin.
 */
DataTableSelectPlugin.NS = 'selectable';

/**
 * Static property used to define the default attribute configuration of the
 * plugin.
 */
DataTableSelectPlugin.ATTRS = {

    /**
     * The row currently selected.
     */
    selectedRow : {
        value: null
    }
};

Y.extend(DataTableSelectPlugin, Y.Plugin.Base, {

    /**
     * Bind the click events and set up a listener for the selectedRow attribute.
     */
    initializer: function (config) {
        var table = this.get('host');

        // Handle the click event
        table.get('contentBox').delegate('click', this._handleClick, '.yui3-datatable-data tr', this);
        this.after('selectedRowChange', this._afterSelectedRowChange, this);
    },

    /**
     * Handles the row click event, and updates the selectedRow attribute,
     * which fires an event on change.
     */
    _handleClick: function (e) {
        this.set('selectedRow', e.currentTarget);
    },

    /**
     * The selection changed, update the DOM and fire an event containing
     * the model that was selected.
     */
    _afterSelectedRowChange: function (e) {
        // TODO: Keep selection after sorting
        var table = this.get('host'),
            node    = e.newVal,
            oldNode = e.prevVal,
            model,
            id;

        // Cancel if the selection did not change.
        if (node === oldNode) {
            return false;
        }

        // Remove all selection CSS on the previous selection
        if (oldNode) {
            oldNode.all('td').removeClass('datatable-selected');
            if (oldNode.one('i') && oldNode.one('i').hasClass('icon-white')) {
                // Inverse the icon color if there is one.
                oldNode.one('i').removeClass('icon-white');
            }
        }

        // Apply the CSS to the new selection and fire an event.
        if (Y.Lang.isNull(node) === false) {
            // After unhighlighting, now highlight the current row.
            node.all('td').addClass('datatable-selected');

            // Inverse the icon color if there is one.
            node.one('i').addClass('icon-white');

            model = this._getModelFromTableRow(node);

            // Fires the select event from the host passes along the needed information.
            table.fire('select', { model: model });
        }

        return true;
    },

    /**
     * Parse an HTML <tr/> node and retrieve the corresponding model from the model list.
     */
    _getModelFromTableRow: function (node) {
        // The model's ClientID is stored within an HTML5 data attribute ('data-yui3-record'),
        // for example 'image_1'.
        var id        = node.getAttribute('data-yui3-record'),
            modelList = this.get('host').data;

        return modelList.getByClientId(id);
    }
});

// -- Namespace ----------------------------------------------------------------
Y.namespace('Libbit').DataTableSelectPlugin = DataTableSelectPlugin;

}, '3.6.0' , {requires:['libbit-datatable', 'plugin']});
