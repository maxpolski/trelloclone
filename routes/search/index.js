var BoardModel = require('../../models/board');

exports.search = function(req, res, next) {
  if(req.custom.isLoggedIn) {
    if(req.body) {

      var user_id = req.custom.user_id;
      var boards = [];
      var queryString = req.body.query;

      BoardModel.find({user_id: user_id}, function(err, values) {
          if(!err) {
            
            queryString = queryString.toLowerCase();
            var expr = new RegExp(queryString);

            values.map(function(board, inde) {
                if(expr.test(board.name.toLowerCase())) {
                  boards.push({name: board.name, _id: board._id});
                }
              }
            );
            res.set(200).json({results: boards});
          } else {
            next(err);
          }
        }
      )
    }
  } else {
    res.redirect('/register');
  }
}
