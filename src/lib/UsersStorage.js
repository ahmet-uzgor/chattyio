const redis =require('redis');

function Users(){
    this.client = redis.createClient({
        host: process.env.REDIS_URI,
        port: process.env.REDIS_PORT
    });
}

module.exports = new Users();

Users.prototype.upsert = function (connectionId, meta){
    this.client.hset(
        'online',
        meta.googleId,
        JSON.stringify({
            connectionId,
            meta,
            when: Date.now()
        }),
        err => {
            if(err){
                console.log(err);
            }
        }
    )
};

Users.prototype.remove = function (googleId){
    this.client.hdel(
        'online',
        googleId,
        err => {
            if(err){
                console.log(err);
            }
        }
    );
};

Users.prototype.list = function(callback){
    //let active = []; array version
    let active2 = {}; // hash table version
    let i = 0;
    this.client.hgetall('online', (err, users) => {
        if(err){
            console.log(err);
            return callback([]);
        }

        for (let user in users){
            //active.push(JSON.parse(users[user])); array version
            active2[user] = JSON.parse(users[user]);
        }

        return callback(active2);
    })
}