import { LocationType } from "mongoose/locations/schema"
import styles from "./index.module.css"

import {useSession} from "next-auth/react"
import { useEffect, useState} from "react"
import Button from "components/button"

interface PropsInterface {
    location: LocationType
}

interface WishlistInterface{
    locationId: string,
    userId: string
}

const LocationsList = function (location: LocationType): JSX.Element {

    return (<ul className={styles.root}>
        <li><strong>Address:</strong> {location.address}</li>
        <li><strong>Zipcode:</strong> {location.zipcode}</li>
        <li><strong>Borough:</strong> {location.borough}</li>
        <li><strong>Cuisine:</strong> {location.cuisine}</li>
        <li><strong>Grade:</strong> {location.grade}</li>
    </ul>)
}

const LocationDetail = function (props: PropsInterface): JSX.Element {
    const {data: session} = useSession()
    const [onWishlist, setOnWishlist] = useState<Boolean>(false) //look up this kind of weird variable delcaration
    const [loading, setLoading] = useState<Boolean>(false)

    useEffect(()=>{
        let userId = session?.user.fdlist_private_userId
        setOnWishlist(
            userId && location.on_wishlist.includes(userId) ? true: false
        )
    }, [session])

    const wishlistAction = (props: WishlistInterface)=>{
        const {locationId, userId} = props
        if (loading) {return false}
        setLoading(true)
        let action = !onWishlist? "addWishlist" : "removeWishlist"
        const addWishlistMutation = `
            mutation AddWishlist($locationId: String!, $userId: String!) {
                addWishlist(location_id: $locationId, user_id: $userId) {
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
        const body =  JSON.stringify({
            query: addWishlistMutation,
            variables: {
                locationId,
                userId
            }
        });
        fetch("/api/graphql",{
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: body
            })
            .then((result)=>{
            if (result.status === 200){
                setOnWishlist(action === "addWishlist"? true: false)
            }
        }).catch(err=>{
            console.error({err})
        }).finally(()=>{
            setLoading(false)
        })
    }
    const { location } = props
    return (<div>
        {location && (LocationsList(location))}
        {session?.user.fdlst_private_userId && (
            <Button
            variant={!onWishlist ? "outline": "blue"}
            disabled = {loading? true: false}
            clickHandler={() => wishlistAction({
                locationId: location.location_id,
                userId: session?.user.fdlst_private_userId
            })}
           >
            {onWishlist && <div>Remove from wishlist</div>}
            {!onWishlist && <div>Add to wishlist</div>}
        </Button>
        )}
    </div>)
}

export default LocationDetail
