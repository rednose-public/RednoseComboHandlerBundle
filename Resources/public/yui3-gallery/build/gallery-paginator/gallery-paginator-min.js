YUI.add("gallery-paginator",function(b){function c(d){c.superclass.constructor.call(this,d);}b.mix(c,{NAME:"paginator",ID_BASE:"yui-pg-",VALUE_UNLIMITED:-1,TEMPLATE_DEFAULT:"{FirstPageLink} {PreviousPageLink} {PageLinks} {NextPageLink} {LastPageLink}",TEMPLATE_ROWS_PER_PAGE:"{FirstPageLink} {PreviousPageLink} {PageLinks} {NextPageLink} {LastPageLink} {RowsPerPageDropdown}",ui:{},isNumeric:function(d){return isFinite(+d);},toNumber:function(d){return isFinite(+d)?+d:null;}},true);c.ATTRS={rowsPerPage:{value:0,validator:c.isNumeric,setter:c.toNumber},totalRecords:{value:0,validator:c.isNumeric,setter:c.toNumber},recordOffset:{value:0,validator:function(e){var d=this.get("totalRecords");if(c.isNumeric(e)){e=+e;return d===c.VALUE_UNLIMITED||d>e||(d===0&&e===0);}return false;},setter:c.toNumber},initialPage:{value:1,validator:c.isNumeric,setter:c.toNumber},template:{value:c.TEMPLATE_DEFAULT,validator:b.Lang.isString},alwaysVisible:{value:true,validator:b.Lang.isBoolean},id:{value:b.guid(),readOnly:true}};b.extend(c,b.Widget,{_batch:false,_pageChanged:false,_state:null,initializer:function(g){var i=c.VALUE_UNLIMITED,d,e,f,h;this._selfSubscribe();d=this.get("initialPage");e=this.get("totalRecords");f=this.get("rowsPerPage");if(d>1&&f!==i){h=(d-1)*f;if(e===i||h<e){this.set("recordOffset",h);}}},_selfSubscribe:function(){this.after("totalRecordsChange",this.updateVisibility,this);this.after("alwaysVisibleChange",this.updateVisibility,this);this.after("totalRecordsChange",this._handleStateChange,this);this.after("recordOffsetChange",this._handleStateChange,this);this.after("rowsPerPageChange",this._handleStateChange,this);this.after("totalRecordsChange",this._syncRecordOffset,this);},renderUI:function(){this._renderTemplate(this.get("contentBox"),this.get("template"),c.ID_BASE+this.get("id"),true);this.updateVisibility();},_renderTemplate:function(d,h,g,e){if(!d){return;}d.setStyle("display","none");d.addClass(this.getClassName());var f=this.getClassName("ui");d.set("innerHTML",h.replace(/\{([a-z0-9_ \-]+)\}/gi,'<span class="'+f+" "+f+'-$1"></span>'));d.all("span."+f).each(function(i){this.renderUIComponent(i,g);},this);if(!e){d.setStyle("display","");}},renderUIComponent:function(d,j){var i=d.get("parentNode"),h=this.getClassName("ui"),g=new RegExp(h+"-(\\w+)").exec(d.get("className")),f=g&&c.ui[g[1]],e;if(b.Lang.isFunction(f)){e=new f(this);if(b.Lang.isFunction(e.render)){i.replaceChild(e.render(j),d);}}},updateVisibility:function(j){var n=this.get("alwaysVisible"),l,d,o,m,g,h,k,f;if(!j||j.type==="alwaysVisibleChange"||!n){l=this.get("totalRecords");d=true;o=this.get("rowsPerPage");m=this.get("rowsPerPageOptions");if(b.Lang.isArray(m)){for(g=0,h=m.length;g<h;++g){k=m[g];f=b.Lang.isValue(k.value)?k.value:k;o=Math.min(o,f);}}if(l!==c.VALUE_UNLIMITED&&l<=o){d=false;}d=d||n;this.get("contentBox").setStyle("display",d?"":"none");}},getTotalPages:function(){var d=this.get("totalRecords"),e=this.get("rowsPerPage");if(!e){return null;}if(d===c.VALUE_UNLIMITED){return c.VALUE_UNLIMITED;}return Math.ceil(d/e);},hasPage:function(e){if(!b.Lang.isNumber(e)||e<1){return false;}var d=this.getTotalPages();return(d===c.VALUE_UNLIMITED||d>=e);},getCurrentPage:function(){var d=this.get("rowsPerPage");if(!d||!this.get("totalRecords")){return 0;}return Math.floor(this.get("recordOffset")/d)+1;},hasNextPage:function(){var d=this.getCurrentPage(),e=this.getTotalPages();return d&&(e===c.VALUE_UNLIMITED||d<e);},getNextPage:function(){return this.hasNextPage()?this.getCurrentPage()+1:null;},hasPreviousPage:function(){return(this.getCurrentPage()>1);},getPreviousPage:function(){return(this.hasPreviousPage()?this.getCurrentPage()-1:1);},getPageRecords:function(g){if(!b.Lang.isNumber(g)){g=this.getCurrentPage();}var f=this.get("rowsPerPage"),e=this.get("totalRecords"),h,d;if(!g||!f){return null;}h=(g-1)*f;if(e!==c.VALUE_UNLIMITED){if(h>=e){return null;}d=Math.min(h+f,e)-1;}else{d=h+f-1;}return[h,d];},setPage:function(e,d){if(this.hasPage(e)&&e!==this.getCurrentPage()){if(d){this.set("recordOffset",(e-1)*this.get("rowsPerPage"));}else{this.fire("changeRequest",this.getState({"page":e}));}}},getRowsPerPage:function(){return this.get("rowsPerPage");},setRowsPerPage:function(e,d){if(c.isNumeric(e)&&+e>0&&+e!==this.get("rowsPerPage")){if(d){this.set("rowsPerPage",e);}else{this.fire("changeRequest",this.getState({"rowsPerPage":+e}));}}},getTotalRecords:function(){return this.get("totalRecords");},setTotalRecords:function(e,d){if(c.isNumeric(e)&&+e>=0&&+e!==this.get("totalRecords")){if(d){this.set("totalRecords",e);}else{this.fire("changeRequest",this.getState({"totalRecords":+e}));}}},getStartIndex:function(){return this.get("recordOffset");},setStartIndex:function(e,d){if(c.isNumeric(e)&&+e>=0&&+e!==this.get("recordOffset")){if(d){this.set("recordOffset",e);}else{this.fire("changeRequest",this.getState({"recordOffset":+e}));}}},getState:function(j){var l=c.VALUE_UNLIMITED,h=Math,i=h.max,k=h.ceil,f,d,g;function e(o,m,n){if(o<=0||m===0){return 0;}if(m===l||m>o){return o-(o%n);}return m-(m%n||n);}f={paginator:this,totalRecords:this.get("totalRecords"),rowsPerPage:this.get("rowsPerPage"),records:this.getPageRecords()};f.recordOffset=e(this.get("recordOffset"),f.totalRecords,f.rowsPerPage);f.page=k(f.recordOffset/f.rowsPerPage)+1;if(!j){return f;}d={paginator:this,before:f,rowsPerPage:j.rowsPerPage||f.rowsPerPage,totalRecords:(c.isNumeric(j.totalRecords)?i(j.totalRecords,l):+f.totalRecords)};if(d.totalRecords===0){d.recordOffset=d.page=0;}else{g=c.isNumeric(j.page)?(j.page-1)*d.rowsPerPage:c.isNumeric(j.recordOffset)?+j.recordOffset:f.recordOffset;d.recordOffset=e(g,d.totalRecords,d.rowsPerPage);d.page=k(d.recordOffset/d.rowsPerPage)+1;}d.records=[d.recordOffset,d.recordOffset+d.rowsPerPage-1];if(d.totalRecords!==l&&d.recordOffset<d.totalRecords&&d.records&&d.records[1]>d.totalRecords-1){d.records[1]=d.totalRecords-1;}return d;},setState:function(e){if(b.Lang.isObject(e)){this._state=this.getState({});e={page:e.page,rowsPerPage:e.rowsPerPage,totalRecords:e.totalRecords,recordOffset:e.recordOffset};
if(e.page&&e.recordOffset===undefined){e.recordOffset=(e.page-1)*(e.rowsPerPage||this.get("rowsPerPage"));}this._batch=true;this._pageChanged=false;for(var d in e){if(e.hasOwnProperty(d)){this.set(d,e[d]);}}this._batch=false;if(this._pageChanged){this._pageChanged=false;this._firePageChange(this.getState(this._state));}}},_syncRecordOffset:function(h){var d=h.newValue,g,f;if(h.prevValue!==d){if(d!==c.VALUE_UNLIMITED){g=this.get("rowsPerPage");if(g&&this.get("recordOffset")>=d){f=this.getState({totalRecords:h.prevValue,recordOffset:this.get("recordOffset")});this.set("recordOffset",f.before.recordOffset);this._firePageChange(f);}}}},_handleStateChange:function(f){if(f.prevValue!==f.newValue){var g=this._state||{},d;g[f.type.replace(/Change$/,"")]=f.prevValue;d=this.getState(g);if(d.page!==d.before.page){if(this._batch){this._pageChanged=true;}else{this._firePageChange(d);}}}},_firePageChange:function(d){if(b.Lang.isObject(d)){var e=d.before;delete d.before;this.fire("pageChange",{type:"pageChange",prevValue:d.page,newValue:e.page,prevState:d,newState:e});}}});b.Paginator=c;c.ui.CurrentPageInput=function(d){this.paginator=d;d.on("destroy",this.destroy,this);d.after("recordOffsetChange",this.update,this);d.after("rowsPerPageChange",this.update,this);d.after("totalRecordsChange",this.update,this);d.after("disabledChange",this.update,this);d.after("pageInputClassChange",this.update,this);};c.ATTRS.pageInputClass={value:b.ClassNameManager.getClassName(c.NAME,"page-input"),validator:b.Lang.isString};c.ATTRS.pageInputTemplate={value:"{currentPage} of {totalPages}",validator:b.Lang.isString};c.ui.CurrentPageInput.prototype={destroy:function(){this.span.remove().destroy(true);this.span=null;this.input=null;this.page_count=null;},render:function(d){if(this.span){this.span.remove().destroy(true);}this.span=b.Node.create('<span id="'+d+'-page-input">'+b.substitute(this.paginator.get("pageInputTemplate"),{currentPage:'<input class="yui-page-input"></input>',totalPages:'<span class="yui-page-count"></span>'})+"</span>");this.span.set("className",this.paginator.get("pageInputClass"));this.input=this.span.one("input");this.input.on("change",this._onChange,this);this.input.on("key",this._onReturnKey,"down:13",this);this.page_count=this.span.one("span.yui-page-count");this.update();return this.span;},update:function(d){if(d&&d.prevVal===d.newVal){return;}this.span.set("className",this.paginator.get("pageInputClass"));this.input.set("value",this.paginator.getCurrentPage());this.input.set("disabled",this.paginator.get("disabled"));this.page_count.set("innerHTML",this.paginator.getTotalPages());},_onChange:function(d){this.paginator.setPage(parseInt(this.input.get("value"),10));},_onReturnKey:function(d){d.halt(true);this.paginator.setPage(parseInt(this.input.get("value"),10));}};c.ui.CurrentPageReport=function(d){this.paginator=d;d.on("destroy",this.destroy,this);d.after("recordOffsetChange",this.update,this);d.after("rowsPerPageChange",this.update,this);d.after("totalRecordsChange",this.update,this);d.after("pageReportClassChange",this.update,this);d.after("pageReportTemplateChange",this.update,this);};c.ATTRS.pageReportClass={value:b.ClassNameManager.getClassName(c.NAME,"current"),validator:b.Lang.isString};c.ATTRS.pageReportTemplate={value:"({currentPage} of {totalPages})",validator:b.Lang.isString};c.ATTRS.pageReportValueGenerator={value:function(f){var e=f.getCurrentPage(),d=f.getPageRecords();return{"currentPage":d?e:0,"totalPages":f.getTotalPages(),"startIndex":d?d[0]:0,"endIndex":d?d[1]:0,"startRecord":d?d[0]+1:0,"endRecord":d?d[1]+1:0,"totalRecords":f.get("totalRecords")};},validator:b.Lang.isFunction};c.ui.CurrentPageReport.sprintf=function(e,d){return e.replace(/\{([\w\s\-]+)\}/g,function(f,g){return(g in d)?d[g]:"";});};c.ui.CurrentPageReport.prototype={span:null,destroy:function(){this.span.remove(true);this.span=null;},render:function(d){if(this.span){this.span.remove(true);}this.span=b.Node.create('<span id="'+d+'-page-report"></span>');this.span.set("className",this.paginator.get("pageReportClass"));this.update();return this.span;},update:function(d){if(d&&d.prevVal===d.newVal){return;}this.span.set("className",this.paginator.get("pageReportClass"));this.span.set("innerHTML",c.ui.CurrentPageReport.sprintf(this.paginator.get("pageReportTemplate"),this.paginator.get("pageReportValueGenerator")(this.paginator)));}};c.ui.FirstPageLink=function(d){this.paginator=d;d.on("destroy",this.destroy,this);d.after("recordOffsetChange",this.update,this);d.after("rowsPerPageChange",this.update,this);d.after("totalRecordsChange",this.update,this);d.after("disabledChange",this.update,this);d.after("firstPageLinkLabelChange",this.rebuild,this);d.after("firstPageLinkClassChange",this.rebuild,this);};c.ATTRS.firstPageLinkLabel={value:"&lt;&lt; first",validator:b.Lang.isString};c.ATTRS.firstPageLinkClass={value:b.ClassNameManager.getClassName(c.NAME,"first"),validator:b.Lang.isString};c.ui.FirstPageLink.prototype={current:null,link:null,span:null,destroy:function(){this.link.remove(true);this.span.remove(true);this.current=this.link=this.span=null;},render:function(e){var f=this.paginator,g=f.get("firstPageLinkClass"),d=f.get("firstPageLinkLabel");if(this.link){this.link.remove(true);this.span.remove(true);}this.link=b.Node.create('<a href="#" id="'+e+'-first-link">'+d+"</a>");this.link.set("className",g);this.link.on("click",this.onClick,this);this.span=b.Node.create('<span id="'+e+'-first-span">'+d+"</span>");this.span.set("className",g);this.current=f.getCurrentPage()>1?this.link:this.span;return this.current;},update:function(f){if(f&&f.prevVal===f.newVal){return;}var d=this.current?this.current.get("parentNode"):null;if(this.paginator.getCurrentPage()>1&&!this.paginator.get("disabled")){if(d&&this.current===this.span){d.replaceChild(this.link,this.current);this.current=this.link;}}else{if(d&&this.current===this.link){d.replaceChild(this.span,this.current);this.current=this.span;}}},rebuild:function(g){if(g&&g.prevVal===g.newVal){return;
}var f=this.paginator,h=f.get("firstPageLinkClass"),d=f.get("firstPageLinkLabel");this.link.set("className",h);this.link.set("innerHTML",d);this.span.set("className",h);this.span.set("innerHTML",d);},onClick:function(d){d.halt();this.paginator.setPage(1);}};c.ui.ItemRangeDropdown=function(d){this.paginator=d;d.on("destroy",this.destroy,this);d.after("recordOffsetChange",this.update,this);d.after("rowsPerPageChange",this.update,this);d.after("totalRecordsChange",this.update,this);d.after("disabledChange",this.update,this);d.after("itemRangeDropdownClassChange",this.update,this);};c.ATTRS.itemRangeDropdownClass={value:b.ClassNameManager.getClassName(c.NAME,"ir-dropdown"),validator:b.Lang.isString};c.ATTRS.itemRangeDropdownTemplate={value:"{currentRange} of {totalItems}",validator:b.Lang.isString};c.ui.ItemRangeDropdown.prototype={destroy:function(){this.span.remove().destroy(true);this.span=null;this.menu=null;this.page_count=null;},render:function(d){if(this.span){this.span.remove().destroy(true);}this.span=b.Node.create('<span id="'+d+'-item-range">'+b.substitute(this.paginator.get("itemRangeDropdownTemplate"),{currentRange:'<select class="yui-current-item-range"></select>',totalItems:'<span class="yui-item-count"></span>'})+"</span>");this.span.set("className",this.paginator.get("itemRangeDropdownClass"));this.menu=this.span.one("select");this.menu.on("change",this._onChange,this);this.page_count=this.span.one("span.yui-item-count");this.prev_page_count=-1;this.prev_page_size=-1;this.prev_rec_count=-1;this.update();return this.span;},update:function(m){if(m&&m.prevVal===m.newVal){return;}var l=this.paginator.getCurrentPage();var j=this.paginator.getTotalPages();var h=this.paginator.getRowsPerPage();var k=this.paginator.getTotalRecords();if(j!=this.prev_page_count||h!=this.prev_page_size||k!=this.prev_rec_count){var f=b.Node.getDOMNode(this.menu).options;f.length=0;for(var g=1;g<=j;g++){var d=this.paginator.getPageRecords(g);f[g-1]=new Option((d[0]+1)+" - "+(d[1]+1),g);}this.page_count.set("innerHTML",k);this.prev_page_count=j;this.prev_page_size=h;this.prev_rec_count=k;}this.span.set("className",this.paginator.get("itemRangeDropdownClass"));this.menu.set("selectedIndex",l-1);this.menu.set("disabled",this.paginator.get("disabled"));},_onChange:function(d){this.paginator.setPage(parseInt(this.menu.get("value"),10));}};c.ui.LastPageLink=function(d){this.paginator=d;d.on("destroy",this.destroy,this);d.after("recordOffsetChange",this.update,this);d.after("rowsPerPageChange",this.update,this);d.after("totalRecordsChange",this.update,this);d.after("disabledChange",this.update,this);d.after("lastPageLinkClassChange",this.rebuild,this);d.after("lastPageLinkLabelChange",this.rebuild,this);};c.ATTRS.lastPageLinkClass={value:b.ClassNameManager.getClassName(c.NAME,"last"),validator:b.Lang.isString};c.ATTRS.lastPageLinkLabel={value:"last &gt;&gt;",validator:b.Lang.isString};c.ui.LastPageLink.prototype={current:null,link:null,span:null,na:null,destroy:function(){this.link.remove(true);this.span.remove(true);this.na.remove(true);this.current=this.link=this.span=this.na=null;},render:function(e){var g=this.paginator,h=g.get("lastPageLinkClass"),d=g.get("lastPageLinkLabel"),f=g.getTotalPages();if(this.link){this.link.remove(true);this.span.remove(true);this.na.remove(true);}this.link=b.Node.create('<a href="#" id="'+e+'-last-link">'+d+"</a>");this.link.set("className",h);this.link.on("click",this.onClick,this);this.span=b.Node.create('<span id="'+e+'-last-span">'+d+"</span>");this.span.set("className",h);this.na=b.Node.create('<span id="'+e+'-last-na"></span>');switch(f){case c.VALUE_UNLIMITED:this.current=this.na;break;case g.getCurrentPage():this.current=this.span;break;default:this.current=this.link;}return this.current;},update:function(g){if(g&&g.prevVal===g.newVal){return;}var d=this.current?this.current.get("parentNode"):null,h=this.link,f=this.paginator.getTotalPages();if(d){if(f===c.VALUE_UNLIMITED){h=this.na;}else{if(f===this.paginator.getCurrentPage()||this.paginator.get("disabled")){h=this.span;}}if(this.current!==h){d.replaceChild(h,this.current);this.current=h;}}},rebuild:function(g){if(g&&g.prevVal===g.newVal){return;}var f=this.paginator,h=f.get("lastPageLinkClass"),d=f.get("lastPageLinkLabel");this.link.set("className",h);this.link.set("innerHTML",d);this.span.set("className",h);this.span.set("innerHTML",d);},onClick:function(d){d.halt();this.paginator.setPage(this.paginator.getTotalPages());}};c.ui.NextPageLink=function(d){this.paginator=d;d.on("destroy",this.destroy,this);d.after("recordOffsetChange",this.update,this);d.after("rowsPerPageChange",this.update,this);d.after("totalRecordsChange",this.update,this);d.after("disabledChange",this.update,this);d.after("nextPageLinkClassChange",this.rebuild,this);d.after("nextPageLinkLabelChange",this.rebuild,this);};c.ATTRS.nextPageLinkClass={value:b.ClassNameManager.getClassName(c.NAME,"next"),validator:b.Lang.isString};c.ATTRS.nextPageLinkLabel={value:"next &gt;",validator:b.Lang.isString};c.ui.NextPageLink.prototype={current:null,link:null,span:null,destroy:function(){this.link.remove(true);this.span.remove(true);this.current=this.link=this.span=null;},render:function(e){var g=this.paginator,h=g.get("nextPageLinkClass"),d=g.get("nextPageLinkLabel"),f=g.getTotalPages();if(this.link){this.link.remove(true);this.span.remove(true);}this.link=b.Node.create('<a href="#" id="'+e+'-next-link">'+d+"</a>");this.link.set("className",h);this.link.on("click",this.onClick,this);this.span=b.Node.create('<span id="'+e+'-next-span">'+d+"</span>");this.span.set("className",h);this.current=g.getCurrentPage()===f?this.span:this.link;return this.current;},update:function(g){if(g&&g.prevVal===g.newVal){return;}var f=this.paginator.getTotalPages(),d=this.current?this.current.get("parentNode"):null;if(this.paginator.getCurrentPage()!==f&&!this.paginator.get("disabled")){if(d&&this.current===this.span){d.replaceChild(this.link,this.current);this.current=this.link;}}else{if(this.current===this.link){if(d){d.replaceChild(this.span,this.current);
this.current=this.span;}}}},rebuild:function(g){if(g&&g.prevVal===g.newVal){return;}var f=this.paginator,h=f.get("nextPageLinkClass"),d=f.get("nextPageLinkLabel");this.link.set("className",h);this.link.set("innerHTML",d);this.span.set("className",h);this.span.set("innerHTML",d);},onClick:function(d){d.halt();this.paginator.setPage(this.paginator.getNextPage());}};c.ui.PageLinks=function(d){this.paginator=d;d.on("destroy",this.destroy,this);d.after("recordOffsetChange",this.update,this);d.after("rowsPerPageChange",this.update,this);d.after("totalRecordsChange",this.update,this);d.after("disabledChange",this.update,this);d.after("pageLinksContainerClassChange",this.rebuild,this);d.after("pageLinkClassChange",this.rebuild,this);d.after("currentPageClassChange",this.rebuild,this);d.after("pageLinksChange",this.rebuild,this);};c.ATTRS.pageLinksContainerClass={value:b.ClassNameManager.getClassName(c.NAME,"pages"),validator:b.Lang.isString};c.ATTRS.pageLinkClass={value:b.ClassNameManager.getClassName(c.NAME,"page"),validator:b.Lang.isString};c.ATTRS.currentPageClass={value:b.ClassNameManager.getClassName(c.NAME,"current-page"),validator:b.Lang.isString};c.ATTRS.pageLinks={value:10,validator:c.isNumeric};c.ATTRS.pageLabelBuilder={value:function(d,e){return d;},validator:b.Lang.isFunction};c.ui.PageLinks.calculateRange=function(f,g,e){var j=c.VALUE_UNLIMITED,i,d,h;if(!f||e===0||g===0||(g===j&&e===j)){return[0,-1];}if(g!==j){e=e===j?g:Math.min(e,g);}i=Math.max(1,Math.ceil(f-(e/2)));if(g===j){d=i+e-1;}else{d=Math.min(g,i+e-1);}h=e-(d-i+1);i=Math.max(1,i-h);return[i,d];};c.ui.PageLinks.prototype={current:0,container:null,destroy:function(){this.container.remove(true);this.container=null;},render:function(d){if(this.container){this.container.remove(true);}this.container=b.Node.create('<span id="'+d+'-pages"></span>');this.container.on("click",this.onClick,this);this.update({newVal:null,rebuild:true});return this.container;},update:function(m){if(m&&m.prevVal===m.newVal){return;}var f=this.paginator,l=f.getCurrentPage();if(this.current!==l||!l||m.rebuild){var o=f.get("pageLabelBuilder"),k=c.ui.PageLinks.calculateRange(l,f.getTotalPages(),f.get("pageLinks")),d=k[0],g=k[1],n="",h=f.get("disabled"),j;for(j=d;j<=g;++j){if(j===l){n+='<span class="'+f.get("currentPageClass")+" "+f.get("pageLinkClass")+'">'+o(j,f)+"</span>";}else{if(h){n+='<span class="'+f.get("pageLinkClass")+' disabled" page="'+j+'">'+o(j,f)+"</span>";}else{n+='<a href="#" class="'+f.get("pageLinkClass")+'" page="'+j+'">'+o(j,f)+"</a>";}}}this.container.set("className",f.get("pageLinksContainerClass"));this.container.set("innerHTML",n);}},rebuild:function(d){d.rebuild=true;this.update(d);},onClick:function(f){var d=f.target;if(d&&d.hasClass(this.paginator.get("pageLinkClass"))){f.halt();this.paginator.setPage(parseInt(d.getAttribute("page"),10));}}};c.ui.PreviousPageLink=function(d){this.paginator=d;d.on("destroy",this.destroy,this);d.after("recordOffsetChange",this.update,this);d.after("rowsPerPageChange",this.update,this);d.after("totalRecordsChange",this.update,this);d.after("disabledChange",this.update,this);d.after("previousPageLinkLabelChange",this.update,this);d.after("previousPageLinkClassChange",this.update,this);};c.ATTRS.previousPageLinkClass={value:b.ClassNameManager.getClassName(c.NAME,"previous"),validator:b.Lang.isString};c.ATTRS.previousPageLinkLabel={value:"&lt; prev",validator:b.Lang.isString};c.ui.PreviousPageLink.prototype={current:null,link:null,span:null,destroy:function(){this.link.remove(true);this.span.remove(true);this.current=this.link=this.span=null;},render:function(e){var f=this.paginator,g=f.get("previousPageLinkClass"),d=f.get("previousPageLinkLabel");if(this.link){this.link.remove(true);this.span.remove(true);}this.link=b.Node.create('<a href="#" id="'+e+'-prev-link">'+d+"</a>");this.link.set("className",g);this.link.on("click",this.onClick,this);this.span=b.Node.create('<span id="'+e+'-prev-span">'+d+"</span>");this.span.set("className",g);this.current=f.getCurrentPage()>1?this.link:this.span;return this.current;},update:function(f){if(f&&f.prevVal===f.newVal){return;}var d=this.current?this.current.get("parentNode"):null;if(this.paginator.getCurrentPage()>1&&!this.paginator.get("disabled")){if(d&&this.current===this.span){d.replaceChild(this.link,this.current);this.current=this.link;}}else{if(d&&this.current===this.link){d.replaceChild(this.span,this.current);this.current=this.span;}}},onClick:function(d){d.halt();this.paginator.setPage(this.paginator.getPreviousPage());}};c.ui.RowsPerPageDropdown=function(d){this.paginator=d;d.on("destroy",this.destroy,this);d.after("rowsPerPageChange",this.update,this);d.after("totalRecordsChange",this._handleTotalRecordsChange,this);d.after("disabledChange",this.update,this);d.after("rowsPerPageDropdownClassChange",this.rebuild,this);d.after("rowsPerPageDropdownTitleChange",this.rebuild,this);d.after("rowsPerPageOptionsChange",this.rebuild,this);};c.ATTRS.rowsPerPageDropdownClass={value:b.ClassNameManager.getClassName(c.NAME,"rpp-options"),validator:b.Lang.isString};c.ATTRS.rowsPerPageDropdownTitle={value:"Rows per page",validator:b.Lang.isString};c.ATTRS.rowsPerPageOptions={value:[],validator:b.Lang.isArray};c.ui.RowsPerPageDropdown.prototype={select:null,all:null,destroy:function(){this.select.remove().destroy(true);this.all=this.select=null;},render:function(d){if(this.select){this.select.remove().destroy(true);}this.select=b.Node.create('<select id="'+d+'-rpp"></select>');this.select.on("change",this.onChange,this);this.rebuild();return this.select;},rebuild:function(n){var f=this.paginator,h=this.select,o=f.get("rowsPerPageOptions"),d=b.Node.getDOMNode(h).options,g,m,j,k,l;this.all=null;h.set("className",this.paginator.get("rowsPerPageDropdownClass"));h.set("title",this.paginator.get("rowsPerPageDropdownTitle"));for(k=0,l=o.length;k<l;++k){m=o[k];g=d[k]||h.appendChild(b.Node.create("<option/>"));j=b.Lang.isValue(m.value)?m.value:m;g.set("innerHTML",b.Lang.isValue(m.text)?m.text:m);
if(b.Lang.isString(j)&&j.toLowerCase()==="all"){this.all=g;g.set("value",f.get("totalRecords"));}else{g.set("value",j);}}while(d.length>o.length){h.get("lastChild").remove(true);}this.update();},update:function(j){if(j&&j.prevVal===j.newVal){return;}var h=this.paginator.get("rowsPerPage")+"",f=b.Node.getDOMNode(this.select).options,g,d;for(g=0,d=f.length;g<d;++g){if(f[g].value===h){f[g].selected=true;break;}}this.select.set("disabled",this.paginator.get("disabled"));},onChange:function(d){this.paginator.setRowsPerPage(parseInt(b.Node.getDOMNode(this.select).options[this.select.get("selectedIndex")].value,10));},_handleTotalRecordsChange:function(d){if(!this.all||(d&&d.prevVal===d.newVal)){return;}this.all.set("value",d.newVal);if(this.all.get("selected")){this.paginator.set("rowsPerPage",d.newVal);}}};c.ui.ValidationPageLinks=function(d){c.ui.ValidationPageLinks.superclass.constructor.call(this,d);d.after("pageStatusChange",this.rebuild,this);};var a="yui3-has";c.ATTRS.pageStatus={value:[],validator:b.Lang.isArray};b.extend(c.ui.ValidationPageLinks,c.ui.PageLinks,{update:function(o){if(o&&o.prevVal===o.newVal){return;}var m=this.paginator.getCurrentPage();var j='<span class="{link} {curr} {status}">{label}</span>';var q='<a href="#" class="{link} {status}" page="{page}">{label}</a>';var d='<span class="{link} disabled {status}" page="{page}">{label}</span>';if(this.current!==m||!m||o.rebuild){var l=this.paginator.get("pageLinkClass"),g=this.paginator.get("pageStatus"),p=this.paginator.get("pageLabelBuilder"),f=this.paginator.get("disabled");var k=c.ui.PageLinks.calculateRange(m,this.paginator.getTotalPages(),this.paginator.get("pageLinks"));var n="";for(var h=k[0];h<=k[1];h++){n+=b.Lang.sub(h===m?j:f?d:q,{link:l,curr:(h===m?this.paginator.get("currentPageClass"):""),status:g[h-1]?a+g[h-1]:"",page:h,label:p(h,this.paginator)});}this.container.set("innerHTML",n);}}});},"gallery-2012.09.26-20-36",{skinnable:true,requires:["widget","event-key","substitute"]});