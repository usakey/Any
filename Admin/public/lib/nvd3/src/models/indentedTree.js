nv.models.indentedTree=function(){function a(b){return b.each(function(c){function e(b,c,d){return d3.event.stopPropagation(),d3.event.shiftKey&&!d?(d3.event.shiftKey=!1,b.values&&b.values.forEach(function(a){(a.values||a._values)&&e(a,0,!0)}),!0):q(b)?(b.values?(b._values=b.values,b.values=null):(b.values=b._values,b._values=null),void a.update()):!0}function f(a){return a._values&&a._values.length?m:a.values&&a.values.length?n:""}function p(a){return a._values&&a._values.length}function q(a){var b=a.values||a._values;return b&&b.length}var r=0,s=1,t=d3.layout.tree().children(function(a){return a.values}).size([d,j]);a.update=function(){b.transition().call(a)},a.container=this,c[0]||(c[0]={key:i});var u=t.nodes(c[0]),v=d3.select(this).selectAll("div").data([[u]]),w=v.enter().append("div").attr("class","nvd3 nv-wrap nv-indentedtree"),x=w.append("table"),y=v.select("table").attr("width","100%").attr("class",l);if(g){var z=x.append("thead"),A=z.append("tr");k.forEach(function(a){A.append("th").attr("width",a.width?a.width:"10%").style("text-align","numeric"==a.type?"right":"left").append("span").text(a.label)})}var B=y.selectAll("tbody").data(function(a){return a});B.enter().append("tbody"),s=d3.max(u,function(a){return a.depth}),t.size([d,s*j]);var C=B.selectAll("tr").data(function(a){return a.filter(function(a){return h&&!a.children?h(a):!0})},function(a){return a.id||a.id==++r});C.exit().remove(),C.select("img.nv-treeicon").attr("src",f).classed("folded",p);var D=C.enter().append("tr");k.forEach(function(a,b){var c=D.append("td").style("padding-left",function(a){return(b?0:a.depth*j+12+(f(a)?0:16))+"px"},"important").style("text-align","numeric"==a.type?"right":"left");0==b&&c.append("img").classed("nv-treeicon",!0).classed("nv-folded",p).attr("src",f).style("width","14px").style("height","14px").style("padding","0 1px").style("display",function(a){return f(a)?"inline-block":"none"}).on("click",e),c.append("span").attr("class",d3.functor(a.classes)).text(function(b){return a.format?a.format(b):b[a.key]||"-"}),a.showCount&&(c.append("span").attr("class","nv-childrenCount"),C.selectAll("span.nv-childrenCount").text(function(a){return a.values&&a.values.length||a._values&&a._values.length?"("+(a.values&&a.values.filter(function(a){return h?h(a):!0}).length||a._values&&a._values.filter(function(a){return h?h(a):!0}).length||0)+")":""})),a.click&&c.select("span").on("click",a.click)}),C.order().on("click",function(a){o.elementClick({row:this,data:a,pos:[a.x,a.y]})}).on("dblclick",function(a){o.elementDblclick({row:this,data:a,pos:[a.x,a.y]})}).on("mouseover",function(a){o.elementMouseover({row:this,data:a,pos:[a.x,a.y]})}).on("mouseout",function(a){o.elementMouseout({row:this,data:a,pos:[a.x,a.y]})})}),a}var b={top:0,right:0,bottom:0,left:0},c=960,d=500,e=nv.utils.defaultColor(),f=Math.floor(1e4*Math.random()),g=!0,h=!1,i="No Data Available.",j=20,k=[{key:"key",label:"Name",type:"text"}],l=null,m="images/grey-plus.png",n="images/grey-minus.png",o=d3.dispatch("elementClick","elementDblclick","elementMouseover","elementMouseout");return a.margin=function(c){return arguments.length?(b.top="undefined"!=typeof c.top?c.top:b.top,b.right="undefined"!=typeof c.right?c.right:b.right,b.bottom="undefined"!=typeof c.bottom?c.bottom:b.bottom,b.left="undefined"!=typeof c.left?c.left:b.left,a):b},a.width=function(b){return arguments.length?(c=b,a):c},a.height=function(b){return arguments.length?(d=b,a):d},a.color=function(b){return arguments.length?(e=nv.utils.getColor(b),scatter.color(e),a):e},a.id=function(b){return arguments.length?(f=b,a):f},a.header=function(b){return arguments.length?(g=b,a):g},a.noData=function(b){return arguments.length?(i=b,a):i},a.filterZero=function(b){return arguments.length?(h=b,a):h},a.columns=function(b){return arguments.length?(k=b,a):k},a.tableClass=function(b){return arguments.length?(l=b,a):l},a.iconOpen=function(b){return arguments.length?(m=b,a):m},a.iconClose=function(b){return arguments.length?(n=b,a):n},a};