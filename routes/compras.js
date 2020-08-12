const express = require('express');
const producto = require('../models/producto');
const route = express.Router();

route.get('/comprados', (req, res) => {
  res.render('comprados');
});
