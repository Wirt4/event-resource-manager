import Button from "../button"
import styles from "./index.module.css"
import { signIn, useSession } from "next-auth/react"
import Link from "next/link"

const AuthElement = (): JSX.Element => {
    const { data: session, status } = useSession()
    return (<>
        {status === "authenticated" && (<span className={styles.name}>
            Hello <strong>{session?.user.name}</strong>
        </span>)}
        <nav className={styles.root}>
            {status === "unauthenticated" && (
                <>
                    <Button variant="blue" clickHandler={() => signIn()}>
                        Sign In
                    </Button>
                </>
            )}
            {status === "authenticated" && (
                <>
                    <Button variant="outline">
                        <Link href={`/list/${session?.user.fdlst_private_userId}`}>
                            Your wish list
                        </Link>
                    </Button>

                    <Button variant="blue" clickHandler={() => signIn()}>
                        Sign Out
                    </Button>
                </>
            )}
        </nav>
    </>)
}

export default AuthElement
