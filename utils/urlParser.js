var cheerio = require('cheerio');
var URL = require('url');
var querystring = require('querystring');
var URLParser = function(){

}

URLParser.prototype.constructor = URLParser;
URLParser.prototype = {
	getMetaInfo : function(body){
		var $ = cheerio.load(body);
		//return getMeta(body);
		return result = $('meta[property="og:image"]').attr('content');
	},
	parse : function(url){
		var parsedObject = URL.parse(url);
		var query = parsedObject.query;
		var data = querystring.parse(query); 
		return data.markers;
	}
}

module.exports = URLParser;