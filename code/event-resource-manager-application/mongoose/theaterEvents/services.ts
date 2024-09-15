import {TheaterEventType} from "@/mongoose/theaterEvents/schema";
import TheaterEvents from "mongoose/theaterEvents/model";

export async function findAllEvents(): Promise<TheaterEventType[] | []> {
    return TheaterEvents.find()
}