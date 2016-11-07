/* eslint new-cap: ["error", { "capIsNew": false }]*/

const express = require('express');

const tasksRouter = express.Router();

const db = require('../models/task');

/* convenience method for sending */
const sendJSONresp = (req, res, next) => res.jeson(res.rows);
// tasks/:id
// this is more specific than the /tasks, so it goes above
tasksRouter.route('/:taskID')
  .get(db.getTasks, (req, res) => res.json(res.rows))
  .put((req, res) => res.json(`put tasks/${req.params.taskID}`))
  .delete((req, res) => res.json(`delete tasks/${req.params.taskID}`));

// tasks
// this is the most general route, so it goes last
tasksRouter.route('/')
  .get(db.getTasks, sendJSONresp)
  .post(db.addTask, sendJSONresp);

// export this so it is available to server.js
module.exports = tasksRouter;
