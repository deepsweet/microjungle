# microjungle.js - HTML via JSON

- tiny: only 0.3k minified and gzipped, so it can be easily used as an inline script
- universal: you are able to make JSON in almost any programming language
- flexible: standalone and Zepto.js/MooTools client-side versions
- true: returns a DOM DocumentFragment

As it turned out, the idea is very similar to [JsonML](http://www.jsonml.org/) and [JUP](https://github.com/hij1nx/JUP), but I hope it still makes sense in another implementation like microjungle :)

Also, there is a microjungle enhancement - [zenjungle](https://github.com/radmen/zenjungle) "Power of microjungle, simpliefied".

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

successfully tested:

- iOS 3.2.1+
- Android 1.6+
- Google Chrome / Chromium *
- FF 3.0+
- Safari 4+
- Opera 9.27+
- IE 6+

## license

```
           DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
                   Version 2, December 2004

Copyright (C) 2011-2012 Kir Belevich <kir@soulshine.in>

Everyone is permitted to copy and distribute verbatim or modified
copies of this license document, and changing it is allowed as long
as the name is changed.

           DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
  TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION

 0. You just DO WHAT THE FUCK YOU WANT TO.
```