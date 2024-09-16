import Image from "next/image"
import Link from "next/link"

import logo from "/public/assets/mask.png"
import styles from "./index.module.css"
import {ReactElement} from "react"

const Logo = function (): ReactElement {
    return (
        <Link href="/" passHref className={styles.root}>
            <Image
                alt="Logo: Event Resource Management"
                src={logo}
                sizes="300px"
                fill
                priority
            />
        </Link>)
}
export default Logo
