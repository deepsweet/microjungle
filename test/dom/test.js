function m(template) {
    var result;
    var dummy = document.createElement('dummy');

    dummy.appendChild(microjungle(template));
    result = dummy.innerHTML;

    return result;
}

describe('void elements', function() {

    it('void element', function() {
        m([
            ['br']
        ]).must.be.equal(
            '<br>'
        );
    });

    it('void element with content', function() {
        m([
            ['br', ['div']]
        ]).must.be.equal(
            '<br></br>'
        );
    });

});
