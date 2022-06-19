const express = require('express');

const router = express.Router()

router.get('/', (req, res, next) => {
    res.send('<b>Boundary Limits:</b><br/>Age: 1 <= x <= 70<br/>Is Citizen: 1 denotes Citizen and 0 denotes foreigner<br/>Floor: 1 <= x <= 15<br/>Unit: 200 <= x <= 400<br/>Postal code: 6 digit number<br/>Income: 0 <= x <= 10000');
  });

module.exports = router