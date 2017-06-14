/**
 * @license RequireJS domReady 2.0.1 Copyright (c) 2010-2012, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/requirejs/domReady for details
 */
/*jslint */
/*global require: false, define: false, requirejs: false,
  window: false, clearInterval: false, document: false,
  self: false, setInterval: false */


define('domReady',[],function () {
    'use strict';

    var isTop, testDiv, scrollIntervalId,
        isBrowser = typeof window !== "undefined" && window.document,
        isPageLoaded = !isBrowser,
        doc = isBrowser ? document : null,
        readyCalls = [];

    function runCallbacks(callbacks) {
        var i;
        for (i = 0; i < callbacks.length; i += 1) {
            callbacks[i](doc);
        }
    }

    function callReady() {
        var callbacks = readyCalls;

        if (isPageLoaded) {
            //Call the DOM ready callbacks
            if (callbacks.length) {
                readyCalls = [];
                runCallbacks(callbacks);
            }
        }
    }

    /**
     * Sets the page as loaded.
     */
    function pageLoaded() {
        if (!isPageLoaded) {
            isPageLoaded = true;
            if (scrollIntervalId) {
                clearInterval(scrollIntervalId);
            }

            callReady();
        }
    }

    if (isBrowser) {
        if (document.addEventListener) {
            //Standards. Hooray! Assumption here that if standards based,
            //it knows about DOMContentLoaded.
            document.addEventListener("DOMContentLoaded", pageLoaded, false);
            window.addEventListener("load", pageLoaded, false);
        } else if (window.attachEvent) {
            window.attachEvent("onload", pageLoaded);

            testDiv = document.createElement('div');
            try {
                isTop = window.frameElement === null;
            } catch (e) {}

            //DOMContentLoaded approximation that uses a doScroll, as found by
            //Diego Perini: http://javascript.nwbox.com/IEContentLoaded/,
            //but modified by other contributors, including jdalton
            if (testDiv.doScroll && isTop && window.external) {
                scrollIntervalId = setInterval(function () {
                    try {
                        testDiv.doScroll();
                        pageLoaded();
                    } catch (e) {}
                }, 30);
            }
        }

        //Check if document already complete, and if so, just trigger page load
        //listeners. Latest webkit browsers also use "interactive", and
        //will fire the onDOMContentLoaded before "interactive" but not after
        //entering "interactive" or "complete". More details:
        //http://dev.w3.org/html5/spec/the-end.html#the-end
        //http://stackoverflow.com/questions/3665561/document-readystate-of-interactive-vs-ondomcontentloaded
        //Hmm, this is more complicated on further use, see "firing too early"
        //bug: https://github.com/requirejs/domReady/issues/1
        //so removing the || document.readyState === "interactive" test.
        //There is still a window.onload binding that should get fired if
        //DOMContentLoaded is missed.
        if (document.readyState === "complete") {
            pageLoaded();
        }
    }

    /** START OF PUBLIC API **/

    /**
     * Registers a callback for DOM ready. If DOM is already ready, the
     * callback is called immediately.
     * @param {Function} callback
     */
    function domReady(callback) {
        if (isPageLoaded) {
            callback(doc);
        } else {
            readyCalls.push(callback);
        }
        return domReady;
    }

    domReady.version = '2.0.1';

    /**
     * Loader Plugin API method
     */
    domReady.load = function (name, req, onLoad, config) {
        if (config.isBuild) {
            onLoad(null);
        } else {
            domReady(onLoad);
        }
    };

    /** END OF PUBLIC API **/

    return domReady;
});

/** qooxdoo v4.1 | (c) 2013 1&1 Internet AG, http://1und1.de | http://qooxdoo.org/license */
(function(){ 

if (!this.window) window = this;

if (!window.navigator) window.navigator = {
  userAgent: "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_4; de-de) AppleWebKit/533.17.8 (KHTML, like Gecko) Version/5.0.1 Safari/533.17.8", 
  product: "", 
  cpuClass: ""
}; 

if (!window.qx) window.qx = {};

if (!window.qxvariants) qxvariants = {};
  
if (!qx.$$environment) qx.$$environment = {};
var envinfo = {"qx.aspects":false,"qx.debug":false,"qx.debug.databinding":false,"qx.debug.dispose":false,"qx.globalErrorHandling":false,"qx.optimization.basecalls":true,"qx.optimization.privates":true,"qx.optimization.strings":true,"qx.optimization.variables":true,"qx.optimization.variants":true,"qx.optimization.whitespace":true};
for (var k in envinfo) qx.$$environment[k] = envinfo[k];

qx.$$packageData = {};
qx.$$loader = {};
})();

/** qooxdoo v4.1 | (c) 2013 1&1 Internet AG, http://1und1.de | http://qooxdoo.org/license */
qx.$$packageData['0']={"locales":{},"resources":{},"translations":{"C":{}}};
(function(){var b=".prototype",c="function",d="Boolean",e="Error",f="Object.keys requires an object as argument.",g="constructor",h="warn",j="default",k="Null",m="hasOwnProperty",n="Undefined",o="string",p="Object",q="toLocaleString",r="error",s="toString",t="qx.debug",u="()",v="RegExp",w="String",x="info",y="BROKEN_IE",z="isPrototypeOf",A="Date",B="",C="qx.Bootstrap",D="Function",E="]",F="Cannot call super class. Method is not derived: ",G="Array",H="[Class ",I="valueOf",J="Number",K="Class",L="debug",M="ES5",N=".",O="propertyIsEnumerable",P="object";if(!window.qx){window.qx={};}
;qx.Bootstrap={genericToString:function(){return H+this.classname+E;}
,createNamespace:function(name,Q){var T=name.split(N);var S=T[0];var parent=qx.$$namespaceRoot&&qx.$$namespaceRoot[S]?qx.$$namespaceRoot:window;for(var i=0,R=T.length-1;i<R;i++ ,S=T[i]){if(!parent[S]){parent=parent[S]={};}
else {parent=parent[S];}
;}
;parent[S]=Q;return S;}
,setDisplayName:function(V,U,name){V.displayName=U+N+name+u;}
,setDisplayNames:function(X,W){for(var name in X){var Y=X[name];if(Y instanceof Function){Y.displayName=W+N+name+u;}
;}
;}
,base:function(ba,bb){if(qx.Bootstrap.DEBUG){if(!qx.Bootstrap.isFunction(ba.callee.base)){throw new Error(F+ba.callee.displayName);}
;}
;if(arguments.length===1){return ba.callee.base.call(this);}
else {return ba.callee.base.apply(this,Array.prototype.slice.call(arguments,1));}
;}
,define:function(name,bm){if(!bm){bm={statics:{}};}
;var bi;var be=null;qx.Bootstrap.setDisplayNames(bm.statics,name);if(bm.members||bm.extend){qx.Bootstrap.setDisplayNames(bm.members,name+b);bi=bm.construct||new Function;if(bm.extend){this.extendClass(bi,bi,bm.extend,name,bg);}
;var bd=bm.statics||{};for(var i=0,bf=qx.Bootstrap.keys(bd),l=bf.length;i<l;i++ ){var bc=bf[i];bi[bc]=bd[bc];}
;be=bi.prototype;be.base=qx.Bootstrap.base;be.name=be.classname=name;var bk=bm.members||{};var bc,bj;for(var i=0,bf=qx.Bootstrap.keys(bk),l=bf.length;i<l;i++ ){bc=bf[i];bj=bk[bc];if(bj instanceof Function&&be[bc]){bj.base=be[bc];}
;be[bc]=bj;}
;}
else {bi=bm.statics||{};if(qx.Bootstrap.$$registry&&qx.Bootstrap.$$registry[name]){var bl=qx.Bootstrap.$$registry[name];if(this.keys(bi).length!==0){if(bm.defer){bm.defer(bi,be);}
;for(var bh in bi){bl[bh]=bi[bh];}
;return bl;}
;}
;}
;bi.$$type=K;if(!bi.hasOwnProperty(s)){bi.toString=this.genericToString;}
;var bg=name?this.createNamespace(name,bi):B;bi.name=bi.classname=name;bi.basename=bg;bi.$$events=bm.events;if(bm.defer){bm.defer(bi,be);}
;if(name!=null){qx.Bootstrap.$$registry[name]=bi;}
;return bi;}
};qx.Bootstrap.define(C,{statics:{LOADSTART:qx.$$start||new Date(),DEBUG:(function(){var bn=true;if(qx.$$environment&&qx.$$environment[t]===false){bn=false;}
;return bn;}
)(),getEnvironmentSetting:function(bo){if(qx.$$environment){return qx.$$environment[bo];}
;}
,setEnvironmentSetting:function(bp,bq){if(!qx.$$environment){qx.$$environment={};}
;if(qx.$$environment[bp]===undefined){qx.$$environment[bp]=bq;}
;}
,createNamespace:qx.Bootstrap.createNamespace,setRoot:function(br){qx.$$namespaceRoot=br;}
,base:qx.Bootstrap.base,define:qx.Bootstrap.define,setDisplayName:qx.Bootstrap.setDisplayName,setDisplayNames:qx.Bootstrap.setDisplayNames,genericToString:qx.Bootstrap.genericToString,extendClass:function(clazz,construct,superClass,name,basename){var superproto=superClass.prototype;var helper=new Function();helper.prototype=superproto;var proto=new helper();clazz.prototype=proto;proto.name=proto.classname=name;proto.basename=basename;construct.base=superClass;clazz.superclass=superClass;construct.self=clazz.constructor=proto.constructor=clazz;}
,getByName:function(name){return qx.Bootstrap.$$registry[name];}
,$$registry:{},objectGetLength:function(bs){return qx.Bootstrap.keys(bs).length;}
,objectMergeWith:function(bu,bt,bw){if(bw===undefined){bw=true;}
;for(var bv in bt){if(bw||bu[bv]===undefined){bu[bv]=bt[bv];}
;}
;return bu;}
,__a:[z,m,q,s,I,O,g],keys:({"ES5":Object.keys,"BROKEN_IE":function(bx){if(bx===null||(typeof bx!=P&&typeof bx!=c)){throw new TypeError(f);}
;var by=[];var bA=Object.prototype.hasOwnProperty;for(var bB in bx){if(bA.call(bx,bB)){by.push(bB);}
;}
;var bz=qx.Bootstrap.__a;for(var i=0,a=bz,l=a.length;i<l;i++ ){if(bA.call(bx,a[i])){by.push(a[i]);}
;}
;return by;}
,"default":function(bC){if(bC===null||(typeof bC!=P&&typeof bC!=c)){throw new TypeError(f);}
;var bD=[];var bE=Object.prototype.hasOwnProperty;for(var bF in bC){if(bE.call(bC,bF)){bD.push(bF);}
;}
;return bD;}
})[typeof (Object.keys)==c?M:(function(){for(var bG in {toString:1}){return bG;}
;}
)()!==s?y:j],__b:{"[object String]":w,"[object Array]":G,"[object Object]":p,"[object RegExp]":v,"[object Number]":J,"[object Boolean]":d,"[object Date]":A,"[object Function]":D,"[object Error]":e},bind:function(bI,self,bJ){var bH=Array.prototype.slice.call(arguments,2,arguments.length);return function(){var bK=Array.prototype.slice.call(arguments,0,arguments.length);return bI.apply(self,bH.concat(bK));}
;}
,firstUp:function(bL){return bL.charAt(0).toUpperCase()+bL.substr(1);}
,firstLow:function(bM){return bM.charAt(0).toLowerCase()+bM.substr(1);}
,getClass:function(bO){if(bO===undefined){return n;}
else if(bO===null){return k;}
;var bN=Object.prototype.toString.call(bO);return (qx.Bootstrap.__b[bN]||bN.slice(8,-1));}
,isString:function(bP){return (bP!==null&&(typeof bP===o||qx.Bootstrap.getClass(bP)==w||bP instanceof String||(!!bP&&!!bP.$$isString)));}
,isArray:function(bQ){return (bQ!==null&&(bQ instanceof Array||(bQ&&qx.data&&qx.data.IListData&&qx.util.OOUtil.hasInterface(bQ.constructor,qx.data.IListData))||qx.Bootstrap.getClass(bQ)==G||(!!bQ&&!!bQ.$$isArray)));}
,isObject:function(bR){return (bR!==undefined&&bR!==null&&qx.Bootstrap.getClass(bR)==p);}
,isFunction:function(bS){return qx.Bootstrap.getClass(bS)==D;}
,$$logs:[],debug:function(bU,bT){qx.Bootstrap.$$logs.push([L,arguments]);}
,info:function(bW,bV){qx.Bootstrap.$$logs.push([x,arguments]);}
,warn:function(bY,bX){qx.Bootstrap.$$logs.push([h,arguments]);}
,error:function(cb,ca){qx.Bootstrap.$$logs.push([r,arguments]);}
,trace:function(cc){}
}});}
)();
(function(){var a="qx.util.OOUtil";qx.Bootstrap.define(a,{statics:{classIsDefined:function(name){return qx.Bootstrap.getByName(name)!==undefined;}
,getPropertyDefinition:function(b,name){while(b){if(b.$$properties&&b.$$properties[name]){return b.$$properties[name];}
;b=b.superclass;}
;return null;}
,hasProperty:function(c,name){return !!qx.util.OOUtil.getPropertyDefinition(c,name);}
,getEventType:function(d,name){var d=d.constructor;while(d.superclass){if(d.$$events&&d.$$events[name]!==undefined){return d.$$events[name];}
;d=d.superclass;}
;return null;}
,supportsEvent:function(e,name){return !!qx.util.OOUtil.getEventType(e,name);}
,getByInterface:function(h,f){var g,i,l;while(h){if(h.$$implements){g=h.$$flatImplements;for(i=0,l=g.length;i<l;i++ ){if(g[i]===f){return h;}
;}
;}
;h=h.superclass;}
;return null;}
,hasInterface:function(k,j){return !!qx.util.OOUtil.getByInterface(k,j);}
,getMixins:function(n){var m=[];while(n){if(n.$$includes){m.push.apply(m,n.$$flatIncludes);}
;n=n.superclass;}
;return m;}
}});}
)();
(function(){var a="qx.core.Environment",b="default",c=' type)',d="&",e="qx/static/blank.html",f="true",g="|",h="qx.core.Environment for a list of predefined keys.",j="false",k='] found, and no default ("default") given',l=":",m='" (',n=' in variants [',o=".",p="qx.allowUrlSettings",q='No match for variant "',r=" is not a valid key. Please see the API-doc of ",s="qxenv";qx.Bootstrap.define(a,{statics:{_checks:{},_asyncChecks:{},__c:{},_checksMap:{},_defaults:{"true":true,"qx.allowUrlSettings":false,"qx.allowUrlVariants":false,"qx.debug.property.level":0,"qx.debug":true,"qx.debug.ui.queue":true,"qx.aspects":false,"qx.dynlocale":true,"qx.dyntheme":true,"qx.blankpage":e,"qx.debug.databinding":false,"qx.debug.dispose":false,"qx.optimization.basecalls":false,"qx.optimization.comments":false,"qx.optimization.privates":false,"qx.optimization.strings":false,"qx.optimization.variables":false,"qx.optimization.variants":false,"module.databinding":true,"module.logger":true,"module.property":true,"module.events":true,"qx.nativeScrollBars":false},get:function(w){if(this.__c[w]!=undefined){return this.__c[w];}
;var y=this._checks[w];if(y){var u=y();this.__c[w]=u;return u;}
;var t=this._getClassNameFromEnvKey(w);if(t[0]!=undefined){var x=t[0];var v=t[1];var u=x[v]();this.__c[w]=u;return u;}
;if(qx.Bootstrap.DEBUG){qx.Bootstrap.warn(w+r+h);qx.Bootstrap.trace(this);}
;}
,_getClassNameFromEnvKey:function(D){var F=this._checksMap;if(F[D]!=undefined){var A=F[D];var E=A.lastIndexOf(o);if(E>-1){var C=A.slice(0,E);var z=A.slice(E+1);var B=qx.Bootstrap.getByName(C);if(B!=undefined){return [B,z];}
;}
;}
;return [undefined,undefined];}
,getAsync:function(H,K,self){var L=this;if(this.__c[H]!=undefined){window.setTimeout(function(){K.call(self,L.__c[H]);}
,0);return;}
;var I=this._asyncChecks[H];if(I){I(function(N){L.__c[H]=N;K.call(self,N);}
);return;}
;var G=this._getClassNameFromEnvKey(H);if(G[0]!=undefined){var J=G[0];var M=G[1];J[M](function(O){L.__c[H]=O;K.call(self,O);}
);return;}
;if(qx.Bootstrap.DEBUG){qx.Bootstrap.warn(H+r+h);qx.Bootstrap.trace(this);}
;}
,select:function(Q,P){return this.__d(this.get(Q),P);}
,selectAsync:function(S,R,self){this.getAsync(S,function(T){var U=this.__d(S,R);U.call(self,T);}
,this);}
,__d:function(Y,X){var W=X[Y];if(X.hasOwnProperty(Y)){return W;}
;for(var ba in X){if(ba.indexOf(g)!=-1){var V=ba.split(g);for(var i=0;i<V.length;i++ ){if(V[i]==Y){return X[ba];}
;}
;}
;}
;if(X[b]!==undefined){return X[b];}
;if(qx.Bootstrap.DEBUG){throw new Error(q+Y+m+(typeof Y)+c+n+qx.Bootstrap.keys(X)+k);}
;}
,filter:function(bb){var bd=[];for(var bc in bb){if(this.get(bc)){bd.push(bb[bc]);}
;}
;return bd;}
,invalidateCacheKey:function(be){delete this.__c[be];}
,add:function(bg,bf){if(this._checks[bg]==undefined){if(bf instanceof Function){if(!this._checksMap[bg]&&bf.displayName){this._checksMap[bg]=bf.displayName.substr(0,bf.displayName.length-2);}
;this._checks[bg]=bf;}
else {this._checks[bg]=this.__g(bf);}
;}
;}
,addAsync:function(bi,bh){if(this._checks[bi]==undefined){this._asyncChecks[bi]=bh;}
;}
,getChecks:function(){return this._checks;}
,getAsyncChecks:function(){return this._asyncChecks;}
,_initDefaultQxValues:function(){var bj=function(bl){return function(){return bl;}
;}
;for(var bk in this._defaults){this.add(bk,bj(this._defaults[bk]));}
;}
,__e:function(){if(qx&&qx.$$environment){for(var bm in qx.$$environment){var bn=qx.$$environment[bm];this._checks[bm]=this.__g(bn);}
;}
;}
,__f:function(){if(window.document&&window.document.location){var bo=window.document.location.search.slice(1).split(d);for(var i=0;i<bo.length;i++ ){var br=bo[i].split(l);if(br.length!=3||br[0]!=s){continue;}
;var bp=br[1];var bq=decodeURIComponent(br[2]);if(bq==f){bq=true;}
else if(bq==j){bq=false;}
else if(/^(\d|\.)+$/.test(bq)){bq=parseFloat(bq);}
;this._checks[bp]=this.__g(bq);}
;}
;}
,__g:function(bs){return qx.Bootstrap.bind(function(bt){return bt;}
,null,bs);}
},defer:function(bu){bu._initDefaultQxValues();bu.__e();if(bu.get(p)===true){bu.__f();}
;}
});}
)();
(function(){var a="ecmascript.array.lastindexof",b="function",c="stack",d="ecmascript.array.map",f="ecmascript.date.now",g="ecmascript.array.reduce",h="e",i="qx.bom.client.EcmaScript",j="ecmascript.object.keys",k="ecmascript.error.stacktrace",l="ecmascript.string.trim",m="ecmascript.array.indexof",n="stacktrace",o="ecmascript.error.toString",p="[object Error]",q="ecmascript.array.foreach",r="ecmascript.function.bind",s="ecmascript.array.reduceright",t="ecmascript.array.some",u="ecmascript.array.filter",v="ecmascript.array.every";qx.Bootstrap.define(i,{statics:{getStackTrace:function(){var w;var e=new Error(h);w=e.stack?c:e.stacktrace?n:null;if(!w){try{throw e;}
catch(x){e=x;}
;}
;return e.stacktrace?n:e.stack?c:null;}
,getArrayIndexOf:function(){return !!Array.prototype.indexOf;}
,getArrayLastIndexOf:function(){return !!Array.prototype.lastIndexOf;}
,getArrayForEach:function(){return !!Array.prototype.forEach;}
,getArrayFilter:function(){return !!Array.prototype.filter;}
,getArrayMap:function(){return !!Array.prototype.map;}
,getArraySome:function(){return !!Array.prototype.some;}
,getArrayEvery:function(){return !!Array.prototype.every;}
,getArrayReduce:function(){return !!Array.prototype.reduce;}
,getArrayReduceRight:function(){return !!Array.prototype.reduceRight;}
,getErrorToString:function(){return typeof Error.prototype.toString==b&&Error.prototype.toString()!==p;}
,getFunctionBind:function(){return typeof Function.prototype.bind===b;}
,getObjectKeys:function(){return !!Object.keys;}
,getDateNow:function(){return !!Date.now;}
,getStringTrim:function(){return typeof String.prototype.trim===b;}
},defer:function(y){qx.core.Environment.add(m,y.getArrayIndexOf);qx.core.Environment.add(a,y.getArrayLastIndexOf);qx.core.Environment.add(q,y.getArrayForEach);qx.core.Environment.add(u,y.getArrayFilter);qx.core.Environment.add(d,y.getArrayMap);qx.core.Environment.add(t,y.getArraySome);qx.core.Environment.add(v,y.getArrayEvery);qx.core.Environment.add(g,y.getArrayReduce);qx.core.Environment.add(s,y.getArrayReduceRight);qx.core.Environment.add(f,y.getDateNow);qx.core.Environment.add(o,y.getErrorToString);qx.core.Environment.add(k,y.getStackTrace);qx.core.Environment.add(r,y.getFunctionBind);qx.core.Environment.add(j,y.getObjectKeys);qx.core.Environment.add(l,y.getStringTrim);}
});}
)();
(function(){var a="qx.lang.normalize.Function",b="ecmascript.function.bind",c="function",d="Function.prototype.bind called on incompatible ";qx.Bootstrap.define(a,{statics:{bind:function(i){var e=Array.prototype.slice;var h=this;if(typeof h!=c){throw new TypeError(d+h);}
;var f=e.call(arguments,1);var g=function(){if(this instanceof g){var F=function(){}
;F.prototype=h.prototype;var self=new F;var j=h.apply(self,f.concat(e.call(arguments)));if(Object(j)===j){return j;}
;return self;}
else {return h.apply(i,f.concat(e.call(arguments)));}
;}
;return g;}
},defer:function(k){if(!qx.core.Environment.get(b)){Function.prototype.bind=k.bind;}
;}
});}
)();
(function(){var a="ecmascript.object.keys",b="qx.lang.normalize.Object";qx.Bootstrap.define(b,{statics:{keys:qx.Bootstrap.keys},defer:function(c){if(!qx.core.Environment.get(a)){Object.keys=c.keys;}
;}
});}
)();
(function(){var a="function",b="ecmascript.array.lastindexof",c="ecmascript.array.map",d="ecmascript.array.filter",e="Length is 0 and no second argument given",f="qx.lang.normalize.Array",g="ecmascript.array.indexof",h="First argument is not callable",j="ecmascript.array.reduce",k="ecmascript.array.foreach",m="ecmascript.array.reduceright",n="ecmascript.array.some",o="ecmascript.array.every";qx.Bootstrap.define(f,{statics:{indexOf:function(p,q){if(q==null){q=0;}
else if(q<0){q=Math.max(0,this.length+q);}
;for(var i=q;i<this.length;i++ ){if(this[i]===p){return i;}
;}
;return -1;}
,lastIndexOf:function(r,s){if(s==null){s=this.length-1;}
else if(s<0){s=Math.max(0,this.length+s);}
;for(var i=s;i>=0;i-- ){if(this[i]===r){return i;}
;}
;return -1;}
,forEach:function(t,u){var l=this.length;for(var i=0;i<l;i++ ){var v=this[i];if(v!==undefined){t.call(u||window,v,i,this);}
;}
;}
,filter:function(z,w){var x=[];var l=this.length;for(var i=0;i<l;i++ ){var y=this[i];if(y!==undefined){if(z.call(w||window,y,i,this)){x.push(this[i]);}
;}
;}
;return x;}
,map:function(D,A){var B=[];var l=this.length;for(var i=0;i<l;i++ ){var C=this[i];if(C!==undefined){B[i]=D.call(A||window,C,i,this);}
;}
;return B;}
,some:function(E,F){var l=this.length;for(var i=0;i<l;i++ ){var G=this[i];if(G!==undefined){if(E.call(F||window,G,i,this)){return true;}
;}
;}
;return false;}
,every:function(H,I){var l=this.length;for(var i=0;i<l;i++ ){var J=this[i];if(J!==undefined){if(!H.call(I||window,J,i,this)){return false;}
;}
;}
;return true;}
,reduce:function(K,L){if(typeof K!==a){throw new TypeError(h);}
;if(L===undefined&&this.length===0){throw new TypeError(e);}
;var M=L===undefined?this[0]:L;for(var i=L===undefined?1:0;i<this.length;i++ ){if(i in this){M=K.call(undefined,M,this[i],i,this);}
;}
;return M;}
,reduceRight:function(N,O){if(typeof N!==a){throw new TypeError(h);}
;if(O===undefined&&this.length===0){throw new TypeError(e);}
;var P=O===undefined?this[this.length-1]:O;for(var i=O===undefined?this.length-2:this.length-1;i>=0;i-- ){if(i in this){P=N.call(undefined,P,this[i],i,this);}
;}
;return P;}
},defer:function(Q){if(!qx.core.Environment.get(g)){Array.prototype.indexOf=Q.indexOf;}
;if(!qx.core.Environment.get(b)){Array.prototype.lastIndexOf=Q.lastIndexOf;}
;if(!qx.core.Environment.get(k)){Array.prototype.forEach=Q.forEach;}
;if(!qx.core.Environment.get(d)){Array.prototype.filter=Q.filter;}
;if(!qx.core.Environment.get(c)){Array.prototype.map=Q.map;}
;if(!qx.core.Environment.get(n)){Array.prototype.some=Q.some;}
;if(!qx.core.Environment.get(o)){Array.prototype.every=Q.every;}
;if(!qx.core.Environment.get(j)){Array.prototype.reduce=Q.reduce;}
;if(!qx.core.Environment.get(m)){Array.prototype.reduceRight=Q.reduceRight;}
;}
});}
)();
(function(){var a="qx.Mixin",b=".prototype",c="]",d='Conflict between mixin "',e="constructor",f="Array",g='"!',h='" and "',j="destruct",k='" in property "',m="Mixin",n='" in member "',o="[Mixin ";qx.Bootstrap.define(a,{statics:{define:function(name,q){if(q){if(q.include&&!(qx.Bootstrap.getClass(q.include)===f)){q.include=[q.include];}
;{}
;var r=q.statics?q.statics:{};qx.Bootstrap.setDisplayNames(r,name);for(var p in r){if(r[p] instanceof Function){r[p].$$mixin=r;}
;}
;if(q.construct){r.$$constructor=q.construct;qx.Bootstrap.setDisplayName(q.construct,name,e);}
;if(q.include){r.$$includes=q.include;}
;if(q.properties){r.$$properties=q.properties;}
;if(q.members){r.$$members=q.members;qx.Bootstrap.setDisplayNames(q.members,name+b);}
;for(var p in r.$$members){if(r.$$members[p] instanceof Function){r.$$members[p].$$mixin=r;}
;}
;if(q.events){r.$$events=q.events;}
;if(q.destruct){r.$$destructor=q.destruct;qx.Bootstrap.setDisplayName(q.destruct,name,j);}
;}
else {var r={};}
;r.$$type=m;r.name=name;r.toString=this.genericToString;r.basename=qx.Bootstrap.createNamespace(name,r);this.$$registry[name]=r;return r;}
,checkCompatibility:function(t){var u=this.flatten(t);var v=u.length;if(v<2){return true;}
;var w={};var x={};var z={};var y;for(var i=0;i<v;i++ ){y=u[i];for(var s in y.events){if(z[s]){throw new Error(d+y.name+h+z[s]+n+s+g);}
;z[s]=y.name;}
;for(var s in y.properties){if(w[s]){throw new Error(d+y.name+h+w[s]+k+s+g);}
;w[s]=y.name;}
;for(var s in y.members){if(x[s]){throw new Error(d+y.name+h+x[s]+n+s+g);}
;x[s]=y.name;}
;}
;return true;}
,isCompatible:function(B,C){var A=qx.util.OOUtil.getMixins(C);A.push(B);return qx.Mixin.checkCompatibility(A);}
,getByName:function(name){return this.$$registry[name];}
,isDefined:function(name){return this.getByName(name)!==undefined;}
,getTotalNumber:function(){return qx.Bootstrap.objectGetLength(this.$$registry);}
,flatten:function(D){if(!D){return [];}
;var E=D.concat();for(var i=0,l=D.length;i<l;i++ ){if(D[i].$$includes){E.push.apply(E,this.flatten(D[i].$$includes));}
;}
;return E;}
,genericToString:function(){return o+this.name+c;}
,$$registry:{},__h:null,__i:function(name,F){}
}});}
)();
(function(){var a='Implementation of method "',b='"',c="function",d='" is not supported by Class "',e="Boolean",f="qx.Interface",g='The event "',h='" required by interface "',j='" is missing in class "',k='"!',m='The property "',n="Interface",o="toggle",p="]",q="[Interface ",r="is",s="Array",t='Implementation of member "';qx.Bootstrap.define(f,{statics:{define:function(name,v){if(v){if(v.extend&&!(qx.Bootstrap.getClass(v.extend)===s)){v.extend=[v.extend];}
;{}
;var u=v.statics?v.statics:{};if(v.extend){u.$$extends=v.extend;}
;if(v.properties){u.$$properties=v.properties;}
;if(v.members){u.$$members=v.members;}
;if(v.events){u.$$events=v.events;}
;}
else {var u={};}
;u.$$type=n;u.name=name;u.toString=this.genericToString;u.basename=qx.Bootstrap.createNamespace(name,u);qx.Interface.$$registry[name]=u;return u;}
,getByName:function(name){return this.$$registry[name];}
,isDefined:function(name){return this.getByName(name)!==undefined;}
,getTotalNumber:function(){return qx.Bootstrap.objectGetLength(this.$$registry);}
,flatten:function(x){if(!x){return [];}
;var w=x.concat();for(var i=0,l=x.length;i<l;i++ ){if(x[i].$$extends){w.push.apply(w,this.flatten(x[i].$$extends));}
;}
;return w;}
,__j:function(B,C,y,F,D){var z=y.$$members;if(z){for(var E in z){if(qx.Bootstrap.isFunction(z[E])){var H=this.__k(C,E);var A=H||qx.Bootstrap.isFunction(B[E]);if(!A){if(D){throw new Error(a+E+j+C.classname+h+y.name+b);}
else {return false;}
;}
;var G=F===true&&!H&&!qx.util.OOUtil.hasInterface(C,y);if(G){B[E]=this.__n(y,B[E],E,z[E]);}
;}
else {if(typeof B[E]===undefined){if(typeof B[E]!==c){if(D){throw new Error(t+E+j+C.classname+h+y.name+b);}
else {return false;}
;}
;}
;}
;}
;}
;if(!D){return true;}
;}
,__k:function(L,I){var N=I.match(/^(is|toggle|get|set|reset)(.*)$/);if(!N){return false;}
;var K=qx.Bootstrap.firstLow(N[2]);var M=qx.util.OOUtil.getPropertyDefinition(L,K);if(!M){return false;}
;var J=N[0]==r||N[0]==o;if(J){return qx.util.OOUtil.getPropertyDefinition(L,K).check==e;}
;return true;}
,__l:function(R,O,P){if(O.$$properties){for(var Q in O.$$properties){if(!qx.util.OOUtil.getPropertyDefinition(R,Q)){if(P){throw new Error(m+Q+d+R.classname+k);}
else {return false;}
;}
;}
;}
;if(!P){return true;}
;}
,__m:function(V,S,T){if(S.$$events){for(var U in S.$$events){if(!qx.util.OOUtil.supportsEvent(V,U)){if(T){throw new Error(g+U+d+V.classname+k);}
else {return false;}
;}
;}
;}
;if(!T){return true;}
;}
,assertObject:function(Y,W){var ba=Y.constructor;this.__j(Y,ba,W,false,true);this.__l(ba,W,true);this.__m(ba,W,true);var X=W.$$extends;if(X){for(var i=0,l=X.length;i<l;i++ ){this.assertObject(Y,X[i]);}
;}
;}
,assert:function(bd,bb,be){this.__j(bd.prototype,bd,bb,be,true);this.__l(bd,bb,true);this.__m(bd,bb,true);var bc=bb.$$extends;if(bc){for(var i=0,l=bc.length;i<l;i++ ){this.assert(bd,bc[i],be);}
;}
;}
,objectImplements:function(bh,bf){var bi=bh.constructor;if(!this.__j(bh,bi,bf)||!this.__l(bi,bf)||!this.__m(bi,bf)){return false;}
;var bg=bf.$$extends;if(bg){for(var i=0,l=bg.length;i<l;i++ ){if(!this.objectImplements(bh,bg[i])){return false;}
;}
;}
;return true;}
,classImplements:function(bl,bj){if(!this.__j(bl.prototype,bl,bj)||!this.__l(bl,bj)||!this.__m(bl,bj)){return false;}
;var bk=bj.$$extends;if(bk){for(var i=0,l=bk.length;i<l;i++ ){if(!this.has(bl,bk[i])){return false;}
;}
;}
;return true;}
,genericToString:function(){return q+this.name+p;}
,$$registry:{},__n:function(bo,bn,bp,bm){}
,__h:null,__i:function(name,bq){}
}});}
)();
(function(){var a="ecmascript.error.toString",b="qx.lang.normalize.Error",c=": ",d="Error",e="";qx.Bootstrap.define(b,{statics:{toString:function(){var name=this.name||d;var f=this.message||e;if(name===e&&f===e){return d;}
;if(name===e){return f;}
;if(f===e){return name;}
;return name+c+f;}
},defer:function(g){if(!qx.core.Environment.get(a)){Error.prototype.toString=g.toString;}
;}
});}
)();
(function(){var a="qx.lang.normalize.Date",b="ecmascript.date.now";qx.Bootstrap.define(a,{statics:{now:function(){return +new Date();}
},defer:function(c){if(!qx.core.Environment.get(b)){Date.now=c.now;}
;}
});}
)();
(function(){var a='',b="ecmascript.string.trim",c="qx.lang.normalize.String";qx.Bootstrap.define(c,{statics:{trim:function(){return this.replace(/^\s+|\s+$/g,a);}
},defer:function(d){if(!qx.core.Environment.get(b)){String.prototype.trim=d.trim;}
;}
});}
)();
(function(){var b='!==inherit){',c='qx.lang.Type.isString(value) && qx.util.ColorUtil.isValidPropertyValue(value)',d='value !== null && qx.theme.manager.Font.getInstance().isDynamic(value)',e="set",f=';',g="resetThemed",h='value !== null && value.nodeType === 9 && value.documentElement',j='===value)return value;',k='value !== null && value.$$type === "Mixin"',m='return init;',n='var init=this.',o='value !== null && value.nodeType === 1 && value.attributes',p="var parent = this.getLayoutParent();",q="Error in property ",r='var a=this._getChildren();if(a)for(var i=0,l=a.length;i<l;i++){',s="();",t='.validate.call(this, value);',u='qx.core.Assert.assertInstance(value, Date, msg) || true',v='else{',w="if (!parent) return;",x=" in method ",y='qx.core.Assert.assertInstance(value, Error, msg) || true',z='=computed;',A='Undefined value is not allowed!',B='(backup);',C='else ',D='=true;',E='if(old===undefined)old=this.',F='if(computed===inherit){',G='old=computed=this.',H="inherit",I='if(this.',J='return this.',K='else if(this.',L='Is invalid!',M='if(value===undefined)prop.error(this,2,"',N='", "',O='var computed, old=this.',P='else if(computed===undefined)',Q='delete this.',R="resetRuntime",S="': ",T=" of class ",U='value !== null && value.nodeType !== undefined',V='===undefined)return;',W='value !== null && qx.theme.manager.Decoration.getInstance().isValidPropertyValue(value)',X="reset",Y="string",ba="')){",bb="module.events",bc="return this.",bd='qx.core.Assert.assertPositiveInteger(value, msg) || true',be='else this.',bf='value=this.',bg='","',bh='if(init==qx.core.Property.$$inherit)init=null;',bi="get",bj='value !== null && value.$$type === "Interface"',bk='var inherit=prop.$$inherit;',bl="', qx.event.type.Data, [computed, old]",bm="var value = parent.",bn="$$useinit_",bo='computed=undefined;delete this.',bp="(value);",bq='this.',br='Requires exactly one argument!',bs='",value);',bt='computed=value;',bu="$$runtime_",bv="setThemed",bw=';}',bx='(value);',by="$$user_",bz='!==undefined)',bA='){',bB='qx.core.Assert.assertArray(value, msg) || true',bC='if(computed===undefined||computed===inherit){',bD=";",bE='qx.core.Assert.assertPositiveNumber(value, msg) || true',bF=".prototype",bG="Boolean",bH=")}",bI="(a[",bJ='(computed, old, "',bK="setRuntime",bL='return value;',bM="this.",bN='if(init==qx.core.Property.$$inherit)throw new Error("Inheritable property ',bO="if(reg.hasListener(this, '",bP='Does not allow any arguments!',bQ=')a[i].',bR="()",bS="var a=arguments[0] instanceof Array?arguments[0]:arguments;",bT='.$$properties.',bU='value !== null && value.$$type === "Theme"',bV='old=this.',bW="var reg=qx.event.Registration;",bX="())",bY='=value;',ca='return null;',cb='qx.core.Assert.assertObject(value, msg) || true',cc='");',cd='if(old===computed)return value;',ce='qx.core.Assert.assertString(value, msg) || true',cf='if(old===undefined)old=null;',cg='var pa=this.getLayoutParent();if(pa)computed=pa.',ch="if (value===undefined) value = parent.",ci='value !== null && value.$$type === "Class"',cj='qx.core.Assert.assertFunction(value, msg) || true',ck='!==undefined&&',cl='var computed, old;',cm='var backup=computed;',cn='}else{',co='}',cp="object",cq="$$init_",cr="$$theme_",cs='!==undefined){',ct='if(computed===undefined)computed=null;',cu="Unknown reason: ",cv="init",cw='qx.core.Assert.assertMap(value, msg) || true',cx='qx.core.Assert.assertNumber(value, msg) || true',cy='if((computed===undefined||computed===inherit)&&',cz="reg.fireEvent(this, '",cA='Null value is not allowed!',cB='qx.core.Assert.assertInteger(value, msg) || true',cC="value",cD="shorthand",cE='computed=this.',cF='qx.core.Assert.assertInstance(value, RegExp, msg) || true',cG='value !== null && value.type !== undefined',cH='value !== null && value.document',cI="",cJ='throw new Error("Property ',cK="(!this.",cL='qx.core.Assert.assertBoolean(value, msg) || true',cM='if(a[i].',cN=' of an instance of ',cO="toggle",cP="refresh",cQ="$$inherit_",cR='var prop=qx.core.Property;',cS="boolean",cT=" with incoming value '",cU="a=qx.lang.Array.fromShortHand(qx.lang.Array.fromArguments(a));",cV='if(computed===undefined||computed==inherit)computed=null;',cW="qx.core.Property",cX="is",cY=' is not (yet) ready!");',da="]);",db='Could not change or apply init value after constructing phase!';qx.Bootstrap.define(cW,{statics:{__o:function(){if(qx.core.Environment.get(bb)){qx.event.type.Data;qx.event.dispatch.Direct;}
;}
,__p:{"Boolean":cL,"String":ce,"Number":cx,"Integer":cB,"PositiveNumber":bE,"PositiveInteger":bd,"Error":y,"RegExp":cF,"Object":cb,"Array":bB,"Map":cw,"Function":cj,"Date":u,"Node":U,"Element":o,"Document":h,"Window":cH,"Event":cG,"Class":ci,"Mixin":k,"Interface":bj,"Theme":bU,"Color":c,"Decorator":W,"Font":d},__q:{"Node":true,"Element":true,"Document":true,"Window":true,"Event":true},$$inherit:H,$$store:{runtime:{},user:{},theme:{},inherit:{},init:{},useinit:{}},$$method:{get:{},set:{},reset:{},init:{},refresh:{},setRuntime:{},resetRuntime:{},setThemed:{},resetThemed:{}},$$allowedKeys:{name:Y,dereference:cS,inheritable:cS,nullable:cS,themeable:cS,refine:cS,init:null,apply:Y,event:Y,check:null,transform:Y,deferredInit:cS,validate:null},$$allowedGroupKeys:{name:Y,group:cp,mode:Y,themeable:cS},$$inheritable:{},__r:function(de){var dc=this.__s(de);if(!dc.length){var dd=function(){}
;}
else {dd=this.__t(dc);}
;de.prototype.$$refreshInheritables=dd;}
,__s:function(df){var dg=[];while(df){var dh=df.$$properties;if(dh){for(var name in this.$$inheritable){if(dh[name]&&dh[name].inheritable){dg.push(name);}
;}
;}
;df=df.superclass;}
;return dg;}
,__t:function(inheritables){var inherit=this.$$store.inherit;var init=this.$$store.init;var refresh=this.$$method.refresh;var code=[p,w];for(var i=0,l=inheritables.length;i<l;i++ ){var name=inheritables[i];code.push(bm,inherit[name],bD,ch,init[name],bD,bM,refresh[name],bp);}
;return new Function(code.join(cI));}
,attachRefreshInheritables:function(di){di.prototype.$$refreshInheritables=function(){qx.core.Property.__r(di);return this.$$refreshInheritables();}
;}
,attachMethods:function(dk,name,dj){dj.group?this.__u(dk,dj,name):this.__v(dk,dj,name);}
,__u:function(clazz,config,name){var upname=qx.Bootstrap.firstUp(name);var members=clazz.prototype;var themeable=config.themeable===true;{}
;var setter=[];var resetter=[];if(themeable){var styler=[];var unstyler=[];}
;var argHandler=bS;setter.push(argHandler);if(themeable){styler.push(argHandler);}
;if(config.mode==cD){var shorthand=cU;setter.push(shorthand);if(themeable){styler.push(shorthand);}
;}
;for(var i=0,a=config.group,l=a.length;i<l;i++ ){{}
;setter.push(bM,this.$$method.set[a[i]],bI,i,da);resetter.push(bM,this.$$method.reset[a[i]],s);if(themeable){{}
;styler.push(bM,this.$$method.setThemed[a[i]],bI,i,da);unstyler.push(bM,this.$$method.resetThemed[a[i]],s);}
;}
;this.$$method.set[name]=e+upname;members[this.$$method.set[name]]=new Function(setter.join(cI));this.$$method.reset[name]=X+upname;members[this.$$method.reset[name]]=new Function(resetter.join(cI));if(themeable){this.$$method.setThemed[name]=bv+upname;members[this.$$method.setThemed[name]]=new Function(styler.join(cI));this.$$method.resetThemed[name]=g+upname;members[this.$$method.resetThemed[name]]=new Function(unstyler.join(cI));}
;}
,__v:function(clazz,config,name){var upname=qx.Bootstrap.firstUp(name);var members=clazz.prototype;{}
;if(config.dereference===undefined&&typeof config.check===Y){config.dereference=this.__w(config.check);}
;var method=this.$$method;var store=this.$$store;store.runtime[name]=bu+name;store.user[name]=by+name;store.theme[name]=cr+name;store.init[name]=cq+name;store.inherit[name]=cQ+name;store.useinit[name]=bn+name;method.get[name]=bi+upname;members[method.get[name]]=function(){return qx.core.Property.executeOptimizedGetter(this,clazz,name,bi);}
;method.set[name]=e+upname;members[method.set[name]]=function(dl){return qx.core.Property.executeOptimizedSetter(this,clazz,name,e,arguments);}
;method.reset[name]=X+upname;members[method.reset[name]]=function(){return qx.core.Property.executeOptimizedSetter(this,clazz,name,X);}
;if(config.inheritable||config.apply||config.event||config.deferredInit){method.init[name]=cv+upname;members[method.init[name]]=function(dm){return qx.core.Property.executeOptimizedSetter(this,clazz,name,cv,arguments);}
;{}
;}
;if(config.inheritable){method.refresh[name]=cP+upname;members[method.refresh[name]]=function(dn){return qx.core.Property.executeOptimizedSetter(this,clazz,name,cP,arguments);}
;{}
;}
;method.setRuntime[name]=bK+upname;members[method.setRuntime[name]]=function(dp){return qx.core.Property.executeOptimizedSetter(this,clazz,name,bK,arguments);}
;method.resetRuntime[name]=R+upname;members[method.resetRuntime[name]]=function(){return qx.core.Property.executeOptimizedSetter(this,clazz,name,R);}
;if(config.themeable){method.setThemed[name]=bv+upname;members[method.setThemed[name]]=function(dq){return qx.core.Property.executeOptimizedSetter(this,clazz,name,bv,arguments);}
;method.resetThemed[name]=g+upname;members[method.resetThemed[name]]=function(){return qx.core.Property.executeOptimizedSetter(this,clazz,name,g);}
;{}
;}
;if(config.check===bG){members[cO+upname]=new Function(bc+method.set[name]+cK+method.get[name]+bX);members[cX+upname]=new Function(bc+method.get[name]+bR);{}
;}
;{}
;}
,__w:function(dr){return !!this.__q[dr];}
,__x:{'0':db,'1':br,'2':A,'3':bP,'4':cA,'5':L},error:function(ds,dy,dx,dt,du){var dv=ds.constructor.classname;var dw=q+dx+T+dv+x+this.$$method[dt][dx]+cT+du+S;throw new Error(dw+(this.__x[dy]||cu+dy));}
,__y:function(instance,members,name,variant,code,args){var store=this.$$method[variant][name];{members[store]=new Function(cC,code.join(cI));}
;{}
;qx.Bootstrap.setDisplayName(members[store],instance.classname+bF,store);if(args===undefined){return instance[store]();}
else {return instance[store](args[0]);}
;}
,executeOptimizedGetter:function(dC,dB,name,dA){var dE=dB.$$properties[name];var dD=dB.prototype;var dz=[];var dF=this.$$store;dz.push(I,dF.runtime[name],bz);dz.push(J,dF.runtime[name],f);if(dE.inheritable){dz.push(K,dF.inherit[name],bz);dz.push(J,dF.inherit[name],f);dz.push(C);}
;dz.push(I,dF.user[name],bz);dz.push(J,dF.user[name],f);if(dE.themeable){dz.push(K,dF.theme[name],bz);dz.push(J,dF.theme[name],f);}
;if(dE.deferredInit&&dE.init===undefined){dz.push(K,dF.init[name],bz);dz.push(J,dF.init[name],f);}
;dz.push(C);if(dE.init!==undefined){if(dE.inheritable){dz.push(n,dF.init[name],f);if(dE.nullable){dz.push(bh);}
else if(dE.init!==undefined){dz.push(J,dF.init[name],f);}
else {dz.push(bN,name,cN,dB.classname,cY);}
;dz.push(m);}
else {dz.push(J,dF.init[name],f);}
;}
else if(dE.inheritable||dE.nullable){dz.push(ca);}
else {dz.push(cJ,name,cN,dB.classname,cY);}
;return this.__y(dC,dD,name,dA,dz);}
,executeOptimizedSetter:function(dM,dL,name,dK,dJ){var dO=dL.$$properties[name];var dN=dL.prototype;var dH=[];var dG=dK===e||dK===bv||dK===bK||(dK===cv&&dO.init===undefined);var dI=dO.apply||dO.event||dO.inheritable;var dP=this.__z(dK,name);this.__A(dH,dO,name,dK,dG);if(dG){this.__B(dH,dL,dO,name);}
;if(dI){this.__C(dH,dG,dP,dK);}
;if(dO.inheritable){dH.push(bk);}
;{}
;if(!dI){this.__E(dH,name,dK,dG);}
else {this.__F(dH,dO,name,dK,dG);}
;if(dO.inheritable){this.__G(dH,dO,name,dK);}
else if(dI){this.__H(dH,dO,name,dK);}
;if(dI){this.__I(dH,dO,name,dK);if(dO.inheritable&&dN._getChildren){this.__J(dH,name);}
;}
;if(dG){dH.push(bL);}
;return this.__y(dM,dN,name,dK,dH,dJ);}
,__z:function(dQ,name){if(dQ===bK||dQ===R){var dR=this.$$store.runtime[name];}
else if(dQ===bv||dQ===g){dR=this.$$store.theme[name];}
else if(dQ===cv){dR=this.$$store.init[name];}
else {dR=this.$$store.user[name];}
;return dR;}
,__A:function(dU,dS,name,dV,dT){{if(!dS.nullable||dS.check||dS.inheritable){dU.push(cR);}
;if(dV===e){dU.push(M,name,bg,dV,bs);}
;}
;}
,__B:function(dW,dY,dX,name){if(dX.transform){dW.push(bf,dX.transform,bx);}
;if(dX.validate){if(typeof dX.validate===Y){dW.push(bq,dX.validate,bx);}
else if(dX.validate instanceof Function){dW.push(dY.classname,bT,name);dW.push(t);}
;}
;}
,__C:function(eb,ea,ed,ec){var ee=(ec===X||ec===g||ec===R);if(ea){eb.push(I,ed,j);}
else if(ee){eb.push(I,ed,V);}
;}
,__D:undefined,__E:function(eg,name,eh,ef){if(eh===bK){eg.push(bq,this.$$store.runtime[name],bY);}
else if(eh===R){eg.push(I,this.$$store.runtime[name],bz);eg.push(Q,this.$$store.runtime[name],f);}
else if(eh===e){eg.push(bq,this.$$store.user[name],bY);}
else if(eh===X){eg.push(I,this.$$store.user[name],bz);eg.push(Q,this.$$store.user[name],f);}
else if(eh===bv){eg.push(bq,this.$$store.theme[name],bY);}
else if(eh===g){eg.push(I,this.$$store.theme[name],bz);eg.push(Q,this.$$store.theme[name],f);}
else if(eh===cv&&ef){eg.push(bq,this.$$store.init[name],bY);}
;}
,__F:function(ek,ei,name,el,ej){if(ei.inheritable){ek.push(O,this.$$store.inherit[name],f);}
else {ek.push(cl);}
;ek.push(I,this.$$store.runtime[name],cs);if(el===bK){ek.push(cE,this.$$store.runtime[name],bY);}
else if(el===R){ek.push(Q,this.$$store.runtime[name],f);ek.push(I,this.$$store.user[name],bz);ek.push(cE,this.$$store.user[name],f);ek.push(K,this.$$store.theme[name],bz);ek.push(cE,this.$$store.theme[name],f);ek.push(K,this.$$store.init[name],cs);ek.push(cE,this.$$store.init[name],f);ek.push(bq,this.$$store.useinit[name],D);ek.push(co);}
else {ek.push(G,this.$$store.runtime[name],f);if(el===e){ek.push(bq,this.$$store.user[name],bY);}
else if(el===X){ek.push(Q,this.$$store.user[name],f);}
else if(el===bv){ek.push(bq,this.$$store.theme[name],bY);}
else if(el===g){ek.push(Q,this.$$store.theme[name],f);}
else if(el===cv&&ej){ek.push(bq,this.$$store.init[name],bY);}
;}
;ek.push(co);ek.push(K,this.$$store.user[name],cs);if(el===e){if(!ei.inheritable){ek.push(bV,this.$$store.user[name],f);}
;ek.push(cE,this.$$store.user[name],bY);}
else if(el===X){if(!ei.inheritable){ek.push(bV,this.$$store.user[name],f);}
;ek.push(Q,this.$$store.user[name],f);ek.push(I,this.$$store.runtime[name],bz);ek.push(cE,this.$$store.runtime[name],f);ek.push(I,this.$$store.theme[name],bz);ek.push(cE,this.$$store.theme[name],f);ek.push(K,this.$$store.init[name],cs);ek.push(cE,this.$$store.init[name],f);ek.push(bq,this.$$store.useinit[name],D);ek.push(co);}
else {if(el===bK){ek.push(cE,this.$$store.runtime[name],bY);}
else if(ei.inheritable){ek.push(cE,this.$$store.user[name],f);}
else {ek.push(G,this.$$store.user[name],f);}
;if(el===bv){ek.push(bq,this.$$store.theme[name],bY);}
else if(el===g){ek.push(Q,this.$$store.theme[name],f);}
else if(el===cv&&ej){ek.push(bq,this.$$store.init[name],bY);}
;}
;ek.push(co);if(ei.themeable){ek.push(K,this.$$store.theme[name],cs);if(!ei.inheritable){ek.push(bV,this.$$store.theme[name],f);}
;if(el===bK){ek.push(cE,this.$$store.runtime[name],bY);}
else if(el===e){ek.push(cE,this.$$store.user[name],bY);}
else if(el===bv){ek.push(cE,this.$$store.theme[name],bY);}
else if(el===g){ek.push(Q,this.$$store.theme[name],f);ek.push(I,this.$$store.init[name],cs);ek.push(cE,this.$$store.init[name],f);ek.push(bq,this.$$store.useinit[name],D);ek.push(co);}
else if(el===cv){if(ej){ek.push(bq,this.$$store.init[name],bY);}
;ek.push(cE,this.$$store.theme[name],f);}
else if(el===cP){ek.push(cE,this.$$store.theme[name],f);}
;ek.push(co);}
;ek.push(K,this.$$store.useinit[name],bA);if(!ei.inheritable){ek.push(bV,this.$$store.init[name],f);}
;if(el===cv){if(ej){ek.push(cE,this.$$store.init[name],bY);}
else {ek.push(cE,this.$$store.init[name],f);}
;}
else if(el===e||el===bK||el===bv||el===cP){ek.push(Q,this.$$store.useinit[name],f);if(el===bK){ek.push(cE,this.$$store.runtime[name],bY);}
else if(el===e){ek.push(cE,this.$$store.user[name],bY);}
else if(el===bv){ek.push(cE,this.$$store.theme[name],bY);}
else if(el===cP){ek.push(cE,this.$$store.init[name],f);}
;}
;ek.push(co);if(el===e||el===bK||el===bv||el===cv){ek.push(v);if(el===bK){ek.push(cE,this.$$store.runtime[name],bY);}
else if(el===e){ek.push(cE,this.$$store.user[name],bY);}
else if(el===bv){ek.push(cE,this.$$store.theme[name],bY);}
else if(el===cv){if(ej){ek.push(cE,this.$$store.init[name],bY);}
else {ek.push(cE,this.$$store.init[name],f);}
;ek.push(bq,this.$$store.useinit[name],D);}
;ek.push(co);}
;}
,__G:function(en,em,name,eo){en.push(bC);if(eo===cP){en.push(bt);}
else {en.push(cg,this.$$store.inherit[name],f);}
;en.push(cy);en.push(bq,this.$$store.init[name],ck);en.push(bq,this.$$store.init[name],b);en.push(cE,this.$$store.init[name],f);en.push(bq,this.$$store.useinit[name],D);en.push(cn);en.push(Q,this.$$store.useinit[name],bw);en.push(co);en.push(cd);en.push(F);en.push(bo,this.$$store.inherit[name],f);en.push(co);en.push(P);en.push(Q,this.$$store.inherit[name],f);en.push(be,this.$$store.inherit[name],z);en.push(cm);if(em.init!==undefined&&eo!==cv){en.push(E,this.$$store.init[name],bD);}
else {en.push(cf);}
;en.push(cV);}
,__H:function(eq,ep,name,er){if(er!==e&&er!==bK&&er!==bv){eq.push(ct);}
;eq.push(cd);if(ep.init!==undefined&&er!==cv){eq.push(E,this.$$store.init[name],bD);}
else {eq.push(cf);}
;}
,__I:function(et,es,name,eu){if(es.apply){et.push(bq,es.apply,bJ,name,N,eu,cc);}
;if(es.event){et.push(bW,bO,es.event,ba,cz,es.event,bl,bH);}
;}
,__J:function(ev,name){ev.push(r);ev.push(cM,this.$$method.refresh[name],bQ,this.$$method.refresh[name],B);ev.push(co);}
}});}
)();
(function(){var b=".prototype",c="$$init_",d="constructor",e="Property module disabled.",f="extend",g="module.property",h="singleton",j="qx.event.type.Data",k="module.events",m="toString",n='extend',o="Array",p="static",q="",r="Events module not enabled.",s="]",t="Class",u="qx.Class",v='"extend" parameter is null or undefined',w="[Class ",x="destruct",y=".";qx.Bootstrap.define(u,{statics:{__K:qx.core.Environment.get(g)?qx.core.Property:null,define:function(name,C){if(!C){C={};}
;if(C.include&&!(qx.Bootstrap.getClass(C.include)===o)){C.include=[C.include];}
;if(C.implement&&!(qx.Bootstrap.getClass(C.implement)===o)){C.implement=[C.implement];}
;var z=false;if(!C.hasOwnProperty(f)&&!C.type){C.type=p;z=true;}
;{}
;var A=this.__N(name,C.type,C.extend,C.statics,C.construct,C.destruct,C.include);if(C.extend){if(C.properties){this.__P(A,C.properties,true);}
;if(C.members){this.__R(A,C.members,true,true,false);}
;if(C.events){this.__O(A,C.events,true);}
;if(C.include){for(var i=0,l=C.include.length;i<l;i++ ){this.__V(A,C.include[i],false);}
;}
;}
else if(C.hasOwnProperty(n)&&false){throw new Error(v);}
;if(C.environment){for(var B in C.environment){qx.core.Environment.add(B,C.environment[B]);}
;}
;if(C.implement){for(var i=0,l=C.implement.length;i<l;i++ ){this.__T(A,C.implement[i]);}
;}
;{}
;if(C.defer){C.defer.self=A;C.defer(A,A.prototype,{add:function(name,D){var E={};E[name]=D;qx.Class.__P(A,E,true);}
});}
;return A;}
,undefine:function(name){delete this.$$registry[name];var H=name.split(y);var G=[window];for(var i=0;i<H.length;i++ ){G.push(G[i][H[i]]);}
;for(var i=G.length-1;i>=1;i-- ){var F=G[i];var parent=G[i-1];if(qx.Bootstrap.isFunction(F)||qx.Bootstrap.objectGetLength(F)===0){delete parent[H[i-1]];}
else {break;}
;}
;}
,isDefined:qx.util.OOUtil.classIsDefined,getTotalNumber:function(){return qx.Bootstrap.objectGetLength(this.$$registry);}
,getByName:qx.Bootstrap.getByName,include:function(J,I){{}
;qx.Class.__V(J,I,false);}
,patch:function(L,K){{}
;qx.Class.__V(L,K,true);}
,isSubClassOf:function(N,M){if(!N){return false;}
;if(N==M){return true;}
;if(N.prototype instanceof M){return true;}
;return false;}
,getPropertyDefinition:qx.util.OOUtil.getPropertyDefinition,getProperties:function(P){var O=[];while(P){if(P.$$properties){O.push.apply(O,Object.keys(P.$$properties));}
;P=P.superclass;}
;return O;}
,getByProperty:function(Q,name){while(Q){if(Q.$$properties&&Q.$$properties[name]){return Q;}
;Q=Q.superclass;}
;return null;}
,hasProperty:qx.util.OOUtil.hasProperty,getEventType:qx.util.OOUtil.getEventType,supportsEvent:qx.util.OOUtil.supportsEvent,hasOwnMixin:function(S,R){return S.$$includes&&S.$$includes.indexOf(R)!==-1;}
,getByMixin:function(V,U){var T,i,l;while(V){if(V.$$includes){T=V.$$flatIncludes;for(i=0,l=T.length;i<l;i++ ){if(T[i]===U){return V;}
;}
;}
;V=V.superclass;}
;return null;}
,getMixins:qx.util.OOUtil.getMixins,hasMixin:function(X,W){return !!this.getByMixin(X,W);}
,hasOwnInterface:function(ba,Y){return ba.$$implements&&ba.$$implements.indexOf(Y)!==-1;}
,getByInterface:qx.util.OOUtil.getByInterface,getInterfaces:function(bc){var bb=[];while(bc){if(bc.$$implements){bb.push.apply(bb,bc.$$flatImplements);}
;bc=bc.superclass;}
;return bb;}
,hasInterface:qx.util.OOUtil.hasInterface,implementsInterface:function(be,bd){var bf=be.constructor;if(this.hasInterface(bf,bd)){return true;}
;if(qx.Interface.objectImplements(be,bd)){return true;}
;if(qx.Interface.classImplements(bf,bd)){return true;}
;return false;}
,getInstance:function(){if(!this.$$instance){this.$$allowconstruct=true;this.$$instance=new this();delete this.$$allowconstruct;}
;return this.$$instance;}
,genericToString:function(){return w+this.classname+s;}
,$$registry:qx.Bootstrap.$$registry,__h:null,__L:null,__i:function(name,bg){}
,__M:function(bh){}
,__N:function(name,br,bq,bi,bo,bm,bl){var bn;if(!bq&&true){bn=bi||{};qx.Bootstrap.setDisplayNames(bn,name);}
else {bn={};if(bq){if(!bo){bo=this.__W();}
;if(this.__X(bq,bl)){bn=this.__Y(bo,name,br);}
else {bn=bo;}
;if(br===h){bn.getInstance=this.getInstance;}
;qx.Bootstrap.setDisplayName(bo,name,d);}
;if(bi){qx.Bootstrap.setDisplayNames(bi,name);var bp;for(var i=0,a=Object.keys(bi),l=a.length;i<l;i++ ){bp=a[i];var bj=bi[bp];{bn[bp]=bj;}
;}
;}
;}
;var bk=name?qx.Bootstrap.createNamespace(name,bn):q;bn.name=bn.classname=name;bn.basename=bk;bn.$$type=t;if(br){bn.$$classtype=br;}
;if(!bn.hasOwnProperty(m)){bn.toString=this.genericToString;}
;if(bq){qx.Bootstrap.extendClass(bn,bo,bq,name,bk);if(bm){{}
;bn.$$destructor=bm;qx.Bootstrap.setDisplayName(bm,name,x);}
;}
;this.$$registry[name]=bn;return bn;}
,__O:function(bs,bt,bv){{var bu,bu;}
;if(bs.$$events){for(var bu in bt){bs.$$events[bu]=bt[bu];}
;}
else {bs.$$events=bt;}
;}
,__P:function(bx,bA,by){if(!qx.core.Environment.get(g)){throw new Error(e);}
;var bz;if(by===undefined){by=false;}
;var bw=bx.prototype;for(var name in bA){bz=bA[name];{}
;bz.name=name;if(!bz.refine){if(bx.$$properties===undefined){bx.$$properties={};}
;bx.$$properties[name]=bz;}
;if(bz.init!==undefined){bx.prototype[c+name]=bz.init;}
;if(bz.event!==undefined){if(!qx.core.Environment.get(k)){throw new Error(r);}
;var event={};event[bz.event]=j;this.__O(bx,event,by);}
;if(bz.inheritable){this.__K.$$inheritable[name]=true;if(!bw.$$refreshInheritables){this.__K.attachRefreshInheritables(bx);}
;}
;if(!bz.refine){this.__K.attachMethods(bx,name,bz);}
;}
;}
,__Q:null,__R:function(bI,bB,bD,bF,bH){var bC=bI.prototype;var bG,bE;qx.Bootstrap.setDisplayNames(bB,bI.classname+b);for(var i=0,a=Object.keys(bB),l=a.length;i<l;i++ ){bG=a[i];bE=bB[bG];{}
;if(bF!==false&&bE instanceof Function&&bE.$$type==null){if(bH==true){bE=this.__S(bE,bC[bG]);}
else {if(bC[bG]){bE.base=bC[bG];}
;bE.self=bI;}
;{}
;}
;bC[bG]=bE;}
;}
,__S:function(bJ,bK){if(bK){return function(){var bM=bJ.base;bJ.base=bK;var bL=bJ.apply(this,arguments);bJ.base=bM;return bL;}
;}
else {return bJ;}
;}
,__T:function(bP,bN){{}
;var bO=qx.Interface.flatten([bN]);if(bP.$$implements){bP.$$implements.push(bN);bP.$$flatImplements.push.apply(bP.$$flatImplements,bO);}
else {bP.$$implements=[bN];bP.$$flatImplements=bO;}
;}
,__U:function(bR){var name=bR.classname;var bQ=this.__Y(bR,name,bR.$$classtype);for(var i=0,a=Object.keys(bR),l=a.length;i<l;i++ ){bS=a[i];bQ[bS]=bR[bS];}
;bQ.prototype=bR.prototype;var bU=bR.prototype;for(var i=0,a=Object.keys(bU),l=a.length;i<l;i++ ){bS=a[i];var bV=bU[bS];if(bV&&bV.self==bR){bV.self=bQ;}
;}
;for(var bS in this.$$registry){var bT=this.$$registry[bS];if(!bT){continue;}
;if(bT.base==bR){bT.base=bQ;}
;if(bT.superclass==bR){bT.superclass=bQ;}
;if(bT.$$original){if(bT.$$original.base==bR){bT.$$original.base=bQ;}
;if(bT.$$original.superclass==bR){bT.$$original.superclass=bQ;}
;}
;}
;qx.Bootstrap.createNamespace(name,bQ);this.$$registry[name]=bQ;return bQ;}
,__V:function(cc,ca,bY){{}
;if(this.hasMixin(cc,ca)){return;}
;var bW=cc.$$original;if(ca.$$constructor&&!bW){cc=this.__U(cc);}
;var bX=qx.Mixin.flatten([ca]);var cb;for(var i=0,l=bX.length;i<l;i++ ){cb=bX[i];if(cb.$$events){this.__O(cc,cb.$$events,bY);}
;if(cb.$$properties){this.__P(cc,cb.$$properties,bY);}
;if(cb.$$members){this.__R(cc,cb.$$members,bY,bY,bY);}
;}
;if(cc.$$includes){cc.$$includes.push(ca);cc.$$flatIncludes.push.apply(cc.$$flatIncludes,bX);}
else {cc.$$includes=[ca];cc.$$flatIncludes=bX;}
;}
,__W:function(){function cd(){cd.base.apply(this,arguments);}
;return cd;}
,__X:function(cf,ce){{}
;if(cf&&cf.$$includes){var cg=cf.$$flatIncludes;for(var i=0,l=cg.length;i<l;i++ ){if(cg[i].$$constructor){return true;}
;}
;}
;if(ce){var ch=qx.Mixin.flatten(ce);for(var i=0,l=ch.length;i<l;i++ ){if(ch[i].$$constructor){return true;}
;}
;}
;return false;}
,__Y:function(cj,name,ci){var cl=function(){var co=cl;{}
;var cm=co.$$original.apply(this,arguments);if(co.$$includes){var cn=co.$$flatIncludes;for(var i=0,l=cn.length;i<l;i++ ){if(cn[i].$$constructor){cn[i].$$constructor.apply(this,arguments);}
;}
;}
;{}
;return cm;}
;{var ck;}
;cl.$$original=cj;cj.wrapper=cl;return cl;}
},defer:function(){{var cp,cq,cr;}
;}
});}
)();
(function(){var a="qx.data.MBinding";qx.Mixin.define(a,{construct:function(){this.__ba=this.toHashCode();}
,members:{__ba:null,bind:function(b,e,c,d){return qx.data.SingleValueBinding.bind(this,b,e,c,d);}
,removeBinding:function(f){qx.data.SingleValueBinding.removeBindingFromObject(this,f);}
,removeRelatedBindings:function(g){qx.data.SingleValueBinding.removeRelatedBindings(this,g);}
,removeAllBindings:function(){qx.data.SingleValueBinding.removeAllBindingsForObject(this);}
,getBindings:function(){return qx.data.SingleValueBinding.getAllBindingsForObject(this);}
},destruct:function(){this.$$hash=this.__ba;this.removeAllBindings();delete this.$$hash;}
});}
)();
(function(){var a="qx.core.Aspect",b="before",c="*",d="static";qx.Bootstrap.define(a,{statics:{__bU:[],wrap:function(h,l,j){var m=[];var e=[];var k=this.__bU;var g;for(var i=0;i<k.length;i++ ){g=k[i];if((g.type==null||j==g.type||g.type==c)&&(g.name==null||h.match(g.name))){g.pos==-1?m.push(g.fcn):e.push(g.fcn);}
;}
;if(m.length===0&&e.length===0){return l;}
;var f=function(){for(var i=0;i<m.length;i++ ){m[i].call(this,h,l,j,arguments);}
;var n=l.apply(this,arguments);for(var i=0;i<e.length;i++ ){e[i].call(this,h,l,j,arguments,n);}
;return n;}
;if(j!==d){f.self=l.self;f.base=l.base;}
;l.wrapper=f;f.original=l;return f;}
,addAdvice:function(q,o,p,name){this.__bU.push({fcn:q,pos:o===b?-1:1,type:p,name:name});}
}});}
)();
(function(){var a=". Error message: ",b="Boolean",c=").",d="set",f="deepBinding",g=") to the object '",h="item",k="Please use only one array at a time: ",l="Integer",m="reset",n=" of object ",p="qx.data.SingleValueBinding",q="Binding property ",r="Failed so set value ",s="change",t="Binding could not be found!",u="get",v="^",w=" does not work.",x="String",y="Binding from '",z="",A="PositiveNumber",B="]",C="[",D=".",E="PositiveInteger",F='No number or \'last\' value hast been given in an array binding: ',G="' (",H=" on ",I="Binding does not exist!",J="Number",K=".[",L="Date",M=" not possible: No event available. ",N="last";qx.Class.define(p,{statics:{__bb:{},__bc:{},bind:function(R,bf,bd,T,bc){{}
;var bg=this.__be(R,bf,bd,T,bc);var V=bf.split(D);var Q=this.__bm(V);var ba=[];var U=[];var W=[];var bb=[];var S=R;try{for(var i=0;i<V.length;i++ ){if(Q[i]!==z){bb.push(s);}
else {bb.push(this.__bf(S,V[i]));}
;ba[i]=S;if(i==V.length-1){if(Q[i]!==z){var bi=Q[i]===N?S.length-1:Q[i];var P=S.getItem(bi);this.__bl(P,bd,T,bc,R);W[i]=this.__bn(S,bb[i],bd,T,bc,Q[i]);}
else {if(V[i]!=null&&S[u+qx.lang.String.firstUp(V[i])]!=null){var P=S[u+qx.lang.String.firstUp(V[i])]();this.__bl(P,bd,T,bc,R);}
;W[i]=this.__bn(S,bb[i],bd,T,bc);}
;}
else {var O={index:i,propertyNames:V,sources:ba,listenerIds:W,arrayIndexValues:Q,targetObject:bd,targetPropertyChain:T,options:bc,listeners:U};var Y=qx.lang.Function.bind(this.__bd,this,O);U.push(Y);W[i]=S.addListener(bb[i],Y);}
;if(S[u+qx.lang.String.firstUp(V[i])]==null){S=undefined;}
else if(Q[i]!==z){var bi=Q[i]===N?S.length-1:Q[i];S=S[u+qx.lang.String.firstUp(V[i])](bi);}
else {S=S[u+qx.lang.String.firstUp(V[i])]();if(S===null&&(V.length-1)!=i){S=undefined;}
;}
;if(!S){this.__bl(S,bd,T,bc,R);break;}
;}
;}
catch(bj){for(var i=0;i<ba.length;i++ ){if(ba[i]&&W[i]){ba[i].removeListenerById(W[i]);}
;}
;var X=bg.targets;var be=bg.listenerIds;for(var i=0;i<X.length;i++ ){if(X[i]&&be[i]){X[i].removeListenerById(be[i]);}
;}
;throw bj;}
;var bh={type:f,listenerIds:W,sources:ba,targetListenerIds:bg.listenerIds,targets:bg.targets};this.__bo(bh,R,bf,bd,T);return bh;}
,__bd:function(bq){if(bq.options&&bq.options.onUpdate){bq.options.onUpdate(bq.sources[bq.index],bq.targetObject);}
;for(var j=bq.index+1;j<bq.propertyNames.length;j++ ){var bo=bq.sources[j];bq.sources[j]=null;if(!bo){continue;}
;bo.removeListenerById(bq.listenerIds[j]);}
;var bo=bq.sources[bq.index];for(var j=bq.index+1;j<bq.propertyNames.length;j++ ){if(bq.arrayIndexValues[j-1]!==z){bo=bo[u+qx.lang.String.firstUp(bq.propertyNames[j-1])](bq.arrayIndexValues[j-1]);}
else {bo=bo[u+qx.lang.String.firstUp(bq.propertyNames[j-1])]();}
;bq.sources[j]=bo;if(!bo){if(bq.options&&bq.options.converter){var bk=false;if(bq.options.ignoreConverter){var br=bq.propertyNames.slice(0,j).join(D);var bp=br.match(new RegExp(v+bq.options.ignoreConverter));bk=bp?bp.length>0:false;}
;if(!bk){this.__bh(bq.targetObject,bq.targetPropertyChain,bq.options.converter());}
else {this.__bg(bq.targetObject,bq.targetPropertyChain);}
;}
else {this.__bg(bq.targetObject,bq.targetPropertyChain);}
;break;}
;if(j==bq.propertyNames.length-1){if(qx.Class.implementsInterface(bo,qx.data.IListData)){var bs=bq.arrayIndexValues[j]===N?bo.length-1:bq.arrayIndexValues[j];var bl=bo.getItem(bs);this.__bl(bl,bq.targetObject,bq.targetPropertyChain,bq.options,bq.sources[bq.index]);bq.listenerIds[j]=this.__bn(bo,s,bq.targetObject,bq.targetPropertyChain,bq.options,bq.arrayIndexValues[j]);}
else {if(bq.propertyNames[j]!=null&&bo[u+qx.lang.String.firstUp(bq.propertyNames[j])]!=null){var bl=bo[u+qx.lang.String.firstUp(bq.propertyNames[j])]();this.__bl(bl,bq.targetObject,bq.targetPropertyChain,bq.options,bq.sources[bq.index]);}
;var bm=this.__bf(bo,bq.propertyNames[j]);bq.listenerIds[j]=this.__bn(bo,bm,bq.targetObject,bq.targetPropertyChain,bq.options);}
;}
else {if(bq.listeners[j]==null){var bn=qx.lang.Function.bind(this.__bd,this,bq);bq.listeners.push(bn);}
;if(qx.Class.implementsInterface(bo,qx.data.IListData)){var bm=s;}
else {var bm=this.__bf(bo,bq.propertyNames[j]);}
;bq.listenerIds[j]=bo.addListener(bm,bq.listeners[j]);}
;}
;}
,__be:function(bu,bC,bG,by,bA){var bx=by.split(D);var bv=this.__bm(bx);var bF=[];var bE=[];var bz=[];var bD=[];var bw=bG;for(var i=0;i<bx.length-1;i++ ){if(bv[i]!==z){bD.push(s);}
else {try{bD.push(this.__bf(bw,bx[i]));}
catch(e){break;}
;}
;bF[i]=bw;var bB=function(){for(var j=i+1;j<bx.length-1;j++ ){var bJ=bF[j];bF[j]=null;if(!bJ){continue;}
;bJ.removeListenerById(bz[j]);}
;var bJ=bF[i];for(var j=i+1;j<bx.length-1;j++ ){var bH=qx.lang.String.firstUp(bx[j-1]);if(bv[j-1]!==z){var bK=bv[j-1]===N?bJ.getLength()-1:bv[j-1];bJ=bJ[u+bH](bK);}
else {bJ=bJ[u+bH]();}
;bF[j]=bJ;if(bE[j]==null){bE.push(bB);}
;if(qx.Class.implementsInterface(bJ,qx.data.IListData)){var bI=s;}
else {try{var bI=qx.data.SingleValueBinding.__bf(bJ,bx[j]);}
catch(e){break;}
;}
;bz[j]=bJ.addListener(bI,bE[j]);}
;qx.data.SingleValueBinding.updateTarget(bu,bC,bG,by,bA);}
;bE.push(bB);bz[i]=bw.addListener(bD[i],bB);var bt=qx.lang.String.firstUp(bx[i]);if(bw[u+bt]==null){bw=null;}
else if(bv[i]!==z){bw=bw[u+bt](bv[i]);}
else {bw=bw[u+bt]();}
;if(!bw){break;}
;}
;return {listenerIds:bz,targets:bF};}
,updateTarget:function(bL,bO,bQ,bM,bP){var bN=this.resolvePropertyChain(bL,bO);bN=qx.data.SingleValueBinding.__bp(bN,bQ,bM,bP,bL);this.__bh(bQ,bM,bN);}
,resolvePropertyChain:function(o,bR){var bS=this.__bj(bR);return this.__bk(o,bS,bS.length);}
,__bf:function(bU,bV){var bT=this.__bq(bU,bV);if(bT==null){if(qx.Class.supportsEvent(bU.constructor,bV)){bT=bV;}
else if(qx.Class.supportsEvent(bU.constructor,s+qx.lang.String.firstUp(bV))){bT=s+qx.lang.String.firstUp(bV);}
else {throw new qx.core.AssertionError(q+bV+n+bU+M);}
;}
;return bT;}
,__bg:function(cb,bY){var ca=this.__bj(bY);var bX=this.__bk(cb,ca);if(bX!=null){var cc=ca[ca.length-1];var bW=this.__bi(cc);if(bW){this.__bh(cb,bY,null);return;}
;if(bX[m+qx.lang.String.firstUp(cc)]!=undefined){bX[m+qx.lang.String.firstUp(cc)]();}
else {bX[d+qx.lang.String.firstUp(cc)](null);}
;}
;}
,__bh:function(ci,cf,cg){var ch=this.__bj(cf);var ce=this.__bk(ci,ch);if(ce){var cj=ch[ch.length-1];var cd=this.__bi(cj);if(cd){if(cd===N){cd=ce.length-1;}
;ce.setItem(cd,cg);}
else {ce[d+qx.lang.String.firstUp(cj)](cg);}
;}
;}
,__bi:function(cm){var ck=/^\[(\d+|last)\]$/;var cl=cm.match(ck);if(cl){return cl[1];}
;return null;}
,__bj:function(cn){return cn.replace(/\[/g,K).split(D).filter(function(co){return co!==z;}
);}
,__bk:function(cu,cp,cq){cq=cq||cp.length-1;var cs=cu;for(var i=0;i<cq;i++ ){try{var ct=cp[i];var cr=this.__bi(ct);if(cr){if(cr===N){cr=cs.length-1;}
;cs=cs.getItem(cr);}
else {cs=cs[u+qx.lang.String.firstUp(ct)]();}
;}
catch(cv){return null;}
;}
;return cs;}
,__bl:function(cA,cw,cy,cz,cx){cA=this.__bp(cA,cw,cy,cz,cx);if(cA===undefined){this.__bg(cw,cy);}
;if(cA!==undefined){try{this.__bh(cw,cy,cA);if(cz&&cz.onUpdate){cz.onUpdate(cx,cw,cA);}
;}
catch(e){if(!(e instanceof qx.core.ValidationError)){throw e;}
;if(cz&&cz.onSetFail){cz.onSetFail(e);}
else {qx.log.Logger.warn(r+cA+H+cw+a+e);}
;}
;}
;}
,__bm:function(cB){var cC=[];for(var i=0;i<cB.length;i++ ){var name=cB[i];if(qx.lang.String.endsWith(name,B)){var cD=name.substring(name.indexOf(C)+1,name.indexOf(B));if(name.indexOf(B)!=name.length-1){throw new Error(k+name+w);}
;if(cD!==N){if(cD==z||isNaN(parseInt(cD,10))){throw new Error(F+name+w);}
;}
;if(name.indexOf(C)!=0){cB[i]=name.substring(0,name.indexOf(C));cC[i]=z;cC[i+1]=cD;cB.splice(i+1,0,h);i++ ;}
else {cC[i]=cD;cB.splice(i,1,h);}
;}
else {cC[i]=z;}
;}
;return cC;}
,__bn:function(cE,cH,cM,cK,cI,cG){{var cF;}
;var cJ=function(cP,e){if(cP!==z){if(cP===N){cP=cE.length-1;}
;var cQ=cE.getItem(cP);if(cQ===undefined){qx.data.SingleValueBinding.__bg(cM,cK);}
;var cO=e.getData().start;var cN=e.getData().end;if(cP<cO||cP>cN){return;}
;}
else {var cQ=e.getData();}
;{}
;cQ=qx.data.SingleValueBinding.__bp(cQ,cM,cK,cI,cE);{}
;try{if(cQ!==undefined){qx.data.SingleValueBinding.__bh(cM,cK,cQ);}
else {qx.data.SingleValueBinding.__bg(cM,cK);}
;if(cI&&cI.onUpdate){cI.onUpdate(cE,cM,cQ);}
;}
catch(cR){if(!(cR instanceof qx.core.ValidationError)){throw cR;}
;if(cI&&cI.onSetFail){cI.onSetFail(cR);}
else {qx.log.Logger.warn(r+cQ+H+cM+a+cR);}
;}
;}
;if(!cG){cG=z;}
;cJ=qx.lang.Function.bind(cJ,cE,cG);var cL=cE.addListener(cH,cJ);return cL;}
,__bo:function(cX,cS,cV,cY,cW){var cT;cT=cS.toHashCode();if(this.__bb[cT]===undefined){this.__bb[cT]=[];}
;var cU=[cX,cS,cV,cY,cW];this.__bb[cT].push(cU);cT=cY.toHashCode();if(this.__bc[cT]===undefined){this.__bc[cT]=[];}
;this.__bc[cT].push(cU);}
,__bp:function(dd,dj,dc,df,da){if(df&&df.converter){var dg;if(dj.getModel){dg=dj.getModel();}
;return df.converter(dd,dg,da,dj);}
else {var de=this.__bj(dc);var db=this.__bk(dj,de);var dk=dc.substring(dc.lastIndexOf(D)+1,dc.length);if(db==null){return dd;}
;var dh=qx.Class.getPropertyDefinition(db.constructor,dk);var di=dh==null?z:dh.check;return this.__br(dd,di);}
;}
,__bq:function(dl,dn){var dm=qx.Class.getPropertyDefinition(dl.constructor,dn);if(dm==null){return null;}
;return dm.event;}
,__br:function(dr,dq){var dp=qx.lang.Type.getClass(dr);if((dp==J||dp==x)&&(dq==l||dq==E)){dr=parseInt(dr,10);}
;if((dp==b||dp==J||dp==L)&&dq==x){dr=dr+z;}
;if((dp==J||dp==x)&&(dq==J||dq==A)){dr=parseFloat(dr);}
;return dr;}
,removeBindingFromObject:function(ds,dw){if(dw.type==f){for(var i=0;i<dw.sources.length;i++ ){if(dw.sources[i]){dw.sources[i].removeListenerById(dw.listenerIds[i]);}
;}
;for(var i=0;i<dw.targets.length;i++ ){if(dw.targets[i]){dw.targets[i].removeListenerById(dw.targetListenerIds[i]);}
;}
;}
else {ds.removeListenerById(dw);}
;var dv=this.getAllBindingsForObject(ds);if(dv!=undefined){for(var i=0;i<dv.length;i++ ){if(dv[i][0]==dw){var dt=dv[i][3];if(this.__bc[dt.toHashCode()]){qx.lang.Array.remove(this.__bc[dt.toHashCode()],dv[i]);}
;var du=dv[i][1];if(this.__bb[du.toHashCode()]){qx.lang.Array.remove(this.__bb[du.toHashCode()],dv[i]);}
;return;}
;}
;}
;throw new Error(t);}
,removeAllBindingsForObject:function(dy){{}
;var dx=this.getAllBindingsForObject(dy);if(dx!=undefined){for(var i=dx.length-1;i>=0;i-- ){this.removeBindingFromObject(dy,dx[i][0]);}
;}
;}
,removeRelatedBindings:function(dA,dB){{}
;var dD=this.getAllBindingsForObject(dA);if(dD!=undefined){for(var i=dD.length-1;i>=0;i-- ){var dC=dD[i][1];var dz=dD[i][3];if(dC===dB||dz===dB){this.removeBindingFromObject(dA,dD[i][0]);}
;}
;}
;}
,getAllBindingsForObject:function(dF){var dG=dF.toHashCode();if(this.__bb[dG]===undefined){this.__bb[dG]=[];}
;var dH=this.__bb[dG];var dE=this.__bc[dG]?this.__bc[dG]:[];return qx.lang.Array.unique(dH.concat(dE));}
,removeAllBindings:function(){for(var dJ in this.__bb){var dI=qx.core.ObjectRegistry.fromHashCode(dJ);if(dI==null){delete this.__bb[dJ];continue;}
;this.removeAllBindingsForObject(dI);}
;this.__bb={};}
,getAllBindings:function(){return this.__bb;}
,showBindingInLog:function(dL,dN){var dM;for(var i=0;i<this.__bb[dL.toHashCode()].length;i++ ){if(this.__bb[dL.toHashCode()][i][0]==dN){dM=this.__bb[dL.toHashCode()][i];break;}
;}
;if(dM===undefined){var dK=I;}
else {var dK=y+dM[1]+G+dM[2]+g+dM[3]+G+dM[4]+c;}
;qx.log.Logger.debug(dK);}
,showAllBindingsInLog:function(){for(var dP in this.__bb){var dO=qx.core.ObjectRegistry.fromHashCode(dP);for(var i=0;i<this.__bb[dP].length;i++ ){this.showBindingInLog(dO,this.__bb[dP][i][0]);}
;}
;}
}});}
)();
(function(){var a="anonymous",b="...",c="qx.dev.StackTrace",d="",e="\n",f="?",g="/source/class/",h="Error created at",j="ecmascript.error.stacktrace",k="Backtrace:",l="stack",m=":",n=".",o="function",p="prototype",q="stacktrace";qx.Bootstrap.define(c,{statics:{FILENAME_TO_CLASSNAME:null,FORMAT_STACKTRACE:null,getStackTrace:function(){var t=[];try{throw new Error();}
catch(G){if(qx.dev.StackTrace.hasEnvironmentCheck&&qx.core.Environment.get(j)){var y=qx.dev.StackTrace.getStackTraceFromError(G);var B=qx.dev.StackTrace.getStackTraceFromCaller(arguments);qx.lang.Array.removeAt(y,0);t=B.length>y.length?B:y;for(var i=0;i<Math.min(B.length,y.length);i++ ){var w=B[i];if(w.indexOf(a)>=0){continue;}
;var s=null;var C=w.split(n);var v=/(.*?)\(/.exec(C[C.length-1]);if(v&&v.length==2){s=v[1];C.pop();}
;if(C[C.length-1]==p){C.pop();}
;var E=C.join(n);var u=y[i];var F=u.split(m);var A=F[0];var z=F[1];var r;if(F[2]){r=F[2];}
;var x=null;if(qx.Class&&qx.Class.getByName(A)){x=A;}
else {x=E;}
;var D=x;if(s){D+=n+s;}
;D+=m+z;if(r){D+=m+r;}
;t[i]=D;}
;}
else {t=this.getStackTraceFromCaller(arguments);}
;}
;return t;}
,getStackTraceFromCaller:function(K){var J=[];var M=qx.lang.Function.getCaller(K);var H={};while(M){var L=qx.lang.Function.getName(M);J.push(L);try{M=M.caller;}
catch(N){break;}
;if(!M){break;}
;var I=qx.core.ObjectRegistry.toHashCode(M);if(H[I]){J.push(b);break;}
;H[I]=M;}
;return J;}
,getStackTraceFromError:function(bd){var T=[];var R,S,ba,Q,P,bf,bb;var bc=qx.dev.StackTrace.hasEnvironmentCheck?qx.core.Environment.get(j):null;if(bc===l){if(!bd.stack){return T;}
;R=/@(.+):(\d+)$/gm;while((S=R.exec(bd.stack))!=null){bb=S[1];Q=S[2];ba=this.__bR(bb);T.push(ba+m+Q);}
;if(T.length>0){return this.__bT(T);}
;R=/at (.*)/gm;var be=/\((.*?)(:[^\/].*)\)/;var Y=/(.*?)(:[^\/].*)/;while((S=R.exec(bd.stack))!=null){var X=be.exec(S[1]);if(!X){X=Y.exec(S[1]);}
;if(X){ba=this.__bR(X[1]);T.push(ba+X[2]);}
else {T.push(S[1]);}
;}
;}
else if(bc===q){var U=bd.stacktrace;if(!U){return T;}
;if(U.indexOf(h)>=0){U=U.split(h)[0];}
;R=/line\ (\d+?),\ column\ (\d+?)\ in\ (?:.*?)\ in\ (.*?):[^\/]/gm;while((S=R.exec(U))!=null){Q=S[1];P=S[2];bb=S[3];ba=this.__bR(bb);T.push(ba+m+Q+m+P);}
;if(T.length>0){return this.__bT(T);}
;R=/Line\ (\d+?)\ of\ linked\ script\ (.*?)$/gm;while((S=R.exec(U))!=null){Q=S[1];bb=S[2];ba=this.__bR(bb);T.push(ba+m+Q);}
;}
else if(bd.message&&bd.message.indexOf(k)>=0){var W=bd.message.split(k)[1].trim();var V=W.split(e);for(var i=0;i<V.length;i++ ){var O=V[i].match(/\s*Line ([0-9]+) of.* (\S.*)/);if(O&&O.length>=2){Q=O[1];bf=this.__bR(O[2]);T.push(bf+m+Q);}
;}
;}
else if(bd.sourceURL&&bd.line){T.push(this.__bR(bd.sourceURL)+m+bd.line);}
;return this.__bT(T);}
,__bR:function(bh){if(typeof qx.dev.StackTrace.FILENAME_TO_CLASSNAME==o){var bg=qx.dev.StackTrace.FILENAME_TO_CLASSNAME(bh);{}
;return bg;}
;return qx.dev.StackTrace.__bS(bh);}
,__bS:function(bk){var bl=g;var bi=bk.indexOf(bl);var bm=bk.indexOf(f);if(bm>=0){bk=bk.substring(0,bm);}
;var bj=(bi==-1)?bk:bk.substring(bi+bl.length).replace(/\//g,n).replace(/\.js$/,d);return bj;}
,__bT:function(bn){if(typeof qx.dev.StackTrace.FORMAT_STACKTRACE==o){bn=qx.dev.StackTrace.FORMAT_STACKTRACE(bn);{}
;}
;return bn;}
},defer:function(bo){bo.hasEnvironmentCheck=qx.bom&&qx.bom.client&&qx.bom.client.EcmaScript&&qx.bom.client.EcmaScript.getStackTrace;}
});}
)();
(function(){var a="mshtml",b="engine.name",c="[object Array]",d="qx.lang.Array",e="Cannot clean-up map entry doneObjects[",f="]",g="qx",h="number",j="][",k="string";qx.Bootstrap.define(d,{statics:{cast:function(m,o,p){if(m.constructor===o){return m;}
;if(qx.data&&qx.data.IListData){if(qx.Class&&qx.Class.hasInterface(m,qx.data.IListData)){var m=m.toArray();}
;}
;var n=new o;if((qx.core.Environment.get(b)==a)){if(m.item){for(var i=p||0,l=m.length;i<l;i++ ){n.push(m[i]);}
;return n;}
;}
;if(Object.prototype.toString.call(m)===c&&p==null){n.push.apply(n,m);}
else {n.push.apply(n,Array.prototype.slice.call(m,p||0));}
;return n;}
,fromArguments:function(q,r){return Array.prototype.slice.call(q,r||0);}
,fromCollection:function(t){if((qx.core.Environment.get(b)==a)){if(t.item){var s=[];for(var i=0,l=t.length;i<l;i++ ){s[i]=t[i];}
;return s;}
;}
;return Array.prototype.slice.call(t,0);}
,fromShortHand:function(u){var w=u.length;var v=qx.lang.Array.clone(u);switch(w){case 1:v[1]=v[2]=v[3]=v[0];break;case 2:v[2]=v[0];case 3:v[3]=v[1];};return v;}
,clone:function(x){return x.concat();}
,insertAt:function(y,z,i){y.splice(i,0,z);return y;}
,insertBefore:function(A,C,B){var i=A.indexOf(B);if(i==-1){A.push(C);}
else {A.splice(i,0,C);}
;return A;}
,insertAfter:function(D,F,E){var i=D.indexOf(E);if(i==-1||i==(D.length-1)){D.push(F);}
else {D.splice(i+1,0,F);}
;return D;}
,removeAt:function(G,i){return G.splice(i,1)[0];}
,removeAll:function(H){H.length=0;return this;}
,append:function(J,I){{}
;Array.prototype.push.apply(J,I);return J;}
,exclude:function(M,L){{}
;for(var i=0,N=L.length,K;i<N;i++ ){K=M.indexOf(L[i]);if(K!=-1){M.splice(K,1);}
;}
;return M;}
,remove:function(O,P){var i=O.indexOf(P);if(i!=-1){O.splice(i,1);return P;}
;}
,contains:function(Q,R){return Q.indexOf(R)!==-1;}
,equals:function(T,S){var length=T.length;if(length!==S.length){return false;}
;for(var i=0;i<length;i++ ){if(T[i]!==S[i]){return false;}
;}
;return true;}
,sum:function(U){var V=0;for(var i=0,l=U.length;i<l;i++ ){if(U[i]!=undefined){V+=U[i];}
;}
;return V;}
,max:function(W){{}
;var i,Y=W.length,X=W[0];for(i=1;i<Y;i++ ){if(W[i]>X){X=W[i];}
;}
;return X===undefined?null:X;}
,min:function(ba){{}
;var i,bc=ba.length,bb=ba[0];for(i=1;i<bc;i++ ){if(ba[i]<bb){bb=ba[i];}
;}
;return bb===undefined?null:bb;}
,unique:function(bf){var bp=[],be={},bi={},bk={};var bj,bd=0;var bn=g+Date.now();var bg=false,bl=false,bo=false;for(var i=0,bm=bf.length;i<bm;i++ ){bj=bf[i];if(bj===null){if(!bg){bg=true;bp.push(bj);}
;}
else if(bj===undefined){}
else if(bj===false){if(!bl){bl=true;bp.push(bj);}
;}
else if(bj===true){if(!bo){bo=true;bp.push(bj);}
;}
else if(typeof bj===k){if(!be[bj]){be[bj]=1;bp.push(bj);}
;}
else if(typeof bj===h){if(!bi[bj]){bi[bj]=1;bp.push(bj);}
;}
else {var bh=bj[bn];if(bh==null){bh=bj[bn]=bd++ ;}
;if(!bk[bh]){bk[bh]=bj;bp.push(bj);}
;}
;}
;for(var bh in bk){try{delete bk[bh][bn];}
catch(bq){try{bk[bh][bn]=null;}
catch(br){throw new Error(e+bh+j+bn+f);}
;}
;}
;return bp;}
,range:function(bu,stop,bv){if(arguments.length<=1){stop=bu||0;bu=0;}
;bv=arguments[2]||1;var length=Math.max(Math.ceil((stop-bu)/bv),0);var bs=0;var bt=Array(length);while(bs<length){bt[bs++ ]=bu;bu+=bv;}
;return bt;}
}});}
)();
(function(){var a="[object Opera]",b="function",c="[^\\.0-9]",d="4.0",e="gecko",f="1.9.0.0",g="Version/",h="9.0",i="8.0",j="Gecko",k="Maple",l="AppleWebKit/",m="Trident",n="Unsupported client: ",o="",p="opera",q="engine.version",r="! Assumed gecko version 1.9.0.0 (Firefox 3.0).",s="mshtml",t="engine.name",u="webkit",v="5.0",w=".",x="qx.bom.client.Engine";qx.Bootstrap.define(x,{statics:{getVersion:function(){var A=window.navigator.userAgent;var B=o;if(qx.bom.client.Engine.__bv()){if(/Opera[\s\/]([0-9]+)\.([0-9])([0-9]*)/.test(A)){if(A.indexOf(g)!=-1){var D=A.match(/Version\/(\d+)\.(\d+)/);B=D[1]+w+D[2].charAt(0)+w+D[2].substring(1,D[2].length);}
else {B=RegExp.$1+w+RegExp.$2;if(RegExp.$3!=o){B+=w+RegExp.$3;}
;}
;}
;}
else if(qx.bom.client.Engine.__bw()){if(/AppleWebKit\/([^ ]+)/.test(A)){B=RegExp.$1;var C=RegExp(c).exec(B);if(C){B=B.slice(0,C.index);}
;}
;}
else if(qx.bom.client.Engine.__by()||qx.bom.client.Engine.__bx()){if(/rv\:([^\);]+)(\)|;)/.test(A)){B=RegExp.$1;}
;}
else if(qx.bom.client.Engine.__bz()){var z=/Trident\/([^\);]+)(\)|;)/.test(A);if(/MSIE\s+([^\);]+)(\)|;)/.test(A)){B=RegExp.$1;if(B<8&&z){if(RegExp.$1==d){B=i;}
else if(RegExp.$1==v){B=h;}
;}
;}
else if(z){var D=/\brv\:(\d+?\.\d+?)\b/.exec(A);if(D){B=D[1];}
;}
;}
else {var y=window.qxFail;if(y&&typeof y===b){B=y().FULLVERSION;}
else {B=f;qx.Bootstrap.warn(n+A+r);}
;}
;return B;}
,getName:function(){var name;if(qx.bom.client.Engine.__bv()){name=p;}
else if(qx.bom.client.Engine.__bw()){name=u;}
else if(qx.bom.client.Engine.__by()||qx.bom.client.Engine.__bx()){name=e;}
else if(qx.bom.client.Engine.__bz()){name=s;}
else {var E=window.qxFail;if(E&&typeof E===b){name=E().NAME;}
else {name=e;qx.Bootstrap.warn(n+window.navigator.userAgent+r);}
;}
;return name;}
,__bv:function(){return window.opera&&Object.prototype.toString.call(window.opera)==a;}
,__bw:function(){return window.navigator.userAgent.indexOf(l)!=-1;}
,__bx:function(){return window.navigator.userAgent.indexOf(k)!=-1;}
,__by:function(){return window.navigator.mozApps&&window.navigator.product===j&&window.navigator.userAgent.indexOf(k)==-1&&window.navigator.userAgent.indexOf(m)==-1;}
,__bz:function(){return window.navigator.cpuClass&&(/MSIE\s+([^\);]+)(\)|;)/.test(window.navigator.userAgent)||/Trident\/\d+?\.\d+?/.test(window.navigator.userAgent));}
},defer:function(F){qx.core.Environment.add(q,F.getVersion);qx.core.Environment.add(t,F.getName);}
});}
)();
(function(){var a='anonymous()',b="()",c="qx.lang.Function",d=".",e=".prototype.",f=".constructor()";qx.Bootstrap.define(c,{statics:{getCaller:function(g){return g.caller?g.caller.callee:g.callee.caller;}
,getName:function(h){if(h.displayName){return h.displayName;}
;if(h.$$original||h.wrapper||h.classname){return h.classname+f;}
;if(h.$$mixin){for(var i in h.$$mixin.$$members){if(h.$$mixin.$$members[i]==h){return h.$$mixin.name+e+i+b;}
;}
;for(var i in h.$$mixin){if(h.$$mixin[i]==h){return h.$$mixin.name+d+i+b;}
;}
;}
;if(h.self){var k=h.self.constructor;if(k){for(var i in k.prototype){if(k.prototype[i]==h){return k.classname+e+i+b;}
;}
;for(var i in k){if(k[i]==h){return k.classname+d+i+b;}
;}
;}
;}
;var j=h.toString().match(/function\s*(\w*)\s*\(.*/);if(j&&j.length>=1&&j[1]){return j[1]+b;}
;return a;}
,globalEval:function(data){if(window.execScript){return window.execScript(data);}
else {return eval.call(window,data);}
;}
,create:function(m,l){{}
;if(!l){return m;}
;if(!(l.self||l.args||l.delay!=null||l.periodical!=null||l.attempt)){return m;}
;return function(event){{}
;var o=qx.lang.Array.fromArguments(arguments);if(l.args){o=l.args.concat(o);}
;if(l.delay||l.periodical){var n=function(){return m.apply(l.self||this,o);}
;{}
;if(l.delay){return window.setTimeout(n,l.delay);}
;if(l.periodical){return window.setInterval(n,l.periodical);}
;}
else if(l.attempt){var p=false;try{p=m.apply(l.self||this,o);}
catch(q){}
;return p;}
else {return m.apply(l.self||this,o);}
;}
;}
,bind:function(r,self,s){return this.create(r,{self:self,args:arguments.length>2?qx.lang.Array.fromArguments(arguments,2):null});}
,curry:function(t,u){return this.create(t,{args:arguments.length>1?qx.lang.Array.fromArguments(arguments,1):null});}
,listener:function(w,self,x){if(arguments.length<3){return function(event){return w.call(self||this,event||window.event);}
;}
else {var v=qx.lang.Array.fromArguments(arguments,2);return function(event){var y=[event||window.event];y.push.apply(y,v);w.apply(self||this,y);}
;}
;}
,attempt:function(z,self,A){return this.create(z,{self:self,attempt:true,args:arguments.length>2?qx.lang.Array.fromArguments(arguments,2):null})();}
,delay:function(C,B,self,D){return this.create(C,{delay:B,self:self,args:arguments.length>3?qx.lang.Array.fromArguments(arguments,3):null})();}
,periodical:function(F,E,self,G){return this.create(F,{periodical:E,self:self,args:arguments.length>3?qx.lang.Array.fromArguments(arguments,3):null})();}
}});}
)();
(function(){var a="qx.lang.Type",b="Error",c="RegExp",d="Date",e="Number",f="Boolean";qx.Bootstrap.define(a,{statics:{getClass:qx.Bootstrap.getClass,isString:qx.Bootstrap.isString,isArray:qx.Bootstrap.isArray,isObject:qx.Bootstrap.isObject,isFunction:qx.Bootstrap.isFunction,isRegExp:function(g){return this.getClass(g)==c;}
,isNumber:function(h){return (h!==null&&(this.getClass(h)==e||h instanceof Number));}
,isBoolean:function(i){return (i!==null&&(this.getClass(i)==f||i instanceof Boolean));}
,isDate:function(j){return (j!==null&&(this.getClass(j)==d||j instanceof Date));}
,isError:function(k){return (k!==null&&(this.getClass(k)==b||k instanceof Error));}
}});}
)();
(function(){var a=" != ",b="qx.core.Object",c="Expected value to be an array but found ",d="' (rgb(",f=") was fired.",g="Expected value to be an integer >= 0 but found ",h="' to be not equal with '",j="' to '",k="Expected object '",m="Called assertTrue with '",n="Expected value to be a map but found ",o="The function did not raise an exception!",p="Expected value to be undefined but found ",q="Expected value to be a DOM element but found  '",r="Expected value to be a regular expression but found ",s="' to implement the interface '",t="Expected value to be null but found ",u="Invalid argument 'type'",v="Called assert with 'false'",w="Assertion error! ",x="'",y="null",z="' but found '",A="'undefined'",B=",",C="' must must be a key of the map '",D="Expected '",E="The String '",F="Expected value to be a string but found ",G="Event (",H="Expected value to be the CSS color '",I="!",J="Expected value not to be undefined but found undefined!",K="qx.util.ColorUtil",L=": ",M="The raised exception does not have the expected type! ",N=") not fired.",O="'!",P="qx.core.Assert",Q="",R="Expected value to be typeof object but found ",S="' but found ",T="' (identical) but found '",U="' must have any of the values defined in the array '",V="Expected value to be a number but found ",W="Called assertFalse with '",X="qx.ui.core.Widget",Y="]",bJ="Expected value to be a qooxdoo object but found ",bK="' arguments.",bL="Expected value '%1' to be in the range '%2'..'%3'!",bF="Array[",bG="' does not match the regular expression '",bH="' to be not identical with '",bI="Expected [",bP="' arguments but found '",bQ="', which cannot be converted to a CSS color!",bR=", ",cg="qx.core.AssertionError",bM="Expected value to be a boolean but found ",bN="Expected value not to be null but found null!",bO="))!",bD="Expected value to be a qooxdoo widget but found ",bU="The value '",bE="Expected value to be typeof '",bV="\n Stack trace: \n",bW="Expected value to be typeof function but found ",cb="Expected value to be an integer but found ",bS="Called fail().",cf="The parameter 're' must be a string or a regular expression.",bT=")), but found value '",bX="qx.util.ColorUtil not available! Your code must have a dependency on 'qx.util.ColorUtil'",bY="Expected value to be a number >= 0 but found ",ca="Expected value to be instanceof '",cc="], but found [",cd="Wrong number of arguments given. Expected '",ce="object";qx.Bootstrap.define(P,{statics:{__bK:true,__bL:function(ch,ci){var cm=Q;for(var i=1,l=arguments.length;i<l;i++ ){cm=cm+this.__bM(arguments[i]===undefined?A:arguments[i]);}
;var cl=Q;if(cm){cl=ch+L+cm;}
else {cl=ch;}
;var ck=w+cl;if(qx.Class&&qx.Class.isDefined(cg)){var cj=new qx.core.AssertionError(ch,cm);if(this.__bK){qx.Bootstrap.error(ck+bV+cj.getStackTrace());}
;throw cj;}
else {if(this.__bK){qx.Bootstrap.error(ck);}
;throw new Error(ck);}
;}
,__bM:function(co){var cn;if(co===null){cn=y;}
else if(qx.lang.Type.isArray(co)&&co.length>10){cn=bF+co.length+Y;}
else if((co instanceof Object)&&(co.toString==null)){cn=qx.lang.Json.stringify(co,null,2);}
else {try{cn=co.toString();}
catch(e){cn=Q;}
;}
;return cn;}
,assert:function(cq,cp){cq==true||this.__bL(cp||Q,v);}
,fail:function(cr,cs){var ct=cs?Q:bS;this.__bL(cr||Q,ct);}
,assertTrue:function(cv,cu){(cv===true)||this.__bL(cu||Q,m,cv,x);}
,assertFalse:function(cx,cw){(cx===false)||this.__bL(cw||Q,W,cx,x);}
,assertEquals:function(cy,cz,cA){cy==cz||this.__bL(cA||Q,D,cy,z,cz,O);}
,assertNotEquals:function(cB,cC,cD){cB!=cC||this.__bL(cD||Q,D,cB,h,cC,O);}
,assertIdentical:function(cE,cF,cG){cE===cF||this.__bL(cG||Q,D,cE,T,cF,O);}
,assertNotIdentical:function(cH,cI,cJ){cH!==cI||this.__bL(cJ||Q,D,cH,bH,cI,O);}
,assertNotUndefined:function(cL,cK){cL!==undefined||this.__bL(cK||Q,J);}
,assertUndefined:function(cN,cM){cN===undefined||this.__bL(cM||Q,p,cN,I);}
,assertNotNull:function(cP,cO){cP!==null||this.__bL(cO||Q,bN);}
,assertNull:function(cR,cQ){cR===null||this.__bL(cQ||Q,t,cR,I);}
,assertJsonEquals:function(cS,cT,cU){this.assertEquals(qx.lang.Json.stringify(cS),qx.lang.Json.stringify(cT),cU);}
,assertMatch:function(cX,cW,cV){this.assertString(cX);this.assert(qx.lang.Type.isRegExp(cW)||qx.lang.Type.isString(cW),cf);cX.search(cW)>=0||this.__bL(cV||Q,E,cX,bG,cW.toString(),O);}
,assertArgumentsCount:function(db,dc,dd,cY){var da=db.length;(da>=dc&&da<=dd)||this.__bL(cY||Q,cd,dc,j,dd,bP,da,bK);}
,assertEventFired:function(de,event,dh,di,dj){var df=false;var dg=function(e){if(di){di.call(de,e);}
;df=true;}
;var dk;try{dk=de.addListener(event,dg,de);dh.call(de);}
catch(dl){throw dl;}
finally{try{de.removeListenerById(dk);}
catch(dm){}
;}
;df===true||this.__bL(dj||Q,G,event,N);}
,assertEventNotFired:function(dn,event,dr,ds){var dp=false;var dq=function(e){dp=true;}
;var dt=dn.addListener(event,dq,dn);dr.call();dp===false||this.__bL(ds||Q,G,event,f);dn.removeListenerById(dt);}
,assertException:function(dx,dw,dv,du){var dw=dw||Error;var dy;try{this.__bK=false;dx();}
catch(dz){dy=dz;}
finally{this.__bK=true;}
;if(dy==null){this.__bL(du||Q,o);}
;dy instanceof dw||this.__bL(du||Q,M,dw,a,dy);if(dv){this.assertMatch(dy.toString(),dv,du);}
;}
,assertInArray:function(dC,dB,dA){dB.indexOf(dC)!==-1||this.__bL(dA||Q,bU,dC,U,dB,x);}
,assertArrayEquals:function(dD,dE,dF){this.assertArray(dD,dF);this.assertArray(dE,dF);dF=dF||bI+dD.join(bR)+cc+dE.join(bR)+Y;if(dD.length!==dE.length){this.fail(dF,true);}
;for(var i=0;i<dD.length;i++ ){if(dD[i]!==dE[i]){this.fail(dF,true);}
;}
;}
,assertKeyInMap:function(dI,dH,dG){dH[dI]!==undefined||this.__bL(dG||Q,bU,dI,C,dH,x);}
,assertFunction:function(dK,dJ){qx.lang.Type.isFunction(dK)||this.__bL(dJ||Q,bW,dK,I);}
,assertString:function(dM,dL){qx.lang.Type.isString(dM)||this.__bL(dL||Q,F,dM,I);}
,assertBoolean:function(dO,dN){qx.lang.Type.isBoolean(dO)||this.__bL(dN||Q,bM,dO,I);}
,assertNumber:function(dQ,dP){(qx.lang.Type.isNumber(dQ)&&isFinite(dQ))||this.__bL(dP||Q,V,dQ,I);}
,assertPositiveNumber:function(dS,dR){(qx.lang.Type.isNumber(dS)&&isFinite(dS)&&dS>=0)||this.__bL(dR||Q,bY,dS,I);}
,assertInteger:function(dU,dT){(qx.lang.Type.isNumber(dU)&&isFinite(dU)&&dU%1===0)||this.__bL(dT||Q,cb,dU,I);}
,assertPositiveInteger:function(dX,dV){var dW=(qx.lang.Type.isNumber(dX)&&isFinite(dX)&&dX%1===0&&dX>=0);dW||this.__bL(dV||Q,g,dX,I);}
,assertInRange:function(eb,ec,ea,dY){(eb>=ec&&eb<=ea)||this.__bL(dY||Q,qx.lang.String.format(bL,[eb,ec,ea]));}
,assertObject:function(ee,ed){var ef=ee!==null&&(qx.lang.Type.isObject(ee)||typeof ee===ce);ef||this.__bL(ed||Q,R,(ee),I);}
,assertArray:function(eh,eg){qx.lang.Type.isArray(eh)||this.__bL(eg||Q,c,eh,I);}
,assertMap:function(ej,ei){qx.lang.Type.isObject(ej)||this.__bL(ei||Q,n,ej,I);}
,assertRegExp:function(el,ek){qx.lang.Type.isRegExp(el)||this.__bL(ek||Q,r,el,I);}
,assertType:function(eo,en,em){this.assertString(en,u);typeof (eo)===en||this.__bL(em||Q,bE,en,S,eo,I);}
,assertInstance:function(er,es,ep){var eq=es.classname||es+Q;er instanceof es||this.__bL(ep||Q,ca,eq,S,er,I);}
,assertInterface:function(ev,eu,et){qx.Class&&qx.Class.implementsInterface(ev,eu)||this.__bL(et||Q,k,ev,s,eu,O);}
,assertCssColor:function(eC,ez,eB){var ew=qx.Class?qx.Class.getByName(K):null;if(!ew){throw new Error(bX);}
;var ey=ew.stringToRgb(eC);try{var eA=ew.stringToRgb(ez);}
catch(eE){this.__bL(eB||Q,H,eC,d,ey.join(B),bT,ez,bQ);}
;var eD=ey[0]==eA[0]&&ey[1]==eA[1]&&ey[2]==eA[2];eD||this.__bL(eB||Q,H,ey,d,ey.join(B),bT,ez,d,eA.join(B),bO);}
,assertElement:function(eG,eF){!!(eG&&eG.nodeType===1)||this.__bL(eF||Q,q,eG,O);}
,assertQxObject:function(eI,eH){this.__bN(eI,b)||this.__bL(eH||Q,bJ,eI,I);}
,assertQxWidget:function(eK,eJ){this.__bN(eK,X)||this.__bL(eJ||Q,bD,eK,I);}
,__bN:function(eM,eL){if(!eM){return false;}
;var eN=eM.constructor;while(eN){if(eN.classname===eL){return true;}
;eN=eN.superclass;}
;return false;}
}});}
)();
(function(){var a=": ",b="qx.type.BaseError",c="",d="error";qx.Bootstrap.define(b,{extend:Error,construct:function(e,f){var g=Error.call(this,f);if(g.stack){this.stack=g.stack;}
;if(g.stacktrace){this.stacktrace=g.stacktrace;}
;this.__bO=e||c;this.message=f||qx.type.BaseError.DEFAULTMESSAGE;}
,statics:{DEFAULTMESSAGE:d},members:{__bP:null,__bO:null,message:null,getComment:function(){return this.__bO;}
,toString:function(){return this.__bO+(this.message?a+this.message:c);}
}});}
)();
(function(){var a="qx.core.AssertionError";qx.Bootstrap.define(a,{extend:qx.type.BaseError,construct:function(b,c){qx.type.BaseError.call(this,b,c);this.__bQ=qx.dev.StackTrace.getStackTrace();}
,members:{__bQ:null,getStackTrace:function(){return this.__bQ;}
}});}
)();
(function(){var a="\x00\b\n\f\r\t",b="-",c="function",d="[null,null,null]",e="T",f="+",g=",\n",h="constructor",i="{\n",j='"+275760-09-13T00:00:00.000Z"',k="true",l="\\n",m="false",n='"-271821-04-20T00:00:00.000Z"',o="json",p='object',q='""',r="qx.lang.Json",s="{}",t="hasOwnProperty",u="@",v="prototype",w='hasOwnProperty',x='"',y="toLocaleString",z="0",A='function',B="",C='\\"',D="\t",E="string",F="}",G="\r",H="toJSON",I=":",J="[\n 1,\n 2\n]",K="\\f",L='"1969-12-31T23:59:59.999Z"',M="/",N="\\b",O="Z",P="\\t",Q="\b",R="[object Number]",S="isPrototypeOf",T="{",U="toString",V="0x",W="[1]",X="\\r",Y="]",bO=",",bP="null",bQ="\\u00",bK="\n",bL="json-stringify",bM="[]",bN="1",bU="000000",bV="[object Boolean]",bW="valueOf",cm="\\\\",bR="[object String]",bS="json-parse",bT="bug-string-char-index",bG="[object Array]",ca="$",bJ="[\n",cb='"-000001-01-01T00:00:00.000Z"',cc="[",bI="[null]",bX="\\",cl="[object Date]",bY='{"a":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}',cd="a",ce=" ",cf=".",ci="[object Function]",cj="01",ck='"\t"',bH="propertyIsEnumerable",cg="\f",ch="object";qx.Bootstrap.define(r,{statics:{stringify:null,parse:null}});(function(){var co;var cn;var cp;(function(window){var cr={}.toString,cG,cQ,cC;var cy=typeof cp===c&&cp.amd,cx=typeof cn==ch&&cn;if(cx||cy){if(typeof JSON==ch&&JSON){if(cx){cx.stringify=JSON.stringify;cx.parse=JSON.parse;}
else {cx=JSON;}
;}
else if(cy){cx=window.JSON={};}
;}
else {cx=window.JSON||(window.JSON={});}
;var cU=new Date(-3509827334573292);try{cU=cU.getUTCFullYear()==-109252&&cU.getUTCMonth()===0&&cU.getUTCDate()===1&&cU.getUTCHours()==10&&cU.getUTCMinutes()==37&&cU.getUTCSeconds()==6&&cU.getUTCMilliseconds()==708;}
catch(da){}
;function cJ(name){if(name==bT){return cd[0]!=cd;}
;var de,dd=bY,dh=name==o;if(dh||name==bL||name==bS){if(name==bL||dh){var db=cx.stringify,dg=typeof db==c&&cU;if(dg){(de=function(){return 1;}
).toJSON=de;try{dg=db(0)===z&&db(new Number())===z&&db(new String())==q&&db(cr)===cC&&db(cC)===cC&&db()===cC&&db(de)===bN&&db([de])==W&&db([cC])==bI&&db(null)==bP&&db([cC,cr,null])==d&&db({"a":[de,true,false,null,a]})==dd&&db(null,de)===bN&&db([1,2],null,1)==J&&db(new Date(-8.64e15))==n&&db(new Date(8.64e15))==j&&db(new Date(-621987552e5))==cb&&db(new Date(-1))==L;}
catch(di){dg=false;}
;}
;if(!dh){return dg;}
;}
;if(name==bS||dh){var df=cx.parse;if(typeof df==c){try{if(df(z)===0&&!df(false)){de=df(dd);var dc=de[cd].length==5&&de[cd][0]===1;if(dc){try{dc=!df(ck);}
catch(dj){}
;if(dc){try{dc=df(cj)!==1;}
catch(dk){}
;}
;}
;}
;}
catch(dl){dc=false;}
;}
;if(!dh){return dc;}
;}
;return dg&&dc;}
;}
;if(!cJ(o)){var cV=ci;var cN=cl;var cv=R;var cY=bR;var cR=bG;var cF=bV;var cE=cJ(bT);if(!cU){var cD=Math.floor;var cM=[0,31,59,90,120,151,181,212,243,273,304,334];var cX=function(dm,dn){return cM[dn]+365*(dm-1970)+cD((dm-1969+(dn=+(dn>1)))/4)-cD((dm-1901+dn)/100)+cD((dm-1601+dn)/400);}
;}
;if(!(cG={}.hasOwnProperty)){cG=function(dp){var dq={},dr;if((dq.__ca=null,dq.__ca={"toString":1},dq).toString!=cr){cG=function(ds){var dt=this.__ca,du=ds in (this.__ca=null,this);this.__ca=dt;return du;}
;}
else {dr=dq.constructor;cG=function(dv){var parent=(this.constructor||dr).prototype;return dv in this&&!(dv in parent&&this[dv]===parent[dv]);}
;}
;dq=null;return cG.call(this,dp);}
;}
;var cH={'boolean':1,'number':1,'string':1,'undefined':1};var cP=function(dy,dw){var dx=typeof dy[dw];return dx==p?!!dy[dw]:!cH[dx];}
;cQ=function(dz,dA){var dF=0,dE,dC,dD,dB;(dE=function(){this.valueOf=0;}
).prototype.valueOf=0;dC=new dE();for(dD in dC){if(cG.call(dC,dD)){dF++ ;}
;}
;dE=dC=null;if(!dF){dC=[bW,U,y,bH,S,t,h];dB=function(dH,dI){var dJ=cr.call(dH)==cV,dK,length;var dG=!dJ&&typeof dH.constructor!=A&&cP(dH,w)?dH.hasOwnProperty:cG;for(dK in dH){if(!(dJ&&dK==v)&&dG.call(dH,dK)){dI(dK);}
;}
;for(length=dC.length;dK=dC[ --length];dG.call(dH,dK)&&dI(dK));}
;}
else if(dF==2){dB=function(dP,dL){var dO={},dM=cr.call(dP)==cV,dN;for(dN in dP){if(!(dM&&dN==v)&&!cG.call(dO,dN)&&(dO[dN]=1)&&cG.call(dP,dN)){dL(dN);}
;}
;}
;}
else {dB=function(dT,dQ){var dR=cr.call(dT)==cV,dS,dU;for(dS in dT){if(!(dR&&dS==v)&&cG.call(dT,dS)&&!(dU=dS===h)){dQ(dS);}
;}
;if(dU||cG.call(dT,(dS=h))){dQ(dS);}
;}
;}
;return dB(dz,dA);}
;if(!cJ(bL)){var cT={'92':cm,'34':C,'8':N,'12':K,'10':l,'13':X,'9':P};var cI=bU;var cW=function(dV,dW){return (cI+(dW||0)).slice(-dV);}
;var cB=bQ;var cL=function(dY){var eb=x,dX=0,length=dY.length,ec=length>10&&cE,ea;if(ec){ea=dY.split(B);}
;for(;dX<length;dX++ ){var ed=dY.charCodeAt(dX);switch(ed){case 8:case 9:case 10:case 12:case 13:case 34:case 92:eb+=cT[ed];break;default:if(ed<32){eb+=cB+cW(2,ed.toString(16));break;}
;eb+=ec?ea[dX]:cE?dY.charAt(dX):dY[dX];};}
;return eb+x;}
;var cs=function(ez,eo,ew,el,ek,ex,es){var et=eo[ez],ev,ei,ef,er,ey,ep,eA,en,em,ee,eu,ej,length,eg,eq,eh;try{et=eo[ez];}
catch(eB){}
;if(typeof et==ch&&et){ev=cr.call(et);if(ev==cN&&!cG.call(et,H)){if(et>-1/0&&et<1/0){if(cX){er=cD(et/864e5);for(ei=cD(er/365.2425)+1970-1;cX(ei+1,0)<=er;ei++ );for(ef=cD((er-cX(ei,0))/30.42);cX(ei,ef+1)<=er;ef++ );er=1+er-cX(ei,ef);ey=(et%864e5+864e5)%864e5;ep=cD(ey/36e5)%24;eA=cD(ey/6e4)%60;en=cD(ey/1e3)%60;em=ey%1e3;}
else {ei=et.getUTCFullYear();ef=et.getUTCMonth();er=et.getUTCDate();ep=et.getUTCHours();eA=et.getUTCMinutes();en=et.getUTCSeconds();em=et.getUTCMilliseconds();}
;et=(ei<=0||ei>=1e4?(ei<0?b:f)+cW(6,ei<0?-ei:ei):cW(4,ei))+b+cW(2,ef+1)+b+cW(2,er)+e+cW(2,ep)+I+cW(2,eA)+I+cW(2,en)+cf+cW(3,em)+O;}
else {et=null;}
;}
else if(typeof et.toJSON==c&&((ev!=cv&&ev!=cY&&ev!=cR)||cG.call(et,H))){et=et.toJSON(ez);}
;}
;if(ew){et=ew.call(eo,ez,et);}
;if(et===null){return bP;}
;ev=cr.call(et);if(ev==cF){return B+et;}
else if(ev==cv){return et>-1/0&&et<1/0?B+et:bP;}
else if(ev==cY){return cL(B+et);}
;if(typeof et==ch){for(length=es.length;length-- ;){if(es[length]===et){throw TypeError();}
;}
;es.push(et);ee=[];eg=ex;ex+=ek;if(ev==cR){for(ej=0,length=et.length;ej<length;eq||(eq=true),ej++ ){eu=cs(ej,et,ew,el,ek,ex,es);ee.push(eu===cC?bP:eu);}
;eh=eq?(ek?bJ+ex+ee.join(g+ex)+bK+eg+Y:(cc+ee.join(bO)+Y)):bM;}
else {cQ(el||et,function(eC){var eD=cs(eC,et,ew,el,ek,ex,es);if(eD!==cC){ee.push(cL(eC)+I+(ek?ce:B)+eD);}
;eq||(eq=true);}
);eh=eq?(ek?i+ex+ee.join(g+ex)+bK+eg+F:(T+ee.join(bO)+F)):s;}
;es.pop();return eh;}
;}
;cx.stringify=function(eK,eJ,eL){var eF,eG,eI;if(typeof eJ==c||typeof eJ==ch&&eJ){if(cr.call(eJ)==cV){eG=eJ;}
else if(cr.call(eJ)==cR){eI={};for(var eE=0,length=eJ.length,eH;eE<length;eH=eJ[eE++ ],((cr.call(eH)==cY||cr.call(eH)==cv)&&(eI[eH]=1)));}
;}
;if(eL){if(cr.call(eL)==cv){if((eL-=eL%1)>0){for(eF=B,eL>10&&(eL=10);eF.length<eL;eF+=ce);}
;}
else if(cr.call(eL)==cY){eF=eL.length<=10?eL:eL.slice(0,10);}
;}
;return cs(B,(eH={},eH[B]=eK,eH),eG,eI,eF,B,[]);}
;}
;if(!cJ(bS)){var cA=String.fromCharCode;var cz={'92':bX,'34':x,'47':M,'98':Q,'116':D,'110':bK,'102':cg,'114':G};var cq,cu;var cw=function(){cq=cu=null;throw SyntaxError();}
;var cS=function(){var eO=cu,length=eO.length,eN,eM,eQ,eP,eR;while(cq<length){eR=eO.charCodeAt(cq);switch(eR){case 9:case 10:case 13:case 32:cq++ ;break;case 123:case 125:case 91:case 93:case 58:case 44:eN=cE?eO.charAt(cq):eO[cq];cq++ ;return eN;case 34:for(eN=u,cq++ ;cq<length;){eR=eO.charCodeAt(cq);if(eR<32){cw();}
else if(eR==92){eR=eO.charCodeAt( ++cq);switch(eR){case 92:case 34:case 47:case 98:case 116:case 110:case 102:case 114:eN+=cz[eR];cq++ ;break;case 117:eM= ++cq;for(eQ=cq+4;cq<eQ;cq++ ){eR=eO.charCodeAt(cq);if(!(eR>=48&&eR<=57||eR>=97&&eR<=102||eR>=65&&eR<=70)){cw();}
;}
;eN+=cA(V+eO.slice(eM,cq));break;default:cw();};}
else {if(eR==34){break;}
;eR=eO.charCodeAt(cq);eM=cq;while(eR>=32&&eR!=92&&eR!=34){eR=eO.charCodeAt( ++cq);}
;eN+=eO.slice(eM,cq);}
;}
;if(eO.charCodeAt(cq)==34){cq++ ;return eN;}
;cw();default:eM=cq;if(eR==45){eP=true;eR=eO.charCodeAt( ++cq);}
;if(eR>=48&&eR<=57){if(eR==48&&((eR=eO.charCodeAt(cq+1)),eR>=48&&eR<=57)){cw();}
;eP=false;for(;cq<length&&((eR=eO.charCodeAt(cq)),eR>=48&&eR<=57);cq++ );if(eO.charCodeAt(cq)==46){eQ= ++cq;for(;eQ<length&&((eR=eO.charCodeAt(eQ)),eR>=48&&eR<=57);eQ++ );if(eQ==cq){cw();}
;cq=eQ;}
;eR=eO.charCodeAt(cq);if(eR==101||eR==69){eR=eO.charCodeAt( ++cq);if(eR==43||eR==45){cq++ ;}
;for(eQ=cq;eQ<length&&((eR=eO.charCodeAt(eQ)),eR>=48&&eR<=57);eQ++ );if(eQ==cq){cw();}
;cq=eQ;}
;return +eO.slice(eM,cq);}
;if(eP){cw();}
;if(eO.slice(cq,cq+4)==k){cq+=4;return true;}
else if(eO.slice(cq,cq+5)==m){cq+=5;return false;}
else if(eO.slice(cq,cq+4)==bP){cq+=4;return null;}
;cw();};}
;return ca;}
;var cK=function(eU){var eT,eS;if(eU==ca){cw();}
;if(typeof eU==E){if((cE?eU.charAt(0):eU[0])==u){return eU.slice(1);}
;if(eU==cc){eT=[];for(;;eS||(eS=true)){eU=cS();if(eU==Y){break;}
;if(eS){if(eU==bO){eU=cS();if(eU==Y){cw();}
;}
else {cw();}
;}
;if(eU==bO){cw();}
;eT.push(cK(eU));}
;return eT;}
else if(eU==T){eT={};for(;;eS||(eS=true)){eU=cS();if(eU==F){break;}
;if(eS){if(eU==bO){eU=cS();if(eU==F){cw();}
;}
else {cw();}
;}
;if(eU==bO||typeof eU!=E||(cE?eU.charAt(0):eU[0])!=u||cS()!=I){cw();}
;eT[eU.slice(1)]=cK(cS());}
;return eT;}
;cw();}
;return eU;}
;var cO=function(eV,eW,eX){var eY=ct(eV,eW,eX);if(eY===cC){delete eV[eW];}
else {eV[eW]=eY;}
;}
;var ct=function(fa,fb,fd){var fc=fa[fb],length;if(typeof fc==ch&&fc){if(cr.call(fc)==cR){for(length=fc.length;length-- ;){cO(fc,length,fd);}
;}
else {cQ(fc,function(fe){cO(fc,fe,fd);}
);}
;}
;return fd.call(fa,fb,fc);}
;cx.parse=function(ff,fi){var fg,fh;cq=0;cu=B+ff;fg=cK(cS());if(cS()!=ca){cw();}
;cq=cu=null;return fi&&cr.call(fi)==cV?ct((fh={},fh[B]=fg,fh),B,fi):fg;}
;}
;}
;if(cy){cp(function(){return cx;}
);}
;}
(this));}
());qx.lang.Json.stringify=window.JSON.stringify;qx.lang.Json.parse=window.JSON.parse;}
)();
(function(){var a="-",b="]",c='\\u',d="undefined",e="",f='\\$1',g="0041-005A0061-007A00AA00B500BA00C0-00D600D8-00F600F8-02C102C6-02D102E0-02E402EC02EE0370-037403760377037A-037D03860388-038A038C038E-03A103A3-03F503F7-0481048A-05250531-055605590561-058705D0-05EA05F0-05F20621-064A066E066F0671-06D306D506E506E606EE06EF06FA-06FC06FF07100712-072F074D-07A507B107CA-07EA07F407F507FA0800-0815081A082408280904-0939093D09500958-0961097109720979-097F0985-098C098F09900993-09A809AA-09B009B209B6-09B909BD09CE09DC09DD09DF-09E109F009F10A05-0A0A0A0F0A100A13-0A280A2A-0A300A320A330A350A360A380A390A59-0A5C0A5E0A72-0A740A85-0A8D0A8F-0A910A93-0AA80AAA-0AB00AB20AB30AB5-0AB90ABD0AD00AE00AE10B05-0B0C0B0F0B100B13-0B280B2A-0B300B320B330B35-0B390B3D0B5C0B5D0B5F-0B610B710B830B85-0B8A0B8E-0B900B92-0B950B990B9A0B9C0B9E0B9F0BA30BA40BA8-0BAA0BAE-0BB90BD00C05-0C0C0C0E-0C100C12-0C280C2A-0C330C35-0C390C3D0C580C590C600C610C85-0C8C0C8E-0C900C92-0CA80CAA-0CB30CB5-0CB90CBD0CDE0CE00CE10D05-0D0C0D0E-0D100D12-0D280D2A-0D390D3D0D600D610D7A-0D7F0D85-0D960D9A-0DB10DB3-0DBB0DBD0DC0-0DC60E01-0E300E320E330E40-0E460E810E820E840E870E880E8A0E8D0E94-0E970E99-0E9F0EA1-0EA30EA50EA70EAA0EAB0EAD-0EB00EB20EB30EBD0EC0-0EC40EC60EDC0EDD0F000F40-0F470F49-0F6C0F88-0F8B1000-102A103F1050-1055105A-105D106110651066106E-10701075-1081108E10A0-10C510D0-10FA10FC1100-1248124A-124D1250-12561258125A-125D1260-1288128A-128D1290-12B012B2-12B512B8-12BE12C012C2-12C512C8-12D612D8-13101312-13151318-135A1380-138F13A0-13F41401-166C166F-167F1681-169A16A0-16EA1700-170C170E-17111720-17311740-17511760-176C176E-17701780-17B317D717DC1820-18771880-18A818AA18B0-18F51900-191C1950-196D1970-19741980-19AB19C1-19C71A00-1A161A20-1A541AA71B05-1B331B45-1B4B1B83-1BA01BAE1BAF1C00-1C231C4D-1C4F1C5A-1C7D1CE9-1CEC1CEE-1CF11D00-1DBF1E00-1F151F18-1F1D1F20-1F451F48-1F4D1F50-1F571F591F5B1F5D1F5F-1F7D1F80-1FB41FB6-1FBC1FBE1FC2-1FC41FC6-1FCC1FD0-1FD31FD6-1FDB1FE0-1FEC1FF2-1FF41FF6-1FFC2071207F2090-209421022107210A-211321152119-211D212421262128212A-212D212F-2139213C-213F2145-2149214E218321842C00-2C2E2C30-2C5E2C60-2CE42CEB-2CEE2D00-2D252D30-2D652D6F2D80-2D962DA0-2DA62DA8-2DAE2DB0-2DB62DB8-2DBE2DC0-2DC62DC8-2DCE2DD0-2DD62DD8-2DDE2E2F300530063031-3035303B303C3041-3096309D-309F30A1-30FA30FC-30FF3105-312D3131-318E31A0-31B731F0-31FF3400-4DB54E00-9FCBA000-A48CA4D0-A4FDA500-A60CA610-A61FA62AA62BA640-A65FA662-A66EA67F-A697A6A0-A6E5A717-A71FA722-A788A78BA78CA7FB-A801A803-A805A807-A80AA80C-A822A840-A873A882-A8B3A8F2-A8F7A8FBA90A-A925A930-A946A960-A97CA984-A9B2A9CFAA00-AA28AA40-AA42AA44-AA4BAA60-AA76AA7AAA80-AAAFAAB1AAB5AAB6AAB9-AABDAAC0AAC2AADB-AADDABC0-ABE2AC00-D7A3D7B0-D7C6D7CB-D7FBF900-FA2DFA30-FA6DFA70-FAD9FB00-FB06FB13-FB17FB1DFB1F-FB28FB2A-FB36FB38-FB3CFB3EFB40FB41FB43FB44FB46-FBB1FBD3-FD3DFD50-FD8FFD92-FDC7FDF0-FDFBFE70-FE74FE76-FEFCFF21-FF3AFF41-FF5AFF66-FFBEFFC2-FFC7FFCA-FFCFFFD2-FFD7FFDA-FFDC",h="\\\\",j='-',k="g",l="\\\"",m="qx.lang.String",n="(^|[^",o="0",p="%",q='"',r=' ',s='\n',t="])[";qx.Bootstrap.define(m,{statics:{__bs:g,__bt:null,__bu:{},camelCase:function(v){var u=this.__bu[v];if(!u){u=v.replace(/\-([a-z])/g,function(x,w){return w.toUpperCase();}
);if(v.indexOf(a)>=0){this.__bu[v]=u;}
;}
;return u;}
,hyphenate:function(z){var y=this.__bu[z];if(!y){y=z.replace(/[A-Z]/g,function(A){return (j+A.charAt(0).toLowerCase());}
);if(z.indexOf(a)==-1){this.__bu[z]=y;}
;}
;return y;}
,capitalize:function(C){if(this.__bt===null){var B=c;this.__bt=new RegExp(n+this.__bs.replace(/[0-9A-F]{4}/g,function(D){return B+D;}
)+t+this.__bs.replace(/[0-9A-F]{4}/g,function(E){return B+E;}
)+b,k);}
;return C.replace(this.__bt,function(F){return F.toUpperCase();}
);}
,clean:function(G){return G.replace(/\s+/g,r).trim();}
,trimLeft:function(H){return H.replace(/^\s+/,e);}
,trimRight:function(I){return I.replace(/\s+$/,e);}
,startsWith:function(K,J){return K.indexOf(J)===0;}
,endsWith:function(M,L){return M.substring(M.length-L.length,M.length)===L;}
,repeat:function(N,O){return N.length>0?new Array(O+1).join(N):e;}
,pad:function(Q,length,P){var R=length-Q.length;if(R>0){if(typeof P===d){P=o;}
;return this.repeat(P,R)+Q;}
else {return Q;}
;}
,firstUp:qx.Bootstrap.firstUp,firstLow:qx.Bootstrap.firstLow,contains:function(T,S){return T.indexOf(S)!=-1;}
,format:function(U,V){var W=U;var i=V.length;while(i-- ){W=W.replace(new RegExp(p+(i+1),k),function(){return V[i]+e;}
);}
;return W;}
,escapeRegexpChars:function(X){return X.replace(/([.*+?^${}()|[\]\/\\])/g,f);}
,toArray:function(Y){return Y.split(/\B|\b/g);}
,stripTags:function(ba){return ba.replace(/<\/?[^>]+>/gi,e);}
,stripScripts:function(bd,bc){var be=e;var bb=bd.replace(/<script[^>]*>([\s\S]*?)<\/script>/gi,function(){be+=arguments[1]+s;return e;}
);if(bc===true){qx.lang.Function.globalEval(be);}
;return bb;}
,quote:function(bf){return q+bf.replace(/\\/g,h).replace(/\"/g,l)+q;}
}});}
)();
(function(){var c="-",d="",e="qx.core.ObjectRegistry",f="Disposed ",g="$$hash",h="-0",j=" objects",k="Could not dispose object ",m=": ";qx.Bootstrap.define(e,{statics:{inShutDown:false,__bU:{},__bV:0,__bW:[],__bX:d,__bY:{},register:function(n){var q=this.__bU;if(!q){return;}
;var p=n.$$hash;if(p==null){var o=this.__bW;if(o.length>0&&true){p=o.pop();}
else {p=(this.__bV++ )+this.__bX;}
;n.$$hash=p;{}
;}
;{}
;q[p]=n;}
,unregister:function(r){var s=r.$$hash;if(s==null){return;}
;var t=this.__bU;if(t&&t[s]){delete t[s];this.__bW.push(s);}
;try{delete r.$$hash;}
catch(u){if(r.removeAttribute){r.removeAttribute(g);}
;}
;}
,toHashCode:function(v){{}
;var x=v.$$hash;if(x!=null){return x;}
;var w=this.__bW;if(w.length>0){x=w.pop();}
else {x=(this.__bV++ )+this.__bX;}
;return v.$$hash=x;}
,clearHashCode:function(y){{}
;var z=y.$$hash;if(z!=null){this.__bW.push(z);try{delete y.$$hash;}
catch(A){if(y.removeAttribute){y.removeAttribute(g);}
;}
;}
;}
,fromHashCode:function(B){return this.__bU[B]||null;}
,shutdown:function(){this.inShutDown=true;var D=this.__bU;var F=[];for(var C in D){F.push(C);}
;F.sort(function(a,b){return parseInt(b,10)-parseInt(a,10);}
);var E,i=0,l=F.length;while(true){try{for(;i<l;i++ ){C=F[i];E=D[C];if(E&&E.dispose){E.dispose();}
;}
;}
catch(G){qx.Bootstrap.error(this,k+E.toString()+m+G,G);if(i!==l){i++ ;continue;}
;}
;break;}
;qx.Bootstrap.debug(this,f+l+j);delete this.__bU;}
,getRegistry:function(){return this.__bU;}
,getNextHash:function(){return this.__bV;}
,getPostId:function(){return this.__bX;}
,getStackTraces:function(){return this.__bY;}
},defer:function(H){if(window&&window.top){var frames=window.top.frames;for(var i=0;i<frames.length;i++ ){if(frames[i]===window){H.__bX=c+(i+1);return;}
;}
;}
;H.__bX=h;}
});}
)();
(function(){var a="qx.util.RingBuffer";qx.Bootstrap.define(a,{extend:Object,construct:function(b){this.setMaxEntries(b||50);}
,members:{__cb:0,__cc:0,__cd:false,__ce:0,__cf:null,__cg:null,setMaxEntries:function(c){this.__cg=c;this.clear();}
,getMaxEntries:function(){return this.__cg;}
,addEntry:function(d){this.__cf[this.__cb]=d;this.__cb=this.__ch(this.__cb,1);var e=this.getMaxEntries();if(this.__cc<e){this.__cc++ ;}
;if(this.__cd&&(this.__ce<e)){this.__ce++ ;}
;}
,mark:function(){this.__cd=true;this.__ce=0;}
,clearMark:function(){this.__cd=false;}
,getAllEntries:function(){return this.getEntries(this.getMaxEntries(),false);}
,getEntries:function(f,j){if(f>this.__cc){f=this.__cc;}
;if(j&&this.__cd&&(f>this.__ce)){f=this.__ce;}
;if(f>0){var h=this.__ch(this.__cb,-1);var g=this.__ch(h,-f+1);var i;if(g<=h){i=this.__cf.slice(g,h+1);}
else {i=this.__cf.slice(g,this.__cc).concat(this.__cf.slice(0,h+1));}
;}
else {i=[];}
;return i;}
,clear:function(){this.__cf=new Array(this.getMaxEntries());this.__cc=0;this.__ce=0;this.__cb=0;}
,__ch:function(n,l){var k=this.getMaxEntries();var m=(n+l)%k;if(m<0){m+=k;}
;return m;}
}});}
)();
(function(){var a="qx.log.appender.RingBuffer";qx.Bootstrap.define(a,{extend:qx.util.RingBuffer,construct:function(b){this.setMaxMessages(b||50);}
,members:{setMaxMessages:function(c){this.setMaxEntries(c);}
,getMaxMessages:function(){return this.getMaxEntries();}
,process:function(d){this.addEntry(d);}
,getAllLogEvents:function(){return this.getAllEntries();}
,retrieveLogEvents:function(e,f){return this.getEntries(e,f);}
,clearHistory:function(){this.clear();}
}});}
)();
(function(){var a="qx.log.Logger",b="[",c="...(+",d="array",e=")",f="info",g="node",h="instance",j="string",k="null",m="error",n="#",o="class",p=": ",q="warn",r="document",s="{...(",t="",u="number",v="stringify",w="]",x="date",y="unknown",z="function",A="text[",B="[...(",C="boolean",D="\n",E=")}",F="debug",G=")]",H="map",I="undefined",J="object";qx.Bootstrap.define(a,{statics:{__ci:F,setLevel:function(K){this.__ci=K;}
,getLevel:function(){return this.__ci;}
,setTreshold:function(L){this.__cl.setMaxMessages(L);}
,getTreshold:function(){return this.__cl.getMaxMessages();}
,__cj:{},__ck:0,register:function(P){if(P.$$id){return;}
;var M=this.__ck++ ;this.__cj[M]=P;P.$$id=M;var N=this.__cm;var O=this.__cl.getAllLogEvents();for(var i=0,l=O.length;i<l;i++ ){if(N[O[i].level]>=N[this.__ci]){P.process(O[i]);}
;}
;}
,unregister:function(Q){var R=Q.$$id;if(R==null){return;}
;delete this.__cj[R];delete Q.$$id;}
,debug:function(T,S){qx.log.Logger.__cn(F,arguments);}
,info:function(V,U){qx.log.Logger.__cn(f,arguments);}
,warn:function(X,W){qx.log.Logger.__cn(q,arguments);}
,error:function(ba,Y){qx.log.Logger.__cn(m,arguments);}
,trace:function(bb){var bc=qx.dev.StackTrace.getStackTrace();qx.log.Logger.__cn(f,[(typeof bb!==I?[bb].concat(bc):bc).join(D)]);}
,deprecatedMethodWarning:function(bf,bd){{var be;}
;}
,deprecatedClassWarning:function(bi,bg){{var bh;}
;}
,deprecatedEventWarning:function(bl,event,bj){{var bk;}
;}
,deprecatedMixinWarning:function(bn,bm){{var bo;}
;}
,deprecatedConstantWarning:function(bs,bq,bp){{var self,br;}
;}
,deprecateMethodOverriding:function(bv,bu,bw,bt){{var bx;}
;}
,clear:function(){this.__cl.clearHistory();}
,__cl:new qx.log.appender.RingBuffer(50),__cm:{debug:0,info:1,warn:2,error:3},__cn:function(bz,bB){var bE=this.__cm;if(bE[bz]<bE[this.__ci]){return;}
;var by=bB.length<2?null:bB[0];var bD=by?1:0;var bA=[];for(var i=bD,l=bB.length;i<l;i++ ){bA.push(this.__cp(bB[i],true));}
;var bF=new Date;var bG={time:bF,offset:bF-qx.Bootstrap.LOADSTART,level:bz,items:bA,win:window};if(by){if(by.$$hash!==undefined){bG.object=by.$$hash;}
else if(by.$$type){bG.clazz=by;}
else if(by.constructor){bG.clazz=by.constructor;}
;}
;this.__cl.process(bG);var bC=this.__cj;for(var bH in bC){bC[bH].process(bG);}
;}
,__co:function(bJ){if(bJ===undefined){return I;}
else if(bJ===null){return k;}
;if(bJ.$$type){return o;}
;var bI=typeof bJ;if(bI===z||bI==j||bI===u||bI===C){return bI;}
else if(bI===J){if(bJ.nodeType){return g;}
else if(bJ instanceof Error||(bJ.name&&bJ.message)){return m;}
else if(bJ.classname){return h;}
else if(bJ instanceof Array){return d;}
else if(bJ instanceof Date){return x;}
else {return H;}
;}
;if(bJ.toString){return v;}
;return y;}
,__cp:function(bP,bO){var bS=this.__co(bP);var bM=y;var bL=[];switch(bS){case k:case I:bM=bS;break;case j:case u:case C:case x:bM=bP;break;case g:if(bP.nodeType===9){bM=r;}
else if(bP.nodeType===3){bM=A+bP.nodeValue+w;}
else if(bP.nodeType===1){bM=bP.nodeName.toLowerCase();if(bP.id){bM+=n+bP.id;}
;}
else {bM=g;}
;break;case z:bM=qx.lang.Function.getName(bP)||bS;break;case h:bM=bP.basename+b+bP.$$hash+w;break;case o:case v:bM=bP.toString();break;case m:bL=qx.dev.StackTrace.getStackTraceFromError(bP);bM=(bP.basename?bP.basename+p:t)+bP.toString();break;case d:if(bO){bM=[];for(var i=0,l=bP.length;i<l;i++ ){if(bM.length>20){bM.push(c+(l-i)+e);break;}
;bM.push(this.__cp(bP[i],false));}
;}
else {bM=B+bP.length+G;}
;break;case H:if(bO){var bK;var bR=[];for(var bQ in bP){bR.push(bQ);}
;bR.sort();bM=[];for(var i=0,l=bR.length;i<l;i++ ){if(bM.length>20){bM.push(c+(l-i)+e);break;}
;bQ=bR[i];bK=this.__cp(bP[bQ],false);bK.key=bQ;bM.push(bK);}
;}
else {var bN=0;for(var bQ in bP){bN++ ;}
;bM=s+bN+E;}
;break;};return {type:bS,text:bM,trace:bL};}
},defer:function(bT){var bU=qx.Bootstrap.$$logs;for(var i=0;i<bU.length;i++ ){bT.__cn(bU[i][0],bU[i][1]);}
;qx.Bootstrap.debug=bT.debug;qx.Bootstrap.info=bT.info;qx.Bootstrap.warn=bT.warn;qx.Bootstrap.error=bT.error;qx.Bootstrap.trace=bT.trace;}
});}
)();
(function(){var a="qx.event.type.Data",b="qx.event.type.Event",c="qx.data.IListData";qx.Interface.define(c,{events:{"change":a,"changeLength":b},members:{getItem:function(d){}
,setItem:function(e,f){}
,splice:function(g,h,i){}
,contains:function(j){}
,getLength:function(){}
,toArray:function(){}
}});}
)();
(function(){var a="qx.core.ValidationError";qx.Class.define(a,{extend:qx.type.BaseError});}
)();
(function(){var a="qx.core.MProperty",b="get",c="reset",d="No such property: ",e="set";qx.Mixin.define(a,{members:{set:function(g,h){var f=qx.core.Property.$$method.set;if(qx.Bootstrap.isString(g)){if(!this[f[g]]){if(this[e+qx.Bootstrap.firstUp(g)]!=undefined){this[e+qx.Bootstrap.firstUp(g)](h);return this;}
;throw new Error(d+g);}
;return this[f[g]](h);}
else {for(var i in g){if(!this[f[i]]){if(this[e+qx.Bootstrap.firstUp(i)]!=undefined){this[e+qx.Bootstrap.firstUp(i)](g[i]);continue;}
;throw new Error(d+i);}
;this[f[i]](g[i]);}
;return this;}
;}
,get:function(k){var j=qx.core.Property.$$method.get;if(!this[j[k]]){if(this[b+qx.Bootstrap.firstUp(k)]!=undefined){return this[b+qx.Bootstrap.firstUp(k)]();}
;throw new Error(d+k);}
;return this[j[k]]();}
,reset:function(m){var l=qx.core.Property.$$method.reset;if(!this[l[m]]){if(this[c+qx.Bootstrap.firstUp(m)]!=undefined){this[c+qx.Bootstrap.firstUp(m)]();return;}
;throw new Error(d+m);}
;this[l[m]]();}
}});}
)();
(function(){var a="info",b="debug",c="warn",d="qx.core.MLogging",e="error";qx.Mixin.define(d,{members:{__cq:qx.log.Logger,debug:function(f){this.__cr(b,arguments);}
,info:function(g){this.__cr(a,arguments);}
,warn:function(h){this.__cr(c,arguments);}
,error:function(i){this.__cr(e,arguments);}
,trace:function(){this.__cq.trace(this);}
,__cr:function(j,l){var k=qx.lang.Array.fromArguments(l);k.unshift(this);this.__cq[j].apply(this.__cq,k);}
}});}
)();
(function(){var b="qx.dom.Node",c="";qx.Bootstrap.define(b,{statics:{ELEMENT:1,ATTRIBUTE:2,TEXT:3,CDATA_SECTION:4,ENTITY_REFERENCE:5,ENTITY:6,PROCESSING_INSTRUCTION:7,COMMENT:8,DOCUMENT:9,DOCUMENT_TYPE:10,DOCUMENT_FRAGMENT:11,NOTATION:12,getDocument:function(d){return d.nodeType===this.DOCUMENT?d:d.ownerDocument||d.document;}
,getWindow:function(e){if(e.nodeType==null){return e;}
;if(e.nodeType!==this.DOCUMENT){e=e.ownerDocument;}
;return e.defaultView||e.parentWindow;}
,getDocumentElement:function(f){return this.getDocument(f).documentElement;}
,getBodyElement:function(g){return this.getDocument(g).body;}
,isNode:function(h){return !!(h&&h.nodeType!=null);}
,isElement:function(j){return !!(j&&j.nodeType===this.ELEMENT);}
,isDocument:function(k){return !!(k&&k.nodeType===this.DOCUMENT);}
,isDocumentFragment:function(l){return !!(l&&l.nodeType===this.DOCUMENT_FRAGMENT);}
,isText:function(m){return !!(m&&m.nodeType===this.TEXT);}
,isWindow:function(n){return !!(n&&n.history&&n.location&&n.document);}
,isNodeName:function(o,p){if(!p||!o||!o.nodeName){return false;}
;return p.toLowerCase()==qx.dom.Node.getName(o);}
,getName:function(q){if(!q||!q.nodeName){return null;}
;return q.nodeName.toLowerCase();}
,getText:function(r){if(!r||!r.nodeType){return null;}
;switch(r.nodeType){case 1:var i,a=[],s=r.childNodes,length=s.length;for(i=0;i<length;i++ ){a[i]=this.getText(s[i]);}
;return a.join(c);case 2:case 3:case 4:return r.nodeValue;};return null;}
,isBlockNode:function(t){if(!qx.dom.Node.isElement(t)){return false;}
;t=qx.dom.Node.getName(t);return /^(body|form|textarea|fieldset|ul|ol|dl|dt|dd|li|div|hr|p|h[1-6]|quote|pre|table|thead|tbody|tfoot|tr|td|th|iframe|address|blockquote)$/.test(t);}
}});}
)();
(function(){var a="function",b='loadeddata',c="pointerover",d='pause',f="transitionend",g="gecko",h="browser.name",j='timeupdate',k='canplay',m="HTMLEvents",n='loadedmetadata',o="css.transition",p="mobile safari",q="return;",r="browser.documentmode",s="safari",t='play',u='ended',v="",w="qx.bom.Event",x='playing',y="mouseover",z="end-event",A="mshtml",B="engine.name",C='progress',D="webkit",E='volumechange',F='seeked',G="on",H="undefined";qx.Bootstrap.define(w,{statics:{addNativeListener:function(L,K,I,J){if(L.addEventListener){L.addEventListener(K,I,!!J);}
else if(L.attachEvent){L.attachEvent(G+K,I);}
else if(typeof L[G+K]!=H){L[G+K]=I;}
else {{}
;}
;}
,removeNativeListener:function(P,O,M,N){if(P.removeEventListener){P.removeEventListener(O,M,!!N);}
else if(P.detachEvent){try{P.detachEvent(G+O,M);}
catch(e){if(e.number!==-2146828218){throw e;}
;}
;}
else if(typeof P[G+O]!=H){P[G+O]=null;}
else {{}
;}
;}
,getTarget:function(e){return e.target||e.srcElement;}
,getRelatedTarget:function(e){if(e.relatedTarget!==undefined){if((qx.core.Environment.get(B)==g)){try{e.relatedTarget&&e.relatedTarget.nodeType;}
catch(Q){return null;}
;}
;return e.relatedTarget;}
else if(e.fromElement!==undefined&&(e.type===y||e.type===c)){return e.fromElement;}
else if(e.toElement!==undefined){return e.toElement;}
else {return null;}
;}
,preventDefault:function(e){if(e.preventDefault){e.preventDefault();}
else {try{e.keyCode=0;}
catch(R){}
;e.returnValue=false;}
;}
,stopPropagation:function(e){if(e.stopPropagation){e.stopPropagation();}
else {e.cancelBubble=true;}
;}
,fire:function(U,S){if(document.createEvent){var T=document.createEvent(m);T.initEvent(S,true,true);return !U.dispatchEvent(T);}
else {var T=document.createEventObject();return U.fireEvent(G+S,T);}
;}
,supportsEvent:function(V,be){var ba=qx.core.Environment.get(h);var bb=qx.core.Environment.get(B);if(be.toLowerCase().indexOf(f)!=-1&&bb===A&&qx.core.Environment.get(r)>9){return true;}
;var bc=[p,s];if(bb===D&&bc.indexOf(ba)>-1){var W=[b,C,j,F,k,t,x,d,n,u,E];if(W.indexOf(be.toLowerCase())>-1){return true;}
;}
;if(V!=window&&be.toLowerCase().indexOf(f)!=-1){var bd=qx.core.Environment.get(o);return (bd&&bd[z]==be);}
;var X=G+be.toLowerCase();var Y=(X in V);if(!Y){Y=typeof V[X]==a;if(!Y&&V.setAttribute){V.setAttribute(X,q);Y=typeof V[X]==a;V.removeAttribute(X);}
;}
;return Y;}
,getEventName:function(bf,bi){var bg=[v].concat(qx.bom.Style.VENDOR_PREFIXES);for(var i=0,l=bg.length;i<l;i++ ){var bh=bg[i].toLowerCase();if(qx.bom.Event.supportsEvent(bf,bh+bi)){return bh?bh+qx.lang.String.firstUp(bi):bi;}
;}
;return null;}
}});}
)();
(function(){var a="-",b="qx.bom.Style",c="",d='-',e="Webkit",f="ms",g=":",h=";",j="Moz",k="O",m="string",n="Khtml";qx.Bootstrap.define(b,{statics:{VENDOR_PREFIXES:[e,j,k,f,n],__cs:{},__ct:null,getPropertyName:function(q){var o=document.documentElement.style;if(o[q]!==undefined){return q;}
;for(var i=0,l=this.VENDOR_PREFIXES.length;i<l;i++ ){var p=this.VENDOR_PREFIXES[i]+qx.lang.String.firstUp(q);if(o[p]!==undefined){return p;}
;}
;return null;}
,getCssName:function(r){var s=this.__cs[r];if(!s){s=r.replace(/[A-Z]/g,function(t){return (d+t.charAt(0).toLowerCase());}
);if((/^ms/.test(s))){s=a+s;}
;this.__cs[r]=s;}
;return s;}
,getAppliedStyle:function(A,x,z,v){var C=qx.bom.Style.getCssName(x);var w=qx.dom.Node.getWindow(A);var u=(v!==false)?[null].concat(this.VENDOR_PREFIXES):[null];for(var i=0,l=u.length;i<l;i++ ){var y=false;var B=u[i]?a+u[i].toLowerCase()+a+z:z;if(qx.bom.Style.__ct){y=qx.bom.Style.__ct.call(w,C,B);}
else {A.style.cssText+=C+g+B+h;y=(typeof A.style[x]==m&&A.style[x]!==c);}
;if(y){return B;}
;}
;return null;}
},defer:function(D){if(window.CSS&&window.CSS.supports){qx.bom.Style.__ct=window.CSS.supports.bind(window.CSS);}
else if(window.supportsCSS){qx.bom.Style.__ct=window.supportsCSS.bind(window);}
;}
});}
)();
(function(){var a="rim_tabletos",b="10.1",c="Darwin",d="10.3",e="os.version",f="10.7",g="2003",h=")",i="iPhone",j="android",k="unix",l="ce",m="7",n="SymbianOS",o="10.5",p="os.name",q="10.9",r="|",s="MacPPC",t="95",u="iPod",v="10.8",w="\.",x="Win64",y="linux",z="me",A="10.2",B="Macintosh",C="Android",D="Windows",E="98",F="ios",G="vista",H="8",I="blackberry",J="2000",K="8.1",L="(",M="",N="win",O="Linux",P="10.6",Q="BSD",R="10.0",S="10.4",T="Mac OS X",U="iPad",V="X11",W="xp",X="symbian",Y="qx.bom.client.OperatingSystem",bo="g",bp="Win32",bq="osx",bk="webOS",bl="RIM Tablet OS",bm="BlackBerry",bn="nt4",br=".",bs="MacIntel",bt="webos";qx.Bootstrap.define(Y,{statics:{getName:function(){if(!navigator){return M;}
;var bu=navigator.platform||M;var bv=navigator.userAgent||M;if(bu.indexOf(D)!=-1||bu.indexOf(bp)!=-1||bu.indexOf(x)!=-1){return N;}
else if(bu.indexOf(B)!=-1||bu.indexOf(s)!=-1||bu.indexOf(bs)!=-1||bu.indexOf(T)!=-1){return bq;}
else if(bv.indexOf(bl)!=-1){return a;}
else if(bv.indexOf(bk)!=-1){return bt;}
else if(bu.indexOf(u)!=-1||bu.indexOf(i)!=-1||bu.indexOf(U)!=-1){return F;}
else if(bv.indexOf(C)!=-1){return j;}
else if(bu.indexOf(O)!=-1){return y;}
else if(bu.indexOf(V)!=-1||bu.indexOf(Q)!=-1||bu.indexOf(c)!=-1){return k;}
else if(bu.indexOf(n)!=-1){return X;}
else if(bu.indexOf(bm)!=-1){return I;}
;return M;}
,__cu:{"Windows NT 6.3":K,"Windows NT 6.2":H,"Windows NT 6.1":m,"Windows NT 6.0":G,"Windows NT 5.2":g,"Windows NT 5.1":W,"Windows NT 5.0":J,"Windows 2000":J,"Windows NT 4.0":bn,"Win 9x 4.90":z,"Windows CE":l,"Windows 98":E,"Win98":E,"Windows 95":t,"Win95":t,"Mac OS X 10_9":q,"Mac OS X 10.9":q,"Mac OS X 10_8":v,"Mac OS X 10.8":v,"Mac OS X 10_7":f,"Mac OS X 10.7":f,"Mac OS X 10_6":P,"Mac OS X 10.6":P,"Mac OS X 10_5":o,"Mac OS X 10.5":o,"Mac OS X 10_4":S,"Mac OS X 10.4":S,"Mac OS X 10_3":d,"Mac OS X 10.3":d,"Mac OS X 10_2":A,"Mac OS X 10.2":A,"Mac OS X 10_1":b,"Mac OS X 10.1":b,"Mac OS X 10_0":R,"Mac OS X 10.0":R},getVersion:function(){var bw=qx.bom.client.OperatingSystem.__cv(navigator.userAgent);if(bw==null){bw=qx.bom.client.OperatingSystem.__cw(navigator.userAgent);}
;if(bw!=null){return bw;}
else {return M;}
;}
,__cv:function(bx){var bA=[];for(var bz in qx.bom.client.OperatingSystem.__cu){bA.push(bz);}
;var bB=new RegExp(L+bA.join(r).replace(/\./g,w)+h,bo);var by=bB.exec(bx);if(by&&by[1]){return qx.bom.client.OperatingSystem.__cu[by[1]];}
;return null;}
,__cw:function(bF){var bG=bF.indexOf(C)!=-1;var bC=bF.match(/(iPad|iPhone|iPod)/i)?true:false;if(bG){var bE=new RegExp(/ Android (\d+(?:\.\d+)+)/i);var bH=bE.exec(bF);if(bH&&bH[1]){return bH[1];}
;}
else if(bC){var bI=new RegExp(/(CPU|iPhone|iPod) OS (\d+)_(\d+)(?:_(\d+))*\s+/);var bD=bI.exec(bF);if(bD&&bD[2]&&bD[3]){if(bD[4]){return bD[2]+br+bD[3]+br+bD[4];}
else {return bD[2]+br+bD[3];}
;}
;}
;return null;}
},defer:function(bJ){qx.core.Environment.add(p,bJ.getName);qx.core.Environment.add(e,bJ.getVersion);}
});}
)();
(function(){var a="CSS1Compat",b="IEMobile",c=" OPR/",d="msie",e="android",f="operamini",g="gecko",h="maple",i="AdobeAIR|Titanium|Fluid|Chrome|Android|Epiphany|Konqueror|iCab|iPad|iPhone|OmniWeb|Maxthon|Pre|PhantomJS|Mobile Safari|Safari",j="browser.quirksmode",k="browser.name",l="trident",m="mobile chrome",n=")(/| )([0-9]+\.[0-9])",o="iemobile",p="prism|Fennec|Camino|Kmeleon|Galeon|Netscape|SeaMonkey|Namoroka|Firefox",q="IEMobile|Maxthon|MSIE|Trident",r="opera mobi",s="Mobile Safari",t="Maple",u="operamobile",v="ie",w="mobile safari",x="qx.bom.client.Browser",y="(Maple )([0-9]+\.[0-9]+\.[0-9]*)",z="",A="opera mini",B="(",C="browser.version",D="opera",E="ce",F=")(/|)?([0-9]+\.[0-9])?",G="mshtml",H="Opera Mini|Opera Mobi|Opera",I="webkit",J="browser.documentmode",K="5.0",L="Mobile/";qx.Bootstrap.define(x,{statics:{getName:function(){var O=navigator.userAgent;var P=new RegExp(B+qx.bom.client.Browser.__cx+F);var N=O.match(P);if(!N){return z;}
;var name=N[1].toLowerCase();var M=qx.bom.client.Engine.getName();if(M===I){if(name===e){name=m;}
else if(O.indexOf(s)!==-1||O.indexOf(L)!==-1){name=w;}
else if(O.indexOf(c)!=-1){name=D;}
;}
else if(M===G){if(name===d||name===l){name=v;if(qx.bom.client.OperatingSystem.getVersion()===E){name=o;}
;var P=new RegExp(b);if(O.match(P)){name=o;}
;}
;}
else if(M===D){if(name===r){name=u;}
else if(name===A){name=f;}
;}
else if(M===g){if(O.indexOf(t)!==-1){name=h;}
;}
;return name;}
,getVersion:function(){var S=navigator.userAgent;var T=new RegExp(B+qx.bom.client.Browser.__cx+n);var Q=S.match(T);if(!Q){return z;}
;var name=Q[1].toLowerCase();var R=Q[3];if(S.match(/Version(\/| )([0-9]+\.[0-9])/)){R=RegExp.$2;}
;if(qx.bom.client.Engine.getName()==G){R=qx.bom.client.Engine.getVersion();if(name===d&&qx.bom.client.OperatingSystem.getVersion()==E){R=K;}
;}
;if(qx.bom.client.Browser.getName()==h){T=new RegExp(y);Q=S.match(T);if(!Q){return z;}
;R=Q[2];}
;if(qx.bom.client.Engine.getName()==I||qx.bom.client.Browser.getName()==D){if(S.match(/OPR(\/| )([0-9]+\.[0-9])/)){R=RegExp.$2;}
;}
;return R;}
,getDocumentMode:function(){if(document.documentMode){return document.documentMode;}
;return 0;}
,getQuirksMode:function(){if(qx.bom.client.Engine.getName()==G&&parseFloat(qx.bom.client.Engine.getVersion())>=8){return qx.bom.client.Engine.DOCUMENT_MODE===5;}
else {return document.compatMode!==a;}
;}
,__cx:{"webkit":i,"gecko":p,"mshtml":q,"opera":H}[qx.bom.client.Engine.getName()]},defer:function(U){qx.core.Environment.add(k,U.getName);qx.core.Environment.add(C,U.getVersion);qx.core.Environment.add(J,U.getDocumentMode);qx.core.Environment.add(j,U.getQuirksMode);}
});}
)();
(function(){var a="qx.bom.client.CssTransition",b="E",c="transitionEnd",d="e",e="nd",f="transition",g="css.transition",h="Trans";qx.Bootstrap.define(a,{statics:{getTransitionName:function(){return qx.bom.Style.getPropertyName(f);}
,getSupport:function(){var name=qx.bom.client.CssTransition.getTransitionName();if(!name){return null;}
;var i=qx.bom.Event.getEventName(window,c);i=i==c?i.toLowerCase():i;if(!i){i=name+(name.indexOf(h)>0?b:d)+e;}
;return {name:name,"end-event":i};}
},defer:function(j){qx.core.Environment.add(g,j.getSupport);}
});}
)();
(function(){var a="__cD",b="UNKNOWN_",c="|bubble",d="",e="_",f="c",g="|",h="unload",j="|capture",k="DOM_",m="WIN_",n="QX_",o="qx.event.Manager",p="capture",q="__cC",r="DOCUMENT_";qx.Class.define(o,{extend:Object,construct:function(s,t){this.__cy=s;this.__cz=qx.core.ObjectRegistry.toHashCode(s);this.__cA=t;if(s.qx!==qx){var self=this;qx.bom.Event.addNativeListener(s,h,qx.event.GlobalError.observeMethod(function(){qx.bom.Event.removeNativeListener(s,h,arguments.callee);self.dispose();}
));}
;this.__cB={};this.__cC={};this.__cD={};this.__cE={};}
,statics:{__cF:0,getNextUniqueId:function(){return (this.__cF++ )+d;}
},members:{__cA:null,__cB:null,__cD:null,__cG:null,__cC:null,__cE:null,__cy:null,__cz:null,getWindow:function(){return this.__cy;}
,getWindowId:function(){return this.__cz;}
,getHandler:function(v){var u=this.__cC[v.classname];if(u){return u;}
;return this.__cC[v.classname]=new v(this);}
,getDispatcher:function(x){var w=this.__cD[x.classname];if(w){return w;}
;return this.__cD[x.classname]=new x(this,this.__cA);}
,getListeners:function(z,D,y){var B=z.$$hash||qx.core.ObjectRegistry.toHashCode(z);var E=this.__cB[B];if(!E){return null;}
;var C=D+(y?j:c);var A=E[C];return A?A.concat():null;}
,getAllListeners:function(){return this.__cB;}
,serializeListeners:function(G){var K=G.$$hash||qx.core.ObjectRegistry.toHashCode(G);var O=this.__cB[K];var J=[];if(O){var H,N,F,I,L;for(var M in O){H=M.indexOf(g);N=M.substring(0,H);F=M.charAt(H+1)==f;I=O[M];for(var i=0,l=I.length;i<l;i++ ){L=I[i];J.push({self:L.context,handler:L.handler,type:N,capture:F});}
;}
;}
;return J;}
,toggleAttachedEvents:function(R,Q){var U=R.$$hash||qx.core.ObjectRegistry.toHashCode(R);var X=this.__cB[U];if(X){var S,W,P,T;for(var V in X){S=V.indexOf(g);W=V.substring(0,S);P=V.charCodeAt(S+1)===99;T=X[V];if(Q){this.__cH(R,W,P);}
else {this.__cI(R,W,P);}
;}
;}
;}
,hasListener:function(ba,be,Y){{}
;var bc=ba.$$hash||qx.core.ObjectRegistry.toHashCode(ba);var bf=this.__cB[bc];if(!bf){return false;}
;var bd=be+(Y?j:c);var bb=bf[bd];return !!(bb&&bb.length>0);}
,importListeners:function(bg,bi){{}
;var bm=bg.$$hash||qx.core.ObjectRegistry.toHashCode(bg);var bo=this.__cB[bm]={};var bk=qx.event.Manager;for(var bh in bi){var bl=bi[bh];var bn=bl.type+(bl.capture?j:c);var bj=bo[bn];if(!bj){bj=bo[bn]=[];this.__cH(bg,bl.type,bl.capture);}
;bj.push({handler:bl.listener,context:bl.self,unique:bl.unique||(bk.__cF++ )+d});}
;}
,addListener:function(br,by,bt,self,bp){{var bv;}
;var bq=br.$$hash||qx.core.ObjectRegistry.toHashCode(br);var bz=this.__cB[bq];if(!bz){bz=this.__cB[bq]={};}
;var bu=by+(bp?j:c);var bs=bz[bu];if(!bs){bs=bz[bu]=[];}
;if(bs.length===0){this.__cH(br,by,bp);}
;var bx=(qx.event.Manager.__cF++ )+d;var bw={handler:bt,context:self,unique:bx};bs.push(bw);return bu+g+bx;}
,findHandler:function(bE,bN){var bL=false,bD=false,bO=false,bA=false;var bK;if(bE.nodeType===1){bL=true;bK=k+bE.tagName.toLowerCase()+e+bN;}
else if(bE.nodeType===9){bA=true;bK=r+bN;}
else if(bE==this.__cy){bD=true;bK=m+bN;}
else if(bE.classname){bO=true;bK=n+bE.classname+e+bN;}
else {bK=b+bE+e+bN;}
;var bC=this.__cE;if(bC[bK]){return bC[bK];}
;var bJ=this.__cA.getHandlers();var bF=qx.event.IEventHandler;var bH,bI,bG,bB;for(var i=0,l=bJ.length;i<l;i++ ){bH=bJ[i];bG=bH.SUPPORTED_TYPES;if(bG&&!bG[bN]){continue;}
;bB=bH.TARGET_CHECK;if(bB){var bM=false;if(bL&&((bB&bF.TARGET_DOMNODE)!=0)){bM=true;}
else if(bD&&((bB&bF.TARGET_WINDOW)!=0)){bM=true;}
else if(bO&&((bB&bF.TARGET_OBJECT)!=0)){bM=true;}
else if(bA&&((bB&bF.TARGET_DOCUMENT)!=0)){bM=true;}
;if(!bM){continue;}
;}
;bI=this.getHandler(bJ[i]);if(bH.IGNORE_CAN_HANDLE||bI.canHandleEvent(bE,bN)){bC[bK]=bI;return bI;}
;}
;return null;}
,__cH:function(bS,bR,bP){var bQ=this.findHandler(bS,bR);if(bQ){bQ.registerEvent(bS,bR,bP);return;}
;{}
;}
,removeListener:function(bV,cc,bX,self,bT){{var ca;}
;var bU=bV.$$hash||qx.core.ObjectRegistry.toHashCode(bV);var cd=this.__cB[bU];if(!cd){return false;}
;var bY=cc+(bT?j:c);var bW=cd[bY];if(!bW){return false;}
;var cb;for(var i=0,l=bW.length;i<l;i++ ){cb=bW[i];if(cb.handler===bX&&cb.context===self){qx.lang.Array.removeAt(bW,i);if(bW.length==0){this.__cI(bV,cc,bT);}
;return true;}
;}
;return false;}
,removeListenerById:function(cg,co){{var ck;}
;var ci=co.split(g);var cn=ci[0];var ce=ci[1].charCodeAt(0)==99;var cm=ci[2];var cf=cg.$$hash||qx.core.ObjectRegistry.toHashCode(cg);var cp=this.__cB[cf];if(!cp){return false;}
;var cj=cn+(ce?j:c);var ch=cp[cj];if(!ch){return false;}
;var cl;for(var i=0,l=ch.length;i<l;i++ ){cl=ch[i];if(cl.unique===cm){qx.lang.Array.removeAt(ch,i);if(ch.length==0){this.__cI(cg,cn,ce);}
;return true;}
;}
;return false;}
,removeAllListeners:function(cr){var ct=cr.$$hash||qx.core.ObjectRegistry.toHashCode(cr);var cw=this.__cB[ct];if(!cw){return false;}
;var cs,cv,cq;for(var cu in cw){if(cw[cu].length>0){cs=cu.split(g);cv=cs[0];cq=cs[1]===p;this.__cI(cr,cv,cq);}
;}
;delete this.__cB[ct];return true;}
,deleteAllListeners:function(cx){delete this.__cB[cx];}
,__cI:function(cB,cA,cy){var cz=this.findHandler(cB,cA);if(cz){cz.unregisterEvent(cB,cA,cy);return;}
;{}
;}
,dispatchEvent:function(cD,event){{var cH;}
;var cI=event.getType();if(!event.getBubbles()&&!this.hasListener(cD,cI)){qx.event.Pool.getInstance().poolObject(event);return true;}
;if(!event.getTarget()){event.setTarget(cD);}
;var cG=this.__cA.getDispatchers();var cF;var cC=false;for(var i=0,l=cG.length;i<l;i++ ){cF=this.getDispatcher(cG[i]);if(cF.canDispatchEvent(cD,event,cI)){cF.dispatchEvent(cD,event,cI);cC=true;break;}
;}
;if(!cC){{}
;return true;}
;var cE=event.getDefaultPrevented();qx.event.Pool.getInstance().poolObject(event);return !cE;}
,dispose:function(){this.__cA.removeManager(this);qx.util.DisposeUtil.disposeMap(this,q);qx.util.DisposeUtil.disposeMap(this,a);this.__cB=this.__cy=this.__cG=null;this.__cA=this.__cE=null;}
}});}
)();
(function(){var a="qx.event.IEventHandler";qx.Interface.define(a,{statics:{TARGET_DOMNODE:1,TARGET_WINDOW:2,TARGET_OBJECT:4,TARGET_DOCUMENT:8},members:{canHandleEvent:function(c,b){}
,registerEvent:function(f,e,d){}
,unregisterEvent:function(i,h,g){}
}});}
)();
(function(){var c="qx.event.Registration";qx.Class.define(c,{statics:{__cJ:{},getManager:function(f){if(f==null){{}
;f=window;}
else if(f.nodeType){f=qx.dom.Node.getWindow(f);}
else if(!qx.dom.Node.isWindow(f)){f=window;}
;var e=f.$$hash||qx.core.ObjectRegistry.toHashCode(f);var d=this.__cJ[e];if(!d){d=new qx.event.Manager(f,this);this.__cJ[e]=d;}
;return d;}
,removeManager:function(g){var h=g.getWindowId();delete this.__cJ[h];}
,addListener:function(l,k,i,self,j){return this.getManager(l).addListener(l,k,i,self,j);}
,removeListener:function(p,o,m,self,n){return this.getManager(p).removeListener(p,o,m,self,n);}
,removeListenerById:function(q,r){return this.getManager(q).removeListenerById(q,r);}
,removeAllListeners:function(s){return this.getManager(s).removeAllListeners(s);}
,deleteAllListeners:function(u){var t=u.$$hash;if(t){this.getManager(u).deleteAllListeners(t);}
;}
,hasListener:function(x,w,v){return this.getManager(x).hasListener(x,w,v);}
,serializeListeners:function(y){return this.getManager(y).serializeListeners(y);}
,createEvent:function(B,C,A){{}
;if(C==null){C=qx.event.type.Event;}
;var z=qx.event.Pool.getInstance().getObject(C);A?z.init.apply(z,A):z.init();if(B){z.setType(B);}
;return z;}
,dispatchEvent:function(D,event){return this.getManager(D).dispatchEvent(D,event);}
,fireEvent:function(E,F,H,G){{var I;}
;var J=this.createEvent(F,H||null,G);return this.getManager(E).dispatchEvent(E,J);}
,fireNonBubblingEvent:function(K,P,N,M){{}
;var O=this.getManager(K);if(!O.hasListener(K,P,false)){return true;}
;var L=this.createEvent(P,N||null,M);return O.dispatchEvent(K,L);}
,PRIORITY_FIRST:-32000,PRIORITY_NORMAL:0,PRIORITY_LAST:32000,__cC:[],addHandler:function(Q){{}
;this.__cC.push(Q);this.__cC.sort(function(a,b){return a.PRIORITY-b.PRIORITY;}
);}
,getHandlers:function(){return this.__cC;}
,__cD:[],addDispatcher:function(S,R){{}
;this.__cD.push(S);this.__cD.sort(function(a,b){return a.PRIORITY-b.PRIORITY;}
);}
,getDispatchers:function(){return this.__cD;}
}});}
)();
(function(){var a="qx.core.MEvent";qx.Mixin.define(a,{members:{__cK:qx.event.Registration,addListener:function(d,b,self,c){if(!this.$$disposed){return this.__cK.addListener(this,d,b,self,c);}
;return null;}
,addListenerOnce:function(h,f,self,g){var i=function(e){this.removeListener(h,f,this,g);f.call(self||this,e);}
;if(!f.$$wrapped_callback){f.$$wrapped_callback={};}
;f.$$wrapped_callback[h+this.$$hash]=i;return this.addListener(h,i,this,g);}
,removeListener:function(l,j,self,k){if(!this.$$disposed){if(j.$$wrapped_callback&&j.$$wrapped_callback[l+this.$$hash]){var m=j.$$wrapped_callback[l+this.$$hash];delete j.$$wrapped_callback[l+this.$$hash];j=m;}
;return this.__cK.removeListener(this,l,j,self,k);}
;return false;}
,removeListenerById:function(n){if(!this.$$disposed){return this.__cK.removeListenerById(this,n);}
;return false;}
,hasListener:function(p,o){return this.__cK.hasListener(this,p,o);}
,dispatchEvent:function(q){if(!this.$$disposed){return this.__cK.dispatchEvent(this,q);}
;return true;}
,fireEvent:function(s,t,r){if(!this.$$disposed){return this.__cK.fireEvent(this,s,t,r);}
;return true;}
,fireNonBubblingEvent:function(v,w,u){if(!this.$$disposed){return this.__cK.fireNonBubblingEvent(this,v,w,u);}
;return true;}
,fireDataEvent:function(z,A,x,y){if(!this.$$disposed){if(x===undefined){x=null;}
;return this.__cK.fireNonBubblingEvent(this,z,qx.event.type.Data,[A,x,!!y]);}
;return true;}
}});}
)();
(function(){var a="qx.event.IEventDispatcher";qx.Interface.define(a,{members:{canDispatchEvent:function(c,event,b){this.assertInstance(event,qx.event.type.Event);this.assertString(b);}
,dispatchEvent:function(e,event,d){this.assertInstance(event,qx.event.type.Event);this.assertString(d);}
}});}
)();
(function(){var a="module.events",b="Cloning only possible with properties.",c="qx.core.Object",d="module.property",e="]",f="[",g="Object";qx.Class.define(c,{extend:Object,include:qx.core.Environment.filter({"module.databinding":qx.data.MBinding,"module.logger":qx.core.MLogging,"module.events":qx.core.MEvent,"module.property":qx.core.MProperty}),construct:function(){qx.core.ObjectRegistry.register(this);}
,statics:{$$type:g},members:{__K:qx.core.Environment.get(d)?qx.core.Property:null,toHashCode:function(){return this.$$hash;}
,toString:function(){return this.classname+f+this.$$hash+e;}
,base:function(h,j){{}
;if(arguments.length===1){return h.callee.base.call(this);}
else {return h.callee.base.apply(this,Array.prototype.slice.call(arguments,1));}
;}
,self:function(k){return k.callee.self;}
,clone:function(){if(!qx.core.Environment.get(d)){throw new Error(b);}
;var n=this.constructor;var m=new n;var p=qx.Class.getProperties(n);var o=this.__K.$$store.user;var q=this.__K.$$method.set;var name;for(var i=0,l=p.length;i<l;i++ ){name=p[i];if(this.hasOwnProperty(o[name])){m[q[name]](this[o[name]]);}
;}
;return m;}
,__cL:null,setUserData:function(r,s){if(!this.__cL){this.__cL={};}
;this.__cL[r]=s;}
,getUserData:function(u){if(!this.__cL){return null;}
;var t=this.__cL[u];return t===undefined?null:t;}
,isDisposed:function(){return this.$$disposed||false;}
,dispose:function(){if(this.$$disposed){return;}
;this.$$disposed=true;this.$$instance=null;this.$$allowconstruct=null;{}
;var x=this.constructor;var v;while(x.superclass){if(x.$$destructor){x.$$destructor.call(this);}
;if(x.$$includes){v=x.$$flatIncludes;for(var i=0,l=v.length;i<l;i++ ){if(v[i].$$destructor){v[i].$$destructor.call(this);}
;}
;}
;x=x.superclass;}
;{var y,w;}
;}
,_disposeObjects:function(z){qx.util.DisposeUtil.disposeObjects(this,arguments);}
,_disposeSingletonObjects:function(A){qx.util.DisposeUtil.disposeObjects(this,arguments,true);}
,_disposeArray:function(B){qx.util.DisposeUtil.disposeArray(this,B);}
,_disposeMap:function(C){qx.util.DisposeUtil.disposeMap(this,C);}
},environment:{"qx.debug.dispose.level":0},destruct:function(){if(qx.core.Environment.get(a)){if(!qx.core.ObjectRegistry.inShutDown){qx.event.Registration.removeAllListeners(this);}
else {qx.event.Registration.deleteAllListeners(this);}
;}
;qx.core.ObjectRegistry.unregister(this);this.__cL=null;if(qx.core.Environment.get(d)){var F=this.constructor;var J;var K=this.__K.$$store;var H=K.user;var I=K.theme;var D=K.inherit;var G=K.useinit;var E=K.init;while(F){J=F.$$properties;if(J){for(var name in J){if(J[name].dereference){this[H[name]]=this[I[name]]=this[D[name]]=this[G[name]]=this[E[name]]=undefined;}
;}
;}
;F=F.superclass;}
;}
;}
});}
)();
(function(){var a=" is a singleton! Please use disposeSingleton instead.",b="undefined",c="qx.util.DisposeUtil",d=" of object: ",e="!",f=" has non disposable entries: ",g="The map field: ",h="The array field: ",j="The object stored in key ",k="Has no disposable object under key: ";qx.Class.define(c,{statics:{disposeObjects:function(n,m,o){var name;for(var i=0,l=m.length;i<l;i++ ){name=m[i];if(n[name]==null||!n.hasOwnProperty(name)){continue;}
;if(!qx.core.ObjectRegistry.inShutDown){if(n[name].dispose){if(!o&&n[name].constructor.$$instance){throw new Error(j+name+a);}
else {n[name].dispose();}
;}
else {throw new Error(k+name+e);}
;}
;n[name]=null;}
;}
,disposeArray:function(q,p){var r=q[p];if(!r){return;}
;if(qx.core.ObjectRegistry.inShutDown){q[p]=null;return;}
;try{var s;for(var i=r.length-1;i>=0;i-- ){s=r[i];if(s){s.dispose();}
;}
;}
catch(t){throw new Error(h+p+d+q+f+t);}
;r.length=0;q[p]=null;}
,disposeMap:function(v,u){var w=v[u];if(!w){return;}
;if(qx.core.ObjectRegistry.inShutDown){v[u]=null;return;}
;try{var y;for(var x in w){y=w[x];if(w.hasOwnProperty(x)&&y){y.dispose();}
;}
;}
catch(z){throw new Error(g+u+d+v+f+z);}
;v[u]=null;}
,disposeTriggeredBy:function(A,C){var B=C.dispose;C.dispose=function(){B.call(C);A.dispose();}
;}
,destroyContainer:function(E){{}
;var D=[];this._collectContainerChildren(E,D);var F=D.length;for(var i=F-1;i>=0;i-- ){D[i].destroy();}
;E.destroy();}
,_collectContainerChildren:function(I,H){var J=I.getChildren();for(var i=0;i<J.length;i++ ){var G=J[i];H.push(G);if(this.__cM(G)){this._collectContainerChildren(G,H);}
;}
;}
,__cM:function(L){var K=[];if(qx.ui.mobile&&L instanceof qx.ui.mobile.core.Widget){K=[qx.ui.mobile.container.Composite];}
else {K=[qx.ui.container.Composite,qx.ui.container.Scroll,qx.ui.container.SlideBar,qx.ui.container.Stack];}
;for(var i=0,l=K.length;i<l;i++ ){if(typeof K[i]!==b&&qx.Class.isSubClassOf(L.constructor,K[i])){return true;}
;}
;return false;}
}});}
)();
(function(){var a="qx.event.type.Event";qx.Class.define(a,{extend:qx.core.Object,statics:{CAPTURING_PHASE:1,AT_TARGET:2,BUBBLING_PHASE:3},members:{init:function(c,b){{}
;this._type=null;this._target=null;this._currentTarget=null;this._relatedTarget=null;this._originalTarget=null;this._stopPropagation=false;this._preventDefault=false;this._bubbles=!!c;this._cancelable=!!b;this._timeStamp=(new Date()).getTime();this._eventPhase=null;return this;}
,clone:function(d){if(d){var e=d;}
else {var e=qx.event.Pool.getInstance().getObject(this.constructor);}
;e._type=this._type;e._target=this._target;e._currentTarget=this._currentTarget;e._relatedTarget=this._relatedTarget;e._originalTarget=this._originalTarget;e._stopPropagation=this._stopPropagation;e._bubbles=this._bubbles;e._preventDefault=this._preventDefault;e._cancelable=this._cancelable;return e;}
,stop:function(){if(this._bubbles){this.stopPropagation();}
;if(this._cancelable){this.preventDefault();}
;}
,stopPropagation:function(){{}
;this._stopPropagation=true;}
,getPropagationStopped:function(){return !!this._stopPropagation;}
,preventDefault:function(){{}
;this._preventDefault=true;}
,getDefaultPrevented:function(){return !!this._preventDefault;}
,getType:function(){return this._type;}
,setType:function(f){this._type=f;}
,getEventPhase:function(){return this._eventPhase;}
,setEventPhase:function(g){this._eventPhase=g;}
,getTimeStamp:function(){return this._timeStamp;}
,getTarget:function(){return this._target;}
,setTarget:function(h){this._target=h;}
,getCurrentTarget:function(){return this._currentTarget||this._target;}
,setCurrentTarget:function(i){this._currentTarget=i;}
,getRelatedTarget:function(){return this._relatedTarget;}
,setRelatedTarget:function(j){this._relatedTarget=j;}
,getOriginalTarget:function(){return this._originalTarget;}
,setOriginalTarget:function(k){this._originalTarget=k;}
,getBubbles:function(){return this._bubbles;}
,setBubbles:function(l){this._bubbles=l;}
,isCancelable:function(){return this._cancelable;}
,setCancelable:function(m){this._cancelable=m;}
},destruct:function(){this._target=this._currentTarget=this._relatedTarget=this._originalTarget=null;}
});}
)();
(function(){var a="qx.util.ObjectPool",b="Class needs to be defined!",c="Object is already pooled: ",d="Integer";qx.Class.define(a,{extend:qx.core.Object,construct:function(e){qx.core.Object.call(this);this.__cN={};if(e!=null){this.setSize(e);}
;}
,properties:{size:{check:d,init:Infinity}},members:{__cN:null,getObject:function(h){if(this.$$disposed){return new h;}
;if(!h){throw new Error(b);}
;var f=null;var g=this.__cN[h.classname];if(g){f=g.pop();}
;if(f){f.$$pooled=false;}
else {f=new h;}
;return f;}
,poolObject:function(k){if(!this.__cN){return;}
;var j=k.classname;var m=this.__cN[j];if(k.$$pooled){throw new Error(c+k);}
;if(!m){this.__cN[j]=m=[];}
;if(m.length>this.getSize()){if(k.destroy){k.destroy();}
else {k.dispose();}
;return;}
;k.$$pooled=true;m.push(k);}
},destruct:function(){var p=this.__cN;var n,o,i,l;for(n in p){o=p[n];for(i=0,l=o.length;i<l;i++ ){o[i].dispose();}
;}
;delete this.__cN;}
});}
)();
(function(){var a="singleton",b="qx.event.Pool";qx.Class.define(b,{extend:qx.util.ObjectPool,type:a,construct:function(){qx.util.ObjectPool.call(this,30);}
});}
)();
(function(){var a="qx.event.dispatch.Direct";qx.Class.define(a,{extend:qx.core.Object,implement:qx.event.IEventDispatcher,construct:function(b){this._manager=b;}
,statics:{PRIORITY:qx.event.Registration.PRIORITY_LAST},members:{canDispatchEvent:function(d,event,c){return !event.getBubbles();}
,dispatchEvent:function(e,event,k){{var j,f;}
;event.setEventPhase(qx.event.type.Event.AT_TARGET);var g=this._manager.getListeners(e,k,false);if(g){for(var i=0,l=g.length;i<l;i++ ){var h=g[i].context||e;{}
;g[i].handler.call(h,event);}
;}
;}
},defer:function(m){qx.event.Registration.addDispatcher(m);}
});}
)();
(function(){var a="qx.event.handler.Object";qx.Class.define(a,{extend:qx.core.Object,implement:qx.event.IEventHandler,statics:{PRIORITY:qx.event.Registration.PRIORITY_LAST,SUPPORTED_TYPES:null,TARGET_CHECK:qx.event.IEventHandler.TARGET_OBJECT,IGNORE_CAN_HANDLE:false},members:{canHandleEvent:function(c,b){return qx.Class.supportsEvent(c.constructor,b);}
,registerEvent:function(f,e,d){}
,unregisterEvent:function(i,h,g){}
},defer:function(j){qx.event.Registration.addHandler(j);}
});}
)();
(function(){var a="qx.event.type.Data";qx.Class.define(a,{extend:qx.event.type.Event,members:{__cO:null,__cP:null,init:function(c,d,b){qx.event.type.Event.prototype.init.call(this,false,b);this.__cO=c;this.__cP=d;return this;}
,clone:function(e){var f=qx.event.type.Event.prototype.clone.call(this,e);f.__cO=this.__cO;f.__cP=this.__cP;return f;}
,getData:function(){return this.__cO;}
,getOldData:function(){return this.__cP;}
},destruct:function(){this.__cO=this.__cP=null;}
});}
)();
(function(){var a="qx.data.marshal.IMarshaler";qx.Interface.define(a,{members:{toClass:function(b,c){}
,toModel:function(d){}
}});}
)();
(function(){var a='"',b="Class '",c="",d="Unsupported type!",e="change",f="qx.data.marshal.Json",g="Array",h="_validate",j="' could not be found.",k="]",l="[",m="set",n="_applyEventPropagation",o="qx.data.model.";qx.Class.define(f,{extend:qx.core.Object,implement:[qx.data.marshal.IMarshaler],construct:function(p){qx.core.Object.call(this);this.__tB=p;}
,statics:{$$instance:null,createModel:function(q,r){if(this.$$instance===null){this.$$instance=new qx.data.marshal.Json();}
;this.$$instance.toClass(q,r);return this.$$instance.toModel(q);}
},members:{__tB:null,__tC:function(s){return Object.keys(s).sort().join(a);}
,toClass:function(t,u){this.__tD(t,u,null,0);}
,__tD:function(G,B,v,D){if(!qx.lang.Type.isObject(G)||!!G.$$isString||G instanceof qx.core.Object){if(G instanceof Array||qx.Bootstrap.getClass(G)==g){for(var i=0;i<G.length;i++ ){this.__tD(G[i],B,v+l+i+k,D+1);}
;}
;return;}
;var x=this.__tC(G);if(this.__tH(x,v,D)){return;}
;for(var F in G){this.__tD(G[F],B,F,D+1);}
;if(qx.Class.isDefined(o+x)){return;}
;if(this.__tB&&this.__tB.getModelClass&&this.__tB.getModelClass(x,G,v,D)!=null){return;}
;var H={};var y={__tE:this.__tE};for(var F in G){if(this.__tB&&this.__tB.getPropertyMapping){F=this.__tB.getPropertyMapping(F,x);}
;F=F.replace(/-|\.|\s+/g,c);{}
;H[F]={};H[F].nullable=true;H[F].event=e+qx.lang.String.firstUp(F);if(B){H[F].apply=n;}
;if(this.__tB&&this.__tB.getValidationRule){var A=this.__tB.getValidationRule(x,F);if(A){H[F].validate=h+F;y[h+F]=A;}
;}
;}
;if(this.__tB&&this.__tB.getModelSuperClass){var E=this.__tB.getModelSuperClass(x,v,D)||qx.core.Object;}
else {var E=qx.core.Object;}
;var z=[];if(this.__tB&&this.__tB.getModelMixins){var C=this.__tB.getModelMixins(x,v,D);if(!qx.lang.Type.isArray(C)){if(C!=null){z=[C];}
;}
else {z=C;}
;}
;if(B){z.push(qx.data.marshal.MEventBubbling);}
;var w={extend:E,include:z,properties:H,members:y,destruct:this.__tF};qx.Class.define(o+x,w);}
,__tF:function(){var I=qx.util.PropertyUtil.getAllProperties(this.constructor);for(var J in I){this.__tE(this.get(I[J].name));}
;}
,__tE:function(K){if(!(K instanceof qx.core.Object)){return;}
;if(K.isDisposed()){return;}
;K.dispose();}
,__tG:function(L,P,Q,O){var R;if(this.__tB&&this.__tB.getModelClass){R=this.__tB.getModelClass(L,P,Q,O);}
;if(R!=null){return (new R());}
else {var N=o+L;var M=qx.Class.getByName(N);if(!M){throw new Error(b+N+j);}
;return (new M());}
;}
,__tH:function(S,V,T){var U=this.__tB;return U&&U.ignore&&U.ignore(S,V,T);}
,toModel:function(W){return this.__tI(W,null,0);}
,__tI:function(bj,Y,bf){var bd=qx.lang.Type.isObject(bj);var X=bj instanceof Array||qx.Bootstrap.getClass(bj)==g;if((!bd&&!X)||!!bj.$$isString||bj instanceof qx.core.Object){return bj;}
else if(this.__tH(this.__tC(bj),Y,bf)){return bj;}
else if(X){var bh=qx.data.Array;if(this.__tB&&this.__tB.getArrayClass){var be=this.__tB.getArrayClass(Y,bf);bh=be||bh;}
;var bk=new bh();bk.setAutoDisposeItems(true);for(var i=0;i<bj.length;i++ ){bk.push(this.__tI(bj[i],Y+l+i+k,bf+1));}
;return bk;}
else if(bd){var ba=this.__tC(bj);var bi=this.__tG(ba,bj,Y,bf);for(var bg in bj){var bb=bg;if(this.__tB&&this.__tB.getPropertyMapping){bb=this.__tB.getPropertyMapping(bg,ba);}
;var bl=bb.replace(/-|\.|\s+/g,c);{}
;bb=bl;var bc=m+qx.lang.String.firstUp(bb);if(bi[bc]){bi[bc](this.__tI(bj[bg],bg,bf+1));}
;}
;return bi;}
;throw new Error(d);}
},destruct:function(){this.__tB=null;}
});}
)();
(function(){var a="$$theme_",b="$$user_",c="qx.util.PropertyUtil",d="$$init_";qx.Class.define(c,{statics:{getProperties:function(e){return e.$$properties;}
,getAllProperties:function(j){var g={};var f=j;while(f!=qx.core.Object){var i=this.getProperties(f);for(var h in i){g[h]=i[h];}
;f=f.superclass;}
;return g;}
,getUserValue:function(l,k){return l[b+k];}
,setUserValue:function(n,m,o){n[b+m]=o;}
,deleteUserValue:function(q,p){delete (q[b+p]);}
,getInitValue:function(s,r){return s[d+r];}
,setInitValue:function(u,t,v){u[d+t]=v;}
,deleteInitValue:function(x,w){delete (x[d+w]);}
,getThemeValue:function(z,y){return z[a+y];}
,setThemeValue:function(B,A,C){B[a+A]=C;}
,deleteThemeValue:function(E,D){delete (E[a+D]);}
,setThemed:function(H,G,I){var F=qx.core.Property.$$method.setThemed;H[F[G]](I);}
,resetThemed:function(K,J){var L=qx.core.Property.$$method.resetThemed;K[L[J]]();}
}});}
)();
(function(){var a="qx.data.marshal.MEventBubbling",b="",c="]",d="idBubble-",f="[",g="changeBubble",h=".",j="qx.event.type.Data";qx.Mixin.define(a,{events:{"changeBubble":j},members:{_applyEventPropagation:function(l,k,name){this.fireDataEvent(g,{value:l,name:name,old:k,item:this});this._registerEventChaining(l,k,name);}
,_registerEventChaining:function(n,m,name){if(m!=null&&m.getUserData&&m.getUserData(d+this.$$hash)!=null){var p=m.getUserData(d+this.$$hash);for(var i=0;i<p.length;i++ ){m.removeListenerById(p[i]);}
;m.setUserData(d+this.$$hash,null);}
;if((n instanceof qx.core.Object)&&qx.Class.hasMixin(n.constructor,qx.data.marshal.MEventBubbling)){var o=qx.lang.Function.bind(this.__lX,this,name);var q=n.addListener(g,o,this);var p=n.getUserData(d+this.$$hash);if(p==null){p=[];n.setUserData(d+this.$$hash,p);}
;p.push(q);}
;}
,__lX:function(name,e){var y=e.getData();var u=y.value;var s=y.old;if(qx.Class.hasInterface(e.getTarget().constructor,qx.data.IListData)){if(y.name.indexOf){var x=y.name.indexOf(h)!=-1?y.name.indexOf(h):y.name.length;var v=y.name.indexOf(f)!=-1?y.name.indexOf(f):y.name.length;if(v==0){var t=name+y.name;}
else if(x<v){var r=y.name.substring(0,x);var w=y.name.substring(x+1,y.name.length);if(w[0]!=f){w=h+w;}
;var t=name+f+r+c+w;}
else if(v<x){var r=y.name.substring(0,v);var w=y.name.substring(v,y.name.length);var t=name+f+r+c+w;}
else {var t=name+f+y.name+c;}
;}
else {var t=name+f+y.name+c;}
;}
else {if(parseInt(name)==name&&name!==b){name=f+name+c;}
;var t=name+h+y.name;}
;this.fireDataEvent(g,{value:u,name:t,old:s,item:y.item||e.getTarget()});}
}});}
)();
(function(){var a="-",b="add",c="order",d="add/remove",e="Boolean",f="",g="change",h="qx.data.Array",j="Type of the parameter not supported!",k="0-",l="remove",m="0",n="number",o="changeBubble",p="changeLength",q="qx.event.type.Data";qx.Class.define(h,{extend:qx.core.Object,include:qx.data.marshal.MEventBubbling,implement:[qx.data.IListData],construct:function(r){qx.core.Object.call(this);if(r==undefined){this.__lY=[];}
else if(arguments.length>1){this.__lY=[];for(var i=0;i<arguments.length;i++ ){this.__lY.push(arguments[i]);}
;}
else if(typeof r==n){this.__lY=new Array(r);}
else if(r instanceof Array){this.__lY=qx.lang.Array.clone(r);}
else {this.__lY=[];this.dispose();throw new Error(j);}
;for(var i=0;i<this.__lY.length;i++ ){this._applyEventPropagation(this.__lY[i],null,i);}
;this.__ma();{}
;}
,properties:{autoDisposeItems:{check:e,init:false}},events:{"change":q,"changeLength":q},members:{__lY:null,concat:function(s){if(s){var t=this.__lY.concat(s);}
else {var t=this.__lY.concat();}
;return new qx.data.Array(t);}
,join:function(u){return this.__lY.join(u);}
,pop:function(){var v=this.__lY.pop();this.__ma();this._registerEventChaining(null,v,this.length-1);this.fireDataEvent(o,{value:[],name:this.length+f,old:[v],item:this});this.fireDataEvent(g,{start:this.length-1,end:this.length-1,type:l,removed:[v],added:[]},null);return v;}
,push:function(w){for(var i=0;i<arguments.length;i++ ){this.__lY.push(arguments[i]);this.__ma();this._registerEventChaining(arguments[i],null,this.length-1);this.fireDataEvent(o,{value:[arguments[i]],name:(this.length-1)+f,old:[],item:this});this.fireDataEvent(g,{start:this.length-1,end:this.length-1,type:b,added:[arguments[i]],removed:[]},null);}
;return this.length;}
,reverse:function(){if(this.length==0){return;}
;var x=this.__lY.concat();this.__lY.reverse();this.__mb(0,this.length);this.fireDataEvent(g,{start:0,end:this.length-1,type:c,added:[],removed:[]},null);this.fireDataEvent(o,{value:this.__lY,name:k+(this.__lY.length-1),old:x,item:this});}
,shift:function(){if(this.length==0){return;}
;var y=this.__lY.shift();this.__ma();this._registerEventChaining(null,y,this.length-1);this.__mb(0,this.length);this.fireDataEvent(o,{value:[],name:m,old:[y],item:this});this.fireDataEvent(g,{start:0,end:this.length-1,type:l,removed:[y],added:[]},null);return y;}
,slice:function(A,z){return new qx.data.Array(this.__lY.slice(A,z));}
,splice:function(F,H,J){var N=this.__lY.length;var I=this.__lY.splice.apply(this.__lY,arguments);if(this.__lY.length!=N){this.__ma();}
else if(H==arguments.length-2){var B=qx.lang.Array.fromArguments(arguments,2);for(var i=0;i<B.length;i++ ){if(B[i]!==I[i]){break;}
;if(i==B.length-1){return new qx.data.Array();}
;}
;}
;var L=H>0;var D=arguments.length>2;if(L||D){var B=qx.lang.Array.fromArguments(arguments,2);if(I.length==0){var M=b;var E=F+B.length;}
else if(B.length==0){var M=l;var E=this.length-1;}
else {var M=d;var E=F+Math.abs(B.length-I.length);}
;this.fireDataEvent(g,{start:F,end:E,type:M,added:B,removed:I},null);}
;for(var i=0;i<I.length;i++ ){this._registerEventChaining(null,I[i],i);}
;for(var i=2;i<arguments.length;i++ ){this._registerEventChaining(arguments[i],null,F+(i-2));}
;this.__mb(F+(arguments.length-2)-H,this.length);if(L||D){var G=[];for(var i=2;i<arguments.length;i++ ){G[i-2]=arguments[i];}
;var C=(F+Math.max(arguments.length-3,H-1));var name=F==C?C:F+a+C;var K={value:G,name:name+f,old:I,item:this};this.fireDataEvent(o,K);}
;return (new qx.data.Array(I));}
,sort:function(P){if(this.length==0){return;}
;var O=this.__lY.concat();this.__lY.sort.apply(this.__lY,arguments);if(qx.lang.Array.equals(this.__lY,O)===true){return;}
;this.__mb(0,this.length);this.fireDataEvent(g,{start:0,end:this.length-1,type:c,added:[],removed:[]},null);this.fireDataEvent(o,{value:this.__lY,name:k+(this.length-1),old:O,item:this});}
,unshift:function(Q){for(var i=arguments.length-1;i>=0;i-- ){this.__lY.unshift(arguments[i]);this.__ma();this.__mb(0,this.length);this.fireDataEvent(o,{value:[this.__lY[0]],name:m,old:[this.__lY[1]],item:this});this.fireDataEvent(g,{start:0,end:this.length-1,type:b,added:[arguments[i]],removed:[]},null);}
;return this.length;}
,toArray:function(){return this.__lY;}
,getItem:function(R){return this.__lY[R];}
,setItem:function(S,U){var T=this.__lY[S];if(T===U){return;}
;this.__lY[S]=U;this._registerEventChaining(U,T,S);if(this.length!=this.__lY.length){this.__ma();}
;this.fireDataEvent(o,{value:[U],name:S+f,old:[T],item:this});this.fireDataEvent(g,{start:S,end:S,type:d,added:[U],removed:[T]},null);}
,getLength:function(){return this.length;}
,indexOf:function(V){return this.__lY.indexOf(V);}
,lastIndexOf:function(W){return this.__lY.lastIndexOf(W);}
,toString:function(){if(this.__lY!=null){return this.__lY.toString();}
;return f;}
,contains:function(X){return this.__lY.indexOf(X)!==-1;}
,copy:function(){return this.concat();}
,insertAt:function(Y,ba){this.splice(Y,0,ba).dispose();}
,insertBefore:function(bc,bb){var bd=this.indexOf(bc);if(bd==-1){this.push(bb);}
else {this.splice(bd,0,bb).dispose();}
;}
,insertAfter:function(bf,be){var bg=this.indexOf(bf);if(bg==-1||bg==(this.length-1)){this.push(be);}
else {this.splice(bg+1,0,be).dispose();}
;}
,removeAt:function(bh){var bi=this.splice(bh,1);var bj=bi.getItem(0);bi.dispose();return bj;}
,removeAll:function(){for(var i=0;i<this.__lY.length;i++ ){this._registerEventChaining(null,this.__lY[i],i);}
;if(this.getLength()==0){return [];}
;var bl=this.getLength();var bk=this.__lY.concat();this.__lY.length=0;this.__ma();this.fireDataEvent(o,{value:[],name:k+(bl-1),old:bk,item:this});this.fireDataEvent(g,{start:0,end:bl-1,type:l,removed:bk,added:[]},null);return bk;}
,append:function(bm){if(bm instanceof qx.data.Array){bm=bm.toArray();}
;{}
;Array.prototype.push.apply(this.__lY,bm);for(var i=0;i<bm.length;i++ ){this._registerEventChaining(bm[i],null,this.__lY.length+i);}
;var bn=this.length;this.__ma();var name=bn==(this.length-1)?bn:bn+a+(this.length-1);this.fireDataEvent(o,{value:bm,name:name+f,old:[],item:this});this.fireDataEvent(g,{start:bn,end:this.length-1,type:b,added:bm,removed:[]},null);}
,remove:function(bo){var bp=this.indexOf(bo);if(bp!=-1){this.splice(bp,1).dispose();return bo;}
;}
,equals:function(bq){if(this.length!==bq.length){return false;}
;for(var i=0;i<this.length;i++ ){if(this.getItem(i)!==bq.getItem(i)){return false;}
;}
;return true;}
,sum:function(){var br=0;for(var i=0;i<this.length;i++ ){br+=this.getItem(i);}
;return br;}
,max:function(){var bs=this.getItem(0);for(var i=1;i<this.length;i++ ){if(this.getItem(i)>bs){bs=this.getItem(i);}
;}
;return bs===undefined?null:bs;}
,min:function(){var bt=this.getItem(0);for(var i=1;i<this.length;i++ ){if(this.getItem(i)<bt){bt=this.getItem(i);}
;}
;return bt===undefined?null:bt;}
,forEach:function(bu,bv){for(var i=0;i<this.__lY.length;i++ ){bu.call(bv,this.__lY[i],i,this);}
;}
,filter:function(bw,self){return new qx.data.Array(this.__lY.filter(bw,self));}
,map:function(bx,self){return new qx.data.Array(this.__lY.map(bx,self));}
,some:function(by,self){return this.__lY.some(by,self);}
,every:function(bz,self){return this.__lY.every(bz,self);}
,reduce:function(bB,bA){return this.__lY.reduce(bB,bA);}
,reduceRight:function(bD,bC){return this.__lY.reduceRight(bD,bC);}
,__ma:function(){var bE=this.length;this.length=this.__lY.length;this.fireDataEvent(p,this.length,bE);}
,__mb:function(bG,bF){for(var i=bG;i<bF;i++ ){this._registerEventChaining(this.__lY[i],this.__lY[i],i);}
;}
},destruct:function(){for(var i=0;i<this.__lY.length;i++ ){var bH=this.__lY[i];this._applyEventPropagation(null,bH,i);if(this.isAutoDisposeItems()&&bH&&bH instanceof qx.core.Object){bH.dispose();}
;}
;this.__lY=null;}
});}
)();
(function(){var a="",b="runtime.name",c="node.js",d="rhino",e="undefined",f="titanium",g="qx.bom.client.Runtime";qx.Bootstrap.define(g,{statics:{getName:function(){var name=a;if(typeof environment!==e){name=d;}
else if(typeof process!==e){name=c;}
else if(typeof Titanium!==e&&typeof Titanium.userAgent!==e){name=f;}
else {name=qx.bom.client.Browser.getName();}
;return name;}
},defer:function(h){qx.core.Environment.add(b,h.getName);}
});}
)();


if (typeof exports != "undefined") {for (var key in qx) {exports[key] = qx[key];}};
define("qx", function(){});

/*! jQuery v2.2.2 | (c) jQuery Foundation | jquery.org/license */
!function(a,b){"object"==typeof module&&"object"==typeof module.exports?module.exports=a.document?b(a,!0):function(a){if(!a.document)throw new Error("jQuery requires a window with a document");return b(a)}:b(a)}("undefined"!=typeof window?window:this,function(a,b){var c=[],d=a.document,e=c.slice,f=c.concat,g=c.push,h=c.indexOf,i={},j=i.toString,k=i.hasOwnProperty,l={},m="2.2.2",n=function(a,b){return new n.fn.init(a,b)},o=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,p=/^-ms-/,q=/-([\da-z])/gi,r=function(a,b){return b.toUpperCase()};n.fn=n.prototype={jquery:m,constructor:n,selector:"",length:0,toArray:function(){return e.call(this)},get:function(a){return null!=a?0>a?this[a+this.length]:this[a]:e.call(this)},pushStack:function(a){var b=n.merge(this.constructor(),a);return b.prevObject=this,b.context=this.context,b},each:function(a){return n.each(this,a)},map:function(a){return this.pushStack(n.map(this,function(b,c){return a.call(b,c,b)}))},slice:function(){return this.pushStack(e.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(a){var b=this.length,c=+a+(0>a?b:0);return this.pushStack(c>=0&&b>c?[this[c]]:[])},end:function(){return this.prevObject||this.constructor()},push:g,sort:c.sort,splice:c.splice},n.extend=n.fn.extend=function(){var a,b,c,d,e,f,g=arguments[0]||{},h=1,i=arguments.length,j=!1;for("boolean"==typeof g&&(j=g,g=arguments[h]||{},h++),"object"==typeof g||n.isFunction(g)||(g={}),h===i&&(g=this,h--);i>h;h++)if(null!=(a=arguments[h]))for(b in a)c=g[b],d=a[b],g!==d&&(j&&d&&(n.isPlainObject(d)||(e=n.isArray(d)))?(e?(e=!1,f=c&&n.isArray(c)?c:[]):f=c&&n.isPlainObject(c)?c:{},g[b]=n.extend(j,f,d)):void 0!==d&&(g[b]=d));return g},n.extend({expando:"jQuery"+(m+Math.random()).replace(/\D/g,""),isReady:!0,error:function(a){throw new Error(a)},noop:function(){},isFunction:function(a){return"function"===n.type(a)},isArray:Array.isArray,isWindow:function(a){return null!=a&&a===a.window},isNumeric:function(a){var b=a&&a.toString();return!n.isArray(a)&&b-parseFloat(b)+1>=0},isPlainObject:function(a){var b;if("object"!==n.type(a)||a.nodeType||n.isWindow(a))return!1;if(a.constructor&&!k.call(a,"constructor")&&!k.call(a.constructor.prototype||{},"isPrototypeOf"))return!1;for(b in a);return void 0===b||k.call(a,b)},isEmptyObject:function(a){var b;for(b in a)return!1;return!0},type:function(a){return null==a?a+"":"object"==typeof a||"function"==typeof a?i[j.call(a)]||"object":typeof a},globalEval:function(a){var b,c=eval;a=n.trim(a),a&&(1===a.indexOf("use strict")?(b=d.createElement("script"),b.text=a,d.head.appendChild(b).parentNode.removeChild(b)):c(a))},camelCase:function(a){return a.replace(p,"ms-").replace(q,r)},nodeName:function(a,b){return a.nodeName&&a.nodeName.toLowerCase()===b.toLowerCase()},each:function(a,b){var c,d=0;if(s(a)){for(c=a.length;c>d;d++)if(b.call(a[d],d,a[d])===!1)break}else for(d in a)if(b.call(a[d],d,a[d])===!1)break;return a},trim:function(a){return null==a?"":(a+"").replace(o,"")},makeArray:function(a,b){var c=b||[];return null!=a&&(s(Object(a))?n.merge(c,"string"==typeof a?[a]:a):g.call(c,a)),c},inArray:function(a,b,c){return null==b?-1:h.call(b,a,c)},merge:function(a,b){for(var c=+b.length,d=0,e=a.length;c>d;d++)a[e++]=b[d];return a.length=e,a},grep:function(a,b,c){for(var d,e=[],f=0,g=a.length,h=!c;g>f;f++)d=!b(a[f],f),d!==h&&e.push(a[f]);return e},map:function(a,b,c){var d,e,g=0,h=[];if(s(a))for(d=a.length;d>g;g++)e=b(a[g],g,c),null!=e&&h.push(e);else for(g in a)e=b(a[g],g,c),null!=e&&h.push(e);return f.apply([],h)},guid:1,proxy:function(a,b){var c,d,f;return"string"==typeof b&&(c=a[b],b=a,a=c),n.isFunction(a)?(d=e.call(arguments,2),f=function(){return a.apply(b||this,d.concat(e.call(arguments)))},f.guid=a.guid=a.guid||n.guid++,f):void 0},now:Date.now,support:l}),"function"==typeof Symbol&&(n.fn[Symbol.iterator]=c[Symbol.iterator]),n.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "),function(a,b){i["[object "+b+"]"]=b.toLowerCase()});function s(a){var b=!!a&&"length"in a&&a.length,c=n.type(a);return"function"===c||n.isWindow(a)?!1:"array"===c||0===b||"number"==typeof b&&b>0&&b-1 in a}var t=function(a){var b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u="sizzle"+1*new Date,v=a.document,w=0,x=0,y=ga(),z=ga(),A=ga(),B=function(a,b){return a===b&&(l=!0),0},C=1<<31,D={}.hasOwnProperty,E=[],F=E.pop,G=E.push,H=E.push,I=E.slice,J=function(a,b){for(var c=0,d=a.length;d>c;c++)if(a[c]===b)return c;return-1},K="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",L="[\\x20\\t\\r\\n\\f]",M="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",N="\\["+L+"*("+M+")(?:"+L+"*([*^$|!~]?=)"+L+"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+M+"))|)"+L+"*\\]",O=":("+M+")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|"+N+")*)|.*)\\)|)",P=new RegExp(L+"+","g"),Q=new RegExp("^"+L+"+|((?:^|[^\\\\])(?:\\\\.)*)"+L+"+$","g"),R=new RegExp("^"+L+"*,"+L+"*"),S=new RegExp("^"+L+"*([>+~]|"+L+")"+L+"*"),T=new RegExp("="+L+"*([^\\]'\"]*?)"+L+"*\\]","g"),U=new RegExp(O),V=new RegExp("^"+M+"$"),W={ID:new RegExp("^#("+M+")"),CLASS:new RegExp("^\\.("+M+")"),TAG:new RegExp("^("+M+"|[*])"),ATTR:new RegExp("^"+N),PSEUDO:new RegExp("^"+O),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+L+"*(even|odd|(([+-]|)(\\d*)n|)"+L+"*(?:([+-]|)"+L+"*(\\d+)|))"+L+"*\\)|)","i"),bool:new RegExp("^(?:"+K+")$","i"),needsContext:new RegExp("^"+L+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+L+"*((?:-\\d)?\\d*)"+L+"*\\)|)(?=[^-]|$)","i")},X=/^(?:input|select|textarea|button)$/i,Y=/^h\d$/i,Z=/^[^{]+\{\s*\[native \w/,$=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,_=/[+~]/,aa=/'|\\/g,ba=new RegExp("\\\\([\\da-f]{1,6}"+L+"?|("+L+")|.)","ig"),ca=function(a,b,c){var d="0x"+b-65536;return d!==d||c?b:0>d?String.fromCharCode(d+65536):String.fromCharCode(d>>10|55296,1023&d|56320)},da=function(){m()};try{H.apply(E=I.call(v.childNodes),v.childNodes),E[v.childNodes.length].nodeType}catch(ea){H={apply:E.length?function(a,b){G.apply(a,I.call(b))}:function(a,b){var c=a.length,d=0;while(a[c++]=b[d++]);a.length=c-1}}}function fa(a,b,d,e){var f,h,j,k,l,o,r,s,w=b&&b.ownerDocument,x=b?b.nodeType:9;if(d=d||[],"string"!=typeof a||!a||1!==x&&9!==x&&11!==x)return d;if(!e&&((b?b.ownerDocument||b:v)!==n&&m(b),b=b||n,p)){if(11!==x&&(o=$.exec(a)))if(f=o[1]){if(9===x){if(!(j=b.getElementById(f)))return d;if(j.id===f)return d.push(j),d}else if(w&&(j=w.getElementById(f))&&t(b,j)&&j.id===f)return d.push(j),d}else{if(o[2])return H.apply(d,b.getElementsByTagName(a)),d;if((f=o[3])&&c.getElementsByClassName&&b.getElementsByClassName)return H.apply(d,b.getElementsByClassName(f)),d}if(c.qsa&&!A[a+" "]&&(!q||!q.test(a))){if(1!==x)w=b,s=a;else if("object"!==b.nodeName.toLowerCase()){(k=b.getAttribute("id"))?k=k.replace(aa,"\\$&"):b.setAttribute("id",k=u),r=g(a),h=r.length,l=V.test(k)?"#"+k:"[id='"+k+"']";while(h--)r[h]=l+" "+qa(r[h]);s=r.join(","),w=_.test(a)&&oa(b.parentNode)||b}if(s)try{return H.apply(d,w.querySelectorAll(s)),d}catch(y){}finally{k===u&&b.removeAttribute("id")}}}return i(a.replace(Q,"$1"),b,d,e)}function ga(){var a=[];function b(c,e){return a.push(c+" ")>d.cacheLength&&delete b[a.shift()],b[c+" "]=e}return b}function ha(a){return a[u]=!0,a}function ia(a){var b=n.createElement("div");try{return!!a(b)}catch(c){return!1}finally{b.parentNode&&b.parentNode.removeChild(b),b=null}}function ja(a,b){var c=a.split("|"),e=c.length;while(e--)d.attrHandle[c[e]]=b}function ka(a,b){var c=b&&a,d=c&&1===a.nodeType&&1===b.nodeType&&(~b.sourceIndex||C)-(~a.sourceIndex||C);if(d)return d;if(c)while(c=c.nextSibling)if(c===b)return-1;return a?1:-1}function la(a){return function(b){var c=b.nodeName.toLowerCase();return"input"===c&&b.type===a}}function ma(a){return function(b){var c=b.nodeName.toLowerCase();return("input"===c||"button"===c)&&b.type===a}}function na(a){return ha(function(b){return b=+b,ha(function(c,d){var e,f=a([],c.length,b),g=f.length;while(g--)c[e=f[g]]&&(c[e]=!(d[e]=c[e]))})})}function oa(a){return a&&"undefined"!=typeof a.getElementsByTagName&&a}c=fa.support={},f=fa.isXML=function(a){var b=a&&(a.ownerDocument||a).documentElement;return b?"HTML"!==b.nodeName:!1},m=fa.setDocument=function(a){var b,e,g=a?a.ownerDocument||a:v;return g!==n&&9===g.nodeType&&g.documentElement?(n=g,o=n.documentElement,p=!f(n),(e=n.defaultView)&&e.top!==e&&(e.addEventListener?e.addEventListener("unload",da,!1):e.attachEvent&&e.attachEvent("onunload",da)),c.attributes=ia(function(a){return a.className="i",!a.getAttribute("className")}),c.getElementsByTagName=ia(function(a){return a.appendChild(n.createComment("")),!a.getElementsByTagName("*").length}),c.getElementsByClassName=Z.test(n.getElementsByClassName),c.getById=ia(function(a){return o.appendChild(a).id=u,!n.getElementsByName||!n.getElementsByName(u).length}),c.getById?(d.find.ID=function(a,b){if("undefined"!=typeof b.getElementById&&p){var c=b.getElementById(a);return c?[c]:[]}},d.filter.ID=function(a){var b=a.replace(ba,ca);return function(a){return a.getAttribute("id")===b}}):(delete d.find.ID,d.filter.ID=function(a){var b=a.replace(ba,ca);return function(a){var c="undefined"!=typeof a.getAttributeNode&&a.getAttributeNode("id");return c&&c.value===b}}),d.find.TAG=c.getElementsByTagName?function(a,b){return"undefined"!=typeof b.getElementsByTagName?b.getElementsByTagName(a):c.qsa?b.querySelectorAll(a):void 0}:function(a,b){var c,d=[],e=0,f=b.getElementsByTagName(a);if("*"===a){while(c=f[e++])1===c.nodeType&&d.push(c);return d}return f},d.find.CLASS=c.getElementsByClassName&&function(a,b){return"undefined"!=typeof b.getElementsByClassName&&p?b.getElementsByClassName(a):void 0},r=[],q=[],(c.qsa=Z.test(n.querySelectorAll))&&(ia(function(a){o.appendChild(a).innerHTML="<a id='"+u+"'></a><select id='"+u+"-\r\\' msallowcapture=''><option selected=''></option></select>",a.querySelectorAll("[msallowcapture^='']").length&&q.push("[*^$]="+L+"*(?:''|\"\")"),a.querySelectorAll("[selected]").length||q.push("\\["+L+"*(?:value|"+K+")"),a.querySelectorAll("[id~="+u+"-]").length||q.push("~="),a.querySelectorAll(":checked").length||q.push(":checked"),a.querySelectorAll("a#"+u+"+*").length||q.push(".#.+[+~]")}),ia(function(a){var b=n.createElement("input");b.setAttribute("type","hidden"),a.appendChild(b).setAttribute("name","D"),a.querySelectorAll("[name=d]").length&&q.push("name"+L+"*[*^$|!~]?="),a.querySelectorAll(":enabled").length||q.push(":enabled",":disabled"),a.querySelectorAll("*,:x"),q.push(",.*:")})),(c.matchesSelector=Z.test(s=o.matches||o.webkitMatchesSelector||o.mozMatchesSelector||o.oMatchesSelector||o.msMatchesSelector))&&ia(function(a){c.disconnectedMatch=s.call(a,"div"),s.call(a,"[s!='']:x"),r.push("!=",O)}),q=q.length&&new RegExp(q.join("|")),r=r.length&&new RegExp(r.join("|")),b=Z.test(o.compareDocumentPosition),t=b||Z.test(o.contains)?function(a,b){var c=9===a.nodeType?a.documentElement:a,d=b&&b.parentNode;return a===d||!(!d||1!==d.nodeType||!(c.contains?c.contains(d):a.compareDocumentPosition&&16&a.compareDocumentPosition(d)))}:function(a,b){if(b)while(b=b.parentNode)if(b===a)return!0;return!1},B=b?function(a,b){if(a===b)return l=!0,0;var d=!a.compareDocumentPosition-!b.compareDocumentPosition;return d?d:(d=(a.ownerDocument||a)===(b.ownerDocument||b)?a.compareDocumentPosition(b):1,1&d||!c.sortDetached&&b.compareDocumentPosition(a)===d?a===n||a.ownerDocument===v&&t(v,a)?-1:b===n||b.ownerDocument===v&&t(v,b)?1:k?J(k,a)-J(k,b):0:4&d?-1:1)}:function(a,b){if(a===b)return l=!0,0;var c,d=0,e=a.parentNode,f=b.parentNode,g=[a],h=[b];if(!e||!f)return a===n?-1:b===n?1:e?-1:f?1:k?J(k,a)-J(k,b):0;if(e===f)return ka(a,b);c=a;while(c=c.parentNode)g.unshift(c);c=b;while(c=c.parentNode)h.unshift(c);while(g[d]===h[d])d++;return d?ka(g[d],h[d]):g[d]===v?-1:h[d]===v?1:0},n):n},fa.matches=function(a,b){return fa(a,null,null,b)},fa.matchesSelector=function(a,b){if((a.ownerDocument||a)!==n&&m(a),b=b.replace(T,"='$1']"),c.matchesSelector&&p&&!A[b+" "]&&(!r||!r.test(b))&&(!q||!q.test(b)))try{var d=s.call(a,b);if(d||c.disconnectedMatch||a.document&&11!==a.document.nodeType)return d}catch(e){}return fa(b,n,null,[a]).length>0},fa.contains=function(a,b){return(a.ownerDocument||a)!==n&&m(a),t(a,b)},fa.attr=function(a,b){(a.ownerDocument||a)!==n&&m(a);var e=d.attrHandle[b.toLowerCase()],f=e&&D.call(d.attrHandle,b.toLowerCase())?e(a,b,!p):void 0;return void 0!==f?f:c.attributes||!p?a.getAttribute(b):(f=a.getAttributeNode(b))&&f.specified?f.value:null},fa.error=function(a){throw new Error("Syntax error, unrecognized expression: "+a)},fa.uniqueSort=function(a){var b,d=[],e=0,f=0;if(l=!c.detectDuplicates,k=!c.sortStable&&a.slice(0),a.sort(B),l){while(b=a[f++])b===a[f]&&(e=d.push(f));while(e--)a.splice(d[e],1)}return k=null,a},e=fa.getText=function(a){var b,c="",d=0,f=a.nodeType;if(f){if(1===f||9===f||11===f){if("string"==typeof a.textContent)return a.textContent;for(a=a.firstChild;a;a=a.nextSibling)c+=e(a)}else if(3===f||4===f)return a.nodeValue}else while(b=a[d++])c+=e(b);return c},d=fa.selectors={cacheLength:50,createPseudo:ha,match:W,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(a){return a[1]=a[1].replace(ba,ca),a[3]=(a[3]||a[4]||a[5]||"").replace(ba,ca),"~="===a[2]&&(a[3]=" "+a[3]+" "),a.slice(0,4)},CHILD:function(a){return a[1]=a[1].toLowerCase(),"nth"===a[1].slice(0,3)?(a[3]||fa.error(a[0]),a[4]=+(a[4]?a[5]+(a[6]||1):2*("even"===a[3]||"odd"===a[3])),a[5]=+(a[7]+a[8]||"odd"===a[3])):a[3]&&fa.error(a[0]),a},PSEUDO:function(a){var b,c=!a[6]&&a[2];return W.CHILD.test(a[0])?null:(a[3]?a[2]=a[4]||a[5]||"":c&&U.test(c)&&(b=g(c,!0))&&(b=c.indexOf(")",c.length-b)-c.length)&&(a[0]=a[0].slice(0,b),a[2]=c.slice(0,b)),a.slice(0,3))}},filter:{TAG:function(a){var b=a.replace(ba,ca).toLowerCase();return"*"===a?function(){return!0}:function(a){return a.nodeName&&a.nodeName.toLowerCase()===b}},CLASS:function(a){var b=y[a+" "];return b||(b=new RegExp("(^|"+L+")"+a+"("+L+"|$)"))&&y(a,function(a){return b.test("string"==typeof a.className&&a.className||"undefined"!=typeof a.getAttribute&&a.getAttribute("class")||"")})},ATTR:function(a,b,c){return function(d){var e=fa.attr(d,a);return null==e?"!="===b:b?(e+="","="===b?e===c:"!="===b?e!==c:"^="===b?c&&0===e.indexOf(c):"*="===b?c&&e.indexOf(c)>-1:"$="===b?c&&e.slice(-c.length)===c:"~="===b?(" "+e.replace(P," ")+" ").indexOf(c)>-1:"|="===b?e===c||e.slice(0,c.length+1)===c+"-":!1):!0}},CHILD:function(a,b,c,d,e){var f="nth"!==a.slice(0,3),g="last"!==a.slice(-4),h="of-type"===b;return 1===d&&0===e?function(a){return!!a.parentNode}:function(b,c,i){var j,k,l,m,n,o,p=f!==g?"nextSibling":"previousSibling",q=b.parentNode,r=h&&b.nodeName.toLowerCase(),s=!i&&!h,t=!1;if(q){if(f){while(p){m=b;while(m=m[p])if(h?m.nodeName.toLowerCase()===r:1===m.nodeType)return!1;o=p="only"===a&&!o&&"nextSibling"}return!0}if(o=[g?q.firstChild:q.lastChild],g&&s){m=q,l=m[u]||(m[u]={}),k=l[m.uniqueID]||(l[m.uniqueID]={}),j=k[a]||[],n=j[0]===w&&j[1],t=n&&j[2],m=n&&q.childNodes[n];while(m=++n&&m&&m[p]||(t=n=0)||o.pop())if(1===m.nodeType&&++t&&m===b){k[a]=[w,n,t];break}}else if(s&&(m=b,l=m[u]||(m[u]={}),k=l[m.uniqueID]||(l[m.uniqueID]={}),j=k[a]||[],n=j[0]===w&&j[1],t=n),t===!1)while(m=++n&&m&&m[p]||(t=n=0)||o.pop())if((h?m.nodeName.toLowerCase()===r:1===m.nodeType)&&++t&&(s&&(l=m[u]||(m[u]={}),k=l[m.uniqueID]||(l[m.uniqueID]={}),k[a]=[w,t]),m===b))break;return t-=e,t===d||t%d===0&&t/d>=0}}},PSEUDO:function(a,b){var c,e=d.pseudos[a]||d.setFilters[a.toLowerCase()]||fa.error("unsupported pseudo: "+a);return e[u]?e(b):e.length>1?(c=[a,a,"",b],d.setFilters.hasOwnProperty(a.toLowerCase())?ha(function(a,c){var d,f=e(a,b),g=f.length;while(g--)d=J(a,f[g]),a[d]=!(c[d]=f[g])}):function(a){return e(a,0,c)}):e}},pseudos:{not:ha(function(a){var b=[],c=[],d=h(a.replace(Q,"$1"));return d[u]?ha(function(a,b,c,e){var f,g=d(a,null,e,[]),h=a.length;while(h--)(f=g[h])&&(a[h]=!(b[h]=f))}):function(a,e,f){return b[0]=a,d(b,null,f,c),b[0]=null,!c.pop()}}),has:ha(function(a){return function(b){return fa(a,b).length>0}}),contains:ha(function(a){return a=a.replace(ba,ca),function(b){return(b.textContent||b.innerText||e(b)).indexOf(a)>-1}}),lang:ha(function(a){return V.test(a||"")||fa.error("unsupported lang: "+a),a=a.replace(ba,ca).toLowerCase(),function(b){var c;do if(c=p?b.lang:b.getAttribute("xml:lang")||b.getAttribute("lang"))return c=c.toLowerCase(),c===a||0===c.indexOf(a+"-");while((b=b.parentNode)&&1===b.nodeType);return!1}}),target:function(b){var c=a.location&&a.location.hash;return c&&c.slice(1)===b.id},root:function(a){return a===o},focus:function(a){return a===n.activeElement&&(!n.hasFocus||n.hasFocus())&&!!(a.type||a.href||~a.tabIndex)},enabled:function(a){return a.disabled===!1},disabled:function(a){return a.disabled===!0},checked:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&!!a.checked||"option"===b&&!!a.selected},selected:function(a){return a.parentNode&&a.parentNode.selectedIndex,a.selected===!0},empty:function(a){for(a=a.firstChild;a;a=a.nextSibling)if(a.nodeType<6)return!1;return!0},parent:function(a){return!d.pseudos.empty(a)},header:function(a){return Y.test(a.nodeName)},input:function(a){return X.test(a.nodeName)},button:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&"button"===a.type||"button"===b},text:function(a){var b;return"input"===a.nodeName.toLowerCase()&&"text"===a.type&&(null==(b=a.getAttribute("type"))||"text"===b.toLowerCase())},first:na(function(){return[0]}),last:na(function(a,b){return[b-1]}),eq:na(function(a,b,c){return[0>c?c+b:c]}),even:na(function(a,b){for(var c=0;b>c;c+=2)a.push(c);return a}),odd:na(function(a,b){for(var c=1;b>c;c+=2)a.push(c);return a}),lt:na(function(a,b,c){for(var d=0>c?c+b:c;--d>=0;)a.push(d);return a}),gt:na(function(a,b,c){for(var d=0>c?c+b:c;++d<b;)a.push(d);return a})}},d.pseudos.nth=d.pseudos.eq;for(b in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})d.pseudos[b]=la(b);for(b in{submit:!0,reset:!0})d.pseudos[b]=ma(b);function pa(){}pa.prototype=d.filters=d.pseudos,d.setFilters=new pa,g=fa.tokenize=function(a,b){var c,e,f,g,h,i,j,k=z[a+" "];if(k)return b?0:k.slice(0);h=a,i=[],j=d.preFilter;while(h){c&&!(e=R.exec(h))||(e&&(h=h.slice(e[0].length)||h),i.push(f=[])),c=!1,(e=S.exec(h))&&(c=e.shift(),f.push({value:c,type:e[0].replace(Q," ")}),h=h.slice(c.length));for(g in d.filter)!(e=W[g].exec(h))||j[g]&&!(e=j[g](e))||(c=e.shift(),f.push({value:c,type:g,matches:e}),h=h.slice(c.length));if(!c)break}return b?h.length:h?fa.error(a):z(a,i).slice(0)};function qa(a){for(var b=0,c=a.length,d="";c>b;b++)d+=a[b].value;return d}function ra(a,b,c){var d=b.dir,e=c&&"parentNode"===d,f=x++;return b.first?function(b,c,f){while(b=b[d])if(1===b.nodeType||e)return a(b,c,f)}:function(b,c,g){var h,i,j,k=[w,f];if(g){while(b=b[d])if((1===b.nodeType||e)&&a(b,c,g))return!0}else while(b=b[d])if(1===b.nodeType||e){if(j=b[u]||(b[u]={}),i=j[b.uniqueID]||(j[b.uniqueID]={}),(h=i[d])&&h[0]===w&&h[1]===f)return k[2]=h[2];if(i[d]=k,k[2]=a(b,c,g))return!0}}}function sa(a){return a.length>1?function(b,c,d){var e=a.length;while(e--)if(!a[e](b,c,d))return!1;return!0}:a[0]}function ta(a,b,c){for(var d=0,e=b.length;e>d;d++)fa(a,b[d],c);return c}function ua(a,b,c,d,e){for(var f,g=[],h=0,i=a.length,j=null!=b;i>h;h++)(f=a[h])&&(c&&!c(f,d,e)||(g.push(f),j&&b.push(h)));return g}function va(a,b,c,d,e,f){return d&&!d[u]&&(d=va(d)),e&&!e[u]&&(e=va(e,f)),ha(function(f,g,h,i){var j,k,l,m=[],n=[],o=g.length,p=f||ta(b||"*",h.nodeType?[h]:h,[]),q=!a||!f&&b?p:ua(p,m,a,h,i),r=c?e||(f?a:o||d)?[]:g:q;if(c&&c(q,r,h,i),d){j=ua(r,n),d(j,[],h,i),k=j.length;while(k--)(l=j[k])&&(r[n[k]]=!(q[n[k]]=l))}if(f){if(e||a){if(e){j=[],k=r.length;while(k--)(l=r[k])&&j.push(q[k]=l);e(null,r=[],j,i)}k=r.length;while(k--)(l=r[k])&&(j=e?J(f,l):m[k])>-1&&(f[j]=!(g[j]=l))}}else r=ua(r===g?r.splice(o,r.length):r),e?e(null,g,r,i):H.apply(g,r)})}function wa(a){for(var b,c,e,f=a.length,g=d.relative[a[0].type],h=g||d.relative[" "],i=g?1:0,k=ra(function(a){return a===b},h,!0),l=ra(function(a){return J(b,a)>-1},h,!0),m=[function(a,c,d){var e=!g&&(d||c!==j)||((b=c).nodeType?k(a,c,d):l(a,c,d));return b=null,e}];f>i;i++)if(c=d.relative[a[i].type])m=[ra(sa(m),c)];else{if(c=d.filter[a[i].type].apply(null,a[i].matches),c[u]){for(e=++i;f>e;e++)if(d.relative[a[e].type])break;return va(i>1&&sa(m),i>1&&qa(a.slice(0,i-1).concat({value:" "===a[i-2].type?"*":""})).replace(Q,"$1"),c,e>i&&wa(a.slice(i,e)),f>e&&wa(a=a.slice(e)),f>e&&qa(a))}m.push(c)}return sa(m)}function xa(a,b){var c=b.length>0,e=a.length>0,f=function(f,g,h,i,k){var l,o,q,r=0,s="0",t=f&&[],u=[],v=j,x=f||e&&d.find.TAG("*",k),y=w+=null==v?1:Math.random()||.1,z=x.length;for(k&&(j=g===n||g||k);s!==z&&null!=(l=x[s]);s++){if(e&&l){o=0,g||l.ownerDocument===n||(m(l),h=!p);while(q=a[o++])if(q(l,g||n,h)){i.push(l);break}k&&(w=y)}c&&((l=!q&&l)&&r--,f&&t.push(l))}if(r+=s,c&&s!==r){o=0;while(q=b[o++])q(t,u,g,h);if(f){if(r>0)while(s--)t[s]||u[s]||(u[s]=F.call(i));u=ua(u)}H.apply(i,u),k&&!f&&u.length>0&&r+b.length>1&&fa.uniqueSort(i)}return k&&(w=y,j=v),t};return c?ha(f):f}return h=fa.compile=function(a,b){var c,d=[],e=[],f=A[a+" "];if(!f){b||(b=g(a)),c=b.length;while(c--)f=wa(b[c]),f[u]?d.push(f):e.push(f);f=A(a,xa(e,d)),f.selector=a}return f},i=fa.select=function(a,b,e,f){var i,j,k,l,m,n="function"==typeof a&&a,o=!f&&g(a=n.selector||a);if(e=e||[],1===o.length){if(j=o[0]=o[0].slice(0),j.length>2&&"ID"===(k=j[0]).type&&c.getById&&9===b.nodeType&&p&&d.relative[j[1].type]){if(b=(d.find.ID(k.matches[0].replace(ba,ca),b)||[])[0],!b)return e;n&&(b=b.parentNode),a=a.slice(j.shift().value.length)}i=W.needsContext.test(a)?0:j.length;while(i--){if(k=j[i],d.relative[l=k.type])break;if((m=d.find[l])&&(f=m(k.matches[0].replace(ba,ca),_.test(j[0].type)&&oa(b.parentNode)||b))){if(j.splice(i,1),a=f.length&&qa(j),!a)return H.apply(e,f),e;break}}}return(n||h(a,o))(f,b,!p,e,!b||_.test(a)&&oa(b.parentNode)||b),e},c.sortStable=u.split("").sort(B).join("")===u,c.detectDuplicates=!!l,m(),c.sortDetached=ia(function(a){return 1&a.compareDocumentPosition(n.createElement("div"))}),ia(function(a){return a.innerHTML="<a href='#'></a>","#"===a.firstChild.getAttribute("href")})||ja("type|href|height|width",function(a,b,c){return c?void 0:a.getAttribute(b,"type"===b.toLowerCase()?1:2)}),c.attributes&&ia(function(a){return a.innerHTML="<input/>",a.firstChild.setAttribute("value",""),""===a.firstChild.getAttribute("value")})||ja("value",function(a,b,c){return c||"input"!==a.nodeName.toLowerCase()?void 0:a.defaultValue}),ia(function(a){return null==a.getAttribute("disabled")})||ja(K,function(a,b,c){var d;return c?void 0:a[b]===!0?b.toLowerCase():(d=a.getAttributeNode(b))&&d.specified?d.value:null}),fa}(a);n.find=t,n.expr=t.selectors,n.expr[":"]=n.expr.pseudos,n.uniqueSort=n.unique=t.uniqueSort,n.text=t.getText,n.isXMLDoc=t.isXML,n.contains=t.contains;var u=function(a,b,c){var d=[],e=void 0!==c;while((a=a[b])&&9!==a.nodeType)if(1===a.nodeType){if(e&&n(a).is(c))break;d.push(a)}return d},v=function(a,b){for(var c=[];a;a=a.nextSibling)1===a.nodeType&&a!==b&&c.push(a);return c},w=n.expr.match.needsContext,x=/^<([\w-]+)\s*\/?>(?:<\/\1>|)$/,y=/^.[^:#\[\.,]*$/;function z(a,b,c){if(n.isFunction(b))return n.grep(a,function(a,d){return!!b.call(a,d,a)!==c});if(b.nodeType)return n.grep(a,function(a){return a===b!==c});if("string"==typeof b){if(y.test(b))return n.filter(b,a,c);b=n.filter(b,a)}return n.grep(a,function(a){return h.call(b,a)>-1!==c})}n.filter=function(a,b,c){var d=b[0];return c&&(a=":not("+a+")"),1===b.length&&1===d.nodeType?n.find.matchesSelector(d,a)?[d]:[]:n.find.matches(a,n.grep(b,function(a){return 1===a.nodeType}))},n.fn.extend({find:function(a){var b,c=this.length,d=[],e=this;if("string"!=typeof a)return this.pushStack(n(a).filter(function(){for(b=0;c>b;b++)if(n.contains(e[b],this))return!0}));for(b=0;c>b;b++)n.find(a,e[b],d);return d=this.pushStack(c>1?n.unique(d):d),d.selector=this.selector?this.selector+" "+a:a,d},filter:function(a){return this.pushStack(z(this,a||[],!1))},not:function(a){return this.pushStack(z(this,a||[],!0))},is:function(a){return!!z(this,"string"==typeof a&&w.test(a)?n(a):a||[],!1).length}});var A,B=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,C=n.fn.init=function(a,b,c){var e,f;if(!a)return this;if(c=c||A,"string"==typeof a){if(e="<"===a[0]&&">"===a[a.length-1]&&a.length>=3?[null,a,null]:B.exec(a),!e||!e[1]&&b)return!b||b.jquery?(b||c).find(a):this.constructor(b).find(a);if(e[1]){if(b=b instanceof n?b[0]:b,n.merge(this,n.parseHTML(e[1],b&&b.nodeType?b.ownerDocument||b:d,!0)),x.test(e[1])&&n.isPlainObject(b))for(e in b)n.isFunction(this[e])?this[e](b[e]):this.attr(e,b[e]);return this}return f=d.getElementById(e[2]),f&&f.parentNode&&(this.length=1,this[0]=f),this.context=d,this.selector=a,this}return a.nodeType?(this.context=this[0]=a,this.length=1,this):n.isFunction(a)?void 0!==c.ready?c.ready(a):a(n):(void 0!==a.selector&&(this.selector=a.selector,this.context=a.context),n.makeArray(a,this))};C.prototype=n.fn,A=n(d);var D=/^(?:parents|prev(?:Until|All))/,E={children:!0,contents:!0,next:!0,prev:!0};n.fn.extend({has:function(a){var b=n(a,this),c=b.length;return this.filter(function(){for(var a=0;c>a;a++)if(n.contains(this,b[a]))return!0})},closest:function(a,b){for(var c,d=0,e=this.length,f=[],g=w.test(a)||"string"!=typeof a?n(a,b||this.context):0;e>d;d++)for(c=this[d];c&&c!==b;c=c.parentNode)if(c.nodeType<11&&(g?g.index(c)>-1:1===c.nodeType&&n.find.matchesSelector(c,a))){f.push(c);break}return this.pushStack(f.length>1?n.uniqueSort(f):f)},index:function(a){return a?"string"==typeof a?h.call(n(a),this[0]):h.call(this,a.jquery?a[0]:a):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(a,b){return this.pushStack(n.uniqueSort(n.merge(this.get(),n(a,b))))},addBack:function(a){return this.add(null==a?this.prevObject:this.prevObject.filter(a))}});function F(a,b){while((a=a[b])&&1!==a.nodeType);return a}n.each({parent:function(a){var b=a.parentNode;return b&&11!==b.nodeType?b:null},parents:function(a){return u(a,"parentNode")},parentsUntil:function(a,b,c){return u(a,"parentNode",c)},next:function(a){return F(a,"nextSibling")},prev:function(a){return F(a,"previousSibling")},nextAll:function(a){return u(a,"nextSibling")},prevAll:function(a){return u(a,"previousSibling")},nextUntil:function(a,b,c){return u(a,"nextSibling",c)},prevUntil:function(a,b,c){return u(a,"previousSibling",c)},siblings:function(a){return v((a.parentNode||{}).firstChild,a)},children:function(a){return v(a.firstChild)},contents:function(a){return a.contentDocument||n.merge([],a.childNodes)}},function(a,b){n.fn[a]=function(c,d){var e=n.map(this,b,c);return"Until"!==a.slice(-5)&&(d=c),d&&"string"==typeof d&&(e=n.filter(d,e)),this.length>1&&(E[a]||n.uniqueSort(e),D.test(a)&&e.reverse()),this.pushStack(e)}});var G=/\S+/g;function H(a){var b={};return n.each(a.match(G)||[],function(a,c){b[c]=!0}),b}n.Callbacks=function(a){a="string"==typeof a?H(a):n.extend({},a);var b,c,d,e,f=[],g=[],h=-1,i=function(){for(e=a.once,d=b=!0;g.length;h=-1){c=g.shift();while(++h<f.length)f[h].apply(c[0],c[1])===!1&&a.stopOnFalse&&(h=f.length,c=!1)}a.memory||(c=!1),b=!1,e&&(f=c?[]:"")},j={add:function(){return f&&(c&&!b&&(h=f.length-1,g.push(c)),function d(b){n.each(b,function(b,c){n.isFunction(c)?a.unique&&j.has(c)||f.push(c):c&&c.length&&"string"!==n.type(c)&&d(c)})}(arguments),c&&!b&&i()),this},remove:function(){return n.each(arguments,function(a,b){var c;while((c=n.inArray(b,f,c))>-1)f.splice(c,1),h>=c&&h--}),this},has:function(a){return a?n.inArray(a,f)>-1:f.length>0},empty:function(){return f&&(f=[]),this},disable:function(){return e=g=[],f=c="",this},disabled:function(){return!f},lock:function(){return e=g=[],c||(f=c=""),this},locked:function(){return!!e},fireWith:function(a,c){return e||(c=c||[],c=[a,c.slice?c.slice():c],g.push(c),b||i()),this},fire:function(){return j.fireWith(this,arguments),this},fired:function(){return!!d}};return j},n.extend({Deferred:function(a){var b=[["resolve","done",n.Callbacks("once memory"),"resolved"],["reject","fail",n.Callbacks("once memory"),"rejected"],["notify","progress",n.Callbacks("memory")]],c="pending",d={state:function(){return c},always:function(){return e.done(arguments).fail(arguments),this},then:function(){var a=arguments;return n.Deferred(function(c){n.each(b,function(b,f){var g=n.isFunction(a[b])&&a[b];e[f[1]](function(){var a=g&&g.apply(this,arguments);a&&n.isFunction(a.promise)?a.promise().progress(c.notify).done(c.resolve).fail(c.reject):c[f[0]+"With"](this===d?c.promise():this,g?[a]:arguments)})}),a=null}).promise()},promise:function(a){return null!=a?n.extend(a,d):d}},e={};return d.pipe=d.then,n.each(b,function(a,f){var g=f[2],h=f[3];d[f[1]]=g.add,h&&g.add(function(){c=h},b[1^a][2].disable,b[2][2].lock),e[f[0]]=function(){return e[f[0]+"With"](this===e?d:this,arguments),this},e[f[0]+"With"]=g.fireWith}),d.promise(e),a&&a.call(e,e),e},when:function(a){var b=0,c=e.call(arguments),d=c.length,f=1!==d||a&&n.isFunction(a.promise)?d:0,g=1===f?a:n.Deferred(),h=function(a,b,c){return function(d){b[a]=this,c[a]=arguments.length>1?e.call(arguments):d,c===i?g.notifyWith(b,c):--f||g.resolveWith(b,c)}},i,j,k;if(d>1)for(i=new Array(d),j=new Array(d),k=new Array(d);d>b;b++)c[b]&&n.isFunction(c[b].promise)?c[b].promise().progress(h(b,j,i)).done(h(b,k,c)).fail(g.reject):--f;return f||g.resolveWith(k,c),g.promise()}});var I;n.fn.ready=function(a){return n.ready.promise().done(a),this},n.extend({isReady:!1,readyWait:1,holdReady:function(a){a?n.readyWait++:n.ready(!0)},ready:function(a){(a===!0?--n.readyWait:n.isReady)||(n.isReady=!0,a!==!0&&--n.readyWait>0||(I.resolveWith(d,[n]),n.fn.triggerHandler&&(n(d).triggerHandler("ready"),n(d).off("ready"))))}});function J(){d.removeEventListener("DOMContentLoaded",J),a.removeEventListener("load",J),n.ready()}n.ready.promise=function(b){return I||(I=n.Deferred(),"complete"===d.readyState||"loading"!==d.readyState&&!d.documentElement.doScroll?a.setTimeout(n.ready):(d.addEventListener("DOMContentLoaded",J),a.addEventListener("load",J))),I.promise(b)},n.ready.promise();var K=function(a,b,c,d,e,f,g){var h=0,i=a.length,j=null==c;if("object"===n.type(c)){e=!0;for(h in c)K(a,b,h,c[h],!0,f,g)}else if(void 0!==d&&(e=!0,n.isFunction(d)||(g=!0),j&&(g?(b.call(a,d),b=null):(j=b,b=function(a,b,c){return j.call(n(a),c)})),b))for(;i>h;h++)b(a[h],c,g?d:d.call(a[h],h,b(a[h],c)));return e?a:j?b.call(a):i?b(a[0],c):f},L=function(a){return 1===a.nodeType||9===a.nodeType||!+a.nodeType};function M(){this.expando=n.expando+M.uid++}M.uid=1,M.prototype={register:function(a,b){var c=b||{};return a.nodeType?a[this.expando]=c:Object.defineProperty(a,this.expando,{value:c,writable:!0,configurable:!0}),a[this.expando]},cache:function(a){if(!L(a))return{};var b=a[this.expando];return b||(b={},L(a)&&(a.nodeType?a[this.expando]=b:Object.defineProperty(a,this.expando,{value:b,configurable:!0}))),b},set:function(a,b,c){var d,e=this.cache(a);if("string"==typeof b)e[b]=c;else for(d in b)e[d]=b[d];return e},get:function(a,b){return void 0===b?this.cache(a):a[this.expando]&&a[this.expando][b]},access:function(a,b,c){var d;return void 0===b||b&&"string"==typeof b&&void 0===c?(d=this.get(a,b),void 0!==d?d:this.get(a,n.camelCase(b))):(this.set(a,b,c),void 0!==c?c:b)},remove:function(a,b){var c,d,e,f=a[this.expando];if(void 0!==f){if(void 0===b)this.register(a);else{n.isArray(b)?d=b.concat(b.map(n.camelCase)):(e=n.camelCase(b),b in f?d=[b,e]:(d=e,d=d in f?[d]:d.match(G)||[])),c=d.length;while(c--)delete f[d[c]]}(void 0===b||n.isEmptyObject(f))&&(a.nodeType?a[this.expando]=void 0:delete a[this.expando])}},hasData:function(a){var b=a[this.expando];return void 0!==b&&!n.isEmptyObject(b)}};var N=new M,O=new M,P=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,Q=/[A-Z]/g;function R(a,b,c){var d;if(void 0===c&&1===a.nodeType)if(d="data-"+b.replace(Q,"-$&").toLowerCase(),c=a.getAttribute(d),"string"==typeof c){try{c="true"===c?!0:"false"===c?!1:"null"===c?null:+c+""===c?+c:P.test(c)?n.parseJSON(c):c;
}catch(e){}O.set(a,b,c)}else c=void 0;return c}n.extend({hasData:function(a){return O.hasData(a)||N.hasData(a)},data:function(a,b,c){return O.access(a,b,c)},removeData:function(a,b){O.remove(a,b)},_data:function(a,b,c){return N.access(a,b,c)},_removeData:function(a,b){N.remove(a,b)}}),n.fn.extend({data:function(a,b){var c,d,e,f=this[0],g=f&&f.attributes;if(void 0===a){if(this.length&&(e=O.get(f),1===f.nodeType&&!N.get(f,"hasDataAttrs"))){c=g.length;while(c--)g[c]&&(d=g[c].name,0===d.indexOf("data-")&&(d=n.camelCase(d.slice(5)),R(f,d,e[d])));N.set(f,"hasDataAttrs",!0)}return e}return"object"==typeof a?this.each(function(){O.set(this,a)}):K(this,function(b){var c,d;if(f&&void 0===b){if(c=O.get(f,a)||O.get(f,a.replace(Q,"-$&").toLowerCase()),void 0!==c)return c;if(d=n.camelCase(a),c=O.get(f,d),void 0!==c)return c;if(c=R(f,d,void 0),void 0!==c)return c}else d=n.camelCase(a),this.each(function(){var c=O.get(this,d);O.set(this,d,b),a.indexOf("-")>-1&&void 0!==c&&O.set(this,a,b)})},null,b,arguments.length>1,null,!0)},removeData:function(a){return this.each(function(){O.remove(this,a)})}}),n.extend({queue:function(a,b,c){var d;return a?(b=(b||"fx")+"queue",d=N.get(a,b),c&&(!d||n.isArray(c)?d=N.access(a,b,n.makeArray(c)):d.push(c)),d||[]):void 0},dequeue:function(a,b){b=b||"fx";var c=n.queue(a,b),d=c.length,e=c.shift(),f=n._queueHooks(a,b),g=function(){n.dequeue(a,b)};"inprogress"===e&&(e=c.shift(),d--),e&&("fx"===b&&c.unshift("inprogress"),delete f.stop,e.call(a,g,f)),!d&&f&&f.empty.fire()},_queueHooks:function(a,b){var c=b+"queueHooks";return N.get(a,c)||N.access(a,c,{empty:n.Callbacks("once memory").add(function(){N.remove(a,[b+"queue",c])})})}}),n.fn.extend({queue:function(a,b){var c=2;return"string"!=typeof a&&(b=a,a="fx",c--),arguments.length<c?n.queue(this[0],a):void 0===b?this:this.each(function(){var c=n.queue(this,a,b);n._queueHooks(this,a),"fx"===a&&"inprogress"!==c[0]&&n.dequeue(this,a)})},dequeue:function(a){return this.each(function(){n.dequeue(this,a)})},clearQueue:function(a){return this.queue(a||"fx",[])},promise:function(a,b){var c,d=1,e=n.Deferred(),f=this,g=this.length,h=function(){--d||e.resolveWith(f,[f])};"string"!=typeof a&&(b=a,a=void 0),a=a||"fx";while(g--)c=N.get(f[g],a+"queueHooks"),c&&c.empty&&(d++,c.empty.add(h));return h(),e.promise(b)}});var S=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,T=new RegExp("^(?:([+-])=|)("+S+")([a-z%]*)$","i"),U=["Top","Right","Bottom","Left"],V=function(a,b){return a=b||a,"none"===n.css(a,"display")||!n.contains(a.ownerDocument,a)};function W(a,b,c,d){var e,f=1,g=20,h=d?function(){return d.cur()}:function(){return n.css(a,b,"")},i=h(),j=c&&c[3]||(n.cssNumber[b]?"":"px"),k=(n.cssNumber[b]||"px"!==j&&+i)&&T.exec(n.css(a,b));if(k&&k[3]!==j){j=j||k[3],c=c||[],k=+i||1;do f=f||".5",k/=f,n.style(a,b,k+j);while(f!==(f=h()/i)&&1!==f&&--g)}return c&&(k=+k||+i||0,e=c[1]?k+(c[1]+1)*c[2]:+c[2],d&&(d.unit=j,d.start=k,d.end=e)),e}var X=/^(?:checkbox|radio)$/i,Y=/<([\w:-]+)/,Z=/^$|\/(?:java|ecma)script/i,$={option:[1,"<select multiple='multiple'>","</select>"],thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};$.optgroup=$.option,$.tbody=$.tfoot=$.colgroup=$.caption=$.thead,$.th=$.td;function _(a,b){var c="undefined"!=typeof a.getElementsByTagName?a.getElementsByTagName(b||"*"):"undefined"!=typeof a.querySelectorAll?a.querySelectorAll(b||"*"):[];return void 0===b||b&&n.nodeName(a,b)?n.merge([a],c):c}function aa(a,b){for(var c=0,d=a.length;d>c;c++)N.set(a[c],"globalEval",!b||N.get(b[c],"globalEval"))}var ba=/<|&#?\w+;/;function ca(a,b,c,d,e){for(var f,g,h,i,j,k,l=b.createDocumentFragment(),m=[],o=0,p=a.length;p>o;o++)if(f=a[o],f||0===f)if("object"===n.type(f))n.merge(m,f.nodeType?[f]:f);else if(ba.test(f)){g=g||l.appendChild(b.createElement("div")),h=(Y.exec(f)||["",""])[1].toLowerCase(),i=$[h]||$._default,g.innerHTML=i[1]+n.htmlPrefilter(f)+i[2],k=i[0];while(k--)g=g.lastChild;n.merge(m,g.childNodes),g=l.firstChild,g.textContent=""}else m.push(b.createTextNode(f));l.textContent="",o=0;while(f=m[o++])if(d&&n.inArray(f,d)>-1)e&&e.push(f);else if(j=n.contains(f.ownerDocument,f),g=_(l.appendChild(f),"script"),j&&aa(g),c){k=0;while(f=g[k++])Z.test(f.type||"")&&c.push(f)}return l}!function(){var a=d.createDocumentFragment(),b=a.appendChild(d.createElement("div")),c=d.createElement("input");c.setAttribute("type","radio"),c.setAttribute("checked","checked"),c.setAttribute("name","t"),b.appendChild(c),l.checkClone=b.cloneNode(!0).cloneNode(!0).lastChild.checked,b.innerHTML="<textarea>x</textarea>",l.noCloneChecked=!!b.cloneNode(!0).lastChild.defaultValue}();var da=/^key/,ea=/^(?:mouse|pointer|contextmenu|drag|drop)|click/,fa=/^([^.]*)(?:\.(.+)|)/;function ga(){return!0}function ha(){return!1}function ia(){try{return d.activeElement}catch(a){}}function ja(a,b,c,d,e,f){var g,h;if("object"==typeof b){"string"!=typeof c&&(d=d||c,c=void 0);for(h in b)ja(a,h,c,d,b[h],f);return a}if(null==d&&null==e?(e=c,d=c=void 0):null==e&&("string"==typeof c?(e=d,d=void 0):(e=d,d=c,c=void 0)),e===!1)e=ha;else if(!e)return a;return 1===f&&(g=e,e=function(a){return n().off(a),g.apply(this,arguments)},e.guid=g.guid||(g.guid=n.guid++)),a.each(function(){n.event.add(this,b,e,d,c)})}n.event={global:{},add:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,o,p,q,r=N.get(a);if(r){c.handler&&(f=c,c=f.handler,e=f.selector),c.guid||(c.guid=n.guid++),(i=r.events)||(i=r.events={}),(g=r.handle)||(g=r.handle=function(b){return"undefined"!=typeof n&&n.event.triggered!==b.type?n.event.dispatch.apply(a,arguments):void 0}),b=(b||"").match(G)||[""],j=b.length;while(j--)h=fa.exec(b[j])||[],o=q=h[1],p=(h[2]||"").split(".").sort(),o&&(l=n.event.special[o]||{},o=(e?l.delegateType:l.bindType)||o,l=n.event.special[o]||{},k=n.extend({type:o,origType:q,data:d,handler:c,guid:c.guid,selector:e,needsContext:e&&n.expr.match.needsContext.test(e),namespace:p.join(".")},f),(m=i[o])||(m=i[o]=[],m.delegateCount=0,l.setup&&l.setup.call(a,d,p,g)!==!1||a.addEventListener&&a.addEventListener(o,g)),l.add&&(l.add.call(a,k),k.handler.guid||(k.handler.guid=c.guid)),e?m.splice(m.delegateCount++,0,k):m.push(k),n.event.global[o]=!0)}},remove:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,o,p,q,r=N.hasData(a)&&N.get(a);if(r&&(i=r.events)){b=(b||"").match(G)||[""],j=b.length;while(j--)if(h=fa.exec(b[j])||[],o=q=h[1],p=(h[2]||"").split(".").sort(),o){l=n.event.special[o]||{},o=(d?l.delegateType:l.bindType)||o,m=i[o]||[],h=h[2]&&new RegExp("(^|\\.)"+p.join("\\.(?:.*\\.|)")+"(\\.|$)"),g=f=m.length;while(f--)k=m[f],!e&&q!==k.origType||c&&c.guid!==k.guid||h&&!h.test(k.namespace)||d&&d!==k.selector&&("**"!==d||!k.selector)||(m.splice(f,1),k.selector&&m.delegateCount--,l.remove&&l.remove.call(a,k));g&&!m.length&&(l.teardown&&l.teardown.call(a,p,r.handle)!==!1||n.removeEvent(a,o,r.handle),delete i[o])}else for(o in i)n.event.remove(a,o+b[j],c,d,!0);n.isEmptyObject(i)&&N.remove(a,"handle events")}},dispatch:function(a){a=n.event.fix(a);var b,c,d,f,g,h=[],i=e.call(arguments),j=(N.get(this,"events")||{})[a.type]||[],k=n.event.special[a.type]||{};if(i[0]=a,a.delegateTarget=this,!k.preDispatch||k.preDispatch.call(this,a)!==!1){h=n.event.handlers.call(this,a,j),b=0;while((f=h[b++])&&!a.isPropagationStopped()){a.currentTarget=f.elem,c=0;while((g=f.handlers[c++])&&!a.isImmediatePropagationStopped())a.rnamespace&&!a.rnamespace.test(g.namespace)||(a.handleObj=g,a.data=g.data,d=((n.event.special[g.origType]||{}).handle||g.handler).apply(f.elem,i),void 0!==d&&(a.result=d)===!1&&(a.preventDefault(),a.stopPropagation()))}return k.postDispatch&&k.postDispatch.call(this,a),a.result}},handlers:function(a,b){var c,d,e,f,g=[],h=b.delegateCount,i=a.target;if(h&&i.nodeType&&("click"!==a.type||isNaN(a.button)||a.button<1))for(;i!==this;i=i.parentNode||this)if(1===i.nodeType&&(i.disabled!==!0||"click"!==a.type)){for(d=[],c=0;h>c;c++)f=b[c],e=f.selector+" ",void 0===d[e]&&(d[e]=f.needsContext?n(e,this).index(i)>-1:n.find(e,this,null,[i]).length),d[e]&&d.push(f);d.length&&g.push({elem:i,handlers:d})}return h<b.length&&g.push({elem:this,handlers:b.slice(h)}),g},props:"altKey bubbles cancelable ctrlKey currentTarget detail eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(a,b){return null==a.which&&(a.which=null!=b.charCode?b.charCode:b.keyCode),a}},mouseHooks:{props:"button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(a,b){var c,e,f,g=b.button;return null==a.pageX&&null!=b.clientX&&(c=a.target.ownerDocument||d,e=c.documentElement,f=c.body,a.pageX=b.clientX+(e&&e.scrollLeft||f&&f.scrollLeft||0)-(e&&e.clientLeft||f&&f.clientLeft||0),a.pageY=b.clientY+(e&&e.scrollTop||f&&f.scrollTop||0)-(e&&e.clientTop||f&&f.clientTop||0)),a.which||void 0===g||(a.which=1&g?1:2&g?3:4&g?2:0),a}},fix:function(a){if(a[n.expando])return a;var b,c,e,f=a.type,g=a,h=this.fixHooks[f];h||(this.fixHooks[f]=h=ea.test(f)?this.mouseHooks:da.test(f)?this.keyHooks:{}),e=h.props?this.props.concat(h.props):this.props,a=new n.Event(g),b=e.length;while(b--)c=e[b],a[c]=g[c];return a.target||(a.target=d),3===a.target.nodeType&&(a.target=a.target.parentNode),h.filter?h.filter(a,g):a},special:{load:{noBubble:!0},focus:{trigger:function(){return this!==ia()&&this.focus?(this.focus(),!1):void 0},delegateType:"focusin"},blur:{trigger:function(){return this===ia()&&this.blur?(this.blur(),!1):void 0},delegateType:"focusout"},click:{trigger:function(){return"checkbox"===this.type&&this.click&&n.nodeName(this,"input")?(this.click(),!1):void 0},_default:function(a){return n.nodeName(a.target,"a")}},beforeunload:{postDispatch:function(a){void 0!==a.result&&a.originalEvent&&(a.originalEvent.returnValue=a.result)}}}},n.removeEvent=function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c)},n.Event=function(a,b){return this instanceof n.Event?(a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||void 0===a.defaultPrevented&&a.returnValue===!1?ga:ha):this.type=a,b&&n.extend(this,b),this.timeStamp=a&&a.timeStamp||n.now(),void(this[n.expando]=!0)):new n.Event(a,b)},n.Event.prototype={constructor:n.Event,isDefaultPrevented:ha,isPropagationStopped:ha,isImmediatePropagationStopped:ha,preventDefault:function(){var a=this.originalEvent;this.isDefaultPrevented=ga,a&&a.preventDefault()},stopPropagation:function(){var a=this.originalEvent;this.isPropagationStopped=ga,a&&a.stopPropagation()},stopImmediatePropagation:function(){var a=this.originalEvent;this.isImmediatePropagationStopped=ga,a&&a.stopImmediatePropagation(),this.stopPropagation()}},n.each({mouseenter:"mouseover",mouseleave:"mouseout",pointerenter:"pointerover",pointerleave:"pointerout"},function(a,b){n.event.special[a]={delegateType:b,bindType:b,handle:function(a){var c,d=this,e=a.relatedTarget,f=a.handleObj;return e&&(e===d||n.contains(d,e))||(a.type=f.origType,c=f.handler.apply(this,arguments),a.type=b),c}}}),n.fn.extend({on:function(a,b,c,d){return ja(this,a,b,c,d)},one:function(a,b,c,d){return ja(this,a,b,c,d,1)},off:function(a,b,c){var d,e;if(a&&a.preventDefault&&a.handleObj)return d=a.handleObj,n(a.delegateTarget).off(d.namespace?d.origType+"."+d.namespace:d.origType,d.selector,d.handler),this;if("object"==typeof a){for(e in a)this.off(e,b,a[e]);return this}return b!==!1&&"function"!=typeof b||(c=b,b=void 0),c===!1&&(c=ha),this.each(function(){n.event.remove(this,a,c,b)})}});var ka=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,la=/<script|<style|<link/i,ma=/checked\s*(?:[^=]|=\s*.checked.)/i,na=/^true\/(.*)/,oa=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;function pa(a,b){return n.nodeName(a,"table")&&n.nodeName(11!==b.nodeType?b:b.firstChild,"tr")?a.getElementsByTagName("tbody")[0]||a.appendChild(a.ownerDocument.createElement("tbody")):a}function qa(a){return a.type=(null!==a.getAttribute("type"))+"/"+a.type,a}function ra(a){var b=na.exec(a.type);return b?a.type=b[1]:a.removeAttribute("type"),a}function sa(a,b){var c,d,e,f,g,h,i,j;if(1===b.nodeType){if(N.hasData(a)&&(f=N.access(a),g=N.set(b,f),j=f.events)){delete g.handle,g.events={};for(e in j)for(c=0,d=j[e].length;d>c;c++)n.event.add(b,e,j[e][c])}O.hasData(a)&&(h=O.access(a),i=n.extend({},h),O.set(b,i))}}function ta(a,b){var c=b.nodeName.toLowerCase();"input"===c&&X.test(a.type)?b.checked=a.checked:"input"!==c&&"textarea"!==c||(b.defaultValue=a.defaultValue)}function ua(a,b,c,d){b=f.apply([],b);var e,g,h,i,j,k,m=0,o=a.length,p=o-1,q=b[0],r=n.isFunction(q);if(r||o>1&&"string"==typeof q&&!l.checkClone&&ma.test(q))return a.each(function(e){var f=a.eq(e);r&&(b[0]=q.call(this,e,f.html())),ua(f,b,c,d)});if(o&&(e=ca(b,a[0].ownerDocument,!1,a,d),g=e.firstChild,1===e.childNodes.length&&(e=g),g||d)){for(h=n.map(_(e,"script"),qa),i=h.length;o>m;m++)j=e,m!==p&&(j=n.clone(j,!0,!0),i&&n.merge(h,_(j,"script"))),c.call(a[m],j,m);if(i)for(k=h[h.length-1].ownerDocument,n.map(h,ra),m=0;i>m;m++)j=h[m],Z.test(j.type||"")&&!N.access(j,"globalEval")&&n.contains(k,j)&&(j.src?n._evalUrl&&n._evalUrl(j.src):n.globalEval(j.textContent.replace(oa,"")))}return a}function va(a,b,c){for(var d,e=b?n.filter(b,a):a,f=0;null!=(d=e[f]);f++)c||1!==d.nodeType||n.cleanData(_(d)),d.parentNode&&(c&&n.contains(d.ownerDocument,d)&&aa(_(d,"script")),d.parentNode.removeChild(d));return a}n.extend({htmlPrefilter:function(a){return a.replace(ka,"<$1></$2>")},clone:function(a,b,c){var d,e,f,g,h=a.cloneNode(!0),i=n.contains(a.ownerDocument,a);if(!(l.noCloneChecked||1!==a.nodeType&&11!==a.nodeType||n.isXMLDoc(a)))for(g=_(h),f=_(a),d=0,e=f.length;e>d;d++)ta(f[d],g[d]);if(b)if(c)for(f=f||_(a),g=g||_(h),d=0,e=f.length;e>d;d++)sa(f[d],g[d]);else sa(a,h);return g=_(h,"script"),g.length>0&&aa(g,!i&&_(a,"script")),h},cleanData:function(a){for(var b,c,d,e=n.event.special,f=0;void 0!==(c=a[f]);f++)if(L(c)){if(b=c[N.expando]){if(b.events)for(d in b.events)e[d]?n.event.remove(c,d):n.removeEvent(c,d,b.handle);c[N.expando]=void 0}c[O.expando]&&(c[O.expando]=void 0)}}}),n.fn.extend({domManip:ua,detach:function(a){return va(this,a,!0)},remove:function(a){return va(this,a)},text:function(a){return K(this,function(a){return void 0===a?n.text(this):this.empty().each(function(){1!==this.nodeType&&11!==this.nodeType&&9!==this.nodeType||(this.textContent=a)})},null,a,arguments.length)},append:function(){return ua(this,arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=pa(this,a);b.appendChild(a)}})},prepend:function(){return ua(this,arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=pa(this,a);b.insertBefore(a,b.firstChild)}})},before:function(){return ua(this,arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this)})},after:function(){return ua(this,arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this.nextSibling)})},empty:function(){for(var a,b=0;null!=(a=this[b]);b++)1===a.nodeType&&(n.cleanData(_(a,!1)),a.textContent="");return this},clone:function(a,b){return a=null==a?!1:a,b=null==b?a:b,this.map(function(){return n.clone(this,a,b)})},html:function(a){return K(this,function(a){var b=this[0]||{},c=0,d=this.length;if(void 0===a&&1===b.nodeType)return b.innerHTML;if("string"==typeof a&&!la.test(a)&&!$[(Y.exec(a)||["",""])[1].toLowerCase()]){a=n.htmlPrefilter(a);try{for(;d>c;c++)b=this[c]||{},1===b.nodeType&&(n.cleanData(_(b,!1)),b.innerHTML=a);b=0}catch(e){}}b&&this.empty().append(a)},null,a,arguments.length)},replaceWith:function(){var a=[];return ua(this,arguments,function(b){var c=this.parentNode;n.inArray(this,a)<0&&(n.cleanData(_(this)),c&&c.replaceChild(b,this))},a)}}),n.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){n.fn[a]=function(a){for(var c,d=[],e=n(a),f=e.length-1,h=0;f>=h;h++)c=h===f?this:this.clone(!0),n(e[h])[b](c),g.apply(d,c.get());return this.pushStack(d)}});var wa,xa={HTML:"block",BODY:"block"};function ya(a,b){var c=n(b.createElement(a)).appendTo(b.body),d=n.css(c[0],"display");return c.detach(),d}function za(a){var b=d,c=xa[a];return c||(c=ya(a,b),"none"!==c&&c||(wa=(wa||n("<iframe frameborder='0' width='0' height='0'/>")).appendTo(b.documentElement),b=wa[0].contentDocument,b.write(),b.close(),c=ya(a,b),wa.detach()),xa[a]=c),c}var Aa=/^margin/,Ba=new RegExp("^("+S+")(?!px)[a-z%]+$","i"),Ca=function(b){var c=b.ownerDocument.defaultView;return c&&c.opener||(c=a),c.getComputedStyle(b)},Da=function(a,b,c,d){var e,f,g={};for(f in b)g[f]=a.style[f],a.style[f]=b[f];e=c.apply(a,d||[]);for(f in b)a.style[f]=g[f];return e},Ea=d.documentElement;!function(){var b,c,e,f,g=d.createElement("div"),h=d.createElement("div");if(h.style){h.style.backgroundClip="content-box",h.cloneNode(!0).style.backgroundClip="",l.clearCloneStyle="content-box"===h.style.backgroundClip,g.style.cssText="border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute",g.appendChild(h);function i(){h.style.cssText="-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%",h.innerHTML="",Ea.appendChild(g);var d=a.getComputedStyle(h);b="1%"!==d.top,f="2px"===d.marginLeft,c="4px"===d.width,h.style.marginRight="50%",e="4px"===d.marginRight,Ea.removeChild(g)}n.extend(l,{pixelPosition:function(){return i(),b},boxSizingReliable:function(){return null==c&&i(),c},pixelMarginRight:function(){return null==c&&i(),e},reliableMarginLeft:function(){return null==c&&i(),f},reliableMarginRight:function(){var b,c=h.appendChild(d.createElement("div"));return c.style.cssText=h.style.cssText="-webkit-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0",c.style.marginRight=c.style.width="0",h.style.width="1px",Ea.appendChild(g),b=!parseFloat(a.getComputedStyle(c).marginRight),Ea.removeChild(g),h.removeChild(c),b}})}}();function Fa(a,b,c){var d,e,f,g,h=a.style;return c=c||Ca(a),g=c?c.getPropertyValue(b)||c[b]:void 0,""!==g&&void 0!==g||n.contains(a.ownerDocument,a)||(g=n.style(a,b)),c&&!l.pixelMarginRight()&&Ba.test(g)&&Aa.test(b)&&(d=h.width,e=h.minWidth,f=h.maxWidth,h.minWidth=h.maxWidth=h.width=g,g=c.width,h.width=d,h.minWidth=e,h.maxWidth=f),void 0!==g?g+"":g}function Ga(a,b){return{get:function(){return a()?void delete this.get:(this.get=b).apply(this,arguments)}}}var Ha=/^(none|table(?!-c[ea]).+)/,Ia={position:"absolute",visibility:"hidden",display:"block"},Ja={letterSpacing:"0",fontWeight:"400"},Ka=["Webkit","O","Moz","ms"],La=d.createElement("div").style;function Ma(a){if(a in La)return a;var b=a[0].toUpperCase()+a.slice(1),c=Ka.length;while(c--)if(a=Ka[c]+b,a in La)return a}function Na(a,b,c){var d=T.exec(b);return d?Math.max(0,d[2]-(c||0))+(d[3]||"px"):b}function Oa(a,b,c,d,e){for(var f=c===(d?"border":"content")?4:"width"===b?1:0,g=0;4>f;f+=2)"margin"===c&&(g+=n.css(a,c+U[f],!0,e)),d?("content"===c&&(g-=n.css(a,"padding"+U[f],!0,e)),"margin"!==c&&(g-=n.css(a,"border"+U[f]+"Width",!0,e))):(g+=n.css(a,"padding"+U[f],!0,e),"padding"!==c&&(g+=n.css(a,"border"+U[f]+"Width",!0,e)));return g}function Pa(b,c,e){var f=!0,g="width"===c?b.offsetWidth:b.offsetHeight,h=Ca(b),i="border-box"===n.css(b,"boxSizing",!1,h);if(d.msFullscreenElement&&a.top!==a&&b.getClientRects().length&&(g=Math.round(100*b.getBoundingClientRect()[c])),0>=g||null==g){if(g=Fa(b,c,h),(0>g||null==g)&&(g=b.style[c]),Ba.test(g))return g;f=i&&(l.boxSizingReliable()||g===b.style[c]),g=parseFloat(g)||0}return g+Oa(b,c,e||(i?"border":"content"),f,h)+"px"}function Qa(a,b){for(var c,d,e,f=[],g=0,h=a.length;h>g;g++)d=a[g],d.style&&(f[g]=N.get(d,"olddisplay"),c=d.style.display,b?(f[g]||"none"!==c||(d.style.display=""),""===d.style.display&&V(d)&&(f[g]=N.access(d,"olddisplay",za(d.nodeName)))):(e=V(d),"none"===c&&e||N.set(d,"olddisplay",e?c:n.css(d,"display"))));for(g=0;h>g;g++)d=a[g],d.style&&(b&&"none"!==d.style.display&&""!==d.style.display||(d.style.display=b?f[g]||"":"none"));return a}n.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=Fa(a,"opacity");return""===c?"1":c}}}},cssNumber:{animationIterationCount:!0,columnCount:!0,fillOpacity:!0,flexGrow:!0,flexShrink:!0,fontWeight:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":"cssFloat"},style:function(a,b,c,d){if(a&&3!==a.nodeType&&8!==a.nodeType&&a.style){var e,f,g,h=n.camelCase(b),i=a.style;return b=n.cssProps[h]||(n.cssProps[h]=Ma(h)||h),g=n.cssHooks[b]||n.cssHooks[h],void 0===c?g&&"get"in g&&void 0!==(e=g.get(a,!1,d))?e:i[b]:(f=typeof c,"string"===f&&(e=T.exec(c))&&e[1]&&(c=W(a,b,e),f="number"),null!=c&&c===c&&("number"===f&&(c+=e&&e[3]||(n.cssNumber[h]?"":"px")),l.clearCloneStyle||""!==c||0!==b.indexOf("background")||(i[b]="inherit"),g&&"set"in g&&void 0===(c=g.set(a,c,d))||(i[b]=c)),void 0)}},css:function(a,b,c,d){var e,f,g,h=n.camelCase(b);return b=n.cssProps[h]||(n.cssProps[h]=Ma(h)||h),g=n.cssHooks[b]||n.cssHooks[h],g&&"get"in g&&(e=g.get(a,!0,c)),void 0===e&&(e=Fa(a,b,d)),"normal"===e&&b in Ja&&(e=Ja[b]),""===c||c?(f=parseFloat(e),c===!0||isFinite(f)?f||0:e):e}}),n.each(["height","width"],function(a,b){n.cssHooks[b]={get:function(a,c,d){return c?Ha.test(n.css(a,"display"))&&0===a.offsetWidth?Da(a,Ia,function(){return Pa(a,b,d)}):Pa(a,b,d):void 0},set:function(a,c,d){var e,f=d&&Ca(a),g=d&&Oa(a,b,d,"border-box"===n.css(a,"boxSizing",!1,f),f);return g&&(e=T.exec(c))&&"px"!==(e[3]||"px")&&(a.style[b]=c,c=n.css(a,b)),Na(a,c,g)}}}),n.cssHooks.marginLeft=Ga(l.reliableMarginLeft,function(a,b){return b?(parseFloat(Fa(a,"marginLeft"))||a.getBoundingClientRect().left-Da(a,{marginLeft:0},function(){return a.getBoundingClientRect().left}))+"px":void 0}),n.cssHooks.marginRight=Ga(l.reliableMarginRight,function(a,b){return b?Da(a,{display:"inline-block"},Fa,[a,"marginRight"]):void 0}),n.each({margin:"",padding:"",border:"Width"},function(a,b){n.cssHooks[a+b]={expand:function(c){for(var d=0,e={},f="string"==typeof c?c.split(" "):[c];4>d;d++)e[a+U[d]+b]=f[d]||f[d-2]||f[0];return e}},Aa.test(a)||(n.cssHooks[a+b].set=Na)}),n.fn.extend({css:function(a,b){return K(this,function(a,b,c){var d,e,f={},g=0;if(n.isArray(b)){for(d=Ca(a),e=b.length;e>g;g++)f[b[g]]=n.css(a,b[g],!1,d);return f}return void 0!==c?n.style(a,b,c):n.css(a,b)},a,b,arguments.length>1)},show:function(){return Qa(this,!0)},hide:function(){return Qa(this)},toggle:function(a){return"boolean"==typeof a?a?this.show():this.hide():this.each(function(){V(this)?n(this).show():n(this).hide()})}});function Ra(a,b,c,d,e){return new Ra.prototype.init(a,b,c,d,e)}n.Tween=Ra,Ra.prototype={constructor:Ra,init:function(a,b,c,d,e,f){this.elem=a,this.prop=c,this.easing=e||n.easing._default,this.options=b,this.start=this.now=this.cur(),this.end=d,this.unit=f||(n.cssNumber[c]?"":"px")},cur:function(){var a=Ra.propHooks[this.prop];return a&&a.get?a.get(this):Ra.propHooks._default.get(this)},run:function(a){var b,c=Ra.propHooks[this.prop];return this.options.duration?this.pos=b=n.easing[this.easing](a,this.options.duration*a,0,1,this.options.duration):this.pos=b=a,this.now=(this.end-this.start)*b+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),c&&c.set?c.set(this):Ra.propHooks._default.set(this),this}},Ra.prototype.init.prototype=Ra.prototype,Ra.propHooks={_default:{get:function(a){var b;return 1!==a.elem.nodeType||null!=a.elem[a.prop]&&null==a.elem.style[a.prop]?a.elem[a.prop]:(b=n.css(a.elem,a.prop,""),b&&"auto"!==b?b:0)},set:function(a){n.fx.step[a.prop]?n.fx.step[a.prop](a):1!==a.elem.nodeType||null==a.elem.style[n.cssProps[a.prop]]&&!n.cssHooks[a.prop]?a.elem[a.prop]=a.now:n.style(a.elem,a.prop,a.now+a.unit)}}},Ra.propHooks.scrollTop=Ra.propHooks.scrollLeft={set:function(a){a.elem.nodeType&&a.elem.parentNode&&(a.elem[a.prop]=a.now)}},n.easing={linear:function(a){return a},swing:function(a){return.5-Math.cos(a*Math.PI)/2},_default:"swing"},n.fx=Ra.prototype.init,n.fx.step={};var Sa,Ta,Ua=/^(?:toggle|show|hide)$/,Va=/queueHooks$/;function Wa(){return a.setTimeout(function(){Sa=void 0}),Sa=n.now()}function Xa(a,b){var c,d=0,e={height:a};for(b=b?1:0;4>d;d+=2-b)c=U[d],e["margin"+c]=e["padding"+c]=a;return b&&(e.opacity=e.width=a),e}function Ya(a,b,c){for(var d,e=(_a.tweeners[b]||[]).concat(_a.tweeners["*"]),f=0,g=e.length;g>f;f++)if(d=e[f].call(c,b,a))return d}function Za(a,b,c){var d,e,f,g,h,i,j,k,l=this,m={},o=a.style,p=a.nodeType&&V(a),q=N.get(a,"fxshow");c.queue||(h=n._queueHooks(a,"fx"),null==h.unqueued&&(h.unqueued=0,i=h.empty.fire,h.empty.fire=function(){h.unqueued||i()}),h.unqueued++,l.always(function(){l.always(function(){h.unqueued--,n.queue(a,"fx").length||h.empty.fire()})})),1===a.nodeType&&("height"in b||"width"in b)&&(c.overflow=[o.overflow,o.overflowX,o.overflowY],j=n.css(a,"display"),k="none"===j?N.get(a,"olddisplay")||za(a.nodeName):j,"inline"===k&&"none"===n.css(a,"float")&&(o.display="inline-block")),c.overflow&&(o.overflow="hidden",l.always(function(){o.overflow=c.overflow[0],o.overflowX=c.overflow[1],o.overflowY=c.overflow[2]}));for(d in b)if(e=b[d],Ua.exec(e)){if(delete b[d],f=f||"toggle"===e,e===(p?"hide":"show")){if("show"!==e||!q||void 0===q[d])continue;p=!0}m[d]=q&&q[d]||n.style(a,d)}else j=void 0;if(n.isEmptyObject(m))"inline"===("none"===j?za(a.nodeName):j)&&(o.display=j);else{q?"hidden"in q&&(p=q.hidden):q=N.access(a,"fxshow",{}),f&&(q.hidden=!p),p?n(a).show():l.done(function(){n(a).hide()}),l.done(function(){var b;N.remove(a,"fxshow");for(b in m)n.style(a,b,m[b])});for(d in m)g=Ya(p?q[d]:0,d,l),d in q||(q[d]=g.start,p&&(g.end=g.start,g.start="width"===d||"height"===d?1:0))}}function $a(a,b){var c,d,e,f,g;for(c in a)if(d=n.camelCase(c),e=b[d],f=a[c],n.isArray(f)&&(e=f[1],f=a[c]=f[0]),c!==d&&(a[d]=f,delete a[c]),g=n.cssHooks[d],g&&"expand"in g){f=g.expand(f),delete a[d];for(c in f)c in a||(a[c]=f[c],b[c]=e)}else b[d]=e}function _a(a,b,c){var d,e,f=0,g=_a.prefilters.length,h=n.Deferred().always(function(){delete i.elem}),i=function(){if(e)return!1;for(var b=Sa||Wa(),c=Math.max(0,j.startTime+j.duration-b),d=c/j.duration||0,f=1-d,g=0,i=j.tweens.length;i>g;g++)j.tweens[g].run(f);return h.notifyWith(a,[j,f,c]),1>f&&i?c:(h.resolveWith(a,[j]),!1)},j=h.promise({elem:a,props:n.extend({},b),opts:n.extend(!0,{specialEasing:{},easing:n.easing._default},c),originalProperties:b,originalOptions:c,startTime:Sa||Wa(),duration:c.duration,tweens:[],createTween:function(b,c){var d=n.Tween(a,j.opts,b,c,j.opts.specialEasing[b]||j.opts.easing);return j.tweens.push(d),d},stop:function(b){var c=0,d=b?j.tweens.length:0;if(e)return this;for(e=!0;d>c;c++)j.tweens[c].run(1);return b?(h.notifyWith(a,[j,1,0]),h.resolveWith(a,[j,b])):h.rejectWith(a,[j,b]),this}}),k=j.props;for($a(k,j.opts.specialEasing);g>f;f++)if(d=_a.prefilters[f].call(j,a,k,j.opts))return n.isFunction(d.stop)&&(n._queueHooks(j.elem,j.opts.queue).stop=n.proxy(d.stop,d)),d;return n.map(k,Ya,j),n.isFunction(j.opts.start)&&j.opts.start.call(a,j),n.fx.timer(n.extend(i,{elem:a,anim:j,queue:j.opts.queue})),j.progress(j.opts.progress).done(j.opts.done,j.opts.complete).fail(j.opts.fail).always(j.opts.always)}n.Animation=n.extend(_a,{tweeners:{"*":[function(a,b){var c=this.createTween(a,b);return W(c.elem,a,T.exec(b),c),c}]},tweener:function(a,b){n.isFunction(a)?(b=a,a=["*"]):a=a.match(G);for(var c,d=0,e=a.length;e>d;d++)c=a[d],_a.tweeners[c]=_a.tweeners[c]||[],_a.tweeners[c].unshift(b)},prefilters:[Za],prefilter:function(a,b){b?_a.prefilters.unshift(a):_a.prefilters.push(a)}}),n.speed=function(a,b,c){var d=a&&"object"==typeof a?n.extend({},a):{complete:c||!c&&b||n.isFunction(a)&&a,duration:a,easing:c&&b||b&&!n.isFunction(b)&&b};return d.duration=n.fx.off?0:"number"==typeof d.duration?d.duration:d.duration in n.fx.speeds?n.fx.speeds[d.duration]:n.fx.speeds._default,null!=d.queue&&d.queue!==!0||(d.queue="fx"),d.old=d.complete,d.complete=function(){n.isFunction(d.old)&&d.old.call(this),d.queue&&n.dequeue(this,d.queue)},d},n.fn.extend({fadeTo:function(a,b,c,d){return this.filter(V).css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,d){var e=n.isEmptyObject(a),f=n.speed(b,c,d),g=function(){var b=_a(this,n.extend({},a),f);(e||N.get(this,"finish"))&&b.stop(!0)};return g.finish=g,e||f.queue===!1?this.each(g):this.queue(f.queue,g)},stop:function(a,b,c){var d=function(a){var b=a.stop;delete a.stop,b(c)};return"string"!=typeof a&&(c=b,b=a,a=void 0),b&&a!==!1&&this.queue(a||"fx",[]),this.each(function(){var b=!0,e=null!=a&&a+"queueHooks",f=n.timers,g=N.get(this);if(e)g[e]&&g[e].stop&&d(g[e]);else for(e in g)g[e]&&g[e].stop&&Va.test(e)&&d(g[e]);for(e=f.length;e--;)f[e].elem!==this||null!=a&&f[e].queue!==a||(f[e].anim.stop(c),b=!1,f.splice(e,1));!b&&c||n.dequeue(this,a)})},finish:function(a){return a!==!1&&(a=a||"fx"),this.each(function(){var b,c=N.get(this),d=c[a+"queue"],e=c[a+"queueHooks"],f=n.timers,g=d?d.length:0;for(c.finish=!0,n.queue(this,a,[]),e&&e.stop&&e.stop.call(this,!0),b=f.length;b--;)f[b].elem===this&&f[b].queue===a&&(f[b].anim.stop(!0),f.splice(b,1));for(b=0;g>b;b++)d[b]&&d[b].finish&&d[b].finish.call(this);delete c.finish})}}),n.each(["toggle","show","hide"],function(a,b){var c=n.fn[b];n.fn[b]=function(a,d,e){return null==a||"boolean"==typeof a?c.apply(this,arguments):this.animate(Xa(b,!0),a,d,e)}}),n.each({slideDown:Xa("show"),slideUp:Xa("hide"),slideToggle:Xa("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){n.fn[a]=function(a,c,d){return this.animate(b,a,c,d)}}),n.timers=[],n.fx.tick=function(){var a,b=0,c=n.timers;for(Sa=n.now();b<c.length;b++)a=c[b],a()||c[b]!==a||c.splice(b--,1);c.length||n.fx.stop(),Sa=void 0},n.fx.timer=function(a){n.timers.push(a),a()?n.fx.start():n.timers.pop()},n.fx.interval=13,n.fx.start=function(){Ta||(Ta=a.setInterval(n.fx.tick,n.fx.interval))},n.fx.stop=function(){a.clearInterval(Ta),Ta=null},n.fx.speeds={slow:600,fast:200,_default:400},n.fn.delay=function(b,c){return b=n.fx?n.fx.speeds[b]||b:b,c=c||"fx",this.queue(c,function(c,d){var e=a.setTimeout(c,b);d.stop=function(){a.clearTimeout(e)}})},function(){var a=d.createElement("input"),b=d.createElement("select"),c=b.appendChild(d.createElement("option"));a.type="checkbox",l.checkOn=""!==a.value,l.optSelected=c.selected,b.disabled=!0,l.optDisabled=!c.disabled,a=d.createElement("input"),a.value="t",a.type="radio",l.radioValue="t"===a.value}();var ab,bb=n.expr.attrHandle;n.fn.extend({attr:function(a,b){return K(this,n.attr,a,b,arguments.length>1)},removeAttr:function(a){return this.each(function(){n.removeAttr(this,a)})}}),n.extend({attr:function(a,b,c){var d,e,f=a.nodeType;if(3!==f&&8!==f&&2!==f)return"undefined"==typeof a.getAttribute?n.prop(a,b,c):(1===f&&n.isXMLDoc(a)||(b=b.toLowerCase(),e=n.attrHooks[b]||(n.expr.match.bool.test(b)?ab:void 0)),void 0!==c?null===c?void n.removeAttr(a,b):e&&"set"in e&&void 0!==(d=e.set(a,c,b))?d:(a.setAttribute(b,c+""),c):e&&"get"in e&&null!==(d=e.get(a,b))?d:(d=n.find.attr(a,b),null==d?void 0:d))},attrHooks:{type:{set:function(a,b){if(!l.radioValue&&"radio"===b&&n.nodeName(a,"input")){var c=a.value;return a.setAttribute("type",b),c&&(a.value=c),b}}}},removeAttr:function(a,b){var c,d,e=0,f=b&&b.match(G);if(f&&1===a.nodeType)while(c=f[e++])d=n.propFix[c]||c,n.expr.match.bool.test(c)&&(a[d]=!1),a.removeAttribute(c)}}),ab={set:function(a,b,c){return b===!1?n.removeAttr(a,c):a.setAttribute(c,c),c}},n.each(n.expr.match.bool.source.match(/\w+/g),function(a,b){var c=bb[b]||n.find.attr;bb[b]=function(a,b,d){var e,f;return d||(f=bb[b],bb[b]=e,e=null!=c(a,b,d)?b.toLowerCase():null,bb[b]=f),e}});var cb=/^(?:input|select|textarea|button)$/i,db=/^(?:a|area)$/i;n.fn.extend({prop:function(a,b){return K(this,n.prop,a,b,arguments.length>1)},removeProp:function(a){return this.each(function(){delete this[n.propFix[a]||a]})}}),n.extend({prop:function(a,b,c){var d,e,f=a.nodeType;if(3!==f&&8!==f&&2!==f)return 1===f&&n.isXMLDoc(a)||(b=n.propFix[b]||b,
e=n.propHooks[b]),void 0!==c?e&&"set"in e&&void 0!==(d=e.set(a,c,b))?d:a[b]=c:e&&"get"in e&&null!==(d=e.get(a,b))?d:a[b]},propHooks:{tabIndex:{get:function(a){var b=n.find.attr(a,"tabindex");return b?parseInt(b,10):cb.test(a.nodeName)||db.test(a.nodeName)&&a.href?0:-1}}},propFix:{"for":"htmlFor","class":"className"}}),l.optSelected||(n.propHooks.selected={get:function(a){var b=a.parentNode;return b&&b.parentNode&&b.parentNode.selectedIndex,null},set:function(a){var b=a.parentNode;b&&(b.selectedIndex,b.parentNode&&b.parentNode.selectedIndex)}}),n.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){n.propFix[this.toLowerCase()]=this});var eb=/[\t\r\n\f]/g;function fb(a){return a.getAttribute&&a.getAttribute("class")||""}n.fn.extend({addClass:function(a){var b,c,d,e,f,g,h,i=0;if(n.isFunction(a))return this.each(function(b){n(this).addClass(a.call(this,b,fb(this)))});if("string"==typeof a&&a){b=a.match(G)||[];while(c=this[i++])if(e=fb(c),d=1===c.nodeType&&(" "+e+" ").replace(eb," ")){g=0;while(f=b[g++])d.indexOf(" "+f+" ")<0&&(d+=f+" ");h=n.trim(d),e!==h&&c.setAttribute("class",h)}}return this},removeClass:function(a){var b,c,d,e,f,g,h,i=0;if(n.isFunction(a))return this.each(function(b){n(this).removeClass(a.call(this,b,fb(this)))});if(!arguments.length)return this.attr("class","");if("string"==typeof a&&a){b=a.match(G)||[];while(c=this[i++])if(e=fb(c),d=1===c.nodeType&&(" "+e+" ").replace(eb," ")){g=0;while(f=b[g++])while(d.indexOf(" "+f+" ")>-1)d=d.replace(" "+f+" "," ");h=n.trim(d),e!==h&&c.setAttribute("class",h)}}return this},toggleClass:function(a,b){var c=typeof a;return"boolean"==typeof b&&"string"===c?b?this.addClass(a):this.removeClass(a):n.isFunction(a)?this.each(function(c){n(this).toggleClass(a.call(this,c,fb(this),b),b)}):this.each(function(){var b,d,e,f;if("string"===c){d=0,e=n(this),f=a.match(G)||[];while(b=f[d++])e.hasClass(b)?e.removeClass(b):e.addClass(b)}else void 0!==a&&"boolean"!==c||(b=fb(this),b&&N.set(this,"__className__",b),this.setAttribute&&this.setAttribute("class",b||a===!1?"":N.get(this,"__className__")||""))})},hasClass:function(a){var b,c,d=0;b=" "+a+" ";while(c=this[d++])if(1===c.nodeType&&(" "+fb(c)+" ").replace(eb," ").indexOf(b)>-1)return!0;return!1}});var gb=/\r/g,hb=/[\x20\t\r\n\f]+/g;n.fn.extend({val:function(a){var b,c,d,e=this[0];{if(arguments.length)return d=n.isFunction(a),this.each(function(c){var e;1===this.nodeType&&(e=d?a.call(this,c,n(this).val()):a,null==e?e="":"number"==typeof e?e+="":n.isArray(e)&&(e=n.map(e,function(a){return null==a?"":a+""})),b=n.valHooks[this.type]||n.valHooks[this.nodeName.toLowerCase()],b&&"set"in b&&void 0!==b.set(this,e,"value")||(this.value=e))});if(e)return b=n.valHooks[e.type]||n.valHooks[e.nodeName.toLowerCase()],b&&"get"in b&&void 0!==(c=b.get(e,"value"))?c:(c=e.value,"string"==typeof c?c.replace(gb,""):null==c?"":c)}}}),n.extend({valHooks:{option:{get:function(a){var b=n.find.attr(a,"value");return null!=b?b:n.trim(n.text(a)).replace(hb," ")}},select:{get:function(a){for(var b,c,d=a.options,e=a.selectedIndex,f="select-one"===a.type||0>e,g=f?null:[],h=f?e+1:d.length,i=0>e?h:f?e:0;h>i;i++)if(c=d[i],(c.selected||i===e)&&(l.optDisabled?!c.disabled:null===c.getAttribute("disabled"))&&(!c.parentNode.disabled||!n.nodeName(c.parentNode,"optgroup"))){if(b=n(c).val(),f)return b;g.push(b)}return g},set:function(a,b){var c,d,e=a.options,f=n.makeArray(b),g=e.length;while(g--)d=e[g],(d.selected=n.inArray(n.valHooks.option.get(d),f)>-1)&&(c=!0);return c||(a.selectedIndex=-1),f}}}}),n.each(["radio","checkbox"],function(){n.valHooks[this]={set:function(a,b){return n.isArray(b)?a.checked=n.inArray(n(a).val(),b)>-1:void 0}},l.checkOn||(n.valHooks[this].get=function(a){return null===a.getAttribute("value")?"on":a.value})});var ib=/^(?:focusinfocus|focusoutblur)$/;n.extend(n.event,{trigger:function(b,c,e,f){var g,h,i,j,l,m,o,p=[e||d],q=k.call(b,"type")?b.type:b,r=k.call(b,"namespace")?b.namespace.split("."):[];if(h=i=e=e||d,3!==e.nodeType&&8!==e.nodeType&&!ib.test(q+n.event.triggered)&&(q.indexOf(".")>-1&&(r=q.split("."),q=r.shift(),r.sort()),l=q.indexOf(":")<0&&"on"+q,b=b[n.expando]?b:new n.Event(q,"object"==typeof b&&b),b.isTrigger=f?2:3,b.namespace=r.join("."),b.rnamespace=b.namespace?new RegExp("(^|\\.)"+r.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,b.result=void 0,b.target||(b.target=e),c=null==c?[b]:n.makeArray(c,[b]),o=n.event.special[q]||{},f||!o.trigger||o.trigger.apply(e,c)!==!1)){if(!f&&!o.noBubble&&!n.isWindow(e)){for(j=o.delegateType||q,ib.test(j+q)||(h=h.parentNode);h;h=h.parentNode)p.push(h),i=h;i===(e.ownerDocument||d)&&p.push(i.defaultView||i.parentWindow||a)}g=0;while((h=p[g++])&&!b.isPropagationStopped())b.type=g>1?j:o.bindType||q,m=(N.get(h,"events")||{})[b.type]&&N.get(h,"handle"),m&&m.apply(h,c),m=l&&h[l],m&&m.apply&&L(h)&&(b.result=m.apply(h,c),b.result===!1&&b.preventDefault());return b.type=q,f||b.isDefaultPrevented()||o._default&&o._default.apply(p.pop(),c)!==!1||!L(e)||l&&n.isFunction(e[q])&&!n.isWindow(e)&&(i=e[l],i&&(e[l]=null),n.event.triggered=q,e[q](),n.event.triggered=void 0,i&&(e[l]=i)),b.result}},simulate:function(a,b,c){var d=n.extend(new n.Event,c,{type:a,isSimulated:!0});n.event.trigger(d,null,b),d.isDefaultPrevented()&&c.preventDefault()}}),n.fn.extend({trigger:function(a,b){return this.each(function(){n.event.trigger(a,b,this)})},triggerHandler:function(a,b){var c=this[0];return c?n.event.trigger(a,b,c,!0):void 0}}),n.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(a,b){n.fn[b]=function(a,c){return arguments.length>0?this.on(b,null,a,c):this.trigger(b)}}),n.fn.extend({hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)}}),l.focusin="onfocusin"in a,l.focusin||n.each({focus:"focusin",blur:"focusout"},function(a,b){var c=function(a){n.event.simulate(b,a.target,n.event.fix(a))};n.event.special[b]={setup:function(){var d=this.ownerDocument||this,e=N.access(d,b);e||d.addEventListener(a,c,!0),N.access(d,b,(e||0)+1)},teardown:function(){var d=this.ownerDocument||this,e=N.access(d,b)-1;e?N.access(d,b,e):(d.removeEventListener(a,c,!0),N.remove(d,b))}}});var jb=a.location,kb=n.now(),lb=/\?/;n.parseJSON=function(a){return JSON.parse(a+"")},n.parseXML=function(b){var c;if(!b||"string"!=typeof b)return null;try{c=(new a.DOMParser).parseFromString(b,"text/xml")}catch(d){c=void 0}return c&&!c.getElementsByTagName("parsererror").length||n.error("Invalid XML: "+b),c};var mb=/#.*$/,nb=/([?&])_=[^&]*/,ob=/^(.*?):[ \t]*([^\r\n]*)$/gm,pb=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,qb=/^(?:GET|HEAD)$/,rb=/^\/\//,sb={},tb={},ub="*/".concat("*"),vb=d.createElement("a");vb.href=jb.href;function wb(a){return function(b,c){"string"!=typeof b&&(c=b,b="*");var d,e=0,f=b.toLowerCase().match(G)||[];if(n.isFunction(c))while(d=f[e++])"+"===d[0]?(d=d.slice(1)||"*",(a[d]=a[d]||[]).unshift(c)):(a[d]=a[d]||[]).push(c)}}function xb(a,b,c,d){var e={},f=a===tb;function g(h){var i;return e[h]=!0,n.each(a[h]||[],function(a,h){var j=h(b,c,d);return"string"!=typeof j||f||e[j]?f?!(i=j):void 0:(b.dataTypes.unshift(j),g(j),!1)}),i}return g(b.dataTypes[0])||!e["*"]&&g("*")}function yb(a,b){var c,d,e=n.ajaxSettings.flatOptions||{};for(c in b)void 0!==b[c]&&((e[c]?a:d||(d={}))[c]=b[c]);return d&&n.extend(!0,a,d),a}function zb(a,b,c){var d,e,f,g,h=a.contents,i=a.dataTypes;while("*"===i[0])i.shift(),void 0===d&&(d=a.mimeType||b.getResponseHeader("Content-Type"));if(d)for(e in h)if(h[e]&&h[e].test(d)){i.unshift(e);break}if(i[0]in c)f=i[0];else{for(e in c){if(!i[0]||a.converters[e+" "+i[0]]){f=e;break}g||(g=e)}f=f||g}return f?(f!==i[0]&&i.unshift(f),c[f]):void 0}function Ab(a,b,c,d){var e,f,g,h,i,j={},k=a.dataTypes.slice();if(k[1])for(g in a.converters)j[g.toLowerCase()]=a.converters[g];f=k.shift();while(f)if(a.responseFields[f]&&(c[a.responseFields[f]]=b),!i&&d&&a.dataFilter&&(b=a.dataFilter(b,a.dataType)),i=f,f=k.shift())if("*"===f)f=i;else if("*"!==i&&i!==f){if(g=j[i+" "+f]||j["* "+f],!g)for(e in j)if(h=e.split(" "),h[1]===f&&(g=j[i+" "+h[0]]||j["* "+h[0]])){g===!0?g=j[e]:j[e]!==!0&&(f=h[0],k.unshift(h[1]));break}if(g!==!0)if(g&&a["throws"])b=g(b);else try{b=g(b)}catch(l){return{state:"parsererror",error:g?l:"No conversion from "+i+" to "+f}}}return{state:"success",data:b}}n.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:jb.href,type:"GET",isLocal:pb.test(jb.protocol),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":ub,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/\bxml\b/,html:/\bhtml/,json:/\bjson\b/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":n.parseJSON,"text xml":n.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(a,b){return b?yb(yb(a,n.ajaxSettings),b):yb(n.ajaxSettings,a)},ajaxPrefilter:wb(sb),ajaxTransport:wb(tb),ajax:function(b,c){"object"==typeof b&&(c=b,b=void 0),c=c||{};var e,f,g,h,i,j,k,l,m=n.ajaxSetup({},c),o=m.context||m,p=m.context&&(o.nodeType||o.jquery)?n(o):n.event,q=n.Deferred(),r=n.Callbacks("once memory"),s=m.statusCode||{},t={},u={},v=0,w="canceled",x={readyState:0,getResponseHeader:function(a){var b;if(2===v){if(!h){h={};while(b=ob.exec(g))h[b[1].toLowerCase()]=b[2]}b=h[a.toLowerCase()]}return null==b?null:b},getAllResponseHeaders:function(){return 2===v?g:null},setRequestHeader:function(a,b){var c=a.toLowerCase();return v||(a=u[c]=u[c]||a,t[a]=b),this},overrideMimeType:function(a){return v||(m.mimeType=a),this},statusCode:function(a){var b;if(a)if(2>v)for(b in a)s[b]=[s[b],a[b]];else x.always(a[x.status]);return this},abort:function(a){var b=a||w;return e&&e.abort(b),z(0,b),this}};if(q.promise(x).complete=r.add,x.success=x.done,x.error=x.fail,m.url=((b||m.url||jb.href)+"").replace(mb,"").replace(rb,jb.protocol+"//"),m.type=c.method||c.type||m.method||m.type,m.dataTypes=n.trim(m.dataType||"*").toLowerCase().match(G)||[""],null==m.crossDomain){j=d.createElement("a");try{j.href=m.url,j.href=j.href,m.crossDomain=vb.protocol+"//"+vb.host!=j.protocol+"//"+j.host}catch(y){m.crossDomain=!0}}if(m.data&&m.processData&&"string"!=typeof m.data&&(m.data=n.param(m.data,m.traditional)),xb(sb,m,c,x),2===v)return x;k=n.event&&m.global,k&&0===n.active++&&n.event.trigger("ajaxStart"),m.type=m.type.toUpperCase(),m.hasContent=!qb.test(m.type),f=m.url,m.hasContent||(m.data&&(f=m.url+=(lb.test(f)?"&":"?")+m.data,delete m.data),m.cache===!1&&(m.url=nb.test(f)?f.replace(nb,"$1_="+kb++):f+(lb.test(f)?"&":"?")+"_="+kb++)),m.ifModified&&(n.lastModified[f]&&x.setRequestHeader("If-Modified-Since",n.lastModified[f]),n.etag[f]&&x.setRequestHeader("If-None-Match",n.etag[f])),(m.data&&m.hasContent&&m.contentType!==!1||c.contentType)&&x.setRequestHeader("Content-Type",m.contentType),x.setRequestHeader("Accept",m.dataTypes[0]&&m.accepts[m.dataTypes[0]]?m.accepts[m.dataTypes[0]]+("*"!==m.dataTypes[0]?", "+ub+"; q=0.01":""):m.accepts["*"]);for(l in m.headers)x.setRequestHeader(l,m.headers[l]);if(m.beforeSend&&(m.beforeSend.call(o,x,m)===!1||2===v))return x.abort();w="abort";for(l in{success:1,error:1,complete:1})x[l](m[l]);if(e=xb(tb,m,c,x)){if(x.readyState=1,k&&p.trigger("ajaxSend",[x,m]),2===v)return x;m.async&&m.timeout>0&&(i=a.setTimeout(function(){x.abort("timeout")},m.timeout));try{v=1,e.send(t,z)}catch(y){if(!(2>v))throw y;z(-1,y)}}else z(-1,"No Transport");function z(b,c,d,h){var j,l,t,u,w,y=c;2!==v&&(v=2,i&&a.clearTimeout(i),e=void 0,g=h||"",x.readyState=b>0?4:0,j=b>=200&&300>b||304===b,d&&(u=zb(m,x,d)),u=Ab(m,u,x,j),j?(m.ifModified&&(w=x.getResponseHeader("Last-Modified"),w&&(n.lastModified[f]=w),w=x.getResponseHeader("etag"),w&&(n.etag[f]=w)),204===b||"HEAD"===m.type?y="nocontent":304===b?y="notmodified":(y=u.state,l=u.data,t=u.error,j=!t)):(t=y,!b&&y||(y="error",0>b&&(b=0))),x.status=b,x.statusText=(c||y)+"",j?q.resolveWith(o,[l,y,x]):q.rejectWith(o,[x,y,t]),x.statusCode(s),s=void 0,k&&p.trigger(j?"ajaxSuccess":"ajaxError",[x,m,j?l:t]),r.fireWith(o,[x,y]),k&&(p.trigger("ajaxComplete",[x,m]),--n.active||n.event.trigger("ajaxStop")))}return x},getJSON:function(a,b,c){return n.get(a,b,c,"json")},getScript:function(a,b){return n.get(a,void 0,b,"script")}}),n.each(["get","post"],function(a,b){n[b]=function(a,c,d,e){return n.isFunction(c)&&(e=e||d,d=c,c=void 0),n.ajax(n.extend({url:a,type:b,dataType:e,data:c,success:d},n.isPlainObject(a)&&a))}}),n._evalUrl=function(a){return n.ajax({url:a,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0})},n.fn.extend({wrapAll:function(a){var b;return n.isFunction(a)?this.each(function(b){n(this).wrapAll(a.call(this,b))}):(this[0]&&(b=n(a,this[0].ownerDocument).eq(0).clone(!0),this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;while(a.firstElementChild)a=a.firstElementChild;return a}).append(this)),this)},wrapInner:function(a){return n.isFunction(a)?this.each(function(b){n(this).wrapInner(a.call(this,b))}):this.each(function(){var b=n(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){var b=n.isFunction(a);return this.each(function(c){n(this).wrapAll(b?a.call(this,c):a)})},unwrap:function(){return this.parent().each(function(){n.nodeName(this,"body")||n(this).replaceWith(this.childNodes)}).end()}}),n.expr.filters.hidden=function(a){return!n.expr.filters.visible(a)},n.expr.filters.visible=function(a){return a.offsetWidth>0||a.offsetHeight>0||a.getClientRects().length>0};var Bb=/%20/g,Cb=/\[\]$/,Db=/\r?\n/g,Eb=/^(?:submit|button|image|reset|file)$/i,Fb=/^(?:input|select|textarea|keygen)/i;function Gb(a,b,c,d){var e;if(n.isArray(b))n.each(b,function(b,e){c||Cb.test(a)?d(a,e):Gb(a+"["+("object"==typeof e&&null!=e?b:"")+"]",e,c,d)});else if(c||"object"!==n.type(b))d(a,b);else for(e in b)Gb(a+"["+e+"]",b[e],c,d)}n.param=function(a,b){var c,d=[],e=function(a,b){b=n.isFunction(b)?b():null==b?"":b,d[d.length]=encodeURIComponent(a)+"="+encodeURIComponent(b)};if(void 0===b&&(b=n.ajaxSettings&&n.ajaxSettings.traditional),n.isArray(a)||a.jquery&&!n.isPlainObject(a))n.each(a,function(){e(this.name,this.value)});else for(c in a)Gb(c,a[c],b,e);return d.join("&").replace(Bb,"+")},n.fn.extend({serialize:function(){return n.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var a=n.prop(this,"elements");return a?n.makeArray(a):this}).filter(function(){var a=this.type;return this.name&&!n(this).is(":disabled")&&Fb.test(this.nodeName)&&!Eb.test(a)&&(this.checked||!X.test(a))}).map(function(a,b){var c=n(this).val();return null==c?null:n.isArray(c)?n.map(c,function(a){return{name:b.name,value:a.replace(Db,"\r\n")}}):{name:b.name,value:c.replace(Db,"\r\n")}}).get()}}),n.ajaxSettings.xhr=function(){try{return new a.XMLHttpRequest}catch(b){}};var Hb={0:200,1223:204},Ib=n.ajaxSettings.xhr();l.cors=!!Ib&&"withCredentials"in Ib,l.ajax=Ib=!!Ib,n.ajaxTransport(function(b){var c,d;return l.cors||Ib&&!b.crossDomain?{send:function(e,f){var g,h=b.xhr();if(h.open(b.type,b.url,b.async,b.username,b.password),b.xhrFields)for(g in b.xhrFields)h[g]=b.xhrFields[g];b.mimeType&&h.overrideMimeType&&h.overrideMimeType(b.mimeType),b.crossDomain||e["X-Requested-With"]||(e["X-Requested-With"]="XMLHttpRequest");for(g in e)h.setRequestHeader(g,e[g]);c=function(a){return function(){c&&(c=d=h.onload=h.onerror=h.onabort=h.onreadystatechange=null,"abort"===a?h.abort():"error"===a?"number"!=typeof h.status?f(0,"error"):f(h.status,h.statusText):f(Hb[h.status]||h.status,h.statusText,"text"!==(h.responseType||"text")||"string"!=typeof h.responseText?{binary:h.response}:{text:h.responseText},h.getAllResponseHeaders()))}},h.onload=c(),d=h.onerror=c("error"),void 0!==h.onabort?h.onabort=d:h.onreadystatechange=function(){4===h.readyState&&a.setTimeout(function(){c&&d()})},c=c("abort");try{h.send(b.hasContent&&b.data||null)}catch(i){if(c)throw i}},abort:function(){c&&c()}}:void 0}),n.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/\b(?:java|ecma)script\b/},converters:{"text script":function(a){return n.globalEval(a),a}}}),n.ajaxPrefilter("script",function(a){void 0===a.cache&&(a.cache=!1),a.crossDomain&&(a.type="GET")}),n.ajaxTransport("script",function(a){if(a.crossDomain){var b,c;return{send:function(e,f){b=n("<script>").prop({charset:a.scriptCharset,src:a.url}).on("load error",c=function(a){b.remove(),c=null,a&&f("error"===a.type?404:200,a.type)}),d.head.appendChild(b[0])},abort:function(){c&&c()}}}});var Jb=[],Kb=/(=)\?(?=&|$)|\?\?/;n.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var a=Jb.pop()||n.expando+"_"+kb++;return this[a]=!0,a}}),n.ajaxPrefilter("json jsonp",function(b,c,d){var e,f,g,h=b.jsonp!==!1&&(Kb.test(b.url)?"url":"string"==typeof b.data&&0===(b.contentType||"").indexOf("application/x-www-form-urlencoded")&&Kb.test(b.data)&&"data");return h||"jsonp"===b.dataTypes[0]?(e=b.jsonpCallback=n.isFunction(b.jsonpCallback)?b.jsonpCallback():b.jsonpCallback,h?b[h]=b[h].replace(Kb,"$1"+e):b.jsonp!==!1&&(b.url+=(lb.test(b.url)?"&":"?")+b.jsonp+"="+e),b.converters["script json"]=function(){return g||n.error(e+" was not called"),g[0]},b.dataTypes[0]="json",f=a[e],a[e]=function(){g=arguments},d.always(function(){void 0===f?n(a).removeProp(e):a[e]=f,b[e]&&(b.jsonpCallback=c.jsonpCallback,Jb.push(e)),g&&n.isFunction(f)&&f(g[0]),g=f=void 0}),"script"):void 0}),n.parseHTML=function(a,b,c){if(!a||"string"!=typeof a)return null;"boolean"==typeof b&&(c=b,b=!1),b=b||d;var e=x.exec(a),f=!c&&[];return e?[b.createElement(e[1])]:(e=ca([a],b,f),f&&f.length&&n(f).remove(),n.merge([],e.childNodes))};var Lb=n.fn.load;n.fn.load=function(a,b,c){if("string"!=typeof a&&Lb)return Lb.apply(this,arguments);var d,e,f,g=this,h=a.indexOf(" ");return h>-1&&(d=n.trim(a.slice(h)),a=a.slice(0,h)),n.isFunction(b)?(c=b,b=void 0):b&&"object"==typeof b&&(e="POST"),g.length>0&&n.ajax({url:a,type:e||"GET",dataType:"html",data:b}).done(function(a){f=arguments,g.html(d?n("<div>").append(n.parseHTML(a)).find(d):a)}).always(c&&function(a,b){g.each(function(){c.apply(g,f||[a.responseText,b,a])})}),this},n.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(a,b){n.fn[b]=function(a){return this.on(b,a)}}),n.expr.filters.animated=function(a){return n.grep(n.timers,function(b){return a===b.elem}).length};function Mb(a){return n.isWindow(a)?a:9===a.nodeType&&a.defaultView}n.offset={setOffset:function(a,b,c){var d,e,f,g,h,i,j,k=n.css(a,"position"),l=n(a),m={};"static"===k&&(a.style.position="relative"),h=l.offset(),f=n.css(a,"top"),i=n.css(a,"left"),j=("absolute"===k||"fixed"===k)&&(f+i).indexOf("auto")>-1,j?(d=l.position(),g=d.top,e=d.left):(g=parseFloat(f)||0,e=parseFloat(i)||0),n.isFunction(b)&&(b=b.call(a,c,n.extend({},h))),null!=b.top&&(m.top=b.top-h.top+g),null!=b.left&&(m.left=b.left-h.left+e),"using"in b?b.using.call(a,m):l.css(m)}},n.fn.extend({offset:function(a){if(arguments.length)return void 0===a?this:this.each(function(b){n.offset.setOffset(this,a,b)});var b,c,d=this[0],e={top:0,left:0},f=d&&d.ownerDocument;if(f)return b=f.documentElement,n.contains(b,d)?(e=d.getBoundingClientRect(),c=Mb(f),{top:e.top+c.pageYOffset-b.clientTop,left:e.left+c.pageXOffset-b.clientLeft}):e},position:function(){if(this[0]){var a,b,c=this[0],d={top:0,left:0};return"fixed"===n.css(c,"position")?b=c.getBoundingClientRect():(a=this.offsetParent(),b=this.offset(),n.nodeName(a[0],"html")||(d=a.offset()),d.top+=n.css(a[0],"borderTopWidth",!0),d.left+=n.css(a[0],"borderLeftWidth",!0)),{top:b.top-d.top-n.css(c,"marginTop",!0),left:b.left-d.left-n.css(c,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){var a=this.offsetParent;while(a&&"static"===n.css(a,"position"))a=a.offsetParent;return a||Ea})}}),n.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(a,b){var c="pageYOffset"===b;n.fn[a]=function(d){return K(this,function(a,d,e){var f=Mb(a);return void 0===e?f?f[b]:a[d]:void(f?f.scrollTo(c?f.pageXOffset:e,c?e:f.pageYOffset):a[d]=e)},a,d,arguments.length)}}),n.each(["top","left"],function(a,b){n.cssHooks[b]=Ga(l.pixelPosition,function(a,c){return c?(c=Fa(a,b),Ba.test(c)?n(a).position()[b]+"px":c):void 0})}),n.each({Height:"height",Width:"width"},function(a,b){n.each({padding:"inner"+a,content:b,"":"outer"+a},function(c,d){n.fn[d]=function(d,e){var f=arguments.length&&(c||"boolean"!=typeof d),g=c||(d===!0||e===!0?"margin":"border");return K(this,function(b,c,d){var e;return n.isWindow(b)?b.document.documentElement["client"+a]:9===b.nodeType?(e=b.documentElement,Math.max(b.body["scroll"+a],e["scroll"+a],b.body["offset"+a],e["offset"+a],e["client"+a])):void 0===d?n.css(b,c,g):n.style(b,c,d,g)},b,f?d:void 0,f,null)}})}),n.fn.extend({bind:function(a,b,c){return this.on(a,null,b,c)},unbind:function(a,b){return this.off(a,null,b)},delegate:function(a,b,c,d){return this.on(b,a,c,d)},undelegate:function(a,b,c){return 1===arguments.length?this.off(a,"**"):this.off(b,a||"**",c)},size:function(){return this.length}}),n.fn.andSelf=n.fn.addBack,"function"==typeof define&&define.amd&&define("jquery",[],function(){return n});var Nb=a.jQuery,Ob=a.$;return n.noConflict=function(b){return a.$===n&&(a.$=Ob),b&&a.jQuery===n&&(a.jQuery=Nb),n},b||(a.jQuery=a.$=n),n});

//     Underscore.js 1.8.2
//     http://underscorejs.org
//     (c) 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.
(function(){function n(n){function t(t,r,e,u,i,o){for(;i>=0&&o>i;i+=n){var a=u?u[i]:i;e=r(e,t[a],a,t)}return e}return function(r,e,u,i){e=d(e,i,4);var o=!w(r)&&m.keys(r),a=(o||r).length,c=n>0?0:a-1;return arguments.length<3&&(u=r[o?o[c]:c],c+=n),t(r,e,u,o,c,a)}}function t(n){return function(t,r,e){r=b(r,e);for(var u=null!=t&&t.length,i=n>0?0:u-1;i>=0&&u>i;i+=n)if(r(t[i],i,t))return i;return-1}}function r(n,t){var r=S.length,e=n.constructor,u=m.isFunction(e)&&e.prototype||o,i="constructor";for(m.has(n,i)&&!m.contains(t,i)&&t.push(i);r--;)i=S[r],i in n&&n[i]!==u[i]&&!m.contains(t,i)&&t.push(i)}var e=this,u=e._,i=Array.prototype,o=Object.prototype,a=Function.prototype,c=i.push,l=i.slice,f=o.toString,s=o.hasOwnProperty,p=Array.isArray,h=Object.keys,v=a.bind,g=Object.create,y=function(){},m=function(n){return n instanceof m?n:this instanceof m?void(this._wrapped=n):new m(n)};"undefined"!=typeof exports?("undefined"!=typeof module&&module.exports&&(exports=module.exports=m),exports._=m):e._=m,m.VERSION="1.8.2";var d=function(n,t,r){if(t===void 0)return n;switch(null==r?3:r){case 1:return function(r){return n.call(t,r)};case 2:return function(r,e){return n.call(t,r,e)};case 3:return function(r,e,u){return n.call(t,r,e,u)};case 4:return function(r,e,u,i){return n.call(t,r,e,u,i)}}return function(){return n.apply(t,arguments)}},b=function(n,t,r){return null==n?m.identity:m.isFunction(n)?d(n,t,r):m.isObject(n)?m.matcher(n):m.property(n)};m.iteratee=function(n,t){return b(n,t,1/0)};var x=function(n,t){return function(r){var e=arguments.length;if(2>e||null==r)return r;for(var u=1;e>u;u++)for(var i=arguments[u],o=n(i),a=o.length,c=0;a>c;c++){var l=o[c];t&&r[l]!==void 0||(r[l]=i[l])}return r}},_=function(n){if(!m.isObject(n))return{};if(g)return g(n);y.prototype=n;var t=new y;return y.prototype=null,t},j=Math.pow(2,53)-1,w=function(n){var t=n&&n.length;return"number"==typeof t&&t>=0&&j>=t};m.each=m.forEach=function(n,t,r){t=d(t,r);var e,u;if(w(n))for(e=0,u=n.length;u>e;e++)t(n[e],e,n);else{var i=m.keys(n);for(e=0,u=i.length;u>e;e++)t(n[i[e]],i[e],n)}return n},m.map=m.collect=function(n,t,r){t=b(t,r);for(var e=!w(n)&&m.keys(n),u=(e||n).length,i=Array(u),o=0;u>o;o++){var a=e?e[o]:o;i[o]=t(n[a],a,n)}return i},m.reduce=m.foldl=m.inject=n(1),m.reduceRight=m.foldr=n(-1),m.find=m.detect=function(n,t,r){var e;return e=w(n)?m.findIndex(n,t,r):m.findKey(n,t,r),e!==void 0&&e!==-1?n[e]:void 0},m.filter=m.select=function(n,t,r){var e=[];return t=b(t,r),m.each(n,function(n,r,u){t(n,r,u)&&e.push(n)}),e},m.reject=function(n,t,r){return m.filter(n,m.negate(b(t)),r)},m.every=m.all=function(n,t,r){t=b(t,r);for(var e=!w(n)&&m.keys(n),u=(e||n).length,i=0;u>i;i++){var o=e?e[i]:i;if(!t(n[o],o,n))return!1}return!0},m.some=m.any=function(n,t,r){t=b(t,r);for(var e=!w(n)&&m.keys(n),u=(e||n).length,i=0;u>i;i++){var o=e?e[i]:i;if(t(n[o],o,n))return!0}return!1},m.contains=m.includes=m.include=function(n,t,r){return w(n)||(n=m.values(n)),m.indexOf(n,t,"number"==typeof r&&r)>=0},m.invoke=function(n,t){var r=l.call(arguments,2),e=m.isFunction(t);return m.map(n,function(n){var u=e?t:n[t];return null==u?u:u.apply(n,r)})},m.pluck=function(n,t){return m.map(n,m.property(t))},m.where=function(n,t){return m.filter(n,m.matcher(t))},m.findWhere=function(n,t){return m.find(n,m.matcher(t))},m.max=function(n,t,r){var e,u,i=-1/0,o=-1/0;if(null==t&&null!=n){n=w(n)?n:m.values(n);for(var a=0,c=n.length;c>a;a++)e=n[a],e>i&&(i=e)}else t=b(t,r),m.each(n,function(n,r,e){u=t(n,r,e),(u>o||u===-1/0&&i===-1/0)&&(i=n,o=u)});return i},m.min=function(n,t,r){var e,u,i=1/0,o=1/0;if(null==t&&null!=n){n=w(n)?n:m.values(n);for(var a=0,c=n.length;c>a;a++)e=n[a],i>e&&(i=e)}else t=b(t,r),m.each(n,function(n,r,e){u=t(n,r,e),(o>u||1/0===u&&1/0===i)&&(i=n,o=u)});return i},m.shuffle=function(n){for(var t,r=w(n)?n:m.values(n),e=r.length,u=Array(e),i=0;e>i;i++)t=m.random(0,i),t!==i&&(u[i]=u[t]),u[t]=r[i];return u},m.sample=function(n,t,r){return null==t||r?(w(n)||(n=m.values(n)),n[m.random(n.length-1)]):m.shuffle(n).slice(0,Math.max(0,t))},m.sortBy=function(n,t,r){return t=b(t,r),m.pluck(m.map(n,function(n,r,e){return{value:n,index:r,criteria:t(n,r,e)}}).sort(function(n,t){var r=n.criteria,e=t.criteria;if(r!==e){if(r>e||r===void 0)return 1;if(e>r||e===void 0)return-1}return n.index-t.index}),"value")};var A=function(n){return function(t,r,e){var u={};return r=b(r,e),m.each(t,function(e,i){var o=r(e,i,t);n(u,e,o)}),u}};m.groupBy=A(function(n,t,r){m.has(n,r)?n[r].push(t):n[r]=[t]}),m.indexBy=A(function(n,t,r){n[r]=t}),m.countBy=A(function(n,t,r){m.has(n,r)?n[r]++:n[r]=1}),m.toArray=function(n){return n?m.isArray(n)?l.call(n):w(n)?m.map(n,m.identity):m.values(n):[]},m.size=function(n){return null==n?0:w(n)?n.length:m.keys(n).length},m.partition=function(n,t,r){t=b(t,r);var e=[],u=[];return m.each(n,function(n,r,i){(t(n,r,i)?e:u).push(n)}),[e,u]},m.first=m.head=m.take=function(n,t,r){return null==n?void 0:null==t||r?n[0]:m.initial(n,n.length-t)},m.initial=function(n,t,r){return l.call(n,0,Math.max(0,n.length-(null==t||r?1:t)))},m.last=function(n,t,r){return null==n?void 0:null==t||r?n[n.length-1]:m.rest(n,Math.max(0,n.length-t))},m.rest=m.tail=m.drop=function(n,t,r){return l.call(n,null==t||r?1:t)},m.compact=function(n){return m.filter(n,m.identity)};var k=function(n,t,r,e){for(var u=[],i=0,o=e||0,a=n&&n.length;a>o;o++){var c=n[o];if(w(c)&&(m.isArray(c)||m.isArguments(c))){t||(c=k(c,t,r));var l=0,f=c.length;for(u.length+=f;f>l;)u[i++]=c[l++]}else r||(u[i++]=c)}return u};m.flatten=function(n,t){return k(n,t,!1)},m.without=function(n){return m.difference(n,l.call(arguments,1))},m.uniq=m.unique=function(n,t,r,e){if(null==n)return[];m.isBoolean(t)||(e=r,r=t,t=!1),null!=r&&(r=b(r,e));for(var u=[],i=[],o=0,a=n.length;a>o;o++){var c=n[o],l=r?r(c,o,n):c;t?(o&&i===l||u.push(c),i=l):r?m.contains(i,l)||(i.push(l),u.push(c)):m.contains(u,c)||u.push(c)}return u},m.union=function(){return m.uniq(k(arguments,!0,!0))},m.intersection=function(n){if(null==n)return[];for(var t=[],r=arguments.length,e=0,u=n.length;u>e;e++){var i=n[e];if(!m.contains(t,i)){for(var o=1;r>o&&m.contains(arguments[o],i);o++);o===r&&t.push(i)}}return t},m.difference=function(n){var t=k(arguments,!0,!0,1);return m.filter(n,function(n){return!m.contains(t,n)})},m.zip=function(){return m.unzip(arguments)},m.unzip=function(n){for(var t=n&&m.max(n,"length").length||0,r=Array(t),e=0;t>e;e++)r[e]=m.pluck(n,e);return r},m.object=function(n,t){for(var r={},e=0,u=n&&n.length;u>e;e++)t?r[n[e]]=t[e]:r[n[e][0]]=n[e][1];return r},m.indexOf=function(n,t,r){var e=0,u=n&&n.length;if("number"==typeof r)e=0>r?Math.max(0,u+r):r;else if(r&&u)return e=m.sortedIndex(n,t),n[e]===t?e:-1;if(t!==t)return m.findIndex(l.call(n,e),m.isNaN);for(;u>e;e++)if(n[e]===t)return e;return-1},m.lastIndexOf=function(n,t,r){var e=n?n.length:0;if("number"==typeof r&&(e=0>r?e+r+1:Math.min(e,r+1)),t!==t)return m.findLastIndex(l.call(n,0,e),m.isNaN);for(;--e>=0;)if(n[e]===t)return e;return-1},m.findIndex=t(1),m.findLastIndex=t(-1),m.sortedIndex=function(n,t,r,e){r=b(r,e,1);for(var u=r(t),i=0,o=n.length;o>i;){var a=Math.floor((i+o)/2);r(n[a])<u?i=a+1:o=a}return i},m.range=function(n,t,r){arguments.length<=1&&(t=n||0,n=0),r=r||1;for(var e=Math.max(Math.ceil((t-n)/r),0),u=Array(e),i=0;e>i;i++,n+=r)u[i]=n;return u};var O=function(n,t,r,e,u){if(!(e instanceof t))return n.apply(r,u);var i=_(n.prototype),o=n.apply(i,u);return m.isObject(o)?o:i};m.bind=function(n,t){if(v&&n.bind===v)return v.apply(n,l.call(arguments,1));if(!m.isFunction(n))throw new TypeError("Bind must be called on a function");var r=l.call(arguments,2),e=function(){return O(n,e,t,this,r.concat(l.call(arguments)))};return e},m.partial=function(n){var t=l.call(arguments,1),r=function(){for(var e=0,u=t.length,i=Array(u),o=0;u>o;o++)i[o]=t[o]===m?arguments[e++]:t[o];for(;e<arguments.length;)i.push(arguments[e++]);return O(n,r,this,this,i)};return r},m.bindAll=function(n){var t,r,e=arguments.length;if(1>=e)throw new Error("bindAll must be passed function names");for(t=1;e>t;t++)r=arguments[t],n[r]=m.bind(n[r],n);return n},m.memoize=function(n,t){var r=function(e){var u=r.cache,i=""+(t?t.apply(this,arguments):e);return m.has(u,i)||(u[i]=n.apply(this,arguments)),u[i]};return r.cache={},r},m.delay=function(n,t){var r=l.call(arguments,2);return setTimeout(function(){return n.apply(null,r)},t)},m.defer=m.partial(m.delay,m,1),m.throttle=function(n,t,r){var e,u,i,o=null,a=0;r||(r={});var c=function(){a=r.leading===!1?0:m.now(),o=null,i=n.apply(e,u),o||(e=u=null)};return function(){var l=m.now();a||r.leading!==!1||(a=l);var f=t-(l-a);return e=this,u=arguments,0>=f||f>t?(o&&(clearTimeout(o),o=null),a=l,i=n.apply(e,u),o||(e=u=null)):o||r.trailing===!1||(o=setTimeout(c,f)),i}},m.debounce=function(n,t,r){var e,u,i,o,a,c=function(){var l=m.now()-o;t>l&&l>=0?e=setTimeout(c,t-l):(e=null,r||(a=n.apply(i,u),e||(i=u=null)))};return function(){i=this,u=arguments,o=m.now();var l=r&&!e;return e||(e=setTimeout(c,t)),l&&(a=n.apply(i,u),i=u=null),a}},m.wrap=function(n,t){return m.partial(t,n)},m.negate=function(n){return function(){return!n.apply(this,arguments)}},m.compose=function(){var n=arguments,t=n.length-1;return function(){for(var r=t,e=n[t].apply(this,arguments);r--;)e=n[r].call(this,e);return e}},m.after=function(n,t){return function(){return--n<1?t.apply(this,arguments):void 0}},m.before=function(n,t){var r;return function(){return--n>0&&(r=t.apply(this,arguments)),1>=n&&(t=null),r}},m.once=m.partial(m.before,2);var F=!{toString:null}.propertyIsEnumerable("toString"),S=["valueOf","isPrototypeOf","toString","propertyIsEnumerable","hasOwnProperty","toLocaleString"];m.keys=function(n){if(!m.isObject(n))return[];if(h)return h(n);var t=[];for(var e in n)m.has(n,e)&&t.push(e);return F&&r(n,t),t},m.allKeys=function(n){if(!m.isObject(n))return[];var t=[];for(var e in n)t.push(e);return F&&r(n,t),t},m.values=function(n){for(var t=m.keys(n),r=t.length,e=Array(r),u=0;r>u;u++)e[u]=n[t[u]];return e},m.mapObject=function(n,t,r){t=b(t,r);for(var e,u=m.keys(n),i=u.length,o={},a=0;i>a;a++)e=u[a],o[e]=t(n[e],e,n);return o},m.pairs=function(n){for(var t=m.keys(n),r=t.length,e=Array(r),u=0;r>u;u++)e[u]=[t[u],n[t[u]]];return e},m.invert=function(n){for(var t={},r=m.keys(n),e=0,u=r.length;u>e;e++)t[n[r[e]]]=r[e];return t},m.functions=m.methods=function(n){var t=[];for(var r in n)m.isFunction(n[r])&&t.push(r);return t.sort()},m.extend=x(m.allKeys),m.extendOwn=m.assign=x(m.keys),m.findKey=function(n,t,r){t=b(t,r);for(var e,u=m.keys(n),i=0,o=u.length;o>i;i++)if(e=u[i],t(n[e],e,n))return e},m.pick=function(n,t,r){var e,u,i={},o=n;if(null==o)return i;m.isFunction(t)?(u=m.allKeys(o),e=d(t,r)):(u=k(arguments,!1,!1,1),e=function(n,t,r){return t in r},o=Object(o));for(var a=0,c=u.length;c>a;a++){var l=u[a],f=o[l];e(f,l,o)&&(i[l]=f)}return i},m.omit=function(n,t,r){if(m.isFunction(t))t=m.negate(t);else{var e=m.map(k(arguments,!1,!1,1),String);t=function(n,t){return!m.contains(e,t)}}return m.pick(n,t,r)},m.defaults=x(m.allKeys,!0),m.clone=function(n){return m.isObject(n)?m.isArray(n)?n.slice():m.extend({},n):n},m.tap=function(n,t){return t(n),n},m.isMatch=function(n,t){var r=m.keys(t),e=r.length;if(null==n)return!e;for(var u=Object(n),i=0;e>i;i++){var o=r[i];if(t[o]!==u[o]||!(o in u))return!1}return!0};var E=function(n,t,r,e){if(n===t)return 0!==n||1/n===1/t;if(null==n||null==t)return n===t;n instanceof m&&(n=n._wrapped),t instanceof m&&(t=t._wrapped);var u=f.call(n);if(u!==f.call(t))return!1;switch(u){case"[object RegExp]":case"[object String]":return""+n==""+t;case"[object Number]":return+n!==+n?+t!==+t:0===+n?1/+n===1/t:+n===+t;case"[object Date]":case"[object Boolean]":return+n===+t}var i="[object Array]"===u;if(!i){if("object"!=typeof n||"object"!=typeof t)return!1;var o=n.constructor,a=t.constructor;if(o!==a&&!(m.isFunction(o)&&o instanceof o&&m.isFunction(a)&&a instanceof a)&&"constructor"in n&&"constructor"in t)return!1}r=r||[],e=e||[];for(var c=r.length;c--;)if(r[c]===n)return e[c]===t;if(r.push(n),e.push(t),i){if(c=n.length,c!==t.length)return!1;for(;c--;)if(!E(n[c],t[c],r,e))return!1}else{var l,s=m.keys(n);if(c=s.length,m.keys(t).length!==c)return!1;for(;c--;)if(l=s[c],!m.has(t,l)||!E(n[l],t[l],r,e))return!1}return r.pop(),e.pop(),!0};m.isEqual=function(n,t){return E(n,t)},m.isEmpty=function(n){return null==n?!0:w(n)&&(m.isArray(n)||m.isString(n)||m.isArguments(n))?0===n.length:0===m.keys(n).length},m.isElement=function(n){return!(!n||1!==n.nodeType)},m.isArray=p||function(n){return"[object Array]"===f.call(n)},m.isObject=function(n){var t=typeof n;return"function"===t||"object"===t&&!!n},m.each(["Arguments","Function","String","Number","Date","RegExp","Error"],function(n){m["is"+n]=function(t){return f.call(t)==="[object "+n+"]"}}),m.isArguments(arguments)||(m.isArguments=function(n){return m.has(n,"callee")}),"function"!=typeof/./&&"object"!=typeof Int8Array&&(m.isFunction=function(n){return"function"==typeof n||!1}),m.isFinite=function(n){return isFinite(n)&&!isNaN(parseFloat(n))},m.isNaN=function(n){return m.isNumber(n)&&n!==+n},m.isBoolean=function(n){return n===!0||n===!1||"[object Boolean]"===f.call(n)},m.isNull=function(n){return null===n},m.isUndefined=function(n){return n===void 0},m.has=function(n,t){return null!=n&&s.call(n,t)},m.noConflict=function(){return e._=u,this},m.identity=function(n){return n},m.constant=function(n){return function(){return n}},m.noop=function(){},m.property=function(n){return function(t){return null==t?void 0:t[n]}},m.propertyOf=function(n){return null==n?function(){}:function(t){return n[t]}},m.matcher=m.matches=function(n){return n=m.extendOwn({},n),function(t){return m.isMatch(t,n)}},m.times=function(n,t,r){var e=Array(Math.max(0,n));t=d(t,r,1);for(var u=0;n>u;u++)e[u]=t(u);return e},m.random=function(n,t){return null==t&&(t=n,n=0),n+Math.floor(Math.random()*(t-n+1))},m.now=Date.now||function(){return(new Date).getTime()};var M={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"},N=m.invert(M),I=function(n){var t=function(t){return n[t]},r="(?:"+m.keys(n).join("|")+")",e=RegExp(r),u=RegExp(r,"g");return function(n){return n=null==n?"":""+n,e.test(n)?n.replace(u,t):n}};m.escape=I(M),m.unescape=I(N),m.result=function(n,t,r){var e=null==n?void 0:n[t];return e===void 0&&(e=r),m.isFunction(e)?e.call(n):e};var B=0;m.uniqueId=function(n){var t=++B+"";return n?n+t:t},m.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};var T=/(.)^/,R={"'":"'","\\":"\\","\r":"r","\n":"n","\u2028":"u2028","\u2029":"u2029"},q=/\\|'|\r|\n|\u2028|\u2029/g,K=function(n){return"\\"+R[n]};m.template=function(n,t,r){!t&&r&&(t=r),t=m.defaults({},t,m.templateSettings);var e=RegExp([(t.escape||T).source,(t.interpolate||T).source,(t.evaluate||T).source].join("|")+"|$","g"),u=0,i="__p+='";n.replace(e,function(t,r,e,o,a){return i+=n.slice(u,a).replace(q,K),u=a+t.length,r?i+="'+\n((__t=("+r+"))==null?'':_.escape(__t))+\n'":e?i+="'+\n((__t=("+e+"))==null?'':__t)+\n'":o&&(i+="';\n"+o+"\n__p+='"),t}),i+="';\n",t.variable||(i="with(obj||{}){\n"+i+"}\n"),i="var __t,__p='',__j=Array.prototype.join,"+"print=function(){__p+=__j.call(arguments,'');};\n"+i+"return __p;\n";try{var o=new Function(t.variable||"obj","_",i)}catch(a){throw a.source=i,a}var c=function(n){return o.call(this,n,m)},l=t.variable||"obj";return c.source="function("+l+"){\n"+i+"}",c},m.chain=function(n){var t=m(n);return t._chain=!0,t};var z=function(n,t){return n._chain?m(t).chain():t};m.mixin=function(n){m.each(m.functions(n),function(t){var r=m[t]=n[t];m.prototype[t]=function(){var n=[this._wrapped];return c.apply(n,arguments),z(this,r.apply(m,n))}})},m.mixin(m),m.each(["pop","push","reverse","shift","sort","splice","unshift"],function(n){var t=i[n];m.prototype[n]=function(){var r=this._wrapped;return t.apply(r,arguments),"shift"!==n&&"splice"!==n||0!==r.length||delete r[0],z(this,r)}}),m.each(["concat","join","slice"],function(n){var t=i[n];m.prototype[n]=function(){return z(this,t.apply(this._wrapped,arguments))}}),m.prototype.value=function(){return this._wrapped},m.prototype.valueOf=m.prototype.toJSON=m.prototype.value,m.prototype.toString=function(){return""+this._wrapped},"function"==typeof define&&define.amd&&define("underscore",[],function(){return m})}).call(this);
//# sourceMappingURL=underscore-min.map;
/*!
 * Restive.JS v1.3.5
 * http://restivejs.com
 *
 * Copyright 2015 Obinwanne Hill <https://about.me/obinwanne.hill>
 * Released under MIT License
*/
/*! PHP-JS | @link https://github.com/kvz/phpjs | @copyright Kevin van Zonneveld | @license MIT and GPL */
function count(a,b){var c,d=!1,e=0;switch(!0){case null===a||"undefined"==typeof a:return 0;case!isArray(a)&&!isObject(a):d=!0}switch(!0){case a.hasOwnProperty("length"):return a.length}switch(!0){case d:return 1}switch(!0){case"COUNT_RECURSIVE"===b:b=1}switch(!0){case 1!=b:b=0}for(c in a)switch(!0){case a.hasOwnProperty(c):switch(e++,!0){case 1==b&&a[c]&&(isArray(a[c])||isObject(a[c])):e+=this.count(a[c],1)}}return e}function in_array(a,b,c){var d="",e=!!c;if(e){for(d in b)if(b[d]===a)return!0}else for(d in b)if(b[d]==a)return!0;return!1}function array_search(a,b,c){var d=!!c,e="";if(b&&"object"==typeof b&&b.change_key_case)return b.search(a,c);if("object"==typeof a&&a.exec){if(!d){var f="i"+(a.global?"g":"")+(a.multiline?"m":"")+(a.sticky?"y":"");a=new RegExp(a.source,f)}for(e in b)if(a.test(b[e]))return e;return!1}for(e in b)if(d&&b[e]===a||!d&&b[e]==a)return e;return!1}function array_keys(a,b,c){var d="undefined"!=typeof b,e=[],f=!!c,g=!0,h="";if(a&&"object"==typeof a&&a.change_key_case)return a.keys(b,c);for(h in a)a.hasOwnProperty(h)&&(g=!0,d&&(f&&a[h]!==b?g=!1:a[h]!=b&&(g=!1)),g&&(e[e.length]=h));return e}function array_values(a){var b=[],c="";if(a&&"object"==typeof a&&a.change_key_case)return a.values();for(c in a)b[b.length]=a[c];return b}function array_combine(a,b){var c={},d=a&&a.length,e=0;if("object"!=typeof a||"object"!=typeof b||"number"!=typeof d||"number"!=typeof b.length||!d)return!1;if(d!=b.length)return!1;for(e=0;d>e;e++)c[a[e]]=b[e];return c}function implode(a,b){var c=Array.prototype.slice.call(arguments),d=c[2],e="",f="",g="";if(1===arguments.length&&(b=a,a=""),"object"==typeof b){if(d)for(e=0;e<count(b);e++)f+=g+b[e],g=a;else for(e in b)f+=g+b[e],g=a;return f}return b}function explode(a,b,c){if(arguments.length<2||"undefined"==typeof a||"undefined"==typeof b)return null;if(""===a||a===!1||null===a)return!1;if("function"==typeof a||"object"==typeof a||"function"==typeof b||"object"==typeof b)return{0:""};a===!0&&(a="1"),a+="",b+="";var d=b.split(a);return"undefined"==typeof c?d:(0===c&&(c=1),c>0?c>=d.length?d:d.slice(0,c-1).concat([d.slice(c-1).join(a)]):-c>=d.length?[]:(d.splice(d.length+c),d))}function urlencode(a){return a=(a+"").toString(),encodeURIComponent(a).replace(/!/g,"%21").replace(/'/g,"%27").replace(/\(/g,"%28").replace(/\)/g,"%29").replace(/\*/g,"%2A").replace(/%20/g,"+")}function strrpos(a,b,c){var d=-1;return c?(d=(a+"").slice(c).lastIndexOf(b),-1!==d&&(d+=c)):d=(a+"").lastIndexOf(b),d>=0?d:!1}function uasort(a,b){var c=[],d="",e=0,f=!1,g={};"string"==typeof b?b=this[b]:"[object Array]"===Object.prototype.toString.call(b)&&(b=this[b[0]][b[1]]),this.php_js=this.php_js||{},this.php_js.ini=this.php_js.ini||{},f=this.php_js.ini["phpjs.strictForIn"]&&this.php_js.ini["phpjs.strictForIn"].local_value&&"off"!==this.php_js.ini["phpjs.strictForIn"].local_value,g=f?a:g;for(d in a)a.hasOwnProperty(d)&&(c.push([d,a[d]]),f&&delete a[d]);for(c.sort(function(a,c){return b(a[1],c[1])}),e=0;e<c.length;e++)g[c[e][0]]=c[e][1];return f||g}function microtime(a){var b=(new Date).getTime()/1e3,c=parseInt(b,10);return a?b:Math.round(1e3*(b-c))/1e3+" "+c}function substr_count(a,b){var c=b.replace(/(?=[\\^$*+?.\(\)|{\}[\]])/g,"\\"),d=new RegExp(""+c,"g"),e=a.match(d);return e?e.length:0}function isString(a){return"string"==typeof a}function isNumber(a){return!isNaN(parseFloat(a))&&isFinite(a)}function isBool(a){return a===!0||a===!1}function isArray(a){return"[object Array]"===Object.prototype.toString.call(a)}function isObject(a){switch(!0){case isArray(a):return!1}var b;for(var c in a)if(a.hasOwnProperty(c)){b=!1;break}switch(b=isBool(b)?b:!0,!0){case"object"==typeof a&&b===!1:return!0}return!1}function isFunction(a){return!!(a&&a.constructor&&a.call&&a.apply)}function arrayToInteger(a){var b,c,d=[],e=[],f=[],g=[];d=array_keys(a),e=array_values(a),c=count(a);for(var h=0;c>h;h++)b=parseInt(e[h]),f.push(b);return g=array_combine(d,f)}function arrayHasDuplicates(a){for(var b={},c=count(a),d=0;c>d;++d){var e=a[d];if(Object.prototype.hasOwnProperty.call(b,e))return!0;b[e]=!0}return!1}function getValueAfterExplode(a,b,c){var d=explode(b,a);return d[c]}function getSortedKeys(a){for(var b=[],c=0;c<a.length;c++)b.push({key:c,value:a[c]});b.sort(function(a,b){return a.value<b.value?-1:a.value>b.value?1:0});for(var d=[],c=0;c<b.length;c++)d.push(b[c].key);return d}function getClosestNumberMatchArray(a,b){var c,d,e,f,g=Array.prototype.slice.call(arguments),h=isBool(g[2])?g[2]:!1,i=isBool(g[3])?g[3]:!0,j=isNumber(g[4])?g[4]:0,k=[],l=[];a=arrayToInteger(a),b=parseInt(b);for(var m=0;m<count(a);m++)c=b-a[m],c=Math.abs(c),l.push(c);switch(k=getSortedKeys(l),d=k[0],e=a[d],f=e-b,f=Math.abs(f),!0){case b>e:i=j>=f?!1:i,d=i?d+1:d}return e=a[d],h?d:e}function isEvenDecimal(a){var b,c,d=Array.prototype.slice.call(arguments),e=isBool(d[1])?d[1]:!1;switch(b=0>a&&e?-1*a:a,c=b%1,!0){case!isNumber(b)||1>b||0==c:return!1}return b=Math.floor(b),c=b%2,!(0!=c)}function getUrl(){var a,b=Array.prototype.slice.call(arguments),c=isString(b[0])&&""!=b[0]?b[0]:"",d=isString(b[1])&&""!=b[1]?b[1]:document.URL,e=[],f=/\?+/.test(d),g=d.match(/^([h|f]{1}[t]{0,1}tp[s]{0,1}\:\/\/)([^ ]+?)\?([^ ]*)/i);switch(!0){case"basepath"==c||"bp"==c:return f?g[1]+g[2]:d;case"basedir"==c||"bd"==c:return a=f?g[1]+g[2]:d,e=explode("/",a),e.pop(),implode("/",e);case"query"==c||"q"==c:return f?g[3]:"";default:return d}}/*! md5.js - MD5 Message-Digest - v2.0.0 | @copyright 1999,2002 Masanao Izumo <iz@onicos.co.jp>  */
!function(){function a(a,b,c){return a&b|~a&c}function b(a,b,c){return a&c|b&~c}function c(a,b,c){return a^b^c}function d(a,b,c){return b^(a|~c)}function e(a){return String.fromCharCode(255&a)+String.fromCharCode(a>>>8&255)+String.fromCharCode(a>>>16&255)+String.fromCharCode(a>>>24&255)}function f(a){for(;0>a;)a+=4294967296;for(;a>4294967295;)a-=4294967296;return a}function g(a,b,c,d,e){var g,h,i,j,l,m,n,o,p;g=d[0],h=d[1],i=d[2],j=d[3],l=e[0],m=e[1],n=e[2],p=c(b[h],b[i],b[j]),o=b[g]+p+a[l]+k[n],o=f(o),o=o<<m|o>>>32-m,o+=b[h],b[g]=f(o)}function h(a){for(var b,c=-1,d=(a=a.split("")).length,e=String.fromCharCode;++c<d;a[c]=(b=a[c].charCodeAt(0))>=127?e(192|b>>>6)+e(128|63&b):a[c]);return a.join("")}function i(a){var b,c,d,i,j,k,l,m,n,o,q,r,s;if(/[\x80-\xFF]/.test(a)&&(a=h(a)),d=new Array(1732584193,4023233417,2562383102,271733878),j=a.length,k=63&j,l=56>k?56-k:120-k,l>0)for(a+="",o=0;l-1>o;o++)a+="\x00";for(a+=e(8*j),a+=e(0),j+=l+8,b=new Array(0,1,2,3),c=new Array(16),i=new Array(4),r=0;j>r;r+=64){for(o=0,q=r;16>o;o++,q+=4)c[o]=a.charCodeAt(q)|a.charCodeAt(q+1)<<8|a.charCodeAt(q+2)<<16|a.charCodeAt(q+3)<<24;for(o=0;4>o;o++)i[o]=d[o];for(o=0;4>o;o++)for(m=p[o][0],n=p[o][1],q=0;16>q;q++)g(c,i,m,b,n[q]),s=b[0],b[0]=b[3],b[3]=b[2],b[2]=b[1],b[1]=s;for(o=0;4>o;o++)d[o]+=i[o],d[o]=f(d[o])}return e(d[0])+e(d[1])+e(d[2])+e(d[3])}function j(a){var b,c,d,e;for(e=i(a),c="",b=0;16>b;b++)d=e.charCodeAt(b),c+="0123456789abcdef".charAt(d>>4&15),c+="0123456789abcdef".charAt(15&d);return c}var k=new Array(0,3614090360,3905402710,606105819,3250441966,4118548399,1200080426,2821735955,4249261313,1770035416,2336552879,4294925233,2304563134,1804603682,4254626195,2792965006,1236535329,4129170786,3225465664,643717713,3921069994,3593408605,38016083,3634488961,3889429448,568446438,3275163606,4107603335,1163531501,2850285829,4243563512,1735328473,2368359562,4294588738,2272392833,1839030562,4259657740,2763975236,1272893353,4139469664,3200236656,681279174,3936430074,3572445317,76029189,3654602809,3873151461,530742520,3299628645,4096336452,1126891415,2878612391,4237533241,1700485571,2399980690,4293915773,2240044497,1873313359,4264355552,2734768916,1309151649,4149444226,3174756917,718787259,3951481745),l=new Array(new Array(0,7,1),new Array(1,12,2),new Array(2,17,3),new Array(3,22,4),new Array(4,7,5),new Array(5,12,6),new Array(6,17,7),new Array(7,22,8),new Array(8,7,9),new Array(9,12,10),new Array(10,17,11),new Array(11,22,12),new Array(12,7,13),new Array(13,12,14),new Array(14,17,15),new Array(15,22,16)),m=new Array(new Array(1,5,17),new Array(6,9,18),new Array(11,14,19),new Array(0,20,20),new Array(5,5,21),new Array(10,9,22),new Array(15,14,23),new Array(4,20,24),new Array(9,5,25),new Array(14,9,26),new Array(3,14,27),new Array(8,20,28),new Array(13,5,29),new Array(2,9,30),new Array(7,14,31),new Array(12,20,32)),n=new Array(new Array(5,4,33),new Array(8,11,34),new Array(11,16,35),new Array(14,23,36),new Array(1,4,37),new Array(4,11,38),new Array(7,16,39),new Array(10,23,40),new Array(13,4,41),new Array(0,11,42),new Array(3,16,43),new Array(6,23,44),new Array(9,4,45),new Array(12,11,46),new Array(15,16,47),new Array(2,23,48)),o=new Array(new Array(0,6,49),new Array(7,10,50),new Array(14,15,51),new Array(5,21,52),new Array(12,6,53),new Array(3,10,54),new Array(10,15,55),new Array(1,21,56),new Array(8,6,57),new Array(15,10,58),new Array(6,15,59),new Array(13,21,60),new Array(4,6,61),new Array(11,10,62),new Array(2,15,63),new Array(9,21,64)),p=new Array(new Array(a,l),new Array(b,m),new Array(c,n),new Array(d,o));md5=function(a){return j(a)}}(),/*! json2.js | @link https://github.com/douglascrockford/JSON-js | @copyright Douglas Crockford <douglas@crockford.com> */
"object"!=typeof JSON&&(JSON={}),function(){"use strict";function f(a){return 10>a?"0"+a:a}function quote(a){return escapable.lastIndex=0,escapable.test(a)?'"'+a.replace(escapable,function(a){var b=meta[a];return"string"==typeof b?b:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+a+'"'}function str(a,b){var c,d,e,f,g,h=gap,i=b[a];switch(i&&"object"==typeof i&&"function"==typeof i.toJSON&&(i=i.toJSON(a)),"function"==typeof rep&&(i=rep.call(b,a,i)),typeof i){case"string":return quote(i);case"number":return isFinite(i)?String(i):"null";case"boolean":case"null":return String(i);case"object":if(!i)return"null";if(gap+=indent,g=[],"[object Array]"===Object.prototype.toString.apply(i)){for(f=i.length,c=0;f>c;c+=1)g[c]=str(c,i)||"null";return e=0===g.length?"[]":gap?"[\n"+gap+g.join(",\n"+gap)+"\n"+h+"]":"["+g.join(",")+"]",gap=h,e}if(rep&&"object"==typeof rep)for(f=rep.length,c=0;f>c;c+=1)"string"==typeof rep[c]&&(d=rep[c],e=str(d,i),e&&g.push(quote(d)+(gap?": ":":")+e));else for(d in i)Object.prototype.hasOwnProperty.call(i,d)&&(e=str(d,i),e&&g.push(quote(d)+(gap?": ":":")+e));return e=0===g.length?"{}":gap?"{\n"+gap+g.join(",\n"+gap)+"\n"+h+"}":"{"+g.join(",")+"}",gap=h,e}}"function"!=typeof Date.prototype.toJSON&&(Date.prototype.toJSON=function(){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null},String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(){return this.valueOf()});var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={"\b":"\\b","	":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},rep;"function"!=typeof JSON.stringify&&(JSON.stringify=function(a,b,c){var d;if(gap="",indent="","number"==typeof c)for(d=0;c>d;d+=1)indent+=" ";else"string"==typeof c&&(indent=c);if(rep=b,b&&"function"!=typeof b&&("object"!=typeof b||"number"!=typeof b.length))throw new Error("JSON.stringify");return str("",{"":a})}),"function"!=typeof JSON.parse&&(JSON.parse=function(text,reviver){function walk(a,b){var c,d,e=a[b];if(e&&"object"==typeof e)for(c in e)Object.prototype.hasOwnProperty.call(e,c)&&(d=walk(e,c),void 0!==d?e[c]=d:delete e[c]);return reviver.call(a,b,e)}var j;if(text=String(text),cx.lastIndex=0,cx.test(text)&&(text=text.replace(cx,function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})),/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,"")))return j=eval("("+text+")"),"function"==typeof reviver?walk({"":j},""):j;throw new SyntaxError("JSON.parse")})}(),/*! AmplifyJS-Store - v1.1.0 | @link http://amplifyjs.com/api/store/ | @copyright 2012 AppendTo <http://appendto.com/contact> | @license MIT and GPL V2 */
function(a,b){function c(a,c){d.addType(a,function(f,g,h){var i,j,k,l,m=g,n=(new Date).getTime();if(!f){m={},l=[],k=0;try{for(f=c.length;f=c.key(k++);)e.test(f)&&(j=JSON.parse(c.getItem(f)),j.expires&&j.expires<=n?l.push(f):m[f.replace(e,"")]=j.data);for(;f=l.pop();)c.removeItem(f)}catch(o){}return m}if(f="__amplify__"+f,g===b){if(i=c.getItem(f),j=i?JSON.parse(i):{expires:-1},!(j.expires&&j.expires<=n))return j.data;c.removeItem(f)}else if(null===g)c.removeItem(f);else{j=JSON.stringify({data:g,expires:h.expires?n+h.expires:null});try{c.setItem(f,j)}catch(o){d[a]();try{c.setItem(f,j)}catch(o){throw d.error()}}}return m})}var d=a.store=function(a,b,c){var e=d.type;return c&&c.type&&c.type in d.types&&(e=c.type),d.types[e](a,b,c||{})};d.types={},d.type=null,d.addType=function(a,b){d.type||(d.type=a),d.types[a]=b,d[a]=function(b,c,e){return e=e||{},e.type=a,d(b,c,e)}},d.error=function(){return"amplify.store quota exceeded"};var e=/^__amplify__/;for(var f in{localStorage:1,sessionStorage:1})try{window[f].setItem("__amplify__","x"),window[f].removeItem("__amplify__"),c(f,window[f])}catch(g){}if(!d.types.localStorage&&window.globalStorage)try{c("globalStorage",window.globalStorage[window.location.hostname]),"sessionStorage"===d.type&&(d.type="globalStorage")}catch(g){}!function(){if(!d.types.localStorage){var a=document.createElement("div"),c="amplify";a.style.display="none",document.getElementsByTagName("head")[0].appendChild(a);try{a.addBehavior("#default#userdata"),a.load(c)}catch(e){return void a.parentNode.removeChild(a)}d.addType("userData",function(e,f,g){a.load(c);var h,i,j,k,l,m=f,n=(new Date).getTime();if(!e){for(m={},l=[],k=0;h=a.XMLDocument.documentElement.attributes[k++];)i=JSON.parse(h.value),i.expires&&i.expires<=n?l.push(h.name):m[h.name]=i.data;for(;e=l.pop();)a.removeAttribute(e);return a.save(c),m}if(e=e.replace(/[^\-._0-9A-Za-z\xb7\xc0-\xd6\xd8-\xf6\xf8-\u037d\u037f-\u1fff\u200c-\u200d\u203f\u2040\u2070-\u218f]/g,"-"),e=e.replace(/^-/,"_-"),f===b){if(h=a.getAttribute(e),i=h?JSON.parse(h):{expires:-1},!(i.expires&&i.expires<=n))return i.data;a.removeAttribute(e)}else null===f?a.removeAttribute(e):(j=a.getAttribute(e),i=JSON.stringify({data:f,expires:g.expires?n+g.expires:null}),a.setAttribute(e,i));try{a.save(c)}catch(o){null===j?a.removeAttribute(e):a.setAttribute(e,j),d.userData();try{a.setAttribute(e,i),a.save(c)}catch(o){throw null===j?a.removeAttribute(e):a.setAttribute(e,j),d.error()}}return m})}}(),function(){function a(a){return a===b?b:JSON.parse(JSON.stringify(a))}var c={},e={};d.addType("memory",function(d,f,g){return d?f===b?a(c[d]):(e[d]&&(clearTimeout(e[d]),delete e[d]),null===f?(delete c[d],null):(c[d]=f,g.expires&&(e[d]=setTimeout(function(){delete c[d],delete e[d]},g.expires)),f)):a(c)})}()}(this.amplify=this.amplify||{}),/*! ios-orientationchange-fix.js | Script by @scottjehl rebound by @wilto, modified by Peter Wooster | @link https://github.com/scottjehl/iOS-Orientationchange-Fix | @copyright Scott Jehl <@scottjehl> | @license MIT / GPLV2 */
function(a){function b(){g.setAttribute("content",m),n=!0}function c(){g.setAttribute("content",l),n=!1}function d(d){a.orientation;return 90==Math.abs(a.orientation)?void(n&&b()):(j=d.accelerationIncludingGravity,h=Math.abs(j.x),i=Math.abs(j.y),void(0==i||h/i>1.2?n&&c():n||b()))}var e=navigator.userAgent.toLowerCase();if(/iphone|ipad|ipod/.test(navigator.platform.toLowerCase())&&/os [1-5]_[0-9_]* like mac os x/i.test(e)&&e.indexOf("applewebkit")>-1&&-1==e.indexOf("crios")){var f=a.document;if(f.querySelector){var g=f.querySelector("meta[name=viewport]");if(g){var h,i,j,k=g&&g.getAttribute("content"),l=k+",maximum-scale=1",m=k+",maximum-scale=10",n=!0;a.addEventListener("orientationchange",b,!1),a.addEventListener("devicemotion",d,!1)}}}}(this),/*! jQuery resize event - v1.1 | @link http://benalman.com/projects/jquery-resize-plugin/ | Copyright (c) 2010 "Cowboy" Ben Alman | @license MIT/GPL */
function(a,b,c){"$:nomunge";function d(){e=b[h](function(){f.each(function(){var b=a(this),c=b.width(),d=b.height(),e=a.data(this,j);(c!==e.w||d!==e.h)&&b.trigger(i,[e.w=c,e.h=d])}),d()},g[k])}var e,f=a([]),g=a.resizecontainer=a.extend(a.resize,{}),h="setTimeout",i="resizecontainer",j=i+"-special-event",k="delay",l="throttleWindow";g[k]=250,g[l]=!0,a.event.special[i]={setup:function(){if(!g[l]&&this[h])return!1;var b=a(this);f=f.add(b),a.data(this,j,{w:b.width(),h:b.height()}),1===f.length&&d()},teardown:function(){if(!g[l]&&this[h])return!1;var b=a(this);f=f.not(b),b.removeData(j),f.length||clearTimeout(e)},add:function(b){function d(b,d,f){var g=a(this),h=a.data(this,j);h.w=d!==c?d:g.width(),h.h=f!==c?f:g.height(),e.apply(this,arguments)}if(!g[l]&&this[h])return!1;var e;return a.isFunction(b)?(e=b,d):(e=b.handler,void(b.handler=d))}}}(jQuery,window),function(a){window.elementIsChildOf=function(b,c){var d=!1,e=a(""+b),f=a(""+c);switch(!0){case-1!=a(f).parents().index(e):d=!0}return d},window.getSelector=function(b){var c=a(b),d=c.attr("id");if(d)return"#"+d;var e=c[0].nodeName.toLowerCase();if("html"==e||"body"==e)return e;var f=c.parents().map(function(){return this.tagName}).get().reverse().join(" ");f&&(f+=" "+c[0].nodeName);var g=c.attr("class");g&&(f+="."+a.trim(g).replace(/\s/gi,"."));var h=c.attr("name");if(h&&(f+="[name='"+h+"']"),!h){var i=c.index();i&&(i+=1,f+=":nth-child("+i+")")}return f}}(jQuery);/*! Restive.JS | @copyright 2013 Obinwanne Hill */
var Restive=function(a,b,c){function d(){i("rstv_timestamp_curr",microtime(!0)),i("rstv_timestamp_init",i("rstv_timestamp_curr")),e(),z(),i("rstv_ort_init",V()),i("rstv_ort_curr",V())}function e(){i("rstv_var_doc_client_w",qb.clientWidth),i("rstv_var_doc_client_h",qb.clientHeight),i("rstv_var_win_outer_w",a.outerWidth),i("rstv_var_win_outer_h",a.outerHeight),i("rstv_var_win_screen_w",sb.width),i("rstv_var_win_screen_h",sb.height)}function f(){var a=parseInt(i("rstv_loaded_count"));switch(!0){case!isNumber(a):a=0}a++,i("rstv_loaded_count",a,"",{expires:1500})}function g(){var a=parseInt(i("rstv_loaded_count")),b=i("rstv_ffld_is_init");switch(!0){case a>1:switch(i("rstv_viewportW rstv_viewportW_dip rstv_viewportH rstv_viewportH_dip rstv_screenW rstv_screenH",null),i("rstv_is_ios rstv_is_android rstv_is_blackberry rstv_is_symbian rstv_is_windows rstv_is_windows_phone",null),i("rstv_is_android_1_ rstv_is_android_2_ rstv_is_android_3_",null),i("rstv_is_phone rstv_is_tablet rstv_is_tv rstv_is_pc",null),i("rstv_ort_curr rstv_timestamp_curr rstv_is_portrait rstv_is_landscape",null),i("rstv_multi_count rstv_multi_bpm_idx rstv_cache_bpm rstv_cache_bpm_lock rstv_cache_req rstv_cache_bpm_viewport_diff",null),i("rstv_user_agent",null),i("rstv_timestamp_curr",microtime(!0)),i("rstv_ort_curr",V()),!0){case!b:i("rstv_timestamp_init",i("rstv_timestamp_curr")),i("rstv_ort_init",V()),i("rstv_ffld_is_init",!0)}}}function h(){try{localStorage.setItem("__test","data")}catch(a){if(/QUOTA_?EXCEEDED/i.test(a.name))return!0}return!1}function i(){var b,c,d=Array.prototype.slice.call(arguments),e=a.rstv_store.main.rstv_is_priv_browsing,f=d[0],g=d[1],h="undefined"!=typeof d[2]&&null!==d[2]&&isString(d[2])&&""!=d[2]?d[2]:"ss",i=d[3],j=[],k=isString(f)&&""!=f?!1:!0,l=!("undefined"==typeof g||null===g||!(isString(g)&&""!=g||isNumber(g)||isArray(g)&&count(g)>0||isBool(g)||isObject(g))),m=!(null!==g);try{switch(!0){case e:b="storage",c=a.rstv_store[b];break;default:switch(!0){case"ls"==h:b="localStorage";break;default:b="sessionStorage"}switch(c=amplify.store[b],!0){case!a.sessionStorage||!a.localStorage:c=amplify.store}switch(!0){case k:return c()}}switch(!0){case!l&&!m:return c(f)}switch(!0){case m:j=explode(" ",f);for(var n=0;n<count(j);n++)c(j[n],null);return null}c(f,null),c(f,g,i)}catch(o){alert(o)}}function j(a,b){var d,e,f=Array.prototype.slice.call(arguments),g=isString(f[2])&&""!=f[2]?f[2]:"ck",h=isBool(f[3])?f[3]:!1,j=isNumber(f[4])||isString(f[4])?parseInt(f[4]):"",k=isNumber(f[4])||isString(f[4])?parseInt(f[4]):30,l=isBool(f[5])?f[5]:!0,m=isString(f[6])&&""!=f[6]?f[6]:"-!",n=isNumber(f[7])||isString(f[7])?parseInt(f[7]):60,o=[],p=[];switch(d="ls"==g?i(a):c.cookie(a),!0){case null===d||"undefined"==typeof d:return"ls"==g?i(a,b,"",{expires:j}):c.cookie(a,b,{expires:k,path:"/"}),!0;case"undefined"!=typeof d&&null!==d&&""!=d:switch(o=explode(m,d),!0){case in_array(b,o)&&h:return!1;default:switch(!0){case l:o.unshift(b),p=o.slice(0,n),e=implode(m,p);break;default:o.push(b),e=implode(m,o)}return"ls"==g?i(a,e,"",{expires:j}):c.cookie(a,e,{expires:k,path:"/"}),!0}}}function k(a,b){var d=Array.prototype.slice.call(arguments),e=isString(d[2])&&""!=d[2]?d[2]:"ck",f=isString(d[3])&&""!=d[3]?d[3]:"-!",g="ls"==e?i(b):c.cookie(b);switch(!0){case"undefined"!=typeof g&&null!==g&&""!=g:var h=[];switch(h=explode(f,g),!0){case in_array(a,h):return!0;default:return!1}break;default:return!1}}function l(a){var b=Array.prototype.slice.call(arguments),c=b[1],d=i(""+a),e=!("undefined"==typeof c||null===c),f=!1;switch(!0){case isBool(d)||null!==d&&"undefined"!=typeof d&&""!=d:f=!0}switch(!0){case!e:return f}switch(!0){case!f:i(a,c)}}function m(a){var b,c=Array.prototype.slice.call(arguments),d=isNumber(c[1])?c[1]:1,e=isBool(c[2])?c[2]:!1;switch(b=parseInt(i(a)),!0){case!isNumber(b):return!1}return b=e?b-d:b+d,i(a,b),b}function n(a){var b=[120,128,160,200,240,272,300,320,352,360,480,540,576,600,640,720,768,800,864,900,1024,1050,1080,1152,1200,1440,1536,1600,1800,2048,2160,2400,3072,3200,4096,4320,4800],c=[160,240,260,320,400,432,480,640,720,800,854,960,1024,1136,1152,1280,1360,1366,1400,1440,1600,1680,1920,2048,2560,2880,3200,3840,4096,5120,6400,7680];switch(!0){case"w"==a:return b;case"h"==a:return c}}function o(a){var b,c,d,e=Array.prototype.slice.call(arguments),f=isBool(e[1])?e[1]:!0,g=!1,h=!(!S()&&!R()),j=A(),k=i("rstv_var_win_outer_w"),l=i("rstv_var_win_outer_h"),m=i("rstv_var_doc_client_w"),o=i("rstv_var_doc_client_h"),p=i("rstv_var_win_screen_w"),q=i("rstv_var_win_screen_h");switch(!0){case h:switch(!0){case"vW"==a:b=m;break;case"vH"==a:b=o;break;case"sW"==a:b=p;break;case"sH"==a:b=q}switch(!0){case"vW"==a||"vH"==a:b=j>=1.5?b*j:b}return b=Math.floor(b)}var r,s,t,u,v,w,x,y,z,B,C=D(),E=/opera.+(mini|mobi)/i.test(C),F=!!G(),H=!!J(),K=!!L(),M=!!I(),N=!!I("1."),O=!!I("2."),P=!!(N||O||H||K),Q=p,T=q,U=Q,V=n("w"),W=n("h"),X=V,Y=W;switch(!0){case P:r=0>=k?m:k,s=0>=l?o:l,t=r,u=s;break;default:r=m,s=o,t=m,u=o}switch(!0){case(O||H)&&!E:Q=0>=k?Q:k,T=0>=l?T:l}switch(w=Q/T,v=Q-r,v=Math.abs(v),B=E&&260>r?4>=v&&w>=1?!0:!1:!0,y=!!(t>=u&&B),z=!!(Q>=T),!0){case F:X=X.slice(7),Y=Y.slice(6);break;case M:X=X.slice(4),Y=Y.slice(3);break;case H:X=X.slice(4)}switch(!0){case y:V=Y,W=X;break;default:V=X,W=Y}switch(!0){case"vW"==a:b=r;break;case"vH"==a:b=s;break;case"sW"==a:x=!!(y===!0&&z===!1||y===!1&&z===!0),b=x?T:Q,U=x?T:Q,c=b*j,g=f?in_array(b,V)||in_array(c,V)?!1:!0:!1;break;case"sH"==a:x=!!(y===!0&&z===!1||y===!1&&z===!0),b=x?Q:T,U=x?T:Q,c=b*j,g=f?in_array(b,W)||in_array(c,W)?!1:!0:!1}switch(d=U/r,!0){case 1>=j&&1.1>=d:switch(!0){case"sW"==a&&g:b=getClosestNumberMatchArray(V,b,"","",8);break;case"sH"==a&&g:b=getClosestNumberMatchArray(W,b,"","",8)}return b}switch(!0){case F:b*=j;break;default:switch(!0){case!O:switch(!0){case 1>=j&&d>1.1:b=in_array(a,["vW","vH"])?b*d:b;break;case j>1&&1.1>=d:switch(!0){case 1.1>=j:switch(!0){case in_array(a,["vW","vH"]):b*=j,b=isEvenDecimal(b)?Math.floor(b):b}break;default:b*=j}break;case j>1&&d>1.1:switch(!0){case in_array(a,["vW","vH"]):b*=j,b=isEvenDecimal(b)?Math.floor(b):Math.ceil(b)}}}switch(!0){case"sW"==a&&g:b=getClosestNumberMatchArray(V,b,"","",8);break;case"sH"==a&&g:b=getClosestNumberMatchArray(W,b,"","",8)}}return b=Math.floor(b)}function p(a){var b,c=!("w"!=a),d=!(!S()&&!R()),e=A();switch(!0){case d:e=1.5>=e?1:e}return b=c?t()/e:u()/e,Math.round(b)}function q(a,b){var c,d=Array.prototype.slice.call(arguments),e=isString(d[2])&&""!=d[2]?d[2]:"d",f=isBool(d[3])?d[3]:!1;switch(b=b.toLowerCase(),!0){case"w"==b:switch(!0){case"i"==e:c=a.innerWidth();break;case"o"==e:c=a.outerWidth();break;default:c=a.width()}break;case"h"==b:switch(!0){case"i"==e:c=a.innerHeight();break;case"o"==e:c=a.outerHeight();break;default:c=a.height()}break;default:c=!1}switch(!0){case f===!1:c*=A()}return c}function r(a){var b=Array.prototype.slice.call(arguments),c=b[1],d=b[2];return q(a,"w",c,d)}function s(a){var b=Array.prototype.slice.call(arguments),c=b[1],d=b[2];return q(a,"h",c,d)}function t(){return l("rstv_viewportW")?i("rstv_viewportW"):o("vW",i("rstv_is_getdim_screen_adj"))}function u(){return l("rstv_viewportH")?i("rstv_viewportH"):o("vH",i("rstv_is_getdim_screen_adj"))}function v(){return l("rstv_screenW")?i("rstv_screenW"):o("sW",i("rstv_is_getdim_screen_adj"))}function w(){return l("rstv_screenH")?i("rstv_screenH"):o("sH",i("rstv_is_getdim_screen_adj"))}function x(){return l("rstv_viewportW_dip")?i("rstv_viewportW_dip"):p("w")}function y(){return l("rstv_viewportH_dip")?i("rstv_viewportH_dip"):p("h")}function z(){i("rstv_viewportW rstv_viewportW_dip rstv_viewportH rstv_viewportH_dip rstv_screenW rstv_screenH",null),i("rstv_viewportW",t()),i("rstv_viewportH",u()),i("rstv_screenW",v()),i("rstv_screenH",w()),i("rstv_viewportW_dip",x()),i("rstv_viewportH_dip",y())}function A(a){switch(!0){case l("rstv_pixel_ratio"):return i("rstv_pixel_ratio")}var b,c,d,e,f=D(),g=/opera.+(mini|mobi)/i.test(f),h=i("rstv_var_doc_client_w"),j=i("rstv_var_win_outer_w"),k=i("rstv_var_win_screen_w"),m=!!J(),n=!!L(),o=!!I("1."),p=!!I("2."),q=!!(o||p||m||n),r=!(!n&&!m),s=q?0>=j?h:j:h,t=!p&&!m||g?k:0>=j?k:j;switch(c=pb.devicePixelRatio,!0){case 0>=c||"undefined"==typeof c||null===c:switch(d=t/s,b=d,!0){case r:switch(!0){case b>.5&&1.2>b:b=1;break;case b>=1.2&&2>b:b=1.5;break;case b>=2&&3>b:b=2;break;case b>=3:b=3;break;default:b=1}}i("rstv_pixel_ratio_virtual",d);break;default:b=c}switch(!0){case!isNumber(a):return e=b||(A(3)?3:A(2)?2:A(1.5)?1.5:A(1)?1:0),i("rstv_pixel_ratio",e),e}switch(!0){case!isFinite(a):return!1}switch(!0){case b&&b>0:return b>=a}switch(a="only all and (min--moz-device-pixel-ratio:"+a+")",!0){case tb(a).matches:return!0}return!!tb(a.replace("-moz-","")).matches}function B(){var a=A();switch(!0){case a>=2:return!0}return!1}function C(a){return function(b,c){var d,e=Array.prototype.slice.call(arguments),f=e[2],g=!(!isObject(f)||"undefined"==typeof f||null===f),h=e[3],i=e[4],j=g?a(f,h,i):a();return d=j>=(b||0),c?d&&c>=j:d}}function D(){switch(!0){case l("rstv_user_agent"):return i("rstv_user_agent")}var a,b=navigator.userAgent.toLowerCase();switch(a=/mozilla.+x11(?!.*?(ubuntu|firefox|chrome|safari|opera|opr|qupzilla))/i.test(b),!0){case a:c.ajax({type:"GET",async:!1,crossDomain:!0,url:"http://www.restive.io/ping/ua.php",headers:{"Cache-Control":"no-cache",Pragma:"no-cache"},success:function(a){b=a},error:function(){console.log("error")}})}return i("rstv_user_agent",b),b}function E(){switch(!0){case F("ios"):return"ios";case F("android"):return"android";case F("symbian"):return"symbian";case F("blackberry"):return"blackberry";case F("windows"):return"windows";default:return"other"}}function F(a){var b=Array.prototype.slice.call(arguments),c=!(!isString(b[1])||""==b[1]),d="",e="",f="";switch(!0){case c:d=b[1],d=d.replace(/^\s+|\s+$/g,""),e=" "+d,f="_"+d.replace(".","_")}switch(!0){case l("rstv_is_"+a+f):return i("rstv_is_"+a+f)}var g=D(),h=!1;switch(!0){case"ios"==a:h=/\bipad|\biphone|\bipod/i.test(g);break;case"android"==a:var j=new RegExp("\\bandroid"+e,"i");h=j.test(g);break;case"symbian"==a:h=/series(4|6)0|symbian|symbos|syb-[0-9]+|\bs60\b/i.test(g);break;case"blackberry"==a:h=/bb[0-9]+|blackberry|playbook|rim +tablet/i.test(g);break;case"windows"==a:h=/window mobile|windows +(ce|phone)|windows +nt.+arm|windows +nt.+touch|xblwp7|zunewp7/i.test(g);break;case"windows_phone"==a:h=/windows +phone|xblwp7|zunewp7/i.test(g);break;default:return!1}return i("rstv_is_"+a+f,h),!!h}function G(){return F("ios")}function H(){return F("ios")}function I(){var a=Array.prototype.slice.call(arguments),b=a[0];return F("android",b)}function J(){return F("symbian")}function K(){return F("blackberry")}function L(){return F("windows")}function M(){return F("windows_phone")}function N(a){return/android|android.+mobile|avantgo|bada\/|\bbb[0-9]+|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|\bip(hone|od|ad)|iris|kindle|lge |maemo|meego.+mobile|midp|mmp|motorola|mobile.+firefox|netfront|nokia|nintendo +3ds|opera m(ob|in)i|palm|palm( os)?|phone|p(ixi|re)\/|playbook|rim +tablet|playstation.+vita|plucker|pocket|psp|samsung|(gt\-|bgt\-|sgh\-|sph\-|sch\-)[a-z][0-9]+|series(4|6)0|symbian|symbos|\bs60\b|treo|up\.(browser|link)|vertu|vodafone|wap|windows (ce|phone)|windows +nt.+arm|windows +nt.+touch|xda|xiino|xblwp7|zunewp7/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(di|rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb|b\-[0-9]+)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))}function O(){var a="";switch(!0){case Q():a="tablet";break;case R():a="tv";break;default:switch(!0){case P():a="phone";break;default:a="pc"}}return a}function P(){switch(!0){case l("rstv_is_phone"):return i("rstv_is_phone")}switch(!0){case Q(!0)||R():return i("rstv_is_phone",!1),!1}switch(!0){case N(D()||navigator.vendor.toLowerCase()||a.opera):return i("rstv_is_phone",!0),!0}return i("rstv_is_phone",!1),!1}function Q(){var a=Array.prototype.slice.call(arguments),b=isBool(a[0])?a[0]:!1;switch(!0){case l("rstv_is_tablet"):return i("rstv_is_tablet")}var c,d,e,f=D(),g=parseInt(i("rstv_viewportW_dip")),h=parseInt(i("rstv_viewportH_dip")),j=i("rstv_is_portrait")?g:h;switch(d=new RegExp("ipad|playbook|rim +tablet","i"),e=d.test(f),!0){case e:return b||i("rstv_is_tablet",!0),!0}switch(d=new RegExp("windows +nt.+arm|windows +nt.+touch","i"),e=d.test(f),!0){case e:switch(!0){case isNumber(j)&&520>=j:return b||(i("rstv_is_tablet",!1),i("rstv_is_phone")===!1&&i("rstv_is_phone",!0)),!1;default:return b||i("rstv_is_tablet",!0),!0}}switch(c="android.+kindle|kindle +fire|android.+silk|silk.*accelerated|android.+nexus +(7|10)|samsung.*tablet|galaxy.*tab|sc-01c|gt-p1000|gt-p1003|gt-p1010|gt-p3105|gt-p6210|gt-p6800|gt-p6810|gt-p7100|gt-p7300|gt-p7310|gt-p7500|gt-p7510|sch-i800|sch-i815|sch-i905|sgh-i957|sgh-i987|sgh-t849|sgh-t859|sgh-t869|sph-p100|gt-p3100|gt-p3108|gt-p3110|gt-p5100|gt-p5110|gt-p6200|gt-p7320|gt-p7511|gt-n8000|gt-p8510|sgh-i497|sph-p500|sgh-t779|sch-i705|sch-i915|gt-n8013|gt-p3113|gt-p5113|gt-p8110|gt-n8010|gt-n8005|gt-n8020|gt-p1013|gt-p6201|gt-p7501|gt-n5100|gt-n5110|shv-e140k|shv-e140l|shv-e140s|shv-e150s|shv-e230k|shv-e230l|shv-e230s|shw-m180k|shw-m180l|shw-m180s|shw-m180w|shw-m300w|shw-m305w|shw-m380k|shw-m380s|shw-m380w|shw-m430w|shw-m480k|shw-m480s|shw-m480w|shw-m485w|shw-m486w|shw-m500w|gt-i9228|sch-p739|sch-i925|gt-i9200|gt-i9205|gt-p5200|gt-p5210|sm-t311|sm-t310|sm-t210|sm-t210r|sm-t211|sm-p600|sm-p601|sm-p605|sm-p900|sm-t217|sm-t217a|sm-t217s|sm-p6000|sm-t3100|sgh-i467|xe500|htc flyer|htc jetstream|htc-p715a|htc evo view 4g|pg41200|xoom|sholest|mz615|mz605|mz505|mz601|mz602|mz603|mz604|mz606|mz607|mz608|mz609|mz615|mz616|mz617|transformer|^.*padfone((?!mobile).)*$|tf101|tf201|tf300|tf700|tf701|tf810|me171|me301t|me302c|me371mg|me370t|me372mg|me172v|me173x|me400c|slider *sl101|android.+nook|nookcolor|nook browser|bnrv200|bnrv200a|bntv250|bntv250a|bntv400|bntv600|logicpd zoom2|android.*\\b(a100|a101|a110|a200|a210|a211|a500|a501|a510|a511|a700|a701|w500|w500p|w501|w501p|w510|w511|w700|g100|g100w|b1-a71|b1-710|b1-711|a1-810)\\b|w3-810|android.*(at100|at105|at200|at205|at270|at275|at300|at305|at1s5|at500|at570|at700|at830)|toshiba.*folio|\\bl-06c|lg-v900|lg-v905|lg-v909|android.+(xenta.+tab|tab210|tab211|tab224|tab250|tab260|tab264|tab310|tab360|tab364|tab410|tab411|tab420|tab424|tab450|tab460|tab461|tab464|tab465|tab467|tab468|tab469)|android.+\\boyo\\b|life.*(p9212|p9514|p9516|s9512)|lifetab|an10g2|an7bg3|an7fg3|an8g3|an8cg3|an7g3|an9g3|an7dg3|an7dg3st|an7dg3childpad|an10bg3|an10bg3dt|android.+archos|\\b(101g9|80g9|a101it)\\b|qilive 97r|novo7|novo7aurora|novo7basic|novo7paladin|novo8|novo9|novo10|sony tablet|sony tablet s|sgpt12|sgpt121|sgpt122|sgpt123|sgpt111|sgpt112|sgpt113|sgpt211|sgpt213|ebrd1101|ebrd1102|ebrd1201|sgpt311|sgpt312|sonyso-03e|android.*(k8gt|u9gt|u10gt|u16gt|u17gt|u18gt|u19gt|u20gt|u23gt|u30gt)|cube u8gt|mid1042|mid1045|mid1125|mid1126|mid7012|mid7014|mid7034|mid7035|mid7036|mid7042|mid7048|mid7127|mid8042|mid8048|mid8127|mid9042|mid9740|mid9742|mid7022|mid7010|android.*(\\bmid\\b|mid-560|mtv-t1200|mtv-pnd531|mtv-p1101|mtv-pnd530)|android.*(rk2818|rk2808a|rk2918|rk3066)|rk2738|rk2808a|t-hub2|iq310|fly vision|bq.*(elcano|curie|edison|maxwell|kepler|pascal|tesla|hypatia|platon|newton|livingstone|cervantes|avant)|mediapad|ideos s7|s7-201c|s7-202u|s7-101|s7-103|s7-104|s7-105|s7-106|s7-201|s7-slim|\\bn-06d|\\bn-08d|pantech.*p4100|broncho.*(n701|n708|n802|a710)|touchpad.*[78910]|\\btouchtab\\b|z1000|z99 2g|z99|z930|z999|z990|z909|z919|z900|tb07sta|tb10sta|tb07fta|tb10fta|android.*\\bnabi|playstation.*(portable|vita)|dell.*streak|milagrow +tab.*top|android.+(ideapad|ideatab|lenovo +a1|s2110|s6000|k3011|a3000|a1000|a2107|a2109|a1107)|android.+f8-sup|android.*(k080|arc|vox)|android.*(msi.+enjoy|enjoy +7|enjoy +10)|dropad.+a8|android.+c906|android.+iberry.+auxus|android.+aigopad|android.*(airpad|liquid metal)|android.+hcl.+tablet|connect-3g-2.0|connect-2g-2.0|me tablet u1|me tablet u2|me tablet g1|me tablet x1|me tablet y2|me tablet sync|android.*(a39|a37|a34|st8|st10|st7|smarttab|smart +tab)|android.*(micromax.+funbook|funbook|p250|p275|p300|p350|p362|p500|p600)|micromax.*(p250|p275|p350|p362|p500|p600)|funbook|android.+penta|android.*(celkon.+ct|ct-[0-9])|android.+i-buddy|android.*(viewbook|viewpad)|android.*(v9|zte.+v8110|light tab|light pro|beeline|base.*tab)|chagall|android.*(vandroid|t3i)|android.*(ziio7|ziio10)|android.*(v-t100|v-tw100|v-tr200|v-t300)|android.+vtab1008|bookeen|cybook|android.*lifetab_(s9512|p9514|p9516)|m702pro|irulu-al101|pmp3170b|pmp3270b|pmp3470b|pmp7170b|pmp3370b|pmp3570c|pmp5870c|pmp3670b|pmp5570c|pmp5770d|pmp3970b|pmp3870c|pmp5580c|pmp5880d|pmp5780d|pmp5588c|pmp7280c|pmp7280|pmp7880d|pmp5597d|pmp5597|pmp7100d|per3464|per3274|per3574|per3884|per5274|per5474|pmp5097cpro|pmp5097|pmp7380d|pmp5297c|pmp5297c_quad|allview.*(viva|alldro|city|speed|all tv|frenzy|quasar|shine|tx1|ax1|ax2)|megafon +v9|android.+(z7c|z7h|z7s)|android.+iball.+slide.+(3g *7271|3g *7334|3g *7307|3g *7316|i7119|i7011)|android.+iball.+i6012|navipad|tb-772a|tm-7045|tm-7055|tm-9750|tm-7016|tm-7024|tm-7026|tm-7041|tm-7043|tm-7047|tm-8041|tm-9741|tm-9747|tm-9748|tm-9751|tm-7022|tm-7021|tm-7020|tm-7011|tm-7010|tm-7023|tm-7025|tm-7037w|tm-7038w|tm-7027w|tm-9720|tm-9725|tm-9737w|tm-1020|tm-9738w|tm-9740|tm-9743w|tb-807a|tb-771a|tb-727a|tb-725a|tb-719a|tb-823a|tb-805a|tb-723a|tb-715a|tb-707a|tb-705a|tb-709a|tb-711a|tb-890hd|tb-880hd|tb-790hd|tb-780hd|tb-770hd|tb-721hd|tb-710hd|tb-434hd|tb-860hd|tb-840hd|tb-760hd|tb-750hd|tb-740hd|tb-730hd|tb-722hd|tb-720hd|tb-700hd|tb-500hd|tb-470hd|tb-431hd|tb-430hd|tb-506|tb-504|tb-446|tb-436|tb-416|tb-146se|tb-126se|android.*\\bg1\\b|tx-a1301|tx-m9002|q702|ly-f528|android.+dslide.*\\b(700|701r|702|703r|704|802|970|971|972|973|974|1010|1012)\\b|m9701|m9000|m9100|m806|m1052|m806|t703|mid701|mid713|mid710|mid727|mid760|mid830|mid728|mid933|mid125|mid810|mid732|mid120|mid930|mid800|mid731|mid900|mid100|mid820|mid735|mid980|mid130|mid833|mid737|mid960|mid135|mid860|mid736|mid140|mid930|mid835|mid733|android.*\\b(f-01d|f-05e|f-10d|m532|q572)\\b|android.+casiatab8|android.+hudl|android.*(polaroid.*tablet|pmid1000|pmid10c|pmid800|pmid700|pmid4311|pmid701c|pmid701i|pmid705|pmid706|pmid70dc|pmid70c|pmid720|pmid80c|pmid901|ptab7200|ptab4300|ptab750|midc010|midc407|midc409|midc410|midc497|midc700|midc800|midc801|midc802|midc901)|e-boda.+(supreme|impresspeed|izzycomm|essential)|hp slate 7|hp elitepad 900|hp-tablet|elitebook.*touch|fine7 genius|fine7 shine|fine7 air|fine8 style|fine9 more|fine10 joy|fine11 wide|android.*\\b(n10|n10-4core|n78|n79|n83|n90 ii)\\b|\\b(pem63|plt1023g|plt1041|plt1044|plt1044g|plt1091|plt4311|plt4311pl|plt4315|plt7030|plt7033|plt7033d|plt7035|plt7035d|plt7044k|plt7045k|plt7045kb|plt7071kg|plt7072|plt7223g|plt7225g|plt7777g|plt7810k|plt7849g|plt7851g|plt7852g|plt8015|plt8031|plt8034|plt8036|plt8080k|plt8082|plt8088|plt8223g|plt8234g|plt8235g|plt8816k|plt9011|plt9045k|plt9233g|plt9735|plt9760g|plt9770g)\\b|bq1078|bc1003|bc1077|rk9702|bc9730|bc9001|it9001|bc7008|bc7010|bc708|bc728|bc7012|bc7030|bc7027|bc7026|tpc7102|tpc7103|tpc7105|tpc7106|tpc7107|tpc7201|tpc7203|tpc7205|tpc7210|tpc7708|tpc7709|tpc7712|tpc7110|tpc8101|tpc8103|tpc8105|tpc8106|tpc8203|tpc8205|tpc8503|tpc9106|tpc9701|tpc97101|tpc97103|tpc97105|tpc97106|tpc97111|tpc97113|tpc97203|tpc97603|tpc97809|tpc97205|tpc10101|tpc10103|tpc10106|tpc10111|tpc10203|tpc10205|tpc10503|android.*(roverpad|rp3wg70)|tab-p506|tab-navi-7-3g-m|tab-p517|tab-p-527|tab-p701|tab-p703|tab-p721|tab-p731n|tab-p741|tab-p825|tab-p905|tab-p925|tab-pr945|tab-pl1015|tab-p1025|tab-pi1045|tab-p1325|tab-protab[0-9]+|tab-protab25|tab-protab26|tab-protab27|tab-protab26xl|tab-protab2-ips9|tab-protab30-ips9|tab-protab25xxl|tab-protab26-ips10|tab-protab30-ips10|android.*ov-(steelcore|newbase|basecore|baseone|exellen|quattor|edutab|solution|action|basictab|teddytab|magictab|stream|tb-08|tb-09)|dps dream 9|dps dual 7|v97 hd|i75 3g|visture v4( hd)?|visture v5( hd)?|visture v10|ctp(-)?810|ctp(-)?818|ctp(-)?828|ctp(-)?838|ctp(-)?888|ctp(-)?978|ctp(-)?980|ctp(-)?987|ctp(-)?988|ctp(-)?989|android.*\\b97d\\b|tablet(?!.*pc)|viewpad7|lg-v909|mid7015|bntv250a|logicpd zoom2|\\ba7eb\\b|catnova8|a1_07|ct704|ct1002|\\bm721\\b|rk30sdk|\\bevotab\\b|smarttabii10|smarttab10",d=new RegExp(c,"i"),e=d.test(f),!0){case e:return b||i("rstv_is_tablet",!0),!0}var k=/android/i.test(f),m=!/mobile/i.test(f);switch(!0){case k:switch(!0){case isNumber(j)&&j>=520&&810>=j:return b||(i("rstv_is_tablet",!0),i("rstv_is_phone")&&i("rstv_is_phone",!1)),!0}switch(!0){case m:return b||i("rstv_is_tablet",!0),!0}}return b||i("rstv_is_tablet",!1),!1}function R(){switch(!0){case l("rstv_is_tv"):return i("rstv_is_tv")}var a=D(),b=/googletv|smart\-tv|smarttv|internet +tv|netcast|nettv|appletv|boxee|kylo|roku|vizio|dlnadoc|ce\-html|ouya|xbox|playstation *(3|4)|wii/i.test(a);switch(!0){case b:return i("rstv_is_tv",!0),!0}return i("rstv_is_tv",!1),!1}function S(){switch(!0){case l("rstv_is_pc"):return i("rstv_is_pc")}switch(!0){case T()===!1&&R()===!1:return i("rstv_is_pc",!0),!0}return i("rstv_is_pc",!1),!1}function T(){switch(!0){case P()||Q(!0):return!0;default:return!1}}function U(){switch(!0){case!T():return!0;default:return!1}}function V(){var a,b=Array.prototype.slice.call(arguments),c=isBool(b[0])?b[0]:!1;switch(!0){case l("rstv_ort_curr")&&!c:return i("rstv_ort_curr")}switch(!0){case c:i("rstv_viewportW rstv_viewportW_dip rstv_viewportH rstv_viewportH_dip rstv_screenW rstv_screenH",null)}var d,e,f=D(),g=/opera.+(mini|mobi)/i.test(f),h=t(),j=u(),k=v(),m=w(),n=k/m,o=k-h;switch(o=Math.abs(o),d=g&&260>h?4>=o&&n>=1?!0:!1:!0,e=!!(h>=j&&d),!0){case e:switch(a="landscape",!0){case!c:i("rstv_is_portrait",!1),i("rstv_is_landscape",!0)}break;default:switch(a="portrait",!0){case!c:i("rstv_is_portrait",!0),i("rstv_is_landscape",!1)}}return a}function W(){i("rstv_ort_curr rstv_is_portrait rstv_is_landscape",null),i("rstv_ort_curr",V())}function X(){switch(!0){case l("rstv_is_portrait"):return i("rstv_is_portrait")}return!("portrait"!=V())}function Y(){switch(!0){case l("rstv_is_landscape"):return i("rstv_is_landscape")}return!("landscape"!=V())}function Z(){var a,b,c=Y(),d=v(),e=w(),f=n(c?"h":"w"),g=n(c?"w":"h"),h=getClosestNumberMatchArray(f,d),i=getClosestNumberMatchArray(g,e),j=_();switch(!0){case h>=i:a=i+"_"+h;break;default:a=h+"_"+i}return b=array_search(a,j)}function $(){switch(!0){case l("rstv_is_cache_res_list"):return i("rstv_cache_res_list")}var a=["qqvga","qqvgax1","hqvga","hqvgax1","hqvgax2","hvgax1","qvga","wqvga","wqvga1","hvga","hvga1","hvga2","hvga3","hvgax1","hvgax2","vga","wvga","wvgax1","fwvga","svga","dvga","dvgax1","wsvga","wsvga1","xga","wxga","wxga1","wxga2","wxga3","wxga4","wxga5","xga+","wxga+","sxga","sxga+","wsxga+","uxga","wuxga","qwxga","qxga","wqxga","qsxga","wqsxga","quxga","wquxga","hxga","whxga","hsxga","whsxga","huxga","whuxga","nhd","nhdx1","qhd","hd","720p","fhd","1080p","1080i","wqhd","mbprhd","4kuhd","8kuhd"];return i("rstv_is_cache_res_list",!0),i("rstv_cache_res_list",a),a}function _(){switch(!0){case l("rstv_is_cache_res_matrix"):return i("rstv_cache_res_matrix")}var a={qqvga:"120_160",qqvgax1:"128_160",hqvga:"160_240",hqvgax1:"240_240",hqvgax2:"240_260",qvga:"240_320",wqvga:"240_400",wqvga1:"240_432",hvga:"320_480",hvga1:"360_480",hvga2:"272_480",hvga3:"240_640",hvgax1:"200_640",hvgax2:"300_640",hvgax3:"360_400",vga:"480_640",wvga:"480_800",wvgax1:"352_800",fwvga:"480_854",svga:"600_800",dvga:"640_960",dvgax1:"640_1136",wsvga:"576_1024",wsvga1:"600_1024",xga:"768_1024",wxga:"768_1280",wxga1:"720_1280",wxga2:"800_1280",wxga3:"768_1360",wxga4:"768_1366",wxga5:"720_720","xga+":"864_1152","wxga+":"900_1440",sxga:"1024_1280","sxga+":"1050_1400","wsxga+":"1050_1680",uxga:"1200_1600",wuxga:"1200_1920",qwxga:"1152_2048",qxga:"1536_2048",wqxga:"1600_2560","wqxga+":"1800_3200",qsxga:"2048_2560",wqsxga:"2048_3200",quxga:"2400_3200",wquxga:"2400_3840",hxga:"3072_4096",whxga:"3200_5120",hsxga:"4096_5120",whsxga:"4096_6400",huxga:"4800_6400",whuxga:"4800_7680",nhd:"360_640",nhdx1:"320_640",qhd:"540_960",hd:"720_1280","720p":"720_1280",fhd:"1080_1920","1080p":"1080_1920","1080i":"1080_1920",wqhd:"1440_2560",mbprhd:"1800_2880","4kuhd":"2160_3840","8kuhd":"4320_7680"};return i("rstv_is_cache_res_matrix",!0),i("rstv_cache_res_matrix",a),a}function ab(a,b){try{var c,d,e,f,g,h,i,j=[],k="",l="",m="",n=[],o="",p=[],q="",r=[],s=[],t=[],u=[],v=!1,w=!1,x=0,y="",z=["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","aa","ab","ac","ad","ae","af","ag","ah","ai","aj","ak","al","am","an","ao","ap","aq","ar","as","at","au","av","aw","ax"],A=[],B=[],C=count(a),D=count(b),E=count(j);switch(!0){case!isArray(a):throw new Error("The first argument must be an array!");case isArray(a)&&0==C:throw new Error("The first argument must not be empty!")}switch(!0){case D>0&&E>0:throw new Error("You can only define either 'Classes' or 'Attributes' settings!")}switch(!0){case D>0:switch(v=!0,!0){case D!==C:throw new Error("The number items for 'Breakpoints' and 'Classes' settings must match")}}switch(!0){case E>0:switch(w=!0,!0){case E!==C:throw new Error("The number items for 'Breakpoints' and 'Attributes' settings must match")}}c=$(),d=_();for(var F=0;C>F;F++){switch(e=a[F],y=z[F],!0){case/-+/i.test(e)&&!/^[^-]*-[^-]*$/i.test(e):m+="2"}switch(k="",l="",!0){case substr_count(e,"-p")>0:k="p",l="-p",s.push("p");break;case substr_count(e,"-l")>0:k="l",l="-l",s.push("l");break;default:s.push("x")}switch(f=e.replace(""+l,""),!0){case in_array(f,c):switch(g=d[""+f],u=arrayToInteger(explode("_",g)),o=parseInt(u[0]),q=parseInt(u[1]),h=o,i=q,!0){case"l"==k:h=q,i=o}n[y]=h,p[y]=i,r.push("r");break;case/[0-9]+/i.test(f):n[y]=parseInt(f),p[y]=parseInt(f),r.push("v");break;default:m+="1"}A.push(y),x++}switch(!0){case/[1]+/i.test(m):throw new Error("There are errors in your 'Breakpoints' settings!");case/[2]+/i.test(m):throw new Error("There are errors in your 'Breakpoints' settings with regard to the way you have defined orientation markers e.g. -p or -l!")}var G,H,I=function(a,b){return a==b?0:b>a?-1:1},J=[],K=[],L=[],M=[],N=[],O=[],P=[];O=j,J=uasort(n,I),B=array_keys(J);for(var Q=count(J),F=0;Q>F;F++)G=B[F],H=array_search(G,A),K[G]=p[G],L[F]=r[H],M[F]=s[H],N[F]=b[H],P[F]=O[H];switch(t.bp_w=implode("|",J),t.bp_h=implode("|",K),t.bp_o=implode("|",M),t.bp_t=implode("|",L),!0){case v:var R=implode("|",N);t.bp_c=R}switch(!0){case w:var S=implode("|",P);t.bp_a=S}return t}catch(T){var U="There was an error: "+T.message;alert(U)}}function bb(a,b){var c=[];return c=ab(a,b)}function cb(){var b=Array.prototype.slice.call(arguments),d=isNumber(b[0])?"_"+b[0]:"",f=function(){var b=i("rstv_viewportW"),f=i("rstv_viewportH");e();var g,h,j,k,l,m,n,o,p=T(),q=V(!0),r=i("rstv_ort_curr"),s=!1;switch(z(),!0){case p:switch(g=i("rstv_viewportW"),h=i("rstv_viewportH"),j=g-b,m=h-f,k=Math.abs(j),n=Math.abs(m),l=k/b*100,o=n/f*100,!0){case 1>l:switch(!0){case o>35&&0>m:s=!0;break;case o>35&&m>0:s=!0;break;case o>12&&35>=o&&m>0:s=!0;break;case 0==o:s=!0}}}switch(!0){case!s:switch(!0){case r!==q:W(),c(a).trigger("change_orientation"+d);break;default:switch(!0){case!p:c(a).trigger("resize_viewport"+d)}}}};eb(f)}function db(b){var d=Array.prototype.slice.call(arguments),e=isNumber(d[1])?"_"+d[1]:"",f=function(){c(a).trigger("resize_container"+e)};fb(b,f)}function eb(a){return rb.on("resize",a),gb}function fb(a,b){return a.on("resizecontainer",b),gb}switch(!0){case"function"!=typeof c:throw"Restive.JS requires JQuery to run!"}var gb,hb,ib,jb,kb,lb,mb,nb,ob,pb=a,qb=b.documentElement,rb=c(pb),sb=pb.screen,tb=pb.matchMedia||pb.msMatchMedia||Object;a.rstv_store={main:{}},a.parent.rstv_store={main:{}},a.rstv_store.storage=function(){var b=Array.prototype.slice.call(arguments),c=b[0],d=b[1],e=!("undefined"==typeof d||null===d||!(isString(d)&&""!=d||isNumber(d)||isArray(d)&&count(d)>0||isBool(d)||isObject(d))),f=!(null!==d);switch(!0){case e:return void(a.rstv_store.main[""+c]=d);case f:return void(a.rstv_store.main[""+c]=null);default:return a.rstv_store.main[""+c]}};var ub=function(){a.rstv_store.main.rstv_is_priv_browsing=!!h();var b,c=i("rstv_is_init");switch(!0){case c:i("rstv_timestamp_curr",microtime(!0)),i("rstv_url",getUrl("bp")),f(),g(),e(),z(),W(),b=!1;break;default:i("rstv_timestamp_curr",microtime(!0)),i("rstv_timestamp_init",i("rstv_timestamp_curr")),i("rstv_loaded_count",0,"",{expires:1500}),i("rstv_is_init",!0),i("rstv_url",getUrl("bp")),i("rstv_url_hash",md5(getUrl("bp"))),e(),z(),i("rstv_ort_init",V()),i("rstv_ort_curr",V()),f(),b=!0}return b};return hb=C(t),ib=C(u),lb=C(v),mb=C(w),jb=C(x),kb=C(y),nb=C(r),ob=C(s),gb={init:ub(),reInit:d,getUserAgent:D,isStorageValueSet:l,store:i,storeVarTracker:j,storeVarValidator:k,incrementStorageValue:m,getBreakpoints:bb,viewportW:t,viewportH:u,screenW:v,screenH:w,pixelW:x,pixelH:y,vSpan:hb,vPitch:ib,dSpan:lb,dPitch:mb,cSpan:jb,cPitch:kb,eSpan:nb,ePitch:ob,isRetina:B,getPixelRatio:A,getPlatform:E,getFormFactor:O,getOrientation:V,getResolution:Z,isPortrait:X,isLandscape:Y,viewportMonitor:cb,containerMonitor:db,isMobile:T,isNonMobile:U,isPhone:P,isTablet:Q,isPC:S,isTV:R,isIOS:G,isApple:H,isAndroid:I,isSymbian:J,isBlackberry:K,isWindows:L,isWindowsPhone:M,resize:eb,resizeContainer:fb}}(window,document,jQuery);!function(a,b,c){Function.prototype.getFuncBody=function(){var a=this.toString().match(/\{([\s\S]*)\}/m)[1];return a.replace(/^\s*\/\/.*$/gm,"")};var d={init:function(b){try{d._multiConstructorCounter(),d._multiConstructorManager();var e,f,g=b,h=["all","ios","android","symbian","blackberry","windows"],i=["all","pc","tv","tablet","phone"],j=b.platform,k=b.formfactor,l=Restive.store("rstv_multi_start"),m=Restive.store("rstv_multi_count"),n=Restive.store("rstv_multi_abort_2");switch(!0){case in_array(j,h)===!1:return d._error("rstv_error_001",'"'+j+'" is not a valid Platform option!'),!1}switch(!0){case in_array(k,i)===!1:return d._error("rstv_error_002",'"'+k+'" is not a valid Form Factor option!'),!1}switch(!0){case n:return d._error("rstv_error_003","If you are calling the Restive.JS Constructor more than once, you must call $.restive.endMulti() at the end!"),!1}var o=[],p=[],q=[];p=b.breakpoints,q=b.classes,o=d.getBreakpoints(p,q);var r=[];switch(r.platform=d.getPlatform(),r.formfactor=d.getFormFactor(),r.is_mobile=d.isMobile(),r.pixelratio=d.getPixelRatio(),r.orientation=d.getOrientation(),r.selector=getSelector(this),r.tagname=this.prop("tagName").toLowerCase(),e=d._responsiveBasis(g,r),f=!("c"!=e),r.is_resp_basis_container=f,!0){case f:d._containerMonitor(o,this,g,r);
break;default:switch(!0){case!l:d._viewportMonitor(o,this,g,r),d._callbackManager(g,["ready","init"]);break;default:a.parent.rstv_store.main["rstv_breakpoints_"+m]=o,a.parent.rstv_store.main["rstv_this_"+m]=this,a.parent.rstv_store.main["rstv_options_"+m]=g,a.parent.rstv_store.main["rstv_core_info_"+m]=r,a.rstv_store.main=a.parent.rstv_store.main}}return Restive.store("rstv_turbo_classes_reflow_status_in",null),this.each(function(){var a=c(this);d.setBreakpoints(o,a,g,r)})}catch(s){alert(s),console.log(s)}},_error:function(a,b){var c=!("true"!==String(Restive.store(a+"_init")).toLowerCase());switch(!0){case!c:throw Restive.store(a+"_init",!0),new Error(b)}},_callbackManager:function(){var a,b,e=Array.prototype.slice.call(arguments),f=e[0],g=e[1];switch(!0){case in_array("ready",g):var h=f.onReady,i=f.onReady.getFuncBody().length;switch(!0){case c.isFunction(h)&&i>0:h()}}switch(!0){case in_array("resize",g):var j=f.onResize,k=f.onResize.getFuncBody().length;switch(!0){case c.isFunction(j)&&k>0:j()}}switch(!0){case in_array("turboclassesreflow",g):var l=g[1],m=f.onTurboClassReflow,n=f.onTurboClassReflow.getFuncBody().length;switch(!0){case c.isFunction(m)&&n>0:m()}var o=f.onTurboClassReflowIn,p=f.onTurboClassReflowIn.getFuncBody().length;switch(!0){case c.isFunction(o)&&p>0:switch(!0){case"in"==l:o()}}var q=f.onTurboClassReflowOut,r=f.onTurboClassReflowOut.getFuncBody().length;switch(!0){case c.isFunction(q)&&r>0:switch(!0){case"out"==l:q()}}}switch(!0){case in_array("rotate",g):var s=Restive.getOrientation(),t=f.onRotate,u=f.onRotate.getFuncBody().length;switch(!0){case c.isFunction(t)&&u>0:t()}var v=f.onRotateToP,w=f.onRotateToP.getFuncBody().length;switch(!0){case c.isFunction(v)&&w>0:switch(!0){case"portrait"==s:v()}}var x=f.onRotateToL,y=f.onRotateToL.getFuncBody().length;switch(!0){case c.isFunction(x)&&y>0:switch(!0){case"landscape"==s:x()}}}switch(!0){case in_array("addclass",g)||in_array("removeclass",g):var z=g[0],A=g[1],B={addclass:"onAddClass",removeclass:"onRemoveClass"};switch(a=f[B[""+z]],b=a.getFuncBody().length,!0){case c.isFunction(a)&&b>0:a(A)}}switch(!0){case in_array("init",g):switch(!0){case in_array("init",g):for(var C=["onPortrait","onLandscape","onRetina","onPhone","onTablet","onPC","onTV","onIOS","onAndroid","onSymbian","onBlackberry","onWindows","onWindowsPhone","onMobile","onNonMobile"],D=["isPortrait","isLandscape","isRetina","isPhone","isTablet","isPC","isTV","isIOS","isAndroid","isSymbian","isBlackberry","isWindows","isWindowsPhone","isMobile","isNonMobile"],E=0;E<count(D);E++)switch(a=f[C[E]],b=a.getFuncBody().length,!0){case c.isFunction(a)&&b>0:var F=d[D[E]],G=F();switch(!0){case G:a()}}}}},_URLMonitor:function(){var a=Restive.store("rstv_url"),b=Restive.store("rstv_url_hash"),c=md5(a);switch(!0){case c!=b:Restive.store("rstv_multi_bpm_idx rstv_cache_bpm rstv_cache_bpm_lock rstv_cache_req rstv_cache_bpm_viewport_diff",null),Restive.store("rstv_url_hash",c)}},_responsiveBasis:function(a,b){var c,d=b.selector,e=/^#[^\s]+$/i.test(d),f=elementIsChildOf("body",d),g=a.anchor;try{switch(!0){case f&&("element"==g||"e"==g):switch(!0){case!e:throw new Error("You must use only the JQuery ID selector when the 'anchor' option is set to 'e' or 'element'!")}c="c";break;default:c="v",Restive.store("rstv_resp_basis_viewport_init",!0)}return c}catch(h){alert(h),console.log(h)}},_viewportMonitor:function(b,e,f,g){var h="resize_viewport",i="change_orientation";c(a).on(h,function(){d._onResizeViewport(b,e,f,g)}),c(a).on(i,function(){d._onChangeOrientation(b,e,f,g)}),Restive.viewportMonitor()},_containerMonitor:function(a,b,c,e){var f="resizecontainer";b.on(f,function(){d._onResizeContainer(a,b,c,e)})},_onResizeViewport:function(a,b,e,f){try{return b.each(function(){var b=c(this);d.setBreakpoints(a,b,e,f,"rv"),d._callbackManager(e,["resize"])})}catch(g){alert(g),console.log(g)}},_onResizeContainer:function(a,b,e,f){try{return b.each(function(){var b=c(this);d.setBreakpoints(a,b,e,f,"rc")})}catch(g){alert(g),console.log(g)}},_onChangeOrientation:function(a,b,e,f){try{return b.each(function(){var b=c(this);d.setBreakpoints(a,b,e,f,"co"),d._callbackManager(e,["rotate"])})}catch(g){alert(g),console.log(g)}},getBreakpoints:function(a,b){return Restive.getBreakpoints(a,b)},setBreakpoints:function(){var a=Array.prototype.slice.call(arguments),b=a[0],c=a[1],e=a[2],f=a[3],g=a[4],h=!1,i=!1,j=!1,k=f.is_resp_basis_container,l=Restive.store("rstv_multi_abort_1");switch(!0){case"co"==g:h=!0}switch(!0){case"rv"==g:i=!0}switch(!0){case"rc"==g:j=!0}switch(!0){case l:return d._error("rstv_error_004","If you are calling the Restive.JS Constructor more than once, you must call $.restive.startMulti() before calling these constructors!"),!1}var m=Restive.store("rstv_multi_start"),n=parseInt(Restive.store("rstv_multi_count")),o=parseInt(Restive.store("rstv_multi_bpm_idx")),p=Restive.store("rstv_cache_bpm_lock");switch(!0){case!k:switch(!0){case m&&!h&&p:switch(!0){case isNumber(n)&&isNumber(o)&&n!=o:return!1}}}var q,r,s,t,u,v,w,x=(Restive.getUserAgent(),e.platform,e.formfactor,e.force_dip),y=f.platform,z=f.formfactor,A=(f.pixelratio,1==f.is_mobile?"true":"false",Restive.store("rstv_ort_init"),Restive.store("rstv_ort_curr"),Restive.isPortrait()),B=A===!0?!1:!0,C=[],D=!1,E=b.bp_w,F=b.bp_h,G=b.bp_o,H=b.bp_t,I=b.bp_c,J=[],K=[],L=[],M=[];switch(q=Restive.viewportW(),w=q,r=Restive.viewportH(),s=Restive.screenW(),t=Restive.screenH(),u=Restive.pixelW(),v=Restive.pixelH(),!0){case 1==x:w=Restive.pixelW()}switch(J=arrayToInteger(explode("|",E)),K=arrayToInteger(explode("|",F)),L=explode("|",G),M=explode("|",H),!0){case"undefined"!=typeof I||null!=I:D=!0,C=explode("|",I)}var N,O,P,Q,R,S,T,U,V,W,X,Y,Z,$,_,ab,bb,cb,db,eb,fb="",gb=!0,hb=!0,ib=!1,jb=!1,kb=!1,lb=!0,mb=!0,nb="",ob=count(J);N=arrayHasDuplicates(J),O=N?!1:!0;for(var pb=0;ob>pb;pb++){switch(!0){case"all"!=e.platform&&e.platform!=y:lb=!1}switch(!0){case"all"!=e.formfactor&&e.formfactor!=z:mb=!1}if(!lb||!mb)break;var qb=pb-1;switch(P=J[pb],!0){case pb>0:Q=J[qb];break;default:Q=0,R=0}switch(V=K[pb],$=M[pb],_=L[pb],hb=gb,!0){case"p"==_:db=A?!0:!1,ib=!0,gb=db,fb=hb===!1?R:fb;break;case"l"==_:db=B?!0:!1,ib=!0,gb=db,fb=hb===!1?R:fb;break;default:fb=ib===!0&&hb===!1?R:fb,R=pb>0?P:0,db=!0,gb=db}switch(!0){case 0==pb:S=0,fb=P;break;case pb>=1:switch(!0){case P!==Q:fb=P+"-!"+fb}S=parseInt(getValueAfterExplode(fb,"-!",1))}switch(ab=C[pb],!0){case 0==pb:T=S,U=P;break;default:T=0==S?S:S+1,U=P}switch(!0){case k:cb=Restive.eSpan(T,U,c,e.anchor_e_df,e.force_dip);break;default:cb=1==x?Restive.cSpan(T,U):Restive.vSpan(T,U)}switch(!0){case cb&&db:switch(!0){case k:jb=!0;break;default:switch(W=U-w,X=Math.abs(W),Y=w-T,Z=.1*U,Z=Math.round(Z),!0){case h:switch(!0){case W>Z:nb="4";break;default:nb="2"}break;default:switch(!0){case W>Z:nb="3";break;default:nb="1"}}switch(jb=!0,!0){case jb:switch(kb=!0,bb=ab,!0){case"x"!=_:O=!0}}}break;default:jb=!1}if(jb&&O)break}switch(!0){case kb:jb=!0,ab=bb}switch(!0){case!jb:switch(!0){case k:return void d.unsetElementDOM(c,e)}switch(T=0,U=0,!0){case!Restive.store("rstv_multi_start")||h:d.unsetElementDOM(c,e)}switch(!0){case!lb&&mb:nb="7";break;case!mb&&lb:nb="8";break;case!mb&&!lb:nb="9";break;default:switch(!0){case h:nb="6";break;default:nb="5"}}switch(eb=d._addTurboClasses("",e.turbo_classes),eb=d._addTurboClassesReflow(eb,e),!0){case!Restive.store("rstv_multi_start")||h:d.setElementDOM(c,eb,e)}Restive.store("rstv_breakpoint_match_curr",!1);break;case jb:switch(eb=d._addTurboClasses(ab,e.turbo_classes),eb=d._addTurboClassesReflow(eb,e),!0){case k:return void d.setElementDOM(c,eb,e)}switch(!0){case Restive.store("rstv_multi_start"):var rb=parseInt(Restive.store("rstv_bpm_h_counter"));switch(!0){case h:d.setElementDOM(c,eb,e);break;default:switch(!0){case rb>1:var sb=parseInt(Restive.store("rstv_cache_bpm_viewport_diff"));switch(!0){case sb>X:switch(d.setElementDOM(c,eb,e),!0){case!p:Restive.store("rstv_multi_bpm_idx",n)}Restive.store("rstv_cache_bpm_viewport_diff",X)}break;default:switch(d.setElementDOM(c,eb,e),!0){case!p:Restive.store("rstv_multi_bpm_idx",n)}Restive.store("rstv_cache_bpm_viewport_diff",X)}rb++,Restive.store("rstv_bpm_h_counter",rb,"",{expires:1e3})}break;default:d.setElementDOM(c,eb,e)}Restive.store("rstv_breakpoint_match_curr",!0)}var tb=Restive.store("rstv_cache_bpm_lock");switch(!0){case m&&!h&&!(isString(tb)&&""!=tb||isBool(tb)):Restive.store("rstv_breakpoint_match_curr")?d._extVarTracker("rstv_cache_bpm","h","ls",!1,"",!1):d._extVarTracker("rstv_cache_bpm","m","ls",!1,"",!1)}switch(!0){case jb:return!0}return!1},_addTurboClassesReflow:function(a,b){switch(!0){case d.isPC():switch(!0){case b.turbo_classes_reflow&&isString(b.turbo_classes)&&""!=b.turbo_classes:var c,e,f,g,h,i,j,k,l,m=[],n=[],o=a,p=!1,q=Restive.store("rstv_turbo_classes_reflow_status_in");switch(m=explode(",",b.turbo_classes_reflow_limits),i=parseInt(m[0]),h=parseInt(m[1]),c=/is_mobile=/i.test(b.turbo_classes),!0){case c:n=explode(",",b.turbo_classes);for(var r=0;r<count(n);r++){switch(k=getValueAfterExplode(n[r],"=",0),l=getValueAfterExplode(n[r],"=",1),!0){case"is_mobile"==k:switch(e=1==b.force_dip?Restive.cSpan(0,h):Restive.vSpan(0,h),!0){case e:switch(o+=" "+l,p=!0,!0){case!q&&p:Restive.store("rstv_turbo_classes_reflow_status_in",!0),d._callbackManager(b,["turboclassesreflow","in"])}break;default:switch(p=!1,!0){case q&&!p:Restive.store("rstv_turbo_classes_reflow_status_in",!1),d._callbackManager(b,["turboclassesreflow","out"])}}}switch(!0){case"is_phone"==k:f=1==b.force_dip?Restive.cSpan(0,i):Restive.vSpan(0,i),o=f?o+" "+l:o}switch(!0){case"is_tablet"==k:j=i+1,g=1==b.force_dip?Restive.cSpan(j,h):Restive.vSpan(j,h),o=g?o+" "+l:o}}return o}}}return a},_addTurboClasses:function(a,b){switch(!0){case!isString(b)||""==b:return a}var c,e,f,g,h=[],i=[],j="",k="",l={is_mobile:"isMobile",is_non_mobile:"isNonMobile",is_retina:"isRetina",is_phone:"isPhone",is_tablet:"isTablet",is_tv:"isTV",is_pc:"isPC",is_portrait:"isPortrait",is_landscape:"isLandscape"};h=explode(",",b);for(var m=0;m<count(h);m++)switch(c=getValueAfterExplode(h[m],"=",0),e=getValueAfterExplode(h[m],"=",1),f=l[c],!0){case isString(f)&&""!=f:switch(g=d[f],!0){case g():i.push(e)}}return j=implode(" ",i,!0),k=""!=j?j+" "+a:a},setElementDOM:function(a,b,c){var e,f=md5(getSelector(a)),g="rstv_bpm_class_"+f;switch(e=isString(Restive.store(g))&&""!=Restive.store(g)?Restive.store(g):"",!0){case""!=e:switch(a.removeClass(e).addClass(b),!0){case e!=b:d._callbackManager(c,["removeclass",""+e])}break;default:a.addClass(b)}Restive.store(g,b),d._callbackManager(c,["addclass",""+b])},unsetElementDOM:function(a,b){var c,e=md5(getSelector(a)),f="rstv_bpm_class_"+e;c=isString(Restive.store(f))&&""!=Restive.store(f)?Restive.store(f):"",a.removeClass(c),d._callbackManager(b,["removeclass",""+c])},_extVarTracker:function(a,b){var c=Array.prototype.slice.call(arguments),d=isString(c[2])&&""!=c[2]?c[2]:"ck",e=isBool(c[3])?c[3]:!1,f=isNumber(c[4])||isString(c[4])?parseInt(c[4]):"",g=isBool(c[5])?c[5]:!0,h=isString(c[6])&&""!=c[6]?c[6]:"-!",i=isNumber(c[7])||isString(c[7])?parseInt(c[7]):80;return Restive.storeVarTracker(a,b,d,e,f,g,h,i)},_multiConstructorSelectPos:function(){var a,b=Restive.store("rstv_cache_bpm"),c=explode("-!",b),d=parseInt(Restive.store("rstv_multi_bpm_idx"));a=implode("",c);var e,f,g=new RegExp("^[^h]*h[^h]*$","gi"),h=new RegExp("^m+$","gi");switch(!0){case g.test(a):e=strrpos(a,"h");break;case h.test(a):Restive.store("rstv_cache_bpm_all_miss",!0,"",{expires:2e3}),e=strrpos(a,"m");break;case substr_count(a,"h")>1:e=d-1}return f=e+1,Restive.store("rstv_multi_bpm_idx",f),e},_multiConstructorManageEvents:function(b){c(a).off("resize");var e=parseInt(b)+1,f=a.parent.rstv_store.main["rstv_breakpoints_"+e],g=a.parent.rstv_store.main["rstv_this_"+e],h=a.parent.rstv_store.main["rstv_options_"+e],i=a.parent.rstv_store.main["rstv_core_info_"+e];switch(!0){case Restive.store("rstv_resp_basis_viewport_init"):d._viewportMonitor(f,g,h,i),d._callbackManager(h,["ready","init"])}},_multiConstructorFinalize:function(){var a=d._multiConstructorSelectPos();d._multiConstructorManageEvents(a),Restive.store("rstv_cache_bpm_lock",!0),Restive.store("rstv_cache_req",null),Restive.store("rstv_multi_count",null)},_multiConstructorStart:function(){switch(Restive.store("rstv_multi_count",0),Restive.store("rstv_multi_start",!0),Restive.store("rstv_multi_abort_1",!1),Restive.store("rstv_multi_abort_2",!1),Restive.store("rstv_bpm_h_counter",1,"",{expires:1e3}),Restive.store("rstv_bpm_m_counter",1,"",{expires:1e3}),!0){case!Restive.isStorageValueSet("rstv_multi_start_count"):Restive.store("rstv_multi_start_count",1),Restive.store("rstv_multi_end",!1);break;default:Restive.incrementStorageValue("rstv_multi_start_count")}},_multiConstructorManager:function(){var a=Restive.store("rstv_multi_start"),b=Restive.store("rstv_multi_end"),c=parseInt(Restive.store("rstv_multi_count")),e=parseInt(Restive.store("rstv_multi_start_count"));switch(!0){case c>1:switch(!0){case a===!1:Restive.store("rstv_multi_abort_1",!0)}}switch(!0){case e>1&&b===!1:Restive.store("rstv_multi_abort_2",!0)}d._URLMonitor()},_multiConstructorCounter:function(){Restive.incrementStorageValue("rstv_multi_count")},_multiConstructorEnd:function(){Restive.store("rstv_multi_start_count",0),Restive.store("rstv_multi_end",!0),d._multiConstructorFinalize()},getUserAgent:function(){return Restive.getUserAgent()},getPlatform:function(){return Restive.getPlatform()},getFormFactor:function(){return Restive.getFormFactor()},getOrientation:function(){return Restive.getOrientation()},getResolution:function(){return Restive.getResolution()},getPixelRatio:function(a){return Restive.getPixelRatio(a)},getViewportW:function(){return Restive.viewportW()},getViewportH:function(){return Restive.viewportH()},getScreenW:function(){return Restive.screenW()},getScreenH:function(){return Restive.screenH()},getPixelW:function(){return Restive.pixelW()},getPixelH:function(){return Restive.pixelH()},isRetina:function(){return Restive.isRetina()},isMobile:function(){return Restive.isMobile()},isNonMobile:function(){return Restive.isNonMobile()},isPhone:function(){return Restive.isPhone()},isTablet:function(){return Restive.isTablet()},isTV:function(){return Restive.isTV()},isPC:function(){return Restive.isPC()},isIOS:function(){return Restive.isIOS()},isApple:function(){return Restive.isApple()},isAndroid:function(){return Restive.isAndroid()},isSymbian:function(){return Restive.isSymbian()},isBlackberry:function(){return Restive.isBlackberry()},isWindows:function(){return Restive.isWindows()},isWindowsPhone:function(){return Restive.isWindowsPhone()},isPortrait:function(){return Restive.isPortrait()},isLandscape:function(){return Restive.isLandscape()}};c.fn.restive=function(a){if(d[a])return d[a].apply(this,Array.prototype.slice.call(arguments,1));if("object"==typeof a||!a){var b=c.extend({},c.fn.restive.defaults,a),e=new Array(b);return d.init.apply(this,e)}c.error("Method "+a+" does not exist on Restive.JS")},c.fn.restive.defaults={breakpoints:[],classes:[],anchor:"window",anchor_e_df:"w",platform:"all",formfactor:"all",turbo_classes:"",turbo_classes_reflow:!1,turbo_classes_reflow_limits:"480,960",force_dip:!1,onReady:function(){},onResize:function(){},onRotate:function(){},onRotateToP:function(){},onRotateToL:function(){},onPortrait:function(){},onLandscape:function(){},onRetina:function(){},onPhone:function(){},onTablet:function(){},onPC:function(){},onTV:function(){},onIOS:function(){},onAndroid:function(){},onSymbian:function(){},onBlackberry:function(){},onWindows:function(){},onWindowsPhone:function(){},onMobile:function(){},onNonMobile:function(){},onTurboClassReflow:function(){},onTurboClassReflowIn:function(){},onTurboClassReflowOut:function(){},onAddClass:function(){},onRemoveClass:function(){}};var e=c.restive=function(){};c.extend(e,{getUserAgent:function(){return d.getUserAgent()},getPlatform:function(){return d.getPlatform()},getFormFactor:function(){return d.getFormFactor()},getOrientation:function(){return d.getOrientation()},getResolution:function(){return d.getResolution()},getPixelRatio:function(a){return d.getPixelRatio(a)},getViewportW:function(){return d.getViewportW()},getViewportH:function(){return d.getViewportH()},getScreenW:function(){return d.getScreenW()},getScreenH:function(){return d.getScreenH()},getPixelW:function(){return d.getPixelW()},getPixelH:function(){return d.getPixelH()},isRetina:function(){return d.isRetina()},isMobile:function(){return d.isMobile()},isNonMobile:function(){return d.isNonMobile()},isPhone:function(){return d.isPhone()},isTablet:function(){return d.isTablet()},isTV:function(){return d.isTV()},isPC:function(){return d.isPC()},isIOS:function(){return d.isIOS()},isApple:function(){return d.isIOS()},isAndroid:function(){return d.isAndroid()},isSymbian:function(){return d.isSymbian()},isBlackberry:function(){return d.isBlackberry()},isWindows:function(){return d.isWindows()},isWindowsPhone:function(){return d.isWindowsPhone()},isPortrait:function(){return d.isPortrait()},isLandscape:function(){return d.isLandscape()},startMulti:function(){d._multiConstructorStart()},endMulti:function(){d._multiConstructorEnd()}})}(window,document,jQuery);
define("restive", ["jquery"], function(){});

/* Modernizr 2.8.3 (Custom Build) | MIT & BSD
 * Build: http://modernizr.com/download/#-fontface-backgroundsize-borderimage-borderradius-boxshadow-flexbox-hsla-multiplebgs-opacity-rgba-textshadow-cssanimations-csscolumns-generatedcontent-cssgradients-cssreflections-csstransforms-csstransforms3d-csstransitions-applicationcache-canvas-canvastext-draganddrop-hashchange-history-audio-video-indexeddb-input-inputtypes-localstorage-postmessage-sessionstorage-websockets-websqldatabase-webworkers-geolocation-inlinesvg-smil-svg-svgclippaths-touch-webgl-shiv-mq-cssclasses-addtest-prefixed-teststyles-testprop-testallprops-hasevent-prefixes-domprefixes-load
 */
;window.Modernizr=function(a,b,c){function D(a){j.cssText=a}function E(a,b){return D(n.join(a+";")+(b||""))}function F(a,b){return typeof a===b}function G(a,b){return!!~(""+a).indexOf(b)}function H(a,b){for(var d in a){var e=a[d];if(!G(e,"-")&&j[e]!==c)return b=="pfx"?e:!0}return!1}function I(a,b,d){for(var e in a){var f=b[a[e]];if(f!==c)return d===!1?a[e]:F(f,"function")?f.bind(d||b):f}return!1}function J(a,b,c){var d=a.charAt(0).toUpperCase()+a.slice(1),e=(a+" "+p.join(d+" ")+d).split(" ");return F(b,"string")||F(b,"undefined")?H(e,b):(e=(a+" "+q.join(d+" ")+d).split(" "),I(e,b,c))}function K(){e.input=function(c){for(var d=0,e=c.length;d<e;d++)u[c[d]]=c[d]in k;return u.list&&(u.list=!!b.createElement("datalist")&&!!a.HTMLDataListElement),u}("autocomplete autofocus list placeholder max min multiple pattern required step".split(" ")),e.inputtypes=function(a){for(var d=0,e,f,h,i=a.length;d<i;d++)k.setAttribute("type",f=a[d]),e=k.type!=="text",e&&(k.value=l,k.style.cssText="position:absolute;visibility:hidden;",/^range$/.test(f)&&k.style.WebkitAppearance!==c?(g.appendChild(k),h=b.defaultView,e=h.getComputedStyle&&h.getComputedStyle(k,null).WebkitAppearance!=="textfield"&&k.offsetHeight!==0,g.removeChild(k)):/^(search|tel)$/.test(f)||(/^(url|email)$/.test(f)?e=k.checkValidity&&k.checkValidity()===!1:e=k.value!=l)),t[a[d]]=!!e;return t}("search tel url email datetime date month week time datetime-local number range color".split(" "))}var d="2.8.3",e={},f=!0,g=b.documentElement,h="modernizr",i=b.createElement(h),j=i.style,k=b.createElement("input"),l=":)",m={}.toString,n=" -webkit- -moz- -o- -ms- ".split(" "),o="Webkit Moz O ms",p=o.split(" "),q=o.toLowerCase().split(" "),r={svg:"http://www.w3.org/2000/svg"},s={},t={},u={},v=[],w=v.slice,x,y=function(a,c,d,e){var f,i,j,k,l=b.createElement("div"),m=b.body,n=m||b.createElement("body");if(parseInt(d,10))while(d--)j=b.createElement("div"),j.id=e?e[d]:h+(d+1),l.appendChild(j);return f=["&#173;",'<style id="s',h,'">',a,"</style>"].join(""),l.id=h,(m?l:n).innerHTML+=f,n.appendChild(l),m||(n.style.background="",n.style.overflow="hidden",k=g.style.overflow,g.style.overflow="hidden",g.appendChild(n)),i=c(l,a),m?l.parentNode.removeChild(l):(n.parentNode.removeChild(n),g.style.overflow=k),!!i},z=function(b){var c=a.matchMedia||a.msMatchMedia;if(c)return c(b)&&c(b).matches||!1;var d;return y("@media "+b+" { #"+h+" { position: absolute; } }",function(b){d=(a.getComputedStyle?getComputedStyle(b,null):b.currentStyle)["position"]=="absolute"}),d},A=function(){function d(d,e){e=e||b.createElement(a[d]||"div"),d="on"+d;var f=d in e;return f||(e.setAttribute||(e=b.createElement("div")),e.setAttribute&&e.removeAttribute&&(e.setAttribute(d,""),f=F(e[d],"function"),F(e[d],"undefined")||(e[d]=c),e.removeAttribute(d))),e=null,f}var a={select:"input",change:"input",submit:"form",reset:"form",error:"img",load:"img",abort:"img"};return d}(),B={}.hasOwnProperty,C;!F(B,"undefined")&&!F(B.call,"undefined")?C=function(a,b){return B.call(a,b)}:C=function(a,b){return b in a&&F(a.constructor.prototype[b],"undefined")},Function.prototype.bind||(Function.prototype.bind=function(b){var c=this;if(typeof c!="function")throw new TypeError;var d=w.call(arguments,1),e=function(){if(this instanceof e){var a=function(){};a.prototype=c.prototype;var f=new a,g=c.apply(f,d.concat(w.call(arguments)));return Object(g)===g?g:f}return c.apply(b,d.concat(w.call(arguments)))};return e}),s.flexbox=function(){return J("flexWrap")},s.canvas=function(){var a=b.createElement("canvas");return!!a.getContext&&!!a.getContext("2d")},s.canvastext=function(){return!!e.canvas&&!!F(b.createElement("canvas").getContext("2d").fillText,"function")},s.webgl=function(){return!!a.WebGLRenderingContext},s.touch=function(){var c;return"ontouchstart"in a||a.DocumentTouch&&b instanceof DocumentTouch?c=!0:y(["@media (",n.join("touch-enabled),("),h,")","{#modernizr{top:9px;position:absolute}}"].join(""),function(a){c=a.offsetTop===9}),c},s.geolocation=function(){return"geolocation"in navigator},s.postmessage=function(){return!!a.postMessage},s.websqldatabase=function(){return!!a.openDatabase},s.indexedDB=function(){return!!J("indexedDB",a)},s.hashchange=function(){return A("hashchange",a)&&(b.documentMode===c||b.documentMode>7)},s.history=function(){return!!a.history&&!!history.pushState},s.draganddrop=function(){var a=b.createElement("div");return"draggable"in a||"ondragstart"in a&&"ondrop"in a},s.websockets=function(){return"WebSocket"in a||"MozWebSocket"in a},s.rgba=function(){return D("background-color:rgba(150,255,150,.5)"),G(j.backgroundColor,"rgba")},s.hsla=function(){return D("background-color:hsla(120,40%,100%,.5)"),G(j.backgroundColor,"rgba")||G(j.backgroundColor,"hsla")},s.multiplebgs=function(){return D("background:url(https://),url(https://),red url(https://)"),/(url\s*\(.*?){3}/.test(j.background)},s.backgroundsize=function(){return J("backgroundSize")},s.borderimage=function(){return J("borderImage")},s.borderradius=function(){return J("borderRadius")},s.boxshadow=function(){return J("boxShadow")},s.textshadow=function(){return b.createElement("div").style.textShadow===""},s.opacity=function(){return E("opacity:.55"),/^0.55$/.test(j.opacity)},s.cssanimations=function(){return J("animationName")},s.csscolumns=function(){return J("columnCount")},s.cssgradients=function(){var a="background-image:",b="gradient(linear,left top,right bottom,from(#9f9),to(white));",c="linear-gradient(left top,#9f9, white);";return D((a+"-webkit- ".split(" ").join(b+a)+n.join(c+a)).slice(0,-a.length)),G(j.backgroundImage,"gradient")},s.cssreflections=function(){return J("boxReflect")},s.csstransforms=function(){return!!J("transform")},s.csstransforms3d=function(){var a=!!J("perspective");return a&&"webkitPerspective"in g.style&&y("@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}",function(b,c){a=b.offsetLeft===9&&b.offsetHeight===3}),a},s.csstransitions=function(){return J("transition")},s.fontface=function(){var a;return y('@font-face {font-family:"font";src:url("https://")}',function(c,d){var e=b.getElementById("smodernizr"),f=e.sheet||e.styleSheet,g=f?f.cssRules&&f.cssRules[0]?f.cssRules[0].cssText:f.cssText||"":"";a=/src/i.test(g)&&g.indexOf(d.split(" ")[0])===0}),a},s.generatedcontent=function(){var a;return y(["#",h,"{font:0/0 a}#",h,':after{content:"',l,'";visibility:hidden;font:3px/1 a}'].join(""),function(b){a=b.offsetHeight>=3}),a},s.video=function(){var a=b.createElement("video"),c=!1;try{if(c=!!a.canPlayType)c=new Boolean(c),c.ogg=a.canPlayType('video/ogg; codecs="theora"').replace(/^no$/,""),c.h264=a.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/,""),c.webm=a.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/,"")}catch(d){}return c},s.audio=function(){var a=b.createElement("audio"),c=!1;try{if(c=!!a.canPlayType)c=new Boolean(c),c.ogg=a.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,""),c.mp3=a.canPlayType("audio/mpeg;").replace(/^no$/,""),c.wav=a.canPlayType('audio/wav; codecs="1"').replace(/^no$/,""),c.m4a=(a.canPlayType("audio/x-m4a;")||a.canPlayType("audio/aac;")).replace(/^no$/,"")}catch(d){}return c},s.localstorage=function(){try{return localStorage.setItem(h,h),localStorage.removeItem(h),!0}catch(a){return!1}},s.sessionstorage=function(){try{return sessionStorage.setItem(h,h),sessionStorage.removeItem(h),!0}catch(a){return!1}},s.webworkers=function(){return!!a.Worker},s.applicationcache=function(){return!!a.applicationCache},s.svg=function(){return!!b.createElementNS&&!!b.createElementNS(r.svg,"svg").createSVGRect},s.inlinesvg=function(){var a=b.createElement("div");return a.innerHTML="<svg/>",(a.firstChild&&a.firstChild.namespaceURI)==r.svg},s.smil=function(){return!!b.createElementNS&&/SVGAnimate/.test(m.call(b.createElementNS(r.svg,"animate")))},s.svgclippaths=function(){return!!b.createElementNS&&/SVGClipPath/.test(m.call(b.createElementNS(r.svg,"clipPath")))};for(var L in s)C(s,L)&&(x=L.toLowerCase(),e[x]=s[L](),v.push((e[x]?"":"no-")+x));return e.input||K(),e.addTest=function(a,b){if(typeof a=="object")for(var d in a)C(a,d)&&e.addTest(d,a[d]);else{a=a.toLowerCase();if(e[a]!==c)return e;b=typeof b=="function"?b():b,typeof f!="undefined"&&f&&(g.className+=" "+(b?"":"no-")+a),e[a]=b}return e},D(""),i=k=null,function(a,b){function l(a,b){var c=a.createElement("p"),d=a.getElementsByTagName("head")[0]||a.documentElement;return c.innerHTML="x<style>"+b+"</style>",d.insertBefore(c.lastChild,d.firstChild)}function m(){var a=s.elements;return typeof a=="string"?a.split(" "):a}function n(a){var b=j[a[h]];return b||(b={},i++,a[h]=i,j[i]=b),b}function o(a,c,d){c||(c=b);if(k)return c.createElement(a);d||(d=n(c));var g;return d.cache[a]?g=d.cache[a].cloneNode():f.test(a)?g=(d.cache[a]=d.createElem(a)).cloneNode():g=d.createElem(a),g.canHaveChildren&&!e.test(a)&&!g.tagUrn?d.frag.appendChild(g):g}function p(a,c){a||(a=b);if(k)return a.createDocumentFragment();c=c||n(a);var d=c.frag.cloneNode(),e=0,f=m(),g=f.length;for(;e<g;e++)d.createElement(f[e]);return d}function q(a,b){b.cache||(b.cache={},b.createElem=a.createElement,b.createFrag=a.createDocumentFragment,b.frag=b.createFrag()),a.createElement=function(c){return s.shivMethods?o(c,a,b):b.createElem(c)},a.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+m().join().replace(/[\w\-]+/g,function(a){return b.createElem(a),b.frag.createElement(a),'c("'+a+'")'})+");return n}")(s,b.frag)}function r(a){a||(a=b);var c=n(a);return s.shivCSS&&!g&&!c.hasCSS&&(c.hasCSS=!!l(a,"article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")),k||q(a,c),a}var c="3.7.0",d=a.html5||{},e=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,f=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,g,h="_html5shiv",i=0,j={},k;(function(){try{var a=b.createElement("a");a.innerHTML="<xyz></xyz>",g="hidden"in a,k=a.childNodes.length==1||function(){b.createElement("a");var a=b.createDocumentFragment();return typeof a.cloneNode=="undefined"||typeof a.createDocumentFragment=="undefined"||typeof a.createElement=="undefined"}()}catch(c){g=!0,k=!0}})();var s={elements:d.elements||"abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video",version:c,shivCSS:d.shivCSS!==!1,supportsUnknownElements:k,shivMethods:d.shivMethods!==!1,type:"default",shivDocument:r,createElement:o,createDocumentFragment:p};a.html5=s,r(b)}(this,b),e._version=d,e._prefixes=n,e._domPrefixes=q,e._cssomPrefixes=p,e.mq=z,e.hasEvent=A,e.testProp=function(a){return H([a])},e.testAllProps=J,e.testStyles=y,e.prefixed=function(a,b,c){return b?J(a,b,c):J(a,"pfx")},g.className=g.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+(f?" js "+v.join(" "):""),e}(this,this.document),function(a,b,c){function d(a){return"[object Function]"==o.call(a)}function e(a){return"string"==typeof a}function f(){}function g(a){return!a||"loaded"==a||"complete"==a||"uninitialized"==a}function h(){var a=p.shift();q=1,a?a.t?m(function(){("c"==a.t?B.injectCss:B.injectJs)(a.s,0,a.a,a.x,a.e,1)},0):(a(),h()):q=0}function i(a,c,d,e,f,i,j){function k(b){if(!o&&g(l.readyState)&&(u.r=o=1,!q&&h(),l.onload=l.onreadystatechange=null,b)){"img"!=a&&m(function(){t.removeChild(l)},50);for(var d in y[c])y[c].hasOwnProperty(d)&&y[c][d].onload()}}var j=j||B.errorTimeout,l=b.createElement(a),o=0,r=0,u={t:d,s:c,e:f,a:i,x:j};1===y[c]&&(r=1,y[c]=[]),"object"==a?l.data=c:(l.src=c,l.type=a),l.width=l.height="0",l.onerror=l.onload=l.onreadystatechange=function(){k.call(this,r)},p.splice(e,0,u),"img"!=a&&(r||2===y[c]?(t.insertBefore(l,s?null:n),m(k,j)):y[c].push(l))}function j(a,b,c,d,f){return q=0,b=b||"j",e(a)?i("c"==b?v:u,a,b,this.i++,c,d,f):(p.splice(this.i++,0,a),1==p.length&&h()),this}function k(){var a=B;return a.loader={load:j,i:0},a}var l=b.documentElement,m=a.setTimeout,n=b.getElementsByTagName("script")[0],o={}.toString,p=[],q=0,r="MozAppearance"in l.style,s=r&&!!b.createRange().compareNode,t=s?l:n.parentNode,l=a.opera&&"[object Opera]"==o.call(a.opera),l=!!b.attachEvent&&!l,u=r?"object":l?"script":"img",v=l?"script":u,w=Array.isArray||function(a){return"[object Array]"==o.call(a)},x=[],y={},z={timeout:function(a,b){return b.length&&(a.timeout=b[0]),a}},A,B;B=function(a){function b(a){var a=a.split("!"),b=x.length,c=a.pop(),d=a.length,c={url:c,origUrl:c,prefixes:a},e,f,g;for(f=0;f<d;f++)g=a[f].split("="),(e=z[g.shift()])&&(c=e(c,g));for(f=0;f<b;f++)c=x[f](c);return c}function g(a,e,f,g,h){var i=b(a),j=i.autoCallback;i.url.split(".").pop().split("?").shift(),i.bypass||(e&&(e=d(e)?e:e[a]||e[g]||e[a.split("/").pop().split("?")[0]]),i.instead?i.instead(a,e,f,g,h):(y[i.url]?i.noexec=!0:y[i.url]=1,f.load(i.url,i.forceCSS||!i.forceJS&&"css"==i.url.split(".").pop().split("?").shift()?"c":c,i.noexec,i.attrs,i.timeout),(d(e)||d(j))&&f.load(function(){k(),e&&e(i.origUrl,h,g),j&&j(i.origUrl,h,g),y[i.url]=2})))}function h(a,b){function c(a,c){if(a){if(e(a))c||(j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}),g(a,j,b,0,h);else if(Object(a)===a)for(n in m=function(){var b=0,c;for(c in a)a.hasOwnProperty(c)&&b++;return b}(),a)a.hasOwnProperty(n)&&(!c&&!--m&&(d(j)?j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}:j[n]=function(a){return function(){var b=[].slice.call(arguments);a&&a.apply(this,b),l()}}(k[n])),g(a[n],j,b,n,h))}else!c&&l()}var h=!!a.test,i=a.load||a.both,j=a.callback||f,k=j,l=a.complete||f,m,n;c(h?a.yep:a.nope,!!i),i&&c(i)}var i,j,l=this.yepnope.loader;if(e(a))g(a,0,l,0);else if(w(a))for(i=0;i<a.length;i++)j=a[i],e(j)?g(j,0,l,0):w(j)?B(j):Object(j)===j&&h(j,l);else Object(a)===a&&h(a,l)},B.addPrefix=function(a,b){z[a]=b},B.addFilter=function(a){x.push(a)},B.errorTimeout=1e4,null==b.readyState&&b.addEventListener&&(b.readyState="loading",b.addEventListener("DOMContentLoaded",A=function(){b.removeEventListener("DOMContentLoaded",A,0),b.readyState="complete"},0)),a.yepnope=k(),a.yepnope.executeStack=h,a.yepnope.injectJs=function(a,c,d,e,i,j){var k=b.createElement("script"),l,o,e=e||B.errorTimeout;k.src=a;for(o in d)k.setAttribute(o,d[o]);c=j?h:c||f,k.onreadystatechange=k.onload=function(){!l&&g(k.readyState)&&(l=1,c(),k.onload=k.onreadystatechange=null)},m(function(){l||(l=1,c(1))},e),i?k.onload():n.parentNode.insertBefore(k,n)},a.yepnope.injectCss=function(a,c,d,e,g,i){var e=b.createElement("link"),j,c=i?h:c||f;e.href=a,e.rel="stylesheet",e.type="text/css";for(j in d)e.setAttribute(j,d[j]);g||(n.parentNode.insertBefore(e,n),m(c,0))}}(this,document),Modernizr.load=function(){yepnope.apply(window,[].slice.call(arguments,0))};

define("modernizr", function(){});

/**
 * @fileOverview Kickass library to create and place poppers near their reference elements.
 * @version 0.6.4
 * @license
 * Copyright (c) 2016 Federico Zivolo and contributors
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
!function(a,b){"function"==typeof define&&define.amd?define('popper',b):"object"==typeof module&&module.exports?module.exports=b():a.Popper=b()}(this,function(){"use strict";function a(a,b,c){this._reference=a.jquery?a[0]:a,this.state={onCreateCalled:!1};var d="undefined"==typeof b||null===b,e=b&&"[object Object]"===Object.prototype.toString.call(b);return d||e?this._popper=this.parse(e?b:{}):this._popper=b.jquery?b[0]:b,this._options=Object.assign({},r,c),this._options.modifiers=this._options.modifiers.map(function(a){if(this._options.modifiersIgnored.indexOf(a)===-1)return"applyStyle"===a&&this._popper.setAttribute("x-placement",this._options.placement),this.modifiers[a]||a}.bind(this)),this.state.position=this._getPosition(this._popper,this._reference),k(this._popper,{position:this.state.position}),this.state.isParentTransformed=this._getIsParentTransformed(this._popper),this.update(),this._setupEventListeners(),this}function b(a){var b=a.style.display,c=a.style.visibility;a.style.display="block",a.style.visibility="hidden";var d=(a.offsetWidth,q.getComputedStyle(a)),e=parseFloat(d.marginTop)+parseFloat(d.marginBottom),f=parseFloat(d.marginLeft)+parseFloat(d.marginRight),g={width:a.offsetWidth+f,height:a.offsetHeight+e};return a.style.display=b,a.style.visibility=c,g}function c(a){var b={left:"right",right:"left",bottom:"top",top:"bottom"};return a.replace(/left|right|bottom|top/g,function(a){return b[a]})}function d(a){var b=Object.assign({},a);return b.right=b.left+b.width,b.bottom=b.top+b.height,b}function e(a,b){var c,d=0;for(c in a){if(a[c]===b)return d;d++}return null}function f(a,b){var c=q.getComputedStyle(a,null);return c[b]}function g(a){var b=a.offsetParent;return b!==q.document.body&&b?b:q.document.documentElement}function h(a){return a===q.document?q.document.body.scrollTop?q.document.body:q.document.documentElement:["scroll","auto"].indexOf(f(a,"overflow"))!==-1||["scroll","auto"].indexOf(f(a,"overflow-x"))!==-1||["scroll","auto"].indexOf(f(a,"overflow-y"))!==-1?a===q.document.body?h(a.parentNode):a:a.parentNode?h(a.parentNode):a}function i(a){return a!==q.document.body&&"HTML"!==a.nodeName&&("fixed"===f(a,"position")||(a.parentNode?i(a.parentNode):a))}function j(a){return a!==q.document.body&&("none"!==f(a,"transform")||(a.parentNode?j(a.parentNode):a))}function k(a,b){function c(a){return""!==a&&!isNaN(parseFloat(a))&&isFinite(a)}Object.keys(b).forEach(function(d){var e="";["width","height","top","right","bottom","left"].indexOf(d)!==-1&&c(b[d])&&(e="px"),a.style[d]=b[d]+e})}function l(a){var b={};return a&&"[object Function]"===b.toString.call(a)}function m(a){var b={width:a.offsetWidth,height:a.offsetHeight,left:a.offsetLeft,top:a.offsetTop};return b.right=b.left+b.width,b.bottom=b.top+b.height,b}function n(a){var b=a.getBoundingClientRect();return{left:b.left,top:b.top,right:b.right,bottom:b.bottom,width:b.right-b.left,height:b.bottom-b.top}}function o(a,b,c,d){var e=n(a),f=n(b);if(c&&!d){var g=h(b);f.top+=g.scrollTop,f.bottom+=g.scrollTop,f.left+=g.scrollLeft,f.right+=g.scrollLeft}var i={top:e.top-f.top,left:e.left-f.left,bottom:e.top-f.top+e.height,right:e.left-f.left+e.width,width:e.width,height:e.height};return i}function p(a){for(var b=["","ms","webkit","moz","o"],c=0;c<b.length;c++){var d=b[c]?b[c]+a.charAt(0).toUpperCase()+a.slice(1):a;if("undefined"!=typeof q.document.body.style[d])return d}return null}var q=window,r={placement:"bottom",gpuAcceleration:!0,offset:0,boundariesElement:"viewport",boundariesPadding:5,preventOverflowOrder:["left","right","top","bottom"],flipBehavior:"flip",arrowElement:"[x-arrow]",modifiers:["shift","offset","preventOverflow","keepTogether","arrow","flip","applyStyle"],modifiersIgnored:[]};if(a.prototype.destroy=function(){return this._popper.removeAttribute("x-placement"),this._popper.style.left="",this._popper.style.position="",this._popper.style.top="",this._popper.style[p("transform")]="",this._removeEventListeners(),this._options.removeOnDestroy&&this._popper.parentNode.removeChild(this._popper),this},a.prototype.update=function(){var a={instance:this,styles:{}};this.state.position=this._getPosition(this._popper,this._reference),k(this._popper,{position:this.state.position}),q.requestAnimationFrame(function(){var b=q.performance.now();b-this.state.lastFrame<=16||(this.state.lastFrame=b,a.placement=this._options.placement,a._originalPlacement=this._options.placement,a.offsets=this._getOffsets(this._popper,this._reference,a.placement),a.boundaries=this._getBoundaries(a,this._options.boundariesPadding,this._options.boundariesElement),a=this.runModifiers(a,this._options.modifiers),l(this.state.createCalback)||(this.state.onCreateCalled=!0),this.state.onCreateCalled?l(this.state.updateCallback)&&this.state.updateCallback(a):(this.state.onCreateCalled=!0,l(this.state.createCalback)&&this.state.createCalback(this)))}.bind(this))},a.prototype.onCreate=function(a){return this.state.createCalback=a,this},a.prototype.onUpdate=function(a){return this.state.updateCallback=a,this},a.prototype.parse=function(a){function b(a,b){b.forEach(function(b){a.classList.add(b)})}function c(a,b){b.forEach(function(b){a.setAttribute(b.split(":")[0],b.split(":")[1]||"")})}var d={tagName:"div",classNames:["popper"],attributes:[],parent:q.document.body,content:"",contentType:"text",arrowTagName:"div",arrowClassNames:["popper__arrow"],arrowAttributes:["x-arrow"]};a=Object.assign({},d,a);var e=q.document,f=e.createElement(a.tagName);if(b(f,a.classNames),c(f,a.attributes),"node"===a.contentType?f.appendChild(a.content.jquery?a.content[0]:a.content):"html"===a.contentType?f.innerHTML=a.content:f.textContent=a.content,a.arrowTagName){var g=e.createElement(a.arrowTagName);b(g,a.arrowClassNames),c(g,a.arrowAttributes),f.appendChild(g)}var h=a.parent.jquery?a.parent[0]:a.parent;if("string"==typeof h){if(h=e.querySelectorAll(a.parent),h.length>1&&console.warn("WARNING: the given `parent` query("+a.parent+") matched more than one element, the first one will be used"),0===h.length)throw"ERROR: the given `parent` doesn't exists!";h=h[0]}return h.length>1&&h instanceof Element==!1&&(console.warn("WARNING: you have passed as parent a list of elements, the first one will be used"),h=h[0]),h.appendChild(f),f},a.prototype._getPosition=function(a,b){var c=g(b),d=i(c);return d?"fixed":"absolute"},a.prototype._getIsParentTransformed=function(a){return j(a.parentNode)},a.prototype._getOffsets=function(a,c,d){d=d.split("-")[0];var e={};e.position=this.state.position;var f="fixed"===e.position,h=this.state.isParentTransformed,i=g(f&&h?c:a),j=o(c,i,f,h),k=b(a);return["right","left"].indexOf(d)!==-1?(e.top=j.top+j.height/2-k.height/2,"left"===d?e.left=j.left-k.width:e.left=j.right):(e.left=j.left+j.width/2-k.width/2,"top"===d?e.top=j.top-k.height:e.top=j.bottom),e.width=k.width,e.height=k.height,{popper:e,reference:j}},a.prototype._setupEventListeners=function(){if(this.state.updateBound=this.update.bind(this),q.addEventListener("resize",this.state.updateBound),"window"!==this._options.boundariesElement){var a=h(this._reference);a!==q.document.body&&a!==q.document.documentElement||(a=q),a.addEventListener("scroll",this.state.updateBound)}},a.prototype._removeEventListeners=function(){if(q.removeEventListener("resize",this.state.updateBound),"window"!==this._options.boundariesElement){var a=h(this._reference);a!==q.document.body&&a!==q.document.documentElement||(a=q),a.removeEventListener("scroll",this.state.updateBound)}this.state.updateBound=null},a.prototype._getBoundaries=function(a,b,c){var d,e,f={};if("window"===c){var i=q.document.body,j=q.document.documentElement;e=Math.max(i.scrollHeight,i.offsetHeight,j.clientHeight,j.scrollHeight,j.offsetHeight),d=Math.max(i.scrollWidth,i.offsetWidth,j.clientWidth,j.scrollWidth,j.offsetWidth),f={top:0,right:d,bottom:e,left:0}}else if("viewport"===c){var k=g(this._popper),l=h(this._popper),n=m(k),o="fixed"===a.offsets.popper.position?0:l.scrollTop,p="fixed"===a.offsets.popper.position?0:l.scrollLeft;f={top:0-(n.top-o),right:q.document.documentElement.clientWidth-(n.left-p),bottom:q.document.documentElement.clientHeight-(n.top-o),left:0-(n.left-p)}}else f=g(this._popper)===c?{top:0,left:0,right:c.clientWidth,bottom:c.clientHeight}:m(c);return f.left+=b,f.right-=b,f.top=f.top+b,f.bottom=f.bottom-b,f},a.prototype.runModifiers=function(a,b,c){var d=b.slice();return void 0!==c&&(d=this._options.modifiers.slice(0,e(this._options.modifiers,c))),d.forEach(function(b){l(b)&&(a=b.call(this,a))}.bind(this)),a},a.prototype.isModifierRequired=function(a,b){var c=e(this._options.modifiers,a);return!!this._options.modifiers.slice(0,c).filter(function(a){return a===b}).length},a.prototype.modifiers={},a.prototype.modifiers.applyStyle=function(a){var b,c={position:a.offsets.popper.position},d=Math.round(a.offsets.popper.left),e=Math.round(a.offsets.popper.top);return this._options.gpuAcceleration&&(b=p("transform"))?(c[b]="translate3d("+d+"px, "+e+"px, 0)",c.top=0,c.left=0):(c.left=d,c.top=e),Object.assign(c,a.styles),k(this._popper,c),this._popper.setAttribute("x-placement",a.placement),a.offsets.arrow&&k(a.arrowElement,a.offsets.arrow),a},a.prototype.modifiers.shift=function(a){var b=a.placement,c=b.split("-")[0],e=b.split("-")[1];if(e){var f=a.offsets.reference,g=d(a.offsets.popper),h={y:{start:{top:f.top},end:{top:f.top+f.height-g.height}},x:{start:{left:f.left},end:{left:f.left+f.width-g.width}}},i=["bottom","top"].indexOf(c)!==-1?"x":"y";a.offsets.popper=Object.assign(g,h[i][e])}return a},a.prototype.modifiers.preventOverflow=function(a){var b=this._options.preventOverflowOrder,c=d(a.offsets.popper),e={left:function(){var b=c.left;return c.left<a.boundaries.left&&(b=Math.max(c.left,a.boundaries.left)),{left:b}},right:function(){var b=c.left;return c.right>a.boundaries.right&&(b=Math.min(c.left,a.boundaries.right-c.width)),{left:b}},top:function(){var b=c.top;return c.top<a.boundaries.top&&(b=Math.max(c.top,a.boundaries.top)),{top:b}},bottom:function(){var b=c.top;return c.bottom>a.boundaries.bottom&&(b=Math.min(c.top,a.boundaries.bottom-c.height)),{top:b}}};return b.forEach(function(b){a.offsets.popper=Object.assign(c,e[b]())}),a},a.prototype.modifiers.keepTogether=function(a){var b=d(a.offsets.popper),c=a.offsets.reference,e=Math.floor;return b.right<e(c.left)&&(a.offsets.popper.left=e(c.left)-b.width),b.left>e(c.right)&&(a.offsets.popper.left=e(c.right)),b.bottom<e(c.top)&&(a.offsets.popper.top=e(c.top)-b.height),b.top>e(c.bottom)&&(a.offsets.popper.top=e(c.bottom)),a},a.prototype.modifiers.flip=function(a){if(!this.isModifierRequired(this.modifiers.flip,this.modifiers.preventOverflow))return console.warn("WARNING: preventOverflow modifier is required by flip modifier in order to work, be sure to include it before flip!"),a;if(a.flipped&&a.placement===a._originalPlacement)return a;var b=a.placement.split("-")[0],e=c(b),f=a.placement.split("-")[1]||"",g=[];return g="flip"===this._options.flipBehavior?[b,e]:this._options.flipBehavior,g.forEach(function(h,i){if(b===h&&g.length!==i+1){b=a.placement.split("-")[0],e=c(b);var j=d(a.offsets.popper),k=["right","bottom"].indexOf(b)!==-1;(k&&Math.floor(a.offsets.reference[b])>Math.floor(j[e])||!k&&Math.floor(a.offsets.reference[b])<Math.floor(j[e]))&&(a.flipped=!0,a.placement=g[i+1],f&&(a.placement+="-"+f),a.offsets.popper=this._getOffsets(this._popper,this._reference,a.placement).popper,a=this.runModifiers(a,this._options.modifiers,this._flip))}}.bind(this)),a},a.prototype.modifiers.offset=function(a){var b=this._options.offset,c=a.offsets.popper;return a.placement.indexOf("left")!==-1?c.top-=b:a.placement.indexOf("right")!==-1?c.top+=b:a.placement.indexOf("top")!==-1?c.left-=b:a.placement.indexOf("bottom")!==-1&&(c.left+=b),a},a.prototype.modifiers.arrow=function(a){var c=this._options.arrowElement;if("string"==typeof c&&(c=this._popper.querySelector(c)),!c)return a;if(!this._popper.contains(c))return console.warn("WARNING: `arrowElement` must be child of its popper element!"),a;if(!this.isModifierRequired(this.modifiers.arrow,this.modifiers.keepTogether))return console.warn("WARNING: keepTogether modifier is required by arrow modifier in order to work, be sure to include it before arrow!"),a;var e={},f=a.placement.split("-")[0],g=d(a.offsets.popper),h=a.offsets.reference,i=["left","right"].indexOf(f)!==-1,j=i?"height":"width",k=i?"top":"left",l=i?"left":"top",m=i?"bottom":"right",n=b(c)[j];h[m]-n<g[k]&&(a.offsets.popper[k]-=g[k]-(h[m]-n)),h[k]+n>g[m]&&(a.offsets.popper[k]+=h[k]+n-g[m]);var o=h[k]+h[j]/2-n/2,p=o-d(a.offsets.popper)[k];return p=Math.max(Math.min(g[j]-n,p),0),e[k]=p,e[l]="",a.offsets.arrow=e,a.arrowElement=c,a},Object.assign||Object.defineProperty(Object,"assign",{enumerable:!1,configurable:!0,writable:!0,value:function(a){if(void 0===a||null===a)throw new TypeError("Cannot convert first argument to object");for(var b=Object(a),c=1;c<arguments.length;c++){var d=arguments[c];if(void 0!==d&&null!==d){d=Object(d);for(var e=Object.keys(d),f=0,g=e.length;f<g;f++){var h=e[f],i=Object.getOwnPropertyDescriptor(d,h);void 0!==i&&i.enumerable&&(b[h]=d[h])}}}return b}}),!q.requestAnimationFrame){for(var s=0,t=["ms","moz","webkit","o"],u=0;u<t.length&&!q.requestAnimationFrame;++u)q.requestAnimationFrame=q[t[u]+"RequestAnimationFrame"],q.cancelAnimationFrame=q[t[u]+"CancelAnimationFrame"]||q[t[u]+"CancelRequestAnimationFrame"];q.requestAnimationFrame||(q.requestAnimationFrame=function(a,b){var c=(new Date).getTime(),d=Math.max(0,16-(c-s)),e=q.setTimeout(function(){a(c+d)},d);return s=c+d,e}),q.cancelAnimationFrame||(q.cancelAnimationFrame=function(a){clearTimeout(a)})}return a});
//# sourceMappingURL=popper.min.js.map;
/*! Hammer.JS - v2.0.4 - 2014-09-28
 * http://hammerjs.github.io/
 *
 * Copyright (c) 2014 Jorik Tangelder;
 * Licensed under the MIT license */
!function(a,b,c,d){"use strict";function e(a,b,c){return setTimeout(k(a,c),b)}function f(a,b,c){return Array.isArray(a)?(g(a,c[b],c),!0):!1}function g(a,b,c){var e;if(a)if(a.forEach)a.forEach(b,c);else if(a.length!==d)for(e=0;e<a.length;)b.call(c,a[e],e,a),e++;else for(e in a)a.hasOwnProperty(e)&&b.call(c,a[e],e,a)}function h(a,b,c){for(var e=Object.keys(b),f=0;f<e.length;)(!c||c&&a[e[f]]===d)&&(a[e[f]]=b[e[f]]),f++;return a}function i(a,b){return h(a,b,!0)}function j(a,b,c){var d,e=b.prototype;d=a.prototype=Object.create(e),d.constructor=a,d._super=e,c&&h(d,c)}function k(a,b){return function(){return a.apply(b,arguments)}}function l(a,b){return typeof a==kb?a.apply(b?b[0]||d:d,b):a}function m(a,b){return a===d?b:a}function n(a,b,c){g(r(b),function(b){a.addEventListener(b,c,!1)})}function o(a,b,c){g(r(b),function(b){a.removeEventListener(b,c,!1)})}function p(a,b){for(;a;){if(a==b)return!0;a=a.parentNode}return!1}function q(a,b){return a.indexOf(b)>-1}function r(a){return a.trim().split(/\s+/g)}function s(a,b,c){if(a.indexOf&&!c)return a.indexOf(b);for(var d=0;d<a.length;){if(c&&a[d][c]==b||!c&&a[d]===b)return d;d++}return-1}function t(a){return Array.prototype.slice.call(a,0)}function u(a,b,c){for(var d=[],e=[],f=0;f<a.length;){var g=b?a[f][b]:a[f];s(e,g)<0&&d.push(a[f]),e[f]=g,f++}return c&&(d=b?d.sort(function(a,c){return a[b]>c[b]}):d.sort()),d}function v(a,b){for(var c,e,f=b[0].toUpperCase()+b.slice(1),g=0;g<ib.length;){if(c=ib[g],e=c?c+f:b,e in a)return e;g++}return d}function w(){return ob++}function x(a){var b=a.ownerDocument;return b.defaultView||b.parentWindow}function y(a,b){var c=this;this.manager=a,this.callback=b,this.element=a.element,this.target=a.options.inputTarget,this.domHandler=function(b){l(a.options.enable,[a])&&c.handler(b)},this.init()}function z(a){var b,c=a.options.inputClass;return new(b=c?c:rb?N:sb?Q:qb?S:M)(a,A)}function A(a,b,c){var d=c.pointers.length,e=c.changedPointers.length,f=b&yb&&d-e===0,g=b&(Ab|Bb)&&d-e===0;c.isFirst=!!f,c.isFinal=!!g,f&&(a.session={}),c.eventType=b,B(a,c),a.emit("hammer.input",c),a.recognize(c),a.session.prevInput=c}function B(a,b){var c=a.session,d=b.pointers,e=d.length;c.firstInput||(c.firstInput=E(b)),e>1&&!c.firstMultiple?c.firstMultiple=E(b):1===e&&(c.firstMultiple=!1);var f=c.firstInput,g=c.firstMultiple,h=g?g.center:f.center,i=b.center=F(d);b.timeStamp=nb(),b.deltaTime=b.timeStamp-f.timeStamp,b.angle=J(h,i),b.distance=I(h,i),C(c,b),b.offsetDirection=H(b.deltaX,b.deltaY),b.scale=g?L(g.pointers,d):1,b.rotation=g?K(g.pointers,d):0,D(c,b);var j=a.element;p(b.srcEvent.target,j)&&(j=b.srcEvent.target),b.target=j}function C(a,b){var c=b.center,d=a.offsetDelta||{},e=a.prevDelta||{},f=a.prevInput||{};(b.eventType===yb||f.eventType===Ab)&&(e=a.prevDelta={x:f.deltaX||0,y:f.deltaY||0},d=a.offsetDelta={x:c.x,y:c.y}),b.deltaX=e.x+(c.x-d.x),b.deltaY=e.y+(c.y-d.y)}function D(a,b){var c,e,f,g,h=a.lastInterval||b,i=b.timeStamp-h.timeStamp;if(b.eventType!=Bb&&(i>xb||h.velocity===d)){var j=h.deltaX-b.deltaX,k=h.deltaY-b.deltaY,l=G(i,j,k);e=l.x,f=l.y,c=mb(l.x)>mb(l.y)?l.x:l.y,g=H(j,k),a.lastInterval=b}else c=h.velocity,e=h.velocityX,f=h.velocityY,g=h.direction;b.velocity=c,b.velocityX=e,b.velocityY=f,b.direction=g}function E(a){for(var b=[],c=0;c<a.pointers.length;)b[c]={clientX:lb(a.pointers[c].clientX),clientY:lb(a.pointers[c].clientY)},c++;return{timeStamp:nb(),pointers:b,center:F(b),deltaX:a.deltaX,deltaY:a.deltaY}}function F(a){var b=a.length;if(1===b)return{x:lb(a[0].clientX),y:lb(a[0].clientY)};for(var c=0,d=0,e=0;b>e;)c+=a[e].clientX,d+=a[e].clientY,e++;return{x:lb(c/b),y:lb(d/b)}}function G(a,b,c){return{x:b/a||0,y:c/a||0}}function H(a,b){return a===b?Cb:mb(a)>=mb(b)?a>0?Db:Eb:b>0?Fb:Gb}function I(a,b,c){c||(c=Kb);var d=b[c[0]]-a[c[0]],e=b[c[1]]-a[c[1]];return Math.sqrt(d*d+e*e)}function J(a,b,c){c||(c=Kb);var d=b[c[0]]-a[c[0]],e=b[c[1]]-a[c[1]];return 180*Math.atan2(e,d)/Math.PI}function K(a,b){return J(b[1],b[0],Lb)-J(a[1],a[0],Lb)}function L(a,b){return I(b[0],b[1],Lb)/I(a[0],a[1],Lb)}function M(){this.evEl=Nb,this.evWin=Ob,this.allow=!0,this.pressed=!1,y.apply(this,arguments)}function N(){this.evEl=Rb,this.evWin=Sb,y.apply(this,arguments),this.store=this.manager.session.pointerEvents=[]}function O(){this.evTarget=Ub,this.evWin=Vb,this.started=!1,y.apply(this,arguments)}function P(a,b){var c=t(a.touches),d=t(a.changedTouches);return b&(Ab|Bb)&&(c=u(c.concat(d),"identifier",!0)),[c,d]}function Q(){this.evTarget=Xb,this.targetIds={},y.apply(this,arguments)}function R(a,b){var c=t(a.touches),d=this.targetIds;if(b&(yb|zb)&&1===c.length)return d[c[0].identifier]=!0,[c,c];var e,f,g=t(a.changedTouches),h=[],i=this.target;if(f=c.filter(function(a){return p(a.target,i)}),b===yb)for(e=0;e<f.length;)d[f[e].identifier]=!0,e++;for(e=0;e<g.length;)d[g[e].identifier]&&h.push(g[e]),b&(Ab|Bb)&&delete d[g[e].identifier],e++;return h.length?[u(f.concat(h),"identifier",!0),h]:void 0}function S(){y.apply(this,arguments);var a=k(this.handler,this);this.touch=new Q(this.manager,a),this.mouse=new M(this.manager,a)}function T(a,b){this.manager=a,this.set(b)}function U(a){if(q(a,bc))return bc;var b=q(a,cc),c=q(a,dc);return b&&c?cc+" "+dc:b||c?b?cc:dc:q(a,ac)?ac:_b}function V(a){this.id=w(),this.manager=null,this.options=i(a||{},this.defaults),this.options.enable=m(this.options.enable,!0),this.state=ec,this.simultaneous={},this.requireFail=[]}function W(a){return a&jc?"cancel":a&hc?"end":a&gc?"move":a&fc?"start":""}function X(a){return a==Gb?"down":a==Fb?"up":a==Db?"left":a==Eb?"right":""}function Y(a,b){var c=b.manager;return c?c.get(a):a}function Z(){V.apply(this,arguments)}function $(){Z.apply(this,arguments),this.pX=null,this.pY=null}function _(){Z.apply(this,arguments)}function ab(){V.apply(this,arguments),this._timer=null,this._input=null}function bb(){Z.apply(this,arguments)}function cb(){Z.apply(this,arguments)}function db(){V.apply(this,arguments),this.pTime=!1,this.pCenter=!1,this._timer=null,this._input=null,this.count=0}function eb(a,b){return b=b||{},b.recognizers=m(b.recognizers,eb.defaults.preset),new fb(a,b)}function fb(a,b){b=b||{},this.options=i(b,eb.defaults),this.options.inputTarget=this.options.inputTarget||a,this.handlers={},this.session={},this.recognizers=[],this.element=a,this.input=z(this),this.touchAction=new T(this,this.options.touchAction),gb(this,!0),g(b.recognizers,function(a){var b=this.add(new a[0](a[1]));a[2]&&b.recognizeWith(a[2]),a[3]&&b.requireFailure(a[3])},this)}function gb(a,b){var c=a.element;g(a.options.cssProps,function(a,d){c.style[v(c.style,d)]=b?a:""})}function hb(a,c){var d=b.createEvent("Event");d.initEvent(a,!0,!0),d.gesture=c,c.target.dispatchEvent(d)}var ib=["","webkit","moz","MS","ms","o"],jb=b.createElement("div"),kb="function",lb=Math.round,mb=Math.abs,nb=Date.now,ob=1,pb=/mobile|tablet|ip(ad|hone|od)|android/i,qb="ontouchstart"in a,rb=v(a,"PointerEvent")!==d,sb=qb&&pb.test(navigator.userAgent),tb="touch",ub="pen",vb="mouse",wb="kinect",xb=25,yb=1,zb=2,Ab=4,Bb=8,Cb=1,Db=2,Eb=4,Fb=8,Gb=16,Hb=Db|Eb,Ib=Fb|Gb,Jb=Hb|Ib,Kb=["x","y"],Lb=["clientX","clientY"];y.prototype={handler:function(){},init:function(){this.evEl&&n(this.element,this.evEl,this.domHandler),this.evTarget&&n(this.target,this.evTarget,this.domHandler),this.evWin&&n(x(this.element),this.evWin,this.domHandler)},destroy:function(){this.evEl&&o(this.element,this.evEl,this.domHandler),this.evTarget&&o(this.target,this.evTarget,this.domHandler),this.evWin&&o(x(this.element),this.evWin,this.domHandler)}};var Mb={mousedown:yb,mousemove:zb,mouseup:Ab},Nb="mousedown",Ob="mousemove mouseup";j(M,y,{handler:function(a){var b=Mb[a.type];b&yb&&0===a.button&&(this.pressed=!0),b&zb&&1!==a.which&&(b=Ab),this.pressed&&this.allow&&(b&Ab&&(this.pressed=!1),this.callback(this.manager,b,{pointers:[a],changedPointers:[a],pointerType:vb,srcEvent:a}))}});var Pb={pointerdown:yb,pointermove:zb,pointerup:Ab,pointercancel:Bb,pointerout:Bb},Qb={2:tb,3:ub,4:vb,5:wb},Rb="pointerdown",Sb="pointermove pointerup pointercancel";a.MSPointerEvent&&(Rb="MSPointerDown",Sb="MSPointerMove MSPointerUp MSPointerCancel"),j(N,y,{handler:function(a){var b=this.store,c=!1,d=a.type.toLowerCase().replace("ms",""),e=Pb[d],f=Qb[a.pointerType]||a.pointerType,g=f==tb,h=s(b,a.pointerId,"pointerId");e&yb&&(0===a.button||g)?0>h&&(b.push(a),h=b.length-1):e&(Ab|Bb)&&(c=!0),0>h||(b[h]=a,this.callback(this.manager,e,{pointers:b,changedPointers:[a],pointerType:f,srcEvent:a}),c&&b.splice(h,1))}});var Tb={touchstart:yb,touchmove:zb,touchend:Ab,touchcancel:Bb},Ub="touchstart",Vb="touchstart touchmove touchend touchcancel";j(O,y,{handler:function(a){var b=Tb[a.type];if(b===yb&&(this.started=!0),this.started){var c=P.call(this,a,b);b&(Ab|Bb)&&c[0].length-c[1].length===0&&(this.started=!1),this.callback(this.manager,b,{pointers:c[0],changedPointers:c[1],pointerType:tb,srcEvent:a})}}});var Wb={touchstart:yb,touchmove:zb,touchend:Ab,touchcancel:Bb},Xb="touchstart touchmove touchend touchcancel";j(Q,y,{handler:function(a){var b=Wb[a.type],c=R.call(this,a,b);c&&this.callback(this.manager,b,{pointers:c[0],changedPointers:c[1],pointerType:tb,srcEvent:a})}}),j(S,y,{handler:function(a,b,c){var d=c.pointerType==tb,e=c.pointerType==vb;if(d)this.mouse.allow=!1;else if(e&&!this.mouse.allow)return;b&(Ab|Bb)&&(this.mouse.allow=!0),this.callback(a,b,c)},destroy:function(){this.touch.destroy(),this.mouse.destroy()}});var Yb=v(jb.style,"touchAction"),Zb=Yb!==d,$b="compute",_b="auto",ac="manipulation",bc="none",cc="pan-x",dc="pan-y";T.prototype={set:function(a){a==$b&&(a=this.compute()),Zb&&(this.manager.element.style[Yb]=a),this.actions=a.toLowerCase().trim()},update:function(){this.set(this.manager.options.touchAction)},compute:function(){var a=[];return g(this.manager.recognizers,function(b){l(b.options.enable,[b])&&(a=a.concat(b.getTouchAction()))}),U(a.join(" "))},preventDefaults:function(a){if(!Zb){var b=a.srcEvent,c=a.offsetDirection;if(this.manager.session.prevented)return void b.preventDefault();var d=this.actions,e=q(d,bc),f=q(d,dc),g=q(d,cc);return e||f&&c&Hb||g&&c&Ib?this.preventSrc(b):void 0}},preventSrc:function(a){this.manager.session.prevented=!0,a.preventDefault()}};var ec=1,fc=2,gc=4,hc=8,ic=hc,jc=16,kc=32;V.prototype={defaults:{},set:function(a){return h(this.options,a),this.manager&&this.manager.touchAction.update(),this},recognizeWith:function(a){if(f(a,"recognizeWith",this))return this;var b=this.simultaneous;return a=Y(a,this),b[a.id]||(b[a.id]=a,a.recognizeWith(this)),this},dropRecognizeWith:function(a){return f(a,"dropRecognizeWith",this)?this:(a=Y(a,this),delete this.simultaneous[a.id],this)},requireFailure:function(a){if(f(a,"requireFailure",this))return this;var b=this.requireFail;return a=Y(a,this),-1===s(b,a)&&(b.push(a),a.requireFailure(this)),this},dropRequireFailure:function(a){if(f(a,"dropRequireFailure",this))return this;a=Y(a,this);var b=s(this.requireFail,a);return b>-1&&this.requireFail.splice(b,1),this},hasRequireFailures:function(){return this.requireFail.length>0},canRecognizeWith:function(a){return!!this.simultaneous[a.id]},emit:function(a){function b(b){c.manager.emit(c.options.event+(b?W(d):""),a)}var c=this,d=this.state;hc>d&&b(!0),b(),d>=hc&&b(!0)},tryEmit:function(a){return this.canEmit()?this.emit(a):void(this.state=kc)},canEmit:function(){for(var a=0;a<this.requireFail.length;){if(!(this.requireFail[a].state&(kc|ec)))return!1;a++}return!0},recognize:function(a){var b=h({},a);return l(this.options.enable,[this,b])?(this.state&(ic|jc|kc)&&(this.state=ec),this.state=this.process(b),void(this.state&(fc|gc|hc|jc)&&this.tryEmit(b))):(this.reset(),void(this.state=kc))},process:function(){},getTouchAction:function(){},reset:function(){}},j(Z,V,{defaults:{pointers:1},attrTest:function(a){var b=this.options.pointers;return 0===b||a.pointers.length===b},process:function(a){var b=this.state,c=a.eventType,d=b&(fc|gc),e=this.attrTest(a);return d&&(c&Bb||!e)?b|jc:d||e?c&Ab?b|hc:b&fc?b|gc:fc:kc}}),j($,Z,{defaults:{event:"pan",threshold:10,pointers:1,direction:Jb},getTouchAction:function(){var a=this.options.direction,b=[];return a&Hb&&b.push(dc),a&Ib&&b.push(cc),b},directionTest:function(a){var b=this.options,c=!0,d=a.distance,e=a.direction,f=a.deltaX,g=a.deltaY;return e&b.direction||(b.direction&Hb?(e=0===f?Cb:0>f?Db:Eb,c=f!=this.pX,d=Math.abs(a.deltaX)):(e=0===g?Cb:0>g?Fb:Gb,c=g!=this.pY,d=Math.abs(a.deltaY))),a.direction=e,c&&d>b.threshold&&e&b.direction},attrTest:function(a){return Z.prototype.attrTest.call(this,a)&&(this.state&fc||!(this.state&fc)&&this.directionTest(a))},emit:function(a){this.pX=a.deltaX,this.pY=a.deltaY;var b=X(a.direction);b&&this.manager.emit(this.options.event+b,a),this._super.emit.call(this,a)}}),j(_,Z,{defaults:{event:"pinch",threshold:0,pointers:2},getTouchAction:function(){return[bc]},attrTest:function(a){return this._super.attrTest.call(this,a)&&(Math.abs(a.scale-1)>this.options.threshold||this.state&fc)},emit:function(a){if(this._super.emit.call(this,a),1!==a.scale){var b=a.scale<1?"in":"out";this.manager.emit(this.options.event+b,a)}}}),j(ab,V,{defaults:{event:"press",pointers:1,time:500,threshold:5},getTouchAction:function(){return[_b]},process:function(a){var b=this.options,c=a.pointers.length===b.pointers,d=a.distance<b.threshold,f=a.deltaTime>b.time;if(this._input=a,!d||!c||a.eventType&(Ab|Bb)&&!f)this.reset();else if(a.eventType&yb)this.reset(),this._timer=e(function(){this.state=ic,this.tryEmit()},b.time,this);else if(a.eventType&Ab)return ic;return kc},reset:function(){clearTimeout(this._timer)},emit:function(a){this.state===ic&&(a&&a.eventType&Ab?this.manager.emit(this.options.event+"up",a):(this._input.timeStamp=nb(),this.manager.emit(this.options.event,this._input)))}}),j(bb,Z,{defaults:{event:"rotate",threshold:0,pointers:2},getTouchAction:function(){return[bc]},attrTest:function(a){return this._super.attrTest.call(this,a)&&(Math.abs(a.rotation)>this.options.threshold||this.state&fc)}}),j(cb,Z,{defaults:{event:"swipe",threshold:10,velocity:.65,direction:Hb|Ib,pointers:1},getTouchAction:function(){return $.prototype.getTouchAction.call(this)},attrTest:function(a){var b,c=this.options.direction;return c&(Hb|Ib)?b=a.velocity:c&Hb?b=a.velocityX:c&Ib&&(b=a.velocityY),this._super.attrTest.call(this,a)&&c&a.direction&&a.distance>this.options.threshold&&mb(b)>this.options.velocity&&a.eventType&Ab},emit:function(a){var b=X(a.direction);b&&this.manager.emit(this.options.event+b,a),this.manager.emit(this.options.event,a)}}),j(db,V,{defaults:{event:"tap",pointers:1,taps:1,interval:300,time:250,threshold:2,posThreshold:10},getTouchAction:function(){return[ac]},process:function(a){var b=this.options,c=a.pointers.length===b.pointers,d=a.distance<b.threshold,f=a.deltaTime<b.time;if(this.reset(),a.eventType&yb&&0===this.count)return this.failTimeout();if(d&&f&&c){if(a.eventType!=Ab)return this.failTimeout();var g=this.pTime?a.timeStamp-this.pTime<b.interval:!0,h=!this.pCenter||I(this.pCenter,a.center)<b.posThreshold;this.pTime=a.timeStamp,this.pCenter=a.center,h&&g?this.count+=1:this.count=1,this._input=a;var i=this.count%b.taps;if(0===i)return this.hasRequireFailures()?(this._timer=e(function(){this.state=ic,this.tryEmit()},b.interval,this),fc):ic}return kc},failTimeout:function(){return this._timer=e(function(){this.state=kc},this.options.interval,this),kc},reset:function(){clearTimeout(this._timer)},emit:function(){this.state==ic&&(this._input.tapCount=this.count,this.manager.emit(this.options.event,this._input))}}),eb.VERSION="2.0.4",eb.defaults={domEvents:!1,touchAction:$b,enable:!0,inputTarget:null,inputClass:null,preset:[[bb,{enable:!1}],[_,{enable:!1},["rotate"]],[cb,{direction:Hb}],[$,{direction:Hb},["swipe"]],[db],[db,{event:"doubletap",taps:2},["tap"]],[ab]],cssProps:{userSelect:"none",touchSelect:"none",touchCallout:"none",contentZooming:"none",userDrag:"none",tapHighlightColor:"rgba(0,0,0,0)"}};var lc=1,mc=2;fb.prototype={set:function(a){return h(this.options,a),a.touchAction&&this.touchAction.update(),a.inputTarget&&(this.input.destroy(),this.input.target=a.inputTarget,this.input.init()),this},stop:function(a){this.session.stopped=a?mc:lc},recognize:function(a){var b=this.session;if(!b.stopped){this.touchAction.preventDefaults(a);var c,d=this.recognizers,e=b.curRecognizer;(!e||e&&e.state&ic)&&(e=b.curRecognizer=null);for(var f=0;f<d.length;)c=d[f],b.stopped===mc||e&&c!=e&&!c.canRecognizeWith(e)?c.reset():c.recognize(a),!e&&c.state&(fc|gc|hc)&&(e=b.curRecognizer=c),f++}},get:function(a){if(a instanceof V)return a;for(var b=this.recognizers,c=0;c<b.length;c++)if(b[c].options.event==a)return b[c];return null},add:function(a){if(f(a,"add",this))return this;var b=this.get(a.options.event);return b&&this.remove(b),this.recognizers.push(a),a.manager=this,this.touchAction.update(),a},remove:function(a){if(f(a,"remove",this))return this;var b=this.recognizers;return a=this.get(a),b.splice(s(b,a),1),this.touchAction.update(),this},on:function(a,b){var c=this.handlers;return g(r(a),function(a){c[a]=c[a]||[],c[a].push(b)}),this},off:function(a,b){var c=this.handlers;return g(r(a),function(a){b?c[a].splice(s(c[a],b),1):delete c[a]}),this},emit:function(a,b){this.options.domEvents&&hb(a,b);var c=this.handlers[a]&&this.handlers[a].slice();if(c&&c.length){b.type=a,b.preventDefault=function(){b.srcEvent.preventDefault()};for(var d=0;d<c.length;)c[d](b),d++}},destroy:function(){this.element&&gb(this,!1),this.handlers={},this.session={},this.input.destroy(),this.element=null}},h(eb,{INPUT_START:yb,INPUT_MOVE:zb,INPUT_END:Ab,INPUT_CANCEL:Bb,STATE_POSSIBLE:ec,STATE_BEGAN:fc,STATE_CHANGED:gc,STATE_ENDED:hc,STATE_RECOGNIZED:ic,STATE_CANCELLED:jc,STATE_FAILED:kc,DIRECTION_NONE:Cb,DIRECTION_LEFT:Db,DIRECTION_RIGHT:Eb,DIRECTION_UP:Fb,DIRECTION_DOWN:Gb,DIRECTION_HORIZONTAL:Hb,DIRECTION_VERTICAL:Ib,DIRECTION_ALL:Jb,Manager:fb,Input:y,TouchAction:T,TouchInput:Q,MouseInput:M,PointerEventInput:N,TouchMouseInput:S,SingleTouchInput:O,Recognizer:V,AttrRecognizer:Z,Tap:db,Pan:$,Swipe:cb,Pinch:_,Rotate:bb,Press:ab,on:n,off:o,each:g,merge:i,extend:h,inherit:j,bindFn:k,prefixed:v}),typeof define==kb&&define.amd?define('hammerjs',[],function(){return eb}):"undefined"!=typeof module&&module.exports?module.exports=eb:a[c]=eb}(window,document,"Hammer");
//# sourceMappingURL=hammer.min.map;
!function(a,b){"object"==typeof exports&&"undefined"!=typeof module?module.exports=b():"function"==typeof define&&define.amd?define('momentjs',b):a.moment=b()}(this,function(){"use strict";function a(){return re.apply(null,arguments)}function b(a){re=a}function c(a){return a instanceof Array||"[object Array]"===Object.prototype.toString.call(a)}function d(a){return null!=a&&"[object Object]"===Object.prototype.toString.call(a)}function e(a){var b;for(b in a)return!1;return!0}function f(a){return void 0===a}function g(a){return"number"==typeof a||"[object Number]"===Object.prototype.toString.call(a)}function h(a){return a instanceof Date||"[object Date]"===Object.prototype.toString.call(a)}function i(a,b){var c,d=[];for(c=0;c<a.length;++c)d.push(b(a[c],c));return d}function j(a,b){return Object.prototype.hasOwnProperty.call(a,b)}function k(a,b){for(var c in b)j(b,c)&&(a[c]=b[c]);return j(b,"toString")&&(a.toString=b.toString),j(b,"valueOf")&&(a.valueOf=b.valueOf),a}function l(a,b,c,d){return sb(a,b,c,d,!0).utc()}function m(){return{empty:!1,unusedTokens:[],unusedInput:[],overflow:-2,charsLeftOver:0,nullInput:!1,invalidMonth:null,invalidFormat:!1,userInvalidated:!1,iso:!1,parsedDateParts:[],meridiem:null,rfc2822:!1,weekdayMismatch:!1}}function n(a){return null==a._pf&&(a._pf=m()),a._pf}function o(a){if(null==a._isValid){var b=n(a),c=te.call(b.parsedDateParts,function(a){return null!=a}),d=!isNaN(a._d.getTime())&&b.overflow<0&&!b.empty&&!b.invalidMonth&&!b.invalidWeekday&&!b.nullInput&&!b.invalidFormat&&!b.userInvalidated&&(!b.meridiem||b.meridiem&&c);if(a._strict&&(d=d&&0===b.charsLeftOver&&0===b.unusedTokens.length&&void 0===b.bigHour),null!=Object.isFrozen&&Object.isFrozen(a))return d;a._isValid=d}return a._isValid}function p(a){var b=l(NaN);return null!=a?k(n(b),a):n(b).userInvalidated=!0,b}function q(a,b){var c,d,e;if(f(b._isAMomentObject)||(a._isAMomentObject=b._isAMomentObject),f(b._i)||(a._i=b._i),f(b._f)||(a._f=b._f),f(b._l)||(a._l=b._l),f(b._strict)||(a._strict=b._strict),f(b._tzm)||(a._tzm=b._tzm),f(b._isUTC)||(a._isUTC=b._isUTC),f(b._offset)||(a._offset=b._offset),f(b._pf)||(a._pf=n(b)),f(b._locale)||(a._locale=b._locale),ue.length>0)for(c=0;c<ue.length;c++)d=ue[c],e=b[d],f(e)||(a[d]=e);return a}function r(b){q(this,b),this._d=new Date(null!=b._d?b._d.getTime():NaN),this.isValid()||(this._d=new Date(NaN)),ve===!1&&(ve=!0,a.updateOffset(this),ve=!1)}function s(a){return a instanceof r||null!=a&&null!=a._isAMomentObject}function t(a){return a<0?Math.ceil(a)||0:Math.floor(a)}function u(a){var b=+a,c=0;return 0!==b&&isFinite(b)&&(c=t(b)),c}function v(a,b,c){var d,e=Math.min(a.length,b.length),f=Math.abs(a.length-b.length),g=0;for(d=0;d<e;d++)(c&&a[d]!==b[d]||!c&&u(a[d])!==u(b[d]))&&g++;return g+f}function w(b){a.suppressDeprecationWarnings===!1&&"undefined"!=typeof console&&console.warn&&console.warn("Deprecation warning: "+b)}function x(b,c){var d=!0;return k(function(){if(null!=a.deprecationHandler&&a.deprecationHandler(null,b),d){for(var e,f=[],g=0;g<arguments.length;g++){if(e="","object"==typeof arguments[g]){e+="\n["+g+"] ";for(var h in arguments[0])e+=h+": "+arguments[0][h]+", ";e=e.slice(0,-2)}else e=arguments[g];f.push(e)}w(b+"\nArguments: "+Array.prototype.slice.call(f).join("")+"\n"+(new Error).stack),d=!1}return c.apply(this,arguments)},c)}function y(b,c){null!=a.deprecationHandler&&a.deprecationHandler(b,c),we[b]||(w(c),we[b]=!0)}function z(a){return a instanceof Function||"[object Function]"===Object.prototype.toString.call(a)}function A(a){var b,c;for(c in a)b=a[c],z(b)?this[c]=b:this["_"+c]=b;this._config=a,this._dayOfMonthOrdinalParseLenient=new RegExp((this._dayOfMonthOrdinalParse.source||this._ordinalParse.source)+"|"+/\d{1,2}/.source)}function B(a,b){var c,e=k({},a);for(c in b)j(b,c)&&(d(a[c])&&d(b[c])?(e[c]={},k(e[c],a[c]),k(e[c],b[c])):null!=b[c]?e[c]=b[c]:delete e[c]);for(c in a)j(a,c)&&!j(b,c)&&d(a[c])&&(e[c]=k({},e[c]));return e}function C(a){null!=a&&this.set(a)}function D(a,b,c){var d=this._calendar[a]||this._calendar.sameElse;return z(d)?d.call(b,c):d}function E(a){var b=this._longDateFormat[a],c=this._longDateFormat[a.toUpperCase()];return b||!c?b:(this._longDateFormat[a]=c.replace(/MMMM|MM|DD|dddd/g,function(a){return a.slice(1)}),this._longDateFormat[a])}function F(){return this._invalidDate}function G(a){return this._ordinal.replace("%d",a)}function H(a,b,c,d){var e=this._relativeTime[c];return z(e)?e(a,b,c,d):e.replace(/%d/i,a)}function I(a,b){var c=this._relativeTime[a>0?"future":"past"];return z(c)?c(b):c.replace(/%s/i,b)}function J(a,b){var c=a.toLowerCase();Ge[c]=Ge[c+"s"]=Ge[b]=a}function K(a){return"string"==typeof a?Ge[a]||Ge[a.toLowerCase()]:void 0}function L(a){var b,c,d={};for(c in a)j(a,c)&&(b=K(c),b&&(d[b]=a[c]));return d}function M(a,b){He[a]=b}function N(a){var b=[];for(var c in a)b.push({unit:c,priority:He[c]});return b.sort(function(a,b){return a.priority-b.priority}),b}function O(b,c){return function(d){return null!=d?(Q(this,b,d),a.updateOffset(this,c),this):P(this,b)}}function P(a,b){return a.isValid()?a._d["get"+(a._isUTC?"UTC":"")+b]():NaN}function Q(a,b,c){a.isValid()&&a._d["set"+(a._isUTC?"UTC":"")+b](c)}function R(a){return a=K(a),z(this[a])?this[a]():this}function S(a,b){if("object"==typeof a){a=L(a);for(var c=N(a),d=0;d<c.length;d++)this[c[d].unit](a[c[d].unit])}else if(a=K(a),z(this[a]))return this[a](b);return this}function T(a,b,c){var d=""+Math.abs(a),e=b-d.length,f=a>=0;return(f?c?"+":"":"-")+Math.pow(10,Math.max(0,e)).toString().substr(1)+d}function U(a,b,c,d){var e=d;"string"==typeof d&&(e=function(){return this[d]()}),a&&(Le[a]=e),b&&(Le[b[0]]=function(){return T(e.apply(this,arguments),b[1],b[2])}),c&&(Le[c]=function(){return this.localeData().ordinal(e.apply(this,arguments),a)})}function V(a){return a.match(/\[[\s\S]/)?a.replace(/^\[|\]$/g,""):a.replace(/\\/g,"")}function W(a){var b,c,d=a.match(Ie);for(b=0,c=d.length;b<c;b++)Le[d[b]]?d[b]=Le[d[b]]:d[b]=V(d[b]);return function(b){var e,f="";for(e=0;e<c;e++)f+=z(d[e])?d[e].call(b,a):d[e];return f}}function X(a,b){return a.isValid()?(b=Y(b,a.localeData()),Ke[b]=Ke[b]||W(b),Ke[b](a)):a.localeData().invalidDate()}function Y(a,b){function c(a){return b.longDateFormat(a)||a}var d=5;for(Je.lastIndex=0;d>=0&&Je.test(a);)a=a.replace(Je,c),Je.lastIndex=0,d-=1;return a}function Z(a,b,c){bf[a]=z(b)?b:function(a,d){return a&&c?c:b}}function $(a,b){return j(bf,a)?bf[a](b._strict,b._locale):new RegExp(_(a))}function _(a){return aa(a.replace("\\","").replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g,function(a,b,c,d,e){return b||c||d||e}))}function aa(a){return a.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&")}function ba(a,b){var c,d=b;for("string"==typeof a&&(a=[a]),g(b)&&(d=function(a,c){c[b]=u(a)}),c=0;c<a.length;c++)cf[a[c]]=d}function ca(a,b){ba(a,function(a,c,d,e){d._w=d._w||{},b(a,d._w,d,e)})}function da(a,b,c){null!=b&&j(cf,a)&&cf[a](b,c._a,c,a)}function ea(a,b){return new Date(Date.UTC(a,b+1,0)).getUTCDate()}function fa(a,b){return a?c(this._months)?this._months[a.month()]:this._months[(this._months.isFormat||of).test(b)?"format":"standalone"][a.month()]:c(this._months)?this._months:this._months.standalone}function ga(a,b){return a?c(this._monthsShort)?this._monthsShort[a.month()]:this._monthsShort[of.test(b)?"format":"standalone"][a.month()]:c(this._monthsShort)?this._monthsShort:this._monthsShort.standalone}function ha(a,b,c){var d,e,f,g=a.toLocaleLowerCase();if(!this._monthsParse)for(this._monthsParse=[],this._longMonthsParse=[],this._shortMonthsParse=[],d=0;d<12;++d)f=l([2e3,d]),this._shortMonthsParse[d]=this.monthsShort(f,"").toLocaleLowerCase(),this._longMonthsParse[d]=this.months(f,"").toLocaleLowerCase();return c?"MMM"===b?(e=nf.call(this._shortMonthsParse,g),e!==-1?e:null):(e=nf.call(this._longMonthsParse,g),e!==-1?e:null):"MMM"===b?(e=nf.call(this._shortMonthsParse,g),e!==-1?e:(e=nf.call(this._longMonthsParse,g),e!==-1?e:null)):(e=nf.call(this._longMonthsParse,g),e!==-1?e:(e=nf.call(this._shortMonthsParse,g),e!==-1?e:null))}function ia(a,b,c){var d,e,f;if(this._monthsParseExact)return ha.call(this,a,b,c);for(this._monthsParse||(this._monthsParse=[],this._longMonthsParse=[],this._shortMonthsParse=[]),d=0;d<12;d++){if(e=l([2e3,d]),c&&!this._longMonthsParse[d]&&(this._longMonthsParse[d]=new RegExp("^"+this.months(e,"").replace(".","")+"$","i"),this._shortMonthsParse[d]=new RegExp("^"+this.monthsShort(e,"").replace(".","")+"$","i")),c||this._monthsParse[d]||(f="^"+this.months(e,"")+"|^"+this.monthsShort(e,""),this._monthsParse[d]=new RegExp(f.replace(".",""),"i")),c&&"MMMM"===b&&this._longMonthsParse[d].test(a))return d;if(c&&"MMM"===b&&this._shortMonthsParse[d].test(a))return d;if(!c&&this._monthsParse[d].test(a))return d}}function ja(a,b){var c;if(!a.isValid())return a;if("string"==typeof b)if(/^\d+$/.test(b))b=u(b);else if(b=a.localeData().monthsParse(b),!g(b))return a;return c=Math.min(a.date(),ea(a.year(),b)),a._d["set"+(a._isUTC?"UTC":"")+"Month"](b,c),a}function ka(b){return null!=b?(ja(this,b),a.updateOffset(this,!0),this):P(this,"Month")}function la(){return ea(this.year(),this.month())}function ma(a){return this._monthsParseExact?(j(this,"_monthsRegex")||oa.call(this),a?this._monthsShortStrictRegex:this._monthsShortRegex):(j(this,"_monthsShortRegex")||(this._monthsShortRegex=rf),this._monthsShortStrictRegex&&a?this._monthsShortStrictRegex:this._monthsShortRegex)}function na(a){return this._monthsParseExact?(j(this,"_monthsRegex")||oa.call(this),a?this._monthsStrictRegex:this._monthsRegex):(j(this,"_monthsRegex")||(this._monthsRegex=sf),this._monthsStrictRegex&&a?this._monthsStrictRegex:this._monthsRegex)}function oa(){function a(a,b){return b.length-a.length}var b,c,d=[],e=[],f=[];for(b=0;b<12;b++)c=l([2e3,b]),d.push(this.monthsShort(c,"")),e.push(this.months(c,"")),f.push(this.months(c,"")),f.push(this.monthsShort(c,""));for(d.sort(a),e.sort(a),f.sort(a),b=0;b<12;b++)d[b]=aa(d[b]),e[b]=aa(e[b]);for(b=0;b<24;b++)f[b]=aa(f[b]);this._monthsRegex=new RegExp("^("+f.join("|")+")","i"),this._monthsShortRegex=this._monthsRegex,this._monthsStrictRegex=new RegExp("^("+e.join("|")+")","i"),this._monthsShortStrictRegex=new RegExp("^("+d.join("|")+")","i")}function pa(a){return qa(a)?366:365}function qa(a){return a%4===0&&a%100!==0||a%400===0}function ra(){return qa(this.year())}function sa(a,b,c,d,e,f,g){var h=new Date(a,b,c,d,e,f,g);return a<100&&a>=0&&isFinite(h.getFullYear())&&h.setFullYear(a),h}function ta(a){var b=new Date(Date.UTC.apply(null,arguments));return a<100&&a>=0&&isFinite(b.getUTCFullYear())&&b.setUTCFullYear(a),b}function ua(a,b,c){var d=7+b-c,e=(7+ta(a,0,d).getUTCDay()-b)%7;return-e+d-1}function va(a,b,c,d,e){var f,g,h=(7+c-d)%7,i=ua(a,d,e),j=1+7*(b-1)+h+i;return j<=0?(f=a-1,g=pa(f)+j):j>pa(a)?(f=a+1,g=j-pa(a)):(f=a,g=j),{year:f,dayOfYear:g}}function wa(a,b,c){var d,e,f=ua(a.year(),b,c),g=Math.floor((a.dayOfYear()-f-1)/7)+1;return g<1?(e=a.year()-1,d=g+xa(e,b,c)):g>xa(a.year(),b,c)?(d=g-xa(a.year(),b,c),e=a.year()+1):(e=a.year(),d=g),{week:d,year:e}}function xa(a,b,c){var d=ua(a,b,c),e=ua(a+1,b,c);return(pa(a)-d+e)/7}function ya(a){return wa(a,this._week.dow,this._week.doy).week}function za(){return this._week.dow}function Aa(){return this._week.doy}function Ba(a){var b=this.localeData().week(this);return null==a?b:this.add(7*(a-b),"d")}function Ca(a){var b=wa(this,1,4).week;return null==a?b:this.add(7*(a-b),"d")}function Da(a,b){return"string"!=typeof a?a:isNaN(a)?(a=b.weekdaysParse(a),"number"==typeof a?a:null):parseInt(a,10)}function Ea(a,b){return"string"==typeof a?b.weekdaysParse(a)%7||7:isNaN(a)?null:a}function Fa(a,b){return a?c(this._weekdays)?this._weekdays[a.day()]:this._weekdays[this._weekdays.isFormat.test(b)?"format":"standalone"][a.day()]:c(this._weekdays)?this._weekdays:this._weekdays.standalone}function Ga(a){return a?this._weekdaysShort[a.day()]:this._weekdaysShort}function Ha(a){return a?this._weekdaysMin[a.day()]:this._weekdaysMin}function Ia(a,b,c){var d,e,f,g=a.toLocaleLowerCase();if(!this._weekdaysParse)for(this._weekdaysParse=[],this._shortWeekdaysParse=[],this._minWeekdaysParse=[],d=0;d<7;++d)f=l([2e3,1]).day(d),this._minWeekdaysParse[d]=this.weekdaysMin(f,"").toLocaleLowerCase(),this._shortWeekdaysParse[d]=this.weekdaysShort(f,"").toLocaleLowerCase(),this._weekdaysParse[d]=this.weekdays(f,"").toLocaleLowerCase();return c?"dddd"===b?(e=nf.call(this._weekdaysParse,g),e!==-1?e:null):"ddd"===b?(e=nf.call(this._shortWeekdaysParse,g),e!==-1?e:null):(e=nf.call(this._minWeekdaysParse,g),e!==-1?e:null):"dddd"===b?(e=nf.call(this._weekdaysParse,g),e!==-1?e:(e=nf.call(this._shortWeekdaysParse,g),e!==-1?e:(e=nf.call(this._minWeekdaysParse,g),e!==-1?e:null))):"ddd"===b?(e=nf.call(this._shortWeekdaysParse,g),e!==-1?e:(e=nf.call(this._weekdaysParse,g),e!==-1?e:(e=nf.call(this._minWeekdaysParse,g),e!==-1?e:null))):(e=nf.call(this._minWeekdaysParse,g),e!==-1?e:(e=nf.call(this._weekdaysParse,g),e!==-1?e:(e=nf.call(this._shortWeekdaysParse,g),e!==-1?e:null)))}function Ja(a,b,c){var d,e,f;if(this._weekdaysParseExact)return Ia.call(this,a,b,c);for(this._weekdaysParse||(this._weekdaysParse=[],this._minWeekdaysParse=[],this._shortWeekdaysParse=[],this._fullWeekdaysParse=[]),d=0;d<7;d++){if(e=l([2e3,1]).day(d),c&&!this._fullWeekdaysParse[d]&&(this._fullWeekdaysParse[d]=new RegExp("^"+this.weekdays(e,"").replace(".",".?")+"$","i"),this._shortWeekdaysParse[d]=new RegExp("^"+this.weekdaysShort(e,"").replace(".",".?")+"$","i"),this._minWeekdaysParse[d]=new RegExp("^"+this.weekdaysMin(e,"").replace(".",".?")+"$","i")),this._weekdaysParse[d]||(f="^"+this.weekdays(e,"")+"|^"+this.weekdaysShort(e,"")+"|^"+this.weekdaysMin(e,""),this._weekdaysParse[d]=new RegExp(f.replace(".",""),"i")),c&&"dddd"===b&&this._fullWeekdaysParse[d].test(a))return d;if(c&&"ddd"===b&&this._shortWeekdaysParse[d].test(a))return d;if(c&&"dd"===b&&this._minWeekdaysParse[d].test(a))return d;if(!c&&this._weekdaysParse[d].test(a))return d}}function Ka(a){if(!this.isValid())return null!=a?this:NaN;var b=this._isUTC?this._d.getUTCDay():this._d.getDay();return null!=a?(a=Da(a,this.localeData()),this.add(a-b,"d")):b}function La(a){if(!this.isValid())return null!=a?this:NaN;var b=(this.day()+7-this.localeData()._week.dow)%7;return null==a?b:this.add(a-b,"d")}function Ma(a){if(!this.isValid())return null!=a?this:NaN;if(null!=a){var b=Ea(a,this.localeData());return this.day(this.day()%7?b:b-7)}return this.day()||7}function Na(a){return this._weekdaysParseExact?(j(this,"_weekdaysRegex")||Qa.call(this),a?this._weekdaysStrictRegex:this._weekdaysRegex):(j(this,"_weekdaysRegex")||(this._weekdaysRegex=yf),this._weekdaysStrictRegex&&a?this._weekdaysStrictRegex:this._weekdaysRegex)}function Oa(a){return this._weekdaysParseExact?(j(this,"_weekdaysRegex")||Qa.call(this),a?this._weekdaysShortStrictRegex:this._weekdaysShortRegex):(j(this,"_weekdaysShortRegex")||(this._weekdaysShortRegex=zf),this._weekdaysShortStrictRegex&&a?this._weekdaysShortStrictRegex:this._weekdaysShortRegex)}function Pa(a){return this._weekdaysParseExact?(j(this,"_weekdaysRegex")||Qa.call(this),a?this._weekdaysMinStrictRegex:this._weekdaysMinRegex):(j(this,"_weekdaysMinRegex")||(this._weekdaysMinRegex=Af),this._weekdaysMinStrictRegex&&a?this._weekdaysMinStrictRegex:this._weekdaysMinRegex)}function Qa(){function a(a,b){return b.length-a.length}var b,c,d,e,f,g=[],h=[],i=[],j=[];for(b=0;b<7;b++)c=l([2e3,1]).day(b),d=this.weekdaysMin(c,""),e=this.weekdaysShort(c,""),f=this.weekdays(c,""),g.push(d),h.push(e),i.push(f),j.push(d),j.push(e),j.push(f);for(g.sort(a),h.sort(a),i.sort(a),j.sort(a),b=0;b<7;b++)h[b]=aa(h[b]),i[b]=aa(i[b]),j[b]=aa(j[b]);this._weekdaysRegex=new RegExp("^("+j.join("|")+")","i"),this._weekdaysShortRegex=this._weekdaysRegex,this._weekdaysMinRegex=this._weekdaysRegex,this._weekdaysStrictRegex=new RegExp("^("+i.join("|")+")","i"),this._weekdaysShortStrictRegex=new RegExp("^("+h.join("|")+")","i"),this._weekdaysMinStrictRegex=new RegExp("^("+g.join("|")+")","i")}function Ra(){return this.hours()%12||12}function Sa(){return this.hours()||24}function Ta(a,b){U(a,0,0,function(){return this.localeData().meridiem(this.hours(),this.minutes(),b)})}function Ua(a,b){return b._meridiemParse}function Va(a){return"p"===(a+"").toLowerCase().charAt(0)}function Wa(a,b,c){return a>11?c?"pm":"PM":c?"am":"AM"}function Xa(a){return a?a.toLowerCase().replace("_","-"):a}function Ya(a){for(var b,c,d,e,f=0;f<a.length;){for(e=Xa(a[f]).split("-"),b=e.length,c=Xa(a[f+1]),c=c?c.split("-"):null;b>0;){if(d=Za(e.slice(0,b).join("-")))return d;if(c&&c.length>=b&&v(e,c,!0)>=b-1)break;b--}f++}return null}function Za(a){var b=null;if(!Ff[a]&&"undefined"!=typeof module&&module&&module.exports)try{b=Bf._abbr,require("./locale/"+a),$a(b)}catch(a){}return Ff[a]}function $a(a,b){var c;return a&&(c=f(b)?bb(a):_a(a,b),c&&(Bf=c)),Bf._abbr}function _a(a,b){if(null!==b){var c=Ef;if(b.abbr=a,null!=Ff[a])y("defineLocaleOverride","use moment.updateLocale(localeName, config) to change an existing locale. moment.defineLocale(localeName, config) should only be used for creating a new locale See http://momentjs.com/guides/#/warnings/define-locale/ for more info."),c=Ff[a]._config;else if(null!=b.parentLocale){if(null==Ff[b.parentLocale])return Gf[b.parentLocale]||(Gf[b.parentLocale]=[]),Gf[b.parentLocale].push({name:a,config:b}),null;c=Ff[b.parentLocale]._config}return Ff[a]=new C(B(c,b)),Gf[a]&&Gf[a].forEach(function(a){_a(a.name,a.config)}),$a(a),Ff[a]}return delete Ff[a],null}function ab(a,b){if(null!=b){var c,d=Ef;null!=Ff[a]&&(d=Ff[a]._config),b=B(d,b),c=new C(b),c.parentLocale=Ff[a],Ff[a]=c,$a(a)}else null!=Ff[a]&&(null!=Ff[a].parentLocale?Ff[a]=Ff[a].parentLocale:null!=Ff[a]&&delete Ff[a]);return Ff[a]}function bb(a){var b;if(a&&a._locale&&a._locale._abbr&&(a=a._locale._abbr),!a)return Bf;if(!c(a)){if(b=Za(a))return b;a=[a]}return Ya(a)}function cb(){return ze(Ff)}function db(a){var b,c=a._a;return c&&n(a).overflow===-2&&(b=c[ef]<0||c[ef]>11?ef:c[ff]<1||c[ff]>ea(c[df],c[ef])?ff:c[gf]<0||c[gf]>24||24===c[gf]&&(0!==c[hf]||0!==c[jf]||0!==c[kf])?gf:c[hf]<0||c[hf]>59?hf:c[jf]<0||c[jf]>59?jf:c[kf]<0||c[kf]>999?kf:-1,n(a)._overflowDayOfYear&&(b<df||b>ff)&&(b=ff),n(a)._overflowWeeks&&b===-1&&(b=lf),n(a)._overflowWeekday&&b===-1&&(b=mf),n(a).overflow=b),a}function eb(a){var b,c,d,e,f,g,h=a._i,i=Hf.exec(h)||If.exec(h);if(i){for(n(a).iso=!0,b=0,c=Kf.length;b<c;b++)if(Kf[b][1].exec(i[1])){e=Kf[b][0],d=Kf[b][2]!==!1;break}if(null==e)return void(a._isValid=!1);if(i[3]){for(b=0,c=Lf.length;b<c;b++)if(Lf[b][1].exec(i[3])){f=(i[2]||" ")+Lf[b][0];break}if(null==f)return void(a._isValid=!1)}if(!d&&null!=f)return void(a._isValid=!1);if(i[4]){if(!Jf.exec(i[4]))return void(a._isValid=!1);g="Z"}a._f=e+(f||"")+(g||""),lb(a)}else a._isValid=!1}function fb(a){var b,c,d,e,f,g,h,i,j={" GMT":" +0000"," EDT":" -0400"," EST":" -0500"," CDT":" -0500"," CST":" -0600"," MDT":" -0600"," MST":" -0700"," PDT":" -0700"," PST":" -0800"},k="YXWVUTSRQPONZABCDEFGHIKLM";if(b=a._i.replace(/\([^\)]*\)|[\n\t]/g," ").replace(/(\s\s+)/g," ").replace(/^\s|\s$/g,""),c=Nf.exec(b)){if(d=c[1]?"ddd"+(5===c[1].length?", ":" "):"",e="D MMM "+(c[2].length>10?"YYYY ":"YY "),f="HH:mm"+(c[4]?":ss":""),c[1]){var l=new Date(c[2]),m=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"][l.getDay()];if(c[1].substr(0,3)!==m)return n(a).weekdayMismatch=!0,void(a._isValid=!1)}switch(c[5].length){case 2:0===i?h=" +0000":(i=k.indexOf(c[5][1].toUpperCase())-12,h=(i<0?" -":" +")+(""+i).replace(/^-?/,"0").match(/..$/)[0]+"00");break;case 4:h=j[c[5]];break;default:h=j[" GMT"]}c[5]=h,a._i=c.splice(1).join(""),g=" ZZ",a._f=d+e+f+g,lb(a),n(a).rfc2822=!0}else a._isValid=!1}function gb(b){var c=Mf.exec(b._i);return null!==c?void(b._d=new Date(+c[1])):(eb(b),void(b._isValid===!1&&(delete b._isValid,fb(b),b._isValid===!1&&(delete b._isValid,a.createFromInputFallback(b)))))}function hb(a,b,c){return null!=a?a:null!=b?b:c}function ib(b){var c=new Date(a.now());return b._useUTC?[c.getUTCFullYear(),c.getUTCMonth(),c.getUTCDate()]:[c.getFullYear(),c.getMonth(),c.getDate()]}function jb(a){var b,c,d,e,f=[];if(!a._d){for(d=ib(a),a._w&&null==a._a[ff]&&null==a._a[ef]&&kb(a),null!=a._dayOfYear&&(e=hb(a._a[df],d[df]),(a._dayOfYear>pa(e)||0===a._dayOfYear)&&(n(a)._overflowDayOfYear=!0),c=ta(e,0,a._dayOfYear),a._a[ef]=c.getUTCMonth(),a._a[ff]=c.getUTCDate()),b=0;b<3&&null==a._a[b];++b)a._a[b]=f[b]=d[b];for(;b<7;b++)a._a[b]=f[b]=null==a._a[b]?2===b?1:0:a._a[b];24===a._a[gf]&&0===a._a[hf]&&0===a._a[jf]&&0===a._a[kf]&&(a._nextDay=!0,a._a[gf]=0),a._d=(a._useUTC?ta:sa).apply(null,f),null!=a._tzm&&a._d.setUTCMinutes(a._d.getUTCMinutes()-a._tzm),a._nextDay&&(a._a[gf]=24)}}function kb(a){var b,c,d,e,f,g,h,i;if(b=a._w,null!=b.GG||null!=b.W||null!=b.E)f=1,g=4,c=hb(b.GG,a._a[df],wa(tb(),1,4).year),d=hb(b.W,1),e=hb(b.E,1),(e<1||e>7)&&(i=!0);else{f=a._locale._week.dow,g=a._locale._week.doy;var j=wa(tb(),f,g);c=hb(b.gg,a._a[df],j.year),d=hb(b.w,j.week),null!=b.d?(e=b.d,(e<0||e>6)&&(i=!0)):null!=b.e?(e=b.e+f,(b.e<0||b.e>6)&&(i=!0)):e=f}d<1||d>xa(c,f,g)?n(a)._overflowWeeks=!0:null!=i?n(a)._overflowWeekday=!0:(h=va(c,d,e,f,g),a._a[df]=h.year,a._dayOfYear=h.dayOfYear)}function lb(b){if(b._f===a.ISO_8601)return void eb(b);if(b._f===a.RFC_2822)return void fb(b);b._a=[],n(b).empty=!0;var c,d,e,f,g,h=""+b._i,i=h.length,j=0;for(e=Y(b._f,b._locale).match(Ie)||[],c=0;c<e.length;c++)f=e[c],d=(h.match($(f,b))||[])[0],d&&(g=h.substr(0,h.indexOf(d)),g.length>0&&n(b).unusedInput.push(g),h=h.slice(h.indexOf(d)+d.length),j+=d.length),Le[f]?(d?n(b).empty=!1:n(b).unusedTokens.push(f),da(f,d,b)):b._strict&&!d&&n(b).unusedTokens.push(f);n(b).charsLeftOver=i-j,h.length>0&&n(b).unusedInput.push(h),b._a[gf]<=12&&n(b).bigHour===!0&&b._a[gf]>0&&(n(b).bigHour=void 0),n(b).parsedDateParts=b._a.slice(0),n(b).meridiem=b._meridiem,b._a[gf]=mb(b._locale,b._a[gf],b._meridiem),jb(b),db(b)}function mb(a,b,c){var d;return null==c?b:null!=a.meridiemHour?a.meridiemHour(b,c):null!=a.isPM?(d=a.isPM(c),d&&b<12&&(b+=12),d||12!==b||(b=0),b):b}function nb(a){var b,c,d,e,f;if(0===a._f.length)return n(a).invalidFormat=!0,void(a._d=new Date(NaN));for(e=0;e<a._f.length;e++)f=0,b=q({},a),null!=a._useUTC&&(b._useUTC=a._useUTC),b._f=a._f[e],lb(b),o(b)&&(f+=n(b).charsLeftOver,f+=10*n(b).unusedTokens.length,n(b).score=f,(null==d||f<d)&&(d=f,c=b));k(a,c||b)}function ob(a){if(!a._d){var b=L(a._i);a._a=i([b.year,b.month,b.day||b.date,b.hour,b.minute,b.second,b.millisecond],function(a){return a&&parseInt(a,10)}),jb(a)}}function pb(a){var b=new r(db(qb(a)));return b._nextDay&&(b.add(1,"d"),b._nextDay=void 0),b}function qb(a){var b=a._i,d=a._f;return a._locale=a._locale||bb(a._l),null===b||void 0===d&&""===b?p({nullInput:!0}):("string"==typeof b&&(a._i=b=a._locale.preparse(b)),s(b)?new r(db(b)):(h(b)?a._d=b:c(d)?nb(a):d?lb(a):rb(a),o(a)||(a._d=null),a))}function rb(b){var e=b._i;f(e)?b._d=new Date(a.now()):h(e)?b._d=new Date(e.valueOf()):"string"==typeof e?gb(b):c(e)?(b._a=i(e.slice(0),function(a){return parseInt(a,10)}),jb(b)):d(e)?ob(b):g(e)?b._d=new Date(e):a.createFromInputFallback(b)}function sb(a,b,f,g,h){var i={};return f!==!0&&f!==!1||(g=f,f=void 0),(d(a)&&e(a)||c(a)&&0===a.length)&&(a=void 0),i._isAMomentObject=!0,i._useUTC=i._isUTC=h,i._l=f,i._i=a,i._f=b,i._strict=g,pb(i)}function tb(a,b,c,d){return sb(a,b,c,d,!1)}function ub(a,b){var d,e;if(1===b.length&&c(b[0])&&(b=b[0]),!b.length)return tb();for(d=b[0],e=1;e<b.length;++e)b[e].isValid()&&!b[e][a](d)||(d=b[e]);return d}function vb(){var a=[].slice.call(arguments,0);return ub("isBefore",a)}function wb(){var a=[].slice.call(arguments,0);return ub("isAfter",a)}function xb(a){for(var b in a)if(Rf.indexOf(b)===-1||null!=a[b]&&isNaN(a[b]))return!1;for(var c=!1,d=0;d<Rf.length;++d)if(a[Rf[d]]){if(c)return!1;parseFloat(a[Rf[d]])!==u(a[Rf[d]])&&(c=!0)}return!0}function yb(){return this._isValid}function zb(){return Sb(NaN)}function Ab(a){var b=L(a),c=b.year||0,d=b.quarter||0,e=b.month||0,f=b.week||0,g=b.day||0,h=b.hour||0,i=b.minute||0,j=b.second||0,k=b.millisecond||0;this._isValid=xb(b),this._milliseconds=+k+1e3*j+6e4*i+1e3*h*60*60,this._days=+g+7*f,this._months=+e+3*d+12*c,this._data={},this._locale=bb(),this._bubble()}function Bb(a){return a instanceof Ab}function Cb(a){return a<0?Math.round(-1*a)*-1:Math.round(a)}function Db(a,b){U(a,0,0,function(){var a=this.utcOffset(),c="+";return a<0&&(a=-a,c="-"),c+T(~~(a/60),2)+b+T(~~a%60,2)})}function Eb(a,b){var c=(b||"").match(a);if(null===c)return null;var d=c[c.length-1]||[],e=(d+"").match(Sf)||["-",0,0],f=+(60*e[1])+u(e[2]);return 0===f?0:"+"===e[0]?f:-f}function Fb(b,c){var d,e;return c._isUTC?(d=c.clone(),e=(s(b)||h(b)?b.valueOf():tb(b).valueOf())-d.valueOf(),d._d.setTime(d._d.valueOf()+e),a.updateOffset(d,!1),d):tb(b).local()}function Gb(a){return 15*-Math.round(a._d.getTimezoneOffset()/15)}function Hb(b,c,d){var e,f=this._offset||0;if(!this.isValid())return null!=b?this:NaN;if(null!=b){if("string"==typeof b){if(b=Eb($e,b),null===b)return this}else Math.abs(b)<16&&!d&&(b=60*b);return!this._isUTC&&c&&(e=Gb(this)),this._offset=b,this._isUTC=!0,null!=e&&this.add(e,"m"),f!==b&&(!c||this._changeInProgress?Xb(this,Sb(b-f,"m"),1,!1):this._changeInProgress||(this._changeInProgress=!0,a.updateOffset(this,!0),this._changeInProgress=null)),this}return this._isUTC?f:Gb(this)}function Ib(a,b){return null!=a?("string"!=typeof a&&(a=-a),this.utcOffset(a,b),this):-this.utcOffset()}function Jb(a){return this.utcOffset(0,a)}function Kb(a){return this._isUTC&&(this.utcOffset(0,a),this._isUTC=!1,a&&this.subtract(Gb(this),"m")),this}function Lb(){if(null!=this._tzm)this.utcOffset(this._tzm,!1,!0);else if("string"==typeof this._i){var a=Eb(Ze,this._i);null!=a?this.utcOffset(a):this.utcOffset(0,!0)}return this}function Mb(a){return!!this.isValid()&&(a=a?tb(a).utcOffset():0,(this.utcOffset()-a)%60===0)}function Nb(){return this.utcOffset()>this.clone().month(0).utcOffset()||this.utcOffset()>this.clone().month(5).utcOffset()}function Ob(){if(!f(this._isDSTShifted))return this._isDSTShifted;var a={};if(q(a,this),a=qb(a),a._a){var b=a._isUTC?l(a._a):tb(a._a);this._isDSTShifted=this.isValid()&&v(a._a,b.toArray())>0}else this._isDSTShifted=!1;return this._isDSTShifted}function Pb(){return!!this.isValid()&&!this._isUTC}function Qb(){return!!this.isValid()&&this._isUTC}function Rb(){return!!this.isValid()&&(this._isUTC&&0===this._offset)}function Sb(a,b){var c,d,e,f=a,h=null;return Bb(a)?f={ms:a._milliseconds,d:a._days,M:a._months}:g(a)?(f={},b?f[b]=a:f.milliseconds=a):(h=Tf.exec(a))?(c="-"===h[1]?-1:1,f={y:0,d:u(h[ff])*c,h:u(h[gf])*c,m:u(h[hf])*c,s:u(h[jf])*c,ms:u(Cb(1e3*h[kf]))*c}):(h=Uf.exec(a))?(c="-"===h[1]?-1:1,f={y:Tb(h[2],c),M:Tb(h[3],c),w:Tb(h[4],c),d:Tb(h[5],c),h:Tb(h[6],c),m:Tb(h[7],c),s:Tb(h[8],c)}):null==f?f={}:"object"==typeof f&&("from"in f||"to"in f)&&(e=Vb(tb(f.from),tb(f.to)),f={},f.ms=e.milliseconds,f.M=e.months),d=new Ab(f),Bb(a)&&j(a,"_locale")&&(d._locale=a._locale),d}function Tb(a,b){var c=a&&parseFloat(a.replace(",","."));return(isNaN(c)?0:c)*b}function Ub(a,b){var c={milliseconds:0,months:0};return c.months=b.month()-a.month()+12*(b.year()-a.year()),a.clone().add(c.months,"M").isAfter(b)&&--c.months,c.milliseconds=+b-+a.clone().add(c.months,"M"),c}function Vb(a,b){var c;return a.isValid()&&b.isValid()?(b=Fb(b,a),a.isBefore(b)?c=Ub(a,b):(c=Ub(b,a),c.milliseconds=-c.milliseconds,c.months=-c.months),c):{milliseconds:0,months:0}}function Wb(a,b){return function(c,d){var e,f;return null===d||isNaN(+d)||(y(b,"moment()."+b+"(period, number) is deprecated. Please use moment()."+b+"(number, period). See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info."),f=c,c=d,d=f),c="string"==typeof c?+c:c,e=Sb(c,d),Xb(this,e,a),this}}function Xb(b,c,d,e){var f=c._milliseconds,g=Cb(c._days),h=Cb(c._months);b.isValid()&&(e=null==e||e,f&&b._d.setTime(b._d.valueOf()+f*d),g&&Q(b,"Date",P(b,"Date")+g*d),h&&ja(b,P(b,"Month")+h*d),e&&a.updateOffset(b,g||h))}function Yb(a,b){var c=a.diff(b,"days",!0);return c<-6?"sameElse":c<-1?"lastWeek":c<0?"lastDay":c<1?"sameDay":c<2?"nextDay":c<7?"nextWeek":"sameElse"}function Zb(b,c){var d=b||tb(),e=Fb(d,this).startOf("day"),f=a.calendarFormat(this,e)||"sameElse",g=c&&(z(c[f])?c[f].call(this,d):c[f]);return this.format(g||this.localeData().calendar(f,this,tb(d)))}function $b(){return new r(this)}function _b(a,b){var c=s(a)?a:tb(a);return!(!this.isValid()||!c.isValid())&&(b=K(f(b)?"millisecond":b),"millisecond"===b?this.valueOf()>c.valueOf():c.valueOf()<this.clone().startOf(b).valueOf())}function ac(a,b){var c=s(a)?a:tb(a);return!(!this.isValid()||!c.isValid())&&(b=K(f(b)?"millisecond":b),"millisecond"===b?this.valueOf()<c.valueOf():this.clone().endOf(b).valueOf()<c.valueOf())}function bc(a,b,c,d){return d=d||"()",("("===d[0]?this.isAfter(a,c):!this.isBefore(a,c))&&(")"===d[1]?this.isBefore(b,c):!this.isAfter(b,c))}function cc(a,b){var c,d=s(a)?a:tb(a);return!(!this.isValid()||!d.isValid())&&(b=K(b||"millisecond"),"millisecond"===b?this.valueOf()===d.valueOf():(c=d.valueOf(),this.clone().startOf(b).valueOf()<=c&&c<=this.clone().endOf(b).valueOf()))}function dc(a,b){return this.isSame(a,b)||this.isAfter(a,b)}function ec(a,b){return this.isSame(a,b)||this.isBefore(a,b)}function fc(a,b,c){var d,e,f,g;return this.isValid()?(d=Fb(a,this),d.isValid()?(e=6e4*(d.utcOffset()-this.utcOffset()),b=K(b),"year"===b||"month"===b||"quarter"===b?(g=gc(this,d),"quarter"===b?g/=3:"year"===b&&(g/=12)):(f=this-d,g="second"===b?f/1e3:"minute"===b?f/6e4:"hour"===b?f/36e5:"day"===b?(f-e)/864e5:"week"===b?(f-e)/6048e5:f),c?g:t(g)):NaN):NaN}function gc(a,b){var c,d,e=12*(b.year()-a.year())+(b.month()-a.month()),f=a.clone().add(e,"months");return b-f<0?(c=a.clone().add(e-1,"months"),d=(b-f)/(f-c)):(c=a.clone().add(e+1,"months"),d=(b-f)/(c-f)),-(e+d)||0}function hc(){return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")}function ic(){if(!this.isValid())return null;var a=this.clone().utc();return a.year()<0||a.year()>9999?X(a,"YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]"):z(Date.prototype.toISOString)?this.toDate().toISOString():X(a,"YYYY-MM-DD[T]HH:mm:ss.SSS[Z]")}function jc(){if(!this.isValid())return"moment.invalid(/* "+this._i+" */)";var a="moment",b="";this.isLocal()||(a=0===this.utcOffset()?"moment.utc":"moment.parseZone",b="Z");var c="["+a+'("]',d=0<=this.year()&&this.year()<=9999?"YYYY":"YYYYYY",e="-MM-DD[T]HH:mm:ss.SSS",f=b+'[")]';return this.format(c+d+e+f)}function kc(b){b||(b=this.isUtc()?a.defaultFormatUtc:a.defaultFormat);var c=X(this,b);return this.localeData().postformat(c)}function lc(a,b){return this.isValid()&&(s(a)&&a.isValid()||tb(a).isValid())?Sb({to:this,from:a}).locale(this.locale()).humanize(!b):this.localeData().invalidDate()}function mc(a){return this.from(tb(),a)}function nc(a,b){return this.isValid()&&(s(a)&&a.isValid()||tb(a).isValid())?Sb({from:this,to:a}).locale(this.locale()).humanize(!b):this.localeData().invalidDate()}function oc(a){return this.to(tb(),a)}function pc(a){var b;return void 0===a?this._locale._abbr:(b=bb(a),null!=b&&(this._locale=b),this)}function qc(){return this._locale}function rc(a){switch(a=K(a)){case"year":this.month(0);case"quarter":case"month":this.date(1);case"week":case"isoWeek":case"day":case"date":this.hours(0);case"hour":this.minutes(0);case"minute":this.seconds(0);case"second":this.milliseconds(0)}return"week"===a&&this.weekday(0),"isoWeek"===a&&this.isoWeekday(1),"quarter"===a&&this.month(3*Math.floor(this.month()/3)),this}function sc(a){return a=K(a),void 0===a||"millisecond"===a?this:("date"===a&&(a="day"),this.startOf(a).add(1,"isoWeek"===a?"week":a).subtract(1,"ms"))}function tc(){return this._d.valueOf()-6e4*(this._offset||0)}function uc(){return Math.floor(this.valueOf()/1e3)}function vc(){return new Date(this.valueOf())}function wc(){var a=this;return[a.year(),a.month(),a.date(),a.hour(),a.minute(),a.second(),a.millisecond()]}function xc(){var a=this;return{years:a.year(),months:a.month(),date:a.date(),hours:a.hours(),minutes:a.minutes(),seconds:a.seconds(),milliseconds:a.milliseconds()}}function yc(){return this.isValid()?this.toISOString():null}function zc(){return o(this)}function Ac(){
return k({},n(this))}function Bc(){return n(this).overflow}function Cc(){return{input:this._i,format:this._f,locale:this._locale,isUTC:this._isUTC,strict:this._strict}}function Dc(a,b){U(0,[a,a.length],0,b)}function Ec(a){return Ic.call(this,a,this.week(),this.weekday(),this.localeData()._week.dow,this.localeData()._week.doy)}function Fc(a){return Ic.call(this,a,this.isoWeek(),this.isoWeekday(),1,4)}function Gc(){return xa(this.year(),1,4)}function Hc(){var a=this.localeData()._week;return xa(this.year(),a.dow,a.doy)}function Ic(a,b,c,d,e){var f;return null==a?wa(this,d,e).year:(f=xa(a,d,e),b>f&&(b=f),Jc.call(this,a,b,c,d,e))}function Jc(a,b,c,d,e){var f=va(a,b,c,d,e),g=ta(f.year,0,f.dayOfYear);return this.year(g.getUTCFullYear()),this.month(g.getUTCMonth()),this.date(g.getUTCDate()),this}function Kc(a){return null==a?Math.ceil((this.month()+1)/3):this.month(3*(a-1)+this.month()%3)}function Lc(a){var b=Math.round((this.clone().startOf("day")-this.clone().startOf("year"))/864e5)+1;return null==a?b:this.add(a-b,"d")}function Mc(a,b){b[kf]=u(1e3*("0."+a))}function Nc(){return this._isUTC?"UTC":""}function Oc(){return this._isUTC?"Coordinated Universal Time":""}function Pc(a){return tb(1e3*a)}function Qc(){return tb.apply(null,arguments).parseZone()}function Rc(a){return a}function Sc(a,b,c,d){var e=bb(),f=l().set(d,b);return e[c](f,a)}function Tc(a,b,c){if(g(a)&&(b=a,a=void 0),a=a||"",null!=b)return Sc(a,b,c,"month");var d,e=[];for(d=0;d<12;d++)e[d]=Sc(a,d,c,"month");return e}function Uc(a,b,c,d){"boolean"==typeof a?(g(b)&&(c=b,b=void 0),b=b||""):(b=a,c=b,a=!1,g(b)&&(c=b,b=void 0),b=b||"");var e=bb(),f=a?e._week.dow:0;if(null!=c)return Sc(b,(c+f)%7,d,"day");var h,i=[];for(h=0;h<7;h++)i[h]=Sc(b,(h+f)%7,d,"day");return i}function Vc(a,b){return Tc(a,b,"months")}function Wc(a,b){return Tc(a,b,"monthsShort")}function Xc(a,b,c){return Uc(a,b,c,"weekdays")}function Yc(a,b,c){return Uc(a,b,c,"weekdaysShort")}function Zc(a,b,c){return Uc(a,b,c,"weekdaysMin")}function $c(){var a=this._data;return this._milliseconds=dg(this._milliseconds),this._days=dg(this._days),this._months=dg(this._months),a.milliseconds=dg(a.milliseconds),a.seconds=dg(a.seconds),a.minutes=dg(a.minutes),a.hours=dg(a.hours),a.months=dg(a.months),a.years=dg(a.years),this}function _c(a,b,c,d){var e=Sb(b,c);return a._milliseconds+=d*e._milliseconds,a._days+=d*e._days,a._months+=d*e._months,a._bubble()}function ad(a,b){return _c(this,a,b,1)}function bd(a,b){return _c(this,a,b,-1)}function cd(a){return a<0?Math.floor(a):Math.ceil(a)}function dd(){var a,b,c,d,e,f=this._milliseconds,g=this._days,h=this._months,i=this._data;return f>=0&&g>=0&&h>=0||f<=0&&g<=0&&h<=0||(f+=864e5*cd(fd(h)+g),g=0,h=0),i.milliseconds=f%1e3,a=t(f/1e3),i.seconds=a%60,b=t(a/60),i.minutes=b%60,c=t(b/60),i.hours=c%24,g+=t(c/24),e=t(ed(g)),h+=e,g-=cd(fd(e)),d=t(h/12),h%=12,i.days=g,i.months=h,i.years=d,this}function ed(a){return 4800*a/146097}function fd(a){return 146097*a/4800}function gd(a){if(!this.isValid())return NaN;var b,c,d=this._milliseconds;if(a=K(a),"month"===a||"year"===a)return b=this._days+d/864e5,c=this._months+ed(b),"month"===a?c:c/12;switch(b=this._days+Math.round(fd(this._months)),a){case"week":return b/7+d/6048e5;case"day":return b+d/864e5;case"hour":return 24*b+d/36e5;case"minute":return 1440*b+d/6e4;case"second":return 86400*b+d/1e3;case"millisecond":return Math.floor(864e5*b)+d;default:throw new Error("Unknown unit "+a)}}function hd(){return this.isValid()?this._milliseconds+864e5*this._days+this._months%12*2592e6+31536e6*u(this._months/12):NaN}function id(a){return function(){return this.as(a)}}function jd(a){return a=K(a),this.isValid()?this[a+"s"]():NaN}function kd(a){return function(){return this.isValid()?this._data[a]:NaN}}function ld(){return t(this.days()/7)}function md(a,b,c,d,e){return e.relativeTime(b||1,!!c,a,d)}function nd(a,b,c){var d=Sb(a).abs(),e=tg(d.as("s")),f=tg(d.as("m")),g=tg(d.as("h")),h=tg(d.as("d")),i=tg(d.as("M")),j=tg(d.as("y")),k=e<=ug.ss&&["s",e]||e<ug.s&&["ss",e]||f<=1&&["m"]||f<ug.m&&["mm",f]||g<=1&&["h"]||g<ug.h&&["hh",g]||h<=1&&["d"]||h<ug.d&&["dd",h]||i<=1&&["M"]||i<ug.M&&["MM",i]||j<=1&&["y"]||["yy",j];return k[2]=b,k[3]=+a>0,k[4]=c,md.apply(null,k)}function od(a){return void 0===a?tg:"function"==typeof a&&(tg=a,!0)}function pd(a,b){return void 0!==ug[a]&&(void 0===b?ug[a]:(ug[a]=b,"s"===a&&(ug.ss=b-1),!0))}function qd(a){if(!this.isValid())return this.localeData().invalidDate();var b=this.localeData(),c=nd(this,!a,b);return a&&(c=b.pastFuture(+this,c)),b.postformat(c)}function rd(){if(!this.isValid())return this.localeData().invalidDate();var a,b,c,d=vg(this._milliseconds)/1e3,e=vg(this._days),f=vg(this._months);a=t(d/60),b=t(a/60),d%=60,a%=60,c=t(f/12),f%=12;var g=c,h=f,i=e,j=b,k=a,l=d,m=this.asSeconds();return m?(m<0?"-":"")+"P"+(g?g+"Y":"")+(h?h+"M":"")+(i?i+"D":"")+(j||k||l?"T":"")+(j?j+"H":"")+(k?k+"M":"")+(l?l+"S":""):"P0D"}
//! moment.js locale configuration
//! locale : Belarusian [be]
//! author : Dmitry Demidov : https://github.com/demidov91
//! author: Praleska: http://praleska.pro/
//! Author : Menelion Elensúle : https://github.com/Oire
function sd(a,b){var c=a.split("_");return b%10===1&&b%100!==11?c[0]:b%10>=2&&b%10<=4&&(b%100<10||b%100>=20)?c[1]:c[2]}function td(a,b,c){var d={mm:b?"хвіліна_хвіліны_хвілін":"хвіліну_хвіліны_хвілін",hh:b?"гадзіна_гадзіны_гадзін":"гадзіну_гадзіны_гадзін",dd:"дзень_дні_дзён",MM:"месяц_месяцы_месяцаў",yy:"год_гады_гадоў"};return"m"===c?b?"хвіліна":"хвіліну":"h"===c?b?"гадзіна":"гадзіну":a+" "+sd(d[c],+a)}
//! moment.js locale configuration
//! locale : Breton [br]
//! author : Jean-Baptiste Le Duigou : https://github.com/jbleduigou
function ud(a,b,c){var d={mm:"munutenn",MM:"miz",dd:"devezh"};return a+" "+xd(d[c],a)}function vd(a){switch(wd(a)){case 1:case 3:case 4:case 5:case 9:return a+" bloaz";default:return a+" vloaz"}}function wd(a){return a>9?wd(a%10):a}function xd(a,b){return 2===b?yd(a):a}function yd(a){var b={m:"v",b:"v",d:"z"};return void 0===b[a.charAt(0)]?a:b[a.charAt(0)]+a.substring(1)}
//! moment.js locale configuration
//! locale : Bosnian [bs]
//! author : Nedim Cholich : https://github.com/frontyard
//! based on (hr) translation by Bojan Marković
function zd(a,b,c){var d=a+" ";switch(c){case"m":return b?"jedna minuta":"jedne minute";case"mm":return d+=1===a?"minuta":2===a||3===a||4===a?"minute":"minuta";case"h":return b?"jedan sat":"jednog sata";case"hh":return d+=1===a?"sat":2===a||3===a||4===a?"sata":"sati";case"dd":return d+=1===a?"dan":"dana";case"MM":return d+=1===a?"mjesec":2===a||3===a||4===a?"mjeseca":"mjeseci";case"yy":return d+=1===a?"godina":2===a||3===a||4===a?"godine":"godina"}}function Ad(a){return a>1&&a<5&&1!==~~(a/10)}function Bd(a,b,c,d){var e=a+" ";switch(c){case"s":return b||d?"pár sekund":"pár sekundami";case"m":return b?"minuta":d?"minutu":"minutou";case"mm":return b||d?e+(Ad(a)?"minuty":"minut"):e+"minutami";break;case"h":return b?"hodina":d?"hodinu":"hodinou";case"hh":return b||d?e+(Ad(a)?"hodiny":"hodin"):e+"hodinami";break;case"d":return b||d?"den":"dnem";case"dd":return b||d?e+(Ad(a)?"dny":"dní"):e+"dny";break;case"M":return b||d?"měsíc":"měsícem";case"MM":return b||d?e+(Ad(a)?"měsíce":"měsíců"):e+"měsíci";break;case"y":return b||d?"rok":"rokem";case"yy":return b||d?e+(Ad(a)?"roky":"let"):e+"lety"}}
//! moment.js locale configuration
//! locale : German (Austria) [de-at]
//! author : lluchs : https://github.com/lluchs
//! author: Menelion Elensúle: https://github.com/Oire
//! author : Martin Groller : https://github.com/MadMG
//! author : Mikolaj Dadela : https://github.com/mik01aj
function Cd(a,b,c,d){var e={m:["eine Minute","einer Minute"],h:["eine Stunde","einer Stunde"],d:["ein Tag","einem Tag"],dd:[a+" Tage",a+" Tagen"],M:["ein Monat","einem Monat"],MM:[a+" Monate",a+" Monaten"],y:["ein Jahr","einem Jahr"],yy:[a+" Jahre",a+" Jahren"]};return b?e[c][0]:e[c][1]}
//! moment.js locale configuration
//! locale : German (Switzerland) [de-ch]
//! author : sschueller : https://github.com/sschueller
function Dd(a,b,c,d){var e={m:["eine Minute","einer Minute"],h:["eine Stunde","einer Stunde"],d:["ein Tag","einem Tag"],dd:[a+" Tage",a+" Tagen"],M:["ein Monat","einem Monat"],MM:[a+" Monate",a+" Monaten"],y:["ein Jahr","einem Jahr"],yy:[a+" Jahre",a+" Jahren"]};return b?e[c][0]:e[c][1]}
//! moment.js locale configuration
//! locale : German [de]
//! author : lluchs : https://github.com/lluchs
//! author: Menelion Elensúle: https://github.com/Oire
//! author : Mikolaj Dadela : https://github.com/mik01aj
function Ed(a,b,c,d){var e={m:["eine Minute","einer Minute"],h:["eine Stunde","einer Stunde"],d:["ein Tag","einem Tag"],dd:[a+" Tage",a+" Tagen"],M:["ein Monat","einem Monat"],MM:[a+" Monate",a+" Monaten"],y:["ein Jahr","einem Jahr"],yy:[a+" Jahre",a+" Jahren"]};return b?e[c][0]:e[c][1]}
//! moment.js locale configuration
//! locale : Estonian [et]
//! author : Henry Kehlmann : https://github.com/madhenry
//! improvements : Illimar Tambek : https://github.com/ragulka
function Fd(a,b,c,d){var e={s:["mõne sekundi","mõni sekund","paar sekundit"],m:["ühe minuti","üks minut"],mm:[a+" minuti",a+" minutit"],h:["ühe tunni","tund aega","üks tund"],hh:[a+" tunni",a+" tundi"],d:["ühe päeva","üks päev"],M:["kuu aja","kuu aega","üks kuu"],MM:[a+" kuu",a+" kuud"],y:["ühe aasta","aasta","üks aasta"],yy:[a+" aasta",a+" aastat"]};return b?e[c][2]?e[c][2]:e[c][1]:d?e[c][0]:e[c][1]}function Gd(a,b,c,d){var e="";switch(c){case"s":return d?"muutaman sekunnin":"muutama sekunti";case"m":return d?"minuutin":"minuutti";case"mm":e=d?"minuutin":"minuuttia";break;case"h":return d?"tunnin":"tunti";case"hh":e=d?"tunnin":"tuntia";break;case"d":return d?"päivän":"päivä";case"dd":e=d?"päivän":"päivää";break;case"M":return d?"kuukauden":"kuukausi";case"MM":e=d?"kuukauden":"kuukautta";break;case"y":return d?"vuoden":"vuosi";case"yy":e=d?"vuoden":"vuotta"}return e=Hd(a,d)+" "+e}function Hd(a,b){return a<10?b?$g[a]:Zg[a]:a}
//! moment.js locale configuration
//! locale : Konkani Latin script [gom-latn]
//! author : The Discoverer : https://github.com/WikiDiscoverer
function Id(a,b,c,d){var e={s:["thodde secondanim","thodde second"],m:["eka mintan","ek minute"],mm:[a+" mintanim",a+" mintam"],h:["eka horan","ek hor"],hh:[a+" horanim",a+" hor"],d:["eka disan","ek dis"],dd:[a+" disanim",a+" dis"],M:["eka mhoinean","ek mhoino"],MM:[a+" mhoineanim",a+" mhoine"],y:["eka vorsan","ek voros"],yy:[a+" vorsanim",a+" vorsam"]};return b?e[c][0]:e[c][1]}
//! moment.js locale configuration
//! locale : Croatian [hr]
//! author : Bojan Marković : https://github.com/bmarkovic
function Jd(a,b,c){var d=a+" ";switch(c){case"m":return b?"jedna minuta":"jedne minute";case"mm":return d+=1===a?"minuta":2===a||3===a||4===a?"minute":"minuta";case"h":return b?"jedan sat":"jednog sata";case"hh":return d+=1===a?"sat":2===a||3===a||4===a?"sata":"sati";case"dd":return d+=1===a?"dan":"dana";case"MM":return d+=1===a?"mjesec":2===a||3===a||4===a?"mjeseca":"mjeseci";case"yy":return d+=1===a?"godina":2===a||3===a||4===a?"godine":"godina"}}function Kd(a,b,c,d){var e=a;switch(c){case"s":return d||b?"néhány másodperc":"néhány másodperce";case"m":return"egy"+(d||b?" perc":" perce");case"mm":return e+(d||b?" perc":" perce");case"h":return"egy"+(d||b?" óra":" órája");case"hh":return e+(d||b?" óra":" órája");case"d":return"egy"+(d||b?" nap":" napja");case"dd":return e+(d||b?" nap":" napja");case"M":return"egy"+(d||b?" hónap":" hónapja");case"MM":return e+(d||b?" hónap":" hónapja");case"y":return"egy"+(d||b?" év":" éve");case"yy":return e+(d||b?" év":" éve")}return""}function Ld(a){return(a?"":"[múlt] ")+"["+ih[this.day()]+"] LT[-kor]"}
//! moment.js locale configuration
//! locale : Icelandic [is]
//! author : Hinrik Örn Sigurðsson : https://github.com/hinrik
function Md(a){return a%100===11||a%10!==1}function Nd(a,b,c,d){var e=a+" ";switch(c){case"s":return b||d?"nokkrar sekúndur":"nokkrum sekúndum";case"m":return b?"mínúta":"mínútu";case"mm":return Md(a)?e+(b||d?"mínútur":"mínútum"):b?e+"mínúta":e+"mínútu";case"hh":return Md(a)?e+(b||d?"klukkustundir":"klukkustundum"):e+"klukkustund";case"d":return b?"dagur":d?"dag":"degi";case"dd":return Md(a)?b?e+"dagar":e+(d?"daga":"dögum"):b?e+"dagur":e+(d?"dag":"degi");case"M":return b?"mánuður":d?"mánuð":"mánuði";case"MM":return Md(a)?b?e+"mánuðir":e+(d?"mánuði":"mánuðum"):b?e+"mánuður":e+(d?"mánuð":"mánuði");case"y":return b||d?"ár":"ári";case"yy":return Md(a)?e+(b||d?"ár":"árum"):e+(b||d?"ár":"ári")}}
//! moment.js locale configuration
//! locale : Luxembourgish [lb]
//! author : mweimerskirch : https://github.com/mweimerskirch
//! author : David Raison : https://github.com/kwisatz
function Od(a,b,c,d){var e={m:["eng Minutt","enger Minutt"],h:["eng Stonn","enger Stonn"],d:["een Dag","engem Dag"],M:["ee Mount","engem Mount"],y:["ee Joer","engem Joer"]};return b?e[c][0]:e[c][1]}function Pd(a){var b=a.substr(0,a.indexOf(" "));return Rd(b)?"a "+a:"an "+a}function Qd(a){var b=a.substr(0,a.indexOf(" "));return Rd(b)?"viru "+a:"virun "+a}function Rd(a){if(a=parseInt(a,10),isNaN(a))return!1;if(a<0)return!0;if(a<10)return 4<=a&&a<=7;if(a<100){var b=a%10,c=a/10;return Rd(0===b?c:b)}if(a<1e4){for(;a>=10;)a/=10;return Rd(a)}return a/=1e3,Rd(a)}function Sd(a,b,c,d){return b?"kelios sekundės":d?"kelių sekundžių":"kelias sekundes"}function Td(a,b,c,d){return b?Vd(c)[0]:d?Vd(c)[1]:Vd(c)[2]}function Ud(a){return a%10===0||a>10&&a<20}function Vd(a){return nh[a].split("_")}function Wd(a,b,c,d){var e=a+" ";return 1===a?e+Td(a,b,c[0],d):b?e+(Ud(a)?Vd(c)[1]:Vd(c)[0]):d?e+Vd(c)[1]:e+(Ud(a)?Vd(c)[1]:Vd(c)[2])}function Xd(a,b,c){return c?b%10===1&&b%100!==11?a[2]:a[3]:b%10===1&&b%100!==11?a[0]:a[1]}function Yd(a,b,c){return a+" "+Xd(oh[c],a,b)}function Zd(a,b,c){return Xd(oh[c],a,b)}function $d(a,b){return b?"dažas sekundes":"dažām sekundēm"}function _d(a,b,c,d){var e="";if(b)switch(c){case"s":e="काही सेकंद";break;case"m":e="एक मिनिट";break;case"mm":e="%d मिनिटे";break;case"h":e="एक तास";break;case"hh":e="%d तास";break;case"d":e="एक दिवस";break;case"dd":e="%d दिवस";break;case"M":e="एक महिना";break;case"MM":e="%d महिने";break;case"y":e="एक वर्ष";break;case"yy":e="%d वर्षे"}else switch(c){case"s":e="काही सेकंदां";break;case"m":e="एका मिनिटा";break;case"mm":e="%d मिनिटां";break;case"h":e="एका तासा";break;case"hh":e="%d तासां";break;case"d":e="एका दिवसा";break;case"dd":e="%d दिवसां";break;case"M":e="एका महिन्या";break;case"MM":e="%d महिन्यां";break;case"y":e="एका वर्षा";break;case"yy":e="%d वर्षां"}return e.replace(/%d/i,a)}function ae(a){return a%10<5&&a%10>1&&~~(a/10)%10!==1}function be(a,b,c){var d=a+" ";switch(c){case"m":return b?"minuta":"minutę";case"mm":return d+(ae(a)?"minuty":"minut");case"h":return b?"godzina":"godzinę";case"hh":return d+(ae(a)?"godziny":"godzin");case"MM":return d+(ae(a)?"miesiące":"miesięcy");case"yy":return d+(ae(a)?"lata":"lat")}}
//! moment.js locale configuration
//! locale : Romanian [ro]
//! author : Vlad Gurdiga : https://github.com/gurdiga
//! author : Valentin Agachi : https://github.com/avaly
function ce(a,b,c){var d={mm:"minute",hh:"ore",dd:"zile",MM:"luni",yy:"ani"},e=" ";return(a%100>=20||a>=100&&a%100===0)&&(e=" de "),a+e+d[c]}
//! moment.js locale configuration
//! locale : Russian [ru]
//! author : Viktorminator : https://github.com/Viktorminator
//! Author : Menelion Elensúle : https://github.com/Oire
//! author : Коренберг Марк : https://github.com/socketpair
function de(a,b){var c=a.split("_");return b%10===1&&b%100!==11?c[0]:b%10>=2&&b%10<=4&&(b%100<10||b%100>=20)?c[1]:c[2]}function ee(a,b,c){var d={mm:b?"минута_минуты_минут":"минуту_минуты_минут",hh:"час_часа_часов",dd:"день_дня_дней",MM:"месяц_месяца_месяцев",yy:"год_года_лет"};return"m"===c?b?"минута":"минуту":a+" "+de(d[c],+a)}function fe(a){return a>1&&a<5}function ge(a,b,c,d){var e=a+" ";switch(c){case"s":return b||d?"pár sekúnd":"pár sekundami";case"m":return b?"minúta":d?"minútu":"minútou";case"mm":return b||d?e+(fe(a)?"minúty":"minút"):e+"minútami";break;case"h":return b?"hodina":d?"hodinu":"hodinou";case"hh":return b||d?e+(fe(a)?"hodiny":"hodín"):e+"hodinami";break;case"d":return b||d?"deň":"dňom";case"dd":return b||d?e+(fe(a)?"dni":"dní"):e+"dňami";break;case"M":return b||d?"mesiac":"mesiacom";case"MM":return b||d?e+(fe(a)?"mesiace":"mesiacov"):e+"mesiacmi";break;case"y":return b||d?"rok":"rokom";case"yy":return b||d?e+(fe(a)?"roky":"rokov"):e+"rokmi"}}
//! moment.js locale configuration
//! locale : Slovenian [sl]
//! author : Robert Sedovšek : https://github.com/sedovsek
function he(a,b,c,d){var e=a+" ";switch(c){case"s":return b||d?"nekaj sekund":"nekaj sekundami";case"m":return b?"ena minuta":"eno minuto";case"mm":return e+=1===a?b?"minuta":"minuto":2===a?b||d?"minuti":"minutama":a<5?b||d?"minute":"minutami":b||d?"minut":"minutami";case"h":return b?"ena ura":"eno uro";case"hh":return e+=1===a?b?"ura":"uro":2===a?b||d?"uri":"urama":a<5?b||d?"ure":"urami":b||d?"ur":"urami";case"d":return b||d?"en dan":"enim dnem";case"dd":return e+=1===a?b||d?"dan":"dnem":2===a?b||d?"dni":"dnevoma":b||d?"dni":"dnevi";case"M":return b||d?"en mesec":"enim mesecem";case"MM":return e+=1===a?b||d?"mesec":"mesecem":2===a?b||d?"meseca":"mesecema":a<5?b||d?"mesece":"meseci":b||d?"mesecev":"meseci";case"y":return b||d?"eno leto":"enim letom";case"yy":return e+=1===a?b||d?"leto":"letom":2===a?b||d?"leti":"letoma":a<5?b||d?"leta":"leti":b||d?"let":"leti"}}function ie(a){var b=a;return b=a.indexOf("jaj")!==-1?b.slice(0,-3)+"leS":a.indexOf("jar")!==-1?b.slice(0,-3)+"waQ":a.indexOf("DIS")!==-1?b.slice(0,-3)+"nem":b+" pIq"}function je(a){var b=a;return b=a.indexOf("jaj")!==-1?b.slice(0,-3)+"Hu’":a.indexOf("jar")!==-1?b.slice(0,-3)+"wen":a.indexOf("DIS")!==-1?b.slice(0,-3)+"ben":b+" ret"}function ke(a,b,c,d){var e=le(a);switch(c){case"mm":return e+" tup";case"hh":return e+" rep";case"dd":return e+" jaj";case"MM":return e+" jar";case"yy":return e+" DIS"}}function le(a){var b=Math.floor(a%1e3/100),c=Math.floor(a%100/10),d=a%10,e="";return b>0&&(e+=Rh[b]+"vatlh"),c>0&&(e+=(""!==e?" ":"")+Rh[c]+"maH"),d>0&&(e+=(""!==e?" ":"")+Rh[d]),""===e?"pagh":e}function me(a,b,c,d){var e={s:["viensas secunds","'iensas secunds"],m:["'n míut","'iens míut"],mm:[a+" míuts",""+a+" míuts"],h:["'n þora","'iensa þora"],hh:[a+" þoras",""+a+" þoras"],d:["'n ziua","'iensa ziua"],dd:[a+" ziuas",""+a+" ziuas"],M:["'n mes","'iens mes"],MM:[a+" mesen",""+a+" mesen"],y:["'n ar","'iens ar"],yy:[a+" ars",""+a+" ars"]};return d?e[c][0]:b?e[c][0]:e[c][1]}
//! moment.js locale configuration
//! locale : Ukrainian [uk]
//! author : zemlanin : https://github.com/zemlanin
//! Author : Menelion Elensúle : https://github.com/Oire
function ne(a,b){var c=a.split("_");return b%10===1&&b%100!==11?c[0]:b%10>=2&&b%10<=4&&(b%100<10||b%100>=20)?c[1]:c[2]}function oe(a,b,c){var d={mm:b?"хвилина_хвилини_хвилин":"хвилину_хвилини_хвилин",hh:b?"година_години_годин":"годину_години_годин",dd:"день_дні_днів",MM:"місяць_місяці_місяців",yy:"рік_роки_років"};return"m"===c?b?"хвилина":"хвилину":"h"===c?b?"година":"годину":a+" "+ne(d[c],+a)}function pe(a,b){var c={nominative:"неділя_понеділок_вівторок_середа_четвер_п’ятниця_субота".split("_"),accusative:"неділю_понеділок_вівторок_середу_четвер_п’ятницю_суботу".split("_"),genitive:"неділі_понеділка_вівторка_середи_четверга_п’ятниці_суботи".split("_")};if(!a)return c.nominative;var d=/(\[[ВвУу]\]) ?dddd/.test(b)?"accusative":/\[?(?:минулої|наступної)? ?\] ?dddd/.test(b)?"genitive":"nominative";return c[d][a.day()]}function qe(a){return function(){return a+"о"+(11===this.hours()?"б":"")+"] LT"}}var re,se;se=Array.prototype.some?Array.prototype.some:function(a){for(var b=Object(this),c=b.length>>>0,d=0;d<c;d++)if(d in b&&a.call(this,b[d],d,b))return!0;return!1};var te=se,ue=a.momentProperties=[],ve=!1,we={};a.suppressDeprecationWarnings=!1,a.deprecationHandler=null;var xe;xe=Object.keys?Object.keys:function(a){var b,c=[];for(b in a)j(a,b)&&c.push(b);return c};var ye,ze=xe,Ae={sameDay:"[Today at] LT",nextDay:"[Tomorrow at] LT",nextWeek:"dddd [at] LT",lastDay:"[Yesterday at] LT",lastWeek:"[Last] dddd [at] LT",sameElse:"L"},Be={LTS:"h:mm:ss A",LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D, YYYY",LLL:"MMMM D, YYYY h:mm A",LLLL:"dddd, MMMM D, YYYY h:mm A"},Ce="Invalid date",De="%d",Ee=/\d{1,2}/,Fe={future:"in %s",past:"%s ago",s:"a few seconds",ss:"%d seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"},Ge={},He={},Ie=/(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g,Je=/(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,Ke={},Le={},Me=/\d/,Ne=/\d\d/,Oe=/\d{3}/,Pe=/\d{4}/,Qe=/[+-]?\d{6}/,Re=/\d\d?/,Se=/\d\d\d\d?/,Te=/\d\d\d\d\d\d?/,Ue=/\d{1,3}/,Ve=/\d{1,4}/,We=/[+-]?\d{1,6}/,Xe=/\d+/,Ye=/[+-]?\d+/,Ze=/Z|[+-]\d\d:?\d\d/gi,$e=/Z|[+-]\d\d(?::?\d\d)?/gi,_e=/[+-]?\d+(\.\d{1,3})?/,af=/[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i,bf={},cf={},df=0,ef=1,ff=2,gf=3,hf=4,jf=5,kf=6,lf=7,mf=8;ye=Array.prototype.indexOf?Array.prototype.indexOf:function(a){var b;for(b=0;b<this.length;++b)if(this[b]===a)return b;return-1};var nf=ye;U("M",["MM",2],"Mo",function(){return this.month()+1}),U("MMM",0,0,function(a){return this.localeData().monthsShort(this,a)}),U("MMMM",0,0,function(a){return this.localeData().months(this,a)}),J("month","M"),M("month",8),Z("M",Re),Z("MM",Re,Ne),Z("MMM",function(a,b){return b.monthsShortRegex(a)}),Z("MMMM",function(a,b){return b.monthsRegex(a)}),ba(["M","MM"],function(a,b){b[ef]=u(a)-1}),ba(["MMM","MMMM"],function(a,b,c,d){var e=c._locale.monthsParse(a,d,c._strict);null!=e?b[ef]=e:n(c).invalidMonth=a});var of=/D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/,pf="January_February_March_April_May_June_July_August_September_October_November_December".split("_"),qf="Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),rf=af,sf=af;U("Y",0,0,function(){var a=this.year();return a<=9999?""+a:"+"+a}),U(0,["YY",2],0,function(){return this.year()%100}),U(0,["YYYY",4],0,"year"),U(0,["YYYYY",5],0,"year"),U(0,["YYYYYY",6,!0],0,"year"),J("year","y"),M("year",1),Z("Y",Ye),Z("YY",Re,Ne),Z("YYYY",Ve,Pe),Z("YYYYY",We,Qe),Z("YYYYYY",We,Qe),ba(["YYYYY","YYYYYY"],df),ba("YYYY",function(b,c){c[df]=2===b.length?a.parseTwoDigitYear(b):u(b)}),ba("YY",function(b,c){c[df]=a.parseTwoDigitYear(b)}),ba("Y",function(a,b){b[df]=parseInt(a,10)}),a.parseTwoDigitYear=function(a){return u(a)+(u(a)>68?1900:2e3)};var tf=O("FullYear",!0);U("w",["ww",2],"wo","week"),U("W",["WW",2],"Wo","isoWeek"),J("week","w"),J("isoWeek","W"),M("week",5),M("isoWeek",5),Z("w",Re),Z("ww",Re,Ne),Z("W",Re),Z("WW",Re,Ne),ca(["w","ww","W","WW"],function(a,b,c,d){b[d.substr(0,1)]=u(a)});var uf={dow:0,doy:6};U("d",0,"do","day"),U("dd",0,0,function(a){return this.localeData().weekdaysMin(this,a)}),U("ddd",0,0,function(a){return this.localeData().weekdaysShort(this,a)}),U("dddd",0,0,function(a){return this.localeData().weekdays(this,a)}),U("e",0,0,"weekday"),U("E",0,0,"isoWeekday"),J("day","d"),J("weekday","e"),J("isoWeekday","E"),M("day",11),M("weekday",11),M("isoWeekday",11),Z("d",Re),Z("e",Re),Z("E",Re),Z("dd",function(a,b){return b.weekdaysMinRegex(a)}),Z("ddd",function(a,b){return b.weekdaysShortRegex(a)}),Z("dddd",function(a,b){return b.weekdaysRegex(a)}),ca(["dd","ddd","dddd"],function(a,b,c,d){var e=c._locale.weekdaysParse(a,d,c._strict);null!=e?b.d=e:n(c).invalidWeekday=a}),ca(["d","e","E"],function(a,b,c,d){b[d]=u(a)});var vf="Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),wf="Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),xf="Su_Mo_Tu_We_Th_Fr_Sa".split("_"),yf=af,zf=af,Af=af;U("H",["HH",2],0,"hour"),U("h",["hh",2],0,Ra),U("k",["kk",2],0,Sa),U("hmm",0,0,function(){return""+Ra.apply(this)+T(this.minutes(),2)}),U("hmmss",0,0,function(){return""+Ra.apply(this)+T(this.minutes(),2)+T(this.seconds(),2)}),U("Hmm",0,0,function(){return""+this.hours()+T(this.minutes(),2)}),U("Hmmss",0,0,function(){return""+this.hours()+T(this.minutes(),2)+T(this.seconds(),2)}),Ta("a",!0),Ta("A",!1),J("hour","h"),M("hour",13),Z("a",Ua),Z("A",Ua),Z("H",Re),Z("h",Re),Z("k",Re),Z("HH",Re,Ne),Z("hh",Re,Ne),Z("kk",Re,Ne),Z("hmm",Se),Z("hmmss",Te),Z("Hmm",Se),Z("Hmmss",Te),ba(["H","HH"],gf),ba(["k","kk"],function(a,b,c){var d=u(a);b[gf]=24===d?0:d}),ba(["a","A"],function(a,b,c){c._isPm=c._locale.isPM(a),c._meridiem=a}),ba(["h","hh"],function(a,b,c){b[gf]=u(a),n(c).bigHour=!0}),ba("hmm",function(a,b,c){var d=a.length-2;b[gf]=u(a.substr(0,d)),b[hf]=u(a.substr(d)),n(c).bigHour=!0}),ba("hmmss",function(a,b,c){var d=a.length-4,e=a.length-2;b[gf]=u(a.substr(0,d)),b[hf]=u(a.substr(d,2)),b[jf]=u(a.substr(e)),n(c).bigHour=!0}),ba("Hmm",function(a,b,c){var d=a.length-2;b[gf]=u(a.substr(0,d)),b[hf]=u(a.substr(d))}),ba("Hmmss",function(a,b,c){var d=a.length-4,e=a.length-2;b[gf]=u(a.substr(0,d)),b[hf]=u(a.substr(d,2)),b[jf]=u(a.substr(e))});var Bf,Cf=/[ap]\.?m?\.?/i,Df=O("Hours",!0),Ef={calendar:Ae,longDateFormat:Be,invalidDate:Ce,ordinal:De,dayOfMonthOrdinalParse:Ee,relativeTime:Fe,months:pf,monthsShort:qf,week:uf,weekdays:vf,weekdaysMin:xf,weekdaysShort:wf,meridiemParse:Cf},Ff={},Gf={},Hf=/^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,If=/^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,Jf=/Z|[+-]\d\d(?::?\d\d)?/,Kf=[["YYYYYY-MM-DD",/[+-]\d{6}-\d\d-\d\d/],["YYYY-MM-DD",/\d{4}-\d\d-\d\d/],["GGGG-[W]WW-E",/\d{4}-W\d\d-\d/],["GGGG-[W]WW",/\d{4}-W\d\d/,!1],["YYYY-DDD",/\d{4}-\d{3}/],["YYYY-MM",/\d{4}-\d\d/,!1],["YYYYYYMMDD",/[+-]\d{10}/],["YYYYMMDD",/\d{8}/],["GGGG[W]WWE",/\d{4}W\d{3}/],["GGGG[W]WW",/\d{4}W\d{2}/,!1],["YYYYDDD",/\d{7}/]],Lf=[["HH:mm:ss.SSSS",/\d\d:\d\d:\d\d\.\d+/],["HH:mm:ss,SSSS",/\d\d:\d\d:\d\d,\d+/],["HH:mm:ss",/\d\d:\d\d:\d\d/],["HH:mm",/\d\d:\d\d/],["HHmmss.SSSS",/\d\d\d\d\d\d\.\d+/],["HHmmss,SSSS",/\d\d\d\d\d\d,\d+/],["HHmmss",/\d\d\d\d\d\d/],["HHmm",/\d\d\d\d/],["HH",/\d\d/]],Mf=/^\/?Date\((\-?\d+)/i,Nf=/^((?:Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d?\d\s(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(?:\d\d)?\d\d\s)(\d\d:\d\d)(\:\d\d)?(\s(?:UT|GMT|[ECMP][SD]T|[A-IK-Za-ik-z]|[+-]\d{4}))$/;a.createFromInputFallback=x("value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are discouraged and will be removed in an upcoming major release. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.",function(a){a._d=new Date(a._i+(a._useUTC?" UTC":""))}),a.ISO_8601=function(){},a.RFC_2822=function(){};var Of=x("moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/",function(){var a=tb.apply(null,arguments);return this.isValid()&&a.isValid()?a<this?this:a:p()}),Pf=x("moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/",function(){var a=tb.apply(null,arguments);return this.isValid()&&a.isValid()?a>this?this:a:p()}),Qf=function(){return Date.now?Date.now():+new Date},Rf=["year","quarter","month","week","day","hour","minute","second","millisecond"];Db("Z",":"),Db("ZZ",""),Z("Z",$e),Z("ZZ",$e),ba(["Z","ZZ"],function(a,b,c){c._useUTC=!0,c._tzm=Eb($e,a)});var Sf=/([\+\-]|\d\d)/gi;a.updateOffset=function(){};var Tf=/^(\-)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)(\.\d*)?)?$/,Uf=/^(-)?P(?:(-?[0-9,.]*)Y)?(?:(-?[0-9,.]*)M)?(?:(-?[0-9,.]*)W)?(?:(-?[0-9,.]*)D)?(?:T(?:(-?[0-9,.]*)H)?(?:(-?[0-9,.]*)M)?(?:(-?[0-9,.]*)S)?)?$/;Sb.fn=Ab.prototype,Sb.invalid=zb;var Vf=Wb(1,"add"),Wf=Wb(-1,"subtract");a.defaultFormat="YYYY-MM-DDTHH:mm:ssZ",a.defaultFormatUtc="YYYY-MM-DDTHH:mm:ss[Z]";var Xf=x("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.",function(a){return void 0===a?this.localeData():this.locale(a)});U(0,["gg",2],0,function(){return this.weekYear()%100}),U(0,["GG",2],0,function(){return this.isoWeekYear()%100}),Dc("gggg","weekYear"),Dc("ggggg","weekYear"),Dc("GGGG","isoWeekYear"),Dc("GGGGG","isoWeekYear"),J("weekYear","gg"),J("isoWeekYear","GG"),M("weekYear",1),M("isoWeekYear",1),Z("G",Ye),Z("g",Ye),Z("GG",Re,Ne),Z("gg",Re,Ne),Z("GGGG",Ve,Pe),Z("gggg",Ve,Pe),Z("GGGGG",We,Qe),Z("ggggg",We,Qe),ca(["gggg","ggggg","GGGG","GGGGG"],function(a,b,c,d){b[d.substr(0,2)]=u(a)}),ca(["gg","GG"],function(b,c,d,e){c[e]=a.parseTwoDigitYear(b)}),U("Q",0,"Qo","quarter"),J("quarter","Q"),M("quarter",7),Z("Q",Me),ba("Q",function(a,b){b[ef]=3*(u(a)-1)}),U("D",["DD",2],"Do","date"),J("date","D"),M("date",9),Z("D",Re),Z("DD",Re,Ne),Z("Do",function(a,b){return a?b._dayOfMonthOrdinalParse||b._ordinalParse:b._dayOfMonthOrdinalParseLenient}),ba(["D","DD"],ff),ba("Do",function(a,b){b[ff]=u(a.match(Re)[0],10)});var Yf=O("Date",!0);U("DDD",["DDDD",3],"DDDo","dayOfYear"),J("dayOfYear","DDD"),M("dayOfYear",4),Z("DDD",Ue),Z("DDDD",Oe),ba(["DDD","DDDD"],function(a,b,c){c._dayOfYear=u(a)}),U("m",["mm",2],0,"minute"),J("minute","m"),M("minute",14),Z("m",Re),Z("mm",Re,Ne),ba(["m","mm"],hf);var Zf=O("Minutes",!1);U("s",["ss",2],0,"second"),J("second","s"),M("second",15),Z("s",Re),Z("ss",Re,Ne),ba(["s","ss"],jf);var $f=O("Seconds",!1);U("S",0,0,function(){return~~(this.millisecond()/100)}),U(0,["SS",2],0,function(){return~~(this.millisecond()/10)}),U(0,["SSS",3],0,"millisecond"),U(0,["SSSS",4],0,function(){return 10*this.millisecond()}),U(0,["SSSSS",5],0,function(){return 100*this.millisecond()}),U(0,["SSSSSS",6],0,function(){return 1e3*this.millisecond()}),U(0,["SSSSSSS",7],0,function(){return 1e4*this.millisecond()}),U(0,["SSSSSSSS",8],0,function(){return 1e5*this.millisecond()}),U(0,["SSSSSSSSS",9],0,function(){return 1e6*this.millisecond()}),J("millisecond","ms"),M("millisecond",16),Z("S",Ue,Me),Z("SS",Ue,Ne),Z("SSS",Ue,Oe);var _f;for(_f="SSSS";_f.length<=9;_f+="S")Z(_f,Xe);for(_f="S";_f.length<=9;_f+="S")ba(_f,Mc);var ag=O("Milliseconds",!1);U("z",0,0,"zoneAbbr"),U("zz",0,0,"zoneName");var bg=r.prototype;bg.add=Vf,bg.calendar=Zb,bg.clone=$b,bg.diff=fc,bg.endOf=sc,bg.format=kc,bg.from=lc,bg.fromNow=mc,bg.to=nc,bg.toNow=oc,bg.get=R,bg.invalidAt=Bc,bg.isAfter=_b,bg.isBefore=ac,bg.isBetween=bc,bg.isSame=cc,bg.isSameOrAfter=dc,bg.isSameOrBefore=ec,bg.isValid=zc,bg.lang=Xf,bg.locale=pc,bg.localeData=qc,bg.max=Pf,bg.min=Of,bg.parsingFlags=Ac,bg.set=S,bg.startOf=rc,bg.subtract=Wf,bg.toArray=wc,bg.toObject=xc,bg.toDate=vc,bg.toISOString=ic,bg.inspect=jc,bg.toJSON=yc,bg.toString=hc,bg.unix=uc,bg.valueOf=tc,bg.creationData=Cc,bg.year=tf,bg.isLeapYear=ra,bg.weekYear=Ec,bg.isoWeekYear=Fc,bg.quarter=bg.quarters=Kc,bg.month=ka,bg.daysInMonth=la,bg.week=bg.weeks=Ba,bg.isoWeek=bg.isoWeeks=Ca,bg.weeksInYear=Hc,bg.isoWeeksInYear=Gc,bg.date=Yf,bg.day=bg.days=Ka,bg.weekday=La,bg.isoWeekday=Ma,bg.dayOfYear=Lc,bg.hour=bg.hours=Df,bg.minute=bg.minutes=Zf,bg.second=bg.seconds=$f,bg.millisecond=bg.milliseconds=ag,bg.utcOffset=Hb,bg.utc=Jb,bg.local=Kb,bg.parseZone=Lb,bg.hasAlignedHourOffset=Mb,bg.isDST=Nb,bg.isLocal=Pb,bg.isUtcOffset=Qb,bg.isUtc=Rb,bg.isUTC=Rb,bg.zoneAbbr=Nc,bg.zoneName=Oc,bg.dates=x("dates accessor is deprecated. Use date instead.",Yf),bg.months=x("months accessor is deprecated. Use month instead",ka),bg.years=x("years accessor is deprecated. Use year instead",tf),bg.zone=x("moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/",Ib),bg.isDSTShifted=x("isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information",Ob);var cg=C.prototype;cg.calendar=D,cg.longDateFormat=E,cg.invalidDate=F,cg.ordinal=G,cg.preparse=Rc,cg.postformat=Rc,cg.relativeTime=H,cg.pastFuture=I,cg.set=A,cg.months=fa,cg.monthsShort=ga,cg.monthsParse=ia,cg.monthsRegex=na,cg.monthsShortRegex=ma,cg.week=ya,cg.firstDayOfYear=Aa,cg.firstDayOfWeek=za,cg.weekdays=Fa,cg.weekdaysMin=Ha,cg.weekdaysShort=Ga,cg.weekdaysParse=Ja,cg.weekdaysRegex=Na,cg.weekdaysShortRegex=Oa,cg.weekdaysMinRegex=Pa,cg.isPM=Va,cg.meridiem=Wa,$a("en",{dayOfMonthOrdinalParse:/\d{1,2}(th|st|nd|rd)/,ordinal:function(a){var b=a%10,c=1===u(a%100/10)?"th":1===b?"st":2===b?"nd":3===b?"rd":"th";return a+c}}),a.lang=x("moment.lang is deprecated. Use moment.locale instead.",$a),a.langData=x("moment.langData is deprecated. Use moment.localeData instead.",bb);var dg=Math.abs,eg=id("ms"),fg=id("s"),gg=id("m"),hg=id("h"),ig=id("d"),jg=id("w"),kg=id("M"),lg=id("y"),mg=kd("milliseconds"),ng=kd("seconds"),og=kd("minutes"),pg=kd("hours"),qg=kd("days"),rg=kd("months"),sg=kd("years"),tg=Math.round,ug={ss:44,s:45,m:45,h:22,d:26,M:11},vg=Math.abs,wg=Ab.prototype;wg.isValid=yb,wg.abs=$c,wg.add=ad,wg.subtract=bd,wg.as=gd,wg.asMilliseconds=eg,wg.asSeconds=fg,wg.asMinutes=gg,wg.asHours=hg,wg.asDays=ig,wg.asWeeks=jg,wg.asMonths=kg,wg.asYears=lg,wg.valueOf=hd,wg._bubble=dd,wg.get=jd,wg.milliseconds=mg,wg.seconds=ng,wg.minutes=og,wg.hours=pg,wg.days=qg,wg.weeks=ld,wg.months=rg,wg.years=sg,wg.humanize=qd,wg.toISOString=rd,wg.toString=rd,wg.toJSON=rd,wg.locale=pc,wg.localeData=qc,wg.toIsoString=x("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)",rd),wg.lang=Xf,U("X",0,0,"unix"),U("x",0,0,"valueOf"),Z("x",Ye),Z("X",_e),ba("X",function(a,b,c){c._d=new Date(1e3*parseFloat(a,10))}),ba("x",function(a,b,c){c._d=new Date(u(a))}),
//! moment.js
//! version : 2.18.1
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com
a.version="2.18.1",b(tb),a.fn=bg,a.min=vb,a.max=wb,a.now=Qf,a.utc=l,a.unix=Pc,a.months=Vc,a.isDate=h,a.locale=$a,a.invalid=p,a.duration=Sb,a.isMoment=s,a.weekdays=Xc,a.parseZone=Qc,a.localeData=bb,a.isDuration=Bb,a.monthsShort=Wc,a.weekdaysMin=Zc,a.defineLocale=_a,a.updateLocale=ab,a.locales=cb,a.weekdaysShort=Yc,a.normalizeUnits=K,a.relativeTimeRounding=od,a.relativeTimeThreshold=pd,a.calendarFormat=Yb,a.prototype=bg,
//! moment.js locale configuration
//! locale : Afrikaans [af]
//! author : Werner Mollentze : https://github.com/wernerm
a.defineLocale("af",{months:"Januarie_Februarie_Maart_April_Mei_Junie_Julie_Augustus_September_Oktober_November_Desember".split("_"),monthsShort:"Jan_Feb_Mrt_Apr_Mei_Jun_Jul_Aug_Sep_Okt_Nov_Des".split("_"),weekdays:"Sondag_Maandag_Dinsdag_Woensdag_Donderdag_Vrydag_Saterdag".split("_"),weekdaysShort:"Son_Maa_Din_Woe_Don_Vry_Sat".split("_"),weekdaysMin:"So_Ma_Di_Wo_Do_Vr_Sa".split("_"),meridiemParse:/vm|nm/i,isPM:function(a){return/^nm$/i.test(a)},meridiem:function(a,b,c){return a<12?c?"vm":"VM":c?"nm":"NM"},longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd, D MMMM YYYY HH:mm"},calendar:{sameDay:"[Vandag om] LT",nextDay:"[Môre om] LT",nextWeek:"dddd [om] LT",lastDay:"[Gister om] LT",lastWeek:"[Laas] dddd [om] LT",sameElse:"L"},relativeTime:{future:"oor %s",past:"%s gelede",s:"'n paar sekondes",m:"'n minuut",mm:"%d minute",h:"'n uur",hh:"%d ure",d:"'n dag",dd:"%d dae",M:"'n maand",MM:"%d maande",y:"'n jaar",yy:"%d jaar"},dayOfMonthOrdinalParse:/\d{1,2}(ste|de)/,ordinal:function(a){return a+(1===a||8===a||a>=20?"ste":"de")},week:{dow:1,doy:4}}),
//! moment.js locale configuration
//! locale : Arabic (Algeria) [ar-dz]
//! author : Noureddine LOUAHEDJ : https://github.com/noureddineme
a.defineLocale("ar-dz",{months:"جانفي_فيفري_مارس_أفريل_ماي_جوان_جويلية_أوت_سبتمبر_أكتوبر_نوفمبر_ديسمبر".split("_"),monthsShort:"جانفي_فيفري_مارس_أفريل_ماي_جوان_جويلية_أوت_سبتمبر_أكتوبر_نوفمبر_ديسمبر".split("_"),weekdays:"الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت".split("_"),weekdaysShort:"احد_اثنين_ثلاثاء_اربعاء_خميس_جمعة_سبت".split("_"),weekdaysMin:"أح_إث_ثلا_أر_خم_جم_سب".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd D MMMM YYYY HH:mm"},calendar:{sameDay:"[اليوم على الساعة] LT",nextDay:"[غدا على الساعة] LT",nextWeek:"dddd [على الساعة] LT",lastDay:"[أمس على الساعة] LT",lastWeek:"dddd [على الساعة] LT",sameElse:"L"},relativeTime:{future:"في %s",past:"منذ %s",s:"ثوان",m:"دقيقة",mm:"%d دقائق",h:"ساعة",hh:"%d ساعات",d:"يوم",dd:"%d أيام",M:"شهر",MM:"%d أشهر",y:"سنة",yy:"%d سنوات"},week:{dow:0,doy:4}}),
//! moment.js locale configuration
//! locale : Arabic (Kuwait) [ar-kw]
//! author : Nusret Parlak: https://github.com/nusretparlak
a.defineLocale("ar-kw",{months:"يناير_فبراير_مارس_أبريل_ماي_يونيو_يوليوز_غشت_شتنبر_أكتوبر_نونبر_دجنبر".split("_"),monthsShort:"يناير_فبراير_مارس_أبريل_ماي_يونيو_يوليوز_غشت_شتنبر_أكتوبر_نونبر_دجنبر".split("_"),weekdays:"الأحد_الإتنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت".split("_"),weekdaysShort:"احد_اتنين_ثلاثاء_اربعاء_خميس_جمعة_سبت".split("_"),weekdaysMin:"ح_ن_ث_ر_خ_ج_س".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd D MMMM YYYY HH:mm"},calendar:{sameDay:"[اليوم على الساعة] LT",nextDay:"[غدا على الساعة] LT",nextWeek:"dddd [على الساعة] LT",lastDay:"[أمس على الساعة] LT",lastWeek:"dddd [على الساعة] LT",sameElse:"L"},relativeTime:{future:"في %s",past:"منذ %s",s:"ثوان",m:"دقيقة",mm:"%d دقائق",h:"ساعة",hh:"%d ساعات",d:"يوم",dd:"%d أيام",M:"شهر",MM:"%d أشهر",y:"سنة",yy:"%d سنوات"},week:{dow:0,doy:12}});
//! moment.js locale configuration
//! locale : Arabic (Lybia) [ar-ly]
//! author : Ali Hmer: https://github.com/kikoanis
var xg={1:"1",2:"2",3:"3",4:"4",5:"5",6:"6",7:"7",8:"8",9:"9",0:"0"},yg=function(a){return 0===a?0:1===a?1:2===a?2:a%100>=3&&a%100<=10?3:a%100>=11?4:5},zg={s:["أقل من ثانية","ثانية واحدة",["ثانيتان","ثانيتين"],"%d ثوان","%d ثانية","%d ثانية"],m:["أقل من دقيقة","دقيقة واحدة",["دقيقتان","دقيقتين"],"%d دقائق","%d دقيقة","%d دقيقة"],h:["أقل من ساعة","ساعة واحدة",["ساعتان","ساعتين"],"%d ساعات","%d ساعة","%d ساعة"],d:["أقل من يوم","يوم واحد",["يومان","يومين"],"%d أيام","%d يومًا","%d يوم"],M:["أقل من شهر","شهر واحد",["شهران","شهرين"],"%d أشهر","%d شهرا","%d شهر"],y:["أقل من عام","عام واحد",["عامان","عامين"],"%d أعوام","%d عامًا","%d عام"]},Ag=function(a){return function(b,c,d,e){var f=yg(b),g=zg[a][yg(b)];return 2===f&&(g=g[c?0:1]),g.replace(/%d/i,b)}},Bg=["يناير","فبراير","مارس","أبريل","مايو","يونيو","يوليو","أغسطس","سبتمبر","أكتوبر","نوفمبر","ديسمبر"];a.defineLocale("ar-ly",{months:Bg,monthsShort:Bg,weekdays:"الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت".split("_"),weekdaysShort:"أحد_إثنين_ثلاثاء_أربعاء_خميس_جمعة_سبت".split("_"),weekdaysMin:"ح_ن_ث_ر_خ_ج_س".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"D/‏M/‏YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd D MMMM YYYY HH:mm"},meridiemParse:/ص|م/,isPM:function(a){return"م"===a},meridiem:function(a,b,c){return a<12?"ص":"م"},calendar:{sameDay:"[اليوم عند الساعة] LT",nextDay:"[غدًا عند الساعة] LT",nextWeek:"dddd [عند الساعة] LT",lastDay:"[أمس عند الساعة] LT",lastWeek:"dddd [عند الساعة] LT",sameElse:"L"},relativeTime:{future:"بعد %s",past:"منذ %s",s:Ag("s"),m:Ag("m"),mm:Ag("m"),h:Ag("h"),hh:Ag("h"),d:Ag("d"),dd:Ag("d"),M:Ag("M"),MM:Ag("M"),y:Ag("y"),yy:Ag("y")},preparse:function(a){return a.replace(/\u200f/g,"").replace(/،/g,",")},postformat:function(a){return a.replace(/\d/g,function(a){return xg[a]}).replace(/,/g,"،")},week:{dow:6,doy:12}}),
//! moment.js locale configuration
//! locale : Arabic (Morocco) [ar-ma]
//! author : ElFadili Yassine : https://github.com/ElFadiliY
//! author : Abdel Said : https://github.com/abdelsaid
a.defineLocale("ar-ma",{months:"يناير_فبراير_مارس_أبريل_ماي_يونيو_يوليوز_غشت_شتنبر_أكتوبر_نونبر_دجنبر".split("_"),monthsShort:"يناير_فبراير_مارس_أبريل_ماي_يونيو_يوليوز_غشت_شتنبر_أكتوبر_نونبر_دجنبر".split("_"),weekdays:"الأحد_الإتنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت".split("_"),weekdaysShort:"احد_اتنين_ثلاثاء_اربعاء_خميس_جمعة_سبت".split("_"),weekdaysMin:"ح_ن_ث_ر_خ_ج_س".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd D MMMM YYYY HH:mm"},calendar:{sameDay:"[اليوم على الساعة] LT",nextDay:"[غدا على الساعة] LT",nextWeek:"dddd [على الساعة] LT",lastDay:"[أمس على الساعة] LT",lastWeek:"dddd [على الساعة] LT",sameElse:"L"},relativeTime:{future:"في %s",past:"منذ %s",s:"ثوان",m:"دقيقة",mm:"%d دقائق",h:"ساعة",hh:"%d ساعات",d:"يوم",dd:"%d أيام",M:"شهر",MM:"%d أشهر",y:"سنة",yy:"%d سنوات"},week:{dow:6,doy:12}});
//! moment.js locale configuration
//! locale : Arabic (Saudi Arabia) [ar-sa]
//! author : Suhail Alkowaileet : https://github.com/xsoh
var Cg={1:"١",2:"٢",3:"٣",4:"٤",5:"٥",6:"٦",7:"٧",8:"٨",9:"٩",0:"٠"},Dg={"١":"1","٢":"2","٣":"3","٤":"4","٥":"5","٦":"6","٧":"7","٨":"8","٩":"9","٠":"0"};a.defineLocale("ar-sa",{months:"يناير_فبراير_مارس_أبريل_مايو_يونيو_يوليو_أغسطس_سبتمبر_أكتوبر_نوفمبر_ديسمبر".split("_"),monthsShort:"يناير_فبراير_مارس_أبريل_مايو_يونيو_يوليو_أغسطس_سبتمبر_أكتوبر_نوفمبر_ديسمبر".split("_"),weekdays:"الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت".split("_"),weekdaysShort:"أحد_إثنين_ثلاثاء_أربعاء_خميس_جمعة_سبت".split("_"),weekdaysMin:"ح_ن_ث_ر_خ_ج_س".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd D MMMM YYYY HH:mm"},meridiemParse:/ص|م/,isPM:function(a){return"م"===a},meridiem:function(a,b,c){return a<12?"ص":"م"},calendar:{sameDay:"[اليوم على الساعة] LT",nextDay:"[غدا على الساعة] LT",nextWeek:"dddd [على الساعة] LT",lastDay:"[أمس على الساعة] LT",lastWeek:"dddd [على الساعة] LT",sameElse:"L"},relativeTime:{future:"في %s",past:"منذ %s",s:"ثوان",m:"دقيقة",mm:"%d دقائق",h:"ساعة",hh:"%d ساعات",d:"يوم",dd:"%d أيام",M:"شهر",MM:"%d أشهر",y:"سنة",yy:"%d سنوات"},preparse:function(a){return a.replace(/[١٢٣٤٥٦٧٨٩٠]/g,function(a){return Dg[a]}).replace(/،/g,",")},postformat:function(a){return a.replace(/\d/g,function(a){return Cg[a]}).replace(/,/g,"،")},week:{dow:0,doy:6}}),
//! moment.js locale configuration
//! locale  :  Arabic (Tunisia) [ar-tn]
//! author : Nader Toukabri : https://github.com/naderio
a.defineLocale("ar-tn",{months:"جانفي_فيفري_مارس_أفريل_ماي_جوان_جويلية_أوت_سبتمبر_أكتوبر_نوفمبر_ديسمبر".split("_"),monthsShort:"جانفي_فيفري_مارس_أفريل_ماي_جوان_جويلية_أوت_سبتمبر_أكتوبر_نوفمبر_ديسمبر".split("_"),weekdays:"الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت".split("_"),weekdaysShort:"أحد_إثنين_ثلاثاء_أربعاء_خميس_جمعة_سبت".split("_"),weekdaysMin:"ح_ن_ث_ر_خ_ج_س".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd D MMMM YYYY HH:mm"},calendar:{sameDay:"[اليوم على الساعة] LT",nextDay:"[غدا على الساعة] LT",nextWeek:"dddd [على الساعة] LT",lastDay:"[أمس على الساعة] LT",lastWeek:"dddd [على الساعة] LT",sameElse:"L"},relativeTime:{future:"في %s",past:"منذ %s",s:"ثوان",m:"دقيقة",mm:"%d دقائق",h:"ساعة",hh:"%d ساعات",d:"يوم",dd:"%d أيام",M:"شهر",MM:"%d أشهر",y:"سنة",yy:"%d سنوات"},week:{dow:1,doy:4}});
//! moment.js locale configuration
//! locale : Arabic [ar]
//! author : Abdel Said: https://github.com/abdelsaid
//! author : Ahmed Elkhatib
//! author : forabi https://github.com/forabi
var Eg={1:"١",2:"٢",3:"٣",4:"٤",5:"٥",6:"٦",7:"٧",8:"٨",9:"٩",0:"٠"},Fg={"١":"1","٢":"2","٣":"3","٤":"4","٥":"5","٦":"6","٧":"7","٨":"8","٩":"9","٠":"0"},Gg=function(a){return 0===a?0:1===a?1:2===a?2:a%100>=3&&a%100<=10?3:a%100>=11?4:5},Hg={s:["أقل من ثانية","ثانية واحدة",["ثانيتان","ثانيتين"],"%d ثوان","%d ثانية","%d ثانية"],m:["أقل من دقيقة","دقيقة واحدة",["دقيقتان","دقيقتين"],"%d دقائق","%d دقيقة","%d دقيقة"],h:["أقل من ساعة","ساعة واحدة",["ساعتان","ساعتين"],"%d ساعات","%d ساعة","%d ساعة"],d:["أقل من يوم","يوم واحد",["يومان","يومين"],"%d أيام","%d يومًا","%d يوم"],M:["أقل من شهر","شهر واحد",["شهران","شهرين"],"%d أشهر","%d شهرا","%d شهر"],y:["أقل من عام","عام واحد",["عامان","عامين"],"%d أعوام","%d عامًا","%d عام"]},Ig=function(a){return function(b,c,d,e){var f=Gg(b),g=Hg[a][Gg(b)];return 2===f&&(g=g[c?0:1]),g.replace(/%d/i,b)}},Jg=["كانون الثاني يناير","شباط فبراير","آذار مارس","نيسان أبريل","أيار مايو","حزيران يونيو","تموز يوليو","آب أغسطس","أيلول سبتمبر","تشرين الأول أكتوبر","تشرين الثاني نوفمبر","كانون الأول ديسمبر"];a.defineLocale("ar",{months:Jg,monthsShort:Jg,weekdays:"الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت".split("_"),weekdaysShort:"أحد_إثنين_ثلاثاء_أربعاء_خميس_جمعة_سبت".split("_"),weekdaysMin:"ح_ن_ث_ر_خ_ج_س".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"D/‏M/‏YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd D MMMM YYYY HH:mm"},meridiemParse:/ص|م/,isPM:function(a){return"م"===a},meridiem:function(a,b,c){return a<12?"ص":"م"},calendar:{sameDay:"[اليوم عند الساعة] LT",nextDay:"[غدًا عند الساعة] LT",nextWeek:"dddd [عند الساعة] LT",lastDay:"[أمس عند الساعة] LT",lastWeek:"dddd [عند الساعة] LT",sameElse:"L"},relativeTime:{future:"بعد %s",past:"منذ %s",s:Ig("s"),m:Ig("m"),mm:Ig("m"),h:Ig("h"),hh:Ig("h"),d:Ig("d"),dd:Ig("d"),M:Ig("M"),MM:Ig("M"),y:Ig("y"),yy:Ig("y")},preparse:function(a){return a.replace(/\u200f/g,"").replace(/[١٢٣٤٥٦٧٨٩٠]/g,function(a){return Fg[a]}).replace(/،/g,",")},postformat:function(a){return a.replace(/\d/g,function(a){return Eg[a]}).replace(/,/g,"،")},week:{dow:6,doy:12}});
//! moment.js locale configuration
//! locale : Azerbaijani [az]
//! author : topchiyev : https://github.com/topchiyev
var Kg={1:"-inci",5:"-inci",8:"-inci",70:"-inci",80:"-inci",2:"-nci",7:"-nci",20:"-nci",50:"-nci",3:"-üncü",4:"-üncü",100:"-üncü",6:"-ncı",9:"-uncu",10:"-uncu",30:"-uncu",60:"-ıncı",90:"-ıncı"};a.defineLocale("az",{months:"yanvar_fevral_mart_aprel_may_iyun_iyul_avqust_sentyabr_oktyabr_noyabr_dekabr".split("_"),monthsShort:"yan_fev_mar_apr_may_iyn_iyl_avq_sen_okt_noy_dek".split("_"),weekdays:"Bazar_Bazar ertəsi_Çərşənbə axşamı_Çərşənbə_Cümə axşamı_Cümə_Şənbə".split("_"),weekdaysShort:"Baz_BzE_ÇAx_Çər_CAx_Cüm_Şən".split("_"),weekdaysMin:"Bz_BE_ÇA_Çə_CA_Cü_Şə".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd, D MMMM YYYY HH:mm"},calendar:{sameDay:"[bugün saat] LT",nextDay:"[sabah saat] LT",nextWeek:"[gələn həftə] dddd [saat] LT",lastDay:"[dünən] LT",lastWeek:"[keçən həftə] dddd [saat] LT",sameElse:"L"},relativeTime:{future:"%s sonra",past:"%s əvvəl",s:"birneçə saniyyə",m:"bir dəqiqə",mm:"%d dəqiqə",h:"bir saat",hh:"%d saat",d:"bir gün",dd:"%d gün",M:"bir ay",MM:"%d ay",y:"bir il",yy:"%d il"},meridiemParse:/gecə|səhər|gündüz|axşam/,isPM:function(a){return/^(gündüz|axşam)$/.test(a)},meridiem:function(a,b,c){return a<4?"gecə":a<12?"səhər":a<17?"gündüz":"axşam"},dayOfMonthOrdinalParse:/\d{1,2}-(ıncı|inci|nci|üncü|ncı|uncu)/,ordinal:function(a){if(0===a)return a+"-ıncı";var b=a%10,c=a%100-b,d=a>=100?100:null;return a+(Kg[b]||Kg[c]||Kg[d])},week:{dow:1,doy:7}}),a.defineLocale("be",{months:{format:"студзеня_лютага_сакавіка_красавіка_траўня_чэрвеня_ліпеня_жніўня_верасня_кастрычніка_лістапада_снежня".split("_"),standalone:"студзень_люты_сакавік_красавік_травень_чэрвень_ліпень_жнівень_верасень_кастрычнік_лістапад_снежань".split("_")},monthsShort:"студ_лют_сак_крас_трав_чэрв_ліп_жнів_вер_каст_ліст_снеж".split("_"),weekdays:{format:"нядзелю_панядзелак_аўторак_сераду_чацвер_пятніцу_суботу".split("_"),standalone:"нядзеля_панядзелак_аўторак_серада_чацвер_пятніца_субота".split("_"),isFormat:/\[ ?[Вв] ?(?:мінулую|наступную)? ?\] ?dddd/},weekdaysShort:"нд_пн_ат_ср_чц_пт_сб".split("_"),weekdaysMin:"нд_пн_ат_ср_чц_пт_сб".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY",LL:"D MMMM YYYY г.",LLL:"D MMMM YYYY г., HH:mm",LLLL:"dddd, D MMMM YYYY г., HH:mm"},calendar:{sameDay:"[Сёння ў] LT",nextDay:"[Заўтра ў] LT",lastDay:"[Учора ў] LT",nextWeek:function(){return"[У] dddd [ў] LT"},lastWeek:function(){switch(this.day()){case 0:case 3:case 5:case 6:return"[У мінулую] dddd [ў] LT";case 1:case 2:case 4:return"[У мінулы] dddd [ў] LT"}},sameElse:"L"},relativeTime:{future:"праз %s",past:"%s таму",s:"некалькі секунд",m:td,mm:td,h:td,hh:td,d:"дзень",dd:td,M:"месяц",MM:td,y:"год",yy:td},meridiemParse:/ночы|раніцы|дня|вечара/,isPM:function(a){return/^(дня|вечара)$/.test(a)},meridiem:function(a,b,c){return a<4?"ночы":a<12?"раніцы":a<17?"дня":"вечара"},dayOfMonthOrdinalParse:/\d{1,2}-(і|ы|га)/,ordinal:function(a,b){switch(b){case"M":case"d":case"DDD":case"w":case"W":return a%10!==2&&a%10!==3||a%100===12||a%100===13?a+"-ы":a+"-і";case"D":return a+"-га";default:return a}},week:{dow:1,doy:7}}),
//! moment.js locale configuration
//! locale : Bulgarian [bg]
//! author : Krasen Borisov : https://github.com/kraz
a.defineLocale("bg",{months:"януари_февруари_март_април_май_юни_юли_август_септември_октомври_ноември_декември".split("_"),monthsShort:"янр_фев_мар_апр_май_юни_юли_авг_сеп_окт_ное_дек".split("_"),weekdays:"неделя_понеделник_вторник_сряда_четвъртък_петък_събота".split("_"),weekdaysShort:"нед_пон_вто_сря_чет_пет_съб".split("_"),weekdaysMin:"нд_пн_вт_ср_чт_пт_сб".split("_"),longDateFormat:{LT:"H:mm",LTS:"H:mm:ss",L:"D.MM.YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY H:mm",LLLL:"dddd, D MMMM YYYY H:mm"},calendar:{sameDay:"[Днес в] LT",nextDay:"[Утре в] LT",nextWeek:"dddd [в] LT",lastDay:"[Вчера в] LT",lastWeek:function(){switch(this.day()){case 0:case 3:case 6:return"[В изминалата] dddd [в] LT";case 1:case 2:case 4:case 5:return"[В изминалия] dddd [в] LT"}},sameElse:"L"},relativeTime:{future:"след %s",past:"преди %s",s:"няколко секунди",m:"минута",mm:"%d минути",h:"час",hh:"%d часа",d:"ден",dd:"%d дни",M:"месец",MM:"%d месеца",y:"година",yy:"%d години"},dayOfMonthOrdinalParse:/\d{1,2}-(ев|ен|ти|ви|ри|ми)/,ordinal:function(a){var b=a%10,c=a%100;return 0===a?a+"-ев":0===c?a+"-ен":c>10&&c<20?a+"-ти":1===b?a+"-ви":2===b?a+"-ри":7===b||8===b?a+"-ми":a+"-ти"},week:{dow:1,doy:7}});
//! moment.js locale configuration
//! locale : Bengali [bn]
//! author : Kaushik Gandhi : https://github.com/kaushikgandhi
var Lg={1:"১",2:"২",3:"৩",4:"৪",5:"৫",6:"৬",7:"৭",8:"৮",9:"৯",0:"০"},Mg={"১":"1","২":"2","৩":"3","৪":"4","৫":"5","৬":"6","৭":"7","৮":"8","৯":"9","০":"0"};a.defineLocale("bn",{months:"জানুয়ারী_ফেব্রুয়ারি_মার্চ_এপ্রিল_মে_জুন_জুলাই_আগস্ট_সেপ্টেম্বর_অক্টোবর_নভেম্বর_ডিসেম্বর".split("_"),monthsShort:"জানু_ফেব_মার্চ_এপ্র_মে_জুন_জুল_আগ_সেপ্ট_অক্টো_নভে_ডিসে".split("_"),weekdays:"রবিবার_সোমবার_মঙ্গলবার_বুধবার_বৃহস্পতিবার_শুক্রবার_শনিবার".split("_"),weekdaysShort:"রবি_সোম_মঙ্গল_বুধ_বৃহস্পতি_শুক্র_শনি".split("_"),weekdaysMin:"রবি_সোম_মঙ্গ_বুধ_বৃহঃ_শুক্র_শনি".split("_"),longDateFormat:{LT:"A h:mm সময়",LTS:"A h:mm:ss সময়",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY, A h:mm সময়",LLLL:"dddd, D MMMM YYYY, A h:mm সময়"},calendar:{sameDay:"[আজ] LT",nextDay:"[আগামীকাল] LT",nextWeek:"dddd, LT",lastDay:"[গতকাল] LT",lastWeek:"[গত] dddd, LT",sameElse:"L"},relativeTime:{future:"%s পরে",past:"%s আগে",s:"কয়েক সেকেন্ড",m:"এক মিনিট",mm:"%d মিনিট",h:"এক ঘন্টা",hh:"%d ঘন্টা",d:"এক দিন",dd:"%d দিন",M:"এক মাস",MM:"%d মাস",y:"এক বছর",yy:"%d বছর"},preparse:function(a){return a.replace(/[১২৩৪৫৬৭৮৯০]/g,function(a){return Mg[a]})},postformat:function(a){return a.replace(/\d/g,function(a){return Lg[a]})},meridiemParse:/রাত|সকাল|দুপুর|বিকাল|রাত/,meridiemHour:function(a,b){return 12===a&&(a=0),"রাত"===b&&a>=4||"দুপুর"===b&&a<5||"বিকাল"===b?a+12:a},meridiem:function(a,b,c){return a<4?"রাত":a<10?"সকাল":a<17?"দুপুর":a<20?"বিকাল":"রাত"},week:{dow:0,doy:6}});
//! moment.js locale configuration
//! locale : Tibetan [bo]
//! author : Thupten N. Chakrishar : https://github.com/vajradog
var Ng={1:"༡",2:"༢",3:"༣",4:"༤",5:"༥",6:"༦",7:"༧",8:"༨",9:"༩",0:"༠"},Og={"༡":"1","༢":"2","༣":"3","༤":"4","༥":"5","༦":"6","༧":"7","༨":"8","༩":"9","༠":"0"};a.defineLocale("bo",{months:"ཟླ་བ་དང་པོ_ཟླ་བ་གཉིས་པ_ཟླ་བ་གསུམ་པ_ཟླ་བ་བཞི་པ_ཟླ་བ་ལྔ་པ_ཟླ་བ་དྲུག་པ_ཟླ་བ་བདུན་པ_ཟླ་བ་བརྒྱད་པ_ཟླ་བ་དགུ་པ_ཟླ་བ་བཅུ་པ_ཟླ་བ་བཅུ་གཅིག་པ_ཟླ་བ་བཅུ་གཉིས་པ".split("_"),monthsShort:"ཟླ་བ་དང་པོ_ཟླ་བ་གཉིས་པ_ཟླ་བ་གསུམ་པ_ཟླ་བ་བཞི་པ_ཟླ་བ་ལྔ་པ_ཟླ་བ་དྲུག་པ_ཟླ་བ་བདུན་པ_ཟླ་བ་བརྒྱད་པ_ཟླ་བ་དགུ་པ_ཟླ་བ་བཅུ་པ_ཟླ་བ་བཅུ་གཅིག་པ_ཟླ་བ་བཅུ་གཉིས་པ".split("_"),weekdays:"གཟའ་ཉི་མ་_གཟའ་ཟླ་བ་_གཟའ་མིག་དམར་_གཟའ་ལྷག་པ་_གཟའ་ཕུར་བུ_གཟའ་པ་སངས་_གཟའ་སྤེན་པ་".split("_"),weekdaysShort:"ཉི་མ་_ཟླ་བ་_མིག་དམར་_ལྷག་པ་_ཕུར་བུ_པ་སངས་_སྤེན་པ་".split("_"),weekdaysMin:"ཉི་མ་_ཟླ་བ་_མིག་དམར་_ལྷག་པ་_ཕུར་བུ_པ་སངས་_སྤེན་པ་".split("_"),longDateFormat:{LT:"A h:mm",LTS:"A h:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY, A h:mm",LLLL:"dddd, D MMMM YYYY, A h:mm"},calendar:{sameDay:"[དི་རིང] LT",nextDay:"[སང་ཉིན] LT",nextWeek:"[བདུན་ཕྲག་རྗེས་མ], LT",lastDay:"[ཁ་སང] LT",lastWeek:"[བདུན་ཕྲག་མཐའ་མ] dddd, LT",sameElse:"L"},relativeTime:{future:"%s ལ་",past:"%s སྔན་ལ",s:"ལམ་སང",m:"སྐར་མ་གཅིག",mm:"%d སྐར་མ",h:"ཆུ་ཚོད་གཅིག",hh:"%d ཆུ་ཚོད",d:"ཉིན་གཅིག",dd:"%d ཉིན་",M:"ཟླ་བ་གཅིག",MM:"%d ཟླ་བ",y:"ལོ་གཅིག",yy:"%d ལོ"},preparse:function(a){return a.replace(/[༡༢༣༤༥༦༧༨༩༠]/g,function(a){return Og[a]})},postformat:function(a){return a.replace(/\d/g,function(a){return Ng[a]})},meridiemParse:/མཚན་མོ|ཞོགས་ཀས|ཉིན་གུང|དགོང་དག|མཚན་མོ/,meridiemHour:function(a,b){return 12===a&&(a=0),"མཚན་མོ"===b&&a>=4||"ཉིན་གུང"===b&&a<5||"དགོང་དག"===b?a+12:a},meridiem:function(a,b,c){return a<4?"མཚན་མོ":a<10?"ཞོགས་ཀས":a<17?"ཉིན་གུང":a<20?"དགོང་དག":"མཚན་མོ"},week:{dow:0,doy:6}}),a.defineLocale("br",{months:"Genver_C'hwevrer_Meurzh_Ebrel_Mae_Mezheven_Gouere_Eost_Gwengolo_Here_Du_Kerzu".split("_"),monthsShort:"Gen_C'hwe_Meu_Ebr_Mae_Eve_Gou_Eos_Gwe_Her_Du_Ker".split("_"),weekdays:"Sul_Lun_Meurzh_Merc'her_Yaou_Gwener_Sadorn".split("_"),weekdaysShort:"Sul_Lun_Meu_Mer_Yao_Gwe_Sad".split("_"),weekdaysMin:"Su_Lu_Me_Mer_Ya_Gw_Sa".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"h[e]mm A",LTS:"h[e]mm:ss A",L:"DD/MM/YYYY",LL:"D [a viz] MMMM YYYY",LLL:"D [a viz] MMMM YYYY h[e]mm A",LLLL:"dddd, D [a viz] MMMM YYYY h[e]mm A"},calendar:{sameDay:"[Hiziv da] LT",nextDay:"[Warc'hoazh da] LT",nextWeek:"dddd [da] LT",lastDay:"[Dec'h da] LT",lastWeek:"dddd [paset da] LT",sameElse:"L"},relativeTime:{future:"a-benn %s",past:"%s 'zo",s:"un nebeud segondennoù",m:"ur vunutenn",mm:ud,h:"un eur",hh:"%d eur",d:"un devezh",dd:ud,M:"ur miz",MM:ud,y:"ur bloaz",yy:vd},dayOfMonthOrdinalParse:/\d{1,2}(añ|vet)/,ordinal:function(a){var b=1===a?"añ":"vet";return a+b},week:{dow:1,doy:4}}),a.defineLocale("bs",{months:"januar_februar_mart_april_maj_juni_juli_august_septembar_oktobar_novembar_decembar".split("_"),monthsShort:"jan._feb._mar._apr._maj._jun._jul._aug._sep._okt._nov._dec.".split("_"),monthsParseExact:!0,weekdays:"nedjelja_ponedjeljak_utorak_srijeda_četvrtak_petak_subota".split("_"),weekdaysShort:"ned._pon._uto._sri._čet._pet._sub.".split("_"),weekdaysMin:"ne_po_ut_sr_če_pe_su".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"H:mm",LTS:"H:mm:ss",L:"DD.MM.YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY H:mm",LLLL:"dddd, D. MMMM YYYY H:mm"},calendar:{sameDay:"[danas u] LT",nextDay:"[sutra u] LT",nextWeek:function(){switch(this.day()){case 0:return"[u] [nedjelju] [u] LT";case 3:return"[u] [srijedu] [u] LT";case 6:return"[u] [subotu] [u] LT";case 1:case 2:case 4:case 5:return"[u] dddd [u] LT"}},lastDay:"[jučer u] LT",lastWeek:function(){switch(this.day()){case 0:case 3:return"[prošlu] dddd [u] LT";case 6:return"[prošle] [subote] [u] LT";case 1:case 2:case 4:case 5:return"[prošli] dddd [u] LT"}},sameElse:"L"},relativeTime:{future:"za %s",past:"prije %s",s:"par sekundi",m:zd,mm:zd,h:zd,hh:zd,d:"dan",dd:zd,M:"mjesec",MM:zd,y:"godinu",yy:zd},dayOfMonthOrdinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:7}}),
//! moment.js locale configuration
//! locale : Catalan [ca]
//! author : Juan G. Hurtado : https://github.com/juanghurtado
a.defineLocale("ca",{months:{standalone:"gener_febrer_març_abril_maig_juny_juliol_agost_setembre_octubre_novembre_desembre".split("_"),format:"de gener_de febrer_de març_d'abril_de maig_de juny_de juliol_d'agost_de setembre_d'octubre_de novembre_de desembre".split("_"),isFormat:/D[oD]?(\s)+MMMM/},monthsShort:"gen._febr._març_abr._maig_juny_jul._ag._set._oct._nov._des.".split("_"),monthsParseExact:!0,weekdays:"diumenge_dilluns_dimarts_dimecres_dijous_divendres_dissabte".split("_"),weekdaysShort:"dg._dl._dt._dc._dj._dv._ds.".split("_"),weekdaysMin:"Dg_Dl_Dt_Dc_Dj_Dv_Ds".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"H:mm",LTS:"H:mm:ss",L:"DD/MM/YYYY",LL:"[el] D MMMM [de] YYYY",ll:"D MMM YYYY",LLL:"[el] D MMMM [de] YYYY [a les] H:mm",lll:"D MMM YYYY, H:mm",LLLL:"[el] dddd D MMMM [de] YYYY [a les] H:mm",llll:"ddd D MMM YYYY, H:mm"},calendar:{sameDay:function(){return"[avui a "+(1!==this.hours()?"les":"la")+"] LT"},nextDay:function(){return"[demà a "+(1!==this.hours()?"les":"la")+"] LT"},nextWeek:function(){return"dddd [a "+(1!==this.hours()?"les":"la")+"] LT"},lastDay:function(){return"[ahir a "+(1!==this.hours()?"les":"la")+"] LT"},lastWeek:function(){return"[el] dddd [passat a "+(1!==this.hours()?"les":"la")+"] LT"},sameElse:"L"},relativeTime:{future:"d'aquí %s",past:"fa %s",s:"uns segons",m:"un minut",mm:"%d minuts",h:"una hora",hh:"%d hores",d:"un dia",dd:"%d dies",M:"un mes",MM:"%d mesos",y:"un any",yy:"%d anys"},dayOfMonthOrdinalParse:/\d{1,2}(r|n|t|è|a)/,ordinal:function(a,b){var c=1===a?"r":2===a?"n":3===a?"r":4===a?"t":"è";return"w"!==b&&"W"!==b||(c="a"),a+c},week:{dow:1,doy:4}});
//! moment.js locale configuration
//! locale : Czech [cs]
//! author : petrbela : https://github.com/petrbela
var Pg="leden_únor_březen_duben_květen_červen_červenec_srpen_září_říjen_listopad_prosinec".split("_"),Qg="led_úno_bře_dub_kvě_čvn_čvc_srp_zář_říj_lis_pro".split("_");a.defineLocale("cs",{months:Pg,monthsShort:Qg,monthsParse:function(a,b){var c,d=[];for(c=0;c<12;c++)d[c]=new RegExp("^"+a[c]+"$|^"+b[c]+"$","i");return d}(Pg,Qg),shortMonthsParse:function(a){var b,c=[];for(b=0;b<12;b++)c[b]=new RegExp("^"+a[b]+"$","i");return c}(Qg),longMonthsParse:function(a){var b,c=[];for(b=0;b<12;b++)c[b]=new RegExp("^"+a[b]+"$","i");return c}(Pg),weekdays:"neděle_pondělí_úterý_středa_čtvrtek_pátek_sobota".split("_"),weekdaysShort:"ne_po_út_st_čt_pá_so".split("_"),weekdaysMin:"ne_po_út_st_čt_pá_so".split("_"),longDateFormat:{LT:"H:mm",LTS:"H:mm:ss",L:"DD.MM.YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY H:mm",LLLL:"dddd D. MMMM YYYY H:mm",l:"D. M. YYYY"},calendar:{sameDay:"[dnes v] LT",nextDay:"[zítra v] LT",nextWeek:function(){switch(this.day()){case 0:return"[v neděli v] LT";case 1:case 2:return"[v] dddd [v] LT";case 3:return"[ve středu v] LT";case 4:return"[ve čtvrtek v] LT";case 5:return"[v pátek v] LT";case 6:return"[v sobotu v] LT"}},lastDay:"[včera v] LT",lastWeek:function(){switch(this.day()){case 0:return"[minulou neděli v] LT";case 1:case 2:return"[minulé] dddd [v] LT";case 3:return"[minulou středu v] LT";case 4:case 5:return"[minulý] dddd [v] LT";case 6:return"[minulou sobotu v] LT"}},sameElse:"L"},relativeTime:{future:"za %s",past:"před %s",s:Bd,m:Bd,mm:Bd,h:Bd,hh:Bd,d:Bd,dd:Bd,M:Bd,MM:Bd,y:Bd,yy:Bd},dayOfMonthOrdinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}}),
//! moment.js locale configuration
//! locale : Chuvash [cv]
//! author : Anatoly Mironov : https://github.com/mirontoli
a.defineLocale("cv",{months:"кӑрлач_нарӑс_пуш_ака_май_ҫӗртме_утӑ_ҫурла_авӑн_юпа_чӳк_раштав".split("_"),monthsShort:"кӑр_нар_пуш_ака_май_ҫӗр_утӑ_ҫур_авн_юпа_чӳк_раш".split("_"),weekdays:"вырсарникун_тунтикун_ытларикун_юнкун_кӗҫнерникун_эрнекун_шӑматкун".split("_"),weekdaysShort:"выр_тун_ытл_юн_кӗҫ_эрн_шӑм".split("_"),weekdaysMin:"вр_тн_ыт_юн_кҫ_эр_шм".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD-MM-YYYY",LL:"YYYY [ҫулхи] MMMM [уйӑхӗн] D[-мӗшӗ]",LLL:"YYYY [ҫулхи] MMMM [уйӑхӗн] D[-мӗшӗ], HH:mm",LLLL:"dddd, YYYY [ҫулхи] MMMM [уйӑхӗн] D[-мӗшӗ], HH:mm"},calendar:{sameDay:"[Паян] LT [сехетре]",nextDay:"[Ыран] LT [сехетре]",lastDay:"[Ӗнер] LT [сехетре]",nextWeek:"[Ҫитес] dddd LT [сехетре]",lastWeek:"[Иртнӗ] dddd LT [сехетре]",sameElse:"L"},relativeTime:{future:function(a){var b=/сехет$/i.exec(a)?"рен":/ҫул$/i.exec(a)?"тан":"ран";return a+b},past:"%s каялла",s:"пӗр-ик ҫеккунт",m:"пӗр минут",mm:"%d минут",h:"пӗр сехет",hh:"%d сехет",d:"пӗр кун",dd:"%d кун",M:"пӗр уйӑх",MM:"%d уйӑх",y:"пӗр ҫул",yy:"%d ҫул"},dayOfMonthOrdinalParse:/\d{1,2}-мӗш/,ordinal:"%d-мӗш",week:{dow:1,doy:7}}),
//! moment.js locale configuration
//! locale : Welsh [cy]
//! author : Robert Allen : https://github.com/robgallen
//! author : https://github.com/ryangreaves
a.defineLocale("cy",{months:"Ionawr_Chwefror_Mawrth_Ebrill_Mai_Mehefin_Gorffennaf_Awst_Medi_Hydref_Tachwedd_Rhagfyr".split("_"),monthsShort:"Ion_Chwe_Maw_Ebr_Mai_Meh_Gor_Aws_Med_Hyd_Tach_Rhag".split("_"),weekdays:"Dydd Sul_Dydd Llun_Dydd Mawrth_Dydd Mercher_Dydd Iau_Dydd Gwener_Dydd Sadwrn".split("_"),weekdaysShort:"Sul_Llun_Maw_Mer_Iau_Gwe_Sad".split("_"),weekdaysMin:"Su_Ll_Ma_Me_Ia_Gw_Sa".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd, D MMMM YYYY HH:mm"},calendar:{sameDay:"[Heddiw am] LT",nextDay:"[Yfory am] LT",nextWeek:"dddd [am] LT",lastDay:"[Ddoe am] LT",lastWeek:"dddd [diwethaf am] LT",sameElse:"L"},relativeTime:{future:"mewn %s",past:"%s yn ôl",s:"ychydig eiliadau",m:"munud",mm:"%d munud",h:"awr",hh:"%d awr",d:"diwrnod",dd:"%d diwrnod",M:"mis",MM:"%d mis",y:"blwyddyn",yy:"%d flynedd"},dayOfMonthOrdinalParse:/\d{1,2}(fed|ain|af|il|ydd|ed|eg)/,ordinal:function(a){var b=a,c="",d=["","af","il","ydd","ydd","ed","ed","ed","fed","fed","fed","eg","fed","eg","eg","fed","eg","eg","fed","eg","fed"];return b>20?c=40===b||50===b||60===b||80===b||100===b?"fed":"ain":b>0&&(c=d[b]),a+c},week:{dow:1,doy:4}}),
//! moment.js locale configuration
//! locale : Danish [da]
//! author : Ulrik Nielsen : https://github.com/mrbase
a.defineLocale("da",{months:"januar_februar_marts_april_maj_juni_juli_august_september_oktober_november_december".split("_"),monthsShort:"jan_feb_mar_apr_maj_jun_jul_aug_sep_okt_nov_dec".split("_"),weekdays:"søndag_mandag_tirsdag_onsdag_torsdag_fredag_lørdag".split("_"),weekdaysShort:"søn_man_tir_ons_tor_fre_lør".split("_"),weekdaysMin:"sø_ma_ti_on_to_fr_lø".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY HH:mm",LLLL:"dddd [d.] D. MMMM YYYY [kl.] HH:mm"},calendar:{sameDay:"[i dag kl.] LT",nextDay:"[i morgen kl.] LT",nextWeek:"på dddd [kl.] LT",lastDay:"[i går kl.] LT",lastWeek:"[i] dddd[s kl.] LT",sameElse:"L"},relativeTime:{future:"om %s",past:"%s siden",s:"få sekunder",m:"et minut",mm:"%d minutter",h:"en time",hh:"%d timer",d:"en dag",dd:"%d dage",M:"en måned",MM:"%d måneder",y:"et år",yy:"%d år"},dayOfMonthOrdinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}}),a.defineLocale("de-at",{months:"Jänner_Februar_März_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember".split("_"),monthsShort:"Jän._Febr._Mrz._Apr._Mai_Jun._Jul._Aug._Sept._Okt._Nov._Dez.".split("_"),monthsParseExact:!0,weekdays:"Sonntag_Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag".split("_"),weekdaysShort:"So._Mo._Di._Mi._Do._Fr._Sa.".split("_"),weekdaysMin:"So_Mo_Di_Mi_Do_Fr_Sa".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY HH:mm",LLLL:"dddd, D. MMMM YYYY HH:mm"},calendar:{sameDay:"[heute um] LT [Uhr]",sameElse:"L",nextDay:"[morgen um] LT [Uhr]",nextWeek:"dddd [um] LT [Uhr]",lastDay:"[gestern um] LT [Uhr]",lastWeek:"[letzten] dddd [um] LT [Uhr]"},relativeTime:{future:"in %s",past:"vor %s",s:"ein paar Sekunden",m:Cd,mm:"%d Minuten",h:Cd,hh:"%d Stunden",d:Cd,dd:Cd,M:Cd,MM:Cd,y:Cd,yy:Cd},dayOfMonthOrdinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}}),a.defineLocale("de-ch",{months:"Januar_Februar_März_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember".split("_"),monthsShort:"Jan._Febr._März_April_Mai_Juni_Juli_Aug._Sept._Okt._Nov._Dez.".split("_"),monthsParseExact:!0,weekdays:"Sonntag_Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag".split("_"),weekdaysShort:"So_Mo_Di_Mi_Do_Fr_Sa".split("_"),weekdaysMin:"So_Mo_Di_Mi_Do_Fr_Sa".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"HH.mm",LTS:"HH.mm.ss",L:"DD.MM.YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY HH.mm",LLLL:"dddd, D. MMMM YYYY HH.mm"},calendar:{sameDay:"[heute um] LT [Uhr]",sameElse:"L",nextDay:"[morgen um] LT [Uhr]",nextWeek:"dddd [um] LT [Uhr]",lastDay:"[gestern um] LT [Uhr]",lastWeek:"[letzten] dddd [um] LT [Uhr]"},relativeTime:{future:"in %s",past:"vor %s",s:"ein paar Sekunden",m:Dd,mm:"%d Minuten",h:Dd,hh:"%d Stunden",d:Dd,dd:Dd,M:Dd,MM:Dd,y:Dd,yy:Dd},dayOfMonthOrdinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}}),a.defineLocale("de",{months:"Januar_Februar_März_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember".split("_"),monthsShort:"Jan._Febr._Mrz._Apr._Mai_Jun._Jul._Aug._Sept._Okt._Nov._Dez.".split("_"),monthsParseExact:!0,weekdays:"Sonntag_Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag".split("_"),weekdaysShort:"So._Mo._Di._Mi._Do._Fr._Sa.".split("_"),weekdaysMin:"So_Mo_Di_Mi_Do_Fr_Sa".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY HH:mm",LLLL:"dddd, D. MMMM YYYY HH:mm"},calendar:{sameDay:"[heute um] LT [Uhr]",sameElse:"L",nextDay:"[morgen um] LT [Uhr]",nextWeek:"dddd [um] LT [Uhr]",lastDay:"[gestern um] LT [Uhr]",lastWeek:"[letzten] dddd [um] LT [Uhr]"},relativeTime:{future:"in %s",past:"vor %s",s:"ein paar Sekunden",m:Ed,mm:"%d Minuten",h:Ed,hh:"%d Stunden",d:Ed,dd:Ed,M:Ed,MM:Ed,y:Ed,yy:Ed},dayOfMonthOrdinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}});
//! moment.js locale configuration
//! locale : Maldivian [dv]
//! author : Jawish Hameed : https://github.com/jawish
var Rg=["ޖެނުއަރީ","ފެބްރުއަރީ","މާރިޗު","އޭޕްރީލު","މޭ","ޖޫން","ޖުލައި","އޯގަސްޓު","ސެޕްޓެމްބަރު","އޮކްޓޯބަރު","ނޮވެމްބަރު","ޑިސެމްބަރު"],Sg=["އާދިއްތަ","ހޯމަ","އަންގާރަ","ބުދަ","ބުރާސްފަތި","ހުކުރު","ހޮނިހިރު"];a.defineLocale("dv",{months:Rg,monthsShort:Rg,weekdays:Sg,weekdaysShort:Sg,weekdaysMin:"އާދި_ހޯމަ_އަން_ބުދަ_ބުރާ_ހުކު_ހޮނި".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"D/M/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd D MMMM YYYY HH:mm"},meridiemParse:/މކ|މފ/,isPM:function(a){return"މފ"===a},meridiem:function(a,b,c){return a<12?"މކ":"މފ"},calendar:{sameDay:"[މިއަދު] LT",nextDay:"[މާދަމާ] LT",nextWeek:"dddd LT",lastDay:"[އިއްޔެ] LT",lastWeek:"[ފާއިތުވި] dddd LT",sameElse:"L"},relativeTime:{future:"ތެރޭގައި %s",past:"ކުރިން %s",s:"ސިކުންތުކޮޅެއް",m:"މިނިޓެއް",mm:"މިނިޓު %d",h:"ގަޑިއިރެއް",hh:"ގަޑިއިރު %d",d:"ދުވަހެއް",dd:"ދުވަސް %d",M:"މަހެއް",MM:"މަސް %d",y:"އަހަރެއް",yy:"އަހަރު %d"},preparse:function(a){return a.replace(/،/g,",")},postformat:function(a){return a.replace(/,/g,"،")},week:{dow:7,doy:12}}),
//! moment.js locale configuration
//! locale : Greek [el]
//! author : Aggelos Karalias : https://github.com/mehiel
a.defineLocale("el",{monthsNominativeEl:"Ιανουάριος_Φεβρουάριος_Μάρτιος_Απρίλιος_Μάιος_Ιούνιος_Ιούλιος_Αύγουστος_Σεπτέμβριος_Οκτώβριος_Νοέμβριος_Δεκέμβριος".split("_"),monthsGenitiveEl:"Ιανουαρίου_Φεβρουαρίου_Μαρτίου_Απριλίου_Μαΐου_Ιουνίου_Ιουλίου_Αυγούστου_Σεπτεμβρίου_Οκτωβρίου_Νοεμβρίου_Δεκεμβρίου".split("_"),months:function(a,b){return a?/D/.test(b.substring(0,b.indexOf("MMMM")))?this._monthsGenitiveEl[a.month()]:this._monthsNominativeEl[a.month()]:this._monthsNominativeEl},monthsShort:"Ιαν_Φεβ_Μαρ_Απρ_Μαϊ_Ιουν_Ιουλ_Αυγ_Σεπ_Οκτ_Νοε_Δεκ".split("_"),weekdays:"Κυριακή_Δευτέρα_Τρίτη_Τετάρτη_Πέμπτη_Παρασκευή_Σάββατο".split("_"),weekdaysShort:"Κυρ_Δευ_Τρι_Τετ_Πεμ_Παρ_Σαβ".split("_"),weekdaysMin:"Κυ_Δε_Τρ_Τε_Πε_Πα_Σα".split("_"),meridiem:function(a,b,c){return a>11?c?"μμ":"ΜΜ":c?"πμ":"ΠΜ"},isPM:function(a){return"μ"===(a+"").toLowerCase()[0]},meridiemParse:/[ΠΜ]\.?Μ?\.?/i,longDateFormat:{LT:"h:mm A",LTS:"h:mm:ss A",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY h:mm A",LLLL:"dddd, D MMMM YYYY h:mm A"},calendarEl:{sameDay:"[Σήμερα {}] LT",nextDay:"[Αύριο {}] LT",nextWeek:"dddd [{}] LT",lastDay:"[Χθες {}] LT",lastWeek:function(){switch(this.day()){case 6:return"[το προηγούμενο] dddd [{}] LT";default:return"[την προηγούμενη] dddd [{}] LT"}},sameElse:"L"},calendar:function(a,b){var c=this._calendarEl[a],d=b&&b.hours();return z(c)&&(c=c.apply(b)),c.replace("{}",d%12===1?"στη":"στις")},relativeTime:{future:"σε %s",past:"%s πριν",s:"λίγα δευτερόλεπτα",m:"ένα λεπτό",mm:"%d λεπτά",h:"μία ώρα",hh:"%d ώρες",d:"μία μέρα",dd:"%d μέρες",M:"ένας μήνας",MM:"%d μήνες",y:"ένας χρόνος",yy:"%d χρόνια"},dayOfMonthOrdinalParse:/\d{1,2}η/,ordinal:"%dη",week:{dow:1,doy:4}}),
//! moment.js locale configuration
//! locale : English (Australia) [en-au]
//! author : Jared Morse : https://github.com/jarcoal
a.defineLocale("en-au",{months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),monthsShort:"Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),weekdaysShort:"Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),weekdaysMin:"Su_Mo_Tu_We_Th_Fr_Sa".split("_"),longDateFormat:{LT:"h:mm A",LTS:"h:mm:ss A",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY h:mm A",LLLL:"dddd, D MMMM YYYY h:mm A"},calendar:{sameDay:"[Today at] LT",nextDay:"[Tomorrow at] LT",nextWeek:"dddd [at] LT",lastDay:"[Yesterday at] LT",lastWeek:"[Last] dddd [at] LT",sameElse:"L"},relativeTime:{future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"},dayOfMonthOrdinalParse:/\d{1,2}(st|nd|rd|th)/,ordinal:function(a){var b=a%10,c=1===~~(a%100/10)?"th":1===b?"st":2===b?"nd":3===b?"rd":"th";return a+c},week:{dow:1,doy:4}}),
//! moment.js locale configuration
//! locale : English (Canada) [en-ca]
//! author : Jonathan Abourbih : https://github.com/jonbca
a.defineLocale("en-ca",{months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),monthsShort:"Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),weekdaysShort:"Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),weekdaysMin:"Su_Mo_Tu_We_Th_Fr_Sa".split("_"),longDateFormat:{LT:"h:mm A",LTS:"h:mm:ss A",L:"YYYY-MM-DD",LL:"MMMM D, YYYY",LLL:"MMMM D, YYYY h:mm A",LLLL:"dddd, MMMM D, YYYY h:mm A"},calendar:{sameDay:"[Today at] LT",nextDay:"[Tomorrow at] LT",nextWeek:"dddd [at] LT",lastDay:"[Yesterday at] LT",lastWeek:"[Last] dddd [at] LT",sameElse:"L"},relativeTime:{future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"},dayOfMonthOrdinalParse:/\d{1,2}(st|nd|rd|th)/,ordinal:function(a){var b=a%10,c=1===~~(a%100/10)?"th":1===b?"st":2===b?"nd":3===b?"rd":"th";return a+c}}),
//! moment.js locale configuration
//! locale : English (United Kingdom) [en-gb]
//! author : Chris Gedrim : https://github.com/chrisgedrim
a.defineLocale("en-gb",{months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),monthsShort:"Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),weekdaysShort:"Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),weekdaysMin:"Su_Mo_Tu_We_Th_Fr_Sa".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd, D MMMM YYYY HH:mm"},calendar:{sameDay:"[Today at] LT",nextDay:"[Tomorrow at] LT",nextWeek:"dddd [at] LT",lastDay:"[Yesterday at] LT",lastWeek:"[Last] dddd [at] LT",sameElse:"L"},relativeTime:{future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"},dayOfMonthOrdinalParse:/\d{1,2}(st|nd|rd|th)/,ordinal:function(a){var b=a%10,c=1===~~(a%100/10)?"th":1===b?"st":2===b?"nd":3===b?"rd":"th";return a+c},week:{dow:1,doy:4}}),
//! moment.js locale configuration
//! locale : English (Ireland) [en-ie]
//! author : Chris Cartlidge : https://github.com/chriscartlidge
a.defineLocale("en-ie",{months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),monthsShort:"Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),weekdaysShort:"Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),weekdaysMin:"Su_Mo_Tu_We_Th_Fr_Sa".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD-MM-YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd D MMMM YYYY HH:mm"},calendar:{sameDay:"[Today at] LT",nextDay:"[Tomorrow at] LT",nextWeek:"dddd [at] LT",lastDay:"[Yesterday at] LT",lastWeek:"[Last] dddd [at] LT",sameElse:"L"},relativeTime:{future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"},dayOfMonthOrdinalParse:/\d{1,2}(st|nd|rd|th)/,ordinal:function(a){var b=a%10,c=1===~~(a%100/10)?"th":1===b?"st":2===b?"nd":3===b?"rd":"th";return a+c},week:{dow:1,doy:4}}),
//! moment.js locale configuration
//! locale : English (New Zealand) [en-nz]
//! author : Luke McGregor : https://github.com/lukemcgregor
a.defineLocale("en-nz",{months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),monthsShort:"Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),weekdaysShort:"Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),weekdaysMin:"Su_Mo_Tu_We_Th_Fr_Sa".split("_"),longDateFormat:{LT:"h:mm A",LTS:"h:mm:ss A",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY h:mm A",LLLL:"dddd, D MMMM YYYY h:mm A"},calendar:{sameDay:"[Today at] LT",nextDay:"[Tomorrow at] LT",nextWeek:"dddd [at] LT",lastDay:"[Yesterday at] LT",lastWeek:"[Last] dddd [at] LT",sameElse:"L"},relativeTime:{future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"},dayOfMonthOrdinalParse:/\d{1,2}(st|nd|rd|th)/,ordinal:function(a){var b=a%10,c=1===~~(a%100/10)?"th":1===b?"st":2===b?"nd":3===b?"rd":"th";return a+c},week:{dow:1,doy:4}}),
//! moment.js locale configuration
//! locale : Esperanto [eo]
//! author : Colin Dean : https://github.com/colindean
//! author : Mia Nordentoft Imperatori : https://github.com/miestasmia
//! comment : miestasmia corrected the translation by colindean
a.defineLocale("eo",{months:"januaro_februaro_marto_aprilo_majo_junio_julio_aŭgusto_septembro_oktobro_novembro_decembro".split("_"),monthsShort:"jan_feb_mar_apr_maj_jun_jul_aŭg_sep_okt_nov_dec".split("_"),weekdays:"dimanĉo_lundo_mardo_merkredo_ĵaŭdo_vendredo_sabato".split("_"),weekdaysShort:"dim_lun_mard_merk_ĵaŭ_ven_sab".split("_"),weekdaysMin:"di_lu_ma_me_ĵa_ve_sa".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"YYYY-MM-DD",LL:"D[-a de] MMMM, YYYY",LLL:"D[-a de] MMMM, YYYY HH:mm",LLLL:"dddd, [la] D[-a de] MMMM, YYYY HH:mm"},meridiemParse:/[ap]\.t\.m/i,isPM:function(a){return"p"===a.charAt(0).toLowerCase()},meridiem:function(a,b,c){return a>11?c?"p.t.m.":"P.T.M.":c?"a.t.m.":"A.T.M."},calendar:{sameDay:"[Hodiaŭ je] LT",nextDay:"[Morgaŭ je] LT",nextWeek:"dddd [je] LT",lastDay:"[Hieraŭ je] LT",lastWeek:"[pasinta] dddd [je] LT",sameElse:"L"},relativeTime:{future:"post %s",past:"antaŭ %s",s:"sekundoj",m:"minuto",mm:"%d minutoj",h:"horo",hh:"%d horoj",d:"tago",dd:"%d tagoj",M:"monato",MM:"%d monatoj",y:"jaro",yy:"%d jaroj"},dayOfMonthOrdinalParse:/\d{1,2}a/,ordinal:"%da",week:{dow:1,doy:7}});
//! moment.js locale configuration
//! locale : Spanish (Dominican Republic) [es-do]
var Tg="ene._feb._mar._abr._may._jun._jul._ago._sep._oct._nov._dic.".split("_"),Ug="ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic".split("_");a.defineLocale("es-do",{months:"enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre".split("_"),monthsShort:function(a,b){return a?/-MMM-/.test(b)?Ug[a.month()]:Tg[a.month()]:Tg},monthsParseExact:!0,weekdays:"domingo_lunes_martes_miércoles_jueves_viernes_sábado".split("_"),weekdaysShort:"dom._lun._mar._mié._jue._vie._sáb.".split("_"),weekdaysMin:"do_lu_ma_mi_ju_vi_sá".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"h:mm A",LTS:"h:mm:ss A",L:"DD/MM/YYYY",LL:"D [de] MMMM [de] YYYY",LLL:"D [de] MMMM [de] YYYY h:mm A",LLLL:"dddd, D [de] MMMM [de] YYYY h:mm A"},calendar:{sameDay:function(){return"[hoy a la"+(1!==this.hours()?"s":"")+"] LT"},nextDay:function(){return"[mañana a la"+(1!==this.hours()?"s":"")+"] LT"},nextWeek:function(){return"dddd [a la"+(1!==this.hours()?"s":"")+"] LT"},lastDay:function(){return"[ayer a la"+(1!==this.hours()?"s":"")+"] LT"},lastWeek:function(){return"[el] dddd [pasado a la"+(1!==this.hours()?"s":"")+"] LT"},sameElse:"L"},relativeTime:{future:"en %s",past:"hace %s",s:"unos segundos",m:"un minuto",mm:"%d minutos",h:"una hora",hh:"%d horas",d:"un día",dd:"%d días",M:"un mes",MM:"%d meses",y:"un año",yy:"%d años"},dayOfMonthOrdinalParse:/\d{1,2}º/,ordinal:"%dº",week:{dow:1,doy:4}});
//! moment.js locale configuration
//! locale : Spanish [es]
//! author : Julio Napurí : https://github.com/julionc
var Vg="ene._feb._mar._abr._may._jun._jul._ago._sep._oct._nov._dic.".split("_"),Wg="ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic".split("_");a.defineLocale("es",{months:"enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre".split("_"),monthsShort:function(a,b){return a?/-MMM-/.test(b)?Wg[a.month()]:Vg[a.month()]:Vg},monthsParseExact:!0,weekdays:"domingo_lunes_martes_miércoles_jueves_viernes_sábado".split("_"),weekdaysShort:"dom._lun._mar._mié._jue._vie._sáb.".split("_"),weekdaysMin:"do_lu_ma_mi_ju_vi_sá".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"H:mm",LTS:"H:mm:ss",L:"DD/MM/YYYY",LL:"D [de] MMMM [de] YYYY",LLL:"D [de] MMMM [de] YYYY H:mm",LLLL:"dddd, D [de] MMMM [de] YYYY H:mm"},calendar:{sameDay:function(){return"[hoy a la"+(1!==this.hours()?"s":"")+"] LT"},nextDay:function(){return"[mañana a la"+(1!==this.hours()?"s":"")+"] LT"},nextWeek:function(){return"dddd [a la"+(1!==this.hours()?"s":"")+"] LT"},lastDay:function(){return"[ayer a la"+(1!==this.hours()?"s":"")+"] LT"},lastWeek:function(){return"[el] dddd [pasado a la"+(1!==this.hours()?"s":"")+"] LT"},sameElse:"L"},relativeTime:{future:"en %s",past:"hace %s",s:"unos segundos",m:"un minuto",mm:"%d minutos",h:"una hora",hh:"%d horas",d:"un día",dd:"%d días",M:"un mes",MM:"%d meses",y:"un año",yy:"%d años"},dayOfMonthOrdinalParse:/\d{1,2}º/,ordinal:"%dº",week:{dow:1,doy:4}}),a.defineLocale("et",{months:"jaanuar_veebruar_märts_aprill_mai_juuni_juuli_august_september_oktoober_november_detsember".split("_"),monthsShort:"jaan_veebr_märts_apr_mai_juuni_juuli_aug_sept_okt_nov_dets".split("_"),weekdays:"pühapäev_esmaspäev_teisipäev_kolmapäev_neljapäev_reede_laupäev".split("_"),weekdaysShort:"P_E_T_K_N_R_L".split("_"),weekdaysMin:"P_E_T_K_N_R_L".split("_"),longDateFormat:{LT:"H:mm",LTS:"H:mm:ss",L:"DD.MM.YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY H:mm",LLLL:"dddd, D. MMMM YYYY H:mm"},calendar:{sameDay:"[Täna,] LT",nextDay:"[Homme,] LT",nextWeek:"[Järgmine] dddd LT",lastDay:"[Eile,] LT",lastWeek:"[Eelmine] dddd LT",sameElse:"L"},relativeTime:{future:"%s pärast",past:"%s tagasi",s:Fd,m:Fd,mm:Fd,h:Fd,hh:Fd,d:Fd,dd:"%d päeva",M:Fd,MM:Fd,y:Fd,yy:Fd},dayOfMonthOrdinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}}),
//! moment.js locale configuration
//! locale : Basque [eu]
//! author : Eneko Illarramendi : https://github.com/eillarra
a.defineLocale("eu",{months:"urtarrila_otsaila_martxoa_apirila_maiatza_ekaina_uztaila_abuztua_iraila_urria_azaroa_abendua".split("_"),monthsShort:"urt._ots._mar._api._mai._eka._uzt._abu._ira._urr._aza._abe.".split("_"),monthsParseExact:!0,weekdays:"igandea_astelehena_asteartea_asteazkena_osteguna_ostirala_larunbata".split("_"),weekdaysShort:"ig._al._ar._az._og._ol._lr.".split("_"),weekdaysMin:"ig_al_ar_az_og_ol_lr".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"YYYY-MM-DD",LL:"YYYY[ko] MMMM[ren] D[a]",LLL:"YYYY[ko] MMMM[ren] D[a] HH:mm",LLLL:"dddd, YYYY[ko] MMMM[ren] D[a] HH:mm",l:"YYYY-M-D",ll:"YYYY[ko] MMM D[a]",lll:"YYYY[ko] MMM D[a] HH:mm",llll:"ddd, YYYY[ko] MMM D[a] HH:mm"},calendar:{sameDay:"[gaur] LT[etan]",nextDay:"[bihar] LT[etan]",nextWeek:"dddd LT[etan]",lastDay:"[atzo] LT[etan]",lastWeek:"[aurreko] dddd LT[etan]",sameElse:"L"},relativeTime:{future:"%s barru",past:"duela %s",s:"segundo batzuk",m:"minutu bat",mm:"%d minutu",h:"ordu bat",hh:"%d ordu",d:"egun bat",dd:"%d egun",M:"hilabete bat",MM:"%d hilabete",y:"urte bat",yy:"%d urte"},dayOfMonthOrdinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:7}});
//! moment.js locale configuration
//! locale : Persian [fa]
//! author : Ebrahim Byagowi : https://github.com/ebraminio
var Xg={1:"۱",2:"۲",3:"۳",4:"۴",5:"۵",6:"۶",7:"۷",8:"۸",9:"۹",0:"۰"},Yg={"۱":"1","۲":"2","۳":"3","۴":"4","۵":"5","۶":"6","۷":"7","۸":"8","۹":"9","۰":"0"};a.defineLocale("fa",{months:"ژانویه_فوریه_مارس_آوریل_مه_ژوئن_ژوئیه_اوت_سپتامبر_اکتبر_نوامبر_دسامبر".split("_"),monthsShort:"ژانویه_فوریه_مارس_آوریل_مه_ژوئن_ژوئیه_اوت_سپتامبر_اکتبر_نوامبر_دسامبر".split("_"),weekdays:"یک‌شنبه_دوشنبه_سه‌شنبه_چهارشنبه_پنج‌شنبه_جمعه_شنبه".split("_"),weekdaysShort:"یک‌شنبه_دوشنبه_سه‌شنبه_چهارشنبه_پنج‌شنبه_جمعه_شنبه".split("_"),weekdaysMin:"ی_د_س_چ_پ_ج_ش".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd, D MMMM YYYY HH:mm"},meridiemParse:/قبل از ظهر|بعد از ظهر/,isPM:function(a){return/بعد از ظهر/.test(a)},meridiem:function(a,b,c){return a<12?"قبل از ظهر":"بعد از ظهر"},calendar:{sameDay:"[امروز ساعت] LT",nextDay:"[فردا ساعت] LT",nextWeek:"dddd [ساعت] LT",lastDay:"[دیروز ساعت] LT",lastWeek:"dddd [پیش] [ساعت] LT",sameElse:"L"},relativeTime:{future:"در %s",past:"%s پیش",s:"چند ثانیه",m:"یک دقیقه",mm:"%d دقیقه",h:"یک ساعت",hh:"%d ساعت",d:"یک روز",dd:"%d روز",M:"یک ماه",MM:"%d ماه",y:"یک سال",yy:"%d سال"},preparse:function(a){return a.replace(/[۰-۹]/g,function(a){return Yg[a]}).replace(/،/g,",")},postformat:function(a){return a.replace(/\d/g,function(a){return Xg[a]}).replace(/,/g,"،")},dayOfMonthOrdinalParse:/\d{1,2}م/,ordinal:"%dم",week:{dow:6,doy:12}});
//! moment.js locale configuration
//! locale : Finnish [fi]
//! author : Tarmo Aidantausta : https://github.com/bleadof
var Zg="nolla yksi kaksi kolme neljä viisi kuusi seitsemän kahdeksan yhdeksän".split(" "),$g=["nolla","yhden","kahden","kolmen","neljän","viiden","kuuden",Zg[7],Zg[8],Zg[9]];a.defineLocale("fi",{months:"tammikuu_helmikuu_maaliskuu_huhtikuu_toukokuu_kesäkuu_heinäkuu_elokuu_syyskuu_lokakuu_marraskuu_joulukuu".split("_"),monthsShort:"tammi_helmi_maalis_huhti_touko_kesä_heinä_elo_syys_loka_marras_joulu".split("_"),weekdays:"sunnuntai_maanantai_tiistai_keskiviikko_torstai_perjantai_lauantai".split("_"),weekdaysShort:"su_ma_ti_ke_to_pe_la".split("_"),weekdaysMin:"su_ma_ti_ke_to_pe_la".split("_"),longDateFormat:{LT:"HH.mm",LTS:"HH.mm.ss",L:"DD.MM.YYYY",LL:"Do MMMM[ta] YYYY",LLL:"Do MMMM[ta] YYYY, [klo] HH.mm",LLLL:"dddd, Do MMMM[ta] YYYY, [klo] HH.mm",l:"D.M.YYYY",ll:"Do MMM YYYY",lll:"Do MMM YYYY, [klo] HH.mm",llll:"ddd, Do MMM YYYY, [klo] HH.mm"},calendar:{sameDay:"[tänään] [klo] LT",nextDay:"[huomenna] [klo] LT",nextWeek:"dddd [klo] LT",lastDay:"[eilen] [klo] LT",lastWeek:"[viime] dddd[na] [klo] LT",sameElse:"L"},relativeTime:{future:"%s päästä",past:"%s sitten",s:Gd,m:Gd,mm:Gd,h:Gd,hh:Gd,d:Gd,dd:Gd,M:Gd,MM:Gd,y:Gd,yy:Gd},dayOfMonthOrdinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}}),
//! moment.js locale configuration
//! locale : Faroese [fo]
//! author : Ragnar Johannesen : https://github.com/ragnar123
a.defineLocale("fo",{months:"januar_februar_mars_apríl_mai_juni_juli_august_september_oktober_november_desember".split("_"),monthsShort:"jan_feb_mar_apr_mai_jun_jul_aug_sep_okt_nov_des".split("_"),weekdays:"sunnudagur_mánadagur_týsdagur_mikudagur_hósdagur_fríggjadagur_leygardagur".split("_"),weekdaysShort:"sun_mán_týs_mik_hós_frí_ley".split("_"),weekdaysMin:"su_má_tý_mi_hó_fr_le".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd D. MMMM, YYYY HH:mm"},calendar:{sameDay:"[Í dag kl.] LT",nextDay:"[Í morgin kl.] LT",nextWeek:"dddd [kl.] LT",lastDay:"[Í gjár kl.] LT",lastWeek:"[síðstu] dddd [kl] LT",sameElse:"L"},relativeTime:{future:"um %s",past:"%s síðani",s:"fá sekund",m:"ein minutt",mm:"%d minuttir",h:"ein tími",hh:"%d tímar",d:"ein dagur",dd:"%d dagar",M:"ein mánaði",MM:"%d mánaðir",y:"eitt ár",yy:"%d ár"},dayOfMonthOrdinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}}),
//! moment.js locale configuration
//! locale : French (Canada) [fr-ca]
//! author : Jonathan Abourbih : https://github.com/jonbca
a.defineLocale("fr-ca",{months:"janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre".split("_"),monthsShort:"janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.".split("_"),monthsParseExact:!0,weekdays:"dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi".split("_"),weekdaysShort:"dim._lun._mar._mer._jeu._ven._sam.".split("_"),weekdaysMin:"Di_Lu_Ma_Me_Je_Ve_Sa".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"YYYY-MM-DD",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd D MMMM YYYY HH:mm"},calendar:{sameDay:"[Aujourd’hui à] LT",nextDay:"[Demain à] LT",nextWeek:"dddd [à] LT",lastDay:"[Hier à] LT",lastWeek:"dddd [dernier à] LT",sameElse:"L"},relativeTime:{future:"dans %s",past:"il y a %s",s:"quelques secondes",m:"une minute",mm:"%d minutes",h:"une heure",hh:"%d heures",d:"un jour",dd:"%d jours",M:"un mois",MM:"%d mois",y:"un an",yy:"%d ans"},dayOfMonthOrdinalParse:/\d{1,2}(er|e)/,ordinal:function(a,b){switch(b){default:case"M":case"Q":case"D":case"DDD":case"d":return a+(1===a?"er":"e");case"w":case"W":return a+(1===a?"re":"e")}}}),
//! moment.js locale configuration
//! locale : French (Switzerland) [fr-ch]
//! author : Gaspard Bucher : https://github.com/gaspard
a.defineLocale("fr-ch",{months:"janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre".split("_"),monthsShort:"janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.".split("_"),monthsParseExact:!0,weekdays:"dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi".split("_"),weekdaysShort:"dim._lun._mar._mer._jeu._ven._sam.".split("_"),weekdaysMin:"Di_Lu_Ma_Me_Je_Ve_Sa".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd D MMMM YYYY HH:mm"},calendar:{sameDay:"[Aujourd’hui à] LT",nextDay:"[Demain à] LT",nextWeek:"dddd [à] LT",lastDay:"[Hier à] LT",lastWeek:"dddd [dernier à] LT",sameElse:"L"},relativeTime:{future:"dans %s",past:"il y a %s",s:"quelques secondes",m:"une minute",mm:"%d minutes",h:"une heure",hh:"%d heures",d:"un jour",dd:"%d jours",M:"un mois",MM:"%d mois",y:"un an",yy:"%d ans"},dayOfMonthOrdinalParse:/\d{1,2}(er|e)/,ordinal:function(a,b){switch(b){default:case"M":case"Q":case"D":case"DDD":case"d":return a+(1===a?"er":"e");case"w":case"W":return a+(1===a?"re":"e")}},week:{dow:1,doy:4}}),
//! moment.js locale configuration
//! locale : French [fr]
//! author : John Fischer : https://github.com/jfroffice
a.defineLocale("fr",{months:"janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre".split("_"),monthsShort:"janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.".split("_"),monthsParseExact:!0,weekdays:"dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi".split("_"),weekdaysShort:"dim._lun._mar._mer._jeu._ven._sam.".split("_"),weekdaysMin:"Di_Lu_Ma_Me_Je_Ve_Sa".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd D MMMM YYYY HH:mm"},calendar:{sameDay:"[Aujourd’hui à] LT",nextDay:"[Demain à] LT",nextWeek:"dddd [à] LT",lastDay:"[Hier à] LT",lastWeek:"dddd [dernier à] LT",sameElse:"L"},relativeTime:{future:"dans %s",past:"il y a %s",s:"quelques secondes",m:"une minute",mm:"%d minutes",h:"une heure",hh:"%d heures",d:"un jour",dd:"%d jours",M:"un mois",MM:"%d mois",y:"un an",yy:"%d ans"},dayOfMonthOrdinalParse:/\d{1,2}(er|)/,ordinal:function(a,b){switch(b){case"D":return a+(1===a?"er":"");default:case"M":case"Q":case"DDD":case"d":return a+(1===a?"er":"e");case"w":case"W":return a+(1===a?"re":"e")}},week:{dow:1,doy:4}});
//! moment.js locale configuration
//! locale : Frisian [fy]
//! author : Robin van der Vliet : https://github.com/robin0van0der0v
var _g="jan._feb._mrt._apr._mai_jun._jul._aug._sep._okt._nov._des.".split("_"),ah="jan_feb_mrt_apr_mai_jun_jul_aug_sep_okt_nov_des".split("_");a.defineLocale("fy",{months:"jannewaris_febrewaris_maart_april_maaie_juny_july_augustus_septimber_oktober_novimber_desimber".split("_"),monthsShort:function(a,b){return a?/-MMM-/.test(b)?ah[a.month()]:_g[a.month()]:_g},monthsParseExact:!0,weekdays:"snein_moandei_tiisdei_woansdei_tongersdei_freed_sneon".split("_"),weekdaysShort:"si._mo._ti._wo._to._fr._so.".split("_"),weekdaysMin:"Si_Mo_Ti_Wo_To_Fr_So".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD-MM-YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd D MMMM YYYY HH:mm"},calendar:{sameDay:"[hjoed om] LT",nextDay:"[moarn om] LT",nextWeek:"dddd [om] LT",lastDay:"[juster om] LT",lastWeek:"[ôfrûne] dddd [om] LT",sameElse:"L"},relativeTime:{future:"oer %s",past:"%s lyn",s:"in pear sekonden",m:"ien minút",mm:"%d minuten",h:"ien oere",hh:"%d oeren",d:"ien dei",dd:"%d dagen",M:"ien moanne",MM:"%d moannen",y:"ien jier",yy:"%d jierren"},dayOfMonthOrdinalParse:/\d{1,2}(ste|de)/,ordinal:function(a){return a+(1===a||8===a||a>=20?"ste":"de")},week:{dow:1,doy:4}});
//! moment.js locale configuration
//! locale : Scottish Gaelic [gd]
//! author : Jon Ashdown : https://github.com/jonashdown
var bh=["Am Faoilleach","An Gearran","Am Màrt","An Giblean","An Cèitean","An t-Ògmhios","An t-Iuchar","An Lùnastal","An t-Sultain","An Dàmhair","An t-Samhain","An Dùbhlachd"],ch=["Faoi","Gear","Màrt","Gibl","Cèit","Ògmh","Iuch","Lùn","Sult","Dàmh","Samh","Dùbh"],dh=["Didòmhnaich","Diluain","Dimàirt","Diciadain","Diardaoin","Dihaoine","Disathairne"],eh=["Did","Dil","Dim","Dic","Dia","Dih","Dis"],fh=["Dò","Lu","Mà","Ci","Ar","Ha","Sa"];a.defineLocale("gd",{months:bh,monthsShort:ch,monthsParseExact:!0,weekdays:dh,weekdaysShort:eh,weekdaysMin:fh,longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd, D MMMM YYYY HH:mm"},calendar:{sameDay:"[An-diugh aig] LT",nextDay:"[A-màireach aig] LT",nextWeek:"dddd [aig] LT",lastDay:"[An-dè aig] LT",lastWeek:"dddd [seo chaidh] [aig] LT",sameElse:"L"},relativeTime:{future:"ann an %s",past:"bho chionn %s",s:"beagan diogan",m:"mionaid",mm:"%d mionaidean",h:"uair",hh:"%d uairean",d:"latha",dd:"%d latha",M:"mìos",MM:"%d mìosan",y:"bliadhna",yy:"%d bliadhna"},dayOfMonthOrdinalParse:/\d{1,2}(d|na|mh)/,ordinal:function(a){var b=1===a?"d":a%10===2?"na":"mh";return a+b},week:{dow:1,doy:4}}),
//! moment.js locale configuration
//! locale : Galician [gl]
//! author : Juan G. Hurtado : https://github.com/juanghurtado
a.defineLocale("gl",{months:"xaneiro_febreiro_marzo_abril_maio_xuño_xullo_agosto_setembro_outubro_novembro_decembro".split("_"),monthsShort:"xan._feb._mar._abr._mai._xuñ._xul._ago._set._out._nov._dec.".split("_"),monthsParseExact:!0,weekdays:"domingo_luns_martes_mércores_xoves_venres_sábado".split("_"),weekdaysShort:"dom._lun._mar._mér._xov._ven._sáb.".split("_"),weekdaysMin:"do_lu_ma_mé_xo_ve_sá".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"H:mm",LTS:"H:mm:ss",L:"DD/MM/YYYY",LL:"D [de] MMMM [de] YYYY",LLL:"D [de] MMMM [de] YYYY H:mm",LLLL:"dddd, D [de] MMMM [de] YYYY H:mm"},calendar:{sameDay:function(){return"[hoxe "+(1!==this.hours()?"ás":"á")+"] LT"},nextDay:function(){return"[mañá "+(1!==this.hours()?"ás":"á")+"] LT"},nextWeek:function(){return"dddd ["+(1!==this.hours()?"ás":"a")+"] LT"},lastDay:function(){return"[onte "+(1!==this.hours()?"á":"a")+"] LT"},lastWeek:function(){return"[o] dddd [pasado "+(1!==this.hours()?"ás":"a")+"] LT"},sameElse:"L"},relativeTime:{future:function(a){return 0===a.indexOf("un")?"n"+a:"en "+a},past:"hai %s",s:"uns segundos",m:"un minuto",mm:"%d minutos",h:"unha hora",hh:"%d horas",d:"un día",dd:"%d días",M:"un mes",MM:"%d meses",y:"un ano",yy:"%d anos"},dayOfMonthOrdinalParse:/\d{1,2}º/,ordinal:"%dº",week:{dow:1,doy:4}}),a.defineLocale("gom-latn",{months:"Janer_Febrer_Mars_Abril_Mai_Jun_Julai_Agost_Setembr_Otubr_Novembr_Dezembr".split("_"),monthsShort:"Jan._Feb._Mars_Abr._Mai_Jun_Jul._Ago._Set._Otu._Nov._Dez.".split("_"),monthsParseExact:!0,weekdays:"Aitar_Somar_Mongllar_Budvar_Brestar_Sukrar_Son'var".split("_"),weekdaysShort:"Ait._Som._Mon._Bud._Bre._Suk._Son.".split("_"),weekdaysMin:"Ai_Sm_Mo_Bu_Br_Su_Sn".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"A h:mm [vazta]",LTS:"A h:mm:ss [vazta]",L:"DD-MM-YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY A h:mm [vazta]",LLLL:"dddd, MMMM[achea] Do, YYYY, A h:mm [vazta]",llll:"ddd, D MMM YYYY, A h:mm [vazta]"},calendar:{sameDay:"[Aiz] LT",nextDay:"[Faleam] LT",nextWeek:"[Ieta to] dddd[,] LT",lastDay:"[Kal] LT",lastWeek:"[Fatlo] dddd[,] LT",sameElse:"L"},relativeTime:{future:"%s",past:"%s adim",s:Id,m:Id,mm:Id,h:Id,hh:Id,d:Id,dd:Id,M:Id,MM:Id,y:Id,yy:Id},dayOfMonthOrdinalParse:/\d{1,2}(er)/,ordinal:function(a,b){switch(b){case"D":return a+"er";default:case"M":case"Q":case"DDD":case"d":case"w":case"W":return a}},week:{dow:1,doy:4},meridiemParse:/rati|sokalli|donparam|sanje/,meridiemHour:function(a,b){return 12===a&&(a=0),"rati"===b?a<4?a:a+12:"sokalli"===b?a:"donparam"===b?a>12?a:a+12:"sanje"===b?a+12:void 0},meridiem:function(a,b,c){return a<4?"rati":a<12?"sokalli":a<16?"donparam":a<20?"sanje":"rati"}}),
//! moment.js locale configuration
//! locale : Hebrew [he]
//! author : Tomer Cohen : https://github.com/tomer
//! author : Moshe Simantov : https://github.com/DevelopmentIL
//! author : Tal Ater : https://github.com/TalAter
a.defineLocale("he",{months:"ינואר_פברואר_מרץ_אפריל_מאי_יוני_יולי_אוגוסט_ספטמבר_אוקטובר_נובמבר_דצמבר".split("_"),monthsShort:"ינו׳_פבר׳_מרץ_אפר׳_מאי_יוני_יולי_אוג׳_ספט׳_אוק׳_נוב׳_דצמ׳".split("_"),weekdays:"ראשון_שני_שלישי_רביעי_חמישי_שישי_שבת".split("_"),weekdaysShort:"א׳_ב׳_ג׳_ד׳_ה׳_ו׳_ש׳".split("_"),weekdaysMin:"א_ב_ג_ד_ה_ו_ש".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D [ב]MMMM YYYY",LLL:"D [ב]MMMM YYYY HH:mm",LLLL:"dddd, D [ב]MMMM YYYY HH:mm",l:"D/M/YYYY",ll:"D MMM YYYY",lll:"D MMM YYYY HH:mm",llll:"ddd, D MMM YYYY HH:mm"},calendar:{sameDay:"[היום ב־]LT",nextDay:"[מחר ב־]LT",nextWeek:"dddd [בשעה] LT",lastDay:"[אתמול ב־]LT",lastWeek:"[ביום] dddd [האחרון בשעה] LT",sameElse:"L"},relativeTime:{future:"בעוד %s",past:"לפני %s",s:"מספר שניות",m:"דקה",mm:"%d דקות",h:"שעה",hh:function(a){return 2===a?"שעתיים":a+" שעות"},d:"יום",dd:function(a){return 2===a?"יומיים":a+" ימים"},M:"חודש",MM:function(a){return 2===a?"חודשיים":a+" חודשים"},y:"שנה",yy:function(a){return 2===a?"שנתיים":a%10===0&&10!==a?a+" שנה":a+" שנים"}},meridiemParse:/אחה"צ|לפנה"צ|אחרי הצהריים|לפני הצהריים|לפנות בוקר|בבוקר|בערב/i,isPM:function(a){return/^(אחה"צ|אחרי הצהריים|בערב)$/.test(a)},meridiem:function(a,b,c){return a<5?"לפנות בוקר":a<10?"בבוקר":a<12?c?'לפנה"צ':"לפני הצהריים":a<18?c?'אחה"צ':"אחרי הצהריים":"בערב"}});
//! moment.js locale configuration
//! locale : Hindi [hi]
//! author : Mayank Singhal : https://github.com/mayanksinghal
var gh={1:"१",2:"२",3:"३",4:"४",5:"५",6:"६",7:"७",8:"८",9:"९",0:"०"},hh={"१":"1","२":"2","३":"3","४":"4","५":"5","६":"6","७":"7","८":"8","९":"9","०":"0"};a.defineLocale("hi",{months:"जनवरी_फ़रवरी_मार्च_अप्रैल_मई_जून_जुलाई_अगस्त_सितम्बर_अक्टूबर_नवम्बर_दिसम्बर".split("_"),monthsShort:"जन._फ़र._मार्च_अप्रै._मई_जून_जुल._अग._सित._अक्टू._नव._दिस.".split("_"),monthsParseExact:!0,weekdays:"रविवार_सोमवार_मंगलवार_बुधवार_गुरूवार_शुक्रवार_शनिवार".split("_"),weekdaysShort:"रवि_सोम_मंगल_बुध_गुरू_शुक्र_शनि".split("_"),weekdaysMin:"र_सो_मं_बु_गु_शु_श".split("_"),longDateFormat:{LT:"A h:mm बजे",LTS:"A h:mm:ss बजे",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY, A h:mm बजे",LLLL:"dddd, D MMMM YYYY, A h:mm बजे"},calendar:{sameDay:"[आज] LT",nextDay:"[कल] LT",nextWeek:"dddd, LT",lastDay:"[कल] LT",lastWeek:"[पिछले] dddd, LT",sameElse:"L"},relativeTime:{future:"%s में",past:"%s पहले",s:"कुछ ही क्षण",m:"एक मिनट",mm:"%d मिनट",h:"एक घंटा",hh:"%d घंटे",d:"एक दिन",dd:"%d दिन",M:"एक महीने",MM:"%d महीने",y:"एक वर्ष",yy:"%d वर्ष"},preparse:function(a){return a.replace(/[१२३४५६७८९०]/g,function(a){return hh[a]})},postformat:function(a){return a.replace(/\d/g,function(a){return gh[a]})},meridiemParse:/रात|सुबह|दोपहर|शाम/,meridiemHour:function(a,b){return 12===a&&(a=0),"रात"===b?a<4?a:a+12:"सुबह"===b?a:"दोपहर"===b?a>=10?a:a+12:"शाम"===b?a+12:void 0},meridiem:function(a,b,c){return a<4?"रात":a<10?"सुबह":a<17?"दोपहर":a<20?"शाम":"रात"},week:{dow:0,doy:6}}),a.defineLocale("hr",{months:{format:"siječnja_veljače_ožujka_travnja_svibnja_lipnja_srpnja_kolovoza_rujna_listopada_studenoga_prosinca".split("_"),standalone:"siječanj_veljača_ožujak_travanj_svibanj_lipanj_srpanj_kolovoz_rujan_listopad_studeni_prosinac".split("_")},monthsShort:"sij._velj._ožu._tra._svi._lip._srp._kol._ruj._lis._stu._pro.".split("_"),monthsParseExact:!0,weekdays:"nedjelja_ponedjeljak_utorak_srijeda_četvrtak_petak_subota".split("_"),weekdaysShort:"ned._pon._uto._sri._čet._pet._sub.".split("_"),weekdaysMin:"ne_po_ut_sr_če_pe_su".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"H:mm",LTS:"H:mm:ss",L:"DD.MM.YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY H:mm",LLLL:"dddd, D. MMMM YYYY H:mm"},calendar:{sameDay:"[danas u] LT",nextDay:"[sutra u] LT",nextWeek:function(){switch(this.day()){case 0:return"[u] [nedjelju] [u] LT";case 3:return"[u] [srijedu] [u] LT";case 6:return"[u] [subotu] [u] LT";case 1:case 2:case 4:case 5:return"[u] dddd [u] LT"}},lastDay:"[jučer u] LT",lastWeek:function(){switch(this.day()){case 0:case 3:return"[prošlu] dddd [u] LT";case 6:return"[prošle] [subote] [u] LT";case 1:case 2:case 4:case 5:return"[prošli] dddd [u] LT"}},sameElse:"L"},relativeTime:{future:"za %s",past:"prije %s",s:"par sekundi",m:Jd,mm:Jd,h:Jd,hh:Jd,d:"dan",dd:Jd,M:"mjesec",MM:Jd,y:"godinu",yy:Jd},dayOfMonthOrdinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:7}});
//! moment.js locale configuration
//! locale : Hungarian [hu]
//! author : Adam Brunner : https://github.com/adambrunner
var ih="vasárnap hétfőn kedden szerdán csütörtökön pénteken szombaton".split(" ");a.defineLocale("hu",{months:"január_február_március_április_május_június_július_augusztus_szeptember_október_november_december".split("_"),monthsShort:"jan_feb_márc_ápr_máj_jún_júl_aug_szept_okt_nov_dec".split("_"),weekdays:"vasárnap_hétfő_kedd_szerda_csütörtök_péntek_szombat".split("_"),weekdaysShort:"vas_hét_kedd_sze_csüt_pén_szo".split("_"),weekdaysMin:"v_h_k_sze_cs_p_szo".split("_"),longDateFormat:{LT:"H:mm",LTS:"H:mm:ss",L:"YYYY.MM.DD.",LL:"YYYY. MMMM D.",LLL:"YYYY. MMMM D. H:mm",LLLL:"YYYY. MMMM D., dddd H:mm"},meridiemParse:/de|du/i,isPM:function(a){return"u"===a.charAt(1).toLowerCase()},meridiem:function(a,b,c){return a<12?c===!0?"de":"DE":c===!0?"du":"DU"},calendar:{sameDay:"[ma] LT[-kor]",nextDay:"[holnap] LT[-kor]",nextWeek:function(){return Ld.call(this,!0)},lastDay:"[tegnap] LT[-kor]",lastWeek:function(){return Ld.call(this,!1)},sameElse:"L"},relativeTime:{future:"%s múlva",past:"%s",s:Kd,m:Kd,mm:Kd,h:Kd,hh:Kd,d:Kd,dd:Kd,M:Kd,MM:Kd,y:Kd,yy:Kd},dayOfMonthOrdinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}}),
//! moment.js locale configuration
//! locale : Armenian [hy-am]
//! author : Armendarabyan : https://github.com/armendarabyan
a.defineLocale("hy-am",{months:{format:"հունվարի_փետրվարի_մարտի_ապրիլի_մայիսի_հունիսի_հուլիսի_օգոստոսի_սեպտեմբերի_հոկտեմբերի_նոյեմբերի_դեկտեմբերի".split("_"),standalone:"հունվար_փետրվար_մարտ_ապրիլ_մայիս_հունիս_հուլիս_օգոստոս_սեպտեմբեր_հոկտեմբեր_նոյեմբեր_դեկտեմբեր".split("_")},monthsShort:"հնվ_փտր_մրտ_ապր_մյս_հնս_հլս_օգս_սպտ_հկտ_նմբ_դկտ".split("_"),weekdays:"կիրակի_երկուշաբթի_երեքշաբթի_չորեքշաբթի_հինգշաբթի_ուրբաթ_շաբաթ".split("_"),weekdaysShort:"կրկ_երկ_երք_չրք_հնգ_ուրբ_շբթ".split("_"),weekdaysMin:"կրկ_երկ_երք_չրք_հնգ_ուրբ_շբթ".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY",LL:"D MMMM YYYY թ.",LLL:"D MMMM YYYY թ., HH:mm",LLLL:"dddd, D MMMM YYYY թ., HH:mm"},calendar:{sameDay:"[այսօր] LT",nextDay:"[վաղը] LT",lastDay:"[երեկ] LT",nextWeek:function(){return"dddd [օրը ժամը] LT"},lastWeek:function(){return"[անցած] dddd [օրը ժամը] LT"},sameElse:"L"},relativeTime:{future:"%s հետո",past:"%s առաջ",s:"մի քանի վայրկյան",m:"րոպե",mm:"%d րոպե",h:"ժամ",hh:"%d ժամ",d:"օր",dd:"%d օր",M:"ամիս",MM:"%d ամիս",y:"տարի",yy:"%d տարի"},meridiemParse:/գիշերվա|առավոտվա|ցերեկվա|երեկոյան/,isPM:function(a){return/^(ցերեկվա|երեկոյան)$/.test(a)},meridiem:function(a){return a<4?"գիշերվա":a<12?"առավոտվա":a<17?"ցերեկվա":"երեկոյան"},dayOfMonthOrdinalParse:/\d{1,2}|\d{1,2}-(ին|րդ)/,ordinal:function(a,b){switch(b){case"DDD":case"w":case"W":case"DDDo":return 1===a?a+"-ին":a+"-րդ";default:return a}},week:{dow:1,doy:7}}),
//! moment.js locale configuration
//! locale : Indonesian [id]
//! author : Mohammad Satrio Utomo : https://github.com/tyok
//! reference: http://id.wikisource.org/wiki/Pedoman_Umum_Ejaan_Bahasa_Indonesia_yang_Disempurnakan
a.defineLocale("id",{months:"Januari_Februari_Maret_April_Mei_Juni_Juli_Agustus_September_Oktober_November_Desember".split("_"),monthsShort:"Jan_Feb_Mar_Apr_Mei_Jun_Jul_Ags_Sep_Okt_Nov_Des".split("_"),weekdays:"Minggu_Senin_Selasa_Rabu_Kamis_Jumat_Sabtu".split("_"),weekdaysShort:"Min_Sen_Sel_Rab_Kam_Jum_Sab".split("_"),weekdaysMin:"Mg_Sn_Sl_Rb_Km_Jm_Sb".split("_"),longDateFormat:{LT:"HH.mm",LTS:"HH.mm.ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY [pukul] HH.mm",LLLL:"dddd, D MMMM YYYY [pukul] HH.mm"},meridiemParse:/pagi|siang|sore|malam/,meridiemHour:function(a,b){return 12===a&&(a=0),"pagi"===b?a:"siang"===b?a>=11?a:a+12:"sore"===b||"malam"===b?a+12:void 0},meridiem:function(a,b,c){return a<11?"pagi":a<15?"siang":a<19?"sore":"malam"},calendar:{sameDay:"[Hari ini pukul] LT",nextDay:"[Besok pukul] LT",nextWeek:"dddd [pukul] LT",lastDay:"[Kemarin pukul] LT",lastWeek:"dddd [lalu pukul] LT",sameElse:"L"},relativeTime:{future:"dalam %s",past:"%s yang lalu",s:"beberapa detik",m:"semenit",mm:"%d menit",h:"sejam",hh:"%d jam",d:"sehari",dd:"%d hari",M:"sebulan",MM:"%d bulan",y:"setahun",yy:"%d tahun"},week:{dow:1,doy:7}}),a.defineLocale("is",{months:"janúar_febrúar_mars_apríl_maí_júní_júlí_ágúst_september_október_nóvember_desember".split("_"),monthsShort:"jan_feb_mar_apr_maí_jún_júl_ágú_sep_okt_nóv_des".split("_"),weekdays:"sunnudagur_mánudagur_þriðjudagur_miðvikudagur_fimmtudagur_föstudagur_laugardagur".split("_"),weekdaysShort:"sun_mán_þri_mið_fim_fös_lau".split("_"),weekdaysMin:"Su_Má_Þr_Mi_Fi_Fö_La".split("_"),longDateFormat:{LT:"H:mm",LTS:"H:mm:ss",L:"DD.MM.YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY [kl.] H:mm",LLLL:"dddd, D. MMMM YYYY [kl.] H:mm"},calendar:{sameDay:"[í dag kl.] LT",nextDay:"[á morgun kl.] LT",nextWeek:"dddd [kl.] LT",lastDay:"[í gær kl.] LT",lastWeek:"[síðasta] dddd [kl.] LT",sameElse:"L"},relativeTime:{future:"eftir %s",past:"fyrir %s síðan",s:Nd,m:Nd,mm:Nd,h:"klukkustund",hh:Nd,d:Nd,dd:Nd,M:Nd,MM:Nd,y:Nd,yy:Nd},dayOfMonthOrdinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}}),
//! moment.js locale configuration
//! locale : Italian [it]
//! author : Lorenzo : https://github.com/aliem
//! author: Mattia Larentis: https://github.com/nostalgiaz
a.defineLocale("it",{months:"gennaio_febbraio_marzo_aprile_maggio_giugno_luglio_agosto_settembre_ottobre_novembre_dicembre".split("_"),monthsShort:"gen_feb_mar_apr_mag_giu_lug_ago_set_ott_nov_dic".split("_"),weekdays:"domenica_lunedì_martedì_mercoledì_giovedì_venerdì_sabato".split("_"),weekdaysShort:"dom_lun_mar_mer_gio_ven_sab".split("_"),weekdaysMin:"do_lu_ma_me_gi_ve_sa".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd, D MMMM YYYY HH:mm"},calendar:{sameDay:"[Oggi alle] LT",nextDay:"[Domani alle] LT",nextWeek:"dddd [alle] LT",lastDay:"[Ieri alle] LT",lastWeek:function(){switch(this.day()){case 0:return"[la scorsa] dddd [alle] LT";default:return"[lo scorso] dddd [alle] LT"}},sameElse:"L"},relativeTime:{future:function(a){return(/^[0-9].+$/.test(a)?"tra":"in")+" "+a},past:"%s fa",s:"alcuni secondi",m:"un minuto",mm:"%d minuti",h:"un'ora",hh:"%d ore",d:"un giorno",dd:"%d giorni",M:"un mese",MM:"%d mesi",y:"un anno",yy:"%d anni"},dayOfMonthOrdinalParse:/\d{1,2}º/,ordinal:"%dº",week:{dow:1,doy:4}}),
//! moment.js locale configuration
//! locale : Japanese [ja]
//! author : LI Long : https://github.com/baryon
a.defineLocale("ja",{months:"1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"),monthsShort:"1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"),weekdays:"日曜日_月曜日_火曜日_水曜日_木曜日_金曜日_土曜日".split("_"),weekdaysShort:"日_月_火_水_木_金_土".split("_"),weekdaysMin:"日_月_火_水_木_金_土".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"YYYY/MM/DD",LL:"YYYY年M月D日",LLL:"YYYY年M月D日 HH:mm",LLLL:"YYYY年M月D日 HH:mm dddd",l:"YYYY/MM/DD",ll:"YYYY年M月D日",lll:"YYYY年M月D日 HH:mm",llll:"YYYY年M月D日 HH:mm dddd"},meridiemParse:/午前|午後/i,isPM:function(a){return"午後"===a},meridiem:function(a,b,c){return a<12?"午前":"午後"},calendar:{sameDay:"[今日] LT",nextDay:"[明日] LT",nextWeek:"[来週]dddd LT",lastDay:"[昨日] LT",lastWeek:"[前週]dddd LT",sameElse:"L"},dayOfMonthOrdinalParse:/\d{1,2}日/,ordinal:function(a,b){switch(b){case"d":case"D":case"DDD":return a+"日";default:return a}},relativeTime:{future:"%s後",past:"%s前",s:"数秒",m:"1分",mm:"%d分",h:"1時間",hh:"%d時間",d:"1日",dd:"%d日",M:"1ヶ月",MM:"%dヶ月",y:"1年",yy:"%d年"}}),
//! moment.js locale configuration
//! locale : Javanese [jv]
//! author : Rony Lantip : https://github.com/lantip
//! reference: http://jv.wikipedia.org/wiki/Basa_Jawa
a.defineLocale("jv",{months:"Januari_Februari_Maret_April_Mei_Juni_Juli_Agustus_September_Oktober_Nopember_Desember".split("_"),monthsShort:"Jan_Feb_Mar_Apr_Mei_Jun_Jul_Ags_Sep_Okt_Nop_Des".split("_"),weekdays:"Minggu_Senen_Seloso_Rebu_Kemis_Jemuwah_Septu".split("_"),weekdaysShort:"Min_Sen_Sel_Reb_Kem_Jem_Sep".split("_"),weekdaysMin:"Mg_Sn_Sl_Rb_Km_Jm_Sp".split("_"),longDateFormat:{LT:"HH.mm",LTS:"HH.mm.ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY [pukul] HH.mm",LLLL:"dddd, D MMMM YYYY [pukul] HH.mm"},meridiemParse:/enjing|siyang|sonten|ndalu/,meridiemHour:function(a,b){return 12===a&&(a=0),"enjing"===b?a:"siyang"===b?a>=11?a:a+12:"sonten"===b||"ndalu"===b?a+12:void 0},meridiem:function(a,b,c){return a<11?"enjing":a<15?"siyang":a<19?"sonten":"ndalu"},calendar:{sameDay:"[Dinten puniko pukul] LT",nextDay:"[Mbenjang pukul] LT",nextWeek:"dddd [pukul] LT",lastDay:"[Kala wingi pukul] LT",lastWeek:"dddd [kepengker pukul] LT",sameElse:"L"},relativeTime:{future:"wonten ing %s",past:"%s ingkang kepengker",s:"sawetawis detik",m:"setunggal menit",mm:"%d menit",h:"setunggal jam",hh:"%d jam",d:"sedinten",dd:"%d dinten",M:"sewulan",MM:"%d wulan",y:"setaun",yy:"%d taun"},week:{dow:1,doy:7}}),
//! moment.js locale configuration
//! locale : Georgian [ka]
//! author : Irakli Janiashvili : https://github.com/irakli-janiashvili
a.defineLocale("ka",{months:{standalone:"იანვარი_თებერვალი_მარტი_აპრილი_მაისი_ივნისი_ივლისი_აგვისტო_სექტემბერი_ოქტომბერი_ნოემბერი_დეკემბერი".split("_"),format:"იანვარს_თებერვალს_მარტს_აპრილის_მაისს_ივნისს_ივლისს_აგვისტს_სექტემბერს_ოქტომბერს_ნოემბერს_დეკემბერს".split("_")},monthsShort:"იან_თებ_მარ_აპრ_მაი_ივნ_ივლ_აგვ_სექ_ოქტ_ნოე_დეკ".split("_"),weekdays:{standalone:"კვირა_ორშაბათი_სამშაბათი_ოთხშაბათი_ხუთშაბათი_პარასკევი_შაბათი".split("_"),format:"კვირას_ორშაბათს_სამშაბათს_ოთხშაბათს_ხუთშაბათს_პარასკევს_შაბათს".split("_"),isFormat:/(წინა|შემდეგ)/},weekdaysShort:"კვი_ორშ_სამ_ოთხ_ხუთ_პარ_შაბ".split("_"),weekdaysMin:"კვ_ორ_სა_ოთ_ხუ_პა_შა".split("_"),longDateFormat:{LT:"h:mm A",LTS:"h:mm:ss A",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY h:mm A",LLLL:"dddd, D MMMM YYYY h:mm A"},calendar:{sameDay:"[დღეს] LT[-ზე]",nextDay:"[ხვალ] LT[-ზე]",lastDay:"[გუშინ] LT[-ზე]",nextWeek:"[შემდეგ] dddd LT[-ზე]",lastWeek:"[წინა] dddd LT-ზე",sameElse:"L"},relativeTime:{future:function(a){return/(წამი|წუთი|საათი|წელი)/.test(a)?a.replace(/ი$/,"ში"):a+"ში"},past:function(a){return/(წამი|წუთი|საათი|დღე|თვე)/.test(a)?a.replace(/(ი|ე)$/,"ის უკან"):/წელი/.test(a)?a.replace(/წელი$/,"წლის უკან"):void 0},s:"რამდენიმე წამი",m:"წუთი",mm:"%d წუთი",h:"საათი",hh:"%d საათი",d:"დღე",dd:"%d დღე",M:"თვე",MM:"%d თვე",y:"წელი",yy:"%d წელი"},dayOfMonthOrdinalParse:/0|1-ლი|მე-\d{1,2}|\d{1,2}-ე/,ordinal:function(a){return 0===a?a:1===a?a+"-ლი":a<20||a<=100&&a%20===0||a%100===0?"მე-"+a:a+"-ე"},week:{dow:1,doy:7}});
//! moment.js locale configuration
//! locale : Kazakh [kk]
//! authors : Nurlan Rakhimzhanov : https://github.com/nurlan
var jh={0:"-ші",1:"-ші",2:"-ші",3:"-ші",4:"-ші",5:"-ші",6:"-шы",7:"-ші",8:"-ші",9:"-шы",10:"-шы",20:"-шы",30:"-шы",40:"-шы",50:"-ші",60:"-шы",70:"-ші",80:"-ші",90:"-шы",100:"-ші"};a.defineLocale("kk",{months:"қаңтар_ақпан_наурыз_сәуір_мамыр_маусым_шілде_тамыз_қыркүйек_қазан_қараша_желтоқсан".split("_"),monthsShort:"қаң_ақп_нау_сәу_мам_мау_шіл_там_қыр_қаз_қар_жел".split("_"),weekdays:"жексенбі_дүйсенбі_сейсенбі_сәрсенбі_бейсенбі_жұма_сенбі".split("_"),weekdaysShort:"жек_дүй_сей_сәр_бей_жұм_сен".split("_"),weekdaysMin:"жк_дй_сй_ср_бй_жм_сн".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd, D MMMM YYYY HH:mm"},calendar:{sameDay:"[Бүгін сағат] LT",nextDay:"[Ертең сағат] LT",nextWeek:"dddd [сағат] LT",lastDay:"[Кеше сағат] LT",lastWeek:"[Өткен аптаның] dddd [сағат] LT",sameElse:"L"},relativeTime:{future:"%s ішінде",past:"%s бұрын",s:"бірнеше секунд",m:"бір минут",mm:"%d минут",h:"бір сағат",hh:"%d сағат",d:"бір күн",dd:"%d күн",M:"бір ай",MM:"%d ай",y:"бір жыл",yy:"%d жыл"},dayOfMonthOrdinalParse:/\d{1,2}-(ші|шы)/,ordinal:function(a){var b=a%10,c=a>=100?100:null;return a+(jh[a]||jh[b]||jh[c])},week:{dow:1,doy:7}}),
//! moment.js locale configuration
//! locale : Cambodian [km]
//! author : Kruy Vanna : https://github.com/kruyvanna
a.defineLocale("km",{months:"មករា_កុម្ភៈ_មីនា_មេសា_ឧសភា_មិថុនា_កក្កដា_សីហា_កញ្ញា_តុលា_វិច្ឆិកា_ធ្នូ".split("_"),monthsShort:"មករា_កុម្ភៈ_មីនា_មេសា_ឧសភា_មិថុនា_កក្កដា_សីហា_កញ្ញា_តុលា_វិច្ឆិកា_ធ្នូ".split("_"),weekdays:"អាទិត្យ_ច័ន្ទ_អង្គារ_ពុធ_ព្រហស្បតិ៍_សុក្រ_សៅរ៍".split("_"),weekdaysShort:"អាទិត្យ_ច័ន្ទ_អង្គារ_ពុធ_ព្រហស្បតិ៍_សុក្រ_សៅរ៍".split("_"),weekdaysMin:"អាទិត្យ_ច័ន្ទ_អង្គារ_ពុធ_ព្រហស្បតិ៍_សុក្រ_សៅរ៍".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd, D MMMM YYYY HH:mm"},calendar:{sameDay:"[ថ្ងៃនេះ ម៉ោង] LT",nextDay:"[ស្អែក ម៉ោង] LT",nextWeek:"dddd [ម៉ោង] LT",lastDay:"[ម្សិលមិញ ម៉ោង] LT",lastWeek:"dddd [សប្តាហ៍មុន] [ម៉ោង] LT",sameElse:"L"},relativeTime:{future:"%sទៀត",past:"%sមុន",s:"ប៉ុន្មានវិនាទី",m:"មួយនាទី",mm:"%d នាទី",h:"មួយម៉ោង",hh:"%d ម៉ោង",d:"មួយថ្ងៃ",dd:"%d ថ្ងៃ",M:"មួយខែ",MM:"%d ខែ",y:"មួយឆ្នាំ",yy:"%d ឆ្នាំ"},week:{dow:1,doy:4}});
//! moment.js locale configuration
//! locale : Kannada [kn]
//! author : Rajeev Naik : https://github.com/rajeevnaikte
var kh={1:"೧",2:"೨",3:"೩",4:"೪",5:"೫",6:"೬",7:"೭",8:"೮",9:"೯",0:"೦"},lh={"೧":"1","೨":"2","೩":"3","೪":"4","೫":"5","೬":"6","೭":"7","೮":"8","೯":"9","೦":"0"};a.defineLocale("kn",{months:"ಜನವರಿ_ಫೆಬ್ರವರಿ_ಮಾರ್ಚ್_ಏಪ್ರಿಲ್_ಮೇ_ಜೂನ್_ಜುಲೈ_ಆಗಸ್ಟ್_ಸೆಪ್ಟೆಂಬರ್_ಅಕ್ಟೋಬರ್_ನವೆಂಬರ್_ಡಿಸೆಂಬರ್".split("_"),monthsShort:"ಜನ_ಫೆಬ್ರ_ಮಾರ್ಚ್_ಏಪ್ರಿಲ್_ಮೇ_ಜೂನ್_ಜುಲೈ_ಆಗಸ್ಟ್_ಸೆಪ್ಟೆಂಬ_ಅಕ್ಟೋಬ_ನವೆಂಬ_ಡಿಸೆಂಬ".split("_"),monthsParseExact:!0,weekdays:"ಭಾನುವಾರ_ಸೋಮವಾರ_ಮಂಗಳವಾರ_ಬುಧವಾರ_ಗುರುವಾರ_ಶುಕ್ರವಾರ_ಶನಿವಾರ".split("_"),weekdaysShort:"ಭಾನು_ಸೋಮ_ಮಂಗಳ_ಬುಧ_ಗುರು_ಶುಕ್ರ_ಶನಿ".split("_"),weekdaysMin:"ಭಾ_ಸೋ_ಮಂ_ಬು_ಗು_ಶು_ಶ".split("_"),longDateFormat:{LT:"A h:mm",LTS:"A h:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY, A h:mm",LLLL:"dddd, D MMMM YYYY, A h:mm"},calendar:{sameDay:"[ಇಂದು] LT",nextDay:"[ನಾಳೆ] LT",nextWeek:"dddd, LT",lastDay:"[ನಿನ್ನೆ] LT",lastWeek:"[ಕೊನೆಯ] dddd, LT",sameElse:"L"},relativeTime:{future:"%s ನಂತರ",past:"%s ಹಿಂದೆ",s:"ಕೆಲವು ಕ್ಷಣಗಳು",m:"ಒಂದು ನಿಮಿಷ",mm:"%d ನಿಮಿಷ",h:"ಒಂದು ಗಂಟೆ",hh:"%d ಗಂಟೆ",d:"ಒಂದು ದಿನ",dd:"%d ದಿನ",M:"ಒಂದು ತಿಂಗಳು",MM:"%d ತಿಂಗಳು",y:"ಒಂದು ವರ್ಷ",yy:"%d ವರ್ಷ"},preparse:function(a){return a.replace(/[೧೨೩೪೫೬೭೮೯೦]/g,function(a){return lh[a]})},postformat:function(a){return a.replace(/\d/g,function(a){return kh[a]})},meridiemParse:/ರಾತ್ರಿ|ಬೆಳಿಗ್ಗೆ|ಮಧ್ಯಾಹ್ನ|ಸಂಜೆ/,meridiemHour:function(a,b){return 12===a&&(a=0),"ರಾತ್ರಿ"===b?a<4?a:a+12:"ಬೆಳಿಗ್ಗೆ"===b?a:"ಮಧ್ಯಾಹ್ನ"===b?a>=10?a:a+12:"ಸಂಜೆ"===b?a+12:void 0},meridiem:function(a,b,c){return a<4?"ರಾತ್ರಿ":a<10?"ಬೆಳಿಗ್ಗೆ":a<17?"ಮಧ್ಯಾಹ್ನ":a<20?"ಸಂಜೆ":"ರಾತ್ರಿ"},dayOfMonthOrdinalParse:/\d{1,2}(ನೇ)/,ordinal:function(a){return a+"ನೇ"},week:{dow:0,doy:6}}),
//! moment.js locale configuration
//! locale : Korean [ko]
//! author : Kyungwook, Park : https://github.com/kyungw00k
//! author : Jeeeyul Lee <jeeeyul@gmail.com>
a.defineLocale("ko",{months:"1월_2월_3월_4월_5월_6월_7월_8월_9월_10월_11월_12월".split("_"),monthsShort:"1월_2월_3월_4월_5월_6월_7월_8월_9월_10월_11월_12월".split("_"),weekdays:"일요일_월요일_화요일_수요일_목요일_금요일_토요일".split("_"),weekdaysShort:"일_월_화_수_목_금_토".split("_"),weekdaysMin:"일_월_화_수_목_금_토".split("_"),longDateFormat:{LT:"A h:mm",LTS:"A h:mm:ss",L:"YYYY.MM.DD",LL:"YYYY년 MMMM D일",LLL:"YYYY년 MMMM D일 A h:mm",LLLL:"YYYY년 MMMM D일 dddd A h:mm",l:"YYYY.MM.DD",ll:"YYYY년 MMMM D일",lll:"YYYY년 MMMM D일 A h:mm",llll:"YYYY년 MMMM D일 dddd A h:mm"},calendar:{sameDay:"오늘 LT",nextDay:"내일 LT",nextWeek:"dddd LT",lastDay:"어제 LT",lastWeek:"지난주 dddd LT",sameElse:"L"},relativeTime:{future:"%s 후",past:"%s 전",s:"몇 초",ss:"%d초",m:"1분",mm:"%d분",h:"한 시간",hh:"%d시간",d:"하루",dd:"%d일",M:"한 달",MM:"%d달",y:"일 년",yy:"%d년"},dayOfMonthOrdinalParse:/\d{1,2}일/,ordinal:"%d일",meridiemParse:/오전|오후/,isPM:function(a){return"오후"===a},meridiem:function(a,b,c){return a<12?"오전":"오후"}});
//! moment.js locale configuration
//! locale : Kyrgyz [ky]
//! author : Chyngyz Arystan uulu : https://github.com/chyngyz
var mh={0:"-чү",1:"-чи",2:"-чи",3:"-чү",4:"-чү",5:"-чи",6:"-чы",7:"-чи",8:"-чи",9:"-чу",10:"-чу",20:"-чы",30:"-чу",40:"-чы",50:"-чү",60:"-чы",70:"-чи",80:"-чи",90:"-чу",100:"-чү"};a.defineLocale("ky",{months:"январь_февраль_март_апрель_май_июнь_июль_август_сентябрь_октябрь_ноябрь_декабрь".split("_"),monthsShort:"янв_фев_март_апр_май_июнь_июль_авг_сен_окт_ноя_дек".split("_"),weekdays:"Жекшемби_Дүйшөмбү_Шейшемби_Шаршемби_Бейшемби_Жума_Ишемби".split("_"),weekdaysShort:"Жек_Дүй_Шей_Шар_Бей_Жум_Ише".split("_"),weekdaysMin:"Жк_Дй_Шй_Шр_Бй_Жм_Иш".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd, D MMMM YYYY HH:mm"},calendar:{sameDay:"[Бүгүн саат] LT",nextDay:"[Эртең саат] LT",nextWeek:"dddd [саат] LT",lastDay:"[Кече саат] LT",lastWeek:"[Өткен аптанын] dddd [күнү] [саат] LT",sameElse:"L"},relativeTime:{future:"%s ичинде",past:"%s мурун",s:"бирнече секунд",m:"бир мүнөт",mm:"%d мүнөт",h:"бир саат",hh:"%d саат",d:"бир күн",dd:"%d күн",M:"бир ай",MM:"%d ай",y:"бир жыл",yy:"%d жыл"},dayOfMonthOrdinalParse:/\d{1,2}-(чи|чы|чү|чу)/,ordinal:function(a){var b=a%10,c=a>=100?100:null;return a+(mh[a]||mh[b]||mh[c])},week:{dow:1,doy:7}}),a.defineLocale("lb",{months:"Januar_Februar_Mäerz_Abrëll_Mee_Juni_Juli_August_September_Oktober_November_Dezember".split("_"),monthsShort:"Jan._Febr._Mrz._Abr._Mee_Jun._Jul._Aug._Sept._Okt._Nov._Dez.".split("_"),monthsParseExact:!0,weekdays:"Sonndeg_Méindeg_Dënschdeg_Mëttwoch_Donneschdeg_Freideg_Samschdeg".split("_"),weekdaysShort:"So._Mé._Dë._Më._Do._Fr._Sa.".split("_"),weekdaysMin:"So_Mé_Dë_Më_Do_Fr_Sa".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"H:mm [Auer]",LTS:"H:mm:ss [Auer]",L:"DD.MM.YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY H:mm [Auer]",LLLL:"dddd, D. MMMM YYYY H:mm [Auer]"},calendar:{sameDay:"[Haut um] LT",sameElse:"L",nextDay:"[Muer um] LT",nextWeek:"dddd [um] LT",lastDay:"[Gëschter um] LT",lastWeek:function(){switch(this.day()){case 2:case 4:return"[Leschten] dddd [um] LT";default:return"[Leschte] dddd [um] LT"}}},relativeTime:{future:Pd,past:Qd,s:"e puer Sekonnen",m:Od,mm:"%d Minutten",h:Od,hh:"%d Stonnen",d:Od,dd:"%d Deeg",M:Od,MM:"%d Méint",y:Od,yy:"%d Joer"},dayOfMonthOrdinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}}),
//! moment.js locale configuration
//! locale : Lao [lo]
//! author : Ryan Hart : https://github.com/ryanhart2
a.defineLocale("lo",{months:"ມັງກອນ_ກຸມພາ_ມີນາ_ເມສາ_ພຶດສະພາ_ມິຖຸນາ_ກໍລະກົດ_ສິງຫາ_ກັນຍາ_ຕຸລາ_ພະຈິກ_ທັນວາ".split("_"),monthsShort:"ມັງກອນ_ກຸມພາ_ມີນາ_ເມສາ_ພຶດສະພາ_ມິຖຸນາ_ກໍລະກົດ_ສິງຫາ_ກັນຍາ_ຕຸລາ_ພະຈິກ_ທັນວາ".split("_"),weekdays:"ອາທິດ_ຈັນ_ອັງຄານ_ພຸດ_ພະຫັດ_ສຸກ_ເສົາ".split("_"),weekdaysShort:"ທິດ_ຈັນ_ອັງຄານ_ພຸດ_ພະຫັດ_ສຸກ_ເສົາ".split("_"),weekdaysMin:"ທ_ຈ_ອຄ_ພ_ພຫ_ສກ_ສ".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"ວັນdddd D MMMM YYYY HH:mm"},meridiemParse:/ຕອນເຊົ້າ|ຕອນແລງ/,isPM:function(a){return"ຕອນແລງ"===a},meridiem:function(a,b,c){return a<12?"ຕອນເຊົ້າ":"ຕອນແລງ"},calendar:{sameDay:"[ມື້ນີ້ເວລາ] LT",nextDay:"[ມື້ອື່ນເວລາ] LT",nextWeek:"[ວັນ]dddd[ໜ້າເວລາ] LT",lastDay:"[ມື້ວານນີ້ເວລາ] LT",lastWeek:"[ວັນ]dddd[ແລ້ວນີ້ເວລາ] LT",sameElse:"L"},relativeTime:{future:"ອີກ %s",past:"%sຜ່ານມາ",s:"ບໍ່ເທົ່າໃດວິນາທີ",m:"1 ນາທີ",mm:"%d ນາທີ",h:"1 ຊົ່ວໂມງ",hh:"%d ຊົ່ວໂມງ",d:"1 ມື້",dd:"%d ມື້",M:"1 ເດືອນ",MM:"%d ເດືອນ",y:"1 ປີ",yy:"%d ປີ"},dayOfMonthOrdinalParse:/(ທີ່)\d{1,2}/,ordinal:function(a){return"ທີ່"+a}});
//! moment.js locale configuration
//! locale : Lithuanian [lt]
//! author : Mindaugas Mozūras : https://github.com/mmozuras
var nh={m:"minutė_minutės_minutę",mm:"minutės_minučių_minutes",h:"valanda_valandos_valandą",hh:"valandos_valandų_valandas",d:"diena_dienos_dieną",dd:"dienos_dienų_dienas",M:"mėnuo_mėnesio_mėnesį",MM:"mėnesiai_mėnesių_mėnesius",y:"metai_metų_metus",yy:"metai_metų_metus"};a.defineLocale("lt",{months:{format:"sausio_vasario_kovo_balandžio_gegužės_birželio_liepos_rugpjūčio_rugsėjo_spalio_lapkričio_gruodžio".split("_"),standalone:"sausis_vasaris_kovas_balandis_gegužė_birželis_liepa_rugpjūtis_rugsėjis_spalis_lapkritis_gruodis".split("_"),isFormat:/D[oD]?(\[[^\[\]]*\]|\s)+MMMM?|MMMM?(\[[^\[\]]*\]|\s)+D[oD]?/},monthsShort:"sau_vas_kov_bal_geg_bir_lie_rgp_rgs_spa_lap_grd".split("_"),weekdays:{format:"sekmadienį_pirmadienį_antradienį_trečiadienį_ketvirtadienį_penktadienį_šeštadienį".split("_"),standalone:"sekmadienis_pirmadienis_antradienis_trečiadienis_ketvirtadienis_penktadienis_šeštadienis".split("_"),isFormat:/dddd HH:mm/},weekdaysShort:"Sek_Pir_Ant_Tre_Ket_Pen_Šeš".split("_"),weekdaysMin:"S_P_A_T_K_Pn_Š".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"YYYY-MM-DD",LL:"YYYY [m.] MMMM D [d.]",LLL:"YYYY [m.] MMMM D [d.], HH:mm [val.]",LLLL:"YYYY [m.] MMMM D [d.], dddd, HH:mm [val.]",l:"YYYY-MM-DD",ll:"YYYY [m.] MMMM D [d.]",lll:"YYYY [m.] MMMM D [d.], HH:mm [val.]",llll:"YYYY [m.] MMMM D [d.], ddd, HH:mm [val.]"},calendar:{sameDay:"[Šiandien] LT",nextDay:"[Rytoj] LT",nextWeek:"dddd LT",lastDay:"[Vakar] LT",lastWeek:"[Praėjusį] dddd LT",sameElse:"L"},relativeTime:{future:"po %s",past:"prieš %s",s:Sd,m:Td,mm:Wd,h:Td,hh:Wd,d:Td,dd:Wd,M:Td,MM:Wd,y:Td,yy:Wd},dayOfMonthOrdinalParse:/\d{1,2}-oji/,ordinal:function(a){return a+"-oji"},week:{dow:1,doy:4}});
//! moment.js locale configuration
//! locale : Latvian [lv]
//! author : Kristaps Karlsons : https://github.com/skakri
//! author : Jānis Elmeris : https://github.com/JanisE
var oh={m:"minūtes_minūtēm_minūte_minūtes".split("_"),mm:"minūtes_minūtēm_minūte_minūtes".split("_"),h:"stundas_stundām_stunda_stundas".split("_"),hh:"stundas_stundām_stunda_stundas".split("_"),d:"dienas_dienām_diena_dienas".split("_"),dd:"dienas_dienām_diena_dienas".split("_"),M:"mēneša_mēnešiem_mēnesis_mēneši".split("_"),MM:"mēneša_mēnešiem_mēnesis_mēneši".split("_"),y:"gada_gadiem_gads_gadi".split("_"),yy:"gada_gadiem_gads_gadi".split("_")};a.defineLocale("lv",{months:"janvāris_februāris_marts_aprīlis_maijs_jūnijs_jūlijs_augusts_septembris_oktobris_novembris_decembris".split("_"),monthsShort:"jan_feb_mar_apr_mai_jūn_jūl_aug_sep_okt_nov_dec".split("_"),weekdays:"svētdiena_pirmdiena_otrdiena_trešdiena_ceturtdiena_piektdiena_sestdiena".split("_"),weekdaysShort:"Sv_P_O_T_C_Pk_S".split("_"),weekdaysMin:"Sv_P_O_T_C_Pk_S".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY.",LL:"YYYY. [gada] D. MMMM",LLL:"YYYY. [gada] D. MMMM, HH:mm",LLLL:"YYYY. [gada] D. MMMM, dddd, HH:mm"},calendar:{sameDay:"[Šodien pulksten] LT",nextDay:"[Rīt pulksten] LT",nextWeek:"dddd [pulksten] LT",lastDay:"[Vakar pulksten] LT",lastWeek:"[Pagājušā] dddd [pulksten] LT",sameElse:"L"},relativeTime:{future:"pēc %s",past:"pirms %s",s:$d,m:Zd,mm:Yd,h:Zd,hh:Yd,d:Zd,dd:Yd,M:Zd,MM:Yd,y:Zd,yy:Yd},dayOfMonthOrdinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}});
//! moment.js locale configuration
//! locale : Montenegrin [me]
//! author : Miodrag Nikač <miodrag@restartit.me> : https://github.com/miodragnikac
var ph={words:{m:["jedan minut","jednog minuta"],mm:["minut","minuta","minuta"],h:["jedan sat","jednog sata"],hh:["sat","sata","sati"],dd:["dan","dana","dana"],MM:["mjesec","mjeseca","mjeseci"],yy:["godina","godine","godina"]},correctGrammaticalCase:function(a,b){return 1===a?b[0]:a>=2&&a<=4?b[1]:b[2]},translate:function(a,b,c){var d=ph.words[c];return 1===c.length?b?d[0]:d[1]:a+" "+ph.correctGrammaticalCase(a,d)}};a.defineLocale("me",{months:"januar_februar_mart_april_maj_jun_jul_avgust_septembar_oktobar_novembar_decembar".split("_"),monthsShort:"jan._feb._mar._apr._maj_jun_jul_avg._sep._okt._nov._dec.".split("_"),monthsParseExact:!0,weekdays:"nedjelja_ponedjeljak_utorak_srijeda_četvrtak_petak_subota".split("_"),weekdaysShort:"ned._pon._uto._sri._čet._pet._sub.".split("_"),weekdaysMin:"ne_po_ut_sr_če_pe_su".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"H:mm",LTS:"H:mm:ss",L:"DD.MM.YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY H:mm",LLLL:"dddd, D. MMMM YYYY H:mm"},calendar:{sameDay:"[danas u] LT",nextDay:"[sjutra u] LT",nextWeek:function(){switch(this.day()){case 0:return"[u] [nedjelju] [u] LT";case 3:return"[u] [srijedu] [u] LT";case 6:return"[u] [subotu] [u] LT";case 1:case 2:case 4:case 5:return"[u] dddd [u] LT"}},lastDay:"[juče u] LT",lastWeek:function(){var a=["[prošle] [nedjelje] [u] LT","[prošlog] [ponedjeljka] [u] LT","[prošlog] [utorka] [u] LT","[prošle] [srijede] [u] LT","[prošlog] [četvrtka] [u] LT","[prošlog] [petka] [u] LT","[prošle] [subote] [u] LT"];return a[this.day()]},sameElse:"L"},relativeTime:{future:"za %s",past:"prije %s",s:"nekoliko sekundi",m:ph.translate,mm:ph.translate,h:ph.translate,hh:ph.translate,d:"dan",dd:ph.translate,M:"mjesec",MM:ph.translate,y:"godinu",yy:ph.translate},dayOfMonthOrdinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:7}}),
//! moment.js locale configuration
//! locale : Maori [mi]
//! author : John Corrigan <robbiecloset@gmail.com> : https://github.com/johnideal
a.defineLocale("mi",{months:"Kohi-tāte_Hui-tanguru_Poutū-te-rangi_Paenga-whāwhā_Haratua_Pipiri_Hōngoingoi_Here-turi-kōkā_Mahuru_Whiringa-ā-nuku_Whiringa-ā-rangi_Hakihea".split("_"),monthsShort:"Kohi_Hui_Pou_Pae_Hara_Pipi_Hōngoi_Here_Mahu_Whi-nu_Whi-ra_Haki".split("_"),monthsRegex:/(?:['a-z\u0101\u014D\u016B]+\-?){1,3}/i,monthsStrictRegex:/(?:['a-z\u0101\u014D\u016B]+\-?){1,3}/i,monthsShortRegex:/(?:['a-z\u0101\u014D\u016B]+\-?){1,3}/i,monthsShortStrictRegex:/(?:['a-z\u0101\u014D\u016B]+\-?){1,2}/i,weekdays:"Rātapu_Mane_Tūrei_Wenerei_Tāite_Paraire_Hātarei".split("_"),weekdaysShort:"Ta_Ma_Tū_We_Tāi_Pa_Hā".split("_"),weekdaysMin:"Ta_Ma_Tū_We_Tāi_Pa_Hā".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY [i] HH:mm",LLLL:"dddd, D MMMM YYYY [i] HH:mm"},calendar:{sameDay:"[i teie mahana, i] LT",nextDay:"[apopo i] LT",nextWeek:"dddd [i] LT",lastDay:"[inanahi i] LT",lastWeek:"dddd [whakamutunga i] LT",sameElse:"L"},relativeTime:{future:"i roto i %s",past:"%s i mua",s:"te hēkona ruarua",m:"he meneti",mm:"%d meneti",h:"te haora",hh:"%d haora",d:"he ra",dd:"%d ra",M:"he marama",MM:"%d marama",y:"he tau",yy:"%d tau"},dayOfMonthOrdinalParse:/\d{1,2}º/,ordinal:"%dº",week:{dow:1,doy:4}}),
//! moment.js locale configuration
//! locale : Macedonian [mk]
//! author : Borislav Mickov : https://github.com/B0k0
a.defineLocale("mk",{months:"јануари_февруари_март_април_мај_јуни_јули_август_септември_октомври_ноември_декември".split("_"),monthsShort:"јан_фев_мар_апр_мај_јун_јул_авг_сеп_окт_ное_дек".split("_"),weekdays:"недела_понеделник_вторник_среда_четврток_петок_сабота".split("_"),weekdaysShort:"нед_пон_вто_сре_чет_пет_саб".split("_"),weekdaysMin:"нe_пo_вт_ср_че_пе_сa".split("_"),longDateFormat:{LT:"H:mm",LTS:"H:mm:ss",L:"D.MM.YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY H:mm",LLLL:"dddd, D MMMM YYYY H:mm"},calendar:{sameDay:"[Денес во] LT",nextDay:"[Утре во] LT",nextWeek:"[Во] dddd [во] LT",lastDay:"[Вчера во] LT",lastWeek:function(){switch(this.day()){case 0:case 3:case 6:return"[Изминатата] dddd [во] LT";case 1:case 2:case 4:case 5:return"[Изминатиот] dddd [во] LT"}},sameElse:"L"},relativeTime:{future:"после %s",past:"пред %s",s:"неколку секунди",m:"минута",mm:"%d минути",h:"час",hh:"%d часа",d:"ден",dd:"%d дена",M:"месец",MM:"%d месеци",y:"година",yy:"%d години"},dayOfMonthOrdinalParse:/\d{1,2}-(ев|ен|ти|ви|ри|ми)/,ordinal:function(a){var b=a%10,c=a%100;return 0===a?a+"-ев":0===c?a+"-ен":c>10&&c<20?a+"-ти":1===b?a+"-ви":2===b?a+"-ри":7===b||8===b?a+"-ми":a+"-ти"},week:{dow:1,doy:7}}),
//! moment.js locale configuration
//! locale : Malayalam [ml]
//! author : Floyd Pink : https://github.com/floydpink
a.defineLocale("ml",{months:"ജനുവരി_ഫെബ്രുവരി_മാർച്ച്_ഏപ്രിൽ_മേയ്_ജൂൺ_ജൂലൈ_ഓഗസ്റ്റ്_സെപ്റ്റംബർ_ഒക്ടോബർ_നവംബർ_ഡിസംബർ".split("_"),monthsShort:"ജനു._ഫെബ്രു._മാർ._ഏപ്രി._മേയ്_ജൂൺ_ജൂലൈ._ഓഗ._സെപ്റ്റ._ഒക്ടോ._നവം._ഡിസം.".split("_"),monthsParseExact:!0,weekdays:"ഞായറാഴ്ച_തിങ്കളാഴ്ച_ചൊവ്വാഴ്ച_ബുധനാഴ്ച_വ്യാഴാഴ്ച_വെള്ളിയാഴ്ച_ശനിയാഴ്ച".split("_"),weekdaysShort:"ഞായർ_തിങ്കൾ_ചൊവ്വ_ബുധൻ_വ്യാഴം_വെള്ളി_ശനി".split("_"),weekdaysMin:"ഞാ_തി_ചൊ_ബു_വ്യാ_വെ_ശ".split("_"),longDateFormat:{LT:"A h:mm -നു",LTS:"A h:mm:ss -നു",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY, A h:mm -നു",LLLL:"dddd, D MMMM YYYY, A h:mm -നു"},calendar:{sameDay:"[ഇന്ന്] LT",nextDay:"[നാളെ] LT",nextWeek:"dddd, LT",lastDay:"[ഇന്നലെ] LT",lastWeek:"[കഴിഞ്ഞ] dddd, LT",sameElse:"L"},relativeTime:{future:"%s കഴിഞ്ഞ്",past:"%s മുൻപ്",s:"അൽപ നിമിഷങ്ങൾ",m:"ഒരു മിനിറ്റ്",mm:"%d മിനിറ്റ്",h:"ഒരു മണിക്കൂർ",hh:"%d മണിക്കൂർ",d:"ഒരു ദിവസം",dd:"%d ദിവസം",M:"ഒരു മാസം",MM:"%d മാസം",y:"ഒരു വർഷം",yy:"%d വർഷം"},meridiemParse:/രാത്രി|രാവിലെ|ഉച്ച കഴിഞ്ഞ്|വൈകുന്നേരം|രാത്രി/i,meridiemHour:function(a,b){return 12===a&&(a=0),"രാത്രി"===b&&a>=4||"ഉച്ച കഴിഞ്ഞ്"===b||"വൈകുന്നേരം"===b?a+12:a},meridiem:function(a,b,c){return a<4?"രാത്രി":a<12?"രാവിലെ":a<17?"ഉച്ച കഴിഞ്ഞ്":a<20?"വൈകുന്നേരം":"രാത്രി"}});
//! moment.js locale configuration
//! locale : Marathi [mr]
//! author : Harshad Kale : https://github.com/kalehv
//! author : Vivek Athalye : https://github.com/vnathalye
var qh={1:"१",2:"२",3:"३",4:"४",5:"५",6:"६",7:"७",8:"८",9:"९",0:"०"},rh={"१":"1","२":"2","३":"3","४":"4","५":"5","६":"6","७":"7","८":"8","९":"9","०":"0"};a.defineLocale("mr",{months:"जानेवारी_फेब्रुवारी_मार्च_एप्रिल_मे_जून_जुलै_ऑगस्ट_सप्टेंबर_ऑक्टोबर_नोव्हेंबर_डिसेंबर".split("_"),monthsShort:"जाने._फेब्रु._मार्च._एप्रि._मे._जून._जुलै._ऑग._सप्टें._ऑक्टो._नोव्हें._डिसें.".split("_"),monthsParseExact:!0,weekdays:"रविवार_सोमवार_मंगळवार_बुधवार_गुरूवार_शुक्रवार_शनिवार".split("_"),weekdaysShort:"रवि_सोम_मंगळ_बुध_गुरू_शुक्र_शनि".split("_"),weekdaysMin:"र_सो_मं_बु_गु_शु_श".split("_"),longDateFormat:{LT:"A h:mm वाजता",LTS:"A h:mm:ss वाजता",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY, A h:mm वाजता",LLLL:"dddd, D MMMM YYYY, A h:mm वाजता"},calendar:{sameDay:"[आज] LT",nextDay:"[उद्या] LT",nextWeek:"dddd, LT",lastDay:"[काल] LT",lastWeek:"[मागील] dddd, LT",sameElse:"L"},relativeTime:{future:"%sमध्ये",past:"%sपूर्वी",s:_d,m:_d,mm:_d,h:_d,hh:_d,d:_d,dd:_d,M:_d,MM:_d,y:_d,yy:_d},preparse:function(a){return a.replace(/[१२३४५६७८९०]/g,function(a){return rh[a]})},postformat:function(a){return a.replace(/\d/g,function(a){return qh[a]})},meridiemParse:/रात्री|सकाळी|दुपारी|सायंकाळी/,meridiemHour:function(a,b){return 12===a&&(a=0),"रात्री"===b?a<4?a:a+12:"सकाळी"===b?a:"दुपारी"===b?a>=10?a:a+12:"सायंकाळी"===b?a+12:void 0},meridiem:function(a,b,c){return a<4?"रात्री":a<10?"सकाळी":a<17?"दुपारी":a<20?"सायंकाळी":"रात्री"},week:{dow:0,doy:6}}),
//! moment.js locale configuration
//! locale : Malay [ms-my]
//! note : DEPRECATED, the correct one is [ms]
//! author : Weldan Jamili : https://github.com/weldan
a.defineLocale("ms-my",{months:"Januari_Februari_Mac_April_Mei_Jun_Julai_Ogos_September_Oktober_November_Disember".split("_"),monthsShort:"Jan_Feb_Mac_Apr_Mei_Jun_Jul_Ogs_Sep_Okt_Nov_Dis".split("_"),weekdays:"Ahad_Isnin_Selasa_Rabu_Khamis_Jumaat_Sabtu".split("_"),weekdaysShort:"Ahd_Isn_Sel_Rab_Kha_Jum_Sab".split("_"),weekdaysMin:"Ah_Is_Sl_Rb_Km_Jm_Sb".split("_"),longDateFormat:{LT:"HH.mm",LTS:"HH.mm.ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY [pukul] HH.mm",LLLL:"dddd, D MMMM YYYY [pukul] HH.mm"},meridiemParse:/pagi|tengahari|petang|malam/,meridiemHour:function(a,b){return 12===a&&(a=0),"pagi"===b?a:"tengahari"===b?a>=11?a:a+12:"petang"===b||"malam"===b?a+12:void 0},meridiem:function(a,b,c){return a<11?"pagi":a<15?"tengahari":a<19?"petang":"malam"},calendar:{sameDay:"[Hari ini pukul] LT",nextDay:"[Esok pukul] LT",nextWeek:"dddd [pukul] LT",lastDay:"[Kelmarin pukul] LT",lastWeek:"dddd [lepas pukul] LT",sameElse:"L"},relativeTime:{future:"dalam %s",past:"%s yang lepas",s:"beberapa saat",m:"seminit",mm:"%d minit",h:"sejam",hh:"%d jam",d:"sehari",dd:"%d hari",M:"sebulan",MM:"%d bulan",y:"setahun",yy:"%d tahun"},week:{dow:1,doy:7}}),
//! moment.js locale configuration
//! locale : Malay [ms]
//! author : Weldan Jamili : https://github.com/weldan
a.defineLocale("ms",{months:"Januari_Februari_Mac_April_Mei_Jun_Julai_Ogos_September_Oktober_November_Disember".split("_"),monthsShort:"Jan_Feb_Mac_Apr_Mei_Jun_Jul_Ogs_Sep_Okt_Nov_Dis".split("_"),weekdays:"Ahad_Isnin_Selasa_Rabu_Khamis_Jumaat_Sabtu".split("_"),weekdaysShort:"Ahd_Isn_Sel_Rab_Kha_Jum_Sab".split("_"),weekdaysMin:"Ah_Is_Sl_Rb_Km_Jm_Sb".split("_"),longDateFormat:{LT:"HH.mm",LTS:"HH.mm.ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY [pukul] HH.mm",LLLL:"dddd, D MMMM YYYY [pukul] HH.mm"},meridiemParse:/pagi|tengahari|petang|malam/,meridiemHour:function(a,b){return 12===a&&(a=0),"pagi"===b?a:"tengahari"===b?a>=11?a:a+12:"petang"===b||"malam"===b?a+12:void 0},meridiem:function(a,b,c){return a<11?"pagi":a<15?"tengahari":a<19?"petang":"malam"},calendar:{sameDay:"[Hari ini pukul] LT",nextDay:"[Esok pukul] LT",nextWeek:"dddd [pukul] LT",lastDay:"[Kelmarin pukul] LT",lastWeek:"dddd [lepas pukul] LT",sameElse:"L"},relativeTime:{future:"dalam %s",past:"%s yang lepas",s:"beberapa saat",m:"seminit",mm:"%d minit",h:"sejam",hh:"%d jam",d:"sehari",dd:"%d hari",M:"sebulan",MM:"%d bulan",y:"setahun",yy:"%d tahun"},week:{dow:1,doy:7}});
//! moment.js locale configuration
//! locale : Burmese [my]
//! author : Squar team, mysquar.com
//! author : David Rossellat : https://github.com/gholadr
//! author : Tin Aung Lin : https://github.com/thanyawzinmin
var sh={1:"၁",2:"၂",3:"၃",4:"၄",5:"၅",6:"၆",7:"၇",8:"၈",9:"၉",0:"၀"},th={"၁":"1","၂":"2","၃":"3","၄":"4","၅":"5","၆":"6","၇":"7","၈":"8","၉":"9","၀":"0"};a.defineLocale("my",{months:"ဇန်နဝါရီ_ဖေဖော်ဝါရီ_မတ်_ဧပြီ_မေ_ဇွန်_ဇူလိုင်_သြဂုတ်_စက်တင်ဘာ_အောက်တိုဘာ_နိုဝင်ဘာ_ဒီဇင်ဘာ".split("_"),monthsShort:"ဇန်_ဖေ_မတ်_ပြီ_မေ_ဇွန်_လိုင်_သြ_စက်_အောက်_နို_ဒီ".split("_"),weekdays:"တနင်္ဂနွေ_တနင်္လာ_အင်္ဂါ_ဗုဒ္ဓဟူး_ကြာသပတေး_သောကြာ_စနေ".split("_"),weekdaysShort:"နွေ_လာ_ဂါ_ဟူး_ကြာ_သော_နေ".split("_"),weekdaysMin:"နွေ_လာ_ဂါ_ဟူး_ကြာ_သော_နေ".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd D MMMM YYYY HH:mm"},calendar:{sameDay:"[ယနေ.] LT [မှာ]",nextDay:"[မနက်ဖြန်] LT [မှာ]",nextWeek:"dddd LT [မှာ]",lastDay:"[မနေ.က] LT [မှာ]",lastWeek:"[ပြီးခဲ့သော] dddd LT [မှာ]",sameElse:"L"},relativeTime:{future:"လာမည့် %s မှာ",past:"လွန်ခဲ့သော %s က",s:"စက္ကန်.အနည်းငယ်",m:"တစ်မိနစ်",mm:"%d မိနစ်",h:"တစ်နာရီ",hh:"%d နာရီ",d:"တစ်ရက်",dd:"%d ရက်",M:"တစ်လ",MM:"%d လ",y:"တစ်နှစ်",yy:"%d နှစ်"},preparse:function(a){return a.replace(/[၁၂၃၄၅၆၇၈၉၀]/g,function(a){return th[a]})},postformat:function(a){return a.replace(/\d/g,function(a){return sh[a]})},week:{dow:1,doy:4}}),
//! moment.js locale configuration
//! locale : Norwegian Bokmål [nb]
//! authors : Espen Hovlandsdal : https://github.com/rexxars
//!           Sigurd Gartmann : https://github.com/sigurdga
a.defineLocale("nb",{months:"januar_februar_mars_april_mai_juni_juli_august_september_oktober_november_desember".split("_"),monthsShort:"jan._feb._mars_april_mai_juni_juli_aug._sep._okt._nov._des.".split("_"),monthsParseExact:!0,weekdays:"søndag_mandag_tirsdag_onsdag_torsdag_fredag_lørdag".split("_"),weekdaysShort:"sø._ma._ti._on._to._fr._lø.".split("_"),weekdaysMin:"sø_ma_ti_on_to_fr_lø".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY [kl.] HH:mm",LLLL:"dddd D. MMMM YYYY [kl.] HH:mm"},calendar:{sameDay:"[i dag kl.] LT",nextDay:"[i morgen kl.] LT",nextWeek:"dddd [kl.] LT",lastDay:"[i går kl.] LT",lastWeek:"[forrige] dddd [kl.] LT",sameElse:"L"},relativeTime:{future:"om %s",past:"%s siden",s:"noen sekunder",m:"ett minutt",mm:"%d minutter",h:"en time",hh:"%d timer",d:"en dag",dd:"%d dager",M:"en måned",MM:"%d måneder",y:"ett år",yy:"%d år"},dayOfMonthOrdinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}});
//! moment.js locale configuration
//! locale : Nepalese [ne]
//! author : suvash : https://github.com/suvash
var uh={1:"१",2:"२",3:"३",4:"४",5:"५",6:"६",7:"७",8:"८",9:"९",0:"०"},vh={"१":"1","२":"2","३":"3","४":"4","५":"5","६":"6","७":"7","८":"8","९":"9","०":"0"};a.defineLocale("ne",{months:"जनवरी_फेब्रुवरी_मार्च_अप्रिल_मई_जुन_जुलाई_अगष्ट_सेप्टेम्बर_अक्टोबर_नोभेम्बर_डिसेम्बर".split("_"),monthsShort:"जन._फेब्रु._मार्च_अप्रि._मई_जुन_जुलाई._अग._सेप्ट._अक्टो._नोभे._डिसे.".split("_"),monthsParseExact:!0,weekdays:"आइतबार_सोमबार_मङ्गलबार_बुधबार_बिहिबार_शुक्रबार_शनिबार".split("_"),weekdaysShort:"आइत._सोम._मङ्गल._बुध._बिहि._शुक्र._शनि.".split("_"),weekdaysMin:"आ._सो._मं._बु._बि._शु._श.".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"Aको h:mm बजे",LTS:"Aको h:mm:ss बजे",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY, Aको h:mm बजे",LLLL:"dddd, D MMMM YYYY, Aको h:mm बजे"},preparse:function(a){return a.replace(/[१२३४५६७८९०]/g,function(a){return vh[a]})},postformat:function(a){return a.replace(/\d/g,function(a){return uh[a]})},meridiemParse:/राति|बिहान|दिउँसो|साँझ/,meridiemHour:function(a,b){return 12===a&&(a=0),"राति"===b?a<4?a:a+12:"बिहान"===b?a:"दिउँसो"===b?a>=10?a:a+12:"साँझ"===b?a+12:void 0},meridiem:function(a,b,c){return a<3?"राति":a<12?"बिहान":a<16?"दिउँसो":a<20?"साँझ":"राति"},calendar:{sameDay:"[आज] LT",nextDay:"[भोलि] LT",nextWeek:"[आउँदो] dddd[,] LT",lastDay:"[हिजो] LT",lastWeek:"[गएको] dddd[,] LT",sameElse:"L"},relativeTime:{future:"%sमा",past:"%s अगाडि",s:"केही क्षण",m:"एक मिनेट",mm:"%d मिनेट",h:"एक घण्टा",hh:"%d घण्टा",d:"एक दिन",dd:"%d दिन",M:"एक महिना",MM:"%d महिना",y:"एक बर्ष",yy:"%d बर्ष"},week:{dow:0,doy:6}});
//! moment.js locale configuration
//! locale : Dutch (Belgium) [nl-be]
//! author : Joris Röling : https://github.com/jorisroling
//! author : Jacob Middag : https://github.com/middagj
var wh="jan._feb._mrt._apr._mei_jun._jul._aug._sep._okt._nov._dec.".split("_"),xh="jan_feb_mrt_apr_mei_jun_jul_aug_sep_okt_nov_dec".split("_"),yh=[/^jan/i,/^feb/i,/^maart|mrt.?$/i,/^apr/i,/^mei$/i,/^jun[i.]?$/i,/^jul[i.]?$/i,/^aug/i,/^sep/i,/^okt/i,/^nov/i,/^dec/i],zh=/^(januari|februari|maart|april|mei|april|ju[nl]i|augustus|september|oktober|november|december|jan\.?|feb\.?|mrt\.?|apr\.?|ju[nl]\.?|aug\.?|sep\.?|okt\.?|nov\.?|dec\.?)/i;a.defineLocale("nl-be",{months:"januari_februari_maart_april_mei_juni_juli_augustus_september_oktober_november_december".split("_"),monthsShort:function(a,b){return a?/-MMM-/.test(b)?xh[a.month()]:wh[a.month()]:wh},monthsRegex:zh,monthsShortRegex:zh,monthsStrictRegex:/^(januari|februari|maart|mei|ju[nl]i|april|augustus|september|oktober|november|december)/i,monthsShortStrictRegex:/^(jan\.?|feb\.?|mrt\.?|apr\.?|mei|ju[nl]\.?|aug\.?|sep\.?|okt\.?|nov\.?|dec\.?)/i,monthsParse:yh,longMonthsParse:yh,shortMonthsParse:yh,weekdays:"zondag_maandag_dinsdag_woensdag_donderdag_vrijdag_zaterdag".split("_"),weekdaysShort:"zo._ma._di._wo._do._vr._za.".split("_"),weekdaysMin:"Zo_Ma_Di_Wo_Do_Vr_Za".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd D MMMM YYYY HH:mm"},calendar:{sameDay:"[vandaag om] LT",nextDay:"[morgen om] LT",nextWeek:"dddd [om] LT",lastDay:"[gisteren om] LT",lastWeek:"[afgelopen] dddd [om] LT",sameElse:"L"},relativeTime:{future:"over %s",past:"%s geleden",s:"een paar seconden",m:"één minuut",mm:"%d minuten",h:"één uur",hh:"%d uur",d:"één dag",dd:"%d dagen",M:"één maand",MM:"%d maanden",y:"één jaar",yy:"%d jaar"},dayOfMonthOrdinalParse:/\d{1,2}(ste|de)/,ordinal:function(a){return a+(1===a||8===a||a>=20?"ste":"de")},week:{dow:1,doy:4}});
//! moment.js locale configuration
//! locale : Dutch [nl]
//! author : Joris Röling : https://github.com/jorisroling
//! author : Jacob Middag : https://github.com/middagj
var Ah="jan._feb._mrt._apr._mei_jun._jul._aug._sep._okt._nov._dec.".split("_"),Bh="jan_feb_mrt_apr_mei_jun_jul_aug_sep_okt_nov_dec".split("_"),Ch=[/^jan/i,/^feb/i,/^maart|mrt.?$/i,/^apr/i,/^mei$/i,/^jun[i.]?$/i,/^jul[i.]?$/i,/^aug/i,/^sep/i,/^okt/i,/^nov/i,/^dec/i],Dh=/^(januari|februari|maart|april|mei|april|ju[nl]i|augustus|september|oktober|november|december|jan\.?|feb\.?|mrt\.?|apr\.?|ju[nl]\.?|aug\.?|sep\.?|okt\.?|nov\.?|dec\.?)/i;a.defineLocale("nl",{months:"januari_februari_maart_april_mei_juni_juli_augustus_september_oktober_november_december".split("_"),monthsShort:function(a,b){return a?/-MMM-/.test(b)?Bh[a.month()]:Ah[a.month()]:Ah},monthsRegex:Dh,monthsShortRegex:Dh,monthsStrictRegex:/^(januari|februari|maart|mei|ju[nl]i|april|augustus|september|oktober|november|december)/i,monthsShortStrictRegex:/^(jan\.?|feb\.?|mrt\.?|apr\.?|mei|ju[nl]\.?|aug\.?|sep\.?|okt\.?|nov\.?|dec\.?)/i,monthsParse:Ch,longMonthsParse:Ch,shortMonthsParse:Ch,weekdays:"zondag_maandag_dinsdag_woensdag_donderdag_vrijdag_zaterdag".split("_"),weekdaysShort:"zo._ma._di._wo._do._vr._za.".split("_"),weekdaysMin:"Zo_Ma_Di_Wo_Do_Vr_Za".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD-MM-YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd D MMMM YYYY HH:mm"},calendar:{sameDay:"[vandaag om] LT",nextDay:"[morgen om] LT",nextWeek:"dddd [om] LT",lastDay:"[gisteren om] LT",lastWeek:"[afgelopen] dddd [om] LT",sameElse:"L"},relativeTime:{future:"over %s",past:"%s geleden",s:"een paar seconden",m:"één minuut",mm:"%d minuten",h:"één uur",hh:"%d uur",d:"één dag",dd:"%d dagen",M:"één maand",MM:"%d maanden",y:"één jaar",yy:"%d jaar"},dayOfMonthOrdinalParse:/\d{1,2}(ste|de)/,ordinal:function(a){return a+(1===a||8===a||a>=20?"ste":"de")},week:{dow:1,doy:4}}),
//! moment.js locale configuration
//! locale : Nynorsk [nn]
//! author : https://github.com/mechuwind
a.defineLocale("nn",{months:"januar_februar_mars_april_mai_juni_juli_august_september_oktober_november_desember".split("_"),monthsShort:"jan_feb_mar_apr_mai_jun_jul_aug_sep_okt_nov_des".split("_"),weekdays:"sundag_måndag_tysdag_onsdag_torsdag_fredag_laurdag".split("_"),weekdaysShort:"sun_mån_tys_ons_tor_fre_lau".split("_"),weekdaysMin:"su_må_ty_on_to_fr_lø".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY [kl.] H:mm",LLLL:"dddd D. MMMM YYYY [kl.] HH:mm"},calendar:{sameDay:"[I dag klokka] LT",nextDay:"[I morgon klokka] LT",nextWeek:"dddd [klokka] LT",lastDay:"[I går klokka] LT",lastWeek:"[Føregåande] dddd [klokka] LT",sameElse:"L"},relativeTime:{future:"om %s",past:"%s sidan",s:"nokre sekund",m:"eit minutt",mm:"%d minutt",h:"ein time",hh:"%d timar",d:"ein dag",dd:"%d dagar",M:"ein månad",MM:"%d månader",y:"eit år",yy:"%d år"},dayOfMonthOrdinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}});
//! moment.js locale configuration
//! locale : Punjabi (India) [pa-in]
//! author : Harpreet Singh : https://github.com/harpreetkhalsagtbit
var Eh={1:"੧",2:"੨",3:"੩",4:"੪",5:"੫",6:"੬",7:"੭",8:"੮",9:"੯",0:"੦"},Fh={"੧":"1","੨":"2","੩":"3","੪":"4","੫":"5","੬":"6","੭":"7","੮":"8","੯":"9","੦":"0"};a.defineLocale("pa-in",{months:"ਜਨਵਰੀ_ਫ਼ਰਵਰੀ_ਮਾਰਚ_ਅਪ੍ਰੈਲ_ਮਈ_ਜੂਨ_ਜੁਲਾਈ_ਅਗਸਤ_ਸਤੰਬਰ_ਅਕਤੂਬਰ_ਨਵੰਬਰ_ਦਸੰਬਰ".split("_"),monthsShort:"ਜਨਵਰੀ_ਫ਼ਰਵਰੀ_ਮਾਰਚ_ਅਪ੍ਰੈਲ_ਮਈ_ਜੂਨ_ਜੁਲਾਈ_ਅਗਸਤ_ਸਤੰਬਰ_ਅਕਤੂਬਰ_ਨਵੰਬਰ_ਦਸੰਬਰ".split("_"),weekdays:"ਐਤਵਾਰ_ਸੋਮਵਾਰ_ਮੰਗਲਵਾਰ_ਬੁਧਵਾਰ_ਵੀਰਵਾਰ_ਸ਼ੁੱਕਰਵਾਰ_ਸ਼ਨੀਚਰਵਾਰ".split("_"),weekdaysShort:"ਐਤ_ਸੋਮ_ਮੰਗਲ_ਬੁਧ_ਵੀਰ_ਸ਼ੁਕਰ_ਸ਼ਨੀ".split("_"),weekdaysMin:"ਐਤ_ਸੋਮ_ਮੰਗਲ_ਬੁਧ_ਵੀਰ_ਸ਼ੁਕਰ_ਸ਼ਨੀ".split("_"),longDateFormat:{LT:"A h:mm ਵਜੇ",LTS:"A h:mm:ss ਵਜੇ",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY, A h:mm ਵਜੇ",LLLL:"dddd, D MMMM YYYY, A h:mm ਵਜੇ"},calendar:{sameDay:"[ਅਜ] LT",nextDay:"[ਕਲ] LT",nextWeek:"dddd, LT",lastDay:"[ਕਲ] LT",lastWeek:"[ਪਿਛਲੇ] dddd, LT",sameElse:"L"},relativeTime:{future:"%s ਵਿੱਚ",past:"%s ਪਿਛਲੇ",s:"ਕੁਝ ਸਕਿੰਟ",m:"ਇਕ ਮਿੰਟ",mm:"%d ਮਿੰਟ",h:"ਇੱਕ ਘੰਟਾ",hh:"%d ਘੰਟੇ",d:"ਇੱਕ ਦਿਨ",dd:"%d ਦਿਨ",M:"ਇੱਕ ਮਹੀਨਾ",MM:"%d ਮਹੀਨੇ",y:"ਇੱਕ ਸਾਲ",yy:"%d ਸਾਲ"},preparse:function(a){return a.replace(/[੧੨੩੪੫੬੭੮੯੦]/g,function(a){return Fh[a]})},postformat:function(a){return a.replace(/\d/g,function(a){return Eh[a]})},meridiemParse:/ਰਾਤ|ਸਵੇਰ|ਦੁਪਹਿਰ|ਸ਼ਾਮ/,meridiemHour:function(a,b){return 12===a&&(a=0),"ਰਾਤ"===b?a<4?a:a+12:"ਸਵੇਰ"===b?a:"ਦੁਪਹਿਰ"===b?a>=10?a:a+12:"ਸ਼ਾਮ"===b?a+12:void 0},meridiem:function(a,b,c){return a<4?"ਰਾਤ":a<10?"ਸਵੇਰ":a<17?"ਦੁਪਹਿਰ":a<20?"ਸ਼ਾਮ":"ਰਾਤ"},week:{dow:0,doy:6}});
//! moment.js locale configuration
//! locale : Polish [pl]
//! author : Rafal Hirsz : https://github.com/evoL
var Gh="styczeń_luty_marzec_kwiecień_maj_czerwiec_lipiec_sierpień_wrzesień_październik_listopad_grudzień".split("_"),Hh="stycznia_lutego_marca_kwietnia_maja_czerwca_lipca_sierpnia_września_października_listopada_grudnia".split("_");a.defineLocale("pl",{months:function(a,b){return a?""===b?"("+Hh[a.month()]+"|"+Gh[a.month()]+")":/D MMMM/.test(b)?Hh[a.month()]:Gh[a.month()]:Gh},monthsShort:"sty_lut_mar_kwi_maj_cze_lip_sie_wrz_paź_lis_gru".split("_"),weekdays:"niedziela_poniedziałek_wtorek_środa_czwartek_piątek_sobota".split("_"),weekdaysShort:"ndz_pon_wt_śr_czw_pt_sob".split("_"),weekdaysMin:"Nd_Pn_Wt_Śr_Cz_Pt_So".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd, D MMMM YYYY HH:mm"},calendar:{sameDay:"[Dziś o] LT",nextDay:"[Jutro o] LT",nextWeek:"[W] dddd [o] LT",lastDay:"[Wczoraj o] LT",lastWeek:function(){switch(this.day()){case 0:return"[W zeszłą niedzielę o] LT";case 3:return"[W zeszłą środę o] LT";case 6:return"[W zeszłą sobotę o] LT";default:return"[W zeszły] dddd [o] LT"}},sameElse:"L"},relativeTime:{future:"za %s",past:"%s temu",s:"kilka sekund",m:be,mm:be,h:be,hh:be,d:"1 dzień",dd:"%d dni",M:"miesiąc",MM:be,y:"rok",yy:be},dayOfMonthOrdinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}}),
//! moment.js locale configuration
//! locale : Portuguese (Brazil) [pt-br]
//! author : Caio Ribeiro Pereira : https://github.com/caio-ribeiro-pereira
a.defineLocale("pt-br",{months:"Janeiro_Fevereiro_Março_Abril_Maio_Junho_Julho_Agosto_Setembro_Outubro_Novembro_Dezembro".split("_"),monthsShort:"Jan_Fev_Mar_Abr_Mai_Jun_Jul_Ago_Set_Out_Nov_Dez".split("_"),weekdays:"Domingo_Segunda-feira_Terça-feira_Quarta-feira_Quinta-feira_Sexta-feira_Sábado".split("_"),weekdaysShort:"Dom_Seg_Ter_Qua_Qui_Sex_Sáb".split("_"),weekdaysMin:"Do_2ª_3ª_4ª_5ª_6ª_Sá".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D [de] MMMM [de] YYYY",LLL:"D [de] MMMM [de] YYYY [às] HH:mm",LLLL:"dddd, D [de] MMMM [de] YYYY [às] HH:mm"},calendar:{sameDay:"[Hoje às] LT",nextDay:"[Amanhã às] LT",nextWeek:"dddd [às] LT",lastDay:"[Ontem às] LT",lastWeek:function(){return 0===this.day()||6===this.day()?"[Último] dddd [às] LT":"[Última] dddd [às] LT"},sameElse:"L"},relativeTime:{future:"em %s",past:"%s atrás",s:"poucos segundos",m:"um minuto",mm:"%d minutos",h:"uma hora",hh:"%d horas",d:"um dia",dd:"%d dias",M:"um mês",MM:"%d meses",y:"um ano",yy:"%d anos"},dayOfMonthOrdinalParse:/\d{1,2}º/,ordinal:"%dº"}),
//! moment.js locale configuration
//! locale : Portuguese [pt]
//! author : Jefferson : https://github.com/jalex79
a.defineLocale("pt",{months:"Janeiro_Fevereiro_Março_Abril_Maio_Junho_Julho_Agosto_Setembro_Outubro_Novembro_Dezembro".split("_"),monthsShort:"Jan_Fev_Mar_Abr_Mai_Jun_Jul_Ago_Set_Out_Nov_Dez".split("_"),weekdays:"Domingo_Segunda-Feira_Terça-Feira_Quarta-Feira_Quinta-Feira_Sexta-Feira_Sábado".split("_"),weekdaysShort:"Dom_Seg_Ter_Qua_Qui_Sex_Sáb".split("_"),weekdaysMin:"Do_2ª_3ª_4ª_5ª_6ª_Sá".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D [de] MMMM [de] YYYY",LLL:"D [de] MMMM [de] YYYY HH:mm",LLLL:"dddd, D [de] MMMM [de] YYYY HH:mm"},calendar:{sameDay:"[Hoje às] LT",nextDay:"[Amanhã às] LT",nextWeek:"dddd [às] LT",lastDay:"[Ontem às] LT",lastWeek:function(){return 0===this.day()||6===this.day()?"[Último] dddd [às] LT":"[Última] dddd [às] LT"},sameElse:"L"},relativeTime:{future:"em %s",past:"há %s",s:"segundos",m:"um minuto",mm:"%d minutos",h:"uma hora",hh:"%d horas",d:"um dia",dd:"%d dias",M:"um mês",MM:"%d meses",y:"um ano",yy:"%d anos"},dayOfMonthOrdinalParse:/\d{1,2}º/,ordinal:"%dº",week:{dow:1,doy:4}}),a.defineLocale("ro",{months:"ianuarie_februarie_martie_aprilie_mai_iunie_iulie_august_septembrie_octombrie_noiembrie_decembrie".split("_"),monthsShort:"ian._febr._mart._apr._mai_iun._iul._aug._sept._oct._nov._dec.".split("_"),monthsParseExact:!0,weekdays:"duminică_luni_marți_miercuri_joi_vineri_sâmbătă".split("_"),weekdaysShort:"Dum_Lun_Mar_Mie_Joi_Vin_Sâm".split("_"),weekdaysMin:"Du_Lu_Ma_Mi_Jo_Vi_Sâ".split("_"),longDateFormat:{LT:"H:mm",LTS:"H:mm:ss",L:"DD.MM.YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY H:mm",LLLL:"dddd, D MMMM YYYY H:mm"},calendar:{sameDay:"[azi la] LT",nextDay:"[mâine la] LT",nextWeek:"dddd [la] LT",lastDay:"[ieri la] LT",lastWeek:"[fosta] dddd [la] LT",sameElse:"L"},relativeTime:{future:"peste %s",past:"%s în urmă",s:"câteva secunde",m:"un minut",mm:ce,h:"o oră",hh:ce,d:"o zi",dd:ce,M:"o lună",MM:ce,y:"un an",yy:ce},week:{dow:1,doy:7}});var Ih=[/^янв/i,/^фев/i,/^мар/i,/^апр/i,/^ма[йя]/i,/^июн/i,/^июл/i,/^авг/i,/^сен/i,/^окт/i,/^ноя/i,/^дек/i];a.defineLocale("ru",{months:{format:"января_февраля_марта_апреля_мая_июня_июля_августа_сентября_октября_ноября_декабря".split("_"),standalone:"январь_февраль_март_апрель_май_июнь_июль_август_сентябрь_октябрь_ноябрь_декабрь".split("_")},monthsShort:{format:"янв._февр._мар._апр._мая_июня_июля_авг._сент._окт._нояб._дек.".split("_"),standalone:"янв._февр._март_апр._май_июнь_июль_авг._сент._окт._нояб._дек.".split("_")},weekdays:{standalone:"воскресенье_понедельник_вторник_среда_четверг_пятница_суббота".split("_"),format:"воскресенье_понедельник_вторник_среду_четверг_пятницу_субботу".split("_"),isFormat:/\[ ?[Вв] ?(?:прошлую|следующую|эту)? ?\] ?dddd/},weekdaysShort:"вс_пн_вт_ср_чт_пт_сб".split("_"),weekdaysMin:"вс_пн_вт_ср_чт_пт_сб".split("_"),monthsParse:Ih,longMonthsParse:Ih,shortMonthsParse:Ih,monthsRegex:/^(январ[ья]|янв\.?|феврал[ья]|февр?\.?|марта?|мар\.?|апрел[ья]|апр\.?|ма[йя]|июн[ья]|июн\.?|июл[ья]|июл\.?|августа?|авг\.?|сентябр[ья]|сент?\.?|октябр[ья]|окт\.?|ноябр[ья]|нояб?\.?|декабр[ья]|дек\.?)/i,monthsShortRegex:/^(январ[ья]|янв\.?|феврал[ья]|февр?\.?|марта?|мар\.?|апрел[ья]|апр\.?|ма[йя]|июн[ья]|июн\.?|июл[ья]|июл\.?|августа?|авг\.?|сентябр[ья]|сент?\.?|октябр[ья]|окт\.?|ноябр[ья]|нояб?\.?|декабр[ья]|дек\.?)/i,monthsStrictRegex:/^(январ[яь]|феврал[яь]|марта?|апрел[яь]|ма[яй]|июн[яь]|июл[яь]|августа?|сентябр[яь]|октябр[яь]|ноябр[яь]|декабр[яь])/i,monthsShortStrictRegex:/^(янв\.|февр?\.|мар[т.]|апр\.|ма[яй]|июн[ья.]|июл[ья.]|авг\.|сент?\.|окт\.|нояб?\.|дек\.)/i,longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY",LL:"D MMMM YYYY г.",LLL:"D MMMM YYYY г., HH:mm",LLLL:"dddd, D MMMM YYYY г., HH:mm"},calendar:{sameDay:"[Сегодня в] LT",nextDay:"[Завтра в] LT",lastDay:"[Вчера в] LT",nextWeek:function(a){if(a.week()===this.week())return 2===this.day()?"[Во] dddd [в] LT":"[В] dddd [в] LT";switch(this.day()){case 0:return"[В следующее] dddd [в] LT";case 1:case 2:case 4:return"[В следующий] dddd [в] LT";case 3:case 5:case 6:return"[В следующую] dddd [в] LT"}},lastWeek:function(a){if(a.week()===this.week())return 2===this.day()?"[Во] dddd [в] LT":"[В] dddd [в] LT";switch(this.day()){case 0:return"[В прошлое] dddd [в] LT";case 1:case 2:case 4:return"[В прошлый] dddd [в] LT";case 3:case 5:case 6:return"[В прошлую] dddd [в] LT"}},sameElse:"L"},relativeTime:{future:"через %s",past:"%s назад",s:"несколько секунд",m:ee,mm:ee,h:"час",hh:ee,d:"день",dd:ee,M:"месяц",MM:ee,y:"год",yy:ee},meridiemParse:/ночи|утра|дня|вечера/i,isPM:function(a){return/^(дня|вечера)$/.test(a)},meridiem:function(a,b,c){return a<4?"ночи":a<12?"утра":a<17?"дня":"вечера"},dayOfMonthOrdinalParse:/\d{1,2}-(й|го|я)/,ordinal:function(a,b){switch(b){case"M":case"d":case"DDD":return a+"-й";case"D":return a+"-го";case"w":case"W":return a+"-я";default:return a}},week:{dow:1,doy:7}});
//! moment.js locale configuration
//! locale : Sindhi [sd]
//! author : Narain Sagar : https://github.com/narainsagar
var Jh=["جنوري","فيبروري","مارچ","اپريل","مئي","جون","جولاءِ","آگسٽ","سيپٽمبر","آڪٽوبر","نومبر","ڊسمبر"],Kh=["آچر","سومر","اڱارو","اربع","خميس","جمع","ڇنڇر"];a.defineLocale("sd",{months:Jh,monthsShort:Jh,weekdays:Kh,weekdaysShort:Kh,weekdaysMin:Kh,longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd، D MMMM YYYY HH:mm"},meridiemParse:/صبح|شام/,isPM:function(a){return"شام"===a},meridiem:function(a,b,c){return a<12?"صبح":"شام"},calendar:{sameDay:"[اڄ] LT",nextDay:"[سڀاڻي] LT",nextWeek:"dddd [اڳين هفتي تي] LT",lastDay:"[ڪالهه] LT",lastWeek:"[گزريل هفتي] dddd [تي] LT",sameElse:"L"},relativeTime:{future:"%s پوء",past:"%s اڳ",s:"چند سيڪنڊ",m:"هڪ منٽ",mm:"%d منٽ",h:"هڪ ڪلاڪ",hh:"%d ڪلاڪ",d:"هڪ ڏينهن",dd:"%d ڏينهن",M:"هڪ مهينو",MM:"%d مهينا",y:"هڪ سال",yy:"%d سال"},preparse:function(a){return a.replace(/،/g,",")},postformat:function(a){return a.replace(/,/g,"،")},week:{dow:1,doy:4}}),
//! moment.js locale configuration
//! locale : Northern Sami [se]
//! authors : Bård Rolstad Henriksen : https://github.com/karamell
a.defineLocale("se",{months:"ođđajagemánnu_guovvamánnu_njukčamánnu_cuoŋománnu_miessemánnu_geassemánnu_suoidnemánnu_borgemánnu_čakčamánnu_golggotmánnu_skábmamánnu_juovlamánnu".split("_"),monthsShort:"ođđj_guov_njuk_cuo_mies_geas_suoi_borg_čakč_golg_skáb_juov".split("_"),weekdays:"sotnabeaivi_vuossárga_maŋŋebárga_gaskavahkku_duorastat_bearjadat_lávvardat".split("_"),weekdaysShort:"sotn_vuos_maŋ_gask_duor_bear_láv".split("_"),weekdaysMin:"s_v_m_g_d_b_L".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY",LL:"MMMM D. [b.] YYYY",LLL:"MMMM D. [b.] YYYY [ti.] HH:mm",LLLL:"dddd, MMMM D. [b.] YYYY [ti.] HH:mm"},calendar:{sameDay:"[otne ti] LT",nextDay:"[ihttin ti] LT",nextWeek:"dddd [ti] LT",lastDay:"[ikte ti] LT",lastWeek:"[ovddit] dddd [ti] LT",sameElse:"L"},relativeTime:{future:"%s geažes",past:"maŋit %s",s:"moadde sekunddat",m:"okta minuhta",mm:"%d minuhtat",h:"okta diimmu",hh:"%d diimmut",d:"okta beaivi",dd:"%d beaivvit",M:"okta mánnu",MM:"%d mánut",y:"okta jahki",yy:"%d jagit"},dayOfMonthOrdinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}}),
//! moment.js locale configuration
//! locale : Sinhalese [si]
//! author : Sampath Sitinamaluwa : https://github.com/sampathsris
a.defineLocale("si",{months:"ජනවාරි_පෙබරවාරි_මාර්තු_අප්‍රේල්_මැයි_ජූනි_ජූලි_අගෝස්තු_සැප්තැම්බර්_ඔක්තෝබර්_නොවැම්බර්_දෙසැම්බර්".split("_"),monthsShort:"ජන_පෙබ_මාර්_අප්_මැයි_ජූනි_ජූලි_අගෝ_සැප්_ඔක්_නොවැ_දෙසැ".split("_"),weekdays:"ඉරිදා_සඳුදා_අඟහරුවාදා_බදාදා_බ්‍රහස්පතින්දා_සිකුරාදා_සෙනසුරාදා".split("_"),weekdaysShort:"ඉරි_සඳු_අඟ_බදා_බ්‍රහ_සිකු_සෙන".split("_"),weekdaysMin:"ඉ_ස_අ_බ_බ්‍ර_සි_සෙ".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"a h:mm",LTS:"a h:mm:ss",L:"YYYY/MM/DD",LL:"YYYY MMMM D",LLL:"YYYY MMMM D, a h:mm",LLLL:"YYYY MMMM D [වැනි] dddd, a h:mm:ss"},calendar:{sameDay:"[අද] LT[ට]",nextDay:"[හෙට] LT[ට]",nextWeek:"dddd LT[ට]",lastDay:"[ඊයේ] LT[ට]",lastWeek:"[පසුගිය] dddd LT[ට]",sameElse:"L"},relativeTime:{future:"%sකින්",past:"%sකට පෙර",s:"තත්පර කිහිපය",m:"මිනිත්තුව",mm:"මිනිත්තු %d",h:"පැය",hh:"පැය %d",d:"දිනය",dd:"දින %d",M:"මාසය",MM:"මාස %d",y:"වසර",yy:"වසර %d"},dayOfMonthOrdinalParse:/\d{1,2} වැනි/,ordinal:function(a){return a+" වැනි"},meridiemParse:/පෙර වරු|පස් වරු|පෙ.ව|ප.ව./,isPM:function(a){return"ප.ව."===a||"පස් වරු"===a},meridiem:function(a,b,c){return a>11?c?"ප.ව.":"පස් වරු":c?"පෙ.ව.":"පෙර වරු"}});
//! moment.js locale configuration
//! locale : Slovak [sk]
//! author : Martin Minka : https://github.com/k2s
//! based on work of petrbela : https://github.com/petrbela
var Lh="január_február_marec_apríl_máj_jún_júl_august_september_október_november_december".split("_"),Mh="jan_feb_mar_apr_máj_jún_júl_aug_sep_okt_nov_dec".split("_");a.defineLocale("sk",{months:Lh,monthsShort:Mh,weekdays:"nedeľa_pondelok_utorok_streda_štvrtok_piatok_sobota".split("_"),weekdaysShort:"ne_po_ut_st_št_pi_so".split("_"),weekdaysMin:"ne_po_ut_st_št_pi_so".split("_"),longDateFormat:{LT:"H:mm",LTS:"H:mm:ss",L:"DD.MM.YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY H:mm",LLLL:"dddd D. MMMM YYYY H:mm"},calendar:{sameDay:"[dnes o] LT",nextDay:"[zajtra o] LT",nextWeek:function(){switch(this.day()){case 0:return"[v nedeľu o] LT";case 1:case 2:return"[v] dddd [o] LT";case 3:return"[v stredu o] LT";case 4:return"[vo štvrtok o] LT";case 5:return"[v piatok o] LT";case 6:return"[v sobotu o] LT"}},lastDay:"[včera o] LT",lastWeek:function(){switch(this.day()){case 0:return"[minulú nedeľu o] LT";case 1:case 2:return"[minulý] dddd [o] LT";case 3:return"[minulú stredu o] LT";case 4:case 5:return"[minulý] dddd [o] LT";case 6:return"[minulú sobotu o] LT"}},sameElse:"L"},relativeTime:{future:"za %s",past:"pred %s",s:ge,m:ge,mm:ge,h:ge,hh:ge,d:ge,dd:ge,M:ge,MM:ge,y:ge,yy:ge},dayOfMonthOrdinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}}),a.defineLocale("sl",{months:"januar_februar_marec_april_maj_junij_julij_avgust_september_oktober_november_december".split("_"),monthsShort:"jan._feb._mar._apr._maj._jun._jul._avg._sep._okt._nov._dec.".split("_"),monthsParseExact:!0,weekdays:"nedelja_ponedeljek_torek_sreda_četrtek_petek_sobota".split("_"),weekdaysShort:"ned._pon._tor._sre._čet._pet._sob.".split("_"),weekdaysMin:"ne_po_to_sr_če_pe_so".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"H:mm",LTS:"H:mm:ss",L:"DD.MM.YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY H:mm",LLLL:"dddd, D. MMMM YYYY H:mm"},calendar:{sameDay:"[danes ob] LT",nextDay:"[jutri ob] LT",nextWeek:function(){switch(this.day()){case 0:return"[v] [nedeljo] [ob] LT";case 3:return"[v] [sredo] [ob] LT";case 6:return"[v] [soboto] [ob] LT";case 1:case 2:case 4:case 5:return"[v] dddd [ob] LT"}},lastDay:"[včeraj ob] LT",lastWeek:function(){switch(this.day()){case 0:return"[prejšnjo] [nedeljo] [ob] LT";case 3:return"[prejšnjo] [sredo] [ob] LT";case 6:return"[prejšnjo] [soboto] [ob] LT";case 1:case 2:case 4:case 5:return"[prejšnji] dddd [ob] LT"}},sameElse:"L"},relativeTime:{future:"čez %s",past:"pred %s",s:he,m:he,mm:he,h:he,hh:he,d:he,dd:he,M:he,MM:he,y:he,yy:he},dayOfMonthOrdinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:7}}),
//! moment.js locale configuration
//! locale : Albanian [sq]
//! author : Flakërim Ismani : https://github.com/flakerimi
//! author : Menelion Elensúle : https://github.com/Oire
//! author : Oerd Cukalla : https://github.com/oerd
a.defineLocale("sq",{months:"Janar_Shkurt_Mars_Prill_Maj_Qershor_Korrik_Gusht_Shtator_Tetor_Nëntor_Dhjetor".split("_"),monthsShort:"Jan_Shk_Mar_Pri_Maj_Qer_Kor_Gus_Sht_Tet_Nën_Dhj".split("_"),weekdays:"E Diel_E Hënë_E Martë_E Mërkurë_E Enjte_E Premte_E Shtunë".split("_"),weekdaysShort:"Die_Hën_Mar_Mër_Enj_Pre_Sht".split("_"),weekdaysMin:"D_H_Ma_Më_E_P_Sh".split("_"),weekdaysParseExact:!0,meridiemParse:/PD|MD/,isPM:function(a){return"M"===a.charAt(0)},meridiem:function(a,b,c){return a<12?"PD":"MD"},longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd, D MMMM YYYY HH:mm"},calendar:{sameDay:"[Sot në] LT",nextDay:"[Nesër në] LT",nextWeek:"dddd [në] LT",lastDay:"[Dje në] LT",lastWeek:"dddd [e kaluar në] LT",sameElse:"L"},relativeTime:{future:"në %s",past:"%s më parë",s:"disa sekonda",m:"një minutë",mm:"%d minuta",h:"një orë",hh:"%d orë",d:"një ditë",dd:"%d ditë",M:"një muaj",MM:"%d muaj",y:"një vit",yy:"%d vite"},dayOfMonthOrdinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}});
//! moment.js locale configuration
//! locale : Serbian Cyrillic [sr-cyrl]
//! author : Milan Janačković<milanjanackovic@gmail.com> : https://github.com/milan-j
var Nh={words:{m:["један минут","једне минуте"],mm:["минут","минуте","минута"],h:["један сат","једног сата"],hh:["сат","сата","сати"],dd:["дан","дана","дана"],MM:["месец","месеца","месеци"],yy:["година","године","година"]},correctGrammaticalCase:function(a,b){return 1===a?b[0]:a>=2&&a<=4?b[1]:b[2]},translate:function(a,b,c){var d=Nh.words[c];return 1===c.length?b?d[0]:d[1]:a+" "+Nh.correctGrammaticalCase(a,d)}};a.defineLocale("sr-cyrl",{months:"јануар_фебруар_март_април_мај_јун_јул_август_септембар_октобар_новембар_децембар".split("_"),monthsShort:"јан._феб._мар._апр._мај_јун_јул_авг._сеп._окт._нов._дец.".split("_"),monthsParseExact:!0,weekdays:"недеља_понедељак_уторак_среда_четвртак_петак_субота".split("_"),weekdaysShort:"нед._пон._уто._сре._чет._пет._суб.".split("_"),weekdaysMin:"не_по_ут_ср_че_пе_су".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"H:mm",LTS:"H:mm:ss",L:"DD.MM.YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY H:mm",LLLL:"dddd, D. MMMM YYYY H:mm"},calendar:{sameDay:"[данас у] LT",nextDay:"[сутра у] LT",nextWeek:function(){switch(this.day()){case 0:return"[у] [недељу] [у] LT";case 3:return"[у] [среду] [у] LT";case 6:return"[у] [суботу] [у] LT";case 1:case 2:case 4:case 5:return"[у] dddd [у] LT"}},lastDay:"[јуче у] LT",lastWeek:function(){var a=["[прошле] [недеље] [у] LT","[прошлог] [понедељка] [у] LT","[прошлог] [уторка] [у] LT","[прошле] [среде] [у] LT","[прошлог] [четвртка] [у] LT","[прошлог] [петка] [у] LT","[прошле] [суботе] [у] LT"];return a[this.day()]},sameElse:"L"},relativeTime:{future:"за %s",past:"пре %s",s:"неколико секунди",m:Nh.translate,mm:Nh.translate,h:Nh.translate,hh:Nh.translate,d:"дан",dd:Nh.translate,M:"месец",MM:Nh.translate,y:"годину",yy:Nh.translate},dayOfMonthOrdinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:7}});
//! moment.js locale configuration
//! locale : Serbian [sr]
//! author : Milan Janačković<milanjanackovic@gmail.com> : https://github.com/milan-j
var Oh={words:{m:["jedan minut","jedne minute"],mm:["minut","minute","minuta"],h:["jedan sat","jednog sata"],hh:["sat","sata","sati"],dd:["dan","dana","dana"],MM:["mesec","meseca","meseci"],yy:["godina","godine","godina"]},correctGrammaticalCase:function(a,b){return 1===a?b[0]:a>=2&&a<=4?b[1]:b[2]},translate:function(a,b,c){var d=Oh.words[c];return 1===c.length?b?d[0]:d[1]:a+" "+Oh.correctGrammaticalCase(a,d)}};a.defineLocale("sr",{months:"januar_februar_mart_april_maj_jun_jul_avgust_septembar_oktobar_novembar_decembar".split("_"),monthsShort:"jan._feb._mar._apr._maj_jun_jul_avg._sep._okt._nov._dec.".split("_"),monthsParseExact:!0,weekdays:"nedelja_ponedeljak_utorak_sreda_četvrtak_petak_subota".split("_"),weekdaysShort:"ned._pon._uto._sre._čet._pet._sub.".split("_"),weekdaysMin:"ne_po_ut_sr_če_pe_su".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"H:mm",LTS:"H:mm:ss",L:"DD.MM.YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY H:mm",LLLL:"dddd, D. MMMM YYYY H:mm"},calendar:{sameDay:"[danas u] LT",nextDay:"[sutra u] LT",nextWeek:function(){switch(this.day()){case 0:return"[u] [nedelju] [u] LT";case 3:return"[u] [sredu] [u] LT";case 6:return"[u] [subotu] [u] LT";case 1:case 2:case 4:case 5:return"[u] dddd [u] LT"}},lastDay:"[juče u] LT",lastWeek:function(){var a=["[prošle] [nedelje] [u] LT","[prošlog] [ponedeljka] [u] LT","[prošlog] [utorka] [u] LT","[prošle] [srede] [u] LT","[prošlog] [četvrtka] [u] LT","[prošlog] [petka] [u] LT","[prošle] [subote] [u] LT"];return a[this.day()]},sameElse:"L"},relativeTime:{future:"za %s",past:"pre %s",s:"nekoliko sekundi",m:Oh.translate,mm:Oh.translate,h:Oh.translate,hh:Oh.translate,d:"dan",dd:Oh.translate,M:"mesec",MM:Oh.translate,y:"godinu",yy:Oh.translate},dayOfMonthOrdinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:7}}),
//! moment.js locale configuration
//! locale : siSwati [ss]
//! author : Nicolai Davies<mail@nicolai.io> : https://github.com/nicolaidavies
a.defineLocale("ss",{months:"Bhimbidvwane_Indlovana_Indlov'lenkhulu_Mabasa_Inkhwekhweti_Inhlaba_Kholwane_Ingci_Inyoni_Imphala_Lweti_Ingongoni".split("_"),monthsShort:"Bhi_Ina_Inu_Mab_Ink_Inh_Kho_Igc_Iny_Imp_Lwe_Igo".split("_"),weekdays:"Lisontfo_Umsombuluko_Lesibili_Lesitsatfu_Lesine_Lesihlanu_Umgcibelo".split("_"),weekdaysShort:"Lis_Umb_Lsb_Les_Lsi_Lsh_Umg".split("_"),weekdaysMin:"Li_Us_Lb_Lt_Ls_Lh_Ug".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"h:mm A",LTS:"h:mm:ss A",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY h:mm A",LLLL:"dddd, D MMMM YYYY h:mm A"},calendar:{sameDay:"[Namuhla nga] LT",nextDay:"[Kusasa nga] LT",nextWeek:"dddd [nga] LT",lastDay:"[Itolo nga] LT",lastWeek:"dddd [leliphelile] [nga] LT",sameElse:"L"},relativeTime:{future:"nga %s",past:"wenteka nga %s",s:"emizuzwana lomcane",m:"umzuzu",mm:"%d emizuzu",h:"lihora",hh:"%d emahora",d:"lilanga",dd:"%d emalanga",M:"inyanga",MM:"%d tinyanga",y:"umnyaka",yy:"%d iminyaka"},meridiemParse:/ekuseni|emini|entsambama|ebusuku/,meridiem:function(a,b,c){return a<11?"ekuseni":a<15?"emini":a<19?"entsambama":"ebusuku"},meridiemHour:function(a,b){return 12===a&&(a=0),"ekuseni"===b?a:"emini"===b?a>=11?a:a+12:"entsambama"===b||"ebusuku"===b?0===a?0:a+12:void 0},dayOfMonthOrdinalParse:/\d{1,2}/,ordinal:"%d",week:{dow:1,doy:4}}),
//! moment.js locale configuration
//! locale : Swedish [sv]
//! author : Jens Alm : https://github.com/ulmus
a.defineLocale("sv",{months:"januari_februari_mars_april_maj_juni_juli_augusti_september_oktober_november_december".split("_"),monthsShort:"jan_feb_mar_apr_maj_jun_jul_aug_sep_okt_nov_dec".split("_"),weekdays:"söndag_måndag_tisdag_onsdag_torsdag_fredag_lördag".split("_"),weekdaysShort:"sön_mån_tis_ons_tor_fre_lör".split("_"),weekdaysMin:"sö_må_ti_on_to_fr_lö".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"YYYY-MM-DD",LL:"D MMMM YYYY",LLL:"D MMMM YYYY [kl.] HH:mm",LLLL:"dddd D MMMM YYYY [kl.] HH:mm",lll:"D MMM YYYY HH:mm",llll:"ddd D MMM YYYY HH:mm"},calendar:{sameDay:"[Idag] LT",nextDay:"[Imorgon] LT",lastDay:"[Igår] LT",nextWeek:"[På] dddd LT",lastWeek:"[I] dddd[s] LT",sameElse:"L"},relativeTime:{future:"om %s",past:"för %s sedan",s:"några sekunder",m:"en minut",mm:"%d minuter",h:"en timme",hh:"%d timmar",d:"en dag",dd:"%d dagar",M:"en månad",MM:"%d månader",y:"ett år",yy:"%d år"},dayOfMonthOrdinalParse:/\d{1,2}(e|a)/,ordinal:function(a){var b=a%10,c=1===~~(a%100/10)?"e":1===b?"a":2===b?"a":"e";return a+c},week:{dow:1,doy:4}}),
//! moment.js locale configuration
//! locale : Swahili [sw]
//! author : Fahad Kassim : https://github.com/fadsel
a.defineLocale("sw",{months:"Januari_Februari_Machi_Aprili_Mei_Juni_Julai_Agosti_Septemba_Oktoba_Novemba_Desemba".split("_"),monthsShort:"Jan_Feb_Mac_Apr_Mei_Jun_Jul_Ago_Sep_Okt_Nov_Des".split("_"),weekdays:"Jumapili_Jumatatu_Jumanne_Jumatano_Alhamisi_Ijumaa_Jumamosi".split("_"),weekdaysShort:"Jpl_Jtat_Jnne_Jtan_Alh_Ijm_Jmos".split("_"),weekdaysMin:"J2_J3_J4_J5_Al_Ij_J1".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd, D MMMM YYYY HH:mm"},calendar:{sameDay:"[leo saa] LT",nextDay:"[kesho saa] LT",nextWeek:"[wiki ijayo] dddd [saat] LT",lastDay:"[jana] LT",lastWeek:"[wiki iliyopita] dddd [saat] LT",sameElse:"L"},relativeTime:{future:"%s baadaye",past:"tokea %s",s:"hivi punde",m:"dakika moja",mm:"dakika %d",h:"saa limoja",hh:"masaa %d",d:"siku moja",dd:"masiku %d",M:"mwezi mmoja",MM:"miezi %d",y:"mwaka mmoja",yy:"miaka %d"},week:{dow:1,doy:7}});
//! moment.js locale configuration
//! locale : Tamil [ta]
//! author : Arjunkumar Krishnamoorthy : https://github.com/tk120404
var Ph={1:"௧",2:"௨",3:"௩",4:"௪",5:"௫",6:"௬",7:"௭",8:"௮",9:"௯",0:"௦"},Qh={"௧":"1","௨":"2","௩":"3","௪":"4","௫":"5","௬":"6","௭":"7","௮":"8","௯":"9","௦":"0"};a.defineLocale("ta",{months:"ஜனவரி_பிப்ரவரி_மார்ச்_ஏப்ரல்_மே_ஜூன்_ஜூலை_ஆகஸ்ட்_செப்டெம்பர்_அக்டோபர்_நவம்பர்_டிசம்பர்".split("_"),monthsShort:"ஜனவரி_பிப்ரவரி_மார்ச்_ஏப்ரல்_மே_ஜூன்_ஜூலை_ஆகஸ்ட்_செப்டெம்பர்_அக்டோபர்_நவம்பர்_டிசம்பர்".split("_"),weekdays:"ஞாயிற்றுக்கிழமை_திங்கட்கிழமை_செவ்வாய்கிழமை_புதன்கிழமை_வியாழக்கிழமை_வெள்ளிக்கிழமை_சனிக்கிழமை".split("_"),weekdaysShort:"ஞாயிறு_திங்கள்_செவ்வாய்_புதன்_வியாழன்_வெள்ளி_சனி".split("_"),weekdaysMin:"ஞா_தி_செ_பு_வி_வெ_ச".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY, HH:mm",LLLL:"dddd, D MMMM YYYY, HH:mm"},calendar:{sameDay:"[இன்று] LT",nextDay:"[நாளை] LT",nextWeek:"dddd, LT",lastDay:"[நேற்று] LT",lastWeek:"[கடந்த வாரம்] dddd, LT",sameElse:"L"},relativeTime:{future:"%s இல்",past:"%s முன்",s:"ஒரு சில விநாடிகள்",m:"ஒரு நிமிடம்",mm:"%d நிமிடங்கள்",h:"ஒரு மணி நேரம்",hh:"%d மணி நேரம்",d:"ஒரு நாள்",dd:"%d நாட்கள்",M:"ஒரு மாதம்",MM:"%d மாதங்கள்",y:"ஒரு வருடம்",yy:"%d ஆண்டுகள்"},dayOfMonthOrdinalParse:/\d{1,2}வது/,ordinal:function(a){return a+"வது"},preparse:function(a){return a.replace(/[௧௨௩௪௫௬௭௮௯௦]/g,function(a){return Qh[a]})},postformat:function(a){return a.replace(/\d/g,function(a){return Ph[a]})},meridiemParse:/யாமம்|வைகறை|காலை|நண்பகல்|எற்பாடு|மாலை/,meridiem:function(a,b,c){return a<2?" யாமம்":a<6?" வைகறை":a<10?" காலை":a<14?" நண்பகல்":a<18?" எற்பாடு":a<22?" மாலை":" யாமம்"},meridiemHour:function(a,b){return 12===a&&(a=0),"யாமம்"===b?a<2?a:a+12:"வைகறை"===b||"காலை"===b?a:"நண்பகல்"===b&&a>=10?a:a+12},week:{dow:0,doy:6}}),
//! moment.js locale configuration
//! locale : Telugu [te]
//! author : Krishna Chaitanya Thota : https://github.com/kcthota
a.defineLocale("te",{months:"జనవరి_ఫిబ్రవరి_మార్చి_ఏప్రిల్_మే_జూన్_జూలై_ఆగస్టు_సెప్టెంబర్_అక్టోబర్_నవంబర్_డిసెంబర్".split("_"),monthsShort:"జన._ఫిబ్ర._మార్చి_ఏప్రి._మే_జూన్_జూలై_ఆగ._సెప్._అక్టో._నవ._డిసె.".split("_"),monthsParseExact:!0,weekdays:"ఆదివారం_సోమవారం_మంగళవారం_బుధవారం_గురువారం_శుక్రవారం_శనివారం".split("_"),weekdaysShort:"ఆది_సోమ_మంగళ_బుధ_గురు_శుక్ర_శని".split("_"),weekdaysMin:"ఆ_సో_మం_బు_గు_శు_శ".split("_"),longDateFormat:{LT:"A h:mm",LTS:"A h:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY, A h:mm",LLLL:"dddd, D MMMM YYYY, A h:mm"},calendar:{sameDay:"[నేడు] LT",nextDay:"[రేపు] LT",nextWeek:"dddd, LT",lastDay:"[నిన్న] LT",lastWeek:"[గత] dddd, LT",sameElse:"L"},relativeTime:{future:"%s లో",past:"%s క్రితం",s:"కొన్ని క్షణాలు",m:"ఒక నిమిషం",mm:"%d నిమిషాలు",h:"ఒక గంట",hh:"%d గంటలు",d:"ఒక రోజు",dd:"%d రోజులు",M:"ఒక నెల",MM:"%d నెలలు",y:"ఒక సంవత్సరం",yy:"%d సంవత్సరాలు"},dayOfMonthOrdinalParse:/\d{1,2}వ/,ordinal:"%dవ",meridiemParse:/రాత్రి|ఉదయం|మధ్యాహ్నం|సాయంత్రం/,meridiemHour:function(a,b){return 12===a&&(a=0),"రాత్రి"===b?a<4?a:a+12:"ఉదయం"===b?a:"మధ్యాహ్నం"===b?a>=10?a:a+12:"సాయంత్రం"===b?a+12:void 0},meridiem:function(a,b,c){return a<4?"రాత్రి":a<10?"ఉదయం":a<17?"మధ్యాహ్నం":a<20?"సాయంత్రం":"రాత్రి"},week:{dow:0,doy:6}}),
//! moment.js locale configuration
//! locale : Tetun Dili (East Timor) [tet]
//! author : Joshua Brooks : https://github.com/joshbrooks
//! author : Onorio De J. Afonso : https://github.com/marobo
a.defineLocale("tet",{months:"Janeiru_Fevereiru_Marsu_Abril_Maiu_Juniu_Juliu_Augustu_Setembru_Outubru_Novembru_Dezembru".split("_"),monthsShort:"Jan_Fev_Mar_Abr_Mai_Jun_Jul_Aug_Set_Out_Nov_Dez".split("_"),weekdays:"Domingu_Segunda_Tersa_Kuarta_Kinta_Sexta_Sabadu".split("_"),weekdaysShort:"Dom_Seg_Ters_Kua_Kint_Sext_Sab".split("_"),weekdaysMin:"Do_Seg_Te_Ku_Ki_Sex_Sa".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd, D MMMM YYYY HH:mm"},calendar:{sameDay:"[Ohin iha] LT",nextDay:"[Aban iha] LT",nextWeek:"dddd [iha] LT",lastDay:"[Horiseik iha] LT",lastWeek:"dddd [semana kotuk] [iha] LT",sameElse:"L"},relativeTime:{future:"iha %s",past:"%s liuba",s:"minutu balun",m:"minutu ida",mm:"minutus %d",h:"horas ida",hh:"horas %d",d:"loron ida",dd:"loron %d",M:"fulan ida",MM:"fulan %d",y:"tinan ida",yy:"tinan %d"},dayOfMonthOrdinalParse:/\d{1,2}(st|nd|rd|th)/,ordinal:function(a){var b=a%10,c=1===~~(a%100/10)?"th":1===b?"st":2===b?"nd":3===b?"rd":"th";return a+c},week:{dow:1,doy:4}}),
//! moment.js locale configuration
//! locale : Thai [th]
//! author : Kridsada Thanabulpong : https://github.com/sirn
a.defineLocale("th",{months:"มกราคม_กุมภาพันธ์_มีนาคม_เมษายน_พฤษภาคม_มิถุนายน_กรกฎาคม_สิงหาคม_กันยายน_ตุลาคม_พฤศจิกายน_ธันวาคม".split("_"),monthsShort:"ม.ค._ก.พ._มี.ค._เม.ย._พ.ค._มิ.ย._ก.ค._ส.ค._ก.ย._ต.ค._พ.ย._ธ.ค.".split("_"),monthsParseExact:!0,weekdays:"อาทิตย์_จันทร์_อังคาร_พุธ_พฤหัสบดี_ศุกร์_เสาร์".split("_"),weekdaysShort:"อาทิตย์_จันทร์_อังคาร_พุธ_พฤหัส_ศุกร์_เสาร์".split("_"),weekdaysMin:"อา._จ._อ._พ._พฤ._ศ._ส.".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"H:mm",LTS:"H:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY เวลา H:mm",LLLL:"วันddddที่ D MMMM YYYY เวลา H:mm"},meridiemParse:/ก่อนเที่ยง|หลังเที่ยง/,isPM:function(a){return"หลังเที่ยง"===a},meridiem:function(a,b,c){return a<12?"ก่อนเที่ยง":"หลังเที่ยง"},calendar:{sameDay:"[วันนี้ เวลา] LT",nextDay:"[พรุ่งนี้ เวลา] LT",nextWeek:"dddd[หน้า เวลา] LT",lastDay:"[เมื่อวานนี้ เวลา] LT",lastWeek:"[วัน]dddd[ที่แล้ว เวลา] LT",sameElse:"L"},relativeTime:{future:"อีก %s",past:"%sที่แล้ว",s:"ไม่กี่วินาที",m:"1 นาที",mm:"%d นาที",h:"1 ชั่วโมง",hh:"%d ชั่วโมง",d:"1 วัน",dd:"%d วัน",M:"1 เดือน",MM:"%d เดือน",y:"1 ปี",yy:"%d ปี"}}),
//! moment.js locale configuration
//! locale : Tagalog (Philippines) [tl-ph]
//! author : Dan Hagman : https://github.com/hagmandan
a.defineLocale("tl-ph",{months:"Enero_Pebrero_Marso_Abril_Mayo_Hunyo_Hulyo_Agosto_Setyembre_Oktubre_Nobyembre_Disyembre".split("_"),monthsShort:"Ene_Peb_Mar_Abr_May_Hun_Hul_Ago_Set_Okt_Nob_Dis".split("_"),weekdays:"Linggo_Lunes_Martes_Miyerkules_Huwebes_Biyernes_Sabado".split("_"),weekdaysShort:"Lin_Lun_Mar_Miy_Huw_Biy_Sab".split("_"),weekdaysMin:"Li_Lu_Ma_Mi_Hu_Bi_Sab".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"MM/D/YYYY",LL:"MMMM D, YYYY",LLL:"MMMM D, YYYY HH:mm",LLLL:"dddd, MMMM DD, YYYY HH:mm"},calendar:{sameDay:"LT [ngayong araw]",nextDay:"[Bukas ng] LT",nextWeek:"LT [sa susunod na] dddd",lastDay:"LT [kahapon]",lastWeek:"LT [noong nakaraang] dddd",sameElse:"L"},relativeTime:{future:"sa loob ng %s",past:"%s ang nakalipas",s:"ilang segundo",m:"isang minuto",mm:"%d minuto",h:"isang oras",hh:"%d oras",d:"isang araw",dd:"%d araw",M:"isang buwan",MM:"%d buwan",y:"isang taon",yy:"%d taon"},dayOfMonthOrdinalParse:/\d{1,2}/,ordinal:function(a){return a},week:{dow:1,doy:4}});
//! moment.js locale configuration
//! locale : Klingon [tlh]
//! author : Dominika Kruk : https://github.com/amaranthrose
var Rh="pagh_wa’_cha’_wej_loS_vagh_jav_Soch_chorgh_Hut".split("_");a.defineLocale("tlh",{months:"tera’ jar wa’_tera’ jar cha’_tera’ jar wej_tera’ jar loS_tera’ jar vagh_tera’ jar jav_tera’ jar Soch_tera’ jar chorgh_tera’ jar Hut_tera’ jar wa’maH_tera’ jar wa’maH wa’_tera’ jar wa’maH cha’".split("_"),monthsShort:"jar wa’_jar cha’_jar wej_jar loS_jar vagh_jar jav_jar Soch_jar chorgh_jar Hut_jar wa’maH_jar wa’maH wa’_jar wa’maH cha’".split("_"),monthsParseExact:!0,weekdays:"lojmItjaj_DaSjaj_povjaj_ghItlhjaj_loghjaj_buqjaj_ghInjaj".split("_"),weekdaysShort:"lojmItjaj_DaSjaj_povjaj_ghItlhjaj_loghjaj_buqjaj_ghInjaj".split("_"),weekdaysMin:"lojmItjaj_DaSjaj_povjaj_ghItlhjaj_loghjaj_buqjaj_ghInjaj".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd, D MMMM YYYY HH:mm"},calendar:{sameDay:"[DaHjaj] LT",nextDay:"[wa’leS] LT",nextWeek:"LLL",lastDay:"[wa’Hu’] LT",lastWeek:"LLL",sameElse:"L"},relativeTime:{future:ie,past:je,s:"puS lup",m:"wa’ tup",mm:ke,h:"wa’ rep",hh:ke,d:"wa’ jaj",dd:ke,M:"wa’ jar",MM:ke,y:"wa’ DIS",yy:ke},dayOfMonthOrdinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}});
//! moment.js locale configuration
//! locale : Turkish [tr]
//! authors : Erhan Gundogan : https://github.com/erhangundogan,
//!           Burak Yiğit Kaya: https://github.com/BYK
var Sh={1:"'inci",5:"'inci",8:"'inci",70:"'inci",80:"'inci",2:"'nci",7:"'nci",20:"'nci",50:"'nci",3:"'üncü",4:"'üncü",100:"'üncü",6:"'ncı",9:"'uncu",10:"'uncu",30:"'uncu",60:"'ıncı",90:"'ıncı"};a.defineLocale("tr",{months:"Ocak_Şubat_Mart_Nisan_Mayıs_Haziran_Temmuz_Ağustos_Eylül_Ekim_Kasım_Aralık".split("_"),monthsShort:"Oca_Şub_Mar_Nis_May_Haz_Tem_Ağu_Eyl_Eki_Kas_Ara".split("_"),weekdays:"Pazar_Pazartesi_Salı_Çarşamba_Perşembe_Cuma_Cumartesi".split("_"),weekdaysShort:"Paz_Pts_Sal_Çar_Per_Cum_Cts".split("_"),weekdaysMin:"Pz_Pt_Sa_Ça_Pe_Cu_Ct".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd, D MMMM YYYY HH:mm"},calendar:{sameDay:"[bugün saat] LT",nextDay:"[yarın saat] LT",nextWeek:"[haftaya] dddd [saat] LT",lastDay:"[dün] LT",lastWeek:"[geçen hafta] dddd [saat] LT",sameElse:"L"},relativeTime:{future:"%s sonra",past:"%s önce",s:"birkaç saniye",m:"bir dakika",mm:"%d dakika",h:"bir saat",hh:"%d saat",d:"bir gün",dd:"%d gün",M:"bir ay",MM:"%d ay",y:"bir yıl",yy:"%d yıl"},dayOfMonthOrdinalParse:/\d{1,2}'(inci|nci|üncü|ncı|uncu|ıncı)/,ordinal:function(a){if(0===a)return a+"'ıncı";var b=a%10,c=a%100-b,d=a>=100?100:null;return a+(Sh[b]||Sh[c]||Sh[d])},week:{dow:1,doy:7}}),
//! moment.js locale configuration
//! locale : Talossan [tzl]
//! author : Robin van der Vliet : https://github.com/robin0van0der0v
//! author : Iustì Canun
a.defineLocale("tzl",{months:"Januar_Fevraglh_Març_Avrïu_Mai_Gün_Julia_Guscht_Setemvar_Listopäts_Noemvar_Zecemvar".split("_"),monthsShort:"Jan_Fev_Mar_Avr_Mai_Gün_Jul_Gus_Set_Lis_Noe_Zec".split("_"),weekdays:"Súladi_Lúneçi_Maitzi_Márcuri_Xhúadi_Viénerçi_Sáturi".split("_"),weekdaysShort:"Súl_Lún_Mai_Már_Xhú_Vié_Sát".split("_"),weekdaysMin:"Sú_Lú_Ma_Má_Xh_Vi_Sá".split("_"),longDateFormat:{LT:"HH.mm",LTS:"HH.mm.ss",L:"DD.MM.YYYY",LL:"D. MMMM [dallas] YYYY",LLL:"D. MMMM [dallas] YYYY HH.mm",LLLL:"dddd, [li] D. MMMM [dallas] YYYY HH.mm"},meridiemParse:/d\'o|d\'a/i,isPM:function(a){return"d'o"===a.toLowerCase()},meridiem:function(a,b,c){return a>11?c?"d'o":"D'O":c?"d'a":"D'A"},calendar:{sameDay:"[oxhi à] LT",nextDay:"[demà à] LT",nextWeek:"dddd [à] LT",lastDay:"[ieiri à] LT",lastWeek:"[sür el] dddd [lasteu à] LT",sameElse:"L"},relativeTime:{future:"osprei %s",past:"ja%s",s:me,m:me,mm:me,h:me,hh:me,d:me,dd:me,M:me,MM:me,y:me,yy:me},dayOfMonthOrdinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}}),
//! moment.js locale configuration
//! locale : Central Atlas Tamazight Latin [tzm-latn]
//! author : Abdel Said : https://github.com/abdelsaid
a.defineLocale("tzm-latn",{months:"innayr_brˤayrˤ_marˤsˤ_ibrir_mayyw_ywnyw_ywlywz_ɣwšt_šwtanbir_ktˤwbrˤ_nwwanbir_dwjnbir".split("_"),monthsShort:"innayr_brˤayrˤ_marˤsˤ_ibrir_mayyw_ywnyw_ywlywz_ɣwšt_šwtanbir_ktˤwbrˤ_nwwanbir_dwjnbir".split("_"),weekdays:"asamas_aynas_asinas_akras_akwas_asimwas_asiḍyas".split("_"),weekdaysShort:"asamas_aynas_asinas_akras_akwas_asimwas_asiḍyas".split("_"),weekdaysMin:"asamas_aynas_asinas_akras_akwas_asimwas_asiḍyas".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd D MMMM YYYY HH:mm"},calendar:{sameDay:"[asdkh g] LT",nextDay:"[aska g] LT",nextWeek:"dddd [g] LT",lastDay:"[assant g] LT",lastWeek:"dddd [g] LT",sameElse:"L"},relativeTime:{future:"dadkh s yan %s",past:"yan %s",s:"imik",m:"minuḍ",mm:"%d minuḍ",h:"saɛa",hh:"%d tassaɛin",d:"ass",dd:"%d ossan",M:"ayowr",MM:"%d iyyirn",y:"asgas",yy:"%d isgasn"},week:{dow:6,doy:12}}),
//! moment.js locale configuration
//! locale : Central Atlas Tamazight [tzm]
//! author : Abdel Said : https://github.com/abdelsaid
a.defineLocale("tzm",{months:"ⵉⵏⵏⴰⵢⵔ_ⴱⵕⴰⵢⵕ_ⵎⴰⵕⵚ_ⵉⴱⵔⵉⵔ_ⵎⴰⵢⵢⵓ_ⵢⵓⵏⵢⵓ_ⵢⵓⵍⵢⵓⵣ_ⵖⵓⵛⵜ_ⵛⵓⵜⴰⵏⴱⵉⵔ_ⴽⵟⵓⴱⵕ_ⵏⵓⵡⴰⵏⴱⵉⵔ_ⴷⵓⵊⵏⴱⵉⵔ".split("_"),monthsShort:"ⵉⵏⵏⴰⵢⵔ_ⴱⵕⴰⵢⵕ_ⵎⴰⵕⵚ_ⵉⴱⵔⵉⵔ_ⵎⴰⵢⵢⵓ_ⵢⵓⵏⵢⵓ_ⵢⵓⵍⵢⵓⵣ_ⵖⵓⵛⵜ_ⵛⵓⵜⴰⵏⴱⵉⵔ_ⴽⵟⵓⴱⵕ_ⵏⵓⵡⴰⵏⴱⵉⵔ_ⴷⵓⵊⵏⴱⵉⵔ".split("_"),weekdays:"ⴰⵙⴰⵎⴰⵙ_ⴰⵢⵏⴰⵙ_ⴰⵙⵉⵏⴰⵙ_ⴰⴽⵔⴰⵙ_ⴰⴽⵡⴰⵙ_ⴰⵙⵉⵎⵡⴰⵙ_ⴰⵙⵉⴹⵢⴰⵙ".split("_"),weekdaysShort:"ⴰⵙⴰⵎⴰⵙ_ⴰⵢⵏⴰⵙ_ⴰⵙⵉⵏⴰⵙ_ⴰⴽⵔⴰⵙ_ⴰⴽⵡⴰⵙ_ⴰⵙⵉⵎⵡⴰⵙ_ⴰⵙⵉⴹⵢⴰⵙ".split("_"),weekdaysMin:"ⴰⵙⴰⵎⴰⵙ_ⴰⵢⵏⴰⵙ_ⴰⵙⵉⵏⴰⵙ_ⴰⴽⵔⴰⵙ_ⴰⴽⵡⴰⵙ_ⴰⵙⵉⵎⵡⴰⵙ_ⴰⵙⵉⴹⵢⴰⵙ".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd D MMMM YYYY HH:mm"},calendar:{sameDay:"[ⴰⵙⴷⵅ ⴴ] LT",nextDay:"[ⴰⵙⴽⴰ ⴴ] LT",nextWeek:"dddd [ⴴ] LT",lastDay:"[ⴰⵚⴰⵏⵜ ⴴ] LT",lastWeek:"dddd [ⴴ] LT",sameElse:"L"},relativeTime:{future:"ⴷⴰⴷⵅ ⵙ ⵢⴰⵏ %s",past:"ⵢⴰⵏ %s",s:"ⵉⵎⵉⴽ",m:"ⵎⵉⵏⵓⴺ",mm:"%d ⵎⵉⵏⵓⴺ",h:"ⵙⴰⵄⴰ",hh:"%d ⵜⴰⵙⵙⴰⵄⵉⵏ",d:"ⴰⵙⵙ",dd:"%d oⵙⵙⴰⵏ",M:"ⴰⵢoⵓⵔ",MM:"%d ⵉⵢⵢⵉⵔⵏ",y:"ⴰⵙⴳⴰⵙ",yy:"%d ⵉⵙⴳⴰⵙⵏ"},week:{dow:6,doy:12}}),a.defineLocale("uk",{months:{format:"січня_лютого_березня_квітня_травня_червня_липня_серпня_вересня_жовтня_листопада_грудня".split("_"),standalone:"січень_лютий_березень_квітень_травень_червень_липень_серпень_вересень_жовтень_листопад_грудень".split("_")},monthsShort:"січ_лют_бер_квіт_трав_черв_лип_серп_вер_жовт_лист_груд".split("_"),weekdays:pe,weekdaysShort:"нд_пн_вт_ср_чт_пт_сб".split("_"),weekdaysMin:"нд_пн_вт_ср_чт_пт_сб".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY",LL:"D MMMM YYYY р.",LLL:"D MMMM YYYY р., HH:mm",LLLL:"dddd, D MMMM YYYY р., HH:mm"},calendar:{sameDay:qe("[Сьогодні "),nextDay:qe("[Завтра "),lastDay:qe("[Вчора "),nextWeek:qe("[У] dddd ["),lastWeek:function(){switch(this.day()){case 0:case 3:case 5:case 6:return qe("[Минулої] dddd [").call(this);case 1:case 2:case 4:return qe("[Минулого] dddd [").call(this)}},sameElse:"L"},relativeTime:{future:"за %s",past:"%s тому",s:"декілька секунд",m:oe,mm:oe,h:"годину",hh:oe,d:"день",dd:oe,M:"місяць",MM:oe,y:"рік",yy:oe},meridiemParse:/ночі|ранку|дня|вечора/,isPM:function(a){return/^(дня|вечора)$/.test(a)},meridiem:function(a,b,c){return a<4?"ночі":a<12?"ранку":a<17?"дня":"вечора"},dayOfMonthOrdinalParse:/\d{1,2}-(й|го)/,ordinal:function(a,b){switch(b){case"M":case"d":case"DDD":case"w":case"W":return a+"-й";case"D":return a+"-го";default:return a}},week:{dow:1,doy:7}});
//! moment.js locale configuration
//! locale : Urdu [ur]
//! author : Sawood Alam : https://github.com/ibnesayeed
//! author : Zack : https://github.com/ZackVision
var Th=["جنوری","فروری","مارچ","اپریل","مئی","جون","جولائی","اگست","ستمبر","اکتوبر","نومبر","دسمبر"],Uh=["اتوار","پیر","منگل","بدھ","جمعرات","جمعہ","ہفتہ"];
//! moment.js locale configuration
//! locale : Uzbek Latin [uz-latn]
//! author : Rasulbek Mirzayev : github.com/Rasulbeeek
//! moment.js locale configuration
//! locale : Uzbek [uz]
//! author : Sardor Muminov : https://github.com/muminoff
//! moment.js locale configuration
//! locale : Vietnamese [vi]
//! author : Bang Nguyen : https://github.com/bangnk
//! moment.js locale configuration
//! locale : Pseudo [x-pseudo]
//! author : Andrew Hood : https://github.com/andrewhood125
//! moment.js locale configuration
//! locale : Yoruba Nigeria [yo]
//! author : Atolagbe Abisoye : https://github.com/andela-batolagbe
//! moment.js locale configuration
//! locale : Chinese (China) [zh-cn]
//! author : suupic : https://github.com/suupic
//! author : Zeno Zeng : https://github.com/zenozeng
//! moment.js locale configuration
//! locale : Chinese (Hong Kong) [zh-hk]
//! author : Ben : https://github.com/ben-lin
//! author : Chris Lam : https://github.com/hehachris
//! author : Konstantin : https://github.com/skfd
//! moment.js locale configuration
//! locale : Chinese (Taiwan) [zh-tw]
//! author : Ben : https://github.com/ben-lin
//! author : Chris Lam : https://github.com/hehachris
return a.defineLocale("ur",{months:Th,monthsShort:Th,weekdays:Uh,weekdaysShort:Uh,weekdaysMin:Uh,longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd، D MMMM YYYY HH:mm"},meridiemParse:/صبح|شام/,isPM:function(a){return"شام"===a},meridiem:function(a,b,c){return a<12?"صبح":"شام"},calendar:{sameDay:"[آج بوقت] LT",nextDay:"[کل بوقت] LT",nextWeek:"dddd [بوقت] LT",lastDay:"[گذشتہ روز بوقت] LT",lastWeek:"[گذشتہ] dddd [بوقت] LT",sameElse:"L"},relativeTime:{future:"%s بعد",past:"%s قبل",s:"چند سیکنڈ",m:"ایک منٹ",mm:"%d منٹ",h:"ایک گھنٹہ",hh:"%d گھنٹے",d:"ایک دن",dd:"%d دن",M:"ایک ماہ",MM:"%d ماہ",y:"ایک سال",yy:"%d سال"},preparse:function(a){return a.replace(/،/g,",")},postformat:function(a){return a.replace(/,/g,"،")},week:{dow:1,doy:4}}),a.defineLocale("uz-latn",{months:"Yanvar_Fevral_Mart_Aprel_May_Iyun_Iyul_Avgust_Sentabr_Oktabr_Noyabr_Dekabr".split("_"),monthsShort:"Yan_Fev_Mar_Apr_May_Iyun_Iyul_Avg_Sen_Okt_Noy_Dek".split("_"),weekdays:"Yakshanba_Dushanba_Seshanba_Chorshanba_Payshanba_Juma_Shanba".split("_"),weekdaysShort:"Yak_Dush_Sesh_Chor_Pay_Jum_Shan".split("_"),weekdaysMin:"Ya_Du_Se_Cho_Pa_Ju_Sha".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"D MMMM YYYY, dddd HH:mm"},calendar:{sameDay:"[Bugun soat] LT [da]",nextDay:"[Ertaga] LT [da]",nextWeek:"dddd [kuni soat] LT [da]",lastDay:"[Kecha soat] LT [da]",lastWeek:"[O'tgan] dddd [kuni soat] LT [da]",sameElse:"L"},relativeTime:{future:"Yaqin %s ichida",past:"Bir necha %s oldin",s:"soniya",m:"bir daqiqa",mm:"%d daqiqa",h:"bir soat",hh:"%d soat",d:"bir kun",dd:"%d kun",M:"bir oy",MM:"%d oy",y:"bir yil",yy:"%d yil"},week:{dow:1,doy:7}}),a.defineLocale("uz",{months:"январ_феврал_март_апрел_май_июн_июл_август_сентябр_октябр_ноябр_декабр".split("_"),monthsShort:"янв_фев_мар_апр_май_июн_июл_авг_сен_окт_ноя_дек".split("_"),weekdays:"Якшанба_Душанба_Сешанба_Чоршанба_Пайшанба_Жума_Шанба".split("_"),weekdaysShort:"Якш_Душ_Сеш_Чор_Пай_Жум_Шан".split("_"),weekdaysMin:"Як_Ду_Се_Чо_Па_Жу_Ша".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"D MMMM YYYY, dddd HH:mm"},calendar:{sameDay:"[Бугун соат] LT [да]",nextDay:"[Эртага] LT [да]",nextWeek:"dddd [куни соат] LT [да]",lastDay:"[Кеча соат] LT [да]",lastWeek:"[Утган] dddd [куни соат] LT [да]",sameElse:"L"},relativeTime:{future:"Якин %s ичида",past:"Бир неча %s олдин",s:"фурсат",m:"бир дакика",mm:"%d дакика",h:"бир соат",hh:"%d соат",d:"бир кун",dd:"%d кун",M:"бир ой",MM:"%d ой",y:"бир йил",yy:"%d йил"},week:{dow:1,doy:7}}),a.defineLocale("vi",{months:"tháng 1_tháng 2_tháng 3_tháng 4_tháng 5_tháng 6_tháng 7_tháng 8_tháng 9_tháng 10_tháng 11_tháng 12".split("_"),monthsShort:"Th01_Th02_Th03_Th04_Th05_Th06_Th07_Th08_Th09_Th10_Th11_Th12".split("_"),monthsParseExact:!0,weekdays:"chủ nhật_thứ hai_thứ ba_thứ tư_thứ năm_thứ sáu_thứ bảy".split("_"),weekdaysShort:"CN_T2_T3_T4_T5_T6_T7".split("_"),weekdaysMin:"CN_T2_T3_T4_T5_T6_T7".split("_"),weekdaysParseExact:!0,meridiemParse:/sa|ch/i,isPM:function(a){return/^ch$/i.test(a)},meridiem:function(a,b,c){return a<12?c?"sa":"SA":c?"ch":"CH"},longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM [năm] YYYY",LLL:"D MMMM [năm] YYYY HH:mm",LLLL:"dddd, D MMMM [năm] YYYY HH:mm",l:"DD/M/YYYY",ll:"D MMM YYYY",lll:"D MMM YYYY HH:mm",llll:"ddd, D MMM YYYY HH:mm"},calendar:{sameDay:"[Hôm nay lúc] LT",nextDay:"[Ngày mai lúc] LT",nextWeek:"dddd [tuần tới lúc] LT",lastDay:"[Hôm qua lúc] LT",lastWeek:"dddd [tuần rồi lúc] LT",sameElse:"L"},relativeTime:{future:"%s tới",past:"%s trước",s:"vài giây",m:"một phút",mm:"%d phút",h:"một giờ",hh:"%d giờ",d:"một ngày",dd:"%d ngày",M:"một tháng",MM:"%d tháng",y:"một năm",yy:"%d năm"},dayOfMonthOrdinalParse:/\d{1,2}/,ordinal:function(a){return a},week:{dow:1,doy:4}}),a.defineLocale("x-pseudo",{months:"J~áñúá~rý_F~ébrú~árý_~Márc~h_Áp~ríl_~Máý_~Júñé~_Júl~ý_Áú~gúst~_Sép~témb~ér_Ó~ctób~ér_Ñ~óvém~bér_~Décé~mbér".split("_"),monthsShort:"J~áñ_~Féb_~Már_~Ápr_~Máý_~Júñ_~Júl_~Áúg_~Sép_~Óct_~Ñóv_~Déc".split("_"),monthsParseExact:!0,weekdays:"S~úñdá~ý_Mó~ñdáý~_Túé~sdáý~_Wéd~ñésd~áý_T~húrs~dáý_~Fríd~áý_S~átúr~dáý".split("_"),weekdaysShort:"S~úñ_~Móñ_~Túé_~Wéd_~Thú_~Frí_~Sát".split("_"),weekdaysMin:"S~ú_Mó~_Tú_~Wé_T~h_Fr~_Sá".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"HH:mm",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd, D MMMM YYYY HH:mm"},calendar:{sameDay:"[T~ódá~ý át] LT",nextDay:"[T~ómó~rró~w át] LT",nextWeek:"dddd [át] LT",lastDay:"[Ý~ést~érdá~ý át] LT",lastWeek:"[L~ást] dddd [át] LT",sameElse:"L"},relativeTime:{future:"í~ñ %s",past:"%s á~gó",s:"á ~féw ~sécó~ñds",m:"á ~míñ~úté",mm:"%d m~íñú~tés",h:"á~ñ hó~úr",hh:"%d h~óúrs",d:"á ~dáý",dd:"%d d~áýs",M:"á ~móñ~th",MM:"%d m~óñt~hs",y:"á ~ýéár",yy:"%d ý~éárs"},dayOfMonthOrdinalParse:/\d{1,2}(th|st|nd|rd)/,ordinal:function(a){var b=a%10,c=1===~~(a%100/10)?"th":1===b?"st":2===b?"nd":3===b?"rd":"th";return a+c},week:{dow:1,doy:4}}),a.defineLocale("yo",{months:"Sẹ́rẹ́_Èrèlè_Ẹrẹ̀nà_Ìgbé_Èbibi_Òkùdu_Agẹmo_Ògún_Owewe_Ọ̀wàrà_Bélú_Ọ̀pẹ̀̀".split("_"),monthsShort:"Sẹ́r_Èrl_Ẹrn_Ìgb_Èbi_Òkù_Agẹ_Ògú_Owe_Ọ̀wà_Bél_Ọ̀pẹ̀̀".split("_"),weekdays:"Àìkú_Ajé_Ìsẹ́gun_Ọjọ́rú_Ọjọ́bọ_Ẹtì_Àbámẹ́ta".split("_"),weekdaysShort:"Àìk_Ajé_Ìsẹ́_Ọjr_Ọjb_Ẹtì_Àbá".split("_"),weekdaysMin:"Àì_Aj_Ìs_Ọr_Ọb_Ẹt_Àb".split("_"),longDateFormat:{LT:"h:mm A",LTS:"h:mm:ss A",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY h:mm A",LLLL:"dddd, D MMMM YYYY h:mm A"},calendar:{sameDay:"[Ònì ni] LT",nextDay:"[Ọ̀la ni] LT",nextWeek:"dddd [Ọsẹ̀ tón'bọ] [ni] LT",lastDay:"[Àna ni] LT",lastWeek:"dddd [Ọsẹ̀ tólọ́] [ni] LT",sameElse:"L"},relativeTime:{future:"ní %s",past:"%s kọjá",s:"ìsẹjú aayá die",m:"ìsẹjú kan",mm:"ìsẹjú %d",h:"wákati kan",hh:"wákati %d",d:"ọjọ́ kan",dd:"ọjọ́ %d",M:"osù kan",MM:"osù %d",y:"ọdún kan",yy:"ọdún %d"},dayOfMonthOrdinalParse:/ọjọ́\s\d{1,2}/,ordinal:"ọjọ́ %d",week:{dow:1,doy:4}}),a.defineLocale("zh-cn",{months:"一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月".split("_"),monthsShort:"1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"),weekdays:"星期日_星期一_星期二_星期三_星期四_星期五_星期六".split("_"),weekdaysShort:"周日_周一_周二_周三_周四_周五_周六".split("_"),weekdaysMin:"日_一_二_三_四_五_六".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"YYYY年MMMD日",LL:"YYYY年MMMD日",LLL:"YYYY年MMMD日Ah点mm分",LLLL:"YYYY年MMMD日ddddAh点mm分",l:"YYYY年MMMD日",ll:"YYYY年MMMD日",lll:"YYYY年MMMD日 HH:mm",llll:"YYYY年MMMD日dddd HH:mm"},meridiemParse:/凌晨|早上|上午|中午|下午|晚上/,meridiemHour:function(a,b){return 12===a&&(a=0),"凌晨"===b||"早上"===b||"上午"===b?a:"下午"===b||"晚上"===b?a+12:a>=11?a:a+12},meridiem:function(a,b,c){var d=100*a+b;return d<600?"凌晨":d<900?"早上":d<1130?"上午":d<1230?"中午":d<1800?"下午":"晚上"},calendar:{sameDay:"[今天]LT",nextDay:"[明天]LT",nextWeek:"[下]ddddLT",lastDay:"[昨天]LT",lastWeek:"[上]ddddLT",sameElse:"L"},dayOfMonthOrdinalParse:/\d{1,2}(日|月|周)/,ordinal:function(a,b){switch(b){case"d":case"D":case"DDD":return a+"日";case"M":return a+"月";case"w":case"W":return a+"周";default:return a}},relativeTime:{future:"%s内",past:"%s前",s:"几秒",m:"1 分钟",mm:"%d 分钟",h:"1 小时",hh:"%d 小时",d:"1 天",dd:"%d 天",M:"1 个月",MM:"%d 个月",y:"1 年",yy:"%d 年"},week:{dow:1,doy:4}}),a.defineLocale("zh-hk",{months:"一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月".split("_"),monthsShort:"1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"),weekdays:"星期日_星期一_星期二_星期三_星期四_星期五_星期六".split("_"),weekdaysShort:"週日_週一_週二_週三_週四_週五_週六".split("_"),weekdaysMin:"日_一_二_三_四_五_六".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"YYYY年MMMD日",LL:"YYYY年MMMD日",LLL:"YYYY年MMMD日 HH:mm",LLLL:"YYYY年MMMD日dddd HH:mm",l:"YYYY年MMMD日",ll:"YYYY年MMMD日",lll:"YYYY年MMMD日 HH:mm",llll:"YYYY年MMMD日dddd HH:mm"},meridiemParse:/凌晨|早上|上午|中午|下午|晚上/,meridiemHour:function(a,b){return 12===a&&(a=0),"凌晨"===b||"早上"===b||"上午"===b?a:"中午"===b?a>=11?a:a+12:"下午"===b||"晚上"===b?a+12:void 0},meridiem:function(a,b,c){var d=100*a+b;return d<600?"凌晨":d<900?"早上":d<1130?"上午":d<1230?"中午":d<1800?"下午":"晚上"},calendar:{sameDay:"[今天]LT",nextDay:"[明天]LT",nextWeek:"[下]ddddLT",lastDay:"[昨天]LT",lastWeek:"[上]ddddLT",sameElse:"L"},dayOfMonthOrdinalParse:/\d{1,2}(日|月|週)/,ordinal:function(a,b){switch(b){case"d":case"D":case"DDD":return a+"日";case"M":return a+"月";case"w":case"W":return a+"週";default:return a}},relativeTime:{future:"%s內",past:"%s前",s:"幾秒",m:"1 分鐘",mm:"%d 分鐘",h:"1 小時",hh:"%d 小時",d:"1 天",dd:"%d 天",M:"1 個月",MM:"%d 個月",y:"1 年",yy:"%d 年"}}),a.defineLocale("zh-tw",{months:"一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月".split("_"),monthsShort:"1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"),weekdays:"星期日_星期一_星期二_星期三_星期四_星期五_星期六".split("_"),weekdaysShort:"週日_週一_週二_週三_週四_週五_週六".split("_"),weekdaysMin:"日_一_二_三_四_五_六".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"YYYY年MMMD日",LL:"YYYY年MMMD日",LLL:"YYYY年MMMD日 HH:mm",LLLL:"YYYY年MMMD日dddd HH:mm",l:"YYYY年MMMD日",ll:"YYYY年MMMD日",lll:"YYYY年MMMD日 HH:mm",llll:"YYYY年MMMD日dddd HH:mm"},meridiemParse:/凌晨|早上|上午|中午|下午|晚上/,meridiemHour:function(a,b){return 12===a&&(a=0),"凌晨"===b||"早上"===b||"上午"===b?a:"中午"===b?a>=11?a:a+12:"下午"===b||"晚上"===b?a+12:void 0},meridiem:function(a,b,c){var d=100*a+b;return d<600?"凌晨":d<900?"早上":d<1130?"上午":d<1230?"中午":d<1800?"下午":"晚上"},calendar:{sameDay:"[今天]LT",nextDay:"[明天]LT",nextWeek:"[下]ddddLT",lastDay:"[昨天]LT",lastWeek:"[上]ddddLT",sameElse:"L"},dayOfMonthOrdinalParse:/\d{1,2}(日|月|週)/,ordinal:function(a,b){switch(b){case"d":case"D":case"DDD":return a+"日";case"M":return a+"月";case"w":case"W":return a+"週";default:return a}},relativeTime:{future:"%s內",past:"%s前",s:"幾秒",m:"1 分鐘",mm:"%d 分鐘",h:"1 小時",hh:"%d 小時",d:"1 天",dd:"%d 天",M:"1 個月",MM:"%d 個月",y:"1 年",yy:"%d 年"}}),a.locale("en"),a});
qx.Class.define("Daddy", {
    
  type: "abstract",

  extend : qx.core.Object,
  
  properties : {
  },
  
  members : {
    
    get: function( attributeName ) {
        var that = this;

        if(this[attributeName] !== undefined) return this[attributeName];
        else throw new Error( 'requested attribute "' + attributeName + '" does not exist' );
    },

    set: function( attributeName, value ){
        var that = this;

        if(this[attributeName] !== undefined) this[attributeName] = value;
        else throw new Error( 'requested attribute "' + attributeName + '" does not exist' );  
    },

    // trigger global event
    say: function( eventName, data ){
        console.log('say: ' + eventName, '(' + this.name + ')', data);
        
        var event = jQuery.Event( eventName );
        if(data) event.customData = data;
        $( document ).trigger( event );
    },

    listen: function( eventName, cb ){
        var that = this;
        console.log('listen: ' + eventName, '(' + that.name + ')');
        
        // attach event listener to document, but with namespace derived from calling object
        $( document ).on( eventName + '.' + that.name, function(e){
            console.log('heard: ' + eventName, '(' + that.name + ')', e.customData);
            cb(e);
        });
    },

    unlisten: function( eventName ){
        var that = this;
        console.log('unlisten: ' + eventName, '(' + that.name + ')');

        // remove only those event listeners with specific namespace
        $( document ).off( eventName + '.' + that.name)
    }

  }
});
define("Daddy", ["qx","jquery","underscore","restive","perfectScrollbarJQuery","mapbox","mc","modernizr","popper","materialize","momentjs"], function(){});

qx.Class.define("APPAFEEFA", {
	extend : Daddy,
	type: "singleton",

	// extend: "Daddy",

	construct: function(){
		var that = this;

		that.setDataManager(new DataManager());
		that.setRouter(new Router());
		that.setLM(new LanguageManager());
		that.setUtility(new Utility());

		that.setConfig(
			{
				apiUrl: window.apiurl,
				includePathForHtmlFiles: '/DDFA/inc/',
				languages: [
					'de',
					'en',
					'ar',
					'fa',
					'fr',
					'ru',
					// 'ps',
					'ku',
					// 'es',
					// 'sq',
					// 'sr',
					'ti'
					// 'tr',
					// 'ur'
				],
				phraseapp: {
					localeId: {
						'ar': 'arabic',
						'de': 'german',
						'en': 'english',
						'es': 'spanish',
						'fa': 'persian',
						'ps': 'pushto',
						'fr': 'french',
						'ku': 'kurdish',
						'ru': 'russian',
						'sq': 'albanian',
						'sr': 'serbian',
						'ti': 'tigrinya',
						'tr': 'turkish',
						'ur': 'urdu',
						'ja': 'japanese',
						'pa': 'punjabi'
					}
				},
				categories: [
					{
						name: 'general',
						id: '0',
						sub: [
							{ name: 'wifi', id: '0-1' },
							{ name: 'jewish', id: '0-2' },
							{ name: 'christian', id: '0-3' },
							{ name: 'islam', id: '0-4' },
							{ name: 'religious-other', id: '0-5' },
							{ name: 'shop', id: '0-6' },
							{ name: 'nature', id: '0-7' },
							{ name: 'authority', id: '0-8' },
							{ name: 'hospital', id: '0-9' },
							{ name: 'police', id: '0-10' },
							{ name: 'public-transport', id: '0-11' }
						]
					},
					{
						name: 'language',
						id: '1',
						sub: [
							{ name: 'german-course', id: '1-1' },
							{ name: 'german-course-state', id: '1-2' },
							{ name: 'meet-and-speak', id: '1-3' },
							{ name: 'learning-place', id: '1-4' },
							{ name: 'interpreter', id: '1-5' },
							{ name: 'foreign-language', id: '1-6' }
						]
					},
					{
						name: 'medic',
						id: '2',
						sub: [
							{ name: 'medical-counselling', id: '2-2' },
							{ name: 'psychological-counselling', id: '2-3' }
						]
					},
					{
						name: 'jobs',
						id: '3',
						sub: [
							{ name: 'job-counselling', id: '3-1' },
							{ name: 'education-counselling', id: '3-2' },
							{ name: 'political-education', id: '3-3' },
							{ name: 'library', id: '3-4' }
						]

					},
					{
						name: 'consultation',
						id: '4',
						sub: [
							{ name: 'asylum-counselling', id: '4-1' },
							{ name: 'legal-advice', id: '4-2' },
							{ name: 'social-counselling', id: '4-3' },
							{ name: 'family-counselling', id: '4-4' },
							{ name: 'volunteer-coordination', id: '4-5' }
						]
					},
					{
						name: 'leisure',
						id: '5',
						sub: [
							{ name: 'sports', id: '5-2' },
							{ name: 'museum', id: '5-3' },
							{ name: 'music', id: '5-4' },
							{ name: 'stage', id: '5-5' },
							{ name: 'craft-art', id: '5-6' },
							{ name: 'workspace', id: '5-7' },
							{ name: 'gardening', id: '5-8' },
							{ name: 'cooking', id: '5-9' },
							{ name: 'festival', id: '5-10' },
							{ name: 'lecture', id: '5-11' },
							{ name: 'film', id: '5-12' },
							{ name: 'congress', id: '5-13' }
						]
					},
					{
						name: 'community',
						id: '6',
						sub: [
							{ name: 'welcome-network', id: '6-1' },
							{ name: 'meeting-place', id: '6-2' },
							{ name: 'youth-club', id: '6-3' },
							{ name: 'childcare', id: '6-4' },
							{ name: 'workshop', id: '6-5' },
							{ name: 'sponsorship', id: '6-6' },
							{ name: 'lgbt', id: '6-7' },
							{ name: 'housing-project', id: '6-8' }
						]
					},
					{
						name: 'donation',
						id: '7',
						sub: [
							{ name: 'food', id: '7-1' },
							{ name: 'clothes', id: '7-2' },
							{ name: 'furniture', id: '7-3' }
						]
					}
				],
				categoriesBasic: ["housing", "christian", "islam", "jewish", 'public', 'wifi', 'shop'],
				simpleProperties: ['descriptionShort', 'description', 'speakerPublic', 'spokenLanguages', 'phone', 'mail', 'web', 'facebook', 'arrival', 'openingHours'],
				imgPath: 'DDFA/img/'
			}
		);

		that.setActiveFilter(null);
	},

	properties : {
		title: {},
		area: {},
		DataManager: {},
		Utility: {},
		Router: {},
		LM: {},
		data: { init: {} },
		curtain: {},
		mapView: {},
		searchView: {},
		eventView: {},
		detailView: {},
		menuView: {},
		legendView: {},
		plusView: {},
		languageView: {},
		formView: {},
		includeView: {},
		messageView: {},
		introView: {},
		userDevice: {},
		config: {},
		activeFilter: {}
	},

	members : {


		init: function( cb ){
			var that = this;

      moment.locale('de');

			// load city config
			that.detectAfeefaArea();

			// analyse user device
			that.detectUserDevice();

			// analyse user language
			that.getLM().init();

			that.setPageTitle('Afeefa.de - Engagement stärken.');

			// load view-independant UI components
			that.loadIndependantUI();

			// fetch only necessary data for app startup
			that.getDataManager().fetchInitialData(function(){
				cb();
      	that.loading(true);

				// fetch other data (e.g. that takes a long time loading)
				that.getDataManager().fetchAllData();
			});

			that.addEvents();
		},

		addEvents: function(){
            var that = this;

            that.listen('languageChanged', function(){
              that.loading(true);
            });

            that.listen('fetchedNewData', function(){
							that.loading(false);
						});
        },

		loading: function( bool ){
            var that = this;

            if (bool) {
                $('body').addClass('loading');
            }
            else {
                $('body').removeClass('loading');
            }
        },

		detectAfeefaArea: function(){
			var that = this;

			var hostname = window.location.hostname;

			if( hostname.indexOf('bautzen') >= 0 ){
				that.setArea('bautzen');
				return;
			}
			else {
				that.setArea('dresden');
			}
		},

		detectUserDevice: function(){
			var that = this;

			// analyse user device
			// $('body').restive({
			//     breakpoints: ['768', '1280'],
			//     classes: ['768-c', '1280-c'],
			//     force_dip: true
			// });

			// if( $('body').hasClass('768-c') ) APP.setUserDevice('phone');
			// else if( $('body').hasClass('1280-c') ) APP.setUserDevice('tablet');
			// else APP.setUserDevice('desktop');

			// $('body').addClass( APP.getUserDevice() );

			$('body').restive({
				  breakpoints: ['10000'],
				  classes: ['nb'],
				  turbo_classes: 'is_mobile=mobi,is_phone=phone,is_tablet=tablet,is_landscape=landscape'
			});

			APP.setUserDevice('desktop');
			if( $('body').hasClass('mobi') || $('body').hasClass('phone') ) APP.setUserDevice('mobile');
			if( $('body').hasClass('tablet') ) APP.setUserDevice('tablet');

			$('body').addClass( APP.getUserDevice() );
		},

		loadIndependantUI: function(){
			var that = this;

			// curtain
			var curtain = $("<div />")
				.attr('id', 'curtain')
				.on('click', function(e) {
					that.say('curtainclicked');
				});
      		$('#main-container').append(curtain);
			that.setCurtain(curtain);

			$('div#footer').on('contextmenu', function(e){
				e.preventDefault();
				// APP.loading(true);
				that.say('languageChanged', APP.getLM().getCurrentLang());
			});
		},

		getMainCategory: function(subCategory){
			var that = this;
			var category;

			category = _.find(that.getConfig().categories, function(cat){
				var found = _.find(cat.sub, function(subCat){
					return subCat.name == subCategory;
				});
				if(found) return true;
			});

			return category;
		},

		setPageTitle: function(title) {
			var that = this;

			$('head title').empty().append(title);

		}
	}

});

define("APPAFEEFA", ["Daddy"], function(){});

qx.Class.define("DataManager", {

    extend: Daddy,
    type: "singleton",

    construct: function () {
        var that = this;

        // that.addEvents();
    },

    members: {

        fetchInitialData: function (cb) {
            var that = this;

            // snychronous data calls (wait for all data calls to finish)
            that.getUITranslations(APP.getLM().getCurrentLang(), function (data) {  // language bib

                APP.getLM().setBib(data);

                var currentData = APP.getData();
                currentData.categories = APP.getConfig().categories;
                APP.setData(currentData);

                console.debug('fetchedInitialData', data);
                cb();  // finished, so callback

                // that.getAllCategories(function (data) {  // categories
                //     // store in APP
                //     var currentData = APP.getData();
                //     currentData.categories = data.categories;
                //     APP.setData(currentData);

                //     console.debug('fetchedInitialData', data);
                //     cb();  // finished, so callback
                // });
            });

        },

        fetchAllData: function (cb) {
            var that = this;

            var currentAppData = APP.getData();

            that.getAllEntries(function (data) {

                // set empty if fetching failed
                if(data === undefined) data = {marketentries: []};

                // store entries in APP
                currentAppData.entries = data.marketentries;

                currentAppData.entries = _.sortBy(currentAppData.entries, 'name');

                APP.setData(currentAppData);
                if(!cb) that.say('fetchedNewData');

                that.fetchExternalData('freifunk', function(){
                    if(!cb) that.say('fetchedNewData');

                    that.fetchExternalData('facebookEvents', function(){
                        that.say('fetchedNewData');
                        that.say('fetchedAllData');
                        if(cb) cb();  // finished, so callback
                    });
                });

            });
        },

        getAllCategories: function (cb) {
            var that = this;

            $.ajax({
                url: APP.getConfig().apiUrl + "api/categories",
                type: 'GET',
                dataType: 'json'
            })
                .done(function (data) {
                    cb(data);
                })
                .fail(function (a) {
                    console.debug(a);
                    cb(a);
                });

        },

        getUITranslations: function (lang, cb) {

            $.ajax({
                url: 'https://api.phraseapp.com/api/v2/projects/15466a179c265396774350db18745f34/locales/' +APP.getConfig().phraseapp.localeId[lang]+ '/download?file_format=json&fallback_locale_id=german&include_empty_translations=true',
                type: 'GET',
                dataType: 'text',
                headers: {
                    'Authorization': 'token a9d97a31787c37d64ce0200e8cfdf2c95c01bddf9960999ea601a487e0a386a4'
                    // 'User-Agent': 'Afeefa.de Frontend (team@afeefa.de)'
                }
            })
                .done(function (data) {
                    cb(JSON.parse(data));
                })
                .fail(function (a) {
                    console.debug(a);
                });

        },

        getAllEntries: function (cb) {
            var that = this;

            $.ajax({
                url: APP.getConfig().apiUrl + "api/marketentries?locale=" + APP.getLM().getCurrentLang(),
                type: 'GET',
                dataType: 'json'
            })
                .done(function (data) {
                    cb(data);
                })
                .fail(function (a) {
                    cb();
                    console.debug(a);
                });

        },

        getEntryByEntryId: function(entryId){
            var that = this;

            var entry = _.find(APP.getData().entries, function(entry){
                return entryId == entry.entryId;
            })

            return entry;
        },

        getOrgaById: function(id){
            var that = this;

            var entry = _.find(APP.getData().entries, function(entry){
                return (entry.entryType == 'orga' && id == entry.id);
            })

            return entry;
        },

        getEventById: function(id){
            var that = this;

            var entry = _.find(APP.getData().entries, function(entry){
                return (entry.entryType == 'event' && id == entry.id);
            })

            return entry;
        },

        getAllEvents: function (options) {

            if(options === undefined) options = {};

            // extract events from all the data
            var events = APP.getData().entries.filter(function (entry) {
                if (entry.type != 2) return false;
                if (!entry.dateFrom) return false;
                return true;
            });

            if(options.timeSpan){
                
                var eventsFiltered = [];

                // only at day X means only that day
                // or if a period event ends on that day
                if( options.timeSpan == 'onlyAtDayX' ){
                    var date = new Date(options.atDate);
                    eventsFiltered = events.filter(function(entry){
                        var isOnlyToday;
                        isOnlyToday = ( !entry.dateTo && moment(date).isSame(entry.dateFrom, 'd') )? true : false;
                        
                        var endsToday;
                        endsToday = ( entry.dateTo && moment(date).isSame(entry.dateTo, 'd') )? true : false;
                        
                        return (isOnlyToday || endsToday);
                    });
                    
                    return _.sortBy(eventsFiltered, 'dateFrom');
                }

                // also today means a period event is already running and goes beyond today
                if( options.timeSpan == 'alsoToday' ){
                    eventsFiltered = events.filter(function(entry){
                        // must be a period
                        if( !(entry.dateFrom && entry.dateTo) ) return false;

                        // dateFrom <= today
                        var isRunning = ( moment(entry.dateFrom).isSameOrBefore(moment(), 'd') )? true : false;
                        
                        // dateTo > today
                        var goesBeyondToday = ( moment(entry.dateTo).isAfter(moment(), 'd') )? true : false;
                        
                        return (isRunning && goesBeyondToday);
                    });
                    
                    return _.sortBy(eventsFiltered, 'dateTo');
                }
                
                // also this week means a period event is already running and goes beyond this week
                if( options.timeSpan == 'alsoThisWeek' ){
                    eventsFiltered = events.filter(function(entry){
                        // must be a period
                        if( !(entry.dateFrom && entry.dateTo) ) return false;

                        // dateFrom <= today
                        var isRunning = ( moment(entry.dateFrom).isSameOrBefore(moment(), 'week') )? true : false;
                        
                        // dateTo > today
                        var goesBeyondToday = ( moment(entry.dateTo).isAfter(moment(), 'week') )? true : false;
                        
                        return (isRunning && goesBeyondToday);
                    });
                    
                    return _.sortBy(eventsFiltered, 'dateTo');
                }
                
                return eventsFiltered;
            }
            
            return _.sortBy(events, 'dateFrom');
        },

        getAllLocations: function (cb) {

            $.ajax({
                url: "api/locations?locale=" + APP.getLM().getCurrentLang(),
                type: 'GET',
                dataType: 'json'
            })
            .done(function (data) {
                cb(data);
            })
            .fail(function (a) {
                console.debug(a);
            });
        },

        fetchExternalData: function (sourceKey, cb) {
            var that = this;

            var sources = {
                freifunk: {
                    sourceUrl: 'externalDataFiles/freifunk-nodes.json',
                    mapping: {
                        name: function(record){
                            return "Wifi Hotspot (Freifunk)";
                        },
                        type: function(record){
                            return 0;
                        },
                        entryId: function(record, i){
                            return 'freifunk-'+i;
                        },
                        category: function(record){
                            return {
                                "name":"general"
                            };
                        },
                        subCategory: function(record){
                            return 'wifi';
                        },
                        certified: function(record){
                            return false;
                        },
                        descriptionShort: function(record){
                            return APP.getLM().resolve("freifunk.descriptionShort");
                        },
                        image: function(record){
                            return "https://freifunk.net/wp-content/uploads/2013/07/spenden.png";
                        },
                        imageType: function(record){
                            return 'image';
                        },
                        web: function(record){
                            return "http://www.freifunk-dresden.de/topology/google-maps.html";
                        },
                        facebook: function(record){
                            return "https://www.facebook.com/FreifunkDresden";
                        },
                        location: function(record){
                            return [{
                                "arrival":"",
                                "city":"Dresden",
                                "lat":record.position.lat,
                                "lon":record.position.long,
                                // "placename":"...",
                                // "street":"...",
                                // "zip":"..."
                            }];
                        }
                    }
                },
                facebookEvents: {
                    sourceUrl: APP.getConfig().apiUrl + 'api/facebook_events?token=zP4uja4yFmnPWZeCVsLU',
                    mapping: {
                        name: function(record){
                            return record.name;
                        },
                        type: function(record){
                            return 2;
                        },
                        entryId: function(record,i){
                            return record.id;
                        },
                        category: function(record){
                            return {
                                "name":"external-event"
                            };
                        },
                        subCategory: function(record){
                            return 'fb-event';
                        },
                        tags: function(record){
                            return 'fbevent';
                        },
                        certified: function(record){
                            return false;
                        },
                        description: function(record){
                            return 'Veranstalter: ' + record.owner + '\n\n' + record.description;
                        },
                        descriptionShort: function(record){
                            return null;
                        },
                        image: function(record){
                            return null;
                        },
                        imageType: function(record){
                            return null;
                        },
                        web: function(record){
                            return record.link_to_event;
                        },
                        facebook: function(record){
                            return record.link_to_owner;
                        },
                        location: function(record){
                            return [{
                                "arrival": null,
                                "city": (record.place && record.place.location)? record.place.location.city : null,
                                "lat": (record.place && record.place.location)? record.place.location.latitude : null,
                                "lon": (record.place && record.place.location)? record.place.location.longitude : null,
                                "placename": (record.place && record.place.name)? record.place.name : null,
                                "street": (record.place && record.place.location)? record.place.location.street : null,
                                "zip": (record.place && record.place.location)? record.place.location.zip : null
                            }];
                        },
                        dateFrom: function(record){
                            return record.start_time.substr( 0, record.start_time.indexOf('T') );
                        },
                        timeFrom: function(record){
                            function n(n){
                                return n > 9 ? "" + n: "0" + n;
                            }

                            date = new Date(record.start_time);
                            return n(date.getHours()) + ':' + n(date.getMinutes());
                        },
                        dateTo: function(record){
                            return record.end_time.substr( 0, record.end_time.indexOf('T') );
                        },
                        timeTo: function(record){
                            function n(n){
                                return n > 9 ? "" + n: "0" + n;
                            }

                            date = new Date(record.start_time);
                            return n(date.getHours()) + ':' + n(date.getMinutes());
                        },
                        additionalData: function(record){
                            return {
                                owner: record.owner
                            };
                        }
                    }
                }
            };

            $.ajax({
                url: sources[sourceKey].sourceUrl,
                type: 'GET',
                dataType: 'json'
            })
            .done(function (dataFromServer) {

                var data;
                if( sourceKey == 'freifunk' ) {

                    // filter
                    data = _.filter(dataFromServer.nodes, function (record) {
                        // filter out dead access points
                        if (!record.status.online) return false;
                        return true;
                    });
                }
                else if( sourceKey == 'facebookEvents' ){
                    data = dataFromServer;
                }

                that.integrateExternalData(data, sources[sourceKey].mapping);
                cb();
            })
            .fail(function (a) {
                cb();
                // console.debug(a);
            });
        },

        // transform data into needed structure and integrate with other app data
        integrateExternalData: function(data, mapping){
            var that = this;

            var currentAppData = APP.getData();

            var rows = [];
            _.each(data, function(record, i){
                var newEntry = {
                    external:true,
                    name: mapping.name? mapping.name(record) : 'mapping missing',
                    entryId: mapping.entryId? mapping.entryId(record, i) : 0,
                    type: mapping.type? mapping.type(record) : 0,
                    category: mapping.category? mapping.category(record) : {
                        "name":"general",
                    },
                    subCategory: mapping.subCategory? mapping.subCategory(record) : null,
                    tags: mapping.tags? mapping.tags(record) : null,
                    certified: mapping.certified? mapping.certified(record) : false,
                    description: mapping.description? mapping.description(record) : null,
                    descriptionShort: mapping.descriptionShort? mapping.descriptionShort(record) : null,
                    image: mapping.image? mapping.image(record) : null,
                    imageType: mapping.imageType? mapping.imageType(record) : null,
                    web: mapping.web? mapping.web(record) : null,
                    facebook: mapping.facebook? mapping.facebook(record) : null,
                    location: mapping.location? mapping.location(record) : null,
                    dateFrom: mapping.dateFrom? mapping.dateFrom(record) : null,
                    dateTo: mapping.dateTo? mapping.dateTo(record) : null,
                    timeFrom: mapping.timeFrom? mapping.timeFrom(record) : null,
                    timeTo: mapping.timeTo? mapping.timeTo(record) : null,
                    additionalData: mapping.additionalData? mapping.additionalData(record) : null
                };

                if(newEntry.dateFrom == newEntry.dateTo) newEntry.dateTo = null;
                if(newEntry.timeFrom == newEntry.timeTo) newEntry.timeTo = null;

                rows.push(newEntry);
            });

            // store data in APP
            var newData = _.union(currentAppData.entries, rows)
            currentAppData.entries = newData;

            APP.setData(currentAppData);
        },

        // getWifiNodes: function (cb) {
        //     var that = this;

        //     $.ajax({
        //         url: "externalDataFiles/freifunk-nodes.json",
        //         // url: "http://api.freifunk-dresden.de/afeefa.json",
        //         type: 'GET',
        //         dataType: 'json'
        //     })
        //     .done(function (data) {
        //         var wifiNodes = _.filter(data.nodes, function (node) {

        //             // filter out dead access points
        //             if (!node.status.online) return false;

        //             return true;
        //         });

        //         that.integrateExternalData(
        //             wifiNodes,
        //             {
        //                 name:"Wifi Hotspot (Freifunk)"
        //                 // lat: {value:"position.lat", type:"var"}
        //             }
        //         );
        //         // cb(wifiNodes);
        //         cb();
        //     })
        //     .fail(function (a) {
        //         console.debug(a);
        //     });
        // },

        addMarketEntry: function (data, cb) {
            var that = this;

            // console.debug('POST ' + APP.getConfig().apiUrl + 'api/marketentries', data);

            $.ajax({
                url: APP.getConfig().apiUrl + "api/marketentries",
                type: 'POST',
                data: data,
                cache: false,
                dataType: 'json',
                processData: true,
                contentType: false
            })
                .done(function (data) {
                    cb(data);
                })
                .fail(function (a) {
                    cb(a);
                });

        },

        addLocation: function (data, cb) {
            var that = this;

            // console.debug('POST ' + APP.getConfig().apiUrl + 'api/locations', data);

            $.ajax({
                url: APP.getConfig().apiUrl + "api/locations",
                type: 'POST',
                data: data,
                cache: false,
                dataType: 'json',
                processData: true,
                contentType: false
            })
                .done(function (data) {
                    cb(data);
                })
                .fail(function (a) {
                    cb(a);
                });

        },

        ///////////////////////
        // Outgoing messages //
        ///////////////////////

        createSlackMessage: function (data, cb) {

            var slackMessage = '*' + data.heading + '*' + ':\n' + data.message;

            $.ajax({
                url: "https://hooks.slack.com/services/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",
                type: 'POST',
                data: JSON.stringify({text: slackMessage}),
                cache: false,
                dataType: 'text',
                processData: false
                // contentType: false
            })
                .done(function (data) {
                    // cb(data);
                })
                .fail(function (a) {
                    // cb(a);
                });

        },

        createGithubIssue: function (data, cb) {
            data.action = 'github';

            $.ajax({
                // url: "_Resources/Static/Packages/DDFA.dresdenfueralleDe/githubAPI/",
                // url: "http://afeefa.hejn.de/githubAPI/",
                url: APP.getConfig().apiUrl + "messageAPI/",
                // crossDomain: true,
                type: 'POST',
                data: data,
                cache: false,
                dataType: 'text',
                processData: true
                // contentType: false
            })
                .done(function (data) {
                    // cb(data);
                })
                .fail(function (a) {
                    // cb(a);
                });

        },

        sendMail: function (data, cb) {
            data.action = 'mail';

            $.ajax({
                url: APP.getConfig().apiUrl + "messageAPI/",
                // crossDomain: true,
                type: 'POST',
                data: data,
                cache: false,
                dataType: 'text',
                processData: true
                // contentType: false
            })
                .done(function (data) {
                    // cb(data);
                })
                .fail(function (a) {
                    // cb(a);
                });
        },

        ///////////////////////
        // import data lists //
        ///////////////////////
        importEntriesFromCsv: function (importKey) {
            var that = this;

            var config = {
                'bautzen': {
                    languages: ['de'],
                    pathToCsv: 'importData/bautzen/',
                    area: 'dresden'
                },
                'bamf': {
                    languages: ['de'],
                    pathToCsv: 'importData/integrationskurse/',
                    area: 'dresden',
                    mapping: {
                        "name": function(row){
                            return "Integrationskurs" + " (" + row.traeger + ")";
                        },
                        "description": function(row){
                            return "Träger: " + row.traeger + "\n\n" + "Spezialisierung: " + row.zulassungen + "\n\n" + "NIVEAU #A1 #A2 #B1\nKOSTEN #förderung\nKURSART #integrationskurs\nABSCHLUSS #zertifikat_integrationskurs #zertifikat_ger";
                        }
                    }
                },
                'leipzig': {
                    languages: ['de', 'en', 'ar', 'fa', 'fr', 'ru', 'sq', 'ku', 'tr', 'es'],
                    pathToCsv: 'importData/leipzig/',
                    area: 'dresden'
                },
                'iwgr': {
                    languages: ['de'],
                    pathToCsv: 'importData/iwgr/',
                    mapping: {
                        area: function(row){
                            return 'dresden';
                        },
                        category: function(row){
                            return "e11bdacd-07e9-11e7-80e3-60b7772f8716";
                        },
                        subCategory: function(row){
                            return 'iwgr';
                        },
                        dateFrom: function(row){
                            return row.dateFrom ? dateConverter(row.dateFrom, '2017') : null;
                        },
                        dateTo: function(row){
                            return row.dateTo ? dateConverter(row.dateTo, '2017') : null;
                        }
                    }
                },
            };

            function dateConverter(dateString, fixedYear){
                return fixedYear + '-' + (new Date(dateString).getMonth() +1) + '-' + new Date(dateString).getDate();
            };

            // SETUP ---
            var languages = config[importKey].languages;

            var baseLang = 'de';
            var otherLanguages = _.without(languages, baseLang);
            var inis = {};

            _.each(languages, function (lang, i) {
                readCsv(lang, function () {
                    instantiateEverything();
                });
            });

            function readCsv(lang, cb) {

                // var ssv = d3.dsvFormat(";", "text/plain");
                // var ssv = d3.dsvFormat(";");
                d3.csv(config[importKey].pathToCsv + "entries_" + lang + ".csv", function (rows) {
                    inis[lang] = rows;
                    if (_.size(inis) == languages.length) cb();
                });

                console.debug(lang, inis);
            };

            function instantiateEverything() {

                _.each(inis[baseLang], function (row, i) {

                    // create entry in base language
                    var marketEntry = {};
                    marketEntry.locale = baseLang;

                    var entryAttributes = [
                        'area',
                        'name',
                        "category",
                        "subCategory",
                        "type",
                        "description",
                        "descriptionShort",
                        "forChildren",
                        "facebook",
                        "image",
                        "imageType",
                        "mail",
                        "phone",
                        "speakerPrivate",
                        "speakerPublic",
                        "spokenLanguages",
                        "supportWanted",
                        "web",
                        "published",
                        "dateFrom",
                        "dateTo",
                        "timeFrom",
                        "timeTo",
                        "tags"
                    ];

                    _.each(entryAttributes, function(attr){
                        // take custom mapping function if available
                        if(config[importKey].mapping[attr]){
                            marketEntry[attr] = config[importKey].mapping[attr](row);
                        }

                        // take value directly from import source
                        else {
                            marketEntry[attr] = (row[attr] && row[attr] != '') ? row[attr] : null;
                        }
                    });

                    createMarketEntryAndLocation(
                        {
                            "marketentry": marketEntry
                        },
                        {
                            "location": {
                                "placename": row.placename ? row.placename : null,
                                "street": row.street ? row.street : null,
                                "zip": "0" + row.zip,
                                "city": row.city ? row.city : null,
                                "district": row.district ? row.district : null,
                                "openingHours": row.openinghours ? row.openinghours : null,
                                "arrival": row.arrival ? row.arrival : null,
                                "lat": row.lat ? row.lat : null,
                                "lon": row.lon ? row.lon : null
                            }
                        }, i, function (marketentry, iniIndex) {

                            // var parentIni = response.initiative;

                            // create initiative translations (use entryId)
                            _.each(otherLanguages, function (lang) {

                                var row = inis[lang][iniIndex];

                                createMarketEntryAndLocation(
                                    {
                                        "marketentry": {
                                            "entryId": marketentry.entryId,
                                            "locale": lang,
                                            "type": marketentry.type,
                                            "name": row.name ? row.name : null,
                                            "description": row.description ? row.description : null
                                        }
                                    }
                                );
                            });
                        }
                    );
                });
            };

            function createMarketEntryAndLocation(dataMarketEntry, dataLocation, index, cb) {

                var data_joined = _.extend(dataMarketEntry, dataLocation);

                that.addMarketEntry(data_joined, function (response) {
                    if (!response.marketentry) {
                        console.warn('failed to create market entry', response);
                        // alert(that.getWording('form_fail'));
                        // return;
                    }
                    console.log('successfully created market entry', response);
                    if (cb) cb(response.marketentry, index);
                    // alert(that.getWording('form_success'));
                });
            };

        },

        ///////////////////////
        // import data lists //
        ///////////////////////
        importInis: function () {
            var that = this;

            // languages = APP.getConfig().languages;
            var languages = ['de', 'en', 'ar', 'fa', 'fr', 'sr', 'ru', 'ti', 'ur', 'it'];
            var baseLang = 'de';
            var otherLanguages = _.without(languages, baseLang);
            var pathToCsv = '_Resources/Static/Packages/DDFA.dresdenfueralleDe/DDFA/dummyData/'

            // _.each(languages, function(lang){

            // var csv = d3.csv.parse( pathToCsv + "inis_" + lang + ".csv" );

            var inis = {};

            _.each(languages, function (lang, i) {
                readCsv(lang, function () {
                    instantiateEverything();
                });
            });

            function readCsv(lang, cb) {

                d3.csv(pathToCsv + "inis_" + lang + ".csv", function (rows) {
                    inis[lang] = rows;
                    if (_.size(inis) == languages.length) cb();
                });

            }

            function instantiateEverything() {

                // d3.csv( pathToCsv + "inis_" + lang + ".csv", function(rows){

                _.each(inis[baseLang], function (row, i) {

                    // create initiative in base language
                    createInitiative({

                        "initiative": {

                            "category": null,
                            "description": row.description ? row.description : null,
                            "facebook": row.facebook ? row.facebook : null,
                            "image": null,
                            "imageType": null,
                            "locale": baseLang,
                            "mail": row.mail ? row.mail : null,
                            "name": row.name ? row.name : null,
                            "phone": row.phone ? row.phone : null,
                            "rating": 3,
                            "speakerPrivate": row.speakerPrivate ? row.speakerPrivate : null,
                            "speakerPublic": row.speakerPublic ? row.speakerPublic : null,
                            "spokenLanguages": row.spokenLanguages ? row.spokenLanguages : null,
                            "supportWanted": false,
                            "web": row.web ? row.web : null

                        }

                    }, i, function (response, iniIndex) {

                        var parentIni = response.initiative;

                        // create initiative translations (use entryId)
                        _.each(otherLanguages, function (lang) {

                            // _.each(inis[lang], function(row, i){

                            var row = inis[lang][iniIndex];

                            createInitiative({

                                "initiative": {

                                    "category": null,
                                    "description": row.description ? row.description : null,
                                    "entryId": parentIni.entryId,
                                    "locale": lang,
                                    "name": row.name ? row.name : null,
                                    "speakerPublic": null,
                                    "spokenLanguages": row.spokenLanguages ? row.spokenLanguages : null

                                }

                            });

                            // });

                        });

                        // create its location in base language (use identifier)
                        createLocation({

                            "location": {
                                "category": null,
                                "city": row.city ? row.city : null,
                                "description": null,
                                "district": null,
                                "event": null,
                                "facebook": null,
                                "image": null,
                                "imageType": null,
                                "initiative": parentIni.identifier,
                                "lat": row.lat ? row.lat : null,
                                "locale": baseLang,
                                "lon": row.lon ? row.lon : null,
                                "mail": null,
                                "marketEntry": null,
                                "name": row.name ? row.name : null,
                                "openingHours": row.openingHours ? row.openingHours : null,
                                "phone": null,
                                "rating": 3,
                                "scope": false,
                                "speakerPrivate": null,
                                "speakerPublic": null,
                                "spokenLanguages": null,
                                "street": row.street ? row.street : null,
                                "supportWanted": null,
                                "type": 0,
                                "web": null,
                                "zip": row.zip ? row.zip : null
                            }


                        }, iniIndex, function (response, iniIndex) {

                            var baseLocation = response.location;

                            // create location translations (use entryId)
                            _.each(otherLanguages, function (lang) {

                                // _.each(inis[lang], function(row, i){

                                var row = inis[lang][iniIndex];

                                createLocation({

                                    "location": {
                                        "category": null,
                                        "description": null,
                                        "entryId": baseLocation.entryId,
                                        "event": null,
                                        // "initiative": null,
                                        "locale": lang,
                                        "marketEntry": null,
                                        "name": row.name ? row.name : null,
                                        "openingHours": row.openingHours ? row.openingHours : null,
                                        "speakerPublic": null,
                                        "spokenLanguages": null,
                                        "type": 0
                                    }

                                });

                                // });

                            });

                        });

                    });

                });
            }

            // });

            // });

            function createInitiative(data, i, cb) {
                $.ajax({
                    url: APP.getConfig().apiUrl + "api/initiatives",
                    type: 'POST',
                    data: data,
                    cache: false,
                    dataType: 'json',
                    processData: true,
                    contentType: false
                })
                    .done(function (data) {
                        if (cb) cb(data, i);
                    })
                    .fail(function (a) {
                        console.debug(a);
                    });
            };

            function createLocation(data, i, cb) {
                $.ajax({
                    url: APP.getConfig().apiUrl + "api/locations",
                    type: 'POST',
                    data: data,
                    cache: false,
                    dataType: 'json',
                    processData: true,
                    contentType: false
                })
                    .done(function (data) {
                        if (cb) cb(data, i);
                    })
                    .fail(function (a) {
                        console.debug(a);
                    });
            }
        }

    }

});

define("DataManager", ["APPAFEEFA"], function(){});

qx.Class.define("Router", {
	
	extend : Daddy	,
	type: "singleton",
	
	properties : {
		// urlParams: {},
		// renderedViews: {}	
	},

	construct: function(){
		var that = this;

		// that.registerHashChange();
		that.detectUrl();
	},

	members : {

		registerHashChange: function(){
			var that = this;

			window.onhashchange = function(){
				that.detectUrl();
			};
		},

		initialNavigate: function(){
			var that = this;

			that.addEvents();

			var userDevice = APP.getUserDevice();

			if( userDevice === 'mobile' ) {
				APP.setDetailView( new DetailViewMobile() );
			}
			else {
				APP.setDetailView( new DetailView() );
			}
			
			APP.setLanguageView( new LanguageView() );
			APP.setMapView( new MapView() );
			APP.setSearchView( new SearchView() );
			APP.setEventView( new EventView() );
			APP.setMenuView( new MenuView() );
			APP.setLegendView( new LegendView() );
			APP.setPlusView( new PlusView() );
			APP.setFormView( new FormView() );
			APP.setIncludeView( new IncludeView() );
			APP.setMessageView( new MessageView() );
			APP.setIntroView( new IntroView() );
			
			// render the views
			APP.getMapView().render();
			APP.getSearchView().render();
			APP.getEventView().render();
			APP.getDetailView().render();
			APP.getPlusView().render();
			APP.getLanguageView().render();
			APP.getMenuView().render();
			APP.getLegendView().render();
			APP.getFormView().render();
			APP.getIncludeView().render();
			APP.getMessageView().render();
			APP.getIntroView().render();
		},

		navigate: function( path ){
			var that = this;

			// currentPath is now urlParams
			if(!path) var path = that.currentPath;
			else that.currentPath = path;
			
			console.log('navigate to: ' + path);

			if(that.currentPath.length > 0){
				APP.getMapView().selectMarkerById( that.currentPath );
			}
			
			

			// console.log('navigate to: ' + path);

	  //   	var firstLevel = path[0];
			
	  //   	// define which (and where) views should exist on a certain route
	  //   	var routes = {
			//     undefined: [
			// 		{ view: new StartView(), layoutArea: DL.settings.layoutAreas.mainColumn },
			// 		{ view: new RunnersSmallView(), layoutArea: DL.settings.layoutAreas.rightColumn }
			// 	],
			//     'info': [
			// 		{ view: new InfoView(), layoutArea: DL.settings.layoutAreas.mainColumn },
			// 		{ view: new RunnersSmallView(), layoutArea: DL.settings.layoutAreas.rightColumn }
			// 	],
			//     'laeufer': [
			// 		{ view: new RunnersView(), layoutArea: DL.settings.layoutAreas.mainColumn },
			// 		{ view: new RunnersSmallView(), layoutArea: DL.settings.layoutAreas.rightColumn }
			// 	],
			//     'anmeldung': [
			// 		{ view: new RegistrationView(), layoutArea: DL.settings.layoutAreas.mainColumn },
			// 		{ view: new RunnersSmallView(), layoutArea: DL.settings.layoutAreas.rightColumn }
			// 	],
			//     'impressum': [
			// 		{ view: new ImprintView(), layoutArea: DL.settings.layoutAreas.mainColumn },
			// 		{ view: new RunnersSmallView(), layoutArea: DL.settings.layoutAreas.rightColumn }
			// 	],
			//     'kontakt': [
			// 		{ view: new ContactView(), layoutArea: DL.settings.layoutAreas.mainColumn },
			// 		{ view: new RunnersSmallView(), layoutArea: DL.settings.layoutAreas.rightColumn }
			// 	]
			// };

			// // render desired views
			// var wishlist = routes[firstLevel]? routes[firstLevel] : routes[undefined];

		 //    wishlist.each(function( wish ){

			// 	// render views only if not already rendered
			// 	var newLayoutViewObject = { layoutArea: wish.layoutArea, view: wish.view };
			// 	var rendered = _.find( that.renderedViews, function( layoutViewObject ){
			// 		return ( layoutViewObject.layoutArea == newLayoutViewObject.layoutArea && layoutViewObject.view.get('name') == newLayoutViewObject.view.get('name') );
			// 	});

			// 	if(!rendered){
			// 		// remove all memorized views for the certain layoutArea
			// 		that.renderedViews = _.reject(that.renderedViews, function( layoutViewObject ){
			// 			if( layoutViewObject.layoutArea == newLayoutViewObject.layoutArea ){
			// 				if(layoutViewObject.view.die) layoutViewObject.view.die();
			// 				return true;
			// 			} else {
			// 				return false;
			// 			}
			// 			// return layoutViewObject.layoutArea == newLayoutViewObject.layoutArea;
			// 		});
			// 		newLayoutViewObject.view.render(newLayoutViewObject.layoutArea);
			// 		that.renderedViews.push( newLayoutViewObject );
			// 	}
			// });

		 //    // set new hash if navigate() was invoked manually and not because of a hash change
		 //    var newHash = '#' + path.join('#')
	  //   	if( window.location.hash != newHash) window.location.hash = newHash;

		 //    that.updateNavigation();
		},

		updateNavigation: function(){
			var that = this;

			var firstLevel = that.currentPath[0];
			
			d3.selectAll('nav a').each(function(){
				var aSel = d3.select(this);
				if(aSel.attr('href') == '#'+firstLevel)
					aSel.classed('active', true);
				else
					aSel.classed('active', false);
			});
		},

		addEvents: function(){
			var that = this;

			that.listen('fetchedAllData', function(){
				
				if(that.urlParams && that.urlParams.length > 0){
					that.loadFromUrl();
				}
				else {
					// if(APP.getUserDevice() == 'mobile') {
					// 	APP.getIncludeView().load( APP.getIncludeView().getIncludes().intro );
					// }
					// else {
						// start intro?
						if( !localStorage.getItem("introIsKnown") ){
							if( !sessionStorage.getItem("languageFrozen") ){
								APP.getLanguageView().open(function(){
									APP.getIntroView().start();
								});
							}
							else {
								APP.getIntroView().start();
							}
						}
						// open search view
						else {
							if( !sessionStorage.getItem("languageFrozen") ){
								// APP.getSearchView().hide();
								APP.getLanguageView().open(function(){
									APP.getSearchView().show();
								});
							}
							else {
								// APP.getSearchView().load();
							}
						}
					// }
				}
			});

			that.listen('detailViewClosed', function(){
				that.resetUrl();
			});

			that.listen('eventViewOpened', function(){
				that.setUrl('events');
			});

			that.listen('dashboardLoaded', function(){
				that.resetUrl();
			});

			that.listen('filterSet', function(e){
				var filterObj = e.customData;
				
				if(filterObj === undefined) return;

				if(filterObj.category) that.setUrl('cat', filterObj.category);
				else if (filterObj.subCategory) that.setUrl('subcat', filterObj.subCategory);
			});
		},

		// detectUrl: function(){
		// 	var that = this;

		// 	that.urlParams = [];

		// 	var params = window.location.hash.split('#');
		// 	params = _.without(params, '');

		// 	_.each(params, function( param ){
		// 		param = param.split('=');
		// 		var paramObj = {
		// 			key: param[0],
		// 			value: (param.length > 1)? param[1] : null
		// 		}
		// 		that.urlParams.push(paramObj);
		// 	});

		// 	console.debug(that.urlParams);

		// 	// that.navigate();
		// },

		detectUrl: function(){
			var that = this;

			that.urlParams = window.location.pathname.split('/');
			that.urlParams = _.without(that.urlParams, '');
			console.debug(that.urlParams);
		},

		// setUrl: function(key, value){
		// 	var that = this;

		// 	if(value){
		// 		window.location.hash = key + '=' + value;
		// 	} else {
		// 		window.location.hash = key;
		// 	}
		// },

		setUrl: function(key, value, name){
			var that = this;

			if(name === undefined) {
				name = document.title;
			} else {
				name += ' | Afeefa.de';
			}


			if(value){
				history.pushState(null, name, '/' + key + '/' + value);
			} else {
				history.pushState(null, name, '/' + key);
			}
		},

		// resetUrl: function(){
		// 	window.location.hash = '';
		// },

		resetUrl: function(){
			history.pushState(null,null, '/');
		},

		loadFromUrl: function(){
			var that = this;

			_.each(that.urlParams, function(param, i){
				// switch(param.key) {
				switch(param) {
			    case 'project':
			    	var orga = APP.getDataManager().getOrgaById(that.urlParams[i+1]);
			    	if(orga) APP.getMapView().loadEntry(orga, {setView: true});
			    	break;
			    case 'event':
			    	var event = APP.getDataManager().getEventById(that.urlParams[i+1]);
			    	if(event) APP.getMapView().loadEntry(event, {setView: true});
			    	break;
			    case 'area':
						APP.getMapView().setViewToArea(param.value);
		        break;
					case 'cat':
	          APP.getLegendView().setFilter( {category: param.value} );
						break;
					case 'subcat':
	          APP.getLegendView().setFilter( {subCategory: param.value} );
						break;
					case 'tag':
	          APP.getLegendView().setFilter( {tags: that.urlParams[i+1]} );
						break;
					case 'search':
						APP.getSearchView().inputField.val( that.urlParams[i+1] ).trigger( "input" );
						break;
					// short Urls like afeefa.de/#events
					case 'add':
            APP.getFormView().load( 'newEntry' );
						break;
					case 'feedback':
            APP.getFormView().load( 'feedback' );
						break;
					case 'events':
            APP.getEventView().load();
						break;
					case 'iwgr':
	          APP.getLegendView().setFilter( {tags: 'iwgr'} );
						break;
					default:
			    	// APP.getMapView().loadEntryById(param.key, {setView: true});
				}
			});
		}
	}
});
define("Router", ["APPAFEEFA"], function(){});

qx.Class.define("LanguageManager", {
    extend : Daddy,
    type: "singleton",

    construct: function(){
        var that = this;

    },

    properties : {
        bib: {},
        currentLang: {}
    },

    members : {


        init: function( cb ){
            var that = this;

            var browserLang = navigator.language.split('-')[0];
            if( _.contains( APP.getConfig().languages, browserLang) )
                that.setLanguage( browserLang );
            else
                that.setLanguage( APP.getConfig().languages[0] );

            that.addEvents();
        },

        // param (key)
        // @key phraseapp key
        resolve: function( key ){
            var that = this;

            var wording = that.getBib()[ key ];
            if( wording === undefined ) return key + ' not translated';
            return wording.message;
        },

        setLanguage: function( locale ){
            var that = this;

            that.setCurrentLang( locale );
            moment.locale(locale);

            _.each(APP.getConfig().languages, function(lang){
                $('body').removeClass(lang);
            });

            $('body')
                .addClass(locale)
                .attr('lang', locale);

            $('body').removeClass('rtl');
            if( _.contains( ['ar', 'fa', 'ur'], locale) )
                $('body').addClass('rtl');

        },

        addEvents: function(){
            var that = this;

            that.listen('languageChanged', function(e){

                that.setLanguage( e.customData );

                APP.getDataManager().fetchAllData(function( data ){
                  that.say('fetchedNewData');
                });
            });
        }
    }
});

define("LanguageManager", ["APPAFEEFA"], function(){});

qx.Class.define("Utility", {
	
	extend : Daddy,
	type: "singleton",  

	construct: function(){
		var that = this;

		// that.addEvents();
	},

	members : {

		buildTimeString: function( record, options ){
			
			if(options === undefined) options = {};

			var times = '';

			var TO, FROM = null;
			if(record.dateFrom){
				if(record.timeFrom)	FROM = moment( moment(record.dateFrom).format('YYYY-MM-DD') + ' ' + record.timeFrom);
				else FROM = moment( moment(record.dateFrom).format('YYYY-MM-DD'));
			}

			if(record.dateTo){
				if(record.timeTo)	TO = moment( moment(record.dateTo).format('YYYY-MM-DD') + ' ' + record.timeTo);
				else TO = moment( moment(record.dateTo).format('YYYY-MM-DD'));
			}

			var vocabDateFrom = APP.getLM().resolve('prop.dateFrom');
			var vocabDateTo = APP.getLM().resolve('prop.dateTo');
			var vocabTimeFrom = APP.getLM().resolve('prop.timeFrom');
			var vocabTimeTo = APP.getLM().resolve('prop.timeTo');
			var vocabTimeAt = APP.getLM().resolve('prop.timeAt');
			var vocabUntil = APP.getLM().resolve('prop.until');

			if(FROM && TO){
				// same day
				if( FROM.isSame(TO, 'day') ){
					// mit startzeit + endzeit
					if(record.has_time_start && record.has_time_end) {
						times = FROM.format('DD.MM.YYYY') + ' ' + vocabTimeFrom + ' ' + FROM.format('LT') + ' ' + vocabTimeTo + ' ' + TO.format('LT');
					}
					// nur startzeit
					else if(record.has_time_start) {
						times = FROM.format('DD.MM.YYYY') + ' ' + vocabTimeAt + ' ' + FROM.format('LT');
					}
					// nur endzeit
					else if(record.has_time_end) {
						times = FROM.format('DD.MM.YYYY') + ' ' + vocabTimeTo + ' ' + TO.format('LT');
					}
					// keine zeitangaben
					else {
						times = FROM.format('DD.MM.YYYY');
					}
				}
				// different day
				else {
					// mit startzeit + endzeit
					if(record.has_time_start && record.has_time_end) {
						times = FROM.format('DD.MM.YYYY') + ' ' + vocabTimeAt + ' ' + FROM.format('LT') + ' ' + vocabTimeTo + ' ' + TO.format('DD.MM.YYYY') + ' ' + vocabTimeAt + ' ' + TO.format('LT');
					}
					// nur startzeit
					else if(record.has_time_start) {
						times = FROM.format('DD.MM.YYYY') + ' ' + vocabTimeAt + ' ' + FROM.format('LT') + ' ' + vocabTimeTo + ' ' + TO.format('DD.MM.YYYY');
					}
					// nur endzeit
					else if(record.has_time_end) {
						times = FROM.format('DD.MM.YYYY') + ' ' + vocabTimeTo + ' ' + TO.format('DD.MM.YYYY') + ' ' + vocabTimeAt + ' ' + TO.format('LT');
					}
					// keine zeitangaben
					else {
						times = FROM.format('DD.MM.YYYY') + ' ' + vocabTimeTo + ' ' + TO.format('DD.MM.YYYY');
					}
				}
			}
			else if(FROM){
				// mit startzeit
				if(record.has_time_start) {
					times = FROM.format('DD.MM.YYYY') + ' ' + vocabTimeAt + ' ' + FROM.format('LT');
				}
				// keine zeitangaben
				else {
					times = FROM.format('DD.MM.YYYY');
				}
			}

			return times;
		}

	}
});
define("Utility", ["APPAFEEFA"], function(){});

qx.Class.define("View", {
    
    extend : Daddy,
	type: "abstract",

    properties: {
        viewId: {},
        viewState: { init: 0 },
        loadable: { init : false }
    },

    construct: function(){
    	var that = this;
    },

    members : {
        
        render: function(){
            var that = this;

            that.view.addClass('view-container');

            if( that.getLoadable() ) {
                var loadingCurtain = $("<div />").addClass('loading-curtain');
                that.view.append(loadingCurtain);
            }

            that.addEvents();
            that.say(that.classname + 'Rendered');
            that.isRendered(true);
        },

        // set and read the active status of a view
        isActive: function(bool){
            var that = this;

            if(bool === undefined) return that.active;
                that.active = bool;
        },

        isRendered: function(bool){
            var that = this;

            if(bool === undefined) return that.rendered;
                that.rendered = bool;
        },

        // param (key, [locale])
        // @key bib key
        // @locale get wording in a specific language ignoring the current app language
        getWording: function( key, locale ){
            var that = this;

            return APP.getLM().resolve(key, locale);
        },

        loading: function( bool ){
            var that = this;

            if (bool) {
                that.view.addClass('loading');
            }
            else {
                that.view.removeClass('loading');
            }
                
        },

        showCurtain: function(bool){
            var that = this;

            if(bool){
                that.view.css('z-index', 10000);
                APP.getCurtain().addClass('active');
            }
            else {
                that.view.css('z-index', "");
                APP.getCurtain().removeClass('active');
            }
        },

        addEvents: function(){
            var that = this;

            that.listen('languageChanged', function(){
                that.changeLanguage();
            });

            ////////////////////////////
            // AFTER VIEW IS RENDERED //
            ////////////////////////////
            // that.listen(that.classname + 'Rendered', function(){
            // });
        },

        changeLanguage: function(){
            
        },

        show: function(){
          var that = this;

          that.view.removeClass('hidden');
        },

        hide: function(){
          var that = this;

          that.view.addClass('hidden');
        },

        fillMustaches: function(html, values){
            var that = this;

            // _.each(values, function(value,key){
            //     html = html.replace('{{'+key+'}}', value);
            // });

            html = html.replace(/\{\{(.+?)\}\}/g, function(outer, inner){
                // console.debug(inner);
                
                // look inside given values
                if( values && values[inner] ) {
                    return values[inner];
                }
                
                // look for translation
                if( inner.indexOf('key:') > -1 ) {
                    var key = inner.split(':')[1];
                    return that.getWording(key);
                }

                return 'undefined';
            });

            return html;
        },

        // generic function to create a single list result
        // createListResult: function( iconClass, label, subLabel, action, locationSymbol, tooltip, action_secondary ) {
        createListResult: function( options ) {
          var that = this;
          
          const resultEl = $("<div />")
            .addClass('result')
            .click(function(){
              options.action();
            })
            .on('contextmenu', function(e){
              if(options.action_secondary) {
                e.preventDefault();
                options.action_secondary();
              }
            });
          options.targetContainertEl.append(resultEl);

          // tooltip
          if(options.tooltip){
            that.createTooltip(
              resultEl,
              options.tooltip,
              'hover',
              'right',
              'desktop',
              ['search-result-tooltip']
            );
          }
          
          // icon
          const iconEl = $("<div />")
            .addClass('icon')
            .addClass(options.iconClass);
          resultEl.append(iconEl)

          // labels
          const labelsEl = $("<div />")
            .addClass('labels');
          resultEl.append(labelsEl)
          
          const mainLabelEl = $("<span />")
            .append(options.label);
          labelsEl.append(mainLabelEl);
          
          if( options.subLabel ) {
            const subLabelEl = $("<span />")
              .addClass('sub-label')
              .append(options.subLabel);
            // show location symbol?
            if(options.locationSymbol)
              subLabelEl.append('&nbsp;&nbsp;&nbsp;&nbsp;').append( $("<span />").addClass('glyphicon glyphicon-map-marker') );
            labelsEl.append(subLabelEl);
          }
        },

        // generic function to create a single entry result
        createEntryResult: function( options ) {
          var that = this;

          var entry = options.entry;
          var categoryName = entry.category ? entry.category.name : null;
          
          // icon
          var iconClass = 'cat-' + categoryName;
          iconClass += ' type-' + entry.type;
          if( entry.subCategory ) iconClass += ' subcat-' + entry.subCategory;
          
          // title
          var label = entry.name;
          
          var subLabel = '';
          
          // sub category
          if(entry.subCategory == 'fb-event'){
            subLabel += that.getWording('events.eventBy') + ' ' + entry.additionalData.owner;
          } else {
            subLabel += entry.subCategory ? that.getWording('cat.' + entry.subCategory) : that.getWording('cat.' + categoryName);
          }
          // time
          if( entry.type == 2 && entry.dateFrom ) subLabel += ' | ' + APP.getUtility().buildTimeString(entry, {short: true});
          // place
          if( entry.location.length > 0 && entry.location[0].placename ){
            var placename = entry.location[0].placename;
            if(placename.length > 50) placename = placename.substring(0,50) + '...';
            subLabel += ' | @' + placename;
          }
          
          // action
          var action = function(){
            if( entry.location.length > 0 && entry.location[0].lat )
              APP.getMapView().selectMarkerFromLink(entry);
            else
              APP.getDetailView().load(entry);
          };

          var action_secondary = function(){
            if( entry.location.length > 0 && entry.location[0].lat )
              APP.getMapView().selectMarkerFromLink(entry, {preventDetailView: true});
          };

          // create entry
          var tooltip;
          if(entry.descriptionShort) tooltip = entry.descriptionShort;
          // if(!tooltip && entry.description) tooltip = entry.description;
          if(tooltip) tooltip = tooltip.substring(0,150) + '...';

          that.createListResult(
              {
                iconClass: iconClass,
                label: label,
                subLabel: subLabel,
                action: action,
                action_secondary: action_secondary,
                tooltip: tooltip,
                locationSymbol: (entry.location.length > 0),
                targetContainertEl: options.targetContainertEl
              }
            );
        },

        createBackBtn: function(action){
          var that = this;

          that.backBtn = $("<div />")
                .addClass('back-btn')
                .click(function(){
                  action();
                });
          that.view.append(that.backBtn);
        },

        createModal: function(options){
            var that = this;

            var modal = $("<div />")
                .attr('id', 'modal')
                .addClass('modal');

            var modalContent = $("<div />")
                .addClass('modal-content')
                .append(options.content);
            modal.append(modalContent);

            var modalFooter = $("<div />")
                .addClass('modal-footer');
            modal.append(modalFooter);
            
            var actionOne = $("<button />")
                .addClass('modal-action modal-close btn-flat')
                .append(options.buttonLabel);
            modalFooter.append(actionOne);
            
            $('body').append(modal);

            $('.modal').modal({
                dismissible: options.dismissible ? options.dismissible : false, // Modal can be dismissed by clicking outside of the modal
                opacity: .8, // Opacity of modal background
                inDuration: 200, // Transition in duration
                outDuration: 100, // Transition out duration
                startingTop: '4%', // Starting top style attribute
                endingTop: '10%', // Ending top style attribute
                ready: function(modal, trigger) { // Callback for Modal open. Modal and trigger parameters available.
                    options.actions.ready();
                },
                complete: function() { 
                    options.actions.close();
                    $('#modal').remove();
                } // Callback for Modal close
            });

            $('#modal').modal('open');
        },

        createTooltip: function(el, content, event, placement, device, cssClasses, contentType, conditionFn){
            var that = this;

            // check device restrictions
            if( device && APP.getUserDevice() != device) return false;

            var popperConfig = {
                content: {
                    content: content,
                    contentType: contentType? contentType : 'html',
                    classNames: cssClasses? _.union(['popper'], cssClasses) : ['popper']
                },
                misc: {
                    placement: placement? placement : null,
                    removeOnDestroy: true
                }
            };

            var thePopper;
            if (event){
                // open on hover
                if( event == 'hover' ){
                    el.off(".popper");
                    el.on("mouseenter.popper", function(){
                            var condition = conditionFn? conditionFn() : true;
                            if( condition ){
                                thePopper = new Popper(
                                    el,
                                    popperConfig.content,
                                    popperConfig.misc
                                );
                            }
                        })
                        .on("mouseleave.popper", function(){
                            if( thePopper ) thePopper.destroy();
                            thePopper = undefined;
                        });
                }
            }
            // open immediately
            else {
                thePopper = new Popper(
                    el,
                    popperConfig.content,
                    popperConfig.misc
                );
            }

            return thePopper;
        }
    }

});
define("Views/View", ["DataManager","Router","LanguageManager","Utility"], function(){});

qx.Class.define("MapView", {
	
	extend : View,
	type: "singleton",
	
	properties : {
		userLocation: {},
		entryMarkerLookup: {},
		selectedMarker: {},
		viewCoords: {}
	},
	
	construct: function(){
		var that = this;

		that.setViewId('mapView');

		// that.setLoadable(true);
		that.setUserLocation(null);
		that.setSelectedMarker(null);
		that.setEntryMarkerLookup([]);
		that.setViewCoords({
			dresden: { lat: 51.051, lon: 13.74, zoom: 14 },
			pirna: { lat: 50.957456, lon: 13.937007, zoom: 14 },
			leipzig: { lat: 51.336143, lon: 12.362952, zoom: 14 },
			bautzen: { lat: 51.1803977, lon: 14.4242263, zoom: 14 }
		});
	},

	members : {
		
		render : function() {
				
			var that = this;

			// view container
			that.view = $("<div />");
			that.view.attr('id', that.getViewId());

			$('#main-container').append(that.view);

			/////////////////
			// MAPBOX INIT //
			/////////////////
			L.mapbox.accessToken = 'pk.eyJ1IjoiZmVsaXhrYW1pbGxlIiwiYSI6Ilo1SHFOX0EifQ.pfAzun90Lj1UlVapKI3LiA';
			that.map = L.mapbox.map(that.getViewId(), 'felixkamille.4128d9e7', {
			zoomControl: false,
			maxBounds: [
					L.latLng(50.115749, 11.804513), // south-west corner
					L.latLng(51.757315, 15.118189)  // north-east corner
			],
			// attributionControl: true,
			tileLayer: {format: 'jpg70'},  // valid values are png, jpg, png32, png64, png128, png256, jpg70, jpg80, jpg90
			tapTolerance: 30,
			maxZoom: 20
			}).setView([ that.getViewCoords()[APP.getArea()].lat, that.getViewCoords()[APP.getArea()].lon ], that.getViewCoords()[APP.getArea()].zoom);
		
		// Layer group for main markers (with clustering)
		that.layerForMainMarkers = new L.MarkerClusterGroup({
			iconCreateFunction: function(cluster) {
						return new L.DivIcon({
							className: 'location marker-cluster',
							iconSize: [30, 30],
							iconAnchor: [15, 15],
							html: cluster.getChildCount()
						});
					},
					maxClusterRadius: 3,
					spiderfyOnMaxZoom: true,
					spiderfyDistanceMultiplier: 2,
					spiderLegPolylineOptions: { weight: 1.5, color: '#000' }
					// disableClusteringAtZoom: 16
		});

		// Layers for content-specific data (e.g. wifi networks) to handle them seperately (e.g. zoom-dependent visibility)
		that.layerForWifiMarkers = L.layerGroup();

		// add layer groups to map
		that.map.addLayer(that.layerForMainMarkers);
		// that.map.addLayer(that.layerForWifiMarkers);


		//////////////////////////
		// Last Rendering Steps //
		//////////////////////////

				// call View.render() --> calls MapView.addEvents() --> calls View.addEvents()
				this.base(arguments);
				
				// initial actions
				// that.locate( APP.getUserDevice() == 'mobile' );
		},

		addEvents: function() {

			var that = this;
			
				this.base(arguments);
			
			that.listen('fetchedNewData', function(){
				that.loadNewData();
			});

			that.map.on('load', function(e){
				that.applyInteractiveFilters();
			});

			that.map.on('viewreset', function(e){
				that.applyInteractiveFilters();
			});

			that.listen('filterSet', function(){
				// that.loadNewData();
			});

			that.listen('listResultsLoaded', function(e){
				if(
					!e.customData.blockSyncWithMap
					&& e.customData.records.length > 0
				) that.loadNewData( {records: e.customData.records, fitBounds: true} );
			});

			that.listen('dashboardLoaded', function(e){
				APP.loading(true);
				that.loadNewData();
				that.map.setView([ that.getViewCoords()[APP.getArea()].lat, that.getViewCoords()[APP.getArea()].lon ], that.getViewCoords()[APP.getArea()].zoom);
				APP.loading(false);
			});

			that.listen('markersCreated', function(){
				that.applyInteractiveFilters();
			});

			// map click (not fired on drag or marker click or sth, pure map click!)
			that.map.on('click', function(e) {
				that.say('mapclicked');
			});

			if( APP.getUserDevice() == 'phone' ){
				$('#main-container').on("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function(e){
					if( e.target != e.currentTarget ) return;
					if( !$(this).hasClass('shifted') && !$(this).hasClass('shifted-small') ){
						that.say('shiftMenuClosed');
					}
				});
			}

			that.listen('mapclicked', function(){
					that.deselectMarker();
			});

			that.listen('DetailViewClosed', function(){
					that.deselectMarker();
			});

			// that.map.on('zoomend', function(){
			// 	if(that.getSelectedMarker()){
			// 		try{ that.layerForMainMarkers.getVisibleParent(that.getSelectedMarker()).spiderfy(); } catch(e){}
			// 	}
			// });
		},
		removeEvents: function() {

		},

		loadNewData: function( options ) {
			var that = this;

			options = (typeof options !== 'undefined') ?  options : {};

			// reset things
			that.removeMarkers();

			// aplly filters
 			var data = (options.records !== undefined )? options.records : APP.getData().entries;
			
			var filter = APP.getActiveFilter();
			
			var entries = _.filter(data, function(entry){
				// only entries with location data
				if( entry.location.length < 1) return false;
				
				// legend filter active?
				if( filter ) {
					if( filter.category !== undefined )
						if( !entry.category || !(entry.category.name === filter.category) ) return false;

					if( filter.subCategory !== undefined )
						if( !(entry.subCategory === filter.subCategory) ) return false;

					if( filter.tags !== undefined )
						if( !entry.tags || entry.tags.indexOf(filter.tags) < 0 ) return false;

					if( filter.type !== undefined )
						if( !(entry.type === parseInt(filter.type)) ) return false;

					if( filter.forChildren !== undefined )
						if( !(entry.forChildren === filter.forChildren) ) return false;

					if( filter.supportWanted !== undefined )
						if( !(entry.supportWanted === filter.supportWanted) ) return false;
				};
				
				// show markers depending on zoom level
				// if( entry.subCategory == 'wifi' ){
				// 	// that.map.getZoom() < 16 )
				// 	if( filter && filter.subCategory && filter.subCategory == 'wifi' )
				// 		return true;
				// 	else
				// 		return false;
				// }

				return true;

			});
				
			that.addMarkers(entries);
			if(options.fitBounds) that.map.fitBounds(that.layerForMainMarkers.getBounds());
			// that.loadFromUrl({setView: true});
		},

		addMarkers: function(entries) {
		
		var that = this;

		// var newLayer = new L.LayerGroup();

		_.each(entries, function(entry){

			// type specific adjustment
			var iconSize, iconAnchor;

			// IniLocation
			if( entry.type === 0 ) {
				iconSize = [24,24];
				iconAnchor = [12,12];
			}
			// MarketLocation
			else if( entry.type === 1 ) {
				iconSize = [23,23];
				iconAnchor = [12,12];
			}
			// EventLocation
			else if( entry.type === 2 ) {
				iconSize = [23,23];
				iconAnchor = [15,15];
			}
			// BasicLocation
			else if( entry.type === 3 ) {
				iconSize = [23,23];
				iconAnchor = [12,12];
			}
			
			// TODO: quickfix: skip locations without coodinates
			if( !entry.location[0].lat || !entry.location[0].lon ) return false;

			var className = 'location';
			className += ' type-' + entry.type;
			if( entry.category ) className += ' cat-' + entry.category.name;
			if( entry.subCategory ) className += ' subcat-' + entry.subCategory;
			if( entry.supportNeeded ) className += ' support-needed';

			////////////
			// MARKER //
			////////////
			var marker = L.marker( [entry.location[0].lat, entry.location[0].lon] , {
				riseOnHover: true,
				icon: L.divIcon({
					className: className,
					iconSize: iconSize,
					iconAnchor: iconAnchor,
					html: function(){
						var html = '';
						if(entry.type == 2){
							var classString = 'type-' + entry.type;
							if( entry.category ) classString += ' cat-' + entry.category.name;
							if( entry.subCategory ) classString += ' subcat-' + entry.subCategory;
							// the diamond
							html = '<span class="' + classString + ' event-shape"></span>';
							// the icon
							html += '<span class="' + classString + ' event-icon"></span>';
						}
						return html;
					}()
				})
			});

			///////////
			// POPUP //
			///////////
			var locationName = entry.name;
			// if (!locationName) {
			// 	if( location.type === 0 ) locationName = location.initiative.name;
			// 	else if( location.type === 1 ) locationName = location.marketEntry.name;
			// 	else if( location.type === 2 ) locationName = location.event.name;
			// }
			
			var popup = L.popup(
				{
					className: 'afeefa-popup',
					closeButton: false,
					offset: [0, 0]
				})
				.setLatLng([entry.location[0].lat, entry.location[0].lon])
				.setContent(function(){
					var container = $("<div />"),
							titleLabel = $("<span />").addClass('title'),
							categoryLabel = $("<span />").addClass('category');
							dateLabel = $("<span />").addClass('date');
					
					container.append(titleLabel);
					container.append(categoryLabel);
					container.append(dateLabel);

					titleLabel.append(locationName);

					if(entry.subCategory){
						categoryLabel.append( that.getWording('cat.' + entry.subCategory) );
						categoryLabel.append( ' (' + (entry.category ? that.getWording('cat.' + entry.category.name) : '[category missing]') + ')' );
					}
					else {
						categoryLabel.append( entry.category ? that.getWording('cat.' + entry.category.name) : '[category missing]' );
					}

					if(entry.type == 2) {
						dateLabel.append(APP.getUtility().buildTimeString(entry));
					}

					container.on('click', function(e){
						APP.getDetailView().load(entry);
						if( APP.getUserDevice() == 'mobile' ){
							APP.getDetailView().resize(2);
							APP.getDetailView().say('detailViewMobileMaximized');
						}
					});

					return container[0];
				}());

				marker.bindPopup(popup);
				

				marker.on('mouseover', function (e) {
						that.map.openPopup(popup);
				});
				marker.on('mouseout', function (e) {
						that.map.closePopup();
				});
			

			// TODO load detail view
			marker.on('click', function(){
				that.selectMarker(marker, entry);
			});

			if (entry.type === 3 && entry.subCategory && entry.subCategory == 'wifi') {
				that.layerForWifiMarkers.addLayer(marker);
			}
			else {
				that.layerForMainMarkers.addLayer(marker);
			}

			var currentLookup = that.getEntryMarkerLookup();
			currentLookup.push( {entry: entry, marker: marker} );
			that.setEntryMarkerLookup( currentLookup );

			// newLayer.addLayer(marker);
			
		});
		
		that.say('markersCreated');

		// return newLayer;
		},

		removeMarkers: function() {

			var that = this;

			that.layerForMainMarkers.clearLayers();
			that.layerForWifiMarkers.clearLayers();
		
			that.setEntryMarkerLookup([]);

		},

		setViewToArea: function(areaName){
			var that = this;

			if( areaName == 'pirna' ) {
				that.map.setView([ that.getViewCoords().pirna.lat, that.getViewCoords().pirna.lon ], that.getViewCoords().pirna.zoom);
			}
			else {
				console.log('city mentioned in URl not defined');
			}
		},

		loadEntry: function(entry, options){
			var that = this;

			var lookup = that.lookupEntry(entry);

			if(lookup && lookup.marker) that.selectMarker(lookup.marker, lookup.entry, options);
			else that.selectMarker(null, lookup, options);
		},

		lookupEntry: function( entry ){
			var that = this;

			var hit = null;
			
			// does the entry have a marker on the map?
			hit = _.find( that.getEntryMarkerLookup(), function(pair){
				return pair.entry.entryType == entry.entryType && pair.entry.id == entry.id;
			});
			
			if(!hit) hit = entry;

			return hit;
		},

		selectMarker: function( marker, entry, options ){
			var that = this;

			if(options === undefined) options = {};

			that.deselectMarker();
			that.setSelectedMarker(marker);

			if(marker){
				if(options && options.setView) that.map.setView( [entry.location[0].lat, entry.location[0].lon], 16);
				try{ that.layerForMainMarkers.getVisibleParent(marker).spiderfy(); } catch(e){}
				$(marker._icon).addClass('active');
				marker.openPopup();
			}

			if(!options.preventDetailView) APP.getDetailView().load(entry);
		},

		selectMarkerFromLink: function( entry, options ) {
			var that = this;

			if(options === undefined) options = {};

			var lookup = that.lookupEntry( entry );
				
			if(lookup && lookup.marker){
					options.setView = true;
					APP.getMapView().selectMarker(lookup.marker, lookup.entry, options);
			}

		},

		deselectMarker: function(){
			var that = this;

			if( that.getSelectedMarker() ) {
				$( that.getSelectedMarker()._icon ).removeClass('active');
				// that.layerForMainMarkers.getVisibleParent(that.getSelectedMarker()).unspiderfy();
			}

			that.say('mapMarkerDeselected');
			that.setSelectedMarker(null);
		},

		changeLanguage: function() {
			var that = this;
		},

		addPOIs: function(markers, color) {
		
		var that = this;

			if(color === undefined) color = '#333';
		
		var newLayer = new L.LayerGroup();

			_.each(markers, function(marker){
			// var leafMarker = L.marker(marker.geo).addTo(that.map);
			var leafMarker = L.marker(marker.geo, {
				riseOnHover: true,
				zIndexOffset: -1000,
				icon: L.divIcon({
									className: 'marker-station',
									html: '<p><span class="fa fa-subway"></span> '+ marker.name + '</p>',
									// html: '<p>' + marker.name + '</p>',
									// iconSize: [100,20],
									iconSize: [100,20],
									iconAnchor: [50,25]
							})
			// }).addTo(that.map);
			});

			newLayer.addLayer(leafMarker);
		});

			return newLayer;
		},

		applyInteractiveFilters: function(){
			var that = this;

			if( that.map.getZoom() >= 16){
				// show wifi networks on high zoom levels only
				if( !that.map.hasLayer(that.layerForWifiMarkers) )
					that.map.addLayer(that.layerForWifiMarkers);
			} else {
				if( that.map.hasLayer(that.layerForWifiMarkers) )
					that.map.removeLayer(that.layerForWifiMarkers);
			}

			var filter = APP.getActiveFilter();
			if( filter && filter.subCategory && filter.subCategory == 'wifi' ){
				if( !that.map.hasLayer(that.layerForWifiMarkers) )
					that.map.addLayer(that.layerForWifiMarkers);
			}

		},

		// sample code for geocoding (finding coords by location names)
		// see https://www.mapbox.com/mapbox.js/api/v2.1.5/l-mapbox-geocoder/
		find: function() {

			var that = this;
			
			geocoder.query('Chester, NJ', showMap);

			function showMap(err, data) {
					// The geocoder can return an area, like a city, or a
					// point, like an address. Here we handle both cases,
					// by fitting the map bounds to an area or zooming to a point.
					if (data.lbounds) {
							that.map.fitBounds(data.lbounds);
					} else if (data.latlng) {
							that.map.setView([data.latlng[0], data.latlng[1]], 13);
					}
			}
		},

		// locate the user on startup and set view to his position
		locate: function(setView) {

			var that = this;

			// trigger locating
			that.map.locate( {
				watch: false,
				setView: false,
				enableHighAccuracy: true
			});

			// update view if location found
		that.map.on('locationfound', function(e) {
				// alert(e.latlng);
				if(setView) that.map.setView( e.latlng , 15);
				that.setUserLocation = e.latlng;

				var myIcon = L.icon({
						iconUrl: '_Resources/Static/Packages/DDFA.dresdenfueralleDe/img/noun_91817_cc.png',
						// iconRetinaUrl: 'my-icon@2x.png',
						iconSize: [30, 30],
						iconAnchor: [15, 15],
						popupAnchor: [40, -10]
						// shadowUrl: 'my-icon-shadow.png',
						// shadowRetinaUrl: 'my-icon-shadow@2x.png',
						// shadowSize: [68, 95],
						// shadowAnchor: [22, 94]
				});

				// L.marker([50.505, 30.57], {icon: myIcon}).addTo(map);
				var leafMarker = L.marker(e.latlng, {
					// icon: myIcon
					icon: L.divIcon({
									className: 'marker-user-location',
									html: '',
									// html: '<p>' + marker.name + '</p>',
									// iconSize: [100,20],
									iconSize: [16,16],
									iconAnchor: [8,8]
							})
				}).addTo(that.map);
		});

		that.map.on('locationerror', function(e) {
				// alert('Locating failed');
		});
		},

		beShy: function(bool){
			var that = this;

			console.warn('map is being shy');
			// that.showCurtain(true);

			if(bool) that.view.addClass('shy');
			else that.view.removeClass('shy');
		}

	}
});
define("Views/MapView", ["Views/View"], function(){});

qx.Class.define("SearchView", {
    
  extend : View,
  type: "singleton",

  properties: {
  },

  construct: function(){
    var that = this;

    that.setViewId('searchView');
  },

  members : {
      
    render: function(){
      var that = this;

      // view container
      that.view = $("<div />");
      that.view.attr('id', that.getViewId());

      $('#main-container').append(that.view);

      // search bar
      that.searchBar = $("<div />")
        .attr('id', 'search-bar');
      that.view.append(that.searchBar);

      // menu button
      that.menuBtn = $("<div />")
        .addClass('button menu-btn');
      
      that.searchBar.append(that.menuBtn);

      // refugee button
      that.refugeeBtn = $("<div />")
        .addClass('button refugee-btn')
        .click(function(){
          APP.getIncludeView().load( 'refugeeGuide' );
        });
     
      that.searchBar.append(that.refugeeBtn);

      // filter button
      that.filterBtn = $("<div />")
        .addClass('button filter-btn')
        .click(function(){
          if( APP.getLegendView().view.hasClass('active') )
            APP.getLegendView().close();
          else
            APP.getLegendView().show();
        });
      that.searchBar.append(that.filterBtn);

      // cancel button
      that.cancelBtn = $("<div />")
        .addClass('button cancel-btn')
        .click(function(){
          that.close();
        });
      that.searchBar.append(that.cancelBtn);

      // input field
      that.inputField = $("<input />")
        .attr('type', 'text');
      that.searchBar.append(that.inputField);

      // search tags
      that.searchTag = $("<span />")
        .click(function(){
          if( APP.getUserDevice() == 'mobile') that.maximize();
          // that.inputField.trigger( "input" );
        });
      that.searchBar.append(that.searchTag);      

      // results area
      that.scrollContainer = $("<div />")
        .addClass('scroll-container list-results');

      if( APP.getUserDevice() == 'desktop') that.scrollContainer.perfectScrollbar();

      that.view.append(that.scrollContainer);

      // map area on mobile
      if( APP.getUserDevice() == 'mobile'){
        that.mapArea = $("<div />")
          .attr('id', 'map-area')
          .click(function(){
            that.minimize();
          });
        that.view.append(that.mapArea);
      }
      
      this.base(arguments);
    },

    load: function(query){
        var that = this;

        if( query === undefined ) query = '';
        query = query.toLowerCase();
        
        if(query){
          that.scrollContainer.empty();
          that.loadResults(query);
          APP.getRouter().setUrl('search', query);
        } else {
          that.reset();
          that.loadDashboard();
          that.say('dashboardLoaded');
        }

        that.inputField
          .attr('placeholder', that.getWording('search.placeholder'))
          .show();

        // tooltip
        that.createTooltip(
          that.menuBtn,
          function(){
            return that.getWording('menu.menu');
          }(),
          'hover',
          'bottom',
          'desktop'
        );

        // tooltip
        that.createTooltip(
          that.refugeeBtn,
          function(){
            return that.getWording('menu.refugee');
          }(),
          'hover',
          'bottom',
          'desktop'
        );

        that.isActive(true);
        that.maximize();
        that.view.addClass('active');
        that.say('searchViewLoaded');

        return that;
    },

    loadDashboard: function(){
      var that = this;

      // highlights
      // that.createSectionHeader( that.getWording('search.label.highlights') );

      // iwgr
      // var action = function(){
      //   APP.getLegendView().setFilter( {tags: 'iwgr'} );
      //   window.location.hash = 'iwgr';
      // };
      // that.createListResult('iwgr', that.getWording('search.label.iwgr'), that.getWording('search.sublabel.iwgr'), action );

      // upcoming events
      // that.createSectionHeader( that.getWording('search.label.eventstoday'), function(){
      //   that.inputField.val('events').trigger( "input" );
      // });

      that.createSectionHeader( that.getWording('search.label.eventstoday') );
      
      var eventsToday = APP.getDataManager().getAllEvents( {timeSpan: 'onlyAtDayX', atDate: moment()} );
      if(eventsToday.length == 0) eventsToday = APP.getDataManager().getAllEvents( {timeSpan: 'alsoToday', atDate: moment()} );
      _.each(eventsToday.slice(0, 3), function(entry) {
        that.createEntryResult( {entry: entry, targetContainertEl: that.scrollContainer} );
      });
              
      that.createButton(
        {
          label: that.getWording('search.button.events'),
          iconName: 'today',
          action: function(){
            APP.getEventView().load();
          }
        }
      );

      that.createButton(
        {
          label: 'share',
          iconName: 'facebook',
          action: function(){
            APP.getDetailView().mobileShare();
          }
        }
      );

      that.createSectionHeader( that.getWording('search.label.lists') );

      // support wanted
      var action = function(){
        that.inputField.val('support wanted').trigger( "input" );
      };
      that.createListResult(
        {
          iconClass: 'support-wanted',
          label: that.getWording('search.label.supportwanted'),
          subLabel: that.getWording('search.sublabel.supportwanted'),
          action: action,
          targetContainertEl: that.scrollContainer
        }
      );

      // for children
      var action = function(){
        that.inputField.val(that.getWording('prop.forChildren')).trigger( "input" );
      };
      that.createListResult(
        {
          iconClass: 'for-children',
          label: that.getWording('search.label.forchildren'),
          subLabel: that.getWording('search.sublabel.forchildren'),
          action: action,
          targetContainertEl: that.scrollContainer
        }
      );

      // for women
      var action = function(){
        that.inputField.val('tag:frauen').trigger( "input" );
      };
      that.createListResult(
        {
          iconClass: 'for-women',
          label: that.getWording('search.label.forwomen'),
          subLabel: that.getWording('search.sublabel.forwomen'),
          action: action,
          targetContainertEl: that.scrollContainer
        }
      );

      // // certified by SFR
      // var action = function(){
      //   that.inputField.val('certified').trigger( "input" );
      // };
      // that.createListResult(
      //   {
      //     iconClass: 'certified',
      //     label: that.getWording('search.label.certified'),
      //     subLabel: that.getWording('search.sublabel.certified'),
      //     action: action,
      //     targetContainertEl: that.scrollContainer
      //   }
      // );

      that.createSectionHeader( that.getWording('search.label.activity') );
     
      // add new entry
      var action = function(){
        APP.getFormView().load( 'newEntry' );
      };
      that.createListResult(
        {
          iconClass: 'add-entry',
          label: that.getWording('search.label.addentry'),
          subLabel: that.getWording('search.sublabel.addentry'),
          action: action,
          targetContainertEl: that.scrollContainer
        }
      );

      var action = function(){
        APP.getFormView().load( 'feedback' );
      };
      that.createListResult(
        {
          iconClass: 'feedback',
          label: that.getWording('form.heading.feedback'),
          subLabel: that.getWording('search.sublabel.feedback'),
          action: action,
          targetContainertEl: that.scrollContainer
        }
      );

      that.createSectionHeader( that.getWording('search.label.help') );
      
      // intro
      var action = function(){
        APP.getIntroView().start();
      };
      that.createListResult(
        {
          iconClass: 'start-intro',
          label: that.getWording('search.label.intro'),
          subLabel: that.getWording('search.sublabel.intro'),
          action: action,
          targetContainertEl: that.scrollContainer
        }
      );

      // about afeefa
      var action = function(){
        APP.getIncludeView().load('about');
      };
      that.createListResult(
        {
          iconClass: 'about',
          label: that.getWording('search.label.about'),
          subLabel: that.getWording('search.sublabel.about'),
          action: action,
          targetContainertEl: that.scrollContainer
        }
      );
    },

    loadResults: function( query ) {
      var that = this;

      that.view.addClass('active-search');

      // const entries = _.filter(APP.getData().entries, function(entry){
      //   return entry.external;
      // });
      const entries = APP.getData().entries;

      var entriesFiltered, blockSyncWithMap = false;

      // predefined queries: 
      if( query.indexOf(':') >= 0 ){
        var operator = query.substring(0, query.indexOf(':'));
        var operationQuery = query.substring(operator.length+1);

        // type listing
        if(operator == 'type' ) {
          if(operationQuery == 2) {
            entriesFiltered = APP.getDataManager().getAllEvents();
          }
          else {
            entriesFiltered = _.filter( entries, function(entry){
                return (entry.type == operationQuery);
            });
          }

          that.setSearchTag("type-" + operationQuery, that.getWording('search.label.type.' + operationQuery));
        }

        // category listing
        if(operator == 'cat' ) {
          entriesFiltered = _.filter( entries, function(entry){
              return (entry.category && entry.category.name == operationQuery);
          });

          that.setSearchTag("cat-" + operationQuery, that.getWording('cat.' + operationQuery));
        }

        // sub category listing
        else if(operator == 'subcat' ) {
          entriesFiltered = _.filter( entries, function(entry){
            
            if( entry.subCategory && entry.subCategory == operationQuery ) {
              return true;
            }
          });
          
          var searchTagCssClass = APP.getMainCategory(operationQuery).name;
          that.setSearchTag("cat-" + searchTagCssClass, that.getWording('cat.' + operationQuery));
        }

        // tag listing
        else if(operator == 'tag' ) {
          // entriesFiltered = _.filter( entries, function(entry){
          entriesFiltered = _.filter( APP.getDataManager().getAllEvents(), function(entry){
              return ( entry.tags && (entry.tags.indexOf(operationQuery) > -1) );
          });
          
          var tagLabel = that.getWording('tag.' + operationQuery) ? that.getWording('tag.' + operationQuery) : operationQuery;
          that.setSearchTag("tag-" + operationQuery, tagLabel);
        }
      }
      
      // events
      else if( query == 'events' ){
        entriesFiltered = APP.getDataManager().getAllEvents();
        
        that.setSearchTag(null, that.getWording('search.label.upcomingevents'));
      }
      
      // support wanted
      else if( query == 'support wanted' ){
        entriesFiltered = _.filter( entries, function(entry){
          return entry.supportWanted;
        });

        that.setSearchTag(null, that.getWording('search.tag.supportwanted'));
      }

      // children
      else if( query == that.getWording('prop.forChildren').toLowerCase() ){
        entriesFiltered = _.filter( entries, function(entry){
          return entry.forChildren;
        });

        that.setSearchTag(null, that.getWording('prop.forChildren'));
      }

      // certified
      else if( query == 'certified' ){
        entriesFiltered = _.filter( entries, function(entry){
          return entry.certified;
        });

        that.setSearchTag(null, that.getWording('search.tag.' + query));
      }
      
      // free search
      else {
        entriesFiltered = _.filter( entries, function(entry){
          // in name?
          if( entry.name.toLowerCase().indexOf(query) >= 0 ) return true;
          // in category?
          if( entry.category ) {
            var cat = that.getWording('cat.' + entry.category.name);
            if( cat.toLowerCase().indexOf(query) >= 0 ) return true;
          }
          // in subCategory?
          if( entry.subCategory ) {
            var subcat = that.getWording('cat.' + entry.subCategory);
            if( subcat.toLowerCase().indexOf(query) >= 0 ) return true;
          }
          // children?
          if( entry.forChildren ) {
            // the query string occurs in the "for children" property´wording of the selected language
            var children = that.getWording('prop.forChildren');
            if( children.toLowerCase().indexOf(query) >= 0 ) return true;
          }
          // in description?
          if( entry.descriptionShort ) {
            if( entry.descriptionShort.toLowerCase().indexOf(query) >= 0 ) return true;
          }
          // in description?
          if( entry.description ) {
            if( entry.description.toLowerCase().indexOf(query) >= 0 ) return true;
          }
          // in speakerPublic?
          if( entry.speakerPublic ) {
            if( entry.speakerPublic.toLowerCase().indexOf(query) >= 0 ) return true;
          }

          return false;
        });
      }

      _.each(entriesFiltered, function(entry) {
        that.createEntryResult( {entry: entry, targetContainertEl: that.scrollContainer} );
      });
      
      // nothing found info
      var action = function(){
        that.close();
      };
      if(!entriesFiltered.length) {
        that.createListResult(
          {
            iconClass: null,
            label: that.getWording('search.label.nothingfound'),
            subLabel: that.getWording('search.sublabel.nothingfound'),
            action: action,
            targetContainertEl: that.scrollContainer
          }
        );
      }

      that.say('listResultsLoaded', {records: entriesFiltered, blockSyncWithMap: blockSyncWithMap} );
    },

    // generic function to create a section header
    createSectionHeader: function( label, action ) {
      var that = this;
      
      const sectionHeader = $("<div />")
        .addClass('section-header')
        .append(label);
      
      if(action) sectionHeader
        .addClass('with-action')
        .click(function(){ action(); });
      
      that.scrollContainer.append(sectionHeader);
    },

    // generic function to create a section header
    createButton: function( options ) {
      var that = this;
      
      const btn = $("<button />")
        .addClass('btn btn-center grey darken-3')
        .append(options.label);

      if(options.iconName) {
        const icon = $("<i />")
          .addClass('material-icons ' + (options.iconPosition? options.iconPosition : 'left') )
          .append(options.iconName);
        btn.append(icon);
      };
      
      if(options.action) btn
        .addClass('with-action')
        .click(function(){ options.action(); });
      
      that.scrollContainer.append(btn);
    },

    setSearchTag: function(cssClass, wording){
      var that = this;

      that.searchTag
        .empty()
        .removeClass()        
        .addClass("search-tag active " + cssClass)
        .append(wording);

      that.inputField.hide();
    },

    addEvents: function(){
      var that = this;

      // call superclass
      this.base(arguments);
      
      that.menuBtn.click(function(){
        that.say('mainMenuBtnClicked');
      });

      that.inputField.focus(function(){
        that.load(that.inputField.val());
        that.say('searchFieldFocused');
      });

      that.inputField.on('input', function(e){
        var val = that.inputField.val();
        
        // stop timer that may exist from previous input
        if(that.timeout) clearTimeout(that.timeout);
        
        // triggered by keyboard input (load with delay)
        if(e.originalEvent !== undefined){
          if(val.length < 3) return;
          that.timeout = setTimeout(function(){
            that.load(val);
          }, 400);
        } 
        // triggered manually (load instantly)
        else {
          that.load(val);
        }
      });

      that.listen('detailViewOpened', function(){
        that.hide();
      });
      that.listen('detailViewClosed', function(){
        if( that.isActive() ) that.show();
        else if(
          !APP.getEventView().isActive()
          && !APP.getIncludeView().isActive()
        ) that.load();
      });

      that.listen('eventViewOpened', function(){
        that.close();
      });
      that.listen('eventViewClosed', function(){
        if( that.isActive() ) that.show();
        else if(
          !APP.getDetailView().isActive()
          && !APP.getIncludeView().isActive()
        ) that.load();
      });

      that.listen('includeViewOpened', function(){
        that.close();
      });
      that.listen('includeViewClosed', function(){
        if( that.isActive() ) that.show();
        else if(
          !APP.getDetailView().isActive()
          && !APP.getEventView().isActive()
        ) that.load();
      });

      that.listen('searchViewClosed', function(){
        if(
          !APP.getDetailView().isActive()
          && !APP.getEventView().isActive()
          && !APP.getIncludeView().isActive()
        ) that.load();
      });

      that.listen('fetchedNewData', function(){
        if( APP.getDetailView().isActive() ) that.hide();
        else that.load(that.inputField.val());
      });

      that.listen('filterSet', function(){
        var filter = APP.getActiveFilter();
        
        if( !filter ){
          that.close();
        }
        else if( filter.type ) {
          that.inputField.val( 'type:' + filter.type ).trigger( "input" );
        }
        else if( filter.category ) {
          that.inputField.val( 'cat:' + filter.category ).trigger( "input" );
        }
        else if( filter.subCategory ) {
          that.inputField.val( 'subcat:' + filter.subCategory ).trigger( "input" );
        }
        else if( filter.tags ) {
          that.inputField.val( 'tag:' + filter.tags ).trigger( "input" );
        }
      });

    },

    minimize: function(){
      var that = this;

      // that.show();
      // that.isActive(false);
      that.view.addClass('minimized');
    },

    maximize: function(){
      var that = this;

      that.show();
      that.view.removeClass('minimized');
    },

    reset: function(){
        var that = this;

        that.show();
        that.maximize();

        that.scrollContainer.scrollTop(0);

        that.inputField
          .val(null)
          .show();

        that.searchTag
          .removeClass("active")
          .removeClass (function (index, css) {
            return (css.match (/(^|\s)cat-\S+/g) || []).join(' ');
          })
          .empty();

        that.scrollContainer.empty();
        
        that.view.removeClass('active-search');
        
        if( APP.getUserDevice() == 'desktop') that.scrollContainer.perfectScrollbar('update');
    },

    close: function(){
        var that = this;

        that.reset();
        that.view.removeClass('active');
        that.isActive(false);

        that.say('searchViewClosed');
    },

    changeLanguage: function(){
        var that = this;

        // if( APP.getDetailView().isActive() ) return;
        // if(that.isActive()) that.load( that.inputField.val() );
    }
  }

});

define("Views/SearchView", ["Views/View"], function(){});

qx.Class.define("EventView", {
    
  extend : View,
  type: "singleton",

  properties: {
    currentOptions: {}
  },

  construct: function(){
    var that = this;

    that.setViewId('eventView');
  },

  members : {
      
    render: function(){
      var that = this;

      // view container
      that.view = $("<div />");
      that.view.attr('id', that.getViewId());

      $('#main-container').append(that.view);

      // heading
      var headingContainer = $("<div />").addClass('heading');
      that.heading = $("<h1 />");
      headingContainer.append(that.heading);
      that.view.append(headingContainer);

      // back button
      that.createBackBtn(function(){that.close();});

      // FILTERS
      that.createFilters();

      // form container
      that.scrollContainer = $("<div />")
          .addClass('scroll-container list-results');
      if (APP.getUserDevice() == 'desktop') that.scrollContainer.perfectScrollbar();
      that.view.append(that.scrollContainer);

      this.base(arguments);
    },

    createFilters: function(query){
      var that = this;

      that.filters = $("<div />")
        .addClass('filters');
      that.view.append(that.filters);

      that.eventFilter = $("<div />")
        .addClass('event-filter');
      that.filters.append(that.eventFilter);

      that.filterOptions = ['today', 'thisWeek', 'nextWeek'];
      
      _.each(that.filterOptions, function(optionValue){
        
        var optionEl = $("<div />")
          .addClass('option-value')
          .click(function(){
            that.load( {filter: optionValue} );
          });
        
        that.eventFilter.append(optionEl);
        that['optionEl-'+optionValue] = optionEl;
      });
    },

    setFilter: function( options ){
      var that = this;

      if(options === undefined) options = null;
      
      var eventSets = [];

      if(options === 'today'){
        var eventsOnlyToday = APP.getDataManager().getAllEvents( {timeSpan: 'onlyAtDayX', atDate: moment()} );
        var eventsAlsoToday = APP.getDataManager().getAllEvents( {timeSpan: 'alsoToday'} );
        eventSets = [
          {
            heading: null,
            events: eventsOnlyToday
          },
          {
            heading: null,
            events: eventsAlsoToday
          }
        ];
      }
      else if(options === 'thisWeek'){
        
        // events for each day of the week
        var daysLeftInWeek = moment().endOf('week').diff(moment().today, 'days');
        var eventSetsPerDay = [];
        for(var i=0;i<=daysLeftInWeek;i++){
          var atDate = moment().add(i,'days');
          var eventsOnDayX = APP.getDataManager().getAllEvents( {timeSpan: 'onlyAtDayX', atDate: atDate} );
          if(eventsOnDayX.length < 1) continue;
          eventSetsPerDay.push(
            {
              heading: ( atDate.isSame(moment(), 'd') )? that.getWording('term.today') : atDate.format('dddd Do MMMM'),
              events: eventsOnDayX
            }
          );
        }
        
        // other period events in this week
        var eventsAlsoThisWeek = APP.getDataManager().getAllEvents( {timeSpan: 'alsoThisWeek'} );
        
        eventSets = _.union(eventSetsPerDay, [
          {
            heading: that.getWording('events.alsoThisWeek'),
            events: eventsAlsoThisWeek
          }
        ]);
      }
      else if(options === 'nextWeek'){
        
        // events for each day of the week
        var eventSetsPerDay = [];
        for(var i=0;i<=6;i++){
          var atDate = moment().weekday(7).add(i, 'days');
          var eventsOnDayX = APP.getDataManager().getAllEvents( {timeSpan: 'onlyAtDayX', atDate: atDate} );
          if(eventsOnDayX.length < 1) continue;
          eventSetsPerDay.push(
            {
              heading: atDate.format('dddd Do MMMM'),
              events: eventsOnDayX
            }
          );
        }
        
        eventSets = eventSetsPerDay;
      }
      else {
        // events = APP.getDataManager().getAllEvents();
      }

      that['optionEl-'+options].addClass('active');

      return eventSets;
    },

    load: function( options ){
        var that = this;
        
        that.reset();
        that.loadUIVocab();

        if(options === undefined) options = { filter: 'today' };
        that.setCurrentOptions(options);

        var eventSets = that.setFilter( options.filter );

        _.each(eventSets, function(set, i) {
          if(set.heading) that.createSectionHeader(set.heading, (i==0)? 'no-top-margin' : null);
          
          _.each(set.events, function(entry) {
            that.createEntryResult( {entry: entry, targetContainertEl: that.scrollContainer} );
          });
        });

        that.say('listResultsLoaded', {records: _.flatten( _.pluck(eventSets, 'events'), true)} );

        that.view.addClass('active');
        that.isActive(true);
        that.say('eventViewOpened');
    },

    // generic function to create a section header
    createSectionHeader: function( label, cssClass ) {
      var that = this;
      
      const sectionHeader = $("<div />")
        .addClass('section-header');

      if(cssClass) sectionHeader.addClass(cssClass);
      
      const line  = $("<span />")
        .addClass('section-header-line');
      sectionHeader.append(line);
      
      const labelEl  = $("<div />")
        .addClass('section-header-label')
        .append(label);
      sectionHeader.append(labelEl);
      
      that.scrollContainer.append(sectionHeader);
    },

    addEvents: function(){
      var that = this;

      // call superclass
      this.base(arguments);
      
      that.listen('detailViewOpened', function(){
        that.hide();
      });

      that.listen('detailViewClosed', function(){
        if(that.isActive) that.show();
        // if( !that.isActive() ) that.load();
      });

      that.listen('includeViewOpened', function(){
        that.close();
      });

      that.listen('filterSet', function(){
        that.close();
      });

      that.listen('fetchedNewData', function(){
        if(that.isActive()) that.load(that.getCurrentOptions());
      });

      // that.listen('filterSet', function(){
      //   var filter = APP.getActiveFilter();
        
      //   if( !filter ){
      //     that.close();
      //   }
      //   else if( filter.type ) {
      //     that.inputField.val( 'type:' + filter.type ).trigger( "input" );
      //   }
      //   else if( filter.category ) {
      //     that.inputField.val( 'cat:' + filter.category ).trigger( "input" );
      //   }
      //   else if( filter.subCategory ) {
      //     that.inputField.val( 'subcat:' + filter.subCategory ).trigger( "input" );
      //   }
      //   else if( filter.tags ) {
      //     that.inputField.val( 'tag:' + filter.tags ).trigger( "input" );
      //   }
      // });

    },

    minimize: function(){
      var that = this;

      // that.show();
      // that.isActive(false);
      that.view.addClass('minimized');
    },

    maximize: function(){
      var that = this;

      that.show();
      that.view.removeClass('minimized');
    },

    reset: function(){
        var that = this;

        _.each(that.filterOptions, function(optionValue){
          that['optionEl-'+optionValue].removeClass('active');
        });

        that.setCurrentOptions(null);

        // that.show();
        // that.maximize();

        // that.scrollContainer.scrollTop(0);

        // that.inputField
        //   .val(null)
        //   .show();

        // that.searchTag
        //   .removeClass("active")
        //   .removeClass (function (index, css) {
        //     return (css.match (/(^|\s)cat-\S+/g) || []).join(' ');
        //   })
        //   .empty();

        that.scrollContainer.empty();
        
        if( APP.getUserDevice() == 'desktop') that.scrollContainer.perfectScrollbar('update');
    },

    close: function(){
        var that = this;

        that.reset();
        that.view.removeClass('active');
        that.isActive(false);

        that.say('eventViewClosed');
    },

    loadUIVocab: function(){
      var that = this;
      
      that.heading.empty().append( that.getWording('events.heading') );
      
      _.each(that.filterOptions, function(optionValue){
        that['optionEl-'+optionValue].empty().append(that.getWording('term.'+optionValue));
      });
    },

    changeLanguage: function(){
    }
  }

});

define("Views/EventView", ["Views/View"], function(){});

qx.Class.define("DetailView", {
	
	extend : View,
	type: "singleton",

	properties: {
	},

	construct: function(){
		var that = this;

		that.setViewId('detailView');
		// that.setLoadable(true);

		that.record = null;
	},

	members : {
		
		render: function(){
			var that = this;

			// view container
			that.view = $("<div />");
			that.view.attr('id', that.getViewId());

			// TODO: remove this IE css hack when possible
			if( L.Browser.ie ) that.view.css('overflow', 'auto');

			// heading
			that.headingContainer = $("<div />").addClass('heading');
			that.heading = $("<h1 />");
			that.headingContainer.append(that.heading);
			that.view.append(that.headingContainer);

			// back button
			that.createBackBtn(function(){
				if( that.view.hasClass('active-large') ) {
					that.resize(1);
          that.say('detailViewMobileMinimized');
				}
				else {
					that.close();
				}
			});

			// scrollable content container
			that.scrollContainer = $("<div />").addClass('scroll-container');
			that.view.append(that.scrollContainer);
			if( APP.getUserDevice() == 'desktop') that.scrollContainer.perfectScrollbar();

			// certificate badge
			var thePopper;
			that.certificateBadge = $("<div />")
				.addClass('badge badge-certificate')
				.hover(
					function(){
					  thePopper = new Popper(
						    that.certificateBadge,
						    {
						        content: that.getWording('tooltip.certificate'),
						        contentType: 'html'
						    },
						    {
					        placement: 'right',
									removeOnDestroy: true
						    }
						);
					},
					function(){
						thePopper.destroy();
					}
				);
		  that.scrollContainer.append(that.certificateBadge);

		  // message button
			that.messageBtn = $("<div />")
				.addClass('message-btn')
				.click(function(){
		   		APP.getFormView().load( 'contact', { entry: that.record, mustaches: { recipient: that.record.name } } );
				});
		  that.view.append(that.messageBtn);

			////////////////////
			// image property //
			////////////////////
			that.imageContainer = $("<div />").addClass('image-container');
			that.scrollContainer.append(that.imageContainer);
			
			//////////////////////
			// other properties //
			//////////////////////
			
			// generic
			var properties = ['category', 'times', 'descriptionShort', 'description', 'speakerPublic', 'spokenLanguages', 'location', 'arrival', 'openingHours', 'phone', 'mail', 'web', 'facebook'];
			_.each(properties, function(prop){

				that['propertyContainer'+prop] = $("<div />").addClass('property ' + prop);
				
				that['propertyIcon'+prop] = $("<div />").addClass('property-icon');
				that['propertyContainer'+prop].append(that['propertyIcon'+prop]);
				
				var catText = $("<div />").addClass('property-text');
				that['propertyName'+prop] = $("<p />").addClass('property-name');
				that['propertyValue'+prop] = $("<p />").addClass('property-value');
				catText.append(that['propertyName'+prop]);
				catText.append(that['propertyValue'+prop]);
				that['propertyContainer'+prop].append(catText);
				
				// navigation hook
				if(prop == 'location'){
					var $link = $("<a />").css('display', 'none').attr('target', '_blank');
					that.scrollContainer.append($link);
					that['propertyContainer'+prop].click(function(){
						if( that.record.location[0] ){
							var userLocation = APP.getMapView().getUserLocation();
							if ( userLocation )
							   // $link.attr('href', 'http://maps.google.com/?saddr=' + userLocation.lat + ',' + userLocation.lon + '&daddr=' + that.record.location[0].lat + ',' + that.record.location[0].lon);
							   $link.attr('href', 'https://www.google.com/maps/dir/'+userLocation.lat+','+userLocation.lon+'/'+that.record.location[0].lat+','+that.record.location[0].lon+'/data=!4m2!4m1!3e3');
							else
							   // $link.attr('href', 'http://maps.google.com/?daddr=' + that.record.location[0].lat + ',' + that.record.location[0].lon);
							   $link.attr('href', 'https://www.google.com/maps/dir//'+that.record.location[0].lat+','+that.record.location[0].lon+'/data=!4m2!4m1!3e3');

							$link[0].click();
						}
					});
				}
				else if(prop == 'descriptionShort'){
					that['propertyContainer'+prop].click(function(){
						if( that.record.description ) that.toggleLongDescription();
					});
				}

				that.scrollContainer.append(that['propertyContainer'+prop]);

			});

			////////////////////
			// link to parent //
			////////////////////
			that.linkedEntriesContainer = $("<div />").addClass('property linkedentries');
			that.scrollContainer.append(that.linkedEntriesContainer);

			//////////////////
			// share button //
			//////////////////
			that.shareButton = $("<button />").addClass('btn-share').append('share')
				.click(function(){
					that.mobileShare();
				});
			that.scrollContainer.append(that.shareButton);					

			////////////////
			// timestamps //
			////////////////
			that.timestampContainer = $("<div />").addClass('property timestamp');
			that.scrollContainer.append(that.timestampContainer);

			$('#main-container').append(that.view);

			this.base(arguments);
		},

		mobileShare: function(){
			var that = this;
			navigator.share({
			    title: document.title,
			    text: "Hello World",
			    url: window.location.href
			}).then(() => console.log('Successful share'))
			.catch(error => console.log('Error sharing:', error));
		},
		toggleLongDescription: function(){
			var that = this;

			var short = that['propertyContainer'+'descriptionShort'];
			var long = that['propertyContainer'+'description'];
			if( long.hasClass('hidden') ) {
				long.removeClass('hidden');
				short.removeClass('read-more');
			}
			else {
				long.addClass('hidden');
				short.addClass('read-more');
			}

			
		},

		load: function( record ){
			var that = this;
			
			// get parent orga
			that.parent = null;
			if(record.parentOrgaId) that.parent = APP.getDataManager().getOrgaById(record.parentOrgaId);

			// set URL
			var entryType = record.entryType == 'orga'? 'project' : record.entryType;
			APP.getRouter().setUrl(entryType, record.id, record.name);

			if(that.record) {
				that.reset();
			}

			// set current record
			that.record = record;

			// view
			that.setViewState(1);
			that.view.addClass('type-' + record.type);
			if(record.category) that.view.addClass('cat-' + record.category.name);

			// scroll
			that.scrollContainer.scrollTop(0);
			that.scrollContainer.perfectScrollbar('update');

			// heading
			that.heading.append(record.name ? record.name : '');
			if(record.category) that.headingContainer.addClass('cat-' + record.category.name);

			// certificate badge
			if(record.certified) that.certificateBadge.show();

			// message button
			if(record.mail) that.messageBtn.show();

			////////////////////
			// image property //
			////////////////////
			if( record.imageType && record.image ) {
				
				switch(record.imageType){
					case 'youtube':
						// supposed, yt link is as 'https://www.youtube.com/watch?v=RURToWXI6QM'
						var ytid = record.image.substr(32);
						var ytEmbed = $( '<iframe width="100%" src="https://www.youtube.com/embed/' + ytid + '?rel=0&amp;showinfo=0' + '" frameborder="0" allowfullscreen></iframe>');
						that.imageContainer.append(ytEmbed);
						break;
					case 'image':
						var image = $( '<img src="' + record.image + '"/>');
						that.imageContainer.append(image);
						break;
				}

				that.imageContainer.addClass('active');
			}

			// dont show read more link if there is no long description
			if( !record.description ) that['propertyContainer'+'descriptionShort'].removeClass('read-more');

			//////////////////////
			// other properties //
			//////////////////////
			
			// category
			var prop = 'category';
			var propName = record[prop] ? record[prop].name : null;
			that['propertyIcon'+prop].addClass('cat-' + propName);
			// TODO dirty code for subcategory, but hey ;)
			that['propertyIcon'+prop].addClass('subcat-' + record.subCategory);
			that['propertyIcon'+prop].addClass('type-' + record.type);
			that['propertyName'+prop].append( record.subCategory ? that.getWording('cat.' + record.subCategory) : that.getWording('cat.' + propName) );

			// var createEntityLabel = { 0: that.getWording('entity_orga'), 1: that.getWording('entity_market'), 2: that.getWording('entity_event') };
			function createEntityLabel( record ){
				switch( record.type ){
					case 0:
					return that.getWording('entity.orga');
					case 1: 
					return record.offer ? that.getWording('entity.market.offer') : that.getWording('entity.market.request');
					case 2:
					return that.getWording('entity.event');
				}
			}
			// var value = entityLabels[record.type];
			var value = createEntityLabel(record);
			that['propertyValue'+prop].append(value);
			// if(record.location.length) that['propertyValue'+prop].append('&nbsp;&nbsp;&nbsp;&nbsp;').append( $("<span />").addClass('glyphicon glyphicon-map-marker') );
			that['propertyContainer'+prop].show();

			// location
			var prop = 'location';
			that['propertyIcon'+prop].addClass('icon-' + prop);
			that['propertyName'+prop].append( that.getWording( 'prop.' + prop ) );
			
			var value = (record.location.length > 0) ? buildLocation(record) : that.getWording( 'prop.location.none' );
			function buildLocation(record){
				var location = '';
				if( record.location[0].placename ) location += record.location[0].placename + '<br>';
				if( record.location[0].street ) location += record.location[0].street + '<br>';
				if( record.location[0].zip && record.location[0].city) location += record.location[0].zip + ' ' + record.location[0].city + '<br>';
				else if( record.location[0].city ) location += record.location[0].city + '<br>';
				return location;
			}
			if( value.length > 0 ) {
				that['propertyValue'+prop].append(value);
				that['propertyContainer'+prop].show();
			}

			// time information
			var prop = 'times';
			that['propertyIcon'+prop].addClass('icon-' + prop);
			that['propertyName'+prop].append( that.getWording( 'prop.' + prop ) );
			
			var value = APP.getUtility().buildTimeString(record);

			if( value.length > 0 ) {
				that['propertyValue'+prop].append(value);
				that['propertyContainer'+prop].show();
			}

			// generic
			var properties = APP.getConfig().simpleProperties;
			_.each(properties, function(prop){

				var propValue = record[prop];

				// handle inheritance
				if(that.parent){
					if(prop == 'descriptionShort' && record.inheritance.short_description){
						propValue = '';
						if(that.parent.descriptionShort) propValue += that.parent.descriptionShort + '\n\n';
						if(record.descriptionShort) propValue += record.descriptionShort;
					}
					// TODO ausbauen, da wir eigentlich die lange Beschreibung nicht vererben wollen
					else if(prop == 'description' && !propValue){
						propValue = '';
						if(that.parent.description) propValue += that.parent.description;
					}
				}

				if(propValue == '') propValue = null;

				// only render property if available
				if( propValue ) {
					
					that['propertyIcon'+prop].addClass('icon-' + prop);
					that['propertyName'+prop].append( that.getWording( 'prop.' + prop ) );
					
					// may create link
					if( _.contains( ['web', 'facebook'], prop) ){
						that['propertyValue'+prop].append('<a target="_blank" href="' + propValue + '">' + propValue + '</a>');
					}
					else if( _.contains( ['description', 'descriptionShort'], prop) ){
						that['propertyValue'+prop].append(propValue.replace(/(?:\r\n|\r|\n)/g, '<br />'));

						if(record.descriptionShort) that['propertyContainer'+'description'].addClass('hidden');
					}
					else if( _.contains( ['spokenLanguages'], prop) ){
						_.each( propValue.split(',') , function( langCode ){
							const span = $('<span />')
								.addClass('multiselect-value')
								.append( that.getWording('lan.' + langCode) );
							that['propertyValue'+prop].append( span );
						});
					}
					else {
						that['propertyValue'+prop].append(propValue);
					}

					that['propertyContainer'+prop].show();
				}
				else if( record.location[0] && record.location[0][prop] ) {
					
					that['propertyIcon'+prop].addClass('icon-' + prop);
					that['propertyName'+prop].append( that.getWording( 'prop.' + prop ) );

					if( _.contains( ['arrival'], prop) ){
						that['propertyValue'+prop].append(record.location[0][prop].replace(/(?:\r\n|\r|\n)/g, '<br />'));
					} 
					else if( _.contains( ['openingHours'], prop) ){
						that['propertyValue'+prop].append(record.location[0][prop].replace(/(?:\r\n|\r|\n)/g, '<br />'));
					}
					else {
						that['propertyValue'+prop].append(record.location[0][prop]);
					}
					
					that['propertyContainer'+prop].show();
				}

			});

			if(that.parent){
				
				var propertyText = $('<div />').addClass("property-text");
				that.linkedEntriesContainer.append(propertyText);
				
				// property name
				var name = $("<p />")
					.addClass('property-name')
					.append(function(){
						return (record.entryType == 'orga')? that.getWording('term.parent.orga') : that.getWording('term.parent.organiser');
					}());
				propertyText.append(name);
				
				// property value
				var value = $("<p />")
					.addClass('property-value')
					.append(that.parent.name)
					.click(function(e){
						e.preventDefault();
			    	APP.getMapView().loadEntry(that.parent, {setView: true});
					});
				propertyText.append(value);
				
				that.linkedEntriesContainer.show();
			}

			if(record.updated_at){
				that.timestampContainer.append(that.getWording('prop.updated') + ' ' + moment(record.updated_at).format('DD.MM.YYYY'));
				that.timestampContainer.show();
			}

			// show DetailView
			that.view.addClass('active');
      that.isActive(true);

			if( APP.getUserDevice() == 'desktop') that.scrollContainer.perfectScrollbar('update');

			that.say('detailViewOpened');
		},

		reset: function() {
			var that = this;

			// view
			that.view.removeClass('type-0 type-1 type-2 type-3');
			that.view.removeClass (function (index, css) {
				return (css.match (/(^|\s)cat-\S+/g) || []).join(' ');
			});

			// heading
			that.heading.empty();
			that.headingContainer.removeClass (function (index, css) {
				return (css.match (/(^|\s)cat-\S+/g) || []).join(' ');
			});

			that.certificateBadge.hide();
			that.messageBtn.hide();

			// image property
			that.imageContainer.empty();
			that.imageContainer.removeClass('active image youtube');

			// entry icon
			that['propertyIconcategory'].removeClass('type-0 type-1 type-2 type-3');
			that['propertyIconcategory'].removeClass (function (index, css) {
				return (css.match (/(^|\s)cat-\S+/g) || []).join(' ');
			});
			that['propertyIconcategory'].removeClass (function (index, css) {
				return (css.match (/(^|\s)subcat-\S+/g) || []).join(' ');
			});
			
			// description toggling
			that['propertyContainer'+'descriptionShort'].addClass('read-more');
			that['propertyContainer'+'description'].removeClass('hidden');

			// generic
			var properties = _.union( ['category', 'location', 'times'], APP.getConfig().simpleProperties );
			
			_.each(properties, function(prop){
				that['propertyIcon'+prop].removeClass (function (index, css) {
					return (css.match (/(^|\s)icon-\S+/g) || []).join(' ');
				});
				that['propertyName'+prop].empty();
				that['propertyValue'+prop].empty();
				that['propertyContainer'+prop].hide();
			});

			// timestamp
			that.timestampContainer.empty().hide();
			
			// linked entries
			that.linkedEntriesContainer.empty().hide();
			
			// delete current record
			that.record = null;
		},

		close: function() {
			var that = this;
			
			// only close if active
			if(!that.getViewState()) return;

			that.view.removeClass('active');
			that.reset();
			that.setViewState(0);
      that.isActive(false);
			that.say('detailViewClosed');
		},

		changeLanguage: function(){
			var that = this;
		},

		addEvents: function() {
			var that = this;

			this.base(arguments);

			that.listen('searchFieldFocused', function(){
				// if( APP.getUserDevice() === 'mobile' )
					that.close();
				// else
				// 	that.view.addClass('right');
			});

			that.listen('searchViewLoaded', function(){
				that.close();
			});

			that.listen('fetchedNewData', function(){
				if( that.record !== null) {
					// reload record
			    var newRecord = APP.getDataManager().getEntryByEntryId(that.record.entryId);
			    that.reset();
			    that.load(newRecord);
				}
			});

			that.listen('includeViewOpened', function(){
				that.close();
			});

			that.listen('filterSet', function(){
				that.close();
			});

			that.listen('includeViewClosed', function(){
			});

			that.listen('mapMarkerDeselected', function(){
				that.close();
			});

			that.listen('mapclicked', function(){
				that.close();
			});

			that.headingContainer.click(function(){
				if( APP.getUserDevice() === 'desktop' || APP.getUserDevice() === 'tablet' )
					APP.getMapView().selectMarkerFromLink(that.record);
			});
		}

	}

});
define("Views/DetailView", ["Views/View"], function(){});

qx.Class.define("MenuView", {
    
    extend : View,
	type: "singleton",

    construct: function(){
    	var that = this;

        that.setViewId('menuView');
    },

    members : {
        
    	render: function(){
    		var that = this;

            // view container
            that.view = $("<div />");
            that.view.attr('id', that.getViewId());
            $('#main-container').append(that.view);

            // menu
            that.menu  = $("<div />");
            that.menu.attr('id', 'main-menu');
            that.view.append(that.menu);

            // logo
            var a = $('<a />')
                .attr('href', 'https://afeefa.de')
                .attr('id', 'logo');
            that.logo  = $('<img />').attr({
                'src': APP.getConfig().imgPath + 'afeefa_light.svg',
                alt: 'Afeefa Logo',
                title: 'Afeefa Logo'
            });
            a.append(that.logo);
            that.menu.append(a);
            
            // btn refugee guide
            // that.refugeeBtn = $('<div />').addClass('item refugee-guide');
            // that.refugeeLBtnLabel = $('<span />');
            // that.refugeeBtn.append(that.refugeeLBtnLabel);
            // that.menu.append(that.refugeeBtn);

            // btn supporter guide
            // that.supporterBtn = $('<div />').addClass('item supporter-guide');
            // that.supporterBtnLabel = $('<span />');
            // that.supporterBtn.append(that.supporterBtnLabel);
            // that.menu.append(that.supporterBtn);
            
            
            // btn about
            that.aboutBtn = $('<div />').addClass('item about');
            that.aboutBtnLabel = $('<a />')
                .attr('href', 'https://about.afeefa.de')
                .attr('target', '_blank');
            that.aboutBtn.append(that.aboutBtnLabel);
            that.menu.append(that.aboutBtn);

            // btn press
            that.pressBtn = $('<div />').addClass('item press');
            that.pressBtnLabel = $('<span />');
            that.pressBtn.append(that.pressBtnLabel);
            that.menu.append(that.pressBtn);

            // btn imprint
            that.imprintBtn = $('<div />').addClass('item imprint');
            that.imprintBtnLabel = $('<span />');
            that.imprintBtn.append(that.imprintBtnLabel);
            that.menu.append(that.imprintBtn);

            // btn facebook
            that.facebookBtn = $('<div />').addClass('item facebook');
            that.facebookBtnLabel = $('<a />')
                .attr('href', 'https://www.facebook.com/afeefa.de')
                .attr('target', '_blank');
            that.facebookBtn.append(that.facebookBtnLabel);
            that.menu.append(that.facebookBtn);

            // logo
            var a = $('<a />').attr({
                'id': 'dfa-logo',
                'href': 'http://dresdenfueralle.de',
                'target': '_blank'
            });
            that.dfaLogo  = $('<img />').attr({
                'src': APP.getConfig().imgPath + 'icon_37.svg',
                alt: 'Dresden für Alle Logo',
                title: 'Dresden für Alle Logo'
            });
            a.append(that.dfaLogo);
            that.menu.append(a);

            // fb like btn
            // that.menu.append('<div class="fb-like" data-href="https://www.facebook.com/afeefa.de" data-layout="button" data-action="like" data-show-faces="false" data-share="false"></div>');

            this.base(arguments);
    	},

        addEvents: function(){
            var that = this;

            // call superclass
            this.base(arguments);
            
            // that.refugeeBtn.click(function(){
            //     that.close();
            //     APP.getIncludeView().load( APP.getIncludeView().getIncludes().refugeeGuide );
            // });

            // that.supporterBtn.click(function(){
            //     that.close();
            //     APP.getIncludeView().load( APP.getIncludeView().getIncludes().supporterGuide );
            // });

            // that.aboutBtn.click(function(){
            //     that.close();
            //     APP.getIncludeView().load( APP.getIncludeView().getIncludes().about );
            // });

            that.pressBtn.click(function(){
                that.close();
                APP.getIncludeView().load('press');
            });

            that.imprintBtn.click(function(){
                that.close();
                APP.getIncludeView().load('imprint');
            });

            that.listen('curtainclicked', function(){
                that.close();
            });

            that.listen('mainMenuBtnClicked', function(){
                that.load();
            });

            // interferring with other left shifting menus
            that.listen('languageMenuOpened', function(){
                that.menu.addClass('hidden');
            });

            that.listen('shiftMenuClosed', function(){
                that.menu.removeClass('hidden');
            });
            
            // that.listen('includeViewClosed', function(){
            //     that.load();    
            //     that.say('mainMenuOpened');
            // });

            ////////////////////
            // swipe gestures //
            ////////////////////
            var hammer = new Hammer(that.view[0]);
            hammer.on('swipeleft', function(ev){
                that.close();
            });

        },

        load: function(){
            var that = this;

            that.reset();

            $('#main-container').addClass('shifted');

            that.aboutBtnLabel.append( that.getWording('menu.about') );
            that.pressBtnLabel.append( that.getWording('menu.press') );
            that.imprintBtnLabel.append( that.getWording('menu.imprint') );
            that.facebookBtnLabel.append( that.getWording('menu.facebook') );

        },

        reset: function(){
            var that = this;

            that.aboutBtnLabel.empty();
            that.pressBtnLabel.empty();
            that.imprintBtnLabel.empty();
            that.facebookBtnLabel.empty();

        },

        close: function(){
            var that = this;

            $('#main-container').removeClass('shifted');
        },

        changeLanguage: function(){
            var that = this;
        }
    }

});
define("Views/MenuView", ["Views/View"], function(){});

qx.Class.define("LegendView", {
	
  extend : View,
  type: "singleton",

  properties: {
	categories: {}
  },

  construct: function(){
	var that = this;

	that.setViewId('legendView');
	that.setCategories( APP.getConfig().categories);
	// that.setCategories( _.union( APP.getConfig().categoriesIni, APP.getConfig().categoriesMarket ) );
  },

  members : {
	  
	render: function(){
	  var that = this;

	  // view container
	  that.view = $("<div />");
	  that.view.attr('id', that.getViewId());

	  if( APP.getUserDevice() == 'desktop') that.view.perfectScrollbar();

	  /////////////
	  // Heading //
	  /////////////
	  // that.headingContainer = $("<div />").addClass('heading');
	  // that.heading = $("<h2 />");
	  // that.headingContainer.append(that.heading);

	  //////////////////
		// Filter Reset //
		//////////////////
	  that.filterModuleReset  = $("<div />");
	  that.filterModuleReset.attr('class', 'filter-module reset-module');
	  that.view.append(that.filterModuleReset);
		
		// button
		that.resetBtn = $("<div />")
			.addClass('btn')
			.click(function() {
				that.resetFilter();
			});
		that.filterModuleReset.append(that.resetBtn);

	  ///////////////////
	  // Entity filter //
	  ///////////////////
	  that.filterModuleEntity  = $("<div />");
	  that.filterModuleEntity.attr('class', 'filter-module entity-module');
	  that.view.append(that.filterModuleEntity);

	  // module heading
	  that.moduleHeadingEntity = $("<h3 />");
	  that.filterModuleEntity.append(that.moduleHeadingEntity);

	  // entities
	  var rowContainer = $("<div />")
		.addClass('row-container');
	  
	  _.each( {0: 'orga', 2: 'event', 1: 'market'}, function(value, key){
			var entityContainer = $("<div />")
			  .addClass('entity-container')
			  .click(function() {
					that.setFilter( {type: key} );
			  });
			var entity = $("<div />")
			  .addClass('entity type-' + key);
			var entityLabel = $("<span />")
			  .addClass('label');
			that['label-entity-' + value] = entityLabel; 
			entityContainer.append(entity);
			entityContainer.append(entityLabel);
			rowContainer.append(entityContainer);
	  });
	  
	  that.filterModuleEntity.append(rowContainer);

	  //////////////////////
	  // Category filter //
	  //////////////////////
	  that.filterModuleCat  = $("<div />");
	  that.filterModuleCat.attr('class', 'filter-module category-module');
	  that.view.append(that.filterModuleCat);

	  // module heading
	  that.moduleHeadingCategory = $("<h3 />");
	  that.filterModuleCat.append(that.moduleHeadingCategory);

	  // categories
	  _.each( that.getCategories(), function(cat){
			// container
			var container = $("<div />");
			container.addClass('std-container');

			// cat container
			var catContainer = $("<div />");
			catContainer.addClass('cat-container');
			catContainer.addClass('cat-' + cat.name);
		
		  // icon
		  var icon = $("<div />")
		  	.addClass('icon ' + 'cat-' + cat.name)
			  .click(function() {
					that.setFilter( {category: cat.name} );
					that.reset();
					container.addClass('extended');
			  });
		  catContainer.append(icon);
		  
		  // label
		  that['label-' + cat.id] = $("<p />")
		  	.click(function() {
					that.setFilter( {category: cat.name} );
					that.reset();
					container.addClass('extended');
			  });
		  catContainer.append(that['label-' + cat.id]);
		  
		  // nippus
		  var nippus = $("<div />");
		  nippus.addClass('nippus');
		  nippus.click(function() {
				var wasExtended = container.hasClass('extended');
				// reset all containers (this one and all others)
				that.reset();
				container.toggleClass('extended', !wasExtended);
		  });
		  catContainer.append(nippus);

		  container.append(catContainer);
		  
			// sub cat container
			var subContainer = $("<div />");
			subContainer.addClass('sub-container');
			subContainer.addClass('cat-' + cat.name);
			catContainer.append(subContainer);

		  // sub categories
		  // TODO replace dummy data
		  _.each( cat.sub, function(subcat){
				var subCatContainer = $("<div />");
				subCatContainer.addClass('subcat-container');
				subCatContainer.addClass('cat-' + cat.name + ' subcat-' + subcat.name);

				// icon
				var subIcon = $("<div />");
				subIcon.addClass('icon ' + 'subcat-' + subcat.name);
				subIcon.click(function(){
				  that.setFilter( {subCategory: subcat.name} );
				});
				subCatContainer.append(subIcon);

				// label
				that['label-' + subcat.id] = $("<p />");
				that['label-' + subcat.id].click(function() {
				  that.setFilter( {subCategory: subcat.name} );
				});
				subCatContainer.append(that['label-' + subcat.id]);
				
				subContainer.append(subCatContainer);
		  });
		  
		  container.append(subContainer);
			
			that.filterModuleCat.append(container);
	  });


		//////////////////////
	  // Attribute filter //
	  //////////////////////
	  that.filterModuleAttribute  = $("<div />");
	  that.filterModuleAttribute.attr('class', 'filter-module attribute-module');
	  that.view.append(that.filterModuleAttribute);

	  // module heading
	  that.moduleHeadingAttribute = $("<h3 />");
	  that.moduleHeadingAttribute.append('Details');
	  that.filterModuleAttribute.append(that.moduleHeadingAttribute);

	  // attributes
	  _.each( {'forChildren': 'bool', 'supportWanted': 'bool'}, function(value, key){
			
			function setAttrFilter(value) {
				if( value ) {
					const filter = {};
					filter[key] = value;
					that.setFilter(filter);
				} else {
					that.resetFilter();	
				}
			}
			
			var attributeContainer = $("<div />")
			  .addClass('attribute-container');
			
			var attrFormElement = $("<input />")
				.attr('type', 'checkbox')
				.click(function() {
					var value = $(this).prop("checked");
					setAttrFilter( value );
			  });
			attributeContainer.append(attrFormElement);

			var attrLabel = $("<label />")
				.append(that.getWording('prop.' + key))
				.click(function(){
					attrFormElement.prop("checked", !(attrFormElement.prop("checked")) );
					setAttrFilter( attrFormElement.prop("checked") );
				});
			attributeContainer.append(attrLabel);

	  	that.filterModuleAttribute.append(attributeContainer);
	  });

	  $('#main-container').append(that.view);

	  this.base(arguments);

	  that.load();
	},

	  load: function(){
		  var that = this;

		  _.each( that.getCategories(), function(cat){
			  
			  that['label-' + cat.id].append( that.getWording('cat.' + cat.name) );

			  var condition = function(){
        	return (that.view.css('right') == '0px');
        };

			  that.createTooltip(
	        that['label-' + cat.id].parent(),
	        function(){
	          return that.getWording('cat.' + cat.name + '.description');
	        }(),
	        'hover',
	        'left',
	        'desktop',
	        null,
	        null,
	        condition
	      );

			  _.each( cat.sub, function(subcat){
				  that['label-' + subcat.id].append( that.getWording('cat.' + subcat.name) );

				  that.createTooltip(
		        that['label-' + subcat.id].parent(),
		        function(){
		          return that.getWording('cat.' + subcat.name + '.description');
		        }(),
		        'hover',
		        'left',
		        'desktop',
		        null,
		        null,
		        condition
		      );
			  });

		  });

		  _.each( {0: 'orga', 1: 'market', 2: 'event'}, function(value, key){
		  	that['label-entity-' + value].append(that.getWording('entity.' + value));
		  });

		  that.resetBtn.append( that.getWording('misc.filterReset') );
	  	that.moduleHeadingEntity.append(that.getWording('entry.type'));
	  	that.moduleHeadingCategory.append(that.getWording('category'));
	  	that.moduleHeadingAttribute.append(that.getWording('label.attribute.filter'));
	  },

	  // used for mobile instead of mouse hover
	  show: function(silent){
	  	var that = this;

		  if(!silent) that.showCurtain(true);
		  that.view.addClass('active');
	  },

	  setFilter: function( filterOptions ){
		  var that = this;

		  // consequences
		  // TODO close detailView if location gets unavailable
		  // TODO if an unavailable location is selected inside the guides, the filter has to be disabled
		  
		  APP.setActiveFilter(filterOptions);
		  that.say('filterSet', APP.getActiveFilter());
      if( APP.getUserDevice() == 'mobile') that.close();
	  },

	  resetFilter: function(){
		  var that = this;

	  	// only fire reset if filter really changed
		  if(APP.getActiveFilter() != null){
			  APP.setActiveFilter(null);
			  that.say('filterSet');
				that.view.scrollTop(0);
				that.view.perfectScrollbar('update');
		  }
	  },

	  reset: function(){
		  var that = this;

		  that.filterModuleCat.find('.std-container').removeClass('extended');
	  },

	  addEvents: function(){
		  var that = this;

		  // call superclass
		  this.base(arguments);
		  
		  that.listen('filterSet', function(){

			  var filter = APP.getActiveFilter();

			  if( filter ) {
				  
				  that.view.addClass('filter-active');  
				  
				  that.view.find('.cat-container, .subcat-container').addClass('inactive');
				  
				  const currentCatContainers = that.view.find('.cat-container.cat-' + filter.category);
				  currentCatContainers.removeClass('inactive');
				  currentCatContainers.parent().find('.subcat-container').removeClass('inactive');
				  
				  const currentSubcatContainers = that.view.find('.subcat-container.subcat-' + filter.subCategory);
				  currentSubcatContainers.removeClass('inactive');
				  currentSubcatContainers.parents('.std-container').find('.cat-container').removeClass('inactive');
			  
			  } else {
			  
				  that.view.removeClass('filter-active');
				  that.filterModuleCat.find('.cat-container, .subcat-container').removeClass('inactive');
				  that.filterModuleCat.find('.std-container').removeClass('extended');
			  }

		  });

			that.listen('curtainclicked', function(){
        	if( that.view.hasClass('active') ) that.close();
  		});

  		////////////////////
      // swipe gestures //
      ////////////////////
      var hammer = new Hammer(that.view[0]);
      hammer.on('swiperight', function(ev){
          if( that.view.hasClass('active') ) that.close();
      });

      // show on hover
			that.view.hover(
			  function() {
			  	that.show();
			  }, function(e) {
			  	// only react if view is really active
          // firefox fires mouseleave while transition (bug), so additionally check current css state
		  		if( that.view.hasClass('active') && ($(this).css('right') == '0px') ) that.close();
			  }
			);

  		that.listen('searchViewClosed', function(){
				that.resetFilter();
  		});
	  },

	  close: function(){
		  var that = this;

		  that.showCurtain(false);
		  that.view.removeClass('active');
		  
		  // TODO: only do in mobile version
		  // that.addRequestBtn.css('display', 'none');
		  // that.addOfferBtn.css('display', 'none');
	  },

	  changeLanguage: function(){
		  var that = this;

		  // clear labels
		  _.each( that.getCategories(), function(cat){
			  that['label-' + cat.id].empty();

			  _.each( cat.sub, function(subcat){
				  that['label-' + subcat.id].empty();
			  });
		  });

		  _.each( {0: 'orga', 1: 'market', 2: 'event'}, function(value, key){
		  	that['label-entity-' + value].empty();
		  });

		  that.resetBtn.empty();

		  that.moduleHeadingEntity.empty();
	  	that.moduleHeadingCategory.empty();
	  	that.moduleHeadingAttribute.empty();

		  that.load();
	  }
  }

});

define("Views/LegendView", ["Views/View"], function(){});

qx.Class.define("LanguageView", {
	
	extend : View,
	type: "singleton",

	construct: function(){
		var that = this;

		that.setViewId('languageView');
	},

	members : {
		
		render: function(){
			var that = this;

			// view container
			that.view = $("<div />");
			that.view.attr('id', that.getViewId());

			that.languageTranslations = {
				de: 'Deutsch',
				'en': 'English',
				ar: 'العربية',
				'fa': 'فارسی',
				'fr': 'Français',
				'ru': 'русский',
				'ps': 'پښتو',
				'ku': 'کوردی',
				'es': 'español',
				'sq': 'Shqip',
				'sr': 'Српски',
				'ti': 'ቋንቋ ትግርኛ',
				'tr': 'Türkçe',
				'ur': 'اردو'
			}

			// circle button to open
			that.langBtn = $("<div />")
				.attr('id', 'lang-btn')
				.addClass(APP.getLM().getCurrentLang())
				.click(function(){
					that.open();
				});

				that.createTooltip(
	        that.langBtn,
	        function(){
	          return that.getWording('languageselection.button.main');
	        }(),
	        'hover',
	        'left',
	        'desktop'
	      );

				that.view.append(that.langBtn);

			// list container
			that.listContainer = $("<div />")
				.attr('id', 'list-container');
			
	  	if( APP.getUserDevice() == 'desktop') that.listContainer.perfectScrollbar();
			that.view.append(that.listContainer);

			// all the languages as list items
			that.listItems = [];

			_.each( APP.getConfig().languages, function(lang){
				var langItem = $("<div />")
					.addClass('lang-item ' + lang)
					.click(function(){
						that.close();

						sessionStorage.setItem("languageFrozen", 1);

						APP.getDataManager().getUITranslations(lang, function(data){
	            APP.getLM().setBib(data);
							
							// change language if different from currently selected one
							if( lang != APP.getLM().getCurrentLang() )
								that.say('languageChanged', lang);
						});
					});
				
				var flag = $("<div />")
					.addClass('lang-item-flag ' + lang);
					
				var label = $("<div />")
					.addClass('lang-item-label');

				langItem.append(flag);
				langItem.append(label);

				that.listItems.push( {el: langItem, label: label, lang: lang} );

				that.listContainer.append(langItem);
			});
			
			$('#main-container').append(that.view);

			this.base(arguments);
		},

		load: function(){
			var that = this;

			_.each( that.listItems, function(item){
				// highlight current language
				item.el.removeClass('active');
				if( item.el.hasClass( APP.getLM().getCurrentLang() ) )
					item.el.addClass('active');
				
				// make labels
				item.label
					.empty()
					.append( that.languageTranslations[item.lang] )
					.append( $("<span />").append(that.getWording('lan.'+item.lang)) );
			});
		},

		open: function( cb ){
			var that = this;

			// set optional callback to call after language was selected from the list
			if(cb) that.cb = cb;

			that.isActive(true);
			that.load();

			that.view.addClass('active');
			that.showCurtain(true);

      if( APP.getUserDevice() == 'desktop') that.listContainer.perfectScrollbar('update');
		},

		addEvents: function(){
			var that = this;

			// that.listen('curtainclicked', function(){
   //      	if( that.view.hasClass('active') ) that.close();
  	// 	});

			that.listen('LanguageViewRendered', function(){
				if( !localStorage.getItem("languageFrozen") ){
					// that.open();
				}
			});

			// call superclass
			this.base(arguments);
		},

		reset: function(){
			var that = this;

			// reset all buttons
			// _.each( that.buttons, function(btn) {
			// 	btn.el.removeClass('active');
			// });

		},

		changeLanguage: function(){
			var that = this;

			that.langBtn
				.attr('class', null)
				.addClass(APP.getLM().getCurrentLang());
		},

		close: function(){
			var that = this;
			
			that.view.removeClass('active');
			that.showCurtain(false);

			// callback may have been defined when view was opened
			if(that.cb) that.cb();
			that.cb = null;
		
			that.isActive(false);
		}
	}

});
define("Views/LanguageView", ["Views/View"], function(){});

qx.Class.define("PlusView", {
	
	extend : View,
	type: "singleton",

	properties: {
	},

	construct: function(){
		var that = this;

		that.setViewId('plusView');
	},

	members : {
		
		render: function(){
			var that = this;

			// view container
			that.view = $("<div />");
			that.view.attr('id', that.getViewId());
			
			// locate btn
			that.locateBtn = $("<div />")
				.addClass('button locateBtn')
				// .attr('id', 'locate-btn')
				.click(function(){
					APP.getMapView().locate(true);
				})
				.on('touchend', function(){
					APP.getMapView().locate(true);
				});
			that.view.append(that.locateBtn);

			that.createTooltip(
        that.locateBtn,
        function(){
          return that.getWording('button.locate');
        }(),
        'hover',
        'left',
        'desktop'
      );

			$('#main-container').append(that.view);

			this.base(arguments);
		},

		load: function(){
			var that = this;
		},

		addEvents: function(){
			var that = this;

			// call superclass
			this.base(arguments);
		},

		changeLanguage: function(){
			var that = this;

			that.load();
		}
	}

});
define("Views/PlusView", ["Views/View"], function(){});

qx.Class.define("FormView", {

    extend: View,
    type: "singleton",

    properties: {
        baseUrl: {},
        formTypes: {},
        currentForm: {}
    },

    construct: function () {
        var that = this;

        that.setViewId('formView');
        that.setLoadable(true);
        that.setBaseUrl(APP.getConfig().includePathForHtmlFiles);

        that.setFormTypes({
            feedback: {
                name: 'feedback',
                templateFile: 'form_feedback.html',
                sendMethod: that.createFeedback,
                urlSlag: 'feedback'
            },
            contact: {
                name: 'contact',
                templateFile: 'form_contact.html',
                sendMethod: that.createContact
            },
            newEntry: {
                name: 'newEntry',
                templateFile: 'form_newEntry.html',
                sendMethod: that.createEntry,
                urlSlag: 'add'
            }
        });

        that.setCurrentForm(null);
    },

    members: {

        render: function () {
            var that = this;

            // view container
            that.view = $("<div />");
            that.view.attr('id', that.getViewId());

            $('#main-container').append(that.view);

            // heading
            var headingContainer = $("<div />").addClass('heading');
            that.heading = $("<h1 />");
            headingContainer.append(that.heading);
            that.view.append(headingContainer);

            // back button
            that.createBackBtn(function(){that.close();});

            // form container
            that.scrollContainer = $("<div />")
                .addClass('scroll-container');
            if (APP.getUserDevice() == 'desktop') that.scrollContainer.perfectScrollbar();
            that.view.append(that.scrollContainer);

            this.base(arguments);
        },

        load: function (type, options) {
            var that = this;

            if(that.getFormTypes()[type].urlSlag) APP.getRouter().setUrl(that.getFormTypes()[type].urlSlag);

            // load form from html and insert
            that.scrollContainer.load(that.getBaseUrl() + that.getFormTypes()[type].templateFile, function( response, status, xhr ){
                if(status == "error" ){}

                // fill mustaches with values
                var filledHtml = that.fillMustaches(that.scrollContainer.html(), (options && options.mustaches)? options.mustaches : null);
                that.scrollContainer.html(filledHtml);

                // init character counters
                that.view.find('input, textarea').each(function(i, el){
                    $(el).characterCounter();
                });

                that.view.find('input.datepicker').each(function(i, el){
                    $(el).val('2017-12-24');
                });

                // init select dropdowns
                that.view.find('select').each(function(i, el){
                    $(el).material_select();
                    $(el).addClass('hidden');
                });

                that.parseForm(type, options);
                that.loadUIVocab(type);
                that.scrollContainer.perfectScrollbar('update');
            });

            that.view.addClass('active');
            that.isActive(true);
        },

        loadUIVocab: function(type){
            var that = this;

            that.heading.empty().append(that.getWording('form.heading.' + type));

            // that.view.find('label, option').each(function(i, el){
            //     var key = $(el).html().split(':')[1];
            //     console.debug(key);
            //     $(el).html(that.getWording(key));
            // });
        },

        parseForm: function(type, options){
            var that = this;

            var form = {
                formType: null,
                formEl: null,
                submitEl: null,
                fields: {}
            };

            // form type
            form.formType = that.getFormTypes()[type];

            // the form
            form.formEl = that.view.find('form').first();

            form.formEl.submit(function (e) {
                e.preventDefault();
                that.send(options);
            });

            // the fields
            that.view.find('input, textarea, select').each(function(i, el){
                var $el = $(el);

                // skip additional input elements, which were created by materialize multi select only for visual purpose
                if( $el.hasClass('select-dropdown') ) return;
                if( $el.parents('ul').first().hasClass('multiple-select-dropdown') ) return;

                form.fields[$el.attr('id')] = {
                    modelAttr: $el.attr('id'),
                    el: $el
                }
            });

            // conditional things
            that.view.find('.conditional').each(function(i, el){
                var dependentField = form.fields[$(el).attr('data-condition')].el;

                dependentField.change(function(){
                    var value = ($(this).attr('type') == 'checkbox')? $(this).prop('checked').toString() : $(this).val();
                    if( _.contains($(el).attr('data-condition-value').split(','), value) )
                        $(el).show();
                    else
                        $(el).hide();
                });

                dependentField.trigger('change');
            });

            // the cancel button
            that.view.find('button#cancel').first().click(function(){
                that.close();
            });
            
            that.setCurrentForm(form);
        },

        readForm: function(){
            var that = this;

            var formData = {};
            
            // extract all model names
            var attributes = [];
            _.each(that.getCurrentForm().fields, function(value, key){
                attributes.push(value.modelAttr.split('.')[0]);
            });
            
            _.each(_.unique(attributes), function(element){
                formData[element] = {};    
            });

            // extract attribute values and combine
            _.each(that.getCurrentForm().fields, function(value, key){
                var realValue;

                if( value.el.attr('type') == 'checkbox' ){
                    realValue = value.el[0].checked;
                }
                else {
                    realValue = value.el.val();
                }
                formData[value.modelAttr.split('.')[0]][value.modelAttr.split('.')[1]] = realValue;
            });

            return formData;
        },

        send: function (options) {
            var that = this;

            APP.loading(true);

            var data = that.readForm();
            console.debug(data);

            // call specific send method and give callback
            that.getCurrentForm().formType.sendMethod(data, options, function(success){
                that.createModal({
                    content: success? $('<h5>'+that.getWording('form.success')+'</5>') : $('<h5>' +that.getWording('form.fail')+ '</5>'),
                    dismissible: true,
                    buttonLabel: success? "Schön" : 'Hm!',
                    actions: {
                        ready: function(){},
                        close: function(){ 
                            if(success) that.close();
                            else APP.loading(false);
                        }
                    }
                });
            });
        },

        createEntry: function (data, options, cb) {
            var that = this;

            // to backend
            data.entry.area = "dresden";

            var data_converted = {
                marketentry: data.entry,
                location: data.location
            };

            APP.getDataManager().addMarketEntry(data_converted, function (response) {
                // cb(response.marketentry !== undefined);
                cb(true);
            });

            // to github
            APP.getDataManager().createGithubIssue({
                data: {
                    type: 'entry',
                    entryType: data.entry.type,
                    entryData: data.entry,
                    locationData: data.location
                }
            });
            
            // send outgoing message
            var entryTypes = {0: 'Orga', 1: 'Börse', 2: 'Event'};

            // to slack
            APP.getDataManager().createSlackMessage({
                heading: function () {
                    var entryTypeString = entryTypes[data.entry.type];
                    var marketTypeString = (data.entry.offer) ? 'Angebot' : 'Gesuch';
                    if (data.entry.type == 1) entryTypeString += ' (' + marketTypeString + ')'
                    return 'Neuer Eintrag: ' + entryTypeString + ' "' + data.entry.name + '"'
                }(),
                message: '```\n' + data.entry.descriptionShort + '\n```\n'
                + 'für Kinder: `' + (data.entry.forChildren ? 'ja' : '-') + '`\n'
                + 'Unterstützer gesucht: `' + (data.entry.supportWanted ? 'ja' : 'nein') + '`\n'
                + 'Unterstützung Details: `' + data.additional.internalComment + '`\n'
                + 'Kontaktperson: `' + data.entry.speakerPublic + '`\n'
                + 'Sprachen: `' + data.entry.spokenLanguages + '`\n'
                + 'mail: `' + data.entry.mail + '` '
                + 'web: `' + data.entry.web + '` '
                + 'facebook: `' + data.entry.facebook + '` '
                + 'phone: `' + data.entry.phone + '`\n'
                + 'Ort: `' + data.location.placename + ', ' + data.location.street + ', ' + data.location.zip + ' ' + data.location.city + '`\n'
                + 'von: `' + data.entry.dateFrom + ' (' + data.entry.timeFrom + ')' + '`\n'
                + 'bis: `' + data.entry.dateTo + ' (' + data.entry.timeTo + ')' + '`\n'
                + 'Anmerkung: `' + data.additional.comment + '`\n'
            });

            // send mail to team inbox
            APP.getDataManager().sendMail({
                data: {
                    mail_fromMail: 'bot@afeefa.de',
                    mail_fromName: data.entry.speakerPublic ? data.entry.speakerPublic : 'Unbekannt',
                    mail_to: 'redaktion@afeefa.de',
                    mail_replyTo: data.entry.mail,
                    mail_subject: function () {
                        var entryTypeString = entryTypes[data.entry.type];
                        var marketTypeString = (data.entry.offer) ? 'Angebot' : 'Gesuch';
                        if (data.entry.type == 1) entryTypeString += ' (' + marketTypeString + ')'
                        return '[Neuer Eintrag] ' + entryTypeString + ' "' + data.entry.name + '"';
                    },
                    mail_bodyPlain: data.entry.description,
                    mail_bodyHtml: function () {
                        // var date = new Date();
                        // var dateString = date.getDate() + '.' + (date.getMonth()+1) + '.' + date.getFullYear() + ' um ' + date.getHours() + ':' + date.getMinutes();
                        var styles = '<style>table td {vertical-align:top; font-size: 0.8em;}</style>';
                        var message = '<table border="0">'
                            + '<tr><td style="color: gray">Beschreibung:</td><td>' + data.entry.description + '</td></tr>'
                            + '<tr><td style="color: gray">für Kinder geeignet:</td><td>' + (data.entry.forChildren ? 'ja' : 'nicht explizit') + '</td></tr>'
                            + '<tr><td style="color: gray">Unterstützer gesucht:</td><td>' + (data.entry.supportWanted ? 'ja' : 'nein') + '</td></tr>'
                            + '<tr><td style="color: gray">Unterstützung Details:</td><td>' + data.additional.internalComment + '</td></tr>'
                            + '<tr><td style="color: gray">Kontaktperson:</td><td>' + data.entry.speakerPublic + '</td></tr>'
                            + '<tr><td style="color: gray">Sprachen:</td><td>' + data.entry.spokenLanguages + '</td></tr>'
                            + '<tr><td style="color: gray">Mail:</td><td>' + data.entry.mail + '</td></tr>'
                            + '<tr><td style="color: gray">Website:</td><td>' + data.entry.web + '</td></tr>'
                            + '<tr><td style="color: gray">facebook:</td><td>' + data.entry.facebook + '</td></tr>'
                            + '<tr><td style="color: gray">Telefon:</td><td>' + data.entry.phone + '</td></tr>'
                            + '<tr><td style="color: gray">Ort:</td><td>' + data.location.placename + ', ' + data.location.street + ', ' + data.location.zip + ' ' + data.location.city + '</td></tr>'
                            + '<tr><td style="color: gray">von:</td><td>' + data.entry.dateFrom + ' (' + data.entry.timeFrom + ')' + '</td></tr>'
                            + '<tr><td style="color: gray">bis:</td><td>' + data.entry.dateTo + ' (' + data.entry.timeTo + ')' + '</td></tr>'
                            + '<tr><td style="color: gray">Anmerkung:</td><td>' + data.additional.comment + '</td></tr>'
                            + '</table>';
                        return styles + message;
                    }
                }
            });
        },

        createFeedback: function (data, options, cb) {
            var that = this;

            // to github
            // TODO read response to get created issue ID and post this ID as waffle link to slack
            APP.getDataManager().createGithubIssue({
                data: {
                    type: 'feedback',
                    feedbackData: data.feedback,
                    metaData: JSON.stringify(L.Browser)
                }
            });

            // to slack
            APP.getDataManager().createSlackMessage({
                heading: 'Feedback von _' + data.feedback.author + '_ (' + data.feedback.mail + ')',
                message: '```\n' + data.feedback.message + '\n```'
            });

            // send mail to team inbox
            APP.getDataManager().sendMail({
                data: {
                    mail_fromMail: 'bot@afeefa.de',
                    mail_fromName: data.feedback.author,
                    mail_to: 'team@afeefa.de',
                    mail_replyTo: data.feedback.mail,
                    mail_subject: '[Feedback] ' + data.feedback.author,
                    mail_bodyPlain: data.feedback.message,
                    mail_bodyHtml: function () {
                        return '<p><i>' + data.feedback.message + '</i></p>';
                    }
                }
            });

            cb(true);
        },

        createContact: function (data, options, cb) {
            var that = this;

            console.debug(options);

            // to slack
            APP.getDataManager().createSlackMessage({
                heading: 'Kontaktanfrage von _' + data.contact.author + ' (' + data.contact.mail + ')_ an _' + options.entry.name + ' (' + options.entry.mail + ')_',
                message: '```\n' + data.contact.message + '\n```'
            });

            // send mail to entry's email
            APP.getDataManager().sendMail({
                data: {
                    mail_fromMail: 'bot@afeefa.de',
                    mail_fromName: data.contact.author + ' über Afeefa.de',
                    mail_to: options.entry.mail,
                    mail_replyTo: data.contact.mail,
                    mail_subject: 'Anfrage von ' + data.contact.author,
                    mail_bodyPlain: data.contact.message,
                    mail_bodyHtml: function () {
                        return '<p><i>' + data.contact.message + '</i></p>'
                            + '<p>' + data.contact.author + ' | ' + data.contact.mail + ' | ' + data.contact.phone + '</p>'
                            + '<hr><small>Nachricht gesendet über <a href="https://afeefa.de">Afeefa.de</a></small>';
                    }
                }
            });

            cb(true);
        },

        addEvents: function () {
            var that = this;

            // call superclass
            this.base(arguments);
        },

        reset: function () {
            var that = this;

            that.scrollContainer.empty();

            APP.loading(false);
        },

        close: function () {
            var that = this;

            that.reset();
            that.setCurrentForm(null);
            that.view.removeClass('active');
            that.isActive(false);
        },

        changeLanguage: function () {
            var that = this;

            if (that.getCurrentForm()) that.load( that.getCurrentForm().formType.name );
        }
    }
});
define("Views/FormView", ["Views/View"], function(){});

qx.Class.define("IncludeView", {
	
	extend : View,
	type: "singleton",

	properties: {
		includes: {},
		baseUrl: {},
		includeKey: {init: null}
	},

	construct: function(){
		var that = this;

		that.setBaseUrl( APP.getConfig().includePathForHtmlFiles );
		
		that.setIncludes({
			refugeeGuide: {
				url: that.getBaseUrl() + 'refugeeGuide',
				translatable: true
			},
			supporterGuide: {
				url: that.getBaseUrl() + 'supporterGuide',
				translatable: true
			},
			imprint: {
				url: 'https://about.afeefa.de/impressum/ article .entry-content'
			},
			press: {
				url: that.getBaseUrl() + 'press.html',
			},
			about: {
				url: 'https://about.afeefa.de article .entry-content'
			},
		});
		
		that.setViewId('includeView');
		that.setLoadable(true);
	},

	members : {
		
		render: function(){
			var that = this;

			// view container
			that.view = $("<div />");
			that.view.attr('id', that.getViewId());

			// heading
			that.headingContainer = $("<div />").addClass('heading');
			that.heading = $("<h1 />");
			that.headingContainer.append(that.heading);
			that.view.append(that.headingContainer);

			// back button
			that.createBackBtn(function(){
				that.close();
			});

			// scrollable content container
			that.scrollContainer  = $("<div />");
			that.scrollContainer.addClass('scroll-container');
			that.view.append(that.scrollContainer);

			$('#main-container').append(that.view);

			if( APP.getUserDevice() == 'desktop') that.scrollContainer.perfectScrollbar();

			that.setViewState(0);

			this.base(arguments);
		},

		// TODO option: modal
		load: function( includeKey ){
			var that = this;

			that.reset();
			
			// that.showCurtain(true);
			APP.loading(true);

			that.setIncludeKey(includeKey);

			that.view.addClass('active');
			that.view.addClass(includeKey);
			that.setViewState(1);
			// that.minimize(false);

			that.say('includeViewOpened');

			if( that.getIncludes()[includeKey].translatable ) {
				that.scrollContainer.load( that.getIncludes()[includeKey].url + '_' + APP.getLM().getCurrentLang() + ".html", function( response, status, xhr ) {

					if ( status == "error" ) {

						that.scrollContainer.load( that.getIncludes()[includeKey].url + '_en.html', function( response, status, xhr ) {
							
							if ( status == "error" ) {

								that.scrollContainer.load( that.getIncludes()[includeKey].url + '_de.html', function( response, status, xhr ) {
									loadComplete();
								});

							}

							loadComplete();

						});

					}

					loadComplete();

				});
			} else {
				that.scrollContainer.load( that.getIncludes()[includeKey].url, function( response, status, xhr ) {
					loadComplete();
				});
			}

			function loadComplete(){

				APP.loading(false);

				const headerEl = that.scrollContainer.find('.header');
				const contentEl = that.scrollContainer.find('.content');
				
				// TODO remove this workaround
				// fix nested flexbox issue in firefox
				contentEl.outerHeight( that.view.outerHeight() - headerEl.outerHeight() );

				// scrolling
				// if( APP.getUserDevice() == 'desktop') {
				// 	contentEl
				// 		.perfectScrollbar()
				// 		.on('ps-scroll-down', function() {
				// 			headerEl.addClass('min');
				// 			$(this).perfectScrollbar('update');
				// 		})
				// 		.on('ps-y-reach-start', function() {
				// 			headerEl.removeClass('min');
				// 		});
				// }

				// minimizing
				headerEl.click(function(){
					// if(that.getViewState() == 2) that.minimize(false);
				});

				// mobile language selection
				if( APP.getUserDevice() != 'desktop' ){
					$('select#language-select')
						.val( APP.getLM().getCurrentLang() )
						.change(function(){
	            that.say('languageChanged', $(this).val());
						});
				}

				// location links
				$('span.locationLink').click(function(){
					// console.debug('locationLink clicked');
					APP.getMapView().selectMarkerFromLink( $(this).attr('name') );
				});

				// search links
				$('span.searchLink').click(function(){
					// console.debug('searchLink clicked');
          APP.getSearchView().inputField.val( $(this).attr('name') ).trigger( "input" );
					// APP.getSearchView().loadResults( $(this).attr('name') );
				});

				// scan buttons
				$('button').click(function(){
					const action = $(this).attr('data-action');
					switch(action) {
						case 'close':
							that.close();
							break;
						case 'openForm_initiative':
			   			that.close();
			   			APP.getFormView().load( 'initiative' );
			   			break;
		   			case 'openForm_marketentry':
			   			that.close();
			   			APP.getFormView().load( 'marketentry' );
			   			break;
		   			case 'openForm_event':
			   			that.close();
			   			APP.getFormView().load( 'event' );
			   			break;
						default:
					}
				});
			}

		},

		reset: function(){
			var that = this;

			that.setIncludeKey(null);

			// that.view.find('h1').remove();
			that.scrollContainer.empty();
		},

		minimize: function(bool){
			var that = this;

			// only min/max if view is active
			if( that.getViewState() === 0 ) return false;

			if( bool ) {
				that.showCurtain(false);
				that.view.addClass('min')
				that.setViewState(2);
			}
			else {
				that.showCurtain(true);
				that.view.removeClass('min')  
				that.setViewState(1);
			}
		},

		addEvents: function(){
			var that = this;

			// call superclass
			this.base(arguments);
			
			// that.view.click(function(){
			// 	that.say('includeViewClicked', {viewState: that.getViewState()} );
			// });

			that.listen('detailViewOpened', function(){
				// that.minimize(true);
				that.hide();
			});

			that.listen('detailViewClosed', function(){
				// that.minimize(false);
				that.show();
			});

			that.listen('searchResultsLoaded', function(){
				// that.minimize(true);
			});

			// that.listen('detailViewMobileMaximized', function(){
			//     that.minimize(true);
			// });

			// that.listen('detailViewMobileMinimized', function(){
			//     that.minimize(true);
			// });

			// that.listen('searchFieldFocused', function(){
			// 	that.close();
			// });

			// that.menuBtn.click(function(){
			//     $('#main-container').addClass('shifted-left');
			// });

			// that.listen('curtainclicked', function(){
			//     $('#main-container').removeClass('shifted-left');
			// });
			
		},

		close: function(){
			var that = this;

			that.view.removeClass('active');
			_.each(that.getIncludes(), function(value, key){
				that.view.removeClass(value);
			});
			
			that.setViewState(0);
			that.setIncludeKey(null);

			// that.showCurtain(false);

			that.say('includeViewClosed');
		},

		changeLanguage: function(){
			var that = this;

			if( that.getIncludeKey() !== null ) that.load( that.getIncludeKey() );
		}
	}

});
define("Views/IncludeView", ["Views/View"], function(){});

qx.Class.define("MessageView", {
	
	extend : View,
	type: "singleton",

	construct: function(){
		var that = this;

		that.setViewId('messageView');
	},

	members : {
		
		render: function(){
			var that = this;

			// view container
			that.view = $("<div />");
			that.view.attr('id', that.getViewId());

			that.title = $('<h3 />');
			that.content = $("<p />");
			that.actions = $("<div />");

			that.view.append(that.title);
			that.view.append(that.content);
			that.view.append(that.actions);

			$('#main-container').append(that.view);

			this.base(arguments);

			that.defineTemplates();
		},

		defineTemplates: function(){
			var that = this;

			that.templates = {
				'survey': {
					title: that.getWording('message.survey.title'),
					contentNode: that.getWording('message.survey.text'),
					cssClass: '',
					actions: 
						[
							{
								label: 'Zur 3-Minuten-Umfrage',
								externalLink: 'https://afeefade.typeform.com/to/csN7YQ'
							},
							{
								label: 'Nicht jetzt',
								close: true,
								cssClass: 'margin-top'
							}
						]
				},
				'about': {
					title: 'Du möchtest mehr über Afeefa erfahren?',
					contentNode: 'Auf unseren Infoseiten erfährst du mehr über unser Konzept, das Team, Kooperationspartner und vieles mehr.',
					cssClass: '',
					actions: 
						[
							{
								label: 'Erzähl mir mehr!',
								externalLink: 'https://about.afeefa.de',
								cssClass: 'block'
							},
							{
								label: 'Nicht jetzt',
								close: true,
								cssClass: 'btn-secondary block margin-top'
							}
						]
				}
			}
		},
		
		// param options Object {key, title, contentNode, actions, cssClass}
		load: function(options){
			var that = this;
			
			// don't show while intro
			if( APP.getIntroView().isActive() ) return;
			if( APP.getLanguageView().isActive() ) return;
			if( APP.getFormView().isActive() ) return;

			if(options.key) {

				that.registerOpening({key: options.key});

				// message was opened before?
				if( !options.force ){
					var counter = sessionStorage.getItem("messageOpened_" + options.key);
					if( counter < 50 ) return;
					if( counter > 50 ) return;
					// if( counter < 10 ) return;
					// if( counter > 2 && counter < 10 ) return;
					// if( counter > 1 && counter < 10 ) return;
					// if( counter > 10 ) return;
				}
				
				// message followed before?
				if(localStorage.getItem("messageFollowed_" + options.key) == 1) return;
			}

			that.reset();

			// the message data (may come from template)
			var message = options.key? that.templates[options.key] : options;
			
			// build
			that.title.append(message.title);
			that.content.append(message.contentNode);
			
			_.each(message.actions, function(action){
				var btn;
				
				if(action.externalLink){
					btn = $('<a />')
						.addClass('btn')
						.attr('target', '_blank')
						.attr('href', action.externalLink)
						.append(action.label)
						.click(function(){
							that.close();
							that.registerOpening({key: options.key, messageFollowed: true});
						});
				}
				else if(action.close){
					btn = $('<button />')
						.addClass('btn btn-flat')
						.append(action.label)
						.click(function(){
							that.close();
						});
				}
				else {
					btn = $('<button />')
						.append(action.label)
						.click(action.action);
				}

				if(action.cssClass) btn.addClass(action.cssClass);
				
				that.actions.append(btn);
			});

			that.view.addClass(message.cssClass);
			that.showCurtain(true);
			that.view.addClass('active');
		},

		registerOpening: function(options){
			var that = this;
			
			// count opening attempts in current session
			var counter = sessionStorage.getItem("messageOpened_" + options.key) ? sessionStorage.getItem("messageOpened_" + options.key) : 0;
			counter++;
			sessionStorage.setItem("messageOpened_" + options.key, counter);

			// save to localstorage if user executed the message's primary action (e.g. followed the external link)
			if(options.messageFollowed) {
				localStorage.setItem("messageFollowed_" + options.key, 1);
				localStorage.setItem("messageFollowed_" + options.key + '_month', new Date().getMonth()+1);
			}

			// reset localstorage a month later
			var savedMonth = localStorage.getItem("messageFollowed_" + options.key + '_month');
			if( savedMonth < new Date().getMonth()+1 || savedMonth == 12 ){
				localStorage.removeItem("messageFollowed_" + options.key);
				localStorage.removeItem("messageFollowed_" + options.key + '_month');
			}
		},

		close: function(){
			var that = this;

			that.view.removeClass('active');
			that.showCurtain(false);
			that.reset();
		},

		addEvents: function(){
			var that = this;

			// call superclass
			this.base(arguments);

			// setTimeout(function(){
			// 	that.load({key: 'survey', force: true});
			// }, 300000);

			// that.listen('detailViewOpened', function(){
			// 	setTimeout(function(){
			// 		that.load({key: 'survey'});
			// 	}, 5000);
   //    });
		},

		reset: function(){
			var that = this;

			that.title.empty();
			that.content.empty();
			that.actions.empty();
		},

		changeLanguage: function(){
			var that = this;

			// that.reset();
			// that.load();
		}
	}

});
define("Views/MessageView", ["Views/View"], function(){});

qx.Class.define("IntroView", {
	
	extend : View,
	type: "singleton",

	construct: function(){
		var that = this;

		that.setViewId('introView');
	},

	members : {
		
		render: function(){
			var that = this;

			// view container
			that.view = $("<div />");
			that.view.attr('id', that.getViewId());

			$('#main-container').append(that.view);

			that.defineSteps();

			this.base(arguments);
		},

		defineSteps: function(){
			var that = this;

			var userDevice = APP.getUserDevice();

			that.steps = {

				stepSearch: {
					stepName: 'search',
					el: (userDevice == 'mobile')? that.view : APP.getSearchView().view,
					placement: (userDevice == 'mobile')? 'top' : 'right',
					preAction: function(){
						APP.getSearchView().scrollContainer.scrollTop(0);
						APP.getSearchView().load();
						APP.getSearchView().showCurtain(true);
					},
					afterAction: function(){
						APP.getSearchView().showCurtain(false);
					},
					phraseAppKeys: {
						heading: 'intro.step.search.title',
						text: 'intro.step.search.text'
					},
					buttons: ['next', 'cancelForever']
				},
				
				stepMap: {
					stepName: 'map',
					el: APP.getMapView().view,
					placement: 'top',
					preAction: function(){
						APP.getMapView().showCurtain(true);
					},
					afterAction: function(){
						APP.getMapView().showCurtain(false);
					},
					phraseAppKeys: {
						heading: 'intro.step.map.title',
						text: 'intro.step.map.text'
					},
					buttons: ['next', 'cancel']
				},
				
				stepLanguage: {
					stepName: 'language',
					el: APP.getLanguageView().langBtn,
					placement: 'right',
					preAction: function(){
						APP.getLanguageView().showCurtain(true);
					},
					afterAction: function(){
						APP.getLanguageView().showCurtain(false);
					},
					phraseAppKeys: {
						heading: 'intro.step.language.title',
						text: 'intro.step.language.text'
					},
					buttons: ['next', 'cancel']
				},
				
				stepLegend: {
					stepName: 'legend',
					el: (userDevice == 'mobile')? APP.getSearchView().filterBtn : APP.getLegendView().view,
					placement: (userDevice == 'mobile')? 'bottom' : 'left',
					preAction: function(){
						if(userDevice == 'mobile'){
							APP.getSearchView().close();
							APP.getSearchView().showCurtain(true);
						} else {
							APP.getLegendView().showCurtain(true);
						}
						// APP.getLegendView().show();
					},
					afterAction: function(){
						APP.getLegendView().showCurtain(false);
						APP.getSearchView().showCurtain(false);
						// APP.getLegendView().close();
					},
					phraseAppKeys: {
						heading: 'intro.step.legend.title',
						text: 'intro.step.legend.text'
					},
					buttons: ['next', 'cancel']
				},
				
				stepContact: {
					stepName: 'plus',
					el: APP.getPlusView().locateBtn,
					placement: 'left',
					preAction: function(){
						APP.getPlusView().showCurtain(true);
					},
					afterAction: function(){
						APP.getPlusView().showCurtain(false);
					},
					phraseAppKeys: {
						heading: 'intro.step.locate.title',
						text: 'intro.step.locate.text'
					},
					buttons: ['finish']
				},
				
				stepGuide: {
					stepName: 'guide',
					el: APP.getSearchView().refugeeBtn,
					placement: 'bottom',
					preAction: function(){
						APP.getSearchView().close();
						APP.getSearchView().showCurtain(true);
					},
					afterAction: function(){
						APP.getSearchView().showCurtain(false);
					},
					phraseAppKeys: {
						heading: 'intro.step.guide.title',
						text: 'intro.step.guide.text'
					},
					buttons: ['next', 'cancel']
				}
			};
		},

		start: function(){
			var that = this;
			
			that.view.addClass('active');
			that.isActive(true);
			that.next();
		},

		stop: function(){
			var that = this;
			
			if( that.currentTooltip ) that.currentTooltip.destroy();
			if( that.currentStep ) that.currentStep.afterAction();
			that.currentTooltip = null;
			that.currentStep = null;
			
			that.view.removeClass('active');
			that.isActive(false);
		},

		saveIntroDecision: function(){
			var that = this;
			
			localStorage.setItem("introIsKnown", 1);
		},

		next: function(){
			var that = this;

			var nextStep;
			if( !that.currentStep ) {
        nextStep = that.steps.stepSearch;
      } else {
				switch(that.currentStep.stepName) {
				    case 'search':
				        nextStep = that.steps.stepGuide;
				        break;
			      case 'guide':
			        nextStep = that.steps.stepMap;
			        break;
	        	case 'map':
				        nextStep = that.steps.stepLanguage;
				        break;
		        case 'language':
			        nextStep = that.steps.stepLegend;
			        break;
		       	case 'legend':
			        nextStep = that.steps.stepContact;
			        break;
			      case 'plus':
			        nextStep = that.steps.stepSearch;
			        break;
				    default:
				      nextStep = that.steps.stepSearch;
				}
      }

			// destroy existing tooltip
			if( that.currentTooltip ) that.currentTooltip.destroy();

			// do afterAction
			if( that.currentStep ) that.currentStep.afterAction();

			// create next tooltip
			nextStep.preAction();
			var tooltip = that.createTooltip(
				nextStep.el,
				that.renderContent(nextStep),
				null,
				nextStep.placement,
				// 'desktop',
				null,
				['intro'],
				'node'
			);
			that.currentTooltip = tooltip;
			that.currentStep = nextStep;
		},

		renderContent: function(step){
			var that = this;

			var contentContainer = $("<div />")
						
			var heading = $("<h3 />")
				.append(that.getWording(step.phraseAppKeys.heading));

			var text = $("<p />")
				.append(that.getWording(step.phraseAppKeys.text));
			
			contentContainer.append(heading);
			contentContainer.append(text);

			_.each(step.buttons, function(value, i){
				var labelKey, action;
				
				// define button types
				switch(value){
					case 'next':
						labelKey = 'intro.button.next';
						action = function(){that.next()};
						break;

					case 'cancel':
						labelKey = 'intro.button.cancel';
						action = function(){that.stop()};
						break;

					case 'cancelForever':
						labelKey = 'intro.button.cancel.forever';
						action = function(){
							that.stop()
							that.saveIntroDecision();
						};
						break;

					case 'finish':
						labelKey = 'intro.button.finish';
						action = function(){
							that.stop()
							that.saveIntroDecision();
						};
						break;
				}

				// generate the button
				var button = $("<button />")
					.addClass('btn block')
					.append(that.getWording(labelKey))
					.click(action);

				// make secondary buttons
				if(i>0) button.addClass('btn-flat');
				
				contentContainer.append(button);
			});

			return contentContainer;
		},

		addEvents: function(){
			var that = this;

			// call superclass
			this.base(arguments);
		},

		reset: function(){
			var that = this;
		},

		changeLanguage: function(){
			var that = this;

			if(that.isActive()){
				that.stop();
				that.start();
			}
		},

		close: function(){
			var that = this;
		}
	}

});
define("Views/IntroView", ["Views/View"], function(){});

require.config({

    baseUrl: '/DDFA/js/',

    paths: {
        modernizr: '../../H5BP/js/vendor/modernizr-2.8.3.min',
        domReady: '../../requirejs/domReady',
        jquery: '../../jquery/jquery-2.2.2.min',
        perfectScrollbarJQuery: 'https://cdnjs.cloudflare.com/ajax/libs/jquery.perfect-scrollbar/0.6.7/js/min/perfect-scrollbar.jquery.min',
        // momentjs: '../../momentjs/moment.min',
        momentjs: '../../momentjs/moment-with-locales.min',
        restive: '../../restive/restive.min',
        qx: '../../qooxdoo/qx-oo-4.1.min',
        underscore: '../../underscore/underscore-min',
        hammerjs: '../../hammerjs/hammer.min',
        mapbox: 'https://api.mapbox.com/mapbox.js/v3.1.0/mapbox',
        mc: '../../leafletPlugins/leaflet.markercluster',
        popper: '../../popperjs/popper.min',
        // d3: 'https://cdnjs.cloudflare.com/ajax/libs/d3/4.4.0/d3',
        materialize: '../../materialize/js/materialize.min'
    },

    // define dependencies via shim because of use of old javascript libs, which do not define a module and therefore do not define their dependencies themselves (defined modules in javascript define other dependencies)
    shim: {
        // 'mapbox': {
        // //     These script dependencies should be loaded before loading
        // //     mapbox.js
        //     deps: ['underscore', 'jquery'],
        // //     Once loaded, use the global 'L' as the
        // //     module value.
        //     exports: 'L'
        // },
        
        "mc": ["mapbox"],

        // depending on jquery
        "restive": ["jquery"],
        'perfectScrollbarJQuery': ["jquery"],
        "materialize": ["hammerjs"],

        // app files
        "Daddy": ['qx', 'jquery', 'underscore', 'restive', 'perfectScrollbarJQuery', 'mapbox', 'mc', 'modernizr', 'popper', 'materialize', 'momentjs'],
        'APPAFEEFA': ['Daddy'],
        'DataManager': ['APPAFEEFA'],
        'Router': ['APPAFEEFA'],
        'LanguageManager': ['APPAFEEFA'],
        'Utility': ['APPAFEEFA'],
        'Views/View': ['DataManager', 'Router', 'LanguageManager', 'Utility'],
        'Views/MapView': ['Views/View'],
        'Views/SearchView': ['Views/View'],
        'Views/EventView': ['Views/View'],
        'Views/DetailView': ['Views/View'],
        'Views/MenuView': ['Views/View'],
        'Views/LegendView': ['Views/View'],
        'Views/LanguageView': ['Views/View'],
        'Views/PlusView': ['Views/View'],
        'Views/FormView': ['Views/View'],
        'Views/IncludeView': ['Views/View'],
        'Views/MessageView': ['Views/View'],
        'Views/IntroView': ['Views/View']
    },

    // enforceDefine: true,

    waitSeconds: 0	// disable "Load timeout for modules" error
});

// define(function (require) {
    // var domReady = require('domReady');
    require([
        // requiring here loads the mentioned file as well as its dependencies defined via shim (see above)
        'domReady',
        'APPAFEEFA',
        'DataManager',
        'Router',
        'LanguageManager',
        'Utility',
        'Views/MapView',
        'Views/SearchView',
        'Views/EventView',
        'Views/DetailView',
        'Views/MenuView',
        'Views/LegendView',
        'Views/LanguageView',
        'Views/PlusView',
        'Views/FormView',
        'Views/IncludeView',
        'Views/MessageView',
        'Views/IntroView'
    ], function(domReady){

        // if dependencies don't become available everywhere within the app, then define them here again as global var
        Hammer = require('hammerjs');
        Popper = require('popper');
        moment = require('momentjs');
        // d3 = require('d3');
        
        domReady(function () {
            APP = new APPAFEEFA();


            APP.init(function () {
                if (APP.getUserDevice() === 'mobile') {
                    require(['Views/DetailViewMobile'], function () {
                        APP.getRouter().initialNavigate();
                    });
                } else {
                    APP.getRouter().initialNavigate();
                }

                APP.say('appInitialized');
            });
        });
    });
// });

define("main", function(){});

