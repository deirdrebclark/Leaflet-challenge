
  
// Grab the url
var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Grab the data with d3
d3.json(url, function(geoData) {
    createMarkers(geoData.features);
});

function createMarkers(earthquakeData) {

      var markers = L.marker(earthquakes);

       // add earthquake layer
       var earthquakes = L.geoJson([], {

        onEachFeature: function (feature, layer) {
          var markers = feature.properties;

          layer.bindPopup('<h3>' + feature.properties.place + '</h3><h3>Magnitude:  ' + feature.properties.mag + '<hr><p>' + new Date(feature.properties.time) + '</p>');
        },
        pointtolayer: function (feature, latlng) {
          var color,
              mag,
              radius,
              weight,
              opacity;

          mag = feature.properties.mag;
          if (mag >= 2) {
            color = '#fff';
            radius = 2 * Math.max(mag, 1);
            weight = 5
            opacity = 0.75
          } else if (mag >= 1) {
            color = '#00f';
            radius = Math.max(mag, 1);
            weight = 3
            opacity = 0.5
          } else{
            color = '#10f';
            radius = 2;
            weight = 31.5
            opacity = 0.25  
          }

          return L.circleMarker(latlng, {
            color: color,
            radius: radius,
            weight: weight,
            opacity: opacity
          });
        }
      })//.addTo(myMap);
   
    //markers.addLayer(earthquakes);
      // load data 
    // Send earthquake layer to the map
    createMap(earthquakes);
};   
//});
function createMap(earthquakes) {
    // Define tile layer to the map
    var lightMap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.light",
    accessToken: API_KEY
    })//.addTo(myMap);

    // Creating map object
    var myMap = L.map("map", {
        center: [38.03, -95.80],
        zoom: 4,
        layers: [lightMap, earthquakes]
    });
        
    var baseMaps = {'Light Map': lightMap};
    var overlayMaps = {'Earthquakes': earthquakes};

    // Add our marker cluster layer to the map
    L.control.layers(baseMaps, overlayMaps).addTo(myMap);
  };