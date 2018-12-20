$.Produto = {};

$.Produto = {
  events: function(){
    
    $('body').on('click', '.pacotes-body .acoes i', function(ev){
      ev.stopPropagation();
    });

    $('body').on('click', '.table-altera tbody tr', function(){
      $('#id_altera').val($(this).find('th').text());
      $('#origem_altera').val($(this).find('td:nth-child(3)').text());
      $('#destino_altera').val($(this).find('td:nth-child(2)').text());
      $('#status_altera').val($(this).find('td:nth-child(4)').text());
      $('#local_altera').val($(this).find('td:nth-child(5)').text());
      $('#modalViewProduto').modal();
      $('#modalViewProduto').modal('show');
    });

    $('body').on('click', '.add_produto', function(){
      $('#modalInsereProduto').modal();
      $('#modalInsereProduto').modal('show');
      $('#modalInsereProduto').on('hidden.bs.modal', function (e) {
        $('.tabela-add tbody').html('<tr class="insere-add"><th scope="row">#</th><td><input type="text" class="form-control input-insere"></td><td class="text-center"><i class="fas fa-save insere-ctd fa-2x"></i></td></tr>');
      })
    });

    $('body').on('click', '.insere-ctd', function(){
      var linha = '<tr><th scope="row">'+ ($('.tabela-add tbody tr').length) +'</th><td>'+ $('.input-insere').val() +'</td><td class="text-center"><i class="fas fa-trash-alt fa-2x exclui-ctd"></i></td></tr>';
      $('.insere-add').before(linha);
      $('.input-insere').val('');
    });

    $('body').on('click', '.exclui-ctd', function(){
      $(this).parent().parent().remove();
      $.each($('.tabela-add tbody tr'), function(k, v){
        if(k !== ($('.tabela-add tbody tr').length - 1)){
          $(v).find('th').text(k + 1);
        }
      });
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