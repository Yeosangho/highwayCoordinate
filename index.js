var assert = require("assert");
var fs = require('fs');
var Promise = require('bluebird');
var URLParser = require('./utils/urlParser');
var RequestModule = require("./request/requestModule");
var FileReader = require("./fileReader/fileReader");

var requestModule;
var urlParser;
var fileReader;
requestModule = new RequestModule();
urlParser = new URLParser();
fileReader = new FileReader();
		var addresses;
		addresses = fileReader.readLine('./map_address.txt');
		var writeStream = fs.createWriteStream('coordinate.txt', {
  			flags: 'a' // 'a' means appending (old data will be preserved)
		});	
		var i=0;
		var j=0;
			setInterval(function(){
			var parameter = encodeURIComponent(addresses[i]);	
			console.log(addresses[i]);
			var url = 'https://www.google.co.kr/maps/place/'+parameter;
			requestModule.sendGet(url).then(function(result){
				var info = urlParser.getMetaInfo(result);
				console.log(urlParser.parse(info));
				writeStream.write(urlParser.parse(info)+'\n');
				if(urlParser.parse(info) == 'undefined'){
					j++;
				}
			});	
			i++;
			}, 3000);
		
		setTimeout(function(){
			writeStream.end();
			console.log(j);
			done();
		}, 3000*(addresses.length+1));