// app/models/status.js
// mongoose module
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ngramSchema = new Schema({
	n: { type: Number, default: 1},
	key: { type: String, default: ""},
	chain: { type: Array, default: []}
})

//define NGram model

var NGram = mongoose.model('NGram', ngramSchema);
module.exports = NGram;