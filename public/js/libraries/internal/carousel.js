(function (window, document, $, _, undefined) {
	'use strict';

	var DH = window.namespace('DH');
	var width = 700;
	var $carousel = $('#carousel');

	window.namespace('DH.libraries').carousel = {

		init : function(){
			$('#carousel').css({
				width: $carousel.find('ul li').length * width + 'px',
				left: DH.settings.pageWidth / 2 + 'px'
			});
		},

		navigate : function(id){
			if(DH.settings.environment.device !== 'desktop'){
				return;
			}

			//store current photo
			DH.settings.photos.currentPhoto = Number(id);

			//remove global navigation binds
			$(document).off('.key');

			//plug in carousel navigation
			DH.libraries.carousel.keyNav();

			//lazy load images in carousel
			$carousel.find('[data-id="'+ id +'"], [data-id="'+ (Number(id) - 1) +'"], [data-id="'+ (Number(id) + 1) +'"]').lazyLoad({effect: 'fadeIn'});

			//css
			$('body').addClass('carousel');
			$('#main').css(DH.prefix('transform'), 'translate(-66%, 0) translate3d(0, 0, 0)');
			$carousel.find('ul').css({
				marginLeft : (-id * width + width) + 'px'
			});
		},

		keyNav : function(){
			$(document).on('keydown.dh.carousel', function(e){
				if (e.keyCode === 37 || e.keyCode === 39) {
					var id = DH.settings.photos.currentPhoto,
							navigateTo = (e.keyCode === 37) ? --id : ++id;

					if( id > 0 && id <= DH.settings.photos.totalPhotos){
						DH.hash('photo/' + navigateTo);
					}
				}else if(e.keyCode === 40){
					DH.hash('photos');
					DH.libraries.nav.init();
				}
			});
		}

	};

})(this, this.document, this.jQuery, this._);