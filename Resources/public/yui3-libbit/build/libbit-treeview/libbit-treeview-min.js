YUI.add("libbit-treeview",function(e,t){var n;n=e.Base.create("treeview",e.Widget,[e.Libbit.TreeView.Anim],{renderUI:function(){var t=this,n=this.get("data"),r=this.get("srcNode"),i=e.Node.create("<div></div>"),s=(new Date).getTime(),o;i.set("id",s),i.addClass("libbit-treeview-content"),r.append(i),tree=new YAHOO.widget.TreeView(i.get("id"),n),tree.render(),this.set("tree",tree),this._attachData(),this._renderIcons()},bindUI:function(){var t=this,n=this.get("tree"),r=this.get("boundingBox"),i,s;n.subscribe("collapseComplete",function(e){t.fire("collapseComplete",{node:e})}),n.subscribe("expandComplete",function(e){t.fire("expandComplete",{node:e})}),n.subscribe("expand",function(e){return t.get("iconClicked")}),n.subscribe("collapse",function(e){return t.get("iconClicked")}),n.expandAll(),s=n.getNodesBy(function(){return!0}),e.each(s,function(e,n){var r=t._getTableElement(e);r.on("click",function(n){var r=n.target.get("parentNode");if(r.hasClass("ygtvtp")||r.hasClass("ygtvtph")||r.hasClass("ygtvlp")||r.hasClass("ygtvlph"))t.set("iconClicked",!0),e.expand(),t.set("iconClicked",!1);else if(r.hasClass("ygtvtm")||r.hasClass("ygtvtmh")||r.hasClass("ygtvlm")||r.hasClass("ygtvlmh"))t.set("iconClicked",!0),e.collapse(),t.set("iconClicked",!1)})}),n.collapseAll()},_attachData:function(){var t=this,n=this.get("tree");n.expandAll(),nodes=n.getNodesBy(function(){return!0}),e.each(nodes,function(n){var r=t._getTableElement(n);model=n.data,e.instanceOf(model,e.Model)&&(r.setAttribute("data-yui3-record",model.get("clientId")),r.setData({model:model}))}),n.collapseAll()},_renderIcons:function(){var t=this,n=this.get("boundingBox");n.all(".ygtvlabel").each(function(n){var r=t._getModelFromLabelNode(n),i=n.getContent(),s,o;e.instanceOf(r,e.TB.Category)?o="icon-folder-close":e.instanceOf(r,e.TB.FieldGroup)&&(o="icon-align-left"),o&&(s=e.Node.create('<span style="white-space: nowrap;"><i class="'+o+'"></i><span> '+i+"</span></div>"),n.setContent(s))})},_getModelFromLabelNode:function(e){return e.ancestor("table").getData().model},_getTableElement:function(e){var t=this.get("boundingBox"),n=e.labelElId;return t.one("#"+n).ancestor("table")}},{ATTRS:{data:{value:null},tree:{value:null},iconClicked:{value:!1}}}),e.namespace("Libbit").TreeView=n},"@VERSION@",{requires:["anim","libbit-treeview-anim","model","widget","yui2-treeview"],skinnable:!0});
