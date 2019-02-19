$.Geral = {};

$.Geral = {
  variaveis: {
    usuario: null 
  },

  events: function(){
    $('.dropdown-toggle').dropdown();
    
    $(".menu_i").click(function(){
      if($('.sidenav').hasClass('toggle-class')){
        $(".sidenav").removeClass('toggle-class');
        $(".sidenav").addClass('notoggle-class');
        $('.content-elements').addClass('notoggle-class');
        $('.content-elements').removeClass('toggle-class');
        $('.content-elements > div').css('width', "calc(100% - 120px)");
        $('.content-elements > div').css('marginLeft', "120px");
      }
      else{
        $('.content-elements').removeClass('notoggle-class');
        $('.content-elements').addClass('toggle-class');
        $(".sidenav").addClass('toggle-class');
        $(".sidenav").removeClass('notoggle-class');
        $('.content-elements > div').css('width', "100%");
        $('.content-elements > div').css('marginLeft', "0px");
      }
    });

    $('body').on('click', '.conta', function(ev){
      $('.usuario').trigger('click');
    });

    $('body').on('click', '.side li', function(ev){
      $('.content-elements > div').hide();
      $('.sidenav > li').removeClass("selected");
      if($(this).hasClass('home')){
        $('.home-body').show();
        $('.home').addClass('selected');
      }
      else if($(this).hasClass('pacotes')){
        $('.pacotes-body').show();
        $('.pacotes').addClass('selected');
      }
      else if($(this).hasClass('rotas')){
        $('.rotas-body').show();
        $('.rotas').addClass('selected');
      }
      else if($(this).hasClass('gerencia')){
        $('.gerencia-body').show();
        $('.gerencia').addClass('selected');
        $('[data-toggle="tooltip"]').tooltip();
      }
      else if($(this).hasClass('veiculo')){
        $('.veiculo-body').show();
        $('.veiculo').addClass('selected');
      }
      else if($(this).hasClass('usuario')){
        $('.usuario-body').show();
        $('.usuario').addClass('selected');
      }
    });


   
  },

  carregaUsuario: function(){
    $.Model.carregaUsuario({}, function(data){
      $.Geral.variaveis.usuario = data;
      $.Geral.carregaVisualizacoes(data.Grupo.Permissoes);
      $('#btn_user span').text(data.usuario.toUpperCase());
    });
  },

  carregaVisualizacoes: (permissoes) => {
    $.each(permissoes, function(k, v){
      if(v.idpermissao === 18){
        $('.gerencia').show();
      }
    });
  },

  retornaData: function(data){
    return moment(data).format('DD/MM/YYYY');
  }
}

$(document).ready(function(){
  $.Geral.events();
  $.Distribuidora.events();
  $.Produto.events();
  $.Veiculo.events();
  $.Gerencia.events();
  $.Home.events();
  $.Geral.carregaUsuario();
});

function initMapDistribuidora(){
  $.Distribuidora.ativaMapa();
  $.Produto.ativaMapa();
  $.Usuario.ativaMapa();
  $.Home.criaMapa();
}
