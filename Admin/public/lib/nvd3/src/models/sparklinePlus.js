nv.models.sparklinePlus=function(){function a(l){return l.each(function(p){function q(){if(!i){var a=A.selectAll(".nv-hoverValue").data(h),c=a.enter().append("g").attr("class","nv-hoverValue").style("stroke-opacity",0).style("fill-opacity",0);a.exit().transition().duration(250).style("stroke-opacity",0).style("fill-opacity",0).remove(),a.attr("transform",function(a){return"translate("+b(d.x()(p[a],a))+",0)"}).transition().duration(250).style("stroke-opacity",1).style("fill-opacity",1),h.length&&(c.append("line").attr("x1",0).attr("y1",-e.top).attr("x2",0).attr("y2",u),c.append("text").attr("class","nv-xValue").attr("x",-6).attr("y",-e.top).attr("text-anchor","end").attr("dy",".9em"),A.select(".nv-hoverValue .nv-xValue").text(j(d.x()(p[h[0]],h[0]))),c.append("text").attr("class","nv-yValue").attr("x",6).attr("y",-e.top).attr("text-anchor","start").attr("dy",".9em"),A.select(".nv-hoverValue .nv-yValue").text(k(d.y()(p[h[0]],h[0]))))}}function r(){function a(a,b){for(var c=Math.abs(d.x()(a[0],0)-b),e=0,f=0;f<a.length;f++)Math.abs(d.x()(a[f],f)-b)<c&&(c=Math.abs(d.x()(a[f],f)-b),e=f);return e}if(!i){var c=d3.mouse(this)[0]-e.left;h=[a(p,Math.round(b.invert(c)))],q()}}var s=d3.select(this),t=(f||parseInt(s.style("width"))||960)-e.left-e.right,u=(g||parseInt(s.style("height"))||400)-e.top-e.bottom,v=d.y()(p[p.length-1],p.length-1);if(a.update=function(){a(l)},a.container=this,!p||!p.length){var w=s.selectAll(".nv-noData").data([o]);return w.enter().append("text").attr("class","nvd3 nv-noData").attr("dy","-.7em").style("text-anchor","middle"),w.attr("x",e.left+t/2).attr("y",e.top+u/2).text(function(a){return a}),a}s.selectAll(".nv-noData").remove(),b=d.xScale(),c=d.yScale();var x=s.selectAll("g.nv-wrap.nv-sparklineplus").data([p]),y=x.enter().append("g").attr("class","nvd3 nv-wrap nv-sparklineplus"),z=y.append("g"),A=x.select("g");z.append("g").attr("class","nv-sparklineWrap"),z.append("g").attr("class","nv-valueWrap"),z.append("g").attr("class","nv-hoverArea"),x.attr("transform","translate("+e.left+","+e.top+")");var B=A.select(".nv-sparklineWrap");d.width(t).height(u),B.call(d);var C=A.select(".nv-valueWrap"),D=C.selectAll(".nv-currentValue").data([v]);D.enter().append("text").attr("class","nv-currentValue").attr("dx",n?-8:8).attr("dy",".9em").style("text-anchor",n?"end":"start"),D.attr("x",t+(n?e.right:0)).attr("y",m?function(a){return c(a)}:0).style("fill",d.color()(p[p.length-1],p.length-1)).text(k(v)),z.select(".nv-hoverArea").append("rect").on("mousemove",r).on("click",function(){i=!i}).on("mouseout",function(){h=[],q()}),A.select(".nv-hoverArea rect").attr("transform",function(){return"translate("+-e.left+","+-e.top+")"}).attr("width",t+e.left+e.right).attr("height",u+e.top)}),a}var b,c,d=nv.models.sparkline(),e={top:15,right:100,bottom:10,left:50},f=null,g=null,h=[],i=!1,j=d3.format(",r"),k=d3.format(",.2f"),l=!0,m=!0,n=!1,o="No Data Available.";return a.sparkline=d,d3.rebind(a,d,"x","y","xScale","yScale","color"),a.margin=function(b){return arguments.length?(e.top="undefined"!=typeof b.top?b.top:e.top,e.right="undefined"!=typeof b.right?b.right:e.right,e.bottom="undefined"!=typeof b.bottom?b.bottom:e.bottom,e.left="undefined"!=typeof b.left?b.left:e.left,a):e},a.width=function(b){return arguments.length?(f=b,a):f},a.height=function(b){return arguments.length?(g=b,a):g},a.xTickFormat=function(b){return arguments.length?(j=b,a):j},a.yTickFormat=function(b){return arguments.length?(k=b,a):k},a.showValue=function(b){return arguments.length?(l=b,a):l},a.alignValue=function(b){return arguments.length?(m=b,a):m},a.rightAlignValue=function(b){return arguments.length?(n=b,a):n},a.noData=function(b){return arguments.length?(o=b,a):o},a};