var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/', function(req, res, next) {
    if (req.body.mdp === "2BDindes") {
        res.json({auth: true});
    } else {
        res.json({auth: false});
    }
});

module.exports = router;