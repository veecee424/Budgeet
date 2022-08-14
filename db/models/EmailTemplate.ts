import mongoose from "mongoose";

const emailSchema = new mongoose.Schema({
    templateName: {
        type: String,
        unique: true
    },
    subject: {
        type: String,
        default: null
    }
}, {
    timestamps: true
});

const EmailTemplate = mongoose.model('EmailTemplate', emailSchema);

export default EmailTemplate;