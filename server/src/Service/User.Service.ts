import { DocumentDefinition, FilterQuery, QueryOptions } from 'mongoose';
import { omit } from 'lodash';
import UserModel, { UserDocument } from '../Models/User.Model';

export async function createUser( input: DocumentDefinition<Omit<UserDocument, 'createdAt' | 'updatedAt' | 'comparePassword' | 'permissionLevel'>> ) {

    try{
        const user = await UserModel.create(input);
        return omit(user.toJSON(), 'password');
    } catch(e: any){
        throw new Error(e);
    }

}

export async function validatePassword({ email, password }:{ email:string, password:string }) {

    const user = await UserModel.findOne({ email });

    if (!user) return false;

    const isValid = await user.comparePassword(password);

    if (!isValid) return false;
    return omit(user.toJSON(), 'password');

}

export async function findUser(query: FilterQuery<UserDocument>) {

    return UserModel.findOne(query).lean();

}

export async function getUser(
    query: FilterQuery<UserDocument>,
    options: QueryOptions = { lean: true }
) {
    return UserModel.findOne(query, {}, options).populate("class");
}