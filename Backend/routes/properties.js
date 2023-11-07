var express = require('express');
var router = express.Router();

var monk = require('monk');
var db = monk('localhost:27017/Paraiso'); 
const { get, post } = require(".");
var collection = db.get('properties');

// List Properties
router.get('/', function(req, res) {
	collection.find({}, function(err, properties){
		if (err) throw err;
		res.json(properties);
	});
});

// Show Property
router.get('/:id', function(req, res) { 
    collection.findOne({_id: req.params.id }, function(err, property){
        if (err) throw err;
        res.json(property); 
    });
});

// Add Property
router.post('/AddNew', function(req, res) {
	//req.body is used to read form input
	collection.insert({ 
		title: req.body.title,
		tagline: req.body.tagline,
		description:req.body.description,
		nightlyFee: req.body.nightlyFee,
		cleaningFee: req.body.cleaningFee,
		serviceFee: req.body.serviceFee,
		amentities: req.body.amentities,
		bedrooms: req.body.bedrooms,
		type: req.body.type,
		img: req.body.img,
		star: req.body.star,
		availableDate: req.body.availableDate,
		owner_id: req.body.owner_id,
		address:req.body.address,
    available: req.body.available
	}, function(err, property){
		if (err) throw err;
		// if insert is successfull, it will return newly inserted object
        res.json(property)
	});
});

// Update Property
router.patch("/:id", function (req, res) {
    collection.update(
      { _id: req.params.id },
      {
        $set: {
            title: req.body.title,
            tagline: req.body.tagline,
            description:req.body.description,
            nightlyFee: req.body.nightlyFee,
            cleaningFee: req.body.cleaningFee,
            serviceFee: req.body.serviceFee,
            amentities: req.body.amentities,
            bedrooms: req.body.bedrooms,
            type: req.body.type,
            img: req.body.img,
            star: req.body.star,
            availableDate: req.body.availableDate,
            owner_id: req.body.owner_id,
            address:req.body.address,
            available:req.body.available
        },
      },
      function (err, property) {
        if (err) throw err;
        res.json(property);
      }
    );
  });

// Delete Property
router.delete("/:id", function (req, res) {
    collection.remove({ _id: req.params.id }, function (err, result) {
      if (err) throw err;
      console.log("Deleted");
      res.json(result);
    });
});

module.exports = router;