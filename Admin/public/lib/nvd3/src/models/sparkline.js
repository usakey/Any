nv.models.sparkline=function(){function a(g){return g.each(function(a){var g=e-d.left-d.right,m=f-d.top-d.bottom,n=d3.select(this);h.domain(b||d3.extent(a,j)).range([0,g]),i.domain(c||d3.extent(a,k)).range([m,0]);{var o=n.selectAll("g.nv-wrap.nv-sparkline").data([a]),p=o.enter().append("g").attr("class","nvd3 nv-wrap nv-sparkline");p.append("g"),o.select("g")}o.attr("transform","translate("+d.left+","+d.top+")");var q=o.selectAll("path").data(function(a){return[a]});q.enter().append("path"),q.exit().remove(),q.style("stroke",function(a,b){return a.color||l(a,b)}).attr("d",d3.svg.line().x(function(a,b){return h(j(a,b))}).y(function(a,b){return i(k(a,b))}));var r=o.selectAll("circle.nv-point").data(function(a){function b(b){if(-1!=b){var c=a[b];return c.pointIndex=b,c}return null}var c=a.map(function(a,b){return k(a,b)}),d=b(c.lastIndexOf(i.domain()[1])),e=b(c.indexOf(i.domain()[0])),f=b(c.length-1);return[e,d,f].filter(function(a){return null!=a})});r.enter().append("circle"),r.exit().remove(),r.attr("cx",function(a){return h(j(a,a.pointIndex))}).attr("cy",function(a){return i(k(a,a.pointIndex))}).attr("r",2).attr("class",function(a){return j(a,a.pointIndex)==h.domain()[1]?"nv-point nv-currentValue":k(a,a.pointIndex)==i.domain()[0]?"nv-point nv-minValue":"nv-point nv-maxValue"})}),a}var b,c,d={top:2,right:0,bottom:2,left:0},e=400,f=32,g=!0,h=d3.scale.linear(),i=d3.scale.linear(),j=function(a){return a.x},k=function(a){return a.y},l=nv.utils.getColor(["#000"]);return a.margin=function(b){return arguments.length?(d.top="undefined"!=typeof b.top?b.top:d.top,d.right="undefined"!=typeof b.right?b.right:d.right,d.bottom="undefined"!=typeof b.bottom?b.bottom:d.bottom,d.left="undefined"!=typeof b.left?b.left:d.left,a):d},a.width=function(b){return arguments.length?(e=b,a):e},a.height=function(b){return arguments.length?(f=b,a):f},a.x=function(b){return arguments.length?(j=d3.functor(b),a):j},a.y=function(b){return arguments.length?(k=d3.functor(b),a):k},a.xScale=function(b){return arguments.length?(h=b,a):h},a.yScale=function(b){return arguments.length?(i=b,a):i},a.xDomain=function(c){return arguments.length?(b=c,a):b},a.yDomain=function(b){return arguments.length?(c=b,a):c},a.animate=function(b){return arguments.length?(g=b,a):g},a.color=function(b){return arguments.length?(l=nv.utils.getColor(b),a):l},a};