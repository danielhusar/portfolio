(function (window, document, $, undefined) {
	'use strict';

	$.fn.extend({
		namOn: function (method, callback) {
			return $(this).on(method + '.dh' , callback);
		},

		namBind: function(method, callback) {
			return $(this).bind(method + '.dh' , callback);
		}

	});

}(this, this.document, this.jQuery));