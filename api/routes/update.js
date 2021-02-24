var express = require('express');
var async = require('async');
var router = express.Router();
var Matos = require('../models/matos');
var Categorie = require('../models/categorie');

/* GET home page. */
router.post('/', function(req, res, next) {
    Matos
    .findByIdAndUpdate(req.body._id, req.body, function(err, resultat) {
        res.send("Oui");
    });
});

router.post('/new', function(req, res, next) {
    Categorie
    .findOne({acronyme: req.body.cat})
    .exec(function(err, cat) {
        if (cat) {
            Matos
            .countDocuments({categorie: cat})
            .exec(function (err, id) {
                let mat = new Matos({nom: req.body.nom, categorie: cat, id: id+1, dispo: true, emprunt: "DISPO"});
                mat.save()
                .then(() => res.send("Oui"));
            });
        } else {
            console.log("Impossible de trouver la catégorie demandée");
            res.send("Non");
        }
    });
});

router.post('/change', function(req, res, next) {
    try {
        async.waterfall([
            function(callback) {
                Categorie.findOne({acronyme: req.body.cat})
                .exec(callback);
            },
            function(cat, callback) {
                Matos.findOneAndUpdate({categorie: cat, id: req.body.num}, {nom: req.body.nom})
                .exec(callback);
            }
        ], function(err, mat) {
            if (err) {
                console.log(err);
                res.send("Non");
            } else {
                res.send("Oui");
            }
        });
    } catch(error) {
        console.error(error);
        res.send("Non");
    }
});

router.post('/suppr', function(req, res, next) {
    console.log(req.body);
    async.waterfall([
        function(callback) {
            Categorie.findOne({acronyme: req.body.cat})
            .exec(callback);
        }, function(cat, callback) {
            Matos.findOneAndRemove({id: req.body.num, categorie: cat})
            .exec(callback);
        }, function(mat, callback) {
            Matos.updateMany({
                categorie: mat.categorie,
                id: {$gt: mat.id}
            }, {$inc: {id: -1}})
            .exec(callback)
        }
    ], function(err, results) {
        if (err) {
            console.log(err);
            res.send("Non");
        } else {
            res.send("Oui");
        }
    });
});

module.exports = router;