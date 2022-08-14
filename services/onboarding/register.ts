import User from '../../db/models/User';
import Account from '../../db/models/Account';
import {successResponse, errorResponse, customError} from '../../utils/ResponseFormatter';
import { Request, Response } from 'express';
import createToken from '../../utils/CreateToken';
import { validateAsync } from '../../utils/Validate';
import { registrationSpec } from '../../utils/ValidationSpecs';
import sendEmail from '../../utils/SendEmail';

const register = async (req: Request, res: Response) => {
    try {
        const WELCOME_EMAIL_TEMPLATE_ID = '62f8f95702b4a64a99c556fe';
        const payload = await validateAsync(registrationSpec, req.body);
        // Check if email exists
        const userExists = await User.findOne({email:payload.email, deletedAt: null}, null, {lean:true});
        if (userExists) throw new customError('Email already exists.', 400);

        const newUser: any = await User.create(payload);
        if (!newUser) throw new customError('Unable to create new user.', 400);

        // Create account
        const accountPayload = {
            country: payload.country,
            user: newUser._id,
        };
        const userAccount: any = await Account.create(accountPayload);
        if (!userAccount) throw new customError('Unable to create user account.', 400);

        // Create token
        await createToken(userAccount._id);
        sendEmail(newUser._id, WELCOME_EMAIL_TEMPLATE_ID, {
            company: 'Budgeet',
            name: newUser.firstName
        });
        return successResponse(res, 201, 'Registration successful.', {User: newUser, Account: userAccount});
        
    } catch (e: any) {
        errorResponse(res, e?.code, e?.message);
    }
}

export default register;