import { LocationType } from "mongoose/locations/schema"
import { FilterLocationType, FilterWishlistType } from "mongoose/locations/custom"
import Locations from "mongoose/locations/model"
import { QueryOptions } from "mongoose"

export async function findAllLocations(): Promise<LocationType[] | []> {
    const filter = {}
    return findLocations(filter)
}

async function findLocations(filter: FilterLocationType | FilterWishlistType | {}): Promise<LocationType[] | []> {
    try {
        const result = await Locations.find(filter)
        return result as LocationType[]
    } catch (err) {
        console.error({ err })
    }
    return []
}

export async function findLocationById(location_id: string[]): Promise<LocationType[] | []> {
    const filter = { location_id }
    return findLocations(filter)
}

export async function onUserWishList(user_id: string): Promise<LocationType[] | []> {
    const filter: FilterWishlistType = {
        on_wishlist: {
            $in: [user_id]
        }
    }
    return findLocations(filter)
}

export async function updateWishList(location_id: string, user_id: string, action: string): Promise<LocationType | {} | null> {
    const filter = { location_id }
    const options: QueryOptions = { upsert: true, returnDocument: "after" }
    const user_filter = { on_wishlist: user_id }
    let update = {}

    switch (action) {
        case "add":
            update = { $push: user_filter }
            break
        case "remove":
            update = { $pull: user_filter }
            break
        default:
            throw new Error("action is neither ADD nor REMOVE")
    }
    try {
        return Locations.findOneAndUpdate(filter, update, options)
    } catch (err) {
        console.error({ err })
    }
    return {}
}