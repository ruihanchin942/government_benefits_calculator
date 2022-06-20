exports.calculateBenefits = (req, res, next) => {
  res.render('input-details', {
    pageTitle: 'Input Details',
    path: '/admin/input-details',
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
  });
};

const express = require('express')
const router = express.Router();

router.get('/calculate-benefits', (req, res) => {
    let 
})
