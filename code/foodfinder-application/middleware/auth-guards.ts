import {GraphQLError} from "graphql/error"
import {JWT} from "next-auth/jwt"

 interface paramInterface{
    user_id: string,
     location_id: string
 }

 interface contextInterface{
    token: JWT
 }

 export const authGuards =(param: paramInterface, context: contextInterface) => {
    if (!context || !context.token || !context.token.fdlst_private_userId) {
        return new GraphQLError("User is not authenticated",{
            extensions:{
                http:{status: 500},//TODO: can I give this a less useless status?
                code: "UNAUTHENTICATED"
            }
        })
    }
    if (context?.token?.fdlst_private_userId !== param.user_id){
        console.error({context})
        console.error({param})
        return new GraphQLError("User is not authorized",{
            extensions:{
                http:{status: 500},//TODO: can I give this a less useless status?
                code: "UNAUTHORIZED"
            }
        })
    }
    return true
 }