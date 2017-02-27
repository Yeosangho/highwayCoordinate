var requestPromise = require('request-promise');
var cheerio = require('cheerio');
var fs = require('fs');
var RequestModule = function(){

	requestModule = this;
}

RequestModule.prototype.constructor = RequestModule;

RequestModule.prototype = {
	sendTestGet : function(){
		requestPromise('http://www.google.com')
   		 	.then(function (htmlString) {
        	// Process html... 
        	  console.log(htmlString);
        	  return htmlString;
    		})
    		.catch(function (err) {
        	// Crawling failed... 
    		});
	},
	sendGet : function(url){
		var option = {
			uri : url,
			method : 'GET',
 			headers: {
 			  "cache-control": "no-cache",
 			  'User-Agent' : 'Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; rv:11.0) like Gecko'
 			}
		};
		return requestPromise(option)
   		 	.then(function(result) {
    		 	return result;
    		})
    		.catch(function (err) {
        	// Crawling failed... 
    		});		
	}

}

module.exports = RequestModule;
