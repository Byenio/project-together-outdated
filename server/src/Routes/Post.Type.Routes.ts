import {
    Express,
    Request,
    Response
} from 'express';

import validateResource from '../Middleware/ValidateResource';
import requireUser from '../Middleware/RequireUser';

import {
    createPostTypeSchema,
    updatePostTypeSchema,
    getPostTypeSchema,
    deletePostTypeSchema,
    getAllPostsTypesSchema
} from '../Schema/Post.Type.Schema';

import {
    createPostTypeHandler,
    updatePostTypeHandler,
    getPostTypeHandler,
    deletePostTypeHandler,
    getAllPostTypesHandler
} from '../Controller/Post.Type.Controller';

function postTypeRoutes(App: Express) {

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

}

export default postTypeRoutes;