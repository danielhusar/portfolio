 (function (window, document, undefined) {

  var self =  DH.prototype;

	self.events = {

		/**
		 * Get the current device which iw viewing the page
		 * @return {string} device name
		 */
		getDevice : function(){
			var device = '';
      self.isDevice('mobile', function () {
        device = 'mobile';
      });
      self.isDevice('tablet', function () {
        device = 'tablet';
      });
      self.isDevice('desktop', function () {
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
	 		if (self.settings.environment.device !== self.events.getDevice()) {
	 			self.log('device changed, rebinding all');
	 			$('*').unbind('.dh');  //unbind everything
	 			self.init();
	 		}
	 	}

	}

 })(this, this.document);