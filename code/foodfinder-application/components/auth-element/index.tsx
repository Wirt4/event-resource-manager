import { signIn, useSession, signOut } from "next-auth/react"
import Button from "../button"
import Link from "next/link"
import {ReactElement} from "react"
import styles from "./index.module.css"

interface Session {
    user: {
        name: string
        fdlst_private_userId: string
    }
}

enum auth {
    AUTHENTICATED = "authenticated",
    UNAUTHENTICATED = "unauthenticated"
}

/**
 * returns a personalized greeting with the user's name
 * @param session
 */
function greeting (session: Session): ReactElement | null {
    return (<span className={styles.name}>
        Hello <strong>{session?.user.name}</strong>
    </span>)
}

/**
 * passes the content to be displayed on the button, and a function to be called on click(handler)
 * abstraction for other button functions
 * @param content
 * @param handler
 */
 function signingButton (content: string, handler: Function): ReactElement | null {
     //todo: move button enums to a shared folder
    return (<>
        <Button variant="blue" clickHandler={() => handler()}>
            {content}
        </Button>
    </>)
}

/**
 *returns a button that displays "Sign In" and calls signIn method on click
 */
function signInButton (): ReactElement | null {
    return signingButton('Sign In', signIn)
}

/**
 * returns a button that displays "Sign Out" and calls signOut method on click
 */
function signOutButton (): ReactElement | null {
    return signingButton('Sign Out', signOut)
}

/**
 * Returns a button that displays "yourwishlist" and links to to the [userId] dynamic page
 * @param session
 */
function wishListButton  (session: Session): ReactElement | null {
    return (<Button variant="outline">
        <Link href={`/list/${session?.user.fdlst_private_userId}`}>
            Your wish list
        </Link>
    </Button>)
}

/**
 * If the user's status is authenticated, The authelement displays a personalized greeting, wishlist button and signout button,
 * else, it displays a signin button
 * @constructor
 */
function AuthElement (): ReactElement | null {
    const { data: session, status } = useSession()
    return (<>
        {status === auth.AUTHENTICATED && (greeting(session))}
        <nav className={styles.root}>
            {status === auth.AUTHENTICATED && (
                <>
                    {wishListButton(session)}
                    {signOutButton()}
                </>
            )}
            {status === auth.UNAUTHENTICATED && (signInButton())}
        </nav>
    </>)
}


export default AuthElement
