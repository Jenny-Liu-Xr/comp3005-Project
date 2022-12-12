const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('dotenv').config()

const indexRouter = require('./routes/index');
const booksRouter = require('./routes/book');
const ordersRouter = require('./routes/order');
const cartsRouter = require('./routes/cart');
const shippingsRouter = require('./routes/shipping');
const billingsRouter = require('./routes/billing');
const cors = require('cors');
const {initDB} = require("./db");

var app = express();

initDB().then(() => {
  console.log("Init to connect to mysql");
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());
app.use('/', indexRouter);
app.use('/books', booksRouter);
app.use('/orders', ordersRouter);
app.use('/carts', cartsRouter);
app.use('/shippings', shippingsRouter);
app.use('/billings', billingsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
