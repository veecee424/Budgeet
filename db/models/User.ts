import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        default: null
    },
    password: {
        type: String,
        required: true
    },
    loginHash: {
        type: String,
        default: null
    },
    deletedAt: {
        type: Date,
        default: null
    }
}, {
    timestamps: true,
    toJSON: {
        transform(doc, ret) {
            delete ret.password;
            delete ret.__v;
        }
    }
});

UserSchema.index({email: 1}, {unique:true});
UserSchema.pre('save', async function (next) {
    const user = this;
    try {
        if (user.isModified('password')) {
            const saltRounds = 10;
            const salt = await bcrypt.genSalt(saltRounds);
            user.password = await bcrypt.hash(user.password, salt);
            return next();
        }
    } catch (e) {
        throw new Error('Something went wrong while signing up user.');
    }
});

const User = mongoose.model('User', UserSchema);

export default User;