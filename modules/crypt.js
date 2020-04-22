const util = require('util');
const srs = require('secure-random-string');
const srsP = util.promisify(srs);
const hash = require('node_hash');

const rsP = async function (num) {
  let opts = {
    alphanumeric: true,
    length: num
  };

  return srsP(opts);
};

module.exports = rsP;
