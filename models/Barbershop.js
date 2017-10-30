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
    (street_address, city, state, zip, rating, user_id)
    VALUES ($/street_address/, $/city/, $/state/, $/zip/, $/rating/, $/user_id/)
    RETURNING *
  `, [Barbershop.street_address, Barbershop.city, Barbershop.state, Barbershop.zip, Barbershop.rating, userId]);
};

Barbershop.update = (barbershop, barbershopId) => {
  return db.one(`
  UPDATE barbershops SET 
  street_address = $/street_address/, 
  city = $/city/, 
  state = $/state/, 
  zip = $/zip/, 
  rating = $/rating/
  WHERE id = $/barbershopId/
  ` [Barbershop.street_address, Barbershop.city, Barbershop.state, Barbershop.zip, Barbershop.rating, barbershopId])
};

Barbershop.destroy = (id) => {
  return db.none(`
    DELETE FROM barbershops
    WHERE id = $1
  `, [id]);
};

module.exports = Barbershop;
