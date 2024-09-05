import Link from "next/link"
import styles from "./index.module.css"
import { LocationType } from "mongoose/locations/schema"
import {ReactElement} from "react";

interface PropsInterface {
    location: LocationType
}
/**
 * 
 * @param location 
 * @returns formatted one-line description of location
 */
function LocationDescription  (location: LocationType): ReactElement | null {
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
function LocationsListItem (props: PropsInterface): ReactElement | null {
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
