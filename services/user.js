import bcrypt from "bcryptjs";
import user from "../model/user";

import User from "../model/user";
import getSignedToken from "../util/signedToken";

async function createUser(request) {
  return User.find({ email: request.email })
    .exec()
    .then((user) => {
      if (user.length > 0) {
        throw new Error("User already exists");
      }
      return bcrypt
        .hash(request.password, 10)
        .then((hashed) => {
          const newUser = new User({
            firstName: firstName,
            lastName: lastName,
            email: request.email,
          });
          return newUser.save();
        })
        .catch((err) => {
          throw new Error("All fields required");
        });
    });
}

function signInUser(request) {
  return User.findOne({ email: request.email })
    .exec()
    .then((user) => {
      if (!user) {
        throw new Error("Please enter email or password");
      } else {
        return bcrypt
          .compare(request.password, user.password)
          .then((res) => {
            if (res) {
              const token = getSignedToken(user._id);
              return token;
            } else {
              throw new Error("Incorrect password or email, please try again");
            }
          })
          .catch((err) => {
            throw new Error("All fields required");
          });
      }
    });
}

export default { createUser, signInUser };
