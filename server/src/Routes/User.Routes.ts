import {
    Express,
    Request,
    Response
} from 'express';

import validateResource from '../Middleware/ValidateResource';
import requireUser from '../Middleware/RequireUser';

import {
    createUserHandler,
    getPublicUserHandler,
    getPrivateUserHandler,
    getAllUsersHandler,
    updateUserHandler
} from '../Controller/User.Controller';

import {
    createUserSchema,
    getPublicUserSchema,
    getPrivateUserSchema,
    getAllUsersSchema,
    updateUserSchema
} from '../Schema/User.Schema';

function userRoutes(App: Express) {

    App.post(
        '/api/users',
        validateResource(createUserSchema),
        createUserHandler
    );
    App.get(
        '/api/user-public/:_id',
        validateResource(getPublicUserSchema),
        getPublicUserHandler
    );
    App.get(
        '/api/user-private/',
        [requireUser, validateResource(getPrivateUserSchema)],
        getPrivateUserHandler
    );
    App.get(
        '/api/users/all',
        [requireUser, validateResource(getAllUsersSchema)],
        getAllUsersHandler
    );
    App.put(
        '/api/user-update/:_id',
        [requireUser, validateResource(updateUserSchema)],
        updateUserHandler
    )

}

export default userRoutes;