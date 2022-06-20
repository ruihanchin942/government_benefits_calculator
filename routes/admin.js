const path = require('path');
const express = require('express');

const rootDir = require('../util/path')

const router = express.Router();

const details = [];

router.get('/input-details', (req, res, next) => {
  res.render('input-details', {
    pageTitle: 'Input Details',
    path: '/admin/input-details',
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true
  });
});

router.post('/benefits', (req, res, next) => {
  details.push({detail: req.body.detail });
  res.redirect('/');
});

exports.routes = router;
exports.details = details;
