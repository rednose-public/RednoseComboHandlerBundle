YUI.add('libbit-treeview-dd', function (Y, NAME) {

var DD;

/**
 * Drag and drop extension for the TreeView.
 */
DD = Y.Base.create('dd', Y.Base, [], {

    /**
     * Subscribe to the render event and set up DD listeners.
     */
    initializer: function () {
        Y.Do.after(this._bindDD, this, 'bindUI', this);
        //Y.Do.after(this._bindDD, this, 'refresh', this);

        this.on('drag:start', this._handleStart, this);
        this.on('drop:hit', this._handleDrop, this);
        this.on('drop:over', this._handleOver, this);

        this.on('drop:enter', this._dropEnterGlobal, this);
    },

    /**
     * Bind all DD instance after the parent view has been rendered.
     */
    _bindDD: function () {
        var self      = this,
            tree      = this.get('tree'),
            nodes;

        tree.expandAll();

        // Setup DD.
        nodes = tree.getNodesBy(function () { return true; });

        Y.each(nodes, function (value) {
            var node,
                model;

            // Bind the DD to the parent table, for a wider drop range.
            node = Y.one('#' + value.labelElId).ancestor('table');

            // TODO: Query modellist to get fieldGroup model objects
            model = value.data;

            if (Y.instanceOf(model, Y.TB.Category)) {
                // This is a category model.
                self._createDD(node, model);
                // Categories allow dropping
                node.setData({ model: model});
                new Y.DD.Drop({
                    node         : node,
                    groups       : ['one'],
                    bubbleTargets: self
                });
            } else {
                // This is a fieldGroup.
                self._createDD(node, model);
            }

        });

        tree.collapseAll();
    },

    /**
     * Scroll the view up or down when a drag reaches the boundaries on the Y axis
     */
    _handleOver: function (e) {
        var dropNode = e.drop.get('node'),
            dragY = Y.DD.DDM.activeDrag.get('dragNode').getY(),
            nodeOffsetY = dropNode.get('offsetTop'),
            nodeHeight = dropNode.get('offsetHeight'),
            relativeY,
            node,
            anim;

        if (dropNode.hasClass('yui3-widget-bd')) {
            relativeY = dragY - nodeOffsetY - 20; /* Margin top */

            if (relativeY > nodeHeight) {
                // Scroll down
                node = Y.one('.libbit-tabview .yui3-widget-bd');
                anim = new Y.Anim({
                    node: node,
                    to: {
                        scroll: function(node) {
                            return [0, node.get('scrollTop') + node.get('offsetHeight')];
                        }
                    },
                    easing: Y.Easing.easeOut
                });

                anim.run();
            } else if (relativeY < 15) {
                // Scroll up
                node = Y.one('.libbit-tabview .yui3-widget-bd');
                anim = new Y.Anim({
                    node: node,
                    to: {
                        scroll: function(node) {
                            return [node.get('scrollTop') + node.get('offsetHeight'), 0];
                        }
                    },
                    easing: Y.Easing.easeOut
                });

                anim.run();
            }
        }
    },

    _createDD: function (node, data) {
        var self = this,
            dd;

        dd = new Y.DD.Drag({
            node   : node,
            data   : data,
            groups : ['one'],
            bubbleTargets: self
        }).plug(Y.Plugin.DDProxy, {
            moveOnEnd  : false,
            borderStyle: 'none'
        });

        return dd;
    },

    _handleStart: function (e) {
        var drag = e.target,
            fieldGroup,
            container,
            origin,
            dd;

        fieldGroup = drag.get('data');
        drag.get('dragNode').setContent(drag.get('node').one('.ygtvlabel').get('outerHTML'));

        origin = drag.get('node');

        drag.set('groups', ['one']);
        drag._prep();

        drag.detachAll('drag:start');

        container = Y.Node.create('<div></div>');
        drag.set('node', container);

        drag.set('target', true);
        drag._prep();

        dd = this._createDD(origin, fieldGroup);
    },

    _handleDrop: function (e) {
        // TODO: Allow dropping outside of a category.
        var model  = this.get('data'),
            obj    = e.drag.get('data'),
            newCat = e.drop.get('node').getData().model;

        if (newCat) {
            if (Y.instanceOf(obj, Y.TB.FieldGroup)) {
                obj.set('category', newCat);
            } else {
                obj.set('parent', newCat);
            }

            obj.save(function () {
                model.load();
            });
        }
    },

    // TODO
    _dropEnterGlobal: function () {
        if (Y.DD.DDM.activeDrag) {
            var drag = Y.DD.DDM.activeDrag,
                node = drag.get('dragNode'),
                fieldGroup,
                templateItem,
                n,
                anim;

            if (drag.get('data').name === 'templateItem') {
                templateItem = drag.get('data');

                fieldGroup = templateItem.get('fieldGroup');
                drag.set('data', fieldGroup);

                // Clone the node, position it on top of the original for secondary animation.
                n = node.cloneNode(true).set('id', null).setStyle('position', 'absolute');
                Y.one('body').appendChild(n);
                n.setXY(node.getXY());

                node.setStyle('opacity', 0);
                node.set('innerHTML',
                    '<div class="libbit-fieldgroup-drag"><i class="icon-align-left"></i><span> </span>' + fieldGroup.get('name') + '</div>'
                );

                anim = new Y.Anim({
                    node: n.one('.libbit-template-item-container'),
                    to: {
                        width: 0,
                        height: 0
                    },
                    duration: '.25',
                    easing: Y.Easing.easeOut
                });

                anim.on('end', function () {
                    n.remove();
                });

                anim.run();

                anim = new Y.Anim({
                    node: node,
                    to: { opacity: 1 },
                    duration: '.25',
                    easing: Y.Easing.easeOut
                });

                anim.run();
           }
        }
    }
});

// -- Namespace ----------------------------------------------------------------
Y.namespace('Libbit.TreeView').DD = DD;


}, '1.0.0', {"requires": ["dd", "event-custom"]});
