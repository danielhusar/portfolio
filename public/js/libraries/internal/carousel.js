(function (window, document, $, _, undefined) {
	'use strict';
	
	var DH = window.namespace('DH');
	var width = 700;
	var $carousel = $('#carousel');

	DH.carousel = {

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
			//remove global navigation binds
			$(document).off('.key');

			//lazy load images in carousel
			$carousel.find('[data-id="'+ id +'"], [data-id="'+ (Number(id) - 1) +'"], [data-id="'+ (Number(id) + 1) +'"]').lazyLoad({effect: 'fadeIn'});

			//css
			$('body').addClass('carousel');
			$('#main').css(DH.prefix('transform'), 'translate(-66%, 0) translate3d(0, 0, 0)');

			$carousel.find('ul').css({
				marginLeft : (-id * width + width) + 'px'
			});
		}

	};

})(this, this.document, this.jQuery, this._);