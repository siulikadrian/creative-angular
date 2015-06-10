'use strict';

var express = require('express');
var controller = require('./profilerCompany.controller');

var router = express.Router();

//PROFILER USER API

router.get('/', controller.getAllCompany);
router.post('/', controller.createCompany);


module.exports = router;