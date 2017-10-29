CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password_digest TEXT,
    email VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS barbershops (
    id SERIAL PRIMARY KEY,
    name TEXT,
    street_address TEXT,
    city TEXT,
    state TEXT,
    zip INTEGER,
    rating INTEGER,
    user_id INTEGER REFERENCES users(id)
);
