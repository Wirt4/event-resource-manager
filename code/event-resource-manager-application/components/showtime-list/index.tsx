import {ReactElement} from "react";

interface ShowTimeListItemPropsInterface{
    showtime: string
}

function formatTime(date: Date): String{
    const d = date.toLocaleTimeString('en-US').split(' ')
    return `${d[0].slice(0, -3)} ${d[1].toLowerCase()}`
}

function formatDate(date: Date): String{
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    return `${monthNames[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()} ${formatTime(date)}`
}

export default function ShowtimeListItem(props: ShowTimeListItemPropsInterface): ReactElement{
    const {showtime} = props
    const formattedTime =formatDate(new Date(showtime))
    return <li>{showtime &&(formattedTime)}</li>
}