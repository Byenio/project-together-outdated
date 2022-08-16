import { DocumentDefinition, FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';
import PostModel, { PostDocument } from '../Models/Post.Model';

export function createPost(
    input: DocumentDefinition<Omit<PostDocument, 'createdAt' | 'updatedAt'>>
) {
    return PostModel.create(input)
}

export function findPost(
    query: FilterQuery<PostDocument>,
    options: QueryOptions = { lean: true }
) {
    return PostModel.findOne(query, {}, options).populate({
        path: "user",
        populate: {
            path: "class"
        }
    });
}

export function findAllPosts(){
    return PostModel.find().populate({
        path: "user",
        populate: {
            path: "class"
        }
    });
};

export function findAndUpdatePost(
    query: FilterQuery<PostDocument>,
    update: UpdateQuery<PostDocument>,
    options: QueryOptions
) {
    return PostModel.findOneAndUpdate(query, update, options);
}

export function deletePost(
    query: FilterQuery<PostDocument>
) {
    return PostModel.deleteOne(query);
}