(function (window, document, $, _, undefined) {
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
			console.log(currentPage);
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
			},

			mobile : function(){
				DH.log('mobile photos init');
			},

			desktop : function(){
				DH.log('desktop photos init');

				$('#photos-wrap [data-page]').on('click.dh', function(){
					var $that = $(this);

					if($that.hasClass('disabled')){
						return;
					}

					$('#photos-wrap [data-page]').addClass('disabled');
					var direction = $that.hasClass('next') ? 'next' : 'prev',
							currentPage = $that.data('page');

					loadPohotos(currentPage).done(function(data){
						data = $.parseHTML(data) || data;
						$wrap.addClass('slideDown');
						window.setTimeout(function(){
							$wrap.html('')
									 .removeClass('slideDown')
									 .addClass('slideUp')
									 .html(data);
							window.setTimeout(function(){
								$wrap.removeClass('slideUp');
							}, 1);
							updatePagination(currentPage);
						}, 1000);
					}, 1000);	 

				});

			}

		}


	})();

})(this, this.document, this.jQuery, this._);