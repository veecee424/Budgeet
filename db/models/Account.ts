import mongoose from "mongoose";

const AccountScehma = new mongoose.Schema({
    country: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    isActivated: {
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

AccountScehma.index({user: 1}, {unique: true});
const Account = mongoose.model('Account', AccountScehma);
export default Account;