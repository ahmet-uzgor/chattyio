const passport = require('passport');
const GoogleAuth = require('passport-google-oauth20');

const User = require('../models/users');

passport.use(new GoogleAuth({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_LOGIN_SECRET_ID,
    callbackURL: process.env.GOOGLE_LOGIN_CALLBACK_URL
},
  ((accessToken, refreshToken, profile, done) => {
        const data = profile._json;
        //console.log(data);

        User.findOrCreate({
            'googleId': data.sub
        }, {
            name: data.given_name,
            surname: data.family_name,
            profilePhotoUrl: data.picture
        }, (err, user) => {
            return done(err, user);
        })
   })
));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});


module.exports = passport;

