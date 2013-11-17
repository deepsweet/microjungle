/*! https://github.com/deepsweet/microjungle */
(function(factory, win) {
    "use strict";
    if (typeof define === "function" && define.amd) {
        define(factory);
    } else if ("jQuery" in win) {
        factory(win.jQuery);
    } else {
        factory(win);
    }
})(function(global) {
    "use strict";
    function monkeys(template, target) {
        var i = 0, len = template.length, item;
        for (;i < len; i++) {
            item = template[i];
            if (typeof item === "string" || typeof item === "number") {
                target.innerHTML += item;
                continue;
            }
            if (!item) {
                continue;
            }
            if (typeof item[0] === "string") {
                var elem = document.createElement(item.shift()), attrs = {}.toString.call(item[0]) === "[object Object]" && item.shift(), k;
                for (k in attrs) {
                    attrs[k] && elem.setAttribute(k, attrs[k]);
                }
                target.appendChild(monkeys(item, elem));
                continue;
            }
            if (item.nodeType) {
                target.appendChild(item);
                continue;
            }
            monkeys(item, target);
        }
        return target;
    }
    return global.microjungle = function(template) {
        return monkeys(template, document.createDocumentFragment());
    };
}, window);