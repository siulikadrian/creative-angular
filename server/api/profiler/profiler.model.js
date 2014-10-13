'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.Types.ObjectId;

var UserProfileSchema = new Schema({

	achieve: String,
	actualWrokYear: Number,
	firstName: String,
	gender: String,
	job: String,
	jobArea: String,
	status: String,
	surnameName: String,
	wrokYear: Number,
	year: Number

});

var ProfilerSchema = new Schema({
  
	startTime: {type: Date, default: Date.now},
	endTime: {type: Date, default: Date.now},
	result: [],
	user: []

});

module.exports = mongoose.model('Profiler', ProfilerSchema);