'use strict';

var express = require('express');
var controller = require('./mail.controller');

var router = express.Router();

router.get('/:email', controller.mail);

module.exports = router;
