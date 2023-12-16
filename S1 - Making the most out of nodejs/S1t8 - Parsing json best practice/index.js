/*
// blocking code
const fs = require('fs');
before = process.hrtime();
JSON.parse(fs.readFileSync('city-big.json'), 'utf8');
after = process.hrtime(before);
console.log('time it took is ' + after);
console.log('blockes of code');
*/

// improved to non-blocking with stream json
const { chain } = require('stream-chain');

const { parser } = require('stream-json');
const { streamArray } = require('stream-json/streamers/StreamArray');
const { pick } = require('stream-json/filters/Pick');

const fs = require('fs');

const pipeline = chain([
  fs.createReadStream('city-big.json'),
  parser(),
  pick({ filter: 'features' }),
  streamArray(),
  (data) => {
    if (data.value.properties.ODD_EVEN === 'E') {
      return data;
    }
  },
]);

pipeline.on('data', (data) => {
  console.log(data);
});
