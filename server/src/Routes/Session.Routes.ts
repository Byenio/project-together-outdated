import {
    Express,
    Request,
    Response
} from 'express';

import validateResource from '../Middleware/ValidateResource';
import requireUser from '../Middleware/RequireUser';

import {
    createUserSessionHandler,
    getUserSessionsHandler,
    deleteSessionHandler
} from '../Controller/Session.Controller';

import { createSessionSchema } from '../Schema/Session.Schema';

function sessionRoutes(App: Express) {

    App.post(
        '/api/sessions',
        validateResource(createSessionSchema),
        createUserSessionHandler
    );
    App.get(
        '/api/sessions',
        requireUser,
        getUserSessionsHandler
    );
    App.delete(
        '/api/sessions',
        requireUser,
        deleteSessionHandler
    );

}

export default sessionRoutes;