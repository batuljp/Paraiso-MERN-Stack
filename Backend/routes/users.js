var express = require('express');
var router = express.Router();

const cors = require("cors");
const mongoose = require("mongoose");
const model = require("./user.model");


var monk = require('monk');
 

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.use(cors());
router.use(express.json());

mongoose.connect("mongodb://localhost:27017/Paraiso");

//Data Base Connection
// var monk = require("monk");
// var db = monk('localhost:27017/Paraiso');
// var collection = db.get("users");

// var collectionfav = db.get("favorites");
// var ObjectID = require("mongodb").ObjectId;

//Logging
// var log4js = require("log4js");
// const { request } = require("../app");
// var logger = log4js.getLogger();
// logger.level = "debug";

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

// /* Check if User Exists */
// router.get('/validate/:state', function(req, res)
//   {
//       console.log("Inside Validate", req.params.state)
//       collection.findOne({ email: req.params.state }, function(err, user){
// 			if (err) throw err;
// 			if (user){
// 				res.json({ error : "User already exists. Please login!"} );
//       }
//       else {
//         res.json({ })
//       }
// })
// });

//Encryption
router.get("/encrpytion/:state", function (req, res) {
  let hashedPassword;
  bcrypt.genSalt(10, function (err, Salt) {
    bcrypt.hash(req.params.state, Salt, function (err, hash) {
      if (err) {
        res.json({ error: "'Cannot encrypt password'" });
      } else {
        console.log("Hash:", typeof hash);
        hashedPassword = hash;
        res.json({ password: hashedPassword });
      }
    });
  });
});

/* Register Users */
// router.post("/register", function (req, res) {
//   let { username, email, password } = req.body;
//   let hashedPassword;
//   let newUser;
//   if (!(username && email && password)) {
//     res.json({ error: "All fields are required!" });
//   } else {
//     collection.findOne({ email: email }, function (err, user) {
//       if (err) throw err;

//       if (user) {
//         res.json({ error: "User already exists. Please login!" });
//       } else {
//         newUser = {
//           username: username,
//           email: email,
//           password: password,
//           favorites: [],
//         };
//         console.log("New User Information--", newUser);
//         collection.insert(newUser, function (err, user) {
//           if (err) throw err;
//           var token = jwt.sign({ user_id: user._id, email }, "secretkey");
//           if (token) {
//             user.token = token;
//           }
//           res.json(user);
//         });
//       }
//     });
//   }
// });
router.post("/register", async (req, res) => {
  const newPassword = await bcrypt.hash(req.body.password, 10);
  try {
    const user = await model.create({
      name: req.body.name,
      email: req.body.email,
      password: newPassword,
      host: req.body.host,
    });

    res.json({ status: "ok" });
  } catch (err) {
    res.json({status: "Duplicate Email"});
  }
});

router.post("/updatepass", function (req, res) {
  let { email, password } = req.body;
  collection.findOne({ email: email }, function (err, user) {
    if (err) throw err;
    if (user) {
      collection.update(
        { email: email },
        { $set: { password: password } },
        function (err, user) {
          if (err) throw err;
          res.json(user);
        }
      );
      res.json(user);
    }
  });
});

// router.post("/login", function (req, res) {
//   const { email, password } = req.body;

//   if (!(email && password)) {
//     res.json({ error: "All fields are required!" });
//   } else {
//     collection.findOne({ email: 'alex@g.c' }, function (err, user) {
//       if (err) throw err;
//       if (user == null) {
//         res.json({ error: "User doesn't exist" });
//       } else {
//         if (user.password === 'admin') {
//           // var token = jwt.sign({ user_id: user._id, email }, "secretkey");
//           // user.token = token;
//           res.json(user);
//         } else {
//           res.json({ error: "User email or password is incorrect!" });
//         }
//       }
//     });
//   }
// });
router.post("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const host = req.body.host;

  const user = await model.findOne({ email: email, host: host});
console.log(user);
  const isPasswordValid = await bcrypt.compare(password, user.password);

  // const isHostValid = await host&&user.host;
  console.log("Password valid: ", isPasswordValid);
  // console.log("Host valid:", isHostValid);
  console.log("###############################")
  if (user.host === host && isPasswordValid) {
    const token = await jwt.sign(
      { email: user.email, name: user.name },
      "secret123"
    );

    res.json({ status: "ok", token: token, userId: user._id});
  } else {
    res.json({ status: "Wrong Email or Password or You are not a host." });
  }
});

router.post("/", async (req, res) => {
  const token = req.headers["x-access-token"];
  const goal = req.body.tempGoal;

  const isTokenValid = await jwt.verify(token, "secret123");
  const email = isTokenValid.email;

  if (isTokenValid) {
    await model.updateOne({ email: email }, { $set: { goal: goal } });

    res.json({ status: "ok" });
  } else {
    res.json({ status: "Invalid Token" });
  }
});

router.get("/", async (req, res) => {
  const token = req.headers["x-access-token"];
  const isValidToken = await jwt.verify(token, "secret123");

  if (isValidToken) {
    const email = isValidToken.email;
    const user = await model.findOne({ email: email });
    res.json({ status: "ok", goal: user.goal });
  } else {
    res.json("Invalid Token");
  }
});


// router.get("/getFavorites/:state", function (req, res) {
//   collection.findOne({ _id: req.params.state }, function (err, user) {
//     if (err) throw err;
//     res.json(user.favorites);
//   });
// });

// router.post("/addFavorite", function (req, res) {
//   const { username, tutorId } = req.body;

//   if (!(username && tutorId)) {
//     res.json({ error: "All fields are required!" });
//   } else {
//     collection.update(
//       { username: "emily" },
//       { $push: { favorites: tutorId } },
//       function (err, user) {
//         if (err) throw err;
//         if (username == null) {
//           res.json({ error: "User doesn't exist" });
//         } else {
//           res.json({ message: "Update Success" });
//         }
//       }
//     );
//   }
// });

// router.get("/removeFavorite/:id/:tutorId", function (req, res) {
//   collection.update(
//     { _id: req.params.id },
//     { $pull: { favorites: req.params.tutorId } },
//     function (err, user) {
//       if (err) throw err;
//       res.json(user);
//     }
//   );
// });

module.exports = router;
