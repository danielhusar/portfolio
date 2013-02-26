(function (window, document, undefined) {
	'use strict';
	
	var DH  = namespace();

  //all init triggers
	namespace('libraries').nav = {

		mobile : function(){
			$('nav a').namOn('click', function(event){
				DH.log('click');
				$('nav').toggleClass('active');
				event.preventDefault();
			});
		}

	}

})(this, this.document);