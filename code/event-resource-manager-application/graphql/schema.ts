import gql from "graphql-tag"

export const typeDefs = gql`

    type TheaterEventType {
        name: String!
        event_id: String!
        showtimes: [String]!
    }
    
    input TheaterEventInput {
        name: String!
        event_id: String!
        showtimes: [String]
    }
    
    type Mutation {
        theaterEvents(data: TheaterEventInput):[TheaterEventType]!
    }
    
    type Query {
        theaterEvents(name: String, event_id: String):[TheaterEventType]!
    }
    
`
