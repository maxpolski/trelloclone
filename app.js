var express      = require('express');
var session      = require('express-session')
var bodyParser   = require('body-parser');
var cookieParser = require('cookie-parser');
var path         = require('path');

var routes = require('./routes');
var UserModel = require('./models/user');

var app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(session(
  {
    secret: 'secret',
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365)
  }
));

app.use(function(req, res, next) {
  req.custom = {};
  var cookies = req.cookies;

  if(cookies.login && cookies.hash) {
    var login = cookies.login;
    var hash  = cookies.hash;

    UserModel.findOne({login: login}, function(err, data) {
      if(!err) {
        if(data && data.passwordHash == hash) {
          req.custom.isLoggedIn = true;
          req.custom.user_id = data._id;
          req.custom.login = login;
        } else {
          req.custom.isLoggedIn = false;
        }
      } else {
        req.custom.isLoggedIn = false;
      }
      next();
    });
  } else {
    req.custom.isLoggedIn = false;
    next();
  }
});

app.use(bodyParser.urlencoded());

app.use(bodyParser.json());

app.get('/', routes.index);
app.get('/getinitialdata', routes.getInitialData);
app.post('/addboard', routes.addBoard);
app.post('/editboard', routes.editBoard);
app.post('/deleteboard', routes.deleteBoard);
app.post('/addlist', routes.addList);
app.post('/deletelist', routes.deleteList);
app.post('/editlist', routes.editList);
app.post('/synclists', routes.syncLists);
app.post('/addtask', routes.addTask);
app.post('/deletetask', routes.deleteTask);
app.post('/edittask', routes.editTask);
app.post('/synctasks', routes.syncTasks);
app.get('/login', routes.loginPage);
app.get('/registration', routes.registerPage);
app.post('/registration', routes.registerNewUser);
app.post('/login', routes.login);
app.get('/logout', routes.logOut);
app.post('/search', routes.search);

app.listen(8082, function() {
  console.log('listening on port 8082');
});
