const express = require('express');

const route = express.Router();

route.get('/', (req, res) => {
  res.render('home');
});

route.get('/productos', (req, res) => {
  res.render('products');
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
