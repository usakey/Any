nv.models.pieChart=function(){function a(h){return h.each(function(i){var j=d3.select(this),n=(e||parseInt(j.style("width"))||960)-d.left-d.right,o=(f||parseInt(j.style("height"))||400)-d.top-d.bottom;if(a.update=function(){a(h)},a.container=this,k.disabled=i[0].map(function(a){return!!a.disabled}),!i[0]||!i[0].length){var p=j.selectAll(".nv-noData").data([l]);return p.enter().append("text").attr("class","nvd3 nv-noData").attr("dy","-.7em").style("text-anchor","middle"),p.attr("x",d.left+n/2).attr("y",d.top+o/2).text(function(a){return a}),a}j.selectAll(".nv-noData").remove();var q=j.selectAll("g.nv-wrap.nv-pieChart").data([i]),r=q.enter().append("g").attr("class","nvd3 nv-wrap nv-pieChart").append("g"),s=q.select("g");r.append("g").attr("class","nv-pieWrap"),r.append("g").attr("class","nv-legendWrap"),g&&(c.width(n).key(b.x()),q.select(".nv-legendWrap").datum(b.values()(i[0])).call(c),d.top!=c.height()&&(d.top=c.height(),o=(f||parseInt(j.style("height"))||400)-d.top-d.bottom),q.select(".nv-legendWrap").attr("transform","translate(0,"+-d.top+")")),q.attr("transform","translate("+d.left+","+d.top+")"),b.width(n).height(o);var t=s.select(".nv-pieWrap").datum(i);d3.transition(t).call(b),c.dispatch.on("legendClick",function(c){c.disabled=!c.disabled,b.values()(i[0]).filter(function(a){return!a.disabled}).length||b.values()(i[0]).map(function(a){return a.disabled=!1,q.selectAll(".nv-series").classed("disabled",!1),a}),k.disabled=i[0].map(function(a){return!!a.disabled}),m.stateChange(k),h.transition().call(a)}),b.dispatch.on("elementMouseout.tooltip",function(a){m.tooltipHide(a)}),m.on("changeState",function(b){"undefined"!=typeof b.disabled&&(i[0].forEach(function(a,c){a.disabled=b.disabled[c]}),k.disabled=b.disabled),h.call(a)})}),a}var b=nv.models.pie(),c=nv.models.legend(),d={top:30,right:20,bottom:20,left:20},e=null,f=null,g=!0,h=nv.utils.defaultColor(),i=!0,j=function(a,b){return"<h3>"+a+"</h3><p>"+b+"</p>"},k={},l="No Data Available.",m=d3.dispatch("tooltipShow","tooltipHide","stateChange","changeState"),n=function(c,d){var e=b.description()(c.point)||b.x()(c.point),f=c.pos[0]+(d&&d.offsetLeft||0),g=c.pos[1]+(d&&d.offsetTop||0),h=b.valueFormat()(b.y()(c.point)),i=j(e,h,c,a);nv.tooltip.show([f,g],i,c.value<0?"n":"s",null,d)};return b.dispatch.on("elementMouseover.tooltip",function(a){a.pos=[a.pos[0]+d.left,a.pos[1]+d.top],m.tooltipShow(a)}),m.on("tooltipShow",function(a){i&&n(a)}),m.on("tooltipHide",function(){i&&nv.tooltip.cleanup()}),a.legend=c,a.dispatch=m,a.pie=b,d3.rebind(a,b,"valueFormat","values","x","y","description","id","showLabels","donutLabelsOutside","pieLabelsOutside","donut","donutRatio","labelThreshold"),a.margin=function(b){return arguments.length?(d.top="undefined"!=typeof b.top?b.top:d.top,d.right="undefined"!=typeof b.right?b.right:d.right,d.bottom="undefined"!=typeof b.bottom?b.bottom:d.bottom,d.left="undefined"!=typeof b.left?b.left:d.left,a):d},a.width=function(b){return arguments.length?(e=b,a):e},a.height=function(b){return arguments.length?(f=b,a):f},a.color=function(d){return arguments.length?(h=nv.utils.getColor(d),c.color(h),b.color(h),a):h},a.showLegend=function(b){return arguments.length?(g=b,a):g},a.tooltips=function(b){return arguments.length?(i=b,a):i},a.tooltipContent=function(b){return arguments.length?(j=b,a):j},a.state=function(b){return arguments.length?(k=b,a):k},a.noData=function(b){return arguments.length?(l=b,a):l},a};