import { HttpStatus } from "@nestjs/common";

export class AppException extends Error {
    public code: number;
    public httpStatus: HttpStatus
    constructor(code: number, message: string, httpStatus?: HttpStatus) {
        super(message);
        this.name = 'AppException';
        this.code = code;
        this.httpStatus = httpStatus || HttpStatus.OK;
    }
}