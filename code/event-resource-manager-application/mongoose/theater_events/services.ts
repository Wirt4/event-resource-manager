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

     sortShowtimes(showtimes: string[]): string[] {
        return showtimes.sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
    }

    async addEvent(event: newEvent): Promise<TheaterEventType>{
        event.showtimes = this.sortShowtimes(event.showtimes)
        const taggedEvent = {...event, event_id: this.hashId(), opening_night: new Date(event.showtimes[0]).getTime() }
        return this._theaterEvents.create(taggedEvent)
    }

    hashId(): String{
        return uuidv4()
    }
}