const path = require('path')

const express = require('express');

const rootDir = require('../util/path')
const adminData = require('./admin')

const router = express.Router()

router.get('/', (req, res, next) => {
    const benefits = adminData.benefits
    res.render('home', {
        benefits: benefits,
        pageTitle: 'Home',
        path:'/',
        hasDetails: benefits.length > 0,
        activeHome: true,
        productCSS: true
    })
  });

module.exports = router