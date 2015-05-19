nv.models.cumulativeLineChart=function(){function a(r){return r.each(function(z){function A(){d3.select(a.container).style("cursor","ew-resize")}function B(){x.x=d3.event.x,x.i=Math.round(w.invert(x.x)),D()}function C(){d3.select(a.container).style("cursor","auto"),t.index=x.i,v.stateChange(t)}function D(){S.data([x]),a.update()}var E=d3.select(this).classed("nv-chart-"+s,!0),F=this,G=(l||parseInt(E.style("width"))||960)-j.left-j.right,H=(m||parseInt(E.style("height"))||400)-j.top-j.bottom;a.update=function(){a(r)},a.container=this,t.disabled=z.map(function(a){return!!a.disabled});var I=d3.behavior.drag().on("dragstart",A).on("drag",B).on("dragend",C);if(!(z&&z.length&&z.filter(function(a){return a.values.length}).length)){var J=E.selectAll(".nv-noData").data([u]);return J.enter().append("text").attr("class","nvd3 nv-noData").attr("dy","-.7em").style("text-anchor","middle"),J.attr("x",j.left+G/2).attr("y",j.top+H/2).text(function(a){return a}),a}if(E.selectAll(".nv-noData").remove(),c=e.xScale(),d=e.yScale(),q)e.yDomain(null);else{var K=z.filter(function(a){return!a.disabled}).map(function(a){var b=d3.extent(a.values,e.y());return b[0]<-.95&&(b[0]=-.95),[(b[0]-b[1])/(1+b[1]),(b[1]-b[0])/(1+b[0])]}),L=[d3.min(K,function(a){return a[0]}),d3.max(K,function(a){return a[1]})];e.yDomain(L)}w.domain([0,z[0].values.length-1]).range([0,G]).clamp(!0);var z=b(x.i,z),M=E.selectAll("g.nv-wrap.nv-cumulativeLine").data([z]),N=M.enter().append("g").attr("class","nvd3 nv-wrap nv-cumulativeLine").append("g"),O=M.select("g");if(N.append("g").attr("class","nv-x nv-axis"),N.append("g").attr("class","nv-y nv-axis"),N.append("g").attr("class","nv-background"),N.append("g").attr("class","nv-linesWrap"),N.append("g").attr("class","nv-legendWrap"),N.append("g").attr("class","nv-controlsWrap"),n&&(h.width(G),O.select(".nv-legendWrap").datum(z).call(h),j.top!=h.height()&&(j.top=h.height(),H=(m||parseInt(E.style("height"))||400)-j.top-j.bottom),O.select(".nv-legendWrap").attr("transform","translate(0,"+-j.top+")")),p){var P=[{key:"Re-scale y-axis",disabled:!q}];i.width(140).color(["#444","#444","#444"]),O.select(".nv-controlsWrap").datum(P).attr("transform","translate(0,"+-j.top+")").call(i)}M.attr("transform","translate("+j.left+","+j.top+")");var Q=z.filter(function(a){return a.tempDisabled});M.select(".tempDisabled").remove(),Q.length&&M.append("text").attr("class","tempDisabled").attr("x",G/2).attr("y","-.71em").style("text-anchor","end").text(Q.map(function(a){return a.key}).join(", ")+" values cannot be calculated for this time period."),N.select(".nv-background").append("rect"),O.select(".nv-background rect").attr("width",G).attr("height",H),e.y(function(a){return a.display.y}).width(G).height(H).color(z.map(function(a,b){return a.color||k(a,b)}).filter(function(a,b){return!z[b].disabled&&!z[b].tempDisabled}));var R=O.select(".nv-linesWrap").datum(z.filter(function(a){return!a.disabled&&!a.tempDisabled}));R.call(e);var S=R.selectAll(".nv-indexLine").data([x]);S.enter().append("rect").attr("class","nv-indexLine").attr("width",3).attr("x",-2).attr("fill","red").attr("fill-opacity",.5).call(I),S.attr("transform",function(a){return"translate("+w(a.i)+",0)"}).attr("height",H),f.scale(c).ticks(Math.min(z[0].values.length,G/70)).tickSize(-H,0),O.select(".nv-x.nv-axis").attr("transform","translate(0,"+d.range()[0]+")"),d3.transition(O.select(".nv-x.nv-axis")).call(f),g.scale(d).ticks(H/36).tickSize(-G,0),d3.transition(O.select(".nv-y.nv-axis")).call(g),O.select(".nv-background rect").on("click",function(){x.x=d3.mouse(this)[0],x.i=Math.round(w.invert(x.x)),t.index=x.i,v.stateChange(t),D()}),e.dispatch.on("elementClick",function(a){x.i=a.pointIndex,x.x=w(x.i),t.index=x.i,v.stateChange(t),D()}),i.dispatch.on("legendClick",function(b){b.disabled=!b.disabled,q=!b.disabled,t.rescaleY=q,v.stateChange(t),r.call(a)}),h.dispatch.on("legendClick",function(b){b.disabled=!b.disabled,z.filter(function(a){return!a.disabled}).length||z.map(function(a){return a.disabled=!1,M.selectAll(".nv-series").classed("disabled",!1),a}),t.disabled=z.map(function(a){return!!a.disabled}),v.stateChange(t),r.call(a)}),v.on("tooltipShow",function(a){o&&y(a,F.parentNode)}),v.on("changeState",function(b){"undefined"!=typeof b.disabled&&(z.forEach(function(a,c){a.disabled=b.disabled[c]}),t.disabled=b.disabled),"undefined"!=typeof b.index&&(x.i=b.index,x.x=w(x.i),t.index=b.index,S.data([x])),"undefined"!=typeof b.rescaleY&&(q=b.rescaleY),r.call(a)})}),a}function b(a,b){return b.map(function(b){var c=e.y()(b.values[a],a);return-.95>c?(b.tempDisabled=!0,b):(b.tempDisabled=!1,b.values=b.values.map(function(a,b){return a.display={y:(e.y()(a,b)-c)/(1+c)},a}),b)})}var c,d,e=nv.models.line(),f=nv.models.axis(),g=nv.models.axis(),h=nv.models.legend(),i=nv.models.legend(),j={top:30,right:30,bottom:50,left:60},k=nv.utils.defaultColor(),l=null,m=null,n=!0,o=!0,p=!0,q=!0,r=function(a,b,c){return"<h3>"+a+"</h3><p>"+c+" at "+b+"</p>"},s=e.id(),t={index:0,rescaleY:q},u="No Data Available.",v=d3.dispatch("tooltipShow","tooltipHide","stateChange","changeState");f.orient("bottom").tickPadding(7),g.orient("left");var w=d3.scale.linear(),x={i:0,x:0},y=function(b,c){var d=b.pos[0]+(c.offsetLeft||0),h=b.pos[1]+(c.offsetTop||0),i=f.tickFormat()(e.x()(b.point,b.pointIndex)),j=g.tickFormat()(e.y()(b.point,b.pointIndex)),k=r(b.series.key,i,j,b,a);nv.tooltip.show([d,h],k,null,null,c)};return e.dispatch.on("elementMouseover.tooltip",function(a){a.pos=[a.pos[0]+j.left,a.pos[1]+j.top],v.tooltipShow(a)}),e.dispatch.on("elementMouseout.tooltip",function(a){v.tooltipHide(a)}),v.on("tooltipHide",function(){o&&nv.tooltip.cleanup()}),a.dispatch=v,a.lines=e,a.legend=h,a.xAxis=f,a.yAxis=g,d3.rebind(a,e,"defined","isArea","x","y","size","xDomain","yDomain","forceX","forceY","interactive","clipEdge","clipVoronoi","id"),a.margin=function(b){return arguments.length?(j.top="undefined"!=typeof b.top?b.top:j.top,j.right="undefined"!=typeof b.right?b.right:j.right,j.bottom="undefined"!=typeof b.bottom?b.bottom:j.bottom,j.left="undefined"!=typeof b.left?b.left:j.left,a):j},a.width=function(b){return arguments.length?(l=b,a):l},a.height=function(b){return arguments.length?(m=b,a):m},a.color=function(b){return arguments.length?(k=nv.utils.getColor(b),h.color(k),a):k},a.rescaleY=function(a){return arguments.length?q=a:q},a.showControls=function(b){return arguments.length?(p=b,a):p},a.showLegend=function(b){return arguments.length?(n=b,a):n},a.tooltips=function(b){return arguments.length?(o=b,a):o},a.tooltipContent=function(b){return arguments.length?(r=b,a):r},a.state=function(b){return arguments.length?(t=b,a):t},a.noData=function(b){return arguments.length?(u=b,a):u},a};