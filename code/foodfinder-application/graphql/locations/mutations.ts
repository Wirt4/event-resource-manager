import { updateWishList } from "@/mongoose/locations/services"
import { UpdateWishlistInterface } from "@/mongoose/locations/custom"

enum actions {
    REMOVE = "remove",
    ADD = "add"

}

export const locationMutations = {
    removeWishlist: async function (_: any,
        param: UpdateWishlistInterface) {
        return updateWishList(param.location_id, param.user_id, actions.REMOVE)
    },

    addWishlist: async function (_: any, param: UpdateWishlistInterface) {
        return updateWishList(param.location_id, param.user_id, actions.ADD)
    }
}
