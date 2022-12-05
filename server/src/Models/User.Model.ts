import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import config from 'config';

import { ClassDocument } from './Class.Model';
import { PermissionDocument } from './Permission.Model';

export interface UserDocument extends mongoose.Document {
    email: string,
    name: string,
    password: string,
    permissionLevel: PermissionDocument['_id'],
    class: ClassDocument['_id'],
    createdAt: Date,
    updatedAt: Date,
    comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema({

    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    permissionLevel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Permission'
    },
    class: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class'
    }

}, {
    timestamps: true
});

userSchema.pre('save', async function (next) {

    var user = this as UserDocument;

    if (!user.isModified('password')) {
        return next();
    }

    const salt = await bcrypt.genSalt(config.get<number>('saltWorkFactor'));
    const hash = await bcrypt.hashSync(user.password, salt);

    user.password = hash;

    return next();

});

userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {

    const user = this as UserDocument;

    return bcrypt.compare(candidatePassword, user.password).catch((e) => false);

}

const UserModel = mongoose.model<UserDocument>('User', userSchema);

export default UserModel;