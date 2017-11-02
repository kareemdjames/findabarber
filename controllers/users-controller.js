// import dependencies
const bcrypt = require('bcryptjs');
const User = require('../models/user.js');

const usersController = {};

// create new user & password
usersController.create = (req, res) => {
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(req.body.password, salt);
  User.create({
    username: req.body.username,
    email: req.body.email,
    password_digest: hash,
  }).then(user => {
    req.login(user, (err) => {
      if (err) return next(err);
      res.redirect('/user');
    });
  }).catch(err => {
    console.log(err);
    res.status(500).json({error: err});
  });
}

//redirect to user profile page or wherever else
usersController.index = (req, res) => {
  res.render('barbershops/barbershops-index', {
      user: req.user,
      barbershops: barbershops,
  }).catch(err => {
    console.log(err);
    res.status(500).json({err: err});
  });
};

module.exports = usersController;
