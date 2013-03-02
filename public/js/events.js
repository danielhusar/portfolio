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
	 		if (DH.settings.environment.device !== DH.events.getDevice()) {
	 			DH.log('device changed, rebinding all');
	 			$('*').unbind('.dh');  //unbind everything
	 			$(document).unbind('.dh');  //unbind everything
	 			DH.init();
	 		}
	 	}

	}

 })(this, this.document);