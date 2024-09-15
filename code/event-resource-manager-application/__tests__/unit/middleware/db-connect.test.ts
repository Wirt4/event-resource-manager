import dbConnect from "@/middleware/db-connect"

describe('dbConnect',()=>{
    const originalEnv = process.env
    afterEach(()=>{
        process.env = originalEnv
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
        process.env = {
            ...originalEnv,
            MONGO_URI: 'non-stupid URI',
        };
        try{
            await dbConnect()
        }catch(error){
            expect(true).toBe(false)
        }
    })
})