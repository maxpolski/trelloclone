var _ = require('lodash');

var getHash    = require('../../lib/index').getHash;
var BoardModel = require('../../models/board');

exports.addList = function(req, res, next) {
  if(req.custom.isLoggedIn) {

    var id = req.body.id;

    // BoardModel.update({_id: id}, {lists})
    BoardModel.findOne({_id: id}, function(err, data) {
      if(!err) {

        var lists = data.lists;
        lists = lists ? lists : [];
        var hashValue = getHash();

        lists.push(
                    {
                      id: hashValue,
                      name: req.body.name,
                      addingTime: new Date(),
                      order: data.maxListOrder + 1,
                      maxTaskOrder: 0,
                      tasks: [],
                    }
                  );

        BoardModel.update({_id: id},
                          {
                            lists: lists,
                            maxListOrder: data.maxListOrder + 1
                          }, function(err, num) {
          if(!err) {

            BoardModel.findOne({_id: id}, function(err, value) {
              if(!err) {
                res.status(200).send(value);
              } else {
                next(err);
              }
            });

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

exports.deleteList = function(req, res, next) {

  if(req.custom.isLoggedIn) {
    if(req.body) {
      var boardId = req.body.boardId,
          listId  = req.body.listId;

      BoardModel.findOne({_id: boardId}, function(err, data) {
        if(!err) {
          var lists = data.lists;
              newLists = [];
          var item = _.find(lists, function(list) {
            return list.id ==listId;
          });

          var index = lists.indexOf(item);


          newLists = lists.splice(index, 1);

          BoardModel.update({_id: boardId}, {lists: lists}, function(err) {
            if(!err) {
              BoardModel.findOne({_id: boardId}, function(err, value) {
                if(!err) {
                  res.status(200).send(value);
                } else {
                  next(err);
                }
              });
            } else {
              next(err);
            }
          });
        } else {
          next(err);
        }
      });
    }
  } else {
    res.redirect('/login');
  }
}

exports.editList = function(req, res, next) {
  if(req.custom.isLoggedIn) {
    if(req.body) {
      var boardId  = req.body.boardId,
          listId   = req.body.listId,
          newTitle = req.body.newTitle;

      BoardModel.findOne({_id: boardId}, function(err, data) {
        if(!err) {
          var lists = data.lists;
              newLists = [];

          var item = _.find(lists, function(list) {
            return list.id ==listId;
          });

          var index = lists.indexOf(item);

          var editedList = lists[index];
              editedList.name = newTitle;

          newLists = lists;
          newLists[index] = editedList;

          BoardModel.update({_id: boardId}, {lists: lists}, function(err) {
            if(!err) {
              BoardModel.findOne({_id: boardId}, function(err, value) {
                if(!err) {
                  res.status(200).send(value);
                } else {
                  next(err);
                }
              });
            } else {
              next(err);
            }
          });
        } else {
          next(err);
        }
      });
    }
  } else {
    res.redirect('/login');
  }
}

exports.syncLists = function(req, res, next) {
  if(req.custom.isLoggedIn) {
    if(req.body) {
      var boardId  = req.body.boardId,
          lists    = req.body.lists;

      BoardModel.findOne({_id: boardId}, function(err, data) {
        if(!err) {
          BoardModel.update({_id: boardId}, {lists: lists}, function(err) {
            if(!err) {
              BoardModel.findOne({_id: boardId}, function(err, value) {
                if(!err) {
                  res.status(200).send(value);
                } else {
                  next(err);
                }
              });
            } else {
              next(err);
            }
          });
        } else {
          next(err);
        }
      });
    }
  } else {
    res.redirect('/login');
  }
}
