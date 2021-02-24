var express = require('express');
var async = require('async');
var router = express.Router();
var Matos = require('../models/matos');
var Categorie = require('../models/categorie');

//Met à jour l'emprunt d'un matos
router.post('/', function(req, res, next) {
    Matos
    .findByIdAndUpdate(req.body._id, req.body, function(err, resultat) {
        res.send("Oui");
    });
});

//Crée un nouveau Matos
router.post('/new', function(req, res, next) {
    async.waterfall([
        function(callback) {
            //Recherche de la catégorie
            Categorie.findOne({acronyme: req.body.cat})
            .exec(callback);
        }, function(cat, callback) {
            //Calcul de l'id du nouveau matos
            Matos.countDocuments({categorie: cat})
            .exec(function (err, count) {
                if (err) {callback(err);}
                else {
                    callback(null, cat, count);
                }
            });
        }, function(cat, count, callback) {
            //Création du nouveau matos
            let mat = new Matos({nom: req.body.nom, categorie: cat, id: count+1, dispo: true, emprunt: "DISPO"});
            mat.save(callback);
        }], function(err, mat) {
            if (err) {next(err);}
            else {
                res.send("Oui");
            }
        }
    );
});

//Modifie un matos existant
router.post('/change', function(req, res, next) {
    async.waterfall([
        function(callback) {
            //Recherche de la catégorie
            Categorie.findOne({acronyme: req.body.cat})
            .exec(callback);
        },
        function(cat, callback) {
            //Mise à jour du matos
            Matos.findOneAndUpdate({categorie: cat, id: req.body.num}, {nom: req.body.nom})
            .exec(callback);
        }
    ], function(err, mat) {
        if (err) {next(err);} 
        else {
            res.send("Oui");
        }
    });
});

//Supprime un matos existant
router.post('/suppr', function(req, res, next) {
    async.waterfall([
        function(callback) {
            //Recherche de la catégorie
            Categorie.findOne({acronyme: req.body.cat})
            .exec(callback);
        }, function(cat, callback) {
            //Suppression du matos
            Matos.findOneAndRemove({id: req.body.num, categorie: cat})
            .exec(callback);
        }, function(mat, callback) {
            //Décrémentation de l'id des matos après celui qui a été supprimé
            Matos.updateMany({
                categorie: mat.categorie,
                id: {$gt: mat.id}
            }, {$inc: {id: -1}})
            .exec(callback)
        }
    ], function(err, results) {
        if (err) {next(err);}
        else {
            res.send("Oui");
        }
    });
});

module.exports = router;