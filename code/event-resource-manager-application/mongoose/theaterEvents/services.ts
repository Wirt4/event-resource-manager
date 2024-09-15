import {TheaterEventType} from "@/mongoose/theaterEvents/schema";
import theaterEvents from "mongoose/theaterEvents/model";

export async function findAllEvents(): Promise<TheaterEventType[] | []> {
    let events: TheaterEventType[] = []
    try{
        events = await theaterEvents.find({}) as TheaterEventType[]
    }catch(error){
        console.error(error)
    }

    return events
}