/* eslint new-cap: ["error", { "capIsNew": false }]*/

const express = require('express');

const indexRouter = express.Router();

indexRouter.get('/', (req, res) => res.json('Homepage'));

module.exports = indexRouter;
