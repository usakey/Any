!function(){function a(a){return a[0]}function b(a){return a[1]}function c(a,b,c){return"offset"==c?function(c){return"translate(0,"+(c+(0>c)-a)*b+")"}:function(c){return(0>c?"scale(1,-1)":"")+"translate(0,"+(c-a)*b+")"}}d3.horizon=function(){function f(a){a.each(function(a){var b,f,p,q=d3.select(this),r=1/0,s=-1/0,t=-1/0,u=a.map(function(a,b){var c=j.call(this,a,b),d=k.call(this,a,b);return r>c&&(r=c),c>s&&(s=c),-d>t&&(t=-d),d>t&&(t=d),[c,d]}),v=d3.scale.linear().domain([r,s]).range([0,l]),w=d3.scale.linear().domain([0,t]).range([0,m*g]),x=c(g,m,h);this.__chart__?(b=this.__chart__.x,f=this.__chart__.y,t0=this.__chart__.t,p=this.__chart__.id):(b=v.copy(),f=w.copy(),t0=x,p=++e);var y=q.selectAll("defs").data([null]);y.enter().append("defs").append("clipPath").attr("id","d3_horizon_clip"+p).append("rect").attr("width",l).attr("height",m),y.select("rect").transition().duration(n).attr("width",l).attr("height",m),q.selectAll("g").data([null]).enter().append("g").attr("clip-path","url(#d3_horizon_clip"+p+")");var z=q.select("g").selectAll("path").data(d3.range(-1,-g-1,-1).concat(d3.range(1,g+1)),Number),A=d.interpolate(i).x(function(a){return b(a[0])}).y0(m*g).y1(function(a){return m*g-f(a[1])})(u),B=d.x(function(a){return v(a[0])}).y1(function(a){return m*g-w(a[1])})(u);z.enter().append("path").style("fill",o).attr("transform",t0).attr("d",A),z.transition().duration(n).style("fill",o).attr("transform",x).attr("d",B),z.exit().transition().duration(n).attr("transform",x).attr("d",B).remove(),this.__chart__={x:v,y:w,t:x,id:p}}),d3.timer.flush()}var g=1,h="offset",i="linear",j=a,k=b,l=960,m=40,n=0,o=d3.scale.linear().domain([-1,0,1]).range(["#d62728","#fff","#1f77b4"]);return f.duration=function(a){return arguments.length?(n=+a,f):n},f.bands=function(a){return arguments.length?(g=+a,o.domain([-g,0,g]),f):g},f.mode=function(a){return arguments.length?(h=a+"",f):h},f.colors=function(a){return arguments.length?(o.range(a),f):o.range()},f.interpolate=function(a){return arguments.length?(i=a+"",f):i},f.x=function(a){return arguments.length?(j=a,f):j},f.y=function(a){return arguments.length?(k=a,f):k},f.width=function(a){return arguments.length?(l=+a,f):l},f.height=function(a){return arguments.length?(m=+a,f):m},f};var d=d3.svg.area(),e=0}();