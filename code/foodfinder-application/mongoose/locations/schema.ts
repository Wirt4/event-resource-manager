import { Schema, InferSchemaType } from "mongoose"

const schema_spec = {
    address: {
        type: "String",
        required: true
    },
    street: {
        type: "String",
        required: true
    },
    zipcode: {
        type: "String",
        required: true
    },
    borough: {
        type: "String",
        required: true
    },
    cuisine: {
        type: "String",
        required: true
    },
    grade: {
        type: "String",
        required: true
    },
    name: {
        type: "String",
        required: true
    },
    on_wishlist: {
        type: ["String"],
        required: true
    },
    location_id: {
        type: "String",
        required: true
    }
}
export const LocationSchema: Schema = new Schema<LocationType>(schema_spec)
export declare type LocationType = InferSchemaType<typeof LocationSchema>
