import {ReactElement} from "react";

import {TheaterEventType} from "@/mongoose/theater_events/schema";
import EventDetail from "@/components/event-details";
interface PropsInterface {
    events: TheaterEventType[]
}
export default function EventList (props: PropsInterface): ReactElement | null {
    const {events} =  props
    let i =-1
    return <ul>
        {events.map(e=>{
            i++
            return (<li key={i}><EventDetail event={e}/></li>)
    })}
    </ul>
}
