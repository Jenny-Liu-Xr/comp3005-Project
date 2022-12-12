const express = require('express');
const router = express.Router();
const { getConnection } = require("../db");

router.post("/", async (req, res) => {
   const {id, name, author, genre, price, pages, publisher} = req.body;
   if (!id || !name || !author || !genre || !price || !pages || !publisher) {
       res.json({massage: "invalid parameters"});
       return;
   }
    await getConnection().execute('INSERT INTO book(ISBN, name, author, genre, price, pages, publisher_ID) VALUES (?,?,?,?,?,?,?)',
      [id, name, author, genre, price, pages, publisher]
    );
   res.json({});
});

router.put("/:id", async (req, res) => {
    const {id} = req.params;
    const {name, author, genre, price, pages, publisher} = req.body;
    if (!name || !author || !genre || !price || !pages || !publisher) {
        res.json({massage: "invalid parameters"});
    }
    await getConnection().execute('UPDATE book SET name=?, author=?, genre=?, price=?, pages=?, publisher_ID=? WHERE ISBN=?',
      [name, author, genre, price, pages, publisher, id]
    );
    res.status(200).send();
});

router.get("/", async (req, res) => {
    const { keyword } = req.query;

    if (keyword) {
        const [rows] = await getConnection().execute(
          `SELECT * FROM book WHERE ISBN LIKE CONCAT('%', ?,  '%') OR name LIKE CONCAT('%', ?,  '%')
            OR author LIKE CONCAT('%', ?,  '%') OR genre LIKE CONCAT('%', ?,  '%') 
            OR price LIKE CONCAT('%', ?,  '%') OR pages LIKE CONCAT('%', ?,  '%')`,
          [keyword, keyword, keyword, keyword, keyword, keyword]
        );

        res.json(rows);
    } else {
        const [rows] = await getConnection().execute('SELECT * FROM book WHERE ISBN');

        res.json(rows);
    }
});

router.get("/:id", async (req, res) => {
    const {id} = req.params;

    const [rows] = await getConnection().execute('SELECT * FROM book WHERE ISBN=?', [id]);
    if (rows.length > 0) {
        res.json(rows[0])
    } else {
        res.status(404).send();
    }
});

router.delete("/:id", async (req, res) => {
    const {id} = req.params;

    const [rows] = await getConnection().execute('DELETE FROM book WHERE ISBN=?', [id]);

    res.status(204).send();
});

module.exports = router;
