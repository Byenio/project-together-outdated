import { DocumentDefinition, FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import ClassModel, { ClassDocument } from '../Models/Class.Model';

export async function createClass(
    input: DocumentDefinition<ClassDocument>
) {
    return ClassModel.create(input);
}

export async function findAndUpdateClass(
    query: FilterQuery<ClassDocument>,
    update: UpdateQuery<ClassDocument>,
    options: QueryOptions
) {
    return ClassModel.findOneAndUpdate(query, update, options)
}

export async function findClass(
    query: FilterQuery<ClassDocument>,
    options: QueryOptions = { lean: true }
) {
    return ClassModel.findOne(query, {}, options);
}

export async function findAllClasses() {
    return ClassModel.find();
}

export async function deleteClass(
    query: FilterQuery<ClassDocument>
) {
    return ClassModel.deleteOne(query);
}