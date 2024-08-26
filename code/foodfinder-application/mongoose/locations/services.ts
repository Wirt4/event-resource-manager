import { LocationType } from "mongoose/locations/schema"
import { FilterLocationType, FilterWishlistType } from "mongoose/locations/custom"
import Locations from "mongoose/locations/model"
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
    const filter = { location_id: location_id }
    return findLocations(filter)
}

//TODO: onuserwishlist

//TODO: update wishlist