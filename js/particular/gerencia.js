$.Gerencia = {};

$.Gerencia = {
  events: function(){
    $('body').on('click', '.gerencia', function(ev){
      $.Model.carregaUsuarios({}, function(data){
        var _html = "";
        $.each(data, function(k, v){
          _html += '<tr usuario="'+ v.idusuario +'">';
          _html += ' <td>'+ v.idusuario +'</td>';
          _html += ' <td>'+ v.nome +'</td>';
          _html += ' <td>'+ v.Cargo.nome +'</td>';
          _html += ' <td>'+ $.Geral.retornaData(v.nascimento) +'</td>';
          _html += ' <td>'+ v.usuario +'</td>';
          _html += ' <td>'+ v.email +'</td>';
          _html += ' <td>'+ v.telefone +'</td>';
          _html += ' <td>'+ v.Grupo.nome +'</td>';
          _html += ' <td><td class="text-center"><i class="fas fa-trash-alt text-danger delete-usuario" usuario="'+ v.idusuario +'"></i></td></td>';
          _html += '</tr>';
        });
        $('.table-usuarios tbody').html(_html);
      });
    });

    $('body').on('click', '.add_usuario', function(ev){
      $('#modalInsereUsuario').modal();
      $('#modalInsereUsuario').modal('show');
    });

    $('body').on('submit', ".atualiza_usuario", function(ev){
      ev.preventDefault();

      $.Model.atualizaUsuario({action: $(this).attr('action'), data: $(this).serialize()}, function(data){
        $('.gerencia').trigger('click');
        $('#modalAlteraUsuario').modal('hide');
      });
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

      var _id = $(this).attr('usuario');
      $.Model.carregaCargos({}, function(data){
        let _html = "";
        $.each(data, function(k, v){
          _html += '<option value="'+ v.idcargo +'">'+ v.nome +'</option>';
        });
        $('#cargo_altera_usuario').html(_html);
        $.Model.carregaGrupos({}, function(data){
          let _html = "";
          $.each(data, function(k, v){
            _html += '<option value="'+ v.idgrupo +'">'+ v.nome +'</option>';
          });
          $('#grupo_altera_usuario').html(_html);

          $.Model.carregaUsuarioId({id: _id}, function(data){
            $('#nome_altera_usuario').val(data.nome);
            $('#cargo_altera_usuario').val(data.cargo_idcargo);
            $('#nascimento_altera_usuario').val( $.Geral.retornaData(data.nascimento));
            $('#email_altera_usuario').val(data.email);
            $('#telefone_altera_usuario').val(data.telefone);
            $('#grupo_altera_usuario').val(data.grupo_idgrupo);
            $('#usuario_altera_usuario').val(data.usuario);

            $(".atualiza_usuario").attr('action', 'usuarios/' + data.idusuario);
          });    
        });
      });

      

      $('#modalAlteraUsuario').modal();
      $('#modalAlteraUsuario').modal('show');
    });
  }
}