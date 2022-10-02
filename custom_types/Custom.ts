import { Request } from 'express';
import { Document } from 'mongoose';

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

interface EmailTemplate {
    templateName: string;
    subject: string;
}

interface budgetDetail {
    name: string,
    amount: number
}

interface budget extends Document {
    name: string,
    duration: number,
    description?: string,
    budgetDetails: budgetDetail[],
    owner?: string,
    isChecked?: number,
    deletedAt?: number
}

export {
    ReqCustom,
    Account,
    User,
    Token,
    EmailTemplate,
    budget
};