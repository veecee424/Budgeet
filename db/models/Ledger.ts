import mongoose from "mongoose";


const ledgerSchema = new mongoose.Schema({
    credit: {
        type: Number,
        required: true
    },
    debit: {
        type: Number,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, {
    timestamps: true
});

const ledgerModel = mongoose.model("Ledger", ledgerSchema);
export default ledgerModel;