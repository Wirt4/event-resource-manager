import EventDetails from "@/components/event-details";
import {ReactElement} from "react";

describe('Event Details Component', () => {

    test('data set 1, the title should be in a <p> tag',()=>{
        const e = {
            name:"The Cabinet of Dr Caligari",
            showtimes: ["2024-10-31 20:00:00"],
            event_id: '12345'
        }


        const result = EventDetails({event: e})
        const elements = result?.props.children

        expect(elements[0]).toEqual(expect.objectContaining({type: 'p', props:{children: 'The Cabinet of Dr Caligari'}}))
    })

    test('data set 2, the title should be in a <p> tag',()=>{
        const e = {
            name:"The Breakfast Club",
            showtimes: ["2021-01-01 10:00:00"],
            event_id: '1989'
        }

        const result = EventDetails({event: e})
        const elements = result?.props.children

        expect(elements[0]).toEqual(expect.objectContaining({type: 'p', props:{children: "The Breakfast Club"}}))
    })

    test("the element under the title should be showtimes", ()=>{
        const e = {
            name:"The Breakfast Club",
            showtimes: ["2021-01-01 10:00:00"],
            event_id: '1989'
        }

        const result = EventDetails({event: e})
        const elements = result?.props.children
        console.log(elements)

        expect(elements[1]).toEqual(expect.objectContaining({type: 'p', props:{children: "Showtimes:"}}))
    })

    test("Final element should be an unordered list", ()=>{
        const e = {
            name:"The Breakfast Club",
            showtimes: ["2021-01-01 10:00:00"],
            event_id: '1989'
        }

        const result = EventDetails({event: e})
        const elements = result?.props.children
        console.log(elements)

        expect(elements[2]).toEqual(expect.objectContaining({type: 'ul'}))
    })

    test("unorderd list should be of length one", ()=>{
        const e = {
            name:"The Breakfast Club",
            showtimes: ["2021-01-01 10:00:00"],
            event_id: '1989'
        }

        const result = EventDetails({event: e})

        expect(result?.props.children[2].props.children.length).toEqual(1);
    })

    test('multiple showtimes, expect the unorderd list to have three elements',()=>{
        const e = {
            name:"Groundhog Day",
            showtimes: ["2024-02-02 10:00:00",
                "2024-02-02 12:00:00",
                "2024-02-02 15:45:00",
                "2024-02-02 20:15:00",
            ],
            event_id: '7890'
        }
        const result = EventDetails({event: e});
        console.log(result?.props.children[2].props.children)
        expect(result?.props.children[2].props.children.length).toEqual(4);
    })
})