# doc-seed
microsite template for reports

### how

Write markdown in the `app > report.md`.
To add a map, include a map block like

```
:::-map
name-of-map
:::
```

Then in the maps field of the YAML front matter, include the parameters for
the map.

``` markdown

---
maps:
 name-of-map:
   image-url: http://a.aerial.openstreetmap.org.za/ngi-aerial/{z}/{x}/{y}.jpg
   attribution: Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>
   max-zoom: 18
   initial-zoom: 12
   latitude: -33.9249 //initial latitude
   longitude: 18.4241 //initial longitude
   access-token: 123456 //will fill in {accessToken} in the image-url
   height: 30vh //height of the map when it displays on the website (can use pixels (px) instead of viewheight (vh))
---
```

With content written, build the html page by running

```
yarn build-pages
```

A markdown parser will look through the markdown and supply an html file in the `output` folder like:

``` html
<h1>Title</h1>
<p>lorum ipsum</p>
<h2>Subheader</h2>
<p>lorum <a href="http://www.google.com">ipsum</a></p>
</div>
<div class="map">
  <!--leaflet map w/parameters-->
</div>     
```
