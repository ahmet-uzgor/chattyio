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
io.adapter(redisAdapter({
    host: process.env.REDIS_URI,
    port: process.env.REDIS_PORT
}));

io.on('connection', (socket) => {
    console.log('a user connected to server with username', socket.request.user.name);

    Users.upsert(socket.id, socket.request.user)
});

module.exports = socketApi;