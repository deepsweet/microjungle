# microjungle

[![travis](http://img.shields.io/travis/deepsweet/microjungle.svg?style=flat-square)](https://travis-ci.org/deepsweet/microjungle)
[![coverage](http://img.shields.io/coveralls/deepsweet/microjungle/master.svg?style=flat-square)](https://coveralls.io/r/deepsweet/microjungle)
[![npm](http://img.shields.io/npm/v/microjungle.svg?style=flat-square)](https://www.npmjs.org/package/microjungle)
[![bower](http://img.shields.io/bower/v/microjungle.svg?style=flat-square)](http://bower.io/)
[![dev deps](http://img.shields.io/david/dev/deepsweet/microjungle.svg?style=flat-square)](https://david-dm.org/deepsweet/microjungle#info=devDependencies)
[![gratipay](http://img.shields.io/gratipay/deepsweet.svg?style=flat-square)](https://gratipay.com/deepsweet/)

HTML templating with JS. The Right Way.

## Install

```sh
$ npm i -S microjungle
```

```sh
$ bower i -S microjungle
```

## Usage

### Browser

```html
<script src="microjungle/dist/dom.min.js"></script>
<script>
    (function() {
        var documentFragment = microjungle([ ... ]);
    })();
</script>
```

or just use it as AMD/CommonJS module.

### Non-browser JS environment

Such as Nodejs, but it should work almost anywhere:

```javascript
var microjungle = require('microjungle');
var plainHTML = microjungle([ ... ]);
```

## Syntax

It's all about JS:

```javascript
// just an element
microjungle([
    ['div'],
]);
// <div></div>

// two elements
microjungle([
    ['div'],
    ['div']
]);
// <div></div><div></div>

// textnode as content
microjungle([
    ['div', 'text content']
]);
// <div>text content</div>

// multiple contents
microjungle([
    ['div', 'text content', 123, 'and another one']
]);
// <div>text content123and another one</div>

// attributes
microjungle([
    ['div', {'class': 'wrapper'}]
]);
// <div class="wrapper"></div>

// something more complex in browser environment
microjungle([
    ['div', {'class': 'wrapper'},
        ['p', 'inner paragraph',
            document.createElement('span'),
            document.createDocumentFragment().appendChild(
                document.createElement('i')
            ),
            false,
            undefined,
            0,
            []
        ]
    ]
]);
// <div class="wrapper"><p>inner paragraph<span></span><i></i>0</p></div>
```

## Templating

```javascript
// index.js

var data = require('./data');
var template = require('./template');
var html = template(data);
```

```javascript
// data.json

{
  "title": {
    "url": "#",
    "text": "some pretty title"
  },
  "paragraphs": [
    "some pretty paragraph",
    "another one"
  ],
  "list": [
    {"text": "item1"},
    {"text": "item2", "active": true},
    {"text": "item3", "url": "#"}
  ],
  "footer": {
    "input": {
        "type": "text",
        "value": "some pretty input"
    },
    "button": {
        "type": "button",
        "value": "push"
    },
    "copyright": "all rights reserved, copyright 2011."
  }
}
```

```javascript
// template.js

var microjungle = require('microjungle');

module.exports = function(data) {
    return microjungle([
        ['div', {'class': 'header'},
            ['h1',
                ['a', {'href': data.title.url}, data.title.text]
            ],
            'some pretty text line 1', ['br'],
            'some pretty text line 2'
        ],
        ['div', {'class': 'content'},
            data.paragraphs.map(function(text) {
                return ['p', text]
            }),
            ['ul', {'class': 'pretty-list'},
                data.list.map(function(item) {
                    return ['li', item.active && {'class': 'active'},
                        item.url ?
                            ['a', {'href': item.url}, item.text] :
                            item.text
                    ]
                })
            ]
        ],
        ['div', {'class': 'footer'},
            ['form', {'action': '/'},
                ['input', data.footer.input],
                ['input', data.footer.button]
            ],
            data.footer.copyright
        ]
    ]);
};
```

You can even use YAML for static templates and any kind of preprocessors like CoffeeScript.

## Test

```sh
$ npm run lint
$ npm run unit
$ npm run unit:dom
$ npm run unit:plain
```

## Build

```sh
$ npm run build
$ npm run build:dom
$ npm run build:plain
```

## Notes

As it turned out later after writing the very first version in 2011, the idea is indentical to [JsonML](http://www.jsonml.org/), but I hope it still makes sense in another implementation like microjungle :)

## License

[WTFPL](http://www.wtfpl.net/wp-content/uploads/2012/12/wtfpl-strip.jpg)
