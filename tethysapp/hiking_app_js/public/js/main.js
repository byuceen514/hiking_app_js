/* require(["esri/map", "dojo/domReady!"], function(Map) {
  var map = new Map("map", {
    center: [-118, 34.5],
    zoom: 8,
    basemap: "topo"
  });
});
*/


    require(["dojo/dom",
              "dojo/_base/array",
              "esri/Color",

              "esri/map",
              "esri/graphic",
              "esri/graphicsUtils",
              "esri/tasks/Geoprocessor",
              "esri/tasks/FeatureSet",
              "esri/tasks/LinearUnit",
              "esri/symbols/SimpleMarkerSymbol",
              "esri/symbols/SimpleLineSymbol",
              "esri/symbols/SimpleFillSymbol"
              ],
        function(dom, array, Color, Map, Graphic, graphicsUtils, Geoprocessor, FeatureSet, LinearUnit, SimpleMarkerSymbol, SimpleLineSymbol, SimpleFillSymbol){

          var map, gp;

          /*Initialize map, GP*/

            map = new Map("mapDiv", {
              basemap: "streets",
              center: [-122.436, 37.73],
              zoom: 12
            });

            gp= new Geoprocessor("http://geoserver.byu.edu/arcgis/rest/services/HikingExplorerJS/BufferPointsJas/GPServer/Buffer%20Points") /* this is the url of your folder on the server*/
            //gp = new Geoprocessor("https://sampleserver6.arcgisonline.com/ArcGIS/rest/services/Elevation/ESRI_Elevation_World/GPServer/Viewshed");
            gp.setOutputSpatialReference({
              wkid: 102100
            });
            map.on("click", computeViewShed);

          function computeViewShed(evt) {
            map.graphics.clear();
            var pointSymbol = new SimpleMarkerSymbol();
            pointSymbol.setSize(14);
            pointSymbol.setOutline(new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([255, 0, 0]), 1));
            pointSymbol.setColor(new Color([0, 255, 0, 0.25]));

            var graphic = new Graphic(evt.mapPoint, pointSymbol);
            map.graphics.add(graphic);

            var features = [];
            features.push(graphic);
            var featureSet = new FeatureSet();
            featureSet.features = features;
            var vsDistance = new LinearUnit();
            vsDistance.distance = 5;
            vsDistance.units = "esriMiles";
            var params = {
              "Point": featureSet, /* this is from the geoserver.byu.edu>navigate to your folder and put names of "parameters" that you need*/

            };
            gp.execute(params, drawViewshed); /*add sarva's code here"stack profile tool to get results of the stack profile tool) */
          }

          function drawViewshed(results, messages) {
            var polySymbol = new SimpleFillSymbol();
            polySymbol.setOutline(new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([0, 0, 0, 0.5]), 1));
            polySymbol.setColor(new Color([255, 127, 0, 0.7]));
            var features = results[0].value.features;
            for (var f = 0, fl = features.length; f < fl; f++) {
              var feature = features[f];
              feature.setSymbol(polySymbol);
              map.graphics.add(feature);
            }
            map.setExtent(graphicsUtils.graphicsExtent(map.graphics.graphics), true);
          }
    });


