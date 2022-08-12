import mongoose from 'mongoose';
import { UserDocument } from './User.Model';

export interface PostDocument extends mongoose.Document {
    user: UserDocument['_id'],
    subject: String,
    description: String,
    class: UserDocument['class'],
    createdAt: Date,
    updatedAt: Date,
}

const postSchema = new mongoose.Schema({
    
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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }

}, {
    timestamps: true
});

const PostModel = mongoose.model<PostDocument>('Post', postSchema);

export default PostModel;