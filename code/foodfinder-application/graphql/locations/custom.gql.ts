//don't like the magic numbers below

// provides the gql schema for the custom types
export default `
    directive @cacheControl(maxAge: Int) on FIELD_DEFINITION | OBJECT
    type Location @cacheControl(maxAge: 86400) {
        address: String
        street: String
        zipcode: String
        borough: String
        cuisine: String
        grade: String
        name: String
        on_wishlist: [String] @cacheControl(maxAge: 60)
        location_id: String
    }
`
