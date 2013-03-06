(function (window, document, $, _, Modernizr, undefined) {
	'use strict';
	
	/**
	 * Global namespace
	 *
	 * @namespace: DH
	 */
	_.mixin(_.str.exports());

	var DanielHusar = window.DanielHusar = function(elem) {
		this.init();
	};

	//window.DH = new DanielHusar();

	var namespace = window.namespace = function(nested){

		if(nested){
			return DanielHusar.prototype[nested];
		}else{
			return DanielHusar.prototype;
		}
		
	};



	var DH = namespace();

	DH.libraries = {};
	DH.plugins = {};
	
	/**
	 * Defining named conditions to be used by DH.when, DH.whenSome and DH.whenAll
	 *
	 * @namespace DH
	 */
	DH.device = {
		'desktop'  : function () { return !Modernizr.mq('only all') || Modernizr.mq('only screen and (min-width: 1025px)'); },
		'tablet'   : function () { return (! DH.device.desktop()) && Modernizr.mq('only screen and (min-width: 569px)'); },
		'mobile'   : function () { return ! (DH.device.tablet() || DH.device.desktop()); }
	};
	
	/**
	 * Function that will execute callback only if one of devices passes
	 * Especially useful for executing some for mobile only, tablets only, IE only etc.
	 *
	 * Sample Usage:
	 *
	 *   // Set up a namespace
	 *   namespace('DH');
	 *
	 *   this.isDevice('mobile', callback);                      // => V will run the callback  (just for the mobile)
	 *   this.isDevice('desktop', callback);                     // => V will run the callback  (just for the desktop)
	 *   this.isDevice('mobile,desktop', callback);              // => V will run the callback  (for the mobile and desktop)
	 *
	 *
	 * @param     {Anything}  conditions  If conditions is a string, named conditions would be used, otherwise, value would be casted to bool (described above)
	 * @param     {Function}  callback    Callback to be triggered when conditions return true
	 * @return    {Object}                this
	 */
	DH.isDevice = function (conditions, callback) {
		conditions = conditions.split(','); // create an array of device

		var result     = _.some(conditions, function (condition) {
			return !! (_.result(DH.device, condition) || false);
		});

		if (result) {
			callback();
		}

		return this;
	};
	

	/**
	 * Console log function, it logs only on production enviroment
	 * @return {void}
	 */
	DH.log = function () {
		var args;
		var currentDateAndTime;

		if (DH.settings && DH.settings.environment && ! DH.settings.environment.isProduction) {
			if (window.console && window.console.log && window.console.log.apply) {
				args = Array.prototype.slice.call(arguments);
				window.console.log.apply(window.console, args);
			}
		}
	};

	/**
	 * Return the prefixed version of the css statment
	 * @param  {string} method css method
	 * @return {string} prefixed method if exist, or the same method of preixed not avaiable
	 */
	DH.prefix = function(method) {
		method = Modernizr.prefixed(method) ? Modernizr.prefixed(method) : method;
		return method.replace(/([A-Z])/g, function(str,m1){ return '-' + m1.toLowerCase(); }).replace(/^ms-/,'-ms-');
	};

	/**
	 * Store hash inside window object
	 * @param  {string} hash to store
	 * @return {string} hash
	 */
	DH.hash = function(hash) {
		window.location.hash = _.contains(hash, "#") ? hash : "#" + hash;
		return window.location.hash; 
	};


	DH.test = function() {}
	
	/*
	*
	* @namespace window
	* Avoid `console` errors in browsers that lack a console.
	*
	*/	
	(function() {
			var method;
			var noop = function () {};
			var methods = [
					'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
					'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
					'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
					'timeStamp', 'trace', 'warn'
			];
			var length = methods.length;
			var console = (window.console = window.console || {});

			while (length--) {
					method = methods[length];

					// Only stub undefined methods.
					if (!console[method]) {
							console[method] = noop;
					}
			}
	}());

})(this, this.document, this.jQuery, this._, this.Modernizr);