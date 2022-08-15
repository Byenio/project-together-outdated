import { Request, Response } from 'express';
import { CreateUserInput, GetUserInput } from '../Schema/User.Schema';
import { createUser, getUser } from '../Service/User.Service';
import logger from '../Utils/Logger';
import { omit } from 'lodash';

export async function createUserHandler( req: Request<{}, {}, CreateUserInput['body']>, res: Response ) {

    try {
        const user = await createUser(req.body); // Call create user service
        return res.send(user);
    } catch(e: any) {
        logger.error(e);
        return res.status(409).send(e.message); // This function throws an error when user with email already exists
    }

}

export async function getPublicUserHandler(
    req: Request<GetUserInput['params']>,
    res: Response
) {

    const userId = req.params._id;

    const user = await getUser({ userId });

    if (!user) {
        return res.status(404);
    }

    return res.send(omit(user, 'password', 'createdAt', 'updatedAt'));

}

export async function getPrivateUserHandler(
    req: Request<GetUserInput['params']>,
    res: Response
) {

    const requestUserId = res.locals.user._id;
    const userId = req.params._id;

    const user = await getUser({ userId });

    if (!user) {
        return res.status(404);
    }

    if (String(user._id) !== requestUserId) {
        return res.status(403).json({
            message: 'Forbidden'
        });
    }

    return res.send(user);

}