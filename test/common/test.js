var microjungle = this.window ? this.window.microjungle : require('../../dist/plain');

function m(template) {
    var result;

    if (this.window) {
        var dummy = document.createElement('dummy');
        dummy.appendChild(microjungle(template));
        result = dummy.innerHTML;
    } else {
        result = microjungle(template);
    }

    return result;
}

describe('templates', function() {

    describe('core', function() {

        it('valid template', function() {
            m([ ]).must.be.equal('');
        });

        it('invalid template', function() {
            m().must.be.equal('');
            m({}).must.be.equal('');
            m('').must.be.equal('');
            m(false).must.be.equal('');
            m(true).must.be.equal('');
            m(null).must.be.equal('');
            m(0).must.be.equal('');
            m(-0).must.be.equal('');
            m(1).must.be.equal('');
            m(-1).must.be.equal('');
            m(0/0).must.be.equal('');
            m(1/0).must.be.equal('');
            m(-1/0).must.be.equal('');
            m(function() {}).must.be.equal('');
        });

        it('valid content', function() {
            m([ 0 ]).must.be.equal('0');
            m([ 1 ]).must.be.equal('1');
            m([ -0 ]).must.be.equal('0');
            m([ -1 ]).must.be.equal('-1');
            m([ '' ]).must.be.equal('');
            m([ 'a' ]).must.be.equal('a');
        });

        it('invalid content', function() {
            m([ [] ]).must.be.equal('');
            m([ {} ]).must.be.equal('');
            m([ false ]).must.be.equal('');
            m([ true ]).must.be.equal('');
            m([ null ]).must.be.equal('');
            m([ 0/0 ]).must.be.equal('');
            m([ 1/0 ]).must.be.equal('');
            m([ -1/0 ]).must.be.equal('');
            m([ function() {} ]).must.be.equal('');
        });

        // it('valid attrs', function() {
        //     m([
        //         ['div', {
        //             'data-string': 'a',
        //             'data-num': 1,
        //             'data-neg-num': -1,
        //             'data-zero': 0,
        //             'data-neg-zero': -0
        //         }]
        //     ]).must.be.equal(
        //         '<div ' +
        //         'data-string="a" ' +
        //         'data-num="1" ' +
        //         'data-neg-num="-1" ' +
        //         'data-zero="0" ' +
        //         'data-neg-zero="0"' +
        //         '></div>'
        //     );
        // });

        // it('invalid attrs', function() {
        //     m([
        //         ['div', {
        //             'data-array': [],
        //             'data-object': {},
        //             'data-true': true,
        //             'data-false': false,
        //             'data-null': null,
        //             'data-undefined': undefined,
        //             'data-nan': 0/0,
        //             'data-infinite': 1/0,
        //             'data-neg-infinite': -1/0,
        //             'data-function': function() {}
        //         }]
        //     ]).must.be.equal(
        //         '<div></div>'
        //     );
        // });

    });

    describe('tree', function() {

        it('single element', function() {
            m([
                ['div']
            ]).must.be.equal(
                '<div></div>'
            );
        });

        it('flat multiple elements', function() {
            m([
                ['div'],
                ['p']
            ]).must.be.equal(
                '<div></div><p></p>'
            );
        });

        it('flat multiple elements and content', function() {
            m([
                ['div'],
                123,
                ['p']
            ]).must.be.equal(
                '<div></div>123<p></p>'
            );
        });

        it('element with attrs and content', function() {
            m([
                ['div', { 'a': 'b' },
                    ['p']
                ]
            ]).must.be.equal(
                '<div a="b"><p></p></div>'
            );
        });

        it('element with attrs and multiple content', function() {
            m([
                ['div', {'a': 1},
                    ['p'],
                    2,
                    ['div']
                ]
            ]).must.be.equal(
                '<div a="1"><p></p>2<div></div></div>'
            );
        });

        it('element with attrs and complex content', function() {
            m([
                ['div', {'a': 1},
                    ['p', {'b': 2},
                        ['span']
                    ],
                    3
                ]
            ]).must.be.equal(
                '<div a="1"><p b="2"><span></span></p>3</div>'
            );
        });

    });

});
