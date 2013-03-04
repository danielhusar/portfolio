(function (window, document, undefined) {
  'use strict';

  var DH = namespace();

  DH.settings = {
    environment : {
      isProduction : false,
      device 			 : 'mobile', 	// device, can be: desktop, tablet, mobile. The version is set up on init, but mobile is default.
      nav    			 : ['about-me', 'my-works', 'photos']
    }
  };

})(this, this.document);