var mongoose = require('../db.js');

mongoose.connection.on('error', console.error.bind(console, 'connection error: '));
mongoose.connection.once('open', function(cb) {

  console.log('connection to database has been opened');

});

var UserSchema = mongoose.Schema({
  login: String,
  passwordHash: String,
  salt: String,
  firstName: String,
  lastName: String,
  addingTime: {type: Date, default: Date.now}
});

var User = mongoose.model('User', UserSchema);

module.exports = User;
