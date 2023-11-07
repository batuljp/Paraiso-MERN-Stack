var express=require('express');
var router=express.Router();

var bcrypt = require('bcryptjs');
var monk = require('monk');
var db = monk('localhost:27017/Paraiso');
const Feedback = require('./feedbackModel')
var collection = db.get('feedbacks');
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/Paraiso')

db.on('error', console.error.bind(console, 'connection error:'))

// router.get('/', function(req, res) {
// collection.find({}, function(err, tutors){
// if (err) throw err;
//  res.json(tutors);
// });
// });



router.get('/:id',function(req,res){
	console.log(req.params.id)
    collection.find({propertyId:req.params.id},function(err,tutors){
        if (err) throw err;
        res.json(tutors);
    });
});








router.post('/addreview', async (req, res) => {
	console.log(req.body)
	   
       
        try{
		await Feedback.create({
			propertyId: req.body.propertyId,
			rating:req.body.rating,
			comment:req.body.comment
            
		})
		res.json({ status: 'ok' })
	} catch (err) {
		res.json({ status: 'error', error: 'Error adding the review!' })
	}
})


module.exports = router;