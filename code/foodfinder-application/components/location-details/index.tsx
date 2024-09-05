import { LocationType } from "mongoose/locations/schema"
import styles from "./index.module.css"

import {useSession} from "next-auth/react"
import {ReactElement, useEffect, useState} from "react"
import Button from "components/button"

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

enum ButtonVariant{
    OUTLINE ="outline",
    BLUE = "blue"
}

const locationsList = function (location: LocationType): ReactElement | null {
    return (<ul className={styles.root}>
        <li><strong>Address:</strong> {location.address}</li>
        <li><strong>Zipcode:</strong> {location.zipcode}</li>
        <li><strong>Borough:</strong> {location.borough}</li>
        <li><strong>Cuisine:</strong> {location.cuisine}</li>
        <li><strong>Grade:</strong> {location.grade}</li>
    </ul>)
}

const capitalizeFirstLetter = function (str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

const getMutation = function(action: string): string {
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

const getBody = function(props: WishlistInterface, action: string){
    const {locationId, userId} = props
    return JSON.stringify({
        query: getMutation(action),
        variables: {
            locationId,
            userId
        }
    });
}

const getFetchOptions = function (props: WishlistInterface, action: string){
    return ({
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: getBody(props, action)
    })
}

const wishListButton = function (props: WishlistButtonInterface ): ReactElement | null{
    return(<Button
        variant={!props.onWishlist ? ButtonVariant.OUTLINE: ButtonVariant.BLUE}
        disabled = {!!props.loading}
        clickHandler={() => props.wishlistAction(props.props)}
    >
        {props.onWishlist && <div>Remove from wishlist</div>}
        {!props.onWishlist && <div>Add to wishlist</div>}
    </Button>)
}

const LocationDetail = function (props: PropsInterface): ReactElement | null {
    const {data: session} = useSession()
    const [onWishlist, setOnWishlist] = useState<Boolean>(false)
    const [loading, setLoading] = useState<Boolean>(false)

    useEffect(()=>{
        const userId = session?.user.fdlist_private_userId
        setOnWishlist(
            !!(userId && location.on_wishlist.includes(userId))
        )
    }, [session])

    const wishlistAction = async (props: WishlistInterface)=>{
        if (loading) {
            return false
        }
        setLoading(true)
        const action = onWishlist? WishlistAction.REMOVE : WishlistAction.ADD
        try{
            const result = await fetch("/api/graphql", getFetchOptions(props, action))
            if (result.status === 200){
                setOnWishlist(action == WishlistAction.ADD)
            }
        }catch(error){
            console.error({error})
        }
        setLoading(false)
    }

    const { location } = props
    return (<div>
        {location && (locationsList(location))}
        {session?.user.fdlst_private_userId && (wishListButton({
            props:{userId:session?.user.fdlst_private_userId, locationId: location.location_id},
            onWishlist: onWishlist,
            loading: loading,
            wishlistAction: wishlistAction
        }))}
    </div>)
}

export default LocationDetail
