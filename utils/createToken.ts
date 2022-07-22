import crypto from 'crypto';
import Token from '../db/models/Token';

const createToken = async (AccountId: unknown) => {
    try {

        if (!AccountId) throw new Error('AccountId is required to create token');
        const tokenPayload = {
            value: `BT-${crypto.randomBytes(16).toString('hex')}`,
            account: AccountId
        }

        return await Token.create(tokenPayload);
    } catch (e: any) {
        throw new Error(e.message);
    }
}

export default createToken;