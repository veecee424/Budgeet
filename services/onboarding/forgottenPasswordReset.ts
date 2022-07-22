import { ReqCustom as Request } from '../../custom_types/Custom';
import { Response } from 'express';
import Token from '../../db/models/Token';
import Account from '../../db/models/Account';
import { successResponse, errorResponse, customError } from '../../utils/ResponseFormatter';

const forgottenPasswordReset = async (req: Request, res: Response) => {
    try {
        const { token, newPassword, confirmPassword } = req.body;

        // Check if new password matches the password confirmation
        if (newPassword !== confirmPassword) throw new customError('New password and confirm password do not match.', 400);

        // Check if token is available and unused
        const foundToken: any = await Token.findOne({value: token});
        if (foundToken.isUsed) throw new customError('Token is expired or invalid', 400);

        // Find account and update password
        Account.findOne({
            AccountId: token.account, 
            deletedAt: null
        }, null).populate('user').exec((e, account: any) => {
            if (e) throw new customError(e.message, 400);
            account.user.password = newPassword;
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