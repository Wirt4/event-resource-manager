import gql from "graphql-tag"
import locationTypeDefsCustom from "graphql/locations/schema/custom.gql"
import locationTypeDefsQueries from "@/graphql/locations/schema/queries.gql"
import locationTypeDefsMutations from "graphql/locations/schema/mutations.gql"

//graphql-tag transforms graphQL query into an abstract syntax tree readable by Apollo
export const typeDefs = gql`

${locationTypeDefsCustom}

type Query {
    ${locationTypeDefsQueries}
}
    
type Mutation {
    ${locationTypeDefsMutations}
}
    
`
