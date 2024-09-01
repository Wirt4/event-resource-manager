import Button from "../button"
import styles from "./index.module.css"
import { signIn, useSession, signOut } from "next-auth/react"
import Link from "next/link"

enum auth {
    AUTHENTICATED = "authenticated",
    UNAUTHENTICATED = "unauthenticated"
}

interface Session {
    user: {
        name: string
        fdlst_private_userId: string
    }
}

const greeting = function (session: Session): JSX.Element {
    return (<span className={styles.name}>
        Hello <strong>{session?.user.name}</strong>
    </span>)
}

const signingButton = function (content: string, fn: Function): JSX.Element {
    return (<>
        <Button variant="blue" clickHandler={() => fn()}>
            {content}
        </Button>
    </>)
}

const signInButton = function (): JSX.Element {
    return signingButton('Sign In', signIn)
}

const signOutButton = function (): JSX.Element {
    return signingButton('Sign Out', signOut)
}

const wishListButton = function (session: Session): JSX.Element {
    return (<Button variant="outline">
        <Link href={`/list/${session?.user.fdlst_private_userId}`}>
            Your wish list
        </Link>
    </Button>)
}

const AuthElement = function (): JSX.Element {
    const { data: session, status } = useSession()
    return (<>
        {status === auth.AUTHENTICATED && (greeting(session))}
        <nav className={styles.root}>
            {status === auth.UNAUTHENTICATED && (signInButton())}
            {status === auth.AUTHENTICATED && (
                <>
                    {wishListButton(session)}
                    {signOutButton()}
                </>
            )}
        </nav>
    </>)
}

export default AuthElement
