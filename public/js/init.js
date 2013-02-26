(function (window, document, undefined) {
	'use strict';
	
	var DH = namespace();

  //all init triggers
	DH.init = function(device){
		//all versions
		DH.settings.environment.device = DH.events.getDevice();

		//mobile init
		DH.isDevice('mobile', function () {
		  DH.log('mobile version');
		  DH.libraries.nav.mobile();
		});

		//tablet init
		DH.isDevice('tablet', function () {
		  DH.log('tablet version');

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