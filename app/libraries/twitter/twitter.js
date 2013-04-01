var OAuth= require('oauth').OAuth,
    fs = require('fs');

/**
 * Main twitter function
 * @param  {string} consumer_key        consumer key from twitter api
 * @param  {string} consumer_secret     consumer secret key from twitter api
 * @param  {string} access_token        acces token from twitter api
 * @param  {string} access_token_secret acces token secret from twitter api
 * @param  {number} cache               (optional) time in seconds in which file should be cached (only for get requests), put false for no caching
 * @return {void}
 *
 * @sample usage:
 *
 * var twitter= require('twitter');
 * twitter = new twitter('xxx', 
 *		               		 'xxx', 
 *		               		 'xxx',
 *		               		 'xxx',
 *		               		  3600
 *	               			 );
 *
 * twitter.get('statuses/user_timeline',  
 *						 function(error, data) {
 *						   console.dir(data);
 *					   }
 *					  );
 *
 * twitter.post('statuses/update',
 *						  {'status' : 'testing message'},  
 *						  function(error, data) {
 *							  console.dir(data);
 *					    }
 *		         );			  
 *
 */
exports.twitter= function(consumer_key, consumer_secret, access_token, access_token_secret, cache) {
  this.consumer_key        = consumer_key;
  this.consumer_secret     = consumer_secret;
  this.access_token        = access_token;
  this.access_token_secret = access_token_secret;
  this.cache               = cache || false; 
  this.baseUrl             = 'https://api.twitter.com/1.1/';
  this.type                = 'json';
	this.oa                  = new OAuth('https://twitter.com/oauth/request_token',
											                 'https://twitter.com/oauth/access_token', 
											                 this.consumer_key, 
											                 this.consumer_secret, 
											                 '1.0A', 
											                 null, 
											                 'HMAC-SHA1'
											                );
};

/**
 * Get methods to the twitter api
 * @param  {method}   method   method from twitter api
 * @param  {Function} callback function to be called when we get data
 * @return {void}
 */
exports.twitter.prototype.get = function(method, callback) {
	
	var cacheName = method.replace(/\//g, '-'),
			that = this;

	if(this.cache){
		helpers.cacheDir();
		var fileUpdate = helpers.readCache(cacheName).mtime || false;
		var lastUpdate = fileUpdate ? (new Date().getTime() - new Date(fileUpdate).getTime()) / 1000 : false;
		if(lastUpdate && lastUpdate < this.cache){
			if(data = helpers.getCache(cacheName)){
				callback(false, data);
			}else{
				getData();
			}
		}else{
			getData();
		}
	}else{
		getData();
	}

	function getData(){
		try{
			that.oa.get(that.baseUrl + method +'.' + that.type, 
								  that.access_token, 
								  that.access_token_secret,
								  function(error, data) {
									  callback(error, data);
									  var jsonData = JSON.parse(data);
									  if(that.cache && !jsonData.errors){
									 	  helpers.storeCache(cacheName, data);
								 	  }
								 	}
								 ); 
		}catch(err){
			if(that.cache && (data = helpers.getCache(cacheName))){
				callback(false, data);
			} else {
				callback({error : 'An error occured'}, {error : 'Twitter is probably down.'});
			}
		}
	}
}

/**
 * Post methos to twitter api
 * @param  {string}   method   method from the twitter api
 * @param  {object}   data     data to post
 * @param  {Function} callback callback to be executed in post finished
 * @return {void}
 */
exports.twitter.prototype.post = function(method, data, callback) {
	this.oa.post(this.baseUrl + method +'.' + this.type, 
							 this.access_token, 
							 this.access_token_secret,
							 data,
							 'application/json',
							 function(error, data) {
								 callback(error, data);
								}
							);
}



/**
 * Helpers object
 */
var helpers = {

	/**
	 * Base path for caching
	 * @type {string}
	 */
	basePath : process.cwd() + '/cache/twitter/',

	/**
	 * Returns the fullfile path
	 * @param  {file} file - file name
	 * @return {string} full file path
	 */
	basePathFile : function(file){
		return (helpers.basePath + file + '.json');
	},

	/**
	 * Create directory for caching
	 * @return {void}
	 */
	cacheDir : function(){
		if(!fs.existsSync(helpers.basePath)){
			fs.mkdir(helpers.basePath);
		}
	},

	/**
	 * Get the cached file
	 * @param  {file} file - file name
	 * @return {object} file content or false if it doesnt exists
	 */
	getCache : function(file){
		var file = helpers.basePathFile(file);
		return fs.existsSync(file) ? fs.readFileSync(file, 'utf8' ) : false;
	},

	/**
	 * Read the file properties
	 * @param  {string} file - file name
	 * @return {object} file properties or false if it doesnt exists
	 */
	readCache : function(file){
		var file = helpers.basePathFile(file);
		return fs.existsSync(file) ? fs.statSync(file) : false;
	},

	/**
	 * Store data in file
	 * @param  {filenam} file - file name
	 * @param  {object} data to storeCache
	 * @return {void}
	 */
	storeCache : function(file, data){
		var file = helpers.basePathFile(file);
		fs.writeFileSync(file, data);
	}

}
