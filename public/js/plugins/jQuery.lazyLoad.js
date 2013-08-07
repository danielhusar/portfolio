/**
 * Lazy load JQuery plugin
 * Author: Daniel Husar
 */
(function (window, document, $, undefined) {
	'use strict';


	$.fn.extend({
		lazyLoad: function (options) {

			var settings = $.extend( {
				'effect'       : 'show',
				'effect_speed' : '',
				'attr'         : 'data-image-src'
			}, options);

			
			return this.each(function() {
				$(this).find('img['+ settings.attr + ']').each(function () {
          var $img = $(this),
              src = $img.data('imageSrc');
          $img.hide()
          		.attr('src', src)
          		.removeAttr(settings.attr)
          		[settings.effect](settings.effect_speed);
      	});
			});


		}
	});

}(this, this.document, this.jQuery));