import mongoose from "mongoose";
import cryptoSchema from "./cryptoModel";
import stockSchema from "./stockModel";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  cryptos: [cryptoSchema],
  stocks: [stockSchema],
});

export default mongoose.model("User", userSchema);
