const express = require('express');
const barbershopRouter = express.Router();

const barbershopsController = require('../controllers/barbershops-controller');
const authHelpers = require('../services/auth/auth-helpers');

barbershopRouter.get('/', barbershopsController.index);

barbershopRouter.get('/map', (req, res) => {
  res.render('barbershops/barbershops-map');
});

module.exports = barbershopRouter;
