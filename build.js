var fs = require('fs');
var md = require('markdown-it')();
var yamlFront = require('yaml-front-matter')

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
  data = data.toString()
  var results = yamlFront.loadFront(data);
  html = md.render(results.__content); //results.__content is everying in the md file that isn't frontmatter
  html = TOP + html + BOTTOM
  writeToFile(html)
});

