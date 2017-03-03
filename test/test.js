var assert = require("assert");
var fs = require('fs');
var Promise = require('bluebird');
var URLParser = require('../utils/urlParser');
var RequestModule = require("../request/requestModule");
var FileReader = require("../fileReader/fileReader");
function sleepFor( sleepDuration ){
    var now = new Date().getTime();
    while(new Date().getTime() < now + sleepDuration){ /* do nothing */ } 
}
describe.skip('get request', function(){
	this.timeout(5000);
	var requestModule;
	requestModule = new RequestModule();
	it.skip("send get", function(done){
		requestModule.sendGet('http://www.google.com');
		setTimeout(function(){
			done();
		}, 1000);
	});
	it("send get to google map", function(done){
		requestModule.sendGet('https://www.google.co.kr/maps/place/88JC').then(function(result){
			//console.log($);
			console.log(result);
		})
		setTimeout(function(){
			done();
		}, 2000);
	});

});

describe.skip('parse google map data', function(){
	this.timeout(3000);
	var requestModule;
	var urlParser;
	requestModule = new RequestModule();
	urlParser = new URLParser();
	it.skip("test", function(){
		assert.equal(true, true);
	});

	it("get coordinate", function(done){
		requestModule.sendGet('https://www.google.co.kr/maps/place/88JC').then(function(result){
			var info = urlParser.getMetaInfo(result);
			console.log(info);
			console.log(urlParser.parse(info));
		});
		setTimeout(function(){
			done();
		}, 2000);
	})
});

describe('file', function(){
	this.timeout(1000000000);
	var requestModule;
	var urlParser;
	var fileReader;
	requestModule = new RequestModule();
	urlParser = new URLParser();
	fileReader = new FileReader();

	it.skip('read each line in file', function(){
		var addresses;
		addresses = fileReader.readLine('./map_address.txt');
		for(var i=0; i< addresses.length; i++){
			console.log(addresses[i]);
		}
	});
	it('get each coordinate by reading file', function(done){
		var addresses;
		addresses = fileReader.readLine('./map_address.txt');
	
		var i=0;
		var j=0;
			setInterval(function(){
			var parameter = encodeURIComponent(addresses[i]);	
			console.log(addresses[i]);
			var url = 'https://www.google.co.kr/maps/place/'+parameter;
			requestModule.sendGet(url).then(function(result){
				var info = urlParser.getMetaInfo(result);
				console.log(urlParser.parse(info));
				if(urlParser.parse(info) == 'undefined'){
					j++;
				}
			});	
			i++;
			}, 3000);
		
		setTimeout(function(){
			console.log(j);
			done();
		}, 3000*(addresses.length+1));
	});
	it('save result as txt file', function(done){
		var addresses;
		addresses = fileReader.readLine('./map_address.txt');
		var writeStream = fs.createWriteStream('coordinate.txt', {
  			flags: 'a' // 'a' means appending (old data will be preserved)
		})
		var i=0;
		var j=0;
			setInterval(function(){
			var parameter = encodeURIComponent(addresses[i]);	
			console.log(addresses[i]);
			var url = 'https://www.google.co.kr/maps/place/'+parameter;
			requestModule.sendGet(url).then(function(result){
				var info = urlParser.getMetaInfo(result);
				console.log(urlParser.parse(info));
				if(urlParser.parse(info) == 'undefined'){
					j++;
				}
				writeStream.write(urlParser.parse(info)+'\n');
			});	
			i++;
			}, 1000);
		
		setTimeout(function(){
			writeStream.end();
			console.log(j);
			done();
		}, 1000*(addresses.length+1));
	});


	it('using promise-each', function(done){
		var addresses;
		addresses = fileReader.readLine('./map_address.txt');
		var writeStream = fs.createWriteStream('coordinate.txt', {
  			flags: 'a' // 'a' means appending (old data will be preserved)
		})
		var i=0;
		var j=0;
		var promiseArray = [];
		var sendGet = Promise.promisify(requestModule.sendGet);
		for(var i=0; i<addresses.length; i++){
			var parameter = encodeURIComponent(addresses[i]);
			var url = 'https://www.google.co.kr/maps/place/'+parameter;	
			console.log(addresses[i]);
			promiseArray.push(requestModule.sendGet(url));
		}

		console.log(promiseArray);
		Promise.each(promiseArray, function(result){
				var info = urlParser.getMetaInfo(result);
				console.log(urlParser.parse(info));
				writeStream.write(urlParser.parse(info)+'\n');
				sleepFor(1000); 
		});

		setTimeout(function(){
			writeStream.end();
			done();
		}, 3000*(addresses.length+1));
	});



});

