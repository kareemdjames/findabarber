const db = require('../db/config');

const Barbershop = {};

Barbershop.findAll = () => {
  return db.manyOrNone('SELECT * FROM barbershops')
};

Barbershop.findById = (id) => {
  return db.one(`
  SELECT * FROM barbershops
    WHERE id = $1
  `, [id]);
};

Barbershop.create = (barbershop, userId) => {
  return db.one(`
    INSERT INTO barbershops
    (name, street_address, city, state, zip, rating, user_id)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *
  `, [barbershop.name, barbershop.street_address, barbershop.city, barbershop.state, barbershop.zip, barbershop.rating, userId]);
};

Barbershop.update = (barbershop, barbershopId) => {
  return db.one(`
  UPDATE barbershops SET 
  street_address = $1, 
  city = $2, 
  state = $3, 
  zip = $4, 
  rating = $5
  WHERE id = $6
  RETURNING *
  `, [barbershop.street_address, barbershop.city, barbershop.state, barbershop.zip, barbershop.rating, barbershopId])
};

Barbershop.destroy = (id) => {
  return db.none(`
    DELETE FROM barbershops
    WHERE id = $1
  `, [id]);
};

module.exports = Barbershop;
