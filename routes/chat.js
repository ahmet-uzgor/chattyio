const express = require('express');
const router = express.Router();

/* GET chat page with authentication. */
router.get('/', function(req, res, next) {
  res.json('Chat page');
});

module.exports = router;
