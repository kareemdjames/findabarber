// import express and dependencies
const express = require('express');
const logger = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const axios = require('axios');

// initialize app
const app = express();
// add the dotenv files
require('dotenv').config();

// configure port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
});

// static files
app.use(express.static(path.join(__dirname, 'public')));

// views
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// middlewares
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(cookieParser());
app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());

// index route
app.get('/', (req, res) => {
  res.render('index', {
    auth: (req.user) ? true : false,
  });
});

// barbershops routes
const barbershopRoutes = require('./routes/barbershop-routes');
app.use('/barbershops', barbershopRoutes);

// auth routes
const authRoutes = require('./routes/auth-routes');
app.use('/auth', authRoutes);
const userRoutes = require('./routes/user-routes');
app.use('/user', userRoutes);


// error handling
app.use('*', (req, res) => {
  res.status(400).send('Not Found');
});
