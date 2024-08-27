import { locationQueries } from "@/graphql/locations/queries"
import { locationMutations } from "@/graphql/locations/mutations"

//packages locationQueries and location Mutations into a parameter consumable by an Apollo server
export const resolvers = { Query: { ...locationQueries }, Mutation: { ...locationMutations } }
