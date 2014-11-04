// app/models/status.js
// mongoose module
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var statusSchema = new Schema({
	date: { type: Date, default: Date.now },
	text: { type: String, default: ''},
	tags: { type: Array, default: []}
})

// define status model
// module.exports allows passing to other files

var Status = mongoose.model('Status', statusSchema);
module.exports = Status;