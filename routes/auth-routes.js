// import dependencies
const express = require('express');
const authRouter = express.Router();
const passport = require('../services/auth/local');
const authHelpers = require('../services/auth/auth-helpers');
const usersController = require('../controllers/users-controller');

authRouter.get('/login', authHelpers.loginRedirect, (req, res) => {
  res.render('auth/login', {
    auth: (req.user) ? true : false,
  });
});

authRouter.get('/register', authHelpers.loginRedirect, (req, res) => {
  res.render('auth/register', {
    auth: (req.user) ? true : false,
  });
});

// register new user
authRouter.post('/register', usersController.create);

// submit login form
authRouter.post('/login', passport.authenticate('local', {
    successRedirect: '/barbershops/map',
    failureRedirect: '/auth/login',
    failureFlash: true,
  })
);

// logout
authRouter.get('/logout', (req, res) => {
  req.logout();
  res.redirect('back');
});

module.exports = authRouter;
