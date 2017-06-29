/*
 Figure out which class to give map ::: tag to.
 If closing tag, make it a closing div
*/
module.exports = function (header, bool) {
  let div;
  if (bool) {
    div = ['<div class='];
    const tag = header.split('-')[1];
    if (tag === 'typed') {
      div.push('"typed">');
    } else {
      div.push('"map">');
    }
  } else {
    div = ['</div>'];
  }
  return div.join('');
};
