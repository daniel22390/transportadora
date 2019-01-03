$.Gerencia = {};

$.Gerencia = {
  events: function(){
    $('body').on('click', '.add_usuario', function(ev){
      $('#modalInsereUsuario').modal();
      $('#modalInsereUsuario').modal('show');
    });

    $('body').on('click', '.tabela-grupos tbody tr', function(ev){
      $('#grupo_altera_grupo').val($(this).find('td:nth-child(2)').text());
      $('#grupo_altera_descricao').val($(this).find('td:nth-child(3)').text());
      $('#modalAlteraGrupo').modal();
      $('#modalAlteraGrupo').modal('show');
    });

    $('body').on('click', '.add_grupo', function(ev){
      $('#modalInsereGrupo').modal();
      $('#modalInsereGrupo').modal('show');
    });

    $('body').on('click', '.table-usuarios tbody tr', function(ev){
      $('#nome_altera_usuario').val($(this).find('td:nth-child(2)').text());
      $('#cargo_altera_usuario').val($(this).find('td:nth-child(3)').text());
      $('#nascimento_altera_usuario').val($(this).find('td:nth-child(4)').text());
      $('#email_altera_usuario').val($(this).find('td:nth-child(6)').text());
      $('#telefone_altera_usuario').val($(this).find('td:nth-child(7)').text());
      $('#grupo_altera_usuario').val($(this).find('td:nth-child(8)').text());
      $('#usuario_altera_usuario').val($(this).find('td:nth-child(5)').text());

      // The location of Uluru
      var uluru = {lat: -18.865381, lng: -41.962696};
      // The map, centered at Uluru
      var map2 = new google.maps.Map(
          document.getElementById('mapa_altera_usuario'), {zoom: 15, center: uluru});
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
      $('#modalAlteraUsuario').modal();
      $('#modalAlteraUsuario').modal('show');
    });
  }
}