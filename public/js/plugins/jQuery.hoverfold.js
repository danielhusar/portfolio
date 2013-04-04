( function( $ ) {
	
	$.fn.extend({
		hoverfold : function(type) {

			this.each( function() {
			

				$( this ).children( '.view' ).each( function() {
					var $item 	= $( this );
					if(type === 'init'){
						var	img		= $item.children( 'img' ).attr( 'src' ),
							  struct	= '<div class="slice s1">';
									struct	+='<div class="slice s2">';
										struct	+='<div class="slice s3">';
											struct	+='<div class="slice s4">';
												struct	+='<div class="slice s5">';
												struct	+='</div>';
											struct	+='</div>';
										struct	+='</div>';
									struct	+='</div>';
								struct	+='</div>';
							
						var $struct = $( struct );
						$item.find( 'img' ).addClass('hidden').end().append( $struct ).find( 'div.slice' ).css( 'background-image', 'url(' + img + ')' ).prepend( $( '<span class="overlay" ></span>' ) );
				  }else if(type === 'destroy'){
				  	$item.find('img').removeClass('hidden');
				  	$item.find('.slice').remove();
				  }
				});
				
			});

		}
	});

} )( jQuery );