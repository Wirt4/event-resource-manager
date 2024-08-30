import Logo from "components/header/logo"
import styles from "./index.module.css"

const Header = function (): JSX.Element {
    return (
        <header className={styles.root}>
            <div className="layout-grid">
                <Logo />
            </div>
        </header>
    )
}

export default Header
