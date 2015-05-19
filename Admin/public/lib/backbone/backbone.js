(function(){var a,b=this,c=b.Backbone,d=[],e=d.push,f=d.slice,g=d.splice;a="undefined"!=typeof exports?exports:b.Backbone={},a.VERSION="0.9.10";var h=b._;h||"undefined"==typeof require||(h=require("underscore")),a.$=b.jQuery||b.Zepto||b.ender,a.noConflict=function(){return b.Backbone=c,this},a.emulateHTTP=!1,a.emulateJSON=!1;var i=/\s+/,j=function(a,b,c,d){if(!c)return!0;if("object"==typeof c)for(var e in c)a[b].apply(a,[e,c[e]].concat(d));else{if(!i.test(c))return!0;for(var f=c.split(i),g=0,h=f.length;h>g;g++)a[b].apply(a,[f[g]].concat(d))}},k=function(a,b){var c,d=-1,e=a.length;switch(b.length){case 0:for(;++d<e;)(c=a[d]).callback.call(c.ctx);return;case 1:for(;++d<e;)(c=a[d]).callback.call(c.ctx,b[0]);return;case 2:for(;++d<e;)(c=a[d]).callback.call(c.ctx,b[0],b[1]);return;case 3:for(;++d<e;)(c=a[d]).callback.call(c.ctx,b[0],b[1],b[2]);return;default:for(;++d<e;)(c=a[d]).callback.apply(c.ctx,b)}},l=a.Events={on:function(a,b,c){if(!j(this,"on",a,[b,c])||!b)return this;this._events||(this._events={});var d=this._events[a]||(this._events[a]=[]);return d.push({callback:b,context:c,ctx:c||this}),this},once:function(a,b,c){if(!j(this,"once",a,[b,c])||!b)return this;var d=this,e=h.once(function(){d.off(a,e),b.apply(this,arguments)});return e._callback=b,this.on(a,e,c),this},off:function(a,b,c){var d,e,f,g,i,k,l,m;if(!this._events||!j(this,"off",a,[b,c]))return this;if(!a&&!b&&!c)return this._events={},this;for(g=a?[a]:h.keys(this._events),i=0,k=g.length;k>i;i++)if(a=g[i],d=this._events[a]){if(f=[],b||c)for(l=0,m=d.length;m>l;l++)e=d[l],(b&&b!==e.callback&&b!==e.callback._callback||c&&c!==e.context)&&f.push(e);this._events[a]=f}return this},trigger:function(a){if(!this._events)return this;var b=f.call(arguments,1);if(!j(this,"trigger",a,b))return this;var c=this._events[a],d=this._events.all;return c&&k(c,b),d&&k(d,arguments),this},listenTo:function(a,b,c){var d=this._listeners||(this._listeners={}),e=a._listenerId||(a._listenerId=h.uniqueId("l"));return d[e]=a,a.on(b,"object"==typeof b?this:c,this),this},stopListening:function(a,b,c){var d=this._listeners;if(d){if(a)a.off(b,"object"==typeof b?this:c,this),b||c||delete d[a._listenerId];else{"object"==typeof b&&(c=this);for(var e in d)d[e].off(b,c,this);this._listeners={}}return this}}};l.bind=l.on,l.unbind=l.off,h.extend(a,l);var m=a.Model=function(a,b){var c,d=a||{};this.cid=h.uniqueId("c"),this.attributes={},b&&b.collection&&(this.collection=b.collection),b&&b.parse&&(d=this.parse(d,b)||{}),(c=h.result(this,"defaults"))&&(d=h.defaults({},d,c)),this.set(d,b),this.changed={},this.initialize.apply(this,arguments)};h.extend(m.prototype,l,{changed:null,idAttribute:"id",initialize:function(){},toJSON:function(){return h.clone(this.attributes)},sync:function(){return a.sync.apply(this,arguments)},get:function(a){return this.attributes[a]},escape:function(a){return h.escape(this.get(a))},has:function(a){return null!=this.get(a)},set:function(a,b,c){var d,e,f,g,i,j,k,l;if(null==a)return this;if("object"==typeof a?(e=a,c=b):(e={})[a]=b,c||(c={}),!this._validate(e,c))return!1;f=c.unset,i=c.silent,g=[],j=this._changing,this._changing=!0,j||(this._previousAttributes=h.clone(this.attributes),this.changed={}),l=this.attributes,k=this._previousAttributes,this.idAttribute in e&&(this.id=e[this.idAttribute]);for(d in e)b=e[d],h.isEqual(l[d],b)||g.push(d),h.isEqual(k[d],b)?delete this.changed[d]:this.changed[d]=b,f?delete l[d]:l[d]=b;if(!i){g.length&&(this._pending=!0);for(var m=0,n=g.length;n>m;m++)this.trigger("change:"+g[m],this,l[g[m]],c)}if(j)return this;if(!i)for(;this._pending;)this._pending=!1,this.trigger("change",this,c);return this._pending=!1,this._changing=!1,this},unset:function(a,b){return this.set(a,void 0,h.extend({},b,{unset:!0}))},clear:function(a){var b={};for(var c in this.attributes)b[c]=void 0;return this.set(b,h.extend({},a,{unset:!0}))},hasChanged:function(a){return null==a?!h.isEmpty(this.changed):h.has(this.changed,a)},changedAttributes:function(a){if(!a)return this.hasChanged()?h.clone(this.changed):!1;var b,c=!1,d=this._changing?this._previousAttributes:this.attributes;for(var e in a)h.isEqual(d[e],b=a[e])||((c||(c={}))[e]=b);return c},previous:function(a){return null!=a&&this._previousAttributes?this._previousAttributes[a]:null},previousAttributes:function(){return h.clone(this._previousAttributes)},fetch:function(a){a=a?h.clone(a):{},void 0===a.parse&&(a.parse=!0);var b=a.success;return a.success=function(a,c,d){return a.set(a.parse(c,d),d)?void(b&&b(a,c,d)):!1},this.sync("read",this,a)},save:function(a,b,c){var d,e,f,g,i=this.attributes;return null==a||"object"==typeof a?(d=a,c=b):(d={})[a]=b,!d||c&&c.wait||this.set(d,c)?(c=h.extend({validate:!0},c),this._validate(d,c)?(d&&c.wait&&(this.attributes=h.extend({},i,d)),void 0===c.parse&&(c.parse=!0),e=c.success,c.success=function(a,b,c){a.attributes=i;var f=a.parse(b,c);return c.wait&&(f=h.extend(d||{},f)),h.isObject(f)&&!a.set(f,c)?!1:void(e&&e(a,b,c))},f=this.isNew()?"create":c.patch?"patch":"update","patch"===f&&(c.attrs=d),g=this.sync(f,this,c),d&&c.wait&&(this.attributes=i),g):!1):!1},destroy:function(a){a=a?h.clone(a):{};var b=this,c=a.success,d=function(){b.trigger("destroy",b,b.collection,a)};if(a.success=function(a,b,e){(e.wait||a.isNew())&&d(),c&&c(a,b,e)},this.isNew())return a.success(this,null,a),!1;var e=this.sync("delete",this,a);return a.wait||d(),e},url:function(){var a=h.result(this,"urlRoot")||h.result(this.collection,"url")||F();return this.isNew()?a:a+("/"===a.charAt(a.length-1)?"":"/")+encodeURIComponent(this.id)},parse:function(a){return a},clone:function(){return new this.constructor(this.attributes)},isNew:function(){return null==this.id},isValid:function(a){return!this.validate||!this.validate(this.attributes,a)},_validate:function(a,b){if(!b.validate||!this.validate)return!0;a=h.extend({},this.attributes,a);var c=this.validationError=this.validate(a,b)||null;return c?(this.trigger("invalid",this,c,b||{}),!1):!0}});var n=a.Collection=function(a,b){b||(b={}),b.model&&(this.model=b.model),void 0!==b.comparator&&(this.comparator=b.comparator),this.models=[],this._reset(),this.initialize.apply(this,arguments),a&&this.reset(a,h.extend({silent:!0},b))};h.extend(n.prototype,l,{model:m,initialize:function(){},toJSON:function(a){return this.map(function(b){return b.toJSON(a)})},sync:function(){return a.sync.apply(this,arguments)},add:function(a,b){a=h.isArray(a)?a.slice():[a],b||(b={});var c,d,f,i,j,k,l,m,n,o;for(l=[],m=b.at,n=this.comparator&&null==m&&0!=b.sort,o=h.isString(this.comparator)?this.comparator:null,c=0,d=a.length;d>c;c++)(f=this._prepareModel(i=a[c],b))?(j=this.get(f))?b.merge&&(j.set(i===f?f.attributes:i,b),n&&!k&&j.hasChanged(o)&&(k=!0)):(l.push(f),f.on("all",this._onModelEvent,this),this._byId[f.cid]=f,null!=f.id&&(this._byId[f.id]=f)):this.trigger("invalid",this,i,b);if(l.length&&(n&&(k=!0),this.length+=l.length,null!=m?g.apply(this.models,[m,0].concat(l)):e.apply(this.models,l)),k&&this.sort({silent:!0}),b.silent)return this;for(c=0,d=l.length;d>c;c++)(f=l[c]).trigger("add",f,this,b);return k&&this.trigger("sort",this,b),this},remove:function(a,b){a=h.isArray(a)?a.slice():[a],b||(b={});var c,d,e,f;for(c=0,d=a.length;d>c;c++)f=this.get(a[c]),f&&(delete this._byId[f.id],delete this._byId[f.cid],e=this.indexOf(f),this.models.splice(e,1),this.length--,b.silent||(b.index=e,f.trigger("remove",f,this,b)),this._removeReference(f));return this},push:function(a,b){return a=this._prepareModel(a,b),this.add(a,h.extend({at:this.length},b)),a},pop:function(a){var b=this.at(this.length-1);return this.remove(b,a),b},unshift:function(a,b){return a=this._prepareModel(a,b),this.add(a,h.extend({at:0},b)),a},shift:function(a){var b=this.at(0);return this.remove(b,a),b},slice:function(a,b){return this.models.slice(a,b)},get:function(a){return null==a?void 0:(this._idAttr||(this._idAttr=this.model.prototype.idAttribute),this._byId[a.id||a.cid||a[this._idAttr]||a])},at:function(a){return this.models[a]},where:function(a){return h.isEmpty(a)?[]:this.filter(function(b){for(var c in a)if(a[c]!==b.get(c))return!1;return!0})},sort:function(a){if(!this.comparator)throw new Error("Cannot sort a set without a comparator");return a||(a={}),h.isString(this.comparator)||1===this.comparator.length?this.models=this.sortBy(this.comparator,this):this.models.sort(h.bind(this.comparator,this)),a.silent||this.trigger("sort",this,a),this},pluck:function(a){return h.invoke(this.models,"get",a)},update:function(a,b){b=h.extend({add:!0,merge:!0,remove:!0},b),b.parse&&(a=this.parse(a,b));var c,d,e,f,g=[],i=[],j={};if(h.isArray(a)||(a=a?[a]:[]),b.add&&!b.remove)return this.add(a,b);for(d=0,e=a.length;e>d;d++)c=a[d],f=this.get(c),b.remove&&f&&(j[f.cid]=!0),(b.add&&!f||b.merge&&f)&&g.push(c);if(b.remove)for(d=0,e=this.models.length;e>d;d++)c=this.models[d],j[c.cid]||i.push(c);return i.length&&this.remove(i,b),g.length&&this.add(g,b),this},reset:function(a,b){b||(b={}),b.parse&&(a=this.parse(a,b));for(var c=0,d=this.models.length;d>c;c++)this._removeReference(this.models[c]);return b.previousModels=this.models.slice(),this._reset(),a&&this.add(a,h.extend({silent:!0},b)),b.silent||this.trigger("reset",this,b),this},fetch:function(a){a=a?h.clone(a):{},void 0===a.parse&&(a.parse=!0);var b=a.success;return a.success=function(a,c,d){var e=d.update?"update":"reset";a[e](c,d),b&&b(a,c,d)},this.sync("read",this,a)},create:function(a,b){if(b=b?h.clone(b):{},!(a=this._prepareModel(a,b)))return!1;b.wait||this.add(a,b);var c=this,d=b.success;return b.success=function(a,b,e){e.wait&&c.add(a,e),d&&d(a,b,e)},a.save(null,b),a},parse:function(a){return a},clone:function(){return new this.constructor(this.models)},_reset:function(){this.length=0,this.models.length=0,this._byId={}},_prepareModel:function(a,b){if(a instanceof m)return a.collection||(a.collection=this),a;b||(b={}),b.collection=this;var c=new this.model(a,b);return c._validate(a,b)?c:!1},_removeReference:function(a){this===a.collection&&delete a.collection,a.off("all",this._onModelEvent,this)},_onModelEvent:function(a,b,c,d){("add"!==a&&"remove"!==a||c===this)&&("destroy"===a&&this.remove(b,d),b&&a==="change:"+b.idAttribute&&(delete this._byId[b.previous(b.idAttribute)],null!=b.id&&(this._byId[b.id]=b)),this.trigger.apply(this,arguments))},sortedIndex:function(a,b,c){b||(b=this.comparator);var d=h.isFunction(b)?b:function(a){return a.get(b)};return h.sortedIndex(this.models,a,d,c)}});var o=["forEach","each","map","collect","reduce","foldl","inject","reduceRight","foldr","find","detect","filter","select","reject","every","all","some","any","include","contains","invoke","max","min","toArray","size","first","head","take","initial","rest","tail","drop","last","without","indexOf","shuffle","lastIndexOf","isEmpty","chain"];h.each(o,function(a){n.prototype[a]=function(){var b=f.call(arguments);return b.unshift(this.models),h[a].apply(h,b)}});var p=["groupBy","countBy","sortBy"];h.each(p,function(a){n.prototype[a]=function(b,c){var d=h.isFunction(b)?b:function(a){return a.get(b)};return h[a](this.models,d,c)}});var q=a.Router=function(a){a||(a={}),a.routes&&(this.routes=a.routes),this._bindRoutes(),this.initialize.apply(this,arguments)},r=/\((.*?)\)/g,s=/(\(\?)?:\w+/g,t=/\*\w+/g,u=/[\-{}\[\]+?.,\\\^$|#\s]/g;h.extend(q.prototype,l,{initialize:function(){},route:function(b,c,d){return h.isRegExp(b)||(b=this._routeToRegExp(b)),d||(d=this[c]),a.history.route(b,h.bind(function(e){var f=this._extractParameters(b,e);d&&d.apply(this,f),this.trigger.apply(this,["route:"+c].concat(f)),this.trigger("route",c,f),a.history.trigger("route",this,c,f)},this)),this},navigate:function(b,c){return a.history.navigate(b,c),this},_bindRoutes:function(){if(this.routes)for(var a,b=h.keys(this.routes);null!=(a=b.pop());)this.route(a,this.routes[a])},_routeToRegExp:function(a){return a=a.replace(u,"\\$&").replace(r,"(?:$1)?").replace(s,function(a,b){return b?a:"([^/]+)"}).replace(t,"(.*?)"),new RegExp("^"+a+"$")},_extractParameters:function(a,b){return a.exec(b).slice(1)}});var v=a.History=function(){this.handlers=[],h.bindAll(this,"checkUrl"),"undefined"!=typeof window&&(this.location=window.location,this.history=window.history)},w=/^[#\/]|\s+$/g,x=/^\/+|\/+$/g,y=/msie [\w.]+/,z=/\/$/;v.started=!1,h.extend(v.prototype,l,{interval:50,getHash:function(a){var b=(a||this).location.href.match(/#(.*)$/);return b?b[1]:""},getFragment:function(a,b){if(null==a)if(this._hasPushState||!this._wantsHashChange||b){a=this.location.pathname;var c=this.root.replace(z,"");a.indexOf(c)||(a=a.substr(c.length))}else a=this.getHash();return a.replace(w,"")},start:function(b){if(v.started)throw new Error("Backbone.history has already been started");v.started=!0,this.options=h.extend({},{root:"/"},this.options,b),this.root=this.options.root,this._wantsHashChange=this.options.hashChange!==!1,this._wantsPushState=!!this.options.pushState,this._hasPushState=!!(this.options.pushState&&this.history&&this.history.pushState);var c=this.getFragment(),d=document.documentMode,e=y.exec(navigator.userAgent.toLowerCase())&&(!d||7>=d);this.root=("/"+this.root+"/").replace(x,"/"),e&&this._wantsHashChange&&(this.iframe=a.$('<iframe src="javascript:0" tabindex="-1" />').hide().appendTo("body")[0].contentWindow,this.navigate(c)),this._hasPushState?a.$(window).on("popstate",this.checkUrl):this._wantsHashChange&&"onhashchange"in window&&!e?a.$(window).on("hashchange",this.checkUrl):this._wantsHashChange&&(this._checkUrlInterval=setInterval(this.checkUrl,this.interval)),this.fragment=c;var f=this.location,g=f.pathname.replace(/[^\/]$/,"$&/")===this.root;return this._wantsHashChange&&this._wantsPushState&&!this._hasPushState&&!g?(this.fragment=this.getFragment(null,!0),this.location.replace(this.root+this.location.search+"#"+this.fragment),!0):(this._wantsPushState&&this._hasPushState&&g&&f.hash&&(this.fragment=this.getHash().replace(w,""),this.history.replaceState({},document.title,this.root+this.fragment+f.search)),this.options.silent?void 0:this.loadUrl())},stop:function(){a.$(window).off("popstate",this.checkUrl).off("hashchange",this.checkUrl),clearInterval(this._checkUrlInterval),v.started=!1},route:function(a,b){this.handlers.unshift({route:a,callback:b})},checkUrl:function(){var a=this.getFragment();return a===this.fragment&&this.iframe&&(a=this.getFragment(this.getHash(this.iframe))),a===this.fragment?!1:(this.iframe&&this.navigate(a),void(this.loadUrl()||this.loadUrl(this.getHash())))},loadUrl:function(a){var b=this.fragment=this.getFragment(a),c=h.any(this.handlers,function(a){return a.route.test(b)?(a.callback(b),!0):void 0});return c},navigate:function(a,b){if(!v.started)return!1;if(b&&b!==!0||(b={trigger:b}),a=this.getFragment(a||""),this.fragment!==a){this.fragment=a;var c=this.root+a;if(this._hasPushState)this.history[b.replace?"replaceState":"pushState"]({},document.title,c);else{if(!this._wantsHashChange)return this.location.assign(c);this._updateHash(this.location,a,b.replace),this.iframe&&a!==this.getFragment(this.getHash(this.iframe))&&(b.replace||this.iframe.document.open().close(),this._updateHash(this.iframe.location,a,b.replace))}b.trigger&&this.loadUrl(a)}},_updateHash:function(a,b,c){if(c){var d=a.href.replace(/(javascript:|#).*$/,"");a.replace(d+"#"+b)}else a.hash="#"+b}}),a.history=new v;var A=a.View=function(a){this.cid=h.uniqueId("view"),this._configure(a||{}),this._ensureElement(),this.initialize.apply(this,arguments),this.delegateEvents()},B=/^(\S+)\s*(.*)$/,C=["model","collection","el","id","attributes","className","tagName","events"];h.extend(A.prototype,l,{tagName:"div",$:function(a){return this.$el.find(a)},initialize:function(){},render:function(){return this},remove:function(){return this.$el.remove(),this.stopListening(),this},setElement:function(b,c){return this.$el&&this.undelegateEvents(),this.$el=b instanceof a.$?b:a.$(b),this.el=this.$el[0],c!==!1&&this.delegateEvents(),this},delegateEvents:function(a){if(a||(a=h.result(this,"events"))){this.undelegateEvents();for(var b in a){var c=a[b];if(h.isFunction(c)||(c=this[a[b]]),!c)throw new Error('Method "'+a[b]+'" does not exist');var d=b.match(B),e=d[1],f=d[2];c=h.bind(c,this),e+=".delegateEvents"+this.cid,""===f?this.$el.on(e,c):this.$el.on(e,f,c)}}},undelegateEvents:function(){this.$el.off(".delegateEvents"+this.cid)},_configure:function(a){this.options&&(a=h.extend({},h.result(this,"options"),a)),h.extend(this,h.pick(a,C)),this.options=a},_ensureElement:function(){if(this.el)this.setElement(h.result(this,"el"),!1);else{var b=h.extend({},h.result(this,"attributes"));this.id&&(b.id=h.result(this,"id")),this.className&&(b["class"]=h.result(this,"className"));var c=a.$("<"+h.result(this,"tagName")+">").attr(b);this.setElement(c,!1)}}});var D={create:"POST",update:"PUT",patch:"PATCH","delete":"DELETE",read:"GET"};a.sync=function(b,c,d){var e=D[b];h.defaults(d||(d={}),{emulateHTTP:a.emulateHTTP,emulateJSON:a.emulateJSON});var f={type:e,dataType:"json"};if(d.url||(f.url=h.result(c,"url")||F()),null!=d.data||!c||"create"!==b&&"update"!==b&&"patch"!==b||(f.contentType="application/json",f.data=JSON.stringify(d.attrs||c.toJSON(d))),d.emulateJSON&&(f.contentType="application/x-www-form-urlencoded",f.data=f.data?{model:f.data}:{}),d.emulateHTTP&&("PUT"===e||"DELETE"===e||"PATCH"===e)){f.type="POST",d.emulateJSON&&(f.data._method=e);var g=d.beforeSend;d.beforeSend=function(a){return a.setRequestHeader("X-HTTP-Method-Override",e),g?g.apply(this,arguments):void 0}}"GET"===f.type||d.emulateJSON||(f.processData=!1);var i=d.success;d.success=function(a){i&&i(c,a,d),c.trigger("sync",c,a,d)};var j=d.error;d.error=function(a){j&&j(c,a,d),c.trigger("error",c,a,d)};var k=d.xhr=a.ajax(h.extend(f,d));return c.trigger("request",c,k,d),k},a.ajax=function(){return a.$.ajax.apply(a.$,arguments)};var E=function(a,b){var c,d=this;c=a&&h.has(a,"constructor")?a.constructor:function(){return d.apply(this,arguments)},h.extend(c,d,b);var e=function(){this.constructor=c};return e.prototype=d.prototype,c.prototype=new e,a&&h.extend(c.prototype,a),c.__super__=d.prototype,c};m.extend=n.extend=q.extend=A.extend=v.extend=E;var F=function(){throw new Error('A "url" property or function must be specified')}}).call(this);