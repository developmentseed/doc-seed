//inserts title code
module.exports = function(yfm) {
  console.log(yfm)
  var title = yfm['title'];
  console.log(title)
  return '<script>document.getElementById("header-title").innerHTML="' + title + '";</script>';
};