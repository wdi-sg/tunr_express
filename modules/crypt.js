const util = require('util');
const srs = require('secure-random-string');
const promiseRandString = util.promisify(srs);

const makeRandString = async function (num) {
  let opts = {
    alphanumeric: true,
    length: num
  };

  return promiseRandString(opts);
};

module.exports = makeRandString;
