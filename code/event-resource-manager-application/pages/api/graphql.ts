import dbConnect from "@/middleware/db-connect";
import { ApolloServer, BaseContext } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { resolvers } from "@/graphql/resolvers"
import { typeDefs } from "@/graphql/schema"
import {getToken} from "next-auth/jwt";

/**
 * calls dbConnect before calling the argument.
 * 
 * @param fn : n apiNextHandler
 * @returns asynchronous function 
 */
function connectDB (fn: NextApiHandler) {
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
function setHeaders (res: NextApiResponse) {
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
 * @param handler : a Nextapi Handler, callable like a method
 * @returns an asynchronous function 
 */
function allowCors (handler: NextApiHandler) {
    return async function (req: NextApiRequest, res: NextApiResponse) {
        setHeaders(res)
        return handler(req, res)
    }
}

/**
 * For passing the JWT to the request to graphql endpoint
 * @param req
 */
async function contextToken  (req: NextApiRequest,)  {
    const token = await getToken({req})
    return {token}
}


/**
 * 
 * @returns a handler for connecting NextApi with Apollo server
 */
function createHandler () {
    const foo ="bar"
    const server = new ApolloServer<BaseContext>({ resolvers, typeDefs })
    return startServerAndCreateNextHandler(server, {context: contextToken})
}

export default connectDB(allowCors(createHandler()))
