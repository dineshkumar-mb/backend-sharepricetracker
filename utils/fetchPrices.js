const axios = require('axios');
require('dotenv').config();

const ALPHA_VANTAGE_API_KEY = process.env.ALPHA_VANTAGE_API_KEY;  // Store API key in .env

// Function to get real-time stock price
const getStockPrice = async (symbol) => {
    try {
        const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${ALPHA_VANTAGE_API_KEY}`;
        const response = await axios.get(url);

        // Extract latest stock price
        const timeSeries = response.data['Time Series (5min)'];
        if (!timeSeries) {
            throw new Error("Invalid stock symbol or API limit exceeded.");
        }

        const latestTimestamp = Object.keys(timeSeries)[0]; // Get latest time
        return {
            symbol,
            price: timeSeries[latestTimestamp]['1. open']
        };
    } catch (error) {
        return { error: error.message };
    }
};

// Function to get real-time cryptocurrency price
const getCryptoPrice = async (symbol) => {
    try {
        const url = `https://api.coingecko.com/api/v3/simple/price?ids=${symbol}&vs_currencies=usd`;
        const response = await axios.get(url);

        if (!response.data[symbol]) {
            throw new Error("Invalid cryptocurrency symbol.");
        }

        return {
            symbol,
            price: response.data[symbol].usd
        };
    } catch (error) {
        return { error: error.message };
    }
};

module.exports = { getStockPrice, getCryptoPrice };
