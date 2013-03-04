 (function (window, document, undefined) {
 	'use strict';
 	
  var DH = namespace();

	DH.events = {

		/**
		 * Get the current device which iw viewing the page
		 * @return {string} device name
		 */
		getDevice : function(){
			var device = '';
      DH.isDevice('mobile', function () {
        device = 'mobile';
      });
      DH.isDevice('tablet', function () {
        device = 'tablet';
      });
      DH.isDevice('desktop', function () {
        device = 'desktop';
      });
      return device;
		},

		/**
		 * Function that is runned every time user resize the window or switch viewing mode (landscape, portrait)
		 * If the device is changed all events are unbinded, and the new ones for his device is binded
		 * @return {void}
		 */
	 	windowResized : function() {
	 		DH.events.calculateDimensions();
	 		if (DH.settings.environment.device !== DH.events.getDevice()) {
	 			DH.log('device changed, rebinding all');
	 			$('*').unbind('.dh');  //unbind everything
	 			$(document).unbind('.dh');  //unbind everything
	 			DH.init();
	 		}
	 	},

	 	/**
	 	 * Calculate dimensions for the application
	 	 * @return {void}
	 	 */
	 	calculateDimensions : function(){
	 		var width = document.body.clientWidth || $('body').width(),
	 				paddingTop = Number($('#main').css('padding-top').replace('px', '')),
	 				paddingLeft = Number($('#main').css('padding-left').replace('px', '')),
	 				heightOffset = $('section.my-works').height(),
	 				max = (($('body').height() > $('body').width()) ? $('body').height() : $('body').width()),
	 				height = (($('#main section.about-me').height() > max) ? $('#main section.about-me').height() : max) + paddingTop;
	 			 
	 		$('#main').css({
	 			'width'  : (width + 20) * 3 + heightOffset,
	 			'height' : height
	 		});
	 		$('#main section').css('width', width );

	 		/** 3d translations **/
	 		$('#main.about-me').css(DH.prefix('transform'), 'translate(0, 0) translate3d(0, 0, 0)  rotateZ(0deg)');
	 		$('#main section.about-me').css(DH.prefix('transform'), 'translate(0, 0) translate3d(0, 0, 0)  rotateZ(0deg)');

	 		$('#main.my-works').css(DH.prefix('transform'), 'translate(0, 0) translate3d('+ (width + paddingTop) + 'px, '+ -(width - paddingTop + paddingLeft) +'px, 0) rotateZ(90deg)');
	 		$('#main section.my-works').css(DH.prefix('transform'), 'translate(0, 0) translate3d('+ (width) +'px, '+ (width - paddingLeft) +'px, 0) rotateZ(-90deg)');

	 		$('#main.photos').css(DH.prefix('transform'), 'translate(0, 0) translate3d('+ -((width * 2) + heightOffset) +'px, 0, 0)');
	 		$('#main section.photos').css(DH.prefix('transform'), 'translate(0, 0) translate3d('+ ((width * 2) + heightOffset) +'px, 0px, 0)');

	 	}

	}

 })(this, this.document);