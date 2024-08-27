import dbConnect from "@/middleware/db-connect";
import { ApolloServer, BaseContext } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
const server = new ApolloServer<BaseContext>({ resolvers, typeDefs })
const handler = startServerAndCreateNextHandler(server, {
    context: async () => {
        const token = {}
        return { token }
    }
})

const allowCors =
    (fn: NextApiHandler) => async (req: NextApiRequest, res: NextApiResponse) => {
        return await fn(req, res)
    }

const connectDB = (fn: NextApiHandler) => async (req: NextApiRequest, res: NextApiResponse) => {
    await dbConnect()
    return await fn(req, res)
}

export default connectDB(allowCors(handler))