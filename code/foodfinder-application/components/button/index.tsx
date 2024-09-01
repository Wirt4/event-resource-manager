import React from "react"
import styles from "./index.module.css"

interface PropsInterface {
    disabled?: boolean;
    children?: React.ReactNode;
    variant?: "blue" | "outline";
    clickHandler?: () => any;
}



const renderContent = (props: PropsInterface): JSX.Element => {
    if (props.disabled) {
        return (
            <span className={styles.span}>
                {props.children}
            </span>
        )
    }

    return (
        <span className={styles.span} onClick={props.clickHandler}>
            {props.children}
        </span>
    )
}

const className = function (props: PropsInterface): string {
    const disabled = props.disabled ? styles.disabled : ""
    const variant = props.variant || "default"
    return [
        styles.root,
        disabled,
        styles[variant]
    ].join(" ")
}

const Button = (props: PropsInterface): JSX.Element => {
    return (<div
        className={className(props)}>
        {renderContent(props)}
    </div>)
}

export default Button
