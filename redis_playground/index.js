const Redis = require('ioredis');
const config = {
    port: 6379, 
    host: "92.118.188.216"
    // password: '296675700'
}


const redis = new Redis(6379, "92.118.188.216");

// redis.set("hostname",'localhost');

redis.get('hostname', (err, result) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log(result);
    }
})