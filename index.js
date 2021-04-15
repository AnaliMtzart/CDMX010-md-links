/* eslint-disable linebreak-style */
const process = require('process');

const { readValidate, readStats } = require('./mdLinks.js');

const path = process.argv[2];
// console.log(hi);
const optionsMd = {};
if (process.argv[3] === '--validate' || process.argv[4] === '--validate') {
  optionsMd.validate = 'validate';
}
if (process.argv[3] === '--stats' || process.argv[4] === '--stats') {
  optionsMd.stats = 'stats';
}

// console.log(optionsMd.validate)
// console.log(optionsMd.stats);

if (optionsMd.validate === 'validate') {
  readValidate(path);
}
if (optionsMd.stats === 'stats') {
  readStats(path);
}
