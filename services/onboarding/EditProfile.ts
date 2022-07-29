import { Response } from 'express';
import { ReqCustom as Request, User as UserType } from '../../custom_types/Custom';
import User from '../../db/models/User';
import { successResponse, errorResponse, customError } from '../../utils/ResponseFormatter';

const editProfile = async (req: Request, res: Response) => {
    try {
        const user:UserType = req.user;
        const updateObj = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber
        }

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