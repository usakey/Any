// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

//Google Analytics: change UA-XXXXX-X to be your site's ID. -->
(function (i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r; i[r] = i[r] || function () {
        (i[r].q = i[r].q || []).push(arguments)
    }, i[r].l = 1 * new Date(); a = s.createElement(o),
    m = s.getElementsByTagName(o)[0];
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m);
})(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

ga('create', 'UA-XXXX-Y');
ga('send', 'pageview');

// load plugins
(function ()
{
    yepnope({
        load: ['css/bootstrap.css',
            'css/bootstrap-theme.css','css/main.css']
    });

    yepnope({
        // load jquery from a 3rd party CDN
        load: ['http://code.jquery.com/jquery.min.js?v=1.10.2'],
        callback: function(url,result,key){
            if(!window.jQuery)
            {
                yepnope({
                    load: 'js/vendor/jquery-1.10.2.min',
                    callback: function (url, result, key)
                    {console.log('jquery loaded!');}
                });
            }
            else
                console.log('jquery loaded!');
        }
    });

    yepnope({
        load: 'js/vendor/bootstrap.js'
    });

    yepnope({
        load: 'js/main.js'
    });
        
})();

// Place any jQuery/helper plugins in here.
