(function (window, document, $, _, undefined) {
	'use strict';
	
	var DH = window.namespace('DH');

	DH.events = {

		/**
		 * Get the current device which iw viewing the page
		 * @return {string} device name
		 */
		getDevice : function(){
			var device = '';
			DH.isDevice('mobile', function () {
				device = 'mobile';
			});
			DH.isDevice('tablet', function () {
				device = 'tablet';
			});
			DH.isDevice('desktop', function () {
				device = 'desktop';
			});
			return device;
		},

		/**
		 * Function that is runned every time user resize the window or switch viewing mode (landscape, portrait)
		 * If the device is changed all events are unbinded, and the new ones for his device is binded
		 * @return {void}
		 */
		windowResized : function() {
			DH.events.calculateDimensions();
			if (DH.settings.environment.device !== DH.events.getDevice()) {
				DH.log('device changed, rebinding all');
				$('*').unbind('.dh');				//unbind everything
				$(document).unbind('.dh');	//unbind everything
				DH.init();									//init all again
			}
		},

		/**
		 * Calculate dimensions for the application
		 * @return {void}
		 */
		calculateDimensions : function(){
			DH.settings.pageWidth = $('body').outerWidth();
		},

		/**
		 * Load the images in works section
		 * @return {object}
		 */
		lazyLoad : (function(){
			var loaded = {
				works : false,
				photos : false
			};

			return {
				works : function(){
					if(!loaded.works){
						DH.log('Works images lazy loaded.');
						$('#my-works-wrap').lazyLoad();
						loaded.works = true;
					}
				},
				photos : function(){
					if(!loaded.photos){
						DH.log('Photos lazy loaded.');
						$('#photos-list').lazyLoad();
						loaded.photos = true;
					}
				}
			};
		})()

		/**
		 * Big photos views
		 */
		/*
		lightbox : (function(){

			return {
				mobile : function(){

				},

				desktop : function(){
					$('#photos-wrap').on('click.dh', '#photos-list li', function(event){
						var $this = $(this),
								src = $this.find('a').attr('href'),
								$modal = $('#carousel');

						var $img = $('<img/>').attr('src', src)
												.load(function(){
													$('body').addClass('modal');
												});
						$modal.html($img);
						event.preventDefault();
					});
				}

			};
		})()
		*/

	};

})(this, this.document, this.jQuery, this._);