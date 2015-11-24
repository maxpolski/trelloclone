var BoardModel = require('../../models/board');

exports.addBoard = function(req, res, next) {

  if(req.custom.isLoggedIn) {
    if(req.body) {

      var data = req.body;
          data.user_id = req.custom.user_id;
          data.maxListOrder = 0;
      var board = new BoardModel(data);

      board.save(function(err, value, affected) {
        if(!err) {
          res.status(200).json(value);
        } else {
          next(err);
        }
      })

    }
  } else {
    res.redirect('/login');
  }
}

exports.editBoard = function(req, res, next) {
  if(req.custom.isLoggedIn) {
    if(req.body) {
      var id = req.body.id;
      var newName = req.body.name;
      BoardModel.update({_id: id}, {name: newName}, function(err) {
        if(!err) {
          res.set(200).send({_id: id, name: newName});
        } else {
          next(err);
        }
      });
    }
  } else {
    res.redirect('/login');
  }
}

exports.deleteBoard = function(req, res, next) {
  if(req.custom.isLoggedIn) {
    if(req.body) {
      var id = req.body.id;
      BoardModel.remove({_id: id}, function(err) {
        if(!err) {
          res.set(200).send({_id: id});
        } else {
          next(err);
        }
      });
    }
  } else {
    res.redirect('/login');
  }
}
