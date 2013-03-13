(function (window, document, $, _, undefined) {
	'use strict';

	var DH = window.namespace('DH');

	DH.settings = {
		environment : {
			isProduction	: false,
			devices				: 'mobile',	//device, can be: desktop, tablet, mobile. The version is set up on init, but mobile is default.
			nav						: ['about-me', 'my-works', 'photos']
		},
		pageWidth : 0
	};

})(this, this.document, this.jQuery, this._);