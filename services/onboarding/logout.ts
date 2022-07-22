import { Response } from 'express';
import { ReqCustom } from '../../custom_types/Custom';
import {successResponse, errorResponse} from '../../utils/ResponseFormatter';

const logout = async (req: ReqCustom, res: Response) => {
    try {
       
        const user = req.user;
        //Invalidate loginhash
        user.loginHash = null;
        user.save();
        return successResponse(res, 200, 'Logged out successfully.', []);
    } catch (e: any) {
        errorResponse(res, e?.code, e?.message);
    }
}

export default logout;