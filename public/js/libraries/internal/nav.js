(function (window, document, undefined) {
	'use strict';
	
	var DH  = namespace();

	var config = {
		seq : ['about-me', 'my-works', 'photos']
	}

  //all init triggers
	namespace('libraries').nav = {

		all : function(){
			$(document).on('keydown.dh', function(e){
			  if (e.keyCode === 37 || e.keyCode === 39) { 
			  	$.each(config.seq, function(key, val){
			  		var navigateTo = ((e.keyCode === 37) ? config.seq[--key] : config.seq[++key]) || false;
			  		if($('#main').hasClass(val) && navigateTo){
			  			$("#main").removeClass(config.seq.join(' ')).addClass(navigateTo);
			  			$('nav').removeClass('active');
			  			window.location.hash = "#" + navigateTo;
			  			return false;
			  		}
			  	});
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
					$("#main").removeClass(config.seq.join(' ')).addClass( $(this).attr('href').split("#")[1] );
					$(this).closest('nav').removeClass('active');
				}
			});

		}

	}

})(this, this.document);