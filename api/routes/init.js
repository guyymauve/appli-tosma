var express = require('express');
var router = express.Router();
var Matos = require('./models/matos');
var Categorie = require('./models/categorie');

/* GET home page. */
router.get('/', function(req, res, next) {
    Matos.find()
    .populate('categorie')
    .exec(function (err, matos) {
        Category.find()
        .exec(function (err, categories) {
            res.json({matos: matos, catgories: categories});
        });
    });
});

module.exports = init;