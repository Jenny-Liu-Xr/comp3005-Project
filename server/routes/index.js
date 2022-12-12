const express = require('express');
const { getConnection } = require("../db");
const router = express.Router();

// user login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.json({message: "invalid parameters"});
    return;
  }

  const [rows] = await getConnection().execute('SELECT * FROM user WHERE email = ? AND password = ?', [email, password]);
  const [rows1] = await getConnection().execute('SELECT * FROM owner WHERE email = ? AND password = ?', [email, password]);
  if (rows.length > 0) {
    res.json({ ...rows[0] });
  } else if (rows1.length >0) {
    res.json({ ...rows1[0], isAdmin: true });
  } else {
    res.json({ message: "invalid email or password" });
  }
});

router.post("/register", async (req, res) => {
  const { email, name, password, phone, address } = req.body;

  if (!email || !name || !password || !phone || !address) {
    res.json({message: "invalid parameters"});
    return;
  }

  const [rows] = await getConnection().execute('SELECT * FROM user WHERE email = ?', [email]);

  if (rows.length > 0) {
    res.json({ message: "email already exists" });
  } else {

    const [rows, field] = await getConnection().execute('INSERT INTO user(email, name, password, phone, address) VALUES(?,?,?,?,?)', [email, name, password, phone, address]);

    res.status(201).send();
  }
});

router.get("/publisher", async (req, res) => {

  const [rows] = await getConnection().execute('SELECT * FROM publisher');

  res.json(rows);
});

module.exports = router;
