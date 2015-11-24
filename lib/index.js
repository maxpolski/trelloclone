var crypto = require('crypto');

exports.getHash = function () {

  var uniqueId = '';

  for(var i = 0; i < 15; i++) {
    uniqueId += Math.random();
  }

  var hash = crypto.createHash('md5');
  hash.update(uniqueId);

  return hash.digest('hex');
}

exports.getHashOfString = function (string) {

  var hash = crypto.createHash('md5');
  hash.update(string);

  return hash.digest('hex');
}

exports.getSalt = function () {
  var randString = '';

  for(var i = 0; i < 15; i++) {
    var rand = Math.random() * 9;
    randString += Math.floor(rand);
  }
  return randString;
}
