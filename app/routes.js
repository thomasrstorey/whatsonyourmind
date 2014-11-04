// app/routes.js

// status model
var Status = require('./models/status');

module.exports = function(app) {
	// server routes ================================================================
	// handle api calls

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
	app.post('api/status', function(req, res) {
		//run alchemy API to extract tags array from req.text
		var tags = [];
		var newStatus = new Status({
			date: Date.now,
			text: req.text,
			tags: tags
		});
		newStatus.save(function(err, newstatus){
			if (err) {
				return console.error(err);
			}
			res.json(newstatus);
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