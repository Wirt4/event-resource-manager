import { updateWishList } from "@/mongoose/locations/services"
//don't like these arrow funcitons. they're hard to follow
//does this interface belong in this file?
interface UpdateWishlistInterface {
    user_id: string,
    location_id: string
}

export const locationMutations = {
    removeWishlist: async (_: any,
        param: UpdateWishlistInterface
    ) => {
        return await updateWishList(param.location_id, param.user_id, "remove")
    },

    addWishlist: async (_: any, param: UpdateWishlistInterface) => {
        return await updateWishList(param.location_id, param.user_id, "add")
    }
}