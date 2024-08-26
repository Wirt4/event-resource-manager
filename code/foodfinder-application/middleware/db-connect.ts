import mongoose, { ConnectOptions } from "mongoose"

const TEN_SECONDS = 10000
const TWENTY_SECONDS = 20000

function getURI(): string {
    const MONGO_URI = process.env.MONGO_URI || null
    if (MONGO_URI === null) {
        throw new Error("Please define the MONGO_URI environment variable(.env.local)")
    }
    return MONGO_URI
}

function getCached() {
    if (global?.mongoose) {
        return global.mongoose
    }

    global.mongoose = { conn: null, promise: null }
    return global.mongoose
}

function throwStringErr(err: any) {
    throw new Error(String(err))
}

async function setMongooseConnection(): Promise<any> {
    const MONGO_URI = getURI()
    const opts: ConnectOptions = {
        bufferCommands: false,
        maxIdleTimeMS: TEN_SECONDS,
        serverSelectionTimeoutMS: TEN_SECONDS,
        socketTimeoutMS: TWENTY_SECONDS
    }

    return mongoose.connect(MONGO_URI, opts);
}

async function dbConnect(): Promise<any> {
    let cached = getCached()
    if (cached.conn) {
        return cached.conn
    }

    if (!cached.promise) {
        try {
            cached.promise = await setMongooseConnection()
        } catch (err) {
            throwStringErr(err)
        }
    }
    try {
        cached.conn = await cached.promise
    } catch (err) {
        throwStringErr(err)
    }

    return cached.conn
}

export default dbConnect
