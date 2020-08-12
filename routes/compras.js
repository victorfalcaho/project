const express = require('express');
const usuario = require('../models/usuario');
const pago = require('../models/pago');
const detallepago = require('../models/detallepago');
const producto = require('../models/producto');
const carrito = require('../models/carrito');

const route = express.Router();

var http = require('http'),
  paypal = require('paypal-rest-sdk');

paypal.configure({
  mode: 'sandbox',
  client_id:
    'AQrGChN6ldq7XXHid_K3C_42ixX2zHRvu7F6VAMVFx9BeYDZ6YDSBZs3fgsLwtixI-zoZZea-wHxF7_E',
  client_secret:
    'EAt_IBBV3GPcnPZfpLkMmDF3E_0BWdlPx2yas9Gevbmnobo56LPtBHAaCkuvdnxjn5YwPYfL1-RAfRXv',
});

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

route.get('/process/:total', (req, res) => {
  var paymentId = req.query.paymentId;
  var payerId = { payer_id: req.query.PayerID };
  paypal.payment.execute(paymentId, payerId, async (error, payment) => {
    if (error) {
      console.error(error);
    } else {
      // console.log(payment.transactions);
      if (payment.state == 'approved') {
        try {
          const { total } = req.params;
          const usuarioid = req.session.usuarioid;

          const consultarcarrito = await carrito.findAll({
            where: { usuarioId: usuarioid },
            include: [usuario, producto],
          });

          const pagado = await pago.create({
            total: total,
            usuarioId: usuarioid,
          });
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
            res.redirect(`/comprado/${total}`);
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
  });
});

route.get('/comprado/:total', async (req, res) => {
  try {
    const { total } = req.params;
    res.render('pago', {
      total: total,
    });
  } catch (error) {
    console.log(error);
  }
});

route.post('/comprar', async (req, res) => {
  const { total } = req.body;
  const nombre = 'FALCAHO';

  var payReq = JSON.stringify({
    intent: 'sale',
    redirect_urls: {
      return_url: 'http://localhost:3000/process/' + total,
      cancel_url: 'http://localhost:3000/carrito-compras',
    },
    payer: {
      payment_method: 'paypal',
    },

    transactions: [
      {
        item_list: {
          items: [
            {
              name: nombre,
              sku: '909',
              price: total + '.00',
              currency: 'MXN',
              quantity: 1,
            },
          ],
        },
        amount: {
          currency: 'MXN',
          total: total + '.00',
        },
        description: 'Manuales utm',
        custom: 'c33ted6nndndk0q992t8l4pb7e#zbis9SEFSuf2DmghWx0PhA==',
      },
    ],
  });

  paypal.payment.create(payReq, (error, payment) => {
    if (error) {
      console.error(error);
    } else {
      //capture HATEOAS links
      var links = {};
      payment.links.forEach((linkObj) => {
        links[linkObj.rel] = {
          href: linkObj.href,
          method: linkObj.method,
        };
      });
      //if redirect url present, redirect user
      if (links.hasOwnProperty('approval_url')) {
        res.redirect(links['approval_url'].href);
      } else {
        console.error('no redirect URI present');
      }
    }
  });
});

// route.post('/comprar', async (req, res) => {
//   try {
//     const { total } = req.body;
//     const usuarioid = req.session.usuarioid;

//     const consultarcarrito = await carrito.findAll({
//       where: { usuarioId: usuarioid },
//       include: [usuario, producto],
//     });

//     const pagado = await pago.create({ total: total, usuarioId: usuarioid });
//     const idpago = pagado.id;

//     for (let index = 0; index < consultarcarrito.length; index++) {
//       const insertardetallepago = await detallepago.create({
//         producto: consultarcarrito[index].producto.titulo,
//         precio: consultarcarrito[index].producto.precio,
//         descripcion: consultarcarrito[index].producto.descripcion,
//         tipodepago: 'Paypal',
//         autor: consultarcarrito[index].producto.autor,
//         tecnologia: consultarcarrito[index].producto.tecnologia,
//         zip: consultarcarrito[index].producto.zip,
//         pagoId: idpago,
//       });
//     }

//     const eliminarcarrito = await carrito.destroy({
//       where: {
//         usuarioId: usuarioid,
//       },
//     });

//     if (eliminarcarrito) {
//       res.redirect('/');
//     }
//   } catch (error) {
//     console.log(error);
//   }
// });

module.exports = route;
