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
    deletePostHandler,
    getAllPostsHandler
} from './Controller/Post.Controller';

import {
    createClassSchema,
    updateClassSchema,
    getClassSchema,
    deleteClassSchema,
    getAllClassesSchema
} from './Schema/Class.Schema';
import {
    createClassHandler,
    updateClassHandler,
    getClassHandler,
    deleteClassHandler,
    getAllClassesHandler
} from './Controller/Class.Controller';

import {
    createSubjectSchema,
    updateSubjectSchema,
    getSubjectSchema,
    deleteSubjectSchema,
    getAllSubjectsSchema
} from './Schema/Subject.Schema';
import {
    createSubjectHandler,
    updateSubjectHandler,
    getSubjectHandler,
    deleteSubjectHandler,
    getAllSubjectsHandler
} from './Controller/Subject.Controller';

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
    App.get(
        '/api/posts/all',
        getAllPostsHandler
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

    //! Class routes
    App.post(
        '/api/classes',
        [requireUser, validateResource(createClassSchema)],
        createClassHandler
    );
    App.get(
        '/api/classes/all',
        getAllClassesHandler
    );
    App.put(
        '/api/classes/:classId',
        [requireUser, validateResource(updateClassSchema)],
        updateClassHandler
    );
    App.get(
        '/api/classes/:classId',
        validateResource(getClassSchema),
        getClassHandler
    );
    App.delete(
        '/api/classes/:classId',
        [requireUser, validateResource(deleteClassSchema)],
        deleteClassHandler
    );

    //! Subject routes
    App.post(
        '/api/subjects',
        [requireUser, validateResource(createSubjectSchema)],
        createSubjectHandler
    );
    App.get(
        '/api/subjects/all',
        getAllSubjectsHandler
    );
    App.put(
        '/api/subjects/:subjectId',
        [requireUser, validateResource(updateSubjectSchema)],
        updateSubjectHandler
    );
    App.get(
        '/api/subjects/:subjectId',
        validateResource(getSubjectSchema),
        getSubjectHandler
    );
    App.delete(
        '/api/subjects/:subjectId',
        [requireUser, validateResource(deleteSubjectSchema)],
        deleteSubjectHandler
    );

};

export default routes;