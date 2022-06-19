const path = require('path');
const express = require('express');

const rootDir = require('../util/path')

const router = express.Router();

const details = [];

router.get('/input-details', (req, res, next) => {
  res.sendFile(path.join(rootDir, 'views', 'input-details.html'));
});

router.post('/benefits', (req, res, next) => {
  details.push({detail: req.body.detail });
  res.redirect('/');
});

exports.routes = router;
exports.details = details;
