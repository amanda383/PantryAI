import { Redis } from "ioredis";
require('dotnet').config();

const redisClient = () =>{
    if(process.env.Redis_URL){
        console.log(`Redis connected`)
        return process.env.Redis_URL
    }
    throw new Error('Redis connection failed')
}
export const redis = new Redis(redisClient())