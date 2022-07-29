import User from '../../db/models/User';
import {successResponse, errorResponse, customError} from '../../utils/ResponseFormatter';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {config} from '../../config/AppConfig';
import crypto from 'crypto';

const login = async (req: Request, res: Response) => {
    try {

        const { email, password } = req.body;

        // Check if user exists
        const foundUser: any  = await User.findOne({email, deletedAt: null});
        if (!foundUser) throw new customError('Incorrect email/password combination.', 400);
        
        // Check if password matches
        const passwordMatches: boolean = await bcrypt.compare(password, foundUser!.password);
        if (!passwordMatches) throw new customError('Incorrect email/password combination.', 400);
        delete foundUser!.password;
        
        // If password matches, go ahead and generate token
        const payloadToSign = {
            id: foundUser!._id,
            firstName: foundUser!.firstName,
            lastName: foundUser!.lastName,
            email: foundUser!.email
        };
        const token: string = jwt.sign(payloadToSign, String(config.jwtSecret), {expiresIn: '1h'});
        foundUser!.loginHash = crypto.randomBytes(16).toString('hex');
        await foundUser!.save();
        successResponse(res, 200, 'token generated', {token});

    } catch (e: any) {
        errorResponse(res, e?.code, e?.message);
    }
}

export default login;