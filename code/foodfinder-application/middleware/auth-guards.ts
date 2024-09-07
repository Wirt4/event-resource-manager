import {GraphQLError} from "graphql/error"
import {JWT} from "next-auth/jwt"

 interface paramInterface{
    user_id: string,
     location_id: string
 }

 interface contextInterface{
    token: JWT
 }

 function isAuthenticated(context: contextInterface):boolean{
    return !!(context && context.token && context.token.fdlst_private_userId)
 }

 function isAuthorized(param: paramInterface, context: contextInterface){
     return param.user_id === context?.token?.fdlst_private_userId
 }

 export function authGuards (param: paramInterface, context: contextInterface): GraphQLError | boolean{
    if (!isAuthenticated(context)) {
        return new GraphQLError("User is not authenticated",{
            extensions:{
                http:{status: 401},
                code: "UNAUTHENTICATED"
            }
        })
    }
    if (!isAuthorized(param, context)){
        return new GraphQLError("User is not authorized",{
            extensions:{
                http:{status: 401},
                code: "UNAUTHORIZED"
            }
        })
    }
    return true
 }