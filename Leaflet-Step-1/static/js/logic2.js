function createMap(markers) {

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
        layers: [lightMap, markers]
    });
        
    var baseMaps = {'Light Map': lightMap};
    var overlayMaps = {'Earthquakes': markers};

    // Add our marker cluster layer to the map
    L.control.layers(baseMaps, overlayMaps).addTo(myMap);


};
  
// Grab the url
var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Grab the data with d3
d3.json(url, function(geoData) {
    createMarkers(geoData.features);
});

function createMarkers(earthquakeData) {

    // Create a new marker cluster group
    var markers = L.markerClusterGroup();

    var geoJsonLayer = L.geoJson(earthquakeData, {
        onEachFeature: function (feature, layer) {
            layer.bindPopup('<h3>' + feature.properties.place + '</h3><h3>Magnitude:  ' + feature.properties.mag + '<hr><p>' + new Date(feature.properties.time) + '</p>'); 
            return L.icon(feature, {icon: iconByMagnitude});
        }
    })
        var iconByMagnitude = L.icon.extend(feature, {
            if (feature.properties.mag >= 2) {
                {
                    iconSize: [100,100]
                };
            }
            else if (feature.properties.mag >= 1) {
                return L.icon({
                    iconSize: [15,15]
                });
            }
            else 
                return L.icon({
                    iconSize: [10,10]
                });
            });
        
   
    markers.addLayer(geoJsonLayer);

    


    // Send earthquake layer to the map

    createMap(markers);
};   
//});
