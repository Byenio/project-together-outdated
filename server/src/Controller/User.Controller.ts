import { Request, Response } from 'express';
import { CreateUserInput, GetUserInput } from '../Schema/User.Schema';
import { createUser, getUser } from '../Service/User.Service';
import logger from '../Utils/Logger';

export async function createUserHandler( req: Request<{}, {}, CreateUserInput['body']>, res: Response ) {

    try {
        const user = await createUser(req.body); // Call create user service
        return res.send(user);
    } catch(e: any) {
        logger.error(e);
        return res.status(409).send(e.message); // This function throws an error when user with email already exists
    }

}

export async function getUserHandler(
    req: Request<GetUserInput['params']>,
    res: Response
) {

    const userId = req.params._id;

    const user = await getUser({ userId });

    if (!user) {
        return res.status(404);
    }

    return res.send(user);

}