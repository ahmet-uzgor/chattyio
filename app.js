const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const passport = require('passport');

//Redis-session store configuration
const redis = require('redis');
let redisStore = require('connect-redis')(session);
let redisClient = redis.createClient();

//Environment variable config.
const dotenv = require('dotenv');
dotenv.config();

// router paths
const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const chatRouter = require('./routes/chat');
const messageRouter = require('./routes/messages');

const app = express();

// mongodb connection initialization
const mongodb = require('./connector/mongoDb')();

// Middleware initialization
const isAuthenticated = require('./middleware/isAuthenticated');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'bower_components')));

//express-session initialization
app.use(session({
  store: new redisStore({
    client: redisClient,
    host:process.env.REDIS_URI ,
    port: process.env.REDIS_PORT,
    pass: process.env.REDIS_PASS
  }),
  secret: process.env.SESSION_SECRET_KEY,
  resave: false,
  saveUninitialized: true,
  cookie: {maxAge: 14 * 24 * 3600000}
}));

//pasport.js initialization
app.use(passport.initialize());
app.use(passport.session());

// routes
app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/chat', isAuthenticated, chatRouter);
app.use('/messages', isAuthenticated, messageRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
