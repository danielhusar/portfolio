(function (window, document, $, _, undefined) {
	'use strict';


	window.namespace('DH.libraries').twitter = {

		init : function(){
			if(DH.settings.environment.device === 'desktop'){
				$('[data-tweets]').css({
					marginRight : -(($('[data-tweets]').outerWidth() - $('[data-tweets]').width()) * 2) + 'px'
				})
				DH.libraries.twitter.loadData().done(function(data){
					//TODO
				});
			}
		},

		loadData : function(){
			return $.ajax({
				url : '/tweets',
				dataType : 'json'
			});
		},

	};

})(this, this.document, this.jQuery, this._);