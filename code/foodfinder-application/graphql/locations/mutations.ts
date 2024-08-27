import { updateWishList } from "@/mongoose/locations/services"
import { UpdateWishlistInterface } from "@/mongoose/locations/custom"

class LocationMutations {
    async removeWishlist(_: any,
        param: UpdateWishlistInterface) {
        return updateWishList(param.location_id, param.user_id, "remove")
    }

    async addWishlist(_: any, param: UpdateWishlistInterface) {
        return updateWishList(param.location_id, param.user_id, "add")
    }
}

export const locationMutations = new LocationMutations()
