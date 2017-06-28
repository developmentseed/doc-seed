var fs = require('fs');
var md = require('markdown-it')();
var yamlFront = require('yaml-front-matter');



//boilerplate html that includes code to get css and leaflet javascript files
var top = fs.readFileSync(__dirname + '/top.html').toString();
var bottom = fs.readFileSync(__dirname + '/bottom.html').toString();

mdText = fs.readFileSync( __dirname + '/report.md').toString();
//parse the md file's yaml frontmatter
var results = yamlFront.loadFront(mdText);

//this defines map, a new token/associated parsing code inisde markdown-it that runs along with md.render()
md.use(require('markdown-it-container'), 'map', {
  //function used to replace the container during markdown parsing
  render: function (tokens, idx) {
    if (tokens[idx].nesting === 1) {
      // opening tag
      var name = tokens[idx].info.trim().match(/^map\s+(.*)$/)[1]; //returns name portion of the container
      //i.e. ":::map south-africa" parses to "south-africa"

      //get map attributes from yaml
      mapInfo     = results['maps'][name]
      attribution = mapInfo['attribution']
      imageURL    = mapInfo['image-url']
      maxZoom     = mapInfo['max-zoom']
      initialZoom = mapInfo['initial-zoom']
      latitude    = mapInfo['latitude']
      longitude   = mapInfo['longitude']
      accessToken = mapInfo['access-token']
      height      = mapInfo['height']

      //fill null values with defaults
      if(!attribution){
        attribution = "© Development Seed"
      }
      if(!latitude){
        latitude = 0
      }
      if(!longitude){
        longitude = 0
      }
      if(!maxZoom){
        maxZoom = 18
      }
      if(!initialZoom){
        initialZoom = 12
      }
      if(!imageURL){
        imageURL = 'http://a.aerial.openstreetmap.org.za/ngi-aerial/{z}/{x}/{y}.jpg'
      }
      if(!height){
        height = 180
      }

      //string containing all the code to render the map
      //css stype describing map size
      //div and script creating map as described at http://leafletjs.com/examples/quick-start/
      return '<style>\
      #' + name + ' { height: ' + height + 'px; }\
      </style>\
      <div id=' + name + '></div>' + '<script>\
      var mymap = L.map("' + name + '").setView([' + latitude + ', ' + longitude + '], ' + initialZoom + ');\
      L.tileLayer("' + imageURL + '", {\
      attribution: \'' + attribution + '\',\
      maxZoom: ' + maxZoom + ',\
      accessToken: ' + accessToken + '\
      }).addTo(mymap);\
      </script>'

    } else {
      // no closing tag
      return '';
    }
  }
});

//parse the markdown
body = md.render(results.__content); //results.__content is everying in the md file that isn't frontmatter
html = top + body + bottom;

//write the file
fs.writeFile(__dirname + '/output/site.html', html, function(err) {
  if(err) {
      return console.log(err);
  }
}); 
