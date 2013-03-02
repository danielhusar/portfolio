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
			  			window.location.hash = "#" + navigateTo;
			  			return false;
			  		}
			  	});
			  }
			});
		},

		mobile : function(){

			function plugNav(){
				$('nav').on('click.dh', function(event){
					$(this).toggleClass('active');
					unPlugnav();
					plugNavItem();
					event.preventDefault();
				});
			}

			function unPlugnav(){
				$('nav').unbind('click.dh');
			}

			function plugNavItem(){
				$('nav a').on('click.dh', function(event){
					$("#main").removeClass(config.seq.join(' ')).addClass( $(this).attr('href').split("#")[1] );
					$(this).parent('nav').removeClass('active');
					 unplugNavItem();
					 plugNav();
				});
			}

			function unplugNavItem(){
				$('nav a').unbind('click.dh');
			}

			plugNav();

		}

	}

})(this, this.document);