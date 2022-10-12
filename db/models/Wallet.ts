import mongoose from "mongoose";

const WALLET_SCHEMA = new mongoose.Schema({
    walletId: {
        type: Number,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    deletedAt: {
        type: Date,
        default: null
    }
}, {
    timestamps: true
});

WALLET_SCHEMA.index({walletId: 1, user: 1}, {unique: true});
const WALLET_MODEL = mongoose.model('Wallet', WALLET_SCHEMA);
export default WALLET_MODEL;