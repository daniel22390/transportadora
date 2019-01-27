var url = "http://localhost:3000/";

$.Model = {};

$.Model = {
  carregaUsuario: function(params, callback){
    $.ajax({
      url: url + "usuario",
      headers: {Authorization: 'Bearer ' + $.Model.getCookie('token')}, 
      method: "get",
      crossDomain: true,
      dataType: 'json',
      data: params
    })
    .done(callback)
    .fail(function(error){
    });
  },

  carregaUsuarioId: function(params, callback){
    $.ajax({
      url: url + "usuarios/" + params.id,
      headers: {Authorization: 'Bearer ' + $.Model.getCookie('token')}, 
      method: "get",
      crossDomain: true,
      dataType: 'json',
      data: {}
    })
    .done(callback)
    .fail(function(error){
    });
  },

  atualizaUsuario: function(params, callback){
    $.ajax({
      url: url + params.action,
      headers: {Authorization: 'Bearer ' + $.Model.getCookie('token')}, 
      method: "put",
      crossDomain: true,
      dataType: 'json',
      data: params.data
    })
    .done(callback)
    .fail(function(error){
    });
  },

  alteraGrupo: function(params, callback){
    $.ajax({
      url: url + "grupos/" + params.id,
      headers: {Authorization: 'Bearer ' + $.Model.getCookie('token')}, 
      method: "put",
      crossDomain: true,
      dataType: 'json',
      data: params
    })
    .done(callback)
    .fail(function(error){
    });
  },

  alteraCargo: function(params, callback){
    $.ajax({
      url: url + "cargos/" + params.id,
      headers: {Authorization: 'Bearer ' + $.Model.getCookie('token')}, 
      method: "put",
      crossDomain: true,
      dataType: 'json',
      data: params
    })
    .done(callback)
    .fail(function(error){
    });
  },

  insereUsuario: function(params, callback){
    $.ajax({
      url: url + params.action,
      headers: {Authorization: 'Bearer ' + $.Model.getCookie('token')}, 
      method: "post",
      crossDomain: true,
      dataType: 'json',
      data: params.data
    })
    .done(callback)
    .fail(function(error){
    });
  },

  insereCargo: function(params, callback){
    $.ajax({
      url: url + params.action,
      headers: {Authorization: 'Bearer ' + $.Model.getCookie('token')}, 
      method: "post",
      crossDomain: true,
      dataType: 'json',
      data: params.data
    })
    .done(callback)
    .fail(function(error){
    });
  },

  removeUsuario: function(params, callback){
    $.ajax({
      url: url + params.action,
      headers: {Authorization: 'Bearer ' + $.Model.getCookie('token')}, 
      method: "delete",
      crossDomain: true,
      dataType: 'json',
      data: params.data
    })
    .done(callback)
    .fail(function(error){
    });
  },

  carregaUsuarios: function(params, callback){
    $.ajax({
      url: url + "usuarios",
      headers: {Authorization: 'Bearer ' + $.Model.getCookie('token')}, 
      method: "get",
      crossDomain: true,
      dataType: 'json',
      data: params
    })
    .done(callback)
    .fail(function(error){
    });
  },

  carregaGrupos: function(params, callback){
    $.ajax({
      url: url + "grupos",
      headers: {Authorization: 'Bearer ' + $.Model.getCookie('token')}, 
      method: "get",
      crossDomain: true,
      dataType: 'json',
      data: params
    })
    .done(callback)
    .fail(function(error){
    });
  },

  carregaCargos: function(params, callback){
    $.ajax({
      url: url + "cargos",
      headers: {Authorization: 'Bearer ' + $.Model.getCookie('token')}, 
      method: "get",
      crossDomain: true,
      dataType: 'json',
      data: params
    })
    .done(callback)
    .fail(function(error){
    });
  },


  carregaGrupo: function(params, callback){
    $.ajax({
      url: url + "grupos/" + params.id,
      headers: {Authorization: 'Bearer ' + $.Model.getCookie('token')}, 
      method: "get",
      crossDomain: true,
      dataType: 'json',
      data: params
    })
    .done(callback)
    .fail(function(error){
    });
  },

  carregaCargo: function(params, callback){
    $.ajax({
      url: url + "cargos/" + params.id,
      headers: {Authorization: 'Bearer ' + $.Model.getCookie('token')}, 
      method: "get",
      crossDomain: true,
      dataType: 'json',
      data: params
    })
    .done(callback)
    .fail(function(error){
    });
  },

  removeGrupo: function(params, callback){
    $.ajax({
      url: url + params.action,
      headers: {Authorization: 'Bearer ' + $.Model.getCookie('token')}, 
      method: "delete",
      crossDomain: true,
      dataType: 'json',
      data: params.data
    })
    .done(callback)
    .fail(function(error){
    });
  },

  removeCargo: function(params, callback){
    $.ajax({
      url: url + params.action,
      headers: {Authorization: 'Bearer ' + $.Model.getCookie('token')}, 
      method: "delete",
      crossDomain: true,
      dataType: 'json',
      data: params.data
    })
    .done(callback)
    .fail(function(error){
    });
  },

  carregaCargos: function(params, callback){
    $.ajax({
      url: url + "cargos",
      headers: {Authorization: 'Bearer ' + $.Model.getCookie('token')}, 
      method: "get",
      crossDomain: true,
      dataType: 'json',
      data: params
    })
    .done(callback)
    .fail(function(error){
    });
  },

  carregaGrupos: function(params, callback){
    $.ajax({
      url: url + "grupos",
      headers: {Authorization: 'Bearer ' + $.Model.getCookie('token')}, 
      method: "get",
      crossDomain: true,
      dataType: 'json',
      data: params
    })
    .done(callback)
    .fail(function(error){
    });
  },

  salvaGrupo: function(params, callback){
    $.ajax({
      url: url + "grupos",
      headers: {Authorization: 'Bearer ' + $.Model.getCookie('token')}, 
      method: "post",
      crossDomain: true,
      dataType: 'json',
      data: params
    })
    .done(callback)
    .fail(function(error){
    });
  },

  carregaPermissoes: function(params, callback){
    $.ajax({
      url: url + "permissoes",
      headers: {Authorization: 'Bearer ' + $.Model.getCookie('token')}, 
      method: "get",
      crossDomain: true,
      dataType: 'json',
      data: params
    })
    .done(callback)
    .fail(function(error){
    });
  },

  getCookie: function(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
}