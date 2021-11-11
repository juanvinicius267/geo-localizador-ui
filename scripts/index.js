(function(){
    var map = new ol.Map({
        target: 'map',
        layers: [
          new ol.layer.Tile({
            source: new ol.source.OSM()
          })
        ],
        view: new ol.View({
          center: ol.proj.fromLonLat([-42.6589955083807, -23.627599809122046]),
          zoom: 2
        })
      });


      var location = [["53.6589955083807", "23.627599809122046"],[0,0]];
      var id = 1;
      var image = "http://127.0.0.1:5500/photos/anchor.png";
      var scale = 0.05;

      for (let index = 0; index < location.length; index++) {
        
        addMarkerOnMap(location[index], id, image, scale);
      }
      

      function addMarkerOnMap(_coordinate, _id, _image, _scale) {

        var iconScaniaGeometry = new ol.geom.Point(ol.proj.fromLonLat(_coordinate, 'EPSG:4326', 'EPSG:3857'));
        console.log(iconScaniaGeometry)
        var iconScaniaFeature = new ol.Feature({
            geometry: iconScaniaGeometry,
            data: _id,
            name: _id
        });
        var iconScaniakStyle = new ol.style.Style({
            image: new ol.style.Icon(({
                //anchor:[0.5, 1],
                scale: _scale,
                opacity: 0.9,
                src: _image
            }))
        });


        iconScaniaFeature.setStyle(iconScaniakStyle);

        var vectorSource = new ol.source.Vector({
            features: [iconScaniaFeature]
        });




        markerVectorLayer = new ol.layer.Vector({
            source: vectorSource,
        });

        map.addLayer(markerVectorLayer);
        
    }



}())