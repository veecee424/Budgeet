import Account from "../../db/models/Account";
import { Account as AccountType } from '../../custom_types/Custom';
import { customError } from '../../utils/ResponseFormatter';
import Wallet from '../../db/models/Wallet';
import generateWalletId from "../../utils/GenerateWalletId";

const createWalletId = async (AccountId: string) => {
    try {
        if (!AccountId) throw new customError('AccountId is required to create wallet.', 400);

        // Check if AccountId exists
        const ACCOUNT_DETAILS: AccountType | null = await Account.findById(AccountId, null, {lean: true});
        if (!ACCOUNT_DETAILS || ACCOUNT_DETAILS.deletedAt) throw new customError('Account not found', 400);
        
        // Generate wallet id
        const WALLET_ID = generateWalletId(String(ACCOUNT_DETAILS._id), ACCOUNT_DETAILS.user);
        
        // Create wallet Id
        await Wallet.create({
            user: ACCOUNT_DETAILS.user,
            walletId: WALLET_ID
        });
    } catch (e: any) {
        throw new customError('Something went wrong while creating wallet', 400);
    }
}

export default createWalletId;