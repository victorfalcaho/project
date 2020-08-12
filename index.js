const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');

const sequelize = require('./database/database');
const carrito = require('./models/carrito');
const comentarios = require('./models/comentarios');
const detallepago = require('./models/detallepago');
const pago = require('./models/pago');
const producto = require('./models/producto');
const usuario = require('./models/usuario');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(fileUpload());

const inicioRoutes = require('./routes/inicio');
const administradorRoutes = require('./routes/admin');
const autentificacionRoutes = require('./routes/autentificacion');
const carritoRoutes = require('./routes/carrito');
const comprasRoutes = require('./routes/compras');

const validaciones = require('./helpers/validaciones');

app.use(validaciones.starSession);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(validaciones.sesionglobal);

app.use(inicioRoutes);
app.use('/administrador', validaciones.validacion, administradorRoutes);
app.use(autentificacionRoutes);
app.use(carritoRoutes);
app.use(comprasRoutes);

comentarios.belongsTo(usuario);
comentarios.belongsTo(producto);

carrito.belongsTo(usuario);
carrito.belongsTo(producto);

pago.belongsTo(usuario);

detallepago.belongsTo(pago);

sequelize
  .sync()
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
