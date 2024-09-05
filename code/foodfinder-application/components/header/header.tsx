import Logo from "components/header/logo"
import styles from "./index.module.css"
import AuthElement from "components/auth-element"
import {ReactElement} from "react";

/**
 * returns Header element containing Logo and the AuthElement
 * @constructor
 */
function Header (): ReactElement | null {
    return (
        <header className={styles.root}>
            <div className="layout-grid">
                <Logo />
                <AuthElement />
            </div>
        </header>
    )
}

export default Header
