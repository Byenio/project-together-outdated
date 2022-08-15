import mongoose from 'mongoose';

export interface PostTypeDocument extends mongoose.Document {
    name: string;
}

const postTypeSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    }

});

const PostTypeModel = mongoose.model<PostTypeDocument>('PostType', postTypeSchema);

export default PostTypeModel;