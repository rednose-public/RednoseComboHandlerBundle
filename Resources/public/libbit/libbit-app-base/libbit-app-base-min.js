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
YUI.add('libbit-app-base', function(Y) {

var App;

/**
Extension of the original Y.App, to provide support for modal views.
**/
App = Y.Base.create('libbit-app', Y.App, [], {

    /**
     * Override the superclass method to check if this view needs to be lazyloaded first.
     */
    showView: function (view, config, options, callback) {
        var self     = this,
            args     = arguments,
            viewInfo = this.getViewInfo(view);

        if (viewInfo.lazyload) {
            // Attach to the global Y object, this needs to be set (var Y = YUI();).
            Y.use(viewInfo.lazyload, function () {
                App.superclass.showView.apply(self, args);
            });
        } else {
            App.superclass.showView.apply(self, args);
        }
    },

    /**
     * Dismisses the currently active modal view and returns to it's parent view,
     * assuming the parent view has the property 'preserved' set to 'true'
     */
    dismissModalView: function () {
        var view     = this.get('activeView'),
            viewInfo = this.getViewInfo(view);

        if (!viewInfo.parent || !viewInfo.modal) {
            return;
        }

        this.showView(viewInfo.parent, {}, {
            update: false,
            render: false
        });
    },

    _attachView: function (view, prepend) {
        if (!view) {
            return;
        }

        var viewInfo      = this.getViewInfo(view),
            viewContainer = this.get('viewContainer');

        view.addTarget(this);
        viewInfo && (viewInfo.instance = view);

        // TODO: Attach events here for persevered Views?
        // See related TODO in `_detachView`.

        // TODO: Actually render the view here so that it gets "attached" before
        // it gets rendered?

        // TODO: Implement preserve for modal views.
        if (viewInfo.modal) {
            // TODO: Custom extension package
            view.set('_panelNode', new Y.Libbit.Panel({
                srcNode      : view.get('container'),
                centered     : true,
                modal        : true,
                render       : true,
                width        : 1024,
                height       : 576,
                // TODO: Implementing stacking correctly
                zIndex       : Y.all('*').size()
            }));
        } else {
            // Insert view into the DOM.
            viewContainer[prepend ? 'prepend' : 'append'](view.get('container'));
        }
    },

    _detachView: function (view) {
        if (!view) {
            return;
        }

        var viewInfo = this.getViewInfo(view) || {};

        // Don't detach this view if the new view is modal.
        if (this.getViewInfo(this.get('activeView')).modal && viewInfo.preserve) {
            return;
        }

        // Destroy this view's panel if this view is modal.
        if (viewInfo.modal) {
            view.get('_panelNode').destroy();
        }

        if (viewInfo.preserve) {
            view.remove();
            // TODO: Detach events here for preserved Views? It is possible that
            // some event subscriptions are made on elements other than the
            // View's `container`.
        } else {
            view.destroy({remove: true});

            // TODO: The following should probably happen automagically from
            // `destroy()` being called! Possibly `removeTarget()` as well.

            // Remove from view to view-info map.
            delete this._viewInfoMap[Y.stamp(view, true)];

            // Remove from view-info instance property.
            if (view === viewInfo.instance) {
                delete viewInfo.instance;
            }
        }

        view.removeTarget(this);
    },

    _afterActiveViewChange: function (e) {
        var newView  = e.newVal,
            prevView = e.prevVal;

        // TODO: Add modal transition
        if (this.getViewInfo(newView).modal) {
            e.options.transition = false;
        }

        if (prevView) {
            if (this.getViewInfo(prevView).modal) {
                e.options.transition = false;
            }
        }

        this._uiSetActiveView(newView, prevView, e.options);
    }
});

// -- Namespace ----------------------------------------------------------------
Y.namespace('Libbit').App = App;

}, '3.6.0' ,{requires:['app-base', 'libbit-panel']});
