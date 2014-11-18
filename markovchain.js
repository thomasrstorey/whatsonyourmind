var natural = require("natural");
var _ 		= require("underscore");

var tokenizer = new natural.WordTokenizer();
var str = "What is it that can be done about it, this thing? What are we going to do? Is there anything that can be done?";
var tokens = tokenizer.tokenize(str);

var getNgrams = function(tokens, N){
	var ngrams = {};

	for(var i = N-1; i <= tokens.length; ++i){ //i starts at 1, 2 or 3
		//check N elements of tokens, see if there is a match in ngrams
		var key = "";
		for(var j = i - N; j != i; ++j){
			if(i == N-1){
				break;
			}
			key += tokens[j];
			if(j != (i-1)){
				key += " ";
			}
		}//now we have a key
		if(!ngrams.hasOwnProperty(key)){
			ngrams[key] = [];
			if(tokens[i]){
				ngrams[key].push(tokens[i]);
			} else {
				ngrams[key].push("");
			}
		} else {
			if(tokens[i]){
				ngrams[key].push(tokens[i]);
			} else {
				ngrams[key].push("");
			}
		}
	}

	return ngrams;
}

var buildMarkov = function(uni, bi, tri){

	var starter = uni[""][Math.floor(Math.random()*uni[""].length)];
	var str = starter + " ";
	var next = uni[starter][Math.floor(Math.random()*uni[starter].length)];
	while(next != "" && str.length < 144){
		str += next + " ";
		next =  uni[next][Math.floor(Math.random()*uni[next].length)];
	}
	return str;
}

var unigrams = getNgrams(tokens, 1);
var bigrams = getNgrams(tokens, 2);
var trigrams = getNgrams(tokens, 3);

//console.log(unigrams);
//console.log(bigrams);
//console.log(trigrams);

console.log(buildMarkov(unigrams, bigrams, trigrams));
