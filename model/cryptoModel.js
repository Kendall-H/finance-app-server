const mongoose = require("mongoose");

const cryptoSchema = Schema({
  name: String,
  symbol: String,
  currentPrice: Number,
  userAmount: mongoose.Decimal128,
});

export default mongoose.model("Crypto", cryptoSchema) = mongoose.model("crypto", CryptoSchema);
