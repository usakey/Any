nv.models.line=function(){function a(p){return p.each(function(a){var p=g-f.left-f.right,q=h-f.top-f.bottom;b=b||o.xScale(),c=c||o.yScale(),d=d||b,e=e||c;var r=d3.select(this).selectAll("g.nv-wrap.nv-line").data([a]),s=r.enter().append("g").attr("class","nvd3 nv-wrap nv-line"),t=s.append("defs"),u=s.append("g"),v=r.select("g");s.append("g").attr("class","nv-scatterWrap");var w=r.select(".nv-scatterWrap").datum(a);u.append("g").attr("class","nv-groups"),o.width(p).height(q),d3.transition(w).call(o),r.attr("transform","translate("+f.left+","+f.top+")"),t.append("clipPath").attr("id","nv-edge-clip-"+j).append("rect"),r.select("#nv-edge-clip-"+j+" rect").attr("width",p).attr("height",q),v.attr("clip-path",m?"url(#nv-edge-clip-"+j+")":""),w.attr("clip-path",m?"url(#nv-edge-clip-"+j+")":"");var x=r.select(".nv-groups").selectAll(".nv-group").data(function(a){return a},function(a){return a.key});x.enter().append("g").style("stroke-opacity",1e-6).style("fill-opacity",1e-6),d3.transition(x.exit()).style("stroke-opacity",1e-6).style("fill-opacity",1e-6).remove(),x.attr("class",function(a,b){return"nv-group nv-series-"+b}).classed("hover",function(a){return a.hover}).style("fill",function(a,b){return i(a,b)}).style("stroke",function(a,b){return i(a,b)}),d3.transition(x).style("stroke-opacity",1).style("fill-opacity",.5);var y=x.selectAll("path").data(function(a){return[a.values]});y.enter().append("path").attr("class","nv-line").attr("d",d3.svg.line().interpolate(n).x(function(a,b){return d(k(a,b))}).y(function(a,b){return e(l(a,b))})),d3.transition(x.exit().selectAll("path")).attr("d",d3.svg.line().interpolate(n).x(function(a,c){return b(k(a,c))}).y(function(a,b){return c(l(a,b))})).remove(),d3.transition(y).attr("d",d3.svg.line().interpolate(n).x(function(a,c){return b(k(a,c))}).y(function(a,b){return c(l(a,b))})),d=b.copy(),e=c.copy()}),a}var b,c,d,e,f={top:0,right:0,bottom:0,left:0},g=960,h=500,i=nv.utils.defaultColor(),j=Math.floor(1e4*Math.random()),k=function(a){return a.x},l=function(a){return a.y},m=!1,n="linear",o=nv.models.scatter().id(j).size(16).sizeDomain([16,256]);return a.dispatch=o.dispatch,d3.rebind(a,o,"interactive","size","xScale","yScale","zScale","xDomain","yDomain","sizeDomain","forceX","forceY","forceSize","clipVoronoi","clipRadius"),a.margin=function(b){return arguments.length?(f=b,a):f},a.width=function(b){return arguments.length?(g=b,a):g},a.height=function(b){return arguments.length?(h=b,a):h},a.x=function(b){return arguments.length?(k=b,o.x(b),a):k},a.y=function(b){return arguments.length?(l=b,o.y(b),a):l},a.clipEdge=function(b){return arguments.length?(m=b,a):m},a.color=function(b){return arguments.length?(i=nv.utils.getColor(b),o.color(i),a):i},a.id=function(b){return arguments.length?(j=b,a):j},a.interpolate=function(b){return arguments.length?(n=b,a):n},a.defined=function(b){return arguments.length?(defined=b,a):defined},a};