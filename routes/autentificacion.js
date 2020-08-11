const express = require('express');

const usuarios = require('../models/usuario');

const route = express.Router();

route.get('/iniciar-sesion', (req, res) => {
  res.render('login');
});

route.get('/cerrar-sesion', (req, res) => {});

route.post('/iniciar-sesion', async (req, res) => {
  try {
    const { usuario, contrasenia } = req.body;

    const usuarioconsultado = await usuarios.findOne({
      where: { usuario: usuario, contrasenia: contrasenia },
    });

    if (usuarioconsultado) {
      if (
        usuarioconsultado.usuario == usuario &&
        usuarioconsultado.contrasenia == contrasenia
      ) {
        let session = req.session;
        session.usuarioid = usuarioconsultado.id;

        if (usuarioconsultado.tipo == 0) {
          session.tipo = true;
          res.redirect('administrador/productos');
        } else {
          session.tipo = false;
          res.redirect('/');
        }
      }
    } else {
      res.redirect('/iniciar-sesion');
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = route;
