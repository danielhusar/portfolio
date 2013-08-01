/**
 * Main front end model
 * @param  {object} app     app object
 * @param  {object} helpers helpers object
 * @return {void}
 */
module.exports = function(app, helpers){

	var nosql = require('nosql');
	var _ = require('underscore');
	var photos = nosql.load(process.cwd() + '/db/photos.nosql');

	return {

		getPhotos : function(callback, start, limit){
			start = start ? start : false;
			limit = limit ? limit : false;
			photos.all(function(data){
				var total = data.length;
                var totalData = data;
				if(start && limit){
					data = _.filter(data, function(item){ return(item.id >= (start * limit - limit + 1) && item.id <= (start * limit)); });
				}
				callback(data, total, totalData);
			});
		}
	};

};