var $permissoes = {
  1: {icon: "fas fa-home", color: "text-success"},
  2: {icon: "fas fa-box-open", color: "text-success"},
  3: {icon: "fas fa-box-open", color: "text-secondary"},
  4: {icon: "fas fa-box-open", color: "text-danger"},
  5: {icon: "fas fa-box-open", color: "text-primary"},
  6: {icon: "fas fa-route", color: "text-success"},
  7: {icon: "fas fa-route", color: "text-secondary"},
  8: {icon: "fas fa-route", color: "text-danger"},
  9: {icon: "fas fa-route", color: "text-primary"},
  10: {icon: "fas fa-users", color: "text-success"},
  11: {icon: "fas fa-users", color: "text-secondary"},
  12: {icon: "fas fa-users", color: "text-danger"},
  13: {icon: "fas fa-users", color: "text-primary"},
  14: {icon: "fas fa-truck-moving", color: "text-success"},
  15: {icon: "fas fa-truck-moving", color: "text-secondary"},
  16: {icon: "fas fa-truck-moving", color: "text-danger"},
  17: {icon: "fas fa-truck-moving", color: "text-primary"},
  18: {icon: "fas fa-edit", color: "text-success"}
};

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
          _html += ' <td class="text-center"><i class="fas fa-trash-alt text-danger delete-usuario" usuario="'+ v.idusuario +'"></i></td>';
          _html += '</tr>';
        });
        $('.table-usuarios tbody').html(_html);
      });

      $.Model.carregaGrupos({}, function(data){
        var _html = "";
        $.each(data, function(k, v){
          _html += '<tr idgrupo="'+ v.idgrupo +'">'+
            '<th scope="row">'+ v.idgrupo +'</th>'+
            '<td>'+ v.nome +'</td>'+
            '<td>' + v.descricao + '</td>'+
            '<td class="permissoes">';
            $.each(v.Permissoes, function(k, v){
              _html += '<i class="'+ $permissoes[v.idpermissao].icon +' '+ $permissoes[v.idpermissao].color +'" data-toggle="tooltip" data-placement="top" title="'+ v.descricao +'"></i>';
            });
           _html += '</td><td class="text-center"><i class="fas fa-trash-alt text-danger"></i></td></tr>';
        });
        $('.tabela-grupos tbody').html(_html);
        $('[data-toggle="tooltip"]').tooltip()
      });
    });

    $('body').on('click', '.delete-usuario', function(ev){
      ev.stopPropagation();
      var _id = $(this).attr("usuario");

      $.Model.removeUsuario({action: "usuarios/" + _id, data: {}}, function(data){
        $('.gerencia').trigger('click');
      });
    });

    $('body').on('click', '.add_usuario', function(ev){
      $.Model.carregaCargos({}, function(data){
        let _html = "";
        $.each(data, function(k, v){
          _html += '<option value="'+ v.idcargo +'">'+ v.nome +'</option>';
        });
        $('#cargo_insere_usuario').html(_html);
      });

      $.Model.carregaGrupos({}, function(data){
        let _html = "";
        $.each(data, function(k, v){
          _html += '<option value="'+ v.idgrupo +'">'+ v.nome +'</option>';
        });
        $('#grupo_insere_usuario').html(_html);
      });

      $('#modalInsereUsuario').modal();
      $('#modalInsereUsuario').modal('show');
    });

    $('body').on('submit', ".form_addususario", function(ev){
      ev.preventDefault();
      $.Model.insereUsuario({action: "usuarios", data: $(this).serialize()}, function(data){
        $('.gerencia').trigger('click');
        $('#modalInsereUsuario').modal('hide');
      });
    });

    $('body').on('submit', ".atualiza_usuario", function(ev){
      ev.preventDefault();

      var serializado = $(this).serialize() + ($('#senha_altera_usuario').val() === "" ? "" : ("&password=" + $('#senha_altera_usuario').val()));
      $.Model.atualizaUsuario({action: $(this).attr('action'), data: serializado}, function(data){
        $('.gerencia').trigger('click');
        $('#modalAlteraUsuario').modal('hide');
      });
    });

    $('body').on('click', '.tabela-grupos tbody tr', function(ev){
      var _id = $(this).attr('idgrupo');
      $.Model.carregaGrupo({id: _id}, function(data){
        console.log(data);
        $('#grupo_altera_grupo').val(data.nome);
        $('#grupo_altera_descricao').val(data.descricao);
        var _html = "";
        $.each(data.Permissoes, function(k, v){
          _html += '<tr><td>'+ v.descricao +'</td><td class="text-center"><i class="fas fa-trash-alt fa-2x text-danger"></i></td></tr>';
        });
        $('.tabela-add-permissao tbody').prepend(_html);
      });

      $('#modalAlteraGrupo').modal();
      $('#modalAlteraGrupo').modal('show');
    });

    $('body').on('click', '.add_grupo', function(ev){
      $('#modalInsereGrupo').modal();
      $('#modalInsereGrupo').modal('show');

      $.Model.carregaPermissoes({}, function(data){
        var _html = "<option value=''>Selecione</option>";

        $.each(data, function(k, v){
          _html += '<option value="'+ v.idpermissao +'">'+ v.descricao +'</option>';
        });

        $('.input-insere').html(_html);
      });
    });

    $('body').on('click', '.insere-permissao', function(ev){
      var _id = $('#select-permissao').val();
      var _descricao = $('#select-permissao [value="'+ _id +'"]').text();
      $('.tabela-insere-permissao').prepend('<tr idpermissao="'+ _id +'"><td>'+ _descricao +'</td><td class="text-center"><i class="fas fa-trash-alt fa-2x text-danger delete-permissao"></i></td></tr>')
    });

    $('body').on('click', '.delete-permissao', function(ev){
      $(this).parent().parent().remove();
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