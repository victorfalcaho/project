const express = require('express');
const fs = require('fs');
const path = require('path');
const producto = require('../models/producto');
const pago = require('../models/pago');
const detallepago = require('../models/detallepago');

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

route.get('/ventas', async (req, res) => {
  try {
    let total = 0;
    const consultarpagos = await pago.findAll();

    consultarpagos.forEach((pagoconsultado) => {
      total += pagoconsultado.total;
    });

    const consultardetallepagos = await detallepago.findAll();

    res.render('admin/sales', {
      result: consultardetallepagos,
      total: total,
    });
  } catch (error) {
    console.log(error);
  }
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

route.post('/editar-producto', async (req, res) => {
  try {
    const {
      titulo,
      descripcion,
      precio,
      estado,
      autor,
      tecnologia,
      id,
    } = req.body;
    const { imagen, zip } = req.files;

    const fecha = Date.now();
    const imagenpath = fecha + imagen.name;
    const zippath = fecha + zip.name;

    imagen.mv(
      path.join(__dirname, '../', 'public', 'imagenes', `${imagenpath}`)
    );
    zip.mv(path.join(__dirname, '../', 'public', 'archivos', `${zippath}`));

    const productoencontrado = await producto.findByPk(id);

    const borrarImagen = path.join(
      __dirname,
      '../',
      'public',
      'imagenes',
      `${productoencontrado.imagen}`
    );

    const borrarZip = path.join(
      __dirname,
      '../',
      'public',
      'archivos',
      `${productoencontrado.zip}`
    );

    fs.unlinkSync(borrarImagen);
    fs.unlinkSync(borrarZip);

    productoencontrado.titulo = titulo;
    productoencontrado.descripcion = descripcion;
    productoencontrado.precio = precio;
    productoencontrado.estado = estado;
    productoencontrado.imagen = imagenpath;
    productoencontrado.autor = autor;
    productoencontrado.tecnologia = tecnologia;
    productoencontrado.zip = zippath;
    const editado = await productoencontrado.save();

    if (editado) {
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
