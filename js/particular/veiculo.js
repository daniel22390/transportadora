$.Veiculo = {};

$.Veiculo = {
  carrega: function(){
    $.ModelVeiculos.carregaVeiculos({}, function(data){
      var _html = "";
      $.each(data, function(k, v){
        _html += "<tr id_veiculo='" + v.idveiculo + "'>";
        _html += "  <td></td>";
        _html += "  <td>"+ v.idveiculo +"</td>";
        _html += "  <td>"+ v.marca +"</td>";
        _html += "  <td>"+ v.modelo +"</td>";
        _html += "  <td>"+ v.capacidade +"</td>";
        _html += "  <td>"+ v.rodagem +"</td>";
        _html += "  <td>"+ (v.Usuarios.length > 0 ? v.Usuarios[0].nome : '---') +"</td>";
        _html += '  <td class="text-center"><i class="fas fa-trash-alt text-danger" id_veiculo="'+ v.idveiculo +'"></i></td>';
        _html += "</tr>";
      });

      $('.table-veiculos tbody').html(_html);
    });
  },

  events: function(){

    $('body').on('click', '.veiculo', function(ev){
      $.Veiculo.carrega();
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

      $.Model.carregaUsuarios({contexto: "cria_veiculos"}, function(data){
        var _html = "";
        $.each(data, function(k, v){
          _html += '<option value="'+ v.idusuario +'">'+ v.nome +'</option>';
        });
        $('#usuario_insere_veiculo').html(_html);
      });
    });

    $('#imagem_insere_veiculo').on('change',function(e){
      var fileName = e.target.files[0].name;
      $(this).next('.custom-file-label').html(fileName);
    })

    $('body').on("submit", ".form-insere-veiculo", function(ev){
      ev.preventDefault();
      var _this = this;

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
            
          },
          error: function(data) {
            $.Model.erro(data);
          }
        });
      });
    });
  }
}