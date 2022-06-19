const path = require('path');
const express = require('express');

const rootDir = require('../util/path')

const router = express.Router();

router.get('/input-details', (req, res, next) => {
  res.sendFile(path.join(rootDir, 'views', 'input-details.html'));
});

router.post('/benefits', (req, res, next) => {
  console.log(req.body);
  res.redirect('/');
});

module.exports = router;
