(function (window, document, $, _, Modernizr, undefined) {
	'use strict';
	
	/**
	 * Global namespace
	 *
	 * @namespace: DH
	 */
	_.mixin(_.str.exports());

	var DanielHusar = window.DanielHusar = function() {};
	window.DH = new DanielHusar();

	var namespace = window.namespace = function (namespace) {
		var parent;
		var currentNamespacePart;
		var nestedNamespace;
		var namespacesCount;

		if (_.isString(namespace)) {

			parent          = window;
			namespace       = namespace.split('.');
			namespacesCount = namespace.length;

			// create nested namespaces
			for (var namespaceIndex = 0; namespaceIndex < namespacesCount; namespaceIndex++) {
				currentNamespacePart = namespace[namespaceIndex];
				nestedNamespace      = _.isObject(parent[currentNamespacePart]) ? parent[currentNamespacePart] : {}; // if nested namespace exists, don't overwrite it
				parent[currentNamespacePart] = parent = nestedNamespace; // assigning from right to left

			}

			return nestedNamespace;

		}

	};

	/**
	 * Defining named conditions to be used by DH.when, DH.whenSome and DH.whenAll
	 *
	 * @namespace DH
	 */
	DanielHusar.prototype.device = {
		'desktop'  : function () { return !Modernizr.mq('only all') || Modernizr.mq('only screen and (min-width: 1025px)'); },
		'tablet'   : function () { return (! DanielHusar.prototype.device.desktop()) && Modernizr.mq('only screen and (min-width: 569px)'); },
		'mobile'   : function () { return ! (DanielHusar.prototype.device.tablet() || DanielHusar.prototype.device.desktop()); }
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
	DanielHusar.prototype.isDevice = function (conditions, callback) {
		conditions = conditions.split(','); // create an array of device

		var result     = _.some(conditions, function (condition) {
			return !! (_.result(DanielHusar.prototype.device, condition) || false);
		});

		if (result) {
			callback();
		}

		return this;
	};
	

	/**
	 * Console log function, it logs only on development enviroment
	 * @return {void}
	 */
	DanielHusar.prototype.log = function () {
		var args;
		var currentDateAndTime;

		if (DanielHusar.prototype.settings && DanielHusar.prototype.settings.environment && ! DanielHusar.prototype.settings.environment.isProduction) {
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
	DanielHusar.prototype.prefix = function(method) {
		var transEndEventNames = {
				'WebkitTransition' : 'webkitTransitionEnd',
				'MozTransition'    : 'transitionend',
				'OTransition'      : 'otransitionend',
				'msTransition'     : 'MSTransitionEnd',
				'transition'       : 'transitionend'
			};
		if(method === 'transitionEnd'){
			return transEndEventNames[Modernizr.prefixed('transition')];
		}else {
			method = Modernizr.prefixed(method) ? Modernizr.prefixed(method) : method;
			return method.replace(/([A-Z])/g, function(str,m1){ return '-' + m1.toLowerCase(); }).replace(/^ms-/,'-ms-');
		}
		
	};

	/**
	 * Store or return hash inside window object
	 * @param  {string} hash to store
	 * @return {string} hash
	 */
	DanielHusar.prototype.hash = function(hash) {
		if(hash){
			window.location.hash = _.contains(hash, "#") ? hash : "#" + hash;
			return hash; 
		} else {
			return window.location.hash.replace('#', '') || false;
		}
	};


	/**
   * Apply formatting options to the string. This will look for occurrences
   * of %@ in your string and substitute them with the arguments you pass into
   * this method.  If you want to control the specific order of replacement,
   * you can add a number after the key as well to indicate which argument
   * you want to insert.
   *
   * Ordered insertions are most useful when building loc strings where values
   * you need to insert may appear in different orders.
   *
   *
   * Sample Usage:
   *
   *   LS.fmt('Hello %@ %@',    'John', 'Doe') // => 'Hello John Doe'
   *   LS.fmt('Hello %@2, %@1', 'John', 'Doe') // => 'Hello Doe, John'
   *
   *
   * @namespace LS
   *
   * @param  {String}     string  String to be formatted
   * @param  {String...}  *args   Strings to be passed into @string param
   * @return {String}             Formatted string
   */
  DanielHusar.prototype.fmt = function (string) {
    var formats;
    var index;

    // Words to fill the string should be all arguments but first
    formats = Array.prototype.slice.call(arguments, 1);

    // first, replace any ORDERED replacements.
    index  = 0; // the current index for non-numerical replacements

    return string.replace(/%@([0-9]+)?/g, function (match, argumentIndex) {
      argumentIndex = (argumentIndex) ? parseInt(argumentIndex, 10) - 1 : index++;
      match         = formats[argumentIndex];

      return ((match === null) ? '(null)' : (match === undefined) ? '' : match).toString();
    });
  };

	
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