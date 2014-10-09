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

// http://www.w3.org/TR/html-markup/syntax.html#void-element
var voidElements = [
    'area', 'base', 'br', 'col',
    'command', 'embed', 'hr', 'img',
    'input', 'keygen', 'link', 'meta',
    'param', 'source', 'track', 'wbr'
];

// they just doing their job.
var monkeys = function(template) {
    var html = '';
    var item;

    if (Array.isArray(template)) {
        for (var i = 0; i < template.length; i++) {
            item = template[i];

            // string or finite number
            if (
                typeof item === 'string' ||
                (typeof item === 'number' && isFinite(item))
            ) {
                html += item;
                continue;
            }

            // any kind of falsy
            if (!item) {
                continue;
            }

            // elem
            if (typeof item[0] === 'string') {
                var elem = item.shift();

                // open tag
                html += '<' + elem;

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
                            html += ' ' + attrName + '="' + attrValue + '"';
                        }
                    }
                }

                // <br/>
                if (~voidElements.indexOf(elem.toLowerCase())) {
                    // no need to search for content
                    html += '/>';
                // <div></div>
                } else {
                    html += '>';
                    // content
                    html += monkeys(item);
                    // closing
                    html += '</' + elem + '>';
                }

                continue;
            }

            monkeys(item);
        }
    }

    return html;
};

    return monkeys;
}));
