(function (window, document, $, _, undefined) {
	'use strict';
	
	var DH = window.namespace('DH');

	//all init triggers
	DH.init = function(device){
		//store the device in settings
		DH.settings.environment.device = DH.events.getDevice();

		//all inits
		DH.libraries.nav.init();
		DH.events.calculateDimensions();
		DH.libraries.photos.init();
		DH.libraries.nav.navigate(DH.hash());

		//mobile inits
		DH.isDevice('mobile', function () {
			DH.log('mobile version');
			DH.events.lightbox.mobile();
		});

		//tablet inits
		DH.isDevice('tablet', function () {
			DH.log('tablet version');
			DH.events.lightbox.mobile();
		});

		//desktop inits
		DH.isDevice('desktop', function () {
			DH.log('desktop version');
			DH.events.lightbox.desktop();
		});


	};

	//initial init
	DH.init();
	
	//document ready main call
	$(function () {
		$(window).bind('resize', _.debounce(DH.events.windowResized, 300));
	});

})(this, this.document, this.jQuery, this._);