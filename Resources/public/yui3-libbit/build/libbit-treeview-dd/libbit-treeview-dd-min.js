YUI.add("libbit-treeview-dd",function(e,t){var n;n=e.Base.create("dd",e.Base,[],{initializer:function(){e.Do.after(this._bindDD,this,"bindUI",this),this.on("drag:start",this._handleStart,this),this.on("drop:hit",this._handleDrop,this),this.on("drop:over",this._handleOver,this),this.on("drop:enter",this._dropEnterGlobal,this)},_bindDD:function(){var t=this,n=this.get("tree"),r;n.expandAll(),r=n.getNodesBy(function(){return!0}),e.each(r,function(n){var r,i;r=e.one("#"+n.labelElId).ancestor("table"),i=n.data,e.instanceOf(i,e.TB.Category)?(t._createDD(r,i),r.setData({model:i}),new e.DD.Drop({node:r,groups:["one"],bubbleTargets:t})):t._createDD(r,i)}),n.collapseAll()},_handleOver:function(t){var n=t.drop.get("node"),r=e.DD.DDM.activeDrag.get("dragNode").getY(),i=n.get("offsetTop"),s=n.get("offsetHeight"),o,u,a;n.hasClass("yui3-widget-bd")&&(o=r-i-20,o>s?(u=e.one(".libbit-tabview .yui3-widget-bd"),a=new e.Anim({node:u,to:{scroll:function(e){return[0,e.get("scrollTop")+e.get("offsetHeight")]}},easing:e.Easing.easeOut}),a.run()):o<15&&(u=e.one(".libbit-tabview .yui3-widget-bd"),a=new e.Anim({node:u,to:{scroll:function(e){return[e.get("scrollTop")+e.get("offsetHeight"),0]}},easing:e.Easing.easeOut}),a.run()))},_createDD:function(t,n){var r=this,i;return i=(new e.DD.Drag({node:t,data:n,groups:["one"],bubbleTargets:r})).plug(e.Plugin.DDProxy,{moveOnEnd:!1,borderStyle:"none"}),i},_handleStart:function(t){var n=t.target,r,i,s,o;r=n.get("data"),n.get("dragNode").setContent(n.get("node").one(".ygtvlabel").get("outerHTML")),s=n.get("node"),n.set("groups",["one"]),n._prep(),n.detachAll("drag:start"),i=e.Node.create("<div></div>"),n.set("node",i),n.set("target",!0),n._prep(),o=this._createDD(s,r)},_handleDrop:function(t){var n=this.get("data"),r=t.drag.get("data"),i=t.drop.get("node").getData().model;i&&(e.instanceOf(r,e.TB.FieldGroup)?r.set("category",i):r.set("parent",i),r.save(function(){n.load()}))},_dropEnterGlobal:function(){if(e.DD.DDM.activeDrag){var t=e.DD.DDM.activeDrag,n=t.get("dragNode"),r,i,s,o;t.get("data").name==="templateItem"&&(i=t.get("data"),r=i.get("fieldGroup"),t.set("data",r),s=n.cloneNode(!0).set("id",null).setStyle("position","absolute"),e.one("body").appendChild(s),s.setXY(n.getXY()),n.setStyle("opacity",0),n.set("innerHTML",'<div class="libbit-fieldgroup-drag"><i class="icon-align-left"></i><span> </span>'+r.get("name")+"</div>"),o=new e.Anim({node:s.one(".libbit-template-item-container"),to:{width:0,height:0},duration:".25",easing:e.Easing.easeOut}),o.on("end",function(){s.remove()}),o.run(),o=new e.Anim({node:n,to:{opacity:1},duration:".25",easing:e.Easing.easeOut}),o.run())}}}),e.namespace("Libbit.TreeView").DD=n},"1.0.0",{requires:["dd","event-custom"]});
