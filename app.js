const cities = L.layerGroup();

const mLittleton = L.marker([39.61, -105.02])
  .bindPopup("This is Littleton, CO.")
  .addTo(cities);
const mDenver = L.marker([39.74, -104.99])
  .bindPopup("This is Denver, CO.")
  .addTo(cities);
const mAurora = L.marker([39.73, -104.8])
  .bindPopup("This is Aurora, CO.")
  .addTo(cities);
const mGolden = L.marker([39.77, -105.23])
  .bindPopup("This is Golden, CO.")
  .addTo(cities);

const mbAttr =
  'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';
const mbUrl =
  "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw";

const streets = L.tileLayer(mbUrl, {
  id: "mapbox/streets-v11",
  tileSize: 512,
  zoomOffset: -1,
  attribution: mbAttr,
});

const osm = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
});

const map = L.map("map", {
  center: [39.73, -104.99],
  zoom: 10,
  layers: [osm, cities],
});

const baseLayers = {
  OpenStreetMap: osm,
  Streets: streets,
};

const overlays = {
  Cities: cities,
};

const layerControl = L.control.layers(baseLayers, overlays).addTo(map);

L.geoJson(land_parcels, {
  style: function (feature) {
    // return { color: "green" };
    return { color: "#999", weight: 2, fillColor: "#00ad79", fillOpacity: 0.6 };
  },
  onEachFeature: function (feature, layer) {
    // layer.bindLabel(feature.properties.Full_Name, { noHide: true });
    layer.bindTooltip(feature.properties.Short_Name, {
      permanent: true,
      direction: "center",
      className: "countryLabel",
    });
  },
}).addTo(map);
L.geoJson(request_data, {
  style: function (feature) {
    return { color: feature.properties.color };
  },
  // onEachFeature: function (feature, layer) {
  //   layer.bindPopup(feature.properties.description);
  // },
}).addTo(map);
L.geoJson(proposals, {
  style: function (feature) {
    return { color: feature.properties.color };
  },
  // onEachFeature: function (feature, layer) {
  //   layer.bindPopup(feature.properties.description);
  // },
}).addTo(map);

const crownHill = L.marker([39.75, -105.09]).bindPopup(
  "This is Crown Hill Park."
);
const rubyHill = L.marker([39.68, -105.0]).bindPopup("This is Ruby Hill Park.");

const parks = L.layerGroup([crownHill, rubyHill]);

const satellite = L.tileLayer(mbUrl, {
  id: "mapbox/satellite-v9",
  tileSize: 512,
  zoomOffset: -1,
  attribution: mbAttr,
});
layerControl.addBaseLayer(satellite, "Satellite");
layerControl.addOverlay(parks, "Parks");
