var microjungle = window.microjungle;

describe('common:', function() {

    it('microjungle must exists in window', function() {
        microjungle.must.exist();
    });

    it('microjungle must be a function', function() {
        microjungle.must.be.instanceOf(Function);
    });

    it('microjungle([]) must return an empty DocumentFragment', function() {
        microjungle([]).childNodes.must.have.length(0);
    });

});

describe('templating:', function() {

    var testElem = document.createElement('div');

    function test(template, html) {
        testElem.innerHTML = '';
        testElem.appendChild(microjungle(template));
        return testElem.innerHTML === html;
    }

    it('Node', function() {
        test(
            [
                document.createElement('span')
            ],
            '<span></span>'
        ).must.be.true();
    });

    it('DocumentFragment', function() {
        test(
            [
                document.createDocumentFragment().appendChild(document.createElement('div'))
            ],
            '<div></div>'
        ).must.be.true();
    });

    it('empty elem', function() {
        test(
            [[]],
            ''
        ).must.be.true();
    });

    it('elem', function() {
        test(
            [['div']],
            '<div></div>'
        ).must.be.true();
    });

    it('elem + text content', function() {
        test(
            [
                ['div',
                    'content'
                ]
            ],
            '<div>content</div>'
        ).must.be.true();
    });

    it('elem + template content', function() {
        test(
            [
                ['div',
                    ['br']
                ]
            ],
            '<div><br></div>'
        ).must.be.true();
    });

    it('elem + Node content', function() {
        test(
            [
                ['div',
                    document.createElement('span')
                ]
            ],
            '<div><span></span></div>'
        ).must.be.true();
    });

    it('elem + empty content', function() {
        test(
            [
                ['div',
                    []
                ]
            ],
            '<div></div>'
        ).must.be.true();
    });

    it('elem + false content', function() {
        test(
            [
                ['div',
                    false
                ]
            ],
            '<div></div>'
        ).must.be.true();
    });

    it('elem + multiple content', function() {
        test(
            [
                ['div',
                    'text',
                    [],
                    1,
                    0,
                    ['span'],
                    false,
                    document.createElement('p')
                ]
            ],
            '<div>text10<span></span><p></p></div>'
        ).must.be.true();
    });

    it('elem + attrs', function() {
        test(
            [
                ['div', {class: 'class'}]
            ],
            '<div class="class"></div>'
        ).must.be.true();
    });

    it('elem + attrs + content', function() {
        test(
            [
                ['div', {class: 'class'},
                    ['br']
                ]
            ],
            '<div class="class"><br></div>'
        );
    });

});
