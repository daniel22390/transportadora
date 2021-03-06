$.ModelVeiculos = {};

$.ModelVeiculos = {
  erro: function(error){
    Swal.fire({
      type: 'error',
      title: 'Erro',
      text: error.statusText,
    });
  },

  carregaVeiculos: function(params, callback){
    $run_veiculos = true;
    $.ajax({
      url: url + "veiculos",
      headers: {Authorization: 'Bearer ' + $.Model.getCookie('token')}, 
      method: "get",
      crossDomain: true,
      data: params
    })
    .done(callback)
    .fail(function(error){
      $run_veiculos = false;
    });
  },

  carregaVeiculo: function(params, callback){
    $.ajax({
      url: url + "veiculos/" + params.id,
      headers: {Authorization: 'Bearer ' + $.Model.getCookie('token')}, 
      method: "get",
      crossDomain: true,
      data: {}
    })
    .done(callback)
    .fail(function(error){
    });
  },

  carregaVeiculosImagem: function(params, callback){
    $.ajax({
      url: url + "veiculos_imagem",
      headers: {Authorization: 'Bearer ' + $.Model.getCookie('token'), "Content-type": "application/x-www-form-urlencoded; charset=utf-8"}, 
      method: "get",
      crossDomain: true,
      data: params
    })
    .done(callback)
    .fail(function(error){
    });
  },
}