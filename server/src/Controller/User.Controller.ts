import { Request, Response } from 'express';
import { omit } from 'lodash';
import { CreateUserInput } from '../Schema/User.Schema';
import { createUser } from '../Service/User.Service';
import logger from '../Utils/Logger';

export async function createUserHandler( req: Request<{}, {}, CreateUserInput['body']>, res: Response ) {

    try {
        const user = await createUser(req.body); // Call create user service
        return res.send(omit(user.toJSON(), 'password'));
    } catch(e: any) {
        logger.error(e);
        return res.status(409).send(e.message); // This function throws an error when user with email already exists
    }

}