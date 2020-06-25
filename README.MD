# CREATED BY [AHMET UZGOR](https://www.linkedin.com/in/ahmet-%C3%BCzg%C3%B6r-a1397a134/)

Chatty.io is an advanced chat program which is written on top of Node.js.

Login system uses gmail ### oauth2.0 authentication via passport.js and passport-google-oauth-20

It uses express-session, connect-redis & socket authorization to manage online sessioning.

API uses use REDIS as database for caching , online session adapter ,chat room registry and messages . Also MongoDb keeps signed up users and creates an user_id.

CICD ==> Heroku + Travis.ci + Github For testing , integration & Deployment

For Frontend => Angular.js is used for chat and user service

Instant Message system communicates on Web-Socket technology via Socket.io

# How to use this application ? 

Firstly clone or download [this](https://github.com/ahmet-uzgor/chattyio.git) repository to your computer and follow instructions in the below ;

```sh
$ git clone https://github.com/ahmet-uzgor/chattyio.git
$ cd chattyio
$ npm install // To install necessary packages
$ npm start 
--> open http://127.0.0.1:3000 or localhost:3000 and login via google authentication
```

* Chatty.io api uses, my test mongodb database and my local redis database so to be able to use effectively please install and your redis database to your computer and open a file in the main folder of project which is ".env"
and set parameters in the below with your data.Also for google authentication you need Google oauth key and configuration.For more information and google oauth key [click](https://developers.google.com/identity/protocols/oauth2)

| Environment KEY | VALUE |
| ----------------| ----- |
| DB_STRING | mongodb-string|
| GOOGLE_CLIENT_ID |  Google-Client-ID |
| GOOGLE_LOGIN_SECRET_ID | Secret- ID|
| GOOGLE_LOGIN_CALLBACK_URL | /auth/google/callback |
| SESSION_SECRET_KEY | AHMETUZGORCHATTYIO |
| REDIS_URI | 127.0.0.1 |
| REDIS_PORT | 6379 |
| REDIS_PASS | Empty if not specified |
