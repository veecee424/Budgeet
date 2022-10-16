import mongoose from "mongoose";


const transactionWarehouseSchema = new mongoose.Schema({
    transactionType: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    amount: {
        type: Number,
        required: true
    },
    transactionRef: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    meta: {
        type: String
    }
}, {
    timestamps: true
});

const transactionWarehouseModel = mongoose.model("TransactionWarehouse", transactionWarehouseSchema);
export default transactionWarehouseModel;