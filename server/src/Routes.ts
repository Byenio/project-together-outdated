import {
    Express,
    Request,
    Response
} from 'express';

import validateResource from './Middleware/ValidateResource';
import requireUser from './Middleware/RequireUser';

import {
    createUserHandler,
    getPublicUserHandler,
    getPrivateUserHandler
} from './Controller/User.Controller';
import {
    createUserSchema,
    getPublicUserSchema,
    getPrivateUserSchema
} from './Schema/User.Schema';
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
    deletePostSchema,
    getPostsByUserSchema
} from './Schema/Post.Schema';
import {
    createPostHandler,
    updatePostHandler,
    getPostHandler,
    deletePostHandler,
    getAllPostsHandler,
    getPostsByUserHandler,
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

import {
    createPostTypeSchema,
    updatePostTypeSchema,
    getPostTypeSchema,
    deletePostTypeSchema,
    getAllPostsTypesSchema
} from './Schema/Post.Type.Schema';
import {
    createPostTypeHandler,
    updatePostTypeHandler,
    getPostTypeHandler,
    deletePostTypeHandler,
    getAllPostTypesHandler
} from './Controller/Post.Type.Controller';

function routes(App: Express) {

    App.get(
        "/healthcheck",
        (req: Request, res: Response) => { res.sendStatus(200); }
    );

    //! User routes
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
    )

    //! Session routes
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
    App.get(
        '/api/posts/user',
        [requireUser, validateResource(getPostsByUserSchema)],
        getPostsByUserHandler
    )
    App.put(
        '/api/posts/:_id',
        [requireUser, validateResource(updatePostSchema)],
        updatePostHandler
    );
    App.get(
        '/api/posts/:_id',
        validateResource(getPostSchema),
        getPostHandler
    );
    App.delete(
        '/api/posts/:_id',
        [requireUser, validateResource(deletePostSchema)],
        deletePostHandler
    );

    //! Post type routes
    App.post(
        '/api/post-types',
        [requireUser, validateResource(createPostTypeSchema)],
        createPostTypeHandler
    );
    App.get(
        '/api/post-types/all',
        getAllPostTypesHandler
    );
    App.put(
        '/api/post-types/:_id',
        [requireUser, validateResource(updatePostTypeSchema)],
        updatePostTypeHandler
    );
    App.get(
        '/api/post-types/:_id',
        validateResource(getPostTypeSchema),
        getPostTypeHandler
    );
    App.delete(
        '/api/post-types/:_id',
        [requireUser, validateResource(deletePostTypeSchema)],
        deletePostTypeHandler
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
        '/api/classes/:_id',
        [requireUser, validateResource(updateClassSchema)],
        updateClassHandler
    );
    App.get(
        '/api/classes/:_id',
        validateResource(getClassSchema),
        getClassHandler
    );
    App.delete(
        '/api/classes/:_id',
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
        '/api/subjects/:_id',
        [requireUser, validateResource(updateSubjectSchema)],
        updateSubjectHandler
    );
    App.get(
        '/api/subjects/:_id',
        validateResource(getSubjectSchema),
        getSubjectHandler
    );
    App.delete(
        '/api/subjects/:_id',
        [requireUser, validateResource(deleteSubjectSchema)],
        deleteSubjectHandler
    );

};

export default routes;