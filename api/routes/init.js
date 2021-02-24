var express = require('express');
var router = express.Router();
var Matos = require('../models/matos');
var Categorie = require('../models/categorie');

/* GET home page. */
router.get('/', function(req, res, next) {
    Matos.find()
    .populate('categorie')
    .sort('id')
    .exec(function (err, matos) {
        Categorie.find()
        .exec(function (err, categories) {
            res.json({matos: matos, categories: categories});
        });
    });
});

module.exports = router;