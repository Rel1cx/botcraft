import type { PropsWithChildren } from "react"

import * as css from "./styles.css"

type LayoutProps = PropsWithChildren<{
    header?: React.ReactNode
    aside?: React.ReactNode
    asideHeader?: React.ReactNode
}>

export const Layout = ({ aside, asideHeader, children, header }: LayoutProps) => {
    return (
        <div className={css.container}>
            <aside className={css.aside}>
                <div className={css.asideHeader}>{asideHeader}</div>
                {aside}
            </aside>
            <main className={css.main}>
                <header className={css.header}>{header}</header>
                {children}
            </main>
        </div>
    )
}
