$.Distribuidora = {};

$.Distribuidora = {
  events: function(){

  },

  ativaMapa: function(){
    // The location of Uluru
    var uluru = {lat: -18.864346, lng: -41.959518};
    // The map, centered at Uluru
    var map = new google.maps.Map(
        document.getElementById('mapa'), {zoom: 15, center: uluru});
    // The marker, positioned at Uluru
    var image = {
      url: './img/enterprise.png',
      // This marker is 20 pixels wide by 32 pixels high.
      size: new google.maps.Size(24, 24),
      // The origin for this image is (0, 0).
      origin: new google.maps.Point(0, 0),
      // The anchor for this image is the base of the flagpole at (0, 32).
      anchor: new google.maps.Point(12, 12)
    };
    var marker = new google.maps.Marker({
      position: uluru,
      map: map,
      icon: image,
      title: "CTE GV"
    });

    for(i = 0; i < 20; i++){
      var uluru = {lat: parseFloat((Math.random() * (-18.865499 - (-18.854639)) + (-18.854639)).toFixed(6)), lng: parseFloat((Math.random() * (-41.960164 - (-41.952561)) + (-41.952561)).toFixed(6))};
      // The marker, positioned at Uluru
      var image = {
        url: './img/archive.png',
        // This marker is 20 pixels wide by 32 pixels high.
        size: new google.maps.Size(12, 12),
        // The origin for this image is (0, 0).
        origin: new google.maps.Point(0, 0),
        // The anchor for this image is the base of the flagpole at (0, 32).
        anchor: new google.maps.Point(6, 6)
      };
      var marker = new google.maps.Marker({
        position: uluru,
        map: map,
        icon: image,
        title: "Produto " + i
      });
    }
  }
}