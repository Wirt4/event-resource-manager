import { updateWishList } from "@/mongoose/locations/services"
import { UpdateWishlistInterface } from "@/mongoose/locations/custom"

export const locationMutations = {
    removeWishlist: async function (_: any,
        param: UpdateWishlistInterface) {
        return updateWishList(param.location_id, param.user_id, "remove")
    },

    addWishlist: async function (_: any, param: UpdateWishlistInterface) {
        return updateWishList(param.location_id, param.user_id, "add")
    }
}
