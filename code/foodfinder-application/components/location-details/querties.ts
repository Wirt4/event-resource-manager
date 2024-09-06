import { gql } from '@apollo/client';

export const TOGGLE_WISHLIST = gql`
  mutation ToggleWishlist($id: ID!, $add: Boolean!) {
    toggleWishlist(id: $id, add: $add) {
      success
    }
  }
`
