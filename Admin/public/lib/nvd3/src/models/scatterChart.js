nv.models.scatterChart=function(){function a(x){return x.each(function(y){function z(){if(v)return P.select(".nv-point-paths").style("pointer-events","all"),!1;P.select(".nv-point-paths").style("pointer-events","none");var a=d3.mouse(this);m.distortion(u).focus(a[0]),n.distortion(u).focus(a[1]),P.select(".nv-scatterWrap").call(b),P.select(".nv-x.nv-axis").call(c),P.select(".nv-y.nv-axis").call(d),P.select(".nv-distributionX").datum(y.filter(function(a){return!a.disabled})).call(g),P.select(".nv-distributionY").datum(y.filter(function(a){return!a.disabled})).call(h)}var H=d3.select(this),I=this,J=(j||parseInt(H.style("width"))||960)-i.left-i.right,K=(k||parseInt(H.style("height"))||400)-i.top-i.bottom;if(a.update=function(){a(x)},a.container=this,!(y&&y.length&&y.filter(function(a){return a.values.length}).length)){var L=H.selectAll(".nv-noData").data([B]);return L.enter().append("text").attr("class","nvd3 nv-noData").attr("dy","-.7em").style("text-anchor","middle"),L.attr("x",i.left+J/2).attr("y",i.top+K/2).text(function(a){return a}),a}H.selectAll(".nv-noData").remove(),C=C||m,D=D||n;var M=H.selectAll("g.nv-wrap.nv-scatterChart").data([y]),N=M.enter().append("g").attr("class","nvd3 nv-wrap nv-scatterChart nv-chart-"+b.id()),O=N.append("g"),P=M.select("g");if(O.append("rect").attr("class","nvd3 nv-background"),O.append("g").attr("class","nv-x nv-axis"),O.append("g").attr("class","nv-y nv-axis"),O.append("g").attr("class","nv-scatterWrap"),O.append("g").attr("class","nv-distWrap"),O.append("g").attr("class","nv-legendWrap"),O.append("g").attr("class","nv-controlsWrap"),s&&(e.width(J/2),M.select(".nv-legendWrap").datum(y).call(e),i.top!=e.height()&&(i.top=e.height(),K=(k||parseInt(H.style("height"))||400)-i.top-i.bottom),M.select(".nv-legendWrap").attr("transform","translate("+J/2+","+-i.top+")")),t&&(f.width(180).color(["#444"]),P.select(".nv-controlsWrap").datum(G).attr("transform","translate(0,"+-i.top+")").call(f)),M.attr("transform","translate("+i.left+","+i.top+")"),b.width(J).height(K).color(y.map(function(a,b){return a.color||l(a,b)}).filter(function(a,b){return!y[b].disabled})),M.select(".nv-scatterWrap").datum(y.filter(function(a){return!a.disabled})).call(b),o){var Q=m.domain()[1]-m.domain()[0];m.domain([m.domain()[0]-o*Q,m.domain()[1]+o*Q])}if(p){var R=n.domain()[1]-n.domain()[0];n.domain([n.domain()[0]-p*R,n.domain()[1]+p*R])}c.scale(m).ticks(c.ticks()&&c.ticks().length?c.ticks():J/100).tickSize(-K,0),P.select(".nv-x.nv-axis").attr("transform","translate(0,"+n.range()[0]+")").call(c),d.scale(n).ticks(d.ticks()&&d.ticks().length?d.ticks():K/36).tickSize(-J,0),P.select(".nv-y.nv-axis").call(d),q&&(g.getData(b.x()).scale(m).width(J).color(y.map(function(a,b){return a.color||l(a,b)}).filter(function(a,b){return!y[b].disabled})),O.select(".nv-distWrap").append("g").attr("class","nv-distributionX"),P.select(".nv-distributionX").attr("transform","translate(0,"+n.range()[0]+")").datum(y.filter(function(a){return!a.disabled})).call(g)),r&&(h.getData(b.y()).scale(n).width(K).color(y.map(function(a,b){return a.color||l(a,b)}).filter(function(a,b){return!y[b].disabled})),O.select(".nv-distWrap").append("g").attr("class","nv-distributionY"),P.select(".nv-distributionY").attr("transform","translate(-"+h.size()+",0)").datum(y.filter(function(a){return!a.disabled})).call(h)),d3.fisheye&&(P.select(".nv-background").attr("width",J).attr("height",K),P.select(".nv-background").on("mousemove",z),P.select(".nv-background").on("click",function(){v=!v}),b.dispatch.on("elementClick.freezeFisheye",function(){v=!v})),f.dispatch.on("legendClick",function(e){e.disabled=!e.disabled,u=e.disabled?0:2.5,P.select(".nv-background").style("pointer-events",e.disabled?"none":"all"),P.select(".nv-point-paths").style("pointer-events",e.disabled?"all":"none"),e.disabled?(m.distortion(u).focus(0),n.distortion(u).focus(0),P.select(".nv-scatterWrap").call(b),P.select(".nv-x.nv-axis").call(c),P.select(".nv-y.nv-axis").call(d)):v=!1,a(x)}),e.dispatch.on("legendClick",function(b){b.disabled=!b.disabled,y.filter(function(a){return!a.disabled}).length||y.map(function(a){return a.disabled=!1,M.selectAll(".nv-series").classed("disabled",!1),a}),E.disabled=y.map(function(a){return!!a.disabled}),A.stateChange(E),a(x)}),b.dispatch.on("elementMouseover.tooltip",function(a){d3.select(".nv-chart-"+b.id()+" .nv-series-"+a.seriesIndex+" .nv-distx-"+a.pointIndex).attr("y1",a.pos[1]-K),d3.select(".nv-chart-"+b.id()+" .nv-series-"+a.seriesIndex+" .nv-disty-"+a.pointIndex).attr("x2",a.pos[0]+g.size()),a.pos=[a.pos[0]+i.left,a.pos[1]+i.top],A.tooltipShow(a)}),A.on("tooltipShow",function(a){w&&F(a,I.parentNode)}),A.on("changeState",function(b){"undefined"!=typeof b.disabled&&(y.forEach(function(a,c){a.disabled=b.disabled[c]}),E.disabled=b.disabled),x.call(a)}),C=m.copy(),D=n.copy()}),a}var b=nv.models.scatter(),c=nv.models.axis(),d=nv.models.axis(),e=nv.models.legend(),f=nv.models.legend(),g=nv.models.distribution(),h=nv.models.distribution(),i={top:30,right:20,bottom:50,left:75},j=null,k=null,l=nv.utils.defaultColor(),m=d3.fisheye?d3.fisheye.scale(d3.scale.linear).distortion(0):b.xScale(),n=d3.fisheye?d3.fisheye.scale(d3.scale.linear).distortion(0):b.yScale(),o=0,p=0,q=!1,r=!1,s=!0,t=!!d3.fisheye,u=0,v=!1,w=!0,x=function(a,b){return"<strong>"+b+"</strong>"},y=function(a,b,c){return"<strong>"+c+"</strong>"},z=null,A=d3.dispatch("tooltipShow","tooltipHide","stateChange","changeState"),B="No Data Available.";b.xScale(m).yScale(n),c.orient("bottom").tickPadding(10),d.orient("left").tickPadding(10),g.axis("x"),h.axis("y");var C,D,E={},F=function(e,f){var g=e.pos[0]+(f.offsetLeft||0),h=e.pos[1]+(f.offsetTop||0),j=e.pos[0]+(f.offsetLeft||0),k=n.range()[0]+i.top+(f.offsetTop||0),l=m.range()[0]+i.left+(f.offsetLeft||0),o=e.pos[1]+(f.offsetTop||0),p=c.tickFormat()(b.x()(e.point,e.pointIndex)),q=d.tickFormat()(b.y()(e.point,e.pointIndex));null!=x&&nv.tooltip.show([j,k],x(e.series.key,p,q,e,a),"n",1,f,"x-nvtooltip"),null!=y&&nv.tooltip.show([l,o],y(e.series.key,p,q,e,a),"e",1,f,"y-nvtooltip"),null!=z&&nv.tooltip.show([g,h],z(e.series.key,p,q,e,a),e.value<0?"n":"s",null,f)},G=[{key:"Magnify",disabled:!0}];return b.dispatch.on("elementMouseout.tooltip",function(a){A.tooltipHide(a),d3.select(".nv-chart-"+b.id()+" .nv-series-"+a.seriesIndex+" .nv-distx-"+a.pointIndex).attr("y1",0),d3.select(".nv-chart-"+b.id()+" .nv-series-"+a.seriesIndex+" .nv-disty-"+a.pointIndex).attr("x2",h.size())}),A.on("tooltipHide",function(){w&&nv.tooltip.cleanup()}),a.dispatch=A,a.scatter=b,a.legend=e,a.controls=f,a.xAxis=c,a.yAxis=d,a.distX=g,a.distY=h,d3.rebind(a,b,"id","interactive","pointActive","x","y","shape","size","xScale","yScale","zScale","xDomain","yDomain","sizeDomain","sizeRange","forceX","forceY","forceSize","clipVoronoi","clipRadius","useVoronoi"),a.margin=function(b){return arguments.length?(i.top="undefined"!=typeof b.top?b.top:i.top,i.right="undefined"!=typeof b.right?b.right:i.right,i.bottom="undefined"!=typeof b.bottom?b.bottom:i.bottom,i.left="undefined"!=typeof b.left?b.left:i.left,a):i},a.width=function(b){return arguments.length?(j=b,a):j},a.height=function(b){return arguments.length?(k=b,a):k},a.color=function(b){return arguments.length?(l=nv.utils.getColor(b),e.color(l),g.color(l),h.color(l),a):l},a.showDistX=function(b){return arguments.length?(q=b,a):q},a.showDistY=function(b){return arguments.length?(r=b,a):r},a.showControls=function(b){return arguments.length?(t=b,a):t},a.showLegend=function(b){return arguments.length?(s=b,a):s},a.fisheye=function(b){return arguments.length?(u=b,a):u},a.xPadding=function(b){return arguments.length?(o=b,a):o},a.yPadding=function(b){return arguments.length?(p=b,a):p},a.tooltips=function(b){return arguments.length?(w=b,a):w},a.tooltipContent=function(b){return arguments.length?(z=b,a):z},a.tooltipXContent=function(b){return arguments.length?(x=b,a):x},a.tooltipYContent=function(b){return arguments.length?(y=b,a):y},a.state=function(b){return arguments.length?(E=b,a):E},a.noData=function(b){return arguments.length?(B=b,a):B},a};