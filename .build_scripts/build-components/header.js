//inserts title code
module.exports = function(yfm) {
  console.log(yfm)
  title = yfm['map'];
  return '<script>document.getElementById("header-title").innerHTML=' + title + ';</script>';
};