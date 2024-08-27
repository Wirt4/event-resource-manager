import dbConnect from "@/middleware/db-connect";
import { ApolloServer, BaseContext } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { resolvers } from "@/graphql/locations/resolvers";
import { typeDefs } from "@/graphql/schema"
//TODO: pick a lane - arrow functions or standard def functions
const server = new ApolloServer<BaseContext>({ resolvers, typeDefs })
const blank_token = async function () {
    return { token: {} }
}
const options = {
    context: blank_token
}
//separate data from functionality here
const handler = startServerAndCreateNextHandler(server, options)
//is allowCors itself async? what gives here?
const allowCors =
    (fn: NextApiHandler) => async (req: NextApiRequest, res: NextApiResponse) => {
        res.setHeader("Allow", "POST")
        res.setHeader("Access-Control-Allow-Origin", "*")
        res.setHeader("Access-Control-Allow-Methods", "POST")
        res.setHeader("Access-Control-Allow-Headers", "*")
        res.setHeader("Access-Control-Allow-Credentials", "true")
        return await fn(req, res)
    }

const connectDB = (fn: NextApiHandler) => async (req: NextApiRequest, res: NextApiResponse) => {
    await dbConnect()
    return await fn(req, res)
}

export default connectDB(allowCors(handler))
