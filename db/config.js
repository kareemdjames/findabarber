const options = {
  query: (e) => {
    console.log(e.query)
  },
};

const pgp = require('pg-promise')(options);

function setDb() {
  if (process.env.NODE_ENV === 'development' || !process.env.NODE_ENV) {
    return pgp({
      database: 'find_a_barber',
      port: 5432,
      host: 'localhost',
    });
  } else if (process.env.NODE_ENV === 'production') {
    return pgp(process.env.DATABASE_URL);
  }
}

const db = setDb();

module.exports = db;