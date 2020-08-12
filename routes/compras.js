const express = require('express');
const usuario = require('../models/usuario');
const pago = require('../models/pago');
const detallepago = require('../models/detallepago');
const producto = require('../models/producto');
const carrito = require('../models/carrito');

const route = express.Router();

route.get('/comprados', async (req, res) => {
  try {
    const usuarioid = req.session.usuarioid;
    let total = 0;
    const detalleinfo = [];
    let consultarpago = 0;

    if (usuarioid) {
      consultarpago = await pago.findAll({
        where: { usuarioId: usuarioid },
      });

      for (let index = 0; index < consultarpago.length; index++) {
        const consultardetallepago = await detallepago.findAll({
          where: { pagoId: consultarpago[index].id },
        });
        detalleinfo.push(consultardetallepago);
      }

      consultarpago.forEach(async (pagousuario) => {
        total = total + pagousuario.total;
      });
    }

    res.render('comprados', {
      result: detalleinfo,
      total: total,
    });
  } catch (error) {
    console.log(error);
  }
});

route.post('/comprar', async (req, res) => {
  try {
    const { total } = req.body;
    const usuarioid = req.session.usuarioid;

    const consultarcarrito = await carrito.findAll({
      where: { usuarioId: usuarioid },
      include: [usuario, producto],
    });

    const pagado = await pago.create({ total: total, usuarioId: usuarioid });
    const idpago = pagado.id;

    for (let index = 0; index < consultarcarrito.length; index++) {
      const insertardetallepago = await detallepago.create({
        producto: consultarcarrito[index].producto.titulo,
        precio: consultarcarrito[index].producto.precio,
        descripcion: consultarcarrito[index].producto.descripcion,
        tipodepago: 'Paypal',
        autor: consultarcarrito[index].producto.autor,
        tecnologia: consultarcarrito[index].producto.tecnologia,
        zip: consultarcarrito[index].producto.zip,
        pagoId: idpago,
      });
    }

    const eliminarcarrito = await carrito.destroy({
      where: {
        usuarioId: usuarioid,
      },
    });

    if (eliminarcarrito) {
      res.redirect('/');
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = route;
