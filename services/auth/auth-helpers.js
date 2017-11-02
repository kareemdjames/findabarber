// import bcrypt
const bcrypt = require('bcryptjs');

// compare passwords between the user and database
function comparePass(userPassword, databasePassword) {
  return bcrypt.compareSync(userPassword, databasePassword);
}

// redirect to user if successful
function loginRedirect(req, res, next) {
  if (req.user) return res.redirect('/barbershops/map');
  return next();
}

// redirect users that are not logged in
function loginRequired(req, res, next) {
  if (!req.user) return res.redirect('/auth/login');
  return next();
}

module.exports = {
  comparePass,
  loginRedirect,
  loginRequired,
};
