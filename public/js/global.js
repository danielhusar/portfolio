(function (window, document, undefined) {
	/**
   * Global namespace
   *
   * @namespace: DH
   */
  function DanielHusar() {};
  window.DH = new DanielHusar();
	
	_.mixin(_.str.exports());
	
	/**
   * Defining named conditions to be used by DH.when, DH.whenSome and DH.whenAll
   *
   * @namespace DH
   */
  DH.device = {
    'desktop'  : function () { return DH.device.ie() || Modernizr.mq('only screen and (min-width: 1025px)'); },
    'tablet'   : function () { return (! DH.device.desktop()) && Modernizr.mq('only screen and (min-width: 569px)'); },
    'mobile'   : function () { return ! (DH.device.tablet() || DH.device.desktop()); },
    'ieMobile' : function () { return (/IEMobile/i).test(window.navigator.userAgent); },
    'ie'       : function () { return !! ($.browser.msie && ! DH.device.ieMobile()); }
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
   *   DH.isDevice('mobile', callback);                      // => V will run the callback  (just for the mobile)
	 *   DH.isDevice('desktop', callback);                     // => V will run the callback  (just for the desktop)
	 *   DH.isDevice('mobile,desktop', callback);              // => V will run the callback  (for the mobile and desktop)
   *
   *
   * @param     {Anything}  conditions  If conditions is a string, named conditions would be used, otherwise, value would be casted to bool (described above)
   * @param     {Function}  callback    Callback to be triggered when conditions return true
   * @return    {Object}                DH Object 
   */
  DH.isDevice = function (conditions, callback) {
		conditions = conditions.split(','); // create an array of device

		var result     = _.some(conditions, function (condition) {
			return !! (_.result(DH.device, condition) || false);
		});

    if (result) {
      callback();
    }

    return DH;
  }
	

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