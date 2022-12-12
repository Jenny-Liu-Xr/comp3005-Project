const express = require('express');
const router = express.Router();
const { getConnection } = require("../db");

router.post("/", async (req, res) => {
   const { userId, carts, amount } = req.body;

   if (!userId || !carts || !amount) {
       return res.json("invalid parameters");
   }

   try {
       const [addOrder] = await getConnection().execute('INSERT INTO `order`(amount, datetime) VALUES(?,?)', [amount, new Date()]);
       for (let i = 0; i < carts.length; i++) {
           const [rows] = await getConnection().execute('SELECT price FROM book WHERE ISBN=?', [carts[i].ISBN]);
           await getConnection().execute('INSERT INTO order_books(order_ID, user_ID, ISBN, quantity, price) VALUES(?,?,?,?,?)', [addOrder.insertId, carts[i].user_ID, carts[i].ISBN, carts[i].quantity, Number(rows[0].price)]);
           await getConnection().execute('DELETE FROM checkout_basket WHERE ISBN=? AND user_ID=?', [carts[i].ISBN, carts[i].user_ID]);
       }
       await getConnection().execute('INSERT INTO shipping(description, datetime, order_ID) VALUES(?,?,?)', ["Order created, waiting for delivery", new Date(), addOrder.insertId]);
       await getConnection().execute('INSERT INTO billing(title, price, order_ID, user_ID) VALUES(?,?,?,?)', ["Cost of purchasing books", amount, addOrder.insertId, userId]);
       res.status(201).send();
   } catch (e) {
       console.log(e);
       res.status(500).send();
   }

});

router.get("/", async (req, res) => {
    const [rows] = await getConnection().execute('SELECT order_ID, COUNT(*) AS bookNum, name, amount, datetime FROM `order` JOIN order_books ON `order`.id = order_books.order_ID JOIN user ON user.ID = order_books.user_ID GROUP BY order_books.order_ID, order_books.user_ID');

    res.json(rows);
});

router.get("/:id", async (req, res) => {
    const {id} = req.params;

  const [orderRows] = await getConnection().execute('SELECT ID, amount, datetime FROM `order` WHERE ID=?', [id]);
  const [orderBooksRows] = await getConnection().execute('SELECT order_books.ISBN, order_books.price, order_books.quantity, book.name FROM order_books JOIN book ON order_books.ISBN = book.ISBN WHERE order_ID=?', [id]);
  const [shippingRows] = await getConnection().execute('SELECT description, datetime FROM shipping WHERE order_ID=?', [id]);

  res.json({
    ...orderRows[0],
    books: orderBooksRows,
    shippings: shippingRows
  });
});

router.post("/dashboard", async(req, res) => {
  const [rows1] = await getConnection().execute('SELECT SUM(quantity) as totalQuantity, SUM(quantity * price) as totalAmount FROM order_books');
  const [rows2] = await getConnection().execute('SELECT SUM(order_books.quantity * order_books.price) as totalAmount, book.author FROM order_books JOIN book ON order_books.ISBN = book.ISBN GROUP BY book.author');
  const [rows3] = await getConnection().execute('SELECT SUM(order_books.quantity * order_books.price) as totalAmount, book.genre FROM order_books JOIN book ON order_books.ISBN = book.ISBN GROUP BY book.genre');
  res.json({
    ...rows1[0],
    authors: rows2,
    genres: rows3
  });
});

module.exports = router;
