!function(a){function b(a,b,d){return new c(a,b,d)}function c(a,b,c){this.l=a,this.a=b,this.b=c}function d(a,b,c){return new e(a,b,c)}function e(a,b,c){this.l=a,this.c=b,this.h=c}function f(b,c,d){var e=(b+16)/116,f=e+c/500,g=e-d/200;return f=j(f)*p,e=j(e)*q,g=j(g)*r,a.rgb(l(3.2404542*f-1.5371385*e-.4985314*g),l(-.969266*f+1.8760108*e+.041556*g),l(.0556434*f-.2040259*e+1.0572252*g))}function g(a,c,d){a=m(a),c=m(c),d=m(d);var e=k((.4124564*a+.3575761*c+.1804375*d)/p),f=k((.2126729*a+.7151522*c+.072175*d)/q),g=k((.0193339*a+.119192*c+.9503041*d)/r);return b(116*f-16,500*(e-f),200*(f-g))}function h(a,b,c){var e=Math.sqrt(b*b+c*c),f=Math.atan2(c,b)/Math.PI*180;return d(a,e,f)}function i(a,c,d){return d=d*Math.PI/180,b(a,Math.cos(d)*c,Math.sin(d)*c)}function j(a){return a>.206893034?a*a*a:(a-4/29)/7.787037}function k(a){return a>.008856?Math.pow(a,1/3):7.787037*a+4/29}function l(a){return Math.round(255*(.00304>=a?12.92*a:1.055*Math.pow(a,1/2.4)-.055))}function m(a){return(a/=255)<=.04045?a/12.92:Math.pow((a+.055)/1.055,2.4)}var n=a.cie={};n.lab=function(d,f,h){return 1===arguments.length?d instanceof c?b(d.l,d.a,d.b):d instanceof e?i(d.l,d.c,d.h):g((d=a.rgb(d)).r,d.g,d.b):b(+d,+f,+h)},n.lch=function(b,f,i){return 1===arguments.length?b instanceof e?d(b.l,b.c,b.h):b instanceof c?h(b.l,b.a,b.b):h((b=g((b=a.rgb(b)).r,b.g,b.b)).l,b.a,b.b):d(+b,+f,+i)},n.interpolateLab=function(a,b){a=n.lab(a),b=n.lab(b);var c=a.l,d=a.a,e=a.b,g=b.l-c,h=b.a-d,i=b.b-e;return function(a){return f(c+g*a,d+h*a,e+i*a)+""}},n.interpolateLch=function(a,b){a=n.lch(a),b=n.lch(b);var c=a.l,d=a.c,e=a.h,f=b.l-c,g=b.c-d,h=b.h-e;return h>180?h-=360:-180>h&&(h+=360),function(a){return i(c+f*a,d+g*a,e+h*a)+""}},c.prototype.brighter=function(a){return b(Math.min(100,this.l+o*(arguments.length?a:1)),this.a,this.b)},c.prototype.darker=function(a){return b(Math.max(0,this.l-o*(arguments.length?a:1)),this.a,this.b)},c.prototype.rgb=function(){return f(this.l,this.a,this.b)},c.prototype.toString=function(){return this.rgb()+""},e.prototype.brighter=function(a){return d(Math.min(100,this.l+o*(arguments.length?a:1)),this.c,this.h)},e.prototype.darker=function(a){return d(Math.max(0,this.l-o*(arguments.length?a:1)),this.c,this.h)},e.prototype.rgb=function(){return i(this.l,this.c,this.h).rgb()},e.prototype.toString=function(){return this.rgb()+""};var o=18,p=.95047,q=1,r=1.08883}(d3);