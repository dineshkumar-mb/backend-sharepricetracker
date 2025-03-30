const axios = require("axios");
const express = require("express");
const router = express.Router();

router.get("/crypto/:symbol", async (req, res) => {
    try {
        const { symbol } = req.params;
        const response = await axios.get(
            `https://api.coingecko.com/api/v3/simple/price?ids=${symbol}&vs_currencies=usd`
        );
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
