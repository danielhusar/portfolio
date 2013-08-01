(function (window, document, $, _, undefined) {
	'use strict';
	
	var DH = window.namespace('DH');
	var width = 700;

	DH.carousel = {

		init : function(){
			$('#carousel').css({
				width: $('#carousel ul li').length * width + 'px',
				left: DH.settings.pageWidth / 2 + 'px'
			});
		},

		navigate : function(id){
			if(DH.settings.environment.device !== 'desktop'){
				return;
			}
			$('body').addClass('carousel');
			$('#main').css(DH.prefix('transform'), 'translate(-66%, 0) translate3d(0, 0, 0)');

			$('#carousel ul').css({
				marginLeft : (-id * width + width) + 'px'
			})
		}

	};

})(this, this.document, this.jQuery, this._);