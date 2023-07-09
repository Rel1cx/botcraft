import { Observable } from "rxjs";

export const readerToObservable = (reader: ReadableStreamDefaultReader<Uint8Array>) => {
    return new Observable<Uint8Array>((observable) => {
        const push = async (): Promise<void> => {
            const { done, value } = await reader.read();
            if (!done) {
                observable.next(value);
                return void push();
            }
            reader.releaseLock();
            observable.complete();
        };
        return void push();
    });
};
