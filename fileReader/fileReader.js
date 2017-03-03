var fs = require('fs');

FileReader = function(){

}

FileReader.prototype.constructor = FileReader

FileReader.prototype = {
	readLine : function(fileName){
		return fs.readFileSync(fileName).toString().split('\n');
	}
}

module.exports =  FileReader;

