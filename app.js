require('dotenv').config();

const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");

const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(session({
    secret: "gfdgdfgfdgfdgfdgfd.",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/financeDB");

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    cryptos: [cryptoSchema],
    stocks: [stockSchema]
});

userSchema.plugin(passportLocalMongoose);

const User = new mongoose.model("User", userSchema);

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

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

//check if a user is authenticated
app.get("/financials", function (req, res) {
    if (req.isAuthenticated()) {
        res.render("financials");
    } else {
        res.redirect("/login");
    }
});


//register a new user
app.post("/register", function (req, res) {

    User.register({
        username: req.body.username
    }, req.body.password, function (err, user) {
        if (err) {
            console.log(err);
            //redirect to register page with error
        } else {
            passport.authenticate("local")(req, res, function () {
                //redirect to financials in page
            })
        }
    })
});

//log a user in and direct them to the financials page
app.post("/login", function (res, req) {
    const user = new User({
        username: req.body.username,
        password: req.body.password
    });

    req.login(user, function (err) {
        if (err) {
            console.log(err);
        } else {
            passport.authenticate("local")(req, res, function () {
                res.redirect("/financials");
            })
        }
    })
});

app.post("/cryptos", function (req, res) {
    const submittedCrypto = req.body.crypto;
    // Check if crypto is valid or if it isnt already in user's crypto list

    User.findById(req.user.id, function (err, foundUser) {
        if (err) {
            console.log(err);
        } else {
            if (foundUser) {
                foundUser.cryptos.push(submittedCrypto);
                foundUser.Save(function () {
                    // might need to change these redirects
                    res.redirect("/financials");
                });
            }
        }
    });
});

app.post("/stocks", function (req, res) {
    const submittedStock = req.body.stock;
    // Check if stock is valid or if it isnt already in user's stock list

    User.findById(req.user.id, function (err, foundUser) {
        if (err) {
            console.log(err);
        } else {
            if (foundUser) {
                foundUser.stocks.push(submittedStock)
                foundUser.Save(function () {
                    // might need to change these redirects
                    res.redirect("/financials");
                });
            }
        }
    });
});

//logout a user
app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
})

app.listen(3000, function () {
    console.log("finance server running on port 3000")
})