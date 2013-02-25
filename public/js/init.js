(function (window, document, undefined) {

	var self = DH.prototype;

  //all init triggers
	self.init = function(device){
		//all versions
		self.settings.environment.device = self.events.getDevice();

		//mobile init
		self.isDevice('mobile', function () {
		  self.log('mobile version');

		});

		//tablet init
		self.isDevice('tablet', function () {
		  self.log('tablet version');

		});

		//desktop init
		self.isDevice('desktop', function () {
		  self.log('desktop version');

		});

  };

  //constructor
  var efrafa = new DH();
  window.efrafa = efrafa;

  
  //document ready main call
  $(function () {
    $(window).bind('resize', _.debounce(efrafa.events.windowResized, 300));
  });

})(this, this.document);