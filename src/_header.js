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

