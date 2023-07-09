import * as React from "react";
import ReactMarkdown, { type Options } from "react-markdown";

const MemoizedReactMarkdown: React.FC<Options> = React.memo(
    ReactMarkdown,
    (prevProps, nextProps) => prevProps.children === nextProps.children && prevProps.className === nextProps.className,
);

export default MemoizedReactMarkdown;
