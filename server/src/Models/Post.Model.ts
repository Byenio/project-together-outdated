import mongoose from 'mongoose';
import { UserDocument } from './User.Model';
import { PostTypeDocument } from './Post.Type.Model';
import { SubjectDocument } from './Subject.Model';

export interface PostDocument extends mongoose.Document {
    user: UserDocument['_id'],
    subject: SubjectDocument['_id'],
    description: String,
    type: PostTypeDocument['_id'],
    createdAt: Date,
    updatedAt: Date,
}

const postSchema = new mongoose.Schema({
    
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject'
    },
    description: {
        type: String,
        required: true,
    },
    type: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PostType'
    }

}, {
    timestamps: true
});

const PostModel = mongoose.model<PostDocument>('Post', postSchema);

export default PostModel;