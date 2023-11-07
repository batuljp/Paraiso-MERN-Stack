var express = require('express');
const { default: mongoose } = require('mongoose');
var router = express.Router();

var monk = require('monk');
var db = monk('localhost:27017/Paraiso'); 
const { get, post } = require(".");
var collection = db.get('reservations');

// List reservations
router.get('/', function(req, res) {
	collection.find({}, function(err, reservations){
		if (err) throw err;
		res.json(reservations);
	});
});

// Show Reservation
// router.get('/:id', function(req, res) { 
//   collection.findOne({_id: req.params.id }, function(err, property){
//       if (err) throw err;
//       res.json(property); 
//   });
// });

// List User Reservations
// router.get('/:userid', function(req, res) { 
//   collection.find({'user_id': {$in: [mongoose.Types.ObjectId(req.params.userid)]} }, function(err, reservations){
//       if (err) throw err;
//       res.json(reservations); 
//   });
// });

router.get('/:id', function(req, res) { 
  collection.find({user_id: req.params.id }, function(err, property){
      if (err) throw err;
      res.json(property); 
  });
});

// router.get('/:id', function(req, res) { 
// 	collection.find({_id: req.params.id }, function(err, property){
// 			if (err) throw err;
// 			res.json(property); 
// 	});
// });

// Add Reservation
router.post('/addnewreservation', function(req, res) {
	//req.body is used to read form input
	collection.insert({ 
		property_id: req.body.property_id,
		user_id: req.body.user_id,
		reservation_date:req.body.reservation_date,
		checkIn_date: req.body.checkIn_date,
		checkOut_date: req.body.checkOut_date,
		email: req.body.email,
		title: req.body.title,
		type: req.body.type,
		// img: req.body.img
	}, function(err, reservation){
		if (err) throw err;
		// if insert is successfull, it will return newly inserted object
        res.json(reservation)
	});
});

// Delete Reservation
router.delete("/:id", function (req, res) {
    collection.remove({ _id: req.params.id }, function (err, result) {
      if (err) throw err;
      console.log("Deleted");
      res.json(result);
    });
});

module.exports = router;