import mongoose from "mongoose";

const stockSchema = new mongoose.Schema({
  name: String,
  symbol: String,
  currentPrice: Number,
  userAmount: Number,
});

export default mongoose.model("Stock", stockSchema);
