/**
 * Main front end model
 * @param  {object} app     app object
 * @param  {object} helpers helpers object
 * @return {void}
 */
module.exports = function(app, helpers){

	var model = {
		data : ['first', 'second', 'third'],
		edit : function(id, data){},
		new  : function(data){},
		delete : function(id){}
	}

	var nosql = require('nosql').load(process.cwd() + '/db/photos.nosql');

	var callback = function(selected) {

	    var users = [];
	    selected.forEach(function(o) {
	        users.push(o.firstName + ' ' + o.lastName);
	    });

	    console.log('Users between 25 and 35 years old: ' + users.join(', '));
	};

	var filter = function(doc) {
	    return doc.age > 24 && doc.age < 36;
	};

	nosql.all(filter, callback);


	return model;
};