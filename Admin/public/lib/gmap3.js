!function(a,b){function c(){F||(F={verbose:!1,queryLimit:{attempt:5,delay:250,random:250},classes:{Map:google.maps.Map,Marker:google.maps.Marker,InfoWindow:google.maps.InfoWindow,Circle:google.maps.Circle,Rectangle:google.maps.Rectangle,OverlayView:google.maps.OverlayView,StreetViewPanorama:google.maps.StreetViewPanorama,KmlLayer:google.maps.KmlLayer,TrafficLayer:google.maps.TrafficLayer,BicyclingLayer:google.maps.BicyclingLayer,GroundOverlay:google.maps.GroundOverlay,StyledMapType:google.maps.StyledMapType,ImageMapType:google.maps.ImageMapType},map:{mapTypeId:google.maps.MapTypeId.ROADMAP,center:[46.578498,2.457275],zoom:2},overlay:{pane:"floatPane",content:"",offset:{x:0,y:0}},geoloc:{getCurrentPosition:{maximumAge:6e4,timeout:5e3}}})}function d(a,c){return a!==b?a:"gmap3_"+(c?G+1:++G)}function e(b,c,d,e,f){if(c.todo.events||c.todo.onces)var g={id:e,data:c.todo.data,tag:c.todo.tag};c.todo.events&&a.each(c.todo.events,function(a,c){google.maps.event.addListener(d,a,function(a){c.apply(b,[f?f:d,a,g])})}),c.todo.onces&&a.each(c.todo.onces,function(a,c){google.maps.event.addListenerOnce(d,a,function(a){c.apply(b,[f?f:d,a,g])})})}function f(){var a=[];this.empty=function(){return!a.length},this.add=function(b){a.push(b)},this.get=function(){return a.length?a[0]:!1},this.ack=function(){a.shift()}}function g(b,c,d){function e(a){var b={};return b[a]={},b}function f(){var a;for(a in d)if(!(a in h))return a}var g,h={},i=this,j={latLng:{map:!1,marker:!1,infowindow:!1,circle:!1,overlay:!1,getlatlng:!1,getmaxzoom:!1,getelevation:!1,streetviewpanorama:!1,getaddress:!0},geoloc:{getgeoloc:!0}};"string"==typeof d&&(d=e(d)),this.run=function(){for(var e,i;e=f();){if("function"==typeof b[e])return g=e,i=a.extend(!0,{},F[e]||{},d[e].options||{}),void(e in j.latLng?d[e].values?B(d[e].values,b,b[e],{todo:d[e],opts:i,session:h}):A(b,b[e],j.latLng[e],{todo:d[e],opts:i,session:h}):e in j.geoloc?C(b,b[e],{todo:d[e],opts:i,session:h}):b[e].apply(b,[{todo:d[e],opts:i,session:h}]));h[e]=null}c.apply(b,[d,h])},this.ack=function(a){h[g]=a,i.run.apply(i,[])}}function h(a){var b,c=[];for(b in a)c.push(b);return c}function i(b,c){var d={};if(b.todo)for(var e in b.todo)"options"!==e&&"values"!==e&&(d[e]=b.todo[e]);var f,g=["data","tag","id","events","onces"];for(f=0;f<g.length;f++)j(d,g[f],c,b.todo);return d.options=a.extend({},b.todo.options||{},c.options||{}),d}function j(a,b){for(var c=2;c<arguments.length;c++)if(b in arguments[c])return void(a[b]=arguments[c][b])}function k(){var a=[];this.get=function(b){if(a.length){var c,d,e,f,g,i=h(b);for(c=0;c<a.length;c++){for(f=a[c],g=i.length==f.keys.length,d=0;d<i.length&&g;d++)e=i[d],g=e in f.request,g&&(g="object"==typeof b[e]&&"equals"in b[e]&&"function"==typeof b[e]?b[e].equals(f.request[e]):b[e]===f.request[e]);if(g)return f.results}}},this.store=function(b,c){a.push({request:b,keys:h(b),results:c})}}function l(b,c,d,e){var f=this,g=[];F.classes.OverlayView.call(this),this.setMap(b),this.onAdd=function(){var b=this.getPanes();c.pane in b&&a(b[c.pane]).append(e),a.each("dblclick click mouseover mousemove mouseout mouseup mousedown".split(" "),function(b,c){g.push(google.maps.event.addDomListener(e[0],c,function(b){a.Event(b).stopPropagation(),google.maps.event.trigger(f,c,[b])}))}),g.push(google.maps.event.addDomListener(e[0],"contextmenu",function(b){a.Event(b).stopPropagation(),google.maps.event.trigger(f,"rightclick",[b])})),this.draw()},this.getPosition=function(){return d},this.draw=function(){this.draw=function(){var a=this.getProjection().fromLatLngToDivPixel(d);e.css("left",a.x+c.offset.x+"px").css("top",a.y+c.offset.y+"px")}},this.onRemove=function(){for(var a=0;a<g.length;a++)google.maps.event.removeListener(g[a]);e.remove()},this.hide=function(){e.hide()},this.show=function(){e.show()},this.toggle=function(){e&&(e.is(":visible")?this.show():this.hide())},this.toggleDOM=function(){this.setMap(this.getMap()?null:b)},this.getDOMElement=function(){return e[0]}}function m(a){function b(){return this.onAdd=function(){},this.onRemove=function(){},this.draw=function(){},F.classes.OverlayView.apply(this,[])}b.prototype=F.classes.OverlayView.prototype;var c=new b;return c.setMap(a),c}function n(c,f,g,h){function i(){return(s=I.getProjection())?(z=!0,C.push(google.maps.event.addListener(f,"zoom_changed",function(){o()})),C.push(google.maps.event.addListener(f,"bounds_changed",function(){o()})),void q()):void setTimeout(function(){i.apply(B,[])},25)}function j(a){"object"==typeof D[a]?("function"==typeof D[a].obj.setMap&&D[a].obj.setMap(null),"function"==typeof D[a].obj.remove&&D[a].obj.remove(),"function"==typeof D[a].shadow.remove&&D[a].obj.remove(),"function"==typeof D[a].shadow.setMap&&D[a].shadow.setMap(null),delete D[a].obj,delete D[a].shadow):F[a]&&F[a].setMap(null),delete D[a]}function k(){var a,b,c,d,e,f,g,h;return arguments[0]instanceof google.maps.LatLng?(a=arguments[0].lat(),c=arguments[0].lng(),arguments[1]instanceof google.maps.LatLng?(b=arguments[1].lat(),d=arguments[1].lng()):(b=arguments[1],d=arguments[2])):(a=arguments[0],c=arguments[1],arguments[2]instanceof google.maps.LatLng?(b=arguments[2].lat(),d=arguments[2].lng()):(b=arguments[2],d=arguments[3])),e=Math.PI*a/180,f=Math.PI*c/180,g=Math.PI*b/180,h=Math.PI*d/180,6371e3*Math.acos(Math.min(Math.cos(e)*Math.cos(g)*Math.cos(f)*Math.cos(h)+Math.cos(e)*Math.sin(f)*Math.cos(g)*Math.sin(h)+Math.sin(e)*Math.sin(g),1))}function l(){var a=k(f.getCenter(),f.getBounds().getNorthEast()),b=new google.maps.Circle({center:f.getCenter(),radius:1.25*a});return b.getBounds()}function n(){var a,b={};for(a in D)b[a]=!0;return b}function o(){clearTimeout(r),r=setTimeout(function(){q()},25)}function p(a){var b=s.fromLatLngToDivPixel(a),c=s.fromDivPixelToLatLng(new google.maps.Point(b.x+g,b.y-g)),d=s.fromDivPixelToLatLng(new google.maps.Point(b.x-g,b.y+g));return new google.maps.LatLngBounds(d,c)}function q(){if(!w&&!y&&z){var c,d,e,g,i,k,m,o,q,r=[],s={},v=f.getZoom(),B=h!==b&&v>h,C=n(),E=!1;for(x=!1,v>3&&(o=l(),E=o.getSouthWest().lng()<o.getNorthEast().lng()),a.each(G,function(a,b){b&&(!E||o.contains(b.options.position))&&(!t||t(H[a]))&&r.push(a)});;){for(c=0;s[c]&&c<r.length;)c++;if(c==r.length)break;if(k=[],A&&!B){do{if(m=k,k=[],m.length){for(g=i=0,e=0;e<m.length;e++)g+=G[r[m[e]]].options.position.lat(),i+=G[r[m[e]]].options.position.lng();g/=m.length,i/=m.length,o=p(new google.maps.LatLng(g,i))}else o=p(G[r[c]].options.position);for(d=c;d<r.length;d++)s[d]||o.contains(G[r[d]].options.position)&&k.push(d)}while(m.length<k.length&&k.length>1)}else for(d=c;d<r.length;d++)if(!s[d]){k.push(d);break}for(q={latLng:o.getCenter(),indexes:[],ref:[]},e=0;e<k.length;e++)s[k[e]]=!0,q.indexes.push(r[k[e]]),q.ref.push(r[k[e]]);q.ref=q.ref.join("-"),q.ref in C?delete C[q.ref]:(1===k.length&&(D[q.ref]=!0),function(a){setTimeout(function(){u(a)},1)}(q))}a.each(C,function(a){j(a)}),y=!1}}var r,s,t,u,v,w=!1,x=!1,y=!1,z=!1,A=!0,B=this,C=[],D={},E={},F=[],G=[],H=[],I=m(f);i(),this.getById=function(a){return a in E?F[E[a]]:!1},this.clearById=function(a){if(a in E){var b=E[a];F[b]&&F[b].setMap(null),delete F[b],F[b]=!1,delete G[b],G[b]=!1,delete H[b],H[b]=!1,delete E[a],x=!0}},this.add=function(a,b){a.id=d(a.id),this.clearById(a.id),E[a.id]=F.length,F.push(null),G.push(a),H.push(b),x=!0},this.addMarker=function(a,b){b=b||{},b.id=d(b.id),this.clearById(b.id),b.options||(b.options={}),b.options.position=a.getPosition(),e(c,{todo:b},a,b.id),E[b.id]=F.length,F.push(a),G.push(b),H.push(b.data||{}),x=!0},this.todo=function(a){return G[a]},this.value=function(a){return H[a]},this.marker=function(a){return F[a]},this.setMarker=function(a,b){F[a]=b},this.store=function(a,b,c){D[a.ref]={obj:b,shadow:c}},this.free=function(){for(var b=0;b<C.length;b++)google.maps.event.removeListener(C[b]);C=[],a.each(D,function(a){j(a)}),D={},a.each(G,function(a){G[a]=null}),G=[],a.each(F,function(a){F[a]&&(F[a].setMap(null),delete F[a])}),F=[],a.each(H,function(a){delete H[a]}),H=[],E={}},this.filter=function(a){t=a,q()},this.enable=function(a){A!=a&&(A=a,q())},this.display=function(a){u=a},this.error=function(a){v=a},this.beginUpdate=function(){w=!0},this.endUpdate=function(){w=!1,x&&q()}}function o(a,b){this.id=function(){return a},this.filter=function(a){b.filter(a)},this.enable=function(){b.enable(!0)},this.disable=function(){b.enable(!1)},this.add=function(a,c,d){d||b.beginUpdate(),b.addMarker(a,c),d||b.endUpdate()},this.getById=function(a){return b.getById(a)},this.clearById=function(a,c){c||b.beginUpdate(),b.clearById(a),c||b.endUpdate()}}function p(){function c(c){return c?"function"==typeof c?c:(c=x(c),function(d){if(d===b)return!1;if("object"==typeof d){for(var e=0;e<d.length;e++)if(a.inArray(d[e],c)>=0)return!0;return!1}return a.inArray(d,c)>=0}):void 0}function e(a){return{id:a.id,name:a.name,object:a.obj,tag:a.tag,data:a.data}}function f(a){"function"==typeof a.setMap&&a.setMap(null),"function"==typeof a.remove&&a.remove(),"function"==typeof a.free&&a.free(),a=null}var g={},h={};this.add=function(a,b,c,e){var f=a.todo||{},i=d(f.id);return g[b]||(g[b]=[]),i in h&&this.clearById(i),h[i]={obj:c,sub:e,name:b,id:i,tag:f.tag,data:f.data},g[b].push(i),i},this.getById=function(a,b,c){return a in h?b?h[a].sub:c?e(h[a]):h[a].obj:!1},this.get=function(a,b,d,f){var i,j,k=c(d);if(!g[a]||!g[a].length)return null;for(i=g[a].length;i;)if(i--,j=g[a][b?i:g[a].length-i-1],j&&h[j]){if(k&&!k(h[j].tag))continue;return f?e(h[j]):h[j].obj}return null},this.all=function(a,d,f){var i=[],j=c(d),k=function(a){var b,c;for(b=0;b<g[a].length;b++)if(c=g[a][b],c&&h[c]){if(j&&!j(h[c].tag))continue;i.push(f?e(h[c]):h[c].obj)}};if(a in g)k(a);else if(a===b)for(a in g)k(a);return i},this.rm=function(a,b,c){var d,e;if(!g[a])return!1;if(b)if(c)for(d=g[a].length-1;d>=0&&(e=g[a][d],!b(h[e].tag));d--);else for(d=0;d<g[a].length&&(e=g[a][d],!b(h[e].tag));d++);else d=c?g[a].length-1:0;return d in g[a]?this.clearById(g[a][d],d):!1},this.clearById=function(a,c){if(a in h){var d,e=h[a].name;for(d=0;c===b&&d<g[e].length;d++)a===g[e][d]&&(c=d);return f(h[a].obj),h[a].sub&&f(h[a].sub),delete h[a],g[e].splice(c,1),!0}return!1},this.objGetById=function(a){var b;if(g.clusterer)for(var c in g.clusterer)if((b=h[g.clusterer[c]].obj.getById(a))!==!1)return b;return!1},this.objClearById=function(a){if(g.clusterer)for(var b in g.clusterer)if(h[g.clusterer[b]].obj.clearById(a))return!0;return null},this.clear=function(a,b,d,e){var f,h,i,j=c(e);if(a&&a.length)a=x(a);else{a=[];for(f in g)a.push(f)}for(h=0;h<a.length;h++)if(a[h]){if(i=a[h],!g[i])continue;if(b)this.rm(i,j,!0);else if(d)this.rm(i,j,!1);else for(;this.rm(i,j,!1););}}}function q(){return H.geocoder||(H.geocoder=new google.maps.Geocoder),H.geocoder}function r(){return H.directionsService||(H.directionsService=new google.maps.DirectionsService),H.directionsService}function s(){return H.elevationService||(H.elevationService=new google.maps.ElevationService),H.elevationService}function t(){return H.maxZoomService||(H.maxZoomService=new google.maps.MaxZoomService),H.maxZoomService}function u(){return H.distanceMatrixService||(H.distanceMatrixService=new google.maps.DistanceMatrixService),H.distanceMatrixService}function v(){if(F.verbose){var a,b=[];if(window.console&&"function"==typeof console.error){for(a=0;a<arguments.length;a++)b.push(arguments[a]);console.error.apply(console,b)}else{for(b="",a=0;a<arguments.length;a++)b+=arguments[a].toString()+" ";alert(b)}}}function w(a){return("number"==typeof a||"string"==typeof a)&&""!==a&&!isNaN(a)}function x(a){var c,d=[];if(a!==b)if("object"==typeof a)if("number"==typeof a.length)d=a;else for(c in a)d.push(a[c]);else d.push(a);return d}function y(b,c,d){var e=c?b:null;return b&&"string"!=typeof b?b.latLng?y(b.latLng):b instanceof google.maps.LatLng?b:w(b.lat)?new google.maps.LatLng(b.lat,b.lng):!d&&a.isArray(b)?w(b[0])&&w(b[1])?new google.maps.LatLng(b[0],b[1]):e:e:e}function z(b){var c,d;return!b||b instanceof google.maps.LatLngBounds?b||null:(a.isArray(b)?2==b.length?(c=y(b[0]),d=y(b[1])):4==b.length&&(c=y([b[0],b[1]]),d=y([b[2],b[3]])):"ne"in b&&"sw"in b?(c=y(b.ne),d=y(b.sw)):"n"in b&&"e"in b&&"s"in b&&"w"in b&&(c=y([b.n,b.e]),d=y([b.s,b.w])),c&&d?new google.maps.LatLngBounds(d,c):null)}function A(a,b,c,d,e){var f=c?y(d.todo,!1,!0):!1,g=f?{latLng:f}:d.todo.address?"string"==typeof d.todo.address?{address:d.todo.address}:d.todo.address:!1,h=g?I.get(g):!1,i=this;g?(e=e||0,h?(d.latLng=h.results[0].geometry.location,d.results=h.results,d.status=h.status,b.apply(a,[d])):(g.location&&(g.location=y(g.location)),g.bounds&&(g.bounds=z(g.bounds)),q().geocode(g,function(f,h){h===google.maps.GeocoderStatus.OK?(I.store(g,{results:f,status:h}),d.latLng=f[0].geometry.location,d.results=f,d.status=h,b.apply(a,[d])):h===google.maps.GeocoderStatus.OVER_QUERY_LIMIT&&e<F.queryLimit.attempt?setTimeout(function(){A.apply(i,[a,b,c,d,e+1])},F.queryLimit.delay+Math.floor(Math.random()*F.queryLimit.random)):(v("geocode failed",h,g),d.latLng=d.results=!1,d.status=h,b.apply(a,[d]))}))):(d.latLng=y(d.todo,!1,!0),b.apply(a,[d]))}function B(b,c,d,e){function f(){do h++;while(h<b.length&&!("address"in b[h]));return h>=b.length?void d.apply(c,[e]):void A(g,function(c){delete c.todo,a.extend(b[h],c),f.apply(g,[])},!0,{todo:b[h]})}var g=this,h=-1;f()}function C(a,b,c){var d=!1;navigator&&navigator.geolocation?navigator.geolocation.getCurrentPosition(function(e){d||(d=!0,c.latLng=new google.maps.LatLng(e.coords.latitude,e.coords.longitude),b.apply(a,[c]))},function(){d||(d=!0,c.latLng=!1,b.apply(a,[c]))},c.opts.getCurrentPosition):(c.latLng=!1,b.apply(a,[c]))}function D(c){function h(){!B&&(B=D.get())&&B.run()}function j(){B=null,D.ack(),h.call(C)}function k(b){var d,e=[];for(d=1;d<arguments.length;d++)e.push(arguments[d]);"function"==typeof b.todo.callback?b.todo.callback.apply(c,e):"object"==typeof b.todo.callback&&a.each(b.todo.callback,function(a,b){"function"==typeof b&&b.apply(c,e)})}function m(a,b,d){d&&e(c,a,b,d),k(a,b),B.ack(b)}function q(b,d){if(d=d||{},G)d.todo&&d.todo.options&&G.setOptions(d.todo.options);else{var e=d.opts||a.extend(!0,{},F.map,d.todo&&d.todo.options?d.todo.options:{});e.center=b||y(e.center),G=new F.classes.Map(c.get(0),e)}}function w(b,d,f){var g=[],h="values"in b.todo;return h||(b.todo.values=[{options:b.opts}]),b.todo.values.length?(q(),a.each(b.todo.values,function(h,j){var k,l,m,n,o=i(b,j);if(o.options[f])if(o.options[f][0][0]&&a.isArray(o.options[f][0][0]))for(l=0;l<o.options[f].length;l++)for(m=0;m<o.options[f][l].length;m++)o.options[f][l][m]=y(o.options[f][l][m]);else for(l=0;l<o.options[f].length;l++)o.options[f][l]=y(o.options[f][l]);o.options.map=G,n=new google.maps[d](o.options),g.push(n),k=E.add({todo:o},d.toLowerCase(),n),e(c,{todo:o},n,k)}),void m(b,h?g:g[0])):void m(b,!1)}function A(d){var f,g,h=new n(c,G,d.radius,d.maxZoom),i={},j={},k=/^[0-9]+$/;for(g in d)k.test(g)?(j[g]=d[g],j[g].width=j[g].width||0,j[g].height=j[g].height||0):i[g]=d[g];return f=i.calculator?function(b){var d=[];return a.each(b,function(a,b){d.push(h.value(b))}),i.calculator.apply(c,[d])}:function(a){return a.length},h.error(function(){v.apply(C,arguments)}),h.display(function(d){var g,k,l,m,n,o=0,p=f(d.indexes);if(p>1){for(g in j)g=1*g,g>o&&p>=g&&(o=g);k=j[o]}k?(n=k.offset||[-k.width/2,-k.height/2],l=a.extend({},i),l.options=a.extend({pane:"overlayLayer",content:k.content?k.content.replace("CLUSTER_COUNT",p):"",offset:{x:("x"in n?n.x:n[0])||0,y:("y"in n?n.y:n[1])||0}},i.options||{}),m=C.overlay({todo:l,opts:l.options,latLng:y(d)},!0),l.options.pane="floatShadow",l.options.content=a(document.createElement("div")).width(k.width+"px").height(k.height+"px"),shadow=C.overlay({todo:l,opts:l.options,latLng:y(d)},!0),i.data={latLng:y(d),markers:[]},a.each(d.indexes,function(a,b){i.data.markers.push(h.value(b)),h.marker(b)&&h.marker(b).setMap(null)}),e(c,{todo:i},shadow,b,{main:m,shadow:shadow}),h.store(d,m,shadow)):a.each(d.indexes,function(a,b){if(h.marker(b))h.marker(b).setMap(G);else{var d=h.todo(b),f=new F.classes.Marker(d.options);h.setMarker(b,f),e(c,{todo:d},f,d.id)}})}),h}var B,C=this,D=new f,E=new p,G=null;this._plan=function(a){for(var b=0;b<a.length;b++)D.add(new g(C,j,a[b]));h()},this.map=function(a){q(a.latLng,a),e(c,a,G),m(a,G)},this.destroy=function(a){E.clear(),c.empty(),G&&(G=null),m(a,!0)},this.infowindow=function(d){var f=[],g="values"in d.todo;g||(d.latLng?d.opts.position=d.latLng:d.opts.position&&(d.opts.position=y(d.opts.position)),d.todo.values=[{options:d.opts}]),a.each(d.todo.values,function(a,h){var j,k,l=i(d,h);G||q(l.options.position),k=new F.classes.InfoWindow(l.options),k&&(l.open===b||l.open)&&(g?k.open(G,l.anchor?l.anchor:b):k.open(G,l.anchor?l.anchor:d.latLng?b:d.session.marker?d.session.marker:b)),f.push(k),j=E.add({todo:l},"infowindow",k),e(c,{todo:l},k,j)}),m(d,g?f:f[0])},this.circle=function(b){var d=[],f="values"in b.todo;return f||(b.opts.center=b.latLng||y(b.opts.center),b.todo.values=[{options:b.opts}]),b.todo.values.length?(a.each(b.todo.values,function(a,f){var g,h,j=i(b,f);j.options.center=y(j.options.center?j.options.center:f),G||q(j.options.center),j.options.map=G,h=new F.classes.Circle(j.options),d.push(h),g=E.add({todo:j},"circle",h),e(c,{todo:j},h,g)}),void m(b,f?d:d[0])):void m(b,!1)},this.overlay=function(b,c){var d,e,f=a(document.createElement("div")).css("border","none").css("borderWidth","0px").css("position","absolute");return f.append(b.opts.content),l.prototype=new F.classes.OverlayView,e=new l(G,b.opts,b.latLng,f),f=null,c?e:(d=E.add(b,"overlay",e),void m(b,e,d))},this.getaddress=function(a){k(a,a.results,a.status),B.ack()},this.getlatlng=function(a){k(a,a.results,a.status),B.ack()},this.getmaxzoom=function(a){t().getMaxZoomAtLatLng(a.latLng,function(b){k(a,b.status===google.maps.MaxZoomStatus.OK?b.zoom:!1,status),B.ack()})},this.getelevation=function(a){var b,c=[],d=function(b,c){k(a,c===google.maps.ElevationStatus.OK?b:!1,c),B.ack()};if(a.latLng)c.push(a.latLng);else for(c=x(a.todo.locations||[]),b=0;b<c.length;b++)c[b]=y(c[b]);if(c.length)s().getElevationForLocations({locations:c},d);else{if(a.todo.path&&a.todo.path.length)for(b=0;b<a.todo.path.length;b++)c.push(y(a.todo.path[b]));c.length?s().getElevationAlongPath({path:c,samples:a.todo.samples},d):B.ack()}},this.defaults=function(b){a.each(b.todo,function(b,c){F[b]="object"==typeof F[b]?a.extend({},F[b],c):c}),B.ack(!0)},this.rectangle=function(b){var d=[],f="values"in b.todo;return f||(b.todo.values=[{options:b.opts}]),b.todo.values.length?(a.each(b.todo.values,function(a,f){var g,h,j=i(b,f);j.options.bounds=z(j.options.bounds?j.options.bounds:f),G||q(j.options.bounds.getCenter()),j.options.map=G,h=new F.classes.Rectangle(j.options),d.push(h),g=E.add({todo:j},"rectangle",h),e(c,{todo:j},h,g)}),void m(b,f?d:d[0])):void m(b,!1)},this.polyline=function(a){w(a,"Polyline","path")},this.polygon=function(a){w(a,"Polygon","paths")},this.trafficlayer=function(a){q();var b=E.get("trafficlayer");b||(b=new F.classes.TrafficLayer,b.setMap(G),E.add(a,"trafficlayer",b)),m(a,b)},this.bicyclinglayer=function(a){q();var b=E.get("bicyclinglayer");b||(b=new F.classes.BicyclingLayer,b.setMap(G),E.add(a,"bicyclinglayer",b)),m(a,b)},this.groundoverlay=function(a){a.opts.bounds=z(a.opts.bounds),a.opts.bounds&&q(a.opts.bounds.getCenter());var b,c=new F.classes.GroundOverlay(a.opts.url,a.opts.bounds,a.opts.opts);c.setMap(G),b=E.add(a,"groundoverlay",c),m(a,c,b)},this.streetviewpanorama=function(b){b.opts.opts||(b.opts.opts={}),b.latLng?b.opts.opts.position=b.latLng:b.opts.opts.position&&(b.opts.opts.position=y(b.opts.opts.position)),b.todo.divId?b.opts.container=document.getElementById(b.todo.divId):b.opts.container&&(b.opts.container=a(b.opts.container).get(0));var c,d=new F.classes.StreetViewPanorama(b.opts.container,b.opts.opts);d&&G.setStreetView(d),c=E.add(b,"streetviewpanorama",d),m(b,d,c)},this.kmllayer=function(b){var d=[],f="values"in b.todo;return f||(b.todo.values=[{options:b.opts}]),b.todo.values.length?(a.each(b.todo.values,function(a,f){var g,h,j=i(b,f);G||q(),j.options.opts.map=G,h=new F.classes.KmlLayer(j.options.url,j.options.opts),d.push(h),g=E.add({todo:j},"kmllayer",h),e(c,{todo:j},h,g)}),void m(b,f?d:d[0])):void m(b,!1)},this.panel=function(d){q();var e,f,g=0,h=0,i=a(document.createElement("div"));i.css("position","absolute").css("z-index","1000"),d.opts.content&&(f=a(d.opts.content),d.opts.left!==b?g=d.opts.left:d.opts.right!==b?g=c.width()-f.width()-d.opts.right:d.opts.center&&(g=(c.width()-f.width())/2),d.opts.top!==b?h=d.opts.top:d.opts.bottom!==b?h=c.height()-f.height()-d.opts.bottom:d.opts.middle&&(h=(c.height()-f.height())/2),i.css("top",h+"px").css("left",g+"px").append(f)),c.first().prepend(i),e=E.add(d,"panel",i),m(d,i,e),i=null},this.marker=function(b){var f="values"in b.todo,g=!G;if(f||(b.opts.position=b.latLng||y(b.opts.position),b.todo.values=[{options:b.opts}]),!b.todo.values.length)return void m(b,!1);if(g&&q(),b.todo.cluster&&!G.getBounds())return void google.maps.event.addListenerOnce(G,"bounds_changed",function(){C.marker.apply(C,[b])});if(b.todo.cluster){var h,j;b.todo.cluster instanceof o?(h=b.todo.cluster,j=E.getById(h.id(),!0)):(j=A(b.todo.cluster),h=new o(d(b.todo.id,!0),j),E.add(b,"clusterer",h,j)),j.beginUpdate(),a.each(b.todo.values,function(a,c){var d=i(b,c);d.options.position=y(d.options.position?d.options.position:c),d.options.map=G,g&&(G.setCenter(d.options.position),g=!1),j.add(d,c)}),j.endUpdate(),m(b,h)}else{var k=[];a.each(b.todo.values,function(a,d){var f,h,j=i(b,d);j.options.position=y(j.options.position?j.options.position:d),j.options.map=G,g&&(G.setCenter(j.options.position),g=!1),h=new F.classes.Marker(j.options),k.push(h),f=E.add({todo:j},"marker",h),e(c,{todo:j},h,f)}),m(b,f?k:k[0])}},this.getroute=function(a){a.opts.origin=y(a.opts.origin,!0),a.opts.destination=y(a.opts.destination,!0),r().route(a.opts,function(b,c){k(a,c==google.maps.DirectionsStatus.OK?b:!1,c),B.ack()})},this.directionsrenderer=function(b){b.opts.map=G;var c,d=new google.maps.DirectionsRenderer(b.opts);b.todo.divId?d.setPanel(document.getElementById(b.todo.divId)):b.todo.container&&d.setPanel(a(b.todo.container).get(0)),c=E.add(b,"directionrenderer",d),m(b,d,c)},this.getgeoloc=function(a){m(a,a.latLng)},this.styledmaptype=function(a){q();var b=new F.classes.StyledMapType(a.todo.styles,a.opts);G.mapTypes.set(a.todo.id,b),m(a,b)},this.imagemaptype=function(a){q();var b=new F.classes.ImageMapType(a.opts);G.mapTypes.set(a.todo.id,b),m(a,b)},this.autofit=function(b){var c=new google.maps.LatLngBounds;a.each(E.all(),function(a,b){b.getPosition?c.extend(b.getPosition()):b.getBounds?(c.extend(b.getBounds().getNorthEast()),c.extend(b.getBounds().getSouthWest())):b.getPaths?b.getPaths().forEach(function(a){a.forEach(function(a){c.extend(a)})}):b.getPath?b.getPath().forEach(function(a){c.extend(a)}):b.getCenter&&c.extend(b.getCenter())}),c.isEmpty()||G.getBounds()&&G.getBounds().equals(c)||("maxZoom"in b.todo&&google.maps.event.addListenerOnce(G,"bounds_changed",function(){this.getZoom()>b.todo.maxZoom&&this.setZoom(b.todo.maxZoom)}),G.fitBounds(c)),m(b,!0)},this.clear=function(b){if("string"==typeof b.todo){if(E.clearById(b.todo)||E.objClearById(b.todo))return void m(b,!0);b.todo={name:b.todo}}b.todo.id?a.each(x(b.todo.id),function(a,b){E.clearById(b)}):E.clear(x(b.todo.name),b.todo.last,b.todo.first,b.todo.tag),m(b,!0)},this.exec=function(b){var d=this;a.each(x(b.todo.func),function(e,f){a.each(d.get(b.todo,!0,b.todo.hasOwnProperty("full")?b.todo.full:!0),function(a,b){f.call(c,b)})}),m(b,!0)},this.get=function(c,d,e){var f,g,h=d?c:c.todo;return d||(e=h.full),"string"==typeof h?(g=E.getById(h,!1,e)||E.objGetById(h),g===!1&&(f=h,h={})):f=h.name,"map"===f&&(g=G),g||(g=[],h.id?(a.each(x(h.id),function(a,b){g.push(E.getById(b,!1,e)||E.objGetById(b))}),a.isArray(h.id)||(g=g[0])):(a.each(f?x(f):[b],function(b,c){var d;h.first?(d=E.get(c,!1,h.tag,e),d&&g.push(d)):h.all?a.each(E.all(c,h.tag,e),function(a,b){g.push(b)}):(d=E.get(c,!0,h.tag,e),d&&g.push(d))}),h.all||a.isArray(f)||(g=g[0]))),g=a.isArray(g)||!h.all?g:[g],d?g:void m(c,g)},this.getdistance=function(a){var b;for(a.opts.origins=x(a.opts.origins),b=0;b<a.opts.origins.length;b++)a.opts.origins[b]=y(a.opts.origins[b],!0);for(a.opts.destinations=x(a.opts.destinations),b=0;b<a.opts.destinations.length;b++)a.opts.destinations[b]=y(a.opts.destinations[b],!0);u().getDistanceMatrix(a.opts,function(b,c){k(a,c===google.maps.DistanceMatrixStatus.OK?b:!1,c),B.ack()})},this.trigger=function(b){if("string"==typeof b.todo)google.maps.event.trigger(G,b.todo);else{var c=[G,b.todo.eventName];b.todo.var_args&&a.each(b.todo.var_args,function(a,b){c.push(b)}),google.maps.event.trigger.apply(google.maps.event,c)}k(b),B.ack()}}function E(a){var b;if(!a.hasOwnProperty("get"))return!1;for(b in a)if("get"!==b)return!1;return!a.get.hasOwnProperty("callback")}var F,G=0,H={},I=new k;a.fn.gmap3=function(){var b,d=[],e=!0,f=[];for(c(),b=0;b<arguments.length;b++)arguments[b]&&d.push(arguments[b]);return d.length||d.push("map"),a.each(this,function(){var b=a(this),c=b.data("gmap3");e=!1,c||(c=new D(b),b.data("gmap3",c)),1!==d.length||"get"!==d[0]&&!E(d[0])?c._plan(d):f.push(c.get("get"===d[0]?"map":d[0].get,!0))}),f.length?1===f.length?f[0]:f:this}}(jQuery);