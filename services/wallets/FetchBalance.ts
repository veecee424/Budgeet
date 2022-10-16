import { ReqCustom as Request, User } from "../../custom_types/Custom";
import { Response } from "express";
import { errorResponse, successResponse, customError } from '../../utils/ResponseFormatter';
import Ledger from "../../db/models/Ledger";

const fetchBalance = async  (req: Request, res: Response) => {
    try {
        const USER_ID: User = req.user._id;

        interface balance {
            balance: number;
            _id?: string
        }

        const result: balance[]|null = await Ledger.aggregate([
            {$match: {user: {$eq: USER_ID}}},
            {$group: {_id: null, credit: {$sum: "$credit"}, debit: {$sum: "$debit"}}},
            {$project: {balance: {$subtract: ["$credit", "$debit"]}}}
        ]);
        if(!result) throw new customError("Unable to fetch balance, please contact support.", 400);

        return successResponse(res, 200, "Balance fetched successfully.", {
            balance: result[0].balance
        });
    } catch (e: any) {
        return errorResponse(res, e?.code, e?.message);
    }
}

export default fetchBalance;