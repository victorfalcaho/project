const express = require('express');
const producto = require('../models/producto');
const route = express.Router();

route.get('/carrito-compras', (req, res) => {
  res.render('cart');
});

module.exports = route;
