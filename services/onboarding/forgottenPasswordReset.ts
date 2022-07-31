import { ReqCustom as Request } from '../../custom_types/Custom';
import { Response } from 'express';
import Token from '../../db/models/Token';
import Account from '../../db/models/Account';
import { successResponse, errorResponse, customError } from '../../utils/ResponseFormatter';
import { validateAsync } from '../../utils/Validate';
import { forgottenPasswordResetSpec } from '../../utils/ValidationSpecs';

const forgottenPasswordReset = async (req: Request, res: Response) => {
    try {
        const payload = await validateAsync(forgottenPasswordResetSpec, req.body);

        // Check if new password matches the password confirmation
        if (payload.newPassword !== payload.confirmPassword) throw new customError('New password and confirm password do not match.', 400);

        // Check if token is available and unused
        const foundToken: any = await Token.findOne({value: payload.token});
        if (foundToken.isUsed) throw new customError('Token is expired or invalid', 400);

        // Find account and update password
        Account.findOne({
            _id: foundToken.account, 
            deletedAt: null
        }, null).populate('user').exec((e, account: any) => {
            if (e) throw new customError(e.message, 400);
            account.user.password = payload.newPassword;
            foundToken.isUsed = 1;
            foundToken.save();
            account.user.save();
            successResponse(res, 200, 'Password reset successful.', []);
        });


    } catch (e: any) {
        errorResponse(res, e?.code, e?.message);
    }
}

export default forgottenPasswordReset;