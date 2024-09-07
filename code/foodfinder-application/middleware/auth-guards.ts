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

 function FourOhOne(authType: string): GraphQLError{
    return new GraphQLError(`User is not ${authType}`,{
        extensions:{
            http:{status: 401},
            code: `UN${authType.toUpperCase()}`
        }
    })
 }

 export function authGuards (param: paramInterface, context: contextInterface):boolean{
    if (!isAuthenticated(context)) {
        throw FourOhOne('authenticated')
    }
    if (!isAuthorized(param, context)){
        throw FourOhOne('authorized')
    }
    return true
 }