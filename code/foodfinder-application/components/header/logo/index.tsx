import logo from "/public/assets/logo.png"
import Image from "next/image"
const Logo = function (): JSX.Element {
    return (
        <div style={{ width: '100px', height: '100px', position: 'relative' }}>
            <Image
                alt="Logo: Food Finder"
                src={logo}
                sizes="300px"
                fill
                priority
            />
        </div>)
}
export default Logo
