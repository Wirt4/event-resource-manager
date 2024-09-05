import {useSession} from "next-auth/react"
import {ReactElement, useEffect, useState} from "react"
import {LocationType} from "mongoose/locations/schema"
import Button from "components/button"
import styles from "./index.module.css"
import {ButtonVariant} from "@/components/button/enum-variant"

interface PropsInterface {
    location: LocationType
}

interface WishlistInterface{
    locationId: string,
    userId: string
}

interface WishlistButtonInterface {
    props: WishlistInterface,
    onWishlist: Boolean,
    loading: Boolean,
    wishlistAction: Function
}

enum WishlistAction{
    ADD= "addWishlist",
    REMOVE= "removeWishlist"
}

/**
 * Returns styled, unordered list of the contents of fields of one location
 * @param props
 */
function LocationsList (props: PropsInterface): ReactElement | null {
    const { location } = props
    return (location && <div>
        <ul className={styles.root}>
            <li><strong>Address:</strong> {location.address}</li>
            <li><strong>Zipcode:</strong> {location.zipcode}</li>
            <li><strong>Borough:</strong> {location.borough}</li>
            <li><strong>Cuisine:</strong> {location.cuisine}</li>
            <li><strong>Grade:</strong> {location.grade}</li>
        </ul>
    </div>)
}

/**
 * returns a string with the first letter capitalized
 * @param str
 */
function capitalizeFirstLetter (str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Returns GraphQL syntax for a mutation
 * the action is used to determine the mutation type
 * @param action
 */
function getMutation (action: string): string {
    return `
            mutation ${capitalizeFirstLetter(action)}($locationId: String!, $userId: String!) {
                ${action}(location_id: $locationId, user_id: $userId) {
                    address
                    street
                    zipcode
                    borough
                    cuisine
                    grade
                    name
                    on_wishlist
                    location_id
                }
            }   
            `
}

/**
 * Returns body of RequestInit based on props and action
 * @param props
 * @param action
 */
function getBody(props: WishlistInterface, action: string){
    const {locationId, userId} = props
    return JSON.stringify({
        query: getMutation(action),
        variables: {
            locationId,
            userId
        }
    });
}

/**
 * returns full RequestInit to pass to fetch() api
 * @param props
 * @param action
 */
function getFetchOptions (props: WishlistInterface, action: string): RequestInit{
    return ({
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: getBody(props, action)
    })
}

/**
 * returns Button that will either add or remove the location in props to or from the user's wishlist
 * @param props
 */
 function wishListButton(props: WishlistButtonInterface ): ReactElement | null{
    return(<Button
        variant={!props.onWishlist ? ButtonVariant.OUTLINE: ButtonVariant.BLUE}
        disabled={!!props.loading}
        clickHandler={() => props.wishlistAction(props.props)}
    >
        {props.onWishlist && <div>Remove from wishlist</div>}
        {!props.onWishlist && <div>Add to wishlist</div>}
    </Button>)
}

/**
 * Returns a formatted list of locations and a wishlist button based on the content of props
 * @param loading
 * @param onWishlist
 * @param setLoading
 * @param setOnWishlist
 * @returns async void Function that can be used as click handler
 */
function createClickHandler(loading:Boolean, onWishlist: Boolean, setLoading: Function, setOnWishlist: Function): Function{

    // param is props, wish list interface
    //void method
    // sets loading to true, invokes graphQL endpoint, then sets loading to false
    return async (props: WishlistInterface) => {
        if (loading) {
            return false
        }
        setLoading(true)
        const action = onWishlist ? WishlistAction.REMOVE : WishlistAction.ADD
        try {
            const result = await fetch("/api/graphql", getFetchOptions(props, action))
            if (result.status === 200) {
                setOnWishlist(action == WishlistAction.ADD)
            }
        } catch (error) {
            console.error({error})
        }
        setLoading(false)
    }
}

/**
 * invokes session data to make context-appropriate button
 * Button's action is to call mutation on graphql endpoint
 * @param props
 */
function ButtonElement(props: PropsInterface): ReactElement | null {
    const { location } = props
    const {data: session} = useSession()
    const [onWishlist, setOnWishlist] = useState<Boolean>(false)
    const [loading, setLoading] = useState<Boolean>(false)

    useEffect(()=>{
        const userId = session?.user.fdlist_private_userId
        setOnWishlist(
            !!(userId && location.on_wishlist.includes(userId))
        )
    }, [session])

    const wishlistAction = createClickHandler(loading, onWishlist, setLoading, setOnWishlist)

    return (<div>
        {session?.user.fdlst_private_userId && (wishListButton({
            props:{userId:session?.user.fdlst_private_userId, locationId: location.location_id},
            onWishlist: onWishlist,
            loading: loading,
            wishlistAction: wishlistAction
        }))}
    </div>)

}

/**
 * Returns a React element with a list of location properties at the top,
 * and an add/remove from wishlist button at the bottom
 *
 * If the user is not signed in, the wishlist button will not be visible
 * @param props
 * @constructor
 */
function LocationDetail (props: PropsInterface): ReactElement | null {
    return (<div>
        {LocationsList(props)}
        {ButtonElement(props)}
    </div>)
}

export default LocationDetail
