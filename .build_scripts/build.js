var fs = require('fs');
var md = require('markdown-it')();
var yamlFront = require('yaml-front-matter');
// boilerplate html that includes code to get css and leaflet javascript files
var top = fs.readFileSync('../app/doc_components/top.html').toString();
var bottom = fs.readFileSync('../app/doc_components/bottom.html').toString();
var map = require('./build-components/map');

// parse the md file and its yaml frontmatter
var mdText = fs.readFileSync('../app/report.md').toString();
var results = yamlFront.loadFront(mdText);

// define the map markdown container with rendering code
md.use(require('markdown-it-container'), 'map', {
  // function used to replace the container during markdown parsing
  render: function (tokens, idx) {
    if (tokens[idx].nesting === 1) {
      // opening tag
      var name = tokens[idx].info.trim().match(/^map\s+(.*)$/)[1]; // returns name portion of the container
      // i.e. ":::map south-africa" parses to "south-africa"
      map.results = results;
      map.name = name;
      return map.map();
    } else {
      // no closing tag
      return '';
    }
  }
});

// parse the markdown
body = md.render(results.__content); //results.__content is everying in the md file that isn't frontmatter
html = top + body + bottom;

// write the file
fs.writeFile('../output/site.html', html, function(err) {
  if(err) {
      return console.log(err);
  }
});
