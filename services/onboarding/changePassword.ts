import { Response } from 'express';
import { ReqCustom as Request } from '../../custom_types/Custom';
import bcrypt from 'bcrypt';
import { successResponse, errorResponse, customError } from '../../utils/ResponseFormatter';
import { validateAsync } from '../../utils/Validate';
import { changePasswordSpec } from '../../utils/ValidationSpecs';

const changePassword = async (req: Request, res: Response) => {
    try {
        const payload = await validateAsync(changePasswordSpec, req.body);
        const user = req.user;

        // Check if passwords match
        const passwordMatches = await bcrypt.compare(payload.oldPassword, user.password);
        if (!passwordMatches) throw new customError('Incorrect old password.', 400);
        
        // Validate new password
        if (payload.newPassword !== payload.confirmPassword) throw new customError('New password and confirm password do not match.', 400);
        if (payload.oldPassword === payload.newPassword) throw new customError('Old password and new password should not be the same.', 400);

        // Modify user password and save
        user.password = payload.newPassword;
        await user.save();
        successResponse(res, 200, 'Password changed successfully.', []);

    } catch (e:any) {
        errorResponse(res, e?.code, e?.message);
    }
}

export default changePassword;