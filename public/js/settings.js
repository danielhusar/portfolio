(function (window, document, $, _, undefined) {
	'use strict';

	DanielHusar.prototype.settings = {
		environment : {
			isProduction	: false,
			device				: 'mobile',	//device, can be: desktop, tablet, mobile. The version is set up on init, but mobile is default.
			nav						: ['about-me', 'my-works', 'photos']
		},
		pageWidth : 0
	};

})(this, this.document, this.jQuery, this._);