import SessionModel, { SessionDocument } from "../Models/Session.Model";

export async function createSession( userId: string ) {

    const session = await SessionModel.create({ user: userId });

    return session.toJSON();

}