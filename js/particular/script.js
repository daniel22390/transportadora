$.Geral = {};

$.Geral.events = function(){
  $('.dropdown-toggle').dropdown();
  
  $(".menu_i").click(function(){
    if($('.sidenav').hasClass('toggle-class')){
      $(".sidenav").removeClass('toggle-class');
      $(".sidenav").addClass('notoggle-class');
      $('.content-elements > div').css('width', "calc(100% - 120px)");
      $('.content-elements > div').css('marginLeft', "120px");
    }
    else{
      $(".sidenav").addClass('toggle-class');
      $(".sidenav").removeClass('notoggle-class');
      $('.content-elements > div').css('width', "100%");
      $('.content-elements > div').css('marginLeft', "0px");
    }
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

  $('body').on('click', '.filtro_produto', function(ev){
    $('.pesquisa').remove();
    $('.table-altera tbody').prepend('<tr class="pesquisa"><td><input type="number" class="form-control"></td><td><input type="text" class="form-control"></td><td><input type="text" class="form-control"></td><td><input type="text" class="form-control"></td><td><input type="text" class="form-control"></td><td><input type="text" class="form-control"></td><td><input type="text" class="form-control"></td></tr>');
  });
  $('body').on('click', function(ev){
    if(!$(event.target).closest('.pesquisa').length && !$(event.target).closest('.filtro_produto').length) {
      $('.pesquisa').remove();
    }
  });
}

$(document).ready(function(){
  $.Geral.events();
  $.Distribuidora.events();
  $.Produto.events();
  $.Home.events();
});

function initMapDistribuidora(){
  $.Distribuidora.ativaMapa();
  $.Produto.ativaMapa();
  $.Home.criaMapa();
}