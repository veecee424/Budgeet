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
    name: string;
    amount: number
}

interface budget extends Document {
    name: string;
    duration: number;
    description?: string;
    budgetDetails: budgetDetail[];
    owner?: string;
    isChecked?: number;
    deletedAt?: number
}

interface Wallet {
    walletId: string;
    AccountId: number;
    deletedAt?: number;
    _id?: string;
}

interface walletTransfer {
    description: string;
    walletTo: number;
    walletFrom: number;
    amount: number;
    __v?: number;
    _id?: string;
    createdAt?: string;
    updatedAt?: string
}

interface transactionWarehouse {
    transactionType: string;
    user: string;
    amount: number;
    __v?: number;
    _id?: string;
    createdAt?: string;
    updatedAt?: string;
    meta?: string,
    description?: string
}

interface ledger {
    credit: number;
    debit: number;
    user: string;
    __v?: number;
    _id?: string;
    createdAt?: string;
    updatedAt?: string
}

export {
    ReqCustom,
    Account,
    User,
    Token,
    EmailTemplate,
    budget,
    Wallet,
    walletTransfer,
    transactionWarehouse,
    ledger
};