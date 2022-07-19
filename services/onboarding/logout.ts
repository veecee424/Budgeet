import { Response } from 'express';
import { ReqCustom } from '../../custom_types/custom';
import {successResponse, errorResponse} from '../../utils/responseFormatter';

const logout = async (req: ReqCustom, res: Response) => {
    try {
       
        const user = req.user;
        /**
         * Invalidate login hash
         */
        user.loginHash = null;
        user.save();
        return successResponse(res, 200, 'Logged out successfully.', []);
    } catch (e: any) {
        errorResponse(res, e?.code, e?.message);
    }
}

export default logout;