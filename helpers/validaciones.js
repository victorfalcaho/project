exports.validacion = (req, res, next) => {
  if (req.session.tipo == true) {
    return next();
  } else {
    return res.redirect('/iniciar-sesion');
  }
};

exports.starSession = session({
  secret: 'contrasenia',
  resave: true,
  saveUninitialized: true,
});

exports.sesionglobal =  (req, res, next) {
  res.locals.session = req.session;
  next();
};