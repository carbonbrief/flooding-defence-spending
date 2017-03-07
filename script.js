		function init(){

		//	var sublayer;
			
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
					layer = layers[1];
					layer.getSublayer(1).hide();

					var LayerActions = {
						reset: function(){
							layer.getSublayer(1).show();
							layer.getSublayer(2).hide();
						},
						byParty: function(){
							sublayer.setSQL("SELECT * FROM power_sources_in_germany WHERE type = 'Onshore wind' OR type = 'Offshore wind'");
							return true;
						},
						byHouse: function(){
							
							sublayer.setSQL("SELECT * FROM power_sources_in_germany WHERE type = 'Solar'");
							return true;
						}
					
					}

				$('#selector').change(function() {
					 LayerActions[$(this).val()]();
				});	
				
	

				});
		}
		
		$(document).ready(function(){
    $('#selector').on('change', function() {
      if ( this.value == 'reset' && $(window).width() >= 650)
      //.....................^.......
      {
		$('.total').hide();
        $("#alltotal").show();
      }
	  else if (this.value =='layer11' && $(window).width() >= 650) {
		$('.total').hide();
		$("#renewablestotal").show();
}
	else if (this.value =='layer12' && $(window).width() >= 650) {
		$('.total').hide();
		$("#nonrenewablestotal").show();
}
      else
      {
        $(".total").hide();
      }
    });
});


		window.onload = init;