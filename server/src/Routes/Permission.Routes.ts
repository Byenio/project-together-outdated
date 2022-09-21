import {
    Express,
    Response,
    Request
} from 'express';

import validateResource from '../Middleware/ValidateResource';
import requireUser from '../Middleware/RequireUser';

import {
    createPermissionSchema,
    updatePermissionSchema,
    getPermissionSchema,
    deletePermissionSchema,
    getAllPermissionsSchema
} from '../Schema/Permission.Schema';

import {
    createPermissionHandler,
    updatePermissionHandler,
    getPermissionHandler,
    deletePermissionHandler,
    getAllPermissionsHandler
} from '../Controller/Permission.Controller';

function permissionRoutes(App: Express) {

    App.post(
        '/api/permissions',
        [requireUser, validateResource(createPermissionSchema)],
        createPermissionHandler
    );
    App.get(
        '/api/permissions/all',
        getAllPermissionsHandler
    );
    App.put(
        '/api/permissions/:_id',
        [requireUser, validateResource(updatePermissionSchema)],
        updatePermissionHandler
    );
    App.get(
        '/api/permissions/:_id',
        validateResource(getPermissionSchema),
        getPermissionHandler
    );
    App.delete(
        '/api/permissions/:_id',
        [requireUser, validateResource(deletePermissionSchema)],
        deletePermissionHandler
    );

}

export default permissionRoutes;