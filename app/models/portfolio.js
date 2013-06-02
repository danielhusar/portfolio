/**
 * Main front end model
 * @param  {object} app     app object
 * @param  {object} helpers helpers object
 * @return {void}
 */
module.exports = function(app, helpers){

	var photos = require('nosql').load(process.cwd() + '/db/photos.nosql');

	return {
		getPhotos : function(start, limit, callback){
			start = start ? start: false;
			limit = limit ? limit: false;
			photos.all(function(selected){
				callback(selected);
			});
		},
		getAllPhotos : function(start, limit, callback){
			start = start ? start: false;
			limit = limit ? limit: false;
			photos.all(function(selected){
				callback(selected);
			});
		}
	}

};