var assert = require("assert");
var fs = require('fs');
var Promise = require('promise');
var URLParser = require('../utils/urlParser');
var RequestModule = require("../request/requestModule");
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

describe('parse google map data', function(){
	this.timeout(5000);
	var requestModule;
	var urlParser;
	requestModule = new RequestModule();
	urlParser = new URLParser();
	it.skip("test", function(){
		assert.equal(true, true);
	});

	it("get meta info", function(done){
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