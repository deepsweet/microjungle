# microjungle.js - HTML via JSON

- tiny: only 0.3k minified and gzipped, so it can be easily used as inline script
- universal: you are able to make JSON in almost any programming language
- flexible: standalone and Zepto.js/MooTools client-side versions
- true: returns a DOM DocumentFragment
- fast: some benchmarks will coming soon

## static

```javascript
    var template = [
        ['div', {'class': 'header'},
            ['h1',
                ['a', {'href': '#'}, 'some pretty title']
            ],
            'some pretty text line 1', ['br'],
            'some pretty text line 2'
        ],
        ['div', {'class': 'content'},
            ['p', 'some pretty paragraph'],
            ['p', 'another one'],
            ['ul', {'class': 'pretty-list'},
                ['li', 'item1'],
                ['li', {'class': 'active'}, 'item2'],
                ['li',
                    ['a', {'href': '#'}, 'item3']
                ]
            ]
        ],
        ['div', {'class': 'footer'},
            ['form', {'action': '/'},
                ['input', {'type': 'text', 'value': 'some pretty input'}],
                ['input', {'type': 'submit', 'value': 'push'}],
            ],
            'all rights reserved, copyright 2011.'
        ]
    ];

    document.body.appendChild(
        microjungle(template);
    );
```

## templating

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
        microjungle(template);
    );
```

## compatibility
successfully tested in:

- iOS 3.2.1+
- Android 1.6+
- Google Chrome / Chromium *
- FF 3.0+
- Safari 4+
- Opera 9.27+
- IE 6+
