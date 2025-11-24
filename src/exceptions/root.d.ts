export declare const ErrorCode: {
    readonly USER_NOT_FOUND: 1001;
    readonly USER_ALREADY_EXISTS: 1002;
    readonly INCORRECT_PASSWORD: 1003;
    readonly UNPROCESSABLE_ENTITY: 2001;
    readonly INTERNAL_EXCEPTION: 3001;
    readonly HEADER_NOT_FOUND: 1004;
    readonly ADDRESS_DOES_NOT_BELONG: 1005;
    readonly UNAUTHORIZED: 4001;
};
export type ErrorCode = (typeof ErrorCode)[keyof typeof ErrorCode];
export declare class HttpException extends Error {
    message: string;
    errorCode: ErrorCode;
    statusCode: number;
    errors: any;
    constructor(message: string, errorCode: ErrorCode, statusCode: number, errors: any);
}
//# sourceMappingURL=root.d.ts.map