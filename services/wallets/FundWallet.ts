import { ReqCustom as Request } from "../../custom_types/Custom";
import { Response } from "express";
import { customError, errorResponse } from '../../utils/ResponseFormatter';
import User from '../../db/models/User';
import axios from 'axios';
import { walletFundingSpec } from "../../utils/ValidationSpecs";
import { validateAsync } from "../../utils/Validate";
import crypto from 'crypto';

const fundWallet = async (req: Request, res: Response) => {
    try {

        const PARAMS = await validateAsync(walletFundingSpec, req.body);

        // Fetch wallet and user
        const USER = await User.findById(req.user._id, null, {lean:true})
        if (!USER || USER.deletedAt) throw new customError("User not found", 400);

        // Generate random tx_ref
        const randomString = `${crypto.randomBytes(16).toString('hex')}`;

        // Initiate collection transaction
        const response = await axios({
            method: 'post',
            url: 'https://api.flutterwave.com/v3/payments',
            headers: {
                Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`
            },
            data: {
                tx_ref: `BT-WALLET-FUNDING-${randomString}`,
                amount: PARAMS.amount,
                currency: PARAMS.currency,
                redirect_url: process.env.WALLET_FUNDING_REDIRECT_URL,
                customer: {
                    email: USER.email,
                    phonenumber: USER.phoneNumber,
                    name: `${USER.firstName} ${USER.lastName}`
                },
                customizations: {
                    title: "Budgeet wallet funding.",
                    logo: "budgeetlogo.png"
                }
            }
        });

        return res.status(200).json(response.data);

    } catch (e: any) {
        return errorResponse(res, e?.code, e?.message);
    }
}

export default fundWallet;