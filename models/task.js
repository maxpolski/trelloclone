var mongoose = require('../db.js');

mongoose.connection.on('error', console.error.bind(console, 'connection error: '));
mongoose.connection.once('open', function(cb) {

  console.log('connection to database is opened');

});

var TaskSchema = mongoose.Schema({
  title: String,
  completed: Boolean,
  addingTime: {type: Date, default: Date.now}
});

var Task = mongoose.model('Task', TaskSchema);

module.exports = Task;
