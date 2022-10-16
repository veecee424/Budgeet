import { ReqCustom as Request, User, transactionWarehouse } from "../../custom_types/Custom";
import { Response } from "express";
import { errorResponse, successResponse, customError } from '../../utils/ResponseFormatter';
import TransactionWarehouse from "../../db/models/TransactionWarehouse";

const fetchAccountTransactions = async (req: Request, res: Response) => {
    try {
        const USER_ID: User = req.user._id;

        const result: transactionWarehouse[]|null = await TransactionWarehouse.aggregate([
            {$match: {user: {$eq: USER_ID}}},
            {$project: {user: 0, _id: 0}}
        ]);
        if(!result) throw new customError("Unable to fetch transactions, please contact support.", 400);

        return successResponse(res, 200, "Transactions fetched successfully.", result);

    } catch (e: any) {
        return errorResponse(res, e?.code, e?.message);
    }
}

export default fetchAccountTransactions;