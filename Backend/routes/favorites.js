var express = require('express');
const { default: mongoose } = require('mongoose');
var router = express.Router();

var monk = require('monk');
var db = monk('localhost:27017/Paraiso'); 
const { get, post } = require(".");
var collection = db.get('favorites');

// List favorites
router.get('/', function(req, res) {
	collection.find({}, function(err, favorites){
		if (err) throw err;
		res.json(favorites);
	});
});


router.get('/:id', function(req, res) { 
  collection.find({user_id: req.params.id }, function(err, property){
      if (err) throw err;
      res.json(property); 
  });
});

// Add Favorite
router.post('/addnewfavorite', function(req, res) {
	//req.body is used to read form input
	collection.insert({ 
		user_id: req.body.user_id,
    property_id: req.body.property_id,
    title: req.body.title,
    type: req.body.type,
    img: req.body.img,
    star: req.body.star,
    nightlyFee: req.body.nightlyFee,
    tagline: req.body.tagline
	}, function(err, favorite){
		if (err) throw err;
		// if insert is successfull, it will return newly inserted object
      res.json(favorite)
			console.log(res)
	});
});

// Remove Favorites
router.delete("/:id", function (req, res) {
    collection.remove({ _id: req.params.id }, function (err, result) {
      if (err) throw err;
      console.log("Removed from Favorites");
      res.json(result);
    });
});

module.exports = router;