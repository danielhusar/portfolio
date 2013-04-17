(function (window, document, $, _, Modernizr, undefined) {
	'use strict';
	
	var DH  = window.namespace('DH');

	window.namespace('DH.libraries').photos = (function(){

		var limit = 12,
				totalPhotos = Number($('#photos-wrap .total').val()),
				totalPages = Math.ceil(totalPhotos/limit),
				$wrap = $('#photos-wrap article ul');


		function loadPohotos(page){
			return $.ajax({
				url : '/ajax/photos/' + page
			});
		}

		function updatePagination(currentPage){
			var prevPage = ((currentPage - 1) > 1) ? (currentPage - 1) : 1,
					nextPage = ((currentPage + 1) < totalPages) ? (currentPage + 1) : totalPages;

			$('#photos-wrap [data-page]').removeClass('disabled');

			if(currentPage === prevPage){
				$('#photos-wrap [data-page].prev').addClass('disabled');
			}

			if(currentPage === totalPages){
				$('#photos-wrap [data-page].next').addClass('disabled');
			}

			$('#photos-wrap [data-page].prev').data('page', prevPage);
			$('#photos-wrap [data-page].next').data('page', nextPage);
		}


		return {

			all : function(){
				DH.log('desktop photos init');

				$('#photos-wrap [data-page]').on('click.dh', function(){

					var $that = $(this);

					if($that.hasClass('disabled')){
						return;
					}

					$('#photos-wrap [data-page]').addClass('disabled');
					var currentPage = $that.data('page');

					if(Modernizr.csstransforms && DH.settings.environment.device === 'desktop'){
						var anim1 = 'slideDown',
								anim2 = 'slideUp';

						if($that.hasClass('prev')){
							anim1 = 'slideUp';
							anim2 = 'slideDown';
						}	

						loadPohotos(currentPage).done(function(data){
							data = $.parseHTML(data) || data;
							$wrap.addClass(anim1);
							window.setTimeout(function(){
								$wrap.html('')
										 .removeClass(anim1)
										 .addClass(anim2)
										 .html(data);
								window.setTimeout(function(){
									$wrap.removeClass(anim2);
								}, 1);
								updatePagination(currentPage);
							}, 1000);
						}, 1000);	 
					}else{
						loadPohotos(currentPage).done(function(data){	
							data = $.parseHTML(data) || data;
							$wrap.fadeTo('slow', 0.5)
									 .html(data)
									 .fadeTo('slow', 1);
							updatePagination(currentPage);
						});
					}

				});

			}

		}


	})();

})(this, this.document, this.jQuery, this._, this.Modernizr);