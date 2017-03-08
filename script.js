		function init(){

		var sublayers;
		
		//define sublayers
			
			var layer;
			
			
			// create leaflet map and define some properties
        var map = L.map('map', { 
          zoomControl: true,
		  scrollWheelZoom: false,
          center: [53.6, -3.5],
          zoom: 6
        })

        // add a base layer to map
        L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
          attribution: 'Mapbox <a href="http://mapbox.com/about/maps" target="_blank">Terms &amp; Feedback</a>'
        }).addTo(map);

			var layerUrl = 'https://carbonbrief.carto.com/api/v2/viz/b0ee3c0e-001e-11e7-a398-0ee66e2c9693/viz.json' ;
			cartodb.createLayer(map,layerUrl)
				.addTo(map)
				.on('done', function(layer){
					layer.getSubLayer(0).show();
					layer.getSubLayer(1).hide();

					var LayerActions = {
						reset: function(){
							layer.getSubLayer(0).show();
							layer.getSubLayer(1).hide();
							return true;
						},
						byParty: function(){
							layer.getSubLayer(1).show();
							layer.getSubLayer(0).hide();
							return true;
						},
						byHouse: function(){
							
						//	sublayer.setSQL("SELECT * FROM power_sources_in_germany WHERE type = 'Solar'");
						//	return true;
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
			}
			
			else {
				$("#Key2").hide();
	      $("#Key1").hide();
			}
			
			
    $('#selector').on('change', function() {
      if ( this.value == 'reset' && $(window).width() >= 650)
      //.....................^.......
      {
				$("#Key2").hide();
        $("#Key1").show();
      }
	  
      else if ( this.value == 'byParty' && $(window).width() >= 650)
      {
        $("#Key2").show();
				$("#Key1").hide();
      }		
			else
      {
				$("#Key2").hide();
        $("#Key1").hide();
      }
    });
 });


		window.onload = init;