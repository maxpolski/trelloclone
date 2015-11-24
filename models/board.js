var mongoose = require('../db.js');

mongoose.connection.on('error', console.error.bind(console, 'connection error: '));
mongoose.connection.once('open', function(cb) {

  console.log('connection to database has been opened');

});

var BoardSchema = mongoose.Schema({
  name: String,
  maxListOrder: Number,
  lists: Array,
  user_id: String,
  addingTime: {type: Date, default: Date.now}
});

var Board = mongoose.model('Board', BoardSchema);

module.exports = Board;
