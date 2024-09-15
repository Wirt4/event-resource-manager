import Header from "components/header/header"
import {ReactElement} from "react";

interface PropsInterface {
    children: React.ReactNode
}

/**
 * The global format for the app
 * wraps content in dif with <Header/> at top and styles with "layout-grid" css
 * @param props
 * @constructor
 */
function Layout (props: PropsInterface): ReactElement | null {
    return (<>
        <Header />
        <main className="layout-grid">
            {props.children}
        </main>
    </>)
}

export default Layout