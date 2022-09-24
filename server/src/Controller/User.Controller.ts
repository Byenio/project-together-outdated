import { Request, Response } from 'express';
import {
    CreateUserInput,
    GetPublicUserInput,
    GetPrivateUserInput,
    GetAllUsersInput,
    UpdateUserInput
} from '../Schema/User.Schema';
import { createUser, getUser, getAllUsers, findUser, findAndUpdateUser } from '../Service/User.Service';
import logger from '../Utils/Logger';
import { omit } from 'lodash';

export async function createUserHandler( req: Request<{}, {}, CreateUserInput['body']>, res: Response ) {

    try {
        const user = await createUser(req.body);
        return res.send(user);
    } catch(e: any) {
        logger.error(e);
        return res.status(409).send(e.message);
    }

}

export async function getPublicUserHandler(
    req: Request<GetPublicUserInput['params']>,
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
    req: Request<GetPrivateUserInput>,
    res: Response
) {

    const _id = res.locals.user._id;

    const user = await getUser({ _id });

    if (!user) {
        return res.status(404);
    }

    if (String(user._id) !== _id) {
        return res.status(403).json({
            message: 'Forbidden'
        });
    }

    return res.send(user);

}

export async function updateUserHandler(
    req: Request<UpdateUserInput['params']>,
    res: Response
) {

    const userId = res.locals.user._id;
    const update = req.body;

    const user = await findUser({ userId });

    if(!user) {
        return res.status(404).json({
            message: 'User not found'
        });
    }

    const updatedUser = await findAndUpdateUser(
        { userId },
        update,
        { new: true }
    );

    return res.send(updatedUser);

}

export async function getAllUsersHandler(
    req: Request<GetAllUsersInput>,
    res: Response
) {

    const users = await getAllUsers();
    const accessToken = req.headers.accessToken;
    const refreshToken = req.headers.refreshToken;

    const fetchItems = async () => {
        var myHeaders = new Headers();
        myHeaders.append('authorization', `Bearer ${ accessToken }`);
        myHeaders.append('x-refresh', `Bearer ${ refreshToken }`);

        var requestOpitons = {
            method: 'GET',
            headers: myHeaders
        }
        const response = await fetch(
            'http://localhost:1337/api/permissions/all',
            requestOpitons
        )
        
        const data = await response.json();
        return data;
    }

    const permissions = await fetchItems();
    var userPermission = 0;

    permissions.forEach((element: { _id: string; level: number; }) => {
        if (element._id === res.locals.user.permissionLevel) {
            userPermission = element.level;
        }
    });

    if (Number(userPermission) !== 1 && Number(userPermission) !== 2) {
        return res.status(403).json({
            message: 'You are not authorized to get all users.'
        })
    }

    if (!users) {
        return res.status(404);
    }

    return res.send(users);

}