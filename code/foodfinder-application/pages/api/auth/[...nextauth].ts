import { createHash } from "crypto"
import { NextApiRequest, NextApiResponse } from "next"
import NextAuth from "next-auth/next"
import GithubProvider from "next-auth/providers/github"

const createUserId = (base: string): string => {
    return createHash("sha256").update(base).digest("hex")
}

//Is this inconsistent form here?

async function auth(req: NextApiRequest, res: NextApiResponse) {
    return await NextAuth(req, res, {
        providers: [
            GithubProvider({
                clientId: process.env?.GITHUB_CLIENT_ID || "",
                clientSecret: process.env?.GITHUB_CLIENT_SECRET || ""
            })
        ],
        //callbacks seem repetitive: can we abstract them?
        callbacks: {
            async jwt({ token }) {
                if (token?.email && !token.fdlst_private_usserId) {
                    token.fdlst_private_usserId = createUserId(token.email)
                }
                return token
            },
            async session({ session }) {
                if (session?.user?.email && !session?.user?.fdlst_private_usserId) {
                    session.user.fdlst_private_usserId = createUserId(session?.user?.email)
                }
                return session
            }
        }
    })

}

export default auth
