import * as React from "react";

import * as css from "./styles.css";

type AvatarProps = React.PropsWithChildren<{
    title?: string;
    bg?: string;
    size?: number;
    radius?: string | number;
}>;

const Avatar = React.memo(
    React.forwardRef<HTMLDivElement, AvatarProps>(({ bg, children, radius = "0.5rem", size = 44 }, ref) => {
        return (
            <div
                ref={ref}
                className={css.root}
                style={{
                    backgroundImage: bg ? `url("${bg}")` : "none",
                    borderRadius: radius,
                    height: `${size}px`,
                    width: `${size}px`,
                }}
            >
                {children}
            </div>
        );
    }),
);

export default Avatar;
