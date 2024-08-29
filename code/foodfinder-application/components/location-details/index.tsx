import { LocationType } from "mongoose/locations/schema"

interface PropsInterface {
    location: LocationType
}

const LocationsList = function (location: LocationType): JSX.Element {
    return (<ul>
        <li>Address: {location.address}</li>
        <li>Zipcode: {location.zipcode}</li>
        <li>Borough: {location.borough}</li>
        <li>Cuisine: {location.cuisine}</li>
        <li>Grade: {location.grade}</li>
    </ul>)
}

const LocationDetail = function (props: PropsInterface): JSX.Element {
    const { location } = props
    return (<div>{location && (LocationsList(location))}</div>)
}

export default LocationDetail
