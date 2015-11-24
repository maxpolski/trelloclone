var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/Trello');

module.exports = mongoose;
