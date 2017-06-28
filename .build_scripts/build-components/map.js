module.exports = {
  map: function () {
    const name = this.name;
    const results = this.results
    // get map attributes from yaml
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
  }
};
