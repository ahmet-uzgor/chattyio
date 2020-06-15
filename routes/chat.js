const express = require('express');
const router = express.Router();

/* GET chat page with authentication. */
router.get('/', function(req, res, next) {
  res.render('chat', {user: req.user});
});

module.exports = router;
