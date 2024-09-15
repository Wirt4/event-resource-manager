import { Schema, InferSchemaType } from "mongoose"

export const TheaterEventSchema : Schema = new Schema<TheaterEventType>({
    name:{
        type:"String",
        required: true
    },
    showtimes:{
        type: ["String"],
        required: true
    },
    event_id:{
        type:"String",
        required: true
    }
})

export declare type TheaterEventType = InferSchemaType<typeof TheaterEventSchema>

