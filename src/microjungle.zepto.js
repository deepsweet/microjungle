(function($) {
    $.fn.microjungle = function(template) {

        var d = document,
            toString = {}.toString;

        function isObject(t) {
            return toString.call(t) === '[object Object]';
        };

        // they just doing their job.
        function monkeys(what, who) {
            var l = what.length;

            for (var i = 0; i < l; i++) {
                var j = what[i];

                if (j) {
                    if (typeof j == 'string') {
                        who.html(who.html() + j);
                    } else {
                        if (typeof j[0] == 'string') {
                            var el = $('<' + j.shift() + '>'),
                                attrs = isObject(j[0]) && j.shift(),
                                k;

                            if (attrs) {
                                for(k in attrs) {
                                    attrs[k] && el.attr(k, attrs[k]);
                                }
                            }

                            who.append(monkeys(j, el));
                        } else {
                            monkeys(j, who);
                        }
                    }
                }
            }

            return who;
        };

        return this.each(function() {
            $(this).append(monkeys(template, $(d.createDocumentFragment())));
        });
    };
})(Zepto);
