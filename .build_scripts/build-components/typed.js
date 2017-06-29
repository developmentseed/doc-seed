var divver = require('./divver.js');
var md = require('markdown-it')();
module.exports = function (lexList) {
  // map, making 0th the head div tag and the -1th the bottom tag
  // all else just regular html
  return lexList.map((lexItem, index) => {
    let htmlEl;
    if (index === 0 || index === (lexList.length - 1)) {
      if (index === 0) {
        htmlEl = divver(lexItem, true);
      } else {
        htmlEl = divver(lexItem, false);
      }
    } else {
      htmlEl = md.render(lexItem);
    }
    return htmlEl;
  });
};
