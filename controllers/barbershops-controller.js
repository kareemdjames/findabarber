const Barbershop = require('../models/Barbershop');

const barbershopController = {};

// Show a list of all barbershops in the db
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

// Show a single barbershop
barbershopController.show = (req, res) => {
  Barbershop.findById(req.params.id)
    .then(barbershop => {
      res.render('barbershops/barbershops-show', {
        barbershop: barbershop,
        isShow: true,
      });
    }).catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
};

// Create a new Barbershop
barbershopController.create = (req, res) => {
  Barbershop.create({
    name: req.body.name,
    street_address: req.body.street_address,
    city: req.body.city,
    state: req.body.state,
    zip: req.body.zip,
    rating: req.body.rating,
  })
    .then(barbershop => {
      res.redirect(`/barbershops/${barbershop.id}`);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
};

// Edit an existing Barbershop
barbershopController.edit = (req, res) => {
  Barbershop.findById(req.params.id)
    .then(barbershop => {
      res.render('barbershops/barbershops-edit', {
        barbershop: barbershop,
      })
    }).catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
};

// Update an existing Barbershop
barbershopController.update = (req, res) => {
  Barbershop.update({
    name: req.body.name,
    street_address: req.body.street_address,
    city: req.body.city,
    state: req.body.state,
    zip: req.body.zip,
    rating: req.body.rating,
  }, req.params.id).then(barbershop => {
    res.redirect(`/barbershops/${barbershop.id}`);
  }).catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
};

barbershopController.delete = (req, res) => {
  Barbershop.destroy(req.params.id)
    .then(() => {
      res.redirect('/barbershops');
    }).catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
};

module.exports = barbershopController;
