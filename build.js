var fs = require('fs');
var md = require('markdown-it')();

const TOP    = '<!DOCTYPE html><html><head><link rel="stylesheet" href="styles.css"></head><body>\n'
const BOTTOM = '</body></html>\n'

function writeToFile(stringToWrite){
  fs.writeFile(__dirname + '/output/site.html', stringToWrite, function(err) {
    if(err) {
        return console.log(err);
    }
  }); 
};

fs.readFile( __dirname + '/report.md', function (err, data) {
  if (err) {
    throw err; 
  }
  html = md.render(data.toString());
  html = TOP + html + BOTTOM
  writeToFile(html)
});

