const express = require('express');
const barbershopRouter = express.Router();

const barbershopsController = require('../controllers/barbershops-controller');
const authHelpers = require('../services/auth/auth-helpers');

barbershopRouter.get('/', barbershopsController.index);

module.exports = barbershopRouter;
