;(function(factory, win) {

    /*global jQuery:true,define:true,require: true*/

    'use strict';

    // amd
    if(typeof define === 'function' && define.amd) {
        define(factory);
    // jQuery
    } else if('jQuery' in win) {
        factory(win.jQuery);
    // window
    } else {
        factory(win);
    }

}(function(global) {

    'use strict';

    // they just doing their job.
    function monkeys(template, target) {
        var i = 0,
            len = template.length,
            item;

        for(; i < len; i++) {
            item = template[i];

            // text node
            if(typeof item === 'string' || typeof item === 'number') {
                //target.appendChild(document.createTextNode(item));
                target.innerHTML += item;
                continue;
            }

            // falsy
            if(!item) {
                continue;
            }

            // elem
            if(typeof item[0] === 'string') {
                var elem = document.createElement(item.shift()),
                    attrs = {}.toString.call(item[0]) === '[object Object]' && item.shift(),
                    k;

                for(k in attrs) {
                    attrs[k] && elem.setAttribute(k, attrs[k]);
                }

                target.appendChild(monkeys(item, elem));

                continue;
            }

            // node
            if(item.nodeType) {
                target.appendChild(item);
                continue;
            }

            monkeys(item, target);
        }

        return target;
    };

    return global.microjungle = function(template) {
        return monkeys(template, document.createDocumentFragment());
    };

}, window));
