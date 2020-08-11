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

route.get('/editar-producto/:id', async (req, res) => {
  const { id } = req.params;
  const productos = await producto.findByPk(id);
  res.render('admin/products-admin-edit', {
    result: productos,
  });
});

route.get('/ventas', (req, res) => {
  res.render('admin/sales');
});

route.post('/agregar-producto', async (req, res) => {
  try {
    const { titulo, descripcion, precio, estado, autor, tecnologia } = req.body;
    const { imagen, zip } = req.files;

    const fecha = Date.now();
    const imagenpath = fecha + imagen.name;
    const zippath = fecha + zip.name;

    imagen.mv(
      path.join(__dirname, '../', 'public', 'imagenes', `${imagenpath}`)
    );
    zip.mv(path.join(__dirname, '../', 'public', 'archivos', `${zippath}`));

    const agregarnuevoproducto = await producto.create({
      titulo: titulo,
      descripcion: descripcion,
      precio: precio,
      estado: estado,
      imagen: imagenpath,
      autor: autor,
      tecnologia: tecnologia,
      zip: zippath,
    });

    if (agregarnuevoproducto) {
      res.redirect('/administrador/productos');
    }
  } catch (error) {
    console.log(error);
  }
});

route.post('/eliminar-producto', async (req, res) => {
  try {
    const { id } = req.body;
    const productoencontrado = await producto.findByPk(id);

    const imagenpah = path.join(
      __dirname,
      '../',
      'public',
      'imagenes',
      `${productoencontrado.imagen}`
    );

    const zippath = path.join(
      __dirname,
      '../',
      'public',
      'archivos',
      `${productoencontrado.zip}`
    );

    fs.unlinkSync(imagenpah);
    fs.unlinkSync(zippath);
    const eliminado = await productoencontrado.destroy();
    if (eliminado) {
      res.redirect('/administrador/productos');
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = route;
