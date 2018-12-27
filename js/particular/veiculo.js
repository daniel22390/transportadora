$.Veiculo = {};

$.Veiculo = {
    events: function(){
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
        });
    }
}