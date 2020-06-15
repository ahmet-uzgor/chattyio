const express = require('express');
const router = express.Router();
const passpartGoogle = require('../auth/google');

router.get('/google', passpartGoogle.authenticate(
    'google',
    {
        scope: ['profile']
    }
));

router.get('/google/callback', passpartGoogle.authenticate(
    'google',
    {
        failureRedirect: '/'
    }),
    (req, res) => {
        res.redirect('chat');
    });

module.exports = router;