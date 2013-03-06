(function (window, document, $, _, undefined) {
	'use strict';
	
	var DH = window.namespace();

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
				$('*').unbind('.dh');				//unbind everything
				$(document).unbind('.dh');	//unbind everything
				$.removeHashCallbacks();		//remove all callbacks
				DH.init();									//init all again
			}
		},

		/**
		 * Calculate dimensions for the application
		 * @return {void}
		 */
		calculateDimensions : function(){
			/*
			var width = document.body.clientWidth || $('body').width(),
					paddingTop = Number($('#main').css('padding-top').replace('px', '')),
					paddingLeft = Number($('#main').css('padding-left').replace('px', '')),
					heightOffset = $('section.my-works').height(),
					max = (($('body').height() > $('body').width()) ? $('body').height() : $('body').width()),
					height = (($('#main section.about-me').height() > max) ? $('#main section.about-me').height() : max) + paddingTop;
				 */
		}

	};

})(this, this.document, this.jQuery, this._);