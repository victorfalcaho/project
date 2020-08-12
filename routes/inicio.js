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

route.get('/detalle-producto', async (req, res) => {
  res.render('detalle', {});
});

route.get('/acerca-de', (req, res) => {
  res.render('about');
});

module.exports = route;
