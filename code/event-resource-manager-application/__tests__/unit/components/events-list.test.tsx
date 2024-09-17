import EventList from "@/components/event-list";


describe('Events List Component Tests', ()=>{
    test('object type should be an unordered list',()=>{
        const result = EventList({events:[]})
        expect(result).toEqual(expect.objectContaining({type:'ul'}))
    })
    test('event details should be called with the guts of an event',()=>{
       const event = {
            name: "Vintage Hitchcock",
                showtimes: [
            '2024-10-11 19:00:00',
            '2024-10-12 19:00:00',
            '2024-10-13 15:00:00',
            '2024-10-18 19:00:00',
            '2024-10-19 19:00:00',
            '2024-10-20 15:00:00'
        ],
            event_id: "56018",
        }

        const result = EventList({events:[event]})

        expect(result?.props.children[0].props.children.props.event).toStrictEqual(event)
    })
    test('event details should be called with the guts of an event, case 2',()=>{
        const event = {
            name: "The Barkleys of Broadway",
            showtimes: [
                '1956-10-11 19:00:00',
            ],
            event_id: "1789",
        }

        const result = EventList({events:[event]})

        expect(result?.props.children[0].props.children.props.event).toStrictEqual(event)
    })
    test('return from method is 2 entries long, list should have those entries',()=>{
        const event1 = {
            name: "Vintage Hitchcock",
            showtimes: [
                '2024-10-11 19:00:00',
                '2024-10-12 19:00:00',
                '2024-10-13 15:00:00',
                '2024-10-18 19:00:00',
                '2024-10-19 19:00:00',
                '2024-10-20 15:00:00'
            ],
            event_id: "56018",
        }
        const event2 = {
            name: "The Barkleys of Broadway",
            showtimes: [
                '1956-10-11 19:00:00',
            ],
            event_id: "1789",
        }

        const result = EventList({events:[event1, event2]})

        expect(result?.props.children.length).toEqual(2)

    })
})
