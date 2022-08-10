import {
    Express,
    Request,
    Response
} from 'express';

import validateResource from './Middleware/ValidateResource';
import requireUser from './Middleware/RequireUser';

import { createUserHandler } from './Controller/User.Controller';
import { createUserSchema } from './Schema/User.Schema';
import {
    createUserSessionHandler,
    getUserSessionsHandler,
    deleteSessionHandler
} from './Controller/Session.Controller';
import { createSessionSchema } from './Schema/Session.Schema';

import {
    createPostSchema,
    updatePostSchema,
    getPostSchema,
    deletePostSchema
} from './Schema/Post.Schema';
import {
    createPostHandler,
    updatePostHandler,
    getPostHandler,
    deletePostHandler
} from './Controller/Post.Controller';


function routes(App: Express) {

    App.get(
        "/healthcheck",
        (req: Request, res: Response) => { res.sendStatus(200); }
    );

    //! User routes
    App.post(
        '/api/create-user',
        validateResource(createUserSchema),
        createUserHandler
    );
    App.post(
        '/api/sessions',
        validateResource(createSessionSchema),
        createUserSessionHandler
    );

    //! Session routes
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

    //! Post routes
    App.post(
        '/api/posts',
        [requireUser, validateResource(createPostSchema)],
        createPostHandler
    );
    App.put(
        '/api/posts/:postId',
        [requireUser, validateResource(updatePostSchema)],
        updatePostHandler
    );
    App.get(
        '/api/posts/:postId',
        validateResource(getPostSchema),
        getPostHandler
    );
    App.get(
        '/api/posts/:postId',
        [requireUser, validateResource(deletePostSchema)],
        deletePostHandler
    );

};

export default routes;