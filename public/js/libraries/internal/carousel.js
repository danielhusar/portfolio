(function (window, document, $, _, undefined) {
	'use strict';
	
	var DH = window.namespace('DH');

	DH.carousel = {

		init : function(id){
			if(DH.settings.environment.device !== 'desktop'){
				return;
			}
			$('body').addClass('carousel');
		}

	};

})(this, this.document, this.jQuery, this._);