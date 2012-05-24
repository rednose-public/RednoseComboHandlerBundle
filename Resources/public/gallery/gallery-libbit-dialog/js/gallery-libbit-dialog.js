YUI.add('gallery-libbit-dialog', function(Y) {

    Y.LibbitDialog = {
        
        callback: null,
        callbackCancel: null,
        wHandleCollection: [],
        
        Message: function(message, warningMode, callback, headerTitle) {
            if (typeof warningMode == 'undefined') { warningMode = false; }
            if (typeof callback == 'undefined') { callback = function() {} }
            
            this.callback = callback;
            
            if (headerTitle == null) {
                headerTitle = 'Message';
            }
            
            this.Panel('message', message, headerTitle);
            
            if (warningMode == true) {
                this.Panel.MessageNode
                    .get('parentNode').one('div.dialog_message_icon')
                    .removeClass('dialog_message_icon')
                    .addClass('dialog_warning_icon');
            }
        },
        
        Prompt: function(title, fieldName, initialValue, callback, callbackCancel, headerTitle)
        {
            if (typeof callback == 'undefined') { callback = function() {} }
            if (typeof callbackCancel == 'undefined') { callbackCancel = function() { } }
            
            this.callback = callback;
            this.callbackCancel = callbackCancel;
            
            if (headerTitle == null) {
                headerTitle = 'Question';
            }
            
            this.Panel('prompt', '...', headerTitle);
            
            this.Panel.MessageNode.set(
                'innerHTML',
                '<fieldset>' +
                ' <legend>' + title +  '</legend>' +
                ' <label>' + fieldName +  ':</label><br />' +
                ' <input type="text" value="' + initialValue + '" />' +
                '</fieldset>'
            );
            this.Panel.MessageNode.one('input').focus().select();
            this.Panel.MessageNode.one('input').on('keyup', function(e) {
                if (e.button == 13) {
                        Y.LibbitDialog.Panel.panelObject.hide();
                        Y.LibbitDialog.callback(
                            Y.LibbitDialog.Panel.MessageNode.one('input').get('value')
                        );
                    }
            });
        },
        
        ErrorMessage: function(errJSON, callback)
        {
            var errHTML = '';
            var err = Y.JSON.parse(errJSON);

            if (typeof callback == 'undefined') { callback = function() {} }

            this.callback = callback;
            
            errHTML =
                '<div class="dialog_error">' + err.message + '</div>' +
                '<div class="dialog_path">Source: ' + err.path + '</div>'
            
            this.Panel('error', errHTML, 'Error');
        },
        
        Confirm: function(message, callback, callbackCancel, headerTitle)
        {
            if (typeof callback == 'undefined') { callback = function() {} }
            if (typeof callbackCancel == 'undefined') { callbackCancel = function() { } }
            
            this.callback = callback;
            this.callbackCancel = callbackCancel;
            
            if (headerTitle == null) {
                headerTitle = 'Question'
            }
            
            this.Panel('confirm', message, headerTitle);
        },
        
        /**
         * Render a window.
         *
         * @param string windowHandle
         * @param string title (dialog title)
         * @param integer height
         * @param integer width
         * @param mixed content (innerHTML, node, or null)
         * @param string uri (remote uri to load utilizing the gallary-dispatcher)
         * @param object buttons ([{title: 'name', callback: function(panel, node), callbackClose: true} , {...}])
         */
        Window: function(windowHandle, title, height, width, content, uri, buttons)
        {
            var dialogNode = Y.Node.create('<div id="dialogWindow_' + windowHandle + '" class="dialogWindow" />');
            
            Y.one('body').appendChild(dialogNode);
            
            if (typeof(content) == 'string') {
                dialogNode.set('innerHTML', content);
            } else if (typeof(content) == 'object' && content !== null) {
                dialogNode.append(content);
            } else if (typeof(uri) == 'string') {
                var dialogDispatcher = Y.Node.create('<div>Loading...</div>');
                
                dialogNode.appendChild(dialogDispatcher);
                
                new Y.Dispatcher ({
                    node: dialogDispatcher,
                    ioConfig: {
                        method: 'GET',
                    }
                }).set('uri',  uri);
            }
            
            this.Window.panelObject = new Y.Panel({
                srcNode: dialogNode,
                headerContent: title,
                width: width, height: height,
                zIndex: parseInt(Y.all('*').size()),
                centered: true, modal: true, visible: false, render: true,
            });
            this.Window.panelObject.plug(Y.Plugin.Drag);
            
            this.wHandleCollection[windowHandle] = this.Window.panelObject;
            
            for (i in buttons) {
                var skipCallback = false;
                
                this.Window.panelObject.addButton({
                    value     : buttons[i].title,
                    section   : Y.WidgetStdMod.FOOTER,
                    classNames: ['dButton_' + i],
                    action    : function (e) {
                        var currentClass = e.currentTarget._node.getAttribute('class').split(' ');
                        
                        for (x in currentClass) {
                            if (currentClass[x].indexOf('dButton_') > -1) {
                                if (typeof(buttons[i].callbackClose) === 'boolean') {
                                    if (buttons[i].callbackClose === true) {
                                        Y.LibbitDialog.wHandleCollection[windowHandle].hide();
                                        
                                        skipCallback = true;
                                    }
                                }
                                
                                if (skipCallback === false) {
                                    buttons[parseInt(currentClass[x].replace('dButton_', ''))].callback(
                                        Y.LibbitDialog.wHandleCollection[windowHandle], dialogNode
                                    );
                                }
                            }
                        }
                    }
                });
            }
            
            if (dialogNode.all('.yui3-widget-ft').size() > 0) {
                dialogNode.one('.yui3-widget-ft')
                    .setStyle('position', 'absolute')
                    .setStyle('bottom', '2px')
                    .setStyle('width', (width - 20) + 'px');
            }

            this.Window.panelObject.show();
            this.Window.panelObject.on('visibleChange', function() {
                dialogNode.get('parentNode').remove();
                
                for (i in buttons) {
                    if (typeof(buttons[i].callbackClose) === 'boolean') {
                        if (buttons[i].callbackClose === true) {
                            buttons[i].callback(
                                Y.LibbitDialog.wHandleCollection[windowHandle], dialogNode
                            );
                        }
                    }
                }
            });
        },
        
        Panel: function(type, message, headerTitle)
        {
            var messageNode = Y.Node.create('<div class="dialogMessage" />');
            
            messageNode.appendChild(Y.Node.create('<div class="dialog_' + type + '_icon" />'));
            messageNode.appendChild(Y.Node.create('<div class="dialog_message">' + message + '</div>'));
            
            Y.one('body').appendChild(messageNode);

            this.Panel.panelObject = new Y.Panel({
                srcNode: messageNode,
                headerContent: headerTitle,
                zIndex: Y.all('*').size(),
                width: 490, centered: true, modal: true, visible: false, render: true,
            });
            this.Panel.panelObject.plug(Y.Plugin.Drag);
            this.Panel.MessageNode = messageNode.one('div.dialog_message');
            
            if (type == 'confirm' || type == 'prompt') {
                this.Panel.panelObject.addButton({
                    value  : 'Confirm',
                    section: Y.WidgetStdMod.FOOTER,
                    action : function (e) {
                        Y.LibbitDialog.Panel.panelObject.hide();
                        
                        if (type == 'prompt') {
                            Y.LibbitDialog.callback(
                                Y.LibbitDialog.Panel.MessageNode.one('input').get('value')
                            );
                        } else {
                            Y.LibbitDialog.callback();
                        }
                    }
                });
                
                this.Panel.panelObject.addButton({
                    value  : 'Cancel',
                    section: Y.WidgetStdMod.FOOTER,
                    action : function (e) {
                        Y.LibbitDialog.Panel.panelObject.hide();

                        Y.LibbitDialog.callbackCancel();
                    }
                });
            }
            
            this.Panel.panelObject.show();
            this.Panel.panelObject.on('visibleChange', function() {
                if ((type == 'error' || type == 'message' || type == 'warning') && typeof(this.callback) == 'function') {
                    this.callback();
                }
            });
        }
    }
}, '1.0', { requires: ['node', 'dd', 'dd-plugin', 'json-parse', 'panel', 'gallery-dispatcher'] });
