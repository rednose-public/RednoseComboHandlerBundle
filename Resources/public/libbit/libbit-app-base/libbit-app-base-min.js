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

var mapp = {};
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
     * Dismisses the currently active modal view and returns to it's parent view.
     */
    dismissModalView: function () {
        var view     = this.get('activeView'),
            viewInfo = this.getViewInfo(view);

        if (!viewInfo.parent || !viewInfo.modal) {
            return;
        }

        // Set the active view to this view's parent, and trigger an activeViewChange.
        this._set('activeView', this.createView(viewInfo.parent));
    },

    _afterActiveViewChange: function (e) {
        var newView  = e.newVal,
            oldView = e.prevVal;

        if (this.getViewInfo(newView).modal && !oldView) {
                // if new is child, render panel
                var panel = new Y.Libbit.Panel({
                    srcNode      : newView.get('container'),
                    centered     : true,
                    modal        : true,
                    render       : true,
                    width        : 1024,
                    height       : 576,
                    // TODO: Implementing stacking correctly
                    zIndex       : Y.all('*').size()
                });
                mapp[this.getViewInfo(newView).type] = panel;
        } else if (this.getViewInfo(newView).modal && !this.getViewInfo(oldView).modal) {
                // if new is child, render panel
                var panel = new Y.Libbit.Panel({
                    srcNode      : newView.get('container'),
                    centered     : true,
                    modal        : true,
                    render       : true,
                    width        : 1024,
                    height       : 576,
                    // TODO: Implementing stacking correctly
                    zIndex       : Y.all('*').size()
                });
                mapp[this.getViewInfo(newView).type] = panel;
        } else if (!this.getViewInfo(newView).modal && this.getViewInfo(oldView).modal) {
                mapp[this.getViewInfo(oldView).type].destroy();
                oldView.destroy({remove: true});

        } else if (this.getViewInfo(newView).modal && this.getViewInfo(oldView).modal) {
            if (this._isChildView(newView, oldView)) {
                // if new is child, render panel
                var panel = new Y.Libbit.Panel({
                    srcNode      : newView.get('container'),
                    centered     : true,
                    modal        : true,
                    render       : true,
                    width        : 1024,
                    height       : 576,
                    // TODO: Implementing stacking correctly
                    zIndex       : Y.all('*').size()
                });
                mapp[this.getViewInfo(newView).type] = panel;
            } else {
            // else destroy child (old)
                mapp[this.getViewInfo(oldView).type].destroy();
                oldView.destroy({remove: true});
            }
        } else {
            this._uiSetActiveView(newView, oldView, e.options);
        }
    }
});

// -- Namespace ----------------------------------------------------------------
Y.namespace('Libbit').App = App;

}, '3.6.0' ,{requires:['app-base', 'libbit-panel']});
