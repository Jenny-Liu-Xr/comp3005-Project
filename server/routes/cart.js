const express = require('express');
const router = express.Router();
const { getConnection } = require("../db");

router.post("/", async (req, res) => {
  const { userId, ISBN } = req.body;
  if (!userId || !ISBN) {
    return res.json({ message: "invalid parameters" });
  }

  const [rows] = await getConnection().execute('SELECT * FROM checkout_basket WHERE ISBN=? AND user_ID=?', [ISBN, userId]);
  if (rows.length > 0) {
    const quantity = rows[0].quantity + 1;
    await getConnection().execute('UPDATE checkout_basket SET quantity = ? WHERE ISBN=? AND user_ID=?', [quantity, ISBN, userId]);
    res.status(204).send();
  } else {
    await getConnection().execute('INSERT INTO checkout_basket(ISBN, user_ID, quantity) VALUES(?,?,?)', [ISBN, userId, 1]);
    res.status(201).send();
  }
});

router.get("/", async (req, res) => {
  const { userId } = req.query;

  const [rows] = await getConnection().execute('SELECT book.ISBN, user_ID, quantity, price from checkout_basket JOIN book ON checkout_basket.ISBN = book.ISBN  WHERE user_ID=?', [userId]);
  res.json(rows);
});

router.delete("/", async (req, res) => {
  const { userId, ISBN, remove } = req.body; //remove

  const [rows] = await getConnection().execute('SELECT * FROM checkout_basket WHERE ISBN=? AND user_ID=?', [ISBN, userId]);

  if (rows.length > 0) {
    if (rows[0].quantity === 1 || remove) {
      await getConnection().execute('DELETE FROM checkout_basket WHERE ISBN=? AND user_ID=?', [ISBN, userId]);
      res.status(204).send();
    } else {
      const quantity = rows[0].quantity - 1;
      await getConnection().execute('UPDATE checkout_basket SET quantity = ? WHERE ISBN=? AND user_ID=?', [quantity, ISBN, userId]);
      res.status(204).send();
    }
  } else {
    res.status(404).send();
  }
});

module.exports = router;
