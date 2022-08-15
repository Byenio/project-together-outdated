import { DocumentDefinition, FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';
import PostTypeModel, { PostTypeDocument } from '../Models/Post.Type.Model';

export function createPostType(
    input: DocumentDefinition<PostTypeDocument>
) {
    return PostTypeModel.create(input)
}

export function findPostType(
    query: FilterQuery<PostTypeDocument>,
    options: QueryOptions = { lean: true }
) {
    return PostTypeModel.findOne(query, {}, options);
}

export function findAllPostsTypes(){
    return PostTypeModel.find();
};

export function findAndUpdatePostType(
    query: FilterQuery<PostTypeDocument>,
    update: UpdateQuery<PostTypeDocument>,
    options: QueryOptions
) {
    return PostTypeModel.findOneAndUpdate(query, update, options);
}

export function deletePostType(
    query: FilterQuery<PostTypeDocument>
) {
    return PostTypeModel.deleteOne(query);
}