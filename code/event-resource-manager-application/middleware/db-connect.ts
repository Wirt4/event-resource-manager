import mongoose from "mongoose";

async function dbConnect(): Promise<any> {
       if (!process?.env?.MONGO_URI) {throw new Error('Please define the MONGO_URI environment variable (.env.local)')}
       if (global?.mongoose?.conn){
              return global.mongoose.conn
       }

       await mongoose.connect('foo')

}

export default dbConnect