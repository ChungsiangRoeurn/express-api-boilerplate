// message, status codes, error codes
// root.ts

// Error codes as a runtime-safe object
export const ErrorCode = {
  USER_NOT_FOUND: 1001,
  USER_ALREADY_EXISTS: 1002,
  INCORRECT_PASSWORD: 1003,
  UNPROCESSABLE_ENTITY: 2001,
  INTERNAL_EXCEPTION: 3001,
  HEADER_NOT_FOUND: 1004,
  ADDRESS_DOES_NOT_BELONG: 1005,
  UNAUTHORIZED: 4001,
  PRODUCT_NOT_FOUND: 5001,
} as const;

export type ErrorCode = (typeof ErrorCode)[keyof typeof ErrorCode];

// Custom HTTP Exception
export class HttpException extends Error {
  message: string;
  errorCode: ErrorCode;
  statusCode: number;
  errors: any;

  constructor(
    message: string,
    errorCode: ErrorCode,
    statusCode: number,
    errors: any
  ) {
    super(message);
    this.message = message;
    this.errorCode = errorCode;
    this.statusCode = statusCode;
    this.errors = errors;
  }
}
