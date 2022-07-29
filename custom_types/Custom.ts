import { Request } from 'express';

interface ReqCustom extends Request {
    user?: any
}

interface User {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    password?: string;
    loginHash: string;
    deletedAt?: string;
    __v?: number;
    _id?: string;
    createdAt?: string;
    updatedAt?: string
}

interface Account {
    country: string;
    user: any;
    isActivated: number;
    deletedAt?: string;
    __v?: number;
    _id?: string;
    createdAt?: string;
    updatedAt?: string
}

interface Token {
    value: string;
    account: any;
    isUsed: number;
    deletedAt?: string;
    __v?: number;
    _id?: string;
    createdAt?: string;
    updatedAt?: string
}

export {
    ReqCustom,
    Account,
    User,
    Token
};