var map = require('./map');
var typed = require('./typed');

module.exports = function (pseudoLex, yfm) {
  // need to return the html equiv of the obj in list, but do
  return pseudoLex.map((lexList) => {
    let htmlChunk;
    if (lexList[0].split(':::-')[1].match(/typed/)) {
      htmlChunk = typed(lexList);
    } else {
      htmlChunk = map(lexList, yfm);
    }
    return htmlChunk.join('');
  });
};
