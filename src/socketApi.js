const socketio = require('socket.io');
const io = socketio();
const socketAuthorization = require('../middleware/socketAuthorization');

const socketApi = {
    io
};

//Lİbs
const Users = require('./lib/UsersStorage');

io.use(socketAuthorization); //socket.io authorization

/**
 * Redis socket.io adapter
 */
const redisAdapter = require('socket.io-redis');
const redisStore = require('../middleware/redisStore');
io.adapter(redisAdapter({
    host: process.env.REDIS_URI,
    port: process.env.REDIS_PORT
}));

io.on('connection', (socket) => {
    const socketUser = socket.request.user ;
    console.log('a user connected to server with username', socketUser.name);

    Users.upsert(socket.id, socketUser); // When a user logged in it upserts user data to redis in 'online' hash table

    Users.list(users => {
        console.log('Connected Users',users);
    })

    socket.on('disconnect', () =>{ // When a user disconnect , it removes user from redis 
        Users.remove(socketUser.googleId);
        redisStore.destroy(socket.request.sessionID, (err) => {// Destroy session when a user disconnect
            console.log(err);
        }); 
    })
});

module.exports = socketApi;