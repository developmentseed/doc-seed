# doc-seed
microsite template for reports

### how

Write markdown 'blocks' in the `app > report.md`.

Blocks are defined by an opening and closing `:::` tags and are of either class `typed` or `map`

Additional classes can be added to include custom styling from a css file.

##### typed

``` markdown
:::-typed someClass
# This is a header
*emphasize a point*
:::
```

##### map

``` markdown
:::-map
name-of-map
:::
```

For a map, be sure to add its specific parameters to the YAML front matter.

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
   height: 180 //height of the map when it displays on the website
---
```

With markdown and YFM generated, run

```
yarn build-pages
```

A markdown parser will look through the markdown and supply an html file in the `output` folder like:

``` html
<div class="typed someClass">
  <h1>Title</h1>
  <p>lorum ipsum</p>
  <h2>Subheader</h2>
  <p>lorum <a href="http://www.google.com">ipsum</a></p>
</div>
<div class="map">
  <!--leaflet map w/parameters-->
</div>     
```

#
