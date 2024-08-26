import mongoose, { ConnectOptions } from "mongoose"


function getURI(): string {
    const MONGO_URI = process.env.MONGO_URI || null
    if (MONGO_URI === null) {
        throw new Error("Please define the MONGO_URI environment variable(.env.local)")
    }
    return MONGO_URI
}

function getCached() {
    const cached = global.mongoose
    if (cached) {
        return cached
    }

    global.mongoose = { conn: null, promise: null }
    return global.mongoose
}

function cachedOptions(): ConnectOptions {
    return {
        bufferCommands: false,
        maxIdleTimeMS: 10000,
        serverSelectionTimeoutMS: 10000,
        socketTimeoutMS: 20000
    }
}

async function dbConnect(): Promise<any> {

    const MONGO_URI = getURI()

    let cached = getCached()
    if (cached.conn) {
        return cached.conn
    }

    if (cached.promise) {
        try {
            cached.conn = await cached.promise
        } catch (err) {
            throw new Error(String(err))
        }
        return cached.conn
    }

    const opts: ConnectOptions = cachedOptions()

    cached.promise = mongoose
        .connect(MONGO_URI, opts)
        .then((mongoose) => mongoose)
        .catch((err) => { throw new Error(String(err)) })

    try {
        cached.conn = await cached.promise
    } catch (err) {
        throw new Error(String(err))
    }

    return cached.conn
}

export default dbConnect
