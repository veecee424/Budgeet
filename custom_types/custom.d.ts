import { Request } from 'express';

interface ReqCustom extends Request {
    user?: any
}

export {ReqCustom};