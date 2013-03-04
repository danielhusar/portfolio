(function (window, document, undefined) {
	'use strict';
	
	var DH  = namespace();

  //all init triggers
	namespace('libraries').nav = {

		all : function(){
			var nav = DH.settings.environment.nav;
			$(document).on('keydown.dh', function(e){
			  if (e.keyCode === 37 || e.keyCode === 39) { 
			  	$.each(nav, function(key, val){
			  		var navigateTo = ((e.keyCode === 37) ? nav[--key] : nav[++key]) || false;
			  		if($('#main').hasClass(val) && navigateTo){
			  			DH.hash(navigateTo);
			  			return false;
			  		}
			  	});
			  }
			});

			$.addHashCallback(function(hash){
				var nav = DH.settings.environment.nav;
				if(_.contains(nav, hash)){
					$("#main").removeClass(nav.join(' ')).addClass(hash);
					$('nav').removeClass('active');
					DH.events.calculateDimensions();
				}
			});
		},

		mobile : function(){

			$('nav:not(.active)').on('click.dh', function(event){
				$(this).addClass('active');
				event.preventDefault();
			});

			
			$('nav a').on('click.dh', function(event){
				if($(this).closest('nav').hasClass('active')){
					DH.hash($(this).attr('href'));
				}
			});
			

		}

	}

})(this, this.document);