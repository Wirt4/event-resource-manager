export declare type FilterLocationType = {
    location_id: string | string[]
}

export declare type FilterWishlistType = {
    on_wishlist: {
        $in: string[]
    }
}

export interface UpdateWishlistInterface {
    user_id: string,
    location_id: string
}