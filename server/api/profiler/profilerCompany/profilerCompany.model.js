'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var CompanyProfilerSchema = new Schema({

	name: String,
	people: String,
	nip: Number,

});

module.exports = mongoose.model('ProfilerCompany', CompanyProfilerSchema);