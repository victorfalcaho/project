const express = require('express');
const producto = require('../models/producto');
const route = express.Router();

route.get('/', (req, res) => {
  res.render('home');
});

route.get('/productos', async (req, res) => {
  const productos = await producto.findAll();
  res.render('products', {
    result: productos,
  });
});

route.get('/carrito-compras', (req, res) => {
  res.render('cart');
});

route.get('/acerca-de', (req, res) => {
  res.render('about');
});

route.get('/iniciar-sesion', (req, res) => {
  res.render('login');
});

module.exports = route;
