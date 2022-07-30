import { FilterQuery } from "mongoose";
import SessionModel, { SchemaDocument } from "../Models/Session.Model";

export async function createSession( userId: string, userAgent: string ) {

    const session = await SessionModel.create({ user: userId, userAgent });

    return session.toJSON();

}

export async function findSessions(query: FilterQuery<SchemaDocument>) {

    return SessionModel.find(query).lean();

}