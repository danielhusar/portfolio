(function (window, document, undefined) {
	'use strict';
	
	var DH = namespace();

  //all init triggers
	DH.init = function(device){
		DH.settings.environment.device = DH.events.getDevice();

		//all versions
		DH.libraries.nav.all();
		DH.events.calculateDimensions();

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

		});

  };

  //constructor
  var efrafa = new DanielHusar();
  window.efrafa = efrafa;

  
  //document ready main call
  $(function () {
    $(window).bind('resize', _.debounce(efrafa.events.windowResized, 300));
  });

})(this, this.document);