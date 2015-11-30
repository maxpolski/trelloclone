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
                                     order: lists[index].maxTaskOrder + 1,
                                     comments: [],
                                     checklists: [],
                                     description: ""
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
    }
  } else {
    res.redirect('/login');
  }
}

exports.addTaskComment = function(req, res, next) {
  if(req.custom.isLoggedIn) {
    if(req.body) {

      var boardId = req.body.boardId;
      var listId  = req.body.listId;
      var taskId  = req.body.taskId;
      var commentText = req.body.comment;
      var userId  = req.custom.user_id;

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

            var commentId = getHash();
            var comment = {id: commentId, userId: userId, text: commentText};

            task.comments.push(comment);

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
      )
    }
  } else {
    res.redirect('/login');
  }
}

exports.addChecklist = function(req, res, next) {
  if(req.custom.isLoggedIn) {
    if(req.body) {
      var boardId = req.body.boardId;
      var listId  = req.body.listId;
      var taskId  = req.body.cardId;
      var checklistName = req.body.checklistName;

      BoardModel.findOne({_id: boardId}, function(err, board) {
          if(!err) {

            var lists = board.lists;

            var list  = _.find(lists, function(list) {
                return list.id === listId;
              }
            );

            var task = _.find(list.tasks, function(task) {
                return task.id === taskId;
              }
            );

            var checklist = {
              id: getHash(),
              name: checklistName,
              tasks: []
            }

            task.checklists.push(checklist);

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
    }
  } else {
    res.redirect('/login');
  }
}

exports.deleteChecklist = function(req, res, next) {
  if(req.custom.isLoggedIn) {
    if(req.body) {

      var boardId = req.body.boardId;
      var listId = req.body.listId;
      var taskId = req.body.cardId;
      var checklistId = req.body.checklistId;

      BoardModel.findOne({_id: boardId}, function(err, board) {
          if(!err) {
            var lists = board.lists;

            var list  = _.find(lists, function(list) {
                return list.id === listId;
              }
            );

            var task = _.find(list.tasks, function(task) {
                return task.id === taskId;
              }
            );

            var checklistIndex = _.findIndex(task.checklists, function(checklist) {
                return checklist.id === checklistId;
              }
            );

            task.checklists.splice(checklistIndex, 1);

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
      )
    }
  } else {
    res.redirect('/login');
  }
}

exports.addChecklistItem = function(req, res, next) {
  if(req.custom.isLoggedIn) {
    if(req.body) {

      var boardId = req.body.boardId;
      var listId = req.body.listId;
      var taskId = req.body.cardId;
      var checklistId = req.body.checklistId;
      var itemName   = req.body.itemName;

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

            var checklist = _.find(task.checklists, function(checklist) {
                return checklist.id === checklistId;
              }
            );

            checklist.tasks.push(
              {
                id: getHash(),
                name: itemName,
                isCompleted: false
              }
            );

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
    }
  } else {
    res.redirect('/login');
  }
}

exports.toggleTaskStatus = function(req, res, next) {
  if(req.custom.isLoggedIn) {
    if(req.body) {

      var boardId = req.body.boardId;
      var listId = req.body.listId;
      var taskId = req.body.cardId;
      var checklistId = req.body.checklistId;
      var itemId = req.body.itemId;

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

            var checklist = _.find(task.checklists, function(checklist) {
                return checklist.id === checklistId;
              }
            );

            var itemIndex = _.findIndex(checklist.tasks, function(checklistTask) {
                return checklistTask.id === itemId;
              }
            );

            checklist.tasks[itemIndex].isCompleted = !checklist.tasks[itemIndex].isCompleted;

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
    }
  } else {
    res.redirect('/login');
  }
}
