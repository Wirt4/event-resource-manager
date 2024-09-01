import { createHash } from "crypto"
import { NextApiRequest, NextApiResponse } from "next"
import NextAuth from "next-auth/next"
import GithubProvider from "next-auth/providers/github"

const GITHUB_CLIENT_ID = process.env?.GITHUB_CLIENT_ID || ""
const GITHUB_CLIENT_SECRET = process.env?.GITHUB_CLIENT_SECRET || ""

const createUserId = (base: string): string => {
    return createHash("sha256").update(base).digest("hex")
}
/**
 * relies on JS's pass-by-ref for non-primitives
 * @param obj 
 * void
 */
const userIdFromEmail = (obj: any) => {
    if (obj && obj?.email && !obj.fdlst_private_userId) {
        obj.fdlst_private_userId = createUserId(obj.email)
    }
}

const auth = async function (req: NextApiRequest, res: NextApiResponse) {
    return NextAuth(req, res, {
        providers: [GithubProvider({
            clientId: GITHUB_CLIENT_ID,
            clientSecret: GITHUB_CLIENT_SECRET
        })],
        callbacks: {
            async jwt({ token }) {
                userIdFromEmail(token)
                return token
            },
            async session({ session }) {
                userIdFromEmail(session?.user)
                return session
            }
        }
    })
}

export default auth
