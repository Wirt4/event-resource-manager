import {ReactElement} from "react";
import {TheaterEventType} from "@/mongoose/theater_events/schema"
import ShowtimeListItem from "@/components/showtime-list"
interface TheaterEventPropsInterface {
    event: TheaterEventType
}

function mappingFunction(showtime: string): ReactElement{
    return <ShowtimeListItem showtime={showtime} key={showtime}/>
}

function EventDetail (props: TheaterEventPropsInterface): ReactElement | null {
    const {event}  = props
    let i = -1
    return (event &&
        <div>
            <p>{event.name}</p>
            <p>Showtimes:</p>
            <ul>
                {event.showtimes.map(s => mappingFunction(s))}
            </ul>
        </div>)
}

export default EventDetail