YUI.add('yui2-yuiloader', function(Y) {
    /*
Copyright (c) 2007, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.net/yui/license.txt
version: 2.3.1
*/
(function(){if(typeof YAHOO_config==="undefined"){YAHOO_config={};}var A={info:{"base":"http://yui.yahooapis.com/2.3.1/build/","skin":{"defaultSkin":"sam","base":"assets/skins/","path":"skin.css","rollup":3},"moduleInfo":{"animation":{"type":"js","path":"animation/animation-min.js","requires":["dom","event"]},"autocomplete":{"type":"js","path":"autocomplete/autocomplete-min.js","requires":["dom","event"],"optional":["connection","animation"],"skinnable":true},"button":{"type":"js","path":"button/button-beta-min.js","requires":["element"],"optional":["menu"],"skinnable":true},"calendar":{"type":"js","path":"calendar/calendar-min.js","requires":["event","dom"],"skinnable":true},"colorpicker":{"type":"js","path":"colorpicker/colorpicker-beta-min.js","requires":["slider","element"],"optional":["animation"],"skinnable":true},"connection":{"type":"js","path":"connection/connection-min.js","requires":["event"]},"container":{"type":"js","path":"container/container-min.js","requires":["dom","event"],"optional":["dragdrop","animation"],"supersedes":["containercore"],"skinnable":true},"containercore":{"type":"js","path":"container/container_core-min.js","requires":["dom","event"]},"datasource":{"type":"js","path":"datasource/datasource-beta-min.js","requires":["event"],"optional":["connection"]},"datatable":{"type":"js","path":"datatable/datatable-beta-min.js","requires":["element","datasource"],"optional":["calendar","dragdrop"],"skinnable":true},"dom":{"type":"js","path":"dom/dom-min.js","requires":["yahoo"]},"dragdrop":{"type":"js","path":"dragdrop/dragdrop-min.js","requires":["dom","event"]},"editor":{"type":"js","path":"editor/editor-beta-min.js","requires":["menu","element","button"],"optional":["animation","dragdrop"],"skinnable":true},"element":{"type":"js","path":"element/element-beta-min.js","requires":["dom","event"]},"event":{"type":"js","path":"event/event-min.js","requires":["yahoo"]},"fonts":{"type":"css","path":"fonts/fonts-min.css"},"grids":{"type":"css","path":"grids/grids-min.css","requires":["fonts"],"optional":["reset"]},"history":{"type":"js","path":"history/history-beta-min.js","requires":["event"]},"imageloader":{"type":"js","path":"imageloader/imageloader-experimental-min.js","requires":["event","dom"]},"logger":{"type":"js","path":"logger/logger-min.js","requires":["event","dom"],"optional":["dragdrop"],"skinnable":true},"menu":{"type":"js","path":"menu/menu-min.js","requires":["containercore"],"skinnable":true},"reset":{"type":"css","path":"reset/reset-min.css"},"reset-fonts-grids":{"type":"css","path":"reset-fonts-grids/reset-fonts-grids.css","supersedes":["reset","fonts","grids"]},"slider":{"type":"js","path":"slider/slider-min.js","requires":["dragdrop"],"optional":["animation"]},"tabview":{"type":"js","path":"tabview/tabview-min.js","requires":["element"],"optional":["connection"],"skinnable":true},"treeview":{"type":"js","path":"treeview/treeview-min.js","requires":["event"],"skinnable":true},"utilities":{"type":"js","path":"utilities/utilities.js","supersedes":["yahoo","event","dragdrop","animation","dom","connection","element","yahoo-dom-event"],"rollup":6},"yahoo":{"type":"js","path":"yahoo/yahoo-min.js"},"yahoo-dom-event":{"type":"js","path":"yahoo-dom-event/yahoo-dom-event.js","supersedes":["yahoo","event","dom"],"rollup":3},"yuiloader":{"type":"js","path":"yuiloader/yuiloader-beta-min.js"},"yuitest":{"type":"js","path":"yuitest/yuitest-beta-min.js","requires":["logger"],"skinnable":true}}},ObjectUtil:{appendArray:function(D,B){if(B){for(var C=0;C<B.length;C=C+1){D[B[C]]=true;}}},clone:function(C){var D={};for(var B in C){D[B]=C[B];}return D;},merge:function(){var E={},B=arguments,D,C;for(D=0;D<B.length;D=D+1){for(C in B[D]){E[C]=B[D][C];}}return E;},keys:function(E,C){var B=[],D;for(D in E){B.push(D);}return B;}},ArrayUtil:{appendArray:function(C,B){Array.prototype.push.apply(C,B);},indexOf:function(B,D){for(var C=0;C<B.length;C=C+1){if(B[C]===D){return C;}}return -1;},toObject:function(B){var D={};for(var C=0;C<B.length;C=C+1){D[B[C]]=true;}return D;},uniq:function(B){return A.ObjectUtil.keys(A.ArrayUtil.toObject(B));}},loaders:[],finishInit:function(B){B=B||YAHOO;B.env.YUIInfo=A.info;B.util.YUILoader=A.YUILoader;},onModuleLoaded:function(C){var E=C.name,B;for(var D=0;D<A.loaders.length;D=D+1){A.loaders[D].loadNext(E);}},init:function(){var E=YAHOO_config,D=E.load,C=(typeof YAHOO!=="undefined"&&YAHOO.env);if(C){YAHOO.env.listeners.push(A.onModuleLoaded);}else{if(E.listener){A.cachedCallback=E.listener;}E.listener=function(F){A.onModuleLoaded(F);if(A.cachedCallback){A.cachedCallback(F);}};}if(D||!C){D=D||{};var B=new A.YUILoader(D);B.onLoadComplete=function(){A.finishInit();if(D.onLoadComplete){B._pushEvents();D.onLoadComplete(B);}};if(!C){B.require("yahoo");}B.insert(null,D);}else{A.finishInit();}}};A.YUILoader=function(B){YAHOO_config.injecting=true;B=B||{};this._internalCallback=null;this.onLoadComplete=null;this.base=("base" in B)?B.base:A.info.base;this.allowRollup=("allowRollup" in B)?B.allowRollup:true;this.filter=B.filter;this.sandbox=B.sandbox;this.required={};this.moduleInfo=B.moduleInfo||A.info.moduleInfo;this.rollups=null;this.loadOptional=B.loadOptional||false;this.sorted=[];this.loaded={};this.dirty=true;this.inserted={};this.skin=B.skin||A.ObjectUtil.clone(A.info.skin);if(B.require){this.require(B.require);}A.loaders.push(this);};A.YUILoader.prototype={FILTERS:{RAW:{"searchExp":"-min\\.js","replaceStr":".js"},DEBUG:{"searchExp":"-min\\.js","replaceStr":"-debug.js"}},SKIN_PREFIX:"skin-",addModule:function(B){if(!B||!B.name||!B.type||(!B.path&&!B.fullpath)){return false;}this.moduleInfo[B.name]=B;this.dirty=true;return true;},require:function(E){var B=(typeof E==="string")?arguments:E;this.dirty=true;for(var C=0;C<B.length;C=C+1){this.required[B[C]]=true;var D=this.parseSkin(B[C]);if(D){this._addSkin(D.skin,D.module);}}A.ObjectUtil.appendArray(this.required,B);},_addSkin:function(D,C){var B=this.formatSkin(D);if(!this.moduleInfo[B]){this.addModule({"name":B,"type":"css","path":this.skin.base+D+"/"+this.skin.path,"rollup":this.skin.rollup});
}if(C){B=this.formatSkin(D,C);if(!this.moduleInfo[B]){this.addModule({"name":B,"type":"css","path":C+"/"+this.skin.base+D+"/"+C+".css"});}}},getRequires:function(C){if(!this.dirty&&C.expanded){return C.expanded;}C.requires=C.requires||[];var B,H=[],E=C.requires,G=C.optional,D=C.supersedes,F=this.moduleInfo;for(B=0;B<E.length;B=B+1){H.push(E[B]);A.ArrayUtil.appendArray(H,this.getRequires(F[E[B]]));}if(G&&this.loadOptional){for(B=0;B<G.length;B=B+1){H.push(G[B]);A.ArrayUtil.appendArray(H,this.getRequires(F[G[B]]));}}C.expanded=A.ArrayUtil.uniq(H);return C.expanded;},getProvides:function(B){var C=this.moduleInfo[B];var E={};E[B]=true;var D=C&&C.supersedes;A.ObjectUtil.appendArray(E,D);return E;},calculate:function(B){if(this.dirty){this._setup(B);this._explode();this._skin();if(this.allowRollup){this._rollup();}this._reduce();this._sort();this.dirty=false;}},_setup:function(C){C=C||{};this.loaded=A.ObjectUtil.clone(this.inserted);if(!this.sandbox&&typeof YAHOO!=="undefined"&&YAHOO.env){this.loaded=A.ObjectUtil.merge(this.loaded,YAHOO.env.modules);}if(C.ignore){A.ObjectUtil.appendArray(this.loaded,C.ignore);}if(C.force){for(var B=0;B<C.force.length;B=B+1){if(C.force[B] in this.loaded){delete this.loaded[C.force[B]];}}}},_explode:function(){var E=this.required,C,B;for(C in E){B=this.moduleInfo[C];if(B){var D=this.getRequires(B);if(D){A.ObjectUtil.appendArray(E,D);}}}},_skin:function(){var E=this.required,D,C;for(D in E){C=this.moduleInfo[D];if(C&&C.skinnable){var F=this.skin.overrides,B;if(F&&F[D]){for(B=0;B<F[D].length;B=B+1){this.require(this.formatSkin(F[D][B],D));}}else{this.require(this.formatSkin(this.skin.defaultSkin,D));}}}},formatSkin:function(D,B){var C=this.SKIN_PREFIX+D;if(B){C=C+"-"+B;}return C;},parseSkin:function(C){if(C.indexOf(this.SKIN_PREFIX)===0){var B=C.split("-");return{skin:B[1],module:B[2]};}return null;},_rollup:function(){var G,F,E,K,I={},B=this.required,D;if(this.dirty||!this.rollups){for(G in this.moduleInfo){E=this.moduleInfo[G];if(E&&E.rollup){I[G]=E;}}this.rollups=I;}for(;;){var C=false;for(G in I){if(!B[G]&&!this.loaded[G]){E=this.moduleInfo[G];K=E.supersedes;D=true;if(!E.rollup){continue;}var J=this.parseSkin(G),H=0;if(J){for(F in B){if(G!==F&&this.parseSkin(F)){H++;D=(H>=E.rollup);if(D){break;}}}}else{for(F=0;F<K.length;F=F+1){if(this.loaded[K[F]]){D=false;break;}else{if(B[K[F]]){H++;D=(H>=E.rollup);if(D){break;}}}}}if(D){B[G]=true;C=true;this.getRequires(E);}}}if(!C){break;}}},_reduce:function(){var D,C,F,B,G=this.required;for(D in G){if(D in this.loaded){delete G[D];}else{var E=this.parseSkin(D);if(E){if(!E.module){var H=this.SKIN_PREFIX+E.skin;for(C in G){if(C!==D&&C.indexOf(H)>-1){delete G[C];}}}}else{B=this.moduleInfo[D];F=B&&B.supersedes;if(F){for(C=0;C<F.length;C=C+1){if(F[C] in G){delete G[F[C]];}}}}}}},_sort:function(){var L=[],C=this.moduleInfo,H=this.loaded;var M=function(Q,S){if(H[S]){return false;}var P,R=C[Q],N=R&&R.expanded;if(N&&A.ArrayUtil.indexOf(N,S)>-1){return true;}var O=C[S]&&C[S].supersedes;if(O){for(P=0;P<O.length;P=P+1){if(M(Q,O[P])){return true;}}}return false;};for(var G in this.required){L.push(G);}var B=0;for(;;){var D=L.length,K,J,F,E,I=false;for(F=B;F<D;F=F+1){K=L[F];for(E=F+1;E<D;E=E+1){if(M(K,L[E])){J=L.splice(E,1);L.splice(F,0,J[0]);I=true;break;}}if(I){break;}else{B=B+1;}}if(!I){break;}}this.sorted=L;},insert:function(F,E,C){if(!C){var B=this;this._internalCallback=function(){B._internalCallback=null;B.insert(F,E,"js");};this.insert(null,E,"css");return ;}E=E||{};this.onLoadComplete=F||this.onLoadComplete;var D=E&&E.filter||null;if(typeof D==="string"){D=D.toUpperCase();if(D==="DEBUG"){this.require("logger");}}this.filter=this.FILTERS[D]||D||this.FILTERS[this.filter]||this.filter;this.insertOptions=E;this.calculate(E);this.loading=true;this.loadType=C;this.loadNext();},loadNext:function(H){if(H){this.inserted[H]=true;}if(!this.loading){return ;}if(H&&H!==this.loading){return ;}var J=this.sorted,G=J.length,E,D,B;for(E=0;E<G;E=E+1){if(J[E] in this.inserted){continue;}if(J[E]===this.loading){return ;}D=this.moduleInfo[J[E]];if(!this.loadType||this.loadType===D.type){this.loading=J[E];if(D.type==="css"){B=D.fullpath||this._url(D.path);this.insertCss(B);this.inserted[J[E]]=true;}else{B=D.fullpath||this._url(D.path);this.insertScript(B);if(D.verifier){var I=this,C=J[E];D.verifier(C,function(){I.loadNext(C);});}return ;}}}this.loading=null;if(this._internalCallback){var F=this._internalCallback;this._internalCallback=null;F(this);}else{if(this.onLoadComplete){this._pushEvents();this.onLoadComplete(this);}}},_pushEvents:function(){if(typeof YAHOO!=="undefined"&&YAHOO.util&&YAHOO.util.Event){YAHOO.util.Event._load();}},_url:function(D){var B=this.base||"",C=this.filter;B=B+D;if(C){B=B.replace(new RegExp(C.searchExp),C.replaceStr);}return B;},insertScript:function(C,E){var B=E||window,F=B.document,G=F.createElement("script"),D=F.getElementsByTagName("head")[0];G.src=C;G.type="text/javascript";D.appendChild(G);},insertCss:function(C,E){var B=E||window,F=B.document,G=F.createElement("link"),D=F.getElementsByTagName("head")[0];G.href=C;G.type="text/css";G.rel="stylesheet";D.appendChild(G);},sandbox:function(B){}};A.init();})();
    Y.YUI2 = YAHOO;
}, '2.3.1' ,{});
