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
_yuitest_coverage["build/libbit-app-base/libbit-app-base.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/libbit-app-base/libbit-app-base.js",
    code: []
};
_yuitest_coverage["build/libbit-app-base/libbit-app-base.js"].code=["YUI.add('libbit-app-base', function (Y, NAME) {","","var App;","","/**","Extension of the original Y.App, to provide support for modal views.","**/","App = Y.Base.create('libbit-app', Y.App, [], {","","    /**","     * Stores the Panel instances to manage the active modal views.","     */","    _modalViewInfoMap: {},","","    /**","     * Override the superclass method to check if this view needs to be lazyloaded first.","     */","    showView: function (view, config, options, callback) {","        var self     = this,","            args     = arguments,","            viewInfo = this.getViewInfo(view);","","        if (viewInfo.lazyload) {","            // Attach to the global Y object, this needs to be set (var Y = YUI();).","            Y.use(viewInfo.lazyload, function () {","                App.superclass.showView.apply(self, args);","            });","        } else {","            App.superclass.showView.apply(self, args);","        }","    },","","    /**","     * Dismisses the currently active modal view and returns to it's parent view.","     */","    dismissModalView: function () {","        /*var view     = this.get('activeView'),","            viewInfo = this.getViewInfo(view);","","        if (!viewInfo.parent || !viewInfo.modal) {","            return;","        }","","        // Set the active view to this view's parent, and trigger an activeViewChange.","        this._set('activeView', this.createView(viewInfo.parent));*/","    },","","    /**","     * Hook into the view change, to handle modal views.","     */","    _afterActiveViewChange: function (e) {","        var newView      = e.newVal,","            oldView      = e.prevVal,","            // If oldView doesn't exist, always consider it to be a child","            isChild      = oldView ? this._isChildView(newView, oldView) : true,","            newViewModal = this.getViewInfo(newView).modal,","            oldViewModal = false;","","","        var options = e.options;","            options || (options = {});","","            // If there's no oldView, modal should be false","            if (oldView) {","                oldViewModal = this.getViewInfo(oldView).modal;","            }","","            // The new view is modal, and it's a child view, render a new panel","            if (newViewModal && isChild) {","            var callback = options.callback,","                isChild  = this._isChildView(newView, oldView),","                isParent = !isChild && this._isParentView(newView, oldView),","                prepend  = !!options.prepend || isParent;","","                  if (newView === oldView) {","                        return callback && callback.call(this, newView);","                    }","","                var viewInfo = this.getViewInfo(newView);","                newView.addTarget(this);","                viewInfo && (viewInfo.instance = newView);","","                this._modalViewInfoMap[this.getViewInfo(newView).type] = new Y.Libbit.Panel({","                    srcNode      : newView.get('container'),","                    centered     : true,","                    modal        : true,","                    render       : true,","                    width        : 1024,","                    height       : 576,","                    zIndex       : Y.all('*').size(),","                    // Disable the default hide on ESC keypress, the panel needs to be dismissed by the App.","                    hideOn       : []","                });","","                //detach","                if (oldView) {","                    var viewInfo = this.getViewInfo(oldView) || {};","                    //oldView.remove();","","                    //oldView.destroy({remove: true});","","                    // Remove from view to view-info map.","                    delete this._viewInfoMap[Y.stamp(oldView, true)];","","                    // Remove from view-info instance property.","                    //if (oldView === viewInfo.instance) {","                    //    delete viewInfo.instance;","                    //}","","                    oldView.removeTarget(this);","                }","","            callback && callback.call(this, newView);","","        // The old view was modal, and the new one is not a child, means we're going back into","        // the hierarchy. Destroy the modal view.","        } else if (oldViewModal && !isChild) {","            var callback = options.callback,","                isChild  = this._isChildView(newView, oldView),","                isParent = !isChild && this._isParentView(newView, oldView),","                prepend  = !!options.prepend || isParent;","","            if (newView === oldView) {","                return callback && callback.call(this, newView);","            }","","            var viewInfo = this.getViewInfo(newView);","            newView.addTarget(this);","            viewInfo && (viewInfo.instance = newView);","","            //  detach","            var viewInfo = this.getViewInfo(oldView) || {};","","            this._modalViewInfoMap[this.getViewInfo(oldView).type].destroy();","            oldView.destroy({remove: true});","","            // Remove from view to view-info map.","            delete this._viewInfoMap[Y.stamp(oldView, true)];","","            // Remove from view-info instance property.","            if (oldView === viewInfo.instance) {","                delete viewInfo.instance;","            }","","            oldView.removeTarget(this);","            callback && callback.call(this, newView);","        } else {","            // No modal views involved, process as usual","            this._uiSetActiveView(newView, oldView, e.options);","        }","    }","});","","// -- Namespace ----------------------------------------------------------------","Y.namespace('Libbit').App = App;","","","}, '1.0.0', {\"requires\": [\"app-base\", \"handlebars-base\", \"libbit-panel\"]});"];
_yuitest_coverage["build/libbit-app-base/libbit-app-base.js"].lines = {"1":0,"3":0,"8":0,"19":0,"23":0,"25":0,"26":0,"29":0,"52":0,"60":0,"61":0,"64":0,"65":0,"69":0,"70":0,"75":0,"76":0,"79":0,"80":0,"81":0,"83":0,"96":0,"97":0,"103":0,"110":0,"113":0,"117":0,"118":0,"123":0,"124":0,"127":0,"128":0,"129":0,"132":0,"134":0,"135":0,"138":0,"141":0,"142":0,"145":0,"146":0,"149":0,"155":0};
_yuitest_coverage["build/libbit-app-base/libbit-app-base.js"].functions = {"(anonymous 2):25":0,"showView:18":0,"_afterActiveViewChange:51":0,"(anonymous 1):1":0};
_yuitest_coverage["build/libbit-app-base/libbit-app-base.js"].coveredLines = 43;
_yuitest_coverage["build/libbit-app-base/libbit-app-base.js"].coveredFunctions = 4;
_yuitest_coverline("build/libbit-app-base/libbit-app-base.js", 1);
YUI.add('libbit-app-base', function (Y, NAME) {

_yuitest_coverfunc("build/libbit-app-base/libbit-app-base.js", "(anonymous 1)", 1);
_yuitest_coverline("build/libbit-app-base/libbit-app-base.js", 3);
var App;

/**
Extension of the original Y.App, to provide support for modal views.
**/
_yuitest_coverline("build/libbit-app-base/libbit-app-base.js", 8);
App = Y.Base.create('libbit-app', Y.App, [], {

    /**
     * Stores the Panel instances to manage the active modal views.
     */
    _modalViewInfoMap: {},

    /**
     * Override the superclass method to check if this view needs to be lazyloaded first.
     */
    showView: function (view, config, options, callback) {
        _yuitest_coverfunc("build/libbit-app-base/libbit-app-base.js", "showView", 18);
_yuitest_coverline("build/libbit-app-base/libbit-app-base.js", 19);
var self     = this,
            args     = arguments,
            viewInfo = this.getViewInfo(view);

        _yuitest_coverline("build/libbit-app-base/libbit-app-base.js", 23);
if (viewInfo.lazyload) {
            // Attach to the global Y object, this needs to be set (var Y = YUI();).
            _yuitest_coverline("build/libbit-app-base/libbit-app-base.js", 25);
Y.use(viewInfo.lazyload, function () {
                _yuitest_coverfunc("build/libbit-app-base/libbit-app-base.js", "(anonymous 2)", 25);
_yuitest_coverline("build/libbit-app-base/libbit-app-base.js", 26);
App.superclass.showView.apply(self, args);
            });
        } else {
            _yuitest_coverline("build/libbit-app-base/libbit-app-base.js", 29);
App.superclass.showView.apply(self, args);
        }
    },

    /**
     * Dismisses the currently active modal view and returns to it's parent view.
     */
    dismissModalView: function () {
        /*var view     = this.get('activeView'),
            viewInfo = this.getViewInfo(view);

        if (!viewInfo.parent || !viewInfo.modal) {
            return;
        }

        // Set the active view to this view's parent, and trigger an activeViewChange.
        this._set('activeView', this.createView(viewInfo.parent));*/
    },

    /**
     * Hook into the view change, to handle modal views.
     */
    _afterActiveViewChange: function (e) {
        _yuitest_coverfunc("build/libbit-app-base/libbit-app-base.js", "_afterActiveViewChange", 51);
_yuitest_coverline("build/libbit-app-base/libbit-app-base.js", 52);
var newView      = e.newVal,
            oldView      = e.prevVal,
            // If oldView doesn't exist, always consider it to be a child
            isChild      = oldView ? this._isChildView(newView, oldView) : true,
            newViewModal = this.getViewInfo(newView).modal,
            oldViewModal = false;


        _yuitest_coverline("build/libbit-app-base/libbit-app-base.js", 60);
var options = e.options;
            _yuitest_coverline("build/libbit-app-base/libbit-app-base.js", 61);
options || (options = {});

            // If there's no oldView, modal should be false
            _yuitest_coverline("build/libbit-app-base/libbit-app-base.js", 64);
if (oldView) {
                _yuitest_coverline("build/libbit-app-base/libbit-app-base.js", 65);
oldViewModal = this.getViewInfo(oldView).modal;
            }

            // The new view is modal, and it's a child view, render a new panel
            _yuitest_coverline("build/libbit-app-base/libbit-app-base.js", 69);
if (newViewModal && isChild) {
            _yuitest_coverline("build/libbit-app-base/libbit-app-base.js", 70);
var callback = options.callback,
                isChild  = this._isChildView(newView, oldView),
                isParent = !isChild && this._isParentView(newView, oldView),
                prepend  = !!options.prepend || isParent;

                  _yuitest_coverline("build/libbit-app-base/libbit-app-base.js", 75);
if (newView === oldView) {
                        _yuitest_coverline("build/libbit-app-base/libbit-app-base.js", 76);
return callback && callback.call(this, newView);
                    }

                _yuitest_coverline("build/libbit-app-base/libbit-app-base.js", 79);
var viewInfo = this.getViewInfo(newView);
                _yuitest_coverline("build/libbit-app-base/libbit-app-base.js", 80);
newView.addTarget(this);
                _yuitest_coverline("build/libbit-app-base/libbit-app-base.js", 81);
viewInfo && (viewInfo.instance = newView);

                _yuitest_coverline("build/libbit-app-base/libbit-app-base.js", 83);
this._modalViewInfoMap[this.getViewInfo(newView).type] = new Y.Libbit.Panel({
                    srcNode      : newView.get('container'),
                    centered     : true,
                    modal        : true,
                    render       : true,
                    width        : 1024,
                    height       : 576,
                    zIndex       : Y.all('*').size(),
                    // Disable the default hide on ESC keypress, the panel needs to be dismissed by the App.
                    hideOn       : []
                });

                //detach
                _yuitest_coverline("build/libbit-app-base/libbit-app-base.js", 96);
if (oldView) {
                    _yuitest_coverline("build/libbit-app-base/libbit-app-base.js", 97);
var viewInfo = this.getViewInfo(oldView) || {};
                    //oldView.remove();

                    //oldView.destroy({remove: true});

                    // Remove from view to view-info map.
                    _yuitest_coverline("build/libbit-app-base/libbit-app-base.js", 103);
delete this._viewInfoMap[Y.stamp(oldView, true)];

                    // Remove from view-info instance property.
                    //if (oldView === viewInfo.instance) {
                    //    delete viewInfo.instance;
                    //}

                    _yuitest_coverline("build/libbit-app-base/libbit-app-base.js", 110);
oldView.removeTarget(this);
                }

            _yuitest_coverline("build/libbit-app-base/libbit-app-base.js", 113);
callback && callback.call(this, newView);

        // The old view was modal, and the new one is not a child, means we're going back into
        // the hierarchy. Destroy the modal view.
        } else {_yuitest_coverline("build/libbit-app-base/libbit-app-base.js", 117);
if (oldViewModal && !isChild) {
            _yuitest_coverline("build/libbit-app-base/libbit-app-base.js", 118);
var callback = options.callback,
                isChild  = this._isChildView(newView, oldView),
                isParent = !isChild && this._isParentView(newView, oldView),
                prepend  = !!options.prepend || isParent;

            _yuitest_coverline("build/libbit-app-base/libbit-app-base.js", 123);
if (newView === oldView) {
                _yuitest_coverline("build/libbit-app-base/libbit-app-base.js", 124);
return callback && callback.call(this, newView);
            }

            _yuitest_coverline("build/libbit-app-base/libbit-app-base.js", 127);
var viewInfo = this.getViewInfo(newView);
            _yuitest_coverline("build/libbit-app-base/libbit-app-base.js", 128);
newView.addTarget(this);
            _yuitest_coverline("build/libbit-app-base/libbit-app-base.js", 129);
viewInfo && (viewInfo.instance = newView);

            //  detach
            _yuitest_coverline("build/libbit-app-base/libbit-app-base.js", 132);
var viewInfo = this.getViewInfo(oldView) || {};

            _yuitest_coverline("build/libbit-app-base/libbit-app-base.js", 134);
this._modalViewInfoMap[this.getViewInfo(oldView).type].destroy();
            _yuitest_coverline("build/libbit-app-base/libbit-app-base.js", 135);
oldView.destroy({remove: true});

            // Remove from view to view-info map.
            _yuitest_coverline("build/libbit-app-base/libbit-app-base.js", 138);
delete this._viewInfoMap[Y.stamp(oldView, true)];

            // Remove from view-info instance property.
            _yuitest_coverline("build/libbit-app-base/libbit-app-base.js", 141);
if (oldView === viewInfo.instance) {
                _yuitest_coverline("build/libbit-app-base/libbit-app-base.js", 142);
delete viewInfo.instance;
            }

            _yuitest_coverline("build/libbit-app-base/libbit-app-base.js", 145);
oldView.removeTarget(this);
            _yuitest_coverline("build/libbit-app-base/libbit-app-base.js", 146);
callback && callback.call(this, newView);
        } else {
            // No modal views involved, process as usual
            _yuitest_coverline("build/libbit-app-base/libbit-app-base.js", 149);
this._uiSetActiveView(newView, oldView, e.options);
        }}
    }
});

// -- Namespace ----------------------------------------------------------------
_yuitest_coverline("build/libbit-app-base/libbit-app-base.js", 155);
Y.namespace('Libbit').App = App;


}, '1.0.0', {"requires": ["app-base", "handlebars-base", "libbit-panel"]});
