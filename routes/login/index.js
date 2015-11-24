var fs = require('fs');

var getHashOfString = require('../../lib').getHashOfString;
var UserModel = require('../../models/user');

exports.loginPage = function(req, res, next) {
  if(req.custom.isLoggedIn) {
    res.redirect('/');
  } else {
    fs.readFile('public/views/login.html', function(err, data) {
        if(!err) {
          res.set('Content-Type', 'text/html');
          res.status(200).send(data);
        } else {
            next(err);
        }
      }
    )
  }
}

exports.login = function(req, res, next) {
  UserModel.findOne({login: req.body.login}, function(err, data) {
    if(!err) {
      if(data) {
        if(data.passwordHash == getHashOfString(req.body.password + data.salt)) {
          req.session.login = req.body.login;
          req.session.hash  = data.passwordHash;
          res.cookie('login', req.body.login, {maxAge: 1000 * 60 * 60 * 60 * 24 });
          res.cookie('hash', data.passwordHash, {maxAge: 1000 * 60 * 60 * 60 * 24 });
          res.redirect('/');
        } else {
          res.status(200).send('not auth');
        }
      } else {
        res.status(200).send('not auth');
      }

    } else {
      next(err);
    }
  });
}

exports.logOut = function(req, res, next) {
  res.clearCookie('login');
  res.clearCookie('hash');
  res.redirect('/');
}
