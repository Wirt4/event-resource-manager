import dbConnect from "@/middleware/db-connect";
import { ApolloServer, BaseContext } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { resolvers } from "@/graphql/locations/resolvers";
import { typeDefs } from "@/graphql/schema"
import {getToken} from "next-auth/jwt";

/**
 * calls dbConnect before calling the argument.
 * 
 * @param fn : n apiNextHandler
 * @returns asynchronous function 
 */
const connectDB = function (fn: NextApiHandler) {
    return async function (req: NextApiRequest, res: NextApiResponse) {
        await dbConnect()
        return fn(req, res)
    }
}
/**
 * sets the Access Control headers
 * @param res  a NextApiResponse
 * behavior is pass-by-reference
 * res is mutated to set Allo and Access-Control-Allow headers
 */
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

/**
 * sets the headers before calling the argument
 * @param handler : a Nextapi Handler, callable liek a method
 * @returns an asynchronous function 
 */
const allowCors = function (handler: NextApiHandler) {
    return async function (req: NextApiRequest, res: NextApiResponse) {
        setHeaders(res)
        return handler(req, res)
    }
}
/**
 * 
 * @returns boilerplate empty token
 */
const blank_token = async function () {
    return { token: {} }
}

/**
 * 
 * @returns a handler for connecting NextApi with Apollo server
 */
const createHandler = function () {
    const server = new ApolloServer<BaseContext>({ resolvers, typeDefs })

    return startServerAndCreateNextHandler(server, {context: async(req: NextApiRequest)=>{
        const token = await getToken({req})
            return {token}
        }})
}

export default connectDB(allowCors(createHandler()))
