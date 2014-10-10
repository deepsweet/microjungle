// https://github.com/umdjs/umd/blob/master/returnExports.js
(function(root, factory) {
    'use strict';

    /* istanbul ignore next */
    // AMD
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    // CommonJS
    } else if (typeof exports === 'object') {
        module.exports = factory();
    // globals
    } else {
        root.microjungle = factory();
    }
}(this, function() {

'use strict';

// they just doing their job.
var monkeys = function(template, target) {
    var item;

    target = target || document.createDocumentFragment();

    if (Array.isArray(template)) {
        for (var i = 0; i < template.length; i++) {
            item = template[i];

            // string or finite number
            if (
                typeof item === 'string' ||
                (typeof item === 'number' && isFinite(item))
            ) {
                target.appendChild(document.createTextNode(item));
                continue;
            }

            // any kind of falsy
            if (!item) {
                continue;
            }

            // elem
            if (typeof item[0] === 'string') {
                var elem = document.createElement(item.shift());

                // attrs?
                if (Object.prototype.toString.call(item[0]) === '[object Object]') {
                    var attrs = item.shift();
                    var attrName;
                    var attrValue;

                    // attr="value"
                    for (attrName in attrs) {
                        attrValue = attrs[attrName];

                        if (
                            typeof attrValue === 'string' ||
                            (typeof attrValue === 'number' && isFinite(attrValue))
                        ) {
                            elem.setAttribute(attrName, attrValue);
                        }
                    }
                }

                target.appendChild(monkeys(item, elem));
                continue;
            }

            // node
            if (item.nodeType) {
                target.appendChild(item);
                continue;
            }

            monkeys(item, target);
        }
    }

    return target;
};

    return monkeys;
}));
