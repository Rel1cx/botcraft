import * as React from "react";

type ErrorBoundaryProps = {
    fallback?: JSX.Element | React.ReactNode;
    children?: JSX.Element | React.ReactNode;
};

type ErrorBoundaryState = {
    errorMessage?: string;
};

export default class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    public constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { errorMessage: "" };
    }

    public static getDerivedStateFromError(error: Error) {
        return { errorMessage: error.toString() };
    }

    // eslint-disable-next-line class-methods-use-this
    public override componentDidCatch(error: Error, info: React.ErrorInfo) {
        void error;
        // eslint-disable-next-line no-console
        console.info(info);
    }

    public override render() {
        if (this.state.errorMessage) {
            return this.props.fallback ?? <p>{this.state.errorMessage}</p>;
        }

        return this.props.children;
    }
}
