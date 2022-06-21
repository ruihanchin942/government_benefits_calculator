const path = require('path');

const express = require('express');

const rootDir = require('../util/path');
const adminData = require('./admin');

const router = express.Router();

router.get('/', (req, res, next) => {
  const benefitList = adminData.benefitList;
  res.render('home', {
    benefitList: benefitList,
    pageTitle: 'Home',
    path: '/',
    hasDetails: benefitList.length > 0,
    activeHome: true,
    productCSS: true,
  });
});

module.exports = router;
