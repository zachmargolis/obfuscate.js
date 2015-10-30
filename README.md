# obfuscate.js

Obfuscate the crap out of strings in Javascript!

Basically, my homegrown, not-as-complete version of [jsfuck][jsfuck].

1. [Background](#background)
2. [Usage](#usage)
3. [API](#api)

### Background

Javascript has some crazy type coersion. Here's a few quick examples below, and check out Gary Bernhardt's [WAT talk][wat-talk] for a fun walkthrough. There are some nice [explanations on StackOverflow][explanations].

```js
> []+{}
0
> {}+[]
'[object Object]'
```

### Usage

Anyways, we can take advantage of these coercesions for some crazy obfuscation:

```js
> var obfuscate = require('obfuscate');

> obfuscate('Hello world!')
'[]+([])+"H"+[]+([])+([]+(!![]))[!+[]+!+[]+!+[]]+((![])+[])[!+[]+!+[]]+((![])+[])[!+[]+!+[]]+([]+{})[[]-[]+!+[]]+([]+{})[!+[]+!+[]+!+[]+!+[]+!+[]+!+[]+!+[]]+[]+[]+"w"+[]+[]+[[]]+([]+{})[[]-[]+!+[]]+([]+(!![]))[[]-[]+!+[]]+((![])+[])[!+[]+!+[]]+([][[]]+[])[!+[]+!+[]]+[]+[]+"!"+[]+[]+[[]]+[[[]]]'

> []+([])+"H"+[]+([])+([]+(!![]))[!+[]+!+[]+!+[]]+((![])+[])[!+[]+!+[]]+((![])+[])[!+[]+!+[]]+([]+{})[[]-[]+!+[]]+([]+{})[!+[]+!+[]+!+[]+!+[]+!+[]+!+[]+!+[]]+[]+[]+"w"+[]+[]+[[]]+([]+{})[[]-[]+!+[]]+([]+(!![]))[[]-[]+!+[]]+((![])+[])[!+[]+!+[]]+([][[]]+[])[!+[]+!+[]]+[]+[]+"!"+[]+[]+[[]]+[[[]]]
'Hello world!'
```

Happy obfuscating!

### API

- [obfuscate](#obfuscate)
- [obfuscate.chr](#chr)
- [obfuscate.num](#num)
- [obfuscate.emptyString](#empty-string)

<a href="#obfuscate" id="obfuscate">#</a> **obfuscate**(str)

Obfuscates a string by creating an expression that evaluates to that string.

```js
> obfuscate('t')
'([]+(!![]))[[]-[]]'
```

<a href="#chr" id="chr">#</a> obfuscate.**chr**(str)

Obfuscates a character by creating an expression that evaluates to that character (string).

```js
> obfuscate.chr('[')
'([]+{})[[]-[]]'
```

<a href="#num" id="num">#</a> obfuscate.**num**(num, [highPrecedence])

Creates an expression that evaluates to that number. Has an optional parameter `highPrecedence` that makes the resulting expression take higher precedence, especially useful inside brackets

```js
> obfuscate.num(1)
'!+[]'
> obfuscate.num(1, true)
'[]-[]+!+[]'
```

<a href="#empty-string" id="empty-string">#</a> obfuscate.**emptyString**([num])

Creates a expression that evaluates to the empty string. For variety, a `num` parameter can add additional terms.

```js
> obfuscate.emptyString(0)
'[]+([])'
```

[jsfuck]: [http://www.jsfuck.com/]
[wat-talk]: https://www.destroyallsoftware.com/talks/wat
[explanations]: http://stackoverflow.com/questions/4170978/explain-why-this-works