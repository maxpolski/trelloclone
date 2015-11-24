var fs = require('fs');
var getSalt = require('../../lib').getSalt;
var getHashOfString = require('../../lib').getHashOfString;
var UserModel = require('../../models/user');

exports.registerPage = function(req, res, next) {
  fs.readFile('public/views/registration.html', function(err, data) {
      if(!err) {
        res.set('Content-Type', 'text/html').status(200).send(data);
      } else {
        next(err);
      }
    }
  );
}

exports.registerNewUser = function(req, res, next) {
  if(req.body) {
    var login      = req.body.login;
    var password   = req.body.password;
    var rePassword = req.body.rePassword;

    if(login.length > 3 && password.length >= 6 && password == rePassword ) {
      UserModel.find({login: login}, function(err, data) {
        if(!err) {
          if(data.length == 0) {
            var salt = getSalt();
            var hash = getHashOfString(password + salt);

            var user = new UserModel({login: login, passwordHash: hash, salt: salt});
            user.save(function(err, value, affected) {
              if(!err) {
                res.redirect('/login');
              } else {
                next(err);
              }
            });
          } else {
            res.set(200).json({error: 'User already exist'});
          }
        } else {
          next(err);
        }
      })
    } else {
      res.set(200).json({error: 'Data is not correct'});
    }
  } else {
    res.redirect('/register');
  }
}
