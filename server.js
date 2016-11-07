/* eslint no-multi-spaces: ["error", { exceptions: { "VariableDeclarator": true } }] */
/* eslint no-console: ["error", { allow: ["log"] }] */

'use strict';

const express        = require('express');
const logger         = require('morgan');
const bodyParser     = require('body-parser');
const path           = require('path');
const indexRouter    = require('./routes/index');
const tasksRouter    = require('./routes/tasks');

// This tests to see if we have NODE_ENV in our enviroment.
// Only load the dotenv if there is no NODE_ENV in our process.env
const isDev         =!('NODE_ENV' in process.env) && require('dotenv').config() && true;

const app = express();
const PORT = process.env.port || 3000;

// Set up some logging
app.use(logger(isDev ? 'dev' : 'common'));

app.set('view engine', 'ejs');
app.set('views', 'views');

// parse application/json
app.use(bodyParser.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// generic errir handler
// if I use next(Err), it will triggor this function
// function signature has four parameters, the first parameter is expecting an error
app.use((err, req, res, next) => {
  res.status(500).send('Something broke!').end(next);
});

app.listen(PORT, () => console.log('Server is listening on port ', PORT));

// Set up the routes
app.use('/', indexRouter);
app.use('/tasks', tasksRouter);
