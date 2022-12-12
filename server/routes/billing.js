const express = require('express');
const router = express.Router();
const { getConnection } = require("../db");

router.get("/", async (req, res) => {
    const { userId } = req.query;

    const [rows] = await getConnection().execute('SELECT title, price, datetime FROM billing JOIN `order` ON billing.order_ID = order.ID WHERE user_ID=?', [userId]);

    res.json(rows);
});

module.exports = router;
