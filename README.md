## microjungle [![Build Status](https://secure.travis-ci.org/deepsweet/microjungle.png)](https://travis-ci.org/deepsweet/microjungle)
[![Gitter](https://badges.gitter.im/Join Chat.svg)](https://gitter.im/deepsweet/microjungle?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

### client-side HTML via JSON templating

* tiny: <0.4 KiB minified and gzipped, so it can be used as an inline script
* true: returns a DOM DocumentFragment
* universal: AMD/RequireJS → `jQuery.microjungle` → `window.microjungle`

As it turned out later after writing the very first version in 2011, the idea is indentical to [JsonML](http://www.jsonml.org/), but I hope it still makes sense in another implementation like microjungle :)

Also, there is a microjungle enhancement - [zenjungle](https://github.com/radmen/zenjungle) "Power of microjungle, simpliefied".

### capabilities

```javascript
// just a div
microjungle([
    ['div']
]);

// textnode as content
microjungle([
    ['div', 'text content']
]);

// multiple contents
microjungle([
    ['div', 'text content', 123, 'and another one']
]);

// attributes
microjungle([
    ['div', {'class': 'wrapper'}]
]);

// nested paragraph
microjungle([
    ['div', {'class': 'wrapper'},
        ['p', {'style': 'color: red'}, 'inner paragraph']
    ]
]);

// more complex
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
```

### "templating"

```javascript
var data = {
    'title': {
        'url': '#',
        'text': 'some pretty title'
    },
    'paragraphs': [
        'some pretty paragraph',
        'another one'
    ],
    'list': [
        {'text': 'item1'},
        {'text': 'item2', 'active': true},
        {'text': 'item3', 'url': '#'}
    ],
    'footer': {
        'input': {
            'type': 'text',
            'value': 'some pretty input'
        },
        'button': {
            'type': 'button',
            'value': 'push'
        },
        'copyright': 'all rights reserved, copyright 2011.'
    }
},

template = [
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
];

document.body.appendChild(
    microjungle(template)
);
```

### compatibility

successfully tested:

- iOS 3.2.1+
- Android 1.6+
- Google Chrome / Chromium *
- FF 3.0+
- Safari 4+
- Opera 9.27+
- IE 6+

### license

[MIT](https://github.com/deepsweet/microjungle/blob/master/LICENSE)
