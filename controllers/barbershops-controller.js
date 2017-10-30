const Barbershop = require('../models/Barbershop');

const barbershopController = {};

barbershopController.index = (req, res) => {
  Barbershop.findAll()
    .then(barbershops => {
      res.render('barbershops/barbershops-index', {
        barbershops: barbershops,
        auth: (req.user) ? true : false,
      });
    }).catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
};

module.exports = barbershopController;
