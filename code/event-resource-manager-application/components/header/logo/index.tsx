import Image from "next/image"
import Link from "next/link"

import logo from "/public/assets/mask.png"
import styles from "./index.module.css"

const Logo = function (): JSX.Element {
    return (
        <Link href="/" passHref className={styles.root}>
            <Image
                alt="Logo: Food Finder"
                src={logo}
                sizes="300px"
                fill
                priority
            />
        </Link>)
}
export default Logo
