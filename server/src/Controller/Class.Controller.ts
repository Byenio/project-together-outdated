import { Request, Response } from 'express';
import {
    createClassInput,
    updateClassInput,
    deleteClassInput,
    getClassInput
} from '../Schema/Class.Schema';
import {
    createClass,
    findClass,
    findAndUpdateClass,
    deleteClass,
    findAllClasses
} from '../Service/Class.Service';

export async function createClassHandler(
    req: Request<{}, {}, createClassInput['body']>,
    res: Response
) {

    const userPermission = res.locals.user.permissionLevel;

    const body = req.body;

    if (userPermission !== 2) {
        return res.status(403).json({
            message: 'Forbidden'
        });
    }

    const newClass = await createClass({ ...body });

    return res.send(newClass);

}

export async function updateClassHandler(
    req: Request<updateClassInput['params']>,
    res: Response
) {

    const userPermission = res.locals.user.permissionLevel;

    const classId = req.params.classId;
    const update = req.body;
    const classUpdate = await findClass({ classId });

    if (!classUpdate) {
        return res.status(404).json({
            message: 'Class not found'
        })
    }

    if (userPermission !== 2) {
        return res.status(403).json({
            message: 'Forbidden'
        });
    }

    const updatedClass = await findAndUpdateClass(
        { classId },
        update,
        { new: true }
    );

    return res.send(updatedClass);

}

export async function getClassHandler(
    req: Request<getClassInput['params']>,
    res: Response
) {

    const classId = req.params.classId;

    const classRes = await findClass({ classId });

    if (!classRes) {
        return res.status(404).json({
            message: 'Class not found'
        })
    }
    
    return res.send(classRes);

}

export async function getAllClassesHandler(
    res: Response
) {

    const classes = await findAllClasses();

    if (!classes.length) {
        return res.status(404).json({
            message: 'No classes found'
        })
    }

    return res.send(classes);

}

export async function deleteClassHandler(
    req: Request<deleteClassInput['params']>,
    res: Response
) {

    const userPermission = res.locals.user.permissionLevel;

    const classId = req.params.classId;
    const classRes = await findClass({ classId });

    if (!classRes) {
        return res.status(404).json({
            message: 'Class not found'
        })
    }

    if (userPermission !== 2) {
        return res.status(403).json({
            message: 'Forbidden'
        })
    }

    await deleteClass({ classId });

    return res.sendStatus(200).json({
        message: 'Class deleted'
    });

}