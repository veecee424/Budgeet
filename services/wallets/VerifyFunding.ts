import Account from "../../db/models/Account";
import { ReqCustom as Request, Account as AccountType, Wallet as WalletType } from "../../custom_types/Custom";
import { Response } from "express";
import { customError, errorResponse, successResponse } from '../../utils/ResponseFormatter';
import Wallet from '../../db/models/Wallet';
const Flutterwave = require('flutterwave-node-v3');
import walletTransaction from "../../db/models/WalletTransaction";

const verifyWalletFunding = async (req: Request, res: Response) => {
    try {
        // Fetch wallet
        const WALLET: WalletType|null = await Wallet.findOne({user: req.user._id}, null, {lean:true});
        if (!WALLET || WALLET.deletedAt) throw new customError("Wallet not found", 400);

        // With the transaction id passed, fetch the transaction
        const PAYLOAD = {id: req.body.transactionId};
        const FLW = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY);
        const response = await FLW.Transaction.verify(PAYLOAD);
        
        // If transaction status was successful, fund wallet by creating an entry for it in wallet transactions table.
        if (response?.data.status === 'successful') {
            await walletTransaction.create({
                transactionType: "CREDIT",
                walletId: WALLET.walletId,
                amount: response.data.amount
            });

            return successResponse(res, 200, "Wallet funding successful", []);
        } else {
            return errorResponse(res, 502, "Wallet funding unsuccessful", []);
        }
    } catch (e: any) {
        return errorResponse(res, e?.code, e?.message);
    }
}

export default verifyWalletFunding;