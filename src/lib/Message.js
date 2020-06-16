const redis = require('redis');
const _ = require('lodash');
const redisClient = require('../redisClient');
  

function Messages(){
    this.client = redisClient.getClient();
}

module.exports = new Messages();

Messages.prototype.upsert = function ({roomId, message, username, surname}){
    let randomId = Math.random().toString(36).substring(7);
    this.client.hset(
        'messages:' +roomId,
        randomId,
        JSON.stringify({
            username,
            surname,
            message,
            when: Date.now()
        }),
        err => {
            if(err){
                console.log(err);
            }
        }
    )
};

Messages.prototype.list = function(roomId, callback){
    //let active = []; array version
    let messageList = {}; // hash table version
    this.client.hgetall(roomId, (err, messages) => {
        if(err){
            console.log(err);
            return callback([]);
        }

        for (message in messages){
            //console.log('message log',message);
            //active.push(JSON.parse(users[user])); array version
            messageList[message] = JSON.parse(messages[message]);
        }

        return callback(_.orderBy(messageList, 'when', 'asc'));
    })
}



