import CodeMirror from "@uiw/react-codemirror";
import { shallowEqual } from "fast-equals";
import { omit } from "rambda";
import * as React from "react";

const propsToOmit = ["value"];

const MemoizedCodeMirror = React.memo(CodeMirror, (prevProps, nextProps) => {
    return shallowEqual(omit(propsToOmit, prevProps), omit(propsToOmit, nextProps));
});

export default MemoizedCodeMirror;
