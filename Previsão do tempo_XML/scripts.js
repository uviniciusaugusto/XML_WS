$(document).ready(function(){ 


	mapa(-21.23,-43.77);
	

	$('#button').click(function(){
		pesquisa();
	});
	
	$( "#texto" ).keypress(function(e) {
  		if (e.which == 13) {
			pesquisa();
		}
	});


	function pesquisa() {
		
		let SUA_CHAVE = "";
		var texto=$('#texto').val();
		$('#texto').val('');
		$.ajax({type: 'GET',url: 'http://api.openweathermap.org/data/2.5/weather?q='+texto+'&appid='+SUA_CHAVE+'&mode=xml', success: function(resp){
   			
   			var coordenada = resp.getElementsByTagName('coord')[0]; 
     		var latitude= Number(coordenada.getAttribute('lat'));
			var longitude= Number(coordenada.getAttribute('lon'));
			var clima = resp.getElementsByTagName('weather')[0];
			var cidade = resp.getElementsByTagName('city')[0];
			var nome = cidade.getAttribute("name");
			var temperatura = resp.getElementsByTagName('temperature')[0];
			var max = temperatura.getAttribute("max");
			var min = temperatura.getAttribute("min");
			var atual = temperatura.getAttribute("value");
			
			var sol = resp.getElementsByTagName('sun')[0];
			
			var nascerSol = sol.getAttribute("rise");
			var porDoSol = sol.getAttribute("set");
			console.log(nascerSol);
		    
		    
	    	$('#imagem').hide();
	     	$('#informacoes').fadeIn(500);
	   
		    $('#pesquisa').css({
		 		width: "30%",
				height: "25vh"
		    });
		
	     	$('#informacoes').html('<h1>'+nome+'</h1><img src="http://openweathermap.org/img/w/'+clima.getAttribute('icon')+'.png" class="img_icon"><br>Temperatura atual: ' + (atual-273.15).toFixed(2) + '°C<hr> <div id = "esquerda"><br>Temperatura  máxima: ' +(max-273.15).toFixed(2) + 
	     		'°C<hr><br>Temperatura mínima: ' +(min-273.15).toFixed(2) + '°C<hr><br>Longitude: ' + longitude + '<hr></div> <div id = "direita"><br>Nascer do sol: ' + time(nascerSol)+ '<hr><br>Pôr do sol: ' + time(porDoSol)+'<hr><br>Latitude: '+ latitude + '<hr></div>') ;
			$('#mapa').html(mapa(latitude,longitude));
			
	
		}
		});
		
	}

	function time(data) {
		var date = new Date(data);
		var hours = date.getHours();
		var minutes = "0" + date.getMinutes();
		var seconds = "0" + date.getSeconds();	
		var horario = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
		
		return horario;	
	}

	function mapa(latitude, longitude) {
    	var coord = {lat: latitude, lng: longitude};
        var map = new google.maps.Map(document.getElementById('mapa'), {
          zoom: 8,
          center: coord
        });
        var marker = new google.maps.Marker({
          position: coord,
          map: map
        });
  	}

	
});
