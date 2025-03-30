const express = require("express");
const axios = require("axios");
const cors = require("cors");  // Import cors package
require("dotenv").config();

const app = express();
const PORT = 5000;

// Enable CORS for all requests
app.use(cors({
    origin: "https://sharepricetracker.netlify.app/",  // Allow requests from your frontend
    methods: "GET, POST",  // Allowed HTTP methods
    allowedHeaders: "Content-Type, Authorization"  // Allowed headers
}));

app.get("/api/stocks", async (req, res) => {
    try {
        const { symbol, timeframe } = req.query;
        const apiKey = process.env.ALPHA_VANTAGE_API_KEY;
        
        if (!symbol || !apiKey) {
            return res.status(400).json({ error: "Missing stock symbol or API key" });
        }

        const url = `https://www.alphavantage.co/query?function=${timeframe}&symbol=${symbol}&apikey=${apiKey}`;
        const response = await axios.get(url);
        
        res.json(response.data);
    } catch (error) {
        console.error("Error fetching stock data:", error);
        res.status(500).json({ error: "Failed to fetch stock data" });
    }
});

app.listen(PORT, () => console.log(`🚀 Proxy server running on http://localhost:${PORT}`));
