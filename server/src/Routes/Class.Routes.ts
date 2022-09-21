import {
    Express,
    Request,
    Response
} from 'express';

import validateResource from '../Middleware/ValidateResource';
import requireUser from '../Middleware/RequireUser';

import {
    createClassSchema,
    updateClassSchema,
    getClassSchema,
    deleteClassSchema,
    getAllClassesSchema
} from '../Schema/Class.Schema';

import {
    createClassHandler,
    updateClassHandler,
    getClassHandler,
    deleteClassHandler,
    getAllClassesHandler
} from '../Controller/Class.Controller';

function classRoutes(App: Express) {

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

}

export default classRoutes;