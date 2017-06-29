var fs = require('fs')
var map = require('./map');
var md = require('markdown-it')();

module.exports = function (pseudoLex, yfm, top, bottom) {
  // need to return the html equiv of the obj in list, but do
  let pageHTML = pseudoLex.map((lexList) => {
    let htmlChunk;
    if (lexList[0].match('map')) {
      htmlChunk = map(lexList, yfm);
    } else {
      htmlChunk = lexList.map((lex) => {
        let html;
        if (lex !== '') {
          html = md.render(lex);
        }
        return html;
      });
      htmlChunk = htmlChunk.filter((html) => {
        if (html) {
          return html;
        }
      });
    }
    return htmlChunk.join('');
  });
  pageHTML = pageHTML.join('');
  return pageHTML;
};
