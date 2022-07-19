import { Response } from 'express';
import { ReqCustom as Request } from '../../custom_types/custom';
import bcrypt from 'bcrypt';
import { successResponse, errorResponse, customError } from '../../utils/responseFormatter';

const changePassword = async (req: Request, res: Response) => {
    try {
        const { oldPassword, newPassword, confirmPassword } = req.body;
        const user = req.user;
        /**
         * Check if passwords match
         */
        const passwordMatches = await bcrypt.compare(oldPassword, user.password);
        if (!passwordMatches) throw new customError('Incorrect old password.');
        
        /**
         * Validate new password
         */
        if (newPassword !== confirmPassword) throw new customError('New password and confirm password do not match.');
        if (oldPassword === newPassword) throw new customError('Old password and new password should not be the same.');

        /**
         * modify user password and save
         */
        user.password = newPassword;
        await user.save();
        successResponse(res, 200, 'Password changed successfully.', []);

    } catch (e:any) {
        errorResponse(res, e?.code, e?.message);
    }
}

export default changePassword;