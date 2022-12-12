const express = require('express');
const router = express.Router();
const { getConnection } = require("../db");

router.get("/", async (req, res) => {
    const { orderId } = req.query;

    const [rows] = await getConnection().execute('SELECT datetime, description FROM shipping WHERE order_ID=?', [orderId]);

    res.json(rows);
});

module.exports = router;
