var m = require('../../dist/plain');

describe('void elements', function() {

    it('void element', function() {
        m([
            ['br']
        ]).must.be.equal(
            '<br/>'
        );
    });

    it('void element with content', function() {
        m([
            ['br', ['div']]
        ]).must.be.equal(
            '<br/>'
        );
    });

});
