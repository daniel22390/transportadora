$.Home = {};

$.Home = {
  events: function(){
    $.Home.criaGrafico();
    
  },

  criaGrafico: function(){
    var barChartData = {
			labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho'],
			datasets: [{
        label: 'Pacotes',
        backgroundColor: '#28a745',
				data: [
					100,
				  103,
				  99,
					121,
					104,
					100,
				  88
				]
			}, {
				label: 'Entregues',
				backgroundColor: '#007bff',
				data: [
					88,
					100,
					92,
					100,
					88,
					95,
				  84
				]
			}, {
				label: 'Pendente',
				backgroundColor: '#dc3545',
				data: [
				  12,
					3,
				  7,
					21,
					16,
					5,
					4
				]
			}]
		};
    var ctx = document.getElementById('myChart').getContext('2d');
    window.myBar = new Chart(ctx, {
      type: 'bar',
      data: barChartData,
      options: {
        title: {
          display: true,
          text: 'Pacotes por Mês',
          fontSize: 16
        },
        tooltips: {
          mode: 'index',
          intersect: false
        },
        responsive: true,
        scales: {
          xAxes: [{
            stacked: true,
          }],
          yAxes: [{
            stacked: true
          }]
        }
      }
    });

    var config = {
			type: 'pie',
			data: {
				datasets: [{
					data: [
						117,
						15,
						3,
						5
					],
					backgroundColor: [
						'#28a745',
						'#007bff',
						'#ffc107',
						'#dc3545'
					],
					label: 'Pacotes'
				}],
				labels: [
					'Entregas',
					'Pendentes',
					'Atraso',
					'Cancelados'
				]
			},
			options: {
        title: {
          display: true,
          text: 'Status dos Pacotes',
          fontSize: 16
        },
				responsive: true
			}
    };
    
    var ctx = document.getElementById('chart-area').getContext('2d');
    window.myPie = new Chart(ctx, config);
    
  },

  criaMapa: function(){
    // The location of Uluru
    var uluru = {lat: -18.865381, lng: -41.962696};
    // The map, centered at Uluru
    var map3 = new google.maps.Map(
        document.getElementById('mapa_home'), {zoom: 15, center: uluru});
    // The marker, positioned at Uluru
    var image = {
      url: './img/archive.png',
      // This marker is 20 pixels wide by 32 pixels high.
      size: new google.maps.Size(24, 24),
      // The origin for this image is (0, 0).
      origin: new google.maps.Point(0, 0),
      // The anchor for this image is the base of the flagpole at (0, 32).
      anchor: new google.maps.Point(12, 12)
    };
    var marker = new google.maps.Marker({
      position: uluru,
      map: map3,
      icon: image,
      title: "CTE GV"
    });
  }
}