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
YUI.add('libbit-panel', function(Y) {

var Panel;

Panel = Y.Base.create('panel', Y.Widget, [
    Y.WidgetPosition,

    Y.WidgetAutohide,
    Y.WidgetModality,
    Y.WidgetPositionAlign,
    Y.WidgetPositionConstrain,
    Y.WidgetStack
]);

// -- Namespace ----------------------------------------------------------------
Y.namespace('Libbit').Panel = Panel;

// TODO: Don't require 'panel', create module css.
}, '3.6.0' ,{requires:['panel', 'widget', 'widget-autohide', 'widget-modality', 'widget-position', 'widget-position-align', 'widget-position-constrain', 'widget-stack']});
