import dbConnect from "@/middleware/db-connect";
import { ApolloServer, BaseContext } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { resolvers } from "@/graphql/locations/resolvers";
import { typeDefs } from "@/graphql/schema"

const connectDB = function (fn: NextApiHandler) {
    return async function (req: NextApiRequest, res: NextApiResponse) {
        await dbConnect()
        return fn(req, res)
    }
}

//relies on TS's pass-by reference behavior with non-primitive objects
const setHeaders = function (res: NextApiResponse) {
    const post = "POST"
    res.setHeader("Allow", post)
    const access_control = "Access-Control-Allow"
    const wildcard = "*"
    res.setHeader(`${access_control}-Origin`, wildcard)
    res.setHeader(`${access_control}-Methods`, post)
    res.setHeader(`${access_control}-Headers`, wildcard)
    res.setHeader(`${access_control}-Credentials`, "true")
}

const allowCors = function (fn: NextApiHandler) {
    return async function (req: NextApiRequest, res: NextApiResponse) {
        setHeaders(res)
        return fn(req, res)
    }
}

const blank_token = async function () {
    return { token: {} }
}

const createHandler = function () {
    const server = new ApolloServer<BaseContext>({ resolvers, typeDefs })
    const options = {
        context: blank_token
    }

    return startServerAndCreateNextHandler(server, options)
}

export default connectDB(allowCors(createHandler()))
