(function (window, document, $, _, undefined) {
	'use strict';
	
	var DH = window.namespace('DH');

	//all init triggers
	DH.init = function(device){
		DH.settings.environment.device = DH.events.getDevice();

		$.removeHashCallbacks(); //remove all callbacks

		//all versions
		DH.libraries.nav.all();
		DH.events.calculateDimensions();
		DH.libraries.photos.all();

		//mobile init
		DH.isDevice('mobile', function () {
			DH.log('mobile version');
			DH.libraries.nav.mobile();
		});

		//tablet init
		DH.isDevice('tablet', function () {
			DH.log('tablet version');
			DH.libraries.nav.mobile();
		});

		//desktop init
		DH.isDevice('desktop', function () {
			DH.log('desktop version');
			DH.libraries.nav.desktop();
		});

		//execute all hasChanges
		$.hashChange();

	};

	//constructor
	DH.init();
	
	//document ready main call
	$(function () {
		$(window).bind('resize', _.debounce(DH.events.windowResized, 300));
	});

})(this, this.document, this.jQuery, this._);