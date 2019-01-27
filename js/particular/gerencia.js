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

  //acoes relativas ao card de cargos
  Cargos: {

    //carrega a tabela de cargos
    carrega: function(){
      $.Model.carregaCargos({}, function(data){
        var _html = "";
        $.each(data, function(k, v){
          _html += '<tr idcargo="'+ v.idcargo +'">'+
            '<td>'+ v.idcargo +'</td>'+
            '<td>'+ v.nome +'</td>'+
            '<td>' + v.descricao + '</td>';
          _html += '<td class="text-center"><i cargo="'+ v.idcargo +'" class="fas fa-trash-alt text-danger delete-cargo"></i></td></tr>';
        });
        $('.tabela-cargos tbody').html(_html);
      });
    },

    //cria um novo cargo
    cria: function(){
      $.Model.insereCargo({action: "cargos", data: $('.form_addcargo').serialize()}, function(data){
        $('.gerencia').trigger('click');
        $('#modalInsereCargo').modal('hide');
      });
    },

    //altera um determinado cargo
    altera: function(){
      $.Model.alteraCargo({id: $("#id_altera_cargo").val(), nome: $('#nome_altera_cargo').val(), descricao: $("#descricao_altera_cargo").val()}, function(data){
        $('.gerencia').trigger('click');
        $('#modalAlteraCargo').modal('hide');
      });
    },

    //remove um cargo pelo id
    delete: function(id){
      $.Model.removeCargo({action: "cargos/" + id, data: {}}, function(data){
        $('.gerencia').trigger('click');
      });
    },

    //carrega form para inserir um novo cargo
    carregaFormInsercao: function(){
      $('#modalInsereCargo').modal();
      $('#modalInsereCargo').modal('show');
    },

    //carrega form para alteração de um cargo
    carregaFormAlteracao: function(elem){
      var _id = $(elem).attr('idcargo');
      $.Model.carregaCargo({id: _id}, function(data){
        $('#id_altera_cargo').val(data.idcargo);
        $('#nome_altera_cargo').val(data.nome);
        $('#descricao_altera_cargo').val(data.descricao);
      });

      $('#modalAlteraCargo').modal();
      $('#modalAlteraCargo').modal('show');
    }
  },

  //acoes relativas ao card de grupos
  Grupos: {

    //carrega a tabela de grupos
    carrega: function(){
      $.Model.carregaGrupos({}, function(data){
        var _html = "";
        $.each(data, function(k, v){
          _html += '<tr idgrupo="'+ v.idgrupo +'">'+
            '<td>'+ v.idgrupo +'</td>'+
            '<td>'+ v.nome +'</td>'+
            '<td>' + v.descricao + '</td>'+
            '<td class="permissoes">';
            $.each(v.Permissoes, function(k, v){
              _html += '<i class="'+ $permissoes[v.idpermissao].icon +' '+ $permissoes[v.idpermissao].color +'" data-toggle="tooltip" data-placement="top" title="'+ v.descricao +'"></i>';
            });
           _html += '</td><td class="text-center"><i grupo="'+ v.idgrupo +'" class="fas fa-trash-alt text-danger delete-grupo"></i></td></tr>';
        });
        $('.tabela-grupos tbody').html(_html);
        $('[data-toggle="tooltip"]').tooltip()
      });
    },

    //cria um novo grupo
    cria: function(){
      var _permissoes = [];
      $.each($('.tabela-insere-permissao tr[idpermissao]'), function(k, v){
        _permissoes.push($(v).attr('idpermissao'));
      });

      $.Model.salvaGrupo({nome: $('#grupo_insere_grupo').val(), descricao: $("#grupo_insere_descricao").val(), permissoes: _permissoes}, function(data){
        $('.gerencia').trigger('click');
        $('#modalInsereGrupo').modal('hide');
      });
    },

    //altera um determinado grupo
    altera: function(){
      var _permissoes = [];

      $.each($('.tabela-add-permissao tr[idpermissao]'), function(k, v){
        _permissoes.push($(v).attr('idpermissao'));
      });

      $.Model.alteraGrupo({id: $("#grupo_altera_id").val(), nome: $('#grupo_altera_grupo').val(), descricao: $("#grupo_altera_descricao").val(), permissoes: _permissoes}, function(data){
        $('.gerencia').trigger('click');
        $('#modalAlteraGrupo').modal('hide');
      });
    },

    //remove um grupo pelo id
    delete: function(id){
      $.Model.removeGrupo({action: "grupos/" + id, data: {}}, function(data){
        $('.gerencia').trigger('click');
      });
    },

    //carrega form para inserir um novo grupo
    carregaFormInsercao: function(){
      $('#modalInsereGrupo').modal();
      $('#modalInsereGrupo').modal('show');

      $.Model.carregaPermissoes({}, function(data){
        var _html = "<option value=''>Selecione</option>";

        $.each(data, function(k, v){
          _html += '<option value="'+ v.idpermissao +'">'+ v.descricao +'</option>';
        });

        $('.input-insere').html(_html);
      });
    },

    //carrega form para alteração de um grupo
    carregaFormAlteracao: function(elem){
      var _id = $(elem).attr('idgrupo');
      $.Model.carregaGrupo({id: _id}, function(data){
        $('#grupo_altera_id').val(data.idgrupo);
        $('#grupo_altera_grupo').val(data.nome);
        $('#grupo_altera_descricao').val(data.descricao);
        var _html = "";
        $.each(data.Permissoes, function(k, v){
          _html += '<tr idpermissao="'+ v.idpermissao +'"><td>'+ v.descricao +'</td><td class="text-center"><i class="fas fa-trash-alt fa-2x text-danger delete-permissao"></i></td></tr>';
        });
        $('.tabela-add-permissao tbody').prepend(_html);
      });

      $.Model.carregaPermissoes({}, function(data){
        var _html = "<option value=''>Selecione</option>";

        $.each(data, function(k, v){
          _html += '<option value="'+ v.idpermissao +'">'+ v.descricao +'</option>';
        });

        $('#altera-permissao-grupo').html(_html);
      });

      $('#modalAlteraGrupo').modal();
      $('#modalAlteraGrupo').modal('show');
    }
  },

  //acoes relativas ao card de usuarios
  Usuarios: {

    //carrega a tabela de usuarios
    carrega: function(){
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
    },

    //cria um novo usuario
    cria: function(){
      $.Model.insereUsuario({action: "usuarios", data: $('.form_addususario').serialize()}, function(data){
        $('.gerencia').trigger('click');
        $('#modalInsereUsuario').modal('hide');
      });
    },

    //altera um determinado usuario
    altera: function(elem){
      var serializado = $(elem).serialize() + ($('#senha_altera_usuario').val() === "" ? "" : ("&password=" + $('#senha_altera_usuario').val()));
      $.Model.atualizaUsuario({action: $(elem).attr('action'), data: serializado}, function(data){
        $('.gerencia').trigger('click');
        $('#modalAlteraUsuario').modal('hide');
      });
    },

    //remove um usuario pelo id
    delete: function(id){
      $.Model.removeUsuario({action: "usuarios/" + id, data: {}}, function(data){
        $('.gerencia').trigger('click');
      });
    },

    //carrega form para inserir um novo usuario
    carregaFormInsercao: function(){
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
    },

    //carrega form para alteracao de um usuario
    carregaFormAlteracao: function(elem){
      var uluru = {lat: -18.865381, lng: -41.962696};
      var map2 = new google.maps.Map(
          document.getElementById('mapa_altera_usuario'), {zoom: 15, center: uluru});
      var image = {
        url: './img/archive.png',
        size: new google.maps.Size(24, 24),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(12, 12)
      };
      var marker = new google.maps.Marker({
        position: uluru,
        map: map2,
        icon: image,
        title: "CTE GV"
      });

      var _id = $(elem).attr('usuario');
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
    }
  },

  events: function(){

    $('body').on('click', '.gerencia', function(ev){
      $.Gerencia.Usuarios.carrega();
      $.Gerencia.Grupos.carrega();
      $.Gerencia.Cargos.carrega();
    });

    //eventos relacionados ao usuario

    $('body').on('click', '.delete-usuario', function(ev){
      ev.stopPropagation();
      var _id = $(this).attr("usuario");
      $.Gerencia.Usuarios.delete(_id);  
    });

    $('body').on('submit', ".form_addususario", function(ev){
      ev.preventDefault();
      $.Gerencia.Usuarios.cria();
    });

    $('body').on('click', '.add_usuario', function(ev){
      $.Gerencia.Usuarios.carregaFormInsercao();
    });

    $('body').on('submit', ".atualiza_usuario", function(ev){
      ev.preventDefault();
      $.Gerencia.Usuarios.altera(this);
    });

    $('body').on('click', '.table-usuarios tbody tr', function(ev){
      $.Gerencia.Usuarios.carregaFormAlteracao(this);
    });

    //eventos relacionados ao grupo

    $('body').on('click', '.tabela-grupos tbody tr', function(ev){
      $.Gerencia.Grupos.carregaFormAlteracao(this);
    });

    $('body').on('click', '.add_grupo', function(ev){
      $.Gerencia.Grupos.carregaFormInsercao();
    });

    $('body').on('submit', '.insere-grupo', function(ev){
      ev.preventDefault();
      $.Gerencia.Grupos.cria();
    });

    $('body').on('submit', '.alteraGrupoForm', function(ev){
      ev.preventDefault();
      $.Gerencia.Grupos.altera();
    });

    $('body').on('click', '.delete-grupo', function(ev){
      ev.stopPropagation();
      var _id = $(this).attr("grupo");
      $.Gerencia.Grupos.delete(_id);
    });

    //eventos relacionados ao cargo

    $('body').on('click', '.add_cargo', function(ev){
      $.Gerencia.Cargos.carregaFormInsercao(); 
    });

    $('body').on('submit', ".form_addcargo", function(ev){
      ev.preventDefault();
      $.Gerencia.Cargos.cria();
    }); 

    $('body').on('click', '.tabela-cargos tbody tr', function(ev){
      $.Gerencia.Cargos.carregaFormAlteracao(this);    
    });

    $('body').on('submit', '.atualiza_cargo', function(ev){
      ev.preventDefault();
      $.Gerencia.Cargos.altera();
    });

    $('body').on('click', '.delete-cargo', function(ev){
      ev.stopPropagation();
      var _id = $(this).attr("cargo");
      $.Gerencia.Cargos.delete(_id);
    });

    //eventos relacionados a permissoes

    $('body').on('click', '.insere-permissao', function(ev){
      var _id = $('#select-permissao').val();
      var _descricao = $('#select-permissao [value="'+ _id +'"]').text();
      $('.tabela-insere-permissao').prepend('<tr idpermissao="'+ _id +'"><td>'+ _descricao +'</td><td class="text-center"><i class="fas fa-trash-alt fa-2x text-danger delete-permissao"></i></td></tr>')
    });

    $('body').on('click', '.insere-permissao-altera', function(ev){
      var _id = $('#altera-permissao-grupo').val();
      var _descricao = $('#altera-permissao-grupo [value="'+ _id +'"]').text();
      $('.tabela-add-permissao ').prepend('<tr idpermissao="'+ _id +'"><td>'+ _descricao +'</td><td class="text-center"><i class="fas fa-trash-alt fa-2x text-danger delete-permissao"></i></td></tr>')
    });

    $('body').on('click', '.delete-permissao', function(ev){
      $(this).parent().parent().remove();
    }); 
  }
}