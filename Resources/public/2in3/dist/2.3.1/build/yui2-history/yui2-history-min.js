YUI.add('yui2-history', function(Y) {
    var YAHOO    = Y.YUI2;
    /*
Copyright (c) 2007, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.net/yui/license.txt
version: 2.3.1
*/
YAHOO.util.History=(function(){var L=null;var G=null;var H=false;var E=false;var B=false;var D=[];var C=[];function M(N){return N.replace(/^\s*(\S*(\s+\S+)*)\s*$/,"$1");}function K(){var N;var O;N=top.location.href;O=N.indexOf("#");return O>=0?N.substr(O+1):null;}function A(){var O;var P;var Q=[];var N=[];for(O in D){if(YAHOO.lang.hasOwnProperty(D,O)){P=D[O];Q.push(O+"="+P.initialState);N.push(O+"="+P.currentState);}}G.value=Q.join("&")+"|"+N.join("&");if(YAHOO.env.ua.webkit){G.value+="|"+C.join(",");}}function J(N){var S;var T;var O;var Q;var R;var V;var U;var P;if(!N){for(O in D){if(YAHOO.lang.hasOwnProperty(D,O)){Q=D[O];Q.currentState=Q.initialState;Q.onStateChange(unescape(Q.currentState));}}return ;}R=[];V=N.split("&");for(S=0,T=V.length;S<T;S++){U=V[S].split("=");if(U.length===2){O=U[0];P=U[1];R[O]=P;}}for(O in D){if(YAHOO.lang.hasOwnProperty(D,O)){Q=D[O];P=R[O];if(!P||Q.currentState!==P){Q.currentState=P||Q.initialState;Q.onStateChange(unescape(Q.currentState));}}}}function I(){var P;var N;var O;if(!L.contentWindow||!L.contentWindow.document){setTimeout(I,10);return ;}P=L.contentWindow.document;N=P.getElementById("state");O=N?N.innerText:null;setInterval(function(){var T;var U;var Q;var R;var S;P=L.contentWindow.document;N=P.getElementById("state");T=N?N.innerText:null;if(T!==O){O=T;J(O);if(!O){Q=[];for(R in D){if(YAHOO.lang.hasOwnProperty(D,R)){S=D[R];Q.push(R+"="+S.initialState);}}U=Q.join("&");}else{U=O;}top.location.hash=U;A();}},50);B=true;YAHOO.util.History.onLoadEvent.fire();}function F(){var U;var W;var S;var Y;var O;var Q;var X;var R;var V;var P;var N;var T;G=document.getElementById("yui_hist_field");S=G.value.split("|");if(S.length>1){X=S[0].split("&");for(U=0,W=X.length;U<W;U++){Y=X[U].split("=");if(Y.length===2){O=Y[0];R=Y[1];Q=D[O];if(Q){Q.initialState=R;}}}V=S[1].split("&");for(U=0,W=V.length;U<W;U++){Y=V[U].split("=");if(Y.length>=2){O=Y[0];P=Y[1];Q=D[O];if(Q){Q.currentState=P;}}}}if(S.length>2){C=S[2].split(",");}E=true;if(YAHOO.env.ua.ie){L=document.getElementById("yui_hist_iframe");I();}else{N=history.length;T=K();setInterval(function(){var b;var Z;var a;Z=K();a=history.length;if(Z!==T){T=Z;N=a;J(T);A();}else{if(a!==N){T=Z;N=a;b=C[N-1];J(b);A();}}},50);B=true;YAHOO.util.History.onLoadEvent.fire();}}return{onLoadEvent:new YAHOO.util.CustomEvent("onLoad"),register:function(Q,N,S,T,P){var R;var O;if(typeof Q!=="string"||M(Q)===""||typeof N!=="string"||typeof S!=="function"){throw new Error("Missing or invalid argument passed to YAHOO.util.History.register");}if(D[Q]){return ;}if(H){throw new Error("All modules must be registered before calling YAHOO.util.History.initialize");}Q=escape(Q);N=escape(N);R=null;if(P===true){R=T;}else{R=P;}O=function(U){return S.call(R,U,T);};D[Q]={name:Q,initialState:N,currentState:N,onStateChange:O};},initialize:function(N){if(H){return ;}if(!N){N="blank.html";}if(typeof N!=="string"||M(N)===""){throw new Error("Invalid argument passed to YAHOO.util.History.initialize");}document.write("<input type=\"hidden\" id=\"yui_hist_field\">");if(YAHOO.env.ua.ie){if(location.protocol==="https:"){document.write("<iframe id=\"yui_hist_iframe\" src=\""+N+"\" style=\"position:absolute;visibility:hidden;\"></iframe>");}else{document.write("<iframe id=\"yui_hist_iframe\" src=\"javascript:document.open();document.write(&quot;"+new Date().getTime()+"&quot;);document.close();\" style=\"position:absolute;visibility:hidden;\"></iframe>");}}YAHOO.util.Event.addListener(window,"load",F);H=true;},navigate:function(Q,T){var O;var P;var S;var R;var N;if(typeof Q!=="string"||typeof T!=="string"){throw new Error("Missing or invalid argument passed to YAHOO.util.History.navigate");}N={};N[Q]=T;return YAHOO.util.History.multiNavigate(N);},multiNavigate:function(V){var S;var O;var Q;var P;var N;var R;var U;if(typeof V!=="object"){throw new Error("Missing or invalid argument passed to YAHOO.util.History.multiNavigate");}if(!B){throw new Error("The Browser History Manager is not initialized");}for(O in V){if(!D[O]){throw new Error("The following module has not been registered: "+O);}}S=[];for(O in D){if(YAHOO.lang.hasOwnProperty(D,O)){Q=D[O];if(YAHOO.lang.hasOwnProperty(V,O)){P=V[O];}else{P=Q.currentState;}O=escape(O);P=escape(P);S.push(O+"="+P);}}N=S.join("&");if(YAHOO.env.ua.ie){R="<html><body><div id=\"state\">"+N+"</div></body></html>";try{U=L.contentWindow.document;U.open();U.write(R);U.close();}catch(T){return false;}}else{top.location.hash=N;if(YAHOO.env.ua.webkit){C[history.length]=N;A();}}return true;},getCurrentState:function(N){var O;if(typeof N!=="string"){throw new Error("Missing or invalid argument passed to YAHOO.util.History.getCurrentState");}if(!E){throw new Error("The Browser History Manager is not initialized");}O=D[N];if(!O){throw new Error("No such registered module: "+N);}return unescape(O.currentState);},getBookmarkedState:function(R){var Q;var N;var T;var O;var S;var P;if(typeof R!=="string"){throw new Error("Missing or invalid argument passed to YAHOO.util.History.getBookmarkedState");}T=top.location.hash.substr(1);O=T.split("&");for(Q=0,N=O.length;Q<N;Q++){S=O[Q].split("=");if(S.length===2){P=S[0];if(P===R){return unescape(S[1]);}}}return null;},getQueryStringParameter:function(S,P){var Q;var O;var N;var U;var T;var R;P=P||top.location.href;N=P.indexOf("?");U=N>=0?P.substr(N+1):P;T=U.split("&");for(Q=0,O=T.length;Q<O;Q++){R=T[Q].split("=");if(R.length>=2){if(R[0]===S){return unescape(R[1]);}}}return null;}};})();YAHOO.register("history",YAHOO.util.History,{version:"2.3.1",build:"541"});
}, '2.3.1' ,{"requires": ["yui2-yahoo", "yui2-event"]});
