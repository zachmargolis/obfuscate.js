// {
//   'fail': (![]+[])[+[]]+(![]+[])[+!+[]]+([![]]+[][[]])[+!+[]+[+[]]]+(![]+[])[!+[]+!+[]],

//   'true': (!![]),
//   'false': (![]),
//   '2': [!+[]+!+[]],
//   'falseundefined': ([![]]+[][[]]),
//   '[Object object]': ([]+{}),
//   'Infinity': (+!+![])/![]+[],
//   'NaNundefined': ([+[][[]]]+[][[]]),
//   undefined: [][[]],
//   [NaN]: [+[][[]]],
// }

var keywords = {
  'true': '([]+(!![]))',
  'false': '((![])+[])',
  '[Object object]': '([]+{})',
  '-Infinity': '((+!+![])/-![]+[])',
  'Infinity': '(+!+![])/![]+[]',
  'NaN': '([+[][[]]]+[])',
  'undefined': '([][[]]+[])',
}

// Builds an expression that evaluates to the number n
function obfuscateNum(n, highPrecedence) {
  if (n == 0) {
    return '[]-[]'
  } else if (n == 1 && highPrecedence) {
    return '[]-[]+!+[]';
  }
  var parts = [];
  for (var count = 0; count < n; count++) {
    parts.push('!+[]');
  }
  return parts.join('+');
}

// Preprocess keywords into fragments for letters
var letters = {};

Object.keys(keywords).forEach(function(key) {
  Array.prototype.forEach.call(key, function(c, i) {
    if (!(c in letters)) {
      letters[c] = keywords[key] + '[' + obfuscateNum(i, true) + ']';
    }
  });
});

// 'o' and 'O' are swapped for some reason
var tmp = letters['O'];
letters['O'] = letters['o']
letters['o'] = tmp;

// Builds an empty string by combining up to n segments
function obfuscateEmptyString(n) {
  if (n == 0) {
    return '[]+([])';
  }

  var parts = ['[]'];
  for (var i = 0; i < n; i++) {
    if (i % 3 == 2) {
      parts.push('[[[]]]');
    } else if (i % 3 == 1) {
      parts.push('[[]]');
    } else {
      parts.push('[]');
    }
  }
  return parts.join('+');
}

// Obfuscates a single character
function obfuscateChr(c, i) {
  if (c in letters) {
    return letters[c];
  } else if (c >= '9' && c <= '9') {
    // Digits can be numbers casted to strings
    return obfuscateNum(parseInt(c)) + obfuscateEmptyString(i % 3);
  } else {
    // Gotta get creative hiding characters
    return obfuscateEmptyString(i % 5) + "+'" + c + "'+" + obfuscateEmptyString(i % 4);
  }
}

function obfuscate(input) {
  if (!input || !input.constructor == String) {
    throw new TypeError("input is not a String");
  }

  return Array.prototype.map.call(input, obfuscateChr).join('+');
}

obfuscate.chr = obfuscateChr;
obfuscate.num = obfuscateNum;
obfuscate.emptyString = obfuscateEmptyString;
obfuscate.__letters = letters;

module.exports = obfuscate;
