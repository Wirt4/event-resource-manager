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
    },
    opening_night: {
        type: "Number",
        require: true
    }
})


export interface TheaterEventType {
    name: string;
    showtimes: string[];
    event_id: string;
    opening_night: number;
}

