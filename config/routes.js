/**
	*  ALL THE STATIC ROUTES WITH ANONYMOUS FUNCTIONS
	*  THIS ROUTES HERE OVERRIDES THE ROUTES DEFINED IN CONTROLLERS
**/
module.exports = function(app){

	var helpers = require('../app/helpers/helpers');
	/**

  EXAMPLE RULE:

		app.get('/test', function(req, res){
			helpers.template(res, 'index.html');
		});

		app.get('/404', function(req, res){
		  res.redirect('/');
		});

	**/

	//redirect all errors to homepage, this must be the last rule
	app.use(function(req,res){
		res.redirect('/');
	});


	return app;
};