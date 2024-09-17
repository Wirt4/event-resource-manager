import gql from "graphql-tag"

export const typeDefs = gql`

    type TheaterEventType {
        name: String!
        event_id: String!
        showtimes: [String]!
    }
    
    input QueryInput {
        name: String
        event_id: String
        showtimes: [String]
    }
    
    input AddTheaterEventInput {
        name: String!
        event_id: ID!
        showtimes: [String!]!
       }
    
    type Mutation {
        addTheaterEvent(data: AddTheaterEventInput!): TheaterEventType!
    }
    
    type Query {
        getAllTheaterEvents(data: QueryInput):[TheaterEventType]!
    }
    
`
