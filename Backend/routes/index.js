var express = require('express');
var router = express.Router();

var monk = require('monk');
var db = monk('localhost:27017/Paraiso');

router.get('/', function(req, res) {
	res.redirect('/properties')
});

module.exports = router;
