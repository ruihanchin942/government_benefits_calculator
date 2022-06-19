const express = require('express');

const router = express.Router();

router.get('/input-details', (req, res, next) => {
  res.send(
    '<form action="/benefits" method="POST"><input type="text" name="title"><button type="submit">Add Product</button></form>'
  );
});

router.post('/benefits', (req, res, next) => {
  console.log(req.body);
  res.redirect('/');
});

module.exports = router;
