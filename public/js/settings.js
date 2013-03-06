(function (window, document, $, _, undefined) {
	'use strict';

	var DH = window.namespace();

	DH.settings = {
		environment : {
			isProduction	: false,
			devices				: 'mobile',	//device, can be: desktop, tablet, mobile. The version is set up on init, but mobile is default.
			nav						: ['about-me', 'my-works', 'photos']
		}
	};

})(this, this.document, this.jQuery, this._);