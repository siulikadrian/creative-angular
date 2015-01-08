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

/*Profiler UserListInfo*/

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
      user: [profiler.user],
      interpetation: []

    }).save(function(err, profiler) {

      if(err) { return handleError(res, err); }
      return res.json(201, profiler);

    });
};

exports.updateInterpretation = function(req, res) {

  Profiler.findById(req.params.id, function(err, user){

    var interpetation = req.body.interpetation;
    user.interpretation = [];
    user.interpretation.push(interpetation);  

    user.save(function(err){

      if(err) return handleError(res, err);
      res.send(200, user);
    })
  });
};

exports.updateIsInterpreted = function(req, res) {

  Profiler.findById(req.params.id, function(err, user){

    var us = JSON.parse(JSON.stringify(user));
    us.user[0].isInterpreted = true;
    user.user = [];
    console.log(us);
    user.user.push(us.user[0]);

    user.save(function(err, user1){
      if(err) return handleError(res, err);
      res.send(200, user1);
    })
  });
};

function handleError(res, err) {
  console.log('handleError');
  return res.send(500, err);
}