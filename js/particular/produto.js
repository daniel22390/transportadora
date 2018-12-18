$.Produto = {};

$.Produto = {
  events: function(){
    

    $('body').on('click', 'tbody tr', function(){
      $('#id_altera').val($(this).find('th').text());
      $('#origem_altera').val($(this).find('td:nth-child(3)').text());
      $('#destino_altera').val($(this).find('td:nth-child(2)').text());
      $('#status_altera').val($(this).find('td:nth-child(4)').text());
      $('#local_altera').val($(this).find('td:nth-child(5)').text());
      $('#modalViewProduto').modal();
      $('#modalViewProduto').modal('show');
    });
  },

  ativaMapa: function(){
    // The location of Uluru
    var uluru = {lat: -18.865381, lng: -41.962696};
    // The map, centered at Uluru
    var map2 = new google.maps.Map(
        document.getElementById('mapa_altera'), {zoom: 15, center: uluru});
    // The marker, positioned at Uluru
    var image = {
      url: './img/archive.png',
      // This marker is 20 pixels wide by 32 pixels high.
      size: new google.maps.Size(24, 24),
      // The origin for this image is (0, 0).
      origin: new google.maps.Point(0, 0),
      // The anchor for this image is the base of the flagpole at (0, 32).
      anchor: new google.maps.Point(12, 12)
    };
    var marker = new google.maps.Marker({
      position: uluru,
      map: map2,
      icon: image,
      title: "CTE GV"
    });
  }
}