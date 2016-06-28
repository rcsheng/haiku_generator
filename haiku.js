var fs = require("fs");
var cmudictFile = readCmudictFile('./cmudict.txt');

function countSyllables(str)
{
	var arr = String(str).split(" ");
	var syllable;
	var cnt = 0;
	arr.forEach(function(syllable)
	{
		if(syllable.match(/\d/))	
			cnt++;
	});
	//console.log("pronounce: ",arr," cnt: ",cnt);
	return cnt;
	
}

function readCmudictFile(file){
  return fs.readFileSync(file).toString();
}

function formatData(data){    
   var lines = data.toString().split("\n");
   var lineSplit;
   var dictionary = [new Array(1)];
   //console.log(dictionary);
   var numSyl = 0;

   	lines.forEach(function(line)
   	{    
	    lineSplit = line.split("  ");    
	    //console.log("The word " + lineSplit[0] + " has this phoneme    layout: " + lineSplit[1]); 
	    numSyl = countSyllables(lineSplit[1]);
	    if (dictionary[numSyl] === undefined)
	    	dictionary[numSyl] = new Array();
	    dictionary[numSyl].push(lineSplit[0].toString());
	});   
	//console.log(dictionary[1]);
	return dictionary;
}

var dictionary = formatData(cmudictFile);



function createHaiku(structure){
  	var arrOfWords;
  	/*var haiku = '';
  	var numSyl = 0;
	for (var i = 0; i < structure.length; i++)
	{
		numSyl = structure[i];
		arrOfWords = dictionary[numSyl];
		haiku += arrOfWords[Math.floor(Math.random() * arrOfWords.length)];
		haiku += '\n';
	}*/
	//console.log(haiku);
	
	  
  return structure.map(function(lines){
    return lines.map(function(syls){
      	arrOfWords = dictionary[syls];
      	return arrOfWords[Math.floor(Math.random() * arrOfWords.length)];
    }).join(' ');
  }).join('\n');
}

module.exports = {
	  createHaiku: createHaiku,
};


