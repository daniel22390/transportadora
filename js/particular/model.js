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