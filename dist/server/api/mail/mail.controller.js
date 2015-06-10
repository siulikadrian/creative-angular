var _ = require('lodash');
var express = require('express');
var app = express();
var nodemailer = require('express-mailer');
var config = require('../../config/environment');

nodemailer.extend(app, {
  from: 'badanie@e-profiler.com.pl',
  host: 'e-profiler.com.pl', // hostname
  secureConnection: true, // use SSL
  port: 587, // port for secure SMTP
  transportMethod: 'SMTP', // default is SMTP. Accepts anything that nodemailer accepts
  auth: {
    user: 'badanie@e-profiler.com.pl',
    pass: 'OTC2010pro-filer#3000.Goog'
  }
});

app.set('views', config.root + '/server/views');
app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');

exports.mail = function(req, res, next) {

  var email = req.params.email;

  app.mailer.send('email', {
    to: email, // REQUIRED. This can be a comma delimited string just like a normal email to field.
    subject: 'Profiler dostępy', // REQUIRED.
    otherProperty: 'Other Property' // All additional properties are also passed to the template as local variables.
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
};
