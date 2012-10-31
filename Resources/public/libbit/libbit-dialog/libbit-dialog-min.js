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
YUI.add('libbit-dialog', function (Y) {

var Dialog;

Dialog = {

    callback: null,
    callbackCancel: null,
    wHandleCollection: [],

    message: function (message, warningMode, callback, headerTitle) {
        if (typeof warningMode === 'undefined') { warningMode = false; }
        if (typeof callback === 'undefined') { callback = function () {}; }

        this.callback = callback;

        if (headerTitle === null) {
            headerTitle = 'Message';
        }

        this.panel('message', message, headerTitle);

        if (warningMode === true) {
            this.panel.MessageNode
                .get('parentNode').one('div.dialog_message_icon')
                .removeClass('dialog_message_icon')
                .addClass('dialog_warning_icon');
        }
    },

    prompt: function (title, fieldName, initialValue, callback, callbackCancel, headerTitle, buttonTitle) {
        if (typeof callback === 'undefined') { callback = function () {}; }
        if (typeof callbackCancel === 'undefined') { callbackCancel = function () {}; }

        this.callback = callback;
        this.callbackCancel = callbackCancel;

        if (headerTitle === null) {
            headerTitle = 'Question';
        }

        if (Y.Lang.isUndefined(buttonTitle)) {
            buttonTitle = 'Confirm';
        }

        this.panel('prompt', '...', headerTitle);

        this.panel.MessageNode.set('innerHTML',
            '<fieldset>' +
            ' <legend>' + title +  '</legend>' +
            ' <label>' + fieldName +  ':</label><br />' +
            ' <input type="text" value="' + initialValue + '" />' +
            '</fieldset>');

        this.panel.MessageNode.one('input').focus().select();
        this.panel.MessageNode.one('input').on('keyup', function (e) {
            if (e.button === 13) {
                Y.Libbit.Dialog.panel.panelObject.hide();
                Y.Libbit.Dialog.callback(
                    Y.Libbit.Dialog.panel.MessageNode.one('input').get('value')
                );
            }
        });
    },

    errorMessage: function (errJSON, callback) {
        var errHTML = '',
            err     = Y.JSON.parse(errJSON);

        if (typeof callback === 'undefined') { callback = function () {}; }

        this.callback = callback;

        errHTML =
            '<div class="dialog_error">' + err.message + '</div>' +
            '<div class="dialog_path">Source: ' + err.path + '</div>';

        this.panel('error', errHTML, 'Error');
    },

    confirm: function (message, callback, callbackCancel, headerTitle, buttonTitle, warningMode) {
        if (typeof warningMode === 'undefined') { warningMode = false; }
        if (typeof callback === 'undefined') { callback = function () {}; }
        if (typeof callbackCancel === 'undefined') { callbackCancel = function () {}; }

        this.callback = callback;
        this.callbackCancel = callbackCancel;

        if (headerTitle === null) {
            headerTitle = 'Question';
        }

        if (Y.Lang.isUndefined(buttonTitle)) {
            buttonTitle = 'Confirm';
        }

        this.panel('confirm', message, headerTitle, buttonTitle);

        if (warningMode === true) {
            this.panel.MessageNode
                .get('parentNode').one('div.dialog_confirm_icon')
                .removeClass('dialog_confirm_icon')
                .addClass('dialog_warning_icon');
        }
    },

    window: function (windowHandle, title, height, width, content, uri, buttons) {
        var container = Y.Node.create('<div class="libbit-dialog-window" />'),
            body      = Y.Node.create('<div class="yui3-widget-bd"></div>'),
            dialogDispatcher;

        container.append(body);

        if (typeof (content) === 'string') {
            body.setHTML(content);
        } else if (typeof (content) === 'object' && content !== null) {
            body.setContent(content);
        } else if (typeof (uri) === 'string') {
            dialogDispatcher = Y.Node.create('<div class="libbit-dialog-window-wrapper">Loading...</div>');

            body.appendChild(dialogDispatcher);

            new Y.Dispatcher({
                node: dialogDispatcher,
                ioConfig: {
                    method: 'GET'
                }
            }).set('uri',  uri);
        }

        this.Window.panelObject = new Y.Panel({
            srcNode: container,
            headerContent: title,
            width: width,
            height: height,
            zIndex: parseInt(Y.all('*').size(), 10),
            centered: true,
            modal: true,
            visible: false,
            render: true,
            buttons: buttons
        });

        //this.wHandleCollection[windowHandle] = this.Window.panelObject;

        /*for (i in buttons) {
            var skipCallback = false;

            this.Window.panelObject.addButton({
                value     : buttons[i].title,
                isDefault : buttons[i].isDefault,
                section   : Y.WidgetStdMod.FOOTER,
                classNames: ['dButton_' + i],
                action    : function (e) {
                    var currentClass = e.currentTarget._node.getAttribute('class').split(' ');

                    for (x in currentClass) {
                        if (currentClass[x].indexOf('dButton_') > -1) {
                            if (typeof (buttons[i].callbackClose) === 'boolean') {
                                if (buttons[i].callbackClose === true) {
                                    Y.Libbit.Dialog.wHandleCollection[windowHandle].hide();

                                    skipCallback = true;
                                }
                            }

                            if (skipCallback === false) {
                                buttons[parseInt(currentClass[x].replace('dButton_', ''), 10)].callback(
                                    Y.Libbit.Dialog.wHandleCollection[windowHandle],
                                    container
                                );
                            }
                        }
                    }
                }
            });
        }*/

        this.Window.panelObject.show();
        /*this.Window.panelObject.on('visibleChange', function () {
            for (i in buttons) {
                if (typeof (buttons[i].callbackClose) === 'boolean') {
                    if (buttons[i].callbackClose === true) {
                        buttons[i].callback(
                            Y.Libbit.Dialog.wHandleCollection[windowHandle],
                            container
                        );
                    }
                }
            }
        });*/

        return this.Window.panelObject;
    },

    panel: function (type, message, headerTitle, buttonTitle) {
        var bodyNode = Y.Node.create('<div/>'),
            buttons;

        if (Y.Lang.isUndefined(buttonTitle)) {
            buttonTitle = 'Confirm';
        }

        bodyNode.appendChild(Y.Node.create('<div class="yui3-widget-bd">' +
                                           '<div class="icon dialog_' + type + '_icon"></div>' +
                                           '<div>' + message + '</div>' +
                                           '</div>'
        ));

        buttons = [
            {
                value  : 'Cancel',
                section: Y.WidgetStdMod.FOOTER,
                action : function (e) {
                    Y.Libbit.Dialog.panel.panelObject.hide();

                    Y.Libbit.Dialog.callbackCancel();
                }
            }
        ];

        if (type === 'confirm' || type === 'prompt') {
            buttons.push({
                value  : buttonTitle,
                section: Y.WidgetStdMod.FOOTER,
                isDefault: true,
                action : function (e) {
                    Y.Libbit.Dialog.panel.panelObject.hide();

                    if (type === 'prompt') {
                        Y.Libbit.Dialog.callback(
                            Y.Libbit.Dialog.panel.MessageNode.one('input').get('value')
                        );
                    } else {
                        Y.Libbit.Dialog.callback();
                    }
                }
            });
        }

        this.panel.panelObject = new Y.Panel({
            srcNode: bodyNode,
            headerContent: headerTitle,
            zIndex: Y.all('*').size(),
            width: 500,
            centered: true,
            modal: true,
            visible: false,
            render: true,
            buttons: buttons
        });

        this.panel.MessageNode = bodyNode.one('div.yui3-widget-bd');
        this.panel.MessageNode.setStyle('max-height', '400px');

        this.panel.panelObject.get('boundingBox').addClass('libbit-dialog');

        this.panel.panelObject.show();
        /*this.panel.panelObject.on('visibleChange', function () {
            if ((type === 'error' || type === 'message' || type === 'warning') && typeof (this.callback) === 'function') {
                this.callback();
            }
        });*/
    }
};

// -- Namespace ----------------------------------------------------------------
Y.namespace('Libbit').Dialog = Dialog;

}, '1.0', { requires: ['node', 'dd', 'dd-plugin', 'json-parse', 'panel', 'gallery-dispatcher'], skinnable: true });
