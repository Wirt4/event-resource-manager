import {EventServices} from "@/mongoose/theater_events/services";

declare interface EventInterface {
    data: {
        name: string;
        showtimes: string[];
        event_id: string;
    }
}

const services = new EventServices()

export const resolvers = {
    Query:{
        getAllTheaterEvents: async (_: any)=>{
            return await services.findAllEvents();
        }
    },
    Mutation:{
        addTheaterEvent: async (_: any, {data}:  EventInterface)=>{
            return services.addEvent(data)
        }
    }
}