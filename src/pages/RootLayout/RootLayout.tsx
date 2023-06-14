import type { PropsWithChildren } from "react"

import * as css from "./styles.css"

export type RootLayoutProps = PropsWithChildren<{
    nav?: React.ReactNode
    navHeader?: React.ReactNode
    navFooter?: React.ReactNode
}>

const RootLayout: React.FC<RootLayoutProps> = ({ children, nav, navFooter, navHeader }) => {
    return (
        <div className={css.container}>
            <nav className={css.navContainer}>
                <div className={css.navHeader}>{navHeader}</div>
                <div className={css.navContent}>{nav}</div>
                <div className={css.navFooter}>{navFooter}</div>
            </nav>
            <main className={css.main}>{children}</main>
        </div>
    )
}

export default RootLayout
