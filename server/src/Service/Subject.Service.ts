import { DocumentDefinition, FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import SubjectModel, { SubjectDocument } from '../Models/Subject.Model';

export async function createSubject(
    input: DocumentDefinition<SubjectDocument>
) {
    return await SubjectModel.create(input);
}

export async function findAndUpdateSubject(
    query: FilterQuery<SubjectDocument>,
    update: UpdateQuery<SubjectDocument>,
    options: QueryOptions
) {
    return await SubjectModel.findOneAndUpdate(query, update, options);
}

export async function findSubject(
    query: FilterQuery<SubjectDocument>,
    options: QueryOptions = { lean: true }
) {
    return await SubjectModel.findOne(query, {}, options);
}

export async function findAllSubjects() {
    return await SubjectModel.find();
}

export async function deleteSubject(
    query: FilterQuery<SubjectDocument>
) {
    return await SubjectModel.deleteOne(query);
}