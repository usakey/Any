d3.hive={},d3.hive.link=function(){function a(a,e){var f,g=b(c,this,a,e),h=b(d,this,a,e);h.a<g.a&&(f=h,h=g,g=f),h.a-g.a>Math.PI&&(g.a+=2*Math.PI);var i=g.a+(h.a-g.a)/3,j=h.a-(h.a-g.a)/3;return g.r0-g.r1||h.r0-h.r1?"M"+Math.cos(g.a)*g.r0+","+Math.sin(g.a)*g.r0+"L"+Math.cos(g.a)*g.r1+","+Math.sin(g.a)*g.r1+"C"+Math.cos(i)*g.r1+","+Math.sin(i)*g.r1+" "+Math.cos(j)*h.r1+","+Math.sin(j)*h.r1+" "+Math.cos(h.a)*h.r1+","+Math.sin(h.a)*h.r1+"L"+Math.cos(h.a)*h.r0+","+Math.sin(h.a)*h.r0+"C"+Math.cos(j)*h.r0+","+Math.sin(j)*h.r0+" "+Math.cos(i)*g.r0+","+Math.sin(i)*g.r0+" "+Math.cos(g.a)*g.r0+","+Math.sin(g.a)*g.r0:"M"+Math.cos(g.a)*g.r0+","+Math.sin(g.a)*g.r0+"C"+Math.cos(i)*g.r1+","+Math.sin(i)*g.r1+" "+Math.cos(j)*h.r1+","+Math.sin(j)*h.r1+" "+Math.cos(h.a)*h.r1+","+Math.sin(h.a)*h.r1}function b(a,b,c,d){var i=a.call(b,c,d),j=+("function"==typeof e?e.call(b,i,d):e)+h,k=+("function"==typeof f?f.call(b,i,d):f),l=f===g?k:+("function"==typeof g?g.call(b,i,d):g);return{r0:k,r1:l,a:j}}var c=function(a){return a.source},d=function(a){return a.target},e=function(a){return a.angle},f=function(a){return a.radius},g=f,h=-Math.PI/2;return a.source=function(b){return arguments.length?(c=b,a):c},a.target=function(b){return arguments.length?(d=b,a):d},a.angle=function(b){return arguments.length?(e=b,a):e},a.radius=function(b){return arguments.length?(f=g=b,a):f},a.startRadius=function(b){return arguments.length?(f=b,a):f},a.endRadius=function(b){return arguments.length?(g=b,a):g},a};