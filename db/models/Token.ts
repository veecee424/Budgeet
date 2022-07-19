import mongoose, { Schema } from "mongoose";

const tokenSchema = new mongoose.Schema({
    token: {
        type: String,
        defaul: null
    },
    AccountId: {
        type: Schema.Types.ObjectId,
        ref: 'Account'
    },
    isUsed: {
        type: Number,
        default: 0
    },
    deletedAt: {
        type: Date,
        default: null
    }
}, {
    timestamps: true
});

const Token = mongoose.model('Token', tokenSchema);
export default Token;