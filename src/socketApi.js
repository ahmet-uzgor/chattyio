const socketio = require('socket.io');
const io = socketio();
const socketAuthorization = require('../middleware/socketAuthorization');

const socketApi = {
    io
};

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
});

module.exports = socketApi;