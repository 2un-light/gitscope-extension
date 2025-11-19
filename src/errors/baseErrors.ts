export class BaseError extends Error {
    constructor(message: string) {
        super(message);
        this.name = new.target.name;
    }
}

export class HttpBaseError extends Error {
    status: number;
    detail: string;

    constructor(status: number, detail: string) {
        super(detail);
        this.status = status;
        this.detail = detail;
        this.name = new.target.name;
    }
}

export class HttpBaseErrorWithMessage extends Error {
    status: number;
    message: string;
    detail: string;

    constructor(status: number, message: string, detail: string) {
        const composedMessage = `[HTTP ${status}] ${message} - Detail: ${detail}`;
        super(composedMessage);
        this.status = status;
        this.message = message;
        this.detail = detail;
        this.name = new.target.name;
    }
}