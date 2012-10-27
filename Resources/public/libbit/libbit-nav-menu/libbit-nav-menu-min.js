YUI.add('libbit-nav-menu', function (Y) {

    Y.LibbitNavMenu = {
        lastChild: null,
        timeout: null,
        id: 0,

        render: function(container) {
            var self = this;

            container.all('> ul > li').each(function() {
                self.top(this);
            });
        },

        top: function(liElement) {
            var self = this;

            self.id++;

            liElement.setAttribute('id', 'miId' + self.id);
            liElement.addClass('miTop');
            liElement.setStyle('float', 'left');

            liElement.all('> a').on('mouseover', function(item) {
                self.unsetTimeout();
                self.openChild(item.target.get('parentNode'), true);
            });

            liElement.all('> a').on('mouseout', function() {
                self.setTimeout();
            });

            liElement.all('> ul > li').each(function() {
                self.child(this, 0, this.id);
            });
        },

        child: function(liElement, level, id) {
            var self = this;

            self.id++;

            liElement.addClass('miChild');
            liElement.addClass('miLevel' + level);
            liElement.addClass('miId' + id);

            liElement.get('parentNode').addClass('menuChild');
            liElement.get('parentNode').setStyle('position', 'absolute');
            liElement.get('parentNode').setStyle('left', -9999).setStyle('top', -9999);

            liElement.all('> ul > li').each(function() {
                self.child(this, level + 1, self.id);
            });

            liElement.one('> a').on('mouseover', function(item) {
                self.unsetTimeout();
                self.openChild(this.get('parentNode'), false);
            });

            liElement.one('> a').on('mouseout', function() {
                self.setTimeout();
            });
        },

        openChild: function(sender, top) {
            var self = this;
            var visible = false;
            var senderPosition = sender.getXY();
            var child = sender.one('> ul');

            if (top) {
                Y.all('.menuChild').each(function() {
                    this.setStyle('left', -9999).setStyle('top', -9999);
                });
            } else {
                self.clearLevel(sender);
            }

            if (child != self.lastChild) { // Prevent flicker
                child.setStyle('opacity', '0');
            }
            child.setStyle('zIndex', Y.all('*').getDOMNodes().length);

            if (top) {
                child.setXY([
                    senderPosition[0], senderPosition[1] + parseInt(sender.getStyle('height'))
                ]);
            } else {
                child.setXY([
                    senderPosition[0] + parseInt(sender.getStyle('width')) + 1, senderPosition[1]
                ]);
            }

            self.lastChild = child;

            var anim = new Y.Anim({
                node: child,
                to: { opacity: 1 },
                duration: 0.3
            });
            anim.run();
            anim = null;
        },

        clearLevel: function(child) {
            var level = 0;
            var depth = 0;

            while (child.hasClass('miLevel' + level) == false) {
                if (level > 99) {
                    return false;
                }
                level++;
            }

            while (Y.one('.miLevel' + depth) !== null) {
                depth++;
            }

            for (var i = (level + 1); i < depth; i++) {
                console.log('a');
                Y.all('.miLevel' + i).each(function() {
                    this.get('parentNode').setStyle('left', -9999).setStyle('top', -9999);
                });
            }

            return true;
        },

        setTimeout: function() {
            this.timeout = setTimeout(function() {
                Y.all('.menuChild').each(function() {
                    this.setXY([-9999, -9999]);
                });
            }, 600);
        },

        unsetTimeout: function() {
            clearTimeout(this.timeout);
        }
    }
}, '1.0', { requires: [
        'node', 'anim'
    ]
});
