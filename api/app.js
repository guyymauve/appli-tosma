var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var async = require('async');
var cors = require("cors");

//Connection à la BDD MongoDB
var mongoose = require('mongoose');
//Ici, le mot de passe est en clair car c'est une version de déceloppement sans données sensibles
var mongoDB = 'mongodb+srv://api_user:dcSc2UvMtUsGK43k@cluster0.r4oj6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//Import des fichiers de routage
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var initRouter = require('./routes/init');
var updateRouter = require('./routes/update');
var authRouter = require('./routes/auth');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

//Définition des routges
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/init', initRouter);
app.use('/update', updateRouter);
app.use('/auth', authRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
