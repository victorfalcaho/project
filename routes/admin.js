const express = require('express');

const route = express.Router();

route.get('/productos', (req, res) => {
  res.render('admin/products-admin');
});

route.get('/agregar-producto', (req, res) => {
  res.render('admin/products-admin-add');
});

route.get('/editar-producto', (req, res) => {
  res.render('admin/products-admin-edit');
});

route.get('/ventas', (req, res) => {
  res.render('admin/sales');
});

module.exports = route;
