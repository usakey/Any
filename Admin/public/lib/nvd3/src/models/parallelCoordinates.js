nv.models.parallelCoordinates=function(){function a(h){return h.each(function(h){function l(a){return w(g.map(function(b){return[e(b),f[b](a[b])]}))}function m(){var a=g.filter(function(a){return!f[a].brush.empty()}),b=a.map(function(a){return f[a].brush.extent()});i=[],a.forEach(function(a,c){i[c]={dimension:a,extent:b[c]}}),j=[],v.style("display",function(c){var d=a.every(function(a,d){return b[d][0]<=c[a]&&c[a]<=b[d][1]});return d&&j.push(c),d?null:"none"}),k.brush({filters:i,active:j})}var n=c-b.left-b.right,o=d-b.top-b.bottom,p=d3.select(this);j=h,a.update=function(){},e.rangePoints([0,n],1).domain(g),g.forEach(function(a){return f[a]=d3.scale.linear().domain(d3.extent(h,function(b){return+b[a]})).range([o,0]),f[a].brush=d3.svg.brush().y(f[a]).on("brush",m),"name"!=a});var q=p.selectAll("g.nv-wrap.nv-parallelCoordinates").data([h]),r=q.enter().append("g").attr("class","nvd3 nv-wrap nv-parallelCoordinates"),s=r.append("g"),t=q.select("g");s.append("g").attr("class","nv-parallelCoordinatesWrap"),q.attr("transform","translate("+b.left+","+b.top+")");var u,v,w=d3.svg.line(),x=d3.svg.axis().orient("left");u=s.append("g").attr("class","background").selectAll("path").data(h).enter().append("path").attr("d",l),v=s.append("g").attr("class","foreground").selectAll("path").data(h).enter().append("path").attr("d",l);var y=t.selectAll(".dimension").data(g).enter().append("g").attr("class","dimension").attr("transform",function(a){return"translate("+e(a)+",0)"});y.append("g").attr("class","axis").each(function(a){d3.select(this).call(x.scale(f[a]))}).append("text").attr("text-anchor","middle").attr("y",-9).text(String),y.append("g").attr("class","brush").each(function(a){d3.select(this).call(f[a].brush)}).selectAll("rect").attr("x",-8).attr("width",16)}),a}var b={top:30,right:10,bottom:10,left:10},c=960,d=500,e=d3.scale.ordinal(),f={},g=[],h=nv.utils.getColor(d3.scale.category20c().range()),i=[],j=[],k=d3.dispatch("brush");return a.dispatch=k,a.margin=function(c){return arguments.length?(b.top="undefined"!=typeof c.top?c.top:b.top,b.right="undefined"!=typeof c.right?c.right:b.right,b.bottom="undefined"!=typeof c.bottom?c.bottom:b.bottom,b.left="undefined"!=typeof c.left?c.left:b.left,a):b},a.width=function(b){return arguments.length?(c=b,a):c},a.height=function(b){return arguments.length?(d=b,a):d},a.color=function(b){return arguments.length?(h=nv.utils.getColor(b),a):h},a.xScale=function(b){return arguments.length?(e=b,a):e},a.yScale=function(b){return arguments.length?(f=b,a):f},a.dimensions=function(b){return arguments.length?(g=b,a):g},a.filters=function(){return i},a.active=function(){return j},a};