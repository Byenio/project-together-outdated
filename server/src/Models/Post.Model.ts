import mongoose from 'mongoose';
import { customAlphabet } from 'nanoid';
import { UserDocument } from './User.Model';

const nanoId = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789');

export interface PostDocument extends mongoose.Document {
    user: UserDocument['_id'],
    subject: String,
    description: String,
    class: String,
    createdAt: Date,
    updatedAt: Date,
}

const postSchema = new mongoose.Schema({

    postId: {
        type: String,
        required: true,
        unique: true,
        default: () => `${nanoId()}`,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    subject: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    class: {
        type: String,
        required: true
    }

}, {
    timestamps: true
});

const PostModel = mongoose.model<PostDocument>('Post', postSchema);

export default PostModel;