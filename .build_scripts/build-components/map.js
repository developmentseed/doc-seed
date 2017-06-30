var divver = require('./divver');

module.exports = function (lexList, yfm) {
  return lexList.map((lexItem, index) => {
    let htmlEl;
    if (index === 0 || index === (lexList.length - 1)) {
      if (index === 0) {
        htmlEl = divver(lexItem, true);
      } else {
        htmlEl = divver(lexItem, false);
      }
    } else {
      // map name
      const name = lexItem;
      // map parameters
      const mapInfo = yfm['maps'][name];
      let attribution = mapInfo['attribution'];
      let imageURL = mapInfo['image-url'];
      let maxZoom = mapInfo['max-zoom'];
      let initialZoom = mapInfo['initial-zoom'];
      let latitude = mapInfo['latitude'];
      let longitude = mapInfo['longitude'];
      const accessToken = mapInfo['access-token'];
      let height = mapInfo['height'];
      // fill null values with defaults
      if (!attribution) {
        attribution = '© Development Seed';
      }
      if (!latitude) {
        latitude = 0;
      }
      if (!longitude) {
        longitude = 0;
      }
      if (!maxZoom) {
        maxZoom = 18;
      }
      if (!initialZoom) {
        initialZoom = 12;
      }
      if (!imageURL) {
        imageURL = 'http://a.aerial.openstreetmap.org.za/ngi-aerial/{z}/{x}/{y}.jpg';
      }
      if (!height) {
        height = 180;
      }
      // return map html
      htmlEl = '<style>\
      #' + name + ' { height: ' + height + '; }\
      </style>\
      <div id="' + name + '"></div>' + '<script>\
      var mymap = L.map("' + name + '").setView([' + latitude + ', ' + longitude + '], ' + initialZoom + ');\
      L.tileLayer("' + imageURL + '", {\
      attribution: \'' + attribution + '\',\
      maxZoom: ' + maxZoom + ',\
      accessToken: ' + accessToken + '\
      }).addTo(mymap);\
      </script>';
    }
    return htmlEl;
  });
};
