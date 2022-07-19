import { Response, NextFunction } from 'express';
import { errorResponse, customError } from '../utils/responseFormatter';
import jwt from 'jsonwebtoken';
import { config } from '../config/appConfig';
import { ReqCustom } from '../custom_types/custom';
import User from '../db/models/User';

const isAuthenticated = async (req: ReqCustom, res: Response, next: NextFunction) => {
    try {
        /**
         * Fetch token from headers
         */
        let verified: any;
        const token: String | undefined = req.header('auth-token');
        if (!token) throw new customError('Token is required', 400);

        /**
         * If token is passed, verify
         */
        try {
            verified = jwt.verify(String(token), config.jwtSecret);
        } catch (e) {
            // return errorResponse(res, 400, 'Invalid token')
            throw new customError('Invalid token', 400);
        }

        /**
         * Add authenticated user to the request
         */
        const authenticatedUser = await User.findById({_id:verified.id});
        if(!authenticatedUser?.loginHash) throw new customError('Session expired, log in to continue.', 400);
        req.user = authenticatedUser;
        return next();
        
    } catch (e:any) {
        errorResponse(res, e?.code, e?.message);
    }
}

export default isAuthenticated;