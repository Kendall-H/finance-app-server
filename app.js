require('dotenv').config();

const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/financeDB");
mongoose.connect("mongodb://localhost:27017/userDB");

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String
});

userSchema.plugin(encrypt, {
    secret: process.env.SECRET,
    encryptedFields: ['password']
});

const User = new mongoose.model("User", userSchema);

const cryptoSchema = {
    name: String,
    symbol: String,
    currentPrice: Number,
    userAmount: mongoose.Decimal128
}

const stockSchema = {
    name: String,
    symbol: String,
    currentPrice: Number,
    userAmount: Number
}

app.post("/register", function (req, res) {

    const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.enteredEmail,
        password: req.body.password
    });
    newUser.save(function (err) {
        if (err) {
            console.log(err);
        } else {
            //render login page
        }
    })
})

app.post("/login", function (res, req) {
    const username = req.body.email;
    const password = req.body.password;

    User.findOne({
        email: username
    }, function (err, foundUser) {
        if (err) {
            console.log(err);
        } else {
            if (foundUser) {
                if (foundUser.password === password) {
                    // log the user in
                }
            }
        }
    })
});

app.listen(3000, function () {
    console.log("finance server running on port 3000")
})