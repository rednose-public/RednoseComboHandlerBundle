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
YUI.add('libbit-nav-container', function(Y) {

var NavContainer;

NavContainer = Y.Base.create('nav', Y.Widget, [Y.WidgetStdMod, Y.WidgetButtons]);

// -- Namespace ----------------------------------------------------------------
Y.namespace('Libbit').NavContainer = NavContainer;

}, '3.6.0' ,{requires:['widget', 'widget-stdmod', 'widget-buttons']});
