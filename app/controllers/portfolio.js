/**
	EXAMPLE OF ONE CONTROLLER, EVERY CONTROLLER MUST HAVE MODEL WITH SAME NAME INSIDE MODEL DIRECTORY
**/

/**
 * Main controller for the admin section
 * @param  {object} app     app object
 * @param  {object} model   model object that belong to the current controller
 * @param  {object} helpers helpers object
 * @return {void} 
 */
module.exports = function(app, model, helpers){


	/**
	 * Main homepage controller
	 */
	app.get('/', function(req, res){
		helpers.template(res, 'index.html', {photos: [1,2,3,4,5,6,7,8,9,10,11,12]});
	});

	/**
	 * Ajax loader for the photos
	 */
	app.get('/ajax/photos/:page', function(req, res){
		var page = req.params.page || 1;
		helpers.template(res, '_photos.html', {photos: [1,2,3,4,5,6,7,8,9,10,11,12]});
	});


	/**
	 * Tweets json feed
	 */
	app.get('/tweets', function(req, res){

		var twitter= require(process.cwd() + '/app/libraries/twitter/twitter.js').twitter;
		var config = require(process.cwd() + '/config/twitter.js')();

		twitter = new twitter(config.consumer_key, 
		               				config.consumer_secret, 
		               				config.access_token,
		               				config.access_token_secret,
		               				360
		               			 );
		
		twitter.on('get:statuses/user_timeline', function(error, data){
	  	res.writeHead(200, {'Content-Type': 'application/json'});
			res.write(data || '');
			res.end();
		}).get('statuses/user_timeline');


	});
	


};