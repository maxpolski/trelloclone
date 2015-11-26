var fs = require('fs');
var _  = require('lodash');

var BoardModel = require('../models/board');
var UserModel  = require('../models/user');

exports.index = function(req, res, next) {
  if(req.custom.isLoggedIn) {
    fs.readFile('public/views/index.html', function(err, data) {
      if(!err) {

        res.set('Content-Type', 'text/html');
        res.status(200).send(data);
      }
      next(err);
    });
  } else {
    res.redirect('/login');
  }
}

exports.getInitialData = function(req, res, next) {
  if(req.custom.isLoggedIn) {
    var boards = [];
    var user = {};
    BoardModel.find({user_id: req.custom.user_id}, function(err, data) {
      if(!err) {
        UserModel.findOne({_id: req.custom.user_id}, function(err, value) {
          if(!err) {
            var responseData = {};
            user = value;
            responseData.data = data;
            responseData.user = {
                                  _id: user.id,
                                  login: user.login,
                                  firstName: user.firstName,
                                  lastName: user.lastName
                                };
            res.status(200).json(responseData);
          } else {
            next(err);
          }
        });
      } else {
        next(err);
      }
    });
  } else {
    res.redirect('/login');
  }
}

exports.loginPage = require('./login/index').loginPage;
exports.registerPage = require('./registration/index').registerPage;
exports.registerNewUser = require('./registration/index').registerNewUser;
exports.login = require('./login/index').login;
exports.logOut = require('./login/index').logOut;
exports.addBoard = require('./boards/index').addBoard;
exports.editBoard = require('./boards/index').editBoard;
exports.deleteBoard = require('./boards/index').deleteBoard;
exports.addList = require('./lists/index').addList;
exports.deleteList = require('./lists/index').deleteList;
exports.editList = require('./lists/index').editList;
exports.syncLists = require('./lists/index').syncLists;
exports.addTask = require('./tasks/index').addTask;
exports.deleteTask = require('./tasks/index').deleteTask;
exports.editTask = require('./tasks/index').editTask;
exports.syncTasks = require('./tasks/index').syncTasks;
exports.search = require('./search/index').search;
exports.addTaskDescription = require('./tasks/index').addTaskDescription;
exports.addTaskComment = require('./tasks/index').addTaskComment;
exports.addChecklist = require('./tasks/index').addChecklist;
