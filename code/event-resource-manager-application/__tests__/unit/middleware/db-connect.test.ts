import dbConnect from "@/middleware/db-connect"
import mongoose from "mongoose";
import anything = jasmine.anything;

describe('dbConnect',()=>{
    const originalEnv = process.env
    const originalGlobal = global
    beforeEach(()=>{
        process.env = {
            ...originalEnv,
            MONGO_URI: 'non-stupid URI',
        };
    })
    afterEach(()=>{
        process.env = originalEnv
        global = originalGlobal
        jest.clearAllMocks();

    })

    test('MONGO_URI is not defined', async ()=> {
        process.env.MONGO_URI = ''

        try{
            await dbConnect()
            expect(true).toBe(false) //fail the test if dbConnect passes
        }catch(error){
            // @ts-ignore
            expect(error.message).toBe('Please define the MONGO_URI environment variable (.env.local)')
        }
    })

    test('MONGO_URI is defined, does not throws error', async ()=> {
        jest.spyOn(mongoose, 'connect').mockResolvedValue(mongoose)
        try{
            await dbConnect()
        }catch(error){
            expect(true).toBe(false)
        }
    })

    test('A cached connection already exists', async ()=>{
        global.mongoose = {conn: "valid connection"}
        const result = await dbConnect()
        expect(result).toEqual("valid connection")
    })

    test('A cached connection already exists, mongoose is not called', async ()=>{
        global.mongoose = {conn: "valid connection"}
        const spy = jest.spyOn(mongoose, 'connect').mockResolvedValue(mongoose)
        await dbConnect()
        expect(spy).not.toHaveBeenCalled()
    })

    test('there is no cached connection nor promise, expect mongo connect to have been called', async()=>{
        global.mongoose = null
        const spy = jest.spyOn(mongoose, 'connect').mockResolvedValue(mongoose)
        await dbConnect()
        expect(spy).toHaveBeenCalled()
    })

    test('there is no cached connection, but there is a promise, expect that promise to be called', async()=>{
        const p = new Promise((resolve, reject) => {
            resolve('valid cached connection')
        })
        global.mongoose = {conn: null, promise:p}

        const result = await dbConnect()

        expect(result).toEqual('valid cached connection')
    })

    test("promise is cached, don't call mongoose", async()=>{
        const p = new Promise((resolve, reject) => {
            resolve('valid cached connection')
        })
        global.mongoose = {conn: null, promise:p}
        const spy = jest.spyOn(mongoose, 'connect').mockResolvedValue(mongoose)

        await dbConnect()

        expect(spy).not.toHaveBeenCalled()
    })

    test("no cache, mongoose must be called with mongo uri and specs", async()=>{
        global.mongoose = null
        process.env = {
            ...originalEnv,
            MONGO_URI: 'valid_mongo_uri',
        };

        const spy = jest.spyOn(mongoose, 'connect').mockResolvedValue(mongoose)

        await dbConnect()

        const opts = {
            bufferCommands: false,
            maxIdleTimeMS: 10000,
            serverSelectionTimeoutMS: 10000,
            socketTimeoutMS: 20000,
        }

        expect(spy).toHaveBeenCalledWith('valid_mongo_uri', opts)
    })

    test("no cache, mongoose must be called with different mongo uri", async()=>{
        global.mongoose = null
        process.env = {
            ...originalEnv,
            MONGO_URI: 'another_valid_mongo_uri',
        };
        const spy = jest.spyOn(mongoose, 'connect').mockResolvedValue(mongoose)

        await dbConnect()

        expect(spy).toHaveBeenCalledWith('another_valid_mongo_uri',  expect.anything())
    })

    test("no cache, return what mongoose gives", async()=>{
        global.mongoose = null
        const p: Promise<typeof import("mongoose")> = new Promise((resolve, reject) => {
            resolve('Frankie, the valid cached connection' as unknown as typeof import("mongoose"))
        })

        jest.spyOn(mongoose, 'connect').mockResolvedValue(p)

        const result = await dbConnect()

        expect(result).toEqual('Frankie, the valid cached connection')
    })

    test("no cache, return what mongoose gives, different data", async()=>{
        global.mongoose = null
        const p: Promise<typeof import("mongoose")> = new Promise((resolve, reject) => {
            resolve('Wesley, the valid cached connection' as unknown as typeof import("mongoose"))
        })

        jest.spyOn(mongoose, 'connect').mockResolvedValue(p)

        const result = await dbConnect()

        expect(result).toEqual('Wesley, the valid cached connection')
    })

    test("call method once, no cache, the promises should cache", async()=>{
        global.mongoose = null
        const p: Promise<typeof import("mongoose")> = new Promise((resolve, reject) => {
            resolve('Xena, the valid cached connection' as unknown as typeof import("mongoose"))
        })

        jest.spyOn(mongoose, 'connect').mockResolvedValue(p)

        await dbConnect()

        expect(global.mongoose.conn).toEqual('Xena, the valid cached connection')
    })

    test("method called twice, assumes cache works and will only call mongoose once", async()=>{
        global.mongoose = null
        const p: Promise<typeof import("mongoose")> = new Promise((resolve, reject) => {
            resolve('Akira, the valid cached connection' as unknown as typeof import("mongoose"))
        })

        const spy = jest.spyOn(mongoose, 'connect').mockResolvedValue(p)

        await dbConnect()
        const resultOfSecondCall = await dbConnect()

        expect(resultOfSecondCall).toEqual('Akira, the valid cached connection')
        expect(spy).toBeCalledTimes(1)
    })

})
