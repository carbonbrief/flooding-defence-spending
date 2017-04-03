	//map by Rosamund Pearce for Carbon Brief
	
		function init(){

		var sublayers;
		
		//define sublayers
			
			var layer;
			
			
			// create leaflet map and define some properties
        var map = L.map('map', { 
          zoomControl: true,
		  scrollWheelZoom: false,
          center: [53.3, -2.4],
          zoom: 6
        })

        // add a base layer to map
        L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
          attribution: 'Mapbox <a href="http://mapbox.com/about/maps" target="_blank">Terms &amp; Feedback</a>'
        }).addTo(map);

			var layerUrl = 'https://carbonbrief.carto.com/api/v2/viz/8f726db0-0e2a-11e7-8339-0e233c30368f/viz.json' ;
			cartodb.createLayer(map,layerUrl)
				.addTo(map)
				.on('done', function(layer){
					layer.getSubLayer(0).show();
					layer.getSubLayer(1).hide();
					layer.getSubLayer(2).hide();

					var LayerActions = {
						reset: function(){
							layer.getSubLayer(0).show();
							layer.getSubLayer(1).hide();
							layer.getSubLayer(2).hide();
							return true;
						},
						byParty: function(){
							layer.getSubLayer(1).show();
							layer.getSubLayer(0).hide();
							layer.getSubLayer(2).hide();
							return true;
						},
						twentyOne: function(){
							layer.getSubLayer(2).show();
							layer.getSubLayer(0).hide();
							layer.getSubLayer(1).hide();
							return true;
						}
					}

				$('#selector').change(function() {
					 LayerActions[$(this).val()]();
				});	
				
	

				});
		}
		
		$(document).ready(function(){
			
			if ($(window).width() >= 650)
				
			{
				$("#Key2").hide();
	      $("#Key1").show();
				$("#Total1").show();
				$("#Total2").hide();
			}
			
			else {
				$("#Key2").hide();
	      $("#Key1").hide();
				$("#Total1").hide();
				$("#Total2").hide();
			}
			
			
    $('#selector').on('change', function() {
      if ( this.value == 'reset' && $(window).width() >= 650)
      {
				$("#Key2").hide();
        $("#Key1").show();
				$("#Total1").show();
				$("#Total2").hide();
      }
	  
      else if ( this.value == 'byParty' && $(window).width() >= 650)
      {
        $("#Key2").show();
				$("#Key1").hide();
				$("#Total1").show();
				$("#Total2").hide();
      }	
      else if ( this.value == 'twentyOne' && $(window).width() >= 650)
      {
				$("#Key2").hide();
        $("#Key1").show();
				$("#Total1").hide();
				$("#Total2").show();
      }		
			else
      {
				$("#Key2").hide();
        $("#Key1").hide();
      }
    });
 });


		window.onload = init;