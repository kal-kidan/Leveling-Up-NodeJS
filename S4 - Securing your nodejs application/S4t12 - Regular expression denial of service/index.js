const safe = require('safe-regex');
const regex = /^([a-z]+.)+[A-Za-z]+$/;
console.log(safe(regex));
let str = '';
for (let i = 0; i < 100; i++) {
  str += 'a';
}

str = str + '7';
console.log(str.match(regex));
console.log('something');
