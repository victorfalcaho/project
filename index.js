const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const fileUpload = require('express-fileupload');
const sequelize = require('./database/database');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const inicioRoutes = require('./routes/inicio');
const administradorRoutes = require('./routes/admin');

app.use(fileUpload());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(inicioRoutes);
app.use('/administrador', administradorRoutes);

sequelize
  .sync()
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
