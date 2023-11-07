const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    host:{type: Boolean},
});

const UserModel = mongoose.model("UserModel", userSchema);

module.exports = UserModel;