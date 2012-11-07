YUI.add('libbit-view-nav', function (Y, NAME) {

var Nav;

/**
 * Y.View extension to wrap the container into a panel with a header and footer navigation bar
 */
Nav = Y.Base.create('nav', Y.View, [], {
    /**
     * Initializer, gets called upon instance initiation.
     */
    initializer: function () {
        Y.Do.after(this._afterRender, this, 'render', this);
    },

    /**
     * Wrap the view into a panel after it's rendered.
     */
    _afterRender: function () {
        var container = this.get('container'),
            header    = this.get('header'),
            body      = Y.Node.create('<div></div>'),
            footer    = this.get('footer'),
            panel;

        // Transfer the child nodes from the view container to the new body container.
        container.get('children').each(function (c) {
            body.append(c);
        });

        panel = new Y.Libbit.NavContainer({
            headerContent: header,
            bodyContent  : body,
            footerContent: footer
        });

        // Render the panel within the view container.
        panel.render(container);
    }

}, {
    /**
     * New attributes that will be accessible within the Y.View instance.
     */
    ATTRS: {
        /**
         * Header attribute, sets the panel's header content.
         */
        header : {
            value: Y.Node.create('<div></div>')
        },

        /**
         * Header attribute, sets the panel's footer content (usually a set of buttons.
         */
        footer : {
            value: Y.Node.create('<div></div>')
        }
    }
});

// -- Namespace ----------------------------------------------------------------
Y.namespace('Libbit.View').Nav = Nav;



}, '1.0.0', {"requires": ["event-custom", "libbit-nav-container", "view"]});
