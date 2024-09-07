import { updateWishList } from "@/mongoose/locations/services"
import { UpdateWishlistInterface } from "@/mongoose/locations/custom"
import { actions } from "graphql/locations/enums/actions"
import {JWT} from "next-auth/jwt"
import {authGuards} from "@/middleware/auth-guards";
// for use in resolvers

interface contextInterface{
    token:JWT
}
export const locationMutations = {
    removeWishlist: async function (_: any,
        param: UpdateWishlistInterface,
                                    context: contextInterface) {
        const guard =authGuards(param, context)
        if (guard !== true){
            return guard
        }
        return updateWishList(param.location_id, param.user_id, actions.REMOVE)
    },

    addWishlist: async function (_: any, param: UpdateWishlistInterface, context: contextInterface) {
        const guard =authGuards(param, context)
        if (guard !== true){
            return guard
        }
        return updateWishList(param.location_id, param.user_id, actions.ADD)
    }
}
