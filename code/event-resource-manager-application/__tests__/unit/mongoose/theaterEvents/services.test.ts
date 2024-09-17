import {EventServices} from "@/mongoose/theater_events/services"
import TheaterEvents from "@/mongoose/theater_events/model"

describe( 'findAllEvents()', () => {
    let services: EventServices
    beforeEach( () => {
        services = new EventServices()
    })
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

        const result = await services.findAllEvents()

        expect(result).toEqual(target_events)
    })
    test('empty set one', async ()=>{
        jest.spyOn(TheaterEvents, 'find').mockImplementationOnce(async () => [])

        const result = await services.findAllEvents()

        expect(result).toEqual([])
    })
    test('The model throws, return empty array', async()=>{
        jest.spyOn(TheaterEvents, 'find').mockImplementationOnce(async () => {throw 'I am Error'})

        const result = await services.findAllEvents()

        expect(result).toEqual([])
    })
    test('The model throws, Error is logged to console', async()=>{
        jest.spyOn(TheaterEvents, 'find').mockImplementationOnce(async () => {throw 'I am Error'})
        const spy = jest.spyOn(console, 'error')

        await services.findAllEvents()

        expect(spy).toHaveBeenCalledWith('I am Error')
    })
    test('confirm TheaterEvents.find() has been called with an empty object filer',async ()=>{
        const spy = jest.spyOn(TheaterEvents, 'find').mockImplementationOnce(async()=>[])
        await services.findAllEvents()
        expect(spy).toHaveBeenCalledWith({})
    })
})

describe('addEvent()', ()=>{
    let services: EventServices
    beforeEach( () => {
        services = new EventServices()
    })
    test('expect TheaterEvents.create() to have been called with a theater event', async ()=>{
        const event = {
            name: "Rio Bravo",
            showtimes: [
                '2024-10-11 19:00:00'
            ]
        }
        const spy = jest.spyOn(TheaterEvents, 'create').mockImplementationOnce(async()=>[])
        await services.addEvent(event)
        expect(spy).toHaveBeenCalledWith(expect.objectContaining(event))
    })
    test('expect TheaterEvents.create() to have been called with a theater event: Different data', async ()=>{
        const event = {
            name: "Cats",
            showtimes: [
                '2025-12-11 12:00:00'
            ]
        }
        const spy = jest.spyOn(TheaterEvents, 'create').mockImplementationOnce(async()=>[])
        await services.addEvent(event)
        expect(spy).toHaveBeenCalledWith(expect.objectContaining(event))
    })
})
