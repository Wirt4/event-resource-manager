import mongoose from "mongoose";

async function dbConnect(): Promise<any> {
       if (!process?.env?.MONGO_URI) {
              throw new Error('Please define the MONGO_URI environment variable (.env.local)')
       }

       let cached = global.mongoose

       if (!cached) cached = global.mongoose = {conn: null, promise: null}

       if (cached?.conn){
              return cached.conn
       }

       if (!cached?.promise) {
              global.mongoose.promise = mongoose.connect(process.env.MONGO_URI, {
                     bufferCommands: false,
                     maxIdleTimeMS: 10000,
                     serverSelectionTimeoutMS: 10000,
                     socketTimeoutMS: 20000,
              })
       }

       cached.conn = await cached.promise
       global.mongoose = cached
       return cached.conn
}

export default dbConnect