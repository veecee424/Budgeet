import mongoose from "mongoose";

const WALLET_SCHEMA = new mongoose.Schema({
    walletId: {
        type: Number,
        required: true
    },
    AccountId: {
        type: String,
        required: true
    },
    deletedAt: {
        type: Date,
        default: null
    }
}, {
    timestamps: true
});

WALLET_SCHEMA.index({walletId: 1}, {unique: true});
const WALLET_MODEL = mongoose.model('Wallet', WALLET_SCHEMA);
export default WALLET_MODEL;