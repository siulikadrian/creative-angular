/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /things              ->  index
 * POST    /things              ->  create
 * GET     /things/:id          ->  show
 * PUT     /things/:id          ->  update
 * DELETE  /things/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Profiler = require('./profiler.model');

// Get list of things
exports.index = function(req, res) {
  Profiler.find(function (err, profiler) {
    if(err) { return handleError(res, err); }
    return res.json(200, profiler);
  });
};

exports.show = function(req, res) {

  Profiler.findById(req.params.id, function (err, profiler) {
    if(err) { return handleError(res, err); }
    if(!profiler) { return res.send(404); }
    console.info('id', req.params.id, profiler);
    return res.json(profiler);
  });
};

exports.create = function(req, res) {

  var profiler = req.body;

  new Profiler(
    {
      startTime: profiler.startTime,
      endTime: profiler.endTime,
      result: [
        profiler.result
      ],
      user: [profiler.user]

    }).save(function(err, profiler) {
      if(err) { return handleError(res, err); }
      return res.json(201, profiler);
    });
};

function handleError(res, err) {
  return res.send(500, err);
}