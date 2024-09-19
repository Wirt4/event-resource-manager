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
            events = events.sort(function(eventA,eventB){
                // Turn your strings into dates, and then subtract them
                // to get a value that is either negative, positive, or zero.
                return new Date(eventA.showtimes[0]).valueOf() - new Date(eventB.showtimes[0]).valueOf()
            });

        }catch(error){
            console.error(error)
        }

        return events
    }

    async addEvent(event: newEvent): Promise<TheaterEventType>{
        const taggedEvent = {...event, event_id: this.hashId() }
        return theaterEvents.create(taggedEvent)
    }

    hashId(): String{
        return uuidv4()
    }
}