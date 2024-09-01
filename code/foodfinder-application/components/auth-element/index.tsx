import Button from "../button"
import styles from "./index.module.css"
import { signIn, useSession, signOut } from "next-auth/react"
import Link from "next/link"

interface Session {
    user: {
        name: string
        fdlst_private_userId: string
    }
}

const greeting = (session: Session): JSX.Element => {
    return (<span className={styles.name}>
        Hello <strong>{session?.user.name}</strong>
    </span>)
}

const SignInButton = (): JSX.Element => {
    return (<>
        <Button variant="blue" clickHandler={() => signIn()}>
            Sign In
        </Button>
    </>)
}

const WishListButton = (session: Session): JSX.Element => {
    return (<Button variant="outline">
        <Link href={`/list/${session?.user.fdlst_private_userId}`}>
            Your wish list
        </Link>
    </Button>)
}

const signOutButton = (): JSX.Element => {
    return (<Button variant="blue" clickHandler={() => signOut()}>
        Sign Out
    </Button>)
}

const AuthElement = (): JSX.Element => {
    const { data: session, status } = useSession()
    return (<>
        {status === "authenticated" && (greeting(session))}
        <nav className={styles.root}>
            {status === "unauthenticated" && (SignInButton())}
            {status === "authenticated" && (
                <>
                    {WishListButton(session)}
                    {signOutButton()}
                </>
            )}
        </nav>
    </>)
}

export default AuthElement
