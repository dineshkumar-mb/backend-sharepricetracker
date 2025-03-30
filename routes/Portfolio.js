const express = require('express');
const router = express.Router();
const Portfolio = require('../models/Portfolio');
const jwt = require('jsonwebtoken');

// Middleware for Auth
const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).send('Access Denied');
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch {
        res.status(400).send('Invalid Token');
    }
};

// Add Investment
router.post('/add', authMiddleware, async (req, res) => {
    const { assetType, name, symbol, quantity, purchasePrice } = req.body;
    const investment = new Portfolio({ userId: req.user.userId, assetType, name, symbol, quantity, purchasePrice });
    await investment.save();
    res.json({ message: 'Investment added' });
});

// Get User Portfolio
router.get('/', authMiddleware, async (req, res) => {
    const investments = await Portfolio.find({ userId: req.user.userId });
    res.json(investments);
});

module.exports = router;
