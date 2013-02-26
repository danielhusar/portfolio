(function (window, document, undefined) {
	'use strict';
	
	var DH  = namespace();

  //all init triggers
	namespace('libraries').nav = {

		mobile : function(){
			$('nav a').on('click.dh', function(event){
				DH.log('click');
				$('nav').toggleClass('active');
				event.preventDefault();
			});
		}
	}

})(this, this.document);