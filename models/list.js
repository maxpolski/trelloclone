var mongoose = require('../db.js');

mongoose.connection.on('error', console.error.bind(console, 'connection error: '));
mongoose.connection.once('open', function(cb) {

  console.log('connection to database is opened');

});

var ListSchema = mongoose.Schema({
  name: String,
  tasks: Array,
  addingTime: {type: Date, default: Date.now}
});

var List = mongoose.model('List', ListSchema);

module.exports = List;
