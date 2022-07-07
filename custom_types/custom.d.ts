import { Request } from 'express';

interface ReqCustom extends Request {
    account?: any
}

export {ReqCustom};