// app/routes.js

var natural = require('natural');
var WPOS 	= require('wordpos');
var _		= require('underscore');

// status model
var Status = require('./models/status');


module.exports = function(app) {
	var wpos = new WPOS({stopwords: true});
	var tokenizer = new natural.WordTokenizer();
	// utility functions ============================================================

	var getTags = function(msg, cb){
		tags = [];
		var a = tokenizer.tokenize(msg);

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
					var m = _.max(words, function(noun){
						return noun.count;
					}).tag;

					if(!_.contains(tags, m)){
						tags.push(m);
						console.log("push!");
					}
				}
			});
			console.log(tags+" The tags!");
			return cb(tags); //array of tokenized tags
		});
		
	}

	// server routes ================================================================
	// this is the middleware, where we can validate requests, throw errors, log stuff
	// besides of course routing requests to the appropriate data/functions
	// handle api calls

	/*app.use(function(req, res, next) {
		console.log('something is happening');
		next(); //proceed to next applicable route
	});*/

	app.get('/api/statuses', function(req, res) {
		//use mongoose to get all statuses in db
		Status.find(function(err, statuses){
			if(err){
				res.send(err);
			}
			res.json(statuses);
		});
	});

	//create status
	app.post('/api/status', function(req, res) {
		console.log("POST api/status");
		// TO DO: run alchemy API to extract tags array from req.text
		// pass the tfidf maintained in server.js as a variable.
		// insert new documents here, use it to determine importance of words

		var tags = getTags(req.body.text, function(tags){
			console.log(tags);
			var newStatus = new Status({
				date: Date.now(),
				text: req.body.text,
				tags: tags
			});
			newStatus.save(function(err, newstatus){
				if (err) {
					res.send(err);
				}
				res.json(newstatus);
			});
		});

		
	});

	// frontend routes ==============================================================
	// route to handle angular requests
	// all requests that do not match the above will be referred to the angular
	// frontend for processing/routing
	app.get('*', function(req, res){
		res.sendfile('./public/views/index.html');
	});
}