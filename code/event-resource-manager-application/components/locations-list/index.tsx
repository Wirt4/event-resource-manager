import LocationsListItem from "../locations-list-item"
import { LocationType } from "mongoose/locations/schema"
import {ReactElement} from "react"
import styles from "./index.module.css"

interface PropsInterface {
    locations: LocationType[]
}

/**
 * Returns an unordered list where each entry is a LocationsListItem
 * the locations data is passed in props
 * @param props
 * @constructor
 */
function LocationsList (props: PropsInterface): ReactElement | null {
    return (
        <ul className={styles.root}>
            {props.locations.map((location) => {
                return (
                    <LocationsListItem
                        location={location}
                        key={location.location_id}
                    />
                )
            })}
        </ul>
    )
}

export default LocationsList
