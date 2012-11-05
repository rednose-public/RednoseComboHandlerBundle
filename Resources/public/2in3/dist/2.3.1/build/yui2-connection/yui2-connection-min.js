YUI.add('yui2-connection', function(Y) {
    var YAHOO    = Y.YUI2;
    /*
Copyright (c) 2007, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.net/yui/license.txt
version: 2.3.1
*/
YAHOO.util.Connect={_msxml_progid:["Microsoft.XMLHTTP","MSXML2.XMLHTTP.3.0","MSXML2.XMLHTTP"],_http_headers:{},_has_http_headers:false,_use_default_post_header:true,_default_post_header:"application/x-www-form-urlencoded; charset=UTF-8",_default_form_header:"application/x-www-form-urlencoded",_use_default_xhr_header:true,_default_xhr_header:"XMLHttpRequest",_has_default_headers:true,_default_headers:{},_isFormSubmit:false,_isFileUpload:false,_formNode:null,_sFormData:null,_poll:{},_timeOut:{},_polling_interval:50,_transaction_id:0,_submitElementValue:null,_hasSubmitListener:(function(){if(YAHOO.util.Event){YAHOO.util.Event.addListener(document,"click",function(q){try{var S=YAHOO.util.Event.getTarget(q);if(S.type.toLowerCase()=="submit"){YAHOO.util.Connect._submitElementValue=encodeURIComponent(S.name)+"="+encodeURIComponent(S.value);}}catch(q){}});return true;}return false;})(),startEvent:new YAHOO.util.CustomEvent("start"),completeEvent:new YAHOO.util.CustomEvent("complete"),successEvent:new YAHOO.util.CustomEvent("success"),failureEvent:new YAHOO.util.CustomEvent("failure"),uploadEvent:new YAHOO.util.CustomEvent("upload"),abortEvent:new YAHOO.util.CustomEvent("abort"),_customEvents:{onStart:["startEvent","start"],onComplete:["completeEvent","complete"],onSuccess:["successEvent","success"],onFailure:["failureEvent","failure"],onUpload:["uploadEvent","upload"],onAbort:["abortEvent","abort"]},setProgId:function(S){this._msxml_progid.unshift(S);},setDefaultPostHeader:function(S){if(typeof S=="string"){this._default_post_header=S;}else{if(typeof S=="boolean"){this._use_default_post_header=S;}}},setDefaultXhrHeader:function(S){if(typeof S=="string"){this._default_xhr_header=S;}else{this._use_default_xhr_header=S;}},setPollingInterval:function(S){if(typeof S=="number"&&isFinite(S)){this._polling_interval=S;}},createXhrObject:function(w){var m,S;try{S=new XMLHttpRequest();m={conn:S,tId:w};}catch(R){for(var q=0;q<this._msxml_progid.length;++q){try{S=new ActiveXObject(this._msxml_progid[q]);m={conn:S,tId:w};break;}catch(R){}}}finally{return m;}},getConnectionObject:function(S){var R;var m=this._transaction_id;try{if(!S){R=this.createXhrObject(m);}else{R={};R.tId=m;R.isUpload=true;}if(R){this._transaction_id++;}}catch(q){}finally{return R;}},asyncRequest:function(w,q,m,S){var R=(this._isFileUpload)?this.getConnectionObject(true):this.getConnectionObject();if(!R){return null;}else{if(m&&m.customevents){this.initCustomEvents(R,m);}if(this._isFormSubmit){if(this._isFileUpload){this.uploadFile(R,m,q,S);return R;}if(w.toUpperCase()=="GET"){if(this._sFormData.length!==0){q+=((q.indexOf("?")==-1)?"?":"&")+this._sFormData;}else{q+="?"+this._sFormData;}}else{if(w.toUpperCase()=="POST"){S=S?this._sFormData+"&"+S:this._sFormData;}}}R.conn.open(w,q,true);if(this._use_default_xhr_header){if(!this._default_headers["X-Requested-With"]){this.initHeader("X-Requested-With",this._default_xhr_header,true);}}if(this._isFormSubmit==false&&this._use_default_post_header){this.initHeader("Content-Type",this._default_post_header);}if(this._has_default_headers||this._has_http_headers){this.setHeader(R);}this.handleReadyState(R,m);R.conn.send(S||null);this.startEvent.fire(R);if(R.startEvent){R.startEvent.fire(R);}return R;}},initCustomEvents:function(S,R){for(var q in R.customevents){if(this._customEvents[q][0]){S[this._customEvents[q][0]]=new YAHOO.util.CustomEvent(this._customEvents[q][1],(R.scope)?R.scope:null);S[this._customEvents[q][0]].subscribe(R.customevents[q]);}}},handleReadyState:function(q,R){var S=this;if(R&&R.timeout){this._timeOut[q.tId]=window.setTimeout(function(){S.abort(q,R,true);},R.timeout);}this._poll[q.tId]=window.setInterval(function(){if(q.conn&&q.conn.readyState===4){window.clearInterval(S._poll[q.tId]);delete S._poll[q.tId];if(R&&R.timeout){window.clearTimeout(S._timeOut[q.tId]);delete S._timeOut[q.tId];}S.completeEvent.fire(q);if(q.completeEvent){q.completeEvent.fire(q);}S.handleTransactionResponse(q,R);}},this._polling_interval);},handleTransactionResponse:function(w,V,S){var R,q;try{if(w.conn.status!==undefined&&w.conn.status!==0){R=w.conn.status;}else{R=13030;}}catch(m){R=13030;}if(R>=200&&R<300||R===1223){q=this.createResponseObject(w,(V&&V.argument)?V.argument:undefined);if(V){if(V.success){if(!V.scope){V.success(q);}else{V.success.apply(V.scope,[q]);}}}this.successEvent.fire(q);if(w.successEvent){w.successEvent.fire(q);}}else{switch(R){case 12002:case 12029:case 12030:case 12031:case 12152:case 13030:q=this.createExceptionObject(w.tId,(V&&V.argument)?V.argument:undefined,(S?S:false));if(V){if(V.failure){if(!V.scope){V.failure(q);}else{V.failure.apply(V.scope,[q]);}}}break;default:q=this.createResponseObject(w,(V&&V.argument)?V.argument:undefined);if(V){if(V.failure){if(!V.scope){V.failure(q);}else{V.failure.apply(V.scope,[q]);}}}}this.failureEvent.fire(q);if(w.failureEvent){w.failureEvent.fire(q);}}this.releaseObject(w);q=null;},createResponseObject:function(S,d){var m={};var T={};try{var R=S.conn.getAllResponseHeaders();var V=R.split("\n");for(var w=0;w<V.length;w++){var q=V[w].indexOf(":");if(q!=-1){T[V[w].substring(0,q)]=V[w].substring(q+2);}}}catch(N){}m.tId=S.tId;m.status=(S.conn.status==1223)?204:S.conn.status;m.statusText=(S.conn.status==1223)?"No Content":S.conn.statusText;m.getResponseHeader=T;m.getAllResponseHeaders=R;m.responseText=S.conn.responseText;m.responseXML=S.conn.responseXML;if(typeof d!==undefined){m.argument=d;}return m;},createExceptionObject:function(N,m,S){var V=0;var d="communication failure";var R=-1;var q="transaction aborted";var w={};w.tId=N;if(S){w.status=R;w.statusText=q;}else{w.status=V;w.statusText=d;}if(m){w.argument=m;}return w;},initHeader:function(S,m,R){var q=(R)?this._default_headers:this._http_headers;q[S]=m;if(R){this._has_default_headers=true;}else{this._has_http_headers=true;}},setHeader:function(S){if(this._has_default_headers){for(var q in this._default_headers){if(YAHOO.lang.hasOwnProperty(this._default_headers,q)){S.conn.setRequestHeader(q,this._default_headers[q]);}}}if(this._has_http_headers){for(var q in this._http_headers){if(YAHOO.lang.hasOwnProperty(this._http_headers,q)){S.conn.setRequestHeader(q,this._http_headers[q]);}}delete this._http_headers;this._http_headers={};this._has_http_headers=false;}},resetDefaultHeaders:function(){delete this._default_headers;this._default_headers={};this._has_default_headers=false;},setForm:function(M,w,q){this.resetFormState();var f;if(typeof M=="string"){f=(document.getElementById(M)||document.forms[M]);}else{if(typeof M=="object"){f=M;}else{return ;}}if(w){var V=this.createFrame(q?q:null);this._isFormSubmit=true;this._isFileUpload=true;this._formNode=f;return ;}var S,T,d,p;var N=false;for(var m=0;m<f.elements.length;m++){S=f.elements[m];p=f.elements[m].disabled;T=f.elements[m].name;d=f.elements[m].value;if(!p&&T){switch(S.type){case "select-one":case "select-multiple":for(var R=0;R<S.options.length;R++){if(S.options[R].selected){if(window.ActiveXObject){this._sFormData+=encodeURIComponent(T)+"="+encodeURIComponent(S.options[R].attributes["value"].specified?S.options[R].value:S.options[R].text)+"&";}else{this._sFormData+=encodeURIComponent(T)+"="+encodeURIComponent(S.options[R].hasAttribute("value")?S.options[R].value:S.options[R].text)+"&";}}}break;case "radio":case "checkbox":if(S.checked){this._sFormData+=encodeURIComponent(T)+"="+encodeURIComponent(d)+"&";}break;case "file":case undefined:case "reset":case "button":break;case "submit":if(N===false){if(this._hasSubmitListener&&this._submitElementValue){this._sFormData+=this._submitElementValue+"&";}else{this._sFormData+=encodeURIComponent(T)+"="+encodeURIComponent(d)+"&";}N=true;}break;default:this._sFormData+=encodeURIComponent(T)+"="+encodeURIComponent(d)+"&";}}}this._isFormSubmit=true;this._sFormData=this._sFormData.substr(0,this._sFormData.length-1);this.initHeader("Content-Type",this._default_form_header);return this._sFormData;},resetFormState:function(){this._isFormSubmit=false;this._isFileUpload=false;this._formNode=null;this._sFormData="";},createFrame:function(S){var q="yuiIO"+this._transaction_id;var R;if(window.ActiveXObject){R=document.createElement("<iframe id=\""+q+"\" name=\""+q+"\" />");if(typeof S=="boolean"){R.src="javascript:false";}else{if(typeof secureURI=="string"){R.src=S;}}}else{R=document.createElement("iframe");R.id=q;R.name=q;}R.style.position="absolute";R.style.top="-1000px";R.style.left="-1000px";document.body.appendChild(R);},appendPostData:function(S){var m=[];var q=S.split("&");for(var R=0;R<q.length;R++){var w=q[R].indexOf("=");if(w!=-1){m[R]=document.createElement("input");m[R].type="hidden";m[R].name=q[R].substring(0,w);m[R].value=q[R].substring(w+1);this._formNode.appendChild(m[R]);}}return m;},uploadFile:function(m,p,w,R){var N="yuiIO"+m.tId;var T="multipart/form-data";var f=document.getElementById(N);var U=this;var q={action:this._formNode.getAttribute("action"),method:this._formNode.getAttribute("method"),target:this._formNode.getAttribute("target")};this._formNode.setAttribute("action",w);this._formNode.setAttribute("method","POST");this._formNode.setAttribute("target",N);if(this._formNode.encoding){this._formNode.setAttribute("encoding",T);}else{this._formNode.setAttribute("enctype",T);}if(R){var M=this.appendPostData(R);}this._formNode.submit();this.startEvent.fire(m);if(m.startEvent){m.startEvent.fire(m);}if(p&&p.timeout){this._timeOut[m.tId]=window.setTimeout(function(){U.abort(m,p,true);},p.timeout);}if(M&&M.length>0){for(var d=0;d<M.length;d++){this._formNode.removeChild(M[d]);}}for(var S in q){if(YAHOO.lang.hasOwnProperty(q,S)){if(q[S]){this._formNode.setAttribute(S,q[S]);}else{this._formNode.removeAttribute(S);}}}this.resetFormState();var V=function(){if(p&&p.timeout){window.clearTimeout(U._timeOut[m.tId]);delete U._timeOut[m.tId];}U.completeEvent.fire(m);if(m.completeEvent){m.completeEvent.fire(m);}var v={};v.tId=m.tId;v.argument=p.argument;try{v.responseText=f.contentWindow.document.body?f.contentWindow.document.body.innerHTML:f.contentWindow.document.documentElement.textContent;v.responseXML=f.contentWindow.document.XMLDocument?f.contentWindow.document.XMLDocument:f.contentWindow.document;}catch(u){}if(p&&p.upload){if(!p.scope){p.upload(v);}else{p.upload.apply(p.scope,[v]);}}U.uploadEvent.fire(v);if(m.uploadEvent){m.uploadEvent.fire(v);}YAHOO.util.Event.removeListener(f,"load",V);setTimeout(function(){document.body.removeChild(f);U.releaseObject(m);},100);};YAHOO.util.Event.addListener(f,"load",V);},abort:function(m,V,S){var R;if(m.conn){if(this.isCallInProgress(m)){m.conn.abort();window.clearInterval(this._poll[m.tId]);delete this._poll[m.tId];if(S){window.clearTimeout(this._timeOut[m.tId]);delete this._timeOut[m.tId];}R=true;}}else{if(m.isUpload===true){var q="yuiIO"+m.tId;var w=document.getElementById(q);if(w){YAHOO.util.Event.removeListener(w,"load",uploadCallback);document.body.removeChild(w);if(S){window.clearTimeout(this._timeOut[m.tId]);delete this._timeOut[m.tId];}R=true;}}else{R=false;}}if(R===true){this.abortEvent.fire(m);if(m.abortEvent){m.abortEvent.fire(m);}this.handleTransactionResponse(m,V,true);}return R;},isCallInProgress:function(q){if(q&&q.conn){return q.conn.readyState!==4&&q.conn.readyState!==0;}else{if(q&&q.isUpload===true){var S="yuiIO"+q.tId;return document.getElementById(S)?true:false;}else{return false;}}},releaseObject:function(S){if(S.conn){S.conn=null;}S=null;}};YAHOO.register("connection",YAHOO.util.Connect,{version:"2.3.1",build:"541"});
}, '2.3.1' ,{"requires": ["yui2-yahoo", "yui2-event"]});