YUI.add("libbit-grid-select",function(e,t){var n;n=function(){},n.ATTRS={selectable:{value:!1},selectedItem:{value:null}},n.prototype={initializer:function(){this._setSelectable()},_setSelectable:function(){var e=this.get("selectable");e&&this._bind()},_bind:function(){var e=this.get("contentBox");e.delegate("click",this._handleClick,".template-grid-icon-container",this),this.after("selectedItemChange",this._afterSelectedItemChange,this)},_handleClick:function(e){this.set("selectedItem",e.currentTarget)},_afterSelectedItemChange:function(t){var n=this.get("contentBox"),r=t.newVal,i=t.prevVal,s;if(r===i)return!1;n.all(".template_list_item_selected").removeClass("template_list_item_selected"),e.Lang.isNull(r)===!1&&(r.addClass("template_list_item_selected"),s=this._getModelFromGridItem(r),this.fire("select",{model:s}))},_getModelFromGridItem:function(e){var t=e.ancestor(".template-grid-container").getAttribute("data-yui3-record"),n=this.get("data");return n.getByClientId(t)}},e.namespace("Libbit.Grid").Selectable=n},"@VERSION@",{requires:["libbit-grid"]});
