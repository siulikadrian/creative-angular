'use strict';

var express = require('express');
var controller = require('./profiler.controller');
var config = require('../../config/environment');
var auth = require('../../auth/auth.service');

var router = express.Router();

//PROFILER USER API

router.get('/', controller.index);
router.post('/',  controller.create);
router.get('/:id',  controller.show);
router.put('/:id', controller.updateInterpretation);
router.put('/:id/is-interpreted', controller.updateIsInterpreted);
/*
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);*/

module.exports = router;
