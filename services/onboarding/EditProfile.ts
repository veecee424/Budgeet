import { Response } from 'express';
import { ReqCustom as Request, User as UserType } from '../../custom_types/Custom';
import User from '../../db/models/User';
import { successResponse, errorResponse, customError } from '../../utils/ResponseFormatter';
import { validateAsync } from '../../utils/Validate';
import { editprofileSpec } from '../../utils/ValidationSpecs';

const editProfile = async (req: Request, res: Response) => {
    try {
        const user:UserType = req.user;
        const payload = await validateAsync(editprofileSpec, req.body);
        const updateObj = {
            firstName: payload.firstName,
            lastName: payload.lastName,
            email: payload.email,
            phoneNumber: payload.phoneNumber
        };

        // Check if email exists
        const userExists = await User.findOne({email:payload.email, deletedAt: null}, null, {lean:true});
        if (userExists) throw new customError('Email already exists.', 400);

        //Find and edit user
        const updatedUser:UserType|null = await User.findOneAndUpdate({_id: user._id, deletedAt: null}, updateObj, {new:true});
        if (!updatedUser) throw new customError('Unable to update profile.', 400);
        delete updatedUser!.password;

        successResponse(res, 200, 'Profile updated successfully.', updatedUser);

    } catch (e:any) {
        errorResponse(res, e?.code, e?.message);
    }
}

export default editProfile;