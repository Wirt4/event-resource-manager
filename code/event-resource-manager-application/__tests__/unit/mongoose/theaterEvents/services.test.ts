import {EventServices} from "@/mongoose/theater_events/services"
import TheaterEvents from "@/mongoose/theater_events/model"
import {Model} from "mongoose";

describe('findAllEvents()', () => {
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
        const mockTheaterEvents = {
            find: jest.fn(()=>{
                return{  sort: jest.fn().mockResolvedValue(target_events)}
            }),
            create: jest.fn()
        };

        const services =new EventServices(mockTheaterEvents as unknown as Model<any>)
        const result = await services.findAllEvents()

        expect(result).toEqual(target_events)
    })

    test('events should be in chronological order, so mongoose should filter by opening_night', async ()=>{
        const sortSpy = jest.fn()
        const mockTheaterEvents = {
            find: jest.fn(()=>{
                return {sort: sortSpy}
                }
            ),
            create: jest.fn()
        };

        const services = new EventServices(mockTheaterEvents as unknown as Model<any>)
        await services.findAllEvents()
        //below filter, sort in ascending order
        expect(sortSpy).toHaveBeenCalledWith({opening_night: 1})


    })
    /*
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
    })*/
})

describe('addEvent()', ()=>{
    let services: EventServices
    let createSpy:jest.SpyInstance
    beforeEach( () => {
        createSpy = jest.spyOn(TheaterEvents, 'create').mockImplementationOnce(async()=>[])
        const mockTheaterEvents = {
            find: jest.fn(()=>{
                return {sort: jest.fn()}
            }),
            create: createSpy
        };
        services = new EventServices(mockTheaterEvents as unknown as Model<any>)
    })
    afterEach(()=>{
        jest.clearAllMocks()
    })
    test('expect TheaterEvents.create() to have been called with a theater event', async ()=>{
        const event = {
            name: "Rio Bravo",
            showtimes: [
                '2024-10-11 19:00:00'
            ]
        }
        await services.addEvent(event)
        expect(createSpy).toHaveBeenCalledWith(expect.objectContaining(event))
    })
    test('expect TheaterEvents.create() to have been called with a theater event: Different data', async ()=>{
        const event = {
            name: "Cats",
            showtimes: [
                '2025-12-11 12:00:00'
            ]
        }
        await services.addEvent(event)
        expect(createSpy).toHaveBeenCalledWith(expect.objectContaining(event))
    })
    test('want to add a hash id to the whole thing so each event is guaranteed to have an individual id', async()=>{
        const event = {
            name: "Cats",
            showtimes: [
                '2025-12-11 12:00:00'
            ]
        }
        services.hashId = jest.fn(()=>"1701")
        await services.addEvent(event)
        expect(createSpy).toHaveBeenCalledWith({
            name: "Cats",
            showtimes: [
                '2025-12-11 12:00:00'
            ],
            event_id: "1701"
        })
    })
    test('want to add a hash id to the whole thing so each event is guaranteed to have an individual id', async()=>{
        const event = {
            name: "Cats",
            showtimes: [
                '2025-12-11 12:00:00'
            ]
        }
        services.hashId = jest.fn(()=>"1876")
        await services.addEvent(event)
        expect(createSpy).toHaveBeenCalledWith({
            name: "Cats",
            showtimes: [
                '2025-12-11 12:00:00'
            ],
            event_id: "1876"
        })
    })
})
