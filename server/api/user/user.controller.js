'use strict';

var User = require('./user.model');
var passport = require('passport');
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');
var generatePassword = require('password-generator');

var express = require('express');
var app = express();
var nodemailer = require('express-mailer');

nodemailer.extend(app, {
  from: 'adriansiulik@gmail.com',
  host: 'smtp.gmail.com', // hostname
  secureConnection: true, // use SSL
  port: 465, // port for secure SMTP
  transportMethod: 'SMTP', // default is SMTP. Accepts anything that nodemailer accepts
  auth: {
    user: 'adriansiulik@gmail.com',
    pass: '52160055'
  }
});

app.set('views', config.root + '/server/views');
app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');

var validationError = function(res, err) {
  return res.json(422, err);
};

/**
 * Get list of users
 * restriction: 'admin'
 */
exports.index = function(req, res) {
  User.find({}, '-salt -hashedPassword', function (err, users) {
    if(err) return res.send(500, err);
    res.json(200, users);
  });
};

/**
 * Creates a new user
 */
exports.create = function (req, res, next) {
  var newUser = new User(req.body);
  newUser.provider = 'local';
  newUser.role = 'user';
  newUser.password = generatePassword(12, false);
  console.log('user password', newUser.password);
  newUser.save(function(err, user) {
    if (err) return validationError(res, err);
    /*var token = jwt.sign({_id: user._id }, config.secrets.session, { expiresInMinutes: 60*5 });
    res.json({ token: token });*/

    app.mailer.send('email', {
      to: newUser.email, // REQUIRED. This can be a comma delimited string just like a normal email to field.
      subject: 'DOSTĘP PROFILER', // REQUIRED.
      otherProperty: {
        password: newUser.password
      } // All additional properties are also passed to the template as local variables.
    }, function (err, message) {
      if (err) {
        // handle error
        console.log(err);
        res.send('There was an error sending the email', err);
        return;
      }
      console.log('email send success');
      res.send(message);
    });
  });
};

/**
 * Get a single user
 */
exports.show = function (req, res, next) {
  var userId = req.params.id;

  User.findById(userId, function (err, user) {
    if (err) return next(err);
    if (!user) return res.send(401);
    res.json(user.profile);
  });
};

/**
 * Deletes a user
 * restriction: 'admin'
 */
exports.destroy = function(req, res) {
  User.findByIdAndRemove(req.params.id, function(err, user) {
    if(err) return res.send(500, err);
    return res.send(204);
  });
};

/**
 * Change a users password
 */
exports.changePassword = function(req, res, next) {
  var userId = req.user._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  User.findById(userId, function (err, user) {
    if(user.authenticate(oldPass)) {
      user.password = newPass;
      user.save(function(err) {
        if (err) return validationError(res, err);
        res.send(200);
      });
    } else {
      res.send(403);
    }
  });
};

exports.changeAnswerStatus = function(req, res, next) {

  console.log('req body', req);

  var userId = req.user._id;

  User.findById(userId, function(err, user){
    console.log('user', user);
    user.isAnswerd = true;
    user.save(function(err){
      if(err) return validationError(res,err);
      res.send(200);
    })
  });

};

/**
 * Get my info
 */
exports.me = function(req, res, next) {
  var userId = req.user._id;
  User.findOne({
    _id: userId
  }, '-salt -hashedPassword', function(err, user) { // don't ever give out the password or salt
    if (err) return next(err);
    if (!user) return res.json(401);
    res.json(user);
  });
};

/**
 * Authentication callback
 */
exports.authCallback = function(req, res, next) {
  res.redirect('/');
};
