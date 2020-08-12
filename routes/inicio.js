const express = require('express');
const producto = require('../models/producto');
const route = express.Router();

route.get('/', async (req, res) => {
  const productos = await producto.findAll();
  res.render('home', {
    result: productos,
  });
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
