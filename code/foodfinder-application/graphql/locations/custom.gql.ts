//don't like the magic numbers below

// provides the gql schema for the custom types
const one_minute = 60
const twenty_four_hours = 86400
export default `
    directive @cacheControl(maxAge: Int) on FIELD_DEFINITION | OBJECT
    type Location @cacheControl(maxAge: ${twenty_four_hours}) {
        address: String
        street: String
        zipcode: String
        borough: String
        cuisine: String
        grade: String
        name: String
        on_wishlist: [String] @cacheControl(maxAge: ${one_minute})
        location_id: String
    }
`
