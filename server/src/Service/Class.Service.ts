import { DocumentDefinition, FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import ClassModel, { ClassDocument } from '../Models/Class.Model';

export async function createClass(
    input: DocumentDefinition<ClassDocument>
) {
    return await ClassModel.create(input);
}

export async function findAndUpdateClass(
    query: FilterQuery<ClassDocument>,
    update: UpdateQuery<ClassDocument>,
    options: QueryOptions
) {
    return await ClassModel.findOneAndUpdate(query, update, options)
}

export async function findClass(
    query: FilterQuery<ClassDocument>,
    options: QueryOptions = { lean: true }
) {
    return await ClassModel.findOne(query, {}, options);
}

export async function findAllClasses() {
    return await ClassModel.find();
}

export async function deleteClass(
    query: FilterQuery<ClassDocument>
) {
    return await ClassModel.deleteOne(query);
}