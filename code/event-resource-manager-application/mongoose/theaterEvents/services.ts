import {TheaterEventType} from "@/mongoose/theaterEvents/schema";
import TheaterEvents from "mongoose/theaterEvents/model";

export async function findAllEvents(): Promise<TheaterEventType[] | []> {
    let events: TheaterEventType[] = []
    try{
        events = await TheaterEvents.find({}) as TheaterEventType[]
    }catch(error){
    }

    return events
}