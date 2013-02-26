/**
 * author: Daniel Husar
 */

(function (window, document, $, undefined) {
	'use strict';

	var callbacksArray = new Array();

	$.extend({
		// main plugin function
		hashChange: function (callbacks) {

			//callback cane be passed directly or by helper function
			callbacks = (callbacks) ? callbacks : callbacksArray;

			//get hash
			var getHash = function(){
				return (window.location.hash.split("#")[1] || false);
			}

			//execute all callbacks
			var executeAll = function(hash){
				if(typeof callbacks === 'object'){
					$.each(callbacks, function(i, callback){
	    			callback(hash);
	    		});
	    	} else if (typeof callbacks === 'function'){
	    		callbacks(hash);
	    	}
			}

			//last hash
			var lastHash;
	    if(lastHash = getHash()){
	    	executeAll(lastHash);
	  	}

	    //checker
	    (function watchHash() {
	        var hash = getHash();

	        if (hash !== lastHash) {
	            executeAll(hash);
	            lastHash = hash;
	        }
	        var t = setTimeout(watchHash, 100);
	    })();

		},

		//add callbacks to the main arrays
		addHashCallback: function(callback) {
			callbacksArray.push(callback);
		}

	});

}(this, this.document, this.jQuery));