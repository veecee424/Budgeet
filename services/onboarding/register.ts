import User from '../../db/models/User';
import {successResponse, errorResponse, customError} from '../../utils/responseFormatter';
import { Request, Response } from 'express';

const register = async (req: Request, res: Response) => {
    try {
        /**
         * Check if email exists
         */
        const userExists = await User.findOne({email:req.body.email, deletedAt: null}, null, {lean:true});
        if (userExists) throw new customError('Email already exists.', 400);

        const newUser: object = await User.create(req.body);
        if (!newUser) throw new customError('Unable to create new user.', 400);

        return successResponse(res, 201, 'Registration successful.', newUser);
        
    } catch (e: any) {
        errorResponse(res, e?.code, e?.message);
    }
}

export default register;