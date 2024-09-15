import dbConnect from "@/middleware/db-connect"
import mongoose from "mongoose";

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

})