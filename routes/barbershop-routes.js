const express = require('express');
const barbershopRouter = express.Router();

const barbershopsController = require('../controllers/barbershops-controller');
const authHelpers = require('../services/auth/auth-helpers');

barbershopRouter.get('/', barbershopsController.index);
barbershopRouter.post('/', authHelpers.loginRequired, barbershopsController.create);

// create new page route
barbershopRouter.get('/new', authHelpers.loginRequired, (req, res) => {
  res.render('barbershops/barbershops-new', {
    auth: (req.user) ? true : false,
  });
});
// map route
barbershopRouter.get('/map', (req, res) => {
  res.render('barbershops/barbershops-map', {
    auth: (req.user) ? true : false,
  });
});

barbershopRouter.get('/:id', barbershopsController.show);
barbershopRouter.get('/:id/edit', authHelpers.loginRequired, barbershopsController.edit);
barbershopRouter.put('/:id', authHelpers.loginRequired, barbershopsController.update);
barbershopRouter.delete('/:id', authHelpers.loginRequired, barbershopsController.delete);

module.exports = barbershopRouter;
