const redis = require('redis');
const redisClient = require('../redisClient');  

function Rooms(){
    this.client = redisClient.getClient();
}

module.exports = new Rooms();

Rooms.prototype.upsert = function (roomName){
    this.client.hset(
        'rooms',
        roomName,
        JSON.stringify({
            name: roomName,
            when: Date.now()
        }),
        err => {
            if(err){
                console.log(err);
            }
        }
    )
};

Rooms.prototype.list = function(callback){
    //let active = []; array version
    let roomList2 = {}; // hash table version
    this.client.hgetall('rooms', (err, rooms) => {
        if(err){
            console.log(err);
            return callback([]);
        }

        for (let room in rooms){
            //active.push(JSON.parse(users[user])); array version
            roomList2[room] = JSON.parse(rooms[room]);
        }

        return callback(roomList2);
    })
}

