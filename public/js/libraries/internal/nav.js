(function (window, document, $, _, undefined) {
  'use strict';
  
  var DH  = window.namespace('DH');

  window.namespace('DH.libraries').nav = (function(){

    var nav = DH.settings.environment.nav;

    return {
      init : function(){
        $("#main").css(DH.prefix('transform'), '');

        $(document).on('keydown.dh.key', function(e){
          if (e.keyCode === 37 || e.keyCode === 39) { 
            $.each(nav, function(key, val){
              var navigateTo = ((e.keyCode === 37) ? nav[--key] : nav[++key]) || false;
              if($('#main').hasClass(val) && navigateTo){
                DH.hash(navigateTo);
                return false;
              }
            });
          }
        });

      },

      navigate : function(url){
        if(!url || !_.contains(nav, url)){
          return;
        }

        $('body').removeClass('modal');

        if (DH.settings.environment.device !== 'desktop') {
          $('nav:not(.active)').on('click.dh', function(event){
            $(this).addClass('active');
            event.preventDefault();
          });
          
          $('nav a').on('click.dh', function(event){
            if($(this).closest('nav').hasClass('active')){
              DH.hash($(this).attr('href'));
            }
          });
          $("#main").removeAttr('style');
        } else {
          var sectionWidth = $("section").outerWidth(),
              indent = (DH.settings.pageWidth < sectionWidth) ? (sectionWidth - DH.settings.pageWidth) / 2 : 0,
              index = nav.indexOf(url),
              position = -sectionWidth * index - indent;

          $("#main").css(DH.prefix('transform'), 'translate('+position+'px, 0) translate3d(0, 0, 0)');
        }

        $("#main").removeClass(nav.join(' '))
                  .addClass(url);
        $('nav').removeClass('active');

      }
    };

  })();

})(this, this.document, this.jQuery, this._);