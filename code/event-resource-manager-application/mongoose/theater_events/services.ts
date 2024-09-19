import {TheaterEventType} from "@/mongoose/theater_events/schema";
import {v4 as uuidv4} from 'uuid';
import {Model} from "mongoose";

interface newEvent {
    name: string;
    showtimes: string[];
}

export class EventServices{
    _theaterEvents: Model<any>
    constructor(theaterEvents: Model<any>) {
        this._theaterEvents = theaterEvents
    }
    async findAllEvents(): Promise<TheaterEventType[] | []> {
        let events: TheaterEventType[] = []
        try{
            events = await this._theaterEvents.find({}).sort({opening_night: 1}) as TheaterEventType[]
        }catch(error){
            console.error(error)
        }

        return events
    }

    async addEvent(event: newEvent): Promise<TheaterEventType>{
        const taggedEvent = {...event, event_id: this.hashId() }
        return this._theaterEvents.create(taggedEvent)
    }

    hashId(): String{
        return uuidv4()
    }
}