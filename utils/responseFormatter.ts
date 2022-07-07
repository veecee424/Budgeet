import { Response } from 'express';

class customError extends Error {
    code: number;
    constructor(message?:string, code?:number) {
        super(message)
        this.message = message || 'Something went wrong, please contact support.';
        this.code = code || 500;
    }
}

class responder {
    
    constructor(
        readonly res: Response,
        private statusCode: number, 
        private message: string, 
        private data?: object|null
    ) {}

    success () {
        return this.res.status(this.statusCode || 200).json({
            status: 'success',
            message: this.message || 'Operation successful',
            data: this.data || null
        });
    }

    error () {
        return this.res.status(this.statusCode || 400).json({
            status: 'error',
            message: this.message || 'Operation unsuccessful',
            data: null
        });
    }

}

const successResponse = (res: Response, statusCode: number, message: string, data: object|null) => {
    const response = new responder(res, statusCode, message, data);
    return response.success();
}

const errorResponse = (res: Response, statusCode: number, message: string, data?: object|null) => {
    const response = new responder(res, statusCode, message, data);
    return response.error();
}

export {
    successResponse,
    errorResponse,
    customError
}