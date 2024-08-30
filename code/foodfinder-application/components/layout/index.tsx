import Header from "components/header/header"

interface PropsInterface {
    children: React.ReactNode
}

const Layout = function (props: PropsInterface): JSX.Element {
    return (<>
        <Header />
        <main>
            {props.children}
        </main>
    </>)
}

export default Layout