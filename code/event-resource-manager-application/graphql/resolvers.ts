declare interface EventInterface {
    name: string;
    showtimes: string[];
    event_id:string;
}

export const resolvers = {
    Mutation:{
        theaterEvents: async (_: any, param: {data: EventInterface})=>{
            return[ {
                name: "I'm Stu!",
                showtimes: [
                    '2024-10-11 19:00:00',
                    '2024-10-12 19:00:00',
                    '2024-10-13 15:00:00',
                    '2024-10-18 19:00:00',
                    '2024-10-19 19:00:00',
                    '2024-10-20 15:00:00'
                ],
                event_id: "56018",
            }]
        }
    },
    Query:{
        theaterEvents: async (_: any, param: {data: EventInterface})=>{
            return[ {
                name: "I'm Stu!",
                showtimes: [
                    '2024-10-11 19:00:00',
                    '2024-10-12 19:00:00',
                    '2024-10-13 15:00:00',
                    '2024-10-18 19:00:00',
                    '2024-10-19 19:00:00',
                    '2024-10-20 15:00:00'
                ],
                event_id: "56018",
            }]
        }
    }
}