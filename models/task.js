/* eslint no-console: ["error", { allow: ["log"] }] */

const pg = require('pg-promise')({/* OPTIONAL Initialization Options */});

const config = {
  host:     process.env.DB_HOST,
  port:     process.env.DB_PORT,
  database: process.env.DB_NAME,
  user:     process.env.DB_USER,
  password: process.env.DB_PASS,
};


const db = pg(config);

module.exports = {

  /* GET /tasks */
  getTasks(req, res, next) {
    db.any('SELECT * FROM task;')
      .then((tasks) => {
        res.rows = tasks;
        next();
      })
      .catch(error => next(error));
  },

  /* POST /tasks */
  /* creates a new task, returns the newly created record */
  addTask(req, res, next) {
    console.log('===addTask==', req.body);
    db.one(
      'INSERT INTO task (name, desription) VALUES ($/name/, $/desc/) returning *;',
      req.body
      )
    .then((task) => {
      console.log('ADDED TASK SUCCESSFUL');
      res.rows = task;
      next();
    });
  },

  /* PUT /tasks/:taskID */
  updateTask(req, res, next) {
  },

  /* DELETE */

};
