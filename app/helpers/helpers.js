/** ALL HELPERS GOES HERE **/

module.exports = {

	/*
	 * Generate template
	 * @param(res) res
	 * @param(template)
	 *
	 */
	template : function(res, template, variables){
		variables.enviroment = (process.env.NODE_ENV == 'production') ? process.env.NODE_ENV : 'development';
		res.render(template, variables);
	}

}