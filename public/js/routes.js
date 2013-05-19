(function (window, document, $, _, routie, undefined) {
	'use strict';

	var routes = {

		'about-me' : function() {
			DH.libraries.nav.navigate('about-me');
		},

		'my-works' : function() {
			DH.libraries.nav.navigate('my-works');
			DH.events.lazyLoad.works();
		},

		'photos' : function() {
			DH.libraries.nav.navigate('photos');
			DH.events.lazyLoad.photos();
		},
		'photo/:id': function(id) {
    	
		}

	};

	routie(routes);
	
})(this, this.document, this.jQuery, this._, this.routie);