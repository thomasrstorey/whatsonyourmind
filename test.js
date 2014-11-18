//get nouns, adjectives, verbs
//pick most used noun, adjective, verb. If there is no most frequent, pick the longest.
//if we want to be more rigorous, we could maintain an inverse document frequency database for 
//previously encountered words, and do a tf-idf analysis for each word
var natural = require('natural');
var WPOS 	= require('wordpos');
var _		= require('underscore');
var wpos = new WPOS({stopwords: true});
var str = "I very quickly stole a glance at her, while she was looking away";
var tokenizer = new natural.WordTokenizer();
var a = tokenizer.tokenize(str);

var adj="";
var verb="";

wpos.getPOS(a, function(results){
	results = _.omit(results, 'rest');
	_.each(results, function(result){
		if(result.length > 0){
			var words={};
			for (var i = result.length - 1; i >= 0; i--) {
				if(!words.hasOwnProperty(result[i])){
					words[result[i]] = {
						tag: result[i],
						count: 1
					}
				} else {
					words[result[i]].count += 1;
				}
				
			};
			console.log(_.max(words, function(noun){
				return noun.count;
			}).tag);
		}
	});
});

