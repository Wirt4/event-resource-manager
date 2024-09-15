
async function dbConnect(): Promise<any> {
       if (!process?.env?.MONGO_URI) {throw new Error('Please define the MONGO_URI environment variable (.env.local)')}
}

export default dbConnect