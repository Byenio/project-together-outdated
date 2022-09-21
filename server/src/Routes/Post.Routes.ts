import {
    Express,
    Request,
    Response
} from 'express';

import validateResource from '../Middleware/ValidateResource';
import requireUser from '../Middleware/RequireUser';

import {
    createPostSchema,
    updatePostSchema,
    getPostSchema,
    deletePostSchema,
    getPostsByUserSchema
} from '../Schema/Post.Schema';

import {
    createPostHandler,
    updatePostHandler,
    getPostHandler,
    deletePostHandler,
    getAllPostsHandler,
    getPostsByUserHandler,
} from '../Controller/Post.Controller';

function postRoutes(App: Express) {

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

}

export default postRoutes;