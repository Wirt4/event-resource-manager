import {TheaterEventType} from "@/mongoose/theater_events/schema";
import {v4 as uuidv4} from 'uuid';
import theaterEvents from "@/mongoose/theater_events/model";

interface newEvent {
    name: string;
    showtimes: string[];
}

export class EventServices{
    async findAllEvents(): Promise<TheaterEventType[] | []> {
        let events: TheaterEventType[] = []
        try{
            events = await theaterEvents.find({}) as TheaterEventType[]
        }catch(error){
            console.error(error)
        }

        return events
    }

    async  addEvent(event: newEvent): Promise<void>{
        const taggedEvent = {...event, event_id: this.hashId() }
        return theaterEvents.create(taggedEvent)
    }

    hashId(): String{
        return uuidv4()
    }
}