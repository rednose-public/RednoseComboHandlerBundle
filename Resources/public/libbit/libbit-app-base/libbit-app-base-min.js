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
Provides support for modal views.
**/
App = Y.Base.create('libbit-app', Y.App, [], {

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
                height       : 576
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
        // TODO: Add modal transition
        if (this.getViewInfo(e.newVal).modal) {
            e.options.transition = false;
        }
        
        if (e.prevVal) {
            if (this.getViewInfo(e.prevVal).modal) {
                e.options.transition = false;
            }
        }

        this._uiSetActiveView(e.newVal, e.prevVal, e.options);
    }
});

// -- Namespace ----------------------------------------------------------------
Y.namespace('Libbit').App = App;

}, '3.6.0' ,{requires:['app-base', 'libbit-panel']});
