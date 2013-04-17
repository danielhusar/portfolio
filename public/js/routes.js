(function (window, document, $, _, routie, undefined) {
	'use strict';

	var routes = {

		'about-me' : function() {
			DH.libraries.nav.navigate('about-me');
		},

		'my-works' : function() {
			DH.libraries.nav.navigate('my-works');

		},

		'photos' : function() {
			DH.libraries.nav.navigate('photos');
		}

	};

	routie(routes);
	
})(this, this.document, this.jQuery, this._, this.routie);