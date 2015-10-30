var obfuscate = require('obfuscate');

// Test number obfuscation
for (var i = 0; i < 100; i++) {
  testExpr(i, obfuscate.num(i));
}

// Test empty string obfuscation
for (var i = 0; i < 10; i++) {
  testExpr('', obfuscate.emptyString(i));
}

// Verify letters are generated correctly
Object.keys(obfuscate.__letters).forEach(function(letter) {
  var expr = obfuscate.__letters[letter];
  testExpr(letter, expr);
});

// Test arbitrary text obfuscation
[
  'abcdef',
  'function() { return "hi"; }',
  '1000000',
  'zzzzz',
].forEach(function(str) {
  testExpr(str, obfuscate(str));
});

function testExpr(expected, expr) {
  var result = eval(expr);
  if (result === expected) {
    console.log('PASS');
  } else {
    console.log('FAIL, expected result ' + expected + ', but got ' + result + 'for expr ' + expr);
  }
}
