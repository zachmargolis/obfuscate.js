# obfuscate.js

## Obfuscate the crap out of strings in Javascript

### Background

Javascript has some crazy object coersion. Here's a few quick examples, and check out Gary Bernhardt's [WAT talk][wat-talk] for a few more.

```js
> []+{}
0
> {}+[]
'[object Object]'
```

### Usage

Anyways, we can take advantage of this for some crazy obfuscation:

```js
> var obfuscate = require('obfuscate');

> obfuscate('Hello world!')
'[]+([])+"H"+[]+([])+([]+(!![]))[!+[]+!+[]+!+[]]+((![])+[])[!+[]+!+[]]+((![])+[])[!+[]+!+[]]+([]+{})[[]-[]+!+[]]+([]+{})[!+[]+!+[]+!+[]+!+[]+!+[]+!+[]+!+[]]+[]+[]+"w"+[]+[]+[[]]+([]+{})[[]-[]+!+[]]+([]+(!![]))[[]-[]+!+[]]+((![])+[])[!+[]+!+[]]+([][[]]+[])[!+[]+!+[]]+[]+[]+"!"+[]+[]+[[]]+[[[]]]'

> []+([])+"H"+[]+([])+([]+(!![]))[!+[]+!+[]+!+[]]+((![])+[])[!+[]+!+[]]+((![])+[])[!+[]+!+[]]+([]+{})[[]-[]+!+[]]+([]+{})[!+[]+!+[]+!+[]+!+[]+!+[]+!+[]+!+[]]+[]+[]+"w"+[]+[]+[[]]+([]+{})[[]-[]+!+[]]+([]+(!![]))[[]-[]+!+[]]+((![])+[])[!+[]+!+[]]+([][[]]+[])[!+[]+!+[]]+[]+[]+"!"+[]+[]+[[]]+[[[]]]
'Hello world!'
```

Happy obfuscating!

### API

**obfuscate**(str)

Obfuscates a string by creating an expression that evaluates to that string.

```js
> obfuscate('t')
'([]+(!![]))[[]-[]]'
```

obfuscate.**chr**(chr)

Obfuscates a character by creating an expression that evaluates to that character (string).

```js
> obfuscate.chr('[')
'([]+{})[[]-[]]'
```

obfuscate.**num**(num, [highPrecedence])

Creates an expression that evaluates to that number. Has an optional parameter `highPrecedence` that makes the resulting expression take higher precedence, especially useful inside brackets

```js
> obfuscate.num(1)
'!+[]'
> obfuscate.num(1, true)
'[]-[]+!+[]'
```

obfuscate.**emptyString**([num])

Creates a expression that evaluates to the empty string. For variety, a `num` parameter can add additional terms.

```js
> obfuscate.emptyString(0)
'[]+([])'
```

[wat-talk]: https://www.destroyallsoftware.com/talks/wat