import { DocumentDefinition, FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';
import PermissionModel, { PermissionDocument } from '../Models/Permission.Model';

export async function createPermission (
    input: DocumentDefinition<PermissionDocument>
){
    return await PermissionModel.create(input);
}

export async function findAndUpdatePermission(
    query: FilterQuery<PermissionDocument>,
    update: UpdateQuery<PermissionDocument>,
    options: QueryOptions
) {
    return await PermissionModel.findOneAndUpdate(query, update, options);
}

export async function findPermission(
    query: FilterQuery<PermissionDocument>,
    options: QueryOptions = { lean: true }
) {
    return await PermissionModel.findOne(query, {}, options);
}

export async function findAllPermissions() {
    return await PermissionModel.find();
}

export async function deletePermission(
    query: FilterQuery<PermissionDocument>
) {
    return await PermissionModel.deleteOne(query);
}