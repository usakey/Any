nv.models.multiBarTimeSeries=function(){function a(u){return u.each(function(a){var u=g-f.left-f.right,v=h-f.top-f.bottom,w=d3.select(this);q&&(a=d3.layout.stack().offset("zero").values(function(a){return a.values}).y(n)(a)),a=a.map(function(a,b){return a.values=a.values.map(function(a){return a.series=b,a}),a});var x=b&&c?[]:a.map(function(a){return a.values.map(function(a,b){return{x:m(a,b),y:n(a,b),y0:a.y0}})});i.domain(d3.extent(d3.merge(x).map(function(a){return a.x}))).range([0,u]),k.domain(c||d3.extent(d3.merge(x).map(function(a){return a.y+(q?a.y0:0)}).concat(o))).range([v,0]),(i.domain()[0]===i.domain()[1]||k.domain()[0]===k.domain()[1])&&(singlePoint=!0),i.domain()[0]===i.domain()[1]&&i.domain(i.domain()[0]?[i.domain()[0]-.01*i.domain()[0],i.domain()[1]+.01*i.domain()[1]]:[-1,1]),k.domain()[0]===k.domain()[1]&&k.domain(k.domain()[0]?[k.domain()[0]+.01*k.domain()[0],k.domain()[1]-.01*k.domain()[1]]:[-1,1]),d=d||i,e=e||k;var y=w.selectAll("g.nv-wrap.nv-multibar").data([a]),z=y.enter().append("g").attr("class","nvd3 nv-wrap nv-multibar"),A=z.append("defs"),B=z.append("g"),C=y.select("g");B.append("g").attr("class","nv-groups"),y.attr("transform","translate("+f.left+","+f.top+")"),A.append("clipPath").attr("id","nv-edge-clip-"+l).append("rect"),y.select("#nv-edge-clip-"+l+" rect").attr("width",u).attr("height",v),C.attr("clip-path",p?"url(#nv-edge-clip-"+l+")":"");var D=y.select(".nv-groups").selectAll(".nv-group").data(function(a){return a},function(a){return a.key});D.enter().append("g").style("stroke-opacity",1e-6).style("fill-opacity",1e-6),d3.transition(D.exit()).selectAll("rect.nv-bar").delay(function(b,c){return c*s/a[0].values.length}).attr("y",function(a){return e(q?a.y0:0)}).attr("height",0).remove(),D.attr("class",function(a,b){return"nv-group nv-series-"+b}).classed("hover",function(a){return a.hover}).style("fill",function(a,b){return r(a,b)}).style("stroke",function(a,b){return r(a,b)}),d3.transition(D).style("stroke-opacity",1).style("fill-opacity",.75);var E=D.selectAll("rect.nv-bar").data(function(a){return a.values});E.exit().remove();for(var F=0,G=0;G<x.length;G+=1)F=Math.max(x[G].length,F);{var H=u/F-.1,I=H/a.length;E.enter().append("rect").attr("class",function(a,b){return n(a,b)<0?"nv-bar negative":"nv-bar positive"}).attr("x",function(a,b,c){return q?0:b*H+c*I}).attr("y",function(a){return e(q?a.y0:0)}).attr("height",0).attr("width",q?H:I)}E.on("mouseover",function(b,c){d3.select(this).classed("hover",!0),t.elementMouseover({value:n(b,c),point:b,series:a[b.series],pos:[i(m(b,c))+I*(q?a.length/2:b.series+.5)/a.length,k(n(b,c)+(q?b.y0:0))],pointIndex:c,seriesIndex:b.series,e:d3.event})}).on("mouseout",function(b,c){d3.select(this).classed("hover",!1),t.elementMouseout({value:n(b,c),point:b,series:a[b.series],pointIndex:c,seriesIndex:b.series,e:d3.event})}).on("click",function(b,c){t.elementClick({value:n(b,c),point:b,series:a[b.series],pos:[i(m(b,c))+I*(q?a.length/2:b.series+.5)/a.length,k(n(b,c)+(q?b.y0:0))],pointIndex:c,seriesIndex:b.series,e:d3.event}),d3.event.stopPropagation()}).on("dblclick",function(b,c){t.elementDblClick({value:n(b,c),point:b,series:a[b.series],pos:[i(m(b,c))+I*(q?a.length/2:b.series+.5)/a.length,k(n(b,c)+(q?b.y0:0))],pointIndex:c,seriesIndex:b.series,e:d3.event}),d3.event.stopPropagation()}),E.attr("class",function(a,b){return n(a,b)<0?"nv-bar negative":"nv-bar positive"}).attr("transform",function(a,b){return"translate("+i(m(a,b))+",0)"}),q?d3.transition(E).delay(function(b,c){return c*s/a[0].values.length}).attr("y",function(a,b){return k(n(a,b)+(q?a.y0:0))}).attr("height",function(a){return Math.abs(k(a.y+(q?a.y0:0))-k(q?a.y0:0))}).each("end",function(){d3.transition(d3.select(this)).attr("x",function(a,b){return q?0:b*H+j*I}).attr("width",q?H:I)}):d3.transition(E).delay(function(b,c){return c*s/a[0].values.length}).attr("x",function(a){return a.series*I}).attr("width",I).each("end",function(){d3.transition(d3.select(this)).attr("y",function(a,b){return k(n(a,b)<0?0:n(a,b))}).attr("height",function(a,b){return Math.abs(k(n(a,b))-k(0))})}),d=i.copy(),e=k.copy()}),a}var b,c,d,e,f={top:0,right:0,bottom:0,left:0},g=960,h=500,i=d3.time.scale(),k=d3.scale.linear(),l=Math.floor(1e4*Math.random()),m=function(a){return a.x},n=function(a){return a.y},o=[0],p=!0,q=!1,r=nv.utils.defaultColor(),s=1200,t=d3.dispatch("chartClick","elementClick","elementDblClick","elementMouseover","elementMouseout");return a.dispatch=t,a.x=function(b){return arguments.length?(m=b,a):m},a.y=function(b){return arguments.length?(n=b,a):n},a.margin=function(b){return arguments.length?(f.top="undefined"!=typeof b.top?b.top:f.top,f.right="undefined"!=typeof b.right?b.right:f.right,f.bottom="undefined"!=typeof b.bottom?b.bottom:f.bottom,f.left="undefined"!=typeof b.left?b.left:f.left,a):f},a.width=function(b){return arguments.length?(g=b,a):g},a.height=function(b){return arguments.length?(h=b,a):h},a.xScale=function(b){return arguments.length?(i=b,a):i},a.yScale=function(b){return arguments.length?(k=b,a):k},a.xDomain=function(c){return arguments.length?(b=c,a):b},a.yDomain=function(b){return arguments.length?(c=b,a):c},a.forceY=function(b){return arguments.length?(o=b,a):o},a.stacked=function(b){return arguments.length?(q=b,a):q},a.clipEdge=function(b){return arguments.length?(p=b,a):p},a.color=function(b){return arguments.length?(r=nv.utils.getColor(b),a):r},a.id=function(b){return arguments.length?(l=b,a):l},a.delay=function(b){return arguments.length?(s=b,a):s},a};