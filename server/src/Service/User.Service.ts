import { DocumentDefinition } from 'mongoose';
import UserModel, { UserDocument } from '../Models/User.Model';

export async function createUser(
    input: DocumentDefinition<Omit<UserDocument, 'createdAt' | 'updatedAt' | 'comparePassword'>>
    ) {

    try{
        return await UserModel.create(input);
    } catch(e: any){
        throw new Error(e);
    }

}