nv.models.chartName=function(){function a(e){return e.each(function(a){{var e=(c-b.left-b.right,d-b.top-b.bottom,d3.select(this)),f=e.selectAll("g.nv-wrap.nv-chartName").data([a]),g=f.enter().append("g").attr("class","nvd3 nv-wrap nv-chartName"),h=g.append("g");f.select("g")}h.append("g").attr("class","nv-mainWrap"),f.attr("transform","translate("+b.left+","+b.top+")")}),a}var b={top:30,right:10,bottom:10,left:10},c=960,d=500,e=nv.utils.getColor(d3.scale.category20c().range()),f=d3.dispatch("stateChange","changeState");return a.dispatch=f,a.margin=function(c){return arguments.length?(b.top="undefined"!=typeof c.top?c.top:b.top,b.right="undefined"!=typeof c.right?c.right:b.right,b.bottom="undefined"!=typeof c.bottom?c.bottom:b.bottom,b.left="undefined"!=typeof c.left?c.left:b.left,a):b},a.width=function(b){return arguments.length?(c=b,a):c},a.height=function(b){return arguments.length?(d=b,a):d},a.color=function(b){return arguments.length?(e=nv.utils.getColor(b),a):e},a};