/*
 Figure out which class to give map ::: tag to.
 If closing tag, make it a closing div
*/
module.exports = function (header, bool) {
  let div;
  if (bool) {
    let tags = header.split('-')[1].split(' ');
    div = ['<div class="' + tags.join(' ') + '">'];
  } else {
    div = ['</div>'];
  }
  return div.join('');
};
