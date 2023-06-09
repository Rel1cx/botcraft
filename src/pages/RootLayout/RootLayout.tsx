import type * as React from "react";
import { Toaster } from "react-hot-toast";

import TailwindIndicator from "@/components/atoms/TailwindIndicator/TailwindIndicator";

import * as css from "./styles.css";

export type RootLayoutProps = React.PropsWithChildren<{
    nav?: React.ReactNode;
    navHeader?: React.ReactNode;
    navFooter?: React.ReactNode;
}>;

const RootLayout: React.FC<RootLayoutProps> = ({ children, nav, navFooter, navHeader }) => {
    return (
        <div className={css.root}>
            <nav className={css.navContainer}>
                <div className={css.navHeader}>{navHeader}</div>
                <div className={css.navContent}>{nav}</div>
                <div className={css.navFooter}>{navFooter}</div>
            </nav>
            <main className={css.main}>{children}</main>
            <Toaster position="bottom-right" />
            <TailwindIndicator />
        </div>
    );
};

export default RootLayout;
