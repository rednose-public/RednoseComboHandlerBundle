var TreeView;

// TODO: Bind model events
// TODO: Table support, style odd/even
// TODO: Fix overflow CSS for Firefox
// TODO: Implement sorting
// TODO: Document data input
// TODO: Add scrollable
// TODO: Disable text selection within treenodes
TreeView = Y.Base.create('treeView', Y.Widget, [ Y.Libbit.TreeView.Anim, Y.Libbit.TreeView.Selectable ], {

    renderUI: function () {
        var self       = this,
            contentBox = this.get('contentBox'),
            data       = this.get('data'),
            src        = this.get('srcNode'),
            width      = this.get('width'),
            height     = this.get('height'),
            container  = Y.Node.create('<div class="libbit-treeview-content"></div>'),
            sID        = Y.stamp(container),
            nodes;

        contentBox.setStyle('width', width);
        contentBox.setStyle('height', height);

        container.set('id', sID);
        src.append(container);

        tree = new YAHOO.widget.TreeView(container.get('id'), data);
        tree.render();

        this.set('tree', tree);

        // XXX: Hide the tree while postprocessing?
        this._attachData();
        this._enhanceCells();
    },

    bindUI: function () {
        var self        = this,
            tree        = this.get('tree'),
            boundingBox = this.get('boundingBox'),
            dd,
            nodes;

        // Forward tree events so extensions and plugins can subscribe to them.
        tree.subscribe('collapseComplete', function (node) {
            var el = self._getTableElement(node).one('.ygtvtp, .ygtvtph, .ygtvlp, .ygtvtlh');

            // Update the icon.
            self._setCollapsedIcon(el);

            self.fire('collapseComplete', { node: node });
        });

        tree.subscribe('expandComplete', function (node) {
            var el = self._getTableElement(node).one('.ygtvtm, .ygtvtmh, .ygtvlm, .ygtvlmh');

            // Update the icon.
            self._setExpandedIcon(el);

            self.fire('expandComplete', { node: node });
        });

        // Disable the default expand/collapse behaviour, only allow
        // expanding and collapsing when clicking the icon.
        tree.subscribe('expand',   function (node) { return self.get('iconClicked'); });
        tree.subscribe('collapse', function (node) { return self.get('iconClicked'); });

        tree.expandAll();

        nodes = tree.getNodesBy(function () { return true; });

        Y.each(nodes, function (node, index) {
            var table = self._getTableElement(node);

            // Rebind the click event.
            table.on('click', function (e) {
                var el = e.target.get('parentNode').get('parentNode');

                // Check if an expand/collapse icon was clicked.
                if (el.hasClass('ygtvtp') ||
                        el.hasClass('ygtvtph') ||
                        el.hasClass('ygtvlp') ||
                        el.hasClass('ygtvlph')) {

                    self.set('iconClicked', true);
                    node.expand();
                    self.set('iconClicked', false);

                } else if (el.hasClass('ygtvtm') ||
                        el.hasClass('ygtvtmh') ||
                        el.hasClass('ygtvlm') ||
                        el.hasClass('ygtvlmh')) {

                    self.set('iconClicked', true);
                    node.collapse();
                    self.set('iconClicked', false);
                }
            });

            /*var tableWidth = 200;

            // TODO: Modify nodes before entering the DOM
            mainTable.setStyle('width', tableWidth + 'px');
            node = Y.one('#' + value.labelElId).ancestor('tr');

            var wrapper = Y.Node.create('<td><table><tbody><tr></tr></tbody></table></td>');

            var width = 150;
            wrapper.setStyle('width', width + 'px');

            width = width + 22;
            node.get('children').each(function (c) {
                width = width - 22;
                wrapper.one('tr').append(c);
            });

            var contentEl = wrapper.one('.ygtvcontent');
            contentEl.setStyle('max-width', width + 'px');
            contentEl.setStyle('overflow', 'hidden');
            contentEl.setStyle('text-overflow', 'ellipsis');


            node.append(wrapper);
            node.append(Y.Node.create('<td style="width: 50px;">Test!</td>'));*/

            /*var fieldGroup = null,
                target,
                node;

            // Bind the DD to the parent table, for a wider drop range.
            node = Y.one('#' + value.labelElId).ancestor('table');

            // TODO: Query modellist to get fieldGroup model objects
            if (Y.Lang.isString(value.data)) {
                var obj = Y.JSON.parse(value.data);

                if (obj.type === 'FieldGroup') {
                    // This is a category object (category type is FieldGroup)
                    self._createDD(node, obj);
                    // Categories allow dropping
                    node.setData({ model: obj});
                    new Y.DD.Drop({
                        node         : node,
                        groups       : ['one'],
                        bubbleTargets: self
                    });
                } else {
                    // This is a fieldGroup.
                    fieldGroup = new Y.TB.FieldGroup(obj);
                    self._createDD(node, fieldGroup);
                }
            }*/
        });

        tree.collapseAll();
    },

    /**
     * Store a reference to the model for each tree node.
     */
    _attachData: function () {
        var self = this,
            tree = this.get('tree');

        tree.expandAll();

        nodes = tree.getNodesBy(function () { return true; });

        Y.each(nodes, function (node) {
            var table = self._getTableElement(node);
                model = node.data;

            if (Y.instanceOf(model, Y.Model)) {
                table.setAttribute('data-yui3-record', model.get('clientId'));
                table.setData({ model: model });
            }
        });

        tree.collapseAll();
    },

    /**
     * Add the tooltips and render the icons in the treeview.
     */
    _enhanceCells: function () {
        var self        = this,
            boundingBox = this.get('boundingBox');

        boundingBox.all('.ygtvlabel').each(function (node) {
            var model         = self._getModelFromLabelNode(node),
                content       = node.getContent(),
                collapsedNode = node.ancestor('tr').one('.ygtvtp, .ygtvtph, .ygtvlp, .ygtvtlh'),
                expandedNode  = node.ancestor('tr').one('.ygtvtm, .ygtvtmh, .ygtvlm, .ygtvlmh'),
                contentNode,
                icon;

            // TODO: Retrieve icon from model mapping, allowHTML and formatter config like Y.DataTable.
            if (Y.instanceOf(model, Y.TB.Category)) {
                icon = 'icon-folder-close';
            } else if (Y.instanceOf(model, Y.TB.FieldGroup)) {
                icon = 'icon-align-left';
            }

            if (icon) {
                contentNode = Y.Node.create('<span class="label-container"><i class="' + icon + '"></i><span> ' + content + '</span></div>');
                node.setContent(contentNode);
            }

            node.ancestor('.ygtvtable').set('title', content);

            // Set the expand/colllapse items if necessary.
            if (collapsedNode) {
                self._setCollapsedIcon(collapsedNode);
            }

            if (expandedNode) {
                self._setExpandedIcon(expandedNode);
            }
        });
    },

    /**
     * Retrieves the model corresponding to a label DOM node.
     */
    _getModelFromLabelNode: function (node) {
        return node.ancestor('table').getData().model;
    },

    /**
     * Retrieve the DOM element containing the main table of a given TreeView node.
     */
    _getTableElement: function (node) {
        var boundingBox = this.get('boundingBox'),
            id          = node.labelElId;

        return boundingBox.one('#' + id).ancestor('table');
    },

    /**
     * Add an icon node or update an existing one.
     */
    _setCollapsedIcon: function (el) {
        var a = el.one('a');

        if (a.one('i')) {
            a.one('i').removeClass('icon-chevron-down');
            a.one('i').addClass('icon-chevron-right');
        } else {
            a.setContent(Y.Node.create('<i class="icon-toggle icon-chevron-right"></i>'));
        }
    },

    /**
     * Add an icon node or update an existing one.
     */
    _setExpandedIcon: function (el) {
        var a = el.one('a');

        if (a.one('i')) {
            a.one('i').removeClass('icon-chevron-right');
            a.one('i').addClass('icon-chevron-down');
        } else {
            a.setContent(Y.Node.create('<i class="icon-toggle icon-chevron-down"></i>'));
        }
    }

}, {
    ATTRS: {
        // The data object containing the models.
        data : {
            value: null
        },
        // The original tree object.
        tree : {
            value: null
        },
        width : {
            value: null
        },
        height : {
            value: null
        },
        // State attribute.
        iconClicked : {
            value: false
        }
    }
});

// -- Namespace ----------------------------------------------------------------
Y.namespace('Libbit').TreeView = TreeView;