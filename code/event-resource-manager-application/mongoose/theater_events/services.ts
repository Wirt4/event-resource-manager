import {TheaterEventType} from "@/mongoose/theater_events/schema";
import theaterEvents from "@/mongoose/theater_events/model";

export async function findAllEvents(): Promise<TheaterEventType[] | []> {
    console.log('find all events called')
    let events: TheaterEventType[] = []
    try{
        events = await theaterEvents.find({}) as TheaterEventType[]
    }catch(error){
        console.error(error)
    }

    return events
}