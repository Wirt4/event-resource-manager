import Logo from "components/header/logo"
import styles from "./index.module.css"
import AuthElement from "components/auth-element"

const Header = function (): JSX.Element {
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
