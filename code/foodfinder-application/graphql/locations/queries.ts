import { findAllLocations, findLocationById, onUserWishList } from "@/mongoose/locations/services"

export const locationQueries = {
    allLocations: async (_: any) => {
        return await findAllLocations()
    },
    //why is that param in-line?
    locationsById: async (_: any, param: { location_ids: string[] }) => {
        return await findLocationById(param.location_ids)
    },
    // likewise, why is that param type in-line?
    onUserWishlist: async (_: any, param: { user_id: string }) => {
        return await onUserWishList(param.user_id)
    }
}

