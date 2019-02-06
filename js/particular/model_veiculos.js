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
    $.ajax({
      url: url + "veiculos",
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
}