import {
    Express,
    Request,
    Response
} from 'express';

import validateResource from '../Middleware/ValidateResource';
import requireUser from '../Middleware/RequireUser';

import {
    createSubjectSchema,
    updateSubjectSchema,
    getSubjectSchema,
    deleteSubjectSchema,
    getAllSubjectsSchema
} from '../Schema/Subject.Schema';

import {
    createSubjectHandler,
    updateSubjectHandler,
    getSubjectHandler,
    deleteSubjectHandler,
    getAllSubjectsHandler
} from '../Controller/Subject.Controller';

function subjectRoutes(App: Express) {

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

}

export default subjectRoutes;