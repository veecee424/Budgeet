import mongoose from "mongoose";

const budgetSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    duration: {
        type: Date,
        required: true
    },
    description: {
        type: String
    },
    deletedAt: {
        type: Date,
        default: null
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account'
    },
    budgetDetails: [
        {
            amount: Number,
            name: String
        }
    ]
}, {
    timestamps: true
});

budgetSchema.index({name: 1}, {unique: true});
const budget = mongoose.model("Budget", budgetSchema);
export default budget;