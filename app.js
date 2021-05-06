const express = require('express');
const axios = require('axios');
const reponseTime = require('response-time');
const redis = require('redis');
const { promisify } = require('util');

const PORT = process.env.PORT || 3000;
const app = express();
app.use(reponseTime());

const redisClient = redis.createClient({
  host: '127.0.0.1',
  port: 6379
});

const GET_REDIS_ASYNC = promisify(redisClient.get).bind(redisClient);
const SET_REDIS_ASYNC = promisify(redisClient.set).bind(redisClient);

app.get('/with-redis-rockets', async (req, res, next) => {
  try {
    const getResultRedis = await GET_REDIS_ASYNC('rockets');
    if(getResultRedis){
      console.log('use cached data');
      return res.send(JSON.parse(getResultRedis));
    }
    const response = await axios.get('https://api.spacexdata.com/v3/rockets');
    const saveResultRedis = await SET_REDIS_ASYNC('rockets', JSON.stringify(response.data), 'EX', 10);
    console.log('new data cached ', saveResultRedis);
    return res.send(response.data);
  } catch (error) {
    return res.send(error.message);
  }
});

app.get('/without-redis-rockets', async (req, res, next) => {
  try {
    const response = await axios.get('https://api.spacexdata.com/v3/rockets');
    res.send(response.data);
  } catch (error) {
    res.send(error.message);
  }
});

app.listen(PORT, ()=> {
  console.log(` 😀 server on port ${PORT}  `);
});
