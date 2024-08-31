import mongoose from "mongoose"

declare global {
    var mongoose: mongoose
}

declare module "next-auth" {
    interface Session {
        user: {
            fdlst_private_userId: string
        } & DefaultSession["user"]
    }
}
