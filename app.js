require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

import key from "./keys.js";
import authRouter from "./router/auth";

const bodyParser = require("body-parser");
const passport = require("passport");
const passportLocal = require("passport-local");

const app = express();

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

mongoose
  .connect("mongodb://localhost:27017/financeDB", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected");
  })
  .catch((err) => console.log("Error:", err));

app.use(express.json());
app.use("/", authRouter);

// app.use(express.static("public"));

//check if a user is authenticated
// app.get("/financials", function (req, res) {
//   if (req.isAuthenticated()) {
//     res.send(req.user);
//   } else {
//     res.redirect("/login");
//   }
// });

// //register a new user
// app.post("/register", function (req, res) {
//   User.register(
//     {
//       username: req.body.username,
//     },
//     req.body.password,
//     function (err, user) {
//       if (err) {
//         console.log(err);
//         //redirect to register page with error
//       } else {
//         passport.authenticate("local")(req, res, function () {
//           //redirect to financials in page
//         });
//       }
//     }
//   );
// });

// //log a user in and direct them to the financials page
app.post("/login", function (req, res) {
  console.log(req.body);
  const user = new model.User({
    username: req.body.username,
    password: req.body.password,
  });

  req.login(user, function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log("logged in");
      passport.authenticate("local")(req, res, function () {
        res.send("Hello");
      });
    }
  });
});

// app.post("/cryptos", function (req, res) {
//   const submittedCrypto = req.body.crypto;
//   // Check if crypto is valid or if it isnt already in user's crypto list

//   User.findById(req.user.id, function (err, foundUser) {
//     if (err) {
//       console.log(err);
//     } else {
//       if (foundUser) {
//         foundUser.cryptos.push(submittedCrypto);
//         foundUser.Save(function () {
//           // might need to change these redirects
//           res.redirect("/financials");
//         });
//       }
//     }
//   });
// });

// app.post("/stocks", function (req, res) {
//   const submittedStock = req.body.stock;
//   // Check if stock is valid or if it isnt already in user's stock list

//   User.findById(req.user.id, function (err, foundUser) {
//     if (err) {
//       console.log(err);
//     } else {
//       if (foundUser) {
//         foundUser.stocks.push(submittedStock);
//         foundUser.Save(function () {
//           // might need to change these redirects
//           res.redirect("/financials");
//         });
//       }
//     }
//   });
// });

//logout a user
// app.get("/logout", function (req, res) {
//   req.logout();
//   res.redirect("/");
// });

app.listen(4000, function () {
  console.log("finance server running on port 4000");
});
