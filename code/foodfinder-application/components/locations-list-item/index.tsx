import Link from "next/link"
import styles from "./index.module.css"
import { LocationType } from "mongoose/locations/schema"

interface PropsInterface {
    location: LocationType
}
/**
 * 
 * @param loc a location
 * @returns formatted one-line description of location
 */
const LocationDescription = function (location: LocationType): JSX.Element {
    return (<h2>
        {location.name}
        <small className={styles.details}>
            {location.cuisine} in {location.borough}
        </small>
    </h2>)
}
/**
 * 
 * @param props 
 * @returns div with a link with the text "{location_name}: {location.cuisine} in {location.borough}"
 */
const LocationsListItem = function (props: PropsInterface): JSX.Element {
    const location = props.location
    return (
        <div>
            {location && (
                <li className={styles.root}>
                    <Link href={`/location/${location.location_id}`}>
                        {LocationDescription(location)}
                    </Link>
                </li>
            )}
        </div>
    )
}

export default LocationsListItem
