import { LocationType } from "mongoose/locations/schema"
import styles from "./index.module.css"

interface PropsInterface {
    location: LocationType
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
    const { location } = props
    return (<div>{location && (LocationsList(location))}</div>)
}

export default LocationDetail
