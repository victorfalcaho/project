const express = require('express');
const carrito = require('../models/carrito');
const usuario = require('../models/usuario');
const producto = require('../models/producto');

const route = express.Router();

route.get('/carrito-compras', async (req, res) => {
  const usuarioid = req.session.usuarioid;
  const micarrito = await carrito.findAll({
    where: { usuarioId: usuarioid },
    include: [usuario, producto],
  });
  res.render('cart', {
    result: micarrito,
  });
});

route.post('/agregar-carrito', async (req, res) => {
  try {
    const { id } = req.body;
    const usuarioid = req.session.usuarioid;
    let encontrado = false;

    const carritoUsuario = await carrito.findAll({
      where: { usuarioId: usuarioid },
    });

    if (carritoUsuario.length > 0) {
      for (let index = 0; index < carritoUsuario.length; index++) {
        if (carritoUsuario[index].productoId == id) {
          encontrado = true;
        }
      }
    }

    if (!encontrado) {
      const crearcarrito = await carrito.create({
        usuarioId: usuarioid,
        productoId: id,
      });

      if (crearcarrito) {
        return res.redirect('/carrito-compras');
      }
    } else {
      return res.redirect('/');
    }
  } catch (error) {
    console.log(error);
  }
});

route.post('/eliminar-carrito', async (req, res) => {
  try {
    const { id } = req.body;
    const usuarioid = req.session.usuarioid;

    const consultaproductoencarrito = await carrito.findOne({
      where: { usuarioId: usuarioid, productoId: id },
    });

    if (consultaproductoencarrito) {
      const eliminadocarrito = await consultaproductoencarrito.destroy();
      res.redirect('/carrito-compras');
    } else {
      res.redirect('/carrito-compras');
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = route;
