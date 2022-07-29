import User from '../../db/models/User';
import Account from '../../db/models/Account';
import {successResponse, errorResponse, customError} from '../../utils/ResponseFormatter';
import { Request, Response } from 'express';
import createToken from '../../utils/CreateToken';

const register = async (req: Request, res: Response) => {
    try {
        // Check if email exists
        const userExists = await User.findOne({email:req.body.email, deletedAt: null}, null, {lean:true});
        if (userExists) throw new customError('Email already exists.', 400);

        const newUser: any = await User.create(req.body);
        if (!newUser) throw new customError('Unable to create new user.', 400);

        // Create account
        const accountPayload = {
            country: req.body.country,
            user: newUser._id,
        };
        const userAccount: any = await Account.create(accountPayload);
        if (!userAccount) throw new customError('Unable to create user account.', 400);

        // Create token
        await createToken(userAccount._id);
        return successResponse(res, 201, 'Registration successful.', {User: newUser, Account: userAccount});
        
    } catch (e: any) {
        errorResponse(res, e?.code, e?.message);
    }
}

export default register;