const express = require('express');
const router = express.Router();

// Libs
const Messages = require('../src/lib/Message');

/* GET chat messages list for specified chat Room page with authentication. */
router.get('/list', function(req, res, next) {
  Messages.list('messages:a942i', (messages) => {
    //console.log(messages)
    res.json(messages);
  })
});

module.exports = router;
