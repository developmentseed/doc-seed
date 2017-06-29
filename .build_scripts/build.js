var fs = require('fs');
var md = require('markdown-it')();
var container = require('markdown-it-container');
var yamlFront = require('yaml-front-matter');
var pageBuilder = require("./build-components/index.js")


// boilerplate html that includes code to get css and leaflet javascript files
var top = fs.readFileSync('../app/doc_components/top.html').toString();
var bottom = fs.readFileSync('../app/doc_components/bottom.html').toString();
var map = require('./build-components/map');

// parse the md file and its yaml frontmatter
var mdText = fs.readFileSync('../app/report.md').toString();

var results = yamlFront.loadFront(mdText);

// define the map markdown container with rendering code
// md.use(container, 'map', {
//   // function used to replace the container during markdown parsing
//   render: function (tokens, idx) {
//     if (tokens[idx].nesting === 1) {
//       // opening tag
//       let name = tokens[idx].info.trim().match(/^map\s+(.*)$/)[1]; // returns name portion of the container
//       // i.e. ":::map south-africa" parses to "south-africa"
//       map.results = results;
//       map.name = name;
//       return map.map();
//     } else {
//       // no closing tag
//       return '';
//     }
//   }
// });
// // parse the markdown
// var body = md.render(results.__content); //results.__content is everying in the md file that isn't frontmatter
// var html = top + body + bottom;

// get list of 'speudolexicals', or list reporesentaiton of each markdown block
var pseudoLex = mdText.match(/:::.?([\s\S]*?):::/g).map((lex) => {
  return lex.split('\n');
});
// console.log(pseudoLex);
var pageHTML = pageBuilder(pseudoLex);
console.log(pageHTML);
// write the file
// fs.writeFile('../output/site.html', html, function(err) {
//   if(err) {
//       return console.log(err);
//   }
// });
