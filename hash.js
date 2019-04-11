const hash = require('js-sha256');
const SALT  = "pepper"
const correctHash = hash(SALT + 'b466626183d2337068889e6e77b595e73d9b8313649dfd96b605e0ed5ed5b1b0');
console.log(correctHash);
