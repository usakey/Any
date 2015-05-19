d3.sankey=function(){function a(){n.forEach(function(a){a.sourceLinks=[],a.targetLinks=[]}),o.forEach(function(a){var b=a.source,c=a.target;"number"==typeof b&&(b=a.source=n[a.source]),"number"==typeof c&&(c=a.target=n[a.target]),b.sourceLinks.push(a),c.targetLinks.push(a)})}function b(){n.forEach(function(a){a.value=Math.max(d3.sum(a.sourceLinks,i),d3.sum(a.targetLinks,i))})}function c(){for(var a,b=n,c=0;b.length;)a=[],b.forEach(function(b){b.x=c,b.dx=k,b.sourceLinks.forEach(function(b){a.push(b.target)})}),b=a,++c;d(c),e((m[0]-k)/(c-1))}function d(a){n.forEach(function(b){b.sourceLinks.length||(b.x=a-1)})}function e(a){n.forEach(function(b){b.x*=a})}function f(a){function b(){var a=d3.min(g,function(a){return(m[1]-(a.length-1)*l)/d3.sum(a,i)});g.forEach(function(b){b.forEach(function(b,c){b.y=c,b.dy=b.value*a})}),o.forEach(function(b){b.dy=b.value*a})}function c(a){function b(a){return h(a.source)*a.value}g.forEach(function(c){c.forEach(function(c){if(c.targetLinks.length){var d=d3.sum(c.targetLinks,b)/d3.sum(c.targetLinks,i);c.y+=(d-h(c))*a}})})}function d(a){function b(a){return h(a.target)*a.value}g.slice().reverse().forEach(function(c){c.forEach(function(c){if(c.sourceLinks.length){var d=d3.sum(c.sourceLinks,b)/d3.sum(c.sourceLinks,i);c.y+=(d-h(c))*a}})})}function e(){g.forEach(function(a){var b,c,d,e=0,g=a.length;for(a.sort(f),d=0;g>d;++d)b=a[d],c=e-b.y,c>0&&(b.y+=c),e=b.y+b.dy+l;if(c=e-l-m[1],c>0)for(e=b.y-=c,d=g-2;d>=0;--d)b=a[d],c=b.y+b.dy+l-e,c>0&&(b.y-=c),e=b.y})}function f(a,b){return a.y-b.y}var g=d3.nest().key(function(a){return a.x}).sortKeys(d3.ascending).entries(n).map(function(a){return a.values});b(),e();for(var j=1;a>0;--a)d(j*=.99),e(),c(j),e()}function g(){function a(a,b){return a.source.y-b.source.y}function b(a,b){return a.target.y-b.target.y}n.forEach(function(c){c.sourceLinks.sort(b),c.targetLinks.sort(a)}),n.forEach(function(a){var b=0,c=0;a.sourceLinks.forEach(function(a){a.sy=b,b+=a.dy}),a.targetLinks.forEach(function(a){a.ty=c,c+=a.dy})})}function h(a){return a.y+a.dy/2}function i(a){return a.value}var j={},k=24,l=8,m=[1,1],n=[],o=[];return j.nodeWidth=function(a){return arguments.length?(k=+a,j):k},j.nodePadding=function(a){return arguments.length?(l=+a,j):l},j.nodes=function(a){return arguments.length?(n=a,j):n},j.links=function(a){return arguments.length?(o=a,j):o},j.size=function(a){return arguments.length?(m=a,j):m},j.layout=function(d){return a(),b(),c(),f(d),g(),j},j.relayout=function(){return g(),j},j.link=function(){function a(a){var c=a.source.x+a.source.dx,d=a.target.x,e=d3.interpolateNumber(c,d),f=e(b),g=e(1-b),h=a.source.y+a.sy+a.dy/2,i=a.target.y+a.ty+a.dy/2;return"M"+c+","+h+"C"+f+","+h+" "+g+","+i+" "+d+","+i}var b=.5;return a.curvature=function(c){return arguments.length?(b=+c,a):b},a},j};