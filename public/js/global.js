(function (window, document, undefined) {

	/**
   * Global namespace
   *
   * @namespace: DH
   */
  _.mixin(_.str.exports());

  window.DH = function() {
    this.init();
  };
  var self = DH.prototype;
	
	/**
   * Defining named conditions to be used by DH.when, DH.whenSome and DH.whenAll
   *
   * @namespace DH
   */
  self.device = {
    'desktop'  : function () { return self.device.ie() || Modernizr.mq('only screen and (min-width: 1025px)'); },
    'tablet'   : function () { return (! self.device.desktop()) && Modernizr.mq('only screen and (min-width: 569px)'); },
    'mobile'   : function () { return ! (self.device.tablet() || self.device.desktop()); },
    'ieMobile' : function () { return (/IEMobile/i).test(window.navigator.userAgent); },
    'ie'       : function () { return !! ($.browser.msie && ! self.ieMobile()); }
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
  self.isDevice = function (conditions, callback) {
		conditions = conditions.split(','); // create an array of device

		var result     = _.some(conditions, function (condition) {
			return !! (_.result(self.device, condition) || false);
		});

    if (result) {
      callback();
    }

    return this;
  }
	

  /**
   * Console log function, it logs only on production enviroment
   * @return {void}
   */
	self.log = function () {
    var args;
    var currentDateAndTime;

    if (self.settings && self.settings.environment && ! self.settings.environment.isProduction) {
      if (window.console && window.console.log && window.console.log.apply) {
        args = Array.prototype.slice.call(arguments);
        window.console.log.apply(window.console, args);
      }
    }
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


})(this, this.document);