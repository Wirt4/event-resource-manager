import React, {ReactElement} from "react"
import styles from "./index.module.css"

interface PropsInterface {
    disabled?: boolean;
    children?: React.ReactNode;
    variant?: "blue" | "outline";
    clickHandler?: () => any;
}

/**
 * If the props.disabled == true, it returns a span with the children's props,
 * else, it implements the props.clickHandler
 * returns a <span> filled with props.children
 * @param props
 */
function renderContent (props: PropsInterface): ReactElement | null {
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

/**
 * returns formatted string of references to the index.module.css to style button based on props
 * returns a string of space-delimited styles
 * @param props
 */
function className (props: PropsInterface): string {
    const disabled = props.disabled ? styles.disabled : ""
    const variant = props.variant || "default"
    return [
        styles.root,
        disabled,
        styles[variant]
    ].join(" ")
}

/**
 * renders styling, content and clickHandler based on props
 * @param props
 * @constructor
 */
function Button  (props: PropsInterface): ReactElement | null  {
    return (<div
        className={className(props)}>
        {renderContent(props)}
    </div>)
}

export default Button
