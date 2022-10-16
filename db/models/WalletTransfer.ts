import mongoose from "mongoose";


const walletTransferSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    walletTo: {
        type: Number,
        required: true
    },
    walletFrom: {
        type: Number,
        required: true
    },
    amount: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

const walletTransferModel = mongoose.model("WalletTransfer", walletTransferSchema);
export default walletTransferModel;