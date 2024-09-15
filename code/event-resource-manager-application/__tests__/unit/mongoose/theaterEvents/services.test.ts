import {findAllEvents} from "@/mongoose/theaterEvents/services"
import TheaterEvents from "mongoose/theaterEvents/model"

describe( 'findAllEvents()', () => {
    test('non empty set one', async ()=>{
        const target_events = [{
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
        }]
        jest.spyOn(TheaterEvents, 'find').mockImplementationOnce(async () => target_events)

        const result = await findAllEvents()

        expect(result).toEqual(target_events)
    })
    test('empty set one', async ()=>{
        jest.spyOn(TheaterEvents, 'find').mockImplementationOnce(async () => [])

        const result = await findAllEvents()

        expect(result).toEqual([])
    })
    test('The model throws, return empty array', async()=>{
        jest.spyOn(TheaterEvents, 'find').mockImplementationOnce(async () => {throw 'I am Error'})

        const result = await findAllEvents()

        expect(result).toEqual([])
    })
    test('confirm TheaterEvents.find() has been called with an empty object filer',async ()=>{
        const spy = jest.spyOn(TheaterEvents, 'find').mockImplementationOnce(async()=>[])
        await findAllEvents()
        expect(spy).toHaveBeenCalledWith({})
    })
})
