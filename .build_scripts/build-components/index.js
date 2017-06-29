var map = require('./map');
var typed = require('./typed');

module.exports = function (pseudoLex) {
  // need to return the html equiv of the obj in list, but do
  console.log(pseudoLex);
  return pseudoLex.map((lexList) => {
    let htmlChunk;
    if (lexList[0].split(':::-')[1] === 'typed') {
      htmlChunk = typed(lexList);
    } else {
      htmlChunk = map(lexList)
    }
    return htmlChunk;
  });
};
