var map = require('./map');
var typed = require('./typed');
var _ = require('lodash');
var divver = require('./divver')

module.exports = function (pseudoLex) {
  // need to return the html equiv of the obj in list, but do
  return mdLex.map((lexList) => {
    let htmlChunk;
    if (lexList[0].split(":::-")[0] === 'typed') {
      htmlChunk = typed(lexList)
    } else {
      htmlChunk = map(lexList)
    }
    return htmlChunk;
    })
  });
};
