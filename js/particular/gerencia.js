var $permissoes = {
  1: {icon: "fas fa-home", color: "text-success", desc: "Visualização de dashboard."},
  2: {icon: "fas fa-box-open", color: "text-success", desc: "Visualização de pacotes."},
  3: {icon: "fas fa-box-open", color: "text-secondary", desc: "Atualização de pacotes."},
  4: {icon: "fas fa-box-open", color: "text-danger", desc: "Exclusão de pacotes."},
  5: {icon: "fas fa-box-open", color: "text-primary", desc: "Criação de pacotes."},
  6: {icon: "fas fa-route", color: "text-success", desc: "Visualização de CTDs."},
  7: {icon: "fas fa-route", color: "text-secondary", desc: "Atualização de CTDs."},
  8: {icon: "fas fa-route", color: "text-danger", desc: "Exclusão de CTDs."},
  9: {icon: "fas fa-route", color: "text-primary", desc: "Criação de CTDs."},
  10: {icon: "fas fa-users", color: "text-success", desc: "Visualização de Usuários."},
  11: {icon: "fas fa-users", color: "text-secondary", desc: "Atualização de Usuários."},
  12: {icon: "fas fa-users", color: "text-danger", desc: "Exclusão de Usuários."},
  13: {icon: "fas fa-users", color: "text-primary", desc: "Criação de Usuários."},
  14: {icon: "fas fa-truck-moving", color: "text-success", desc: "Visualização de Veículos."},
  15: {icon: "fas fa-truck-moving", color: "text-secondary", desc: "Atualização de Veículos."},
  16: {icon: "fas fa-truck-moving", color: "text-danger", desc: "Exclusão de Veículos."},
  17: {icon: "fas fa-truck-moving", color: "text-primary", desc: "Criação de Veículos."},
  18: {icon: "fas fa-edit", color: "text-success", desc: "Visualização de Gerência."}
};

var $run_usuarios = false, $run_grupos = false, $run_cargos = false;

$.Gerencia = {};

$.Gerencia = {

  alertas: {
    confirmacao: function(texto, callback){
      Swal.fire({
        title: texto,
        type: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim!',
        cancelButtonText: "Não!"
      }).then(callback);
    }
  },

  //acoes relativas ao card de cargos
  Cargos: {

    scrollCargos: function(){
      if(($('.card-cargos table').height() - $('.card-cargos').height() - 30) < $('.card-cargos').scrollTop() && !$run_cargos && $('.count-cargos .total').text() !== $('.count-cargos .parcial').text()){
        $.Gerencia.Cargos.carregaCargos();
      }
    },

    carregaCargos: function(){
      $('.tabela-cargos').attr('page',  parseInt($('.tabela-cargos').attr('page')) + 1);
      $.Model.carregaCargos({page: $('.tabela-cargos').attr('page')}, function(data){
        var _html = "";
        $.each(data.rows, function(k, v){
          _html += '<tr idcargo="'+ v.idcargo +'">'+
            '<td>'+ v.idcargo +'</td>'+
            '<td>'+ v.nome +'</td>'+
            '<td>' + v.descricao + '</td>';
          _html += '<td class="text-center"><i cargo="'+ v.idcargo +'" class="fas fa-trash-alt text-danger delete-cargo"></i></td></tr>';
        });
        $('.tabela-cargos tbody').append(_html);

        $(".count-cargos").html('Exibindo <span class="total">' + $('.tabela-cargos tbody tr').length + "</span> de <span class='parcial'>" + data.count + "</span> resultados");

        if($('.card-cargos table').height() <= $('.card-cargos').height() && data.rows.length > 0){
          $.Gerencia.Cargos.carregaCargos();
        }
        $run_cargos = false;
      });
    },

    //carrega a tabela de cargos
    carrega: function(){
      $('.tabela-cargos').attr('page', '0');
      $.Gerencia.Cargos.carregaCargos();
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

      $('#modalAlteraCargo').modal('show');
    }
  },

  //acoes relativas ao card de grupos
  Grupos: {

    scrollGrupos: function(){
      if(($('.card-grupos table').height() - $('.card-grupos').height() - 30) < $('.card-grupos').scrollTop() && !$run_grupos && $('.count-grupos .total').text() !== $('.count-grupos .parcial').text()){
        $.Gerencia.Grupos.carregaGrupos();
      }
    },

    carregaGrupos: function(){
      $('.tabela-grupos').attr('page',  parseInt($('.tabela-grupos').attr('page')) + 1);
      $.Model.carregaGrupos({page: $('.tabela-grupos').attr('page')}, function(data){
        var _html = "";
        $.each(data.rows, function(k, v){
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
        $('.tabela-grupos tbody').append(_html);

        $(".count-grupos").html('Exibindo <span class="total">' + $('.tabela-grupos tbody tr').length + "</span> de <span class='parcial'>" + data.count + "</span> resultados");

        if($('.card-grupos table').height() <= $('.card-grupos').height() && data.rows.length > 0){
          $.Gerencia.Grupos.carregaGrupos();
        }
        $run_grupos = false;
        $('[data-toggle="tooltip"]').tooltip()
      });
    },

    //carrega a tabela de grupos
    carrega: function(){
      $('.tabela-grupos').attr('page', '0');
      $.Gerencia.Grupos.carregaGrupos();
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

      $('#modalAlteraGrupo').modal('show');
    }
  },

  //acoes relativas ao card de usuarios
  Usuarios: {
    scrollUsuarios: function(){
      if(($('.card-usuarios table').height() - $('.card-usuarios').height() - 30) < $('.card-usuarios').scrollTop() && !$run_usuarios && $('.count-usuarios .total').text() !== $('.count-usuarios .parcial').text()){
        $.Gerencia.Usuarios.carregaUsuarios();
      }
    },

    carregaUsuarios: function(){
      $('.table-usuarios').attr('page',  parseInt($('.table-usuarios').attr('page')) + 1);
      $.Model.carregaUsuarios({page: $('.table-usuarios').attr('page')}, function(data){
        var _html = "";
        $.each(data.rows, function(k, v){
          _html += '<tr usuario="'+ v.idusuario +'">';
          _html += ' <td>'+ v.idusuario +'</td>';
          _html += ' <td>'+ v.nome +'</td>';
          _html += ' <td>'+ v.Cargo.nome +'</td>';
          _html += ' <td>'+ $.Geral.retornaData(v.nascimento) +'</td>';
          _html += ' <td>'+ v.usuario +'</td>';
          _html += ' <td>'+ v.email +'</td>';
          _html += ' <td>'+ v.telefone +'</td>';
          _html += ' <td>'+ (v.ativo === true ? 'Sim' : 'Não') +'</td>';
          _html += ' <td>'+ v.Grupo.nome +'</td>';
          _html += ' <td class="text-center"><i class="fas fa-trash-alt text-danger delete-usuario" usuario="'+ v.idusuario +'"></i></td>';
          _html += '</tr>';
        });
        $('.table-usuarios tbody').append(_html);

        $(".count-usuarios").html('Exibindo <span class="total">' + $('.table-usuarios tbody tr').length + "</span> de <span class='parcial'>" + data.count + "</span> resultados");

        if($('.card-usuarios table').height() <= $('.card-usuarios').height() && data.rows.length > 0){
          $.Gerencia.Usuarios.carregaUsuarios();
        }

        $run_usuarios = false;
      });
    },

    //carrega a tabela de usuarios
    carrega: function(){
      $('.table-usuarios').attr('page', '0');
      $.Gerencia.Usuarios.carregaUsuarios();
    },

    //cria um novo usuario
    cria: function(){
      $('#nascimento_insere_usuario').val((moment( $('#nascimento_insere_usuario').val(), 'DD-MM-YYYY' ).format()));
      $.Model.insereUsuario({action: "usuarios", data: $('.form_addususario').serialize()}, function(data){
        $('.gerencia').trigger('click');
        $('#modalInsereUsuario').modal('hide');
      });
    },

    //altera um determinado usuario
    altera: function(elem){
      $('#nascimento_altera_usuario').val((moment( $('#nascimento_altera_usuario').val(), 'DD-MM-YYYY' ).format()));
      var serializado = $(elem).serialize() + ($('#senha_altera_usuario').val() === "" ? "&notpass=1" : ("&password=" + $('#senha_altera_usuario').val()));
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

      $('#modalInsereUsuario').modal('show');
      $('#nascimento_insere_usuario').mask('00/00/0000');
      $('#telefone_insere_usuario').mask('(00)000000000');
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
            $('#ativo_altera_usuario').val(data.ativo + "");
            $(".atualiza_usuario").attr('action', 'usuarios/' + data.idusuario);
          });    
        });
      });
      $('#modalAlteraUsuario').modal('show');
      $('#nascimento_altera_usuario').mask('00/00/0000');
      $('#telefone_altera_usuario').mask('(00)000000000');
    }
  },

  events: function(){

    //eventos relativos aos modais

    $('#modalInsereCargo').modal({
      show: false
    });

    $('#modalInsereCargo').on('show.bs.modal', function (e) {
      $('#modalInsereCargo input[type="text"]').val('');
    });

    $('#modalAlteraCargo').modal({
      show: false
    });

    $('#modalAlteraCargo').on('show.bs.modal', function (e) {
      $('#modalAlteraCargo input[type="text"]').val('');
    });

    $('#modalInsereGrupo').modal({
      show: false
    });

    $('#modalInsereGrupo').on('show.bs.modal', function (e) {
      $('#modalInsereGrupo input[type="text"]').val('');
      $('#modalInsereGrupo tbody tr[idpermissao]').remove();
    });

    $('#modalAlteraGrupo').modal({
      show: false
    });

    $('#modalAlteraGrupo').on('show.bs.modal', function (e) {
      $('#modalAlteraGrupo input[type="text"]').val('');
      $('#modalAlteraGrupo tbody tr[idpermissao]').remove();
    });

    $('#modalInsereUsuario').modal({
      show: false
    });

    $('#modalInsereUsuario').on('show.bs.modal', function (e) {
      $('#modalInsereUsuario input[type="text"]').val('');
      $('#modalInsereUsuario input[type="email"]').val('');
      $('#modalInsereUsuario input[type="password"]').val('');
    });

    $('#modalAlteraUsuario').modal({
      show: false
    });

    $('#modalAlteraUsuario').on('show.bs.modal', function (e) {
      $('#modalAlteraUsuario input[type="text"]').val('');
      $('#modalAlteraUsuario input[type="email"]').val('');
      $('#modalAlteraUsuario input[type="password"]').val('');
    });

    //clique na pagina de gerencia

    $('body').on('click', '.gerencia', function(ev){
      $('.table-usuarios').attr('page', '0');
      $('.table-usuarios tbody').html('');
      $('.tabela-cargos').attr('page', '0');
      $('.tabela-cargos tbody').html('');
      $('.tabela-grupos').attr('page', '0');
      $('.tabela-grupos tbody').html('');
      $.Gerencia.Usuarios.carrega();
      $.Gerencia.Grupos.carrega();
      $.Gerencia.Cargos.carrega();
    });

    document.addEventListener('scroll', function (event) {
      if ($(event.target).hasClass('card-usuarios')) { // or any other filtering condition        
        $.Gerencia.Usuarios.scrollUsuarios();
      }
      else if ($(event.target).hasClass('card-grupos')) { // or any other filtering condition        
        $.Gerencia.Grupos.scrollGrupos();
      }
      else if ($(event.target).hasClass('card-cargos')) { // or any other filtering condition        
        $.Gerencia.Cargos.scrollCargos();
      }
    }, true /*Capture event*/);

    //eventos relacionados ao usuario

    $('body').on('click', '.delete-usuario', function(ev){
      ev.stopPropagation();
      var _id = $(this).attr("usuario");
      
      $.Gerencia.alertas.confirmacao('Confirma a exclusão desse usuário?', function(result){
        if(result.value)
          $.Gerencia.Usuarios.delete(_id);  
      });
    });

    $('body').on('submit', ".form_addususario", function(ev){
      ev.preventDefault();
      $.Gerencia.alertas.confirmacao('Confirma a adição desse usuário?', function(result){
        if(result.value)
          $.Gerencia.Usuarios.cria();
      });
    });

    $('body').on('click', '.add_usuario', function(ev){
      $.Gerencia.Usuarios.carregaFormInsercao();
    });

    $('body').on('submit', ".atualiza_usuario", function(ev){
      ev.preventDefault();
      var _this = this;
      $.Gerencia.alertas.confirmacao('Confirma a alteração desse usuário?', function(result){
        if(result.value)
          $.Gerencia.Usuarios.altera(_this);
      });
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
      $.Gerencia.alertas.confirmacao('Confirma a adição desse grupo?', function(result){
        if(result.value)
          $.Gerencia.Grupos.cria();
      });
    });

    $('body').on('submit', '.alteraGrupoForm', function(ev){
      ev.preventDefault();
      $.Gerencia.alertas.confirmacao('Confirma a alteração desse grupo?', function(result){
        if(result.value)
          $.Gerencia.Grupos.altera();
      });
    });

    $('body').on('click', '.delete-grupo', function(ev){
      ev.stopPropagation();
      var _id = $(this).attr("grupo");
      
      $.Gerencia.alertas.confirmacao('Confirma a exclusão desse grupo?', function(result){
        if(result.value)
          $.Gerencia.Grupos.delete(_id);
      });
    });

    //eventos relacionados ao cargo

    $('body').on('click', '.add_cargo', function(ev){
      $.Gerencia.Cargos.carregaFormInsercao(); 
    });

    $('body').on('submit', ".form_addcargo", function(ev){
      ev.preventDefault();
      $.Gerencia.alertas.confirmacao('Confirma a adição desse cargo?', function(result){
        if(result.value)
          $.Gerencia.Cargos.cria();
      });
    }); 

    $('body').on('click', '.tabela-cargos tbody tr', function(ev){
      $.Gerencia.Cargos.carregaFormAlteracao(this);    
    });

    $('body').on('submit', '.atualiza_cargo', function(ev){
      ev.preventDefault();
      $.Gerencia.alertas.confirmacao('Confirma a alteração desse cargo?', function(result){
        if(result.value)
          $.Gerencia.Cargos.altera();
      });
    });

    $('body').on('click', '.delete-cargo', function(ev){
      ev.stopPropagation();
      var _id = $(this).attr("cargo");
      
      $.Gerencia.alertas.confirmacao('Confirma a exclusão desse cargo?', function(result){
        if(result.value)
          $.Gerencia.Cargos.delete(_id);
      });
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