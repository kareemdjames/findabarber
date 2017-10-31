const express = require('express');
const barbershopRouter = express.Router();

const barbershopsController = require('../controllers/barbershops-controller');
const authHelpers = require('../services/auth/auth-helpers');

barbershopRouter.get('/', barbershopsController.index);
barbershopRouter.post('/', barbershopsController.create);

// create new page route
barbershopRouter.get('/new', (req, res) => {
  res.render('barbershops/barbershops-new');
});
// map route
barbershopRouter.get('/map', (req, res) => {
  res.render('barbershops/barbershops-map');
});

barbershopRouter.get('/:id', barbershopsController.show);
barbershopRouter.get('/:id/edit', barbershopsController.edit);
barbershopRouter.get('/:id', barbershopsController.update);
barbershopRouter.get('/:id', barbershopsController.delete);

module.exports = barbershopRouter;
