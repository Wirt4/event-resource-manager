import { Schema } from "mongoose"

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


export interface TheaterEventType {
    name: string;
    showtimes: string[];
    event_id: string;
}

