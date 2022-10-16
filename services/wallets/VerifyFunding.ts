import { ReqCustom as Request} from "../../custom_types/Custom";
import { Response } from "express";
import { errorResponse, successResponse } from '../../utils/ResponseFormatter';
const Flutterwave = require('flutterwave-node-v3');
import TransactionWarehouse from "../../db/models/TransactionWarehouse";
import Ledger from "../../db/models/Ledger";
import { validateAsync } from "../../utils/Validate";
import { fundingVerification } from '../../utils/ValidationSpecs';

const verifyWalletFunding = async (req: Request, res: Response) => {
    try {
        const USER_ID = req.user._id;
        const PARAMS = await validateAsync(fundingVerification, req.body);

        // With the transaction id passed, fetch the transaction
        const PAYLOAD = {id: PARAMS.transactionId};
        const FLW = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY);
        const response = await FLW.Transaction.verify(PAYLOAD);
        
        // If transaction status was successful, fund wallet by creating an entry for it in wallet transactions table.
        if (String(response?.data.status).toLowerCase() === 'successful') {

            Promise.all([
                TransactionWarehouse.create({
                    transactionType: "CREDIT",
                    user: USER_ID,
                    amount: response.data.amount,
                    transactionRef: PARAMS.txRef,
                    description: "Wallet funding."
                }),
                Ledger.create({
                    credit: response.data.amount,
                    debit: 0,
                    user: USER_ID
                })
            ]);

            return successResponse(res, 200, "Wallet funding successful", []);
        } else {
            return errorResponse(res, 502, "Wallet funding unsuccessful", []);
        }
    } catch (e: any) {
        return errorResponse(res, e?.code, e?.message);
    }
}

export default verifyWalletFunding;