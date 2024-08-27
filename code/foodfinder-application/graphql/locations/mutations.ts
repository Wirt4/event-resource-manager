import { updateWishList } from "@/mongoose/locations/services"
//don't like these arrow funcitons. they're hard to follow
//does this interface belong in this file?
interface UpdateWishlistInterface {
    user_id: string,
    location_id: string
}

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