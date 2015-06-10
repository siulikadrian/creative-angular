var _ = require('lodash');
var ProfilerCompany = require('./profilerCompany.model');

exports.getAllCompany = function(req, res){
  ProfilerCompany.find(function (err, profiler) {
    if(err) { return handleError(res, err); }
    return res.json(200, profiler);
  });
};

exports.createCompany = function(req, res){
  var profilersCompany = req.body;

  new ProfilerCompany({
    name: profilersCompany.name,
    people: profilersCompany.contactPerson,
    nip: profilersCompany.nip
  }).save(function(err, profilersCompany){
    if(err){
      return handleError(res,req);
    }
    return res.json(201, profilersCompany);
  });
};

function handleError(res, err) {
  console.log('handleError');
  return res.send(500, err);
}