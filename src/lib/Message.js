const redis = require('redis');
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


