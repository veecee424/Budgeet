import { Response } from 'express';
import { ReqCustom as Request } from '../../custom_types/Custom';
import { successResponse, errorResponse } from '../../utils/ResponseFormatter'; 
import Account from '../../db/models/Account';
import User from '../../db/models/User';
import Token from '../../db/models/Token';
import createToken from '../../utils/CreateToken';

const forgottenPassword = async (req: Request, res: Response)=> {
    try {
        let token: any = null;
        const { email } = req.body;
        const user = await User.findOne({email, deletedAt: null}, {_id: 1}, {lean: true});

        if (user) {
            // Use the id fetched above to check accounts table
            const accountId = await Account.findOne({user: user._id, deletedAt: null}, {_id: 1}, {lean: true});
            
            // Check for unused tokens
            const unusedToken = await Token.findOne({account: accountId, isUsed: 0, deletedAt: null}, null, {lean:true});
            
            // Create token if no unused token is available. else, return unused token.
            if (!unusedToken) {
                const tokenData: any = await createToken(accountId);
                token = tokenData && tokenData.value;
            } else {
                token = unusedToken.value;
            }
        }

        successResponse(res, 201, 'Password reset link sent to email.', []);
    } catch (e:any) {
        errorResponse(res, e?.code, e?.message);
    }
}

export default forgottenPassword;