const mongoose = require("mongoose");

const portfolioSchema = new mongoose.Schema({
    userId: String,
    stockSymbol: String,
    quantity: Number,
    buyPrice: Number,
    date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Portfolio", portfolioSchema);
