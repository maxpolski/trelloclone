var _ = require('lodash');

var BoardModel = require('../../models/board');
var getHash    = require('../../lib/index').getHash;

exports.addTask = function(req, res, next) {
  if(req.custom.isLoggedIn) {
    if(req.body) {
      BoardModel.findOne({_id: req.body.boardId}, function(err, data) {
        if(!err) {
          var lists = data.lists;
          var item  = _.find(lists, function(list) {
            return list.id == req.body.listId;
          });
          var index = lists.indexOf(item);

          lists[index].tasks.push(
                                   {
                                     id: getHash(),
                                     name: req.body.name,
                                     order: lists[index].maxTaskOrder + 1
                                   }
                                 );

          lists[index].maxTaskOrder++;

          BoardModel.update({_id: req.body.boardId}, {lists: lists}, function(err, num) {
            if(!err) {

              BoardModel.findOne({_id: req.body.boardId}, function(err, value) {
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

exports.deleteTask = function(req, res, next) {
  if(req.custom.isLoggedIn) {
    if(req.body) {
      var boardId = req.body.boardId;
      var listId  = req.body.listId;
      var taskId  = req.body.taskId;

      BoardModel.findOne({_id: req.body.boardId}, function(err, data) {
        if(!err) {
          var lists = data.lists;
          var item  = _.find(lists, function(list) {
            return list.id == req.body.listId;
          });
          var index = lists.indexOf(item);

          var list = lists[index];

          var taskItem = _.find(list.tasks, function(task) {
            return task.id == taskId;
          });

          var taskIndex = list.tasks.indexOf(taskItem);

          lists[index].tasks.splice(taskIndex, 1);

          BoardModel.update({_id: req.body.boardId}, {lists: lists}, function(err, num) {
            if(!err) {

              BoardModel.findOne({_id: req.body.boardId}, function(err, value) {
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

exports.editTask = function(req, res, next) {
  if(req.custom.isLoggedIn) {
    if(req.body) {
      var boardId = req.body.boardId;
      var listId  = req.body.listId;
      var taskId  = req.body.taskId;
      var newTitle = req.body.newTitle;

      BoardModel.findOne({_id: req.body.boardId}, function(err, data) {
        if(!err) {
          var lists = data.lists;
          var item  = _.find(lists, function(list) {
            return list.id == req.body.listId;
          });
          var index = lists.indexOf(item);

          var list = lists[index];

          var taskItem = _.find(list.tasks, function(task) {
            return task.id == taskId;
          });

          var taskIndex = list.tasks.indexOf(taskItem);

          lists[index].tasks[taskIndex].name = newTitle;

          BoardModel.update({_id: req.body.boardId}, {lists: lists}, function(err, num) {
            if(!err) {

              BoardModel.findOne({_id: req.body.boardId}, function(err, value) {
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

exports.syncTasks = function(req, res, next) {
  if(req.custom.isLoggedIn) {
    if(req.body) {
      var boardId = req.body.boardId;
      var listsData  = req.body.lists;


      BoardModel.update({_id: req.body.boardId}, {lists: listsData}, function(err, num) {
        if(!err) {
          BoardModel.findOne({_id: req.body.boardId}, function(err, value) {
            if(!err) {
              res.status(200).json(value);
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

exports.addTaskDescription = function(req, res, next) {
  if(req.custom.isLoggedIn) {
    if(req.body) {
      var boardId = req.body.boardId;
      var listId = req.body.listId;
      var taskId  = req.body.taskId;
      var text = req.body.text;

      BoardModel.findOne({_id: boardId}, function(err, board) {
          if(!err) {
            var lists = board.lists;
            var list = _.find(lists, function(list) {
                return list.id === listId;
              }
            );

            var task = _.find(list.tasks, function(task) {
                return task.id === taskId;
              }
            );

            task.description = text;

            BoardModel.update({_id: boardId}, {lists: lists}, function(err, num) {
                if(!err) {
                  res.set(200).json(board);
                } else {
                  next(err);
                }
              }
            );

          } else {
            next(err);
          }
        }
      );

      console.log('body', req.body);
    }
  } else {
    res.redirect('/login');
  }
}
