import mongoose from "mongoose";


const walletTransactionSchema = new mongoose.Schema({
    transactionType: {
        type: String,
        required: true
    },
    walletId: {
        type: Number,
        required: true
    },
    amount: {
        type: Number,
        required: true
    }
});

const walletTransactionModel = mongoose.model("WalletTransaction", walletTransactionSchema);
export default walletTransactionModel;