export type IOProtocol = {
    isEnd: boolean;
    stopReason: string;
};

export type RetryProtocol = {
    retries: number;
    canRetry: boolean;
};
