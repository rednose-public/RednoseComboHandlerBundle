YUI.add("libbit-view-nav",function(e,t){var n;n=e.Base.create("nav",e.View,[],{title:null,buttons:null,initializer:function(){e.Do.after(this._afterRender,this,"render",this)},_afterRender:function(){var t=this.get("container"),n=this.title,r=e.Node.create("<div></div>"),i=this._buildFooter(),s;t.get("children").each(function(e){r.append(e)}),s=new e.Libbit.NavContainer({headerContent:n,bodyContent:r,footerContent:i}),s.render(t)},_buildFooter:function(){var t=this,n=this.buttons;return footer=e.Node.create("<div></div>"),e.Object.each(n,function(n,r){var i=n.value,s=n.primary,o=n.position?n.position:"left",u=n.title?n.title:i,a=n.disabled,f="button"+t._capitalizeFirstLetter(r),l=e.Node.create('<button class="btn"></button>');i&&(l.set("text",i),l.set("title",u)),s&&l.addClass("btn-primary"),a&&l.addClass("disabled"),l.addClass("float-"+o),l.on("click",function(e){var n=e.target;n.hasClass("disabled")===!1&&t.fire(f)}),footer.append(l)}),footer},_capitalizeFirstLetter:function(e){return e.charAt(0).toUpperCase()+e.slice(1)},_setButtons:function(t){var n=this,r=this.get("container").one(".yui3-widget-ft"),i=this.buttons;e.Object.each(t,function(t,r){n.buttons[r]=e.merge(i[r],t)}),r.one("div").replace(n._buildFooter())},_getButtons:function(){return this.buttons}},{ATTRS:{buttons:{setter:"_setButtons",getter:"_getButtons"}}}),e.namespace("Libbit.View").Nav=n},"1.0.0",{requires:["event-custom","libbit-nav-container","view"]});
