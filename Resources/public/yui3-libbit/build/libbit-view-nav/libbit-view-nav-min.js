YUI.add("libbit-view-nav",function(e,t){var n;n=function(){},n.ATTRS={header:{value:e.Node.create("<div></div>")},footer:{value:e.Node.create("<div></div>")}},n.prototype={initializer:function(){e.Do.after(this._afterRender,this,"render",this)},_afterRender:function(){var t=this.get("container"),n=this.get("header"),r=e.Node.create("<div></div>"),i=this.get("footer"),s;t.get("children").each(function(e){r.append(e)}),s=new e.Libbit.NavContainer({headerContent:n,bodyContent:r,footerContent:i}),s.render(t)}},e.namespace("Libbit.View").Nav=n},"@VERSION@",{requires:["event-custom","libbit-nav-container","view"]});
