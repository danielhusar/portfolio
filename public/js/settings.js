(function (window, document, undefined) {
  'use strict';

  var self = DH.prototype;

  self.settings = {
    environment : {
      isProduction : false,
      device : 'mobile' // device, can be: desktop, tablet, mobile. The version is set up on init, but mobile is default.
    }
  };

})(this, this.document);