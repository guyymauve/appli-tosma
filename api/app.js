var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var async = require('async');

//Connection à la BDD MongoDB
var mongoose = require('mongoose');
var mongoDB = 'mongodb+srv://api_user:dcSc2UvMtUsGK43k@cluster0.r4oj6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

/* //Population de la BDD
var Categorie = require('./models/categorie');
var Matos = require('./models/matos');

var cameras = new Categorie({nom: "Caméras", acronyme: "CM"});
var objectifs = new Categorie({nom: "Objectifs", acronyme: "OB"});
var micros = new Categorie({nom: "Micros", acronyme: "MI"});
var regie = new Categorie({nom: "Régie", acronyme: "RE"});
var lights = new Categorie({nom: "Lights", acronyme: "LI"});

var eva = new Matos({nom: "EVA1", categorie: cameras, id: 1, dispo: false, emprunt: "DT"});
var tess = new Matos({nom: "Tess", categorie: cameras, id: 2, dispo: true, emprunt: ""});
var nxdp = new Matos({nom: "NXD+", categorie: cameras, id: 3, dispo: false, emprunt: "DT"});
var nxdm = new Matos({nom: "NXD-", categorie: cameras, id: 4, dispo: true, emprunt: ""});

var voigt0 = new Matos({nom: "Voigt 0", categorie: objectifs, id: 1, dispo: true, emprunt: ""});
var voigt1 = new Matos({nom: "Voigt 1", categorie: objectifs, id: 2, dispo: true, emprunt: ""});
var voigt2 = new Matos({nom: "Voigt 2", categorie: objectifs, id: 3, dispo: true, emprunt: ""});

var zoomh6 = new Matos({nom: "Zoom H6", categorie: micros, id: 1, dispo: true, emprunt: ""});
var zoomh5 = new Matos({nom: "Zoom H5", categorie: micros, id: 2, dispo: true, emprunt: ""});
var zoomh4n1 = new Matos({nom: "Zoom H4n 1", categorie: micros, id: 3, dispo: true, emprunt: ""});
var zoomh4n2 = new Matos({nom: "Zoom H4n 2", categorie: micros, id: 4, dispo: true, emprunt: ""});

var rea = new Matos({nom: "Nouvelle Rea", categorie: regie, id: 1, dispo: false, emprunt: "DT"});
var launchpad = new Matos({nom: "Launchpad", categorie: regie, id: 2, dispo: false, emprunt: "DT"});
var table_dmx = new Matos({nom: "Table DMX", categorie: regie, id: 3, dispo: false, emprunt: "DT"});

var l_cam_man = new Matos({nom: "Light Cam Manfrotto", categorie: lights, id: 1, dispo: true, emprunt: ""});
var l_cam_man2 = new Matos({nom: "Light Cam Manfrotto", categorie: lights, id: 2, dispo: true, emprunt: ""});
var p_l_cam_man = new Matos({nom: "Petite Light Cam Manfrotto", categorie: lights, id: 3, dispo: true, emprunt: ""});

liste_cat = [cameras, objectifs, regie, micros, lights]
liste_matos = [eva, tess, nxdp, nxdm, voigt0, voigt1, voigt2, zoomh6, zoomh5, zoomh4n1, zoomh4n2, rea, launchpad, table_dmx, l_cam_man, l_cam_man2, p_l_cam_man];
for (elt of liste_cat) {
  console.log(typeof(elt));
  elt.save(function(err) {
    if (err) return handleError(err);
  });
}
for (elt of liste_matos) {
  console.log(typeof(elt));
  elt.save(function(err) {
    if (err) return handleError(err);
  });
} */

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var initRouter = require('./routes/init');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/init', initRouter);

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
