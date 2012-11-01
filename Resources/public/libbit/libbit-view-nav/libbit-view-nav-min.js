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
YUI.add('libbit-view-nav', function(Y) {

var Nav;

/**
 * Y.Libbit.Grid widget extension to support selection of grid items
 */
Nav = function () {};

Nav.ATTRS = {
    header : {
        value: Y.Node.create('<div></div>')
    },

    footer : {
        value: Y.Node.create('<div></div>')
    }
};

Nav.prototype = {
    /**
     * Initializer, gets called upon instance initiation.
     */
    initializer: function (config) {
        Y.Do.after(this._afterRender, this, 'render', this);
    },

    _afterRender: function () {
        var container = this.get('container'),
            header    = this.get('header'),
            body      = Y.Node.create('<div></div>'),
            footer    = this.get('footer'),
            overlay;

        // Transfer the child nodes to the body container
        container.get('children').each(function (c) {
            body.append(c);
        });

        overlay = new Y.Libbit.NavContainer({
            headerContent: header,
            bodyContent  : body,
            footerContent: footer
        });

        overlay.render(container);

    }
};

// -- Namespace ----------------------------------------------------------------
Y.namespace('Libbit.View').Nav = Nav;

}, '3.6.0' , {requires:['libbit-nav-container', 'view', 'event-custom']});
