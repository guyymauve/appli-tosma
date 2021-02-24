var express = require('express');
var router = express.Router();

//Authentification, pas encore secure du tout
router.post('/', function(req, res, next) {
    if (req.body.mdp === "2BDindes") {
        res.json({auth: true});
    } else {
        res.json({auth: false});
    }
});

module.exports = router;