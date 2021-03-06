const express = require('express');
const producto = require('../models/producto');
const comentarios = require('../models/comentarios');
const usuario = require('../models/usuario');
const detallepago = require('../models/detallepago');
const sequelize = require('../database/database');

const route = express.Router();

route.get('/', async (req, res) => {
  const productos = await detallepago.findAll({
    attributes: [
      'producto',
      [sequelize.fn('count', sequelize.col('producto')), 'count'],
      'precio',
      'descripcion',
      'autor',
      'tecnologia',
    ],
    group: ['producto', 'precio', 'descripcion', 'autor', 'tecnologia'],
    raw: true,
    order: sequelize.literal('count DESC'),
  });

  res.render('home', {
    result: productos,
  });
});

route.get('/productos', async (req, res) => {
  const productos = await producto.findAll({ where: { estado: 1 } });
  res.render('products', {
    result: productos,
  });
});

route.get('/detalle-producto/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const productobuscado = await producto.findByPk(id);
    const comentariosusuarios = await comentarios.findAll({
      where: { productoId: id },
      include: [usuario],
    });

    res.render('detalle', {
      result: productobuscado,
      comentarios: comentariosusuarios,
    });
  } catch (error) {
    console.log(error);
  }
});

route.get('/acerca-de', (req, res) => {
  res.render('about');
});

route.post('/agregar-comentario', async (req, res) => {
  try {
    const { comentariousuario, id } = req.body;
    const usuarioid = req.session.usuarioid;

    const insertarcomentario = await comentarios.create({
      comentario: comentariousuario,
      usuarioId: usuarioid,
      productoId: id,
    });

    if (insertarcomentario) {
      res.redirect('/detalle-producto/' + id);
    }
  } catch (error) {
    console.log(error);
  }
});

route.post('/eliminar-comentario', async (req, res) => {
  try {
    const { id, idproducto } = req.body;
    const eliminarcomentario = await comentarios.destroy({ where: { id: id } });
    if (eliminarcomentario) {
      res.redirect('/detalle-producto/' + idproducto);
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = route;
