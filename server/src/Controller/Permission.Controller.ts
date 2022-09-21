import { Request, Response } from 'express';
import {
    createPermissionInput,
    updatePermissionInput,
    deletePermissionInput,
    getPermissionInput,
    getAllPermissionsInput
} from '../Schema/Permission.Schema';
import {
    createPermission,
    findPermission,
    findAndUpdatePermission,
    deletePermission,
    findAllPermissions
} from '../Service/Permission.Service';

export async function createPermissionHandler(
    req: Request<{}, {}, createPermissionInput['body']>,
    res: Response
) {

    const userPermission = res.locals.user.permissionLevel;

    const body = req.body;

    if (Number(userPermission) !== 2) {
        return res.status(403).json({
            message: 'Forbidden'
        });
    }

    const newPermission = await createPermission({ ...body });

    return res.send(newPermission);

}

export async function updatePermissionHandler(
    req: Request<updatePermissionInput['params']>,
    res: Response
) {

    const userPermission = res.locals.user.permissionLevel;

    const PermissionId = req.params._id;
    const update = req.body;
    const PermissionUpdate = await findPermission({ PermissionId });

    if (!PermissionUpdate) {
        return res.status(404).json({
            message: 'Permission not found'
        })
    }

    if (Number(userPermission) !== 2) {
        return res.status(403).json({
            message: 'Forbidden'
        });
    }

    const updatedPermission = await findAndUpdatePermission(
        { PermissionId },
        update,
        { new: true }
    );

    return res.send(updatedPermission);

}

export async function getPermissionHandler(
    req: Request<getPermissionInput['params']>,
    res: Response
) {

    const PermissionId = req.params._id;

    const PermissionRes = await findPermission({ PermissionId });

    if (!PermissionRes) {
        return res.status(404).json({
            message: 'Permission not found'
        })
    }
    
    return res.send(PermissionRes);

}

export async function getAllPermissionsHandler(
    req: Request<getAllPermissionsInput>,
    res: Response
) {

    const Permissions = await findAllPermissions();

    if (!Permissions.length) {
        return res.status(404).json({
            message: 'No Permissions found'
        })
    }

    return res.send(Permissions);

}

export async function deletePermissionHandler(
    req: Request<deletePermissionInput['params']>,
    res: Response
) {

    const userPermission = res.locals.user.permissionLevel;

    const PermissionId = req.params._id;
    const PermissionRes = await findPermission({ PermissionId });

    if (!PermissionRes) {
        return res.status(404).json({
            message: 'Permission not found'
        })
    }

    if (Number(userPermission) !== 2) {
        return res.status(403).json({
            message: 'Forbidden'
        })
    }

    await deletePermission({ PermissionId });

    return res.sendStatus(200).json({
        message: 'Permission deleted'
    });

}