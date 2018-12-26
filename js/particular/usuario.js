$.Usuario = {};

$.Usuario = {  
  ativaMapa: function(){
    // The location of Uluru
    var uluru = {lat: -18.865381, lng: -41.962696};
    // The map, centered at Uluru
    var map2 = new google.maps.Map(
        document.getElementById('mapa_checkin'), {zoom: 15, center: uluru});
    
    var marker = new google.maps.Marker({
      position: uluru,
      map: map2,
      title: "CTE GV"
    });
  }
}