(function (window, document, $, _, undefined) {
	'use strict';
	
	var DH  = window.namespace();

	window.namespace('libraries').nav = {

		all : function(){

			$("#main").css(DH.prefix('transform'), '');
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

			$.addHashCallback(function(hash){
				var nav = DH.settings.environment.nav;
				if(_.contains(nav, hash)){
					$("#main").removeClass(nav.join(' ')).addClass(hash);
					$('nav').removeClass('active');
				}
			});
			
		},

		desktop : function(){

			var nav = DH.settings.environment.nav;
			var sectionWidth = $("section").outerWidth();

			function navigate(hash){
				if(_.contains(nav, hash)){
					var indent = (DH.settings.pageWidth < sectionWidth) ? (sectionWidth - DH.settings.pageWidth) / 2 : 0,
							index = nav.indexOf(hash),
							position = -sectionWidth * index -indent;

					$("#main").removeClass(nav.join(' '))
										.addClass(hash)
										.css(DH.prefix('transform'), 'translate(0, 0) translate3d('+position+'px, 0, 0)');
					$('nav').removeClass('active');
				}
			}

			$.addHashCallback(function(hash){
				 navigate(hash);
			});

			navigate(DH.hash() || DH.settings.environment.nav[0]);

		}

	};

})(this, this.document, this.jQuery, this._);