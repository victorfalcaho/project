const express = require('express');
const fs = require('fs');
const path = require('path');
const producto = require('../models/producto');

const route = express.Router();

route.get('/productos', async (req, res) => {
  const productos = await producto.findAll();
  res.render('admin/products-admin', {
    result: productos,
  });
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

route.post('/agregar-producto', async (req, res) => {
  try {
    const { titulo, descripcion, precio, estado, autor, tecnologia } = req.body;
    const { foto, zip } = req.files;

    const fecha = Date.now();
    const fotopath = fecha + foto.name;
    const zippath = fecha + zip.name;

    foto.mv(path.join(__dirname, '../', 'public', 'imagenes', `${fotopath}`));
    zip.mv(path.join(__dirname, '../', 'public', 'archivos', `${zippath}`));

    const agregarnuevoproducto = await producto.create({
      titulo: titulo,
      descripcion: descripcion,
      precio: precio,
      estado: estado,
      imagen: fotopath,
      autor: autor,
      tecnologia: tecnologia,
      zip: zippath,
    });

    if (agregarnuevoproducto) {
      res.redirect('/productos');
    }
  } catch (error) {
    console.log(error);
  }
});

route.post('/eliminar-producto', (req, res) => {});

module.exports = route;
