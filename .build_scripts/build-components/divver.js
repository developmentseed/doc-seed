/*
 Figure out which class to give map ::: tag to.
 If closing tag, make it a closing div
*/
module.exports = function (header, bool) {
  let div;
  if (bool) {
    div = ['<div class="' + header + '">'];
  } else {
    div = ['</div>'];
  }
  return div.join('');
};
