YUI.add('libbit-datatable', function (Y, NAME) {

var DataTable;

DataTable = Y.Base.create('dataTable', Y.DataTable.Base, [ Y.DataTable.Scrollable, Y.DataTable.Sortable ]);

// -- Namespace ----------------------------------------------------------------
Y.namespace('Libbit').DataTable = DataTable;


}, '@VERSION@', {"requires": ["datatable-base", "datatable-scroll", "datatable-sort"], "skinnable": true});
