import { LocationsByIdInterface, OnUserWishlistInterface } from "@/mongoose/locations/custom"
import { findAllLocations, findLocationById, onUserWishList } from "@/mongoose/locations/services"

export const locationQueries = {
    allLocations: async function (_: any) {
        return findAllLocations()
    },

    locationsById: async function (_: any, param: LocationsByIdInterface) {
        return findLocationById(param.location_ids)
    },

    onUserWishlist: async function (_: any, param: OnUserWishlistInterface) {
        return onUserWishList(param.user_id)
    }
}
