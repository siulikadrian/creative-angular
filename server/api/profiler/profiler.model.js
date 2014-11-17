'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var ProfilerSchema = new Schema({
  
	startTime: {type: Date, default: Date.now},
	endTime: {type: Date, default: Date.now},
	result: [],
	user: []

});

module.exports = mongoose.model('Profiler', ProfilerSchema);
