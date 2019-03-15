var $run_veiculos = false;

$.Veiculo = {};

$.Veiculo = {
  carregaVeiculosImagem: function(){
    $.each($('.veiculo-body .card-veiculo'), function(k, v){

      if(!$(v).find('.img').attr('load')){
        $(v).find('.img').attr('load', 'true');
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url + "veiculos_imagem?idveiculo=" + $(v).attr('id_veiculo') + "&contexto=imagem", true);
        xhr.setRequestHeader("Authorization", 'Bearer ' + $.Model.getCookie('token'));
        xhr.responseType = 'blob';
        
        xhr.onload = function(e) {
          if (this.readyState === 4) { 
            if (this.status == 200) {
              // get binary data as a response
              var blob = this.response;
              var url = new URL(this.responseURL);
              var id = url.searchParams.get("idveiculo");
              const imageUrl = URL.createObjectURL(blob);
              var img = document.createElement("img");
              img.setAttribute('src', imageUrl);
              img.setAttribute('alt', 'na');
              img.style.maxWidth = '100%';
              img.style.maxheight = '270px';
              img.style.marginBottom = '10px';
              $('.veiculo-body .card-veiculo[id_veiculo="'+ id +'"] .img').prepend(img);
            } else {  
              var url = new URL(this.responseURL);
              var id = url.searchParams.get("idveiculo");
              var img = document.createElement("img");
              img.setAttribute('src', 'img/notfound.png');
              img.setAttribute('alt', 'na');
              img.style.maxWidth = '100%';
              img.style.maxheight = '270px';
              img.style.marginBottom = '10px';
              $('.veiculo-body .card-veiculo[id_veiculo="'+ id +'"] .img').prepend(img);
            } 
          }
        };
        
        xhr.send();
      }
    });
  },

  carrega: function(){

    $('.veiculo-body').attr('page', parseInt($('.veiculo-body').attr('page')) + 1);

    $.ModelVeiculos.carregaVeiculos({page: $('.veiculo-body').attr('page')}, function(data){
      var _html = "";
      $.each(data.rows, function(k, v){
        _html += '<div class="col-sm-12 col-md-6 col-lg-6 col-xl-4">';
        _html += '  <div class="card card-veiculo" id_veiculo="' + v.idveiculo + '">';
        _html += '    <div class="card-content">';
        _html += '      <div class="card-body">';
        _html += '        <div class="row">';
        _html += '          <div class="col-md-5 col-lg-5 img" align="center">';
        _html += '          </div>';
        _html += '          <div class=" col-md-7 col-lg-7 ">';
        _html += '            <div>';
        _html += '              <small>PLACA:</small>';
        _html += '              <p>'+ v.placa +'</p>';
        _html += '            </div>';
        _html += '            <div>';
        _html += '              <small>MARCA:</small>';
        _html += '              <p>'+ v.marca +'</p>';
        _html += '            </div>';
        _html += '            <div>';
        _html += '              <small>MODELO:</small>';
        _html += '              <p>'+ v.modelo +'</p>';
        _html += '            </div>';
        _html += '            <div>';
        _html += '              <small>CAPACIDADE (Ton):</small>';
        _html += '              <p>'+ v.capacidade +'</p>';
        _html += '            </div>';
        _html += '            <div>';
        _html += '              <small>RODAGEM (Km):</small>';
        _html += '              <p>'+ v.rodagem +'</p>';
        _html += '            </div>';
        _html += '            <div>';
        _html += '              <small>USUÁRIO:</small>';
        _html += '              <p>'+ (v.Usuarios.length > 0 ? v.Usuarios[0].nome : '---') +'</p>';
        _html += '            </div>';     
        _html += '          </div>';
        _html += '        </div>';
        _html += '      </div>';
        _html += '    </div>';
        _html += '  </div>';
        _html += '</div>';
      });

      $('.veiculo-body .cards').append(_html);

      $('.veiculo-body .total').text( $('.veiculo-body .card-veiculo').length);
      $('.veiculo-body .parcial').text(data.count);

      $.Veiculo.carregaVeiculosImagem();

      $run_veiculos = false;

      if(data.rows.length > 0 && ($('.cards').height() - $('.veiculo-body').height() - 30) < $('.veiculo-body').scrollTop() &&
        $('.veiculo-body .total').text() !== $('.veiculo-body .parcial').text()){
        $.Veiculo.carrega();
      }
      else if(($('.cards').height() - ($('.veiculo-body').height() +  $('.veiculo-body').scrollTop())) < 340 && data.rows.length > 0 &&
        $('.veiculo-body .total').text() !== $('.veiculo-body .parcial').text()){
        if($(window).width() >= 768 && $(window).width() < 1200 && $('.card.card-veiculo').length % 2 !== 0 && data.rows.length > 0){
          $.Veiculo.carrega();
        }
        else if($(window).width() >= 1200 && $('.card.card-veiculo').length % 3 !== 0 && data.rows.length > 0){
          $.Veiculo.carrega();
        }
      }
    });
  },

  events: function(){

    $('body').on('click', '.card-veiculo', function(ev){
      var _id = $(this).attr('id_veiculo');
      $('#modalAlteraVeiculo').modal();
      $('#modalAlteraVeiculo').modal('show');
      $.ModelVeiculos.carregaVeiculo({id: _id}, function(data){
        $('#form-altera-veiculo').attr('id_veiculo', data.idveiculo);
        $('#placa_altera_veiculo').val(data.placa);
        $('#capacidade_altera_veiculo').val(data.capacidade);
        $('#rodagem_altera_veiculo').val(data.rodagem);
        $('#marca_altera_veiculo').val(data.marca);
        $('#modelo_altera_veiculo').val(data.modelo);

        $("#usuario_altera_veiculo").select2({  
          theme: "bootstrap",
          dropdownParent: $('#modalAlteraVeiculo'),
          ajax: {
            url: url + "usuarios",
            dataType: 'json',
            headers: {
              Authorization: 'Bearer ' + $.Model.getCookie('token'),
              "Content-Type" : "application/json",
            },
            data: function (params) {
              var query = {
                contexto: "cria_veiculos",
                search: params.term ? {nome: params.term} : {},
                page: params.page || 1
              }
              return query;
            },
            processResults: function (data, params) {
              var _results = [];
              if(!params.page || params.page === 1)
                _results.push({id: '', text: 'Selecione'});
    
              $.each(data.rows, function(k, v){
                _results.push({id: v.idusuario, text: v.nome});
              }); 
              return {
                results: _results,
                pagination: {
                  more: (params.page ? (params.page * 20) : 20) < data.count
                }
              };
            }
          },
          width: '100%'
        });

        if(data.Usuarios.length > 0){
          var $option = $("<option selected></option>").val(data.Usuarios[0].idusuario).text( data.Usuarios[0].nome);
          $("#usuario_altera_veiculo").append($option).trigger('change');
        }
      });
    });

    $('body').on('click', '.veiculo', function(ev){
      $('.veiculo-body').attr('page', '0');
      $('.veiculo-body .cards').html('<div class="col-sm-12">'+
        '<div class="card" style="min-height: 10px;">'+
          '<div class="card-content">'+
            '<div class="card-body" style="padding: 7px; font-weight: bold;">'+
              '<div class="text-center count-veiculos">Exibindo <span class="total"></span> de <span class="parcial"></span> resultados</div>'+
            '</div>'+
          '</div>'+
        '</div>'+
      '</div>');
      $.Veiculo.carrega();
    });

    $('.veiculo-body').on('scroll', function(ev){
      if(($('.cards').height() - $('.veiculo-body').height() - 30) < $('.veiculo-body').scrollTop() && !$run_veiculos &&
        $('.veiculo-body .total').text() !== $('.veiculo-body .parcial').text()){
        $.Veiculo.carrega();
      }
      else if(($('.cards').height() - ($('.veiculo-body').height() +  $('.veiculo-body').scrollTop())) < 340 && !$run_veiculos &&
        $('.veiculo-body .total').text() !== $('.veiculo-body .parcial').text()){
        if($(window).width() >= 768 && $(window).width() < 1200 && $('.card.card-veiculo').length % 2 !== 0 && !$run_veiculos > 0){
          $.Veiculo.carrega();
        }
        else if($(window).width() >= 1200 && $('.card.card-veiculo').length % 3 !== 0 && !$run_veiculos){
          $.Veiculo.carrega();
        }
      }
    });


    $('body').on('click', '.table-veiculos tbody tr', function(){
        $('#id_altera_veiculo').val($(this).find('td:nth-child(2)').text());
        $('#marca_altera_veiculo').val($(this).find('td:nth-child(3)').text());
        $('#modelo_altera_veiculo').val($(this).find('td:nth-child(4)').text());
        $('#capacidade_altera_veiculo').val($(this).find('td:nth-child(5)').text());
        $('#rodagem_altera_veiculo').val($(this).find('td:nth-child(6)').text());
        $('#modalViewVeiculo').modal();
        $('#modalViewVeiculo').modal('show');

        // The location of Uluru
        var uluru = {lat: -18.865381, lng: -41.962696};
        // The map, centered at Uluru
        var map3 = new google.maps.Map(
            document.getElementById('mapa_altera_veiculo'), {zoom: 15, center: uluru});
        
        var marker = new google.maps.Marker({
        position: uluru,
        map: map3,
        title: "CTE GV"
        });
    });

    $('body').on('click', '.add_veiculo', function(){
      $('#modalInsereVeiculo').modal();
      $('#modalInsereVeiculo').modal('show');
      $('#placa_insere_veiculo').mask('SSS-0000');

      $('#modalInsereVeiculo input').val('');

      // $.Model.carregaUsuarios({contexto: "cria_veiculos"}, function(data){
      //   var _html = "";
      //   $.each(data, function(k, v){
      //     _html += '<option value="'+ v.idusuario +'">'+ v.nome +'</option>';
      //   });
      //   $('#usuario_insere_veiculo').html(_html);
      // });

      $("#usuario_insere_veiculo").select2({
        theme: "bootstrap",
        dropdownParent: $('#modalInsereVeiculo'),
        ajax: {
          url: url + "usuarios",
          dataType: 'json',
          headers: {
            Authorization: 'Bearer ' + $.Model.getCookie('token'),
            "Content-Type" : "application/json",
          },
          data: function (params) {
            var query = {
              contexto: "cria_veiculos",
              search: params.term ? {nome: params.term} : {},
              page: params.page || 1
            }
            return query;
          },
          processResults: function (data, params) {
            var _results = [];
            if(!params.page || params.page === 1)
              _results.push({id: '', text: 'Selecione'});
  
            $.each(data.rows, function(k, v){
              _results.push({id: v.idusuario, text: v.nome});
            }); 
            return {
              results: _results,
              pagination: {
                more: (params.page ? (params.page * 20) : 20) < data.count
              }
            };
          }
        },
        width: '100%'
      });
    });

    $('#imagem_insere_veiculo').on('change',function(e){  
      var fileName = e.target.files[0].name;
      $(this).next('.custom-file-label').html(fileName);
    })

    $('body').on("submit", ".form-insere-veiculo", function(ev){
      ev.preventDefault();
      var _this = this;

      $.Gerencia.alertas.confirmacao('Confirma a inclusão desse veículo?', function(result){
        if(result.value){
          $.Model.insereVeiculo({
            data: {
              placa: $('#placa_insere_veiculo').val(),
              marca: $('#marca_insere_veiculo').val(),
              modelo: $('#modelo_insere_veiculo').val(),
              capacidade: $('#capacidade_insere_veiculo').val(),
              rodagem: $('#rodagem_insere_veiculo').val(),
              usuarios: [$('#usuario_insere_veiculo').val()]
            },
            action: "veiculos"
          }, function(data){
            var formData = new FormData();
            formData.append('id', data.idveiculo);
            formData.append('imagem', document.getElementById('imagem_insere_veiculo').files[0]);
            
            $.ajax({
              headers: {Authorization: 'Bearer ' + $.Model.getCookie('token')}, 
              type: 'POST',
              url: url + "veiculos_imagem",
              data: formData,
              cache: false,
              contentType: false,
              processData: false,
              success: function(data) {
                $('#modalInsereVeiculo').modal('hide');
                $('.sidenav .veiculo').trigger('click');
              },
              error: function(data) {
                $.Model.erro(data);
              }
            });
          });
        }
      });
    });
  }
}